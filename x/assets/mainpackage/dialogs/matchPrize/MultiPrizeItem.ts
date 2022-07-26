// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, fromatNumber1 } from "../../gameHelper/AthHelper";
import { RANKS } from "../record/RecordDlg";
import PrizeItem from "./PrizeItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordItem extends ListItem {
    UIBindData={
        rank:"",
        medal:null
    }

    @property(cc.Prefab)
    instance:cc.Prefab=null;

    @property(cc.Node)
    rewardContent:cc.Node=null;

    onLoad(){
        super.onLoad();
        //this.node.opacity=0;
    }

    setData(index:number,data?:any){
        super.setData(index,data);
        if(data.rank_high==data.rank_low){
            if (data.rank_high == 1 || data.rank_high == 2) {
                this.UI_LBS.get("rank").active = false;
                this.UI_SPS.get("medal").active = true;
                this.UIBindData.medal.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(data.rank_high);
            }
            else{
                this.UI_LBS.get("rank").active = true;
                this.UI_SPS.get("medal").active = false;
                this.UIBindData.rank=data.rank_low+RANKS[Math.min(data.rank_low-1,3)];
            }
        }
        else{
            this.UI_LBS.get("rank").active = true;
            this.UI_SPS.get("medal").active = false;
            this.UIBindData.rank = data.rank_low+RANKS[Math.min(data.rank_low-1,3)] + "~" + data.rank_high+RANKS[Math.min(data.rank_high-1,3)];
        }
        let rewards=data.rewards;
        this.rewardContent.destroyAllChildren();
        for(let i=0;i<rewards.length;i++){
            let node=cc.instantiate(this.instance)
            this.rewardContent.addChild(node)
            let item = node.getComponent(PrizeItem);
            item.setData(rewards[i]);
            
        }
        // this.instance.removeFromParent();
        // this.instance.destroy();
        //this.node.runAction(cc.fadeIn(0.2));
    }
}
