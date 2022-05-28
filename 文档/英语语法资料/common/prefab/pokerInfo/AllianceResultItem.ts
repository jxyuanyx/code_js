import cv from "./../../../components/lobby/cv"
const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceResultItem extends cc.Component {
    msg: any = null;
    clickFunc: Function = null;

    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage(): void {
        let buyin_word_text = cc.find("buyin_word_text", this.node);
        if (buyin_word_text) {
            buyin_word_text.getComponent(cc.Label).string = cv.config.getStringData("AllianceResultItem_buyin_word_text");
        }
    }

    initData(msg: any, index: number, itype: number) {
        let club: any = msg.clubInfos[index];
        this.msg = msg;

        let buyin_word_text = cc.find("buyin_word_text", this.node);
        let buyin_text = cc.find("buyin_text", this.node);
        let win_bet_text = cc.find("win_bet_text", this.node);
        let name_text = cc.find("name_text", this.node);

        buyin_word_text.getComponent(cc.Label).string = cv.config.getStringData("AllianceResultItem_buyin_word_text");
        buyin_text.setPosition(buyin_word_text.x + buyin_word_text.getContentSize().width + 4);

        if (itype == cv.Enum.ITEMType_Alliance.GROUP_ITEM) {
            buyin_word_text.active = false;
            let lastAllianceInfo = cv.tools.GetStringByCCFile("lastAllianceInfo");
            // if (lastAllianceInfo.indexOf()) 未完待续
        }
        else if (itype == cv.Enum.ITEMType_Alliance.POKERINFO_RESULT_ITEM) {
            buyin_word_text.active = true;
            buyin_text.active = true;
            win_bet_text.active = true;
            buyin_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.getClubTotalBuyin(club.UIDs, true));
            let winbet = cv.StringTools.clientGoldByServer(this.getClubTotalBuyin(club.UIDs, false));
            win_bet_text.getComponent(cc.Label).string = cv.StringTools.numberToShowString(winbet);
            if (winbet > 0) {
                win_bet_text.color = cv.tools.getWinColor();
                win_bet_text.getComponent(cc.Label).string = "+" + win_bet_text.getComponent(cc.Label).string;
            }
            else if (winbet == 0) {
                win_bet_text.color = cc.Color.WHITE;
            }
            else {
                win_bet_text.color = cv.tools.getLoseColor();
            }
            name_text.getComponent(cc.Label).string = club.Clubname;
        }
    }

    getClubTotalBuyin(uids: number[], getTotalBuyin: boolean = true): number {
        if (cv.StringTools.getArrayLength(this.msg.buyins) == 0) return 0;

        let TotalBuyin: number = 0;
        let TotalWinBet: number = 0;
        for (let i = 0; i < uids.length; i++) {
            for (let j = 0; j < this.msg.buyins.length; j++) {
                if (uids[i] == this.msg.buyins[j].UID) {
                    TotalBuyin += this.msg.buyins[j].TotalBuyin;
                    TotalWinBet += this.msg.buyins[j].WinBet;
                }
            }
        }

        if (getTotalBuyin) {
            return TotalBuyin;
        }
        else {
            return TotalWinBet;
        }
    }

    onPanelClick(event: cc.Event) {
        if (this.clickFunc) {
            this.clickFunc();
        }
    }
}
