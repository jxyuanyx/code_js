import * as $protobuf from "protobufjs";
/** Namespace pb. */
export namespace blackjack {

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

    /** Properties of a Blitz21OpReq. */
    interface IBlitz21OpReq {

        /** Blitz21OpReq RoomID */
        RoomID?: (number|null);

        /** Blitz21OpReq opData */
        opData?: (pb.IBlitz21CompetitionDataReq|null);

        /** Blitz21OpReq op_C2P */
        op_C2P?: (pb.IBlitz21Op_C2PReq|null);

        /** Blitz21OpReq op_C2H */
        op_C2H?: (pb.IBlitz21Op_C2HReq|null);

        /** Blitz21OpReq op_H2C */
        op_H2C?: (pb.IBlitz21Op_H2CReq|null);

        /** Blitz21OpReq op_Undo */
        op_Undo?: (pb.IBlitz21Op_UndoReq|null);

        /** Blitz21OpReq op_Finish */
        op_Finish?: (pb.IBlitz21Op_FinishReq|null);

        /** Blitz21OpReq op_Pause */
        op_Pause?: (pb.IBlitz21Op_PauseReq|null);

        /** Blitz21OpReq op_Recover */
        op_Recover?: (pb.IBlitz21Op_RecoverReq|null);
    }

    /** Represents a Blitz21OpReq. */
    class Blitz21OpReq implements IBlitz21OpReq {

        /**
         * Constructs a new Blitz21OpReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21OpReq);

        /** Blitz21OpReq RoomID. */
        public RoomID: number;

        /** Blitz21OpReq opData. */
        public opData?: (pb.IBlitz21CompetitionDataReq|null);

        /** Blitz21OpReq op_C2P. */
        public op_C2P?: (pb.IBlitz21Op_C2PReq|null);

        /** Blitz21OpReq op_C2H. */
        public op_C2H?: (pb.IBlitz21Op_C2HReq|null);

        /** Blitz21OpReq op_H2C. */
        public op_H2C?: (pb.IBlitz21Op_H2CReq|null);

        /** Blitz21OpReq op_Undo. */
        public op_Undo?: (pb.IBlitz21Op_UndoReq|null);

        /** Blitz21OpReq op_Finish. */
        public op_Finish?: (pb.IBlitz21Op_FinishReq|null);

        /** Blitz21OpReq op_Pause. */
        public op_Pause?: (pb.IBlitz21Op_PauseReq|null);

        /** Blitz21OpReq op_Recover. */
        public op_Recover?: (pb.IBlitz21Op_RecoverReq|null);

        /** Blitz21OpReq op. */
        public op?: ("opData"|"op_C2P"|"op_C2H"|"op_H2C"|"op_Undo"|"op_Finish"|"op_Pause"|"op_Recover");

        /**
         * Creates a new Blitz21OpReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21OpReq instance
         */
        public static create(properties?: pb.IBlitz21OpReq): pb.Blitz21OpReq;

        /**
         * Encodes the specified Blitz21OpReq message. Does not implicitly {@link pb.Blitz21OpReq.verify|verify} messages.
         * @param message Blitz21OpReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21OpReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21OpReq message, length delimited. Does not implicitly {@link pb.Blitz21OpReq.verify|verify} messages.
         * @param message Blitz21OpReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21OpReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21OpReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21OpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21OpReq;

        /**
         * Decodes a Blitz21OpReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21OpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21OpReq;

        /**
         * Verifies a Blitz21OpReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21OpReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21OpReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21OpReq;

        /**
         * Creates a plain object from a Blitz21OpReq message. Also converts values to other types if specified.
         * @param message Blitz21OpReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21OpReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21OpReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21OnePile. */
    interface IBlitz21OnePile {

        /** Blitz21OnePile Cards */
        Cards?: (number[]|null);
    }

    /** Represents a Blitz21OnePile. */
    class Blitz21OnePile implements IBlitz21OnePile {

        /**
         * Constructs a new Blitz21OnePile.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21OnePile);

        /** Blitz21OnePile Cards. */
        public Cards: number[];

        /**
         * Creates a new Blitz21OnePile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21OnePile instance
         */
        public static create(properties?: pb.IBlitz21OnePile): pb.Blitz21OnePile;

