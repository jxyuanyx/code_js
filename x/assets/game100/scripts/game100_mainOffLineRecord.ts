// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { GameEvents } from "../../gamecore/events/GameEvents";
import { Package } from "../../gamecore/net/Package";
import GameHelper from "../../gamecore/tools/GameHelper";
import BaseGameScene from "../../gamecore/ui/baseview/imp/BaseGameScene";
import { ComDlgData } from "../../mainpackage/dialogs/comdlg/ComDlg";
import Game100Card from "../prefabs/card/Game100Card";
import { Game100CardZone, Game100Events } from "./game100_enum";
import Game100Helper from "./game100_helper";
import {Game100RoomServiceOffline, OpearCode, OpearData, RULE_SCORES} from "./game100_roomServiceOffLine";
import Game100RoomView from "./game100_roomView";

const {ccclass, property} = cc._decorator;


@ccclass
export default class Game100MainOffLineRecord extends BaseGameScene<Game100RoomView,Game100RoomServiceOffline>  {

    @property(cc.Node)
    checkbg:cc.Node;

    @property(cc.Node)
    pauseBtn:cc.Node;


    private _currentTime:number=0;      //当前的时间

    private _isGameOver:boolean=false;  

    private _roomInfo:any;

    private _opearSteps:{time:number,count:number,hasNewCard:boolean,score:number,freeTimes:number,code:number,fromIndex:number,toIndex:number}[];

    private _pause:boolean=false;

    onLoad () {
        super.onLoad();
        this.init(Game100RoomView,Game100RoomServiceOffline);
        this._addEvent();

        App.AudioManager.playGameBGM("sounds/bgm",true);

        cc.find("mask",this.node).zIndex=200000;
        cc.find("opearmenu",this.node).zIndex=cc.find("mask",this.node).zIndex+1;

    }

    _addEvent(){
        cc.game.on(Game100Events.MVCARD_Z2B,this._moveCardZ2B,this);
        cc.game.on(Game100Events.MVCARD_Z2Z,this._moveCardZ2Z,this);
        cc.game.on(Game100Events.MVCARD_D2Z,this._moveCardD2Z,this);
        cc.game.on(Game100Events.MVCARD_B2Z,this._moveCardB2Z,this);
        cc.game.on(Game100Events.MVCARD_D2B,this._moveCardD2B,this);
        cc.game.on(Game100Events.AUTO_MOVE,this._autoMove,this);
        cc.game.on(Game100Events.GAME_CONTINUE,this._gameContinue,this);
        cc.game.on(cc.game.EVENT_HIDE,this._onGameHide,this);
        cc.game.on(cc.game.EVENT_SHOW,this._onGameShow,this);
        //cc.game.on(Game100Events.GAMEOVER,this._onGameOver,this);
        cc.game.on(GameEvents.UPLOAD_GAME_RESULT_SUCCESS,this._onUploadResultSuccess,this);
        cc.game.on(GameEvents.PASS_BACK,this.onExitClick,this);
    }

    _onUploadResultSuccess(){
        App.DlgManager.hideDlg("gameover","game100")
        App.DlgManager.hideDlg("pause","game100")
        App.SceneManager.backHall();
    }

    _onGameOver(){
        this._isGameOver=true;
        cc.error("this._roomfInfo",this._roomInfo)
        let lessTime
        if((this._roomInfo.EndData?.lessTime)!=undefined){
            lessTime=this._roomInfo.EndData.lessTime
        }else{
            lessTime=this._roomView.getLessTime();
        }
        this._roomView.setLeftTime(lessTime);
        
        //设置游戏剩余时间
        let timeScore=this._roomService.getTimeScore(lessTime);
        App.DlgManager.showDlg("recordGameover",{
            reward:{ 
                Score:this._roomService.score,
                TimeScore:timeScore
            }
        },"game100");
        cc.director.getScheduler().setTimeScale(1);
        App.AudioManager.stopBgm();
    }

    _onGameHide(){
        if(!this._isGameOver){
            this.onPause1Click({currentTarget:this.pauseBtn});
        }        
    }

    _onGameShow(){

    }

