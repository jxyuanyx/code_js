import * as $protobuf from "protobufjs";
export namespace jackfruit_proto {

    enum ClientType {
        Dummy = 0,
        Normal = 1,
        OverSeas = 2,
        H5 = 3,
        H5OverSeas = 4,
        H5Web = 5,
        H5WebOverSeas = 6,
        H5VietnamLasted = 7,
        H5WebVietnamLasted = 8
    }

    enum CMD {
        CMD_DUMMY = 0,
        LOGIN_GAME_REQ = 12001,
        LOGIN_GAME_RESP = 12002,
        JOIN_ROOM_REQ = 12004,
        JOIN_ROOM_RESP = 12005,
        GAME_DATA_SYNC_REQ = 12114,
        GAME_DATA_SYNC_RESP = 12115,
        HEART_BEAT_REQ = 12007,
        HEART_BEAT_RESP = 12008,
        SIT_DOWN_REQ = 12011,
        SIT_DOWN_RESP = 12012,
        SIT_DOWN_NOTIFY = 12013,
        PLACE_CARD_REQ = 12014,
        PLACE_CARD_RESP = 12015,
        PLACE_CARD_OVER_REQ = 12017,
        PLACE_CARD_OVER_RESP = 12018,
        PLACE_CARD_OVER_NOTIFY = 12019,
        STAND_UP_REQ = 12021,
        STAND_UP_RESP = 12022,
        STAND_UP_NOTIFY = 12023,
        READY_REQ = 12024,
        READY_RESP = 12025,
        READY_NOTIFY = 12026,
        GAME_RECORD_REQ = 12027,
        GAME_RECORD_RESP = 12028,
        SEND_CHAT_REQ = 12031,
        SEND_CHAT_RESP = 12032,
        SEND_CHAT_NOTIFY = 12033,
        BUY_IN_REQ = 12034,
        BUY_IN_RESP = 12035,
        BUY_IN_NOTIFY = 12036,
        LEAVE_REQ = 12037,
        LEAVE_RESP = 12038,
        SITUATION_REQ = 12041,
        SITUATION_RESP = 12042,
        ACTION_DELAY_REQ = 12044,
        ACTION_DELAY_RESP = 12045,
        ACTION_DELAY_NOTIFY = 12046,
        SEND_BARRAGE_REQ = 12047,
        SEND_BARRAGE_RESP = 12048,
        SEND_BARRAGE_NOTIFY = 12049,
        MsgId_BarrageCount_REQ = 12051,
        MsgId_BarrageCount_RESP = 12052,
        CHANGE_TABLE_REQ = 12054,
        CHANGE_TABLE_RESP = 12055,
        SETTLE_REQ = 12057,
        SETTLE_RESP = 12058,
        JACKPOT_DATA_REQ = 12061,
        JACKPOT_DATA_RESP = 12062,
        JACKPOT_AWARD_LIST_REQ = 12064,
        JACKPOT_AWARD_LIST_RESP = 12065,
        GAME_WILL_START_NOTIFY = 12103,
        DEAL_NOTIFY = 12106,
        SQUAT_CARDS_NOTIFY = 12109,
        GAME_ROUND_END_NOTIFY = 12113,
        DESTROY_ROOM_NOTIFY = 12116,
        CONFIRM_TO_CONTINUE = 12119,
        COMMUNITY_CARDS_NOTIFY = 12123,
        START_PLACE_CARDS = 12126,
        Show_PLACE_CARDS_NOTIFY = 12129,
        WAITING_OTHER_PLAYER_NOTIFY = 12133,
        CAN_OPERATION_NOTIFY = 12136,
        PLAYER_INFO_SYNC_NOTIFY = 12139,
        START_MATCH_NOTIFY = 12143,
        MATCH_RESULT_NOTIFY = 12146,
        GetGameUUIds_REQ = 12147,
        GetGameUUIds_RESP = 12148,
        BRAND_BARRAGE_NOTIFY = 12149,
        MODIFY_PLACE_CARDS_NOTIFY = 12153,
        NotDisturb_REQ = 10528,
        NotDisturb_RESP = 10529,
        IsEmojiFree_REQ = 10557,
        IsEmojiFree_RESP = 10558,
        IsEmojiFree_NOTIFY = 10559,
        IntimacyUp_NOTIFY = 10563,
        Like_REQ = 10551,
        Like_RESP = 10552,
        Like_NOTIFY = 10553,
        GoodFriendJoinTable_NOTIFY = 10556
    }

    enum RoundState {
        RoomStates_DUMMY = 0,
        Free = 1,
        Ready = 2,
        Wait = 11,
        Deal = 12,
        PlaceCards = 13,
        Turn = 14,
        River = 18,
        Settlement = 20
    }

    enum PlayerState {
        SeatState_DUMMY = 0,
        SFree = 1,
        SReady = 2,
        SClickReady = 8,
        SWaitPlaceCards = 11,
        SPlaceCards = 13,
        SModifyPlaceCards = 14,
        SConfirmsPlaceCards = 15,
        SWaitResult = 20
    }

    enum ErrorCode {
        ErrorCode_DUMMY = 0,
        OK = 1,
        FAILED = 100,
        ROOM_WITHOUT_YOU = 13000,
        LOW_VERSION = 13001,
        INVALID_TOKEN = 13002,
        SERVER_BUSY = 13003,
        WITHOUT_LOGIN = 13004,
        ROOM_NOT_MATCH = 13005,
        ROOM_NOT_EXIST = 13006,
        ALREADY_IN_OTHER_GAME = 13007,
        ROOM_PLAYER_LIMIT = 13008,
        STOP_SERVICE = 13013,
        TOO_MANY_PEOPLE = 13018,
        SEAT_ALREADY_BUSY = 13022,
        NO_ENOUGH_MONEY = 13023,
        NOT_YET_COMPLETED_PLACE_CARDS = 13025,
        ALREADY_SIT_DOWN_THIS_SEAT = 13026,
        ALREADY_SIT_DOWN_Other_SEAT = 13027,
        SEAT_ID_NOT_EXIST = 13028,
        NO_PLACE_CARDS = 13029,
        BAD_REQ_PARAM = 13030,
        DISALLOWED_OPERATION = 13031,
        ALREADY_ADD_STAND_UP_LIST = 13032,
        CAN_NOT_LEAVE_IN_THE_GAME = 13033,
        Table_Player_Or_Owner_Can_Chat = 13034,
        Barrage_Sent_Too_Often = 13035,
        Action_Delay_Exhausted = 13036,
        Player_Limit_BuyIn = 13037,
        ALREADY_ADD_LEAVE_LIST = 13038,
        NOT_ENOUGH_STAKE = 13039,
        BUY_IN_AMOUNT_INVALID = 13040,
        CAN_NOT_CHANGE_TABLE = 13041,
        NOT_SETTLED_YET = 13042,
        BUY_IN_SEAT_WAS_SNATCHED = 13043,
        NO_JACKPOT = 13045,
        GameServer_Player_Not_Found = 3,
        GameServer_Send_Barrage_Too_Fast = 1214,
        GameServer_RoomID_Not_Found = 22,
        GameServer_Queue_Barrage_Full = 1215,
        NeedAuthVerify = 1260,
        WaitAuthRefreshCD = 1261,
        AlreadyLiked = 1252,
        Param_Validate = 1253,
        IsEmojiFree = 116
    }

    interface IGameDataSyncReq {
        roomId?: (number|null);
    }

