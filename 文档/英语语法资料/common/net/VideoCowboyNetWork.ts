import video_cowboy = require("./../../../Script/common/pb/video_cowboy");
import videoCowboy_proto = video_cowboy.video_cowboy_proto;

import cv from "../../components/lobby/cv";
import { CowboyPlayer, BetDetail, TrendData, DailyStat, TrendRoad, PlayerSettle, CowboyZoneData } from "../../components/game/cowboy/CowboyRoomData";
import { CardItem } from "../../components/game/dzPoker/data/RoomData";
import { NetWorkProxy } from "./NetWorkProxy";
import VideoCowboyManager from "../../components/game/videoCowboy/VideoCowboyManager";

const { ccclass, property } = cc._decorator;
@ccclass
export class VideoCowboyNetWork extends NetWorkProxy {
    public static instance: VideoCowboyNetWork;

    public static getInstance(): VideoCowboyNetWork {
        if (!this.instance) {
            this.instance = new VideoCowboyNetWork();
            this.instance.init();
        }
        return this.instance;
    }
    public sendGameMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number = cv.Enum.SeverType.SeverType_Game, ServerId: number = cv.Enum.GameId.VideoCowboy): boolean {
        return this.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
    }
    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.VideoCowboy);
    }
    public init() {
        this.registerMsg(VideoCowboyManager.Enum.MSGID.HEART_BEAT_RESP, this.responseHeartBeat.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.LOGIN_GAME_RESP, this.responseLoginServer.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.JOIN_ROOM_RESP, this.JoinRoomResponse.bind(this));

        this.registerMsg(VideoCowboyManager.Enum.MSGID.PLAYER_LIST_RESP, this.HandlePlayerListResponse.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.BET_RESP, this.HandleBetResponse.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.BET_NOTIFY, this.HandleBetNotify.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.AUTO_BET_RESP, this.HandleAutoBetResponse.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.MERGE_AUTO_BET_NOTIFY, this.HandleMergeAutoBetNotify.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.ROOM_TREND_RSP, this.HandleTrendResponse.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.ROOM_TREND_NOTICE, this.HandleTrendNotify.bind(this));

        this.registerMsg(VideoCowboyManager.Enum.MSGID.DEAL_NOTIFY, this.HandleDealNotify.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.START_BET_NOTIFY, this.HandleStartBetNotify.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.GAME_ROUND_END_NOTIFY, this.HandleGameRoundEndNofity.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.KICK_NOTIFY, this.HandleKickNotify.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.GAME_DATA_SYN, this.HandleGameDataSynNotify.bind(this));

        this.registerMsg(VideoCowboyManager.Enum.MSGID.LEAVE_ROOM_RESP, this.HandleLeaveRoomResp.bind(this));
        this.registerMsg(VideoCowboyManager.Enum.MSGID.START_SETTLEMENT_NOTIFY, this._HandleEndBetNotify.bind(this));

        this.registerMsg(videoCowboy_proto.CMD.SET_GAME_OPTION_RSP, this._handleSetGameOptionResponse.bind(this));			            // 自定义下注金额选项、续投按钮级别
        this.registerMsg(videoCowboy_proto.CMD.ADVANCE_AUTO_BET_SET_RSP, this._handleAdvanceAutoBetSetResponse.bind(this));			    // 设置高级续投次数
        this.registerMsg(videoCowboy_proto.CMD.ADVANCE_AUTO_BET_RSP, this._handleAdvanceAutoBetResponse.bind(this));			            // 高级续投
        this.registerMsg(videoCowboy_proto.CMD.CANCEL_ADVANCE_AUTO_BET_RSP, this._handleCancelAdvanceAutoBetResponse.bind(this));        // 取消高级续投

        this.registerMsg(videoCowboy_proto.CMD.STOP_BET_NOTIFY, this._HandleStopBetNotify.bind(this));
        this.registerMsg(videoCowboy_proto.CMD.SHOW_CARD_NOTIFY, this._HandleShowCardNotify.bind(this));
        this.registerMsg(videoCowboy_proto.CMD.SKIP_ROUND_NOTIFY, this._HandleSkipRoundNotify.bind(this));
        this.registerMsg(videoCowboy_proto.CMD.CANCEL_ROUND_NOTIFY, this._HandleCancelRoundNotify.bind(this));
    }

    PostCowboyError(i32Error: number): void {
        if (i32Error == VideoCowboyManager.Enum.ErrorCode.OK) return;
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

            this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.LOGIN_GAME_REQ, 0);
        }
    }
    public responseLoginServer(puf) {
        let data = this.decodePB("LoginResp", puf);
        if (data) {
            let error = data.code;
            if (error == VideoCowboyManager.Enum.ErrorCode.OK) {
                if (data.roomid > 0) {
                    cv.roomManager.setCurrentRoomID(data.roomid);
                }
                VideoCowboyManager.getVideoCowboyRoom().xianluList = [];
                let videosource = cc.sys.isBrowser ? data.WebvideoSource : data.videoSource;
                for (let i = 0; i < videosource.length; ++i) {
                    VideoCowboyManager.getVideoCowboyRoom().xianluList.push(videosource[i]);
                }
                cv.netWorkManager.OnVideoCowboyServerLogin();
            }
            else {
                cv.SwitchLoadingView.hide();
                cv.ToastGameError(cv.Enum.GameId.VideoCowboy, error);
            }
        }
    }

    public requestHeartBeat(): boolean {
        let RequestHeartBeat = cv.cowboyPB.lookupType("HeartBeatReq");
        if (RequestHeartBeat) {
            let sendMsg = { uid: cv.dataHandler.getUserData().u32Uid };
            let pbbuf = RequestHeartBeat.encode(sendMsg).finish();
            return this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.HEART_BEAT_REQ, 0);
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
            this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.JOIN_ROOM_REQ, roomId);
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
        this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.PLAYER_LIST_REQ, cv.roomManager.getCurrentRoomID());
    }

    public HandlePlayerListResponse(puf: any) {
        let msg = this.decodePB("PlayerListResp", puf);
        if (msg) {
            cv.StringTools.deepCopy(msg.self, VideoCowboyManager.getVideoCowboyRoom().playerself);
            VideoCowboyManager.getVideoCowboyRoom().gamePlayerList = [];
            VideoCowboyManager.getVideoCowboyRoom().dzplayerNum = msg.playerNum;
            let gamePlayers = msg.gamePlayers;
            //SEUInt32 winCount = 0;
            //int index = 0;
            //videoCowboy_proto::GamePlayer playerData;
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
            //	videoCowboy_proto::GamePlayer ssz;
            //	ssz.CopyFrom(gamePlayers[index]);
            //	VideoCowboyManager.getVideoCowboyRoom().gamePlayerList.push_back(ssz);
            //}

            let len = gamePlayers.length;
            for (let i = 0; i < len; i++) {
                let player = gamePlayers[i];
                let playerData: CowboyPlayer = new CowboyPlayer();
                cv.StringTools.deepCopy(player, playerData);
                VideoCowboyManager.getVideoCowboyRoom().gamePlayerList.push(playerData);
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
        this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.BET_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleBetResponse(pbbuf: any) {
        let msg = this.decodePB("BetResp", pbbuf);
        if (msg) {
            this.PostCowboyError(msg.code);
        }
    }

    HandleBetNotify(pbbuf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("BetNotify", pbbuf);
        if (msg) {
            VideoCowboyManager.getVideoCowboyRoom().updatePlayerCoin(msg.uid, msg.curCoin);
            VideoCowboyManager.getVideoCowboyRoom().updateZoneBet(msg.uid, msg.detail.option, msg.selfBet, msg.totalBet);
            VideoCowboyManager.getVideoCowboyRoom().updateCurOneBet(msg.uid, msg.detail);
            if (msg.uid === cv.dataHandler.getUserData().u32Uid) {
                VideoCowboyManager.getVideoCowboyRoom().hasBetInCurRound = true;
            }
            cv.MessageCenter.send("on_cowboy_bet_notify");
        }
    }

    public RequestAutoBet() {
        let sendMsg = {};
        let pbbuf = this.encodePB("AutoBetReq", sendMsg);
        this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleAutoBetResponse(pbbuf: any) {
        let msg = this.decodePB("AutoBetResp", pbbuf);
        if (msg) {
            this.PostCowboyError(msg.code);
            VideoCowboyManager.getVideoCowboyRoom().canAuto = msg.canAuto;
            cv.MessageCenter.send("on_cowboy_auto_bet_succ");
        }
    }

    HandleMergeAutoBetNotify(pbbuf: any) {
        let msg = this.decodePB("MergeAutoBetNotify", pbbuf);
        if (msg) {
            let notifies = msg.notify;
            let len = notifies.length;
            for (let i = 0; i < len; i++) {
                let oneBetNotify = notifies[i];
                VideoCowboyManager.getVideoCowboyRoom().updatePlayerCoin(oneBetNotify.uid, oneBetNotify.curCoin);
                VideoCowboyManager.getVideoCowboyRoom().updateZoneBet(oneBetNotify.uid, oneBetNotify.detail.option, oneBetNotify.selfBet, oneBetNotify.totalBet);
                VideoCowboyManager.getVideoCowboyRoom().updateCurOneBet(oneBetNotify.uid, oneBetNotify.detail);
                if (oneBetNotify.uid === cv.dataHandler.getUserData().u32Uid) {
                    VideoCowboyManager.getVideoCowboyRoom().hasBetInCurRound = true;
                }
                cv.MessageCenter.send("on_cowboy_auto_bet_notify");
            }
            cv.MessageCenter.send("on_cowboy_auto_bet_notify_handle_over", len);
        }
    }

    public RequestLeaveRoom() {
        let sendMsg = { roomuuid: 0 };
        let pbbuf = this.encodePB("LeaveRoomReq", sendMsg);
        this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.LEAVE_ROOM_REQ, cv.roomManager.getCurrentRoomID());
    }

    HandleLeaveRoomResp(pbbuf: any) {
        let msg = this.decodePB("LeaveRoomResp", pbbuf);
        if (msg) {
            if (!VideoCowboyManager.isPlayVideo()) { //cc.sys.isBrowser || 
                cv.roomManager.onResponse_LeaveRoom(msg);
            }
            else {
                cv.MessageCenter.send("onLeave_room_succ");
            }
        }
    }

    public RequestTrend() {
        let sendMsg = { roomuuid: 0 };
        let pbbuf = this.encodePB("RoomTrendReq", sendMsg);
        this.sendGameMsg(pbbuf, VideoCowboyManager.Enum.MSGID.ROOM_TREND_REQ, cv.roomManager.getCurrentRoomID());
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
            //           VideoCowboyManager.getVideoCowboyRoom().lasttrendData = VideoCowboyManager.getVideoCowboyRoom().trendData;
            //           VideoCowboyManager.getVideoCowboyRoom().lastdailyStat = VideoCowboyManager.getVideoCowboyRoom().dailyStat;

            VideoCowboyManager.getVideoCowboyRoom().trendData = [];
            VideoCowboyManager.getVideoCowboyRoom().dailyStat = [];
            VideoCowboyManager.getVideoCowboyRoom().trendRoad = [];

            VideoCowboyManager.getVideoCowboyRoom().lastRow = msg.lastRow;
            VideoCowboyManager.getVideoCowboyRoom().lastCol = msg.lastCol;

            let trendData = msg.trend;
            let stats = msg.stats;
            let road = msg.road;
            let trendLen = trendData.length;
            for (let i = 0; i < trendLen; i++) {
                let trend = trendData[i];
                let tempTrend: TrendData = new TrendData();
                cv.StringTools.deepCopy(trend, tempTrend);
                VideoCowboyManager.getVideoCowboyRoom().trendData.push(tempTrend);
            }

            let statsLen = stats.length;
            for (let i = 0; i < statsLen; i++) {
                let stt = stats[i];
                let sttData: DailyStat = new DailyStat();
                cv.StringTools.deepCopy(stt, sttData);
                VideoCowboyManager.getVideoCowboyRoom().dailyStat.push(sttData);
            }

            let roadLen = road.length;
            for (let i = 0; i < roadLen; i++) {
                //列
                let tmp = road[i];
                let data: TrendRoad = new TrendRoad();
                cv.StringTools.deepCopy(tmp, data);
                VideoCowboyManager.getVideoCowboyRoom().trendRoad.push(data);
            }

            cv.MessageCenter.send("on_update_trend_notify");
        }
    }

    HandleDealNotify(pbbuf: any): void {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("DealNotify", pbbuf);
        if (msg) {
            VideoCowboyManager.getVideoCowboyRoom().ResetRound();
            VideoCowboyManager.getVideoCowboyRoom().nextRoundEndStamp = msg.nextRoundEndStamp;
            VideoCowboyManager.getVideoCowboyRoom().leftSeconds = msg.leftSeconds;
            VideoCowboyManager.getVideoCowboyRoom().curState = VideoCowboyManager.Enum.RoundState.NEW_ROUND;
            VideoCowboyManager.getVideoCowboyRoom().canAuto = msg.canAuto;
            VideoCowboyManager.getVideoCowboyRoom().bCanUpdateWorldServerGold = true;

            // 更新第一张公共牌
            let cardItem: CardItem = new CardItem();
            cv.StringTools.deepCopy(msg.card, cardItem);
            VideoCowboyManager.getVideoCowboyRoom().publicCards.push(cardItem);

            // 玩家信息
            let players = msg.players;
            let playersLen = players.length;
            for (let i = 0; i < playersLen; i++) {
                let player = players[i];
                if (i == 0) {
                    if (player.uid == cv.dataHandler.getUserData().u32Uid) {
                        VideoCowboyManager.getVideoCowboyRoom().updateSelfPlayer(player);
                    }
                    else {
                        console.log("SocketHandler3::_HandleGameDataSynNotify, data error!!!, players[0] must be self!!!");
                    }
                }
                else {
                    VideoCowboyManager.getVideoCowboyRoom().addPlayer(player);
                }
            }

            // 胜负记录
            let results = msg.lastResult;
            let resultLen = results.length;
            for (let i = 0; i < resultLen; i++) {
                VideoCowboyManager.getVideoCowboyRoom().historyResults.push(results[i]);
            }

            // 判断房间参数变更
            if (msg.changed) {
                cv.StringTools.deepCopy(msg.param, VideoCowboyManager.getVideoCowboyRoom().pkRoomParam);
                cv.MessageCenter.send("on_cowboy_room_param_change_notify");
            }

            cv.MessageCenter.send("on_cowboy_deal_notify");
        }
    }

    HandleStartBetNotify(pbbuf: any): void {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("StartBetNotify", pbbuf);
        if (msg) {
            VideoCowboyManager.getVideoCowboyRoom().nextRoundEndStamp = msg.nextRoundEndStamp;
            VideoCowboyManager.getVideoCowboyRoom().leftSeconds = msg.leftSeconds;
            VideoCowboyManager.getVideoCowboyRoom().curState = VideoCowboyManager.Enum.RoundState.BET;
            VideoCowboyManager.getVideoCowboyRoom().bCanUpdateWorldServerGold = true;

            cv.MessageCenter.send("on_cowboy_start_bet_notify");
        }
    }

    HandleGameRoundEndNofity(pbbuf: any): void {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg: videoCowboy_proto.GameRoundEndNotify = this.decodePB("GameRoundEndNotify", pbbuf);
        if (msg) {
            this.ParseGameRoundEndNotify(msg, true);
            
            VideoCowboyManager.getVideoCowboyRoom().nextRoundEndStamp = msg.nextRoundEndStamp;
            VideoCowboyManager.getVideoCowboyRoom().leftSeconds = msg.leftSeconds;
            VideoCowboyManager.getVideoCowboyRoom().curState = VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND;
            VideoCowboyManager.getVideoCowboyRoom().isOpen = msg.openRoads;
            VideoCowboyManager.getVideoCowboyRoom().bCanUpdateWorldServerGold = false;

            cv.MessageCenter.send("on_cowboy_game_round_end_notify");
        }
    }

    ParseGameRoundEndNotify(noti: videoCowboy_proto.GameRoundEndNotify/*GameRoundEndNotify*/, isRoundEnd?: boolean): void {
        VideoCowboyManager.getVideoCowboyRoom().change_points = noti.change_points;
        isRoundEnd = isRoundEnd == true ? true : false;
        // 玩家手牌
        VideoCowboyManager.getVideoCowboyRoom().redHandCards = [];
        VideoCowboyManager.getVideoCowboyRoom().blueHandCards = [];
        let playerHoleCard = noti.playerHoleCard;
        let cardLen = playerHoleCard.length;
        for (let i = 0; i < cardLen; i++) {
            let playerCard = playerHoleCard[i];
            let cards = playerCard.Cards;
            let cardsLen = cards.length;
            for (let j = 0; j < cardsLen; j++) {
                let cardItem: CardItem = new CardItem();
                cv.StringTools.deepCopy(cards[j], cardItem);
                if (playerCard.name == VideoCowboyManager.Enum.RoleName.Red) {
                    VideoCowboyManager.getVideoCowboyRoom().redHandCards.push(cardItem);
                }
                else if (playerCard.name == VideoCowboyManager.Enum.RoleName.Blue) {
                    VideoCowboyManager.getVideoCowboyRoom().blueHandCards.push(cardItem);
                }
            }
        }

        // 公共牌
        VideoCowboyManager.getVideoCowboyRoom().publicCards = [];
        let publicCards = noti.publicCards;
        let len = publicCards.length;
        for (let i = 0; i < len; i++) {
            let card = publicCards[i];
            let cardItem: CardItem = new CardItem();
            cv.StringTools.deepCopy(card, cardItem);
            VideoCowboyManager.getVideoCowboyRoom().publicCards.push(cardItem);
        }

        // 下注输赢情况
        VideoCowboyManager.getVideoCowboyRoom().playerSettles.clear();
        let playerSettles = noti.playerSettle;
        len = playerSettles.length;
        for (let i = 0; i < len; i++) {
            let playerSettle = playerSettles[i];
            let settle: PlayerSettle = new PlayerSettle();
            cv.StringTools.deepCopy(playerSettle, settle);

            VideoCowboyManager.getVideoCowboyRoom().playerSettles.add(playerSettle.uid, settle);
            VideoCowboyManager.getVideoCowboyRoom().updatePlayerKeepWinCount(playerSettle.uid, playerSettle.keepWinCount);
        }

        // 除主界面8个人输赢外其它玩家列表的输赢
        VideoCowboyManager.getVideoCowboyRoom().otherPlayersSettle.reset();
        cv.StringTools.deepCopy(noti.otherPlayers, VideoCowboyManager.getVideoCowboyRoom().otherPlayersSettle);

        // 哪几个区域选项赢的
        VideoCowboyManager.getVideoCowboyRoom().matchOption = [];
        let matchOption = noti.matchOption;
        len = matchOption.length;
        for (let i = 0; i < len; i++) {
            VideoCowboyManager.getVideoCowboyRoom().matchOption.push(matchOption[i]);
        }

        // 输赢结果
        let roundResult = videoCowboy_proto.RoundResult.create(noti.roundResult);
        VideoCowboyManager.getVideoCowboyRoom().result = roundResult.result;
        VideoCowboyManager.getVideoCowboyRoom().redLevel = roundResult.redLevel;
        VideoCowboyManager.getVideoCowboyRoom().blueLevel = roundResult.blueLevel;
        if (isRoundEnd) {
            if (VideoCowboyManager.getVideoCowboyRoom().result == 0) {
                VideoCowboyManager.getVideoCowboyRoom().historyResults.push(VideoCowboyManager.Enum.BetZoneOption.EQUAL);
            }
            else if (VideoCowboyManager.getVideoCowboyRoom().result == 1) {
                VideoCowboyManager.getVideoCowboyRoom().historyResults.push(VideoCowboyManager.Enum.BetZoneOption.RED_WIN);
            }
            else if (VideoCowboyManager.getVideoCowboyRoom().result == -1) {
                VideoCowboyManager.getVideoCowboyRoom().historyResults.push(VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN);
            }
            else {
                console.log("SocketHandler3::ParseGameRoundEndNotify, error result: %d", VideoCowboyManager.getVideoCowboyRoom().result);
            }

            // 更新本局区域输赢结果
            let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;
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
        VideoCowboyManager.getVideoCowboyRoom().winCards = [];
        let winCards = (roundResult.Cards);
        len = winCards.length;
        for (let i = 0; i < len; i++) {
            let card = videoCowboy_proto.CardItem.create(winCards[i]);
            let cardItem: CardItem = new CardItem();
            cv.StringTools.deepCopy(card, cardItem);
            VideoCowboyManager.getVideoCowboyRoom().winCards.push(cardItem);
        }

        // 非0代表系统即将维护
        VideoCowboyManager.getVideoCowboyRoom().stopWorld = noti.stopWorld;
        VideoCowboyManager.getVideoCowboyRoom().idle_roomid = noti.idle_roomid;
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
            VideoCowboyManager.getVideoCowboyRoom().Reset();
            VideoCowboyManager.getVideoCowboyRoom().pkRoomParam = videoCowboy_proto.RoomParam.create(noti.param);
            VideoCowboyManager.getVideoCowboyRoom().u32RoomId = noti.param.roomid;
            VideoCowboyManager.getVideoCowboyRoom().u32Uid = cv.dataHandler.getUserData().u32Uid;
            VideoCowboyManager.getVideoCowboyRoom().isOpen = noti.openRoads;
            VideoCowboyManager.getVideoCowboyRoom().llCoinUICritical = cv.StringTools.clientGoldByServer(noti.BetButtonLimitAmount);

            // 高级设置/续投
            do {
                // 对应房间级别的下注金额选项(没有默认拿房间参数里面的amountLevel值)
                cv.StringTools.clearArray(VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption);
                let betcoinoption_size: number = cv.StringTools.getArrayLength(noti.betCoinOption);
                if (betcoinoption_size > 0) {
                    for (let i = 0; i < betcoinoption_size; ++i) {
                        VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption.push(noti.betCoinOption[i]);
                    }
                }
                else {
                    for (let i = 0; i < cv.StringTools.getArrayLength(noti.param.amountLevel); ++i) {
                        VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption.push(noti.param.amountLevel[i]);
                    }
                }

                // 续投
                VideoCowboyManager.getVideoCowboyRoom().eAutoLevel = noti.autoLevel;
                VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount = noti.usedAutoBetCount;
                VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount = noti.selectAutoBetCount;
                VideoCowboyManager.getVideoCowboyRoom().canAdvanceAuto = noti.canAdvanceAuto;

                cv.StringTools.clearArray(VideoCowboyManager.getVideoCowboyRoom().vAutoBetCountList);
                for (let i = 0; i < cv.StringTools.getArrayLength(noti.AutoBetCountList); ++i) {
                    VideoCowboyManager.getVideoCowboyRoom().vAutoBetCountList.push(noti.AutoBetCountList[i]);
                }
            } while (0);

            // 已下注信息
            let optioninfo = noti.optionInfo;
            let len = optioninfo.length;
            for (let i = 0; i < len; i++) {
                let bet = optioninfo[i];
                // 过滤无效的选项
                if (bet.option == VideoCowboyManager.Enum.BetZoneOption.BetZoneOption_DUMMY
                    || bet.option == VideoCowboyManager.Enum.BetZoneOption.WIN_BEGIN
                    || bet.option == VideoCowboyManager.Enum.BetZoneOption.WIN_END
                    || bet.option == VideoCowboyManager.Enum.BetZoneOption.HOLE_BEGIN
                    || bet.option == VideoCowboyManager.Enum.BetZoneOption.HOLE_END
                    || bet.option == VideoCowboyManager.Enum.BetZoneOption.FIVE_BEGIN
                    || bet.option == VideoCowboyManager.Enum.BetZoneOption.FIVE_END) {
                    continue;
                }
                VideoCowboyManager.getVideoCowboyRoom().selfZoneBet.add(bet.option, bet.selfBet);
                VideoCowboyManager.getVideoCowboyRoom().totalZoneBet.add(bet.option, bet.totalBet);

                // 所有人下的金额
                let betAmounts = bet.amount;
                let vecBetAmounts: number[] = [];
                let betAmountsLen = betAmounts.length;
                for (let j = 0; j < betAmountsLen; j++) {
                    vecBetAmounts.push(betAmounts[j]);
                }
                VideoCowboyManager.getVideoCowboyRoom().allZoneBet.add(bet.option, vecBetAmounts);

                // 若该区域自己有下过注,则标记已下注
                if (bet.selfBet > 0) {
                    VideoCowboyManager.getVideoCowboyRoom().hasBetInCurRound = true;
                }
            }

            VideoCowboyManager.getVideoCowboyRoom().nextRoundEndStamp = noti.nextRoundEndStamp;
            VideoCowboyManager.getVideoCowboyRoom().leftSeconds = noti.leftSeconds;
            VideoCowboyManager.getVideoCowboyRoom().curState = noti.curState;
            VideoCowboyManager.getVideoCowboyRoom().canAuto = noti.canAuto;

            // 玩家信息
            let players = noti.players;
            len = players.length;
            for (let i = 0; i < len; i++) {
                let player = players[i];
                if (i == 0) {
                    if (player.uid == cv.dataHandler.getUserData().u32Uid) {
                        VideoCowboyManager.getVideoCowboyRoom().updateSelfPlayer(player);
                    }
                    else {
                        console.log("SocketHandler3::_HandleGameDataSynNotify, data error!!!, players[0] must be self!!!");
                    }
                }
                else {
                    VideoCowboyManager.getVideoCowboyRoom().addPlayer(player);
                }
            }

            // 胜负记录
            VideoCowboyManager.getVideoCowboyRoom().historyResults = [];
            let results = noti.lastResult;
            len = results.length;
            for (let i = 0; i < len; i++) {
                VideoCowboyManager.getVideoCowboyRoom().historyResults.push(results[i]);
            }

            // 各个区域的胜负记录(按时间降序)

            let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;
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
                VideoCowboyManager.getVideoCowboyRoom().publicCards.push(cardItem);
            }

            // 单局已结束的重连
            if (noti.curState == VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND) {
                this.ParseGameRoundEndNotify(noti.cachedNotifyMsg);
            }
            let cardLen = noti.cards.length;
            for (let i = 0; i < cardLen; i++) {
                VideoCowboyManager.getVideoCowboyRoom().updateOpenCardData((noti.cards)[i]);
            }

            cv.MessageCenter.send("on_cowboy_gamedata_syn_notify");
        }
    }

    _HandleEndBetNotify(pbbuf: any): void {
        let noti = this.decodePB("StartSettlementNotify", pbbuf);
        VideoCowboyManager.getVideoCowboyRoom().bCanUpdateWorldServerGold = false;
    }


    /**
     * 请求自定义下注金额选项、续投按钮级别
     */
    reqSetGameOption(vAmountLevel: number[], autoLevel: videoCowboy_proto.AutoBetLevel): void {
        let betCoinOption: number[] = [];
        cv.StringTools.deepCopy(vAmountLevel, betCoinOption);
        let sendMsg: object = { autoLevel: autoLevel, betCoinOption: betCoinOption };
        let req: videoCowboy_proto.SetGameOptionReq = this.encodePB("SetGameOptionReq", sendMsg);

        console.log("videoCowboy_proto.SET_GAME_OPTION_REQ==>>" + req);
        this.sendGameMsg(req, videoCowboy_proto.CMD.SET_GAME_OPTION_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleSetGameOptionResponse(puf: any) {
        let resp: videoCowboy_proto.SetGameOptionResp = this.decodePB("SetGameOptionResp", puf);
        if (resp) {
            console.log("videoCowboy_proto.SET_GAME_OPTION_RSP==>>" + resp);
            this.PostCowboyError(resp.code);

            if (resp.code === videoCowboy_proto.ErrorCode.OK) {
                VideoCowboyManager.getVideoCowboyRoom().eAutoLevel = resp.autoLevel;
                cv.StringTools.clearArray(VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption);

                for (let i = 0; i < resp.betCoinOption.length; ++i) {
                    VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption.push(resp.betCoinOption[i]);
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
        let req: videoCowboy_proto.AdvanceAutoBetSetReq = this.encodePB("AdvanceAutoBetSetReq", sendMsg);

        console.log("videoCowboy_proto.ADVANCE_AUTO_BET_SET_REQ==>>" + req);
        this.sendGameMsg(req, videoCowboy_proto.CMD.ADVANCE_AUTO_BET_SET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetSetResponse(puf: any): void {
        let resp: videoCowboy_proto.AdvanceAutoBetSetRsp = this.decodePB("AdvanceAutoBetSetRsp", puf);
        if (resp) {
            console.log("videoCowboy_proto.ADVANCE_AUTO_BET_SET_RSP==>>" + resp);
            this.PostCowboyError(resp.code);

            if (resp.code === videoCowboy_proto.ErrorCode.OK) {
                VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount = 0;
                VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount = resp.count;
                cv.MessageCenter.send("on_cowboy_advance_autobet_set");
            }
        }
    }

    /**
     * 请求高级续投
     */
    reqAdvanceAutoBet(): void {
        let sendMsg: object = {};
        let req: videoCowboy_proto.AdvanceAutoBetReq = this.encodePB("AdvanceAutoBetReq", sendMsg);

        console.log("videoCowboy_proto.ADVANCE_AUTO_BET_REQ==>>" + req);
        this.sendGameMsg(req, videoCowboy_proto.CMD.ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleAdvanceAutoBetResponse(puf: any): void {
        let resp: videoCowboy_proto.AdvanceAutoBetRsp = this.decodePB("AdvanceAutoBetRsp", puf);
        if (resp) {
            console.log("videoCowboy_proto.ADVANCE_AUTO_BET_RSP==>>" + resp);

            if (resp.code === videoCowboy_proto.ErrorCode.OK) {
                VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount = resp.usedAutoBetCount;
            }

            cv.MessageCenter.send("on_cowboy_advance_autobet", resp.code);
        }
    }

    /**
     * 请求取消高级续投返回
     */
    ReqCancelAdvanceAutoBet(): void {
        let sendMsg: object = {};
        let req: videoCowboy_proto.CancelAdvanceAutoBetReq = this.encodePB("CancelAdvanceAutoBetReq", sendMsg);

        console.log("videoCowboy_proto.CANCEL_ADVANCE_AUTO_BET_REQ==>>" + req);
        this.sendGameMsg(req, videoCowboy_proto.CMD.CANCEL_ADVANCE_AUTO_BET_REQ, cv.roomManager.getCurrentRoomID());
    }
    private _handleCancelAdvanceAutoBetResponse(puf: any): void {
        let resp: videoCowboy_proto.CancelAdvanceAutoBetRsp = this.decodePB("CancelAdvanceAutoBetRsp", puf);
        if (resp) {
            console.log("videoCowboy_proto.CANCEL_ADVANCE_AUTO_BET_RSP==>>" + resp);

            this.PostCowboyError(resp.code);
            if (resp.code === videoCowboy_proto.ErrorCode.OK) {
                VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount = 0;
                VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount = 0;
                cv.MessageCenter.send("on_cowboy_advance_autobet_cancel", resp.is_manual);
            }
        }
    }

    _HandleStopBetNotify(puf: any): void {
        let resp: videoCowboy_proto.StopBetNotify = this.decodePB("StopBetNotify", puf);
        if (resp) {
            cv.MessageCenter.send("on_videoCowboy_HandleStopBetNotify");
        }
    }
    _HandleShowCardNotify(puf: any): void {
        let resp: videoCowboy_proto.ShowCardNotify = this.decodePB("ShowCardNotify", puf);
        if (resp) {
            let cardLen = resp.cards.length;
            for (let i = 0; i < cardLen; i++) {
                VideoCowboyManager.getVideoCowboyRoom().updateOpenCardData(videoCowboy_proto.WrapCard.create(resp.cards[i]));
            }

            VideoCowboyManager.getVideoCowboyRoom().updateOpenCardData(videoCowboy_proto.WrapCard.create(resp.newCard));

            cv.MessageCenter.send("videoCowboy_ShowCardNotify", "1");
        }
    }
    _HandleSkipRoundNotify(puf: any): void {
        //video_cowboy_proto::SkipRoundNotify resp;
        //bool ret = resp.ParseFromArray(pcMessage, u32Len);
        //if (!ret) return;
        //SyncPBMessage* pkSyncMsg = new SyncPBMessage();
        //pkSyncMsg->kMsg = new video_cowboy_proto::SkipRoundNotify;
        //pkSyncMsg->kMsg->CopyFrom(resp);
        cv.MessageCenter.send("on_videoCowboy_HandleSkipRoundNotify");
    }
    _HandleCancelRoundNotify(puf: any): void {
        VideoCowboyManager.getVideoCowboyRoom().openCardData.clear();
        cv.MessageCenter.send("on_videoCowboy_HandleCancelRoundNotify");
    }
}