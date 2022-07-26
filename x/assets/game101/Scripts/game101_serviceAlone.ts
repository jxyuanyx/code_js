// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { GameEvents } from "../../gamecore/events/GameEvents";
import GameHelper from "../../gamecore/tools/GameHelper";
import Common from "../../gamecore/ui/core/Common";
import { blackjack } from "../net/protos/blackjack";
import game101_logic from "./ctrl/game101_logic";
import { Game101BonusType, Game101CardTypeScore, Game101ClearType, Game101Events, Game101Process } from "./enum/game101_enum";
import game101_mainAlone, { CARDGROUPNUM } from "./game101_mainAlone";
import Game101RoomService from "./game101_roomService";
import game101_roomServiceAlone from "./game101_roomServiceAlone";

const {ccclass, property} = cc._decorator;

@ccclass
export default class game101_serviceAlone {

    private _roomService:game101_roomServiceAlone;
    private _main:game101_mainAlone;

    public addEvent(){
        cc.game.on(Game101Events.CHECKOVER,this.checkOver,this);
        // cc.error("addevent>>>>>>")
    }

    public removeEvent(){
        cc.game.off(Game101Events.CHECKOVER,this.checkOver,this);
    }

    public setRoomService(service:game101_roomServiceAlone)
    {
        this._roomService = service;
    }

    public setMain(main:game101_mainAlone)
    {
        this._main = main;
    }

    public c2p(index:number){ 
        this._roomService._curIndex = index;
        let clearTypeScore:number[] = [];
        let c2pResp:blackjack.Blitz21Op_C2PResp = new blackjack.Blitz21Op_C2PResp();
        // c2pResp.NextCard = this._roomService.cards[this._roomService.cards.length - 1]
        c2pResp.NextCard = this._roomService.cards[0];
        c2pResp.ClearType = game101_logic.getClearType(this._roomService.cardGroups[index],this._roomService.currentCard);
        if (c2pResp.ClearType[0] == Game101ClearType.BOMB || c2pResp.ClearType[0] == Game101ClearType.UNCLEAR) {
            this._roomService.hitCounts = 0;
        }
        else{
            this._roomService.hitCounts++;
        }
        c2pResp.HitCounts = this._roomService.hitCounts;
        c2pResp.CurrentScore = this._roomService.allScore;
        if (c2pResp.HitCounts > 1) {
            c2pResp.HitScore = Game101CardTypeScore.GREATSTREAK * (c2pResp.HitCounts - 1);
            c2pResp.CurrentScore += c2pResp.HitScore;
        }
        for (let index = 0; index < c2pResp.ClearType.length; index++) {
            switch (c2pResp.ClearType[index]) {
                case Game101ClearType.BLACKJACK:
                    c2pResp.ClearTypeScore[index] = Game101CardTypeScore.WILD;
                    break;
                case Game101ClearType.FINISHPOINT:
                    c2pResp.ClearTypeScore[index] = Game101CardTypeScore.TWENTYONE;
                    break;
                case Game101ClearType.FIVEDRAGON:
                    c2pResp.ClearTypeScore[index] = Game101CardTypeScore.FIVEDRAGON;
                    break;
                default:
                    c2pResp.ClearTypeScore[index] = 0;
                    break;
            }
            c2pResp.CurrentScore += c2pResp.ClearTypeScore[index];
        }
        this._main._onC2PResp(c2pResp);
    }

    public c2h(){
        let data:blackjack.Blitz21Op_C2HResp = new blackjack.Blitz21Op_C2HResp();
        if (!this._roomService.retention && this._roomService.holdTimes > 0) {
            // data.NextCard = this._roomService.cards[this._roomService.cards.length - 1];
            data.NextCard = this._roomService.cards[0]
            data.HoldCounts = this._roomService.holdTimes - 1;
            this._main._onC2HResp(data);
        }
    }

    public h2c(){
        this._main._onH2CResp();
    }

