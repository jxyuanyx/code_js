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
import AreaView from "./AreaView";
const { ccclass, property } = cc._decorator;
/**
 * 使用说明，保持一份
 * if (!cc.director.getScene().getChildByName("BindDevice")) {
            this.bindDeviceView = cv.action.addChildToScene(this, this.setSecondPsd, []);
            this.bindDeviceView.name = "BindDevice";
        }
        else {
            this.bindDeviceView = cc.director.getScene().getChildByName("BindDevice");
        }
        this.bindDeviceView.getComponent(BindDevice).init(this.onBtnChangePsdBackClick.bind(this));
 */
@ccclass
export default class BindDevice extends cc.Component {

    @property(cc.Node)
    phoneBind_panel: cc.Node = null;
    @property(cc.Node)
    siliaoBind_panel: cc.Node = null;
    areaCode:cc.Node = null;

    @property(cc.Node) phone_input_node: cc.Node = null;  //绑定手机手机号输入
    @property(cc.Node) phCode_input_node: cc.Node = null;  //绑定绑定验证码输入
    @property(cc.Node) inputBg: cc.Node[] = [];  
    @property(cc.Node) inputBgChoice: cc.Node[] = [];  
    @property(cc.Node) inputBgError: cc.Node[] = [];  

    @property(cc.Node) getPhoneCode_button: cc.Node = null;  //获取验证码按钮
    @property(cc.Node) fok_button: cc.Node = null;  //获取验证码按钮

    @property(cc.Node) phoneTipsNode: cc.Node = null;  //收入输入提示
    @property(cc.Node) txtBtnback: cc.Node = null;  


    _cdGetCodeTime: number = 0;
    _logintimestamp: number = 0;
    _isCdCodeing: boolean = false;

    _backClickCallBack: Function = null;

    private  _bindSiliaoMsgCdTime: number = 0;  //私聊绑定手机倒计时

