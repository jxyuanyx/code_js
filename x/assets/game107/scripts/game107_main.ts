// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { NetEnum } from "../../gamecore/enums/NetEnum";
import { GameEvents } from "../../gamecore/events/GameEvents";
import { GameResult } from "../../gamecore/manager/imps/DataManager";
import { LoginType, TokenAccountData } from "../../gamecore/models/AccountData";
import { Package } from "../../gamecore/net/Package";
import GameHelper from "../../gamecore/tools/GameHelper";
import BaseGameScene from "../../gamecore/ui/baseview/imp/BaseGameScene";
import { GUIDE_STEPS } from "../../mainpackage/hall/guid/HallGuideConfig";
import { COMMON_RESP_CMDS } from "../../mainpackage/net/CommonProto";
import { Game107Proto, LUDO_COMMON_RESP_CMDS } from "../net/Game107Proto";
import { core, ludo } from "../net/protos/ludo";
import { CHESS_CLICK } from "./Chess";
import { CHESS_PATHS } from "./game107_enum";
import { Game107RoomService } from "./game107_roomService";
import {Game107RoomView, ReRoll_Click} from "./game107_roomView";
import { ROLL_CLICK } from "./LudoPlayer";

const {ccclass, property} = cc._decorator;

const MAXSEAT=4;

@ccclass
export default class Game107Main extends BaseGameScene<Game107RoomView,Game107RoomService>  {

    private _roomInfo:ludo.EvtLudoMatchNotify|ludo.LudoReconnectRsp;

    private _selfRoll:boolean=false;

    private _selfRollPoint:number=0;

    private _enterBackGroud:boolean=false;

    private _prvOpearClientId:number=-1;

    private _reconnecting:boolean=false;

    private _isReconnectSuccess:boolean=false;

    private _showFinishTip:boolean=false;

    onLoad () {
        super.onLoad();
        this.init(Game107RoomView,Game107RoomService);
        this._addEvent();

     //  App.AudioManager.playGameBGM("sounds/bg",true);
    }



    _flushRoomInfo(): void {
        this._roomInfo=App.DataManager.getGameInitInfo();
        //重连的时候
        if(this._roomInfo instanceof ludo.LudoReconnectRsp){
            if(this._prvOpearClientId!=-1){
                this._roomView.hideTimer(this._prvOpearClientId);
                this._roomView.hideLight(this._prvOpearClientId);
            }
        }

        let players=this._roomInfo.match_info.list;
        let selfSeat:number=-1;
        for(let i=0;i<players.length;i++){
            let player=players[i];
            if(player.uid==App.DataManager.getSelfData().uid){
                selfSeat=player.seat_id;
                this._roomView.setSelfSeat(selfSeat);
                this._roomService.selfSeat=selfSeat;
                this._roomView.setRerollCount(player.reroll_count);
                this._roomView.setAutoCheck(player.status==ludo.LudoPlayerStatus.PLAYER_STATUS_AUTO);
                break;
            }
        }
        for(let i=0;i<players.length;i++){
            let player=players[i];
            let clientId=this._roomService.getClientId(player.seat_id,MAXSEAT);
            this._roomView.onUserSit(player,clientId);

            //更新棋子位置
            for(let j=0;j<player.pieces.length;j++){
                let piece=player.pieces[j];
                let chessIndex=this._fromatChessIndex(piece.piece_id);
                this._roomView.setChessId(clientId,chessIndex,piece.piece_id);
                this._roomService.clearStep(clientId,chessIndex);
                if(piece.steps>0){
                    let moveRet=this._roomService.addStep(clientId,chessIndex,piece.steps);
                    let step=this._roomService.getChessStep(clientId,chessIndex);
                    let pos=CHESS_PATHS[clientId][step-1];
                    this._roomView.setChessPos(clientId,chessIndex,pos[0],pos[1]);
                    this._roomView.updateChessSize(moveRet.to,pos[0],pos[1],true);
                    this._roomView.updatePlayerScore(clientId,player.total_score);
                }else{
                    this._roomView.backChessNoAnim(chessIndex,clientId);
                }

                if(!(this._roomInfo instanceof ludo.LudoReconnectRsp)){
                    this._roomView.dropDownChess(clientId,chessIndex);
                }
            }

            //操作
            if((this._roomInfo instanceof ludo.LudoReconnectRsp)&&(player.seat_id==this._roomInfo.seat_id)){
                this._prvOpearClientId=clientId;
                if(this._roomInfo.operate==ludo.LudoOperate.OPERATE_CHESS){
                    this._roomView.setRollResult(clientId,player.point);
                    if(clientId==0){
                        //显示可选棋子
                        let moveIndexs=this._roomService.findCanMoveIndex(player.point,clientId);
                        moveIndexs.forEach(chessIndex=>{
                            let pos=CHESS_PATHS[clientId][this._roomService.getChessStep(clientId,chessIndex)-1];
                            if(pos){
                                this._roomView.setChessPos(clientId,chessIndex,pos[0],pos[1]);
                            }
                            this._roomView.lightChess(clientId,chessIndex);
                        })
                    }
                }else if(this._roomInfo.operate==ludo.LudoOperate.OPERATE_DICE){
                    if(clientId==0){
                        this._roomView.startRoll(clientId);
                    }
                }

            }
        }
        
        this._roomView.setRewardInfo(this._roomInfo.match_info.match_reward);

        this._roomView.hideReRollTimer();

        this._roomView.startTimer(this._roomInfo.match_info.game_over_time);

        App.Net.flushingUI=false;
        this._isReconnectSuccess=true;
    }

