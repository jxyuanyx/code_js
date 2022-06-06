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
const { ccclass, property } = cc._decorator;
/**
 * 使用说明，保持一份
 * if (!cc.director.getScene().getChildByName("ModifyPsd")) {
            this.modifyPsdView = cv.action.addChildToScene(this, this.setSecondPsd, []);
            this.modifyPsdView.name = "ModifyPsd";
        }
        else {
            this.modifyPsdView = cc.director.getScene().getChildByName("ModifyPsd");
        }
        this.modifyPsdView.getComponent(ModifyPassword).init(false, this.onBtnChangePsdBackClick.bind(this));
 */
@ccclass
export default class ModifyPassword extends cc.Component {

    @property(cc.Node)
    ModifyPassword_panel: cc.Node = null;

    @property(cc.Node) inputBg: cc.Node[] = [];  
    @property(cc.Node) inputBgChoice: cc.Node[] = [];  
    @property(cc.Node) inputBgError: cc.Node[] = [];  
    @property(cc.Node) inputTipsNode: cc.Node[] = [];  

    @property(cc.Node) code_input_node: cc.Node = null;
    @property(cc.Node) pass_input_node1: cc.Node = null;
    @property(cc.Node) pass_input_node2: cc.Node = null;

    @property(cc.Node) btnShowPass1: cc.Node = null;
    @property(cc.Node) btnShowPass2: cc.Node = null;

    @property(cc.Node) tipDesc: cc.Node = null;
    @property(cc.Node) tipPhone: cc.Node = null;
    @property(cc.Node) txtBtnback: cc.Node = null;  
    @property(cc.Node) okButton: cc.Node = null;  
    @property(cc.Node) resultDlg: cc.Node = null;  

    _cdGetCodeTime: number = 0;
    _logintimestamp: number = 0;
    _isCdCodeing: boolean = false;
    _isChangeLoginPsd: boolean = false;

    _cdGetCodeTimes: number = 0;
    _timestamp: number = 0;
    _isCdCodeings: boolean = false;
    _backClickCallBack: Function = null;

    private passInputNode_y:number = 0;

