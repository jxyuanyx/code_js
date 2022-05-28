// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../cv";
import { pb } from "../../../../Script/common/pb/ws_protocol";
import { eTimeType } from "../../../common/tools/Enum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InquireItem extends cc.Component {
    @property(cc.Label)
    lab_name: cc.Label = null;

    @property(cc.Label)
    lab_num: cc.Label = null;

    @property(cc.Label)
    lab_time: cc.Label = null;

    color_lab_plus: cc.Color = cc.color(183, 51, 51);
    color_lab_less: cc.Color = cc.color(37, 165, 62);
    msg: pb.BankDetailsSnapshot = null;

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }
    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    initLanguage() {
        if (!this.msg) return;
        let isPlus = this.msg.amount > 0;
        this.lab_name.string = cv.config.getStringData("InquireView_content_" + this.msg.source_type);
        this.lab_num.string = (isPlus ? "+" : "") + cv.StringTools.serverGoldToShowString(this.msg.amount);
        this.lab_time.string = cv.StringTools.formatTime(this.msg.create_time, eTimeType.Month_Day_Hour_Min_Sec);
        this.lab_num.node.color = isPlus ? this.color_lab_plus : this.color_lab_less;
    }

    updateSVReuseData(index: number, dataArray: Array<any>): void {
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;

        this.msg = dataArray[index];

        this.initLanguage();
    }
}