        /**
         * Encodes the specified Blitz21OnePile message. Does not implicitly {@link pb.Blitz21OnePile.verify|verify} messages.
         * @param message Blitz21OnePile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21OnePile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21OnePile message, length delimited. Does not implicitly {@link pb.Blitz21OnePile.verify|verify} messages.
         * @param message Blitz21OnePile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21OnePile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21OnePile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21OnePile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21OnePile;

        /**
         * Decodes a Blitz21OnePile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21OnePile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21OnePile;

        /**
         * Verifies a Blitz21OnePile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21OnePile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21OnePile
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21OnePile;

        /**
         * Creates a plain object from a Blitz21OnePile message. Also converts values to other types if specified.
         * @param message Blitz21OnePile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21OnePile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21OnePile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Carddesk. */
    interface IBlitz21Carddesk {

        /** Blitz21Carddesk CardsLen */
        CardsLen?: (number|null);

        /** Blitz21Carddesk CurrentCard */
        CurrentCard?: (number|null);

        /** Blitz21Carddesk HoldCard */
        HoldCard?: (number|null);

        /** Blitz21Carddesk PileCards */
        PileCards?: (pb.IBlitz21OnePile[]|null);

        /** Blitz21Carddesk Bombs */
        Bombs?: (number|null);

        /** Blitz21Carddesk HoldCounts */
        HoldCounts?: (number|null);

        /** Blitz21Carddesk CurrentScore */
        CurrentScore?: (number|null);

        /** Blitz21Carddesk Cards */
        Cards?: (number[]|null);
    }

    /** Represents a Blitz21Carddesk. */
    class Blitz21Carddesk implements IBlitz21Carddesk {

        /**
         * Constructs a new Blitz21Carddesk.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Carddesk);

        /** Blitz21Carddesk CardsLen. */
        public CardsLen: number;

        /** Blitz21Carddesk CurrentCard. */
        public CurrentCard: number;

        /** Blitz21Carddesk HoldCard. */
        public HoldCard: number;

        /** Blitz21Carddesk PileCards. */
        public PileCards: pb.IBlitz21OnePile[];

        /** Blitz21Carddesk Bombs. */
        public Bombs: number;

        /** Blitz21Carddesk HoldCounts. */
        public HoldCounts: number;

        /** Blitz21Carddesk CurrentScore. */
        public CurrentScore: number;

        /** Blitz21Carddesk Cards. */
        public Cards: number[];

        /**
         * Creates a new Blitz21Carddesk instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Carddesk instance
         */
        public static create(properties?: pb.IBlitz21Carddesk): pb.Blitz21Carddesk;

        /**
         * Encodes the specified Blitz21Carddesk message. Does not implicitly {@link pb.Blitz21Carddesk.verify|verify} messages.
         * @param message Blitz21Carddesk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Carddesk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Carddesk message, length delimited. Does not implicitly {@link pb.Blitz21Carddesk.verify|verify} messages.
         * @param message Blitz21Carddesk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Carddesk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Carddesk message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Carddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Carddesk;

        /**
         * Decodes a Blitz21Carddesk message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Carddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Carddesk;

        /**
         * Verifies a Blitz21Carddesk message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Carddesk message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Carddesk
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Carddesk;

        /**
         * Creates a plain object from a Blitz21Carddesk message. Also converts values to other types if specified.
         * @param message Blitz21Carddesk
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Carddesk, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Carddesk to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21CompetitionDataReq. */
    interface IBlitz21CompetitionDataReq {
    }

    /** Represents a Blitz21CompetitionDataReq. */
    class Blitz21CompetitionDataReq implements IBlitz21CompetitionDataReq {

        /**
         * Constructs a new Blitz21CompetitionDataReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21CompetitionDataReq);

        /**
         * Creates a new Blitz21CompetitionDataReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21CompetitionDataReq instance
         */
        public static create(properties?: pb.IBlitz21CompetitionDataReq): pb.Blitz21CompetitionDataReq;

        /**
         * Encodes the specified Blitz21CompetitionDataReq message. Does not implicitly {@link pb.Blitz21CompetitionDataReq.verify|verify} messages.
         * @param message Blitz21CompetitionDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21CompetitionDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21CompetitionDataReq message, length delimited. Does not implicitly {@link pb.Blitz21CompetitionDataReq.verify|verify} messages.
         * @param message Blitz21CompetitionDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21CompetitionDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21CompetitionDataReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21CompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21CompetitionDataReq;

        /**
         * Decodes a Blitz21CompetitionDataReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21CompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21CompetitionDataReq;

        /**
         * Verifies a Blitz21CompetitionDataReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21CompetitionDataReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21CompetitionDataReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21CompetitionDataReq;

        /**
         * Creates a plain object from a Blitz21CompetitionDataReq message. Also converts values to other types if specified.
         * @param message Blitz21CompetitionDataReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21CompetitionDataReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21CompetitionDataReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21CompetitionDataResp. */
    interface IBlitz21CompetitionDataResp {

