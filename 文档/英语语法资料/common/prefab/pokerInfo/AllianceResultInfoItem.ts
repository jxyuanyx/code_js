import cv from "./../../../components/lobby/cv"
import { CircleSprite } from "../../tools/CircleSprite";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceResultInfoItem extends cc.Component {
    msg: any = null;
    insurance: number = 0;
    hand_word_text_record: cc.Vec2 = null;

    onLoad() {
        let hand_word_text = this.node.getChildByName("hand_word_text");
        this.hand_word_text_record = hand_word_text.position;
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage() {
        cv.StringTools.setLabelString(this.node, "buyinword_text", "AllianceResultInfoItem_buyinword_text");
        cv.StringTools.setLabelString(this.node, "hand_word_text", "AllianceResultInfoItem_hand_word_text");

        this.updateBuyinAndHandsPos();
    }

    updateBuyinAndHandsPos(): void {
        let buyinword_text = this.node.getChildByName("buyinword_text");
        let hand_word_text = this.node.getChildByName("hand_word_text");
        let buyin_text = this.node.getChildByName("buyin_text");
        buyin_text.setPosition(buyinword_text.x + cv.resMgr.getLabelStringSize(buyinword_text.getComponent(cc.Label)).width * 0.5 + 12, buyinword_text.y);

        let size = cv.resMgr.getLabelStringSize(buyin_text.getComponent(cc.Label));
        if (buyin_text.x + size.width + 20 > this.hand_word_text_record.x) {
            hand_word_text.setPosition(buyin_text.x + size.width + 20, hand_word_text.y);
        }
        else {
            hand_word_text.setPosition(this.hand_word_text_record.x, hand_word_text.y);
        }

        this.node.getChildByName("handcount_text").setPosition(hand_word_text.x + cv.resMgr.getLabelStringSize(hand_word_text.getComponent(cc.Label)).width + 12, hand_word_text.y);
    }

    hideLine() {
        cc.find("ling_img", this.node).active = false;
    }

    getBuyInData(uid: number): any {
        for (let k = 0; k < cv.StringTools.getArrayLength(this.msg.buyins); k++) {
            if (uid == this.msg.buyins[k].UID) {
                return this.msg.buyins[k];
            }
        }
        return null;
    }

    isCanSeeAllianceResult(uid: number) {
        if (cv.StringTools.getArrayLength(this.msg.clubInfos) <= 0) return false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this.msg.club_adminids); i++) {
            if (uid == this.msg.club_adminids[i]) return true;
        }
        return false;
    }

    getTextNumber(): number {
        return this.insurance;
    }

    setData(msg: any, uid: number, resultType: number) {
        this.msg = msg;
        this.initLanguage();
        let name_text = cc.find("name_text", this.node);

        let data = this.getBuyInData(uid);

        let remark = cv.dataHandler.getUserData().getUserRemark(data.UID);

        let id: string = "";
        if (cv.StringTools.getArrayLength(this.msg.room_param.alliance_ids) == 0)//非联盟
        {
            if (this.msg.room_param.CreaterId == cv.dataHandler.getUserData().u32Uid) {
                if (cv.StringTools.getArrayLength(remark) == 0) {
                    id = cv.StringTools.formatC("(ID:%d)", data.UID);
                    name_text.getComponent(cc.Label).string = (data.Playername + id);
                }
                else {
                    id = cv.StringTools.formatC(" ID:%d", data.UID);
                    name_text.getComponent(cc.Label).string = (data.Playername + "(" + remark + id + ")");
                }
            }
            else {
                if (cv.StringTools.getArrayLength(remark) == 0) {
                    name_text.getComponent(cc.Label).string = (data.Playername);
                }
                else {
                    name_text.getComponent(cc.Label).string = (remark);
                }
            }
        }
        else {
            if (this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) {
                if (cv.StringTools.getArrayLength(remark) == 0) {
                    id = cv.StringTools.formatC("(ID:%d)", data.UID);
                    name_text.getComponent(cc.Label).string = (data.Playername + id);
                }
                else {
                    id = cv.StringTools.formatC(" ID:%d", data.UID);
                    name_text.getComponent(cc.Label).string = (data.Playername + "(" + remark + id + ")");
                }
            }
            else {
                if (cv.StringTools.getArrayLength(remark) == 0) {
                    name_text.getComponent(cc.Label).string = (data.Playername);
                }
                else {
                    name_text.getComponent(cc.Label).string = (remark);
                }
            }
        }

        CircleSprite.setCircleSprite(cc.find("role_img/role_imgs", this.node), data.PlayerHead, data.plat);

        let buyin_text = cc.find("buyin_text", this.node);
        let handcount_text = cc.find("handcount_text", this.node);
        let winbet_text = cc.find("winbet_text", this.node);
        let buyinword_text = cc.find("buyinword_text", this.node);
        let hand_word_text = cc.find("hand_word_text", this.node);
        let insurance: number = 0;

        if (resultType == cv.Enum.ResultType_PokerInfo.Insurance_type) {
            buyin_text.active = false;
            handcount_text.active = false;
            insurance = data.InsuraceWinbet - data.InsuranceBetAmount;
            cv.StringTools.setLabelValueAndColor(winbet_text, insurance);

            buyinword_text.active = false;
            hand_word_text.active = false;

            name_text.y = (buyinword_text.y);
        }
        else if (resultType == cv.Enum.ResultType_PokerInfo.Integral_type) {
            buyin_text.active = true;
            handcount_text.active = true;

            buyin_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(data.TotalBuyin);
            handcount_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", data.HandCount));

            name_text.y = (135);
            insurance = data.WinBet;
            cv.StringTools.setLabelValueAndColor(winbet_text, insurance);
        }
        else if (resultType == cv.Enum.ResultType_PokerInfo.Jackpot_type) {
            buyin_text.active = false;
            handcount_text.active = false;
            let JackpotWinbet = cv.StringTools.clientGoldByServer(data.JackpotWinbet);
            //data.WinBet = data.JackpotWinbet;
            winbet_text.color = cv.tools.getWinColor();
            winbet_text.getComponent(cc.Label).string = cv.StringTools.numberToShowString(JackpotWinbet);

            buyinword_text.active = false;
            hand_word_text.active = false;

            name_text.y = (buyinword_text.y);
        }
        this.updateBuyinAndHandsPos();
        this.insurance = insurance;
    }
}