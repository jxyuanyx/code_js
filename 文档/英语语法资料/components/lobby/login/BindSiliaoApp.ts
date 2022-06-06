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
import LoginScene from "./LoginScene";
import UpgradeView from "./UpgradeView";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BindSiliaoApp extends cc.Component {

    _backClickCallBack: Function = null;
    public _areaCode: cc.Node = null;

    private  verityAppCdTime_app: number = 0;  //私聊验证码倒计时
    onLoad() {
       
        this.initText();
        this.registerMsg();
        cv.resMgr.adaptWidget(this.node);
        this.schedule(this.updateActiveAppCdTime_app, 1);
        cv.action.listenEditboxLimitNum(cc.find("setPassword_Panel/identifynum_text", this.node).getComponent(cc.EditBox));
        cv.dataHandler.getUserData().bindInputSLAccount = "";
    }

    start() {
    
    }

    init(backClickCallBack: Function) {
        this._backClickCallBack = backClickCallBack;
    }

    initText() {
        //第一步弹框
        cv.action.setText(this.node, "Text_4", "siyu_title_tips02");  //短信验证
        cv.action.setText(this.node, "setPassword_Panel/identify_button/Label", "getCode");

        cv.action.setText(this.node, "setPassword_Panel/identifynum_text", "siyu_input_tips01", true);
        cv.action.setText(this.node, "siliao_Panel/siliaoNumber_text", "siyu_input_tips02", true);
        cv.action.setText(this.node, "btnContinue", "siyu_title_tips05");  //跳过
        
      
        let txtTips1 =  cc.find("setPassword_Panel/siliaoTips", this.node);   //还没有私语账号
        let btnDown =  cc.find("setPassword_Panel/btnDownApp", this.node);   //立即下载注册
        let btnDownTips =  cc.find("setPassword_Panel/btnDownApp/tips", this.node);   //立即下载注册
        txtTips1.getComponent(cc.Label).string =  cv.config.getStringData("siyu_title_tips03")
        btnDownTips.getComponent(cc.Label).string =  cv.config.getStringData("siyu_title_tips04")
        cv.resMgr.adaptWidget(txtTips1, false);
        if(cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN){
            btnDown.x = txtTips1.x + cv.resMgr.getLabelStringSize(txtTips1.getComponent(cc.Label)).width + 5;
            btnDown.y = txtTips1.y;
        }else{
            btnDown.x = txtTips1.x;
            btnDown.y = txtTips1.y - cv.resMgr.getLabelStringSize(txtTips1.getComponent(cc.Label)).height/2 - 5;
        }
    
        let _line =  cc.find("setPassword_Panel/btnDownApp/line", this.node);   //立即下载注册
        _line.setContentSize(cv.resMgr.getLabelStringSize(btnDownTips.getComponent(cc.Label)).width, _line.height);
    }

    registerMsg() {

        

        cv.MessageCenter.register("onBindSiliaoVcodeSuc", this.onGetSiliaoVcodeSuc.bind(this), this.node);
        cv.MessageCenter.register("onBindSiliaoSucces", this.onBindSiliaoSucces.bind(this), this.node);
    }

    onDestroy(){
        cv.MessageCenter.unregister("onBindSiliaoSucces", this.node);
        cv.MessageCenter.unregister("onBindSiliaoVcodeSuc", this.node);
    }



    //获取私聊验证码  倒计时定时器
    updateActiveAppCdTime_app() {
        if (this.verityAppCdTime_app < 1) return;

        this.verityAppCdTime_app--;
        this.showCodeCdTime(this.verityAppCdTime_app);
    }

    showCodeCdTime(index: number) {
        this.verityAppCdTime_app = index;
        let rcodeLabel = cc.find("setPassword_Panel/identify_button/Label", this.node).getComponent(cc.Label);
        let isTrue = (index != 0);
        if (isTrue) {
            rcodeLabel.string = this.verityAppCdTime_app + 's';
        }
        else {
            rcodeLabel.string = cv.config.getStringData("getCode");
        }
    }

    //获取验证码
    onClickIdCode() {

        //获取私聊验证码
        if (this.verityAppCdTime_app > 0) return;
        let siliaoAccount = cc.find("siliao_Panel/siliaoNumber_text", this.node).getComponent(cc.EditBox).string;


        
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
             //注册流程
            cv.httpHandler.requestGet_bindSiliaoVcode(siliaoAccount, 1); 
        }else{
            //升级流程
            cv.httpHandler.requestGet_bindSiliaoVcode(siliaoAccount, 2); 
        }
   
    }

    //获取验证码成功
    onGetSiliaoVcodeSuc(){
        this.showCodeCdTime(60);
    }

    //跳过
    onSkipBind(){
        cv.AudioMgr.playButtonSound('button_click');
        cv.MessageCenter.send("register_to_bindSiliao");
    }

    //上一步
    onClickBackButton(){
        cv.MessageCenter.send("onExitBindSiliaoClick");
    }

   //下一步
    onClickOKButton(){
        cv.AudioMgr.playButtonSound('button_click');

        let siliaoAccount = cc.find("siliao_Panel/siliaoNumber_text", this.node).getComponent(cc.EditBox).string;
        let siliaoCode = cc.find("setPassword_Panel/identifynum_text", this.node).getComponent(cc.EditBox).string;
        if(siliaoAccount.length <=0 || siliaoCode.length <= 0){
            cv.TP.showMsg(cv.config.getStringData("siyu_siliao_check01"), cv.Enum.ButtonStyle.TWO_BUTTON, ()=>{
                cv.MessageCenter.send("register_to_bindSiliao");
            });
            return;
        }

            //绑定私聊请求
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            //注册流程
            cv.httpHandler.requestCheck_bindSiliao(siliaoAccount, siliaoCode, 1);
        }else{
            //升级流程
            cv.httpHandler.requestCheck_bindSiliao(siliaoAccount, siliaoCode, 2);
        }
    
    }

    //绑定私聊成功
    onBindSiliaoSucces(){
        console.log("bindSiliaoApp onBindSiliaoSucces");
        cv.MessageCenter.send("register_to_bindSiliao");
        let siliaoAccount = cc.find("siliao_Panel/siliaoNumber_text", this.node).getComponent(cc.EditBox).string;
        cv.dataHandler.getUserData().bindInputSLAccount = siliaoAccount;
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
}
