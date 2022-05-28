import jackfruit = require("../../../../Script/common/pb/jackfruit");
import jackfruit_proto = jackfruit.jackfruit_proto;

import cv from "../../../components/lobby/cv";

import { BarrageType, BrandBarrageInfo, JackpotAwardInfo, ePlayerState, CardItem, PlayerInfo, ChatType, GameRecord } from "../../../components/game/jackfruit/JackfruitData"; 
import { NetWorkProxy } from "./../../../common/net/NetWorkProxy";
import JackfruitMgr from "./JackfruitManager";
import { CAFInfo } from "../dzPoker/data/RoomData";
// import { pb } from "../../../../Script/common/pb/ws_protocol";

const { ccclass, property } = cc._decorator;
@ccclass
export class JackfruitNetWork extends NetWorkProxy {
    public static instance: JackfruitNetWork;

    public static getInstance(): JackfruitNetWork {
        if (!this.instance) {
            this.instance = new JackfruitNetWork();
            this.instance.init();
        }
        return this.instance;
    }
    public sendGameMsg(pbbuf: any, msgid: number, Roomid: number = cv.roomManager.getCurrentRoomID(), ServerType: number = cv.Enum.SeverType.SeverType_Game, ServerId: number = cv.Enum.GameId.Jackfruit): boolean {
        return this.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
    }
    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.Jackfruit);
    }
    public init() {
        this.registerMsg(jackfruit_proto.CMD.HEART_BEAT_RESP, this.responseHeartBeat.bind(this));
        this.registerMsg(jackfruit_proto.CMD.LOGIN_GAME_RESP, this.responseLoginServer.bind(this));
        this.registerMsg(jackfruit_proto.CMD.JOIN_ROOM_RESP, this.responseJoinRoom.bind(this));
        this.registerMsg(jackfruit_proto.CMD.GAME_DATA_SYNC_RESP, this.responseGameDataSync.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SIT_DOWN_RESP, this.responseSitDown.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SIT_DOWN_NOTIFY, this.noticeSitDown.bind(this));
        this.registerMsg(jackfruit_proto.CMD.PLACE_CARD_RESP, this.responsePlaceCard.bind(this));
        this.registerMsg(jackfruit_proto.CMD.PLACE_CARD_OVER_RESP, this.responsePlaceCardOver.bind(this));
        this.registerMsg(jackfruit_proto.CMD.PLACE_CARD_OVER_NOTIFY, this.noticePlaceCardOver.bind(this));
        this.registerMsg(jackfruit_proto.CMD.STAND_UP_RESP, this.responseStandUp.bind(this));
        this.registerMsg(jackfruit_proto.CMD.STAND_UP_NOTIFY, this.noticeStandUp.bind(this));
        this.registerMsg(jackfruit_proto.CMD.READY_RESP, this.responseReady.bind(this));
        this.registerMsg(jackfruit_proto.CMD.READY_NOTIFY, this.noticeReady.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SEND_CHAT_RESP, this.responseSendChat.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SEND_CHAT_NOTIFY, this.noticeSendChat.bind(this));
        this.registerMsg(jackfruit_proto.CMD.BUY_IN_RESP, this.responseBuyIn.bind(this));
        this.registerMsg(jackfruit_proto.CMD.BUY_IN_NOTIFY, this.noticeBuyIn.bind(this));
        this.registerMsg(jackfruit_proto.CMD.LEAVE_RESP, this.responseLeave.bind(this));
        this.registerMsg(jackfruit_proto.CMD.GAME_WILL_START_NOTIFY, this.noticeGameWillStart.bind(this));
        this.registerMsg(jackfruit_proto.CMD.DEAL_NOTIFY, this.noticeDeal.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SQUAT_CARDS_NOTIFY, this.noticeSquatCards.bind(this));
        this.registerMsg(jackfruit_proto.CMD.GAME_ROUND_END_NOTIFY, this.noticeGameRoundEnd.bind(this));
        this.registerMsg(jackfruit_proto.CMD.DESTROY_ROOM_NOTIFY, this.noticeDestroyRoomNotify.bind(this));
        this.registerMsg(jackfruit_proto.CMD.CONFIRM_TO_CONTINUE, this.confirmToContinue.bind(this));
        this.registerMsg(jackfruit_proto.CMD.COMMUNITY_CARDS_NOTIFY, this.noticeCommunityCards.bind(this));
        this.registerMsg(jackfruit_proto.CMD.START_PLACE_CARDS, this.startPlaceCards.bind(this));
        this.registerMsg(jackfruit_proto.CMD.Show_PLACE_CARDS_NOTIFY, this.noticeShowstartPlaceCards.bind(this));
        this.registerMsg(jackfruit_proto.CMD.ACTION_DELAY_RESP, this.resposeActionDelay.bind(this));
        this.registerMsg(jackfruit_proto.CMD.ACTION_DELAY_NOTIFY, this.notifyActionDelay.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SITUATION_RESP, this.resposeSituation.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SEND_BARRAGE_RESP, this.onBarrageRespones.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SEND_BARRAGE_NOTIFY, this.onBarrageNotice.bind(this));
        this.registerMsg(jackfruit_proto.CMD.WAITING_OTHER_PLAYER_NOTIFY, this.noticeWaitingOtherPlayer.bind(this));
        this.registerMsg(jackfruit_proto.CMD.MsgId_BarrageCount_RESP, this.onGetBarrageCountNotice.bind(this));
        this.registerMsg(jackfruit_proto.CMD.CHANGE_TABLE_RESP, this.resposeChangeTable.bind(this));
        this.registerMsg(jackfruit_proto.CMD.SETTLE_RESP, this.responseSettle.bind(this));
        this.registerMsg(jackfruit_proto.CMD.CAN_OPERATION_NOTIFY, this.notifyCanOperation.bind(this));
        this.registerMsg(jackfruit_proto.CMD.PLAYER_INFO_SYNC_NOTIFY, this.notifyPlayerInfoSync.bind(this));
        this.registerMsg(jackfruit_proto.CMD.START_MATCH_NOTIFY, this.notifyStartMatch.bind(this));
        this.registerMsg(jackfruit_proto.CMD.MATCH_RESULT_NOTIFY, this.notifyMatchResult.bind(this));
        this.registerMsg(jackfruit_proto.CMD.GetGameUUIds_RESP, this.responseGetGameUUIDS.bind(this));
        this.registerMsg(jackfruit_proto.CMD.JACKPOT_DATA_RESP, this.responseJackpotData.bind(this));
        this.registerMsg(jackfruit_proto.CMD.JACKPOT_AWARD_LIST_RESP, this.responseJackpotList.bind(this));
        this.registerMsg(jackfruit_proto.CMD.MODIFY_PLACE_CARDS_NOTIFY, this.notifyModifyPlaceCards.bind(this));
        this.registerMsg(jackfruit_proto.CMD.BRAND_BARRAGE_NOTIFY, this.notifyBrandBarrage.bind(this));
        this.registerMsg(jackfruit_proto.CMD.NotDisturb_RESP, this.onNotDisturbResponse.bind(this));
        this.registerMsg(jackfruit_proto.CMD.IsEmojiFree_RESP, this.responseIsEmojiFree.bind(this));
        this.registerMsg(jackfruit_proto.CMD.IsEmojiFree_NOTIFY, this.IsEmojiFreeNotice.bind(this));
        this.registerMsg(jackfruit_proto.CMD.Like_RESP, this.onLikeResponse.bind(this));
        this.registerMsg(jackfruit_proto.CMD.Like_NOTIFY, this.onLikeNotice.bind(this));

        //好友加入牌桌通知
        this.registerMsg(jackfruit_proto.CMD.GoodFriendJoinTable_NOTIFY, this.onGoodFriendJoinTable.bind(this));

        this.registerMsg(jackfruit_proto.CMD.IntimacyUp_NOTIFY, this.IntimacyUpNotice.bind(this));
    }

    ToastError(i32Error: number): void {
        if (i32Error == jackfruit_proto.ErrorCode.OK) return;
        if (i32Error == 13023) {
            cv.TP.showTimeMsg(cv.config.getStringData("ServerErrorCode42"), this.showGameShop.bind(this));
            return;
        } else if (i32Error == 13006) {
            cv.MessageCenter.send("exit_the_room");
            let acBuffer = cv.config.getStringData("ServerErrorCode22");
            cv.TT.showMsg(acBuffer, cv.Enum.ToastType.ToastTypeInfo);
            return;
        } else if (i32Error == 13001) {
            cv.netWorkManager.OnNeedRelogin(2);
            return;
        } else if (i32Error == 13036) {
            let acBuffer = cv.config.getStringData("ServerErrorCode93");
            cv.TT.showMsg(acBuffer, cv.Enum.ToastType.ToastTypeInfo);
            return;
        } else if (i32Error == 13037) {
            let acBuffer = cv.config.getStringData("ServerErrorCode111");
            cv.TT.showMsg(acBuffer, cv.Enum.ToastType.ToastTypeInfo);
            return;
        } else if (i32Error == 13042)//离开房间时等待结算
        {
            return;
        }
        let acBuffer = cv.config.getStringData("JackfruitServerErrorCode" + i32Error);
        cv.TT.showMsg(acBuffer, cv.Enum.ToastType.ToastTypeInfo);
    }

    public showGameShop() {
        cv.SHOP.RechargeClick();
    }

    public requestLoginServer() {
        let user_token = cv.dataHandler.getUserData().user_token;
        let Version = cv.config.GET_CLIENT_VERSION();
        let client_type = cv.config.GET_CLIENT_TYPE();
        let sendMsg: object = {
            token: user_token,
            version: Version,
            client_type: client_type
        };
        let pbbuf = this.encodePB("LoginReq", sendMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.LOGIN_GAME_REQ, 0);
    }
    public responseLoginServer(puf) {
        let data = this.decodePB("LoginResp", puf);
        if (data) {
            if (data.code == jackfruit_proto.ErrorCode.OK) {
                if (data.roomId != 0) {//如果有房间ID说明为重连，需要重新判断是否禁止模拟器入座
                    // if (!data.anti_simulator) {
                    //     if (cv.native.IsSimulator()) {
                    //         let num = data.anti_simulator_ignore_cond;
                    //         if (num > 0) {
                    //             cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIEmulatorErrorText_1"), num), cv.Enum.ToastType.ToastTypeWarning);
                    //         } else {
                    //             cv.TT.showMsg(cv.config.getStringData("UIEmulatorErrorText"), cv.Enum.ToastType.ToastTypeWarning);
                    //         }
                    //         cv.netWorkManager.closeGameConnect();
                    //         cv.SwitchLoadingView.hide();
                    //         return;
                    //     }
                    // }
                    cv.roomManager.setCurrentRoomID(data.roomId);
                }
                cv.netWorkManager.OnGameServerLogin(data.code);
            }
            else {
                cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
                cv.SwitchLoadingView.hide();
                this.ToastError(data.code);
            }
        }
    }

    public requestHeartBeat(): boolean {
        console.log("心跳发送");
        let sendMsg = {
            uid: cv.dataHandler.getUserData().u32Uid
        };
        let pbbuf = this.encodePB("HeartBeatReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.HEART_BEAT_REQ, 0);
    }

    public responseHeartBeat(puf) {
        let tempModule = cv.jackfruitPB.lookupType("HeartBeatResp");
        if (tempModule) {
            let recvMsg = new Uint8Array(puf)
            let result = tempModule.decode(recvMsg);
            if (result != null) {
                let error = result.uid;
                console.log("心跳uid::->>" + error);
                cv.netWorkManager.onGameHeartBeat();
            }
        }
    }

    public requestJoinRoom(roomId: number) {
        let sendMsg = { roomId: roomId };
        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            let pbbuf = this.encodePB("JoinRoomReq", sendMsg);
            this.sendGameMsg(pbbuf, jackfruit_proto.CMD.JOIN_ROOM_REQ, roomId);
        } else {
            this.requestLoginServer();
        }
    }

    public responseJoinRoom(puf: any) {
        let msg = this.decodePB("JoinRoomResp", puf);
        if (msg) {
            cv.roomManager.onJoinRoomResponse(msg);
            JackfruitMgr.tRoomData.nPrePickSeatID = -1;
            if (msg.code != jackfruit_proto.ErrorCode.OK) {
                this.ToastError(msg.code);
            }
        }
    }

    public requestGameDataSync(roomId: number) {
        let sendMsg = {
            roomId: roomId
        };
        let pbbuf = this.encodePB("GameDataSyncReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.GAME_DATA_SYNC_REQ, roomId);
    }

    public responseGameDataSync(puf: any) {
        let msg = this.decodePB("GameDataSyncResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                cv.GameDataManager.tRoomData.m_bIsReconnectMode = false;
                JackfruitMgr.tRoomData.reset();
                cv.StringTools.deepCopy(msg.param, JackfruitMgr.tRoomData.param);
                cv.StringTools.deepCopy(msg.cachedNotifyMsg, JackfruitMgr.tRoomData.cachedNotifyMsg);
                cv.StringTools.deepCopy(msg.fee, JackfruitMgr.tRoomData.fee);
                JackfruitMgr.tRoomData.barrageLeftSeconds = msg.barrageLeftSeconds;
                JackfruitMgr.tRoomData.curState = msg.curState;
                JackfruitMgr.tRoomData.actionDelayCountsFee = msg.actionDelayCountsFee;
                JackfruitMgr.tRoomData.canChangeTable = msg.canChangeTable;
                JackfruitMgr.tRoomData.startMatchTimeStamp = msg.startMatchTimeStamp;
                JackfruitMgr.tRoomData.matchedSeconds = msg.matchedSeconds;
                JackfruitMgr.tRoomData.jackpotLeftAmount = msg.jackpotLeftAmount;
                for (let i = 0; i < msg.delayedOperationPlayIds.length; i++) {
                    JackfruitMgr.tRoomData.delayedOperationPlayIds[i] = msg.delayedOperationPlayIds[i];
                }

                let plays = JackfruitMgr.tRoomData.cachedNotifyMsg.playerSettle;
                for (let i = 0; i < plays.length; i++) {
                    let player = plays[i].player;
                    JackfruitMgr.tRoomData.addTablePlayer(player);
                }
                cv.MessageCenter.send("on_game_data_sync");
                this.requestGetGameUUIDS();
                if (msg.jackpotLeftAmount != -1) {
                    this.requestJackpotData(msg.param.ante);
                }
            } else {
                this.ToastError(msg.code);
            }
        }
    }
    public requestSitDown(roomId: number, seatId: number) {
        let sendMsg = {
            roomId: roomId,
            seatId: seatId
        };

        let pbbuf = this.encodePB("SitDownReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.SIT_DOWN_REQ, roomId);
    }

    public responseSitDown(puf: any) {
        let resp: jackfruit_proto.SitDownResp = this.decodePB("SitDownResp", puf);
        if (resp) {
            console.log(`JackfruitNetWork - response: SIT_DOWN_RESP, resp = ${JSON.stringify(resp)}`);

            switch (resp.code) {
                case jackfruit_proto.ErrorCode.OK: {

                } break;

                // 发起真人验证
                case jackfruit_proto.ErrorCode.NeedAuthVerify: {
                    cv.MessageCenter.send("on_need_slider_verify", (): void => {
                        cv.jackfruitNet.requestSitDown(resp.roomId, resp.seatId);
                    });
                } break;

                // 真人验证错误码(x秒后重新认证)
                case jackfruit_proto.ErrorCode.WaitAuthRefreshCD: {
                    let strKey: string = cv.config.getStringData("slider_verify_toast_result_forbid_txt");
                    cv.TT.showMsg(cv.StringTools.formatC(strKey, resp.authVerifyCD), cv.Enum.ToastType.ToastTypeError);
                } break;

                case jackfruit_proto.ErrorCode.NOT_ENOUGH_STAKE: {
                    cv.MessageCenter.send("need_buyin", { needAmount: resp.needAmount, amount: resp.amount, needScore: resp.needScore, score: resp.score });
                } break;

                default: {
                    this.ToastError(resp.code);
                } break;
            }
        }
    }

    public noticeSitDown(puf: any) {
        let msg = this.decodePB("SitDownNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;
            let player: PlayerInfo = msg.player;
            JackfruitMgr.tRoomData.addTablePlayer(player);
            cv.MessageCenter.send("on_sitdown_succ", player.playerId);
        }
    }

    public requestPlaceCard(headCards: CardItem[], middleCards: CardItem[], tailCards: CardItem[], holeCards: CardItem[]) {
        let sendMsg = {
            headCards: headCards,
            middleCards: middleCards,
            tailCards: tailCards,
            holeCards: holeCards,
        };
        let pbbuf = this.encodePB("PlaceCardReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.PLACE_CARD_REQ);
    }
    public responsePlaceCard(puf: any) {
        let msg = this.decodePB("PlaceCardResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {

            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public requestPlaceCardOver(headCards: CardItem[], middleCards: CardItem[], tailCards: CardItem[], holeCards: CardItem[]) {
        let sendMsg = {
            headCards: headCards,
            middleCards: middleCards,
            tailCards: tailCards,
            holeCards: holeCards
        };
        let pbbuf = this.encodePB("PlaceCardOverReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.PLACE_CARD_OVER_REQ);
    }

    public responsePlaceCardOver(puf: any) {
        let msg = this.decodePB("PlaceCardOverResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {

            } else {
                this.ToastError(msg.code);
            }
        }
    }
    public noticePlaceCardOver(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("PlaceCardOverNotify", puf);
        if (msg) {
            cv.MessageCenter.send("place_card_over", msg.seatId);
        }
    }
    public requestStandUp(roomId: number) {
        let sendMsg = {
            roomId: roomId
        };
        let pbbuf = this.encodePB("StandUpReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.STAND_UP_REQ);
    }
    public responseStandUp(puf: any) {
        let msg = this.decodePB("StandUpResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {

            } else {
                this.ToastError(msg.code);
            }
        }
    }
    public noticeStandUp(puf: any) {
        let msg = this.decodePB("StandUpNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;
            cv.MessageCenter.send("stand_up_succ", msg.playerId);
        }
    }
    public requestReady() {
        let sendMsg = {
        };
        let pbbuf = this.encodePB("ReadyReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.READY_REQ);
    }
    public responseReady(puf: any) {
        let msg = this.decodePB("ReadyResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
            } else {
                this.ToastError(msg.code);
            }
        }
    }
    public noticeReady(puf: any) {
        let msg = this.decodePB("ReadyNotify", puf);
        if (msg) {
            let player = JackfruitMgr.tRoomData.GetTablePlayer(msg.playerId);
            player.state = ePlayerState.SReady;
            cv.MessageCenter.send("player_ready", msg.playerId);
        }
    }

    public requestSendChat(roomId: number, cType: ChatType, content: string, emojitype: jackfruit_proto.EmojiType = jackfruit_proto.EmojiType.InterActiveNormal) {
        let str: string = content;
        if (cType == cv.Enum.ChatType.Enum_Voice) {
            if (cv.dataHandler.getUserData().nick_name.toString() != "") {
                str = "@" + cv.dataHandler.getUserData().nick_name + "@" + str;
            }
            else {
                str = "@noname@" + str;
            }
        }

        let sendMsg = {
            roomId: roomId,
            cType: cType,
            content: str,
            emoji_type: emojitype,
        };
        let pbbuf = this.encodePB("SendChatReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.SEND_CHAT_REQ);
    }
    public responseSendChat(puf: any) {
        console.log("responseSendChat 000000:");
        let msg = this.decodePB("SendChatResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                cv.StringTools.deepCopy(msg.nextFee, JackfruitMgr.tRoomData.fee);
                JackfruitMgr.tRoomData.barrageLeftSeconds = msg.barrageLeftSeconds;
            } else {
                this.ToastError(msg.code);
            }
        }
    }
    public noticeSendChat(puf: any) {
        console.log("jack noticeSendChat 000000:");
        let msg = this.decodePB("SendChatNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            console.log("jack noticeSendChat 000000: msg.cType" + msg.cType);
            if (roomId != cv.roomManager.getCurrentRoomID()) return;
            if (msg.cType == ChatType.Enum_Emoji) {
                cv.MessageCenter.send("on_SendChat", { seatID: msg.seatId, face: <number>msg.content });
            } else if (msg.cType == ChatType.Enum_Barrage) {
                cv.MessageCenter.send("send_chat_notify", { seatID: msg.seatId, index: <number>msg.content, playerId: msg.playerId });
            } else if (msg.cType == ChatType.Enum_Emoji_Interactive) {
                cv.MessageCenter.send("on_fly_emoji", {Content: msg.content, type: msg.emoji_type});
            } else if (msg.cType == ChatType.Enum_Voice) {
                if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {

                    let content = msg.content;
                    let c = content[0];
                    // if (c == '#') {
                    //     cv.MessageCenter.send("on_fly_emoji", { Content: content });
                    // } else {

                    let acBuffer = msg.content;
                    let subStr = acBuffer.split("@");
                    if (subStr.length <= 0) {
                        return;
                    }
                    let kName = subStr[1];
                    let kUrl = subStr[2];

                    if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
                        if (msg.seatId != cv.JackfruitManager.tRoomData.nSelfSeatID && cv.tools.isPlayVoice()) {
                            let kInfo: CAFInfo = new CAFInfo();
                            kInfo.kUrl = kUrl;
                            kInfo.kSender = kName;
                            kInfo.u32SeatId = msg.seatId;
                                cv.native.PlayRoomVoice(kInfo);
                            let pkPlayer = JackfruitMgr.tRoomData.GetTablePlayerBySeatId(msg.seatId);
                            if (pkPlayer) {
                                pkPlayer.lastVoice = kUrl;
                            }
                        }
                    } else if (cc.sys.os === cc.sys.OS_ANDROID || cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                        if (msg.seatId != cv.JackfruitManager.tRoomData.nSelfSeatID && cv.tools.isPlayVoice()) {
                            let kInfo: CAFInfo = new CAFInfo();
                            kInfo.kUrl = kUrl;
                            kInfo.kSender = kName;
                            kInfo.u32SeatId = msg.seatId;
                            let pkPlayer = JackfruitMgr.tRoomData.GetTablePlayerBySeatId(msg.seatId);
                            if (pkPlayer) {
                                pkPlayer.lastVoice = kUrl;
                            }

                            cv.httpHandler.DoDownloadVoice(kInfo);
                        }
                    }
                }
            }
        }
    }
    public requestBuyIn(amount: number) {
        let sendMsg = {
            amount: cv.StringTools.serverGoldByClient(amount)
        };
        let pbbuf = this.encodePB("BuyInReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.BUY_IN_REQ);
    }
    public responseBuyIn(puf: any) {
        let msg = this.decodePB("BuyInResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                if (JackfruitMgr.tRoomData.nSelfSeatID == -1 && JackfruitMgr.tRoomData.nPrePickSeatID != -1) {
                    this.requestSitDown(cv.roomManager.getCurrentRoomID(), JackfruitMgr.tRoomData.nPrePickSeatID)
                }
            } else {
                this.ToastError(msg.code);
            }
        }
    }
    public noticeBuyIn(puf: any) {
        let msg = this.decodePB("BuyInNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;
            cv.MessageCenter.send("buy_in", msg);
        }
    }
    public requestLeave() {
        let sendMsg = {
            roomId: cv.roomManager.getCurrentRoomID()
        };
        let pbbuf = this.encodePB("LeaveReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.LEAVE_REQ);
    }
    public responseLeave(puf: any) {
        let msg = this.decodePB("LeaveResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                cv.roomManager.onResponse_LeaveRoom(msg);
                JackfruitMgr.tRoomData.reset();
                cv.MessageCenter.send("exit_the_room");
            } else {
                if (cv.roomManager.isEnterMTT && msg.code == jackfruit_proto.ErrorCode.ALREADY_ADD_LEAVE_LIST) {
                    cv.TT.showMsg(cv.config.getStringData("MTT_frame_enter_delay"), cv.Enum.ToastType.ToastTypeWarning);
                }
                else {
                    this.ToastError(msg.code);
                }
            }
        }
    }
    public noticeGameWillStart(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("GameWillStartNotify", puf);
        if (msg) {
            JackfruitMgr.tRoomData.setAllTablePlayerState(ePlayerState.SWaitPlaceCards);
            cv.MessageCenter.send("game_will_start", msg);
        }
    }
    public noticeDeal(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("DealNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;

            JackfruitMgr.tRoomData.actionDelayCountsFee = msg.actionDelayCountsFee;
            cv.MessageCenter.send("notice_deal", msg);
            cv.MessageCenter.send("updata_delay");
        }
    }
    public noticeSquatCards(puf: any) {
        let msg = this.decodePB("SquatCardsNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;
        }
    }
    public noticeGameRoundEnd(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("GameRoundEndNotify", puf);
        if (msg) {
            cv.StringTools.deepCopy(msg, JackfruitMgr.tRoomData.cachedNotifyMsg);
            JackfruitMgr.tRoomData.jackpotLeftAmount = msg.jackpotLeftAmount;

            let plays = JackfruitMgr.tRoomData.cachedNotifyMsg.playerSettle;
            for (let i = 0; i < plays.length; i++) {
                let player = plays[i].player;
                JackfruitMgr.tRoomData.updateTablePlayer(player.playerId, player);
            }
            cv.MessageCenter.send("game_round_end", msg);
            JackfruitMgr.tRoomData.gameUUIDs.push(msg.game_uuid_js);
            cv.MessageCenter.send("updata_record");
        }
    }

    public noticeDestroyRoomNotify(puf: any) {
        let msg = this.decodePB("DestroyRoomNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;

            cv.MessageCenter.send("destroy_room");
        }
    }

    public confirmToContinue(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("ConfirmToContinueNotify", puf);
        if (msg) {
            JackfruitMgr.tRoomData.setAllTablePlayerState(ePlayerState.SClickReady);
            cv.MessageCenter.send("confirm_to_continue", msg.leftSeconds);
        }
    }

    public requestActionDelay(playerID: number) {
        let sendMsg = {
            actionDelayId: playerID
        };
        let pbbuf = this.encodePB("ActionDelayReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.ACTION_DELAY_REQ);
    }

    public resposeActionDelay(puf: any) {
        let msg = this.decodePB("ActionDelayResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                JackfruitMgr.tRoomData.actionDelayCountsFee = msg.actionDelayCountsFee;
                cv.MessageCenter.send("updata_delay");
            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public notifyActionDelay(puf: any) {
        let msg = this.decodePB("ActionDelayNotify", puf);
        if (msg) {
            cv.MessageCenter.send("action_delay", { playerID: msg.playerId, leftSeconds: msg.leftSeconds });
        }
    }

    public requestSituation(roomID: number) {
        let sendMsg = {
            roomId: roomID
        };
        let pbbuf = this.encodePB("SituationReq", sendMsg);
        return this.sendGameMsg(pbbuf, jackfruit_proto.CMD.SITUATION_REQ);
    }

    public resposeSituation(puf: any) {
        let msg = this.decodePB("SituationResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                if (msg.roomId == cv.roomManager.getCurrentRoomID()) {
                    let list = msg.playerBuyInInfo;
                    for (let i = 0; i < list.length; ++i) {
                        let kPlayer = list[i];
                        JackfruitMgr.tRoomData.updateBuyinInfo(kPlayer);
                    }
                    cv.MessageCenter.send("on_jackfruit_situation", msg);
                }
            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public noticeCommunityCards(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("CommunityCardsNotify", puf);
        if (msg) {
            let roomId = msg.roomId;
            if (roomId != cv.roomManager.getCurrentRoomID()) return;
            cv.MessageCenter.send("community_cards", { publicCards: msg.publicCards, roundState: msg.roundState });
        }
    }

    public startPlaceCards(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("StartPlaceCardsNotify", puf);
        if (msg) {
            JackfruitMgr.tRoomData.setAllTablePlayerState(ePlayerState.SPlaceCards);
            cv.MessageCenter.send("start_place_card", msg.leftSeconds);
        }
    }

    public noticeShowstartPlaceCards(puf: any) {
        if (cv.GameDataManager.tRoomData.m_bIsReconnectMode) return;
        let msg = this.decodePB("ShowPlaceCardsNotify", puf);
        if (msg) {
            cv.MessageCenter.send("show_place_card", msg.player);
        }
    }

    /**
     * 发送弹幕
     */
    public requestSendBarrage(msg: string, btype: BarrageType = BarrageType.Enum_System, thump_up_status: number = 1) {
        let roomID = cv.roomManager.getCurrentRoomID();
        let ctype = btype; //弹幕类型
        let content = msg; //弹幕内容

        let sendGameMsg = { roomid: roomID, ctype: ctype, content: content, thump_up_status: thump_up_status };
        let pbbuf = this.encodePB("RequestSendBarrage", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.SEND_BARRAGE_REQ);
    }

    public onBarrageRespones(puf: any) {
        let msg = this.decodePB("ResponseSendBarrage", puf);
        if (msg) {
            if (msg.error == 1) {
                let data = new jackfruit_proto.BarrageCount;
                data.BarrageId = msg.barrageId;
                data.UseCount = msg.useCount;
                cv.GameDataManager.updateBarrageCount(data);
                data = null;
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }
    /**
     * 收到弹幕消息
     * @param puf 
     */
    public onBarrageNotice(puf: any) {
        let msg = this.decodePB("NoticeSendBarrage", puf);
        if (cv.roomManager.getCurrentRoomID() == msg.roomid) {
            if (cv.tools.isShowBarrage()) { //设置可以显示弹幕才添加
                cv.GameDataManager.addDanmuMsg(msg);
            }
        }
    }

    /**
     * 请求弹幕使用次数
     */
    public requestBarrageCount() {
        let roomid = cv.roomManager.getCurrentRoomID();; //房间id
        let sendGameMsg = {};
        let pbbuf = this.encodePB("BarrageCountReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.MsgId_BarrageCount_REQ, roomid);
    }

    /**
     * 收到弹幕使用次数
     */
    public onGetBarrageCountNotice(puf: any) {
        let msg: jackfruit_proto.BarrageCountRsp = this.decodePB("BarrageCountRsp", puf);
        if (msg.error == 1) {
            for (let index = 0; index < msg.Infos.length; index++) {
                cv.GameDataManager.updateBarrageCount(msg.Infos[index]);
            }
            cv.MessageCenter.send("getBarrageCountNotice");
        }
    }

    public noticeWaitingOtherPlayer(puf: any) {
        let msg = this.decodePB("WaitingOtherPlayerNotify", puf);
        if (msg) {
            cv.MessageCenter.send("waiting_other_player_notify");
        }
    }

    public requestChangeTable() {
        let roomid = cv.roomManager.getCurrentRoomID();; //房间id
        let sendGameMsg = {};
        let pbbuf = this.encodePB("ChangeTableReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.CHANGE_TABLE_REQ, roomid);
    }

    public resposeChangeTable(puf: any) {
        let msg:jackfruit_proto.ChangeTableResp = this.decodePB("ChangeTableResp", puf);
        if (msg) {
            switch(msg.code)
            {
                case jackfruit_proto.ErrorCode.OK:{
                } break;
                
                // 发起真人验证
                case jackfruit_proto.ErrorCode.NeedAuthVerify: {
                    cv.MessageCenter.send("on_need_slider_verify", (): void => {
                        cv.jackfruitNet.requestChangeTable();
                    });
                } break;

                // 真人验证错误码(x秒后重新认证)
                case jackfruit_proto.ErrorCode.WaitAuthRefreshCD: {
                    let strKey: string = cv.config.getStringData("slider_verify_toast_result_forbid_txt");
                    cv.TT.showMsg(cv.StringTools.formatC(strKey, msg.authVerifyCD), cv.Enum.ToastType.ToastTypeError);
                } break;

                default: {
                    this.ToastError(msg.code);
                } break;
            }
        }
    }

    public requestSettle() {
        let roomid = cv.roomManager.getCurrentRoomID();; //房间id
        let sendGameMsg = {};
        let pbbuf = this.encodePB("SettleReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.CHANGE_TABLE_REQ, roomid);
    }

    public responseSettle(puf: any) {
        let msg = this.decodePB("SettleResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                cv.MessageCenter.send("total_settle", msg);
            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public notifyCanOperation(puf: any) {
        let msg = this.decodePB("CanOperationNotify", puf);
        if (msg) {
            cv.MessageCenter.send("can_operation");
        }
    }

    public notifyPlayerInfoSync(puf: any) {
        let msg = this.decodePB("PlayerInfoSyncNotify", puf);
        if (msg) {
            cv.MessageCenter.send("player_info_sync", msg);
        }
    }

    public notifyStartMatch(puf: any) {
        let msg = this.decodePB("StartMatchNotify", puf);
        if (msg) {
            cv.MessageCenter.send("updata_start_match", true);
        }
    }

    public notifyMatchResult(puf: any) {
        let msg = this.decodePB("MatchResultNotify", puf);
        if (msg) {
            cv.MessageCenter.send("updata_start_match", false);
        }
    }

    public requestGetGameUUIDS() {
        let roomid = cv.roomManager.getCurrentRoomID();; //房间id
        let sendGameMsg = {};
        let pbbuf = this.encodePB("GetGameUUIdsReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.GetGameUUIds_REQ, roomid);
    }

    public responseGetGameUUIDS(puf: any) {
        let msg = this.decodePB("GetGameUUIdsResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                JackfruitMgr.tRoomData.gameUUIDs = [];
                let len = cv.StringTools.getArrayLength(msg.list);
                for (let i = 0; i < len; i++) {
                    JackfruitMgr.tRoomData.gameUUIDs.push(msg.list[i].game_uuid_js);
                }
            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public requestJackpotData(ante: number) {
        let roomid = cv.roomManager.getCurrentRoomID();; //房间id
        let sendGameMsg = {
            ante: ante
        };
        let pbbuf = this.encodePB("JackpotDataReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.JACKPOT_DATA_REQ, roomid);
    }

    public responseJackpotData(puf: any) {
        let msg = this.decodePB("JackpotDataResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                cv.StringTools.deepCopy(msg.data, JackfruitMgr.tRoomData.jackpotDataInfo);
                JackfruitMgr.tRoomData.jackpotLeftAmount = msg.data.leftAmount;
                cv.MessageCenter.send("updata_jackpotdata");
            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public requestJackpotAwardList(ante: number) {
        let roomid = cv.roomManager.getCurrentRoomID();; //房间id
        let sendGameMsg = {
            ante: ante
        };
        let pbbuf = this.encodePB("JackpotAwardListReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.JACKPOT_AWARD_LIST_REQ, roomid);
    }

    public responseJackpotList(puf: any) {
        let msg = this.decodePB("JackpotAwardListResp", puf);
        if (msg) {
            if (msg.code == jackfruit_proto.ErrorCode.OK) {
                JackfruitMgr.tRoomData.luckyOne.reset();
                JackfruitMgr.tRoomData.JackpotRecords = [];
                cv.StringTools.deepCopy(msg.luckyOne, JackfruitMgr.tRoomData.luckyOne);
                for (let i = 0; i < msg.lastData.length; i++) {
                    let info: JackpotAwardInfo = <JackpotAwardInfo>msg.lastData[i];
                    JackfruitMgr.tRoomData.JackpotRecords.push(info)
                }
                cv.MessageCenter.send("updata_jackpotReward");
            } else {
                this.ToastError(msg.code);
            }
        }
    }

    public notifyModifyPlaceCards(puf: any) {
        let msg = this.decodePB("ModifyPlaceCardsNotify", puf);
        if (msg) {
            if (msg.roomId == cv.roomManager.getCurrentRoomID()) {
                cv.MessageCenter.send("modify_place_card", msg.seatId);
            }
        }
    }

    public notifyBrandBarrage(puf: any) {
        let msg = this.decodePB("BrandBarrageNotify", puf);
        if (msg) {
            if (msg.roomId == cv.roomManager.getCurrentRoomID()) {
                JackfruitMgr.tRoomData.BrandBarrageInfos = [];
                for (let i = 0; i < msg.infos.length; i++) {
                    let data: BrandBarrageInfo = new BrandBarrageInfo();
                    cv.StringTools.deepCopy(msg.infos[i], data);
                    JackfruitMgr.tRoomData.BrandBarrageInfos.push(data);
                }
                cv.MessageCenter.send("brand_barrage");
            }
        }
    }

    /**
     * 请求禁止或者解除限制
     */
    public requestNotDisturb(u32operate: number, u32whoid: number) {
        let roomid = cv.roomManager.getCurrentRoomID(); //房间id
        let sendGameMsg = { operate: u32operate, whoId: u32whoid };
        let pbbuf = this.encodePB("NotDisturbReq", sendGameMsg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.NotDisturb_REQ, roomid);
    }

    public onNotDisturbResponse(puf: any) {
        let msg = this.decodePB("NotDisturbResp", puf);
        if (msg) {
            if (msg.code == 1) {
                cv.MessageCenter.send("NotDisturb", msg);
            }
            else {
                cv.ToastError(msg.code);
            }
        }
    }

    public requestLike(likeid: number) {
        let like = {likeUid: likeid};
        let roomid = cv.roomManager.getCurrentRoomID();
        let pbbuf = this.encodePB("LikeRequest", like);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.Like_REQ, roomid);
    }

    public onLikeResponse(puf: any) {
        let msg = this.decodePB("LikeResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().pokerdata.liked_count = msg.likedCount;
                //msg.likeUid
                cv.MessageCenter.send("like", msg);
            }
            else
            {
                cv.ToastError(msg.error);
            }
        }
    }

    public onLikeNotice(puf: any) {
        let msg = this.decodePB("LikeNotice", puf);
        if (msg) {
            //xxx为你点赞
            cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("Star_like"), msg.nickname), cv.Enum.ToastType.ToastTypeSuccess);
        }
    }

    public requestIsEmojiFree(emojitype: jackfruit_proto.EmojiType) {
        let msg = {type: emojitype};
        let roomid = cv.roomManager.getCurrentRoomID();
        let pbbuf = this.encodePB("IsEmojiFreeReq", msg);
        this.sendGameMsg(pbbuf, jackfruit_proto.CMD.IsEmojiFree_REQ, roomid);
    }

    public responseIsEmojiFree(puf: any) {
        let msg = this.decodePB("IsEmojiFreeResp", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    public IsEmojiFreeNotice(puf: any) {
        let msg = this.decodePB("IsEmojiFreeNotify", puf);
        if (msg) {
            cv.MessageCenter.send("IsEmojiFree", msg);
        }
    }

    public onGoodFriendJoinTable(puf: any) {
        let msg = this.decodePB("GoodFriendJoinTableNotify", puf);
        if (msg) {
            cv.MessageCenter.send("welcome", msg)
        }
    }

    public IntimacyUpNotice(puf: any) {
        let msg = this.decodePB("NoticeIntimacyUp", puf);
        if (msg) {
            cv.MessageCenter.send("on_intimacy", msg);
        }
    }
}