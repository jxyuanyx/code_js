import * as $protobuf from "protobufjs";
/** Namespace pb. */
export namespace solitaire {

    /** ErrNo enum. */
    enum ErrNo {
        SUCCESS = 0,
        Server_Except = 1,
        TokenError = 2,
        TokenExpire = 3,
        Account_NotExists = 4,
        Duplicate_Login = 5,
        Server_Maintain = 8,
        NickName_Exists = 10,
        NickName_TooShort = 11,
        NickName_TooLong = 12,
        Password_TooShort = 13,
        Password_TooLong = 14,
        AccountBind = 15,
        Charge_Fail = 20,
        Lower_Age = 21,
        Cash_NotEnough = 22,
        Withdrawing = 23,
        WithDrawNeedRecharge = 24,
        WithDrawTimes = 25,
        RequestParam_Error = 50,
        Server_ConfigError = 51,
        Reward_IDNotExists = 52,
        Reward_AlreadyGet = 53,
        Reward_ConditionUnCompelete = 54,
        SeasonWheel_NotExists = 55,
        SeasonWheel_Expire = 56,
        ReplayRecord_NotExist = 60,
        CompetitionID_NotExists = 100,
        Competition_Over = 101,
        Competition_PriceNotEnough = 102,
        Competition_Matching = 103,
        Competition_Gaming = 104,
        Competition_OtherGame = 105,
        Competition_NotFound = 106,
        Competition_NotInCmp = 107,
        Competition_GameOver = 108,
        Competition_Pause = 109,
        Competition_ParamError = 110,
        MatchID_NotExist = 111,
        Match_Timeout = 112,
        Competition_AuthFail = 113,
        Competition_Busy = 114,
        Competition_Timeout = 115,
        Match_Hide = 116,
        HTTP_SUCCESS = 200,
        ActivityInvalid = 201,
        ActivityDraw = 202,
        ActivityNotFinished = 203,
        DiamondNotEnough = 204
    }

    /** Properties of a Ping. */
    interface IPing {
    }

    /** Represents a Ping. */
    class Ping implements IPing {

        /**
         * Constructs a new Ping.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPing);

        /**
         * Creates a new Ping instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ping instance
         */
        public static create(properties?: pb.IPing): pb.Ping;

        /**
         * Encodes the specified Ping message. Does not implicitly {@link pb.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link pb.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Ping;

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Ping;

        /**
         * Verifies a Ping message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ping
         */
        public static fromObject(object: { [k: string]: any }): pb.Ping;

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @param message Ping
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ping to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Pong. */
    interface IPong {
    }

    /** Represents a Pong. */
    class Pong implements IPong {

        /**
         * Constructs a new Pong.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPong);

        /**
         * Creates a new Pong instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pong instance
         */
        public static create(properties?: pb.IPong): pb.Pong;

        /**
         * Encodes the specified Pong message. Does not implicitly {@link pb.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link pb.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Pong;

        /**
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Pong;

        /**
         * Verifies a Pong message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Pong
         */
        public static fromObject(object: { [k: string]: any }): pb.Pong;

        /**
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @param message Pong
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Pong to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserData. */
    interface IUserData {

        /** UserData Uid */
        Uid?: (number|null);

        /** UserData Nick */
        Nick?: (string|null);

        /** UserData Avatar */
        Avatar?: (string|null);

        /** UserData Cash */
        Cash?: (number|Long|null);

        /** UserData BindCash */
        BindCash?: (number|Long|null);

        /** UserData Tickets */
        Tickets?: (number|Long|null);

        /** UserData Sex */
        Sex?: (number|null);

        /** UserData AreaCode */
        AreaCode?: (string|null);

        /** UserData Signature */
        Signature?: (string|null);

        /** UserData Birth */
        Birth?: (number|Long|null);

        /** UserData Dan */
        Dan?: (number|null);
    }

    /** Represents a UserData. */
    class UserData implements IUserData {

        /**
         * Constructs a new UserData.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IUserData);

        /** UserData Uid. */
        public Uid: number;

        /** UserData Nick. */
        public Nick: string;

        /** UserData Avatar. */
        public Avatar: string;

        /** UserData Cash. */
        public Cash: (number|Long);

        /** UserData BindCash. */
        public BindCash: (number|Long);

        /** UserData Tickets. */
        public Tickets: (number|Long);

        /** UserData Sex. */
        public Sex: number;

        /** UserData AreaCode. */
        public AreaCode: string;

        /** UserData Signature. */
        public Signature: string;

        /** UserData Birth. */
        public Birth: (number|Long);

        /** UserData Dan. */
        public Dan: number;

        /**
         * Creates a new UserData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserData instance
         */
        public static create(properties?: pb.IUserData): pb.UserData;

        /**
         * Encodes the specified UserData message. Does not implicitly {@link pb.UserData.verify|verify} messages.
         * @param message UserData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IUserData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserData message, length delimited. Does not implicitly {@link pb.UserData.verify|verify} messages.
         * @param message UserData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IUserData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.UserData;

        /**
         * Decodes a UserData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.UserData;

        /**
         * Verifies a UserData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserData
         */
        public static fromObject(object: { [k: string]: any }): pb.UserData;

        /**
         * Creates a plain object from a UserData message. Also converts values to other types if specified.
         * @param message UserData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.UserData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerGameInfo. */
    interface IPlayerGameInfo {

        /** PlayerGameInfo GameName */
        GameName?: (string|null);

        /** PlayerGameInfo NodeId */
        NodeId?: (string|null);

        /** PlayerGameInfo CmpID */
        CmpID?: (number|null);

        /** PlayerGameInfo Uuid */
        Uuid?: (string|null);

        /** PlayerGameInfo Status */
        Status?: (number|null);

        /** PlayerGameInfo MatchID */
        MatchID?: (number|null);

        /** PlayerGameInfo ActiveTime */
        ActiveTime?: (number|Long|null);
    }

    /** Represents a PlayerGameInfo. */
    class PlayerGameInfo implements IPlayerGameInfo {

        /**
         * Constructs a new PlayerGameInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPlayerGameInfo);

        /** PlayerGameInfo GameName. */
        public GameName: string;

        /** PlayerGameInfo NodeId. */
        public NodeId: string;

        /** PlayerGameInfo CmpID. */
        public CmpID: number;

        /** PlayerGameInfo Uuid. */
        public Uuid: string;

        /** PlayerGameInfo Status. */
        public Status: number;

        /** PlayerGameInfo MatchID. */
        public MatchID: number;

        /** PlayerGameInfo ActiveTime. */
        public ActiveTime: (number|Long);

        /**
         * Creates a new PlayerGameInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerGameInfo instance
         */
        public static create(properties?: pb.IPlayerGameInfo): pb.PlayerGameInfo;

        /**
         * Encodes the specified PlayerGameInfo message. Does not implicitly {@link pb.PlayerGameInfo.verify|verify} messages.
         * @param message PlayerGameInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPlayerGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerGameInfo message, length delimited. Does not implicitly {@link pb.PlayerGameInfo.verify|verify} messages.
         * @param message PlayerGameInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPlayerGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerGameInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.PlayerGameInfo;

        /**
         * Decodes a PlayerGameInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PlayerGameInfo;

        /**
         * Verifies a PlayerGameInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerGameInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerGameInfo
         */
        public static fromObject(object: { [k: string]: any }): pb.PlayerGameInfo;

        /**
         * Creates a plain object from a PlayerGameInfo message. Also converts values to other types if specified.
         * @param message PlayerGameInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.PlayerGameInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerGameInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** CompetitionType enum. */
    enum CompetitionType {
        Competition_None = 0,
        Competition_Match = 1,
        Competition_Tournament = 2,
        Competition_MAX = 3
    }

    /** ClientCompetitionType enum. */
    enum ClientCompetitionType {
        CliCmp_Ticket = 0,
        CliCmp_Cash = 1,
        CliCmp_Tournament = 2,
        CliCmp_AllTournament = 3,
        CliCmp_MAX = 4
    }

    /** CurrencyType enum. */
    enum CurrencyType {
        Currency_Free = 0,
        Currency_Ticket = 1,
        Currency_Cash = 2,
        Currency_BindCash = 3,
        Currency_Lottery = 4,
        Currency_SeasonScore = 5,
        Currency_Lottery1 = 6,
        Currency_Lottery2 = 7,
        Currency_Lottery3 = 8,
        Currency_Lottery4 = 9,
        Currency_Diamond = 10,
        Currency_MAX = 11
    }

    /** MatchStatus enum. */
    enum MatchStatus {
        Status_Matching = 0,
        Status_Finished = 1
    }

    /** GameStatus enum. */
    enum GameStatus {
        Status_Gaming = 0,
        Status_Pause = 1,
        Status_Over = 2
    }

    /** GameOverReason enum. */
    enum GameOverReason {
        Reason_Auto = 0,
        Reason_Timeout = 1,
        Reason_Force = 2,
        Reason_CmpOver = 3,
        Reason_AllFinish = 4,
        Reason_Dead = 5
    }

    /** CurrencyUpdateEvent enum. */
    enum CurrencyUpdateEvent {
        Event_Deposit = 0,
        Event_Withdraw = 1,
        Event_Exchange = 2,
        Event_MatchEntry = 3,
        Event_MatchReward = 4,
        Event_AchievementReward = 5,
        Event_SeasonReward = 6,
        Event_DanReward = 7,
        Event_QuestReward = 8,
        Event_SeasonWheel = 9,
        Event_WithdrawFail = 10,
        Event_ActivityLogin = 11,
        Event_ActivityRecharge = 12,
        Event_ActivityCard = 13,
        Event_MatchBack = 14,
        Event_Recharge_First = 15,
        Event_GM = 100
    }

    /** RedPointModule enum. */
    enum RedPointModule {
        RedPoint_Achievement = 0,
        RedPoint_Season_Dan = 1,
        RedPoint_Season_Quest = 2,
        RedPoint_Season_Wheel = 3,
        RedPoint_Message = 4,
        RedPoint_Record = 5
    }

    /** Properties of a CurrencyPair. */
    interface ICurrencyPair {

        /** CurrencyPair type */
        type?: (pb.CurrencyType|null);

        /** CurrencyPair value */
        value?: (number|Long|null);
    }

    /** Represents a CurrencyPair. */
    class CurrencyPair implements ICurrencyPair {

        /**
         * Constructs a new CurrencyPair.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICurrencyPair);

        /** CurrencyPair type. */
        public type: pb.CurrencyType;

        /** CurrencyPair value. */
        public value: (number|Long);

        /**
         * Creates a new CurrencyPair instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CurrencyPair instance
         */
        public static create(properties?: pb.ICurrencyPair): pb.CurrencyPair;

