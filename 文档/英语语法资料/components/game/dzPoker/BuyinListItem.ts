/**
 * 房主功能带入明细 item
 */
import cv from "../../lobby/cv";
import { RemarkData } from "../../../data/userData";
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import { PlayerInfo } from "./data/RoomData";
import GameDataManager from "./data/GameDataManager";
const { ccclass, property } = cc._decorator;
@ccclass
export class BuyinListItem extends cc.Component {
    @property(cc.Label) yourname: cc.Label = null;
    @property(cc.Label) dairu: cc.Label = null;
    @property(cc.Label) score: cc.Label = null;
    @property(cc.Label) handCount: cc.Label = null;

    public setdata(data: game_pb.PlayerBuyinInfo, pos1: number, pos2: number) {
        //名字
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.playerid);
        let kName = rdata.sRemark != null && rdata.sRemark.length != 0 ? rdata.sRemark : data.playername;
        cv.StringTools.setShrinkString(this.yourname.node, kName);
        //实际带入
        this.dairu.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.total_buyin));  
        //手数
        let _handCount: number = data.HandCount || 0; 
        this.handCount.string = _handCount.toString();
        
        //带入上限
        if (data.curr_record > 0) {
            this.score.string = "+" + cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.curr_record));
        }
        else {
            this.score.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.curr_record));
        }
        //设置文字色
        let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(data.playerid);
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
    }
}