    class GameDataSyncReq implements IGameDataSyncReq {
        constructor(p?: jackfruit_proto.IGameDataSyncReq);
        public roomId: number;
        public static create(properties?: jackfruit_proto.IGameDataSyncReq): jackfruit_proto.GameDataSyncReq;
        public static encode(m: jackfruit_proto.GameDataSyncReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameDataSyncReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameDataSyncReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameDataSyncReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameDataSyncReq;
        public static toObject(m: jackfruit_proto.GameDataSyncReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum CardLevel {
        Dump = 0,
        RoyalFlush = 10,
        StraightFlush = 9,
        FourOfAKind = 8,
        FullHouse = 7,
        Flush = 6,
        StraightI = 5,
        ThreeOfAKind = 4,
        TwoPair = 3,
        OnePair = 2,
        HighCard = 1
    }

    interface IGameDataSyncResp {
        code?: (jackfruit_proto.ErrorCode|null);
        param?: (jackfruit_proto.RoomParam|null);
        curState?: (jackfruit_proto.RoundState|null);
        cachedNotifyMsg?: (jackfruit_proto.GameRoundEndNotify|null);
        fee?: (jackfruit_proto.PayMoneyItems|null);
        barrageLeftSeconds?: (number|null);
        actionDelayCountsFee?: (number|null);
        delayedOperationPlayIds?: (number[]|null);
        canChangeTable?: (boolean|null);
        startMatchTimeStamp?: (number|null);
        matchedSeconds?: (number|null);
        jackpotLeftAmount?: (number|null);
    }

    class GameDataSyncResp implements IGameDataSyncResp {
        constructor(p?: jackfruit_proto.IGameDataSyncResp);
        public code: jackfruit_proto.ErrorCode;
        public param?: (jackfruit_proto.RoomParam|null);
        public curState: jackfruit_proto.RoundState;
        public cachedNotifyMsg?: (jackfruit_proto.GameRoundEndNotify|null);
        public fee?: (jackfruit_proto.PayMoneyItems|null);
        public barrageLeftSeconds: number;
        public actionDelayCountsFee: number;
        public delayedOperationPlayIds: number[];
        public canChangeTable: boolean;
        public startMatchTimeStamp: number;
        public matchedSeconds: number;
        public jackpotLeftAmount: number;
        public static create(properties?: jackfruit_proto.IGameDataSyncResp): jackfruit_proto.GameDataSyncResp;
        public static encode(m: jackfruit_proto.GameDataSyncResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameDataSyncResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameDataSyncResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameDataSyncResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameDataSyncResp;
        public static toObject(m: jackfruit_proto.GameDataSyncResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatReq {
        uid?: (number|null);
    }

    class HeartBeatReq implements IHeartBeatReq {
        constructor(p?: jackfruit_proto.IHeartBeatReq);
        public uid: number;
        public static create(properties?: jackfruit_proto.IHeartBeatReq): jackfruit_proto.HeartBeatReq;
        public static encode(m: jackfruit_proto.HeartBeatReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.HeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.HeartBeatReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.HeartBeatReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.HeartBeatReq;
        public static toObject(m: jackfruit_proto.HeartBeatReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatResp {
        uid?: (number|null);
        timestamp?: (number|null);
    }

    class HeartBeatResp implements IHeartBeatResp {
        constructor(p?: jackfruit_proto.IHeartBeatResp);
        public uid: number;
        public timestamp: number;
        public static create(properties?: jackfruit_proto.IHeartBeatResp): jackfruit_proto.HeartBeatResp;
        public static encode(m: jackfruit_proto.HeartBeatResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.HeartBeatResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.HeartBeatResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.HeartBeatResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.HeartBeatResp;
        public static toObject(m: jackfruit_proto.HeartBeatResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomParam {
        ownerType?: (number|null);
        gameMode?: (number|null);
        playerCountMax?: (number|null);
        gameName?: (string|null);
        ante?: (number|null);
        manualCreated?: (number|null);
        minimumAmount?: (number|null);
        ruleCheckAmount?: (number|null);
        ruleAddToAmount?: (number|null);
        zoneMultiple?: (number[]|null);
        createTime?: (number|null);
        limitPlayers?: (number|null);
        creatorId?: (number|null);
        creatorName?: (string|null);
        gameTimeLimit?: (number|null);
        idleSecs?: (number|null);
        ruleCheckScore?: (number|null);
        ruleAddToScore?: (number|null);
        ruleServeScore?: (number|null);
        ownerClubName?: (string|null);
        clubHead?: (string|null);
        isBanVpn?: (boolean|null);
        showForClients?: (number[]|null);
        clubId?: (number|null);
        allianceIds?: (number[]|null);
        ruleSwitchRandomSeat?: (number|null);
        deskType?: (number|null);
        autoStartNum?: (number|null);
        isPrivate?: (boolean|null);
        JoinPassword?: (string|null);
        buyInPassword?: (string|null);
        plats?: (number[]|null);
    }

    class RoomParam implements IRoomParam {
        constructor(p?: jackfruit_proto.IRoomParam);
        public ownerType: number;
        public gameMode: number;
        public playerCountMax: number;
        public gameName: string;
        public ante: number;
        public manualCreated: number;
        public minimumAmount: number;
        public ruleCheckAmount: number;
        public ruleAddToAmount: number;
        public zoneMultiple: number[];
        public createTime: number;
        public limitPlayers: number;
        public creatorId: number;
        public creatorName: string;
        public gameTimeLimit: number;
        public idleSecs: number;
        public ruleCheckScore: number;
        public ruleAddToScore: number;
        public ruleServeScore: number;
        public ownerClubName: string;
        public clubHead: string;
        public isBanVpn: boolean;
        public showForClients: number[];
        public clubId: number;
        public allianceIds: number[];
        public ruleSwitchRandomSeat: number;
        public deskType: number;
        public autoStartNum: number;
        public isPrivate: boolean;
        public JoinPassword: string;
        public buyInPassword: string;
        public plats: number[];
        public static create(properties?: jackfruit_proto.IRoomParam): jackfruit_proto.RoomParam;
        public static encode(m: jackfruit_proto.RoomParam, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.RoomParam, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.RoomParam;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.RoomParam;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.RoomParam;
        public static toObject(m: jackfruit_proto.RoomParam, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerInfo {
        playerId?: (number|null);
        seatId?: (number|null);
        name?: (string|null);
        headUrl?: (string|null);
        marks?: (string|null);
        gender?: (number|null);
        lastVoice?: (string|null);
        amount?: (number|null);
        state?: (jackfruit_proto.PlayerState|null);
        holeCards?: (jackfruit_proto.CardItem[]|null);
        headCards?: (jackfruit_proto.CardItem[]|null);
        middleCards?: (jackfruit_proto.CardItem[]|null);
        tailCards?: (jackfruit_proto.CardItem[]|null);
        settleScore?: (number|null);
        settleAmount?: (number|null);
        score?: (number|null);
        plat?: (number|null);
        is_online?: (boolean|null);
        user_join_room_time?: (number|null);
        NotDisturbUids?: (number[]|null);
        lastChangeVoice?: (number|null);
    }

    class PlayerInfo implements IPlayerInfo {
        constructor(p?: jackfruit_proto.IPlayerInfo);
        public playerId: number;
        public seatId: number;
        public name: string;
        public headUrl: string;
        public marks: string;
        public gender: number;
        public lastVoice: string;
        public amount: number;
        public state: jackfruit_proto.PlayerState;
        public holeCards: jackfruit_proto.CardItem[];
        public headCards: jackfruit_proto.CardItem[];
        public middleCards: jackfruit_proto.CardItem[];
        public tailCards: jackfruit_proto.CardItem[];
        public settleScore: number;
        public settleAmount: number;
        public score: number;
        public plat: number;
        public is_online: boolean;
        public user_join_room_time: number;
        public NotDisturbUids: number[];
        public lastChangeVoice: number;
        public static create(properties?: jackfruit_proto.IPlayerInfo): jackfruit_proto.PlayerInfo;
        public static encode(m: jackfruit_proto.PlayerInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlayerInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlayerInfo;
        public static toObject(m: jackfruit_proto.PlayerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginReq {
        version?: (string|null);
        token?: (string|null);
        clientType?: (jackfruit_proto.ClientType|null);
    }

    class LoginReq implements ILoginReq {
        constructor(p?: jackfruit_proto.ILoginReq);
        public version: string;
        public token: string;
        public clientType: jackfruit_proto.ClientType;
        public static create(properties?: jackfruit_proto.ILoginReq): jackfruit_proto.LoginReq;
        public static encode(m: jackfruit_proto.LoginReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LoginReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LoginReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LoginReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LoginReq;
        public static toObject(m: jackfruit_proto.LoginReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginResp {
        code?: (jackfruit_proto.ErrorCode|null);
        roomId?: (number|null);
    }

    class LoginResp implements ILoginResp {
        constructor(p?: jackfruit_proto.ILoginResp);
        public code: jackfruit_proto.ErrorCode;
        public roomId: number;
        public static create(properties?: jackfruit_proto.ILoginResp): jackfruit_proto.LoginResp;
        public static encode(m: jackfruit_proto.LoginResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LoginResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LoginResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LoginResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LoginResp;
        public static toObject(m: jackfruit_proto.LoginResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomReq {
        roomId?: (number|null);
    }

    class JoinRoomReq implements IJoinRoomReq {
        constructor(p?: jackfruit_proto.IJoinRoomReq);
        public roomId: number;
        public static create(properties?: jackfruit_proto.IJoinRoomReq): jackfruit_proto.JoinRoomReq;
        public static encode(m: jackfruit_proto.JoinRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JoinRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JoinRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JoinRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JoinRoomReq;
        public static toObject(m: jackfruit_proto.JoinRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomResp {
        code?: (jackfruit_proto.ErrorCode|null);
        roomId?: (number|null);
    }

    class JoinRoomResp implements IJoinRoomResp {
        constructor(p?: jackfruit_proto.IJoinRoomResp);
        public code: jackfruit_proto.ErrorCode;
        public roomId: number;
        public static create(properties?: jackfruit_proto.IJoinRoomResp): jackfruit_proto.JoinRoomResp;
        public static encode(m: jackfruit_proto.JoinRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JoinRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JoinRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JoinRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JoinRoomResp;
        public static toObject(m: jackfruit_proto.JoinRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveReq {
        roomId?: (number|null);
    }

    class LeaveReq implements ILeaveReq {
        constructor(p?: jackfruit_proto.ILeaveReq);
        public roomId: number;
        public static create(properties?: jackfruit_proto.ILeaveReq): jackfruit_proto.LeaveReq;
        public static encode(m: jackfruit_proto.LeaveReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LeaveReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LeaveReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LeaveReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LeaveReq;
        public static toObject(m: jackfruit_proto.LeaveReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveResp {
        code?: (jackfruit_proto.ErrorCode|null);
    }

    class LeaveResp implements ILeaveResp {
        constructor(p?: jackfruit_proto.ILeaveResp);
        public code: jackfruit_proto.ErrorCode;
        public static create(properties?: jackfruit_proto.ILeaveResp): jackfruit_proto.LeaveResp;
        public static encode(m: jackfruit_proto.LeaveResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LeaveResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LeaveResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LeaveResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LeaveResp;
        public static toObject(m: jackfruit_proto.LeaveResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISitDownReq {
        roomId?: (number|null);
        seatId?: (number|null);
    }

    class SitDownReq implements ISitDownReq {
        constructor(p?: jackfruit_proto.ISitDownReq);
        public roomId: number;
        public seatId: number;
        public static create(properties?: jackfruit_proto.ISitDownReq): jackfruit_proto.SitDownReq;
        public static encode(m: jackfruit_proto.SitDownReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SitDownReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SitDownReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SitDownReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SitDownReq;
        public static toObject(m: jackfruit_proto.SitDownReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISitDownResp {
        code?: (jackfruit_proto.ErrorCode|null);
        playerId?: (number|null);
        playerName?: (string|null);
        seatId?: (number|null);
        needAmount?: (number|null);
        amount?: (number|null);
        needScore?: (number|null);
        score?: (number|null);
        authVerifyCD?: (number|null);
        roomId?: (number|null);
    }

    class SitDownResp implements ISitDownResp {
        constructor(p?: jackfruit_proto.ISitDownResp);
        public code: jackfruit_proto.ErrorCode;
        public playerId: number;
        public playerName: string;
        public seatId: number;
        public needAmount: number;
        public amount: number;
        public needScore: number;
        public score: number;
        public authVerifyCD: number;
        public roomId: number;
        public static create(properties?: jackfruit_proto.ISitDownResp): jackfruit_proto.SitDownResp;
        public static encode(m: jackfruit_proto.SitDownResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SitDownResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SitDownResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SitDownResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SitDownResp;
        public static toObject(m: jackfruit_proto.SitDownResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISitDownNotify {
        roomId?: (number|null);
        player?: (jackfruit_proto.PlayerInfo|null);
    }

    class SitDownNotify implements ISitDownNotify {
        constructor(p?: jackfruit_proto.ISitDownNotify);
        public roomId: number;
        public player?: (jackfruit_proto.PlayerInfo|null);
        public static create(properties?: jackfruit_proto.ISitDownNotify): jackfruit_proto.SitDownNotify;
        public static encode(m: jackfruit_proto.SitDownNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SitDownNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SitDownNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SitDownNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SitDownNotify;
        public static toObject(m: jackfruit_proto.SitDownNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlaceCardReq {
        headCards?: (jackfruit_proto.CardItem[]|null);
        middleCards?: (jackfruit_proto.CardItem[]|null);
        tailCards?: (jackfruit_proto.CardItem[]|null);
        holeCards?: (jackfruit_proto.CardItem[]|null);
    }

    class PlaceCardReq implements IPlaceCardReq {
        constructor(p?: jackfruit_proto.IPlaceCardReq);
        public headCards: jackfruit_proto.CardItem[];
        public middleCards: jackfruit_proto.CardItem[];
        public tailCards: jackfruit_proto.CardItem[];
        public holeCards: jackfruit_proto.CardItem[];
        public static create(properties?: jackfruit_proto.IPlaceCardReq): jackfruit_proto.PlaceCardReq;
        public static encode(m: jackfruit_proto.PlaceCardReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlaceCardReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlaceCardReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlaceCardReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlaceCardReq;
        public static toObject(m: jackfruit_proto.PlaceCardReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlaceCardResp {
        code?: (jackfruit_proto.ErrorCode|null);
        headCards?: (jackfruit_proto.CardItem[]|null);
        middleCards?: (jackfruit_proto.CardItem[]|null);
        tailCards?: (jackfruit_proto.CardItem[]|null);
    }

    class PlaceCardResp implements IPlaceCardResp {
        constructor(p?: jackfruit_proto.IPlaceCardResp);
        public code: jackfruit_proto.ErrorCode;
        public headCards: jackfruit_proto.CardItem[];
        public middleCards: jackfruit_proto.CardItem[];
        public tailCards: jackfruit_proto.CardItem[];
        public static create(properties?: jackfruit_proto.IPlaceCardResp): jackfruit_proto.PlaceCardResp;
        public static encode(m: jackfruit_proto.PlaceCardResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlaceCardResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlaceCardResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlaceCardResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlaceCardResp;
        public static toObject(m: jackfruit_proto.PlaceCardResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlaceCardOverReq {
        headCards?: (jackfruit_proto.CardItem[]|null);
        middleCards?: (jackfruit_proto.CardItem[]|null);
        tailCards?: (jackfruit_proto.CardItem[]|null);
        holeCards?: (jackfruit_proto.CardItem[]|null);
    }

    class PlaceCardOverReq implements IPlaceCardOverReq {
        constructor(p?: jackfruit_proto.IPlaceCardOverReq);
        public headCards: jackfruit_proto.CardItem[];
        public middleCards: jackfruit_proto.CardItem[];
        public tailCards: jackfruit_proto.CardItem[];
        public holeCards: jackfruit_proto.CardItem[];
        public static create(properties?: jackfruit_proto.IPlaceCardOverReq): jackfruit_proto.PlaceCardOverReq;
        public static encode(m: jackfruit_proto.PlaceCardOverReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlaceCardOverReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlaceCardOverReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlaceCardOverReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlaceCardOverReq;
        public static toObject(m: jackfruit_proto.PlaceCardOverReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlaceCardOverResp {
        code?: (jackfruit_proto.ErrorCode|null);
        headCards?: (jackfruit_proto.CardItem[]|null);
        middleCards?: (jackfruit_proto.CardItem[]|null);
        tailCards?: (jackfruit_proto.CardItem[]|null);
        holeCards?: (jackfruit_proto.CardItem[]|null);
    }

    class PlaceCardOverResp implements IPlaceCardOverResp {
        constructor(p?: jackfruit_proto.IPlaceCardOverResp);
        public code: jackfruit_proto.ErrorCode;
        public headCards: jackfruit_proto.CardItem[];
        public middleCards: jackfruit_proto.CardItem[];
        public tailCards: jackfruit_proto.CardItem[];
        public holeCards: jackfruit_proto.CardItem[];
        public static create(properties?: jackfruit_proto.IPlaceCardOverResp): jackfruit_proto.PlaceCardOverResp;
        public static encode(m: jackfruit_proto.PlaceCardOverResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlaceCardOverResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlaceCardOverResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlaceCardOverResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlaceCardOverResp;
        public static toObject(m: jackfruit_proto.PlaceCardOverResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlaceCardOverNotify {
        seatId?: (number|null);
    }

    class PlaceCardOverNotify implements IPlaceCardOverNotify {
        constructor(p?: jackfruit_proto.IPlaceCardOverNotify);
        public seatId: number;
        public static create(properties?: jackfruit_proto.IPlaceCardOverNotify): jackfruit_proto.PlaceCardOverNotify;
        public static encode(m: jackfruit_proto.PlaceCardOverNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlaceCardOverNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlaceCardOverNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlaceCardOverNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlaceCardOverNotify;
        public static toObject(m: jackfruit_proto.PlaceCardOverNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStandUpReq {
        roomId?: (number|null);
    }

    class StandUpReq implements IStandUpReq {
        constructor(p?: jackfruit_proto.IStandUpReq);
        public roomId: number;
        public static create(properties?: jackfruit_proto.IStandUpReq): jackfruit_proto.StandUpReq;
        public static encode(m: jackfruit_proto.StandUpReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.StandUpReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.StandUpReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.StandUpReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.StandUpReq;
        public static toObject(m: jackfruit_proto.StandUpReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStandUpResp {
        code?: (jackfruit_proto.ErrorCode|null);
    }

    class StandUpResp implements IStandUpResp {
        constructor(p?: jackfruit_proto.IStandUpResp);
        public code: jackfruit_proto.ErrorCode;
        public static create(properties?: jackfruit_proto.IStandUpResp): jackfruit_proto.StandUpResp;
        public static encode(m: jackfruit_proto.StandUpResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.StandUpResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.StandUpResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.StandUpResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.StandUpResp;
        public static toObject(m: jackfruit_proto.StandUpResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStandUpNotify {
        roomId?: (number|null);
        playerId?: (number|null);
    }

    class StandUpNotify implements IStandUpNotify {
        constructor(p?: jackfruit_proto.IStandUpNotify);
        public roomId: number;
        public playerId: number;
        public static create(properties?: jackfruit_proto.IStandUpNotify): jackfruit_proto.StandUpNotify;
        public static encode(m: jackfruit_proto.StandUpNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.StandUpNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.StandUpNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.StandUpNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.StandUpNotify;
        public static toObject(m: jackfruit_proto.StandUpNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRecordReq {
    }

    class GameRecordReq implements IGameRecordReq {
        constructor(p?: jackfruit_proto.IGameRecordReq);
        public static create(properties?: jackfruit_proto.IGameRecordReq): jackfruit_proto.GameRecordReq;
        public static encode(m: jackfruit_proto.GameRecordReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameRecordReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameRecordReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameRecordReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameRecordReq;
        public static toObject(m: jackfruit_proto.GameRecordReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRecordResp {
        code?: (jackfruit_proto.ErrorCode|null);
        gameRecords?: (jackfruit_proto.GameRecord[]|null);
    }

    class GameRecordResp implements IGameRecordResp {
        constructor(p?: jackfruit_proto.IGameRecordResp);
        public code: jackfruit_proto.ErrorCode;
        public gameRecords: jackfruit_proto.GameRecord[];
        public static create(properties?: jackfruit_proto.IGameRecordResp): jackfruit_proto.GameRecordResp;
        public static encode(m: jackfruit_proto.GameRecordResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameRecordResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameRecordResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameRecordResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameRecordResp;
        public static toObject(m: jackfruit_proto.GameRecordResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRecord {
        playerSettle?: (jackfruit_proto.PlayerSettle[]|null);
        pubCards?: (jackfruit_proto.CardItem[]|null);
        gameUuid?: (string|null);
        recordTime?: (number|null);
    }

    class GameRecord implements IGameRecord {
        constructor(p?: jackfruit_proto.IGameRecord);
        public playerSettle: jackfruit_proto.PlayerSettle[];
        public pubCards: jackfruit_proto.CardItem[];
        public gameUuid: string;
        public recordTime: number;
        public static create(properties?: jackfruit_proto.IGameRecord): jackfruit_proto.GameRecord;
        public static encode(m: jackfruit_proto.GameRecord, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameRecord, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameRecord;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameRecord;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameRecord;
        public static toObject(m: jackfruit_proto.GameRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IActionDelayReq {
    }

    class ActionDelayReq implements IActionDelayReq {
        constructor(p?: jackfruit_proto.IActionDelayReq);
        public static create(properties?: jackfruit_proto.IActionDelayReq): jackfruit_proto.ActionDelayReq;
        public static encode(m: jackfruit_proto.ActionDelayReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ActionDelayReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ActionDelayReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ActionDelayReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ActionDelayReq;
        public static toObject(m: jackfruit_proto.ActionDelayReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IActionDelayResp {
        code?: (jackfruit_proto.ErrorCode|null);
        actionDelayCountsFee?: (number|null);
    }

    class ActionDelayResp implements IActionDelayResp {
        constructor(p?: jackfruit_proto.IActionDelayResp);
        public code: jackfruit_proto.ErrorCode;
        public actionDelayCountsFee: number;
        public static create(properties?: jackfruit_proto.IActionDelayResp): jackfruit_proto.ActionDelayResp;
        public static encode(m: jackfruit_proto.ActionDelayResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ActionDelayResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ActionDelayResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ActionDelayResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ActionDelayResp;
        public static toObject(m: jackfruit_proto.ActionDelayResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IActionDelayNotify {
        playerId?: (number|null);
        leftSeconds?: (number|null);
        nextStateStamp?: (number|null);
    }

    class ActionDelayNotify implements IActionDelayNotify {
        constructor(p?: jackfruit_proto.IActionDelayNotify);
        public playerId: number;
        public leftSeconds: number;
        public nextStateStamp: number;
        public static create(properties?: jackfruit_proto.IActionDelayNotify): jackfruit_proto.ActionDelayNotify;
        public static encode(m: jackfruit_proto.ActionDelayNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ActionDelayNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ActionDelayNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ActionDelayNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ActionDelayNotify;
        public static toObject(m: jackfruit_proto.ActionDelayNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameWillStartNotify {
        leftSeconds?: (number|null);
        nextStateStamp?: (number|null);
    }

    class GameWillStartNotify implements IGameWillStartNotify {
        constructor(p?: jackfruit_proto.IGameWillStartNotify);
        public leftSeconds: number;
        public nextStateStamp: number;
        public static create(properties?: jackfruit_proto.IGameWillStartNotify): jackfruit_proto.GameWillStartNotify;
        public static encode(m: jackfruit_proto.GameWillStartNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameWillStartNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameWillStartNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameWillStartNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameWillStartNotify;
        public static toObject(m: jackfruit_proto.GameWillStartNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealNotify {
        roomId?: (number|null);
        seatList?: (number[]|null);
        holdCards?: (jackfruit_proto.CardItem[]|null);
        publicCards?: (jackfruit_proto.CardItem[]|null);
        leftSeconds?: (number|null);
        nextStateStamp?: (number|null);
        actionDelayCountsFee?: (number|null);
    }

    class DealNotify implements IDealNotify {
        constructor(p?: jackfruit_proto.IDealNotify);
        public roomId: number;
        public seatList: number[];
        public holdCards: jackfruit_proto.CardItem[];
        public publicCards: jackfruit_proto.CardItem[];
        public leftSeconds: number;
        public nextStateStamp: number;
        public actionDelayCountsFee: number;
        public static create(properties?: jackfruit_proto.IDealNotify): jackfruit_proto.DealNotify;
        public static encode(m: jackfruit_proto.DealNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.DealNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.DealNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.DealNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.DealNotify;
        public static toObject(m: jackfruit_proto.DealNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartPlaceCardsNotify {
        leftSeconds?: (number|null);
        nextStateStamp?: (number|null);
    }

    class StartPlaceCardsNotify implements IStartPlaceCardsNotify {
        constructor(p?: jackfruit_proto.IStartPlaceCardsNotify);
        public leftSeconds: number;
        public nextStateStamp: number;
        public static create(properties?: jackfruit_proto.IStartPlaceCardsNotify): jackfruit_proto.StartPlaceCardsNotify;
        public static encode(m: jackfruit_proto.StartPlaceCardsNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.StartPlaceCardsNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.StartPlaceCardsNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.StartPlaceCardsNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.StartPlaceCardsNotify;
        public static toObject(m: jackfruit_proto.StartPlaceCardsNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICommunityCardsNotify {
        roomId?: (number|null);
        publicCards?: (jackfruit_proto.CardItem[]|null);
        roundState?: (jackfruit_proto.RoundState|null);
    }

    class CommunityCardsNotify implements ICommunityCardsNotify {
        constructor(p?: jackfruit_proto.ICommunityCardsNotify);
        public roomId: number;
        public publicCards: jackfruit_proto.CardItem[];
        public roundState: jackfruit_proto.RoundState;
        public static create(properties?: jackfruit_proto.ICommunityCardsNotify): jackfruit_proto.CommunityCardsNotify;
        public static encode(m: jackfruit_proto.CommunityCardsNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.CommunityCardsNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.CommunityCardsNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.CommunityCardsNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.CommunityCardsNotify;
        public static toObject(m: jackfruit_proto.CommunityCardsNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRoundEndNotify {
        playerSettle?: (jackfruit_proto.PlayerSettle[]|null);
        stopWorld?: (number|null);
        pubCards?: (jackfruit_proto.CardItem[]|null);
        leftSeconds?: (number|null);
        nextStateStamp?: (number|null);
        settleType?: (number|null);
        onlyWinAmount?: (number|null);
        jackpotLeftAmount?: (number|null);
        jackpotAwards?: (jackfruit_proto.JackpotAwardInfo[]|null);
        game_uuid_js?: (string|null);
    }

    class GameRoundEndNotify implements IGameRoundEndNotify {
        constructor(p?: jackfruit_proto.IGameRoundEndNotify);
        public playerSettle: jackfruit_proto.PlayerSettle[];
        public stopWorld: number;
        public pubCards: jackfruit_proto.CardItem[];
        public leftSeconds: number;
        public nextStateStamp: number;
        public settleType: number;
        public onlyWinAmount: number;
        public jackpotLeftAmount: number;
        public jackpotAwards: jackfruit_proto.JackpotAwardInfo[];
        public game_uuid_js: string;
        public static create(properties?: jackfruit_proto.IGameRoundEndNotify): jackfruit_proto.GameRoundEndNotify;
        public static encode(m: jackfruit_proto.GameRoundEndNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GameRoundEndNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GameRoundEndNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GameRoundEndNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GameRoundEndNotify;
        public static toObject(m: jackfruit_proto.GameRoundEndNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IConfirmToContinueNotify {
        leftSeconds?: (number|null);
        nextStateStamp?: (number|null);
        playerId?: (number[]|null);
    }

    class ConfirmToContinueNotify implements IConfirmToContinueNotify {
        constructor(p?: jackfruit_proto.IConfirmToContinueNotify);
        public leftSeconds: number;
        public nextStateStamp: number;
        public playerId: number[];
        public static create(properties?: jackfruit_proto.IConfirmToContinueNotify): jackfruit_proto.ConfirmToContinueNotify;
        public static encode(m: jackfruit_proto.ConfirmToContinueNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ConfirmToContinueNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ConfirmToContinueNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ConfirmToContinueNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ConfirmToContinueNotify;
        public static toObject(m: jackfruit_proto.ConfirmToContinueNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICardItem {
        number?: (number|null);
        suit?: (number|null);
    }

    class CardItem implements ICardItem {
        constructor(p?: jackfruit_proto.ICardItem);
        public number: number;
        public suit: number;
        public static create(properties?: jackfruit_proto.ICardItem): jackfruit_proto.CardItem;
        public static encode(m: jackfruit_proto.CardItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.CardItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.CardItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.CardItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.CardItem;
        public static toObject(m: jackfruit_proto.CardItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlaceResult {
        score?: (number|null);
        result?: (number|null);
        level?: (jackfruit_proto.CardLevel|null);
        zoneMultiple?: (number|null);
        levelScore?: (number|null);
    }

    class PlaceResult implements IPlaceResult {
        constructor(p?: jackfruit_proto.IPlaceResult);
        public score: number;
        public result: number;
        public level: jackfruit_proto.CardLevel;
        public zoneMultiple: number;
        public levelScore: number;
        public static create(properties?: jackfruit_proto.IPlaceResult): jackfruit_proto.PlaceResult;
        public static encode(m: jackfruit_proto.PlaceResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlaceResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlaceResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlaceResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlaceResult;
        public static toObject(m: jackfruit_proto.PlaceResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSettle {
        player?: (jackfruit_proto.PlayerInfo|null);
        headResult?: (jackfruit_proto.PlaceResult|null);
        middleResult?: (jackfruit_proto.PlaceResult|null);
        tailResult?: (jackfruit_proto.PlaceResult|null);
        repeatWining?: (number|null);
        winAllAward?: (number|null);
        totalScore?: (number|null);
        winAmount?: (number|null);
        winScore?: (number|null);
    }

    class PlayerSettle implements IPlayerSettle {
        constructor(p?: jackfruit_proto.IPlayerSettle);
        public player?: (jackfruit_proto.PlayerInfo|null);
        public headResult?: (jackfruit_proto.PlaceResult|null);
        public middleResult?: (jackfruit_proto.PlaceResult|null);
        public tailResult?: (jackfruit_proto.PlaceResult|null);
        public repeatWining: number;
        public winAllAward: number;
        public totalScore: number;
        public winAmount: number;
        public winScore: number;
        public static create(properties?: jackfruit_proto.IPlayerSettle): jackfruit_proto.PlayerSettle;
        public static encode(m: jackfruit_proto.PlayerSettle, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlayerSettle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlayerSettle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlayerSettle;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlayerSettle;
        public static toObject(m: jackfruit_proto.PlayerSettle, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum ChatType {
        Enum_Emoji = 0,
        Enum_Voice = 1,
        Enum_Emoji_Interactive = 2,
        Enum_Barrage = 3
    }

    enum EmojiType {
        Attack = 0,
        Welcome = 1,
        InterActiveNormal = 2
    }

    interface ISendChatReq {
        roomId?: (number|null);
        cType?: (jackfruit_proto.ChatType|null);
        content?: (string|null);
        change_voice?: (number|null);
        emoji_type?: (jackfruit_proto.EmojiType|null);
    }

    class SendChatReq implements ISendChatReq {
        constructor(p?: jackfruit_proto.ISendChatReq);
        public roomId: number;
        public cType: jackfruit_proto.ChatType;
        public content: string;
        public change_voice: number;
        public emoji_type: jackfruit_proto.EmojiType;
        public static create(properties?: jackfruit_proto.ISendChatReq): jackfruit_proto.SendChatReq;
        public static encode(m: jackfruit_proto.SendChatReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SendChatReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SendChatReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SendChatReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SendChatReq;
        public static toObject(m: jackfruit_proto.SendChatReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISendChatResp {
        code?: (jackfruit_proto.ErrorCode|null);
        nextFee?: (jackfruit_proto.PayMoneyItems|null);
        barrageLeftSeconds?: (number|null);
    }

    class SendChatResp implements ISendChatResp {
        constructor(p?: jackfruit_proto.ISendChatResp);
        public code: jackfruit_proto.ErrorCode;
        public nextFee?: (jackfruit_proto.PayMoneyItems|null);
        public barrageLeftSeconds: number;
        public static create(properties?: jackfruit_proto.ISendChatResp): jackfruit_proto.SendChatResp;
        public static encode(m: jackfruit_proto.SendChatResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SendChatResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SendChatResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SendChatResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SendChatResp;
        public static toObject(m: jackfruit_proto.SendChatResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPayMoneyItems {
        emotionFee?: (number|null);
        emotionFee2?: (number|null);
    }

    class PayMoneyItems implements IPayMoneyItems {
        constructor(p?: jackfruit_proto.IPayMoneyItems);
        public emotionFee: number;
        public emotionFee2: number;
        public static create(properties?: jackfruit_proto.IPayMoneyItems): jackfruit_proto.PayMoneyItems;
        public static encode(m: jackfruit_proto.PayMoneyItems, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PayMoneyItems, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PayMoneyItems;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PayMoneyItems;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PayMoneyItems;
        public static toObject(m: jackfruit_proto.PayMoneyItems, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISendChatNotify {
        roomId?: (number|null);
        cType?: (jackfruit_proto.ChatType|null);
        content?: (string|null);
        playerId?: (number|null);
        seatId?: (number|null);
        change_voice?: (number|null);
        emoji_type?: (jackfruit_proto.EmojiType|null);
    }

    class SendChatNotify implements ISendChatNotify {
        constructor(p?: jackfruit_proto.ISendChatNotify);
        public roomId: number;
        public cType: jackfruit_proto.ChatType;
        public content: string;
        public playerId: number;
        public seatId: number;
        public change_voice: number;
        public emoji_type: jackfruit_proto.EmojiType;
        public static create(properties?: jackfruit_proto.ISendChatNotify): jackfruit_proto.SendChatNotify;
        public static encode(m: jackfruit_proto.SendChatNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SendChatNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SendChatNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SendChatNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SendChatNotify;
        public static toObject(m: jackfruit_proto.SendChatNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReadyReq {
    }

    class ReadyReq implements IReadyReq {
        constructor(p?: jackfruit_proto.IReadyReq);
        public static create(properties?: jackfruit_proto.IReadyReq): jackfruit_proto.ReadyReq;
        public static encode(m: jackfruit_proto.ReadyReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ReadyReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ReadyReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ReadyReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ReadyReq;
        public static toObject(m: jackfruit_proto.ReadyReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReadyResp {
        code?: (jackfruit_proto.ErrorCode|null);
    }

    class ReadyResp implements IReadyResp {
        constructor(p?: jackfruit_proto.IReadyResp);
        public code: jackfruit_proto.ErrorCode;
        public static create(properties?: jackfruit_proto.IReadyResp): jackfruit_proto.ReadyResp;
        public static encode(m: jackfruit_proto.ReadyResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ReadyResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ReadyResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ReadyResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ReadyResp;
        public static toObject(m: jackfruit_proto.ReadyResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReadyNotify {
        seatId?: (number|null);
        playerId?: (number|null);
    }

    class ReadyNotify implements IReadyNotify {
        constructor(p?: jackfruit_proto.IReadyNotify);
        public seatId: number;
        public playerId: number;
        public static create(properties?: jackfruit_proto.IReadyNotify): jackfruit_proto.ReadyNotify;
        public static encode(m: jackfruit_proto.ReadyNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ReadyNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ReadyNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ReadyNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ReadyNotify;
        public static toObject(m: jackfruit_proto.ReadyNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBuyInReq {
        amount?: (number|null);
        seatId?: (number|null);
        afterSeat?: (boolean|null);
        score?: (number|null);
    }

    class BuyInReq implements IBuyInReq {
        constructor(p?: jackfruit_proto.IBuyInReq);
        public amount: number;
        public seatId: number;
        public afterSeat: boolean;
        public score: number;
        public static create(properties?: jackfruit_proto.IBuyInReq): jackfruit_proto.BuyInReq;
        public static encode(m: jackfruit_proto.BuyInReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BuyInReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BuyInReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BuyInReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BuyInReq;
        public static toObject(m: jackfruit_proto.BuyInReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBuyInResp {
        code?: (jackfruit_proto.ErrorCode|null);
    }

    class BuyInResp implements IBuyInResp {
        constructor(p?: jackfruit_proto.IBuyInResp);
        public code: jackfruit_proto.ErrorCode;
        public static create(properties?: jackfruit_proto.IBuyInResp): jackfruit_proto.BuyInResp;
        public static encode(m: jackfruit_proto.BuyInResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BuyInResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BuyInResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BuyInResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BuyInResp;
        public static toObject(m: jackfruit_proto.BuyInResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBuyInNotify {
        seatId?: (number|null);
        playerId?: (number|null);
        playerName?: (string|null);
        buyInAmount?: (number|null);
        amount?: (number|null);
        isAuto?: (boolean|null);
        roomId?: (number|null);
        score?: (number|null);
        buyInScore?: (number|null);
    }

    class BuyInNotify implements IBuyInNotify {
        constructor(p?: jackfruit_proto.IBuyInNotify);
        public seatId: number;
        public playerId: number;
        public playerName: string;
        public buyInAmount: number;
        public amount: number;
        public isAuto: boolean;
        public roomId: number;
        public score: number;
        public buyInScore: number;
        public static create(properties?: jackfruit_proto.IBuyInNotify): jackfruit_proto.BuyInNotify;
        public static encode(m: jackfruit_proto.BuyInNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BuyInNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BuyInNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BuyInNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BuyInNotify;
        public static toObject(m: jackfruit_proto.BuyInNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISituationReq {
        roomId?: (number|null);
    }

    class SituationReq implements ISituationReq {
        constructor(p?: jackfruit_proto.ISituationReq);
        public roomId: number;
        public static create(properties?: jackfruit_proto.ISituationReq): jackfruit_proto.SituationReq;
        public static encode(m: jackfruit_proto.SituationReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SituationReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SituationReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SituationReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SituationReq;
        public static toObject(m: jackfruit_proto.SituationReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerBuyInInfo {
        playerName?: (string|null);
        playerId?: (number|null);
        totalBuyIn?: (number|null);
        currRecord?: (number|null);
        totalBuyInScore?: (number|null);
        currRecordScore?: (number|null);
        handCount?: (number|null);
    }

    class PlayerBuyInInfo implements IPlayerBuyInInfo {
        constructor(p?: jackfruit_proto.IPlayerBuyInInfo);
        public playerName: string;
        public playerId: number;
        public totalBuyIn: number;
        public currRecord: number;
        public totalBuyInScore: number;
        public currRecordScore: number;
        public handCount: number;
        public static create(properties?: jackfruit_proto.IPlayerBuyInInfo): jackfruit_proto.PlayerBuyInInfo;
        public static encode(m: jackfruit_proto.PlayerBuyInInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlayerBuyInInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlayerBuyInInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlayerBuyInInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlayerBuyInInfo;
        public static toObject(m: jackfruit_proto.PlayerBuyInInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISituationResp {
        code?: (jackfruit_proto.ErrorCode|null);
        observerList?: (jackfruit_proto.PlayerInfo[]|null);
        byStanderList?: (number[]|null);
        leftTime?: (number|null);
        roomStartTime?: (number|null);
        playerBuyInInfo?: (jackfruit_proto.PlayerBuyInInfo[]|null);
        roomId?: (number|null);
        observer_info?: (jackfruit_proto.ObserverDetails|null);
    }

    class SituationResp implements ISituationResp {
        constructor(p?: jackfruit_proto.ISituationResp);
        public code: jackfruit_proto.ErrorCode;
        public observerList: jackfruit_proto.PlayerInfo[];
        public byStanderList: number[];
        public leftTime: number;
        public roomStartTime: number;
        public playerBuyInInfo: jackfruit_proto.PlayerBuyInInfo[];
        public roomId: number;
        public observer_info?: (jackfruit_proto.ObserverDetails|null);
        public static create(properties?: jackfruit_proto.ISituationResp): jackfruit_proto.SituationResp;
        public static encode(m: jackfruit_proto.SituationResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SituationResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SituationResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SituationResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SituationResp;
        public static toObject(m: jackfruit_proto.SituationResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IObserverDetails {
        online_count?: (number|null);
        total_count?: (number|null);
    }

    class ObserverDetails implements IObserverDetails {
        constructor(p?: jackfruit_proto.IObserverDetails);
        public online_count: number;
        public total_count: number;
        public static create(properties?: jackfruit_proto.IObserverDetails): jackfruit_proto.ObserverDetails;
        public static encode(m: jackfruit_proto.ObserverDetails, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ObserverDetails, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ObserverDetails;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ObserverDetails;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ObserverDetails;
        public static toObject(m: jackfruit_proto.ObserverDetails, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerTotalSettle {
        playerName?: (string|null);
        playerHead?: (string|null);
        totalBuyIn?: (number|null);
        playerHandCount?: (number|null);
        playerSettle?: (number|null);
        playerId?: (number|null);
        totalBuyInScore?: (number|null);
        playerSettleScore?: (number|null);
        plat?: (number|null);
    }

    class PlayerTotalSettle implements IPlayerTotalSettle {
        constructor(p?: jackfruit_proto.IPlayerTotalSettle);
        public playerName: string;
        public playerHead: string;
        public totalBuyIn: number;
        public playerHandCount: number;
        public playerSettle: number;
        public playerId: number;
        public totalBuyInScore: number;
        public playerSettleScore: number;
        public plat: number;
        public static create(properties?: jackfruit_proto.IPlayerTotalSettle): jackfruit_proto.PlayerTotalSettle;
        public static encode(m: jackfruit_proto.PlayerTotalSettle, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlayerTotalSettle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlayerTotalSettle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlayerTotalSettle;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlayerTotalSettle;
        public static toObject(m: jackfruit_proto.PlayerTotalSettle, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDestroyRoom {
        roomId?: (number|null);
    }

    class DestroyRoom implements IDestroyRoom {
        constructor(p?: jackfruit_proto.IDestroyRoom);
        public roomId: number;
        public static create(properties?: jackfruit_proto.IDestroyRoom): jackfruit_proto.DestroyRoom;
        public static encode(m: jackfruit_proto.DestroyRoom, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.DestroyRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.DestroyRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.DestroyRoom;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.DestroyRoom;
        public static toObject(m: jackfruit_proto.DestroyRoom, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDestroyRoomResp {
        code?: (jackfruit_proto.ErrorCode|null);
    }

    class DestroyRoomResp implements IDestroyRoomResp {
        constructor(p?: jackfruit_proto.IDestroyRoomResp);
        public code: jackfruit_proto.ErrorCode;
        public static create(properties?: jackfruit_proto.IDestroyRoomResp): jackfruit_proto.DestroyRoomResp;
        public static encode(m: jackfruit_proto.DestroyRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.DestroyRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.DestroyRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.DestroyRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.DestroyRoomResp;
        public static toObject(m: jackfruit_proto.DestroyRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDestroyRoomNotify {
        roomId?: (number|null);
        createTime?: (number|null);
        timeLimit?: (number|null);
        ownerName?: (string|null);
        gameHand?: (number|null);
        totalBuyIn?: (number|null);
        roomUuid?: (number|null);
        roomName?: (string|null);
        roomUuidStr?: (string|null);
        playerTotalSettle?: (jackfruit_proto.PlayerTotalSettle[]|null);
        reason?: (number|null);
        totalBuyInScore?: (number|null);
    }

    class DestroyRoomNotify implements IDestroyRoomNotify {
        constructor(p?: jackfruit_proto.IDestroyRoomNotify);
        public roomId: number;
        public createTime: number;
        public timeLimit: number;
        public ownerName: string;
        public gameHand: number;
        public totalBuyIn: number;
        public roomUuid: number;
        public roomName: string;
        public roomUuidStr: string;
        public playerTotalSettle: jackfruit_proto.PlayerTotalSettle[];
        public reason: number;
        public totalBuyInScore: number;
        public static create(properties?: jackfruit_proto.IDestroyRoomNotify): jackfruit_proto.DestroyRoomNotify;
        public static encode(m: jackfruit_proto.DestroyRoomNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.DestroyRoomNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.DestroyRoomNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.DestroyRoomNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.DestroyRoomNotify;
        public static toObject(m: jackfruit_proto.DestroyRoomNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum BarrageType {
        Enum_System = 0,
        Enum_Custom = 1,
        Enum_CardType = 2,
        Enum_Liked = 3
    }

    interface IRequestSendBarrage {
        roomid?: (number|null);
        ctype?: (jackfruit_proto.BarrageType|null);
        content?: (string|null);
        is_copy?: (boolean|null);
        thump_up_status?: (number|null);
    }

    class RequestSendBarrage implements IRequestSendBarrage {
        constructor(p?: jackfruit_proto.IRequestSendBarrage);
        public roomid: number;
        public ctype: jackfruit_proto.BarrageType;
        public content: string;
        public is_copy: boolean;
        public thump_up_status: number;
        public static create(properties?: jackfruit_proto.IRequestSendBarrage): jackfruit_proto.RequestSendBarrage;
        public static encode(m: jackfruit_proto.RequestSendBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.RequestSendBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.RequestSendBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.RequestSendBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.RequestSendBarrage;
        public static toObject(m: jackfruit_proto.RequestSendBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IResponseSendBarrage {
        error?: (number|null);
        barrageId?: (number|null);
        useCount?: (number|null);
    }

    class ResponseSendBarrage implements IResponseSendBarrage {
        constructor(p?: jackfruit_proto.IResponseSendBarrage);
        public error: number;
        public barrageId: number;
        public useCount: number;
        public static create(properties?: jackfruit_proto.IResponseSendBarrage): jackfruit_proto.ResponseSendBarrage;
        public static encode(m: jackfruit_proto.ResponseSendBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ResponseSendBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ResponseSendBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ResponseSendBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ResponseSendBarrage;
        public static toObject(m: jackfruit_proto.ResponseSendBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeSendBarrage {
        roomid?: (number|null);
        ctype?: (jackfruit_proto.BarrageType|null);
        content?: (string|null);
        playerid?: (number|null);
        nickname?: (string|null);
        avatar?: (string|null);
        send_time?: (number|null);
        thump_up_status?: (number|null);
        liked_nickname?: (string|null);
        liked_playerid?: (number|null);
        liked_avatar?: (string|null);
    }

    class NoticeSendBarrage implements INoticeSendBarrage {
        constructor(p?: jackfruit_proto.INoticeSendBarrage);
        public roomid: number;
        public ctype: jackfruit_proto.BarrageType;
        public content: string;
        public playerid: number;
        public nickname: string;
        public avatar: string;
        public send_time: number;
        public thump_up_status: number;
        public liked_nickname: string;
        public liked_playerid: number;
        public liked_avatar: string;
        public static create(properties?: jackfruit_proto.INoticeSendBarrage): jackfruit_proto.NoticeSendBarrage;
        public static encode(m: jackfruit_proto.NoticeSendBarrage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.NoticeSendBarrage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.NoticeSendBarrage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.NoticeSendBarrage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.NoticeSendBarrage;
        public static toObject(m: jackfruit_proto.NoticeSendBarrage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBarrageCountReq {
    }

    class BarrageCountReq implements IBarrageCountReq {
        constructor(p?: jackfruit_proto.IBarrageCountReq);
        public static create(properties?: jackfruit_proto.IBarrageCountReq): jackfruit_proto.BarrageCountReq;
        public static encode(m: jackfruit_proto.BarrageCountReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BarrageCountReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BarrageCountReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BarrageCountReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BarrageCountReq;
        public static toObject(m: jackfruit_proto.BarrageCountReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBarrageCountRsp {
        error?: (jackfruit_proto.ErrorCode|null);
        Infos?: (jackfruit_proto.BarrageCount[]|null);
    }

    class BarrageCountRsp implements IBarrageCountRsp {
        constructor(p?: jackfruit_proto.IBarrageCountRsp);
        public error: jackfruit_proto.ErrorCode;
        public Infos: jackfruit_proto.BarrageCount[];
        public static create(properties?: jackfruit_proto.IBarrageCountRsp): jackfruit_proto.BarrageCountRsp;
        public static encode(m: jackfruit_proto.BarrageCountRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BarrageCountRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BarrageCountRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BarrageCountRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BarrageCountRsp;
        public static toObject(m: jackfruit_proto.BarrageCountRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBarrageCount {
        BarrageId?: (number|null);
        UseCount?: (number|null);
    }

    class BarrageCount implements IBarrageCount {
        constructor(p?: jackfruit_proto.IBarrageCount);
        public BarrageId: number;
        public UseCount: number;
        public static create(properties?: jackfruit_proto.IBarrageCount): jackfruit_proto.BarrageCount;
        public static encode(m: jackfruit_proto.BarrageCount, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BarrageCount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BarrageCount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BarrageCount;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BarrageCount;
        public static toObject(m: jackfruit_proto.BarrageCount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IShowPlaceCardsNotify {
        player?: (jackfruit_proto.PlayerInfo[]|null);
    }

    class ShowPlaceCardsNotify implements IShowPlaceCardsNotify {
        constructor(p?: jackfruit_proto.IShowPlaceCardsNotify);
        public player: jackfruit_proto.PlayerInfo[];
        public static create(properties?: jackfruit_proto.IShowPlaceCardsNotify): jackfruit_proto.ShowPlaceCardsNotify;
        public static encode(m: jackfruit_proto.ShowPlaceCardsNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ShowPlaceCardsNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ShowPlaceCardsNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ShowPlaceCardsNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ShowPlaceCardsNotify;
        public static toObject(m: jackfruit_proto.ShowPlaceCardsNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IWaitingOtherPlayerNotify {
    }

    class WaitingOtherPlayerNotify implements IWaitingOtherPlayerNotify {
        constructor(p?: jackfruit_proto.IWaitingOtherPlayerNotify);
        public static create(properties?: jackfruit_proto.IWaitingOtherPlayerNotify): jackfruit_proto.WaitingOtherPlayerNotify;
        public static encode(m: jackfruit_proto.WaitingOtherPlayerNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.WaitingOtherPlayerNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.WaitingOtherPlayerNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.WaitingOtherPlayerNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.WaitingOtherPlayerNotify;
        public static toObject(m: jackfruit_proto.WaitingOtherPlayerNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICanOperationNotify {
        changeTable?: (boolean|null);
    }

    class CanOperationNotify implements ICanOperationNotify {
        constructor(p?: jackfruit_proto.ICanOperationNotify);
        public changeTable: boolean;
        public static create(properties?: jackfruit_proto.ICanOperationNotify): jackfruit_proto.CanOperationNotify;
        public static encode(m: jackfruit_proto.CanOperationNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.CanOperationNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.CanOperationNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.CanOperationNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.CanOperationNotify;
        public static toObject(m: jackfruit_proto.CanOperationNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IChangeTableReq {
    }

    class ChangeTableReq implements IChangeTableReq {
        constructor(p?: jackfruit_proto.IChangeTableReq);
        public static create(properties?: jackfruit_proto.IChangeTableReq): jackfruit_proto.ChangeTableReq;
        public static encode(m: jackfruit_proto.ChangeTableReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ChangeTableReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ChangeTableReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ChangeTableReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ChangeTableReq;
        public static toObject(m: jackfruit_proto.ChangeTableReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IChangeTableResp {
        code?: (jackfruit_proto.ErrorCode|null);
        authVerifyCD?: (number|null);
    }

    class ChangeTableResp implements IChangeTableResp {
        constructor(p?: jackfruit_proto.IChangeTableResp);
        public code: jackfruit_proto.ErrorCode;
        public authVerifyCD: number;
        public static create(properties?: jackfruit_proto.IChangeTableResp): jackfruit_proto.ChangeTableResp;
        public static encode(m: jackfruit_proto.ChangeTableResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ChangeTableResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ChangeTableResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ChangeTableResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ChangeTableResp;
        public static toObject(m: jackfruit_proto.ChangeTableResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISettleReq {
    }

    class SettleReq implements ISettleReq {
        constructor(p?: jackfruit_proto.ISettleReq);
        public static create(properties?: jackfruit_proto.ISettleReq): jackfruit_proto.SettleReq;
        public static encode(m: jackfruit_proto.SettleReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SettleReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SettleReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SettleReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SettleReq;
        public static toObject(m: jackfruit_proto.SettleReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISettleResp {
        code?: (jackfruit_proto.ErrorCode|null);
        settleScore?: (number|null);
        settleAmount?: (number|null);
    }

    class SettleResp implements ISettleResp {
        constructor(p?: jackfruit_proto.ISettleResp);
        public code: jackfruit_proto.ErrorCode;
        public settleScore: number;
        public settleAmount: number;
        public static create(properties?: jackfruit_proto.ISettleResp): jackfruit_proto.SettleResp;
        public static encode(m: jackfruit_proto.SettleResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.SettleResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.SettleResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.SettleResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.SettleResp;
        public static toObject(m: jackfruit_proto.SettleResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerInfoSyncNotify {
        playerList?: (jackfruit_proto.PlayerInfo[]|null);
    }

    class PlayerInfoSyncNotify implements IPlayerInfoSyncNotify {
        constructor(p?: jackfruit_proto.IPlayerInfoSyncNotify);
        public playerList: jackfruit_proto.PlayerInfo[];
        public static create(properties?: jackfruit_proto.IPlayerInfoSyncNotify): jackfruit_proto.PlayerInfoSyncNotify;
        public static encode(m: jackfruit_proto.PlayerInfoSyncNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.PlayerInfoSyncNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.PlayerInfoSyncNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.PlayerInfoSyncNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.PlayerInfoSyncNotify;
        public static toObject(m: jackfruit_proto.PlayerInfoSyncNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartMatchNotify {
        startTime?: (number|null);
    }

    class StartMatchNotify implements IStartMatchNotify {
        constructor(p?: jackfruit_proto.IStartMatchNotify);
        public startTime: number;
        public static create(properties?: jackfruit_proto.IStartMatchNotify): jackfruit_proto.StartMatchNotify;
        public static encode(m: jackfruit_proto.StartMatchNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.StartMatchNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.StartMatchNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.StartMatchNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.StartMatchNotify;
        public static toObject(m: jackfruit_proto.StartMatchNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMatchResultNotify {
        roomId?: (number|null);
        result?: (number|null);
    }

    class MatchResultNotify implements IMatchResultNotify {
        constructor(p?: jackfruit_proto.IMatchResultNotify);
        public roomId: number;
        public result: number;
        public static create(properties?: jackfruit_proto.IMatchResultNotify): jackfruit_proto.MatchResultNotify;
        public static encode(m: jackfruit_proto.MatchResultNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.MatchResultNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.MatchResultNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.MatchResultNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.MatchResultNotify;
        public static toObject(m: jackfruit_proto.MatchResultNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetGameUUIdsReq {
    }

    class GetGameUUIdsReq implements IGetGameUUIdsReq {
        constructor(p?: jackfruit_proto.IGetGameUUIdsReq);
        public static create(properties?: jackfruit_proto.IGetGameUUIdsReq): jackfruit_proto.GetGameUUIdsReq;
        public static encode(m: jackfruit_proto.GetGameUUIdsReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GetGameUUIdsReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GetGameUUIdsReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GetGameUUIdsReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GetGameUUIdsReq;
        public static toObject(m: jackfruit_proto.GetGameUUIdsReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetGameUUIdsResp {
        code?: (jackfruit_proto.ErrorCode|null);
        Total?: (number|null);
        Page?: (number|null);
        list?: (jackfruit_proto.JsStringGameUUid[]|null);
    }

    class GetGameUUIdsResp implements IGetGameUUIdsResp {
        constructor(p?: jackfruit_proto.IGetGameUUIdsResp);
        public code: jackfruit_proto.ErrorCode;
        public Total: number;
        public Page: number;
        public list: jackfruit_proto.JsStringGameUUid[];
        public static create(properties?: jackfruit_proto.IGetGameUUIdsResp): jackfruit_proto.GetGameUUIdsResp;
        public static encode(m: jackfruit_proto.GetGameUUIdsResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GetGameUUIdsResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GetGameUUIdsResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GetGameUUIdsResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GetGameUUIdsResp;
        public static toObject(m: jackfruit_proto.GetGameUUIdsResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJsStringGameUUid {
        game_uuid_js?: (string|null);
    }

    class JsStringGameUUid implements IJsStringGameUUid {
        constructor(p?: jackfruit_proto.IJsStringGameUUid);
        public game_uuid_js: string;
        public static create(properties?: jackfruit_proto.IJsStringGameUUid): jackfruit_proto.JsStringGameUUid;
        public static encode(m: jackfruit_proto.JsStringGameUUid, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JsStringGameUUid, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JsStringGameUUid;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JsStringGameUUid;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JsStringGameUUid;
        public static toObject(m: jackfruit_proto.JsStringGameUUid, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IModifyPlaceCardsNotify {
        roomId?: (number|null);
        seatId?: (number|null);
    }

    class ModifyPlaceCardsNotify implements IModifyPlaceCardsNotify {
        constructor(p?: jackfruit_proto.IModifyPlaceCardsNotify);
        public roomId: number;
        public seatId: number;
        public static create(properties?: jackfruit_proto.IModifyPlaceCardsNotify): jackfruit_proto.ModifyPlaceCardsNotify;
        public static encode(m: jackfruit_proto.ModifyPlaceCardsNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.ModifyPlaceCardsNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.ModifyPlaceCardsNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.ModifyPlaceCardsNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.ModifyPlaceCardsNotify;
        public static toObject(m: jackfruit_proto.ModifyPlaceCardsNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum BrandBarrageType {
        BrandBarrageType_DUMMY = 0,
        LIKE = 1,
        DESPISE = 2
    }

    interface IBrandBarrageNotify {
        roomId?: (number|null);
        infos?: (jackfruit_proto.BrandBarrageInfo[]|null);
    }

    class BrandBarrageNotify implements IBrandBarrageNotify {
        constructor(p?: jackfruit_proto.IBrandBarrageNotify);
        public roomId: number;
        public infos: jackfruit_proto.BrandBarrageInfo[];
        public static create(properties?: jackfruit_proto.IBrandBarrageNotify): jackfruit_proto.BrandBarrageNotify;
        public static encode(m: jackfruit_proto.BrandBarrageNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BrandBarrageNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BrandBarrageNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BrandBarrageNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BrandBarrageNotify;
        public static toObject(m: jackfruit_proto.BrandBarrageNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBrandBarrageInfo {
        card?: (jackfruit_proto.CardItem|null);
        type?: (jackfruit_proto.BrandBarrageType|null);
        index?: (number|null);
        hasReverse?: (boolean|null);
    }

    class BrandBarrageInfo implements IBrandBarrageInfo {
        constructor(p?: jackfruit_proto.IBrandBarrageInfo);
        public card?: (jackfruit_proto.CardItem|null);
        public type: jackfruit_proto.BrandBarrageType;
        public index: number;
        public hasReverse: boolean;
        public static create(properties?: jackfruit_proto.IBrandBarrageInfo): jackfruit_proto.BrandBarrageInfo;
        public static encode(m: jackfruit_proto.BrandBarrageInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.BrandBarrageInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.BrandBarrageInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.BrandBarrageInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.BrandBarrageInfo;
        public static toObject(m: jackfruit_proto.BrandBarrageInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotDataReq {
        ante?: (number|null);
    }

    class JackpotDataReq implements IJackpotDataReq {
        constructor(p?: jackfruit_proto.IJackpotDataReq);
        public ante: number;
        public static create(properties?: jackfruit_proto.IJackpotDataReq): jackfruit_proto.JackpotDataReq;
        public static encode(m: jackfruit_proto.JackpotDataReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JackpotDataReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JackpotDataReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JackpotDataReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JackpotDataReq;
        public static toObject(m: jackfruit_proto.JackpotDataReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotDataResp {
        code?: (jackfruit_proto.ErrorCode|null);
        data?: (jackfruit_proto.JackpotDataInfo|null);
    }

    class JackpotDataResp implements IJackpotDataResp {
        constructor(p?: jackfruit_proto.IJackpotDataResp);
        public code: jackfruit_proto.ErrorCode;
        public data?: (jackfruit_proto.JackpotDataInfo|null);
        public static create(properties?: jackfruit_proto.IJackpotDataResp): jackfruit_proto.JackpotDataResp;
        public static encode(m: jackfruit_proto.JackpotDataResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JackpotDataResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JackpotDataResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JackpotDataResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JackpotDataResp;
        public static toObject(m: jackfruit_proto.JackpotDataResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotDataInfo {
        leftAmount?: (number|null);
        boundaryScore?: (number|null);
        contrScore?: (number|null);
        huangTongPer?: (number|null);
        siTiaoPer?: (number|null);
        tongHuaShunPer?: (number|null);
    }

    class JackpotDataInfo implements IJackpotDataInfo {
        constructor(p?: jackfruit_proto.IJackpotDataInfo);
        public leftAmount: number;
        public boundaryScore: number;
        public contrScore: number;
        public huangTongPer: number;
        public siTiaoPer: number;
        public tongHuaShunPer: number;
        public static create(properties?: jackfruit_proto.IJackpotDataInfo): jackfruit_proto.JackpotDataInfo;
        public static encode(m: jackfruit_proto.JackpotDataInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JackpotDataInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JackpotDataInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JackpotDataInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JackpotDataInfo;
        public static toObject(m: jackfruit_proto.JackpotDataInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotAwardListReq {
    }

    class JackpotAwardListReq implements IJackpotAwardListReq {
        constructor(p?: jackfruit_proto.IJackpotAwardListReq);
        public static create(properties?: jackfruit_proto.IJackpotAwardListReq): jackfruit_proto.JackpotAwardListReq;
        public static encode(m: jackfruit_proto.JackpotAwardListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JackpotAwardListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JackpotAwardListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JackpotAwardListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JackpotAwardListReq;
        public static toObject(m: jackfruit_proto.JackpotAwardListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotAwardListResp {
        code?: (jackfruit_proto.ErrorCode|null);
        luckyOne?: (jackfruit_proto.JackpotAwardInfo|null);
        lastData?: (jackfruit_proto.JackpotAwardInfo[]|null);
    }

    class JackpotAwardListResp implements IJackpotAwardListResp {
        constructor(p?: jackfruit_proto.IJackpotAwardListResp);
        public code: jackfruit_proto.ErrorCode;
        public luckyOne?: (jackfruit_proto.JackpotAwardInfo|null);
        public lastData: jackfruit_proto.JackpotAwardInfo[];
        public static create(properties?: jackfruit_proto.IJackpotAwardListResp): jackfruit_proto.JackpotAwardListResp;
        public static encode(m: jackfruit_proto.JackpotAwardListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JackpotAwardListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JackpotAwardListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JackpotAwardListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JackpotAwardListResp;
        public static toObject(m: jackfruit_proto.JackpotAwardListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotAwardInfo {
        playerId?: (number|null);
        level?: (jackfruit_proto.CardLevel|null);
        awardAmount?: (number|null);
        awardTime?: (number|null);
        playerName?: (string|null);
        ante?: (number|null);
    }

    class JackpotAwardInfo implements IJackpotAwardInfo {
        constructor(p?: jackfruit_proto.IJackpotAwardInfo);
        public playerId: number;
        public level: jackfruit_proto.CardLevel;
        public awardAmount: number;
        public awardTime: number;
        public playerName: string;
        public ante: number;
        public static create(properties?: jackfruit_proto.IJackpotAwardInfo): jackfruit_proto.JackpotAwardInfo;
        public static encode(m: jackfruit_proto.JackpotAwardInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.JackpotAwardInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.JackpotAwardInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.JackpotAwardInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.JackpotAwardInfo;
        public static toObject(m: jackfruit_proto.JackpotAwardInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotDisturbReq {
        operate?: (number|null);
        whoId?: (number|null);
    }

    class NotDisturbReq implements INotDisturbReq {
        constructor(p?: jackfruit_proto.INotDisturbReq);
        public operate: number;
        public whoId: number;
        public static create(properties?: jackfruit_proto.INotDisturbReq): jackfruit_proto.NotDisturbReq;
        public static encode(m: jackfruit_proto.NotDisturbReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.NotDisturbReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.NotDisturbReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.NotDisturbReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.NotDisturbReq;
        public static toObject(m: jackfruit_proto.NotDisturbReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INotDisturbResp {
        code?: (jackfruit_proto.ErrorCode|null);
        operate?: (number|null);
        whoId?: (number|null);
    }

    class NotDisturbResp implements INotDisturbResp {
        constructor(p?: jackfruit_proto.INotDisturbResp);
        public code: jackfruit_proto.ErrorCode;
        public operate: number;
        public whoId: number;
        public static create(properties?: jackfruit_proto.INotDisturbResp): jackfruit_proto.NotDisturbResp;
        public static encode(m: jackfruit_proto.NotDisturbResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.NotDisturbResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.NotDisturbResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.NotDisturbResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.NotDisturbResp;
        public static toObject(m: jackfruit_proto.NotDisturbResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IIsEmojiFreeReq {
        type?: (jackfruit_proto.EmojiType|null);
    }

    class IsEmojiFreeReq implements IIsEmojiFreeReq {
        constructor(p?: jackfruit_proto.IIsEmojiFreeReq);
        public type: jackfruit_proto.EmojiType;
        public static create(properties?: jackfruit_proto.IIsEmojiFreeReq): jackfruit_proto.IsEmojiFreeReq;
        public static encode(m: jackfruit_proto.IsEmojiFreeReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.IsEmojiFreeReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.IsEmojiFreeReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.IsEmojiFreeReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.IsEmojiFreeReq;
        public static toObject(m: jackfruit_proto.IsEmojiFreeReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IIsEmojiFreeResp {
        code?: (jackfruit_proto.ErrorCode|null);
    }

    class IsEmojiFreeResp implements IIsEmojiFreeResp {
        constructor(p?: jackfruit_proto.IIsEmojiFreeResp);
        public code: jackfruit_proto.ErrorCode;
        public static create(properties?: jackfruit_proto.IIsEmojiFreeResp): jackfruit_proto.IsEmojiFreeResp;
        public static encode(m: jackfruit_proto.IsEmojiFreeResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.IsEmojiFreeResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.IsEmojiFreeResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.IsEmojiFreeResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.IsEmojiFreeResp;
        public static toObject(m: jackfruit_proto.IsEmojiFreeResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IIsEmojiFreeNotify {
        type?: (jackfruit_proto.EmojiType|null);
        is_free?: (boolean|null);
    }

    class IsEmojiFreeNotify implements IIsEmojiFreeNotify {
        constructor(p?: jackfruit_proto.IIsEmojiFreeNotify);
        public type: jackfruit_proto.EmojiType;
        public is_free: boolean;
        public static create(properties?: jackfruit_proto.IIsEmojiFreeNotify): jackfruit_proto.IsEmojiFreeNotify;
        public static encode(m: jackfruit_proto.IsEmojiFreeNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.IsEmojiFreeNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.IsEmojiFreeNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.IsEmojiFreeNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.IsEmojiFreeNotify;
        public static toObject(m: jackfruit_proto.IsEmojiFreeNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface INoticeIntimacyUp {
        playerid?: (number|null);
        nickname?: (string|null);
        intimacy?: (number|null);
        way?: (number|null);
    }

    class NoticeIntimacyUp implements INoticeIntimacyUp {
        constructor(p?: jackfruit_proto.INoticeIntimacyUp);
        public playerid: number;
        public nickname: string;
        public intimacy: number;
        public way: number;
        public static create(properties?: jackfruit_proto.INoticeIntimacyUp): jackfruit_proto.NoticeIntimacyUp;
        public static encode(m: jackfruit_proto.NoticeIntimacyUp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.NoticeIntimacyUp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.NoticeIntimacyUp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.NoticeIntimacyUp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.NoticeIntimacyUp;
        public static toObject(m: jackfruit_proto.NoticeIntimacyUp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILikeRequest {
        likeUid?: (number|null);
    }

    class LikeRequest implements ILikeRequest {
        constructor(p?: jackfruit_proto.ILikeRequest);
        public likeUid: number;
        public static create(properties?: jackfruit_proto.ILikeRequest): jackfruit_proto.LikeRequest;
        public static encode(m: jackfruit_proto.LikeRequest, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LikeRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LikeRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LikeRequest;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LikeRequest;
        public static toObject(m: jackfruit_proto.LikeRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILikeResponse {
        error?: (number|null);
        likeUid?: (number|null);
        likedCount?: (number|null);
    }

    class LikeResponse implements ILikeResponse {
        constructor(p?: jackfruit_proto.ILikeResponse);
        public error: number;
        public likeUid: number;
        public likedCount: number;
        public static create(properties?: jackfruit_proto.ILikeResponse): jackfruit_proto.LikeResponse;
        public static encode(m: jackfruit_proto.LikeResponse, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LikeResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LikeResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LikeResponse;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LikeResponse;
        public static toObject(m: jackfruit_proto.LikeResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILikeNotice {
        playerid?: (number|null);
        nickname?: (string|null);
    }

    class LikeNotice implements ILikeNotice {
        constructor(p?: jackfruit_proto.ILikeNotice);
        public playerid: number;
        public nickname: string;
        public static create(properties?: jackfruit_proto.ILikeNotice): jackfruit_proto.LikeNotice;
        public static encode(m: jackfruit_proto.LikeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.LikeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.LikeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.LikeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.LikeNotice;
        public static toObject(m: jackfruit_proto.LikeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGoodFriendJoinTableNotify {
        playerid?: (number|null);
        nickname?: (string|null);
        intimacy?: (number|null);
        seatid?: (number|null);
    }

    class GoodFriendJoinTableNotify implements IGoodFriendJoinTableNotify {
        constructor(p?: jackfruit_proto.IGoodFriendJoinTableNotify);
        public playerid: number;
        public nickname: string;
        public intimacy: number;
        public seatid: number;
        public static create(properties?: jackfruit_proto.IGoodFriendJoinTableNotify): jackfruit_proto.GoodFriendJoinTableNotify;
        public static encode(m: jackfruit_proto.GoodFriendJoinTableNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: jackfruit_proto.GoodFriendJoinTableNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): jackfruit_proto.GoodFriendJoinTableNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jackfruit_proto.GoodFriendJoinTableNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): jackfruit_proto.GoodFriendJoinTableNotify;
        public static toObject(m: jackfruit_proto.GoodFriendJoinTableNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
