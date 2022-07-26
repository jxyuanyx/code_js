// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from '../../gamecore/App';
import { GameEvents } from "../../gamecore/events/GameEvents";
import { Package } from "../../gamecore/net/Package";
import GameHelper from "../../gamecore/tools/GameHelper";
import BaseGameScene from "../../gamecore/ui/baseview/imp/BaseGameScene";
import { ComDlgData } from "../dialogs/comdlg/Game101_Dlg";
import { Game101Proto, Game101_RESP_CMDS } from "../net/Game101Proto";
import { blackjack } from "../net/protos/blackjack";
import { Game101Count } from "./ctrl/game101_count";
import game101_logic from "./ctrl/game101_logic";
import { processVo } from "./data/game101_vo";
import { Game101ArrType, Game101CardAnim, Game101ClearType, Game101Events, Game101Process } from "./enum/game101_enum";
import Game101RoomService from "./game101_roomService";
import game101_roomServiceAlone from "./game101_roomServiceAlone";
import Game101RoomView from "./game101_roomView";
import game101_roomViewAlone from "./game101_roomViewAlone";
import game101_serviceAlone from "./game101_serviceAlone";
import game101_animManager from "./manager/game101_animManager";

const {ccclass, property} = cc._decorator;

export const CARDGROUPNUM = 4;
const PLAYBACKSPEED = 0;

@ccclass
export default class game101_mainPlayBack extends BaseGameScene<game101_roomViewAlone,game101_roomServiceAlone> {
    @property([cc.Toggle])
    toggle:cc.Toggle[] = [];

    private _onClick:boolean = false;
    private _isGameOver:boolean=false;
    // private _roomInfo:blackjack.Blitz21CompetitionDataResp;
    // private _curIndex:number = 0;
    private _serviceAlone:game101_serviceAlone;
    private _lastIndex:number = 0;


    onLoad () {
        this._onClick = false;
        this._serviceAlone = new game101_serviceAlone();
        super.onLoad();
        this.init();
        this.addEvent();
        App.AudioManager.playGameBGM("sounds/bgm",true);
    }

    addEvent(){
        cc.game.on(cc.game.EVENT_HIDE,this._onGameHide,this);
        cc.game.on(Game101Events.GAME_CONTINUE,this._gameContinue,this);
        cc.game.on(GameEvents.UPLOAD_GAME_RESULT_SUCCESS,this._onUploadResultSuccess,this);
        cc.game.on(GameEvents.PASS_BACK,this.onPauseClick,this);
        this._serviceAlone.addEvent();
    }

    onDestroy(){
        this._serviceAlone.removeEvent();
        game101_animManager.getInstance().exit();
    }

    _onUploadResultSuccess(){
        App.DlgManager.hideDlg("gameover","game101")
        App.DlgManager.hideDlg("pause","game101")
        App.SceneManager.backHall();
    }

    _onGameHide(){
        if(!this._isGameOver){
            this.onPauseClick();
        }
    }

    init(){
        this._serviceAlone = new game101_serviceAlone();
        super.init(game101_roomViewAlone,game101_roomServiceAlone);
        this._serviceAlone.setRoomService(this._roomService);
        // this._serviceAlone.setMain(this);
        game101_animManager.getInstance().enter();
    }

    afterEnter(){
        this._onClick = false;
        this.scheduleOnce(()=>{
            // this._onEnterGame(App.DataManager.getGameData().tableData);
            let gameinfo = JSON.parse(App.DataManager.getGameData().tableData);
            this.onPlayBack(gameinfo);
        },0.1)

        App.DlgManager.preDlg("help","game101");
        this.onToggleClick(null,0);
    }

