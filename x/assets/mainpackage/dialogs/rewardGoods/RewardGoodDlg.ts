// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { Goods } from "../../GameConfig";
import { formatCurrency, fromatChip } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardGoodDlg extends BaseDlg {
    
    @property(cc.Node)
    instance:cc.Node=null;

    @property(cc.Node)
    content:cc.Node=null;

    beforeShow(){
        this.instance.removeFromParent();
    }

    afterShow(){
        App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/reward");
        let datas:{reward_type:number,reward_value:number}[]=this._data.Data || [];
        for(let i=0;i<datas.length;i++){
            let data=datas[i];
            let view=cc.instantiate(this.instance);
            view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data.reward_type);
            if (data.reward_type == GoodsEnum.CASH||data.reward_type == GoodsEnum.BONUSCASH|| data.reward_type == GoodsEnum.TICKET) {
                view.getChildByName("label").getComponent(cc.Label).string="x"+formatCurrency(data.reward_value);
            }
            else{
                view.getChildByName("label").getComponent(cc.Label).string="x"+fromatChip(data.reward_value);
            }
            view.getChildByName("label_type").getComponent(cc.Label).string=Goods[data.reward_type];
            this.content.addChild(view);
        }
        this.instance.destroy();    
    }

    onConfirmClick(){
        this.hide();
    }

    afterHide(): void {
        this._data?.cb?.();
    }
}
