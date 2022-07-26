// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { formatCurrency } from "../../gameHelper/AthHelper";
import { EVENTS } from "../../hall/scripts/hall";

const {ccclass, property} = cc._decorator;
export const ACHIEVEEVENT="achievent";
@ccclass
export default class AchieveDlg extends BaseDlg {
    showMode=DlgEnum.R2L;

    @property(ListView)
    taskListView:ListView<any>=null;

    @property(cc.Node)
    achContent:cc.Node=null;

    private _adapter:ListAdapter=null;
    private _list:any[];
    
    afterShow(){
        this._initInfo();
        this.achContent.active=false;
        this.taskListView.node.active=true;
        this._addEvent();
    }

    beforeHide(){
        this._removeEvent();
    }

    private _removeEvent(){
        cc.game.off(ACHIEVEEVENT,this._onReward,this);

    }

    private _addEvent(){
        cc.game.on(ACHIEVEEVENT,this._onReward,this);
    }

    async _onReward(task:any){
        //查找有无可领奖的，如果不存在就刷新
        let rewardCount=0;
        this._list.forEach(item=>{
            (item.achievement_status==2)&&++rewardCount
        })

        if(rewardCount==0){
            this._initInfo();
        }

    }

    private async _initInfo(){
        let data=await App.HttpManager.postAsync("achievement_api/load_achievement");
        data.achievement.sort((a,b)=>b.achievement_status-a.achievement_status)
        this._list=data.achievement;
        this._adapter=new ListAdapter(data.achievement);
        this.taskListView.setAdapter(this._adapter);
        this.taskListView.getScrollView().scrollToTop();
    }


    onTab1Click(){
        this.achContent.active=false;
        this.taskListView.node.active=true;
        this.taskListView.node.opacity=0;
        this.taskListView.node.runAction(cc.fadeIn(0.2));
    }

    onTab2Click(){
        this.achContent.active=true;
        this.achContent.opacity=0;
        this.achContent.runAction(cc.fadeIn(0.2));
        this.taskListView.node.active=false;
    }
    
}
