// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;

@ccclass
export class obDisplayTips extends cc.Component {

    @property(cc.Label) obDisplay_text: cc.Label = null;

    onLoad () {
        this.obDisplay_text.string = cv.config.getStringData("curentTime_display_panel_txt");
    }
}
