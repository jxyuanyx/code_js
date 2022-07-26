// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import GameHelper from "../../gamecore/tools/GameHelper";
import { BaseRoomService } from "../../gamecore/ui/baseview/imp/BaseRoomService";
import { Game100CardZone } from "./game100_enum";
import Game100Helper from "./game100_helper";

const {ccclass, property} = cc._decorator;

const BASE_CARDS:number[]=[
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d,  // 方片 
 
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2d, // 梅花 
 
    0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, // 红桃 
 
    0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x4b, 0x4c, 0x4d, // 黑桃
]

export const RULE_SCORES={
    OPEN:20,    //显示一张新牌
    D_Z:20,
    D_B:{
        1:100,
        2:90,
        3:80,
        4:70,
        5:60,
        6:50,
        7:40,
        8:30,
        9:20,
        10:10,
        11:10,
        12:10,
        13:10
    }
}

export enum OpearCode{
    Z2B,
    Z2Z,
    D2Z,
    B2Z,
    D2B,
    GET_RANDOM_CARDS,
    GET_RANDOM_CARDS_AUTO,
    OPEN_NEWCARD,
    UNDO
}

export class OpearData{
    code:OpearCode;                     //操作码
    time:number=0;           //时间点
    fromIndex:number;                   //从哪里
    toIndex:number;                     //去哪里
    count:number=1;                     //操作的牌堆的索引
    cards:number[];                     //牌值
    hasNewCard:boolean=false;           //
    score:number=0;                     //积分
    freeTimes:number=0;                 //免费次数
}

export class UploadData{

    StartData:{
        time:number,                         //开始时间
        ZoneData:number[][],                 //牌堆的
        RandomCards:number[]                 //随机牌
    };

    OpearDatas:OpearData[];                

    EndData:{
        // score:number,                        //玩牌积分
        // timeScore:number,                    //时间积分
        lessTime:number                          //结束时间
    }

    lessTime:number=0;                       //剩余多少时间

    totalTime:number=0;                      //总计多长的时间

    constructor(){
        this.StartData={} as any; 
        this.OpearDatas=[];
        this.EndData={} as any;
    }
}

const PROTECT_SCORE:string="score";

@ccclass
export  class Game100RoomServiceOffline extends BaseRoomService {

    private _cards:number[];

    private _zoneCards:number[][];

    private _boxCards:number[][];

    private _freeTime:number=0;

    private _pos:number=0;

    private _dealCardDatas:number[];

    private _pauseTime:number=0;

    private _startPauseTime:number=0;
    
    private _score:number=0;

    set freeTime(value:number){
        this._freeTime=value;
        this._leftCard=this._cards.length;
    }

    get freeTime(){
        return this._freeTime;
    }

    private _leftCard:number=0;

    set leftCard(value:number){
        this._leftCard=value;
    }

    get leftCard(){
        return this._leftCard;
    }
    
    set score(value:number){
        this._score=value;
    }

    get score(){
        return GameHelper.getProtectData(this,PROTECT_SCORE);
    }

    increaseScore(score:number){
        this._score+=score;
        this._score=Math.max(this._score,0);
        
        let tscore=GameHelper.getProtectData(this,PROTECT_SCORE);
        let saveScore=Math.max(tscore+score,0);
        GameHelper.updateProtectData(this,PROTECT_SCORE,saveScore);
    }

    setCheckScore(score:number){
        GameHelper.updateProtectData(this,PROTECT_SCORE,score);
    }

    private _opearDatas:OpearData[];

    private _startTime:number;
    private _endTIme:number;

    private _uploadData:UploadData=new UploadData();

    onLoad(){
        GameHelper.protectData(this,PROTECT_SCORE,0,GameHelper.getXorCode())
    }

