import cv from "./../cv";
import LoginScene from "./LoginScene";
import BindDevice from "./BindDevice";
import { JumioKYCHandler } from "../../../common/security/JumioKYCHandler";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LoginView extends cc.Component {
    VESION_TIME: string = "version: 2019-03-23";
    public account: string = "";
    public psd: string = "";
    private bindDeviceView: cc.Node = null;
    @property(cc.Prefab) bindDevice_prefab: cc.Prefab = null;
    @property(cc.Node) btnForgetPass: cc.Node = null;
    @property(cc.Node) btnKefu: cc.Node = null;
    @property(cc.Node) btnTourist: cc.Node = null;

    onLoad() {
        this.initText();
        this.registerMsg();
        this.loadDefault();
        this.setViewData();

        if (cc.sys.os == cc.sys.OS_IOS) {
            cv.native.AuthLocation();
            console.log("99333");
        }

        if (cc.sys.isBrowser) {
            cv.native.initWebLocation();
        }

        cv.resMgr.setSpriteFrame(cc.find("Sprite_3", this.node), cv.config.getLogoPath(cv.Enum.SCENE.LOGIN_SCENE));
        //跟踪用户行为，发送事件
        cv.segmentTool.track(cv.Enum.CurrentScreen.Login, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.login);
    }

    loadDefault() {
        this.account = cv.tools.GetStringByCCFile("user_account");
        this.psd = cv.tools.GetStringByCCFile("user_password");
    }
    start() {
        let version_node = cc.find("version_node", this.node);
        let version_text = version_node.getChildByName("version_text");
        cc.find("line_Panel/kefu", this.node).active = true;
        version_node.active = true;
        version_text.getComponent(cc.Label).string = cv.config.GET_CLIENT_VERSION();
        this.node.getChildByName("version").getComponent(cc.Label).string = "";
        cc.find("account_Panel/account_text", this.node).on("text-changed", () => {
            let account = cc.find("account_Panel/account_text", this.node).getComponent(cc.EditBox).string;
            if (account.length <= 0) {
                cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).string = "";
            }
        });
        cc.find("password_Panel/btnShowPass/spHide", this.node).active = true;
        cc.find("password_Panel/btnShowPass/spShow", this.node).active = false;
    }

    onDestroy() {
        cv.MessageCenter.unregister("onLoginSuccess", this.node);
        cv.MessageCenter.unregister("goTobindDevice", this.node);
        cv.MessageCenter.unregister("goToLoginAccount", this.node);
        cv.MessageCenter.unregister("doKycVerification", this.node);
    }

    initText() {
        cc.find("account_Panel/account_text", this.node).getComponent(cc.EditBox).placeholder = cv.config.getStringData("Login_Scene_login_panel_phone_Panel_userName_text");
        let forgetLabel = cc.find("line_Panel/forget_PassWord/Label", this.node);
        cc.find("login_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_login_panel_login_button");
        cc.find("Sprite_3", this.node).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
        let rgslabel = cc.find("register_button/Label", this.node).getComponent(cc.Label);
        let rgsline = cc.find("register_button/register_button_line", this.node);
        rgslabel.string = cv.config.getStringData("Login_Scene_login_panel_register_button");
        cv.resMgr.getLabelStringSize(rgslabel, rgslabel.string);//这里设置一下，以获得当前帧文本的真实宽高
        rgsline.setContentSize(cc.size(rgslabel.node.getContentSize().width, rgsline.height));
        forgetLabel.getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_login_panel_forget_PassWord");
        cc.find("line_Panel/kefu/kefu_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_kefu");

        let touristLabel = cc.find("tourist_button/Label", this.node).getComponent(cc.Label);
        let tousistLine = cc.find("tourist_button/tourist_button_line", this.node);
        touristLabel.string = cv.config.getStringData("Login_Scene_login_panel_tourist_button");

        cv.resMgr.getLabelStringSize(touristLabel, touristLabel.string);//这里设置一下，以获得当前帧文本的真实宽高
        this.btnTourist.width = touristLabel.node.getContentSize().width + 10;
        tousistLine.setContentSize(cc.size(touristLabel.node.getContentSize().width, tousistLine.height));

        cv.action.setText(this.node, "account_Panel/account_text", "Login_Scene_login_panel_phone_Panel_userName_text", true);
        cv.action.setText(this.node, "password_Panel/password_text", "Login_Scene_login_panel_password_Panel_password_text", true);
        cv.resMgr.getLabelStringSize(forgetLabel.getComponent(cc.Label));
        cc.find("line_Panel/forget_PassWord/question_img", this.node).setPosition(forgetLabel.x - forgetLabel.width - 10, cc.find("line_Panel/forget_PassWord/question_img", this.node).y);

        cc.find("serverpanel", this.node).active = cv.config.GET_DEBUG_MODE() == 1;

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this.btnForgetPass.width = cv.resMgr.getLabelStringSize(this.btnForgetPass.getChildByName("Label").getComponent(cc.Label)).width + 10;
            this.btnKefu.width = cv.resMgr.getLabelStringSize(this.btnKefu.getChildByName("kefu_text").getComponent(cc.Label)).width + 50;
        }
    }

    registerMsg() {
        cv.MessageCenter.register("onLoginSuccess", this.onLoginSuccess.bind(this), this.node);
        cv.MessageCenter.register("goTobindDevice", this.goTobindDevice.bind(this), this.node);
        cv.MessageCenter.register("goToLoginAccount", this.onBtnLoginClick.bind(this), this.node);
        cv.MessageCenter.register("doKycVerification", this.onDoKycVerification.bind(this), this.node);

    }

    /**
     * name
     */
    public onDoKycVerification() {
        cv.TP.showMsg(cv.config.getStringData("AccountLocked_KYC_Required")
            , cv.Enum.ButtonStyle.TWO_BUTTON
            , this.startKYCProcess.bind(this));
    }
    onLoginSuccess(msg) {
        console.log("onLoginSuccess");

        if (!cv.dataHandler.getUserData().isTouristUser) {
            this.node.getParent().getComponent(LoginScene).saveAccountToFile();
        }
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }

    startKYCProcess(): void {
        console.log("startKYCProcess............");
        JumioKYCHandler.getInstance().startJumioProcess(true, this.onKYCFinished.bind(this), this.onKYCFinished.bind(this));
    }

    onKYCFinished() {
        cc.find("account_Panel/account_text", this.node).getComponent(cc.EditBox).string = "";
        cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).string = "";
        cv.netWorkManager.Logout();
    }

    goTobindDevice(): void {
        if (!cc.director.getScene().getChildByName("BindDevice")) {
            this.bindDeviceView = cv.action.addChildToScene(this, this.bindDevice_prefab, [], undefined, true);
            this.bindDeviceView.name = "BindDevice";
        }
        else {
            this.bindDeviceView = cc.director.getScene().getChildByName("BindDevice");
        }

        this.bindDeviceView.getComponent(BindDevice).init(this.bindDeviceBackClick.bind(this), this.node.getParent().getComponent(LoginScene).areaCode);
        this.node.getParent().getComponent(LoginScene).flagView = "BIND_DEVICE";
        cv.action.showActionBothLeft(this.bindDeviceView, this.node);
    }

    bindDeviceBackClick(): void {
        this.node.getParent().getComponent(LoginScene).flagView = "";
        cv.action.showActionBothRight(this.node, this.bindDeviceView);
    }

    onserverBtnLoginClick(evt, btnId) {
        console.log(cv.StringTools.formatC("%s", btnId));
        let as = Number(btnId);
        cv.dataHandler.setServerId(Number(btnId));
        //只有测试环境需要调用，清理之前的缓存域名
        cv.domainMgr.initLogin();
        this.tologin();
    }

    onBtnLoginClick() {
        cv.AudioMgr.playButtonSound('button_click');

        //只有测试环境需要调用，清理之前的缓存域名
        if (cv.config.GET_DEBUG_MODE() == 1) {
            cv.domainMgr.initLogin();
        }

        //跟踪用户行为，发送事件
        let properties = { item: "loginButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.Login, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.login, properties);
        let pro = { item: "loginButton", method: "platform" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.Login, cv.Enum.segmentEvent.LogInInitiated, cv.Enum.Functionality.login, pro);
        this.tologin();
    }

    private tologin() {

        let account = cc.find("account_Panel/account_text", this.node).getComponent(cc.EditBox).string;
        let password = cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).string;
        if (account.length == 0 || password.length == 0) {
            cv.TT.showMsg(cv.config.getStringData("ErrorCode9"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        cv.SwitchLoadingView.show(cv.config.getStringData("Loading_resource"));
        this.node.getParent().getComponent(LoginScene).saveAccountAndPsd(account, password);
        let resoult = cv.httpHandler.requestLoginByUserName(account, password);
        if (resoult == "no_wifi") {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast33"), cv.Enum.ToastType.ToastTypeError);

        }
    }

    private onBtnShowPasswd() {

        cv.AudioMgr.playButtonSound('button_click');
        let passEditBox = cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox);
        let spHide = cc.find("password_Panel/btnShowPass/spHide", this.node);
        let spShow = cc.find("password_Panel/btnShowPass/spShow", this.node);

        if (spHide.active == true) {
            spHide.active = false;
            spShow.active = true;
            passEditBox.inputFlag = cc.EditBox.InputFlag.SENSITIVE;
        } else {
            spHide.active = true;
            spShow.active = false;
            passEditBox.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        }
    }

    onBtnKefuClick() {
        cv.AudioMgr.playButtonSound('button_click');
        cv.httpHandler.getCustom();
    }

    setViewData() {
        if (cv.StringTools.getArrayLength(this.account) > 0) {
            cc.find("account_Panel/account_text", this.node).getComponent(cc.EditBox).string = this.account;
        }
        if (cv.StringTools.getArrayLength(this.psd) > 0) {
            cc.find("password_Panel/password_text", this.node).getComponent(cc.EditBox).string = this.psd;
        }
    }
}
