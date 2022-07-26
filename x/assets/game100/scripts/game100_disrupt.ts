// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import BaseDlg from "../../gamecore/ui/baseview/imp/BaseDlg";
import { C } from "../../gamecore/ui/core/Clickable";

export function getFront(card:number){
    let num = Math.floor(card/SYSTEM);
    return num;
}

export function getValue(card:number){
    let value = card%SYSTEM
    return value;
}

/**
 * 获取数组长度
 * @param level 维度 
 * @param Arr 数组
 * @returns 
 */
export function getArrCount(level:number,Arr){
    let num:number = 0;
    switch (level) {
        case 1:
            for (let index = 0; index < Arr.length; index++) {
                if (Arr[index] == 0) {
                    num++;
                }
            }
            break;
        case 2:
            for (let i = 0; i < Arr.length; i++) {
                for (let n = 0; n < Arr[i].length; n++) {
                    if (Arr[i][n] == 0) {
                        num++;
                    }
                }
            }
            break;
        default:
            break;
    }
    
    return num;
}

const {ccclass, property} = cc._decorator;
const DECKNUM:number = 4;//四组
const PILENUM:number = 7;//七个牌堆
const DECKMAX:number = 13;//最大k
const SYSTEM:number = 16;//16进制
const RANDOM:number = 8;//随机8个组合
const SRANNUM:number = 3;//每个组合三张
const COLORNUM:number = 4;//四个花色的牌

@ccclass
export default class game100_disrupt {
    private static _instance:game100_disrupt = null;
    private _seed:number = 0;
    private _rdCard:number[] = [];

    public static getInstance():game100_disrupt{
        if (!game100_disrupt._instance) {
            game100_disrupt._instance = new game100_disrupt();
        }
        return game100_disrupt._instance;
    }

    private _setSeed(seed:number){
        this._seed = seed;
    }

    private _rnd(){
        this._seed = (this._seed * 9301 + 49297)%233280;
        return this._seed / 233280.0;
    }

    private _getRandom(min,max){
        if (min == max) {
            return min;
        }
        max = max || 1;
        min = min || 0;
        let ran = Math.ceil(min + this._rnd() * (max - min));
        return ran;
    }

