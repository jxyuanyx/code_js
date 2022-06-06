
/**
 * 网络模块代理
 * 其它相关网络消息处理都应该继承此类，例worldNetwork   GameNetWork
 */

import cv from "../../components/lobby/cv";
const { ccclass, property } = cc._decorator;

@ccclass
export class NetWorkProxy extends cc.Component {
    public serverPB: any;

    /**
     * 初始化pb，注册公共消息
     * @param gameId 游戏id
     */
    public initCommon(gameId: number) {
        this.initPb(gameId);
        this.registerCommonMessage(gameId);
    }

    /**
     * 注册游戏公共消息
     * @param serverid 游戏id
     */
    private registerCommonMessage(serverid: number) {
        cv.netWork.registerMsg(serverid, cv.Enum.GATE_MSGID.CONNECT_SERVER_FAILED_NOTIFY, this.ConnectServerFailedNotify.bind(this));
        cv.netWork.registerMsg(serverid, cv.Enum.GATE_MSGID.SERVER_CLOSE_NOTIFY, this.NotifyServerClose.bind(this));
    }

    /**
     * 中转服传递消息失败
     * @param puf pb内容
     */
    private ConnectServerFailedNotify(puf: any) {
        console.warn("连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败连接失败");
        let msg = this.decodePB("ConnectServerFailedNotify", puf, cv.gatePB);
        if (msg) {
            let scene = cv.config.getCurrentScene();
            if ((msg.ServerId != cv.Enum.GameId.World && scene == cv.Enum.SCENE.HALL_SCENE) || (msg.ServerId == cv.Enum.GameId.World && (scene != cv.Enum.SCENE.HALL_SCENE && scene != cv.Enum.SCENE.SPORTS_SCENE))) return;
            cv.netWorkManager.reconnectByServerFailed();
            return;
            if (msg.ServerId == cv.Enum.GameId.World) {
                cv.netWorkManager.cleanNetWork();
            }
            else {
                cv.netWorkManager.closeGameHeart();
                cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            }
            if ((msg.ServerId != cv.Enum.GameId.World && cv.config.getCurrentScene() == cv.Enum.SCENE.HALL_SCENE) || (msg.ServerId == cv.Enum.GameId.World && cv.config.getCurrentScene() != cv.Enum.SCENE.HALL_SCENE)) return;


            let _txtFailed = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? "连接游戏服失败" : "Failed to connect to game server";
            let _txtUnServer = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? "未发现服务器" : "No server found";
            cv.TP.showMsg(msg.Reason == cv.Enum.ConnectServerFailedReason.DialFailed ? _txtFailed : _txtUnServer, cv.Enum.ButtonStyle.GOLD_BUTTON, function () {
                if (msg.ServerId == cv.Enum.GameId.World) {
                    cv.netWorkManager.Logout();
                }
                else {
                    cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
                    cv.roomManager.LeaveRoomAndGame();
                }
            }.bind(this));
        }
    }

    /**
    * 服务器关闭通知
    * @param puf pb内容
    */
    private NotifyServerClose(puf: any) {
        console.warn("服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知服务器关闭通知");
        let msg = this.decodePB("ServerCloseNotify", puf, cv.gatePB);
        if (msg) {
            let scene = cv.config.getCurrentScene();
            if ((msg.ServerId != cv.Enum.GameId.World && scene == cv.Enum.SCENE.HALL_SCENE) || (msg.ServerId == cv.Enum.GameId.World && (scene != cv.Enum.SCENE.HALL_SCENE && scene != cv.Enum.SCENE.SPORTS_SCENE))) return;
            cv.netWorkManager.serverFailCounts = 0;
            cv.netWorkManager.reconnectByServerFailed();
        }
    }

    private initPb(gameId: number) {
        switch (gameId) {
            case cv.Enum.GameId.World:
                this.serverPB = cv.worldPB;
                break;
            case cv.Enum.GameId.Allin:
                this.serverPB = cv.aofPB;
                break;
            case cv.Enum.GameId.Texas:
            case cv.Enum.GameId.StarSeat:
            case cv.Enum.GameId.Plo:
                this.serverPB = cv.gamePB;
                break;
            case cv.Enum.GameId.CowBoy:
                this.serverPB = cv.cowboyPB;
                break;
            case cv.Enum.GameId.VideoCowboy:
                this.serverPB = cv.videoCowboyPB;
                break;
            case cv.Enum.GameId.HumanBoy:
                this.serverPB = cv.humanboyPB;
                break;
            case cv.Enum.GameId.PokerMaster:
                this.serverPB = cv.pokerMasterPB;
                break;
            case cv.Enum.GameId.Data:
                this.serverPB = cv.dataPB;
                break;
            case cv.Enum.GameId.Jackfruit:
                this.serverPB = cv.jackfruitPB;
                break;
            default:
                break;
        }
    }
    //! 代理消息注册
    public registerMessage(msgid: number, fn: any, serverid: number): void {
        cv.netWork.registerMsg(serverid, msgid, fn);
    }

    //! 代理消息发送 
    public sendMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number, ServerId: number): boolean {
        return cv.netWork.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
    }

    /**
     * 将pb对应数据模块序列化
     * @param pbMsgName 模块名
     * @param msgData   对应的数据
     */
    public encodePB(pbMsgName: string, msgData: any): any {
        let wordPbModle = this.serverPB.lookupType(pbMsgName);
        if (wordPbModle) {
            let pbbuf = wordPbModle.encode(msgData).finish();
            return pbbuf;
        }
        console.log("encodePB:Error: PB没有找到此消息==>> " + pbMsgName);
        return null;
    }

    /**
     * 解析pb 反序列化
     * @param pbMsgName 模块名
     * @param puf   元数据
     */
    public decodePB(pbMsgName: string, puf: any, serverPB?: any): any {
        serverPB = serverPB == undefined ? this.serverPB : serverPB;
        let ResponseWorldLogon = serverPB.lookupType(pbMsgName);
        let msg: any = null;
        if (ResponseWorldLogon) {
            let buffer = new Uint8Array(puf);
            msg = ResponseWorldLogon.decode(buffer);
            if (pbMsgName != "ResponseHeartBeat") {
                console.log(msg);
            }

            let result = ResponseWorldLogon.toObject(msg, {     //给丢失的字段赋默认值
                enums: Number,                                       // enums as string names
                longs: Number,                                       // longs as strings (requires long.js)
                bytes: String,                                  // bytes as base64 encoded strings
                defaults: true,                                 // includes default values
                arrays: true,                                   // populates empty arrays (repeated fields) even if defaults=false
                objects: true,                                  // populates empty objects (map fields) even if defaults=false
                oneofs: true                                    // includes virtual oneof fields set to the present field's name
            });
            return result;
        }
        else {
            console.log("decodePB:Error: PB没有找到此消息==>> " + pbMsgName);
        }
        return null;
    }
}
