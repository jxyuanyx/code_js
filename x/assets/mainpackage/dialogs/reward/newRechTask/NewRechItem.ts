// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { GoodsEnum } from "../../../../gamecore/enums/GoodsEnum";
import { RewardEnum } from "../../../../gamecore/enums/RewardEnum";
import ListItem from "../../../../gamecore/ui/components/common/ListItem";
import { formatCurrency } from "../../../gameHelper/AthHelper";
import { EVENTS, PAGES } from "../../../hall/scripts/hall";
import { NEWRECHARTSK } from "./NewRechTask";

const {ccclass, property} = cc._decorator;

export enum TaskStatus{
    ALREADY = 0,//已完成
    UNAVAILABLE = 1,//不可完成
    AVAILABLE = 2//可完成
}

export enum TaskStutusTxt{
    "Received",
    "Play",
    "Receive"
}

@ccclass
export default class NewRechItem extends ListItem {
    UIBindData={
        goodnum:"",
        goods:null,
        txt:"",
        progress:"",
        statu:null,
        status:""
    }

    @property(cc.Node)
    progress:cc.Node = null;

    @property([cc.SpriteFrame])
    status:cc.SpriteFrame[]=[];
    
    setData(index:number,data?:any){
        super.setData(index,data);
        this.UIBindData.goods.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+data.task_reward_type);
        this.progress.getComponent(cc.ProgressBar).progress = data.task_schedule/data.task_value;
        this.UI_BTNS.get("statu").getComponent(cc.Sprite).spriteFrame = this.status[data.finish_status];
        this.UIBindData.status = TaskStutusTxt[data.finish_status];

        if (data.task_coversion == 1) {
            this.UIBindData.progress = formatCurrency(data.task_schedule)+"/"+formatCurrency(data.task_value);
            this.UIBindData.txt = App.LangManager.getTxtByKey("tasktxt"+[data.task_type],[formatCurrency(data.task_value)]);
        }
        else{
            this.UIBindData.progress = data.task_schedule+"/"+data.task_value;
            this.UIBindData.txt = App.LangManager.getTxtByKey("tasktxt"+[data.task_type],[data.task_value]);
        }

        if (data.task_reward_type == GoodsEnum.CASH || data.task_reward_type == GoodsEnum.BONUSCASH) {
            this.UIBindData.goodnum = formatCurrency(data.task_reward_value,true);
        }
        else{
            this.UIBindData.goodnum = data.task_rewrad_value;
        }

        if (this._data.finish_status == TaskStatus.ALREADY) {
            this.UI_BTNS.get("statu").getComponent(cc.Button).interactable = false;
        }
        else{
            this.UI_BTNS.get("statu").getComponent(cc.Button).interactable = true;
        }
        
    }

    async onStatuClick(){
        if (this._data.finish_status == TaskStatus.AVAILABLE) {
            let data=await App.HttpManager.postAsync("activity_api/receive_new_player_task_reward",{activity_id:RewardEnum.NEWRECHTASK,task_id:this._data.task_id});
            App.DlgManager.showDlg("rewardGoods",{Data:[{reward_type:this._data.task_reward_type,reward_value:this._data.task_reward_value}]});
            cc.game.emit(NEWRECHARTSK);
        }
        else if(this._data.finish_status == TaskStatus.UNAVAILABLE){
            App.DlgManager.clearAllDlgs();
            cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
        }
    }

}