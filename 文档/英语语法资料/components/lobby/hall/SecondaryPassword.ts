// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../cv";
import ModifyPassword from "./ModifyPassword";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SecondaryPassword extends cc.Component {

    @property(cc.Prefab)
    setSecondPsd: cc.Prefab = null;
    modifyPsdView: cc.Node = null;

    onLoad() {
        this.registerMsg();
        this.initLanguage();
        if (!cc.director.getScene().getChildByName("ModifyPsd")) {
            this.modifyPsdView = cv.action.addChildToScene(this, this.setSecondPsd, []);
            this.modifyPsdView.name = "ModifyPsd";
        }
        else {
            this.modifyPsdView = cc.director.getScene().getChildByName("ModifyPsd");
        }
    }

    initLanguage() {
        cc.find("editBox_bg/editBox_text", this.node).getComponent(cc.EditBox).placeholder = cv.config.getStringData("SecondaryPassword_editBox_bg_editBox_text");
        cc.find("title_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("SecondaryPassword_title_text");
        cc.find("des_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("SecondaryPassword_des_text");
        cc.find("hyperlink_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("SecondaryPassword_hyperlink_text");
        cc.find("ok_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("SecondaryPassword_ok_button");
    }

    registerMsg() {
        cv.MessageCenter.register("skipKycVerification", this.onMsgSkipKycVerification.bind(this), this.node);
        cv.MessageCenter.register("SecondaryPassword_checkSafeSuccess", this.checkSafeSuccess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("skipKycVerification", this.node);
        cv.MessageCenter.unregister("SecondaryPassword_checkSafeSuccess", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    checkSafeSuccess() {
        cc.find("editBox_bg/editBox_text", this.node).getComponent(cc.EditBox).string = "";
        cv.StatusView.show(true);
        cv.action.moveToAction(this.node, cv.Enum.action_FuncType.to_left, cv.Enum.action_FuncType.out,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * 0.5, 0), cc.v2(cv.config.WIDTH * -1.5, 0));

        // 请求kyc状态
        cv.worldNet.requestKYCVerificationStatus();
    }

    /**
     * kyc状态回调: 跳过kyc验证
     */
    onMsgSkipKycVerification(): void {
        cv.SHOP.ExchangeEvent();
    }

    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');
        cc.find("editBox_bg/editBox_text", this.node).getComponent(cc.EditBox).string = "";
        cv.StatusView.show(true);
        cv.action.moveToAction(this.node, cv.Enum.action_FuncType.to_right, cv.Enum.action_FuncType.out,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * 0.5, 0), cc.v2(cv.config.WIDTH * 1.5, 0));
    }

    onBtnSetSecondPsdClick() {
        cv.AudioMgr.playButtonSound('button_click');
        cc.find("editBox_bg/editBox_text", this.node).getComponent(cc.EditBox).string = "";
        cv.StatusView.show(true);
        this.modifyPsdView.getComponent(ModifyPassword).init(false, this.onBtnChangePsdBackClick.bind(this));

        cv.action.moveToAction(this.node, cv.Enum.action_FuncType.to_left, cv.Enum.action_FuncType.out,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * 0.5, 0), cc.v2(cv.config.WIDTH * -0.5, 0));

        this.modifyPsdView.getComponent(ModifyPassword).rightEnterToLeft();
    }

    onBtnChangePsdBackClick() {
        cv.StatusView.show(false);
        cv.action.moveToAction(this.node, cv.Enum.action_FuncType.to_right, cv.Enum.action_FuncType.enter,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * -0.5, 0), cc.v2(cv.config.WIDTH * 0.5, 0));

        this.modifyPsdView.getComponent(ModifyPassword).leftOutToRight();
    }

    onBtnSureClick() {
        cv.AudioMgr.playButtonSound('button_click');
        let str = cc.find("editBox_bg/editBox_text", this.node).getComponent(cc.EditBox).string;
        if (cc.sys.isBrowser && !cv.config.isSiyuType()) {
            cv.SHOP.setNewWindow(window.open("", "_blank"));
        }
        cv.worldNet.CheckSafe(str);
    }
}
