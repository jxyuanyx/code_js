// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from '../../../gamecore/App';
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapterDynamic from "../../../gamecore/ui/components/common/ListAdapterDynamic";
import ListViewDynamic from "../../../gamecore/ui/components/common/ListViewDynamic";
import { formatCurrency, fromatChip } from "../../gameHelper/AthHelper";
import { RulesDlgData } from "../rules/RulesDlg";

const {ccclass, property} = cc._decorator;

export enum BalanceType{
    CASH,
    TICKET,
    PROGRESS
}


@ccclass
export class Balance extends BaseDlg {

    showMode=DlgEnum.R2L;
    
    UIBindData={
        cash1:"",
        cash2:"",
        tickets:"",
        totalcash:"",
        wincash:"",
        bonuscash:""
    }
    @property(cc.ToggleContainer)
    toggleContainer:cc.ToggleContainer = null;

    @property(ListViewDynamic)
    listView:ListViewDynamic;

    @property(cc.Node)
    node_cash:cc.Node = null;

    @property(cc.Node)
    node_tickets:cc.Node = null;

    @property(cc.Node)
    node_title:cc.Node = null;

    @property(cc.Node)
    scrollview:cc.Node = null;

    private _rankList:any[]=[];
    private _emptyContent;

    private _pageSize:number=20;

    private _xhr:XMLHttpRequest;

    afterShow(){
        this.toggleContainer.toggleItems[this._data || 0].isChecked=true;
        this.onToggleClick(null,this._data || 0);
    }

    _setInfo(index:number = 0){
        this._rankList = [];
        let adapter=new ListAdapterDynamic(this._rankList);
        this.listView.setAdapter(adapter);
        this._pageSize=Math.ceil(this.listView.node.getChildByName("view").height/this.listView.getColumnWH())*2;
        this.listView.pager.init(this._pageSize);
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(this._pageSize,pageNo,index);
        });
        this.listView.pager.reset();
        this._getPage(this._pageSize,0,index);
    }

    async _getPage(pageSize:number,pageNo:number,index:number){
        let head = "";
        let type;
        switch (index) {
            case 0:
                head = "wallet_api/get_balance_record";
                type=2;
                break;
            case 1:
                head = "wallet_api/get_balance_record";
                type=1;
                break;
            case 2:
                head = "wallet_api/get_pay_record";
                break;
            default:
                break;
        }
        if (this._xhr) {
            App.HttpManager.cancel(this._xhr);
        }
        this._xhr = App.HttpManager.post(head,{page_no:pageNo,page_size:this._pageSize,prop_type:type},this.node,(data)=>{
            if (pageNo == 0 &&data.record_list&&data.record_list.length==0) {
                GameHelper.addEmptyDataView(this.scrollview.getChildByName("view"));
            }
            this._updateTopInfo(data,index);
            if(data?.record_list?.length){
                this.listView.pager.addPageDatas(data.record_list)
            }
        })
        
    }

    _updateTopInfo(data,index){
        if (index == 0) {
            this.node_cash.active = true;
            this.scrollview.getComponent(cc.Widget).top=145;
            this.node_tickets.active = false;
            this.node_title.active = true;
            let cash = formatCurrency(data.gold_withdraw);
            let bindcash = formatCurrency(data.bonus)
            let all =  formatCurrency(data.gold);
            this.UIBindData.totalcash = App.LangManager.getTxtByKey("currency")+all;
            this.UIBindData.wincash = App.LangManager.getTxtByKey("currency")+cash;
            this.UIBindData.bonuscash = App.LangManager.getTxtByKey("currency")+bindcash;
            // this.UIBindData.cash2 = "=" + cash+"Cash+"+bindcash+"Bonus";
            // this.node_cash.getChildByName("layout").getComponent(cc.Layout).updateLayout();
            // this._setScrollviewSize(cc.size(690,(930  * 750 / winSize.width)));
        }
        else if(index == 1){
            this.scrollview.getComponent(cc.Widget).top=145;
            this.node_cash.active = false;
            this.node_tickets.active = true;
            this.node_title.active = true;
            this.UIBindData.tickets = formatCurrency(data.ticket);
            // this._setScrollviewSize(cc.size(690,(930 / 1344 * winSize.height)));
        }
        else if (index == 2){

            this.scrollview.getComponent(cc.Widget).top=10;
            this.node_title.active = false;
            this.node_cash.active = false;
            this.node_tickets.active = false;
            // this._setScrollviewSize(cc.size(690,1020 / 1344 * winSize.height));
        }
    }

    onToggleClick(render,data){
        this.node_title.active = false;
        GameHelper.removeEmptyDataView(this.scrollview.getChildByName("view"));
        let winSize = cc.winSize;
        // let height = 1334 / 930 * winSize.height;
        this._setInfo(Number(data));
    }

    private _setScrollviewSize(size:cc.Size){
        this.scrollview.setContentSize(size);
        this.scrollview.getChildByName("view").setContentSize(size);
        this.scrollview.getChildByName("view").getChildByName("content").setContentSize(size);
    }

    onQueryClick(){
        let data:RulesDlgData = new RulesDlgData();
        data.group = [{txt:App.LangManager.getTxtByKey("wincash"),isTitle:true},
        {txt:App.LangManager.getTxtByKey("tips").cash,isTitle:false},
        {txt:App.LangManager.getTxtByKey("prizeName")[3],isTitle:true},
        {txt:App.LangManager.getTxtByKey("tips").bonuscash,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }
}
