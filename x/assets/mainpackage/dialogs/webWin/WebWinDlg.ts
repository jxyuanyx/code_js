// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebWinDlg extends BaseDlg {

    showMode=DlgEnum.R2L;

    @property(cc.WebView)
    webView:cc.WebView=null;
    
    UIBindData={
        title:""
    }

    afterShow(){
        GameHelper.addDataLoading(this.webView.node.parent);
        this.UIBindData.title=this._data.title;
        this.webView.url=this._data.url;
    }

    callback(webview:cc.WebView,eventType:cc.WebView.EventType) {
        if(eventType==cc.WebView.EventType.LOADED){
            GameHelper.removeDataLoading(this.webView.node.parent);
        }

    }
}
