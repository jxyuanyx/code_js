import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../components/lobby/cv";
import { eClubSceneView, ClubScene } from "../../components/club/ClubScene";
import { RemindData, eRemindMsgStatus, eRemindMsgType } from "../../data/globalMsg/RemindData";
import { ClubData } from "../../data/club/ClubData";
import { NetWorkProxy } from "./NetWorkProxy";
import { RankData } from "../../data/userData";
import { PushNoticeData, PushNoticeType, PushNotice } from "../prefab/PushNotice";
import { BannerInfo } from "../../data/DataHandler";
import MTTConnector from "../../../mtt/script/common/MTTConnector";
import BJPVPConnector from "../../../blackjackpvp/script/common/BJPVPConnector";

/**
 * 
 * 世界服消息处理模块
 * 
 */
export class WorldNetWork extends NetWorkProxy {
    public static instence: WorldNetWork;
    public init() {
        //！ 世界服消息注册
        this.registerMsg(world_pb.MSGID.MsgID_DupLogin_Notice, this.NoticeDupLogin.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_HeartBeat_Response, this.responseHeartBeat.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetUserData_Response, this.responseGetUserData.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetUserData_Notice, this.noticeGetUserData.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_NotifyUserGoldNum_Notice, this.NoticeCoinChanged.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AddRemarks_Response, this.HandResponseAddRemarks.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AddRemarks_Notice, this.HandNoticeAddRemarks.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_JackpotAmout_Notice, this.NoticeJackpotAmout.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_JackPotAwardInfo_Notice, this.NoticeJackPotAwardInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Logon_Response, this.responseLoginServer.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Login_Notice, this.NoticeLoginServer.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_NotifyUserMailNum, this._noticeMailNum.bind(this));                                                       // 通知客户端当前邮件数量
        this.registerMsg(world_pb.MSGID.MsgID_NoticeOneMail, this._noticeOneMail.bind(this));                                                           // 通知客户端新的一条邮件
        this.registerMsg(world_pb.MSGID.MsgID_NoticeOneAnounce, this._noticeOneAnnounce.bind(this));                                                    // 通知客户端新的一条公告
        this.registerMsg(world_pb.MSGID.MsgID_NoticeWithdrawMail, this._noticeWithdrawMail.bind(this));                                                 // 撤销一封邮件
        this.registerMsg(world_pb.MSGID.MsgID_NoticeWithdrawAnounce, this._noticeWithdrawAnnounce.bind(this));                                          // 撤销一封公告

        this.registerMsg(world_pb.MSGID.MsgID_NoticeCreateClub, this._noticeCreateClub.bind(this));                                                     // 俱乐部 创建/解散/离开
        this.registerMsg(world_pb.MSGID.MsgID_JoinClub_Response_To_Member, this._responseJoinClubToMember.bind(this));                                  // 请求批准加入俱乐部(反馈消息成功与否)
        this.registerMsg(world_pb.MSGID.MsgID_JoinClub_Notice_To_Member, this._noticeJoinClubToMember.bind(this));                                      // 请求批准加入俱乐部(反馈结果给申请者和管理员)
        this.registerMsg(world_pb.MSGID.MsgID_JoinClub_Response_To_Admin, this._responseJoinClubToAdmin.bind(this));                                    // 请求批准加入俱乐部(反馈提示给管理员)
        this.registerMsg(world_pb.MSGID.MsgID_JoinClub_Notice, this._noticeJoinClubToAdmin.bind(this));                                                 // 请求批准加入俱乐部(反馈申请给管理员)
        this.registerMsg(world_pb.MSGID.MsgID_LeaveAlliance_Notice, this._noticeLeaveAlliance.bind(this));                                              // 退出联盟通知盟主
        this.registerMsg(world_pb.MSGID.MsgID_ModifyClubMember_Notice, this._noticeModifyClubMember.bind(this));                                        // 修改俱乐部权限

        this.registerMsg(world_pb.MSGID.MsgID_SearchClubInfo_Response, this.responseCommon.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_SearchClubInfo_Notice, this.NoticeSearchClubInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_CreateAlliance_Response, this.ResponseCreateAlliance.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_SearchAlliance_Response, this._responseSearchAllianceInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_SearchAlliance_Notice, this._noticeSearchAllianceInfo.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_JoinAlliance_Response_To_Admin, this._responseJoinAllianceToAdmin.bind(this));                            // 加入联盟通知盟主
        this.registerMsg(world_pb.MSGID.MsgID_JoinAlliance_Notice_To_Admin, this._noticeJoinAlliance.bind(this));                                       // 加入联盟通知盟主

        this.registerMsg(world_pb.MSGID.MsgID_JoinAlliance_Response_To_Member, this._responseJoinAllianceToMember.bind(this));                          // 加入联盟通知申请者
        this.registerMsg(world_pb.MSGID.MsgID_JoinAlliance_Notice_To_Member, this._noticeJoinAllianceToMember.bind(this));                              // 加入联盟通知申请者

        this.registerMsg(world_pb.MSGID.MsgID_GameStatusV2_Response, this.HandleGameStatusMessage.bind(this)); //MsgID_GameStatus_Response
        this.registerMsg(world_pb.MSGID.MsgID_CowBoy_List_Response, this.cowBoyResponseRoomList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_VideoCowboy_List_Response, this.videoResponseRoomList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_HumanBoy_List_Response, this.humanBoyResponseRoomList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_PokerMaster_List_Response, this.pokerMasterResponseRoomList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Draw_Notice, this._HandleNoticeLuckDraw.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Aof_Thouthand_response, this._HandleAofThouthand.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_SetSecretKey_Response, this.ResponseSetSecretKey.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_SetSecretKeyEx_Response, this.ResponseSetEcdhSecretKey.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Referrals_Response, this._HandleReferralsResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_InviteSummary_Response, this._HandleInviteSummaryResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_InviteIncomeRedeem_Response, this._HandleInviteIncomeRedeemResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Snaplist_Notice, this._HandleLuckTurntableSnaplistNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Countdown_Notice, this._HandleLuckTurntableCountdownNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Result_Notice, this._HandleLuckTurntableResultNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Snaplist_Response, this._HandleLuckTurntableSnaplistResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_EndTime_Notice, this._HandleLuckTurntableEndTimeNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_StartTime_Notice, this._HandleLuckTurntableStartTimeNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Over_Notice, this._HandleLuckTurntableOverNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Ready_Notice, this._HandleLuckTurntableReadyNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Result_Response, this._HandleLuckTurntableResultResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Turntable_Draw_Notice, this._HandleLuckTurntableDrawNotice.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Create_RedBag_Response, this.ResponseCreateRedBag.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Notice, this.NoticeRedBag.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Info_Response, this.ResponseRedBagInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Set_Amount_Response, this.ResponseRedBagSetAmount.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Draw_Response, this.ResponseRedBagDraw.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Open_Notice, this.NoticeRedBagOpen.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_History_Response, this.ResponseRedBagHistory.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Boom2Creater_Notify, this.NotifyRedBagBoom.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Status_Response, this.ResponseRedBagStatus.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_RedBag_AutoDraw_Response, this.ResponseAutoDraw.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_LastInfo_Response, this.ResponseLastInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_Drawed2Creator_Notice, this.NoticeDrawed2Creator.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_JackpotInfo_Response, this.ResponseRedPacketJP.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_StatisticsInfo_Response, this.ResponseRedPacketTj.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_RedBag_JackpotUpdate_Notice, this.RedPacketJpNotice.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_GlobalMessage_Notice, this.HandleNoticeGlobalMessage.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Banner_Response, this._HandleBannerResponseNotic.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetRank_Response, this._HandleRankResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_CheckSafe_response, this.responseCheckSafe.bind(this));

        //safe
        this.registerMsg(world_pb.MSGID.MsgID_DepositInStrongbox_Response, this.ResponseDeposit.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_TakeoutStrongbox_Response, this.ResponseTakeOut.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_StrongboxDetail_Response, this.ResponseDetail.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetStrongboxInfo_Response, this.ResponseStrongboxInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_JoinAlliance_UserCancel_Response, this.ResponseJoinAllianceUserCancel.bind(this));

        //mtt
        // if (cv.config.HAVE_MTT) {
        this.registerMsg(world_pb.MSGID.MsgID_AuthApi_Response, this.ResponseAuthApi.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AuthApi_Notice, this.NoticeAuthApi.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GameMaintainStatus_Notice, this.NoticeMTTStatus.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_MiniGames_List_Response, this.MiniGamesListResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgId_BlackJackLogin_Response, this.responseBlackJackAuthApi.bind(this));

        //MTT战绩数据
        this.registerMsg(world_pb.MSGID.MsgID_MttResult_Notice, this.MttResultNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_MttResult_Response, this.MttResultResponse.bind(this));
        //MTT战绩返回
        this.registerMsg(world_pb.MSGID.MsgID_MttDetail_Notice, this.MttDetailNoticeResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_MttDetail_Response, this.MttDetailResponse.bind(this));
        //MTT UserData
        this.registerMsg(world_pb.MSGID.MsgID_MttGameSum_Notice, this.MttUserDataNoticeResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_MttGameSum_Response, this.MttUserDataResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Exchange_UserPoints_Response, this.ExchangeUserPointsResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Goods_List_Response, this.GoodsListResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_Bank_Details_Query_Response, this.BankDetailsQueryResponse.bind(this));
        // }
        //明星信息详情返回
        this.registerMsg(world_pb.MSGID.MsgID_StarInfo_Response, this.StarInfoResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Get_Scaler_Quote_Response, this.GetScalerQuoteResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_Exchange_Currency_Response, this.ExchangeCurrencyResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_GetUsdtExchange_Config_Response, this.ExchangeGetUsdtConfigResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_UsdtExchange_Config_Notice, this.ExchangeGetUsdtConfigNotice.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_BuyinEvent_UsdtChanage_Notice, this.BuyinEventUsdtChanageNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetUserMarks_Response, this.GetUserMarks.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_UpdateUserMarks_Reponse, this.UpdateUserMarks.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ReceiveTools_Response, this.ReceiveToolsResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ReceiveTools_Notice, this.ReceiveToolsNotice.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_QuickRaise_Response, this.QuickRaiseResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_DefaultSetting_Response, this.DefaultSettingResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_StarAllow_Response, this.CheckStarRoomResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_StarWillBegin_Notice, this.StarWillBeginNotice.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_GetUserHelpWarpList_Response, this.GetUserHelpWarpListResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AddHelper_Response, this.AddHelperResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetTotalHistoryAmount_Response, this.GetTotalHistoryAmountResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_UserReceiveHelpWarp_Response, this.UserReceiveHelpWarpResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AddHelpWrap_Notice, this.AddHelpWrapNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_UserHelpWarpChange_Notice, this.UserHelpWarpChangeNotice.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_LeftHelpCountChange_Notice, this.LeftHelpCountChangeNotice.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_UserChangeLanguage_Response, this.UserChangeLanguageResponse.bind(this));

        //体育赛事
        this.registerMsg(world_pb.MSGID.MsgID_SportsLogin_Response, this.SportsLoginResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_SportsLeave_Response, this.SportsLeaveResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgID_BatchDelRemarks_Response, this.BatchDelRemarksResponse.bind(this));

        this.registerMsg(world_pb.MSGID.MsgId_GetTexasTotalHands_Response, this.GetTexasHandsResponse.bind(this));

        //老虎机
        this.registerMsg(world_pb.MSGID.MsgID_PgLogin_Response, this.PgLoginResponse.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_PgLeave_Response, this.PgLeaveResponse.bind(this));

        //红包福利请求
        this.registerMsg(world_pb.MSGID.MsgID_PgBonusAndFreeGames_Response, this.PgBonusAndFreeGamesResponse.bind(this));


        //小游戏冷静接口
        this.registerMsg(world_pb.MSGID.MsgID_OpenCalmDownWindows_Notice, this.noticeOpenCalmDownWindows.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_CalmDownConfirm_Response, this.responseCalmDownConfirm.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_CalmDownConfirmResult_Notice, this.noticeCalmDownConfirmResult.bind(this));
    }
    public onConnectOpen() {
        cv.netWorkManager.StartWorldHeartBeat();
        this.requestLoginServer();
    }
    public onConnectError() {
        if (cv.netWorkManager.isAppEnterBackground()) return;
        if (!cv.dataHandler.getUserData().isFirstLogin || !cv.domainMgr.isHaveNextServer()) {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast21"), cv.Enum.ToastType.ToastTypeError);
        }
        cv.MessageCenter.send("updateNetWork", cv.Enum.SeverType.SeverType_World);
        cv.netWorkManager.UpdateNetwork(0);
    }

    public registerMsg(msgid: number, fn: any): void {
        this.registerMessage(msgid, fn, cv.Enum.GameId.World);
    }

    public sendWorldMsg(pbbuf: any, msgid: number, Roomid: number): boolean {
        return this.sendMsg(pbbuf, msgid, 0, cv.Enum.SeverType.SeverType_World, cv.Enum.GameId.World);
    }

    public NoticeCoinChanged(puf) {
        let msg: world_pb.NoticeNotifyUserGoldNum = this.decodePB("NoticeNotifyUserGoldNum", puf)
        if (msg) {
            if (msg.uid == cv.dataHandler.getUserData().u32Uid) {
                cv.dataHandler.getUserData().u32Chips = msg.goldNum;
                cv.dataHandler.getUserData().game_coin = msg.game_coin;
                cv.dataHandler.getUserData().total_amount = msg.total_amount;
                cv.dataHandler.getUserData().user_points = msg.total_points;
                cv.dataHandler.getUserData().usdt = msg.usdt;
                cv.MessageCenter.send("update_gold");
            }
        }
    }

    public requestLoginServer() {
        let device_info: string = cv.dataHandler.getUserData().deviceInfo;
        if (cv.StringTools.getArrayLength(device_info) === 0) {
            device_info = cv.native.GetDeviceUUID(true);
        }

        let msg: world_pb.RequestLogon = new world_pb.RequestLogon();
        msg.version = cv.config.GET_CLIENT_VERSION();
        msg.token = cv.dataHandler.getUserData().user_token;
        msg.device_info = device_info;
        msg.invitation_code = cv.dataHandler.getUserData().invitation_code || "";
        msg.client_type = cv.config.GET_CLIENT_TYPE();
        msg.CurrentLanguage = cv.config.getCurrentLanguage();
        msg.os = cc.sys.os;
        msg.os_version = cv.native.getSystemVersion();

        if (cv.native.IsSimulator() && cc.sys.os === cc.sys.OS_ANDROID) {
            msg.os = `${cc.sys.OS_ANDROID}-Simulator`;
        }

        let puf: any = this.encodePB("RequestLogon", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Logon_Request, 0);
    }

