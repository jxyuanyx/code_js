// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, formatDate, fromatRate } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class item_history extends ListItem {
    // @property([cc.SpriteFrame])
    // bg:cc.SpriteFrame[] = [];
    UIBindData={
        score:0,
        time:"",
        reward:"",
        rewardsp:null
    }

    setData(index:number,data?:any){
        // if (index < 3) {
        //     this.node.getComponent(cc.Sprite).spriteFrame = this.bg[index];
        // }
        // else{
        //     this.node.getComponent(cc.Sprite).spriteFrame = this.bg[3];
        // }
        
        this.UIBindData.score = data.score;
        this.UIBindData.time = "Times:"+formatDate(data.time * 1000);
        if (data.reward) {

            switch (data.reward.reward_type) {
                case GoodsEnum.TICKET:
                    this.UIBindData.reward = String(fromatRate(data.reward.reward_value));
                    break;
                case GoodsEnum.CASH:
                case GoodsEnum.BONUSCASH:
                    this.UIBindData.reward = formatCurrency(data.reward.reward_value);
                    break;
                default:
                    this.UIBindData.reward = data.reward.reward_value;
                    break;
            }

            this.UIBindData.rewardsp = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data.reward.reward_type);
            this.node.getChildByName("layout").active = true;
        }
        else{
            this.node.getChildByName("layout").active = false;
        }
        

        // this.UIBindData.reward = 
    }
}
