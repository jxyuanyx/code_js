import pb_pokermaster = require("../../../../Script/common/pb/pokermaster");
import pokermaster_proto = pb_pokermaster.pokermaster_proto;

import cv from "../../lobby/cv";
import pokerMasterDataMgr from "./PokerMasterDataMgr";
import { NetWorkProxy } from "../../../common/net/NetWorkProxy";

import { PokerMasterDef } from "./PokerMasterDef";
import { PokerMasterRoomData, PokerMasterZoneData } from "./PokerMasterRoomData";

export class PokerMasterBaseSocket extends NetWorkProxy {
    private static _g_Instance: PokerMasterBaseSocket = null;                   // 单例
    private _bInitMsg: boolean = false;

    /**
     * 获取单例
     */
    static getInstance(): PokerMasterBaseSocket {
        if (!PokerMasterBaseSocket._g_Instance) {
            PokerMasterBaseSocket._g_Instance = new PokerMasterBaseSocket();
        }
        return PokerMasterBaseSocket._g_Instance;
    }

    /**
     * 清理所有网络消息注册
     */
    unregisterNetMsgs(): void {
        this._bInitMsg = false;
        cv.netWork.unregisterMsgForGame(cv.Enum.GameId.PokerMaster);
    }

    // private constructor() {
    //     super();
    //     this._initNetMsg();
    // }

