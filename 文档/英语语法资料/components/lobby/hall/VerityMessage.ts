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
export default class VerityMessage extends cc.Component {

    @property(cc.Prefab) areaCode_prefab: cc.Prefab = null;
    private _bInitAreaCode: boolean = false;
    _backClickCallBack: Function = null;
    public _areaCode: cc.Node = null;
    private _verityHand: cc.Node = null;

    private  verityMsgCdTime: number = 0;  //绑定手机倒计时

    onLoad() {
        this.initText();
        this.registerMsg();
        this.schedule(this.updateActiveMsgCdTime, 1);
        cv.action.listenEditboxLimitNum(cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox));
        cv.action.listenEditboxLimitNum(cc.find("password_Panel/identifynum_text", this.node).getComponent(cc.EditBox));
    }

    start() {

    }

    

    onDestroy(){
        cv.MessageCenter.unregister("onChangeTypeToAppSucces", this.node);
        cv.MessageCenter.unregister("onActiveGetCode", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    registerMsg() {
        cv.MessageCenter.register("onChangeTypeToMsgSucces", this.onChangeTypeByMsgSucFunc.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initText.bind(this), this.node);
        cv.MessageCenter.register("onActiveGetCode", this.onActiveGetCode.bind(this), this.node);
    }

    init(verityHande: cc.Node, backClickCallBack: Function) {
        this.clearInputData();
        this._verityHand = verityHande;
        this._backClickCallBack = backClickCallBack;
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
        cv.action.setText(this.node, "Label", "siyu_verity_message");  //短信验证
        cv.action.setText(this.node, "password_Panel/identify_button/Label", "getCode");
        cv.action.setText(this.node, "sure_button/Label", "siyu_btn_active");
        cv.action.setText(this.node, "password_Panel/identifynum_text", "siyu_input_tips04", true);
        cv.action.setText(this.node, "phone_Panel/phoneNumber_text", "siyu_input_tips03", true);
        cv.action.setText(this.node, "txtTips", "siyu_title_tips06");  //提示用语
        
    }

   

    updateActiveMsgCdTime() {
        if (this.verityMsgCdTime < 1) return;

        this.verityMsgCdTime--;
        this.showCdTime(this.verityMsgCdTime);
    }

      //获取验证码
      onClickIdCode() {
        let phoneNum;
        let codeStr;
    
        //激活短信验证界面
        if (this.verityMsgCdTime > 0) return;
        phoneNum = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        codeStr = cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;
       
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
    }

    //请求获取验证码
    getVerityIdCode() {
        let phoneNum;
        let codeStr;
        codeStr = cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;
        let pos = codeStr.indexOf("+");
        codeStr = codeStr.substring(pos + 1, codeStr.length);

        phoneNum = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        
        //获取私聊切短信的验证码
        cv.httpHandler.requestActive_getMsgVcode(codeStr,phoneNum, 1);
    }

    //请求获取验证码成功
    onActiveGetCode(){
        this.showCdTime(60);
    }


    showCdTime(index: number) {
        this.verityMsgCdTime = index;
        let rcodeLabel = cc.find("password_Panel/identify_button/Label", this.node).getComponent(cc.Label);
        let isTrue = (index != 0);
        if (isTrue) {
            rcodeLabel.string = this.verityMsgCdTime + 's';
        }
        else {
            rcodeLabel.string = cv.config.getStringData("getCode");
        }
    }

    //返回上一级
    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');
        if (this._backClickCallBack) {
            this._backClickCallBack();
        }
    }

    //激活按钮
    onBtnActiveBindPhonenumber() {
        cv.AudioMgr.playButtonSound('button_click');
        var mobile = cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string;
        var VCode = cc.find("password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;
        var areaCode= cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string;

        let pos = areaCode.indexOf("+");
        areaCode = areaCode.substring(pos + 1, areaCode.length);

        if(mobile.length == 0){
            cv.TT.showMsg(cv.config.getStringData("ErrorToast28"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }else{
           if (this._verityHand.getComponent(ChooseVerity).showError({
                AreaCode: areaCode,
                KVCode: VCode,
                })) 
            {
                return;
            }
        }

        cv.httpHandler.requestActive_changeTypeByMsg(areaCode, mobile, 1, VCode, "");
    }

    //激活成功  切换到短信验证
    onChangeTypeByMsgSucFunc(){
        cv.dataHandler.getUserData().verityType = cv.Enum.VerityGetType.Message_Get;
        cv.MessageCenter.send("onChangeVerityType");

        //返回上一级
        this.onBtnBackClick();
        this.clearInputData();
    
    }


    clearInputData(){
        cc.find("phone_Panel/phoneNumber_text", this.node).getComponent(cc.EditBox).string = "";
        cc.find("password_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string = "";
        //cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string = "CN+86";
        this.showCdTime(0);
    }
   
    _updateAreaCode(codeTemp: string) {
        cc.find("phone_Panel/areaCode_text", this.node).getComponent(cc.Label).string = codeTemp;
    
    }

    //选择号码区域
    onBtnAreaCodeClick(event: cc.Event, CustomEventData) {
        this._initAreaCode();
        this._areaCode.active = true;
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
