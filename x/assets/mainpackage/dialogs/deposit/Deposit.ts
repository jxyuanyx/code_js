// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from '../../../gamecore/App';
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { PayEnum } from "../../../gamecore/enums/PayEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatCurrency } from "../../gameHelper/AthHelper";
import { EVENT_DEPOSIT } from "../../hall/pages/page6/DepositPage";
import { ComDlgData } from "../comdlg/ComDlg";
import { RulesDlgData } from "../rules/RulesDlg";
import PaymentItem from "./PaymentItem";

export enum PayWay{
    JAIPAY = 0,
    DOIPAY = 1
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Deposit extends BaseDlg {
    showMode=DlgEnum.R2L;
    UIBindData={
        bignum:"",
        smallnum:"",
        type:"Bonus Cash",
        amount:"",
        bonus:"",
        newbalance:"",
    }
    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Prefab)
    item_payment:cc.Prefab = null;

    @property([cc.EditBox])
    editboxList:cc.EditBox[] = [];

    afterShow(){
        this.UIBindData.bignum = App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.data.base_value);
        this.UIBindData.smallnum = "+"+App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.data.base_value);
        this.UIBindData.amount = App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.data.amount);
        this.UIBindData.bonus = App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.data.bonus_value);
        this.UIBindData.newbalance = App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.data.amount+App.DataManager.getSelfData().gold+App.DataManager.getSelfData().gold_deposit);
        this.flushInforMation();
    }
    
    beforeHide(){
        cc.game.emit(EVENT_DEPOSIT);
    }

    onQueryClick(){
        let data:RulesDlgData = new RulesDlgData();
        data.group = [{txt:App.LangManager.getTxtByKey("wincash"),isTitle:true},
        {txt:App.LangManager.getTxtByKey("tips").cash,isTitle:false},
        {txt:App.LangManager.getTxtByKey("prizeName")[3],isTitle:true},
        {txt:App.LangManager.getTxtByKey("tips").bonuscash,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }

    flushInforMation(){
        let data = cc.sys.localStorage.getItem('depositInfo');
        if (data) {
            data = JSON.parse(data);
        }
        this.editboxList[0].string = data&&data.name?data.name:"";
        this.editboxList[1].string = data&&data.phone?data.phone:"";
        this.editboxList[2].string = data&&data.address?data.address:"";
    }

    onSaveLocalInfo(name,phone,address){
        cc.sys.localStorage.setItem("depositInfo",JSON.stringify({name:name,phone:phone,address:address}));
    }

    onConfirmClick(){
        let name = this.editboxList[0].string||null;
        let phone = this.editboxList[1].string||null;
        let address = this.editboxList[2].string||null;
        if (!name||!phone||!address) {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("infornulltip")});
            return
        }
        //打点数据
        //App.NativeManager.logEvent("ldfn5p","");
        
        cc.game.emit(GameEvents.PAY,{product_id:this._data.data.product_id,errCB:(data:any)=>{
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("depositerr")});
        },source:PayEnum.PaySourceOrangePay,data:{name:name,phone:phone,email:address},successCB:()=>{
            this.onSaveLocalInfo(name,phone,address);
        }});
    }
}
