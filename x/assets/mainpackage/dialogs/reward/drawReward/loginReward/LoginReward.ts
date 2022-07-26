// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../../gamecore/App";
import { GoodsEnum } from "../../../../../gamecore/enums/GoodsEnum";
import { ActivityEntry, RewardEnum } from "../../../../../gamecore/enums/RewardEnum";
import { GameEvents } from "../../../../../gamecore/events/GameEvents";
import GameHelper from "../../../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../../../gamecore/ui/baseview/imp/BaseDlg";
import { GameConfig, Goods } from "../../../../GameConfig";
import { formatCurrency, formatDateWithDate, formatDateWithOutTime, fromatChip, saveGuidData } from "../../../../gameHelper/AthHelper";
import { ComDlgData } from "../../../comdlg/ComDlg";
import { RulesDlgData } from "../../../rules/RulesDlg";


const {ccclass, property} = cc._decorator;
export enum REWARDSTATU{
    COMPLETE=2, //可以领没领
    CLAIMED=0,  //领过了
    UNCOMPLETE=1,//还不可以领
    NEXT = 3,//下次可以领
    NEEDRECHAR = 4//需要充值过后才能领取
}
export const DAYTIME = 86400000;
export enum TXTSTATU{
    COMPLETE = 0, //请领取
    NEXT = 1,//明天领取
    RECHARGE = 2//请充值
}

@ccclass
export default class LoginReward extends BaseDlg {
    @property(cc.SpriteFrame)
    img_7day:cc.SpriteFrame = null;

    @property([cc.Node])
    loginList:cc.Node[] = [];

    @property(cc.Prefab)
    node_goods:cc.Prefab = null;

    @property(cc.Node)
    lb_already:cc.Node = null;

    UIBindData={
        txt:""
    }
    private _info:any = null;
    
    afterShow(){
        this._showActivity();
    }

    private async _showActivity(){
        let data=await App.HttpManager.postAsync("activity_api/check_login_activity",{activity_id:RewardEnum.LOGINREWARD});
        cc.log("showActivity>>>>>>>>>>>>>>>>",data);
        this._info = data;
        let diff = data.total_need_recharge - (data.already_recharge||0)
        this._onShowTip(TXTSTATU.COMPLETE);
        this._onShowAll(data.current_day,data.round_rewards,data.current_day-1,data.finish_status,diff,data.current_round_time);
        
    }

    private _onShowAll(curday,data:any,cur:number,statu,diff:number,roundtime:number){
        let curstatu:number = 0;
        for (let index = 0; index < data.length; index++) {
            if (index == cur&&statu == REWARDSTATU.COMPLETE) {
                curstatu = REWARDSTATU.COMPLETE
            }
            else if(index == cur&&statu == REWARDSTATU.UNCOMPLETE){
                let nexttime = roundtime*1000;
                let cur = new Date().getTime();
                if (nexttime < cur) {
                    curstatu = REWARDSTATU.NEEDRECHAR;
                }
                else{
                    curstatu = REWARDSTATU.NEXT;
                }
            }
            else if(index < curday){
                curstatu = REWARDSTATU.CLAIMED
            }
            else{
                curstatu = REWARDSTATU.UNCOMPLETE;
            }

            if (index==data.length - 1) {
                this._onShowEnd(index,data[index],curstatu,diff);
            }
            else{
                this._onShowSingle(index,data[index],curstatu);
            }
        }
    }

