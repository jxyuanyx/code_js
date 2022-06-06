// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "./../cv";
const { ccclass, property } = cc._decorator;

@ccclass
export class Protocol extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.WebView)
    web: cc.WebView = null;

    PROTOTAL_RULE = "user/article/getAgreement?unique=register&clientType=%s&language=%s";

    start() {
        this.title.string = cv.config.getStringData("Login_Scene_register_panel_Text_4_0_0");
        this.showWebview();
        cc.find("back_button", this.node).on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('back_button');
            this.node.active = false;
        })
    }

    showWebview() {
        let str = cv.config.GET_DEBUG_MODE() == 0 ? "WEB_API_HEAD" : "WEB_API_HEAD_DEBUG";
        this.web.url = cv.config.getStringData(str, true) + cv.StringTools.formatC(this.PROTOTAL_RULE, cv.config.GET_CLIENT_TYPE(), cv.config.getCurrentLanguage());
    }
}