        /**
         * Encodes the specified CurrencyPair message. Does not implicitly {@link pb.CurrencyPair.verify|verify} messages.
         * @param message CurrencyPair message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICurrencyPair, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CurrencyPair message, length delimited. Does not implicitly {@link pb.CurrencyPair.verify|verify} messages.
         * @param message CurrencyPair message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICurrencyPair, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CurrencyPair message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CurrencyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CurrencyPair;

        /**
         * Decodes a CurrencyPair message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CurrencyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CurrencyPair;

        /**
         * Verifies a CurrencyPair message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CurrencyPair message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CurrencyPair
         */
        public static fromObject(object: { [k: string]: any }): pb.CurrencyPair;

        /**
         * Creates a plain object from a CurrencyPair message. Also converts values to other types if specified.
         * @param message CurrencyPair
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CurrencyPair, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CurrencyPair to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ErrorMessageNotify. */
    interface IErrorMessageNotify {

        /** ErrorMessageNotify err */
        err?: (pb.ErrNo|null);
    }

    /** Represents an ErrorMessageNotify. */
    class ErrorMessageNotify implements IErrorMessageNotify {

        /**
         * Constructs a new ErrorMessageNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IErrorMessageNotify);

        /** ErrorMessageNotify err. */
        public err: pb.ErrNo;

        /**
         * Creates a new ErrorMessageNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorMessageNotify instance
         */
        public static create(properties?: pb.IErrorMessageNotify): pb.ErrorMessageNotify;

        /**
         * Encodes the specified ErrorMessageNotify message. Does not implicitly {@link pb.ErrorMessageNotify.verify|verify} messages.
         * @param message ErrorMessageNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IErrorMessageNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorMessageNotify message, length delimited. Does not implicitly {@link pb.ErrorMessageNotify.verify|verify} messages.
         * @param message ErrorMessageNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IErrorMessageNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorMessageNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorMessageNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ErrorMessageNotify;

        /**
         * Decodes an ErrorMessageNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorMessageNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ErrorMessageNotify;

        /**
         * Verifies an ErrorMessageNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorMessageNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorMessageNotify
         */
        public static fromObject(object: { [k: string]: any }): pb.ErrorMessageNotify;

        /**
         * Creates a plain object from an ErrorMessageNotify message. Also converts values to other types if specified.
         * @param message ErrorMessageNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ErrorMessageNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorMessageNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerCurrencyChangeNotify. */
    interface IPlayerCurrencyChangeNotify {

        /** PlayerCurrencyChangeNotify list */
        list?: (pb.ICurrencyPair[]|null);

        /** PlayerCurrencyChangeNotify event */
        event?: (pb.CurrencyUpdateEvent|null);
    }

    /** Represents a PlayerCurrencyChangeNotify. */
    class PlayerCurrencyChangeNotify implements IPlayerCurrencyChangeNotify {

        /**
         * Constructs a new PlayerCurrencyChangeNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPlayerCurrencyChangeNotify);

        /** PlayerCurrencyChangeNotify list. */
        public list: pb.ICurrencyPair[];

        /** PlayerCurrencyChangeNotify event. */
        public event: pb.CurrencyUpdateEvent;

        /**
         * Creates a new PlayerCurrencyChangeNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerCurrencyChangeNotify instance
         */
        public static create(properties?: pb.IPlayerCurrencyChangeNotify): pb.PlayerCurrencyChangeNotify;

        /**
         * Encodes the specified PlayerCurrencyChangeNotify message. Does not implicitly {@link pb.PlayerCurrencyChangeNotify.verify|verify} messages.
         * @param message PlayerCurrencyChangeNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPlayerCurrencyChangeNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerCurrencyChangeNotify message, length delimited. Does not implicitly {@link pb.PlayerCurrencyChangeNotify.verify|verify} messages.
         * @param message PlayerCurrencyChangeNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPlayerCurrencyChangeNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerCurrencyChangeNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerCurrencyChangeNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.PlayerCurrencyChangeNotify;

        /**
         * Decodes a PlayerCurrencyChangeNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerCurrencyChangeNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PlayerCurrencyChangeNotify;

        /**
         * Verifies a PlayerCurrencyChangeNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerCurrencyChangeNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerCurrencyChangeNotify
         */
        public static fromObject(object: { [k: string]: any }): pb.PlayerCurrencyChangeNotify;

        /**
         * Creates a plain object from a PlayerCurrencyChangeNotify message. Also converts values to other types if specified.
         * @param message PlayerCurrencyChangeNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.PlayerCurrencyChangeNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerCurrencyChangeNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PrizePoolUpdateNotify. */
    interface IPrizePoolUpdateNotify {

        /** PrizePoolUpdateNotify PrizePool */
        PrizePool?: (number|Long|null);
    }

    /** Represents a PrizePoolUpdateNotify. */
    class PrizePoolUpdateNotify implements IPrizePoolUpdateNotify {

        /**
         * Constructs a new PrizePoolUpdateNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPrizePoolUpdateNotify);

        /** PrizePoolUpdateNotify PrizePool. */
        public PrizePool: (number|Long);

        /**
         * Creates a new PrizePoolUpdateNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PrizePoolUpdateNotify instance
         */
        public static create(properties?: pb.IPrizePoolUpdateNotify): pb.PrizePoolUpdateNotify;

        /**
         * Encodes the specified PrizePoolUpdateNotify message. Does not implicitly {@link pb.PrizePoolUpdateNotify.verify|verify} messages.
         * @param message PrizePoolUpdateNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPrizePoolUpdateNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrizePoolUpdateNotify message, length delimited. Does not implicitly {@link pb.PrizePoolUpdateNotify.verify|verify} messages.
         * @param message PrizePoolUpdateNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPrizePoolUpdateNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrizePoolUpdateNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrizePoolUpdateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.PrizePoolUpdateNotify;

        /**
         * Decodes a PrizePoolUpdateNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrizePoolUpdateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PrizePoolUpdateNotify;

        /**
         * Verifies a PrizePoolUpdateNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrizePoolUpdateNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrizePoolUpdateNotify
         */
        public static fromObject(object: { [k: string]: any }): pb.PrizePoolUpdateNotify;

        /**
         * Creates a plain object from a PrizePoolUpdateNotify message. Also converts values to other types if specified.
         * @param message PrizePoolUpdateNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.PrizePoolUpdateNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrizePoolUpdateNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SeasonRewardGetReq. */
    interface ISeasonRewardGetReq {

        /** SeasonRewardGetReq QuestID */
        QuestID?: (number|null);
    }

    /** Represents a SeasonRewardGetReq. */
    class SeasonRewardGetReq implements ISeasonRewardGetReq {

        /**
         * Constructs a new SeasonRewardGetReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISeasonRewardGetReq);

        /** SeasonRewardGetReq QuestID. */
        public QuestID: number;

        /**
         * Creates a new SeasonRewardGetReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SeasonRewardGetReq instance
         */
        public static create(properties?: pb.ISeasonRewardGetReq): pb.SeasonRewardGetReq;

        /**
         * Encodes the specified SeasonRewardGetReq message. Does not implicitly {@link pb.SeasonRewardGetReq.verify|verify} messages.
         * @param message SeasonRewardGetReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISeasonRewardGetReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SeasonRewardGetReq message, length delimited. Does not implicitly {@link pb.SeasonRewardGetReq.verify|verify} messages.
         * @param message SeasonRewardGetReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISeasonRewardGetReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SeasonRewardGetReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SeasonRewardGetReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SeasonRewardGetReq;

        /**
         * Decodes a SeasonRewardGetReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SeasonRewardGetReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SeasonRewardGetReq;

        /**
         * Verifies a SeasonRewardGetReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SeasonRewardGetReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SeasonRewardGetReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SeasonRewardGetReq;

        /**
         * Creates a plain object from a SeasonRewardGetReq message. Also converts values to other types if specified.
         * @param message SeasonRewardGetReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SeasonRewardGetReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SeasonRewardGetReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SeasonRewardGetResp. */
    interface ISeasonRewardGetResp {

        /** SeasonRewardGetResp err */
        err?: (pb.ErrNo|null);

        /** SeasonRewardGetResp reward */
        reward?: (pb.ICurrencyPair|null);
    }

    /** Represents a SeasonRewardGetResp. */
    class SeasonRewardGetResp implements ISeasonRewardGetResp {

        /**
         * Constructs a new SeasonRewardGetResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISeasonRewardGetResp);

        /** SeasonRewardGetResp err. */
        public err: pb.ErrNo;

        /** SeasonRewardGetResp reward. */
        public reward?: (pb.ICurrencyPair|null);

        /**
         * Creates a new SeasonRewardGetResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SeasonRewardGetResp instance
         */
        public static create(properties?: pb.ISeasonRewardGetResp): pb.SeasonRewardGetResp;

        /**
         * Encodes the specified SeasonRewardGetResp message. Does not implicitly {@link pb.SeasonRewardGetResp.verify|verify} messages.
         * @param message SeasonRewardGetResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISeasonRewardGetResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SeasonRewardGetResp message, length delimited. Does not implicitly {@link pb.SeasonRewardGetResp.verify|verify} messages.
         * @param message SeasonRewardGetResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISeasonRewardGetResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SeasonRewardGetResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SeasonRewardGetResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SeasonRewardGetResp;

        /**
         * Decodes a SeasonRewardGetResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SeasonRewardGetResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SeasonRewardGetResp;

        /**
         * Verifies a SeasonRewardGetResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SeasonRewardGetResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SeasonRewardGetResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SeasonRewardGetResp;

        /**
         * Creates a plain object from a SeasonRewardGetResp message. Also converts values to other types if specified.
         * @param message SeasonRewardGetResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SeasonRewardGetResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SeasonRewardGetResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DuplicateLoginResp. */
    interface IDuplicateLoginResp {

        /** DuplicateLoginResp Err */
        Err?: (pb.ErrNo|null);

        /** DuplicateLoginResp Message */
        Message?: (string|null);
    }

    /** Represents a DuplicateLoginResp. */
    class DuplicateLoginResp implements IDuplicateLoginResp {

        /**
         * Constructs a new DuplicateLoginResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IDuplicateLoginResp);

        /** DuplicateLoginResp Err. */
        public Err: pb.ErrNo;

        /** DuplicateLoginResp Message. */
        public Message: string;

        /**
         * Creates a new DuplicateLoginResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DuplicateLoginResp instance
         */
        public static create(properties?: pb.IDuplicateLoginResp): pb.DuplicateLoginResp;