        /** Blitz21CompetitionDataResp Err */
        Err?: (pb.ErrNo|null);

        /** Blitz21CompetitionDataResp CardDesk */
        CardDesk?: (pb.IBlitz21Carddesk|null);

        /** Blitz21CompetitionDataResp Status */
        Status?: (pb.GameStatus|null);

        /** Blitz21CompetitionDataResp LeftTime */
        LeftTime?: (number|null);

        /** Blitz21CompetitionDataResp CanUndo */
        CanUndo?: (boolean|null);
    }

    /** Represents a Blitz21CompetitionDataResp. */
    class Blitz21CompetitionDataResp implements IBlitz21CompetitionDataResp {

        /**
         * Constructs a new Blitz21CompetitionDataResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21CompetitionDataResp);

        /** Blitz21CompetitionDataResp Err. */
        public Err: pb.ErrNo;

        /** Blitz21CompetitionDataResp CardDesk. */
        public CardDesk?: (pb.IBlitz21Carddesk|null);

        /** Blitz21CompetitionDataResp Status. */
        public Status: pb.GameStatus;

        /** Blitz21CompetitionDataResp LeftTime. */
        public LeftTime: number;

        /** Blitz21CompetitionDataResp CanUndo. */
        public CanUndo: boolean;

        /**
         * Creates a new Blitz21CompetitionDataResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21CompetitionDataResp instance
         */
        public static create(properties?: pb.IBlitz21CompetitionDataResp): pb.Blitz21CompetitionDataResp;

        /**
         * Encodes the specified Blitz21CompetitionDataResp message. Does not implicitly {@link pb.Blitz21CompetitionDataResp.verify|verify} messages.
         * @param message Blitz21CompetitionDataResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21CompetitionDataResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21CompetitionDataResp message, length delimited. Does not implicitly {@link pb.Blitz21CompetitionDataResp.verify|verify} messages.
         * @param message Blitz21CompetitionDataResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21CompetitionDataResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21CompetitionDataResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21CompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21CompetitionDataResp;

        /**
         * Decodes a Blitz21CompetitionDataResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21CompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21CompetitionDataResp;

        /**
         * Verifies a Blitz21CompetitionDataResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21CompetitionDataResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21CompetitionDataResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21CompetitionDataResp;

        /**
         * Creates a plain object from a Blitz21CompetitionDataResp message. Also converts values to other types if specified.
         * @param message Blitz21CompetitionDataResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21CompetitionDataResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21CompetitionDataResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_C2PReq. */
    interface IBlitz21Op_C2PReq {

        /** Blitz21Op_C2PReq Index */
        Index?: (number|null);
    }

    /** Represents a Blitz21Op_C2PReq. */
    class Blitz21Op_C2PReq implements IBlitz21Op_C2PReq {

        /**
         * Constructs a new Blitz21Op_C2PReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_C2PReq);

        /** Blitz21Op_C2PReq Index. */
        public Index: number;

        /**
         * Creates a new Blitz21Op_C2PReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_C2PReq instance
         */
        public static create(properties?: pb.IBlitz21Op_C2PReq): pb.Blitz21Op_C2PReq;

        /**
         * Encodes the specified Blitz21Op_C2PReq message. Does not implicitly {@link pb.Blitz21Op_C2PReq.verify|verify} messages.
         * @param message Blitz21Op_C2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_C2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_C2PReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2PReq.verify|verify} messages.
         * @param message Blitz21Op_C2PReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_C2PReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_C2PReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_C2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_C2PReq;

        /**
         * Decodes a Blitz21Op_C2PReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_C2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_C2PReq;

        /**
         * Verifies a Blitz21Op_C2PReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_C2PReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_C2PReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_C2PReq;

        /**
         * Creates a plain object from a Blitz21Op_C2PReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_C2PReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_C2PReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_C2PReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** ClearType enum. */
    enum ClearType {
        Bomb = 0,
        UnClear = 1,
        FinishPoint = 2,
        FiveDragon = 3,
        BlackJack = 4
    }

    /** FinishBonusType enum. */
    enum FinishBonusType {
        NoBomb = 0,
        AllClear = 1
    }

    /** Properties of a Blitz21Op_C2PResp. */
    interface IBlitz21Op_C2PResp {

        /** Blitz21Op_C2PResp Err */
        Err?: (pb.ErrNo|null);

