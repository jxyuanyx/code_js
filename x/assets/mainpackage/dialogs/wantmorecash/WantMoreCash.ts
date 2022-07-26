// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgSequecene } from "../../../gamecore/tools/DlgSequecene";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { saveGuidData } from "../../gameHelper/AthHelper";
import { GUIDE_STEPS } from "../../hall/guid/HallGuideConfig";
import { ACT_SHOW } from "../../hall/pages/page1/GamePage";
import { EVENTS, PAGES } from "../../hall/scripts/hall";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WantMoreCash extends BaseDlg {
    onNextClick(){
        this.hide();
        App.DlgManager.hideDlg("record");
        //切换场景
        cc.game.emit(EVENTS.CHANGEPAGE, PAGES.GAMES);
        saveGuidData(GUIDE_STEPS.FINISH);

        //添加新手引导
        DlgSequecene.getInstance().add("mainpackage_inviteCode")

        cc.game.emit(ACT_SHOW);
    }
}