    _onEnterGame(info){
        let data:any;
        // if(App.DataManager.getExtInfo("guideData").games[App.DataManager.getGameData().serverModuleName]==0){
        //     data = this._roomService.getGuideGameInfo();
        //     this._roomView.setLeftTime(data.gD.LeftTime);
        // }else{
            data = info;
            this._roomView.setLeftTime(data.gD.LeftTime);
            this._roomView.startTimer();
        // }
        data.gD.CardDesk.Cards.unshift(data.gD.CardDesk.CurrentCard);
        this._roomService.startNewGame(data.gD.CardDesk.Cards,data.gD.LeftTime,data.gD.PileCards,null);
        let cards = this._roomService.cards;
        let curCard = this._roomService.currentCard;
        this._roomView.setHoldTimes(this._roomService.holdTimes);
        this._roomView.setCardsNum(cards.length);
        this._roomView.playDealSound(0.05,15);
        this._roomView.startCard(cards.concat(curCard),()=>{
            this._onClick = !this._onClick
        });
        this.setReady(curCard);
        this._roomView.setBombTimes(this._roomService.bombTimes);
        this._roomView.setAllScore(this._roomService.allScore,this._roomService._curIndex);
        this._setHoldCard(false,this._roomService.retention);
        for (let index = 0; index < CARDGROUPNUM; index++) {
            this._roomView.setCardGroup(this._roomService.cardGroups[index],index);
            let group = Game101Count.getCardGroupsScore(this._roomService.cardGroups[index]);
            this._roomView.setGroupScore(index,group.s);
        }
        this._roomView.setUndoEnable(false);
        // this._addPlayBackData(Game101Process.ENTER,this._roomService.getDeskData(),null);
        this.onTipsAnim(this._roomService.currentCard);
    }



    _addPlayBackData(processID:number,gameData:blackjack.Blitz21CompetitionDataResp,processData:any){
        let process:processVo = new processVo();
        process.ID = processID;
        process.gD = gameData;
        switch (processID) {
            case Game101Process.C2H:
                process.c2hD = processData;
                break;
            case Game101Process.C2P:
                process.c2pD = processData;
                break;
            case Game101Process.ENTER:
                // process. = processData;
                break;
            case Game101Process.GAMEOVER:
                process.goD = processData;
                break;
            case Game101Process.H2C:
                process.h2cD = processData;
                break;
            case Game101Process.UNDO:
                process.uD = processData;
                break;
            default:
                break;
        }
        this._roomService.playbackData.push(process)
    }

    _setCardGroupScore(score:number,index:number,A:boolean = false ,anim:boolean = false){
        this._roomService.setScoreGroups(index,score);
        this._roomView.setGroupScore(index,score,);
    }

    _setCardGroup(cardGroups:number[],index:number){
        this._roomView.setCardGroup(cardGroups,index);
        this._roomService.setCardGroup(cardGroups,index);
    }

    _setHoldCard(anim:boolean = false,card?:number){
        if (card) {
            this._roomView.setRetention(anim,card);
            // this._roomService.retention = card;
        }
        else{
            this._roomView.clearRetention();
            // this._roomService.retention = 0;
        }
    }

    _setHoldTimes(times:number = 0){
        this._roomView.setHoldTimes(times);
        this._roomService.holdTimes = times;
    }

    _setAllScore(score:number){
        this._roomService.allScore = score;
        this._roomView.setAllScore(score,this._roomService._curIndex);
    }

    _setBombs(bombs:number){
        this._roomView.setBombTimes(bombs);
        this._roomService.bombTimes = bombs;
    }

    _setCurCard(card:number,isAnim:boolean = false,cb?:Function){
        this._roomService.currentCard = card?card:null;
        this._roomView.setCurrentCard(card,isAnim,cb);
    }

    _setCards(cards:number[]){
        this._roomService.cards = cards;
        this._roomView.setCards(cards.length);
        this._roomView.setCardsNum(cards.length);
    }

    _setTime(time:number){
        this._roomView.setLeftTime(time);
        this._roomView.startTimer();
    }

    onMessage(pkg:Package){
        // switch(pkg.cmd){
        //     case Game101_RESP_CMDS.C2P:
        //         this._onC2PResp(pkg.body);
        //         break;
        //     case Game101_RESP_CMDS.C2H:
        //         this._onC2HResp(pkg.body);
        //         break;
        //     case Game101_RESP_CMDS.H2C:
        //         this._onH2CResp();
        //         break;
        //     case Game101_RESP_CMDS.RECOVER:
        //         this._onRecoverResp(pkg.body);
        //         break;
        //     case Game101_RESP_CMDS.FINISH:
        //         this._onFinishResp(pkg.body);
        //         break;
        //     case Game101_RESP_CMDS.UNDO:
        //         this._onUnDoResp(pkg.body);
        //         break;
        // }
    }