        /** Blitz21Op_C2PResp CurrentScore */
        CurrentScore?: (number|null);

        /** Blitz21Op_C2PResp NextCard */
        NextCard?: (number|null);

        /** Blitz21Op_C2PResp ClearType */
        ClearType?: (number[]|null);

        /** Blitz21Op_C2PResp ClearScore */
        ClearScore?: (number|null);

        /** Blitz21Op_C2PResp HitCounts */
        HitCounts?: (number|null);

        /** Blitz21Op_C2PResp HitScore */
        HitScore?: (number|null);

        /** Blitz21Op_C2PResp ClearTypeScore */
        ClearTypeScore?: (number[]|null);
    }

    /** Represents a Blitz21Op_C2PResp. */
    class Blitz21Op_C2PResp implements IBlitz21Op_C2PResp {

        /**
         * Constructs a new Blitz21Op_C2PResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_C2PResp);

        /** Blitz21Op_C2PResp Err. */
        public Err: pb.ErrNo;

        /** Blitz21Op_C2PResp CurrentScore. */
        public CurrentScore: number;

        /** Blitz21Op_C2PResp NextCard. */
        public NextCard: number;

        /** Blitz21Op_C2PResp ClearType. */
        public ClearType: number[];

        /** Blitz21Op_C2PResp ClearScore. */
        public ClearScore: number;

        /** Blitz21Op_C2PResp HitCounts. */
        public HitCounts: number;

        /** Blitz21Op_C2PResp HitScore. */
        public HitScore: number;

        /** Blitz21Op_C2PResp ClearTypeScore. */
        public ClearTypeScore: number[];

        /**
         * Creates a new Blitz21Op_C2PResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_C2PResp instance
         */
        public static create(properties?: pb.IBlitz21Op_C2PResp): pb.Blitz21Op_C2PResp;

        /**
         * Encodes the specified Blitz21Op_C2PResp message. Does not implicitly {@link pb.Blitz21Op_C2PResp.verify|verify} messages.
         * @param message Blitz21Op_C2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_C2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_C2PResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2PResp.verify|verify} messages.
         * @param message Blitz21Op_C2PResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_C2PResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_C2PResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_C2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_C2PResp;

        /**
         * Decodes a Blitz21Op_C2PResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_C2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_C2PResp;

        /**
         * Verifies a Blitz21Op_C2PResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_C2PResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_C2PResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_C2PResp;

        /**
         * Creates a plain object from a Blitz21Op_C2PResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_C2PResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_C2PResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_C2PResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_C2HReq. */
    interface IBlitz21Op_C2HReq {
    }

    /** Represents a Blitz21Op_C2HReq. */
    class Blitz21Op_C2HReq implements IBlitz21Op_C2HReq {

        /**
         * Constructs a new Blitz21Op_C2HReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_C2HReq);

        /**
         * Creates a new Blitz21Op_C2HReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_C2HReq instance
         */
        public static create(properties?: pb.IBlitz21Op_C2HReq): pb.Blitz21Op_C2HReq;

        /**
         * Encodes the specified Blitz21Op_C2HReq message. Does not implicitly {@link pb.Blitz21Op_C2HReq.verify|verify} messages.
         * @param message Blitz21Op_C2HReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_C2HReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_C2HReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2HReq.verify|verify} messages.
         * @param message Blitz21Op_C2HReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_C2HReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_C2HReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_C2HReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_C2HReq;

        /**
         * Decodes a Blitz21Op_C2HReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_C2HReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_C2HReq;

        /**
         * Verifies a Blitz21Op_C2HReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_C2HReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_C2HReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_C2HReq;

        /**
         * Creates a plain object from a Blitz21Op_C2HReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_C2HReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_C2HReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_C2HReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_C2HResp. */
    interface IBlitz21Op_C2HResp {

        /** Blitz21Op_C2HResp Err */
        Err?: (pb.ErrNo|null);

        /** Blitz21Op_C2HResp NextCard */
        NextCard?: (number|null);

        /** Blitz21Op_C2HResp HoldCounts */
        HoldCounts?: (number|null);
    }

    /** Represents a Blitz21Op_C2HResp. */
    class Blitz21Op_C2HResp implements IBlitz21Op_C2HResp {

        /**
         * Constructs a new Blitz21Op_C2HResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_C2HResp);

        /** Blitz21Op_C2HResp Err. */
        public Err: pb.ErrNo;