    /**
     * 获取牌
     */
    public getCards(){
        let allCards:number[][] = [];
        allCards = this._makeAllCards();
        // App.LogManager.i(JSON.parse(JSON.stringify(allCards)),"makeallcards>>>>>>>>>>>>>>>>");
        this.arraySort(allCards);
        // App.LogManager.i(JSON.parse(JSON.stringify(allCards)),"arraySort>>>>>>>>>>>>>>>>");
        let obj = this._getDegreeOne(allCards);
        // App.LogManager.i(JSON.parse(JSON.stringify(obj)),"obj>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        let ranGroup = this._rdDevide(obj.random);
        // App.LogManager.i(JSON.parse(JSON.stringify(ranGroup)),"ranGroup11>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.arraySort(ranGroup);
        // App.LogManager.i(JSON.parse(JSON.stringify(ranGroup)),"ranGroup22>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }

    /**
     * 创建所有牌(花色相间)
     */
    public _makeAllCards(){
        let allCards:number[][] = [];
        for (let k = 0; k < DECKNUM; k++) {
            allCards[k] = [];
        }
        for (let i = 0; i < DECKMAX; i++) {
            let ranList:number[] = [1,2,3,4];
            let single = [1,3];
            let double = [2,4];
            for (let n = 0; n < DECKNUM; n++) {
                if (allCards[n][i-1]){
                    let front = getFront(allCards[n][i-1]);
                    let group = [];
                    switch (front) {
                        case 1:case 3:
                            group = double.splice(this._getRandom(0,double.length) - 1,1);
                            allCards[n].push(group[0]*SYSTEM + i+1);
                            break;
                        case 2:case 4:
                            group = single.splice(this._getRandom(0,single.length) - 1,1);
                            allCards[n].push(group[0]*SYSTEM + i+1);
                            break;
                        default:
                            break;
                    }
                }
                else{
                    let ran = ranList.splice(this._getRandom(0,ranList.length) - 1,1);
                    allCards[n].push(ran[0]*SYSTEM + i+1);
                }
            }    
        }
        return allCards; 
    }

    /**
     * 随机牌堆分组
     */
    private _rdDevide(rdCards:number[]){
        let rdGroup:number[][] = [];
        let sGroup:number[] = [];
        let num:number = 0;
        let len = rdCards.length;
        for (let index = 0; index < len; index++) {
            sGroup.push(rdCards.shift());
            num++;
            if (num >= 3) {
                rdGroup.push(sGroup.concat());
                sGroup = [];
                num = 0;
            }
        }
        return rdGroup;
    }

    /**
     * 数组乱序
     */
    private arraySort(arr:any[]) {
        for(let i = 0; i < arr.length; i++){
            let currentRandom = this._getRandom(0,arr.length)-1;
            let current = arr[i];
            arr[i] = arr[currentRandom];
            arr[currentRandom] = current;
        }
    }

    /**
     * 初始化堆叠牌堆
     * @returns 
     */
    private _initPileCards(){
        let pileCards:number[][] = [];
        for (let index = 0; index < PILENUM; index++) {
            pileCards[index] = [];
            for (let n = 0; n < 7-index; n++) {
                pileCards[index][n] = 0;
            }
        }
        return pileCards;
    }
    
    /**
     * 初始化随机牌堆
     * @returns 
     */
    private _initRandomCards(){
        let rdCards:number[][] = [];
        for (let index = 0; index < RANDOM; index++) {
            rdCards[index] = [];
            for (let n = 0; n < SRANNUM; n++) {
                rdCards[index][n] = 0;
            }
        }
        return rdCards;
    }

    /**
     * 初始化一副牌
     * @param level 
     */
     public _initAllCards(){
        let allCards = new Map();
        let arrCards:number[][] = this._makeAllCards();
        this._saveToTest(null,null,"game100arr_0_",arrCards);
        for (let index = 0; index < arrCards.length; index++) {
            for (let n = 0; n < arrCards[index].length; n++) {
                allCards.set(arrCards[index][n],false);
            }
        }
        return allCards;
    }

    /**
     * 测试用
     */
    private _saveToTest(pileCards:number[][],randomCards:number[][],key,allCards?:number[][]){
        switch (key) {
            case "game100arr_0_":
                let all:any[]=[];
                for (let index = 0; index < allCards.length; index++) {
                    all.push(allCards[index]+"\n");
                }
                cc.sys.localStorage.setItem(key+"all",JSON.stringify(all));
                break;
            default:
                let pile:any[]=[];
                for (let index = 0; index < pileCards.length; index++) {
                    pile.unshift("\n"+pileCards[index]);
                }
                cc.sys.localStorage.setItem(key+"pile",JSON.stringify(pile));
                let random:any[]=[];
                for (let index = 0; index < randomCards.length; index++) {
                    random.unshift("\n"+randomCards[index]);         
                }
                cc.sys.localStorage.setItem(key+"random",JSON.stringify(random));
                break;
        }
    }

    /**
     * 
     * @param level 
     */
    public dealCard(level:number,seed?:number){
        this._rdCard = [];
        // cc.log(level,"level>>>>>>>>>>");
        // cc.log(seed,"seed>>>>>>>>>>>>>>>");
        this._setSeed(seed);
        cc.sys.localStorage.setItem("game100arr_level",level);
        cc.sys.localStorage.setItem("game100arr_seed",seed);
        // App.LogManager.e("dealCard>>>>>>>>>>>>>>>>");
        let pileCards:number[][] = this._initPileCards();
        let randomCards:number[][] = this._initRandomCards();
        let allCards = this._initAllCards();
        // App.LogManager.i("pileCards>>>>>>>>>>>>>>>>1",JSON.parse(JSON.stringify(pileCards)));
        // App.LogManager.i("randomCards>>>>>>>>>>>>>>>>1",JSON.parse(JSON.stringify(randomCards)));
        // App.LogManager.i("allCards>>>>>>>>>>>>>>>>>>1",(allCards));
        let ok:boolean = true;
        switch (level) {
            case 2:
                this._getDegreeTwo(pileCards,randomCards,allCards);
                break;
            case 3:
                this._getDegreeThree(pileCards,randomCards,allCards);
                break;
            case 4:
                this._getDegreeFour(pileCards,randomCards,allCards);
                break;
            case 5:
                this._getDegreeFive(pileCards,randomCards,allCards,1,12);
                break;
            case 6:
                this._getDegreeSix(pileCards,randomCards,allCards,1,12);
                break;
            case 7:
                this._getDegreeSeven(pileCards,randomCards,allCards);
                break;
            case 8:
                this._getDegreeEight(pileCards,randomCards,allCards);
                break;
            case 9:
                this._getDegreeNine(pileCards,randomCards,allCards);
                break;
            case 10:
                this._getDegreeTen(pileCards,randomCards,allCards);
                break;
            default:
                break;
        }
        this._saveToTest(pileCards,randomCards,"game100arr_1_",null);
        // App.LogManager.i("pileCards>>>>>>>>>>>>>>>>***",JSON.parse(JSON.stringify(pileCards)));
        // App.LogManager.i("randomCards>>>>>>>>>>>>>>>>***",JSON.parse(JSON.stringify(randomCards)));
        // App.LogManager.i("allCards>>>>>>>>>>>>>>>>>>***",JSON.parse(JSON.stringify(allCards)));
        this._dealNormal(allCards,pileCards,randomCards);
        this._saveToTest(pileCards,randomCards,"game100arr_2_",null);
        // App.LogManager.i("pileCards>>>>>>>>>>>>>>>>///",JSON.parse(JSON.stringify(pileCards)));
        // App.LogManager.i("randomCards>>>>>>>>>>>>>>>>///",JSON.parse(JSON.stringify(randomCards)));
        // App.LogManager.i("allCards>>>>>>>>>>>>>>>>>>///",allCards);
        this.arraySort(randomCards);
        let RandAreaCards:number[] = [];
        let PileAreaCards:number[][] = [];
        for (let i = 0; i < randomCards.length; i++) {
            for (let n = 0; n < randomCards[i].length; n++) {
                RandAreaCards.push(randomCards[i][n]);
            }
        }
        let pileLen:number = pileCards.length;
        for (let index = 0; index < pileLen; index++) {
            PileAreaCards.push(pileCards.pop());
        }
        cc.sys.localStorage.setItem("game100arr_rdCards",JSON.stringify(this._rdCard));
        return {RandCards:RandAreaCards,PileCards:PileAreaCards};
    }

    /**
     * 获取放牌位置 -1 随机牌堆 index堆叠队列
     * @param ranCards 
     * @param pileCards 
     * @param max 
     */
    private _getPosIndex(ranCards:number[][],pileCards:number[][],max:number){
        if (getArrCount(2,ranCards) > 0) {   //如果随机牌堆没满
            if (this._getRandom(0,2) == 1) {
                return -1;
            }
        }
        let randomList:number[] = [];   //堆叠牌堆可以放牌的列
        for (let index = 0; index < max; index++) {
            if (getArrCount(1,pileCards[index]) > 0) {
                randomList.push(index);
            }            
        }
        if (randomList.length == 0) {
            return -1;
        }
        let pile = randomList[(this._getRandom(0,randomList.length))-1];
        // cc.log(randomList,"randomList>>>>>>>>>>>>>>>>>>");
        return pile
    }

    /**
     * 获取堆叠牌堆哪组是最后一张
     * @param pileCards 
     * @returns 
     */
    private _getEndInPile(pileCards:number[][]){
        for (let index = 0; index < pileCards.length-1; index++) {  //第七列不算
            if (getArrCount(1,pileCards[index]) == 1 && pileCards[index][6-index]==0) {
                return index;
            }  
        }
        return -1
    }

    public _dealNormal(allCards:Map<number,boolean>,pileCards:number[][],randomCards:number[][]){
        
        let keys = Array.from(allCards.keys());
        let isEnd:boolean = false;
        for (let i = 0; i < keys.length; i++) {
            if (i == 51) {
                // cc.log("11");
            }
            if (allCards.get(keys[i])) {
                continue;
            }
            let queue = Math.ceil(i/DECKMAX)
            let num = queue+2;    //可以放牌得最大牌堆;
            let group:number = 0;
            if (queue == 4) {
                if (this._getEndInPile(pileCards)!=-1 && pileCards[PILENUM-1][0] == 0) {    //堆叠牌其中一列差一张结尾且最后一列无牌
                    if (isEnd==false) {
                        group=PILENUM-1;
                        isEnd=true;
                    }
                }
                else if(this._getEndInPile(pileCards)!=-1 && pileCards[PILENUM-1][0]!=0 && isEnd == true){  //堆叠牌堆放牌
                    group = this._getEndInPile(pileCards);
                    isEnd = false;
                }
                else{
                    group = this._getPosIndex(randomCards,pileCards,num);
                }
            }
            else{
                group = this._getPosIndex(randomCards,pileCards,num);
            }
            // cc.log(group,"group>>>>>>>>>>>>>>>>>>>>")
            if (group == -1) {
                this._useCard(allCards,keys[i],randomCards);
            }
            else{
                this._useCard(allCards,keys[i],pileCards,group);
            }
        }

    }
    
    private _getDegreeOne(allCards:number[][]){
        let pileCards:number[][] = [];
        let randomCards:number[] = [];
        for (let index = 0; index < PILENUM; index++) {
            pileCards[index] = [];
        }
        for (let i = 0; i < allCards.length; i++) {
            let isEnd:boolean = false;
            for (let n = 0; n < allCards[i].length; n++) {
                let num = this._getCanPile(i+1);
                let group:number = 0;
                if (i == allCards.length - 1) {
                    if (this._getIsEndPile(pileCards)!=-1 && pileCards[PILENUM-1].length == 0) {//堆叠牌有一组差一张结尾且最后一列无牌
                        if (isEnd == false) {
                            group = PILENUM-1;
                            isEnd = true;
                        }
                    }
                    else if(this._getIsEndPile(pileCards)!=-1 && pileCards[PILENUM-1].length != 0 && isEnd == true){//堆叠牌堆放牌
                        group = this._getIsEndPile(pileCards);
                        isEnd = false;
                    }
                    else{
                        group = this._getPileNum(randomCards,pileCards,num);
                    }
                }
                else{
                    group = this._getPileNum(randomCards,pileCards,num);
                }
                if (group == -1) {
                    randomCards.push(allCards[i][n]);
                }
                else{
                    pileCards[group].push(allCards[i][n]);
                }
            }
        }
        return {piles:pileCards,random:randomCards};
    }

    public _getDegreeTwo(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){
        // App.LogManager.e("_getDegreeTwo>>>>>>>>>>>>>>>>");
        let random = this._getRandom(0,3);
        let rdCard = this._getRanCard(0,8);
        this._rdCard.push(rdCard);
        // App.LogManager.i(rdCard,"rdCard>>>>>>>>>>>>>");
        // App.LogManager.i(random,"random>>>>>>>>>>>>>");
        switch (random) {
            case 1:
                let aOArr:number[]=this._getAOneDiff(rdCard);
                let mFArr:number[]=this._getSCSmall(rdCard);
                // App.LogManager.i(aOArr,"aOArr>>>>>>>>>>>>>");
                // App.LogManager.i(mFArr,"mFArr>>>>>>>>>>>>>");
                let rdCol:number = this._getRandom(0,5);//随机牌不能在第一列和最后一列
                let rdRow:number = this._getRandom(0,7-2-rdCol);//随机牌不能在最高层
                this._useCard(allCards,rdCard,pileCards,rdCol,rdRow);
                let level = rdCol + rdRow + 1;
                this._inputSpecial(allCards,level,true,true,pileCards,ranCards,mFArr);
                this._inputSpecial(allCards,level,false,false,pileCards,ranCards,aOArr);
                break;
            case 2:
                let value2 = getValue(rdCard);
                let ran2 = this._getRandom(0,8)-1;
                // App.LogManager.i(value2,"value2>>>>>>>>>>>>>");
                // App.LogManager.i(ran2,"ran2>>>>>>>>>>>>>");
                switch (value2) {
                    case 1:
                        this._useCard(allCards,rdCard,ranCards,ran2,2);
                        break;
                    case 2:
                        this._useCard(allCards,rdCard,ranCards,ran2,1);
                        this._useCard(allCards,rdCard-1,ranCards,ran2,2);
                        break;
                    default:
                        this._useCard(allCards,rdCard,ranCards,ran2,0);
                        this._useCard(allCards,rdCard-1,ranCards,ran2,1);
                        this._useCard(allCards,rdCard-2,ranCards,ran2,2);
                        break;
                }
                break;
            case 3:
                let value3 = getValue(rdCard);
                let ran3 = this._getRandom(0,8) - 1;
                // App.LogManager.i(value3,"value3>>>>>>>>>>>>>");
                // App.LogManager.i(ran3,"ran3>>>>>>>>>>>>>");
                this._useCard(allCards,rdCard,ranCards,ran3,2);
                if (value3 != 13) {
                    let obj = this._findAOneDiffCard(rdCard)
                    let c1 = obj.c1;
                    let c2 = obj.c2;

                    this._useCard(allCards,c1,ranCards,ran3,1);
                    this._useCard(allCards,c2,ranCards,ran3,2);
                }
            default:
                break;
        }
        // App.LogManager.i(pileCards,"111pileCards>>>>>>>>>>>>>");
        // App.LogManager.i(ranCards,"111ranCards>>>>>>>>>>>>>>>");
        // App.LogManager.i(allCards,"allCards>>>>>>>>>>>>>>>>>>>");
        return true;
    }


    private _getDegreeThree(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){
        let rdCard:number = this._getRanCard(0,10);//随机牌值小于10 
        this._rdCard.push(rdCard);
        let rdCol:number = this._getRandom(0,4);//随机牌不在第一列和最后一列
        let rdRow:number = this._getRandom(0,7-2-rdCol);//随机牌不在最高层和最底层
        if (rdCol+rdRow < 5-1) {      //随机层级大于5
            rdRow = 4 - rdCol;
        }
        // App.LogManager.i("rdCard>>>>>>>>>>>>>",rdCard);
        // App.LogManager.i("rdCol>>>>>>>>>>>>>",rdCol);
        // App.LogManager.i("rdRow>>>>>>>>>>>>",rdRow);

        // App.LogManager.i("pileCards>>>>>>>>>>>>>1",JSON.parse(JSON.stringify(pileCards)));
        // App.LogManager.i("ranCards>>>>>>>>>>>>>1",JSON.parse(JSON.stringify(ranCards)));
        // App.LogManager.i("allCards>>>>>>>>>>>>1",JSON.parse(JSON.stringify(allCards)));
        this._useCard(allCards,rdCard,pileCards,rdCol,rdRow);
        // App.LogManager.i("pileCards>>>>>>>>>>>>>2",JSON.parse(JSON.stringify(pileCards)));
        // App.LogManager.i("ranCards>>>>>>>>>>>>>2",JSON.parse(JSON.stringify(ranCards)));
        // App.LogManager.i("allCards>>>>>>>>>>>>2",JSON.parse(JSON.stringify(allCards)));
        
        let aDiffS:number = this._getASCAndDFSmall(rdCard);//同色不同花色且小的牌
        let lowRow:number = this._getRandom(0,rdRow)-1;
        // cc.log(aDiffS,"aDiffS>>>>>>>>>>>>>>>>>");
        // cc.log(lowRow,"lowRow>>>>>>>>>>>>>>>>>");
        this._useCard(allCards,aDiffS,pileCards,rdCol,lowRow);
        // App.LogManager.i("allCards>>>>>>>>>>>>3",JSON.parse(JSON.stringify(allCards)));
        // App.LogManager.i("ranCards>>>>>>>>>>>>>3",JSON.parse(JSON.stringify(ranCards)));
        // App.LogManager.i("pileCards>>>>>>>>>>>>3",JSON.parse(JSON.stringify(pileCards)));

        let ss:number[]=this._getSCSmall(rdCard);
        let level = rdCol+rdRow+1;
        for (let index = 0; index < ss.length; index++) {
            this._inPutPileAsLevel(allCards,false,level,pileCards,ss[index]);
        }
        // App.LogManager.i("allCards>>>>>>>>>>>>4",JSON.parse(JSON.stringify(allCards)));
        // App.LogManager.i("ranCards>>>>>>>>>>>>>4",JSON.parse(JSON.stringify(ranCards)));
        // App.LogManager.i("pileCards>>>>>>>>>>>>4",JSON.parse(JSON.stringify(pileCards)));
        
        let asdfv:number = this._getASCDiffValue(rdCard);
        // App.LogManager.i("asdfv>>>>>>>>>>>>>>>",asdfv);
        this._inPutPileAsLevel(allCards,true,level,pileCards,asdfv);
        // App.LogManager.i("allCards>>>>>>>>>>>>5",JSON.parse(JSON.stringify(allCards)));
        // App.LogManager.i("ranCards>>>>>>>>>>>>>5",JSON.parse(JSON.stringify(ranCards)));
        // App.LogManager.i("pileCards>>>>>>>>>>>>5",JSON.parse(JSON.stringify(pileCards)));
    }

    private _getDegreeFour(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){
        let rdCard:number = 0;//随机一张 A~3或者J~K的牌
        if (this._getRandom(0,2) == 1) {
            rdCard = this._getRanCard(0,3);
        }
        else{
            rdCard = this._getRanCard(10,13);
        }
        this._rdCard.push(rdCard);
        let rdCol:number = this._getRandom(0,4)-1;
        let rdRow:number = this._getRandom(0,2)-1;
        this._useCard(allCards,rdCard,pileCards,rdCol,rdRow);//放在随机堆叠牌堆底层
    }

    private _getDegreeFive(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>,min:number=1,max:number=12,index?:number){
        let ran:number = this._getRandom(0,2);
        if (index) ran = index;
        switch (ran) {
            case 1:
                let Front1 = this._getRandom(0,COLORNUM);
                let Front2:number = this._getSameColor(Front1);
                let value1 = this._getRandom(min,max);  //需要有一张+1 一张-1的牌
                let card1:number = SYSTEM*Front1 + value1;    //M
                this._rdCard.push(card1);
                let card2:number = SYSTEM*Front2 + value1;   //N
                let card3:number = SYSTEM*Front1 + value1 - 1;   //M-1
                let card4:number = SYSTEM*this._getDiffColor(Front1) + value1 + 1;   //M+1
                let ran1 = this._getRandom(1,8)-1;
                let ran2 = this._getRandom(0,ran1)-1;
                this._useCard(allCards,card1,ranCards,ran1,SRANNUM-1);//M直接放第三列
                this._useCard(allCards,card2,ranCards,ran2,SRANNUM-1);//N与M不同组合
                this._useCard(allCards,card3,ranCards,ran1,SRANNUM-2);
                this._useCard(allCards,card4,ranCards,ran1,SRANNUM-3);
                // cc.log(card1,"card1>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(card2,"card2>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(card3,"card3>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(card4,"card4>>>>>>>>>>>>>>>>>>>>>>>")
                break;
            case 2:
                let front1:number = this._getRandom(0,COLORNUM);
                let front2:number = this._getSameColor(front1);
                let front3:number = this._getDiffColor(front1);
                let front4:number = this._getSameColor(front3);
                let value2:number = this._getRandom(min,max);//M+1 所以13空出来 M-1 所以1空出来
                let board1:number = SYSTEM*front1 + value2;//随机牌
                this._rdCard.push(board1);
                let board2:number = SYSTEM*front2 + value2//同色同值
                let board3:number = SYSTEM*front3 + value2 + 1;//异色+1
                let board4:number = SYSTEM*front1 + this._getRandom(0,value2-1);//同花色小于M
                let board5:number = SYSTEM*front4+value2+1;//另一张异色+1
                let rdCol1:number = this._getRandom(0,3);//随机牌不能在第一列和最后一列
                let rdRow:number = this._getRandom(1,7-2-rdCol1);//随机牌不能在最高层
                let rdCol2:number = this._getRandom(0,3);
                if (rdCol1 == rdCol2) {//不同列
                    rdCol2 ++;
                }
                this._useCard(allCards,board1,pileCards,rdCol1,rdRow);
                this._useCard(allCards,board2,pileCards,rdCol2,rdRow+rdCol1-rdCol2)//相同层级
                this._useCard(allCards,board3,pileCards,rdCol1,rdRow-1);
                this._useCard(allCards,board4,pileCards,rdCol1,this._getRandom(0,rdRow-1)-1);
                this._useCard(allCards,board5,pileCards,rdCol2,rdRow+rdCol1-rdCol2+1);
                // cc.log(board1,"board1>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(board2,"board2>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(board3,"board3>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(board4,"board4>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(board5,"board5>>>>>>>>>>>>>>>>>>>>>>")
                break;
            default:
                break;
        }
    }

    private _getDegreeSix(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>,min:number=1,max:number=12,index?:number){
        let ran =this._getRandom(0,2)
        if (index) ran = index;
        switch (ran) {
            case 1:
                let color:number = this._getRandom(0,4);
                let color2:number = this._getDiffColor(color);
                let value:number = this._getRandom(min,max);
                let card1:number = SYSTEM*color+value;//随机牌
                this._rdCard.push(card1);
                let card2:number = SYSTEM*color2+value+1;//异色+1
                let card3:number = color*SYSTEM+this._getRandom(0,value-1);//同花色小于
                let card4:number = SYSTEM*this._getSameColor(color2)+value+1//另外一张异色+1的牌
                let card5:number = SYSTEM*this._getSameColor(color)+value;//同色同值N
                let rdCol1:number = this._getRandom(0,3);
                let rdCol2:number = this._getRandom(0,3);
                if (rdCol1 == rdCol2) {
                    rdCol2 ++;
                }
                let rdRow:number = this._getRandom(1,7-2-rdCol1);
                this._useCard(allCards,card1,pileCards,rdCol1,rdRow);
                this._useCard(allCards,card2,pileCards,rdCol1,rdRow-1);
                this._useCard(allCards,card3,pileCards,rdCol1,this._getRandom(0,rdRow-1)-1);
                this._useCard(allCards,card4,pileCards,rdCol2,rdRow+rdCol1-rdCol2+1);
                this._inPutRan(allCards,true,ranCards,card5);//放到随机牌堆并且要放第三列
                // cc.log(card1,"card1>>>>>>>>>>>>>>>>>");
                // cc.log(card2,"card2>>>>>>>>>>>>>>>>>");
                // cc.log(card3,"card3>>>>>>>>>>>>>>>>>");
                // cc.log(card4,"card4>>>>>>>>>>>>>>>>>");
                // cc.log(card5,"card5>>>>>>>>>>>>>>>>>");
                break;
            case 2:
                let Color:number = this._getRandom(0,COLORNUM);
                let Value:number = this._getRandom(min,max);//需有M+1的牌 所以13空出来
                let diffC:number = this._getDiffColor(Color);
                let colArr:number[] = [1,2,3];  //因为难度十 可能会重叠所以 保证不能重叠;
                this.arraySort(colArr);
                let len = colArr.length
                let rdCol:number = 0;
                for (let index = 0; index < len; index++) {
                    let col:number = colArr.pop();
                    if (this._checkArrIsEmpty(pileCards[col])) {
                        rdCol = col;
                        break;
                    }
                }
                let rdRow1:number = this._getRandom(1,7-2-rdCol);//最上面留一格 下面留两格
                let board1:number = SYSTEM*Color+Value;//随机牌
                this._rdCard.push(board1);
                let board2:number = SYSTEM*diffC+Value+1;//异色+1(1)
                let board3:number = SYSTEM*this._getSameColor(diffC)+Value+1;//异色+1(2)
                let board4:number = SYSTEM*diffC+Value-1;//异色-1
                this._useCard(allCards,board1,pileCards,rdCol,rdRow1);
                this._useCard(allCards,board2,pileCards,rdCol,rdRow1-1)//压住一张;
                this._useCard(allCards,board3,pileCards,rdCol,rdRow1-1-1)//再压住一张
                this._inPutRan(allCards,true,ranCards,board4);//随机牌堆 第三列扔一张
                // this._useCard(allCards,board4,ranCards,this._getRandom(0,8)-1,SRANNUM-1);
                // cc.log(board1,"board1>>>>>>>>>>>>>>>>>");
                // cc.log(board2,"board2>>>>>>>>>>>>>>>>>");
                // cc.log(board3,"board3>>>>>>>>>>>>>>>>>");
                // cc.log(board4,"board4>>>>>>>>>>>>>>>>>");
                break;
            default:
                break;
        }
    };

    private _getDegreeSeven(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){
        switch (this._getRandom(0,2)) {
            case 1:
                let color:number = this._getRandom(0,COLORNUM);
                let value:number = this._getRandom(1,DECKMAX-1);//一张M-1 一张M+1
                let diffC:number = this._getDiffColor(color);
                let col:number = this._getRandom(0,3)-1;//压住三张且M不在层级7
                let row:number = this._getRandom(2,7-2-col);
                let card1:number = SYSTEM*color+value;//随机牌
                this._rdCard.push(card1);
                let card2:number = SYSTEM*diffC+value+1;//异色+1(1)
                let card3:number = SYSTEM*this._getSameColor(diffC)+value+1;//异色+1(2)
                let card4:number = SYSTEM*color+this._getRandom(0,value-1);//同花色且小于
                let seque:number[] = [1,2,3];
                this.arraySort(seque);//三张被压的牌层级随机
                this._useCard(allCards,card1,pileCards,col,row);
                this._useCard(allCards,card2,pileCards,col,row-seque.pop());
                this._useCard(allCards,card3,pileCards,col,row-seque.pop());
                this._useCard(allCards,card4,pileCards,col,row-seque.pop());
                // cc.log(card1,"card1>>>>>>>>>>>>>>>>>>>>>");
                // cc.log(card2,"card2>>>>>>>>>>>>>>>>>>>>>");
                // cc.log(card3,"card3>>>>>>>>>>>>>>>>>>>>>");
                // cc.log(card4,"card4>>>>>>>>>>>>>>>>>>>>>");
                break;
            case 2:
                let color2:number = this._getRandom(0,COLORNUM);
                let value2:number = this._getRandom(1,DECKMAX-1)//一张M+1 一张M-1
                let sameC:number = this._getSameColor(color2);
                let diffC1:number = this._getDiffColor(color2);
                let diffC2:number = this._getSameColor(diffC1);
                let board1:number = SYSTEM*color2 + value2;//随机牌
                this._rdCard.push(board1);
                let board2:number = SYSTEM*sameC + value2;//同色同值
                let boardDC1:number = SYSTEM*diffC1+value2+1;//异色+1(1)
                let boardDC2:number = SYSTEM*diffC2+value2+1;//异色+1(2)
                let boardDC3:number = SYSTEM*color2+value2-1;//同色-1(1)
                let boardDC4:number = SYSTEM*sameC+value2-1;//同色-1(1)
                let colArr:number[] = [0,1,2,3];//符合条件的堆叠列
                this.arraySort(colArr);
                let boardArr:number[] = [boardDC1,boardDC2,boardDC3,boardDC4];
                this.arraySort(boardArr);
                let col1:number = colArr.pop();
                let col2:number = colArr.pop();
                let row1:number = this._getRandom(2,7-2-col1);
                let row2:number = this._getRandom(2,7-2-col2);
                this._useCard(allCards,board1,pileCards,col1,row1);
                this._useCard(allCards,boardArr.pop(),pileCards,col1,row1-1);
                this._useCard(allCards,boardArr.pop(),pileCards,col1,row1-2);
                this._useCard(allCards,board2,pileCards,col2,row2);
                this._useCard(allCards,boardArr.pop(),pileCards,col2,row2-1);
                this._useCard(allCards,boardArr.pop(),pileCards,col2,row2-2);
                // cc.log(board1,"board1>>>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(board2,"board2>>>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(boardDC1,"boardDC1>>>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(boardDC2,"boardDC2>>>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(boardDC3,"boardDC3>>>>>>>>>>>>>>>>>>>>>>>>>")
                // cc.log(boardDC4,"boardDC4>>>>>>>>>>>>>>>>>>>>>>>>>")
                break;
            default:
                break;
        }
    }

    private _getDegreeEight(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){//5.1 5.2
        let indexArr:number[] = [1,2];
        this.arraySort(indexArr);
        let valueArr:number[][] = [[1,5],[7,12]]
        this.arraySort(valueArr);
        let len = indexArr.length;
        for (let index = 0; index < len; index++) {
            let value:number[] = valueArr.pop();
            this._getDegreeFive(pileCards,ranCards,allCards,value[0],value[1],indexArr.pop());
        }
        
    }

    private _getDegreeNine(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){ //5.1  6.1or6.2
        let valueArr:number[][] = [[1,5],[7,12]]
        this.arraySort(valueArr);
        let value:number[] = valueArr.pop();
        this._getDegreeFive(pileCards,ranCards,allCards,value[0],value[1],1);
        let index:number = this._getRandom(0,2);
        let value2:number[] =  valueArr.pop();
        this._getDegreeSix(pileCards,ranCards,allCards,value2[0],value2[1],index);
    }

    private _getDegreeTen(pileCards:number[][],ranCards:number[][],allCards:Map<number,boolean>){
        let indexArr:number[][] = [[1,2],[2,2]]
        let valueArr:number[][] = [[1,5],[7,12]]
        this.arraySort(valueArr);
        let ran = this._getRandom(0,2)-1;
        for (let index = 0; index < indexArr[ran].length; index++) {
            let value:number[] = valueArr.pop();
            this._getDegreeSix(pileCards,ranCards,allCards,value[0],value[1],indexArr[ran][index]);
        }
    }

    private _useCard(allCards:Map<number,boolean>,card:number,arr:number[][],first:number=null,second:number=null){
        if (card==0) {
            return;
        }
        if (first!=null&&second!=null) {
            arr[first][second] = card;
            allCards.set(card,true);
            return;
        }
        else if(first!=null&&second==null){
            for (let index = 0; index < arr[first].length; index++) {
                if (arr[first][index] == 0) {
                    arr[first][index] = card;
                    allCards.set(card,true);
                    return;
                }  
            }
        }
        else{
            for (let index = 0; index < arr.length; index++) {
                for (let n = 0; n < arr[index].length; n++) {
                    if (arr[index][n] == 0) {
                        arr[index][n] = card;
                        allCards.set(card,true);
                        return;
                    }                
                }
            }
        }
        
    }

    /**
     * 获取一张随机牌
     */
    private _getRanCard(min,max){
        let rdCard = this._getRandom(0,4)*SYSTEM + this._getRandom(min,max);
        return rdCard;
    }

    /**
     * 检查是否没牌
     */
    private _checkArrIsEmpty(arr){
        for (let index = 0; index < arr.length; index++) {
            if (arr[index]!=0) {
                return false
            }
        }
        return true;
    }

    /**
     * 牌放入堆叠牌堆
     * @param isMax 
     * @param level
     * @param pileCards 
     * @param card 
     */
    private _inPutPileAsLevel(allCards:Map<number,boolean>,isMax:boolean=true,level:number,pileCards:number[][],card:number){
        let emptyArr:number[] = [];
        if (isMax) {
            for (let index = 0; index < pileCards.length; index++) {
                let start = level - index;
                if (start < 0) {
                    start = 0
                }
                let len = emptyArr.length;
                for (let n = start; n < pileCards[index].length; n++) {
                    if (pileCards[index][n] == 0) {
                        emptyArr.push(index);
                        break;
                    }
                }
                if (len!=emptyArr.length) {
                    continue;
                }
            }
        }
        else{
            for (let index = 0; index < level - 1; index++) {
                let len = emptyArr.length;
                for (let n = 0; n < level - 1 -index; n++) {
                    if (pileCards[index][n] == 0) {
                        emptyArr.push(index);
                        break;;
                    }
                }
                if (len!=emptyArr.length) {
                    continue;
                }
            }
        }
        // App.LogManager.i(emptyArr,"_inPutPileAsLevel>>>>>>>>>>>>>>>>>>>>>>>>>emptyArr");
        if (emptyArr.length <= 0) {
            return;
        }
        let ran = emptyArr[this._getRandom(0,emptyArr.length) - 1];
        if (isMax) {
            let start = level - ran;
            if (start < 0) {
                start = 0
            }
            for (let n = start; n < pileCards[ran].length; n++) {
                if (pileCards[ran][n] == 0) {
                    this._useCard(allCards,card,pileCards,ran,n);
                    break;
                }
                else{
                    continue
                }
            }
        }
        else{
            for (let n = 0; n < level - 1 - ran; n++) {
                if (pileCards[ran][n] == 0) {
                    this._useCard(allCards,card,pileCards,ran,n);
                    break;
                }
            }
        }
    }   

    /**
     * 牌放入随机牌堆
     * @param isThird 
     * @param ranCards 
     * @param card 
     * @returns 
     */
    private _inPutRan(allCards,isThird:boolean = false,ranCards:number[][],card:number){
        let emptyArr:number[] = [];
        if (isThird) {
            for (let index = 0; index < ranCards.length; index++) {
                if(ranCards[index][SRANNUM-1] == 0){
                    emptyArr.push(index);
                    continue;
                } 
            }
        }
        else{
            for (let index = 0; index < ranCards.length; index++) {
                let len = emptyArr.length;
                for (let n = 0; n < ranCards.length; n++) {
                    if (ranCards[index][n] == 0) {
                        emptyArr.push(index);
                        break;
                    }
                }
                if (len!=emptyArr.length) {
                    continue;
                }
            }
        }
        // App.LogManager.i(emptyArr,"isPutRan>>>>>>>>>>>>>>>>>>>>>>>>>emptyArr");
        let ran = emptyArr[this._getRandom(0,emptyArr.length)-1];
        if (isThird) {
            this._useCard(allCards,card,ranCards,ran,SRANNUM-1);
        }
        else{
            for (let index = 0; index < ranCards[ran].length; index++) {
                if (ranCards[ran][index] == 0) {
                    this._useCard(allCards,card,ranCards,ran,index);
                    break;
                }
            }
        }
    }

    /**
     * 一些特殊的牌提前设置
     * @param level 层级 
     * @param isMax 是否层级大于随机牌
     * @param isThird 是否随机牌要在第三列
     * @param pileCards 堆叠牌堆
     * @param ranCards 随机牌堆
     * @param cards 特殊牌组
     */
    private _inputSpecial(allCards:Map<number,boolean>,level:number,isMax:boolean=true,isThird:boolean=false,pileCards:number[][],ranCards:number[][],cards:number[]){
        for (let index = 0; index < cards.length; index++) {
            let ran = this._getRandom(0,2);
            switch (ran) {
                case 1:
                    this._inPutRan(allCards,isThird,ranCards,cards[index]);
                    break;
                case 2:
                    this._inPutPileAsLevel(allCards,isMax,level,pileCards,cards[index]);
                    break;

                default:
                    break;
            }
        }
    }

    /**
     * 获取一张小于当前牌的同色牌
     */
    private _getMinF(card:number){
        let front = getFront(card);
        let value = getValue(card); 
        let minValue:number = this._getRandom(0,value-1);
        if (minValue == 0) {
            return -1;
        }
        let minCard:number = SYSTEM*front + minValue;
        return minCard;
    }

    /**
     * 查找异色+1的牌
     * @param card 
     * @returns 
     */
    private _findAOneDiffCard(card:number){
        let front = getFront(card);
        let value = getValue(card);
        let c1,c2:number = 0;
        if (value == 13) {
            return {c1:c1,c2:c2};
        }
        switch (front) {
            case 1:case 3:
                c1 = 2*SYSTEM+value+1;
                c2 = 4*SYSTEM+value+1;
                break;

            case 2:case 4:
                c1 = 1*SYSTEM+value+1;
                c2 = 2*SYSTEM+value+1;
                break;
        
            default:
                break;
        }
        return {c1:c1,c2:c2};
    }

        /**
     * 可以放置的最大堆号
     * @returns 
     */
         private _getCanPile(index:number){
            let num:number = index + 2;
            return num;
        }
    
        /**
         * 获得放牌堆叠堆号
         * @returns 
         */
        private _getPileNum(randomCards:number[],pileCards:number[][],max:number){
            if (randomCards.length < 24) {
                let ran = this._getRandom(0,2);
                if (ran == 1) {
                    return -1;
                }
            }
            let randomList:number[] = [];
            for (let index = 0; index < max; index++) {
                if (pileCards[index].length < 8-(index+1)) {
                    randomList.push(index);
                }
            }
            if (randomList.length == 0) {
                return -1;
            }
            let pile = randomList[(this._getRandom(0,randomList.length))-1];
            return pile;
        }
    
        /**
         * 获取牌哪组是不是最后一张
         */
        private _getIsEndPile(pileCards:number[][]){
            for (let index = 0; index < pileCards.length-1; index++) {
                if (pileCards[index].length == 8-(index+2)) {
                    return index;
                }
            }
            return -1;
        }
    
        /**
         * 获取异色且+1的牌
         * @param allCards 
         * @param card 
         */
        private _getAOneDiff(card:number){
            let AO:number[] = [];
            let front = getFront(card);
            let value = getValue(card);
            if (value == DECKMAX) {
                return AO;
            }
            switch (front) {
                case 1:case 3:
                    AO.push(SYSTEM*2+value+1);
                    AO.push(SYSTEM*4+value+1);
                    break;
                case 2:case 4:
                    AO.push(SYSTEM*1+value+1);
                    AO.push(SYSTEM*3+value+1);
                    break;
                default:
                    break;
            }
            return AO;
        }

        /**
         * 获得一张同色不同花色且小于当前的牌
         */
        private _getASCAndDFSmall(card:number){
            let ACDF:number = 0;
            let front = getFront(card);
            let value = getValue(card);
            let newFront:number = 0;
            let newValue:number = 0;
            if (value == 1) {
                return ACDF;
            }
            newValue = this._getRandom(0,value-1);
            switch (front) {
                case 1:
                    newFront = 3;
                    break;
                case 2:
                    newFront = 4;
                    break;
                case 3:
                    newFront = 1;
                    break;
                case 4:
                    newFront = 2;
                    break;
                default:
                    break;
            }
            ACDF = newFront*SYSTEM + newValue;
            return ACDF;
        }

        /**
         * 获得与当前牌同色不同花色同值的那张牌
         * @param card 
         * @returns 
         */
        private _getASCDiffValue(card:number){
            let front = getFront(card);
            let value = getValue(card);
            let newFront:number = 0;
            switch (front) {
                case 1:
                    newFront = 3;
                    break;
                case 2:
                    newFront = 4;
                    break;
                case 3:
                    newFront = 1;
                    break;
                case 4:
                    newFront = 2;
                    break;
                default:
                    break;
            }
            let ASDFV:number = newFront * SYSTEM + value;
            return ASDFV;
        }

        /**
         *  获得相同花色且小于当前牌
         * @param card 
         * @returns 
         */
        private _getSCSmall(card:number){
            let ss:number[] = [];
            let front = getFront(card);
            let value = getValue(card);
            if (value == 1) {
                return ss;
            }
            for (let index = 1; index < value; index++) {
                ss.push(front*SYSTEM+index);
            }
            return ss;
        }

        /**
         * 获得同色且大的牌
         */
        private _getSCBig(card:number){
            let SS:number[] = [];
            let front = getFront(card);
            let value = getValue(card);
            if (value == DECKMAX) {
                return SS;
            }
            for (let index = value+1; index <= DECKMAX; index++) {
                SS.push(front*SYSTEM+index);
            }
            return SS;
        }

        /**
         * 获得同色
         * @param color 
         * @returns 
         */
        private _getSameColor(color:number){
            let diffColor:number = 0;
            switch (color) {
                case 1:
                    diffColor = 3;
                    break;
                case 2:
                    diffColor = 4;
                    break;
                case 3:
                    diffColor = 1;
                    break;
                case 4:
                    diffColor = 2;
                    break;
                default:
                    break;
            }
            return diffColor;
        }

        /**
         * 获得异色
         */
        private _getDiffColor(color:number){
            let diffColor:number = 0;
            switch (color) {
                case 1:
                    diffColor = this._getRandom(0,2)*2;
                    break;
                case 2:
                    diffColor = this._getRandom(0,2)==1?1:3;
                    break;
                case 3:
                    diffColor = this._getRandom(0,2)*2;
                    break;
                case 4:
                    diffColor = this._getRandom(0,2)==1?1:3;
                    break
            
                default:
                    break;
            }
            return diffColor;
        }
}
