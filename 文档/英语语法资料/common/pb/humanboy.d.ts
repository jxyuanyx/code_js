import * as $protobuf from "protobufjs";
export namespace humanboy_proto {

    enum RoomLevel {
        RoomLevel_DUMMY = 0,
        Small = 1,
        Middle = 2,
        Big = 3
    }

    enum KickApplyDealerReason {
        K_NULL = 0,
        K_NoMoney = 1,
        K_SUPPLY = 2,
        K_OFFLINE = 3,
        K_LEAVE = 4
    }

    enum RoundState {
        RoundState_DUMMY = 0,
        GAME_PENDING = 1,
        NEW_ROUND = 2,
        BET = 3,
        WAIT_NEXT_ROUND = 4,
        WAIT_NEXT_ROUND2 = 5
    }

    enum BetZoneOption {
        BetZoneOption_DUMMY = 0,
        HOST = 1,
        POS1 = 2,
        POS2 = 3,
        POS3 = 4,
        POS4 = 5,
        POS_LUCK = 100,
        POS_LUCK_1 = 101,
        POS_LUCK_2 = 102,
        POS_LUCK_3 = 103,
        POS_LUCK_4 = 104,
        POS_LUCK_5 = 105,
        POS_LUCK_6 = 106
    }

    enum CMD {
        CMD_DUMMY = 0,
        LOGIN_GAME_REQ = 40000,
        LOGIN_GAME_RESP = 40001,
        HEART_BEAT_REQ = 40004,
        HEART_BEAT_RESP = 40005,
        JOIN_ROOM_REQ = 40007,
        JOIN_ROOM_RESP = 40008,
        GAME_LIST_REQ = 40009,
        GAME_LIST_RESP = 40010,
        GAME_DATA_SYN = 40011,
        DEAL_NOTIFY = 40012,
        BET_REQ = 40013,
        BET_RESP = 40014,
        BET_NOTIFY = 40015,
        GAME_ROUND_END_NOTIFY = 40016,
        LEAVE_ROOM_REQ = 40018,
        LEAVE_ROOM_RESP = 40019,
        LEAVE_ROOM_NOTIFY = 40020,
        CONN_CLOSE_REQ = 40022,
        ROOM_TREND_REQ = 40023,
        ROOM_TREND_RSP = 40024,
        ROOM_TREND_NOTICE = 40025,
        START_BET_NOTIFY = 40026,
        AUTO_BET_REQ = 40029,
        AUTO_BET_RESP = 40030,
        AUTO_BET_NOTIFY = 40031,
        PLAYER_LIST_REQ = 40032,
        PLAYER_LIST_RESP = 40033,
        MERGE_AUTO_BET_NOTIFY = 40036,
        KICK_NOTIFY = 40037,
        DOWN_DEALER_REQ = 40038,
        DOWN_DEALER_RSP = 40039,
        DOWN_DEALER_NOTIFY = 40040,
        UP_DEALER_REQ = 40041,
        UP_DEALER_RSP = 40042,
        UP_DEALER_NOTIFY = 40043,
        CANCEL_WAIT_REQ = 40044,
        CANCEL_WAIT_RSP = 40045,
        DEALER_LIST_REQ = 40047,
        DEALER_LIST_RSP = 40048,
        GET_BUY_STOCK_NUM_REQ = 40050,
        GET_BUY_STOCK_NUM_RSP = 40051,
        JACKPOT_DATA_REQ = 40052,
        JACKPOT_DATA_RSP = 40053,
        JACKPOT_AWARD_LIST_REQ = 40055,
        JACKPOT_AWARD_LIST_RSP = 40056,
        GAME_WILL_START_NOTIFY = 40063,
        KICK_DEALER_APPLY_NOTIFY = 40066,
        UPDATE_DEALER_LIST_REQ = 40067,
        UPDATE_DEALER_LIST_RSP = 40068,
        SET_GAME_OPTION_REQ = 40070,
        SET_GAME_OPTION_RSP = 40071,
        START_SETTLEMENT_NOTIFY = 40073,
        SEND_EXPRESSION_REQ = 40074,
        SEND_EXPRESSION_RSP = 40075,
        SEND_EXPRESSION_NOTIFY = 40076,
        ADVANCE_AUTO_BET_REQ = 40080,
        ADVANCE_AUTO_BET_RSP = 40081,
        CANCEL_ADVANCE_AUTO_BET_REQ = 40082,
        CANCEL_ADVANCE_AUTO_BET_RSP = 40083,
        ADVANCE_AUTO_BET_SET_REQ = 40084,
        ADVANCE_AUTO_BET_SET_RSP = 40085,
        USER_POINTS_CHANGE_NOTICE = 40086
    }

    enum ErrorCode {
        ErrorCode_DUMMY = 0,
        OK = 1,
        ROOM_WITHOUT_YOU = 41000,
        LOW_VERSION = 41001,
        INVALID_TOKEN = 41002,
        SERVER_BUSY = 41003,
        WITHOUT_LOGIN = 41004,
        ROOM_NOT_MATCH = 41005,
        ROOM_NOT_EXIST = 41006,
        BET_EXCEED_LIMIT = 41007,
        ROOM_PLAYER_LIMIT = 41008,
        NO_BET = 41009,
        BET_AMOUNT_NOT_MATCH = 41010,
        NO_MONEY = 41011,
        BET_BAD_PARAM = 41012,
        STOP_SERVICE = 41013,
        NOT_BET_WHEN_AUTO_BET = 41014,
        BET_TOO_SMALL = 41015,
        BET_COUNT_LIMIT = 41016,
        AUTO_BET_LIMIT = 41017,
        TOO_MANY_PEOPLE = 41018,
        NO_UP_DEALER = 41019,
        STOCK_NUM_EXCEED = 41020,
        NO_MONEY_TO_DEALER = 41021,
        NOT_A_DEALER = 41022,
        NOT_IN_APPLY = 41023,
        DEALER_NO_BET = 41024,
        BAD_REQ_PARAM = 41025,
        NO_SET_ADVANCE_AUTO_BET = 41026,
        AUTO_BET_COUNT_LIMIT = 41027,
        AUTO_BET_NO_MONEY = 41028,
        AUTO_BET_EXCEED_LIMIT = 41029,
        ROOM_SYSTEM_FORCE_CLOSED = 41030,
        CAN_NOT_LEAVE_IN_BETTING = 41031,
        CAN_NOT_LEAVE_IN_DEALER = 41032,
        IN_CALM_DOWN = 41033
    }

    enum DownDealerReason {
        DownDummy = 0,
        NoMoney = 1,
        LongTime = 2,
        Leave = 3,
        Offline = 4,
        CalmDown = 5
    }

    enum CardResult {
        CardResult_Dummy = 0,
        GAO_PAI = 1,
        YI_DUI = 2,
        LIAN_DUI = 3,
        SAN_TIAO = 4,
        SHUN_ZI = 5,
        TONG_HUA = 6,
        HU_LU = 7,
        SI_TIAO = 8,
        TONG_HUA_SHUN = 9,
        HUANG_TONG = 10
    }

    enum Kick {
        Kick_DUMMY = 0,
        IDLE_LONG_TIME = 1,
        Stop_World = 2
    }

    enum AutoBetLevel {
        Level_Normal = 0,
        Level_Advance = 1
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

    interface ICardItem {
        number?: (number|null);
        suit?: (number|null);
    }

