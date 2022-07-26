// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import { formatCurrency } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Barrage extends BaseComponent {

    showData(data:any){
        this.node.getChildByName("label_name").getComponent(cc.Label).string = data.nick;
        this.node.getChildByName("label_cash").getComponent(cc.Label).string = formatCurrency(data.amount,true);
    }

}
