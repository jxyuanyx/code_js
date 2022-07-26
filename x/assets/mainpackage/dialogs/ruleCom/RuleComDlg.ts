// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RuleComDlg extends BaseDlg {

    public UIBindData: any={
        title:"",
        content:""
    }


    beforeShow(): void {
 
    }

    afterShow(): void {
        this.UIBindData.title=this._data.title;
        this.UIBindData.content=this._data.content;

    }


}