    public responseLoginServer(puf) {
        let msg = this.decodePB("ResponseLogon", puf);
        if (msg) {
            MTTConnector.instance.initCCVV();
            cc.vv.ConsoleLog.log("responseLoginServer", msg);
            if (msg.bl_mtt_status) {
                let preNum = cv.config.HAVE_MTT;
                if (msg.bl_mtt_status == 2) {
                    cv.config.HAVE_MTT = false;
                }
                else if (msg.bl_mtt_status == 1) {
                    cv.config.setMTT();
                    if (msg.mttData) {
                        MTTConnector.instance.onAuthMttSucc(msg.mttData);
                    }
                    else {
                        MTTConnector.instance.onAuthMttError(MTTConnector.instance.config.tokenErrorMsg.NO_TOKEN);
                    }
                }
                if (preNum != cv.config.HAVE_MTT) {
                    cv.MessageCenter.send("update_mtt_state");
                }
            }
            else {
                if (msg.mttData) {
                    MTTConnector.instance.onAuthMttSucc(msg.mttData);
                }
                else {
                    MTTConnector.instance.onAuthMttError(MTTConnector.instance.config.tokenErrorMsg.NO_TOKEN);
                }
            }

            if (msg.blackJackStatus) {
                let preNumJack = cv.config.HAVE_BLACKJACK;
                if (msg.blackJackStatus == 2) {  //21点，2是维护，1是开启
                    cv.config.setBlackJack(false);
                }
                else if (msg.blackJackStatus == 1) {
                    cv.config.setBlackJack(true);
                    if (msg.blackJackData) {
                        BJPVPConnector.instance.onAuthBlackJackSucc(msg.blackJackData);
                    }
                    else {
                        BJPVPConnector.instance.onAuthBlackJackError(BJPVPConnector.instance.keyConfig.tokenErrorMsg.NO_TOKEN);
                    }
                }
                if (preNumJack != cv.config.HAVE_BLACKJACK) {  //如果状态有改变
                    cv.MessageCenter.send("update_blackJack_state");
                }
            }
            else {
                if (msg.blackJackData) {
                    BJPVPConnector.instance.onAuthBlackJackSucc(msg.blackJackData);
                }
                else {
                    BJPVPConnector.instance.onAuthBlackJackError(BJPVPConnector.instance.keyConfig.tokenErrorMsg.NO_TOKEN);
                }
            }

            let error = msg.error;
            if (error != 1) {
                if (error != 2 && error != 3 && error != 4 && error != 5 && error != 6 && error != 7 && error != 8 && error != 197 && error != 229) {
                    cv.TT.showMsg(cv.config.getStringData(cv.StringTools.formatC("ServerErrorCode%d", error)), cv.Enum.ToastType.ToastTypeError);
                }
                else {
                    // postNotification("closeRulePanel"); //隐藏webview，未处理
                    cv.netWorkManager.OnNeedRelogin(error);
                }
                cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
            }
            else {
                cv.dataHandler.getUserData().firstClubId = msg.firstClubId;
                cv.dataHandler.getUserData().firstAlliId = msg.firstAlliId;

                cv.dataHandler.getUserData().isEncrypt = [];
                cv.StringTools.deepCopy(msg.swtichList, cv.dataHandler.getUserData().isEncrypt);
                this.requestGetUserData();
                this.MiniGamesListRequest();
                //牛仔单独网页版游戏测试代码(不影响主游戏逻辑)
                if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                    cv.roomManager.RequestJoinRoom(10, 734547);
                } else {
                    this.requestSnapshotList();
                }

                if (cv.config.getCurrentScene() === cv.Enum.SCENE.HALL_SCENE) {
                    this.PgBonusAndFreeGamesRequest(); //请求小游戏福利数据
                }

                // 是否有助力红包
                if (msg.is_help_warp && cv.dataHandler.getUserData().isFirstLogin) {
                    cv.dataHandler.getUserData().isShow_help_warp = true;
                } else {
                    cv.dataHandler.getUserData().isShow_help_warp = false;
                }
                cv.dataHandler.getUserData().m_bIsLoginServerSucc = true;
                cv.netWorkManager.OnWorldServerLogin(error);

                /**
                 * H5为串行连接，当中转服断开以后，首先先连的world，当玩家还在游戏中时会NoticeLoginServer告知
                 * 当玩家被T出局时，客户端还在游戏场景，此时没有办法触法重连（C++会同时检测word服和游戏服的状态有两个socket，H5只有一个socket）
                 */
                // if (cv.roomManager.getCurrentGameID() != cv.Enum.GameId.GameId_Dummy) {
                //     cv.roomManager.RequestJoinRoom();
                // }
            }
        }
    }

    public NoticeLoginServer(puf) {
        let logon = this.decodePB("NoticeLogin", puf);
        if (logon) {
            if (logon.gameid != 0 && logon.roomid != 0) {
                cv.dataHandler.getUserData().m_bIsReconnect = true;
                let isQuick = false;
                if (cv.roomManager.checkGameIsZoom(logon.gameid)) {
                    isQuick = true;
                    cv.GameDataManager.tRoomData.u32GameID = logon.gameid;
                } else if (logon.gameid >= cv.Enum.GameId.Bet) {
                    cv.GameDataManager.tRoomData.u32GameID = logon.gameid;
                }
                console.log("NoticeLoginServer ==> gamid =" + logon.gameid + ", roomid = " + logon.roomid);
                cv.roomManager.RequestJoinRoom(logon.gameid, logon.roomid, isQuick);
            }
            else {
                let curSceneName: string = cv.config.getCurrentScene();
                // Not using this logic if inside MTT game or BJPVP
                if (curSceneName != cv.Enum.SCENE.HALL_SCENE && curSceneName != cv.Enum.SCENE.SPORTS_SCENE && !MTTConnector.instance.isInMTTGame() && !BJPVPConnector.instance.isInGame()) {
                    cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
                    cv.roomManager.setCurrentGameID(cv.Enum.GameId.GameId_Dummy);
                    cv.roomManager.reset();
                    cv.netWorkManager.closeGameHeart();
                    cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
                }
            }
        }
    }

    public requestDeviceInfoReport(channel) {
        let tempModule = cv.worldPB.lookupType("RequestDeviceInfoReport");
        if (tempModule) {
            let Ip = cv.dataHandler.getUserData().user_ip == null ? "127.0.0.1" : cv.dataHandler.getUserData().user_ip;
            let device_info = cv.dataHandler.getUserData().deviceInfo;
            if (cv.StringTools.getArrayLength(device_info) == 0) {
                device_info = cv.native.GetDeviceUUID(true);
            }
            let msg: object = { device_info: device_info, report_channel: channel, Ip: Ip };
            let pbbuf = tempModule.encode(msg).finish();

            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_DeviceInfo_Report_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_DeviceInfo_Report_Response, this.responseDeviceInfoReport.bind(this));
        }
    }

    public responseDeviceInfoReport(puf) {//貌似没有错误码
        let msg = this.decodePB("ResponseDeviceInfoReport", puf);
        if (msg) {
            let error = msg.error;
            if (error != 1) {
                //cv.TT.showMsg()
            }
        }
    }

    public requestGetAllRemarks() {
        let tempModule = cv.worldPB.lookupType("RequestGetAllRemarks");
        if (tempModule) {
            let msg: object = { playerid: cv.dataHandler.getUserData().u32Uid };
            let pbbuf = tempModule.encode(msg).finish();

            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_GetAllRemarks_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_GetAllRemarks_Response, this.responseCommon.bind(this));
            this.registerMsg(world_pb.MSGID.MsgID_GetAllRemarks_Notice, this.noticeGetAllRemarks.bind(this));
        }
    }

    public requestGetAllRemarksByUid(uid: number) {
        let tempModule = cv.worldPB.lookupType("RequestGetAllRemarks");
        if (tempModule) {
            let msg: object = { playerid: uid };
            let pbbuf = tempModule.encode(msg).finish();

            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_GetAllRemarks_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_GetAllRemarks_Response, this.responseCommon.bind(this));
            this.registerMsg(world_pb.MSGID.MsgID_GetAllRemarks_Notice, this.noticeGetAllRemarks.bind(this));
        }
    }

    public noticeGetAllRemarks(puf: any) {
        console.log(puf);
        let msg = this.decodePB("NoticeGetAllRemarks", puf);
        if (msg && msg.start) {
            cv.dataHandler.getUserData().vRemarkData.clear();
        }

        if (msg && msg.remarks_data != "null" && msg.remarks_data != "") {
            let remarks_data = JSON.parse(msg.remarks_data);
            for (let i = 0; i < remarks_data.length; i++) {
                cv.dataHandler.getUserData().addRemark(remarks_data[i].uid, remarks_data[i].type, remarks_data[i].remark, remarks_data[i].nickname, remarks_data[i].avatar, remarks_data[i].plat);
            }
            cv.MessageCenter.send("update_remarks");
        }
    }

    RequestAddRemarks(i32TargetId: number, i32Type: number, remark: string) {
        let tempModule = cv.worldPB.lookupType("RequestAddRemarks");
        if (tempModule) {
            let msg: object = { target_id: i32TargetId, remark_type: i32Type, taget_remark: remark };
            let pbbuf = tempModule.encode(msg).finish();

            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_AddRemarks_Request, 0);
        }
    }

    HandResponseAddRemarks(puf: any) {
        let msg = this.decodePB("ResponseAddRemarks", puf);
        if (msg) {
            if (msg.error != 1) {
                if (msg.error == 199) {
                    let curSceneName: string = cv.config.getCurrentScene();
                    let str = "";
                    if (curSceneName != cv.Enum.SCENE.HALL_SCENE) {
                        str = cv.config.getStringData("Remarks_error_1")
                    } else {
                        str = cv.config.getStringData("Remarks_error_0")
                    }
                    cv.TT.showMsgNew(str);
                } else {
                    cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + msg.error), cv.Enum.ToastType.ToastTypeWarning);
                }
            }
        }
    }

    HandNoticeAddRemarks(puf: any) {
        let msg = this.decodePB("NoticeAddRemarks", puf);
        if (msg) {
            let Json_Object = JSON.parse(msg.taget_remark);
            for (let i = 0; i < Json_Object.length; i++) {
                let nUid = Json_Object[i]["uid"];
                let sRemark = Json_Object[i]["remark"];
                let nType = Json_Object[i]["type"];
                let nickname = Json_Object[i]["nickname"];
                let avatar = Json_Object[i]["avatar"];
                let plat = Json_Object[i]["plat"];
                cv.dataHandler.getUserData().addRemark(nUid, nType, sRemark, nickname, avatar, plat);
            }
            cv.MessageCenter.send("update_remarks");
        }
    }

    public requestCurrentBoardList() {
        let tempModule = cv.worldPB.lookupType("RequestClubCurrentBoard");
        if (tempModule) {
            let msg: object = {};
            let pbbuf = tempModule.encode(msg).finish();
            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_ClubCurrentBoard_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_ClubCurrentBoard_Response, this.responseCommon.bind(this));
            this.registerMsg(world_pb.MSGID.MsgID_ClubCurrentBoard_Notice, this.noticeCurrentBoardList.bind(this));
        }
    }

    public noticeCurrentBoardList(puf: any) {
        let noti: world_pb.NoticeClubCurrentBoard = this.decodePB("NoticeClubCurrentBoard", puf);
        if (!noti) return;
        let vClubCurrentBoardList: world_pb.ClubGameSnapshot[] = cv.clubDataMgr.getClubCurrentBoardList();
        if (noti.page === 1) {
            cv.StringTools.clearArray(vClubCurrentBoardList);
        }

        for (let i = 0; i < noti.list.length; ++i) {
            vClubCurrentBoardList.push(world_pb.ClubGameSnapshot.create(noti.list[i]));
        }

        if (vClubCurrentBoardList.length == noti.total) {
            cv.MessageCenter.send("noticeCurrentBoardList");
        }
    }

    public responseCommon(puf) {
        let msg = this.decodePB("ResponseGetAllRemarks", puf);
        if (msg) {
            let error = msg.error;
            console.log("error::.>" + error);
            if (error != 1) {
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + error), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    public requestHeartBeat(): boolean {
        let location: object = cv.native.GetLocation();
        let ip: string = cv.String(cv.dataHandler.getUserData().user_ip);
        if (ip.length <= 0) ip = "127.0.0.1";

        // save经纬度(提供给php登录使用, 因为该底层API延时过高不能及时取到值)
        cv.tools.SaveStringByCCFile("longitude", cv.String(location["longitude"]));
        cv.tools.SaveStringByCCFile("latitude", cv.String(location["latitude"]));

        // 上传world服
        let msg: world_pb.RequestHeartBeat = new world_pb.RequestHeartBeat();
        msg.position = world_pb.PositionInfo.create();
        msg.position.longtitude = cv.Number(location["longitude"]);
        msg.position.latitude = cv.Number(location["latitude"]);
        msg.position.ip = ip;
        msg.uid = cv.dataHandler.getUserData().u32Uid;

        let puf: any = this.encodePB("RequestHeartBeat", msg);
        return this.sendWorldMsg(puf, world_pb.MSGID.MsgID_HeartBeat_Request, 0);
    }

    public responseHeartBeat(puf) {
        let msg = this.decodePB("ResponseHeartBeat", puf);
        // console.log("recev world heartbeat====================");
        if (msg) {
            let error = msg.uid;

            // console.log("uid::.>" + error);
            cv.netWorkManager.onWorldHeartBeat();
        }
    }

    public NoticeDupLogin(puf) {
        let msg = this.decodePB("DupLoginNotice", puf);
        // console.log("recev world heartbeat====================");
        if (!msg) return;
        if (msg.error == 224) {
            cv.netWorkManager.OnNeedRelogin(224);
        }
        else {
            cv.netWorkManager.OnNeedRelogin(4);
        }
    }

    public requestGetUserData() {
        let RequestGetUserData = cv.worldPB.lookupType("RequestGetUserData");
        if (RequestGetUserData) {
            let msg: object = { user_id: cv.dataHandler.getUserData().u32Uid }
            let pbbuf = RequestGetUserData.encode(msg).finish();

            return this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_GetUserData_Request, 0);
        }
    }

    public responseGetUserData(puf) {
        let msg = this.decodePB("ResponseGetUserData", puf);
        if (msg) {
            let error = msg.error;

            console.log("error::.>" + error);
        }
    }

    public noticeGetUserData(puf) {

        let data: world_pb.NoticeGetUserData = this.decodePB("NoticeGetUserData", puf);
        //let NoticeGetUserData = cv.worldPB.lookupType("NoticeGetUserData");
        if (data) {
            // let recvMsg = new Uint8Array(puf);
            // let data = NoticeGetUserData.decode(recvMsg);
            cv.dataHandler.getUserData().nick_name = data.nick_name;
            cv.dataHandler.getUserData().u32Chips = data.user_gold;
            cv.dataHandler.getUserData().total_amount = data.total_amount;
            cv.dataHandler.getUserData().game_coin = data.game_coin;
            cv.dataHandler.getUserData().user_points = data.user_points;
            cv.dataHandler.getUserData().points_ratio = data.ratio;
            cv.dataHandler.getUserData().headUrl = data.avatar;
            cv.dataHandler.getUserData().u32Uid = data.user_id;
            cv.dataHandler.getUserData().mobile = data.mobile;
            cv.dataHandler.getUserData().gender = data.gender;
            cv.dataHandler.getUserData().user_marks = data.user_marks;
            cv.dataHandler.getUserData().clubs_max = data.clubs_max;
            cv.dataHandler.getUserData().current_clubs = data.current_clubs;
            cv.dataHandler.getUserData().u32CardType = data.card_type;
            cv.dataHandler.getUserData().u32Deposit_gold = data.deposit_gold;
            cv.dataHandler.getUserData().usdt = data.usdt;
            cv.dataHandler.getUserData().deposit_usdt = data.deposit_usdt;
            cv.dataHandler.getUserData().priorityareaCode = data.areaCode;
            cv.dataHandler.getUserData().prioritymobile = data.mobile2;

            cv.dataHandler.getUserData().cur_system_time = data.system_time; //当前系统时间
            cv.dataHandler.getUserData().calm_down_deadline_time = data.calm_down_deadline_time; //小游戏冷静截至时间戳

            cv.MessageCenter.send("update_info");
            if (!cv.dataHandler.getUserData().bGetTHands) {
                cv.worldNet.GetTexasHandsRequest();
            }
        }
    }
    //-------jackpot
    public RequestCurrentRoomJackpot(culbid: number, roomID: number, blindLevel: number) {
        let CurrentRoomJackpot = cv.worldPB.lookupType("RequestCurrentRoomJackpot");
        if (CurrentRoomJackpot) {
            let sendWorldMsg = { club_id: culbid, room_id: roomID, blind_level: blindLevel };
            let pbbuf = CurrentRoomJackpot.encode(sendWorldMsg).finish();
            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_CurrentRoomJackpot_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_CurrentRoomJackpot_Response, this.ResponseCurrentRoomJackpot.bind(this));
            this.registerMsg(world_pb.MSGID.MsgID_CurrentRoomJackpot_Notice, this.NoticeCurrentRoomJackpot.bind(this));
        }
    }

    public ResponseCurrentRoomJackpot(puf) {
        let msg = this.decodePB("ResponseCurrentRoomJackpot", puf);
        if (msg) {
            let error = msg.error;

            console.log("error::.>" + error);
        }
    }

    public NoticeCurrentRoomJackpot(puf) {
        let NoticeJackpot = cv.worldPB.lookupType("NoticeCurrentRoomJackpot");
        if (NoticeJackpot) {
            let buffer = new Uint8Array(puf);
            let ret = NoticeJackpot.decode(buffer);
            cv.GameDataManager.tJackPot.currentRoomJackpot.profit_scale = ret.profit_scale;
            cv.GameDataManager.tJackPot.currentRoomJackpot.drawin_amout = ret.drawin_amount;
            cv.GameDataManager.tJackPot.currentRoomJackpot.CurrentRoomAwardTypes = [];
            for (let i = 0; i < ret.awardTypes.length; i++) {
                cv.GameDataManager.tJackPot.currentRoomJackpot.pushCurrentRoomJackpot(ret.awardTypes[i].award_percent, ret.awardTypes[i].hand_level)
            }
            cv.MessageCenter.send("currentRoomJackpot", ret);
        }
    }

    public RequestGetJackpotData(clubId: number, roomID: number) {
        let RequestPauseGame = cv.worldPB.lookupType("RequestGetJackpotData");
        if (RequestPauseGame) {
            let sendWorldMsg = { club_id: clubId, room_id: roomID };
            let pbbuf = RequestPauseGame.encode(sendWorldMsg).finish();
            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_GetJackpotData_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_GetJackpotData_Response, this.ResponseGetJackpotData.bind(this));
            this.registerMsg(world_pb.MSGID.MsgID_GetJackpotData_Notice, this.NoticeGetJackpotData.bind(this));
        }
    }

    public ResponseGetJackpotData(puf) {
        let msg = this.decodePB("ResponseGetJackpotData", puf);
        if (msg) {
            let error = msg.error;

            console.log("error::.>" + error);
        }
    }

    public NoticeGetJackpotData(puf) {
        let ret = this.decodePB("NoticeGetJackpotData", puf);
        if (ret) {
            cv.GameDataManager.tJackPot.club_id = ret.club_id;
            cv.GameDataManager.tJackPot.club_name = ret.club_name;
            cv.GameDataManager.tJackPot.baseJackpotInfos = [];
            for (let i = 0; i < ret.jackpots.length; i++) {
                let num: number = ret.jackpots[i].amount;
                cv.GameDataManager.tJackPot.pushJackPot(ret.jackpots[i].amount, ret.jackpots[i].blind_level)
            }
            cv.MessageCenter.send("on_jackpot_data", ret);
        }
    }

    public RequestJackpotAwardRecord(clubId: number, roomID: number, blind_level: number) {
        let JackpotAwardRecord = cv.worldPB.lookupType("RequestJackpotAwardRecord");
        if (JackpotAwardRecord) {
            let sendWorldMsg = { club_id: clubId, room_id: roomID, blind_level: blind_level };
            let pbbuf = JackpotAwardRecord.encode(sendWorldMsg).finish();
            this.sendWorldMsg(pbbuf, world_pb.MSGID.MsgID_JackpotAwardRecord_Request, 0);
            this.registerMsg(world_pb.MSGID.MsgID_JackpotAwardRecord_Response, this.ResponseJackpotAwardRecord.bind(this));
            this.registerMsg(world_pb.MSGID.MsgID_JackpotAwardRecord_Notice, this.NoticeJackpotAwardRecord.bind(this));
        }
    }

    public ResponseJackpotAwardRecord(puf) {
        let msg = this.decodePB("ResponseJackpotAwardRecord", puf);
        if (msg) {
            let error = msg.error;

            console.log("error::.>" + error);
        }
    }

    public NoticeJackpotAwardRecord(puf) {
        let ret = this.decodePB("NoticeJackpotAwardRecord", puf);
        if (ret) {
            cv.GameDataManager.tJackPot.award_players = [];
            for (let i = 0; i < ret.awardInfos.length; i++) {
                cv.GameDataManager.tJackPot.pusHaward_players(ret.awardInfos[i])
            }
            cv.GameDataManager.tJackPot.lucky_Dog(ret.luckDog);
            cv.MessageCenter.send("jackpotAwardRecord", ret);
        }
    }

    public static getInstance(): WorldNetWork {
        if (!this.instence) {
            this.instence = new WorldNetWork();
            this.instence.init();
        }
        return this.instence;
    }
    public NoticeJackpotAmout(puf) {
        let msg = this.decodePB("NoticeJackpotAmout", puf);
        cv.GameDataManager.tJackPot.Push_blind_level = msg.blind_level;
        cv.GameDataManager.tJackPot.Push_club_id = msg.club_id;
        cv.GameDataManager.tJackPot.Push_current_amout = msg.current_amout;
        cv.GameDataManager.tJackPot.Push_prev_amount = msg.prev_amount;
        cv.GameDataManager.tJackPot.updateDateBaseInfoAmountData(msg.blind_level, msg.current_amout);
        cv.GameDataManager.tJackPot.updateDateJackPotSetAmountData(msg.blind_level, msg.current_amout);
        cv.MessageCenter.send("update_jackpotAmount");
    }
    public NoticeJackPotAwardInfo(puf) {
        let msg = this.decodePB("NoticeJackPotAwardInfo", puf);
        if (msg.sys_msg_type == 1) {
            let info;
            if (msg.gameId == cv.Enum.GameId.Jackfruit) {
                info = cv.JackfruitManager.tRoomData.noticeJackPotAwardInfo;
            }
            else {
                info = cv.GameDataManager.tJackPot.noticeJackPotAwardInfo;
            }
            info.cur_time = msg.cur_time;
            info.msg_type = msg.msg_type;
            info.blind_level = msg.blind_level;
            info.sys_msg_type = msg.sys_msg_type;
            info.awardInfo = [];
            cv.StringTools.deepCopy(msg.awardInfo, info.awardInfo)
            cv.MessageCenter.send("show_hit_jackPotCardType");
        } else {
            for (let i = 0; i < msg.awardInfo.length; i++) {
                let info = msg.awardInfo[i];
                let pdata: PushNoticeData = new PushNoticeData();
                let name = info.award_player_name;
                let card_type = cv.config.getStringData(cv.StringTools.formatC("UITitle%d", 112 + msg.hand_level));
                let reward = info.award_amount;
                let rewardStr: string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(reward));
                let blind_level: string = "";
                let sKey: string = "";
                if (msg.gameId == cv.Enum.GameId.Jackfruit) {
                    blind_level = cv.StringTools.numToFloatString(msg.blind_level);
                    sKey = "UIJackpotHitJackfruitCardTypeNotice";
                    card_type = cv.config.getStringData(cv.StringTools.formatC("M_UITitle%d", 112 + info.hand_level));
                } else {
                    blind_level = cv.config.getblindString(msg.blind_level - 1);
                    sKey = "UIJackpotHitCardTypeNotice";
                    card_type = cv.config.getStringData(cv.StringTools.formatC("UITitle%d", 112 + info.hand_level));
                }
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    pdata.str = cv.StringTools.formatC(cv.config.getStringData(sKey), name, blind_level, card_type, rewardStr);
                } else {
                    pdata.str = cv.StringTools.formatC(cv.config.getStringData(sKey), name, card_type, blind_level, rewardStr);
                }
                for (let i = 0; i < msg.playGameIds.length; i++) {
                    let gameid = msg.playGameIds[i];
                    if (gameid == cv.Enum.GameId.Texas) {
                        pdata.msgType.push(PushNoticeType.PUSH_TEXAS);
                    }
                    else if (cv.roomManager.checkGameIsZoom(gameid)) {
                        pdata.msgType.push(PushNoticeType.PUSH_ZOOM_TEXAS);
                    }
                    else if (gameid == cv.Enum.GameId.Bet) {
                        pdata.msgType.push(PushNoticeType.PUSH_BET);
                    }
                    else if (gameid == cv.Enum.GameId.Jackfruit) {
                        pdata.msgType.push(PushNoticeType.PUSH_JACKFRUIT);
                    }
                    else if (gameid == world_pb.GameId.PLO) {
                        pdata.msgType.push(PushNoticeType.PUSH_PLO);
                    }
                    else if (gameid == world_pb.GameId.StarSeat) {
                        pdata.msgType.push(PushNoticeType.PUSH_STAR_SEAT);
                    }
                }

                PushNotice.getInstance().addPushNotice(pdata);
            }
        }

    }


    // -----------------------------------------------------------------------------------------------------------------
    // 请求俱乐部列表
    requestSnapshotList(): void {
        let msg = { uid: cv.dataHandler.getUserData().u32Uid };
        let puf = this.encodePB("RequestClubSnapshotList", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ClubSnapshotList_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ClubSnapshotList_Response, this._responseSnapshotList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ClubSnapshotList_Notice, this._noticeSnapshotList.bind(this));
    }
    private _responseSnapshotList(puf): void {
        let resp: world_pb.ResponseClubSnapshotList = this.decodePB("ResponseClubSnapshotList", puf);
        if (!resp) return;

        console.log("pb::MsgID_ClubSnapshotList_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeSnapshotList(puf): void {
        let noti: world_pb.NoticeClubSnapshotList = this.decodePB("NoticeClubSnapshotList", puf);
        if (!noti) return;

        console.log("pb::MsgID_ClubSnapshotList_Notice ==>>" + noti);

        // 填充数据
        do {
            cv.clubDataMgr.removeAllClubData();
            for (let i = 0; i < noti.list.length; ++i) {
                let data: world_pb.ClubSnapshotListParams = world_pb.ClubSnapshotListParams.create(noti.list[i]);

                let clubData: ClubData = new ClubData();
                clubData.club = data;
                cv.clubDataMgr.addClubData(clubData, false);

                // 更新权限
                if (data.club_id === cv.clubDataMgr.getCurOpClubData().club.club_id) {
                    cv.clubDataMgr.getCurOpClubData().club.has_create_alliance = data.has_create_alliance;
                }
            }
        } while (false);

        // 发送更新列表消息
        cv.MessageCenter.send("on_update_club_list");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求俱乐部创建者信息
    requestClubCreaterInfo(id: number): void {
        let msg = { club_id: id };
        let puf = this.encodePB("RequestClubCreaterInfo", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ClubCreaterInfo_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ClubCreaterInfo_Response, this._responseClubCreaterInfo.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ClubCreaterInfo_Notice, this._noticeClubCreaterInfo.bind(this));
    }
    private _responseClubCreaterInfo(puf): void {
        let resp: world_pb.ResponseClubCreaterInfo = this.decodePB("ResponseClubCreaterInfo", puf);
        if (!resp) return;

        console.log("pb::MsgID_ClubCreaterInfo_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeClubCreaterInfo(puf): void {
        let noti: world_pb.NoticeClubCreaterInfo = this.decodePB("NoticeClubCreaterInfo", puf);
        if (!noti) return;

        console.log("pb::MsgID_ClubCreaterInfo_Notice ==>>" + noti);

        let curOpClub: ClubData = cv.clubDataMgr.getCurOpClubData();
        curOpClub.clubExtra.club_owner_name = cv.String(noti.create_player_name);
        curOpClub.clubExtra.club_owner_thumb = cv.String(noti.create_player_thumb);
        cv.MessageCenter.send("update_roleInfo");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求俱乐部成员列表
    requestClubMemberSnapshotList(count: number, clubID: number): void {
        let clubData: ClubData = cv.clubDataMgr.getClubDataByID(clubID);
        if (!clubData || clubData.club.club_id <= 0) return;

        let memberParam: world_pb.ClubMemberSnapshotListParams = world_pb.ClubMemberSnapshotListParams.create();
        memberParam.club_id = clubData.club.club_id;
        memberParam.club_uid = cv.dataHandler.getUserData().u32Uid;
        memberParam.pull_count = count;
        if (clubData.clubExtra.club_member_list.length <= 0) {
            memberParam.pull_pos = 0;
        }
        else {
            //应服务器的改动，应该要传last_inc_id  cur_maxIncreaseIndex这个值缓存的就是last_inc_id字段
            // memberParam.pull_pos = clubData.clubExtra.club_member_list[clubData.clubExtra.club_member_list.length - 1].member_uid;
            memberParam.pull_pos = clubData.clubExtra.cur_maxIncreaseIndex;
            console.log(memberParam.pull_pos);
            console.log(clubData.clubExtra.cur_maxIncreaseIndex);

        }

        let msg = { param: memberParam };
        let puf = this.encodePB("RequestClubMemberSnapshotList", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ClubMemberSnapshotList_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ClubMemberSnapshotList_Response, this._responseClubMemberSnapshotList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ClubMemberSnapshotList_Notice, this._noticeClubMemberSnapshotList.bind(this));
    }
    private _responseClubMemberSnapshotList(puf): void {
        let resp: world_pb.ResponseClubMemberSnapshotList = this.decodePB("ResponseClubMemberSnapshotList", puf);
        if (!resp) return;

        console.log("pb::MsgID_ClubMemberSnapshotList_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeClubMemberSnapshotList(puf): void {
        let noti: world_pb.NoticeClubMemberSnapshotList = this.decodePB("NoticeClubMemberSnapshotList", puf);
        if (!noti) return;

        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (noti.total_count === clubData.clubExtra.club_member_list.length) return;
        //备注：原先为大于等于，由于排序变更，改成小于等于
        if (clubData.clubExtra.cur_maxIncreaseIndex != 0 && clubData.clubExtra.cur_maxIncreaseIndex <= noti.last_inc_id) return;
        clubData.clubExtra.cur_maxIncreaseIndex = noti.last_inc_id;
        console.log("noti.last_inc_id:: " + noti.last_inc_id);
        for (let i = 0; i < noti.snapshots.length; ++i) {
            let param: world_pb.ClubMemberSnapshot = world_pb.ClubMemberSnapshot.create(noti.snapshots[i]);
            param.member_icon = cv.String(param.member_icon);
            console.log("param.member_name:: " + param.member_name);
            clubData.clubExtra.club_member_list.push(param);
        }
        clubData.club.club_member_count = noti.total_count;
        cv.MessageCenter.send("update_memberList");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求搜索俱乐部成员
    requestSearchClubMember(clubID: number, searchID: string, searchType: number): void {
        let msg = {
            club_id: clubID,
            find_str: searchID,
            find_type: searchType
        };
        let puf = this.encodePB("RequestSearchClubMember", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SearchClubMember_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_SearchClubMember_Response, this._responseSearchClubMember.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_SearchClubMember_Notice, this._noticeSearchClubMember.bind(this));
    }
    private _responseSearchClubMember(puf): void {
        let resp: world_pb.ResponseSearchClubMember = this.decodePB("ResponseSearchClubMember", puf);
        if (!resp) return;

        console.log("pb::MsgID_SearchClubMember_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeSearchClubMember(puf): void {
        let noti: world_pb.NoticeSearchClubMember = this.decodePB("NoticeSearchClubMember", puf);
        if (!noti) return;

        let vSerachList: world_pb.ClubMemberSnapshot[] = cv.clubDataMgr.getCurOpClubData().clubExtra.club_member_search_list;
        cv.StringTools.clearArray(vSerachList);
        for (let i = 0; i < noti.snapshots.length; ++i) {
            vSerachList.push(world_pb.ClubMemberSnapshot.create(noti.snapshots[i]));
        }

        switch (noti.find_type) {
            // 俱乐部成员列表搜索
            case 1: cv.MessageCenter.send("updateSearchListM"); break;

            // 转账管理搜索
            case 2: cv.MessageCenter.send("updateSearchListF"); break;

            default: break;
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求俱乐部成员自动审核
    requestClubAutoAudit(id: number, audit: number): void {
        let msg = { club_id: id, is_agree: audit };
        let puf = this.encodePB("RequestAutoAgreeClub", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_AutoAgreeClubReply_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_AutoAgreeClubReply_Response, this._responseClubAutoAudit.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AutoAgreeClubReply_Notice, this._noticeClubAutoAudit.bind(this));
    }
    private _responseClubAutoAudit(puf): void {
        let resp: world_pb.ResponseAutoAgreeClub = this.decodePB("ResponseAutoAgreeClub", puf);
        if (!resp) return;

        console.log("pb::MsgID_AutoAgreeClubReply_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeClubAutoAudit(puf): void {
        let noti: world_pb.NoticeAutoAgreeClub = this.decodePB("NoticeAutoAgreeClub", puf);
        if (!noti) return;

        let clubID: number = noti.club_id;
        let nAudit: number = noti.is_agree;  // 0 : false, 1 : true
        let clubDataList: ClubData[] = cv.clubDataMgr.getClubDataList();
        for (let i = 0; i < clubDataList.length; ++i) {
            if (clubDataList[i].club.club_id === clubID) {
                clubDataList[i].club.is_agree = nAudit;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求修改俱乐部信息
    requestModifyClubInfo(data: world_pb.ModifyClubInfoParams): void {
        let param: world_pb.ModifyClubInfoParams = world_pb.ModifyClubInfoParams.create(data);
        let msg = { param: param };
        let puf = this.encodePB("RequestModifyClubInfo", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ModifyClubInfo_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ModifyClubInfo_Response, this._responseModifyClubInfo.bind(this));
    }
    private _responseModifyClubInfo(puf): void {
        let msg = this.decodePB("ResponseModifyClubInfo", puf);
        if (msg) {
            let error = msg.error;
            console.log("pb::MsgID_ModifyClubInfo_Response e_code ==>>" + error);
            if (error === 1) {
                cv.MessageCenter.send("ModiClubInfoSucc");
            }
            else {
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + msg.error), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求修改俱乐部成员权限
    requestModifyClubMember(targetID: number, actionType: number): void {
        let curOpClub: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (!curOpClub || curOpClub.club.club_id <= 0) return;

        let md_param: world_pb.ModifyClubMemberParams = world_pb.ModifyClubMemberParams.create();
        md_param.club_id = curOpClub.club.club_id;
        md_param.club_uid = cv.dataHandler.getUserData().u32Uid;
        md_param.target_id = targetID;
        md_param.action_type = actionType;

        let msg = { param: md_param };
        let puf = this.encodePB("RequestModifyClubMember", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ModifyClubMember_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ModifyClubMember_Response, this._responseModifyClubMember.bind(this));
    }
    private _responseModifyClubMember(puf): void {
        let resp: world_pb.ResponseModifyClubMember = this.decodePB("ResponseModifyClubMember", puf);
        if (!resp) return;

        console.log("pb::MsgID_ModifyClubMember_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.clubDataMgr.setClickManger(false);
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeModifyClubMember(puf): void {
        let noti: world_pb.NoticeModifyClubMember = this.decodePB("NoticeModifyClubMember", puf);
        if (!noti) return;

        console.log("MsgID_ModifyClubMember_Notice ==> ", noti);

        let clubID: number = noti.club_id;
        let curClubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (clubID == curClubData.club.club_id) {
            for (let i = 0; i < cv.clubDataMgr.getClubDataList().length; ++i) {
                let data: ClubData = cv.clubDataMgr.getClubDataList()[i];

                if (data.club.club_id === clubID) {
                    cv.StringTools.clearArray(data.clubExtra.club_member_list);
                    data.clubExtra.cur_maxIncreaseIndex = 0;
                    this.requestClubMemberSnapshotList(20, clubID);
                    break;
                }
            }
        }


        if (noti.target_player_id === cv.dataHandler.getUserData().u32Uid) {
            let key_white: string = cv.config.getStringData(cv.StringTools.formatC("tips_upto_manger_%d", noti.action_type));
            let key_color: string = cv.StringTools.formatC("UINoticeUptoManger%d", noti.action_type);
            cv.TT.showMsg(cv.StringTools.formatC(key_white, noti.club_name), cv.Enum.ToastType.ToastTypeInfo);

            let remindData: RemindData = new RemindData();
            remindData.msgNew = true;
            remindData.msgType = eRemindMsgType.RMSG_TYPE_CLUB;
            remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_NONE;
            remindData.msgTime = noti.op_time;
            remindData.msgContenMiddle.setData(key_color, noti.club_name);

            cv.globalMsgDataMgr.addRemindData(remindData);
            cv.MessageCenter.send("updateListView");
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求公平游戏举报
    public RequestFairPlayReport(roomid: number, clubId: number, room_uuid: number, game_uuid: number, suspect_uids: number[], contact: string, detail: string): void {
        let msg = {
            roomid: roomid,
            clubid: clubId,
            room_uuid: room_uuid,
            game_uuid: game_uuid,
            suspect_uids: suspect_uids,
            contact: contact,
            detail: detail,
        }

        let puf = this.encodePB("RequestFairPlayReport", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_FairPlay_Report_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_FairPlay_Report_Response, this._HandResponseFairPlayReport.bind(this));
    }

    private _HandResponseFairPlayReport(puf): void {
        let msg = this.decodePB("ResponseFairPlayReport", puf);
        if (msg) {
            let error = msg.error;
            console.log("pb::MsgID_FairPlay_Report_Response==>>" + error);
            if (error == 1) {
                cv.TP.showMsg(cv.config.getStringData("AuditTips"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
            }

        }
    }

    //查询举报是否免费
    RequestQuerySendFairReport(clubId: number, game_uuid_js: string, room_uuid_js: string): void {
        let msg = {
            club_id: clubId,
            game_uuid_js: game_uuid_js,
            room_uuid_js: room_uuid_js,
        }
        let puf = this.encodePB("RequestQuerySendFairReport", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_QuerySendFairReport_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_QuerySendFairReport_Response, this._HandResponseQuerySendFairReport.bind(this));
    }

    private _HandResponseQuerySendFairReport(puf): void {
        let msg = this.decodePB("ResponseQuerySendFairReport", puf);
        if (msg) {
            let error = msg.error;
            console.log("pb::_HandResponseQuerySendFairReport==>>" + error);
            if (error == 1) {
                cv.dataHandler.getUserData().isfirst = msg.isfirst;
                cv.dataHandler.getUserData().isgoldenough = msg.isgoldenough;
                cv.dataHandler.getUserData().chargefee = msg.chargefee;
                cv.dataHandler.getUserData().freecounts = msg.freecounts;
                cv.dataHandler.getUserData().auditGameuuid = msg.game_uuid_js;
                cv.MessageCenter.send("show_Audit", true);
            } else if (error == 200) {
                //表示没有权限
                cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips3"), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    //拉霸机获取
    RequestLuckDrawDone(id: number): void {
        let msg = {
            id: id,
        }
        let puf = this.encodePB("LuckDrawDoneRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Luck_Draw_Done_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_Luck_Draw_Done_Response, this._HandleNoticeLuckDrawDoneResponse.bind(this));
    }

    private _HandleNoticeLuckDrawDoneResponse(puf): void {
        let msg = this.decodePB("LuckDrawDoneResponse", puf);
        if (msg) {
            let error = msg.error;
            if (error != 1) {
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + msg.error), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    private _HandleNoticeLuckDraw(puf): void {
        let msg = this.decodePB("LuckDrawNotice", puf);
        if (msg) {

            cv.dataHandler.getUserData().lucks = [];
            cv.dataHandler.getUserData().luckindex = 0;
            for (let i = 0; i < msg.lucks.length; i++) {
                cv.dataHandler.getUserData().lucks.push(msg.lucks[i]);
            }
        }
        cv.MessageCenter.send("showLabaPanel");
    }
    RequestAofThouthand(selfid: number): void {
        let msg = {
            playerid: selfid,
        };
        let puf = this.encodePB("AofThouthandRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Aof_Thouthand_Request, 0);
    }

    private _HandleAofThouthand(puf): void {
        if (!this.isShowLuckTurntable()) { //PKC海外版,不显示拉霸提示
            return;
        }
        let msg = this.decodePB("AofThouthandResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                if (msg.Hand_New == 1) {
                    cv.TT.showMsg(cv.config.getStringData("LabaTips"), cv.Enum.ToastType.ToastTypeInfo, true);
                }
            }
            cv.dataHandler.getUserData().hand_num = msg.hand_num;
            cv.dataHandler.getUserData().luckdrawslen = msg.LuckDrawsLen;
            cv.dataHandler.getUserData().playerHands = msg.PlayerHands.slice(0);
            cv.MessageCenter.send("get_aof_game_thouthand");
        }
    }
    // -----------------------------------------------------------------------------------------------------------------
    // 请求修改俱乐部推广百分比
    requestModifyClubInvitePercent(clubID: number, percent: number): void {
        let msg = {
            club_id: clubID,
            percent: percent
        };
        let puf = this.encodePB("RequestSetClubInvitePercent", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SetClubInvitePercent_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_SetClubInvitePercent_Response, this._responseModifyClubInvitePercent.bind(this));
    }

    private _responseModifyClubInvitePercent(puf): void {
        let resp: world_pb.ResponseSetClubInvitePercent = this.decodePB("ResponseSetClubInvitePercent", puf);
        if (!resp) return;

        console.log("pb::MsgID_SetClubInvitePercent_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            let club_id: number = resp.club_id;
            let percent: number = resp.percent;
            let setInvitePercentMark: boolean = resp.setInvitePercentMark;
            let vClubDataList: ClubData[] = cv.clubDataMgr.getClubDataList();
            for (let i = 0; i < vClubDataList.length; ++i) {
                if (vClubDataList[i].club.club_id === club_id) {
                    vClubDataList[i].club.invitation_percent = percent;
                    vClubDataList[i].club.setInvitePercentMark = setInvitePercentMark;
                }
            }
            cv.TT.showMsg(cv.config.getStringData("UIClubSpreadSetSucess"), cv.Enum.ToastType.ToastTypeSuccess);
            cv.MessageCenter.send("update_modify_clubInvitePercent");
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求联盟列表
    requestAllianceSnapshotList(clubID: number): void {
        let msg = { club_id: clubID };
        let puf = this.encodePB("RequestAllianceList", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_AllianceList_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_AllianceList_Response, this._responseAllianceSnapshotList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AllianceList_Notice, this._noticeAllianceSnapshotList.bind(this));
    }
    private _responseAllianceSnapshotList(puf): void {
        let resp: world_pb.ResponseAllianceList = this.decodePB("ResponseAllianceList", puf);
        if (!resp) return;

        console.log("pb::MsgID_AllianceList_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeAllianceSnapshotList(puf): void {
        let noti: world_pb.NoticeAllianceList = this.decodePB("NoticeAllianceList", puf);
        if (!noti) return;

        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        cv.StringTools.clearArray(clubData.clubExtra.allianceList);
        for (let i = 0; i < noti.list.length; ++i) {
            clubData.clubExtra.allianceList.push(world_pb.AllianceListParams.create(noti.list[i]));
        }
        cv.MessageCenter.send("showAlliancelistView");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求搜索指定id的联盟信息
    requestSearchAllianceInfo(allianceID: number): void {
        let msg = { alliance_id: allianceID };
        let puf = this.encodePB("RequestSearchAllianceInfo", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SearchAlliance_Request, 0);
    }

    private _responseSearchAllianceInfo(puf): void {
        let resp: world_pb.ResponseSearchAllianceInfo = this.decodePB("ResponseSearchAllianceInfo", puf);
        if (!resp) return;

        console.log("pb::MsgID_SearchAlliance_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeSearchAllianceInfo(puf): void {
        let noti: world_pb.NoticeSearchAlliance = this.decodePB("NoticeSearchAlliance", puf);
        if (!noti) return;

        let clubData: ClubData = cv.clubDataMgr.getCurSearchClubData();
        clubData.clubExtra.allianceInfo = world_pb.NoticeSearchAlliance.create(noti);

        // 切换到联盟信息界面
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_ALLIANCE_INFO_VIEW,
            lastView: eClubSceneView.E_CSV_CURVIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
            transBoth: true
        });
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求新建俱乐部
    requestCreateClub(clubName: string, clubArea: string, clubIcon: string): void {
        let param: world_pb.ClubParams = world_pb.ClubParams.create();
        param.club_name = clubName;
        param.club_area = clubArea;
        param.club_icon = clubIcon;

        let msg = { param: param };
        let puf = this.encodePB("RequestCreateClub", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_CreateClub_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_CreateClub_Response, this._responseCreateClub.bind(this));
    }
    private _responseCreateClub(puf): void {
        let msg = this.decodePB("ResponseCreateClub", puf);
        if (msg) {
            let error = msg.error;
            console.log("pb::MsgID_CreateClub_Response e_code ==>>" + error);
            if (error != 1) {
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + msg.error), cv.Enum.ToastType.ToastTypeError);
            }
            else {
                cv.TT.showMsg(cv.config.getStringData("tips_club_create_ok"), cv.Enum.ToastType.ToastTypeSuccess);
                cv.MessageCenter.send("on_create_club_succ");
            }
        }
    }
    // 俱乐部 创建/解散/离开
    private _noticeCreateClub(puf): void {
        let noti: world_pb.NoticeCreateClub = this.decodePB("NoticeCreateClub", puf);
        if (!noti) return;

        let fillContentString: Function = (data: world_pb.NoticeCreateClub, remindData: RemindData): void => {
            // op_type - 1:创建 2:解散 3:俱乐部成员离开俱乐部
            // result - 1:成功, 否则:失败 (失败不会发notice, 失败原因response会弹出提示信息, 所以这里只插入成功时的消息)
            switch (data.op_type) {
                case 1: {
                    remindData.msgContenMiddle.setData("UINoticeClub_Create1", data.club_name);
                } break;

                case 2: {
                    // 会长 - > 解散俱乐部xxx成功/失败
                    if (data.club_create_uid === cv.dataHandler.getUserData().u32Uid) {
                        remindData.msgContenMiddle.setData("UINoticeClub_Dissolve1", data.club_name);
                    }
                    // 成员 - > 俱乐部xxx已被解散
                    else {
                        remindData.msgContenMiddle.setData("UINoticeClub_Dissolved", data.club_name);
                    }
                } break;

                case 3: {
                    // 会长 - 成员xxx离开了俱乐部xxx
                    if (data.club_create_uid === cv.dataHandler.getUserData().u32Uid) {
                        remindData.msgContenMiddle.setData("UINoticeClub_Leaved", data.u_name, data.club_name);
                    }
                    // 成员 - 离开xxx俱乐部成功/失败
                    else {
                        remindData.msgContenMiddle.setData("UINoticeClub_Leave1", data.club_name);
                    }
                } break;

                default: break;
            }
        }

        let remindData: RemindData = new RemindData();
        remindData.msgNew = true;
        remindData.msgType = noti.msg_type;
        remindData.msgTime = noti.op_time;
        remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_NONE;
        fillContentString(noti, remindData);

        cv.globalMsgDataMgr.addRemindData(remindData);
        cv.MessageCenter.send("updateListView");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求加入俱乐部(结果反馈给管理员或创建者)
    requestJoinClub(clubID: number, message: string): void {
        let msg = {
            club_id: clubID,
            club_uid: cv.dataHandler.getUserData().u32Uid,
            club_message: message,
            invitation_code: ""
        };
        let puf = this.encodePB("RequestJoinClub", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_JoinClub_Request, 0);
    }
    private _responseJoinClubToAdmin(puf): void {
        let resp: world_pb.ResponseJoinClubToAdmin = this.decodePB("ResponseJoinClubToAdmin", puf);
        if (!resp) return;

        console.log("pb::MsgID_JoinClub_Response_To_Admin error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeJoinClubToAdmin(puf): void {
        let noti: world_pb.NoticeJoinClub = this.decodePB("NoticeJoinClub", puf);
        if (!noti) return;

        console.log("pb::MsgID_JoinClub_Notice==>>" + noti);

        let dealFunc = (result: number, remindData: RemindData) => {
            // 批准
            if (result === 1) {
                this.requestJoinClubReply(1, noti.club_id, noti.club_uid, "");
            }
            // 拒绝
            else {
                cv.TP.showMsg("", cv.Enum.ButtonStyle.TWO_BUTTON, (edt: cc.EditBox) => {
                    if (!edt) return;
                    this.requestJoinClubReply(2, noti.club_id, noti.club_uid, edt.string);
                }, null, true);
                cv.TP.getEditBox().placeholder = cv.config.getStringData("NoticeLayer_tipspanel_Image_1_msgtext");
            }
        }

        let remindData: RemindData = new RemindData();
        remindData.msgNew = true;
        remindData.msgType = noti.msg_type;
        remindData.msgTime = noti.op_time;
        remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_PENDING;
        remindData.msgContenUp.setData("UINoticeClubName", noti.club_name);
        remindData.msgContenMiddle.setData("UINoticePlayerApplyJoin", cv.StringTools.formatC("%s(ID:%d)", noti.applicant_name, noti.club_uid));
        remindData.strTag = cv.StringTools.formatC("%d-%d-%d-%s", noti.msg_type, noti.club_id, noti.club_uid, noti.applicant_name);

        // 确认按钮回调
        remindData.msgEnsureFunc = (remindData: RemindData, cellIndex: number, dataIndex: number) => {
            dealFunc(1, remindData);
        }

        // 取消按钮回调
        remindData.msgCancelFunc = (remindData: RemindData, cellIndex: number, dataIndex: number) => {
            dealFunc(2, remindData);
        }

        cv.globalMsgDataMgr.addRemindData(remindData);
        cv.MessageCenter.send("updateListView");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 管理员或创建者端请求 批准/拒绝(结果反馈给申请者)
    private requestJoinClubReply(result: number, club_id: number, uid: number, reason: string): void {
        let msg = {
            result: result,
            club_id: club_id,
            uid: uid,
            reason: reason
        };
        let puf = this.encodePB("ReplyJoinClub", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_JoinClub_Reply, 0);
    }
    private _responseJoinClubToMember(puf): void {
        let resp: world_pb.ResponseJoinClubToMember = this.decodePB("ResponseJoinClubToMember", puf);
        if (!resp) return;

        console.log("pb::MsgID_JoinClub_Response_To_Member error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeJoinClubToMember(puf): void {
        let noti: world_pb.NoticeJoinClubToMember = this.decodePB("NoticeJoinClubToMember", puf);
        if (!noti) return;

        console.log("pb::MsgID_JoinClub_Notice_To_Member ==>>" + noti);

        // 刷新俱乐部,牌局列表
        this.requestSnapshotList();
        this.requestCurrentBoardList();

        let strTag: string = cv.StringTools.formatC("%d-%d-%d-%s", noti.msg_type, noti.club_id, noti.uid, noti.apply_name);
        let remindData: RemindData = cv.globalMsgDataMgr.getRemindInfoByStrTag(strTag);
        if (!remindData) {
            remindData = new RemindData();
            remindData.msgNew = true;
        }
        else {
            remindData.strTag = "";
        }
        remindData.msgTime = noti.op_time;
        remindData.msgType = noti.msg_type;
        remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_NONE;
        remindData.msgContenUp.setData("UINoticeClubName", noti.club_name);

        // 自己是管理员
        if (noti.admin_id === cv.dataHandler.getUserData().u32Uid) {
            remindData.msgContenMiddle.setData("UINoticePlayerApplyJoin", cv.StringTools.formatC("%s(ID:%d)", noti.apply_name, noti.uid));
            remindData.msgStatus = noti.result === 1 ? eRemindMsgStatus.RMSG_STATUS_RATIFIED : eRemindMsgStatus.RMSG_STATUS_REFUSED;

            // is_agree 是否开启自动加入 1 - 开启
            if (noti.is_agree === 1) {
                // 同意加入
                if (noti.result === 1) {
                    remindData.msgContenDown.setData("UINoticeAutoApplyJoin", noti.apply_name, noti.club_name);
                }
            }
            // 是否开启自动加入 0 - 关闭
            else if (noti.is_agree === 0) {
                // 同意加入
                if (noti.result === 1) {
                    remindData.msgContenDown.setData("tips_club_join_member_op", noti.Operator_name);
                }
                // 拒绝加入
                else if (noti.result === 2) {
                    // 若操作者id为0，则是系统超时自动拒绝
                    if (noti.operator_id === 0) {
                        remindData.msgContenDown.setData("UINoticeHasRefuseReasonMsg2");
                    }
                    // 非0 管理员%s已操作
                    else {
                        remindData.msgContenDown.setData("tips_club_join_member_op", noti.Operator_name);
                    }
                }
            }
        }
        // 自己是申请者
        else {
            // 已批准你加入
            if (noti.result === 1) {
                remindData.msgContenMiddle.setData("UINoticeHasRatifyClubMsg", noti.club_name);

                // 切换至俱乐部主界面
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                    lastView: eClubSceneView.E_CSV_CURVIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                    transBoth: true
                });
            }
            else {
                // 已拒绝你加入
                remindData.msgContenMiddle.setData("UINoticeHasRefuseMsg", noti.club_name);

                // 超时拒绝
                if (noti.reason === "[-1]") {
                    remindData.msgContenDown.setData("UINoticeHasRefuseReasonMsg2");
                }
                // 理由
                else {
                    remindData.msgContenDown.setData("UINoticeHasRefuseReasonMsg", noti.reason);
                }
            }
        }

        cv.globalMsgDataMgr.addRemindData(remindData);
        cv.MessageCenter.send("updateListView");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求离开俱乐部
    requestLeaveClub(clubID: number, clubUID: number): void {
        let param = { club_id: clubID, club_did: clubUID };
        let msg = { param: param };
        let puf = this.encodePB("RequestLeaveClub", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_LeaveClub_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_LeaveClub_Response, this._responseLeaveClub.bind(this));
    }
    private _responseLeaveClub(puf): void {
        let resp: world_pb.ResponseLeaveClub = this.decodePB("ResponseLeaveClub", puf);
        if (!resp) return;

        console.log("pb::MsgID_LeaveClub_Response error ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("tips_club_exit_ok"), cv.Enum.ToastType.ToastTypeSuccess);
            this.requestSnapshotList();
        }

        cv.MessageCenter.send("leave_club", resp.error);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求加入联盟
    requestJoinAlliance(allianceID: number, clubID: number, message: string): void {
        let msg = {
            alliance_id: allianceID,
            club_id: clubID,
            message: message,
            apply_time: 0,
        };
        let puf = this.encodePB("RequestJoinAlliance", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_JoinAlliance_Request, 0);
    }

    private _requestReplyJoinAllianceToWorld(result: number, alliance_id: number, club_id: number, reason: string) {
        let msg = {
            result: result,
            alliance_id: alliance_id,
            club_id: club_id,
            reason: reason
        }
        let puf = this.encodePB("ReplyJoinAllianceToWorld", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_JoinAllianceReply_To_World, 0);
    }

    private _responseJoinAllianceToAdmin(puf) {
        let resp: world_pb.ResponseJoinAllianceToAdmin = this.decodePB("ResponseJoinAllianceToAdmin", puf);
        if (!resp) return;

        if (resp.error !== 1) {
            cv.TT.showMsg(cv.config.getStringData(cv.StringTools.formatC("ServerErrorCode%d", resp.error)), cv.Enum.ToastType.ToastTypeError);
        }
    }

    private _noticeJoinAlliance(puf: any) {
        let noti: world_pb.NoticeJoinAlliance = this.decodePB("NoticeJoinAlliance", puf);
        if (!noti) return;

        let dealFunc = (result: number, remindData: RemindData) => {
            // 批准
            if (result === 1) {
                this._requestReplyJoinAllianceToWorld(result, noti.alliance_id, noti.club_id, "");
            }
            // 拒绝
            else {
                cv.TP.showMsg("", cv.Enum.ButtonStyle.TWO_BUTTON, (edt: cc.EditBox) => {
                    if (!edt) return;
                    this._requestReplyJoinAllianceToWorld(result, noti.alliance_id, noti.club_id, edt.string);
                }, null, true);
                cv.TP.getEditBox().placeholder = cv.config.getStringData("NoticeLayer_tipspanel_Image_1_msgtext");
            }
        }

        let remindData: RemindData = new RemindData();
        remindData.msgNew = true;
        remindData.msgType = noti.msg_type;
        remindData.msgTime = noti.apply_time;
        remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_PENDING;
        remindData.msgContenUp.setData("UINoticeAllianceName", noti.alliance_name);
        remindData.msgContenMiddle.setData("UINoticeApplyJoinAlliance", noti.club_name);
        remindData.strTag = cv.StringTools.formatC("%d-%d-%d-%s", noti.msg_type, noti.alliance_id, noti.club_id, noti.alliance_name);

        // 确认按钮回调
        remindData.msgEnsureFunc = (remindData: RemindData, cellIndex: number, dataIndex: number) => {
            dealFunc(1, remindData);
        }

        // 取消按钮回调
        remindData.msgCancelFunc = (remindData: RemindData, cellIndex: number, dataIndex: number) => {
            dealFunc(2, remindData);
        }

        cv.globalMsgDataMgr.addRemindData(remindData);
        cv.MessageCenter.send("updateListView");
    }

    private _responseJoinAllianceToMember(puf: any) {
        let resp: world_pb.ResponseJoinAllianceToMember = this.decodePB("ResponseJoinAllianceToMember", puf);
        if (!resp) return;

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData(cv.StringTools.formatC("ServerErrorCode%d", resp.error)), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("AllianceUI20"), cv.Enum.ToastType.ToastTypeInfo);
            let allianceInfo: world_pb.NoticeSearchAlliance = cv.clubDataMgr.getCurSearchClubData().clubExtra.allianceInfo;
            cv.MessageCenter.send("showAllianceMainView", allianceInfo.alliance_id);
        }
    }
    private _noticeJoinAllianceToMember(puf: any) {
        let noti: world_pb.NoticeJoinAllianceToMember = this.decodePB("NoticeJoinAllianceToMember", puf);
        if (!noti) return;

        console.log("pb::MsgID_JoinAlliance_Notice_To_Member ==>>" + noti);

        let strTag: string = cv.StringTools.formatC("%d-%d-%d-%s", noti.msg_type, noti.alliance_id, noti.club_id, noti.alliance_name);
        let remindData: RemindData = cv.globalMsgDataMgr.getRemindInfoByStrTag(strTag);
        if (!remindData) {
            remindData = new RemindData();
            remindData.msgNew = true;
        }
        else {
            remindData.strTag = "";
        }
        remindData.msgTime = noti.op_time;
        remindData.msgType = noti.msg_type;
        remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_NONE;
        remindData.msgContenUp.setData("UINoticeAllianceName", noti.alliance_name);

        // 该社区是联盟管理员
        if (noti.curr_club_id === noti.alli_club_id) {
            if (noti.result === 1) {
                remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_RATIFIED;
            } else if (noti.result === 2) {
                remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_REFUSED;
            } else {
                remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_CANCEL;
            }

            if (noti.reason === "[-1]") {
                if (noti.result == 3) {
                    remindData.msgContenDown.setData("UINoticeHasCancelReasonMsg2");
                } else {
                    remindData.msgContenDown.setData("UINoticeHasRefuseReasonMsg2");
                }
            }
        }
        // 该社区是申请者
        else {
            if (noti.result === 1) {
                // 已准许加入公会
                remindData.msgContenMiddle.setData("UINoticeHasRatifyClubMsg", noti.alliance_name);

                // 切换至联盟主界面
                cv.MessageCenter.send("showAllianceMainView", noti.alliance_id);
            }
            else if (noti.result === 2) {
                // 已拒绝该社区加入
                remindData.msgContenMiddle.setData("UINoticeHasRefuseMsg", noti.alliance_name);

                // 超时拒绝
                if (noti.reason === "[-1]") {
                    remindData.msgContenDown.setData("UINoticeHasRefuseReasonMsg2");
                }
                // 理由
                else {
                    remindData.msgContenDown.setData("UINoticeHasRefuseReasonMsg", noti.reason);
                }
            } else {
                // 取消申请
                remindData.msgContenMiddle.setData("UINoticeHasCancelMsg", noti.alliance_name);
                remindData.msgContenDown.setData("UINoticeHasCancelReasonMsg2");
            }
            this.requestAllianceSnapshotList(noti.curr_club_id);
        }

        cv.globalMsgDataMgr.addRemindData(remindData);
        cv.MessageCenter.send("updateListView");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 请求离开/解散联盟
    requestLeaveAlliance(allianceID: number, clubID: number): void {
        let msg = {
            alliance_id: allianceID,
            club_id: clubID
        };
        let puf = this.encodePB("RequestLeaveAlliance", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_LeaveAlliance_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_LeaveAlliance_Response, this._responseLeaveAlliance.bind(this));
    }
    private _responseLeaveAlliance(puf): void {
        let resp: world_pb.ResponseLeaveAlliance = this.decodePB("ResponseLeaveAlliance", puf);
        if (!resp) return;

        console.log("pb::MsgID_LeaveAlliance_Response error ==>>" + resp.error);

        if (resp.error === 1) {
            // 0表示退出, 1表示解散
            if (resp.isDisband === 0) {
                cv.TT.showMsg(cv.config.getStringData("tips_alliance_exit_ok"), cv.Enum.ToastType.ToastTypeSuccess);
            }
            else {
                cv.TT.showMsg(cv.config.getStringData("tips_alliance_exit_ok_1"), cv.Enum.ToastType.ToastTypeSuccess);
            }

            // 重新拉取俱乐部列表
            this.requestSnapshotList();

            // 切换到联盟主界面
            cv.MessageCenter.send("onClubSceneTransView", {
                nextView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                lastView: eClubSceneView.E_CSV_ALLIANCE_INFO_VIEW,
                transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                transBoth: true
            });
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeLeaveAlliance(puf): void {
        let noti: world_pb.NoticeLeaveAlliance = this.decodePB("NoticeLeaveAlliance", puf);
        if (!noti) return;

        let fillContentString: Function = (remindData: RemindData): void => {
            let retValue: string = "";
            // 目标id == 盟主id . 解散联盟
            if (noti.club_id === noti.club_admin_id) {
                // 目标id == 当前id . 盟主自己解散
                if (noti.club_id === noti.belong_club_id) {
                    remindData.msgContenMiddle.setData("UINoticeAllianceDissolveOK", noti.alliance_name);
                }
                // 目标id != 当前id . 被盟主解散
                else {
                    remindData.msgContenMiddle.setData("UINoticeAllianceDissolved", noti.alliance_name);
                }
            }
            // 否则表示退出联盟
            else {
                // 成员自己退出联盟
                if (noti.club_id === noti.belong_club_id) {
                    remindData.msgContenMiddle.setData("UINoticeAllianceExitOk", noti.alliance_name);
                }
                // 通知盟主有成员退出联盟
                else {
                    remindData.msgContenMiddle.setData("UINoticeMemberLeaveAlliance", noti.alliance_name);
                }
            }
        }

        let remindData: RemindData = new RemindData();
        remindData.msgNew = true;
        remindData.msgType = noti.msg_type;
        remindData.msgTime = noti.op_time;
        remindData.msgStatus = eRemindMsgStatus.RMSG_STATUS_NONE;
        fillContentString(remindData);

        cv.globalMsgDataMgr.addRemindData(remindData);
        cv.MessageCenter.send("updateListView");
    }

    /**
     * 请求KYC状态
     */
    requestKYCVerificationStatus(): void {
        let msg: world_pb.RequestKYCVerificationStatus = world_pb.RequestKYCVerificationStatus.create();
        let puf: any = this.encodePB("RequestKYCVerificationStatus", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgId_KYCVerificationStatus_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgId_KYCVerificationStatus_Response, this._responseKYCVerificationStatus.bind(this));
    }
    private _responseKYCVerificationStatus(puf: any): void {
        let resp: world_pb.ResponseKYCVerificationStatus = this.decodePB("ResponseKYCVerificationStatus", puf);
        if (!resp) return;

        if (resp.error === 1) {
            let isSkip: boolean = false;                                            // 是否跳过验证
            let status: string = cv.String(resp.KYCVerificationStatus);             // kyc状态
            if (status.length > 0) {
                cv.dataHandler.getUserData().KYCVerificationStatus = status;
                switch (status) {
                    // 需要kyc
                    case cv.Enum.KYCStatus.INIT_KYC_WITHDRAWAL: {
                        cv.MessageCenter.send("doKycVerification");
                    } break;

                    // 验证中
                    case cv.Enum.KYCStatus.PENDING_WITHDRAWAL:
                    case cv.Enum.KYCStatus.PENDING: {
                        cv.TP.showMsg(cv.config.getStringData("WithdrawLocked_KYC_Processing"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
                    } break;

                    default: isSkip = true; break;
                }
            }
            else {
                isSkip = true;
            }

            if (isSkip) {
                cv.MessageCenter.send("skipKycVerification");
            }

            console.log(`WorldNetWork - ResponseKYCVerificationStatus: status = ${status}, isSkip = ${isSkip}`);
        }
        else {
            cv.ToastError(resp.error);
        }
    }

    RequestAddCoinOrderPayRequest(payType: number, productid: string, amount: number) {
        let msg = { type: payType, uid: cv.dataHandler.getUserData().u32Uid, productid: productid, amount: amount };
        let puf = this.encodePB("RequestAddCoinOrder", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_AddCoinOrder_Pay_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_AddCoinOrder_Pay_Response, this.HandResponseAddCoinOrderPay.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_AddCoinResult_Pay_Notice, this.HandNoticeAddCoinResultPay.bind(this));
    }

    HandResponseAddCoinOrderPay(puf: any) {
        let msg = this.decodePB("ResponseAddCoinOrder", puf);
        if (msg) {
            let error = msg.error;
            if (cv.dataHandler.getUserData().pay_type == 1) {
                //未处理
            }
            else {
                // if (cv.Number(cv.config.getStringData("DEBUG_MODE")) != 0) return;

                let token: string = msg.token;
                let u32Uid = cv.dataHandler.getUserData().u32Uid;
                let acBuffer: string = "";
                if (u32Uid == 0) {
                    acBuffer = cv.tools.GetStringByCCFile("user_id");
                    if (cv.StringTools.getArrayLength(acBuffer) <= 0) return;
                }
                else {
                    acBuffer = u32Uid.toString();
                }
                let productId = 2;
                let nickname = encodeURI(cv.dataHandler.getUserData().nick_name);
                let clubId = cv.dataHandler.getUserData().firstClubId;
                let unionId = cv.dataHandler.getUserData().firstAlliId;
                let mobile: string = cv.dataHandler.getUserData().mobile;
                let timeStamp = Math.floor((new Date()).getTime() / 1000);
                let sign = "294de072c3d679f3a6adc5ff2c50b448e9265ebe";
                let language_type = "";
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    language_type = "zh";
                }
                else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
                    language_type = "vn";
                } else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.hi_IN) {
                    language_type = "inr";
                } else {
                    language_type = "en";
                }
                let extra_param1 = "";
                let isGuest = cv.dataHandler.getUserData().isTouristUser ? 1 : 0;
                let key: string = cv.StringTools.formatC("%d", productId) + acBuffer + acBuffer + cv.StringTools.formatC("%d", clubId) + cv.StringTools.formatC("%d", unionId)
                    + nickname + token + language_type + cv.StringTools.formatC("%lld", timeStamp) + cv.StringTools.formatC("%d", isGuest) + cv.StringTools.formatC("%s", sign);
                console.log("key::" + key);
                let areacode = cv.dataHandler.getUserData().priorityareaCode;
                let jsonData: string = "product_id=" + cv.StringTools.formatC("%d", productId) + "&user_id=" + acBuffer + "&login_name=" + acBuffer
                    + "&club_id=" + cv.StringTools.formatC("%d", clubId) + "&union_id=" + cv.StringTools.formatC("%d", unionId) + "&nickname=" + nickname
                    + "&token=" + token + "&language_type=" + language_type + "&areacode=" + areacode + "&time=" + cv.StringTools.formatC("%lld", timeStamp) + "&extra_param1=" + extra_param1
                    + "&guest=" + isGuest + "&key_code=" + cv.md5.md5(key);
                let webUrl = cv.dataHandler.getUserData().shopUrl + cv.config.getStringData("WEB_API_SHOP", true);//
                let url = webUrl + "?" + jsonData;
                console.log("url::" + url);

                cv.SHOP.HandleUrlForNative(url);
            }
        }
    }

    HandNoticeAddCoinResultPay(puf: any) {
        let msg = this.decodePB("NoticeAddCoinResult", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.worldNet.requestGetUserData();
                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIPaySuccess"), cv.StringTools.serverGoldToShowNumber(msg.add_coin)), cv.Enum.ToastType.ToastTypeSuccess);
            }
        }
    }

    RequestDelCoinOrderRequest() {
        let msg = { type: 2, uid: cv.dataHandler.getUserData().u32Uid };
        let puf = this.encodePB("RequestDelCoinOrder", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_DelCoinOrder_Pay_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_DelCoinOrder_Pay_Response, this.HandResponseDelCoinOrderPay.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_DelCoinResult_Pay_Notice, this.HandNoticeDelCoinResult.bind(this));
    }

    HandResponseDelCoinOrderPay(puf: any) {
        let msg = this.decodePB("ResponseDelCoinOrder", puf);
        if (msg) {
            let error = msg.error;
            if (error == 289) {
                let tempStr = cv.StringTools.formatC(cv.config.getStringData("ServerErrorCode289"), "support@variantlabs.co");
                cv.TP.showMsg(tempStr, cv.Enum.ButtonStyle.GOLD_BUTTON, null);
                return;
            }
            if (cv.dataHandler.getUserData().pay_type == 1) {
                //未处理
            }
            else {
                // if (cv.Number(cv.config.getStringData("DEBUG_MODE")) != 0) return;
                let billno: number = msg.srv_del_order;
                let token: string = msg.token;
                let u32Uid = cv.dataHandler.getUserData().u32Uid;
                let acBuffer: string = "";
                if (u32Uid == 0) {
                    acBuffer = cv.tools.GetStringByCCFile("user_id");
                    if (cv.StringTools.getArrayLength(acBuffer) <= 0) return;
                }
                else {
                    acBuffer = u32Uid.toString();
                }
                let language_type = "";
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    language_type = "zh";
                }
                else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
                    language_type = "vn";
                } else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.hi_IN) {
                    language_type = "inr";
                } else {
                    language_type = "en";
                }
                let productId = 2;
                let nickname = encodeURI(cv.dataHandler.getUserData().nick_name);
                let clubId = cv.dataHandler.getUserData().firstClubId;
                let unionId = cv.dataHandler.getUserData().firstAlliId;
                let amount = cv.dataHandler.getUserData().u32Chips;
                let mobile: string = cv.dataHandler.getUserData().mobile;
                let timeStamp = Math.floor((new Date()).getTime() / 1000);
                let sign = "294de072c3d679f3a6adc5ff2c50b448e9265ebe";
                let points = cv.dataHandler.getUserData().user_points;
                let uuid = cv.native.GetDeviceUUID();
                let device = cv.httpHandler.getDeviceType();
                //优先服务器获取,没有绑定的话从php获取区号
                let areacode = cv.dataHandler.getUserData().priorityareaCode;
                let usdt_amount = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().usdt));
                let key: string = cv.StringTools.formatC("%d", productId) + acBuffer + acBuffer + cv.StringTools.formatC("%d", clubId) + cv.StringTools.formatC("%d", unionId)
                    + cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(amount)) + cv.StringTools.formatC("%d", billno) + nickname + token + points + language_type + cv.StringTools.formatC("%lld", timeStamp)
                    + cv.StringTools.formatC("%s", sign);
                console.log("key：" + key);
                let jsonData: string = "product_id=" + cv.StringTools.formatC("%d", productId) + "&user_id=" + acBuffer + "&login_name=" + acBuffer + "&club_id=" + cv.StringTools.formatC("%d", clubId)
                    + "&union_id=" + cv.StringTools.formatC("%d", unionId) + "&true_amount=" + cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(amount))
                    + "&usdt_amount=" + usdt_amount
                    + "&billno=" + cv.StringTools.formatC("%d", billno) + "&nickname=" + nickname + "&token=" + token + "&points=" + points + "&uuid=" + uuid + "&device=" + device + "&language_type=" + language_type + "&areacode=" + areacode + "&time=" + cv.StringTools.formatC("%lld", timeStamp) + "&key_code=" + cv.md5.md5(key);

                let webUrl = cv.dataHandler.getUserData().shopUrl + cv.config.getStringData("WEB_API_EXCHANGE", true);
                let url = webUrl + "?" + jsonData;
                console.log("md5key：" + key);
                console.log("url" + url);

                cv.SHOP.HandleUrlForNative(url);
            }
        }
    }

    HandNoticeDelCoinResult(puf: any) {
        let msg = this.decodePB("NoticeDelCoinResult", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.worldNet.requestGetUserData();
            }
        }
    }


    // -----------------------------------------------------------------------------------------------------------------
    // 真人验证模块

    /**
     * 请求验证结果(0.成功 1.失败)
     * @param result 
     */
    requestAuthVerify(result: number): void {
        let msg: world_pb.AuthVerifyRequest = world_pb.AuthVerifyRequest.create();
        msg.result = result;

        let puf: any = this.encodePB("AuthVerifyRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_AuthVerify_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_AuthVerify_Response, this._responseAuthVerify.bind(this));
    }
    private _responseAuthVerify(puf: any): void {
        let resp: world_pb.AuthVerifyResponse = this.decodePB("AuthVerifyResponse", puf);
        if (!resp) return;

        cv.MessageCenter.send("on_update_slider_verify_result", resp);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // 邮件模块

    /**
     * 请求邮件列表(分页)
     * @param mail_begin_index 
     * @param mail_end_index 
     */
    requestMailList(mail_begin_index: number, mail_end_index: number): void {
        let msg = {
            uid: cv.dataHandler.getUserData().u32Uid,
            mail_begin_index: mail_begin_index,
            mail_end_index: mail_end_index
        };
        let puf = this.encodePB("RequestGetUserMailList", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetUserMailListInfo_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_GetUserMailListInfo_Response, this._responseMailList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_GetUserMailListInfo_Notice, this._noticeMailList.bind(this));
    }
    private _responseMailList(puf): void {
        let resp: world_pb.ResponseGetUserMailList = this.decodePB("ResponseGetUserMailList", puf);
        if (!resp) return;

        console.log("pb::MsgID_GetUserMailListInfo_Response e_code ==>>" + resp.error);
        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeMailList(puf): void {
        let noti: world_pb.NoticeGetUserMailList = this.decodePB("NoticeGetUserMailList", puf);
        if (!noti) return;

        console.log("pb::MsgID_GetUserMailListInfo_Notice ==>>" + noti);

        for (let i = 0; i < noti.mail_list.length; ++i) {
            cv.globalMsgDataMgr.addMailData(world_pb.MailInfo.create(noti.mail_list[i]));
        }

        // 发送更新列表消息
        cv.MessageCenter.send("updateListView");
    }

    /**
     *  请求公告列表
     */
    requestAnnounceList(): void {
        let msg = { uid: cv.dataHandler.getUserData().u32Uid };
        let puf = this.encodePB("RequestAnounceList", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RequestAnounceList, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ResponseAnounceList, this._responseAnnounceList.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_NoticeAnounceList, this._noticeAnnounceList.bind(this));
    }
    private _responseAnnounceList(puf): void {
        let resp: world_pb.ResponseAnounceList = this.decodePB("ResponseAnounceList", puf);
        if (!resp) return;

        console.log("pb::MsgID_ResponseAnounceList e_code ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeAnnounceList(puf): void {
        let noti: world_pb.NoticeAnounceList = this.decodePB("NoticeAnounceList", puf);
        if (!noti) return;

        console.log("pb::MsgID_NoticeAnounceList ==>>" + noti);

        for (let i = 0; i < noti.anounce_list.length; ++i) {
            cv.globalMsgDataMgr.addMailData(world_pb.MailInfo.create(noti.anounce_list[i]));
        }

        // 发送更新列表消息
        cv.MessageCenter.send("updateListView");
    }

    /**
     * 请求阅读领取邮件
     * @param id 
     */
    requestFetchOneMail(id: number): void {
        let msg = {
            uid: cv.dataHandler.getUserData().u32Uid,
            mail_id: id
        };
        let puf = this.encodePB("RequestFetchOneMail", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ReadAndFetchOneMail_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ReadAndFetchOneMail_Response, this._responseFetchOneMail.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ReadAndFetchOneMail_Notice, this._noticeFetchOneMail.bind(this));
    }
    private _responseFetchOneMail(puf): void {
        let resp: world_pb.ResponseFetchOneMail = this.decodePB("ResponseFetchOneMail", puf);
        if (!resp) return;

        console.log("pb::MsgID_ReadAndFetchOneMail_Response e_code ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeFetchOneMail(puf): void {
        let noti: world_pb.NoticeFetchOneMail = this.decodePB("NoticeFetchOneMail", puf);
        if (!noti) return;

        console.log("pb::MsgID_ReadAndFetchOneMail_Notice ==>>" + noti);

        // 发送更新列表消息
        cv.MessageCenter.send("pb_noticefetchonemail", world_pb.MailInfo.create(noti.onemail));
    }

    /**
     * 请求阅读领取公告
     * @param id 
     */
    requestFetchOneAnnounce(id: number): void {
        let msg = {
            uid: cv.dataHandler.getUserData().u32Uid,
            mail_id: id
        };
        let puf = this.encodePB("RequestFetchOneAnounce", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Request, 0);
        this.registerMsg(world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Response, this._responseFetchOneAnnounce.bind(this));
        this.registerMsg(world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Notice, this._noticeFetchOneAnnounce.bind(this));
    }
    private _responseFetchOneAnnounce(puf): void {
        let resp: world_pb.ResponseFetchOneAnounce = this.decodePB("ResponseFetchOneAnounce", puf);
        if (!resp) return;

        console.log("pb::MsgID_ReadAndFetchOneAnounce_Response e_code ==>>" + resp.error);

        if (resp.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode" + resp.error), cv.Enum.ToastType.ToastTypeError);
        }
    }
    private _noticeFetchOneAnnounce(puf): void {
        let noti: world_pb.NoticeFetchOneAnounce = this.decodePB("NoticeFetchOneAnounce", puf);
        if (!noti) return;

        console.log("pb::MsgID_ReadAndFetchOneAnounce_Notice ==>>" + noti);

        // 发送更新列表消息
        cv.MessageCenter.send("pb_noticefetchonemail", world_pb.MailInfo.create(noti.oneanounce));
    }

    /**
     * 通知邮件数量
     * @param puf 
     */
    private _noticeMailNum(puf): void {
        let noti: world_pb.NotifyUserMailNum = this.decodePB("NotifyUserMailNum", puf);
        if (!noti) return;

        console.log("pb::MsgID_NotifyUserMailNum ==>>" + noti);

        // 更新邮件数量
        cv.MessageCenter.send("on_notify_mail_num", noti);
    }

    /**
     * 新的一条邮件
     * @param puf 
     */
    private _noticeOneMail(puf): void {
        let noti: world_pb.NoticeOneMail = this.decodePB("NoticeOneMail", puf);
        if (!noti) return;

        console.log("pb::MsgID_NoticeOneMail ==>>" + noti);

        if (cv.globalMsgDataMgr.addMailData(world_pb.MailInfo.create(noti.onemail), true)) {
            cv.AudioMgr.playButtonSound('notice');
        }
        cv.MessageCenter.send("updateListView");
    }

    /**
     * 新的一条公告
     * @param puf 
     */
    private _noticeOneAnnounce(puf): void {
        let noti: world_pb.NoticeOneAnounce = this.decodePB("NoticeOneAnounce", puf);
        if (!noti) return;

        console.log("pb::MsgID_NoticeOneAnounce ==>>" + noti);

        let data: world_pb.MailInfo = world_pb.MailInfo.create(noti.oneanounce);
        if (cv.globalMsgDataMgr.addMailData(data, true)) {
            cv.MessageCenter.send("updateListView");

            // 邮件类型 1邮件 2需要及时弹出的公告 3不需要即时弹出的公告
            if (noti.oneanounce.mail_type === 2) {
                cv.MessageCenter.send("on_pop_one_anounce", data);
            }
        }
    }

    /**
     * 撤销一封邮件
     * @param puf 
     */
    private _noticeWithdrawMail(puf): void {
        let noti: world_pb.NoticeWithdrawMail = this.decodePB("NoticeWithdrawMail", puf);
        if (!noti) return;

        console.log("pb::MsgID_NoticeWithdrawMail ==>>" + noti);

        if (cv.globalMsgDataMgr.removeMailInfoByID(noti.mail_id)) {
            cv.MessageCenter.send("updateListView");
        } else {
            // 因为是分页请求, 如果撤销的索引在其他页, 是否存在隐患, 需商榷待定, 改协议？
        }
    }

    /**
     * 撤销一封公告
     * @param puf 
     */
    private _noticeWithdrawAnnounce(puf): void {
        let noti: world_pb.NoticeWithdrawAnounce = this.decodePB("NoticeWithdrawAnounce", puf);
        if (!noti) return;

        console.log("pb::MsgID_NoticeWithdrawAnounce ==>>" + noti);

        if (cv.globalMsgDataMgr.removeMailInfoByID(noti.mail_id)) {
            cv.MessageCenter.send("updateListView");
        } else {
            // 因为是分页请求, 如果撤销的索引在其他页, 是否存在隐患, 需商榷待定, 改协议？
        }
    }

    RequestSearchClubInfo(id: number) {
        let msg = {
            club_id: id
        };
        let puf = this.encodePB("RequestSearchClubInfo", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SearchClubInfo_Request, 0);
    }

    NoticeSearchClubInfo(puf) {
        let noti: world_pb.NoticeSearchClubInfo = this.decodePB("NoticeSearchClubInfo", puf);
        if (!noti) return;

        let cludData: ClubData = new ClubData();
        cludData.club = world_pb.ClubSnapshotListParams.create(noti.snapshots);
        cludData.club.club_type = 3;
        cv.clubDataMgr.setCurOpClubID(cludData.club.club_id);
        cv.clubDataMgr.setCurSearchClubData(cludData);
        cv.MessageCenter.send("update_search_club");
    }

    RequestCreateAlliance(alliance_name: string, club_id: number, kAreaCode: string, phoneNumber: string, email: string) {
        let msg = {
            alliance_name: alliance_name,
            club_id: club_id,
            area_code: kAreaCode,
            mobile: phoneNumber,
            email: email
        };
        let puf = this.encodePB("RequestCreateAlliance", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_CreateAlliance_Request, 0);
    }

    ResponseCreateAlliance(puf) {
        let msg = this.decodePB("ResponseCreateAlliance", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.TT.showMsg(cv.config.getStringData("tips_alliance_send_apply"), cv.Enum.ToastType.ToastTypeDefault);
                cv.MessageCenter.send("AllianceCreate_onBtnBackClick");
            }
            else {
                cv.TT.showMsg(cv.config.getStringData(cv.StringTools.formatC("ServerErrorCode%d", msg.error)), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }


    GetMiniGameState(gameid: number) {
        let msg = {
            id: gameid,
        };
        let puf = this.encodePB("GameStatusV2Request", msg); //GameStatusRequest
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GameStatusV2_Request, 0);
    }

    HandleGameStatusMessage(puf) {
        let msg = this.decodePB("GameStatusV2Response", puf); //GameStatusResponse

        if (msg) {
            if (msg.status == 1) {
                cv.worldNet.RequestRoomList(msg.id);
            }
            else if (msg.status == 2) {
                cv.roomManager.setCurrentGameID(cv.Enum.GameId.GameId_Dummy);
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode104"), cv.Enum.ToastType.ToastTypeWarning);
                cv.MessageCenter.send("MiniGames_gameStateError", msg.id);
            }
        }
    }

    /**
     * 请求当前游戏房间列表
     */
    RequestRoomList(gameID: number) {

        let msg: any = {};
        let puf: any = null;
        let RequestID: number = 0;

        switch (gameID) {
            case cv.Enum.GameId.VideoCowboy:
                RequestID = world_pb.MSGID.MsgID_VideoCowboy_List_Request;
                puf = this.encodePB("VideoCowboyGameListRequest", msg);
                break;
            case cv.Enum.GameId.CowBoy: {
                RequestID = world_pb.MSGID.MsgID_CowBoy_List_Request;
                puf = this.encodePB("CowBoyGameListRequest", msg);
            } break;

            case cv.Enum.GameId.HumanBoy: {
                RequestID = world_pb.MSGID.MsgID_HumanBoy_List_Request;
                puf = this.encodePB("HumanBoyGameListRequest", msg);
            } break;

            case cv.Enum.GameId.PokerMaster: {
                RequestID = world_pb.MSGID.MsgID_PokerMaster_List_Request;
                puf = this.encodePB("PokerMasterGameListRequest", msg);
            } break;

            default: break;
        }


        if (RequestID != 0) {
            this.sendWorldMsg(puf, RequestID, 0);
        }
    }

    /**
     * 请求CowBoy游戏房间列表 回调
     * @param puf 
     */
    cowBoyResponseRoomList(puf) {
        let msg: any = null;
        msg = this.decodePB("CowBoyGameListResponse", puf);
        msg.gameID = cv.Enum.GameId.CowBoy;

        if (msg) {
            cv.MessageCenter.send("RoomList_ResponseRoomList", msg);
        }
    }

    /**
     * 请求VideoCowboy游戏房间列表 回调
     * @param puf 
     */
    videoResponseRoomList(puf) {
        let msg: any = null;
        msg = this.decodePB("VideoCowboyGameListResponse", puf);
        msg.gameID = cv.Enum.GameId.VideoCowboy;

        if (msg) {
            cv.MessageCenter.send("RoomList_ResponseRoomList", msg);
        }
    }

    /**
     * humanboy游戏房间列表 回调
     * @param puf 
     */
    humanBoyResponseRoomList(puf) {
        let msg: any = null;
        msg = this.decodePB("HumanBoyGameListResponse", puf);
        msg.gameID = cv.Enum.GameId.HumanBoy;

        if (msg) {
            cv.MessageCenter.send("RoomList_ResponseRoomList", msg);
        }
    }

    /**
     * pokerMaster 游戏房间列表 回调
     * @param puf 
     */
    pokerMasterResponseRoomList(puf) {
        let msg: any = null;
        msg = this.decodePB("PokerMasterGameListResponse", puf);
        msg.gameID = cv.Enum.GameId.PokerMaster;

        if (msg) {
            cv.MessageCenter.send("RoomList_ResponseRoomList", msg);
        }
    }

    BannerRequest(): void {
        /*let is_english = world_pb.LanguageType.Chinese;
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            is_english = world_pb.LanguageType.Chinese;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
            is_english = world_pb.LanguageType.VietNam;
        }
        else {
            is_english = world_pb.LanguageType.English;
        }*/

        let msg = { language: world_pb.LanguageType.Chinese, languageStr: cv.config.getCurrentLanguage() };
        let puf = this.encodePB("BannerRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Banner_Request, 0);
    }

    _HandleBannerResponseNotic(puf: any): void {
        cv.dataHandler.clearBanner();
        let msg = this.decodePB("BannerResponse", puf);
        if (!msg || msg.banner_json === "") {
            cv.MessageCenter.send("update_bannerImg");
            return;
        }
        let banner: string = msg.banner_json;
        console.log("banner json文件内容：" + banner);

        let kDataRoot = JSON.parse(banner);

        let serverInfo = cv.domainMgr.getServerInfo();
        let rootlen = kDataRoot.length;
        for (let i = 0; i < rootlen; i++) {
            let game_type = kDataRoot[i]["game_type"];
            let imgList = kDataRoot[i]["image"];
            let imglen = imgList.length;
            for (let k = 0; k < imglen; k++) {
                let imgurl = null;
                if (cv.native.isWideScreen()) {
                    imgurl = imgList[k]["pad"];
                } else {
                    imgurl = imgList[k]["file"];
                }

                let webViewUrl: string = imgList[k]["link"];
                let info = new BannerInfo();
                info.imageUrl = serverInfo.image_server + imgurl;
                if (webViewUrl.search("ggjs:") != -1) {//特殊标记
                    info.webViewUrl = webViewUrl;
                } else {
                    info.webViewUrl = cv.StringTools.getArrayLength(webViewUrl) <= 0 ? "" : serverInfo.web_server + "/user/article/banner?url=" + webViewUrl;
                }
                info.is_pkf = imgList[k]["is_pkf"];

                cv.dataHandler.addBannerUrl(game_type, info);
            }
        }
        cv.MessageCenter.send("update_bannerImg");
    }
    RequestRank(id: Number): void {
        let msg = {
            rankId: id
        };
        let puf = this.encodePB("GetRankRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetRank_Request, 0);
    }

    _HandleRankResponse(puf: any): void {
        let msg = this.decodePB("GetRankResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().m_rankInfos.splice(0, cv.dataHandler.getUserData().m_rankInfos.length);

            for (let i = 0; i < msg.list.length; i++) {
                let rankJson = JSON.parse(msg.list[i]);
                if (rankJson) {
                    let data: RankData = new RankData();
                    data.uid = cv.Number(rankJson["uid"]);
                    data.name = cv.String(rankJson["name"]);
                    data.head = cv.String(rankJson["head"]);
                    data.updateAt = cv.Number(rankJson["updateAt"]);
                    data.rank = cv.Number(rankJson["rank"]);
                    data.profit = cv.Number(rankJson["profit"]);
                    data.coin = cv.Number(rankJson["coin"]);
                    data.frequency = cv.Number(rankJson["frequency"]);
                    data.plat = cv.Number(rankJson["plat"]);

                    cv.dataHandler.getUserData().m_rankInfos.push(data);
                }
            }

            if (msg.owner != "") {
                let ownerJson = JSON.parse(msg.owner);
                if (ownerJson) {
                    let data: RankData = new RankData();
                    data.uid = cv.Number(ownerJson["uid"]);
                    data.name = cv.String(ownerJson["name"]);
                    data.head = cv.String(ownerJson["head"]);
                    data.updateAt = cv.Number(ownerJson["updateAt"]);
                    data.rank = cv.Number(ownerJson["rank"]);
                    data.profit = cv.Number(ownerJson["profit"]);
                    data.coin = cv.Number(ownerJson["coin"]);
                    data.frequency = cv.Number(ownerJson["frequency"]);
                    data.plat = cv.Number(ownerJson["plat"]);

                    cv.dataHandler.getUserData().m_rank = data;
                }
            }

            cv.MessageCenter.send("update_rank_info");
        }
        else {
            cv.ToastError(msg.error);
        }
    }

    //发送加密secretKEy
    RequestSetSecretKey(secretKey: string) {
        let msg = {
            Secret_key: secretKey
        };
        let puf = this.encodePB("SetSecretKeyRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SetSecretKey_Request, 0);
    }

    ResponseSetSecretKey(puf: any): void {
        let msg = this.decodePB("SetSecretKeyResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.roomManager.onSecretResponse();
            } else {
                cv.netWorkManager.OnNeedRelogin(msg.error);
            }
        }
    }


    //发送ecdh加密算法
    RequestSetEcdhKey(secretKey: number, cli_public_key_x: string, cli_public_key_y: string) {
        let msg = {
            secret_type: secretKey,
            cli_public_key_x: cli_public_key_x,
            cli_public_key_y: cli_public_key_y
        };
        let puf = this.encodePB("SetSecretKeyExRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SetSecretKeyEx_Request, 0);
    }

    ResponseSetEcdhSecretKey(puf: any): void {
        let msg = this.decodePB("SetSecretKeyExResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.roomManager.onEcdhSecretResponse(msg);
            } else {
                cv.SwitchLoadingView.hide();
                cv.netWorkManager.OnNeedRelogin(msg.error);
            }
        }
    }


    //海外版推荐功能
    public RequestReferrals(isGetNewData: boolean) {

        let id = cv.dataHandler.getUserData().ReferralsPageNum;
        if (isGetNewData) {
            if (cv.dataHandler.getUserData().ReferralsList.length > 0) {
                id = cv.dataHandler.getUserData().ReferralsList[0].uid;
            }
        }
        let msg = {
            uid: id,
            get_front: isGetNewData,
            page_size: 10,
        };
        let puf = this.encodePB("ReferralsRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Referrals_Request, 0);
    }

    public _HandleReferralsResponse(puf: any) {
        let msg = this.decodePB("ReferralsResponse", puf);
        if (msg) {
            if (msg.get_front) {
                let len = msg.list.length;
                for (let i = 0; i < len; i++) {
                    let item: world_pb.ReferralsItem = msg.list[len - i - 1];
                    cv.dataHandler.getUserData().ReferralsList.splice(0, 0, item);

                }
            } else {
                if (msg.uid != cv.dataHandler.getUserData().ReferralsPageNum) {
                    for (let i = 0; i < msg.list.length; i++) {
                        let item: world_pb.ReferralsItem = msg.list[i];
                        cv.dataHandler.getUserData().ReferralsList.push(item);

                    }
                    cv.dataHandler.getUserData().ReferralsPageNum = msg.uid;
                }
            }

            cv.dataHandler.getUserData().ReferralsTotal = msg.total;
            cv.dataHandler.getUserData().maxReferralsMember = msg.max_club_member;

            cv.MessageCenter.send("updateReferrals");
        }

    }

    public RequestGetInviteSummary() {
        let msg = {
            uid: cv.dataHandler.getUserData().u32Uid,
        };
        let puf = this.encodePB("GetInviteSummaryRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_InviteSummary_Request, 0);
    }

    public _HandleInviteSummaryResponse(puf: any) {
        let msg = this.decodePB("GetInviteSummaryResponse", puf);
        if (!msg) {
            return;
        }

        cv.dataHandler.getUserData().summaryInfo = msg;
        cv.MessageCenter.send("updateSummary");
    }

    public RequestGetInviteIncomeRedeem() {
        let msg = {
            uid: cv.dataHandler.getUserData().u32Uid,
        };
        let puf = this.encodePB("RedeemInviteIncomeRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_InviteIncomeRedeem_Request, 0);
    }

    public _HandleInviteIncomeRedeemResponse(puf: any) {
        let msg = this.decodePB("RedeemInviteIncomeResponse", puf);
        if (!msg) {
            return;
        }

        if (msg.error != 1) {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast12"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    public isShowLuckTurntable(): boolean {
        return !cv.config.isOverSeas();
    }

    public RequestLuckTurntableResult(recordId: number) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = {
            record_id: recordId
        };
        let puf = this.encodePB("LuckTurntableResultRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Luck_Turntable_Result_Request, 0);
    }

    public _HandleLuckTurntableResultResponse(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableResultResponse", puf);
        if (msg) {
            cv.MessageCenter.send("LuckTurntableResult", msg.error);
            if (msg.error != 1) {
                cv.ToastError(msg.error);
            }
        }
    }

    public _HandleLuckTurntableDrawNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableDrawNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().luckTurntables = [];
            let newTime = Math.floor((new Date()).getTime() / 1000);
            // 判断当前时间是否已经过期（切后台卡消息bug）
            if (newTime > cv.dataHandler.getUserData().luckTurntablesEndTime) {
                cv.MessageCenter.send("updataLuckTurntablesButton");
                return;
            }

            for (let i = 0; i < msg.draw_list.length; i++) {
                cv.dataHandler.getUserData().luckTurntables.push(msg.draw_list[i]);
            }
            if (cv.dataHandler.getUserData().luckTurntables.length > 0) {
                cv.MessageCenter.send("drawRedPackage");
            }
            else {
                cv.MessageCenter.send("updataLuckTurntablesButton");
            }
        }
    }

    public _HandleLuckTurntableReadyNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableReadyNotice", puf);
        if (msg) {
            let newTime = Math.floor((new Date()).getTime() / 1000);
            let endTime = newTime + msg.left_interval_time;
            cv.dataHandler.getUserData().luckTurntablesEndTime = endTime;
            cv.dataHandler.getUserData().luckTurntablesStartTime = 0;
            cv.dataHandler.getUserData().luck_redbags = [];
            cv.MessageCenter.send("showCurrentTime");
            cv.MessageCenter.send("NoticeMRedBag");
        }
    }

    public _HandleLuckTurntableOverNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableOverNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().luckTurntablesEndTime = 0;
            cv.dataHandler.getUserData().luckTurntablesStartTime = 0;
            cv.dataHandler.getUserData().luck_redbags = [];
            cv.dataHandler.getUserData().luckTurntables = [];
            cv.MessageCenter.send("luckTurntablesOver");
            if (msg.error != 1) {
                cv.ToastError(msg.error);
            }
        }
    }

    public _HandleLuckTurntableStartTimeNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg: world_pb.LuckTurntableStartTimeNotice = this.decodePB("LuckTurntableStartTimeNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().isShowLuckTurntables = true;
            cv.dataHandler.getUserData().luckTurntablesInfo = msg;
            cv.MessageCenter.send("showLuckButton");

            let url = msg.share_image_url;
            if (typeof url == "string" && url.length > 0) {
                let strArr = url.split("#");
                for (let i = 0; i < strArr.length; i++) {
                    let url = cv.dataHandler.getUserData().getImageUrlByPlat(strArr[i])
                    cv.resMgr.downloadImg(url);
                }
            }
        }
    }

    public _HandleLuckTurntableEndTimeNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableEndTimeNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().isShowLuckTurntables = false;
            cv.MessageCenter.send("showLuckButton");
            if (msg.error != 1) {
                cv.ToastError(msg.error);
            }
        }
    }

    public _HandleLuckTurntableCountdownNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableCountdownNotice", puf);
        if (msg) {
            let newTime = Math.floor((new Date()).getTime() / 1000);
            let startTime = newTime + msg.left_interval_time;
            cv.dataHandler.getUserData().luckTurntablesStartTime = startTime;
            cv.MessageCenter.send("showReadyTime");
        }
    }

    public _HandleLuckTurntableResultNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableResultNotice", puf);
        if (msg) {
            if (msg.uid != cv.dataHandler.getUserData().u32Uid) {
                cv.MessageCenter.send("turntableResultNotice", msg);
            }
        }
    }

    public RequestLuckTurntableSnaplistResult(lamp_cnt: number, record_cnt: number): void {
        let msg = {
            lamp_cnt: lamp_cnt,
            record_cnt: record_cnt
        };
        let puf = this.encodePB("LuckTurntableSnaplistRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Luck_Turntable_Snaplist_Request, 0);
    }

    public _HandleLuckTurntableSnaplistResponse(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableSnaplistResponse", puf);
        if (msg) {
            if (msg.error == 1) {
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
    public _HandleLuckTurntableSnaplistNotice(puf: any) {
        if (!this.isShowLuckTurntable()) {
            return;
        }
        let msg = this.decodePB("LuckTurntableSnaplistNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().lamp_list = [];
            cv.dataHandler.getUserData().record_list = [];
            for (let i = 0; i < msg.lamp_list.length; i++) {
                cv.dataHandler.getUserData().lamp_list.push(msg.lamp_list[i])
            }
            for (let i = 0; i < msg.record_list.length; i++) {
                cv.dataHandler.getUserData().record_list.push(msg.record_list[i])
            }
            cv.MessageCenter.send("showLuckTurnSnaplist");
        }
    }


    public RequestCreateRedBag(level: number, boom: number): void {
        let msg = {
            rdb_amount_level: level,
            boom_number: boom
        };
        let puf = this.encodePB("CreateRedBagRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Create_RedBag_Request, 0);
    }

    public ResponseCreateRedBag(puf: any) {
        let msg = this.decodePB("CreateRedBagReponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().rdb_id = msg.rdb_id;
                cv.MessageCenter.send("ResponseCreateRedBag");
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
    public NoticeRedBag(puf: any) {
        let msg = this.decodePB("RedBagNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().RedNew = msg.clear;
            cv.dataHandler.getUserData().RedBagOpen = msg.open;

            if (msg.title.length > 0) {
                cv.dataHandler.getUserData().title = msg.title;
            }
            if (msg.content.length > 0) {
                cv.dataHandler.getUserData().content = msg.content;
            }
            for (let i = 0; i < msg.redbags.length; i++) {
                cv.dataHandler.getUserData().redbags.push(msg.redbags[i]);
            }
            if (msg.templets.length > 0) {
                cv.dataHandler.getUserData().red_templets = [];
                for (let i = 0; i < msg.templets.length; i++) {
                    cv.dataHandler.getUserData().red_templets.push(msg.templets[i]);
                }
            }
            cv.MessageCenter.send("NoticeRedBagOpen");
            cv.MessageCenter.send("NoticeRedBag");
        }
    }
    public RequestRedBagInfo(): void {
        this.sendWorldMsg(null, world_pb.MSGID.MsgID_RedBag_Info_Request, 0);
    }
    public ResponseRedBagInfo(puf: any) {
        let msg = this.decodePB("RedBagInfoResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("ResponseRedBagInfo");
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
    public RequestRedBagSetAmount(amount: number): void {
        let msg = {
            amount: amount,
        };
        let puf = this.encodePB("RedBagSetAmountRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_Set_Amount_Request, 0);
    }
    public ResponseRedBagSetAmount(puf: any) {
        let msg = this.decodePB("RedBagSetAmountResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                if (msg.amount > 0) {
                    cv.dataHandler.getUserData().redbags = [];
                    cv.dataHandler.getUserData().listen_amount = msg.amount;
                    cv.MessageCenter.send("ResponseRedBagSetAmount");
                }
            } else {
                cv.ToastError(msg.error);
            }
        }
    }
    public RequestRedBagDraw(rdb_id: number): void {
        let msg = {
            rdb_id: rdb_id,
        };
        let puf = this.encodePB("RedBagDrawRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_Draw_Request, 0);
    }
    public ResponseRedBagDraw(puf: any) {
        let msg = this.decodePB("RedBagDrawResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().redPacketInfo = msg;
                cv.MessageCenter.send("RedBagDraw");
            }
            else if (msg.error == 220) {
                cv.dataHandler.getUserData().redPacketInfo = msg;
                cv.MessageCenter.send("RedBagDraw");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }
    public NoticeRedBagOpen(puf: any) {
        let msg = this.decodePB("RedBagOpenNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().red_templets = [];
            cv.dataHandler.getUserData().RedBagOpen = msg.open;
            cv.dataHandler.getUserData().title = msg.title;
            cv.dataHandler.getUserData().content = msg.content;

            for (let i = 0; i < msg.templets.length; i++) {
                cv.dataHandler.getUserData().red_templets.push(msg.templets[i]);
            }
            cv.MessageCenter.send("NoticeRedBagOpen");
        }
    }
    public RequestRedBagHistory(rdb_id: number): void {
        let msg = {
            rdb_id: rdb_id,
        };
        let puf = this.encodePB("RedBagHistoryRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_History_Request, 0);
    }
    public ResponseRedBagHistory(puf: any) {
        let msg = this.decodePB("RedBagHistoryResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().RedBagHistory = msg;
            cv.MessageCenter.send("ResponseRedBagHistory");
        }
    }
    public NotifyRedBagBoom(puf: any) {
        let msg = this.decodePB("NotifyRedBagBoom2Creater", puf);
        if (msg) {
            cv.dataHandler.getUserData().boom2Creater = msg;
            cv.MessageCenter.send("NotifyRedBagBoom");
        }
    }
    public RequestRedBagStatus(rdb_id: number): void {
        let msg = {
            rdb_id: rdb_id,
        };
        let puf = this.encodePB("RedBagStatusRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_Status_Request, 0);
    }
    public ResponseRedBagStatus(puf: any) {
        let msg = this.decodePB("RedBagStatusResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().redPacketState = msg;
            cv.dataHandler.getUserData().updateRedPacketStatus(msg.rdb_id, msg.status);
            cv.dataHandler.getUserData().updateRedPacketIsdrawed(msg.rdb_id, msg.is_drawed);
            cv.MessageCenter.send("ResponseRedBagHistory");
        }
    }
    public NoticeDrawed2Creator(puf: any) {
        let msg = this.decodePB("DrawedRedBag2CreatorNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().redToCreateData = msg;
            cv.MessageCenter.send("NoticeDrawed2Creator");
        }
    }
    public RequestLastInfo(): void {
        let msg = {
        };
        let puf = this.encodePB("LastRedbagInfoRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_LastInfo_Request, 0);
    }
    public ResponseLastInfo(puf: any) {
        let msg = this.decodePB("LastRedbagInfoResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().lastInfo = msg;
            cv.MessageCenter.send("ResponseLastInfo");
        }
    }
    public RequestAutoDraw(num: number): void {
        let msg = {
            auto_count: num
        };
        let puf = this.encodePB("AutoRedBagDrawRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_AutoDraw_Request, 0);
    }
    public ResponseAutoDraw(puf: any) {
        let msg = this.decodePB("AutoRedBagDrawResponse", puf);
        if (msg) {
            if (msg.error == 218) {
                cv.ToastError(msg.error);
                return;
            }
            cv.dataHandler.getUserData().autoInfo = msg;
            for (let i = 0; i < msg.historys.length; i++) {
                cv.dataHandler.getUserData().updateRedPacketIsdrawed(msg.historys[i].rdb_id, true);
            }
            cv.MessageCenter.send("ResponseAutoDraw");
        }
    }
    public RequestRedPacketJP(): void {
        let msg = {
        };
        let puf = this.encodePB("RedBagJackpotRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_JackpotInfo_Request, 0);
    }
    public ResponseRedPacketJP(puf: any) {
        let msg = this.decodePB("RedBagJackpotInfoResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().redPacketJp = msg;
            if (msg.jackpot_amount.length > 0) {
                cv.dataHandler.getUserData().jpAmounts = [];
                for (let i = 0; i < msg.jackpot_amount.length; i++) {
                    cv.dataHandler.getUserData().jpAmounts.push(msg.jackpot_amount[i])
                }
            }
            cv.MessageCenter.send("ResponseAutoDraw");
        }
    }
    public RequestRedPacketTj(): void {
        let msg = {
        };
        let puf = this.encodePB("RedbagStatisticsInfoRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_RedBag_StatisticsInfo_Request, 0);
    }
    public ResponseRedPacketTj(puf: any) {
        let msg = this.decodePB("RedbagStatisticsInfoResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().redPacketTj = null;
            cv.dataHandler.getUserData().redPacketTj = msg;
            cv.MessageCenter.send("ResponseRedPacketTj");
        }
    }
    public RedPacketJpNotice(puf: any) {
        let msg = this.decodePB("RedbagJackpotUpdateNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().updateRedPacketJackPot(msg.amount_level, msg.jp_amount);
            cv.MessageCenter.send("ResponseRedPacketJP");
        }
    }

    public HandleNoticeGlobalMessage(puf: any) {
        let msg = this.decodePB("NoticeGlobalMessage", puf);
        let cout = msg.repeat_count;
        let content: string = cv.StringTools.getServerStrByLanguage(msg.msg);
        if (msg.msg_type == world_pb.MsgType.mtt_game_start) {
            cv.roomManager.mtt_id = msg.mtt_id;
            cv.roomManager.mtt_name = msg.mttGameName;
            cv.roomManager.mtt_time = msg.mttRemainTime;
            if (cv.roomManager.mtt_time >= 60) {
                content = cv.StringTools.formatC(cv.config.getStringData("MTT_frame_time_info_2"), cv.roomManager.mtt_name, Math.round(cv.roomManager.mtt_time / 60));
            }
            else {
                content = cv.StringTools.formatC(cv.config.getStringData("MTT_frame_time_info"), cv.roomManager.mtt_name, cv.roomManager.mtt_time);
            }

            let scene = cv.config.getCurrentScene();
            if (scene == cv.Enum.SCENE.POKERMASTER_SCENE) {
                cv.MessageCenter.send("NoticeMTT_MatchBegin", content);
            }
            else if (scene == cv.Enum.SCENE.HALL_SCENE) {
                cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                    cv.roomManager.isEnterMTT = true;
                    cv.MessageCenter.send("hallEnterMTT");
                }, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                });
                cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME);
                cv.roomManager.startScheduleForMTT();
            }
            else if (scene == cv.Enum.SCENE.CLUB_SCENE) {
                cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                    cv.roomManager.isEnterMTT = true;
                    cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
                    });
                }, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                });
                cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME);
                cv.roomManager.startScheduleForMTT();
            }
            else if (scene == cv.Enum.SCENE.COWBOY_SCENE
                || scene == cv.Enum.SCENE.VIDEOCOWBOY_SCENE
                || scene == cv.Enum.SCENE.HUMANBOY_SCENE
                || scene == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                    cv.roomManager.isEnterMTT = true;
                    cv.roomManager.RequestLeaveRoom();
                }, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                });
                cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME);
                cv.roomManager.startScheduleForMTT();
            } else if (scene == cv.Enum.SCENE.GAME_SCENE ||
                scene == cv.Enum.SCENE.SPORTS_SCENE) {
                cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                    cv.roomManager.isEnterMTT = true;
                    cv.MessageCenter.send("Exit_click");
                }, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                });
                cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME);
                cv.roomManager.startScheduleForMTT();
            } else if (scene == cv.Enum.SCENE.BLACKJACKPVP_SCENE) {
                cv.TP.showMsg(content, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                    cv.roomManager.isEnterMTT = true;
                    cv.MessageCenter.send("bjpvp_exit");
                }, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                });
                cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME);
                cv.roomManager.startScheduleForMTT();
            }
            return;
        }

        let data: PushNoticeData = new PushNoticeData();
        data.str = content;
        let len = msg.source_type.length;
        if (len == 0) {
            data.msgType.push(PushNoticeType.PUSH_WORLD);
        }
        else {
            for (let i = 0; i < len; i++) {
                switch (msg.source_type[i]) {
                    case cv.Enum.GameId.World:
                        data.msgType.push(PushNoticeType.PUSH_LOBBY);
                        break;
                    case cv.Enum.GameId.Texas:
                        data.msgType.push(PushNoticeType.PUSH_TEXAS);
                        break
                    case cv.Enum.GameId.StarSeat:
                        data.msgType.push(PushNoticeType.PUSH_STAR_SEAT);
                        break;
                    case world_pb.GameId.PLO:
                        data.msgType.push(PushNoticeType.PUSH_PLO);
                        break;
                    case cv.Enum.GameId.VideoCowboy:
                        data.msgType.push(PushNoticeType.PUSH_VIDEOCOWBOY);
                        break;
                    case cv.Enum.GameId.CowBoy:
                        data.msgType.push(PushNoticeType.PUSH_COWBOY);
                        break;
                    case cv.Enum.GameId.HumanBoy:
                        data.msgType.push(PushNoticeType.PUSH_HUMANBOY);
                        break;
                    case cv.Enum.GameId.PokerMaster:
                        data.msgType.push(PushNoticeType.PUSH_POKERMASTER);
                        break;
                    case cv.Enum.GameId.Allin:
                        data.msgType.push(PushNoticeType.PUSH_ALLIN);
                        break;
                    case cv.Enum.GameId.Bet:
                        data.msgType.push(PushNoticeType.PUSH_BET);
                        break;
                    case cv.Enum.GameId.Jackfruit:
                        data.msgType.push(PushNoticeType.PUSH_JACKFRUIT);
                        break;
                    default:
                        if (cv.roomManager.checkGameIsZoom(msg.source_type[i])) {
                            data.msgType.push(PushNoticeType.PUSH_ZOOM_TEXAS);
                        }
                        break;
                }
            }
        }

        for (let i = 0; i < cout; i++) {
            PushNotice.getInstance().addPushNotice(data);
        }
    }

    CheckSafe(password: string) {
        let md5Psd = cv.md5.md5(password);
        let msg = { safe: md5Psd };
        let puf = this.encodePB("CheckSafeRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_CheckSafe_Request, 0);
    }

    responseCheckSafe(puf: any) {
        let msg = this.decodePB("CheckSafeResponse", puf);
        if (msg.error == 1) {
            cv.MessageCenter.send("SecondaryPassword_checkSafeSuccess");
        }
        else {
            cv.ToastError(msg.error);
        }
    }

    public RequestGetStrongboxInfo(): void {
        let msg = {
        };
        let puf = this.encodePB("GetStrongboxInfoRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetStrongboxInfo_Request, 0);
    }

    public ResponseStrongboxInfo(puf: any) {
        let msg: world_pb.GetStrongboxInfoResponse = this.decodePB("GetStrongboxInfoResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().u32Chips = msg.carry_gold;
                cv.dataHandler.getUserData().u32Deposit_gold = msg.deposit_gold;
                cv.dataHandler.getUserData().usdt = msg.carry_usdt;
                cv.dataHandler.getUserData().deposit_usdt = msg.deposit_usdt;
                cv.MessageCenter.send("update_slider_state");
            }
        }
    }

    public RequestDeposit(num: number, deposit_type: number): void {
        let depositGold = cv.StringTools.serverGoldByClient(num);
        let msg = {
            amount: depositGold,
            deposit_type: deposit_type
        }
        let puf = this.encodePB("DepositInStrongboxRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_DepositInStrongbox_Request, 0);
    }

    public ResponseDeposit(puf: any) {
        let msg: world_pb.DepositInStrongboxResponse = this.decodePB("DepositInStrongboxResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                let isGold = msg.deposit_type == 0;
                if (isGold) {
                    cv.dataHandler.getUserData().u32Chips = msg.carry_gold;
                    cv.dataHandler.getUserData().u32Deposit_gold = msg.deposit_gold;
                }
                else {
                    cv.dataHandler.getUserData().usdt = msg.carry_gold;
                    cv.dataHandler.getUserData().deposit_usdt = msg.deposit_gold;
                }

                let depositgold = cv.StringTools.clientGoldByServer(msg.operating_gold);

                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData(isGold ? "Safe_deposit_succeed" : "Safe_deposit_succeed_usdt"), depositgold), cv.Enum.ToastType.ToastTypeSuccess);

                cv.MessageCenter.send("update_deposit_and_gold");
                cv.MessageCenter.send("update_gold");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public RequestTakeOut(amount: number, password: string, deposit_type: number): void {
        let depositGold = cv.StringTools.serverGoldByClient(amount);
        let md5Psd = cv.md5.md5(password);
        let msg = {
            amount: depositGold,
            password: md5Psd,
            deposit_type: deposit_type
        }
        let puf = this.encodePB("TakeoutStrongboxRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_TakeoutStrongbox_Request, 0);
    }

    public ResponseTakeOut(puf: any) {
        let msg = this.decodePB("TakeoutStrongboxResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                let isGold = msg.deposit_type == 0;
                if (isGold) {
                    cv.dataHandler.getUserData().u32Chips = msg.carry_gold;
                    cv.dataHandler.getUserData().u32Deposit_gold = msg.deposit_gold;
                }
                else {
                    cv.dataHandler.getUserData().usdt = msg.carry_gold;
                    cv.dataHandler.getUserData().deposit_usdt = msg.deposit_gold;
                }
                let depositgold = cv.StringTools.serverGoldToShowNumber(msg.operating_gold);

                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData(isGold ? "Safe_takeout_succeed" : "Safe_takeout_succeed_usdt"), depositgold), cv.Enum.ToastType.ToastTypeSuccess);

                cv.MessageCenter.send("update_takeout_balance");
                cv.MessageCenter.send("update_gold");
            }
            else {
                cv.ToastError(msg.error);
            }

        }
    }

    public RequestStrongboxInfo(deposit_type: number): void {
        let msg = {
            deposit_type: deposit_type
        };
        let puf = this.encodePB("StrongboxDetailRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_StrongboxDetail_Request, 0);
    }

    public ResponseDetail(puf: any) {
        let msg = this.decodePB("StrongboxDetailResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().SafeDetailList = [];

                let len = cv.StringTools.getArrayLength(msg.list);
                for (let i = 0; i < len; i++) {
                    cv.dataHandler.getUserData().SafeDetailList.push(msg.list[i]);
                }

                cv.MessageCenter.send("SafeDetailList");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public RequestJoinAllianceUserCancel(allianceID: number, clubID: number) {
        let msg = {
            alliance_id: allianceID,
            club_id: clubID
        };
        let puf = this.encodePB("JoinAllianceUserCancelRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_JoinAlliance_UserCancel_Request, 0);
    }

    public ResponseJoinAllianceUserCancel(puf: any) {
        let msg = this.decodePB("JoinAllianceUserCancelResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                this.requestAllianceSnapshotList(msg.club_id);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public RequestAuthApi(): boolean {
        let msg = {
            platform: 1,
            language: cv.config.getCurrentLanguage()
        };
        let puf = this.encodePB("RequestAuthApi", msg);
        // console.trace("MTTTest RequestAuthApi", msg);
        return this.sendWorldMsg(puf, world_pb.MSGID.MsgID_AuthApi_Request, 0);
    }

    public ResponseAuthApi(puf: any): void {
        let Access_BL_Server: number = 231;
        let msg = this.decodePB("ResponseAuthApi", puf);
        console.log("MTTTest ResponseAuthApi", msg);
        if (msg) {
            if (msg.error == Access_BL_Server) {
                cv.MessageCenter.send("FindView_showMttError", cv.config.getStringData("ResponseAuthApi_231"));
            }
            if (msg.error != 1) {
                // cv.MessageCenter.send("onAuthMttError", msg.error);
                MTTConnector.instance.onAuthMttError(msg.error);
            }
        }
        else {
            MTTConnector.instance.onAuthMttError(MTTConnector.instance.config.tokenErrorMsg.EMPTY_RESPONSE);
        }
    }

    public NoticeAuthApi(puf: any): void {
        let msg = this.decodePB("NoticeAuthApi", puf);
        console.log("MTTTest NoticeAuthApi", msg);
        if (msg) {
            let url = msg.url;
            cv.dataHandler.getUserData().mtt_url = url;
            let index1 = url.indexOf("token=");
            let tempUrl = url.substring(index1);
            let index2 = tempUrl.indexOf("&");
            let token = tempUrl.substr(6, index2 - 6)
            console.log("######################### token ====" + token);
            cv.dataHandler.getUserData().mtt_token = token;
            console.log("match url = ", url);
            // cv.MessageCenter.send("onAuthMttSucc", msg);
            MTTConnector.instance.onAuthMttSucc(msg);
        }
        else {
            // cv.MessageCenter.send("onAuthMttError", MTTConnector.instance.config.tokenErrorMsg.EMPTY_RESPONSE);
            MTTConnector.instance.onAuthMttError(MTTConnector.instance.config.tokenErrorMsg.EMPTY_RESPONSE);
        }
    }

    public NoticeMTTStatus(puf: any): void {
        let msg = this.decodePB("NoticeGameMaintainStatus", puf);
        if (msg) {
            if (msg.game_id == cv.Enum.GameId.Mtt) {
                //mtt维护状态通知
                let preNum = cv.config.HAVE_MTT;
                if (msg.status == 2) {
                    cv.config.HAVE_MTT = false;
                }
                else if (msg.status == 1) {
                    cv.config.setMTT();
                }
                if (preNum != cv.config.HAVE_MTT) {
                    cv.MessageCenter.send("update_mtt_state");
                }
            } else if (msg.game_id == cv.Enum.GameId.BlackJack) {
                //21点维护状态通知
                let preNumJack = cv.config.HAVE_BLACKJACK;
                if (msg.status) {
                    if (msg.status == 2) {  //21点，2是维护，1是开启
                        cv.config.setBlackJack(false);
                    } else if (msg.status == 1) {
                        cv.config.setBlackJack(true);
                    }
                    if (preNumJack != cv.config.HAVE_BLACKJACK) {  //如果状态有改变
                        cv.MessageCenter.send("update_blackJack_state");
                    }
                }
            }
        }
    }

    public MiniGamesListRequest(): void {
        let msg = {};
        let puf = this.encodePB("MiniGamesListRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_MiniGames_List_Request, 0);
    }

    public MiniGamesListResponse(puf: any): void {
        let msg = this.decodePB("MiniGamesListResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.updateMiniGameList(msg.games);
                cv.MessageCenter.send("MiniGamesListResponse", msg.games);
            }
        }
    }

    //请求MTT战绩列表数据
    //offset: 获取记录的偏移量  0： 从0开始
    //limit： //获取记录的数量
    //userID: 用户ID
    public RequestMttListData(userID: string, offset: number, limit: number): void {
        let msg = {
            foreign_id: Number(userID),
            offset: offset,
            limit: limit,
        };
        let puf = this.encodePB("RequestMttResult", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_MttResult_Request, 0);
    }


    public MttResultResponse(puf: any): void {
        let msg = this.decodePB("ResponseMttResult", puf);
        if (msg) {
            console.log("###############################MttResultResponse");
        }
    }
    //返回数据通知
    public MttResultNotice(puf: any): void {
        let msg = this.decodePB("NoticeMttResult", puf);
        if (msg) {
            let data = msg.data;
            cv.MessageCenter.send("sendMttMatchListData", data);
            console.log("###############################MttResultNotice data=" + data);
        }
    }

    //请求MTT战绩列表数据
    //mttId：比赛mttID
    //userID: 用户ID
    public RequestMttDetail(userID: string, mttId: number): void {
        let msg = {
            foreign_id: Number(userID),
            mtt_id: mttId,
        };
        let puf = this.encodePB("RequestMttDetail", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_MttDetail_Request, 0);
    }


    public MttDetailResponse(puf: any): void {
        let msg = this.decodePB("ResponseMttDetail", puf);
        if (msg) {
        }
    }
    //MTT详情数据通知
    public MttDetailNoticeResponse(puf: any): void {
        let msg = this.decodePB("NoticeMttDetail", puf);
        if (msg) {
            let data = msg.data;
            cv.MessageCenter.send("responseMTTDataDetailSuccess", data);
        }
    }


    //请求MTT用户数据
    //mttId：比赛mttID
    //userID: 用户ID
    public RequestMttUserInfoData(userID: string): void {
        let msg = {
            foreign_id: Number(userID),
        };
        let puf = this.encodePB("RequestMttGameSum", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_MttGameSum_Request, 0);
    }


    public MttUserDataResponse(puf: any): void {
        let msg = this.decodePB("ResponseMttGameSum", puf);
        if (msg) {
        }
    }
    //MTT详情数据通知
    public MttUserDataNoticeResponse(puf: any): void {
        let msg = this.decodePB("NoticeMttGameSum", puf);
        if (msg) {
            let data = msg.data;
            cv.MessageCenter.send("ResponseMTTUserInfoData", data);
        }
    }

    public ExchangeUserPointsRequest(goods_id: number) {
        let msg = {
            goods_id: goods_id,
        };
        let puf = this.encodePB("ExchangeUserPointsRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Exchange_UserPoints_Request, 0);
    }

    public ExchangeUserPointsResponse(puf: any): void {
        let msg: world_pb.ExchangeUserPointsResponse = this.decodePB("ExchangeUserPointsResponse", puf);
        if (msg) {
            cv.MessageCenter.send("EarnView_ExchangeUserPoints", msg);
        }
    }

    public GoodsListRequest(): void {
        let msg = {};
        let puf = this.encodePB("GoodsListRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Goods_List_Request, 0);
    }

    public GoodsListResponse(puf: any): void {
        let msg: world_pb.GoodsListResponse = this.decodePB("GoodsListResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("EarnView_GoodsListResponse", msg.goods_list);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    public BankDetailsQueryRequest(msg: any): void {
        let puf = this.encodePB("BankDetailsQueryRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Bank_Details_Query_Request, 0);
    }

    public BankDetailsQueryResponse(puf: any) {
        let msg: world_pb.BankDetailsQueryResponse = this.decodePB("BankDetailsQueryResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("InquireView_QueryResponse", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    //请求明星信息
    public StarDetailInfoRequest(star_uids: number[]) {
        let msg = {
            starIds: star_uids,
        };
        let puf = this.encodePB("StarInfoRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_StarInfo_Request, 0);
    }

    //明星详情信息返回
    public StarInfoResponse(puf: any) {
        let msg: world_pb.StarInfoResponse = this.decodePB("StarInfoResponse", puf);
        if (msg) {
            cv.MessageCenter.send("onStarDetailInfoResponse", msg);
        }
    }

    //检测当前明星房间是否开放
    public CheckStarRoomRequest(roomId: number) {
        let msg = {
            roomId: roomId,
        };
        console.log("CheckStarRoomRequest:send");
        let puf = this.encodePB("StarAllowRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_StarAllow_Request, 0);
    }


    //检测当前明星房间是否开放
    public CheckStarRoomResponse(puf: any) {
        let msg: world_pb.StarAllowResponse = this.decodePB("StarAllowResponse", puf);
        if (msg) {
            console.log("CheckStarRoomRequest:receve");
            cv.MessageCenter.send("onCheckStarRoomResponse", msg);
        }
    }

    //更改客户端当前语言
    public UserChangeLanguageRequest(lanuage: string): void {
        let msg = { CurrentLanguage: lanuage };
        let puf = this.encodePB("UserChangeLanguageRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_UserChangeLanguage_Request, 0);
    }
    public UserChangeLanguageResponse(puf: any): void {
        let msg: world_pb.UserChangeLanguageResponse = this.decodePB("UserChangeLanguageResponse", puf);
        if (msg) {
            console.log("UserChangeLanguageResponse error=" + msg.error);
        }
    }
    //汇率
    public GetScalerQuoteRequest(opType: number): void {
        let msg = { op_type: opType };
        let puf = this.encodePB("GetScalerQuoteRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Get_Scaler_Quote_Request, 0);
    }
    public GetScalerQuoteResponse(puf: any) {
        let msg: world_pb.GetScalerQuoteResponse = this.decodePB("GetScalerQuoteResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("onGetScalerQuoteResponse", msg);
            } else {
                // cv.ToastError(msg.error);
            }
        }
    }
    //兑换
    public ExchangeCurrencyRequest(opType: number, formAmt: number, pointDeduction: boolean = false): void {
        let msg = { op_type: opType, from_amt: formAmt, is_point_deduction: pointDeduction };
        let puf = this.encodePB("ExchangeCurrencyRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_Exchange_Currency_Request, 0);
    }
    public ExchangeCurrencyResponse(puf: any) {
        let msg: world_pb.ExchangeCurrencyResponse = this.decodePB("ExchangeCurrencyResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("onExchangeCurrencyResponse", msg);

            } else if (msg.error == 257) {  //257是时间间隔错误提示，需要拿到错误提示
                cv.MessageCenter.send("onExchangeTimeLimitError", msg);
            } else {
                cv.ToastError(msg.error);
            }
        }
    }

    //请求coin兑换usdt配置信息
    public ExchangeGetUsdtConfigRequest() {
        let msg = {};
        let puf = this.encodePB("GetUsdtExchangeConfigRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetUsdtExchange_Config_Request, 0);
    }

    public ExchangeGetUsdtConfigResponse(puf: any) {
        let msg: world_pb.GetUsdtExchangeConfigResponse = this.decodePB("GetUsdtExchangeConfigResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("onExchangeGetConfigResponse", msg);
            } else {
                cv.ToastError(msg.error);
            }
        }
    }

    //coin兑换usdt配置信息改变通知，改变了需要客户端再主动拉去
    public ExchangeGetUsdtConfigNotice(puf: any) {
        cv.MessageCenter.send("onExchangeGetConfigNotice");
    }

    //自动带入中自动dsdt兑换通知
    public BuyinEventUsdtChanageNotice(puf: any) {
        let msg: world_pb.BuyinEventUsdtChanageNotice = this.decodePB("BuyinEventUsdtChanageNotice", puf);
        if (msg) {
            let formactStr: string = msg.game_id == cv.Enum.GameId.Jackfruit ? "USDTView_usdt_chanage_2" : "USDTView_usdt_chanage_1";
            cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData(formactStr), cv.StringTools.numToFloatString(msg.usdt_subtract), cv.StringTools.numToFloatString(msg.gold_add)), cv.Enum.ToastType.ToastTypeError);
        }
    }
    public GetUserMarksRequest(userId: number) {
        let msg = {
            targetId: userId,
        };
        let puf = this.encodePB("GetUserMarksRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetUserMarks_Request, 0);
    }

    public GetUserMarks(puf: any) {
        let msg: world_pb.GetUserMarksResponse = this.decodePB("GetUserMarksResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("get_usermarks", msg);
            }
            else {
                cv.ToastError(msg.error);
            }

            if (msg.edit_state) {
                cv.dataHandler.getUserData().mark_edit_state = msg.edit_state; //玩家签名修改状态
            }
        }
    }

    //usermarks :签名内容
    //option: 0-正常修改个性签名 1-不修改签名,客户端输入了敏感字符上报
    public UpdateUserMarksRequest(usermarks: string, option: number = 0) {
        let msg = {
            marks: usermarks,
            op: option,
        };
        let puf = this.encodePB("UpdateUserMarksRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_UpdateUserMarks_Request, 0);
    }

    public UpdateUserMarks(puf: any) {
        let msg: world_pb.UpdateUserMarksResponse = this.decodePB("UpdateUserMarksResponse", puf);
        if (msg) {
            if (msg.error == 1 && msg.op != 1) {  //op 透传 0-正常修改个性签名 1-不修改签名,客户端输入了敏感字符上报
                //op == 1的时候，不处理更新签名
                cv.MessageCenter.send("modify_usermarks", msg);

            }
            if (msg.edit_state) {
                cv.dataHandler.getUserData().mark_edit_state = msg.edit_state; //玩家签名修改状态
            }
        }
        else {
            cv.ToastError(msg.error);
        }
    }

    ReceiveToolsNotice(puf: any) {
        let msg: world_pb.ReceiveToolsNotice = this.decodePB("ReceiveToolsNotice", puf);
        if (msg) {
            cv.MessageCenter.send("ReceiveToolsNotice", msg);
        }
    }

    ReceiveToolsRequest(info: world_pb.ToolsInfo) {
        let msg: world_pb.ToolsInfo = world_pb.ToolsInfo.create(info);
        let puf = this.encodePB("ReceiveToolsRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_ReceiveTools_Request, 0);
    }

    ReceiveToolsResponse(puf: any) {
        let msg: world_pb.ReceiveToolsResponse = this.decodePB("ReceiveToolsResponse", puf);
        if (msg) {
            cv.MessageCenter.send("ReceiveToolsResponse", msg);
        }
    }

    QuickRaiseRequest(value: number | string[], game_id: number, isPreFlop: boolean) {
        let msg: world_pb.QuickRaiseRequest = world_pb.QuickRaiseRequest.create();

        if (Array.isArray(value)) {
            msg.changeVals = value.slice();
            msg.whichRaise = msg.changeVals.length;
        }
        else {
            msg.whichRaise = value;
        }

        msg.game_id = game_id;
        msg.isPreFlop = isPreFlop;

        let puf = this.encodePB("QuickRaiseRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_QuickRaise_Request, 0);
    }

    QuickRaiseResponse(puf: any) {
        let msg: world_pb.QuickRaiseResponse = this.decodePB("QuickRaiseResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("quickraise", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    DefaultSettingRequest(whRaise: number, game_id: number, isPreFlop: boolean) {
        let msg: world_pb.DefaultSettingRequest = world_pb.DefaultSettingRequest.create();
        msg.whichRaise = whRaise;
        msg.game_id = game_id;
        msg.isPreFlop = isPreFlop;
        let puf = this.encodePB("DefaultSettingRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_DefaultSetting_Request, 0);
    }

    DefaultSettingResponse(puf: any) {
        let msg: world_pb.DefaultSettingResponse = this.decodePB("DefaultSettingResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.MessageCenter.send("defaultsetting", msg);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }


    StarWillBeginNotice(puf: any) {
        let msg: world_pb.StarWillBeginNotice = this.decodePB("StarWillBeginNotice", puf);
        if (msg) {
            let data: PushNoticeData = new PushNoticeData();

            data.str = msg.notifyText;
            data.msgType.push(PushNoticeType.PUSH_WORLD);

            PushNotice.getInstance().addPushNotice(data);
        }
    }

    GetUserHelpWarpListRequest() {
        let puf = this.encodePB("GetUserHelpWarpListRequest", {});
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetUserHelpWarpList_Request, 0);
    }

    GetUserHelpWarpListResponse(puf: any) {
        let msg: world_pb.GetUserHelpWarpListResponse = this.decodePB("GetUserHelpWarpListResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().left_help_count = msg.left_help_count;
                cv.dataHandler.getUserData().help_wrap_list = [];
                for (let i = 0; i < msg.help_wrap_data.length; i++) {
                    cv.dataHandler.getUserData().help_wrap_list.push(world_pb.HelpWrapInfo.create(msg.help_wrap_data[i]));
                }
                cv.MessageCenter.send("update_help_Warp_list");
                cv.MessageCenter.send("update_left_help_count");
                cv.MessageCenter.send("updata_my_redpackets_pos");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    AddHelperRequest(code: number) {
        let msg = {
            code: code
        }
        let puf = this.encodePB("AddHelperRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_AddHelper_Request, 0);
    }

    AddHelperResponse(puf: any) {
        let msg: world_pb.AddHelperResponse = this.decodePB("AddHelperResponse", puf);
        if (msg) {
            cv.dataHandler.getUserData().left_help_count = msg.left_help_count;
            cv.MessageCenter.send("update_left_help_count");
            if (msg.error == 1) {
                cv.dataHandler.getUserData().total_history_amount = msg.total_history_amount;
                cv.MessageCenter.send("updata_total_history_amount");
                cv.MessageCenter.send("showHelpFriendView", msg);
            }
            else {
                if (msg.error == 292) {
                    let acBuffer = cv.StringTools.formatC(cv.config.getStringData("ServerErrorCode292"), msg.check_register_days);
                    cv.TT.showMsg(acBuffer, cv.Enum.ToastType.ToastTypeError);
                } else {
                    cv.ToastError(msg.error);
                }
            }
        }
    }

    GetTotalHistoryAmountRequest() {
        let puf = this.encodePB("GetTotalHistoryAmountRequest", {});
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_GetTotalHistoryAmount_Request, 0);
    }

    GetTotalHistoryAmountResponse(puf: any) {
        let msg: world_pb.GetTotalHistoryAmountResponse = this.decodePB("GetTotalHistoryAmountResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().total_history_amount = msg.total_history_amount;
                cv.MessageCenter.send("updata_total_history_amount");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    UserReceiveHelpWarpRequest(code: number) {
        let msg = {
            code: code
        }
        let puf = this.encodePB("UserReceiveHelpWarpRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_UserReceiveHelpWarp_Request, 0);
    }

    UserReceiveHelpWarpResponse(puf: any) {
        let msg: world_pb.UserReceiveHelpWarpResponse = this.decodePB("UserReceiveHelpWarpResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().deleteHelpWarpByCode(msg.code);
                cv.dataHandler.getUserData().total_history_amount = msg.total_history_amount;
                cv.MessageCenter.send("updata_total_history_amount");
                cv.MessageCenter.send("showOpenRedPackets", msg.user_prizes_data);
                cv.MessageCenter.send("updata_my_redpackets_pos");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    AddHelpWrapNotice(puf: any) {
        this.GetUserHelpWarpListRequest();
    }

    UserHelpWarpChangeNotice(puf: any) {
        let msg: world_pb.UserHelpWarpChangeNotice = this.decodePB("UserHelpWarpChangeNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().updateHelpWarpData(msg.help_wrap_data);
        }
    }

    LeftHelpCountChangeNotice(puf: any) {
        let msg: world_pb.LeftHelpCountChangeNotice = this.decodePB("LeftHelpCountChangeNotice", puf);
        if (msg) {
            cv.dataHandler.getUserData().left_help_count = msg.LeftHelpCount;
            cv.MessageCenter.send("update_left_help_count");
        }
    }

    BatchDelRemarksRequest(targetIds: number[]) {
        let msg = { targetIds: targetIds };
        let puf = this.encodePB("RequestBatchDelRemarks", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_BatchDelRemarks_Request, 0);
    }

    BatchDelRemarksResponse(puf: any) {
        let msg: world_pb.ResponseBatchDelRemarks = this.decodePB("ResponseBatchDelRemarks", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().selectIDs = []
                cv.dataHandler.getUserData().removeRemarks(msg.targetIds);
                cv.MessageCenter.send("update_remarks");
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    GetTexasHandsRequest() {
        if (cv.dataHandler.getUserData().bGetTHands) return;
        if (cv.dataHandler.getUserData().isTouristUser) return;
        if (!cv.dataHandler.getActivityData().isSystemAvatar()) return;
        let msg = {};
        let puf = this.encodePB("GetTexasHandsRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgId_GetTexasTotalHands_Request, 0);
    }

    GetTexasHandsResponse(puf: any) {
        let msg: world_pb.GetTexasHandsResponse = this.decodePB("GetTexasHandsResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().totalHands = msg.totalHands;
                cv.dataHandler.getUserData().bGetTHands = true;
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    SportsLoginRequest(gameid: number, matchId: string) {
        let msg: world_pb.SportsLoginRequest = world_pb.SportsLoginRequest.create();
        msg.gameId = gameid;
        msg.matchId = matchId;
        let puf: any = this.encodePB("SportsLoginRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SportsLogin_Request, 0);
    }

    SportsLoginResponse(puf: any) {
        let msg: world_pb.SportsLoginResponse = this.decodePB("SportsLoginResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.roomManager.setSportsUrl(msg);
                cv.MessageCenter.send("startSportsScene", msg.gameId);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    SportsLeaveRequest() {
        let msg = {};
        let puf = this.encodePB("SportsLeaveRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_SportsLeave_Request, 0);
    }

    SportsLeaveResponse(puf: any) {
        let msg: world_pb.SportsLeaveResponse = this.decodePB("SportsLeaveResponse", puf);
        if (msg) {
            if (msg.error == 1) {

            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    PgLoginRequest() {
        let msg = {};
        let puf = this.encodePB("PgLoginRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_PgLogin_Request, 0);
    }

    PgLoginResponse(puf: any) {
        let msg: world_pb.PgLoginResponse = this.decodePB("PgLoginResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.roomManager.setElcGamesUrl(msg.operatorToken, msg.playerSession);
                cv.MessageCenter.send("startSportsScene", world_pb.GameId.PocketGames);
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    PgLeaveRequest() {
        let msg = {};
        let puf = this.encodePB("PgLeaveRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_PgLeave_Request, 0);
    }

    PgLeaveResponse(puf: any) {
        let msg: world_pb.PgLeaveResponse = this.decodePB("PgLeaveResponse", puf);
        if (msg) {
            if (msg.error == 1) {
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    //小游戏福利请求
    PgBonusAndFreeGamesRequest() {
        let msg = {};
        let puf = this.encodePB("PgBonusAndFreeGamesRequest", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_PgBonusAndFreeGames_Request, 0);
    }

    PgBonusAndFreeGamesResponse(puf: any) {
        let msg: world_pb.PgBonusAndFreeGamesResponse = this.decodePB("PgBonusAndFreeGamesResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                cv.dataHandler.getUserData().addWelfareData(msg); //添加福利
                cv.MessageCenter.send("sendBonusAndFreeGamesMsg");
            }
            else {
                cv.dataHandler.getUserData().resetWelfareData();
                cv.ToastError(msg.error);
                cv.MessageCenter.send("sendBonusAndFreeGamesMsg");
            }
        }
    }

    //21点认证登录接口,获取token
    requestBlackJackAuthApi() {
        let msg = {};
        let puf = this.encodePB("BlackJackLoginRequest", msg);
        return this.sendWorldMsg(puf, world_pb.MSGID.MsgId_BlackJackLogin_Request, 0);
    }

    //21点认证返回
    responseBlackJackAuthApi(puf: any) {
        let msg: world_pb.BlackJackLoginResponse = this.decodePB("BlackJackLoginResponse", puf);
        if (msg) {
            if (msg.error == 1) {
                let token = msg.token;//
                // cv.MessageCenter.send("onAuthBlackJackSucc", msg);
                BJPVPConnector.instance.onAuthBlackJackSucc(msg);
            } else {
                cv.ToastError(msg.error);
                // cv.MessageCenter.send("onAuthBlackJackError", msg.error);
                BJPVPConnector.instance.onAuthBlackJackError(msg.error);
            }
        }
        else {
            // cv.MessageCenter.send("onAuthBlackJackError", BJPVPConnector.instance.keyConfig.tokenErrorMsg.EMPTY_RESPONSE);
            BJPVPConnector.instance.onAuthBlackJackError(BJPVPConnector.instance.keyConfig.tokenErrorMsg.EMPTY_RESPONSE);
        }
    }

    //通知打开冷静窗口
    noticeOpenCalmDownWindows(puf: any) {
        let msg: world_pb.NoticeOpenCalmDownWindows = this.decodePB("NoticeOpenCalmDownWindows", puf);
        if (msg) {
            let calmDownSeconds = msg.calmDownSeconds;  //冷静时间
            let numNotification = msg.numNotification;  //本次是第几次
        }
    }

    //冷静窗口点击确认
    //点击确认，取消可以不请求直接关掉窗口好了
    requestCalmDownConfirm(confirm: boolean = false) {
        let msg = { confirm: confirm };
        let puf = this.encodePB("RequestCalmDownConfirm", msg);
        this.sendWorldMsg(puf, world_pb.MSGID.MsgID_CalmDownConfirm_Request, 0);
    }

    //冷静弹框点击操作后返回
    responseCalmDownConfirm(puf: any) {
        let msg: world_pb.ResponseCalmDownConfirm = this.decodePB("ResponseCalmDownConfirm", puf);
        if (msg) {
            if (msg.error == 1) {
            }
            else {
                cv.ToastError(msg.error);
            }
        }
    }

    //冷静弹框确认后提示
    noticeCalmDownConfirmResult(puf: any) {
        let msg: world_pb.NoticeCalmDownConfirmResult = this.decodePB("NoticeCalmDownConfirmResult", puf);
        if (msg) {
            cv.MessageCenter.send("onNoticeOpenCalmDownWindow", msg);
        }
    }
}