import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { GiftNewsInfo } from "./GiftData";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftPanelDetailItemSys extends cc.Component {

    @property(cc.Label) txt: cc.Label = null;

    protected onLoad(): void {
    }

    protected start(): void {
    }

    updateSVReuseData(index: number, data: GiftNewsInfo): void {
        // identity: 0.普通 1.明星 2.解说员 3.特邀玩家
        switch (data.gift.dynamic) {
            case game_pb.PlayerDynamicValue.PlayerDynamicValue_JoinRoom: {
                let format: string = "%s";
                if (data.gift.player.identity === 1) {
                    format = cv.config.getStringData("Gift_star_join");
                }
                else if (data.gift.player.identity === 3) {
                    format = cv.config.getStringData("Gift_special_guest_join");
                }
                this.txt.string = cv.StringTools.formatC(format, data.gift.player.nickname);
            } break;

            case game_pb.PlayerDynamicValue.PlayerDynamicValue_Sit: {
                let format: string = "%s";
                if (data.gift.player.identity === 1) {
                    format = cv.config.getStringData("Gift_star_sit");
                }
                else if (data.gift.player.identity === 3) {
                    format = cv.config.getStringData("Gift_special_guest_sit");
                }
                this.txt.string = cv.StringTools.formatC(format, data.gift.player.nickname);
            } break;

            default: break;
        }
    }
}