    onLoad() {
        this.registerMsg();
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); }, this);
        cv.resMgr.adaptWidget(this.node);
        cv.action.listenEditboxLimitNum(cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox));
   
    }

    start() {

        this.tipPhone.active = false;
        this.tipDesc.active = false;

        cv.resMgr.adaptWidget(this.pass_input_node2);
        this.passInputNode_y = this.pass_input_node2.y;
       
    }
    onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        cv.MessageCenter.unregister("ModifyPassword_vcode_succ", this.node);
        cv.MessageCenter.unregister("ModifyPassword_OnClear", this.node);
       
    }

    onEnable(){
        this.resultDlg.active = false;
        let code_str = this.code_input_node.getChildByName("forget_setInvateCode_text").getComponent(cc.EditBox).string;
        this.okButton.getComponent(cc.Button).interactable = code_str.length > 0 ? true:false; 
        this.resetPageStatus();
    }

    registerMsg() {
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        cv.MessageCenter.register("ModifyPassword_vcode_succ", this.OnResetPassVCodeCallBack.bind(this), this.node);
        cv.MessageCenter.register("ModifyPassword_OnClear", this.onResetSuccess.bind(this), this.node);
    }

    OnAppEnterBackground() {
        this.stopCd();
    }

    OnAppEnterForeground() {
        this.calculationCd();
    }

    init(isChangeLoginPsd: boolean, backClickCallBack: Function) {
        this.initText(isChangeLoginPsd);
        this._backClickCallBack = backClickCallBack;
        cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
        this.calculationCd();
    }

    initText(isChangeLoginPsd: boolean) {
        this._isChangeLoginPsd = isChangeLoginPsd;


        this.txtBtnback.active = (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN);
        this.txtBtnback.getComponent(cc.Label).string = cv.config.getStringData("BackBtnTitle");
        cv.StringTools.setLabelString(this.resultDlg, "dlg/tips", "Login_Scene_register_tips_sucess");

        cc.find("code_panel/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string = "";
        cc.find("code_panel_0/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string = "";
        cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string = "";

        cc.find("code_panel/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("ModifyPassword_ModifyPassword_panel_code_panel_password_text");
        cc.find("code_panel_0/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("ModifyPassword_ModifyPassword_panel_code_panel_0_password_text");

        cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
        cc.find("fok_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("TipsPanel_sure0_button");
        if (this._isChangeLoginPsd) {
            cc.find("title_text", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("ChoosePassword_modify_button_login_text");
            cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox).placeholder
                = cv.config.getStringData("Login_Scene_register_panel_setPassword_Panel_identifynum_text");
        }
        else {
            cc.find("title_text", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("ChoosePassword_twolevel_button_twolevel_text");
            cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("VCodeEditboxText");
        }

        let guard_text = cc.find("guard_phone_panel/guard_text", this.ModifyPassword_panel);
      
        let phonenumber_text = cc.find("guard_phone_panel/phonenumber_text", this.ModifyPassword_panel);
        let offsetX = 20;
        if(cv.config.isOpenSiyuVerify() && cv.dataHandler.getUserData().verityType == cv.Enum.VerityGetType.AppGet_Get){
            //当前是私聊验证码模式
            guard_text.getComponent(cc.Label).string = cv.config.getStringData("siyu_siliao_account");
            phonenumber_text.getComponent(cc.Label).string = "(" + cv.dataHandler.getUserData().sl_account + ")";

            cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("siyu_input_tips01");
            offsetX = 15;
        }else{
            //当前手机验证码模式
            guard_text.getComponent(cc.Label).string = cv.config.getStringData("ModifyPassword_ModifyPassword_panel_guard_text");
            phonenumber_text.getComponent(cc.Label).string = "(" + cv.dataHandler.getUserData().mobile + ")";

            this.tipPhone.getComponent(cc.Label).string = cv.dataHandler.getUserData().mobile;
            this.tipDesc.getComponent(cc.Label).string = cv.config.getStringData("Modify_password_desc");
            cv.resMgr.adaptWidget(this.tipDesc);
            this.tipPhone.y = this.tipDesc.y  -  cv.resMgr.getLabelStringSize(this.tipDesc.getComponent(cc.Label)).height/2;
        }


        cc.find("titlePass", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("Modify_password_title");;
        cc.find("tipNode/txt", this.code_input_node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panel_regiest_tips_text");;
        cc.find("tipNode/txt", this.pass_input_node1).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_login_panel_password_Panel_password_text1");;
        cc.find("tipNode/txt", this.pass_input_node2).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panel_passwd_diff");;


        cv.resMgr.adaptWidget(phonenumber_text);
        cv.resMgr.adaptWidget(guard_text);
        cv.resMgr.getLabelStringSize(guard_text.getComponent(cc.Label));
        phonenumber_text.setPosition(cc.v2(guard_text.position.x + guard_text.getContentSize().width + offsetX, phonenumber_text.position.y));
    }

    stopCd() {
        this.unschedule(this.UpdateTime.bind(this));
        this.unschedule(this.UpdateTimes.bind(this));
        let date: Date = new Date();
        if (this._isChangeLoginPsd) {
            this._logintimestamp = date.getTime();
        }
        else {
            this._timestamp = date.getTime();
        }
    }

    calculationCd() {
        let currentTime = (new Date()).getTime();
        if (this._isChangeLoginPsd) {
            let timeDiff = Math.floor((currentTime - this._logintimestamp) / 1000);
            if (this._isCdCodeing == false || (this._logintimestamp != 0 && timeDiff >= this._cdGetCodeTime)) {
                this._cdGetCodeTime = 0;
                this._logintimestamp = 0;
                this.resetTime();
            }
            else {
                this._cdGetCodeTime = this._cdGetCodeTime - timeDiff;
            }
        }
        else {
            let timeDiff = Math.floor((currentTime - this._timestamp) / 1000);
            if (this._isCdCodeings == false || (this._timestamp != 0 && timeDiff >= this._cdGetCodeTimes)) {
                this._cdGetCodeTimes = 0;
                this._timestamp = 0;
                this.resetTimes();
            }
            else {
                this._cdGetCodeTimes = this._cdGetCodeTimes - timeDiff;
            }
        }
    }

    onBtnBackClick() {
        this.stopCd();
        cv.AudioMgr.playButtonSound('back_button');
        if (this._backClickCallBack) {
            this._backClickCallBack();
        }
    }

    onBtnInvateCodeClick() {
        cv.AudioMgr.playButtonSound('button_click');
        let kAccount = cv.dataHandler.getUserData().mobile;
        let kAreaCode = cv.dataHandler.getUserData().areaCode.toString();

        if (this._isChangeLoginPsd) {
            if (this._isCdCodeing) return;
            cv.httpHandler.ResetPassVCode(kAccount, kAreaCode);
        }
        else {
            if (this._isCdCodeings) return;
            cv.httpHandler.GetTwoLevelVCode(kAccount, kAreaCode);
        }

        this.tipPhone.active = true;
        this.tipDesc.active = true;
    }

    onBtnSureClick() {
        cv.AudioMgr.playButtonSound('button_click');
        let kAccount = cv.dataHandler.getUserData().mobile;
        let kVCode = cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string;
        let kAreaCode = cv.dataHandler.getUserData().areaCode.toString();
        let kPassword1 = cc.find("code_panel/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string;
        let kPassword2 = cc.find("code_panel_0/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string;

        if (cv.StringTools.getArrayLength(kVCode) <= 0) {
            cv.TT.showMsg(cv.config.getStringData("VCodeEditboxText"), cv.Enum.ToastType.ToastTypeWarning);
            return;
        }

        if (kPassword1 != kPassword2) {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast17"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        if (cv.StringTools.getArrayLength(kPassword1) < 6 || cv.StringTools.getArrayLength(kPassword1) > 14) {
            cv.TT.showMsg(cv.config.getStringData("ErrorCode7"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        if (kPassword1.search(" ") != -1) {
            cv.TT.showMsg(cv.config.getStringData("recetPassWord_recetPassWord_panel_des_text"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        if (this._isChangeLoginPsd) {
            cv.httpHandler.ResetPassword(kAccount, kPassword1, kVCode, kAreaCode);
        }
        else {
            cv.httpHandler.SubmitTwoLevelPwd(kAccount, kPassword1, kVCode, kAreaCode);
        }

    }

    resetTime() {
        this.unschedule(this.UpdateTime);
        this._isCdCodeing = false;
    }
    resetTimes() {
        this.unschedule(this.UpdateTimes);
        this._isCdCodeings = false;
    }

    OnResetPassVCodeCallBack() {
        if (this._isChangeLoginPsd == true) {
            this.unschedule(this.UpdateTime);
            this.schedule(this.UpdateTime, 1.0);
            this._isCdCodeing = true;

            this._cdGetCodeTime = 60;
        } else {
            this.unschedule(this.UpdateTimes);
            this.schedule(this.UpdateTimes, 1.0);
            this._isCdCodeings = true;

            this._cdGetCodeTimes = 60;
        }
    }

    UpdateTime(dt: number) {
        if (!this._isChangeLoginPsd) {
            // if (this._cdGetCodeTime > 0) {
            //     this._cdGetCodeTime -= 1;
            // }
            return;
        }
        if (this._cdGetCodeTime > 0) {
            this._cdGetCodeTime -= 1;
        }
        else {
            this.resetTime();
            cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
            return;
        }

        cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string
            = cv.StringTools.formatC(cv.config.getStringData("getCodeAgain"), this._cdGetCodeTime);
    }
    UpdateTimes(dt: number) {
        if (this._isChangeLoginPsd) {
            // if (this._cdGetCodeTimes > 0) {
            //     this._cdGetCodeTimes -= 1;
            // }
            return;
        }
        if (this._cdGetCodeTimes > 0) {
            this._cdGetCodeTimes -= 1;
        }
        else {
            this.resetTimes();
            cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
            return;
        }
        cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string
            = cv.StringTools.formatC(cv.config.getStringData("getCodeAgain"), this._cdGetCodeTimes);
    }

    onResetSuccess(msg:any){
        this.okButton.getComponent(cc.Button).interactable = false;
        if(msg == "ResetPasswordSucc" ){
            this.resultDlg.active = true;
            this.resultDlg.runAction(cc.sequence(cc.delayTime(2.0),
                                    cc.callFunc(function(){
                                        cv.netWorkManager.Logout();
                                    })));
            return;
        }else if(msg == "TwoLevelSubmitSucc"){
            this.resultDlg.active = true;
            let self = this;
            this.resultDlg.runAction(cc.sequence(cc.delayTime(2.0),
                                    cc.callFunc(function(){
                                        self.OnClear();
                                    })));
       
        }else{
            this.OnClear();
        }
    }
    OnClear() {
     
        this.onBtnBackClick();

        this.setInputStatus("passwordInput", 0);
        this.setInputStatus("passwordInput2", 0);
        this.tipPhone.active = false;
        this.tipDesc.active = false;
        
        cc.find("code_panel/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string = "";
        cc.find("code_panel_0/password_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string = "";
        cc.find("enter_code_panel/getInvateCode_button/Label", this.ModifyPassword_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
        cc.find("enter_code_panel/forget_setInvateCode_text", this.ModifyPassword_panel).getComponent(cc.EditBox).string = "";

    }

    rightEnterToLeft() {
        cv.action.moveToAction(this.node, cv.Enum.action_FuncType.to_left, cv.Enum.action_FuncType.enter,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * 1.5, 0), cc.v2(cv.config.WIDTH * 0.5, 0));
    }

    leftOutToRight() {
        cv.action.moveToAction(this.node, cv.Enum.action_FuncType.to_right, cv.Enum.action_FuncType.out,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * 0.5, 0), cc.v2(cv.config.WIDTH * 1.5, 0));
    }


    
    //点击输入框
    public onBeginInputEdit(event: cc.Event, CustomEventData){

        let index = Number(CustomEventData) - 1;

        this.setTipsInputBg(index, 1);
        if(index == 1){
            this.setTipsNodeShow(index, true);
        }
    }

     //离开输入框
     public onEndInputEdit(event: cc.Event, CustomEventData){

        let index = Number(CustomEventData) - 1;

        let password_text1 = this.pass_input_node1.getChildByName("password_text").getComponent(cc.EditBox).string;
        let password_text2 = this.pass_input_node2.getChildByName("password_text").getComponent(cc.EditBox).string;

        this.setTipsNodeShow(1, false);

        if(password_text1.length > 0 && password_text2.length > 0 && password_text1 != password_text2){
            this.setTipsNodeShow(2, true); //密码是否匹配
        }else{
            this.setTipsNodeShow(2, false); //密码是否匹配
        }

        if(index == 0){
            let code_str = this.code_input_node.getChildByName("forget_setInvateCode_text").getComponent(cc.EditBox).string;
            this.okButton.getComponent(cc.Button).interactable = code_str.length > 0 ? true:false; 


        }else if(index == 1){  //密码输入框1
            let isValid = cv.tools.showError({
                password0: password_text1,
            }, false);
    
            if(password_text1.length <= 0){
                this.setInputStatus("passwordInput", 0);
            }else{
                this.setInputStatus("passwordInput", isValid?2:1);
            }

            if(password_text2.length > 0){
                if(password_text1 === password_text2 ){
                    this.setTipsInputBg(2, 0);
                    this.setInputStatus("passwordInput2", 1);
                }else{
                    this.setTipsInputBg(2, 2);
                    this.setInputStatus("passwordInput2", 2);
                }
            }

        }else if(index == 2){  //密码输入框2
    
            if(password_text2.length <= 0){
                this.setInputStatus("passwordInput2", 0);
            }else{
                if(password_text1 != password_text2){
                    this.setInputStatus("passwordInput2", 2);
                }else{
                    this.setInputStatus("passwordInput2", 1);
                }
            }
        }
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

        for(let i = 1; i < this.inputTipsNode.length; i++){
            this.inputTipsNode[i].active = false;
        }

        this.inputTipsNode[index].active = bShowTips;
    
        this.pass_input_node2.y = this.passInputNode_y;
        if(index == 1 && bShowTips){
            this.pass_input_node2.y =  this.passInputNode_y - 80;
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
            passEditBox = this.pass_input_node1.getChildByName("password_text").getComponent(cc.EditBox);
            spHide =  this.btnShowPass1.getChildByName("spHide");
            spShow =  this.btnShowPass1.getChildByName("spShow");
        }else if(index == 1){
            passEditBox = this.pass_input_node2.getChildByName("password_text").getComponent(cc.EditBox);
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

    private resetPageStatus(){
        let  passEditBox = this.pass_input_node1.getChildByName("password_text").getComponent(cc.EditBox);
        this.btnShowPass1.getChildByName("spHide").active = true;
        this.btnShowPass1.getChildByName("spShow").active = false;
        passEditBox.inputFlag = cc.EditBox.InputFlag.PASSWORD;

        let passEditBox2 = this.pass_input_node2.getChildByName("password_text").getComponent(cc.EditBox);
        this.btnShowPass2.getChildByName("spHide").active = true;
        this.btnShowPass2.getChildByName("spShow").active = false;
        passEditBox2.inputFlag = cc.EditBox.InputFlag.PASSWORD;

        this.setInputStatus("usernameInput", 0);
        this.setInputStatus("passwordInput", 0);
        this.setInputStatus("passwordInput2", 0);

        this.setTipsInputBg(0, 0);
        this.setTipsInputBg(1, 0);
        this.setTipsInputBg(2, 0);

        this.setTipsNodeShow(1, false); 
        this.setTipsNodeShow(2, false); 
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
         if("passwordInput" === inputType){
            spCheckOk = this.pass_input_node1.getChildByName("spCheckOk");
            spCheckWarn = this.pass_input_node1.getChildByName("spCheckWarn");
            index = 1;
        }else if("passwordInput2" === inputType){
            spCheckOk = this.pass_input_node2.getChildByName("spCheckOk");
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