    _onServerReconnectSuccess(){
        App.Net.flushingUI=false;
        this._isReconnectSuccess=false;
        Game107Proto.sendReconnect();
    }

    afterEnter(): void {
        this._flushRoomInfo();
        let isShowFinishTip=cc.sys.localStorage.getItem("game107_finishTip");
        if(!isShowFinishTip){
            App.DlgManager.showDlg("finishTip",null,"game107");
            cc.sys.localStorage.setItem("game107_finishTip",true);
        }
        App.DataManager.getGameData().isInGame=true;
    }

    onMessage(pkg: Package){
        if((!this._isReconnectSuccess)&&(pkg.cmd!=LUDO_COMMON_RESP_CMDS.RECONNECT))return 0;
        switch(pkg.cmd){
            case LUDO_COMMON_RESP_CMDS.EvtUserDice:
                return this._evtUserDice(pkg.body);
            case LUDO_COMMON_RESP_CMDS.EvtUserChess:
                return this._eventUserChess(pkg.body);
            case LUDO_COMMON_RESP_CMDS.EvtLudoMatchNotify:
                break;
            case LUDO_COMMON_RESP_CMDS.EvtUserOperateNotify:
                return this._onUserOperateNotify(pkg.body);
            case LUDO_COMMON_RESP_CMDS.UserDiceReq:
                return this._onUserDiceResp(pkg.body);  
            case LUDO_COMMON_RESP_CMDS.EvtLudoGameOver:
                this._onGameOver(pkg.body);
                break
            case LUDO_COMMON_RESP_CMDS.RECONNECT:
                this._reconnectSuccess(pkg.body);
                break;
            case LUDO_COMMON_RESP_CMDS.EXIT:
                this._onExit();
                break;
            case LUDO_COMMON_RESP_CMDS.UserCancelAutoPlay:
                this._onCancelAuto();
                break;
        }
        return 0;
    }

    _onCancelAuto(){
        this._roomView.setAutoCheck(false);
    }

    _onExit(){
        App.DlgManager.clearAllDlgs();
        App.DataManager.clearTableData();
        App.SceneManager.backHall();
        App.Net.updateRoomInfo(0,0);
    }

    _reconnectSuccess(pkg:ludo.LudoReconnectRsp){
        //清除掉老包
        App.Net.clearSequence();
        this._roomView.hideConnectTip();
        let gameData=App.DataManager.getGameData();
        gameData.tableId=pkg.uuid;
        gameData.newGame=true;
        App.DataManager.setGameInitInfo(pkg);
        this._flushRoomInfo();
        //设置当前的操作用户
        let opearClientId=this._getClientId(pkg.seat_id);
        this._showStartRollTimer(opearClientId,pkg.op_time,pkg.total_op_time);

        this._roomView.setTip(false);
    }

    _onGameOver(pkg:ludo.EvtLudoGameOver){
        this._roomView.onGameOver();
        App.DlgManager.showDlg("gameOver",{data:pkg,info:{roomType:this._roomInfo.room_type,uuid:this._roomInfo.uuid}},"game107");
    }