        /**
         * Encodes the specified DuplicateLoginResp message. Does not implicitly {@link pb.DuplicateLoginResp.verify|verify} messages.
         * @param message DuplicateLoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IDuplicateLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DuplicateLoginResp message, length delimited. Does not implicitly {@link pb.DuplicateLoginResp.verify|verify} messages.
         * @param message DuplicateLoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IDuplicateLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DuplicateLoginResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DuplicateLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.DuplicateLoginResp;

        /**
         * Decodes a DuplicateLoginResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DuplicateLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DuplicateLoginResp;

        /**
         * Verifies a DuplicateLoginResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DuplicateLoginResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DuplicateLoginResp
         */
        public static fromObject(object: { [k: string]: any }): pb.DuplicateLoginResp;

        /**
         * Creates a plain object from a DuplicateLoginResp message. Also converts values to other types if specified.
         * @param message DuplicateLoginResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.DuplicateLoginResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DuplicateLoginResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DrawLotteryNotify. */
    interface IDrawLotteryNotify {

        /** DrawLotteryNotify LotteryType */
        LotteryType?: (pb.CurrencyType|null);

        /** DrawLotteryNotify LotteryLevel */
        LotteryLevel?: (number|null);
    }

    /** Represents a DrawLotteryNotify. */
    class DrawLotteryNotify implements IDrawLotteryNotify {

        /**
         * Constructs a new DrawLotteryNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IDrawLotteryNotify);

        /** DrawLotteryNotify LotteryType. */
        public LotteryType: pb.CurrencyType;

        /** DrawLotteryNotify LotteryLevel. */
        public LotteryLevel: number;

        /**
         * Creates a new DrawLotteryNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DrawLotteryNotify instance
         */
        public static create(properties?: pb.IDrawLotteryNotify): pb.DrawLotteryNotify;

        /**
         * Encodes the specified DrawLotteryNotify message. Does not implicitly {@link pb.DrawLotteryNotify.verify|verify} messages.
         * @param message DrawLotteryNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IDrawLotteryNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DrawLotteryNotify message, length delimited. Does not implicitly {@link pb.DrawLotteryNotify.verify|verify} messages.
         * @param message DrawLotteryNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IDrawLotteryNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DrawLotteryNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DrawLotteryNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.DrawLotteryNotify;

        /**
         * Decodes a DrawLotteryNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DrawLotteryNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DrawLotteryNotify;

        /**
         * Verifies a DrawLotteryNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DrawLotteryNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DrawLotteryNotify
         */
        public static fromObject(object: { [k: string]: any }): pb.DrawLotteryNotify;

        /**
         * Creates a plain object from a DrawLotteryNotify message. Also converts values to other types if specified.
         * @param message DrawLotteryNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.DrawLotteryNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DrawLotteryNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeadPush. */
    interface IHeadPush {

        /** HeadPush Title */
        Title?: (string|null);

        /** HeadPush Content */
        Content?: (string|null);

        /** HeadPush Amount */
        Amount?: (number|Long|null);

        /** HeadPush Time */
        Time?: (number|Long|null);
    }

    /** Represents a HeadPush. */
    class HeadPush implements IHeadPush {

        /**
         * Constructs a new HeadPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IHeadPush);

        /** HeadPush Title. */
        public Title: string;

        /** HeadPush Content. */
        public Content: string;

        /** HeadPush Amount. */
        public Amount: (number|Long);

        /** HeadPush Time. */
        public Time: (number|Long);

        /**
         * Creates a new HeadPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeadPush instance
         */
        public static create(properties?: pb.IHeadPush): pb.HeadPush;

        /**
         * Encodes the specified HeadPush message. Does not implicitly {@link pb.HeadPush.verify|verify} messages.
         * @param message HeadPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IHeadPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeadPush message, length delimited. Does not implicitly {@link pb.HeadPush.verify|verify} messages.
         * @param message HeadPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IHeadPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeadPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeadPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.HeadPush;

        /**
         * Decodes a HeadPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeadPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.HeadPush;

        /**
         * Verifies a HeadPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeadPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeadPush
         */
        public static fromObject(object: { [k: string]: any }): pb.HeadPush;

        /**
         * Creates a plain object from a HeadPush message. Also converts values to other types if specified.
         * @param message HeadPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.HeadPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeadPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DanRefresh. */
    interface IDanRefresh {

        /** DanRefresh Dan */
        Dan?: (number|null);
    }

    /** Represents a DanRefresh. */
    class DanRefresh implements IDanRefresh {

        /**
         * Constructs a new DanRefresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IDanRefresh);

        /** DanRefresh Dan. */
        public Dan: number;

        /**
         * Creates a new DanRefresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DanRefresh instance
         */
        public static create(properties?: pb.IDanRefresh): pb.DanRefresh;

        /**
         * Encodes the specified DanRefresh message. Does not implicitly {@link pb.DanRefresh.verify|verify} messages.
         * @param message DanRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IDanRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DanRefresh message, length delimited. Does not implicitly {@link pb.DanRefresh.verify|verify} messages.
         * @param message DanRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IDanRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DanRefresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DanRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.DanRefresh;

        /**
         * Decodes a DanRefresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DanRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.DanRefresh;

        /**
         * Verifies a DanRefresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DanRefresh message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DanRefresh
         */
        public static fromObject(object: { [k: string]: any }): pb.DanRefresh;

        /**
         * Creates a plain object from a DanRefresh message. Also converts values to other types if specified.
         * @param message DanRefresh
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.DanRefresh, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DanRefresh to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** UndoOpType enum. */
    enum UndoOpType {
        OP_NONE = 0,
        OP_R2P = 1,
        OP_R2F = 2,
        OP_P2F = 3,
        OP_F2P = 4,
        OP_P2P = 5,
        OP_RAND = 6
    }

    /** Properties of a SolitaireRandomArea. */
    interface ISolitaireRandomArea {

        /** SolitaireRandomArea LeftCards */
        LeftCards?: (number|null);

        /** SolitaireRandomArea ShowCards */
        ShowCards?: (Uint8Array|null);
    }

    /** Represents a SolitaireRandomArea. */
    class SolitaireRandomArea implements ISolitaireRandomArea {

        /**
         * Constructs a new SolitaireRandomArea.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireRandomArea);

        /** SolitaireRandomArea LeftCards. */
        public LeftCards: number;

        /** SolitaireRandomArea ShowCards. */
        public ShowCards: Uint8Array;

        /**
         * Creates a new SolitaireRandomArea instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireRandomArea instance
         */
        public static create(properties?: pb.ISolitaireRandomArea): pb.SolitaireRandomArea;

        /**
         * Encodes the specified SolitaireRandomArea message. Does not implicitly {@link pb.SolitaireRandomArea.verify|verify} messages.
         * @param message SolitaireRandomArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireRandomArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireRandomArea message, length delimited. Does not implicitly {@link pb.SolitaireRandomArea.verify|verify} messages.
         * @param message SolitaireRandomArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireRandomArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireRandomArea message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireRandomArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireRandomArea;

        /**
         * Decodes a SolitaireRandomArea message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireRandomArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireRandomArea;

        /**
         * Verifies a SolitaireRandomArea message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireRandomArea message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireRandomArea
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireRandomArea;

        /**
         * Creates a plain object from a SolitaireRandomArea message. Also converts values to other types if specified.
         * @param message SolitaireRandomArea
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireRandomArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireRandomArea to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitairePileArea. */
    interface ISolitairePileArea {

        /** SolitairePileArea LeftCards */
        LeftCards?: (number|null);

        /** SolitairePileArea ShowCards */
        ShowCards?: (Uint8Array|null);
    }

    /** Represents a SolitairePileArea. */
    class SolitairePileArea implements ISolitairePileArea {

        /**
         * Constructs a new SolitairePileArea.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitairePileArea);

        /** SolitairePileArea LeftCards. */
        public LeftCards: number;

        /** SolitairePileArea ShowCards. */
        public ShowCards: Uint8Array;

        /**
         * Creates a new SolitairePileArea instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitairePileArea instance
         */
        public static create(properties?: pb.ISolitairePileArea): pb.SolitairePileArea;

        /**
         * Encodes the specified SolitairePileArea message. Does not implicitly {@link pb.SolitairePileArea.verify|verify} messages.
         * @param message SolitairePileArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitairePileArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitairePileArea message, length delimited. Does not implicitly {@link pb.SolitairePileArea.verify|verify} messages.
         * @param message SolitairePileArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitairePileArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitairePileArea message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitairePileArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitairePileArea;

        /**
         * Decodes a SolitairePileArea message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitairePileArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitairePileArea;

        /**
         * Verifies a SolitairePileArea message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitairePileArea message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitairePileArea
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitairePileArea;

        /**
         * Creates a plain object from a SolitairePileArea message. Also converts values to other types if specified.
         * @param message SolitairePileArea
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitairePileArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitairePileArea to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireCarddesk. */
    interface ISolitaireCarddesk {

        /** SolitaireCarddesk RandArea */
        RandArea?: (pb.ISolitaireRandomArea|null);

        /** SolitaireCarddesk FinishedArea */
        FinishedArea?: (Uint8Array[]|null);

        /** SolitaireCarddesk PileArea */
        PileArea?: (pb.ISolitairePileArea[]|null);
    }

    /** Represents a SolitaireCarddesk. */
    class SolitaireCarddesk implements ISolitaireCarddesk {

        /**
         * Constructs a new SolitaireCarddesk.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireCarddesk);

        /** SolitaireCarddesk RandArea. */
        public RandArea?: (pb.ISolitaireRandomArea|null);

        /** SolitaireCarddesk FinishedArea. */
        public FinishedArea: Uint8Array[];

        /** SolitaireCarddesk PileArea. */
        public PileArea: pb.ISolitairePileArea[];

        /**
         * Creates a new SolitaireCarddesk instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireCarddesk instance
         */
        public static create(properties?: pb.ISolitaireCarddesk): pb.SolitaireCarddesk;

        /**
         * Encodes the specified SolitaireCarddesk message. Does not implicitly {@link pb.SolitaireCarddesk.verify|verify} messages.
         * @param message SolitaireCarddesk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireCarddesk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireCarddesk message, length delimited. Does not implicitly {@link pb.SolitaireCarddesk.verify|verify} messages.
         * @param message SolitaireCarddesk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireCarddesk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireCarddesk message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireCarddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireCarddesk;

        /**
         * Decodes a SolitaireCarddesk message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireCarddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireCarddesk;

        /**
         * Verifies a SolitaireCarddesk message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireCarddesk message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireCarddesk
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireCarddesk;

        /**
         * Creates a plain object from a SolitaireCarddesk message. Also converts values to other types if specified.
         * @param message SolitaireCarddesk
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireCarddesk, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireCarddesk to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireCompetitionDataReq. */
    interface ISolitaireCompetitionDataReq {
    }

