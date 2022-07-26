// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { GameEvents } from "../../gamecore/events/GameEvents";
import { GameResult } from "../../gamecore/manager/imps/DataManager";
import { Package } from "../../gamecore/net/Package";
import GameHelper from "../../gamecore/tools/GameHelper";
import BaseGameScene from "../../gamecore/ui/baseview/imp/BaseGameScene";
import { GUIDE_STEPS } from "../../mainpackage/hall/guid/HallGuideConfig";
import Game100Card from "../prefabs/card/Game100Card";
import game100_disrupt from "./game100_disrupt";
import { Game100CardZone, Game100Events } from "./game100_enum";
import {Game100RoomServiceOffline, OpearCode, OpearData, RULE_SCORES} from "./game100_roomServiceOffLine";
import Game100RoomView from "./game100_roomView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game100MainOffLine extends BaseGameScene<Game100RoomView,Game100RoomServiceOffline>  {


    private _isGameOver:boolean=false;


    onLoad () {
        super.onLoad();
        this.init(Game100RoomView,Game100RoomServiceOffline);
        this._addEvent();

        App.AudioManager.playGameBGM("sounds/bgm",true);

        App.NativeManager.echo("test game100 update")


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
        cc.game.on(Game100Events.GAMEOVER,this._onGameOver,this);
        cc.game.on(GameEvents.UPLOAD_GAME_RESULT_SUCCESS,this._onUploadResultSuccess,this);
        cc.game.on(GameEvents.PASS_BACK,this.onPauseClick,this);
    }



    _onUploadResultSuccess(){
        App.DlgManager.hideDlg("gameover","game100")
        App.DlgManager.hideDlg("pause","game100")
        App.SceneManager.backHall();
    }

    _onGameOver(type:number = 0){
        this._isGameOver=true;
        //设置游戏剩余时间
        let playTime=App.DataManager.getGameInitInfo().match_info.left_time-this._roomView.getLessTime();
        this._setPlayTime(playTime);
        let lessTime=this._roomView.getLessTime();
        this._roomService.setOpearLessTime(lessTime);
        let timeScore=this._roomService.getTimeScore(lessTime);
        let matchInfo=App.DataManager.getGameInitInfo().match_info;
        this._onAddScore(timeScore);
        App.DlgManager.showDlg("gameover",{
            reward:{
                Score:this._roomService.score,
                TimeScore:timeScore
            },
            TodayBestScore:matchInfo.today_best_score,
            LiftBestScore:matchInfo.life_best_score,
            Score:this._roomService.score+timeScore,
            CheckCode:"",
            Steps:JSON.stringify(this._roomService.getUploadData()),
            TotalRound:matchInfo.total_round,
            TotalScore:matchInfo.total_score,
            Reason:type
        },"game100");
        App.AudioManager.stopBgm();
    }

    _onGameHide(){
        let isGuide=!cc.sys.localStorage.getItem("guide_game100");
        if(!this._isGameOver&&!isGuide){
            this.onPauseClick();
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
            this._roomView.setUndoEnable(true);
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
        this._roomView.setUndoEnable(true);
    }


    _moveCardD2Z(toIndex:number){

        let log=new OpearData();
        log.code=OpearCode.D2Z;
        log.fromIndex=toIndex;
        this._roomService.logOpear(log);

        this._roomView.moveCardD2Z(toIndex);
        this._roomView.setUndoEnable(true);

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

        //this._roomService.score-=RULE_SCORES.D_B[value];
        this._roomService.increaseScore(-RULE_SCORES.D_B[value]);
        this._roomView.setScore(this._roomService.score);

        this._roomView.moveCardB2Z(boxIndex,toIndex);
        this._roomService.moveCardB2Z(boxIndex,toIndex);

        this._roomView.setUndoEnable(true);
    }

    _moveCardD2B(boxIndex:number,value:number){
        let log=new OpearData();
        log.code=OpearCode.D2B;
        log.fromIndex=boxIndex;
        this._roomService.logOpear(log);

        this._roomView.moveCardD2B(boxIndex);
        this._roomView.setUndoEnable(true);
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
        log.fromIndex=fromIndex;
        log.toIndex=toBoxIndex;


        this._roomView.moveCardZ2B(fromIndex,toBoxIndex);
        this._roomService.moveCardZ2B(fromIndex,toBoxIndex);
        this._roomView.setUndoEnable(true);
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
        this._roomView.setUndoEnable(true);
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
        // if (App.NativeManager.isTest()) {
        //     App.DlgManager.showDlg("matchDealer",{normalCb:()=>{
        //         this._enterGame();
        //     },testCb:(obj:any)=>{
        //         this._enterGame(obj);
        //     }},"game100")
        // }
        // else{
            this.scheduleOnce(()=>{
                this._enterGame();
            },0.2)
        // }
    }

    private _enterGame(arr?:any){
        let data;
        let obj:any = null;
        let isGuide=cc.sys.localStorage.getItem("guide_game100");
        if(!isGuide&&!App.isCheck){
            data=this._roomService.getGuideGameInfo();
            this._roomView.setLeftTime(data.match_info.left_time);
            obj=data.game_init;
        }else{
            data=App.DataManager.getGameInitInfo();
            this._roomView.setLeftTime(data.match_info.left_time);
            this._roomView.startTimer();
            let gameInfo=data.game_init;
            if (arr) {
                obj = arr;
            }
            else{
                obj=game100_disrupt.getInstance().dealCard(gameInfo.difficulty,gameInfo.random_seed);
            }
        }
       
        
        let zoneCards:number[][]=[];
        for(let i=0;i<obj.PileCards.length;i++){
            zoneCards[i]=obj.PileCards[i];
        }
        this._roomService.startNewGame(obj.RandCards,zoneCards);
        let cards=this._roomService.getStartCards();
        this._roomView.dealCards(cards);
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
            this._roomView.setUndoEnable(true);
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
        this._roomView.setUndoEnable(true);
    }

    _checkGameOver(){
        if(!this._roomView.canCheckGameOver()){
            return;
        }
        
        let paths=this._roomService.getAutoSolvePath();
        if(paths){
            this._roomView.stopTimer();
            this._roomView.onAutoFinish();
            this._roomView.autoSolvePaths(paths,(path:{fromIndex:number,toIndex:number,cardZone:Game100CardZone},card:Game100Card)=>{
                this._roomService.increaseScore(RULE_SCORES.D_B[card.cardValue])
                this._roomView.setScore(this._roomService.score,true,true,false);
            },()=>{
                //播放销肥动画
                this._roomView.playGameOverAnim();
                this._onGameOver(0);
            });
        }
    }

    onPauseClick(){
        if(this._isGameOver)return;
        App.AudioManager.pauseMusic();
        this._roomView.stopTimer();
        this._roomService.pauseTime();
        App.DlgManager.showDlg("pause",{
            Score:this._roomService.score+this._roomService.getTimeScore(this._roomView.getLessTime()),
            CheckCode:"",
            Steps:JSON.stringify(this._roomService.getUploadData())
        },"game100")
    }

    _gameContinue(){
        this._roomView.startTimer();
        App.AudioManager.resumeMusic();
        this._roomService.resumeTime();
    }

    onUndoClick(){
        this._roomView.setUndoEnable(false);
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
