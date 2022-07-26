// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { RewardEnum } from "../../../../gamecore/enums/RewardEnum";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../../gamecore/ui/components/common/ListView";
import { formatCurrency } from "../../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;
export const NEWRECHARTSK="newrechargetask";
@ccclass
export default class NewRechTask extends BaseDlg {
    UIBindData={
        time:"",
        cash:"",
        bonuscash:""
    }
    @property(ListView)
    taskListView:ListView<any>=null;

    @property(cc.Node)
    achContent:cc.Node=null;

    private _adapter:ListAdapter=null;
    private _list:any[];
    afterShow(){
        this._initInfo();
        // this.achContent.active=false;
        // this.taskListView.node.active=true;
        this._addEvent();
    }

    beforeHide(){
        this._removeEvent();
    }

    private _removeEvent(){
        cc.game.off(NEWRECHARTSK,this._initInfo,this);
    }

    private _addEvent(){
        cc.game.on(NEWRECHARTSK,this._initInfo,this);
    }

    // async _onReward(task:any){
    //     //查找有无可领奖的，如果不存在就刷新
    //     let rewardCount=0;
    //     this._list.forEach(item=>{
    //         (item.achievement_status==2)&&++rewardCount
    //     })
    //     if(rewardCount==0){
    //         this._initInfo();
    //     }
    // }

    private async _initInfo(){
        let data=await App.HttpManager.postAsync("activity_api/display_new_player_task",{activity_id:RewardEnum.NEWRECHTASK});
        this._showTaskItems(data.tasks);
        this._showTime(data.end_time);
        this.UIBindData.cash = formatCurrency(data.recharged_value,true);
        this.UIBindData.bonuscash = formatCurrency(data.received_reward_value,true);
    }

    private _showTaskItems(tasks){
        this._list=tasks;
        this._adapter=new ListAdapter(tasks);
        this.taskListView.setAdapter(this._adapter);
        this.taskListView.getScrollView().scrollToTop();
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
                        this.hide(); 
                    },1)
                }
            },1);
        }
        fun();
    }
}
