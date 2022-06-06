// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import cv from "./../cv";
import LoginView from "./LoginView";
import SetAccountAndPassword from "./SetAccountAndPassword";
import AreaView from "./AreaView";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import BindDevice from "./BindDevice";
import { RoleInfoSet } from "../hall/RoleInfoSet";
import { CollectPokerMapData } from "../../game/dzPoker/data/RecordData";
import RegisterView from "./RegisterView";
const { ccclass, property } = cc._decorator;
@ccclass
export default class UpgradeView extends cc.Component {

    @property(cc.Prefab) areaCode_prefab: cc.Prefab = null;
    @property(cc.Prefab) registerView_prefab: cc.Prefab = null;
    @property(cc.Prefab) setAccountAndPassword_prefab: cc.Prefab = null;
    @property(cc.Prefab) alwaysNode_prefab: cc.Prefab = null;
    @property(cc.Prefab) bindSiliao_prefab: cc.Prefab = null;  //绑定私聊预制件
    @property(cc.Prefab) roleset_prefab: cc.Prefab = null;

    @property(cc.SpriteFrame) circle_gray: cc.SpriteFrame = null;
    @property(cc.SpriteFrame) circle_light: cc.SpriteFrame = null;
    @property(cc.Prefab) registerTipDlg: cc.Prefab = null;

    public areaCode: cc.Node = null;
    public registerView: cc.Node = null;
    public setAccountAndPassword: cc.Node = null;
    public alwaysNode: cc.Node = null;
    public roleset: cc.Node = null;
    public siliaoNode: cc.Node = null;  
    public tipsDlg: cc.Node = null;

    flagView: string = "LOGIN_PANEL";
    registerCdTime: number = 0;
    forgetCdTime: number = 0;
    account: string = "";
    psd: string = "";
    isRequestCaptcha: boolean = false;

