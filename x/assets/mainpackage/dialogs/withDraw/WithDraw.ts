// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { HTTP_ERRORS } from "../../../gamecore/manager/imps/HttpManager";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { CONSTANTS, GameConfig, WITHDRAWDATA } from "../../GameConfig";
import { formatCurrency, fromatNumber1 } from "../../gameHelper/AthHelper";
import { EVENTS, PAGES } from "../../hall/scripts/hall";
import { ComDlgData } from "../comdlg/ComDlg";

export const SHOWWITHDRAW = "showwithdraw";

const {ccclass, property} = cc._decorator;

const enum CARDINFO{
    UPI="UPI",
    IMPS="IMPS",
    NEFT="NEFT"
}

const INDEXS=[CARDINFO.UPI,CARDINFO.IMPS,CARDINFO.NEFT];

@ccclass
export class WithDraw extends BaseDlg {
    showMode=DlgEnum.R2L;

    @property(cc.ToggleContainer)
    tab:cc.ToggleContainer;

    UIBindData={
       name:"",
       phoneno:"",
       mailaddress:"",
       ifsccode:"",
       cardno:"",
       upiid:"",
       amount:"",
       ablenum:"",
       ablelimitnum:"",
       costnum:"",
       totalnum:"",
       rule:""
    }

    private _cardInfoIndex:CARDINFO;

    private _amount:number=0;

    private _sdata:any;


    changeWithDrawInfo(event,index:CARDINFO){
        this.UI_LBS.get("ifsccode").active=(index!=CARDINFO.UPI);
        this.UI_LBS.get("cardno").active=(index!=CARDINFO.UPI);
        this.UI_LBS.get("upiid").active=(index==CARDINFO.UPI);
        this._cardInfoIndex=index;

        this.UIBindData.name=this._sdata.name || "";
        this.UIBindData.mailaddress=this._sdata.email || "";
        this.UIBindData.phoneno=this._sdata.phone || "";
        if(index==CARDINFO.UPI){
            this.UIBindData.upiid=(index==this._sdata.mode)?this._sdata.card_no:"";
        }else{
            this.UIBindData.cardno=(index==this._sdata.mode)?this._sdata.card_no:"";
            this.UIBindData.ifsccode=this._sdata.bank_code || "";
        }
    }

    beforeShow(){

    }

    async afterShow(){
        let data=await App.HttpManager.postAsync("pay_api/jai/get_withdraw_info");
        this._sdata=data;
        this.UIBindData.ablenum="₹ "+fromatNumber1(data.gold_withdraw/GameConfig.EXCHANGE_RATE || 0);
        this.UIBindData.ablelimitnum=`₹ ${fromatNumber1(data.min_amount/GameConfig.EXCHANGE_RATE || 0)} - ${fromatNumber1(data.max_amount/GameConfig.EXCHANGE_RATE || 0)}`;
        this.UIBindData.rule=data.prompt;
        this.changeWithDrawInfo(null,data.mode);
        this.tab.toggleItems[INDEXS.indexOf(data.mode)].isChecked=true;

        this.UI_LBS.get("amount").getComponent(cc.EditBox).placeholder = App.LangManager.getTxtByKey("inputsum")+App.LangManager.getTxtByKey("limitdrawable",[formatCurrency(data.min_amount || 0,true)])
    }

    onAmountChange(text,editBox:cc.EditBox){
        return
        let amount=parseInt(text)*GameConfig.EXCHANGE_RATE;
        if(amount>this._sdata.max_amount){
            this._amount=this._sdata.max_amount;
            this._flushAmountUI();
            App.DlgManager.showDlg("toast",{title:"Tips",content:`Each withdrawal max amount is:${fromatNumber1(this._sdata.max_amount/GameConfig.EXCHANGE_RATE )}`});
            return;
        }
        /*
        if(text.length>0&&amount<this._sdata.min_amount&&parseInt(this.UIBindData.amount)>amount){
            this._amount=this._sdata.max_amount;
            App.DlgManager.showDlg("toast",{title:"Tips",content:`Each withdrawal min amount is:${(this._sdata.min_amount )}`});
            return false;
        }*/
        if(amount>this._sdata.gold_withdraw){
            this._amount=this._sdata.gold_withdraw;
            this._flushAmountUI();
            App.DlgManager.showDlg("toast",{title:"Tips",content:`The current withdrawal amount is:${fromatNumber1(this._sdata.gold_withdraw/GameConfig.EXCHANGE_RATE)}`});
            return;
        }
    }

    _flushAmountUI(){
        this.UIBindData.amount=((this._amount==0)?"":(this._amount/GameConfig.EXCHANGE_RATE).toString());
    }

    onAmountChangeBegin(){
        this._flushAmountUI();
    }

