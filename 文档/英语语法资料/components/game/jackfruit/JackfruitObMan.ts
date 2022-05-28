// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;

@ccclass
export class JackfruitObMan extends cc.Component {

    @property(cc.Label) label: cc.Label = null;
    @property(cc.Label) obworld: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        console.log(this.node.x);
    }
    setdata(data){
        this.label.string = cv.StringTools.formatC("（%d/%d）", data.onlineNum, data.totalNum);
        
        this.obworld.string = cv.config.getStringData("curentTime_curentTime_panel_obWord_text");
    }
    // update (dt) {}
}
