// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

const LOADURL:string="http://120.78.143.78:6080";

@ccclass
export default class Web extends BaseDlg {

    showMode=DlgEnum.FADE;


    @property(cc.WebView)
    webView: cc.WebView = null;

    onLoad () {
        var scheme = "callback";

        let  jsCallback=(target, url)=>{
            // 这里的返回值是内部页面的 URL 数值，需要自行解析自己需要的数据。
            var str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            this.hide();
            let params={};
            let paramsInfo=str.split("&");
            for(let i=0;i<paramsInfo.length;i++){
                let data=paramsInfo[i].split("=");
                params[data[0]]=data[1];
            }
            if(params["status"]==1){
                //打点数据
                //App.NativeManager.logEvent("CompleteRechargeNum",null);
            }
        }

        this.webView.setJavascriptInterfaceScheme(scheme);
        this.webView.setOnJSCallback(jsCallback);
    }

     //注意参数的顺序和类型是固定的
    callback(webview:cc.WebView,eventType:cc.WebView.EventType) {

        /*
        if(eventType==cc.WebView.EventType.LOADED){

            console.log("执行JS",`loadUrl(${this._data.url})`)
            
            this.webView.evaluateJS(`loadUrl('${this._data.url}')`);

        }*/
    }

    afterShow(){
        this.webView.url=this._data.url;
    }
    // update (dt) {}
}