        /** Blitz21Op_C2HResp NextCard. */
        public NextCard: number;

        /** Blitz21Op_C2HResp HoldCounts. */
        public HoldCounts: number;

        /**
         * Creates a new Blitz21Op_C2HResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_C2HResp instance
         */
        public static create(properties?: pb.IBlitz21Op_C2HResp): pb.Blitz21Op_C2HResp;

        /**
         * Encodes the specified Blitz21Op_C2HResp message. Does not implicitly {@link pb.Blitz21Op_C2HResp.verify|verify} messages.
         * @param message Blitz21Op_C2HResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_C2HResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_C2HResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2HResp.verify|verify} messages.
         * @param message Blitz21Op_C2HResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_C2HResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_C2HResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_C2HResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_C2HResp;

        /**
         * Decodes a Blitz21Op_C2HResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_C2HResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_C2HResp;

        /**
         * Verifies a Blitz21Op_C2HResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_C2HResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_C2HResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_C2HResp;

        /**
         * Creates a plain object from a Blitz21Op_C2HResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_C2HResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_C2HResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_C2HResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_H2CReq. */
    interface IBlitz21Op_H2CReq {
    }

    /** Represents a Blitz21Op_H2CReq. */
    class Blitz21Op_H2CReq implements IBlitz21Op_H2CReq {

        /**
         * Constructs a new Blitz21Op_H2CReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_H2CReq);

        /**
         * Creates a new Blitz21Op_H2CReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_H2CReq instance
         */
        public static create(properties?: pb.IBlitz21Op_H2CReq): pb.Blitz21Op_H2CReq;

        /**
         * Encodes the specified Blitz21Op_H2CReq message. Does not implicitly {@link pb.Blitz21Op_H2CReq.verify|verify} messages.
         * @param message Blitz21Op_H2CReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_H2CReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_H2CReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_H2CReq.verify|verify} messages.
         * @param message Blitz21Op_H2CReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_H2CReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_H2CReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_H2CReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_H2CReq;

        /**
         * Decodes a Blitz21Op_H2CReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_H2CReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_H2CReq;

        /**
         * Verifies a Blitz21Op_H2CReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_H2CReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_H2CReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_H2CReq;

        /**
         * Creates a plain object from a Blitz21Op_H2CReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_H2CReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_H2CReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_H2CReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_H2CResp. */
    interface IBlitz21Op_H2CResp {

        /** Blitz21Op_H2CResp Err */
        Err?: (pb.ErrNo|null);
    }

    /** Represents a Blitz21Op_H2CResp. */
    class Blitz21Op_H2CResp implements IBlitz21Op_H2CResp {

        /**
         * Constructs a new Blitz21Op_H2CResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_H2CResp);

        /** Blitz21Op_H2CResp Err. */
        public Err: pb.ErrNo;

        /**
         * Creates a new Blitz21Op_H2CResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_H2CResp instance
         */
        public static create(properties?: pb.IBlitz21Op_H2CResp): pb.Blitz21Op_H2CResp;

        /**
         * Encodes the specified Blitz21Op_H2CResp message. Does not implicitly {@link pb.Blitz21Op_H2CResp.verify|verify} messages.
         * @param message Blitz21Op_H2CResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_H2CResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_H2CResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_H2CResp.verify|verify} messages.
         * @param message Blitz21Op_H2CResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_H2CResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_H2CResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_H2CResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_H2CResp;

        /**
         * Decodes a Blitz21Op_H2CResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_H2CResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_H2CResp;

        /**
         * Verifies a Blitz21Op_H2CResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_H2CResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_H2CResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_H2CResp;

        /**
         * Creates a plain object from a Blitz21Op_H2CResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_H2CResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_H2CResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_H2CResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_UndoReq. */
    interface IBlitz21Op_UndoReq {
    }

    /** Represents a Blitz21Op_UndoReq. */
    class Blitz21Op_UndoReq implements IBlitz21Op_UndoReq {

        /**
         * Constructs a new Blitz21Op_UndoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_UndoReq);

        /**
         * Creates a new Blitz21Op_UndoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_UndoReq instance
         */
        public static create(properties?: pb.IBlitz21Op_UndoReq): pb.Blitz21Op_UndoReq;

