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
export default class Game100_TestDlg extends BaseDlg {
    UIBindData={
        level:"",
        seed:""
    }
    beforeShow() {
        this.UIBindData.level = "level:"+cc.sys.localStorage.getItem("game100arr_level")
        this.UIBindData.seed = "seed:"+cc.sys.localStorage.getItem("game100arr_seed")
    }

    onArr1Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game100arr_0_all")),ifCopy:false},"game100");
    }

    onArr2Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game100arr_1_pile")),ifCopy:false},"game100");
    }

    onArr3Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game100arr_1_random")),ifCopy:false},"game100");
    }

    onArr4Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game100arr_2_pile")),ifCopy:false},"game100");
    }

    onArr5Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game100arr_2_random")),ifCopy:false},"game100");
    }

    onArr6Click(){
        App.DlgManager.showDlg("test/flow",{txt:JSON.parse(cc.sys.localStorage.getItem("game100arr_rdCards")),ifCopy:false},"game100");
    }
    
    onExitClick(){
        this.hide();
    }
}
