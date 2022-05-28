import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { GiftRecordInfo } from "./GiftData";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftGoodsRecordItem extends cc.Component {
    @property(cc.Node) img: cc.Node = null;
    @property(cc.RichText) txt: cc.RichText = null;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
    }

    protected start(): void {
    }

    updateSVReuseData(index: number, info: GiftRecordInfo): void {
        let text: string = "";
        let giftID: number = info.data.info.tipId;
        let giftCount: number = info.data.info.tipCount;
        let strSent: string = cv.config.getStringData("Gift_sent");
        let strTime: string = cv.StringTools.formatTime(info.data.time, cv.Enum.eTimeType.Hour_Min_Sec, true);
        let strGiftName: string = cv.config.getStringData(`Gift_category_${giftID}`);
        let strGiftCount: string = giftID > 1000 ? ` <img src="gift_icon_${giftID}"/>` : ` x ${giftCount}`;
        let strGiftDesc: string = strGiftName + strGiftCount;

        switch (info.tType) {
            case game_pb.TipRecordType.TipRecordType_Recv: {
                // 玩家身份(这个只在玩家动态消息那里赋值了): 0.普通 1.明星 2.解说员 3.特邀玩家
                if (info.data.player.identity === 1) {
                    text = `<color=#FFCD7E>${strTime}</color> <img src="img_icon_star"/> <color=#FFCD7E>${info.data.player.nickname} ${strSent} ${strGiftDesc}</color>`;
                }
                else {
                    text = `${strTime} ${info.data.player.nickname} ${strSent} ${strGiftDesc}`;
                }
            } break;

            case game_pb.TipRecordType.TipRecordType_Send:
            default: {
                text = `${strTime} ${strSent} ${info.data.toPlayer.nickname} ${strGiftDesc}`;
            } break;
        }

        this.txt.string = text;
        this.img.active = giftID > 1000;
        if (this.img.active) {
            let w: number = cv.resMgr.getRichTextStringSize(this.txt).width;
            this.img.width = Math.min(w + 40, this.node.width);
        }
    }
}
