// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { DataConfig } from "../../../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SeasonItem extends BaseComponent {

    UIBindData={
        season:"",
        quarter:"",
        sea:null
    }

    flushdata(data:any){
        if (data.index == 0) {
            this.UIBindData.quarter = App.LangManager.getTxtByKey("current");
        }
        else if(data.index == 1){
            this.UIBindData.quarter = App.LangManager.getTxtByKey("history");
        }
        this.UIBindData.season = data.season.rank_name;
        this.UIBindData.sea.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+data.season.rank);
    }
}