    private _onShowSingle(index:number,data:any,statu:number){
        
        let Node = this.loginList[index];
        Node.getChildByName("label_day").getComponent(cc.Label).string = "DAY "+(index+1);
        let sp = Node.getChildByName("img_goods").getComponent(cc.Sprite);
        if (App.isCheck) {
            data[0].reward_type = GoodsEnum.TICKET;
        }
        if (data[0].reward_type == GoodsEnum.CASH || data[0].reward_type == GoodsEnum.BONUSCASH) {
            if (data[0].reward_value <= 4*GameConfig.EXCHANGE_RATE) {
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_7");
            }
            else if(data[0].reward_value > 4*GameConfig.EXCHANGE_RATE && data[0].reward_value <= 5*GameConfig.EXCHANGE_RATE){
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_8");
            }
            else if(data[0].reward_value > 5*GameConfig.EXCHANGE_RATE && data[0].reward_value <= 6*GameConfig.EXCHANGE_RATE){
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_9");
            }
            else if(data[0].reward_value > 6*GameConfig.EXCHANGE_RATE && data[0].reward_value <= 7*GameConfig.EXCHANGE_RATE){
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_10");
            }
            else if(data[0].reward_value > 7*GameConfig.EXCHANGE_RATE && data[0].reward_value <= 8*GameConfig.EXCHANGE_RATE){
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_11");
            }
            else if(data[0].reward_value > 8*GameConfig.EXCHANGE_RATE){
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_12");
            }
            else{
                sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+data[0].reward_type);
            }
        }
        else{
            sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+data[0].reward_type);
        }
        let complete = Node.getChildByName("img_complete");
        let next = Node.getChildByName("img_next");
        let claimed = Node.getChildByName("img_claimed");
        let uncomplete = Node.getChildByName("img_uncomplete");
        complete.active = false;
        next.active = false;
        claimed.active = false;
        uncomplete.active = false;
        let st:string = "";
        if (data[0].reward_type == GoodsEnum.CASH || data[0].reward_type == GoodsEnum.BONUSCASH) {
            st = App.LangManager.getTxtByKey("currency")+formatCurrency(data[0].reward_value);
        }
        else if(data[0].reward_type == GoodsEnum.TICKET){
            st = formatCurrency(data[0].reward_value);
        }
        else{
            st = fromatChip(data[0].reward_value);
        }
         
        switch (statu) {
            case REWARDSTATU.COMPLETE:
                let label = complete.getChildByName("label_complete").getComponent(cc.Label);
                label.string = st;
                complete.active = true;
                complete.off(cc.Node.EventType.TOUCH_END);
                complete.on(cc.Node.EventType.TOUCH_END,async()=>{
                    await App.HttpManager.postAsync("activity_api/receive_login_award",{activity_id:RewardEnum.LOGINREWARD});
                    await App.DlgManager.showDlg("rewardGoods",{Data:data});
                    await this._showActivity();
                })
                break;
            case REWARDSTATU.CLAIMED:
                claimed.getChildByName("label_claimed").getComponent(cc.Label).string = st;
                claimed.active = true;
                break;
            case REWARDSTATU.UNCOMPLETE:
                uncomplete.getChildByName("label_uncomplete").getComponent(cc.Label).string = st;
                uncomplete.active = true;
                break;
            case REWARDSTATU.NEXT:
                this._onShowTip(TXTSTATU.NEXT);
                next.getChildByName("label_next").getComponent(cc.Label).string = st;
                let nextday = new Date(new Date().toLocaleDateString()).getTime() + DAYTIME;
                let cur = new Date().getTime();
                let timediff = Math.floor((nextday - cur)/1000);
                let fun = ()=>{
                    next.getChildByName("img_circle").getChildByName("label_time").getComponent(cc.Label).string = String(GameHelper.fromatTimeNew(timediff));
                    this.scheduleOnce(()=>{
                        timediff --;
                        if (timediff >= 0) {
                            fun();
                        }
                        else{
                            this.schedule(()=>{
                                this._showActivity();  
                            },1)
                        }
                    },1);
                }
                fun();
                next.active = true;
                break;
            default:
                break;
        }
    }

    private _onShowEnd(index,data:any,statu:number,diff:number){
        let Node = this.loginList[index];
        Node.getChildByName("label_day").getComponent(cc.Label).string = "DAY "+(index+1);
        let tap = Node.getChildByName("img_tap");
        let complete = Node.getChildByName("img_complete");
        let next = Node.getChildByName("img_next");
        let claimed = Node.getChildByName("img_claimed");
        let uncomplete = Node.getChildByName("img_uncomplete");
        complete.active = false;
        next.active = false;
        claimed.active = false;
        uncomplete.active = false;
        complete.getChildByName("label_day").getComponent(cc.Label).string = "DAY "+(index+1);
        let st:string = "";
        let sp = Node.getChildByName("img_goods").getComponent(cc.Sprite);
        if (App.isCheck) {
            sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+1);
            for (let index = 0; index < data.length; index++) {
                data.reward_type = GoodsEnum.TICKET;
                st += formatCurrency(data[index].reward_value) + "   ";
            }
        }
        else{
            sp.spriteFrame = this.img_7day;
            for (let index = 0; index < data.length; index++) {
                if (data[index].reward_type == GoodsEnum.CASH || data[index].reward_type == GoodsEnum.BONUSCASH ) {
                    st += App.LangManager.getTxtByKey("currency")+formatCurrency(data[index].reward_value) + "   ";
                }
                else if (data[index].reward_type == GoodsEnum.TICKET){
                    st += App.LangManager.getTxtByKey("currencyTIC")+formatCurrency(data[index].reward_value) + "   ";
                }
                else if(data[index].reward_type == GoodsEnum.DIAMOND){
                    st += App.LangManager.getTxtByKey("currencyGEM")+fromatChip(data[index].reward_value) + "   ";
                }
                else{
                    st += fromatChip(data[index].reward_value) + "   ";
                }
            }
        }
        switch (statu) {
            case REWARDSTATU.COMPLETE:
                let label = complete.getChildByName("label_complete").getComponent(cc.Label);
                label.string = st;
                complete.active = true;
                complete.off(cc.Node.EventType.TOUCH_END);
                complete.on(cc.Node.EventType.TOUCH_END,async ()=>{
                    await App.HttpManager.postAsync("activity_api/receive_login_award",{activity_id:RewardEnum.LOGINREWARD});
                    await App.DlgManager.showDlg("rewardGoods",{Data:data});
                    await this._showActivity();
                })
                break;
            case REWARDSTATU.CLAIMED:
                claimed.getChildByName("label_claimed").getComponent(cc.Label).string = st;
                claimed.active = true;
                break;
            case REWARDSTATU.UNCOMPLETE:
                uncomplete.getChildByName("label_uncomplete").getComponent(cc.Label).string = st;
                uncomplete.active = true;
                break;
            case REWARDSTATU.NEEDRECHAR:
                this._onShowTip(TXTSTATU.RECHARGE);
                let lb = complete.getChildByName("label_complete").getComponent(cc.Label);
                lb.string = st;
                complete.active = true;
                tap.getChildByName("label_tap").getComponent(cc.RichText).string = App.LangManager.getTxtByKey("loginrecharge",[formatCurrency(diff,true)]);;
                tap.active = true;
                tap.off(cc.Node.EventType.TOUCH_END);
                tap.on(cc.Node.EventType.TOUCH_END,async()=>{
                    cc.game.emit(GameEvents.GETWAY,{product_id:this._info.product_id,pay_entry:ActivityEntry.LOGIN});
                    // App.DlgManager.showDlg("fillPlayerInfo",{product_id:this._info.product_id,pay_entry:ActivityEntry.LOGIN});
                });
                complete.off(cc.Node.EventType.TOUCH_END);
                complete.on(cc.Node.EventType.TOUCH_END,async ()=>{
                    cc.game.emit(GameEvents.GETWAY,{product_id:this._info.product_id,pay_entry:ActivityEntry.LOGIN});
                    // App.DlgManager.showDlg("fillPlayerInfo",{product_id:this._info.product_id,pay_entry:ActivityEntry.LOGIN});
                })
                break;
            case REWARDSTATU.NEXT:
                this._onShowTip(TXTSTATU.NEXT);    
                next.getChildByName("label_next").getComponent(cc.Label).string = st;
                let nextday = new Date(new Date().toLocaleDateString()).getTime() + DAYTIME;
                let cur = new Date().getTime();
                let timediff = Math.floor((nextday - cur)/1000);
                if (diff > 0) {
                    tap.getChildByName("label_tap").getComponent(cc.RichText).string = App.LangManager.getTxtByKey("loginrecharge",[formatCurrency(diff,true)]);;
                    tap.active = true;
                    tap.off(cc.Node.EventType.TOUCH_END);
                    tap.on(cc.Node.EventType.TOUCH_END,async()=>{
                        cc.game.emit(GameEvents.GETWAY,{product_id:this._info.product_id,pay_entry:ActivityEntry.LOGIN});
                        // App.DlgManager.showDlg("fillPlayerInfo",{product_id:this._info.product_id,pay_entry:ActivityEntry.LOGIN});
                    });
                }
                next.active = true;
                if (timediff > 0){
                    let fun = ()=>{
                        next.getChildByName("img_circle").getChildByName("label_time").getComponent(cc.Label).string = String(GameHelper.fromatTimeNew(timediff));
                        this.scheduleOnce(()=>{
                            timediff --;
                            if (timediff >= 0) {
                                fun();
                            }
                            else{
                                this.schedule(()=>{
                                    this._showActivity();  
                                },1)
                            }
                        },1);
                    }
                    fun();
                } 
                break;
            default:
                break;
        }
    }

    private _onShowTip(statu:number){
        switch (statu) {
            case TXTSTATU.COMPLETE:
                this.UIBindData.txt = App.LangManager.getTxtByKey("unget");
                break;
            case TXTSTATU.NEXT:
                this.UIBindData.txt = App.LangManager.getTxtByKey("alget");
                break;
            case TXTSTATU.RECHARGE:
                this.UIBindData.txt = App.LangManager.getTxtByKey("recharge");
                break;
            default:
                break;
        }
    }
}