    onAmountChangeEnd(){
        this._amount= parseInt(this.UIBindData.amount || "0")*GameConfig.EXCHANGE_RATE;

        this.UIBindData.costnum=this.UIBindData.totalnum="";

        if(this._amount>this._sdata.max_amount){
            this._amount=this._sdata.max_amount;
            App.DlgManager.showDlg("toast",{title:"Tips",content:`Each withdrawal max amount is:${fromatNumber1(this._sdata.max_amount/GameConfig.EXCHANGE_RATE )}`});
            this.UIBindData.amount=(!this._amount)?"":fromatNumber1(this._amount/GameConfig.EXCHANGE_RATE);
            // return
        }
        else if(this._amount>0&&this._amount<this._sdata.min_amount){
            this._amount=this._sdata.min_amount;
            App.DlgManager.showDlg("toast",{title:"Tips",content:`Each withdrawal min amount is:${fromatNumber1(this._sdata.min_amount/GameConfig.EXCHANGE_RATE )}`});
            this.UIBindData.amount=(!this._amount)?"":fromatNumber1(this._amount/GameConfig.EXCHANGE_RATE);
            // return
        }

        if(this._amount>this._sdata.gold_withdraw){
            this._amount=this._sdata.gold_withdraw;
            this._amount = Math.floor(this._sdata.gold_withdraw/this._sdata.amount_unit)*this._sdata.amount_unit;
            App.DlgManager.showDlg("toast",{title:"Tips",content:`The current withdrawal amount is:${fromatNumber1(this._sdata.gold_withdraw/GameConfig.EXCHANGE_RATE)}`});
            this.UIBindData.amount=(!this._amount)?"":fromatNumber1(this._amount/GameConfig.EXCHANGE_RATE);
            // return
        }

        this._amount = Math.floor(this._amount/GameConfig.EXCHANGE_RATE/this._sdata.amount_unit)*this._sdata.amount_unit*GameConfig.EXCHANGE_RATE;
        this.UIBindData.amount=(!this._amount)?"":fromatNumber1((this._amount/GameConfig.EXCHANGE_RATE));
        let costCount=Math.max(this._sdata.fee_base+this._sdata.fee_rate*0.01*this._amount,this._sdata.fee_min);
        costCount=Math.min(costCount,this._sdata.fee_max);
        if(this._amount>0){
            this.UIBindData.costnum="₹ "+fromatNumber1(costCount/GameConfig.EXCHANGE_RATE);
            this.UIBindData.totalnum="₹ "+fromatNumber1((this._amount-costCount)/GameConfig.EXCHANGE_RATE);
        }else{
            this.UIBindData.costnum=this.UIBindData.totalnum="";
        }
    }

    async onWithdrawClick(){
        if(!this.UIBindData.name.trim()){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Name can't be empty"});
            return;
        }

        if(!this.UIBindData.phoneno.trim()){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Phone No can't be empty"});
            return;
        }

        if(!this.UIBindData.mailaddress.trim()){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Mail Address can't be empty"});
            return;
        }else{
            //判定邮箱
            if(!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.UIBindData.mailaddress)){
                App.DlgManager.showDlg("toast",{title:"Tips",content:"Mail Address format error "});
                return;
            }
        }

        if(this._cardInfoIndex==CARDINFO.UPI){
            if(!this.UIBindData.upiid.trim()){
                App.DlgManager.showDlg("toast",{title:"Tips",content:"UPI ID can't be empty"});
                return;
            }
        }else{
            if(!this.UIBindData.ifsccode.trim()){
                App.DlgManager.showDlg("toast",{title:"Tips",content:"IFSC Code can't be empty"});
                return;
            }
            if(!this.UIBindData.cardno.trim()){
                App.DlgManager.showDlg("toast",{title:"Tips",content:"Card No can't be empty"});
                return;
            }
        }

        if(this._amount<this._sdata.min_amount){
            App.DlgManager.showDlg("toast",{title:"Tips",content:`Each withdrawal min amount is:${fromatNumber1(this._sdata.min_amount/GameConfig.EXCHANGE_RATE )}`});
            return
        }

        let reqData:any={};
        reqData.amount=this._amount;
        reqData.name=this.UIBindData.name;
        reqData.phone=this.UIBindData.phoneno;
        reqData.mode=this._cardInfoIndex;
        reqData.email=this.UIBindData.mailaddress;
        reqData.adid=App.NativeManager.getAdjustID();
        reqData.gps_adid=App.NativeManager.getGpsAdjustUID();
        if(this._cardInfoIndex==CARDINFO.UPI){
            reqData.card_no=this.UIBindData.upiid;
        }else{
            reqData.bank_code=this.UIBindData.ifsccode;
            reqData.card_no=this.UIBindData.cardno;
        }
        await App.HttpManager.postAsync("pay_api/user_withdraw",reqData)
        .then(
        (data)=>{
            this.hide();
            App.DlgManager.showDlg("toast",{title:"Tips",content:data});
            cc.sys.localStorage.setItem(WITHDRAWDATA.SHOWWITHDRAW,1);    
            cc.game.emit(SHOWWITHDRAW);
        },
        (data)=>{
            if (data == HTTP_ERRORS.NEEDDEPOSIT) {
                cc.game.emit(SHOWWITHDRAW)

                let dlgData:ComDlgData = new ComDlgData();
                dlgData.title = App.LangManager.getTxtByKey("withdraw");
                dlgData.isRich = true;
                dlgData.group = [{name:App.LangManager.getTxtByKey("depoositCash"),isExit:true,cb:()=>{
                    App.DlgManager.clearAllDlgs();
                    App.DataManager.setExtInfo(CONSTANTS.SHOW_PAYACT,false);
                    cc.game.emit(EVENTS.CHANGEPAGE, PAGES.DEPOSIT);
                }}];
                dlgData.txt =App.LangManager.getTxtByKey("NeedRecharge",[App.LangManager.getTxtByKey("currency"),formatCurrency(10000)||100]);
                App.DlgManager.showDlg("depandwithdlg",dlgData,"mainpackage");
            }
        })
    }
}
