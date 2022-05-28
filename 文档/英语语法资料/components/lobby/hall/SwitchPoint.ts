// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { pb } from "../../../../Script/common/pb/ws_protocol";
import cv from "../cv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SwitchPoint extends cc.Component {

    @property(cc.Node) switch_box: cc.Node = null;
    @property(cc.Node) succ_box: cc.Node = null;
    @property(cc.Button) switch_cancel: cc.Button = null;
    @property(cc.Button) switch_sure: cc.Button = null;
    @property(cc.Node) switch_layout_Arr: cc.Node[] = [];
    @property(cc.Label) switch_lab_Arr: cc.Label[] = [];
    @property(cc.Label) labArr: cc.Label[] = [];
    @property(cc.Node) switch_icon: cc.Node = null;
    select_switch_data: pb.Goods = null;
    succ_path: string = "zh_CN/hall/lobby/select";
    fail_path: string = "zh_CN/hall/lobby/switch_fail";

    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("EarnView_showSwitch", this.showSwitch.bind(this), this.node);
        this.switch_sure.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            if (this.select_switch_data) {
                cv.worldNet.ExchangeUserPointsRequest(this.select_switch_data.goods_id);
            }

            this.node.active = false;
            // 恢复显示"邮件"图标
            cv.MessageCenter.send("show_mail_entrance", true);
        }, this);
        this.switch_cancel.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            this.node.active = false;
            // 恢复显示"邮件"图标
            cv.MessageCenter.send("show_mail_entrance", true);
        }, this);
        this.initLanguage();
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("EarnView_showSwitch", this.node);
    }

    initLanguage() {
        let len = this.labArr.length;
        for (let i = 0; i < len; i++) {
            let tempLab = this.labArr[i];
            tempLab.string = cv.config.getStringData("SwitchPoint_lab_" + i);
        }
    }

    showSwitch(msg: pb.Goods): void {
        this.node.active = true;
        this.switch_box.active = true;
        this.succ_box.active = false;
        this.select_switch_data = msg;
        let size_0 = cv.resMgr.getLabelStringSize(this.switch_lab_Arr[0], cv.StringTools.serverGoldToShowString(msg.cost_user_points));
        let size_1 = cv.resMgr.getLabelStringSize(this.switch_lab_Arr[1], cv.StringTools.serverGoldToShowString(msg.obtain_game_coin));
        this.switch_layout_Arr[0].setContentSize(this.switch_layout_Arr[0].getChildByName("lab_sec_0").width + size_0.width, this.switch_layout_Arr[0].height);
        this.switch_layout_Arr[1].setContentSize(this.switch_layout_Arr[1].getChildByName("lab_sec_0").width + size_1.width, this.switch_layout_Arr[1].height);

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);
    }

    showSucc(str: string, isSucc: boolean) {
        if (isSucc) {
            this.labArr[4].node.color = cc.color(229, 209, 146);
        }
        else {
            this.labArr[4].node.color = cc.color(255, 255, 255);
        }
        this.labArr[4].string = str;

        cv.resMgr.setSpriteFrame(this.switch_icon, isSucc ? this.succ_path : this.fail_path);
        this.node.active = true;
        this.switch_box.active = false;
        this.succ_box.active = true;
        this.succ_box.stopAllActions();
        this.succ_box.opacity = 0;
        this.succ_box.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.5), cc.fadeOut(0.3), cc.callFunc(() => {
            this.node.active = false;
        }, this)));
    }
}
