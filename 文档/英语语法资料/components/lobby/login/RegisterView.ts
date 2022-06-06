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
import { NATIVE_KEY_MAP } from "../../../common/tools/NativeEventCMD";
import HeadItem from "../hall/HeadItem";
import UpgradeView from "./UpgradeView";
import { ConnectServerFailedReason } from "../../../common/tools/Enum";
import { getDefaultLibFileName } from "typescript";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RegisterView extends cc.Component {
    @property(cc.Node) captcha_button: cc.Node = null;
    @property(cc.Prefab) protocol_prefab: cc.Prefab = null;


    @property(cc.Node) phone_Panel: cc.Node = null;  //手机号码输入框
    @property(cc.Node) phone_code_panel: cc.Node = null;  //手机验证码输入框
    @property(cc.Node) invate_code_panel: cc.Node = null;  //邀请码输入框


    @property(cc.Node) next_button: cc.Node = null;  //确定验证按钮
    @property(cc.Node) btnVerity: cc.Node = null;  //下面获取验证码大按钮
    @property(cc.Node) btnShowInvite: cc.Node = null;  // 邀请码按钮


    @property(cc.Node) inputBg: cc.Node[] = [];  
    @property(cc.Node) inputBgChoice: cc.Node[] = [];  

    @property(cc.Node) txtBtnback: cc.Node = null;  
    @property(cc.Node) resultDlg: cc.Node = null;  
    @property(cc.Node) tipsDlg: cc.Node = null;  

    protocolNode: cc.Node = null;

    public defaultCaptcha_img: string = "zh_CN/common/icon/click_get_captcha";
    private tiaocodeY: number = 0;
    private setPassword_PanelY: number = 0;

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        this.initText();
        this.registerMsg();

        cv.action.listenEditboxLimitNum(cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox));

        cv.action.listenEditboxLimitNum(cc.find("setPassword_Panel/identifynum_text", this.node).getComponent(cc.EditBox));

        this.getPasteboardString();
        this.tiaocodeY = cc.find("tiaoCode", this.node).y;
        this.setPassword_PanelY = cc.find("setPassword_Panel", this.node).y;

        this.invate_code_panel.active = false;
        this.btnVerity.active = true;
        this.btnVerity.getComponent(cc.Button).interactable = false;
        this.next_button.active = false;
        this.next_button.getComponent(cc.Button).interactable = false;
        this.resultDlg.active = false;

        //this.phone_code_panel.y = this.phone_Panel.y - 174;

        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.registration);
    }

    onEnable(){
        this.resultDlg.active = false;
        this.updateInviteCode();
    }

    initText() {

        this.txtBtnback.active = (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN);
        cv.action.setText(this.node, "phone_Panel/phoneNumber_text", "Login_Scene_register_panel_enter_phone_Panel_phoneNumber_text", true);
        cv.action.setText(this.node, "setPassword_Panel/identifynum_text", "Login_Scene_register_panel_setPassword_Panel_identifynum_text", true);
        cv.action.setText(this.node, "invate_code_panel/invateCode_text", "Login_Scene_register_panel_invate_code_panel_invateCode_text", true);
        cv.action.setText(this.node, "tiaoCode/captcha_bg/captcha_text", "Login_Scene_register_panel_register_Panel_captcha_text", true);

        cv.StringTools.setLabelString(this.node, "next_button/Label", "Login_Scene_register_panel_next_button");
        cv.StringTools.setLabelString(this.node, "setPassword_Panel/regiest_tips_text", "Login_Scene_register_panel_regiest_tips_text");
        //现在处于账号升级模式
        if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
            cv.StringTools.setLabelString(this.node, "Text_4", "RegisterTitle_Update_Text");
        } else {
            cv.StringTools.setLabelString(this.node, "Text_4", "RegisterTitleText");
        }

        this.txtBtnback.getComponent(cc.Label).string = cv.config.getStringData("BackBtnTitle");
        cv.StringTools.setLabelString(this.resultDlg, "dlg/tips", "Login_Scene_register_tips_sucess");

        cv.StringTools.setLabelString(this.node, "setPassword_Panel/identify_button/Label", "getCode");
        cv.StringTools.setLabelString(this.node, "setPassword_Panel/identify_button/Label", "getCode");
        cv.StringTools.setLabelString(this.node, "Text_4_0", "Login_Scene_register_panel_tips1");
        cv.StringTools.setLabelString(this.btnShowInvite, "Label", "Login_Scene_register_panel_tips3");

  
        this.updateInviteCode();

        cv.StringTools.setLabelString(this.btnVerity, "Background/Label", "getCode");

        cv.StringTools.setLabelString(this.node, "Text_4_0/Text_4_0_0", "Login_Scene_register_panel_Text_4_0_0");
        cv.StringTools.setLabelString(this.captcha_button, "captcha_label", "Login_Scene_register_panel_register_Panel_click_refresh_captcha_text");
        cv.StringTools.setLabelString(this.node, "invate_code_panel/tips/txt", "Login_Scene_register_panel_limit_len");
        let protocol_button: cc.Node = cc.find("Text_4_0/protocol_button", this.node);
        let text4: cc.Node = cc.find("Text_4_0", this.node);
        let protocolTxt: cc.Node = cc.find("Text_4_0/Text_4_0_0", this.node);
        protocolTxt.x = text4.width / 2 + 6;
        text4.x = -protocolTxt.width / 2 + 3;
        protocol_button.x = protocolTxt.x;
    }

    private updateInviteCode(){
        let add = this.btnShowInvite.getChildByName("add");
        let del = this.btnShowInvite.getChildByName("del");
        let label = this.btnShowInvite.getChildByName("Label").getComponent(cc.Label);
        let width = cv.resMgr.getLabelStringSize(label).width;
        del.x = label.node.x - width/2 - 25 - del.width/2;
        add.x = label.node.x - width/2 - 25 - add.width/2;
    }

    registerMsg() {
        cv.MessageCenter.register("onCheckRegisterIdCodeSuccess", this.onCheckRegisterIdCodeSuccess.bind(this), this.node);
        cv.MessageCenter.register("responseCaptchaSucc", this.responseCaptchaSucc.bind(this), this.node);
        cv.MessageCenter.register("responseCaptchaUrlSucc", this.responseCaptchaUrlSucc.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initText.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("onCheckRegisterIdCodeSuccess", this.node);
        cv.MessageCenter.unregister("responseCaptchaSucc", this.node);
        cv.MessageCenter.unregister("responseCaptchaUrlSucc", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    onCheckRegisterIdCodeSuccess(msg) {
        this.resultDlg.active = true;
        let self = this;
        this.resultDlg.runAction(cc.sequence(cc.delayTime(2.0),
         cc.callFunc(function(){
            console.log("onCheckRegisterIdCodeSuccess");
            if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
                self.node.getParent().getComponent(LoginScene).onCheckRegisterIdCodeSuccess();
            } else {
                self.node.getParent().getComponent(UpgradeView).onCheckRegisterIdCodeSuccess();
            }
         })));
    }

    responseCaptchaSucc(imgData: any) {
        let imgElement = new Image();
        imgElement.src = imgData;
        let img = new cc.Texture2D();
        img.initWithElement(imgElement);
        img.handleLoadedTexture();

        let frame: cc.SpriteFrame = new cc.SpriteFrame(img);
        let defaultSprite = this.captcha_button.getComponent(cc.Sprite);
        defaultSprite.spriteFrame = frame;
        this.captcha_button.getChildByName("captcha_label").active = false;
        this.captcha_button.getChildByName("click_refresh").active = false;
    }

    responseCaptchaUrlSucc(url: any) {

        let setPassword_Panel = cc.find("setPassword_Panel", this.node);
        let regiest_tips_text = cc.find("regiest_tips_text", setPassword_Panel);
        if (url == 0) {
            //不显示图形验证码
            cc.find("tiaoCode", this.node).active = false;
            setPassword_Panel.setPosition(setPassword_Panel.getPosition().x, this.setPassword_PanelY);
           // regiest_tips_text.setPosition(regiest_tips_text.x, setPassword_Panel.y - setPassword_Panel.getContentSize().height / 2 - regiest_tips_text.getContentSize().height / 2);
            return;
        }

        let tiaocode = cc.find("tiaoCode", this.node);
        tiaocode.setPosition(tiaocode.x, this.setPassword_PanelY);
        setPassword_Panel.setPosition(setPassword_Panel.getPosition().x, this.tiaocodeY + regiest_tips_text.height / 2);
       // regiest_tips_text.setPosition(regiest_tips_text.x, setPassword_Panel.y - setPassword_Panel.getContentSize().height / 2 - regiest_tips_text.getContentSize().height / 2);
        tiaocode.active = true;
        cv.resMgr.loadRemote(url, function (error: Error, resource: cc.Texture2D) {
            if (error) {
                console.log(error.message || error);
                return;
            }
            let frame = new cc.SpriteFrame(resource);
            let defaultSprite = this.captcha_button.getComponent(cc.Sprite);
            defaultSprite.spriteFrame = frame;
            this.captcha_button.getChildByName("captcha_label").active = false;
            this.captcha_button.getChildByName("click_refresh").active = false;
        }.bind(this));
    }

    onBtnCheckRegisterIdCodeClick() {
        cv.AudioMgr.playButtonSound('button_click');
        var mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        var VCode = cc.find("setPassword_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;
        var invateCode = cc.find("invate_code_panel/invateCode_text", this.node).getComponent(cc.EditBox).string;
        let areaCode = this.getAreacode();

        // if(1 == 1){  //测试代码
        //     if(cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE){
        //         this.node.getParent().getComponent(LoginScene).onCheckRegisterIdCodeSuccess();
        //     }else{
        //         this.node.getParent().getComponent(UpgradeView).onCheckRegisterIdCodeSuccess();
        //     }

        //     return;
        // }

        if (cv.tools.showError({
            phoneNum: mobile,
            AreaCode: areaCode,
            KVCode: VCode,
        })) {
            return;
        }
        console.log("isOpenUpdateUserMode::" + cv.dataHandler.getUserData().isOpenUpdateUserMode);
        if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
            cv.httpHandler.requestCheckUpdateGradeIdCode(mobile, areaCode, VCode, invateCode);
        } else {
            cv.httpHandler.requestCheckRegisterIdCode(mobile, areaCode, VCode, invateCode);
        }
        cv.dataHandler.getUserData().invateCode = invateCode;
        //跟踪用户行为，发送事件
        let properties = { item: "nextButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
    }
    //获取验证码
    getAreacode(): string {
        var codeStr = cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;
        let pos = codeStr.indexOf("+");
        let areaCode = codeStr.substring(pos + 1, codeStr.length);
        return areaCode;
    }
    onBtnCaptchaClick() {
        //点击刷新验证码后，先恢复默认显示
        this.captcha_button.getChildByName("captcha_label").active = true;
        this.captcha_button.getChildByName("click_refresh").active = false;
        let defaultSprite = this.captcha_button.getComponent(cc.Sprite);
        cv.resMgr.setSpriteFrame(defaultSprite.node, this.defaultCaptcha_img);

        cv.httpHandler.requestCaptcha();
    }

    onBtnProtocolClick() {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.protocolNode) {
            this.protocolNode = cv.action.addChildToScene(this, this.protocol_prefab, [], cv.Enum.ZORDER_TYPE.ZORDER_TT, true);
        }
        this.protocolNode.active = true;
    }

    getPasteboardString(): void {
        let ret = "";
        if (cc.sys.isNative) {
            ret = cv.native.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_PASTEBOARD_STRING);
        } else if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            ret = cv.native.SYgetClipboardContent();
        } else {
            return;
        }

        let ar = ret.split('##');
        let code = "";
        if (ar.length > 1) {
            code = ar[1];
            if (code.length > 0) {
                if (cc.sys.isNative) {
                    cv.native.invokeSyncFunc(NATIVE_KEY_MAP.KEY_SET_PASTEBOARDSTRING, { "text": "" });
                } else if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                    //获取系统剪切版
                    let cmd = "{\"cmd\": \"1013\", \"op\": 1, \"content\": \"\"}";
                    cv.native.SYwebjsToClient(cmd);
                }
                cc.find("invate_code_panel/invateCode_text", this.node).getComponent(cc.EditBox).string = code;
            }
        }
    }

    /**
     * 点击返回
     */
    public onClickBackButton() {
        cv.MessageCenter.send("exitRegister");


        //跟踪用户行为，发送事件
        let properties = { item: "loginButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
    }

    /**
     * 点击获取验证码
     */
    public onClickIdCode() {
        cv.MessageCenter.send("getIdcode");

        this.btnVerity.active = false;
        this.next_button.active = true;

        //跟踪用户行为，发送事件
        let properties = { item: "getTheCodeButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
        let propertiesEvent = { item: "getTheCodeButton",method:"sms" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.GetCodeInitiated, cv.Enum.Functionality.registration, propertiesEvent);
    }

    /**
     * 点击国家区号
     */
    public onClickAreaCode() {
        if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
            this.node.getParent().getComponent(UpgradeView).onBtnAreaCodeClick(null, "REGISTER_PANEL");
        } else {
            this.node.getParent().getComponent(LoginScene).onBtnAreaCodeClick(null, "REGISTER_PANEL");
        }
    }

    /**
     * 用户输入邀请码完成
     */
     public enterInviteCodeComplete() {
        // var mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        // let obj = {
        //     phoneNum: mobile,
        // }
        //跟踪用户行为，发送事件
        let properties = { item: "invitationCodeInput" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.InputFieldValueEntered, cv.Enum.Functionality.registration, properties);
    }

    public onShowAreaCode(){

          cv.AudioMgr.playButtonSound('button_click');

          let add = this.btnShowInvite.getChildByName("add");
          let del = this.btnShowInvite.getChildByName("del");

          this.invate_code_panel.active =  !this.invate_code_panel.active;

          add.active = !this.invate_code_panel.active;
          del.active = this.invate_code_panel.active;

          if(this.invate_code_panel.active){ 
            //拥有邀请码
            cv.StringTools.setLabelString(this.btnShowInvite, "Label", "Login_Scene_register_panel_tips2");
            

          }else{
            //没有邀请码
            cc.find("invate_code_panel/invateCode_text", this.node).getComponent(cc.EditBox).string = "";
            cv.StringTools.setLabelString(this.btnShowInvite, "Label", "Login_Scene_register_panel_tips3");
          }

          this.updateInviteCode();
    }


    
    /**
     * 用户输入手机号完成
     */
    public enterPhoneNumberComplete() {
         let mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        // let obj = {
        //     phoneNum: mobile,
        // }


        this.btnVerity.getComponent(cc.Button).interactable = mobile.length > 0? true:false;

        //跟踪用户行为，发送事件
        let properties = { item: "mobileInput" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.InputFieldValueEntered, cv.Enum.Functionality.registration, properties);
    }

    /**
     * 用户输入验证码完成
     */
    public enterValidationComplete() {
         let VCode = cc.find("setPassword_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;
        // let obj = {
        //     KVCode: VCode,
        // }
        // let isValid = cv.tools.showError(obj);

        this.next_button.getComponent(cc.Button).interactable = VCode.length > 0? true:false;
        //跟踪用户行为，发送事件
        let properties = { item: "validationCodeInput" };//isValid: isValid
        cv.segmentTool.track(cv.Enum.CurrentScreen.validation, cv.Enum.segmentEvent.InputFieldValueEntered, cv.Enum.Functionality.registration, properties);
    }



    public onBeginInputEdit(event: cc.Event, CustomEventData){

        let index = Number(CustomEventData) - 1;
        for(let i = 0; i < this.inputBg.length; i++){
            this.inputBg[i].active = true;
        }
        for(let i = 0; i < this.inputBgChoice.length; i++){
            this.inputBgChoice[i].active = false;
        }
      
        this.inputBgChoice[index].active = true;
        this.inputBg[index].active = false;
    }

 
}