    _onUnDoResp(data:blackjack.Blitz21Op_UndoResp){
        App.LogManager.i("onUnDoResp:",data);
        this._onClick = !this._onClick;
        this._roomView.exitUndoAnim();
        if (data.CardDesk.HoldCard) {
            this._roomView.setRetention(false,data.CardDesk.HoldCard);
            this._roomService.retention = data.CardDesk.HoldCard;
        }
        else{
            this._roomView.clearRetention();
            this._roomService.retention = 0;
        }
        this._setCurCard(data.CardDesk.CurrentCard,false);
        this._roomView.setCards(data.CardDesk.Cards.length);
        this._roomService.cards = data.CardDesk.Cards;
        this._roomView.setCardsNum(data.CardDesk.Cards.length);
        this._roomService.allScore = data.CardDesk.CurrentScore;
        this._roomView.setAllScore(data.CardDesk.CurrentScore,this._roomService._curIndex);
        this._roomView.setBombTimes(data.CardDesk.Bombs);
        this._roomService.bombTimes = data.CardDesk.Bombs;
        this._roomView.setHoldTimes(data.CardDesk.HoldCounts);
        this._roomService.holdTimes = data.CardDesk.HoldCounts;
        this._roomView.exitAllArr();
        for (let index = 0; index < data.CardDesk.PileCards.length; index++) {
            this._roomView.setCardGroup(data.CardDesk.PileCards[index].Cards||[],index);
            this._roomService.setCardGroup(data.CardDesk.PileCards[index].Cards||[],index);

            let info = Game101Count.getCardGroupsScore(data.CardDesk.PileCards[index].Cards||[]);
            this._roomService.setScoreGroups(index,info.s);
            this._roomView.setGroupScore(index,info.s,info.a);
        }
        this.onTipsAnim(this._roomService.currentCard);
        this.setReady(data.CardDesk.CurrentCard);
        let process:processVo = new processVo();
        process.ID = Game101Process.UNDO;
        process.gD = this._roomService.getDeskData();
        process.uD.Data = data.CardDesk;
        this._roomService.playbackData.push(process);
    }

    // onGameOver(){
    //     App.DlgManager.showDlg("recordGameover",{
    //         reward:{
    //             Score:this._roomService.score,
    //             TimeScore:timeScore
    //         }
    //     },"game100");
    //     cc.director.getScheduler().setTimeScale(1);
    //     App.AudioManager.stopBgm();
    // }

    _onFinishResp(data:any){
        App.LogManager.i("_onFinishResp");
        this._isGameOver=true;
        // let process:processVo = new processVo();
        // process.ID = Game101Process.GAMEOVER;
        // process.gD = this._roomService.getDeskData();
        // process.goD = data;
        // this._roomService.playbackData.push(process);
        // this._roomView.stopTimer();
        for (let index = 0; index < data.BonusType.length; index++) {
            if (data.BonusType[index] == 0) {
                this._roomView.settleTypeAnim(Game101CardAnim.NOBUSTBONUS,-1,(cur:number)=>{
                    this._roomView.setAllScore(data.FinishBonusScore[index]+this._roomView.scores,cur,true);
                },this,null);
            }
            else if (data.BonusType[index] == 1){
                this._roomView.settleTypeAnim(Game101CardAnim.ALLCLEAR,-1,(cur:number)=>{
                    this._roomView.setAllScore(data.FinishBonusScore[index]+this._roomView.scores,cur,true);
                },this,null);
            }
        }
        if (data.reason == 4) {
            this._roomView.settleTypeAnim(Game101CardAnim.GAMECOMPLETE,-1,()=>{
                this._roomView.finishAnim(()=>{
                    // App.DlgManager.showDlg("gameover",data,"game101");
                });
            },this,null);
        }
        else if (data.reason == 1){
            this._roomView.settleTypeAnim(Game101CardAnim.TIMEISUP,-1,()=>{
                // App.DlgManager.showDlg("gameover",data,"game101");
            });
        }
        else if (data.reason == 5){
            this._roomView.settleTypeAnim(Game101CardAnim.OUTOFMOVES,-1,()=>{
                // App.DlgManager.showDlg("gameover",data,"game101");
            });
        }
        else{
            // App.DlgManager.showDlg("gameover",data,"game101");
        }
        
    }

    _onRecoverResp(data:blackjack.Blitz21Op_RecoverResp){
        App.LogManager.i("_onRecoverResp");
        this._roomView.setLeftTime(data.LeftTime);
        this._roomView.startTimer();
    }

