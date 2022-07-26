// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinFreeTip extends BaseDlg {

    
    onNextClick(){
        this.hide();
        App.DlgManager.showDlg("wantmorecash");
    }
}