    /** Represents a SolitaireCompetitionDataReq. */
    class SolitaireCompetitionDataReq implements ISolitaireCompetitionDataReq {

        /**
         * Constructs a new SolitaireCompetitionDataReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireCompetitionDataReq);

        /**
         * Creates a new SolitaireCompetitionDataReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireCompetitionDataReq instance
         */
        public static create(properties?: pb.ISolitaireCompetitionDataReq): pb.SolitaireCompetitionDataReq;

        /**
         * Encodes the specified SolitaireCompetitionDataReq message. Does not implicitly {@link pb.SolitaireCompetitionDataReq.verify|verify} messages.
         * @param message SolitaireCompetitionDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireCompetitionDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireCompetitionDataReq message, length delimited. Does not implicitly {@link pb.SolitaireCompetitionDataReq.verify|verify} messages.
         * @param message SolitaireCompetitionDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireCompetitionDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireCompetitionDataReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireCompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireCompetitionDataReq;

        /**
         * Decodes a SolitaireCompetitionDataReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireCompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireCompetitionDataReq;

        /**
         * Verifies a SolitaireCompetitionDataReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireCompetitionDataReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireCompetitionDataReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireCompetitionDataReq;

        /**
         * Creates a plain object from a SolitaireCompetitionDataReq message. Also converts values to other types if specified.
         * @param message SolitaireCompetitionDataReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireCompetitionDataReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireCompetitionDataReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireCompetitionDataResp. */
    interface ISolitaireCompetitionDataResp {

        /** SolitaireCompetitionDataResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireCompetitionDataResp CardDesk */
        CardDesk?: (pb.ISolitaireCarddesk|null);

        /** SolitaireCompetitionDataResp Status */
        Status?: (pb.GameStatus|null);

        /** SolitaireCompetitionDataResp LeftTime */
        LeftTime?: (number|null);

        /** SolitaireCompetitionDataResp CanUndo */
        CanUndo?: (boolean|null);

        /** SolitaireCompetitionDataResp FreeRandCount */
        FreeRandCount?: (number|null);

        /** SolitaireCompetitionDataResp score */
        score?: (number|null);
    }

    /** Represents a SolitaireCompetitionDataResp. */
    class SolitaireCompetitionDataResp implements ISolitaireCompetitionDataResp {

        /**
         * Constructs a new SolitaireCompetitionDataResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireCompetitionDataResp);

        /** SolitaireCompetitionDataResp err. */
        public err: pb.ErrNo;

        /** SolitaireCompetitionDataResp CardDesk. */
        public CardDesk?: (pb.ISolitaireCarddesk|null);

        /** SolitaireCompetitionDataResp Status. */
        public Status: pb.GameStatus;

        /** SolitaireCompetitionDataResp LeftTime. */
        public LeftTime: number;

        /** SolitaireCompetitionDataResp CanUndo. */
        public CanUndo: boolean;

        /** SolitaireCompetitionDataResp FreeRandCount. */
        public FreeRandCount: number;

        /** SolitaireCompetitionDataResp score. */
        public score: number;

        /**
         * Creates a new SolitaireCompetitionDataResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireCompetitionDataResp instance
         */
        public static create(properties?: pb.ISolitaireCompetitionDataResp): pb.SolitaireCompetitionDataResp;

        /**
         * Encodes the specified SolitaireCompetitionDataResp message. Does not implicitly {@link pb.SolitaireCompetitionDataResp.verify|verify} messages.
         * @param message SolitaireCompetitionDataResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireCompetitionDataResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireCompetitionDataResp message, length delimited. Does not implicitly {@link pb.SolitaireCompetitionDataResp.verify|verify} messages.
         * @param message SolitaireCompetitionDataResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireCompetitionDataResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireCompetitionDataResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireCompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireCompetitionDataResp;

        /**
         * Decodes a SolitaireCompetitionDataResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireCompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireCompetitionDataResp;

        /**
         * Verifies a SolitaireCompetitionDataResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireCompetitionDataResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireCompetitionDataResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireCompetitionDataResp;

        /**
         * Creates a plain object from a SolitaireCompetitionDataResp message. Also converts values to other types if specified.
         * @param message SolitaireCompetitionDataResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireCompetitionDataResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireCompetitionDataResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOpRandomReq. */
    interface ISolitaireOpRandomReq {
    }

    /** Represents a SolitaireOpRandomReq. */
    class SolitaireOpRandomReq implements ISolitaireOpRandomReq {

        /**
         * Constructs a new SolitaireOpRandomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOpRandomReq);

        /**
         * Creates a new SolitaireOpRandomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOpRandomReq instance
         */
        public static create(properties?: pb.ISolitaireOpRandomReq): pb.SolitaireOpRandomReq;

        /**
         * Encodes the specified SolitaireOpRandomReq message. Does not implicitly {@link pb.SolitaireOpRandomReq.verify|verify} messages.
         * @param message SolitaireOpRandomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOpRandomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOpRandomReq message, length delimited. Does not implicitly {@link pb.SolitaireOpRandomReq.verify|verify} messages.
         * @param message SolitaireOpRandomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOpRandomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOpRandomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOpRandomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOpRandomReq;

        /**
         * Decodes a SolitaireOpRandomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOpRandomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOpRandomReq;

        /**
         * Verifies a SolitaireOpRandomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOpRandomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOpRandomReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOpRandomReq;

        /**
         * Creates a plain object from a SolitaireOpRandomReq message. Also converts values to other types if specified.
         * @param message SolitaireOpRandomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOpRandomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOpRandomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOpRandomResp. */
    interface ISolitaireOpRandomResp {

        /** SolitaireOpRandomResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireOpRandomResp ShowCards */
        ShowCards?: (Uint8Array|null);

        /** SolitaireOpRandomResp LeftCards */
        LeftCards?: (number|null);

        /** SolitaireOpRandomResp FreeCount */
        FreeCount?: (number|null);

        /** SolitaireOpRandomResp Score */
        Score?: (number|null);
    }

    /** Represents a SolitaireOpRandomResp. */
    class SolitaireOpRandomResp implements ISolitaireOpRandomResp {

        /**
         * Constructs a new SolitaireOpRandomResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOpRandomResp);

        /** SolitaireOpRandomResp err. */
        public err: pb.ErrNo;

        /** SolitaireOpRandomResp ShowCards. */
        public ShowCards: Uint8Array;

        /** SolitaireOpRandomResp LeftCards. */
        public LeftCards: number;

        /** SolitaireOpRandomResp FreeCount. */
        public FreeCount: number;

        /** SolitaireOpRandomResp Score. */
        public Score: number;

        /**
         * Creates a new SolitaireOpRandomResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOpRandomResp instance
         */
        public static create(properties?: pb.ISolitaireOpRandomResp): pb.SolitaireOpRandomResp;

        /**
         * Encodes the specified SolitaireOpRandomResp message. Does not implicitly {@link pb.SolitaireOpRandomResp.verify|verify} messages.
         * @param message SolitaireOpRandomResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOpRandomResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOpRandomResp message, length delimited. Does not implicitly {@link pb.SolitaireOpRandomResp.verify|verify} messages.
         * @param message SolitaireOpRandomResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOpRandomResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOpRandomResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOpRandomResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOpRandomResp;

        /**
         * Decodes a SolitaireOpRandomResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOpRandomResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOpRandomResp;

        /**
         * Verifies a SolitaireOpRandomResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOpRandomResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOpRandomResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOpRandomResp;

        /**
         * Creates a plain object from a SolitaireOpRandomResp message. Also converts values to other types if specified.
         * @param message SolitaireOpRandomResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOpRandomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOpRandomResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_R2PReq. */
    interface ISolitaireOp_R2PReq {

        /** SolitaireOp_R2PReq index */
        index?: (number|null);
    }

    /** Represents a SolitaireOp_R2PReq. */
    class SolitaireOp_R2PReq implements ISolitaireOp_R2PReq {

        /**
         * Constructs a new SolitaireOp_R2PReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_R2PReq);

        /** SolitaireOp_R2PReq index. */
        public index: number;

        /**
         * Creates a new SolitaireOp_R2PReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_R2PReq instance
         */
        public static create(properties?: pb.ISolitaireOp_R2PReq): pb.SolitaireOp_R2PReq;

        /**
         * Encodes the specified SolitaireOp_R2PReq message. Does not implicitly {@link pb.SolitaireOp_R2PReq.verify|verify} messages.
         * @param message SolitaireOp_R2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_R2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_R2PReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2PReq.verify|verify} messages.
         * @param message SolitaireOp_R2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_R2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_R2PReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_R2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_R2PReq;

        /**
         * Decodes a SolitaireOp_R2PReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_R2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_R2PReq;

        /**
         * Verifies a SolitaireOp_R2PReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_R2PReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_R2PReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_R2PReq;

        /**
         * Creates a plain object from a SolitaireOp_R2PReq message. Also converts values to other types if specified.
         * @param message SolitaireOp_R2PReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_R2PReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_R2PReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_R2PResp. */
    interface ISolitaireOp_R2PResp {

        /** SolitaireOp_R2PResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireOp_R2PResp Score */
        Score?: (number|null);
    }

    /** Represents a SolitaireOp_R2PResp. */
    class SolitaireOp_R2PResp implements ISolitaireOp_R2PResp {

        /**
         * Constructs a new SolitaireOp_R2PResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_R2PResp);

        /** SolitaireOp_R2PResp err. */
        public err: pb.ErrNo;

        /** SolitaireOp_R2PResp Score. */
        public Score: number;

        /**
         * Creates a new SolitaireOp_R2PResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_R2PResp instance
         */
        public static create(properties?: pb.ISolitaireOp_R2PResp): pb.SolitaireOp_R2PResp;

        /**
         * Encodes the specified SolitaireOp_R2PResp message. Does not implicitly {@link pb.SolitaireOp_R2PResp.verify|verify} messages.
         * @param message SolitaireOp_R2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_R2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_R2PResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2PResp.verify|verify} messages.
         * @param message SolitaireOp_R2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_R2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_R2PResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_R2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_R2PResp;

        /**
         * Decodes a SolitaireOp_R2PResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_R2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_R2PResp;

        /**
         * Verifies a SolitaireOp_R2PResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_R2PResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_R2PResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_R2PResp;

        /**
         * Creates a plain object from a SolitaireOp_R2PResp message. Also converts values to other types if specified.
         * @param message SolitaireOp_R2PResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_R2PResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_R2PResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_R2FReq. */
    interface ISolitaireOp_R2FReq {

        /** SolitaireOp_R2FReq index */
        index?: (number|null);
    }