    /**
     * 开始新的一局
     */
    startNewGame(randomCards:number[],zoneCards:number[][]){
        this._cards=randomCards;
        this._zoneCards=zoneCards;

        this._freeTime=3;

        this._leftCard=randomCards.length;

        this._pos=0;

        this._boxCards=[];
        for(let i=0;i<4;i++){
            this._boxCards[i]=[];
        }

        this._dealCardDatas=[];
        
        this._uploadData.StartData.RandomCards=randomCards.concat();
        this._uploadData.StartData.ZoneData=JSON.parse(JSON.stringify(zoneCards));
        this._uploadData.OpearDatas=[];
        this._uploadData.StartData.time=cc.sys.now();
    }

    /**
     * 获取新牌
     * @param index 牌堆编号 
     * @returns 
     */
    getCardForZone(index:number){
        let cards=this._zoneCards[index];
        if(cards.length==0)return null;

        return cards[cards.length-1]
    }

    /**
     * 获取初始牌
     * @returns 
     */
    getStartCards(){
        let result:number[]=[];
        for(let i=0;i<7;i++){
            result.push(this.getCardForZone(i));
        }
        return result;
    }

    showNewCard(index:number,card:number){
        let cards=this._zoneCards[index];
        cards[cards.length-1]=card;
    }

    /**
     * 从一个牌堆移到另一个牌堆
     */
    moveCardZ2Z(fromIndex:number,toIndex:number,count:number){
        let t=this._zoneCards[fromIndex];
        let cards=t.splice(t.length-count,t.length)
        this._zoneCards[toIndex]=this._zoneCards[toIndex].concat(cards);

    }

    /**
     * 从牌堆移动到牌盒区
     * @param fromIndex 
     * @param boxIndex 
     */
    moveCardZ2B(fromIndex:number,boxIndex:number){
        this._boxCards[boxIndex].push(this._zoneCards[fromIndex].pop());
    }

    /**
     * 牌盒移动到牌堆
     * @param fromBoxIndex 
     * @param toIndex 
     */
    moveCardB2Z(fromBoxIndex:number,toIndex:number){
        this._zoneCards[toIndex].push(this._boxCards[fromBoxIndex].pop());
    }

    getBoxCardData(fromBoxIndex:number){
        return this._boxCards[fromBoxIndex][this._boxCards[fromBoxIndex].length-1];
    }

    getZoneCardData(fromIndex:number){
        return this._zoneCards[fromIndex][this._zoneCards[fromIndex].length-1];
    }

    getDealLastData(){
        return this._dealCardDatas[this._dealCardDatas.length-1];
    }

    moveCardB2D(fromIndex:number){
        let data=this._boxCards[fromIndex].pop();
        this._cards.splice(this.pos++,0,data);
        this._dealCardDatas.push(data);
    }

    set pos(value:number){
        this._pos=value;
        let cards=[];
        this._cards.concat().map(item=>cards.push(item.toString(16)));
        cc.log("pos>>>>>>",this.pos,cards);
    }

    get pos():number{
        return this._pos;
    }

    /**
     * 发牌区到牌盒
     * @param boxIndex 
     */
    moveCardD2B(boxIndex:number){
        let card=this._dealCardDatas.pop();
        this._boxCards[boxIndex].push(card)
        let index=this._cards.indexOf(card);
        this._cards.splice(index,1);
        this._pos--;
        return this._checkEmptyDealCards();
    }

    _checkEmptyDealCards(){
        if(this._dealCardDatas.length==0&&(this._pos!=0)){
            let count=Math.min(3,this._cards.length);
            this._pos=Math.max(this._pos-count,0);
            this._leftCard+=count;
            return true
        }
        return false;
    }

    setZoneCards(cards:number[][]){
        this._zoneCards=cards;
    }

    setFinishCards(cards:number[][]){
        this._boxCards=cards;
    }

    /**
     * 发牌区到牌堆
     * @param toIndex 
     */
    moveCardD2Z(toIndex:number){
        let card=this._dealCardDatas.pop();
        this._zoneCards[toIndex].push(card);
        let index=this._cards.indexOf(card);
        this._cards.splice(index,1);
        this._pos--;
        return this._checkEmptyDealCards();
    }

