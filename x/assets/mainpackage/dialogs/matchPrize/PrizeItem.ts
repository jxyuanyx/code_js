// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { formatCurrency } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrizeItem extends cc.Component {

    @property(cc.Sprite)
    icon:cc.Sprite=null;

    @property(cc.Label)
    count:cc.Label=null;

    setData(data:any){
        this.icon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data[0]);
        this.count.string=formatCurrency(data[1]);
    }

    // update (dt) {}
}