    /** Represents a SolitaireOp_R2FReq. */
    class SolitaireOp_R2FReq implements ISolitaireOp_R2FReq {

        /**
         * Constructs a new SolitaireOp_R2FReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_R2FReq);

        /** SolitaireOp_R2FReq index. */
        public index: number;

        /**
         * Creates a new SolitaireOp_R2FReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_R2FReq instance
         */
        public static create(properties?: pb.ISolitaireOp_R2FReq): pb.SolitaireOp_R2FReq;

        /**
         * Encodes the specified SolitaireOp_R2FReq message. Does not implicitly {@link pb.SolitaireOp_R2FReq.verify|verify} messages.
         * @param message SolitaireOp_R2FReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_R2FReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_R2FReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2FReq.verify|verify} messages.
         * @param message SolitaireOp_R2FReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_R2FReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_R2FReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_R2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_R2FReq;

        /**
         * Decodes a SolitaireOp_R2FReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_R2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_R2FReq;

        /**
         * Verifies a SolitaireOp_R2FReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_R2FReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_R2FReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_R2FReq;

        /**
         * Creates a plain object from a SolitaireOp_R2FReq message. Also converts values to other types if specified.
         * @param message SolitaireOp_R2FReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_R2FReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_R2FReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_R2FResp. */
    interface ISolitaireOp_R2FResp {

        /** SolitaireOp_R2FResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireOp_R2FResp Score */
        Score?: (number|null);
    }

    /** Represents a SolitaireOp_R2FResp. */
    class SolitaireOp_R2FResp implements ISolitaireOp_R2FResp {

        /**
         * Constructs a new SolitaireOp_R2FResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_R2FResp);

        /** SolitaireOp_R2FResp err. */
        public err: pb.ErrNo;

        /** SolitaireOp_R2FResp Score. */
        public Score: number;

        /**
         * Creates a new SolitaireOp_R2FResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_R2FResp instance
         */
        public static create(properties?: pb.ISolitaireOp_R2FResp): pb.SolitaireOp_R2FResp;

        /**
         * Encodes the specified SolitaireOp_R2FResp message. Does not implicitly {@link pb.SolitaireOp_R2FResp.verify|verify} messages.
         * @param message SolitaireOp_R2FResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_R2FResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_R2FResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2FResp.verify|verify} messages.
         * @param message SolitaireOp_R2FResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_R2FResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_R2FResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_R2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_R2FResp;

        /**
         * Decodes a SolitaireOp_R2FResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_R2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_R2FResp;

        /**
         * Verifies a SolitaireOp_R2FResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_R2FResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_R2FResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_R2FResp;

        /**
         * Creates a plain object from a SolitaireOp_R2FResp message. Also converts values to other types if specified.
         * @param message SolitaireOp_R2FResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_R2FResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_R2FResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_P2FReq. */
    interface ISolitaireOp_P2FReq {

        /** SolitaireOp_P2FReq SrcIndex */
        SrcIndex?: (number|null);

        /** SolitaireOp_P2FReq DestIndex */
        DestIndex?: (number|null);
    }

    /** Represents a SolitaireOp_P2FReq. */
    class SolitaireOp_P2FReq implements ISolitaireOp_P2FReq {

        /**
         * Constructs a new SolitaireOp_P2FReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_P2FReq);

        /** SolitaireOp_P2FReq SrcIndex. */
        public SrcIndex: number;

        /** SolitaireOp_P2FReq DestIndex. */
        public DestIndex: number;

        /**
         * Creates a new SolitaireOp_P2FReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_P2FReq instance
         */
        public static create(properties?: pb.ISolitaireOp_P2FReq): pb.SolitaireOp_P2FReq;

        /**
         * Encodes the specified SolitaireOp_P2FReq message. Does not implicitly {@link pb.SolitaireOp_P2FReq.verify|verify} messages.
         * @param message SolitaireOp_P2FReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_P2FReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_P2FReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2FReq.verify|verify} messages.
         * @param message SolitaireOp_P2FReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_P2FReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_P2FReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_P2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_P2FReq;

        /**
         * Decodes a SolitaireOp_P2FReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_P2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_P2FReq;

        /**
         * Verifies a SolitaireOp_P2FReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_P2FReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_P2FReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_P2FReq;

        /**
         * Creates a plain object from a SolitaireOp_P2FReq message. Also converts values to other types if specified.
         * @param message SolitaireOp_P2FReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_P2FReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_P2FReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_P2FResp. */
    interface ISolitaireOp_P2FResp {

        /** SolitaireOp_P2FResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireOp_P2FResp NewCard */
        NewCard?: (number|null);

        /** SolitaireOp_P2FResp Index */
        Index?: (number|null);

        /** SolitaireOp_P2FResp LeftCard */
        LeftCard?: (number|null);

        /** SolitaireOp_P2FResp Score */
        Score?: (number|null);
    }

    /** Represents a SolitaireOp_P2FResp. */
    class SolitaireOp_P2FResp implements ISolitaireOp_P2FResp {

        /**
         * Constructs a new SolitaireOp_P2FResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_P2FResp);

        /** SolitaireOp_P2FResp err. */
        public err: pb.ErrNo;

        /** SolitaireOp_P2FResp NewCard. */
        public NewCard: number;

        /** SolitaireOp_P2FResp Index. */
        public Index: number;

        /** SolitaireOp_P2FResp LeftCard. */
        public LeftCard: number;

        /** SolitaireOp_P2FResp Score. */
        public Score: number;

        /**
         * Creates a new SolitaireOp_P2FResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_P2FResp instance
         */
        public static create(properties?: pb.ISolitaireOp_P2FResp): pb.SolitaireOp_P2FResp;

        /**
         * Encodes the specified SolitaireOp_P2FResp message. Does not implicitly {@link pb.SolitaireOp_P2FResp.verify|verify} messages.
         * @param message SolitaireOp_P2FResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_P2FResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_P2FResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2FResp.verify|verify} messages.
         * @param message SolitaireOp_P2FResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_P2FResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_P2FResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_P2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_P2FResp;

        /**
         * Decodes a SolitaireOp_P2FResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_P2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_P2FResp;

        /**
         * Verifies a SolitaireOp_P2FResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_P2FResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_P2FResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_P2FResp;

        /**
         * Creates a plain object from a SolitaireOp_P2FResp message. Also converts values to other types if specified.
         * @param message SolitaireOp_P2FResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_P2FResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_P2FResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_F2PReq. */
    interface ISolitaireOp_F2PReq {

        /** SolitaireOp_F2PReq SrcIndex */
        SrcIndex?: (number|null);

        /** SolitaireOp_F2PReq DestIndex */
        DestIndex?: (number|null);
    }

    /** Represents a SolitaireOp_F2PReq. */
    class SolitaireOp_F2PReq implements ISolitaireOp_F2PReq {

        /**
         * Constructs a new SolitaireOp_F2PReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_F2PReq);

        /** SolitaireOp_F2PReq SrcIndex. */
        public SrcIndex: number;

        /** SolitaireOp_F2PReq DestIndex. */
        public DestIndex: number;

        /**
         * Creates a new SolitaireOp_F2PReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_F2PReq instance
         */
        public static create(properties?: pb.ISolitaireOp_F2PReq): pb.SolitaireOp_F2PReq;

        /**
         * Encodes the specified SolitaireOp_F2PReq message. Does not implicitly {@link pb.SolitaireOp_F2PReq.verify|verify} messages.
         * @param message SolitaireOp_F2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_F2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_F2PReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_F2PReq.verify|verify} messages.
         * @param message SolitaireOp_F2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_F2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_F2PReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_F2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_F2PReq;

        /**
         * Decodes a SolitaireOp_F2PReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_F2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_F2PReq;

        /**
         * Verifies a SolitaireOp_F2PReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_F2PReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_F2PReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_F2PReq;

        /**
         * Creates a plain object from a SolitaireOp_F2PReq message. Also converts values to other types if specified.
         * @param message SolitaireOp_F2PReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_F2PReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_F2PReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_F2PResp. */
    interface ISolitaireOp_F2PResp {

        /** SolitaireOp_F2PResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireOp_F2PResp Score */
        Score?: (number|null);
    }

    /** Represents a SolitaireOp_F2PResp. */
    class SolitaireOp_F2PResp implements ISolitaireOp_F2PResp {

        /**
         * Constructs a new SolitaireOp_F2PResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_F2PResp);

        /** SolitaireOp_F2PResp err. */
        public err: pb.ErrNo;

        /** SolitaireOp_F2PResp Score. */
        public Score: number;

        /**
         * Creates a new SolitaireOp_F2PResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_F2PResp instance
         */
        public static create(properties?: pb.ISolitaireOp_F2PResp): pb.SolitaireOp_F2PResp;

        /**
         * Encodes the specified SolitaireOp_F2PResp message. Does not implicitly {@link pb.SolitaireOp_F2PResp.verify|verify} messages.
         * @param message SolitaireOp_F2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_F2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_F2PResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_F2PResp.verify|verify} messages.
         * @param message SolitaireOp_F2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_F2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_F2PResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_F2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_F2PResp;

        /**
         * Decodes a SolitaireOp_F2PResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_F2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_F2PResp;

        /**
         * Verifies a SolitaireOp_F2PResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_F2PResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_F2PResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_F2PResp;

        /**
         * Creates a plain object from a SolitaireOp_F2PResp message. Also converts values to other types if specified.
         * @param message SolitaireOp_F2PResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_F2PResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_F2PResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_P2PReq. */
    interface ISolitaireOp_P2PReq {

        /** SolitaireOp_P2PReq SrcIndex */
        SrcIndex?: (number|null);

        /** SolitaireOp_P2PReq Number */
        Number?: (number|null);

        /** SolitaireOp_P2PReq DestIndex */
        DestIndex?: (number|null);
    }

    /** Represents a SolitaireOp_P2PReq. */
    class SolitaireOp_P2PReq implements ISolitaireOp_P2PReq {

        /**
         * Constructs a new SolitaireOp_P2PReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_P2PReq);

        /** SolitaireOp_P2PReq SrcIndex. */
        public SrcIndex: number;

        /** SolitaireOp_P2PReq Number. */
        public Number: number;

        /** SolitaireOp_P2PReq DestIndex. */
        public DestIndex: number;

        /**
         * Creates a new SolitaireOp_P2PReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_P2PReq instance
         */
        public static create(properties?: pb.ISolitaireOp_P2PReq): pb.SolitaireOp_P2PReq;

