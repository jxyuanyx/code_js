import cv from "./../../../components/lobby/cv"
const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceClubTitleItem extends cc.Component {
    msg: any = null;
    clubInfo: any = null;
    insurance: number = 0;

    onLoad() {
        cc.find("buyin_word_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("AllianceClubTitleItem_buyin_word_text");
    }

    setData(msg: any, clubInfo: any, resultType: number) {
        this.msg = msg;
        this.clubInfo = clubInfo;
        cc.find("name_text", this.node).getComponent(cc.Label).string = clubInfo.Clubname;
        let win_bet_text = cc.find("win_bet_text", this.node);

        if (resultType == cv.Enum.ResultType_PokerInfo.Integral_type) {
            cc.find("buyin_text", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.getClubTotalBuyin(clubInfo.UIDs, "getTotalBuyin"));
            this.insurance = this.getClubTotalBuyin(clubInfo.UIDs, "getClubTotalWinbet");
            cv.StringTools.setLabelValueAndColor(win_bet_text, this.insurance);
        }
        else if (resultType == cv.Enum.ResultType_PokerInfo.Insurance_type) {
            this.insurance = -this.getClubTotalBuyin(clubInfo.UIDs, "getClubTotalInsurance");
            cv.StringTools.setLabelValueAndColor(win_bet_text, this.insurance);
        }
        else if (resultType == cv.Enum.ResultType_PokerInfo.Jackpot_type) {
            this.insurance = this.getClubTotalBuyin(clubInfo.UIDs, "getClubTotalJackpotWinbet");

            win_bet_text.color = cv.tools.getLoseColor();
            win_bet_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.insurance);
        }
        else {
            this.insurance = this.getClubTotalBuyin(clubInfo.UIDs, "getAward2ClubFund");
            win_bet_text.color = cv.tools.getWinColor();
            win_bet_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.insurance);
        }
    }

    hideBuyIn() {
        cc.find("buyin_text", this.node).active = false;
        cc.find("buyin_word_text", this.node).active = false;
    }

    getInsurance(): number {
        return this.insurance;
    }

    getClubId(): number {
        return this.clubInfo.ClubId;
    }

    showTheSameMark() {
        cc.find("sameMark_img", this.node).active = true;
    }

    getClubTotalBuyin(uids: number[], funcName: string): number {
        if (cv.StringTools.getArrayLength(this.msg.buyins) == 0) return 0;

        let TotalBuyin: number = 0;
        let TotalWinBet: number = 0;
        let TotalInsurance: number = 0;
        let TotalJackpot: number = 0;
        let TotalAward: number = 0;
        for (let i = 0; i < uids.length; i++) {
            for (let j = 0; j < this.msg.buyins.length; j++) {
                if (uids[i] == this.msg.buyins[j].UID) {
                    TotalBuyin += this.msg.buyins[j].TotalBuyin;
                    TotalWinBet += this.msg.buyins[j].WinBet;
                    TotalInsurance += this.msg.buyins[j].InsuraceWinbet - this.msg.buyins[j].InsuranceBetAmount;
                    TotalJackpot += this.msg.buyins[j].Drawin;
                    TotalAward += this.msg.buyins[j].Award2ClubFund;
                }
            }
        }

        switch (funcName) {
            case "getTotalBuyin":
                return TotalBuyin;
            case "getClubTotalWinbet":
                return TotalWinBet;
            case "getClubTotalInsurance":
                return TotalInsurance;
            case "getClubTotalJackpotWinbet":
                return TotalJackpot;
            case "getAward2ClubFund":
                return TotalAward;
        }
        return -1;
    }
}
