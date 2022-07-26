// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEnum } from "../../../gamecore/enums/NetEnum";
import {CustomAccountData, LoginType } from "../../../gamecore/models/AccountData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { LoginAction } from "../../login/loginenum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Reg extends BaseDlg {
    UIBindData={
        account:"",
        password:"",
        password1:""
    }

    onOkClick(){
        let accountData:CustomAccountData=new CustomAccountData();
        accountData.Name=this.UIBindData.account;
        accountData.Token=this.UIBindData.password; 
        accountData.Type=LoginType.ACCOUNT;       
        cc.game.emit(NetEnum.REQ_CONTECT,LoginAction.Reg,accountData)
        this.hide();
        //
    }
}
