// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { RulesDlgData } from "../rules/RulesDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Season extends BaseDlg {

    onNextClick(){
        this.hide();
    }

    onMoreClick(){
        this.hide();
        let data:RulesDlgData = new RulesDlgData();
        data.group = [{txt:App.LangManager.getTxtByKey("tips").season1,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").season2,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").season3,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }

}