    _autoMove(card:number,index:number,cardZone:Game100CardZone,count:number,value:number){
        let info=this._roomService.getCardMoveInfo(card,cardZone,count);
        if(info){
            if(cardZone==Game100CardZone.BOX&&info.type==Game100CardZone.ZONE){
                this._moveCardB2Z(index,info.index,value);
            }
            if(cardZone==Game100CardZone.DEAL&&info.type==Game100CardZone.BOX){
                this._moveCardD2B(info.index,value);
            }
            if(cardZone==Game100CardZone.ZONE&&info.type==Game100CardZone.ZONE){
                this._moveCardZ2Z(index,info.index,count);
            }
            if(cardZone==Game100CardZone.ZONE&&info.type==Game100CardZone.BOX){
                this._moveCardZ2B(index,info.index,value);
            }
            if(cardZone==Game100CardZone.DEAL&&info.type==Game100CardZone.ZONE){
                this._moveCardD2Z(info.index);
            }
        }else{
            this._roomView.cantMove();
        }
    }
    
    _checkAutoGetNextRandomCard(){
        let log=new OpearData();
        log.code=OpearCode.GET_RANDOM_CARDS_AUTO;
        log.cards=this._roomService.getDealCardDatas();
        this._roomService.logOpear(log);

        let cards=this._roomService.getDealCards();
        this._roomView.showAutoNextCards(cards);
    }


    _moveCardD2Z(toIndex:number){

        let log=new OpearData();
        log.code=OpearCode.D2Z;
        log.fromIndex=toIndex;
        this._roomService.logOpear(log);

        this._roomView.moveCardD2Z(toIndex);

        this._roomService.increaseScore(RULE_SCORES.D_Z);
        this._roomView.setScore(this._roomService.score,true,false);

        if(this._roomService.moveCardD2Z(toIndex)){
            this._checkAutoGetNextRandomCard();
        }
        this._checkGameOver();

        this._roomView.setNoCardsTip(this._roomService.hasNoCardsTip());
    }

    _moveCardB2Z(boxIndex:number,toIndex:number,value:number){

        let log=new OpearData();
        log.code=OpearCode.B2Z;
        log.fromIndex=boxIndex;
        log.toIndex=toIndex;
        this._roomService.logOpear(log);

        this._roomService.increaseScore(-RULE_SCORES.D_B[value]);
        this._roomView.setScore(this._roomService.score);

        this._roomView.moveCardB2Z(boxIndex,toIndex);
        this._roomService.moveCardB2Z(boxIndex,toIndex);

       
    }

    _moveCardD2B(boxIndex:number,value:number){

        let log=new OpearData();
        log.code=OpearCode.D2B;
        log.fromIndex=boxIndex;
        this._roomService.logOpear(log);


        this._roomView.moveCardD2B(boxIndex);
        if(this._roomService.moveCardD2B(boxIndex)){
            this._checkAutoGetNextRandomCard();
        }
        this._checkGameOver();
        this._roomService.increaseScore(RULE_SCORES.D_B[value]+RULE_SCORES.D_Z);
        this._roomView.setScore(this._roomService.score,true,false);

        this._roomView.setNoCardsTip(this._roomService.hasNoCardsTip());
       
    }

    _moveCardZ2B(fromIndex:number,toBoxIndex:number,value:number){

        let log=new OpearData();
        log.code=OpearCode.Z2B;
        log.fromIndex=fromIndex;0
        log.toIndex=toBoxIndex;


        this._roomView.moveCardZ2B(fromIndex,toBoxIndex);
        this._roomService.moveCardZ2B(fromIndex,toBoxIndex);
        let ret=this._getNewCardZone(fromIndex)
        log.hasNewCard=ret;
        this._roomService.logOpear(log);

        this._roomService.increaseScore(RULE_SCORES.D_B[value])
        this._roomView.setScore(this._roomService.score);
        if(ret){
            this._roomService.increaseScore(RULE_SCORES.OPEN)
            this.scheduleOnce(()=>{
                this._roomView.setScore(this._roomService.score);
            },0.2)
        }
    }

    _moveCardZ2Z(fromIndex:number,toIndex:number,moveCount:number,isBack?:boolean){
        let log=new OpearData();
        log.code=OpearCode.Z2Z;
        log.fromIndex=fromIndex;
        log.toIndex=toIndex;
        log.count=moveCount;
        this._roomService.logOpear(log);
        this._roomService.moveCardZ2Z(fromIndex,toIndex,moveCount);
        this._roomView.moveCardZ2Z(fromIndex,toIndex,moveCount);
        let ret=this._getNewCardZone(fromIndex);

        if(ret){
            this._roomService.increaseScore(RULE_SCORES.OPEN)
            this._roomView.setScore(this._roomService.score);
        }
        log.hasNewCard=ret;
    }

