// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import AreaView from "../login/AreaView";
import cv from "./../cv";
import { ChooseVerity } from "./ChooseVerity";
const { ccclass, property } = cc._decorator;

@ccclass
export default class VeritySiliaoApp extends cc.Component {

    @property(cc.Prefab) areaCode_prefab: cc.Prefab = null;
    @property(cc.Node) panelView1: cc.Node = null;
    @property(cc.Node) panelView2: cc.Node = null;
    private _bInitAreaCode: boolean = false;
    _backClickCallBack: Function = null;
    public _areaCode: cc.Node = null;
    private _verityHand: cc.Node = null;

    private  verityAppCdTime_msg: number = 0;  //手机验证码倒计时
    private  verityAppCdTime_app: number = 0;  //私聊验证码倒计时
    onLoad() {
        this.initText();
        this.registerMsg();

        this.schedule(this.updateActiveAppCdTime_msg, 1);
        this.schedule(this.updateActiveAppCdTime_app, 1);
        this.panelView1.active = true;
        this.panelView2.active = false;

        cv.action.listenEditboxLimitNum(cc.find("panelView1/phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox));
        cv.action.listenEditboxLimitNum(cc.find("panelView1/password_Panel/identifynum_text", this.node).getComponent(cc.EditBox));

        cv.action.listenEditboxLimitNum(cc.find("panelView2/password_Panel/identifynum_text", this.node).getComponent(cc.EditBox));
    }

    start() {
    
    }

    init(verityHand: cc.Node, backClickCallBack: Function) {
        this._verityHand = verityHand;
        this.panelView1.active = true;
        this.panelView2.active = false;
        this._backClickCallBack = backClickCallBack;
        this.clearInputData();
    }


    private _initAreaCode() {
        if (!this._bInitAreaCode) {
            this._bInitAreaCode = true;
            this._areaCode = cc.instantiate(this.areaCode_prefab);
            let scene = cc.director.getScene();
            scene.addChild(this._areaCode, cv.Enum.ZORDER_TYPE.ZORDER_3);
            this._areaCode.active = false;
            this._areaCode.getComponent(AreaView).getAreaCallback = this._updateAreaCode.bind(this);
        }
    }

    initText() {
        //第一步弹框
        cv.action.setText(this.node, "panelView1/Label", "siyu_verity_siyu");  //短信验证
        cv.action.setText(this.node, "panelView1/password_Panel/identify_button/Label", "getCode");
        cv.action.setText(this.node, "panelView1/sure_button/Label", "NextBtnText");
        cv.action.setText(this.node, "panelView1/password_Panel/identifynum_text", "siyu_input_tips04", true);
        cv.action.setText(this.node, "panelView1/phone_Panel/phoneNumber_text", "siyu_input_tips03", true);
        
        cv.action.setText(this.node, "panelView1/siliao_Panel/siliaoNumber_text", "siyu_input_tips02", true); //私聊账号

        cv.action.setText(this.node, "panelView1/txtTips", "siyu_title_tips07");  //提示用语



        


        let txtTips1 =  cc.find("panelView1/txtTips1", this.node);   //还没有私语账号
        txtTips1.getComponent(cc.Label).string =  cv.config.getStringData("siyu_title_tips03")
        cv.resMgr.adaptWidget(txtTips1, false);

        let btnDown =  cc.find("panelView1/btnDownTips", this.node);   //立即下载注册
        let btnDownEn =  cc.find("panelView1/btnDownTipsEn", this.node);   //立即下载注册

        let btnDownTips =  null;
        let _line =  null;

        if(cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN){
             btnDown.active = true;
             btnDownEn.active = false;
             btnDownTips =  cc.find("panelView1/btnDownTips/tips", this.node);   //立即下载注册
             _line =  cc.find("panelView1/btnDownTips/line", this.node);   //立即下载注册
             btnDown.x = txtTips1.x + cv.resMgr.getLabelStringSize(txtTips1.getComponent(cc.Label)).width + 5;
        }else{
            //英文立即下载 需要换行
            btnDown.active = false;
            btnDownEn.active = true;
            btnDownTips =  cc.find("panelView1/btnDownTipsEn/tips", this.node);   //立即下载注册
            _line =  cc.find("panelView1/btnDownTipsEn/line", this.node);   //立即下载注册
        
        }

        btnDownTips.getComponent(cc.Label).string =  cv.config.getStringData("siyu_title_tips04")
        _line.setContentSize(cv.resMgr.getLabelStringSize(btnDownTips.getComponent(cc.Label)).width, _line.height);


        //第二步弹框
        cv.action.setText(this.node, "panelView2/password_Panel/identifynum_text", "siyu_input_tips01", true);  //请输入私聊验证码
        cv.action.setText(this.node, "panelView2/siliao_Panel/siliaoNumber_text", "siyu_input_tips03", true);
        cv.action.setText(this.node, "panelView2/Label", "siyu_verity_siyu");  //私聊验证
        
    }

    registerMsg() {
        //下一步检验成功消息
        cv.MessageCenter.register("onActiveChangeTypeByMsg", this.onActiveChangeTypeByMsgFunc.bind(this), this.node);
        //激活私聊验证成功消息
        cv.MessageCenter.register("onChangeTypeToAppSucces", this.onChangeTypeByAppSucFunc.bind(this), this.node);

        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initText.bind(this), this.node);
        //获取手机验证码成功
        cv.MessageCenter.register("onActiveGetCode", this.onGetPhoneCodeSuc.bind(this), this.node);
        //获取私聊验证码成功
        cv.MessageCenter.register("getSiliaoVcode", this.onGetSiliaoVcodeSuc.bind(this), this.node);
    }

  
    onDestroy(){

        
        cv.MessageCenter.unregister("getSiliaoVcode", this.node);
        cv.MessageCenter.unregister("onActiveGetCode", this.node);
        cv.MessageCenter.unregister("onActiveChangeTypeByMsg", this.node);
        cv.MessageCenter.unregister("onChangeTypeToAppSucces", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    //获取短信验证码  倒计时定时器
    updateActiveAppCdTime_msg() {
        if (this.verityAppCdTime_msg < 1) return;

        this.verityAppCdTime_msg--;
        this.showCodeCdTime(this.verityAppCdTime_msg, true);
    }

    //获取私聊验证码  倒计时定时器
    updateActiveAppCdTime_app() {
        if (this.verityAppCdTime_app < 1) return;

        this.verityAppCdTime_app--;
        this.showCodeCdTime(this.verityAppCdTime_app, false);
    }

    //获取验证码
    onClickIdCode() {
  
        if(this.panelView1.active){
             //获取短信验证码
            if (this.verityAppCdTime_msg > 0) return;
            let phoneNum = cc.find("panelView1/phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
            let codeStr = cc.find("panelView1/phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;

            let pos = codeStr.indexOf("+");
            codeStr = codeStr.substring(pos, codeStr.length);//需要“+”
            let content = cv.config.getStringData("RegisterTips1").replace("%s", codeStr + " " + phoneNum);

            if (this._verityHand.getComponent(ChooseVerity).showError({
                phoneNum: phoneNum,
                AreaCode: codeStr,
            })) {
                return;
            }
            cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, this.getVerityIdCode.bind(this), null);

        }else if(this.panelView2.active){
            //获取私聊验证码
            if (this.verityAppCdTime_app > 0) return;
            this.getVerityIdCode();
        }
       
    }

    //请求获取验证码
    getVerityIdCode() {
        let phoneNum;
        let url = "";
        let codeStr;
        if(this.panelView1.active){
            codeStr = cc.find("panelView1/phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;
            let pos = codeStr.indexOf("+");
            codeStr = codeStr.substring(pos + 1, codeStr.length);

            phoneNum = cc.find("panelView1/phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
            //获取验证码
            cv.httpHandler.requestActive_getMsgVcode(codeStr, phoneNum, 2);


        }else if(this.panelView2.active){

            let siliaoAccount = cc.find("panelView2/siliao_Panel/siliaoAccount", this.node).getComponent(cc.Label).string 
            cv.httpHandler.requestActive_getSiliaoVcode(siliaoAccount);
          
        }
    }

    //获取手机验证码成功
    onGetPhoneCodeSuc(){
        this.showCodeCdTime(60, true);
    }

    //获取私聊验证码成功
    onGetSiliaoVcodeSuc(){
        this.showCodeCdTime(60, false);
    }

    showCodeCdTime(index: number, bGetMsg:boolean) {

        if(bGetMsg){
            this.verityAppCdTime_msg = index;
            let rcodeLabel = cc.find("panelView1/password_Panel/identify_button/Label", this.node).getComponent(cc.Label);
            let isTrue = (index != 0);
            if (isTrue) {
                rcodeLabel.string = this.verityAppCdTime_msg + 's';
            }
            else {
                rcodeLabel.string = cv.config.getStringData("getCode");
            }
        }else{
            this.verityAppCdTime_app = index;
            let rcodeLabel = cc.find("panelView2/password_Panel/identify_button/Label", this.node).getComponent(cc.Label);
            let isTrue = (index != 0);
            if (isTrue) {
                rcodeLabel.string = this.verityAppCdTime_app + 's';
            }
            else {
                rcodeLabel.string = cv.config.getStringData("getCode");
            }
        }
    }

    //返回上一级
    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');

        if(this.panelView1.active == true){
            if (this._backClickCallBack) {
                this._backClickCallBack();
            }
        }else{
            this.panelView1.active = true;
            this.panelView2.active = false;
        }

    }

    //下一步
    onBtnNextClick(){
   
        //私聊账号
        let siliaoAccount = cc.find("panelView1/siliao_Panel/siliaoNumber_text", this.node).getComponent(cc.EditBox).string;
        //手机区号
        let codeStr = cc.find("panelView1/phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;
        let pos = codeStr.indexOf("+");
        codeStr = codeStr.substring(pos + 1, codeStr.length);
        //手机号码
        let phoneNum = cc.find("panelView1/phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        //手机验证码
        let v_code = cc.find("panelView1/password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;

        if(phoneNum.length == 0){
            cv.TT.showMsg(cv.config.getStringData("ErrorToast28"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }
        else{
           if (this._verityHand.getComponent(ChooseVerity).showError({
                AreaCode: codeStr,
                KVCode: v_code,
                siliaoAccount: siliaoAccount,
                })) 
            {
                return;
            }
        }
        //下一步操作
        cv.httpHandler.requestActive_changeTypeByMsg(codeStr, phoneNum, 2, v_code, siliaoAccount); 
    }

    //下一步成功
    onActiveChangeTypeByMsgFunc(data:any){
        let siliaoAccount = cc.find("panelView1/siliao_Panel/siliaoNumber_text", this.node).getComponent(cc.EditBox).string;
        cc.find("panelView2/siliao_Panel/siliaoAccount", this.node).getComponent(cc.Label).string = siliaoAccount;
        this.panelView1.active = false;
        this.panelView2.active = true;
    }


    //激活
    onBtnActiveClick(){
        //私聊账号
        let siliaoAccount = cc.find("panelView2/siliao_Panel/siliaoAccount", this.node).getComponent(cc.Label).string 
        //私聊验证码
        let sl_code = cc.find("panelView2/password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;

        if (this._verityHand.getComponent(ChooseVerity).showError({
            siliaoVcode: sl_code,
            })) 
        {
            return;
        }

        cv.httpHandler.requestActive_changeTypeByApp(siliaoAccount, sl_code);
    }

    //激活成功消息
    onChangeTypeByAppSucFunc(data:any){
        console.log("onChangeTypeByAppSucFunc");
        cv.dataHandler.getUserData().verityType = cv.Enum.VerityGetType.AppGet_Get;
        cv.MessageCenter.send("onChangeVerityType");

        //当首次注册没有绑定下发私聊账号，激活成功保存下私聊账号
        let _sl_account = cv.dataHandler.getUserData().sl_account;
        if(_sl_account.length < 1){
            let siliaoAccount = cc.find("panelView2/siliao_Panel/siliaoAccount", this.node).getComponent(cc.Label).string 
            cv.dataHandler.getUserData().sl_account  = siliaoAccount;
        }
    
        if (this._backClickCallBack) {
            this._backClickCallBack();
            this.panelView1.active = true;
            this.panelView2.active = false;
        }
    }

    //清除输入框数据
    clearInputData(){
        cc.find("panelView2/siliao_Panel/siliaoAccount", this.node).getComponent(cc.Label).string = "";
        cc.find("panelView2/password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string = "";
        //私聊账号
        cc.find("panelView1/siliao_Panel/siliaoNumber_text", this.node).getComponent(cc.EditBox).string = "";
        //手机区号
        //cc.find("panelView1/phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string = "CN+86";
        //手机号码
        cc.find("panelView1/phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string = "";
        cc.find("panelView1/password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string = "";
        this.showCodeCdTime(0, false);
        this.showCodeCdTime(0, true);
    }

    _updateAreaCode(codeTemp: string) {
        cc.find("panelView1/phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string = codeTemp;
    
    }

    //选择区域
    onBtnAreaCodeClick(event: cc.Event, CustomEventData) {
        this._initAreaCode();
        this._areaCode.active = true;
    }

    //立即下载注册按钮
    onBtnDownClick(event: cc.Event, CustomEventData) {
        let url = cv.dataHandler.getUserData().sl_down_url;
        if(cv.config.isSiyuType()){
            let cmdStr = "{\"cmd\": \"1012\", \"url\":\"%s\"}";
            cmdStr = cv.StringTools.formatC(cmdStr, url);
            cv.native.SYwebjsToClient(cmdStr);
        }else{
            cc.sys.openURL(url);
        }
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
}