        /**
         * Encodes the specified Blitz21Op_UndoReq message. Does not implicitly {@link pb.Blitz21Op_UndoReq.verify|verify} messages.
         * @param message Blitz21Op_UndoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_UndoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_UndoReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_UndoReq.verify|verify} messages.
         * @param message Blitz21Op_UndoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_UndoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_UndoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_UndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_UndoReq;

        /**
         * Decodes a Blitz21Op_UndoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_UndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_UndoReq;

        /**
         * Verifies a Blitz21Op_UndoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_UndoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_UndoReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_UndoReq;

        /**
         * Creates a plain object from a Blitz21Op_UndoReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_UndoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_UndoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_UndoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_UndoResp. */
    interface IBlitz21Op_UndoResp {

        /** Blitz21Op_UndoResp Err */
        Err?: (pb.ErrNo|null);

        /** Blitz21Op_UndoResp CardDesk */
        CardDesk?: (pb.IBlitz21Carddesk|null);
    }

    /** Represents a Blitz21Op_UndoResp. */
    class Blitz21Op_UndoResp implements IBlitz21Op_UndoResp {

        /**
         * Constructs a new Blitz21Op_UndoResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_UndoResp);

        /** Blitz21Op_UndoResp Err. */
        public Err: pb.ErrNo;

        /** Blitz21Op_UndoResp CardDesk. */
        public CardDesk?: (pb.IBlitz21Carddesk|null);

        /**
         * Creates a new Blitz21Op_UndoResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_UndoResp instance
         */
        public static create(properties?: pb.IBlitz21Op_UndoResp): pb.Blitz21Op_UndoResp;

        /**
         * Encodes the specified Blitz21Op_UndoResp message. Does not implicitly {@link pb.Blitz21Op_UndoResp.verify|verify} messages.
         * @param message Blitz21Op_UndoResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_UndoResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_UndoResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_UndoResp.verify|verify} messages.
         * @param message Blitz21Op_UndoResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_UndoResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_UndoResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_UndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_UndoResp;

        /**
         * Decodes a Blitz21Op_UndoResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_UndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_UndoResp;

        /**
         * Verifies a Blitz21Op_UndoResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_UndoResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_UndoResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_UndoResp;

        /**
         * Creates a plain object from a Blitz21Op_UndoResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_UndoResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_UndoResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_UndoResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_FinishReq. */
    interface IBlitz21Op_FinishReq {
    }

    /** Represents a Blitz21Op_FinishReq. */
    class Blitz21Op_FinishReq implements IBlitz21Op_FinishReq {

        /**
         * Constructs a new Blitz21Op_FinishReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_FinishReq);

        /**
         * Creates a new Blitz21Op_FinishReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_FinishReq instance
         */
        public static create(properties?: pb.IBlitz21Op_FinishReq): pb.Blitz21Op_FinishReq;

        /**
         * Encodes the specified Blitz21Op_FinishReq message. Does not implicitly {@link pb.Blitz21Op_FinishReq.verify|verify} messages.
         * @param message Blitz21Op_FinishReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_FinishReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_FinishReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_FinishReq.verify|verify} messages.
         * @param message Blitz21Op_FinishReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_FinishReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_FinishReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_FinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_FinishReq;

        /**
         * Decodes a Blitz21Op_FinishReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_FinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_FinishReq;

        /**
         * Verifies a Blitz21Op_FinishReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_FinishReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_FinishReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_FinishReq;

        /**
         * Creates a plain object from a Blitz21Op_FinishReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_FinishReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_FinishReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_FinishReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Reward. */
    interface IBlitz21Reward {

        /** Blitz21Reward Score */
        Score?: (number|null);

        /** Blitz21Reward TimeScore */
        TimeScore?: (number|null);
    }

    /** Represents a Blitz21Reward. */
    class Blitz21Reward implements IBlitz21Reward {

        /**
         * Constructs a new Blitz21Reward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Reward);

        /** Blitz21Reward Score. */
        public Score: number;

        /** Blitz21Reward TimeScore. */
        public TimeScore: number;

        /**
         * Creates a new Blitz21Reward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Reward instance
         */
        public static create(properties?: pb.IBlitz21Reward): pb.Blitz21Reward;

        /**
         * Encodes the specified Blitz21Reward message. Does not implicitly {@link pb.Blitz21Reward.verify|verify} messages.
         * @param message Blitz21Reward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Reward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Reward message, length delimited. Does not implicitly {@link pb.Blitz21Reward.verify|verify} messages.
         * @param message Blitz21Reward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Reward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Reward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Reward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Reward;

        /**
         * Decodes a Blitz21Reward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Reward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Reward;

        /**
         * Verifies a Blitz21Reward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Reward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Reward
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Reward;

        /**
         * Creates a plain object from a Blitz21Reward message. Also converts values to other types if specified.
         * @param message Blitz21Reward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Reward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Reward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_FinishResp. */
    interface IBlitz21Op_FinishResp {