    _onUserDiceResp(pkg:ludo.UserDiceRsp){
        this._roomView.setRollResult(0,pkg.point);
        this._selfRoll=true;
        this._selfRollPoint=pkg.point;
        this._roomView.addPointToPanel(0,pkg.point);
        if(pkg.can_reroll){
            this._roomView.showRerollTimer(this._roomInfo.match_info.reroll_time);
        }
        this._roomView.setRerollCount(pkg.reroll_count);
        return 0.5;
    }

    _fromatChessIndex(chessId:number){
        return (chessId-1)%4;
    }

    _eventUserChess(pkg:ludo.EvtUserChess){
        let clientId=this._getClientId(pkg.seat_id);
        let chessIndex=(pkg.piece_id-1)%4;
        this._roomView.hideRoll(clientId);
        this._roomView.hideTimer(clientId);
        this._roomView.setFinger(false);
        let oldPos=CHESS_PATHS[clientId][this._roomService.getChessStep(clientId,chessIndex)-1];

        let time=0;
        let backPaths:number[][],attackedClientId:number,attackChessIndex:number;
        if(pkg.attacked_piece_id>0){
            let seat=Math.floor((pkg.attacked_piece_id-1)/4);
            attackedClientId=this._getClientId(seat);
            attackChessIndex=(pkg.attacked_piece_id-1)%4;
            let step=this._roomService.getChessStep(attackedClientId,attackChessIndex);
            backPaths=CHESS_PATHS[attackedClientId].slice(0,step).reverse();
            let mtime=Math.min(0.1,2/backPaths.length);
            time+=backPaths.length*mtime+0.5;
        }

        let chessInfos=this._moveChess(clientId,chessIndex,pkg.point,()=>{
            //踩人的逻辑
            if(pkg.attacked_piece_id>0){
                this._roomView.backChess(backPaths,attackChessIndex,attackedClientId);
                this._roomService.clearStep(attackedClientId,attackChessIndex);
            }

            /*
            if(chessInfos.to.length>1){
                let pos=CHESS_PATHS[clientId][this._roomService.getChessStep(clientId,chessIndex)-1];
                this._roomView.updateChessSize(chessInfos.to,pos[0],pos[1]);
            }*/
            
            if(oldPos&&chessInfos.from?.length>0){
                this._roomView.updateChessSize(chessInfos.from,oldPos[0],oldPos[1]);
            }
            
            
             //更新多人棋子的情况
            for(let i=0;i<4;i++){
                let pos=CHESS_PATHS[clientId][this._roomService.getChessStep(clientId,i)-1];
                if(pos){
                    let mapInfos=this._roomService.getMapInfo(pos);
                    if(mapInfos.length>1){
                        this._roomView.updateChessSize(mapInfos,pos[0],pos[1]);
                    }
                }
            }


            //更新加分
            pkg.add_score.forEach((item,index)=>{
                if(item.score_type!=ludo.ScoreType.SCORE_TYPE_NORMAL){
                    cc.tween(this.node).delay(index*0.3).call(node=>{
                        let pos=CHESS_PATHS[clientId][this._roomService.getChessStep(clientId,chessIndex)-1];
                        this._roomView.addScore(clientId,pos[0],pos[1],item.score_type,item.score)
                    }).start();
                }
            })

            let step=this._roomService.getChessStep(clientId,chessIndex);
            if(step>=57){
                //播放烟花
                this._roomView.playYanHua();
            }

            //首先达到80分
            if(!this._showFinishTip){
                let player=pkg.match_info.list.filter(item=>item.seat_id==pkg.seat_id)[0];
                if(player&&player.total_score>=80){
                    this._showFinishTip=true;
                    let pos=CHESS_PATHS[clientId][step-1];
                    this._roomView.showFinishAnim(clientId,pos[0],pos[1])
                }
            }
        });

        this._updateUserInfo(pkg.match_info.list);


        let newStep=this._roomService.getChessStep(clientId,chessIndex);
        cc.log("move chess time>>>>>>.",((newStep==1)?0.5:((pkg.point+1)*0.2))+time)
        return ((newStep==1)?0.5:((pkg.point+1)*0.3))+time;
    }

