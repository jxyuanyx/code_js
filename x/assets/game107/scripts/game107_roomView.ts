// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { rejects } from "assert";
import { prototype } from "events";
import { resolve } from "path";
import App from "../../gamecore/App";
import { GameEvents } from "../../gamecore/events/GameEvents";
import GameHelper from "../../gamecore/tools/GameHelper";
import BaseRoomView from "../../gamecore/ui/baseview/imp/BaseRoomView";
import Card from "../../gamecore/ui/baseview/models/Card";
import FromatTimer from "../../gamecore/ui/components/common/FromatTimer";
import RollNumGroup from "../../gamecore/ui/components/common/RollNumGroup";
import Timer from "../../gamecore/ui/components/common/Timer";
import TimerToLabel from "../../gamecore/ui/components/common/TimerToLabel";
import GodGuide from "../../gamecore/ui/components/guid/GodGuide";
import { GUIDE_EVENTS, NewGuideHelper } from "../../gamecore/ui/components/newGuide/NewGuideHelper";
import { ComDlgData } from "../../mainpackage/dialogs/comdlg/ComDlg";
import NewDeposit from "../../mainpackage/dialogs/newDeposit/NewDeposit";
import { formatCurrency, fromatTime, fromatTimeNew } from "../../mainpackage/gameHelper/AthHelper";
import { Game107Proto } from "../net/Game107Proto";
import { ludo } from "../net/protos/ludo";
import {Chess} from "./Chess";
import { CHESS_PATHS, SAFE_AREA } from "./game107_enum";
import Game100Helper from "./game107_helper";
import { LudoFristPlayTask, LudoFristPlayTaskStep } from "./guide/LudoFristPlayTask";
import {LudoPlayer} from "./LudoPlayer";

const {ccclass, property} = cc._decorator;


const enum LAYER_INDEX{
    MAP=0,
    CHESS=20,
    MOVE=100,
    SCORE=200,
    PROP=300,
    TIP=400
}

const MAXSEAT=4;

const CUBE_W=49;
const CUBE_H=49;

export const ReRoll_Click="reroll_click"

@ccclass
export class Game107RoomView extends BaseRoomView {

    @property([LudoPlayer])
    players:LudoPlayer[]=[];

    @property(cc.Prefab)
    pb_chess:cc.Prefab=null;

    @property(cc.Prefab)
    pb_addScore:cc.Prefab=null;

    @property(cc.Node)
    nd_map:cc.Node=null;

    @property(Timer)
    reRollTimer:Timer=null;

    @property(TimerToLabel)
    timer:TimerToLabel=null;

    @property(cc.Node)
    rewardView:cc.Node;

    @property(cc.Node)
    finishTipView:cc.Node;

    @property(sp.Skeleton)
    yanHuaAnim:sp.Skeleton;

    @property(cc.Node)
    autoCheck:cc.Node=null;

    @property(cc.Node)
    rerollTip:cc.Node=null;

    @property(cc.Node)
    finger:cc.Node=null;

    @property(sp.Skeleton)
    pzAnim:sp.Skeleton=null;

    @property(cc.Node)
    lessTimeTip:cc.Node=null;

    @property(cc.Node)
    tuoweiNode:cc.Node=null;

    @property(sp.Skeleton)
    finishTip:sp.Skeleton=null;


    private _canReRoll:boolean=false;

    UIBindData={
        rerollcount:"0",
        reconnect:"Reconnecting...",
        testRollCount:"",
        lessTime:"",
        totalTime:""
    }

    private  _chessMap:Map<number,Chess[]>=new Map();

    private _addScorePool:cc.NodePool=new cc.NodePool();
    private _scoreNodes:cc.Node[]=[];

