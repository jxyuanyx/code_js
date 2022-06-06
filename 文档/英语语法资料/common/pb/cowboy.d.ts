import * as $protobuf from "protobufjs";
export namespace cowboy_proto {

    enum RoomLevel {
        RoomLevel_DUMMY = 0,
        Small = 1,
        Middle = 2,
        Big = 3
    }

    enum RoleName {
        RoleName_DUMMY = 0,
        Red = 1,
        Blue = 2
    }

    enum RoundState {
        RoundState_DUMMY = 0,
        GAME_PENDING = 1,
        NEW_ROUND = 2,
        BET = 3,
        WAIT_NEXT_ROUND = 4
    }

    enum BetZone {
        ZONE_DUMMY = 0,
        WIN = 10,
        HOLE_CARD = 20,
        FIVE_CARD = 30
    }

    enum BetZoneOption {
        BetZoneOption_DUMMY = 0,
        WIN_BEGIN = 100,
        RED_WIN = 101,
        BLUE_WIN = 102,
        EQUAL = 103,
        WIN_END = 199,
        HOLE_BEGIN = 200,
        HOLE_SAME = 203,
        HOLE_A = 205,
        HOLE_3_TONG_SAME_SHUN = 206,
        HOLE_END = 299,
        FIVE_BEGIN = 300,
        FIVE_NONE_1DUI = 301,
        FIVE_2DUI = 302,
        FIVE_3_SHUN_TONG_HUA = 303,
        FIVE_3_2 = 304,
        FIVE_KING_TONG_HUA_SHUN_4 = 305,
        FIVE_END = 399
    }

    enum CMD {
        CMD_DUMMY = 0,
        LOGIN_GAME_REQ = 30000,
        LOGIN_GAME_RESP = 30001,
        HEART_BEAT_REQ = 30004,
        HEART_BEAT_RESP = 30005,
        JOIN_ROOM_REQ = 30007,
        JOIN_ROOM_RESP = 30008,
        GAME_LIST_REQ = 30009,
        GAME_LIST_RESP = 30010,
        GAME_DATA_SYN = 30011,
        DEAL_NOTIFY = 30012,
        BET_REQ = 30013,
        BET_RESP = 30014,
        BET_NOTIFY = 30015,
        GAME_ROUND_END_NOTIFY = 30016,
        LEAVE_ROOM_REQ = 30018,
        LEAVE_ROOM_RESP = 30019,
        LEAVE_ROOM_NOTIFY = 30020,
        CONN_CLOSE_REQ = 30022,
        ROOM_TREND_REQ = 30023,
        ROOM_TREND_RSP = 30024,
        ROOM_TREND_NOTICE = 30025,
        START_BET_NOTIFY = 30026,
        AUTO_BET_REQ = 30029,
        AUTO_BET_RESP = 30030,
        AUTO_BET_NOTIFY = 30031,
        PLAYER_LIST_REQ = 30032,
        PLAYER_LIST_RESP = 30033,
        MERGE_AUTO_BET_NOTIFY = 30036,
        KICK_NOTIFY = 30037,
        ROOM_TREND_ROAD_REQ = 30038,
        ROOM_TREND_ROAD_RSP = 30039,
        ROOM_TREND_ROAD_NOTICE = 30040,
        AUTO_OPEN_ROADS_REQ = 30041,
        AUTO_OPEN_ROADS_RSP = 30042,
        SET_GAME_OPTION_REQ = 30044,
        SET_GAME_OPTION_RSP = 30045,
        START_SETTLEMENT_NOTIFY = 30047,
        ADVANCE_AUTO_BET_REQ = 30050,
        ADVANCE_AUTO_BET_RSP = 30051,
        CANCEL_ADVANCE_AUTO_BET_REQ = 30052,
        CANCEL_ADVANCE_AUTO_BET_RSP = 30053,
        ADVANCE_AUTO_BET_SET_REQ = 30054,
        ADVANCE_AUTO_BET_SET_RSP = 30055,
        USER_POINTS_CHANGE_NOTICE = 30056
    }

    enum ErrorCode {
        ErrorCode_DUMMY = 0,
        OK = 1,
        ROOM_WITHOUT_YOU = 31000,
        LOW_VERSION = 31001,
        INVALID_TOKEN = 31002,
        SERVER_BUSY = 31003,
        WITHOUT_LOGIN = 31004,
        ROOM_NOT_MATCH = 31005,
        ROOM_NOT_EXIST = 31006,
        BET_EXCEED_LIMIT = 31007,
        ROOM_PLAYER_LIMIT = 31008,
        NO_BET = 31009,
        BET_AMOUNT_NOT_MATCH = 31010,
        NO_MONEY = 31011,
        BET_BAD_PARAM = 31012,
        STOP_SERVICE = 31013,
        NOT_BET_WHEN_AUTO_BET = 31014,
        BET_TOO_SMALL = 31015,
        BET_COUNT_LIMIT = 31016,
        AUTO_BET_LIMIT = 31017,
        TOO_MANY_PEOPLE = 31018,
        BAD_REQ_PARAM = 31019,
        NO_SET_ADVANCE_AUTO_BET = 31020,
        AUTO_BET_COUNT_LIMIT = 31021,
        AUTO_BET_NO_MONEY = 31022,
        AUTO_BET_EXCEED_LIMIT = 31023,
        ROOM_SYSTEM_FORCE_CLOSED = 31024,
        IN_CALM_DOWN = 31025
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

    enum Kick {
        Kick_DUMMY = 0,
        IDLE_LONG_TIME = 1,
        Stop_World = 2
    }

    enum AutoBetLevel {
        Level_Normal = 0,
        Level_Advance = 1
    }

    interface IStartSettlementNotify {
    }