    getDealCards(){

        let pos=Math.min(this._pos+3,this._cards.length);

        let result=this._cards.slice(Math.max(pos-3,0),pos);

        this.pos=pos;



        this._leftCard=Math.max(this._leftCard-result.length,0);

        cc.error("getDealCards>>>>>",this._pos,this._leftCard);


        this._dealCardDatas=result.concat();

        return result;
    }

    getDealCardDatas(){
        return this._dealCardDatas.concat();
    }

    resetRound(){
        this.resetLeftCard();
        this._pos=0;
        this._dealCardDatas.splice(0,this._dealCardDatas.length);
    }

    resetLeftCard(){
        this._leftCard=this._cards.length;
    }

     /**
     * 获取牌可移动的位置 
     */
      getCardMoveInfo(card:number,cardZone:Game100CardZone,cardCount:number):{index:number,type:Game100CardZone}{
        console.log("card>>>>>>>>",card);
        //完成区查找
        if(cardZone!=Game100CardZone.BOX&&cardCount==1){
            for(let i=0;i<this._boxCards.length;i++){
                let boxCards=this._boxCards[i];
                if(boxCards.length==0){
                    if(Game100Helper.getLogicValue(card)==1){
                        return {index:i,type:Game100CardZone.BOX};
                    }
                }else{
                    if(boxCards[boxCards.length-1]+1==card){
                        return {index:i,type:Game100CardZone.BOX};
                    }
                }
            }
        }

        //堆牌区查找
        for(let i=0;i<this._zoneCards.length;i++){
            let zoneCards=this._zoneCards[i];
            if(zoneCards.length==0){
                if(Game100Helper.getLogicValue(card)==13){
                    return {index:i,type:Game100CardZone.ZONE};
                }
                continue;
            }
            if(zoneCards.indexOf(card)!=-1)continue;
            let srcCard=zoneCards[zoneCards.length-1];
            if(Game100Helper.getLogicValue(srcCard)==(Game100Helper.getLogicValue(card)+1)&&
            ((Game100Helper.getLogicType(srcCard)&0x1)!=(Game100Helper.getLogicType(card)&0x1))){
                return {index:i,type:Game100CardZone.ZONE};
            }
        }
        return null;
     }
     
     /**
      * 是否能自动移动
      */
     getAutoSolvePath():{fromIndex:number,toIndex:number,cardZone:Game100CardZone}[]{
        let moveSequene:{fromIndex:number,toIndex:number,cardZone:Game100CardZone}[]=[];
        let _zoneCardPoss:number[]=[];
        this._zoneCards.map(item=>_zoneCardPoss.push(item.length-1));
        let finishLastCards:number[]=[];
        //补A的情况
        this._boxCards.forEach((item)=>finishLastCards.push(item[item.length-1]))
        
        while(true){
            let flag=false;
            for(let i=0;i<finishLastCards.length;i++){
                let card=finishLastCards[i];
                //从牌区查找
                for(let j=0;j<this._zoneCards.length;j++){
                    let lastCard=this._zoneCards[j][_zoneCardPoss[j]];
                    if((lastCard==card+1) || (!card && Game100Helper.getLogicValue(lastCard)==1)){
                        moveSequene.push({fromIndex:j,toIndex:i,cardZone:Game100CardZone.ZONE})
                        _zoneCardPoss[j]--;
                        finishLastCards[i]=lastCard;
                        flag=true;
                        break;
                    }
                }
                /*
                //从发牌区找
                if(this._dealCards[_dealCardPos]==card+1){
                    finishLastCards[i]=this._dealCards[_dealCardPos];
                    _dealCardPos--;
                    moveSequene.push({fromIndex:_dealCardPos,toIndex:i,cardZone:Game100CardZone.BOX})
                    flag=true;
                    break;
                }*/
                if(flag)break;
            }
            if(!flag)break;
        }
        if(this.getDealCardCount()==0&&_zoneCardPoss.filter(item=>item==-1).length==_zoneCardPoss.length){
            return moveSequene;
        }else{
            return null;
        }
     }

