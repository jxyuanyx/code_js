// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "./../../lobby/cv"
const { ccclass, property } = cc._decorator;

@ccclass
export class FaceItem extends cc.Component {
    _index: number = 0;
    canClick: boolean = true;

    onLoad() {
        cv.MessageCenter.register("FaceItem_canSendFace", this.setClick.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("FaceItem_canSendFace", this.node);
    }

    setData(index: number, num: number) {
        this._index = index;
        let number_text = cc.find("number_text", this.node);
        let Image_3 = cc.find("Image_3", this.node);
        let effect_img = cc.find("effect_img", this.node);
        if (num <= 0) {
            Image_3.active = (false);
            number_text.active = (false);
            effect_img.position.y = 78;
        }
        else {
            number_text.getComponent(cc.Label).string = (cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(num)));
            number_text.active = (true);
            Image_3.active = (true);
            effect_img.position.y = 94;
        }
        cv.resMgr.setSpriteFrame(effect_img,"zh_CN/game/dzpoker/animation/icon/item_" + index);
    }
    setClick(canClick: boolean) {
        this.canClick = canClick;
    }

    onBtnItemClick() {
        if (!this.canClick) return;
        cv.MessageCenter.send("effet_call", this._index);
    }
}
