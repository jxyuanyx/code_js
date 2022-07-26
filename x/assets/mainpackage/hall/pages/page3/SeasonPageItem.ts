// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import ListItem from "../../../../gamecore/ui/components/common/ListItem";
import { DataConfig } from "../../../GameConfig";
import { formatCurrency, fromatChip, getHead } from "../../../gameHelper/AthHelper";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SeasonPageItem extends ListItem {

    UIBindData={
        rank:"",
        nick:"",
        selfHead:null,
        flag:null,
        rankIcon:null,
        starCount:"",
        star:""
    }

    @property(cc.SpriteFrame)
    defaultSpriteFrame:cc.SpriteFrame;

    onLoad(): void {
        super.onLoad();
    }

    protected onEnable(): void {
        this.UIBindData.selfHead=this.defaultSpriteFrame;
    }

    setData(index:number,data?:any){
        if (!data) {
            return;
        }
        this.UIBindData.nick=data.nick.length > 5?data.nick.substr(0,5)+"..":data.nick;
        this.UIBindData.starCount=fromatChip(data.point);
        this.UIBindData.rank=data.num;
        this.UIBindData.flag=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.area_code.toUpperCase());
        this.UIBindData.rankIcon.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("seasonrank_"+data.rank);
        getHead(data.avatar,this.UIBindData.selfHead);
        this.UIBindData.star = App.LangManager.getTxtByKey("currency")+formatCurrency(data.reward);
    }
}
