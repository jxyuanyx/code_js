// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DlgEnum } from "../../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game100_FlowDlg extends BaseDlg {
    showMode=DlgEnum.B2T;
    @property(cc.Node)
    exitbox:cc.Node = null;
    UIBindData={
        arr:"",
    }

    beforeShow(){
        if (!this._data.ifCopy) {
            this.UIBindData.arr = this._data.txt;
            this.exitbox.active = false;
        }
        else{
            this.UIBindData.arr = "";
            this.exitbox.active = true;
            this.exitbox.getComponent(cc.EditBox).string = this._data.txt;
        }
        
    }
    onExitClick(){
        this.hide();
    }
}
