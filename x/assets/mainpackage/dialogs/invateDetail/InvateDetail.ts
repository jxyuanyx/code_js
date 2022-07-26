// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapterDynamic from "../../../gamecore/ui/components/common/ListAdapterDynamic";
import ListViewDynamic from "../../../gamecore/ui/components/common/ListViewDynamic";
import { formatCurrency } from "../../gameHelper/AthHelper";
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../services/RedTipService";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InvateDetail extends BaseDlg {
    
    showMode=DlgEnum.R2L;
    
    @property(ListViewDynamic)
    listView:ListViewDynamic;

    private _pageSize:number=0;

    private _list:any[];

    UIBindData={
        inviteReward:"0",
        DepositReward:"0",
        GameReward:"0"
    };


    beforeShow(){
    }

    afterHide(){

    }

    afterShow(){
        let adapter=new ListAdapterDynamic();
        this.listView.setAdapter(adapter);
        this._pageSize=50;//Math.ceil(this.listView.node.getChildByName("view").height/this.listView.getColumnWH())*2;
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(pageSize,pageNo);
        });
        adapter.setOnItemClickListener(async (adapter,index)=>{
            let data=adapter.getItem(index);
        },this)

        this._getPage(this._pageSize,0);
        this.onSortClick(null,"bind_time");
    }


    async _getPage(pageSize:number,pageNo:number){
        GameHelper.removeEmptyDataView(this.listView.node);
        let data=await App.HttpManager.postAsync("invite_api/invite_record",{page_no:pageNo,page_size:pageSize},true);

        /*
        let len=Math.floor(Math.random()*50);
        data.invite_list=[];
        for(let i=0;i<len;i++){
            data.invite_list.push({
                'nick': 'nick',             // 昵称
                'deposit': Math.floor(Math.random()*100000),                // 充值奖励
                'game_reward': Math.floor(Math.random()*100000),            // 游戏奖励
                'bind_time': cc.sys.now()-Math.floor(Math.random()*500000000),                                  // 绑定奖励
                'total': Math.floor(Math.random()*100000),                  // 总值
            })
        }*/


        if(!data.invite_list?.length){
            GameHelper.addEmptyDataView(this.listView.node);
        }
        this.listView.pager.addPageDatas(data.invite_list);

        this._list=data.invite_list;

        this.UIBindData.inviteReward=formatCurrency(data.invite_reward,true)
        this.UIBindData.DepositReward=formatCurrency(data.deposit,true)
        this.UIBindData.GameReward=formatCurrency(data.game_reward,true)
    }

    onSortClick(event,profile){
        if(!this._list)return;
        this._list.sort((a,b)=>b[profile]-a[profile]);
        this.listView.getAdapter().setDataSet(this._list);
        this.listView.notifyUpdate();
    }
}
