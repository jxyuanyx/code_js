// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { playEffect } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

const PROMOTION = "textures/anims/promotion/jinshengguang";


@ccclass
export default class Promotion extends BaseDlg {
    showTime = 0.5;
    @property(sp.Skeleton)
    anim:sp.Skeleton = null;

    showMode = DlgEnum.FADE;

    UIBindData={
        rank:null,
        myrank:"",
        percent:"",
        congratulations:null,
        contentbg:null
    }

    beforeShow() {
        this.UIBindData.rank.opacity = 0;
        this.UIBindData.rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+this._data.cur);
        this.scheduleOnce(()=>{
            this._playAnimPromotion(this._data.cur,this._data.new,this._data.percent);
        },0.5)
        
    }

    private _playAnimPromotion(cur:number,ne:number,percent:string){
        cc.tween(this.UIBindData.rank)
        .to(0.5,{opacity:255})
        .start();

        this.scheduleOnce(()=>{
            playEffect(0.6,PROMOTION,this.anim,"jinshengguang",false,"mainpackage",null,this,null);
        },0.5)

        cc.tween(this.UI_SPS.get("rank"))
        .delay(0.5)
        // .delay(0.5)
        .to(0.5,{scale:0}, { easing: 'sineIn'})
        .call(()=>{
            this.UIBindData.rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+ne);
            this.UIBindData.percent = App.LangManager.getTxtByKey("seasonpercent",[percent]);
            this.UIBindData.myrank = App.LangManager.getTxtByKey("seasonRankName")[Number(this._data.new) - 1];
        })
        .to(0.5,{scale:4}, { easing: 'sineOut'})
        .to(0.1,{scale:3}, { easing: 'sineIn'})
        .call(()=>{
            this.UIBindData.congratulations.node.runAction(cc.fadeIn(0.5));
            this.UIBindData.contentbg.node.runAction(cc.fadeIn(0.5));
        })
        .delay(1.5)
        .call(()=>{
            this.hide();
        })
        .start();
    }
}
