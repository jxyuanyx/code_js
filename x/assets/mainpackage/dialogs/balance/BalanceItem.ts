// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { Games } from "../../GameConfig";
import { formatCurrency, formatDate, formatDateToEN, fromatTime } from "../../gameHelper/AthHelper";
import { CommonProto } from "../../net/CommonProto";

const {ccclass, property} = cc._decorator;

const COLOR = {
    RED : "#FF3C00",
    YELLOW : "FFAE00",
    GREEN : "#54FF00"
}
const STATULB = "<color=#ffffff>(</c><color=%s>%s</color></c><color=#ffffff>)</color>"

//0 审核中 1 成功 2 失败 
const  STATU = [
    "processing",
    "success",
    "failed",
]
@ccclass
export default class BalanceItem extends ListItem {

    @property(cc.Node)
    richtext:cc.Node = null;

    UIBindData={
        name:"",
        id:"",
        time:"",
        gold:"",
        balance:"",
        icon:null,
    }

    setData(index:number,data?:any){

        if (data.value) {
            this.UIBindData.balance = "Balance:"+formatCurrency(data.value);
        }
        else{
            this.UIBindData.balance = "";
        }

        this.UIBindData.time =formatDateToEN(data.time * 1000);
        let gold=formatCurrency(Math.abs(data.amount));
        if (data.amount > 0) {
            gold="+"+gold;
            this.UI_LBS.get("gold").color =cc.Color.WHITE.fromHEX("#F5E47C");
        }
        else{
            gold="-"+gold;
            this.UI_LBS.get("gold").color = cc.Color.WHITE.fromHEX("#CDE5FF");
        }
        this.UIBindData.gold=gold;
        if (data.source == 2) {

            this.UIBindData.name = Games.filter(item=>item.room_type==data.room_type)[0].gameName;
            this.UIBindData.id = "Match ID:"+data.uuid;

            let iconPath = Games.filter(item=>item.room_type==data.room_type)[0].packageName;
            this.UIBindData.icon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(iconPath);
        }
        else{
            this.UIBindData.name = data.title; 
            this.UIBindData.id = data?.order_id || "";
            this.UIBindData.icon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("game99");
        }
        this._setStatu(data);
    }

    private _setStatu(data){
        let num:string = typeof(data.status);
        this.richtext.active = num == "number";
        if (data.status == 0) {
            this.richtext.getComponent(cc.RichText).string = cc.js.formatStr(STATULB,COLOR.YELLOW,STATU[0])
        }
        else if (data.status == 1){
            this.richtext.getComponent(cc.RichText).string = cc.js.formatStr(STATULB,COLOR.GREEN,STATU[1])
        }
        else if (data.status == 2){
            this.richtext.getComponent(cc.RichText).string = cc.js.formatStr(STATULB,COLOR.RED,STATU[2])
        }
    }
}