    class CardItem implements ICardItem {
        constructor(p?: humanboy_proto.ICardItem);
        public number: number;
        public suit: number;
        public static create(properties?: humanboy_proto.ICardItem): humanboy_proto.CardItem;
        public static encode(m: humanboy_proto.CardItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.CardItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.CardItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.CardItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.CardItem;
        public static toObject(m: humanboy_proto.CardItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatReq {
        uid?: (number|null);
    }

    class HeartBeatReq implements IHeartBeatReq {
        constructor(p?: humanboy_proto.IHeartBeatReq);
        public uid: number;
        public static create(properties?: humanboy_proto.IHeartBeatReq): humanboy_proto.HeartBeatReq;
        public static encode(m: humanboy_proto.HeartBeatReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.HeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.HeartBeatReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.HeartBeatReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.HeartBeatReq;
        public static toObject(m: humanboy_proto.HeartBeatReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatResp {
        uid?: (number|null);
        timestamp?: (number|null);
    }

    class HeartBeatResp implements IHeartBeatResp {
        constructor(p?: humanboy_proto.IHeartBeatResp);
        public uid: number;
        public timestamp: number;
        public static create(properties?: humanboy_proto.IHeartBeatResp): humanboy_proto.HeartBeatResp;
        public static encode(m: humanboy_proto.HeartBeatResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.HeartBeatResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.HeartBeatResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.HeartBeatResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.HeartBeatResp;
        public static toObject(m: humanboy_proto.HeartBeatResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginReq {
        version?: (string|null);
        token?: (string|null);
        client_type?: (humanboy_proto.ClientType|null);
    }

    class LoginReq implements ILoginReq {
        constructor(p?: humanboy_proto.ILoginReq);
        public version: string;
        public token: string;
        public client_type: humanboy_proto.ClientType;
        public static create(properties?: humanboy_proto.ILoginReq): humanboy_proto.LoginReq;
        public static encode(m: humanboy_proto.LoginReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.LoginReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.LoginReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.LoginReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.LoginReq;
        public static toObject(m: humanboy_proto.LoginReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginResp {
        code?: (humanboy_proto.ErrorCode|null);
        roomid?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class LoginResp implements ILoginResp {
        constructor(p?: humanboy_proto.ILoginResp);
        public code: humanboy_proto.ErrorCode;
        public roomid: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: humanboy_proto.ILoginResp): humanboy_proto.LoginResp;
        public static encode(m: humanboy_proto.LoginResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.LoginResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.LoginResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.LoginResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.LoginResp;
        public static toObject(m: humanboy_proto.LoginResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomReq {
        roomid?: (number|null);
    }

    class JoinRoomReq implements IJoinRoomReq {
        constructor(p?: humanboy_proto.IJoinRoomReq);
        public roomid: number;
        public static create(properties?: humanboy_proto.IJoinRoomReq): humanboy_proto.JoinRoomReq;
        public static encode(m: humanboy_proto.JoinRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JoinRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JoinRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JoinRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JoinRoomReq;
        public static toObject(m: humanboy_proto.JoinRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomResp {
        code?: (humanboy_proto.ErrorCode|null);
        roomid?: (number|null);
    }

    class JoinRoomResp implements IJoinRoomResp {
        constructor(p?: humanboy_proto.IJoinRoomResp);
        public code: humanboy_proto.ErrorCode;
        public roomid: number;
        public static create(properties?: humanboy_proto.IJoinRoomResp): humanboy_proto.JoinRoomResp;
        public static encode(m: humanboy_proto.JoinRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JoinRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JoinRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JoinRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JoinRoomResp;
        public static toObject(m: humanboy_proto.JoinRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomParam {
        roomid?: (number|null);
        amountLevel?: (number[]|null);
        oddsDetail?: (humanboy_proto.OddsDetail[]|null);
        limitPlayers?: (number|null);
        deskType?: (number|null);
        smallBet?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        upDealerMoney?: (number|null);
        dealerCount?: (number|null);
        singleMaxStock?: (number|null);
        downDealerMoney?: (number|null);
        moneyPerStock?: (number|null);
        totalStockNum?: (number|null);
        shareLimitAmount?: (number|null);
        stdJackpotBet?: (number|null);
        version?: (number|null);
        totalAmountLevel?: (number[]|null);
        pictureVn?: (string[]|null);
        ruleByLanguage?: (humanboy_proto.LanguageItem[]|null);
        langVersion?: (number|null);
        rulePic?: (string|null);
    }

    class RoomParam implements IRoomParam {
        constructor(p?: humanboy_proto.IRoomParam);
        public roomid: number;
        public amountLevel: number[];
        public oddsDetail: humanboy_proto.OddsDetail[];
        public limitPlayers: number;
        public deskType: number;
        public smallBet: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public upDealerMoney: number;
        public dealerCount: number;
        public singleMaxStock: number;
        public downDealerMoney: number;
        public moneyPerStock: number;
        public totalStockNum: number;
        public shareLimitAmount: number;
        public stdJackpotBet: number;
        public version: number;
        public totalAmountLevel: number[];
        public pictureVn: string[];
        public ruleByLanguage: humanboy_proto.LanguageItem[];
        public langVersion: number;
        public rulePic: string;
        public static create(properties?: humanboy_proto.IRoomParam): humanboy_proto.RoomParam;
        public static encode(m: humanboy_proto.RoomParam, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.RoomParam, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.RoomParam;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.RoomParam;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.RoomParam;
        public static toObject(m: humanboy_proto.RoomParam, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILanguageItem {
        lang?: (string|null);
        value?: (string|null);
    }

    class LanguageItem implements ILanguageItem {
        constructor(p?: humanboy_proto.ILanguageItem);
        public lang: string;
        public value: string;
        public static create(properties?: humanboy_proto.ILanguageItem): humanboy_proto.LanguageItem;
        public static encode(m: humanboy_proto.LanguageItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.LanguageItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.LanguageItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.LanguageItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.LanguageItem;
        public static toObject(m: humanboy_proto.LanguageItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOddsDetail {
        option?: (humanboy_proto.BetZoneOption|null);
        odds?: (number|null);
        limit?: (number|null);
    }

    class OddsDetail implements IOddsDetail {
        constructor(p?: humanboy_proto.IOddsDetail);
        public option: humanboy_proto.BetZoneOption;
        public odds: number;
        public limit: number;
        public static create(properties?: humanboy_proto.IOddsDetail): humanboy_proto.OddsDetail;
        public static encode(m: humanboy_proto.OddsDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.OddsDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.OddsDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.OddsDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.OddsDetail;
        public static toObject(m: humanboy_proto.OddsDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionLimit {
        option?: (humanboy_proto.BetZoneOption|null);
        limitAmount?: (number|null);
    }

    class OptionLimit implements IOptionLimit {
        constructor(p?: humanboy_proto.IOptionLimit);
        public option: humanboy_proto.BetZoneOption;
        public limitAmount: number;
        public static create(properties?: humanboy_proto.IOptionLimit): humanboy_proto.OptionLimit;
        public static encode(m: humanboy_proto.OptionLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.OptionLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.OptionLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.OptionLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.OptionLimit;
        public static toObject(m: humanboy_proto.OptionLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameListReq {
    }

    class GameListReq implements IGameListReq {
        constructor(p?: humanboy_proto.IGameListReq);
        public static create(properties?: humanboy_proto.IGameListReq): humanboy_proto.GameListReq;
        public static encode(m: humanboy_proto.GameListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GameListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GameListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GameListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GameListReq;
        public static toObject(m: humanboy_proto.GameListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartSettlementNotify {
    }

    class StartSettlementNotify implements IStartSettlementNotify {
        constructor(p?: humanboy_proto.IStartSettlementNotify);
        public static create(properties?: humanboy_proto.IStartSettlementNotify): humanboy_proto.StartSettlementNotify;
        public static encode(m: humanboy_proto.StartSettlementNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.StartSettlementNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.StartSettlementNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.StartSettlementNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.StartSettlementNotify;
        public static toObject(m: humanboy_proto.StartSettlementNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameListResp {
        gameList?: (humanboy_proto.GameSnapShot[]|null);
    }

    class GameListResp implements IGameListResp {
        constructor(p?: humanboy_proto.IGameListResp);
        public gameList: humanboy_proto.GameSnapShot[];
        public static create(properties?: humanboy_proto.IGameListResp): humanboy_proto.GameListResp;
        public static encode(m: humanboy_proto.GameListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GameListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GameListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GameListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GameListResp;
        public static toObject(m: humanboy_proto.GameListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameSnapShot {
        param?: (humanboy_proto.RoomParam|null);
        playerNum?: (number|null);
    }

    class GameSnapShot implements IGameSnapShot {
        constructor(p?: humanboy_proto.IGameSnapShot);
        public param?: (humanboy_proto.RoomParam|null);
        public playerNum: number;
        public static create(properties?: humanboy_proto.IGameSnapShot): humanboy_proto.GameSnapShot;
        public static encode(m: humanboy_proto.GameSnapShot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GameSnapShot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GameSnapShot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GameSnapShot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GameSnapShot;
        public static toObject(m: humanboy_proto.GameSnapShot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameDataSynNotify {
        param?: (humanboy_proto.RoomParam|null);
        optionInfo?: (humanboy_proto.BetOptionInfo[]|null);
        lastResult?: (number[]|null);
        curState?: (humanboy_proto.RoundState|null);
        nextRoundEndStamp?: (number|null);
        players?: (humanboy_proto.GamePlayer[]|null);
        canAuto?: (boolean|null);
        cachedNotifyMsg?: (humanboy_proto.GameRoundEndNotify|null);
        leftSeconds?: (number|null);
        dealer?: (humanboy_proto.DealerPlayerInfo[]|null);
        onDealerList?: (number|null);
        jackpotLeftMoney?: (number|null);
        beDealerNum?: (number|null);
        optionResults?: (humanboy_proto.OptionResults[]|null);
        isWaitDownDealer?: (boolean|null);
        surplusStockNum?: (number|null);
        occupyStockNum?: (number|null);
        showMiddleUpDealerBtn?: (boolean|null);
        totalStockNum?: (number|null);
        betCoinOption?: (number[]|null);
        autoLevel?: (humanboy_proto.AutoBetLevel|null);
        items?: (humanboy_proto.FeeItems[]|null);
        usedAutoBetCount?: (number|null);
        selectAutoBetCount?: (number|null);
        AutoBetCountList?: (number[]|null);
        canAdvanceAuto?: (boolean|null);
        BetButtonLimitAmount?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class GameDataSynNotify implements IGameDataSynNotify {
        constructor(p?: humanboy_proto.IGameDataSynNotify);
        public param?: (humanboy_proto.RoomParam|null);
        public optionInfo: humanboy_proto.BetOptionInfo[];
        public lastResult: number[];
        public curState: humanboy_proto.RoundState;
        public nextRoundEndStamp: number;
        public players: humanboy_proto.GamePlayer[];
        public canAuto: boolean;
        public cachedNotifyMsg?: (humanboy_proto.GameRoundEndNotify|null);
        public leftSeconds: number;
        public dealer: humanboy_proto.DealerPlayerInfo[];
        public onDealerList: number;
        public jackpotLeftMoney: number;
        public beDealerNum: number;
        public optionResults: humanboy_proto.OptionResults[];
        public isWaitDownDealer: boolean;
        public surplusStockNum: number;
        public occupyStockNum: number;
        public showMiddleUpDealerBtn: boolean;
        public totalStockNum: number;
        public betCoinOption: number[];
        public autoLevel: humanboy_proto.AutoBetLevel;
        public items: humanboy_proto.FeeItems[];
        public usedAutoBetCount: number;
        public selectAutoBetCount: number;
        public AutoBetCountList: number[];
        public canAdvanceAuto: boolean;
        public BetButtonLimitAmount: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: humanboy_proto.IGameDataSynNotify): humanboy_proto.GameDataSynNotify;
        public static encode(m: humanboy_proto.GameDataSynNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GameDataSynNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GameDataSynNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GameDataSynNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GameDataSynNotify;
        public static toObject(m: humanboy_proto.GameDataSynNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IFeeItems {
        id?: (number|null);
        coin?: (number|null);
    }

    class FeeItems implements IFeeItems {
        constructor(p?: humanboy_proto.IFeeItems);
        public id: number;
        public coin: number;
        public static create(properties?: humanboy_proto.IFeeItems): humanboy_proto.FeeItems;
        public static encode(m: humanboy_proto.FeeItems, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.FeeItems, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.FeeItems;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.FeeItems;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.FeeItems;
        public static toObject(m: humanboy_proto.FeeItems, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionResults {
        option?: (humanboy_proto.BetZoneOption|null);
        results?: (number[]|null);
        loseHand?: (number|null);
    }

    class OptionResults implements IOptionResults {
        constructor(p?: humanboy_proto.IOptionResults);
        public option: humanboy_proto.BetZoneOption;
        public results: number[];
        public loseHand: number;
        public static create(properties?: humanboy_proto.IOptionResults): humanboy_proto.OptionResults;
        public static encode(m: humanboy_proto.OptionResults, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.OptionResults, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.OptionResults;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.OptionResults;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.OptionResults;
        public static toObject(m: humanboy_proto.OptionResults, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetOptionInfo {
        option?: (humanboy_proto.BetZoneOption|null);
        selfBet?: (number|null);
        totalBet?: (number|null);
        amount?: (number[]|null);
    }

    class BetOptionInfo implements IBetOptionInfo {
        constructor(p?: humanboy_proto.IBetOptionInfo);
        public option: humanboy_proto.BetZoneOption;
        public selfBet: number;
        public totalBet: number;
        public amount: number[];
        public static create(properties?: humanboy_proto.IBetOptionInfo): humanboy_proto.BetOptionInfo;
        public static encode(m: humanboy_proto.BetOptionInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.BetOptionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.BetOptionInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.BetOptionInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.BetOptionInfo;
        public static toObject(m: humanboy_proto.BetOptionInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealNotify {
        card?: (humanboy_proto.CardItem|null);
        nextRoundEndStamp?: (number|null);
        players?: (humanboy_proto.GamePlayer[]|null);
        param?: (humanboy_proto.RoomParam|null);
        changed?: (boolean|null);
        lastResult?: (number[]|null);
        leftSeconds?: (number|null);
        canAuto?: (boolean|null);
        dealerInfo?: (humanboy_proto.DealerPlayerInfo[]|null);
        totalStockNum?: (number|null);
    }

    class DealNotify implements IDealNotify {
        constructor(p?: humanboy_proto.IDealNotify);
        public card?: (humanboy_proto.CardItem|null);
        public nextRoundEndStamp: number;
        public players: humanboy_proto.GamePlayer[];
        public param?: (humanboy_proto.RoomParam|null);
        public changed: boolean;
        public lastResult: number[];
        public leftSeconds: number;
        public canAuto: boolean;
        public dealerInfo: humanboy_proto.DealerPlayerInfo[];
        public totalStockNum: number;
        public static create(properties?: humanboy_proto.IDealNotify): humanboy_proto.DealNotify;
        public static encode(m: humanboy_proto.DealNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DealNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DealNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DealNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DealNotify;
        public static toObject(m: humanboy_proto.DealNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetReq {
        detail?: (humanboy_proto.BetDetail|null);
    }

    class BetReq implements IBetReq {
        constructor(p?: humanboy_proto.IBetReq);
        public detail?: (humanboy_proto.BetDetail|null);
        public static create(properties?: humanboy_proto.IBetReq): humanboy_proto.BetReq;
        public static encode(m: humanboy_proto.BetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.BetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.BetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.BetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.BetReq;
        public static toObject(m: humanboy_proto.BetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetResp {
        code?: (humanboy_proto.ErrorCode|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class BetResp implements IBetResp {
        constructor(p?: humanboy_proto.IBetResp);
        public code: humanboy_proto.ErrorCode;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: humanboy_proto.IBetResp): humanboy_proto.BetResp;
        public static encode(m: humanboy_proto.BetResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.BetResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.BetResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.BetResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.BetResp;
        public static toObject(m: humanboy_proto.BetResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetNotify {
        uid?: (number|null);
        detail?: (humanboy_proto.BetDetail|null);
        curCoin?: (number|null);
        selfBet?: (number|null);
        totalBet?: (number|null);
        curUsdt?: (number|null);
    }

    class BetNotify implements IBetNotify {
        constructor(p?: humanboy_proto.IBetNotify);
        public uid: number;
        public detail?: (humanboy_proto.BetDetail|null);
        public curCoin: number;
        public selfBet: number;
        public totalBet: number;
        public curUsdt: number;
        public static create(properties?: humanboy_proto.IBetNotify): humanboy_proto.BetNotify;
        public static encode(m: humanboy_proto.BetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.BetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.BetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.BetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.BetNotify;
        public static toObject(m: humanboy_proto.BetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMergeAutoBetNotify {
        notify?: (humanboy_proto.BetNotify[]|null);
    }

    class MergeAutoBetNotify implements IMergeAutoBetNotify {
        constructor(p?: humanboy_proto.IMergeAutoBetNotify);
        public notify: humanboy_proto.BetNotify[];
        public static create(properties?: humanboy_proto.IMergeAutoBetNotify): humanboy_proto.MergeAutoBetNotify;
        public static encode(m: humanboy_proto.MergeAutoBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.MergeAutoBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.MergeAutoBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.MergeAutoBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.MergeAutoBetNotify;
        public static toObject(m: humanboy_proto.MergeAutoBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetDetail {
        option?: (humanboy_proto.BetZoneOption|null);
        betAmount?: (number|null);
        auto?: (boolean|null);
        betGameCoin?: (number|null);
    }

    class BetDetail implements IBetDetail {
        constructor(p?: humanboy_proto.IBetDetail);
        public option: humanboy_proto.BetZoneOption;
        public betAmount: number;
        public auto: boolean;
        public betGameCoin: number;
        public static create(properties?: humanboy_proto.IBetDetail): humanboy_proto.BetDetail;
        public static encode(m: humanboy_proto.BetDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.BetDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.BetDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.BetDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.BetDetail;
        public static toObject(m: humanboy_proto.BetDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRoundEndNotify {
        playerHoleCard?: (humanboy_proto.PlayerHoleCard[]|null);
        playerSettle?: (humanboy_proto.PlayerSettle[]|null);
        nextRoundEndStamp?: (number|null);
        matchOption?: (humanboy_proto.BetZoneOption[]|null);
        stopWorld?: (number|null);
        leftSeconds?: (number|null);
        otherPlayers?: (humanboy_proto.PlayerSettle|null);
        maxLevel?: (humanboy_proto.CardResult|null);
        dealerWinAll?: (number|null);
        jackpotLeftMoney?: (number|null);
        dealerTotalWin?: (number|null);
        dealer?: (humanboy_proto.DealerPlayerInfo[]|null);
        optionResult?: (humanboy_proto.OptionResult[]|null);
        hitJackpotAward?: (humanboy_proto.HitJackpotAward[]|null);
        maxLevelOption?: (humanboy_proto.BetZoneOption|null);
        change_points?: (number|null);
        idle_roomid?: (number|null);
    }

    class GameRoundEndNotify implements IGameRoundEndNotify {
        constructor(p?: humanboy_proto.IGameRoundEndNotify);
        public playerHoleCard: humanboy_proto.PlayerHoleCard[];
        public playerSettle: humanboy_proto.PlayerSettle[];
        public nextRoundEndStamp: number;
        public matchOption: humanboy_proto.BetZoneOption[];
        public stopWorld: number;
        public leftSeconds: number;
        public otherPlayers?: (humanboy_proto.PlayerSettle|null);
        public maxLevel: humanboy_proto.CardResult;
        public dealerWinAll: number;
        public jackpotLeftMoney: number;
        public dealerTotalWin: number;
        public dealer: humanboy_proto.DealerPlayerInfo[];
        public optionResult: humanboy_proto.OptionResult[];
        public hitJackpotAward: humanboy_proto.HitJackpotAward[];
        public maxLevelOption: humanboy_proto.BetZoneOption;
        public change_points: number;
        public idle_roomid: number;
        public static create(properties?: humanboy_proto.IGameRoundEndNotify): humanboy_proto.GameRoundEndNotify;
        public static encode(m: humanboy_proto.GameRoundEndNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GameRoundEndNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GameRoundEndNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GameRoundEndNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GameRoundEndNotify;
        public static toObject(m: humanboy_proto.GameRoundEndNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionResult {
        option?: (humanboy_proto.BetZoneOption|null);
        result?: (number|null);
        loseHand?: (number|null);
    }

    class OptionResult implements IOptionResult {
        constructor(p?: humanboy_proto.IOptionResult);
        public option: humanboy_proto.BetZoneOption;
        public result: number;
        public loseHand: number;
        public static create(properties?: humanboy_proto.IOptionResult): humanboy_proto.OptionResult;
        public static encode(m: humanboy_proto.OptionResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.OptionResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.OptionResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.OptionResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.OptionResult;
        public static toObject(m: humanboy_proto.OptionResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerHoleCard {
        option?: (humanboy_proto.BetZoneOption|null);
        holeCards?: (humanboy_proto.CardItem[]|null);
        level?: (humanboy_proto.CardResult|null);
        result?: (number|null);
    }

    class PlayerHoleCard implements IPlayerHoleCard {
        constructor(p?: humanboy_proto.IPlayerHoleCard);
        public option: humanboy_proto.BetZoneOption;
        public holeCards: humanboy_proto.CardItem[];
        public level: humanboy_proto.CardResult;
        public result: number;
        public static create(properties?: humanboy_proto.IPlayerHoleCard): humanboy_proto.PlayerHoleCard;
        public static encode(m: humanboy_proto.PlayerHoleCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.PlayerHoleCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.PlayerHoleCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.PlayerHoleCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.PlayerHoleCard;
        public static toObject(m: humanboy_proto.PlayerHoleCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSettle {
        uid?: (number|null);
        settle?: (humanboy_proto.ZoneSettleDetail[]|null);
        totalWinAmount?: (number|null);
        curCoin?: (number|null);
        keepWinCount?: (number|null);
        hasBet?: (number|null);
        pos4WinAmount?: (number|null);
        posLuckWinAmount?: (number|null);
    }

    class PlayerSettle implements IPlayerSettle {
        constructor(p?: humanboy_proto.IPlayerSettle);
        public uid: number;
        public settle: humanboy_proto.ZoneSettleDetail[];
        public totalWinAmount: number;
        public curCoin: number;
        public keepWinCount: number;
        public hasBet: number;
        public pos4WinAmount: number;
        public posLuckWinAmount: number;
        public static create(properties?: humanboy_proto.IPlayerSettle): humanboy_proto.PlayerSettle;
        public static encode(m: humanboy_proto.PlayerSettle, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.PlayerSettle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.PlayerSettle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.PlayerSettle;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.PlayerSettle;
        public static toObject(m: humanboy_proto.PlayerSettle, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IZoneSettleDetail {
        option?: (humanboy_proto.BetZoneOption|null);
        betAmount?: (number|null);
        winAmount?: (number|null);
        isAuto?: (number|null);
        betGameCoin?: (number|null);
    }

    class ZoneSettleDetail implements IZoneSettleDetail {
        constructor(p?: humanboy_proto.IZoneSettleDetail);
        public option: humanboy_proto.BetZoneOption;
        public betAmount: number;
        public winAmount: number;
        public isAuto: number;
        public betGameCoin: number;
        public static create(properties?: humanboy_proto.IZoneSettleDetail): humanboy_proto.ZoneSettleDetail;
        public static encode(m: humanboy_proto.ZoneSettleDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.ZoneSettleDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.ZoneSettleDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.ZoneSettleDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.ZoneSettleDetail;
        public static toObject(m: humanboy_proto.ZoneSettleDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IConnClosed {
        Reason?: (number|null);
    }

    class ConnClosed implements IConnClosed {
        constructor(p?: humanboy_proto.IConnClosed);
        public Reason: number;
        public static create(properties?: humanboy_proto.IConnClosed): humanboy_proto.ConnClosed;
        public static encode(m: humanboy_proto.ConnClosed, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.ConnClosed, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.ConnClosed;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.ConnClosed;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.ConnClosed;
        public static toObject(m: humanboy_proto.ConnClosed, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveRoomReq {
    }

    class LeaveRoomReq implements ILeaveRoomReq {
        constructor(p?: humanboy_proto.ILeaveRoomReq);
        public static create(properties?: humanboy_proto.ILeaveRoomReq): humanboy_proto.LeaveRoomReq;
        public static encode(m: humanboy_proto.LeaveRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.LeaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.LeaveRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.LeaveRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.LeaveRoomReq;
        public static toObject(m: humanboy_proto.LeaveRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveRoomResp {
        code?: (humanboy_proto.ErrorCode|null);
    }

    class LeaveRoomResp implements ILeaveRoomResp {
        constructor(p?: humanboy_proto.ILeaveRoomResp);
        public code: humanboy_proto.ErrorCode;
        public static create(properties?: humanboy_proto.ILeaveRoomResp): humanboy_proto.LeaveRoomResp;
        public static encode(m: humanboy_proto.LeaveRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.LeaveRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.LeaveRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.LeaveRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.LeaveRoomResp;
        public static toObject(m: humanboy_proto.LeaveRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartBetNotify {
        nextRoundEndStamp?: (number|null);
        leftSeconds?: (number|null);
    }

    class StartBetNotify implements IStartBetNotify {
        constructor(p?: humanboy_proto.IStartBetNotify);
        public nextRoundEndStamp: number;
        public leftSeconds: number;
        public static create(properties?: humanboy_proto.IStartBetNotify): humanboy_proto.StartBetNotify;
        public static encode(m: humanboy_proto.StartBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.StartBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.StartBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.StartBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.StartBetNotify;
        public static toObject(m: humanboy_proto.StartBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetReq {
    }

    class AutoBetReq implements IAutoBetReq {
        constructor(p?: humanboy_proto.IAutoBetReq);
        public static create(properties?: humanboy_proto.IAutoBetReq): humanboy_proto.AutoBetReq;
        public static encode(m: humanboy_proto.AutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AutoBetReq;
        public static toObject(m: humanboy_proto.AutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetResp {
        code?: (humanboy_proto.ErrorCode|null);
        canAuto?: (boolean|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AutoBetResp implements IAutoBetResp {
        constructor(p?: humanboy_proto.IAutoBetResp);
        public code: humanboy_proto.ErrorCode;
        public canAuto: boolean;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: humanboy_proto.IAutoBetResp): humanboy_proto.AutoBetResp;
        public static encode(m: humanboy_proto.AutoBetResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AutoBetResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AutoBetResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AutoBetResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AutoBetResp;
        public static toObject(m: humanboy_proto.AutoBetResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetNotify {
        open?: (boolean|null);
    }

    class AutoBetNotify implements IAutoBetNotify {
        constructor(p?: humanboy_proto.IAutoBetNotify);
        public open: boolean;
        public static create(properties?: humanboy_proto.IAutoBetNotify): humanboy_proto.AutoBetNotify;
        public static encode(m: humanboy_proto.AutoBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AutoBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AutoBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AutoBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AutoBetNotify;
        public static toObject(m: humanboy_proto.AutoBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerListReq {
    }

    class PlayerListReq implements IPlayerListReq {
        constructor(p?: humanboy_proto.IPlayerListReq);
        public static create(properties?: humanboy_proto.IPlayerListReq): humanboy_proto.PlayerListReq;
        public static encode(m: humanboy_proto.PlayerListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.PlayerListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.PlayerListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.PlayerListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.PlayerListReq;
        public static toObject(m: humanboy_proto.PlayerListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerListResp {
        code?: (humanboy_proto.ErrorCode|null);
        gamePlayers?: (humanboy_proto.GamePlayer[]|null);
        self?: (humanboy_proto.GamePlayer|null);
        playerNum?: (number|null);
    }

    class PlayerListResp implements IPlayerListResp {
        constructor(p?: humanboy_proto.IPlayerListResp);
        public code: humanboy_proto.ErrorCode;
        public gamePlayers: humanboy_proto.GamePlayer[];
        public self?: (humanboy_proto.GamePlayer|null);
        public playerNum: number;
        public static create(properties?: humanboy_proto.IPlayerListResp): humanboy_proto.PlayerListResp;
        public static encode(m: humanboy_proto.PlayerListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.PlayerListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.PlayerListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.PlayerListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.PlayerListResp;
        public static toObject(m: humanboy_proto.PlayerListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGamePlayer {
        uid?: (number|null);
        name?: (string|null);
        head?: (string|null);
        totalBetAmount?: (number|null);
        winCount?: (number|null);
        rank?: (number|null);
        curCoin?: (number|null);
        keepWinCount?: (number|null);
        curUsdt?: (number|null);
        plat?: (number|null);
    }

    class GamePlayer implements IGamePlayer {
        constructor(p?: humanboy_proto.IGamePlayer);
        public uid: number;
        public name: string;
        public head: string;
        public totalBetAmount: number;
        public winCount: number;
        public rank: number;
        public curCoin: number;
        public keepWinCount: number;
        public curUsdt: number;
        public plat: number;
        public static create(properties?: humanboy_proto.IGamePlayer): humanboy_proto.GamePlayer;
        public static encode(m: humanboy_proto.GamePlayer, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GamePlayer, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GamePlayer;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GamePlayer;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GamePlayer;
        public static toObject(m: humanboy_proto.GamePlayer, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IKickNotify {
        kickType?: (humanboy_proto.Kick|null);
        desc?: (string|null);
        idle_roomid?: (number|null);
    }

    class KickNotify implements IKickNotify {
        constructor(p?: humanboy_proto.IKickNotify);
        public kickType: humanboy_proto.Kick;
        public desc: string;
        public idle_roomid: number;
        public static create(properties?: humanboy_proto.IKickNotify): humanboy_proto.KickNotify;
        public static encode(m: humanboy_proto.KickNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.KickNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.KickNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.KickNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.KickNotify;
        public static toObject(m: humanboy_proto.KickNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendReq {
    }

    class TrendReq implements ITrendReq {
        constructor(p?: humanboy_proto.ITrendReq);
        public static create(properties?: humanboy_proto.ITrendReq): humanboy_proto.TrendReq;
        public static encode(m: humanboy_proto.TrendReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.TrendReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.TrendReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.TrendReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.TrendReq;
        public static toObject(m: humanboy_proto.TrendReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendResp {
        trendOption?: (humanboy_proto.RoomTrendOption[]|null);
        handLevelStatistics?: (humanboy_proto.RoomTrendLevelStatistics|null);
        handNum?: (number|null);
        code?: (humanboy_proto.ErrorCode|null);
    }

    class TrendResp implements ITrendResp {
        constructor(p?: humanboy_proto.ITrendResp);
        public trendOption: humanboy_proto.RoomTrendOption[];
        public handLevelStatistics?: (humanboy_proto.RoomTrendLevelStatistics|null);
        public handNum: number;
        public code: humanboy_proto.ErrorCode;
        public static create(properties?: humanboy_proto.ITrendResp): humanboy_proto.TrendResp;
        public static encode(m: humanboy_proto.TrendResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.TrendResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.TrendResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.TrendResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.TrendResp;
        public static toObject(m: humanboy_proto.TrendResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendNotice {
    }

    class RoomTrendNotice implements IRoomTrendNotice {
        constructor(p?: humanboy_proto.IRoomTrendNotice);
        public static create(properties?: humanboy_proto.IRoomTrendNotice): humanboy_proto.RoomTrendNotice;
        public static encode(m: humanboy_proto.RoomTrendNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.RoomTrendNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.RoomTrendNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.RoomTrendNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.RoomTrendNotice;
        public static toObject(m: humanboy_proto.RoomTrendNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendData {
        result?: (number|null);
        handLevel?: (humanboy_proto.CardResult|null);
    }

    class TrendData implements ITrendData {
        constructor(p?: humanboy_proto.ITrendData);
        public result: number;
        public handLevel: humanboy_proto.CardResult;
        public static create(properties?: humanboy_proto.ITrendData): humanboy_proto.TrendData;
        public static encode(m: humanboy_proto.TrendData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.TrendData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.TrendData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.TrendData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.TrendData;
        public static toObject(m: humanboy_proto.TrendData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendOption {
        option?: (humanboy_proto.BetZoneOption|null);
        stats?: (humanboy_proto.RoomTrendOptionStats|null);
        road?: (humanboy_proto.TrendRoad[]|null);
        lastResult?: (number[]|null);
        lastRow?: (number|null);
        lastCol?: (number|null);
    }

    class RoomTrendOption implements IRoomTrendOption {
        constructor(p?: humanboy_proto.IRoomTrendOption);
        public option: humanboy_proto.BetZoneOption;
        public stats?: (humanboy_proto.RoomTrendOptionStats|null);
        public road: humanboy_proto.TrendRoad[];
        public lastResult: number[];
        public lastRow: number;
        public lastCol: number;
        public static create(properties?: humanboy_proto.IRoomTrendOption): humanboy_proto.RoomTrendOption;
        public static encode(m: humanboy_proto.RoomTrendOption, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.RoomTrendOption, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.RoomTrendOption;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.RoomTrendOption;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.RoomTrendOption;
        public static toObject(m: humanboy_proto.RoomTrendOption, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendOptionStats {
        capHandNum?: (number|null);
        lenHandNum?: (number|null);
        win?: (number|null);
        lose?: (number|null);
        equal?: (number|null);
    }

    class RoomTrendOptionStats implements IRoomTrendOptionStats {
        constructor(p?: humanboy_proto.IRoomTrendOptionStats);
        public capHandNum: number;
        public lenHandNum: number;
        public win: number;
        public lose: number;
        public equal: number;
        public static create(properties?: humanboy_proto.IRoomTrendOptionStats): humanboy_proto.RoomTrendOptionStats;
        public static encode(m: humanboy_proto.RoomTrendOptionStats, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.RoomTrendOptionStats, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.RoomTrendOptionStats;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.RoomTrendOptionStats;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.RoomTrendOptionStats;
        public static toObject(m: humanboy_proto.RoomTrendOptionStats, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendLevelStatistics {
        stats?: (humanboy_proto.RoomTrendLevelStatisticsStats|null);
    }

    class RoomTrendLevelStatistics implements IRoomTrendLevelStatistics {
        constructor(p?: humanboy_proto.IRoomTrendLevelStatistics);
        public stats?: (humanboy_proto.RoomTrendLevelStatisticsStats|null);
        public static create(properties?: humanboy_proto.IRoomTrendLevelStatistics): humanboy_proto.RoomTrendLevelStatistics;
        public static encode(m: humanboy_proto.RoomTrendLevelStatistics, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.RoomTrendLevelStatistics, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.RoomTrendLevelStatistics;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.RoomTrendLevelStatistics;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.RoomTrendLevelStatistics;
        public static toObject(m: humanboy_proto.RoomTrendLevelStatistics, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendLevelStatisticsStats {
        capHandNum?: (number|null);
        lenHandNum?: (number|null);
        gaoPai?: (number|null);
        yuDui?: (number|null);
        lianDui?: (number|null);
        sanTiao?: (number|null);
        shunZiAnd1?: (number|null);
        huLuAnd3?: (number|null);
        winAll?: (number|null);
        loseAll?: (number|null);
    }

    class RoomTrendLevelStatisticsStats implements IRoomTrendLevelStatisticsStats {
        constructor(p?: humanboy_proto.IRoomTrendLevelStatisticsStats);
        public capHandNum: number;
        public lenHandNum: number;
        public gaoPai: number;
        public yuDui: number;
        public lianDui: number;
        public sanTiao: number;
        public shunZiAnd1: number;
        public huLuAnd3: number;
        public winAll: number;
        public loseAll: number;
        public static create(properties?: humanboy_proto.IRoomTrendLevelStatisticsStats): humanboy_proto.RoomTrendLevelStatisticsStats;
        public static encode(m: humanboy_proto.RoomTrendLevelStatisticsStats, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.RoomTrendLevelStatisticsStats, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.RoomTrendLevelStatisticsStats;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.RoomTrendLevelStatisticsStats;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.RoomTrendLevelStatisticsStats;
        public static toObject(m: humanboy_proto.RoomTrendLevelStatisticsStats, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendRoad {
        roadRow?: (humanboy_proto.TrendRoadInfo[]|null);
    }

    class TrendRoad implements ITrendRoad {
        constructor(p?: humanboy_proto.ITrendRoad);
        public roadRow: humanboy_proto.TrendRoadInfo[];
        public static create(properties?: humanboy_proto.ITrendRoad): humanboy_proto.TrendRoad;
        public static encode(m: humanboy_proto.TrendRoad, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.TrendRoad, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.TrendRoad;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.TrendRoad;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.TrendRoad;
        public static toObject(m: humanboy_proto.TrendRoad, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendRoadInfo {
        result?: (number|null);
        eqc?: (number|null);
    }

    class TrendRoadInfo implements ITrendRoadInfo {
        constructor(p?: humanboy_proto.ITrendRoadInfo);
        public result: number;
        public eqc: number;
        public static create(properties?: humanboy_proto.ITrendRoadInfo): humanboy_proto.TrendRoadInfo;
        public static encode(m: humanboy_proto.TrendRoadInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.TrendRoadInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.TrendRoadInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.TrendRoadInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.TrendRoadInfo;
        public static toObject(m: humanboy_proto.TrendRoadInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetBuyStockNumReq {
    }

    class GetBuyStockNumReq implements IGetBuyStockNumReq {
        constructor(p?: humanboy_proto.IGetBuyStockNumReq);
        public static create(properties?: humanboy_proto.IGetBuyStockNumReq): humanboy_proto.GetBuyStockNumReq;
        public static encode(m: humanboy_proto.GetBuyStockNumReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GetBuyStockNumReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GetBuyStockNumReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GetBuyStockNumReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GetBuyStockNumReq;
        public static toObject(m: humanboy_proto.GetBuyStockNumReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGetBuyStockNumResp {
        code?: (humanboy_proto.ErrorCode|null);
        stockNum?: (number|null);
    }

    class GetBuyStockNumResp implements IGetBuyStockNumResp {
        constructor(p?: humanboy_proto.IGetBuyStockNumResp);
        public code: humanboy_proto.ErrorCode;
        public stockNum: number;
        public static create(properties?: humanboy_proto.IGetBuyStockNumResp): humanboy_proto.GetBuyStockNumResp;
        public static encode(m: humanboy_proto.GetBuyStockNumResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GetBuyStockNumResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GetBuyStockNumResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GetBuyStockNumResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GetBuyStockNumResp;
        public static toObject(m: humanboy_proto.GetBuyStockNumResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUpDealerReq {
        buyStockNum?: (number|null);
    }

    class UpDealerReq implements IUpDealerReq {
        constructor(p?: humanboy_proto.IUpDealerReq);
        public buyStockNum: number;
        public static create(properties?: humanboy_proto.IUpDealerReq): humanboy_proto.UpDealerReq;
        public static encode(m: humanboy_proto.UpDealerReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.UpDealerReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.UpDealerReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.UpDealerReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.UpDealerReq;
        public static toObject(m: humanboy_proto.UpDealerReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUpDealerResp {
        code?: (humanboy_proto.ErrorCode|null);
        buyStockNum?: (number|null);
    }

    class UpDealerResp implements IUpDealerResp {
        constructor(p?: humanboy_proto.IUpDealerResp);
        public code: humanboy_proto.ErrorCode;
        public buyStockNum: number;
        public static create(properties?: humanboy_proto.IUpDealerResp): humanboy_proto.UpDealerResp;
        public static encode(m: humanboy_proto.UpDealerResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.UpDealerResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.UpDealerResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.UpDealerResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.UpDealerResp;
        public static toObject(m: humanboy_proto.UpDealerResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUpDealerNotify {
        uid?: (number|null);
        holdStockNum?: (number|null);
        curCoin?: (number|null);
    }

    class UpDealerNotify implements IUpDealerNotify {
        constructor(p?: humanboy_proto.IUpDealerNotify);
        public uid: number;
        public holdStockNum: number;
        public curCoin: number;
        public static create(properties?: humanboy_proto.IUpDealerNotify): humanboy_proto.UpDealerNotify;
        public static encode(m: humanboy_proto.UpDealerNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.UpDealerNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.UpDealerNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.UpDealerNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.UpDealerNotify;
        public static toObject(m: humanboy_proto.UpDealerNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDownDealerReq {
    }

    class DownDealerReq implements IDownDealerReq {
        constructor(p?: humanboy_proto.IDownDealerReq);
        public static create(properties?: humanboy_proto.IDownDealerReq): humanboy_proto.DownDealerReq;
        public static encode(m: humanboy_proto.DownDealerReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DownDealerReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DownDealerReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DownDealerReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DownDealerReq;
        public static toObject(m: humanboy_proto.DownDealerReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDownDealerResp {
        code?: (humanboy_proto.ErrorCode|null);
        doNow?: (number|null);
    }

    class DownDealerResp implements IDownDealerResp {
        constructor(p?: humanboy_proto.IDownDealerResp);
        public code: humanboy_proto.ErrorCode;
        public doNow: number;
        public static create(properties?: humanboy_proto.IDownDealerResp): humanboy_proto.DownDealerResp;
        public static encode(m: humanboy_proto.DownDealerResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DownDealerResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DownDealerResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DownDealerResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DownDealerResp;
        public static toObject(m: humanboy_proto.DownDealerResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelWaitReq {
    }

    class CancelWaitReq implements ICancelWaitReq {
        constructor(p?: humanboy_proto.ICancelWaitReq);
        public static create(properties?: humanboy_proto.ICancelWaitReq): humanboy_proto.CancelWaitReq;
        public static encode(m: humanboy_proto.CancelWaitReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.CancelWaitReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.CancelWaitReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.CancelWaitReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.CancelWaitReq;
        public static toObject(m: humanboy_proto.CancelWaitReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelWaitResp {
        code?: (humanboy_proto.ErrorCode|null);
    }

    class CancelWaitResp implements ICancelWaitResp {
        constructor(p?: humanboy_proto.ICancelWaitResp);
        public code: humanboy_proto.ErrorCode;
        public static create(properties?: humanboy_proto.ICancelWaitResp): humanboy_proto.CancelWaitResp;
        public static encode(m: humanboy_proto.CancelWaitResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.CancelWaitResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.CancelWaitResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.CancelWaitResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.CancelWaitResp;
        public static toObject(m: humanboy_proto.CancelWaitResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDownDealerNotify {
        reason?: (humanboy_proto.DownDealerReason|null);
        uid?: (number|null);
        curCoin?: (number|null);
        holdStockNum?: (number|null);
    }

    class DownDealerNotify implements IDownDealerNotify {
        constructor(p?: humanboy_proto.IDownDealerNotify);
        public reason: humanboy_proto.DownDealerReason;
        public uid: number;
        public curCoin: number;
        public holdStockNum: number;
        public static create(properties?: humanboy_proto.IDownDealerNotify): humanboy_proto.DownDealerNotify;
        public static encode(m: humanboy_proto.DownDealerNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DownDealerNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DownDealerNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DownDealerNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DownDealerNotify;
        public static toObject(m: humanboy_proto.DownDealerNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealerListReq {
    }

    class DealerListReq implements IDealerListReq {
        constructor(p?: humanboy_proto.IDealerListReq);
        public static create(properties?: humanboy_proto.IDealerListReq): humanboy_proto.DealerListReq;
        public static encode(m: humanboy_proto.DealerListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DealerListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DealerListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DealerListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DealerListReq;
        public static toObject(m: humanboy_proto.DealerListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealerListResp {
        code?: (humanboy_proto.ErrorCode|null);
        waitList?: (humanboy_proto.DealerPlayerInfo[]|null);
        dealerList?: (humanboy_proto.DealerPlayerInfo[]|null);
    }

    class DealerListResp implements IDealerListResp {
        constructor(p?: humanboy_proto.IDealerListResp);
        public code: humanboy_proto.ErrorCode;
        public waitList: humanboy_proto.DealerPlayerInfo[];
        public dealerList: humanboy_proto.DealerPlayerInfo[];
        public static create(properties?: humanboy_proto.IDealerListResp): humanboy_proto.DealerListResp;
        public static encode(m: humanboy_proto.DealerListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DealerListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DealerListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DealerListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DealerListResp;
        public static toObject(m: humanboy_proto.DealerListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealerPlayerInfo {
        uid?: (number|null);
        head?: (string|null);
        name?: (string|null);
        curCoin?: (number|null);
        stockNum?: (number|null);
        beDealerNum?: (number|null);
        stockCoin?: (number|null);
        winningCoin?: (number|null);
        recentlyWinCoin?: (number|null);
        plat?: (number|null);
    }

    class DealerPlayerInfo implements IDealerPlayerInfo {
        constructor(p?: humanboy_proto.IDealerPlayerInfo);
        public uid: number;
        public head: string;
        public name: string;
        public curCoin: number;
        public stockNum: number;
        public beDealerNum: number;
        public stockCoin: number;
        public winningCoin: number;
        public recentlyWinCoin: number;
        public plat: number;
        public static create(properties?: humanboy_proto.IDealerPlayerInfo): humanboy_proto.DealerPlayerInfo;
        public static encode(m: humanboy_proto.DealerPlayerInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.DealerPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.DealerPlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.DealerPlayerInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.DealerPlayerInfo;
        public static toObject(m: humanboy_proto.DealerPlayerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotDataReq {
        roomType?: (number|null);
    }

    class JackpotDataReq implements IJackpotDataReq {
        constructor(p?: humanboy_proto.IJackpotDataReq);
        public roomType: number;
        public static create(properties?: humanboy_proto.IJackpotDataReq): humanboy_proto.JackpotDataReq;
        public static encode(m: humanboy_proto.JackpotDataReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JackpotDataReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JackpotDataReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JackpotDataReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JackpotDataReq;
        public static toObject(m: humanboy_proto.JackpotDataReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotDataResp {
        code?: (humanboy_proto.ErrorCode|null);
        data?: (humanboy_proto.JackpotDataInfo|null);
    }

    class JackpotDataResp implements IJackpotDataResp {
        constructor(p?: humanboy_proto.IJackpotDataResp);
        public code: humanboy_proto.ErrorCode;
        public data?: (humanboy_proto.JackpotDataInfo|null);
        public static create(properties?: humanboy_proto.IJackpotDataResp): humanboy_proto.JackpotDataResp;
        public static encode(m: humanboy_proto.JackpotDataResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JackpotDataResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JackpotDataResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JackpotDataResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JackpotDataResp;
        public static toObject(m: humanboy_proto.JackpotDataResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotDataInfo {
        leftAmount?: (number|null);
        huangTongPer?: (number|null);
        siTiaoPer?: (number|null);
        tongHuaShunPer?: (number|null);
        roomType?: (number|null);
    }

    class JackpotDataInfo implements IJackpotDataInfo {
        constructor(p?: humanboy_proto.IJackpotDataInfo);
        public leftAmount: number;
        public huangTongPer: number;
        public siTiaoPer: number;
        public tongHuaShunPer: number;
        public roomType: number;
        public static create(properties?: humanboy_proto.IJackpotDataInfo): humanboy_proto.JackpotDataInfo;
        public static encode(m: humanboy_proto.JackpotDataInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JackpotDataInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JackpotDataInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JackpotDataInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JackpotDataInfo;
        public static toObject(m: humanboy_proto.JackpotDataInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotAwardListReq {
        roomType?: (number|null);
    }

    class JackpotAwardListReq implements IJackpotAwardListReq {
        constructor(p?: humanboy_proto.IJackpotAwardListReq);
        public roomType: number;
        public static create(properties?: humanboy_proto.IJackpotAwardListReq): humanboy_proto.JackpotAwardListReq;
        public static encode(m: humanboy_proto.JackpotAwardListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JackpotAwardListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JackpotAwardListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JackpotAwardListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JackpotAwardListReq;
        public static toObject(m: humanboy_proto.JackpotAwardListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJackpotAwardListResp {
        code?: (humanboy_proto.ErrorCode|null);
        luckyOne?: (humanboy_proto.AwardData|null);
        lastData?: (humanboy_proto.AwardData[]|null);
    }

    class JackpotAwardListResp implements IJackpotAwardListResp {
        constructor(p?: humanboy_proto.IJackpotAwardListResp);
        public code: humanboy_proto.ErrorCode;
        public luckyOne?: (humanboy_proto.AwardData|null);
        public lastData: humanboy_proto.AwardData[];
        public static create(properties?: humanboy_proto.IJackpotAwardListResp): humanboy_proto.JackpotAwardListResp;
        public static encode(m: humanboy_proto.JackpotAwardListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.JackpotAwardListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.JackpotAwardListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.JackpotAwardListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.JackpotAwardListResp;
        public static toObject(m: humanboy_proto.JackpotAwardListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAwardData {
        name?: (string|null);
        handLevel?: (humanboy_proto.CardResult|null);
        amount?: (number|null);
        timeStamp?: (number|null);
    }

    class AwardData implements IAwardData {
        constructor(p?: humanboy_proto.IAwardData);
        public name: string;
        public handLevel: humanboy_proto.CardResult;
        public amount: number;
        public timeStamp: number;
        public static create(properties?: humanboy_proto.IAwardData): humanboy_proto.AwardData;
        public static encode(m: humanboy_proto.AwardData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AwardData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AwardData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AwardData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AwardData;
        public static toObject(m: humanboy_proto.AwardData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHitJackpotAward {
        option?: (humanboy_proto.BetZoneOption|null);
        hitJackpotAwardData?: (humanboy_proto.HitJackpotAwardData[]|null);
    }

    class HitJackpotAward implements IHitJackpotAward {
        constructor(p?: humanboy_proto.IHitJackpotAward);
        public option: humanboy_proto.BetZoneOption;
        public hitJackpotAwardData: humanboy_proto.HitJackpotAwardData[];
        public static create(properties?: humanboy_proto.IHitJackpotAward): humanboy_proto.HitJackpotAward;
        public static encode(m: humanboy_proto.HitJackpotAward, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.HitJackpotAward, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.HitJackpotAward;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.HitJackpotAward;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.HitJackpotAward;
        public static toObject(m: humanboy_proto.HitJackpotAward, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHitJackpotAwardData {
        uid?: (number|null);
        amount?: (number|null);
    }

    class HitJackpotAwardData implements IHitJackpotAwardData {
        constructor(p?: humanboy_proto.IHitJackpotAwardData);
        public uid: number;
        public amount: number;
        public static create(properties?: humanboy_proto.IHitJackpotAwardData): humanboy_proto.HitJackpotAwardData;
        public static encode(m: humanboy_proto.HitJackpotAwardData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.HitJackpotAwardData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.HitJackpotAwardData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.HitJackpotAwardData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.HitJackpotAwardData;
        public static toObject(m: humanboy_proto.HitJackpotAwardData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameWillStartNotify {
        showMiddleUpDealerBtn?: (boolean|null);
        surplusStockNum?: (number|null);
        roundState?: (humanboy_proto.RoundState|null);
        leftSeconds?: (number|null);
        nextRoundEndStamp?: (number|null);
        dealer?: (humanboy_proto.DealerPlayerInfo[]|null);
    }

    class GameWillStartNotify implements IGameWillStartNotify {
        constructor(p?: humanboy_proto.IGameWillStartNotify);
        public showMiddleUpDealerBtn: boolean;
        public surplusStockNum: number;
        public roundState: humanboy_proto.RoundState;
        public leftSeconds: number;
        public nextRoundEndStamp: number;
        public dealer: humanboy_proto.DealerPlayerInfo[];
        public static create(properties?: humanboy_proto.IGameWillStartNotify): humanboy_proto.GameWillStartNotify;
        public static encode(m: humanboy_proto.GameWillStartNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.GameWillStartNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.GameWillStartNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.GameWillStartNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.GameWillStartNotify;
        public static toObject(m: humanboy_proto.GameWillStartNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IKickDealerApplyNotify {
        reason?: (humanboy_proto.KickApplyDealerReason|null);
        extension?: (string|null);
    }

    class KickDealerApplyNotify implements IKickDealerApplyNotify {
        constructor(p?: humanboy_proto.IKickDealerApplyNotify);
        public reason: humanboy_proto.KickApplyDealerReason;
        public extension: string;
        public static create(properties?: humanboy_proto.IKickDealerApplyNotify): humanboy_proto.KickDealerApplyNotify;
        public static encode(m: humanboy_proto.KickDealerApplyNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.KickDealerApplyNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.KickDealerApplyNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.KickDealerApplyNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.KickDealerApplyNotify;
        public static toObject(m: humanboy_proto.KickDealerApplyNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetGameOptionReq {
        autoLevel?: (humanboy_proto.AutoBetLevel|null);
        betCoinOption?: (number[]|null);
    }

    class SetGameOptionReq implements ISetGameOptionReq {
        constructor(p?: humanboy_proto.ISetGameOptionReq);
        public autoLevel: humanboy_proto.AutoBetLevel;
        public betCoinOption: number[];
        public static create(properties?: humanboy_proto.ISetGameOptionReq): humanboy_proto.SetGameOptionReq;
        public static encode(m: humanboy_proto.SetGameOptionReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.SetGameOptionReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.SetGameOptionReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.SetGameOptionReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.SetGameOptionReq;
        public static toObject(m: humanboy_proto.SetGameOptionReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetGameOptionResp {
        code?: (humanboy_proto.ErrorCode|null);
        autoLevel?: (humanboy_proto.AutoBetLevel|null);
        betCoinOption?: (number[]|null);
    }

    class SetGameOptionResp implements ISetGameOptionResp {
        constructor(p?: humanboy_proto.ISetGameOptionResp);
        public code: humanboy_proto.ErrorCode;
        public autoLevel: humanboy_proto.AutoBetLevel;
        public betCoinOption: number[];
        public static create(properties?: humanboy_proto.ISetGameOptionResp): humanboy_proto.SetGameOptionResp;
        public static encode(m: humanboy_proto.SetGameOptionResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.SetGameOptionResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.SetGameOptionResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.SetGameOptionResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.SetGameOptionResp;
        public static toObject(m: humanboy_proto.SetGameOptionResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISendExpressionReq {
        id?: (number|null);
        toUid?: (number|null);
    }

    class SendExpressionReq implements ISendExpressionReq {
        constructor(p?: humanboy_proto.ISendExpressionReq);
        public id: number;
        public toUid: number;
        public static create(properties?: humanboy_proto.ISendExpressionReq): humanboy_proto.SendExpressionReq;
        public static encode(m: humanboy_proto.SendExpressionReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.SendExpressionReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.SendExpressionReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.SendExpressionReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.SendExpressionReq;
        public static toObject(m: humanboy_proto.SendExpressionReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISendExpressionResp {
        code?: (humanboy_proto.ErrorCode|null);
        coin?: (number|null);
    }

    class SendExpressionResp implements ISendExpressionResp {
        constructor(p?: humanboy_proto.ISendExpressionResp);
        public code: humanboy_proto.ErrorCode;
        public coin: number;
        public static create(properties?: humanboy_proto.ISendExpressionResp): humanboy_proto.SendExpressionResp;
        public static encode(m: humanboy_proto.SendExpressionResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.SendExpressionResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.SendExpressionResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.SendExpressionResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.SendExpressionResp;
        public static toObject(m: humanboy_proto.SendExpressionResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISendExpressionNotify {
        uid?: (number|null);
        toUid?: (number|null);
        coin?: (number|null);
    }

    class SendExpressionNotify implements ISendExpressionNotify {
        constructor(p?: humanboy_proto.ISendExpressionNotify);
        public uid: number;
        public toUid: number;
        public coin: number;
        public static create(properties?: humanboy_proto.ISendExpressionNotify): humanboy_proto.SendExpressionNotify;
        public static encode(m: humanboy_proto.SendExpressionNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.SendExpressionNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.SendExpressionNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.SendExpressionNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.SendExpressionNotify;
        public static toObject(m: humanboy_proto.SendExpressionNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetReq {
    }

    class AdvanceAutoBetReq implements IAdvanceAutoBetReq {
        constructor(p?: humanboy_proto.IAdvanceAutoBetReq);
        public static create(properties?: humanboy_proto.IAdvanceAutoBetReq): humanboy_proto.AdvanceAutoBetReq;
        public static encode(m: humanboy_proto.AdvanceAutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AdvanceAutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AdvanceAutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AdvanceAutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AdvanceAutoBetReq;
        public static toObject(m: humanboy_proto.AdvanceAutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetRsp {
        code?: (humanboy_proto.ErrorCode|null);
        usedAutoBetCount?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AdvanceAutoBetRsp implements IAdvanceAutoBetRsp {
        constructor(p?: humanboy_proto.IAdvanceAutoBetRsp);
        public code: humanboy_proto.ErrorCode;
        public usedAutoBetCount: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: humanboy_proto.IAdvanceAutoBetRsp): humanboy_proto.AdvanceAutoBetRsp;
        public static encode(m: humanboy_proto.AdvanceAutoBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AdvanceAutoBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AdvanceAutoBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AdvanceAutoBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AdvanceAutoBetRsp;
        public static toObject(m: humanboy_proto.AdvanceAutoBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelAdvanceAutoBetReq {
    }

    class CancelAdvanceAutoBetReq implements ICancelAdvanceAutoBetReq {
        constructor(p?: humanboy_proto.ICancelAdvanceAutoBetReq);
        public static create(properties?: humanboy_proto.ICancelAdvanceAutoBetReq): humanboy_proto.CancelAdvanceAutoBetReq;
        public static encode(m: humanboy_proto.CancelAdvanceAutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.CancelAdvanceAutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.CancelAdvanceAutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.CancelAdvanceAutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.CancelAdvanceAutoBetReq;
        public static toObject(m: humanboy_proto.CancelAdvanceAutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelAdvanceAutoBetRsp {
        code?: (humanboy_proto.ErrorCode|null);
        is_manual?: (boolean|null);
    }

    class CancelAdvanceAutoBetRsp implements ICancelAdvanceAutoBetRsp {
        constructor(p?: humanboy_proto.ICancelAdvanceAutoBetRsp);
        public code: humanboy_proto.ErrorCode;
        public is_manual: boolean;
        public static create(properties?: humanboy_proto.ICancelAdvanceAutoBetRsp): humanboy_proto.CancelAdvanceAutoBetRsp;
        public static encode(m: humanboy_proto.CancelAdvanceAutoBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.CancelAdvanceAutoBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.CancelAdvanceAutoBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.CancelAdvanceAutoBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.CancelAdvanceAutoBetRsp;
        public static toObject(m: humanboy_proto.CancelAdvanceAutoBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetSetReq {
        count?: (number|null);
    }

    class AdvanceAutoBetSetReq implements IAdvanceAutoBetSetReq {
        constructor(p?: humanboy_proto.IAdvanceAutoBetSetReq);
        public count: number;
        public static create(properties?: humanboy_proto.IAdvanceAutoBetSetReq): humanboy_proto.AdvanceAutoBetSetReq;
        public static encode(m: humanboy_proto.AdvanceAutoBetSetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AdvanceAutoBetSetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AdvanceAutoBetSetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AdvanceAutoBetSetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AdvanceAutoBetSetReq;
        public static toObject(m: humanboy_proto.AdvanceAutoBetSetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetSetRsp {
        code?: (humanboy_proto.ErrorCode|null);
        count?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AdvanceAutoBetSetRsp implements IAdvanceAutoBetSetRsp {
        constructor(p?: humanboy_proto.IAdvanceAutoBetSetRsp);
        public code: humanboy_proto.ErrorCode;
        public count: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: humanboy_proto.IAdvanceAutoBetSetRsp): humanboy_proto.AdvanceAutoBetSetRsp;
        public static encode(m: humanboy_proto.AdvanceAutoBetSetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.AdvanceAutoBetSetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.AdvanceAutoBetSetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.AdvanceAutoBetSetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.AdvanceAutoBetSetRsp;
        public static toObject(m: humanboy_proto.AdvanceAutoBetSetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserPointsChangeNotice {
        change_points?: (number|null);
    }

    class UserPointsChangeNotice implements IUserPointsChangeNotice {
        constructor(p?: humanboy_proto.IUserPointsChangeNotice);
        public change_points: number;
        public static create(properties?: humanboy_proto.IUserPointsChangeNotice): humanboy_proto.UserPointsChangeNotice;
        public static encode(m: humanboy_proto.UserPointsChangeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: humanboy_proto.UserPointsChangeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): humanboy_proto.UserPointsChangeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): humanboy_proto.UserPointsChangeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): humanboy_proto.UserPointsChangeNotice;
        public static toObject(m: humanboy_proto.UserPointsChangeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
