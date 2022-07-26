// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import game101_logic from "./ctrl/game101_logic";


const {ccclass, property} = cc._decorator;
const DECKNUM:number = 4;//四组
const DECKMAX:number = 13;//最大k
const SYSTEM:number = 16;//16进制

export function getRealNum(num:number) {
    let real = num%SYSTEM;
    return real;
}

@ccclass
export class game101_disrupt {
    private static _instance:game101_disrupt = null;
    private _seed:number = 4654;


    public static getInstance():game101_disrupt{
        if (!game101_disrupt._instance) {
            game101_disrupt._instance = new game101_disrupt();
        }
        return game101_disrupt._instance;
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
        return Math.ceil(min + this._rnd() * (max - min));
    }

    private arraySort(arr:any[]) {
        for(let i = 0; i < arr.length; i++){
            let currentRandom = this._getRandom(0,arr.length-1);
            let current = arr[i];
            arr[i] = arr[currentRandom];
            arr[currentRandom] = current;
        }
    }

    public getCards(level:number,seed?:number){
        this._setSeed(seed);
        let allcards = this._makeAllCards();//生成牌
        allcards = this._classifyArr(allcards);//牌堆分类
        this._saveToTest("game101arr_1",allcards)
        this.arraySort(allcards);//牌堆乱序
        this._saveToTest("game101arr_2",allcards)
        allcards = this._upsetArr(allcards,level);//组合合并
        this._saveToTest("game101arr_3",allcards)
        let endArr:number[] = this._mergeArr(allcards);
        this._saveToTest("game101arr_4",endArr)
        return endArr;
    }

    private _saveToTest(str:string,arr:any[]){
        let array:any[] = [];
        if (str == "game101arr_4") {
            array = arr;
        }
        else{
            for (let index = 0; index < arr.length; index++) {
                array.push(arr[index]+"\n")
            }
        }
        cc.sys.localStorage.setItem(str,JSON.stringify(array));
    }


    /**
     * 合并后的集合内再打乱
     */
    private _makeAllCards(){
        let allCards = [];
        for (let key = 1; key <= DECKNUM; key++) {
            for (let index = 1; index <= DECKMAX; index++) {
                if ((key == 4 || key == 2) && index == 11) {
                    allCards.unshift((SYSTEM*key)+index);
                }
                else{
                    allCards.push((SYSTEM*key)+index);
                }
            }
        }
        return allCards.concat();
    }

    /**
     * 值来删除元素
     */
    private _deleteValue(list:number[],keys:number[]){
        keys.sort(function (A, B) {
            return B - A;
        });
        for (let j = 0;  j < keys.length; j++) {
            list.splice(keys[j],1);
        }
        return list;
    }

    /**
     * 
     * @param cards 
     * @returns 
     */
    private _mergeArr(cards:number[][]){
        let allCards:number[] = [];
        let lenth = cards.length;
        for (let index = 0; index < lenth; index++) {
            let arr:number[] = cards.shift();
            allCards = allCards.concat(arr);
        }
        return allCards;
    }

    /**
    * 将牌组分类
    */
    private _classifyArr(cards:number[]){
        let allArr:number[][] = [];//牌组总和
        let wildQueue:number[] = [];//黑杰克堆
        let finishPoint:number[][] = [];//21点组合
        let otherQueue:number[] = [];//杂牌堆
        let otherArr:number[][] = [];//杂牌和黑杰克合并

        let obj = this._getWildsArr(cards);//黑杰克组合
        wildQueue = obj.wilds;
        this.arraySort(obj.cards);
        let arr = this._getOtherArr(obj.cards)
        finishPoint = arr.finish;
        otherQueue = arr.other;

        otherArr = this._mergeWildAndOther(wildQueue,otherQueue);
        allArr = finishPoint.concat(otherArr);
        
        return allArr;
    }

