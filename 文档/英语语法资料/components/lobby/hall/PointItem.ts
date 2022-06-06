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
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PointItem extends cc.Component {

    @property(cc.Sprite)
    spr_icon: cc.Sprite = null;
    @property(cc.Label)
    label_miniGold: cc.Label = null;
    @property(cc.Label)
    label_point: cc.Label = null;
    @property(cc.Label)
    label_switch: cc.Label = null;
    @property(cc.Label)
    label_switch_btn_0: cc.Label = null;
    @property(cc.Label)
    label_switch_btn_1: cc.Label = null;

    msg: pb.Goods = null;
    index: number = 0;
    isInit: boolean = false;

    init() {
        if (this.isInit) return;
        this.isInit = true;
        this.label_miniGold.enableBold = true;
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        this.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            if (!this.msg) return;
            cv.worldNet.ExchangeUserPointsRequest(this.msg.goods_id);
        });
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage() {
        this.show(this.msg, this.index);
    }

    show(msg: pb.Goods, index: number) {
        this.init();
        if (!msg) return;
        this.msg = msg;
        this.index = index;
        cv.resMgr.setSpriteFrame(this.spr_icon.node, "zh_CN/hall/lobby/coin_icon_" + index);
        let size = cv.resMgr.getLabelStringSize(this.label_miniGold, cv.config.getStringData("Earnings_lab_2") + ":");
        let point = cv.StringTools.serverGoldToShowNumber(this.msg.cost_user_points);
        let haveN = cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN ? "" : " ";
        this.label_point.string = this.getStringForNum(point) + haveN + cv.config.getStringData("InquireView_lab_3");
        this.label_switch.node.setPosition(this.label_miniGold.node.x + size.width + 20, this.label_miniGold.node.y);
        let obtain_game_coin = cv.StringTools.serverGoldToShowNumber(this.msg.obtain_game_coin);
        this.label_switch.string = this.getStringForNum(obtain_game_coin);
        if (cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN) {
            this.label_switch_btn_0.string = cv.config.getStringData("Earnings_lab_switch_btn");
            this.label_switch_btn_1.string = "";
        }
        else {
            this.label_switch_btn_0.string = "";
            this.label_switch_btn_1.string = cv.config.getStringData("Earnings_lab_switch_btn");
        }

    }

    getStringForNum(num: number): string {
        let result = "";
        if (cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN) {
            if (num >= 100000000) {
                result = cv.String(num / 100000000) + "亿";
            }
            else if (num >= 10000) {
                result = cv.String(num / 10000) + "万";
            }
            else {
                result = cv.String(num);
            }
        }
        else {
            if (num >= 1000000) {
                result = cv.String(num / 1000000) + "M";
            }
            else if (num >= 10000) {
                result = cv.String(num / 1000) + "K";
            }
            else {
                result = cv.String(num);
            }
        }
        return result;
    }
}
