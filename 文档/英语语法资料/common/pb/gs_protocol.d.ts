import * as $protobuf from "protobufjs";
export namespace protocol {

    enum MSGID {
        MsgID_Min = 0,
        MsgID_ConnClose_Notice = 10,
        MsgId_SysDestroyRoom_Request = 20,
        MsgId_SysRoom_Notice = 30,
        MsgID_Logon_Request = 10000,
        MsgID_Logon_Response = 10001,
        MsgID_CreateRoom_Request = 10002,
        MsgID_CreateRoom_Response = 10003,
        MsgID_CreateRoom_Notice = 10004,
        MsgID_DestroyRoom_Request = 10005,
        MsgID_DestroyRoom_Response = 10006,
        MsgID_DestroyRoom_Notice = 10007,
        MsgID_JoinRoom_Request = 10008,
        MsgID_JoinRoom_Response = 10009,
        MsgID_LeaveRoom_Request = 10010,
        MsgID_LeaveRoom_Response = 10011,
        MsgID_SitDown_Request = 10012,
        MsgID_SitDown_Response = 10013,
        MsgID_SitDown_Notice = 10014,
        MsgID_Standup_Request = 10015,
        MsgID_Standup_Response = 10016,
        MsgID_Standup_Notice = 10017,
        MsgID_Buyin_Request = 10018,
        MsgID_Buyin_Response = 10019,
        MsgID_StartGame_Request = 10024,
        MsgID_StartGame_Response = 10025,
        MsgID_StartGame_Notice = 10026,
        MsgID_ResetGame_Notice = 10027,
        MsgID_Game_Post_Notice = 10028,
        MsgID_Game_Ante_Notice = 10029,
        MsgID_Game_ElectDealer_Notice = 10030,
        MsgID_Game_Blind_Notice = 10031,
        MsgID_Game_HoleCard_Notice = 10032,
        MsgID_PlayerActionTurn_Notice = 10033,
        MsgID_Action_Request = 10034,
        MsgID_Action_Response = 10035,
        MsgID_PlayerAction_Notice = 10036,
        MsgID_Game_RoundEnd_Notice = 10037,
        MsgID_CommunityCards_Notice = 10038,
        MsgID_Game_ShowCard_Notice = 10039,
        MsgID_Game_Insurance_Notice = 10040,
        MsgID_BuyInsurance_Request = 10041,
        MsgID_BuyInsurance_Response = 10042,
        MsgID_Game_Settlement_Notice = 10043,
        MsgID_Game_Snapshot_Notice = 10044,
        MsgID_Random_Seat_Notice = 10045,
        MsgID_Game_ShowDown_Notice = 10046,
        MsgID_Room_Situation_Request = 10047,
        MsgID_Room_Situation_Response = 10048,
        MsgID_Room_Situation_Notice = 10049,
        MsgID_SendCard_Fun_Request = 10050,
        MsgID_SendCard_Fun_Response = 10051,
        MsgID_SendCard_Fun_Notice = 10052,
        MsgID_SendChat_Request = 10053,
        MsgID_SendChat_Response = 10054,
        MsgID_SendChat_Notice = 10055,
        MsgID_StayPosition_Request = 10056,
        MsgID_StayPosition_Response = 10057,
        MsgID_StayPosition_Notice = 10058,
        MsgID_BackPosition_Request = 10059,
        MsgID_BackPosition_Response = 10060,
        MsgID_BackPosition_Notice = 10061,
        MsgID_ShowCard_Request = 10062,
        MsgID_ShowCard_Response = 10063,
        MsgID_ShowCard_Notice = 10064,
        MsgID_Login_Player_JoinRoom_Notice = 10065,
        MsgID_Waiting_OtherPlayer_Notice = 10066,
        MsgID_UpdateMoney_Request = 10067,
        MsgID_UpdateMoney_Response = 10068,
        MsgID_Buyin_Notice = 10069,
        MsgID_GameRecords_Notice = 10070,
        MsgID_BuyInsuranceResult_Notice = 10074,
        MsgID_InsuranceToomanyLeader_Notice = 10075,
        MsgID_InsuranceHitOuts_Notice = 10076,
        MsgID_InsuranceMissOuts_Notice = 10077,
        MsgID_NoNeedInsurance_Notice = 10078,
        MsgID_Snapshot_Request = 10079,
        MsgID_Snapshot_Response = 10080,
        MsgID_Buyout_Request = 10081,
        MsgID_Buyout_Response = 10082,
        MsgID_Buyout_Notice = 10083,
        MsgID_RealStart_Notice = 10084,
        MsgID_AddActionTime_Notice = 10085,
        MsgID_NotSupport_Insurance_Notice = 10086,
        MsgID_HeartBeat_Request = 10087,
        MsgID_HeartBeat_Response = 10088,
        MsgID_InteractiveExpression_Request = 10089,
        MsgID_InteractiveExpression_Response = 10090,
        MsgID_InteractiveExpression_Notice = 10091,
        MsgID_AddInsuranceTime_Request = 10092,
        MsgID_AddInsuranceTime_Response = 10093,
        MsgID_AddInsuranceTime_Notice = 10094,
        MsgID_AddRoomTime_Request = 10095,
        MsgID_AddRoomTime_Response = 10096,
        MsgID_AddRoomTime_Notice = 10097,
        MsgID_ProhibitSitdown_Request = 10098,
        MsgID_ProhibitSitdown_Response = 10099,
        MsgID_ProhibitSitdown_Notice = 10100,
        MsgID_ForceStandup_Request = 10101,
        MsgID_ForceStandup_Response = 10102,
        MsgID_ForceStandup_Notice = 10103,
        MsgID_PauseGame_Request = 10104,
        MsgID_PauseGame_Response = 10105,
        MsgID_PauseGame_Notice = 10106,
        MsgID_InitiativeDestroyRoom_Notice = 10107,
        MsgID_CheckOutAndLeave_Request = 10108,
        MsgID_CheckOutAndLeave_Response = 10109,
        MsgID_CheckOutAndLeave_Notice = 10110,
        MsgID_DefaultFold_Request = 10111,
        MsgID_DefaultFold_Response = 10112,
        MsgID_OwnerSetBuyinLimit_Request = 10113,
        MsgID_OwnerSetBuyinLimit_Response = 10114,
        MsgID_OwnerSetBuyinLimit_Notice = 10115,
        MsgID_PlayerBuyinsInfo_Request = 10116,
        MsgID_PlayerBuyinsInfo_Response = 10117,
        MsgID_PlayerBuyinsInfo_Notice = 10118,
        MsgID_GameActionTurn_Request = 10119,
        MsgID_GameActionTurn_Response = 10120,
        MsgID_PhotoVerify_Request = 10121,
        MsgID_PhotoVerify_Response = 10122,
        MsgID_PhotoVerify_Notice = 10123,
        MsgID_UploadVerifyPhotoSucc_Request = 10124,
        MsgID_UploadVerifyPhotoSucc_Response = 10125,
        MsgID_UploadVerifyPhotoSucc_Notice = 10126,
        MsgID_GlobalMessage_Notice = 10127,
        MsgID_FairGame_Notice = 10128,
        MsgID_CheckAllianceRoomPriviledge_Request = 10129,
        MsgID_CheckAllianceRoomPriviledge_Response = 10130,
        MsgID_ForceShowCard_Request = 10131,
        MsgID_ForceShowCard_Response = 10132,
        MsgID_ForceShowCard_Notice = 10133,
        MsgID_AddRommExTimeLeft_Notice = 10134,
        MsgID_AddRoomTimeCount_Request = 10135,
        MsgID_AddRoomTimeCount_response = 10136,
        MsgID_RoomDisMiss_Notice = 10137,
        MsgID_RequestJoinRoomWithPassword = 10138,
        MsgID_ResponseJoinRoomWithPassword = 10139,
        MsgID_RequestCheckBuyinPassword = 10140,
        MsgID_ResponseCheckBuyinPassword = 10141,
        MsgID_RequestCheckFirstTimeJoinRoomWithPassword = 10142,
        MsgID_ResponseCheckFirstTimeJoinRoomWithPassword = 10143,
        MsgID_RequestCheckFirstTimeBuyinWithPassword = 10144,
        MsgID_ResponseCheckFirstTimeBuyinWithPassword = 10145,
        MsgID_UpdateMoney_Notice = 10146,
        MsgID_AutoCompleteChips_request = 10147,
        MsgID_AutoCompleteChips_response = 10148,
        MsgID_NotiPlayerHoleCard_Notice = 10150,
        MsgID_CheckVpn_Notice = 10151,
        MsgID_QuickLeave_Request = 10152,
        MsgID_QuickLeave_Response = 10153,
        MsgID_QuickLeave_Notice = 10154,
        MsgID_QuickFold_Request = 10155,
        MsgID_QuickFold_Response = 10156,
        MsgID_TimeOut_QuickFold = 10157,
        MsgID_LastRound_Win = 10158,
        MsgId_KickOff_Request = 10159,
        MsgId_GetGameUUIdsJs_Request = 10301,
        MsgId_GetGameUUIdsJs_Response = 10302,
        MsgId_GetGameUUIdsJs_Notice = 10303,
        MsgId_GuessHandCard_BeginBet_Notice = 10304,
        MsgId_GuessHandCard_Bet_Request = 10305,
        MsgId_GuessHandCard_Bet_Response = 10306,
        MsgId_GuessHandCard_SetBetOpt_Request = 10307,
        MsgId_GuessHandCard_SetBetOpt_Response = 10308,
        MsgId_GuessHandCard_Settle_Notice = 10309,
        MsgId_GetRoomLimit_ID_Request = 10401,
        MsgId_GetRoomLimit_ID_Response = 10402,
        MsgId_CriticismStart_Notice = 10403,
        MsgId_NotEnoughMoney2Crit_Notice = 10404,
        MsgId_AutoWithdraw_Request = 10405,
        MsgId_AutoWithdraw_Response = 10406,
        MsgID_UploadGuessState_Request = 10407,
        MsgID_ShowCritPrompt_Notice = 10408,
        MsgId_SendBarrage_Request = 10421,
        MsgId_SendBarrage_Response = 10422,
        MsgId_SendBarrage_Notice = 10423,
        MsgId_BarrageCount_Request = 10424,
        MsgId_BarrageCount_Response = 10425,
        MsgID_ReplayForceShowCard_Request = 10426,
        MsgID_ReplayForceShowCard_Response = 10427,
        MsgID_ReplayForceShowCard_Notice = 10428,
        MsgID_ReplaySendCard_Request = 10429,
        MsgID_ReplaySendCard_Response = 10430,
        MsgID_ReplaySendCard_Notice = 10431,
        MsgID_NotiGameUpdateThumb_Request = 10432,
        MsgID_NotiGameUpdateThumb_Response = 10433,
        MsgID_ChangeTable_Request = 10434,
        MsgID_ChangeTable_Response = 10435,
        MsgId_NotDisturb_Request = 10528,
        MsgId_NotDisturb_Response = 10529,
        MsgId_OpenLive_Request = 10530,
        MsgId_OpenLive_Response = 10531,
        MsgId_OpenMike_Request = 10532,
        MsgId_OpenMike_Response = 10533,
        MsgId_CloseStar_Notice = 10544,
        MsgID_FavoriteHand_Request = 10545,
        MsgID_FavoriteHand_Response = 10546,
        MsgId_Like_Request = 10551,
        MsgId_Like_Response = 10552,
        MsgId_Like_Notice = 10553,
        MsgId_GoodFriendJoinTable_Notice = 10556,
        MsgId_IsEmojiFree_Request = 10557,
        MsgId_IsEmojiFree_Response = 10558,
        MsgId_IsEmojiFree_Notice = 10559,
        MsgId_IntimacyUp_Notice = 10563,
        MsgId_MikeMode_Request = 10564,
        MsgId_MikeMode_Response = 10565,
        MsgId_VoicePrivate_Notice = 10566,
        MsgId_CanSpeak_Notice = 10567,
        MsgId_InviterSeatFreed_Notice = 10568,
        MsgId_StarCache_Notice = 10569,
        MsgId_StarWillClose_Notice = 10570,
        MsgId_Tip_Request = 10571,
        MsgId_Tip_Response = 10572,
        MsgId_Luck_StarSeat_Countdown_Notice = 10581,
        MsgId_Luck_StarSeat_CloseActive_Notice = 10582,
        MsgId_Luck_StarSeat_DrawResult_Notice = 10583,
        MsgId_GetLuck_StarSeat_DrawList_Request = 10584,
        MsgId_GetLuck_StarSeat_DrawList_Response = 10585,
        MsgId_GetSelf_LuckStarSeat_ResultList_Request = 10586,
        MsgId_GetSelf_LuckStarSeat_ResultList_Response = 10587,
        MsgId_RoomNews_Notice = 10576,
        MsgId_TipRank_Request = 10577,
        MsgId_TipRank_Response = 10578,
        MsgId_TipRecord_Request = 10591,
        MsgId_TipRecord_Response = 10592,
        MsgId_SendBarrageForbidden_Request = 10594,
        MsgId_SendBarrageForbidden_Response = 10595,
        MsgId_SendBarrageForbidden_Notice = 10596,
        MsgId_SendBarrageForbiddenConfChange_Notice = 10597,
        MsgId_TipForbidden_Notice = 10603
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

    enum Guess_Bet_Type {
        None_Bet = 0,
        User_Bet = 1,
        Auto_Bet = 2
    }

    interface INoticeSysRoom {
        roomid?: (number|null);
    }

