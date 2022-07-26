// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { PayEnum } from "../../../gamecore/enums/PayEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FillPlayerInfo extends BaseDlg {

    showMode=DlgEnum.T2B;

    @property([cc.EditBox])
    editboxList:cc.EditBox[] = [];

    async beforeShow(){
        let info:any = await this._getPlayerInfo();
        if(info){
            this.editboxList[0].string=info.name || "";
            this.editboxList[1].string=info.phone || "";
            this.editboxList[2].string=info.email || "";
        }

        let closeBtn=this.UI_BTNS.get("close")
        closeBtn.height=cc.sys.getSafeAreaRect().height/2-closeBtn.y;
    }

    async _getPlayerInfo(){
        let info = await App.HttpManager.postAsync("pay_api/jai/get_recharge_info");
        return info;
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
        //App.NativeManager.logEvent("ClickRechargeNum",null);
        
        cc.game.emit(GameEvents.PAY,{pay_pattern:this._data.way,product_id:this._data.info.product_id,pay_entry:(this._data.info.pay_entry || 0),errCB:(data:any)=>{
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("depositerr")});
        },source:this._data.way,data:{name:name,phone:phone,email:address},successCB:()=>{
            // this.onSaveLocalInfo(name,phone,address);
            this.hide();
        }});
    }

    // update (dt) {}
}
