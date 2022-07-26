// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends BaseDlg {
    showMode=DlgEnum.FADE;


    UIBindData={
        info:"loading"
    }

    afterShow(){
        this.UIBindData.info=this._data || "";
    }

    updateData(data:any){
        this.UIBindData.info=data || "";
        console.log("updateData",data)
    }

    // update (dt) {}
}
