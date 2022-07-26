// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;


@ccclass
export class DeAndWithDlg extends BaseDlg {
    showMode=DlgEnum.T2B;
    @property(cc.Node)
    layout:cc.Node = null;

    @property(cc.Node)
    txt:cc.Node = null;

    @property(cc.Node)
    richtxt:cc.Node = null;

    @property(cc.Node)
    img_middle:cc.Node = null;

    UIBindData={
        title:"",
        txt:"",
        cb0:"Cancel",
        cb1:"Ok",
    }

    onLoad(){
        super.onLoad();
        //@ts-ignore
        this.img_middle.getChildByName("auto_lb_txt").getComponent(cc.Label)._forceUpdateRenderData(true);

        let add = this.txt.height - 204.48;
        let width = this.img_middle.getContentSize().width;
        let height = this.img_middle.getContentSize().height;
        let contentSize = this.txt.getContentSize();
        if (add>0){
            height = height + add;
        }
        
        this.img_middle.setContentSize(cc.size(width,height));
        this.img_middle.getChildByName("img_middlemin").setContentSize(cc.size(540,contentSize.height + 84));
    }

    beforeShow(){
        let closeBtn=this.UI_BTNS.get("close")
        closeBtn.height=cc.sys.getSafeAreaRect().height/2-closeBtn.y;
        this.hitSpaceHide=this._data.clickSpaceHide;
        if (this._data.isRich) {
            this.richtxt.active = true;
            this.txt.active = false;
            this.richtxt.getComponent(cc.RichText).string = this._data.txt || "";
        }
        else{
            this.richtxt.active = false;
            this.txt.active = true;
            this.UIBindData.txt = this._data.txt || "";
        }
        this.UIBindData.title = this._data.title || "";
        
        for (let index = 0; index < 2; index++) {
            this.layout.getChildByName("auto_btn_cb"+index).active = index<this._data.group.length;
            this.UIBindData["cb"+index]=this._data.group[index]?.name || "";
        }
        //@ts-ignore
        

        // this.UI_LBS.get("title").getComponent(cc.Widget).top=6.57;

    }

    onCb0Click(){
        if (this._data?.group[0].isExit) {
            this.UI_BTNS.get("cb0").getComponent(cc.Button).interactable = false;
            this.hide();
        }   
        this._data.group[0]?.cb?.();
    }

    onCb1Click(){
        if (this._data?.group[1].isExit) {
            this.UI_BTNS.get("cb1").getComponent(cc.Button).interactable = false;
            this.hide();
        }
        this._data?.group[1]?.cb?.();
    }
}



