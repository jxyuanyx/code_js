// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import Common from "../../../gamecore/ui/core/Common";
import { CommonProto } from "../../net/CommonProto";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaymentItem extends BaseComponent {
    UIBindData={
        payment:null,
        payname:"",
    }

    flushPaymentData(data:any,ProductID:number){
        if (!data)return;
        this.UIBindData.payname = data.Title;
        this.UIBindData.payment.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/paymeng").getSpriteFrame("img_bank"+data.ID);
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            cc.game.emit(GameEvents.PAY,{ProductID:ProductID,errCB:(data:any)=>{
                // if (data == pb.ErrNo.Lower_Age) {
                //     App.DlgManager.showDlg("age",null);
                // }
            }});
        })
    }
    
}
