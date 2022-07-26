// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, fromatRate } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class item_prizes extends ListItem {
    @property([cc.SpriteFrame])
    bg:cc.SpriteFrame[] = [];


    @property(cc.Prefab)
    layout:cc.Prefab = null;
    UIBindData={
        rank:null,
        ranking:"",
        reward:"",
        rewardsp:null
    }

    setData(index: number, data?: any): void {
        if (index < 3) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.bg[index];
        }
        else{
            this.node.getComponent(cc.Sprite).spriteFrame = this.bg[3];
        }
        this.node.getChildByName("node").removeAllChildren();
        this.node.getChildByName("node").destroyAllChildren();
        let node = cc.instantiate(this.layout);
        this.node.getChildByName("node").addChild(node);
        let rank:cc.Sprite = null;
        let ranking:cc.Label = null;
        rank = node.getChildByName("rank").getComponent(cc.Sprite);
        ranking = node.getChildByName("ranking").getComponent(cc.Label);
        switch (data[0]) {
            case "1st":
                rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("1");
                break;
            case "2nd":
                rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("2");
                break;
            case "3rd":
                rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("3");
                break;
            default:
                rank.node.active = false;
                break;
        }
        ranking.string = data[0];

        switch (data[2]) {
            case GoodsEnum.TICKET:
                this.UIBindData.reward = String(fromatRate(data[1]));
                break;
            case GoodsEnum.CASH:
            case GoodsEnum.BONUSCASH:
                this.UIBindData.reward = formatCurrency(data[1]);
                break;
            default:
                this.UIBindData.reward = data[1];
                break;
        }

        this.UIBindData.rewardsp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data[2]);

    }
}
