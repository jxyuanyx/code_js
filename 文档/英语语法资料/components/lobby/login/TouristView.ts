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
export default class TouristView extends cc.Component {
    onLoad() {
        let layout = cc.find("layout", this.node);
        let layout2 = cc.find("layout2", this.node);
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            layout.active = false;
        }
        else {
            layout2.active = false;
        }
    }


    start() {
        let layout2 = cc.find("layout2", this.node);
        if (layout2.active) return;
        cc.find("layout/tipsTitle", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_tourist_panel_tourist_title");
        let str = cv.config.getStringData("Login_Scene_tourist_panel_tourist_detaile");
        let text = cc.find("layout/tipsDetails", this.node);
        cc.find("layout/tipsDetails", this.node).getComponent(cc.Label).string = cv.StringTools.calculateAutoWrapString(text, str);
        cc.find("layout/tipsDetails0", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_tourist_panel_tourist_detaile0");
        cc.find("layout/tipsDetails1", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_tourist_panel_tourist_detaile1");
        cc.find("layout/tipsDetails2", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_tourist_panel_tourist_detaile2");
        cc.find("layout/tourist_pl_continuebutton/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_login_panel_tourist_continue_button");
        cc.find("layout/tourist_pl_regiestbutton/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Login_Scene_login_panel_register_button");
    }

    onDestroy() {
        
    }

    initText() {

 
    }
}