    _getNewCardZone(fromIndex:number){
        let card=this._roomService.getCardForZone(fromIndex);
        if(card){
            //this._roomService.logNewCard(fromIndex);
           // let ret=this._roomView.showNewCard(card,fromIndex);
           // this._roomView.setScore(this._roomService.score);
            let ret=this._roomView.showNewCard(card,fromIndex);
            if(ret){
                this._checkGameOver();
            }
            return ret;
        }
        return false
    }


    onMessage(pkg:Package){
        
    }
    
    afterEnter(){
        this.scheduleOnce(()=>{
            this._roomView.setLeftTime(300);
            this._roomView.startTimer();
            let gameInfo=JSON.parse(App.DataManager.getGameData().tableData);
            //let gameInfo={"StartData":{"RandomCards":[55,27,65,19,68,53,35,37,73,20,24,41,23,74,59,77,17,34,44,61,49,33,18,67],"ZoneData":[[26],[45,75],[50,52,22],[38,51,40,36],[43,21,39,56,60],[69,54,25,66,72,70],[71,58,28,42,76,29,57]]},"OpearDatas":[{"time":1632161797310,"count":1,"hasNewCard":false,"score":0,"freeTimes":3,"code":5,"cards":[]},{"time":1632161797834,"count":1,"hasNewCard":true,"score":0,"freeTimes":3,"code":1,"fromIndex":1,"toIndex":4},{"time":1632161797846,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[55,27,65]},{"time":1632161798213,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[19,68,53]},{"time":1632161798756,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[35,37,73]},{"time":1632161799161,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[20,24,41]},{"time":1632161799548,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[23,74,59]},{"time":1632161800833,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[77,17,34]},{"time":1632161801039,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[44,61,49]},{"time":1632161801436,"count":1,"hasNewCard":false,"score":20,"freeTimes":3,"code":5,"cards":[33,18,67]},{"time":1632161802190,"count":1,"hasNewCard":false,"score":20,"freeTimes":2,"code":5,"cards":[]},{"time":1632161802913,"count":1,"hasNewCard":false,"score":20,"freeTimes":2,"code":4,"fromIndex":0},{"time":1632161804228,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[55,27]},{"time":1632161805028,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[19,68,53]},{"time":1632161806243,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[35,37,73]},{"time":1632161807477,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[20,24,41]},{"time":1632161808087,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[23,74,59]},{"time":1632161808890,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[77,17,34]},{"time":1632161809278,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":1,"fromIndex":0,"toIndex":4},{"time":1632161809464,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[44,61,49]},{"time":1632161809696,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":1,"fromIndex":1,"toIndex":0},{"time":1632161809877,"count":1,"hasNewCard":false,"score":140,"freeTimes":2,"code":5,"cards":[33,18,67]},{"time":1632161811627,"count":1,"hasNewCard":false,"score":140,"freeTimes":1,"code":5,"cards":[]},{"time":1632161813223,"count":1,"hasNewCard":false,"score":140,"freeTimes":1,"code":2,"fromIndex":3},{"time":1632161814121,"count":1,"hasNewCard":false,"score":160,"freeTimes":1,"code":5,"cards":[55,27]}],"EndData":{}}
            this._roomInfo=gameInfo;
            this._opearSteps=gameInfo.OpearDatas;
            this._roomService.startNewGame(gameInfo.StartData.RandomCards,gameInfo.StartData.ZoneData);
            let cards=this._roomService.getStartCards();
            
            //开启回放
            this._currentTime=gameInfo.StartData.time
            this.schedule(this.updateReplay,0.1,cc.macro.REPEAT_FOREVER,0);
            this._roomView.dealCards(cards,()=>{
                //如果没有操作，则直接强束
                if(!this._opearSteps || this._opearSteps.length==0){
                    cc.director.getScheduler().pauseTarget(this);
                    cc.director.getScheduler().pauseTarget(this._roomView);
                    this._onGameOver();
                }else{
                    //老的数据兼容
                    cc.error(">>>Sssssssssss",this._currentTime)
                    if(!this._currentTime){
                        this._currentTime=this._opearSteps[0].time;
                    }
                }
            });
          

        },0.2)
    }

