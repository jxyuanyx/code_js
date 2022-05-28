import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import game_protocol = require("./../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../components/lobby/cv";
import { rsaHandler } from "../jsencrypt/rsaHandler";
import { ecdhHandler } from "../ecdh/ecdhHandler";
import { ClubScene, eClubSceneView } from "../../components/club/ClubScene";
import { ActivityType } from "../../data/activityData";
import { pb } from "../../../Script/common/pb/ws_protocol";
import { cowboy_proto } from "../pb/cowboy";
import { humanboy_proto } from "../pb/humanboy";
import { video_cowboy_proto } from "../pb/video_cowboy";
import { pokermaster_proto } from "../pb/pokermaster";

/**
 * 所有游戏服房间管理模块
 * 主要功能：记录和清理当前玩家所在的游戏服ID，游戏服房间ID
 * 统一进入房间接口和回调（便于跟踪记录玩家游戏状态）
 * 统一退出房间接口和回调（便于跟踪记录玩家游戏状态）
 */
export class RoomManager {
    private static instance: RoomManager;
    private current_gameId: number = 0;     //！当前游戏服ID：只标记游戏服，不会等于world服
    private current_roomId: number = 0;     //！当前游戏服房间ID
    private roomPassWord: string;           //！当前游戏服房间密码            (现仅德州)
    private isQuickRoom: boolean;           //！当前游戏服房间是否快速入座     (现仅德州)
    private isNeedPassword: boolean;        //！当前游戏服房间是否需要密码     (现仅德州)
    public isEnterMTT: boolean = false;
    public mtt_id: number = 0;
    public mtt_time: number = 0;
    public mtt_name: string = "";
    public mtt_backTime: number = 0;
    private _SportsUrl: string = "";
    private _ElcGamesUrl: string = "";
    public ElcGameCode: string = "";

    public static getInstance(): RoomManager {
        if (!this.instance) {
            this.instance = new RoomManager();
            this.instance.reset();
        }
        return this.instance;
    }

    private _checkShowLoadingByGameID(gameId: number) {
        let curSceneName: string = cv.config.getCurrentScene();
        if (curSceneName != cv.Enum.SCENE.HALL_SCENE) return;
        let password: string = this.getRoomPassWord();
        switch (gameId) {
            case world_pb.GameId.Bet:
            case world_pb.GameId.Jackfruit: {
                cv.SwitchLoadingView.show(cv.config.getStringData("SwitchLoadingView_des_0"));
            } break;
            case world_pb.GameId.Texas:
            case world_pb.GameId.StarSeat:
            case world_pb.GameId.Allin:
            case world_pb.GameId.PLO: {
                if (this.isNeedPassword) {
                    if (password.length == 0) {
                        break;
                    }
                }
                cv.SwitchLoadingView.show(cv.config.getStringData("SwitchLoadingView_des_0"));
            } break;
            case world_pb.GameId.CowBoy:
            case world_pb.GameId.VideoCowboy:
            case world_pb.GameId.HumanBoy:
            case world_pb.GameId.PokerMaster: {
                cv.SwitchLoadingView.show(cv.config.getStringData("SwitchLoadingView_des_1"));
            } break;
            default: {
                if (this.checkGameIsZoom(this.current_gameId)) {
                    cv.SwitchLoadingView.show(cv.config.getStringData("SwitchLoadingView_des_0"));
                }
            } break;
        }
    }

    /**
     * 所有游戏服进入房间的统一接口,不是德州游戏一般只传前两个参数
     * 
     * @param gameId 
     * @param gameRoomId 
     * @param isQuick 
     * @param needPassword 
     * @param password 
     */
    public RequestJoinRoom(gameId: number = this.current_gameId, gameRoomId: number = this.current_roomId, isQuick: boolean = this.isQuickRoom, needPassword: boolean = this.isNeedPassword, password: string = this.roomPassWord) {
        if (gameId >= world_pb.GameId.ZoomTexas && gameId <= world_pb.GameId.ZoomTexasMax && !cv.dataHandler.getActivityData().haveAvatar(true, ActivityType.GameAvatar)) return;

        this.setCurrentGameID(gameId);
        this.setCurrentRoomID(gameRoomId);
        this.setRoomPassWord(password);
        this.setIsNeedPassword(needPassword);
        this.setIsQuickRoom(isQuick);
        this._checkShowLoadingByGameID(gameId);
        //判断当前是否加密  已经登陆的不再重新生成
        if (cv.netWork.isEncrypt(gameId) && !ecdhHandler.getInstance().ecdh_getNeedGenKeyState()) {
            let client_pubX = ecdhHandler.getInstance().ecdh_getClientPubX();
            let client_pubY = ecdhHandler.getInstance().ecdh_getClientPubY();
            ecdhHandler.getInstance().ecdh_setNeedGenKeyState(true);
            cv.worldNet.RequestSetEcdhKey(0, client_pubX, client_pubY); //向服务器发送secretkey

        } else {
            this._doJoinRoomRequest();
        }
    }

    /**
     * 
     * @param gameid 
     * @param matchId 
     */
    public RequestJoinSportsRoom(gameid: number, matchId: string = ""): void {
        this.setCurrentGameID(gameid);
        cv.worldNet.SportsLoginRequest(gameid, matchId);
    }

    public onSecretResponse(): void {
        this._doJoinRoomRequest();
    }

    //设置ecdh
    public onEcdhSecretResponse(data: any): void {
        let secret_type = data.secret_type;
        let server_pub_x = data.svr_public_key_x;
        let server_pub_y = data.svr_public_key_y;

        ecdhHandler.getInstance().ecdh_genClientKey(server_pub_x, server_pub_y);
        let _secretkey = "";
        if (secret_type == cv.Enum.ECDH_SECRET_TYPE.UseX) {
            _secretkey = ecdhHandler.getInstance().ecdh_getClientSecretX();
        } else if (secret_type == cv.Enum.ECDH_SECRET_TYPE.UseY) {
            _secretkey = ecdhHandler.getInstance().ecdh_getClientSecretY();
        } else if (secret_type == cv.Enum.ECDH_SECRET_TYPE.UseXY) {
            _secretkey = ecdhHandler.getInstance().ecdh_getClientSecretXY();
        } else {
            console.log("onEcdhSecretResponse secretType error.");
            return;
        }
        cv.dataHandler.getUserData().secretKey = cv.md5.md5(_secretkey);
        this._doJoinRoomRequest();
    }

    private _doJoinRoomRequest() {
        let gameRoomId: number = this.getCurrentRoomID();
        let password: string = this.getRoomPassWord();
        let isQuick: boolean = this.getIsQuickRoom();

        switch (this.current_gameId) {
            case world_pb.GameId.Texas:
            case world_pb.GameId.StarSeat:
            case world_pb.GameId.PLO: {
                if (this.isNeedPassword) {
                    if (password.length == 0) {
                        cv.gameNet.RequestCheckFirstJoinRoom(gameRoomId);
                    }
                    else {
                        cv.gameNet.RequestJoinRoomWithPassword(gameRoomId, password);
                    }
                }
                else {
                    cv.gameNet.RequestJoinRoom(gameRoomId, this.current_gameId, isQuick);
                }
            } break;

            case world_pb.GameId.Allin: {
                if (this.isNeedPassword) {
                    if (password.length == 0) {
                        cv.aofNet.RequestCheckFirstJoinRoom(gameRoomId);
                    }
                    else {
                        cv.aofNet.RequestJoinRoomWithPassword(gameRoomId, password);
                    }
                }
                else {
                    cv.aofNet.RequestJoinRoom(gameRoomId, isQuick);
                }
            } break;

            case world_pb.GameId.CowBoy: {
                cv.cowboyNet.RequestJoinRoom(gameRoomId);
            } break;

            case world_pb.GameId.VideoCowboy: {
                cv.videoCowboyNet.RequestJoinRoom(gameRoomId);
            } break;

            case world_pb.GameId.Bet: {
                cv.gameNet.RequestJoinRoom(gameRoomId, this.current_gameId, isQuick);
            } break;

            case world_pb.GameId.HumanBoy: {
                cv.humanboyNet.requestJoinRoom(gameRoomId);
            } break;

            case world_pb.GameId.PokerMaster: {
                cv.pokerMasterNet.requestJoinRoom(gameRoomId);
            } break;

            case world_pb.GameId.Jackfruit: {
                cv.jackfruitNet.requestJoinRoom(gameRoomId);
            } break;

            default: {
                if (this.checkGameIsZoom(this.current_gameId)) {
                    // 极速游戏必定弹出带入框
                    cv.gameNet.RequestJoinZoomRoom(gameRoomId, this.current_gameId, isQuick);
                }
            } break;
        }
    }

    /**
     * 进入房间回调处理
     * @param data 服务器返回数据
     */
    public onJoinRoomResponse(data: any) {
        let error = this.getErrorCode(data);
        if (error == 1) {
            let gameID: number = this.getCurrentGameID();
            let roomId = data.roomid;
            if (world_pb.GameId.Jackfruit === gameID) {
                roomId = data.roomId;
            }
            cv.roomManager.setCurrentRoomID(roomId);
            this.resetRoomCache();
            cv.netWorkManager.serverFailCounts = 0;

            let curSceneName: string = cv.config.getCurrentScene();
            let tarSceneName: string = this.getSceneNameByGameId(gameID);

            // 该函数可能被回调多次(例如切后台, 断线重连等), 因此检测下场景名, 避免多次触发预加载
            if (curSceneName !== tarSceneName) {
                cv.action.switchScene(tarSceneName);
            }
            else {
                cv.SwitchLoadingView.hide();
            }
        }
        else {
            cv.SwitchLoadingView.hide();
            let gameID: number = this.getCurrentGameID();
            // 如果是急速
            if (this.checkGameIsZoom(gameID)) {
                let t: game_pb.ResponseJoinRoom = game_pb.ResponseJoinRoom.create(data);
                switch (t.error) {
                    // 发起真人验证
                    case 1260: {
                        cv.MessageCenter.send("on_need_slider_verify");
                    } break;

                    // 真人验证错误码(x秒后重新认证)
                    case 1261: {
                        let strKey: string = cv.config.getStringData("slider_verify_toast_result_forbid_txt");
                        cv.TT.showMsg(cv.StringTools.formatC(strKey, t.authVerifyCD), cv.Enum.ToastType.ToastTypeError);
                    } break;

                    default: {
                        cv.ToastError(t.error);
                    } break;
                }

                // 跟踪用户行为, 发送事件
                let properties: any = { denyReason: `JoinRoom Failed: error code = ${t.error}` };
                cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.PokerRoomJoiningDenied, cv.Enum.Functionality.poker, properties);
            }
            // 其他游戏按原来流程
            else {
                switch (gameID) {
                    case world_pb.GameId.Allin:
                    case world_pb.GameId.Bet:
                    case world_pb.GameId.Texas:
                    case world_pb.GameId.StarSeat:
                    case world_pb.GameId.PLO: {
                        if (error == 512) {
                            let str = cv.config.getStringData("ServerErrorCode512");
                            let timestr: string = cv.tools.getStringByTime(data.left_join_time);
                            cv.TT.showMsg(cv.StringTools.formatC(str, timestr), cv.Enum.ToastType.ToastTypeError);
                        } else {
                            cv.ToastError(error);
                            if (error == 1250) { //超时被T
                                cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0"); //0：初始状态，1：未买入，弹出买入框状态，2：已买入状态
                                let curSceneName: string = cv.config.getCurrentScene();
                                if (curSceneName != cv.Enum.SCENE.HALL_SCENE) {
                                    cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene): void => {
                                        cv.TP.showMsg(cv.config.getStringData("LeaveRoomReason"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
                                    });
                                    cv.roomManager.setCurrentGameID(world_pb.GameId.GameId_Dummy);
                                }
                            }
                        }

                        // 跟踪用户行为, 发送事件
                        let properties: any = { denyReason: `JoinRoom Failed: error code = ${error}` };
                        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.PokerRoomJoiningDenied, cv.Enum.Functionality.poker, properties);
                    } break;

                    case world_pb.GameId.CowBoy:
                    case world_pb.GameId.VideoCowboy:
                    case world_pb.GameId.HumanBoy:
                    case world_pb.GameId.PokerMaster: {
                        if (error == cowboy_proto.ErrorCode.ROOM_SYSTEM_FORCE_CLOSED ||
                            error == humanboy_proto.ErrorCode.ROOM_SYSTEM_FORCE_CLOSED ||
                            error == video_cowboy_proto.ErrorCode.ROOM_SYSTEM_FORCE_CLOSED ||
                            error == pokermaster_proto.ErrorCode.ROOM_SYSTEM_FORCE_CLOSED) {
                            cv.TT.showMsg(cv.config.getStringData("MiniGames_SYSTEM_FORCE_CLOSED"), cv.Enum.ToastType.ToastTypeWarning);
                        }
                        else {
                            cv.ToastGameError(cv.Number(gameID), error);
                        }
                    } break;

                    default: {
                        cv.ToastError(error);
                    } break;
                }
            }

            cv.roomManager.reset();
            cv.netWorkManager.closeGameHeart();
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
        }
    }

    /**
     * 统一退出房间接口
     */
    public RequestLeaveRoom() {
        let gameID: number = this.getCurrentGameID();
        switch (gameID) {
            case world_pb.GameId.Bet:
            case world_pb.GameId.Texas:
            case world_pb.GameId.StarSeat:
            case world_pb.GameId.PLO: {
                cv.gameNet.RequestLeaveRoom(this.getCurrentRoomID())
            } break;

            case world_pb.GameId.CowBoy: {
                cv.cowboyNet.RequestLeaveRoom();
            } break;

            case world_pb.GameId.VideoCowboy: {
                cv.videoCowboyNet.RequestLeaveRoom();
            } break;

            case world_pb.GameId.HumanBoy: {
                cv.humanboyNet.requestLeaveRoom();
            } break;

            case world_pb.GameId.PokerMaster: {
                cv.pokerMasterNet.requestLeaveRoom();
            } break;

            case world_pb.GameId.Jackfruit: {
                cv.jackfruitNet.requestLeave();
            } break;

            default:
                if (this.checkGameIsZoom(gameID)) {
                    // 极速游戏必定弹出带入框
                    cv.gameNet.RequestQuickLeave(this.getCurrentRoomID());
                }
                if (this.getCurrentGameID() == world_pb.GameId.Allin) {
                    cv.aofNet.RequestLeaveRoom(this.getCurrentRoomID());
                }
                break;
        }

    }

    /**
     * 退出房间回调处理
     */
    public onResponse_LeaveRoom(data: any) {
        let error = this.getErrorCode(data);
        let gameID: number = this.getCurrentGameID();
        if (error == 1) {
            let leaveType = 0;
            if (typeof (data.user_leave_type) == "number") {
                leaveType = data.user_leave_type;
            }

            switch (gameID) {
                case world_pb.GameId.Allin:
                case world_pb.GameId.Bet:
                case world_pb.GameId.Texas:
                case world_pb.GameId.StarSeat:
                case world_pb.GameId.PLO: {
                    cv.GameDataManager.tGameData.reset();
                    cv.GameDataManager.tRoomData.reset();
                    cv.GameDataManager.tGiftData.reset();
                    if (this.isEnterMTT) {
                        cv.viewAdaptive.isbackToClubScene = false;
                    }
                    if (cv.viewAdaptive.isbackToClubScene) {
                        cv.viewAdaptive.isbackToClubScene = false;
                        cv.action.switchScene(cv.Enum.SCENE.CLUB_SCENE, (scene: cc.Scene) => {
                            let node: cc.Node = scene.getChildByName(cv.Enum.SCENE.CLUB_SCENE);
                            node.getComponent(ClubScene).setMainView(eClubSceneView.E_CSV_CLUB_MAIN_VIEW, false);
                        });
                    } else if (leaveType == 1) { //围观超时被T
                        cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0"); //0：初始状态，1：未买入，弹出买入框状态，2：已买入状态
                        let curSceneName: string = cv.config.getCurrentScene();
                        if (curSceneName != cv.Enum.SCENE.HALL_SCENE) {
                            cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene): void => {
                                cv.TP.showMsg(cv.config.getStringData("LeaveRoomReason"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
                            });

                        } else {
                            cv.roomManager.setCurrentRoomID(-1);
                            return;
                        }
                    } else if (leaveType == 2) { //客服操作强制离开
                        let str = cv.StringTools.getServerStrByLanguage(data.reason);
                        cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0"); //0：初始状态，1：未买入，弹出买入框状态，2：已买入状态
                        let curSceneName: string = cv.config.getCurrentScene();
                        if (curSceneName != cv.Enum.SCENE.HALL_SCENE) {
                            cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene): void => {
                                cv.TP.showMsg(str, cv.Enum.ButtonStyle.GOLD_BUTTON, null);
                            });
                        } else {
                            cv.roomManager.setCurrentRoomID(-1);
                            return;
                        }
                    } else {
                        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
                    }
                } break;

                case world_pb.GameId.CowBoy:                 // 回到牛仔房间列表界面
                case world_pb.GameId.VideoCowboy:            // 回到牛仔房间列表界面
                case world_pb.GameId.HumanBoy:               // 回到百人德州房间列表界面
                case world_pb.GameId.PokerMaster: {          // 回到扑克大师房间列表界面
                    cv.roomManager.reset();
                    cv.action.createShieldLayer(null, "shieldLayer-switchScene", cv.Enum.ZORDER_TYPE.ZORDER_LOADING);

                    let tarSceneName: string = cv.Enum.SCENE.HALL_SCENE;
                    if (this.isEnterMTT) {
                        cv.action.switchScene(tarSceneName, (scene: cc.Scene): void => {
                        });
                    }
                    else {
                        cv.action.switchScene(tarSceneName, (scene: cc.Scene): void => {
                            cv.MessageCenter.send("switchSceneToMiniGame");
                        });
                    }
                } break;

                default:
                    break;
            }

            if (!this.checkGameIsZoom(this.getCurrentGameID())) {
                this.LeaveRoomSuccess();
            }
            else {
                cv.GameDataManager.tGameData.reset();
                cv.GameDataManager.tRoomData.reset();
                cv.GameDataManager.tGiftData.reset();
                //如果是急速房间，自己还没落座，直接退出  --temp add
                if (cv.GameDataManager.tRoomData.i32SelfSeat == -1) {
                    cv.MessageCenter.send("on_leave_room_succ");
                }
            }
        }
        else {
            let scene = cv.config.getCurrentScene();
            if (this.isEnterMTT && (scene == cv.Enum.SCENE.GAME_SCENE || scene == cv.Enum.SCENE.JACKFRUIT_SCENE)) {
                cv.TT.showMsg(cv.config.getStringData("MTT_frame_enter_delay"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            }
            switch (gameID) {
                case world_pb.GameId.CowBoy:
                case world_pb.GameId.VideoCowboy:
                case world_pb.GameId.HumanBoy:
                case world_pb.GameId.PokerMaster: {
                    cv.ToastGameError(cv.Number(gameID), error);
                } break;

                case world_pb.GameId.Allin: {
                    cv.ToastError(data.error);
                } break;

                default: {
                    if (this.checkGameIsZoom(this.getCurrentGameID())) {
                        cv.ToastError(data.Error);
                    } else {
                        cv.ToastError(data.error);
                    }
                } break;
            }
        }
    }

    /**
     * 离开房间清理房间缓存信息
     * 小游戏因为需要gameID来拉取房间列表，从房间退出时gameId不清除
     */
    public LeaveRoomSuccess() {
        switch (this.getCurrentGameID()) {
            case world_pb.GameId.Bet:
            case world_pb.GameId.Texas:
            case world_pb.GameId.StarSeat:
            case world_pb.GameId.PLO:
            case world_pb.GameId.Jackfruit:
            case world_pb.GameId.Allin: {
                this.reset();
            } break;

            case world_pb.GameId.CowBoy:
            case world_pb.GameId.VideoCowboy:
            case world_pb.GameId.HumanBoy:
            case world_pb.GameId.PokerMaster: {
                this.resetRoomCache();
                this.setCurrentRoomID(0);
            } break;

            default: {
                if (this.checkGameIsZoom(this.getCurrentGameID())) { //急速扑克
                    this.reset();
                }
            } break;
        }
        cv.netWorkManager.closeGameHeart();
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
    }

    /**
     * 一次性退出到HallScene场景
     */
    public LeaveRoomAndGame() {
        this.LeaveRoomSuccess();
        this.setCurrentGameID(0);
    }

    /**
     * 
     * @param GameId 通过"gameid"获取场景名称
     */
    public getSceneNameByGameId(gameid: number): string {
        let sceneName = "";
        switch (gameid) {
            case world_pb.GameId.Texas:
            case world_pb.GameId.StarSeat:
            case world_pb.GameId.PLO: sceneName = cv.Enum.SCENE.GAME_SCENE; break;
            case world_pb.GameId.CowBoy: sceneName = cv.Enum.SCENE.COWBOY_SCENE; break;
            case world_pb.GameId.VideoCowboy: sceneName = cv.Enum.SCENE.VIDEOCOWBOY_SCENE; break;
            case world_pb.GameId.HumanBoy: sceneName = cv.Enum.SCENE.HUMANBOY_SCENE; break;
            case world_pb.GameId.PokerMaster: sceneName = cv.Enum.SCENE.POKERMASTER_SCENE; break;
            case world_pb.GameId.Allin: sceneName = cv.Enum.SCENE.GAME_SCENE;
            case world_pb.GameId.Bet: sceneName = cv.Enum.SCENE.GAME_SCENE; break;
            case world_pb.GameId.Jackfruit: sceneName = cv.Enum.SCENE.JACKFRUIT_SCENE; break;
            case world_pb.GameId.Sports:
            case world_pb.GameId.PocketGames: sceneName = cv.Enum.SCENE.SPORTS_SCENE; break;
            case world_pb.GameId.TopMatches: sceneName = cv.Enum.SCENE.TOPMATCHE_SCENE; break;

            default: {
                if (this.checkGameIsZoom(gameid)) {
                    sceneName = cv.Enum.SCENE.GAME_SCENE;
                }
            } break;
        }

        return sceneName;
    }

    /**
     * 由于各服务器返回错误码字段名称不一样。在这get一下
     * @param data 数据
     */
    public getErrorCode(data: any): number {
        let nRet: number = -1;
        let gameID: number = this.getCurrentGameID();
        switch (gameID) {

            case world_pb.GameId.Texas:
            case world_pb.GameId.StarSeat:
            case world_pb.GameId.PLO:
            case world_pb.GameId.Bet:
            case world_pb.GameId.Allin: {
                nRet = data.error;
            } break;

            case world_pb.GameId.CowBoy:
            case world_pb.GameId.VideoCowboy:
            case world_pb.GameId.HumanBoy:
            case world_pb.GameId.Jackfruit:
            case world_pb.GameId.PokerMaster: {
                nRet = data.code;
            } break;

            default: {
                if (cv.roomManager.checkGameIsZoom(gameID)) {
                    return data.error;
                }
            } break;

        }
        return nRet;
    }

    public setCurrentGameID(id: number) {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            this.current_gameId = world_pb.GameId.CowBoy;
        }
        else {
            this.current_gameId = id;
        }
    }

    public getCurrentGameID(): number {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            return world_pb.GameId.CowBoy;
        }
        else {
            return this.current_gameId;
        }
    }

    public setCurrentRoomID(id: number) {
        this.current_roomId = id;
    }

    public getCurrentRoomID(): number {
        return this.current_roomId;
    }

    //判断当前GameID是否是急速扑克
    public checkGameIsZoom(gameId: number): boolean {
        return gameId >= world_pb.GameId.ZoomTexas && gameId <= world_pb.GameId.ZoomTexasMax;
    }

    public setRoomPassWord(roomPassWord: string) {
        this.roomPassWord = roomPassWord;
    }

    public getRoomPassWord(): string {
        return this.roomPassWord;
    }

    public setIsNeedPassword(isNeedPassword: boolean) {
        this.isNeedPassword = isNeedPassword;
    }

    public getIsNeedPassword(): boolean {
        return this.isNeedPassword;
    }

    public setIsQuickRoom(IsQuickRoom: boolean) {
        this.isQuickRoom = IsQuickRoom;
    }

    public getIsQuickRoom(): boolean {
        return this.isQuickRoom;
    }

    //!当进入房间成功后都应该调用此方法清掉缓存（有用到这些参数的地方）
    public resetRoomCache() {
        this.roomPassWord = "";
        //this.isQuickRoom = false;
        this.isNeedPassword = false;
    }

    //!清理所有的缓存信息
    public reset() {
        this.current_gameId = 0;
        this.current_roomId = 0;
        this.roomPassWord = "";
        this.isQuickRoom = false;
        this.isNeedPassword = false;
    }

    public startScheduleForMTT() {
        //按照需求，开始时间固定，不进行倒计时
        return;
        let s = cc.director.getScheduler();
        s.enableForTarget(this);
        s.schedule(this.changeMttTime, this, 1.0);
        cv.roomManager.mtt_backTime = (new Date()).getTime();
    }

    public closeScheduleForMTT() {
        //按照需求，开始时间固定，不进行倒计时
        return;
        cc.director.getScheduler().unschedule(this.changeMttTime, this);
    }

    changeMttTime(dt: number) {
        let tempTime = cv.roomManager.mtt_time - Math.round(((new Date()).getTime() - cv.roomManager.mtt_backTime) / 1000);
        if (tempTime > 0) {
            cv.TP.setMessageText(cv.StringTools.formatC(cv.config.getStringData("MTT_frame_time_info"), cv.roomManager.mtt_name, tempTime));
        }
        else {
            cv.TP.setMessageText(cv.StringTools.formatC(cv.config.getStringData("MTT_frame_begined"), cv.roomManager.mtt_name));
            this.closeScheduleForMTT();
        }

    }

    /**
     * 拼接体育地址
     * @param msg 
     */
    setSportsUrl(msg: world_pb.SportsLoginResponse) {
        let sports_server: string = "";
        let isNative: string = "";
        switch (msg.gameId) {
            case world_pb.GameId.Sports: sports_server = cv.domainMgr.getSportUrl(); break;
            case world_pb.GameId.TopMatches: sports_server = cv.domainMgr.getTopMatchesUrl(); break;
            default: break;
        }

        if (cv.config.GET_DEBUG_MODE() === 1) {
            isNative = `&isNative=1`;
        }
        else {
            isNative = `&isNative=${(cc.sys.isNative ? "1" : "0")}`;
        }

        let token: string = `?token=${msg.token}`;
        let frontId: string = `&frontId=${msg.frontId}`;
        let title: string = `&title=体育竞猜`;
        let mid: string = msg.gameId === world_pb.GameId.TopMatches ? `&mid=${msg.matchId}` : "";
        this._SportsUrl = encodeURI(`${sports_server}${token}${isNative}${frontId}${title}${mid}`);
    }

    /**
     * 获取体育地址
     */
    getSportsUrl() {
        console.log("-------> _SportsUrl = " + this._SportsUrl);
        return this._SportsUrl;
    }

    /**
     * 电子游戏拼接地址
     * @param operatorToken 
     * @param playerSession 
     */
    setElcGamesUrl(operatorToken: string, playerSession: string) {
        let lang = cv.config.getCurrentLanguage();
        let currentLang = "en";
        switch (lang) {
            case cv.Enum.LANGUAGE_TYPE.zh_CN:
                currentLang = "zh";
                break;
            case cv.Enum.LANGUAGE_TYPE.en_US:
                currentLang = "en";
                break;
            case cv.Enum.LANGUAGE_TYPE.th_PH:
                currentLang = "th";
                break;
            case cv.Enum.LANGUAGE_TYPE.yn_TH:
                currentLang = "vi";
                break;
        }
        let url = encodeURI(cv.domainMgr.getPocketGamesUrl()
            + this.ElcGameCode + "/index.html?operator_token="
            + operatorToken + "&bet_type=1&language="
            + currentLang + "&from=ccjs://back-normal&operator_player_session="
            + playerSession + "&isNative="
            + (cc.sys.isNative && ((cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) ? "1" : "0"));

        console.log("_ElcGamesUrl: " + url);

        cv.roomManager.setCurrentGameID(pb.GameId.PocketGames);

        this._ElcGamesUrl = url;
    }

    /**
     * 获取电子游戏地址
     */
    getElcGamesUrl() {
        return this._ElcGamesUrl;
    }
}

