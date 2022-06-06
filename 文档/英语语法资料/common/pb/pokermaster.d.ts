import * as $protobuf from "protobufjs";
export namespace pokermaster_proto {

    enum RoomLevel {
        RoomLevel_DUMMY = 0,
        Small = 1,
        Middle = 2,
        Big = 3
    }

    enum RoleName {
        RoleName_DUMMY = 0,
        Fisher = 1,
        Shark = 2
    }

    enum RoundState {
        RoundState_DUMMY = 0,
        GAME_PENDING = 1,
        NEW_ROUND = 2,
        SHOW_ODDS = 3,
        BET = 4,
        STOP_BET = 5,
        WAIT_NEXT_ROUND = 6,
        READY_GAME = 7
    }

    enum BetZoneOption {
        BetZoneOption_DUMMY = 0,
        WIN_BEGIN = 100,
        FISHER_WIN = 101,
        SHARK_WIN = 102,
        EQUAL = 103,
        WIN_END = 199,
        FIVE_BEGIN = 300,
        FIVE_NONE_1DUI = 301,
        FIVE_2DUI = 302,
        FIVE_SAN_SHUN_TONG = 303,
        FIVE_GOURD = 304,
        FIVE_KING_TONG_HUA_SHUN_4 = 305,
        FIVE_END = 399
    }

    enum GameMode {
        DUMMY = 0,
        NOAML = 1,
        SHORT = 3
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
        SHOW_ODDS_NOTIFY = 30056,
        STOP_BET_NOTIFY = 30057,
        BET_REVIEW_REQ = 30058,
        BET_REVIEW_RSP = 30059,
        READY_GAME_NOTIFY = 30060,
        USER_POINTS_CHANGE_NOTICE = 30061
    }

