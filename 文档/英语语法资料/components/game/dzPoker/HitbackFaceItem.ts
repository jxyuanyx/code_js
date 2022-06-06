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
export class HitbackFaceItem extends cc.Component {
    _index: number = 0;
    _type: number = 0;
    canClick: boolean = true;

    // onLoad() {
    //     cv.MessageCenter.register("FaceItem_canSendFace", this.setClick.bind(this), this.node);
    // }

    // onDestroy() {
    //     cv.MessageCenter.unregister("FaceItem_canSendFace", this.node);
    // }

    setData(index: number, num: number, type: number) {
        this._index = index;
        this._type = type;
        let number_text = cc.find("number_text", this.node);
        let free_text = cc.find("free_text", this.node);
        let Image_3 = cc.find("Image_3", this.node);
        let effect_img = cc.find("effect_img", this.node);

        if (type == 0) {
            free_text.getComponent(cc.Label).string = cv.config.getStringData("Star_free_hitback");
        }
        else if (type == 1) {
            free_text.getComponent(cc.Label).string = cv.config.getStringData("Star_free_welcome");
        }

        if (num <= 0) {
            Image_3.active = (false);
            number_text.active = (false);
            free_text.active = true;
            effect_img.position.y = 78;
        }
        else {
            number_text.getComponent(cc.Label).string = (cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(num)));
            number_text.active = (true);
            Image_3.active = (true);
            effect_img.position.y = 94;
            free_text.active = false;
        }
        let frame: cc.SpriteFrame = null;
        if (index < 6) {
            cv.resMgr.load("zh_CN/game/dzpoker/animation/icon/effect", cc.SpriteAtlas, (atlas: cc.SpriteAtlas): void => {
                frame = atlas.getSpriteFrame(cv.StringTools.formatC("animation-icon-icon%d", index));
                effect_img.getComponent(cc.Sprite).spriteFrame = frame;
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);

            //frame = cv.resMgr.getSpriteAtlasFrame("zh_CN/game/dzpoker/animation/icon/effect", cv.StringTools.formatC("animation-icon-icon%d", index));
        }
        else if (index == 6) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/calmDown");
            return;
        }
        else if (index < 12) {
            cv.resMgr.load("zh_CN/game/dzpoker/animation/icon/effect", cc.SpriteAtlas, (atlas: cc.SpriteAtlas): void => {
                frame = atlas.getSpriteFrame(cv.StringTools.formatC("animation-icon-icon%d", index - 1));
                effect_img.getComponent(cc.Sprite).spriteFrame = frame;
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);

            //frame = cv.resMgr.getSpriteAtlasFrame("zh_CN/game/dzpoker/animation/icon/effect", cv.StringTools.formatC("animation-icon-icon%d", index-1));
        }
        else if (index == 12) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/fist");
            return;
        }
        else if (index == 13) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/zhuaji");
            return;
        }
        else if (index == 14) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/flower");
            return;
        }
        else if (index == 15) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/money");
            return;
        }
        else if (index == 16) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/towel");
            return;
        }
        else if (index == 17) {
            cv.resMgr.setSpriteFrame(effect_img, "zh_CN/game/dzpoker/animation/icon/fan");
            return;
        }
    }
    // setClick(canClick: boolean) {
    //     this.canClick = canClick;
    // }

    onBtnItemClick() {
        if (!this.canClick) return;
        cv.MessageCenter.send("closehitback");
        cv.MessageCenter.send("effect_hit_call", { index: this._index, type: this._type });
    }
}
