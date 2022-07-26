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
export default class Game101_TestDlg extends BaseDlg {

    onArr1Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game101arr_1")),ifCopy:false},"game101");
    }

    onArr2Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game101arr_2")),ifCopy:false},"game101");
    }

    onArr3Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game101arr_3")),ifCopy:false},"game101");
    }

    onArr4Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game101arr_4")),ifCopy:true},"game101");
    }
    
    onExitClick(){
        this.hide();
    }
}
