import cv from "../../../../components/lobby/cv";
import { Card } from "../../../../components/game/dzPoker/Card";
import { CardItem } from "../../../../components/game/dzPoker/data/RoomData";
import { RemarkData } from "../../../../data/userData";

export class InsuranceAllInItemData {
    nUID: number = 0;                   // 玩家id
    nGameID: number = 0;                // 游戏id
    sPlayerName: string = "";           // 玩家名
    nOutsNum: number = 0;               // outs数量
    vCards: CardItem[] = [];            // 牌信息数组
    bPurchaser: boolean = false;        // 是否是购买保险者

    copyFrom(other: InsuranceAllInItemData): void {
        this.nUID = other.nUID;
        this.sPlayerName = other.sPlayerName;
        this.nOutsNum = other.nOutsNum;
        this.bPurchaser = other.bPurchaser;

        this.vCards = [];
        for (let i = 0; i < other.vCards.length; ++i) this.vCards[i] = other.vCards[i];
    }
}

const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceAllInItem extends cc.Component {

    @property(cc.Label) txt_name: cc.Label = null;
    @property(cc.Label) txt_desc: cc.Label = null;
    @property(Card) card_array: Card[] = [];

    protected onLoad(): void {
    }

    protected start(): void {
    }

    updateSVReuseData(index: number, data: InsuranceAllInItemData): void {
        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.nUID);
        if (remark && remark.sRemark.length > 0) {
            cv.StringTools.setShrinkString(this.txt_name.node, remark.sRemark, true);
        }
        else {
            cv.StringTools.setShrinkString(this.txt_name.node, data.sPlayerName, true);
        }

        for (let i = 0; i < this.card_array.length; ++i) {
            let card: Card = this.card_array[i];
            if (i < data.vCards.length) {
                card.setGameID(data.nGameID);
                card.setContent(data.vCards[i].number, data.vCards[i].suit);
                card.setFace(true);
            }
            else {
                card.setFace(false);
            }
        }

        if (data.bPurchaser) {
            this.txt_desc.string = cv.config.getStringData("UITitle85");
            this.txt_desc.node.color = new cc.Color(255, 72, 72);   // 红色     
        }
        else {
            this.txt_desc.string = cv.StringTools.formatC(cv.config.getStringData("UITitle84"), data.nOutsNum);
            this.txt_desc.node.color = new cc.Color(39, 133, 225);  // 蓝字
        }
    }
}
