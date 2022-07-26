// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { NetEnum } from "../../../gamecore/enums/NetEnum";
import { AccountData, CustomAccountData, GuestAccountData, LoginType } from "../../../gamecore/models/AccountData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { LoginAction } from "../../../mainpackage/welcome/loginenum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dlg_Login extends BaseDlg {
    UIBindData={
        account:"",
        password:"",
    }

    onOkClick(){

        let uuid=this.UIBindData.account;
         let resVersion=cc.sys.localStorage.getItem("main_version") || "1.0.0";
         resVersion=parseInt(resVersion.replace(/\./g,""))
         let channel=App.NativeManager.getChannel();
         let appVersion=App.NativeManager.getAppVersionCode();

         App.HttpManager.setCommonInfo({
             device_id:uuid,
             uid:uuid,
             os:cc.sys.os,
             main_version:parseInt(appVersion),
             channel:channel,
             version:resVersion
        });


        let name=this.UIBindData.account;
        let accountData=new GuestAccountData();
        accountData.Type=LoginType.GUEST;
        
        cc.sys.localStorage.setItem("UUID",name);

        cc.game.emit(NetEnum.REQ_CONTECT,accountData);
        this.hide();
    }
}
