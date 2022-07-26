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

const {ccclass, property} = cc._decorator;
export const ACCOUNTTYPE = ["UPI","IMPS","NEFT"];

export const SAVEACCOUNT_UPINFO="UPIInfo";
export const SAVEACCOUNT_OTHERINFO="OtherInfo";


@ccclass
export default class CashAccount extends BaseDlg {
    @property([cc.Node])
    txtList:cc.Node[] = [];

    @property([cc.EditBox])
    editbox:cc.EditBox[]=[];

    @property([cc.Toggle])
    toggleList:cc.Toggle[] = [];

    showMode=DlgEnum.R2L;
    private _accounttype:number = 0;
    
    afterShow(){
        let type = cc.sys.localStorage.getItem("accounttype") || 0;
        this.onToggleClick(null,type);
        // this.flushData(type);
    }
    
    private _onShowType(type:number = 0){
        this.editbox[5].node.active = type==0;
        this.editbox[3].node.active = type!=0;
        this.editbox[4].node.active = type!=0;

        this.txtList[5].active = type==0;
        this.txtList[3].active = type!=0;
        this.txtList[4].active = type!=0;

    }

    private _onFlushData(type:number){
        if (type == 0) {
            this._onFlushUPI();
        }
        else{
            this._onFlushOther();
        }
    }

    private _onFlushUPI(){
        let upi = cc.sys.localStorage.getItem("UPIInfo");
        if (upi) {
            upi = JSON.parse(upi);
        }
        this.editbox[0].string = upi&&upi.name?upi.name:"";
        this.editbox[1].string = upi&&upi.phone?upi.phone:"";
        this.editbox[2].string = upi&&upi.mail?upi.mail:"";
        this.editbox[5].string = upi&&upi.upi?upi.upi:"";
    }

    private _onFlushOther(){
        let other = cc.sys.localStorage.getItem("OtherInfo");
        if (other) {
            other = JSON.parse(other);
        }
        this.editbox[0].string = other&&other.name?other.name:"";
        this.editbox[1].string = other&&other.phone?other.phone:"";
        this.editbox[2].string = other&&other.mail?other.mail:"";
        this.editbox[3].string = other&&other.ifsc?other.ifsc:"";
        this.editbox[4].string = other&&other.card?other.card:"";
    }
    // flushData(type:number){
    //     let info = cc.sys.localStorage.getItem("depositInfo");
    //     if (info) {
    //         info = JSON.parse(info);
    //     }
    //     let data = cc.sys.localStorage.getItem('withdrawInfo');
    //     if (data) {
    //         data = JSON.parse(data);
    //     }
    //     this.editbox[0].string = data&&data.name?data.name:"";
    //     // this.editbox[0].string = data&&data.accounttype?data.accounttype:"";
    //     this.editbox[3].string = data&&data.ifsccode?data.ifsccode:"";
    //     this.editbox[4].string = data&&data.cardno?data.cardno:"";

    //     this.editbox[1].string = info&&info.phone?info.phone:"";
    //     this.editbox[2].string = info&&info.address?info.address:"";

    //     this._accounttype = data&&data.accounttype?data.accounttype:0;
    //     for (let index = 0; index < this.toggleList.length; index++) {
    //         this.toggleList[index].isChecked = index==this._accounttype;
    //     }
    // }

    onToggleClick(render,data){
        this.toggleList[data].isChecked = true;
        this._accounttype = data;
        this._onShowType(data);
        this._onFlushData(data);
    }

    onEditMailClick(){
        let str = this.editbox[2].string;
        if (str == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("mailnulltip")});
            return;
        }
        let isMail = GameHelper.isEmail(str);
        if (!isMail) {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("mailerrtip")});
            this.editbox[2].string = "";
        }
    }

    onEditNameClick(){
        let str = this.editbox[0].string;
        if (str == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("namenulltip")});
        }
    }

    onEditPhoneClick(){
        let str = this.editbox[1].string;
        if (str == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("phonenulltip")});
        }
    }

    onEditIFSCClick(){
        let str = this.editbox[3].string;
        if (str == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("ifscnulltip")});
        }
    }

    onEditCardNoClick(){
        let str = this.editbox[4].string;
        if (str == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("cardnonulltip")});
        }
    }

    onEditUPIClick(){
        let str = this.editbox[5].string;
        if (str == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("upinulltip")});
        }
    }

    onConfirmClick(){
        let inputList:any = {};
        if (this._accounttype == 0) {
            inputList.name = this.editbox[0].string||"";
            inputList.phone = this.editbox[1].string||"";
            inputList.mail = this.editbox[2].string||"";
            inputList.upi = this.editbox[5].string||"";
            inputList.accounttype = ACCOUNTTYPE[this._accounttype];
            
            if(
                !inputList.name.trim() || 
                !inputList.phone.trim() ||
                !inputList.mail.trim() ||
                !inputList.upi.trim() 
            ){
                GameHelper.showTopTip(App.LangManager.getTxtByKey("completeInformation"))
                return;
            }
        }
        else{
            inputList.name = this.editbox[0].string||"";
            inputList.phone = this.editbox[1].string||"";
            inputList.mail = this.editbox[2].string||"";
            inputList.ifsc = this.editbox[3].string||"";
            inputList.card = this.editbox[4].string||"";
            inputList.accounttype = ACCOUNTTYPE[this._accounttype];
            if(
                !inputList.name.trim() || 
                !inputList.phone.trim() ||
                !inputList.mail.trim() ||
                !inputList.card.trim() ||
                !inputList.ifsc.trim() 
            ){
                GameHelper.showTopTip(App.LangManager.getTxtByKey("completeInformation"))
                return;
            }
        }

        this._data?.cb?.(inputList);
        this.hide();
        if(this._data?.showMain){
            App.DlgManager.showDlg("withDraw",inputList);
        }
    }
}