     hasNoCardsTip(){
        let count=0;
        this._zoneCards.forEach(item=>{
           count+=item.length;
        })
        this._boxCards.forEach(item=>{
            count+=item.length;
        })
        return (count==52)&&(this.getDealCardCount()==0);
     }
     
     
    getDealCardCount(){
        return this._dealCardDatas.length;
    }

    getTimeScore(time:number){
        //let time=cc.sys.now()-this._startTime;
        let totalScore=Math.ceil(this.score*time/300*(this.score/3220)/2);
        return totalScore;
    }

    getUploadData(){
        return this._uploadData;
    }

    logNewCard(card:number){
        let opearData=this._uploadData.OpearDatas[this._uploadData.OpearDatas.length-1];
        opearData.hasNewCard=true;
    }

    /**
     * 
     * @returns 
     */
    opearBack(){
        return this._uploadData.OpearDatas.pop();
    }

    setOpearLessTime(time:number){
        this._uploadData.EndData.lessTime=time;
    }

    moveCardZ2D(fromIndex:number){
        let card=this._zoneCards[fromIndex].pop();
        this._cards.splice(this._pos++,0,card);
        this._dealCardDatas.push(card);
    }

    pauseTime(){
        this._startPauseTime=cc.sys.now();
    }

    resumeTime(){
        this._pauseTime+=cc.sys.now()-this._startPauseTime;
    }

    undoGetCards(cards:number[]){
        let count=Math.min(3,this._cards.length);
        for(let i=0;i<cards.length;i++){
            if(this._dealCardDatas.indexOf(cards[i])!=-1){
                count--;
            }
        }
        this._dealCardDatas=cards;
        this._pos=Math.max(this._pos-count,0);
        let lastGroup=(this._leftCard==this._cards.length);
        cc.error("undogetCards>>>>>",cards,this._pos,this._leftCard);
        if(lastGroup){
            if(this._freeTime<0){
                this._score+=20;

                let score=GameHelper.getProtectData(this,PROTECT_SCORE);
                GameHelper.updateProtectData(this,PROTECT_SCORE,score+20);
            }
            this._freeTime=Math.min(this._freeTime+1,4);
            this._leftCard=0;
        }else{
            this._leftCard+=count;
        }
        return lastGroup;
    }

    backNextCards(cards:number[]){
        let count=Math.min(3,this._cards.length);
        for(let i=0;i<cards.length;i++){
            if(this._dealCardDatas.indexOf(cards[i])!=-1){
                count--;
            }
        }
        this._dealCardDatas=cards;
        //this._pos=Math.min(this._pos+count,this._cards.length-1);
        return false;
    }

    logOpear(opearData:OpearData){
        if(App.DataManager.getGameData().isRecord)return;
        opearData.score=this.score;
        opearData.freeTimes=this._freeTime;
        opearData.time=cc.sys.now()-this._pauseTime;
        cc.error("logopearTime>>>>>",opearData.time)
        this._uploadData.OpearDatas.push(opearData);
    }

    getGuideGameInfo(){
        return {
            match_info:{
                AverageScore:46,
                left_time:300,
                life_best_score:3500
            },

            game_init:{
                PileCards:[
                    [49],
                    [70,37],
                    [21,72,77],
                    [68,23,74,54],
                    [29,53,51,36,34],
                    [50,52,76,56,58,75],
                    [33,35,25,39,41,43,55]
                ],
                RandCards:[17,66,60,17,66,60,17,66,60,17,66,60,17,66,60,17,66,60,17,66,60,17,66,60]
            }

        }
    }
}