        /**
         * Encodes the specified SolitaireOp_P2PReq message. Does not implicitly {@link pb.SolitaireOp_P2PReq.verify|verify} messages.
         * @param message SolitaireOp_P2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_P2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_P2PReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2PReq.verify|verify} messages.
         * @param message SolitaireOp_P2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_P2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_P2PReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_P2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_P2PReq;

        /**
         * Decodes a SolitaireOp_P2PReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_P2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_P2PReq;

        /**
         * Verifies a SolitaireOp_P2PReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_P2PReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_P2PReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_P2PReq;

        /**
         * Creates a plain object from a SolitaireOp_P2PReq message. Also converts values to other types if specified.
         * @param message SolitaireOp_P2PReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_P2PReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_P2PReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOp_P2PResp. */
    interface ISolitaireOp_P2PResp {

        /** SolitaireOp_P2PResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireOp_P2PResp NewCard */
        NewCard?: (number|null);

        /** SolitaireOp_P2PResp Index */
        Index?: (number|null);

        /** SolitaireOp_P2PResp LeftCard */
        LeftCard?: (number|null);

        /** SolitaireOp_P2PResp Score */
        Score?: (number|null);
    }

    /** Represents a SolitaireOp_P2PResp. */
    class SolitaireOp_P2PResp implements ISolitaireOp_P2PResp {

        /**
         * Constructs a new SolitaireOp_P2PResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOp_P2PResp);

        /** SolitaireOp_P2PResp err. */
        public err: pb.ErrNo;

        /** SolitaireOp_P2PResp NewCard. */
        public NewCard: number;

        /** SolitaireOp_P2PResp Index. */
        public Index: number;

        /** SolitaireOp_P2PResp LeftCard. */
        public LeftCard: number;

        /** SolitaireOp_P2PResp Score. */
        public Score: number;

        /**
         * Creates a new SolitaireOp_P2PResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOp_P2PResp instance
         */
        public static create(properties?: pb.ISolitaireOp_P2PResp): pb.SolitaireOp_P2PResp;

        /**
         * Encodes the specified SolitaireOp_P2PResp message. Does not implicitly {@link pb.SolitaireOp_P2PResp.verify|verify} messages.
         * @param message SolitaireOp_P2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOp_P2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOp_P2PResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2PResp.verify|verify} messages.
         * @param message SolitaireOp_P2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOp_P2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOp_P2PResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOp_P2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOp_P2PResp;

        /**
         * Decodes a SolitaireOp_P2PResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOp_P2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOp_P2PResp;

        /**
         * Verifies a SolitaireOp_P2PResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOp_P2PResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOp_P2PResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOp_P2PResp;

        /**
         * Creates a plain object from a SolitaireOp_P2PResp message. Also converts values to other types if specified.
         * @param message SolitaireOp_P2PResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOp_P2PResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOp_P2PResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireFinishReq. */
    interface ISolitaireFinishReq {
    }

    /** Represents a SolitaireFinishReq. */
    class SolitaireFinishReq implements ISolitaireFinishReq {

        /**
         * Constructs a new SolitaireFinishReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireFinishReq);

        /**
         * Creates a new SolitaireFinishReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireFinishReq instance
         */
        public static create(properties?: pb.ISolitaireFinishReq): pb.SolitaireFinishReq;

        /**
         * Encodes the specified SolitaireFinishReq message. Does not implicitly {@link pb.SolitaireFinishReq.verify|verify} messages.
         * @param message SolitaireFinishReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireFinishReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireFinishReq message, length delimited. Does not implicitly {@link pb.SolitaireFinishReq.verify|verify} messages.
         * @param message SolitaireFinishReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireFinishReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireFinishReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireFinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireFinishReq;

        /**
         * Decodes a SolitaireFinishReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireFinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireFinishReq;

        /**
         * Verifies a SolitaireFinishReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireFinishReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireFinishReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireFinishReq;

        /**
         * Creates a plain object from a SolitaireFinishReq message. Also converts values to other types if specified.
         * @param message SolitaireFinishReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireFinishReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireFinishReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireReward. */
    interface ISolitaireReward {

        /** SolitaireReward Score */
        Score?: (number|null);

        /** SolitaireReward TimeScore */
        TimeScore?: (number|null);
    }

    /** Represents a SolitaireReward. */
    class SolitaireReward implements ISolitaireReward {

        /**
         * Constructs a new SolitaireReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireReward);

        /** SolitaireReward Score. */
        public Score: number;

        /** SolitaireReward TimeScore. */
        public TimeScore: number;

        /**
         * Creates a new SolitaireReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireReward instance
         */
        public static create(properties?: pb.ISolitaireReward): pb.SolitaireReward;

        /**
         * Encodes the specified SolitaireReward message. Does not implicitly {@link pb.SolitaireReward.verify|verify} messages.
         * @param message SolitaireReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireReward message, length delimited. Does not implicitly {@link pb.SolitaireReward.verify|verify} messages.
         * @param message SolitaireReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireReward;

        /**
         * Decodes a SolitaireReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireReward;

        /**
         * Verifies a SolitaireReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireReward
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireReward;

        /**
         * Creates a plain object from a SolitaireReward message. Also converts values to other types if specified.
         * @param message SolitaireReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireFinishResp. */
    interface ISolitaireFinishResp {

        /** SolitaireFinishResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireFinishResp reason */
        reason?: (pb.GameOverReason|null);

        /** SolitaireFinishResp reward */
        reward?: (pb.ISolitaireReward|null);

        /** SolitaireFinishResp LiftBestScore */
        LiftBestScore?: (number|null);

        /** SolitaireFinishResp TodayBestScore */
        TodayBestScore?: (number|null);
    }

    /** Represents a SolitaireFinishResp. */
    class SolitaireFinishResp implements ISolitaireFinishResp {

        /**
         * Constructs a new SolitaireFinishResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireFinishResp);

        /** SolitaireFinishResp err. */
        public err: pb.ErrNo;

        /** SolitaireFinishResp reason. */
        public reason: pb.GameOverReason;

        /** SolitaireFinishResp reward. */
        public reward?: (pb.ISolitaireReward|null);

        /** SolitaireFinishResp LiftBestScore. */
        public LiftBestScore: number;

        /** SolitaireFinishResp TodayBestScore. */
        public TodayBestScore: number;

        /**
         * Creates a new SolitaireFinishResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireFinishResp instance
         */
        public static create(properties?: pb.ISolitaireFinishResp): pb.SolitaireFinishResp;

        /**
         * Encodes the specified SolitaireFinishResp message. Does not implicitly {@link pb.SolitaireFinishResp.verify|verify} messages.
         * @param message SolitaireFinishResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireFinishResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireFinishResp message, length delimited. Does not implicitly {@link pb.SolitaireFinishResp.verify|verify} messages.
         * @param message SolitaireFinishResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireFinishResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireFinishResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireFinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireFinishResp;

        /**
         * Decodes a SolitaireFinishResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireFinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireFinishResp;

        /**
         * Verifies a SolitaireFinishResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireFinishResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireFinishResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireFinishResp;

        /**
         * Creates a plain object from a SolitaireFinishResp message. Also converts values to other types if specified.
         * @param message SolitaireFinishResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireFinishResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireFinishResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitairePauseGameReq. */
    interface ISolitairePauseGameReq {
    }

    /** Represents a SolitairePauseGameReq. */
    class SolitairePauseGameReq implements ISolitairePauseGameReq {

        /**
         * Constructs a new SolitairePauseGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitairePauseGameReq);

        /**
         * Creates a new SolitairePauseGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitairePauseGameReq instance
         */
        public static create(properties?: pb.ISolitairePauseGameReq): pb.SolitairePauseGameReq;

        /**
         * Encodes the specified SolitairePauseGameReq message. Does not implicitly {@link pb.SolitairePauseGameReq.verify|verify} messages.
         * @param message SolitairePauseGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitairePauseGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitairePauseGameReq message, length delimited. Does not implicitly {@link pb.SolitairePauseGameReq.verify|verify} messages.
         * @param message SolitairePauseGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitairePauseGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitairePauseGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitairePauseGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitairePauseGameReq;

        /**
         * Decodes a SolitairePauseGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitairePauseGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitairePauseGameReq;

        /**
         * Verifies a SolitairePauseGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitairePauseGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitairePauseGameReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitairePauseGameReq;

        /**
         * Creates a plain object from a SolitairePauseGameReq message. Also converts values to other types if specified.
         * @param message SolitairePauseGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitairePauseGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitairePauseGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitairePauseGameResp. */
    interface ISolitairePauseGameResp {

        /** SolitairePauseGameResp err */
        err?: (pb.ErrNo|null);
    }

    /** Represents a SolitairePauseGameResp. */
    class SolitairePauseGameResp implements ISolitairePauseGameResp {

        /**
         * Constructs a new SolitairePauseGameResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitairePauseGameResp);

        /** SolitairePauseGameResp err. */
        public err: pb.ErrNo;

        /**
         * Creates a new SolitairePauseGameResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitairePauseGameResp instance
         */
        public static create(properties?: pb.ISolitairePauseGameResp): pb.SolitairePauseGameResp;

        /**
         * Encodes the specified SolitairePauseGameResp message. Does not implicitly {@link pb.SolitairePauseGameResp.verify|verify} messages.
         * @param message SolitairePauseGameResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitairePauseGameResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitairePauseGameResp message, length delimited. Does not implicitly {@link pb.SolitairePauseGameResp.verify|verify} messages.
         * @param message SolitairePauseGameResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitairePauseGameResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitairePauseGameResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitairePauseGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitairePauseGameResp;

        /**
         * Decodes a SolitairePauseGameResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitairePauseGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitairePauseGameResp;

        /**
         * Verifies a SolitairePauseGameResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitairePauseGameResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitairePauseGameResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitairePauseGameResp;

        /**
         * Creates a plain object from a SolitairePauseGameResp message. Also converts values to other types if specified.
         * @param message SolitairePauseGameResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitairePauseGameResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitairePauseGameResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireRecoverGameReq. */
    interface ISolitaireRecoverGameReq {
    }

    /** Represents a SolitaireRecoverGameReq. */
    class SolitaireRecoverGameReq implements ISolitaireRecoverGameReq {

        /**
         * Constructs a new SolitaireRecoverGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireRecoverGameReq);

        /**
         * Creates a new SolitaireRecoverGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireRecoverGameReq instance
         */
        public static create(properties?: pb.ISolitaireRecoverGameReq): pb.SolitaireRecoverGameReq;