    _onH2CResp(){
        this._roomView.setUndoEnable(true);
        this._roomView.exitUndoAnim();
        this._roomView.h2C(()=>{
            this._onClick = !this._onClick;
        })
        if (this._roomService.currentCard) {
            // this._roomService.cards += 1
            this._roomService.cards.push(this._roomService.currentCard);
            this._roomService.currentCard = null;
        }
        this._roomView.setCardsNum(this._roomService.cards.length);
        this._roomService.currentCard = this._roomService.retention;
        this.setReady(this._roomService.currentCard);
        this._roomService.retention = null;
        this.onTipsAnim(this._roomService.currentCard);

        let process:processVo = new processVo();
        process.ID = Game101Process.H2C;
        process.gD = this._roomService.getDeskData();
        this._roomService.playbackData.push(process);
    }

    _onC2HResp(data:blackjack.Blitz21Op_C2HResp){
        this._roomView.setRetention(true);
        this._roomService.retention = this._roomService.currentCard;
        this._roomView.setUndoEnable(true);
        this._roomView.exitUndoAnim();
        this._roomView.setHoldTimes(data.HoldCounts);
        this._roomService.holdTimes = data.HoldCounts;
        if (this._roomService.cards.length > 0)this._roomService.cards.shift();
        this._roomView.setCardsNum(this._roomService.cards.length);
        
        this._setCurCard(data.NextCard,true,()=>{
            this._onClick = !this._onClick;
        });

        let process:processVo = new processVo();
        process.ID = Game101Process.C2H;
        process.gD = this._roomService.getDeskData();
        process.c2hD.Data = data;
        this._roomService.playbackData.push(Object.assign(process));
        this.onTipsAnim(this._roomService.currentCard);
        this.setReady(data.NextCard);
    }

    _onC2PResp(data:blackjack.Blitz21Op_C2PResp){
        this._roomView.exitUndoAnim();
        this._roomView.setUndoEnable(true);
        this._roomService.cardGroupIncrease(this._roomService._curIndex);
        this._roomView.cardGroupIncrease(this._roomService._curIndex,()=>{
            if (data.ClearType.length == 1 && data.ClearType[0] == Game101ClearType.UNCLEAR) {
                let info = Game101Count.getCardGroupsScore(this._roomService.cardGroups[this._roomService._curIndex]);
                this._roomService.setScoreGroups(this._roomService._curIndex,info.s);
                this._roomView.setGroupScore(this._roomService._curIndex,info.s,info.a,true);
                this._roomView.scoreLightAnim(this._roomService._curIndex);
            }
            else{
                let bomb:boolean = false;
                for (let index = 0; index < data.ClearType.length; index++) {
                    if (data.ClearType[index] == Game101ClearType.BOMB) {
                        bomb = true;
                        this._roomService.bombTimes += 1;
                        this._roomView.openUndoAnim();
                        this._roomView.cardTypeAnim(Game101CardAnim.BUSTED,this._roomService._curIndex,(index:number)=>{
                            this._roomView.bombAnim(index,()=>{
                                this._roomView.setBombTimes(this._roomService.bombTimes);
                            });
                        },this,null);
                    }
                    else if (data.ClearType[index] == Game101ClearType.BLACKJACK){
                        this._roomView.cardTypeAnim(Game101CardAnim.WILD,this._roomService._curIndex,null,this,(cur:number)=>{
                            this._roomView.setAllScore(data.ClearTypeScore[index]+this._roomView.scores,cur,true);
                        });
                        this._roomView.groupAnim("dasaoguang",this._roomService._curIndex);
                    }
                    else if (data.ClearType[index] == Game101ClearType.FINISHPOINT){
                        this._roomView.cardTypeAnim(Game101CardAnim.TWENTYONE,this._roomService._curIndex,null,this,(cur:number)=>{
                            this._roomView.setAllScore(data.ClearTypeScore[index]+this._roomView.scores,cur,true);
                        });
                        this._roomView.groupAnim("dasaoguang",this._roomService._curIndex)
                    }
                    else if (data.ClearType[index] == Game101ClearType.FIVEDRAGON){
                        this._roomView.cardTypeAnim(Game101CardAnim.FIVECARDS,this._roomService._curIndex,null,this,(cur:number)=>{
                            this._roomView.setAllScore(data.ClearTypeScore[index]+this._roomView.scores,cur,true);
                        });
                        this._roomView.groupAnim("dasaoguang",this._roomService._curIndex)
                    }
                    this._roomView.cardGroupClear(this._roomService._curIndex,bomb);
                    this._roomView.cardClearAnim("paixiaoshi",this._roomService._curIndex,bomb);
                    this._roomService.cardGroupClear(this._roomService._curIndex);
                    this._roomService.setScoreGroups(this._roomService._curIndex,0);
                    this._roomView.setGroupScore(this._roomService._curIndex,0);    
                }
                this._roomService.allScore = data.CurrentScore;
            }
            if (data.HitCounts == 2 ) {
                this._roomView.cardTypeAnim(Game101CardAnim.GREATSTREAK,this._roomService._curIndex,null,this,(cur:number)=>{
                    this._roomView.setAllScore(data.HitScore+this._roomView.scores,cur,true);
                });
            }
            else if (data.HitCounts == 3){
                this._roomView.cardTypeAnim(Game101CardAnim.SUPERSTREAK,this._roomService._curIndex,null,this,(cur:number)=>{
                    this._roomView.setAllScore(data.HitScore+this._roomView.scores,cur,true);
                });
            }
            else if (data.HitCounts > 3){
                this._roomView.cardTypeAnim(Game101CardAnim.MEGASTREAK,this._roomService._curIndex,null,this,(cur:number)=>{
                    this._roomView.setAllScore(data.HitScore+this._roomView.scores,cur,true);
                });
            }
            if (this._roomService.cards.length > 0)this._roomService.cards.shift();
            this._roomView.setCardsNum(this._roomService.cards.length);
            this.setReady(data.NextCard);
            this._setCurCard(data.NextCard,true,()=>{
                this._onClick = !this._onClick;
            });
            this.onTipsAnim(this._roomService.currentCard);
            let process:processVo = new processVo();
            process.ID = Game101Process.C2P;
            process.gD = this._roomService.getDeskData();
            process.c2pD.CurIndex = this._roomService._curIndex;
            process.c2pD.Data = data;
            this._roomService.playbackData.push(Object.assign(process));
            // cc.game.emit(Game101Events.CHECKOVER);
        });
    }