    /**
     * 打乱牌组
     */
    private _upsetArr(arrCards:number[][],level:number){
        let arr:number[][] = [];
        switch (level) {
            case 1:
                arr = this._upsetNormal(arrCards,1,1);
                break;
            case 2:
                arr = this._upsetNormal(arrCards,1,2);
                break;
            case 3:
                arr = this._upsetNormal(arrCards,1,2);
                break;
            case 4:
                arr = this._upsetNormal(arrCards,2,2);
                break;
            case 5:
                arr = this._upsetNormal(arrCards,2,3);
                break;
            case 6:
                arr = this._upsetNormal(arrCards,3,3);
                break;
            case 7:
                arr = this._upsetAbnormal(arrCards,3,3);
                break;
            case 8:
                arr = this._upsetNormal(arrCards,3,4);
                break;
            case 9:
                arr = this._upsetNormal(arrCards,4,4);
                break;
            case 10:
                arr = this._upsetAbnormal(arrCards,4,4);
                break;
            default:
                arr = this._upsetNormal(arrCards,1,1);
                break;
        }
        return arr;
    }

    /**
     * 特殊打乱
     */
    private _upsetAbnormal(arrCards:number[][],min,max){
        let newArr:number[][] = this._upsetNormal(arrCards,min,max);
        for (let index = 0; index < newArr.length; index++) {
            if (index != newArr.length-1) {
                newArr[index].push(newArr[index+1].pop());
                // let card = newArr[index+1][newArr[index+1].length-1];
                // newArr[index+1][newArr[index+1].length-1] = newArr[index][newArr[index].length-1];
                // newArr[index][newArr[index].length - 1] = card;
            }
            this.arraySort(newArr[index]);
        }
        return newArr;
    }

    /**
     * 正常打乱
     * @param arrCards 
     * @param min 
     * @param max 
     * @returns 
     */
    private _upsetNormal(arrCards:number[][],min,max){
        let isAlso:boolean = true;
        let newArr:number[][] = [];
        let random:number = 1;
        while (isAlso) {
            random = min == max?min : this._getRandom(min-1,max);
            let arr:number[]=[];
            for (let index = 0; index < random; index++) {
                if (arrCards&&arrCards.length > 0) {
                    let sArr:number[] = arrCards.shift();
                    arr = arr.concat(sArr);
                }
                else{
                    isAlso = false;
                    break;
                }
            }
            if (arr&&arr.length > 0) {
                this.arraySort(arr);
                newArr.push(arr);
            }
        }
        return newArr;
    }

    /**
     * 获取其他牌组
     * @returns 21组合 其他杂牌
     */
    private _getOtherArr(cards:number[]){
        let finishQueue:number[][] = [];
        let arrCards:number[] = cards;
        let also:boolean = true;
        while (also) {
            let obj = this._getFive(arrCards);
            if (obj.values) {
                finishQueue.push(obj.values);
                arrCards = obj.cards;
            }
            else{
                also = false;
                break;
            }
        }
        return {finish:finishQueue,other:arrCards};
    }

    /**
     * 获取黑杰克组合
     */
    private _getWildsArr(cards:number[]){
        let wilds:number[] = [];
        wilds.push(cards.shift());
        wilds.push(cards.shift());
        return {cards:cards,wilds:wilds}
    }
    
    private _getTwo(cards:number[]){
        let values:number[] = [];
        let lenth = cards.length
        for (let i = 0; i < lenth; i++) {
            if (getRealNum(cards[i]) != 1 && getRealNum(cards[i]) < 10) continue;
            for (let j = i + 1; j < lenth; j++) {
                if (getRealNum(cards[j]) != 1 && getRealNum(cards[j]) < 10) continue;
                if (game101_logic.is21([cards[i],cards[j]])) {
                    values.push(cards[i]);
                    values.push(cards[j]);
                    cards = this._deleteValue(cards,[i,j]);
                    return {values:values,cards:cards};
                }
            }
            values = [];
        }
        return {values:null,cards:cards};
    };

    private _getThree(cards:number[]){
        let lenth = cards.length;
        let values:number[] = [];
        for (let i = 0; i < lenth; i++) {
            for (let j = i + 1; j < lenth; j++) {
                if (game101_logic.is21([cards[i],cards[j]])) {
                    values = [cards[i],cards[j]]
                    cards = this._deleteValue(cards,[i,j]);
                    return {values:values,cards:cards};
                }
                for (let k = j + 1; k < lenth; k++) {
                    if (game101_logic.isBomb([cards[i],cards[j],cards[k]])) {
                        break;
                    }
                    if(game101_logic.is21([cards[i],cards[j],cards[k]])){
                        values = [cards[i],cards[j],cards[k]];
                        cards = this._deleteValue(cards,[i,j,k]);
                        return {values:values,cards:cards};
                    }
                }
            }
        }
        return {values:null,cards:cards};
    }

