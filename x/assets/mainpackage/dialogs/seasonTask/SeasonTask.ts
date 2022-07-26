import BaseDlg from '../../../gamecore/ui/baseview/imp/BaseDlg';
import ListView from '../../../gamecore/ui/components/common/ListView';
import { DlgEnum } from '../../../gamecore/enums/DlgEnum';
import ListAdapter from '../../../gamecore/ui/components/common/ListAdapter';
import App from '../../../gamecore/App';
import { RedTipService, REDTIP_MODULE } from '../../services/RedTipService';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
export const SEASONPAGE="seasonpage";
@ccclass
export default class SeasonTask extends BaseDlg {   
    showMode=DlgEnum.R2L;

    @property(ListView)
    listView:ListView<any>=null;

    @property(cc.Node)
    content:cc.Node=null;

    private _adapter:ListAdapter=null;

    private _list:any[];

    afterShow(){
        this._onFlushList();
        this._addEvent();
    }

    beforeHide(){
        this._removeEvent();
    }

    private _removeEvent(){
        cc.game.off(SEASONPAGE,this._flushInfo,this);
    }

    private _addEvent(){
        cc.game.on(SEASONPAGE,this._flushInfo,this);
    }

    private async _onFlushList(){
        let data=await App.HttpManager.postAsync("season_api/season_task_list");
        if(data?.task_list){
            this._list=data.task_list;
            let rewardCount=0;
            this._list.map(item=>{
                if(item.status==0){
                    rewardCount++;
                }
            })
            RedTipService.getInstance().setRedTipNum(REDTIP_MODULE.SEASON_TASK,rewardCount);

            this._adapter=new ListAdapter(data.task_list);
            this.listView.setAdapter(this._adapter);
        }
    }

    private _flushInfo(){
        this._list.sort((a,b)=>a.status-b.status);
        this._adapter.setDataSet(this._list);
        this.listView.setAdapter(this._adapter);
    }

}