    class StartSettlementNotify implements IStartSettlementNotify {
        constructor(p?: cowboy_proto.IStartSettlementNotify);
        public static create(properties?: cowboy_proto.IStartSettlementNotify): cowboy_proto.StartSettlementNotify;
        public static encode(m: cowboy_proto.StartSettlementNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.StartSettlementNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.StartSettlementNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.StartSettlementNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.StartSettlementNotify;
        public static toObject(m: cowboy_proto.StartSettlementNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICardItem {
        number?: (number|null);
        suit?: (number|null);
    }

    class CardItem implements ICardItem {
        constructor(p?: cowboy_proto.ICardItem);
        public number: number;
        public suit: number;
        public static create(properties?: cowboy_proto.ICardItem): cowboy_proto.CardItem;
        public static encode(m: cowboy_proto.CardItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.CardItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.CardItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.CardItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.CardItem;
        public static toObject(m: cowboy_proto.CardItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatReq {
        uid?: (number|null);
    }

    class HeartBeatReq implements IHeartBeatReq {
        constructor(p?: cowboy_proto.IHeartBeatReq);
        public uid: number;
        public static create(properties?: cowboy_proto.IHeartBeatReq): cowboy_proto.HeartBeatReq;
        public static encode(m: cowboy_proto.HeartBeatReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.HeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.HeartBeatReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.HeartBeatReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.HeartBeatReq;
        public static toObject(m: cowboy_proto.HeartBeatReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatResp {
        uid?: (number|null);
        timestamp?: (number|null);
    }

    class HeartBeatResp implements IHeartBeatResp {
        constructor(p?: cowboy_proto.IHeartBeatResp);
        public uid: number;
        public timestamp: number;
        public static create(properties?: cowboy_proto.IHeartBeatResp): cowboy_proto.HeartBeatResp;
        public static encode(m: cowboy_proto.HeartBeatResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.HeartBeatResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.HeartBeatResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.HeartBeatResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.HeartBeatResp;
        public static toObject(m: cowboy_proto.HeartBeatResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginReq {
        version?: (string|null);
        token?: (string|null);
        client_type?: (cowboy_proto.ClientType|null);
    }

    class LoginReq implements ILoginReq {
        constructor(p?: cowboy_proto.ILoginReq);
        public version: string;
        public token: string;
        public client_type: cowboy_proto.ClientType;
        public static create(properties?: cowboy_proto.ILoginReq): cowboy_proto.LoginReq;
        public static encode(m: cowboy_proto.LoginReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.LoginReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.LoginReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.LoginReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.LoginReq;
        public static toObject(m: cowboy_proto.LoginReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginResp {
        code?: (cowboy_proto.ErrorCode|null);
        roomid?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class LoginResp implements ILoginResp {
        constructor(p?: cowboy_proto.ILoginResp);
        public code: cowboy_proto.ErrorCode;
        public roomid: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: cowboy_proto.ILoginResp): cowboy_proto.LoginResp;
        public static encode(m: cowboy_proto.LoginResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.LoginResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.LoginResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.LoginResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.LoginResp;
        public static toObject(m: cowboy_proto.LoginResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomReq {
        roomid?: (number|null);
    }

    class JoinRoomReq implements IJoinRoomReq {
        constructor(p?: cowboy_proto.IJoinRoomReq);
        public roomid: number;
        public static create(properties?: cowboy_proto.IJoinRoomReq): cowboy_proto.JoinRoomReq;
        public static encode(m: cowboy_proto.JoinRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.JoinRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.JoinRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.JoinRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.JoinRoomReq;
        public static toObject(m: cowboy_proto.JoinRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomResp {
        code?: (cowboy_proto.ErrorCode|null);
        roomid?: (number|null);
    }

    class JoinRoomResp implements IJoinRoomResp {
        constructor(p?: cowboy_proto.IJoinRoomResp);
        public code: cowboy_proto.ErrorCode;
        public roomid: number;
        public static create(properties?: cowboy_proto.IJoinRoomResp): cowboy_proto.JoinRoomResp;
        public static encode(m: cowboy_proto.JoinRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.JoinRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.JoinRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.JoinRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.JoinRoomResp;
        public static toObject(m: cowboy_proto.JoinRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomParam {
        roomid?: (number|null);
        amountLevel?: (number[]|null);
        oddsDetail?: (cowboy_proto.OddsDetail[]|null);
        limitPlayers?: (number|null);
        deskType?: (number|null);
        smallBet?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        totalAmountLevel?: (number[]|null);
        pictureVn?: (string[]|null);
        ruleByLanguage?: (cowboy_proto.LanguageItem[]|null);
        langVersion?: (number|null);
        rulePic?: (string|null);
    }

    class RoomParam implements IRoomParam {
        constructor(p?: cowboy_proto.IRoomParam);
        public roomid: number;
        public amountLevel: number[];
        public oddsDetail: cowboy_proto.OddsDetail[];
        public limitPlayers: number;
        public deskType: number;
        public smallBet: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public totalAmountLevel: number[];
        public pictureVn: string[];
        public ruleByLanguage: cowboy_proto.LanguageItem[];
        public langVersion: number;
        public rulePic: string;
        public static create(properties?: cowboy_proto.IRoomParam): cowboy_proto.RoomParam;
        public static encode(m: cowboy_proto.RoomParam, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomParam, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomParam;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomParam;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomParam;
        public static toObject(m: cowboy_proto.RoomParam, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILanguageItem {
        lang?: (string|null);
        value?: (string|null);
    }

    class LanguageItem implements ILanguageItem {
        constructor(p?: cowboy_proto.ILanguageItem);
        public lang: string;
        public value: string;
        public static create(properties?: cowboy_proto.ILanguageItem): cowboy_proto.LanguageItem;
        public static encode(m: cowboy_proto.LanguageItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.LanguageItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.LanguageItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.LanguageItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.LanguageItem;
        public static toObject(m: cowboy_proto.LanguageItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IZoneLimit {
        zone?: (cowboy_proto.BetZone|null);
        limit?: (number|null);
    }

    class ZoneLimit implements IZoneLimit {
        constructor(p?: cowboy_proto.IZoneLimit);
        public zone: cowboy_proto.BetZone;
        public limit: number;
        public static create(properties?: cowboy_proto.IZoneLimit): cowboy_proto.ZoneLimit;
        public static encode(m: cowboy_proto.ZoneLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.ZoneLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.ZoneLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.ZoneLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.ZoneLimit;
        public static toObject(m: cowboy_proto.ZoneLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOddsDetail {
        zone?: (cowboy_proto.BetZone|null);
        option?: (cowboy_proto.BetZoneOption|null);
        odds?: (number|null);
        limit?: (number|null);
    }

    class OddsDetail implements IOddsDetail {
        constructor(p?: cowboy_proto.IOddsDetail);
        public zone: cowboy_proto.BetZone;
        public option: cowboy_proto.BetZoneOption;
        public odds: number;
        public limit: number;
        public static create(properties?: cowboy_proto.IOddsDetail): cowboy_proto.OddsDetail;
        public static encode(m: cowboy_proto.OddsDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.OddsDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.OddsDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.OddsDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.OddsDetail;
        public static toObject(m: cowboy_proto.OddsDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionLimit {
        option?: (cowboy_proto.BetZoneOption|null);
        limitAmount?: (number|null);
    }

    class OptionLimit implements IOptionLimit {
        constructor(p?: cowboy_proto.IOptionLimit);
        public option: cowboy_proto.BetZoneOption;
        public limitAmount: number;
        public static create(properties?: cowboy_proto.IOptionLimit): cowboy_proto.OptionLimit;
        public static encode(m: cowboy_proto.OptionLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.OptionLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.OptionLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.OptionLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.OptionLimit;
        public static toObject(m: cowboy_proto.OptionLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameListReq {
    }

    class GameListReq implements IGameListReq {
        constructor(p?: cowboy_proto.IGameListReq);
        public static create(properties?: cowboy_proto.IGameListReq): cowboy_proto.GameListReq;
        public static encode(m: cowboy_proto.GameListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.GameListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.GameListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.GameListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.GameListReq;
        public static toObject(m: cowboy_proto.GameListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameListResp {
        gameList?: (cowboy_proto.GameSnapShot[]|null);
    }

    class GameListResp implements IGameListResp {
        constructor(p?: cowboy_proto.IGameListResp);
        public gameList: cowboy_proto.GameSnapShot[];
        public static create(properties?: cowboy_proto.IGameListResp): cowboy_proto.GameListResp;
        public static encode(m: cowboy_proto.GameListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.GameListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.GameListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.GameListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.GameListResp;
        public static toObject(m: cowboy_proto.GameListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameSnapShot {
        param?: (cowboy_proto.RoomParam|null);
        playerNum?: (number|null);
    }

    class GameSnapShot implements IGameSnapShot {
        constructor(p?: cowboy_proto.IGameSnapShot);
        public param?: (cowboy_proto.RoomParam|null);
        public playerNum: number;
        public static create(properties?: cowboy_proto.IGameSnapShot): cowboy_proto.GameSnapShot;
        public static encode(m: cowboy_proto.GameSnapShot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.GameSnapShot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.GameSnapShot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.GameSnapShot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.GameSnapShot;
        public static toObject(m: cowboy_proto.GameSnapShot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameDataSynNotify {
        param?: (cowboy_proto.RoomParam|null);
        optionInfo?: (cowboy_proto.BetOptionInfo[]|null);
        lastResult?: (cowboy_proto.BetZoneOption[]|null);
        curState?: (cowboy_proto.RoundState|null);
        nextRoundEndStamp?: (number|null);
        players?: (cowboy_proto.GamePlayer[]|null);
        publicCards?: (cowboy_proto.CardItem[]|null);
        canAuto?: (boolean|null);
        cachedNotifyMsg?: (cowboy_proto.GameRoundEndNotify|null);
        leftSeconds?: (number|null);
        openRoads?: (boolean|null);
        optionResults?: (cowboy_proto.OptionResults[]|null);
        betCoinOption?: (number[]|null);
        autoLevel?: (cowboy_proto.AutoBetLevel|null);
        usedAutoBetCount?: (number|null);
        selectAutoBetCount?: (number|null);
        AutoBetCountList?: (number[]|null);
        canAdvanceAuto?: (boolean|null);
        BetButtonLimitAmount?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class GameDataSynNotify implements IGameDataSynNotify {
        constructor(p?: cowboy_proto.IGameDataSynNotify);
        public param?: (cowboy_proto.RoomParam|null);
        public optionInfo: cowboy_proto.BetOptionInfo[];
        public lastResult: cowboy_proto.BetZoneOption[];
        public curState: cowboy_proto.RoundState;
        public nextRoundEndStamp: number;
        public players: cowboy_proto.GamePlayer[];
        public publicCards: cowboy_proto.CardItem[];
        public canAuto: boolean;
        public cachedNotifyMsg?: (cowboy_proto.GameRoundEndNotify|null);
        public leftSeconds: number;
        public openRoads: boolean;
        public optionResults: cowboy_proto.OptionResults[];
        public betCoinOption: number[];
        public autoLevel: cowboy_proto.AutoBetLevel;
        public usedAutoBetCount: number;
        public selectAutoBetCount: number;
        public AutoBetCountList: number[];
        public canAdvanceAuto: boolean;
        public BetButtonLimitAmount: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: cowboy_proto.IGameDataSynNotify): cowboy_proto.GameDataSynNotify;
        public static encode(m: cowboy_proto.GameDataSynNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.GameDataSynNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.GameDataSynNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.GameDataSynNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.GameDataSynNotify;
        public static toObject(m: cowboy_proto.GameDataSynNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetOptionInfo {
        option?: (cowboy_proto.BetZoneOption|null);
        selfBet?: (number|null);
        totalBet?: (number|null);
        amount?: (number[]|null);
    }

    class BetOptionInfo implements IBetOptionInfo {
        constructor(p?: cowboy_proto.IBetOptionInfo);
        public option: cowboy_proto.BetZoneOption;
        public selfBet: number;
        public totalBet: number;
        public amount: number[];
        public static create(properties?: cowboy_proto.IBetOptionInfo): cowboy_proto.BetOptionInfo;
        public static encode(m: cowboy_proto.BetOptionInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.BetOptionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.BetOptionInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.BetOptionInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.BetOptionInfo;
        public static toObject(m: cowboy_proto.BetOptionInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealNotify {
        card?: (cowboy_proto.CardItem|null);
        nextRoundEndStamp?: (number|null);
        players?: (cowboy_proto.GamePlayer[]|null);
        param?: (cowboy_proto.RoomParam|null);
        changed?: (boolean|null);
        lastResult?: (cowboy_proto.BetZoneOption[]|null);
        leftSeconds?: (number|null);
        canAuto?: (boolean|null);
    }

    class DealNotify implements IDealNotify {
        constructor(p?: cowboy_proto.IDealNotify);
        public card?: (cowboy_proto.CardItem|null);
        public nextRoundEndStamp: number;
        public players: cowboy_proto.GamePlayer[];
        public param?: (cowboy_proto.RoomParam|null);
        public changed: boolean;
        public lastResult: cowboy_proto.BetZoneOption[];
        public leftSeconds: number;
        public canAuto: boolean;
        public static create(properties?: cowboy_proto.IDealNotify): cowboy_proto.DealNotify;
        public static encode(m: cowboy_proto.DealNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.DealNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.DealNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.DealNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.DealNotify;
        public static toObject(m: cowboy_proto.DealNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetReq {
        detail?: (cowboy_proto.BetDetail|null);
    }

    class BetReq implements IBetReq {
        constructor(p?: cowboy_proto.IBetReq);
        public detail?: (cowboy_proto.BetDetail|null);
        public static create(properties?: cowboy_proto.IBetReq): cowboy_proto.BetReq;
        public static encode(m: cowboy_proto.BetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.BetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.BetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.BetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.BetReq;
        public static toObject(m: cowboy_proto.BetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetResp {
        code?: (cowboy_proto.ErrorCode|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class BetResp implements IBetResp {
        constructor(p?: cowboy_proto.IBetResp);
        public code: cowboy_proto.ErrorCode;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: cowboy_proto.IBetResp): cowboy_proto.BetResp;
        public static encode(m: cowboy_proto.BetResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.BetResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.BetResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.BetResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.BetResp;
        public static toObject(m: cowboy_proto.BetResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetNotify {
        uid?: (number|null);
        detail?: (cowboy_proto.BetDetail|null);
        curCoin?: (number|null);
        selfBet?: (number|null);
        totalBet?: (number|null);
        curUsdt?: (number|null);
    }

    class BetNotify implements IBetNotify {
        constructor(p?: cowboy_proto.IBetNotify);
        public uid: number;
        public detail?: (cowboy_proto.BetDetail|null);
        public curCoin: number;
        public selfBet: number;
        public totalBet: number;
        public curUsdt: number;
        public static create(properties?: cowboy_proto.IBetNotify): cowboy_proto.BetNotify;
        public static encode(m: cowboy_proto.BetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.BetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.BetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.BetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.BetNotify;
        public static toObject(m: cowboy_proto.BetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMergeAutoBetNotify {
        notify?: (cowboy_proto.BetNotify[]|null);
    }

    class MergeAutoBetNotify implements IMergeAutoBetNotify {
        constructor(p?: cowboy_proto.IMergeAutoBetNotify);
        public notify: cowboy_proto.BetNotify[];
        public static create(properties?: cowboy_proto.IMergeAutoBetNotify): cowboy_proto.MergeAutoBetNotify;
        public static encode(m: cowboy_proto.MergeAutoBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.MergeAutoBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.MergeAutoBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.MergeAutoBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.MergeAutoBetNotify;
        public static toObject(m: cowboy_proto.MergeAutoBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetDetail {
        zone?: (cowboy_proto.BetZone|null);
        option?: (cowboy_proto.BetZoneOption|null);
        betAmount?: (number|null);
        auto?: (boolean|null);
        betGameCoin?: (number|null);
    }

    class BetDetail implements IBetDetail {
        constructor(p?: cowboy_proto.IBetDetail);
        public zone: cowboy_proto.BetZone;
        public option: cowboy_proto.BetZoneOption;
        public betAmount: number;
        public auto: boolean;
        public betGameCoin: number;
        public static create(properties?: cowboy_proto.IBetDetail): cowboy_proto.BetDetail;
        public static encode(m: cowboy_proto.BetDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.BetDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.BetDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.BetDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.BetDetail;
        public static toObject(m: cowboy_proto.BetDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRoundEndNotify {
        playerHoleCard?: (cowboy_proto.PlayerHoleCard[]|null);
        publicCards?: (cowboy_proto.CardItem[]|null);
        playerSettle?: (cowboy_proto.PlayerSettle[]|null);
        roundResult?: (cowboy_proto.RoundResult|null);
        nextRoundEndStamp?: (number|null);
        matchOption?: (cowboy_proto.BetZoneOption[]|null);
        stopWorld?: (number|null);
        leftSeconds?: (number|null);
        otherPlayers?: (cowboy_proto.PlayerSettle|null);
        openRoads?: (boolean|null);
        optionResult?: (cowboy_proto.OptionResult[]|null);
        change_points?: (number|null);
        idle_roomid?: (number|null);
    }

    class GameRoundEndNotify implements IGameRoundEndNotify {
        constructor(p?: cowboy_proto.IGameRoundEndNotify);
        public playerHoleCard: cowboy_proto.PlayerHoleCard[];
        public publicCards: cowboy_proto.CardItem[];
        public playerSettle: cowboy_proto.PlayerSettle[];
        public roundResult?: (cowboy_proto.RoundResult|null);
        public nextRoundEndStamp: number;
        public matchOption: cowboy_proto.BetZoneOption[];
        public stopWorld: number;
        public leftSeconds: number;
        public otherPlayers?: (cowboy_proto.PlayerSettle|null);
        public openRoads: boolean;
        public optionResult: cowboy_proto.OptionResult[];
        public change_points: number;
        public idle_roomid: number;
        public static create(properties?: cowboy_proto.IGameRoundEndNotify): cowboy_proto.GameRoundEndNotify;
        public static encode(m: cowboy_proto.GameRoundEndNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.GameRoundEndNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.GameRoundEndNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.GameRoundEndNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.GameRoundEndNotify;
        public static toObject(m: cowboy_proto.GameRoundEndNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionResult {
        option?: (cowboy_proto.BetZoneOption|null);
        result?: (number|null);
        loseHand?: (number|null);
    }

    class OptionResult implements IOptionResult {
        constructor(p?: cowboy_proto.IOptionResult);
        public option: cowboy_proto.BetZoneOption;
        public result: number;
        public loseHand: number;
        public static create(properties?: cowboy_proto.IOptionResult): cowboy_proto.OptionResult;
        public static encode(m: cowboy_proto.OptionResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.OptionResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.OptionResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.OptionResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.OptionResult;
        public static toObject(m: cowboy_proto.OptionResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionResults {
        option?: (cowboy_proto.BetZoneOption|null);
        results?: (number[]|null);
        loseHand?: (number|null);
    }

    class OptionResults implements IOptionResults {
        constructor(p?: cowboy_proto.IOptionResults);
        public option: cowboy_proto.BetZoneOption;
        public results: number[];
        public loseHand: number;
        public static create(properties?: cowboy_proto.IOptionResults): cowboy_proto.OptionResults;
        public static encode(m: cowboy_proto.OptionResults, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.OptionResults, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.OptionResults;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.OptionResults;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.OptionResults;
        public static toObject(m: cowboy_proto.OptionResults, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoundResult {
        result?: (number|null);
        redLevel?: (number|null);
        blueLevel?: (number|null);
        Cards?: (cowboy_proto.CardItem[]|null);
    }

    class RoundResult implements IRoundResult {
        constructor(p?: cowboy_proto.IRoundResult);
        public result: number;
        public redLevel: number;
        public blueLevel: number;
        public Cards: cowboy_proto.CardItem[];
        public static create(properties?: cowboy_proto.IRoundResult): cowboy_proto.RoundResult;
        public static encode(m: cowboy_proto.RoundResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoundResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoundResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoundResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoundResult;
        public static toObject(m: cowboy_proto.RoundResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSettle {
        uid?: (number|null);
        settle?: (cowboy_proto.ZoneSettleDetail[]|null);
        totalWinAmount?: (number|null);
        curCoin?: (number|null);
        keepWinCount?: (number|null);
    }

    class PlayerSettle implements IPlayerSettle {
        constructor(p?: cowboy_proto.IPlayerSettle);
        public uid: number;
        public settle: cowboy_proto.ZoneSettleDetail[];
        public totalWinAmount: number;
        public curCoin: number;
        public keepWinCount: number;
        public static create(properties?: cowboy_proto.IPlayerSettle): cowboy_proto.PlayerSettle;
        public static encode(m: cowboy_proto.PlayerSettle, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.PlayerSettle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.PlayerSettle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.PlayerSettle;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.PlayerSettle;
        public static toObject(m: cowboy_proto.PlayerSettle, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IZoneSettleDetail {
        zone?: (cowboy_proto.BetZone|null);
        option?: (cowboy_proto.BetZoneOption|null);
        betAmount?: (number|null);
        winAmount?: (number|null);
        isAuto?: (number|null);
        betGameCoin?: (number|null);
    }

    class ZoneSettleDetail implements IZoneSettleDetail {
        constructor(p?: cowboy_proto.IZoneSettleDetail);
        public zone: cowboy_proto.BetZone;
        public option: cowboy_proto.BetZoneOption;
        public betAmount: number;
        public winAmount: number;
        public isAuto: number;
        public betGameCoin: number;
        public static create(properties?: cowboy_proto.IZoneSettleDetail): cowboy_proto.ZoneSettleDetail;
        public static encode(m: cowboy_proto.ZoneSettleDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.ZoneSettleDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.ZoneSettleDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.ZoneSettleDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.ZoneSettleDetail;
        public static toObject(m: cowboy_proto.ZoneSettleDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerHoleCard {
        name?: (cowboy_proto.RoleName|null);
        Cards?: (cowboy_proto.CardItem[]|null);
        option?: (cowboy_proto.BetZoneOption|null);
    }

    class PlayerHoleCard implements IPlayerHoleCard {
        constructor(p?: cowboy_proto.IPlayerHoleCard);
        public name: cowboy_proto.RoleName;
        public Cards: cowboy_proto.CardItem[];
        public option: cowboy_proto.BetZoneOption;
        public static create(properties?: cowboy_proto.IPlayerHoleCard): cowboy_proto.PlayerHoleCard;
        public static encode(m: cowboy_proto.PlayerHoleCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.PlayerHoleCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.PlayerHoleCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.PlayerHoleCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.PlayerHoleCard;
        public static toObject(m: cowboy_proto.PlayerHoleCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IConnClosed {
        Reason?: (number|null);
    }

    class ConnClosed implements IConnClosed {
        constructor(p?: cowboy_proto.IConnClosed);
        public Reason: number;
        public static create(properties?: cowboy_proto.IConnClosed): cowboy_proto.ConnClosed;
        public static encode(m: cowboy_proto.ConnClosed, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.ConnClosed, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.ConnClosed;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.ConnClosed;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.ConnClosed;
        public static toObject(m: cowboy_proto.ConnClosed, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveRoomReq {
    }

    class LeaveRoomReq implements ILeaveRoomReq {
        constructor(p?: cowboy_proto.ILeaveRoomReq);
        public static create(properties?: cowboy_proto.ILeaveRoomReq): cowboy_proto.LeaveRoomReq;
        public static encode(m: cowboy_proto.LeaveRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.LeaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.LeaveRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.LeaveRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.LeaveRoomReq;
        public static toObject(m: cowboy_proto.LeaveRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveRoomResp {
        code?: (cowboy_proto.ErrorCode|null);
    }

    class LeaveRoomResp implements ILeaveRoomResp {
        constructor(p?: cowboy_proto.ILeaveRoomResp);
        public code: cowboy_proto.ErrorCode;
        public static create(properties?: cowboy_proto.ILeaveRoomResp): cowboy_proto.LeaveRoomResp;
        public static encode(m: cowboy_proto.LeaveRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.LeaveRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.LeaveRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.LeaveRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.LeaveRoomResp;
        public static toObject(m: cowboy_proto.LeaveRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartBetNotify {
        nextRoundEndStamp?: (number|null);
        leftSeconds?: (number|null);
    }

    class StartBetNotify implements IStartBetNotify {
        constructor(p?: cowboy_proto.IStartBetNotify);
        public nextRoundEndStamp: number;
        public leftSeconds: number;
        public static create(properties?: cowboy_proto.IStartBetNotify): cowboy_proto.StartBetNotify;
        public static encode(m: cowboy_proto.StartBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.StartBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.StartBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.StartBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.StartBetNotify;
        public static toObject(m: cowboy_proto.StartBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendData {
        win?: (cowboy_proto.BetZoneOption|null);
        win_patterns?: (number|null);
        hand_num?: (number|null);
    }

    class TrendData implements ITrendData {
        constructor(p?: cowboy_proto.ITrendData);
        public win: cowboy_proto.BetZoneOption;
        public win_patterns: number;
        public hand_num: number;
        public static create(properties?: cowboy_proto.ITrendData): cowboy_proto.TrendData;
        public static encode(m: cowboy_proto.TrendData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.TrendData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.TrendData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.TrendData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.TrendData;
        public static toObject(m: cowboy_proto.TrendData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRoadReq {
        roomuuid?: (number|null);
    }

    class RoomTrendRoadReq implements IRoomTrendRoadReq {
        constructor(p?: cowboy_proto.IRoomTrendRoadReq);
        public roomuuid: number;
        public static create(properties?: cowboy_proto.IRoomTrendRoadReq): cowboy_proto.RoomTrendRoadReq;
        public static encode(m: cowboy_proto.RoomTrendRoadReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomTrendRoadReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomTrendRoadReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomTrendRoadReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomTrendRoadReq;
        public static toObject(m: cowboy_proto.RoomTrendRoadReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRoadRsp {
        code?: (cowboy_proto.ErrorCode|null);
    }

    class RoomTrendRoadRsp implements IRoomTrendRoadRsp {
        constructor(p?: cowboy_proto.IRoomTrendRoadRsp);
        public code: cowboy_proto.ErrorCode;
        public static create(properties?: cowboy_proto.IRoomTrendRoadRsp): cowboy_proto.RoomTrendRoadRsp;
        public static encode(m: cowboy_proto.RoomTrendRoadRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomTrendRoadRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomTrendRoadRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomTrendRoadRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomTrendRoadRsp;
        public static toObject(m: cowboy_proto.RoomTrendRoadRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRoadNotice {
        road?: (cowboy_proto.TrendRoad[]|null);
    }

    class RoomTrendRoadNotice implements IRoomTrendRoadNotice {
        constructor(p?: cowboy_proto.IRoomTrendRoadNotice);
        public road: cowboy_proto.TrendRoad[];
        public static create(properties?: cowboy_proto.IRoomTrendRoadNotice): cowboy_proto.RoomTrendRoadNotice;
        public static encode(m: cowboy_proto.RoomTrendRoadNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomTrendRoadNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomTrendRoadNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomTrendRoadNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomTrendRoadNotice;
        public static toObject(m: cowboy_proto.RoomTrendRoadNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendRoad {
        road_row?: (cowboy_proto.TrendRoadInfo[]|null);
    }

    class TrendRoad implements ITrendRoad {
        constructor(p?: cowboy_proto.ITrendRoad);
        public road_row: cowboy_proto.TrendRoadInfo[];
        public static create(properties?: cowboy_proto.ITrendRoad): cowboy_proto.TrendRoad;
        public static encode(m: cowboy_proto.TrendRoad, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.TrendRoad, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.TrendRoad;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.TrendRoad;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.TrendRoad;
        public static toObject(m: cowboy_proto.TrendRoad, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendRoadInfo {
        win?: (string|null);
        eqc?: (number|null);
    }

    class TrendRoadInfo implements ITrendRoadInfo {
        constructor(p?: cowboy_proto.ITrendRoadInfo);
        public win: string;
        public eqc: number;
        public static create(properties?: cowboy_proto.ITrendRoadInfo): cowboy_proto.TrendRoadInfo;
        public static encode(m: cowboy_proto.TrendRoadInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.TrendRoadInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.TrendRoadInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.TrendRoadInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.TrendRoadInfo;
        public static toObject(m: cowboy_proto.TrendRoadInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDailyStat {
        betzone_type?: (cowboy_proto.BetZoneOption|null);
        count?: (number|null);
        win_pattern?: (number|null);
    }

    class DailyStat implements IDailyStat {
        constructor(p?: cowboy_proto.IDailyStat);
        public betzone_type: cowboy_proto.BetZoneOption;
        public count: number;
        public win_pattern: number;
        public static create(properties?: cowboy_proto.IDailyStat): cowboy_proto.DailyStat;
        public static encode(m: cowboy_proto.DailyStat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.DailyStat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.DailyStat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.DailyStat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.DailyStat;
        public static toObject(m: cowboy_proto.DailyStat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendReq {
        roomuuid?: (number|null);
    }

    class RoomTrendReq implements IRoomTrendReq {
        constructor(p?: cowboy_proto.IRoomTrendReq);
        public roomuuid: number;
        public static create(properties?: cowboy_proto.IRoomTrendReq): cowboy_proto.RoomTrendReq;
        public static encode(m: cowboy_proto.RoomTrendReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomTrendReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomTrendReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomTrendReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomTrendReq;
        public static toObject(m: cowboy_proto.RoomTrendReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRsp {
        code?: (cowboy_proto.ErrorCode|null);
    }

    class RoomTrendRsp implements IRoomTrendRsp {
        constructor(p?: cowboy_proto.IRoomTrendRsp);
        public code: cowboy_proto.ErrorCode;
        public static create(properties?: cowboy_proto.IRoomTrendRsp): cowboy_proto.RoomTrendRsp;
        public static encode(m: cowboy_proto.RoomTrendRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomTrendRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomTrendRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomTrendRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomTrendRsp;
        public static toObject(m: cowboy_proto.RoomTrendRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendNotice {
        roomuuid?: (number|null);
        trend?: (cowboy_proto.TrendData[]|null);
        stats?: (cowboy_proto.DailyStat[]|null);
        road?: (cowboy_proto.TrendRoad[]|null);
        lastRow?: (number|null);
        lastCol?: (number|null);
    }

    class RoomTrendNotice implements IRoomTrendNotice {
        constructor(p?: cowboy_proto.IRoomTrendNotice);
        public roomuuid: number;
        public trend: cowboy_proto.TrendData[];
        public stats: cowboy_proto.DailyStat[];
        public road: cowboy_proto.TrendRoad[];
        public lastRow: number;
        public lastCol: number;
        public static create(properties?: cowboy_proto.IRoomTrendNotice): cowboy_proto.RoomTrendNotice;
        public static encode(m: cowboy_proto.RoomTrendNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.RoomTrendNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.RoomTrendNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.RoomTrendNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.RoomTrendNotice;
        public static toObject(m: cowboy_proto.RoomTrendNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetReq {
    }

    class AutoBetReq implements IAutoBetReq {
        constructor(p?: cowboy_proto.IAutoBetReq);
        public static create(properties?: cowboy_proto.IAutoBetReq): cowboy_proto.AutoBetReq;
        public static encode(m: cowboy_proto.AutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AutoBetReq;
        public static toObject(m: cowboy_proto.AutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetResp {
        code?: (cowboy_proto.ErrorCode|null);
        canAuto?: (boolean|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AutoBetResp implements IAutoBetResp {
        constructor(p?: cowboy_proto.IAutoBetResp);
        public code: cowboy_proto.ErrorCode;
        public canAuto: boolean;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: cowboy_proto.IAutoBetResp): cowboy_proto.AutoBetResp;
        public static encode(m: cowboy_proto.AutoBetResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AutoBetResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AutoBetResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AutoBetResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AutoBetResp;
        public static toObject(m: cowboy_proto.AutoBetResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetNotify {
        open?: (boolean|null);
    }

    class AutoBetNotify implements IAutoBetNotify {
        constructor(p?: cowboy_proto.IAutoBetNotify);
        public open: boolean;
        public static create(properties?: cowboy_proto.IAutoBetNotify): cowboy_proto.AutoBetNotify;
        public static encode(m: cowboy_proto.AutoBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AutoBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AutoBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AutoBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AutoBetNotify;
        public static toObject(m: cowboy_proto.AutoBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerListReq {
    }

    class PlayerListReq implements IPlayerListReq {
        constructor(p?: cowboy_proto.IPlayerListReq);
        public static create(properties?: cowboy_proto.IPlayerListReq): cowboy_proto.PlayerListReq;
        public static encode(m: cowboy_proto.PlayerListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.PlayerListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.PlayerListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.PlayerListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.PlayerListReq;
        public static toObject(m: cowboy_proto.PlayerListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerListResp {
        code?: (cowboy_proto.ErrorCode|null);
        gamePlayers?: (cowboy_proto.GamePlayer[]|null);
        self?: (cowboy_proto.GamePlayer|null);
        playerNum?: (number|null);
    }

    class PlayerListResp implements IPlayerListResp {
        constructor(p?: cowboy_proto.IPlayerListResp);
        public code: cowboy_proto.ErrorCode;
        public gamePlayers: cowboy_proto.GamePlayer[];
        public self?: (cowboy_proto.GamePlayer|null);
        public playerNum: number;
        public static create(properties?: cowboy_proto.IPlayerListResp): cowboy_proto.PlayerListResp;
        public static encode(m: cowboy_proto.PlayerListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.PlayerListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.PlayerListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.PlayerListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.PlayerListResp;
        public static toObject(m: cowboy_proto.PlayerListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
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
    }

    class GamePlayer implements IGamePlayer {
        constructor(p?: cowboy_proto.IGamePlayer);
        public uid: number;
        public name: string;
        public head: string;
        public totalBetAmount: number;
        public winCount: number;
        public rank: number;
        public curCoin: number;
        public keepWinCount: number;
        public curUsdt: number;
        public static create(properties?: cowboy_proto.IGamePlayer): cowboy_proto.GamePlayer;
        public static encode(m: cowboy_proto.GamePlayer, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.GamePlayer, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.GamePlayer;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.GamePlayer;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.GamePlayer;
        public static toObject(m: cowboy_proto.GamePlayer, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IKickNotify {
        kickType?: (cowboy_proto.Kick|null);
        desc?: (string|null);
        idle_roomid?: (number|null);
    }

    class KickNotify implements IKickNotify {
        constructor(p?: cowboy_proto.IKickNotify);
        public kickType: cowboy_proto.Kick;
        public desc: string;
        public idle_roomid: number;
        public static create(properties?: cowboy_proto.IKickNotify): cowboy_proto.KickNotify;
        public static encode(m: cowboy_proto.KickNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.KickNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.KickNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.KickNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.KickNotify;
        public static toObject(m: cowboy_proto.KickNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoOpenRoadsReq {
        open?: (boolean|null);
    }

    class AutoOpenRoadsReq implements IAutoOpenRoadsReq {
        constructor(p?: cowboy_proto.IAutoOpenRoadsReq);
        public open: boolean;
        public static create(properties?: cowboy_proto.IAutoOpenRoadsReq): cowboy_proto.AutoOpenRoadsReq;
        public static encode(m: cowboy_proto.AutoOpenRoadsReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AutoOpenRoadsReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AutoOpenRoadsReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AutoOpenRoadsReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AutoOpenRoadsReq;
        public static toObject(m: cowboy_proto.AutoOpenRoadsReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoOpenRoadsResp {
        code?: (cowboy_proto.ErrorCode|null);
        open?: (boolean|null);
    }

    class AutoOpenRoadsResp implements IAutoOpenRoadsResp {
        constructor(p?: cowboy_proto.IAutoOpenRoadsResp);
        public code: cowboy_proto.ErrorCode;
        public open: boolean;
        public static create(properties?: cowboy_proto.IAutoOpenRoadsResp): cowboy_proto.AutoOpenRoadsResp;
        public static encode(m: cowboy_proto.AutoOpenRoadsResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AutoOpenRoadsResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AutoOpenRoadsResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AutoOpenRoadsResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AutoOpenRoadsResp;
        public static toObject(m: cowboy_proto.AutoOpenRoadsResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetGameOptionReq {
        autoLevel?: (cowboy_proto.AutoBetLevel|null);
        betCoinOption?: (number[]|null);
    }

    class SetGameOptionReq implements ISetGameOptionReq {
        constructor(p?: cowboy_proto.ISetGameOptionReq);
        public autoLevel: cowboy_proto.AutoBetLevel;
        public betCoinOption: number[];
        public static create(properties?: cowboy_proto.ISetGameOptionReq): cowboy_proto.SetGameOptionReq;
        public static encode(m: cowboy_proto.SetGameOptionReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.SetGameOptionReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.SetGameOptionReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.SetGameOptionReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.SetGameOptionReq;
        public static toObject(m: cowboy_proto.SetGameOptionReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetGameOptionResp {
        code?: (cowboy_proto.ErrorCode|null);
        autoLevel?: (cowboy_proto.AutoBetLevel|null);
        betCoinOption?: (number[]|null);
    }

    class SetGameOptionResp implements ISetGameOptionResp {
        constructor(p?: cowboy_proto.ISetGameOptionResp);
        public code: cowboy_proto.ErrorCode;
        public autoLevel: cowboy_proto.AutoBetLevel;
        public betCoinOption: number[];
        public static create(properties?: cowboy_proto.ISetGameOptionResp): cowboy_proto.SetGameOptionResp;
        public static encode(m: cowboy_proto.SetGameOptionResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.SetGameOptionResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.SetGameOptionResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.SetGameOptionResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.SetGameOptionResp;
        public static toObject(m: cowboy_proto.SetGameOptionResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetReq {
    }

    class AdvanceAutoBetReq implements IAdvanceAutoBetReq {
        constructor(p?: cowboy_proto.IAdvanceAutoBetReq);
        public static create(properties?: cowboy_proto.IAdvanceAutoBetReq): cowboy_proto.AdvanceAutoBetReq;
        public static encode(m: cowboy_proto.AdvanceAutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AdvanceAutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AdvanceAutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AdvanceAutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AdvanceAutoBetReq;
        public static toObject(m: cowboy_proto.AdvanceAutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetRsp {
        code?: (cowboy_proto.ErrorCode|null);
        usedAutoBetCount?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AdvanceAutoBetRsp implements IAdvanceAutoBetRsp {
        constructor(p?: cowboy_proto.IAdvanceAutoBetRsp);
        public code: cowboy_proto.ErrorCode;
        public usedAutoBetCount: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: cowboy_proto.IAdvanceAutoBetRsp): cowboy_proto.AdvanceAutoBetRsp;
        public static encode(m: cowboy_proto.AdvanceAutoBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AdvanceAutoBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AdvanceAutoBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AdvanceAutoBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AdvanceAutoBetRsp;
        public static toObject(m: cowboy_proto.AdvanceAutoBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelAdvanceAutoBetReq {
    }

    class CancelAdvanceAutoBetReq implements ICancelAdvanceAutoBetReq {
        constructor(p?: cowboy_proto.ICancelAdvanceAutoBetReq);
        public static create(properties?: cowboy_proto.ICancelAdvanceAutoBetReq): cowboy_proto.CancelAdvanceAutoBetReq;
        public static encode(m: cowboy_proto.CancelAdvanceAutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.CancelAdvanceAutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.CancelAdvanceAutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.CancelAdvanceAutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.CancelAdvanceAutoBetReq;
        public static toObject(m: cowboy_proto.CancelAdvanceAutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelAdvanceAutoBetRsp {
        code?: (cowboy_proto.ErrorCode|null);
        is_manual?: (boolean|null);
    }

    class CancelAdvanceAutoBetRsp implements ICancelAdvanceAutoBetRsp {
        constructor(p?: cowboy_proto.ICancelAdvanceAutoBetRsp);
        public code: cowboy_proto.ErrorCode;
        public is_manual: boolean;
        public static create(properties?: cowboy_proto.ICancelAdvanceAutoBetRsp): cowboy_proto.CancelAdvanceAutoBetRsp;
        public static encode(m: cowboy_proto.CancelAdvanceAutoBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.CancelAdvanceAutoBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.CancelAdvanceAutoBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.CancelAdvanceAutoBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.CancelAdvanceAutoBetRsp;
        public static toObject(m: cowboy_proto.CancelAdvanceAutoBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetSetReq {
        count?: (number|null);
    }

    class AdvanceAutoBetSetReq implements IAdvanceAutoBetSetReq {
        constructor(p?: cowboy_proto.IAdvanceAutoBetSetReq);
        public count: number;
        public static create(properties?: cowboy_proto.IAdvanceAutoBetSetReq): cowboy_proto.AdvanceAutoBetSetReq;
        public static encode(m: cowboy_proto.AdvanceAutoBetSetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AdvanceAutoBetSetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AdvanceAutoBetSetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AdvanceAutoBetSetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AdvanceAutoBetSetReq;
        public static toObject(m: cowboy_proto.AdvanceAutoBetSetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetSetRsp {
        code?: (cowboy_proto.ErrorCode|null);
        count?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AdvanceAutoBetSetRsp implements IAdvanceAutoBetSetRsp {
        constructor(p?: cowboy_proto.IAdvanceAutoBetSetRsp);
        public code: cowboy_proto.ErrorCode;
        public count: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: cowboy_proto.IAdvanceAutoBetSetRsp): cowboy_proto.AdvanceAutoBetSetRsp;
        public static encode(m: cowboy_proto.AdvanceAutoBetSetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.AdvanceAutoBetSetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.AdvanceAutoBetSetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.AdvanceAutoBetSetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.AdvanceAutoBetSetRsp;
        public static toObject(m: cowboy_proto.AdvanceAutoBetSetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserPointsChangeNotice {
        change_points?: (number|null);
    }

    class UserPointsChangeNotice implements IUserPointsChangeNotice {
        constructor(p?: cowboy_proto.IUserPointsChangeNotice);
        public change_points: number;
        public static create(properties?: cowboy_proto.IUserPointsChangeNotice): cowboy_proto.UserPointsChangeNotice;
        public static encode(m: cowboy_proto.UserPointsChangeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: cowboy_proto.UserPointsChangeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cowboy_proto.UserPointsChangeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cowboy_proto.UserPointsChangeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): cowboy_proto.UserPointsChangeNotice;
        public static toObject(m: cowboy_proto.UserPointsChangeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
