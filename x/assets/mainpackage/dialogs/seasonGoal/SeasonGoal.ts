import BaseDlg from '../../../gamecore/ui/baseview/imp/BaseDlg';
import { DlgEnum } from '../../../gamecore/enums/DlgEnum';
import App from '../../../gamecore/App';
import { DataConfig } from '../../GameConfig';
import ListView from '../../../gamecore/ui/components/common/ListView';
import ListAdapter from '../../../gamecore/ui/components/common/ListAdapter';
import { RedTipService, REDTIP_MODULE } from '../../services/RedTipService';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
export const SEASONGOAL="seasongoal";
@ccclass
export default class SeasonGoal extends BaseDlg {
    showMode=DlgEnum.R2L;

    @property(ListView)
    listView:ListView<any>=null;

    @property(cc.Node)
    content:cc.Node=null;

    private _adapter:ListAdapter=null;

    private _taskList:any[];

    afterShow(){
        cc.game.on(SEASONGOAL,this._rewardSuccess,this);
        this._onFlushList();
    }

    private async _onFlushList(){
        let data=await App.HttpManager.postAsync("season_api/get_season_rank_reward");
        this._taskList=data.task_list;
        let rewardCount=0;
        this._taskList.map(item=>{
            item.selfPoint=data.rank_point
            if(item.status==0){
                rewardCount++;
            }
        })
        this._setListData();

        RedTipService.getInstance().setRedTipNum(REDTIP_MODULE.SEASON_REWARD,rewardCount);
    }

    _setListData(){
        this._taskList.sort((a,b)=>{
            if(a.status==b.status){
                return a.rank-b.rank
            }else{
                return a.status-b.status
            }
        })
        this._adapter=new ListAdapter(this._taskList);
        this.listView.setAdapter(this._adapter);
    }

    _rewardSuccess(){
        this._setListData();
    }

    afterHide(){
        cc.game.off(SEASONGOAL,this._rewardSuccess,this);
    }
}
