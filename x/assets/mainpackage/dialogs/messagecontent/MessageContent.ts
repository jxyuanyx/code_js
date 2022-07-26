// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatDate } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageContent extends BaseDlg {
    @property(cc.Node)
    img_txtbg:cc.Node = null;

    UIBindData = {
        title:"",
        content:"",
        time:""
    }

    afterShow(){
        this.UIBindData.title = this._data.title;
        this.UIBindData.time = formatDate(this._data.time * 1000);
        this.UIBindData.content = this._data.content;
        this._setBgSize();
    }
    
    private _setBgSize(){
        //@ts-ignore
        this.UI_LBS.get("content").getComponent(cc.Label)._forceUpdateRenderData();
        let height = this.UI_LBS.get("content").height;
        let num = Math.ceil(height / 49);
        if (num < 10) {
            num = 10;
        }
        this.img_txtbg.height = num * 49;
    }

    
}
