import cv from "../../lobby/cv";
import { AwardInfo } from "./data/JackpotData";

const { ccclass, property } = cc._decorator;
@ccclass
export class GameJackPotSignItem extends cc.Component {
    
    setdata(award_players: AwardInfo) {
        let playerName: cc.Label = this.node.getChildByName("playerName_text").getComponent(cc.Label)
        let cardTypeName: cc.Label = this.node.getChildByName("cardTypeName_text").getComponent(cc.Label)
        let award: cc.Label = this.node.getChildByName("award_text").getComponent(cc.Label)
        let times: cc.Label = this.node.getChildByName("day_text").getComponent(cc.Label)
        cv.StringTools.setShrinkString(playerName.node, award_players.player_name, true);
        award.string = cv.StringTools.numberToString(award_players.award_amount / 100);
        cardTypeName.string = cv.config.getStringData(`UITitle${112 + award_players.hand_level}`);
        times.string = cv.StringTools.formatTime(award_players.award_time, cv.Enum.eTimeType.Month_Day, false);
    }
}