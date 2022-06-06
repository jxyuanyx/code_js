
import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;
import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyJackpotItem extends cc.Component {
    @property(cc.Sprite) bg_img: cc.Sprite = null;
    @property(cc.Label) playername_text: cc.Label = null;
    @property(cc.Label) day_text: cc.Label = null;
    @property(cc.Label) award_text: cc.Label = null;
    @property(cc.Label) cardtypename_text: cc.Label = null;

    protected onLoad(): void {

    }

    public setData(playerData: humanboy_proto.AwardData): void {
        this.playername_text.node.setContentSize(cc.size(120, 60));
        cv.StringTools.setShrinkString(this.playername_text.node, playerData.name);

        let numStr = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(playerData.amount));
        this.award_text.string = numStr;

        if (playerData.handLevel == 8) {
            cv.StringTools.setShrinkString(this.cardtypename_text.node, cv.config.getStringData("Humanboy_game_card_type_four_of_a_kind"));
        }
        else {
            cv.StringTools.setShrinkString(this.cardtypename_text.node, cv.config.getStringData(cv.StringTools.formatC("M_UITitle%d", 112 + playerData.handLevel)));
        }

        this.day_text.string = cv.StringTools.formatTime(playerData.timeStamp, cv.Enum.eTimeType.Month_Day);

        this.cardtypename_text.node.setContentSize(cc.size(204, 60));

        this.cardtypename_text.node.opacity = 125;
        this.cardtypename_text.node.color = cc.color(232, 201, 147);

        this.day_text.node.opacity = 125;
        this.day_text.node.color = cc.color(232, 201, 147);
    }

    public setFirstData(playerData: humanboy_proto.AwardData): void {
        this.bg_img.node.active = true;
        this.playername_text.fontSize = 28;
        this.day_text.fontSize = 28;
        this.cardtypename_text.fontSize = 28;

        this.cardtypename_text.node.setContentSize(cc.size(204, 60));
        this.playername_text.node.setContentSize(cc.size(120, 60));

        cv.StringTools.setShrinkString(this.playername_text.node, playerData.name);

        let numStr = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(playerData.amount));
        this.award_text.string = numStr;

        if (playerData.handLevel == 8) {
            cv.StringTools.setShrinkString(this.cardtypename_text.node, cv.config.getStringData("Humanboy_game_card_type_four_of_a_kind"));
        }
        else {
            cv.StringTools.setShrinkString(this.cardtypename_text.node, cv.config.getStringData(cv.StringTools.formatC("M_UITitle%d", 112 + playerData.handLevel)));
        }

        this.day_text.string = cv.StringTools.formatTime(playerData.timeStamp, cv.Enum.eTimeType.Month_Day);
        this.day_text.node.x = 266;
    }

    protected start(): void {

    }
}
