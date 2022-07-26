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
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../services/RedTipService";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InvateList extends BaseDlg {
    
    showMode=DlgEnum.R2L;
    
    @property(ListViewDynamic)
    listView:ListViewDynamic;

    private _List:any[]=[];

    private _curIndex:number = 0;

    private _pageSize:number=0;

    beforeShow(){
    }

    afterHide(){
    }

    afterShow(){
        let adapter=new ListAdapterDynamic(this._List);
        this.listView.setAdapter(adapter);
        this._pageSize=50;//Math.ceil(this.listView.node.getChildByName("view").height/this.listView.getColumnWH())*2;
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(pageSize,pageNo);
        });
        adapter.setOnItemClickListener(async (adapter,index)=>{
            let data=adapter.getItem(index);
        },this)

        this._getPage(this._pageSize,0);
    }

    _setInfo(index:number = 0){
        this._List = [];
        this._getPage(this._pageSize,0);
    }

    async _getPage(pageSize:number,pageNo:number){
        GameHelper.removeEmptyDataView(this.listView.node);
        let data=await App.HttpManager.postAsync("invite_api/invite_income_details",{page_no:pageNo,page_size:pageSize},true);
        /*
        let len=Math.floor(Math.random()*50);
        data.record_list=[];
        for(let i=0;i<len;i++){
            data.record_list.push({
                'amount': 100,              // 金额
                'source': 16,               // 流水 source 16 邀请奖励, 17 充值奖励, 18 游戏奖励
                'prop_type': 2,             // 财产类型 默认现金
                'time': 1234567,            // 时间
                'reward_type': 0,           // 奖励类型 0邀请奖励 1 充值奖励 2 游戏奖励
                'fee': 600,                 // 用户消耗
                'from': "asdf",             // 来源用户 
                'content': "You Friends completed the deposit",     // 展示文案内容
            })
        }*/

        if(!data.record_list?.length){
            GameHelper.addEmptyDataView(this.listView.node);
        }
        this.listView.pager.addPageDatas(data.record_list);
    }
}
