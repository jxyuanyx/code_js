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
import LabaView from "../hall/LabaView";
import RegisterView from "./RegisterView";
import UpgradeView from "./UpgradeView";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SetAccountAndPassword extends cc.Component {

    @property(cc.Prefab) protocol_prefab: cc.Prefab = null;
    @property(cc.Node) inputBg: cc.Node[] = [];  
    @property(cc.Node) inputBgChoice: cc.Node[] = [];  
    @property(cc.Node) inputBgError: cc.Node[] = [];  
    @property(cc.Node) inputTipsNode: cc.Node[] = [];  

    @property(cc.Node) account_input_node: cc.Node = null;
    @property(cc.Node) pass_input_node1: cc.Node = null;
    @property(cc.Node) pass_input_node2: cc.Node = null;

    @property(cc.Node) btnShowPass1: cc.Node = null;
    @property(cc.Node) btnShowPass2: cc.Node = null;
    @property(cc.Node) txtBtnback: cc.Node = null;  
    @property(cc.Node) okButton: cc.Node = null;  //确定

    private protocolNode: cc.Node = null;

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        this.initText();
        this.registerMsg();
        this.okButton.getComponent(cc.Button).interactable = false;
        //跟踪用户行为，发送事件
        cv.segmentTool.track(cv.Enum.CurrentScreen.account,cv.Enum.segmentEvent.ScreenOpened,cv.Enum.Functionality.registration);
    }

    start() {
        // if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
        //     let set_account_tips_text = this.node.getChildByName("set_account_tips_text").getComponent(cc.RichText);
        //     set_account_tips_text.maxWidth = 970;
        //     set_account_tips_text.lineHeight = 36;
        // }
    }

    initText() {

        this.txtBtnback.active = (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN);
        this.txtBtnback.getComponent(cc.Label).string = cv.config.getStringData("BackBtnTitle");

        cv.action.setText(this.node, "account_panel1/tipsNode/account_warning_text1", "Login_Scene_login_panel_account_warning_text1");
        cv.action.setText(this.node, "password_Panel/tipsNode/account_warning_text1", "Login_Scene_register_panel_limit_len");
        cv.action.setText(this.node, "password_Panel1/tipsNode/account_warning_text1", "Login_Scene_register_panel_passwd_diff");

        let text2: cc.Label = cc.find("account_warning_text2", this.node).getComponent(cc.Label)
        text2.string =  cv.StringTools.calculateAutoWrapString(text2.node, cv.config.getStringData("Login_Scene_login_panel_account_warning_text2"));
        cv.action.setText(this.node, "Text_4", "Login_Scene_login_panel_account_warning_text4");
        cv.action.setText(this.node, "ok_button/Label", "Login_Scene_login_panel_tourist_continue_button");

        cv.StringTools.setLabelString(this.node, "Text_4_0", "Login_Scene_register_panel_tips1");
        cv.StringTools.setLabelString(this.node, "Text_4_0/Text_4_0_0", "Login_Scene_register_panel_Text_4_0_0");
        let protocol_button: cc.Node = cc.find("Text_4_0/protocol_button", this.node);
        let text4: cc.Node = cc.find("Text_4_0", this.node);
        let protocolTxt: cc.Node = cc.find("Text_4_0/Text_4_0_0", this.node);
        protocolTxt.x = text4.width / 2 + 6;
        text4.x = -protocolTxt.width / 2 + 3;
        protocol_button.x = protocolTxt.x;

        cv.action.setText(this.node, "account_panel1/account_text", "Login_Scene_login_panel_phone_Panel_set_userName_text", true);
        cv.action.setText(this.node, "password_Panel/account_text", "Login_Scene_login_panel_password_Panel_password_text1", true);
        cv.action.setText(this.node, "password_Panel1/account_text", "Login_Scene_login_panel_password_Panel_password_text0", true);
        cv.action.setText(this.node, "nickname_Panel/account_text", "Login_Scene_login_panel_password_Panel_nickname_text", true);
    }

    registerMsg() {
        cv.MessageCenter.register("onSetAccountSuccess", this.onSetAccountSuccess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initText.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("onSetAccountSuccess", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    onSetAccountSuccess(msg: any) {
        console.log("onSetAccountSuccess");
        this.node.getParent().getComponent(LoginScene).switchLoginAndSetAccount(false);
    }

    onBtnMiddleClick() {
        cv.AudioMgr.playButtonSound('button_click');
        var account_text1 = cc.find("account_panel1/account_text", this.node).getComponent(cc.EditBox).string;
        var password_text1 = cc.find("password_Panel/account_text", this.node).getComponent(cc.EditBox).string;
        var password_text2 = cc.find("password_Panel1/account_text", this.node).getComponent(cc.EditBox).string;
        //var nickname_text = cc.find("nickname_Panel/account_text", this.node).getComponent(cc.EditBox).string;

        if (cv.tools.showError({
            kAccount0: account_text1,
            password0: password_text1,
            password1: password_text2,
        })) {
            return;
        }

        if (account_text1.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast3"), cv.Enum.ToastType.ToastTypeWarning);
            return;
        }

        //跟踪用户行为，发送事件
        let properties = { item: "nextButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.account, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
        //检查账号
        cv.httpHandler.requestCheckUserName(account_text1, password_text1);
        return;
        if (!cv.StringTools.isAccountFormat(account_text1) && cv.StringTools.isIncludeEn(account_text1)) {
            cv.MessageCenter.send("register_to_user_account");
        } else {
            cv.TT.showMsg(cv.config.getStringData("Login_Scene_login_panel_account_check_tips"), cv.Enum.ToastType.ToastTypeError);
        }
    }
    //此方法已弃用
    onBtnSureClick() {
        cv.AudioMgr.playButtonSound('button_click');
        var account_text1 = cc.find("account_panel1/account_text", this.node).getComponent(cc.EditBox).string;
        var password_text1 = cc.find("password_Panel/account_text", this.node).getComponent(cc.EditBox).string;
        var password_text2 = cc.find("password_Panel1/account_text", this.node).getComponent(cc.EditBox).string;
        //var nickname_text = cc.find("nickname_Panel/account_text", this.node).getComponent(cc.EditBox).string;

        if (cv.tools.showError({
            kAccount0: account_text1,
            password0: password_text1,
            password1: password_text2,
            //nickname: nickname_text,
        })) {
            return;
        }
    //此方法已弃用,老用户没有游戏账号，才调用
        cv.httpHandler.requestSetAccount(account_text1);
        cv.tools.SaveStringByCCFile("login_account", account_text1);
    }

    onClickBackButton(){
        cv.MessageCenter.send("exitSetAccountAndPassword");
        //跟踪用户行为，发送事件
        let properties = { item: "backButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.account, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
    }

    onBtnProtocolClick() {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.protocolNode) {
            this.protocolNode = cv.action.addChildToScene(this, this.protocol_prefab, [], cv.Enum.ZORDER_TYPE.ZORDER_TT, true);
        }
        this.protocolNode.active = true;
    }


    /**
     * name
     */
    public AccountUsernameEntered() {
        var account_text1 = cc.find("account_panel1/account_text", this.node).getComponent(cc.EditBox).string;

        let isValid = cv.tools.showError({
            kAccount0: account_text1,
        }, false);

        isValid = !cv.StringTools.isIncludeEn(account_text1);
   
        this.okButton.getComponent(cc.Button).interactable = account_text1.length > 0 ? true:false;

        if(account_text1.length <= 0){
            this.setInputStatus("usernameInput", 0);
        }else{
            this.setInputStatus("usernameInput", isValid?2:1);
        }
        //跟踪用户行为，发送事件
        let properties = { item: "usernameInput",isValid:!isValid };
        cv.segmentTool.track(cv.Enum.CurrentScreen.account,cv.Enum.segmentEvent.InputFieldValueEntered,cv.Enum.Functionality.registration,properties);
    }

    /**
     * name
     */
    public AccountPasswordEntered() {
        var password_text1 = cc.find("password_Panel/account_text", this.node).getComponent(cc.EditBox).string;
        var password_text2 = cc.find("password_Panel1/account_text", this.node).getComponent(cc.EditBox).string;

        let isValid = cv.tools.showError({
            password0: password_text1,
        }, false);

        if(password_text2.length > 0){
            if(password_text1 === password_text2 ){
                this.setTipsInputBg(2, 0);
                this.setInputStatus("passwordInput2", 1);
            }else{
                this.setTipsInputBg(2, 2);
                this.setInputStatus("passwordInput2", 2);
            }
        }

        if(password_text1.length <= 0){
            this.setInputStatus("passwordInput", 0);
        }else{
            this.setInputStatus("passwordInput", isValid?2:1);
        }
        //跟踪用户行为，发送事件
        let properties = { item: "passwordInput",isValid:!isValid };
        cv.segmentTool.track(cv.Enum.CurrentScreen.account,cv.Enum.segmentEvent.InputFieldValueEntered,cv.Enum.Functionality.registration,properties);
    }

    /**
     * name
     */
    public AccountPassword2Entered() {
        var password_text2 = cc.find("password_Panel1/account_text", this.node).getComponent(cc.EditBox).string;
        var password_text1 = cc.find("password_Panel/account_text", this.node).getComponent(cc.EditBox).string;

        let isValid = cv.tools.showError({
            password0: password_text1,
            password1: password_text2,
        }, false);


        if(password_text1 != password_text2 && password_text2.length > 0 && password_text1.length > 0){
            this.setTipsNodeShow(2, true);
        }else{
            this.setTipsNodeShow(2, false);
        }
     
        if(password_text2.length <= 0){
            this.setInputStatus("passwordInput2", 0);
        }else{
            this.setInputStatus("passwordInput2", isValid?2:1);
        }
    
        //跟踪用户行为，发送事件
        let properties = { item: "passwordConfirmInput",isValid:!isValid };
        cv.segmentTool.track(cv.Enum.CurrentScreen.account,cv.Enum.segmentEvent.InputFieldValueEntered,cv.Enum.Functionality.registration,properties);
    }

    public onBeginInputEdit(event: cc.Event, CustomEventData){

        let index = Number(CustomEventData) - 1;

        this.setTipsInputBg(index, 1);

        this.setTipsNodeShow(index, index == 2? false:true);
    }

    //显示输入框的背景
    //index: 0: 账号输入框  1: 密码输入框  2: 确认密码输入框
    //type:  0：正常背景（灰色） 1: 选中背景(黄色)  2: 错误背景（红色）
    private setTipsInputBg(index:number = 0, type:number = 0){

        for(let i = 0; i < this.inputBg.length; i++){
            this.inputBg[i].active = true;
        }
        for(let i = 0; i < this.inputBgChoice.length; i++){
            this.inputBgChoice[i].active = false;
        }
      
        if(type == 0){
            this.inputBgError[index].active = false;
            this.inputBg[index].active = true;
        }else if(type == 1){
            this.inputBgChoice[index].active = true;
            this.inputBg[index].active = false;
            this.inputBgError[index].active = false;
        }else if(type == 2){
            this.inputBgError[index].active = true;
            this.inputBg[index].active = false;
        }
    }

    //显示输入框的提示
    // 0: 账号输入框
    // 1: 密码输入框
    // 2: 确认密码输入框
    private setTipsNodeShow(index:number = 0, bShowTips:boolean = true){
        for(let i = 0; i < this.inputTipsNode.length; i++){
            this.inputTipsNode[i].active = false;
        }

        this.inputTipsNode[index].active = bShowTips;
        if(index == 0){  
            this.pass_input_node1.y = this.account_input_node.y -  256;
            this.pass_input_node2.y = this.account_input_node.y -  427;
        }else if(index == 1){
            this.pass_input_node1.y = this.account_input_node.y -  172;
            this.pass_input_node2.y = this.account_input_node.y -  434; 
        }else if(index == 2){
            this.pass_input_node1.y = this.account_input_node.y -  172;
            this.pass_input_node2.y = this.account_input_node.y -  346; 
        }
    }
    
    //密码 明文/密文 切换
    private onBtnShowPasswd(event: cc.Event, CustomEventData){
        cv.AudioMgr.playButtonSound('button_click');
        let index = Number(CustomEventData);
        let spHide = null;
        let spShow = null;
        let passEditBox = null;
        if(index == 0){
            passEditBox = this.pass_input_node1.getChildByName("account_text").getComponent(cc.EditBox);
            spHide =  this.btnShowPass1.getChildByName("spHide");
            spShow =  this.btnShowPass1.getChildByName("spShow");
        }else if(index == 1){
            passEditBox = this.pass_input_node2.getChildByName("account_text").getComponent(cc.EditBox);
            spHide =  this.btnShowPass2.getChildByName("spHide");
            spShow =  this.btnShowPass2.getChildByName("spShow");
        }

        if(spHide.active == true){
              spHide.active = false;
              spShow.active = true;
              passEditBox.inputFlag = cc.EditBox.InputFlag.SENSITIVE;
        }else{
              spHide.active = true;
              spShow.active = false;
              passEditBox.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        }
    }

    //输入框状态标志显示
    //inputType:  "usernameInput" :用户名输入
    //             "passwordInput" : 密码输入
    //             "passwordInput2": 密码确认输入
    //statusType:  输入状态
    //             0： 状态不显示  1 输入检测正常  2 输入检测不通过
    private setInputStatus(inputType:string, statusType:number){

        let spCheckOk:cc.Node = null;
        let spCheckWarn:cc.Node = null;
        let index = 0;
        if("usernameInput" == inputType){
            spCheckOk = this.account_input_node.getChildByName("spCheckOk");
            spCheckWarn = this.account_input_node.getChildByName("spCheckWarn");
            index = 0;
        }else if("passwordInput" == inputType){
            spCheckOk = this.pass_input_node1.getChildByName("spCheckOk");
            spCheckWarn = this.pass_input_node1.getChildByName("spCheckWarn");
            index = 1;
        }else if("passwordInput2" == inputType){
            spCheckOk = this.pass_input_node2.getChildByName("spCheckOK");
            spCheckWarn = this.pass_input_node2.getChildByName("spCheckWarn");
            index = 2;
        }

        if(spCheckOk == null || spCheckWarn == null){
            return;
        }

        if(statusType == 0){
            spCheckOk.active = false;
            spCheckWarn.active = false;
        }else if(statusType == 1){
            spCheckOk.active = true;
            spCheckWarn.active = false;
            this.setTipsInputBg(index, 1)
        }else if(statusType == 2){
            spCheckOk.active = false;
            spCheckWarn.active = true;
            this.setTipsInputBg(index, 2)
        }
    }

}