    onLoad() {
        this.registerMsg();
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); }, this);
        cv.resMgr.adaptWidget(this.node, true);
        cv.action.listenEditboxLimitNum(cc.find("phone_Panel/phoneNumber_text", this.phoneBind_panel).getComponent(cc.EditBox));
        cv.action.listenEditboxLimitNum(cc.find("enter_code_panel/identifynum_text", this.phoneBind_panel).getComponent(cc.EditBox));
        //私聊验证码
        cv.action.listenEditboxLimitNum(cc.find("setPassword_Panel/identifynum_text", this.siliaoBind_panel).getComponent(cc.EditBox)); 
    
        this.getPhoneCode_button.active = true;
        this.fok_button.active = false;
    }

    onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        cv.MessageCenter.unregister("BindDevice_vcode_succ", this.node);
        cv.MessageCenter.unregister("onBindGetSiliaoVcodeSuc", this.node);
        cv.MessageCenter.unregister("onBindDeviceBySiliaoSuc", this.node);
    }

    onEnable(){
        this.getPhoneCode_button.active = true;
        this.fok_button.active = false;
        cc.find("phone_Panel/phoneNumber_text", this.phoneBind_panel).getComponent(cc.EditBox).string = "";
        cc.find("enter_code_panel/identifynum_text", this.phoneBind_panel).getComponent(cc.EditBox).string = "";
        this.getPhoneCode_button.getComponent(cc.Button).interactable = false;
        this.fok_button.getComponent(cc.Button).interactable = false;
    }

    registerMsg() {
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        cv.MessageCenter.register("BindDevice_vcode_succ", this.OnResetPassVCodeCallBack.bind(this), this.node);
        cv.MessageCenter.register("onBindGetSiliaoVcodeSuc", this.onGetSiliaoVcodeSuc.bind(this), this.node); //获取私聊验证码成功
        cv.MessageCenter.register("onBindDeviceBySiliaoSuc", this.onBindSiliaoSuc.bind(this), this.node); //通过私聊绑定成功
    }

    OnAppEnterBackground() {
        this.stopCd();
    }

    OnAppEnterForeground() {
        this.calculationCd();
    }

    init(backClickCallBack: Function, areaCode : cc.Node) {
        this.areaCode = areaCode;
        this.initPhoneText();
        if(cv.config.isOpenSiyuVerify() && cv.dataHandler.getUserData().verityType == cv.Enum.VerityGetType.AppGet_Get){
            this.initSiliaoText();

            this.phoneBind_panel.active = false;
            this.siliaoBind_panel.active = true;
        }else{
            this.phoneBind_panel.active = true;
            this.siliaoBind_panel.active = false;
        }
        this._backClickCallBack = backClickCallBack;
        this.calculationCd();

        let codeTemp =  this.areaCode.getComponent(AreaView).getAreaCode(cv.String(cv.dataHandler.getUserData().areaCode))
        let commaPos = codeTemp.lastIndexOf("+");
        let countryIsoCode =  codeTemp.substring(commaPos, codeTemp.length);


        cc.find("phone_Panel/areaCode_text", this.phoneBind_panel).getComponent(cc.Label).string = countryIsoCode;
        let areaFlag =  cc.find("phone_Panel/areaflag", this.phoneBind_panel);
        cv.resMgr.setSpriteFrame(areaFlag, "zh_CN/hall/areaFlag/" + codeTemp);
    }

    updateAreaCode(areaCodeStr: string) {
        cc.find("phone_Panel/areaCode_text", this.phoneBind_panel).getComponent(cc.Label).string = areaCodeStr;
        let areaFlag =  cc.find("phone_Panel/areaflag", this.phoneBind_panel);
        cv.resMgr.setSpriteFrame(areaFlag, "zh_CN/hall/areaFlag/" + areaCodeStr);
    }

    onBtnAreaCodeClick() {
        this.node.active = false;
        this.areaCode.active = true;
    }

    //手机绑定界面
    initPhoneText() {

        this.txtBtnback.active = (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN);
        this.txtBtnback.getComponent(cc.Label).string = cv.config.getStringData("BackBtnTitle");

        cc.find("title_text", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("BindDevice_title");
       
        cc.find("guard_phone_panel/tips", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_binde_panel_tips");;

        let guard_text = cc.find("guard_phone_panel/text", this.phoneBind_panel);
        let mobile = cv.dataHandler.getUserData().mobile;
        let mobileLen = cv.StringTools.getArrayLength(mobile);
        let len = mobileLen - 5;
        let numberStr = "";
        if (mobileLen >= 5) {
            let tempStr = "";
            for (let i = 0; i < len; i++) {
                tempStr += "*";
            }
           numberStr= "(" + mobile.substring(0,3) + tempStr + mobile.substring(mobileLen-2) + ")";
        }

        cc.find("guard_phone_panel/label_0", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("BindDevice_label_0");
        guard_text.getComponent(cc.RichText).string = cv.StringTools.formatC(cv.config.getStringData("BindDevice_label_2"), numberStr);
        
        cc.find("phone_Panel/phoneNumber_text", this.phoneBind_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("BindDevice_phoneNumber_text");
        cc.find("enter_code_panel/identifynum_text", this.phoneBind_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("BindDevice_identifynum_text");
        cc.find("enter_code_panel/getInvateCode_button/Label", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
        cc.find("fok_button/Label", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("BindDevice_fok_button");
        cc.find("getPhoneCode_button/Label", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode"); //获取验证码

        cc.find("guard_phone_panel/title", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_binde_panel_title"); //获取验证码
        cc.find("guard_phone_panel/tips", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_binde_panel_tips"); //获取验证码
        cc.find("phone_Panel/tipNode/txt", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panle_phone_diff"); //手机号码不同
        cc.find("enter_code_panel/tipNode/txt", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_register_panel_regiest_tips_text");

    }

    //私聊绑定界面
    initSiliaoText() {
        cc.find("title_text", this.siliaoBind_panel).getComponent(cc.Label).string = cv.config.getStringData("BindDevice_title");
        let guard_text = cc.find("guard_phone_panel/guard_text", this.siliaoBind_panel);
        guard_text.getComponent(cc.Label).string = cv.config.getStringData("siyu_siliao_account");  //您的私聊账号
        let siliaoAccount_text = cc.find("guard_phone_panel/siliaoAccount_text", this.siliaoBind_panel);
        let siliaoAccount = cv.dataHandler.getUserData().sl_account;
        let accountLen = cv.StringTools.getArrayLength(siliaoAccount);
        let len = accountLen - 4;
        let tempStr = "";
        if (accountLen >= 4) {
            for (let i = 0; i < len; i++) {
                tempStr += "*";
            }
            siliaoAccount_text.getComponent(cc.Label).string = "(" + siliaoAccount.substring(0,4) + tempStr + ")";
        }
        cv.resMgr.adaptWidget(siliaoAccount_text);
        let guard_text_size = cv.resMgr.getLabelStringSize(guard_text.getComponent(cc.Label));
        let phonenumber_text_size = cv.resMgr.getLabelStringSize(siliaoAccount_text.getComponent(cc.Label));
        siliaoAccount_text.setPosition(cc.v2(guard_text.position.x + guard_text_size.width + 23, siliaoAccount_text.position.y));

        cc.find("guard_phone_panel/label_0", this.siliaoBind_panel).getComponent(cc.Label).string = cv.config.getStringData("BindDevice_label_0");

        let label_1 = cc.find("guard_phone_panel/label_1", this.siliaoBind_panel);
        label_1.getComponent(cc.Label).string = cv.config.getStringData("siyu_title_tips08");  //请用此账号接收
        label_1.setPosition(cc.v2(guard_text.position.x + guard_text_size.width + 23 + phonenumber_text_size.width + 23, label_1.y));

        //请输入私聊账号
        cc.find("siliao_Panel/siliaoNumber_text", this.siliaoBind_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("siyu_title_tips09");
        //请输入私聊验证码
        cc.find("setPassword_Panel/identifynum_text", this.siliaoBind_panel).getComponent(cc.EditBox).placeholder = cv.config.getStringData("siyu_input_tips01");
        
        cc.find("setPassword_Panel/identify_button/Label", this.siliaoBind_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
        cc.find("fok_button/Label", this.siliaoBind_panel).getComponent(cc.Label).string = cv.config.getStringData("BindDevice_fok_button");
    
        let txtTips1 =  cc.find("siliaoTips", this.siliaoBind_panel);   //私聊账号无法使用
        let btnDownTips =  cc.find("btnToMsgBind/tips", this.siliaoBind_panel);   //请用手机账号
        let _line =  cc.find("btnToMsgBind/line", this.siliaoBind_panel);   //
        let _btnToMsgBind =  cc.find("btnToMsgBind", this.siliaoBind_panel);   //
        txtTips1.getComponent(cc.Label).string =  cv.config.getStringData("siyu_title_tips10")
        btnDownTips.getComponent(cc.Label).string =  cv.config.getStringData("siyu_title_tips11")
        

        if(cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN){
            _btnToMsgBind.y  = txtTips1.y;
            _btnToMsgBind.x = txtTips1.x + cv.resMgr.getLabelStringSize(txtTips1.getComponent(cc.Label)).width + 5;
           
        }else{
            _btnToMsgBind.x = txtTips1.x;
            _btnToMsgBind.y =  txtTips1.y - cv.resMgr.getLabelStringSize(txtTips1.getComponent(cc.Label)).height/2 - 10;
        }

        _line.setContentSize(cv.resMgr.getLabelStringSize(btnDownTips.getComponent(cc.Label)).width, _line.height);
    
    }

    //界面切换到私聊绑定
    onChangeToMsgBind(){
        this.siliaoBind_panel.active = false;
        this.phoneBind_panel.active = true;
    }

    stopCd() {
        this.unschedule(this.UpdateTime_phone.bind(this));
        this.unschedule(this.updateTime_siliao.bind(this));
        let date: Date = new Date();
        this._logintimestamp = date.getTime();
        this._bindSiliaoMsgCdTime = 0;

    }

    calculationCd() {
        let currentTime = (new Date()).getTime();
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

    getAreaCodeData() {
        let codeStr = cc.find("phone_Panel/areaCode_text", this.phoneBind_panel).getComponent(cc.Label).string ;
        let pos = codeStr.indexOf("+");
        codeStr = codeStr.substring(pos + 1, codeStr.length);
        return codeStr;
    }

    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');

        if(cv.config.isOpenSiyuVerify() && cv.dataHandler.getUserData().verityType == cv.Enum.VerityGetType.AppGet_Get){
            if(this.phoneBind_panel.active == true){
                this.phoneBind_panel.active = false;
                this.siliaoBind_panel.active = true;
            }else{
                this.stopCd();
                if (this._backClickCallBack) {
                    this._backClickCallBack();
                }
            } 
        }else{
            this.stopCd();
            if (this._backClickCallBack) {
                this._backClickCallBack();
            }
        }
    }
    //手机绑定获取验证码
    onBtnInvateCodeClick() {
        let kAccount = cc.find("phone_Panel/phoneNumber_text", this.phoneBind_panel).getComponent(cc.EditBox).string;
        let kAreaCode = this.getAreaCodeData();

        if (this._isCdCodeing) return;
        if (kAccount.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("BindDevice_phoneNumber_text"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        this.getPhoneCode_button.active = false;
        this.fok_button.active = true;

        cv.httpHandler.requestGetVCodeByDevice(kAccount, kAreaCode);

    }

  
    //手机绑定确定按钮
    onBtnSureClick() {
        let kAccount = cc.find("phone_Panel/phoneNumber_text", this.phoneBind_panel).getComponent(cc.EditBox).string;
        let kVCode = cc.find("enter_code_panel/identifynum_text", this.phoneBind_panel).getComponent(cc.EditBox).string;
        let kAreaCode = this.getAreaCodeData();

        if (kAccount.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("BindDevice_phoneNumber_text"), cv.Enum.ToastType.ToastTypeError);
            cv.AudioMgr.playButtonSound('button_click');
            return;
        }
        if (cv.StringTools.getArrayLength(kVCode) <= 0) {
            cv.TT.showMsg(cv.config.getStringData("BindDevice_identifynum_text"), cv.Enum.ToastType.ToastTypeWarning);
            cv.AudioMgr.playButtonSound('button_click');
            return;
        }

        cv.httpHandler.requestBindSafeDevice(kAccount, kAreaCode, kVCode);
    }


    //获取私聊验证码
    onBtnGetSiliaoVcode(){

        //激活短信验证界面
        if(this._bindSiliaoMsgCdTime > 0) return;

        //私聊账号
        let siliaoAccount = cc.find("siliao_Panel/siliaoNumber_text", this.siliaoBind_panel).getComponent(cc.EditBox).string;

        if(siliaoAccount.length < 1){
            cv.TT.showMsg(cv.config.getStringData("siyu_title_tips09"), cv.Enum.ToastType.ToastTypeError);
            return 
        }

        cv.httpHandler.requestBind_getSiliaoVcode(siliaoAccount);
    }

    //获取私聊验证码成功
    onGetSiliaoVcodeSuc(){
        this.unschedule(this.updateTime_siliao);
        this.schedule(this.updateTime_siliao, 1.0);
        this.showSiliaoCdTime(60);
    }

    //私聊绑定确定按钮
    onBtnSiliaoSure(){

         //私聊账号
        let siliaoAccount = cc.find("siliao_Panel/siliaoNumber_text", this.siliaoBind_panel).getComponent(cc.EditBox).string;
        if(siliaoAccount.length < 1){
            cv.TT.showMsg(cv.config.getStringData("siyu_title_tips09"), cv.Enum.ToastType.ToastTypeError);
            return 
        }

        //私聊验证码
        let sl_vcode = cc.find("setPassword_Panel/identifynum_text", this.siliaoBind_panel).getComponent(cc.EditBox).string; 
        if(sl_vcode.length < 1){
            cv.TT.showMsg(cv.config.getStringData("siyu_input_tips01"), cv.Enum.ToastType.ToastTypeError);
        }
       
        cv.httpHandler.requestBind_checkSlBind(siliaoAccount, sl_vcode);
    }

    //绑定私聊成功
    onBindSiliaoSuc(){
    }
  
    updateTime_siliao(dt:number){
        //私聊绑定验证码
        if(this._bindSiliaoMsgCdTime > 0){
            this._bindSiliaoMsgCdTime--;
            this.showSiliaoCdTime(this._bindSiliaoMsgCdTime);
        }
    }

    showSiliaoCdTime(index: number) {
        this._bindSiliaoMsgCdTime = index;
        let rcodeLabel =  cc.find("setPassword_Panel/identify_button/Label", this.siliaoBind_panel).getComponent(cc.Label);
        let isTrue = (index != 0);
        if (isTrue) {
            rcodeLabel.string = this._bindSiliaoMsgCdTime + 's';
        }
        else {
            rcodeLabel.string = cv.config.getStringData("getCode");
        }
    }


    resetTime() {
        this.unschedule(this.UpdateTime_phone);
        this._isCdCodeing = false;
    }

    OnResetPassVCodeCallBack() {
        this.unschedule(this.UpdateTime_phone);
        this.schedule(this.UpdateTime_phone, 1.0);
        this._isCdCodeing = true;

        this._cdGetCodeTime = 60;

    }

    UpdateTime_phone(dt: number) {
        if (this._cdGetCodeTime > 0) {
            this._cdGetCodeTime -= 1;
        }
        else {
            this.resetTime();
            cc.find("enter_code_panel/getInvateCode_button/Label", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
            return;
        }

        cc.find("enter_code_panel/getInvateCode_button/Label", this.phoneBind_panel).getComponent(cc.Label).string
            = cv.StringTools.formatC(cv.config.getStringData("getCodeAgain"), this._cdGetCodeTime);
    }

   

    OnClear() {
        this.onBtnBackClick();
        cc.find("code_panel/password_text", this.phoneBind_panel).getComponent(cc.EditBox).string = "";
        cc.find("code_panel_0/password_text", this.phoneBind_panel).getComponent(cc.EditBox).string = "";
        cc.find("enter_code_panel/getInvateCode_button/Label", this.phoneBind_panel).getComponent(cc.Label).string = cv.config.getStringData("getCode");
        cc.find("enter_code_panel/enter_phone_Panel/forget_setInvateCode_text", this.phoneBind_panel).getComponent(cc.EditBox).string = "";

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

    onInputEditBegined(event: cc.Event, CustomEventData:string){
        let index = Number(CustomEventData) - 1;
        this.inputBg[index].active = false;
        this.inputBgChoice[index].active = true;
        if(index == 0){
            this.inputBgError[index].active = false;
            this.showPhoneErrorTips(false);
        }
    }

    onInputEditEnd(event: cc.Event, CustomEventData:string){
        let index = Number(CustomEventData) - 1;
        this.inputBg[index].active = true;
        this.inputBgChoice[index].active = false;

        let kAccount = cc.find("phone_Panel/phoneNumber_text", this.phoneBind_panel).getComponent(cc.EditBox).string;
        let kVCode = cc.find("enter_code_panel/identifynum_text", this.phoneBind_panel).getComponent(cc.EditBox).string;
        if(index == 0){  //手机号码输入框
           
            let mobile = cv.dataHandler.getUserData().mobile;
            if(kAccount != mobile && kAccount.length > 0){
                this.showPhoneErrorTips(true);
                this.inputBgError[index].active = true;
            }else{
                this.showPhoneErrorTips(false);
            }
            this.getPhoneCode_button.getComponent(cc.Button).interactable = kAccount.length > 0? true:false;
    
        }else{
            this.fok_button.getComponent(cc.Button).interactable = (kVCode.length > 0 && kAccount.length > 0)? true:false;
        }
    }

    //是否显示手机号码输入错误提示
    private showPhoneErrorTips(bShowTips:boolean = false){
        if(bShowTips){
            this.phoneTipsNode.active = true;
            this.phCode_input_node.y = this.phone_input_node.getPosition().y - 226;
      
        }else{
            this.phoneTipsNode.active = false;
            this.phCode_input_node.y = this.phone_input_node.getPosition().y - 166;
        }
    }

    
}