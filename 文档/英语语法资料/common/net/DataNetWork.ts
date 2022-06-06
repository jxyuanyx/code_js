import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import data_protocol = require("./../../../Script/common/pb/data");
import data_pb = data_protocol.data_proto;

import { NetWorkProxy } from "./NetWorkProxy";
import cv from "../../components/lobby/cv";
import { HashMap } from "../tools/HashMap";
import { gate_proto } from "../../../Script/common/pb/gate";

const { ccclass, property } = cc._decorator;
@ccclass
export class DataNetWork extends NetWorkProxy {
    public static instance: DataNetWork;
    private arr: HashMap<number, number> = new HashMap();
    public static getInstance(): DataNetWork {
        if (!this.instance) {
            this.instance = new DataNetWork();
            this.instance.init();
        }
        return this.instance;
    }

    public sendGameMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number = cv.Enum.SeverType.SeverType_RANK, ServerId: number = world_pb.GameId.DataServer): boolean {
        return this.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
    }
    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, world_pb.GameId.DataServer);
    }
    public init() {
        this.arr.add(data_pb.CMD.GET_DATA_REQ, data_pb.CMD.GET_DATA_RESP);
        this.arr.add(data_pb.CMD.GET_PUBLIC_DATA_REQ, data_pb.CMD.GET_PUBLIC_DATA_RESP);
        this.arr.add(data_pb.CMD.HOME_REQ, data_pb.CMD.HOME_RESP);
        this.arr.add(data_pb.CMD.ROOM_RECORDS_LIST_REQ, data_pb.CMD.ROOM_RECORDS_LIST_RESP);
        this.arr.add(data_pb.CMD.ROOM_RECORD_REQ, data_pb.CMD.ROOM_RECORD_RESP);
        this.arr.add(data_pb.CMD.GAME_UUIDS_REQ, data_pb.CMD.GAME_UUIDS_RESP);
        this.arr.add(data_pb.CMD.GAME_HAND_REQ, data_pb.CMD.GAME_HAND_RESP);
        this.arr.add(data_pb.CMD.GAME_HAND_TEST_REQ, data_pb.CMD.GAME_HAND_TEST_RESP);
        this.arr.add(data_pb.CMD.DO_FAVORITE_REQ, data_pb.CMD.DO_FAVORITE_RESP);
        this.arr.add(data_pb.CMD.FAVORITE_HAND_REQ, data_pb.CMD.FAVORITE_HAND_RESP);
        this.arr.add(data_pb.CMD.FAVORITE_LIST_NEW_REQ, data_pb.CMD.FAVORITE_LIST_NEW_RESP);
        this.arr.add(data_pb.CMD.GAME_REVIEW_LIST_REQ, data_pb.CMD.GAME_REVIEW_LIST_RESP);
        this.arr.add(data_pb.CMD.DELETE_FAVORITE_LIST_REQ, data_pb.CMD.DELETE_FAVORITE_LIST_RESP);
        this.arr.add(data_pb.CMD.FORCE_SHOW_CARD_REQ, data_pb.CMD.FORCE_SHOW_CARD_RSP);
        this.arr.add(data_pb.CMD.SEND_CARD_FUN_REQ, data_pb.CMD.SEND_CARD_FUN_RSP);
        this.arr.add(data_pb.CMD.GAME_BIG_POT_LIST_REQ, data_pb.CMD.GAME_BIG_POT_LIST_RSP);
        this.arr.add(data_pb.CMD.GET_BIG_BLIND_REQ, data_pb.CMD.GET_BIG_BLIND_RESP);
        this.arr.add(data_pb.CMD.GET_HAS_BUYIN_REQ, data_pb.CMD.GET_HAS_BUYIN_RESP);
        this.arr.add(data_pb.CMD.GET_ROUND_INFO_REQ, data_pb.CMD.GET_ROUND_INFO_RESP);
        this.arr.add(data_pb.CMD.GET_UID_HAND_COUNT_REQ, data_pb.CMD.GET_UID_HAND_COUNT_RESP);
        this.arr.add(data_pb.CMD.GET_HAND_COUNT_REQ, data_pb.CMD.GET_HAND_COUNT_RESP);
        this.arr.add(data_pb.CMD.GET_PLAYER_LATEST_REQ, data_pb.CMD.GET_PLAYER_LATEST_RESP);
        this.arr.add(data_pb.CMD.JF_GAME_HAND_REQ, data_pb.CMD.JF_GAME_HAND_RESP);
        this.arr.add(data_pb.CMD.JF_ROOM_LIST_REQ, data_pb.CMD.JF_ROOM_LIST_RESP);
        this.arr.add(data_pb.CMD.JF_GAME_UUIDS_REQ, data_pb.CMD.JF_GAME_UUIDS_RESP);
        this.arr.add(data_pb.CMD.JF_DATA_REQ, data_pb.CMD.JF_DATA_RESP);

        this.registerMsg(gate_proto.CMD.SERVER_EXCEPT_NOTIFY, this.NoticeError.bind(this));
    }

    RequestGetData(id: number, message: any, callback: Function, isZip: boolean = false): void {
        let recvId = this.arr.get(id);
        let str = JSON.stringify(message);
        let msg = { message: str };
        let puf = this.encodePB("DataMessage", msg);
        this.sendGameMsg(puf, id, 0);
        let func = function (buf: any) {
            let msg = this.decodePB("DataMessage", buf);
            if (msg) {
                let value;
                if (isZip) {
                    value = cv.http.unzip(msg.message);
                    value = JSON.parse(value);
                }
                else {
                    value = JSON.parse(msg.message);
                }
                callback(value);
            }
        }.bind(this);
        this.registerMsg(recvId, func);

    }

    NoticeError(puf: any) {
        if (cv.config.GET_DEBUG_MODE() == 1) {
            cv.TT.showMsg("获取data服数据失败", cv.Enum.ToastType.ToastTypeError);
        }
    }
}
