// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { DataConfig } from "../../../GameConfig";
import { formatCurrency, fromatChip, fromatNumber1, getHead } from "../../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SeasonPlayer extends BaseComponent {

    @property(cc.SpriteFrame)
    defaultHead:cc.SpriteFrame = null;

    UIBindData={
        head:null,
        rankIcon:null,
        flag:null,
        nickName:"Updating",
        star:"0",
        count:""
    }

    private _defaultHead:cc.SpriteFrame=null;

    onLoad(){
        super.onLoad();
        this._defaultHead=this.UIBindData.head.spriteFrame;
    }

    init(){
        this.UIBindData.nickName = "Updating";
        this.UIBindData.flag.SpriteFrame = null;
        this.UIBindData.star = "";
        this.UIBindData.count = "";
        this.node.getChildByName("star").active = false;
        this.node.getChildByName("lang_lb_defaultname").active = true;
        this.UI_SPS.get("flag").active = false;
        this.UI_SPS.get("rankIcon").active = false;
        this.UI_LBS.get("count").active = false;
        this.UIBindData.head=this._defaultHead;
    }

    setData(data:any){
        this.UIBindData.nickName=data.nick.length > 6?data.nick.substr(0,6)+"..":data.nick;

        // this.UIBindData.nickName=data.Nick;
        this.UIBindData.rankIcon.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("seasonrank_"+data.rank);
        this.UIBindData.flag.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.area_code);
        this.UIBindData.star=fromatChip(data.point);
        this.UIBindData.count = App.LangManager.getTxtByKey("currency") + formatCurrency(data.reward);
        getHead(data.avatar,this.UIBindData.head);

        this.UI_SPS.get("flag").active = true;
        this.UI_SPS.get("rankIcon").active = true;
        this.node.getChildByName("star").active = true;
        this.UI_LBS.get("count").active = true;
        this.UI_LBS.get("star").active = true;
        this.node.getChildByName("lang_lb_defaultname").active = false;
    }
}
