import cv from "../../../lobby/cv";
import { LANGUAGE_TYPE } from "../../../../common/tools/Enum";
import { GiftData, GiftNewsInfo } from "./GiftData";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftSmallBoxItem extends cc.Component {
    @property(cc.Sprite) img_sender_bg: cc.Sprite = null;
    @property(cc.Label) txt_tmp_cache: cc.Label = null;
    @property(cc.Label) txt_tmp_name1: cc.Label = null;
    @property(cc.Label) txt_tmp_name2: cc.Label = null;
    @property(cc.RichText) txt_content: cc.RichText = null;

    protected onLoad(): void {
        this.img_sender_bg.node.active = false;
        this.txt_tmp_cache.node.active = false;
        this.txt_tmp_name1.node.active = false;
        this.txt_tmp_name2.node.active = false;
    }

    protected start(): void {
    }

    updateSVReuseData(index: number, data: GiftNewsInfo): void {
        let giftID: number = data.gift.tip.tipId;
        let giftCount: number = data.gift.tip.tipCount;
        let strSenderName: string = data.gift.player.nickname;
        let strRecipientName: string = data.gift.toPlayer.nickname;
        let strSend: string = cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN ? cv.config.getStringData("Gift_sent") : "Sent";
        let strGiftName: string = cv.config.getStringData(`Gift_category_${giftID}`);
        let strGiftCount: string = ` x ${giftCount}`;
        let atlasPath: string = GiftData.GIFT_PLIST_PATH;

        // 计算富文本图片的正确宽高
        if (giftID > 1000) {
            let max_width: number = 60;
            let frame: cc.SpriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, `gift_icon_${giftID}`);
            let frameSize: cc.Size = frame.getOriginalSize();
            let scale_w: number = max_width / frameSize.width;
            let scale_h: number = this.txt_tmp_cache.node.height / frameSize.height;
            let scaleRatio: number = scale_h;
            if (scale_w < scale_h) scaleRatio = scale_w;

            let w: number = scaleRatio * frameSize.width;
            let h: number = scaleRatio * frameSize.height;
            strGiftCount = ` <img src="gift_icon_${giftID}" width=${w} height=${h}/>`;
        }

        let strGiftDesc: string = strGiftName + strGiftCount;

        // 发送者昵称省略号模式
        cv.StringTools.setShrinkString(this.txt_tmp_name1.node, strSenderName);
        strSenderName = this.txt_tmp_name1.string;

        // 接收者昵称省略号模式
        cv.StringTools.setShrinkString(this.txt_tmp_name2.node, strRecipientName);
        strRecipientName = `<color=#FFCD7E>${this.txt_tmp_name2.string}</color>`;

        // 计算发送者昵称省略号模式后的宽度
        this.txt_tmp_cache.string = strSenderName;
        let szSenderName: cc.Size = cv.resMgr.getLabelStringSize(this.txt_tmp_cache);
        this.img_sender_bg.node.width = szSenderName.width + 6;
        this.img_sender_bg.node.active = true;

        let img_sender_fileName: string = "img_smallbox_name_bg1";
        if (giftID > 1000) img_sender_fileName = "img_smallbox_name_bg2";
        if (data.gift.player.identity === 1) img_sender_fileName = "img_smallbox_name_bg3";
        this.img_sender_bg.spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, img_sender_fileName);

        // 拼接显示文本
        let text: string = "";
        text += strSenderName + " " + strSend;
        text += "\n";
        text += strRecipientName;
        text += "\n";
        text += strGiftDesc;
        this.txt_content.string = text;
    }
}
