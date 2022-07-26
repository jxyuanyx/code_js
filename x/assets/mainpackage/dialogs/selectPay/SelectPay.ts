// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectPay extends BaseDlg {
    showMode=DlgEnum.T2B;

    private _curPay:number = 0;

    UIBindData={

    }

    @property(cc.ToggleContainer)
    toggleContainer:cc.ToggleContainer = null;

    beforeShow(){
        let closeBtn=this.UI_BTNS.get("close")
        closeBtn.height=cc.sys.getSafeAreaRect().height/2-closeBtn.y;

        let datas = this._data.ways.pay_pattern;
        if (!datas||datas.length<1)return;
        let childs = this.toggleContainer.getComponentsInChildren(cc.Toggle);
        this.toggleContainer.toggleItems[datas[0][0]].isChecked = true;
        this._curPay = datas[0][0];
        for (let index = 0; index < datas.length; index++) {
            childs[datas[index][0]].node.active = true;
            childs[datas[index][0]].node.zIndex = index;
            childs[datas[index][0]].node.getChildByName("img_hot").active = datas[index][1]==1;
        }
    }

    toggleClick(render,data){
        this._curPay = data;
    }

    onNextstepClick(){
        this.hide();
        cc.game.emit(GameEvents.SELECTPAY,{way:this._curPay,info:this._data.info});
    }
}
