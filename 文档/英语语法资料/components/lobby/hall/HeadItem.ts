import { headData, headRowData } from "./RoleInfoSet";
import cv from "../cv";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeadItem extends cc.Component {
    _index: number = 0;
    updateSVReuseData(index: number, dataArray: Array<headRowData>): void {
        if (index < 0 || dataArray.length <= 0 || dataArray.length - 1 < index) return;
        this._index = index;
        for (let i = 0; i < 5; i++) {
            cv.resMgr.setSpriteFrame(cc.find("Image_head_" + i, this.node), dataArray[index].itemData[i].head_url);
            cc.find(cv.StringTools.formatC("Image_head_%d/Image_head_select", i), this.node).active = dataArray[index].itemData[i].ischoose;
        }
        /*
        cv.resMgr.setSpriteFrame(cc.find("Image_head_1", this.node), dataArray[index].head_0);
        cv.resMgr.setSpriteFrame(cc.find("Image_head_2", this.node), dataArray[index].head_1);

        if (dataArray[index].choose_0) {
            cc.find("Image_head_1/Image_head_mask", this.node).active = false;
            cc.find("Image_head_1/Image_head_mask_2", this.node).active = true;
        }
        else {
            cc.find("Image_head_1/Image_head_mask", this.node).active = true;
            cc.find("Image_head_1/Image_head_mask_2", this.node).active = false;
        }

        if (dataArray[index].choose_1) {
            cc.find("Image_head_2/Image_head_mask", this.node).active = false;
            cc.find("Image_head_2/Image_head_mask_2", this.node).active = true;
        }
        else {
            cc.find("Image_head_2/Image_head_mask", this.node).active = true;
            cc.find("Image_head_2/Image_head_mask_2", this.node).active = false;
        }*/
    }

    onBtnHeadClick(event: cc.Event, parm: any) {
        cv.AudioMgr.playButtonSound('button_click');
        /*let offset = 0;
        if (event.target.name == "Image_head_1") {
            offset = 0;
        }
        else {
            offset = 1;
        }*/
        let headIndex = this._index * 5 + cv.Number(parm) + 1;
        cv.MessageCenter.send("clickHeadItem", headIndex);
    }
}
