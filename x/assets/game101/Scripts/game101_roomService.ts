// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseRoomService } from "../../gamecore/ui/baseview/imp/BaseRoomService";

const { ccclass, property } = cc._decorator;
const GROUPNUM = 4;

@ccclass
export default class Game101RoomService extends BaseRoomService {

    //当前点击队列
    private _curGroup: number = 0;
    //爆牌次数
    private _bombTimes: number = 0;

    private _holdTimes: number = 0;

    //剩余时间
    private _leftTime: number = 0;
    //牌堆数
    private _cards: number = 0;
    //总分
    private _allScore: number = 0;
    //每组分
    public scoreGroups: number[];

    private _currentCard: number = 0;

    private _retentionCard: number = 0;

    public cardGroups: number[][];



    onLoad() {
        this._init();
    }

    _init() {
        this.scoreGroups = [];
        this.cardGroups = [];
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

    set cards(value: number) {
        this._cards = value;
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



}