        /**
         * Encodes the specified SolitaireRecoverGameReq message. Does not implicitly {@link pb.SolitaireRecoverGameReq.verify|verify} messages.
         * @param message SolitaireRecoverGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireRecoverGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireRecoverGameReq message, length delimited. Does not implicitly {@link pb.SolitaireRecoverGameReq.verify|verify} messages.
         * @param message SolitaireRecoverGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireRecoverGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireRecoverGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireRecoverGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireRecoverGameReq;

        /**
         * Decodes a SolitaireRecoverGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireRecoverGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireRecoverGameReq;

        /**
         * Verifies a SolitaireRecoverGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireRecoverGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireRecoverGameReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireRecoverGameReq;

        /**
         * Creates a plain object from a SolitaireRecoverGameReq message. Also converts values to other types if specified.
         * @param message SolitaireRecoverGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireRecoverGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireRecoverGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireRecoverGameResp. */
    interface ISolitaireRecoverGameResp {

        /** SolitaireRecoverGameResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireRecoverGameResp LeftTime */
        LeftTime?: (number|null);
    }

    /** Represents a SolitaireRecoverGameResp. */
    class SolitaireRecoverGameResp implements ISolitaireRecoverGameResp {

        /**
         * Constructs a new SolitaireRecoverGameResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireRecoverGameResp);

        /** SolitaireRecoverGameResp err. */
        public err: pb.ErrNo;

        /** SolitaireRecoverGameResp LeftTime. */
        public LeftTime: number;

        /**
         * Creates a new SolitaireRecoverGameResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireRecoverGameResp instance
         */
        public static create(properties?: pb.ISolitaireRecoverGameResp): pb.SolitaireRecoverGameResp;

        /**
         * Encodes the specified SolitaireRecoverGameResp message. Does not implicitly {@link pb.SolitaireRecoverGameResp.verify|verify} messages.
         * @param message SolitaireRecoverGameResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireRecoverGameResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireRecoverGameResp message, length delimited. Does not implicitly {@link pb.SolitaireRecoverGameResp.verify|verify} messages.
         * @param message SolitaireRecoverGameResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireRecoverGameResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireRecoverGameResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireRecoverGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireRecoverGameResp;

        /**
         * Decodes a SolitaireRecoverGameResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireRecoverGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireRecoverGameResp;

        /**
         * Verifies a SolitaireRecoverGameResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireRecoverGameResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireRecoverGameResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireRecoverGameResp;

        /**
         * Creates a plain object from a SolitaireRecoverGameResp message. Also converts values to other types if specified.
         * @param message SolitaireRecoverGameResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireRecoverGameResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireRecoverGameResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoReq. */
    interface ISolitaireUndoReq {
    }

    /** Represents a SolitaireUndoReq. */
    class SolitaireUndoReq implements ISolitaireUndoReq {

        /**
         * Constructs a new SolitaireUndoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoReq);

        /**
         * Creates a new SolitaireUndoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoReq instance
         */
        public static create(properties?: pb.ISolitaireUndoReq): pb.SolitaireUndoReq;

        /**
         * Encodes the specified SolitaireUndoReq message. Does not implicitly {@link pb.SolitaireUndoReq.verify|verify} messages.
         * @param message SolitaireUndoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoReq message, length delimited. Does not implicitly {@link pb.SolitaireUndoReq.verify|verify} messages.
         * @param message SolitaireUndoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoReq;

        /**
         * Decodes a SolitaireUndoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoReq;

        /**
         * Verifies a SolitaireUndoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoReq;

        /**
         * Creates a plain object from a SolitaireUndoReq message. Also converts values to other types if specified.
         * @param message SolitaireUndoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoOpR2P. */
    interface ISolitaireUndoOpR2P {

        /** SolitaireUndoOpR2P index */
        index?: (number|null);
    }

    /** Represents a SolitaireUndoOpR2P. */
    class SolitaireUndoOpR2P implements ISolitaireUndoOpR2P {

        /**
         * Constructs a new SolitaireUndoOpR2P.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoOpR2P);

        /** SolitaireUndoOpR2P index. */
        public index: number;

        /**
         * Creates a new SolitaireUndoOpR2P instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoOpR2P instance
         */
        public static create(properties?: pb.ISolitaireUndoOpR2P): pb.SolitaireUndoOpR2P;

        /**
         * Encodes the specified SolitaireUndoOpR2P message. Does not implicitly {@link pb.SolitaireUndoOpR2P.verify|verify} messages.
         * @param message SolitaireUndoOpR2P message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoOpR2P, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoOpR2P message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpR2P.verify|verify} messages.
         * @param message SolitaireUndoOpR2P message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoOpR2P, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoOpR2P message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoOpR2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoOpR2P;

        /**
         * Decodes a SolitaireUndoOpR2P message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoOpR2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoOpR2P;

        /**
         * Verifies a SolitaireUndoOpR2P message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoOpR2P message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoOpR2P
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoOpR2P;

        /**
         * Creates a plain object from a SolitaireUndoOpR2P message. Also converts values to other types if specified.
         * @param message SolitaireUndoOpR2P
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoOpR2P, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoOpR2P to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoOpR2F. */
    interface ISolitaireUndoOpR2F {

        /** SolitaireUndoOpR2F index */
        index?: (number|null);
    }

    /** Represents a SolitaireUndoOpR2F. */
    class SolitaireUndoOpR2F implements ISolitaireUndoOpR2F {

        /**
         * Constructs a new SolitaireUndoOpR2F.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoOpR2F);

        /** SolitaireUndoOpR2F index. */
        public index: number;

        /**
         * Creates a new SolitaireUndoOpR2F instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoOpR2F instance
         */
        public static create(properties?: pb.ISolitaireUndoOpR2F): pb.SolitaireUndoOpR2F;

        /**
         * Encodes the specified SolitaireUndoOpR2F message. Does not implicitly {@link pb.SolitaireUndoOpR2F.verify|verify} messages.
         * @param message SolitaireUndoOpR2F message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoOpR2F, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoOpR2F message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpR2F.verify|verify} messages.
         * @param message SolitaireUndoOpR2F message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoOpR2F, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoOpR2F message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoOpR2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoOpR2F;

        /**
         * Decodes a SolitaireUndoOpR2F message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoOpR2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoOpR2F;

        /**
         * Verifies a SolitaireUndoOpR2F message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoOpR2F message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoOpR2F
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoOpR2F;

        /**
         * Creates a plain object from a SolitaireUndoOpR2F message. Also converts values to other types if specified.
         * @param message SolitaireUndoOpR2F
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoOpR2F, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoOpR2F to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoOpP2F. */
    interface ISolitaireUndoOpP2F {

        /** SolitaireUndoOpP2F SrcIndex */
        SrcIndex?: (number|null);

        /** SolitaireUndoOpP2F DestIndex */
        DestIndex?: (number|null);

        /** SolitaireUndoOpP2F IsMuck */
        IsMuck?: (boolean|null);
    }

    /** Represents a SolitaireUndoOpP2F. */
    class SolitaireUndoOpP2F implements ISolitaireUndoOpP2F {

        /**
         * Constructs a new SolitaireUndoOpP2F.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoOpP2F);

        /** SolitaireUndoOpP2F SrcIndex. */
        public SrcIndex: number;

        /** SolitaireUndoOpP2F DestIndex. */
        public DestIndex: number;

        /** SolitaireUndoOpP2F IsMuck. */
        public IsMuck: boolean;

        /**
         * Creates a new SolitaireUndoOpP2F instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoOpP2F instance
         */
        public static create(properties?: pb.ISolitaireUndoOpP2F): pb.SolitaireUndoOpP2F;

        /**
         * Encodes the specified SolitaireUndoOpP2F message. Does not implicitly {@link pb.SolitaireUndoOpP2F.verify|verify} messages.
         * @param message SolitaireUndoOpP2F message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoOpP2F, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoOpP2F message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpP2F.verify|verify} messages.
         * @param message SolitaireUndoOpP2F message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoOpP2F, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoOpP2F message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoOpP2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoOpP2F;

        /**
         * Decodes a SolitaireUndoOpP2F message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoOpP2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoOpP2F;

        /**
         * Verifies a SolitaireUndoOpP2F message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoOpP2F message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoOpP2F
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoOpP2F;

        /**
         * Creates a plain object from a SolitaireUndoOpP2F message. Also converts values to other types if specified.
         * @param message SolitaireUndoOpP2F
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoOpP2F, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoOpP2F to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoOpF2P. */
    interface ISolitaireUndoOpF2P {

        /** SolitaireUndoOpF2P SrcIndex */
        SrcIndex?: (number|null);

        /** SolitaireUndoOpF2P DestIndex */
        DestIndex?: (number|null);
    }

    /** Represents a SolitaireUndoOpF2P. */
    class SolitaireUndoOpF2P implements ISolitaireUndoOpF2P {

        /**
         * Constructs a new SolitaireUndoOpF2P.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoOpF2P);

        /** SolitaireUndoOpF2P SrcIndex. */
        public SrcIndex: number;

        /** SolitaireUndoOpF2P DestIndex. */
        public DestIndex: number;

        /**
         * Creates a new SolitaireUndoOpF2P instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoOpF2P instance
         */
        public static create(properties?: pb.ISolitaireUndoOpF2P): pb.SolitaireUndoOpF2P;

        /**
         * Encodes the specified SolitaireUndoOpF2P message. Does not implicitly {@link pb.SolitaireUndoOpF2P.verify|verify} messages.
         * @param message SolitaireUndoOpF2P message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoOpF2P, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoOpF2P message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpF2P.verify|verify} messages.
         * @param message SolitaireUndoOpF2P message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoOpF2P, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoOpF2P message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoOpF2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoOpF2P;

        /**
         * Decodes a SolitaireUndoOpF2P message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoOpF2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoOpF2P;

        /**
         * Verifies a SolitaireUndoOpF2P message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoOpF2P message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoOpF2P
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoOpF2P;

        /**
         * Creates a plain object from a SolitaireUndoOpF2P message. Also converts values to other types if specified.
         * @param message SolitaireUndoOpF2P
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoOpF2P, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoOpF2P to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoOpP2P. */
    interface ISolitaireUndoOpP2P {

        /** SolitaireUndoOpP2P SrcIndex */
        SrcIndex?: (number|null);

        /** SolitaireUndoOpP2P Number */
        Number?: (number|null);

        /** SolitaireUndoOpP2P DestIndex */
        DestIndex?: (number|null);

        /** SolitaireUndoOpP2P IsMuck */
        IsMuck?: (boolean|null);
    }

    /** Represents a SolitaireUndoOpP2P. */
    class SolitaireUndoOpP2P implements ISolitaireUndoOpP2P {