    public undo(){
        this._roomService.playbackData.pop();
        let info;
        for (let index = this._roomService.playbackData.length - 1; index >= 0; index--) {
            if (this._roomService.playbackData[index].ID == Game101Process.C2P) {
                info = this._roomService.playbackData[index];
                break;
            }
        }
        this._roomService.hitCounts = info?info.c2pD.Data.HitCounts:0;
        let data:blackjack.Blitz21Op_UndoResp = new blackjack.Blitz21Op_UndoResp();
        data.CardDesk = this._roomService.playbackData[this._roomService.playbackData.length - 1].gD.CardDesk;
        this._main._onUnDoResp(JSON.parse(JSON.stringify(data)));
    }

    private _checkAllClear(){
        if (this._roomService.bombTimes > 0) {
            return false;
        }
        for (let index = 0; index < CARDGROUPNUM; index++) {
            if (this._roomService.cardGroups[index].length != 0) {
                return false
            }
        }
        return true;
    }

    private _onGetBonustype(reason:number){
        let bonusType:number[] = [];
        if (reason ==  blackjack.GameOverReason.Reason_Timeout ||reason == blackjack.GameOverReason.Reason_Auto) {
            return [];
        }
        if (this._roomService.bombTimes == 0) {
            bonusType.push(Game101BonusType.NoBomb);
        }
        if (this._checkAllClear()) {
            bonusType.push(Game101BonusType.AllClear);
        }
        return bonusType;
    }

    private _onGetAllBonusScore(score:number[]){
        let all:number = 0;
        for (let index = 0; index < score.length; index++) {
            all = all + score[index];
        }
        return all;
    }

    private _onGetBonusScore(bonusType:number[]){
        let Score:number[] = [];
        for (let index = 0; index < bonusType.length; index++) {
            if (bonusType[index] == Game101BonusType.NoBomb) {
                Score.push(350);
            }
            if (bonusType[index] == Game101BonusType.AllClear) {
                Score.push(1000);
            }
        }
        return Score;
    }


    public checkOver(info){
        if (!this._main||this._main._isGameOver) {
            return;
        }
        let matchInfo=App.DataManager.getGameData();
        let isGuide=!cc.sys.localStorage.getItem("guide_game101");
        if (isGuide&&!App.isCheck) {
            return;
        }
        let bombs = this._roomService.bombTimes;
        let cards = this._roomService.cards;
        let holdCard = this._roomService.retention;
        let curCard = this._roomService.currentCard;
        let leftTime = this._roomService.leftTime;
        let data:any = {};
        data.reward = [];
        if (bombs >= 3) {
            data.reason = blackjack.GameOverReason.Reason_Dead;
        }
        else if (leftTime <= 0){
            data.reason = blackjack.GameOverReason.Reason_Timeout;
        }
        else if (cards.length == 0 && !holdCard && !curCard) {
            data.reason = blackjack.GameOverReason.Reason_AllFinish;
        }
        else{
            if (info == blackjack.GameOverReason.Reason_Auto) {
                data.reason = blackjack.GameOverReason.Reason_Auto
            }
            else{
                return;
            }
        }
        // data.reward.Score = this._roomService.allScore;
        let timeScore=this._roomService.getTimeScore(this._main.getLessTime());

        //上传分数操作
        cc.game.emit(GameEvents.GAME_ADDSCORE,timeScore);

        data.reward.TimeScore = this._roomService.getTimeScore(this._main.getLessTime());
        data.TodayBestScore = matchInfo.tableData.match_info.today_best_score,
        data.LiftBestScore = matchInfo.tableData.match_info.life_best_score,
        data.BonusType = this._onGetBonustype(data.reason);
        data.FinishBonusScore = this._onGetBonusScore(data.BonusType);
        data.reward.Score = this._main.getTotalScore() + this._onGetAllBonusScore(data.FinishBonusScore);
        data.TotalRound=matchInfo.tableData.match_info.total_round;
        data.TotalScore=matchInfo.tableData.match_info.total_score;
        if (this._roomService.allScore == 0) {
            data.reward.Score = 0;
            data.Score = 0;
        }
        else{
            data.Score = data.reward.Score+this._roomService.getTimeScore(this._main.getLessTime());
        }
        data.CheckCode = "";

        //设置游戏剩余时间
        this._main._setPlayTime(matchInfo.tableData.match_info.left_time-this._main.getLessTime())
        
        if (!matchInfo.isRecord) {
            this._main._onFinishResp(data);
        }
    }
}