    private _getFour(cards:number[]){
        let lenth = cards.length;
        let values:number[] = [];
        for (let i = 0; i < lenth; i++) {
            for (let j = i + 1; j < lenth; j++) {
                if (game101_logic.is21([cards[i],cards[j]])) {
                    values = [cards[i],cards[j]];
                    cards = this._deleteValue(cards,[i,j]);
                    return {values:values,cards:cards};
                }
                for (let k = j + 1; k < lenth; k++) {
                    if (game101_logic.isBomb([cards[i],cards[j],cards[k]])) {
                        break;
                    }
                    if(game101_logic.is21([cards[i],cards[j],cards[k]])){
                        values = [cards[i],cards[j],cards[k]];
                        cards = this._deleteValue(cards,[i,j,k]);
                        return {values:values,cards:cards};
                    }
                    for (let l = k + 1; l < lenth; l++) {
                        if (game101_logic.isBomb([cards[i],cards[j],cards[k],cards[l]])) {
                            break;
                        }
                        if(game101_logic.is21([cards[i],cards[j],cards[k],cards[l]])) {
                            values = [cards[i],cards[j],cards[k],cards[l]];
                            cards = this._deleteValue(cards,[i,j,k,l]);
                            return {values:values,cards:cards};
                        }
                    }      
                }
            }
        }
        return {values:null,cards:cards};
    }

    //这里暂时没想到什么好的写法，，，，，轻点喷
    private _getFive(cards:number[]){   
        let lenth = cards.length;
        let values:number[] = [];
        for (let i = 0; i < lenth; i++) {
            for (let j = i + 1; j < lenth; j++) {
                if (game101_logic.is21([cards[i],cards[j]])) {
                    values = [cards[i],cards[j]];
                    cards = this._deleteValue(cards,[i,j]);
                    return {values:values,cards:cards};
                }
                for (let k = j + 1; k < lenth; k++) {
                    if (game101_logic.isBomb([cards[i],cards[j],cards[k]])) {
                        break;
                    }
                    if(game101_logic.is21([cards[i],cards[j],cards[k]])){
                        values = [cards[i],cards[j],cards[k]];
                        cards = this._deleteValue(cards,[i,j,k]);
                        return {values:values,cards:cards};
                    }
                    for (let l = k + 1; l < lenth; l++) {
                        if (game101_logic.isBomb([cards[i],cards[j],cards[k],cards[l]])) {
                            break;
                        }
                        if(game101_logic.is21([cards[i],cards[j],cards[k],cards[l]])) {
                            values = [cards[i],cards[j],cards[k],cards[l]];
                            cards = this._deleteValue(cards,[i,j,k,l]);
                            return {values:values,cards:cards};
                        }
                        for (let m = l + 1; m < lenth; m++) {
                            if (game101_logic.isBomb([cards[i],cards[j],cards[k],cards[l],cards[m]])) {
                                break;
                            }
                            if (game101_logic.is21([cards[i],cards[j],cards[k],cards[l],cards[m]])) {
                                values = [cards[i],cards[j],cards[k],cards[l],cards[m]];
                                cards = this._deleteValue(cards,[i,j,k,l,m]);
                                return {values:values,cards:cards};
                            }
                        }
                    }      
                }
            }
        }
        return {values:null,cards:cards};
    }

    /**
     * 黑杰克和杂牌合并
     * @param wildArr 
     * @param otherArr 
     * @returns 
     */
    private _mergeWildAndOther(wildArr:number[],otherArr:number[]){
        let arr:number[][] = [];
        let sArr:number[] = [];
        for (let index = 0; index < otherArr.length; index++) {
            if (game101_logic.isBomb(sArr.concat(otherArr[index]))) {
                let wild = wildArr.pop();
                if (wild) {
                    arr.push(sArr.concat(wild));
                    sArr = [];
                }
                sArr.push(otherArr[index]);
            }
            else{
                sArr.push(otherArr[index]);
            }
        }
        let andArr = sArr.concat(wildArr);
        if (andArr.length > 0) {
            arr.push(andArr);
        }
        return arr;
    }
}