    setReady(next:number){
        for (let index = 0; index < CARDGROUPNUM; index++) {
            let groupCards = this._roomService.cardGroups[index].concat(next);
            let score = Game101Count.getCardGroupsScore(groupCards);
            this._roomView.setReadyScore(index,score.s,score.a);
        }
    }

    onTipsAnim(curCard:number){
        this._roomView.clearGroupTips();
        if (!curCard) {
            return;
        }
        for (let index = 0; index < this._roomService.scoreGroups.length; index++) {
            let isClear = this.getCanClear(Object.assign(this._roomService.cardGroups[index]),curCard);
            if (isClear == Game101ArrType.BOMB) {
                this._roomView.arrAnim(index,false,isClear);
            }
            else if(isClear == Game101ArrType.ARRLOW){
                this._roomView.arrAnim(index,true,isClear);
            }
            else{
                this._roomView.groupAnim("tishiguang",index);
                this._roomView.arrAnim(index,true,isClear);
            }
        }
    }


    getCanClear(cards:number[],curCard:number){
        let clear:number = 0;
        let clearType = game101_logic.getClearType(cards,curCard);
        if (clearType[0] == Game101ClearType.BOMB ) {
            clear = Game101ArrType.BOMB;
        }
        else if (clearType[0] == Game101ClearType.UNCLEAR){
            clear = Game101ArrType.ARRLOW;
        }
        else{
            clear = Game101ArrType.ARRHIGH;
        }
        return clear;
    }

    onUndoClick(){
        // if (!this._onClick||this._roomService.leftTime <= 0)return;
        // this._onClick = !this._onClick;
        // this._serviceAlone.undo();
        // this._roomView.setUndoEnable(false);
    }

    onPauseClick(){
        // App.AudioManager.pauseMusic();
        // this._roomView.stopTimer();
        // App.DlgManager.showDlg("pause",{
        //     Score:this._roomService.allScore+this._roomService.getTimeScore(),
        //     CheckCode:"",
        //     Steps:JSON.stringify(this._roomService.playbackData)
        // },"game101")
    }

