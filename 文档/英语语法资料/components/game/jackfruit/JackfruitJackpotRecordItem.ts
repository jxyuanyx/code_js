import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class JackfruitJackpotRecordItem extends cc.Component {
    setdata(award_players: any) {
        let playerName: cc.Label = this.node.getChildByName("playerName_text").getComponent(cc.Label)
        let cardTypeName: cc.Label = this.node.getChildByName("cardTypeName_text").getComponent(cc.Label)
        let award: cc.Label = this.node.getChildByName("award_text").getComponent(cc.Label)
        let times: cc.Label = this.node.getChildByName("day_text").getComponent(cc.Label)
        cv.StringTools.setShrinkString(playerName.node, award_players.playerName, true);
        award.string = cv.StringTools.numberToString(award_players.awardAmount / 100);
        cardTypeName.string = cv.config.getStringData(`M_UITitle${112 + award_players.level}`);
        times.string = cv.StringTools.formatTime(award_players.awardTime, cv.Enum.eTimeType.Month_Day, false);
    }
}