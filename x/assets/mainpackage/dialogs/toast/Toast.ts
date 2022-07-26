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

@ccclass
export default class Toast extends BaseDlg {

    showMode=DlgEnum.FADE;

    @property(cc.Node)
    content:cc.Node;

    @property(cc.Node)
    bg:cc.Node;


    UIBindData={
        title:"",
        content:""
    }

    beforeShow(){
        if(this._data){
            if(this._data.error){
                App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/matchsound2");
            }else{
                App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/reward");
            }
            this.UIBindData.title=this._data.title || "";
            this.UIBindData.content=this._data.content || "" ;

            this.content.getComponent(cc.Layout).updateLayout();
            this.bg.height=this.content.height+50;

            if(this._data.left){
                this.UI_LBS.get("content").getComponent(cc.RichText).horizontalAlign=cc.macro.TextAlignment.LEFT;
            }
        }
    }

    afterShow(){
        this.scheduleOnce(()=>{
            this.hide();
        },this._data.delayTime || 2)
    }
}
