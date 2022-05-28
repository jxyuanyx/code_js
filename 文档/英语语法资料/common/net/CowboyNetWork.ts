import pb_cowboy = require("./../../../Script/common/pb/cowboy");
import cowboy_proto = pb_cowboy.cowboy_proto;

import cv from "../../components/lobby/cv";
import cb from "../../components/game/cowboy/cb";
import { CowboyPlayer, BetDetail, TrendData, DailyStat, TrendRoad, PlayerSettle, CowboyZoneData } from "../../components/game/cowboy/CowboyRoomData";
import { CardItem } from "../../components/game/dzPoker/data/RoomData";
import { NetWorkProxy } from "./NetWorkProxy";
import { RankData } from "../../data/userData";
import { PushNoticeData, PushNoticeType, PushNotice } from "../prefab/PushNotice";

const { ccclass, property } = cc._decorator;
@ccclass
export class CowboyNetWork extends NetWorkProxy {
    public static instance: CowboyNetWork;

    public static getInstance(): CowboyNetWork {
        if (!this.instance) {
            this.instance = new CowboyNetWork();
            this.instance.init();
        }
        return this.instance;
    }
    public sendGameMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number = cv.Enum.SeverType.SeverType_Game, ServerId: number = cv.Enum.GameId.CowBoy): boolean {
        return this.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
    }
    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.CowBoy);
    }
    public init() {
        this.registerMsg(cb.Enum.MSGID.HEART_BEAT_RESP, this.responseHeartBeat.bind(this));
        this.registerMsg(cb.Enum.MSGID.LOGIN_GAME_RESP, this.responseLoginServer.bind(this));
        this.registerMsg(cb.Enum.MSGID.JOIN_ROOM_RESP, this.JoinRoomResponse.bind(this));

        this.registerMsg(cb.Enum.MSGID.PLAYER_LIST_RESP, this.HandlePlayerListResponse.bind(this));
        this.registerMsg(cb.Enum.MSGID.BET_RESP, this.HandleBetResponse.bind(this));
        this.registerMsg(cb.Enum.MSGID.BET_NOTIFY, this.HandleBetNotify.bind(this));
        this.registerMsg(cb.Enum.MSGID.AUTO_BET_RESP, this.HandleAutoBetResponse.bind(this));
        this.registerMsg(cb.Enum.MSGID.MERGE_AUTO_BET_NOTIFY, this.HandleMergeAutoBetNotify.bind(this));
        this.registerMsg(cb.Enum.MSGID.ROOM_TREND_RSP, this.HandleTrendResponse.bind(this));
        this.registerMsg(cb.Enum.MSGID.ROOM_TREND_NOTICE, this.HandleTrendNotify.bind(this));

        this.registerMsg(cb.Enum.MSGID.DEAL_NOTIFY, this.HandleDealNotify.bind(this));
        this.registerMsg(cb.Enum.MSGID.START_BET_NOTIFY, this.HandleStartBetNotify.bind(this));
        this.registerMsg(cb.Enum.MSGID.GAME_ROUND_END_NOTIFY, this.HandleGameRoundEndNofity.bind(this));
        this.registerMsg(cb.Enum.MSGID.KICK_NOTIFY, this.HandleKickNotify.bind(this));
        this.registerMsg(cb.Enum.MSGID.GAME_DATA_SYN, this.HandleGameDataSynNotify.bind(this));

        this.registerMsg(cb.Enum.MSGID.LEAVE_ROOM_RESP, this.HandleLeaveRoomResp.bind(this));
        this.registerMsg(cb.Enum.MSGID.START_SETTLEMENT_NOTIFY, this._HandleEndBetNotify.bind(this));

        this.registerMsg(cowboy_proto.CMD.SET_GAME_OPTION_RSP, this._handleSetGameOptionResponse.bind(this));			            // 自定义下注金额选项、续投按钮级别
        this.registerMsg(cowboy_proto.CMD.ADVANCE_AUTO_BET_SET_RSP, this._handleAdvanceAutoBetSetResponse.bind(this));			    // 设置高级续投次数
        this.registerMsg(cowboy_proto.CMD.ADVANCE_AUTO_BET_RSP, this._handleAdvanceAutoBetResponse.bind(this));			            // 高级续投
        this.registerMsg(cowboy_proto.CMD.CANCEL_ADVANCE_AUTO_BET_RSP, this._handleCancelAdvanceAutoBetResponse.bind(this));        // 取消高级续投

    }

    PostCowboyError(i32Error: number): void {
        if (i32Error == cb.Enum.ErrorCode.OK || i32Error == cowboy_proto.ErrorCode.IN_CALM_DOWN) return;
        cv.MessageCenter.send("on_cowboy_server_error", i32Error);
    }

    public requestLoginServer() {
        console.log("====> cowboy websocket was opened.");
        let user_token = cv.dataHandler.getUserData().user_token;
        let Version = cv.config.GET_CLIENT_VERSION();
        let LoginModule = cv.cowboyPB.lookupType("LoginReq");
        if (LoginModule) {
            let sendMsg: object = { token: user_token, version: Version, client_type: cv.config.GET_CLIENT_TYPE() };
            let pbbuf = LoginModule.encode(sendMsg).finish();
            console.log(pbbuf);

            this.sendGameMsg(pbbuf, cb.Enum.MSGID.LOGIN_GAME_REQ, 0);
        }
    }
    public responseLoginServer(puf) {
        let data = this.decodePB("LoginResp", puf);
        if (data) {
            let error = data.code;

            if (error == cb.Enum.ErrorCode.OK) {
                if (data.roomid > 0) {
                    cv.roomManager.setCurrentRoomID(data.roomid);
                }
                cv.netWorkManager.OnCowboyServerLogin();
            }
            else {
                cv.SwitchLoadingView.hide();
                cv.ToastGameError(cv.Enum.GameId.CowBoy, error);
            }
        }
    }

    public requestHeartBeat(): boolean {
        let RequestHeartBeat = cv.cowboyPB.lookupType("HeartBeatReq");
        if (RequestHeartBeat) {
            let sendMsg = { uid: cv.dataHandler.getUserData().u32Uid };
            let pbbuf = RequestHeartBeat.encode(sendMsg).finish();
            return this.sendGameMsg(pbbuf, cb.Enum.MSGID.HEART_BEAT_REQ, 0);
        }
    }

    public responseHeartBeat(puf) {
        let tempModule = cv.cowboyPB.lookupType("HeartBeatResp");
        if (tempModule) {
            let recvMsg = new Uint8Array(puf)
            let result = tempModule.decode(recvMsg);
            if (result != null) {
                let error = result.uid;
                console.log("uid::.>" + error);
                cv.netWorkManager.onGameHeartBeat();
            }
        }
    }

    public RequestJoinRoom(roomId: number) {
        let sendMsg = { roomid: roomId };
        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            let pbbuf = this.encodePB("JoinRoomReq", sendMsg);
            this.sendGameMsg(pbbuf, cb.Enum.MSGID.JOIN_ROOM_REQ, roomId);
        } else {
            this.requestLoginServer();
        }
    }

    public JoinRoomResponse(puf: any) {
        let msg = this.decodePB("JoinRoomResp", puf);
        if (msg) {
            cv.roomManager.onJoinRoomResponse(msg);
        }
    }

    public RequestPlayerList() {
        let sendMsg = {};
        let pbbuf = this.encodePB("PlayerListReq", sendMsg);
        this.sendGameMsg(pbbuf, cb.Enum.MSGID.PLAYER_LIST_REQ, cv.roomManager.getCurrentRoomID());
    }

    public HandlePlayerListResponse(puf: any) {
        let msg = this.decodePB("PlayerListResp", puf);
        if (msg) {
            cv.StringTools.deepCopy(msg.self, cb.getCowboyRoom().playerself);
            cb.getCowboyRoom().gamePlayerList = [];
            cb.getCowboyRoom().dzplayerNum = msg.playerNum;
            let gamePlayers = msg.gamePlayers;
            //SEUInt32 winCount = 0;
            //int index = 0;
            //cowboy_proto::GamePlayer playerData;
            //for (int i = 0; i < gamePlayers.size(); i++)
            //{
            //	auto player = gamePlayers[i];
            //	if (winCount < player.wincount())
            //	{
            //		winCount = player.wincount();
            //		index = i;
            //	}
            //}
            //if (gamePlayers.size() > 0)
            //{
            //	cowboy_proto::GamePlayer ssz;
            //	ssz.CopyFrom(gamePlayers[index]);
            //	cb.getCowboyRoom().gamePlayerList.push_back(ssz);
            //}

            let len = gamePlayers.length;
            for (let i = 0; i < len; i++) {
                let player = gamePlayers[i];
                let playerData: CowboyPlayer = new CowboyPlayer();
                cv.StringTools.deepCopy(player, playerData);
                cb.getCowboyRoom().gamePlayerList.push(playerData);
            }

            cv.MessageCenter.send("on_update_playerlist_notify");
        }
    }

    public RequestBet(betOption: number, betAmount: number) {
        let detail = new BetDetail();
        detail.option = betOption;
        detail.betAmount = betAmount;

        let sendMsg = { detail: detail };
        let pbbuf = this.encodePB("BetReq", sendMsg);
        this.sendGameMsg(pbbuf, cb.Enum.MSGID.BET_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleBetResponse(pbbuf: any) {
        let msg = this.decodePB("BetResp", pbbuf);
        if (msg) {
            this.PostCowboyError(msg.code);
            if( msg.code == cowboy_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", msg);  
            }
        }
    }

    HandleBetNotify(pbbuf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("BetNotify", pbbuf);
        if (msg) {
            cb.getCowboyRoom().updatePlayerCoin(msg.uid, msg.curCoin);
            cb.getCowboyRoom().updateZoneBet(msg.uid, msg.detail.option, msg.selfBet, msg.totalBet);
            cb.getCowboyRoom().updateCurOneBet(msg.uid, msg.detail);
            if (msg.uid === cv.dataHandler.getUserData().u32Uid) {
                cb.getCowboyRoom().hasBetInCurRound = true;
            }
            cv.MessageCenter.send("on_cowboy_bet_notify");
        }
    }

    public RequestAutoBet() {
        let sendMsg = {};
        let pbbuf = this.encodePB("AutoBetReq", sendMsg);
        this.sendGameMsg(pbbuf, cb.Enum.MSGID.AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleAutoBetResponse(pbbuf: any) {
        let msg = this.decodePB("AutoBetResp", pbbuf);
        if (msg) {
            this.PostCowboyError(msg.code);
            cb.getCowboyRoom().canAuto = msg.canAuto;
            cv.MessageCenter.send("on_cowboy_auto_bet_succ");
            if( msg.code == cowboy_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", msg);  
            }
            
        }
    }

    HandleMergeAutoBetNotify(pbbuf: any) {
        let msg = this.decodePB("MergeAutoBetNotify", pbbuf);
        if (msg) {
            let notifies = msg.notify;
            let len = notifies.length;
            for (let i = 0; i < len; i++) {
                let oneBetNotify = notifies[i];
                cb.getCowboyRoom().updatePlayerCoin(oneBetNotify.uid, oneBetNotify.curCoin);
                cb.getCowboyRoom().updateZoneBet(oneBetNotify.uid, oneBetNotify.detail.option, oneBetNotify.selfBet, oneBetNotify.totalBet);
                cb.getCowboyRoom().updateCurOneBet(oneBetNotify.uid, oneBetNotify.detail);
                if (oneBetNotify.uid === cv.dataHandler.getUserData().u32Uid) {
                    cb.getCowboyRoom().hasBetInCurRound = true;
                }
                cv.MessageCenter.send("on_cowboy_auto_bet_notify");
            }
            cv.MessageCenter.send("on_cowboy_auto_bet_notify_handle_over", len);
        }
    }

    public RequestLeaveRoom() {
        let sendMsg = { roomuuid: 0 };
        let pbbuf = this.encodePB("LeaveRoomReq", sendMsg);
        this.sendGameMsg(pbbuf, cb.Enum.MSGID.LEAVE_ROOM_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleLeaveRoomResp(pbbuf: any) {
        let msg = this.decodePB("LeaveRoomResp", pbbuf);
        if (msg) {
            cv.roomManager.onResponse_LeaveRoom(msg);
        }
    }

    public RequestTrend() {
        let sendMsg = { roomuuid: 0 };
        let pbbuf = this.encodePB("RoomTrendReq", sendMsg);
        this.sendGameMsg(pbbuf, cb.Enum.MSGID.ROOM_TREND_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleTrendResponse(pbbuf: any) {
        let msg = this.decodePB("RoomTrendRsp", pbbuf);
        if (msg) {
            //code
        }
    }

    HandleTrendNotify(pbbuf: any) {
        let msg = this.decodePB("RoomTrendNotice", pbbuf);
        if (msg) {
            cb.getCowboyRoom().trendData = [];
            cb.getCowboyRoom().dailyStat = [];
            cb.getCowboyRoom().trendRoad = [];

            cb.getCowboyRoom().lastRow = msg.lastRow;
            cb.getCowboyRoom().lastCol = msg.lastCol;

            let trendData = msg.trend;
            let stats = msg.stats;
            let road = msg.road;
            let trendLen = trendData.length;
            for (let i = 0; i < trendLen; i++) {
                let trend = trendData[i];
                let tempTrend: TrendData = new TrendData();
                cv.StringTools.deepCopy(trend, tempTrend);
                cb.getCowboyRoom().trendData.push(tempTrend);
            }

            let statsLen = stats.length;
            for (let i = 0; i < statsLen; i++) {
                let stt = stats[i];
                let sttData: DailyStat = new DailyStat();
                cv.StringTools.deepCopy(stt, sttData);
                cb.getCowboyRoom().dailyStat.push(sttData);
            }

            let roadLen = road.length;
            for (let i = 0; i < roadLen; i++) {
                //列
                let tmp = road[i];
                let data: TrendRoad = new TrendRoad();
                cv.StringTools.deepCopy(tmp, data);
                cb.getCowboyRoom().trendRoad.push(data);
            }

            cv.MessageCenter.send("on_update_trend_notify");
        }
    }

    HandleDealNotify(pbbuf: any): void {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("DealNotify", pbbuf);
        if (msg) {
            cb.getCowboyRoom().ResetRound();
            cb.getCowboyRoom().nextRoundEndStamp = msg.nextRoundEndStamp;
            cb.getCowboyRoom().leftSeconds = msg.leftSeconds;
            cb.getCowboyRoom().curState = cb.Enum.RoundState.NEW_ROUND;
            cb.getCowboyRoom().canAuto = msg.canAuto;
            cb.getCowboyRoom().bCanUpdateWorldServerGold = true;

            // 更新第一张公共牌
            let cardItem: CardItem = new CardItem();
            cv.StringTools.deepCopy(msg.card, cardItem);
            cb.getCowboyRoom().publicCards.push(cardItem);

            // 玩家信息
            let players = msg.players;
            let playersLen = players.length;
            for (let i = 0; i < playersLen; i++) {
                let player = players[i];
                if (i == 0) {
                    if (player.uid == cv.dataHandler.getUserData().u32Uid) {
                        cb.getCowboyRoom().updateSelfPlayer(player);
                    }
                    else {
                        console.log("SocketHandler3::_HandleGameDataSynNotify, data error!!!, players[0] must be self!!!");
                    }
                }
                else {
                    cb.getCowboyRoom().addPlayer(player);
                }
            }

            // 胜负记录
            let results = msg.lastResult;
            let resultLen = results.length;
            for (let i = 0; i < resultLen; i++) {
                cb.getCowboyRoom().historyResults.push(results[i]);
            }

            // 判断房间参数变更
            if (msg.changed) {
                cv.StringTools.deepCopy(msg.param, cb.getCowboyRoom().pkRoomParam);
                cv.MessageCenter.send("on_cowboy_room_param_change_notify");
            }

            cv.MessageCenter.send("on_cowboy_deal_notify");
        }
    }

    HandleStartBetNotify(pbbuf: any): void {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("StartBetNotify", pbbuf);
        if (msg) {
            cb.getCowboyRoom().nextRoundEndStamp = msg.nextRoundEndStamp;
            cb.getCowboyRoom().leftSeconds = msg.leftSeconds;
            cb.getCowboyRoom().curState = cb.Enum.RoundState.BET;
            cb.getCowboyRoom().bCanUpdateWorldServerGold = true;

            cv.MessageCenter.send("on_cowboy_start_bet_notify");
        }
    }

    HandleGameRoundEndNofity(pbbuf: any): void {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg: cowboy_proto.GameRoundEndNotify = this.decodePB("GameRoundEndNotify", pbbuf);
        if (msg) {
            this.ParseGameRoundEndNotify(msg, true);
            cb.getCowboyRoom().nextRoundEndStamp = msg.nextRoundEndStamp;
            cb.getCowboyRoom().leftSeconds = msg.leftSeconds;
            cb.getCowboyRoom().curState = cb.Enum.RoundState.WAIT_NEXT_ROUND;
            cb.getCowboyRoom().isOpen = msg.openRoads;
            cb.getCowboyRoom().bCanUpdateWorldServerGold = false;

            cv.MessageCenter.send("on_cowboy_game_round_end_notify");
        }
    }

    ParseGameRoundEndNotify(noti: any/*GameRoundEndNotify*/, isRoundEnd?: boolean): void {
        isRoundEnd = isRoundEnd == true ? true : false;

        cb.getCowboyRoom().change_points = noti.change_points;
        // 玩家手牌
        cb.getCowboyRoom().redHandCards = [];
        cb.getCowboyRoom().blueHandCards = [];
        let playerHoleCard = noti.playerHoleCard;
        let cardLen = playerHoleCard.length;
        for (let i = 0; i < cardLen; i++) {
            let playerCard = playerHoleCard[i];
            let cards = playerCard.Cards;
            let cardsLen = cards.length;
            for (let j = 0; j < cardsLen; j++) {
                let cardItem: CardItem = new CardItem();
                cv.StringTools.deepCopy(cards[j], cardItem);
                if (playerCard.name == cb.Enum.RoleName.Red) {
                    cb.getCowboyRoom().redHandCards.push(cardItem);
                }
                else if (playerCard.name == cb.Enum.RoleName.Blue) {
                    cb.getCowboyRoom().blueHandCards.push(cardItem);
                }
            }
        }

        // 公共牌
        cb.getCowboyRoom().publicCards = [];
        let publicCards = noti.publicCards;
        let len = publicCards.length;
        for (let i = 0; i < len; i++) {
            let card = publicCards[i];
            let cardItem: CardItem = new CardItem();
            cv.StringTools.deepCopy(card, cardItem);
            cb.getCowboyRoom().publicCards.push(cardItem);
        }

        // 下注输赢情况
        cb.getCowboyRoom().playerSettles.clear();
        let playerSettles = noti.playerSettle;
        len = playerSettles.length;
        for (let i = 0; i < len; i++) {
            let playerSettle = playerSettles[i];
            let settle: PlayerSettle = new PlayerSettle();
            cv.StringTools.deepCopy(playerSettle, settle);

            cb.getCowboyRoom().playerSettles.add(playerSettle.uid, settle);
            cb.getCowboyRoom().updatePlayerKeepWinCount(playerSettle.uid, playerSettle.keepWinCount);
        }

        // 除主界面8个人输赢外其它玩家列表的输赢
        cb.getCowboyRoom().otherPlayersSettle.reset();
        cv.StringTools.deepCopy(noti.otherPlayers, cb.getCowboyRoom().otherPlayersSettle);

        // 哪几个区域选项赢的
        cb.getCowboyRoom().matchOption = [];
        let matchOption = noti.matchOption;
        len = matchOption.length;
        for (let i = 0; i < len; i++) {
            cb.getCowboyRoom().matchOption.push(matchOption[i]);
        }

        // 输赢结果
        let roundResult = noti.roundResult;
        cb.getCowboyRoom().result = roundResult.result;
        cb.getCowboyRoom().redLevel = roundResult.redLevel;
        cb.getCowboyRoom().blueLevel = roundResult.blueLevel;
        if (isRoundEnd) {
            if (cb.getCowboyRoom().result == 0) {
                cb.getCowboyRoom().historyResults.push(cb.Enum.BetZoneOption.EQUAL);
            }
            else if (cb.getCowboyRoom().result == 1) {
                cb.getCowboyRoom().historyResults.push(cb.Enum.BetZoneOption.RED_WIN);
            }
            else if (cb.getCowboyRoom().result == -1) {
                cb.getCowboyRoom().historyResults.push(cb.Enum.BetZoneOption.BLUE_WIN);
            }
            else {
                console.log("SocketHandler3::ParseGameRoundEndNotify, error result: %d", cb.getCowboyRoom().result);
            }

            // 更新本局区域输赢结果
            let mapZoneData = cb.getCowboyRoom().mapZoneData;
            let zoneDataLen = noti.optionResult.length;
            for (let i = 0; i < zoneDataLen; ++i) {
                let eOption = noti.optionResult[i].option;
                let iResult = noti.optionResult[i].result;
                let iLoseHand = noti.optionResult[i].loseHand;

                let mapValue = mapZoneData.get(eOption);
                if (!mapValue) {
                    mapZoneData.add(eOption, new CowboyZoneData());
                    mapValue = mapZoneData.get(eOption);
                }

                // 更新区域输赢结果
                mapValue.result = iResult;
                mapValue.luckLoseHand = iLoseHand;

                // 插入历史胜负记录(按时间降序)
                let vHistoryResults = mapValue.vHistoryResults;
                let maxHistoryResultsRetention = mapValue.maxHistoryResultsRetention;

                vHistoryResults.unshift(iResult);
                if (vHistoryResults.length > maxHistoryResultsRetention) {
                    vHistoryResults.splice(maxHistoryResultsRetention, vHistoryResults.length - maxHistoryResultsRetention);
                }
            }
        }


        // 哪五张牌赢的
        cb.getCowboyRoom().winCards = [];
        let winCards = roundResult.Cards;
        len = winCards.length;
        for (let i = 0; i < len; i++) {
            let card = winCards[i];
            let cardItem: CardItem = new CardItem();
            cv.StringTools.deepCopy(card, cardItem);
            cb.getCowboyRoom().winCards.push(cardItem);
        }

        // 非0代表系统即将维护
        cb.getCowboyRoom().stopWorld = noti.stopWorld;
        cb.getCowboyRoom().idle_roomid = noti.idle_roomid;
    }

    HandleKickNotify(pbbuf: any): void {
        let msg = this.decodePB("KickNotify", pbbuf);
        if (msg) {
            cv.MessageCenter.send("on_cowboy_kick_notify", msg);
        }
    }

    HandleGameDataSynNotify(pbbuf: any): void {
        cv.GameDataManager.tRoomData.m_bIsReconnectMode = false;
        let noti = this.decodePB("GameDataSynNotify", pbbuf);
        if (noti) {
            cb.getCowboyRoom().Reset();
            cb.getCowboyRoom().pkRoomParam = cowboy_proto.RoomParam.create(noti.param);
            cb.getCowboyRoom().u32RoomId = noti.param.roomid;
            cb.getCowboyRoom().u32Uid = cv.dataHandler.getUserData().u32Uid;
            cb.getCowboyRoom().isOpen = noti.openRoads;
            cb.getCowboyRoom().llCoinUICritical = cv.StringTools.clientGoldByServer(noti.BetButtonLimitAmount);

            // 高级设置/续投
            do {
                // 对应房间级别的下注金额选项(没有默认拿房间参数里面的amountLevel值)
                cv.StringTools.clearArray(cb.getCowboyRoom().vBetCoinOption);
                let betcoinoption_size: number = cv.StringTools.getArrayLength(noti.betCoinOption);
                if (betcoinoption_size > 0) {
                    for (let i = 0; i < betcoinoption_size; ++i) {
                        cb.getCowboyRoom().vBetCoinOption.push(noti.betCoinOption[i]);
                    }
                }
                else {
                    for (let i = 0; i < cv.StringTools.getArrayLength(noti.param.amountLevel); ++i) {
                        cb.getCowboyRoom().vBetCoinOption.push(noti.param.amountLevel[i]);
                    }
                }

                // 续投
                cb.getCowboyRoom().eAutoLevel = noti.autoLevel;
                cb.getCowboyRoom().iUsedAutoBetCount = noti.usedAutoBetCount;
                cb.getCowboyRoom().iSelectAutoBetCount = noti.selectAutoBetCount;
                cb.getCowboyRoom().canAdvanceAuto = noti.canAdvanceAuto;

                cv.StringTools.clearArray(cb.getCowboyRoom().vAutoBetCountList);
                for (let i = 0; i < cv.StringTools.getArrayLength(noti.AutoBetCountList); ++i) {
                    cb.getCowboyRoom().vAutoBetCountList.push(noti.AutoBetCountList[i]);
                }
            } while (0);

            // 已下注信息
            let optioninfo = noti.optionInfo;
            let len = optioninfo.length;
            for (let i = 0; i < len; i++) {
                let bet = optioninfo[i];
                // 过滤无效的选项
                if (bet.option == cb.Enum.BetZoneOption.BetZoneOption_DUMMY
                    || bet.option == cb.Enum.BetZoneOption.WIN_BEGIN
                    || bet.option == cb.Enum.BetZoneOption.WIN_END
                    || bet.option == cb.Enum.BetZoneOption.HOLE_BEGIN
                    || bet.option == cb.Enum.BetZoneOption.HOLE_END
                    || bet.option == cb.Enum.BetZoneOption.FIVE_BEGIN
                    || bet.option == cb.Enum.BetZoneOption.FIVE_END) {
                    continue;
                }
                cb.getCowboyRoom().selfZoneBet.add(bet.option, bet.selfBet);
                cb.getCowboyRoom().totalZoneBet.add(bet.option, bet.totalBet);

                // 所有人下的金额
                let betAmounts = bet.amount;
                let vecBetAmounts: number[] = [];
                let betAmountsLen = betAmounts.length;
                for (let j = 0; j < betAmountsLen; j++) {
                    vecBetAmounts.push(betAmounts[j]);
                }
                cb.getCowboyRoom().allZoneBet.add(bet.option, vecBetAmounts);

                // 若该区域自己有下过注,则标记已下注
                if (bet.selfBet > 0) {
                    cb.getCowboyRoom().hasBetInCurRound = true;
                }
            }

            cb.getCowboyRoom().nextRoundEndStamp = noti.nextRoundEndStamp;
            cb.getCowboyRoom().leftSeconds = noti.leftSeconds;
            cb.getCowboyRoom().curState = noti.curState;
            cb.getCowboyRoom().canAuto = noti.canAuto;

            // 玩家信息
            let players = noti.players;
            len = players.length;
            for (let i = 0; i < len; i++) {
                let player = players[i];
                if (i == 0) {
                    if (player.uid == cv.dataHandler.getUserData().u32Uid) {
                        cb.getCowboyRoom().updateSelfPlayer(player);
                    }
                    else {
                        console.log("SocketHandler3::_HandleGameDataSynNotify, data error!!!, players[0] must be self!!!");
                    }
                }
                else {
                    cb.getCowboyRoom().addPlayer(player);
                }
            }

            // 胜负记录
            cb.getCowboyRoom().historyResults = [];
            let results = noti.lastResult;
            len = results.length;

            for (let i = 0; i < len; i++) {
                cb.getCowboyRoom().historyResults.push(results[i]);
            }

            // 各个区域的胜负记录(按时间降序)

            let mapZoneData = cb.getCowboyRoom().mapZoneData;
            let resultLen = noti.optionResults.length;
            for (let i = 0; i < resultLen; ++i) {
                let eOption = noti.optionResults[i].option;
                let vResult = noti.optionResults[i].results;
                let iLoseHand = noti.optionResults[i].loseHand;

                let mapValue = mapZoneData.get(eOption);
                if (!mapValue) {
                    mapZoneData.add(eOption, new CowboyZoneData());
                    mapValue = mapZoneData.get(eOption);
                }
                mapValue.luckLoseHand = iLoseHand;

                let vHistoryResults = mapValue.vHistoryResults;
                let maxHistoryResultsRetention = mapValue.maxHistoryResultsRetention;

                vHistoryResults.splice(0, cv.StringTools.getArrayLength(vHistoryResults));
                cv.StringTools.deepCopy(vResult, vHistoryResults);

                if (vHistoryResults.length > maxHistoryResultsRetention) {
                    vHistoryResults.splice(maxHistoryResultsRetention, vHistoryResults.length - maxHistoryResultsRetention);
                }
            }

            // 公共牌
            let publicCards = noti.publicCards;
            len = publicCards.length;
            for (let i = 0; i < len; i++) {
                let card = publicCards[i];
                let cardItem: CardItem = new CardItem();
                cv.StringTools.deepCopy(card, cardItem);
                cb.getCowboyRoom().publicCards.push(cardItem);
            }

            // 单局已结束的重连
            if (noti.curState == cb.Enum.RoundState.WAIT_NEXT_ROUND) {
                this.ParseGameRoundEndNotify(noti.cachedNotifyMsg);
            }

            if (cv.config.getCurrentScene() == cv.Enum.SCENE.COWBOY_SCENE) {
                cv.MessageCenter.send("on_cowboy_gamedata_syn_notify");
            }

            //冷静状态
            cv.MessageCenter.send("onCalmDownMsg",noti);  
        }
    }

    _HandleEndBetNotify(pbbuf: any): void {
        let noti = this.decodePB("StartSettlementNotify", pbbuf);
        cb.getCowboyRoom().bCanUpdateWorldServerGold = false;
    }


    /**
     * 请求自定义下注金额选项、续投按钮级别
     */
    reqSetGameOption(vAmountLevel: number[], autoLevel: cowboy_proto.AutoBetLevel): void {
        let betCoinOption: number[] = [];
        cv.StringTools.deepCopy(vAmountLevel, betCoinOption);
        let sendMsg: object = { autoLevel: autoLevel, betCoinOption: betCoinOption };
        let req: cowboy_proto.SetGameOptionReq = this.encodePB("SetGameOptionReq", sendMsg);

        console.log("cowboy_proto.SET_GAME_OPTION_REQ==>>" + req);
        this.sendGameMsg(req, cowboy_proto.CMD.SET_GAME_OPTION_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleSetGameOptionResponse(puf: any) {
        let resp: cowboy_proto.SetGameOptionResp = this.decodePB("SetGameOptionResp", puf);
        if (resp) {
            console.log("cowboy_proto.SET_GAME_OPTION_RSP==>>" + resp);
            this.PostCowboyError(resp.code);

            if (resp.code === cowboy_proto.ErrorCode.OK) {
                cb.getCowboyRoom().eAutoLevel = resp.autoLevel;
                cv.StringTools.clearArray(cb.getCowboyRoom().vBetCoinOption);

                for (let i = 0; i < resp.betCoinOption.length; ++i) {
                    cb.getCowboyRoom().vBetCoinOption.push(resp.betCoinOption[i]);
                }
                cv.MessageCenter.send("on_cowboy_bet_amount_level_change");
            }
        }
    }

    /**
     * 请求设置高级续投次数
     */
    reqAdvanceAutoBetSet(count: number): void {
        let sendMsg: object = { count: count };
        let req: cowboy_proto.AdvanceAutoBetSetReq = this.encodePB("AdvanceAutoBetSetReq", sendMsg);

        console.log("cowboy_proto.ADVANCE_AUTO_BET_SET_REQ==>>" + req);
        this.sendGameMsg(req, cowboy_proto.CMD.ADVANCE_AUTO_BET_SET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetSetResponse(puf: any): void {
        let resp: cowboy_proto.AdvanceAutoBetSetRsp = this.decodePB("AdvanceAutoBetSetRsp", puf);
        if (resp) {
            console.log("cowboy_proto.ADVANCE_AUTO_BET_SET_RSP==>>" + resp);
            this.PostCowboyError(resp.code);

            if (resp.code === cowboy_proto.ErrorCode.OK) {
                cb.getCowboyRoom().iUsedAutoBetCount = 0;
                cb.getCowboyRoom().iSelectAutoBetCount = resp.count;
                cv.MessageCenter.send("on_cowboy_advance_autobet_set");
            }else if(resp.code === cowboy_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", resp);  
            }
        }
    }

    /**
     * 请求高级续投
     */
    reqAdvanceAutoBet(): void {
        let sendMsg: object = {};
        let req: cowboy_proto.AdvanceAutoBetReq = this.encodePB("AdvanceAutoBetReq", sendMsg);

        console.log("cowboy_proto.ADVANCE_AUTO_BET_REQ==>>" + req);
        this.sendGameMsg(req, cowboy_proto.CMD.ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetResponse(puf: any): void {
        let resp: cowboy_proto.AdvanceAutoBetRsp = this.decodePB("AdvanceAutoBetRsp", puf);
        if (resp) {
            console.log("cowboy_proto.ADVANCE_AUTO_BET_RSP==>>" + resp);

            if (resp.code === cowboy_proto.ErrorCode.OK) {
                cb.getCowboyRoom().iUsedAutoBetCount = resp.usedAutoBetCount;
            }

          
            if( resp.code == cowboy_proto.ErrorCode.IN_CALM_DOWN){
                cv.MessageCenter.send("onCalmDownMsg", resp);  
            }else{
                cv.MessageCenter.send("on_cowboy_advance_autobet", resp.code);
            }
           
        }
    }

    /**
     * 请求取消高级续投返回
     */
    ReqCancelAdvanceAutoBet(): void {
        let sendMsg: object = {};
        let req: cowboy_proto.CancelAdvanceAutoBetReq = this.encodePB("CancelAdvanceAutoBetReq", sendMsg);

        console.log("cowboy_proto.CANCEL_ADVANCE_AUTO_BET_REQ==>>" + req);
        this.sendGameMsg(req, cowboy_proto.CMD.CANCEL_ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleCancelAdvanceAutoBetResponse(puf: any): void {
        let resp: cowboy_proto.CancelAdvanceAutoBetRsp = this.decodePB("CancelAdvanceAutoBetRsp", puf);
        if (resp) {
            console.log("cowboy_proto.CANCEL_ADVANCE_AUTO_BET_RSP==>>" + resp);

            this.PostCowboyError(resp.code);
            if (resp.code === cowboy_proto.ErrorCode.OK) {
                cb.getCowboyRoom().iUsedAutoBetCount = 0;
                cb.getCowboyRoom().iSelectAutoBetCount = 0;
                cv.MessageCenter.send("on_cowboy_advance_autobet_cancel", resp.is_manual);
            }
        }
    }

    public onConnectOpen() {
        this.requestLoginServer();
    }

    // public UserPointsChangeNotice(puf:any) {
    //     let msg:cowboy_proto.UserPointsChangeNotice = this.decodePB("UserPointsChangeNotice", puf);
    //     if (msg) {
    //         cv.MessageCenter.send("UserPointsChangeNotice", msg.change_points);
    //     }
    // }
}