    _updateUserInfo(players:ludo.ILudoPlayerInfo[]){
        players.forEach(player=>{
            let clientId=this._getClientId(player.seat_id);
            this._roomView.updatePlayerScore(clientId,player.total_score);
            if(clientId==0){
                this._roomView.setAutoCheck(player.status==ludo.LudoPlayerStatus.PLAYER_STATUS_AUTO);
            }
        })
    }

    _evtUserDice(pkg:ludo.EvtUserDice){
        let clientId=this._getClientId(pkg.seat_id);
        let time=0.5;
        if(clientId!=0 || !this._selfRoll){
            this._roomView.setRollResult(clientId,pkg.point);
            this._roomView.addPointToPanel(clientId,pkg.point);
        }
        
        if(this._selfRoll&&clientId==0){
            time=0;
        }
        
        this._roomView.setFinger(false);
        this._selfRoll=false;
        return time;
    }

    _getClientId(seat:number){
        return this._roomService.getClientId(seat,MAXSEAT);
    }

    _onUserOperateNotify(pkg:ludo.EvtUserOperateNotify){
        let clientId=this._getClientId(pkg.seat_id);
        let time=0;
        if(pkg.operate==ludo.LudoOperate.OPERATE_DICE){
            this._turnRoll(clientId);
            if(clientId!=0){
                this._roomView.setFinger(false);
            }
            this._showStartRollTimer(clientId,pkg.op_time,pkg.op_time);
            if(clientId!=this._prvOpearClientId&&this._prvOpearClientId!=-1){
                this._roomView.hideRoll(this._prvOpearClientId);
                this._roomView.hidePointPanel(this._prvOpearClientId);
            }
            this._roomView.showPointPanel(clientId);
            this._prvOpearClientId=clientId;
            time=0.3;
        }else{
           //显示可移动的棋子
           if(clientId==0){
                //显示可选棋子
                let moveIndexs=this._roomService.findCanMoveIndex(pkg.player_info.point,clientId);
                moveIndexs.forEach(chessIndex=>{
                    let pos=CHESS_PATHS[clientId][this._roomService.getChessStep(clientId,chessIndex)-1];
                    if(pos){
                        this._roomView.setChessPos(clientId,chessIndex,pos[0],pos[1]);
                    }
                    this._roomView.lightChess(clientId,chessIndex);
                })
            }
        }
        if(clientId==0){
            App.AudioManager.playGameSound("sounds/turn");
        }
        return time;
    }

    _showStartRollTimer(clientId:number,lessTime:number,totalTime:number){
        this._roomView.showTimer(clientId,lessTime,totalTime);
    }

    _addEvent(){
      cc.game.on(ROLL_CLICK,this._onUserRollClick,this);
      cc.game.on(CHESS_CLICK,this._onChessClick,this);
      cc.game.on(ReRoll_Click,this._onUserReRollClick,this);
      cc.game.on(cc.game.EVENT_HIDE,this._onGameHide,this);
      cc.game.on(cc.game.EVENT_SHOW,this._onGameShow,this);
      cc.game.on(GameEvents.RECONNECT_SUCCESS,this._onServerReconnectSuccess,this);
      cc.game.on(GameEvents.ERROR_TIP,this._onErrorTip,this);
      cc.game.on(GameEvents.NET_CONNECTING,this._onReconnectServer,this);
      cc.game.on(GameEvents.NET_RECONNECT_TIMEOUT,this._onReconnectTimeOut,this);
    }

    onDestroy(): void {
        cc.game.off(ROLL_CLICK,this._onUserRollClick,this);
        cc.game.off(CHESS_CLICK,this._onChessClick,this);
        cc.game.off(ReRoll_Click,this._onUserReRollClick,this);
        cc.game.off(cc.game.EVENT_HIDE,this._onGameHide,this);
        cc.game.off(cc.game.EVENT_SHOW,this._onGameShow,this);
        cc.game.off(GameEvents.RECONNECT_SUCCESS,this._onServerReconnectSuccess,this);
        cc.game.off(GameEvents.ERROR_TIP,this._onErrorTip,this);
        cc.game.off(GameEvents.NET_CONNECTING,this._onReconnectServer,this);
        cc.game.off(GameEvents.NET_RECONNECT_TIMEOUT,this._onReconnectTimeOut,this);
    }

