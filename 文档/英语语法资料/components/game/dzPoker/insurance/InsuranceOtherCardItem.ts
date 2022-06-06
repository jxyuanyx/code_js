import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import { Card } from "../../../../components/game/dzPoker/Card";

export class InsuranceOtherCardItemData {
    gameid: number = 0;
    data: game_pb.FoldItem = null;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceOtherCardItem extends cc.Component {

    private _vCards: Card[] = [];

    protected onLoad(): void {
        for (let i = 0; i < this.node.childrenCount; ++i) {
            let child: cc.Node = this.node.getChildByName(`card_${i}`);
            if (child) {
                this._vCards.push(child.getComponent(Card));
            }
        }
    }

    protected start(): void {
    }

    updateSVReuseData(idx: number, data: InsuranceOtherCardItemData[]): void {
        for (let i = 0; i < this._vCards.length; ++i) {
            let card: Card = this._vCards[i];
            if (i < data.length && (data[i] !== null || typeof data[i] !== "undefined")) {
                card.node.active = true;
                card.setGameID(data[i].gameid);
                card.setContent(data[i].data.card.number, data[i].data.card.suit);
                card.setFace(true);
                card.setGary(!data[i].data.inOuts);
            }
            else {
                card.node.active = false;
            }
        }
    }
}
