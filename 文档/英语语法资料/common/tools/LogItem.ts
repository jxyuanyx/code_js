// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../../components/lobby/cv";

const { ccclass, property } = cc._decorator;

@ccclass
export class LogItem extends cc.Component {
    @property(cc.Label) label: cc.Label = null;

    onLoad() {
        //this.label.node.setContentSize(900,120);
        this.label.enableWrapText = true;
    }

    start() {

    }

    updateSVReuseData(index: number, dataArray: Array<any>): void {
        //console.log("updateSVReuseData - " + index);
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        
        this.label.string = dataArray[index];
        //console.log( "updateSVReuseData::" + this.label.node.height);
    }
}
