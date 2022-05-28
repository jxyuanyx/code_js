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
import LoginScene from "./LoginScene";
import UpgradeView from "./UpgradeView";
const { ccclass, property } = cc._decorator;

/**
 * 本类应该已经没有用了，暂时再保留一段时间
 */
@ccclass
export default class RegisterFinish extends cc.Component {

    @property(cc.Node)
    pw_strength_Panel: cc.Node = null;
    @property(cc.Node) pw_strength_low: cc.Node = null;
    @property(cc.Node) pw_strength_mid: cc.Node = null;
    @property(cc.Node) pw_strength_high: cc.Node = null;
    @property(cc.Node) txt_pw_strength: cc.Node = null;
    onLoad() {
        this.initText();
        this.registerMsg();
        // cv.httpHandler.requestCaptcha();
    }

    start() {
        this.pw_strength_Panel.active = false;
    }

    initText() {
        //新用户注册、请输入昵称    未添加到翻译文件    2018.09.15
        cc.find("title_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("RegisterTitleText");
        cc.find("nickname_Panel/nickname_text", this.node).getComponent(cc.EditBox).placeholder = "请输入昵称";
        cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).placeholder = cv.config.getStringData("Login_Scene_login_panel_password_Panel_password_text1");
        cc.find("password_Panel_0/password_text", this.node).getComponent(cc.EditBox).placeholder = cv.config.getStringData("Login_Scene_login_panel_password_Panel_password_text0");
        cc.find("finish_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("NextBtnText");
    }

    registerMsg() {
        cv.MessageCenter.register("register_to_set_account", this.onFinishRegisterSuccess.bind(this), this.node);
    }
    
    onDestroy() {
        cv.MessageCenter.unregister("register_to_set_account", this.node);
    }
    onFinishRegisterSuccess(msg) {
        console.log("onFinishRegisterSuccess");
        this.node.getParent().getComponent(LoginScene).onFinishRegisterSuccess();
    }

    onMiddleRegisterSuccess(msg) {
        
    }

    onBtnFinishRegisterClick() {
        cv.AudioMgr.playButtonSound('button_click');
        let mobile = cc.find("phone_Panel/phoneNumber_text", this.node.getParent().getComponent(LoginScene).registerView).getComponent(cc.EditBox).string;
        let nickname = cc.find("nickname_Panel/nickname_text", this.node).getComponent(cc.EditBox).string;
        let password0 = cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).string;
        let password1 = cc.find("password_Panel_0/password_text", this.node).getComponent(cc.EditBox).string;
        let areaCode = this.node.getParent().getComponent(LoginScene).getAreaCodeData();

        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            if (cv.tools.showError({
                nickname: nickname,
                phoneNum: mobile,
                password0: password0,
                password1: password1,
                AreaCode: areaCode,
            })) {
                return;
            }
        } else {
            if (this.node.getParent().getComponent(UpgradeView).showError({
                nickname: nickname,
                phoneNum: mobile,
                password0: password0,
                password1: password1,
                AreaCode: areaCode,
            })) {
                return;
            }
        }

        

        cv.httpHandler.requestCheckNickName(nickname, password0);
    }

    onPsdEditBoxChange() {
        let kPassword = cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).string;
        let isPwValid = true;
        if (kPassword.length == 0) {
            isPwValid = false;
        }
        if (kPassword.search(" ") != -1) {
            isPwValid = false;
        }
        if (kPassword.length < 6 || kPassword.length > 14) {
            isPwValid = false;
        }

        if (!isPwValid) {
            this.pw_strength_Panel.active = (false);
            return;
        }

        // 判断密码强度
        let haveNum = false;
        let haveAlpha = false;
        let haveExtra = false;
        let len = kPassword.length;
        for (let i = 0; i < len; i++) {
            if (kPassword[i] >= '0' && kPassword[i] <= '9') {
                haveNum = true;
            }
            else if ((kPassword[i] >= 'a' && kPassword[i] <= 'z') || (kPassword[i] >= 'A' && kPassword[i] <= 'Z')) {
                haveAlpha = true;
            }
            else {
                haveExtra = true;
            }
        }

        let pwStrengthLevel = 0;
        if (haveNum) pwStrengthLevel++;
        if (haveAlpha) pwStrengthLevel++;
        if (haveExtra) pwStrengthLevel++;

        this.pw_strength_Panel.active = (true);
        this.pw_strength_low.active = (false);
        this.pw_strength_mid.active = (false);
        this.pw_strength_high.active = (false);
        if (pwStrengthLevel == 1) {
            // 差
            this.txt_pw_strength.getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panel_setPassword_strength_low_text");
            this.pw_strength_low.active = (true);
        }
        else if (pwStrengthLevel == 2) {
            // 中
            this.txt_pw_strength.getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panel_setPassword_strength_mid_text");
            this.pw_strength_low.active = (true);
            this.pw_strength_mid.active = (true);
        }
        else if (pwStrengthLevel == 3) {
            // 强
            this.txt_pw_strength.getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panel_setPassword_strength_high_text");
            this.pw_strength_low.active = (true);
            this.pw_strength_mid.active = (true);
            this.pw_strength_high.active = (true);
        }
        else {
            this.pw_strength_Panel.active = (false);
        }
    }
}
