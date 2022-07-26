// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { GameEvents } from "../../gamecore/events/GameEvents";
import { BaseRoomService } from "../../gamecore/ui/baseview/imp/BaseRoomService";
import { blackjack } from "../net/protos/blackjack";
import { processVo } from "./data/game101_vo";
import { Game101Events } from "./enum/game101_enum";

const { ccclass, property } = cc._decorator;
const GROUPNUM = 4;
const HOLDTIMES = 5;

@ccclass
export default class game101_roomServiceAlone extends BaseRoomService {

    //当前点击队列
    private _curGroup: number = 0;
    //爆牌次数
    private _bombTimes: number = 0;

    private _holdTimes: number = 0;

    //剩余时间
    private _leftTime: number = 0;
    //牌堆数
    private _cards: number[] = [];
    //总分
    private _allScore: number = 0;
    //每组分
    public scoreGroups: number[];

    private _currentCard: number = 0;

    private _retentionCard: number = 0;

    public cardGroups: number[][] = [];

    public hitCounts: number = 0;

    public _curIndex: number = 0

    public playbackData: processVo[] = [];

    private _startTime: number;

    onLoad() {
        this._init();
        this.playbackData = [];
        this.addEvent();
    }

    addEvent() {
        cc.game.on(Game101Events.TIMEUPDATE, this._updateTime, this);
    }

    _updateTime(time) {
        this.leftTime = time;
    }

    _init() {
        this.scoreGroups = [];
        this.cardGroups = [];
        this.cards = [];
        for (let index = 0; index < GROUPNUM; index++) {
            this.cardGroups[index] = [];
            this.scoreGroups[index] = 0;
        }
    }


    set holdTimes(value: number) {
        this._holdTimes = value;
    }

    get holdTimes() {
        return this._holdTimes;
    }

    set bombTimes(value: number) {
        this._bombTimes = value;
    }

    get bombTimes() {
        return this._bombTimes;
    }

    set curGroup(value: number) {
        this._curGroup = value;
    }

    get curGroup() {
        return this._curGroup;
    }

    set leftTime(value: number) {
        this._leftTime = value;
    }

    get leftTime() {
        return this._leftTime;
    }

    set currentCard(value: number) {
        this._currentCard = value;
    }

    get currentCard() {
        return this._currentCard;
    }

    set retention(value: number) {
        this._retentionCard = value;
    }

    get retention() {
        return this._retentionCard;
    }

    set cards(data: number[]) {
        this._cards = data;
    }

    get cards() {
        return this._cards;
    }

    set allScore(value: number) {
        this._allScore = value;
    }

    get allScore() {
        return this._allScore;
    }

    getClearCardsNum() {
        let groupAll = 0;
        for (let index = 0; index < this.cardGroups.length; index++) {
            groupAll += this.cardGroups[index].length
        }
        if (this.retention) {
            groupAll++;
        }
        if (this.currentCard) {
            groupAll++;
        }
        let clear = 52 - this.cards.length - groupAll;
        return clear;
    }

    getTimeScore(time: number) {
        //let time = this.leftTime;
        let clear = this.getClearCardsNum() || 0;
        let totalScore = Math.ceil(this._allScore * time / 180 * (clear / 52) / 3);
        return totalScore;
    }

    setScoreGroups(index: number, score: number) {
        this.scoreGroups[index] = score;
    }

    setCardGroup(card: number[], index: number) {
        this.cardGroups[index] = card;
    }

    cardGroupClear(index: number) {
        this.cardGroups[index] = [];
    }

    cardGroupIncrease(index: number) {
        this.cardGroups[index].push(this.currentCard);
    }

    getDeskData() {
        let data: blackjack.Blitz21CompetitionDataResp = new blackjack.Blitz21CompetitionDataResp();
        data.LeftTime = this.leftTime;
        data.CardDesk = new blackjack.Blitz21Carddesk();
        data.CardDesk.Cards = this.cards.concat();
        data.CardDesk.CurrentCard = this.currentCard;
        data.CardDesk.HoldCard = this.retention;
        for (let index = 0; index < this.cardGroups.length; index++) {
            data.CardDesk.PileCards[index] = [];
            data.CardDesk.PileCards[index].Cards = JSON.parse(JSON.stringify(this.cardGroups[index]));
        }
        data.CardDesk.Bombs = this.bombTimes;
        data.CardDesk.HoldCounts = this.holdTimes;
        data.CardDesk.CurrentScore = this.allScore;
        return JSON.parse(JSON.stringify(data));
    }

    startNewGame(cards:number[], lefttime: number, cardgroups: number[][], cb: Function) {
        // let allCards:number[] = Array.from(data[data.GameInitInfo].Cards);
        let allCards: number[] = cards;
        this._startTime = cc.sys.now();
        this.cards = allCards;
        this.leftTime = lefttime;
        this.holdTimes = 5;
        this.allScore = 0;
        this.retention = 0;
        this._curIndex = 0;
        for (let index = 0; index < GROUPNUM; index++) {
            if (cardgroups) {
                this.setCardGroup(cardgroups[index], index);
            }
            else {
                this.setCardGroup([], index);
            }
            this.setScoreGroups(index, 0);
        }
        let curCard = this.cards.shift();
        this.currentCard = curCard;
        cb && cb();

    }

    // startNewGame(data:any){
    //     // let allCards:number[] = Array.from(data[data.GameInitInfo].Cards);
    //     let allCards:number[] = data[data.GameInitInfo].Cards;
    //     let curCard = allCards.pop();
    //     this._startTime=cc.sys.now();
    //     this.currentCard = curCard;
    //     this.cards = allCards;
    //     this.leftTime = data.MatchInfo.LeftTime;
    //     this.holdTimes = 5;
    //     this.allScore = 0;
    //     this.retention = 0;
    //     this._curIndex = 0;
    //     for (let index = 0; index < GROUPNUM; index++) {
    //         if (data.cardGroups) {
    //             this.setCardGroup(data.cardGroups[index],index);
    //         }
    //         else{
    //             this.setCardGroup([],index);
    //         }
    //         this.setScoreGroups(index,0);
    //     }

    // }

    getGuideGameInfo() {
        return {
            cardGroups: [
                [45, 51],
                [44, 18, 54],
                [66, 65, 40, 20],
                []
            ],
            blitz21: {
                Cards: [42,67,57,38,34,17,75]
            },
            GameInitInfo: "blitz21",
            match_info: {
                AverageScore: 46,
                left_time: 300,
                LifeBestScore: 3500
            },
        }
    }
}