    /**
     * 注册网络消息
     * @param msgid 
     * @param fn 
     */
    private _registerNetMsg(msgid: number, fn: (puf: any) => void, ): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.PokerMaster);
    }

    /**
     * 发送"网络"消息
     * @param stuName 
     * @param stuData 
     * @param msgID 
     * @param roomID 
     */
    private _sendNetMsg(stuName: string, stuData: any, msgID: number, roomID: number): boolean {
        console.log(`pokermaster_proto-send-${msgID}-${stuName} = ${stuData}`);
        let buf: object = this.encodePB(stuName, stuData);
        return this.sendMsg(buf, msgID, roomID, cv.Enum.SeverType.SeverType_Game, cv.Enum.GameId.PokerMaster);
    }

    /**
     * 解析"网络"消息
     * @param stuName 
     * @param stuBuf 
     * @param msgID 
     */
    private _parseNetMsg(stuName: string, stuBuf: any, msgID: number): any {
        let parse: any = this.decodePB(stuName, stuBuf);
        console.log(`pokermaster_proto-receive-${msgID}-${stuName} = ${parse}`);
        return parse;
    }

    /**
     * 发送"本地"消息
     * @param name 
     * @param param 
     */
    private _sendLocalMsg(name: string, param?: any): void {
        cv.MessageCenter.send(`${PokerMasterDef.LocalMsg().MsgPrefix}${name}`, param);
    }

    // 弹出通用错误提示
    private _toastError(code: number): void {
        if (code === pokermaster_proto.ErrorCode.OK) return;
        cv.ToastGameError(cv.Enum.GameId.PokerMaster, code);
    }

    // 抛出错误提示至游戏中处理(游戏专属资源去显示错误提示)
    private _postError(code: number): void {
        if (code === pokermaster_proto.ErrorCode.OK || code === pokermaster_proto.ErrorCode.IN_CALM_DOWN) return;
        this._sendLocalMsg(PokerMasterDef.LocalMsg().ERROR, code);
    }

    private _initNetMsg(): void {
        if (this._bInitMsg) return;
        this._bInitMsg = true;

        this._registerNetMsg(pokermaster_proto.CMD.LOGIN_GAME_RESP, this._handleLoginResponse.bind(this));                                  // 登录
        this._registerNetMsg(pokermaster_proto.CMD.HEART_BEAT_RESP, this._handleHeartBeatResponse.bind(this));                              // 心跳
        this._registerNetMsg(pokermaster_proto.CMD.JOIN_ROOM_RESP, this._handleJoinRoomResponse.bind(this));                                // 加入房间
        this._registerNetMsg(pokermaster_proto.CMD.LEAVE_ROOM_RESP, this._handleLeaveRoomResponse.bind(this));                              // 离开房间
        this._registerNetMsg(pokermaster_proto.CMD.LEAVE_ROOM_NOTIFY, this._handleLeaveRoomNotify.bind(this));                              // 离开房间
        this._registerNetMsg(pokermaster_proto.CMD.KICK_NOTIFY, this._handleKickNotify.bind(this));                                         // 服务器踢人

        this._registerNetMsg(pokermaster_proto.CMD.ROOM_TREND_RSP, this._handleTrendResponse.bind(this));                                   // 房间趋势数据房间
        this._registerNetMsg(pokermaster_proto.CMD.ROOM_TREND_NOTICE, this._handleTrendNotify.bind(this));                                  // 房间趋势数据房间
        this._registerNetMsg(pokermaster_proto.CMD.PLAYER_LIST_RESP, this._handlePlayerListResponse.bind(this));                            // 玩家列表

        this._registerNetMsg(pokermaster_proto.CMD.GAME_DATA_SYN, this._handleGameDataSynNotify.bind(this));                                // 进房房间数据同步
        this._registerNetMsg(pokermaster_proto.CMD.DEAL_NOTIFY, this._handleDealNotify.bind(this));                                         // 游戏状态变更 - 新开一局
        this._registerNetMsg(pokermaster_proto.CMD.SHOW_ODDS_NOTIFY, this._handleShowOddsNotify.bind(this));                                // 游戏状态变更 - 公布赔率
        this._registerNetMsg(pokermaster_proto.CMD.START_BET_NOTIFY, this._handleStartBetNotify.bind(this));                                // 游戏状态变更 - 开始下注
        this._registerNetMsg(pokermaster_proto.CMD.STOP_BET_NOTIFY, this._handleStopBetNotify.bind(this));                                  // 游戏状态变更 - 停止下注
        this._registerNetMsg(pokermaster_proto.CMD.GAME_ROUND_END_NOTIFY, this._handleGameRoundEndNofity.bind(this));                       // 游戏状态变更 - 一局结束/结算
        this._registerNetMsg(pokermaster_proto.CMD.READY_GAME_NOTIFY, this._handleReadyGameNofity.bind(this));                              // 游戏状态变更 - 清屏准备

        this._registerNetMsg(pokermaster_proto.CMD.BET_RESP, this._handleBetResponse.bind(this));                                           // 下注
        this._registerNetMsg(pokermaster_proto.CMD.BET_NOTIFY, this._handleBetNotify.bind(this));                                           // 下注
        this._registerNetMsg(pokermaster_proto.CMD.START_SETTLEMENT_NOTIFY, this._handleEndBetNotify.bind(this));                           // 开始结算通知(结束下注)
        this._registerNetMsg(pokermaster_proto.CMD.AUTO_BET_RESP, this._handleAutoBetResponse.bind(this));                                  // 续投
        this._registerNetMsg(pokermaster_proto.CMD.MERGE_AUTO_BET_NOTIFY, this._handleMergeAutoBetNotify.bind(this));                       // 续投时候合并下发通知消息
        this._registerNetMsg(pokermaster_proto.CMD.SET_GAME_OPTION_RSP, this._handleSetGameOptionResponse.bind(this));			            // 自定义下注金额选项、续投按钮级别
        this._registerNetMsg(pokermaster_proto.CMD.ADVANCE_AUTO_BET_SET_RSP, this._handleAdvanceAutoBetSetResponse.bind(this));			    // 设置高级续投次数
        this._registerNetMsg(pokermaster_proto.CMD.ADVANCE_AUTO_BET_RSP, this._handleAdvanceAutoBetResponse.bind(this));			        // 高级续投
        this._registerNetMsg(pokermaster_proto.CMD.CANCEL_ADVANCE_AUTO_BET_RSP, this._handleCancelAdvanceAutoBetResponse.bind(this));       // 取消高级续投

        this._registerNetMsg(pokermaster_proto.CMD.BET_REVIEW_RSP, this._handleBetReviewResponse.bind(this));                               // 投注回顾
    }

    /**
     * 登录请求
     */
    requestVerifyLogin(): void {
        this._initNetMsg();

        let data: pokermaster_proto.LoginReq = pokermaster_proto.LoginReq.create();
        let token: string = cv.dataHandler.getUserData().user_token;
        if (cv.StringTools.getArrayLength(token) <= 0) {
            token = cv.tools.GetStringByCCFile("user_token");
            if (cv.StringTools.getArrayLength(token) <= 0) return;
        }

        data.version = cv.config.GET_CLIENT_VERSION();
        data.token = token;
        data.client_type = cv.config.GET_CLIENT_TYPE();

        this._sendNetMsg("LoginReq", data, pokermaster_proto.CMD.LOGIN_GAME_REQ, 0);
    }
    private _handleLoginResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.LoginResp = this._parseNetMsg("LoginResp", puf, msgID);
        if (resp) {
            if (resp.code === pokermaster_proto.ErrorCode.OK) {
                if (resp.roomid > 0) {
                    cv.roomManager.setCurrentRoomID(resp.roomid);
                }
                cv.netWorkManager.OnPokerMasterServerLogin();
            }
            else {
                cv.SwitchLoadingView.hide();
                this._toastError(resp.code);
            }
        }
    }

    /**
     * 心跳请求
     */
    requestHeartBeat(): boolean {
        let data: pokermaster_proto.HeartBeatReq = pokermaster_proto.HeartBeatReq.create();
        data.uid = cv.dataHandler.getUserData().u32Uid;
        return this._sendNetMsg("HeartBeatReq", data, pokermaster_proto.CMD.HEART_BEAT_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleHeartBeatResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.HeartBeatResp = this._parseNetMsg("HeartBeatResp", puf, msgID);
        if (resp) {
            cv.netWorkManager.onGameHeartBeat();
        }
    }

    /**
     * 加入房间请求
     * @param roomId 
     */
    requestJoinRoom(roomId: number): void {
        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            let data: pokermaster_proto.JoinRoomReq = pokermaster_proto.JoinRoomReq.create();
            data.roomid = roomId;

            this._sendNetMsg("JoinRoomReq", data, pokermaster_proto.CMD.JOIN_ROOM_REQ, roomId);
        } else {
            this.requestVerifyLogin();
        }
    }
    private _handleJoinRoomResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.JoinRoomResp = this._parseNetMsg("JoinRoomResp", puf, msgID);
        if (resp) {
            cv.roomManager.onJoinRoomResponse(resp);
        }
    }

    /**
     * 离开房间请求
     */
    requestLeaveRoom(): void {
        let data: pokermaster_proto.LeaveRoomReq = pokermaster_proto.LeaveRoomReq.create();
        this._sendNetMsg("LeaveRoomReq", data, pokermaster_proto.CMD.LEAVE_ROOM_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleLeaveRoomResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.LeaveRoomResp = this._parseNetMsg("LeaveRoomResp", puf, msgID);
        if (resp) {
            cv.roomManager.onResponse_LeaveRoom(resp);
        }
    }
    private _handleLeaveRoomNotify(puf: any): void {
    }

    /**
     * 服务器踢人通知
     */
    private _handleKickNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.KickNotify = this._parseNetMsg("KickNotify", puf, msgID);
        if (noti) {
            this._sendLocalMsg(PokerMasterDef.LocalMsg().ROOM_KICK, noti);
        }
    }

    /**
     * 房间趋势数据请求
     */
    requestTrend(): void {
        let data: pokermaster_proto.TrendData = pokermaster_proto.TrendData.create();
        this._sendNetMsg("RoomTrendReq", data, pokermaster_proto.CMD.ROOM_TREND_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleTrendResponse(puf: any): void {
    }
    private _handleTrendNotify(puf: any, msgID: number): void {
        let resp: pokermaster_proto.RoomTrendNotice = this._parseNetMsg("RoomTrendNotice", puf, msgID);
        if (resp) {
            let roomData: PokerMasterRoomData = pokerMasterDataMgr.getPokerMasterRoom();
            roomData.iLastRow = resp.lastRow;
            roomData.iLastCol = resp.lastCol;

            let vTrendRoad: any[] = resp.road;
            let vTrendData: any[] = resp.trend;
            cv.StringTools.clearArray(roomData.vTrendRoad);
            cv.StringTools.clearArray(roomData.vTrendData);

            for (let i = 0; i < cv.StringTools.getArrayLength(vTrendData); ++i) {
                let data: pokermaster_proto.TrendData = vTrendData[i];
                roomData.vTrendData.push(data);
            }

            for (let i = 0; i < cv.StringTools.getArrayLength(vTrendRoad); ++i) {
                let road: pokermaster_proto.TrendRoad = vTrendRoad[i];
                roomData.vTrendRoad.push(road);
            }

            roomData.tFortune = pokermaster_proto.PlayerFortune.create(resp.fortune);

            this._sendLocalMsg(PokerMasterDef.LocalMsg().UPDATE_TREND);
        }
    }

    /**
     *  玩家列表请求
     */
    requestPlayerList(): void {
        let data: pokermaster_proto.PlayerListReq = pokermaster_proto.PlayerListReq.create();
        this._sendNetMsg("PlayerListReq", data, pokermaster_proto.CMD.PLAYER_LIST_REQ, cv.roomManager.getCurrentRoomID())
    }
    private _handlePlayerListResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.PlayerListResp = this._parseNetMsg("PlayerListResp", puf, msgID);
        if (resp) {
            let roomData: PokerMasterRoomData = pokerMasterDataMgr.getPokerMasterRoom();
            cv.StringTools.clearArray(roomData.gamePlayerList);
            roomData.brdzplayerNum = resp.playerNum; let vGamePlayers: any[] = resp.gamePlayers;
            for (let i = 0; i < cv.StringTools.getArrayLength(vGamePlayers); ++i) {
                let player: pokermaster_proto.GamePlayer = vGamePlayers[i];
                roomData.gamePlayerList.push(player);
            }

            this._sendLocalMsg(PokerMasterDef.LocalMsg().UPDATE_PLAYER_LIST);
        }
    }

    /**
     * 解析"结算"信息
     * @param noti 
     * @param isRoundEnd 
     */
    private _parseGameRoundEndInfo(noti: pokermaster_proto.GameRoundEndNotify, isRoundEnd: boolean): void {
        pokerMasterDataMgr.getPokerMasterRoom().change_points = noti.change_points;
        // 运势
        do {
            pokerMasterDataMgr.getPokerMasterRoom().fLeftFortune = noti.fortune.fisherFortune;
            pokerMasterDataMgr.getPokerMasterRoom().fRightFortune = noti.fortune.sharkFortune;
        } while (false);

        // 比牌结果
        do {
            pokerMasterDataMgr.getPokerMasterRoom().tRoundresult = pokermaster_proto.RoundResult.create(noti.roundResult);
            console.log("boob =>");
        } while (false);

        // 主界面8个人的输赢情况和自己的结算输赢(如果在8个人里面只下发一个)
        do {
            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles);
            for (let i = 0; i < noti.playerSettle.length; ++i) {
                let t: pokermaster_proto.PlayerSettle = pokermaster_proto.PlayerSettle.create(noti.playerSettle[i]);
                pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles.push(t);
            }

            // 把结算数据更新到玩家数据中
            pokerMasterDataMgr.getPokerMasterRoom().updatePlayerSettleKeepWinCountAndCoin();
        } while (0);

        // 除主界面8个人输赢外其它玩家列表的输赢
        do {
            pokerMasterDataMgr.getPokerMasterRoom().tOtherPlayerSettle = pokermaster_proto.PlayerSettle.create(noti.otherPlayers);
        } while (0);

        // 顶栏输赢结果(一手结束, 非结束阶段进入房间才push)
        if (isRoundEnd) {
            let vLastResult: pokermaster_proto.BetZoneOption[] = pokerMasterDataMgr.getPokerMasterRoom().vLastResult;
            let maxHistoryResultsRetention: number = pokerMasterDataMgr.getPokerMasterRoom().nMaxLastResultRetention;

            vLastResult.push(noti.roundResult.winOp);
            if (cv.StringTools.getArrayLength(vLastResult) > maxHistoryResultsRetention) {
                vLastResult.splice(0, 1);
            }
        }

        // 各个区域输赢结果
        do {
            for (let i = 0; i < noti.optionResult.length; ++i) {
                let eOption: pokermaster_proto.BetZoneOption = noti.optionResult[i].option;
                let iResult: number = noti.optionResult[i].result;
                let iLoseHand: number = noti.optionResult[i].loseHand;

                let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(eOption);
                if (!zoneData) {
                    zoneData = new PokerMasterZoneData();
                    pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.add(eOption, zoneData);
                }

                // 更新区域输赢结果
                zoneData.result = iResult;
                zoneData.luckLoseHand = iLoseHand;

                // 插入历史胜负记录(按时间降序)
                let vHistoryResults: number[] = zoneData.vHistoryResults;
                let maxHistoryResultsRetention: number = zoneData.maxHistoryResultsRetention;

                vHistoryResults.unshift(iResult);
                if (vHistoryResults.length > maxHistoryResultsRetention) {
                    vHistoryResults.splice(maxHistoryResultsRetention, vHistoryResults.length - maxHistoryResultsRetention);
                }
            }
        } while (0);

        // 非0代表系统即将维护
        pokerMasterDataMgr.getPokerMasterRoom().nStopWorld = noti.stopWorld;
        pokerMasterDataMgr.getPokerMasterRoom().idle_roomid = noti.idle_roomid;
    }

    /**
     * 解析"赔率"信息
     * @param oddsOp 
     */
    private _parseGameOddsInfo(oddsData: pokermaster_proto.IBetOptionsOdds[]): void {
        for (let i = 0; i < oddsData.length; ++i) {
            let option: pokermaster_proto.BetZoneOption = oddsData[i].option;
            let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(option);
            if (!zoneData) {
                zoneData = new PokerMasterZoneData();
                pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.add(option, zoneData);
            }

            zoneData.odds = oddsData[i].odds;
            zoneData.limitBet = oddsData[i].limitRed;
        }
    }

    /**
     * 进房房间数据同步通知
     */
    private _handleGameDataSynNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.GameDataSynNotify = this._parseNetMsg("GameDataSynNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().reset();
        pokerMasterDataMgr.getPokerMasterRoom().tCurRoom = pokermaster_proto.RoomParam.create(noti.param);
        pokerMasterDataMgr.getPokerMasterRoom().u32RoomId = noti.param.roomid;
        pokerMasterDataMgr.getPokerMasterRoom().u32Uid = cv.dataHandler.getUserData().u32Uid;

        pokerMasterDataMgr.getPokerMasterRoom().bCanAuto = noti.canAuto;
        pokerMasterDataMgr.getPokerMasterRoom().bCanAdvanceAuto = noti.canAdvanceAuto;
        pokerMasterDataMgr.getPokerMasterRoom().eCurState = noti.curState;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llCoinUICritical = cv.StringTools.clientGoldByServer(noti.BetButtonLimitAmount);
        pokerMasterDataMgr.getPokerMasterRoom().uWhoIsLeader = noti.whoIsLeader;
        if (noti.squintMsg) {
            pokerMasterDataMgr.getPokerMasterRoom().uWhoIsLeader = noti.squintMsg.whoIsLeader;
            pokerMasterDataMgr.getPokerMasterRoom().bCanSquint = noti.squintMsg.canSquint;
            pokerMasterDataMgr.getPokerMasterRoom().bSkipSquint = noti.squintMsg.skipRound;

            pokerMasterDataMgr.getPokerMasterRoom().fisherLevel = noti.squintMsg.fisherLevel;
            pokerMasterDataMgr.getPokerMasterRoom().sharkLevel = noti.squintMsg.sharkLevel;
            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().sharkOuts);
            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().dashiOuts);
            let fishOutsLen = noti.squintMsg.fisherOuts.length;
            let sharkOutsLen = noti.squintMsg.sharkOuts.length;

            for (let i = 0; i < fishOutsLen; ++i) {
                pokerMasterDataMgr.getPokerMasterRoom().dashiOuts.push(pokermaster_proto.OutItem.create(noti.squintMsg.fisherOuts[i]));
            }

            for (let i = 0; i < sharkOutsLen; ++i) {
                pokerMasterDataMgr.getPokerMasterRoom().sharkOuts.push(pokermaster_proto.OutItem.create(noti.squintMsg.sharkOuts[i]));
            }
        }

        // 运势
        do {
            pokerMasterDataMgr.getPokerMasterRoom().fLeftFortune = noti.fortune.fisherFortune;
            pokerMasterDataMgr.getPokerMasterRoom().fRightFortune = noti.fortune.sharkFortune;
        } while (false);

        // 底牌
        do {
            // 左 - 渔夫
            for (let i = 0; i < noti.fisherHoleCards.length; ++i) {
                let card_item: pokermaster_proto.CardItem = pokermaster_proto.CardItem.create(noti.fisherHoleCards[i]);
                pokerMasterDataMgr.getPokerMasterRoom().vLeftHandCards.push(card_item);
            }

            // 右 - 鲨鱼
            for (let i = 0; i < noti.sharkHoleCards.length; ++i) {
                let card_item: pokermaster_proto.CardItem = pokermaster_proto.CardItem.create(noti.sharkHoleCards[i]);
                pokerMasterDataMgr.getPokerMasterRoom().vRightHandCards.push(card_item);
            }

            // 公共牌
            for (let i = 0; i < noti.publicCards.length; ++i) {
                let card_item: pokermaster_proto.CardItem = pokermaster_proto.CardItem.create(noti.publicCards[i]);
                pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards.push(card_item);
            }
        } while (false);

        // 赔率信息
        this._parseGameOddsInfo(noti.oddsOp);

        // 高级设置/续投
        do {
            // 对应房间级别的下注金额选项(优先取下发的默认值, 若无默认值则取房间参数里面的amountLevel值)
            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption);
            let betcoinoption_size: number = cv.StringTools.getArrayLength(noti.betCoinOption);
            if (betcoinoption_size > 0) {
                for (let i = 0; i < betcoinoption_size; ++i) {
                    pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption.push(noti.betCoinOption[i]);
                }
            }
            else {
                let amountlevel_size: number = cv.StringTools.getArrayLength(noti.param.amountLevel);
                for (let i = 0; i < amountlevel_size; ++i) {
                    pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption.push(noti.param.amountLevel[i]);
                }
            }

            // 续投
            pokerMasterDataMgr.getPokerMasterRoom().eAutoLevel = noti.autoLevel;
            pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount = noti.usedAutoBetCount;
            pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount = noti.selectAutoBetCount;

            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vAutoBetCountList);
            let autobetcountlist_size: number = cv.StringTools.getArrayLength(noti.AutoBetCountList);
            for (let i = 0; i < autobetcountlist_size; ++i) {
                pokerMasterDataMgr.getPokerMasterRoom().vAutoBetCountList.push(noti.AutoBetCountList[i]);
            }
        } while (0);

        // 下注区域金币信息
        do {
            for (let i = 0; i < noti.optionInfo.length; ++i) {
                // 过滤有效选项
                let bet: pokermaster_proto.IBetOptionInfo = noti.optionInfo[i];
                if (bet.option === pokermaster_proto.BetZoneOption.FISHER_WIN
                    || bet.option == pokermaster_proto.BetZoneOption.SHARK_WIN
                    || bet.option == pokermaster_proto.BetZoneOption.FIVE_NONE_1DUI
                    || bet.option == pokermaster_proto.BetZoneOption.FIVE_2DUI
                    || bet.option == pokermaster_proto.BetZoneOption.FIVE_SAN_SHUN_TONG
                    || bet.option == pokermaster_proto.BetZoneOption.FIVE_GOURD
                    || bet.option == pokermaster_proto.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {

                    let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(bet.option);
                    if (!zoneData) {
                        zoneData = new PokerMasterZoneData();
                        pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.add(bet.option, zoneData);
                    }

                    zoneData.selfBet = bet.selfBet;
                    zoneData.totalBet = bet.totalBet;

                    // 所有人下的金额
                    cv.StringTools.clearArray(zoneData.vTotalBetDetail);
                    for (let j = 0; j < cv.StringTools.getArrayLength(bet.amount); ++j) {
                        zoneData.vTotalBetDetail.push(bet.amount[j]);
                    }

                    // 若该区域自己有下过注,则标记已下注
                    if (bet.selfBet > 0) {
                        pokerMasterDataMgr.getPokerMasterRoom().bHasBetInCurRound = true;
                    }
                }
            }
        } while (0);

        // 玩家信息 - 主界面8个人的游戏信息以及自己(自己永远是第一个，富豪1和神算子排第二和第三)
        do {
            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer);
            for (let i = 0; i < cv.StringTools.getArrayLength(noti.players); ++i) {
                let player: pokermaster_proto.GamePlayer = pokermaster_proto.GamePlayer.create(noti.players[i]);
                if (i === 0) {
                    if (player.uid === cv.dataHandler.getUserData().u32Uid) {
                        pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer = player;
                    }
                    else {
                        console.error("PokerMasterSocket.CMD.GAME_DATA_SYN, data error!!!, players[0] must be self!!!");
                    }
                }
                else {
                    pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer.push(player);
                }
            }
        } while (0);

        // 顶栏胜负记录
        do {
            let vLastResult: number[] = pokerMasterDataMgr.getPokerMasterRoom().vLastResult;
            let maxHistoryResultsRetention: number = pokerMasterDataMgr.getPokerMasterRoom().nMaxLastResultRetention;

            cv.StringTools.clearArray(vLastResult);
            for (let i = 0; i < noti.lastResult.length; ++i) {
                vLastResult.push(noti.lastResult[i]);
                if (cv.StringTools.getArrayLength(vLastResult) > maxHistoryResultsRetention) {
                    vLastResult.splice(0, 1);
                }
            }
        } while (false);

        // 各个区域胜负记录(按时间降序)
        do {
            for (let i = 0; i < cv.StringTools.getArrayLength(noti.optionResults); ++i) {
                let eOption: pokermaster_proto.BetZoneOption = noti.optionResults[i].option;
                let vResult: number[] = noti.optionResults[i].results;
                let iLoseHand: number = noti.optionResults[i].loseHand;

                let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(eOption);
                if (!zoneData) {
                    zoneData = new PokerMasterZoneData();
                    pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.add(eOption, zoneData);
                }

                zoneData.luckLoseHand = iLoseHand;
                let vHistoryResults: number[] = zoneData.vHistoryResults;
                let maxHistoryResultsRetention: number = zoneData.maxHistoryResultsRetention;

                cv.StringTools.clearArray(vHistoryResults);
                for (let i = 0; i < cv.StringTools.getArrayLength(vResult); ++i) {
                    vHistoryResults.push(vResult[i]);
                }

                if (cv.StringTools.getArrayLength(vHistoryResults) > maxHistoryResultsRetention) {
                    vHistoryResults.splice(maxHistoryResultsRetention, vHistoryResults.length - maxHistoryResultsRetention);
                }
            }
        } while (0);

        // 单局已结束的重连
        if (noti.curState === pokermaster_proto.RoundState.WAIT_NEXT_ROUND) {
            this._parseGameRoundEndInfo(pokermaster_proto.GameRoundEndNotify.create(noti.cachedNotifyMsg), false);
        }

        // 标记房间同步消息
        this._sendLocalMsg(PokerMasterDef.LocalMsg().GAME_DATA_SYN);

        cv.MessageCenter.send("onCalmDownMsg", noti);  
    }

    /**

     * 游戏状态变更 - 新开一局
     */
    private _handleDealNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.DealNotify = this._parseNetMsg("DealNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().resetRound();
        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().eCurState = pokermaster_proto.RoundState.NEW_ROUND;
        pokerMasterDataMgr.getPokerMasterRoom().bCanAuto = noti.canAuto;
        pokerMasterDataMgr.getPokerMasterRoom().bCanUpdateWorldServerGold = true;

        // 手牌
        do {
            for (let i = 0; i < noti.playerHoleCard.length; ++i) {
                switch (noti.playerHoleCard[i].name) {
                    // 左 - 渔夫
                    case pokermaster_proto.RoleName.Fisher: {
                        for (let j = 0; j < noti.playerHoleCard[i].Cards.length; ++j) {
                            let card_item: pokermaster_proto.CardItem = pokermaster_proto.CardItem.create(noti.playerHoleCard[i].Cards[j]);
                            pokerMasterDataMgr.getPokerMasterRoom().vLeftHandCards.push(card_item);
                        }
                    } break;

                    // 右 - 鲨鱼
                    case pokermaster_proto.RoleName.Shark: {
                        for (let j = 0; j < noti.playerHoleCard[i].Cards.length; ++j) {
                            let card_item: pokermaster_proto.CardItem = pokermaster_proto.CardItem.create(noti.playerHoleCard[i].Cards[j]);
                            pokerMasterDataMgr.getPokerMasterRoom().vRightHandCards.push(card_item);
                        }
                    } break;
                }
            }
        } while (false);

        // 玩家信息(主界面8个人的游戏信息以及自己(富豪1和神算子排第二和第三))
        do {
            cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer);
            for (let i = 0; i < noti.players.length; ++i) {
                let player: pokermaster_proto.GamePlayer = pokermaster_proto.GamePlayer.create(noti.players[i])
                if (i == 0) {
                    if (player.uid === cv.dataHandler.getUserData().u32Uid) {
                        pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer = player;
                    }
                    else {
                        console.error("PokerMasterSocket.CMD.DEAL_NOTIFY, data error!, players[0] must be self!");
                    }
                }
                else {
                    pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer.push(player);
                }
            }
        } while (0);

        // 判断房间参数变更
        if (noti.changed) {
            pokerMasterDataMgr.getPokerMasterRoom().tCurRoom = pokermaster_proto.RoomParam.create(noti.param);
            this._sendLocalMsg(PokerMasterDef.LocalMsg().ROOM_PARAM_CHANGE);
        }
        this._sendLocalMsg(PokerMasterDef.LocalMsg().STATUS_DEAL);
    }

    /**
     * 游戏状态变更 - 公布赔率
     */
    private _handleShowOddsNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.ShowOddsNotify = this._parseNetMsg("ShowOddsNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().uWhoIsLeader = noti.whoIsLeader;
        console.log("whoIsLeader = " + noti.whoIsLeader);

        this._parseGameOddsInfo(noti.option_odds);
        this._sendLocalMsg(PokerMasterDef.LocalMsg().STATUS_SHOW_ODDS);
    }

    /**
     * 游戏状态变更 - 开始下注
     */
    private _handleStartBetNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.StartBetNotify = this._parseNetMsg("StartBetNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().eCurState = pokermaster_proto.RoundState.BET;
        pokerMasterDataMgr.getPokerMasterRoom().bCanUpdateWorldServerGold = true;

        this._sendLocalMsg(PokerMasterDef.LocalMsg().STATUS_START_BET);
    }

    /**
     * 游戏状态变更 - 停止下注
     * @param puf 
     */
    private _handleStopBetNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.StopBetNotify = this._parseNetMsg("StopBetNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().uWhoIsLeader = noti.whoIsLeader;
        pokerMasterDataMgr.getPokerMasterRoom().eCurState = pokermaster_proto.RoundState.STOP_BET;
        pokerMasterDataMgr.getPokerMasterRoom().bCanSquint = noti.canSquint;
        pokerMasterDataMgr.getPokerMasterRoom().bSkipSquint = noti.skipRound;
        pokerMasterDataMgr.getPokerMasterRoom().fisherLevel = noti.fisherLevel;
        pokerMasterDataMgr.getPokerMasterRoom().sharkLevel = noti.sharkLevel;

        cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().sharkOuts);
        cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().dashiOuts);
        let fishOutsLen = noti.fisherOuts.length;
        let sharkOutsLen = noti.sharkOuts.length;

        for (let i = 0; i < fishOutsLen; ++i) {
            pokerMasterDataMgr.getPokerMasterRoom().dashiOuts.push(pokermaster_proto.OutItem.create(noti.fisherOuts[i]));
        }

        for (let i = 0; i < sharkOutsLen; ++i) {
            pokerMasterDataMgr.getPokerMasterRoom().sharkOuts.push(pokermaster_proto.OutItem.create(noti.sharkOuts[i]));
        }


        // 所有公牌
        cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards);
        for (let i = 0; i < noti.cards.length; ++i) {
            pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards.push(pokermaster_proto.CardItem.create(noti.cards[i]))
        }

        this._sendLocalMsg(PokerMasterDef.LocalMsg().STATUS_STOP_BET);
    }

    /**
     * 游戏状态变更 - 一局结束
     */
    private _handleGameRoundEndNofity(puf: any, msgID: number): void {
        let noti: pokermaster_proto.GameRoundEndNotify = this._parseNetMsg("GameRoundEndNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().eCurState = pokermaster_proto.RoundState.WAIT_NEXT_ROUND;
        pokerMasterDataMgr.getPokerMasterRoom().bCanUpdateWorldServerGold = false;

        this._parseGameRoundEndInfo(noti, true);
        this._sendLocalMsg(PokerMasterDef.LocalMsg().STATUS_ROUND_END);
    }

    /**
     * 游戏状态变更 - 清屏准备
     */
    private _handleReadyGameNofity(puf: any, msgID: number): void {
        let noti: pokermaster_proto.ReadyGameNotify = this._parseNetMsg("ReadyGameNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds = noti.leftSeconds;
        pokerMasterDataMgr.getPokerMasterRoom().eCurState = pokermaster_proto.RoundState.READY_GAME;
        pokerMasterDataMgr.getPokerMasterRoom().bCanUpdateWorldServerGold = true;
        pokerMasterDataMgr.getPokerMasterRoom().clearMapZoneData(false);

        this._sendLocalMsg(PokerMasterDef.LocalMsg().STATUS_READY);
    }

    /**
     * 请求下注
     */
    requestBet(betOption: pokermaster_proto.BetZoneOption, betAmount: number): void {
        let data: pokermaster_proto.BetReq = pokermaster_proto.BetReq.create();
        data.detail = pokermaster_proto.BetDetail.create();
        data.detail.option = betOption;
        data.detail.betAmount = betAmount;
        this._sendNetMsg("BetReq", data, pokermaster_proto.CMD.BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleBetResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.BetResp = this._parseNetMsg("BetResp", puf, msgID);
        if (!resp) return;

        this._postError(resp.code);
        if(resp.code ==pokermaster_proto.ErrorCode.IN_CALM_DOWN){
            cv.MessageCenter.send("onCalmDownMsg", resp);  
        }
    }
    private _handleBetNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.BetNotify = this._parseNetMsg("BetNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().updatePlayerCoin(noti.uid, noti.curCoin);
        pokerMasterDataMgr.getPokerMasterRoom().updateAreaBet(noti);
        if (noti.uid === cv.dataHandler.getUserData().u32Uid) {
            pokerMasterDataMgr.getPokerMasterRoom().bHasBetInCurRound = true;
        }

        this._sendLocalMsg(PokerMasterDef.LocalMsg().BET, noti);
    }

    /**
     * 开始结算通知(结束下注)
     */
    private _handleEndBetNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.StartSettlementNotify = this._parseNetMsg("StartSettlementNotify", puf, msgID);
        if (!noti) return;

        pokerMasterDataMgr.getPokerMasterRoom().bCanUpdateWorldServerGold = false;
    }

    /**
     * 续投请求
     */
    requestAutoBet(): void {
        let data: pokermaster_proto.AutoBetReq = pokermaster_proto.AutoBetReq.create();
        this._sendNetMsg("AutoBetReq", data, pokermaster_proto.CMD.AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAutoBetResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.AutoBetResp = this._parseNetMsg("AutoBetResp", puf, msgID);
        if (!resp) return;

        this._postError(resp.code);
        pokerMasterDataMgr.getPokerMasterRoom().bCanAuto = resp.canAuto;
        this._sendLocalMsg(PokerMasterDef.LocalMsg().AUTO_BET);

        if(resp.code ==pokermaster_proto.ErrorCode.IN_CALM_DOWN){
           cv.MessageCenter.send("onCalmDownMsg", resp);  
        }
    }
    private _handleMergeAutoBetNotify(puf: any, msgID: number): void {
        let noti: pokermaster_proto.MergeAutoBetNotify = this._parseNetMsg("MergeAutoBetNotify", puf, msgID);
        if (!noti) return;

        for (let i = 0; i < noti.notify.length; ++i) {
            let oneBetNotify: pokermaster_proto.BetNotify = new pokermaster_proto.BetNotify(noti.notify[i]);
            pokerMasterDataMgr.getPokerMasterRoom().updatePlayerCoin(oneBetNotify.uid, oneBetNotify.curCoin);
            pokerMasterDataMgr.getPokerMasterRoom().updateAreaBet(oneBetNotify);
            if (oneBetNotify.uid === cv.dataHandler.getUserData().u32Uid) {
                pokerMasterDataMgr.getPokerMasterRoom().bHasBetInCurRound = true;
            }
        }

        this._sendLocalMsg(PokerMasterDef.LocalMsg().AUTO_BET_MERGE, noti);
    }

    /**
     * 请求自定义下注金额选项、续投按钮级别
     */
    reqSetGameOption(vAmountLevel: number[], autoLevel: pokermaster_proto.AutoBetLevel): void {
        let data: pokermaster_proto.SetGameOptionReq = pokermaster_proto.SetGameOptionReq.create();
        data.autoLevel = autoLevel;
        data.betCoinOption = vAmountLevel;
        this._sendNetMsg("SetGameOptionReq", data, pokermaster_proto.CMD.SET_GAME_OPTION_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleSetGameOptionResponse(puf: any, msgID: number) {
        let resp: pokermaster_proto.SetGameOptionResp = this._parseNetMsg("SetGameOptionResp", puf, msgID);
        if (resp) {
            this._postError(resp.code);
            if (resp.code === pokermaster_proto.ErrorCode.OK) {
                pokerMasterDataMgr.getPokerMasterRoom().eAutoLevel = resp.autoLevel;
                cv.StringTools.clearArray(pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption);

                for (let i = 0; i < resp.betCoinOption.length; ++i) {
                    pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption.push(resp.betCoinOption[i]);
                }
                this._sendLocalMsg(PokerMasterDef.LocalMsg().ADVANCE_BET_LEVEL_CHANGE);
            }
        }
    }

    /**
     * 请求设置高级续投次数
     */
    reqAdvanceAutoBetSet(count: number): void {
        let data: pokermaster_proto.AdvanceAutoBetSetReq = pokermaster_proto.AdvanceAutoBetSetReq.create();
        data.count = count;
        this._sendNetMsg("AdvanceAutoBetSetReq", data, pokermaster_proto.CMD.ADVANCE_AUTO_BET_SET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetSetResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.AdvanceAutoBetSetRsp = this._parseNetMsg("AdvanceAutoBetSetRsp", puf, msgID);
        if (resp) {
            this._postError(resp.code);
            if (resp.code === pokermaster_proto.ErrorCode.OK) {
                pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount = 0;
                pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount = resp.count;
                this._sendLocalMsg(PokerMasterDef.LocalMsg().ADVANCE_AUTOBET_SET);
            }else if(resp.code ==pokermaster_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", resp);  
            }
        }
    }

    /**
     * 请求高级续投
     */
    reqAdvanceAutoBet(): void {
        let data: pokermaster_proto.AdvanceAutoBetReq = pokermaster_proto.AdvanceAutoBetReq.create();
        this._sendNetMsg("AdvanceAutoBetReq", data, pokermaster_proto.CMD.ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.AdvanceAutoBetRsp = this._parseNetMsg("AdvanceAutoBetRsp", puf, msgID);
        if (resp) {
            if (resp.code === pokermaster_proto.ErrorCode.OK) {
                pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount = resp.usedAutoBetCount;
            }
            
            if(resp.code ==pokermaster_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", resp);  
            }else{
                this._sendLocalMsg(PokerMasterDef.LocalMsg().ADVANCE_AUTOBET, resp.code);
            }
        }
    }

    /**
     * 请求取消高级续投返回
     */
    reqCancelAdvanceAutoBet(): void {
        let data: pokermaster_proto.CancelAdvanceAutoBetReq = pokermaster_proto.CancelAdvanceAutoBetReq.create();
        this._sendNetMsg("CancelAdvanceAutoBetReq", data, pokermaster_proto.CMD.CANCEL_ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleCancelAdvanceAutoBetResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.CancelAdvanceAutoBetRsp = this._parseNetMsg("CancelAdvanceAutoBetRsp", puf, msgID);
        if (resp) {
            this._postError(resp.code);
            if (resp.code === pokermaster_proto.ErrorCode.OK) {
                pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount = 0;
                pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount = 0;
                this._sendLocalMsg(PokerMasterDef.LocalMsg().ADVANCE_AUTOBET_CANCEL, resp.is_manual);
            }
        }
    }

    //投注回顾
    reqBetReview(): void {
        let data: pokermaster_proto.BetReviewReq = pokermaster_proto.BetReviewReq.create();
        this._sendNetMsg("BetReviewReq", data, pokermaster_proto.CMD.BET_REVIEW_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleBetReviewResponse(puf: any, msgID: number): void {
        let resp: pokermaster_proto.BetReviewRsp = this._parseNetMsg("BetReviewRsp", puf, msgID);
        if (resp) {
            this._postError(resp.code);
            if (resp.code === pokermaster_proto.ErrorCode.OK) {
                let betreview: any[] = resp.reviewed;
                let roomData: PokerMasterRoomData = pokerMasterDataMgr.getPokerMasterRoom();
                cv.StringTools.clearArray(roomData.vBetReview);

                for (let i = 0; i < cv.StringTools.getArrayLength(betreview); ++i) {
                    let reviewed: pokermaster_proto.BetReview = betreview[i];
                    roomData.vBetReview.push(reviewed);
                }

                this._sendLocalMsg(PokerMasterDef.LocalMsg().UPDATE_REVIEW);
            }
        }
    }
}
