// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, fromatRate, getHead, getStrForLen } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class item_ranking extends ListItem {
    @property([cc.SpriteFrame])
    bg:cc.SpriteFrame[] = [];
    UIBindData={
        name:"",
        rank:"",
        ranksp:null,
        bestscore:0,
        reward:"",
        rewardsp:null,
        country:null,
        head:null
    }

    setData(index: number, data?: any): void {
        if (index < 3) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.bg[index];
        }
        else{
            this.node.getComponent(cc.Sprite).spriteFrame = this.bg[3];
        }
        this.UIBindData.ranksp.node.active = index < 3;
        if (index<3) {
            this.UIBindData.ranksp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(String(index+1));
        }
        this.UIBindData.rank = index<3?"":String(index+1);
        getHead(data.avatar,this.UIBindData.head);
        this.UIBindData.name = getStrForLen(data.nick,8);
        this.UIBindData.country.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.area_code);
        this.UIBindData.bestscore = data.best_score;
        this.UIBindData.rewardsp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data.prize_type);


        switch (data.prize_type) {
            case GoodsEnum.TICKET:
                this.UIBindData.reward = String(fromatRate(data.prize));
                break;
            case GoodsEnum.CASH:
            case GoodsEnum.BONUSCASH:
                this.UIBindData.reward = formatCurrency(data.prize);
                break;
            default:
                this.UIBindData.reward = data.prize;
                break;
        }
    }
}