        /** Blitz21Op_FinishResp Err */
        Err?: (pb.ErrNo|null);

        /** Blitz21Op_FinishResp reason */
        reason?: (pb.GameOverReason|null);

        /** Blitz21Op_FinishResp reward */
        reward?: (pb.IBlitz21Reward|null);

        /** Blitz21Op_FinishResp LiftBestScore */
        LiftBestScore?: (number|null);

        /** Blitz21Op_FinishResp TodayBestScore */
        TodayBestScore?: (number|null);

        /** Blitz21Op_FinishResp BonusType */
        BonusType?: (pb.FinishBonusType[]|null);

        /** Blitz21Op_FinishResp FinishBonusScore */
        FinishBonusScore?: (number[]|null);
    }

    /** Represents a Blitz21Op_FinishResp. */
    class Blitz21Op_FinishResp implements IBlitz21Op_FinishResp {

        /**
         * Constructs a new Blitz21Op_FinishResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_FinishResp);

        /** Blitz21Op_FinishResp Err. */
        public Err: pb.ErrNo;

        /** Blitz21Op_FinishResp reason. */
        public reason: pb.GameOverReason;

        /** Blitz21Op_FinishResp reward. */
        public reward?: (pb.IBlitz21Reward|null);

        /** Blitz21Op_FinishResp LiftBestScore. */
        public LiftBestScore: number;

        /** Blitz21Op_FinishResp TodayBestScore. */
        public TodayBestScore: number;

        /** Blitz21Op_FinishResp BonusType. */
        public BonusType: pb.FinishBonusType[];

        /** Blitz21Op_FinishResp FinishBonusScore. */
        public FinishBonusScore: number[];

        /**
         * Creates a new Blitz21Op_FinishResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_FinishResp instance
         */
        public static create(properties?: pb.IBlitz21Op_FinishResp): pb.Blitz21Op_FinishResp;

        /**
         * Encodes the specified Blitz21Op_FinishResp message. Does not implicitly {@link pb.Blitz21Op_FinishResp.verify|verify} messages.
         * @param message Blitz21Op_FinishResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_FinishResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_FinishResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_FinishResp.verify|verify} messages.
         * @param message Blitz21Op_FinishResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_FinishResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_FinishResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_FinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_FinishResp;

        /**
         * Decodes a Blitz21Op_FinishResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_FinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_FinishResp;

        /**
         * Verifies a Blitz21Op_FinishResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_FinishResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_FinishResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_FinishResp;

        /**
         * Creates a plain object from a Blitz21Op_FinishResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_FinishResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_FinishResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_FinishResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_PauseReq. */
    interface IBlitz21Op_PauseReq {
    }

    /** Represents a Blitz21Op_PauseReq. */
    class Blitz21Op_PauseReq implements IBlitz21Op_PauseReq {

        /**
         * Constructs a new Blitz21Op_PauseReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_PauseReq);

        /**
         * Creates a new Blitz21Op_PauseReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_PauseReq instance
         */
        public static create(properties?: pb.IBlitz21Op_PauseReq): pb.Blitz21Op_PauseReq;

        /**
         * Encodes the specified Blitz21Op_PauseReq message. Does not implicitly {@link pb.Blitz21Op_PauseReq.verify|verify} messages.
         * @param message Blitz21Op_PauseReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_PauseReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_PauseReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_PauseReq.verify|verify} messages.
         * @param message Blitz21Op_PauseReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_PauseReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_PauseReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_PauseReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_PauseReq;

        /**
         * Decodes a Blitz21Op_PauseReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_PauseReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_PauseReq;

        /**
         * Verifies a Blitz21Op_PauseReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_PauseReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_PauseReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_PauseReq;

        /**
         * Creates a plain object from a Blitz21Op_PauseReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_PauseReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_PauseReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_PauseReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_PauseResp. */
    interface IBlitz21Op_PauseResp {

        /** Blitz21Op_PauseResp Err */
        Err?: (pb.ErrNo|null);
    }

    /** Represents a Blitz21Op_PauseResp. */
    class Blitz21Op_PauseResp implements IBlitz21Op_PauseResp {

        /**
         * Constructs a new Blitz21Op_PauseResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_PauseResp);

        /** Blitz21Op_PauseResp Err. */
        public Err: pb.ErrNo;

