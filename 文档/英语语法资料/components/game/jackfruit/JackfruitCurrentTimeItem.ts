import cv from "../../lobby/cv";
import { RemarkData } from "../../../data/userData";

import jackfruit_protocol = require("./../../../../Script/common/pb/jackfruit");
import jackfruit_pb = jackfruit_protocol.jackfruit_proto;
import { PlayerInfo } from "./JackfruitData"
import JackfruitManager from "./JackfruitManager";

const { ccclass, property } = cc._decorator;
@ccclass
export class JackfruitCurrentTimeItem extends cc.Component {
    @property({
        type: cc.Label,
        "tooltip": "名字"
    })
    yourname: cc.Label = null;

    @property({
        type: cc.Label,
        "tooltip": "带入"
    })
    dairu: cc.Label = null;

    @property({
        type: cc.Label,
        "tooltip": "分数"
    })
    score: cc.Label = null;

    @property({
        type: cc.Layout,
        "tooltip": "背景"
    })
    layout: cc.Layout = null;

    @property({
        type: cc.Sprite,
        "tooltip": "颜色"
    })
    sprite_color: cc.Sprite = null;

    public setControlPos(newPosX: number) {
        if (cv.roomManager.checkGameIsZoom(cv.roomManager.getCurrentGameID())) {
            this.dairu.node.setPosition(newPosX, this.dairu.node.getPosition().y);
        }
    }

    public showLight() {
        this.yourname.node.setContentSize(cc.size(164, 45));
        this.yourname.node.color = cc.Color.WHITE;
        this.dairu.node.color = cc.Color.WHITE;
        this.score.node.color = cc.Color.WHITE;
        this.sprite_color.node.active = true;
    }

    public hideLight() {
        this.layout.getComponent(cc.Layout).node.color = cc.Color.BLUE;
        this.sprite_color.node.active = false;
    }

    setdata(data: jackfruit_pb.PlayerBuyInInfo, pos1: number) {
        //let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.playerId);
        let kName = data.playerName;//rdata.sRemark != null && rdata.sRemark.length != 0 ? rdata.sRemark : data.playerName;
        let buyinScore = cv.StringTools.toFixed(cv.StringTools.serverGoldToShowNumber(data.totalBuyInScore), 1);
        let totalScore = cv.StringTools.toFixed(cv.StringTools.serverGoldToShowNumber(data.currRecordScore), 1);

        this.dairu.string = buyinScore.toString();  //带入
        this.dairu.node.setPosition(pos1, this.dairu.node.getPosition().y);

        cv.StringTools.setShrinkString(this.yourname.node, kName);

        if (data.currRecord > 0) {
            this.score.string = "+" + totalScore.toString();
        }
        else {
            this.score.string = totalScore.toString();
        }
        let player: PlayerInfo = JackfruitManager.tRoomData.GetTablePlayer(data.playerId);
        if (player == null) {
            this.yourname.node.color = new cc.Color(110, 110, 110);
            this.dairu.node.color = new cc.Color(110, 110, 110);
            this.score.node.color = new cc.Color(110, 110, 110);
        }
        else {
            this.yourname.node.color = cc.Color.WHITE;
            this.dairu.node.color = cc.Color.WHITE;
            this.score.node.color = cc.Color.WHITE;
        }

        if (data.playerId == cv.dataHandler.getUserData().u32Uid) {
            this.showLight();
        }
        else {
            this.hideLight();
        }

        this.setControlPos(pos1);
    }
}