    _gameContinue(){
        App.AudioManager.resumeMusic();
        this._roomView.startTimer();
    }

    onRetentionClick(){
        // App.LogManager.i("onRetentionClick");
        // if (!this._onClick||this._roomService.leftTime <= 0)return;
        // this._onClick = !this._onClick;
        // let a = this._roomService.retention;
        // if (a) {
        //     this._serviceAlone.h2c();
        // }
        // else{
        //     if (this._roomService.holdTimes <= 0) return this._onClick = !this._onClick;
        //     this._serviceAlone.c2h();
        // }
    }

    onCardGroupsClick(event, index:number){
        // if (!this._onClick||!this._roomService.currentCard||this._roomService.bombTimes == 3||this._roomService.leftTime <= 0)return;
        // this._onClick = !this._onClick;
        // this._serviceAlone.c2p(index);
    }

    onToggleClick(render,data){
        switch (Number(data)) {
            case 0:
                App.AudioManager.resumeMusic();
                cc.director.getScheduler().resumeTarget(this);
                cc.director.getScheduler().resumeTarget(this._roomView);
                cc.director.getScheduler().setTimeScale(1);
                this._lastIndex = 0;
                break;
            case 1:
                App.AudioManager.resumeMusic();
                cc.director.getScheduler().resumeTarget(this);
                cc.director.getScheduler().resumeTarget(this._roomView);
                cc.director.getScheduler().setTimeScale(2);
                this._lastIndex = 1;
                break;
            case 2:
                App.AudioManager.pauseMusic();
                cc.director.getScheduler().pauseTarget(this);
                cc.director.getScheduler().pauseTarget(this._roomView);
                this._lastIndex = 2;
                break;
            case 3:
                App.AudioManager.pauseMusic();
                cc.director.getScheduler().pauseTarget(this);
                cc.director.getScheduler().pauseTarget(this._roomView);

                let data:ComDlgData = new ComDlgData();
                data.title = App.LangManager.getTxtByCurrentGame("tips");
                data.group = [{name:App.LangManager.getTxtByCurrentGame("cancel"),isExit:true,cb:()=>{
                    this.toggle[this._lastIndex].getComponent(cc.Toggle).isChecked = true;
                    this.onToggleClick(null,this._lastIndex);
                }},{name:App.LangManager.getTxtByCurrentGame("confirm"),isExit:true,cb:()=>{
                    cc.director.getScheduler().setTimeScale(1);
                    App.DataManager.clearTableData();
                    App.SceneManager.backHall();
                }}];
                data.txt = App.LangManager.getTxtByCurrentGame("playbackExit");
                data.clickSpaceHide=false;
                App.DlgManager.showDlg("comdlg",data,"game101");

                break;
            default:
                break;
        }
    }

    _onGameOver(data:any){
        this._roomView.setLeftTime(Math.ceil(data.gD.LeftTime));
        this._roomView.stopTimer();
        App.DlgManager.showDlg("recordGameover",{
            reward:{
                Score:data.goD.TotalScore,
                TimeScore:data.goD.TimeScore
            }
        },"game101");
        cc.director.getScheduler().setTimeScale(1);
        App.AudioManager.stopBgm();
    }

    onPlayBack(gameinfo){
        let playback = gameinfo;
        let times = 0;
        let fun =()=>{
            this.onStep(playback[times]);
            if (times != playback.length - 1) {
                times++;
                this.scheduleOnce(fun.bind(this),playback[times-1].gD.LeftTime - playback[times].gD.LeftTime);
            }
        }
        this.scheduleOnce(fun,PLAYBACKSPEED);
    }

    onStep(step:processVo){
        switch (step.ID) {
            case Game101Process.ENTER:
                this._onEnterGame(step);
                break;
            case Game101Process.C2P:
                this._roomService._curIndex = step.c2pD.CurIndex;
                this._onC2PResp(step.c2pD.Data);
                break;
            case Game101Process.C2H:
                this._onC2HResp(step.c2hD.Data);
                break;
            case Game101Process.H2C:
                this._onH2CResp();
                break;
            case Game101Process.UNDO:
                this._onUnDoResp(step.uD.Data);
                break;
            case Game101Process.GAMEOVER:
                if (step.goD.data) {
                    this._onFinishResp(step.goD.data);
                }
                
                this._onGameOver(step);
                break;
        
            default:
                break;
        }
    }
}
