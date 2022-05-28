import game_protocol = require("./../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../components/lobby/cv";
import { NetWorkProxy } from "./NetWorkProxy";
import GameDataManager from "../../components/game/dzPoker/data/GameDataManager";
import { PushNoticeData, PushNoticeType, PushNotice } from "../prefab/PushNotice";
import { PlayerInfo, CAFInfo, StarData, CommentatorInfo } from "../../components/game/dzPoker/data/RoomData";

export class GameNetWork extends NetWorkProxy {
    public static instance: GameNetWork;

    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.Texas);
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
        this.registerMsg(game_pb.MSGID.MsgID_Game_Ante_Notice, this.NoticeGameAnte.bind(this));

        //保位离桌
        this.registerMsg(game_pb.MSGID.MsgID_StayPosition_Response, this.ResponseStayPosition.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_StayPosition_Notice, this.NoticePlayerStayPosition.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_Waiting_OtherPlayer_Notice, this.NoticeWaitingOtherPlayer.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PauseGame_Response, this.ResponsePauseGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PauseGame_Notice, this.NoticePauseGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_AddRoomTimeCount_response, this.Response_AddRoomTimeCount.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_AddRommExTimeLeft_Notice, this.NoticeAddRoomTimeCount.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_LeaveRoom_Response, this.Response_LeaveRoom.bind(this));//急速扑克离开
        this.registerMsg(game_pb.MSGID.MsgID_QuickLeave_Response, this.Response_QuickLeaveRoom.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_QuickLeave_Notice, this.Response_QuickLeaveNotice.bind(this));


        this.registerMsg(game_pb.MSGID.MsgID_StartGame_Response, this.ResponseStartGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_StartGame_Notice, this.NoticeStartGame.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_RealStart_Notice, this.NoticeRealStart.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_DefaultFold_Response, this.ResponseDefaultFold.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_QuickFold_Response, this.ResponseQuickFold.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_LastRound_Win, this.ResponseLastRoundWin.bind(this));


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
        this.registerMsg(game_pb.MSGID.MsgID_InsuranceHitOuts_Notice, this._NoticeInsuranceHitOuts.bind(this));                // 击中outs
        this.registerMsg(game_pb.MSGID.MsgID_InsuranceMissOuts_Notice, this._NoticeInsuranceMissOuts.bind(this));              // 未击中outs
        this.registerMsg(game_pb.MSGID.MsgID_NoNeedInsurance_Notice, this._NoticeNoNeedInsurace.bind(this));                   // 本轮无需购买保险通知
        this.registerMsg(game_pb.MSGID.MsgID_AddInsuranceTime_Response, this._ResponseAddInsuranceTime.bind(this));            // 保险延时通知
        this.registerMsg(game_pb.MSGID.MsgID_AddInsuranceTime_Notice, this._NoticeAddInsuranceTime.bind(this));                // 保险延时通知
        this.registerMsg(game_pb.MSGID.MsgID_InsuranceToomanyLeader_Notice, this._NoticeInsuranceToomanyLeader.bind(this));    // 当前最大底池有多个领先者, 无法购买保险
        this.registerMsg(game_pb.MSGID.MsgID_NotSupport_Insurance_Notice, this._NoticeNotSupportInsurance.bind(this));         // 最大底池超过3人, 不提供保险

        // 牌局中-强制亮牌
        this.registerMsg(game_pb.MSGID.MsgID_ForceShowCard_Response, this._ResponseForceShowCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ForceShowCard_Notice, this._NoticeForceShowCard.bind(this));

        // 牌局中-发发看
        this.registerMsg(game_pb.MSGID.MsgID_SendCard_Fun_Response, this._ResponsePlayerSendCardFun.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_SendCard_Fun_Notice, this._NoticePlayerSendCardFun.bind(this));

        // 牌局中-牌局收藏
        this.registerMsg(game_pb.MSGID.MsgID_FavoriteHand_Response, this._ResponseDoFavoriteHand.bind(this));

        // 牌局回顾-强制亮牌
        this.registerMsg(game_pb.MSGID.MsgID_ReplayForceShowCard_Response, this._ResponseReplayForceShowCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ReplayForceShowCard_Notice, this._NoticeReplayForceShowCard.bind(this));

        // 牌局回顾-发发看
        this.registerMsg(game_pb.MSGID.MsgID_ReplaySendCard_Response, this._ResponseReplaySendCard.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ReplaySendCard_Notice, this._NoticeReplaySendCard.bind(this));

        // 礼物消息
        this.registerMsg(game_pb.MSGID.MsgId_Tip_Response, this._ResponseTip.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_RoomNews_Notice, this._NoticeRoomNews.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_TipRecord_Response, this._ResponseTipRecord.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_TipRank_Response, this._ResponseTipRank.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_TipForbidden_Notice, this._NoticeTipForbidden.bind(this));

        // 发表情
        this.registerMsg(game_pb.MSGID.MsgID_InteractiveExpression_Response, this.HandleInteractiveExpressionResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_InteractiveExpression_Notice, this.HandleInteractiveExpressionNotice.bind(this));

        // 提前离桌
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
        this.registerMsg(game_pb.MSGID.MsgID_ShowCard_Notice, this.NoticePlayerShowCard.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_Snapshot_Response, this.ResponseSnapshot.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_GlobalMessage_Notice, this.HandleNoticeGlobalMessage.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_GetGameUUIdsJs_Response, this.ResponseGetGameUUIdsJsMessage.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GetGameUUIdsJs_Notice, this.NoticeGetGameUUIdsJsMessage.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_PlayerBuyinsInfo_Response, this.ResponsePlayerBuyinsInfo.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_PlayerBuyinsInfo_Notice, this.NoticePlayerBuyinsInfo.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_GetRoomLimit_ID_Response, this.ResponseGetRoomLimitID.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_CriticismStart_Notice, this.NoticeCritisicmStart.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_NotEnoughMoney2Crit_Notice, this.NoticeCritisicmNotEnoughMoney.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_BeginBet_Notice, this.NoticeGuessHandCardBeginBet.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_Bet_Response, this.ResponseGuessHandCardBet.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_SetBetOpt_Response, this.ResponseGuessHandCardSetBetOpt.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GuessHandCard_Settle_Notice, this.NoticeGuessHandCardSettle.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_AutoWithdraw_Response, this.ResponseAutoWithdraw.bind(this));
        this.registerMsg(game_pb.MSGID.MsgID_ShowCritPrompt_Notice, this.onShowCritPromptNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_SendBarrage_Response, this.onBarrageRespones.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_SendBarrage_Notice, this.onBarrageNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_BarrageCount_Response, this.onGetBarrageCountNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_SendBarrageForbidden_Response, this.onSendBarrageForbiddenResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_SendBarrageForbidden_Notice, this.onSendBarrageForbiddenNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_SendBarrageForbiddenConfChange_Notice, this.onSendBarrageForbiddenConfChangeNotice.bind(this));

        this.registerMsg(game_pb.MSGID.MsgID_NotiGameUpdateThumb_Response, this.ResponseNotiGameUpdateThumb.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_OpenLive_Response, this.onOpenLiveResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_MikeMode_Response, this.onMikeModeRsp.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_VoicePrivate_Notice, this.onVoicePrivateNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_CanSpeak_Notice, this.onCanSpeakNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_OpenMike_Response, this.onOpenMikeResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_CloseStar_Notice, this.onCloseStarNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_InviterSeatFreed_Notice, this.onInviterSeatFreedNotice.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_StarCache_Notice, this.onStarCacheNotice.bind(this));


        this.registerMsg(game_pb.MSGID.MsgID_ChangeTable_Response, this.ResponseChangeTable.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_NotDisturb_Response, this.onNotDisturbResponse.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_Like_Response, this.onLikeResponse.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_Like_Notice, this.onLikeNotice.bind(this));

        //好友加入牌桌通知
        this.registerMsg(game_pb.MSGID.MsgId_GoodFriendJoinTable_Notice, this.onGoodFriendJoinTable.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_IntimacyUp_Notice, this.IntimacyUpNotice.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_IsEmojiFree_Response, this.responseIsEmojiFree.bind(this));

        this.registerMsg(game_pb.MSGID.MsgId_IsEmojiFree_Notice, this.IsEmojiFreeNotice.bind(this));

        // 明星桌红包雨
        this.registerMsg(game_pb.MSGID.MsgId_Luck_StarSeat_Countdown_Notice, this.NoticeLuckStarseatCountdown.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_Luck_StarSeat_CloseActive_Notice, this.NoticeLuckStarseatCloseActive.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_Luck_StarSeat_DrawResult_Notice, this.NoticeLuckStarseatDrawResult.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GetLuck_StarSeat_DrawList_Response, this.ResponseGetLuckStarSeatDrawList.bind(this));
        this.registerMsg(game_pb.MSGID.MsgId_GetSelf_LuckStarSeat_ResultList_Response, this.ResponseGetSelfLuckStarSeatResultList.bind(this));
    }
    public sendGameMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number = 2, ServerId: number = 2): boolean {

        let _curGameID = cv.roomManager.getCurrentGameID();// cv.GameDataManager.tRoomData.u32GameID;
        if (cv.GameDataManager.tRoomData.isZoom()) {
            return this.sendMsg(pbbuf, msgid, Roomid, ServerType, _curGameID);
        }
        else if (_curGameID === cv.Enum.GameId.Allin
            || _curGameID === cv.Enum.GameId.Bet
            || _curGameID == cv.Enum.GameId.StarSeat
            || _curGameID == cv.Enum.GameId.Plo) {
            return this.sendMsg(pbbuf, msgid, Roomid, ServerType, _curGameID);
        }
        else {
            return this.sendMsg(pbbuf, msgid, Roomid, ServerType, ServerId);
        }
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
        cv.config.logTime("ResponseAction");
        if (msg.error != 0) {
            if (msg.error == 1205) {
                cv.MessageCenter.send("action_fold_error", 1);
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
    public RequestDefaultFold(u32RoomId, type) {
        let RequestDefaultFold = cv.gamePB.lookupType("RequestDefaultFold");
        let sendGameMsg: object = { roomid: u32RoomId, type: type };
        let pbbuf = RequestDefaultFold.encode(sendGameMsg).finish();
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_DefaultFold_Request, u32RoomId);
    }
    public ResponseDefaultFold(pbbuf) {
        let msg = this.decodePB("ResponseDefaultFold", pbbuf);
        //cv.ToastError(msg.Error);
    }

    public RequestQuickFold(u32RoomId: number, isCheckBet: boolean, keepEnd: number) {
        let RequestQuickFold = cv.gamePB.lookupType("RequestQuickFold");
        let sendGameMsg: object = { RoomID: u32RoomId, CheckBet: isCheckBet, keepEnd: keepEnd };
        let pbbuf = RequestQuickFold.encode(sendGameMsg).finish();
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_QuickFold_Request, u32RoomId);
    }

    public ResponseQuickFold(pbbuf) {
        let msg = this.decodePB("ResponseQuickFold", pbbuf);
        if (msg.Error != 0) {
            if (msg.Error == 1202) {
                cv.MessageCenter.send("zoom_quickfold_tips");
            } else if (msg.Error == 1205) {
                cv.MessageCenter.send("action_fold_error", 1);
            } else {
                cv.ToastError(msg.Error);
            }
        }

    }

    public ResponseLastRoundWin(pbbuf) {
        let msg = this.decodePB("NotifyLastRoundWin", pbbuf);
        if (!msg) {
            return;
        }
        cv.TT.showMsg(cv.config.getStringData("ZoomLastRoundWin"), cv.Enum.ToastType.ToastTypeError);
        cv.MessageCenter.send("showLastRoundWin", cv.StringTools.numToFloatString(msg.amount));
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
     * 请求主动秀牌
     * @param roomId 
     * @param idxs 2张手牌游戏: 类型为数字, 0和1表示第几张牌，如果传2表示两张牌都show; 4张手牌游戏: 类型为数组, 手牌索引数组
     * @param isshow 
     * @brief 注: 关于第二个参数"idxs"完全可以用数组代替, 但服务端为了不影响2张手牌游戏逻辑, 单独给4张手牌的新增字段, 这里客户端做个兼容
     */
    public RequestShowCard(roomId: number, idxs: number | number[], isshow: boolean) {
        let msg: game_pb.RequestShowCard = game_pb.RequestShowCard.create();
        msg.roomid = roomId;
        msg.is_show = isshow;

        if (Array.isArray(idxs)) {
            msg.cardList = idxs.slice();
        }
        else {
            msg.cards = idxs;
        }

        let pbbuf = this.encodePB("RequestShowCard", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ShowCard_Request, roomId);
    }
    private ResponsePlayerShowCard(pbbuf) {
        let msg = this.decodePB("ResponseShowCard", pbbuf);
        if (msg.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
            console.log(`game_pb.MSGID.MsgID_ShowCard_Response: ${msg.error}`);
        }
    }
    private NoticePlayerShowCard(pbbuf) {
        let msg: game_pb.NoticePlayerShow = this.decodePB("NoticePlayerShow", pbbuf);
        if (msg.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
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
            if (!bHad && msg.noUseGameuuid != 1) {
                cv.GameDataManager.tRoomData.game_uuids_js.push(msg.gameuuid_js);
                // 如果记录超过限制条数  删除第一条
                let len = cv.GameDataManager.tRoomData.game_uuids_js.length;
                if (msg.hisHands > 0 && len > msg.hisHands) {
                    cv.GameDataManager.tRoomData.game_uuids_js.shift();
                }
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
        let msg: game_pb.NoticeStartGame = this.decodePB("NoticeStartGame", pbbuf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.GameDataManager.tRoomData.hasRecvStartGame = true;
            cv.dataHandler.getUserData().totalHands = msg.texasTotalHands;
            cv.MessageCenter.send("on_startgame_noti");
        }
    }

    public ResponseStartGame(pbbuf) {
        let msg = this.decodePB("ResponseStartGame", pbbuf);
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

    public RequestAction(u32RoomId: number, eType: number, u32Amount: number, isCheckBet: boolean = false, keepEnd: number = 0) {
        let user_token = cv.dataHandler.getUserData().user_token;
        let LoginModule = cv.gamePB.lookupType("RequestAction");
        u32Amount = cv.StringTools.serverGoldByClient(u32Amount);
        cv.config.logTime("RequestAction");
        if (LoginModule) {

            let sendGameMsg: object = { roomid: u32RoomId, amount: u32Amount, action: eType, ActionSeq: cv.GameDataManager.tGameData.m_u32ActionSeq, token: user_token, keepEnd: keepEnd, checkBet: isCheckBet };
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
                        if (cv.native.showSimulatorTips(data.anti_simulator_ignore_cond, false)) {
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

    public RequestJoinRoom(roomId: number, gameID: number, isQuick: boolean = false) {
        let sendGameMsg = { roomid: roomId, is_quick_sit: isQuick };
        let pbbuf = this.encodePB("RequestJoinRoom", sendGameMsg);

        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_JoinRoom_Request, roomId, cv.Enum.SeverType.SeverType_Game, gameID);
        }
        else {
            this.requestLoginServer();
        }
    }

    public RequestJoinZoomRoom(roomId: number, gameID: number, isQuick: boolean = false) {
        let sendGameMsg = { roomid: roomId, is_quick_sit: isQuick };
        let pbbuf = this.encodePB("RequestJoinRoom", sendGameMsg);

        if (cv.dataHandler.getUserData().m_bIsLoginGameServerSucc) {
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_JoinRoom_Request, roomId, cv.Enum.SeverType.SeverType_Game, gameID);
        } else {
            this.requestLoginServer();
        }
    }

    public JoinRoomResponse(puf: any) {
        let data = this.decodePB("ResponseJoinRoom", puf);
        cv.GameDataManager.tRoomData.u32RoomId = data.roomid;
        if (data) {
            cv.roomManager.onJoinRoomResponse(data);
        }
    }

    // 购买保险
    public RequestBuyInsurance(nRoomId: number, vOuts: number[], nAmount: number, bBuy: boolean, option: number): void {
        let msg: game_pb.RequestBuyInsurance = game_pb.RequestBuyInsurance.create();
        msg.roomid = nRoomId;
        msg.amount = cv.StringTools.serverGoldByClient(nAmount);
        msg.action_seq = cv.GameDataManager.tGameData.m_u32InsuranceSeq;
        msg.is_buy = bBuy;
        msg.option = option;
        msg.outs_id = [];

        for (let i = 0; i < cv.StringTools.getArrayLength(vOuts); ++i) {
            msg.outs_id.push(vOuts[i]);
        }

        let pbbuf = this.encodePB("RequestBuyInsurance", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_BuyInsurance_Request, nRoomId);
    }
    private _ResponseBuyInsurance(puf): void {
        let resp: game_pb.ResponseBuyInsurance = this.decodePB("ResponseBuyInsurance", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticeGameInsurance(pbbuf) {
        let noti: game_pb.NoticeGameInsurance = this.decodePB("NoticeGameInsurance", pbbuf);
        if (noti && noti.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
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
        let noti: game_pb.NoticeNoNeedInsurance = this.decodePB("NoticeNoNeedInsurance", puf);
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

    // 当前最大底池有多个领先者，无法购买保险
    private _NoticeInsuranceToomanyLeader(puf): void {
        let noti: game_pb.NoticeInsuranceToomanyLeader = this.decodePB("NoticeInsuranceToomanyLeader", puf);
        if (noti && noti.room_id === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips5"), cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    // 最大底池超过3人, 不提供保险
    private _NoticeNotSupportInsurance(puf): void {
        let noti: game_pb.NoticeNotSupportInsurance = this.decodePB("NoticeNotSupportInsurance", puf);
        if (noti && noti.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips17"), cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    public NoticeGameSnapShot(puf: any) {
        let result: game_pb.NoticeGameSnapshot = this.decodePB("NoticeGameSnapshot", puf);
        let roomid: number = result.roomid;
        if (roomid === cv.roomManager.getCurrentRoomID()) {
            cv.GameDataManager.tGameData.reset();
            cv.GameDataManager.tRoomData.reset();
            cv.GameDataManager.tGiftData.reset();
            cv.GameDataManager.tRoomData.hasRecvNoticeGameSnapShot = true;//退出房间的时候置为false;
            cv.GameDataManager.tRoomData.u32RoomId = result.roomid;
            cv.GameDataManager.tRoomData.roomUuidJs = result.roomUuidJs;
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
            //提取所有的牌谱ID   
            // let len = result.game_uuids_js.length;
            // for (let i = 0; i < len; i++) {
            //     cv.GameDataManager.tRoomData.game_uuids_js.push(result.game_uuids_js[i].game_uuid_js);
            // }
            cv.StringTools.deepCopy(result.allFeeItems, cv.GameDataManager.tRoomData.pkPayMoneyItem);
            cv.GameDataManager.tRoomData.kingBee = cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee2.needCoin;
            cv.GameDataManager.tRoomData.isvirtual = result.isvirtual;
            cv.GameDataManager.tRoomData.is_quick_sit = result.is_quick_sit;
            cv.GameDataManager.tRoomData.isNowCritTime = result.isNowCritTime;
            cv.GameDataManager.tGameData.i32RoomId = result.roomid;
            cv.GameDataManager.tGameData.i32DealerSId = cv.GameDataManager.tRoomData.pkTableStates.curr_dealer_seatid;
            cv.GameDataManager.tGameData.i32SBSid = cv.GameDataManager.tRoomData.pkTableStates.curr_sb_seatid;
            cv.GameDataManager.tGameData.i32BBSid = cv.GameDataManager.tRoomData.pkTableStates.curr_bb_seatid;
            cv.GameDataManager.tRoomData.anyoneAllin = result.anyoneAllin;
            cv.GameDataManager.tRoomData.allPlayersCount = result.allPlayersCount;

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

            cv.GameDataManager.tRoomData.starSeats = result.starSeats;
            cv.GameDataManager.tRoomData.identity = result.identity;
            cv.StringTools.deepCopy(result.voicePrivate, cv.GameDataManager.tRoomData.voicePrivate);
            cv.StringTools.deepCopy(result.inviterSeats, cv.GameDataManager.tRoomData.inviterSeats);

            cv.GameDataManager.tRoomData.nextCustomBarrageFee = result.nextCustomBarrageFee;
            cv.GameDataManager.tRoomData.auth = result.auth;
            cv.GameDataManager.tRoomData.forbidden = result.forbidden;
            cv.GameDataManager.tRoomData.openCustomBarrage = result.openCustomBarrage;
            cv.GameDataManager.tRoomData.openTablePlayerCustomBarrage = result.openTablePlayerCustomBarrage;
            cv.GameDataManager.tRoomData.muteCustomBarrageSeconds = result.muteCustomBarrageSeconds;

            // 初始化礼物数据
            cv.GameDataManager.tGiftData.setForbidden(result.muteTipSeconds);
            cv.GameDataManager.tGiftData.setGiftBanner(result.banner);
            cv.GameDataManager.tGiftData.setGiftAnnouncement(result.announcement);
            cv.GameDataManager.tGiftData.addGiftInfoList(result.tipFees);
            cv.GameDataManager.tGiftData.addGiftRankListTops(result.rankPlayers);
            for (let i = 0; i < cv.StringTools.getArrayLength(result.news); ++i) {
                let t: game_pb.RoomNews = game_pb.RoomNews.create(result.news[i]);
                cv.GameDataManager.tGiftData.addGiftNewsInfo(t, false);
            }
        }
        if (result.autoaddactiontime_count > 0) {
            cv.TT.showMsg(cv.config.getStringData("AutoAddTimeTips" + result.autoaddactiontime_count), cv.Enum.ToastType.ToastTypeSuccess);
        }
        cv.GameDataManager.tGameData.m_u32AddTimeCount = result.actiontime_count;
        cv.StringTools.deepCopy(result.club_createrids, cv.GameDataManager.tGameData.club_createrids);

        // 初始化快捷加注数据, 这里只处理翻后快捷(和原来一样), 翻前数据不处理(直接应用)
        cv.GameDataManager.tRoomData.quickraise = game_pb.QuickRaise.create(result.quickRaise);
        cv.tools.dealRaiseData(cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise3);
        cv.tools.dealRaiseData(cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise5);

        cv.MessageCenter.send("on_snapshot_roominfo");
        cv.MessageCenter.send("starData");
        this.RequestGetGameUUIdsJs(roomid);
    }

    public RequestSitdown(Roomid: number, severId: number, manually: boolean = false) {
        let SitdownModule = cv.gamePB.lookupType("RequestSitDown");
        if (SitdownModule) {
            let kLocation: object = cv.native.GetLocation();
            let Ip = cv.dataHandler.getUserData().user_ip == null ? "127.0.0.1" : cv.dataHandler.getUserData().user_ip;
            let PositionInfo = { latitude: kLocation["latitude"], longtitude: kLocation["longtitude"], ip: Ip };
            let sendGameMsg = { roomid: Roomid, seatid: severId, position: PositionInfo, isSure: manually };
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
        let resp: game_pb.ResponseSitDown = this.decodePB("ResponseSitDown", puf);
        if (resp) {
            console.log(`GameNetWork - response: MsgID_SitDown_Response, resp = ${JSON.stringify(resp)}`);

            cv.MessageCenter.send("resp_sit_down_failed", resp);
            switch (resp.error) {
                case 32: {
                    cv.MessageCenter.send("on_need_buyin");
                } break;

                case 97: {
                    cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ServerErrorCode97"), resp.playername), cv.Enum.ToastType.ToastTypeError);
                } break;

                case 511: {
                    cv.native.showGpsZeroError();
                } break;

                // 发起真人验证
                case 1260: {
                    cv.MessageCenter.send("on_need_slider_verify", resp);
                } break;

                // 真人验证错误码(x秒后重新认证)
                case 1261: {
                    let strKey: string = cv.config.getStringData("slider_verify_toast_result_forbid_txt");
                    cv.TT.showMsg(cv.StringTools.formatC(strKey, resp.authVerifyCD), cv.Enum.ToastType.ToastTypeError);
                } break;

                case 1301: {
                    let str = cv.StringTools.formatC(cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_des_2"), resp.limit.num, resp.limit.max);
                    cv.MessageCenter.send("sit_down_limit", str);
                } break;
                case 513: {
                    let str: string = cv.config.getStringData("ServerErrorCode513");
                    let timestr: string = cv.tools.getStringByTime(resp.left_sitdown_time);
                    cv.TT.showMsg(cv.StringTools.formatC(str, timestr), cv.Enum.ToastType.ToastTypeError);
                } break;
                //特邀座位 开始//
                case 1254: {
                    let str = cv.config.getStringData("ServerErrorCode1254");
                    let netWork = this;
                    cv.TP.showMsg(str, cv.Enum.ButtonStyle.TWO_BUTTON, (obj: any): void => {
                        netWork.RequestSitdown(resp.roomId, resp.seatId, true);
                    });
                } break;
                case 1255:
                case 1256: {
                    let str = cv.config.getStringData("ServerErrorCode" + resp.error);
                    let timestr: string = cv.tools.getStringByTime(resp.starCd);
                    cv.TT.showMsg(cv.StringTools.formatC(str, timestr), cv.Enum.ToastType.ToastTypeError);
                } break;
                //特邀座位 结束//

                default: {
                    cv.ToastError(resp.error);
                } break;
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
            var obj = { longtitude: tempInfo["longitude"], latitude: tempInfo["latitude"], ip: (ip == null) ? "127.0.0.1" : ip };
            return obj;
        }
    }

    public RequestBuyin(u32RoomId: number, u32Amount: number): boolean {//ownerid: number, clubid: number, allianceid: number
        let RequestBuyin = cv.gamePB.lookupType("RequestBuyin");
        if (RequestBuyin) {
            let amount = cv.StringTools.serverGoldByClient(u32Amount);
            let sendGameMsg = { roomid: u32RoomId, amount: amount };// ownerid: ownerid, clubid: clubid, allianceid: allianceid
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
                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ServerErrorCode" + error), playername), cv.Enum.ToastType.ToastTypeError);
            }
            else if (error == 511) {
                cv.native.showGpsZeroError();
            }
            else if (error == 1301) {
                let str = cv.StringTools.formatC(cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_des_2"), ret.limit.num, ret.limit.max);
                cv.MessageCenter.send("sit_down_limit", str);
            }
            else if (error == 114) {
                let curGameId = cv.roomManager.getCurrentGameID();
                if (curGameId != cv.Enum.GameId.Bet && (!cv.roomManager.checkGameIsZoom(curGameId)) && curGameId != cv.Enum.GameId.Allin && cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                    if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                        cv.TP.showTimeMsg(cv.StringTools.formatC(cv.config.getStringData("Aof_game_short_recharge_tips_text"), ret.min_limit), this.showGameShop.bind(this), this.gameStandUp.bind(this));
                    }
                }
                else if (curGameId == cv.Enum.GameId.Plo) {
                    if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                        cv.TP.showTimeMsg(cv.StringTools.formatC(cv.config.getStringData("Plo_game_short_recharge_tips_text"), ret.min_limit), this.showGameShop.bind(this), this.gameStandUp.bind(this));
                    }
                }
                else if (curGameId == cv.Enum.GameId.Bet) {
                    if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                        cv.TP.showTimeMsg(cv.config.getStringData("ServerErrorCode42"), this.showGameShop.bind(this), this.gameStandUp.bind(this));
                    }
                }
            }
            else {
                cv.ToastError(error);
            }

            // 发送服务器验证后的带入失败的消息, 用于游戏场景的数据采集
            cv.MessageCenter.send("buyin_failed_by_server", ret);
        }
    }

    public showGameShop() {
        cv.SHOP.RechargeClick();
    }
    public gameStandUp() {
        //容错 只有自己在桌位上才发送请求站立
        let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
        if (player != null) {
            cv.gameNet.RequestStandup(GameDataManager.tRoomData.u32RoomId);
        }
    }

    public NoticeBuyin(puf) {
        let NoticeBuyin = cv.gamePB.lookupType("NoticeBuyin");
        if (NoticeBuyin) {
            let recvMsg = new Uint8Array(puf);
            let ret = NoticeBuyin.decode(recvMsg);
            if (ret.roomid == GameDataManager.tRoomData.u32RoomId) {
                //cv.TT.showMsg(cv.config.getStringData("ErrorToast26"), cv.Enum.ToastType.ToastTypeSuccess);
                //cv.TT.showMsg(cv.StringTools.formatC(ret.next_hand ? cv.config.getStringData("ErrorToast45") : cv.config.getStringData("ErrorToast46"), cv.StringTools.numToFloatString(ret.buyin_amount)), cv.Enum.ToastType.ToastTypeSuccess);
                if (ret.playerid == cv.dataHandler.getUserData().u32Uid) {
                    cv.GameDataManager.tRoomData.hasRecvBuyinNotice = true;
                    cv.GameDataManager.tRoomData.recNeedBuyNoticeData = ret;
                    // GameDataManager.tRoomData.u32BuyinLimit = ret.self_buyin_limit;
                    GameDataManager.tRoomData.u32Buyin = ret.self_buyin;
                    GameDataManager.tRoomData.buyinAmount = ret.buyin_amount;
                    cv.MessageCenter.send("on_NoticeBuyin", ret);
                    cv.worldNet.requestGetUserData();
                    cv.dataHandler.getUserData().m_totalBuyOut = ret.self_buyout;

                    let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
                    if (player != null) {
                        if (!player.in_game || player.inStay || player.last_action == cv.Enum.ActionType.Enum_Action_Fold) {
                            GameDataManager.tRoomData.u32Stake = ret.self_stake;
                            player.stake = ret.self_stake;
                            cv.MessageCenter.send("on_update_self_stake", { "seatid": player.seatid });
                            if (player.inStay) {
                                cv.gameNet.RequestBackPosition(GameDataManager.tRoomData.u32RoomId);
                            }
                        }
                    }
                    else {
                        if (!ret.is_auto) {  //如果不是自动买入，收到此消息后才发送落座
                            cv.gameNet.RequestSitdown(GameDataManager.tRoomData.u32RoomId, GameDataManager.tRoomData.u32PrePickSeatId);
                        }
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
            if (ret.error == 1255) {
                let str = cv.config.getStringData("ServerErrorCode1255");
                let timestr: string = cv.tools.getStringByTime(ret.starCD);
                cv.TT.showMsg(cv.StringTools.formatC(str, timestr), cv.Enum.ToastType.ToastTypeError);
            } else {
                cv.ToastError(ret.error);
            }
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

    //没有用了
    public NoticeBuyinToApplication(pbbuf) {
        // let NoticeBuyinToApplicant = cv.gamePB.lookupType("NoticeBuyinToApplicant");
        // if (NoticeBuyinToApplicant) {
        //     let buffer = new Uint8Array(pbbuf);
        //     let ret = NoticeBuyinToApplicant.decode(buffer);
        //     if (ret.result == 1) {
        //         GameDataManager.tRoomData.u32BuyinLimit = ret.self_buyin_limit;
        //         GameDataManager.tRoomData.u32Buyin = ret.self_buyin;
        //         GameDataManager.tRoomData.u32Stake = ret.self_stake;
        //         GameDataManager.tRoomData.last_buyin_allianceId = ret.allianceid;
        //         if (GameDataManager.tRoomData.u32RoomId == ret.roomid) {

        //             cv.GameDataManager.tRoomData.hasRecvBuyinToApplicantNotice = true;
        //             let pkTableSelf: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid)
        //             if (pkTableSelf != null) {
        //                 cv.MessageCenter.send("on_owner_apply_buyinlimit2", GameDataManager.tRoomData.u32BuyinLimit - GameDataManager.tRoomData.u32Buyin);
        //             }
        //             else {
        //                 cv.MessageCenter.send("on_owner_apply_buyinlimit", GameDataManager.tRoomData.u32BuyinLimit - GameDataManager.tRoomData.u32Buyin);
        //             }
        //         }
        //     }
        //     else {
        //         cv.TT.showMsg(cv.config.getStringData("ToastMessage1"), cv.Enum.ToastType.ToastTypeWarning);
        //     }
        // }
    }

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

    public RequestQuickLeave(roomId: number) {
        let sendGameMsg = { RoomID: roomId };
        let pbbuf = this.encodePB("RequestQuickLeave", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_QuickLeave_Request, roomId);
    }

    public Response_QuickLeaveRoom(puf) {
        let data = this.decodePB("ResponseQuickLeave", puf);
        if (data) {
            cv.roomManager.onResponse_LeaveRoom(data);
        }
    }

    public Response_QuickLeaveNotice(puf) {
        let data = this.decodePB("NotiQuickLeave", puf);
        if (data) {
            if (data.PlayerID == cv.dataHandler.getUserData().u32Uid) {
                cv.MessageCenter.send("quick_leave_notice", data);
            }
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
            } else {
                cv.ToastError(ret.error);
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
                    let curGameId = cv.roomManager.getCurrentGameID();
                    if (ret.is_auto && curGameId != cv.Enum.GameId.Bet && (!cv.roomManager.checkGameIsZoom(curGameId)) && curGameId != cv.Enum.GameId.Allin && cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                        cv.MessageCenter.send("update_player_buyout", buyoutGold);
                    }
                    else {
                        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips11"), buyoutGold, totalGold), cv.Enum.ToastType.ToastTypeInfo);
                    }
                }
                // else {
                //     let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayerBySeatId(ret.seat_no)
                //     if (player == null) {
                //         let buyoutGold = cv.StringTools.clientGoldByServer(ret.buyout_gold);
                //         let totalGold = cv.StringTools.clientGoldByServer(ret.total_buyout);
                //         cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips14"), player.name, buyoutGold, totalGold), cv.Enum.ToastType.ToastTypeInfo);
                //     }
                // }
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
            if (msg.error == 0 && msg.user_standup_type == 1) {
                let str = cv.StringTools.getServerStrByLanguage(msg.reason);
                cv.TT.showMsg(str, cv.Enum.ToastType.ToastTypeError);
            }
            else if (msg.error == 1255) {
                let str = cv.config.getStringData("ServerErrorCode1255");
                let timestr: string = cv.tools.getStringByTime(msg.starCD);
                cv.TT.showMsg(cv.StringTools.formatC(str, timestr), cv.Enum.ToastType.ToastTypeError);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    HandleForceStandupNotice(puf: any) {
        let msg = this.decodePB("NoticeForceStandup", puf);
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
                    if (msg.isProhibitSitdown) {
                        cv.TT.showMsg(cv.config.getStringData("ProhibitSitdown2"), cv.Enum.ToastType.ToastTypeWarning);
                    }
                    else {
                        cv.TT.showMsg(cv.config.getStringData("ProhibitSitdown3"), cv.Enum.ToastType.ToastTypeSuccess);
                    }
                }
                else {
                    if (msg.isProhibitSitdown) {
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

    /**
     * 牌局中 强制亮牌
     * @param roomId 
     */
    public RequestForceShowCard(roomId: number) {
        let msg: game_pb.RequestForceShowCard = game_pb.RequestForceShowCard.create();
        msg.roomid = roomId;
        let pbbuf = this.encodePB("RequestForceShowCard", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ForceShowCard_Request, roomId);
    }
    private _ResponseForceShowCard(puf: any) {
        let resp: game_pb.ResponseForceShowCard = this.decodePB("ResponseForceShowCard", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticeForceShowCard(puf: any) {
        let noti: game_pb.NoticeForceShowCard = this.decodePB("NoticeForceShowCard", puf);
        if (noti.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_force_showcard", noti);
        }
    }

    /**
     * 牌局中 发发看
     * @param roomId 
     */
    public RequestSendCardFun(roomId: number) {
        let msg: game_pb.RequestSendCardFun = game_pb.RequestSendCardFun.create();
        msg.roomid = roomId;
        let pbbuf = this.encodePB("RequestSendCardFun", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_SendCard_Fun_Request, roomId);
    }
    private _ResponsePlayerSendCardFun(puf: any) {
        let resp: game_pb.ResponseSendCardFun = this.decodePB("ResponseSendCardFun", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticePlayerSendCardFun(puf: any) {
        let noti: game_pb.NoticeRoomCardFun = this.decodePB("NoticeRoomCardFun", puf);
        if (noti.roomid === cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_game_send_card_fun", noti);
        }
    }

    /**
     * 牌局中 请求收藏牌谱
     * @param roomid 
     * @param game_uuid 
     * @param type 
     */
    RequestDoFavoriteHand(roomid: number, game_uuid: string, type: game_pb.FavoriteHandType): void {
        let msg: game_pb.RequestFavoriteHand = game_pb.RequestFavoriteHand.create();
        msg.type = type;
        msg.game_uuid = game_uuid;
        let pbbuf = this.encodePB("RequestFavoriteHand", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_FavoriteHand_Request, roomid);
    }
    private _ResponseDoFavoriteHand(puf: any): void {
        let resp: game_pb.ResponseFavoriteHand = this.decodePB("ResponseFavoriteHand", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }

    /**
     * 牌局回顾 强制亮牌
     * @param roomId 
     * @param gameUuid 
     */
    RequestReplayForceShowCard(roomId: number, game_uuid: string) {
        let msg: game_pb.RequestReplayForceShowCard = game_pb.RequestReplayForceShowCard.create();
        msg.roomid = roomId;
        msg.game_uuid = game_uuid;
        let pbbuf = this.encodePB("RequestReplayForceShowCard", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ReplayForceShowCard_Request, roomId);
    }
    private _ResponseReplayForceShowCard(puf: any) {
        let resp = this.decodePB("ResponseReplayForceShowCard", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticeReplayForceShowCard(puf: any) {
        let msg = this.decodePB("NoticeReplayForceShowCard", puf);
        if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
            cv.MessageCenter.send("on_replay_forceshow", msg);
        }
    }

    /**
     * 牌局回顾 发发看
     * @param roomid 
     * @param game_uuid 
     */
    RequestReplaySendCard(roomid: number, game_uuid: string): void {
        let msg: game_pb.RequestReplaySendCard = game_pb.RequestReplaySendCard.create();
        msg.roomid = roomid;
        msg.game_uuid = game_uuid;
        let pbbuf = this.encodePB("RequestReplaySendCard", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ReplaySendCard_Request, roomid);
    }
    private _ResponseReplaySendCard(puf: any): void {
        let resp: game_pb.ResponseReplaySendCard = this.decodePB("ResponseReplaySendCard", puf);
        if (resp) {
            cv.ToastError(resp.error);
        }
    }
    private _NoticeReplaySendCard(puf: any): void {
        let noti: game_pb.NoticeReplaySendCard = this.decodePB("NoticeReplaySendCard", puf);
        if (noti) {
            cv.MessageCenter.send("on_replay_sendout", noti);
        }
    }

    /**
     * 打赏礼物
     * @param uid   目标玩家uid
     * @param tipId 礼物id 
     * @param count 礼物数量
     */
    RequestTip(uid: number, tipId: number, count: number) {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;

        let t: game_pb.TipInfo = game_pb.TipInfo.create();
        t.tipId = tipId;
        t.tipCount = count;

        let msg: game_pb.RequestTip = game_pb.RequestTip.create();
        msg.playerId = uid;
        msg.tipInfo = t;

        let pbbuf: any = this.encodePB("RequestTip", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_Tip_Request, roomid);
    }
    private _ResponseTip(puf: any) {
        let resp: game_pb.ResponseTip = this.decodePB("ResponseTip", puf);
        if (resp) {
            if (resp.error !== 1) {
                cv.ToastError(resp.error);
            }
        }
    }
    private _NoticeRoomNews(puf: any) {
        let noti: game_pb.RoomNews = this.decodePB("RoomNews", puf);
        if (noti) {
            let t: game_pb.RoomNews = game_pb.RoomNews.create(noti);
            cv.GameDataManager.tGiftData.addGiftNewsInfo(t, true);
        }
    }

    /**
     * 请求"送/收礼"历史记录
     * @param skipId    查询要跳过的id
     * @param size      查询数量
     * @param type      查询类型
     */
    RequestTipRecord(skipId: number, size: number, type: game_pb.TipRecordType) {
        let roomid: number = cv.GameDataManager.tRoomData.u32RoomId;
        let msg: game_pb.RequestTipRecord = game_pb.RequestTipRecord.create();
        msg.skipId = skipId;
        msg.size = size;
        msg.tType = type;

        let pbbuf: any = this.encodePB("RequestTipRecord", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_TipRecord_Request, roomid);
    }
    private _ResponseTipRecord(puf: any) {
        let resp: game_pb.ResponseTipRecord = this.decodePB("ResponseTipRecord", puf);
        if (resp) {
            if (resp.error === 1) {
                cv.GameDataManager.tGiftData.addGiftRecordsInfo(resp);
            }
            else {
                cv.ToastError(resp.error);
            }
        }
    }

    /**
     * 请求礼物打赏玩家排行榜
     */
    RequestTipRank() {
        let roomid: number = cv.GameDataManager.tRoomData.u32RoomId;
        let msg: game_pb.RequestTipRank = game_pb.RequestTipRank.create();
        let pbbuf: any = this.encodePB("RequestTipRank", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_TipRank_Request, roomid);
    }
    private _ResponseTipRank(puf: any) {
        let resp: game_pb.ResponseTipRank = this.decodePB("ResponseTipRank", puf);
        if (resp) {
            if (resp.error === 1) {
                cv.GameDataManager.tGiftData.addGiftRankList(resp.players);
            }
            else {
                cv.ToastError(resp.error);
            }
        }
    }

    /**
     * 禁打赏通知(激活或禁用)
     */
    private _NoticeTipForbidden(puf: any): void {
        let noti: game_pb.TipForbiddenNotice = this.decodePB("TipForbiddenNotice", puf);
        if (noti) {
            cv.GameDataManager.tGiftData.setForbidden(noti.forbidden, true);
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
                let roomArr = ret.room_name.split("#");
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ToastMessage3"), roomArr[0]), cv.Enum.ToastType.ToastTypeInfo);
                }
                else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.en_US) {
                    cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ToastMessage3"), roomArr[1]), cv.Enum.ToastType.ToastTypeInfo);
                }
                else {
                    cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ToastMessage3"), roomArr[2]), cv.Enum.ToastType.ToastTypeInfo);
                }
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
        if (msg.error == 1) {
            //消息没有错误才将价格赋值保存
            cv.GameDataManager.tRoomData.kingBee = next_fee;
        }

        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    public NoticeSendChat(pbbuf) {
        let ret = this.decodePB("NoticeSendChat", pbbuf)
        console.log("#######################NoticeSendChat :: " + ret.ctype);
        if (ret) {
            if (ret.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                if (ret.ctype == cv.Enum.ChatType.Enum_Voice) {
                    if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE) {

                        let content = ret.content;
                        console.log("#######################NoticeSendChat content:: " + content);
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
                            console.log("#######################NoticeSendChat isPlayVoice:: " + cv.tools.isPlayVoice());

                            if ((ret.seatid != cv.GameDataManager.tRoomData.i32SelfSeat && cv.tools.isPlayVoice()) || ret.seatid == cv.GameDataManager.tRoomData.i32SelfSeat) {
                                let kInfo: CAFInfo = new CAFInfo();
                                kInfo.kUrl = kUrl;
                                kInfo.kSender = kName;
                                kInfo.u32SeatId = ret.seatid;
                                let playInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(ret.seatid);
                                kInfo.uid = playInfo.playerid;
                                cv.GameDataManager.tRoomData.voiceArr.unshift(kInfo);
                            }
                            this.playVoice();
                        }
                    }
                } else if (ret.ctype == cv.Enum.ChatType.Enum_Emoji) {
                    cv.MessageCenter.send("on_SendChat", { seatID: ret.seatid, face: <number>ret.content });
                }
            }
        }
    }

    playVoice() {
        console.log("#######################playVoice :: ");
        if (cv.GameDataManager.tRoomData.voicePlaying) return;
        let len = cv.GameDataManager.tRoomData.voiceArr.length;
        if (len <= 0) return;
        let kInfo = cv.GameDataManager.tRoomData.voiceArr.pop();
        if (!cv.tools.isPlayVoice() && kInfo.uid != cv.dataHandler.getUserData().u32Uid) {  //关闭语音开关，只播放玩家自己的语音
            this.playVoice();
            return;
        }
        let tableInfo = cv.GameDataManager.tRoomData.GetTablePlayer(kInfo.uid);
        if (!tableInfo) {   //站起或退出
            this.playVoice();
            return;
        }

        cv.GameDataManager.tRoomData.voicePlaying = true;
        cv.GameDataManager.tRoomData.last_audioID = -1;

        kInfo.u32SeatId = tableInfo.seatid;
        let pkPlayer = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(kInfo.u32SeatId);
        if (pkPlayer) {
            pkPlayer.last_voice = kInfo.kUrl;
        }

        if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
            cv.native.PlayRoomVoice(kInfo);
        } else if (cc.sys.os === cc.sys.OS_ANDROID || cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            cv.httpHandler.DoDownloadVoice(kInfo, this.playVoiceError.bind(this));
        }
    }

    playVoiceError() {
        cv.GameDataManager.tRoomData.voicePlaying = false;
        this.playVoice();
    }

    stopVoice() {
        if (cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE && cv.config.getCurrentScene() != cv.Enum.SCENE.JACKFRUIT_SCENE) return;
        //if (!cv.GameDataManager.tRoomData.voicePlaying) return;
        cv.GameDataManager.tRoomData.voicePlaying = false;
        cv.GameDataManager.tRoomData.voiceArr = [];

        let voice = cv.GameDataManager.tRoomData.last_voice;
        let audioID = cv.GameDataManager.tRoomData.last_audioID;
        if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
            cv.native.StopPlay();
        } else if (cc.sys.os === cc.sys.OS_ANDROID || cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            if (audioID != -1) {
                cc.audioEngine.stopEffect(audioID);
            }
            if (voice != null) {
                cv.resMgr.releaseAsset(voice);
                cv.GameDataManager.tRoomData.last_voice = null;
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

    RequestInteractiveExpression(u32RoomId: number, kContent: string, kType: game_pb.EmojiType = game_pb.EmojiType.InterActiveNormal) {
        let tempMsg = cv.gamePB.lookupType("RequestInteractiveExpression");
        if (tempMsg) {
            let sendGameMsg = { roomid: u32RoomId, content: kContent, type: kType };
            let pbbuf = tempMsg.encode(sendGameMsg).finish();
            this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_InteractiveExpression_Request, u32RoomId);
        }
    }

    HandleInteractiveExpressionResponse(puf: any) {
        let msg = this.decodePB("ResponseInteractiveExpression", puf);
        //可以发互动表情的等待时间，必须1249错误码才有值，其它错误都是0值
        if (msg) {
            if (msg.error == 1249) {
                let hours = Math.floor(msg.left_duration / 3600);
                let minutes = Math.floor(msg.left_duration % 3600 / 60);
                let seconds = Math.floor(msg.left_duration % 60);

                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("Star_emoji_tips"), hours, minutes, seconds), cv.Enum.ToastType.ToastTypeWarning);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    HandleInteractiveExpressionNotice(puf: any) {
        let msg = this.decodePB("NoticeInteractiveExpression", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                let c = msg.content[0];
                if (c == '#') {
                    cv.MessageCenter.send("on_fly_emoji", { Content: msg.content, type: msg.type });
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
                    cv.roomManager.RequestJoinRoom(cv.Enum.GameId.Texas, msg.roomid);
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
                    cv.gameNet.RequestSitdown(GameDataManager.tRoomData.u32RoomId, GameDataManager.tRoomData.u32PrePickSeatId);
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
            if (msg.room_id == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("update_player_stake", msg);
            }
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
                cv.roomManager.RequestJoinRoom(cv.Enum.GameId.Texas, msg.roomid);
            }
            else {
                cv.SwitchLoadingView.hide();
                cv.roomManager.resetRoomCache();
                cv.ToastError(msg.error);
            }
        }
    }

    public static getInstance(): GameNetWork {
        if (!this.instance) {
            this.instance = new GameNetWork();
            this.instance.init();
        }
        return this.instance;
    }

    public HandleNoticeGlobalMessage(puf: any) {
        let msg: game_pb.NoticeGlobalMessage = this.decodePB("NoticeGlobalMessage", puf);
        if (msg) {
            if (msg.cast_msg_type != game_pb.CastMsgType.CastMsgTypeCloseStar) return;
            let cout = msg.repeat_count;
            let str: string = cv.StringTools.getServerStrByLanguage(msg.msg);
            let pushType: PushNoticeType = PushNotice.getInstance().getPushTypeFromGameId(cv.roomManager.getCurrentGameID());
            for (let i = 0; i < cout; i++) {
                let data: PushNoticeData = new PushNoticeData();
                data.str = str;
                data.msgType.push(pushType);
                PushNotice.getInstance().addPushNotice(data);
            }
        }
    }
    RequestGetGameUUIdsJs(u32RoomId: number) {
        let sendGameMsg = {};
        let pbbuf = this.encodePB("RequestGetGameUUIdsJs", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GetGameUUIdsJs_Request, u32RoomId);
    }
    private ResponseGetGameUUIdsJsMessage(puf: any) {
        let msg = this.decodePB("ResponseGetGameUUIdsJs", puf);
        if (msg) {
        }
    }
    private NoticeGetGameUUIdsJsMessage(puf: any) {
        let noti: game_pb.NoticeGetGameUUIdsJs = this.decodePB("NoticeGetGameUUIdsJs", puf);
        if (!noti) return;

        // 服务器数据是按照请求有序下发, 所以只需要判断"page"的值
        // 等于1, 表示是新的数据合集, 需要清空缓存数组; 不等于1, 表示是分包下发, 直接追加数组
        if (noti.page === 1) {
            cv.GameDataManager.tRoomData.game_uuids_js = [];
        }

        let len: number = cv.StringTools.getArrayLength(noti.list);
        for (let i = 0; i < len; ++i) {
            cv.GameDataManager.tRoomData.game_uuids_js.push(noti.list[i].game_uuid_js);
        }

        let totalLen: number = cv.StringTools.getArrayLength(cv.GameDataManager.tRoomData.game_uuids_js);
        console.log(`GameNetWork - NoticeGetGameUUIdsJs: total = ${noti.total}, page = ${noti.page}, list = ${len}, totalLen = ${totalLen}`);
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
            cv.MessageCenter.send("update_buyinInfo", msg.buyin_infos);
        }
    }

    RequestGetRoomLimitID() {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = { roomid: u32RoomId, mo_player: cv.native.IsSimulator() };
        let pbbuf = this.encodePB("RequestGetRoomLimitId", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GetRoomLimit_ID_Request, u32RoomId);
    }

    public ResponseGetRoomLimitID(puf: any) {
        let msg = this.decodePB("ResponseGetRoomLimitId", puf);
        if (msg) {
            if (msg.Error == 1) {
                cv.MessageCenter.send("change_tables");
                cv.roomManager.RequestJoinRoom(cv.roomManager.getCurrentGameID(), msg.roomid);
            }
            else if (msg.Error == 1302) {
                cv.MessageCenter.send("sit_down_limit_error", msg.Error);
            }
            else {
                cv.ToastError(msg.Error);
            }
        }
    }

    //暴击场开始消息
    public NoticeCritisicmStart(puf: any) {
        let msg = this.decodePB("NoticeCritisicmStart", puf);
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        if (msg.roomid == u32RoomId) {
            cv.MessageCenter.send("notice_critisicm_start", msg);
        }
    }

    //暴击场金币不足
    public NoticeCritisicmNotEnoughMoney(puf: any) {
        let msg = this.decodePB("NoticeNotEnougnMoney2Crit", puf);
        if (msg) {
            if (msg.roomid == cv.GameDataManager.tRoomData.u32RoomId) {
                cv.MessageCenter.send("notice_critisicm_not_enough", msg);
            }
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
        let msg: game_protocol.protocol.GuessBetRsp = this.decodePB("GuessBetRsp", puf);
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
            if (msg.Error == 1) {
                console.log(msg);
                cv.MessageCenter.send("guess_set_bet_opt", msg.repeat);
            }
            else {
                cv.ToastError(msg.Error);
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

    RequestAutoWithdraw(bopen: boolean) {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = { is_open: bopen };
        let pbbuf = this.encodePB("RequestAutoWithdraw", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_AutoWithdraw_Request, u32RoomId);
    }

    public ResponseAutoWithdraw(puf: any) {
        let msg: game_pb.ResponseAutoWithdraw = this.decodePB("ResponseAutoWithdraw", puf);
        if (msg) {
            if (msg.Error == 1) {
                cv.MessageCenter.send("withdraw_open", msg.is_open);
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

    public onShowCritPromptNotice(puf: any) {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let msg: game_pb.ShowCritPromptNotice = this.decodePB("ShowCritPromptNotice", puf);
        cv.GameDataManager.tRoomData.isShowCritPrompt = true;
    }

    /**
     * 发送弹幕
     */
    public requestSendBarrage(msg, at_list: string[], at_uid_list: number[], thump_up_status: number = 1, type: game_pb.BarrageType = game_pb.BarrageType.Enum_System) {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId; //房间id
        let ctype = type; //弹幕类型
        let content = msg; //弹幕内容

        let sendGameMsg = { roomid: roomid, ctype: ctype, content: content, at_list: at_list, thump_up_status: thump_up_status, at_uid_list: at_uid_list };
        let pbbuf = this.encodePB("RequestSendBarrage", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_SendBarrage_Request, roomid);
    }

    public onBarrageRespones(puf: any) {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let msg: game_pb.ResponseSendBarrage = this.decodePB("ResponseSendBarrage", puf);
        if (msg) {
            if (msg.error == 1) {
                let data = new game_pb.BarrageCount;
                data.BarrageId = msg.barrageId;
                data.UseCount = msg.useCount;
                cv.GameDataManager.updateBarrageCount(data);
                data = null;
            }
            else {
                cv.ToastError(msg.error);
                if (msg.error == 1274) {
                    cv.GameDataManager.tRoomData.muteCustomBarrageSeconds = msg.afterSecondsCanSend;
                    cv.MessageCenter.send("onBarrageMute", { mute: true, time: msg.afterSecondsCanSend });
                }
            }
        }
    }

    /**
     * 收到弹幕消息
     * @param puf 
     */
    public onBarrageNotice(puf: any) {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let noti: game_pb.NoticeSendBarrage = this.decodePB("NoticeSendBarrage", puf);

        if (u32RoomId === noti.roomid) {
            let num = cv.config.compareSignTime();
            console.log("onBarrageNotice::" + num);
            if (num < 0.6) return;

            // 设置可以显示弹幕才添加
            if (cv.tools.isShowBarrage()) {
                cv.GameDataManager.addDanmuMsg(noti);
            }

            // 非礼物弹幕则添加到"添加礼物消息"列表中(因为礼物弹幕在自己的礼物通知里面有添加消息, 这里就不重复添加了)
            if (noti.ctype !== game_pb.BarrageType.Enum_Tip && noti.ctype !== game_pb.BarrageType.Enum_PlayerEnters) {
                let t: game_pb.NoticeSendBarrage = game_pb.NoticeSendBarrage.create(noti);
                cv.GameDataManager.tGiftData.addGiftNewsInfo(t, true);
            }
        }
    }

    /**
     * 请求弹幕使用次数
     */
    public requestBarrageCount() {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId; //房间id
        let sendGameMsg = {};
        let pbbuf = this.encodePB("BarrageCountReq", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_BarrageCount_Request, roomid);
    }

    /**
     * 收到弹幕使用次数
     */
    public onGetBarrageCountNotice(puf: any) {
        let msg: game_pb.BarrageCountRsp = this.decodePB("BarrageCountRsp", puf);
        if (msg.error == 1) {
            for (let index = 0; index < msg.Infos.length; index++) {
                cv.GameDataManager.updateBarrageCount(msg.Infos[index]);
            }
            cv.MessageCenter.send("getBarrageCountNotice");
        }
    }

    public requestSendBarrageForbidden(palyerId: number, time: number, type: number) {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = { player: palyerId, time: time, tType: type };
        let pbbuf = this.encodePB("RequestSendBarrageForbidden", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_SendBarrageForbidden_Request, roomid);
    }
    public onSendBarrageForbiddenResponse(puf: any) {
        let msg: game_pb.ResponseSendBarrageForbidden = this.decodePB("ResponseSendBarrageForbidden", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.TT.showMsg(cv.config.getStringData("FaceBarrage_operate_ok"), cv.Enum.ToastType.ToastTypeError);
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
    public onSendBarrageForbiddenNotice(puf: any) {
        let msg: game_pb.NoticeSendBarrageForbidden = this.decodePB("NoticeSendBarrageForbidden", puf);
        if (msg) {
            //tType = 0:禁, 1：解除禁止
            let muteType: boolean = msg.tType == 0 ? true : false;
            cv.GameDataManager.tRoomData.muteCustomBarrageSeconds = muteType ? msg.time : 0;
            cv.MessageCenter.send("onBarrageMute", { mute: muteType, time: cv.GameDataManager.tRoomData.muteCustomBarrageSeconds });
        }
    }
    public onSendBarrageForbiddenConfChangeNotice(puf: any) {
        let msg: game_pb.NoticeSendBarrageConf = this.decodePB("NoticeSendBarrageConf", puf);
        if (msg) {
            cv.GameDataManager.tRoomData.openCustomBarrage = msg.openCustomBarrage;
            cv.GameDataManager.tRoomData.openTablePlayerCustomBarrage = msg.openTablePlayerCustomBarrage;
            cv.GameDataManager.tRoomData.nextCustomBarrageFee = msg.nextCustomBarrageFee;
            cv.MessageCenter.send("onBarrageConfChange");
        }
    }


    RequestNotiGameUpdateThumb() {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = {};
        let pbbuf = this.encodePB("RequestNotiGameUpdateThumb", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_NotiGameUpdateThumb_Request, u32RoomId);
    }
    ResponseNotiGameUpdateThumb(puf) {
        let msg: game_pb.ResponseNotiGameUpdateThumb = this.decodePB("ResponseNotiGameUpdateThumb", puf);
        if (msg.error == 1) {
        }
    }
    RequestChangeTable() {
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let sendGameMsg = { roomid: u32RoomId };
        let pbbuf = this.encodePB("RequestChangeTable", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgID_ChangeTable_Request, u32RoomId);
    }

    ResponseChangeTable(puf) {
        let msg = this.decodePB("ResponseChangeTable", puf);
        if (msg.error != 1) {
            cv.ToastError(msg.error);
        }
    }

    /**
     * 请求禁止或者解除限制
     */
    public requestNotDisturb(u32operate: number, u32whoid: number) {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId; //房间id
        let sendGameMsg = { operate: u32operate, whoId: u32whoid };
        let pbbuf = this.encodePB("NotDisturbReq", sendGameMsg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_NotDisturb_Request, roomid);
    }

    public onNotDisturbResponse(puf: any) {
        let msg: game_pb.NotDisturbRsp = this.decodePB("NotDisturbRsp", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("NotDisturb", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public requestOpenLiveReq(op: number) {
        //开启传1 关闭传2
        let sendOp = { liveOp: op };
        let roomid = cv.GameDataManager.tRoomData.u32RoomId; //房间id
        let pbbuf = this.encodePB("OpenLiveReq", sendOp);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_OpenLive_Request, roomid);
    }

    public onOpenLiveResponse(puf: any) {
        //直播开启状态 0. 直播未开启 1. 直播已开启 2. 已下播
        let msg: game_pb.OpenLiveRsp = this.decodePB("OpenLiveRsp", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("liveStatus", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public requestMikeModeReq(mode: number) {
        //0.按键 1.开放麦
        let sendOp = { Mode: mode };
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;
        let pbbuf = this.encodePB("MikeModeReq", sendOp);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_MikeMode_Request, roomid);
    }
    public onMikeModeRsp(puf: any) {
        let msg: game_pb.MikeModeRsp = this.decodePB("MikeModeRsp", puf);
        if (msg) {
            if (msg.error == 1) {
                let player: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
                if (player) {
                    player.mikeMode = msg.Mode;
                }
                cv.MessageCenter.send("mikeMode", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }
    public onVoicePrivateNotice(puf: any) {
        let msg: game_pb.VoicePrivateNotice = this.decodePB("VoicePrivateNotice", puf);
        if (msg) {
            for (let i = 0; i < cv.GameDataManager.tRoomData.voicePrivate.length; ++i) {
                let data = cv.GameDataManager.tRoomData.voicePrivate[i];
                if (data.uid == msg.uid) {
                    data.isVoicePublic = msg.isVoicePublic;
                    break;
                }
            }
            cv.MessageCenter.send("voicePrivateNotice", msg);
        }
    }
    public onCanSpeakNotice(puf: any) {
        let msg: game_pb.CanSpeakNotice = this.decodePB("CanSpeakNotice", puf);
        if (msg) {
            let player: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(msg.uid);
            if (player) {
                player.canSpeak = msg.CanSpeak;
            }
            cv.MessageCenter.send("canSpeakNotice", msg);
        }
    }

    public requestOpenMike(op: number) {
        //开麦传1 闭麦传0
        let sendOp = { mikeOp: op };
        let roomid = cv.GameDataManager.tRoomData.u32RoomId; //房间id
        let pbbuf = this.encodePB("OpenMikeReq", sendOp);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_OpenMike_Request, roomid);
    }

    public onOpenMikeResponse(puf: any) {
        //0. 未开麦 1. 开麦
        let msg: game_pb.OpenMikeRsp = this.decodePB("OpenMikeRsp", puf);
        if (msg) {
            if (msg.error == 1) {
                let commentatorList = cv.GameDataManager.tRoomData.pkRoomParam.commentators;
                for (let i = commentatorList.length - 1; i >= 0; --i) {
                    if (commentatorList[i].uid == msg.uid) {
                        commentatorList[i].mikeStatus = msg.mikeStatus;
                        break;
                    }
                }
                cv.MessageCenter.send("openMike", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public onCloseStarNotice(puf: any) {
        let msg: game_pb.CloseStarNotice = this.decodePB("CloseStarNotice", puf);
        if (msg) {
            if (msg.isClosedStar) {
                cv.GameDataManager.tRoomData.pkRoomParam.reserveSeat = 0;
            }
            cv.MessageCenter.send("closeStarNotice", msg.isClosedStar);
        }
    }

    public onInviterSeatFreedNotice(puf: any) {
        let msg: game_pb.InviterSeatFreedNotice = this.decodePB("InviterSeatFreedNotice", puf);
        if (msg && msg.seatId.length > 0 && (msg.attr == 0 || msg.attr == 1 || msg.attr == 2)) {
            //删除
            if (cv.GameDataManager.tRoomData.inviterSeats.length > 0) {
                for (let i = cv.GameDataManager.tRoomData.inviterSeats.length - 1; i >= 0; --i) {
                    let seatId = cv.GameDataManager.tRoomData.inviterSeats[i];
                    for (let n = msg.seatId.length - 1; n >= 0; --n) {
                        if (seatId == msg.seatId[n]) {
                            cv.GameDataManager.tRoomData.inviterSeats.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if (cv.GameDataManager.tRoomData.starSeats.length > 0) {
                for (let i = cv.GameDataManager.tRoomData.starSeats.length - 1; i >= 0; --i) {
                    let seatId = cv.GameDataManager.tRoomData.starSeats[i];
                    for (let n = msg.seatId.length - 1; n >= 0; --n) {
                        if (seatId == msg.seatId[n]) {
                            cv.GameDataManager.tRoomData.starSeats.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            //添加
            if (msg.attr != 0) {
                let newSeats = msg.attr == 1 ? cv.GameDataManager.tRoomData.inviterSeats : cv.GameDataManager.tRoomData.starSeats;
                for (let i = 0; i < msg.seatId.length; ++i) {
                    newSeats.push(msg.seatId[i]);
                }
            }
            cv.MessageCenter.send("inviterSeatFreedNotice", msg);
        }
    }
    public onStarCacheNotice(puf: any) {
        let msg: game_pb.StarCacheNotice = this.decodePB("StarCacheNotice", puf);
        if (msg && msg.playerId.length > 0 && (msg.attr == 0 || msg.attr == 1 || msg.attr == 2 || msg.attr == 3)) {
            //删除
            if (cv.GameDataManager.tRoomData.pkRoomParam.starInviter.length > 0) {
                for (let i = cv.GameDataManager.tRoomData.pkRoomParam.starInviter.length - 1; i >= 0; --i) {
                    let uid = cv.GameDataManager.tRoomData.pkRoomParam.starInviter[i];
                    for (let n = msg.playerId.length - 1; n >= 0; --n) {
                        if (uid == msg.playerId[n]) {
                            cv.GameDataManager.tRoomData.pkRoomParam.starInviter.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if (cv.GameDataManager.tRoomData.pkRoomParam.starData.length > 0) {
                for (let i = cv.GameDataManager.tRoomData.pkRoomParam.starData.length - 1; i >= 0; --i) {
                    let uid = cv.GameDataManager.tRoomData.pkRoomParam.starData[i].uid;
                    for (let n = msg.playerId.length - 1; n >= 0; --n) {
                        if (uid == msg.playerId[n]) {
                            cv.GameDataManager.tRoomData.pkRoomParam.starData.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if (cv.GameDataManager.tRoomData.pkRoomParam.commentators.length > 0) {
                for (let i = cv.GameDataManager.tRoomData.pkRoomParam.commentators.length - 1; i >= 0; --i) {
                    let uid = cv.GameDataManager.tRoomData.pkRoomParam.commentators[i].uid;
                    for (let n = msg.playerId.length - 1; n >= 0; --n) {
                        if (uid == msg.playerId[n]) {
                            cv.GameDataManager.tRoomData.pkRoomParam.commentators.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            //添加
            if (msg.attr == 1) {
                let newPlayers = cv.GameDataManager.tRoomData.pkRoomParam.starInviter;
                for (let i = 0; i < msg.playerId.length; ++i) {
                    newPlayers.push(msg.playerId[i]);
                }
            } else if (msg.attr == 2) {
                let newPlayers = cv.GameDataManager.tRoomData.pkRoomParam.starData;
                for (let i = 0; i < msg.playerId.length; ++i) {
                    let starData = new StarData();
                    starData.uid = msg.playerId[i];
                    starData.status = msg.status;
                    // starData.nickName
                    // starData.thumb
                    newPlayers.push(starData);
                }
            } else if (msg.attr == 3) {
                let newPlayers = cv.GameDataManager.tRoomData.pkRoomParam.commentators;
                for (let i = 0; i < msg.playerId.length; ++i) {
                    let commentatorInfo = new CommentatorInfo();
                    commentatorInfo.uid = msg.playerId[i];
                    commentatorInfo.mikeStatus = msg.status;
                    commentatorInfo.television = msg.television;
                    newPlayers.push(commentatorInfo);
                }
            }
            // cv.MessageCenter.send("starCacheNotice", msg);
        }
    }

    public requestLike(likeid: number) {
        let like = { likeUid: likeid };
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;
        let pbbuf = this.encodePB("LikeRequest", like);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_Like_Request, roomid);
    }

    public onLikeResponse(puf: any) {
        let msg: game_pb.LikeResponse = this.decodePB("LikeResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().pokerdata.liked_count = msg.likedCount;
                //msg.likeUid
                cv.MessageCenter.send("like", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public onLikeNotice(puf: any) {
        let msg: game_pb.LikeNotice = this.decodePB("LikeNotice", puf);
        if (msg) {
            //xxx为你点赞
            cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("Star_like"), msg.nickname), cv.Enum.ToastType.ToastTypeSuccess);
        }
    }

    public onGoodFriendJoinTable(puf: any) {
        let msg: game_pb.GoodFriendJoinTableNotify = this.decodePB("GoodFriendJoinTableNotify", puf);
        if (msg) {
            cv.MessageCenter.send("welcome", msg)
        }
    }

    public IntimacyUpNotice(puf: any) {
        let msg: game_pb.NoticeIntimacyUp = this.decodePB("NoticeIntimacyUp", puf);
        if (msg) {
            cv.MessageCenter.send("on_intimacy", msg);
        }
    }

    public requestIsEmojiFree(emojitype: game_pb.EmojiType) {
        let msg = { type: emojitype };
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;
        let pbbuf = this.encodePB("RequestIsEmojiFree", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_IsEmojiFree_Request, roomid);
    }

    public responseIsEmojiFree(puf: any) {
        let msg: game_pb.ResponseIsEmojiFree = this.decodePB("ResponseIsEmojiFree", puf);
        if (msg) {
            cv.ToastError(msg.error);
        }
    }

    public IsEmojiFreeNotice(puf: any) {
        let msg: game_pb.NoticeIsEmojiFree = this.decodePB("NoticeIsEmojiFree", puf);
        if (msg) {
            cv.MessageCenter.send("IsEmojiFree", msg);
        }
    }

    public NoticeLuckStarseatCountdown(puf: any) {
        let msg: game_pb.LuckStarSeatCountdownNotice = this.decodePB("LuckStarSeatCountdownNotice", puf);
        if (msg) {
            let newTime = Math.floor((new Date()).getTime() / 1000);
            let startTime = newTime + msg.left_time;
            cv.GameDataManager.tRoomData.starRedpacketInfo.left_time = startTime;
            cv.GameDataManager.tRoomData.starRedpacketInfo.total_luck_amount = msg.total_luck_amount;
            cv.GameDataManager.tRoomData.starRedpacketInfo.desc = msg.desc;
            cv.GameDataManager.tRoomData.starRedpacketInfo.title = msg.title;
            let url = msg.share_image_url;
            if (typeof url == "string" && url.length > 0) {
                let strArr = url.split("#");
                for (let i = 0; i < strArr.length; i++) {
                    let url = cv.dataHandler.getUserData().getImageUrlByPlat(strArr[i])
                    cv.resMgr.downloadImg(url);
                }
            }
            cv.MessageCenter.send("updata_star_redpacket");
        }
    }

    public NoticeLuckStarseatCloseActive(puf: any) {
        let msg: game_pb.LuckStarSeatCloseActiveNotice = this.decodePB("LuckStarSeatCloseActiveNotice", puf);
        if (msg) {
            cv.GameDataManager.tRoomData.starRedpacketInfo.reset();
            cv.MessageCenter.send("updata_star_redpacket");
        }
    }

    public NoticeLuckStarseatDrawResult(puf: any) {
        let msg: game_pb.LuckStarSeatDrawResultNotice = this.decodePB("LuckStarSeatDrawResultNotice", puf);
        if (msg) {
            if (msg.user_id == cv.dataHandler.getUserData().u32Uid) {
                cv.gameNet.requestGetSelfLuckStarSeatResultList();
                cv.MessageCenter.send("star_redpacket_result", msg);
            }

            if (msg.amount > 0) {
                cv.MessageCenter.send("star_redpacket_result_action", msg);
            }
        }
    }

    public requestGetLuckStarSeatDrawList() {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;
        let msg = { room_id: roomid };
        let pbbuf = this.encodePB("GetLuckStarSeatDrawListRequest", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GetLuck_StarSeat_DrawList_Request, roomid);
    }

    public ResponseGetLuckStarSeatDrawList(puf: any) {
        let msg: game_pb.GetLuckStarSeatDrawListResponse = this.decodePB("GetLuckStarSeatDrawListResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("update_star_seat_draw_list", msg);
            } else {
                cv.ToastError(msg.error);
            }
        }
    }

    public requestGetSelfLuckStarSeatResultList() {
        let roomid = cv.GameDataManager.tRoomData.u32RoomId;
        let msg = { room_id: roomid };
        let pbbuf = this.encodePB("GetSelfLuckStarSeatResultListRequest", msg);
        this.sendGameMsg(pbbuf, game_pb.MSGID.MsgId_GetSelf_LuckStarSeat_ResultList_Request, roomid);
    }

    public ResponseGetSelfLuckStarSeatResultList(puf: any) {
        let msg: game_pb.GetSelfLuckStarSeatResultListResponse = this.decodePB("GetSelfLuckStarSeatResultListResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("update_self_star_seat_result_list", msg.self_result_list);
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
}
