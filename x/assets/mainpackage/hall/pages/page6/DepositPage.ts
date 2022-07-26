// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { NewRechargeStatus, RewardEnum } from "../../../../gamecore/enums/RewardEnum";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import RollNumGroup from "../../../../gamecore/ui/components/common/RollNumGroup";
import { CONSTANTS } from "../../../GameConfig";
import { fromatChip, fromatRate } from "../../../gameHelper/AthHelper";
import PageBase from "../../scripts/PageBase";
import { DepositPageItem } from "./DepositPageItem";

export const EVENT_DEPOSIT = "depositflush";
export const EVENT_DEPOSIT_SELECT="deposit_select";

const {ccclass, property} = cc._decorator;
@ccclass
export class DepositPage extends PageBase {

    UIBindData={
        awardpool:"",
        symbol:""
    }

    @property(RollNumGroup)
    rollNumGroup:RollNumGroup=null;
    
    @property(cc.Prefab)
    item_deposit:cc.Prefab = null;

    @property(cc.Prefab)
    item_reward:cc.Prefab = null;

    @property(cc.Node)
    content_reward:cc.Node = null;

    @property(cc.Node)
    layout_deposit:cc.Node = null;

    @property(cc.Node)
    listView:cc.Node=null;

    @property(cc.Node)
    bonusTitie:cc.Node;

    @property(cc.Node)
    bonusList:cc.Node;

    private _data:any;

    public onStartMove(): void {

    }

    public onMoveFinished(): void {
    }

    _addEvent(){
        cc.game.on(EVENT_DEPOSIT,this._flushPayItem,this);
        cc.game.on(EVENT_DEPOSIT_SELECT,this._onItemSelect,this);
    }

    _removeEvent(){
        cc.game.off(EVENT_DEPOSIT,this._flushPayItem,this);
        cc.game.off(EVENT_DEPOSIT_SELECT,this._onItemSelect,this);

    }

    _onItemSelect(index:number){
        App.DlgManager.showDlg("newDeposit",{list:this._data.product_list,currentIndex:index});
    }

    private async _flushPayItem(){
        let data=await App.HttpManager.postAsync("pay_api/product_list");
        this._data=data;
        let children=this.layout_deposit.children;
        for (let index = 0; index < data.product_list.length; index++) {
            let item =children[index] || cc.instantiate(this.item_deposit);
            if(!item.parent){
                item.opacity=0;
                cc.tween(item).delay(0.05*index).to(0.1,{opacity:255}).start();
                this.layout_deposit.addChild(item);
            }
            item.getComponent(DepositPageItem).flushDepositData(data.product_list[index],index);
        }

        this.rollNumGroup.setDataSequence(Math.max(Math.floor(fromatRate(data.players_won)),0),true,800);
    }

    onDisable(){
        this._removeEvent();
        this._isPlay=false;
    }

    onEnable(): void {
        this._addEvent();
        this.UIBindData.symbol = App.LangManager.getTxtByKey("currency");
       // this.layout_deposit.destroyAllChildren();
       // this.content_reward.destroyAllChildren();
       // GameHelper.removeEmptyDataView(this.content_reward.parent);
      //  this._flushPayItem();
       // GameHelper.addEmptyDataView(this.content_reward.parent);
       this._showActivities();
        this._playAnim();
        if(App.DataManager.getExtInfo(RewardEnum.NEWRECHARGE.toString())&&!App.isCheck){
            if(App.DataManager.getExtInfo(CONSTANTS.SHOW_PAYACT)!=false){
                this._getNewRecharge();
            }
        }
        App.DataManager.deleteExtInfo(CONSTANTS.SHOW_PAYACT);
    }

    async _getNewRecharge(){  
        let data=await App.HttpManager.postAsync("activity_api/check_new_player_recharge_status",{activity_id:RewardEnum.NEWRECHARGE});
        switch (data.finish_status) {
            case NewRechargeStatus.AVAILABLE:
                if (new Date().getTime()/1000 < data.end_time) {
                    this.scheduleOnce(()=>{
                        App.DlgManager.showDlg("reward/newRecharge");
                    },0.8);  
                }
                break;
            default:
                break;
        }
    }

    private _isPlay=false;

    _playAnim(){
        this._isPlay=true;
        this.bonusTitie.opacity=0;
        this.bonusList.opacity=0;
        this.listView.opacity=0;
        this.listView.y=300;
        cc.tween(this.listView).to(0.5,{y:0,opacity:255},cc.easeBackOut()).call(this._flushPayItem.bind(this)).start();
        cc.tween(this.bonusTitie).delay(0.2).to(0.5,{opacity:255}).start();
        cc.tween(this.bonusList).delay(0.4).to(0.5,{opacity:255}).start();
    }

    _showActivities(){
        App.HttpManager.postAsync("activity_api/get_activities").then(
            (data)=>{
                let activity = data.activities;
                for (let index = 0; index < activity.length; index++) {
                    switch (activity[index].activity_id) {
                        case RewardEnum.DRAWREWARD:
                            this.UI_BTNS.get("luck").active = true;
                            break;
                        case RewardEnum.LOGINREWARD:
                            this.UI_BTNS.get("dayReward").active = true;
                            break;
                        default:
                            break;
                    }
                }
            },
            (data)=>{

            }
        )
    }

    flushData(){

    }

    onDayRewardClick(){
        App.DlgManager.showDlg("reward/drawReward/loginReward",null);
    }

    onLuckClick(){
        App.DlgManager.showDlg("reward/drawReward/drawLayer",null);

    }
}
