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
export class obManNumber extends cc.Component {

    @property(cc.Label) label: cc.Label = null;
    @property(cc.Label) obWord_text: cc.Label = null;
    @property(cc.Node) ob_bg: cc.Node = null;

    onLoad () {
        this.obWord_text.string = cv.config.getStringData("curentTime_curentTime_panel_obWord_text");

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this.ob_bg.setContentSize(420, 91);
        }
    }

    setdata(data){
        if (cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat) {
            this.label.string = cv.StringTools.formatC("（%d）", data.onlineNum);
        }
        else
        {
            this.label.string = cv.StringTools.formatC("（%d/%d）", data.onlineNum, data.totalNum);
        }
    }
}
