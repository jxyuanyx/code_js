import * as $protobuf from "protobufjs";
export namespace pb {

    enum MSGID {
        MsgID_Min = 0,
        MsgID_ConnClose_Notice = 10,
        MsgID_DupLogin_Notice = 99,
        MsgID_Logon_Request = 10000,
        MsgID_Logon_Response = 10001,
        MsgID_CreateClub_Request = 30010,
        MsgID_CreateClub_Response = 30011,
        MsgID_ClubSnapshotList_Request = 30012,
        MsgID_ClubSnapshotList_Response = 30013,
        MsgID_ClubSnapshotList_Notice = 30014,
        MsgID_JoinClub_Request = 30015,
        MsgID_JoinClub_Notice_To_Member = 30016,
        MsgID_JoinClub_Notice = 30017,
        MsgID_JoinClub_Reply = 30018,
        MsgID_JoinClub_Response_To_Member = 30019,
        MsgID_JoinClub_Response_To_Admin = 30020,
        MsgID_LeaveClub_Request = 30021,
        MsgID_LeaveClub_Response = 30022,
        MsgID_ClubCurrentBoard_Request = 30023,
        MsgID_ClubCurrentBoard_Response = 30024,
        MsgID_ClubCurrentBoard_Notice = 30025,
        MsgID_ClubMemberSnapshotList_Request = 30026,
        MsgID_ClubMemberSnapshotList_Response = 30027,
        MsgID_ClubMemberSnapshotList_Notice = 30028,
        MsgID_ModifyClubMember_Request = 30029,
        MsgID_ModifyClubMember_Response = 30030,
        MsgID_ModifyClubMember_Notice = 30031,
        MsgID_ModifyClubInfo_Request = 30032,
        MsgID_ModifyClubInfo_Response = 30033,
        MsgID_GrantClubFund_Request = 30036,
        MsgID_GrantClubFund_Response = 30037,
        MsgID_SearchClubInfo_Request = 30038,
        MsgID_SearchClubInfo_Response = 30039,
        MsgID_SearchClubInfo_Notice = 30040,
        MsgID_ClubCreaterInfo_Request = 30041,
        MsgID_ClubCreaterInfo_Response = 30042,
        MsgID_ClubCreaterInfo_Notice = 30043,
        MsgID_SendMsg_Request = 30047,
        MsgID_SendMsg_Response = 30048,
        MsgID_SendMsg_Notice = 30049,
        MsgID_GetUserData_Request = 30050,
        MsgID_GetUserData_Response = 30051,
        MsgID_GetUserData_Notice = 30052,
        MsgID_HeartBeat_Request = 30053,
        MsgID_HeartBeat_Response = 30054,
        MsgID_GetJackpotData_Request = 30055,
        MsgID_GetJackpotData_Response = 30056,
        MsgID_GetJackpotData_Notice = 30057,
        MsgID_JackpotSetting_Request = 30058,
        MsgID_JackpotSetting_Response = 30059,
        MsgID_JackpotSetting_Notice = 30060,
        MsgID_SetJackpot_Request = 30061,
        MsgID_SetJackpot_Response = 30062,
        MsgID_SetJackpot_Notice = 30063,
        MsgID_RecoverJackpotSetting_Request = 30064,
        MsgID_RecoverJackpotSetting_Response = 30065,
        MsgID_JackpotAmout_Notice = 30066,
        MsgID_CurrentRoomJackpot_Request = 30067,
        MsgID_CurrentRoomJackpot_Response = 30068,
        MsgID_CurrentRoomJackpot_Notice = 30069,
        MsgID_JackpotAwardRecord_Request = 30070,
        MsgID_JackpotAwardRecord_Response = 30071,
        MsgID_JackpotAwardRecord_Notice = 30072,
        MsgID_JackpotInjectAmount_Request = 30073,
        MsgID_JackpotInjectAmount_Response = 30074,
        MsgID_JackpotInjectAmount_Notice = 30075,
        MsgID_JackPotAwardInfo_Notice = 30079,
        MsgID_CreateAlliance_Request = 30080,
        MsgID_CreateAlliance_Response = 30081,
        MsgID_LeaveAlliance_Request = 30082,
        MsgID_LeaveAlliance_Response = 30083,
        MsgID_SearchAlliance_Request = 30084,
        MsgID_SearchAlliance_Response = 30085,
        MsgID_SearchAlliance_Notice = 30086,
        MsgID_KickoffAllianceMember_Request = 30087,
        MsgID_KickoffAllianceMember_Response = 30088,
        MsgID_KickoffAllianceMember_Notice = 30089,
        MsgID_AllianceList_Request = 30090,
        MsgID_AllianceList_Response = 30091,
        MsgID_AllianceList_Notice = 30092,
        MsgID_JoinAlliance_Request = 30093,
        MsgID_JoinAlliance_Notice_To_Member = 30094,
        MsgID_JoinAlliance_Notice_To_Admin = 30095,
        MsgID_JoinAllianceReply_To_World = 30096,
        MsgID_JoinAlliance_Response_To_Member = 30097,
        MsgID_JoinAlliance_Response_To_Admin = 30098,
        MsgID_AddRemarks_Request = 30099,
        MsgID_AddRemarks_Response = 30100,
        MsgID_AddRemarks_Notice = 30101,
        MsgID_GetAllRemarks_Request = 30102,
        MsgID_GetAllRemarks_Response = 30103,
        MsgID_GetAllRemarks_Notice = 30104,
        MsgID_LeaveAlliance_Notice = 30105,
        MsgID_ClearAllianceMaxBuyinLimit_Request = 30106,
        MsgID_ClearAllianceMaxBuyinLimit_Response = 30107,
        MsgID_SetAllianceMaxBuyinLimit_Request = 30108,
        MsgID_SetAllianceMaxBuyinLimit_Response = 30109,
        MsgID_SetAllianceControlBuyin_Request = 30110,
        MsgID_SetAllianceControlBuyin_Response = 30111,
        MsgID_FairPlay_Report_Request = 30112,
        MsgID_FairPlay_Report_Response = 30113,
        MsgID_DeviceInfo_Report_Request = 30120,
        MsgID_DeviceInfo_Report_Response = 30121,
        MsgID_ClubGrantFund_Notice = 30122,
        MsgID_GetIncome_Request = 30123,
        MsgID_GetIncome_Response = 30124,
        MsgID_GetIncome_Notice = 30125,
        MsgID_GetUserClubGrantInfo_Request = 30126,
        MsgID_GetUserClubGrantInfo_Response = 30127,
        MsgID_GetUserClubGrantInfo_Notice = 30128,
        MsgID_NotifyUserGoldNum_Notice = 30129,
        MsgID_GetUserMailListInfo_Request = 30130,
        MsgID_GetUserMailListInfo_Response = 30131,
        MsgID_GetUserMailListInfo_Notice = 30132,
        MsgID_ReadAndFetchOneMail_Request = 30133,
        MsgID_ReadAndFetchOneMail_Response = 30134,
        MsgID_ReadAndFetchOneMail_Notice = 30135,
        MsgID_NotifyUserMailNum = 30136,
        MsgID_NoticeCreateClub = 30137,
        MsgID_RequestAnounceList = 30138,
        MsgID_ResponseAnounceList = 30139,
        MsgID_NoticeAnounceList = 30140,
        MsgID_NoticeOneAnounce = 30141,
        MsgID_NoticeCreateAlliance = 30142,
        MsgID_AddCoinOrder_Pay_Request = 30143,
        MsgID_AddCoinOrder_Pay_Response = 30144,
        MsgID_AddCoinResult_Pay_Notice = 30145,
        MsgID_DelCoinOrder_Pay_Request = 30146,
        MsgID_DelCoinOrder_Pay_Response = 30147,
        MsgID_DelCoinResult_Pay_Notice = 30148,
        MsgID_SearchClubMember_Request = 30149,
        MsgID_SearchClubMember_Response = 30150,
        MsgID_SearchClubMember_Notice = 30151,
        MsgID_ReadAndFetchOneAnounce_Request = 30152,
        MsgID_ReadAndFetchOneAnounce_Response = 30153,
        MsgID_ReadAndFetchOneAnounce_Notice = 30154,
        MsgID_NoticeOneMail = 30155,
        MsgID_NoticeWithdrawMail = 30156,
        MsgID_NoticeWithdrawAnounce = 30157,
        MsgID_SetClubInvitePercent_Request = 30158,
        MsgID_SetClubInvitePercent_Response = 30159,
        MsgID_AutoAgreeClubReply_Request = 30160,
        MsgID_AutoAgreeClubReply_Response = 30161,
        MsgID_AutoAgreeClubReply_Notice = 30162,
        MsgID_QuerySendFairReport_Request = 30163,
        MsgID_QuerySendFairReport_Response = 30164,
        MsgID_Login_Notice = 30165,
        MsgID_GetWebToken_Request = 30166,
        MsgID_GetWebToken_Response = 30167,
        MsgID_CowBoy_List_Request = 30168,
        MsgID_CowBoy_List_Response = 30169,
        MsgID_GlobalMessage_Notice = 30170,
        MsgID_GameStatus_Request = 30171,
        MsgID_GameStatus_Response = 30172,
        MsgID_HumanBoy_List_Request = 30173,
        MsgID_HumanBoy_List_Response = 30174,
        MsgID_DepositInStrongbox_Request = 30175,
        MsgID_DepositInStrongbox_Response = 30176,
        MsgID_TakeoutStrongbox_Request = 30178,
        MsgID_TakeoutStrongbox_Response = 30179,
        MsgID_StrongboxDetail_Request = 30181,
        MsgID_StrongboxDetail_Response = 30182,
        MsgID_GetStrongboxInfo_Request = 30184,
        MsgID_GetStrongboxInfo_Response = 30185,
        MsgID_Luck_Draw_Done_Request = 30187,
        MsgID_Luck_Draw_Done_Response = 30188,
        MsgID_Luck_Draw_Notice = 30189,
        MsgID_Aof_JackPot_List_Request = 30190,
        MsgID_Aof_JackPot_List_Response = 30191,
        MsgID_Aof_Thouthand_Request = 30192,
        MsgID_Aof_Thouthand_response = 30193,
        MsgID_CheckSafe_Request = 30194,
        MsgID_CheckSafe_response = 30195,
        MsgID_Luck_Turntable_Draw_Notice = 30196,
        MsgID_Luck_Turntable_Result_Request = 30197,
        MsgID_Luck_Turntable_Result_Response = 30198,
        MsgID_Luck_Turntable_Ready_Notice = 30199,
        MsgID_Luck_Turntable_Over_Notice = 30200,
        MsgID_Luck_Turntable_StartTime_Notice = 30201,
        MsgID_Luck_Turntable_EndTime_Notice = 30202,
        MsgID_Luck_Turntable_Snaplist_Request = 30203,
        MsgID_Luck_Turntable_Snaplist_Response = 30204,
        MsgID_Luck_Turntable_Snaplist_Notice = 30205,
        MsgID_Luck_Turntable_Countdown_Notice = 30206,
        MsgID_Luck_Turntable_Result_Notice = 30207,
        MsgID_GameStatusV2_Request = 30211,
        MsgID_GameStatusV2_Response = 30212,
        MsgID_Banner_Request = 30300,
        MsgID_Banner_Response = 30301,
        MsgID_ZoomPlayerSettle_Notice = 30302,
        MsgID_SetThisAreaPlayer_Notice = 30303,
        MsgID_Create_RedBag_Request = 30400,
        MsgID_Create_RedBag_Response = 30401,
        MsgID_RedBag_Notice = 30402,
        MsgID_RedBag_Info_Request = 30403,
        MsgID_RedBag_Info_Response = 30404,
        MsgID_RedBag_Set_Amount_Request = 30405,
        MsgID_RedBag_Set_Amount_Response = 30406,
        MsgID_RedBag_Draw_Request = 30407,
        MsgID_RedBag_Draw_Response = 30408,
        MsgID_RedBag_Open_Notice = 30409,
        MsgID_RedBag_History_Request = 30410,
        MsgID_RedBag_History_Response = 30411,
        MsgID_RedBag_Boom2Creater_Notify = 30412,
        MsgID_RedBag_Status_Request = 30413,
        MsgID_RedBag_Status_Response = 30414,
        MsgID_RedBag_AutoDraw_Request = 30415,
        MsgID_RedBag_AutoDraw_Response = 30416,
        MsgID_RedBag_Drawed2Creator_Notice = 30417,
        MsgID_RedBag_LastInfo_Request = 30418,
        MsgID_RedBag_LastInfo_Response = 30419,
        MsgID_RedBag_JackpotInfo_Request = 30420,
        MsgID_RedBag_JackpotInfo_Response = 30421,
        MsgID_RedBag_StatisticsInfo_Request = 30422,
        MsgID_RedBag_StatisticsInfo_Response = 30423,
        MsgID_RedBag_JackpotUpdate_Notice = 30424,
        MsgID_Create_RedBagM_Request = 30440,
        MsgID_Create_RedBagM_Response = 30441,
        MsgID_RedBagM_Notice = 30442,
        MsgID_RedBagM_Info_Request = 30443,
        MsgID_RedBagM_Info_Response = 30444,
        MsgID_RedBagM_Set_Amount_Request = 30445,
        MsgID_RedBagM_Set_Amount_Response = 30446,
        MsgID_RedBagM_Draw_Request = 30447,
        MsgID_RedBagM_Draw_Response = 30448,
        MsgID_RedBagM_History_Request = 30449,
        MsgID_RedBagM_History_Response = 30450,
        MsgID_RedBagM_Boom2Creater_Notify = 30451,
        MsgID_RedBagM_Status_Request = 30452,
        MsgID_RedBagM_Status_Response = 30453,
        MsgID_RedBagM_Drawed2Creator_Notice = 30454,
        MsgID_RedBagM_LastInfo_Request = 30455,
        MsgID_RedBagM_LastInfo_Response = 30456,
        MsgID_RedBagM_StatisticsInfo_Request = 30457,
        MsgID_RedBagM_StatisticsInfo_Response = 30458,
        MsgID_RedBagM_ShowUI_Notify = 30459,
        MsgID_VideoCowboy_List_Request = 30480,
        MsgID_VideoCowboy_List_Response = 30481,
        MsgID_GetRank_Request = 35001,
        MsgID_GetRank_Response = 35002,
        MsgID_SetSecretKey_Request = 35101,
        MsgID_SetSecretKey_Response = 35102,
        MsgID_SetSecretKeyEx_Request = 35103,
        MsgID_SetSecretKeyEx_Response = 35104,
        MsgID_Referrals_Request = 35110,
        MsgID_Referrals_Response = 35111,
        MsgID_InviteSummary_Request = 35201,
        MsgID_InviteSummary_Response = 35202,
        MsgID_InviteIncomeRedeem_Request = 35203,
        MsgID_InviteIncomeRedeem_Response = 35204,
        MsgID_JoinAlliance_UserCancel_Request = 35301,
        MsgID_JoinAlliance_UserCancel_Response = 35302,
        MsgID_PokerMaster_List_Request = 35205,
        MsgID_PokerMaster_List_Response = 35206,
        MsgID_MiniGames_List_Request = 35207,
        MsgID_MiniGames_List_Response = 35208,
        MsgID_AuthApi_Request = 35401,
        MsgID_AuthApi_Notice = 35402,
        MsgID_AuthApi_Response = 35403,
        MsgID_GameMaintainStatus_Notice = 35404,
        MsgID_MttResult_Request = 35405,
        MsgID_MttResult_Notice = 35406,
        MsgID_MttResult_Response = 35407,
        MsgID_MttDetail_Request = 35408,
        MsgID_MttDetail_Notice = 35409,
        MsgID_MttDetail_Response = 35410,
        MsgID_MttGameSum_Request = 35411,
        MsgID_MttGameSum_Notice = 35412,
        MsgID_MttGameSum_Response = 35413,
        MsgID_EventReport_Request = 35414,
        MsgID_EventReport_Response = 35415,
        MsgID_Exchange_UserPoints_Request = 35450,
        MsgID_Exchange_UserPoints_Response = 35451,
        MsgID_Goods_List_Request = 35452,
        MsgID_Goods_List_Response = 35453,
        MsgID_Bank_Details_Query_Request = 35454,
        MsgID_Bank_Details_Query_Response = 35455,
        MsgID_StarInfo_Request = 35458,
        MsgID_StarInfo_Response = 35459,
        MsgID_ReceiveTools_Request = 35460,
        MsgID_ReceiveTools_Response = 35461,
        MsgID_ReceiveTools_Notice = 35462,
        MsgID_Get_Scaler_Quote_Request = 35463,
        MsgID_Get_Scaler_Quote_Response = 35464,
        MsgID_Exchange_Currency_Request = 35465,
        MsgID_Exchange_Currency_Response = 35466,
        MsgID_GetUserMarks_Request = 35467,
        MsgID_GetUserMarks_Response = 35468,
        MsgID_AuthVerify_Request = 35469,
        MsgID_AuthVerify_Response = 35470,
        MsgID_UpdateUserMarks_Request = 35471,
        MsgID_UpdateUserMarks_Reponse = 35472,
        MsgID_BuyinEvent_UsdtChanage_Notice = 35473,
        MsgID_QuickRaise_Request = 35474,
        MsgID_QuickRaise_Response = 35475,
        MsgID_DefaultSetting_Request = 35576,
        MsgID_DefaultSetting_Response = 35577,
        MsgID_StarAllow_Request = 35578,
        MsgID_StarAllow_Response = 35579,
        MsgID_StarWillBegin_Notice = 35580,
        MsgID_UsdtExchange_Config_Notice = 35581,
        MsgID_GetUsdtExchange_Config_Request = 35582,
        MsgID_GetUsdtExchange_Config_Response = 35583,
        MsgID_AddHelpWrap_Notice = 35600,
        MsgID_GetUserHelpWarpList_Request = 35601,
        MsgID_GetUserHelpWarpList_Response = 35602,
        MsgID_LeftHelpCountChange_Notice = 35603,
        MsgID_AddHelper_Request = 35605,
        MsgID_AddHelper_Response = 35606,
        MsgID_GetTotalHistoryAmount_Request = 35607,
        MsgID_GetTotalHistoryAmount_Response = 35608,
        MsgID_UserReceiveHelpWarp_Request = 35609,
        MsgID_UserReceiveHelpWarp_Response = 35610,
        MsgID_UserHelpWarpChange_Notice = 35611,
        MsgID_UserChangeLanguage_Request = 35621,
        MsgID_UserChangeLanguage_Response = 35622,
        MsgId_GetTexasTotalHands_Request = 35623,
        MsgId_GetTexasTotalHands_Response = 35624,
        MsgID_SportsLogin_Request = 35700,
        MsgID_SportsLogin_Response = 35701,
        MsgID_SportsLeave_Request = 35702,
        MsgID_SportsLeave_Response = 35703,
        MsgID_BatchDelRemarks_Request = 35704,
        MsgID_BatchDelRemarks_Response = 35705,
        MsgID_PgLogin_Request = 35706,
        MsgID_PgLogin_Response = 35707,
        MsgID_PgLeave_Request = 35708,
        MsgID_PgLeave_Response = 35709,
        MsgID_PgBonusAndFreeGames_Request = 35710,
        MsgID_PgBonusAndFreeGames_Response = 35711,
        MsgId_KYCVerificationStatus_Request = 35721,
        MsgId_KYCVerificationStatus_Response = 35722,
        MsgId_BlackJackLogin_Request = 35712,
        MsgId_BlackJackLogin_Response = 35713,
        MsgID_OpenCalmDownWindows_Notice = 35726,
        MsgID_CalmDownConfirm_Request = 35727,
        MsgID_CalmDownConfirm_Response = 35728,
        MsgID_CalmDownConfirmResult_Notice = 35729,
        MsgID_MemePoker_Rank_Request = 35801,
        MsgID_MemePoker_Rank_Response = 35802,
        MsgID_MemePoker_PropsList_Request = 35804,
        MsgID_MemePoker_PropsList_Response = 35805,
        MsgID_MemePoker_SearchUser_Request = 35807,
        MsgID_MemePoker_SearchUser_Response = 35808,
        MsgID_MemePoker_PropsLog_Request = 35814,
        MsgID_MemePoker_PropsLog_Response = 35815,
        MsgID_MemePoker_PropsAction_Request = 35817,
        MsgID_MemePoker_PropsAction_Response = 35818,
        MsgID_MemePoker_CoinExchangeShop_Request = 35821,
        MsgID_MemePoker_CoinExchangeShop_Response = 35822,
        MsgID_MemePoker_CoinExchange_Request = 35824,
        MsgID_MemePoker_CoinExchange_Response = 35825,
        MsgID_MemePoker_RechargeGoods_Request = 35827,
        MsgID_MemePoker_RechargeGoods_Response = 35828,
        MsgID_MemePoker_NewPayOrder_Request = 35831,
        MsgID_MemePoker_NewPayOrder_Response = 35832,
        MsgID_MemePoker_PayOrderConfirm_Request = 35833,
        MsgID_MemePoker_PayOrderConfirm_Response = 35834
    }

    enum GameId {
        GameId_Dummy = 0,
        World = 1,
        Texas = 2,
        StarSeat = 3,
        DataServer = 10101,
        CowBoy = 10,
        Allin = 20,
        HumanBoy = 30,
        ZoomTexas = 40,
        ZoomTexasMax = 49,
        VideoCowboy = 50,
        Bet = 60,
        PokerMaster = 70,
        Jackfruit = 80,
        PLO = 90,
        BlMtt = 900,
        Sports = 1000,
        TopMatches = 1001,
        PocketGames = 1010,
        BlackJack = 1020
    }

    enum SpecialCards {
        Cards_Dummy = 0,
        Cards_Zero = 255,
        Cards_Back = 256
    }

    enum ClientType {
        Dummy = 0,
        Normal = 1,
        OverSeas = 2,
        H5 = 3,
        H5OverSeas = 4,
        H5Web = 5,
        H5WebOverSeas = 6,
        H5VietnamLasted = 7,
        H5WebVietnamLasted = 8,
        H5CowboyWeb = 9,
        H5Thailand = 10,
        H5WebThailand = 11,
        H5Arab = 12,
        H5Hindi = 13,
        H5Mempoker = 14,
        PC = 15
    }

    enum LanguageType {
        Chinese = 0,
        English = 1,
        VietNam = 2
    }

    enum EventType {
        EventType_Dummy = 0,
        Favorite = 100,
        JoinRoom = 300,
        LeaveRoom = 301,
        SitDown = 302,
        StandUp = 303,
        Buyin = 304,
        Action = 305,
        BuyInsure = 306,
        Situation = 307,
        SendCardsFun = 308,
        SendChat = 309,
        StayPosition = 310,
        BackPosition = 311,
        ShowCards = 312,
        BuyOut = 313,
        CheckoutAndLeave = 314,
        DefaultFold = 315,
        ForceShowCards = 316,
        AutoWithDraw = 317,
        QuickLeave = 318,
        QuickFold = 319,
        BetAction = 320,
        AutoBet = 321,
        AdvanceAutoBet = 322,
        SendBarrage = 323
    }

    interface IDupLoginNotice {
        error?: (number|null);
    }

