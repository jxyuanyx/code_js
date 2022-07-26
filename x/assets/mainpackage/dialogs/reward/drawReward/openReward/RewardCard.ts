// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../../gamecore/App";
import { GoodsEnum } from "../../../../../gamecore/enums/GoodsEnum";
import { BaseComponent } from "../../../../../gamecore/ui/baseview/imp/BaseComponent";
import { Goods } from "../../../../GameConfig";
import { formatCurrency, fromatChip } from "../../../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardCard extends BaseComponent {
    UIBindData={
        goods:null,
        name:"",
        count:"0"
    }
    @property(cc.Node)
    cardBack:cc.Node = null

    @property(cc.Node)
    cardFront:cc.Node = null

    private _index:number = 0;

    onShowCard(data,type:number,index:number){
        this.flushFront(data);
        this.flushBack(type);
        this.cardBack.active = false;
        this.cardFront.active = true;
        this._index = index;
        
    }

    flushBack(data:number){
        let sp = this.cardBack.getComponent(cc.Sprite);
        sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/rewardcardbg").getSpriteFrame("img_cardbg"+(data-1));
    }

    flushFront(data){
        let sp = this.UIBindData.goods;
        sp.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+data.reward_type);
        this.UIBindData.name =Goods[data.reward_type];
        if (data.reward_type == GoodsEnum.CASH || data.reward_type == GoodsEnum.BONUSCASH || data.reward_type == GoodsEnum.TICKET) {
            this.UIBindData.count = "x" + formatCurrency(data.reward_value);
        }
        else{
            this.UIBindData.count = "x" + fromatChip(data.reward_value);
        }
        
    }

    public shuffle(pos:cc.Vec3){
        let initPos = this.node.position;
        cc.tween(this.node)
        .to(0.2,{position:pos})
        .delay(0.1)
        .to(0.2,{position:initPos})
        .start();
    }

    turn(data,time?:number,cb?:Function,target?:any){
        if(!time)time=0.2;
        let scale=this.node.scaleY;
        this.node.runAction(cc.sequence(
            cc.scaleTo(time/2,0.2,scale),
            cc.callFunc(()=>{
                this.cardBack.active=false;
                this.cardFront.active=true;
                this.flushFront(data);
            }),
            cc.scaleTo(time/2,scale),
            cc.callFunc(()=>{
                cb&&cb.call(target);
            })
        ))
    }

    turnBack(data:number,cb:Function,time?:number){
        if(!time)time=0.2;
        let scale=this.node.scaleY;
        this.node.runAction(cc.sequence(
            cc.scaleTo(time/2,0.2,scale),
            cc.callFunc(()=>{
                this.cardFront.active=false;
                this.cardBack.active=true;
                this.flushBack(data);
            }),
            cc.scaleTo(time/2,scale),
            cc.callFunc(()=>{
                this.node.off(cc.Node.EventType.TOUCH_END)
                this.node.on(cc.Node.EventType.TOUCH_END,()=>{
                    cb(this._index);
                });
            })
        ))
    }
}
