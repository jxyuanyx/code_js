// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

export class ComDlgData {
    group:{name:string,isExit?:boolean,cb?:Function}[];
    title:string = "Tips";
    txt:string = "";
    clickSpaceHide:boolean=false;//点击空白区是否自动关闭
}

@ccclass
export class Game100_Dlg extends BaseDlg {

    @property(cc.Node)
    layout:cc.Node = null;

    @property(cc.Node)
    txt:cc.Node = null;

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

        // if (this.txt.height > 61) {
        //     this.txt.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        // }
        // else{
        //     this.txt.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        // }
        // let width = this.img_middle.getContentSize().width;
        // let height = this.img_middle.getContentSize().height;
        
        // this.img_middle.setContentSize(cc.size(width,height));
    }

    beforeShow(){
        this.hitSpaceHide=this._data.clickSpaceHide;

        this.UIBindData.title = this._data.title || "";
        this.UIBindData.txt = this._data.txt || "";
        for (let index = 0; index < 2; index++) {
            this.layout.getChildByName("auto_btn_cb"+index).active = index<this._data.group.length;
            this.UIBindData["cb"+index]=this._data.group[index]?.name || "";
        }
        //@ts-ignore
        

        // this.UI_LBS.get("title").getComponent(cc.Widget).top=6.57;

    }

    onCb0Click(){
        this._data.group[0]?.cb?.();
        if (this._data.group[0].isExit) {
            this.hide();
        }   
    }

    onCb1Click(){
        this._data.group[1]?.cb?.();
        if (this._data.group[1].isExit) {
            this.hide();
        }   
    }
}