    updateReplay(dt){
        this._currentTime+=dt*1000;
        if(!this._opearSteps || this._opearSteps.length==0)return
        if(this._currentTime>=this._opearSteps[0].time){
            let opearData=this._opearSteps.shift();
            this._doRecordAction(opearData)
            //录像播放结束
            if(!this._isGameOver&&this._opearSteps.length==0){
                this._roomView.stopTimer();
                this._onGameOver();
            }
        }
        //this._pause=true;
    }
    /*
    export enum OpearCode{
        Z2B,
        Z2Z,
        D2Z,
        B2Z,
        D2B,
        GET_RANDOM_CARDS,
        GET_RANDOM_CARDS_AUTO,
        OPEN_NEWCARD
    }   */    
    _doRecordAction(opearData:any){
       // this._roomView.setScore(opearData.score);
        //this._roomService.score=opearData.score;
        switch(opearData.code){
            case OpearCode.Z2Z:
                this._moveCardZ2Z(opearData.fromIndex,opearData.toIndex,opearData.count);
                break;
            
            case OpearCode.D2Z:
                this._moveCardD2Z(opearData.fromIndex);
                break;
                
            case OpearCode.B2Z:
                let data=Game100Helper.getLogicValue(this._roomService.getBoxCardData(opearData.fromIndex));
                this._moveCardB2Z(opearData.fromIndex,opearData.toIndex,data);
                break;
            case OpearCode.Z2B:
                let zoneData=Game100Helper.getLogicValue(this._roomService.getZoneCardData(opearData.fromIndex));
                this._moveCardZ2B(opearData.fromIndex,opearData.toIndex,zoneData)
                break;
            case OpearCode.D2B:
                let randomData=Game100Helper.getLogicValue(this._roomService.getDealLastData());
                this._moveCardD2B(opearData.fromIndex,randomData)
                break;
            case OpearCode.GET_RANDOM_CARDS:
                this.onGetCardClick();
                return;
            case OpearCode.UNDO:
                this.onUndoClick();
                return;
        }
    }

    
    onGetCardClick(){

        if(!this._roomView.canClick())return

        if((this._roomService.leftCard==0)&&this._roomService.hasNoCardsTip()){
            GameHelper.showTopTip(App.LangManager.getTxtByCurrentGame("noCardsTip"));
            return;
        }
        if(this._roomService.freeTime<=0&&this._roomService.leftCard==0){
            if(this._roomService.score<20){
                GameHelper.showTopTip(App.LangManager.getTxtByCurrentGame("noPoint"));
                return;
            }else{
                this._roomService.score-=20;
                this._roomService.increaseScore(-20);
                this._roomView.setScore(this._roomService.score);
            }
        }
      
        if(this._roomService.leftCard==0){

            let log=new OpearData();
            log.code=OpearCode.GET_RANDOM_CARDS;
            log.cards=this._roomService.getDealCardDatas();
            this._roomService.logOpear(log);

            this._roomView.backCards([]);
            this._roomView.roundOver(false);
            this._roomService.resetRound();
            this._roomService.freeTime--;
            this._roomView.setFreeTime(this._roomService.freeTime);
            return;
        }

        this._getNewCards();
        if(this._roomService.leftCard==0){
            this._roomView.roundOver(true);
        }
    }

    _getNewCards(){
        let log=new OpearData();
        log.code=OpearCode.GET_RANDOM_CARDS;
        log.cards=this._roomService.getDealCardDatas();
        this._roomService.logOpear(log);

        let cards=this._roomService.getDealCards();
        this._roomView.getCards(cards);
    }

    _checkGameOver(){
        if(!this._roomView.canCheckGameOver()){
            return;
        }
        
        let paths=this._roomService.getAutoSolvePath();
        if(paths){
            this._isGameOver=true;
            this._roomView.stopTimer();
            this._roomView.onAutoFinish();
            this._roomView.autoSolvePaths(paths,(path:{fromIndex:number,toIndex:number,cardZone:Game100CardZone},card:Game100Card)=>{
                this._roomService.increaseScore(RULE_SCORES.D_B[card.cardValue])
                this._roomView.setScore(this._roomService.score,true,true,false);
            },()=>{
                //播放销肥动画
                this._roomView.playGameOverAnim();
                this._onGameOver();
            });
        }
    }

    _setCheck(node:cc.Node){
        this.checkbg.setPosition(node.position);
        this.checkbg.opacity=0;
        cc.tween(this.checkbg).stop();
        cc.tween(this.checkbg).to(0.1,{opacity:255}).start();
    }

    //回放被暂停
    onPause1Click(event){
        this._setCheck(event.currentTarget);
        cc.director.getScheduler().pauseTarget(this);
        cc.director.getScheduler().pauseTarget(this._roomView);
        App.AudioManager.pauseMusic();
        this._pause=true;
    }

