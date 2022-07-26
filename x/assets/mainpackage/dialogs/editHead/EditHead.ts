// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EditHead extends BaseDlg {

    showMode=DlgEnum.DOCK_BOTTOM;

    onDefaultClick(){
        App.DlgManager.showDlg("editDefault",this._data,"mainpackage");
        this.hide();
    }

    onCustomizedClick(){
        App.NativeManager.selectPhoto();
    }
}
