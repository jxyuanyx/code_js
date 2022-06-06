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
export default class ForgetPsdView extends cc.Component {

    @property(cc.Node) phone_Panel: cc.Node = null;  //手机号码输入框
    @property(cc.Node) phone_code_panel: cc.Node = null;  //手机验证码输入框

    @property(cc.Node) inputBg: cc.Node[] = [];  
    @property(cc.Node) inputBgChoice: cc.Node[] = [];  
    @property(cc.Node) txtBtnback: cc.Node = null;  
    @property(cc.Node) okButton: cc.Node = null;  
    @property(cc.Node) resultDlg: cc.Node = null;  
    onLoad() {
        this.initText();
        this.registerMsg();

        cv.action.listenEditboxLimitNum(cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox));
        cv.action.listenEditboxLimitNum(cc.find("password_Panel/identifynum_text", this.node).getComponent(cc.EditBox));
    }

    onEnable(){
        let mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        this.okButton.getComponent(cc.Button).interactable = mobile.length > 0? true:false;
        this.resultDlg.active = false;
    }
    start() {
        cc.find("kefu", cc.find("password_Panel", this.node)).active = true;
    }

    initText() {
        this.txtBtnback.active = (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN);
        this.txtBtnback.getComponent(cc.Label).string = cv.config.getStringData("BackBtnTitle");

        cv.action.setText(this.node, "Label", "Login_Scene_login_panel_forget_PassWord");
        cv.action.setText(this.node, "password_Panel/identify_button/Label", "getCode");
        cv.action.setText(this.node, "sure_button/Label", "getCode");
        cv.action.setText(this.node, "password_Panel/tipsNode/txt", "Login_Scene_register_panel_regiest_tips_text");
        cc.find("kefu/kefu_text", cc.find("password_Panel", this.node)).getComponent(cc.Label).string = cv.config.getStringData("Login_kefu");
        cv.action.setText(this.node, "password_Panel/identifynum_text", "forgetPassWord_forgetPassWord_panel_code_panel_fsetInvateCode_text", true);
        cv.action.setText(this.node, "phone_Panel/phoneNumber_text", "forgetPassWord_forgetPassWord_panel_enter_phone_Panel_fphoneNumber_text", true);
    
        cc.find("result/btnSure/Label", this.resultDlg).getComponent(cc.Label).string = cv.config.getStringData("Confirm");
    }

    registerMsg() {
        cv.MessageCenter.register("onCheckForgetPsdSuccess", this.onCheckForgetPsdSuccess.bind(this), this.node);
        cv.MessageCenter.register("onGetForgetVCodeSuccess", this.onGetForgetVCodeSuccess.bind(this), this.node);
    }

    onDestroy(){
        cv.MessageCenter.unregister("onCheckForgetPsdSuccess", this.node);
        cv.MessageCenter.unregister("onGetForgetVCodeSuccess", this.node);
    }
    onCheckForgetPsdSuccess(msg:any) {
        console.log("onCheckForgetPsdSuccess");
        this.node.getParent().getComponent("LoginScene").onCheckForgetPsdSuccess();
    }

    onGetForgetVCodeSuccess(msg:any){
        if(msg.msg_code === "100049"){
            this.resultDlg.active = true;
            let str = "";
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                str = msg.msg;
            }
            else {
                str = msg.message;  
            }
            cc.find("result/txt", this.resultDlg).getComponent(cc.Label).string = str;
        }
    }

    onBtnCheckForgetPsdClick() {
        cv.AudioMgr.playButtonSound('button_click');
        var mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        var VCode = cc.find("password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;
        var areaCode= cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;
        if(mobile.length == 0){
             //cv.TT.showMsg(cv.config.getStringData("ErrorToast28"), cv.Enum.ToastType.ToastTypeInfo);
             this.resultDlg.active = true;
             cc.find("result/txt", this.resultDlg).getComponent(cc.Label).string = cv.config.getStringData("ErrorToast28");
            return;
        }else{
           if (this.node.getParent().getComponent("LoginScene").showError({
                AreaCode: areaCode,
                KVCode: VCode,
                })) 
            {
                return;
            }
        }
        
        cv.httpHandler.requestCheckForgetPsd(mobile, areaCode, VCode);
    }


    onCloseResltDlg(){
        this.resultDlg.active = false;
    }

    onInputEditBegined(event: cc.Event, CustomEventData:string){
        let index = Number(CustomEventData) - 1;
        this.inputBg[index].active = false;
        this.inputBgChoice[index].active = true;
    }

    onInputEditEnd(event: cc.Event, CustomEventData:string){
        let index = Number(CustomEventData) - 1;
        this.inputBg[index].active = true;
        this.inputBgChoice[index].active = false;

        var mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        this.okButton.getComponent(cc.Button).interactable = mobile.length > 0? true:false;
    }
}