    class DupLoginNotice implements IDupLoginNotice {
        constructor(p?: pb.IDupLoginNotice);
        public error: number;
        public static create(properties?: pb.IDupLoginNotice): pb.DupLoginNotice;
        public static encode(m: pb.DupLoginNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DupLoginNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DupLoginNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DupLoginNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DupLoginNotice;
        public static toObject(m: pb.DupLoginNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestLogon {
        version?: (string|null);
        token?: (string|null);
        device_info?: (string|null);
        invitation_code?: (string|null);
        client_type?: (pb.ClientType|null);
        CurrentLanguage?: (string|null);
        os?: (string|null);
        os_version?: (string|null);
    }

    class RequestLogon implements IRequestLogon {
        constructor(p?: pb.IRequestLogon);
        public version: string;
        public token: string;
        public device_info: string;
        public invitation_code: string;
        public client_type: pb.ClientType;
        public CurrentLanguage: string;
        public os: string;
        public os_version: string;
        public static create(properties?: pb.IRequestLogon): pb.RequestLogon;
        public static encode(m: pb.RequestLogon, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestLogon, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestLogon;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestLogon;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestLogon;
        public static toObject(m: pb.RequestLogon, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseLogon {
        error?: (number|null);
        firstClubId?: (number|null);
        firstAlliId?: (number|null);
        swtichList?: (pb.GameId[]|null);
        bl_mtt_status?: (number|null);
        is_help_warp?: (boolean|null);
        blackJackStatus?: (number|null);
        blackJackData?: (pb.BlackJackData|null);
        mttData?: (pb.MttData|null);
    }

    class ResponseLogon implements IResponseLogon {
        constructor(p?: pb.IResponseLogon);
        public error: number;
        public firstClubId: number;
        public firstAlliId: number;
        public swtichList: pb.GameId[];
        public bl_mtt_status: number;
        public is_help_warp: boolean;
        public blackJackStatus: number;
        public blackJackData?: (pb.BlackJackData|null);
        public mttData?: (pb.MttData|null);
        public static create(properties?: pb.IResponseLogon): pb.ResponseLogon;
        public static encode(m: pb.ResponseLogon, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseLogon, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseLogon;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseLogon;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseLogon;
        public static toObject(m: pb.ResponseLogon, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubParams {
        club_name?: (string|null);
        club_area?: (string|null);
        club_icon?: (string|null);
        club_percent?: (number|null);
        create_source?: (number|null);
    }

    class ClubParams implements IClubParams {
        constructor(p?: pb.IClubParams);
        public club_name: string;
        public club_area: string;
        public club_icon: string;
        public club_percent: number;
        public create_source: number;
        public static create(properties?: pb.IClubParams): pb.ClubParams;
        public static encode(m: pb.ClubParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubParams;
        public static toObject(m: pb.ClubParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCreateClub {
        param?: (pb.ClubParams|null);
    }

    class RequestCreateClub implements IRequestCreateClub {
        constructor(p?: pb.IRequestCreateClub);
        public param?: (pb.ClubParams|null);
        public static create(properties?: pb.IRequestCreateClub): pb.RequestCreateClub;
        public static encode(m: pb.RequestCreateClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestCreateClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestCreateClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestCreateClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestCreateClub;
        public static toObject(m: pb.RequestCreateClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCreateClub {
        error?: (number|null);
    }

    class ResponseCreateClub implements IResponseCreateClub {
        constructor(p?: pb.IResponseCreateClub);
        public error: number;
        public static create(properties?: pb.IResponseCreateClub): pb.ResponseCreateClub;
        public static encode(m: pb.ResponseCreateClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseCreateClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseCreateClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseCreateClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseCreateClub;
        public static toObject(m: pb.ResponseCreateClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestClubSnapshotList {
        uid?: (number|null);
    }

    class RequestClubSnapshotList implements IRequestClubSnapshotList {
        constructor(p?: pb.IRequestClubSnapshotList);
        public uid: number;
        public static create(properties?: pb.IRequestClubSnapshotList): pb.RequestClubSnapshotList;
        public static encode(m: pb.RequestClubSnapshotList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestClubSnapshotList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestClubSnapshotList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestClubSnapshotList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestClubSnapshotList;
        public static toObject(m: pb.RequestClubSnapshotList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseClubSnapshotList {
        error?: (number|null);
    }

    class ResponseClubSnapshotList implements IResponseClubSnapshotList {
        constructor(p?: pb.IResponseClubSnapshotList);
        public error: number;
        public static create(properties?: pb.IResponseClubSnapshotList): pb.ResponseClubSnapshotList;
        public static encode(m: pb.ResponseClubSnapshotList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseClubSnapshotList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseClubSnapshotList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseClubSnapshotList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseClubSnapshotList;
        public static toObject(m: pb.ResponseClubSnapshotList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubSnapshotListParams {
        club_id?: (number|null);
        club_name?: (string|null);
        club_area?: (string|null);
        club_icon?: (string|null);
        club_member_max?: (number|null);
        club_member_count?: (number|null);
        club_type?: (number|null);
        club_owner?: (number|null);
        club_descrption?: (string|null);
        club_create_time?: (number|null);
        club_level?: (number|null);
        expire_time?: (number|null);
        is_public_member?: (number|null);
        opened_blindlevels?: (number[]|null);
        is_manager?: (number|null);
        invitation_code?: (string|null);
        InvitationMemberCode?: (string|null);
        has_create_alliance?: (boolean|null);
        is_agree?: (number|null);
        invitation_percent?: (number|null);
        setInvitePercentMark?: (boolean|null);
        has_join_otheralliance?: (boolean|null);
    }

    class ClubSnapshotListParams implements IClubSnapshotListParams {
        constructor(p?: pb.IClubSnapshotListParams);
        public club_id: number;
        public club_name: string;
        public club_area: string;
        public club_icon: string;
        public club_member_max: number;
        public club_member_count: number;
        public club_type: number;
        public club_owner: number;
        public club_descrption: string;
        public club_create_time: number;
        public club_level: number;
        public expire_time: number;
        public is_public_member: number;
        public opened_blindlevels: number[];
        public is_manager: number;
        public invitation_code: string;
        public InvitationMemberCode: string;
        public has_create_alliance: boolean;
        public is_agree: number;
        public invitation_percent: number;
        public setInvitePercentMark: boolean;
        public has_join_otheralliance: boolean;
        public static create(properties?: pb.IClubSnapshotListParams): pb.ClubSnapshotListParams;
        public static encode(m: pb.ClubSnapshotListParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubSnapshotListParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubSnapshotListParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubSnapshotListParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubSnapshotListParams;
        public static toObject(m: pb.ClubSnapshotListParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeClubSnapshotList {
        list?: (pb.ClubSnapshotListParams[]|null);
    }

    class NoticeClubSnapshotList implements INoticeClubSnapshotList {
        constructor(p?: pb.INoticeClubSnapshotList);
        public list: pb.ClubSnapshotListParams[];
        public static create(properties?: pb.INoticeClubSnapshotList): pb.NoticeClubSnapshotList;
        public static encode(m: pb.NoticeClubSnapshotList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeClubSnapshotList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeClubSnapshotList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeClubSnapshotList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeClubSnapshotList;
        public static toObject(m: pb.NoticeClubSnapshotList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinClubParams {
        club_id?: (number|null);
        club_uid?: (number|null);
        club_message?: (string|null);
        apply_time?: (number|null);
    }

    class JoinClubParams implements IJoinClubParams {
        constructor(p?: pb.IJoinClubParams);
        public club_id: number;
        public club_uid: number;
        public club_message: string;
        public apply_time: number;
        public static create(properties?: pb.IJoinClubParams): pb.JoinClubParams;
        public static encode(m: pb.JoinClubParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JoinClubParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JoinClubParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JoinClubParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JoinClubParams;
        public static toObject(m: pb.JoinClubParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJoinClub {
        club_id?: (number|null);
        club_uid?: (number|null);
        club_message?: (string|null);
        invitation_code?: (string|null);
    }

    class RequestJoinClub implements IRequestJoinClub {
        constructor(p?: pb.IRequestJoinClub);
        public club_id: number;
        public club_uid: number;
        public club_message: string;
        public invitation_code: string;
        public static create(properties?: pb.IRequestJoinClub): pb.RequestJoinClub;
        public static encode(m: pb.RequestJoinClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestJoinClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestJoinClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestJoinClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestJoinClub;
        public static toObject(m: pb.RequestJoinClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJoinClub {
        club_id?: (number|null);
        club_uid?: (number|null);
        club_message?: (string|null);
        applicant_name?: (string|null);
        applicant_thumb?: (string|null);
        club_name?: (string|null);
        op_time?: (number|null);
        msg_type?: (number|null);
    }

    class NoticeJoinClub implements INoticeJoinClub {
        constructor(p?: pb.INoticeJoinClub);
        public club_id: number;
        public club_uid: number;
        public club_message: string;
        public applicant_name: string;
        public applicant_thumb: string;
        public club_name: string;
        public op_time: number;
        public msg_type: number;
        public static create(properties?: pb.INoticeJoinClub): pb.NoticeJoinClub;
        public static encode(m: pb.NoticeJoinClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJoinClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJoinClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJoinClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJoinClub;
        public static toObject(m: pb.NoticeJoinClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJoinClubToMember {
        error?: (number|null);
    }

    class ResponseJoinClubToMember implements IResponseJoinClubToMember {
        constructor(p?: pb.IResponseJoinClubToMember);
        public error: number;
        public static create(properties?: pb.IResponseJoinClubToMember): pb.ResponseJoinClubToMember;
        public static encode(m: pb.ResponseJoinClubToMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJoinClubToMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJoinClubToMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJoinClubToMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJoinClubToMember;
        public static toObject(m: pb.ResponseJoinClubToMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJoinClubToAdmin {
        error?: (number|null);
    }

    class ResponseJoinClubToAdmin implements IResponseJoinClubToAdmin {
        constructor(p?: pb.IResponseJoinClubToAdmin);
        public error: number;
        public static create(properties?: pb.IResponseJoinClubToAdmin): pb.ResponseJoinClubToAdmin;
        public static encode(m: pb.ResponseJoinClubToAdmin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJoinClubToAdmin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJoinClubToAdmin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJoinClubToAdmin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJoinClubToAdmin;
        public static toObject(m: pb.ResponseJoinClubToAdmin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJoinClubToMember {
        result?: (number|null);
        club_id?: (number|null);
        uid?: (number|null);
        reason?: (string|null);
        club_name?: (string|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        admin_id?: (number|null);
        operator_id?: (number|null);
        Operator_name?: (string|null);
        is_agree?: (number|null);
        apply_name?: (string|null);
    }

    class NoticeJoinClubToMember implements INoticeJoinClubToMember {
        constructor(p?: pb.INoticeJoinClubToMember);
        public result: number;
        public club_id: number;
        public uid: number;
        public reason: string;
        public club_name: string;
        public op_time: number;
        public msg_type: number;
        public admin_id: number;
        public operator_id: number;
        public Operator_name: string;
        public is_agree: number;
        public apply_name: string;
        public static create(properties?: pb.INoticeJoinClubToMember): pb.NoticeJoinClubToMember;
        public static encode(m: pb.NoticeJoinClubToMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJoinClubToMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJoinClubToMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJoinClubToMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJoinClubToMember;
        public static toObject(m: pb.NoticeJoinClubToMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReplyJoinClub {
        result?: (number|null);
        club_id?: (number|null);
        uid?: (number|null);
        reason?: (string|null);
    }

    class ReplyJoinClub implements IReplyJoinClub {
        constructor(p?: pb.IReplyJoinClub);
        public result: number;
        public club_id: number;
        public uid: number;
        public reason: string;
        public static create(properties?: pb.IReplyJoinClub): pb.ReplyJoinClub;
        public static encode(m: pb.ReplyJoinClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReplyJoinClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReplyJoinClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReplyJoinClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReplyJoinClub;
        public static toObject(m: pb.ReplyJoinClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestLeaveClub {
        param?: (pb.LeaveClubParams|null);
    }

    class RequestLeaveClub implements IRequestLeaveClub {
        constructor(p?: pb.IRequestLeaveClub);
        public param?: (pb.LeaveClubParams|null);
        public static create(properties?: pb.IRequestLeaveClub): pb.RequestLeaveClub;
        public static encode(m: pb.RequestLeaveClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestLeaveClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestLeaveClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestLeaveClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestLeaveClub;
        public static toObject(m: pb.RequestLeaveClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseLeaveClub {
        error?: (number|null);
    }

    class ResponseLeaveClub implements IResponseLeaveClub {
        constructor(p?: pb.IResponseLeaveClub);
        public error: number;
        public static create(properties?: pb.IResponseLeaveClub): pb.ResponseLeaveClub;
        public static encode(m: pb.ResponseLeaveClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseLeaveClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseLeaveClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseLeaveClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseLeaveClub;
        public static toObject(m: pb.ResponseLeaveClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveClubParams {
        club_id?: (number|null);
        club_did?: (number|null);
    }

    class LeaveClubParams implements ILeaveClubParams {
        constructor(p?: pb.ILeaveClubParams);
        public club_id: number;
        public club_did: number;
        public static create(properties?: pb.ILeaveClubParams): pb.LeaveClubParams;
        public static encode(m: pb.LeaveClubParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LeaveClubParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LeaveClubParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LeaveClubParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LeaveClubParams;
        public static toObject(m: pb.LeaveClubParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestClubCurrentBoard {
    }

    class RequestClubCurrentBoard implements IRequestClubCurrentBoard {
        constructor(p?: pb.IRequestClubCurrentBoard);
        public static create(properties?: pb.IRequestClubCurrentBoard): pb.RequestClubCurrentBoard;
        public static encode(m: pb.RequestClubCurrentBoard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestClubCurrentBoard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestClubCurrentBoard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestClubCurrentBoard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestClubCurrentBoard;
        public static toObject(m: pb.RequestClubCurrentBoard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMvpData {
        uid?: (number|null);
        nickname?: (string|null);
        thumb?: (string|null);
        plat?: (number|null);
    }

    class MvpData implements IMvpData {
        constructor(p?: pb.IMvpData);
        public uid: number;
        public nickname: string;
        public thumb: string;
        public plat: number;
        public static create(properties?: pb.IMvpData): pb.MvpData;
        public static encode(m: pb.MvpData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MvpData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MvpData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MvpData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MvpData;
        public static toObject(m: pb.MvpData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarData {
        uid?: (number|null);
        nickname?: (string|null);
        thumb?: (string|null);
        status?: (number|null);
    }

    class StarData implements IStarData {
        constructor(p?: pb.IStarData);
        public uid: number;
        public nickname: string;
        public thumb: string;
        public status: number;
        public static create(properties?: pb.IStarData): pb.StarData;
        public static encode(m: pb.StarData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarData;
        public static toObject(m: pb.StarData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubGameSnapshot {
        create_player_id?: (number|null);
        creator_name?: (string|null);
        club_id?: (number|null);
        game_mode?: (number|null);
        room_name?: (string|null);
        player_count?: (number|null);
        small_blind?: (number|null);
        big_blind?: (number|null);
        buyin_min?: (number|null);
        buyin_max?: (number|null);
        create_time?: (number|null);
        buyin_control?: (boolean|null);
        insurance?: (boolean|null);
        anti_cheating?: (boolean|null);
        straddle?: (boolean|null);
        rand_seat?: (boolean|null);
        ante?: (number|null);
        player_count_max?: (number|null);
        owner_type?: (number|null);
        pic_path?: (string|null);
        club_name?: (string|null);
        rule_time_limit?: (number|null);
        room_id?: (number|null);
        game_status?: (number|null);
        start_time?: (number|null);
        jackpot_isopen?: (boolean|null);
        is_allin_allfold?: (boolean|null);
        extra_time?: (number|null);
        is_opened_drawback?: (boolean|null);
        short_fullhouse_flush_straight_three?: (boolean|null);
        is_force_showcard?: (boolean|null);
        room_type?: (number|null);
        has_buyin?: (number|null);
        join_password?: (string|null);
        buyin_password?: (string|null);
        is_mirco?: (number|null);
        left_seatnum?: (number|null);
        anti_simulator?: (boolean|null);
        game_id?: (number|null);
        allinRate?: (number|null);
        hasEndTime?: (boolean|null);
        showForClients?: (number[]|null);
        isCriticismField?: (boolean|null);
        minCritProb?: (number|null);
        maxCritProb?: (number|null);
        critNeedMoney?: (number|null);
        anti_simulator_ignore_cond?: (number|null);
        manual_created?: (number|null);
        mvp_data?: (pb.MvpData|null);
        minimum_amount?: (number|null);
        IscalcIncomePerhand?: (boolean|null);
        plats?: (number[]|null);
        starData?: (pb.StarData[]|null);
        bystanderNum?: (number|null);
        notifyTime?: (number|null);
        proDatas?: (pb.ProDatas[]|null);
        proLevel?: (number|null);
        curLevel?: (number|null);
        currencyType?: (number|null);
    }

    class ClubGameSnapshot implements IClubGameSnapshot {
        constructor(p?: pb.IClubGameSnapshot);
        public create_player_id: number;
        public creator_name: string;
        public club_id: number;
        public game_mode: number;
        public room_name: string;
        public player_count: number;
        public small_blind: number;
        public big_blind: number;
        public buyin_min: number;
        public buyin_max: number;
        public create_time: number;
        public buyin_control: boolean;
        public insurance: boolean;
        public anti_cheating: boolean;
        public straddle: boolean;
        public rand_seat: boolean;
        public ante: number;
        public player_count_max: number;
        public owner_type: number;
        public pic_path: string;
        public club_name: string;
        public rule_time_limit: number;
        public room_id: number;
        public game_status: number;
        public start_time: number;
        public jackpot_isopen: boolean;
        public is_allin_allfold: boolean;
        public extra_time: number;
        public is_opened_drawback: boolean;
        public short_fullhouse_flush_straight_three: boolean;
        public is_force_showcard: boolean;
        public room_type: number;
        public has_buyin: number;
        public join_password: string;
        public buyin_password: string;
        public is_mirco: number;
        public left_seatnum: number;
        public anti_simulator: boolean;
        public game_id: number;
        public allinRate: number;
        public hasEndTime: boolean;
        public showForClients: number[];
        public isCriticismField: boolean;
        public minCritProb: number;
        public maxCritProb: number;
        public critNeedMoney: number;
        public anti_simulator_ignore_cond: number;
        public manual_created: number;
        public mvp_data?: (pb.MvpData|null);
        public minimum_amount: number;
        public IscalcIncomePerhand: boolean;
        public plats: number[];
        public starData: pb.StarData[];
        public bystanderNum: number;
        public notifyTime: number;
        public proDatas: pb.ProDatas[];
        public proLevel: number;
        public curLevel: number;
        public currencyType: number;
        public static create(properties?: pb.IClubGameSnapshot): pb.ClubGameSnapshot;
        public static encode(m: pb.ClubGameSnapshot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubGameSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubGameSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubGameSnapshot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubGameSnapshot;
        public static toObject(m: pb.ClubGameSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IProDatas {
        levelLimit?: (number|null);
        nowNum?: (number|null);
        tableLevel?: (number|null);
    }

    class ProDatas implements IProDatas {
        constructor(p?: pb.IProDatas);
        public levelLimit: number;
        public nowNum: number;
        public tableLevel: number;
        public static create(properties?: pb.IProDatas): pb.ProDatas;
        public static encode(m: pb.ProDatas, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ProDatas, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ProDatas;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ProDatas;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ProDatas;
        public static toObject(m: pb.ProDatas, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseClubCurrentBoard {
        error?: (number|null);
    }

    class ResponseClubCurrentBoard implements IResponseClubCurrentBoard {
        constructor(p?: pb.IResponseClubCurrentBoard);
        public error: number;
        public static create(properties?: pb.IResponseClubCurrentBoard): pb.ResponseClubCurrentBoard;
        public static encode(m: pb.ResponseClubCurrentBoard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseClubCurrentBoard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseClubCurrentBoard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseClubCurrentBoard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseClubCurrentBoard;
        public static toObject(m: pb.ResponseClubCurrentBoard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeClubCurrentBoard {
        list?: (pb.ClubGameSnapshot[]|null);
        total?: (number|null);
        page?: (number|null);
    }

    class NoticeClubCurrentBoard implements INoticeClubCurrentBoard {
        constructor(p?: pb.INoticeClubCurrentBoard);
        public list: pb.ClubGameSnapshot[];
        public total: number;
        public page: number;
        public static create(properties?: pb.INoticeClubCurrentBoard): pb.NoticeClubCurrentBoard;
        public static encode(m: pb.NoticeClubCurrentBoard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeClubCurrentBoard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeClubCurrentBoard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeClubCurrentBoard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeClubCurrentBoard;
        public static toObject(m: pb.NoticeClubCurrentBoard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubMemberSnapshotListParams {
        club_id?: (number|null);
        club_uid?: (number|null);
        pull_pos?: (number|null);
        pull_count?: (number|null);
    }

    class ClubMemberSnapshotListParams implements IClubMemberSnapshotListParams {
        constructor(p?: pb.IClubMemberSnapshotListParams);
        public club_id: number;
        public club_uid: number;
        public pull_pos: number;
        public pull_count: number;
        public static create(properties?: pb.IClubMemberSnapshotListParams): pb.ClubMemberSnapshotListParams;
        public static encode(m: pb.ClubMemberSnapshotListParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubMemberSnapshotListParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubMemberSnapshotListParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubMemberSnapshotListParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubMemberSnapshotListParams;
        public static toObject(m: pb.ClubMemberSnapshotListParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestClubMemberSnapshotList {
        param?: (pb.ClubMemberSnapshotListParams|null);
    }

    class RequestClubMemberSnapshotList implements IRequestClubMemberSnapshotList {
        constructor(p?: pb.IRequestClubMemberSnapshotList);
        public param?: (pb.ClubMemberSnapshotListParams|null);
        public static create(properties?: pb.IRequestClubMemberSnapshotList): pb.RequestClubMemberSnapshotList;
        public static encode(m: pb.RequestClubMemberSnapshotList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestClubMemberSnapshotList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestClubMemberSnapshotList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestClubMemberSnapshotList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestClubMemberSnapshotList;
        public static toObject(m: pb.RequestClubMemberSnapshotList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseClubMemberSnapshotList {
        error?: (number|null);
    }

    class ResponseClubMemberSnapshotList implements IResponseClubMemberSnapshotList {
        constructor(p?: pb.IResponseClubMemberSnapshotList);
        public error: number;
        public static create(properties?: pb.IResponseClubMemberSnapshotList): pb.ResponseClubMemberSnapshotList;
        public static encode(m: pb.ResponseClubMemberSnapshotList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseClubMemberSnapshotList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseClubMemberSnapshotList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseClubMemberSnapshotList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseClubMemberSnapshotList;
        public static toObject(m: pb.ResponseClubMemberSnapshotList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubMemberSnapshot {
        member_uid?: (number|null);
        member_icon?: (string|null);
        member_name?: (string|null);
        club_member_active?: (number|null);
        total_member_active?: (number|null);
        member_last_login_time?: (number|null);
        member_auth?: (number|null);
        user_gold?: (number|null);
        is_online?: (boolean|null);
    }

    class ClubMemberSnapshot implements IClubMemberSnapshot {
        constructor(p?: pb.IClubMemberSnapshot);
        public member_uid: number;
        public member_icon: string;
        public member_name: string;
        public club_member_active: number;
        public total_member_active: number;
        public member_last_login_time: number;
        public member_auth: number;
        public user_gold: number;
        public is_online: boolean;
        public static create(properties?: pb.IClubMemberSnapshot): pb.ClubMemberSnapshot;
        public static encode(m: pb.ClubMemberSnapshot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubMemberSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubMemberSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubMemberSnapshot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubMemberSnapshot;
        public static toObject(m: pb.ClubMemberSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeClubMemberSnapshotList {
        snapshots?: (pb.ClubMemberSnapshot[]|null);
        total_count?: (number|null);
        last_inc_id?: (number|null);
    }

    class NoticeClubMemberSnapshotList implements INoticeClubMemberSnapshotList {
        constructor(p?: pb.INoticeClubMemberSnapshotList);
        public snapshots: pb.ClubMemberSnapshot[];
        public total_count: number;
        public last_inc_id: number;
        public static create(properties?: pb.INoticeClubMemberSnapshotList): pb.NoticeClubMemberSnapshotList;
        public static encode(m: pb.NoticeClubMemberSnapshotList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeClubMemberSnapshotList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeClubMemberSnapshotList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeClubMemberSnapshotList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeClubMemberSnapshotList;
        public static toObject(m: pb.NoticeClubMemberSnapshotList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IModifyClubMemberParams {
        club_id?: (number|null);
        club_uid?: (number|null);
        target_id?: (number|null);
        action_type?: (number|null);
        rec_type?: (boolean|null);
    }

    class ModifyClubMemberParams implements IModifyClubMemberParams {
        constructor(p?: pb.IModifyClubMemberParams);
        public club_id: number;
        public club_uid: number;
        public target_id: number;
        public action_type: number;
        public rec_type: boolean;
        public static create(properties?: pb.IModifyClubMemberParams): pb.ModifyClubMemberParams;
        public static encode(m: pb.ModifyClubMemberParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ModifyClubMemberParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ModifyClubMemberParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ModifyClubMemberParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ModifyClubMemberParams;
        public static toObject(m: pb.ModifyClubMemberParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestModifyClubMember {
        param?: (pb.ModifyClubMemberParams|null);
    }

    class RequestModifyClubMember implements IRequestModifyClubMember {
        constructor(p?: pb.IRequestModifyClubMember);
        public param?: (pb.ModifyClubMemberParams|null);
        public static create(properties?: pb.IRequestModifyClubMember): pb.RequestModifyClubMember;
        public static encode(m: pb.RequestModifyClubMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestModifyClubMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestModifyClubMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestModifyClubMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestModifyClubMember;
        public static toObject(m: pb.RequestModifyClubMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseModifyClubMember {
        error?: (number|null);
    }

    class ResponseModifyClubMember implements IResponseModifyClubMember {
        constructor(p?: pb.IResponseModifyClubMember);
        public error: number;
        public static create(properties?: pb.IResponseModifyClubMember): pb.ResponseModifyClubMember;
        public static encode(m: pb.ResponseModifyClubMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseModifyClubMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseModifyClubMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseModifyClubMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseModifyClubMember;
        public static toObject(m: pb.ResponseModifyClubMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeModifyClubMember {
        action_type?: (number|null);
        club_id?: (number|null);
        club_name?: (string|null);
        target_player_id?: (number|null);
        target_player_name?: (string|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        member_inc_id?: (number|null);
        operator_player_id?: (number|null);
    }

    class NoticeModifyClubMember implements INoticeModifyClubMember {
        constructor(p?: pb.INoticeModifyClubMember);
        public action_type: number;
        public club_id: number;
        public club_name: string;
        public target_player_id: number;
        public target_player_name: string;
        public op_time: number;
        public msg_type: number;
        public member_inc_id: number;
        public operator_player_id: number;
        public static create(properties?: pb.INoticeModifyClubMember): pb.NoticeModifyClubMember;
        public static encode(m: pb.NoticeModifyClubMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeModifyClubMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeModifyClubMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeModifyClubMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeModifyClubMember;
        public static toObject(m: pb.NoticeModifyClubMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IModifyClubInfoParams {
        club_id?: (number|null);
        club_uid?: (number|null);
        club_name?: (string|null);
        club_descrption?: (string|null);
        action_type?: (number|null);
    }

    class ModifyClubInfoParams implements IModifyClubInfoParams {
        constructor(p?: pb.IModifyClubInfoParams);
        public club_id: number;
        public club_uid: number;
        public club_name: string;
        public club_descrption: string;
        public action_type: number;
        public static create(properties?: pb.IModifyClubInfoParams): pb.ModifyClubInfoParams;
        public static encode(m: pb.ModifyClubInfoParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ModifyClubInfoParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ModifyClubInfoParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ModifyClubInfoParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ModifyClubInfoParams;
        public static toObject(m: pb.ModifyClubInfoParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestModifyClubInfo {
        param?: (pb.ModifyClubInfoParams|null);
    }

    class RequestModifyClubInfo implements IRequestModifyClubInfo {
        constructor(p?: pb.IRequestModifyClubInfo);
        public param?: (pb.ModifyClubInfoParams|null);
        public static create(properties?: pb.IRequestModifyClubInfo): pb.RequestModifyClubInfo;
        public static encode(m: pb.RequestModifyClubInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestModifyClubInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestModifyClubInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestModifyClubInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestModifyClubInfo;
        public static toObject(m: pb.RequestModifyClubInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseModifyClubInfo {
        error?: (number|null);
    }

    class ResponseModifyClubInfo implements IResponseModifyClubInfo {
        constructor(p?: pb.IResponseModifyClubInfo);
        public error: number;
        public static create(properties?: pb.IResponseModifyClubInfo): pb.ResponseModifyClubInfo;
        public static encode(m: pb.ResponseModifyClubInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseModifyClubInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseModifyClubInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseModifyClubInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseModifyClubInfo;
        public static toObject(m: pb.ResponseModifyClubInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGrantClubFundParams {
        club_id?: (number|null);
        club_uid?: (number|null);
        target_id?: (number|null);
        amount?: (number|null);
    }

    class GrantClubFundParams implements IGrantClubFundParams {
        constructor(p?: pb.IGrantClubFundParams);
        public club_id: number;
        public club_uid: number;
        public target_id: number;
        public amount: number;
        public static create(properties?: pb.IGrantClubFundParams): pb.GrantClubFundParams;
        public static encode(m: pb.GrantClubFundParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GrantClubFundParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GrantClubFundParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GrantClubFundParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GrantClubFundParams;
        public static toObject(m: pb.GrantClubFundParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGrantClubFund {
        param?: (pb.GrantClubFundParams|null);
    }

    class RequestGrantClubFund implements IRequestGrantClubFund {
        constructor(p?: pb.IRequestGrantClubFund);
        public param?: (pb.GrantClubFundParams|null);
        public static create(properties?: pb.IRequestGrantClubFund): pb.RequestGrantClubFund;
        public static encode(m: pb.RequestGrantClubFund, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGrantClubFund, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGrantClubFund;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGrantClubFund;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGrantClubFund;
        public static toObject(m: pb.RequestGrantClubFund, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGrantClubFund {
        error?: (number|null);
    }

    class ResponseGrantClubFund implements IResponseGrantClubFund {
        constructor(p?: pb.IResponseGrantClubFund);
        public error: number;
        public static create(properties?: pb.IResponseGrantClubFund): pb.ResponseGrantClubFund;
        public static encode(m: pb.ResponseGrantClubFund, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGrantClubFund, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGrantClubFund;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGrantClubFund;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGrantClubFund;
        public static toObject(m: pb.ResponseGrantClubFund, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSearchClubInfo {
        club_id?: (number|null);
    }

    class RequestSearchClubInfo implements IRequestSearchClubInfo {
        constructor(p?: pb.IRequestSearchClubInfo);
        public club_id: number;
        public static create(properties?: pb.IRequestSearchClubInfo): pb.RequestSearchClubInfo;
        public static encode(m: pb.RequestSearchClubInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSearchClubInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSearchClubInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSearchClubInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSearchClubInfo;
        public static toObject(m: pb.RequestSearchClubInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSearchClubInfo {
        error?: (number|null);
    }

    class ResponseSearchClubInfo implements IResponseSearchClubInfo {
        constructor(p?: pb.IResponseSearchClubInfo);
        public error: number;
        public static create(properties?: pb.IResponseSearchClubInfo): pb.ResponseSearchClubInfo;
        public static encode(m: pb.ResponseSearchClubInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSearchClubInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSearchClubInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSearchClubInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSearchClubInfo;
        public static toObject(m: pb.ResponseSearchClubInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSearchClubInfo {
        snapshots?: (pb.ClubSnapshotListParams|null);
    }

    class NoticeSearchClubInfo implements INoticeSearchClubInfo {
        constructor(p?: pb.INoticeSearchClubInfo);
        public snapshots?: (pb.ClubSnapshotListParams|null);
        public static create(properties?: pb.INoticeSearchClubInfo): pb.NoticeSearchClubInfo;
        public static encode(m: pb.NoticeSearchClubInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeSearchClubInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeSearchClubInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeSearchClubInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeSearchClubInfo;
        public static toObject(m: pb.NoticeSearchClubInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestClubCreaterInfo {
        club_id?: (number|null);
    }

    class RequestClubCreaterInfo implements IRequestClubCreaterInfo {
        constructor(p?: pb.IRequestClubCreaterInfo);
        public club_id: number;
        public static create(properties?: pb.IRequestClubCreaterInfo): pb.RequestClubCreaterInfo;
        public static encode(m: pb.RequestClubCreaterInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestClubCreaterInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestClubCreaterInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestClubCreaterInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestClubCreaterInfo;
        public static toObject(m: pb.RequestClubCreaterInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseClubCreaterInfo {
        error?: (number|null);
    }

    class ResponseClubCreaterInfo implements IResponseClubCreaterInfo {
        constructor(p?: pb.IResponseClubCreaterInfo);
        public error: number;
        public static create(properties?: pb.IResponseClubCreaterInfo): pb.ResponseClubCreaterInfo;
        public static encode(m: pb.ResponseClubCreaterInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseClubCreaterInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseClubCreaterInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseClubCreaterInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseClubCreaterInfo;
        public static toObject(m: pb.ResponseClubCreaterInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeClubCreaterInfo {
        create_player_name?: (string|null);
        create_player_thumb?: (string|null);
    }

    class NoticeClubCreaterInfo implements INoticeClubCreaterInfo {
        constructor(p?: pb.INoticeClubCreaterInfo);
        public create_player_name: string;
        public create_player_thumb: string;
        public static create(properties?: pb.INoticeClubCreaterInfo): pb.NoticeClubCreaterInfo;
        public static encode(m: pb.NoticeClubCreaterInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeClubCreaterInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeClubCreaterInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeClubCreaterInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeClubCreaterInfo;
        public static toObject(m: pb.NoticeClubCreaterInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePurchaseClubLevel {
        expire_time?: (number|null);
    }

    class NoticePurchaseClubLevel implements INoticePurchaseClubLevel {
        constructor(p?: pb.INoticePurchaseClubLevel);
        public expire_time: number;
        public static create(properties?: pb.INoticePurchaseClubLevel): pb.NoticePurchaseClubLevel;
        public static encode(m: pb.NoticePurchaseClubLevel, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticePurchaseClubLevel, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticePurchaseClubLevel;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticePurchaseClubLevel;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticePurchaseClubLevel;
        public static toObject(m: pb.NoticePurchaseClubLevel, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSendMsg {
        club_id?: (number|null);
        msg?: (string|null);
    }

    class RequestSendMsg implements IRequestSendMsg {
        constructor(p?: pb.IRequestSendMsg);
        public club_id: number;
        public msg: string;
        public static create(properties?: pb.IRequestSendMsg): pb.RequestSendMsg;
        public static encode(m: pb.RequestSendMsg, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSendMsg, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSendMsg;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSendMsg;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSendMsg;
        public static toObject(m: pb.RequestSendMsg, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSendMsg {
        error?: (number|null);
    }

    class ResponseSendMsg implements IResponseSendMsg {
        constructor(p?: pb.IResponseSendMsg);
        public error: number;
        public static create(properties?: pb.IResponseSendMsg): pb.ResponseSendMsg;
        public static encode(m: pb.ResponseSendMsg, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSendMsg, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSendMsg;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSendMsg;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSendMsg;
        public static toObject(m: pb.ResponseSendMsg, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSendMsg {
        club_id?: (number|null);
        user_id?: (number|null);
        chat_time?: (number|null);
        player_name?: (string|null);
        player_icon?: (string|null);
        msg?: (string|null);
    }

    class NoticeSendMsg implements INoticeSendMsg {
        constructor(p?: pb.INoticeSendMsg);
        public club_id: number;
        public user_id: number;
        public chat_time: number;
        public player_name: string;
        public player_icon: string;
        public msg: string;
        public static create(properties?: pb.INoticeSendMsg): pb.NoticeSendMsg;
        public static encode(m: pb.NoticeSendMsg, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeSendMsg, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeSendMsg;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeSendMsg;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeSendMsg;
        public static toObject(m: pb.NoticeSendMsg, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetUserData {
        user_id?: (number|null);
    }

    class RequestGetUserData implements IRequestGetUserData {
        constructor(p?: pb.IRequestGetUserData);
        public user_id: number;
        public static create(properties?: pb.IRequestGetUserData): pb.RequestGetUserData;
        public static encode(m: pb.RequestGetUserData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetUserData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetUserData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetUserData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetUserData;
        public static toObject(m: pb.RequestGetUserData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetUserData {
        error?: (number|null);
    }

    class ResponseGetUserData implements IResponseGetUserData {
        constructor(p?: pb.IResponseGetUserData);
        public error: number;
        public static create(properties?: pb.IResponseGetUserData): pb.ResponseGetUserData;
        public static encode(m: pb.ResponseGetUserData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetUserData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetUserData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetUserData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetUserData;
        public static toObject(m: pb.ResponseGetUserData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetUserData {
        mobile?: (string|null);
        nick_name?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        user_gold?: (number|null);
        clubs_max?: (number|null);
        current_clubs?: (number|null);
        user_marks?: (string|null);
        user_id?: (number|null);
        card_type?: (number|null);
        deposit_gold?: (number|null);
        game_coin?: (number|null);
        user_points?: (number|null);
        ratio?: (number|null);
        total_amount?: (number|null);
        usdt?: (number|null);
        deposit_usdt?: (number|null);
        areaCode?: (string|null);
        mobile2?: (string|null);
        system_time?: (number|null);
        calm_down_deadline_time?: (number|null);
        diamond?: (number|null);
    }

    class NoticeGetUserData implements INoticeGetUserData {
        constructor(p?: pb.INoticeGetUserData);
        public mobile: string;
        public nick_name: string;
        public avatar: string;
        public gender: number;
        public user_gold: number;
        public clubs_max: number;
        public current_clubs: number;
        public user_marks: string;
        public user_id: number;
        public card_type: number;
        public deposit_gold: number;
        public game_coin: number;
        public user_points: number;
        public ratio: number;
        public total_amount: number;
        public usdt: number;
        public deposit_usdt: number;
        public areaCode: string;
        public mobile2: string;
        public system_time: number;
        public calm_down_deadline_time: number;
        public diamond: number;
        public static create(properties?: pb.INoticeGetUserData): pb.NoticeGetUserData;
        public static encode(m: pb.NoticeGetUserData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGetUserData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGetUserData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGetUserData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGetUserData;
        public static toObject(m: pb.NoticeGetUserData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetJackpotData {
        club_id?: (number|null);
        room_id?: (number|null);
    }

    class RequestGetJackpotData implements IRequestGetJackpotData {
        constructor(p?: pb.IRequestGetJackpotData);
        public club_id: number;
        public room_id: number;
        public static create(properties?: pb.IRequestGetJackpotData): pb.RequestGetJackpotData;
        public static encode(m: pb.RequestGetJackpotData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetJackpotData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetJackpotData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetJackpotData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetJackpotData;
        public static toObject(m: pb.RequestGetJackpotData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetJackpotData {
        error?: (number|null);
    }

    class ResponseGetJackpotData implements IResponseGetJackpotData {
        constructor(p?: pb.IResponseGetJackpotData);
        public error: number;
        public static create(properties?: pb.IResponseGetJackpotData): pb.ResponseGetJackpotData;
        public static encode(m: pb.ResponseGetJackpotData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetJackpotData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetJackpotData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetJackpotData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetJackpotData;
        public static toObject(m: pb.ResponseGetJackpotData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpot {
        amount?: (number|null);
        blind_level?: (number|null);
    }

    class Jackpot implements IJackpot {
        constructor(p?: pb.IJackpot);
        public amount: number;
        public blind_level: number;
        public static create(properties?: pb.IJackpot): pb.Jackpot;
        public static encode(m: pb.Jackpot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.Jackpot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.Jackpot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Jackpot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.Jackpot;
        public static toObject(m: pb.Jackpot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetJackpotData {
        club_id?: (number|null);
        club_name?: (string|null);
        club_avatar?: (string|null);
        club_area?: (string|null);
        jackpots?: (pb.Jackpot[]|null);
    }

    class NoticeGetJackpotData implements INoticeGetJackpotData {
        constructor(p?: pb.INoticeGetJackpotData);
        public club_id: number;
        public club_name: string;
        public club_avatar: string;
        public club_area: string;
        public jackpots: pb.Jackpot[];
        public static create(properties?: pb.INoticeGetJackpotData): pb.NoticeGetJackpotData;
        public static encode(m: pb.NoticeGetJackpotData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGetJackpotData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGetJackpotData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGetJackpotData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGetJackpotData;
        public static toObject(m: pb.NoticeGetJackpotData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJackpotSetting {
        club_id?: (number|null);
    }

    class RequestJackpotSetting implements IRequestJackpotSetting {
        constructor(p?: pb.IRequestJackpotSetting);
        public club_id: number;
        public static create(properties?: pb.IRequestJackpotSetting): pb.RequestJackpotSetting;
        public static encode(m: pb.RequestJackpotSetting, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestJackpotSetting, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestJackpotSetting;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestJackpotSetting;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestJackpotSetting;
        public static toObject(m: pb.RequestJackpotSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJackpotSetting {
        error?: (number|null);
    }

    class ResponseJackpotSetting implements IResponseJackpotSetting {
        constructor(p?: pb.IResponseJackpotSetting);
        public error: number;
        public static create(properties?: pb.IResponseJackpotSetting): pb.ResponseJackpotSetting;
        public static encode(m: pb.ResponseJackpotSetting, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJackpotSetting, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJackpotSetting;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJackpotSetting;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJackpotSetting;
        public static toObject(m: pb.ResponseJackpotSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotInfo {
        amount?: (number|null);
        blind_level?: (number|null);
        profit_scale?: (number|null);
        drawin_amount?: (number|null);
    }

    class JackpotInfo implements IJackpotInfo {
        constructor(p?: pb.IJackpotInfo);
        public amount: number;
        public blind_level: number;
        public profit_scale: number;
        public drawin_amount: number;
        public static create(properties?: pb.IJackpotInfo): pb.JackpotInfo;
        public static encode(m: pb.JackpotInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JackpotInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JackpotInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JackpotInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JackpotInfo;
        public static toObject(m: pb.JackpotInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAwardType {
        hand_level?: (number|null);
        award_percent?: (number|null);
    }

    class AwardType implements IAwardType {
        constructor(p?: pb.IAwardType);
        public hand_level: number;
        public award_percent: number;
        public static create(properties?: pb.IAwardType): pb.AwardType;
        public static encode(m: pb.AwardType, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AwardType, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AwardType;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AwardType;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AwardType;
        public static toObject(m: pb.AwardType, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJackpotSetting {
        club_id?: (number|null);
        jackpots?: (pb.JackpotInfo[]|null);
        awardTypes?: (pb.AwardType[]|null);
        award2club_percent?: (number|null);
    }

    class NoticeJackpotSetting implements INoticeJackpotSetting {
        constructor(p?: pb.INoticeJackpotSetting);
        public club_id: number;
        public jackpots: pb.JackpotInfo[];
        public awardTypes: pb.AwardType[];
        public award2club_percent: number;
        public static create(properties?: pb.INoticeJackpotSetting): pb.NoticeJackpotSetting;
        public static encode(m: pb.NoticeJackpotSetting, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJackpotSetting, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJackpotSetting;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJackpotSetting;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJackpotSetting;
        public static toObject(m: pb.NoticeJackpotSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSetJackpot {
        club_id?: (number|null);
        jackpots?: (pb.JackpotInfo[]|null);
        awardTypes?: (pb.AwardType[]|null);
        award2club_percent?: (number|null);
    }

    class RequestSetJackpot implements IRequestSetJackpot {
        constructor(p?: pb.IRequestSetJackpot);
        public club_id: number;
        public jackpots: pb.JackpotInfo[];
        public awardTypes: pb.AwardType[];
        public award2club_percent: number;
        public static create(properties?: pb.IRequestSetJackpot): pb.RequestSetJackpot;
        public static encode(m: pb.RequestSetJackpot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSetJackpot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSetJackpot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSetJackpot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSetJackpot;
        public static toObject(m: pb.RequestSetJackpot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSetJackpot {
        error?: (number|null);
    }

    class ResponseSetJackpot implements IResponseSetJackpot {
        constructor(p?: pb.IResponseSetJackpot);
        public error: number;
        public static create(properties?: pb.IResponseSetJackpot): pb.ResponseSetJackpot;
        public static encode(m: pb.ResponseSetJackpot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSetJackpot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSetJackpot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSetJackpot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSetJackpot;
        public static toObject(m: pb.ResponseSetJackpot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestRecoverJackpotSetting {
        club_id?: (number|null);
    }

    class RequestRecoverJackpotSetting implements IRequestRecoverJackpotSetting {
        constructor(p?: pb.IRequestRecoverJackpotSetting);
        public club_id: number;
        public static create(properties?: pb.IRequestRecoverJackpotSetting): pb.RequestRecoverJackpotSetting;
        public static encode(m: pb.RequestRecoverJackpotSetting, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestRecoverJackpotSetting, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestRecoverJackpotSetting;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestRecoverJackpotSetting;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestRecoverJackpotSetting;
        public static toObject(m: pb.RequestRecoverJackpotSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseRecoverJackpotSetting {
        error?: (number|null);
    }

    class ResponseRecoverJackpotSetting implements IResponseRecoverJackpotSetting {
        constructor(p?: pb.IResponseRecoverJackpotSetting);
        public error: number;
        public static create(properties?: pb.IResponseRecoverJackpotSetting): pb.ResponseRecoverJackpotSetting;
        public static encode(m: pb.ResponseRecoverJackpotSetting, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseRecoverJackpotSetting, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseRecoverJackpotSetting;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseRecoverJackpotSetting;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseRecoverJackpotSetting;
        public static toObject(m: pb.ResponseRecoverJackpotSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJackpotAmout {
        club_id?: (number|null);
        blind_level?: (number|null);
        prev_amount?: (number|null);
        current_amout?: (number|null);
    }

    class NoticeJackpotAmout implements INoticeJackpotAmout {
        constructor(p?: pb.INoticeJackpotAmout);
        public club_id: number;
        public blind_level: number;
        public prev_amount: number;
        public current_amout: number;
        public static create(properties?: pb.INoticeJackpotAmout): pb.NoticeJackpotAmout;
        public static encode(m: pb.NoticeJackpotAmout, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJackpotAmout, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJackpotAmout;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJackpotAmout;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJackpotAmout;
        public static toObject(m: pb.NoticeJackpotAmout, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCurrentRoomJackpot {
        club_id?: (number|null);
        blind_level?: (number|null);
        room_id?: (number|null);
    }

    class RequestCurrentRoomJackpot implements IRequestCurrentRoomJackpot {
        constructor(p?: pb.IRequestCurrentRoomJackpot);
        public club_id: number;
        public blind_level: number;
        public room_id: number;
        public static create(properties?: pb.IRequestCurrentRoomJackpot): pb.RequestCurrentRoomJackpot;
        public static encode(m: pb.RequestCurrentRoomJackpot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestCurrentRoomJackpot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestCurrentRoomJackpot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestCurrentRoomJackpot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestCurrentRoomJackpot;
        public static toObject(m: pb.RequestCurrentRoomJackpot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCurrentRoomJackpot {
        error?: (number|null);
    }

    class ResponseCurrentRoomJackpot implements IResponseCurrentRoomJackpot {
        constructor(p?: pb.IResponseCurrentRoomJackpot);
        public error: number;
        public static create(properties?: pb.IResponseCurrentRoomJackpot): pb.ResponseCurrentRoomJackpot;
        public static encode(m: pb.ResponseCurrentRoomJackpot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseCurrentRoomJackpot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseCurrentRoomJackpot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseCurrentRoomJackpot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseCurrentRoomJackpot;
        public static toObject(m: pb.ResponseCurrentRoomJackpot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCurrentRoomJackpot {
        profit_scale?: (number|null);
        drawin_amount?: (number|null);
        awardTypes?: (pb.AwardType[]|null);
    }

    class NoticeCurrentRoomJackpot implements INoticeCurrentRoomJackpot {
        constructor(p?: pb.INoticeCurrentRoomJackpot);
        public profit_scale: number;
        public drawin_amount: number;
        public awardTypes: pb.AwardType[];
        public static create(properties?: pb.INoticeCurrentRoomJackpot): pb.NoticeCurrentRoomJackpot;
        public static encode(m: pb.NoticeCurrentRoomJackpot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeCurrentRoomJackpot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeCurrentRoomJackpot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeCurrentRoomJackpot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeCurrentRoomJackpot;
        public static toObject(m: pb.NoticeCurrentRoomJackpot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJackpotAwardRecord {
        club_id?: (number|null);
        blind_level?: (number|null);
        room_id?: (number|null);
    }

    class RequestJackpotAwardRecord implements IRequestJackpotAwardRecord {
        constructor(p?: pb.IRequestJackpotAwardRecord);
        public club_id: number;
        public blind_level: number;
        public room_id: number;
        public static create(properties?: pb.IRequestJackpotAwardRecord): pb.RequestJackpotAwardRecord;
        public static encode(m: pb.RequestJackpotAwardRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestJackpotAwardRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestJackpotAwardRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestJackpotAwardRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestJackpotAwardRecord;
        public static toObject(m: pb.RequestJackpotAwardRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJackpotAwardRecord {
        error?: (number|null);
    }

    class ResponseJackpotAwardRecord implements IResponseJackpotAwardRecord {
        constructor(p?: pb.IResponseJackpotAwardRecord);
        public error: number;
        public static create(properties?: pb.IResponseJackpotAwardRecord): pb.ResponseJackpotAwardRecord;
        public static encode(m: pb.ResponseJackpotAwardRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJackpotAwardRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJackpotAwardRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJackpotAwardRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJackpotAwardRecord;
        public static toObject(m: pb.ResponseJackpotAwardRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAwardInfo {
        player_id?: (number|null);
        hand_level?: (number|null);
        award_amount?: (number|null);
        award_time?: (number|null);
        player_name?: (string|null);
    }

    class AwardInfo implements IAwardInfo {
        constructor(p?: pb.IAwardInfo);
        public player_id: number;
        public hand_level: number;
        public award_amount: number;
        public award_time: number;
        public player_name: string;
        public static create(properties?: pb.IAwardInfo): pb.AwardInfo;
        public static encode(m: pb.AwardInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AwardInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AwardInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AwardInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AwardInfo;
        public static toObject(m: pb.AwardInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJackpotAwardRecord {
        club_id?: (number|null);
        luckDog?: (pb.AwardInfo|null);
        awardInfos?: (pb.AwardInfo[]|null);
    }

    class NoticeJackpotAwardRecord implements INoticeJackpotAwardRecord {
        constructor(p?: pb.INoticeJackpotAwardRecord);
        public club_id: number;
        public luckDog?: (pb.AwardInfo|null);
        public awardInfos: pb.AwardInfo[];
        public static create(properties?: pb.INoticeJackpotAwardRecord): pb.NoticeJackpotAwardRecord;
        public static encode(m: pb.NoticeJackpotAwardRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJackpotAwardRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJackpotAwardRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJackpotAwardRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJackpotAwardRecord;
        public static toObject(m: pb.NoticeJackpotAwardRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJackpotInjectAmount {
        club_id?: (number|null);
        blind_level?: (number|null);
        amount?: (number|null);
    }

    class RequestJackpotInjectAmount implements IRequestJackpotInjectAmount {
        constructor(p?: pb.IRequestJackpotInjectAmount);
        public club_id: number;
        public blind_level: number;
        public amount: number;
        public static create(properties?: pb.IRequestJackpotInjectAmount): pb.RequestJackpotInjectAmount;
        public static encode(m: pb.RequestJackpotInjectAmount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestJackpotInjectAmount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestJackpotInjectAmount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestJackpotInjectAmount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestJackpotInjectAmount;
        public static toObject(m: pb.RequestJackpotInjectAmount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJackpotInjectAmount {
        error?: (number|null);
    }

    class ResponseJackpotInjectAmount implements IResponseJackpotInjectAmount {
        constructor(p?: pb.IResponseJackpotInjectAmount);
        public error: number;
        public static create(properties?: pb.IResponseJackpotInjectAmount): pb.ResponseJackpotInjectAmount;
        public static encode(m: pb.ResponseJackpotInjectAmount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJackpotInjectAmount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJackpotInjectAmount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJackpotInjectAmount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJackpotInjectAmount;
        public static toObject(m: pb.ResponseJackpotInjectAmount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJackpotInjectAmount {
        club_id?: (number|null);
        blind_level?: (number|null);
        amount?: (number|null);
    }

    class NoticeJackpotInjectAmount implements INoticeJackpotInjectAmount {
        constructor(p?: pb.INoticeJackpotInjectAmount);
        public club_id: number;
        public blind_level: number;
        public amount: number;
        public static create(properties?: pb.INoticeJackpotInjectAmount): pb.NoticeJackpotInjectAmount;
        public static encode(m: pb.NoticeJackpotInjectAmount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJackpotInjectAmount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJackpotInjectAmount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJackpotInjectAmount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJackpotInjectAmount;
        public static toObject(m: pb.NoticeJackpotInjectAmount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJackPotAwardInfo {
        awardInfo?: (pb.AwardInfos[]|null);
        cur_time?: (number|null);
        msg_type?: (number|null);
        blind_level?: (number|null);
        sys_msg_type?: (number|null);
        gameId?: (number|null);
        mode?: (number|null);
        playGameIds?: (number[]|null);
    }

    class NoticeJackPotAwardInfo implements INoticeJackPotAwardInfo {
        constructor(p?: pb.INoticeJackPotAwardInfo);
        public awardInfo: pb.AwardInfos[];
        public cur_time: number;
        public msg_type: number;
        public blind_level: number;
        public sys_msg_type: number;
        public gameId: number;
        public mode: number;
        public playGameIds: number[];
        public static create(properties?: pb.INoticeJackPotAwardInfo): pb.NoticeJackPotAwardInfo;
        public static encode(m: pb.NoticeJackPotAwardInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJackPotAwardInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJackPotAwardInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJackPotAwardInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJackPotAwardInfo;
        public static toObject(m: pb.NoticeJackPotAwardInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAwardInfos {
        award_playid?: (number|null);
        award_amount?: (number|null);
        hand_level?: (number|null);
        award_player_name?: (string|null);
    }

    class AwardInfos implements IAwardInfos {
        constructor(p?: pb.IAwardInfos);
        public award_playid: number;
        public award_amount: number;
        public hand_level: number;
        public award_player_name: string;
        public static create(properties?: pb.IAwardInfos): pb.AwardInfos;
        public static encode(m: pb.AwardInfos, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AwardInfos, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AwardInfos;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AwardInfos;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AwardInfos;
        public static toObject(m: pb.AwardInfos, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestHeartBeat {
        uid?: (number|null);
        position?: (pb.PositionInfo|null);
    }

    class RequestHeartBeat implements IRequestHeartBeat {
        constructor(p?: pb.IRequestHeartBeat);
        public uid: number;
        public position?: (pb.PositionInfo|null);
        public static create(properties?: pb.IRequestHeartBeat): pb.RequestHeartBeat;
        public static encode(m: pb.RequestHeartBeat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestHeartBeat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestHeartBeat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestHeartBeat;
        public static toObject(m: pb.RequestHeartBeat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseHeartBeat {
        uid?: (number|null);
        timestamp?: (number|null);
    }

    class ResponseHeartBeat implements IResponseHeartBeat {
        constructor(p?: pb.IResponseHeartBeat);
        public uid: number;
        public timestamp: number;
        public static create(properties?: pb.IResponseHeartBeat): pb.ResponseHeartBeat;
        public static encode(m: pb.ResponseHeartBeat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseHeartBeat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseHeartBeat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseHeartBeat;
        public static toObject(m: pb.ResponseHeartBeat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCreateAlliance {
        alliance_name?: (string|null);
        club_id?: (number|null);
        area_code?: (string|null);
        mobile?: (string|null);
        email?: (string|null);
    }

    class RequestCreateAlliance implements IRequestCreateAlliance {
        constructor(p?: pb.IRequestCreateAlliance);
        public alliance_name: string;
        public club_id: number;
        public area_code: string;
        public mobile: string;
        public email: string;
        public static create(properties?: pb.IRequestCreateAlliance): pb.RequestCreateAlliance;
        public static encode(m: pb.RequestCreateAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestCreateAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestCreateAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestCreateAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestCreateAlliance;
        public static toObject(m: pb.RequestCreateAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCreateAlliance {
        error?: (number|null);
    }

    class ResponseCreateAlliance implements IResponseCreateAlliance {
        constructor(p?: pb.IResponseCreateAlliance);
        public error: number;
        public static create(properties?: pb.IResponseCreateAlliance): pb.ResponseCreateAlliance;
        public static encode(m: pb.ResponseCreateAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseCreateAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseCreateAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseCreateAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseCreateAlliance;
        public static toObject(m: pb.ResponseCreateAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestLeaveAlliance {
        alliance_id?: (number|null);
        club_id?: (number|null);
    }

    class RequestLeaveAlliance implements IRequestLeaveAlliance {
        constructor(p?: pb.IRequestLeaveAlliance);
        public alliance_id: number;
        public club_id: number;
        public static create(properties?: pb.IRequestLeaveAlliance): pb.RequestLeaveAlliance;
        public static encode(m: pb.RequestLeaveAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestLeaveAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestLeaveAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestLeaveAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestLeaveAlliance;
        public static toObject(m: pb.RequestLeaveAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseLeaveAlliance {
        error?: (number|null);
        isDisband?: (number|null);
    }

    class ResponseLeaveAlliance implements IResponseLeaveAlliance {
        constructor(p?: pb.IResponseLeaveAlliance);
        public error: number;
        public isDisband: number;
        public static create(properties?: pb.IResponseLeaveAlliance): pb.ResponseLeaveAlliance;
        public static encode(m: pb.ResponseLeaveAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseLeaveAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseLeaveAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseLeaveAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseLeaveAlliance;
        public static toObject(m: pb.ResponseLeaveAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeLeaveAlliance {
        alliance_id?: (number|null);
        club_id?: (number|null);
        club_admin_id?: (number|null);
        alliance_name?: (string|null);
        club_name?: (string|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        belong_club_id?: (number|null);
    }

    class NoticeLeaveAlliance implements INoticeLeaveAlliance {
        constructor(p?: pb.INoticeLeaveAlliance);
        public alliance_id: number;
        public club_id: number;
        public club_admin_id: number;
        public alliance_name: string;
        public club_name: string;
        public op_time: number;
        public msg_type: number;
        public belong_club_id: number;
        public static create(properties?: pb.INoticeLeaveAlliance): pb.NoticeLeaveAlliance;
        public static encode(m: pb.NoticeLeaveAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeLeaveAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeLeaveAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeLeaveAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeLeaveAlliance;
        public static toObject(m: pb.NoticeLeaveAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSearchAllianceInfo {
        alliance_id?: (number|null);
    }

    class RequestSearchAllianceInfo implements IRequestSearchAllianceInfo {
        constructor(p?: pb.IRequestSearchAllianceInfo);
        public alliance_id: number;
        public static create(properties?: pb.IRequestSearchAllianceInfo): pb.RequestSearchAllianceInfo;
        public static encode(m: pb.RequestSearchAllianceInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSearchAllianceInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSearchAllianceInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSearchAllianceInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSearchAllianceInfo;
        public static toObject(m: pb.RequestSearchAllianceInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSearchAllianceInfo {
        error?: (number|null);
    }

    class ResponseSearchAllianceInfo implements IResponseSearchAllianceInfo {
        constructor(p?: pb.IResponseSearchAllianceInfo);
        public error: number;
        public static create(properties?: pb.IResponseSearchAllianceInfo): pb.ResponseSearchAllianceInfo;
        public static encode(m: pb.ResponseSearchAllianceInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSearchAllianceInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSearchAllianceInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSearchAllianceInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSearchAllianceInfo;
        public static toObject(m: pb.ResponseSearchAllianceInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubItemInfo {
        club_id?: (number|null);
        club_member_max?: (number|null);
        club_member_count?: (number|null);
        club_name?: (string|null);
        creater_name?: (string|null);
        club_thumb?: (string|null);
        creater_id?: (number|null);
        max_buyin_limit?: (number|null);
        cur_buyin_limit?: (number|null);
        control_buyin?: (boolean|null);
    }

    class ClubItemInfo implements IClubItemInfo {
        constructor(p?: pb.IClubItemInfo);
        public club_id: number;
        public club_member_max: number;
        public club_member_count: number;
        public club_name: string;
        public creater_name: string;
        public club_thumb: string;
        public creater_id: number;
        public max_buyin_limit: number;
        public cur_buyin_limit: number;
        public control_buyin: boolean;
        public static create(properties?: pb.IClubItemInfo): pb.ClubItemInfo;
        public static encode(m: pb.ClubItemInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubItemInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubItemInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubItemInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubItemInfo;
        public static toObject(m: pb.ClubItemInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSearchAlliance {
        alliance_id?: (number|null);
        creater_club_id?: (number|null);
        alliance_club_max?: (number|null);
        alliance_club_count?: (number|null);
        alliance_name?: (string|null);
        clubItems?: (pb.ClubItemInfo[]|null);
    }

    class NoticeSearchAlliance implements INoticeSearchAlliance {
        constructor(p?: pb.INoticeSearchAlliance);
        public alliance_id: number;
        public creater_club_id: number;
        public alliance_club_max: number;
        public alliance_club_count: number;
        public alliance_name: string;
        public clubItems: pb.ClubItemInfo[];
        public static create(properties?: pb.INoticeSearchAlliance): pb.NoticeSearchAlliance;
        public static encode(m: pb.NoticeSearchAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeSearchAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeSearchAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeSearchAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeSearchAlliance;
        public static toObject(m: pb.NoticeSearchAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestKickoffAllianceMember {
        alliance_id?: (number|null);
        club_id?: (number|null);
        target_id?: (number|null);
        recv_type?: (boolean|null);
    }

    class RequestKickoffAllianceMember implements IRequestKickoffAllianceMember {
        constructor(p?: pb.IRequestKickoffAllianceMember);
        public alliance_id: number;
        public club_id: number;
        public target_id: number;
        public recv_type: boolean;
        public static create(properties?: pb.IRequestKickoffAllianceMember): pb.RequestKickoffAllianceMember;
        public static encode(m: pb.RequestKickoffAllianceMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestKickoffAllianceMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestKickoffAllianceMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestKickoffAllianceMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestKickoffAllianceMember;
        public static toObject(m: pb.RequestKickoffAllianceMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseKickoffAllianceMember {
        error?: (number|null);
    }

    class ResponseKickoffAllianceMember implements IResponseKickoffAllianceMember {
        constructor(p?: pb.IResponseKickoffAllianceMember);
        public error: number;
        public static create(properties?: pb.IResponseKickoffAllianceMember): pb.ResponseKickoffAllianceMember;
        public static encode(m: pb.ResponseKickoffAllianceMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseKickoffAllianceMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseKickoffAllianceMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseKickoffAllianceMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseKickoffAllianceMember;
        public static toObject(m: pb.ResponseKickoffAllianceMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeKickoffAllianceMember {
        alliance_id?: (number|null);
        target_club_id?: (number|null);
        alliance_name?: (string|null);
        target_club_name?: (string|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        belong_club_id?: (number|null);
    }

    class NoticeKickoffAllianceMember implements INoticeKickoffAllianceMember {
        constructor(p?: pb.INoticeKickoffAllianceMember);
        public alliance_id: number;
        public target_club_id: number;
        public alliance_name: string;
        public target_club_name: string;
        public op_time: number;
        public msg_type: number;
        public belong_club_id: number;
        public static create(properties?: pb.INoticeKickoffAllianceMember): pb.NoticeKickoffAllianceMember;
        public static encode(m: pb.NoticeKickoffAllianceMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeKickoffAllianceMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeKickoffAllianceMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeKickoffAllianceMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeKickoffAllianceMember;
        public static toObject(m: pb.NoticeKickoffAllianceMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAllianceList {
        club_id?: (number|null);
    }

    class RequestAllianceList implements IRequestAllianceList {
        constructor(p?: pb.IRequestAllianceList);
        public club_id: number;
        public static create(properties?: pb.IRequestAllianceList): pb.RequestAllianceList;
        public static encode(m: pb.RequestAllianceList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestAllianceList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestAllianceList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestAllianceList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestAllianceList;
        public static toObject(m: pb.RequestAllianceList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAllianceList {
        error?: (number|null);
    }

    class ResponseAllianceList implements IResponseAllianceList {
        constructor(p?: pb.IResponseAllianceList);
        public error: number;
        public static create(properties?: pb.IResponseAllianceList): pb.ResponseAllianceList;
        public static encode(m: pb.ResponseAllianceList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseAllianceList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseAllianceList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseAllianceList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseAllianceList;
        public static toObject(m: pb.ResponseAllianceList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAllianceListParams {
        alliance_id?: (number|null);
        alliance_name?: (string|null);
        club_max?: (number|null);
        club_count?: (number|null);
        is_creater?: (boolean|null);
        reviewed?: (number|null);
        creater_club_id?: (number|null);
        expire_left_time?: (number|null);
    }

    class AllianceListParams implements IAllianceListParams {
        constructor(p?: pb.IAllianceListParams);
        public alliance_id: number;
        public alliance_name: string;
        public club_max: number;
        public club_count: number;
        public is_creater: boolean;
        public reviewed: number;
        public creater_club_id: number;
        public expire_left_time: number;
        public static create(properties?: pb.IAllianceListParams): pb.AllianceListParams;
        public static encode(m: pb.AllianceListParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AllianceListParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AllianceListParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AllianceListParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AllianceListParams;
        public static toObject(m: pb.AllianceListParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAllianceList {
        list?: (pb.AllianceListParams[]|null);
    }

    class NoticeAllianceList implements INoticeAllianceList {
        constructor(p?: pb.INoticeAllianceList);
        public list: pb.AllianceListParams[];
        public static create(properties?: pb.INoticeAllianceList): pb.NoticeAllianceList;
        public static encode(m: pb.NoticeAllianceList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeAllianceList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeAllianceList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeAllianceList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeAllianceList;
        public static toObject(m: pb.NoticeAllianceList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJoinAlliance {
        alliance_id?: (number|null);
        club_id?: (number|null);
        message?: (string|null);
        apply_time?: (number|null);
    }

    class RequestJoinAlliance implements IRequestJoinAlliance {
        constructor(p?: pb.IRequestJoinAlliance);
        public alliance_id: number;
        public club_id: number;
        public message: string;
        public apply_time: number;
        public static create(properties?: pb.IRequestJoinAlliance): pb.RequestJoinAlliance;
        public static encode(m: pb.RequestJoinAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestJoinAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestJoinAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestJoinAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestJoinAlliance;
        public static toObject(m: pb.RequestJoinAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJoinAlliance {
        alliance_id?: (number|null);
        club_id?: (number|null);
        message?: (string|null);
        club_name?: (string|null);
        alliance_name?: (string|null);
        apply_time?: (number|null);
        msg_type?: (number|null);
    }

    class NoticeJoinAlliance implements INoticeJoinAlliance {
        constructor(p?: pb.INoticeJoinAlliance);
        public alliance_id: number;
        public club_id: number;
        public message: string;
        public club_name: string;
        public alliance_name: string;
        public apply_time: number;
        public msg_type: number;
        public static create(properties?: pb.INoticeJoinAlliance): pb.NoticeJoinAlliance;
        public static encode(m: pb.NoticeJoinAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJoinAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJoinAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJoinAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJoinAlliance;
        public static toObject(m: pb.NoticeJoinAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJoinAllianceToMember {
        error?: (number|null);
    }

    class ResponseJoinAllianceToMember implements IResponseJoinAllianceToMember {
        constructor(p?: pb.IResponseJoinAllianceToMember);
        public error: number;
        public static create(properties?: pb.IResponseJoinAllianceToMember): pb.ResponseJoinAllianceToMember;
        public static encode(m: pb.ResponseJoinAllianceToMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJoinAllianceToMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJoinAllianceToMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJoinAllianceToMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJoinAllianceToMember;
        public static toObject(m: pb.ResponseJoinAllianceToMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJoinAllianceToAdmin {
        error?: (number|null);
    }

    class ResponseJoinAllianceToAdmin implements IResponseJoinAllianceToAdmin {
        constructor(p?: pb.IResponseJoinAllianceToAdmin);
        public error: number;
        public static create(properties?: pb.IResponseJoinAllianceToAdmin): pb.ResponseJoinAllianceToAdmin;
        public static encode(m: pb.ResponseJoinAllianceToAdmin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseJoinAllianceToAdmin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseJoinAllianceToAdmin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseJoinAllianceToAdmin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseJoinAllianceToAdmin;
        public static toObject(m: pb.ResponseJoinAllianceToAdmin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeJoinAllianceToMember {
        result?: (number|null);
        alliance_id?: (number|null);
        club_id?: (number|null);
        reason?: (string|null);
        alliance_name?: (string|null);
        club_admin_id?: (number|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        alli_club_id?: (number|null);
        curr_club_id?: (number|null);
    }

    class NoticeJoinAllianceToMember implements INoticeJoinAllianceToMember {
        constructor(p?: pb.INoticeJoinAllianceToMember);
        public result: number;
        public alliance_id: number;
        public club_id: number;
        public reason: string;
        public alliance_name: string;
        public club_admin_id: number;
        public op_time: number;
        public msg_type: number;
        public alli_club_id: number;
        public curr_club_id: number;
        public static create(properties?: pb.INoticeJoinAllianceToMember): pb.NoticeJoinAllianceToMember;
        public static encode(m: pb.NoticeJoinAllianceToMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeJoinAllianceToMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeJoinAllianceToMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeJoinAllianceToMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeJoinAllianceToMember;
        public static toObject(m: pb.NoticeJoinAllianceToMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReplyJoinAllianceToWorld {
        result?: (number|null);
        alliance_id?: (number|null);
        club_id?: (number|null);
        reason?: (string|null);
    }

    class ReplyJoinAllianceToWorld implements IReplyJoinAllianceToWorld {
        constructor(p?: pb.IReplyJoinAllianceToWorld);
        public result: number;
        public alliance_id: number;
        public club_id: number;
        public reason: string;
        public static create(properties?: pb.IReplyJoinAllianceToWorld): pb.ReplyJoinAllianceToWorld;
        public static encode(m: pb.ReplyJoinAllianceToWorld, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReplyJoinAllianceToWorld, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReplyJoinAllianceToWorld;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReplyJoinAllianceToWorld;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReplyJoinAllianceToWorld;
        public static toObject(m: pb.ReplyJoinAllianceToWorld, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAddRemarks {
        target_id?: (number|null);
        remark_type?: (number|null);
        taget_remark?: (string|null);
    }

    class RequestAddRemarks implements IRequestAddRemarks {
        constructor(p?: pb.IRequestAddRemarks);
        public target_id: number;
        public remark_type: number;
        public taget_remark: string;
        public static create(properties?: pb.IRequestAddRemarks): pb.RequestAddRemarks;
        public static encode(m: pb.RequestAddRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestAddRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestAddRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestAddRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestAddRemarks;
        public static toObject(m: pb.RequestAddRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAddRemarks {
        error?: (number|null);
    }

    class ResponseAddRemarks implements IResponseAddRemarks {
        constructor(p?: pb.IResponseAddRemarks);
        public error: number;
        public static create(properties?: pb.IResponseAddRemarks): pb.ResponseAddRemarks;
        public static encode(m: pb.ResponseAddRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseAddRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseAddRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseAddRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseAddRemarks;
        public static toObject(m: pb.ResponseAddRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestBatchDelRemarks {
        targetIds?: (number[]|null);
    }

    class RequestBatchDelRemarks implements IRequestBatchDelRemarks {
        constructor(p?: pb.IRequestBatchDelRemarks);
        public targetIds: number[];
        public static create(properties?: pb.IRequestBatchDelRemarks): pb.RequestBatchDelRemarks;
        public static encode(m: pb.RequestBatchDelRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestBatchDelRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestBatchDelRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestBatchDelRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestBatchDelRemarks;
        public static toObject(m: pb.RequestBatchDelRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseBatchDelRemarks {
        error?: (number|null);
        targetIds?: (number[]|null);
    }

    class ResponseBatchDelRemarks implements IResponseBatchDelRemarks {
        constructor(p?: pb.IResponseBatchDelRemarks);
        public error: number;
        public targetIds: number[];
        public static create(properties?: pb.IResponseBatchDelRemarks): pb.ResponseBatchDelRemarks;
        public static encode(m: pb.ResponseBatchDelRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseBatchDelRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseBatchDelRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseBatchDelRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseBatchDelRemarks;
        public static toObject(m: pb.ResponseBatchDelRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAddRemarks {
        target_id?: (number|null);
        remark_type?: (number|null);
        taget_remark?: (string|null);
    }

    class NoticeAddRemarks implements INoticeAddRemarks {
        constructor(p?: pb.INoticeAddRemarks);
        public target_id: number;
        public remark_type: number;
        public taget_remark: string;
        public static create(properties?: pb.INoticeAddRemarks): pb.NoticeAddRemarks;
        public static encode(m: pb.NoticeAddRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeAddRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeAddRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeAddRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeAddRemarks;
        public static toObject(m: pb.NoticeAddRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetAllRemarks {
        playerid?: (number|null);
    }

    class RequestGetAllRemarks implements IRequestGetAllRemarks {
        constructor(p?: pb.IRequestGetAllRemarks);
        public playerid: number;
        public static create(properties?: pb.IRequestGetAllRemarks): pb.RequestGetAllRemarks;
        public static encode(m: pb.RequestGetAllRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetAllRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetAllRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetAllRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetAllRemarks;
        public static toObject(m: pb.RequestGetAllRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetAllRemarks {
        error?: (number|null);
    }

    class ResponseGetAllRemarks implements IResponseGetAllRemarks {
        constructor(p?: pb.IResponseGetAllRemarks);
        public error: number;
        public static create(properties?: pb.IResponseGetAllRemarks): pb.ResponseGetAllRemarks;
        public static encode(m: pb.ResponseGetAllRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetAllRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetAllRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetAllRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetAllRemarks;
        public static toObject(m: pb.ResponseGetAllRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetAllRemarks {
        remarks_data?: (string|null);
        start?: (boolean|null);
    }

    class NoticeGetAllRemarks implements INoticeGetAllRemarks {
        constructor(p?: pb.INoticeGetAllRemarks);
        public remarks_data: string;
        public start: boolean;
        public static create(properties?: pb.INoticeGetAllRemarks): pb.NoticeGetAllRemarks;
        public static encode(m: pb.NoticeGetAllRemarks, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGetAllRemarks, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGetAllRemarks;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGetAllRemarks;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGetAllRemarks;
        public static toObject(m: pb.NoticeGetAllRemarks, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestClearAllianceMaxBuyinLimit {
        alliance_id?: (number|null);
        club_id?: (number|null);
    }

    class RequestClearAllianceMaxBuyinLimit implements IRequestClearAllianceMaxBuyinLimit {
        constructor(p?: pb.IRequestClearAllianceMaxBuyinLimit);
        public alliance_id: number;
        public club_id: number;
        public static create(properties?: pb.IRequestClearAllianceMaxBuyinLimit): pb.RequestClearAllianceMaxBuyinLimit;
        public static encode(m: pb.RequestClearAllianceMaxBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestClearAllianceMaxBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestClearAllianceMaxBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestClearAllianceMaxBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestClearAllianceMaxBuyinLimit;
        public static toObject(m: pb.RequestClearAllianceMaxBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseClearAllianceMaxBuyinLimit {
        error?: (number|null);
    }

    class ResponseClearAllianceMaxBuyinLimit implements IResponseClearAllianceMaxBuyinLimit {
        constructor(p?: pb.IResponseClearAllianceMaxBuyinLimit);
        public error: number;
        public static create(properties?: pb.IResponseClearAllianceMaxBuyinLimit): pb.ResponseClearAllianceMaxBuyinLimit;
        public static encode(m: pb.ResponseClearAllianceMaxBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseClearAllianceMaxBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseClearAllianceMaxBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseClearAllianceMaxBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseClearAllianceMaxBuyinLimit;
        public static toObject(m: pb.ResponseClearAllianceMaxBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSetAllianceMaxBuyinLimit {
        alliance_id?: (number|null);
        club_id?: (number|null);
        amount?: (number|null);
    }

    class RequestSetAllianceMaxBuyinLimit implements IRequestSetAllianceMaxBuyinLimit {
        constructor(p?: pb.IRequestSetAllianceMaxBuyinLimit);
        public alliance_id: number;
        public club_id: number;
        public amount: number;
        public static create(properties?: pb.IRequestSetAllianceMaxBuyinLimit): pb.RequestSetAllianceMaxBuyinLimit;
        public static encode(m: pb.RequestSetAllianceMaxBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSetAllianceMaxBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSetAllianceMaxBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSetAllianceMaxBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSetAllianceMaxBuyinLimit;
        public static toObject(m: pb.RequestSetAllianceMaxBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSetAllianceMaxBuyinLimit {
        error?: (number|null);
    }

    class ResponseSetAllianceMaxBuyinLimit implements IResponseSetAllianceMaxBuyinLimit {
        constructor(p?: pb.IResponseSetAllianceMaxBuyinLimit);
        public error: number;
        public static create(properties?: pb.IResponseSetAllianceMaxBuyinLimit): pb.ResponseSetAllianceMaxBuyinLimit;
        public static encode(m: pb.ResponseSetAllianceMaxBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSetAllianceMaxBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSetAllianceMaxBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSetAllianceMaxBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSetAllianceMaxBuyinLimit;
        public static toObject(m: pb.ResponseSetAllianceMaxBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSetAllianceControlBuyin {
        alliance_id?: (number|null);
        club_id?: (number|null);
        control_buyin?: (boolean|null);
    }

    class RequestSetAllianceControlBuyin implements IRequestSetAllianceControlBuyin {
        constructor(p?: pb.IRequestSetAllianceControlBuyin);
        public alliance_id: number;
        public club_id: number;
        public control_buyin: boolean;
        public static create(properties?: pb.IRequestSetAllianceControlBuyin): pb.RequestSetAllianceControlBuyin;
        public static encode(m: pb.RequestSetAllianceControlBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSetAllianceControlBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSetAllianceControlBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSetAllianceControlBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSetAllianceControlBuyin;
        public static toObject(m: pb.RequestSetAllianceControlBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSetAllianceControlBuyin {
        error?: (number|null);
    }

    class ResponseSetAllianceControlBuyin implements IResponseSetAllianceControlBuyin {
        constructor(p?: pb.IResponseSetAllianceControlBuyin);
        public error: number;
        public static create(properties?: pb.IResponseSetAllianceControlBuyin): pb.ResponseSetAllianceControlBuyin;
        public static encode(m: pb.ResponseSetAllianceControlBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSetAllianceControlBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSetAllianceControlBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSetAllianceControlBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSetAllianceControlBuyin;
        public static toObject(m: pb.ResponseSetAllianceControlBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestFairPlayReport {
        roomid?: (number|null);
        clubid?: (number|null);
        room_uuid?: (number|null);
        game_uuid?: (number|null);
        suspect_uids?: (number[]|null);
        contact?: (string|null);
        detail?: (string|null);
        room_uuid_js?: (string|null);
        game_uuid_js?: (string|null);
    }

    class RequestFairPlayReport implements IRequestFairPlayReport {
        constructor(p?: pb.IRequestFairPlayReport);
        public roomid: number;
        public clubid: number;
        public room_uuid: number;
        public game_uuid: number;
        public suspect_uids: number[];
        public contact: string;
        public detail: string;
        public room_uuid_js: string;
        public game_uuid_js: string;
        public static create(properties?: pb.IRequestFairPlayReport): pb.RequestFairPlayReport;
        public static encode(m: pb.RequestFairPlayReport, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestFairPlayReport, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestFairPlayReport;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestFairPlayReport;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestFairPlayReport;
        public static toObject(m: pb.RequestFairPlayReport, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseFairPlayReport {
        error?: (number|null);
    }

    class ResponseFairPlayReport implements IResponseFairPlayReport {
        constructor(p?: pb.IResponseFairPlayReport);
        public error: number;
        public static create(properties?: pb.IResponseFairPlayReport): pb.ResponseFairPlayReport;
        public static encode(m: pb.ResponseFairPlayReport, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseFairPlayReport, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseFairPlayReport;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseFairPlayReport;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseFairPlayReport;
        public static toObject(m: pb.ResponseFairPlayReport, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestDeviceInfoReport {
        report_channel?: (number|null);
        device_info?: (string|null);
        Ip?: (string|null);
    }

    class RequestDeviceInfoReport implements IRequestDeviceInfoReport {
        constructor(p?: pb.IRequestDeviceInfoReport);
        public report_channel: number;
        public device_info: string;
        public Ip: string;
        public static create(properties?: pb.IRequestDeviceInfoReport): pb.RequestDeviceInfoReport;
        public static encode(m: pb.RequestDeviceInfoReport, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestDeviceInfoReport, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestDeviceInfoReport;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestDeviceInfoReport;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestDeviceInfoReport;
        public static toObject(m: pb.RequestDeviceInfoReport, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseDeviceInfoReport {
        error?: (number|null);
    }

    class ResponseDeviceInfoReport implements IResponseDeviceInfoReport {
        constructor(p?: pb.IResponseDeviceInfoReport);
        public error: number;
        public static create(properties?: pb.IResponseDeviceInfoReport): pb.ResponseDeviceInfoReport;
        public static encode(m: pb.ResponseDeviceInfoReport, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseDeviceInfoReport, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseDeviceInfoReport;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseDeviceInfoReport;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseDeviceInfoReport;
        public static toObject(m: pb.ResponseDeviceInfoReport, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IClubGrantFundNotice {
        error?: (number|null);
        op_playerId?: (number|null);
        clubid?: (number|null);
        targetid?: (number|null);
        amount?: (number|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        op_name?: (string|null);
        target_name?: (string|null);
    }

    class ClubGrantFundNotice implements IClubGrantFundNotice {
        constructor(p?: pb.IClubGrantFundNotice);
        public error: number;
        public op_playerId: number;
        public clubid: number;
        public targetid: number;
        public amount: number;
        public op_time: number;
        public msg_type: number;
        public op_name: string;
        public target_name: string;
        public static create(properties?: pb.IClubGrantFundNotice): pb.ClubGrantFundNotice;
        public static encode(m: pb.ClubGrantFundNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ClubGrantFundNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ClubGrantFundNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ClubGrantFundNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ClubGrantFundNotice;
        public static toObject(m: pb.ClubGrantFundNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetIncome {
        uid?: (number|null);
    }

    class RequestGetIncome implements IRequestGetIncome {
        constructor(p?: pb.IRequestGetIncome);
        public uid: number;
        public static create(properties?: pb.IRequestGetIncome): pb.RequestGetIncome;
        public static encode(m: pb.RequestGetIncome, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetIncome, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetIncome;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetIncome;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetIncome;
        public static toObject(m: pb.RequestGetIncome, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetIncome {
        error?: (number|null);
    }

    class ResponseGetIncome implements IResponseGetIncome {
        constructor(p?: pb.IResponseGetIncome);
        public error: number;
        public static create(properties?: pb.IResponseGetIncome): pb.ResponseGetIncome;
        public static encode(m: pb.ResponseGetIncome, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetIncome, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetIncome;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetIncome;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetIncome;
        public static toObject(m: pb.ResponseGetIncome, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetIncome {
        club_fee?: (number|null);
        club_insurance?: (number|null);
        club_jackpot?: (number|null);
        alli_fee?: (number|null);
        alli_insurance?: (number|null);
        alli_jackpot?: (number|null);
    }

    class NoticeGetIncome implements INoticeGetIncome {
        constructor(p?: pb.INoticeGetIncome);
        public club_fee: number;
        public club_insurance: number;
        public club_jackpot: number;
        public alli_fee: number;
        public alli_insurance: number;
        public alli_jackpot: number;
        public static create(properties?: pb.INoticeGetIncome): pb.NoticeGetIncome;
        public static encode(m: pb.NoticeGetIncome, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGetIncome, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGetIncome;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGetIncome;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGetIncome;
        public static toObject(m: pb.NoticeGetIncome, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITransferToOtherInfo {
        operator_id?: (number|null);
        club_id?: (number|null);
        targer_id?: (number|null);
        amount?: (number|null);
        grant_time?: (number|null);
        operator_name?: (string|null);
        target_name?: (string|null);
    }

    class TransferToOtherInfo implements ITransferToOtherInfo {
        constructor(p?: pb.ITransferToOtherInfo);
        public operator_id: number;
        public club_id: number;
        public targer_id: number;
        public amount: number;
        public grant_time: number;
        public operator_name: string;
        public target_name: string;
        public static create(properties?: pb.ITransferToOtherInfo): pb.TransferToOtherInfo;
        public static encode(m: pb.TransferToOtherInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.TransferToOtherInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.TransferToOtherInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.TransferToOtherInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.TransferToOtherInfo;
        public static toObject(m: pb.TransferToOtherInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetUserClubGrantInfo {
        uid?: (number|null);
    }

    class RequestGetUserClubGrantInfo implements IRequestGetUserClubGrantInfo {
        constructor(p?: pb.IRequestGetUserClubGrantInfo);
        public uid: number;
        public static create(properties?: pb.IRequestGetUserClubGrantInfo): pb.RequestGetUserClubGrantInfo;
        public static encode(m: pb.RequestGetUserClubGrantInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetUserClubGrantInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetUserClubGrantInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetUserClubGrantInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetUserClubGrantInfo;
        public static toObject(m: pb.RequestGetUserClubGrantInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetUserClubGrantInfo {
        error?: (number|null);
    }

    class ResponseGetUserClubGrantInfo implements IResponseGetUserClubGrantInfo {
        constructor(p?: pb.IResponseGetUserClubGrantInfo);
        public error: number;
        public static create(properties?: pb.IResponseGetUserClubGrantInfo): pb.ResponseGetUserClubGrantInfo;
        public static encode(m: pb.ResponseGetUserClubGrantInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetUserClubGrantInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetUserClubGrantInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetUserClubGrantInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetUserClubGrantInfo;
        public static toObject(m: pb.ResponseGetUserClubGrantInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetUserClubGrantInfo {
        to_list?: (pb.TransferToOtherInfo[]|null);
        get_list?: (pb.TransferToOtherInfo[]|null);
    }

    class NoticeGetUserClubGrantInfo implements INoticeGetUserClubGrantInfo {
        constructor(p?: pb.INoticeGetUserClubGrantInfo);
        public to_list: pb.TransferToOtherInfo[];
        public get_list: pb.TransferToOtherInfo[];
        public static create(properties?: pb.INoticeGetUserClubGrantInfo): pb.NoticeGetUserClubGrantInfo;
        public static encode(m: pb.NoticeGetUserClubGrantInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGetUserClubGrantInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGetUserClubGrantInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGetUserClubGrantInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGetUserClubGrantInfo;
        public static toObject(m: pb.NoticeGetUserClubGrantInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeNotifyUserGoldNum {
        uid?: (number|null);
        changeNum?: (number|null);
        goldNum?: (number|null);
        game_coin?: (number|null);
        total_amount?: (number|null);
        total_points?: (number|null);
        usdt?: (number|null);
        diamond?: (number|null);
    }

    class NoticeNotifyUserGoldNum implements INoticeNotifyUserGoldNum {
        constructor(p?: pb.INoticeNotifyUserGoldNum);
        public uid: number;
        public changeNum: number;
        public goldNum: number;
        public game_coin: number;
        public total_amount: number;
        public total_points: number;
        public usdt: number;
        public diamond: number;
        public static create(properties?: pb.INoticeNotifyUserGoldNum): pb.NoticeNotifyUserGoldNum;
        public static encode(m: pb.NoticeNotifyUserGoldNum, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeNotifyUserGoldNum, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeNotifyUserGoldNum;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeNotifyUserGoldNum;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeNotifyUserGoldNum;
        public static toObject(m: pb.NoticeNotifyUserGoldNum, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAttachmentInfo {
        item_id?: (number|null);
        item_name?: (string|null);
        item_num?: (number|null);
    }

    class AttachmentInfo implements IAttachmentInfo {
        constructor(p?: pb.IAttachmentInfo);
        public item_id: number;
        public item_name: string;
        public item_num: number;
        public static create(properties?: pb.IAttachmentInfo): pb.AttachmentInfo;
        public static encode(m: pb.AttachmentInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AttachmentInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AttachmentInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AttachmentInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AttachmentInfo;
        public static toObject(m: pb.AttachmentInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMailInfo {
        mail_id?: (number|null);
        mail_type?: (number|null);
        mail_state?: (number|null);
        mail_title?: (string[]|null);
        mail_sender_id?: (number|null);
        mail_sender_nickname?: (string|null);
        mail_appellation?: (string|null);
        mail_content?: (string[]|null);
        mail_inscribe?: (string[]|null);
        mail_sendtime?: (number|null);
        mail_expiredtime?: (number|null);
        isexpired?: (number|null);
        attachment_list?: (pb.AttachmentInfo[]|null);
        plat?: (number|null);
        mail_copy?: (string[]|null);
        mail_content_reserved?: (string[]|null);
    }

    class MailInfo implements IMailInfo {
        constructor(p?: pb.IMailInfo);
        public mail_id: number;
        public mail_type: number;
        public mail_state: number;
        public mail_title: string[];
        public mail_sender_id: number;
        public mail_sender_nickname: string;
        public mail_appellation: string;
        public mail_content: string[];
        public mail_inscribe: string[];
        public mail_sendtime: number;
        public mail_expiredtime: number;
        public isexpired: number;
        public attachment_list: pb.AttachmentInfo[];
        public plat: number;
        public mail_copy: string[];
        public mail_content_reserved: string[];
        public static create(properties?: pb.IMailInfo): pb.MailInfo;
        public static encode(m: pb.MailInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MailInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MailInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MailInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MailInfo;
        public static toObject(m: pb.MailInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetUserMailList {
        uid?: (number|null);
        mail_begin_index?: (number|null);
        mail_end_index?: (number|null);
    }

    class RequestGetUserMailList implements IRequestGetUserMailList {
        constructor(p?: pb.IRequestGetUserMailList);
        public uid: number;
        public mail_begin_index: number;
        public mail_end_index: number;
        public static create(properties?: pb.IRequestGetUserMailList): pb.RequestGetUserMailList;
        public static encode(m: pb.RequestGetUserMailList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetUserMailList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetUserMailList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetUserMailList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetUserMailList;
        public static toObject(m: pb.RequestGetUserMailList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetUserMailList {
        error?: (number|null);
    }

    class ResponseGetUserMailList implements IResponseGetUserMailList {
        constructor(p?: pb.IResponseGetUserMailList);
        public error: number;
        public static create(properties?: pb.IResponseGetUserMailList): pb.ResponseGetUserMailList;
        public static encode(m: pb.ResponseGetUserMailList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetUserMailList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetUserMailList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetUserMailList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetUserMailList;
        public static toObject(m: pb.ResponseGetUserMailList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetUserMailList {
        mail_list?: (pb.MailInfo[]|null);
    }

    class NoticeGetUserMailList implements INoticeGetUserMailList {
        constructor(p?: pb.INoticeGetUserMailList);
        public mail_list: pb.MailInfo[];
        public static create(properties?: pb.INoticeGetUserMailList): pb.NoticeGetUserMailList;
        public static encode(m: pb.NoticeGetUserMailList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGetUserMailList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGetUserMailList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGetUserMailList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGetUserMailList;
        public static toObject(m: pb.NoticeGetUserMailList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestFetchOneMail {
        uid?: (number|null);
        mail_id?: (number|null);
    }

    class RequestFetchOneMail implements IRequestFetchOneMail {
        constructor(p?: pb.IRequestFetchOneMail);
        public uid: number;
        public mail_id: number;
        public static create(properties?: pb.IRequestFetchOneMail): pb.RequestFetchOneMail;
        public static encode(m: pb.RequestFetchOneMail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestFetchOneMail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestFetchOneMail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestFetchOneMail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestFetchOneMail;
        public static toObject(m: pb.RequestFetchOneMail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseFetchOneMail {
        error?: (number|null);
    }

    class ResponseFetchOneMail implements IResponseFetchOneMail {
        constructor(p?: pb.IResponseFetchOneMail);
        public error: number;
        public static create(properties?: pb.IResponseFetchOneMail): pb.ResponseFetchOneMail;
        public static encode(m: pb.ResponseFetchOneMail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseFetchOneMail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseFetchOneMail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseFetchOneMail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseFetchOneMail;
        public static toObject(m: pb.ResponseFetchOneMail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeFetchOneMail {
        onemail?: (pb.MailInfo|null);
    }

    class NoticeFetchOneMail implements INoticeFetchOneMail {
        constructor(p?: pb.INoticeFetchOneMail);
        public onemail?: (pb.MailInfo|null);
        public static create(properties?: pb.INoticeFetchOneMail): pb.NoticeFetchOneMail;
        public static encode(m: pb.NoticeFetchOneMail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeFetchOneMail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeFetchOneMail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeFetchOneMail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeFetchOneMail;
        public static toObject(m: pb.NoticeFetchOneMail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotifyUserMailNum {
        uid?: (number|null);
        mail_total_num?: (number|null);
        mail_new_num?: (number|null);
        anounce_total_num?: (number|null);
        anounce_new_num?: (number|null);
    }

    class NotifyUserMailNum implements INotifyUserMailNum {
        constructor(p?: pb.INotifyUserMailNum);
        public uid: number;
        public mail_total_num: number;
        public mail_new_num: number;
        public anounce_total_num: number;
        public anounce_new_num: number;
        public static create(properties?: pb.INotifyUserMailNum): pb.NotifyUserMailNum;
        public static encode(m: pb.NotifyUserMailNum, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NotifyUserMailNum, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NotifyUserMailNum;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NotifyUserMailNum;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NotifyUserMailNum;
        public static toObject(m: pb.NotifyUserMailNum, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCreateClub {
        uid?: (number|null);
        op_type?: (number|null);
        clubid?: (number|null);
        result?: (number|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        club_name?: (string|null);
        club_create_uid?: (number|null);
        u_name?: (string|null);
    }

    class NoticeCreateClub implements INoticeCreateClub {
        constructor(p?: pb.INoticeCreateClub);
        public uid: number;
        public op_type: number;
        public clubid: number;
        public result: number;
        public op_time: number;
        public msg_type: number;
        public club_name: string;
        public club_create_uid: number;
        public u_name: string;
        public static create(properties?: pb.INoticeCreateClub): pb.NoticeCreateClub;
        public static encode(m: pb.NoticeCreateClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeCreateClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeCreateClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeCreateClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeCreateClub;
        public static toObject(m: pb.NoticeCreateClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAnounceList {
        uid?: (number|null);
    }

    class RequestAnounceList implements IRequestAnounceList {
        constructor(p?: pb.IRequestAnounceList);
        public uid: number;
        public static create(properties?: pb.IRequestAnounceList): pb.RequestAnounceList;
        public static encode(m: pb.RequestAnounceList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestAnounceList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestAnounceList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestAnounceList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestAnounceList;
        public static toObject(m: pb.RequestAnounceList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAnounceList {
        error?: (number|null);
    }

    class ResponseAnounceList implements IResponseAnounceList {
        constructor(p?: pb.IResponseAnounceList);
        public error: number;
        public static create(properties?: pb.IResponseAnounceList): pb.ResponseAnounceList;
        public static encode(m: pb.ResponseAnounceList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseAnounceList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseAnounceList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseAnounceList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseAnounceList;
        public static toObject(m: pb.ResponseAnounceList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAnounceList {
        anounce_list?: (pb.MailInfo[]|null);
    }

    class NoticeAnounceList implements INoticeAnounceList {
        constructor(p?: pb.INoticeAnounceList);
        public anounce_list: pb.MailInfo[];
        public static create(properties?: pb.INoticeAnounceList): pb.NoticeAnounceList;
        public static encode(m: pb.NoticeAnounceList, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeAnounceList, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeAnounceList;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeAnounceList;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeAnounceList;
        public static toObject(m: pb.NoticeAnounceList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeOneAnounce {
        oneanounce?: (pb.MailInfo|null);
    }

    class NoticeOneAnounce implements INoticeOneAnounce {
        constructor(p?: pb.INoticeOneAnounce);
        public oneanounce?: (pb.MailInfo|null);
        public static create(properties?: pb.INoticeOneAnounce): pb.NoticeOneAnounce;
        public static encode(m: pb.NoticeOneAnounce, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeOneAnounce, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeOneAnounce;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeOneAnounce;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeOneAnounce;
        public static toObject(m: pb.NoticeOneAnounce, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCreateAlliance {
        uid?: (number|null);
        op_type?: (number|null);
        a_name?: (string|null);
        result?: (number|null);
        op_time?: (number|null);
        msg_type?: (number|null);
        alliance_id?: (number|null);
        reason?: (string|null);
    }

    class NoticeCreateAlliance implements INoticeCreateAlliance {
        constructor(p?: pb.INoticeCreateAlliance);
        public uid: number;
        public op_type: number;
        public a_name: string;
        public result: number;
        public op_time: number;
        public msg_type: number;
        public alliance_id: number;
        public reason: string;
        public static create(properties?: pb.INoticeCreateAlliance): pb.NoticeCreateAlliance;
        public static encode(m: pb.NoticeCreateAlliance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeCreateAlliance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeCreateAlliance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeCreateAlliance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeCreateAlliance;
        public static toObject(m: pb.NoticeCreateAlliance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAddCoinOrder {
        type?: (number|null);
        uid?: (number|null);
        productid?: (string|null);
        amount?: (number|null);
    }

    class RequestAddCoinOrder implements IRequestAddCoinOrder {
        constructor(p?: pb.IRequestAddCoinOrder);
        public type: number;
        public uid: number;
        public productid: string;
        public amount: number;
        public static create(properties?: pb.IRequestAddCoinOrder): pb.RequestAddCoinOrder;
        public static encode(m: pb.RequestAddCoinOrder, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestAddCoinOrder, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestAddCoinOrder;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestAddCoinOrder;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestAddCoinOrder;
        public static toObject(m: pb.RequestAddCoinOrder, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAddCoinOrder {
        error?: (number|null);
        srv_add_order?: (number|null);
        cb_url?: (string|null);
        token?: (string|null);
    }

    class ResponseAddCoinOrder implements IResponseAddCoinOrder {
        constructor(p?: pb.IResponseAddCoinOrder);
        public error: number;
        public srv_add_order: number;
        public cb_url: string;
        public token: string;
        public static create(properties?: pb.IResponseAddCoinOrder): pb.ResponseAddCoinOrder;
        public static encode(m: pb.ResponseAddCoinOrder, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseAddCoinOrder, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseAddCoinOrder;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseAddCoinOrder;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseAddCoinOrder;
        public static toObject(m: pb.ResponseAddCoinOrder, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAddCoinResult {
        error?: (number|null);
        add_coin?: (number|null);
    }

    class NoticeAddCoinResult implements INoticeAddCoinResult {
        constructor(p?: pb.INoticeAddCoinResult);
        public error: number;
        public add_coin: number;
        public static create(properties?: pb.INoticeAddCoinResult): pb.NoticeAddCoinResult;
        public static encode(m: pb.NoticeAddCoinResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeAddCoinResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeAddCoinResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeAddCoinResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeAddCoinResult;
        public static toObject(m: pb.NoticeAddCoinResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestDelCoinOrder {
        type?: (number|null);
        uid?: (number|null);
    }

    class RequestDelCoinOrder implements IRequestDelCoinOrder {
        constructor(p?: pb.IRequestDelCoinOrder);
        public type: number;
        public uid: number;
        public static create(properties?: pb.IRequestDelCoinOrder): pb.RequestDelCoinOrder;
        public static encode(m: pb.RequestDelCoinOrder, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestDelCoinOrder, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestDelCoinOrder;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestDelCoinOrder;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestDelCoinOrder;
        public static toObject(m: pb.RequestDelCoinOrder, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseDelCoinOrder {
        error?: (number|null);
        srv_del_order?: (number|null);
        cb_url?: (string|null);
        token?: (string|null);
        reward_points?: (number|null);
    }

    class ResponseDelCoinOrder implements IResponseDelCoinOrder {
        constructor(p?: pb.IResponseDelCoinOrder);
        public error: number;
        public srv_del_order: number;
        public cb_url: string;
        public token: string;
        public reward_points: number;
        public static create(properties?: pb.IResponseDelCoinOrder): pb.ResponseDelCoinOrder;
        public static encode(m: pb.ResponseDelCoinOrder, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseDelCoinOrder, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseDelCoinOrder;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseDelCoinOrder;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseDelCoinOrder;
        public static toObject(m: pb.ResponseDelCoinOrder, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeDelCoinResult {
        error?: (number|null);
        del_coin?: (number|null);
    }

    class NoticeDelCoinResult implements INoticeDelCoinResult {
        constructor(p?: pb.INoticeDelCoinResult);
        public error: number;
        public del_coin: number;
        public static create(properties?: pb.INoticeDelCoinResult): pb.NoticeDelCoinResult;
        public static encode(m: pb.NoticeDelCoinResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeDelCoinResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeDelCoinResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeDelCoinResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeDelCoinResult;
        public static toObject(m: pb.NoticeDelCoinResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSearchClubMember {
        club_id?: (number|null);
        find_str?: (string|null);
        find_type?: (number|null);
    }

    class RequestSearchClubMember implements IRequestSearchClubMember {
        constructor(p?: pb.IRequestSearchClubMember);
        public club_id: number;
        public find_str: string;
        public find_type: number;
        public static create(properties?: pb.IRequestSearchClubMember): pb.RequestSearchClubMember;
        public static encode(m: pb.RequestSearchClubMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSearchClubMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSearchClubMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSearchClubMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSearchClubMember;
        public static toObject(m: pb.RequestSearchClubMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSearchClubMember {
        error?: (number|null);
    }

    class ResponseSearchClubMember implements IResponseSearchClubMember {
        constructor(p?: pb.IResponseSearchClubMember);
        public error: number;
        public static create(properties?: pb.IResponseSearchClubMember): pb.ResponseSearchClubMember;
        public static encode(m: pb.ResponseSearchClubMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSearchClubMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSearchClubMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSearchClubMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSearchClubMember;
        public static toObject(m: pb.ResponseSearchClubMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSearchClubMember {
        snapshots?: (pb.ClubMemberSnapshot[]|null);
        find_type?: (number|null);
    }

    class NoticeSearchClubMember implements INoticeSearchClubMember {
        constructor(p?: pb.INoticeSearchClubMember);
        public snapshots: pb.ClubMemberSnapshot[];
        public find_type: number;
        public static create(properties?: pb.INoticeSearchClubMember): pb.NoticeSearchClubMember;
        public static encode(m: pb.NoticeSearchClubMember, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeSearchClubMember, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeSearchClubMember;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeSearchClubMember;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeSearchClubMember;
        public static toObject(m: pb.NoticeSearchClubMember, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestFetchOneAnounce {
        uid?: (number|null);
        mail_id?: (number|null);
    }

    class RequestFetchOneAnounce implements IRequestFetchOneAnounce {
        constructor(p?: pb.IRequestFetchOneAnounce);
        public uid: number;
        public mail_id: number;
        public static create(properties?: pb.IRequestFetchOneAnounce): pb.RequestFetchOneAnounce;
        public static encode(m: pb.RequestFetchOneAnounce, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestFetchOneAnounce, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestFetchOneAnounce;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestFetchOneAnounce;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestFetchOneAnounce;
        public static toObject(m: pb.RequestFetchOneAnounce, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseFetchOneAnounce {
        error?: (number|null);
    }

    class ResponseFetchOneAnounce implements IResponseFetchOneAnounce {
        constructor(p?: pb.IResponseFetchOneAnounce);
        public error: number;
        public static create(properties?: pb.IResponseFetchOneAnounce): pb.ResponseFetchOneAnounce;
        public static encode(m: pb.ResponseFetchOneAnounce, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseFetchOneAnounce, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseFetchOneAnounce;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseFetchOneAnounce;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseFetchOneAnounce;
        public static toObject(m: pb.ResponseFetchOneAnounce, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeFetchOneAnounce {
        oneanounce?: (pb.MailInfo|null);
    }

    class NoticeFetchOneAnounce implements INoticeFetchOneAnounce {
        constructor(p?: pb.INoticeFetchOneAnounce);
        public oneanounce?: (pb.MailInfo|null);
        public static create(properties?: pb.INoticeFetchOneAnounce): pb.NoticeFetchOneAnounce;
        public static encode(m: pb.NoticeFetchOneAnounce, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeFetchOneAnounce, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeFetchOneAnounce;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeFetchOneAnounce;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeFetchOneAnounce;
        public static toObject(m: pb.NoticeFetchOneAnounce, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeOneMail {
        onemail?: (pb.MailInfo|null);
    }

    class NoticeOneMail implements INoticeOneMail {
        constructor(p?: pb.INoticeOneMail);
        public onemail?: (pb.MailInfo|null);
        public static create(properties?: pb.INoticeOneMail): pb.NoticeOneMail;
        public static encode(m: pb.NoticeOneMail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeOneMail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeOneMail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeOneMail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeOneMail;
        public static toObject(m: pb.NoticeOneMail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeWithdrawMail {
        mail_id?: (number|null);
    }

    class NoticeWithdrawMail implements INoticeWithdrawMail {
        constructor(p?: pb.INoticeWithdrawMail);
        public mail_id: number;
        public static create(properties?: pb.INoticeWithdrawMail): pb.NoticeWithdrawMail;
        public static encode(m: pb.NoticeWithdrawMail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeWithdrawMail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeWithdrawMail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeWithdrawMail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeWithdrawMail;
        public static toObject(m: pb.NoticeWithdrawMail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeWithdrawAnounce {
        mail_id?: (number|null);
    }

    class NoticeWithdrawAnounce implements INoticeWithdrawAnounce {
        constructor(p?: pb.INoticeWithdrawAnounce);
        public mail_id: number;
        public static create(properties?: pb.INoticeWithdrawAnounce): pb.NoticeWithdrawAnounce;
        public static encode(m: pb.NoticeWithdrawAnounce, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeWithdrawAnounce, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeWithdrawAnounce;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeWithdrawAnounce;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeWithdrawAnounce;
        public static toObject(m: pb.NoticeWithdrawAnounce, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAutoAgreeClub {
        club_id?: (number|null);
        is_agree?: (number|null);
    }

    class RequestAutoAgreeClub implements IRequestAutoAgreeClub {
        constructor(p?: pb.IRequestAutoAgreeClub);
        public club_id: number;
        public is_agree: number;
        public static create(properties?: pb.IRequestAutoAgreeClub): pb.RequestAutoAgreeClub;
        public static encode(m: pb.RequestAutoAgreeClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestAutoAgreeClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestAutoAgreeClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestAutoAgreeClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestAutoAgreeClub;
        public static toObject(m: pb.RequestAutoAgreeClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAutoAgreeClub {
        error?: (number|null);
    }

    class ResponseAutoAgreeClub implements IResponseAutoAgreeClub {
        constructor(p?: pb.IResponseAutoAgreeClub);
        public error: number;
        public static create(properties?: pb.IResponseAutoAgreeClub): pb.ResponseAutoAgreeClub;
        public static encode(m: pb.ResponseAutoAgreeClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseAutoAgreeClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseAutoAgreeClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseAutoAgreeClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseAutoAgreeClub;
        public static toObject(m: pb.ResponseAutoAgreeClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAutoAgreeClub {
        club_id?: (number|null);
        is_agree?: (number|null);
    }

    class NoticeAutoAgreeClub implements INoticeAutoAgreeClub {
        constructor(p?: pb.INoticeAutoAgreeClub);
        public club_id: number;
        public is_agree: number;
        public static create(properties?: pb.INoticeAutoAgreeClub): pb.NoticeAutoAgreeClub;
        public static encode(m: pb.NoticeAutoAgreeClub, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeAutoAgreeClub, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeAutoAgreeClub;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeAutoAgreeClub;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeAutoAgreeClub;
        public static toObject(m: pb.NoticeAutoAgreeClub, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSetClubInvitePercent {
        club_id?: (number|null);
        percent?: (number|null);
    }

    class RequestSetClubInvitePercent implements IRequestSetClubInvitePercent {
        constructor(p?: pb.IRequestSetClubInvitePercent);
        public club_id: number;
        public percent: number;
        public static create(properties?: pb.IRequestSetClubInvitePercent): pb.RequestSetClubInvitePercent;
        public static encode(m: pb.RequestSetClubInvitePercent, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestSetClubInvitePercent, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestSetClubInvitePercent;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestSetClubInvitePercent;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestSetClubInvitePercent;
        public static toObject(m: pb.RequestSetClubInvitePercent, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSetClubInvitePercent {
        error?: (number|null);
        club_id?: (number|null);
        percent?: (number|null);
        setInvitePercentMark?: (boolean|null);
    }

    class ResponseSetClubInvitePercent implements IResponseSetClubInvitePercent {
        constructor(p?: pb.IResponseSetClubInvitePercent);
        public error: number;
        public club_id: number;
        public percent: number;
        public setInvitePercentMark: boolean;
        public static create(properties?: pb.IResponseSetClubInvitePercent): pb.ResponseSetClubInvitePercent;
        public static encode(m: pb.ResponseSetClubInvitePercent, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseSetClubInvitePercent, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseSetClubInvitePercent;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseSetClubInvitePercent;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseSetClubInvitePercent;
        public static toObject(m: pb.ResponseSetClubInvitePercent, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestQuerySendFairReport {
        club_id?: (number|null);
        game_uuid?: (number|null);
        room_uuid?: (number|null);
        room_uuid_js?: (string|null);
        game_uuid_js?: (string|null);
    }

    class RequestQuerySendFairReport implements IRequestQuerySendFairReport {
        constructor(p?: pb.IRequestQuerySendFairReport);
        public club_id: number;
        public game_uuid: number;
        public room_uuid: number;
        public room_uuid_js: string;
        public game_uuid_js: string;
        public static create(properties?: pb.IRequestQuerySendFairReport): pb.RequestQuerySendFairReport;
        public static encode(m: pb.RequestQuerySendFairReport, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestQuerySendFairReport, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestQuerySendFairReport;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestQuerySendFairReport;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestQuerySendFairReport;
        public static toObject(m: pb.RequestQuerySendFairReport, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseQuerySendFairReport {
        error?: (number|null);
        isfirst?: (number|null);
        isgoldenough?: (number|null);
        chargefee?: (number|null);
        freecounts?: (number|null);
        room_uuid_js?: (string|null);
        game_uuid_js?: (string|null);
    }

    class ResponseQuerySendFairReport implements IResponseQuerySendFairReport {
        constructor(p?: pb.IResponseQuerySendFairReport);
        public error: number;
        public isfirst: number;
        public isgoldenough: number;
        public chargefee: number;
        public freecounts: number;
        public room_uuid_js: string;
        public game_uuid_js: string;
        public static create(properties?: pb.IResponseQuerySendFairReport): pb.ResponseQuerySendFairReport;
        public static encode(m: pb.ResponseQuerySendFairReport, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseQuerySendFairReport, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseQuerySendFairReport;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseQuerySendFairReport;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseQuerySendFairReport;
        public static toObject(m: pb.ResponseQuerySendFairReport, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeLogin {
        playerid?: (number|null);
        gameid?: (number|null);
        roomid?: (number|null);
    }

    class NoticeLogin implements INoticeLogin {
        constructor(p?: pb.INoticeLogin);
        public playerid: number;
        public gameid: number;
        public roomid: number;
        public static create(properties?: pb.INoticeLogin): pb.NoticeLogin;
        public static encode(m: pb.NoticeLogin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeLogin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeLogin;
        public static toObject(m: pb.NoticeLogin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetWebToken {
        playerid?: (number|null);
        status?: (number|null);
        type?: (number|null);
    }

    class RequestGetWebToken implements IRequestGetWebToken {
        constructor(p?: pb.IRequestGetWebToken);
        public playerid: number;
        public status: number;
        public type: number;
        public static create(properties?: pb.IRequestGetWebToken): pb.RequestGetWebToken;
        public static encode(m: pb.RequestGetWebToken, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestGetWebToken, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestGetWebToken;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestGetWebToken;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestGetWebToken;
        public static toObject(m: pb.RequestGetWebToken, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetWebToken {
        error?: (number|null);
        playerid?: (number|null);
        token?: (string|null);
        status?: (number|null);
    }

    class ResponseGetWebToken implements IResponseGetWebToken {
        constructor(p?: pb.IResponseGetWebToken);
        public error: number;
        public playerid: number;
        public token: string;
        public status: number;
        public static create(properties?: pb.IResponseGetWebToken): pb.ResponseGetWebToken;
        public static encode(m: pb.ResponseGetWebToken, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseGetWebToken, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseGetWebToken;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseGetWebToken;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseGetWebToken;
        public static toObject(m: pb.ResponseGetWebToken, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICowBoyGameListRequest {
    }

    class CowBoyGameListRequest implements ICowBoyGameListRequest {
        constructor(p?: pb.ICowBoyGameListRequest);
        public static create(properties?: pb.ICowBoyGameListRequest): pb.CowBoyGameListRequest;
        public static encode(m: pb.CowBoyGameListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CowBoyGameListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CowBoyGameListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CowBoyGameListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CowBoyGameListRequest;
        public static toObject(m: pb.CowBoyGameListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICowBoyGameListResponse {
        error?: (number|null);
        games?: (pb.CowBoyGame[]|null);
        videoGames?: (pb.VideoCowboyGame[]|null);
    }

    class CowBoyGameListResponse implements ICowBoyGameListResponse {
        constructor(p?: pb.ICowBoyGameListResponse);
        public error: number;
        public games: pb.CowBoyGame[];
        public videoGames: pb.VideoCowboyGame[];
        public static create(properties?: pb.ICowBoyGameListResponse): pb.CowBoyGameListResponse;
        public static encode(m: pb.CowBoyGameListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CowBoyGameListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CowBoyGameListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CowBoyGameListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CowBoyGameListResponse;
        public static toObject(m: pb.CowBoyGameListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICowBoyGame {
        roomid?: (number|null);
        AmountLevel?: (number[]|null);
        playerNum?: (number|null);
        deskType?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        pictureVn?: (string[]|null);
    }

    class CowBoyGame implements ICowBoyGame {
        constructor(p?: pb.ICowBoyGame);
        public roomid: number;
        public AmountLevel: number[];
        public playerNum: number;
        public deskType: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public pictureVn: string[];
        public static create(properties?: pb.ICowBoyGame): pb.CowBoyGame;
        public static encode(m: pb.CowBoyGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CowBoyGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CowBoyGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CowBoyGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CowBoyGame;
        public static toObject(m: pb.CowBoyGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IVideoCowboyGameListRequest {
    }

    class VideoCowboyGameListRequest implements IVideoCowboyGameListRequest {
        constructor(p?: pb.IVideoCowboyGameListRequest);
        public static create(properties?: pb.IVideoCowboyGameListRequest): pb.VideoCowboyGameListRequest;
        public static encode(m: pb.VideoCowboyGameListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.VideoCowboyGameListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.VideoCowboyGameListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.VideoCowboyGameListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.VideoCowboyGameListRequest;
        public static toObject(m: pb.VideoCowboyGameListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IVideoCowboyGameListResponse {
        error?: (number|null);
        games?: (pb.VideoCowboyGame[]|null);
    }

    class VideoCowboyGameListResponse implements IVideoCowboyGameListResponse {
        constructor(p?: pb.IVideoCowboyGameListResponse);
        public error: number;
        public games: pb.VideoCowboyGame[];
        public static create(properties?: pb.IVideoCowboyGameListResponse): pb.VideoCowboyGameListResponse;
        public static encode(m: pb.VideoCowboyGameListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.VideoCowboyGameListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.VideoCowboyGameListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.VideoCowboyGameListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.VideoCowboyGameListResponse;
        public static toObject(m: pb.VideoCowboyGameListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IVideoCowboyGame {
        roomid?: (number|null);
        AmountLevel?: (number[]|null);
        playerNum?: (number|null);
        deskType?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        pictureVn?: (string[]|null);
    }

    class VideoCowboyGame implements IVideoCowboyGame {
        constructor(p?: pb.IVideoCowboyGame);
        public roomid: number;
        public AmountLevel: number[];
        public playerNum: number;
        public deskType: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public pictureVn: string[];
        public static create(properties?: pb.IVideoCowboyGame): pb.VideoCowboyGame;
        public static encode(m: pb.VideoCowboyGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.VideoCowboyGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.VideoCowboyGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.VideoCowboyGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.VideoCowboyGame;
        public static toObject(m: pb.VideoCowboyGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum MsgType {
        common = 0,
        medal = 1,
        mtt_game_start = 2,
        star_big_tip = 303
    }

    interface INoticeGlobalMessage {
        repeat_count?: (number|null);
        msg?: (string|null);
        source_type?: (pb.GameId[]|null);
        msg_type?: (pb.MsgType|null);
        mtt_id?: (number|null);
        mttGameName?: (string|null);
        mttRemainTime?: (number|null);
    }

    class NoticeGlobalMessage implements INoticeGlobalMessage {
        constructor(p?: pb.INoticeGlobalMessage);
        public repeat_count: number;
        public msg: string;
        public source_type: pb.GameId[];
        public msg_type: pb.MsgType;
        public mtt_id: number;
        public mttGameName: string;
        public mttRemainTime: number;
        public static create(properties?: pb.INoticeGlobalMessage): pb.NoticeGlobalMessage;
        public static encode(m: pb.NoticeGlobalMessage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGlobalMessage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGlobalMessage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGlobalMessage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGlobalMessage;
        public static toObject(m: pb.NoticeGlobalMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameStatusRequest {
        id?: (pb.GameId|null);
    }

    class GameStatusRequest implements IGameStatusRequest {
        constructor(p?: pb.IGameStatusRequest);
        public id: pb.GameId;
        public static create(properties?: pb.IGameStatusRequest): pb.GameStatusRequest;
        public static encode(m: pb.GameStatusRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GameStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GameStatusRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameStatusRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GameStatusRequest;
        public static toObject(m: pb.GameStatusRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameStatusResponse {
        status?: (number|null);
        id?: (pb.GameId|null);
    }

    class GameStatusResponse implements IGameStatusResponse {
        constructor(p?: pb.IGameStatusResponse);
        public status: number;
        public id: pb.GameId;
        public static create(properties?: pb.IGameStatusResponse): pb.GameStatusResponse;
        public static encode(m: pb.GameStatusResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GameStatusResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GameStatusResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameStatusResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GameStatusResponse;
        public static toObject(m: pb.GameStatusResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameStatusV2Request {
        id?: (pb.GameId|null);
    }

    class GameStatusV2Request implements IGameStatusV2Request {
        constructor(p?: pb.IGameStatusV2Request);
        public id: pb.GameId;
        public static create(properties?: pb.IGameStatusV2Request): pb.GameStatusV2Request;
        public static encode(m: pb.GameStatusV2Request, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GameStatusV2Request, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GameStatusV2Request;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameStatusV2Request;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GameStatusV2Request;
        public static toObject(m: pb.GameStatusV2Request, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameStatusV2Response {
        status?: (number|null);
        id?: (pb.GameId|null);
    }

    class GameStatusV2Response implements IGameStatusV2Response {
        constructor(p?: pb.IGameStatusV2Response);
        public status: number;
        public id: pb.GameId;
        public static create(properties?: pb.IGameStatusV2Response): pb.GameStatusV2Response;
        public static encode(m: pb.GameStatusV2Response, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GameStatusV2Response, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GameStatusV2Response;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameStatusV2Response;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GameStatusV2Response;
        public static toObject(m: pb.GameStatusV2Response, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHumanBoyGameListRequest {
    }

    class HumanBoyGameListRequest implements IHumanBoyGameListRequest {
        constructor(p?: pb.IHumanBoyGameListRequest);
        public static create(properties?: pb.IHumanBoyGameListRequest): pb.HumanBoyGameListRequest;
        public static encode(m: pb.HumanBoyGameListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.HumanBoyGameListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.HumanBoyGameListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.HumanBoyGameListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.HumanBoyGameListRequest;
        public static toObject(m: pb.HumanBoyGameListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHumanBoyGameListResponse {
        error?: (number|null);
        games?: (pb.HumanBoyGame[]|null);
    }

    class HumanBoyGameListResponse implements IHumanBoyGameListResponse {
        constructor(p?: pb.IHumanBoyGameListResponse);
        public error: number;
        public games: pb.HumanBoyGame[];
        public static create(properties?: pb.IHumanBoyGameListResponse): pb.HumanBoyGameListResponse;
        public static encode(m: pb.HumanBoyGameListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.HumanBoyGameListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.HumanBoyGameListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.HumanBoyGameListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.HumanBoyGameListResponse;
        public static toObject(m: pb.HumanBoyGameListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHumanBoyGame {
        roomid?: (number|null);
        AmountLevel?: (number[]|null);
        playerNum?: (number|null);
        deskType?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        pictureVn?: (string[]|null);
    }

    class HumanBoyGame implements IHumanBoyGame {
        constructor(p?: pb.IHumanBoyGame);
        public roomid: number;
        public AmountLevel: number[];
        public playerNum: number;
        public deskType: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public pictureVn: string[];
        public static create(properties?: pb.IHumanBoyGame): pb.HumanBoyGame;
        public static encode(m: pb.HumanBoyGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.HumanBoyGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.HumanBoyGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.HumanBoyGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.HumanBoyGame;
        public static toObject(m: pb.HumanBoyGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDepositInStrongboxRequest {
        amount?: (number|null);
        deposit_type?: (number|null);
    }

    class DepositInStrongboxRequest implements IDepositInStrongboxRequest {
        constructor(p?: pb.IDepositInStrongboxRequest);
        public amount: number;
        public deposit_type: number;
        public static create(properties?: pb.IDepositInStrongboxRequest): pb.DepositInStrongboxRequest;
        public static encode(m: pb.DepositInStrongboxRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DepositInStrongboxRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DepositInStrongboxRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DepositInStrongboxRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DepositInStrongboxRequest;
        public static toObject(m: pb.DepositInStrongboxRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDepositInStrongboxResponse {
        error?: (number|null);
        carry_gold?: (number|null);
        deposit_gold?: (number|null);
        operating_gold?: (number|null);
        deposit_type?: (number|null);
    }

    class DepositInStrongboxResponse implements IDepositInStrongboxResponse {
        constructor(p?: pb.IDepositInStrongboxResponse);
        public error: number;
        public carry_gold: number;
        public deposit_gold: number;
        public operating_gold: number;
        public deposit_type: number;
        public static create(properties?: pb.IDepositInStrongboxResponse): pb.DepositInStrongboxResponse;
        public static encode(m: pb.DepositInStrongboxResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DepositInStrongboxResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DepositInStrongboxResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DepositInStrongboxResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DepositInStrongboxResponse;
        public static toObject(m: pb.DepositInStrongboxResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITakeoutStrongboxRequest {
        amount?: (number|null);
        password?: (string|null);
        deposit_type?: (number|null);
    }

    class TakeoutStrongboxRequest implements ITakeoutStrongboxRequest {
        constructor(p?: pb.ITakeoutStrongboxRequest);
        public amount: number;
        public password: string;
        public deposit_type: number;
        public static create(properties?: pb.ITakeoutStrongboxRequest): pb.TakeoutStrongboxRequest;
        public static encode(m: pb.TakeoutStrongboxRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.TakeoutStrongboxRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.TakeoutStrongboxRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.TakeoutStrongboxRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.TakeoutStrongboxRequest;
        public static toObject(m: pb.TakeoutStrongboxRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITakeoutStrongboxResponse {
        error?: (number|null);
        carry_gold?: (number|null);
        deposit_gold?: (number|null);
        operating_gold?: (number|null);
        deposit_type?: (number|null);
    }

    class TakeoutStrongboxResponse implements ITakeoutStrongboxResponse {
        constructor(p?: pb.ITakeoutStrongboxResponse);
        public error: number;
        public carry_gold: number;
        public deposit_gold: number;
        public operating_gold: number;
        public deposit_type: number;
        public static create(properties?: pb.ITakeoutStrongboxResponse): pb.TakeoutStrongboxResponse;
        public static encode(m: pb.TakeoutStrongboxResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.TakeoutStrongboxResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.TakeoutStrongboxResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.TakeoutStrongboxResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.TakeoutStrongboxResponse;
        public static toObject(m: pb.TakeoutStrongboxResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStrongboxDetailRequest {
        deposit_type?: (number|null);
    }

    class StrongboxDetailRequest implements IStrongboxDetailRequest {
        constructor(p?: pb.IStrongboxDetailRequest);
        public deposit_type: number;
        public static create(properties?: pb.IStrongboxDetailRequest): pb.StrongboxDetailRequest;
        public static encode(m: pb.StrongboxDetailRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StrongboxDetailRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StrongboxDetailRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StrongboxDetailRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StrongboxDetailRequest;
        public static toObject(m: pb.StrongboxDetailRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStrongboxDetailResponse {
        error?: (number|null);
        list?: (pb.StrongboxDetail[]|null);
        deposit_type?: (number|null);
    }

    class StrongboxDetailResponse implements IStrongboxDetailResponse {
        constructor(p?: pb.IStrongboxDetailResponse);
        public error: number;
        public list: pb.StrongboxDetail[];
        public deposit_type: number;
        public static create(properties?: pb.IStrongboxDetailResponse): pb.StrongboxDetailResponse;
        public static encode(m: pb.StrongboxDetailResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StrongboxDetailResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StrongboxDetailResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StrongboxDetailResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StrongboxDetailResponse;
        public static toObject(m: pb.StrongboxDetailResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStrongboxDetail {
        time?: (number|null);
        type?: (number|null);
        amount?: (number|null);
        balance?: (number|null);
    }

    class StrongboxDetail implements IStrongboxDetail {
        constructor(p?: pb.IStrongboxDetail);
        public time: number;
        public type: number;
        public amount: number;
        public balance: number;
        public static create(properties?: pb.IStrongboxDetail): pb.StrongboxDetail;
        public static encode(m: pb.StrongboxDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StrongboxDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StrongboxDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StrongboxDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StrongboxDetail;
        public static toObject(m: pb.StrongboxDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetStrongboxInfoRequest {
    }

    class GetStrongboxInfoRequest implements IGetStrongboxInfoRequest {
        constructor(p?: pb.IGetStrongboxInfoRequest);
        public static create(properties?: pb.IGetStrongboxInfoRequest): pb.GetStrongboxInfoRequest;
        public static encode(m: pb.GetStrongboxInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetStrongboxInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetStrongboxInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetStrongboxInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetStrongboxInfoRequest;
        public static toObject(m: pb.GetStrongboxInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetStrongboxInfoResponse {
        error?: (number|null);
        carry_gold?: (number|null);
        deposit_gold?: (number|null);
        carry_usdt?: (number|null);
        deposit_usdt?: (number|null);
    }

    class GetStrongboxInfoResponse implements IGetStrongboxInfoResponse {
        constructor(p?: pb.IGetStrongboxInfoResponse);
        public error: number;
        public carry_gold: number;
        public deposit_gold: number;
        public carry_usdt: number;
        public deposit_usdt: number;
        public static create(properties?: pb.IGetStrongboxInfoResponse): pb.GetStrongboxInfoResponse;
        public static encode(m: pb.GetStrongboxInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetStrongboxInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetStrongboxInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetStrongboxInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetStrongboxInfoResponse;
        public static toObject(m: pb.GetStrongboxInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckDraw {
        id?: (number|null);
        amount_ranges?: (number[]|null);
        index?: (number|null);
        hands?: (number|null);
    }

    class LuckDraw implements ILuckDraw {
        constructor(p?: pb.ILuckDraw);
        public id: number;
        public amount_ranges: number[];
        public index: number;
        public hands: number;
        public static create(properties?: pb.ILuckDraw): pb.LuckDraw;
        public static encode(m: pb.LuckDraw, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckDraw, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckDraw;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckDraw;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckDraw;
        public static toObject(m: pb.LuckDraw, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckDrawDoneRequest {
        id?: (number|null);
    }

    class LuckDrawDoneRequest implements ILuckDrawDoneRequest {
        constructor(p?: pb.ILuckDrawDoneRequest);
        public id: number;
        public static create(properties?: pb.ILuckDrawDoneRequest): pb.LuckDrawDoneRequest;
        public static encode(m: pb.LuckDrawDoneRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckDrawDoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckDrawDoneRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckDrawDoneRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckDrawDoneRequest;
        public static toObject(m: pb.LuckDrawDoneRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckDrawDoneResponse {
        error?: (number|null);
    }

    class LuckDrawDoneResponse implements ILuckDrawDoneResponse {
        constructor(p?: pb.ILuckDrawDoneResponse);
        public error: number;
        public static create(properties?: pb.ILuckDrawDoneResponse): pb.LuckDrawDoneResponse;
        public static encode(m: pb.LuckDrawDoneResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckDrawDoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckDrawDoneResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckDrawDoneResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckDrawDoneResponse;
        public static toObject(m: pb.LuckDrawDoneResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckDrawNotice {
        lucks?: (pb.LuckDraw[]|null);
    }

    class LuckDrawNotice implements ILuckDrawNotice {
        constructor(p?: pb.ILuckDrawNotice);
        public lucks: pb.LuckDraw[];
        public static create(properties?: pb.ILuckDrawNotice): pb.LuckDrawNotice;
        public static encode(m: pb.LuckDrawNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckDrawNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckDrawNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckDrawNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckDrawNotice;
        public static toObject(m: pb.LuckDrawNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAofThouthandRequest {
        Playerid?: (number|null);
    }

    class AofThouthandRequest implements IAofThouthandRequest {
        constructor(p?: pb.IAofThouthandRequest);
        public Playerid: number;
        public static create(properties?: pb.IAofThouthandRequest): pb.AofThouthandRequest;
        public static encode(m: pb.AofThouthandRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AofThouthandRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AofThouthandRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AofThouthandRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AofThouthandRequest;
        public static toObject(m: pb.AofThouthandRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAofThouthandResponse {
        error?: (number|null);
        hand_num?: (number|null);
        LuckDrawsLen?: (number|null);
        PlayerHands?: (number[]|null);
        Hand_New?: (number|null);
    }

    class AofThouthandResponse implements IAofThouthandResponse {
        constructor(p?: pb.IAofThouthandResponse);
        public error: number;
        public hand_num: number;
        public LuckDrawsLen: number;
        public PlayerHands: number[];
        public Hand_New: number;
        public static create(properties?: pb.IAofThouthandResponse): pb.AofThouthandResponse;
        public static encode(m: pb.AofThouthandResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AofThouthandResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AofThouthandResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AofThouthandResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AofThouthandResponse;
        public static toObject(m: pb.AofThouthandResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackPotAof {
        blind_level?: (number|null);
        amount?: (number|null);
    }

    class JackPotAof implements IJackPotAof {
        constructor(p?: pb.IJackPotAof);
        public blind_level: number;
        public amount: number;
        public static create(properties?: pb.IJackPotAof): pb.JackPotAof;
        public static encode(m: pb.JackPotAof, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JackPotAof, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JackPotAof;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JackPotAof;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JackPotAof;
        public static toObject(m: pb.JackPotAof, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackPotListRequest {
    }

    class JackPotListRequest implements IJackPotListRequest {
        constructor(p?: pb.IJackPotListRequest);
        public static create(properties?: pb.IJackPotListRequest): pb.JackPotListRequest;
        public static encode(m: pb.JackPotListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JackPotListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JackPotListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JackPotListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JackPotListRequest;
        public static toObject(m: pb.JackPotListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackPotListResponse {
        jack_pot_lst?: (pb.JackPotAof[]|null);
        total_amount?: (number|null);
        short_jack_pot_lst?: (pb.JackPotAof[]|null);
        short_total_amount?: (number|null);
    }

    class JackPotListResponse implements IJackPotListResponse {
        constructor(p?: pb.IJackPotListResponse);
        public jack_pot_lst: pb.JackPotAof[];
        public total_amount: number;
        public short_jack_pot_lst: pb.JackPotAof[];
        public short_total_amount: number;
        public static create(properties?: pb.IJackPotListResponse): pb.JackPotListResponse;
        public static encode(m: pb.JackPotListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JackPotListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JackPotListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JackPotListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JackPotListResponse;
        public static toObject(m: pb.JackPotListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICheckSafeRequest {
        safe?: (string|null);
    }

    class CheckSafeRequest implements ICheckSafeRequest {
        constructor(p?: pb.ICheckSafeRequest);
        public safe: string;
        public static create(properties?: pb.ICheckSafeRequest): pb.CheckSafeRequest;
        public static encode(m: pb.CheckSafeRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CheckSafeRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CheckSafeRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CheckSafeRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CheckSafeRequest;
        public static toObject(m: pb.CheckSafeRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICheckSafeResponse {
        error?: (number|null);
    }

    class CheckSafeResponse implements ICheckSafeResponse {
        constructor(p?: pb.ICheckSafeResponse);
        public error: number;
        public static create(properties?: pb.ICheckSafeResponse): pb.CheckSafeResponse;
        public static encode(m: pb.CheckSafeResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CheckSafeResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CheckSafeResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CheckSafeResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CheckSafeResponse;
        public static toObject(m: pb.CheckSafeResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITurntableItem {
        amount?: (number|null);
        currency_type?: (number|null);
        goods_id?: (number|null);
    }

    class TurntableItem implements ITurntableItem {
        constructor(p?: pb.ITurntableItem);
        public amount: number;
        public currency_type: number;
        public goods_id: number;
        public static create(properties?: pb.ITurntableItem): pb.TurntableItem;
        public static encode(m: pb.TurntableItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.TurntableItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.TurntableItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.TurntableItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.TurntableItem;
        public static toObject(m: pb.TurntableItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableDraw {
        record_id?: (number|null);
        amount_index?: (number|null);
        amount_list?: (pb.TurntableItem[]|null);
        award_type?: (number|null);
        currency_type?: (number|null);
        goods_desc?: (string|null);
    }

    class LuckTurntableDraw implements ILuckTurntableDraw {
        constructor(p?: pb.ILuckTurntableDraw);
        public record_id: number;
        public amount_index: number;
        public amount_list: pb.TurntableItem[];
        public award_type: number;
        public currency_type: number;
        public goods_desc: string;
        public static create(properties?: pb.ILuckTurntableDraw): pb.LuckTurntableDraw;
        public static encode(m: pb.LuckTurntableDraw, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableDraw, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableDraw;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableDraw;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableDraw;
        public static toObject(m: pb.LuckTurntableDraw, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableDrawNotice {
        draw_list?: (pb.LuckTurntableDraw[]|null);
    }

    class LuckTurntableDrawNotice implements ILuckTurntableDrawNotice {
        constructor(p?: pb.ILuckTurntableDrawNotice);
        public draw_list: pb.LuckTurntableDraw[];
        public static create(properties?: pb.ILuckTurntableDrawNotice): pb.LuckTurntableDrawNotice;
        public static encode(m: pb.LuckTurntableDrawNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableDrawNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableDrawNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableDrawNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableDrawNotice;
        public static toObject(m: pb.LuckTurntableDrawNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableResultRequest {
        record_id?: (number|null);
    }

    class LuckTurntableResultRequest implements ILuckTurntableResultRequest {
        constructor(p?: pb.ILuckTurntableResultRequest);
        public record_id: number;
        public static create(properties?: pb.ILuckTurntableResultRequest): pb.LuckTurntableResultRequest;
        public static encode(m: pb.LuckTurntableResultRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableResultRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableResultRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableResultRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableResultRequest;
        public static toObject(m: pb.LuckTurntableResultRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableResultResponse {
        error?: (number|null);
        currency_type?: (number|null);
        amount?: (number|null);
    }

    class LuckTurntableResultResponse implements ILuckTurntableResultResponse {
        constructor(p?: pb.ILuckTurntableResultResponse);
        public error: number;
        public currency_type: number;
        public amount: number;
        public static create(properties?: pb.ILuckTurntableResultResponse): pb.LuckTurntableResultResponse;
        public static encode(m: pb.LuckTurntableResultResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableResultResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableResultResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableResultResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableResultResponse;
        public static toObject(m: pb.LuckTurntableResultResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableResultNotice {
        uid?: (number|null);
        currency_type?: (number|null);
        amount?: (number|null);
    }

    class LuckTurntableResultNotice implements ILuckTurntableResultNotice {
        constructor(p?: pb.ILuckTurntableResultNotice);
        public uid: number;
        public currency_type: number;
        public amount: number;
        public static create(properties?: pb.ILuckTurntableResultNotice): pb.LuckTurntableResultNotice;
        public static encode(m: pb.LuckTurntableResultNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableResultNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableResultNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableResultNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableResultNotice;
        public static toObject(m: pb.LuckTurntableResultNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableReadyNotice {
        left_interval_time?: (number|null);
    }

    class LuckTurntableReadyNotice implements ILuckTurntableReadyNotice {
        constructor(p?: pb.ILuckTurntableReadyNotice);
        public left_interval_time: number;
        public static create(properties?: pb.ILuckTurntableReadyNotice): pb.LuckTurntableReadyNotice;
        public static encode(m: pb.LuckTurntableReadyNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableReadyNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableReadyNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableReadyNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableReadyNotice;
        public static toObject(m: pb.LuckTurntableReadyNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableOverNotice {
        error?: (number|null);
    }

    class LuckTurntableOverNotice implements ILuckTurntableOverNotice {
        constructor(p?: pb.ILuckTurntableOverNotice);
        public error: number;
        public static create(properties?: pb.ILuckTurntableOverNotice): pb.LuckTurntableOverNotice;
        public static encode(m: pb.LuckTurntableOverNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableOverNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableOverNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableOverNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableOverNotice;
        public static toObject(m: pb.LuckTurntableOverNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableStartTimeNotice {
        title?: (string|null);
        content?: (string|null);
        text?: (string|null);
        share_image_url?: (string|null);
    }

    class LuckTurntableStartTimeNotice implements ILuckTurntableStartTimeNotice {
        constructor(p?: pb.ILuckTurntableStartTimeNotice);
        public title: string;
        public content: string;
        public text: string;
        public share_image_url: string;
        public static create(properties?: pb.ILuckTurntableStartTimeNotice): pb.LuckTurntableStartTimeNotice;
        public static encode(m: pb.LuckTurntableStartTimeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableStartTimeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableStartTimeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableStartTimeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableStartTimeNotice;
        public static toObject(m: pb.LuckTurntableStartTimeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableEndTimeNotice {
        error?: (number|null);
    }

    class LuckTurntableEndTimeNotice implements ILuckTurntableEndTimeNotice {
        constructor(p?: pb.ILuckTurntableEndTimeNotice);
        public error: number;
        public static create(properties?: pb.ILuckTurntableEndTimeNotice): pb.LuckTurntableEndTimeNotice;
        public static encode(m: pb.LuckTurntableEndTimeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableEndTimeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableEndTimeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableEndTimeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableEndTimeNotice;
        public static toObject(m: pb.LuckTurntableEndTimeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableSnaplistRequest {
        lamp_cnt?: (number|null);
        record_cnt?: (number|null);
    }

    class LuckTurntableSnaplistRequest implements ILuckTurntableSnaplistRequest {
        constructor(p?: pb.ILuckTurntableSnaplistRequest);
        public lamp_cnt: number;
        public record_cnt: number;
        public static create(properties?: pb.ILuckTurntableSnaplistRequest): pb.LuckTurntableSnaplistRequest;
        public static encode(m: pb.LuckTurntableSnaplistRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableSnaplistRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableSnaplistRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableSnaplistRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableSnaplistRequest;
        public static toObject(m: pb.LuckTurntableSnaplistRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableSnaplistResponse {
        error?: (number|null);
    }

    class LuckTurntableSnaplistResponse implements ILuckTurntableSnaplistResponse {
        constructor(p?: pb.ILuckTurntableSnaplistResponse);
        public error: number;
        public static create(properties?: pb.ILuckTurntableSnaplistResponse): pb.LuckTurntableSnaplistResponse;
        public static encode(m: pb.LuckTurntableSnaplistResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableSnaplistResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableSnaplistResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableSnaplistResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableSnaplistResponse;
        public static toObject(m: pb.LuckTurntableSnaplistResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableLamp {
        game_type?: (number|null);
        nick_name?: (string|null);
        amount?: (number|null);
        room_name?: (string|null);
        currency_type?: (number|null);
        goods_id?: (number|null);
        goods_desc?: (string|null);
    }

    class LuckTurntableLamp implements ILuckTurntableLamp {
        constructor(p?: pb.ILuckTurntableLamp);
        public game_type: number;
        public nick_name: string;
        public amount: number;
        public room_name: string;
        public currency_type: number;
        public goods_id: number;
        public goods_desc: string;
        public static create(properties?: pb.ILuckTurntableLamp): pb.LuckTurntableLamp;
        public static encode(m: pb.LuckTurntableLamp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableLamp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableLamp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableLamp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableLamp;
        public static toObject(m: pb.LuckTurntableLamp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableData {
        seq_num?: (number|null);
        nick_name?: (string|null);
        amount?: (number|null);
        lottery_time?: (number|null);
        currency_type?: (number|null);
        goods_id?: (number|null);
        goods_desc?: (string|null);
    }

    class LuckTurntableData implements ILuckTurntableData {
        constructor(p?: pb.ILuckTurntableData);
        public seq_num: number;
        public nick_name: string;
        public amount: number;
        public lottery_time: number;
        public currency_type: number;
        public goods_id: number;
        public goods_desc: string;
        public static create(properties?: pb.ILuckTurntableData): pb.LuckTurntableData;
        public static encode(m: pb.LuckTurntableData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableData;
        public static toObject(m: pb.LuckTurntableData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableSnaplistNotice {
        lamp_list?: (pb.LuckTurntableLamp[]|null);
        record_list?: (pb.LuckTurntableData[]|null);
    }

    class LuckTurntableSnaplistNotice implements ILuckTurntableSnaplistNotice {
        constructor(p?: pb.ILuckTurntableSnaplistNotice);
        public lamp_list: pb.LuckTurntableLamp[];
        public record_list: pb.LuckTurntableData[];
        public static create(properties?: pb.ILuckTurntableSnaplistNotice): pb.LuckTurntableSnaplistNotice;
        public static encode(m: pb.LuckTurntableSnaplistNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableSnaplistNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableSnaplistNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableSnaplistNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableSnaplistNotice;
        public static toObject(m: pb.LuckTurntableSnaplistNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckTurntableCountdownNotice {
        left_interval_time?: (number|null);
    }

    class LuckTurntableCountdownNotice implements ILuckTurntableCountdownNotice {
        constructor(p?: pb.ILuckTurntableCountdownNotice);
        public left_interval_time: number;
        public static create(properties?: pb.ILuckTurntableCountdownNotice): pb.LuckTurntableCountdownNotice;
        public static encode(m: pb.LuckTurntableCountdownNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LuckTurntableCountdownNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LuckTurntableCountdownNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LuckTurntableCountdownNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LuckTurntableCountdownNotice;
        public static toObject(m: pb.LuckTurntableCountdownNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBannerRequest {
        language?: (pb.LanguageType|null);
        languageStr?: (string|null);
    }

    class BannerRequest implements IBannerRequest {
        constructor(p?: pb.IBannerRequest);
        public language: pb.LanguageType;
        public languageStr: string;
        public static create(properties?: pb.IBannerRequest): pb.BannerRequest;
        public static encode(m: pb.BannerRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BannerRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BannerRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BannerRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BannerRequest;
        public static toObject(m: pb.BannerRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBannerResponse {
        banner_json?: (string|null);
    }

    class BannerResponse implements IBannerResponse {
        constructor(p?: pb.IBannerResponse);
        public banner_json: string;
        public static create(properties?: pb.IBannerResponse): pb.BannerResponse;
        public static encode(m: pb.BannerResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BannerResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BannerResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BannerResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BannerResponse;
        public static toObject(m: pb.BannerResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagDrawHistory {
        rdb_id?: (number|null);
        uid?: (number|null);
        name?: (string|null);
        head_url?: (string|null);
        draw_amount?: (number|null);
        boom_amount?: (number|null);
        draw_time?: (number|null);
        jp_amount?: (number|null);
        rdb_name?: (string|null);
        boom_percent?: (number|null);
        boom_number?: (number|null);
    }

    class RedBagDrawHistory implements IRedBagDrawHistory {
        constructor(p?: pb.IRedBagDrawHistory);
        public rdb_id: number;
        public uid: number;
        public name: string;
        public head_url: string;
        public draw_amount: number;
        public boom_amount: number;
        public draw_time: number;
        public jp_amount: number;
        public rdb_name: string;
        public boom_percent: number;
        public boom_number: number;
        public static create(properties?: pb.IRedBagDrawHistory): pb.RedBagDrawHistory;
        public static encode(m: pb.RedBagDrawHistory, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagDrawHistory, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagDrawHistory;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagDrawHistory;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagDrawHistory;
        public static toObject(m: pb.RedBagDrawHistory, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagInfo {
        rdb_id?: (number|null);
        rdb_name?: (string|null);
        rdb_amount_level?: (number|null);
        creater_uid?: (number|null);
        creater_name?: (string|null);
        creater_head_url?: (string|null);
        create_time?: (number|null);
        boom_number?: (number|null);
        status?: (number|null);
        draw_count?: (number|null);
        is_drawed?: (boolean|null);
        access_time?: (number|null);
    }

    class RedBagInfo implements IRedBagInfo {
        constructor(p?: pb.IRedBagInfo);
        public rdb_id: number;
        public rdb_name: string;
        public rdb_amount_level: number;
        public creater_uid: number;
        public creater_name: string;
        public creater_head_url: string;
        public create_time: number;
        public boom_number: number;
        public status: number;
        public draw_count: number;
        public is_drawed: boolean;
        public access_time: number;
        public static create(properties?: pb.IRedBagInfo): pb.RedBagInfo;
        public static encode(m: pb.RedBagInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagInfo;
        public static toObject(m: pb.RedBagInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICreateRedBagRequest {
        rdb_amount_level?: (number|null);
        boom_number?: (number|null);
    }

    class CreateRedBagRequest implements ICreateRedBagRequest {
        constructor(p?: pb.ICreateRedBagRequest);
        public rdb_amount_level: number;
        public boom_number: number;
        public static create(properties?: pb.ICreateRedBagRequest): pb.CreateRedBagRequest;
        public static encode(m: pb.CreateRedBagRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CreateRedBagRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CreateRedBagRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CreateRedBagRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CreateRedBagRequest;
        public static toObject(m: pb.CreateRedBagRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICreateRedBagReponse {
        error?: (number|null);
        rdb_id?: (number|null);
    }

    class CreateRedBagReponse implements ICreateRedBagReponse {
        constructor(p?: pb.ICreateRedBagReponse);
        public error: number;
        public rdb_id: number;
        public static create(properties?: pb.ICreateRedBagReponse): pb.CreateRedBagReponse;
        public static encode(m: pb.CreateRedBagReponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CreateRedBagReponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CreateRedBagReponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CreateRedBagReponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CreateRedBagReponse;
        public static toObject(m: pb.CreateRedBagReponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagTemplet {
        amount?: (number|null);
        count?: (number|null);
        name?: (string|null);
        min_amount?: (number|null);
        max_amount?: (number|null);
        required_amount?: (number|null);
    }

    class RedBagTemplet implements IRedBagTemplet {
        constructor(p?: pb.IRedBagTemplet);
        public amount: number;
        public count: number;
        public name: string;
        public min_amount: number;
        public max_amount: number;
        public required_amount: number;
        public static create(properties?: pb.IRedBagTemplet): pb.RedBagTemplet;
        public static encode(m: pb.RedBagTemplet, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagTemplet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagTemplet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagTemplet;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagTemplet;
        public static toObject(m: pb.RedBagTemplet, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagNotice {
        open?: (boolean|null);
        clear?: (boolean|null);
        listen_amount?: (number|null);
        templets?: (pb.RedBagTemplet[]|null);
        redbags?: (pb.RedBagInfo[]|null);
        title?: (string|null);
        content?: (string|null);
    }

    class RedBagNotice implements IRedBagNotice {
        constructor(p?: pb.IRedBagNotice);
        public open: boolean;
        public clear: boolean;
        public listen_amount: number;
        public templets: pb.RedBagTemplet[];
        public redbags: pb.RedBagInfo[];
        public title: string;
        public content: string;
        public static create(properties?: pb.IRedBagNotice): pb.RedBagNotice;
        public static encode(m: pb.RedBagNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagNotice;
        public static toObject(m: pb.RedBagNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagInfoRequest {
    }

    class RedBagInfoRequest implements IRedBagInfoRequest {
        constructor(p?: pb.IRedBagInfoRequest);
        public static create(properties?: pb.IRedBagInfoRequest): pb.RedBagInfoRequest;
        public static encode(m: pb.RedBagInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagInfoRequest;
        public static toObject(m: pb.RedBagInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagInfoResponse {
        error?: (number|null);
    }

    class RedBagInfoResponse implements IRedBagInfoResponse {
        constructor(p?: pb.IRedBagInfoResponse);
        public error: number;
        public static create(properties?: pb.IRedBagInfoResponse): pb.RedBagInfoResponse;
        public static encode(m: pb.RedBagInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagInfoResponse;
        public static toObject(m: pb.RedBagInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagSetAmountRequest {
        amount?: (number|null);
    }

    class RedBagSetAmountRequest implements IRedBagSetAmountRequest {
        constructor(p?: pb.IRedBagSetAmountRequest);
        public amount: number;
        public static create(properties?: pb.IRedBagSetAmountRequest): pb.RedBagSetAmountRequest;
        public static encode(m: pb.RedBagSetAmountRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagSetAmountRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagSetAmountRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagSetAmountRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagSetAmountRequest;
        public static toObject(m: pb.RedBagSetAmountRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagSetAmountResponse {
        error?: (number|null);
        amount?: (number|null);
    }

    class RedBagSetAmountResponse implements IRedBagSetAmountResponse {
        constructor(p?: pb.IRedBagSetAmountResponse);
        public error: number;
        public amount: number;
        public static create(properties?: pb.IRedBagSetAmountResponse): pb.RedBagSetAmountResponse;
        public static encode(m: pb.RedBagSetAmountResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagSetAmountResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagSetAmountResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagSetAmountResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagSetAmountResponse;
        public static toObject(m: pb.RedBagSetAmountResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagDrawRequest {
        rdb_id?: (number|null);
    }

    class RedBagDrawRequest implements IRedBagDrawRequest {
        constructor(p?: pb.IRedBagDrawRequest);
        public rdb_id: number;
        public static create(properties?: pb.IRedBagDrawRequest): pb.RedBagDrawRequest;
        public static encode(m: pb.RedBagDrawRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagDrawRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagDrawRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagDrawRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagDrawRequest;
        public static toObject(m: pb.RedBagDrawRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagDrawResponse {
        error?: (number|null);
        rdb_id?: (number|null);
        status?: (number|null);
        historys?: (pb.RedBagDrawHistory|null);
    }

    class RedBagDrawResponse implements IRedBagDrawResponse {
        constructor(p?: pb.IRedBagDrawResponse);
        public error: number;
        public rdb_id: number;
        public status: number;
        public historys?: (pb.RedBagDrawHistory|null);
        public static create(properties?: pb.IRedBagDrawResponse): pb.RedBagDrawResponse;
        public static encode(m: pb.RedBagDrawResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagDrawResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagDrawResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagDrawResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagDrawResponse;
        public static toObject(m: pb.RedBagDrawResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagOpenNotice {
        open?: (boolean|null);
        templets?: (pb.RedBagTemplet[]|null);
        title?: (string|null);
        content?: (string|null);
    }

    class RedBagOpenNotice implements IRedBagOpenNotice {
        constructor(p?: pb.IRedBagOpenNotice);
        public open: boolean;
        public templets: pb.RedBagTemplet[];
        public title: string;
        public content: string;
        public static create(properties?: pb.IRedBagOpenNotice): pb.RedBagOpenNotice;
        public static encode(m: pb.RedBagOpenNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagOpenNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagOpenNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagOpenNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagOpenNotice;
        public static toObject(m: pb.RedBagOpenNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagHistoryRequest {
        rdb_id?: (number|null);
    }

    class RedBagHistoryRequest implements IRedBagHistoryRequest {
        constructor(p?: pb.IRedBagHistoryRequest);
        public rdb_id: number;
        public static create(properties?: pb.IRedBagHistoryRequest): pb.RedBagHistoryRequest;
        public static encode(m: pb.RedBagHistoryRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagHistoryRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagHistoryRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagHistoryRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagHistoryRequest;
        public static toObject(m: pb.RedBagHistoryRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagDraewdInfo {
        rdb_id?: (number|null);
        status?: (number|null);
        rdb_name?: (string|null);
        boom_count?: (number|null);
        boom_amount?: (number|null);
        drawed_count?: (number|null);
        drawed_amount?: (number|null);
        creator_id?: (number|null);
    }

    class RedBagDraewdInfo implements IRedBagDraewdInfo {
        constructor(p?: pb.IRedBagDraewdInfo);
        public rdb_id: number;
        public status: number;
        public rdb_name: string;
        public boom_count: number;
        public boom_amount: number;
        public drawed_count: number;
        public drawed_amount: number;
        public creator_id: number;
        public static create(properties?: pb.IRedBagDraewdInfo): pb.RedBagDraewdInfo;
        public static encode(m: pb.RedBagDraewdInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagDraewdInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagDraewdInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagDraewdInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagDraewdInfo;
        public static toObject(m: pb.RedBagDraewdInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagHistoryResponse {
        error?: (number|null);
        rdb_id?: (number|null);
        status?: (number|null);
        historys?: (pb.RedBagDrawHistory[]|null);
        info?: (pb.RedBagDraewdInfo|null);
        detail?: (pb.RedBagInfo|null);
    }

    class RedBagHistoryResponse implements IRedBagHistoryResponse {
        constructor(p?: pb.IRedBagHistoryResponse);
        public error: number;
        public rdb_id: number;
        public status: number;
        public historys: pb.RedBagDrawHistory[];
        public info?: (pb.RedBagDraewdInfo|null);
        public detail?: (pb.RedBagInfo|null);
        public static create(properties?: pb.IRedBagHistoryResponse): pb.RedBagHistoryResponse;
        public static encode(m: pb.RedBagHistoryResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagHistoryResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagHistoryResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagHistoryResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagHistoryResponse;
        public static toObject(m: pb.RedBagHistoryResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotifyRedBagBoom2Creater {
        rdb_id?: (number|null);
        rdb_name?: (string|null);
        boom_amount?: (number|null);
        boom_number?: (number|null);
        boom_percent?: (number|null);
        jp_amount?: (number|null);
        boom_count?: (number|null);
    }

    class NotifyRedBagBoom2Creater implements INotifyRedBagBoom2Creater {
        constructor(p?: pb.INotifyRedBagBoom2Creater);
        public rdb_id: number;
        public rdb_name: string;
        public boom_amount: number;
        public boom_number: number;
        public boom_percent: number;
        public jp_amount: number;
        public boom_count: number;
        public static create(properties?: pb.INotifyRedBagBoom2Creater): pb.NotifyRedBagBoom2Creater;
        public static encode(m: pb.NotifyRedBagBoom2Creater, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NotifyRedBagBoom2Creater, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NotifyRedBagBoom2Creater;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NotifyRedBagBoom2Creater;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NotifyRedBagBoom2Creater;
        public static toObject(m: pb.NotifyRedBagBoom2Creater, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagCreateHistory {
        rdb_id?: (number|null);
        create_time?: (number|null);
        rdb_name?: (string|null);
        rdb_amount_level?: (number|null);
        left_amount?: (number|null);
        draw_count?: (number|null);
        left_count?: (number|null);
        boom_count?: (number|null);
        boom_amount?: (number|null);
    }

    class RedBagCreateHistory implements IRedBagCreateHistory {
        constructor(p?: pb.IRedBagCreateHistory);
        public rdb_id: number;
        public create_time: number;
        public rdb_name: string;
        public rdb_amount_level: number;
        public left_amount: number;
        public draw_count: number;
        public left_count: number;
        public boom_count: number;
        public boom_amount: number;
        public static create(properties?: pb.IRedBagCreateHistory): pb.RedBagCreateHistory;
        public static encode(m: pb.RedBagCreateHistory, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagCreateHistory, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagCreateHistory;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagCreateHistory;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagCreateHistory;
        public static toObject(m: pb.RedBagCreateHistory, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagStatusRequest {
        rdb_id?: (number|null);
    }

    class RedBagStatusRequest implements IRedBagStatusRequest {
        constructor(p?: pb.IRedBagStatusRequest);
        public rdb_id: number;
        public static create(properties?: pb.IRedBagStatusRequest): pb.RedBagStatusRequest;
        public static encode(m: pb.RedBagStatusRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagStatusRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagStatusRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagStatusRequest;
        public static toObject(m: pb.RedBagStatusRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagStatusResponse {
        status?: (number|null);
        rdb_id?: (number|null);
        is_drawed?: (boolean|null);
    }

    class RedBagStatusResponse implements IRedBagStatusResponse {
        constructor(p?: pb.IRedBagStatusResponse);
        public status: number;
        public rdb_id: number;
        public is_drawed: boolean;
        public static create(properties?: pb.IRedBagStatusResponse): pb.RedBagStatusResponse;
        public static encode(m: pb.RedBagStatusResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagStatusResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagStatusResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagStatusResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagStatusResponse;
        public static toObject(m: pb.RedBagStatusResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoRedBagDrawRequest {
        auto_count?: (number|null);
    }

    class AutoRedBagDrawRequest implements IAutoRedBagDrawRequest {
        constructor(p?: pb.IAutoRedBagDrawRequest);
        public auto_count: number;
        public static create(properties?: pb.IAutoRedBagDrawRequest): pb.AutoRedBagDrawRequest;
        public static encode(m: pb.AutoRedBagDrawRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AutoRedBagDrawRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AutoRedBagDrawRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AutoRedBagDrawRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AutoRedBagDrawRequest;
        public static toObject(m: pb.AutoRedBagDrawRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoRedBagDrawResponse {
        error?: (number|null);
        auto_count?: (number|null);
        historys?: (pb.RedBagDrawHistory[]|null);
    }

    class AutoRedBagDrawResponse implements IAutoRedBagDrawResponse {
        constructor(p?: pb.IAutoRedBagDrawResponse);
        public error: number;
        public auto_count: number;
        public historys: pb.RedBagDrawHistory[];
        public static create(properties?: pb.IAutoRedBagDrawResponse): pb.AutoRedBagDrawResponse;
        public static encode(m: pb.AutoRedBagDrawResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AutoRedBagDrawResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AutoRedBagDrawResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AutoRedBagDrawResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AutoRedBagDrawResponse;
        public static toObject(m: pb.AutoRedBagDrawResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDrawedRedBag2CreatorNotice {
        historys?: (pb.RedBagDrawHistory|null);
        info?: (pb.RedBagDraewdInfo|null);
    }

    class DrawedRedBag2CreatorNotice implements IDrawedRedBag2CreatorNotice {
        constructor(p?: pb.IDrawedRedBag2CreatorNotice);
        public historys?: (pb.RedBagDrawHistory|null);
        public info?: (pb.RedBagDraewdInfo|null);
        public static create(properties?: pb.IDrawedRedBag2CreatorNotice): pb.DrawedRedBag2CreatorNotice;
        public static encode(m: pb.DrawedRedBag2CreatorNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DrawedRedBag2CreatorNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DrawedRedBag2CreatorNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DrawedRedBag2CreatorNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DrawedRedBag2CreatorNotice;
        public static toObject(m: pb.DrawedRedBag2CreatorNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILastRedbagInfoRequest {
    }

    class LastRedbagInfoRequest implements ILastRedbagInfoRequest {
        constructor(p?: pb.ILastRedbagInfoRequest);
        public static create(properties?: pb.ILastRedbagInfoRequest): pb.LastRedbagInfoRequest;
        public static encode(m: pb.LastRedbagInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LastRedbagInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LastRedbagInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LastRedbagInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LastRedbagInfoRequest;
        public static toObject(m: pb.LastRedbagInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILastRedbagInfoResponse {
        error?: (number|null);
        create_historys?: (pb.RedBagCreateHistory[]|null);
        draw_historys?: (pb.RedBagDrawHistory[]|null);
    }

    class LastRedbagInfoResponse implements ILastRedbagInfoResponse {
        constructor(p?: pb.ILastRedbagInfoResponse);
        public error: number;
        public create_historys: pb.RedBagCreateHistory[];
        public draw_historys: pb.RedBagDrawHistory[];
        public static create(properties?: pb.ILastRedbagInfoResponse): pb.LastRedbagInfoResponse;
        public static encode(m: pb.LastRedbagInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LastRedbagInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LastRedbagInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LastRedbagInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LastRedbagInfoResponse;
        public static toObject(m: pb.LastRedbagInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagJackpotRequest {
    }

    class RedBagJackpotRequest implements IRedBagJackpotRequest {
        constructor(p?: pb.IRedBagJackpotRequest);
        public static create(properties?: pb.IRedBagJackpotRequest): pb.RedBagJackpotRequest;
        public static encode(m: pb.RedBagJackpotRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagJackpotRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagJackpotRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagJackpotRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagJackpotRequest;
        public static toObject(m: pb.RedBagJackpotRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagJackpotTemplate {
        number?: (number|null);
        count?: (number|null);
        percent?: (number|null);
        number_string?: (string|null);
    }

    class RedBagJackpotTemplate implements IRedBagJackpotTemplate {
        constructor(p?: pb.IRedBagJackpotTemplate);
        public number: number;
        public count: number;
        public percent: number;
        public number_string: string;
        public static create(properties?: pb.IRedBagJackpotTemplate): pb.RedBagJackpotTemplate;
        public static encode(m: pb.RedBagJackpotTemplate, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagJackpotTemplate, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagJackpotTemplate;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagJackpotTemplate;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagJackpotTemplate;
        public static toObject(m: pb.RedBagJackpotTemplate, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagJackpotAmount {
        amount_level?: (number|null);
        jackpot_amount?: (number|null);
    }

    class RedBagJackpotAmount implements IRedBagJackpotAmount {
        constructor(p?: pb.IRedBagJackpotAmount);
        public amount_level: number;
        public jackpot_amount: number;
        public static create(properties?: pb.IRedBagJackpotAmount): pb.RedBagJackpotAmount;
        public static encode(m: pb.RedBagJackpotAmount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagJackpotAmount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagJackpotAmount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagJackpotAmount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagJackpotAmount;
        public static toObject(m: pb.RedBagJackpotAmount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagJackpotRecord {
        amount_level?: (number|null);
        uid?: (number|null);
        nick_name?: (string|null);
        redbag_amount?: (number|null);
        award_amount?: (number|null);
        time?: (number|null);
    }

    class RedBagJackpotRecord implements IRedBagJackpotRecord {
        constructor(p?: pb.IRedBagJackpotRecord);
        public amount_level: number;
        public uid: number;
        public nick_name: string;
        public redbag_amount: number;
        public award_amount: number;
        public time: number;
        public static create(properties?: pb.IRedBagJackpotRecord): pb.RedBagJackpotRecord;
        public static encode(m: pb.RedBagJackpotRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagJackpotRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagJackpotRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagJackpotRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagJackpotRecord;
        public static toObject(m: pb.RedBagJackpotRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagJackpotInfoRequest {
    }

    class RedBagJackpotInfoRequest implements IRedBagJackpotInfoRequest {
        constructor(p?: pb.IRedBagJackpotInfoRequest);
        public static create(properties?: pb.IRedBagJackpotInfoRequest): pb.RedBagJackpotInfoRequest;
        public static encode(m: pb.RedBagJackpotInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagJackpotInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagJackpotInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagJackpotInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagJackpotInfoRequest;
        public static toObject(m: pb.RedBagJackpotInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagJackpotInfoResponse {
        error?: (number|null);
        jackpot_templates?: (pb.RedBagJackpotTemplate[]|null);
        jackpot_amount?: (pb.RedBagJackpotAmount[]|null);
        jackpot_records?: (pb.RedBagJackpotRecord[]|null);
    }

    class RedBagJackpotInfoResponse implements IRedBagJackpotInfoResponse {
        constructor(p?: pb.IRedBagJackpotInfoResponse);
        public error: number;
        public jackpot_templates: pb.RedBagJackpotTemplate[];
        public jackpot_amount: pb.RedBagJackpotAmount[];
        public jackpot_records: pb.RedBagJackpotRecord[];
        public static create(properties?: pb.IRedBagJackpotInfoResponse): pb.RedBagJackpotInfoResponse;
        public static encode(m: pb.RedBagJackpotInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagJackpotInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagJackpotInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagJackpotInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagJackpotInfoResponse;
        public static toObject(m: pb.RedBagJackpotInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedbagStatisticsInfoRequest {
    }

    class RedbagStatisticsInfoRequest implements IRedbagStatisticsInfoRequest {
        constructor(p?: pb.IRedbagStatisticsInfoRequest);
        public static create(properties?: pb.IRedbagStatisticsInfoRequest): pb.RedbagStatisticsInfoRequest;
        public static encode(m: pb.RedbagStatisticsInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedbagStatisticsInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedbagStatisticsInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedbagStatisticsInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedbagStatisticsInfoRequest;
        public static toObject(m: pb.RedbagStatisticsInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedbagStatisticsInfoResponse {
        error?: (number|null);
        JoinNumber?: (number|null);
        create_number?: (number|null);
        booms?: (string[]|null);
    }

    class RedbagStatisticsInfoResponse implements IRedbagStatisticsInfoResponse {
        constructor(p?: pb.IRedbagStatisticsInfoResponse);
        public error: number;
        public JoinNumber: number;
        public create_number: number;
        public booms: string[];
        public static create(properties?: pb.IRedbagStatisticsInfoResponse): pb.RedbagStatisticsInfoResponse;
        public static encode(m: pb.RedbagStatisticsInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedbagStatisticsInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedbagStatisticsInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedbagStatisticsInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedbagStatisticsInfoResponse;
        public static toObject(m: pb.RedbagStatisticsInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedbagJackpotUpdateNotice {
        amount_level?: (number|null);
        jp_amount?: (number|null);
    }

    class RedbagJackpotUpdateNotice implements IRedbagJackpotUpdateNotice {
        constructor(p?: pb.IRedbagJackpotUpdateNotice);
        public amount_level: number;
        public jp_amount: number;
        public static create(properties?: pb.IRedbagJackpotUpdateNotice): pb.RedbagJackpotUpdateNotice;
        public static encode(m: pb.RedbagJackpotUpdateNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedbagJackpotUpdateNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedbagJackpotUpdateNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedbagJackpotUpdateNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedbagJackpotUpdateNotice;
        public static toObject(m: pb.RedbagJackpotUpdateNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMDrawHistory {
        rdb_id?: (number|null);
        uid?: (number|null);
        name?: (string|null);
        head_url?: (string|null);
        draw_amount?: (number|null);
        boom_amount?: (number|null);
        draw_time?: (number|null);
        jp_amount?: (number|null);
        rdb_name?: (string|null);
        boom_percent?: (number|null);
    }

    class RedBagMDrawHistory implements IRedBagMDrawHistory {
        constructor(p?: pb.IRedBagMDrawHistory);
        public rdb_id: number;
        public uid: number;
        public name: string;
        public head_url: string;
        public draw_amount: number;
        public boom_amount: number;
        public draw_time: number;
        public jp_amount: number;
        public rdb_name: string;
        public boom_percent: number;
        public static create(properties?: pb.IRedBagMDrawHistory): pb.RedBagMDrawHistory;
        public static encode(m: pb.RedBagMDrawHistory, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMDrawHistory, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMDrawHistory;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMDrawHistory;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMDrawHistory;
        public static toObject(m: pb.RedBagMDrawHistory, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMInfo {
        rdb_id?: (number|null);
        rdb_name?: (string|null);
        rdb_amount_level?: (number|null);
        creater_uid?: (number|null);
        creater_name?: (string|null);
        creater_head_url?: (string|null);
        create_time?: (number|null);
        boom_number?: (number|null);
        status?: (number|null);
        draw_count?: (number|null);
        is_drawed?: (boolean|null);
    }

    class RedBagMInfo implements IRedBagMInfo {
        constructor(p?: pb.IRedBagMInfo);
        public rdb_id: number;
        public rdb_name: string;
        public rdb_amount_level: number;
        public creater_uid: number;
        public creater_name: string;
        public creater_head_url: string;
        public create_time: number;
        public boom_number: number;
        public status: number;
        public draw_count: number;
        public is_drawed: boolean;
        public static create(properties?: pb.IRedBagMInfo): pb.RedBagMInfo;
        public static encode(m: pb.RedBagMInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMInfo;
        public static toObject(m: pb.RedBagMInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICreateRedBagMRequest {
        rdb_amount_level?: (number|null);
        boom_number?: (number|null);
        task_id?: (number|null);
    }

    class CreateRedBagMRequest implements ICreateRedBagMRequest {
        constructor(p?: pb.ICreateRedBagMRequest);
        public rdb_amount_level: number;
        public boom_number: number;
        public task_id: number;
        public static create(properties?: pb.ICreateRedBagMRequest): pb.CreateRedBagMRequest;
        public static encode(m: pb.CreateRedBagMRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CreateRedBagMRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CreateRedBagMRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CreateRedBagMRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CreateRedBagMRequest;
        public static toObject(m: pb.CreateRedBagMRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICreateRedBagMReponse {
        error?: (number|null);
        rdb_id?: (number|null);
    }

    class CreateRedBagMReponse implements ICreateRedBagMReponse {
        constructor(p?: pb.ICreateRedBagMReponse);
        public error: number;
        public rdb_id: number;
        public static create(properties?: pb.ICreateRedBagMReponse): pb.CreateRedBagMReponse;
        public static encode(m: pb.CreateRedBagMReponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CreateRedBagMReponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CreateRedBagMReponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CreateRedBagMReponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CreateRedBagMReponse;
        public static toObject(m: pb.CreateRedBagMReponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMTemplet {
        amount?: (number|null);
        count?: (number|null);
        name?: (string|null);
        min_amount?: (number|null);
        max_amount?: (number|null);
        required_amount?: (number|null);
    }

    class RedBagMTemplet implements IRedBagMTemplet {
        constructor(p?: pb.IRedBagMTemplet);
        public amount: number;
        public count: number;
        public name: string;
        public min_amount: number;
        public max_amount: number;
        public required_amount: number;
        public static create(properties?: pb.IRedBagMTemplet): pb.RedBagMTemplet;
        public static encode(m: pb.RedBagMTemplet, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMTemplet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMTemplet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMTemplet;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMTemplet;
        public static toObject(m: pb.RedBagMTemplet, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMNotice {
        open?: (boolean|null);
        clear?: (boolean|null);
        listen_amount?: (number|null);
        templets?: (pb.RedBagMTemplet[]|null);
        RedBagMs?: (pb.RedBagMInfo[]|null);
        title?: (string|null);
        content?: (string|null);
    }

    class RedBagMNotice implements IRedBagMNotice {
        constructor(p?: pb.IRedBagMNotice);
        public open: boolean;
        public clear: boolean;
        public listen_amount: number;
        public templets: pb.RedBagMTemplet[];
        public RedBagMs: pb.RedBagMInfo[];
        public title: string;
        public content: string;
        public static create(properties?: pb.IRedBagMNotice): pb.RedBagMNotice;
        public static encode(m: pb.RedBagMNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMNotice;
        public static toObject(m: pb.RedBagMNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMInfoRequest {
    }

    class RedBagMInfoRequest implements IRedBagMInfoRequest {
        constructor(p?: pb.IRedBagMInfoRequest);
        public static create(properties?: pb.IRedBagMInfoRequest): pb.RedBagMInfoRequest;
        public static encode(m: pb.RedBagMInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMInfoRequest;
        public static toObject(m: pb.RedBagMInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMInfoResponse {
        error?: (number|null);
    }

    class RedBagMInfoResponse implements IRedBagMInfoResponse {
        constructor(p?: pb.IRedBagMInfoResponse);
        public error: number;
        public static create(properties?: pb.IRedBagMInfoResponse): pb.RedBagMInfoResponse;
        public static encode(m: pb.RedBagMInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMInfoResponse;
        public static toObject(m: pb.RedBagMInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMSetAmountRequest {
        amount?: (number|null);
    }

    class RedBagMSetAmountRequest implements IRedBagMSetAmountRequest {
        constructor(p?: pb.IRedBagMSetAmountRequest);
        public amount: number;
        public static create(properties?: pb.IRedBagMSetAmountRequest): pb.RedBagMSetAmountRequest;
        public static encode(m: pb.RedBagMSetAmountRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMSetAmountRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMSetAmountRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMSetAmountRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMSetAmountRequest;
        public static toObject(m: pb.RedBagMSetAmountRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMSetAmountResponse {
        error?: (number|null);
        amount?: (number|null);
    }

    class RedBagMSetAmountResponse implements IRedBagMSetAmountResponse {
        constructor(p?: pb.IRedBagMSetAmountResponse);
        public error: number;
        public amount: number;
        public static create(properties?: pb.IRedBagMSetAmountResponse): pb.RedBagMSetAmountResponse;
        public static encode(m: pb.RedBagMSetAmountResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMSetAmountResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMSetAmountResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMSetAmountResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMSetAmountResponse;
        public static toObject(m: pb.RedBagMSetAmountResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMDrawRequest {
        rdb_id?: (number|null);
    }

    class RedBagMDrawRequest implements IRedBagMDrawRequest {
        constructor(p?: pb.IRedBagMDrawRequest);
        public rdb_id: number;
        public static create(properties?: pb.IRedBagMDrawRequest): pb.RedBagMDrawRequest;
        public static encode(m: pb.RedBagMDrawRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMDrawRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMDrawRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMDrawRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMDrawRequest;
        public static toObject(m: pb.RedBagMDrawRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMDrawResponse {
        error?: (number|null);
        rdb_id?: (number|null);
        status?: (number|null);
        historys?: (pb.RedBagMDrawHistory|null);
    }

    class RedBagMDrawResponse implements IRedBagMDrawResponse {
        constructor(p?: pb.IRedBagMDrawResponse);
        public error: number;
        public rdb_id: number;
        public status: number;
        public historys?: (pb.RedBagMDrawHistory|null);
        public static create(properties?: pb.IRedBagMDrawResponse): pb.RedBagMDrawResponse;
        public static encode(m: pb.RedBagMDrawResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMDrawResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMDrawResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMDrawResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMDrawResponse;
        public static toObject(m: pb.RedBagMDrawResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMOpenNotice {
        open?: (boolean|null);
        templets?: (pb.RedBagMTemplet[]|null);
    }

    class RedBagMOpenNotice implements IRedBagMOpenNotice {
        constructor(p?: pb.IRedBagMOpenNotice);
        public open: boolean;
        public templets: pb.RedBagMTemplet[];
        public static create(properties?: pb.IRedBagMOpenNotice): pb.RedBagMOpenNotice;
        public static encode(m: pb.RedBagMOpenNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMOpenNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMOpenNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMOpenNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMOpenNotice;
        public static toObject(m: pb.RedBagMOpenNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMHistoryRequest {
        rdb_id?: (number|null);
    }

    class RedBagMHistoryRequest implements IRedBagMHistoryRequest {
        constructor(p?: pb.IRedBagMHistoryRequest);
        public rdb_id: number;
        public static create(properties?: pb.IRedBagMHistoryRequest): pb.RedBagMHistoryRequest;
        public static encode(m: pb.RedBagMHistoryRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMHistoryRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMHistoryRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMHistoryRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMHistoryRequest;
        public static toObject(m: pb.RedBagMHistoryRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMDraewdInfo {
        rdb_id?: (number|null);
        status?: (number|null);
        rdb_name?: (string|null);
        boom_count?: (number|null);
        boom_amount?: (number|null);
        drawed_count?: (number|null);
        drawed_amount?: (number|null);
        creator_id?: (number|null);
        total_count?: (number|null);
    }

    class RedBagMDraewdInfo implements IRedBagMDraewdInfo {
        constructor(p?: pb.IRedBagMDraewdInfo);
        public rdb_id: number;
        public status: number;
        public rdb_name: string;
        public boom_count: number;
        public boom_amount: number;
        public drawed_count: number;
        public drawed_amount: number;
        public creator_id: number;
        public total_count: number;
        public static create(properties?: pb.IRedBagMDraewdInfo): pb.RedBagMDraewdInfo;
        public static encode(m: pb.RedBagMDraewdInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMDraewdInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMDraewdInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMDraewdInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMDraewdInfo;
        public static toObject(m: pb.RedBagMDraewdInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMHistoryResponse {
        error?: (number|null);
        rdb_id?: (number|null);
        status?: (number|null);
        historys?: (pb.RedBagMDrawHistory[]|null);
        info?: (pb.RedBagMDraewdInfo|null);
        detail?: (pb.RedBagMInfo|null);
    }

    class RedBagMHistoryResponse implements IRedBagMHistoryResponse {
        constructor(p?: pb.IRedBagMHistoryResponse);
        public error: number;
        public rdb_id: number;
        public status: number;
        public historys: pb.RedBagMDrawHistory[];
        public info?: (pb.RedBagMDraewdInfo|null);
        public detail?: (pb.RedBagMInfo|null);
        public static create(properties?: pb.IRedBagMHistoryResponse): pb.RedBagMHistoryResponse;
        public static encode(m: pb.RedBagMHistoryResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMHistoryResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMHistoryResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMHistoryResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMHistoryResponse;
        public static toObject(m: pb.RedBagMHistoryResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotifyRedBagMBoom2Creater {
        rdb_id?: (number|null);
        rdb_name?: (string|null);
        boom_amount?: (number|null);
        boom_number?: (number|null);
        boom_percent?: (number|null);
        jp_amount?: (number|null);
        boom_count?: (number|null);
    }

    class NotifyRedBagMBoom2Creater implements INotifyRedBagMBoom2Creater {
        constructor(p?: pb.INotifyRedBagMBoom2Creater);
        public rdb_id: number;
        public rdb_name: string;
        public boom_amount: number;
        public boom_number: number;
        public boom_percent: number;
        public jp_amount: number;
        public boom_count: number;
        public static create(properties?: pb.INotifyRedBagMBoom2Creater): pb.NotifyRedBagMBoom2Creater;
        public static encode(m: pb.NotifyRedBagMBoom2Creater, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NotifyRedBagMBoom2Creater, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NotifyRedBagMBoom2Creater;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NotifyRedBagMBoom2Creater;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NotifyRedBagMBoom2Creater;
        public static toObject(m: pb.NotifyRedBagMBoom2Creater, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMCreateHistory {
        rdb_id?: (number|null);
        create_time?: (number|null);
        rdb_name?: (string|null);
        rdb_amount_level?: (number|null);
        left_amount?: (number|null);
        draw_count?: (number|null);
        left_count?: (number|null);
        boom_count?: (number|null);
        boom_amount?: (number|null);
    }

    class RedBagMCreateHistory implements IRedBagMCreateHistory {
        constructor(p?: pb.IRedBagMCreateHistory);
        public rdb_id: number;
        public create_time: number;
        public rdb_name: string;
        public rdb_amount_level: number;
        public left_amount: number;
        public draw_count: number;
        public left_count: number;
        public boom_count: number;
        public boom_amount: number;
        public static create(properties?: pb.IRedBagMCreateHistory): pb.RedBagMCreateHistory;
        public static encode(m: pb.RedBagMCreateHistory, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMCreateHistory, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMCreateHistory;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMCreateHistory;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMCreateHistory;
        public static toObject(m: pb.RedBagMCreateHistory, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMStatusRequest {
        rdb_id?: (number|null);
    }

    class RedBagMStatusRequest implements IRedBagMStatusRequest {
        constructor(p?: pb.IRedBagMStatusRequest);
        public rdb_id: number;
        public static create(properties?: pb.IRedBagMStatusRequest): pb.RedBagMStatusRequest;
        public static encode(m: pb.RedBagMStatusRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMStatusRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMStatusRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMStatusRequest;
        public static toObject(m: pb.RedBagMStatusRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMStatusResponse {
        status?: (number|null);
        rdb_id?: (number|null);
        is_drawed?: (boolean|null);
    }

    class RedBagMStatusResponse implements IRedBagMStatusResponse {
        constructor(p?: pb.IRedBagMStatusResponse);
        public status: number;
        public rdb_id: number;
        public is_drawed: boolean;
        public static create(properties?: pb.IRedBagMStatusResponse): pb.RedBagMStatusResponse;
        public static encode(m: pb.RedBagMStatusResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMStatusResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMStatusResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMStatusResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMStatusResponse;
        public static toObject(m: pb.RedBagMStatusResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoRedBagMDrawRequest {
        auto_count?: (number|null);
    }

    class AutoRedBagMDrawRequest implements IAutoRedBagMDrawRequest {
        constructor(p?: pb.IAutoRedBagMDrawRequest);
        public auto_count: number;
        public static create(properties?: pb.IAutoRedBagMDrawRequest): pb.AutoRedBagMDrawRequest;
        public static encode(m: pb.AutoRedBagMDrawRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AutoRedBagMDrawRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AutoRedBagMDrawRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AutoRedBagMDrawRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AutoRedBagMDrawRequest;
        public static toObject(m: pb.AutoRedBagMDrawRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoRedBagMDrawResponse {
        error?: (number|null);
        auto_count?: (number|null);
        historys?: (pb.RedBagMDrawHistory[]|null);
    }

    class AutoRedBagMDrawResponse implements IAutoRedBagMDrawResponse {
        constructor(p?: pb.IAutoRedBagMDrawResponse);
        public error: number;
        public auto_count: number;
        public historys: pb.RedBagMDrawHistory[];
        public static create(properties?: pb.IAutoRedBagMDrawResponse): pb.AutoRedBagMDrawResponse;
        public static encode(m: pb.AutoRedBagMDrawResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AutoRedBagMDrawResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AutoRedBagMDrawResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AutoRedBagMDrawResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AutoRedBagMDrawResponse;
        public static toObject(m: pb.AutoRedBagMDrawResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDrawedRedBagM2CreatorNotice {
        historys?: (pb.RedBagMDrawHistory|null);
        info?: (pb.RedBagMDraewdInfo|null);
    }

    class DrawedRedBagM2CreatorNotice implements IDrawedRedBagM2CreatorNotice {
        constructor(p?: pb.IDrawedRedBagM2CreatorNotice);
        public historys?: (pb.RedBagMDrawHistory|null);
        public info?: (pb.RedBagMDraewdInfo|null);
        public static create(properties?: pb.IDrawedRedBagM2CreatorNotice): pb.DrawedRedBagM2CreatorNotice;
        public static encode(m: pb.DrawedRedBagM2CreatorNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DrawedRedBagM2CreatorNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DrawedRedBagM2CreatorNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DrawedRedBagM2CreatorNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DrawedRedBagM2CreatorNotice;
        public static toObject(m: pb.DrawedRedBagM2CreatorNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILastRedBagMInfoRequest {
    }

    class LastRedBagMInfoRequest implements ILastRedBagMInfoRequest {
        constructor(p?: pb.ILastRedBagMInfoRequest);
        public static create(properties?: pb.ILastRedBagMInfoRequest): pb.LastRedBagMInfoRequest;
        public static encode(m: pb.LastRedBagMInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LastRedBagMInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LastRedBagMInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LastRedBagMInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LastRedBagMInfoRequest;
        public static toObject(m: pb.LastRedBagMInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILastRedBagMInfoResponse {
        error?: (number|null);
        create_historys?: (pb.RedBagMCreateHistory[]|null);
        draw_historys?: (pb.RedBagMDrawHistory[]|null);
    }

    class LastRedBagMInfoResponse implements ILastRedBagMInfoResponse {
        constructor(p?: pb.ILastRedBagMInfoResponse);
        public error: number;
        public create_historys: pb.RedBagMCreateHistory[];
        public draw_historys: pb.RedBagMDrawHistory[];
        public static create(properties?: pb.ILastRedBagMInfoResponse): pb.LastRedBagMInfoResponse;
        public static encode(m: pb.LastRedBagMInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LastRedBagMInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LastRedBagMInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LastRedBagMInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LastRedBagMInfoResponse;
        public static toObject(m: pb.LastRedBagMInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMJackpotRequest {
    }

    class RedBagMJackpotRequest implements IRedBagMJackpotRequest {
        constructor(p?: pb.IRedBagMJackpotRequest);
        public static create(properties?: pb.IRedBagMJackpotRequest): pb.RedBagMJackpotRequest;
        public static encode(m: pb.RedBagMJackpotRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMJackpotRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMJackpotRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMJackpotRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMJackpotRequest;
        public static toObject(m: pb.RedBagMJackpotRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMJackpotTemplate {
        number?: (number|null);
        count?: (number|null);
        percent?: (number|null);
        number_string?: (string|null);
    }

    class RedBagMJackpotTemplate implements IRedBagMJackpotTemplate {
        constructor(p?: pb.IRedBagMJackpotTemplate);
        public number: number;
        public count: number;
        public percent: number;
        public number_string: string;
        public static create(properties?: pb.IRedBagMJackpotTemplate): pb.RedBagMJackpotTemplate;
        public static encode(m: pb.RedBagMJackpotTemplate, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMJackpotTemplate, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMJackpotTemplate;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMJackpotTemplate;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMJackpotTemplate;
        public static toObject(m: pb.RedBagMJackpotTemplate, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMJackpotAmount {
        amount_level?: (number|null);
        jackpot_amount?: (number|null);
    }

    class RedBagMJackpotAmount implements IRedBagMJackpotAmount {
        constructor(p?: pb.IRedBagMJackpotAmount);
        public amount_level: number;
        public jackpot_amount: number;
        public static create(properties?: pb.IRedBagMJackpotAmount): pb.RedBagMJackpotAmount;
        public static encode(m: pb.RedBagMJackpotAmount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMJackpotAmount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMJackpotAmount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMJackpotAmount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMJackpotAmount;
        public static toObject(m: pb.RedBagMJackpotAmount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMJackpotRecord {
        amount_level?: (number|null);
        uid?: (number|null);
        nick_name?: (string|null);
        RedBagM_amount?: (number|null);
        award_amount?: (number|null);
        time?: (number|null);
    }

    class RedBagMJackpotRecord implements IRedBagMJackpotRecord {
        constructor(p?: pb.IRedBagMJackpotRecord);
        public amount_level: number;
        public uid: number;
        public nick_name: string;
        public RedBagM_amount: number;
        public award_amount: number;
        public time: number;
        public static create(properties?: pb.IRedBagMJackpotRecord): pb.RedBagMJackpotRecord;
        public static encode(m: pb.RedBagMJackpotRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMJackpotRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMJackpotRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMJackpotRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMJackpotRecord;
        public static toObject(m: pb.RedBagMJackpotRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMJackpotInfoRequest {
    }

    class RedBagMJackpotInfoRequest implements IRedBagMJackpotInfoRequest {
        constructor(p?: pb.IRedBagMJackpotInfoRequest);
        public static create(properties?: pb.IRedBagMJackpotInfoRequest): pb.RedBagMJackpotInfoRequest;
        public static encode(m: pb.RedBagMJackpotInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMJackpotInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMJackpotInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMJackpotInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMJackpotInfoRequest;
        public static toObject(m: pb.RedBagMJackpotInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMJackpotInfoResponse {
        error?: (number|null);
        jackpot_templates?: (pb.RedBagMJackpotTemplate[]|null);
        jackpot_amount?: (pb.RedBagMJackpotAmount[]|null);
        jackpot_records?: (pb.RedBagMJackpotRecord[]|null);
    }

    class RedBagMJackpotInfoResponse implements IRedBagMJackpotInfoResponse {
        constructor(p?: pb.IRedBagMJackpotInfoResponse);
        public error: number;
        public jackpot_templates: pb.RedBagMJackpotTemplate[];
        public jackpot_amount: pb.RedBagMJackpotAmount[];
        public jackpot_records: pb.RedBagMJackpotRecord[];
        public static create(properties?: pb.IRedBagMJackpotInfoResponse): pb.RedBagMJackpotInfoResponse;
        public static encode(m: pb.RedBagMJackpotInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMJackpotInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMJackpotInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMJackpotInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMJackpotInfoResponse;
        public static toObject(m: pb.RedBagMJackpotInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMStatisticsInfoRequest {
    }

    class RedBagMStatisticsInfoRequest implements IRedBagMStatisticsInfoRequest {
        constructor(p?: pb.IRedBagMStatisticsInfoRequest);
        public static create(properties?: pb.IRedBagMStatisticsInfoRequest): pb.RedBagMStatisticsInfoRequest;
        public static encode(m: pb.RedBagMStatisticsInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMStatisticsInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMStatisticsInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMStatisticsInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMStatisticsInfoRequest;
        public static toObject(m: pb.RedBagMStatisticsInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMStatisticsInfoResponse {
        error?: (number|null);
        JoinNumber?: (number|null);
        create_number?: (number|null);
        booms?: (string[]|null);
    }

    class RedBagMStatisticsInfoResponse implements IRedBagMStatisticsInfoResponse {
        constructor(p?: pb.IRedBagMStatisticsInfoResponse);
        public error: number;
        public JoinNumber: number;
        public create_number: number;
        public booms: string[];
        public static create(properties?: pb.IRedBagMStatisticsInfoResponse): pb.RedBagMStatisticsInfoResponse;
        public static encode(m: pb.RedBagMStatisticsInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMStatisticsInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMStatisticsInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMStatisticsInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMStatisticsInfoResponse;
        public static toObject(m: pb.RedBagMStatisticsInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedBagMShowUINotice {
        level_amout_list?: (number[]|null);
        def_amout_index?: (number|null);
        def_boom_number?: (number|null);
        time_out?: (number|null);
        task_id?: (number|null);
    }

    class RedBagMShowUINotice implements IRedBagMShowUINotice {
        constructor(p?: pb.IRedBagMShowUINotice);
        public level_amout_list: number[];
        public def_amout_index: number;
        public def_boom_number: number;
        public time_out: number;
        public task_id: number;
        public static create(properties?: pb.IRedBagMShowUINotice): pb.RedBagMShowUINotice;
        public static encode(m: pb.RedBagMShowUINotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedBagMShowUINotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedBagMShowUINotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedBagMShowUINotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedBagMShowUINotice;
        public static toObject(m: pb.RedBagMShowUINotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetRankRequest {
        rankId?: (number|null);
        uid?: (number|null);
    }

    class GetRankRequest implements IGetRankRequest {
        constructor(p?: pb.IGetRankRequest);
        public rankId: number;
        public uid: number;
        public static create(properties?: pb.IGetRankRequest): pb.GetRankRequest;
        public static encode(m: pb.GetRankRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetRankRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetRankRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetRankRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetRankRequest;
        public static toObject(m: pb.GetRankRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetRankResponse {
        error?: (number|null);
        list?: (string[]|null);
        owner?: (string|null);
    }

    class GetRankResponse implements IGetRankResponse {
        constructor(p?: pb.IGetRankResponse);
        public error: number;
        public list: string[];
        public owner: string;
        public static create(properties?: pb.IGetRankResponse): pb.GetRankResponse;
        public static encode(m: pb.GetRankResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetRankResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetRankResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetRankResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetRankResponse;
        public static toObject(m: pb.GetRankResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetSecretKeyRequest {
        Secret_key?: (string|null);
    }

    class SetSecretKeyRequest implements ISetSecretKeyRequest {
        constructor(p?: pb.ISetSecretKeyRequest);
        public Secret_key: string;
        public static create(properties?: pb.ISetSecretKeyRequest): pb.SetSecretKeyRequest;
        public static encode(m: pb.SetSecretKeyRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SetSecretKeyRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SetSecretKeyRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SetSecretKeyRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SetSecretKeyRequest;
        public static toObject(m: pb.SetSecretKeyRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetSecretKeyResponse {
        error?: (number|null);
    }

    class SetSecretKeyResponse implements ISetSecretKeyResponse {
        constructor(p?: pb.ISetSecretKeyResponse);
        public error: number;
        public static create(properties?: pb.ISetSecretKeyResponse): pb.SetSecretKeyResponse;
        public static encode(m: pb.SetSecretKeyResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SetSecretKeyResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SetSecretKeyResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SetSecretKeyResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SetSecretKeyResponse;
        public static toObject(m: pb.SetSecretKeyResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum SecretType {
        UseX = 0,
        UseY = 1,
        UseXY = 2
    }

    interface ISetSecretKeyExRequest {
        secret_type?: (pb.SecretType|null);
        cli_public_key_x?: (string|null);
        cli_public_key_y?: (string|null);
    }

    class SetSecretKeyExRequest implements ISetSecretKeyExRequest {
        constructor(p?: pb.ISetSecretKeyExRequest);
        public secret_type: pb.SecretType;
        public cli_public_key_x: string;
        public cli_public_key_y: string;
        public static create(properties?: pb.ISetSecretKeyExRequest): pb.SetSecretKeyExRequest;
        public static encode(m: pb.SetSecretKeyExRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SetSecretKeyExRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SetSecretKeyExRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SetSecretKeyExRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SetSecretKeyExRequest;
        public static toObject(m: pb.SetSecretKeyExRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetSecretKeyExResponse {
        error?: (number|null);
        secret_type?: (pb.SecretType|null);
        svr_public_key_x?: (string|null);
        svr_public_key_y?: (string|null);
    }

    class SetSecretKeyExResponse implements ISetSecretKeyExResponse {
        constructor(p?: pb.ISetSecretKeyExResponse);
        public error: number;
        public secret_type: pb.SecretType;
        public svr_public_key_x: string;
        public svr_public_key_y: string;
        public static create(properties?: pb.ISetSecretKeyExResponse): pb.SetSecretKeyExResponse;
        public static encode(m: pb.SetSecretKeyExResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SetSecretKeyExResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SetSecretKeyExResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SetSecretKeyExResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SetSecretKeyExResponse;
        public static toObject(m: pb.SetSecretKeyExResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetThisAreaPlayerNotice {
        uid?: (number|null);
        isBanArea?: (boolean|null);
    }

    class SetThisAreaPlayerNotice implements ISetThisAreaPlayerNotice {
        constructor(p?: pb.ISetThisAreaPlayerNotice);
        public uid: number;
        public isBanArea: boolean;
        public static create(properties?: pb.ISetThisAreaPlayerNotice): pb.SetThisAreaPlayerNotice;
        public static encode(m: pb.SetThisAreaPlayerNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SetThisAreaPlayerNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SetThisAreaPlayerNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SetThisAreaPlayerNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SetThisAreaPlayerNotice;
        public static toObject(m: pb.SetThisAreaPlayerNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReferralsRequest {
        uid?: (number|null);
        get_front?: (boolean|null);
        page_size?: (number|null);
    }

    class ReferralsRequest implements IReferralsRequest {
        constructor(p?: pb.IReferralsRequest);
        public uid: number;
        public get_front: boolean;
        public page_size: number;
        public static create(properties?: pb.IReferralsRequest): pb.ReferralsRequest;
        public static encode(m: pb.ReferralsRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReferralsRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReferralsRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReferralsRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReferralsRequest;
        public static toObject(m: pb.ReferralsRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReferralsItem {
        uid?: (number|null);
        name?: (string|null);
        head?: (string|null);
        rebate?: (number|null);
        plat?: (number|null);
    }

    class ReferralsItem implements IReferralsItem {
        constructor(p?: pb.IReferralsItem);
        public uid: number;
        public name: string;
        public head: string;
        public rebate: number;
        public plat: number;
        public static create(properties?: pb.IReferralsItem): pb.ReferralsItem;
        public static encode(m: pb.ReferralsItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReferralsItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReferralsItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReferralsItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReferralsItem;
        public static toObject(m: pb.ReferralsItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReferralsResponse {
        total?: (number|null);
        uid?: (number|null);
        get_front?: (boolean|null);
        max_club_member?: (number|null);
        list?: (pb.ReferralsItem[]|null);
    }

    class ReferralsResponse implements IReferralsResponse {
        constructor(p?: pb.IReferralsResponse);
        public total: number;
        public uid: number;
        public get_front: boolean;
        public max_club_member: number;
        public list: pb.ReferralsItem[];
        public static create(properties?: pb.IReferralsResponse): pb.ReferralsResponse;
        public static encode(m: pb.ReferralsResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReferralsResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReferralsResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReferralsResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReferralsResponse;
        public static toObject(m: pb.ReferralsResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetInviteSummaryRequest {
        uid?: (number|null);
    }

    class GetInviteSummaryRequest implements IGetInviteSummaryRequest {
        constructor(p?: pb.IGetInviteSummaryRequest);
        public uid: number;
        public static create(properties?: pb.IGetInviteSummaryRequest): pb.GetInviteSummaryRequest;
        public static encode(m: pb.GetInviteSummaryRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetInviteSummaryRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetInviteSummaryRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetInviteSummaryRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetInviteSummaryRequest;
        public static toObject(m: pb.GetInviteSummaryRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetInviteSummaryResponse {
        last_income?: (number|null);
        total_income?: (number|null);
        last_referrals?: (number|null);
        total_referrals?: (number|null);
        redeem_income?: (number|null);
        hasClub?: (boolean|null);
        invite_percent?: (number|null);
    }

    class GetInviteSummaryResponse implements IGetInviteSummaryResponse {
        constructor(p?: pb.IGetInviteSummaryResponse);
        public last_income: number;
        public total_income: number;
        public last_referrals: number;
        public total_referrals: number;
        public redeem_income: number;
        public hasClub: boolean;
        public invite_percent: number;
        public static create(properties?: pb.IGetInviteSummaryResponse): pb.GetInviteSummaryResponse;
        public static encode(m: pb.GetInviteSummaryResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetInviteSummaryResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetInviteSummaryResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetInviteSummaryResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetInviteSummaryResponse;
        public static toObject(m: pb.GetInviteSummaryResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedeemInviteIncomeRequest {
        uid?: (number|null);
    }

    class RedeemInviteIncomeRequest implements IRedeemInviteIncomeRequest {
        constructor(p?: pb.IRedeemInviteIncomeRequest);
        public uid: number;
        public static create(properties?: pb.IRedeemInviteIncomeRequest): pb.RedeemInviteIncomeRequest;
        public static encode(m: pb.RedeemInviteIncomeRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedeemInviteIncomeRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedeemInviteIncomeRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedeemInviteIncomeRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedeemInviteIncomeRequest;
        public static toObject(m: pb.RedeemInviteIncomeRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRedeemInviteIncomeResponse {
        error?: (number|null);
    }

    class RedeemInviteIncomeResponse implements IRedeemInviteIncomeResponse {
        constructor(p?: pb.IRedeemInviteIncomeResponse);
        public error: number;
        public static create(properties?: pb.IRedeemInviteIncomeResponse): pb.RedeemInviteIncomeResponse;
        public static encode(m: pb.RedeemInviteIncomeResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RedeemInviteIncomeResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RedeemInviteIncomeResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RedeemInviteIncomeResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RedeemInviteIncomeResponse;
        public static toObject(m: pb.RedeemInviteIncomeResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinAllianceUserCancelRequest {
        alliance_id?: (number|null);
        club_id?: (number|null);
    }

    class JoinAllianceUserCancelRequest implements IJoinAllianceUserCancelRequest {
        constructor(p?: pb.IJoinAllianceUserCancelRequest);
        public alliance_id: number;
        public club_id: number;
        public static create(properties?: pb.IJoinAllianceUserCancelRequest): pb.JoinAllianceUserCancelRequest;
        public static encode(m: pb.JoinAllianceUserCancelRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JoinAllianceUserCancelRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JoinAllianceUserCancelRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JoinAllianceUserCancelRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JoinAllianceUserCancelRequest;
        public static toObject(m: pb.JoinAllianceUserCancelRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinAllianceUserCancelResponse {
        error?: (number|null);
        club_id?: (number|null);
    }

    class JoinAllianceUserCancelResponse implements IJoinAllianceUserCancelResponse {
        constructor(p?: pb.IJoinAllianceUserCancelResponse);
        public error: number;
        public club_id: number;
        public static create(properties?: pb.IJoinAllianceUserCancelResponse): pb.JoinAllianceUserCancelResponse;
        public static encode(m: pb.JoinAllianceUserCancelResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.JoinAllianceUserCancelResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.JoinAllianceUserCancelResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JoinAllianceUserCancelResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.JoinAllianceUserCancelResponse;
        public static toObject(m: pb.JoinAllianceUserCancelResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPokerMasterGameListRequest {
    }

    class PokerMasterGameListRequest implements IPokerMasterGameListRequest {
        constructor(p?: pb.IPokerMasterGameListRequest);
        public static create(properties?: pb.IPokerMasterGameListRequest): pb.PokerMasterGameListRequest;
        public static encode(m: pb.PokerMasterGameListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PokerMasterGameListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PokerMasterGameListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PokerMasterGameListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PokerMasterGameListRequest;
        public static toObject(m: pb.PokerMasterGameListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPokerMasterGameListResponse {
        error?: (number|null);
        games?: (pb.PokerMasterGame[]|null);
    }

    class PokerMasterGameListResponse implements IPokerMasterGameListResponse {
        constructor(p?: pb.IPokerMasterGameListResponse);
        public error: number;
        public games: pb.PokerMasterGame[];
        public static create(properties?: pb.IPokerMasterGameListResponse): pb.PokerMasterGameListResponse;
        public static encode(m: pb.PokerMasterGameListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PokerMasterGameListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PokerMasterGameListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PokerMasterGameListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PokerMasterGameListResponse;
        public static toObject(m: pb.PokerMasterGameListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPokerMasterGame {
        roomid?: (number|null);
        AmountLevel?: (number[]|null);
        playerNum?: (number|null);
        deskType?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        pictureVn?: (string[]|null);
        pictureThai?: (string[]|null);
    }

    class PokerMasterGame implements IPokerMasterGame {
        constructor(p?: pb.IPokerMasterGame);
        public roomid: number;
        public AmountLevel: number[];
        public playerNum: number;
        public deskType: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public pictureVn: string[];
        public pictureThai: string[];
        public static create(properties?: pb.IPokerMasterGame): pb.PokerMasterGame;
        public static encode(m: pb.PokerMasterGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PokerMasterGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PokerMasterGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PokerMasterGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PokerMasterGame;
        public static toObject(m: pb.PokerMasterGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAuthApi {
        platform?: (number|null);
        language?: (string|null);
    }

    class RequestAuthApi implements IRequestAuthApi {
        constructor(p?: pb.IRequestAuthApi);
        public platform: number;
        public language: string;
        public static create(properties?: pb.IRequestAuthApi): pb.RequestAuthApi;
        public static encode(m: pb.RequestAuthApi, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestAuthApi, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestAuthApi;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestAuthApi;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestAuthApi;
        public static toObject(m: pb.RequestAuthApi, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAuthApi {
        error?: (number|null);
    }

    class ResponseAuthApi implements IResponseAuthApi {
        constructor(p?: pb.IResponseAuthApi);
        public error: number;
        public static create(properties?: pb.IResponseAuthApi): pb.ResponseAuthApi;
        public static encode(m: pb.ResponseAuthApi, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseAuthApi, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseAuthApi;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseAuthApi;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseAuthApi;
        public static toObject(m: pb.ResponseAuthApi, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAuthApi {
        bl_token?: (string|null);
        url?: (string|null);
    }

    class NoticeAuthApi implements INoticeAuthApi {
        constructor(p?: pb.INoticeAuthApi);
        public bl_token: string;
        public url: string;
        public static create(properties?: pb.INoticeAuthApi): pb.NoticeAuthApi;
        public static encode(m: pb.NoticeAuthApi, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeAuthApi, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeAuthApi;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeAuthApi;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeAuthApi;
        public static toObject(m: pb.NoticeAuthApi, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameMaintainStatus {
        game_id?: (pb.GameId|null);
        status?: (number|null);
    }

    class NoticeGameMaintainStatus implements INoticeGameMaintainStatus {
        constructor(p?: pb.INoticeGameMaintainStatus);
        public game_id: pb.GameId;
        public status: number;
        public static create(properties?: pb.INoticeGameMaintainStatus): pb.NoticeGameMaintainStatus;
        public static encode(m: pb.NoticeGameMaintainStatus, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeGameMaintainStatus, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeGameMaintainStatus;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeGameMaintainStatus;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeGameMaintainStatus;
        public static toObject(m: pb.NoticeGameMaintainStatus, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMiniGamesListRequest {
    }

    class MiniGamesListRequest implements IMiniGamesListRequest {
        constructor(p?: pb.IMiniGamesListRequest);
        public static create(properties?: pb.IMiniGamesListRequest): pb.MiniGamesListRequest;
        public static encode(m: pb.MiniGamesListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MiniGamesListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MiniGamesListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MiniGamesListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MiniGamesListRequest;
        public static toObject(m: pb.MiniGamesListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMiniGamesListResponse {
        error?: (number|null);
        games?: (pb.MiniGame[]|null);
    }

    class MiniGamesListResponse implements IMiniGamesListResponse {
        constructor(p?: pb.IMiniGamesListResponse);
        public error: number;
        public games: pb.MiniGame[];
        public static create(properties?: pb.IMiniGamesListResponse): pb.MiniGamesListResponse;
        public static encode(m: pb.MiniGamesListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MiniGamesListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MiniGamesListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MiniGamesListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MiniGamesListResponse;
        public static toObject(m: pb.MiniGamesListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMiniGame {
        roomid?: (number|null);
        AmountLevel?: (number[]|null);
        playerNum?: (number|null);
        deskType?: (number|null);
        sourceType?: (number|null);
        pgGameData?: (pb.PgGameData[]|null);
        topMatches?: (string|null);
        isHot?: (boolean|null);
        label?: (pb.MiniLabel|null);
    }

    class MiniGame implements IMiniGame {
        constructor(p?: pb.IMiniGame);
        public roomid: number;
        public AmountLevel: number[];
        public playerNum: number;
        public deskType: number;
        public sourceType: number;
        public pgGameData: pb.PgGameData[];
        public topMatches: string;
        public isHot: boolean;
        public label: pb.MiniLabel;
        public static create(properties?: pb.IMiniGame): pb.MiniGame;
        public static encode(m: pb.MiniGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MiniGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MiniGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MiniGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MiniGame;
        public static toObject(m: pb.MiniGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum MiniLabel {
        MiniLabelNormal = 0,
        MiniLabelNew = 1
    }

    interface IPgGameData {
        gameCode?: (string|null);
        gameId?: (number|null);
        label?: (number|null);
        gameName?: (string|null);
        expire?: (number|null);
        gameIcon?: (string|null);
        sortId?: (number|null);
        gameStatus?: (number|null);
        createTime?: (number|null);
        isChamPoin?: (number|null);
    }

    class PgGameData implements IPgGameData {
        constructor(p?: pb.IPgGameData);
        public gameCode: string;
        public gameId: number;
        public label: number;
        public gameName: string;
        public expire: number;
        public gameIcon: string;
        public sortId: number;
        public gameStatus: number;
        public createTime: number;
        public isChamPoin: number;
        public static create(properties?: pb.IPgGameData): pb.PgGameData;
        public static encode(m: pb.PgGameData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgGameData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgGameData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgGameData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgGameData;
        public static toObject(m: pb.PgGameData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum PgGameLabel {
        LabelNormal = 0,
        LabelPopular = 1,
        LabelMost = 2,
        LabelRecommend = 3,
        LabelNew = 4
    }

    interface IRequestMttResult {
        foreign_id?: (number|null);
        offset?: (number|null);
        limit?: (number|null);
    }

    class RequestMttResult implements IRequestMttResult {
        constructor(p?: pb.IRequestMttResult);
        public foreign_id: number;
        public offset: number;
        public limit: number;
        public static create(properties?: pb.IRequestMttResult): pb.RequestMttResult;
        public static encode(m: pb.RequestMttResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestMttResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestMttResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestMttResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestMttResult;
        public static toObject(m: pb.RequestMttResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseMttResult {
        error?: (number|null);
    }

    class ResponseMttResult implements IResponseMttResult {
        constructor(p?: pb.IResponseMttResult);
        public error: number;
        public static create(properties?: pb.IResponseMttResult): pb.ResponseMttResult;
        public static encode(m: pb.ResponseMttResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseMttResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseMttResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseMttResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseMttResult;
        public static toObject(m: pb.ResponseMttResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeMttResult {
        data?: (string|null);
    }

    class NoticeMttResult implements INoticeMttResult {
        constructor(p?: pb.INoticeMttResult);
        public data: string;
        public static create(properties?: pb.INoticeMttResult): pb.NoticeMttResult;
        public static encode(m: pb.NoticeMttResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeMttResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeMttResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeMttResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeMttResult;
        public static toObject(m: pb.NoticeMttResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestMttDetail {
        foreign_id?: (number|null);
        mtt_id?: (number|null);
    }

    class RequestMttDetail implements IRequestMttDetail {
        constructor(p?: pb.IRequestMttDetail);
        public foreign_id: number;
        public mtt_id: number;
        public static create(properties?: pb.IRequestMttDetail): pb.RequestMttDetail;
        public static encode(m: pb.RequestMttDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestMttDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestMttDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestMttDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestMttDetail;
        public static toObject(m: pb.RequestMttDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseMttDetail {
        error?: (number|null);
    }

    class ResponseMttDetail implements IResponseMttDetail {
        constructor(p?: pb.IResponseMttDetail);
        public error: number;
        public static create(properties?: pb.IResponseMttDetail): pb.ResponseMttDetail;
        public static encode(m: pb.ResponseMttDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseMttDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseMttDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseMttDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseMttDetail;
        public static toObject(m: pb.ResponseMttDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeMttDetail {
        data?: (string|null);
    }

    class NoticeMttDetail implements INoticeMttDetail {
        constructor(p?: pb.INoticeMttDetail);
        public data: string;
        public static create(properties?: pb.INoticeMttDetail): pb.NoticeMttDetail;
        public static encode(m: pb.NoticeMttDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeMttDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeMttDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeMttDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeMttDetail;
        public static toObject(m: pb.NoticeMttDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestMttGameSum {
        foreign_id?: (number|null);
    }

    class RequestMttGameSum implements IRequestMttGameSum {
        constructor(p?: pb.IRequestMttGameSum);
        public foreign_id: number;
        public static create(properties?: pb.IRequestMttGameSum): pb.RequestMttGameSum;
        public static encode(m: pb.RequestMttGameSum, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestMttGameSum, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestMttGameSum;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestMttGameSum;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestMttGameSum;
        public static toObject(m: pb.RequestMttGameSum, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseMttGameSum {
        error?: (number|null);
    }

    class ResponseMttGameSum implements IResponseMttGameSum {
        constructor(p?: pb.IResponseMttGameSum);
        public error: number;
        public static create(properties?: pb.IResponseMttGameSum): pb.ResponseMttGameSum;
        public static encode(m: pb.ResponseMttGameSum, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseMttGameSum, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseMttGameSum;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseMttGameSum;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseMttGameSum;
        public static toObject(m: pb.ResponseMttGameSum, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeMttGameSum {
        data?: (string|null);
    }

    class NoticeMttGameSum implements INoticeMttGameSum {
        constructor(p?: pb.INoticeMttGameSum);
        public data: string;
        public static create(properties?: pb.INoticeMttGameSum): pb.NoticeMttGameSum;
        public static encode(m: pb.NoticeMttGameSum, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeMttGameSum, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeMttGameSum;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeMttGameSum;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeMttGameSum;
        public static toObject(m: pb.NoticeMttGameSum, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IEventReportRequest {
        roomId?: (number|null);
        sourceType?: (pb.GameId|null);
        eventType?: (pb.EventType|null);
        desc?: (string|null);
        param1?: (number|null);
        param2?: (number|null);
        param3?: (number|null);
    }

    class EventReportRequest implements IEventReportRequest {
        constructor(p?: pb.IEventReportRequest);
        public roomId: number;
        public sourceType: pb.GameId;
        public eventType: pb.EventType;
        public desc: string;
        public param1: number;
        public param2: number;
        public param3: number;
        public static create(properties?: pb.IEventReportRequest): pb.EventReportRequest;
        public static encode(m: pb.EventReportRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.EventReportRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.EventReportRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.EventReportRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.EventReportRequest;
        public static toObject(m: pb.EventReportRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IEventReportRsp {
        error?: (number|null);
    }

    class EventReportRsp implements IEventReportRsp {
        constructor(p?: pb.IEventReportRsp);
        public error: number;
        public static create(properties?: pb.IEventReportRsp): pb.EventReportRsp;
        public static encode(m: pb.EventReportRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.EventReportRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.EventReportRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.EventReportRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.EventReportRsp;
        public static toObject(m: pb.EventReportRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IExchangeUserPointsRequest {
        goods_id?: (number|null);
    }

    class ExchangeUserPointsRequest implements IExchangeUserPointsRequest {
        constructor(p?: pb.IExchangeUserPointsRequest);
        public goods_id: number;
        public static create(properties?: pb.IExchangeUserPointsRequest): pb.ExchangeUserPointsRequest;
        public static encode(m: pb.ExchangeUserPointsRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ExchangeUserPointsRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ExchangeUserPointsRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ExchangeUserPointsRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ExchangeUserPointsRequest;
        public static toObject(m: pb.ExchangeUserPointsRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IExchangeUserPointsResponse {
        error?: (number|null);
        goods_id?: (number|null);
        real_change_user_points?: (number|null);
        real_add_game_coin?: (number|null);
    }

    class ExchangeUserPointsResponse implements IExchangeUserPointsResponse {
        constructor(p?: pb.IExchangeUserPointsResponse);
        public error: number;
        public goods_id: number;
        public real_change_user_points: number;
        public real_add_game_coin: number;
        public static create(properties?: pb.IExchangeUserPointsResponse): pb.ExchangeUserPointsResponse;
        public static encode(m: pb.ExchangeUserPointsResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ExchangeUserPointsResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ExchangeUserPointsResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ExchangeUserPointsResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ExchangeUserPointsResponse;
        public static toObject(m: pb.ExchangeUserPointsResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGoods {
        goods_id?: (number|null);
        cost_user_points?: (number|null);
        obtain_game_coin?: (number|null);
        exchange_total_count?: (number|null);
    }

    class Goods implements IGoods {
        constructor(p?: pb.IGoods);
        public goods_id: number;
        public cost_user_points: number;
        public obtain_game_coin: number;
        public exchange_total_count: number;
        public static create(properties?: pb.IGoods): pb.Goods;
        public static encode(m: pb.Goods, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.Goods, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.Goods;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Goods;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.Goods;
        public static toObject(m: pb.Goods, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGoodsListRequest {
    }

    class GoodsListRequest implements IGoodsListRequest {
        constructor(p?: pb.IGoodsListRequest);
        public static create(properties?: pb.IGoodsListRequest): pb.GoodsListRequest;
        public static encode(m: pb.GoodsListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GoodsListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GoodsListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GoodsListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GoodsListRequest;
        public static toObject(m: pb.GoodsListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGoodsListResponse {
        error?: (number|null);
        goods_list?: (pb.Goods[]|null);
    }

    class GoodsListResponse implements IGoodsListResponse {
        constructor(p?: pb.IGoodsListResponse);
        public error: number;
        public goods_list: pb.Goods[];
        public static create(properties?: pb.IGoodsListResponse): pb.GoodsListResponse;
        public static encode(m: pb.GoodsListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GoodsListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GoodsListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GoodsListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GoodsListResponse;
        public static toObject(m: pb.GoodsListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum BankDetailsType {
        Gold = 0,
        GameCoin = 1,
        UserPoints = 2,
        Usdt = 3,
        Diamond = 4
    }

    interface IBankDetailsQueryRequest {
        detail_type?: (pb.BankDetailsType|null);
        is_prev_pull?: (boolean|null);
        pull_count?: (number|null);
        pull_pos?: (number|null);
        begin_time?: (number|null);
        end_time?: (number|null);
        table_suffix_time?: (number|null);
    }

    class BankDetailsQueryRequest implements IBankDetailsQueryRequest {
        constructor(p?: pb.IBankDetailsQueryRequest);
        public detail_type: pb.BankDetailsType;
        public is_prev_pull: boolean;
        public pull_count: number;
        public pull_pos: number;
        public begin_time: number;
        public end_time: number;
        public table_suffix_time: number;
        public static create(properties?: pb.IBankDetailsQueryRequest): pb.BankDetailsQueryRequest;
        public static encode(m: pb.BankDetailsQueryRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BankDetailsQueryRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BankDetailsQueryRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BankDetailsQueryRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BankDetailsQueryRequest;
        public static toObject(m: pb.BankDetailsQueryRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBankDetailsSnapshot {
        amount?: (number|null);
        source_type?: (number|null);
        create_time?: (number|null);
    }

    class BankDetailsSnapshot implements IBankDetailsSnapshot {
        constructor(p?: pb.IBankDetailsSnapshot);
        public amount: number;
        public source_type: number;
        public create_time: number;
        public static create(properties?: pb.IBankDetailsSnapshot): pb.BankDetailsSnapshot;
        public static encode(m: pb.BankDetailsSnapshot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BankDetailsSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BankDetailsSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BankDetailsSnapshot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BankDetailsSnapshot;
        public static toObject(m: pb.BankDetailsSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBankDetailsQueryResponse {
        error?: (number|null);
        snapshots?: (pb.BankDetailsSnapshot[]|null);
        detail_type?: (pb.BankDetailsType|null);
        is_prev_pull?: (boolean|null);
        total_count?: (number|null);
        first_inc_id?: (number|null);
        last_inc_id?: (number|null);
        begin_time?: (number|null);
        end_time?: (number|null);
        table_suffix_time?: (number|null);
    }

    class BankDetailsQueryResponse implements IBankDetailsQueryResponse {
        constructor(p?: pb.IBankDetailsQueryResponse);
        public error: number;
        public snapshots: pb.BankDetailsSnapshot[];
        public detail_type: pb.BankDetailsType;
        public is_prev_pull: boolean;
        public total_count: number;
        public first_inc_id: number;
        public last_inc_id: number;
        public begin_time: number;
        public end_time: number;
        public table_suffix_time: number;
        public static create(properties?: pb.IBankDetailsQueryResponse): pb.BankDetailsQueryResponse;
        public static encode(m: pb.BankDetailsQueryResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BankDetailsQueryResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BankDetailsQueryResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BankDetailsQueryResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BankDetailsQueryResponse;
        public static toObject(m: pb.BankDetailsQueryResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarInfoRequest {
        starIds?: (number[]|null);
    }

    class StarInfoRequest implements IStarInfoRequest {
        constructor(p?: pb.IStarInfoRequest);
        public starIds: number[];
        public static create(properties?: pb.IStarInfoRequest): pb.StarInfoRequest;
        public static encode(m: pb.StarInfoRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarInfoRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarInfoRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarInfoRequest;
        public static toObject(m: pb.StarInfoRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarInfoResponse {
        error?: (number|null);
        firstId?: (number|null);
        starInfo?: (pb.StarInfo[]|null);
    }

    class StarInfoResponse implements IStarInfoResponse {
        constructor(p?: pb.IStarInfoResponse);
        public error: number;
        public firstId: number;
        public starInfo: pb.StarInfo[];
        public static create(properties?: pb.IStarInfoResponse): pb.StarInfoResponse;
        public static encode(m: pb.StarInfoResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarInfoResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarInfoResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarInfoResponse;
        public static toObject(m: pb.StarInfoResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarInfo {
        uid?: (number|null);
        name?: (string|null);
        profilePic?: (string|null);
    }

    class StarInfo implements IStarInfo {
        constructor(p?: pb.IStarInfo);
        public uid: number;
        public name: string;
        public profilePic: string;
        public static create(properties?: pb.IStarInfo): pb.StarInfo;
        public static encode(m: pb.StarInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarInfo;
        public static toObject(m: pb.StarInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReceiveToolsRequest {
        toolId?: (number|null);
        qty?: (number|null);
        issueTime?: (number|null);
        imgAddr?: (string|null);
        imgAddrEn?: (string|null);
        optId?: (number|null);
        currency_type?: (number|null);
    }

    class ReceiveToolsRequest implements IReceiveToolsRequest {
        constructor(p?: pb.IReceiveToolsRequest);
        public toolId: number;
        public qty: number;
        public issueTime: number;
        public imgAddr: string;
        public imgAddrEn: string;
        public optId: number;
        public currency_type: number;
        public static create(properties?: pb.IReceiveToolsRequest): pb.ReceiveToolsRequest;
        public static encode(m: pb.ReceiveToolsRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReceiveToolsRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReceiveToolsRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReceiveToolsRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReceiveToolsRequest;
        public static toObject(m: pb.ReceiveToolsRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReceiveToolsResponse {
        error?: (number|null);
    }

    class ReceiveToolsResponse implements IReceiveToolsResponse {
        constructor(p?: pb.IReceiveToolsResponse);
        public error: number;
        public static create(properties?: pb.IReceiveToolsResponse): pb.ReceiveToolsResponse;
        public static encode(m: pb.ReceiveToolsResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReceiveToolsResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReceiveToolsResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReceiveToolsResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReceiveToolsResponse;
        public static toObject(m: pb.ReceiveToolsResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReceiveToolsNotice {
        toolsInfos?: (pb.ToolsInfo[]|null);
    }

    class ReceiveToolsNotice implements IReceiveToolsNotice {
        constructor(p?: pb.IReceiveToolsNotice);
        public toolsInfos: pb.ToolsInfo[];
        public static create(properties?: pb.IReceiveToolsNotice): pb.ReceiveToolsNotice;
        public static encode(m: pb.ReceiveToolsNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ReceiveToolsNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ReceiveToolsNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ReceiveToolsNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ReceiveToolsNotice;
        public static toObject(m: pb.ReceiveToolsNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IToolsInfo {
        toolId?: (number|null);
        qty?: (number|null);
        issueTime?: (number|null);
        imgAddr?: (string|null);
        imgAddrEn?: (string|null);
        optId?: (number|null);
        currency_type?: (number|null);
    }

    class ToolsInfo implements IToolsInfo {
        constructor(p?: pb.IToolsInfo);
        public toolId: number;
        public qty: number;
        public issueTime: number;
        public imgAddr: string;
        public imgAddrEn: string;
        public optId: number;
        public currency_type: number;
        public static create(properties?: pb.IToolsInfo): pb.ToolsInfo;
        public static encode(m: pb.ToolsInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ToolsInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ToolsInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ToolsInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ToolsInfo;
        public static toObject(m: pb.ToolsInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAuthVerifyRequest {
        result?: (number|null);
    }

    class AuthVerifyRequest implements IAuthVerifyRequest {
        constructor(p?: pb.IAuthVerifyRequest);
        public result: number;
        public static create(properties?: pb.IAuthVerifyRequest): pb.AuthVerifyRequest;
        public static encode(m: pb.AuthVerifyRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AuthVerifyRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AuthVerifyRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AuthVerifyRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AuthVerifyRequest;
        public static toObject(m: pb.AuthVerifyRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAuthVerifyResponse {
        error?: (number|null);
    }

    class AuthVerifyResponse implements IAuthVerifyResponse {
        constructor(p?: pb.IAuthVerifyResponse);
        public error: number;
        public static create(properties?: pb.IAuthVerifyResponse): pb.AuthVerifyResponse;
        public static encode(m: pb.AuthVerifyResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AuthVerifyResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AuthVerifyResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AuthVerifyResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AuthVerifyResponse;
        public static toObject(m: pb.AuthVerifyResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetScalerQuoteRequest {
        op_type?: (number|null);
    }

    class GetScalerQuoteRequest implements IGetScalerQuoteRequest {
        constructor(p?: pb.IGetScalerQuoteRequest);
        public op_type: number;
        public static create(properties?: pb.IGetScalerQuoteRequest): pb.GetScalerQuoteRequest;
        public static encode(m: pb.GetScalerQuoteRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetScalerQuoteRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetScalerQuoteRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetScalerQuoteRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetScalerQuoteRequest;
        public static toObject(m: pb.GetScalerQuoteRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetScalerQuoteResponse {
        error?: (number|null);
        op_type?: (number|null);
        rate?: (string|null);
    }

    class GetScalerQuoteResponse implements IGetScalerQuoteResponse {
        constructor(p?: pb.IGetScalerQuoteResponse);
        public error: number;
        public op_type: number;
        public rate: string;
        public static create(properties?: pb.IGetScalerQuoteResponse): pb.GetScalerQuoteResponse;
        public static encode(m: pb.GetScalerQuoteResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetScalerQuoteResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetScalerQuoteResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetScalerQuoteResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetScalerQuoteResponse;
        public static toObject(m: pb.GetScalerQuoteResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IExchangeCurrencyRequest {
        op_type?: (number|null);
        from_amt?: (number|null);
        is_point_deduction?: (boolean|null);
    }

    class ExchangeCurrencyRequest implements IExchangeCurrencyRequest {
        constructor(p?: pb.IExchangeCurrencyRequest);
        public op_type: number;
        public from_amt: number;
        public is_point_deduction: boolean;
        public static create(properties?: pb.IExchangeCurrencyRequest): pb.ExchangeCurrencyRequest;
        public static encode(m: pb.ExchangeCurrencyRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ExchangeCurrencyRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ExchangeCurrencyRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ExchangeCurrencyRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ExchangeCurrencyRequest;
        public static toObject(m: pb.ExchangeCurrencyRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IExchangeCurrencyResponse {
        error?: (number|null);
        op_type?: (number|null);
        from_amt?: (number|null);
        to_amt?: (number|null);
        rate?: (string|null);
    }

    class ExchangeCurrencyResponse implements IExchangeCurrencyResponse {
        constructor(p?: pb.IExchangeCurrencyResponse);
        public error: number;
        public op_type: number;
        public from_amt: number;
        public to_amt: number;
        public rate: string;
        public static create(properties?: pb.IExchangeCurrencyResponse): pb.ExchangeCurrencyResponse;
        public static encode(m: pb.ExchangeCurrencyResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ExchangeCurrencyResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ExchangeCurrencyResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ExchangeCurrencyResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ExchangeCurrencyResponse;
        public static toObject(m: pb.ExchangeCurrencyResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetUserMarksRequest {
        targetId?: (number|null);
    }

    class GetUserMarksRequest implements IGetUserMarksRequest {
        constructor(p?: pb.IGetUserMarksRequest);
        public targetId: number;
        public static create(properties?: pb.IGetUserMarksRequest): pb.GetUserMarksRequest;
        public static encode(m: pb.GetUserMarksRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetUserMarksRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetUserMarksRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetUserMarksRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetUserMarksRequest;
        public static toObject(m: pb.GetUserMarksRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetUserMarksResponse {
        error?: (number|null);
        targetId?: (number|null);
        marks?: (string|null);
        isAuthVerify?: (boolean|null);
        edit_state?: (number|null);
    }

    class GetUserMarksResponse implements IGetUserMarksResponse {
        constructor(p?: pb.IGetUserMarksResponse);
        public error: number;
        public targetId: number;
        public marks: string;
        public isAuthVerify: boolean;
        public edit_state: number;
        public static create(properties?: pb.IGetUserMarksResponse): pb.GetUserMarksResponse;
        public static encode(m: pb.GetUserMarksResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetUserMarksResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetUserMarksResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetUserMarksResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetUserMarksResponse;
        public static toObject(m: pb.GetUserMarksResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUpdateUserMarksRequest {
        marks?: (string|null);
        op?: (number|null);
    }

    class UpdateUserMarksRequest implements IUpdateUserMarksRequest {
        constructor(p?: pb.IUpdateUserMarksRequest);
        public marks: string;
        public op: number;
        public static create(properties?: pb.IUpdateUserMarksRequest): pb.UpdateUserMarksRequest;
        public static encode(m: pb.UpdateUserMarksRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UpdateUserMarksRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UpdateUserMarksRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UpdateUserMarksRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UpdateUserMarksRequest;
        public static toObject(m: pb.UpdateUserMarksRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUpdateUserMarksResponse {
        error?: (number|null);
        marks?: (string|null);
        edit_state?: (number|null);
        op?: (number|null);
    }

    class UpdateUserMarksResponse implements IUpdateUserMarksResponse {
        constructor(p?: pb.IUpdateUserMarksResponse);
        public error: number;
        public marks: string;
        public edit_state: number;
        public op: number;
        public static create(properties?: pb.IUpdateUserMarksResponse): pb.UpdateUserMarksResponse;
        public static encode(m: pb.UpdateUserMarksResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UpdateUserMarksResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UpdateUserMarksResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UpdateUserMarksResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UpdateUserMarksResponse;
        public static toObject(m: pb.UpdateUserMarksResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBuyinEventUsdtChanageNotice {
        game_id?: (number|null);
        usdt_subtract?: (number|null);
        gold_add?: (number|null);
        gold_real_buyin?: (number|null);
    }

    class BuyinEventUsdtChanageNotice implements IBuyinEventUsdtChanageNotice {
        constructor(p?: pb.IBuyinEventUsdtChanageNotice);
        public game_id: number;
        public usdt_subtract: number;
        public gold_add: number;
        public gold_real_buyin: number;
        public static create(properties?: pb.IBuyinEventUsdtChanageNotice): pb.BuyinEventUsdtChanageNotice;
        public static encode(m: pb.BuyinEventUsdtChanageNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BuyinEventUsdtChanageNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BuyinEventUsdtChanageNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BuyinEventUsdtChanageNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BuyinEventUsdtChanageNotice;
        public static toObject(m: pb.BuyinEventUsdtChanageNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IQuickRaiseRequest {
        whichRaise?: (number|null);
        changeVals?: (string[]|null);
        game_id?: (pb.GameId|null);
        isPreFlop?: (boolean|null);
    }

    class QuickRaiseRequest implements IQuickRaiseRequest {
        constructor(p?: pb.IQuickRaiseRequest);
        public whichRaise: number;
        public changeVals: string[];
        public game_id: pb.GameId;
        public isPreFlop: boolean;
        public static create(properties?: pb.IQuickRaiseRequest): pb.QuickRaiseRequest;
        public static encode(m: pb.QuickRaiseRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.QuickRaiseRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.QuickRaiseRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.QuickRaiseRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.QuickRaiseRequest;
        public static toObject(m: pb.QuickRaiseRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IQuickRaiseResponse {
        error?: (number|null);
        whichRaise?: (number|null);
        changeVals?: (string[]|null);
        isPreFlop?: (boolean|null);
    }

    class QuickRaiseResponse implements IQuickRaiseResponse {
        constructor(p?: pb.IQuickRaiseResponse);
        public error: number;
        public whichRaise: number;
        public changeVals: string[];
        public isPreFlop: boolean;
        public static create(properties?: pb.IQuickRaiseResponse): pb.QuickRaiseResponse;
        public static encode(m: pb.QuickRaiseResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.QuickRaiseResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.QuickRaiseResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.QuickRaiseResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.QuickRaiseResponse;
        public static toObject(m: pb.QuickRaiseResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDefaultSettingRequest {
        whichRaise?: (number|null);
        game_id?: (pb.GameId|null);
        isPreFlop?: (boolean|null);
    }

    class DefaultSettingRequest implements IDefaultSettingRequest {
        constructor(p?: pb.IDefaultSettingRequest);
        public whichRaise: number;
        public game_id: pb.GameId;
        public isPreFlop: boolean;
        public static create(properties?: pb.IDefaultSettingRequest): pb.DefaultSettingRequest;
        public static encode(m: pb.DefaultSettingRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DefaultSettingRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DefaultSettingRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DefaultSettingRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DefaultSettingRequest;
        public static toObject(m: pb.DefaultSettingRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDefaultSettingResponse {
        error?: (number|null);
        whichRaise?: (number|null);
        isPreFlop?: (boolean|null);
        defaultVal?: (string[]|null);
    }

    class DefaultSettingResponse implements IDefaultSettingResponse {
        constructor(p?: pb.IDefaultSettingResponse);
        public error: number;
        public whichRaise: number;
        public isPreFlop: boolean;
        public defaultVal: string[];
        public static create(properties?: pb.IDefaultSettingResponse): pb.DefaultSettingResponse;
        public static encode(m: pb.DefaultSettingResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.DefaultSettingResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.DefaultSettingResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DefaultSettingResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.DefaultSettingResponse;
        public static toObject(m: pb.DefaultSettingResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarAllowRequest {
        roomId?: (number|null);
    }

    class StarAllowRequest implements IStarAllowRequest {
        constructor(p?: pb.IStarAllowRequest);
        public roomId: number;
        public static create(properties?: pb.IStarAllowRequest): pb.StarAllowRequest;
        public static encode(m: pb.StarAllowRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarAllowRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarAllowRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarAllowRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarAllowRequest;
        public static toObject(m: pb.StarAllowRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarAllowResponse {
        error?: (number|null);
        roomId?: (number|null);
        notifyTime?: (number|null);
    }

    class StarAllowResponse implements IStarAllowResponse {
        constructor(p?: pb.IStarAllowResponse);
        public error: number;
        public roomId: number;
        public notifyTime: number;
        public static create(properties?: pb.IStarAllowResponse): pb.StarAllowResponse;
        public static encode(m: pb.StarAllowResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarAllowResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarAllowResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarAllowResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarAllowResponse;
        public static toObject(m: pb.StarAllowResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarWillBeginNotice {
        roomId?: (number|null);
        starInfo?: (pb.BeginStarInfo[]|null);
        notifyText?: (string|null);
    }

    class StarWillBeginNotice implements IStarWillBeginNotice {
        constructor(p?: pb.IStarWillBeginNotice);
        public roomId: number;
        public starInfo: pb.BeginStarInfo[];
        public notifyText: string;
        public static create(properties?: pb.IStarWillBeginNotice): pb.StarWillBeginNotice;
        public static encode(m: pb.StarWillBeginNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.StarWillBeginNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.StarWillBeginNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StarWillBeginNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.StarWillBeginNotice;
        public static toObject(m: pb.StarWillBeginNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBeginStarInfo {
        starPic?: (string|null);
        notifyTopic?: (string|null);
    }

    class BeginStarInfo implements IBeginStarInfo {
        constructor(p?: pb.IBeginStarInfo);
        public starPic: string;
        public notifyTopic: string;
        public static create(properties?: pb.IBeginStarInfo): pb.BeginStarInfo;
        public static encode(m: pb.BeginStarInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BeginStarInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BeginStarInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BeginStarInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BeginStarInfo;
        public static toObject(m: pb.BeginStarInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUsdtExchangeConfigNotice {
    }

    class UsdtExchangeConfigNotice implements IUsdtExchangeConfigNotice {
        constructor(p?: pb.IUsdtExchangeConfigNotice);
        public static create(properties?: pb.IUsdtExchangeConfigNotice): pb.UsdtExchangeConfigNotice;
        public static encode(m: pb.UsdtExchangeConfigNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UsdtExchangeConfigNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UsdtExchangeConfigNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UsdtExchangeConfigNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UsdtExchangeConfigNotice;
        public static toObject(m: pb.UsdtExchangeConfigNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetUsdtExchangeConfigRequest {
    }

    class GetUsdtExchangeConfigRequest implements IGetUsdtExchangeConfigRequest {
        constructor(p?: pb.IGetUsdtExchangeConfigRequest);
        public static create(properties?: pb.IGetUsdtExchangeConfigRequest): pb.GetUsdtExchangeConfigRequest;
        public static encode(m: pb.GetUsdtExchangeConfigRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetUsdtExchangeConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetUsdtExchangeConfigRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetUsdtExchangeConfigRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetUsdtExchangeConfigRequest;
        public static toObject(m: pb.GetUsdtExchangeConfigRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetUsdtExchangeConfigResponse {
        error?: (number|null);
        max_usdt_exchange_count?: (number|null);
        left_usdt_exchange_count?: (number|null);
        usdt_fee_ratio?: (string|null);
        point_to_usd_deduction?: (number|null);
        usdt_exchange_interval?: (number|null);
    }

    class GetUsdtExchangeConfigResponse implements IGetUsdtExchangeConfigResponse {
        constructor(p?: pb.IGetUsdtExchangeConfigResponse);
        public error: number;
        public max_usdt_exchange_count: number;
        public left_usdt_exchange_count: number;
        public usdt_fee_ratio: string;
        public point_to_usd_deduction: number;
        public usdt_exchange_interval: number;
        public static create(properties?: pb.IGetUsdtExchangeConfigResponse): pb.GetUsdtExchangeConfigResponse;
        public static encode(m: pb.GetUsdtExchangeConfigResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetUsdtExchangeConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetUsdtExchangeConfigResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetUsdtExchangeConfigResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetUsdtExchangeConfigResponse;
        public static toObject(m: pb.GetUsdtExchangeConfigResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICaptchaInfo {
        code?: (number|null);
        create_time?: (number|null);
        expire_time?: (number|null);
        is_available?: (boolean|null);
        help_count?: (number|null);
        user_prizes_data?: (pb.UserPrizes|null);
        share_image_url?: (string|null);
    }

    class CaptchaInfo implements ICaptchaInfo {
        constructor(p?: pb.ICaptchaInfo);
        public code: number;
        public create_time: number;
        public expire_time: number;
        public is_available: boolean;
        public help_count: number;
        public user_prizes_data?: (pb.UserPrizes|null);
        public share_image_url: string;
        public static create(properties?: pb.ICaptchaInfo): pb.CaptchaInfo;
        public static encode(m: pb.CaptchaInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.CaptchaInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.CaptchaInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CaptchaInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.CaptchaInfo;
        public static toObject(m: pb.CaptchaInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserPrizes {
        luck_warp_type?: (number|null);
        amount?: (number|null);
        ticket_url?: (string|null);
        ticket_name?: (string|null);
        ticket_count?: (number|null);
        ticket_title?: (string|null);
        red_type?: (number|null);
    }

    class UserPrizes implements IUserPrizes {
        constructor(p?: pb.IUserPrizes);
        public luck_warp_type: number;
        public amount: number;
        public ticket_url: string;
        public ticket_name: string;
        public ticket_count: number;
        public ticket_title: string;
        public red_type: number;
        public static create(properties?: pb.IUserPrizes): pb.UserPrizes;
        public static encode(m: pb.UserPrizes, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UserPrizes, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UserPrizes;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserPrizes;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UserPrizes;
        public static toObject(m: pb.UserPrizes, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHelperInfo {
        user_id?: (number|null);
        nick_name?: (string|null);
        avatar?: (string|null);
    }

    class HelperInfo implements IHelperInfo {
        constructor(p?: pb.IHelperInfo);
        public user_id: number;
        public nick_name: string;
        public avatar: string;
        public static create(properties?: pb.IHelperInfo): pb.HelperInfo;
        public static encode(m: pb.HelperInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.HelperInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.HelperInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.HelperInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.HelperInfo;
        public static toObject(m: pb.HelperInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHelpWrapInfo {
        captcha_data?: (pb.CaptchaInfo|null);
        helper_data?: (pb.HelperInfo[]|null);
    }

    class HelpWrapInfo implements IHelpWrapInfo {
        constructor(p?: pb.IHelpWrapInfo);
        public captcha_data?: (pb.CaptchaInfo|null);
        public helper_data: pb.HelperInfo[];
        public static create(properties?: pb.IHelpWrapInfo): pb.HelpWrapInfo;
        public static encode(m: pb.HelpWrapInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.HelpWrapInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.HelpWrapInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.HelpWrapInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.HelpWrapInfo;
        public static toObject(m: pb.HelpWrapInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetUserHelpWarpListRequest {
    }

    class GetUserHelpWarpListRequest implements IGetUserHelpWarpListRequest {
        constructor(p?: pb.IGetUserHelpWarpListRequest);
        public static create(properties?: pb.IGetUserHelpWarpListRequest): pb.GetUserHelpWarpListRequest;
        public static encode(m: pb.GetUserHelpWarpListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetUserHelpWarpListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetUserHelpWarpListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetUserHelpWarpListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetUserHelpWarpListRequest;
        public static toObject(m: pb.GetUserHelpWarpListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetUserHelpWarpListResponse {
        error?: (number|null);
        help_wrap_data?: (pb.HelpWrapInfo[]|null);
        left_help_count?: (number|null);
    }

    class GetUserHelpWarpListResponse implements IGetUserHelpWarpListResponse {
        constructor(p?: pb.IGetUserHelpWarpListResponse);
        public error: number;
        public help_wrap_data: pb.HelpWrapInfo[];
        public left_help_count: number;
        public static create(properties?: pb.IGetUserHelpWarpListResponse): pb.GetUserHelpWarpListResponse;
        public static encode(m: pb.GetUserHelpWarpListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetUserHelpWarpListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetUserHelpWarpListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetUserHelpWarpListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetUserHelpWarpListResponse;
        public static toObject(m: pb.GetUserHelpWarpListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAddHelperRequest {
        code?: (number|null);
    }

    class AddHelperRequest implements IAddHelperRequest {
        constructor(p?: pb.IAddHelperRequest);
        public code: number;
        public static create(properties?: pb.IAddHelperRequest): pb.AddHelperRequest;
        public static encode(m: pb.AddHelperRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AddHelperRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AddHelperRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AddHelperRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AddHelperRequest;
        public static toObject(m: pb.AddHelperRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAddHelperResponse {
        error?: (number|null);
        user_id?: (number|null);
        nick_name?: (string|null);
        avatar?: (string|null);
        user_prizes_data?: (pb.UserPrizes|null);
        total_history_amount?: (number|null);
        left_help_count?: (number|null);
        check_register_days?: (number|null);
    }

    class AddHelperResponse implements IAddHelperResponse {
        constructor(p?: pb.IAddHelperResponse);
        public error: number;
        public user_id: number;
        public nick_name: string;
        public avatar: string;
        public user_prizes_data?: (pb.UserPrizes|null);
        public total_history_amount: number;
        public left_help_count: number;
        public check_register_days: number;
        public static create(properties?: pb.IAddHelperResponse): pb.AddHelperResponse;
        public static encode(m: pb.AddHelperResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AddHelperResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AddHelperResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AddHelperResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AddHelperResponse;
        public static toObject(m: pb.AddHelperResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetTotalHistoryAmountRequest {
    }

    class GetTotalHistoryAmountRequest implements IGetTotalHistoryAmountRequest {
        constructor(p?: pb.IGetTotalHistoryAmountRequest);
        public static create(properties?: pb.IGetTotalHistoryAmountRequest): pb.GetTotalHistoryAmountRequest;
        public static encode(m: pb.GetTotalHistoryAmountRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetTotalHistoryAmountRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetTotalHistoryAmountRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetTotalHistoryAmountRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetTotalHistoryAmountRequest;
        public static toObject(m: pb.GetTotalHistoryAmountRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetTotalHistoryAmountResponse {
        error?: (number|null);
        total_history_amount?: (number|null);
    }

    class GetTotalHistoryAmountResponse implements IGetTotalHistoryAmountResponse {
        constructor(p?: pb.IGetTotalHistoryAmountResponse);
        public error: number;
        public total_history_amount: number;
        public static create(properties?: pb.IGetTotalHistoryAmountResponse): pb.GetTotalHistoryAmountResponse;
        public static encode(m: pb.GetTotalHistoryAmountResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetTotalHistoryAmountResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetTotalHistoryAmountResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetTotalHistoryAmountResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetTotalHistoryAmountResponse;
        public static toObject(m: pb.GetTotalHistoryAmountResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserReceiveHelpWarpRequest {
        code?: (number|null);
    }

    class UserReceiveHelpWarpRequest implements IUserReceiveHelpWarpRequest {
        constructor(p?: pb.IUserReceiveHelpWarpRequest);
        public code: number;
        public static create(properties?: pb.IUserReceiveHelpWarpRequest): pb.UserReceiveHelpWarpRequest;
        public static encode(m: pb.UserReceiveHelpWarpRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UserReceiveHelpWarpRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UserReceiveHelpWarpRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserReceiveHelpWarpRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UserReceiveHelpWarpRequest;
        public static toObject(m: pb.UserReceiveHelpWarpRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserReceiveHelpWarpResponse {
        error?: (number|null);
        code?: (number|null);
        user_prizes_data?: (pb.UserPrizes|null);
        total_history_amount?: (number|null);
    }

    class UserReceiveHelpWarpResponse implements IUserReceiveHelpWarpResponse {
        constructor(p?: pb.IUserReceiveHelpWarpResponse);
        public error: number;
        public code: number;
        public user_prizes_data?: (pb.UserPrizes|null);
        public total_history_amount: number;
        public static create(properties?: pb.IUserReceiveHelpWarpResponse): pb.UserReceiveHelpWarpResponse;
        public static encode(m: pb.UserReceiveHelpWarpResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UserReceiveHelpWarpResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UserReceiveHelpWarpResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserReceiveHelpWarpResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UserReceiveHelpWarpResponse;
        public static toObject(m: pb.UserReceiveHelpWarpResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAddHelpWrapNotice {
    }

    class AddHelpWrapNotice implements IAddHelpWrapNotice {
        constructor(p?: pb.IAddHelpWrapNotice);
        public static create(properties?: pb.IAddHelpWrapNotice): pb.AddHelpWrapNotice;
        public static encode(m: pb.AddHelpWrapNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.AddHelpWrapNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.AddHelpWrapNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AddHelpWrapNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.AddHelpWrapNotice;
        public static toObject(m: pb.AddHelpWrapNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserHelpWarpChangeNotice {
        help_wrap_data?: (pb.HelpWrapInfo|null);
    }

    class UserHelpWarpChangeNotice implements IUserHelpWarpChangeNotice {
        constructor(p?: pb.IUserHelpWarpChangeNotice);
        public help_wrap_data?: (pb.HelpWrapInfo|null);
        public static create(properties?: pb.IUserHelpWarpChangeNotice): pb.UserHelpWarpChangeNotice;
        public static encode(m: pb.UserHelpWarpChangeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UserHelpWarpChangeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UserHelpWarpChangeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserHelpWarpChangeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UserHelpWarpChangeNotice;
        public static toObject(m: pb.UserHelpWarpChangeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeftHelpCountChangeNotice {
        LeftHelpCount?: (number|null);
    }

    class LeftHelpCountChangeNotice implements ILeftHelpCountChangeNotice {
        constructor(p?: pb.ILeftHelpCountChangeNotice);
        public LeftHelpCount: number;
        public static create(properties?: pb.ILeftHelpCountChangeNotice): pb.LeftHelpCountChangeNotice;
        public static encode(m: pb.LeftHelpCountChangeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LeftHelpCountChangeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LeftHelpCountChangeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LeftHelpCountChangeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LeftHelpCountChangeNotice;
        public static toObject(m: pb.LeftHelpCountChangeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserChangeLanguageRequest {
        CurrentLanguage?: (string|null);
    }

    class UserChangeLanguageRequest implements IUserChangeLanguageRequest {
        constructor(p?: pb.IUserChangeLanguageRequest);
        public CurrentLanguage: string;
        public static create(properties?: pb.IUserChangeLanguageRequest): pb.UserChangeLanguageRequest;
        public static encode(m: pb.UserChangeLanguageRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UserChangeLanguageRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UserChangeLanguageRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserChangeLanguageRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UserChangeLanguageRequest;
        public static toObject(m: pb.UserChangeLanguageRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserChangeLanguageResponse {
        error?: (number|null);
    }

    class UserChangeLanguageResponse implements IUserChangeLanguageResponse {
        constructor(p?: pb.IUserChangeLanguageResponse);
        public error: number;
        public static create(properties?: pb.IUserChangeLanguageResponse): pb.UserChangeLanguageResponse;
        public static encode(m: pb.UserChangeLanguageResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.UserChangeLanguageResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.UserChangeLanguageResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserChangeLanguageResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.UserChangeLanguageResponse;
        public static toObject(m: pb.UserChangeLanguageResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILanguageItem {
        lang?: (string|null);
        value?: (string|null);
    }

    class LanguageItem implements ILanguageItem {
        constructor(p?: pb.ILanguageItem);
        public lang: string;
        public value: string;
        public static create(properties?: pb.ILanguageItem): pb.LanguageItem;
        public static encode(m: pb.LanguageItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.LanguageItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.LanguageItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.LanguageItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.LanguageItem;
        public static toObject(m: pb.LanguageItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISportsLoginRequest {
        gameId?: (number|null);
        matchId?: (string|null);
    }

    class SportsLoginRequest implements ISportsLoginRequest {
        constructor(p?: pb.ISportsLoginRequest);
        public gameId: number;
        public matchId: string;
        public static create(properties?: pb.ISportsLoginRequest): pb.SportsLoginRequest;
        public static encode(m: pb.SportsLoginRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SportsLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SportsLoginRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SportsLoginRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SportsLoginRequest;
        public static toObject(m: pb.SportsLoginRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISportsLoginResponse {
        error?: (number|null);
        token?: (string|null);
        frontId?: (string|null);
        gameId?: (number|null);
        matchId?: (string|null);
    }

    class SportsLoginResponse implements ISportsLoginResponse {
        constructor(p?: pb.ISportsLoginResponse);
        public error: number;
        public token: string;
        public frontId: string;
        public gameId: number;
        public matchId: string;
        public static create(properties?: pb.ISportsLoginResponse): pb.SportsLoginResponse;
        public static encode(m: pb.SportsLoginResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SportsLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SportsLoginResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SportsLoginResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SportsLoginResponse;
        public static toObject(m: pb.SportsLoginResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISportsLeaveRequest {
    }

    class SportsLeaveRequest implements ISportsLeaveRequest {
        constructor(p?: pb.ISportsLeaveRequest);
        public static create(properties?: pb.ISportsLeaveRequest): pb.SportsLeaveRequest;
        public static encode(m: pb.SportsLeaveRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SportsLeaveRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SportsLeaveRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SportsLeaveRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SportsLeaveRequest;
        public static toObject(m: pb.SportsLeaveRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISportsLeaveResponse {
        error?: (number|null);
    }

    class SportsLeaveResponse implements ISportsLeaveResponse {
        constructor(p?: pb.ISportsLeaveResponse);
        public error: number;
        public static create(properties?: pb.ISportsLeaveResponse): pb.SportsLeaveResponse;
        public static encode(m: pb.SportsLeaveResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SportsLeaveResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SportsLeaveResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SportsLeaveResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SportsLeaveResponse;
        public static toObject(m: pb.SportsLeaveResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetTexasHandsRequest {
    }

    class GetTexasHandsRequest implements IGetTexasHandsRequest {
        constructor(p?: pb.IGetTexasHandsRequest);
        public static create(properties?: pb.IGetTexasHandsRequest): pb.GetTexasHandsRequest;
        public static encode(m: pb.GetTexasHandsRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetTexasHandsRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetTexasHandsRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetTexasHandsRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetTexasHandsRequest;
        public static toObject(m: pb.GetTexasHandsRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetTexasHandsResponse {
        error?: (number|null);
        totalHands?: (number|null);
    }

    class GetTexasHandsResponse implements IGetTexasHandsResponse {
        constructor(p?: pb.IGetTexasHandsResponse);
        public error: number;
        public totalHands: number;
        public static create(properties?: pb.IGetTexasHandsResponse): pb.GetTexasHandsResponse;
        public static encode(m: pb.GetTexasHandsResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.GetTexasHandsResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.GetTexasHandsResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GetTexasHandsResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.GetTexasHandsResponse;
        public static toObject(m: pb.GetTexasHandsResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPgLoginRequest {
    }

    class PgLoginRequest implements IPgLoginRequest {
        constructor(p?: pb.IPgLoginRequest);
        public static create(properties?: pb.IPgLoginRequest): pb.PgLoginRequest;
        public static encode(m: pb.PgLoginRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgLoginRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgLoginRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgLoginRequest;
        public static toObject(m: pb.PgLoginRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPgLoginResponse {
        error?: (number|null);
        playerSession?: (string|null);
        operatorToken?: (string|null);
    }

    class PgLoginResponse implements IPgLoginResponse {
        constructor(p?: pb.IPgLoginResponse);
        public error: number;
        public playerSession: string;
        public operatorToken: string;
        public static create(properties?: pb.IPgLoginResponse): pb.PgLoginResponse;
        public static encode(m: pb.PgLoginResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgLoginResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgLoginResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgLoginResponse;
        public static toObject(m: pb.PgLoginResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPgLeaveRequest {
    }

    class PgLeaveRequest implements IPgLeaveRequest {
        constructor(p?: pb.IPgLeaveRequest);
        public static create(properties?: pb.IPgLeaveRequest): pb.PgLeaveRequest;
        public static encode(m: pb.PgLeaveRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgLeaveRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgLeaveRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgLeaveRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgLeaveRequest;
        public static toObject(m: pb.PgLeaveRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPgLeaveResponse {
        error?: (number|null);
    }

    class PgLeaveResponse implements IPgLeaveResponse {
        constructor(p?: pb.IPgLeaveResponse);
        public error: number;
        public static create(properties?: pb.IPgLeaveResponse): pb.PgLeaveResponse;
        public static encode(m: pb.PgLeaveResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgLeaveResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgLeaveResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgLeaveResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgLeaveResponse;
        public static toObject(m: pb.PgLeaveResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPgBonusAndFreeGamesRequest {
    }

    class PgBonusAndFreeGamesRequest implements IPgBonusAndFreeGamesRequest {
        constructor(p?: pb.IPgBonusAndFreeGamesRequest);
        public static create(properties?: pb.IPgBonusAndFreeGamesRequest): pb.PgBonusAndFreeGamesRequest;
        public static encode(m: pb.PgBonusAndFreeGamesRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgBonusAndFreeGamesRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgBonusAndFreeGamesRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgBonusAndFreeGamesRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgBonusAndFreeGamesRequest;
        public static toObject(m: pb.PgBonusAndFreeGamesRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPgBonusAndFreeGamesResponse {
        error?: (number|null);
        bonus?: (pb.BonusData[]|null);
        freeGames?: (pb.FreeGamesData[]|null);
        pgGames?: (pb.PgGameData[]|null);
    }

    class PgBonusAndFreeGamesResponse implements IPgBonusAndFreeGamesResponse {
        constructor(p?: pb.IPgBonusAndFreeGamesResponse);
        public error: number;
        public bonus: pb.BonusData[];
        public freeGames: pb.FreeGamesData[];
        public pgGames: pb.PgGameData[];
        public static create(properties?: pb.IPgBonusAndFreeGamesResponse): pb.PgBonusAndFreeGamesResponse;
        public static encode(m: pb.PgBonusAndFreeGamesResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PgBonusAndFreeGamesResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PgBonusAndFreeGamesResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PgBonusAndFreeGamesResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PgBonusAndFreeGamesResponse;
        public static toObject(m: pb.PgBonusAndFreeGamesResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBonusData {
        bonusId?: (number|null);
        bonusName?: (string|null);
        gameIds?: (number[]|null);
        balanceAmount?: (number|null);
        status?: (number|null);
        expiredDate?: (number|null);
    }

    class BonusData implements IBonusData {
        constructor(p?: pb.IBonusData);
        public bonusId: number;
        public bonusName: string;
        public gameIds: number[];
        public balanceAmount: number;
        public status: number;
        public expiredDate: number;
        public static create(properties?: pb.IBonusData): pb.BonusData;
        public static encode(m: pb.BonusData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BonusData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BonusData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BonusData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BonusData;
        public static toObject(m: pb.BonusData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IFreeGamesData {
        freeGameId?: (number|null);
        freeGameName?: (string|null);
        gameIds?: (number[]|null);
        gameCount?: (number|null);
        TotalGame?: (number|null);
        status?: (number|null);
        expiredDate?: (number|null);
    }

    class FreeGamesData implements IFreeGamesData {
        constructor(p?: pb.IFreeGamesData);
        public freeGameId: number;
        public freeGameName: string;
        public gameIds: number[];
        public gameCount: number;
        public TotalGame: number;
        public status: number;
        public expiredDate: number;
        public static create(properties?: pb.IFreeGamesData): pb.FreeGamesData;
        public static encode(m: pb.FreeGamesData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.FreeGamesData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.FreeGamesData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.FreeGamesData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.FreeGamesData;
        public static toObject(m: pb.FreeGamesData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestKYCVerificationStatus {
    }

    class RequestKYCVerificationStatus implements IRequestKYCVerificationStatus {
        constructor(p?: pb.IRequestKYCVerificationStatus);
        public static create(properties?: pb.IRequestKYCVerificationStatus): pb.RequestKYCVerificationStatus;
        public static encode(m: pb.RequestKYCVerificationStatus, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestKYCVerificationStatus, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestKYCVerificationStatus;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestKYCVerificationStatus;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestKYCVerificationStatus;
        public static toObject(m: pb.RequestKYCVerificationStatus, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseKYCVerificationStatus {
        error?: (number|null);
        KYCVerificationStatus?: (string|null);
    }

    class ResponseKYCVerificationStatus implements IResponseKYCVerificationStatus {
        constructor(p?: pb.IResponseKYCVerificationStatus);
        public error: number;
        public KYCVerificationStatus: string;
        public static create(properties?: pb.IResponseKYCVerificationStatus): pb.ResponseKYCVerificationStatus;
        public static encode(m: pb.ResponseKYCVerificationStatus, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseKYCVerificationStatus, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseKYCVerificationStatus;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseKYCVerificationStatus;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseKYCVerificationStatus;
        public static toObject(m: pb.ResponseKYCVerificationStatus, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerRankRequest {
    }

    class MemePokerRankRequest implements IMemePokerRankRequest {
        constructor(p?: pb.IMemePokerRankRequest);
        public static create(properties?: pb.IMemePokerRankRequest): pb.MemePokerRankRequest;
        public static encode(m: pb.MemePokerRankRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerRankRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerRankRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerRankRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerRankRequest;
        public static toObject(m: pb.MemePokerRankRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerAtomData {
        uid?: (number|null);
        nickname?: (string|null);
        thumb?: (string|null);
    }

    class PlayerAtomData implements IPlayerAtomData {
        constructor(p?: pb.IPlayerAtomData);
        public uid: number;
        public nickname: string;
        public thumb: string;
        public static create(properties?: pb.IPlayerAtomData): pb.PlayerAtomData;
        public static encode(m: pb.PlayerAtomData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PlayerAtomData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PlayerAtomData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PlayerAtomData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PlayerAtomData;
        public static toObject(m: pb.PlayerAtomData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerRankData {
        uid?: (number|null);
        nickname?: (string|null);
        thumb?: (string|null);
        amount?: (number|null);
        marks?: (string|null);
        time?: (number|null);
        gender?: (number|null);
        isAuthVerify?: (boolean|null);
    }

    class memePokerRankData implements ImemePokerRankData {
        constructor(p?: pb.ImemePokerRankData);
        public uid: number;
        public nickname: string;
        public thumb: string;
        public amount: number;
        public marks: string;
        public time: number;
        public gender: number;
        public isAuthVerify: boolean;
        public static create(properties?: pb.ImemePokerRankData): pb.memePokerRankData;
        public static encode(m: pb.memePokerRankData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerRankData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerRankData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerRankData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerRankData;
        public static toObject(m: pb.memePokerRankData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerRankResponse {
        error?: (number|null);
        rankData?: (pb.memePokerRankData[]|null);
    }

    class MemePokerRankResponse implements IMemePokerRankResponse {
        constructor(p?: pb.IMemePokerRankResponse);
        public error: number;
        public rankData: pb.memePokerRankData[];
        public static create(properties?: pb.IMemePokerRankResponse): pb.MemePokerRankResponse;
        public static encode(m: pb.MemePokerRankResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerRankResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerRankResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerRankResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerRankResponse;
        public static toObject(m: pb.MemePokerRankResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerPropsListRequest {
        who?: (number|null);
    }

    class MemePokerPropsListRequest implements IMemePokerPropsListRequest {
        constructor(p?: pb.IMemePokerPropsListRequest);
        public who: number;
        public static create(properties?: pb.IMemePokerPropsListRequest): pb.MemePokerPropsListRequest;
        public static encode(m: pb.MemePokerPropsListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerPropsListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerPropsListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerPropsListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerPropsListRequest;
        public static toObject(m: pb.MemePokerPropsListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerPropsData {
        id?: (number|null);
        img?: (string|null);
        amount?: (number|null);
        total?: (number|null);
        fee?: (number|null);
        desc?: (string|null);
        name?: (string|null);
    }

    class memePokerPropsData implements ImemePokerPropsData {
        constructor(p?: pb.ImemePokerPropsData);
        public id: number;
        public img: string;
        public amount: number;
        public total: number;
        public fee: number;
        public desc: string;
        public name: string;
        public static create(properties?: pb.ImemePokerPropsData): pb.memePokerPropsData;
        public static encode(m: pb.memePokerPropsData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerPropsData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerPropsData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerPropsData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerPropsData;
        public static toObject(m: pb.memePokerPropsData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerPropsListResponse {
        error?: (number|null);
        list?: (pb.memePokerPropsData[]|null);
    }

    class MemePokerPropsListResponse implements IMemePokerPropsListResponse {
        constructor(p?: pb.IMemePokerPropsListResponse);
        public error: number;
        public list: pb.memePokerPropsData[];
        public static create(properties?: pb.IMemePokerPropsListResponse): pb.MemePokerPropsListResponse;
        public static encode(m: pb.MemePokerPropsListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerPropsListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerPropsListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerPropsListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerPropsListResponse;
        public static toObject(m: pb.MemePokerPropsListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerSearchUserRequest {
        uid?: (number|null);
    }

    class MemePokerSearchUserRequest implements IMemePokerSearchUserRequest {
        constructor(p?: pb.IMemePokerSearchUserRequest);
        public uid: number;
        public static create(properties?: pb.IMemePokerSearchUserRequest): pb.MemePokerSearchUserRequest;
        public static encode(m: pb.MemePokerSearchUserRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerSearchUserRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerSearchUserRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerSearchUserRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerSearchUserRequest;
        public static toObject(m: pb.MemePokerSearchUserRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISearchUserData {
        uid?: (number|null);
        nickname?: (string|null);
        thumb?: (string|null);
    }

    class SearchUserData implements ISearchUserData {
        constructor(p?: pb.ISearchUserData);
        public uid: number;
        public nickname: string;
        public thumb: string;
        public static create(properties?: pb.ISearchUserData): pb.SearchUserData;
        public static encode(m: pb.SearchUserData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.SearchUserData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.SearchUserData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SearchUserData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.SearchUserData;
        public static toObject(m: pb.SearchUserData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerSearchUserResponse {
        error?: (number|null);
        user?: (pb.SearchUserData|null);
    }

    class MemePokerSearchUserResponse implements IMemePokerSearchUserResponse {
        constructor(p?: pb.IMemePokerSearchUserResponse);
        public error: number;
        public user?: (pb.SearchUserData|null);
        public static create(properties?: pb.IMemePokerSearchUserResponse): pb.MemePokerSearchUserResponse;
        public static encode(m: pb.MemePokerSearchUserResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerSearchUserResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerSearchUserResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerSearchUserResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerSearchUserResponse;
        public static toObject(m: pb.MemePokerSearchUserResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum memePokerPropsAction {
        memePokerPropsAction_Dummy = 0,
        memePokerPropsAction_Give = 1,
        memePokerPropsAction_Exchange = 2,
        memePokerPropsAction_Buy = 3,
        memePokerPropsAction_Gain = 4
    }

    interface IMemePokerPropsActionRequest {
        action?: (pb.memePokerPropsAction|null);
        propsId?: (number|null);
        propsTotal?: (number|null);
        propsAmount?: (number|null);
        propsFee?: (number|null);
        safe?: (string|null);
        toUserId?: (number|null);
    }

    class MemePokerPropsActionRequest implements IMemePokerPropsActionRequest {
        constructor(p?: pb.IMemePokerPropsActionRequest);
        public action: pb.memePokerPropsAction;
        public propsId: number;
        public propsTotal: number;
        public propsAmount: number;
        public propsFee: number;
        public safe: string;
        public toUserId: number;
        public static create(properties?: pb.IMemePokerPropsActionRequest): pb.MemePokerPropsActionRequest;
        public static encode(m: pb.MemePokerPropsActionRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerPropsActionRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerPropsActionRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerPropsActionRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerPropsActionRequest;
        public static toObject(m: pb.MemePokerPropsActionRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerPropsActionResponse {
        error?: (number|null);
    }

    class MemePokerPropsActionResponse implements IMemePokerPropsActionResponse {
        constructor(p?: pb.IMemePokerPropsActionResponse);
        public error: number;
        public static create(properties?: pb.IMemePokerPropsActionResponse): pb.MemePokerPropsActionResponse;
        public static encode(m: pb.MemePokerPropsActionResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerPropsActionResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerPropsActionResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerPropsActionResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerPropsActionResponse;
        public static toObject(m: pb.MemePokerPropsActionResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerPropsLogRequest {
        action?: (pb.memePokerPropsAction|null);
        page?: (number|null);
        size?: (number|null);
    }

    class MemePokerPropsLogRequest implements IMemePokerPropsLogRequest {
        constructor(p?: pb.IMemePokerPropsLogRequest);
        public action: pb.memePokerPropsAction;
        public page: number;
        public size: number;
        public static create(properties?: pb.IMemePokerPropsLogRequest): pb.MemePokerPropsLogRequest;
        public static encode(m: pb.MemePokerPropsLogRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerPropsLogRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerPropsLogRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerPropsLogRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerPropsLogRequest;
        public static toObject(m: pb.MemePokerPropsLogRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerPropsLogResponse {
        error?: (number|null);
        total?: (number|null);
        page?: (number|null);
        list?: (pb.memePokerPropsActionData[]|null);
    }

    class MemePokerPropsLogResponse implements IMemePokerPropsLogResponse {
        constructor(p?: pb.IMemePokerPropsLogResponse);
        public error: number;
        public total: number;
        public page: number;
        public list: pb.memePokerPropsActionData[];
        public static create(properties?: pb.IMemePokerPropsLogResponse): pb.MemePokerPropsLogResponse;
        public static encode(m: pb.MemePokerPropsLogResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerPropsLogResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerPropsLogResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerPropsLogResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerPropsLogResponse;
        public static toObject(m: pb.MemePokerPropsLogResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerPropsActionData {
        action?: (pb.memePokerPropsAction|null);
        time?: (number|null);
        propsId?: (number|null);
        propsName?: (string|null);
        propsTotal?: (number|null);
        userId?: (number|null);
        userNickName?: (string|null);
        exchangeAmount?: (number|null);
        buyCostAmount?: (number|null);
    }

    class memePokerPropsActionData implements ImemePokerPropsActionData {
        constructor(p?: pb.ImemePokerPropsActionData);
        public action: pb.memePokerPropsAction;
        public time: number;
        public propsId: number;
        public propsName: string;
        public propsTotal: number;
        public userId: number;
        public userNickName: string;
        public exchangeAmount: number;
        public buyCostAmount: number;
        public static create(properties?: pb.ImemePokerPropsActionData): pb.memePokerPropsActionData;
        public static encode(m: pb.memePokerPropsActionData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerPropsActionData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerPropsActionData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerPropsActionData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerPropsActionData;
        public static toObject(m: pb.memePokerPropsActionData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerCoinExchangeShopGoods {
        id?: (number|null);
        costDiamond?: (number|null);
        obtainCoin?: (number|null);
    }

    class memePokerCoinExchangeShopGoods implements ImemePokerCoinExchangeShopGoods {
        constructor(p?: pb.ImemePokerCoinExchangeShopGoods);
        public id: number;
        public costDiamond: number;
        public obtainCoin: number;
        public static create(properties?: pb.ImemePokerCoinExchangeShopGoods): pb.memePokerCoinExchangeShopGoods;
        public static encode(m: pb.memePokerCoinExchangeShopGoods, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerCoinExchangeShopGoods, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerCoinExchangeShopGoods;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerCoinExchangeShopGoods;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerCoinExchangeShopGoods;
        public static toObject(m: pb.memePokerCoinExchangeShopGoods, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMemePokerCoinExchangeShopRequest {
    }

    class MemePokerCoinExchangeShopRequest implements IMemePokerCoinExchangeShopRequest {
        constructor(p?: pb.IMemePokerCoinExchangeShopRequest);
        public static create(properties?: pb.IMemePokerCoinExchangeShopRequest): pb.MemePokerCoinExchangeShopRequest;
        public static encode(m: pb.MemePokerCoinExchangeShopRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MemePokerCoinExchangeShopRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MemePokerCoinExchangeShopRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MemePokerCoinExchangeShopRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MemePokerCoinExchangeShopRequest;
        public static toObject(m: pb.MemePokerCoinExchangeShopRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerCoinExchangeShopResponse {
        error?: (number|null);
        list?: (pb.memePokerCoinExchangeShopGoods[]|null);
    }

    class memePokerCoinExchangeShopResponse implements ImemePokerCoinExchangeShopResponse {
        constructor(p?: pb.ImemePokerCoinExchangeShopResponse);
        public error: number;
        public list: pb.memePokerCoinExchangeShopGoods[];
        public static create(properties?: pb.ImemePokerCoinExchangeShopResponse): pb.memePokerCoinExchangeShopResponse;
        public static encode(m: pb.memePokerCoinExchangeShopResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerCoinExchangeShopResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerCoinExchangeShopResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerCoinExchangeShopResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerCoinExchangeShopResponse;
        public static toObject(m: pb.memePokerCoinExchangeShopResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerCoinExchangeRequest {
        id?: (number|null);
        costDiamond?: (number|null);
        obtainCoin?: (number|null);
    }

    class memePokerCoinExchangeRequest implements ImemePokerCoinExchangeRequest {
        constructor(p?: pb.ImemePokerCoinExchangeRequest);
        public id: number;
        public costDiamond: number;
        public obtainCoin: number;
        public static create(properties?: pb.ImemePokerCoinExchangeRequest): pb.memePokerCoinExchangeRequest;
        public static encode(m: pb.memePokerCoinExchangeRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerCoinExchangeRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerCoinExchangeRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerCoinExchangeRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerCoinExchangeRequest;
        public static toObject(m: pb.memePokerCoinExchangeRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerCoinExchangeResponse {
        error?: (number|null);
    }

    class memePokerCoinExchangeResponse implements ImemePokerCoinExchangeResponse {
        constructor(p?: pb.ImemePokerCoinExchangeResponse);
        public error: number;
        public static create(properties?: pb.ImemePokerCoinExchangeResponse): pb.memePokerCoinExchangeResponse;
        public static encode(m: pb.memePokerCoinExchangeResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerCoinExchangeResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerCoinExchangeResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerCoinExchangeResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerCoinExchangeResponse;
        public static toObject(m: pb.memePokerCoinExchangeResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerRechargeGoods {
        id?: (number|null);
        costAmount?: (number|null);
        obtainDiamond?: (number|null);
    }

    class memePokerRechargeGoods implements ImemePokerRechargeGoods {
        constructor(p?: pb.ImemePokerRechargeGoods);
        public id: number;
        public costAmount: number;
        public obtainDiamond: number;
        public static create(properties?: pb.ImemePokerRechargeGoods): pb.memePokerRechargeGoods;
        public static encode(m: pb.memePokerRechargeGoods, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerRechargeGoods, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerRechargeGoods;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerRechargeGoods;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerRechargeGoods;
        public static toObject(m: pb.memePokerRechargeGoods, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerRechargeGoodsRequest {
    }

    class memePokerRechargeGoodsRequest implements ImemePokerRechargeGoodsRequest {
        constructor(p?: pb.ImemePokerRechargeGoodsRequest);
        public static create(properties?: pb.ImemePokerRechargeGoodsRequest): pb.memePokerRechargeGoodsRequest;
        public static encode(m: pb.memePokerRechargeGoodsRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerRechargeGoodsRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerRechargeGoodsRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerRechargeGoodsRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerRechargeGoodsRequest;
        public static toObject(m: pb.memePokerRechargeGoodsRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ImemePokerRechargeGoodsResponse {
        error?: (number|null);
        list?: (pb.memePokerRechargeGoods[]|null);
    }

    class memePokerRechargeGoodsResponse implements ImemePokerRechargeGoodsResponse {
        constructor(p?: pb.ImemePokerRechargeGoodsResponse);
        public error: number;
        public list: pb.memePokerRechargeGoods[];
        public static create(properties?: pb.ImemePokerRechargeGoodsResponse): pb.memePokerRechargeGoodsResponse;
        public static encode(m: pb.memePokerRechargeGoodsResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.memePokerRechargeGoodsResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.memePokerRechargeGoodsResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.memePokerRechargeGoodsResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.memePokerRechargeGoodsResponse;
        public static toObject(m: pb.memePokerRechargeGoodsResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBlackJackLoginRequest {
    }

    class BlackJackLoginRequest implements IBlackJackLoginRequest {
        constructor(p?: pb.IBlackJackLoginRequest);
        public static create(properties?: pb.IBlackJackLoginRequest): pb.BlackJackLoginRequest;
        public static encode(m: pb.BlackJackLoginRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BlackJackLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BlackJackLoginRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BlackJackLoginRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BlackJackLoginRequest;
        public static toObject(m: pb.BlackJackLoginRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBlackJackLoginResponse {
        error?: (number|null);
        token?: (string|null);
        urlBlackJack?: (string|null);
        config?: (pb.BjConfig|null);
    }

    class BlackJackLoginResponse implements IBlackJackLoginResponse {
        constructor(p?: pb.IBlackJackLoginResponse);
        public error: number;
        public token: string;
        public urlBlackJack: string;
        public config?: (pb.BjConfig|null);
        public static create(properties?: pb.IBlackJackLoginResponse): pb.BlackJackLoginResponse;
        public static encode(m: pb.BlackJackLoginResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BlackJackLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BlackJackLoginResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BlackJackLoginResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BlackJackLoginResponse;
        public static toObject(m: pb.BlackJackLoginResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeOpenCalmDownWindows {
        calmDownSeconds?: (number|null);
        numNotification?: (number|null);
    }

    class NoticeOpenCalmDownWindows implements INoticeOpenCalmDownWindows {
        constructor(p?: pb.INoticeOpenCalmDownWindows);
        public calmDownSeconds: number;
        public numNotification: number;
        public static create(properties?: pb.INoticeOpenCalmDownWindows): pb.NoticeOpenCalmDownWindows;
        public static encode(m: pb.NoticeOpenCalmDownWindows, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeOpenCalmDownWindows, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeOpenCalmDownWindows;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeOpenCalmDownWindows;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeOpenCalmDownWindows;
        public static toObject(m: pb.NoticeOpenCalmDownWindows, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCalmDownConfirm {
        confirm?: (boolean|null);
    }

    class RequestCalmDownConfirm implements IRequestCalmDownConfirm {
        constructor(p?: pb.IRequestCalmDownConfirm);
        public confirm: boolean;
        public static create(properties?: pb.IRequestCalmDownConfirm): pb.RequestCalmDownConfirm;
        public static encode(m: pb.RequestCalmDownConfirm, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.RequestCalmDownConfirm, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.RequestCalmDownConfirm;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RequestCalmDownConfirm;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.RequestCalmDownConfirm;
        public static toObject(m: pb.RequestCalmDownConfirm, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCalmDownConfirm {
        error?: (number|null);
    }

    class ResponseCalmDownConfirm implements IResponseCalmDownConfirm {
        constructor(p?: pb.IResponseCalmDownConfirm);
        public error: number;
        public static create(properties?: pb.IResponseCalmDownConfirm): pb.ResponseCalmDownConfirm;
        public static encode(m: pb.ResponseCalmDownConfirm, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.ResponseCalmDownConfirm, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.ResponseCalmDownConfirm;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ResponseCalmDownConfirm;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.ResponseCalmDownConfirm;
        public static toObject(m: pb.ResponseCalmDownConfirm, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCalmDownConfirmResult {
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
        numNotification?: (number|null);
    }

    class NoticeCalmDownConfirmResult implements INoticeCalmDownConfirmResult {
        constructor(p?: pb.INoticeCalmDownConfirmResult);
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public numNotification: number;
        public static create(properties?: pb.INoticeCalmDownConfirmResult): pb.NoticeCalmDownConfirmResult;
        public static encode(m: pb.NoticeCalmDownConfirmResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NoticeCalmDownConfirmResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NoticeCalmDownConfirmResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NoticeCalmDownConfirmResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NoticeCalmDownConfirmResult;
        public static toObject(m: pb.NoticeCalmDownConfirmResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBjConfig {
        world?: (string[]|null);
        game?: (string[]|null);
        api?: (string[]|null);
    }

    class BjConfig implements IBjConfig {
        constructor(p?: pb.IBjConfig);
        public world: string[];
        public game: string[];
        public api: string[];
        public static create(properties?: pb.IBjConfig): pb.BjConfig;
        public static encode(m: pb.BjConfig, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BjConfig, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BjConfig;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BjConfig;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BjConfig;
        public static toObject(m: pb.BjConfig, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBlackJackData {
        token?: (string|null);
        urlBlackJack?: (string|null);
        config?: (pb.BjConfig|null);
    }

    class BlackJackData implements IBlackJackData {
        constructor(p?: pb.IBlackJackData);
        public token: string;
        public urlBlackJack: string;
        public config?: (pb.BjConfig|null);
        public static create(properties?: pb.IBlackJackData): pb.BlackJackData;
        public static encode(m: pb.BlackJackData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.BlackJackData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.BlackJackData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BlackJackData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.BlackJackData;
        public static toObject(m: pb.BlackJackData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMttData {
        token?: (string|null);
        url?: (string|null);
    }

    class MttData implements IMttData {
        constructor(p?: pb.IMttData);
        public token: string;
        public url: string;
        public static create(properties?: pb.IMttData): pb.MttData;
        public static encode(m: pb.MttData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.MttData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.MttData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MttData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.MttData;
        public static toObject(m: pb.MttData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPositionInfo {
        longtitude?: (number|null);
        latitude?: (number|null);
        ip?: (string|null);
    }

    class PositionInfo implements IPositionInfo {
        constructor(p?: pb.IPositionInfo);
        public longtitude: number;
        public latitude: number;
        public ip: string;
        public static create(properties?: pb.IPositionInfo): pb.PositionInfo;
        public static encode(m: pb.PositionInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PositionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PositionInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PositionInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PositionInfo;
        public static toObject(m: pb.PositionInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INewPayOrderRequest {
        pay_mode?: (number|null);
        product_id?: (string|null);
    }

    class NewPayOrderRequest implements INewPayOrderRequest {
        constructor(p?: pb.INewPayOrderRequest);
        public pay_mode: number;
        public product_id: string;
        public static create(properties?: pb.INewPayOrderRequest): pb.NewPayOrderRequest;
        public static encode(m: pb.NewPayOrderRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NewPayOrderRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NewPayOrderRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NewPayOrderRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NewPayOrderRequest;
        public static toObject(m: pb.NewPayOrderRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INewPayOrderResponse {
        error?: (number|null);
        pay_order_no?: (string|null);
        product_id?: (string|null);
    }

    class NewPayOrderResponse implements INewPayOrderResponse {
        constructor(p?: pb.INewPayOrderResponse);
        public error: number;
        public pay_order_no: string;
        public product_id: string;
        public static create(properties?: pb.INewPayOrderResponse): pb.NewPayOrderResponse;
        public static encode(m: pb.NewPayOrderResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.NewPayOrderResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.NewPayOrderResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.NewPayOrderResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.NewPayOrderResponse;
        public static toObject(m: pb.NewPayOrderResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPayOrderConfirmRequest {
        pay_order_no?: (string|null);
        receipt?: (string|null);
    }

    class PayOrderConfirmRequest implements IPayOrderConfirmRequest {
        constructor(p?: pb.IPayOrderConfirmRequest);
        public pay_order_no: string;
        public receipt: string;
        public static create(properties?: pb.IPayOrderConfirmRequest): pb.PayOrderConfirmRequest;
        public static encode(m: pb.PayOrderConfirmRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PayOrderConfirmRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PayOrderConfirmRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PayOrderConfirmRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PayOrderConfirmRequest;
        public static toObject(m: pb.PayOrderConfirmRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPayOrderConfirmResponse {
        error?: (number|null);
        diamond_count?: (number|null);
    }

    class PayOrderConfirmResponse implements IPayOrderConfirmResponse {
        constructor(p?: pb.IPayOrderConfirmResponse);
        public error: number;
        public diamond_count: number;
        public static create(properties?: pb.IPayOrderConfirmResponse): pb.PayOrderConfirmResponse;
        public static encode(m: pb.PayOrderConfirmResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pb.PayOrderConfirmResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pb.PayOrderConfirmResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PayOrderConfirmResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pb.PayOrderConfirmResponse;
        public static toObject(m: pb.PayOrderConfirmResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
