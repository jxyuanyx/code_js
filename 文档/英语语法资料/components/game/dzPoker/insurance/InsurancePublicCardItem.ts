import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import { Card } from "../../../../components/game/dzPoker/Card";

export class InsurancePublicCardItemData {
    gameid: number = 0;
    data: game_pb.CardItem = null;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class InsurancePublicCardItem extends cc.Component {

    @property(Card) card: Card = null;

    protected onLoad(): void {
    }

    protected start(): void {
    }

    updateSVReuseData(idx: number, data: InsurancePublicCardItemData): void {
        this.card.setGameID(data.gameid);
        this.card.setContent(data.data.number, data.data.suit);
        this.card.setFace(true);
    }
}
