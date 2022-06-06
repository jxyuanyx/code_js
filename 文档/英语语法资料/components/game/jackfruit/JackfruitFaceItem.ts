
import cv from "./../../lobby/cv"

const {ccclass, property} = cc._decorator;

@ccclass
export default class JackftuitFaceItem extends cc.Component {

    @property(cc.Node) face_img: cc.Node = null;
    @property(cc.Label) gold_label: cc.Label = null;
    @property(cc.Node) gold_img: cc.Node = null;
    _index: number = 0;
    canClick: boolean = true;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onBtnItemClick.bind(this), this);
        cv.MessageCenter.register("FaceItem_canSendFace", this.setClick.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("FaceItem_canSendFace", this.node);
    }
    
    setData(index: number, num: number) {
        this._index = index;
        if (num == -1) {
            this.gold_label.node.active = (false);
            this.gold_img.active = (false);
            this.face_img.position.y = 5;
        }
        else {
            this.gold_label.getComponent(cc.Label).string = (cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(num)));
            this.gold_label.node.active = (true);
            this.gold_img.active = (true);
            this.face_img.position.y = 15;
        }
        let frame: cc.SpriteFrame = null;
        if (index < 6) {
            frame = cv.resMgr.getSpriteAtlasFrame("zh_CN/game/dzpoker/animation/icon/effect", cv.StringTools.formatC("animation-icon-icon%d", index));
        }
        else if (index == 6) {
            cv.resMgr.setSpriteFrame(this.face_img,"zh_CN/game/dzpoker/animation/icon/calmDown");
            return;
        }
        else {
            frame = cv.resMgr.getSpriteAtlasFrame("zh_CN/game/dzpoker/animation/icon/effect", cv.StringTools.formatC("animation-icon-icon%d", index-1));
        }
        this.face_img.getComponent(cc.Sprite).spriteFrame = frame;
    }

    setClick(canClick: boolean) {
        this.canClick = canClick;
    }

    onBtnItemClick() {
        if (!this.canClick) return;
        cv.MessageCenter.send("effet_call", this._index);
    }
    // update (dt) {}
}