    onLoad(){
        super.onLoad();
        
        for(let i=0;i<MAXSEAT;i++){
            let chesss:Chess[]=[];
            for(let j=0;j<4;j++){
                let chess=cc.instantiate(this.pb_chess);
                let chessbg=this.nd_map.getChildByName("bg").getChildByName(`chess_${i}_${j}`);
                let pos=chessbg.getPosition();
                pos=chessbg.parent.convertToWorldSpaceAR(pos);
                pos=this.nd_map.convertToNodeSpaceAR(pos);
                chess.setPosition(pos);
                this.nd_map.addChild(chess);
                let com=chess.getComponent(Chess);
                chesss.push(com)
            }
            this._chessMap.set(i,chesss);
        }

        this.rewardView.active=false;
        this.finishTipView.active=false;
        this.onRuleClick();
        this.yanHuaAnim.node.zIndex=LAYER_INDEX.PROP;
        this.yanHuaAnim.setCompleteListener(()=>{
            this.yanHuaAnim.node.active=false;
        })
        this.yanHuaAnim.node.active=false;

        this.autoCheck.active=false;

        this.rerollTip.active=false;

        this.finger.active=false;

        this.setTip(false);

        this.pzAnim.setCompleteListener(()=>{
            this.pzAnim.node.active=false;
        })
        this.pzAnim.node.active=false;
        this.pzAnim.node.zIndex=LAYER_INDEX.PROP;
        this.finishTip.node.active=false;
        this.tuoweiNode.active=false;

        this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchStart,this);
    }   

    _onTouchStart(){
        this.hideRollTip();
        this.onCancelAutoClick();
    }


    private _lessTime:number=0;
    private _flushTimeHandler:Function;
    _flushTotalTime(dt){
        if(this._lessTime<=0){
            this.unschedule(this._flushTimeHandler);
            this.timer.node.stopAllActions();
            return
        }
        let oldTime=Math.floor(this._lessTime);
        this._lessTime-=dt;
        if(Math.floor(this._lessTime)==oldTime)return;
        let time=Math.floor(Math.max(0,this._lessTime));
        if(time<=60){
            if(this.timer.node.color!=cc.Color.RED){
                this.timer.node.color=cc.Color.RED;
            }
        }
        if(time<=30){
            this._startTimeAnim();
        }
        //每秒提示
        if((time%60==0)&&time!=0){
            this.UIBindData.lessTime=Math.floor(time/60).toString();
            this.lessTimeTip.active=true;
            this.lessTimeTip.zIndex=LAYER_INDEX.TIP;
            cc.tween(this.lessTimeTip).set({x:750}).to(0.5,{x:0}).delay(1).to(0.5,{x:-750}).set({active:false}).start();
        }
        this.UIBindData.totalTime=fromatTimeNew(time)
    }

    onGameOver(){
        this.unschedule(this._flushTimeHandler);
        this.timer.node.stopAllActions();
    }

    startTimer(lessTime:number){
        this._lessTime=Math.max(0,lessTime);
        this.UIBindData.totalTime=fromatTimeNew(lessTime);
        if(!this._flushTimeHandler){
            this._flushTimeHandler=this._flushTotalTime.bind(this); 
        }
        this.unschedule(this._flushTimeHandler);
        this.schedule(this._flushTimeHandler,1)
    }

    private _isTimeAnim:boolean=false;
    _startTimeAnim(){
        if(this._isTimeAnim)return;
        cc.tween(this.timer.node).repeatForever(cc.tween(this.timer.node).to(0.5,{scale:1.5}).to(0.5,{scale:1})).start();
        this._isTimeAnim=true;
    }

    //用户坐下
    onUserSit(userInfo:any,clientId:number){
        this.players[clientId].init(userInfo,clientId);
    }

    //用户退出
    onUserExit(clientId:number){

    }

    _checkInSafe(pos:number[]){
        return SAFE_AREA.filter(t=>(t[0]==pos[0])&&(t[1]==pos[1])).length>0;
    }

    /**
     * 用户roll骰子
     * @param movePaths     移动的路径
     * @param chessIndex    要移动的棋子
     * @param clientId      坐号位
     */
    onUserRoll(movePaths:number[][],chessIndex:number,clientId:number,cb?:Function){
        let chess=this._chessMap.get(clientId)[chessIndex];
        chess.node.scale=1;
        let index=0;
        cc.tween(this.node).repeat(movePaths.length,cc.tween(this.node).call(()=>{
            App.AudioManager.playGameSound("sounds/walk");
            this._moveCube(chess.node,movePaths[index][0],movePaths[index][1],true,0.2,()=>{
                if(index==movePaths.length){
                    //是否进入安全区
                    if(this._checkInSafe(movePaths.pop())){
                        App.AudioManager.playGameSound("sounds/safeArea");

                    }
                    cb&&cb();
                }
            });
            index++;
        }).delay(0.3)).start();
    }

    backChess(movePaths:number[][],chessIndex:number,clientId:number){
        this.pzAnim.node.active=true;
        this.pzAnim.setAnimation(0,"pengzhuangguang",false);
        let chess=this._chessMap.get(clientId)[chessIndex];


        this.pzAnim.node.position=chess.node.position;
        let time=Math.min(0.1,2/movePaths.length);
        App.AudioManager.playGameSound("sounds/hit");
        this.scheduleOnce(()=>{
            chess.node.scale=1;
            let index=0;
            App.AudioManager.playGameSound("sounds/back");
            this.schedule(()=>{
                if(index==movePaths.length){
                    cc.tween(chess.node).to(time,{x:chess.offset.x,y:chess.offset.y}).start();
                    App.AudioManager.stopGameSound("sounds/back");
                    return
                }
                this._moveCube(chess.node,movePaths[index][0],movePaths[index][1],true,time);
                index++;
            },time,movePaths.length);
        },0.2)
        
        return time*movePaths.length+time+0.2;
    }
    

    backChessNoAnim(chessIndex:number,clientId:number){
        let chess=this._chessMap.get(clientId)[chessIndex];
        chess.node.position=cc.v3(chess.offset);
    }

    _moveCube(chess:cc.Node,x:number,y:number,hasAnim:boolean=true,time:number=0.2,cb?:Function){
        let pos=this._xyFormatVec2(x,y);
        chess.zIndex=LAYER_INDEX.MOVE;
        if(hasAnim){
            cc.tween(chess).parallel(
                cc.tween(chess).to(time,{x:pos.x,y:pos.y}),
                cc.tween(chess).sequence(
                    cc.tween(chess).to(time/3,{scaleX:0.9,scaleY:1.1}),
                    cc.tween(chess).to(time/3,{scaleX:1.1,scaleY:0.9}),
                    cc.tween(chess).to(time/3,{scaleX:1,scaleY:1}),
                )
            ).set({zIndex:LAYER_INDEX.CHESS-y}).call(cb).start();
        }else{
            chess.setPosition(pos);
        }
    }

    _xyFormatVec2(x:number,y:number){
        return cc.v2(x*CUBE_W+CUBE_W/2-this.nd_map.width/2,y*CUBE_H+CUBE_H/2-this.nd_map.height/2);
    }

    onChessInPath(chessIndex:number,clientId:number,cb?:Function){
        let chess=this._chessMap.get(clientId)[chessIndex];
        let xypos=CHESS_PATHS[clientId][0];
        let pos=this._xyFormatVec2.apply(this,xypos);
        chess.node.zIndex=LAYER_INDEX.MOVE;
        chess.node.angle=10;
        App.AudioManager.playGameSound("sounds/go")
        cc.tween(chess.node).to(0.5,{x:pos.x,y:pos.y,angle:0},cc.easeExponentialInOut()).set({zIndex:LAYER_INDEX.CHESS-xypos[1]}).call(()=>{
            cb&&cb()
        }).start();
    }

    /**
     * 用户棋子被打回
     * @param clientId 
     * @param chessIndex 
     */
    onUserChessBack(clientId:number,chessIndex:number,addScore:number){

    }

    /**
     * 用户重roll
     * @param clientId 坐位ID
     * @param num 
     * @param moveChessIndex 要移动的棋子的索引
     */
    onUserReRoll(clientId:number,num:number,moveChessIndex:number){

    }

    /**
     * 用户加分
     * @param clientId 
     */
    _addScore(clientId:number){

    }

    /**
     * 是否进入自动操作
     * @param val 
     */
    onUserAuto(val:boolean){

    }

    /**
     * 开始倒计时
     * @param lessTime 
     */
    starTimer(lessTime:number){

    }

    /**
     * 开始用户倒计时
     * @param clientId 
     * @param lessTime 
     * @param totalTime 
     */
    startPlayerTimer(clientId:number,lessTime:number,totalTime:number){
        
    }

    startRoll(clientId:number,noAnim?:boolean){
        this.players[clientId].showRoll();
        this._showPlayerLight(clientId);
        if(clientId==0){
            this.scheduleOnce(()=>{
                this.setFinger(true);
            },0.2)
        }

    }

    _showPlayerLight(clientId:number){
        let seat=this.players[clientId].getComponent(LudoPlayer).seat;
        let lightBox=this.nd_map.getChildByName("bg").getChildByName("lightbox_"+(seat+1));
        lightBox.active=true;
        lightBox.stopAllActions();
        cc.tween(lightBox).set({opacity:0}).repeatForever(cc.tween(lightBox).to(1,{opacity:255}).to(1,{opacity:0})).start();
    }

    _hidePlayerLight(clientId:number){
        let seat=this.players[clientId].getComponent(LudoPlayer).seat;
        let lightBox=this.nd_map.getChildByName("bg").getChildByName("lightbox_"+(seat+1));
        lightBox.stopAllActions();
        cc.tween(lightBox).to(0.1,{opacity:0}).set({active:false}).start();
    }

    hideRoll(clientId:number){
        this.players[clientId].hideRoll();
    }

    setRollResult(clientId:number,point:number){
        let player=this.players[clientId];
        player.setRollPoint(point);
        App.AudioManager.playGameSound("sounds/roll");
    }

    lightChess(clientId:number,chessIndex:number){
        let chess=this._chessMap.get(clientId)[chessIndex];
        chess.light();
        chess.node.zIndex=LAYER_INDEX.MOVE;
    }

    setSelfSeat(seat:number){
        this.nd_map.getChildByName("bg").angle=90*seat;
        for(let i =0;i<MAXSEAT;i++){
            let clientId=i+seat;
            if(clientId>=MAXSEAT)clientId-=MAXSEAT;
            for(let j=0;j<4;j++){
                this._chessMap.get(i)[j].init(clientId,j,i);
            }
            this.players[i].setHeadBox(clientId)
        }

    }

    hideLight(clientId:number){
       let chesss=this._chessMap.get(clientId);
       chesss.forEach(chess=>{
           chess.hideLight();
       })
    }

    setChessPos(clientId:number,chessIndex:number,x:number,y:number){
        let chessNode=this._chessMap.get(clientId)[chessIndex].node;
        this._moveCube(chessNode,x,y,false);
    }

    setChessId(clientId:number,chessIndex:number,id:number){
        this._chessMap.get(clientId)[chessIndex].id=id;
    }

    //更新棋子的大小
    updateChessSize(chessInfos:number[],x:number,y:number,noAnim:boolean=false){
        //还原棋子
        if(chessInfos.length==1){
            let chessInfo=chessInfos[0];
            let chessIndex=(chessInfo&15)-1;
            let clientId=chessInfo>>4;
            let chess=this._chessMap.get(clientId)[chessIndex];
            let px=CUBE_W*x-this.nd_map.width/2+CUBE_W/2,py=CUBE_H*y-this.nd_map.height/2+CUBE_H/2;
            cc.tween(chess.node).to(0.1,{scale:1,x:px,y:py}).start();
            chess.node.zIndex=LAYER_INDEX.CHESS-y;
            return
        }
        //缩小棋子
        let px=CUBE_W*x-this.nd_map.width/2,py=CUBE_H*y-this.nd_map.height/2;
        let scale=0;
        let t=0;
        let len=chessInfos.length;
        if(len>9){
            t=4;
        }else if(len>4){
            t=3;
        }else{
            t=2;
        }
        scale=1/t;
        px+=CUBE_W*scale/2;
        if(len==2){
            py+=CUBE_H/2;
        }else{
            py+=CUBE_H*scale/2;
        }
        for(let i=0;i<chessInfos.length;i++){
            let chessInfo=chessInfos[i];
            let x1=px+CUBE_W*scale*(i%t);
            let lessCount=len%t;
            if((len-i)<=lessCount&&lessCount!=0){
                x1+=(t-lessCount)*CUBE_W*scale/2
            }
            let y1=py+CUBE_H*scale*Math.floor(i/t);
            let chessIndex=(chessInfo&15)-1;
            let clientId=chessInfo>>4;
            let chess=this._chessMap.get(clientId)[chessIndex];
            chess.node.stopAllActions();
            chess.node.zIndex=LAYER_INDEX.CHESS-y;
            if(noAnim){
                chess.node.scale=scale;
                chess.node.x=x1;
                chess.node.y=y1;
            }else{
                cc.tween(chess.node).to(0.1,{scale:scale,x:x1,y:y1}).start();
            }
        }
    }

    showTimer(clientId:number,lessTime:number,totalTime:number,cb?:Function){
        this.players[clientId].startTimer(lessTime,totalTime,(lessTime,time,isChange)=>{
            if(clientId==0&&lessTime<=(totalTime/2)&&isChange){
                App.AudioManager.playGameSound("sounds/lesstime");
            }
        },cb);
    }

    setFinger(val:boolean){
        this.finger.active=val;
    }

    hideTimer(clientId:number){
        this.players[clientId].hideTimer();
        this._hidePlayerLight(clientId);
    }

    setRerollCount(lessCount:number){
        this.UIBindData.rerollcount=lessCount.toString();
    }

    showRerollTimer(time:number){
        this._canReRoll=true;
        //this.UI_BTNS.get("reroll").getComponent(cc.Button).interactable=true;
        this.UI_BTNS.get("reroll").color=cc.Color.WHITE;
        this.reRollTimer.startTimer(time,time,null,this.hideReRollTimer.bind(this));
    }

    hideReRollTimer(){
        this._canReRoll=false;
        this.UI_BTNS.get("reroll").color=cc.Color.GRAY;
        this.reRollTimer.stopTimer();
    }

    hideRollTip(){
        if(!this.rerollTip.active)return;
        this.rerollTip.stopAllActions();
        cc.tween(this.rerollTip).to(0.1,{scale:0}).set({active:false}).start();
    }
    
    onRerollClick(){
        if(this._canReRoll){
            this.hideRollTip();
            cc.game.emit(ReRoll_Click);
            this.hideReRollTimer();
        }else{
            if(!this.rerollTip.active){
                this.rerollTip.stopAllActions();
                this.rerollTip.active=true;
                this.rerollTip.scale=0;
                cc.tween(this.rerollTip).to(0.2,{scale:1}).start();
            }else{
                this.hideRollTip();
            }
        }
    }

    onRankClick(){
        if(this.rewardView.active){
            this.rewardView.stopAllActions();
            cc.tween(this.rewardView).to(0.2,{scale:0}).set({active:false}).start();
        }else{
            this.rewardView.active=true;
            this.rewardView.scale=0;
            this.rewardView.stopAllActions();
            cc.tween(this.rewardView).to(0.2,{scale:1}).delay(3).call(this.onRankClick.bind(this)).start();
            this.finishTipView.stopAllActions();
            this.finishTipView.active=false;
        }
    }

    onRuleClick(){
        if(this.finishTipView.active){
            this.finishTipView.stopAllActions();
            cc.tween(this.finishTipView).to(0.2,{scale:0}).set({active:false}).start();
        }else{
            this.finishTipView.active=true;
            this.finishTipView.scale=0;
            this.finishTipView.stopAllActions();
            cc.tween(this.finishTipView).to(0.2,{scale:1}).delay(3).call(this.onRuleClick.bind(this)).start();
            this.rewardView.stopAllActions();
            this.rewardView.active=false;
        }
    }

    onHelpClick(){
        App.DlgManager.showDlg("help",null,"game107");
        /*
        let index=Math.floor(Math.random()*4);
        let index1=Math.floor(Math.random()*54);
        let pos=CHESS_PATHS[index][index1];
        cc.log(">>>>>>>>>>>>>>>sssssss",index,index)
        this.showFinishAnim(index,pos[0],pos[1]);*/
    }

    updatePlayerScore(clientId:number,score:number){
        this.players[clientId].setScore(score);
    }

    onBackClick(){
        App.DlgManager.showDlg("confirm",null,"game107");
    }

    addScore(clientId:number,x:number,y:number,scoreType:ludo.ScoreType,score:number){
        let node=this._addScorePool.get();
        if(!node){
            node=cc.instantiate(this.pb_addScore);
        }
        let icon_loot=node.getChildByName("icon_loot");
        let icon_extra=node.getChildByName("icon_extra");
        let scoreLb=node.getChildByName("label").getComponent(cc.Label);
        scoreLb.string="+"+score;
        icon_loot.active=scoreType==ludo.ScoreType.SCORE_TYPE_ATTACK;
        icon_extra.active=!icon_loot.active;
        this.nd_map.addChild(node);
        this._scoreNodes.push(node);
        node.opacity=255;
        node.anchorX=0.5;
        node.zIndex=LAYER_INDEX.SCORE;
        node.x=x*CUBE_W-this.nd_map.width/2+CUBE_W/2;
        node.y=y*CUBE_H-this.nd_map.height/2+CUBE_H/2;
        node.getComponent(cc.Layout).updateLayout();
        //靠左的情况
        if((node.x-node.width/2)<-this.nd_map.width/2){
            node.anchorX=0;
            node.getComponent(cc.Layout).updateLayout();
        }else if((node.x+node.width/2)>this.nd_map.width/2){
            node.anchorX=1;
            node.getComponent(cc.Layout).updateLayout();
        }
        cc.tween(node).delay(1.5).to(0.2,{opacity:0}).call(node=>{
            this._addScorePool.put(node);
            this._scoreNodes.splice(this._scoreNodes.indexOf(node),1);
        }).start();
        //所有飘分上移
        for(let i=0;i<this._scoreNodes.length;i++){
            let node=this._scoreNodes[i];
            cc.tween(node).to(0.2,{y:(y+1)*CUBE_H-this.nd_map.height/2+(this._scoreNodes.length-i-1)*50+30}).start();
        }
    }

    playYanHua(){
        this.yanHuaAnim.node.active=true;
        this.yanHuaAnim.setAnimation(0,"yanhua",false);
        App.AudioManager.playGameSound("sounds/finish")
        
    }

    setAutoCheck(val:boolean){
        this.autoCheck.active=val;
    }

    onCancelAutoClick(){
        Game107Proto.sendCancelAuto();
    }

    setRewardInfo(rewards:ludo.IMatchRewardInfo[]){
        for(let i=0;i<rewards.length;i++){
            let rewardData=rewards[i];
            let rankView=this.rewardView.getChildByName("rank"+(i+1));
            let iconSp=rankView.getChildByName("icon").getComponent(cc.Sprite);
            let countLb=rankView.getChildByName("count").getComponent(cc.Label);
            iconSp.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+rewardData.rewards[0].prop_type);
            countLb.string="+"+formatCurrency(rewardData.rewards[0].amount);
        }
    }

    setTip(val:boolean,tip?:string){
        this.UI_LBS.get("reconnect").parent.active=val;
        if(tip)this.UIBindData.reconnect=tip;
    }

    getTestRollCount(){
        return parseInt(this.UIBindData.testRollCount || "0");
    }

    addPointToPanel(clientId:number,point:number){
        this.players[clientId].addRollPoint(point);
    }

    showPointPanel(clientId:number){
        this.players[clientId].showRollPanel();
    }

    hidePointPanel(clientId:number){
        this.players[clientId].hideRollPanel();
    }

    dropDownChess(clientId:number,chessIndex:number){
        let chessNode=this._chessMap.get(clientId)[chessIndex];
        let offsetY=chessNode.node.y;
        chessNode.node.y=chessNode.node.y+100;
        let scale=chessNode.node.scale;
        cc.tween(chessNode.node).repeat(
            (clientId==0)?2:1,
            cc.tween(chessNode.node).to(0.2,{y:offsetY,scaleY:scale*0.8}).to(0.2,{scaleY:scale})
        ).start();
    }

    private _reconnectHandler;    
    showReconnectTip(){
        let time=0;
        let handler=()=>{
            this.setTip(true,`Network connection failed.\n Reconnecting(${time++}s)`)
        }
        if(this._reconnectHandler){
            this.unschedule(this._reconnectHandler);
        }
        this._reconnectHandler=handler;
        this.schedule(handler,1);
    }

    hideConnectTip(){
        if(this._reconnectHandler){
            this.unschedule(this._reconnectHandler);
        }
    }

    private FINISHANIM_POS:cc.Vec2[]=[
        cc.v2(-217,-200),
        cc.v2(-217,243),
        cc.v2(217,243),
        cc.v2(217,-200)
    ]

    showFinishAnim(clientId:number,x:number,y:number){
        let pos=new cc.Vec2();
        pos.x=x*CUBE_W-this.nd_map.width/2+CUBE_W/2;
        pos.y=y*CUBE_H-this.nd_map.height/2+CUBE_H/2;
        pos.addSelf(this.nd_map.getPosition());
        this.tuoweiNode.setPosition(pos);
        this.tuoweiNode.active=true;
        this.tuoweiNode.opacity=255;
        let moveTime=0.5;
        this.tuoweiNode.stopAllActions();
        this.tuoweiNode.runAction(cc.sequence(
            cc.jumpTo(moveTime,this.FINISHANIM_POS[clientId],100,1),
            cc.fadeOut(0.2),
            cc.callFunc(node=>{
                node.active=false;
            })
        ));
        this.scheduleOnce(()=>{
            this.finishTip.node.active=true;
            this.finishTip.node.setPosition(this.FINISHANIM_POS[clientId]);
            this.finishTip.setAnimation(0,"80",false);
        },moveTime)

    }
}
