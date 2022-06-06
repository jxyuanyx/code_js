import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";

import { Card } from "../../../../components/game/dzPoker/Card";

export class InsuranceOutsCardItemData {
    index: number = 0;
    gameid: number = 0;
    outItem: game_pb.OutItem = null;
    isCheck: boolean = false;
    clickEnable: boolean = false;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceOutsCardItem extends cc.Component {

    private _vCards: Card[] = [];
    private _bCardClickEnable: boolean = false;

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

    /**
     * 检测房间是否设置允许仅购买部分outs
     */
    private _isAllowOutsSelected(): boolean {
        if (!gameDataMgr.tRoomData.m_bChooseOuts) {
            cv.TT.showMsg(cv.config.getStringData("UICantChooseOuts"), cv.Enum.ToastType.ToastTypeDefault);
            return false;
        }
        return true;
    }

    updateSVReuseData(idx: number, data: InsuranceOutsCardItemData[]): void {
        for (let i = 0; i < this._vCards.length; ++i) {
            let card: Card = this._vCards[i];
            if (i < data.length) {
                card.node.active = true;
                card.tag = data[i].outItem.outs_id;
                card.setGameID(data[i].gameid);
                card.setContent(data[i].outItem.card.number, data[i].outItem.card.suit)
                card.setFace(true);
                card.setFen(data[i].outItem.is_tie);
                card.setCheck(data[i].isCheck);

                // event
                let btn: cc.Button = card.rootNode.getComponent(cc.Button);
                if (btn) {
                    btn.enabled = data[i].clickEnable;
                    btn.interactable = data[i].clickEnable;
                    if (!btn.node.hasEventListener("click")) {
                        btn.duration = 0.1;
                        btn.zoomScale = 1.1;
                        btn.transition = cc.Button.Transition.SCALE;
                        btn.node.on("click", (event: cc.Event): void => {
                            cv.MessageCenter.send("click_insurance_outs_card_item", { card: card, data: data[i] });
                        }, this);
                    }
                }
            }
            else {
                card.node.active = false;
            }
        }
    }
}
