// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { Package } from "../../gamecore/net/Package";
import BaseGameScene from "../../gamecore/ui/baseview/imp/BaseGameScene";
import { Game101Proto, Game101_RESP_CMDS } from "../net/Game101Proto";
import { blackjack } from "../net/protos/blackjack";
import { Game101Count } from "./ctrl/game101_count";
import { Game101CardAnim, Game101ClearType } from "./enum/game101_enum";
import Game101RoomService from "./game101_roomService";
import Game101RoomView from "./game101_roomView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game101Main extends BaseGameScene<Game101RoomView,Game101RoomService> {
    private _onClick:boolean = true;
    private _roomInfo:blackjack.Blitz21CompetitionDataResp;
    private _curIndex:number = 0

    onLoad () {
        this._onClick = true;
        this._curIndex = 0;
        super.onLoad();
        this.init(Game101RoomView,Game101RoomService);
    }


    afterEnter(){
        // this.scheduleOnce(()=>{
        //     this._roomInfo=App.DataManager.getGameData().tableData;

        //     if (this._roomInfo.CardDesk.HoldCard) {
        //         this._roomView.setRetention(false,this._roomInfo.CardDesk.HoldCard);
        //         this._roomService.retention = this._roomInfo.CardDesk.HoldCard;
        //     }
        //     else{
        //         this._roomView.clearRetention();
        //         this._roomService.retention = 0;
        //     }
            
        //     this._roomService.currentCard = this._roomInfo.CardDesk.CurrentCard?this._roomInfo.CardDesk.CurrentCard:null;
        //     this._roomView.setCurrentCard(this._roomInfo.CardDesk.CurrentCard,false);
        //     this._roomView.setCards(this._roomInfo.CardDesk.CardsLen);
        //     this._roomService.cards = this._roomInfo.CardDesk.CardsLen;
        //     this._roomView.setCardsNum(this._roomService.cards);
        //     this._roomView.setLeftTime(this._roomInfo.LeftTime);
        //     if(this._roomInfo.Status==pb.GameStatus.Status_Gaming){
        //         this._roomView.startTimer();
        //     }else{
        //         App.DlgManager.showDlg("pause",null,"game101")
        //     }
        //     this._roomService.leftTime = this._roomInfo.LeftTime;
        //     this._roomService.allScore = this._roomInfo.CardDesk.CurrentScore;
        //     this._roomView.setAllScore(this._roomInfo.CardDesk.CurrentScore,this._curIndex);
        //     this._roomView.setBombTimes(this._roomInfo.CardDesk.Bombs);
        //     this._roomService.bombTimes = this._roomInfo.CardDesk.Bombs;
        //     this._roomView.setHoldTimes(this._roomInfo.CardDesk.HoldCounts);
        //     this._roomService.holdTimes = this._roomInfo.CardDesk.HoldCounts;

        //     for (let index = 0; index < this._roomInfo.CardDesk.PileCards.length; index++) {
        //         this._roomView.setCardGroup(this._roomInfo.CardDesk.PileCards[index].Cards,index);
        //         this._roomService.setCardGroup(this._roomInfo.CardDesk.PileCards[index].Cards,index);

        //         let data = Game101Count.getCardGroupsScore(this._roomService.cardGroups[index]);
        //         this._roomService.setScoreGroups(index,data.s);
        //         this._roomView.setGroupScore(index,data.s,data.a);
        //     }
        //     this.onTipsAnim(this._roomService.currentCard);
            

        //     this._roomView.startTimer();
        //     this._roomView.setUndoEnable(false);
        // },0.1)

        App.DlgManager.preDlg("help","game101");
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
        if (data.CardDesk.HoldCard) {
            this._roomView.setRetention(false,data.CardDesk.HoldCard);
            this._roomService.retention = data.CardDesk.HoldCard;
        }
        else{
            this._roomView.clearRetention();
            this._roomService.retention = 0;
        }
        this._roomService.currentCard = data.CardDesk.CurrentCard;
        this._roomView.setCurrentCard(data.CardDesk.CurrentCard,false);
        this._roomView.setCards(data.CardDesk.CardsLen);
        this._roomService.cards = data.CardDesk.CardsLen;
        this._roomView.setCardsNum(this._roomService.cards);
        this._roomService.allScore = data.CardDesk.CurrentScore;
        this._roomView.setAllScore(data.CardDesk.CurrentScore,this._curIndex);
        this._roomView.setBombTimes(data.CardDesk.Bombs);
        this._roomService.bombTimes = data.CardDesk.Bombs;
        this._roomView.setHoldTimes(data.CardDesk.HoldCounts);
        this._roomService.holdTimes = data.CardDesk.HoldCounts;
        this._roomView.exitAllArr();

        for (let index = 0; index < data.CardDesk.PileCards.length; index++) {
            this._roomView.setCardGroup(data.CardDesk.PileCards[index].Cards,index);
            this._roomService.setCardGroup(data.CardDesk.PileCards[index].Cards,index);

            let info = Game101Count.getCardGroupsScore(this._roomService.cardGroups[index]);
            this._roomService.setScoreGroups(index,info.s);
            this._roomView.setGroupScore(index,info.s,info.a);
        }
        this.onTipsAnim(this._roomService.currentCard);

    }

    _onFinishResp(data:blackjack.Blitz21Op_FinishResp){
        App.LogManager.i("_onFinishResp");
        this._roomView.stopTimer();
        for (let index = 0; index < data.BonusType.length; index++) {
            if (data.BonusType[index] == 0) {
                this._roomView.cardTypeAnim(Game101CardAnim.NOBUSTBONUS,-1,null,this,(cur:number)=>{
                    this._roomView.setAllScore(data.FinishBonusScore[index]+this._roomView.rollNumGroup.getData(),cur,true);
                });
            }
            else if (data.BonusType[index] == 1){
                this._roomView.cardTypeAnim(Game101CardAnim.ALLCLEAR,-1,null,this,(cur:number)=>{
                    this._roomView.setAllScore(data.FinishBonusScore[index]+this._roomView.rollNumGroup.getData(),cur,true);
                });
            }
        }
        if (data.reason == 4) {
            this._roomView.finishAnim(()=>{});
            this._roomView.cardTypeAnim(Game101CardAnim.GAMECOMPLETE,-1,()=>{
                App.DlgManager.showDlg("gameover",data,"game101");
            });
            
        }
        else if (data.reason == 1){
            this._roomView.cardTypeAnim(Game101CardAnim.TIMEISUP,-1,()=>{
                App.DlgManager.showDlg("gameover",data,"game101");
            });
        }
        else if (data.reason == 5){
            this._roomView.cardTypeAnim(Game101CardAnim.OUTOFMOVES,-1,()=>{
                App.DlgManager.showDlg("gameover",data,"game101");
            });
        }
        else{
            App.DlgManager.showDlg("gameover",data,"game101");
        }
        
    }

    _onRecoverResp(data:blackjack.Blitz21Op_RecoverResp){
        App.LogManager.i("_onRecoverResp");
        this._roomView.setLeftTime(data.LeftTime);
        this._roomView.startTimer();
    }

    _onH2CResp(){
        this._roomView.setUndoEnable(true);
        this._roomView.h2C(()=>{
            this._onClick = !this._onClick;
        })
        if (this._roomService.currentCard) {
            this._roomService.cards += 1
        }
        this._roomView.setCardsNum(this._roomService.cards);
        this._roomService.currentCard = this._roomService.retention;
        this._roomService.retention = null;
        this.onTipsAnim(this._roomService.currentCard);
        
    }

    _onC2HResp(data:blackjack.Blitz21Op_C2HResp){
        this._roomView.setUndoEnable(true);
        this._roomView.setHoldTimes(data.HoldCounts);
        this._roomService.holdTimes = data.HoldCounts;
        this._roomService.currentCard = data.NextCard;
        if (this._roomService.cards > 0)this._roomService.cards -= 1;
        this._roomView.setCardsNum(this._roomService.cards);
        this.onTipsAnim(this._roomService.currentCard);
        this._roomView.setCurrentCard(data.NextCard,true,()=>{
            this._onClick = !this._onClick;
        });  
    }

    _onC2PResp(data:blackjack.Blitz21Op_C2PResp){
        App.LogManager.i("_onC2PResp");
        this._roomView.setUndoEnable(true);
        if (data.ClearType.length == 1 && data.ClearType[0] == Game101ClearType.UNCLEAR) {
            let info = Game101Count.getCardGroupsScore(this._roomService.cardGroups[this._curIndex]);
            this._roomService.setScoreGroups(this._curIndex,info.s);
            this._roomView.setGroupScore(this._curIndex,info.s,info.a,true);
        }
        else{
            let bomb:boolean = false;
            // this._roomView.setAllScore(data.CurrentScore,this._curIndex,true);
            for (let index = 0; index < data.ClearType.length; index++) {
                if (data.ClearType[index] == Game101ClearType.BOMB) {
                    bomb = true;
                    this._roomService.bombTimes += 1;
                    
                    this._roomView.bombAnim(this._curIndex,()=>{
                        this._roomView.setBombTimes(this._roomService.bombTimes);
                    });
                    this._roomView.cardTypeAnim(Game101CardAnim.BUSTED,this._curIndex);
                }
                else if (data.ClearType[index] == Game101ClearType.BLACKJACK){
                    this._roomView.cardTypeAnim(Game101CardAnim.WILD,this._curIndex,null,this,(cur:number)=>{
                        this._roomView.setAllScore(data.ClearTypeScore[index]+this._roomView.rollNumGroup.getData(),cur,true);
                    });
                    this._roomView.groupAnim("dasaoguang",this._curIndex)
                }
                else if (data.ClearType[index] == Game101ClearType.FINISHPOINT){
                    this._roomView.cardTypeAnim(Game101CardAnim.TWENTYONE,this._curIndex,null,this,(cur:number)=>{
                        this._roomView.setAllScore(data.ClearTypeScore[index]+this._roomView.rollNumGroup.getData(),cur,true);
                    });
                    this._roomView.groupAnim("dasaoguang",this._curIndex)
                }
                else if (data.ClearType[index] == Game101ClearType.FIVEDRAGON){
                    this._roomView.cardTypeAnim(Game101CardAnim.FIVECARDS,this._curIndex,null,this,(cur:number)=>{
                        this._roomView.setAllScore(data.ClearTypeScore[index]+this._roomView.rollNumGroup.getData(),cur,true);
                    });
                    this._roomView.groupAnim("dasaoguang",this._curIndex)
                }         
                this._roomView.cardGroupClear(this._curIndex,bomb);
                this._roomView.cardClearAnim("paixiaoshi",this._curIndex,bomb);
                this._roomService.cardGroupClear(this._curIndex);
                this._roomService.setScoreGroups(this._curIndex,0);
                this._roomView.setGroupScore(this._curIndex,0);    
            }
            this._roomService.allScore = data.CurrentScore; 
        }
        if (data.HitCounts == 2 ) {
            this._roomView.cardTypeAnim(Game101CardAnim.GREATSTREAK,this._curIndex,null,this,(cur:number)=>{
                this._roomView.setAllScore(data.HitScore+this._roomView.rollNumGroup.getData(),cur,true);
            });
        }
        else if (data.HitCounts == 3){
            this._roomView.cardTypeAnim(Game101CardAnim.SUPERSTREAK,this._curIndex,null,this,(cur:number)=>{
                this._roomView.setAllScore(data.HitScore+this._roomView.rollNumGroup.getData(),cur,true);
            });
        }
        else if (data.HitCounts > 3){
            this._roomView.cardTypeAnim(Game101CardAnim.MEGASTREAK,this._curIndex,null,this,(cur:number)=>{
                this._roomView.setAllScore(data.HitScore+this._roomView.rollNumGroup.getData(),cur,true);
            });
        }
        if (this._roomService.cards > 0)this._roomService.cards -= 1;
        this._roomView.setCardsNum(this._roomService.cards);
        this._roomService.currentCard = data.NextCard;
        this._roomView.setCurrentCard(data.NextCard,true,()=>{
            this._onClick = !this._onClick;
        });
        this.onTipsAnim(this._roomService.currentCard);
        
    }

    onTipsAnim(curCard:number){
        this._roomView.clearGroupTips();
        for (let index = 0; index < this._roomService.scoreGroups.length; index++) {
            let cardValue = curCard%16>10?10:curCard%16;
            if (cardValue == 1) {
                cardValue = 11;
            }
            for (let i = 0; i < this._roomService.cardGroups[index].length; i++) {
                let num = this._roomService.cardGroups[index][i];
                num = num%16>10?10:num%16;
                if (num == 1) num = 11;
                cardValue += num;
            }
            if (cardValue == 21) {
                this._roomView.groupAnim("putong",index);
                this._roomView.arrAnim(index,true);
            }
            else if (cardValue < 21){
                this._roomView.arrAnim(index,true);
            }
            else{
                if (cardValue%10 == 1) {
                    this._roomView.groupAnim("putong",index);
                    this._roomView.arrAnim(index,true);
                }
                this._roomView.arrAnim(index,false);
            }
        }
    }

    onUndoClick(){
        Game101Proto.undoReq();
        this._roomView.setUndoEnable(false);
    }
    
    onPauseClick(){
        this._roomView.stopTimer();
        Game101Proto.pauseReq();
        App.DlgManager.showDlg("pause",null,"game101")
    }

    onRetentionClick(){
        App.LogManager.i("onRetentionClick");
        if (!this._onClick)return;
        this._onClick = !this._onClick;
        let a = this._roomService.retention;
        if (a) {
            Game101Proto.h2cReq();
        }
        else{
            if (this._roomService.holdTimes <= 0) return this._onClick = !this._onClick;;
            this._roomView.setRetention(true);
            this._roomService.retention = this._roomService.currentCard;
            Game101Proto.c2hReq();
        }
    }

    onCardGroupsClick(event, index:number){
        App.LogManager.i("onCardGroupsClick-------"+index);
        if (!this._onClick||!this._roomService.currentCard||this._roomService.bombTimes == 3)return;
        this._onClick = !this._onClick;
        Game101Proto.c2pReq(index);
        this._curIndex = index;
        this._roomService.cardGroupIncrease(index);
        this._roomView.cardGroupIncrease(index);
    }
}