        /**
         * Constructs a new SolitaireUndoOpP2P.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoOpP2P);

        /** SolitaireUndoOpP2P SrcIndex. */
        public SrcIndex: number;

        /** SolitaireUndoOpP2P Number. */
        public Number: number;

        /** SolitaireUndoOpP2P DestIndex. */
        public DestIndex: number;

        /** SolitaireUndoOpP2P IsMuck. */
        public IsMuck: boolean;

        /**
         * Creates a new SolitaireUndoOpP2P instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoOpP2P instance
         */
        public static create(properties?: pb.ISolitaireUndoOpP2P): pb.SolitaireUndoOpP2P;

        /**
         * Encodes the specified SolitaireUndoOpP2P message. Does not implicitly {@link pb.SolitaireUndoOpP2P.verify|verify} messages.
         * @param message SolitaireUndoOpP2P message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoOpP2P, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoOpP2P message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpP2P.verify|verify} messages.
         * @param message SolitaireUndoOpP2P message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoOpP2P, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoOpP2P message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoOpP2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoOpP2P;

        /**
         * Decodes a SolitaireUndoOpP2P message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoOpP2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoOpP2P;

        /**
         * Verifies a SolitaireUndoOpP2P message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoOpP2P message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoOpP2P
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoOpP2P;

        /**
         * Creates a plain object from a SolitaireUndoOpP2P message. Also converts values to other types if specified.
         * @param message SolitaireUndoOpP2P
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoOpP2P, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoOpP2P to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoOpRand. */
    interface ISolitaireUndoOpRand {

        /** SolitaireUndoOpRand cards */
        cards?: (Uint8Array|null);

        /** SolitaireUndoOpRand LeftCard */
        LeftCard?: (number|null);

        /** SolitaireUndoOpRand FreeCount */
        FreeCount?: (number|null);

        /** SolitaireUndoOpRand index */
        index?: (number|null);

        /** SolitaireUndoOpRand tindex */
        tindex?: (number|null);
    }

    /** Represents a SolitaireUndoOpRand. */
    class SolitaireUndoOpRand implements ISolitaireUndoOpRand {

        /**
         * Constructs a new SolitaireUndoOpRand.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoOpRand);

        /** SolitaireUndoOpRand cards. */
        public cards: Uint8Array;

        /** SolitaireUndoOpRand LeftCard. */
        public LeftCard: number;

        /** SolitaireUndoOpRand FreeCount. */
        public FreeCount: number;

        /** SolitaireUndoOpRand index. */
        public index: number;

        /** SolitaireUndoOpRand tindex. */
        public tindex: number;

        /**
         * Creates a new SolitaireUndoOpRand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoOpRand instance
         */
        public static create(properties?: pb.ISolitaireUndoOpRand): pb.SolitaireUndoOpRand;

        /**
         * Encodes the specified SolitaireUndoOpRand message. Does not implicitly {@link pb.SolitaireUndoOpRand.verify|verify} messages.
         * @param message SolitaireUndoOpRand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoOpRand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoOpRand message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpRand.verify|verify} messages.
         * @param message SolitaireUndoOpRand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoOpRand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoOpRand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoOpRand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoOpRand;

        /**
         * Decodes a SolitaireUndoOpRand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoOpRand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoOpRand;

        /**
         * Verifies a SolitaireUndoOpRand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoOpRand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoOpRand
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoOpRand;

        /**
         * Creates a plain object from a SolitaireUndoOpRand message. Also converts values to other types if specified.
         * @param message SolitaireUndoOpRand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoOpRand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoOpRand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireUndoResp. */
    interface ISolitaireUndoResp {

        /** SolitaireUndoResp err */
        err?: (pb.ErrNo|null);

        /** SolitaireUndoResp type */
        type?: (pb.UndoOpType|null);

        /** SolitaireUndoResp r2p */
        r2p?: (pb.ISolitaireUndoOpR2P|null);

        /** SolitaireUndoResp r2f */
        r2f?: (pb.ISolitaireUndoOpR2F|null);

        /** SolitaireUndoResp p2f */
        p2f?: (pb.ISolitaireUndoOpP2F|null);

        /** SolitaireUndoResp f2p */
        f2p?: (pb.ISolitaireUndoOpF2P|null);

        /** SolitaireUndoResp p2p */
        p2p?: (pb.ISolitaireUndoOpP2P|null);

        /** SolitaireUndoResp rand */
        rand?: (pb.ISolitaireUndoOpRand|null);

        /** SolitaireUndoResp score */
        score?: (number|null);
    }

    /** Represents a SolitaireUndoResp. */
    class SolitaireUndoResp implements ISolitaireUndoResp {

        /**
         * Constructs a new SolitaireUndoResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireUndoResp);

        /** SolitaireUndoResp err. */
        public err: pb.ErrNo;

        /** SolitaireUndoResp type. */
        public type: pb.UndoOpType;

        /** SolitaireUndoResp r2p. */
        public r2p?: (pb.ISolitaireUndoOpR2P|null);

        /** SolitaireUndoResp r2f. */
        public r2f?: (pb.ISolitaireUndoOpR2F|null);

        /** SolitaireUndoResp p2f. */
        public p2f?: (pb.ISolitaireUndoOpP2F|null);

        /** SolitaireUndoResp f2p. */
        public f2p?: (pb.ISolitaireUndoOpF2P|null);

        /** SolitaireUndoResp p2p. */
        public p2p?: (pb.ISolitaireUndoOpP2P|null);

        /** SolitaireUndoResp rand. */
        public rand?: (pb.ISolitaireUndoOpRand|null);

        /** SolitaireUndoResp score. */
        public score: number;

        /**
         * Creates a new SolitaireUndoResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireUndoResp instance
         */
        public static create(properties?: pb.ISolitaireUndoResp): pb.SolitaireUndoResp;

        /**
         * Encodes the specified SolitaireUndoResp message. Does not implicitly {@link pb.SolitaireUndoResp.verify|verify} messages.
         * @param message SolitaireUndoResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireUndoResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireUndoResp message, length delimited. Does not implicitly {@link pb.SolitaireUndoResp.verify|verify} messages.
         * @param message SolitaireUndoResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireUndoResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireUndoResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireUndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireUndoResp;

        /**
         * Decodes a SolitaireUndoResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireUndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireUndoResp;

        /**
         * Verifies a SolitaireUndoResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireUndoResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireUndoResp
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireUndoResp;

        /**
         * Creates a plain object from a SolitaireUndoResp message. Also converts values to other types if specified.
         * @param message SolitaireUndoResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireUndoResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireUndoResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SolitaireOpReq. */
    interface ISolitaireOpReq {

        /** SolitaireOpReq RoomID */
        RoomID?: (number|null);

        /** SolitaireOpReq opData */
        opData?: (pb.ISolitaireCompetitionDataReq|null);

        /** SolitaireOpReq opRand */
        opRand?: (pb.ISolitaireOpRandomReq|null);

        /** SolitaireOpReq opR2p */
        opR2p?: (pb.ISolitaireOp_R2PReq|null);

        /** SolitaireOpReq opR2f */
        opR2f?: (pb.ISolitaireOp_R2FReq|null);

        /** SolitaireOpReq opP2f */
        opP2f?: (pb.ISolitaireOp_P2FReq|null);

        /** SolitaireOpReq opF2p */
        opF2p?: (pb.ISolitaireOp_F2PReq|null);

        /** SolitaireOpReq opP2p */
        opP2p?: (pb.ISolitaireOp_P2PReq|null);

        /** SolitaireOpReq opFin */
        opFin?: (pb.ISolitaireFinishReq|null);

        /** SolitaireOpReq opPause */
        opPause?: (pb.ISolitairePauseGameReq|null);

        /** SolitaireOpReq opRecover */
        opRecover?: (pb.ISolitaireRecoverGameReq|null);

        /** SolitaireOpReq opUndo */
        opUndo?: (pb.ISolitaireUndoReq|null);
    }

    /** Represents a SolitaireOpReq. */
    class SolitaireOpReq implements ISolitaireOpReq {

        /**
         * Constructs a new SolitaireOpReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISolitaireOpReq);

        /** SolitaireOpReq RoomID. */
        public RoomID: number;

        /** SolitaireOpReq opData. */
        public opData?: (pb.ISolitaireCompetitionDataReq|null);

        /** SolitaireOpReq opRand. */
        public opRand?: (pb.ISolitaireOpRandomReq|null);

        /** SolitaireOpReq opR2p. */
        public opR2p?: (pb.ISolitaireOp_R2PReq|null);

        /** SolitaireOpReq opR2f. */
        public opR2f?: (pb.ISolitaireOp_R2FReq|null);

        /** SolitaireOpReq opP2f. */
        public opP2f?: (pb.ISolitaireOp_P2FReq|null);

        /** SolitaireOpReq opF2p. */
        public opF2p?: (pb.ISolitaireOp_F2PReq|null);

        /** SolitaireOpReq opP2p. */
        public opP2p?: (pb.ISolitaireOp_P2PReq|null);

        /** SolitaireOpReq opFin. */
        public opFin?: (pb.ISolitaireFinishReq|null);

        /** SolitaireOpReq opPause. */
        public opPause?: (pb.ISolitairePauseGameReq|null);

        /** SolitaireOpReq opRecover. */
        public opRecover?: (pb.ISolitaireRecoverGameReq|null);

        /** SolitaireOpReq opUndo. */
        public opUndo?: (pb.ISolitaireUndoReq|null);

        /** SolitaireOpReq op. */
        public op?: ("opData"|"opRand"|"opR2p"|"opR2f"|"opP2f"|"opF2p"|"opP2p"|"opFin"|"opPause"|"opRecover"|"opUndo");

        /**
         * Creates a new SolitaireOpReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SolitaireOpReq instance
         */
        public static create(properties?: pb.ISolitaireOpReq): pb.SolitaireOpReq;

        /**
         * Encodes the specified SolitaireOpReq message. Does not implicitly {@link pb.SolitaireOpReq.verify|verify} messages.
         * @param message SolitaireOpReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISolitaireOpReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolitaireOpReq message, length delimited. Does not implicitly {@link pb.SolitaireOpReq.verify|verify} messages.
         * @param message SolitaireOpReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISolitaireOpReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolitaireOpReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolitaireOpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SolitaireOpReq;

        /**
         * Decodes a SolitaireOpReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolitaireOpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SolitaireOpReq;

        /**
         * Verifies a SolitaireOpReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolitaireOpReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolitaireOpReq
         */
        public static fromObject(object: { [k: string]: any }): pb.SolitaireOpReq;

        /**
         * Creates a plain object from a SolitaireOpReq message. Also converts values to other types if specified.
         * @param message SolitaireOpReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SolitaireOpReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolitaireOpReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
