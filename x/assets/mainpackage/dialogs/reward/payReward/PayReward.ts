// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { GoodsEnum } from "../../../../gamecore/enums/GoodsEnum";
import { ActivityEntry, RewardEnum } from "../../../../gamecore/enums/RewardEnum";
import { GameEvents } from "../../../../gamecore/events/GameEvents";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../../gamecore/ui/baseview/imp/BaseDlg";
import FromatTimer from "../../../../gamecore/ui/components/common/FromatTimer";
import { formatCurrency, formatDateWithOutTime, fromatChip, fromatTime, fromatTimeNew } from "../../../gameHelper/AthHelper";
import { EVENTS, PAGES } from "../../../hall/scripts/hall";
import { ComDlgData } from "../../comdlg/ComDlg";
import { RulesDlgData } from "../../rules/RulesDlg";


const {ccclass, property} = cc._decorator;

export enum RewardState{
    UNCAN=1,
    CAN=2,
    ALREADY=0
}

@ccclass
export default class PayReward extends BaseDlg {

    @property(FromatTimer)
    timer:FromatTimer;

    @property(cc.Node)
    layout_reward:cc.Node = null;

    @property(cc.Prefab)
    node_reward:cc.Prefab = null

    @property([cc.Node])
    nd_status:cc.Node[]=[];

    UIBindData={
        activitytime:"",
        go:null,
        prize:"TAKE PRIZE",
        process:"",
        golb:""
    }

    private _sdata:any = [];

    async beforeShow(){
        let data=await App.HttpManager.postAsync("activity_api/check_recharge_activity",{activity_id:1002})

        //设置时间
        this.timer.run(data.time_left,GameHelper.fromatTimeNew2,this)
        //设置进度
        //this.UIBindData.process= formatCurrency(data.already_recharge)+" / "+formatCurrency(data.total_need_recharge);
        //设置按钮金额
        this.UIBindData.golb="ONLY "+formatCurrency(data.total_need_recharge,true);

        //设置按钮状态
        this.nd_status[data.finish_status].active=true;

        this._onShowReward(data.reward);

        this._sdata=data;
       
    }

    _fromatTime(time:number){
        let str="ENDS IN:";
        if(time>86400){
            str+=Math.floor(time/86400)+"d"
        }
        str+=" "+fromatTimeNew(time%86000)
        if(time==0)this.hide();
        return str;
    }

    private _getBtnStatu(now:number,total:number,isDraw:boolean = false){
        let statu:number = RewardState.CAN
        if (now >= total) {
            statu = RewardState.CAN;
        }
        else{
            statu = RewardState.UNCAN;
        }
        if (statu == RewardState.CAN) {
            statu = isDraw?RewardState.ALREADY:RewardState.CAN;
        }
        return statu;
    }

    private _onShowReward(data:any){
        
        for (let index = 0; index < data.length; index++) {
            let node = cc.instantiate(this.node_reward);
            this.layout_reward.addChild(node);
            let diamondIcon=node.getChildByName("img_goods")
            let num=node.getChildByName("label_num").getComponent(cc.Label);
            let tip=num.node.getChildByName("tip").getComponent(cc.Label);
            let type=data[index].rewrad_type;
            diamondIcon.active=(type == GoodsEnum.DIAMOND)
            if ( type== GoodsEnum.DIAMOND) {
                num.string = fromatChip(data[index].reward_value);
                tip.string="Gems";
            }
            else{
                num.string = formatCurrency(data[index].reward_value,true);
                tip.string=(type==GoodsEnum.CASH)?"Cash":"Bonus cash";
            }
            
            node.getChildByName("label_add").active = index==data.length-1?false:true;
        }
    }

    onGoClick(){
        cc.game.emit(GameEvents.GETWAY,{product_id:this._sdata.product_id,pay_entry:ActivityEntry.RECHARGE});
        // App.DlgManager.showDlg("fillPlayerInfo",{product_id:this._sdata.product_id,pay_entry:ActivityEntry.RECHARGE});
    }

    async onGetClick(){
        let data=await App.HttpManager.postAsync("activity_api/receive_recharge_award",{"activity_id":1002})
        this.hide();
        App.DlgManager.showDlg("rewardGoods",{Data:this._sdata.reward});
    }
    
    onQueryClick(){
        let data:RulesDlgData = new RulesDlgData();
        data.group = [{txt:App.LangManager.getTxtByKey("tips").payreward1,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").payreward2,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").payreward3,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }
    
}