    //播入回放
    onPlayClick(event){
        this._setCheck(event.currentTarget);
        cc.director.getScheduler().resumeTarget(this);
        cc.director.getScheduler().resumeTarget(this._roomView);
        cc.director.getScheduler().setTimeScale(1);
        App.AudioManager.resumeMusic();
        this._pause=false;
    }

    //快进点击
    onQuickClick(event){
        App.AudioManager.resumeMusic();
        this._setCheck(event.currentTarget);
        cc.director.getScheduler().resumeTarget(this);
        cc.director.getScheduler().resumeTarget(this._roomView);
        cc.director.getScheduler().setTimeScale(2);
        this._pause=false;
    }

    //退出回放
    onExitClick(){
        cc.director.getScheduler().pauseTarget(this);
        cc.director.getScheduler().pauseTarget(this._roomView);
        App.AudioManager.pauseMusic();
        let data:ComDlgData = new ComDlgData();
        data.title = "Tips";
        data.group = [{name:App.LangManager.getTxtByCurrentGame("cancel"),isExit:true,cb:()=>{
            if(!this._pause){
                cc.director.getScheduler().resumeTarget(this);
                cc.director.getScheduler().resumeTarget(this._roomView);
                App.AudioManager.resumeMusic();
            }
        }},{name:App.LangManager.getTxtByCurrentGame("backToHall"),isExit:true,cb:()=>{
            cc.director.getScheduler().setTimeScale(1);
            App.DataManager.clearTableData();
            App.SceneManager.backHall();
        }}];
        data.txt = App.LangManager.getTxtByCurrentGame("playRecordEnd");
        data.clickSpaceHide=false;
        App.DlgManager.showDlg("comdlg",data,"game100");
    }

    _gameContinue(){
        this._roomView.startTimer();
        App.AudioManager.resumeMusic();
    }

    onUndoClick(){
        let opearData:OpearData=this._roomService.opearBack();
        if(!opearData)return null;

        this._roomView.setScore(opearData.score);
        this._roomService.score=opearData.score;
        this._roomService.setCheckScore(opearData.score);
        switch(opearData.code){
            case OpearCode.Z2Z:
                if(opearData.hasNewCard){
                    this._roomView.muckCard(opearData.fromIndex);
                }
                this._roomService.moveCardZ2Z(opearData.toIndex,opearData.fromIndex,opearData.count);
                this._roomView.moveCardZ2Z(opearData.toIndex,opearData.fromIndex,opearData.count);
                break;
            case OpearCode.D2Z:
                this._roomView.moveCardZ2D(opearData.fromIndex);
                this._roomService.moveCardZ2D(opearData.fromIndex);
                this._roomView.setNoCardsTip(this._roomService.hasNoCardsTip());
                break;
            case OpearCode.B2Z:
                this._roomView.moveCardZ2B(opearData.toIndex,opearData.fromIndex);
                this._roomService.moveCardZ2B(opearData.toIndex,opearData.fromIndex);
                this._roomView.setScore(opearData.score,false);
                break;
            case OpearCode.Z2B:
                if(opearData.hasNewCard){
                    this._roomView.muckCard(opearData.fromIndex);
                }
                this._roomView.moveCardB2Z(opearData.toIndex,opearData.fromIndex);
                this._roomService.moveCardB2Z(opearData.toIndex,opearData.fromIndex);
                this._roomView.setScore(opearData.score,false);
                break;
            case OpearCode.D2B:
                this._roomView.moveCardB2D(opearData.fromIndex);
                this._roomService.moveCardB2D(opearData.fromIndex);
                this._roomView.setNoCardsTip(this._roomService.hasNoCardsTip());
                break;
            case OpearCode.GET_RANDOM_CARDS_AUTO:
            case OpearCode.GET_RANDOM_CARDS:
                let ret;
                if(opearData.code==OpearCode.GET_RANDOM_CARDS_AUTO){
                    this._roomView.backNextCards();
                    ret=this._roomService.backNextCards(opearData.cards);
                }else{
                    ret=this._roomService.undoGetCards(opearData.cards);
                    this._roomView.backCards(opearData.cards);
                }
  
                this._roomView.roundOver((ret&&this._roomService.freeTime<=3));
                this._roomView.setFreeTime(this._roomService.freeTime);
                this._roomView.setScore(this._roomService.score,false);
                if(opearData.code==OpearCode.GET_RANDOM_CARDS_AUTO){
                    this.onUndoClick();
                }
                break;
        }
    }

    // update (dt) {}
}
