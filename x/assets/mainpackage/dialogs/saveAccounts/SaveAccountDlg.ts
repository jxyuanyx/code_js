// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { AccountData, LoginType } from "../../../gamecore/models/AccountData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { CONSTANTS } from "../../GameConfig";

const {ccclass, property} = cc._decorator;

export const ISBIND:string="isbind";

@ccclass
export  class SaveAccountDlg<T extends AccountData> extends BaseDlg {
    showMode=DlgEnum.R2L;

    onFbClick(){
        let isBind:boolean=!App.DataManager.getExtInfo(CONSTANTS.SYSTEM_CONFIG).guest_switch;
        if(isBind)return;
        this.hide();

        App.DlgManager.showDlg("loading");
        App.DataManager.setExtInfo(ISBIND,true);
        App.NativeManager.fbLogOut();
        App.NativeManager.loginByFaceBook();
    }

    onGoogleClick(){
        let isBind:boolean=!App.DataManager.getExtInfo(CONSTANTS.SYSTEM_CONFIG).guest_switch;
        if(isBind)return;
        this.hide();

        App.DlgManager.showDlg("loading");
        App.DataManager.setExtInfo(ISBIND,true);
        App.NativeManager.googleLogOut();
        App.NativeManager.loginByGoogle();
    }
}
