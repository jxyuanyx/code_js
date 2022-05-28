import cv from "../../../lobby/cv";
import { GiftData } from "./GiftData";

export class GiftPanelDetailItemMsgData {
    text: string = "";
    width: number = 0;
    typeIdx: number = 0;
    isGiftMsg: boolean = false;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftPanelDetailItemMsg extends cc.Component {
    @property(cc.Sprite) img: cc.Sprite = null;
    @property(cc.RichText) txt: cc.RichText = null;

    private _bg_offset_width: number = 0;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.txt.maxWidth = this.txt.node.width;

        let widget: cc.Widget = this.txt.getComponent(cc.Widget);
        this._bg_offset_width = widget.left + widget.right;
    }

    /**
     * 该节点出池时触发(NodePool.get)
     */
    protected reuse(): void {
    }

    /**
     * 该节点入池时触发(NodePool.put)
     */
    protected unuse(): void {
        this.txt.string = "";

        if (this.img) {
            this.img.node.width = 0;
            this.img.node.active = false;
        }
    }

    updateSVReuseData(index: number, data: GiftPanelDetailItemMsgData): void {
        this.txt.string = data.text;

        if (this.img) {
            this.img.node.active = true;
            this.img.node.width = Math.min(data.width + this._bg_offset_width, this.node.width);
            let fileName: string = data.isGiftMsg ? "img_msg_bg_1" : "img_msg_bg_2";
            let atlasPath: string = GiftData.GIFT_PLIST_PATH;
            this.img.spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, fileName);
        }
    }
}