    enum ErrorCode {
        ErrorCode_DUMMY = 0,
        OK = 1,
        ROOM_WITHOUT_YOU = 51000,
        LOW_VERSION = 51001,
        INVALID_TOKEN = 51002,
        SERVER_BUSY = 51003,
        WITHOUT_LOGIN = 51004,
        ROOM_NOT_MATCH = 51005,
        ROOM_NOT_EXIST = 51006,
        BET_EXCEED_LIMIT = 51007,
        ROOM_PLAYER_LIMIT = 51008,
        NO_BET = 51009,
        BET_AMOUNT_NOT_MATCH = 51010,
        NO_MONEY = 51011,
        BET_BAD_PARAM = 51012,
        STOP_SERVICE = 51013,
        NOT_BET_WHEN_AUTO_BET = 51014,
        BET_TOO_SMALL = 51015,
        BET_COUNT_LIMIT = 51016,
        AUTO_BET_LIMIT = 51017,
        TOO_MANY_PEOPLE = 51018,
        BAD_REQ_PARAM = 51019,
        NO_SET_ADVANCE_AUTO_BET = 51020,
        AUTO_BET_COUNT_LIMIT = 51021,
        AUTO_BET_NO_MONEY = 51022,
        AUTO_BET_EXCEED_LIMIT = 51023,
        INNER_ERROR = 51024,
        ROOM_SYSTEM_FORCE_CLOSED = 51025,
        IN_CALM_DOWN = 51026
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
        constructor(p?: pokermaster_proto.IStartSettlementNotify);
        public static create(properties?: pokermaster_proto.IStartSettlementNotify): pokermaster_proto.StartSettlementNotify;
        public static encode(m: pokermaster_proto.StartSettlementNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.StartSettlementNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.StartSettlementNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.StartSettlementNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.StartSettlementNotify;
        public static toObject(m: pokermaster_proto.StartSettlementNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICardItem {
        number?: (number|null);
        suit?: (number|null);
    }

    class CardItem implements ICardItem {
        constructor(p?: pokermaster_proto.ICardItem);
        public number: number;
        public suit: number;
        public static create(properties?: pokermaster_proto.ICardItem): pokermaster_proto.CardItem;
        public static encode(m: pokermaster_proto.CardItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.CardItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.CardItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.CardItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.CardItem;
        public static toObject(m: pokermaster_proto.CardItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatReq {
        uid?: (number|null);
    }

    class HeartBeatReq implements IHeartBeatReq {
        constructor(p?: pokermaster_proto.IHeartBeatReq);
        public uid: number;
        public static create(properties?: pokermaster_proto.IHeartBeatReq): pokermaster_proto.HeartBeatReq;
        public static encode(m: pokermaster_proto.HeartBeatReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.HeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.HeartBeatReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.HeartBeatReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.HeartBeatReq;
        public static toObject(m: pokermaster_proto.HeartBeatReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IHeartBeatResp {
        uid?: (number|null);
        timestamp?: (number|null);
    }

    class HeartBeatResp implements IHeartBeatResp {
        constructor(p?: pokermaster_proto.IHeartBeatResp);
        public uid: number;
        public timestamp: number;
        public static create(properties?: pokermaster_proto.IHeartBeatResp): pokermaster_proto.HeartBeatResp;
        public static encode(m: pokermaster_proto.HeartBeatResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.HeartBeatResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.HeartBeatResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.HeartBeatResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.HeartBeatResp;
        public static toObject(m: pokermaster_proto.HeartBeatResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginReq {
        version?: (string|null);
        token?: (string|null);
        client_type?: (pokermaster_proto.ClientType|null);
    }

    class LoginReq implements ILoginReq {
        constructor(p?: pokermaster_proto.ILoginReq);
        public version: string;
        public token: string;
        public client_type: pokermaster_proto.ClientType;
        public static create(properties?: pokermaster_proto.ILoginReq): pokermaster_proto.LoginReq;
        public static encode(m: pokermaster_proto.LoginReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.LoginReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.LoginReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.LoginReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.LoginReq;
        public static toObject(m: pokermaster_proto.LoginReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILoginResp {
        code?: (pokermaster_proto.ErrorCode|null);
        roomid?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class LoginResp implements ILoginResp {
        constructor(p?: pokermaster_proto.ILoginResp);
        public code: pokermaster_proto.ErrorCode;
        public roomid: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: pokermaster_proto.ILoginResp): pokermaster_proto.LoginResp;
        public static encode(m: pokermaster_proto.LoginResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.LoginResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.LoginResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.LoginResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.LoginResp;
        public static toObject(m: pokermaster_proto.LoginResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomReq {
        roomid?: (number|null);
    }

    class JoinRoomReq implements IJoinRoomReq {
        constructor(p?: pokermaster_proto.IJoinRoomReq);
        public roomid: number;
        public static create(properties?: pokermaster_proto.IJoinRoomReq): pokermaster_proto.JoinRoomReq;
        public static encode(m: pokermaster_proto.JoinRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.JoinRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.JoinRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.JoinRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.JoinRoomReq;
        public static toObject(m: pokermaster_proto.JoinRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IJoinRoomResp {
        code?: (pokermaster_proto.ErrorCode|null);
        roomid?: (number|null);
    }

    class JoinRoomResp implements IJoinRoomResp {
        constructor(p?: pokermaster_proto.IJoinRoomResp);
        public code: pokermaster_proto.ErrorCode;
        public roomid: number;
        public static create(properties?: pokermaster_proto.IJoinRoomResp): pokermaster_proto.JoinRoomResp;
        public static encode(m: pokermaster_proto.JoinRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.JoinRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.JoinRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.JoinRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.JoinRoomResp;
        public static toObject(m: pokermaster_proto.JoinRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomParam {
        roomid?: (number|null);
        amountLevel?: (number[]|null);
        limitPlayers?: (number|null);
        deskType?: (number|null);
        smallBet?: (number|null);
        pictureCn?: (string[]|null);
        pictureEn?: (string[]|null);
        pictureThai?: (string[]|null);
        totalAmountLevel?: (number[]|null);
        pictureVn?: (string[]|null);
        gameMode?: (number|null);
        optionLimit?: (pokermaster_proto.OddsOptionLimit[]|null);
        ruleByLanguage?: (pokermaster_proto.LanguageItem[]|null);
        langVersion?: (number|null);
        rulePic?: (string|null);
    }

    class RoomParam implements IRoomParam {
        constructor(p?: pokermaster_proto.IRoomParam);
        public roomid: number;
        public amountLevel: number[];
        public limitPlayers: number;
        public deskType: number;
        public smallBet: number;
        public pictureCn: string[];
        public pictureEn: string[];
        public pictureThai: string[];
        public totalAmountLevel: number[];
        public pictureVn: string[];
        public gameMode: number;
        public optionLimit: pokermaster_proto.OddsOptionLimit[];
        public ruleByLanguage: pokermaster_proto.LanguageItem[];
        public langVersion: number;
        public rulePic: string;
        public static create(properties?: pokermaster_proto.IRoomParam): pokermaster_proto.RoomParam;
        public static encode(m: pokermaster_proto.RoomParam, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomParam, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomParam;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomParam;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomParam;
        public static toObject(m: pokermaster_proto.RoomParam, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILanguageItem {
        lang?: (string|null);
        value?: (string|null);
    }

    class LanguageItem implements ILanguageItem {
        constructor(p?: pokermaster_proto.ILanguageItem);
        public lang: string;
        public value: string;
        public static create(properties?: pokermaster_proto.ILanguageItem): pokermaster_proto.LanguageItem;
        public static encode(m: pokermaster_proto.LanguageItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.LanguageItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.LanguageItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.LanguageItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.LanguageItem;
        public static toObject(m: pokermaster_proto.LanguageItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOddsOptionLimit {
        minOdds?: (number|null);
        maxOdds?: (number|null);
        limitRed?: (number|null);
    }

    class OddsOptionLimit implements IOddsOptionLimit {
        constructor(p?: pokermaster_proto.IOddsOptionLimit);
        public minOdds: number;
        public maxOdds: number;
        public limitRed: number;
        public static create(properties?: pokermaster_proto.IOddsOptionLimit): pokermaster_proto.OddsOptionLimit;
        public static encode(m: pokermaster_proto.OddsOptionLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.OddsOptionLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.OddsOptionLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.OddsOptionLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.OddsOptionLimit;
        public static toObject(m: pokermaster_proto.OddsOptionLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IZoneLimit {
        limit?: (number|null);
    }

    class ZoneLimit implements IZoneLimit {
        constructor(p?: pokermaster_proto.IZoneLimit);
        public limit: number;
        public static create(properties?: pokermaster_proto.IZoneLimit): pokermaster_proto.ZoneLimit;
        public static encode(m: pokermaster_proto.ZoneLimit, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.ZoneLimit, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.ZoneLimit;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.ZoneLimit;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.ZoneLimit;
        public static toObject(m: pokermaster_proto.ZoneLimit, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOddsDetail {
        option?: (pokermaster_proto.BetZoneOption|null);
        odds?: (number|null);
    }

    class OddsDetail implements IOddsDetail {
        constructor(p?: pokermaster_proto.IOddsDetail);
        public option: pokermaster_proto.BetZoneOption;
        public odds: number;
        public static create(properties?: pokermaster_proto.IOddsDetail): pokermaster_proto.OddsDetail;
        public static encode(m: pokermaster_proto.OddsDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.OddsDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.OddsDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.OddsDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.OddsDetail;
        public static toObject(m: pokermaster_proto.OddsDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameListReq {
    }

    class GameListReq implements IGameListReq {
        constructor(p?: pokermaster_proto.IGameListReq);
        public static create(properties?: pokermaster_proto.IGameListReq): pokermaster_proto.GameListReq;
        public static encode(m: pokermaster_proto.GameListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.GameListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.GameListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.GameListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.GameListReq;
        public static toObject(m: pokermaster_proto.GameListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameListResp {
        gameList?: (pokermaster_proto.GameSnapShot[]|null);
    }

    class GameListResp implements IGameListResp {
        constructor(p?: pokermaster_proto.IGameListResp);
        public gameList: pokermaster_proto.GameSnapShot[];
        public static create(properties?: pokermaster_proto.IGameListResp): pokermaster_proto.GameListResp;
        public static encode(m: pokermaster_proto.GameListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.GameListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.GameListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.GameListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.GameListResp;
        public static toObject(m: pokermaster_proto.GameListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameSnapShot {
        param?: (pokermaster_proto.RoomParam|null);
        playerNum?: (number|null);
    }

    class GameSnapShot implements IGameSnapShot {
        constructor(p?: pokermaster_proto.IGameSnapShot);
        public param?: (pokermaster_proto.RoomParam|null);
        public playerNum: number;
        public static create(properties?: pokermaster_proto.IGameSnapShot): pokermaster_proto.GameSnapShot;
        public static encode(m: pokermaster_proto.GameSnapShot, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.GameSnapShot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.GameSnapShot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.GameSnapShot;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.GameSnapShot;
        public static toObject(m: pokermaster_proto.GameSnapShot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameDataSynNotify {
        param?: (pokermaster_proto.RoomParam|null);
        optionInfo?: (pokermaster_proto.BetOptionInfo[]|null);
        lastResult?: (pokermaster_proto.BetZoneOption[]|null);
        curState?: (pokermaster_proto.RoundState|null);
        nextRoundEndStamp?: (number|null);
        players?: (pokermaster_proto.GamePlayer[]|null);
        publicCards?: (pokermaster_proto.CardItem[]|null);
        canAuto?: (boolean|null);
        cachedNotifyMsg?: (pokermaster_proto.GameRoundEndNotify|null);
        leftSeconds?: (number|null);
        openRoads?: (boolean|null);
        optionResults?: (pokermaster_proto.OptionResults[]|null);
        betCoinOption?: (number[]|null);
        autoLevel?: (pokermaster_proto.AutoBetLevel|null);
        usedAutoBetCount?: (number|null);
        selectAutoBetCount?: (number|null);
        AutoBetCountList?: (number[]|null);
        canAdvanceAuto?: (boolean|null);
        BetButtonLimitAmount?: (number|null);
        fisherHoleCards?: (pokermaster_proto.CardItem[]|null);
        sharkHoleCards?: (pokermaster_proto.CardItem[]|null);
        squintMsg?: (pokermaster_proto.StopBetNotify|null);
        fortune?: (pokermaster_proto.PlayerFortune|null);
        oddsOp?: (pokermaster_proto.BetOptionsOdds[]|null);
        whoIsLeader?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class GameDataSynNotify implements IGameDataSynNotify {
        constructor(p?: pokermaster_proto.IGameDataSynNotify);
        public param?: (pokermaster_proto.RoomParam|null);
        public optionInfo: pokermaster_proto.BetOptionInfo[];
        public lastResult: pokermaster_proto.BetZoneOption[];
        public curState: pokermaster_proto.RoundState;
        public nextRoundEndStamp: number;
        public players: pokermaster_proto.GamePlayer[];
        public publicCards: pokermaster_proto.CardItem[];
        public canAuto: boolean;
        public cachedNotifyMsg?: (pokermaster_proto.GameRoundEndNotify|null);
        public leftSeconds: number;
        public openRoads: boolean;
        public optionResults: pokermaster_proto.OptionResults[];
        public betCoinOption: number[];
        public autoLevel: pokermaster_proto.AutoBetLevel;
        public usedAutoBetCount: number;
        public selectAutoBetCount: number;
        public AutoBetCountList: number[];
        public canAdvanceAuto: boolean;
        public BetButtonLimitAmount: number;
        public fisherHoleCards: pokermaster_proto.CardItem[];
        public sharkHoleCards: pokermaster_proto.CardItem[];
        public squintMsg?: (pokermaster_proto.StopBetNotify|null);
        public fortune?: (pokermaster_proto.PlayerFortune|null);
        public oddsOp: pokermaster_proto.BetOptionsOdds[];
        public whoIsLeader: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: pokermaster_proto.IGameDataSynNotify): pokermaster_proto.GameDataSynNotify;
        public static encode(m: pokermaster_proto.GameDataSynNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.GameDataSynNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.GameDataSynNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.GameDataSynNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.GameDataSynNotify;
        public static toObject(m: pokermaster_proto.GameDataSynNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetOptionInfo {
        option?: (pokermaster_proto.BetZoneOption|null);
        selfBet?: (number|null);
        totalBet?: (number|null);
        amount?: (number[]|null);
        odds?: (number|null);
        limitRed?: (number|null);
    }

    class BetOptionInfo implements IBetOptionInfo {
        constructor(p?: pokermaster_proto.IBetOptionInfo);
        public option: pokermaster_proto.BetZoneOption;
        public selfBet: number;
        public totalBet: number;
        public amount: number[];
        public odds: number;
        public limitRed: number;
        public static create(properties?: pokermaster_proto.IBetOptionInfo): pokermaster_proto.BetOptionInfo;
        public static encode(m: pokermaster_proto.BetOptionInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetOptionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetOptionInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetOptionInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetOptionInfo;
        public static toObject(m: pokermaster_proto.BetOptionInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDealNotify {
        nextRoundEndStamp?: (number|null);
        players?: (pokermaster_proto.GamePlayer[]|null);
        param?: (pokermaster_proto.RoomParam|null);
        changed?: (boolean|null);
        lastResult?: (pokermaster_proto.BetZoneOption[]|null);
        leftSeconds?: (number|null);
        canAuto?: (boolean|null);
        playerHoleCard?: (pokermaster_proto.PlayerHoleCard[]|null);
    }

    class DealNotify implements IDealNotify {
        constructor(p?: pokermaster_proto.IDealNotify);
        public nextRoundEndStamp: number;
        public players: pokermaster_proto.GamePlayer[];
        public param?: (pokermaster_proto.RoomParam|null);
        public changed: boolean;
        public lastResult: pokermaster_proto.BetZoneOption[];
        public leftSeconds: number;
        public canAuto: boolean;
        public playerHoleCard: pokermaster_proto.PlayerHoleCard[];
        public static create(properties?: pokermaster_proto.IDealNotify): pokermaster_proto.DealNotify;
        public static encode(m: pokermaster_proto.DealNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.DealNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.DealNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.DealNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.DealNotify;
        public static toObject(m: pokermaster_proto.DealNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetReq {
        detail?: (pokermaster_proto.BetDetail|null);
    }

    class BetReq implements IBetReq {
        constructor(p?: pokermaster_proto.IBetReq);
        public detail?: (pokermaster_proto.BetDetail|null);
        public static create(properties?: pokermaster_proto.IBetReq): pokermaster_proto.BetReq;
        public static encode(m: pokermaster_proto.BetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetReq;
        public static toObject(m: pokermaster_proto.BetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetResp {
        code?: (pokermaster_proto.ErrorCode|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class BetResp implements IBetResp {
        constructor(p?: pokermaster_proto.IBetResp);
        public code: pokermaster_proto.ErrorCode;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: pokermaster_proto.IBetResp): pokermaster_proto.BetResp;
        public static encode(m: pokermaster_proto.BetResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetResp;
        public static toObject(m: pokermaster_proto.BetResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetNotify {
        uid?: (number|null);
        detail?: (pokermaster_proto.BetDetail|null);
        curCoin?: (number|null);
        selfBet?: (number|null);
        totalBet?: (number|null);
        curUsdt?: (number|null);
    }

    class BetNotify implements IBetNotify {
        constructor(p?: pokermaster_proto.IBetNotify);
        public uid: number;
        public detail?: (pokermaster_proto.BetDetail|null);
        public curCoin: number;
        public selfBet: number;
        public totalBet: number;
        public curUsdt: number;
        public static create(properties?: pokermaster_proto.IBetNotify): pokermaster_proto.BetNotify;
        public static encode(m: pokermaster_proto.BetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetNotify;
        public static toObject(m: pokermaster_proto.BetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IMergeAutoBetNotify {
        notify?: (pokermaster_proto.BetNotify[]|null);
    }

    class MergeAutoBetNotify implements IMergeAutoBetNotify {
        constructor(p?: pokermaster_proto.IMergeAutoBetNotify);
        public notify: pokermaster_proto.BetNotify[];
        public static create(properties?: pokermaster_proto.IMergeAutoBetNotify): pokermaster_proto.MergeAutoBetNotify;
        public static encode(m: pokermaster_proto.MergeAutoBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.MergeAutoBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.MergeAutoBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.MergeAutoBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.MergeAutoBetNotify;
        public static toObject(m: pokermaster_proto.MergeAutoBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetDetail {
        option?: (pokermaster_proto.BetZoneOption|null);
        betAmount?: (number|null);
        auto?: (boolean|null);
        is_shot?: (boolean|null);
        win_amt?: (number|null);
        odds?: (number|null);
        betGameCoin?: (number|null);
    }

    class BetDetail implements IBetDetail {
        constructor(p?: pokermaster_proto.IBetDetail);
        public option: pokermaster_proto.BetZoneOption;
        public betAmount: number;
        public auto: boolean;
        public is_shot: boolean;
        public win_amt: number;
        public odds: number;
        public betGameCoin: number;
        public static create(properties?: pokermaster_proto.IBetDetail): pokermaster_proto.BetDetail;
        public static encode(m: pokermaster_proto.BetDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetDetail;
        public static toObject(m: pokermaster_proto.BetDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGameRoundEndNotify {
        playerSettle?: (pokermaster_proto.PlayerSettle[]|null);
        roundResult?: (pokermaster_proto.RoundResult|null);
        nextRoundEndStamp?: (number|null);
        stopWorld?: (number|null);
        leftSeconds?: (number|null);
        otherPlayers?: (pokermaster_proto.PlayerSettle|null);
        openRoads?: (boolean|null);
        optionResult?: (pokermaster_proto.OptionResult[]|null);
        fortune?: (pokermaster_proto.PlayerFortune|null);
        idle_roomid?: (number|null);
        change_points?: (number|null);
    }

    class GameRoundEndNotify implements IGameRoundEndNotify {
        constructor(p?: pokermaster_proto.IGameRoundEndNotify);
        public playerSettle: pokermaster_proto.PlayerSettle[];
        public roundResult?: (pokermaster_proto.RoundResult|null);
        public nextRoundEndStamp: number;
        public stopWorld: number;
        public leftSeconds: number;
        public otherPlayers?: (pokermaster_proto.PlayerSettle|null);
        public openRoads: boolean;
        public optionResult: pokermaster_proto.OptionResult[];
        public fortune?: (pokermaster_proto.PlayerFortune|null);
        public idle_roomid: number;
        public change_points: number;
        public static create(properties?: pokermaster_proto.IGameRoundEndNotify): pokermaster_proto.GameRoundEndNotify;
        public static encode(m: pokermaster_proto.GameRoundEndNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.GameRoundEndNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.GameRoundEndNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.GameRoundEndNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.GameRoundEndNotify;
        public static toObject(m: pokermaster_proto.GameRoundEndNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionResult {
        option?: (pokermaster_proto.BetZoneOption|null);
        result?: (number|null);
        loseHand?: (number|null);
    }

    class OptionResult implements IOptionResult {
        constructor(p?: pokermaster_proto.IOptionResult);
        public option: pokermaster_proto.BetZoneOption;
        public result: number;
        public loseHand: number;
        public static create(properties?: pokermaster_proto.IOptionResult): pokermaster_proto.OptionResult;
        public static encode(m: pokermaster_proto.OptionResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.OptionResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.OptionResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.OptionResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.OptionResult;
        public static toObject(m: pokermaster_proto.OptionResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOptionResults {
        option?: (pokermaster_proto.BetZoneOption|null);
        results?: (number[]|null);
        loseHand?: (number|null);
    }

    class OptionResults implements IOptionResults {
        constructor(p?: pokermaster_proto.IOptionResults);
        public option: pokermaster_proto.BetZoneOption;
        public results: number[];
        public loseHand: number;
        public static create(properties?: pokermaster_proto.IOptionResults): pokermaster_proto.OptionResults;
        public static encode(m: pokermaster_proto.OptionResults, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.OptionResults, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.OptionResults;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.OptionResults;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.OptionResults;
        public static toObject(m: pokermaster_proto.OptionResults, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum HandLevel {
        HAND_DUMMY = 0,
        HAND_NONE = 1,
        HAND_DUI = 2,
        HAND_DUI_TWO = 3,
        HAND_SANJO = 4,
        HAND_SHUN = 5,
        HAND_TONG = 6,
        HAND_HULU = 7,
        HAND_SIJO = 8,
        HAND_TONG_SHUN = 9,
        HAND_KING = 10
    }

    interface IRoundResult {
        winOp?: (pokermaster_proto.BetZoneOption|null);
        fisherLevel?: (number|null);
        sharkLevel?: (number|null);
        Cards?: (pokermaster_proto.CardItem[]|null);
    }

    class RoundResult implements IRoundResult {
        constructor(p?: pokermaster_proto.IRoundResult);
        public winOp: pokermaster_proto.BetZoneOption;
        public fisherLevel: number;
        public sharkLevel: number;
        public Cards: pokermaster_proto.CardItem[];
        public static create(properties?: pokermaster_proto.IRoundResult): pokermaster_proto.RoundResult;
        public static encode(m: pokermaster_proto.RoundResult, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoundResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoundResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoundResult;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoundResult;
        public static toObject(m: pokermaster_proto.RoundResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerSettle {
        uid?: (number|null);
        settle?: (pokermaster_proto.ZoneSettleDetail[]|null);
        totalWinAmount?: (number|null);
        curCoin?: (number|null);
        keepWinCount?: (number|null);
    }

    class PlayerSettle implements IPlayerSettle {
        constructor(p?: pokermaster_proto.IPlayerSettle);
        public uid: number;
        public settle: pokermaster_proto.ZoneSettleDetail[];
        public totalWinAmount: number;
        public curCoin: number;
        public keepWinCount: number;
        public static create(properties?: pokermaster_proto.IPlayerSettle): pokermaster_proto.PlayerSettle;
        public static encode(m: pokermaster_proto.PlayerSettle, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.PlayerSettle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.PlayerSettle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.PlayerSettle;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.PlayerSettle;
        public static toObject(m: pokermaster_proto.PlayerSettle, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IZoneSettleDetail {
        option?: (pokermaster_proto.BetZoneOption|null);
        betAmount?: (number|null);
        winAmount?: (number|null);
        isAuto?: (number|null);
        betGameCoin?: (number|null);
    }

    class ZoneSettleDetail implements IZoneSettleDetail {
        constructor(p?: pokermaster_proto.IZoneSettleDetail);
        public option: pokermaster_proto.BetZoneOption;
        public betAmount: number;
        public winAmount: number;
        public isAuto: number;
        public betGameCoin: number;
        public static create(properties?: pokermaster_proto.IZoneSettleDetail): pokermaster_proto.ZoneSettleDetail;
        public static encode(m: pokermaster_proto.ZoneSettleDetail, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.ZoneSettleDetail, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.ZoneSettleDetail;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.ZoneSettleDetail;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.ZoneSettleDetail;
        public static toObject(m: pokermaster_proto.ZoneSettleDetail, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerHoleCard {
        name?: (pokermaster_proto.RoleName|null);
        Cards?: (pokermaster_proto.CardItem[]|null);
    }

    class PlayerHoleCard implements IPlayerHoleCard {
        constructor(p?: pokermaster_proto.IPlayerHoleCard);
        public name: pokermaster_proto.RoleName;
        public Cards: pokermaster_proto.CardItem[];
        public static create(properties?: pokermaster_proto.IPlayerHoleCard): pokermaster_proto.PlayerHoleCard;
        public static encode(m: pokermaster_proto.PlayerHoleCard, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.PlayerHoleCard, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.PlayerHoleCard;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.PlayerHoleCard;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.PlayerHoleCard;
        public static toObject(m: pokermaster_proto.PlayerHoleCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerFortune {
        fisherFortune?: (number|null);
        sharkFortune?: (number|null);
        whoWin?: (pokermaster_proto.BetZoneOption|null);
    }

    class PlayerFortune implements IPlayerFortune {
        constructor(p?: pokermaster_proto.IPlayerFortune);
        public fisherFortune: number;
        public sharkFortune: number;
        public whoWin: pokermaster_proto.BetZoneOption;
        public static create(properties?: pokermaster_proto.IPlayerFortune): pokermaster_proto.PlayerFortune;
        public static encode(m: pokermaster_proto.PlayerFortune, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.PlayerFortune, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.PlayerFortune;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.PlayerFortune;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.PlayerFortune;
        public static toObject(m: pokermaster_proto.PlayerFortune, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IConnClosed {
        Reason?: (number|null);
    }

    class ConnClosed implements IConnClosed {
        constructor(p?: pokermaster_proto.IConnClosed);
        public Reason: number;
        public static create(properties?: pokermaster_proto.IConnClosed): pokermaster_proto.ConnClosed;
        public static encode(m: pokermaster_proto.ConnClosed, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.ConnClosed, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.ConnClosed;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.ConnClosed;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.ConnClosed;
        public static toObject(m: pokermaster_proto.ConnClosed, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveRoomReq {
    }

    class LeaveRoomReq implements ILeaveRoomReq {
        constructor(p?: pokermaster_proto.ILeaveRoomReq);
        public static create(properties?: pokermaster_proto.ILeaveRoomReq): pokermaster_proto.LeaveRoomReq;
        public static encode(m: pokermaster_proto.LeaveRoomReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.LeaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.LeaveRoomReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.LeaveRoomReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.LeaveRoomReq;
        public static toObject(m: pokermaster_proto.LeaveRoomReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILeaveRoomResp {
        code?: (pokermaster_proto.ErrorCode|null);
    }

    class LeaveRoomResp implements ILeaveRoomResp {
        constructor(p?: pokermaster_proto.ILeaveRoomResp);
        public code: pokermaster_proto.ErrorCode;
        public static create(properties?: pokermaster_proto.ILeaveRoomResp): pokermaster_proto.LeaveRoomResp;
        public static encode(m: pokermaster_proto.LeaveRoomResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.LeaveRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.LeaveRoomResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.LeaveRoomResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.LeaveRoomResp;
        public static toObject(m: pokermaster_proto.LeaveRoomResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStartBetNotify {
        nextRoundEndStamp?: (number|null);
        leftSeconds?: (number|null);
    }

    class StartBetNotify implements IStartBetNotify {
        constructor(p?: pokermaster_proto.IStartBetNotify);
        public nextRoundEndStamp: number;
        public leftSeconds: number;
        public static create(properties?: pokermaster_proto.IStartBetNotify): pokermaster_proto.StartBetNotify;
        public static encode(m: pokermaster_proto.StartBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.StartBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.StartBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.StartBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.StartBetNotify;
        public static toObject(m: pokermaster_proto.StartBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IShowOddsNotify {
        nextRoundEndStamp?: (number|null);
        leftSeconds?: (number|null);
        option_odds?: (pokermaster_proto.BetOptionsOdds[]|null);
        whoIsLeader?: (number|null);
    }

    class ShowOddsNotify implements IShowOddsNotify {
        constructor(p?: pokermaster_proto.IShowOddsNotify);
        public nextRoundEndStamp: number;
        public leftSeconds: number;
        public option_odds: pokermaster_proto.BetOptionsOdds[];
        public whoIsLeader: number;
        public static create(properties?: pokermaster_proto.IShowOddsNotify): pokermaster_proto.ShowOddsNotify;
        public static encode(m: pokermaster_proto.ShowOddsNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.ShowOddsNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.ShowOddsNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.ShowOddsNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.ShowOddsNotify;
        public static toObject(m: pokermaster_proto.ShowOddsNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendData {
        win?: (pokermaster_proto.BetZoneOption|null);
        win_patterns?: (number|null);
        hand_num?: (number|null);
    }

    class TrendData implements ITrendData {
        constructor(p?: pokermaster_proto.ITrendData);
        public win: pokermaster_proto.BetZoneOption;
        public win_patterns: number;
        public hand_num: number;
        public static create(properties?: pokermaster_proto.ITrendData): pokermaster_proto.TrendData;
        public static encode(m: pokermaster_proto.TrendData, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.TrendData, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.TrendData;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.TrendData;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.TrendData;
        public static toObject(m: pokermaster_proto.TrendData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRoadReq {
        roomuuid?: (number|null);
    }

    class RoomTrendRoadReq implements IRoomTrendRoadReq {
        constructor(p?: pokermaster_proto.IRoomTrendRoadReq);
        public roomuuid: number;
        public static create(properties?: pokermaster_proto.IRoomTrendRoadReq): pokermaster_proto.RoomTrendRoadReq;
        public static encode(m: pokermaster_proto.RoomTrendRoadReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomTrendRoadReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomTrendRoadReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomTrendRoadReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomTrendRoadReq;
        public static toObject(m: pokermaster_proto.RoomTrendRoadReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRoadRsp {
        code?: (pokermaster_proto.ErrorCode|null);
    }

    class RoomTrendRoadRsp implements IRoomTrendRoadRsp {
        constructor(p?: pokermaster_proto.IRoomTrendRoadRsp);
        public code: pokermaster_proto.ErrorCode;
        public static create(properties?: pokermaster_proto.IRoomTrendRoadRsp): pokermaster_proto.RoomTrendRoadRsp;
        public static encode(m: pokermaster_proto.RoomTrendRoadRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomTrendRoadRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomTrendRoadRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomTrendRoadRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomTrendRoadRsp;
        public static toObject(m: pokermaster_proto.RoomTrendRoadRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRoadNotice {
        road?: (pokermaster_proto.TrendRoad[]|null);
    }

    class RoomTrendRoadNotice implements IRoomTrendRoadNotice {
        constructor(p?: pokermaster_proto.IRoomTrendRoadNotice);
        public road: pokermaster_proto.TrendRoad[];
        public static create(properties?: pokermaster_proto.IRoomTrendRoadNotice): pokermaster_proto.RoomTrendRoadNotice;
        public static encode(m: pokermaster_proto.RoomTrendRoadNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomTrendRoadNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomTrendRoadNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomTrendRoadNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomTrendRoadNotice;
        public static toObject(m: pokermaster_proto.RoomTrendRoadNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendRoad {
        road_row?: (pokermaster_proto.TrendRoadInfo[]|null);
    }

    class TrendRoad implements ITrendRoad {
        constructor(p?: pokermaster_proto.ITrendRoad);
        public road_row: pokermaster_proto.TrendRoadInfo[];
        public static create(properties?: pokermaster_proto.ITrendRoad): pokermaster_proto.TrendRoad;
        public static encode(m: pokermaster_proto.TrendRoad, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.TrendRoad, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.TrendRoad;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.TrendRoad;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.TrendRoad;
        public static toObject(m: pokermaster_proto.TrendRoad, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ITrendRoadInfo {
        win?: (string|null);
        eqc?: (number|null);
    }

    class TrendRoadInfo implements ITrendRoadInfo {
        constructor(p?: pokermaster_proto.ITrendRoadInfo);
        public win: string;
        public eqc: number;
        public static create(properties?: pokermaster_proto.ITrendRoadInfo): pokermaster_proto.TrendRoadInfo;
        public static encode(m: pokermaster_proto.TrendRoadInfo, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.TrendRoadInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.TrendRoadInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.TrendRoadInfo;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.TrendRoadInfo;
        public static toObject(m: pokermaster_proto.TrendRoadInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDailyStat {
        betzone_type?: (pokermaster_proto.BetZoneOption|null);
        count?: (number|null);
        win_pattern?: (number|null);
    }

    class DailyStat implements IDailyStat {
        constructor(p?: pokermaster_proto.IDailyStat);
        public betzone_type: pokermaster_proto.BetZoneOption;
        public count: number;
        public win_pattern: number;
        public static create(properties?: pokermaster_proto.IDailyStat): pokermaster_proto.DailyStat;
        public static encode(m: pokermaster_proto.DailyStat, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.DailyStat, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.DailyStat;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.DailyStat;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.DailyStat;
        public static toObject(m: pokermaster_proto.DailyStat, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendReq {
        roomuuid?: (number|null);
    }

    class RoomTrendReq implements IRoomTrendReq {
        constructor(p?: pokermaster_proto.IRoomTrendReq);
        public roomuuid: number;
        public static create(properties?: pokermaster_proto.IRoomTrendReq): pokermaster_proto.RoomTrendReq;
        public static encode(m: pokermaster_proto.RoomTrendReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomTrendReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomTrendReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomTrendReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomTrendReq;
        public static toObject(m: pokermaster_proto.RoomTrendReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendRsp {
        code?: (pokermaster_proto.ErrorCode|null);
    }

    class RoomTrendRsp implements IRoomTrendRsp {
        constructor(p?: pokermaster_proto.IRoomTrendRsp);
        public code: pokermaster_proto.ErrorCode;
        public static create(properties?: pokermaster_proto.IRoomTrendRsp): pokermaster_proto.RoomTrendRsp;
        public static encode(m: pokermaster_proto.RoomTrendRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomTrendRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomTrendRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomTrendRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomTrendRsp;
        public static toObject(m: pokermaster_proto.RoomTrendRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IRoomTrendNotice {
        roomuuid?: (number|null);
        trend?: (pokermaster_proto.TrendData[]|null);
        fortune?: (pokermaster_proto.PlayerFortune|null);
        road?: (pokermaster_proto.TrendRoad[]|null);
        lastRow?: (number|null);
        lastCol?: (number|null);
    }

    class RoomTrendNotice implements IRoomTrendNotice {
        constructor(p?: pokermaster_proto.IRoomTrendNotice);
        public roomuuid: number;
        public trend: pokermaster_proto.TrendData[];
        public fortune?: (pokermaster_proto.PlayerFortune|null);
        public road: pokermaster_proto.TrendRoad[];
        public lastRow: number;
        public lastCol: number;
        public static create(properties?: pokermaster_proto.IRoomTrendNotice): pokermaster_proto.RoomTrendNotice;
        public static encode(m: pokermaster_proto.RoomTrendNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.RoomTrendNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.RoomTrendNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.RoomTrendNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.RoomTrendNotice;
        public static toObject(m: pokermaster_proto.RoomTrendNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetReq {
    }

    class AutoBetReq implements IAutoBetReq {
        constructor(p?: pokermaster_proto.IAutoBetReq);
        public static create(properties?: pokermaster_proto.IAutoBetReq): pokermaster_proto.AutoBetReq;
        public static encode(m: pokermaster_proto.AutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AutoBetReq;
        public static toObject(m: pokermaster_proto.AutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetResp {
        code?: (pokermaster_proto.ErrorCode|null);
        canAuto?: (boolean|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AutoBetResp implements IAutoBetResp {
        constructor(p?: pokermaster_proto.IAutoBetResp);
        public code: pokermaster_proto.ErrorCode;
        public canAuto: boolean;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: pokermaster_proto.IAutoBetResp): pokermaster_proto.AutoBetResp;
        public static encode(m: pokermaster_proto.AutoBetResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AutoBetResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AutoBetResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AutoBetResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AutoBetResp;
        public static toObject(m: pokermaster_proto.AutoBetResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoBetNotify {
        open?: (boolean|null);
    }

    class AutoBetNotify implements IAutoBetNotify {
        constructor(p?: pokermaster_proto.IAutoBetNotify);
        public open: boolean;
        public static create(properties?: pokermaster_proto.IAutoBetNotify): pokermaster_proto.AutoBetNotify;
        public static encode(m: pokermaster_proto.AutoBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AutoBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AutoBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AutoBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AutoBetNotify;
        public static toObject(m: pokermaster_proto.AutoBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerListReq {
    }

    class PlayerListReq implements IPlayerListReq {
        constructor(p?: pokermaster_proto.IPlayerListReq);
        public static create(properties?: pokermaster_proto.IPlayerListReq): pokermaster_proto.PlayerListReq;
        public static encode(m: pokermaster_proto.PlayerListReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.PlayerListReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.PlayerListReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.PlayerListReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.PlayerListReq;
        public static toObject(m: pokermaster_proto.PlayerListReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPlayerListResp {
        code?: (pokermaster_proto.ErrorCode|null);
        gamePlayers?: (pokermaster_proto.GamePlayer[]|null);
        self?: (pokermaster_proto.GamePlayer|null);
        playerNum?: (number|null);
    }

    class PlayerListResp implements IPlayerListResp {
        constructor(p?: pokermaster_proto.IPlayerListResp);
        public code: pokermaster_proto.ErrorCode;
        public gamePlayers: pokermaster_proto.GamePlayer[];
        public self?: (pokermaster_proto.GamePlayer|null);
        public playerNum: number;
        public static create(properties?: pokermaster_proto.IPlayerListResp): pokermaster_proto.PlayerListResp;
        public static encode(m: pokermaster_proto.PlayerListResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.PlayerListResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.PlayerListResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.PlayerListResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.PlayerListResp;
        public static toObject(m: pokermaster_proto.PlayerListResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
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
        constructor(p?: pokermaster_proto.IGamePlayer);
        public uid: number;
        public name: string;
        public head: string;
        public totalBetAmount: number;
        public winCount: number;
        public rank: number;
        public curCoin: number;
        public keepWinCount: number;
        public curUsdt: number;
        public static create(properties?: pokermaster_proto.IGamePlayer): pokermaster_proto.GamePlayer;
        public static encode(m: pokermaster_proto.GamePlayer, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.GamePlayer, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.GamePlayer;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.GamePlayer;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.GamePlayer;
        public static toObject(m: pokermaster_proto.GamePlayer, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IKickNotify {
        kickType?: (pokermaster_proto.Kick|null);
        desc?: (string|null);
        idle_roomid?: (number|null);
    }

    class KickNotify implements IKickNotify {
        constructor(p?: pokermaster_proto.IKickNotify);
        public kickType: pokermaster_proto.Kick;
        public desc: string;
        public idle_roomid: number;
        public static create(properties?: pokermaster_proto.IKickNotify): pokermaster_proto.KickNotify;
        public static encode(m: pokermaster_proto.KickNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.KickNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.KickNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.KickNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.KickNotify;
        public static toObject(m: pokermaster_proto.KickNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoOpenRoadsReq {
        open?: (boolean|null);
    }

    class AutoOpenRoadsReq implements IAutoOpenRoadsReq {
        constructor(p?: pokermaster_proto.IAutoOpenRoadsReq);
        public open: boolean;
        public static create(properties?: pokermaster_proto.IAutoOpenRoadsReq): pokermaster_proto.AutoOpenRoadsReq;
        public static encode(m: pokermaster_proto.AutoOpenRoadsReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AutoOpenRoadsReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AutoOpenRoadsReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AutoOpenRoadsReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AutoOpenRoadsReq;
        public static toObject(m: pokermaster_proto.AutoOpenRoadsReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAutoOpenRoadsResp {
        code?: (pokermaster_proto.ErrorCode|null);
        open?: (boolean|null);
    }

    class AutoOpenRoadsResp implements IAutoOpenRoadsResp {
        constructor(p?: pokermaster_proto.IAutoOpenRoadsResp);
        public code: pokermaster_proto.ErrorCode;
        public open: boolean;
        public static create(properties?: pokermaster_proto.IAutoOpenRoadsResp): pokermaster_proto.AutoOpenRoadsResp;
        public static encode(m: pokermaster_proto.AutoOpenRoadsResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AutoOpenRoadsResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AutoOpenRoadsResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AutoOpenRoadsResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AutoOpenRoadsResp;
        public static toObject(m: pokermaster_proto.AutoOpenRoadsResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetGameOptionReq {
        autoLevel?: (pokermaster_proto.AutoBetLevel|null);
        betCoinOption?: (number[]|null);
    }

    class SetGameOptionReq implements ISetGameOptionReq {
        constructor(p?: pokermaster_proto.ISetGameOptionReq);
        public autoLevel: pokermaster_proto.AutoBetLevel;
        public betCoinOption: number[];
        public static create(properties?: pokermaster_proto.ISetGameOptionReq): pokermaster_proto.SetGameOptionReq;
        public static encode(m: pokermaster_proto.SetGameOptionReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.SetGameOptionReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.SetGameOptionReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.SetGameOptionReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.SetGameOptionReq;
        public static toObject(m: pokermaster_proto.SetGameOptionReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISetGameOptionResp {
        code?: (pokermaster_proto.ErrorCode|null);
        autoLevel?: (pokermaster_proto.AutoBetLevel|null);
        betCoinOption?: (number[]|null);
    }

    class SetGameOptionResp implements ISetGameOptionResp {
        constructor(p?: pokermaster_proto.ISetGameOptionResp);
        public code: pokermaster_proto.ErrorCode;
        public autoLevel: pokermaster_proto.AutoBetLevel;
        public betCoinOption: number[];
        public static create(properties?: pokermaster_proto.ISetGameOptionResp): pokermaster_proto.SetGameOptionResp;
        public static encode(m: pokermaster_proto.SetGameOptionResp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.SetGameOptionResp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.SetGameOptionResp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.SetGameOptionResp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.SetGameOptionResp;
        public static toObject(m: pokermaster_proto.SetGameOptionResp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetReq {
    }

    class AdvanceAutoBetReq implements IAdvanceAutoBetReq {
        constructor(p?: pokermaster_proto.IAdvanceAutoBetReq);
        public static create(properties?: pokermaster_proto.IAdvanceAutoBetReq): pokermaster_proto.AdvanceAutoBetReq;
        public static encode(m: pokermaster_proto.AdvanceAutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AdvanceAutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AdvanceAutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AdvanceAutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AdvanceAutoBetReq;
        public static toObject(m: pokermaster_proto.AdvanceAutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetRsp {
        code?: (pokermaster_proto.ErrorCode|null);
        usedAutoBetCount?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AdvanceAutoBetRsp implements IAdvanceAutoBetRsp {
        constructor(p?: pokermaster_proto.IAdvanceAutoBetRsp);
        public code: pokermaster_proto.ErrorCode;
        public usedAutoBetCount: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: pokermaster_proto.IAdvanceAutoBetRsp): pokermaster_proto.AdvanceAutoBetRsp;
        public static encode(m: pokermaster_proto.AdvanceAutoBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AdvanceAutoBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AdvanceAutoBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AdvanceAutoBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AdvanceAutoBetRsp;
        public static toObject(m: pokermaster_proto.AdvanceAutoBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelAdvanceAutoBetReq {
    }

    class CancelAdvanceAutoBetReq implements ICancelAdvanceAutoBetReq {
        constructor(p?: pokermaster_proto.ICancelAdvanceAutoBetReq);
        public static create(properties?: pokermaster_proto.ICancelAdvanceAutoBetReq): pokermaster_proto.CancelAdvanceAutoBetReq;
        public static encode(m: pokermaster_proto.CancelAdvanceAutoBetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.CancelAdvanceAutoBetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.CancelAdvanceAutoBetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.CancelAdvanceAutoBetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.CancelAdvanceAutoBetReq;
        public static toObject(m: pokermaster_proto.CancelAdvanceAutoBetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICancelAdvanceAutoBetRsp {
        code?: (pokermaster_proto.ErrorCode|null);
        is_manual?: (boolean|null);
    }

    class CancelAdvanceAutoBetRsp implements ICancelAdvanceAutoBetRsp {
        constructor(p?: pokermaster_proto.ICancelAdvanceAutoBetRsp);
        public code: pokermaster_proto.ErrorCode;
        public is_manual: boolean;
        public static create(properties?: pokermaster_proto.ICancelAdvanceAutoBetRsp): pokermaster_proto.CancelAdvanceAutoBetRsp;
        public static encode(m: pokermaster_proto.CancelAdvanceAutoBetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.CancelAdvanceAutoBetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.CancelAdvanceAutoBetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.CancelAdvanceAutoBetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.CancelAdvanceAutoBetRsp;
        public static toObject(m: pokermaster_proto.CancelAdvanceAutoBetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetSetReq {
        count?: (number|null);
    }

    class AdvanceAutoBetSetReq implements IAdvanceAutoBetSetReq {
        constructor(p?: pokermaster_proto.IAdvanceAutoBetSetReq);
        public count: number;
        public static create(properties?: pokermaster_proto.IAdvanceAutoBetSetReq): pokermaster_proto.AdvanceAutoBetSetReq;
        public static encode(m: pokermaster_proto.AdvanceAutoBetSetReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AdvanceAutoBetSetReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AdvanceAutoBetSetReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AdvanceAutoBetSetReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AdvanceAutoBetSetReq;
        public static toObject(m: pokermaster_proto.AdvanceAutoBetSetReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IAdvanceAutoBetSetRsp {
        code?: (pokermaster_proto.ErrorCode|null);
        count?: (number|null);
        CalmDownLeftSeconds?: (number|null);
        CalmDownDeadLineTimeStamp?: (number|null);
    }

    class AdvanceAutoBetSetRsp implements IAdvanceAutoBetSetRsp {
        constructor(p?: pokermaster_proto.IAdvanceAutoBetSetRsp);
        public code: pokermaster_proto.ErrorCode;
        public count: number;
        public CalmDownLeftSeconds: number;
        public CalmDownDeadLineTimeStamp: number;
        public static create(properties?: pokermaster_proto.IAdvanceAutoBetSetRsp): pokermaster_proto.AdvanceAutoBetSetRsp;
        public static encode(m: pokermaster_proto.AdvanceAutoBetSetRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.AdvanceAutoBetSetRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.AdvanceAutoBetSetRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.AdvanceAutoBetSetRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.AdvanceAutoBetSetRsp;
        public static toObject(m: pokermaster_proto.AdvanceAutoBetSetRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IStopBetNotify {
        cards?: (pokermaster_proto.CardItem[]|null);
        canSquint?: (boolean|null);
        whoIsLeader?: (number|null);
        nextRoundEndStamp?: (number|null);
        leftSeconds?: (number|null);
        skipRound?: (boolean|null);
        fisherOuts?: (pokermaster_proto.OutItem[]|null);
        sharkOuts?: (pokermaster_proto.OutItem[]|null);
        fisherLevel?: (number|null);
        sharkLevel?: (number|null);
    }

    class StopBetNotify implements IStopBetNotify {
        constructor(p?: pokermaster_proto.IStopBetNotify);
        public cards: pokermaster_proto.CardItem[];
        public canSquint: boolean;
        public whoIsLeader: number;
        public nextRoundEndStamp: number;
        public leftSeconds: number;
        public skipRound: boolean;
        public fisherOuts: pokermaster_proto.OutItem[];
        public sharkOuts: pokermaster_proto.OutItem[];
        public fisherLevel: number;
        public sharkLevel: number;
        public static create(properties?: pokermaster_proto.IStopBetNotify): pokermaster_proto.StopBetNotify;
        public static encode(m: pokermaster_proto.StopBetNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.StopBetNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.StopBetNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.StopBetNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.StopBetNotify;
        public static toObject(m: pokermaster_proto.StopBetNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IOutItem {
        OutsId?: (number|null);
        card?: (pokermaster_proto.CardItem|null);
    }

    class OutItem implements IOutItem {
        constructor(p?: pokermaster_proto.IOutItem);
        public OutsId: number;
        public card?: (pokermaster_proto.CardItem|null);
        public static create(properties?: pokermaster_proto.IOutItem): pokermaster_proto.OutItem;
        public static encode(m: pokermaster_proto.OutItem, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.OutItem, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.OutItem;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.OutItem;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.OutItem;
        public static toObject(m: pokermaster_proto.OutItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetOptionsOdds {
        option?: (pokermaster_proto.BetZoneOption|null);
        odds?: (number|null);
        limitRed?: (number|null);
        winRate?: (number|null);
    }

    class BetOptionsOdds implements IBetOptionsOdds {
        constructor(p?: pokermaster_proto.IBetOptionsOdds);
        public option: pokermaster_proto.BetZoneOption;
        public odds: number;
        public limitRed: number;
        public winRate: number;
        public static create(properties?: pokermaster_proto.IBetOptionsOdds): pokermaster_proto.BetOptionsOdds;
        public static encode(m: pokermaster_proto.BetOptionsOdds, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetOptionsOdds, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetOptionsOdds;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetOptionsOdds;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetOptionsOdds;
        public static toObject(m: pokermaster_proto.BetOptionsOdds, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetReviewReq {
    }

    class BetReviewReq implements IBetReviewReq {
        constructor(p?: pokermaster_proto.IBetReviewReq);
        public static create(properties?: pokermaster_proto.IBetReviewReq): pokermaster_proto.BetReviewReq;
        public static encode(m: pokermaster_proto.BetReviewReq, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetReviewReq, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetReviewReq;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetReviewReq;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetReviewReq;
        public static toObject(m: pokermaster_proto.BetReviewReq, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetReviewRsp {
        code?: (pokermaster_proto.ErrorCode|null);
        reviewed?: (pokermaster_proto.BetReview[]|null);
    }

    class BetReviewRsp implements IBetReviewRsp {
        constructor(p?: pokermaster_proto.IBetReviewRsp);
        public code: pokermaster_proto.ErrorCode;
        public reviewed: pokermaster_proto.BetReview[];
        public static create(properties?: pokermaster_proto.IBetReviewRsp): pokermaster_proto.BetReviewRsp;
        public static encode(m: pokermaster_proto.BetReviewRsp, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetReviewRsp, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetReviewRsp;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetReviewRsp;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetReviewRsp;
        public static toObject(m: pokermaster_proto.BetReviewRsp, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBetReview {
        totalBet?: (number|null);
        totalWin?: (number|null);
        fisherCard?: (pokermaster_proto.CardItem[]|null);
        sharkCard?: (pokermaster_proto.CardItem[]|null);
        pubCard?: (pokermaster_proto.CardItem[]|null);
        detail?: (pokermaster_proto.BetDetail[]|null);
        winOps?: (pokermaster_proto.BetZoneOption[]|null);
        level?: (number|null);
    }

    class BetReview implements IBetReview {
        constructor(p?: pokermaster_proto.IBetReview);
        public totalBet: number;
        public totalWin: number;
        public fisherCard: pokermaster_proto.CardItem[];
        public sharkCard: pokermaster_proto.CardItem[];
        public pubCard: pokermaster_proto.CardItem[];
        public detail: pokermaster_proto.BetDetail[];
        public winOps: pokermaster_proto.BetZoneOption[];
        public level: number;
        public static create(properties?: pokermaster_proto.IBetReview): pokermaster_proto.BetReview;
        public static encode(m: pokermaster_proto.BetReview, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.BetReview, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.BetReview;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.BetReview;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.BetReview;
        public static toObject(m: pokermaster_proto.BetReview, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IReadyGameNotify {
        nextRoundEndStamp?: (number|null);
        leftSeconds?: (number|null);
    }

    class ReadyGameNotify implements IReadyGameNotify {
        constructor(p?: pokermaster_proto.IReadyGameNotify);
        public nextRoundEndStamp: number;
        public leftSeconds: number;
        public static create(properties?: pokermaster_proto.IReadyGameNotify): pokermaster_proto.ReadyGameNotify;
        public static encode(m: pokermaster_proto.ReadyGameNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.ReadyGameNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.ReadyGameNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.ReadyGameNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.ReadyGameNotify;
        public static toObject(m: pokermaster_proto.ReadyGameNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IUserPointsChangeNotice {
        change_points?: (number|null);
    }

    class UserPointsChangeNotice implements IUserPointsChangeNotice {
        constructor(p?: pokermaster_proto.IUserPointsChangeNotice);
        public change_points: number;
        public static create(properties?: pokermaster_proto.IUserPointsChangeNotice): pokermaster_proto.UserPointsChangeNotice;
        public static encode(m: pokermaster_proto.UserPointsChangeNotice, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: pokermaster_proto.UserPointsChangeNotice, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): pokermaster_proto.UserPointsChangeNotice;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pokermaster_proto.UserPointsChangeNotice;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): pokermaster_proto.UserPointsChangeNotice;
        public static toObject(m: pokermaster_proto.UserPointsChangeNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