        /**
         * Creates a new Blitz21Op_PauseResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_PauseResp instance
         */
        public static create(properties?: pb.IBlitz21Op_PauseResp): pb.Blitz21Op_PauseResp;

        /**
         * Encodes the specified Blitz21Op_PauseResp message. Does not implicitly {@link pb.Blitz21Op_PauseResp.verify|verify} messages.
         * @param message Blitz21Op_PauseResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_PauseResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_PauseResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_PauseResp.verify|verify} messages.
         * @param message Blitz21Op_PauseResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_PauseResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_PauseResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_PauseResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_PauseResp;

        /**
         * Decodes a Blitz21Op_PauseResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_PauseResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_PauseResp;

        /**
         * Verifies a Blitz21Op_PauseResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_PauseResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_PauseResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_PauseResp;

        /**
         * Creates a plain object from a Blitz21Op_PauseResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_PauseResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_PauseResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_PauseResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_RecoverReq. */
    interface IBlitz21Op_RecoverReq {
    }

    /** Represents a Blitz21Op_RecoverReq. */
    class Blitz21Op_RecoverReq implements IBlitz21Op_RecoverReq {

        /**
         * Constructs a new Blitz21Op_RecoverReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_RecoverReq);

        /**
         * Creates a new Blitz21Op_RecoverReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_RecoverReq instance
         */
        public static create(properties?: pb.IBlitz21Op_RecoverReq): pb.Blitz21Op_RecoverReq;

        /**
         * Encodes the specified Blitz21Op_RecoverReq message. Does not implicitly {@link pb.Blitz21Op_RecoverReq.verify|verify} messages.
         * @param message Blitz21Op_RecoverReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_RecoverReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_RecoverReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_RecoverReq.verify|verify} messages.
         * @param message Blitz21Op_RecoverReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_RecoverReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_RecoverReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_RecoverReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_RecoverReq;

        /**
         * Decodes a Blitz21Op_RecoverReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_RecoverReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_RecoverReq;

        /**
         * Verifies a Blitz21Op_RecoverReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_RecoverReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_RecoverReq
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_RecoverReq;

        /**
         * Creates a plain object from a Blitz21Op_RecoverReq message. Also converts values to other types if specified.
         * @param message Blitz21Op_RecoverReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_RecoverReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_RecoverReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Blitz21Op_RecoverResp. */
    interface IBlitz21Op_RecoverResp {

        /** Blitz21Op_RecoverResp Err */
        Err?: (pb.ErrNo|null);

        /** Blitz21Op_RecoverResp LeftTime */
        LeftTime?: (number|null);
    }

    /** Represents a Blitz21Op_RecoverResp. */
    class Blitz21Op_RecoverResp implements IBlitz21Op_RecoverResp {

        /**
         * Constructs a new Blitz21Op_RecoverResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBlitz21Op_RecoverResp);

        /** Blitz21Op_RecoverResp Err. */
        public Err: pb.ErrNo;

        /** Blitz21Op_RecoverResp LeftTime. */
        public LeftTime: number;

        /**
         * Creates a new Blitz21Op_RecoverResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blitz21Op_RecoverResp instance
         */
        public static create(properties?: pb.IBlitz21Op_RecoverResp): pb.Blitz21Op_RecoverResp;

        /**
         * Encodes the specified Blitz21Op_RecoverResp message. Does not implicitly {@link pb.Blitz21Op_RecoverResp.verify|verify} messages.
         * @param message Blitz21Op_RecoverResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBlitz21Op_RecoverResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blitz21Op_RecoverResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_RecoverResp.verify|verify} messages.
         * @param message Blitz21Op_RecoverResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBlitz21Op_RecoverResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blitz21Op_RecoverResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blitz21Op_RecoverResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Blitz21Op_RecoverResp;

        /**
         * Decodes a Blitz21Op_RecoverResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blitz21Op_RecoverResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Blitz21Op_RecoverResp;

        /**
         * Verifies a Blitz21Op_RecoverResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blitz21Op_RecoverResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blitz21Op_RecoverResp
         */
        public static fromObject(object: { [k: string]: any }): pb.Blitz21Op_RecoverResp;

        /**
         * Creates a plain object from a Blitz21Op_RecoverResp message. Also converts values to other types if specified.
         * @param message Blitz21Op_RecoverResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Blitz21Op_RecoverResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blitz21Op_RecoverResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