    private static _g_prefabInst: cc.Node = null;
    private _circleIndex = 1;
    private _totalCircleCount = 4;
    private _curTempCode:string = "";

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!UpgradeView._g_prefabInst) UpgradeView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(UpgradeView._g_prefabInst.uuid)) {
            if (!cc.isValid(UpgradeView._g_prefabInst, true)) {
                UpgradeView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return UpgradeView._g_prefabInst;
    }
    onLoad() {
        this.registerMsg();
        this.schedule(this.updateRegisterCdTime, 1);
        this.schedule(this.updateForgetCdTime, 1);
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);

        this.registerView = cc.instantiate(this.registerView_prefab);
        this.node.addChild(this.registerView);
        this.registerView.active = false;

        this.setAccountAndPassword = cc.instantiate(this.setAccountAndPassword_prefab);
        this.node.addChild(this.setAccountAndPassword);
        this.setAccountAndPassword.active = false;

        if(cv.config.isOpenSiyuVerify()){
            //添加私聊绑定节点
            this.siliaoNode = cc.instantiate(this.bindSiliao_prefab);
            this.node.addChild(this.siliaoNode);
            this.siliaoNode.active = false;
        }

        this.roleset = cc.instantiate(this.roleset_prefab);
        this.node.addChild(this.roleset);
        this.roleset.active = false;

        this.alwaysNode = cc.instantiate(this.alwaysNode_prefab);
        this.node.addChild(this.alwaysNode);
        this.alwaysNode.active = false;
        cv.resMgr.adaptWidget(this.alwaysNode);

        this.setAccountAndPassword.active = false;
        this.alwaysNode.active = false;
        this.roleset.active = false;
        this.setView(cv.Enum.ZORDER_TYPE.ZORDER_1, false);
        // this.setView(cv.Enum.ZORDER_TYPE.ZORDER_low, true);
        // this.scheduleOnce(function (dt) {
        //     this.setView(cv.Enum.ZORDER_TYPE.ZORDER_1, false);
        // }.bind(this), 0);

        //cc.game.addPersistRootNode(this.alwaysNode);//常驻节点
        //cv.netWorkManager.init();

        if (cv.config.isOverSeas()) {  //海外版设置默认区域为US+1
            this.updateAreaCode("US+1");
        }


        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
            this.updateAreaCode("VN+84");
        }else {
            this.updateAreaCode("CN+86");
        }

        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台

            cv.native.SYwebjsToClient("{\"cmd\":\"1001\"}");
            cv.native.SYwebjsToClient("{\"cmd\":\"1002\"}");
            cv.native.SYwebjsToClient("{\"cmd\":\"1004\"}");
        }
        if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
            this.showUpdate_registerPanel();
        }
        cv.resMgr.adaptWidget(this.node, true);


        //是否打开私语验证, 下面圆圈有四个
        let circle_panel = cc.find("circle_panel", this.alwaysNode);
        if(cv.config.isOpenSiyuVerify()){

            circle_panel.setContentSize(cc.size(250,150));
            circle_panel.x = circle_panel.x - 25;
            this._totalCircleCount = 4;
        }else{
    
            cc.find("circle_panel/circle_4", this.alwaysNode).active = false;
            this._totalCircleCount = 3;
        }
        
    }
    start() {
        this.initAreaCode();
        if (cv.httpHandler.hasFaileCache()) {
            cv.httpHandler.doLoginFaile(cv.httpHandler.getFaileCache());
        }
    }

    initAreaCode() {
        this.areaCode = cc.instantiate(this.areaCode_prefab);
        this.node.addChild(this.areaCode);
        this.areaCode.active = false;
        this.areaCode.getComponent(AreaView).getAreaCallback = this.updateAreaCode.bind(this);
        this.areaCode.getComponent(AreaView).exitAreaCallback = this.onBtnExitAreaCodeClick.bind(this);
    }

    //为动作做准备
    setView(zorder, isView) {
        this.registerView.zIndex = zorder;
        this.setAccountAndPassword.zIndex = zorder;

        this.registerView.active = isView;
        this.setAccountAndPassword.active = isView;
    }

    onDestroy() {
        this.unschedule(this.updateForgetCdTime);
        this.unschedule(this.updateRegisterCdTime);
        cv.MessageCenter.unregister("onGetRegisterVCodeSuccess", this.node);
        cv.MessageCenter.unregister("onGetForgetVCodeSuccess", this.node);
        cv.MessageCenter.unregister("login_Lock", this.node);
        cv.MessageCenter.unregister("toRelogin", this.node);
        cv.MessageCenter.unregister("exitRegister", this.node);
        cv.MessageCenter.unregister("getIdcode", this.node);
        cv.MessageCenter.unregister("exitSetAccountAndPassword", this.node);
        cv.MessageCenter.unregister("exitRoleInfoSet", this.node);
        cv.MessageCenter.unregister("AlwaysNode_Active", this.node);
        cv.MessageCenter.unregister("register_to_bindSiliao", this.node);
        cv.MessageCenter.unregister("onExitBindSiliaoClick", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    registerMsg() {
        cv.MessageCenter.register("onGetRegisterVCodeSuccess", this.onGetRegisterVCodeSuccess.bind(this), this.node);
        cv.MessageCenter.register("onGetForgetVCodeSuccess", this.onGetForgetVCodeSuccess.bind(this), this.node);
        cv.MessageCenter.register("login_Lock", this.loginLock.bind(this), this.node);
        cv.MessageCenter.register("register_to_user_account", this.onMiddleSuccess.bind(this), this.node);
        cv.MessageCenter.register("toRelogin", this.toRelogin.bind(this), this.node);
        cv.MessageCenter.register("exitRegister", this.onBtnExitRegisterClick.bind(this), this.node);
        cv.MessageCenter.register("getIdcode", this.onBtnGetIdCodeClick.bind(this), this.node);
        cv.MessageCenter.register("exitSetAccountAndPassword", this.onExitSetAccountClick.bind(this), this.node);
        cv.MessageCenter.register("exitRoleInfoSet", this.onBtnBackFromRoleInfo.bind(this), this.node);
        cv.MessageCenter.register("onExitBindSiliaoClick", this.onExitBindSiliaoClick.bind(this), this.node);
        cv.MessageCenter.register("register_to_bindSiliao", this.onBindSiliaoSucces.bind(this), this.node);
        cv.MessageCenter.register("AlwaysNode_Active", this.AlwaysNode_Ative.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }


    private showRegisterTipDlg(content:string){
        if(this.tipsDlg == null){
            this.tipsDlg = cc.instantiate(this.registerTipDlg);
            this.node.addChild(this.tipsDlg);
            this.tipsDlg.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_TOP;
        }
        this.tipsDlg.active = true;

        cc.find("dlg/btnSure/Label", this.tipsDlg).getComponent(cc.Label).string =  cv.config.getStringData("Confirm");
        cc.find("dlg/btnCancel/Label", this.tipsDlg).getComponent(cc.Label).string =  cv.config.getStringData("Cancel");
        // 添加点击事件
        cc.find("dlg/btnSure", this.tipsDlg).on("click", this.registerIdCode, this);
        cc.find("dlg/btnCancel", this.tipsDlg).on("click", this.cancleRegisterCode, this);
        cc.find("dlg/tipsTitle", this.tipsDlg).getComponent(cc.Label).string = content;
    }

    public AlwaysNode_Ative(isShow: boolean) {
        //this.alwaysNode.active = isShow;
    }
    
    initLanguage() {
        this.updateCircle(this._circleIndex);
    }
    /**
     * 升级完成重新登录。
     */
    toRelogin() {
        this.onlySaveAccountToFile();
        cv.httpHandler.requestLogout();
    }

    onBtnForgetPsdClick() {
        cv.AudioMgr.playButtonSound('button_click');
    }

    onBtnExitForgetPsdClick() {
        cv.AudioMgr.playButtonSound('back_button');
    }

    onBtnRegisterClick() {
        this.registerView.active = true;
        this.registerView.getComponent(RegisterView).initText();
        cv.AudioMgr.playButtonSound('button_click');
        //cv.action.showActionBothLeft(this.registerView, this.loginView, cv.action.delay_type.NORMAL);
        cv.httpHandler.requestCaptcha();
        this.updateCircle(1);
    }
    /**
     * 直接显示升级账号界面(实为注册界面，只是标题不一样)
     */
    showUpdate_registerPanel() {
        this.registerView.active = true;
        cv.httpHandler.requestCaptcha();
        this.updateCircle(1);
    }
    onBtnBackFromRoleInfo() {
        cv.AudioMgr.playButtonSound('button_click');
        if(cv.config.isOpenSiyuVerify()){
            //打开私聊绑定
            cv.action.showActionBothRight(this.siliaoNode, this.roleset, cv.action.delay_type.NORMAL);
            this.roleset.active = true;
            this.updateCircle(3);
        }else{
            cv.action.showActionBothRight(this.setAccountAndPassword, this.roleset, cv.action.delay_type.NORMAL);
            this.roleset.active = true;
            this.updateCircle(2);
        }
    }
    //退出升级账号
    onBtnExitRegisterClick() {
        cv.dataHandler.getUserData().isOpenUpdateUserMode = false;
        cv.AudioMgr.playButtonSound('back_button');
        this.node.active = false;
        cv.MessageCenter.send("HideWebview_ShowWindows", true);
        cv.dataHandler.cancleUpgradeAccount();
    }

    onBtnAreaCodeClick(event: cc.Event, CustomEventData) {
        this.flagView = CustomEventData;
        this.areaCode.getComponent(AreaView).setDefaultCode(this._curTempCode);
        this.areaCode.active = true;
        this.registerView.active = false;
    }

    onBtnExitAreaCodeClick() {
        if (this.flagView === "LOGIN_PANEL") {
            //this.loginView.active = true;
        }
        else if (this.flagView === "REGISTER_PANEL") {
            this.registerView.active = true;
            this.updateCircle(1);
        }
        else if (this.flagView === "FORGET_PANEL") {
            //this.forgetView.active = true;
        }
        else if (this.flagView === "BIND_DEVICE") {
            let bind_device = cc.director.getScene().getChildByName("BindDevice");
            if (bind_device) {
                bind_device.active = true;
            }
        }
    }

    onCheckRegisterIdCodeSuccess() {
        cv.action.showActionBothLeft(this.setAccountAndPassword, this.registerView, cv.action.delay_type.FAST);
        this.updateCircle(2);
    }

    //=================手机号码国际区号==================
    updateAreaCode(codeTemp: string) {

        this._curTempCode = codeTemp;
        let commaPos = codeTemp.lastIndexOf("+");
        let countryIsoCode =  codeTemp.substring(commaPos, codeTemp.length);
        
        cc.find("phone_Panel/areaCode_text", this.registerView).getComponent(cc.Label).string = countryIsoCode;
        if (countryIsoCode.length > 5) {
            cc.find("phone_Panel/areaCode_text", this.registerView).getComponent(cc.Label).fontSize = 38;
        }

        let regAreaFlag = cc.find("phone_Panel/areaFlag", this.registerView); //注册界面国旗
        cv.resMgr.setSpriteFrame(regAreaFlag, "zh_CN/hall/areaFlag/" + codeTemp);

        if (this.flagView === "BIND_DEVICE") {
            let bind_device = cc.director.getScene().getChildByName("BindDevice");
            if (bind_device) {
                bind_device.getComponent(BindDevice).updateAreaCode(countryIsoCode);
            }
        }
        this.onBtnExitAreaCodeClick();
    }

    getAreaCodeData() {
        /*let codeStr = cc.find("phone_Panel/bg_white_0/areaCode_text", this.loginView).getComponent(cc.Label).string;
        let pos = codeStr.indexOf("+");
        codeStr = codeStr.substring(pos + 1, codeStr.length);
        return codeStr;*/
    }

    onMiddleSuccess() {
        if(cv.config.isOpenSiyuVerify()){ //开启了私聊验证，
            cv.action.showActionBothLeft(this.siliaoNode, this.setAccountAndPassword, cv.action.delay_type.NORMAL);
        }else{
            cv.action.showActionBothLeft(this.roleset, this.setAccountAndPassword, cv.action.delay_type.NORMAL);
        }
        this.updateCircle(3);
    }

    //绑定私聊成功
    onBindSiliaoSucces(){
        cv.action.showActionBothLeft(this.roleset, this.siliaoNode, cv.action.delay_type.NORMAL);
        this.updateCircle(4);
    }

    //===================获取验证码====================
    onGetRegisterVCodeSuccess(msg) {
        console.log("onGetRegisterVCodeSuccess");
        if (msg.msg_code != "0") {
            this.showCdTime(0, true);
        }
    }

    onGetForgetVCodeSuccess(msg) {
        console.log("onGetForgetVCodeSuccess");
        if (msg.msg_code != "0") {
            this.showCdTime(0, false);
        }
    }

    loginLock(msg) {
        console.log("loginLock");
        cv.TP.showMsg(msg, cv.Enum.ButtonStyle.GOLD_BUTTON, this.gotoForgetPass.bind(this));
    }

    gotoForgetPass() {
        this.onBtnForgetPsdClick();
    }

    updateRegisterCdTime() {
        if (this.registerCdTime < 1) return;

        this.registerCdTime--;
        this.showCdTime(this.registerCdTime, true);
    }

    updateForgetCdTime() {
        if (this.forgetCdTime < 1) return;

        this.forgetCdTime--;
        this.showCdTime(this.forgetCdTime, false);
    }

    onBtnGetIdCodeClick() {
        let phoneNum;
        let codeStr;
        if (this.registerView.active) {
            if (this.registerCdTime > 0) return;
            phoneNum = cc.find("phone_Panel/phoneNumber_text", this.registerView).getComponent(cc.EditBox).string;
            codeStr = cc.find("phone_Panel/areaCode_text", this.registerView).getComponent(cc.Label).string;
        }
        else {
            return;
        }
        let pos = codeStr.indexOf("+");
        codeStr = codeStr.substring(pos, codeStr.length);//需要“+”
        let content = cv.config.getStringData("RegisterTips1").replace("%s", codeStr + " " + phoneNum);

        if (cv.tools.showError({
            phoneNum: phoneNum,
            AreaCode: codeStr,
        })) {
            return;
        }

        if (this.registerView.active) {

            this.showRegisterTipDlg(content);
            //为了弹窗统一成登录注册得风格，不再使用公用弹框。
            //cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, this.registerIdCode.bind(this), null);
        }
    }

    cancleRegisterCode() {
        cv.AudioMgr.playButtonSound('button_click');
        this.tipsDlg.active = false;
    }

    registerIdCode() {
        cv.AudioMgr.playButtonSound('button_click');
        this.tipsDlg.active = false;

        let phoneNum;
        let url;

        let codeStr = cc.find("phone_Panel/areaCode_text", this.registerView).getComponent(cc.Label).string;
        let pos = codeStr.indexOf("+");
        codeStr = codeStr.substring(pos + 1, codeStr.length);

        if (this.registerView.active) {
            phoneNum = cc.find("phone_Panel/phoneNumber_text", this.registerView).getComponent(cc.EditBox).string;
            let captcha = cc.find("tiaoCode/captcha_bg/captcha_text", this.registerView).getComponent(cc.EditBox).string;
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cv.httpHandler.requestUpdateGradeVCode(phoneNum, codeStr, captcha);
            } else {
                cv.httpHandler.requestRegisterVCode(phoneNum, codeStr, captcha);
            }
            this.showCdTime(60, true);
        }
    }

    showCdTime(index: number, isRegister: boolean) {
        if (isRegister) {
            this.registerCdTime = index;
            let rcodeLabel = cc.find("setPassword_Panel/identify_button/Label", this.registerView).getComponent(cc.Label);


            let isTrue = (index != 0);
            if (isTrue) {
                rcodeLabel.string = this.registerCdTime + 's';
            }
            else {
                rcodeLabel.string = cv.config.getStringData("getCode");
            }
        }
    }

    onFinishRegisterSuccess() {
        cv.action.showActionBothLeft(this.setAccountAndPassword, this.roleset, cv.action.delay_type.NORMAL);
    }

    saveAccountAndPsd(account: string, psd: string) {
        this.account = account;
        this.psd = psd;
    }

    saveAccountToFile() {
        if (this.account != null) {
            cv.tools.SaveStringByCCFile("user_account", this.account);
        }
        cv.tools.SaveStringByCCFile("user_password", this.psd);
    }

    /**
     * 只存储账号
     */
    onlySaveAccountToFile() {
        if (this.account != null) {
            cv.tools.SaveStringByCCFile("user_account", this.account);
        }
        cv.tools.SaveStringByCCFile("user_password", "");
    }
    onExitSetAccountClick() {
        cv.AudioMgr.playButtonSound('back_button');

        cv.action.showActionBothRight(this.registerView, this.setAccountAndPassword, cv.action.delay_type.NORMAL);
        this.updateCircle(1);
    }

    //从绑定私聊到上一步
    onExitBindSiliaoClick() {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showActionBothRight(this.setAccountAndPassword, this.siliaoNode, cv.action.delay_type.NORMAL);
        this.updateCircle(2);
    }

    getinvateCode(): string {
        var invateCode = cc.find("invate_code_panel/invateCode_text", this.registerView).getComponent(cc.EditBox).string;
        return invateCode;
    }

    updateCircle(index: number = this._circleIndex): void {
        return;
        this.alwaysNode.active = true;
        this._circleIndex = index;

        let count = this._totalCircleCount + 1;
        
        for (let i = 1; i < count; i++) {
            if (i == index) {
                cc.find("circle_panel/circle_" + i, this.alwaysNode).getComponent(cc.Sprite).spriteFrame = this.circle_light;
                cc.find("circle_panel/circle_" + i, this.alwaysNode).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
            }
            else {
                cc.find("circle_panel/circle_" + i, this.alwaysNode).getComponent(cc.Sprite).spriteFrame = this.circle_gray;
                cc.find("circle_panel/circle_" + i, this.alwaysNode).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
            }
        }

        if (index == 1) {
            cc.find("back_button", this.alwaysNode).active = true;
            cc.find("next_button", this.alwaysNode).active = true;
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cc.find("back_button/previous_text", this.alwaysNode).getComponent(cc.Label).string = cv.config.getStringData("BackBtnTitle");
            } else {
                cc.find("back_button/previous_text", this.alwaysNode).getComponent(cc.Label).string = cv.config.getStringData("LoginBtnText");
            }
            cc.find("next_button/next_text", this.alwaysNode).getComponent(cc.Label).string = cv.config.getStringData("NextBtnText");
            //cc.find("next_button/next_text", this.alwaysNode).color = new cc.Color(32, 74, 115);
        }
        else if (index == count - 1) { //最后一个界面
            //
            cc.find("back_button", this.alwaysNode).active = true;
            cc.find("next_button", this.alwaysNode).active = false;
            cc.find("back_button/previous_text", this.alwaysNode).getComponent(cc.Label).string = cv.config.getStringData("LastStep");
        } 
        else{
            cc.find("back_button", this.alwaysNode).active = true;
            cc.find("next_button", this.alwaysNode).active = true;
            cc.find("back_button/previous_text", this.alwaysNode).getComponent(cc.Label).string = cv.config.getStringData("LastStep");
            cc.find("next_button/next_text", this.alwaysNode).getComponent(cc.Label).string = cv.config.getStringData("NextBtnText");
            //cc.find("next_button/next_text", this.alwaysNode).color = new cc.Color(32, 74, 115);
        }
    }

    /**
     * 程序切回前台通知
     */
    public OnAppEnterForeground() {
        let num = cv.config.logTime("loginScene OnAppEnterForeground  切回前台");
        num = Math.ceil(num);
        this.registerCdTime = num < this.registerCdTime ? this.registerCdTime - num : 0;
        //立即刷新时间
        if (this.registerCdTime != 0) {
            this.updateRegisterCdTime();
        }
        this.forgetCdTime = num < this.forgetCdTime ? this.forgetCdTime - num : 0;
        //立即刷新时间
        if (this.forgetCdTime != 0) {
            this.updateForgetCdTime();
        }
    }
    /**
     * 程序切入后台通知
     */
    public OnAppEnterBackground() {
        cv.config.logTime("loginScene OnAppEnterForeground  切入前台");
    }
}