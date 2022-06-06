import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import cv from "../../lobby/cv";
import humanboyDataMgr from "./HumanboyDataMgr";
import { NetWorkProxy } from "../../../common/net/NetWorkProxy";
import { HumanboyRoomData, HumanboyZoneData } from "./HumanboyRoomData";

export class HumanboyBaseSocket extends NetWorkProxy {
    private static _g_Instance: HumanboyBaseSocket = null;

    /**
     * 获取单例
     */
    static getInstance(): HumanboyBaseSocket {
        if (!HumanboyBaseSocket._g_Instance) {
            HumanboyBaseSocket._g_Instance = new HumanboyBaseSocket();
        }
        return HumanboyBaseSocket._g_Instance;
    }

    private constructor() {
        super();
        this._init();
    }

    // 注册网络消息
    private _registerMsg(msgid: number, fn: (puf: any) => void, ): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.HumanBoy);
    }

    // 发送网络消息
    private _sendMsg(pbBuf: any, msgID: number, roomID: number): boolean {
        return this.sendMsg(pbBuf, msgID, roomID, cv.Enum.SeverType.SeverType_Game, cv.Enum.GameId.HumanBoy);
    }

    // 弹出通用错误提示
    private _toastError(code: number): void {
        if (code === humanboy_proto.ErrorCode.OK) return;
        cv.ToastGameError(cv.Enum.GameId.HumanBoy, code);
    }

    // 抛出错误提示至游戏中处理(游戏专属资源去显示错误提示)
    private _postError(code: number): void {
        if (code === humanboy_proto.ErrorCode.OK || code === humanboy_proto.ErrorCode.IN_CALM_DOWN) return;
        cv.MessageCenter.send("on_humanboy_server_error", code);
    }

    private _init(): void {
        this._registerMsg(humanboy_proto.CMD.LOGIN_GAME_RESP, this._handleLoginResponse.bind(this));                                // 登录
        this._registerMsg(humanboy_proto.CMD.HEART_BEAT_RESP, this._handleHeartBeatResponse.bind(this));                            // 心跳
        this._registerMsg(humanboy_proto.CMD.JOIN_ROOM_RESP, this._handleJoinRoomResponse.bind(this));                              // 加入房间
        this._registerMsg(humanboy_proto.CMD.LEAVE_ROOM_RESP, this._handleLeaveRoomResponse.bind(this));                            // 离开房间
        this._registerMsg(humanboy_proto.CMD.LEAVE_ROOM_NOTIFY, this._handleLeaveRoomNotify.bind(this));                            // 离开房间
        this._registerMsg(humanboy_proto.CMD.KICK_NOTIFY, this._handleKickNotify.bind(this));                                       // 服务器踢人
        this._registerMsg(humanboy_proto.CMD.ROOM_TREND_RSP, this._handleTrendResponse.bind(this));                                 // 房间趋势数据房间
        this._registerMsg(humanboy_proto.CMD.ROOM_TREND_NOTICE, this._handleTrendNotify.bind(this));                                // 房间趋势数据房间
        this._registerMsg(humanboy_proto.CMD.PLAYER_LIST_RESP, this._handlePlayerListResponse.bind(this));                          // 玩家列表
        this._registerMsg(humanboy_proto.CMD.GAME_DATA_SYN, this._handleGameDataSynNotify.bind(this));                              // 进房房间数据同步
        this._registerMsg(humanboy_proto.CMD.DEAL_NOTIFY, this._handleDealNotify.bind(this));                                       // 游戏状态变更 - 新开一局
        this._registerMsg(humanboy_proto.CMD.START_BET_NOTIFY, this._handleStartBetNotify.bind(this));                              // 游戏状态变更 - 开始下注
        this._registerMsg(humanboy_proto.CMD.GAME_ROUND_END_NOTIFY, this._handleGameRoundEndNofity.bind(this));                     // 游戏状态变更 - 一局结束
        this._registerMsg(humanboy_proto.CMD.GAME_WILL_START_NOTIFY, this._handleGameWillStartNotify.bind(this));                   // 游戏状态变更 - 即将开始
        this._registerMsg(humanboy_proto.CMD.BET_RESP, this._handleBetResponse.bind(this));                                         // 下注
        this._registerMsg(humanboy_proto.CMD.BET_NOTIFY, this._handleBetNotify.bind(this));                                         // 下注
        this._registerMsg(humanboy_proto.CMD.START_SETTLEMENT_NOTIFY, this._handleEndBetNotify.bind(this));                         // 开始结算通知(结束下注)
        this._registerMsg(humanboy_proto.CMD.AUTO_BET_RESP, this._handleAutoBetResponse.bind(this));                                // 续投
        this._registerMsg(humanboy_proto.CMD.MERGE_AUTO_BET_NOTIFY, this._handleMergeAutoBetNotify.bind(this));                     // 续投时候合并下发通知消息
        this._registerMsg(humanboy_proto.CMD.DEALER_LIST_RSP, this._handleDealerList.bind(this));                                   // 上庄列表
        this._registerMsg(humanboy_proto.CMD.UPDATE_DEALER_LIST_RSP, this._handleDealerList.bind(this));                            // 更新上庄列表
        this._registerMsg(humanboy_proto.CMD.GET_BUY_STOCK_NUM_RSP, this._handleBuyStockNum.bind(this));                            // 可购买的股份数量
        this._registerMsg(humanboy_proto.CMD.UP_DEALER_RSP, this._handleUpDealer.bind(this));                                       // 申请上庄
        this._registerMsg(humanboy_proto.CMD.UP_DEALER_NOTIFY, this._handleUpDealerNotify.bind(this));                              // 上庄通知(只发自己)
        this._registerMsg(humanboy_proto.CMD.KICK_DEALER_APPLY_NOTIFY, this._handleKickDealerApplyNotify.bind(this));               // 上庄失败被踢(只发自己)
        this._registerMsg(humanboy_proto.CMD.DOWN_DEALER_RSP, this._handleDownDealer.bind(this));                                   // 下庄
        this._registerMsg(humanboy_proto.CMD.DOWN_DEALER_NOTIFY, this._handleDownDealerNotify.bind(this));                          // 下庄通知(只发自己)
        this._registerMsg(humanboy_proto.CMD.CANCEL_WAIT_RSP, this._handleCancelWait.bind(this));                                   // 取消等待队列
        this._registerMsg(humanboy_proto.CMD.JACKPOT_DATA_RSP, this._handleJackpotData.bind(this));                                 // Jackpot数据
        this._registerMsg(humanboy_proto.CMD.JACKPOT_AWARD_LIST_RSP, this._handleRecordData.bind(this));                            // 奖励记录
        this._registerMsg(humanboy_proto.CMD.SET_GAME_OPTION_RSP, this._handleSetGameOptionResponse.bind(this));			        // 自定义下注金额选项、续投按钮级别
        this._registerMsg(humanboy_proto.CMD.ADVANCE_AUTO_BET_SET_RSP, this._handleAdvanceAutoBetSetResponse.bind(this));			// 设置高级续投次数
        this._registerMsg(humanboy_proto.CMD.ADVANCE_AUTO_BET_RSP, this._handleAdvanceAutoBetResponse.bind(this));			        // 高级续投
        this._registerMsg(humanboy_proto.CMD.CANCEL_ADVANCE_AUTO_BET_RSP, this._handleCancelAdvanceAutoBetResponse.bind(this));     // 取消高级续投
    }

    /**
     * 登录请求
     */
    requestVerifyLogin(): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        if (cv.StringTools.getArrayLength(token) <= 0) {
            token = cv.tools.GetStringByCCFile("user_token");
            if (cv.StringTools.getArrayLength(token) <= 0) return;
        }

        let version: string = cv.config.GET_CLIENT_VERSION();
        let sendMsg: object = {
            token: token,
            version: version,
            client_type: cv.config.GET_CLIENT_TYPE()
        };

        let req: object = this.encodePB("LoginReq", sendMsg);

        console.log("humanboy_proto.LOGIN_GAME_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.LOGIN_GAME_REQ, 0);
    }
    private _handleLoginResponse(puf: any): void {
        let resp: humanboy_proto.LoginResp = this.decodePB("LoginResp", puf);
        if (resp) {
            console.log("humanboy_proto.LOGIN_GAME_RESP==>>" + resp);

            if (resp.code === humanboy_proto.ErrorCode.OK) {
                if (resp.roomid > 0) {
                    cv.roomManager.setCurrentRoomID(resp.roomid);
                }
                cv.netWorkManager.OnHumanboyServerLogin();
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
        let sendMsg: object = { uid: cv.dataHandler.getUserData().u32Uid };
        let req: object = this.encodePB("HeartBeatReq", sendMsg);

        console.log("humanboy_proto.HEART_BEAT_REQ==>>" + req);
        return this._sendMsg(req, humanboy_proto.CMD.HEART_BEAT_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleHeartBeatResponse(puf: any): void {
        let resp: humanboy_proto.HeartBeatResp = this.decodePB("HeartBeatResp", puf);
        if (resp) {
            console.log("humanboy_proto.HEART_BEAT_RESP==>>" + resp);
            cv.netWorkManager.onGameHeartBeat();
        }
    }

    /**
     * 加入房间请求
     * @param roomId 
     */
    requestJoinRoom(roomId: number): void {
        let sendMsg: object = { roomid: roomId };
        let req: object = this.encodePB("JoinRoomReq", sendMsg);
        console.log("humanboy_proto.JOIN_ROOM_REQ==>>" + req);

        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            this._sendMsg(req, humanboy_proto.CMD.JOIN_ROOM_REQ, roomId);
        } else {
            this.requestVerifyLogin();
        }
    }
    private _handleJoinRoomResponse(puf: any): void {
        let resp: humanboy_proto.JoinRoomResp = this.decodePB("JoinRoomResp", puf);
        if (resp) {
            console.log("humanboy_proto.JOIN_ROOM_RESP==>>" + resp);
            cv.roomManager.onJoinRoomResponse(resp);
        }
    }

    /**
     * 离开房间请求
     */
    requestLeaveRoom(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("LeaveRoomReq", sendMsg);

        console.log("humanboy_proto.LEAVE_ROOM_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.LEAVE_ROOM_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleLeaveRoomResponse(puf: any): void {
        let resp: humanboy_proto.LeaveRoomResp = this.decodePB("LeaveRoomResp", puf);
        if (resp) {
            console.log("humanboy_proto.LEAVE_ROOM_RESP==>>" + resp);
            cv.roomManager.onResponse_LeaveRoom(resp);
        }
    }
    private _handleLeaveRoomNotify(puf: any): void {
    }

    /**
     * 服务器踢人通知
     */
    private _handleKickNotify(puf: any): void {
        let noti: humanboy_proto.KickNotify = this.decodePB("KickNotify", puf);
        if (noti) {
            console.log("humanboy_proto.KICK_NOTIFY==>>" + noti);
            cv.MessageCenter.send("on_humanboy_kick_notify", noti);
        }
    }

    /**
     * 进房房间数据同步通知
     */
    private _handleGameDataSynNotify(puf: any): void {
        let noti: humanboy_proto.GameDataSynNotify = this.decodePB("GameDataSynNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.GAME_DATA_SYN==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().reset();
        humanboyDataMgr.getHumanboyRoom().tCurRoom = humanboy_proto.RoomParam.create(noti.param);
        humanboyDataMgr.getHumanboyRoom().u32RoomId = noti.param.roomid;
        humanboyDataMgr.getHumanboyRoom().u32Uid = cv.dataHandler.getUserData().u32Uid;
        humanboyDataMgr.getHumanboyRoom().llJackpotLeftMoney = noti.jackpotLeftMoney;

        humanboyDataMgr.getHumanboyRoom().bCanAuto = noti.canAuto;
        humanboyDataMgr.getHumanboyRoom().bCanAdvanceAuto = noti.canAdvanceAuto;
        humanboyDataMgr.getHumanboyRoom().eCurState = noti.curState;
        humanboyDataMgr.getHumanboyRoom().llLeftSeconds = noti.leftSeconds;
        humanboyDataMgr.getHumanboyRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        humanboyDataMgr.getHumanboyRoom().bShowDealerInvitation = noti.showMiddleUpDealerBtn;
        humanboyDataMgr.getHumanboyRoom().uTotalStockNum = noti.totalStockNum;
        humanboyDataMgr.getHumanboyRoom().llCoinUICritical = cv.StringTools.clientGoldByServer(noti.BetButtonLimitAmount);

        // 高级设置/续投
        do {
            // 对应房间级别的下注金额选项(没有默认拿房间参数里面的amountLevel值)
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vBetCoinOption);
            let betcoinoption_size: number = cv.StringTools.getArrayLength(noti.betCoinOption);
            if (betcoinoption_size > 0) {
                for (let i = 0; i < betcoinoption_size; ++i) {
                    humanboyDataMgr.getHumanboyRoom().vBetCoinOption.push(noti.betCoinOption[i]);
                }
            }
            else {
                let amountlevel_size: number = cv.StringTools.getArrayLength(noti.param.amountLevel);
                for (let i = 0; i < amountlevel_size; ++i) {
                    humanboyDataMgr.getHumanboyRoom().vBetCoinOption.push(noti.param.amountLevel[i]);
                }
            }

            // 续投
            humanboyDataMgr.getHumanboyRoom().eAutoLevel = noti.autoLevel;
            humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount = noti.usedAutoBetCount;
            humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount = noti.selectAutoBetCount;

            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vAutoBetCountList);
            let autobetcountlist_size: number = cv.StringTools.getArrayLength(noti.AutoBetCountList);
            for (let i = 0; i < autobetcountlist_size; ++i) {
                humanboyDataMgr.getHumanboyRoom().vAutoBetCountList.push(noti.AutoBetCountList[i]);
            }
        } while (0);

        // 下注区域金币信息
        do {
            let vOptionInfo: humanboy_proto.IBetOptionInfo[] = noti.optionInfo;
            for (let i = 0; i < vOptionInfo.length; ++i) {
                // 过滤有效选项
                let bet: humanboy_proto.IBetOptionInfo = vOptionInfo[i];
                if (bet.option === humanboy_proto.BetZoneOption.POS1
                    || bet.option == humanboy_proto.BetZoneOption.POS2
                    || bet.option == humanboy_proto.BetZoneOption.POS3
                    || bet.option == humanboy_proto.BetZoneOption.POS4
                    || bet.option == humanboy_proto.BetZoneOption.POS_LUCK_1
                    || bet.option == humanboy_proto.BetZoneOption.POS_LUCK_2
                    || bet.option == humanboy_proto.BetZoneOption.POS_LUCK_3
                    || bet.option == humanboy_proto.BetZoneOption.POS_LUCK_4
                    || bet.option == humanboy_proto.BetZoneOption.POS_LUCK_5
                    || bet.option == humanboy_proto.BetZoneOption.POS_LUCK_6) {

                    if (!humanboyDataMgr.getHumanboyRoom().mapZoneData.has(bet.option)) {
                        humanboyDataMgr.getHumanboyRoom().mapZoneData.add(bet.option, new HumanboyZoneData());
                    }

                    let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(bet.option);
                    zoneData.selfBet = bet.selfBet;
                    zoneData.totalBet = bet.totalBet;

                    // 所有人下的金额
                    cv.StringTools.clearArray(zoneData.vTotalBetDetail);
                    for (let j = 0; j < cv.StringTools.getArrayLength(bet.amount); ++j) {
                        zoneData.vTotalBetDetail.push(bet.amount[j]);
                    }

                    // 若该区域自己有下过注,则标记已下注
                    if (bet.selfBet > 0) {
                        humanboyDataMgr.getHumanboyRoom().bHasBetInCurRound = true;
                    }
                }
            }
        } while (0);

        // 庄家信息
        do {
            humanboyDataMgr.getHumanboyRoom().bOnDealerList = noti.onDealerList == 1;
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vDealerInfo);
            for (let i = 0; i < cv.StringTools.getArrayLength(noti.dealer); ++i) {
                let data: humanboy_proto.DealerPlayerInfo = humanboy_proto.DealerPlayerInfo.create(noti.dealer[i]);
                humanboyDataMgr.getHumanboyRoom().vDealerInfo.push(data);
            }
        } while (0);

        // 玩家信息 - 主界面8个人的游戏信息以及自己(自己永远是第一个，富豪1和神算子排第二和第三)
        do {
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vOtherPlayer);
            let vPlayers: any[] = noti.players;
            for (let i = 0; i < cv.StringTools.getArrayLength(vPlayers); ++i) {
                let player: humanboy_proto.GamePlayer = vPlayers[i];
                if (i == 0) {
                    if (player.uid === cv.dataHandler.getUserData().u32Uid) {
                        humanboyDataMgr.getHumanboyRoom().tSelfPlayer = player;
                    }
                    else {
                        console.error("HumanboySocket._HandleGameDataSynNotify, data error!!!, players[0] must be self!!!");
                    }
                }
                else {
                    humanboyDataMgr.getHumanboyRoom().vOtherPlayer.push(player);
                }
            }
        } while (0);

        // 胜负记录(按时间降序)
        do {
            for (let i = 0; i < cv.StringTools.getArrayLength(noti.optionResults); ++i) {
                let eOption: humanboy_proto.BetZoneOption = noti.optionResults[i].option;
                let vResult: number[] = noti.optionResults[i].results;
                let iLoseHand: number = noti.optionResults[i].loseHand;

                if (!humanboyDataMgr.getHumanboyRoom().mapZoneData.has(eOption)) {
                    humanboyDataMgr.getHumanboyRoom().mapZoneData.add(eOption, new HumanboyZoneData());
                }
                let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(eOption);
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
        if (noti.curState === humanboy_proto.RoundState.WAIT_NEXT_ROUND) {
            this._parseGameRoundEndNotify(humanboy_proto.GameRoundEndNotify.create(noti.cachedNotifyMsg));
        }

        // 标记房间同步消息
        cv.MessageCenter.send("on_humanboy_gamedata_syn_notify");

        cv.MessageCenter.send("onCalmDownMsg", noti);
    }

    /**
     * 解析单局结束相关数据
     */
    private _parseGameRoundEndNotify(noti: humanboy_proto.GameRoundEndNotify, isRoundEnd?: boolean /* = false */): void {

        humanboyDataMgr.getHumanboyRoom().change_points = noti.change_points;
        // 玩家手牌
        do {
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vPlayerHoleCard);
            for (let i = 0; i < noti.playerHoleCard.length; ++i) {
                let t: humanboy_proto.PlayerHoleCard = humanboy_proto.PlayerHoleCard.create(noti.playerHoleCard[i]);
                humanboyDataMgr.getHumanboyRoom().vPlayerHoleCard.push(t);
            }
        } while (0);

        // 主界面8个人的输赢情况和自己的结算输赢(如果在8个人里面只下发一个)
        do {
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vPlayerSettles);
            for (let i = 0; i < noti.playerSettle.length; ++i) {
                let t: humanboy_proto.PlayerSettle = humanboy_proto.PlayerSettle.create(noti.playerSettle[i]);
                humanboyDataMgr.getHumanboyRoom().vPlayerSettles.push(t);
            }

            // 把结算数据更新到玩家数据中
            humanboyDataMgr.getHumanboyRoom().updatePlayerSettleKeepWinCountAndCoin();
        } while (0);

        // 除主界面8个人输赢外其它玩家列表的输赢
        do {
            humanboyDataMgr.getHumanboyRoom().tOtherPlayerSettle = humanboy_proto.PlayerSettle.create(noti.otherPlayers);
        } while (0);

        // 更新区域输赢结果
        do {
            for (let i = 0; i < noti.optionResult.length; ++i) {
                let eOption: humanboy_proto.BetZoneOption = noti.optionResult[i].option;
                let iResult: number = noti.optionResult[i].result;
                let iLoseHand: number = noti.optionResult[i].loseHand;

                if (!humanboyDataMgr.getHumanboyRoom().mapZoneData.has(eOption)) {
                    humanboyDataMgr.getHumanboyRoom().mapZoneData.add(eOption, new HumanboyZoneData());
                }

                // 更新区域输赢结果
                let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(eOption);
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

        // jackpot
        do {
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vHitJackpotAward);
            for (let i = 0; i < noti.hitJackpotAward.length; ++i) {
                let t: humanboy_proto.HitJackpotAward = humanboy_proto.HitJackpotAward.create(noti.hitJackpotAward[i]);
                humanboyDataMgr.getHumanboyRoom().vHitJackpotAward.push(t);
            }
        } while (0);

        // 庄家信息
        cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vDealerInfo);
        for (let i = 0; i < noti.dealer.length; ++i) {
            let t: humanboy_proto.DealerPlayerInfo = humanboy_proto.DealerPlayerInfo.create(noti.dealer[i]);
            humanboyDataMgr.getHumanboyRoom().vDealerInfo.push(t);
        }

        // 庄家是否完胜(1 代表庄家完胜  2 代表庄家玩败)
        humanboyDataMgr.getHumanboyRoom().uDealerWinAll = noti.dealerWinAll;

        // 闲庄最大牌型(主要用于幸运一击动画等)
        humanboyDataMgr.getHumanboyRoom().eMaxLevel = noti.maxLevel;
        humanboyDataMgr.getHumanboyRoom().eMaxLevelOption = noti.maxLevelOption;

        // 非0代表系统即将维护
        humanboyDataMgr.getHumanboyRoom().nStopWorld = noti.stopWorld;
        humanboyDataMgr.getHumanboyRoom().idle_roomid = noti.idle_roomid;

        // 剩余的jackpot
        humanboyDataMgr.getHumanboyRoom().llJackpotLeftMoney = noti.jackpotLeftMoney;
    }

    /**
     * 游戏状态变更 - 新开一局
     */
    private _handleDealNotify(puf: any): void {
        let noti: humanboy_proto.DealNotify = this.decodePB("DealNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.DEAL_NOTIFY==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().resetRound();
        humanboyDataMgr.getHumanboyRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        humanboyDataMgr.getHumanboyRoom().llLeftSeconds = noti.leftSeconds;
        humanboyDataMgr.getHumanboyRoom().eCurState = humanboy_proto.RoundState.NEW_ROUND;
        humanboyDataMgr.getHumanboyRoom().bCanAuto = noti.canAuto;
        humanboyDataMgr.getHumanboyRoom().uTotalStockNum = noti.totalStockNum;
        humanboyDataMgr.getHumanboyRoom().bCanUpdateWorldServerGold = true;

        // 庄家信息
        cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vDealerInfo);
        for (let i = 0; i < noti.dealerInfo.length; ++i) {
            let t: humanboy_proto.DealerPlayerInfo = humanboy_proto.DealerPlayerInfo.create(noti.dealerInfo[i]);
            humanboyDataMgr.getHumanboyRoom().vDealerInfo.push(t);
        }

        // 玩家信息(主界面8个人的游戏信息以及自己(富豪1和神算子排第二和第三))
        do {
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vOtherPlayer);
            for (let i = 0; i < noti.players.length; ++i) {
                let player: humanboy_proto.GamePlayer = humanboy_proto.GamePlayer.create(noti.players[i])
                if (i == 0) {
                    if (player.uid === cv.dataHandler.getUserData().u32Uid) {
                        humanboyDataMgr.getHumanboyRoom().tSelfPlayer = player;
                    }
                    else {
                        console.error("HumanboySocket.CMD.DEAL_NOTIFY, data error!, players[0] must be self!");
                    }
                }
                else {
                    humanboyDataMgr.getHumanboyRoom().vOtherPlayer.push(player);
                }
            }
        } while (0);

        // 判断房间参数变更
        if (noti.changed) {
            humanboyDataMgr.getHumanboyRoom().tCurRoom = humanboy_proto.RoomParam.create(noti.param);
            cv.MessageCenter.send("on_humanboy_room_param_change_notify");
        }

        cv.MessageCenter.send("on_humanboy_deal_notify");
    }

    /**
     * 游戏状态变更 - 开始下注
     */
    private _handleStartBetNotify(puf: any): void {
        let noti: humanboy_proto.StartBetNotify = this.decodePB("StartBetNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.START_BET_NOTIFY==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        humanboyDataMgr.getHumanboyRoom().llLeftSeconds = noti.leftSeconds;
        humanboyDataMgr.getHumanboyRoom().eCurState = humanboy_proto.RoundState.BET;
        humanboyDataMgr.getHumanboyRoom().bCanUpdateWorldServerGold = true;

        cv.MessageCenter.send("on_humanboy_start_bet_notify");
    }

    /**
     * 游戏状态变更 - 一局结束
     */
    private _handleGameRoundEndNofity(puf: any): void {
        let noti: humanboy_proto.GameRoundEndNotify = this.decodePB("GameRoundEndNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.GAME_ROUND_END_NOTIFY ==>>" + noti);

        this._parseGameRoundEndNotify(noti, true);
        humanboyDataMgr.getHumanboyRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        humanboyDataMgr.getHumanboyRoom().llLeftSeconds = noti.leftSeconds;
        humanboyDataMgr.getHumanboyRoom().eCurState = humanboy_proto.RoundState.WAIT_NEXT_ROUND;
        humanboyDataMgr.getHumanboyRoom().bCanUpdateWorldServerGold = false;

        cv.MessageCenter.send("on_humanboy_game_round_end_notify");
    }

    /**
     * 游戏状态变更 - 即将开始(humanboy_proto.WAIT_NEXT_ROUND2)
     */
    private _handleGameWillStartNotify(puf: any): void {
        let noti: humanboy_proto.GameWillStartNotify = this.decodePB("GameWillStartNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.GAME_WILL_START_NOTIFY ==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().llNextRoundEndStamp = noti.nextRoundEndStamp;
        humanboyDataMgr.getHumanboyRoom().llLeftSeconds = noti.leftSeconds;
        humanboyDataMgr.getHumanboyRoom().eCurState = noti.roundState;
        humanboyDataMgr.getHumanboyRoom().bShowDealerInvitation = noti.showMiddleUpDealerBtn;
        humanboyDataMgr.getHumanboyRoom().clearMapZoneData(false);
        humanboyDataMgr.getHumanboyRoom().bCanUpdateWorldServerGold = true;

        cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vDealerInfo);
        for (let i = 0; i < noti.dealer.length; ++i) {
            let t: humanboy_proto.DealerPlayerInfo = humanboy_proto.DealerPlayerInfo.create(noti.dealer[i]);
            humanboyDataMgr.getHumanboyRoom().vDealerInfo.push(t);
        }

        cv.MessageCenter.send("on_humanboy_willstart_notify", noti.surplusStockNum);
    }

    /**
     * 请求下注
     */
    requestBet(betOption: humanboy_proto.BetZoneOption, betAmount: number): void {
        let detail: humanboy_proto.BetDetail = humanboy_proto.BetDetail.create();
        detail.option = betOption;
        detail.betAmount = betAmount;

        let sendMsg: object = { detail: detail };
        let req: object = this.encodePB("BetReq", sendMsg);

        console.log("humanboy_proto.BET_REQ ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.BET_REQ, cv.roomManager.getCurrentRoomID());
    }

    private _handleBetResponse(puf: any): void {
        let resp: humanboy_proto.BetResp = this.decodePB("BetResp", puf);
        if (!resp) return;

        console.log("humanboy_proto.BET_RESP==>>" + resp);

        this._postError(resp.code);
        if( resp.code == humanboy_proto.ErrorCode.IN_CALM_DOWN){
            cv.MessageCenter.send("onCalmDownMsg", resp);  
        }
    }

    private _handleBetNotify(puf: any): void {
        let noti: humanboy_proto.BetNotify = this.decodePB("BetNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.BET_NOTIFY==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().updatePlayerCoin(noti.uid, noti.curCoin);
        humanboyDataMgr.getHumanboyRoom().updateAreaBet(noti);
        humanboyDataMgr.getHumanboyRoom().setCurOneBet(noti.uid, humanboy_proto.BetDetail.create(noti.detail));
        if (noti.uid === cv.dataHandler.getUserData().u32Uid) {
            humanboyDataMgr.getHumanboyRoom().bHasBetInCurRound = true;
        }
        cv.MessageCenter.send("on_humanboy_bet_notify");
    }

    /**
     * // 开始结算通知(结束下注)
     */
    private _handleEndBetNotify(puf: any): void {
        let noti: humanboy_proto.StartSettlementNotify = this.decodePB("StartSettlementNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.START_SETTLEMENT_NOTIFY==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().bCanUpdateWorldServerGold = false;
    }

    /**
     * 房间趋势数据请求
     */
    requestTrend(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("TrendReq", sendMsg);

        console.log("humanboy_proto.ROOM_TREND_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.ROOM_TREND_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleTrendResponse(puf: any): void {
        let resp: humanboy_proto.TrendResp = this.decodePB("TrendResp", puf);
        if (resp) {
            console.log("humanboy_proto.ROOM_TREND_RSP==>>" + resp);

            if (resp.code === humanboy_proto.ErrorCode.OK) {
                let humanboyRoomData: HumanboyRoomData = humanboyDataMgr.getHumanboyRoom();
                cv.StringTools.clearArray(humanboyRoomData.TrendOption);
                humanboyRoomData.handLevelStatistics = humanboy_proto.RoomTrendLevelStatistics.create(resp.handLevelStatistics);

                let vTrendData: any = resp.trendOption;
                for (let i = 0; i < cv.StringTools.getArrayLength(vTrendData); ++i) {
                    let trend: humanboy_proto.RoomTrendOption = vTrendData[i];
                    humanboyRoomData.TrendOption.push(trend);
                }

                cv.MessageCenter.send("on_humanboy_trend_notify");
            }
            else {
                this._toastError(resp.code);
            }
        }
    }
    private _handleTrendNotify(puf: any): void {
    }

    /**
     *  玩家列表请求
     */
    requestPlayerList(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("PlayerListReq", sendMsg);

        console.log("humanboy_proto.PLAYER_LIST_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.PLAYER_LIST_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handlePlayerListResponse(puf: any): void {
        let resp: humanboy_proto.PlayerListResp = this.decodePB("PlayerListResp", puf);
        if (resp) {
            let humanboyRoomData: HumanboyRoomData = humanboyDataMgr.getHumanboyRoom();
            cv.StringTools.clearArray(humanboyRoomData.gamePlayerList);
            humanboyRoomData.brdzplayerNum = resp.playerNum;

            let vGamePlayers: any[] = resp.gamePlayers;
            for (let i = 0; i < cv.StringTools.getArrayLength(vGamePlayers); ++i) {
                let player: humanboy_proto.GamePlayer = vGamePlayers[i];
                humanboyRoomData.gamePlayerList.push(player);
            }

            cv.MessageCenter.send("on_update_humanboy_playerlist_notify");
        }
    }

    /**
     * 请求上庄列表
     */
    requestDealerList(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("DealerListReq", sendMsg);

        console.log("humanboy_proto.DEALER_LIST_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.DEALER_LIST_REQ, cv.roomManager.getCurrentRoomID());
    }

    /**
     * 请求更新上庄列表
     */
    requestUpdateDealerList(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("DealerListReq", sendMsg);

        console.log("humanboy_proto.UPDATE_DEALER_LIST_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.UPDATE_DEALER_LIST_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleDealerList(puf: any): void {
        let resp: humanboy_proto.DealerListResp = this.decodePB("DealerListResp", puf);
        if (!resp) return;

        console.log("humanboy_proto.DEALER_LIST_RSP==>>" + resp);

        this._postError(resp.code);
        if (resp.code === humanboy_proto.ErrorCode.OK) {
            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vDealerWatingList);
            for (let i = 0; i < resp.waitList.length; ++i) {
                let t: humanboy_proto.DealerPlayerInfo = humanboy_proto.DealerPlayerInfo.create(resp.waitList[i]);
                humanboyDataMgr.getHumanboyRoom().vDealerWatingList.push(t);
            }

            cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vDealerCandidateList);
            for (let i = 0; i < resp.dealerList.length; ++i) {
                let t: humanboy_proto.DealerPlayerInfo = humanboy_proto.DealerPlayerInfo.create(resp.dealerList[i]);
                humanboyDataMgr.getHumanboyRoom().vDealerCandidateList.push(t);
            }
            cv.MessageCenter.send("on_humanboy_dealer_list");
        }
    }

    /**
     * 请求可购买的股份数量
     */
    requestBuyStockNum(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("GetBuyStockNumReq", sendMsg);

        console.log("humanboy_proto.GET_BUY_STOCK_NUM_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.GET_BUY_STOCK_NUM_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleBuyStockNum(puf: any): void {
        let resp: humanboy_proto.GetBuyStockNumResp = this.decodePB("GetBuyStockNumResp", puf);
        if (!resp) return;

        console.log("humanboy_proto.GET_BUY_STOCK_NUM_RSP==>>" + resp);

        this._postError(resp.code);
        if (resp.code === humanboy_proto.ErrorCode.OK) {
            humanboyDataMgr.getHumanboyRoom().uCanBuyStockNum = resp.stockNum;
        }
    }

    /**
     * 请求上庄
     * @param uBuyStockNum 
     */
    requestUpDealer(uBuyStockNum: number): void {
        let sendMsg: object = { buyStockNum: uBuyStockNum };
        let req: object = this.encodePB("UpDealerReq", sendMsg);

        console.log("humanboy_proto.UP_DEALER_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.UP_DEALER_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleUpDealer(puf: any): void {
        let resp: humanboy_proto.UpDealerResp = this.decodePB("UpDealerResp", puf);
        if (!resp) return;

        console.log("humanboy_proto.UP_DEALER_RSP==>>" + resp);

        this._postError(resp.code);
        if (resp.code === humanboy_proto.ErrorCode.OK) {
            cv.MessageCenter.send("on_humanboy_dealer_up", resp.buyStockNum);
        }
    }
    private _handleUpDealerNotify(puf: any): void {
        let noti: humanboy_proto.UpDealerNotify = this.decodePB("UpDealerNotify", puf);
        if (!noti) return;
        if (noti.uid === cv.dataHandler.getUserData().u32Uid) {
            humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin = noti.curCoin;
            humanboyDataMgr.getHumanboyRoom().bOnDealerList = true;
        }

        cv.MessageCenter.send("on_humanboy_dealer_up_notify", noti.uid);
    }
    private _handleKickDealerApplyNotify(puf: any): void {
        let noti: humanboy_proto.KickDealerApplyNotify = this.decodePB("KickDealerApplyNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.KICK_DEALER_APPLY_NOTIFY==>>" + noti);

        cv.MessageCenter.send("on_humanboy_kickdealerapply_notify", noti.reason);
    }

    /**
     * 请求取消等待队列
     */
    requestCancelWait(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("CancelWaitReq", sendMsg);

        console.log("humanboy_proto.CANCEL_WAIT_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.CANCEL_WAIT_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleCancelWait(puf: any): void {
        let noti: humanboy_proto.CancelWaitResp = this.decodePB("CancelWaitResp", puf);
        if (!noti) return;

        console.log("humanboy_proto.CANCEL_WAIT_RSP==>>" + noti);

        this._postError(noti.code);
        if (noti.code === humanboy_proto.ErrorCode.OK) {
            cv.MessageCenter.send("on_humanboy_dealer_cancel_wait");
        }
    }

    /**
     * 请求下庄
     */
    requestDownDealer(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("DownDealerReq", sendMsg);

        console.log("humanboy_proto.DOWN_DEALER_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.DOWN_DEALER_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleDownDealer(puf: any): void {
        let resp: humanboy_proto.DownDealerResp = this.decodePB("DownDealerResp", puf);
        if (!resp) return;

        console.log("humanboy_proto.DOWN_DEALER_RSP==>>" + resp);

        this._postError(resp.code);
        humanboyDataMgr.getHumanboyRoom().tDownDealerResp = resp;
        if (resp.code === humanboy_proto.ErrorCode.OK) {
            cv.MessageCenter.send("on_humanboy_dealer_down", resp.doNow);
        }
    }
    private _handleDownDealerNotify(puf: any): void {
        let noti: humanboy_proto.DownDealerNotify = this.decodePB("DownDealerNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.DOWN_DEALER_NOTIFY==>>" + noti);

        humanboyDataMgr.getHumanboyRoom().tDownDealerNotify = noti;
        if (noti.uid === cv.dataHandler.getUserData().u32Uid) {
            humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin = noti.curCoin;
            humanboyDataMgr.getHumanboyRoom().bOnDealerList = false;
        }

        cv.MessageCenter.send("on_humanboy_dealer_down_notify");
    }

    /**
     * 请求 JP 数据
     * @param udeskType 
     */
    requestJackpotData(udeskType: number): void {

        let sendMsg: object = { roomType: udeskType };
        let req: object = this.encodePB("JackpotDataReq", sendMsg);
        this._sendMsg(req, humanboy_proto.CMD.JACKPOT_DATA_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleJackpotData(puf: any): void {
        let resp: humanboy_proto.JackpotDataResp = this.decodePB("JackpotDataResp", puf);
        if (resp.code == humanboy_proto.ErrorCode.OK) {
            humanboyDataMgr.getHumanboyRoom().jackpotData = humanboy_proto.JackpotDataInfo.create(resp.data); cv.MessageCenter.send("on_humanboy_jackpot_notify");
        }
        else {
            this._toastError(resp.code);
        }
    }

    /**
     * 请求奖励记录
     * @param udeskType 
     */
    requestRecordData(udeskType: number): void {

        let sendMsg: object = { roomType: udeskType };
        let req: object = this.encodePB("JackpotAwardListReq", sendMsg);
        this._sendMsg(req, humanboy_proto.CMD.JACKPOT_AWARD_LIST_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleRecordData(puf: any): void {
        let resp: humanboy_proto.JackpotAwardListResp = this.decodePB("JackpotAwardListResp", puf);
        if (!resp) return;

        humanboyDataMgr.getHumanboyRoom().lastAwardData = [];
        if (resp.code == humanboy_proto.ErrorCode.OK) {
            humanboyDataMgr.getHumanboyRoom().luckyOne = humanboy_proto.AwardData.create(resp.luckyOne);
            if (resp.luckyOne.amount > 0) {
                humanboyDataMgr.getHumanboyRoom().lastAwardData.push(humanboy_proto.AwardData.create(resp.luckyOne));
            }

            let recordData = resp.lastData;
            for (let i = 0; i < recordData.length; i++) {
                let t: humanboy_proto.AwardData = humanboy_proto.AwardData.create(recordData[i]);
                humanboyDataMgr.getHumanboyRoom().lastAwardData.push(t);
            }

            cv.MessageCenter.send("on_humanboy_record_notify");
        }
    }

    /**
     * 续投请求
     */
    requestAutoBet(): void {
        let sendMsg: object = {};
        let req: object = this.encodePB("AutoBetReq", sendMsg);

        console.log("humanboy_proto.AUTO_BET_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAutoBetResponse(puf: any): void {
        let resp: humanboy_proto.AutoBetResp = this.decodePB("AutoBetResp", puf);
        if (!resp) return;

        console.log("humanboy_proto.AUTO_BET_RESP==>>" + resp);

        this._postError(resp.code);
        humanboyDataMgr.getHumanboyRoom().bCanAuto = resp.canAuto;
        cv.MessageCenter.send("on_humanboy_auto_bet");

        if( resp.code == humanboy_proto.ErrorCode.IN_CALM_DOWN){
            cv.MessageCenter.send("onCalmDownMsg", resp);  
        }
    }
    private _handleMergeAutoBetNotify(puf: any): void {
        let noti: humanboy_proto.MergeAutoBetNotify = this.decodePB("MergeAutoBetNotify", puf);
        if (!noti) return;

        console.log("humanboy_proto.MERGE_AUTO_BET_NOTIFY==>>" + noti);
        for (let i = 0; i < noti.notify.length; ++i) {
            let oneBetNotify: humanboy_proto.BetNotify = new humanboy_proto.BetNotify(noti.notify[i]);
            humanboyDataMgr.getHumanboyRoom().updatePlayerCoin(oneBetNotify.uid, oneBetNotify.curCoin);
            humanboyDataMgr.getHumanboyRoom().updateAreaBet(oneBetNotify);
            humanboyDataMgr.getHumanboyRoom().setCurOneBet(oneBetNotify.uid, new humanboy_proto.BetDetail(oneBetNotify.detail));
            if (oneBetNotify.uid === cv.dataHandler.getUserData().u32Uid) {
                humanboyDataMgr.getHumanboyRoom().bHasBetInCurRound = true;
            }
            cv.MessageCenter.send("on_humanboy_merge_auto_bet_act", noti.notify.length);
        }
        cv.MessageCenter.send("on_humanboy_merge_auto_bet_end", noti.notify.length);
    }

    /**
     * 请求自定义下注金额选项、续投按钮级别
     */
    reqSetGameOption(vAmountLevel: number[], autoLevel: humanboy_proto.AutoBetLevel): void {
        let betCoinOption: number[] = [];
        cv.StringTools.deepCopy(vAmountLevel, betCoinOption);
        let sendMsg: object = { autoLevel: autoLevel, betCoinOption: betCoinOption };
        let req: humanboy_proto.SetGameOptionReq = this.encodePB("SetGameOptionReq", sendMsg);

        console.log("humanboy_proto.SET_GAME_OPTION_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.SET_GAME_OPTION_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleSetGameOptionResponse(puf: any) {
        let resp: humanboy_proto.SetGameOptionResp = this.decodePB("SetGameOptionResp", puf);
        if (resp) {
            console.log("humanboy_proto.SET_GAME_OPTION_RSP==>>" + resp);
            this._postError(resp.code);

            if (resp.code === humanboy_proto.ErrorCode.OK) {
                humanboyDataMgr.getHumanboyRoom().eAutoLevel = resp.autoLevel;
                cv.StringTools.clearArray(humanboyDataMgr.getHumanboyRoom().vBetCoinOption);

                for (let i = 0; i < resp.betCoinOption.length; ++i) {
                    humanboyDataMgr.getHumanboyRoom().vBetCoinOption.push(resp.betCoinOption[i]);
                }
                cv.MessageCenter.send("on_humanboy_bet_amount_level_change");
            }
        }
    }

    /**
     * 请求设置高级续投次数
     */
    reqAdvanceAutoBetSet(count: number): void {
        let sendMsg: object = { count: count };
        let req: humanboy_proto.AdvanceAutoBetSetReq = this.encodePB("AdvanceAutoBetSetReq", sendMsg);

        console.log("humanboy_proto.ADVANCE_AUTO_BET_SET_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.ADVANCE_AUTO_BET_SET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetSetResponse(puf: any): void {
        let resp: humanboy_proto.AdvanceAutoBetSetRsp = this.decodePB("AdvanceAutoBetSetRsp", puf);
        if (resp) {
            console.log("humanboy_proto.ADVANCE_AUTO_BET_SET_RSP==>>" + resp);
            this._postError(resp.code);

            if (resp.code === humanboy_proto.ErrorCode.OK) {
                humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount = 0;
                humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount = resp.count;
                cv.MessageCenter.send("on_humanboy_advance_autobet_set");
            }

            if( resp.code == humanboy_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", resp);  
            }
        }
    }

    /**
     * 请求高级续投
     */
    reqAdvanceAutoBet(): void {
        let sendMsg: object = {};
        let req: humanboy_proto.AdvanceAutoBetReq = this.encodePB("AdvanceAutoBetReq", sendMsg);

        console.log("humanboy_proto.ADVANCE_AUTO_BET_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetResponse(puf: any): void {
        let resp: humanboy_proto.AdvanceAutoBetRsp = this.decodePB("AdvanceAutoBetRsp", puf);
        if (resp) {
            console.log("humanboy_proto.ADVANCE_AUTO_BET_RSP==>>" + resp);

            if (resp.code === humanboy_proto.ErrorCode.OK) {
                humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount = resp.usedAutoBetCount;
            }

            if( resp.code == humanboy_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", resp);  
            }else{
                cv.MessageCenter.send("on_humanboy_advance_autobet", resp.code);
            }
        }
    }
    
    /**
     * 请求取消高级续投返回
     */
    reqCancelAdvanceAutoBet(): void {
        let sendMsg: object = {};
        let req: humanboy_proto.CancelAdvanceAutoBetReq = this.encodePB("CancelAdvanceAutoBetReq", sendMsg);

        console.log("humanboy_proto.CANCEL_ADVANCE_AUTO_BET_REQ==>>" + req);
        this._sendMsg(req, humanboy_proto.CMD.CANCEL_ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleCancelAdvanceAutoBetResponse(puf: any): void {
        let resp: humanboy_proto.CancelAdvanceAutoBetRsp = this.decodePB("CancelAdvanceAutoBetRsp", puf);
        if (resp) {
            console.log("humanboy_proto.CANCEL_ADVANCE_AUTO_BET_RSP==>>" + resp);

            this._postError(resp.code);
            if (resp.code === humanboy_proto.ErrorCode.OK) {
                humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount = 0;
                humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount = 0;
                cv.MessageCenter.send("on_humanboy_advance_autobet_cancel", resp.is_manual);
            }
        }
    }
}