    class NoticeSysRoom implements INoticeSysRoom {
        constructor(p?: protocol.INoticeSysRoom);
        public roomid: number;
        public static create(properties?: protocol.INoticeSysRoom): protocol.NoticeSysRoom;
        public static encode(m: protocol.NoticeSysRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeSysRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeSysRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeSysRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeSysRoom;
        public static toObject(m: protocol.NoticeSysRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICommentatorInfo {
        uid?: (number|null);
        mikeStatus?: (number|null);
        television?: (number|null);
    }

    class CommentatorInfo implements ICommentatorInfo {
        constructor(p?: protocol.ICommentatorInfo);
        public uid: number;
        public mikeStatus: number;
        public television: number;
        public static create(properties?: protocol.ICommentatorInfo): protocol.CommentatorInfo;
        public static encode(m: protocol.CommentatorInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.CommentatorInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.CommentatorInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.CommentatorInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.CommentatorInfo;
        public static toObject(m: protocol.CommentatorInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPositionInfo {
        longtitude?: (number|null);
        latitude?: (number|null);
        ip?: (string|null);
    }

    class PositionInfo implements IPositionInfo {
        constructor(p?: protocol.IPositionInfo);
        public longtitude: number;
        public latitude: number;
        public ip: string;
        public static create(properties?: protocol.IPositionInfo): protocol.PositionInfo;
        public static encode(m: protocol.PositionInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PositionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PositionInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PositionInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PositionInfo;
        public static toObject(m: protocol.PositionInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerInfo {
        playerid?: (number|null);
        seatid?: (number|null);
        name?: (string|null);
        headurl?: (string|null);
        marks?: (string|null);
        gender?: (number|null);
        stake?: (number|null);
        last_voice?: (string|null);
        last_action?: (protocol.ActionType|null);
        in_game?: (boolean|null);
        inStay?: (boolean|null);
        left_stay_time?: (number|null);
        round_bet?: (number|null);
        cards?: (protocol.CardItem[]|null);
        position?: (protocol.PositionInfo|null);
        aofShow?: (boolean|null);
        is_auto_withdraw?: (boolean|null);
        isGameEnd?: (boolean|null);
        plat?: (number|null);
        is_online?: (boolean|null);
        user_join_room_time?: (number|null);
        identity?: (number|null);
        NotDisturbUids?: (number[]|null);
        liveStatus?: (number|null);
        mikeStatus?: (number|null);
        last_change_voice?: (number|null);
        mikeMode?: (number|null);
        canSpeak?: (boolean|null);
    }

    class PlayerInfo implements IPlayerInfo {
        constructor(p?: protocol.IPlayerInfo);
        public playerid: number;
        public seatid: number;
        public name: string;
        public headurl: string;
        public marks: string;
        public gender: number;
        public stake: number;
        public last_voice: string;
        public last_action: protocol.ActionType;
        public in_game: boolean;
        public inStay: boolean;
        public left_stay_time: number;
        public round_bet: number;
        public cards: protocol.CardItem[];
        public position?: (protocol.PositionInfo|null);
        public aofShow: boolean;
        public is_auto_withdraw: boolean;
        public isGameEnd: boolean;
        public plat: number;
        public is_online: boolean;
        public user_join_room_time: number;
        public identity: number;
        public NotDisturbUids: number[];
        public liveStatus: number;
        public mikeStatus: number;
        public last_change_voice: number;
        public mikeMode: number;
        public canSpeak: boolean;
        public static create(properties?: protocol.IPlayerInfo): protocol.PlayerInfo;
        public static encode(m: protocol.PlayerInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerInfo;
        public static toObject(m: protocol.PlayerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestLogon {
        version?: (string|null);
        token?: (string|null);
        position?: (protocol.PositionInfo|null);
        device_info?: (string|null);
        is_ban_area?: (boolean|null);
        is_vpn?: (boolean|null);
        client_type?: (protocol.ClientType|null);
    }

    class RequestLogon implements IRequestLogon {
        constructor(p?: protocol.IRequestLogon);
        public version: string;
        public token: string;
        public position?: (protocol.PositionInfo|null);
        public device_info: string;
        public is_ban_area: boolean;
        public is_vpn: boolean;
        public client_type: protocol.ClientType;
        public static create(properties?: protocol.IRequestLogon): protocol.RequestLogon;
        public static encode(m: protocol.RequestLogon, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestLogon, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestLogon;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestLogon;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestLogon;
        public static toObject(m: protocol.RequestLogon, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseLogon {
        error?: (number|null);
        roomid?: (number|null);
        anti_simulator?: (boolean|null);
        anti_simulator_ignore_cond?: (number|null);
    }

    class ResponseLogon implements IResponseLogon {
        constructor(p?: protocol.IResponseLogon);
        public error: number;
        public roomid: number;
        public anti_simulator: boolean;
        public anti_simulator_ignore_cond: number;
        public static create(properties?: protocol.IResponseLogon): protocol.ResponseLogon;
        public static encode(m: protocol.ResponseLogon, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseLogon, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseLogon;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseLogon;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseLogon;
        public static toObject(m: protocol.ResponseLogon, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomParams {
        owner_type?: (number|null);
        game_mode?: (number|null);
        player_count_max?: (number|null);
        rule_blind_enum?: (number|null);
        rule_buyin_min_enum?: (number|null);
        rule_buyin_fold?: (number|null);
        rule_time_limit?: (number|null);
        rule_switch_insurance?: (number|null);
        rule_switch_anti_cheat?: (number|null);
        rule_switch_force_straddle?: (number|null);
        rule_switch_random_seat?: (number|null);
        rule_ante_amount?: (number|null);
        game_name?: (string|null);
        club_id?: (number|null);
        is_associated_jackpot?: (boolean|null);
        is_allin_allfold?: (boolean|null);
        alliance_ids?: (number[]|null);
        owner_clubname?: (string|null);
        CreaterId?: (number|null);
        short_game_double_ante?: (boolean|null);
        short_fullhouse_flush_straight_three?: (boolean|null);
        is_opened_drawback?: (boolean|null);
        drawback_hold_times?: (number|null);
        drawback_times?: (number|null);
        choose_outs?: (boolean|null);
        muck_switch?: (boolean|null);
        anti_simulator?: (boolean|null);
        force_showcard?: (boolean|null);
        unlimit_force_showcard?: (boolean|null);
        club_head?: (string|null);
        auto_start_num?: (number|null);
        join_password?: (string|null);
        buyin_password?: (string|null);
        IscalcIncomePerhand?: (boolean|null);
        is_mirco?: (number|null);
        is_private?: (boolean|null);
        force_takeout_amount?: (number|null);
        bet_multi?: (number[]|null);
        BB?: (number|null);
        is_ban_vpn?: (boolean|null);
        anti_multiple?: (number|null);
        BBLimit?: (number|null);
        startParam?: (protocol.StartByOnline[]|null);
        gameid?: (number|null);
        limitnums?: (protocol.NewPlayerLimit[]|null);
        openRoomLimit?: (boolean|null);
        showForClients?: (number[]|null);
        isCriticismField?: (boolean|null);
        minCritProb?: (number|null);
        maxCritProb?: (number|null);
        critNeedMoney?: (number|null);
        is_open_guess?: (boolean|null);
        guess_betamout_cfg?: (string|null);
        insuranceMode?: (number|null);
        auto_withdraw?: (boolean|null);
        auto_buyin_val?: (number|null);
        auto_buyout_val?: (number|null);
        bottom_limit?: (number|null);
        anti_simulator_ignore_cond?: (number|null);
        is_alternate_tables?: (boolean|null);
        teaxs_proportion?: (number|null);
        crit_proportion?: (number|null);
        manual_created?: (number|null);
        plats?: (number[]|null);
        reserveSeat?: (number|null);
        starData?: (protocol.StarData[]|null);
        commentators?: (protocol.CommentatorInfo[]|null);
        canSpeak?: (boolean|null);
        tableTitle?: (string|null);
        formalBegin?: (number|null);
        starInviter?: (number[]|null);
        proDatas?: (protocol.ProDatas[]|null);
        interEmotionCoin?: (number|null);
        closeStarTime?: (number|null);
        showAllHole?: (boolean|null);
    }

    class RoomParams implements IRoomParams {
        constructor(p?: protocol.IRoomParams);
        public owner_type: number;
        public game_mode: number;
        public player_count_max: number;
        public rule_blind_enum: number;
        public rule_buyin_min_enum: number;
        public rule_buyin_fold: number;
        public rule_time_limit: number;
        public rule_switch_insurance: number;
        public rule_switch_anti_cheat: number;
        public rule_switch_force_straddle: number;
        public rule_switch_random_seat: number;
        public rule_ante_amount: number;
        public game_name: string;
        public club_id: number;
        public is_associated_jackpot: boolean;
        public is_allin_allfold: boolean;
        public alliance_ids: number[];
        public owner_clubname: string;
        public CreaterId: number;
        public short_game_double_ante: boolean;
        public short_fullhouse_flush_straight_three: boolean;
        public is_opened_drawback: boolean;
        public drawback_hold_times: number;
        public drawback_times: number;
        public choose_outs: boolean;
        public muck_switch: boolean;
        public anti_simulator: boolean;
        public force_showcard: boolean;
        public unlimit_force_showcard: boolean;
        public club_head: string;
        public auto_start_num: number;
        public join_password: string;
        public buyin_password: string;
        public IscalcIncomePerhand: boolean;
        public is_mirco: number;
        public is_private: boolean;
        public force_takeout_amount: number;
        public bet_multi: number[];
        public BB: number;
        public is_ban_vpn: boolean;
        public anti_multiple: number;
        public BBLimit: number;
        public startParam: protocol.StartByOnline[];
        public gameid: number;
        public limitnums: protocol.NewPlayerLimit[];
        public openRoomLimit: boolean;
        public showForClients: number[];
        public isCriticismField: boolean;
        public minCritProb: number;
        public maxCritProb: number;
        public critNeedMoney: number;
        public is_open_guess: boolean;
        public guess_betamout_cfg: string;
        public insuranceMode: number;
        public auto_withdraw: boolean;
        public auto_buyin_val: number;
        public auto_buyout_val: number;
        public bottom_limit: number;
        public anti_simulator_ignore_cond: number;
        public is_alternate_tables: boolean;
        public teaxs_proportion: number;
        public crit_proportion: number;
        public manual_created: number;
        public plats: number[];
        public reserveSeat: number;
        public starData: protocol.StarData[];
        public commentators: protocol.CommentatorInfo[];
        public canSpeak: boolean;
        public tableTitle: string;
        public formalBegin: number;
        public starInviter: number[];
        public proDatas: protocol.ProDatas[];
        public interEmotionCoin: number;
        public closeStarTime: number;
        public showAllHole: boolean;
        public static create(properties?: protocol.IRoomParams): protocol.RoomParams;
        public static encode(m: protocol.RoomParams, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RoomParams, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RoomParams;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RoomParams;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RoomParams;
        public static toObject(m: protocol.RoomParams, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITipFeeInfo {
        tipId?: (number|null);
        fee?: (number|null);
        desc?: (string|null);
    }

    class TipFeeInfo implements ITipFeeInfo {
        constructor(p?: protocol.ITipFeeInfo);
        public tipId: number;
        public fee: number;
        public desc: string;
        public static create(properties?: protocol.ITipFeeInfo): protocol.TipFeeInfo;
        public static encode(m: protocol.TipFeeInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.TipFeeInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.TipFeeInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.TipFeeInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.TipFeeInfo;
        public static toObject(m: protocol.TipFeeInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IProDatas {
        levelLimit?: (number|null);
        nowNum?: (number|null);
        tableLevel?: (number|null);
    }

    class ProDatas implements IProDatas {
        constructor(p?: protocol.IProDatas);
        public levelLimit: number;
        public nowNum: number;
        public tableLevel: number;
        public static create(properties?: protocol.IProDatas): protocol.ProDatas;
        public static encode(m: protocol.ProDatas, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ProDatas, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ProDatas;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ProDatas;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ProDatas;
        public static toObject(m: protocol.ProDatas, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarData {
        uid?: (number|null);
        nickName?: (string|null);
        thumb?: (string|null);
        status?: (number|null);
    }

    class StarData implements IStarData {
        constructor(p?: protocol.IStarData);
        public uid: number;
        public nickName: string;
        public thumb: string;
        public status: number;
        public static create(properties?: protocol.IStarData): protocol.StarData;
        public static encode(m: protocol.StarData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.StarData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.StarData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.StarData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.StarData;
        public static toObject(m: protocol.StarData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBeginStarNotify {
        notifyTime?: (number|null);
        starInfo?: (protocol.BeginStarInfo[]|null);
        notifyText?: (string[]|null);
    }

    class BeginStarNotify implements IBeginStarNotify {
        constructor(p?: protocol.IBeginStarNotify);
        public notifyTime: number;
        public starInfo: protocol.BeginStarInfo[];
        public notifyText: string[];
        public static create(properties?: protocol.IBeginStarNotify): protocol.BeginStarNotify;
        public static encode(m: protocol.BeginStarNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.BeginStarNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.BeginStarNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.BeginStarNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.BeginStarNotify;
        public static toObject(m: protocol.BeginStarNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBeginStarInfo {
        starPic?: (string|null);
        notifyTopic?: (string[]|null);
    }

    class BeginStarInfo implements IBeginStarInfo {
        constructor(p?: protocol.IBeginStarInfo);
        public starPic: string;
        public notifyTopic: string[];
        public static create(properties?: protocol.IBeginStarInfo): protocol.BeginStarInfo;
        public static encode(m: protocol.BeginStarInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.BeginStarInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.BeginStarInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.BeginStarInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.BeginStarInfo;
        public static toObject(m: protocol.BeginStarInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INewPlayerLimit {
        min?: (number|null);
        max?: (number|null);
        num?: (number|null);
        CurNum?: (number|null);
    }

    class NewPlayerLimit implements INewPlayerLimit {
        constructor(p?: protocol.INewPlayerLimit);
        public min: number;
        public max: number;
        public num: number;
        public CurNum: number;
        public static create(properties?: protocol.INewPlayerLimit): protocol.NewPlayerLimit;
        public static encode(m: protocol.NewPlayerLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NewPlayerLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NewPlayerLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NewPlayerLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NewPlayerLimit;
        public static toObject(m: protocol.NewPlayerLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartByOnline {
        onlineWater?: (number|null);
        member?: (number|null);
    }

    class StartByOnline implements IStartByOnline {
        constructor(p?: protocol.IStartByOnline);
        public onlineWater: number;
        public member: number;
        public static create(properties?: protocol.IStartByOnline): protocol.StartByOnline;
        public static encode(m: protocol.StartByOnline, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.StartByOnline, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.StartByOnline;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.StartByOnline;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.StartByOnline;
        public static toObject(m: protocol.StartByOnline, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCreateRoom {
        param?: (protocol.RoomParams|null);
    }

    class RequestCreateRoom implements IRequestCreateRoom {
        constructor(p?: protocol.IRequestCreateRoom);
        public param?: (protocol.RoomParams|null);
        public static create(properties?: protocol.IRequestCreateRoom): protocol.RequestCreateRoom;
        public static encode(m: protocol.RequestCreateRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestCreateRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestCreateRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestCreateRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestCreateRoom;
        public static toObject(m: protocol.RequestCreateRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCreateRoom {
        error?: (number|null);
    }

    class ResponseCreateRoom implements IResponseCreateRoom {
        constructor(p?: protocol.IResponseCreateRoom);
        public error: number;
        public static create(properties?: protocol.IResponseCreateRoom): protocol.ResponseCreateRoom;
        public static encode(m: protocol.ResponseCreateRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseCreateRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseCreateRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseCreateRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseCreateRoom;
        public static toObject(m: protocol.ResponseCreateRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCreateRoom {
        roomid?: (number|null);
    }

    class NoticeCreateRoom implements INoticeCreateRoom {
        constructor(p?: protocol.INoticeCreateRoom);
        public roomid: number;
        public static create(properties?: protocol.INoticeCreateRoom): protocol.NoticeCreateRoom;
        public static encode(m: protocol.NoticeCreateRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeCreateRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeCreateRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeCreateRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeCreateRoom;
        public static toObject(m: protocol.NoticeCreateRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestDestroyRoom {
        roomid?: (number|null);
    }

    class RequestDestroyRoom implements IRequestDestroyRoom {
        constructor(p?: protocol.IRequestDestroyRoom);
        public roomid: number;
        public static create(properties?: protocol.IRequestDestroyRoom): protocol.RequestDestroyRoom;
        public static encode(m: protocol.RequestDestroyRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestDestroyRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestDestroyRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestDestroyRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestDestroyRoom;
        public static toObject(m: protocol.RequestDestroyRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseDestroyRoom {
        error?: (number|null);
    }

    class ResponseDestroyRoom implements IResponseDestroyRoom {
        constructor(p?: protocol.IResponseDestroyRoom);
        public error: number;
        public static create(properties?: protocol.IResponseDestroyRoom): protocol.ResponseDestroyRoom;
        public static encode(m: protocol.ResponseDestroyRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseDestroyRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseDestroyRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseDestroyRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseDestroyRoom;
        public static toObject(m: protocol.ResponseDestroyRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSettlement {
        player_name?: (string|null);
        player_head?: (string|null);
        player_buyin?: (number|null);
        player_hand_count?: (number|null);
        player_settle?: (number|null);
        playerid?: (number|null);
    }

    class PlayerSettlement implements IPlayerSettlement {
        constructor(p?: protocol.IPlayerSettlement);
        public player_name: string;
        public player_head: string;
        public player_buyin: number;
        public player_hand_count: number;
        public player_settle: number;
        public playerid: number;
        public static create(properties?: protocol.IPlayerSettlement): protocol.PlayerSettlement;
        public static encode(m: protocol.PlayerSettlement, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerSettlement, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerSettlement;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerSettlement;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerSettlement;
        public static toObject(m: protocol.PlayerSettlement, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICardItem {
        number?: (number|null);
        suit?: (number|null);
    }

    class CardItem implements ICardItem {
        constructor(p?: protocol.ICardItem);
        public number: number;
        public suit: number;
        public static create(properties?: protocol.ICardItem): protocol.CardItem;
        public static encode(m: protocol.CardItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.CardItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.CardItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.CardItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.CardItem;
        public static toObject(m: protocol.CardItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHandRecord {
        player_name?: (string|null);
        player_head?: (string|null);
        player_betting_round_bet?: (number|null);
        cards?: (protocol.CardItem[]|null);
        win_bet?: (number|null);
        bought_insurance?: (boolean|null);
        is_fold?: (boolean|null);
        is_show_card?: (boolean|null);
        show_card_ids?: (number|null);
        playerid?: (number|null);
        insurance_bet_amount?: (number|null);
        insurance_winbet?: (number|null);
        jack_winbet?: (number|null);
        drawin?: (number|null);
        award2_club_fund?: (number|null);
        last_buyin_clubid?: (number|null);
        is_muck?: (boolean|null);
        shot_force?: (boolean|null);
        is_active_show?: (boolean|null);
        is_force_show?: (boolean|null);
        IsShowDown?: (boolean|null);
        LastRoundType?: (number|null);
        cur_drawin?: (number|null);
        hand_total_valid_bet?: (number|null);
        plat?: (number|null);
        send_card_len?: (number|null);
        force_show_cnt?: (number|null);
    }

    class HandRecord implements IHandRecord {
        constructor(p?: protocol.IHandRecord);
        public player_name: string;
        public player_head: string;
        public player_betting_round_bet: number;
        public cards: protocol.CardItem[];
        public win_bet: number;
        public bought_insurance: boolean;
        public is_fold: boolean;
        public is_show_card: boolean;
        public show_card_ids: number;
        public playerid: number;
        public insurance_bet_amount: number;
        public insurance_winbet: number;
        public jack_winbet: number;
        public drawin: number;
        public award2_club_fund: number;
        public last_buyin_clubid: number;
        public is_muck: boolean;
        public shot_force: boolean;
        public is_active_show: boolean;
        public is_force_show: boolean;
        public IsShowDown: boolean;
        public LastRoundType: number;
        public cur_drawin: number;
        public hand_total_valid_bet: number;
        public plat: number;
        public send_card_len: number;
        public force_show_cnt: number;
        public static create(properties?: protocol.IHandRecord): protocol.HandRecord;
        public static encode(m: protocol.HandRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.HandRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.HandRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.HandRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.HandRecord;
        public static toObject(m: protocol.HandRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRecord {
        public_cards?: (protocol.CardItem[]|null);
        records?: (protocol.HandRecord[]|null);
        total_pot?: (number|null);
        insurance_winbet?: (number|null);
        insurance_bet?: (number|null);
        insurance_amount?: (number|null);
        unsend_public_cards?: (protocol.CardItem[]|null);
    }

    class GameRecord implements IGameRecord {
        constructor(p?: protocol.IGameRecord);
        public public_cards: protocol.CardItem[];
        public records: protocol.HandRecord[];
        public total_pot: number;
        public insurance_winbet: number;
        public insurance_bet: number;
        public insurance_amount: number;
        public unsend_public_cards: protocol.CardItem[];
        public static create(properties?: protocol.IGameRecord): protocol.GameRecord;
        public static encode(m: protocol.GameRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GameRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GameRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GameRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GameRecord;
        public static toObject(m: protocol.GameRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeDestroyRoom {
        roomid?: (number|null);
        room_create_time?: (number|null);
        room_time_limit?: (number|null);
        room_owner_name?: (string|null);
        room_rule_blind_enum?: (number|null);
        room_game_hand?: (number|null);
        room_max_pot?: (number|null);
        room_total_buyin?: (number|null);
        settlements?: (protocol.PlayerSettlement[]|null);
        room_uuid?: (number|null);
        room_name?: (string|null);
        room_uuid_js?: (string|null);
    }

    class NoticeDestroyRoom implements INoticeDestroyRoom {
        constructor(p?: protocol.INoticeDestroyRoom);
        public roomid: number;
        public room_create_time: number;
        public room_time_limit: number;
        public room_owner_name: string;
        public room_rule_blind_enum: number;
        public room_game_hand: number;
        public room_max_pot: number;
        public room_total_buyin: number;
        public settlements: protocol.PlayerSettlement[];
        public room_uuid: number;
        public room_name: string;
        public room_uuid_js: string;
        public static create(properties?: protocol.INoticeDestroyRoom): protocol.NoticeDestroyRoom;
        public static encode(m: protocol.NoticeDestroyRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeDestroyRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeDestroyRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeDestroyRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeDestroyRoom;
        public static toObject(m: protocol.NoticeDestroyRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJoinRoom {
        roomid?: (number|null);
        is_quick_sit?: (boolean|null);
    }

    class RequestJoinRoom implements IRequestJoinRoom {
        constructor(p?: protocol.IRequestJoinRoom);
        public roomid: number;
        public is_quick_sit: boolean;
        public static create(properties?: protocol.IRequestJoinRoom): protocol.RequestJoinRoom;
        public static encode(m: protocol.RequestJoinRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestJoinRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestJoinRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestJoinRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestJoinRoom;
        public static toObject(m: protocol.RequestJoinRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJoinRoom {
        error?: (number|null);
        roomid?: (number|null);
        form?: (number|null);
        authVerifyCD?: (number|null);
        left_join_time?: (number|null);
    }

    class ResponseJoinRoom implements IResponseJoinRoom {
        constructor(p?: protocol.IResponseJoinRoom);
        public error: number;
        public roomid: number;
        public form: number;
        public authVerifyCD: number;
        public left_join_time: number;
        public static create(properties?: protocol.IResponseJoinRoom): protocol.ResponseJoinRoom;
        public static encode(m: protocol.ResponseJoinRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseJoinRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseJoinRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseJoinRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseJoinRoom;
        public static toObject(m: protocol.ResponseJoinRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestLeaveRoom {
        roomid?: (number|null);
        svr_jstr?: (string|null);
    }

    class RequestLeaveRoom implements IRequestLeaveRoom {
        constructor(p?: protocol.IRequestLeaveRoom);
        public roomid: number;
        public svr_jstr: string;
        public static create(properties?: protocol.IRequestLeaveRoom): protocol.RequestLeaveRoom;
        public static encode(m: protocol.RequestLeaveRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestLeaveRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestLeaveRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestLeaveRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestLeaveRoom;
        public static toObject(m: protocol.RequestLeaveRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseLeaveRoom {
        error?: (number|null);
        user_leave_type?: (number|null);
        reason?: (string|null);
    }

    class ResponseLeaveRoom implements IResponseLeaveRoom {
        constructor(p?: protocol.IResponseLeaveRoom);
        public error: number;
        public user_leave_type: number;
        public reason: string;
        public static create(properties?: protocol.IResponseLeaveRoom): protocol.ResponseLeaveRoom;
        public static encode(m: protocol.ResponseLeaveRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseLeaveRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseLeaveRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseLeaveRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseLeaveRoom;
        public static toObject(m: protocol.ResponseLeaveRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSitDown {
        roomid?: (number|null);
        seatid?: (number|null);
        position?: (protocol.PositionInfo|null);
        isSure?: (boolean|null);
    }

    class RequestSitDown implements IRequestSitDown {
        constructor(p?: protocol.IRequestSitDown);
        public roomid: number;
        public seatid: number;
        public position?: (protocol.PositionInfo|null);
        public isSure: boolean;
        public static create(properties?: protocol.IRequestSitDown): protocol.RequestSitDown;
        public static encode(m: protocol.RequestSitDown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestSitDown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestSitDown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestSitDown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestSitDown;
        public static toObject(m: protocol.RequestSitDown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSitDown {
        error?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
        limit?: (protocol.NewPlayerLimit|null);
        authVerifyCD?: (number|null);
        roomId?: (number|null);
        seatId?: (number|null);
        left_sitdown_time?: (number|null);
        starCd?: (number|null);
    }

    class ResponseSitDown implements IResponseSitDown {
        constructor(p?: protocol.IResponseSitDown);
        public error: number;
        public playerid: number;
        public playername: string;
        public limit?: (protocol.NewPlayerLimit|null);
        public authVerifyCD: number;
        public roomId: number;
        public seatId: number;
        public left_sitdown_time: number;
        public starCd: number;
        public static create(properties?: protocol.IResponseSitDown): protocol.ResponseSitDown;
        public static encode(m: protocol.ResponseSitDown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseSitDown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseSitDown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseSitDown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseSitDown;
        public static toObject(m: protocol.ResponseSitDown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSitDown {
        roomid?: (number|null);
        player?: (protocol.PlayerInfo|null);
    }

    class NoticeSitDown implements INoticeSitDown {
        constructor(p?: protocol.INoticeSitDown);
        public roomid: number;
        public player?: (protocol.PlayerInfo|null);
        public static create(properties?: protocol.INoticeSitDown): protocol.NoticeSitDown;
        public static encode(m: protocol.NoticeSitDown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeSitDown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeSitDown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeSitDown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeSitDown;
        public static toObject(m: protocol.NoticeSitDown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestStandup {
        roomid?: (number|null);
    }

    class RequestStandup implements IRequestStandup {
        constructor(p?: protocol.IRequestStandup);
        public roomid: number;
        public static create(properties?: protocol.IRequestStandup): protocol.RequestStandup;
        public static encode(m: protocol.RequestStandup, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestStandup, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestStandup;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestStandup;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestStandup;
        public static toObject(m: protocol.RequestStandup, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseStandup {
        error?: (number|null);
        starCD?: (number|null);
    }

    class ResponseStandup implements IResponseStandup {
        constructor(p?: protocol.IResponseStandup);
        public error: number;
        public starCD: number;
        public static create(properties?: protocol.IResponseStandup): protocol.ResponseStandup;
        public static encode(m: protocol.ResponseStandup, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseStandup, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseStandup;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseStandup;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseStandup;
        public static toObject(m: protocol.ResponseStandup, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeStandup {
        roomid?: (number|null);
        target_uid?: (number|null);
        seatid?: (number|null);
    }

    class NoticeStandup implements INoticeStandup {
        constructor(p?: protocol.INoticeStandup);
        public roomid: number;
        public target_uid: number;
        public seatid: number;
        public static create(properties?: protocol.INoticeStandup): protocol.NoticeStandup;
        public static encode(m: protocol.NoticeStandup, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeStandup, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeStandup;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeStandup;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeStandup;
        public static toObject(m: protocol.NoticeStandup, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestBuyin {
        roomid?: (number|null);
        amount?: (number|null);
        IsAuto?: (number|null);
    }

    class RequestBuyin implements IRequestBuyin {
        constructor(p?: protocol.IRequestBuyin);
        public roomid: number;
        public amount: number;
        public IsAuto: number;
        public static create(properties?: protocol.IRequestBuyin): protocol.RequestBuyin;
        public static encode(m: protocol.RequestBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestBuyin;
        public static toObject(m: protocol.RequestBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseBuyin {
        error?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
        limit?: (protocol.NewPlayerLimit|null);
        min_limit?: (number|null);
    }

    class ResponseBuyin implements IResponseBuyin {
        constructor(p?: protocol.IResponseBuyin);
        public error: number;
        public playerid: number;
        public playername: string;
        public limit?: (protocol.NewPlayerLimit|null);
        public min_limit: number;
        public static create(properties?: protocol.IResponseBuyin): protocol.ResponseBuyin;
        public static encode(m: protocol.ResponseBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseBuyin;
        public static toObject(m: protocol.ResponseBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBuyinPlayerInfo {
        playerid?: (number|null);
        amount?: (number|null);
        playername?: (string|null);
        playerhead?: (string|null);
        requestid?: (number|null);
        timestamp?: (number|null);
        last_clubid?: (number|null);
        allianceInfos?: (protocol.AllianceInfo[]|null);
    }

    class BuyinPlayerInfo implements IBuyinPlayerInfo {
        constructor(p?: protocol.IBuyinPlayerInfo);
        public playerid: number;
        public amount: number;
        public playername: string;
        public playerhead: string;
        public requestid: number;
        public timestamp: number;
        public last_clubid: number;
        public allianceInfos: protocol.AllianceInfo[];
        public static create(properties?: protocol.IBuyinPlayerInfo): protocol.BuyinPlayerInfo;
        public static encode(m: protocol.BuyinPlayerInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.BuyinPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.BuyinPlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.BuyinPlayerInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.BuyinPlayerInfo;
        public static toObject(m: protocol.BuyinPlayerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAllianceInfo {
        alliance_id?: (number|null);
        alliance_name?: (string|null);
    }

    class AllianceInfo implements IAllianceInfo {
        constructor(p?: protocol.IAllianceInfo);
        public alliance_id: number;
        public alliance_name: string;
        public static create(properties?: protocol.IAllianceInfo): protocol.AllianceInfo;
        public static encode(m: protocol.AllianceInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.AllianceInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.AllianceInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.AllianceInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.AllianceInfo;
        public static toObject(m: protocol.AllianceInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeBuyinToOwner {
        roomid?: (number|null);
        buyins?: (protocol.BuyinPlayerInfo[]|null);
        room_name?: (string|null);
        last_club2allianceid?: (number|null);
    }

    class NoticeBuyinToOwner implements INoticeBuyinToOwner {
        constructor(p?: protocol.INoticeBuyinToOwner);
        public roomid: number;
        public buyins: protocol.BuyinPlayerInfo[];
        public room_name: string;
        public last_club2allianceid: number;
        public static create(properties?: protocol.INoticeBuyinToOwner): protocol.NoticeBuyinToOwner;
        public static encode(m: protocol.NoticeBuyinToOwner, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeBuyinToOwner, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeBuyinToOwner;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeBuyinToOwner;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeBuyinToOwner;
        public static toObject(m: protocol.NoticeBuyinToOwner, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeBuyinToApplicant {
        roomid?: (number|null);
        amount_limit?: (number|null);
        result?: (boolean|null);
        self_buyin_limit?: (number|null);
        self_buyin?: (number|null);
        self_stake?: (number|null);
        bank_chips?: (number|null);
        room_name?: (string|null);
        allianceid?: (number|null);
    }

    class NoticeBuyinToApplicant implements INoticeBuyinToApplicant {
        constructor(p?: protocol.INoticeBuyinToApplicant);
        public roomid: number;
        public amount_limit: number;
        public result: boolean;
        public self_buyin_limit: number;
        public self_buyin: number;
        public self_stake: number;
        public bank_chips: number;
        public room_name: string;
        public allianceid: number;
        public static create(properties?: protocol.INoticeBuyinToApplicant): protocol.NoticeBuyinToApplicant;
        public static encode(m: protocol.NoticeBuyinToApplicant, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeBuyinToApplicant, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeBuyinToApplicant;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeBuyinToApplicant;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeBuyinToApplicant;
        public static toObject(m: protocol.NoticeBuyinToApplicant, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAnswerBuyin {
        roomid?: (number|null);
        requestid?: (number|null);
        amount?: (number|null);
        result?: (boolean|null);
        alliance_id?: (number|null);
        club_id?: (number|null);
    }

    class RequestAnswerBuyin implements IRequestAnswerBuyin {
        constructor(p?: protocol.IRequestAnswerBuyin);
        public roomid: number;
        public requestid: number;
        public amount: number;
        public result: boolean;
        public alliance_id: number;
        public club_id: number;
        public static create(properties?: protocol.IRequestAnswerBuyin): protocol.RequestAnswerBuyin;
        public static encode(m: protocol.RequestAnswerBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAnswerBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAnswerBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAnswerBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAnswerBuyin;
        public static toObject(m: protocol.RequestAnswerBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAnswerBuyin {
        error?: (number|null);
        requestid?: (number|null);
        playerid?: (number|null);
        amount?: (number|null);
        roomid?: (number|null);
        result?: (boolean|null);
    }

    class ResponseAnswerBuyin implements IResponseAnswerBuyin {
        constructor(p?: protocol.IResponseAnswerBuyin);
        public error: number;
        public requestid: number;
        public playerid: number;
        public amount: number;
        public roomid: number;
        public result: boolean;
        public static create(properties?: protocol.IResponseAnswerBuyin): protocol.ResponseAnswerBuyin;
        public static encode(m: protocol.ResponseAnswerBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAnswerBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAnswerBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAnswerBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAnswerBuyin;
        public static toObject(m: protocol.ResponseAnswerBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestStartGame {
        roomid?: (number|null);
    }

    class RequestStartGame implements IRequestStartGame {
        constructor(p?: protocol.IRequestStartGame);
        public roomid: number;
        public static create(properties?: protocol.IRequestStartGame): protocol.RequestStartGame;
        public static encode(m: protocol.RequestStartGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestStartGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestStartGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestStartGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestStartGame;
        public static toObject(m: protocol.RequestStartGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseStartGame {
        error?: (number|null);
    }

    class ResponseStartGame implements IResponseStartGame {
        constructor(p?: protocol.IResponseStartGame);
        public error: number;
        public static create(properties?: protocol.IResponseStartGame): protocol.ResponseStartGame;
        public static encode(m: protocol.ResponseStartGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseStartGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseStartGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseStartGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseStartGame;
        public static toObject(m: protocol.ResponseStartGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeStartGame {
        roomid?: (number|null);
        texasTotalHands?: (number|null);
    }

    class NoticeStartGame implements INoticeStartGame {
        constructor(p?: protocol.INoticeStartGame);
        public roomid: number;
        public texasTotalHands: number;
        public static create(properties?: protocol.INoticeStartGame): protocol.NoticeStartGame;
        public static encode(m: protocol.NoticeStartGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeStartGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeStartGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeStartGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeStartGame;
        public static toObject(m: protocol.NoticeStartGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeResetGame {
        roomid?: (number|null);
        gameid?: (string|null);
        players?: (protocol.PlayerInfo[]|null);
    }

    class NoticeResetGame implements INoticeResetGame {
        constructor(p?: protocol.INoticeResetGame);
        public roomid: number;
        public gameid: string;
        public players: protocol.PlayerInfo[];
        public static create(properties?: protocol.INoticeResetGame): protocol.NoticeResetGame;
        public static encode(m: protocol.NoticeResetGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeResetGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeResetGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeResetGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeResetGame;
        public static toObject(m: protocol.NoticeResetGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeRandomSeat {
        roomid?: (number|null);
        players?: (protocol.PlayerInfo[]|null);
    }

    class NoticeRandomSeat implements INoticeRandomSeat {
        constructor(p?: protocol.INoticeRandomSeat);
        public roomid: number;
        public players: protocol.PlayerInfo[];
        public static create(properties?: protocol.INoticeRandomSeat): protocol.NoticeRandomSeat;
        public static encode(m: protocol.NoticeRandomSeat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeRandomSeat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeRandomSeat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeRandomSeat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeRandomSeat;
        public static toObject(m: protocol.NoticeRandomSeat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPotInfo {
        potid?: (number|null);
        amount?: (number|null);
    }

    class PotInfo implements IPotInfo {
        constructor(p?: protocol.IPotInfo);
        public potid: number;
        public amount: number;
        public static create(properties?: protocol.IPotInfo): protocol.PotInfo;
        public static encode(m: protocol.PotInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PotInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PotInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PotInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PotInfo;
        public static toObject(m: protocol.PotInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGamePost {
        roomid?: (number|null);
        seatid?: (number|null);
        amount?: (number|null);
    }

    class NoticeGamePost implements INoticeGamePost {
        constructor(p?: protocol.INoticeGamePost);
        public roomid: number;
        public seatid: number;
        public amount: number;
        public static create(properties?: protocol.INoticeGamePost): protocol.NoticeGamePost;
        public static encode(m: protocol.NoticeGamePost, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGamePost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGamePost;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGamePost;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGamePost;
        public static toObject(m: protocol.NoticeGamePost, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameAnte {
        roomid?: (number|null);
        seat_list?: (number[]|null);
        amount_list?: (number[]|null);
    }

    class NoticeGameAnte implements INoticeGameAnte {
        constructor(p?: protocol.INoticeGameAnte);
        public roomid: number;
        public seat_list: number[];
        public amount_list: number[];
        public static create(properties?: protocol.INoticeGameAnte): protocol.NoticeGameAnte;
        public static encode(m: protocol.NoticeGameAnte, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameAnte, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameAnte;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameAnte;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameAnte;
        public static toObject(m: protocol.NoticeGameAnte, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameElectDealer {
        roomid?: (number|null);
        dealer_seatid?: (number|null);
        sb_seateid?: (number|null);
        bb_seatid?: (number|null);
    }

    class NoticeGameElectDealer implements INoticeGameElectDealer {
        constructor(p?: protocol.INoticeGameElectDealer);
        public roomid: number;
        public dealer_seatid: number;
        public sb_seateid: number;
        public bb_seatid: number;
        public static create(properties?: protocol.INoticeGameElectDealer): protocol.NoticeGameElectDealer;
        public static encode(m: protocol.NoticeGameElectDealer, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameElectDealer, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameElectDealer;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameElectDealer;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameElectDealer;
        public static toObject(m: protocol.NoticeGameElectDealer, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameBlind {
        roomid?: (number|null);
        sb_amount?: (number|null);
        bb_amount?: (number|null);
        straddle_seat_list?: (number[]|null);
        straddle_amount_list?: (number[]|null);
        post_seat_list?: (number[]|null);
        sb_seatid?: (number|null);
        bb_seatid?: (number|null);
        dealer_seatid?: (number|null);
    }

    class NoticeGameBlind implements INoticeGameBlind {
        constructor(p?: protocol.INoticeGameBlind);
        public roomid: number;
        public sb_amount: number;
        public bb_amount: number;
        public straddle_seat_list: number[];
        public straddle_amount_list: number[];
        public post_seat_list: number[];
        public sb_seatid: number;
        public bb_seatid: number;
        public dealer_seatid: number;
        public static create(properties?: protocol.INoticeGameBlind): protocol.NoticeGameBlind;
        public static encode(m: protocol.NoticeGameBlind, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameBlind, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameBlind;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameBlind;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameBlind;
        public static toObject(m: protocol.NoticeGameBlind, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameHolecard {
        roomid?: (number|null);
        seat_list?: (number[]|null);
        holdcards?: (protocol.CardItem[]|null);
    }

    class NoticeGameHolecard implements INoticeGameHolecard {
        constructor(p?: protocol.INoticeGameHolecard);
        public roomid: number;
        public seat_list: number[];
        public holdcards: protocol.CardItem[];
        public static create(properties?: protocol.INoticeGameHolecard): protocol.NoticeGameHolecard;
        public static encode(m: protocol.NoticeGameHolecard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameHolecard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameHolecard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameHolecard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameHolecard;
        public static toObject(m: protocol.NoticeGameHolecard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum ActionType {
        Enum_Action_Null = 0,
        Enum_Action_Check = 1,
        Enum_Action_Fold = 2,
        Enum_Action_Call = 3,
        Enum_Action_Bet = 4,
        Enum_Action_Raise = 5,
        Enum_Action_Allin = 6,
        Enum_Action_CallMuck = 7,
        Enum_Action_AddActionTime = 8,
        Enum_Action_SendCard_Common = 9,
        Enum_Action_Send_HoleCards = 10,
        Enum_Action_Straddle = 11,
        Enum_Action_Post = 12
    }

    interface INoticePlayerActionTurn {
        roomid?: (number|null);
        curr_action_seat_id?: (number|null);
        curr_action_uid?: (number|null);
        action_time?: (number|null);
        minimum_bet?: (number|null);
        last_action_seatid?: (number|null);
        last_action_uid?: (number|null);
        is_greatest_bet?: (boolean|null);
        ActionSeq?: (number|null);
        players?: (protocol.PlayerInfo[]|null);
        pots?: (protocol.PotInfo[]|null);
        last_bet_amount?: (number|null);
        carr_action_seat_roundbet?: (number|null);
        default_fold?: (boolean|null);
        call_amount?: (number|null);
        max_round_bet?: (number|null);
        last_valid_raise_amount?: (number|null);
        minimum_bet_i64?: (number|null);
        holdcards?: (protocol.CardItem[]|null);
    }

    class NoticePlayerActionTurn implements INoticePlayerActionTurn {
        constructor(p?: protocol.INoticePlayerActionTurn);
        public roomid: number;
        public curr_action_seat_id: number;
        public curr_action_uid: number;
        public action_time: number;
        public minimum_bet: number;
        public last_action_seatid: number;
        public last_action_uid: number;
        public is_greatest_bet: boolean;
        public ActionSeq: number;
        public players: protocol.PlayerInfo[];
        public pots: protocol.PotInfo[];
        public last_bet_amount: number;
        public carr_action_seat_roundbet: number;
        public default_fold: boolean;
        public call_amount: number;
        public max_round_bet: number;
        public last_valid_raise_amount: number;
        public minimum_bet_i64: number;
        public holdcards: protocol.CardItem[];
        public static create(properties?: protocol.INoticePlayerActionTurn): protocol.NoticePlayerActionTurn;
        public static encode(m: protocol.NoticePlayerActionTurn, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePlayerActionTurn, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePlayerActionTurn;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePlayerActionTurn;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePlayerActionTurn;
        public static toObject(m: protocol.NoticePlayerActionTurn, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAction {
        roomid?: (number|null);
        action?: (protocol.ActionType|null);
        amount?: (number|null);
        ActionSeq?: (number|null);
        token?: (string|null);
        keepEnd?: (number|null);
        checkBet?: (boolean|null);
    }

    class RequestAction implements IRequestAction {
        constructor(p?: protocol.IRequestAction);
        public roomid: number;
        public action: protocol.ActionType;
        public amount: number;
        public ActionSeq: number;
        public token: string;
        public keepEnd: number;
        public checkBet: boolean;
        public static create(properties?: protocol.IRequestAction): protocol.RequestAction;
        public static encode(m: protocol.RequestAction, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAction;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAction;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAction;
        public static toObject(m: protocol.RequestAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAction {
        error?: (number|null);
        keepEnd?: (number|null);
    }

    class ResponseAction implements IResponseAction {
        constructor(p?: protocol.IResponseAction);
        public error: number;
        public keepEnd: number;
        public static create(properties?: protocol.IResponseAction): protocol.ResponseAction;
        public static encode(m: protocol.ResponseAction, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAction;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAction;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAction;
        public static toObject(m: protocol.ResponseAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePlayerAction {
        roomid?: (number|null);
        last_action_seat_id?: (number|null);
        action_type?: (protocol.ActionType|null);
        amount?: (number|null);
        pots?: (protocol.PotInfo[]|null);
        default_fold?: (boolean|null);
        ActionSeq?: (number|null);
    }

    class NoticePlayerAction implements INoticePlayerAction {
        constructor(p?: protocol.INoticePlayerAction);
        public roomid: number;
        public last_action_seat_id: number;
        public action_type: protocol.ActionType;
        public amount: number;
        public pots: protocol.PotInfo[];
        public default_fold: boolean;
        public ActionSeq: number;
        public static create(properties?: protocol.INoticePlayerAction): protocol.NoticePlayerAction;
        public static encode(m: protocol.NoticePlayerAction, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePlayerAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePlayerAction;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePlayerAction;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePlayerAction;
        public static toObject(m: protocol.NoticePlayerAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameRoundEnd {
        roomid?: (number|null);
        pots?: (protocol.PotInfo[]|null);
        public_card?: (protocol.CardItem[]|null);
    }

    class NoticeGameRoundEnd implements INoticeGameRoundEnd {
        constructor(p?: protocol.INoticeGameRoundEnd);
        public roomid: number;
        public pots: protocol.PotInfo[];
        public public_card: protocol.CardItem[];
        public static create(properties?: protocol.INoticeGameRoundEnd): protocol.NoticeGameRoundEnd;
        public static encode(m: protocol.NoticeGameRoundEnd, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameRoundEnd, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameRoundEnd;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameRoundEnd;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameRoundEnd;
        public static toObject(m: protocol.NoticeGameRoundEnd, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum BettingRoundType {
        Enum_BettingRound_Preflop = 0,
        Enum_BettingRound_Flop = 1,
        Enum_BettingRound_Turn = 2,
        Enum_BettingRound_River = 3
    }

    interface INoticeCommunityCards {
        roomid?: (number|null);
        cards?: (protocol.CardItem[]|null);
        betting_round?: (protocol.BettingRoundType|null);
    }

    class NoticeCommunityCards implements INoticeCommunityCards {
        constructor(p?: protocol.INoticeCommunityCards);
        public roomid: number;
        public cards: protocol.CardItem[];
        public betting_round: protocol.BettingRoundType;
        public static create(properties?: protocol.INoticeCommunityCards): protocol.NoticeCommunityCards;
        public static encode(m: protocol.NoticeCommunityCards, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeCommunityCards, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeCommunityCards;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeCommunityCards;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeCommunityCards;
        public static toObject(m: protocol.NoticeCommunityCards, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IShowCardsSeatInfo {
        show_seat_id?: (number|null);
        cards?: (protocol.CardItem[]|null);
    }

    class ShowCardsSeatInfo implements IShowCardsSeatInfo {
        constructor(p?: protocol.IShowCardsSeatInfo);
        public show_seat_id: number;
        public cards: protocol.CardItem[];
        public static create(properties?: protocol.IShowCardsSeatInfo): protocol.ShowCardsSeatInfo;
        public static encode(m: protocol.ShowCardsSeatInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ShowCardsSeatInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ShowCardsSeatInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ShowCardsSeatInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ShowCardsSeatInfo;
        public static toObject(m: protocol.ShowCardsSeatInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IShowCardsPlayerInfo {
        uid?: (number|null);
        cards?: (protocol.CardItem[]|null);
    }

    class ShowCardsPlayerInfo implements IShowCardsPlayerInfo {
        constructor(p?: protocol.IShowCardsPlayerInfo);
        public uid: number;
        public cards: protocol.CardItem[];
        public static create(properties?: protocol.IShowCardsPlayerInfo): protocol.ShowCardsPlayerInfo;
        public static encode(m: protocol.ShowCardsPlayerInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ShowCardsPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ShowCardsPlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ShowCardsPlayerInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ShowCardsPlayerInfo;
        public static toObject(m: protocol.ShowCardsPlayerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameShowCard {
        roomid?: (number|null);
        show_seats?: (protocol.ShowCardsSeatInfo[]|null);
    }

    class NoticeGameShowCard implements INoticeGameShowCard {
        constructor(p?: protocol.INoticeGameShowCard);
        public roomid: number;
        public show_seats: protocol.ShowCardsSeatInfo[];
        public static create(properties?: protocol.INoticeGameShowCard): protocol.NoticeGameShowCard;
        public static encode(m: protocol.NoticeGameShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameShowCard;
        public static toObject(m: protocol.NoticeGameShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOutItem {
        outs_id?: (number|null);
        card?: (protocol.CardItem|null);
        is_tie?: (boolean|null);
    }

    class OutItem implements IOutItem {
        constructor(p?: protocol.IOutItem);
        public outs_id: number;
        public card?: (protocol.CardItem|null);
        public is_tie: boolean;
        public static create(properties?: protocol.IOutItem): protocol.OutItem;
        public static encode(m: protocol.OutItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.OutItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.OutItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.OutItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.OutItem;
        public static toObject(m: protocol.OutItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IFoldItem {
        card?: (protocol.CardItem|null);
        inOuts?: (boolean|null);
    }

    class FoldItem implements IFoldItem {
        constructor(p?: protocol.IFoldItem);
        public card?: (protocol.CardItem|null);
        public inOuts: boolean;
        public static create(properties?: protocol.IFoldItem): protocol.FoldItem;
        public static encode(m: protocol.FoldItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.FoldItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.FoldItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.FoldItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.FoldItem;
        public static toObject(m: protocol.FoldItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSeatInfo {
        seatid?: (number|null);
        playername?: (string|null);
        outs_count?: (number|null);
        holecards?: (protocol.CardItem[]|null);
        total_investment?: (number|null);
        playerid?: (number|null);
    }

    class PlayerSeatInfo implements IPlayerSeatInfo {
        constructor(p?: protocol.IPlayerSeatInfo);
        public seatid: number;
        public playername: string;
        public outs_count: number;
        public holecards: protocol.CardItem[];
        public total_investment: number;
        public playerid: number;
        public static create(properties?: protocol.IPlayerSeatInfo): protocol.PlayerSeatInfo;
        public static encode(m: protocol.PlayerSeatInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerSeatInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerSeatInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerSeatInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerSeatInfo;
        public static toObject(m: protocol.PlayerSeatInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameInsurance {
        roomid?: (number|null);
        player_seats?: (protocol.PlayerSeatInfo[]|null);
        outs?: (protocol.OutItem[]|null);
        pot_amount?: (number|null);
        buy_amount?: (number|null);
        buyer_seatid?: (number|null);
        buyer_uid?: (number|null);
        total_pot_amount?: (number|null);
        action_seq?: (number|null);
        inv_amount?: (number|null);
        total_inv_amount?: (number|null);
        total_pot?: (number|null);
        count_time?: (number|null);
        limit_amount?: (number|null);
        public_cards?: (protocol.CardItem[]|null);
        force_amount?: (number|null);
        foldCards?: (protocol.FoldItem[]|null);
        leftCards?: (number|null);
        error?: (number|null);
        NoOutsTimeOut?: (number|null);
    }

    class NoticeGameInsurance implements INoticeGameInsurance {
        constructor(p?: protocol.INoticeGameInsurance);
        public roomid: number;
        public player_seats: protocol.PlayerSeatInfo[];
        public outs: protocol.OutItem[];
        public pot_amount: number;
        public buy_amount: number;
        public buyer_seatid: number;
        public buyer_uid: number;
        public total_pot_amount: number;
        public action_seq: number;
        public inv_amount: number;
        public total_inv_amount: number;
        public total_pot: number;
        public count_time: number;
        public limit_amount: number;
        public public_cards: protocol.CardItem[];
        public force_amount: number;
        public foldCards: protocol.FoldItem[];
        public leftCards: number;
        public error: number;
        public NoOutsTimeOut: number;
        public static create(properties?: protocol.INoticeGameInsurance): protocol.NoticeGameInsurance;
        public static encode(m: protocol.NoticeGameInsurance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameInsurance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameInsurance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameInsurance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameInsurance;
        public static toObject(m: protocol.NoticeGameInsurance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestBuyInsurance {
        roomid?: (number|null);
        amount?: (number|null);
        outs_id?: (number[]|null);
        action_seq?: (number|null);
        is_buy?: (boolean|null);
        option?: (number|null);
    }

    class RequestBuyInsurance implements IRequestBuyInsurance {
        constructor(p?: protocol.IRequestBuyInsurance);
        public roomid: number;
        public amount: number;
        public outs_id: number[];
        public action_seq: number;
        public is_buy: boolean;
        public option: number;
        public static create(properties?: protocol.IRequestBuyInsurance): protocol.RequestBuyInsurance;
        public static encode(m: protocol.RequestBuyInsurance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestBuyInsurance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestBuyInsurance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestBuyInsurance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestBuyInsurance;
        public static toObject(m: protocol.RequestBuyInsurance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseBuyInsurance {
        error?: (number|null);
    }

    class ResponseBuyInsurance implements IResponseBuyInsurance {
        constructor(p?: protocol.IResponseBuyInsurance);
        public error: number;
        public static create(properties?: protocol.IResponseBuyInsurance): protocol.ResponseBuyInsurance;
        public static encode(m: protocol.ResponseBuyInsurance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseBuyInsurance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseBuyInsurance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseBuyInsurance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseBuyInsurance;
        public static toObject(m: protocol.ResponseBuyInsurance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IWinPotInfo {
        potid?: (number|null);
        amount?: (number|null);
    }

    class WinPotInfo implements IWinPotInfo {
        constructor(p?: protocol.IWinPotInfo);
        public potid: number;
        public amount: number;
        public static create(properties?: protocol.IWinPotInfo): protocol.WinPotInfo;
        public static encode(m: protocol.WinPotInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.WinPotInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.WinPotInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.WinPotInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.WinPotInfo;
        public static toObject(m: protocol.WinPotInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSettleInfo {
        seatid?: (number|null);
        playerid?: (number|null);
        amount?: (number|null);
        is_steal_blind?: (boolean|null);
        pots?: (protocol.WinPotInfo[]|null);
        total_investment?: (number|null);
    }

    class PlayerSettleInfo implements IPlayerSettleInfo {
        constructor(p?: protocol.IPlayerSettleInfo);
        public seatid: number;
        public playerid: number;
        public amount: number;
        public is_steal_blind: boolean;
        public pots: protocol.WinPotInfo[];
        public total_investment: number;
        public static create(properties?: protocol.IPlayerSettleInfo): protocol.PlayerSettleInfo;
        public static encode(m: protocol.PlayerSettleInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerSettleInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerSettleInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerSettleInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerSettleInfo;
        public static toObject(m: protocol.PlayerSettleInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackPotWinInfo {
        win_jackpot_id?: (number|null);
        win_jackpot_num?: (number|null);
    }

    class JackPotWinInfo implements IJackPotWinInfo {
        constructor(p?: protocol.IJackPotWinInfo);
        public win_jackpot_id: number;
        public win_jackpot_num: number;
        public static create(properties?: protocol.IJackPotWinInfo): protocol.JackPotWinInfo;
        public static encode(m: protocol.JackPotWinInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.JackPotWinInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.JackPotWinInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.JackPotWinInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.JackPotWinInfo;
        public static toObject(m: protocol.JackPotWinInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameSettlement {
        roomid?: (number|null);
        winners?: (protocol.PlayerSettleInfo[]|null);
        pots?: (protocol.PotInfo[]|null);
        gameuuid?: (number|null);
        jinfo?: (protocol.JackPotWinInfo[]|null);
        gameuuid_js?: (string|null);
        noUseGameuuid?: (number|null);
        hisHands?: (number|null);
        seatInfo?: (protocol.ShowCardsSeatInfo[]|null);
    }

    class NoticeGameSettlement implements INoticeGameSettlement {
        constructor(p?: protocol.INoticeGameSettlement);
        public roomid: number;
        public winners: protocol.PlayerSettleInfo[];
        public pots: protocol.PotInfo[];
        public gameuuid: number;
        public jinfo: protocol.JackPotWinInfo[];
        public gameuuid_js: string;
        public noUseGameuuid: number;
        public hisHands: number;
        public seatInfo: protocol.ShowCardsSeatInfo[];
        public static create(properties?: protocol.INoticeGameSettlement): protocol.NoticeGameSettlement;
        public static encode(m: protocol.NoticeGameSettlement, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameSettlement, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameSettlement;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameSettlement;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameSettlement;
        public static toObject(m: protocol.NoticeGameSettlement, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomStates {
        isBegin?: (boolean|null);
        isWaiting?: (boolean|null);
        isPause?: (boolean|null);
        isMute?: (boolean|null);
        paused?: (boolean|null);
    }

    class RoomStates implements IRoomStates {
        constructor(p?: protocol.IRoomStates);
        public isBegin: boolean;
        public isWaiting: boolean;
        public isPause: boolean;
        public isMute: boolean;
        public paused: boolean;
        public static create(properties?: protocol.IRoomStates): protocol.RoomStates;
        public static encode(m: protocol.RoomStates, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RoomStates, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RoomStates;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RoomStates;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RoomStates;
        public static toObject(m: protocol.RoomStates, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITableStates {
        players?: (protocol.PlayerInfo[]|null);
        pots?: (protocol.PotInfo[]|null);
        public_card?: (protocol.CardItem[]|null);
        curr_action_player_seatid?: (number|null);
        curr_action_left_time?: (number|null);
        curr_dealer_seatid?: (number|null);
        curr_bb_seatid?: (number|null);
        curr_sb_seatid?: (number|null);
        curr_straddle_seatid?: (number|null);
        bb_amount?: (number|null);
        sb_amount?: (number|null);
    }

    class TableStates implements ITableStates {
        constructor(p?: protocol.ITableStates);
        public players: protocol.PlayerInfo[];
        public pots: protocol.PotInfo[];
        public public_card: protocol.CardItem[];
        public curr_action_player_seatid: number;
        public curr_action_left_time: number;
        public curr_dealer_seatid: number;
        public curr_bb_seatid: number;
        public curr_sb_seatid: number;
        public curr_straddle_seatid: number;
        public bb_amount: number;
        public sb_amount: number;
        public static create(properties?: protocol.ITableStates): protocol.TableStates;
        public static encode(m: protocol.TableStates, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.TableStates, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.TableStates;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.TableStates;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.TableStates;
        public static toObject(m: protocol.TableStates, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IclubInfo {
        club_id?: (number|null);
        creater_id?: (number|null);
        club_name?: (string|null);
    }

    class clubInfo implements IclubInfo {
        constructor(p?: protocol.IclubInfo);
        public club_id: number;
        public creater_id: number;
        public club_name: string;
        public static create(properties?: protocol.IclubInfo): protocol.clubInfo;
        public static encode(m: protocol.clubInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.clubInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.clubInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.clubInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.clubInfo;
        public static toObject(m: protocol.clubInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJsStringGameUUid {
        game_uuid_js?: (string|null);
    }

    class JsStringGameUUid implements IJsStringGameUUid {
        constructor(p?: protocol.IJsStringGameUUid);
        public game_uuid_js: string;
        public static create(properties?: protocol.IJsStringGameUUid): protocol.JsStringGameUUid;
        public static encode(m: protocol.JsStringGameUUid, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.JsStringGameUUid, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.JsStringGameUUid;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.JsStringGameUUid;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.JsStringGameUUid;
        public static toObject(m: protocol.JsStringGameUUid, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameSnapshot {
        roomid?: (number|null);
        room_owner_id?: (number|null);
        params?: (protocol.RoomParams|null);
        self_buyin?: (number|null);
        self_stake?: (number|null);
        rstate?: (protocol.RoomStates|null);
        buyins?: (protocol.BuyinPlayerInfo[]|null);
        tstate?: (protocol.TableStates|null);
        game_uuids?: (number[]|null);
        prohibit_sitdown_list?: (number[]|null);
        buyin_infos?: (protocol.PlayerBuyinInfo[]|null);
        autoaddactiontime_count?: (number|null);
        actiontime_count?: (number|null);
        club_createrids?: (number[]|null);
        total_buyout?: (number|null);
        allFeeItems?: (protocol.PayMoneyItems|null);
        is_quick_sit?: (boolean|null);
        game_uuids_js?: (protocol.JsStringGameUUid[]|null);
        gameid?: (number|null);
        isvirtual?: (boolean|null);
        isNowCritTime?: (boolean|null);
        anyoneAllin?: (boolean|null);
        starSeats?: (number[]|null);
        identity?: (number|null);
        quickRaise?: (protocol.QuickRaise|null);
        voicePrivate?: (protocol.VoicePrivateNotice[]|null);
        inviterSeats?: (number[]|null);
        news?: (protocol.RoomNews[]|null);
        nextCustomBarrageFee?: (number|null);
        announcement?: (string|null);
        banner?: (string|null);
        auth?: (number|null);
        forbidden?: (number[]|null);
        openCustomBarrage?: (boolean|null);
        openTablePlayerCustomBarrage?: (boolean|null);
        muteCustomBarrageSeconds?: (number|null);
        rankPlayers?: (protocol.TipUserContr[]|null);
        allPlayersCount?: (number|null);
        roomUuidJs?: (string|null);
        tipFees?: (protocol.TipFeeInfo[]|null);
        muteTipSeconds?: (number|null);
    }

    class NoticeGameSnapshot implements INoticeGameSnapshot {
        constructor(p?: protocol.INoticeGameSnapshot);
        public roomid: number;
        public room_owner_id: number;
        public params?: (protocol.RoomParams|null);
        public self_buyin: number;
        public self_stake: number;
        public rstate?: (protocol.RoomStates|null);
        public buyins: protocol.BuyinPlayerInfo[];
        public tstate?: (protocol.TableStates|null);
        public game_uuids: number[];
        public prohibit_sitdown_list: number[];
        public buyin_infos: protocol.PlayerBuyinInfo[];
        public autoaddactiontime_count: number;
        public actiontime_count: number;
        public club_createrids: number[];
        public total_buyout: number;
        public allFeeItems?: (protocol.PayMoneyItems|null);
        public is_quick_sit: boolean;
        public game_uuids_js: protocol.JsStringGameUUid[];
        public gameid: number;
        public isvirtual: boolean;
        public isNowCritTime: boolean;
        public anyoneAllin: boolean;
        public starSeats: number[];
        public identity: number;
        public quickRaise?: (protocol.QuickRaise|null);
        public voicePrivate: protocol.VoicePrivateNotice[];
        public inviterSeats: number[];
        public news: protocol.RoomNews[];
        public nextCustomBarrageFee: number;
        public announcement: string;
        public banner: string;
        public auth: number;
        public forbidden: number[];
        public openCustomBarrage: boolean;
        public openTablePlayerCustomBarrage: boolean;
        public muteCustomBarrageSeconds: number;
        public rankPlayers: protocol.TipUserContr[];
        public allPlayersCount: number;
        public roomUuidJs: string;
        public tipFees: protocol.TipFeeInfo[];
        public muteTipSeconds: number;
        public static create(properties?: protocol.INoticeGameSnapshot): protocol.NoticeGameSnapshot;
        public static encode(m: protocol.NoticeGameSnapshot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameSnapshot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameSnapshot;
        public static toObject(m: protocol.NoticeGameSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IQuickRaise {
        preFlopQuickRaise?: (protocol.QuickRaiseInfo|null);
        postFlopQuickRaise?: (protocol.QuickRaiseInfo|null);
    }

    class QuickRaise implements IQuickRaise {
        constructor(p?: protocol.IQuickRaise);
        public preFlopQuickRaise?: (protocol.QuickRaiseInfo|null);
        public postFlopQuickRaise?: (protocol.QuickRaiseInfo|null);
        public static create(properties?: protocol.IQuickRaise): protocol.QuickRaise;
        public static encode(m: protocol.QuickRaise, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.QuickRaise, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.QuickRaise;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.QuickRaise;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.QuickRaise;
        public static toObject(m: protocol.QuickRaise, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IQuickRaiseInfo {
        raise3?: (string[]|null);
        raise5?: (string[]|null);
        selected?: (number|null);
    }

    class QuickRaiseInfo implements IQuickRaiseInfo {
        constructor(p?: protocol.IQuickRaiseInfo);
        public raise3: string[];
        public raise5: string[];
        public selected: number;
        public static create(properties?: protocol.IQuickRaiseInfo): protocol.QuickRaiseInfo;
        public static encode(m: protocol.QuickRaiseInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.QuickRaiseInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.QuickRaiseInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.QuickRaiseInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.QuickRaiseInfo;
        public static toObject(m: protocol.QuickRaiseInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPayMoneyItems {
        playWay?: (number|null);
        actionCount?: (number|null);
        showCardCount?: (number|null);
        insuranceCount?: (number|null);
        actionDelayCountsFee?: (protocol.FeeItem[]|null);
        showCardCountsFee?: (protocol.FeeItem[]|null);
        insuranceCountsFee?: (protocol.FeeItem[]|null);
        showLeftCardFee?: (protocol.FeeItem[]|null);
        emotionFee?: (protocol.FeeItem|null);
        emotionFee2?: (protocol.FeeItem|null);
        actionMoney?: (number|null);
    }

    class PayMoneyItems implements IPayMoneyItems {
        constructor(p?: protocol.IPayMoneyItems);
        public playWay: number;
        public actionCount: number;
        public showCardCount: number;
        public insuranceCount: number;
        public actionDelayCountsFee: protocol.FeeItem[];
        public showCardCountsFee: protocol.FeeItem[];
        public insuranceCountsFee: protocol.FeeItem[];
        public showLeftCardFee: protocol.FeeItem[];
        public emotionFee?: (protocol.FeeItem|null);
        public emotionFee2?: (protocol.FeeItem|null);
        public actionMoney: number;
        public static create(properties?: protocol.IPayMoneyItems): protocol.PayMoneyItems;
        public static encode(m: protocol.PayMoneyItems, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PayMoneyItems, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PayMoneyItems;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PayMoneyItems;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PayMoneyItems;
        public static toObject(m: protocol.PayMoneyItems, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IFeeItem {
        startCount?: (number|null);
        endCount?: (number|null);
        needCoin?: (number|null);
        state?: (string|null);
    }

    class FeeItem implements IFeeItem {
        constructor(p?: protocol.IFeeItem);
        public startCount: number;
        public endCount: number;
        public needCoin: number;
        public state: string;
        public static create(properties?: protocol.IFeeItem): protocol.FeeItem;
        public static encode(m: protocol.FeeItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.FeeItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.FeeItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.FeeItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.FeeItem;
        public static toObject(m: protocol.FeeItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerShowDownInfo {
        seatid?: (number|null);
        playerid?: (number|null);
        cards?: (protocol.CardItem[]|null);
    }

    class PlayerShowDownInfo implements IPlayerShowDownInfo {
        constructor(p?: protocol.IPlayerShowDownInfo);
        public seatid: number;
        public playerid: number;
        public cards: protocol.CardItem[];
        public static create(properties?: protocol.IPlayerShowDownInfo): protocol.PlayerShowDownInfo;
        public static encode(m: protocol.PlayerShowDownInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerShowDownInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerShowDownInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerShowDownInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerShowDownInfo;
        public static toObject(m: protocol.PlayerShowDownInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameShowDown {
        roomid?: (number|null);
        shows?: (protocol.PlayerShowDownInfo[]|null);
        muck_list?: (number[]|null);
    }

    class NoticeGameShowDown implements INoticeGameShowDown {
        constructor(p?: protocol.INoticeGameShowDown);
        public roomid: number;
        public shows: protocol.PlayerShowDownInfo[];
        public muck_list: number[];
        public static create(properties?: protocol.INoticeGameShowDown): protocol.NoticeGameShowDown;
        public static encode(m: protocol.NoticeGameShowDown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameShowDown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameShowDown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameShowDown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameShowDown;
        public static toObject(m: protocol.NoticeGameShowDown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestRoomSituation {
        roomid?: (number|null);
    }

    class RequestRoomSituation implements IRequestRoomSituation {
        constructor(p?: protocol.IRequestRoomSituation);
        public roomid: number;
        public static create(properties?: protocol.IRequestRoomSituation): protocol.RequestRoomSituation;
        public static encode(m: protocol.RequestRoomSituation, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestRoomSituation, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestRoomSituation;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestRoomSituation;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestRoomSituation;
        public static toObject(m: protocol.RequestRoomSituation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseRoomSituation {
        error?: (number|null);
    }

    class ResponseRoomSituation implements IResponseRoomSituation {
        constructor(p?: protocol.IResponseRoomSituation);
        public error: number;
        public static create(properties?: protocol.IResponseRoomSituation): protocol.ResponseRoomSituation;
        public static encode(m: protocol.ResponseRoomSituation, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseRoomSituation, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseRoomSituation;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseRoomSituation;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseRoomSituation;
        public static toObject(m: protocol.ResponseRoomSituation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerBuyinInfo {
        playername?: (string|null);
        playerid?: (number|null);
        total_buyin?: (number|null);
        curr_record?: (number|null);
        buyin_limit?: (number|null);
        total_buyout?: (number|null);
        HandCount?: (number|null);
        Identity?: (number|null);
        jpHit?: (boolean|null);
    }

    class PlayerBuyinInfo implements IPlayerBuyinInfo {
        constructor(p?: protocol.IPlayerBuyinInfo);
        public playername: string;
        public playerid: number;
        public total_buyin: number;
        public curr_record: number;
        public buyin_limit: number;
        public total_buyout: number;
        public HandCount: number;
        public Identity: number;
        public jpHit: boolean;
        public static create(properties?: protocol.IPlayerBuyinInfo): protocol.PlayerBuyinInfo;
        public static encode(m: protocol.PlayerBuyinInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerBuyinInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerBuyinInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerBuyinInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerBuyinInfo;
        public static toObject(m: protocol.PlayerBuyinInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeRoomStituation {
        roomid?: (number|null);
        buyin_player_list?: (protocol.PlayerBuyinInfo[]|null);
        observer_list?: (protocol.PlayerInfo[]|null);
        insurance_winbet?: (number|null);
        left_time?: (number|null);
        room_start_time?: (number|null);
        bystander_list?: (number[]|null);
        jackpot_winbet?: (number|null);
        check_out_list?: (number[]|null);
        gameid?: (number|null);
        observer_info?: (protocol.ObserverDetails|null);
    }

    class NoticeRoomStituation implements INoticeRoomStituation {
        constructor(p?: protocol.INoticeRoomStituation);
        public roomid: number;
        public buyin_player_list: protocol.PlayerBuyinInfo[];
        public observer_list: protocol.PlayerInfo[];
        public insurance_winbet: number;
        public left_time: number;
        public room_start_time: number;
        public bystander_list: number[];
        public jackpot_winbet: number;
        public check_out_list: number[];
        public gameid: number;
        public observer_info?: (protocol.ObserverDetails|null);
        public static create(properties?: protocol.INoticeRoomStituation): protocol.NoticeRoomStituation;
        public static encode(m: protocol.NoticeRoomStituation, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeRoomStituation, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeRoomStituation;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeRoomStituation;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeRoomStituation;
        public static toObject(m: protocol.NoticeRoomStituation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IObserverDetails {
        online_count?: (number|null);
        total_count?: (number|null);
    }

    class ObserverDetails implements IObserverDetails {
        constructor(p?: protocol.IObserverDetails);
        public online_count: number;
        public total_count: number;
        public static create(properties?: protocol.IObserverDetails): protocol.ObserverDetails;
        public static encode(m: protocol.ObserverDetails, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ObserverDetails, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ObserverDetails;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ObserverDetails;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ObserverDetails;
        public static toObject(m: protocol.ObserverDetails, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSendCardFun {
        roomid?: (number|null);
    }

    class RequestSendCardFun implements IRequestSendCardFun {
        constructor(p?: protocol.IRequestSendCardFun);
        public roomid: number;
        public static create(properties?: protocol.IRequestSendCardFun): protocol.RequestSendCardFun;
        public static encode(m: protocol.RequestSendCardFun, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestSendCardFun, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestSendCardFun;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestSendCardFun;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestSendCardFun;
        public static toObject(m: protocol.RequestSendCardFun, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSendCardFun {
        error?: (number|null);
    }

    class ResponseSendCardFun implements IResponseSendCardFun {
        constructor(p?: protocol.IResponseSendCardFun);
        public error: number;
        public static create(properties?: protocol.IResponseSendCardFun): protocol.ResponseSendCardFun;
        public static encode(m: protocol.ResponseSendCardFun, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseSendCardFun, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseSendCardFun;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseSendCardFun;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseSendCardFun;
        public static toObject(m: protocol.ResponseSendCardFun, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeRoomCardFun {
        roomid?: (number|null);
        round_state?: (number|null);
        player_name?: (string|null);
        cards?: (protocol.CardItem[]|null);
        next_price?: (number|null);
        player_id?: (number|null);
    }

    class NoticeRoomCardFun implements INoticeRoomCardFun {
        constructor(p?: protocol.INoticeRoomCardFun);
        public roomid: number;
        public round_state: number;
        public player_name: string;
        public cards: protocol.CardItem[];
        public next_price: number;
        public player_id: number;
        public static create(properties?: protocol.INoticeRoomCardFun): protocol.NoticeRoomCardFun;
        public static encode(m: protocol.NoticeRoomCardFun, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeRoomCardFun, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeRoomCardFun;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeRoomCardFun;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeRoomCardFun;
        public static toObject(m: protocol.NoticeRoomCardFun, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum ChatType {
        Enum_Emoji = 0,
        Enum_Voice = 1
    }

    interface IRequestSendChat {
        roomid?: (number|null);
        ctype?: (protocol.ChatType|null);
        content?: (string|null);
        change_voice?: (number|null);
    }

    class RequestSendChat implements IRequestSendChat {
        constructor(p?: protocol.IRequestSendChat);
        public roomid: number;
        public ctype: protocol.ChatType;
        public content: string;
        public change_voice: number;
        public static create(properties?: protocol.IRequestSendChat): protocol.RequestSendChat;
        public static encode(m: protocol.RequestSendChat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestSendChat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestSendChat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestSendChat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestSendChat;
        public static toObject(m: protocol.RequestSendChat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSendChat {
        error?: (number|null);
        next_fee?: (number|null);
    }

    class ResponseSendChat implements IResponseSendChat {
        constructor(p?: protocol.IResponseSendChat);
        public error: number;
        public next_fee: number;
        public static create(properties?: protocol.IResponseSendChat): protocol.ResponseSendChat;
        public static encode(m: protocol.ResponseSendChat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseSendChat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseSendChat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseSendChat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseSendChat;
        public static toObject(m: protocol.ResponseSendChat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSendChat {
        roomid?: (number|null);
        ctype?: (protocol.ChatType|null);
        content?: (string|null);
        playerid?: (number|null);
        seatid?: (number|null);
        change_voice?: (number|null);
    }

    class NoticeSendChat implements INoticeSendChat {
        constructor(p?: protocol.INoticeSendChat);
        public roomid: number;
        public ctype: protocol.ChatType;
        public content: string;
        public playerid: number;
        public seatid: number;
        public change_voice: number;
        public static create(properties?: protocol.INoticeSendChat): protocol.NoticeSendChat;
        public static encode(m: protocol.NoticeSendChat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeSendChat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeSendChat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeSendChat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeSendChat;
        public static toObject(m: protocol.NoticeSendChat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestStayPosition {
        roomid?: (number|null);
    }

    class RequestStayPosition implements IRequestStayPosition {
        constructor(p?: protocol.IRequestStayPosition);
        public roomid: number;
        public static create(properties?: protocol.IRequestStayPosition): protocol.RequestStayPosition;
        public static encode(m: protocol.RequestStayPosition, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestStayPosition, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestStayPosition;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestStayPosition;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestStayPosition;
        public static toObject(m: protocol.RequestStayPosition, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseStayPosition {
        error?: (number|null);
    }

    class ResponseStayPosition implements IResponseStayPosition {
        constructor(p?: protocol.IResponseStayPosition);
        public error: number;
        public static create(properties?: protocol.IResponseStayPosition): protocol.ResponseStayPosition;
        public static encode(m: protocol.ResponseStayPosition, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseStayPosition, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseStayPosition;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseStayPosition;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseStayPosition;
        public static toObject(m: protocol.ResponseStayPosition, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePlayerStay {
        roomid?: (number|null);
        players?: (protocol.PlayerInfo[]|null);
    }

    class NoticePlayerStay implements INoticePlayerStay {
        constructor(p?: protocol.INoticePlayerStay);
        public roomid: number;
        public players: protocol.PlayerInfo[];
        public static create(properties?: protocol.INoticePlayerStay): protocol.NoticePlayerStay;
        public static encode(m: protocol.NoticePlayerStay, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePlayerStay, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePlayerStay;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePlayerStay;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePlayerStay;
        public static toObject(m: protocol.NoticePlayerStay, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestBackPosition {
        roomid?: (number|null);
    }

    class RequestBackPosition implements IRequestBackPosition {
        constructor(p?: protocol.IRequestBackPosition);
        public roomid: number;
        public static create(properties?: protocol.IRequestBackPosition): protocol.RequestBackPosition;
        public static encode(m: protocol.RequestBackPosition, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestBackPosition, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestBackPosition;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestBackPosition;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestBackPosition;
        public static toObject(m: protocol.RequestBackPosition, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseBackPosition {
        error?: (number|null);
    }

    class ResponseBackPosition implements IResponseBackPosition {
        constructor(p?: protocol.IResponseBackPosition);
        public error: number;
        public static create(properties?: protocol.IResponseBackPosition): protocol.ResponseBackPosition;
        public static encode(m: protocol.ResponseBackPosition, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseBackPosition, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseBackPosition;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseBackPosition;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseBackPosition;
        public static toObject(m: protocol.ResponseBackPosition, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeBackPosition {
        roomid?: (number|null);
        player?: (protocol.PlayerInfo|null);
    }

    class NoticeBackPosition implements INoticeBackPosition {
        constructor(p?: protocol.INoticeBackPosition);
        public roomid: number;
        public player?: (protocol.PlayerInfo|null);
        public static create(properties?: protocol.INoticeBackPosition): protocol.NoticeBackPosition;
        public static encode(m: protocol.NoticeBackPosition, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeBackPosition, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeBackPosition;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeBackPosition;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeBackPosition;
        public static toObject(m: protocol.NoticeBackPosition, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestShowCard {
        roomid?: (number|null);
        cards?: (number|null);
        is_show?: (boolean|null);
        cardList?: (number[]|null);
    }

    class RequestShowCard implements IRequestShowCard {
        constructor(p?: protocol.IRequestShowCard);
        public roomid: number;
        public cards: number;
        public is_show: boolean;
        public cardList: number[];
        public static create(properties?: protocol.IRequestShowCard): protocol.RequestShowCard;
        public static encode(m: protocol.RequestShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestShowCard;
        public static toObject(m: protocol.RequestShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseShowCard {
        error?: (number|null);
    }

    class ResponseShowCard implements IResponseShowCard {
        constructor(p?: protocol.IResponseShowCard);
        public error: number;
        public static create(properties?: protocol.IResponseShowCard): protocol.ResponseShowCard;
        public static encode(m: protocol.ResponseShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseShowCard;
        public static toObject(m: protocol.ResponseShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerShowInfo {
        playerid?: (number|null);
        seatid?: (number|null);
        cards?: (protocol.CardItem[]|null);
    }

    class PlayerShowInfo implements IPlayerShowInfo {
        constructor(p?: protocol.IPlayerShowInfo);
        public playerid: number;
        public seatid: number;
        public cards: protocol.CardItem[];
        public static create(properties?: protocol.IPlayerShowInfo): protocol.PlayerShowInfo;
        public static encode(m: protocol.PlayerShowInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerShowInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerShowInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerShowInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerShowInfo;
        public static toObject(m: protocol.PlayerShowInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePlayerShow {
        roomid?: (number|null);
        show_card_id?: (number[]|null);
        players?: (protocol.PlayerShowInfo[]|null);
    }

    class NoticePlayerShow implements INoticePlayerShow {
        constructor(p?: protocol.INoticePlayerShow);
        public roomid: number;
        public show_card_id: number[];
        public players: protocol.PlayerShowInfo[];
        public static create(properties?: protocol.INoticePlayerShow): protocol.NoticePlayerShow;
        public static encode(m: protocol.NoticePlayerShow, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePlayerShow, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePlayerShow;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePlayerShow;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePlayerShow;
        public static toObject(m: protocol.NoticePlayerShow, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeLoginPlayerJoinRoom {
        roomid?: (number|null);
        anti_simulator?: (boolean|null);
    }

    class NoticeLoginPlayerJoinRoom implements INoticeLoginPlayerJoinRoom {
        constructor(p?: protocol.INoticeLoginPlayerJoinRoom);
        public roomid: number;
        public anti_simulator: boolean;
        public static create(properties?: protocol.INoticeLoginPlayerJoinRoom): protocol.NoticeLoginPlayerJoinRoom;
        public static encode(m: protocol.NoticeLoginPlayerJoinRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeLoginPlayerJoinRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeLoginPlayerJoinRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeLoginPlayerJoinRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeLoginPlayerJoinRoom;
        public static toObject(m: protocol.NoticeLoginPlayerJoinRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeWaitingOtherPlayer {
        roomid?: (number|null);
    }

    class NoticeWaitingOtherPlayer implements INoticeWaitingOtherPlayer {
        constructor(p?: protocol.INoticeWaitingOtherPlayer);
        public roomid: number;
        public static create(properties?: protocol.INoticeWaitingOtherPlayer): protocol.NoticeWaitingOtherPlayer;
        public static encode(m: protocol.NoticeWaitingOtherPlayer, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeWaitingOtherPlayer, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeWaitingOtherPlayer;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeWaitingOtherPlayer;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeWaitingOtherPlayer;
        public static toObject(m: protocol.NoticeWaitingOtherPlayer, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestUpdateMoney {
        money?: (number|null);
    }

    class RequestUpdateMoney implements IRequestUpdateMoney {
        constructor(p?: protocol.IRequestUpdateMoney);
        public money: number;
        public static create(properties?: protocol.IRequestUpdateMoney): protocol.RequestUpdateMoney;
        public static encode(m: protocol.RequestUpdateMoney, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestUpdateMoney, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestUpdateMoney;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestUpdateMoney;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestUpdateMoney;
        public static toObject(m: protocol.RequestUpdateMoney, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseUpdateMoney {
        error?: (number|null);
    }

    class ResponseUpdateMoney implements IResponseUpdateMoney {
        constructor(p?: protocol.IResponseUpdateMoney);
        public error: number;
        public static create(properties?: protocol.IResponseUpdateMoney): protocol.ResponseUpdateMoney;
        public static encode(m: protocol.ResponseUpdateMoney, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseUpdateMoney, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseUpdateMoney;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseUpdateMoney;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseUpdateMoney;
        public static toObject(m: protocol.ResponseUpdateMoney, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeUpdateMoney {
        plyer_id?: (number|null);
        seat_id?: (number|null);
        room_id?: (number|null);
        stake?: (number|null);
    }

    class NoticeUpdateMoney implements INoticeUpdateMoney {
        constructor(p?: protocol.INoticeUpdateMoney);
        public plyer_id: number;
        public seat_id: number;
        public room_id: number;
        public stake: number;
        public static create(properties?: protocol.INoticeUpdateMoney): protocol.NoticeUpdateMoney;
        public static encode(m: protocol.NoticeUpdateMoney, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeUpdateMoney, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeUpdateMoney;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeUpdateMoney;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeUpdateMoney;
        public static toObject(m: protocol.NoticeUpdateMoney, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeBuyin {
        self_buyin?: (number|null);
        self_stake?: (number|null);
        bank_chips?: (number|null);
        self_buyout?: (number|null);
        roomid?: (number|null);
        buyin_amount?: (number|null);
        next_hand?: (boolean|null);
        playerid?: (number|null);
        is_auto?: (boolean|null);
        usdt_subtract?: (number|null);
        gold_add?: (number|null);
    }

    class NoticeBuyin implements INoticeBuyin {
        constructor(p?: protocol.INoticeBuyin);
        public self_buyin: number;
        public self_stake: number;
        public bank_chips: number;
        public self_buyout: number;
        public roomid: number;
        public buyin_amount: number;
        public next_hand: boolean;
        public playerid: number;
        public is_auto: boolean;
        public usdt_subtract: number;
        public gold_add: number;
        public static create(properties?: protocol.INoticeBuyin): protocol.NoticeBuyin;
        public static encode(m: protocol.NoticeBuyin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeBuyin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeBuyin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeBuyin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeBuyin;
        public static toObject(m: protocol.NoticeBuyin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGameRecords {
        roomid?: (number|null);
        records?: (protocol.GameRecord[]|null);
    }

    class NoticeGameRecords implements INoticeGameRecords {
        constructor(p?: protocol.INoticeGameRecords);
        public roomid: number;
        public records: protocol.GameRecord[];
        public static create(properties?: protocol.INoticeGameRecords): protocol.NoticeGameRecords;
        public static encode(m: protocol.NoticeGameRecords, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGameRecords, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGameRecords;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGameRecords;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGameRecords;
        public static toObject(m: protocol.NoticeGameRecords, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestModifyBuyinLimit {
        buyin_limit?: (number|null);
        last_buyin_clubid?: (number|null);
        last_buyin_ownerid?: (number|null);
        last_buyin_clubname?: (string|null);
    }

    class RequestModifyBuyinLimit implements IRequestModifyBuyinLimit {
        constructor(p?: protocol.IRequestModifyBuyinLimit);
        public buyin_limit: number;
        public last_buyin_clubid: number;
        public last_buyin_ownerid: number;
        public last_buyin_clubname: string;
        public static create(properties?: protocol.IRequestModifyBuyinLimit): protocol.RequestModifyBuyinLimit;
        public static encode(m: protocol.RequestModifyBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestModifyBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestModifyBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestModifyBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestModifyBuyinLimit;
        public static toObject(m: protocol.RequestModifyBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseModifyBuyinLimit {
        error?: (number|null);
        roomid?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
    }

    class ResponseModifyBuyinLimit implements IResponseModifyBuyinLimit {
        constructor(p?: protocol.IResponseModifyBuyinLimit);
        public error: number;
        public roomid: number;
        public playerid: number;
        public playername: string;
        public static create(properties?: protocol.IResponseModifyBuyinLimit): protocol.ResponseModifyBuyinLimit;
        public static encode(m: protocol.ResponseModifyBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseModifyBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseModifyBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseModifyBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseModifyBuyinLimit;
        public static toObject(m: protocol.ResponseModifyBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeModifyBuyinLimit {
        buyin_limit?: (number|null);
        buyin_now?: (number|null);
        roomid?: (number|null);
    }

    class NoticeModifyBuyinLimit implements INoticeModifyBuyinLimit {
        constructor(p?: protocol.INoticeModifyBuyinLimit);
        public buyin_limit: number;
        public buyin_now: number;
        public roomid: number;
        public static create(properties?: protocol.INoticeModifyBuyinLimit): protocol.NoticeModifyBuyinLimit;
        public static encode(m: protocol.NoticeModifyBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeModifyBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeModifyBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeModifyBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeModifyBuyinLimit;
        public static toObject(m: protocol.NoticeModifyBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeBuyInsuranceResult {
        room_id?: (number|null);
        player_name?: (string|null);
        result?: (boolean|null);
        insure_amount?: (number|null);
    }

    class NoticeBuyInsuranceResult implements INoticeBuyInsuranceResult {
        constructor(p?: protocol.INoticeBuyInsuranceResult);
        public room_id: number;
        public player_name: string;
        public result: boolean;
        public insure_amount: number;
        public static create(properties?: protocol.INoticeBuyInsuranceResult): protocol.NoticeBuyInsuranceResult;
        public static encode(m: protocol.NoticeBuyInsuranceResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeBuyInsuranceResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeBuyInsuranceResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeBuyInsuranceResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeBuyInsuranceResult;
        public static toObject(m: protocol.NoticeBuyInsuranceResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeInsuranceToomanyLeader {
        room_id?: (number|null);
    }

    class NoticeInsuranceToomanyLeader implements INoticeInsuranceToomanyLeader {
        constructor(p?: protocol.INoticeInsuranceToomanyLeader);
        public room_id: number;
        public static create(properties?: protocol.INoticeInsuranceToomanyLeader): protocol.NoticeInsuranceToomanyLeader;
        public static encode(m: protocol.NoticeInsuranceToomanyLeader, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeInsuranceToomanyLeader, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeInsuranceToomanyLeader;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeInsuranceToomanyLeader;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeInsuranceToomanyLeader;
        public static toObject(m: protocol.NoticeInsuranceToomanyLeader, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeInsuranceHitOuts {
        room_id?: (number|null);
        player_name?: (string|null);
        playerid?: (number|null);
        insure_amount?: (number|null);
        card?: (protocol.CardItem|null);
        payment?: (number|null);
    }

    class NoticeInsuranceHitOuts implements INoticeInsuranceHitOuts {
        constructor(p?: protocol.INoticeInsuranceHitOuts);
        public room_id: number;
        public player_name: string;
        public playerid: number;
        public insure_amount: number;
        public card?: (protocol.CardItem|null);
        public payment: number;
        public static create(properties?: protocol.INoticeInsuranceHitOuts): protocol.NoticeInsuranceHitOuts;
        public static encode(m: protocol.NoticeInsuranceHitOuts, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeInsuranceHitOuts, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeInsuranceHitOuts;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeInsuranceHitOuts;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeInsuranceHitOuts;
        public static toObject(m: protocol.NoticeInsuranceHitOuts, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeInsuranceMissOuts {
        room_id?: (number|null);
        playerid?: (number|null);
        insure_amount?: (number|null);
    }

    class NoticeInsuranceMissOuts implements INoticeInsuranceMissOuts {
        constructor(p?: protocol.INoticeInsuranceMissOuts);
        public room_id: number;
        public playerid: number;
        public insure_amount: number;
        public static create(properties?: protocol.INoticeInsuranceMissOuts): protocol.NoticeInsuranceMissOuts;
        public static encode(m: protocol.NoticeInsuranceMissOuts, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeInsuranceMissOuts, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeInsuranceMissOuts;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeInsuranceMissOuts;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeInsuranceMissOuts;
        public static toObject(m: protocol.NoticeInsuranceMissOuts, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeNoNeedInsurance {
        room_id?: (number|null);
    }

    class NoticeNoNeedInsurance implements INoticeNoNeedInsurance {
        constructor(p?: protocol.INoticeNoNeedInsurance);
        public room_id: number;
        public static create(properties?: protocol.INoticeNoNeedInsurance): protocol.NoticeNoNeedInsurance;
        public static encode(m: protocol.NoticeNoNeedInsurance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeNoNeedInsurance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeNoNeedInsurance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeNoNeedInsurance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeNoNeedInsurance;
        public static toObject(m: protocol.NoticeNoNeedInsurance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSnapshot {
        roomid?: (number|null);
    }

    class RequestSnapshot implements IRequestSnapshot {
        constructor(p?: protocol.IRequestSnapshot);
        public roomid: number;
        public static create(properties?: protocol.IRequestSnapshot): protocol.RequestSnapshot;
        public static encode(m: protocol.RequestSnapshot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestSnapshot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestSnapshot;
        public static toObject(m: protocol.RequestSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSnapshot {
        error?: (number|null);
    }

    class ResponseSnapshot implements IResponseSnapshot {
        constructor(p?: protocol.IResponseSnapshot);
        public error: number;
        public static create(properties?: protocol.IResponseSnapshot): protocol.ResponseSnapshot;
        public static encode(m: protocol.ResponseSnapshot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseSnapshot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseSnapshot;
        public static toObject(m: protocol.ResponseSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestBuyout {
        roomid?: (number|null);
        buyout_gold?: (number|null);
    }

    class RequestBuyout implements IRequestBuyout {
        constructor(p?: protocol.IRequestBuyout);
        public roomid: number;
        public buyout_gold: number;
        public static create(properties?: protocol.IRequestBuyout): protocol.RequestBuyout;
        public static encode(m: protocol.RequestBuyout, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestBuyout, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestBuyout;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestBuyout;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestBuyout;
        public static toObject(m: protocol.RequestBuyout, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseBuyout {
        error?: (number|null);
    }

    class ResponseBuyout implements IResponseBuyout {
        constructor(p?: protocol.IResponseBuyout);
        public error: number;
        public static create(properties?: protocol.IResponseBuyout): protocol.ResponseBuyout;
        public static encode(m: protocol.ResponseBuyout, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseBuyout, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseBuyout;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseBuyout;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseBuyout;
        public static toObject(m: protocol.ResponseBuyout, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeBuyout {
        roomid?: (number|null);
        buyout_gold?: (number|null);
        remain_gold?: (number|null);
        seat_no?: (number|null);
        total_buyout?: (number|null);
        is_auto?: (boolean|null);
    }

    class NoticeBuyout implements INoticeBuyout {
        constructor(p?: protocol.INoticeBuyout);
        public roomid: number;
        public buyout_gold: number;
        public remain_gold: number;
        public seat_no: number;
        public total_buyout: number;
        public is_auto: boolean;
        public static create(properties?: protocol.INoticeBuyout): protocol.NoticeBuyout;
        public static encode(m: protocol.NoticeBuyout, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeBuyout, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeBuyout;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeBuyout;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeBuyout;
        public static toObject(m: protocol.NoticeBuyout, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeRealStart {
        roomid?: (number|null);
        starttime?: (number|null);
    }

    class NoticeRealStart implements INoticeRealStart {
        constructor(p?: protocol.INoticeRealStart);
        public roomid: number;
        public starttime: number;
        public static create(properties?: protocol.INoticeRealStart): protocol.NoticeRealStart;
        public static encode(m: protocol.NoticeRealStart, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeRealStart, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeRealStart;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeRealStart;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeRealStart;
        public static toObject(m: protocol.NoticeRealStart, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAddActionTime {
        roomid?: (number|null);
        action_seatid?: (number|null);
        rest_action_time?: (number|null);
        count?: (number|null);
        money?: (number|null);
    }

    class NoticeAddActionTime implements INoticeAddActionTime {
        constructor(p?: protocol.INoticeAddActionTime);
        public roomid: number;
        public action_seatid: number;
        public rest_action_time: number;
        public count: number;
        public money: number;
        public static create(properties?: protocol.INoticeAddActionTime): protocol.NoticeAddActionTime;
        public static encode(m: protocol.NoticeAddActionTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeAddActionTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeAddActionTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeAddActionTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeAddActionTime;
        public static toObject(m: protocol.NoticeAddActionTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeNotSupportInsurance {
        roomid?: (number|null);
    }

    class NoticeNotSupportInsurance implements INoticeNotSupportInsurance {
        constructor(p?: protocol.INoticeNotSupportInsurance);
        public roomid: number;
        public static create(properties?: protocol.INoticeNotSupportInsurance): protocol.NoticeNotSupportInsurance;
        public static encode(m: protocol.NoticeNotSupportInsurance, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeNotSupportInsurance, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeNotSupportInsurance;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeNotSupportInsurance;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeNotSupportInsurance;
        public static toObject(m: protocol.NoticeNotSupportInsurance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestHeartBeat {
        uid?: (number|null);
        position?: (protocol.PositionInfo|null);
    }

    class RequestHeartBeat implements IRequestHeartBeat {
        constructor(p?: protocol.IRequestHeartBeat);
        public uid: number;
        public position?: (protocol.PositionInfo|null);
        public static create(properties?: protocol.IRequestHeartBeat): protocol.RequestHeartBeat;
        public static encode(m: protocol.RequestHeartBeat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestHeartBeat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestHeartBeat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestHeartBeat;
        public static toObject(m: protocol.RequestHeartBeat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseHeartBeat {
        uid?: (number|null);
        timestamp?: (number|null);
    }

    class ResponseHeartBeat implements IResponseHeartBeat {
        constructor(p?: protocol.IResponseHeartBeat);
        public uid: number;
        public timestamp: number;
        public static create(properties?: protocol.IResponseHeartBeat): protocol.ResponseHeartBeat;
        public static encode(m: protocol.ResponseHeartBeat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseHeartBeat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseHeartBeat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseHeartBeat;
        public static toObject(m: protocol.ResponseHeartBeat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestInteractiveExpression {
        roomid?: (number|null);
        content?: (string|null);
        type?: (protocol.EmojiType|null);
    }

    class RequestInteractiveExpression implements IRequestInteractiveExpression {
        constructor(p?: protocol.IRequestInteractiveExpression);
        public roomid: number;
        public content: string;
        public type: protocol.EmojiType;
        public static create(properties?: protocol.IRequestInteractiveExpression): protocol.RequestInteractiveExpression;
        public static encode(m: protocol.RequestInteractiveExpression, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestInteractiveExpression, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestInteractiveExpression;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestInteractiveExpression;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestInteractiveExpression;
        public static toObject(m: protocol.RequestInteractiveExpression, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseInteractiveExpression {
        error?: (number|null);
        left_duration?: (number|null);
    }

    class ResponseInteractiveExpression implements IResponseInteractiveExpression {
        constructor(p?: protocol.IResponseInteractiveExpression);
        public error: number;
        public left_duration: number;
        public static create(properties?: protocol.IResponseInteractiveExpression): protocol.ResponseInteractiveExpression;
        public static encode(m: protocol.ResponseInteractiveExpression, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseInteractiveExpression, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseInteractiveExpression;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseInteractiveExpression;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseInteractiveExpression;
        public static toObject(m: protocol.ResponseInteractiveExpression, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeInteractiveExpression {
        roomid?: (number|null);
        content?: (string|null);
        playerid?: (number|null);
        seatid?: (number|null);
        type?: (protocol.EmojiType|null);
    }

    class NoticeInteractiveExpression implements INoticeInteractiveExpression {
        constructor(p?: protocol.INoticeInteractiveExpression);
        public roomid: number;
        public content: string;
        public playerid: number;
        public seatid: number;
        public type: protocol.EmojiType;
        public static create(properties?: protocol.INoticeInteractiveExpression): protocol.NoticeInteractiveExpression;
        public static encode(m: protocol.NoticeInteractiveExpression, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeInteractiveExpression, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeInteractiveExpression;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeInteractiveExpression;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeInteractiveExpression;
        public static toObject(m: protocol.NoticeInteractiveExpression, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAddInsuranceTime {
        roomid?: (number|null);
        action_seq?: (number|null);
    }

    class RequestAddInsuranceTime implements IRequestAddInsuranceTime {
        constructor(p?: protocol.IRequestAddInsuranceTime);
        public roomid: number;
        public action_seq: number;
        public static create(properties?: protocol.IRequestAddInsuranceTime): protocol.RequestAddInsuranceTime;
        public static encode(m: protocol.RequestAddInsuranceTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAddInsuranceTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAddInsuranceTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAddInsuranceTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAddInsuranceTime;
        public static toObject(m: protocol.RequestAddInsuranceTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAddInsuranceTime {
        error?: (number|null);
    }

    class ResponseAddInsuranceTime implements IResponseAddInsuranceTime {
        constructor(p?: protocol.IResponseAddInsuranceTime);
        public error: number;
        public static create(properties?: protocol.IResponseAddInsuranceTime): protocol.ResponseAddInsuranceTime;
        public static encode(m: protocol.ResponseAddInsuranceTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAddInsuranceTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAddInsuranceTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAddInsuranceTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAddInsuranceTime;
        public static toObject(m: protocol.ResponseAddInsuranceTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAddInsuranceTime {
        roomid?: (number|null);
        playerid?: (number|null);
        action_seatid?: (number|null);
        rest_insurance_time?: (number|null);
        count?: (number|null);
    }

    class NoticeAddInsuranceTime implements INoticeAddInsuranceTime {
        constructor(p?: protocol.INoticeAddInsuranceTime);
        public roomid: number;
        public playerid: number;
        public action_seatid: number;
        public rest_insurance_time: number;
        public count: number;
        public static create(properties?: protocol.INoticeAddInsuranceTime): protocol.NoticeAddInsuranceTime;
        public static encode(m: protocol.NoticeAddInsuranceTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeAddInsuranceTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeAddInsuranceTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeAddInsuranceTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeAddInsuranceTime;
        public static toObject(m: protocol.NoticeAddInsuranceTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAddRoomTime {
        roomid?: (number|null);
    }

    class RequestAddRoomTime implements IRequestAddRoomTime {
        constructor(p?: protocol.IRequestAddRoomTime);
        public roomid: number;
        public static create(properties?: protocol.IRequestAddRoomTime): protocol.RequestAddRoomTime;
        public static encode(m: protocol.RequestAddRoomTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAddRoomTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAddRoomTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAddRoomTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAddRoomTime;
        public static toObject(m: protocol.RequestAddRoomTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAddRoomTime {
        error?: (number|null);
    }

    class ResponseAddRoomTime implements IResponseAddRoomTime {
        constructor(p?: protocol.IResponseAddRoomTime);
        public error: number;
        public static create(properties?: protocol.IResponseAddRoomTime): protocol.ResponseAddRoomTime;
        public static encode(m: protocol.ResponseAddRoomTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAddRoomTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAddRoomTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAddRoomTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAddRoomTime;
        public static toObject(m: protocol.ResponseAddRoomTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAddRoomTime {
        roomid?: (number|null);
        playerid?: (number|null);
    }

    class NoticeAddRoomTime implements INoticeAddRoomTime {
        constructor(p?: protocol.INoticeAddRoomTime);
        public roomid: number;
        public playerid: number;
        public static create(properties?: protocol.INoticeAddRoomTime): protocol.NoticeAddRoomTime;
        public static encode(m: protocol.NoticeAddRoomTime, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeAddRoomTime, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeAddRoomTime;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeAddRoomTime;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeAddRoomTime;
        public static toObject(m: protocol.NoticeAddRoomTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestProhibitSitdown {
        roomid?: (number|null);
        targetid?: (number|null);
        isProhibitSitdown?: (boolean|null);
    }

    class RequestProhibitSitdown implements IRequestProhibitSitdown {
        constructor(p?: protocol.IRequestProhibitSitdown);
        public roomid: number;
        public targetid: number;
        public isProhibitSitdown: boolean;
        public static create(properties?: protocol.IRequestProhibitSitdown): protocol.RequestProhibitSitdown;
        public static encode(m: protocol.RequestProhibitSitdown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestProhibitSitdown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestProhibitSitdown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestProhibitSitdown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestProhibitSitdown;
        public static toObject(m: protocol.RequestProhibitSitdown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseProhibitSitdown {
        error?: (number|null);
    }

    class ResponseProhibitSitdown implements IResponseProhibitSitdown {
        constructor(p?: protocol.IResponseProhibitSitdown);
        public error: number;
        public static create(properties?: protocol.IResponseProhibitSitdown): protocol.ResponseProhibitSitdown;
        public static encode(m: protocol.ResponseProhibitSitdown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseProhibitSitdown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseProhibitSitdown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseProhibitSitdown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseProhibitSitdown;
        public static toObject(m: protocol.ResponseProhibitSitdown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeProhibitSitdown {
        roomid?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
        isProhibitSitdown?: (boolean|null);
        prohibit_sitdown_list?: (number[]|null);
    }

    class NoticeProhibitSitdown implements INoticeProhibitSitdown {
        constructor(p?: protocol.INoticeProhibitSitdown);
        public roomid: number;
        public playerid: number;
        public playername: string;
        public isProhibitSitdown: boolean;
        public prohibit_sitdown_list: number[];
        public static create(properties?: protocol.INoticeProhibitSitdown): protocol.NoticeProhibitSitdown;
        public static encode(m: protocol.NoticeProhibitSitdown, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeProhibitSitdown, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeProhibitSitdown;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeProhibitSitdown;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeProhibitSitdown;
        public static toObject(m: protocol.NoticeProhibitSitdown, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestForceStandup {
        roomid?: (number|null);
        targetid?: (number|null);
        svr_jstr?: (string|null);
    }

    class RequestForceStandup implements IRequestForceStandup {
        constructor(p?: protocol.IRequestForceStandup);
        public roomid: number;
        public targetid: number;
        public svr_jstr: string;
        public static create(properties?: protocol.IRequestForceStandup): protocol.RequestForceStandup;
        public static encode(m: protocol.RequestForceStandup, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestForceStandup, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestForceStandup;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestForceStandup;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestForceStandup;
        public static toObject(m: protocol.RequestForceStandup, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseForceStandup {
        error?: (number|null);
        user_standup_type?: (number|null);
        reason?: (string|null);
        starCD?: (number|null);
    }

    class ResponseForceStandup implements IResponseForceStandup {
        constructor(p?: protocol.IResponseForceStandup);
        public error: number;
        public user_standup_type: number;
        public reason: string;
        public starCD: number;
        public static create(properties?: protocol.IResponseForceStandup): protocol.ResponseForceStandup;
        public static encode(m: protocol.ResponseForceStandup, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseForceStandup, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseForceStandup;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseForceStandup;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseForceStandup;
        public static toObject(m: protocol.ResponseForceStandup, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeForceStandup {
        roomid?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
    }

    class NoticeForceStandup implements INoticeForceStandup {
        constructor(p?: protocol.INoticeForceStandup);
        public roomid: number;
        public playerid: number;
        public playername: string;
        public static create(properties?: protocol.INoticeForceStandup): protocol.NoticeForceStandup;
        public static encode(m: protocol.NoticeForceStandup, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeForceStandup, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeForceStandup;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeForceStandup;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeForceStandup;
        public static toObject(m: protocol.NoticeForceStandup, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestPauseGame {
        roomid?: (number|null);
        isPause?: (boolean|null);
    }

    class RequestPauseGame implements IRequestPauseGame {
        constructor(p?: protocol.IRequestPauseGame);
        public roomid: number;
        public isPause: boolean;
        public static create(properties?: protocol.IRequestPauseGame): protocol.RequestPauseGame;
        public static encode(m: protocol.RequestPauseGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestPauseGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestPauseGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestPauseGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestPauseGame;
        public static toObject(m: protocol.RequestPauseGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponsePauseGame {
        error?: (number|null);
    }

    class ResponsePauseGame implements IResponsePauseGame {
        constructor(p?: protocol.IResponsePauseGame);
        public error: number;
        public static create(properties?: protocol.IResponsePauseGame): protocol.ResponsePauseGame;
        public static encode(m: protocol.ResponsePauseGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponsePauseGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponsePauseGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponsePauseGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponsePauseGame;
        public static toObject(m: protocol.ResponsePauseGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePauseGame {
        roomid?: (number|null);
        isPause?: (boolean|null);
        paused?: (boolean|null);
    }

    class NoticePauseGame implements INoticePauseGame {
        constructor(p?: protocol.INoticePauseGame);
        public roomid: number;
        public isPause: boolean;
        public paused: boolean;
        public static create(properties?: protocol.INoticePauseGame): protocol.NoticePauseGame;
        public static encode(m: protocol.NoticePauseGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePauseGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePauseGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePauseGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePauseGame;
        public static toObject(m: protocol.NoticePauseGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeInitiativeDestroyRoom {
        roomid?: (number|null);
        roomname?: (string|null);
    }

    class NoticeInitiativeDestroyRoom implements INoticeInitiativeDestroyRoom {
        constructor(p?: protocol.INoticeInitiativeDestroyRoom);
        public roomid: number;
        public roomname: string;
        public static create(properties?: protocol.INoticeInitiativeDestroyRoom): protocol.NoticeInitiativeDestroyRoom;
        public static encode(m: protocol.NoticeInitiativeDestroyRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeInitiativeDestroyRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeInitiativeDestroyRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeInitiativeDestroyRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeInitiativeDestroyRoom;
        public static toObject(m: protocol.NoticeInitiativeDestroyRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCheckOutAndLeave {
        roomid?: (number|null);
        is_svr_req?: (boolean|null);
    }

    class RequestCheckOutAndLeave implements IRequestCheckOutAndLeave {
        constructor(p?: protocol.IRequestCheckOutAndLeave);
        public roomid: number;
        public is_svr_req: boolean;
        public static create(properties?: protocol.IRequestCheckOutAndLeave): protocol.RequestCheckOutAndLeave;
        public static encode(m: protocol.RequestCheckOutAndLeave, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestCheckOutAndLeave, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestCheckOutAndLeave;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestCheckOutAndLeave;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestCheckOutAndLeave;
        public static toObject(m: protocol.RequestCheckOutAndLeave, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCheckOutAndLeave {
        error?: (number|null);
    }

    class ResponseCheckOutAndLeave implements IResponseCheckOutAndLeave {
        constructor(p?: protocol.IResponseCheckOutAndLeave);
        public error: number;
        public static create(properties?: protocol.IResponseCheckOutAndLeave): protocol.ResponseCheckOutAndLeave;
        public static encode(m: protocol.ResponseCheckOutAndLeave, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseCheckOutAndLeave, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseCheckOutAndLeave;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseCheckOutAndLeave;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseCheckOutAndLeave;
        public static toObject(m: protocol.ResponseCheckOutAndLeave, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCheckOutAndLeave {
        roomid?: (number|null);
        targetid?: (number|null);
        name?: (string|null);
    }

    class NoticeCheckOutAndLeave implements INoticeCheckOutAndLeave {
        constructor(p?: protocol.INoticeCheckOutAndLeave);
        public roomid: number;
        public targetid: number;
        public name: string;
        public static create(properties?: protocol.INoticeCheckOutAndLeave): protocol.NoticeCheckOutAndLeave;
        public static encode(m: protocol.NoticeCheckOutAndLeave, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeCheckOutAndLeave, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeCheckOutAndLeave;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeCheckOutAndLeave;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeCheckOutAndLeave;
        public static toObject(m: protocol.NoticeCheckOutAndLeave, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestDefaultFold {
        roomid?: (number|null);
        type?: (number|null);
    }

    class RequestDefaultFold implements IRequestDefaultFold {
        constructor(p?: protocol.IRequestDefaultFold);
        public roomid: number;
        public type: number;
        public static create(properties?: protocol.IRequestDefaultFold): protocol.RequestDefaultFold;
        public static encode(m: protocol.RequestDefaultFold, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestDefaultFold, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestDefaultFold;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestDefaultFold;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestDefaultFold;
        public static toObject(m: protocol.RequestDefaultFold, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseDefaultFold {
        error?: (number|null);
    }

    class ResponseDefaultFold implements IResponseDefaultFold {
        constructor(p?: protocol.IResponseDefaultFold);
        public error: number;
        public static create(properties?: protocol.IResponseDefaultFold): protocol.ResponseDefaultFold;
        public static encode(m: protocol.ResponseDefaultFold, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseDefaultFold, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseDefaultFold;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseDefaultFold;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseDefaultFold;
        public static toObject(m: protocol.ResponseDefaultFold, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestOwnerSetBuyinLimit {
        roomid?: (number|null);
        targetid?: (number|null);
        limit_amount?: (number|null);
    }

    class RequestOwnerSetBuyinLimit implements IRequestOwnerSetBuyinLimit {
        constructor(p?: protocol.IRequestOwnerSetBuyinLimit);
        public roomid: number;
        public targetid: number;
        public limit_amount: number;
        public static create(properties?: protocol.IRequestOwnerSetBuyinLimit): protocol.RequestOwnerSetBuyinLimit;
        public static encode(m: protocol.RequestOwnerSetBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestOwnerSetBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestOwnerSetBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestOwnerSetBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestOwnerSetBuyinLimit;
        public static toObject(m: protocol.RequestOwnerSetBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseOwnerSetBuyinLimit {
        error?: (number|null);
    }

    class ResponseOwnerSetBuyinLimit implements IResponseOwnerSetBuyinLimit {
        constructor(p?: protocol.IResponseOwnerSetBuyinLimit);
        public error: number;
        public static create(properties?: protocol.IResponseOwnerSetBuyinLimit): protocol.ResponseOwnerSetBuyinLimit;
        public static encode(m: protocol.ResponseOwnerSetBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseOwnerSetBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseOwnerSetBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseOwnerSetBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseOwnerSetBuyinLimit;
        public static toObject(m: protocol.ResponseOwnerSetBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeOwnerSetBuyinLimit {
        roomid?: (number|null);
        targetid?: (number|null);
        limit_amount?: (number|null);
    }

    class NoticeOwnerSetBuyinLimit implements INoticeOwnerSetBuyinLimit {
        constructor(p?: protocol.INoticeOwnerSetBuyinLimit);
        public roomid: number;
        public targetid: number;
        public limit_amount: number;
        public static create(properties?: protocol.INoticeOwnerSetBuyinLimit): protocol.NoticeOwnerSetBuyinLimit;
        public static encode(m: protocol.NoticeOwnerSetBuyinLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeOwnerSetBuyinLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeOwnerSetBuyinLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeOwnerSetBuyinLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeOwnerSetBuyinLimit;
        public static toObject(m: protocol.NoticeOwnerSetBuyinLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestPlayerBuyinsInfo {
        roomid?: (number|null);
    }

    class RequestPlayerBuyinsInfo implements IRequestPlayerBuyinsInfo {
        constructor(p?: protocol.IRequestPlayerBuyinsInfo);
        public roomid: number;
        public static create(properties?: protocol.IRequestPlayerBuyinsInfo): protocol.RequestPlayerBuyinsInfo;
        public static encode(m: protocol.RequestPlayerBuyinsInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestPlayerBuyinsInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestPlayerBuyinsInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestPlayerBuyinsInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestPlayerBuyinsInfo;
        public static toObject(m: protocol.RequestPlayerBuyinsInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponsePlayerBuyinsInfo {
        error?: (number|null);
    }

    class ResponsePlayerBuyinsInfo implements IResponsePlayerBuyinsInfo {
        constructor(p?: protocol.IResponsePlayerBuyinsInfo);
        public error: number;
        public static create(properties?: protocol.IResponsePlayerBuyinsInfo): protocol.ResponsePlayerBuyinsInfo;
        public static encode(m: protocol.ResponsePlayerBuyinsInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponsePlayerBuyinsInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponsePlayerBuyinsInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponsePlayerBuyinsInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponsePlayerBuyinsInfo;
        public static toObject(m: protocol.ResponsePlayerBuyinsInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePlayerBuyinsInfo {
        roomid?: (number|null);
        buyin_infos?: (protocol.PlayerBuyinInfo[]|null);
    }

    class NoticePlayerBuyinsInfo implements INoticePlayerBuyinsInfo {
        constructor(p?: protocol.INoticePlayerBuyinsInfo);
        public roomid: number;
        public buyin_infos: protocol.PlayerBuyinInfo[];
        public static create(properties?: protocol.INoticePlayerBuyinsInfo): protocol.NoticePlayerBuyinsInfo;
        public static encode(m: protocol.NoticePlayerBuyinsInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePlayerBuyinsInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePlayerBuyinsInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePlayerBuyinsInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePlayerBuyinsInfo;
        public static toObject(m: protocol.NoticePlayerBuyinsInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGameActionTurn {
        roomid?: (number|null);
        token?: (string|null);
    }

    class RequestGameActionTurn implements IRequestGameActionTurn {
        constructor(p?: protocol.IRequestGameActionTurn);
        public roomid: number;
        public token: string;
        public static create(properties?: protocol.IRequestGameActionTurn): protocol.RequestGameActionTurn;
        public static encode(m: protocol.RequestGameActionTurn, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestGameActionTurn, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestGameActionTurn;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestGameActionTurn;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestGameActionTurn;
        public static toObject(m: protocol.RequestGameActionTurn, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGameActionTurn {
        error?: (number|null);
    }

    class ResponseGameActionTurn implements IResponseGameActionTurn {
        constructor(p?: protocol.IResponseGameActionTurn);
        public error: number;
        public static create(properties?: protocol.IResponseGameActionTurn): protocol.ResponseGameActionTurn;
        public static encode(m: protocol.ResponseGameActionTurn, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseGameActionTurn, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseGameActionTurn;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseGameActionTurn;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseGameActionTurn;
        public static toObject(m: protocol.ResponseGameActionTurn, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestPhotoVerify {
        roomid?: (number|null);
        targetid?: (number|null);
    }

    class RequestPhotoVerify implements IRequestPhotoVerify {
        constructor(p?: protocol.IRequestPhotoVerify);
        public roomid: number;
        public targetid: number;
        public static create(properties?: protocol.IRequestPhotoVerify): protocol.RequestPhotoVerify;
        public static encode(m: protocol.RequestPhotoVerify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestPhotoVerify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestPhotoVerify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestPhotoVerify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestPhotoVerify;
        public static toObject(m: protocol.RequestPhotoVerify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponsePhotoVerify {
        error?: (number|null);
    }

    class ResponsePhotoVerify implements IResponsePhotoVerify {
        constructor(p?: protocol.IResponsePhotoVerify);
        public error: number;
        public static create(properties?: protocol.IResponsePhotoVerify): protocol.ResponsePhotoVerify;
        public static encode(m: protocol.ResponsePhotoVerify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponsePhotoVerify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponsePhotoVerify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponsePhotoVerify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponsePhotoVerify;
        public static toObject(m: protocol.ResponsePhotoVerify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticePhotoVerify {
        roomid?: (number|null);
        ownerid?: (number|null);
        targetid?: (number|null);
    }

    class NoticePhotoVerify implements INoticePhotoVerify {
        constructor(p?: protocol.INoticePhotoVerify);
        public roomid: number;
        public ownerid: number;
        public targetid: number;
        public static create(properties?: protocol.INoticePhotoVerify): protocol.NoticePhotoVerify;
        public static encode(m: protocol.NoticePhotoVerify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticePhotoVerify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticePhotoVerify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticePhotoVerify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticePhotoVerify;
        public static toObject(m: protocol.NoticePhotoVerify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestUploadVerifyPhotoSucc {
        roomid?: (number|null);
        url?: (string|null);
    }

    class RequestUploadVerifyPhotoSucc implements IRequestUploadVerifyPhotoSucc {
        constructor(p?: protocol.IRequestUploadVerifyPhotoSucc);
        public roomid: number;
        public url: string;
        public static create(properties?: protocol.IRequestUploadVerifyPhotoSucc): protocol.RequestUploadVerifyPhotoSucc;
        public static encode(m: protocol.RequestUploadVerifyPhotoSucc, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestUploadVerifyPhotoSucc, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestUploadVerifyPhotoSucc;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestUploadVerifyPhotoSucc;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestUploadVerifyPhotoSucc;
        public static toObject(m: protocol.RequestUploadVerifyPhotoSucc, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseUploadVerifyPhotoSucc {
        error?: (number|null);
    }

    class ResponseUploadVerifyPhotoSucc implements IResponseUploadVerifyPhotoSucc {
        constructor(p?: protocol.IResponseUploadVerifyPhotoSucc);
        public error: number;
        public static create(properties?: protocol.IResponseUploadVerifyPhotoSucc): protocol.ResponseUploadVerifyPhotoSucc;
        public static encode(m: protocol.ResponseUploadVerifyPhotoSucc, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseUploadVerifyPhotoSucc, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseUploadVerifyPhotoSucc;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseUploadVerifyPhotoSucc;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseUploadVerifyPhotoSucc;
        public static toObject(m: protocol.ResponseUploadVerifyPhotoSucc, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeUploadVerifyPhotoSucc {
        roomid?: (number|null);
        targetid?: (number|null);
        url?: (string|null);
    }

    class NoticeUploadVerifyPhotoSucc implements INoticeUploadVerifyPhotoSucc {
        constructor(p?: protocol.INoticeUploadVerifyPhotoSucc);
        public roomid: number;
        public targetid: number;
        public url: string;
        public static create(properties?: protocol.INoticeUploadVerifyPhotoSucc): protocol.NoticeUploadVerifyPhotoSucc;
        public static encode(m: protocol.NoticeUploadVerifyPhotoSucc, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeUploadVerifyPhotoSucc, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeUploadVerifyPhotoSucc;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeUploadVerifyPhotoSucc;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeUploadVerifyPhotoSucc;
        public static toObject(m: protocol.NoticeUploadVerifyPhotoSucc, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum CastMsgType {
        CastMsgTypeNone = 0,
        CastMsgTypeCloseStar = 1
    }

    interface INoticeGlobalMessage {
        repeat_count?: (number|null);
        msg?: (string|null);
        cast_msg_type?: (number|null);
    }

    class NoticeGlobalMessage implements INoticeGlobalMessage {
        constructor(p?: protocol.INoticeGlobalMessage);
        public repeat_count: number;
        public msg: string;
        public cast_msg_type: number;
        public static create(properties?: protocol.INoticeGlobalMessage): protocol.NoticeGlobalMessage;
        public static encode(m: protocol.NoticeGlobalMessage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGlobalMessage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGlobalMessage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGlobalMessage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGlobalMessage;
        public static toObject(m: protocol.NoticeGlobalMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeFairGame {
        playerid?: (number|null);
        playername?: (string|null);
        playerid2?: (number|null);
        playername2?: (string|null);
        ip?: (boolean|null);
        gps?: (boolean|null);
        roomid?: (number|null);
        roomname?: (string|null);
    }

    class NoticeFairGame implements INoticeFairGame {
        constructor(p?: protocol.INoticeFairGame);
        public playerid: number;
        public playername: string;
        public playerid2: number;
        public playername2: string;
        public ip: boolean;
        public gps: boolean;
        public roomid: number;
        public roomname: string;
        public static create(properties?: protocol.INoticeFairGame): protocol.NoticeFairGame;
        public static encode(m: protocol.NoticeFairGame, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeFairGame, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeFairGame;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeFairGame;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeFairGame;
        public static toObject(m: protocol.NoticeFairGame, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCheckVpn {
        playerid?: (number|null);
        playername?: (string|null);
    }

    class NoticeCheckVpn implements INoticeCheckVpn {
        constructor(p?: protocol.INoticeCheckVpn);
        public playerid: number;
        public playername: string;
        public static create(properties?: protocol.INoticeCheckVpn): protocol.NoticeCheckVpn;
        public static encode(m: protocol.NoticeCheckVpn, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeCheckVpn, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeCheckVpn;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeCheckVpn;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeCheckVpn;
        public static toObject(m: protocol.NoticeCheckVpn, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCheckAllianceRoomPriviledge {
        playerid?: (number|null);
    }

    class RequestCheckAllianceRoomPriviledge implements IRequestCheckAllianceRoomPriviledge {
        constructor(p?: protocol.IRequestCheckAllianceRoomPriviledge);
        public playerid: number;
        public static create(properties?: protocol.IRequestCheckAllianceRoomPriviledge): protocol.RequestCheckAllianceRoomPriviledge;
        public static encode(m: protocol.RequestCheckAllianceRoomPriviledge, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestCheckAllianceRoomPriviledge, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestCheckAllianceRoomPriviledge;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestCheckAllianceRoomPriviledge;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestCheckAllianceRoomPriviledge;
        public static toObject(m: protocol.RequestCheckAllianceRoomPriviledge, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCheckAllianceRoomPriviledge {
        error?: (number|null);
    }

    class ResponseCheckAllianceRoomPriviledge implements IResponseCheckAllianceRoomPriviledge {
        constructor(p?: protocol.IResponseCheckAllianceRoomPriviledge);
        public error: number;
        public static create(properties?: protocol.IResponseCheckAllianceRoomPriviledge): protocol.ResponseCheckAllianceRoomPriviledge;
        public static encode(m: protocol.ResponseCheckAllianceRoomPriviledge, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseCheckAllianceRoomPriviledge, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseCheckAllianceRoomPriviledge;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseCheckAllianceRoomPriviledge;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseCheckAllianceRoomPriviledge;
        public static toObject(m: protocol.ResponseCheckAllianceRoomPriviledge, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestForceShowCard {
        roomid?: (number|null);
    }

    class RequestForceShowCard implements IRequestForceShowCard {
        constructor(p?: protocol.IRequestForceShowCard);
        public roomid: number;
        public static create(properties?: protocol.IRequestForceShowCard): protocol.RequestForceShowCard;
        public static encode(m: protocol.RequestForceShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestForceShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestForceShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestForceShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestForceShowCard;
        public static toObject(m: protocol.RequestForceShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseForceShowCard {
        error?: (number|null);
    }

    class ResponseForceShowCard implements IResponseForceShowCard {
        constructor(p?: protocol.IResponseForceShowCard);
        public error: number;
        public static create(properties?: protocol.IResponseForceShowCard): protocol.ResponseForceShowCard;
        public static encode(m: protocol.ResponseForceShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseForceShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseForceShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseForceShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseForceShowCard;
        public static toObject(m: protocol.ResponseForceShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeForceShowCard {
        roomid?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
        show_seats?: (protocol.ShowCardsSeatInfo[]|null);
        count?: (number|null);
    }

    class NoticeForceShowCard implements INoticeForceShowCard {
        constructor(p?: protocol.INoticeForceShowCard);
        public roomid: number;
        public playerid: number;
        public playername: string;
        public show_seats: protocol.ShowCardsSeatInfo[];
        public count: number;
        public static create(properties?: protocol.INoticeForceShowCard): protocol.NoticeForceShowCard;
        public static encode(m: protocol.NoticeForceShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeForceShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeForceShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeForceShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeForceShowCard;
        public static toObject(m: protocol.NoticeForceShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeAddRoomTimeLeft {
        roomid?: (number|null);
        leftcount?: (number|null);
    }

    class NoticeAddRoomTimeLeft implements INoticeAddRoomTimeLeft {
        constructor(p?: protocol.INoticeAddRoomTimeLeft);
        public roomid: number;
        public leftcount: number;
        public static create(properties?: protocol.INoticeAddRoomTimeLeft): protocol.NoticeAddRoomTimeLeft;
        public static encode(m: protocol.NoticeAddRoomTimeLeft, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeAddRoomTimeLeft, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeAddRoomTimeLeft;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeAddRoomTimeLeft;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeAddRoomTimeLeft;
        public static toObject(m: protocol.NoticeAddRoomTimeLeft, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAddRoomTimeCount {
        roomid?: (number|null);
    }

    class RequestAddRoomTimeCount implements IRequestAddRoomTimeCount {
        constructor(p?: protocol.IRequestAddRoomTimeCount);
        public roomid: number;
        public static create(properties?: protocol.IRequestAddRoomTimeCount): protocol.RequestAddRoomTimeCount;
        public static encode(m: protocol.RequestAddRoomTimeCount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAddRoomTimeCount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAddRoomTimeCount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAddRoomTimeCount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAddRoomTimeCount;
        public static toObject(m: protocol.RequestAddRoomTimeCount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAddRoomTimeCount {
        error?: (number|null);
    }

    class ResponseAddRoomTimeCount implements IResponseAddRoomTimeCount {
        constructor(p?: protocol.IResponseAddRoomTimeCount);
        public error: number;
        public static create(properties?: protocol.IResponseAddRoomTimeCount): protocol.ResponseAddRoomTimeCount;
        public static encode(m: protocol.ResponseAddRoomTimeCount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAddRoomTimeCount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAddRoomTimeCount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAddRoomTimeCount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAddRoomTimeCount;
        public static toObject(m: protocol.ResponseAddRoomTimeCount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeRoomDisMiss {
        uid?: (number|null);
        club_id?: (number|null);
        club_name?: (string|null);
        room_id?: (number|null);
        room_name?: (string|null);
        left_time?: (number|null);
        cur_time?: (number|null);
        msg_type?: (number|null);
    }

    class NoticeRoomDisMiss implements INoticeRoomDisMiss {
        constructor(p?: protocol.INoticeRoomDisMiss);
        public uid: number;
        public club_id: number;
        public club_name: string;
        public room_id: number;
        public room_name: string;
        public left_time: number;
        public cur_time: number;
        public msg_type: number;
        public static create(properties?: protocol.INoticeRoomDisMiss): protocol.NoticeRoomDisMiss;
        public static encode(m: protocol.NoticeRoomDisMiss, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeRoomDisMiss, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeRoomDisMiss;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeRoomDisMiss;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeRoomDisMiss;
        public static toObject(m: protocol.NoticeRoomDisMiss, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestJoinRoomWithPassword {
        roomid?: (number|null);
        join_password?: (string|null);
    }

    class RequestJoinRoomWithPassword implements IRequestJoinRoomWithPassword {
        constructor(p?: protocol.IRequestJoinRoomWithPassword);
        public roomid: number;
        public join_password: string;
        public static create(properties?: protocol.IRequestJoinRoomWithPassword): protocol.RequestJoinRoomWithPassword;
        public static encode(m: protocol.RequestJoinRoomWithPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestJoinRoomWithPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestJoinRoomWithPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestJoinRoomWithPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestJoinRoomWithPassword;
        public static toObject(m: protocol.RequestJoinRoomWithPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseJoinRoomWithPassword {
        error?: (number|null);
        roomid?: (number|null);
    }

    class ResponseJoinRoomWithPassword implements IResponseJoinRoomWithPassword {
        constructor(p?: protocol.IResponseJoinRoomWithPassword);
        public error: number;
        public roomid: number;
        public static create(properties?: protocol.IResponseJoinRoomWithPassword): protocol.ResponseJoinRoomWithPassword;
        public static encode(m: protocol.ResponseJoinRoomWithPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseJoinRoomWithPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseJoinRoomWithPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseJoinRoomWithPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseJoinRoomWithPassword;
        public static toObject(m: protocol.ResponseJoinRoomWithPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCheckBuyinPassword {
        roomid?: (number|null);
        buyin_password?: (string|null);
    }

    class RequestCheckBuyinPassword implements IRequestCheckBuyinPassword {
        constructor(p?: protocol.IRequestCheckBuyinPassword);
        public roomid: number;
        public buyin_password: string;
        public static create(properties?: protocol.IRequestCheckBuyinPassword): protocol.RequestCheckBuyinPassword;
        public static encode(m: protocol.RequestCheckBuyinPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestCheckBuyinPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestCheckBuyinPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestCheckBuyinPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestCheckBuyinPassword;
        public static toObject(m: protocol.RequestCheckBuyinPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCheckBuyinPassword {
        error?: (number|null);
        roomid?: (number|null);
    }

    class ResponseCheckBuyinPassword implements IResponseCheckBuyinPassword {
        constructor(p?: protocol.IResponseCheckBuyinPassword);
        public error: number;
        public roomid: number;
        public static create(properties?: protocol.IResponseCheckBuyinPassword): protocol.ResponseCheckBuyinPassword;
        public static encode(m: protocol.ResponseCheckBuyinPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseCheckBuyinPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseCheckBuyinPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseCheckBuyinPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseCheckBuyinPassword;
        public static toObject(m: protocol.ResponseCheckBuyinPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCheckFirstTimeJoinRoomWithPassword {
        roomid?: (number|null);
    }

    class RequestCheckFirstTimeJoinRoomWithPassword implements IRequestCheckFirstTimeJoinRoomWithPassword {
        constructor(p?: protocol.IRequestCheckFirstTimeJoinRoomWithPassword);
        public roomid: number;
        public static create(properties?: protocol.IRequestCheckFirstTimeJoinRoomWithPassword): protocol.RequestCheckFirstTimeJoinRoomWithPassword;
        public static encode(m: protocol.RequestCheckFirstTimeJoinRoomWithPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestCheckFirstTimeJoinRoomWithPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestCheckFirstTimeJoinRoomWithPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestCheckFirstTimeJoinRoomWithPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestCheckFirstTimeJoinRoomWithPassword;
        public static toObject(m: protocol.RequestCheckFirstTimeJoinRoomWithPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCheckFirstTimeJoinRoomWithPassword {
        error?: (number|null);
        roomid?: (number|null);
        isfirst?: (boolean|null);
    }

    class ResponseCheckFirstTimeJoinRoomWithPassword implements IResponseCheckFirstTimeJoinRoomWithPassword {
        constructor(p?: protocol.IResponseCheckFirstTimeJoinRoomWithPassword);
        public error: number;
        public roomid: number;
        public isfirst: boolean;
        public static create(properties?: protocol.IResponseCheckFirstTimeJoinRoomWithPassword): protocol.ResponseCheckFirstTimeJoinRoomWithPassword;
        public static encode(m: protocol.ResponseCheckFirstTimeJoinRoomWithPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseCheckFirstTimeJoinRoomWithPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseCheckFirstTimeJoinRoomWithPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseCheckFirstTimeJoinRoomWithPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseCheckFirstTimeJoinRoomWithPassword;
        public static toObject(m: protocol.ResponseCheckFirstTimeJoinRoomWithPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestCheckFirstTimeBuyinWithPassword {
        roomid?: (number|null);
    }

    class RequestCheckFirstTimeBuyinWithPassword implements IRequestCheckFirstTimeBuyinWithPassword {
        constructor(p?: protocol.IRequestCheckFirstTimeBuyinWithPassword);
        public roomid: number;
        public static create(properties?: protocol.IRequestCheckFirstTimeBuyinWithPassword): protocol.RequestCheckFirstTimeBuyinWithPassword;
        public static encode(m: protocol.RequestCheckFirstTimeBuyinWithPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestCheckFirstTimeBuyinWithPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestCheckFirstTimeBuyinWithPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestCheckFirstTimeBuyinWithPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestCheckFirstTimeBuyinWithPassword;
        public static toObject(m: protocol.RequestCheckFirstTimeBuyinWithPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseCheckFirstTimeBuyinWithPassword {
        error?: (number|null);
        roomid?: (number|null);
        isfirst?: (boolean|null);
    }

    class ResponseCheckFirstTimeBuyinWithPassword implements IResponseCheckFirstTimeBuyinWithPassword {
        constructor(p?: protocol.IResponseCheckFirstTimeBuyinWithPassword);
        public error: number;
        public roomid: number;
        public isfirst: boolean;
        public static create(properties?: protocol.IResponseCheckFirstTimeBuyinWithPassword): protocol.ResponseCheckFirstTimeBuyinWithPassword;
        public static encode(m: protocol.ResponseCheckFirstTimeBuyinWithPassword, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseCheckFirstTimeBuyinWithPassword, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseCheckFirstTimeBuyinWithPassword;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseCheckFirstTimeBuyinWithPassword;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseCheckFirstTimeBuyinWithPassword;
        public static toObject(m: protocol.ResponseCheckFirstTimeBuyinWithPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAutoCompleteChips {
        PlayerID?: (number|null);
        RoomID?: (number|null);
        Enable?: (number|null);
    }

    class RequestAutoCompleteChips implements IRequestAutoCompleteChips {
        constructor(p?: protocol.IRequestAutoCompleteChips);
        public PlayerID: number;
        public RoomID: number;
        public Enable: number;
        public static create(properties?: protocol.IRequestAutoCompleteChips): protocol.RequestAutoCompleteChips;
        public static encode(m: protocol.RequestAutoCompleteChips, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAutoCompleteChips, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAutoCompleteChips;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAutoCompleteChips;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAutoCompleteChips;
        public static toObject(m: protocol.RequestAutoCompleteChips, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAutoCompleteChips {
        error?: (number|null);
        Enable?: (number|null);
    }

    class ResponseAutoCompleteChips implements IResponseAutoCompleteChips {
        constructor(p?: protocol.IResponseAutoCompleteChips);
        public error: number;
        public Enable: number;
        public static create(properties?: protocol.IResponseAutoCompleteChips): protocol.ResponseAutoCompleteChips;
        public static encode(m: protocol.ResponseAutoCompleteChips, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAutoCompleteChips, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAutoCompleteChips;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAutoCompleteChips;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAutoCompleteChips;
        public static toObject(m: protocol.ResponseAutoCompleteChips, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotiPlayerHoleCard {
        holdcards?: (protocol.CardItem[]|null);
    }

    class NotiPlayerHoleCard implements INotiPlayerHoleCard {
        constructor(p?: protocol.INotiPlayerHoleCard);
        public holdcards: protocol.CardItem[];
        public static create(properties?: protocol.INotiPlayerHoleCard): protocol.NotiPlayerHoleCard;
        public static encode(m: protocol.NotiPlayerHoleCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NotiPlayerHoleCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NotiPlayerHoleCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NotiPlayerHoleCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NotiPlayerHoleCard;
        public static toObject(m: protocol.NotiPlayerHoleCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestQuickLeave {
        RoomID?: (number|null);
    }

    class RequestQuickLeave implements IRequestQuickLeave {
        constructor(p?: protocol.IRequestQuickLeave);
        public RoomID: number;
        public static create(properties?: protocol.IRequestQuickLeave): protocol.RequestQuickLeave;
        public static encode(m: protocol.RequestQuickLeave, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestQuickLeave, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestQuickLeave;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestQuickLeave;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestQuickLeave;
        public static toObject(m: protocol.RequestQuickLeave, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseQuickLeave {
        Error?: (number|null);
    }

    class ResponseQuickLeave implements IResponseQuickLeave {
        constructor(p?: protocol.IResponseQuickLeave);
        public Error: number;
        public static create(properties?: protocol.IResponseQuickLeave): protocol.ResponseQuickLeave;
        public static encode(m: protocol.ResponseQuickLeave, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseQuickLeave, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseQuickLeave;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseQuickLeave;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseQuickLeave;
        public static toObject(m: protocol.ResponseQuickLeave, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotiQuickLeave {
        RoomID?: (number|null);
        RoomName?: (string|null);
        PlayerID?: (number|null);
        Name?: (string|null);
        CurrStake?: (number|null);
        SettleStake?: (number|null);
        InGameTime?: (number|null);
        HandCount?: (number|null);
    }

    class NotiQuickLeave implements INotiQuickLeave {
        constructor(p?: protocol.INotiQuickLeave);
        public RoomID: number;
        public RoomName: string;
        public PlayerID: number;
        public Name: string;
        public CurrStake: number;
        public SettleStake: number;
        public InGameTime: number;
        public HandCount: number;
        public static create(properties?: protocol.INotiQuickLeave): protocol.NotiQuickLeave;
        public static encode(m: protocol.NotiQuickLeave, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NotiQuickLeave, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NotiQuickLeave;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NotiQuickLeave;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NotiQuickLeave;
        public static toObject(m: protocol.NotiQuickLeave, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestQuickFold {
        RoomID?: (number|null);
        CheckBet?: (boolean|null);
        keepEnd?: (number|null);
    }

    class RequestQuickFold implements IRequestQuickFold {
        constructor(p?: protocol.IRequestQuickFold);
        public RoomID: number;
        public CheckBet: boolean;
        public keepEnd: number;
        public static create(properties?: protocol.IRequestQuickFold): protocol.RequestQuickFold;
        public static encode(m: protocol.RequestQuickFold, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestQuickFold, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestQuickFold;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestQuickFold;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestQuickFold;
        public static toObject(m: protocol.RequestQuickFold, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseQuickFold {
        Error?: (number|null);
        keepEnd?: (number|null);
    }

    class ResponseQuickFold implements IResponseQuickFold {
        constructor(p?: protocol.IResponseQuickFold);
        public Error: number;
        public keepEnd: number;
        public static create(properties?: protocol.IResponseQuickFold): protocol.ResponseQuickFold;
        public static encode(m: protocol.ResponseQuickFold, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseQuickFold, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseQuickFold;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseQuickFold;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseQuickFold;
        public static toObject(m: protocol.ResponseQuickFold, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotifyLastRoundWin {
        amount?: (number|null);
    }

    class NotifyLastRoundWin implements INotifyLastRoundWin {
        constructor(p?: protocol.INotifyLastRoundWin);
        public amount: number;
        public static create(properties?: protocol.INotifyLastRoundWin): protocol.NotifyLastRoundWin;
        public static encode(m: protocol.NotifyLastRoundWin, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NotifyLastRoundWin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NotifyLastRoundWin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NotifyLastRoundWin;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NotifyLastRoundWin;
        public static toObject(m: protocol.NotifyLastRoundWin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetGameUUIdsJs {
    }

    class RequestGetGameUUIdsJs implements IRequestGetGameUUIdsJs {
        constructor(p?: protocol.IRequestGetGameUUIdsJs);
        public static create(properties?: protocol.IRequestGetGameUUIdsJs): protocol.RequestGetGameUUIdsJs;
        public static encode(m: protocol.RequestGetGameUUIdsJs, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestGetGameUUIdsJs, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestGetGameUUIdsJs;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestGetGameUUIdsJs;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestGetGameUUIdsJs;
        public static toObject(m: protocol.RequestGetGameUUIdsJs, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetGameUUIdsJs {
        Error?: (number|null);
    }

    class ResponseGetGameUUIdsJs implements IResponseGetGameUUIdsJs {
        constructor(p?: protocol.IResponseGetGameUUIdsJs);
        public Error: number;
        public static create(properties?: protocol.IResponseGetGameUUIdsJs): protocol.ResponseGetGameUUIdsJs;
        public static encode(m: protocol.ResponseGetGameUUIdsJs, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseGetGameUUIdsJs, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseGetGameUUIdsJs;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseGetGameUUIdsJs;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseGetGameUUIdsJs;
        public static toObject(m: protocol.ResponseGetGameUUIdsJs, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGetGameUUIdsJs {
        list?: (protocol.JsStringGameUUid[]|null);
        total?: (number|null);
        page?: (number|null);
    }

    class NoticeGetGameUUIdsJs implements INoticeGetGameUUIdsJs {
        constructor(p?: protocol.INoticeGetGameUUIdsJs);
        public list: protocol.JsStringGameUUid[];
        public total: number;
        public page: number;
        public static create(properties?: protocol.INoticeGetGameUUIdsJs): protocol.NoticeGetGameUUIdsJs;
        public static encode(m: protocol.NoticeGetGameUUIdsJs, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGetGameUUIdsJs, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGetGameUUIdsJs;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGetGameUUIdsJs;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGetGameUUIdsJs;
        public static toObject(m: protocol.NoticeGetGameUUIdsJs, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestGetRoomLimitId {
        roomid?: (number|null);
        mo_player?: (boolean|null);
    }

    class RequestGetRoomLimitId implements IRequestGetRoomLimitId {
        constructor(p?: protocol.IRequestGetRoomLimitId);
        public roomid: number;
        public mo_player: boolean;
        public static create(properties?: protocol.IRequestGetRoomLimitId): protocol.RequestGetRoomLimitId;
        public static encode(m: protocol.RequestGetRoomLimitId, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestGetRoomLimitId, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestGetRoomLimitId;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestGetRoomLimitId;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestGetRoomLimitId;
        public static toObject(m: protocol.RequestGetRoomLimitId, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseGetRoomLimitId {
        Error?: (number|null);
        roomid?: (number|null);
    }

    class ResponseGetRoomLimitId implements IResponseGetRoomLimitId {
        constructor(p?: protocol.IResponseGetRoomLimitId);
        public Error: number;
        public roomid: number;
        public static create(properties?: protocol.IResponseGetRoomLimitId): protocol.ResponseGetRoomLimitId;
        public static encode(m: protocol.ResponseGetRoomLimitId, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseGetRoomLimitId, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseGetRoomLimitId;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseGetRoomLimitId;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseGetRoomLimitId;
        public static toObject(m: protocol.ResponseGetRoomLimitId, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeCritisicmStart {
        roomid?: (number|null);
    }

    class NoticeCritisicmStart implements INoticeCritisicmStart {
        constructor(p?: protocol.INoticeCritisicmStart);
        public roomid: number;
        public static create(properties?: protocol.INoticeCritisicmStart): protocol.NoticeCritisicmStart;
        public static encode(m: protocol.NoticeCritisicmStart, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeCritisicmStart, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeCritisicmStart;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeCritisicmStart;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeCritisicmStart;
        public static toObject(m: protocol.NoticeCritisicmStart, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeNotEnougnMoney2Crit {
        roomid?: (number|null);
        playerid?: (number|null);
    }

    class NoticeNotEnougnMoney2Crit implements INoticeNotEnougnMoney2Crit {
        constructor(p?: protocol.INoticeNotEnougnMoney2Crit);
        public roomid: number;
        public playerid: number;
        public static create(properties?: protocol.INoticeNotEnougnMoney2Crit): protocol.NoticeNotEnougnMoney2Crit;
        public static encode(m: protocol.NoticeNotEnougnMoney2Crit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeNotEnougnMoney2Crit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeNotEnougnMoney2Crit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeNotEnougnMoney2Crit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeNotEnougnMoney2Crit;
        public static toObject(m: protocol.NoticeNotEnougnMoney2Crit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum HandCardResult {
        Enum_None = 0,
        Enum_PairAndAA = 1,
        Enum_Pair = 2,
        Enum_High_A = 3,
        Enum_High_AorK = 4,
        Enum_High_None_AorK = 5
    }

    interface IGuessOdds {
        option?: (number|null);
        odds_percent?: (number|null);
    }

    class GuessOdds implements IGuessOdds {
        constructor(p?: protocol.IGuessOdds);
        public option: number;
        public odds_percent: number;
        public static create(properties?: protocol.IGuessOdds): protocol.GuessOdds;
        public static encode(m: protocol.GuessOdds, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GuessOdds, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GuessOdds;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GuessOdds;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GuessOdds;
        public static toObject(m: protocol.GuessOdds, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeGuessBeginBet {
        list?: (protocol.GuessOdds[]|null);
        bet_seqno?: (number|null);
        betamout_opt?: (number[]|null);
    }

    class NoticeGuessBeginBet implements INoticeGuessBeginBet {
        constructor(p?: protocol.INoticeGuessBeginBet);
        public list: protocol.GuessOdds[];
        public bet_seqno: number;
        public betamout_opt: number[];
        public static create(properties?: protocol.INoticeGuessBeginBet): protocol.NoticeGuessBeginBet;
        public static encode(m: protocol.NoticeGuessBeginBet, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeGuessBeginBet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeGuessBeginBet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeGuessBeginBet;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeGuessBeginBet;
        public static toObject(m: protocol.NoticeGuessBeginBet, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGuessBetReq {
        option?: (number|null);
        amonut?: (number|null);
        bet_seqno?: (number|null);
    }

    class GuessBetReq implements IGuessBetReq {
        constructor(p?: protocol.IGuessBetReq);
        public option: number;
        public amonut: number;
        public bet_seqno: number;
        public static create(properties?: protocol.IGuessBetReq): protocol.GuessBetReq;
        public static encode(m: protocol.GuessBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GuessBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GuessBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GuessBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GuessBetReq;
        public static toObject(m: protocol.GuessBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGuessBetRsp {
        Error?: (number|null);
        amount?: (number|null);
        odds?: (protocol.GuessOdds|null);
        repeat?: (boolean|null);
        change_points?: (number|null);
        left_time?: (number|null);
    }

    class GuessBetRsp implements IGuessBetRsp {
        constructor(p?: protocol.IGuessBetRsp);
        public Error: number;
        public amount: number;
        public odds?: (protocol.GuessOdds|null);
        public repeat: boolean;
        public change_points: number;
        public left_time: number;
        public static create(properties?: protocol.IGuessBetRsp): protocol.GuessBetRsp;
        public static encode(m: protocol.GuessBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GuessBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GuessBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GuessBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GuessBetRsp;
        public static toObject(m: protocol.GuessBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGuessSetBetOptReq {
        repeat?: (boolean|null);
    }

    class GuessSetBetOptReq implements IGuessSetBetOptReq {
        constructor(p?: protocol.IGuessSetBetOptReq);
        public repeat: boolean;
        public static create(properties?: protocol.IGuessSetBetOptReq): protocol.GuessSetBetOptReq;
        public static encode(m: protocol.GuessSetBetOptReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GuessSetBetOptReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GuessSetBetOptReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GuessSetBetOptReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GuessSetBetOptReq;
        public static toObject(m: protocol.GuessSetBetOptReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGuessSetBetOptRsp {
        Error?: (number|null);
        repeat?: (boolean|null);
    }

    class GuessSetBetOptRsp implements IGuessSetBetOptRsp {
        constructor(p?: protocol.IGuessSetBetOptRsp);
        public Error: number;
        public repeat: boolean;
        public static create(properties?: protocol.IGuessSetBetOptRsp): protocol.GuessSetBetOptRsp;
        public static encode(m: protocol.GuessSetBetOptRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GuessSetBetOptRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GuessSetBetOptRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GuessSetBetOptRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GuessSetBetOptRsp;
        public static toObject(m: protocol.GuessSetBetOptRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGuessSettleNotice {
        win_amount?: (number|null);
        is_return_back?: (boolean|null);
    }

    class GuessSettleNotice implements IGuessSettleNotice {
        constructor(p?: protocol.IGuessSettleNotice);
        public win_amount: number;
        public is_return_back: boolean;
        public static create(properties?: protocol.IGuessSettleNotice): protocol.GuessSettleNotice;
        public static encode(m: protocol.GuessSettleNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GuessSettleNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GuessSettleNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GuessSettleNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GuessSettleNotice;
        public static toObject(m: protocol.GuessSettleNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestAutoWithdraw {
        is_open?: (boolean|null);
    }

    class RequestAutoWithdraw implements IRequestAutoWithdraw {
        constructor(p?: protocol.IRequestAutoWithdraw);
        public is_open: boolean;
        public static create(properties?: protocol.IRequestAutoWithdraw): protocol.RequestAutoWithdraw;
        public static encode(m: protocol.RequestAutoWithdraw, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestAutoWithdraw, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestAutoWithdraw;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestAutoWithdraw;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestAutoWithdraw;
        public static toObject(m: protocol.RequestAutoWithdraw, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseAutoWithdraw {
        Error?: (number|null);
        is_open?: (boolean|null);
    }

    class ResponseAutoWithdraw implements IResponseAutoWithdraw {
        constructor(p?: protocol.IResponseAutoWithdraw);
        public Error: number;
        public is_open: boolean;
        public static create(properties?: protocol.IResponseAutoWithdraw): protocol.ResponseAutoWithdraw;
        public static encode(m: protocol.ResponseAutoWithdraw, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseAutoWithdraw, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseAutoWithdraw;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseAutoWithdraw;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseAutoWithdraw;
        public static toObject(m: protocol.ResponseAutoWithdraw, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUploadGuessStateRequest {
        room_id?: (number|null);
        is_open_guess?: (boolean|null);
    }

    class UploadGuessStateRequest implements IUploadGuessStateRequest {
        constructor(p?: protocol.IUploadGuessStateRequest);
        public room_id: number;
        public is_open_guess: boolean;
        public static create(properties?: protocol.IUploadGuessStateRequest): protocol.UploadGuessStateRequest;
        public static encode(m: protocol.UploadGuessStateRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.UploadGuessStateRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.UploadGuessStateRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.UploadGuessStateRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.UploadGuessStateRequest;
        public static toObject(m: protocol.UploadGuessStateRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IShowCritPromptNotice {
        room_id?: (number|null);
    }

    class ShowCritPromptNotice implements IShowCritPromptNotice {
        constructor(p?: protocol.IShowCritPromptNotice);
        public room_id: number;
        public static create(properties?: protocol.IShowCritPromptNotice): protocol.ShowCritPromptNotice;
        public static encode(m: protocol.ShowCritPromptNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ShowCritPromptNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ShowCritPromptNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ShowCritPromptNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ShowCritPromptNotice;
        public static toObject(m: protocol.ShowCritPromptNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum BarrageType {
        Enum_System = 0,
        Enum_Custom = 1,
        Enum_Liked = 3,
        Enum_Tip = 4,
        Enum_PlayerEnters = 5
    }

    interface IRequestSendBarrage {
        roomid?: (number|null);
        ctype?: (protocol.BarrageType|null);
        content?: (string|null);
        at_list?: (string[]|null);
        thump_up_status?: (number|null);
        at_uid_list?: (number[]|null);
    }

    class RequestSendBarrage implements IRequestSendBarrage {
        constructor(p?: protocol.IRequestSendBarrage);
        public roomid: number;
        public ctype: protocol.BarrageType;
        public content: string;
        public at_list: string[];
        public thump_up_status: number;
        public at_uid_list: number[];
        public static create(properties?: protocol.IRequestSendBarrage): protocol.RequestSendBarrage;
        public static encode(m: protocol.RequestSendBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestSendBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestSendBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestSendBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestSendBarrage;
        public static toObject(m: protocol.RequestSendBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSendBarrage {
        error?: (number|null);
        barrageId?: (number|null);
        useCount?: (number|null);
        afterSecondsCanSend?: (number|null);
    }

    class ResponseSendBarrage implements IResponseSendBarrage {
        constructor(p?: protocol.IResponseSendBarrage);
        public error: number;
        public barrageId: number;
        public useCount: number;
        public afterSecondsCanSend: number;
        public static create(properties?: protocol.IResponseSendBarrage): protocol.ResponseSendBarrage;
        public static encode(m: protocol.ResponseSendBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseSendBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseSendBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseSendBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseSendBarrage;
        public static toObject(m: protocol.ResponseSendBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSendBarrage {
        roomid?: (number|null);
        ctype?: (protocol.BarrageType|null);
        content?: (string|null);
        playerid?: (number|null);
        nickname?: (string|null);
        avatar?: (string|null);
        send_time?: (number|null);
        at_list?: (string[]|null);
        thump_up_status?: (number|null);
        at_uid_list?: (number[]|null);
        liked_nickname?: (string|null);
        liked_playerid?: (number|null);
        liked_avatar?: (string|null);
        userTipInfo?: (protocol.UserTipInfo|null);
        playerEntersBarrage?: (protocol.PlayerEntersBarrage|null);
    }

    class NoticeSendBarrage implements INoticeSendBarrage {
        constructor(p?: protocol.INoticeSendBarrage);
        public roomid: number;
        public ctype: protocol.BarrageType;
        public content: string;
        public playerid: number;
        public nickname: string;
        public avatar: string;
        public send_time: number;
        public at_list: string[];
        public thump_up_status: number;
        public at_uid_list: number[];
        public liked_nickname: string;
        public liked_playerid: number;
        public liked_avatar: string;
        public userTipInfo?: (protocol.UserTipInfo|null);
        public playerEntersBarrage?: (protocol.PlayerEntersBarrage|null);
        public static create(properties?: protocol.INoticeSendBarrage): protocol.NoticeSendBarrage;
        public static encode(m: protocol.NoticeSendBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeSendBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeSendBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeSendBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeSendBarrage;
        public static toObject(m: protocol.NoticeSendBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerEntersBarrage {
        nickname?: (string|null);
    }

    class PlayerEntersBarrage implements IPlayerEntersBarrage {
        constructor(p?: protocol.IPlayerEntersBarrage);
        public nickname: string;
        public static create(properties?: protocol.IPlayerEntersBarrage): protocol.PlayerEntersBarrage;
        public static encode(m: protocol.PlayerEntersBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerEntersBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerEntersBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerEntersBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerEntersBarrage;
        public static toObject(m: protocol.PlayerEntersBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBarrageCountReq {
    }

    class BarrageCountReq implements IBarrageCountReq {
        constructor(p?: protocol.IBarrageCountReq);
        public static create(properties?: protocol.IBarrageCountReq): protocol.BarrageCountReq;
        public static encode(m: protocol.BarrageCountReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.BarrageCountReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.BarrageCountReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.BarrageCountReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.BarrageCountReq;
        public static toObject(m: protocol.BarrageCountReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBarrageCountRsp {
        error?: (number|null);
        Infos?: (protocol.BarrageCount[]|null);
    }

    class BarrageCountRsp implements IBarrageCountRsp {
        constructor(p?: protocol.IBarrageCountRsp);
        public error: number;
        public Infos: protocol.BarrageCount[];
        public static create(properties?: protocol.IBarrageCountRsp): protocol.BarrageCountRsp;
        public static encode(m: protocol.BarrageCountRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.BarrageCountRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.BarrageCountRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.BarrageCountRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.BarrageCountRsp;
        public static toObject(m: protocol.BarrageCountRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBarrageCount {
        BarrageId?: (number|null);
        UseCount?: (number|null);
    }

    class BarrageCount implements IBarrageCount {
        constructor(p?: protocol.IBarrageCount);
        public BarrageId: number;
        public UseCount: number;
        public static create(properties?: protocol.IBarrageCount): protocol.BarrageCount;
        public static encode(m: protocol.BarrageCount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.BarrageCount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.BarrageCount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.BarrageCount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.BarrageCount;
        public static toObject(m: protocol.BarrageCount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestReplayForceShowCard {
        roomid?: (number|null);
        game_uuid?: (string|null);
    }

    class RequestReplayForceShowCard implements IRequestReplayForceShowCard {
        constructor(p?: protocol.IRequestReplayForceShowCard);
        public roomid: number;
        public game_uuid: string;
        public static create(properties?: protocol.IRequestReplayForceShowCard): protocol.RequestReplayForceShowCard;
        public static encode(m: protocol.RequestReplayForceShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestReplayForceShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestReplayForceShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestReplayForceShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestReplayForceShowCard;
        public static toObject(m: protocol.RequestReplayForceShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseReplayForceShowCard {
        error?: (number|null);
    }

    class ResponseReplayForceShowCard implements IResponseReplayForceShowCard {
        constructor(p?: protocol.IResponseReplayForceShowCard);
        public error: number;
        public static create(properties?: protocol.IResponseReplayForceShowCard): protocol.ResponseReplayForceShowCard;
        public static encode(m: protocol.ResponseReplayForceShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseReplayForceShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseReplayForceShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseReplayForceShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseReplayForceShowCard;
        public static toObject(m: protocol.ResponseReplayForceShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeReplayForceShowCard {
        roomid?: (number|null);
        playerid?: (number|null);
        playername?: (string|null);
        show_seats?: (protocol.ShowCardsPlayerInfo[]|null);
        count?: (number|null);
    }

    class NoticeReplayForceShowCard implements INoticeReplayForceShowCard {
        constructor(p?: protocol.INoticeReplayForceShowCard);
        public roomid: number;
        public playerid: number;
        public playername: string;
        public show_seats: protocol.ShowCardsPlayerInfo[];
        public count: number;
        public static create(properties?: protocol.INoticeReplayForceShowCard): protocol.NoticeReplayForceShowCard;
        public static encode(m: protocol.NoticeReplayForceShowCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeReplayForceShowCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeReplayForceShowCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeReplayForceShowCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeReplayForceShowCard;
        public static toObject(m: protocol.NoticeReplayForceShowCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestReplaySendCard {
        roomid?: (number|null);
        game_uuid?: (string|null);
    }

    class RequestReplaySendCard implements IRequestReplaySendCard {
        constructor(p?: protocol.IRequestReplaySendCard);
        public roomid: number;
        public game_uuid: string;
        public static create(properties?: protocol.IRequestReplaySendCard): protocol.RequestReplaySendCard;
        public static encode(m: protocol.RequestReplaySendCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestReplaySendCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestReplaySendCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestReplaySendCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestReplaySendCard;
        public static toObject(m: protocol.RequestReplaySendCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseReplaySendCard {
        error?: (number|null);
    }

    class ResponseReplaySendCard implements IResponseReplaySendCard {
        constructor(p?: protocol.IResponseReplaySendCard);
        public error: number;
        public static create(properties?: protocol.IResponseReplaySendCard): protocol.ResponseReplaySendCard;
        public static encode(m: protocol.ResponseReplaySendCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseReplaySendCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseReplaySendCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseReplaySendCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseReplaySendCard;
        public static toObject(m: protocol.ResponseReplaySendCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeReplaySendCard {
        roomid?: (number|null);
        round_state?: (number|null);
        player_name?: (string|null);
        cards?: (protocol.CardItem[]|null);
        next_price?: (number|null);
        player_id?: (number|null);
    }

    class NoticeReplaySendCard implements INoticeReplaySendCard {
        constructor(p?: protocol.INoticeReplaySendCard);
        public roomid: number;
        public round_state: number;
        public player_name: string;
        public cards: protocol.CardItem[];
        public next_price: number;
        public player_id: number;
        public static create(properties?: protocol.INoticeReplaySendCard): protocol.NoticeReplaySendCard;
        public static encode(m: protocol.NoticeReplaySendCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeReplaySendCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeReplaySendCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeReplaySendCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeReplaySendCard;
        public static toObject(m: protocol.NoticeReplaySendCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestNotiGameUpdateThumb {
    }

    class RequestNotiGameUpdateThumb implements IRequestNotiGameUpdateThumb {
        constructor(p?: protocol.IRequestNotiGameUpdateThumb);
        public static create(properties?: protocol.IRequestNotiGameUpdateThumb): protocol.RequestNotiGameUpdateThumb;
        public static encode(m: protocol.RequestNotiGameUpdateThumb, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestNotiGameUpdateThumb, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestNotiGameUpdateThumb;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestNotiGameUpdateThumb;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestNotiGameUpdateThumb;
        public static toObject(m: protocol.RequestNotiGameUpdateThumb, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseNotiGameUpdateThumb {
        error?: (number|null);
    }

    class ResponseNotiGameUpdateThumb implements IResponseNotiGameUpdateThumb {
        constructor(p?: protocol.IResponseNotiGameUpdateThumb);
        public error: number;
        public static create(properties?: protocol.IResponseNotiGameUpdateThumb): protocol.ResponseNotiGameUpdateThumb;
        public static encode(m: protocol.ResponseNotiGameUpdateThumb, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseNotiGameUpdateThumb, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseNotiGameUpdateThumb;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseNotiGameUpdateThumb;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseNotiGameUpdateThumb;
        public static toObject(m: protocol.ResponseNotiGameUpdateThumb, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestChangeTable {
        roomid?: (number|null);
    }

    class RequestChangeTable implements IRequestChangeTable {
        constructor(p?: protocol.IRequestChangeTable);
        public roomid: number;
        public static create(properties?: protocol.IRequestChangeTable): protocol.RequestChangeTable;
        public static encode(m: protocol.RequestChangeTable, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestChangeTable, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestChangeTable;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestChangeTable;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestChangeTable;
        public static toObject(m: protocol.RequestChangeTable, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseChangeTable {
        error?: (number|null);
        newroomid?: (number|null);
    }

    class ResponseChangeTable implements IResponseChangeTable {
        constructor(p?: protocol.IResponseChangeTable);
        public error: number;
        public newroomid: number;
        public static create(properties?: protocol.IResponseChangeTable): protocol.ResponseChangeTable;
        public static encode(m: protocol.ResponseChangeTable, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseChangeTable, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseChangeTable;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseChangeTable;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseChangeTable;
        public static toObject(m: protocol.ResponseChangeTable, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotDisturbReq {
        operate?: (number|null);
        whoId?: (number|null);
    }

    class NotDisturbReq implements INotDisturbReq {
        constructor(p?: protocol.INotDisturbReq);
        public operate: number;
        public whoId: number;
        public static create(properties?: protocol.INotDisturbReq): protocol.NotDisturbReq;
        public static encode(m: protocol.NotDisturbReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NotDisturbReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NotDisturbReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NotDisturbReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NotDisturbReq;
        public static toObject(m: protocol.NotDisturbReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotDisturbRsp {
        error?: (number|null);
        operate?: (number|null);
        whoId?: (number|null);
    }

    class NotDisturbRsp implements INotDisturbRsp {
        constructor(p?: protocol.INotDisturbRsp);
        public error: number;
        public operate: number;
        public whoId: number;
        public static create(properties?: protocol.INotDisturbRsp): protocol.NotDisturbRsp;
        public static encode(m: protocol.NotDisturbRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NotDisturbRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NotDisturbRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NotDisturbRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NotDisturbRsp;
        public static toObject(m: protocol.NotDisturbRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOpenLiveReq {
        liveOp?: (number|null);
    }

    class OpenLiveReq implements IOpenLiveReq {
        constructor(p?: protocol.IOpenLiveReq);
        public liveOp: number;
        public static create(properties?: protocol.IOpenLiveReq): protocol.OpenLiveReq;
        public static encode(m: protocol.OpenLiveReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.OpenLiveReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.OpenLiveReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.OpenLiveReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.OpenLiveReq;
        public static toObject(m: protocol.OpenLiveReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOpenLiveRsp {
        error?: (number|null);
        liveStatus?: (number|null);
        uid?: (number|null);
    }

    class OpenLiveRsp implements IOpenLiveRsp {
        constructor(p?: protocol.IOpenLiveRsp);
        public error: number;
        public liveStatus: number;
        public uid: number;
        public static create(properties?: protocol.IOpenLiveRsp): protocol.OpenLiveRsp;
        public static encode(m: protocol.OpenLiveRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.OpenLiveRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.OpenLiveRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.OpenLiveRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.OpenLiveRsp;
        public static toObject(m: protocol.OpenLiveRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOpenMikeReq {
        mikeOp?: (number|null);
    }

    class OpenMikeReq implements IOpenMikeReq {
        constructor(p?: protocol.IOpenMikeReq);
        public mikeOp: number;
        public static create(properties?: protocol.IOpenMikeReq): protocol.OpenMikeReq;
        public static encode(m: protocol.OpenMikeReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.OpenMikeReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.OpenMikeReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.OpenMikeReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.OpenMikeReq;
        public static toObject(m: protocol.OpenMikeReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOpenMikeRsp {
        error?: (number|null);
        mikeStatus?: (number|null);
        uid?: (number|null);
    }

    class OpenMikeRsp implements IOpenMikeRsp {
        constructor(p?: protocol.IOpenMikeRsp);
        public error: number;
        public mikeStatus: number;
        public uid: number;
        public static create(properties?: protocol.IOpenMikeRsp): protocol.OpenMikeRsp;
        public static encode(m: protocol.OpenMikeRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.OpenMikeRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.OpenMikeRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.OpenMikeRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.OpenMikeRsp;
        public static toObject(m: protocol.OpenMikeRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICloseStarNotice {
        isClosedStar?: (boolean|null);
    }

    class CloseStarNotice implements ICloseStarNotice {
        constructor(p?: protocol.ICloseStarNotice);
        public isClosedStar: boolean;
        public static create(properties?: protocol.ICloseStarNotice): protocol.CloseStarNotice;
        public static encode(m: protocol.CloseStarNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.CloseStarNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.CloseStarNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.CloseStarNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.CloseStarNotice;
        public static toObject(m: protocol.CloseStarNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum FavoriteHandType {
        gaming = 0,
        history_record = 1
    }

    interface IRequestFavoriteHand {
        type?: (protocol.FavoriteHandType|null);
        game_uuid?: (string|null);
    }

    class RequestFavoriteHand implements IRequestFavoriteHand {
        constructor(p?: protocol.IRequestFavoriteHand);
        public type: protocol.FavoriteHandType;
        public game_uuid: string;
        public static create(properties?: protocol.IRequestFavoriteHand): protocol.RequestFavoriteHand;
        public static encode(m: protocol.RequestFavoriteHand, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestFavoriteHand, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestFavoriteHand;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestFavoriteHand;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestFavoriteHand;
        public static toObject(m: protocol.RequestFavoriteHand, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseFavoriteHand {
        error?: (number|null);
    }

    class ResponseFavoriteHand implements IResponseFavoriteHand {
        constructor(p?: protocol.IResponseFavoriteHand);
        public error: number;
        public static create(properties?: protocol.IResponseFavoriteHand): protocol.ResponseFavoriteHand;
        public static encode(m: protocol.ResponseFavoriteHand, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseFavoriteHand, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseFavoriteHand;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseFavoriteHand;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseFavoriteHand;
        public static toObject(m: protocol.ResponseFavoriteHand, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILikeRequest {
        likeUid?: (number|null);
    }

    class LikeRequest implements ILikeRequest {
        constructor(p?: protocol.ILikeRequest);
        public likeUid: number;
        public static create(properties?: protocol.ILikeRequest): protocol.LikeRequest;
        public static encode(m: protocol.LikeRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LikeRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LikeRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LikeRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LikeRequest;
        public static toObject(m: protocol.LikeRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILikeResponse {
        error?: (number|null);
        likeUid?: (number|null);
        likedCount?: (number|null);
    }

    class LikeResponse implements ILikeResponse {
        constructor(p?: protocol.ILikeResponse);
        public error: number;
        public likeUid: number;
        public likedCount: number;
        public static create(properties?: protocol.ILikeResponse): protocol.LikeResponse;
        public static encode(m: protocol.LikeResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LikeResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LikeResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LikeResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LikeResponse;
        public static toObject(m: protocol.LikeResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILikeNotice {
        playerid?: (number|null);
        nickname?: (string|null);
    }

    class LikeNotice implements ILikeNotice {
        constructor(p?: protocol.ILikeNotice);
        public playerid: number;
        public nickname: string;
        public static create(properties?: protocol.ILikeNotice): protocol.LikeNotice;
        public static encode(m: protocol.LikeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LikeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LikeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LikeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LikeNotice;
        public static toObject(m: protocol.LikeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGoodFriendJoinTableNotify {
        playerid?: (number|null);
        nickname?: (string|null);
        intimacy?: (number|null);
        seatid?: (number|null);
    }

    class GoodFriendJoinTableNotify implements IGoodFriendJoinTableNotify {
        constructor(p?: protocol.IGoodFriendJoinTableNotify);
        public playerid: number;
        public nickname: string;
        public intimacy: number;
        public seatid: number;
        public static create(properties?: protocol.IGoodFriendJoinTableNotify): protocol.GoodFriendJoinTableNotify;
        public static encode(m: protocol.GoodFriendJoinTableNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GoodFriendJoinTableNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GoodFriendJoinTableNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GoodFriendJoinTableNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GoodFriendJoinTableNotify;
        public static toObject(m: protocol.GoodFriendJoinTableNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum EmojiType {
        Attack = 0,
        Welcome = 1,
        InterActiveNormal = 2
    }

    interface IRequestIsEmojiFree {
        type?: (protocol.EmojiType|null);
    }

    class RequestIsEmojiFree implements IRequestIsEmojiFree {
        constructor(p?: protocol.IRequestIsEmojiFree);
        public type: protocol.EmojiType;
        public static create(properties?: protocol.IRequestIsEmojiFree): protocol.RequestIsEmojiFree;
        public static encode(m: protocol.RequestIsEmojiFree, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestIsEmojiFree, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestIsEmojiFree;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestIsEmojiFree;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestIsEmojiFree;
        public static toObject(m: protocol.RequestIsEmojiFree, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseIsEmojiFree {
        error?: (number|null);
    }

    class ResponseIsEmojiFree implements IResponseIsEmojiFree {
        constructor(p?: protocol.IResponseIsEmojiFree);
        public error: number;
        public static create(properties?: protocol.IResponseIsEmojiFree): protocol.ResponseIsEmojiFree;
        public static encode(m: protocol.ResponseIsEmojiFree, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseIsEmojiFree, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseIsEmojiFree;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseIsEmojiFree;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseIsEmojiFree;
        public static toObject(m: protocol.ResponseIsEmojiFree, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeIsEmojiFree {
        type?: (protocol.EmojiType|null);
        is_free?: (boolean|null);
    }

    class NoticeIsEmojiFree implements INoticeIsEmojiFree {
        constructor(p?: protocol.INoticeIsEmojiFree);
        public type: protocol.EmojiType;
        public is_free: boolean;
        public static create(properties?: protocol.INoticeIsEmojiFree): protocol.NoticeIsEmojiFree;
        public static encode(m: protocol.NoticeIsEmojiFree, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeIsEmojiFree, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeIsEmojiFree;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeIsEmojiFree;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeIsEmojiFree;
        public static toObject(m: protocol.NoticeIsEmojiFree, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeIntimacyUp {
        playerid?: (number|null);
        nickname?: (string|null);
        intimacy?: (number|null);
        way?: (number|null);
    }

    class NoticeIntimacyUp implements INoticeIntimacyUp {
        constructor(p?: protocol.INoticeIntimacyUp);
        public playerid: number;
        public nickname: string;
        public intimacy: number;
        public way: number;
        public static create(properties?: protocol.INoticeIntimacyUp): protocol.NoticeIntimacyUp;
        public static encode(m: protocol.NoticeIntimacyUp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeIntimacyUp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeIntimacyUp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeIntimacyUp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeIntimacyUp;
        public static toObject(m: protocol.NoticeIntimacyUp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMikeModeReq {
        Mode?: (number|null);
    }

    class MikeModeReq implements IMikeModeReq {
        constructor(p?: protocol.IMikeModeReq);
        public Mode: number;
        public static create(properties?: protocol.IMikeModeReq): protocol.MikeModeReq;
        public static encode(m: protocol.MikeModeReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.MikeModeReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.MikeModeReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.MikeModeReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.MikeModeReq;
        public static toObject(m: protocol.MikeModeReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMikeModeRsp {
        error?: (number|null);
        Mode?: (number|null);
    }

    class MikeModeRsp implements IMikeModeRsp {
        constructor(p?: protocol.IMikeModeRsp);
        public error: number;
        public Mode: number;
        public static create(properties?: protocol.IMikeModeRsp): protocol.MikeModeRsp;
        public static encode(m: protocol.MikeModeRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.MikeModeRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.MikeModeRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.MikeModeRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.MikeModeRsp;
        public static toObject(m: protocol.MikeModeRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IVoicePrivateNotice {
        uid?: (number|null);
        isVoicePublic?: (boolean|null);
    }

    class VoicePrivateNotice implements IVoicePrivateNotice {
        constructor(p?: protocol.IVoicePrivateNotice);
        public uid: number;
        public isVoicePublic: boolean;
        public static create(properties?: protocol.IVoicePrivateNotice): protocol.VoicePrivateNotice;
        public static encode(m: protocol.VoicePrivateNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.VoicePrivateNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.VoicePrivateNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.VoicePrivateNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.VoicePrivateNotice;
        public static toObject(m: protocol.VoicePrivateNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICanSpeakNotice {
        uid?: (number|null);
        CanSpeak?: (boolean|null);
    }

    class CanSpeakNotice implements ICanSpeakNotice {
        constructor(p?: protocol.ICanSpeakNotice);
        public uid: number;
        public CanSpeak: boolean;
        public static create(properties?: protocol.ICanSpeakNotice): protocol.CanSpeakNotice;
        public static encode(m: protocol.CanSpeakNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.CanSpeakNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.CanSpeakNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.CanSpeakNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.CanSpeakNotice;
        public static toObject(m: protocol.CanSpeakNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IInviterSeatFreedNotice {
        seatId?: (number[]|null);
        attr?: (number|null);
    }

    class InviterSeatFreedNotice implements IInviterSeatFreedNotice {
        constructor(p?: protocol.IInviterSeatFreedNotice);
        public seatId: number[];
        public attr: number;
        public static create(properties?: protocol.IInviterSeatFreedNotice): protocol.InviterSeatFreedNotice;
        public static encode(m: protocol.InviterSeatFreedNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.InviterSeatFreedNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.InviterSeatFreedNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.InviterSeatFreedNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.InviterSeatFreedNotice;
        public static toObject(m: protocol.InviterSeatFreedNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarCacheNotice {
        playerId?: (number[]|null);
        attr?: (number|null);
        status?: (number|null);
        television?: (number|null);
    }

    class StarCacheNotice implements IStarCacheNotice {
        constructor(p?: protocol.IStarCacheNotice);
        public playerId: number[];
        public attr: number;
        public status: number;
        public television: number;
        public static create(properties?: protocol.IStarCacheNotice): protocol.StarCacheNotice;
        public static encode(m: protocol.StarCacheNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.StarCacheNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.StarCacheNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.StarCacheNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.StarCacheNotice;
        public static toObject(m: protocol.StarCacheNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStarWillCloseNotice {
        noticeCd?: (number|null);
    }

    class StarWillCloseNotice implements IStarWillCloseNotice {
        constructor(p?: protocol.IStarWillCloseNotice);
        public noticeCd: number;
        public static create(properties?: protocol.IStarWillCloseNotice): protocol.StarWillCloseNotice;
        public static encode(m: protocol.StarWillCloseNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.StarWillCloseNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.StarWillCloseNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.StarWillCloseNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.StarWillCloseNotice;
        public static toObject(m: protocol.StarWillCloseNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestTip {
        tipInfo?: (protocol.TipInfo|null);
        playerId?: (number|null);
    }

    class RequestTip implements IRequestTip {
        constructor(p?: protocol.IRequestTip);
        public tipInfo?: (protocol.TipInfo|null);
        public playerId: number;
        public static create(properties?: protocol.IRequestTip): protocol.RequestTip;
        public static encode(m: protocol.RequestTip, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestTip, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestTip;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestTip;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestTip;
        public static toObject(m: protocol.RequestTip, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseTip {
        error?: (number|null);
        costAmount?: (number|null);
        time?: (number|null);
    }

    class ResponseTip implements IResponseTip {
        constructor(p?: protocol.IResponseTip);
        public error: number;
        public costAmount: number;
        public time: number;
        public static create(properties?: protocol.IResponseTip): protocol.ResponseTip;
        public static encode(m: protocol.ResponseTip, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseTip, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseTip;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseTip;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseTip;
        public static toObject(m: protocol.ResponseTip, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum NewsType {
        NewsType_Default = 0,
        NewsType_System = 1,
        NewsType_Tip = 2,
        NewsType_PlayerDynamic = 3,
        NewsType_Announcement = 4,
        NewsType_Banner = 5,
        NewsType_Backend = 6
    }

    enum PlayerDynamicValue {
        PlayerDynamicValue_Default = 0,
        PlayerDynamicValue_JoinRoom = 1,
        PlayerDynamicValue_Sit = 2
    }

    interface INoticeRoomNews {
        news?: (protocol.RoomNews[]|null);
    }

    class NoticeRoomNews implements INoticeRoomNews {
        constructor(p?: protocol.INoticeRoomNews);
        public news: protocol.RoomNews[];
        public static create(properties?: protocol.INoticeRoomNews): protocol.NoticeRoomNews;
        public static encode(m: protocol.NoticeRoomNews, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeRoomNews, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeRoomNews;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeRoomNews;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeRoomNews;
        public static toObject(m: protocol.NoticeRoomNews, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerAtomData {
        playerid?: (number|null);
        avatar?: (string|null);
        nickname?: (string|null);
        plat?: (number|null);
        identity?: (number|null);
    }

    class PlayerAtomData implements IPlayerAtomData {
        constructor(p?: protocol.IPlayerAtomData);
        public playerid: number;
        public avatar: string;
        public nickname: string;
        public plat: number;
        public identity: number;
        public static create(properties?: protocol.IPlayerAtomData): protocol.PlayerAtomData;
        public static encode(m: protocol.PlayerAtomData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.PlayerAtomData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.PlayerAtomData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.PlayerAtomData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.PlayerAtomData;
        public static toObject(m: protocol.PlayerAtomData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomNews {
        roomid?: (number|null);
        newsType?: (protocol.NewsType|null);
        seq?: (number|null);
        player?: (protocol.PlayerAtomData|null);
        toPlayer?: (protocol.PlayerAtomData|null);
        tip?: (protocol.TipInfo|null);
        rankChangePlayers?: (protocol.TipUserContr[]|null);
        desc?: (string|null);
        time?: (number|null);
        dynamic?: (protocol.PlayerDynamicValue|null);
        count5Second?: (number|null);
    }

    class RoomNews implements IRoomNews {
        constructor(p?: protocol.IRoomNews);
        public roomid: number;
        public newsType: protocol.NewsType;
        public seq: number;
        public player?: (protocol.PlayerAtomData|null);
        public toPlayer?: (protocol.PlayerAtomData|null);
        public tip?: (protocol.TipInfo|null);
        public rankChangePlayers: protocol.TipUserContr[];
        public desc: string;
        public time: number;
        public dynamic: protocol.PlayerDynamicValue;
        public count5Second: number;
        public static create(properties?: protocol.IRoomNews): protocol.RoomNews;
        public static encode(m: protocol.RoomNews, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RoomNews, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RoomNews;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RoomNews;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RoomNews;
        public static toObject(m: protocol.RoomNews, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserTipInfo {
        player?: (protocol.PlayerAtomData|null);
        toPlayer?: (protocol.PlayerAtomData|null);
        tip?: (protocol.TipInfo|null);
        count5Second?: (number|null);
    }

    class UserTipInfo implements IUserTipInfo {
        constructor(p?: protocol.IUserTipInfo);
        public player?: (protocol.PlayerAtomData|null);
        public toPlayer?: (protocol.PlayerAtomData|null);
        public tip?: (protocol.TipInfo|null);
        public count5Second: number;
        public static create(properties?: protocol.IUserTipInfo): protocol.UserTipInfo;
        public static encode(m: protocol.UserTipInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.UserTipInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.UserTipInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.UserTipInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.UserTipInfo;
        public static toObject(m: protocol.UserTipInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITipUserContr {
        player?: (protocol.PlayerAtomData|null);
        contr?: (number|null);
    }

    class TipUserContr implements ITipUserContr {
        constructor(p?: protocol.ITipUserContr);
        public player?: (protocol.PlayerAtomData|null);
        public contr: number;
        public static create(properties?: protocol.ITipUserContr): protocol.TipUserContr;
        public static encode(m: protocol.TipUserContr, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.TipUserContr, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.TipUserContr;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.TipUserContr;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.TipUserContr;
        public static toObject(m: protocol.TipUserContr, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestTipRank {
        topN?: (number|null);
        playerId?: (number|null);
    }

    class RequestTipRank implements IRequestTipRank {
        constructor(p?: protocol.IRequestTipRank);
        public topN: number;
        public playerId: number;
        public static create(properties?: protocol.IRequestTipRank): protocol.RequestTipRank;
        public static encode(m: protocol.RequestTipRank, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestTipRank, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestTipRank;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestTipRank;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestTipRank;
        public static toObject(m: protocol.RequestTipRank, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseTipRank {
        error?: (number|null);
        players?: (protocol.TipUserContr[]|null);
    }

    class ResponseTipRank implements IResponseTipRank {
        constructor(p?: protocol.IResponseTipRank);
        public error: number;
        public players: protocol.TipUserContr[];
        public static create(properties?: protocol.IResponseTipRank): protocol.ResponseTipRank;
        public static encode(m: protocol.ResponseTipRank, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseTipRank, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseTipRank;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseTipRank;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseTipRank;
        public static toObject(m: protocol.ResponseTipRank, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum TipRecordType {
        TipRecordType_Default = 0,
        TipRecordType_Send = 1,
        TipRecordType_Recv = 2,
        TipRecordType_All = 3
    }

    interface IRequestTipRecord {
        skipId?: (number|null);
        size?: (number|null);
        tType?: (protocol.TipRecordType|null);
    }

    class RequestTipRecord implements IRequestTipRecord {
        constructor(p?: protocol.IRequestTipRecord);
        public skipId: number;
        public size: number;
        public tType: protocol.TipRecordType;
        public static create(properties?: protocol.IRequestTipRecord): protocol.RequestTipRecord;
        public static encode(m: protocol.RequestTipRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestTipRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestTipRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestTipRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestTipRecord;
        public static toObject(m: protocol.RequestTipRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseTipRecord {
        error?: (number|null);
        leftSize?: (number|null);
        skipId?: (number|null);
        size?: (number|null);
        data?: (protocol.TipDetailInfo[]|null);
        tType?: (protocol.TipRecordType|null);
    }

    class ResponseTipRecord implements IResponseTipRecord {
        constructor(p?: protocol.IResponseTipRecord);
        public error: number;
        public leftSize: number;
        public skipId: number;
        public size: number;
        public data: protocol.TipDetailInfo[];
        public tType: protocol.TipRecordType;
        public static create(properties?: protocol.IResponseTipRecord): protocol.ResponseTipRecord;
        public static encode(m: protocol.ResponseTipRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseTipRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseTipRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseTipRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseTipRecord;
        public static toObject(m: protocol.ResponseTipRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITipDetailInfo {
        info?: (protocol.TipInfo|null);
        time?: (number|null);
        player?: (protocol.PlayerAtomData|null);
        toPlayer?: (protocol.PlayerAtomData|null);
        id?: (number|null);
    }

    class TipDetailInfo implements ITipDetailInfo {
        constructor(p?: protocol.ITipDetailInfo);
        public info?: (protocol.TipInfo|null);
        public time: number;
        public player?: (protocol.PlayerAtomData|null);
        public toPlayer?: (protocol.PlayerAtomData|null);
        public id: number;
        public static create(properties?: protocol.ITipDetailInfo): protocol.TipDetailInfo;
        public static encode(m: protocol.TipDetailInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.TipDetailInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.TipDetailInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.TipDetailInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.TipDetailInfo;
        public static toObject(m: protocol.TipDetailInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITipInfo {
        tipId?: (number|null);
        tipCount?: (number|null);
    }

    class TipInfo implements ITipInfo {
        constructor(p?: protocol.ITipInfo);
        public tipId: number;
        public tipCount: number;
        public static create(properties?: protocol.ITipInfo): protocol.TipInfo;
        public static encode(m: protocol.TipInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.TipInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.TipInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.TipInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.TipInfo;
        public static toObject(m: protocol.TipInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRequestSendBarrageForbidden {
        player?: (number|null);
        time?: (number|null);
        tType?: (number|null);
    }

    class RequestSendBarrageForbidden implements IRequestSendBarrageForbidden {
        constructor(p?: protocol.IRequestSendBarrageForbidden);
        public player: number;
        public time: number;
        public tType: number;
        public static create(properties?: protocol.IRequestSendBarrageForbidden): protocol.RequestSendBarrageForbidden;
        public static encode(m: protocol.RequestSendBarrageForbidden, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.RequestSendBarrageForbidden, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.RequestSendBarrageForbidden;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.RequestSendBarrageForbidden;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.RequestSendBarrageForbidden;
        public static toObject(m: protocol.RequestSendBarrageForbidden, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSendBarrageForbidden {
        error?: (number|null);
    }

    class ResponseSendBarrageForbidden implements IResponseSendBarrageForbidden {
        constructor(p?: protocol.IResponseSendBarrageForbidden);
        public error: number;
        public static create(properties?: protocol.IResponseSendBarrageForbidden): protocol.ResponseSendBarrageForbidden;
        public static encode(m: protocol.ResponseSendBarrageForbidden, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.ResponseSendBarrageForbidden, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.ResponseSendBarrageForbidden;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.ResponseSendBarrageForbidden;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.ResponseSendBarrageForbidden;
        public static toObject(m: protocol.ResponseSendBarrageForbidden, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSendBarrageForbidden {
        time?: (number|null);
        tType?: (number|null);
    }

    class NoticeSendBarrageForbidden implements INoticeSendBarrageForbidden {
        constructor(p?: protocol.INoticeSendBarrageForbidden);
        public time: number;
        public tType: number;
        public static create(properties?: protocol.INoticeSendBarrageForbidden): protocol.NoticeSendBarrageForbidden;
        public static encode(m: protocol.NoticeSendBarrageForbidden, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeSendBarrageForbidden, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeSendBarrageForbidden;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeSendBarrageForbidden;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeSendBarrageForbidden;
        public static toObject(m: protocol.NoticeSendBarrageForbidden, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSendBarrageConf {
        openCustomBarrage?: (boolean|null);
        openTablePlayerCustomBarrage?: (boolean|null);
        nextCustomBarrageFee?: (number|null);
    }

    class NoticeSendBarrageConf implements INoticeSendBarrageConf {
        constructor(p?: protocol.INoticeSendBarrageConf);
        public openCustomBarrage: boolean;
        public openTablePlayerCustomBarrage: boolean;
        public nextCustomBarrageFee: number;
        public static create(properties?: protocol.INoticeSendBarrageConf): protocol.NoticeSendBarrageConf;
        public static encode(m: protocol.NoticeSendBarrageConf, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.NoticeSendBarrageConf, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.NoticeSendBarrageConf;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.NoticeSendBarrageConf;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.NoticeSendBarrageConf;
        public static toObject(m: protocol.NoticeSendBarrageConf, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckStarSeatCountdownNotice {
        left_time?: (number|null);
        total_luck_amount?: (number|null);
        desc?: (string|null);
        title?: (string|null);
        share_image_url?: (string|null);
    }

    class LuckStarSeatCountdownNotice implements ILuckStarSeatCountdownNotice {
        constructor(p?: protocol.ILuckStarSeatCountdownNotice);
        public left_time: number;
        public total_luck_amount: number;
        public desc: string;
        public title: string;
        public share_image_url: string;
        public static create(properties?: protocol.ILuckStarSeatCountdownNotice): protocol.LuckStarSeatCountdownNotice;
        public static encode(m: protocol.LuckStarSeatCountdownNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LuckStarSeatCountdownNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LuckStarSeatCountdownNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LuckStarSeatCountdownNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LuckStarSeatCountdownNotice;
        public static toObject(m: protocol.LuckStarSeatCountdownNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckStarSeatCloseActiveNotice {
        room_id?: (number|null);
    }

    class LuckStarSeatCloseActiveNotice implements ILuckStarSeatCloseActiveNotice {
        constructor(p?: protocol.ILuckStarSeatCloseActiveNotice);
        public room_id: number;
        public static create(properties?: protocol.ILuckStarSeatCloseActiveNotice): protocol.LuckStarSeatCloseActiveNotice;
        public static encode(m: protocol.LuckStarSeatCloseActiveNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LuckStarSeatCloseActiveNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LuckStarSeatCloseActiveNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LuckStarSeatCloseActiveNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LuckStarSeatCloseActiveNotice;
        public static toObject(m: protocol.LuckStarSeatCloseActiveNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckStarSeatDrawResultNotice {
        user_id?: (number|null);
        amount?: (number|null);
        is_help_wrap?: (boolean|null);
    }

    class LuckStarSeatDrawResultNotice implements ILuckStarSeatDrawResultNotice {
        constructor(p?: protocol.ILuckStarSeatDrawResultNotice);
        public user_id: number;
        public amount: number;
        public is_help_wrap: boolean;
        public static create(properties?: protocol.ILuckStarSeatDrawResultNotice): protocol.LuckStarSeatDrawResultNotice;
        public static encode(m: protocol.LuckStarSeatDrawResultNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LuckStarSeatDrawResultNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LuckStarSeatDrawResultNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LuckStarSeatDrawResultNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LuckStarSeatDrawResultNotice;
        public static toObject(m: protocol.LuckStarSeatDrawResultNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckStarSeatDrawResultItem {
        user_id?: (number|null);
        nick_name?: (string|null);
        amount?: (number|null);
        draw_time?: (number|null);
        is_high_light?: (boolean|null);
        is_help_wrap?: (boolean|null);
    }

    class LuckStarSeatDrawResultItem implements ILuckStarSeatDrawResultItem {
        constructor(p?: protocol.ILuckStarSeatDrawResultItem);
        public user_id: number;
        public nick_name: string;
        public amount: number;
        public draw_time: number;
        public is_high_light: boolean;
        public is_help_wrap: boolean;
        public static create(properties?: protocol.ILuckStarSeatDrawResultItem): protocol.LuckStarSeatDrawResultItem;
        public static encode(m: protocol.LuckStarSeatDrawResultItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LuckStarSeatDrawResultItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LuckStarSeatDrawResultItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LuckStarSeatDrawResultItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LuckStarSeatDrawResultItem;
        public static toObject(m: protocol.LuckStarSeatDrawResultItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetLuckStarSeatDrawListRequest {
        room_id?: (number|null);
    }

    class GetLuckStarSeatDrawListRequest implements IGetLuckStarSeatDrawListRequest {
        constructor(p?: protocol.IGetLuckStarSeatDrawListRequest);
        public room_id: number;
        public static create(properties?: protocol.IGetLuckStarSeatDrawListRequest): protocol.GetLuckStarSeatDrawListRequest;
        public static encode(m: protocol.GetLuckStarSeatDrawListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GetLuckStarSeatDrawListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GetLuckStarSeatDrawListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GetLuckStarSeatDrawListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GetLuckStarSeatDrawListRequest;
        public static toObject(m: protocol.GetLuckStarSeatDrawListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetLuckStarSeatDrawListResponse {
        error?: (number|null);
        draw_result_list?: (protocol.LuckStarSeatDrawResultItem[]|null);
        total?: (number|null);
        page?: (number|null);
    }

    class GetLuckStarSeatDrawListResponse implements IGetLuckStarSeatDrawListResponse {
        constructor(p?: protocol.IGetLuckStarSeatDrawListResponse);
        public error: number;
        public draw_result_list: protocol.LuckStarSeatDrawResultItem[];
        public total: number;
        public page: number;
        public static create(properties?: protocol.IGetLuckStarSeatDrawListResponse): protocol.GetLuckStarSeatDrawListResponse;
        public static encode(m: protocol.GetLuckStarSeatDrawListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GetLuckStarSeatDrawListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GetLuckStarSeatDrawListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GetLuckStarSeatDrawListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GetLuckStarSeatDrawListResponse;
        public static toObject(m: protocol.GetLuckStarSeatDrawListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILuckSelfStarSeatResultItem {
        amount?: (number|null);
        draw_time?: (number|null);
        is_help_wrap?: (boolean|null);
        state?: (number|null);
    }

    class LuckSelfStarSeatResultItem implements ILuckSelfStarSeatResultItem {
        constructor(p?: protocol.ILuckSelfStarSeatResultItem);
        public amount: number;
        public draw_time: number;
        public is_help_wrap: boolean;
        public state: number;
        public static create(properties?: protocol.ILuckSelfStarSeatResultItem): protocol.LuckSelfStarSeatResultItem;
        public static encode(m: protocol.LuckSelfStarSeatResultItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.LuckSelfStarSeatResultItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.LuckSelfStarSeatResultItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.LuckSelfStarSeatResultItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.LuckSelfStarSeatResultItem;
        public static toObject(m: protocol.LuckSelfStarSeatResultItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetSelfLuckStarSeatResultListRequest {
        room_id?: (number|null);
    }

    class GetSelfLuckStarSeatResultListRequest implements IGetSelfLuckStarSeatResultListRequest {
        constructor(p?: protocol.IGetSelfLuckStarSeatResultListRequest);
        public room_id: number;
        public static create(properties?: protocol.IGetSelfLuckStarSeatResultListRequest): protocol.GetSelfLuckStarSeatResultListRequest;
        public static encode(m: protocol.GetSelfLuckStarSeatResultListRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GetSelfLuckStarSeatResultListRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GetSelfLuckStarSeatResultListRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GetSelfLuckStarSeatResultListRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GetSelfLuckStarSeatResultListRequest;
        public static toObject(m: protocol.GetSelfLuckStarSeatResultListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetSelfLuckStarSeatResultListResponse {
        error?: (number|null);
        self_result_list?: (protocol.LuckSelfStarSeatResultItem[]|null);
    }

    class GetSelfLuckStarSeatResultListResponse implements IGetSelfLuckStarSeatResultListResponse {
        constructor(p?: protocol.IGetSelfLuckStarSeatResultListResponse);
        public error: number;
        public self_result_list: protocol.LuckSelfStarSeatResultItem[];
        public static create(properties?: protocol.IGetSelfLuckStarSeatResultListResponse): protocol.GetSelfLuckStarSeatResultListResponse;
        public static encode(m: protocol.GetSelfLuckStarSeatResultListResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.GetSelfLuckStarSeatResultListResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.GetSelfLuckStarSeatResultListResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.GetSelfLuckStarSeatResultListResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.GetSelfLuckStarSeatResultListResponse;
        public static toObject(m: protocol.GetSelfLuckStarSeatResultListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITipForbiddenNotice {
        forbidden?: (number|null);
    }

    class TipForbiddenNotice implements ITipForbiddenNotice {
        constructor(p?: protocol.ITipForbiddenNotice);
        public forbidden: number;
        public static create(properties?: protocol.ITipForbiddenNotice): protocol.TipForbiddenNotice;
        public static encode(m: protocol.TipForbiddenNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: protocol.TipForbiddenNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): protocol.TipForbiddenNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocol.TipForbiddenNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): protocol.TipForbiddenNotice;
        public static toObject(m: protocol.TipForbiddenNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
