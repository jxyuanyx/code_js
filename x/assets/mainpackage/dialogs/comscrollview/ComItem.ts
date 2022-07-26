// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComItem extends BaseComponent {

    UIBindData={
        info:"",
    }

    flushItemData(data:any){
        this.UIBindData.info = data;
    }
}
