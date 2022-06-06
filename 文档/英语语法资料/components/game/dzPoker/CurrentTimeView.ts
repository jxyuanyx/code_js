
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../lobby/cv"
import { PlayerInfo } from "./data/RoomData"
import { RemarkData } from "../../../data/userData";
import GameDataManager from "./data/GameDataManager";
import { CurrentTimeItem } from "./CurrentTimeItem";

const { ccclass, property } = cc._decorator;
@ccclass
export class CurrentTimeView extends cc.Component {
    _datas: Array<game_pb.PlayerBuyinInfo> = [];
    @property(cc.Prefab) CurrentTimeItem: cc.Prefab = null;


    public setData(data: Array<game_pb.PlayerBuyinInfo>, pos1: number, pos2: number) {

        let iszoom = cv.GameDataManager.tRoomData.isZoom();
        this.node.destroyAllChildren();
        this.node.removeAllChildren(true);

        this._datas = data;
        var len = this._datas.length;
        var height = this.node.getContentSize().height;
        for (let i = 0; i < len; ++i) {
            let item = cc.instantiate(this.CurrentTimeItem);
            item.setPosition(item.x, height - 60 - i * 75);
            let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(this._datas[i].playerid);
            let kName = rdata.sRemark != null && rdata.sRemark.length != 0 ? rdata.sRemark : this._datas[i].playername;

            item.getComponent(CurrentTimeItem).dairu.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this._datas[i].total_buyin));  //带入
            item.getComponent(CurrentTimeItem).dairu.node.setPosition(pos1, item.getComponent(CurrentTimeItem).dairu.node.getPosition().y);
            item.getComponent(CurrentTimeItem).buyout.node.setPosition(pos2, item.getComponent(CurrentTimeItem).buyout.node.getPosition().y);

            if (cv.roomManager.checkGameIsZoom(cv.roomManager.getCurrentGameID()))  //急速房间
            {
                let _handCount: number = this._datas[i].HandCount || 0;   //手数
                item.getComponent(CurrentTimeItem).handCount.string = _handCount.toString();
                // if (cv.StringTools.getStrLen(kName) >6)  {
                //     kName =  kName.substr(0,5) + "..";
                // }

            }
            else {
                item.getComponent(CurrentTimeItem).handCount.node.active = false;
            }

            cv.StringTools.setShrinkString(item.getComponent(CurrentTimeItem).yourname.node, kName);
            item.getComponent(CurrentTimeItem).buyout.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this._datas[i].total_buyout));  //撤回

            if (this._datas[i].curr_record > 0) {
                item.getComponent(CurrentTimeItem).score.string = "+" + cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this._datas[i].curr_record));
            }
            else {
                item.getComponent(CurrentTimeItem).score.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this._datas[i].curr_record));
            }

            let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(this._datas[i].playerid);
            if (player == null) {
                item.getComponent(CurrentTimeItem).yourname.node.color = new cc.Color(110, 110, 110);
                item.getComponent(CurrentTimeItem).dairu.node.color = new cc.Color(110, 110, 110);
                item.getComponent(CurrentTimeItem).score.node.color = new cc.Color(110, 110, 110);
                item.getComponent(CurrentTimeItem).buyout.node.color = new cc.Color(110, 110, 110);
            }
            else {
                item.getComponent(CurrentTimeItem).yourname.node.color = cc.Color.WHITE;
                item.getComponent(CurrentTimeItem).dairu.node.color = cc.Color.WHITE;
                item.getComponent(CurrentTimeItem).score.node.color = cc.Color.WHITE;
                item.getComponent(CurrentTimeItem).buyout.node.color = cc.Color.WHITE;
            }

            if (this._datas[i].playerid == cv.dataHandler.getUserData().u32Uid) {
                item.getComponent(CurrentTimeItem).showLight();
            }
            else {
                item.getComponent(CurrentTimeItem).hideLight();
            }

            item.getComponent(CurrentTimeItem).setControlPos(pos1, pos2);
            //item.getComponent(CurrentTimeItem).settlement_icon.node.active = false;

            // item.getComponent(CurrentTimeItem).yourname.node.setAnchorPoint(0, 0.5);
            // item.getComponent(CurrentTimeItem).yourname.node.setPosition(51.948, item.getComponent(CurrentTimeItem).yourname.node.getPosition().y);

            this.node.addChild(item);
        }
    }
} 