    _onReconnectTimeOut(){
        this._roomView.hideConnectTip();
        App.DlgManager.showDlg("reconnect",null,"game107");
    }

    _onReconnectServer(){
        if(!this._reconnecting){
            this._roomView.showReconnectTip();
        }
    }

    _onErrorTip(ret:number,cmd:number,content:string){
        
    }

    async _onChessClick(clientId:number,chessIndex:number,id:number){
        Game107Proto.sendMove(id);
    }

    _moveChess(clientId:number,chessIndex:number,point:number,cb:Function){
        let step=this._roomService.getChessStep(clientId,chessIndex);
        this._roomView.hideLight(clientId);

        let chessInfos:{from:number[],to:number[]};
        if(step==0){
            this._roomView.onChessInPath(chessIndex,clientId,cb);
            chessInfos=this._roomService.addStep(clientId,chessIndex,1);
        }else{
            let paths=CHESS_PATHS[clientId].slice(step,step+point);
            this._roomView.onUserRoll(paths,chessIndex,clientId,cb);
            chessInfos=this._roomService.addStep(clientId,chessIndex,point);
        }
        return chessInfos;
    }

    private _hideTime:number;
    _onGameHide(){
        //收后台秒过3秒开启重连
        this._hideTime=cc.sys.now();
       //App.NativeManager.echo("hideTime>>>>>>>>>>>>>>>>>:"+this._hideTime)
        //this._stopHeart();
        this._enterBackGroud=true;
    }

    _onGameShow(){
        if(this._enterBackGroud){
            this._enterBackGroud=false;
            if((cc.sys.now()-this._hideTime)>=3000){
                this._reconnecting=true;
                this.unscheduleAllCallbacks();
                App.Net.close();
                this._roomView.setTip(true);
                this.scheduleOnce(()=>{
                    this._reConnectServer();
                },0.2)
            }
        }
    }

    _reConnectServer(){
        let token=cc.sys.localStorage.getItem("token")
        if(token){
            let account=new TokenAccountData();
            account.Type=LoginType.TOKEN;
            account.token=token;
            cc.game.emit(NetEnum.REQ_CONTECT,account);
        }
    }

    _turnRoll(clientId:number){
        this._roomView.startRoll(clientId);
    }

    _onUserRollClick(clientId){
        this._roomView.setFinger(false);
        let testRollCount=this._roomView.getTestRollCount();
        Game107Proto.sendDice(false,testRollCount);
    }

    _onUserReRollClick(){
        cc.error("发起reroll>>>>>>>>>>>>>>")
        Game107Proto.sendDice(true);
    }

    async _onUserRollResult(clientId:number,point:number){
        this._roomView.setRollResult(clientId,point);
        let moveIndexs=this._roomService.findCanMoveIndex(point,clientId);
        if(moveIndexs.length==1){
            //直接移动
            let chessIndex=moveIndexs[0];
            let step=this._roomService.getChessStep(clientId,chessIndex);
            let paths=CHESS_PATHS[clientId].slice(step,step+point);
            await this._roomView.onUserRoll(paths,chessIndex,clientId);
            this._roomService.addStep(clientId,chessIndex,point);

        }else{
            if(clientId==0){
                //显示可选棋子
                moveIndexs.forEach(chessIndex=>{
                    this._roomView.lightChess(clientId,chessIndex);
                })
            }
        }
    }


    
    

    // update (dt) {}

    _test(){
        /*
        for(let i=0;i<4;i++){
            let userInfo={
                nick_name:"test_"+i,
                avatar:(Math.floor(Math.random()*29)+1).toString()
            }
            this._roomView.onUserSit(userInfo,i);
        }

        this._roomView.setSelfSeat(1);


        this.scheduleOnce(()=>{
            this._roomView.startRoll(0);
        },1)
       

        let clientId=0;
        this.schedule(()=>{
            //显示roll点
            this._roomView.startRoll(clientId);
            //roll点
            this.scheduleOnce(()=>{
                cc.game.emit(ROLL_CLICK,clientId);
            },1)

            this.scheduleOnce(()=>{
                this._roomView.hideRoll(clientId);
                clientId++;
                if(clientId>=4){
                    clientId=0;
                }
            },2)
           
        },4) */
    }
}

