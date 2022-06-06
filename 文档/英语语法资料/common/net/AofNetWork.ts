import gm_protocol = require("./../../../Script/common/pb/gs_protocol");
import game_pb = gm_protocol.protocol;

import cv from "../../components/lobby/cv";
import { NetWorkProxy } from "./NetWorkProxy";
import GameDataManager from "../../components/game/dzPoker/data/GameDataManager";
import { BuyinPlayerInfo, PlayerInfo, CAFInfo } from "../../components/game/dzPoker/data/RoomData";
import { PushNoticeData, PushNoticeType, PushNotice } from "../prefab/PushNotice";
export class AofNetWork extends NetWorkProxy {
    public static instance: AofNetWork;

    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.Allin);
    }
    public init() {
        //注册消息
        this.registerMsg(game_pb.MSGID.MsgID_Logon_Response, this.responseLoginServer.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_HeartBeat_Response, this.responseHeartBeat.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_SitDown_Response, this.ResponseSitDown.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_SitDown_Notice, this.NoticeSitDown.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Buyin_Response, this.ResponseBuyin.bind(this));
        // this.registerMsg(game_pb.MSGID.MsgID_Buyin_To_Owner_Notice, this.NoticeBuyinToOwner.bind(this));
        // this.registerMsg(game_pb.MSGID.MsgID_Buyin_To_Applicant_Notice, this.NoticeBuyinToApplication.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Buyin_Notice, this.NoticeBuyin.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ModifyBuyinLimit_Response, this.ResponseModifyBuyinLimit.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ModifyBuyinLimit_Notice, this.NoticeModifyBuyinLimit.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Room_Situation_Response, this.ResponseRoomSituation.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Room_Situation_Notice, this.NoticeRoomSituation.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_JoinRoom_Response, this.JoinRoomResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_Snapshot_Notice, this.NoticeGameSnapShot.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_GameActionTurn_Response, this.ResponseGameActionTurn.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Standup_Response, this.ResponseStandup.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Standup_Notice, this.NoticeStandup.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_DestroyRoom_Response, this.ResponseDestroyRoom.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_DestroyRoom_Notice, this.NoticeDestroyRoom.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ResetGame_Notice, this.NoticeResetGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_ElectDealer_Notice, this.NoticeGameElectDealer.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_Blind_Notice, this.NoticeGameBlind.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_HoleCard_Notice, this.NoticeGameHoleCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PlayerActionTurn_Notice, this.NoticePlayerActionTurn.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_BackPosition_Response, this.ResponsePlayerBackPosition.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_BackPosition_Notice, this.NoticePlayerBackPosition.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PlayerAction_Notice, this.NoticePlayerAction.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_RoundEnd_Notice, this.NoticeGameRoundEnd.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_CommunityCards_Notice, this.NoticeGameCommunityCards.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_Settlement_Notice, this.NoticeGameSettleMent.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ShowCard_Notice, this.NoticePlayerShowCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_Ante_Notice, this.NoticeGameAnte.bind(this));
        //保位离桌
        this.registerMsg(game_pb.MSGID.MsgID_StayPosition_Response, this.ResponseStayPosition.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_StayPosition_Notice, this.NoticePlayerStayPosition.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_Waiting_OtherPlayer_Notice, this.NoticeWaitingOtherPlayer.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PauseGame_Response, this.ResponsePauseGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PauseGame_Notice, this.NoticePauseGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_AddRoomTimeCount_response, this.Response_AddRoomTimeCount.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_AddRommExTimeLeft_Notice, this.NoticeAddRoomTimeCount.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_LeaveRoom_Response, this.Response_LeaveRoom.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_StartGame_Response, this.ResponseStartGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_StartGame_Notice, this.NoticeStartGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_RealStart_Notice, this.NoticeRealStart.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_DefaultFold_Response, this.ResponseDefaultFold.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Buyout_Response, this.ResponseBuyout.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Buyout_Notice, this.NoticeBuyout.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Action_Response, this.ResponseAction.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_Game_ShowDown_Notice, this.NoticeGameShowDown.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_CheckAllianceRoomPriviledge_Response, this.responseCheckAllianceRoomPriviledge.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ForceStandup_Response, this.HandleForceStandupResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ForceStandup_Notice, this.HandleForceStandupNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ProhibitSitdown_Response, this.HandleProhibitSitdownResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ProhibitSitdown_Notice, this.HandleProhibitSitdownNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PhotoVerify_Response, this.HandlePhotoVerifyResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PhotoVerify_Notice, this.HandlePhotoVerifyNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_NotiPlayerHoleCard_Notice, this.HandleNotiPlayerHoleCardNotice.bind(this));

        // 保险相关回调注册
        this.registerMsg(game_pb.MSGID.MsgID_BuyInsurance_Response, this._ResponseBuyInsurance.bind(this));                    // 保险通知
        this.registerMsg(game_pb.MSGID.MsgID_Game_Insurance_Notice, this._NoticeGameInsurance.bind(this));                     // 保险通知
        this.registerMsg(game_pb.MSGID.MsgID_BuyInsuranceResult_Notice, this._NoticeBuyInsurance.bind(this));                  // 购买保险结果通知
        this.registerMsg(game_pb.MSGID.MsgID_InsuranceToomanyLeader_Notice, this._NoticeInsuranceToomanyLeader.bind(this));    // 当前最大底池有多个领先者，无法购买保险
        this.registerMsg(game_pb.MSGID.MsgID_InsuranceHitOuts_Notice, this._NoticeInsuranceHitOuts.bind(this));                // 击中outs
        this.registerMsg(game_pb.MSGID.MsgID_InsuranceMissOuts_Notice, this._NoticeInsuranceMissOuts.bind(this));              // 未击中outs
        this.registerMsg(game_pb.MSGID.MsgID_NoNeedInsurance_Notice, this._NoticeNoNeedInsurace.bind(this));                   // 本轮无需购买保险通知
        this.registerMsg(game_pb.MSGID.MsgID_AddInsuranceTime_Response, this._ResponseAddInsuranceTime.bind(this));            // 保险延时通知
        this.registerMsg(game_pb.MSGID.MsgID_AddInsuranceTime_Notice, this._NoticeAddInsuranceTime.bind(this));                // 保险延时通知
        this.registerMsg(game_pb.MSGID.MsgID_NotSupport_Insurance_Notice, this._NoticeNotSupportInsurance.bind(this));         // 最大底池超过3人, 不提供保险

        //发发看
        this.registerMsg(game_pb.MSGID.MsgID_SendCard_Fun_Response, this.ResponsePlayerSendCardFun.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_SendCard_Fun_Notice, this.NoticePlayerSendCardFun.bind(this));
        //强制亮牌
        this.registerMsg(game_pb.MSGID.MsgID_ForceShowCard_Response, this.ResponseForceShowCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ForceShowCard_Notice, this.NoticeForceShowCard.bind(this));
        //发表情
        this.registerMsg(game_pb.MSGID.MsgID_InteractiveExpression_Response, this.HandleInteractiveExpressionResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_InteractiveExpression_Notice, this.HandleInteractiveExpressionNotice.bind(this));
        //提前离桌
        this.registerMsg(game_pb.MSGID.MsgID_CheckOutAndLeave_Response, this.ResponseCheckOutAndLeave.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_CheckOutAndLeave_Notice, this.NoticeCheckOutAndLeave.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_InitiativeDestroyRoom_Notice, this.RoomNoticeInitiativeDestroy.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_AddActionTime_Notice, this.NoticeAddActionTime.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_ResponseCheckFirstTimeJoinRoomWithPassword, this.HandResponseJoinRoomWithFirst.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ResponseJoinRoomWithPassword, this.HandResponseJoinRoomWithPassword.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ResponseCheckFirstTimeBuyinWithPassword, this.HandResponseBuyinWithFirst.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_UpdateMoney_Notice, this.HandResponsePlayerStake.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ResponseCheckBuyinPassword, this.HandBuyinResponsePwd.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_SendChat_Response, this.ResponseSendChat.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_SendChat_Notice, this.NoticeSendChat.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_AddRoomTime_Response, this.ResponseAddRoomTime.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_AddRoomTime_Notice, this.NoticeAddRoomTime.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ShowCard_Response, this.ResponsePlayerShowCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ShowCard_Response, this.NoticePlayerShowCard.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_Snapshot_Response, this.ResponseSnapshot.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_GlobalMessage_Notice, this.HandleNoticeGlobalMessage.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_GetGameUUIdsJs_Response, this.ResponseGetGameUUIdsJsMessage.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GetGameUUIdsJs_Notice, this.NoticeGetGameUUIdsJsMessage.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_PlayerBuyinsInfo_Response, this.ResponsePlayerBuyinsInfo.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PlayerBuyinsInfo_Notice, this.NoticePlayerBuyinsInfo.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_BeginBet_Notice, this.NoticeGuessHandCardBeginBet.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_Bet_Response, this.ResponseGuessHandCardBet.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_SetBetOpt_Response, this.ResponseGuessHandCardSetBetOpt.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_Settle_Notice, this.NoticeGuessHandCardSettle.bind(this));
    }
    public sendGameMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number = 2, ServerId: number = 20): boolean {
        return this.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
    }

    public NoticeAddActionTime(pbbuf) {
        let msg = this.decodePB("NoticeAddActionTime", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("add_action_time", msg);
        }
    }
    public RoomNoticeInitiativeDestroy(pbbuf) {
        let msg = this.decodePB("NoticeInitiativeDestroyRoom", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.TT.showMsg(cv.config.getStringData("InitiativeDestroyRoom"), cv.Enum.ToastType.ToastTypeInfo);
        } else {
            cv.ToastError(msg.error);
        }
    }
    public NoticeGameShowDown(pbbuf) {
        let msg = this.decodePB("NoticeGameShowDown", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_showdown_noti", msg);
        }
    }
    public ResponseAction(pbbuf) {
        let msg = this.decodePB("ResponseAction", pbbuf);
        cv.ToastError(msg.error);
    }
    public RequestDefaultFold(u32RoomId, type) {
        let RequestDefaultFold = cv.gamePB.lookupType("RequestDefaultFold");
        let sendGameMsg: object = { roomid: u32RoomId, type: type };
        let pbbuf = RequestDefaultFold.encode(sendGameMsg).finish();
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_DefaultFold_Request, u32RoomId);
    }
    public ResponseDefaultFold(pbbuf) {
        let msg = this.decodePB("ResponseDefaultFold", pbbuf);
    }
    public NoticeRealStart(pbbuf) {
        let msg = this.decodePB("NoticeRealStart", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            // cv.GameDataManager.tRoomData.u32StartTime = msg.starttime;
            cv.GameDataManager.tRoomData.pkRoomState.isBegin = true;
            cv.MessageCenter.send("StartGame");
        }
    }
    public NoticeWaitingOtherPlayer(pbbuf) {
        let msg = this.decodePB("NoticeWaitingOtherPlayer", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.GameDataManager.tGameData.game_settlement_uuid = "";
            cv.MessageCenter.send("on_waiting_other_player");
        }
    }
    /**
     * 
     * @param roomId 
     * @param index 0和1表示第几张牌，如果传2表示两张牌都show
     * @param isshow 
     */
    public RequestShowCard(roomId: number, index: number, isshow: boolean) {
        let sendGameMsg = { roomid: roomId, cards: index, is_show: isshow };
        let pbbuf = this.encodePB("RequestShowCard", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ShowCard_Request, roomId);
    }

    public ResponsePlayerShowCard(pbbuf) {
        let msg = this.decodePB("ResponseShowCard", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            console.log(msg.error);
        }
    }


    public NoticePlayerShowCard(pbbuf) {
        let msg = this.decodePB("NoticePlayerShow", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("player_show_cards", msg);
        }
    }
    public NoticeGameAnte(pbbuf) {
        let msg = this.decodePB("NoticeGameAnte", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_anti_noti", msg);
        }
    }
    public NoticeGameSettleMent(pbbuf) {
        let ResponseWorldLogon = cv.gamePB.lookupType("NoticeGameSettlement");
        let msg: any = null;
        if (ResponseWorldLogon) {
            let buffer = new Uint8Array(pbbuf);
            msg = ResponseWorldLogon.decode(buffer);
            console.log(msg);
        }

        //let msg = this.decodePB("NoticeGameSettlement", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {

            let bHad = false;
            for (let i = 0; i < cv.GameDataManager.tRoomData.game_uuids_js.length; i++) {
                if (cv.GameDataManager.tRoomData.game_uuids_js[i] == msg.gameuuid_js) {
                    bHad = true;
                    break;
                }
            }
            if (!bHad) {
                cv.GameDataManager.tRoomData.game_uuids_js.push(msg.gameuuid_js);
            }

            cv.GameDataManager.tGameData.game_settlement_uuid = msg.gameuuid_js;
            cv.MessageCenter.send("on_game_settlement_noti", msg);
        }
    }
    public NoticeGameCommunityCards(pbbuf) {
        let msg = this.decodePB("NoticeCommunityCards", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_communitycard_noti", msg);
        }
    }
    public NoticeGameRoundEnd(pbbuf) {
        let msg = this.decodePB("NoticeGameRoundEnd", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_endround_noti", msg);
        }
    }
    public NoticePlayerAction(pbbuf) {
        let msg = this.decodePB("NoticePlayerAction", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_action_noti", msg);
        }
    }

    public NoticePlayerBackPosition(pbbuf) {
        let msg = this.decodePB("NoticeBackPosition", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.GameDataManager.tRoomData.updateTablePlayer(msg.player.playerid, msg.player);
            cv.MessageCenter.send("on_back_seat", msg.player.playerid);
        }
    }
    public ResponsePlayerBackPosition(pbbuf) {
        let msg = this.decodePB("ResponseBackPosition", pbbuf);
        if (msg.error == 32) {
            cv.MessageCenter.send("on_need_buyin");
        }
        else {
            //ToastError(resp.error());
        }
    }
    public NoticeStartGame(pbbuf) {
        let msg = this.decodePB("NoticeStartGame", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_startgame_noti");
        }
    }
    public ResponseStartGame(pbbuf) {
        let msg = this.decodePB("ResponseStartGame", pbbuf);
        if (msg.error == 1) {
            cv.MessageCenter.send("on_startgame_succ");
        } else {
            //ToastError(resp.error());
        }
    }
    public NoticeResetGame(pbbuf) {
        let msg = this.decodePB("NoticeResetGame", pbbuf);
        console.log(msg);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_resetgame_noti", msg);
        }
    }
    public NoticeGameElectDealer(pbbuf) {
        let msg = this.decodePB("NoticeGameElectDealer", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_elect_dealer_noti", msg);
        }
    }
    public NoticeGameBlind(pbbuf) {
        let msg = this.decodePB("NoticeGameBlind", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_blind_noti", msg);
        }

    }
    public NoticeGameHoleCard(pbbuf) {
        let msg = this.decodePB("NoticeGameHolecard", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_holecard_noti", msg);
        }
    }
    public NoticePlayerActionTurn(pbbuf) {
        let msg = this.decodePB("NoticePlayerActionTurn", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_action_turn_noti", msg);
        }
    }
    public RequestAction(u32RoomId: number, eType: number, u32Amount: number) {
        let user_token = cv.dataHandler.getUserData().user_token;
        let LoginModule = cv.gamePB.lookupType("RequestAction");
        u32Amount = cv.StringTools.serverGoldByClient(u32Amount);

        if (LoginModule) {

            let sendGameMsg: object = { roomid: u32RoomId, amount: u32Amount, action: eType, ActionSeq: cv.GameDataManager.tGameData.m_u32ActionSeq, token: user_token };
            console.log(sendGameMsg);
            let pbbuf = LoginModule.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Action_Request, u32RoomId);
            cv.GameDataManager.tGameData.m_bIsOnSelfAction = false;
        }
    }

    public RequestBackPosition(u32RoomId: number) {
        let sendGameMsg = { roomid: u32RoomId };
        let LoginModule = cv.gamePB.lookupType("RequestBackPosition");
        if (LoginModule) {
            let pbbuf = LoginModule.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_BackPosition_Request, u32RoomId);
        }
    }
    public RequestStartGame(u32RoomId: number) {
        let sendGameMsg = { roomid: u32RoomId };
        let LoginModule = cv.gamePB.lookupType("RequestStartGame");
        if (LoginModule) {
            let pbbuf = LoginModule.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_StartGame_Request, u32RoomId);
        }
    }

    public requestLoginServer() {
        console.log("====> Game websocket was opened.");
        let user_token = cv.dataHandler.getUserData().user_token;
        let Version = cv.config.GET_CLIENT_VERSION();
        let device_info = cv.dataHandler.getUserData().deviceInfo;
        if (cv.StringTools.getArrayLength(device_info) == 0) {
            device_info = cv.native.GetDeviceUUID(true);
        }

        let client_type = cv.config.GET_CLIENT_TYPE();
        let LoginModule = cv.gamePB.lookupType("RequestLogon");
        if (LoginModule) {
            let sendGameMsg: object = { token: user_token, version: Version, position: this.getPositionInfo(), device_info: device_info, client_type: client_type };
            let pbbuf = LoginModule.encode(sendGameMsg).finish();
            console.log(pbbuf);

            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Logon_Request, 0);
        }
    }

    public responseLoginServer(puf) {
        let ResponseGameLogon = cv.gamePB.lookupType("ResponseLogon");
        if (ResponseGameLogon) {
            let buffer = new Uint8Array(puf);
            let data = ResponseGameLogon.decode(buffer);
            let error = data.error;
            console.log(data);
            if (error == 1) {
                if (data.roomid != 0) {//如果有房间ID说明为重连，需要重新判断是否禁止模拟器入座
                    if (!data.anti_simulator) {
                        if (cv.native.IsSimulator()) {
                            let num = data.anti_simulator_ignore_cond;
                            if (num > 0) {
                                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIEmulatorErrorText_1"), num), cv.Enum.ToastType.ToastTypeWarning);
                            } else {
                                cv.TT.showMsg(cv.config.getStringData("UIEmulatorErrorText"), cv.Enum.ToastType.ToastTypeWarning);
                            }
                            cv.netWorkManager.closeGameConnect();
                            cv.SwitchLoadingView.hide();
                            return;
                        }
                    }
                    cv.roomManager.setCurrentRoomID(data.roomid);
                }
                cv.netWorkManager.OnGameServerLogin(error);
            } else {
                cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
                cv.SwitchLoadingView.hide();
                cv.ToastError(error);
            }
        }
    }

    public RequestJoinRoom(roomId: number, isQuick: boolean = false) {
        let sendGameMsg = { roomid: roomId, is_quick_sit: isQuick };
        let pbbuf = this.encodePB("RequestJoinRoom", sendGameMsg);

        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_JoinRoom_Request, roomId);
        } else {
            this.requestLoginServer();
        }
    }

    public JoinRoomResponse(puf: any) {
        let data = this.decodePB("ResponseJoinRoom", puf);
        if (data) {
            cv.roomManager.onJoinRoomResponse(data);
        }
    }

    // 购买保险
    public RequestBuyInsurance(nRoomId: number, vOuts: number[], nAmount: number, bBuy: boolean, option: number): boolean {
        let ret = cv.gamePB.lookupType("RequestBuyInsurance");
        if (ret) {
            nAmount = cv.StringTools.serverGoldByClient(nAmount);
            let seq = cv.GameDataManager.tGameData.m_u32InsuranceSeq;
            let outs: number[] = [];
            for (let i = 0; i < cv.StringTools.getArrayLength(vOuts); ++i) {
                outs.push(vOuts[i]);
            }

            let sendGameMsg = { roomid: nRoomId, amount: nAmount, outs_id: outs, action_seq: seq, is_buy: bBuy, option: option };
            let pbbuf = ret.encode(sendGameMsg).finish();

            return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_BuyInsurance_Request, nRoomId);
        }
        return false;
    }
    private _ResponseBuyInsurance(puf): void {
        let resp: game_pb.ResponseBuyInsurance = this.decodePB("ResponseBuyInsurance", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticeGameInsurance(pbbuf) {
        let noti: game_pb.NoticeGameInsurance = this.decodePB("NoticeGameInsurance", pbbuf);
        if (noti && noti.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_need_buy_insurance", noti);
        }
    }

    // 购买保险结果通知
    private _NoticeBuyInsurance(puf): void {
        let noti: game_pb.NoticeBuyInsuranceResult = this.decodePB("NoticeBuyInsuranceResult", puf);
        if (noti && noti.room_id === cv.GameDataManager.tRoomData.u32RoomId) {
            if (noti.result) {
                cv.MessageCenter.send("player_do_buy_insurance", noti);
            }
            else {
                cv.MessageCenter.send("player_not_buy_insurance", noti);
            }
        }
    }

    // 当前最大底池有多个领先者，无法购买保险
    private _NoticeInsuranceToomanyLeader(puf): void {
        let noti: game_pb.NoticeInsuranceToomanyLeader = this.decodePB("NoticeInsuranceToomanyLeader", puf);
        if (noti && noti.room_id === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips5"), cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    // 击中outs赔付
    private _NoticeInsuranceHitOuts(puf): void {
        let noti: game_pb.NoticeInsuranceHitOuts = this.decodePB("NoticeInsuranceHitOuts", puf);
        if (noti && noti.room_id === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("player_hit_the_outs", noti);
        }
    }

    // 未击中outs
    private _NoticeInsuranceMissOuts(puf): void {
        let noti: game_pb.NoticeInsuranceMissOuts = this.decodePB("NoticeInsuranceMissOuts", puf);
        if (noti && noti.room_id === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("player_miss_the_outs", noti);
        }
    }

    // 本轮无需购买保险通知
    private _NoticeNoNeedInsurace(puf): void {
        let noti: game_pb.NoticeInsuranceMissOuts = this.decodePB("NoticeNoNeedInsurance", puf);
        if (noti) {
            if (noti.room_id === cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("no_need_insurace", noti);
            }
        }
    }

    // 添加保险延时时间
    public RequestAddInsuranceTime(room_id: number): boolean {
        let ret = cv.gamePB.lookupType("RequestAddInsuranceTime");
        if (ret) {
            let sendGameMsg = { roomid: room_id, action_seq: cv.GameDataManager.tGameData.m_u32InsuranceSeq };
            let pbbuf = ret.encode(sendGameMsg).finish();
            return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_AddInsuranceTime_Request, room_id);
        }
        return false;
    }
    private _ResponseAddInsuranceTime(puf): void {
        let resp: game_pb.ResponseAddInsuranceTime = this.decodePB("ResponseAddInsuranceTime", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticeAddInsuranceTime(puf): void {
        let noti: game_pb.NoticeAddInsuranceTime = this.decodePB("NoticeAddInsuranceTime", puf);
        if (noti) {
            if (noti.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("add_insurance_time", noti);
            }
        }
    }

    private _NoticeNotSupportInsurance(puf): void {
        let noti: game_pb.NoticeNotSupportInsurance = this.decodePB("NoticeNotSupportInsurance", puf);
        if (noti && noti.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips17"), cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    public NoticeGameSnapShot(puf: any) {
        let result = this.decodePB("NoticeGameSnapshot", puf);
        let roomid: number = result.roomid;
        if (roomid === cv.roomManager.getCurrentRoomID()) {
            cv.GameDataManager.tGameData.reset();
            cv.GameDataManager.tRoomData.reset();
            cv.GameDataManager.tRoomData.hasRecvNoticeGameSnapShot = true;//退出房间的时候置为false;
            cv.GameDataManager.tRoomData.u32RoomId = result.roomid;
            cv.GameDataManager.tRoomData.u32GameID = result.gameid;
            cv.GameDataManager.tRoomData.u32OwnerId = result.room_owner_id;
            // cv.GameDataManager.tRoomData.u32BuyinLimit = result.self_buyin_limit;
            cv.GameDataManager.tRoomData.u32Buyin = result.self_buyin;
            // cv.GameDataManager.tRoomData.u32CreateTime = result.room_create_time;
            cv.StringTools.deepCopy(result.params, cv.GameDataManager.tRoomData.pkRoomParam);
            cv.StringTools.deepCopy(result.rstate, cv.GameDataManager.tRoomData.pkRoomState);
            cv.StringTools.deepCopy(result.tstate, cv.GameDataManager.tRoomData.pkTableStates);
            // cv.GameDataManager.tRoomData.u32StartTime = result.room_start_time;
            cv.GameDataManager.tRoomData.u32Stake = result.self_stake;
            // cv.GameDataManager.tRoomData.last_buyin_clubid = result.last_buyin_clubid;
            // cv.GameDataManager.tRoomData.last_buyin_ownerid = result.last_buyin_ownerid;
            // cv.GameDataManager.tRoomData.last_buyin_allianceId = result.last_buyin_allianceid;
            // cv.StringTools.deepCopy(result.clubInfos, cv.GameDataManager.tRoomData.clubInfos);
            cv.GameDataManager.tRoomData.m_kStraddleList.push(cv.GameDataManager.tRoomData.pkTableStates.curr_straddle_seatid);
            cv.GameDataManager.tRoomData.game_uuids_js = [];
            //提取所有的牌谱ID
            let len = result.game_uuids_js.length;
            for (let i = 0; i < len; i++) {
                cv.GameDataManager.tRoomData.game_uuids_js.push(result.game_uuids_js[i].game_uuid_js);
            }
            cv.StringTools.deepCopy(result.allFeeItems, cv.GameDataManager.tRoomData.pkPayMoneyItem);
            cv.GameDataManager.tRoomData.kingBee = cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee2.needCoin;
            cv.GameDataManager.tRoomData.is_quick_sit = result.is_quick_sit;
            cv.GameDataManager.tGameData.i32RoomId = result.roomid;
            cv.GameDataManager.tGameData.i32DealerSId = cv.GameDataManager.tRoomData.pkTableStates.curr_dealer_seatid;
            cv.GameDataManager.tGameData.i32SBSid = cv.GameDataManager.tRoomData.pkTableStates.curr_sb_seatid;
            cv.GameDataManager.tGameData.i32BBSid = cv.GameDataManager.tRoomData.pkTableStates.curr_bb_seatid;
            cv.GameDataManager.tRoomData.anyoneAllin = result.anyoneAllin;

            cv.dataHandler.getUserData().m_totalBuyOut = result.total_buyout;
            for (let i = 0; i < cv.GameDataManager.tRoomData.pkTableStates.players.length; i++) {
                let player: PlayerInfo = cv.GameDataManager.tRoomData.pkTableStates.players[i];
                cv.GameDataManager.tRoomData.addTablePlayer(player);
                if (player.playerid === cv.dataHandler.getUserData().u32Uid) {
                    cv.GameDataManager.tGameData.m_u32RoundBet = player.round_bet;
                }
            }
            cv.StringTools.deepCopy(result.prohibit_sitdown_list, cv.GameDataManager.tRoomData.prohibit_sitdown_list);
            cv.StringTools.deepCopy(result.buyin_infos, cv.GameDataManager.tRoomData.buyinInfos);
        }
        if (result.autoaddactiontime_count > 0) {
            cv.TT.showMsg(cv.config.getStringData("AutoAddTimeTips" + result.autoaddactiontime_count), cv.Enum.ToastType.ToastTypeSuccess);
        }
        cv.GameDataManager.tGameData.m_u32AddTimeCount = result.actiontime_count;
        cv.StringTools.deepCopy(result.club_createrids, cv.GameDataManager.tGameData.club_createrids);

        cv.MessageCenter.send("on_snapshot_roominfo");
        this.RequestGetGameUUIdsJs(roomid);
    }

    public RequestSitdown(Roomid: number, severId: number) {
        let SitdownModule = cv.gamePB.lookupType("RequestSitDown");
        if (SitdownModule) {
            let kLocation: object = cv.native.GetLocation();
            let Ip = cv.dataHandler.getUserData().user_ip == null ? "127.0.0.1" : cv.dataHandler.getUserData().user_ip;
            let PositionInfo = { latitude: kLocation["latitude"], longtitude: kLocation["longitude"], ip: Ip };
            let sendGameMsg = { roomid: Roomid, seatid: severId, position: PositionInfo };
            let pbbuf = SitdownModule.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_SitDown_Request, Roomid);//c++里面没有第3个参数
        }
    }

    public RequestSituation(roomid: number) {
        let Situation = cv.gamePB.lookupType("RequestRoomSituation");
        if (Situation) {
            let sendGameMsg = { roomid: roomid };
            let pbbuf = Situation.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Room_Situation_Request, roomid);
        }
    }

    public ResponseSitDown(puf) {
        let ResponseSitDown = cv.gamePB.lookupType("ResponseSitDown");
        if (ResponseSitDown) {
            let recvMsg = new Uint8Array(puf);
            let result = ResponseSitDown.decode(recvMsg);
            console.log(result);
            let error = result.error;
            if (error == 32) {
                cv.MessageCenter.send("on_need_buyin");
            }
            else if (error == 97) {
                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ServerErrorCode97"), result.playername.toString()), cv.Enum.ToastType.ToastTypeError);
            }
            else {
                cv.ToastError(result.error);
            }
        }
    }
    public NoticeSitDown(pbbuf) {
        let msg = this.decodePB("NoticeSitDown", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            let player: PlayerInfo = msg.player;
            cv.GameDataManager.tRoomData.addTablePlayer(player);
            cv.MessageCenter.send("on_sitdown_succ", player.playerid);
        }
    }

    public requestHeartBeat(): boolean {
        let RequestHeartBeat = cv.gamePB.lookupType("RequestHeartBeat");
        if (RequestHeartBeat) {
            let sendGameMsg = { uid: cv.dataHandler.getUserData().u32Uid, position: this.getPositionInfo() };
            let pbbuf = RequestHeartBeat.encode(sendGameMsg).finish();
            return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_HeartBeat_Request, 0);
        }
    }

    public responseHeartBeat(puf) {
        let tempModule = cv.gamePB.lookupType("ResponseHeartBeat");
        if (tempModule) {
            let recvMsg = new Uint8Array(puf)
            let result = tempModule.decode(recvMsg);
            if (result != null) {
                let error = result.uid;
                console.log("uid::->>" + error);
                cv.netWorkManager.onGameHeartBeat();
            }
        }
    }

    public getPositionInfo(): any {
        let PositionInfoModule = cv.gamePB.lookupType("PositionInfo");
        if (PositionInfoModule) {
            let tempInfo = cv.native.GetLocation();
            let ip = cv.dataHandler.getUserData().user_ip;
            var obj = { longtitude: tempInfo["latitude"], latitude: tempInfo["longitude"], ip: (ip == null) ? "127.0.0.1" : ip };
            return obj;
        }
    }

    public RequestBuyin(u32RoomId: number, u32Amount: number, ownerid: number, clubid: number, allianceid: number): boolean {
        let RequestBuyin = cv.gamePB.lookupType("RequestBuyin");
        if (RequestBuyin) {
            let amount = cv.StringTools.serverGoldByClient(u32Amount);
            let sendGameMsg = { roomid: u32RoomId, amount: amount, ownerid: ownerid, clubid: clubid, allianceid: allianceid };
            let pbbuf = RequestBuyin.encode(sendGameMsg).finish();
            return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Buyin_Request, u32RoomId);
        }
    }

    public RequestBuyout(u32RoomId: number, u32Amount: number) {
        let RequestBuyout = cv.gamePB.lookupType("RequestBuyout");
        if (RequestBuyout) {
            let sendGameMsg = { roomid: u32RoomId, buyout_gold: cv.StringTools.serverGoldByClient(u32Amount) }
            let pbbuf = RequestBuyout.encode(sendGameMsg).finish();
            return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Buyout_Request, u32RoomId);
        }
    }

    public RequestModifyBuyinLimit(u32RoomId: number, u32Buyin: number, ownerid: number, clubid: number, clubname: string): boolean {
        let RequestModifyBuyinLimit = cv.gamePB.lookupType("RequestModifyBuyinLimit");
        if (RequestModifyBuyinLimit) {
            let sendGameMsg = { buyin_limit: cv.StringTools.serverGoldByClient(u32Buyin), last_buyin_clubid: clubid, last_buyin_ownerid: ownerid, last_buyin_clubname: clubname };
            let pbbuf = RequestModifyBuyinLimit.encode(sendGameMsg).finish();
            return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ModifyBuyinLimit_Request, u32RoomId);
        }
    }

    public RequestGameActionTurn(roomid: number) {
        let RequestGameActionTurn = cv.gamePB.lookupType("RequestGameActionTurn");
        if (RequestGameActionTurn) {
            let Token: string = cv.dataHandler.getUserData().user_token;
            if (Token === "") {
                ///Token = g_pkTool->GetStringByCCFile("user_token");
                //if (Token.empty()) return;
                return;
            }
            let sendGameMsg = { roomid: roomid, token: Token };
            let pbbuf = RequestGameActionTurn.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_GameActionTurn_Request, roomid);
        }
    }

    public ResponseGameActionTurn(puf) {
        let ResponseGameActionTurn = cv.gamePB.lookupType("ResponseGameActionTurn");
        if (ResponseGameActionTurn) {
            let buffer = new Uint8Array(puf);
            let data = ResponseGameActionTurn.decode(buffer);
            let error = data.error;
            console.log(data);
            //ToastError(resp.error());
        }
    }

    public ResponseBuyin(puf) {
        let ResponseBuyin = cv.gamePB.lookupType("ResponseBuyin");
        if (ResponseBuyin) {
            let recvMsg = new Uint8Array(puf);
            let ret = ResponseBuyin.decode(recvMsg);
            let error = ret.error;
            let playername = ret.playername;
            if (error == 43) {
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + error), cv.Enum.ToastType.ToastTypeError);
            }
            else if (error === 97) {
                cv.TT.showMsg(cv.StringTools.formatC("%s", cv.config.getStringData("ServerErrorCode" + error) + playername), cv.Enum.ToastType.ToastTypeError);
            }
            else {
                cv.ToastError(error);
            }
        }
    }

    public NoticeBuyin(puf) {
        let NoticeBuyin = cv.gamePB.lookupType("NoticeBuyin");
        if (NoticeBuyin) {
            let recvMsg = new Uint8Array(puf);
            let ret = NoticeBuyin.decode(recvMsg);
            if (ret.roomid == GameDataManager.tRoomData.u32RoomId) {
                //cv.TT.showMsg(cv.config.getStringData("ErrorToast26"), cv.Enum.ToastType.ToastTypeSuccess);\
                if (ret.playerid == cv.dataHandler.getUserData().u32Uid) {
                    // GameDataManager.tRoomData.u32BuyinLimit = ret.self_buyin_limit;
                    GameDataManager.tRoomData.u32Buyin = ret.self_buyin;
                    GameDataManager.tRoomData.buyinAmount = ret.buyin_amount;
                    cv.worldNet.requestGetUserData();
                    cv.dataHandler.getUserData().m_totalBuyOut = ret.self_buyout;
                    cv.MessageCenter.send("on_update_self_buyin_stake");
                    let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
                    if (player != null) {
                        if (!player.in_game || player.inStay || player.last_action == cv.Enum.ActionType.Enum_Action_Fold) {
                            GameDataManager.tRoomData.u32Stake = ret.self_stake;
                            player.stake = ret.self_stake;
                            cv.MessageCenter.send("on_update_self_stake", { "seatid": player.seatid });
                            if (player.inStay) {
                                cv.aofNet.RequestBackPosition(GameDataManager.tRoomData.u32RoomId);
                            }
                        }
                    }
                    else {
                        cv.aofNet.RequestSitdown(GameDataManager.tRoomData.u32RoomId, GameDataManager.tRoomData.u32PrePickSeatId);
                    }
                }
                else {
                    let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(ret.playerid);
                    if (player != null) {
                        player.stake = ret.self_stake;
                        cv.MessageCenter.send("on_update_self_stake", { "seatid": player.seatid, "playerid": ret.playerid });
                    }
                }
            }
        }
    }

    public ResponseModifyBuyinLimit(puf) {
        let ResponseModifyBuyinLimit = cv.gamePB.lookupType("ResponseModifyBuyinLimit");
        if (ResponseModifyBuyinLimit) {
            let recvMsg = new Uint8Array(puf);
            let ret = ResponseModifyBuyinLimit.decode(recvMsg);
            let error = ret.error;
            let playername = ret.playername;
            if (error == 97) {
                cv.TT.showMsg(cv.StringTools.formatC("%s", cv.config.getStringData("ServerErrorCode" + error) + playername), cv.Enum.ToastType.ToastTypeError);
            }
            else {
                cv.ToastError(error);
            }
        }
    }

    public NoticeModifyBuyinLimit(puf) {
        let NoticeModifyBuyinLimit = cv.gamePB.lookupType("NoticeModifyBuyinLimit");
        if (NoticeModifyBuyinLimit) {
            let recvMsg = new Uint8Array(puf);
            let ret = NoticeModifyBuyinLimit.decode(recvMsg);
            let error = ret.error;
            let buyin_limit = ret.buyin_limit;
            let buyin_now = ret.buyin_now;
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                // cv.GameDataManager.tRoomData.u32BuyinLimit = buyin_limit;
                cv.GameDataManager.tRoomData.u32Buyin = buyin_now;
            }
        }
    }

    public ResponseRoomSituation(puf) {
        let ResponseRoomSituation = cv.gamePB.lookupType("ResponseRoomSituation");
        if (ResponseRoomSituation) {
            let recvMsg = new Uint8Array(puf);
            let ret = ResponseRoomSituation.decode(recvMsg);
            cv.ToastError(ret.error);
        }
    }

    public NoticeRoomSituation(puf) {
        let NoticeRoomSituation = cv.gamePB.lookupType("NoticeRoomStituation");
        if (NoticeRoomSituation) {
            let recvMsg = new Uint8Array(puf);
            let ret = NoticeRoomSituation.decode(recvMsg);
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                let list = ret.buyin_player_list;
                for (let i = 0; i < list.length; ++i) {
                    let kPlayer = list[i];
                    cv.GameDataManager.tRoomData.updateBuyinInfo(kPlayer);
                }
                cv.MessageCenter.send("on_room_situation", ret);
            }
        }
    }

    public RequestStandup(roomId: number) {
        let RequestStandup = cv.gamePB.lookupType("RequestStandup");
        if (RequestStandup) {
            let sendGameMsg = { roomid: roomId };
            let pbbuf = RequestStandup.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Standup_Request, roomId);
        }
    }

    public ResponseStandup(puf) {
        let ResponseStandup = cv.gamePB.lookupType("ResponseStandup");
        if (ResponseStandup) {
            let buffer = new Uint8Array(puf);
            let ret = ResponseStandup.decode(buffer);
            cv.ToastError(ret.error);
        }
    }

    public NoticeStandup(puf) {
        let NoticeStandup = cv.gamePB.lookupType("NoticeStandup");
        if (NoticeStandup) {
            let buffer = new Uint8Array(puf);
            let ret = NoticeStandup.decode(buffer);
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("on_standup_succ", ret.target_uid);
            }
        }
    }

    // public NoticeBuyinToOwner(pbbuf) {
    //     let NoticeBuyinToOwner = cv.gamePB.lookupType("NoticeBuyinToOwner");
    //     if (NoticeBuyinToOwner) {
    //         let buffer = new Uint8Array(pbbuf);
    //         let ret = NoticeBuyinToOwner.decode(buffer);
    //         for (let i = 0; i < ret.buyins.length; ++i) {
    //             let kInfo: BuyinPlayerInfo = ret.buyins[i];
    //             let pkInfo: BuyinPlayerInfo = new BuyinPlayerInfo();

    //             //let mData: NoticeData = 

    //         }
    //     }
    //     cv.MessageCenter.send("updateListView");
    // }

    // public NoticeBuyinToApplication(pbbuf) {
    //     let NoticeBuyinToApplicant = cv.gamePB.lookupType("NoticeBuyinToApplicant");
    //     if (NoticeBuyinToApplicant) {
    //         let buffer = new Uint8Array(pbbuf);
    //         let ret = NoticeBuyinToApplicant.decode(buffer);
    //         if (ret.result == 1) {
    //             GameDataManager.tRoomData.u32BuyinLimit = ret.self_buyin_limit;
    //             GameDataManager.tRoomData.u32Buyin = ret.self_buyin;
    //             GameDataManager.tRoomData.u32Stake = ret.self_stake;
    //             GameDataManager.tRoomData.last_buyin_allianceId = ret.allianceid;
    //             if (GameDataManager.tRoomData.u32RoomId == ret.roomid) {
    //                 let pkTableSelf: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid)
    //                 if (pkTableSelf != null) {
    //                     cv.MessageCenter.send("on_owner_apply_buyinlimit2", GameDataManager.tRoomData.u32BuyinLimit - GameDataManager.tRoomData.u32Buyin);
    //                 }
    //                 else {
    //                     cv.MessageCenter.send("on_owner_apply_buyinlimit", GameDataManager.tRoomData.u32BuyinLimit - GameDataManager.tRoomData.u32Buyin);
    //                 }
    //             }
    //         }
    //         else {
    //             cv.TT.showMsg(cv.config.getStringData("ToastMessage1"), cv.Enum.ToastType.ToastTypeWarning);
    //         }
    //     }
    // }

    /**
     * name
     */
    public ResponseSnapshot(pbbuf) {
        let msg = this.decodePB("ResponseSnapshot", pbbuf);
        cv.ToastError(msg.error);
    }
    public RequestSnapshot(roomId: number) {
        let sendGameMsg = { roomid: roomId };
        let pbbuf = this.encodePB("RequestSnapshot", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_Snapshot_Request, roomId);
    }
    public RequestAddRoomTimeCount(roomId: number) {
        let RequestAddRoomTimeCount = cv.gamePB.lookupType("RequestAddRoomTimeCount");
        if (RequestAddRoomTimeCount) {
            let sendGameMsg = { roomid: roomId };
            let pbbuf = RequestAddRoomTimeCount.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_AddRoomTimeCount_Request, roomId);
        }
    }

    public Response_AddRoomTimeCount(puf) {
        let ResponseAddRoomTimeCount = cv.gamePB.lookupType("ResponseAddRoomTimeCount");
        if (ResponseAddRoomTimeCount) {
            let buffer = new Uint8Array(puf);
            let ret = ResponseAddRoomTimeCount.decode(buffer);
            cv.ToastError(ret.error);
        }
    }

    public NoticeAddRoomTimeCount(puf) {
        let msg = this.decodePB("NoticeAddRoomTimeLeft", puf);
        cv.GameDataManager.tRoomData.u32DelayLeft = msg.leftcount;
        cv.MessageCenter.send("on_add_room_timecount");
    }

    public RequestLeaveRoom(roomId: number) {
        let sendGameMsg = { roomid: roomId };
        let pbbuf = this.encodePB("RequestLeaveRoom", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_LeaveRoom_Request, roomId);
    }

    public Response_LeaveRoom(puf) {
        let data = this.decodePB("ResponseLeaveRoom", puf);
        if (data) {
            cv.roomManager.onResponse_LeaveRoom(data);
        }
    }

    public RequestPauseGame(roomId: number, is_Pause: boolean) {
        let RequestPauseGame = cv.gamePB.lookupType("RequestPauseGame");
        if (RequestPauseGame) {
            let sendGameMsg = { roomid: roomId, isPause: is_Pause };
            let pbbuf = RequestPauseGame.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_PauseGame_Request, roomId);
        }
    }

    public ResponsePauseGame(puf) {
        let ResponsePauseGame = cv.gamePB.lookupType("ResponsePauseGame");
        if (ResponsePauseGame) {
            let buffer = new Uint8Array(puf);
            let ret = ResponsePauseGame.decode(buffer);
            cv.ToastError(ret.error);
        }
    }

    public NoticePauseGame(puf) {
        let msg = this.decodePB("NoticePauseGame", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.GameDataManager.tRoomData.pkRoomState.isPause = msg.isPause;
                cv.GameDataManager.tRoomData.pkRoomState.paused = msg.paused;
                if (msg.isPause) {
                    cv.TT.showMsg(cv.config.getStringData("PauseGame"), cv.Enum.ToastType.ToastTypeWarning)
                }
                else {
                    cv.TT.showMsg(cv.config.getStringData("PauseGame2"), cv.Enum.ToastType.ToastTypeWarning)
                }
            }
            cv.MessageCenter.send("on_PauseGame_succ", msg);
        }
    }

    public RequestStayPosition(roomId: number) {
        let RequestStayPosition = cv.gamePB.lookupType("RequestStayPosition");
        if (RequestStayPosition) {
            let sendGameMsg = { roomid: roomId };
            let pbbuf = RequestStayPosition.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_StayPosition_Request, roomId);
        }
    }

    public ResponseStayPosition(puf) {
        let ret = this.decodePB("ResponseStayPosition", puf);
        if (ret) {
            if (ret.error == 1) {
                cv.TT.showMsg(cv.config.getStringData("ErrorToast34"), cv.Enum.ToastType.ToastTypeWarning);
            }
        }
    }
    public NoticePlayerStayPosition(pbbuf) {
        let msg = this.decodePB("NoticePlayerStay", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            for (let i = 0; i < msg.players.length; i++) {
                let kPlayer = msg.players[i];
                cv.GameDataManager.tRoomData.updateTablePlayer(kPlayer.playerid, msg.players[i]);
                cv.MessageCenter.send("on_leave_seat", msg.players[i].playerid);
            }
        }
    }
    public ResponseBuyout(puf) {
        let ResponseBuyout = cv.gamePB.lookupType("ResponseBuyout");
        if (ResponseBuyout) {
            let buffer = new Uint8Array(puf);
            let ret = ResponseBuyout.decode(buffer);
            cv.ToastError(ret.error);

            if (ret.error == 1) {
                cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips9"), cv.Enum.ToastType.ToastTypeSuccess);
            }
            else {
                cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips10"), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    public NoticeBuyout(puf) {
        let NoticeBuyout = cv.gamePB.lookupType("NoticeBuyout");
        if (NoticeBuyout) {
            let buffer = new Uint8Array(puf);
            let ret = NoticeBuyout.decode(buffer);
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (ret.seat_no == GameDataManager.tRoomData.i32SelfSeat) {
                    cv.dataHandler.getUserData().m_totalBuyOut = ret.total_buyout;
                    GameDataManager.tRoomData.u32Stake = GameDataManager.tRoomData.u32Stake - ret.buyout_gold;
                    let buyoutGold = cv.StringTools.serverGoldToShowNumber(ret.buyout_gold);

                    let totalGold = cv.StringTools.serverGoldToShowNumber(ret.total_buyout);
                    cv.dataHandler.getUserData().m_totalBuyOut = ret.total_buyout;
                    // string str = StringUtils::format(TT("Aof_game_buyout_tips_text"), g_pStringTool->numberToString(buyoutGold).c_str());
                    // postNotification("update_player_buyout", str);
                    //let str = cv.StringTools.formatC(cv.config.getStringData("Aof_game_buyout_tips_text"), buyoutGold);
                    cv.MessageCenter.send("update_player_buyout", buyoutGold);
                    //cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips11"), buyoutGold, totalGold), cv.Enum.ToastType.ToastTypeInfo);
                }
                else {
                    let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayerBySeatId(ret.seat_no)
                    if (player == null) {
                        let buyoutGold = cv.StringTools.serverGoldToShowNumber(ret.buyout_gold);
                        let totalGold = cv.StringTools.serverGoldToShowNumber(ret.total_buyout);
                        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips14"), player.name, buyoutGold, totalGold), cv.Enum.ToastType.ToastTypeInfo);
                    }
                }
            }

            for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
                let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
                if (pkPlayer && pkPlayer.seatid == ret.seat_no) {
                    pkPlayer.stake = ret.remain_gold;
                    break;
                }
            }

            cv.MessageCenter.send("update_player_stake", { "seat_id": ret.seat_no, "stake": ret.remain_gold });
        }
    }

    public RequestCheckAllianceRoomPriviledge(i32playerId: number, u32RoomId: number) {
        let tempMsg = cv.gamePB.lookupType("RequestCheckAllianceRoomPriviledge");
        if (tempMsg) {
            let sendGameMsg = { playerid: i32playerId };
            let pbbuf = tempMsg.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_CheckAllianceRoomPriviledge_Request, u32RoomId);
        }
    }

    public responseCheckAllianceRoomPriviledge(puf: any) {
        let msg = this.decodePB("ResponseCheckAllianceRoomPriviledge", puf);
        if (msg) {
            cv.MessageCenter.send("isHavePriviledge", msg.error == 1);
        }
    }

    RequestForceStandup(u32RoomId: number, i32TargetID: number) {
        let tempMsg = cv.gamePB.lookupType("RequestForceStandup");
        if (tempMsg) {
            let sendGameMsg = { roomid: u32RoomId, targetid: i32TargetID };
            let pbbuf = tempMsg.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ForceStandup_Request, u32RoomId);
        }
    }

    HandleForceStandupResponse(puf: any) {
        let msg = this.decodePB("ResponseForceStandup", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    HandleForceStandupNotice(puf: any) {
        let msg = this.decodePB("ResponseForceStandup", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (msg.playerid == cv.dataHandler.getUserData().u32Uid) {
                    cv.TT.showMsg(cv.config.getStringData("ForceStandup2"), cv.Enum.ToastType.ToastTypeWarning);
                }
                else {
                    cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ForceStandup"), msg.playername), cv.Enum.ToastType.ToastTypeInfo);
                }
            }
        }
    }

    RequestProhibitSitdown(u32RoomId: number, i32TargetID: number, bIsProhibit: boolean) {
        let tempMsg = cv.gamePB.lookupType("RequestProhibitSitdown");
        if (tempMsg) {
            let sendGameMsg = { roomid: u32RoomId, targetid: i32TargetID, isProhibitSitdown: bIsProhibit };
            let pbbuf = tempMsg.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ProhibitSitdown_Request, u32RoomId);
        }
    }

    HandleProhibitSitdownResponse(puf: any) {
        let msg = this.decodePB("ResponseProhibitSitdown", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    HandleProhibitSitdownNotice(puf: any) {
        let msg = this.decodePB("NoticeProhibitSitdown", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (msg.playerid == cv.dataHandler.getUserData().u32Uid) {
                    if (msg.isprohibitsitdown) {
                        cv.TT.showMsg(cv.config.getStringData("ProhibitSitdown2"), cv.Enum.ToastType.ToastTypeWarning);
                    }
                    else {
                        cv.TT.showMsg(cv.config.getStringData("ProhibitSitdown3"), cv.Enum.ToastType.ToastTypeSuccess);
                    }
                }
                else {
                    if (msg.isprohibitsitdown) {
                        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ProhibitSitdown"), msg.playername), cv.Enum.ToastType.ToastTypeInfo);
                    }
                    else {
                        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ProhibitSitdown4"), msg.playername), cv.Enum.ToastType.ToastTypeInfo);
                    }
                }
                cv.GameDataManager.tRoomData.prohibit_sitdown_list = msg.prohibit_sitdown_list;
                cv.MessageCenter.send("update_prohibit_button");
            }
        }
    }
    RequestPhotoVerify(u32RoomId: number, i32TargetId: number) {
        let tempMsg = cv.gamePB.lookupType("RequestPhotoVerify");
        if (tempMsg) {
            let sendGameMsg = { roomid: u32RoomId, targetid: i32TargetId };
            let pbbuf = tempMsg.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_PhotoVerify_Request, u32RoomId);
        }
    }

    HandlePhotoVerifyResponse(puf: any) {
        let msg = this.decodePB("ResponsePhotoVerify", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    HandleNotiPlayerHoleCardNotice(puf: any) {
        let msg = this.decodePB("NotiPlayerHoleCard", puf);
        if (msg) {
            cv.MessageCenter.send("on_game_notiplayer_holecard_noti", msg);
        }
    }

    HandlePhotoVerifyNotice(puf: any) {
        let msg = this.decodePB("NoticePhotoVerify", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (msg.ownerid == cv.dataHandler.getUserData().u32Uid) {
                    cv.TT.showMsg(cv.config.getStringData("PhotoVerifyRequestSucc"), cv.Enum.ToastType.ToastTypeWarning);
                }
                if (msg.targetid == cv.dataHandler.getUserData().u32Uid) {
                    cv.TT.showMsg(cv.config.getStringData("PhotoVerifyRequest"), cv.Enum.ToastType.ToastTypeInfo);
                    cv.MessageCenter.send("on_photo_verify");
                }
            }
        }
    }
    public RequestSendCardFun(roomId: number) {
        let RequestSendCardFun = cv.gamePB.lookupType("RequestSendCardFun");
        if (RequestSendCardFun) {
            let sendGameMsg = { roomid: roomId };
            let pbbuf = RequestSendCardFun.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_SendCard_Fun_Request, roomId);
        }
    }
    public ResponsePlayerSendCardFun(puf: any) {
        let msg = this.decodePB("ResponseSendCardFun", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }
    public NoticePlayerSendCardFun(puf: any) {
        let msg = this.decodePB("NoticeRoomCardFun", puf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_send_card_fun", msg);
        }

    }

    public RequestForceShowCard(roomId: number) {
        let sendGameMsg = { roomid: roomId };
        let pbbuf = this.encodePB("RequestForceShowCard", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ForceShowCard_Request, roomId);
    }
    public ResponseForceShowCard(puf: any) {
        let msg = this.decodePB("ResponseForceShowCard", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }
    public NoticeForceShowCard(puf: any) {
        let msg = this.decodePB("NoticeForceShowCard", puf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_force_showcard", msg);
        }

    }

    public RequestDestroyRoom(roomId: number) {
        let sendGameMsg = { roomid: roomId };
        let pbbuf = this.encodePB("RequestForceShowCard", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_DestroyRoom_Request, roomId);
    }
    public ResponseDestroyRoom(puf: any) {
        let msg = this.decodePB("ResponseDestroyRoom", puf);
        if (msg.error != 1) {
            cv.MessageCenter.send("updataGameDissolveButton");
        }
    }

    public NoticeDestroyRoom(pbbuf) {
        let ret = this.decodePB("NoticeDestroyRoom", pbbuf)
        if (ret) {
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("on_room_destroy_noti", ret);
            } else {
                let roomname = cv.tools.displayChineseName(ret.room_name);
                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ToastMessage3"), roomname), cv.Enum.ToastType.ToastTypeInfo);
            }
        }
    }

    public RequestCheckOutAndLeave(roomId: number) {
        let sendGameMsg = { roomid: roomId };
        let pbbuf = this.encodePB("RequestCheckOutAndLeave", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_CheckOutAndLeave_Request, roomId);
    }
    public ResponseCheckOutAndLeave(puf: any) {
        let msg = this.decodePB("ResponseCheckOutAndLeave", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }
    public NoticeCheckOutAndLeave(pbbuf) {
        let ret = this.decodePB("NoticeCheckOutAndLeave", pbbuf)
        if (ret) {
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (ret.targetid == cv.dataHandler.getUserData().u32Uid) {
                    cv.TT.showMsg(cv.config.getStringData("CheckOutAndLeave"), cv.Enum.ToastType.ToastTypeInfo);
                } else {
                    // SEChar8 acBuffer[256];
                    // SESprintf(acBuffer, 256, cv.config.getStringData("CheckOutAndLeave2"), ret.name().c_str());
                    // g_pkTips->showMsg(acBuffer, ToastTypeInfo);
                    cv.TT.showMsg(cv.config.getStringData("CheckOutAndLeave"), cv.Enum.ToastType.ToastTypeInfo);
                }
            }
        }
    }

    public RequestSendChat(roomId: number, eType: number, idx: string) {
        let str: string = idx;
        if (eType == cv.Enum.ChatType.Enum_Voice) {
            if (cv.dataHandler.getUserData().nick_name.toString() != "") {
                str = "@" + cv.dataHandler.getUserData().nick_name + "@" + str;
            }
            else {
                str = "@noname@" + str;
            }
        }
        let sendGameMsg = { roomid: roomId, ctype: eType, content: str };
        let pbbuf = this.encodePB("RequestSendChat", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_SendChat_Request, roomId);
    }

    public ResponseSendChat(puf: any) {
        let msg = this.decodePB("ResponseSendChat", puf);
        let next_fee = msg.next_fee;
        cv.GameDataManager.tRoomData.kingBee = next_fee;
        if (msg) {
            cv.ToastError(msg.error);
        }
    }
    public NoticeSendChat(pbbuf) {
        console.log("#######################NoticeSendChat")
        let ret = this.decodePB("NoticeSendChat", pbbuf)
        if (ret) {
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (ret.ctype == cv.Enum.ChatType.Enum_Voice) {
                    if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE) {

                        let content = ret.content;
                        let c = content[0];
                        if (c == '#') {
                            cv.MessageCenter.send("on_fly_emoji", { Content: content });
                        } else {

                            let acBuffer = ret.content;
                            let subStr = acBuffer.split("@");
                            if (subStr.length <= 0) {
                                return;
                            }
                            let kName = subStr[1];
                            let kUrl = subStr[2];

                            if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
                                if (ret.seatid != cv.GameDataManager.tRoomData.i32SelfSeat && cv.tools.isPlayVoice()) {
                                    let kInfo: CAFInfo = new CAFInfo();
                                    kInfo.kUrl = kUrl;
                                    kInfo.kSender = kName;
                                    kInfo.u32SeatId = ret.seatid;
                                    cv.native.PlayRoomVoice(kInfo);
                                    let pkPlayer = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(ret.seatid);
                                    if (pkPlayer) {
                                        pkPlayer.last_voice = kUrl;
                                    }
                                }
                            } else if (cc.sys.os === cc.sys.OS_ANDROID || cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                                if (ret.seatid != cv.GameDataManager.tRoomData.i32SelfSeat && cv.tools.isPlayVoice()) {
                                    let kInfo: CAFInfo = new CAFInfo();
                                    kInfo.kUrl = kUrl;
                                    kInfo.kSender = kName;
                                    kInfo.u32SeatId = ret.seatid;
                                    let pkPlayer = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(ret.seatid);
                                    if (pkPlayer) {
                                        pkPlayer.last_voice = kUrl;
                                    }

                                    cv.httpHandler.DoDownloadVoice(kInfo);
                                }
                            }
                        }
                    }
                } else if (ret.ctype == cv.Enum.ChatType.Enum_Emoji) {
                    cv.MessageCenter.send("on_SendChat", { seatID: ret.seatid, face: <number>ret.content });
                }
            }
        }
    }

    RequestAddRoomTime(u32RoomId: number) {
        let sendGameMsg = { roomid: u32RoomId };
        let pbbuf = this.encodePB("RequestAddRoomTime", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_AddRoomTime_Request, u32RoomId);
    }
    ResponseAddRoomTime(puf: any) {
        let msg = this.decodePB("ResponseAddRoomTime", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }
    NoticeAddRoomTime(pbbuf) {
        let ret = this.decodePB("NoticeAddRoomTime", pbbuf)
        if (ret) {
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("add_room_time", ret);
            }
        }
    }
    RequestInteractiveExpression(u32RoomId: number, kContent: string) {
        let tempMsg = cv.gamePB.lookupType("RequestInteractiveExpression");
        if (tempMsg) {
            let sendGameMsg = { roomid: u32RoomId, content: kContent };
            let pbbuf = tempMsg.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_InteractiveExpression_Request, u32RoomId);
        }
    }

    HandleInteractiveExpressionResponse(puf: any) {
        let msg = this.decodePB("ResponseInteractiveExpression", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    HandleInteractiveExpressionNotice(puf: any) {
        let msg = this.decodePB("NoticeInteractiveExpression", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                let c = msg.content[0];
                if (c == '#') {
                    cv.MessageCenter.send("on_fly_emoji", msg.content);
                }
            }
        }
    }

    RequestCheckFirstJoinRoom(u32RoomId: number) {
        let sendGameMsg = { roomid: u32RoomId };
        cv.GameDataManager.tRoomData.u32RoomId = u32RoomId;
        let pbbuf = this.encodePB("RequestCheckFirstTimeJoinRoomWithPassword", sendGameMsg);
        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_RequestCheckFirstTimeJoinRoomWithPassword, u32RoomId);
        } else {
            this.requestLoginServer();
        }
    }

    HandResponseJoinRoomWithFirst(puf: any) {
        let msg = this.decodePB("ResponseCheckFirstTimeJoinRoomWithPassword", puf);
        if (msg) {
            if (msg.error == 1) {
                if (msg.isfirst) {
                    //弹出输入密码框
                    cv.MessageCenter.send("Join_room", msg.roomid);
                }
                else {
                    //直接进入
                    // this.RequestJoinRoom(msg.roomid);
                    cv.roomManager.resetRoomCache();
                    cv.roomManager.RequestJoinRoom(cv.Enum.GameId.Allin, msg.roomid);
                }
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    RequestCheckFirstBuyin(u32RoomId: number) {
        let sendGameMsg = { roomid: u32RoomId }
        let pbbuf = this.encodePB("RequestCheckFirstTimeBuyinWithPassword", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_RequestCheckFirstTimeBuyinWithPassword, u32RoomId);
    }

    HandResponseBuyinWithFirst(puf: any) {
        let msg = this.decodePB("ResponseCheckFirstTimeBuyinWithPassword", puf);
        if (msg) {
            if (msg.error == 1) {
                if (msg.isfirst) {
                    cv.MessageCenter.send("buyin_room", msg.room_id);
                }
                else {
                    cv.aofNet.RequestSitdown(GameDataManager.tRoomData.u32RoomId, GameDataManager.tRoomData.u32PrePickSeatId);
                }
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    HandResponsePlayerStake(puf: any) {
        let msg = this.decodePB("NoticeUpdateMoney", puf);
        if (msg) {
            cv.MessageCenter.send("update_player_stake", msg);
        }
    }

    RequestBuyinWithPassword(u32RoomId: number, buyin_password: string) {
        let x = buyin_password;
        let sendGameMsg = { roomid: u32RoomId, buyin_password: x };
        let pbbuf = this.encodePB("RequestCheckBuyinPassword", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_RequestCheckBuyinPassword, u32RoomId);
    }

    HandBuyinResponsePwd(puf: any) {
        let msg = this.decodePB("ResponseCheckBuyinPassword", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("tipspanel_removed");
                this.RequestSitdown(GameDataManager.tRoomData.u32RoomId, GameDataManager.tRoomData.u32PrePickSeatId);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    RequestJoinRoomWithPassword(u32RoomId: number, join_password: string) {
        let x = cv.md5.md5(join_password);
        console.log("====RequestJoinRoomWithPassword=> join_password = " + x);
        let sendGameMsg = { roomid: u32RoomId, join_password: x };
        cv.GameDataManager.tRoomData.u32RoomId = u32RoomId;
        cv.GameDataManager.tRoomData.roomPassword = x;
        let pbbuf = this.encodePB("RequestJoinRoomWithPassword", sendGameMsg);
        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_RequestJoinRoomWithPassword, u32RoomId);
        } else {
            this.requestLoginServer();
        }
    }

    HandResponseJoinRoomWithPassword(puf: any) {
        let msg = this.decodePB("ResponseJoinRoomWithPassword", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.roomManager.resetRoomCache();
                cv.roomManager.RequestJoinRoom(cv.Enum.GameId.Allin, msg.roomid);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public static getInstance(): AofNetWork {
        if (!this.instance) {
            this.instance = new AofNetWork();
            this.instance.init();
        }
        return this.instance;
    }
    public HandleNoticeGlobalMessage(puf: any) {
        let msg = this.decodePB("NoticeGlobalMessage", puf);
        if (msg) {
            let cout = msg.repeat_count;
            let str: string = msg.msg;

            for (let i = 0; i < cout; i++) {
                let data: PushNoticeData = new PushNoticeData();
                data.str = cv.StringTools.getServerStrByLanguage(str);
                data.msgType.push(PushNoticeType.PUSH_ALLIN);
                PushNotice.getInstance().addPushNotice(data);
            }
        }
    }
    RequestGetGameUUIdsJs(u32RoomId: number) {
        let sendGameMsg = {};
        let pbbuf = this.encodePB("RequestGetGameUUIdsJs", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GetGameUUIdsJs_Request, u32RoomId);
    }

    public ResponseGetGameUUIdsJsMessage(puf: any) {
        let msg = this.decodePB("ResponseGetGameUUIdsJs", puf);
        if (msg) {
        }
    }
    public NoticeGetGameUUIdsJsMessage(puf: any) {
        let msg = this.decodePB("NoticeGetGameUUIdsJs", puf);
        if (msg) {
            let len = cv.StringTools.getArrayLength(msg.list);
            cv.GameDataManager.tRoomData.game_uuids_js = [];
            for (let i = 0; i < len; i++) {
                cv.GameDataManager.tRoomData.game_uuids_js.push(msg.list[i].game_uuid_js);
            }
        }
    }

    RequestPlayerBuyinsInfo(u32RoomId: number) {
        let sendGameMsg = { roomid: u32RoomId };
        let pbbuf = this.encodePB("RequestPlayerBuyinsInfo", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Request, u32RoomId);
    }

    public ResponsePlayerBuyinsInfo(puf: any) {
        let msg = this.decodePB("ResponsePlayerBuyinsInfo", puf);
        if (msg) {
        }
    }

    public NoticePlayerBuyinsInfo(puf: any) {
        let msg = this.decodePB("NoticePlayerBuyinsInfo", puf);
        if (msg) {
            cv.StringTools.deepCopy(msg.buyin_infos, cv.GameDataManager.tRoomData.buyinInfos);
            cv.MessageCenter.send("update_buyinInfo");
        }
    }

    public RequestGuessBet(option: number, amonut: number, bet_seqno: number): boolean {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = { option: option, amonut: cv.StringTools.serverGoldByClient(amonut), bet_seqno: bet_seqno };
        let pbbuf = this.encodePB("GuessBetReq", sendGameMsg);
        return this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GuessHandCard_Bet_Request, u32RoomId);
    }

    public RequestGuessSetBetOpt(repeat: boolean) {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = { repeat: repeat };
        let pbbuf = this.encodePB("GuessSetBetOptReq", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GuessHandCard_SetBetOpt_Request, u32RoomId);
    }

    public NoticeGuessHandCardBeginBet(puf: any) {
        let msg = this.decodePB("NoticeGuessBeginBet", puf);
        if (msg) {
            cv.GameDataManager.tRoomData.RemoveGuessOdds();
            let len = cv.StringTools.getArrayLength(msg.list);
            let list = msg.list;
            for (let i = 0; i < len; i++) {
                cv.GameDataManager.tRoomData.addGuessOdds(list[i]);
            }

            cv.MessageCenter.send("guess_begin_bet", msg);
        }
    }

    public ResponseGuessHandCardBet(puf: any) {
        let msg: gm_protocol.protocol.GuessBetRsp = this.decodePB("GuessBetRsp", puf);
        if (msg) {
            if (msg.Error == 1) {
                cv.GameDataManager.tRoomData.change_points = msg.change_points;
                cv.MessageCenter.send("guess_bet_rsp", msg);
            }
            else {
                cv.ToastError(msg.Error);
            }
        }
    }

    public ResponseGuessHandCardSetBetOpt(puf: any) {
        let msg: game_pb.GuessSetBetOptRsp = this.decodePB("GuessSetBetOptRsp", puf);
        if (msg) {
            if (msg) {
                if (msg.Error == 1) {
                    console.log(msg);
                    cv.MessageCenter.send("guess_set_bet_opt", msg.repeat);
                }
                else {
                    cv.ToastError(msg.Error);
                }
            }
        }
    }

    public NoticeGuessHandCardSettle(puf: any) {
        let msg: game_pb.GuessSettleNotice = this.decodePB("GuessSettleNotice", puf);
        if (msg) {
            if (msg.is_return_back) {
                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGuessReturn"), cv.StringTools.numToFloatString(msg.win_amount)), cv.Enum.ToastType.ToastTypeInfo);
            }
            else {
                cv.MessageCenter.send("guess_settle", msg.win_amount);
            }
        }
    }

    public RequestUploadGuessState() {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let is_open_guess = false;
        let sendGameMsg = { room_id: u32RoomId, is_open_guess: is_open_guess };
        let pbbuf = this.encodePB("UploadGuessStateRequest", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_UploadGuessState_Request, u32RoomId);
    }
}