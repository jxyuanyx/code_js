// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { DlgEnum } from "../../../../gamecore/enums/DlgEnum";
import { ActivityEntry, RewardEnum } from "../../../../gamecore/enums/RewardEnum";
import { GameEvents } from "../../../../gamecore/events/GameEvents";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatCurrency } from "../../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewRecharge extends BaseDlg {
    showMode=DlgEnum.SCALE;

    @property(sp.Skeleton)
    anim:sp.Skeleton;

    @property(sp.Skeleton)
    anim1:sp.Skeleton;

    UIBindData={
        time:"",
        leftnum:"",
        rightnum:"Cancel",
        cb1:"Ok",
        money:"",
        attention:"",
        total:""
    }

    private _info:any = null;
    
    afterShow() {
         App.HttpManager.postAsync("activity_api/display_new_player_recharge",{activity_id:RewardEnum.NEWRECHARGE}).then(data=>{
            this._info = data;
            this._showTime(data.end_time);
            this.UIBindData.leftnum = formatCurrency(data.immediate_recharge_value,true);
            this.UIBindData.rightnum = formatCurrency(data.extra_reward,true);
            this.UIBindData.total = formatCurrency(data.immediate_recharge_value+data.extra_reward,true);
    
            // this.UI_BTNS.get("buy").getChildByName("layout").getComponent(cc.Layout).updateLayout();
            this.UIBindData.money = formatCurrency(data.need_recharge,true);
            // this.UI_BTNS.get("buy").getChildByName("layout").getComponent(cc.Layout).updateLayout();
            this.UIBindData.attention = App.LangManager.getTxtByKey("attention",[formatCurrency(data.extra_reward,true),24])
    
    
            this.anim.setAnimation(0,"lihe",true);
    
            this.anim1.setAnimation(0,"MEGAWIN",true);
         })
    }

    private _showTime(end:number){
        let cur = new Date().getTime();
        let time = (end - Math.floor(cur/1000))
        let fun = ()=>{
            this.UIBindData.time = String(GameHelper.fromatTimeNew2(time));
            this.scheduleOnce(()=>{
                time --;
                if (time >= 0) {
                    fun();
                }
                else{
                    this.schedule(()=>{
                        // this._showActivity();
                        this.hide(); 
                    },1)
                }
            },1);
        }
        fun();
    }

    onBuyClick(){
        cc.game.emit(GameEvents.GETWAY,{product_id:this._info.product_id,pay_entry:ActivityEntry.NEWRECHARGE});
        // App.DlgManager.showDlg("fillPlayerInfo",{product_id:this._info.product_id,pay_entry:ActivityEntry.NEWRECHARGE});
    }
}
