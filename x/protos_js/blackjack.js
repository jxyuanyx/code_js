/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.blackjack = (function() {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    var pb = {};

    /**
     * ErrNo enum.
     * @name pb.ErrNo
     * @enum {number}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} Server_Except=1 Server_Except value
     * @property {number} TokenError=2 TokenError value
     * @property {number} TokenExpire=3 TokenExpire value
     * @property {number} Account_NotExists=4 Account_NotExists value
     * @property {number} Duplicate_Login=5 Duplicate_Login value
     * @property {number} Server_Maintain=8 Server_Maintain value
     * @property {number} NickName_Exists=10 NickName_Exists value
     * @property {number} NickName_TooShort=11 NickName_TooShort value
     * @property {number} NickName_TooLong=12 NickName_TooLong value
     * @property {number} Password_TooShort=13 Password_TooShort value
     * @property {number} Password_TooLong=14 Password_TooLong value
     * @property {number} AccountBind=15 AccountBind value
     * @property {number} Charge_Fail=20 Charge_Fail value
     * @property {number} Lower_Age=21 Lower_Age value
     * @property {number} Cash_NotEnough=22 Cash_NotEnough value
     * @property {number} Withdrawing=23 Withdrawing value
     * @property {number} WithDrawNeedRecharge=24 WithDrawNeedRecharge value
     * @property {number} WithDrawTimes=25 WithDrawTimes value
     * @property {number} RequestParam_Error=50 RequestParam_Error value
     * @property {number} Server_ConfigError=51 Server_ConfigError value
     * @property {number} Reward_IDNotExists=52 Reward_IDNotExists value
     * @property {number} Reward_AlreadyGet=53 Reward_AlreadyGet value
     * @property {number} Reward_ConditionUnCompelete=54 Reward_ConditionUnCompelete value
     * @property {number} SeasonWheel_NotExists=55 SeasonWheel_NotExists value
     * @property {number} SeasonWheel_Expire=56 SeasonWheel_Expire value
     * @property {number} ReplayRecord_NotExist=60 ReplayRecord_NotExist value
     * @property {number} CompetitionID_NotExists=100 CompetitionID_NotExists value
     * @property {number} Competition_Over=101 Competition_Over value
     * @property {number} Competition_PriceNotEnough=102 Competition_PriceNotEnough value
     * @property {number} Competition_Matching=103 Competition_Matching value
     * @property {number} Competition_Gaming=104 Competition_Gaming value
     * @property {number} Competition_OtherGame=105 Competition_OtherGame value
     * @property {number} Competition_NotFound=106 Competition_NotFound value
     * @property {number} Competition_NotInCmp=107 Competition_NotInCmp value
     * @property {number} Competition_GameOver=108 Competition_GameOver value
     * @property {number} Competition_Pause=109 Competition_Pause value
     * @property {number} Competition_ParamError=110 Competition_ParamError value
     * @property {number} MatchID_NotExist=111 MatchID_NotExist value
     * @property {number} Match_Timeout=112 Match_Timeout value
     * @property {number} Competition_AuthFail=113 Competition_AuthFail value
     * @property {number} Competition_Busy=114 Competition_Busy value
     * @property {number} Competition_Timeout=115 Competition_Timeout value
     * @property {number} Match_Hide=116 Match_Hide value
     * @property {number} HTTP_SUCCESS=200 HTTP_SUCCESS value
     * @property {number} ActivityInvalid=201 ActivityInvalid value
     * @property {number} ActivityDraw=202 ActivityDraw value
     * @property {number} ActivityNotFinished=203 ActivityNotFinished value
     * @property {number} DiamondNotEnough=204 DiamondNotEnough value
     */
    pb.ErrNo = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "Server_Except"] = 1;
        values[valuesById[2] = "TokenError"] = 2;
        values[valuesById[3] = "TokenExpire"] = 3;
        values[valuesById[4] = "Account_NotExists"] = 4;
        values[valuesById[5] = "Duplicate_Login"] = 5;
        values[valuesById[8] = "Server_Maintain"] = 8;
        values[valuesById[10] = "NickName_Exists"] = 10;
        values[valuesById[11] = "NickName_TooShort"] = 11;
        values[valuesById[12] = "NickName_TooLong"] = 12;
        values[valuesById[13] = "Password_TooShort"] = 13;
        values[valuesById[14] = "Password_TooLong"] = 14;
        values[valuesById[15] = "AccountBind"] = 15;
        values[valuesById[20] = "Charge_Fail"] = 20;
        values[valuesById[21] = "Lower_Age"] = 21;
        values[valuesById[22] = "Cash_NotEnough"] = 22;
        values[valuesById[23] = "Withdrawing"] = 23;
        values[valuesById[24] = "WithDrawNeedRecharge"] = 24;
        values[valuesById[25] = "WithDrawTimes"] = 25;
        values[valuesById[50] = "RequestParam_Error"] = 50;
        values[valuesById[51] = "Server_ConfigError"] = 51;
        values[valuesById[52] = "Reward_IDNotExists"] = 52;
        values[valuesById[53] = "Reward_AlreadyGet"] = 53;
        values[valuesById[54] = "Reward_ConditionUnCompelete"] = 54;
        values[valuesById[55] = "SeasonWheel_NotExists"] = 55;
        values[valuesById[56] = "SeasonWheel_Expire"] = 56;
        values[valuesById[60] = "ReplayRecord_NotExist"] = 60;
        values[valuesById[100] = "CompetitionID_NotExists"] = 100;
        values[valuesById[101] = "Competition_Over"] = 101;
        values[valuesById[102] = "Competition_PriceNotEnough"] = 102;
        values[valuesById[103] = "Competition_Matching"] = 103;
        values[valuesById[104] = "Competition_Gaming"] = 104;
        values[valuesById[105] = "Competition_OtherGame"] = 105;
        values[valuesById[106] = "Competition_NotFound"] = 106;
        values[valuesById[107] = "Competition_NotInCmp"] = 107;
        values[valuesById[108] = "Competition_GameOver"] = 108;
        values[valuesById[109] = "Competition_Pause"] = 109;
        values[valuesById[110] = "Competition_ParamError"] = 110;
        values[valuesById[111] = "MatchID_NotExist"] = 111;
        values[valuesById[112] = "Match_Timeout"] = 112;
        values[valuesById[113] = "Competition_AuthFail"] = 113;
        values[valuesById[114] = "Competition_Busy"] = 114;
        values[valuesById[115] = "Competition_Timeout"] = 115;
        values[valuesById[116] = "Match_Hide"] = 116;
        values[valuesById[200] = "HTTP_SUCCESS"] = 200;
        values[valuesById[201] = "ActivityInvalid"] = 201;
        values[valuesById[202] = "ActivityDraw"] = 202;
        values[valuesById[203] = "ActivityNotFinished"] = 203;
        values[valuesById[204] = "DiamondNotEnough"] = 204;
        return values;
    })();

    pb.Ping = (function() {

        /**
         * Properties of a Ping.
         * @memberof pb
         * @interface IPing
         */

        /**
         * Constructs a new Ping.
         * @memberof pb
         * @classdesc Represents a Ping.
         * @implements IPing
         * @constructor
         * @param {pb.IPing=} [properties] Properties to set
         */
        function Ping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Ping instance using the specified properties.
         * @function create
         * @memberof pb.Ping
         * @static
         * @param {pb.IPing=} [properties] Properties to set
         * @returns {pb.Ping} Ping instance
         */
        Ping.create = function create(properties) {
            return new Ping(properties);
        };

        /**
         * Encodes the specified Ping message. Does not implicitly {@link pb.Ping.verify|verify} messages.
         * @function encode
         * @memberof pb.Ping
         * @static
         * @param {pb.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link pb.Ping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Ping
         * @static
         * @param {pb.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Ping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Ping message.
         * @function verify
         * @memberof pb.Ping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Ping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Ping} Ping
         */
        Ping.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Ping)
                return object;
            return new $root.blackjack.Ping();
        };

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Ping
         * @static
         * @param {pb.Ping} message Ping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ping.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Ping to JSON.
         * @function toJSON
         * @memberof pb.Ping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Ping;
    })();

    pb.Pong = (function() {

        /**
         * Properties of a Pong.
         * @memberof pb
         * @interface IPong
         */

        /**
         * Constructs a new Pong.
         * @memberof pb
         * @classdesc Represents a Pong.
         * @implements IPong
         * @constructor
         * @param {pb.IPong=} [properties] Properties to set
         */
        function Pong(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Pong instance using the specified properties.
         * @function create
         * @memberof pb.Pong
         * @static
         * @param {pb.IPong=} [properties] Properties to set
         * @returns {pb.Pong} Pong instance
         */
        Pong.create = function create(properties) {
            return new Pong(properties);
        };

        /**
         * Encodes the specified Pong message. Does not implicitly {@link pb.Pong.verify|verify} messages.
         * @function encode
         * @memberof pb.Pong
         * @static
         * @param {pb.IPong} message Pong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pong.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link pb.Pong.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Pong
         * @static
         * @param {pb.IPong} message Pong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pong.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Pong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Pong} Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pong.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Pong();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Pong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Pong} Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pong.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Pong message.
         * @function verify
         * @memberof pb.Pong
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Pong.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Pong
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Pong} Pong
         */
        Pong.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Pong)
                return object;
            return new $root.blackjack.Pong();
        };

        /**
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Pong
         * @static
         * @param {pb.Pong} message Pong
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pong.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Pong to JSON.
         * @function toJSON
         * @memberof pb.Pong
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Pong.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Pong;
    })();

    pb.UserData = (function() {

        /**
         * Properties of a UserData.
         * @memberof pb
         * @interface IUserData
         * @property {number|null} [Uid] UserData Uid
         * @property {string|null} [Nick] UserData Nick
         * @property {string|null} [Avatar] UserData Avatar
         * @property {number|Long|null} [Cash] UserData Cash
         * @property {number|Long|null} [BindCash] UserData BindCash
         * @property {number|Long|null} [Tickets] UserData Tickets
         * @property {number|null} [Sex] UserData Sex
         * @property {string|null} [AreaCode] UserData AreaCode
         * @property {string|null} [Signature] UserData Signature
         * @property {number|Long|null} [Birth] UserData Birth
         * @property {number|null} [Dan] UserData Dan
         */

        /**
         * Constructs a new UserData.
         * @memberof pb
         * @classdesc Represents a UserData.
         * @implements IUserData
         * @constructor
         * @param {pb.IUserData=} [properties] Properties to set
         */
        function UserData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserData Uid.
         * @member {number} Uid
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Uid = 0;

        /**
         * UserData Nick.
         * @member {string} Nick
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Nick = "";

        /**
         * UserData Avatar.
         * @member {string} Avatar
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Avatar = "";

        /**
         * UserData Cash.
         * @member {number|Long} Cash
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Cash = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserData BindCash.
         * @member {number|Long} BindCash
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.BindCash = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserData Tickets.
         * @member {number|Long} Tickets
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Tickets = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserData Sex.
         * @member {number} Sex
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Sex = 0;

        /**
         * UserData AreaCode.
         * @member {string} AreaCode
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.AreaCode = "";

        /**
         * UserData Signature.
         * @member {string} Signature
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Signature = "";

        /**
         * UserData Birth.
         * @member {number|Long} Birth
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Birth = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserData Dan.
         * @member {number} Dan
         * @memberof pb.UserData
         * @instance
         */
        UserData.prototype.Dan = 0;

        /**
         * Creates a new UserData instance using the specified properties.
         * @function create
         * @memberof pb.UserData
         * @static
         * @param {pb.IUserData=} [properties] Properties to set
         * @returns {pb.UserData} UserData instance
         */
        UserData.create = function create(properties) {
            return new UserData(properties);
        };

        /**
         * Encodes the specified UserData message. Does not implicitly {@link pb.UserData.verify|verify} messages.
         * @function encode
         * @memberof pb.UserData
         * @static
         * @param {pb.IUserData} message UserData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Uid != null && Object.hasOwnProperty.call(message, "Uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Uid);
            if (message.Nick != null && Object.hasOwnProperty.call(message, "Nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Nick);
            if (message.Avatar != null && Object.hasOwnProperty.call(message, "Avatar"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Avatar);
            if (message.Cash != null && Object.hasOwnProperty.call(message, "Cash"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.Cash);
            if (message.BindCash != null && Object.hasOwnProperty.call(message, "BindCash"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.BindCash);
            if (message.Tickets != null && Object.hasOwnProperty.call(message, "Tickets"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.Tickets);
            if (message.Sex != null && Object.hasOwnProperty.call(message, "Sex"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.Sex);
            if (message.AreaCode != null && Object.hasOwnProperty.call(message, "AreaCode"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.AreaCode);
            if (message.Signature != null && Object.hasOwnProperty.call(message, "Signature"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.Signature);
            if (message.Birth != null && Object.hasOwnProperty.call(message, "Birth"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.Birth);
            if (message.Dan != null && Object.hasOwnProperty.call(message, "Dan"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.Dan);
            return writer;
        };

        /**
         * Encodes the specified UserData message, length delimited. Does not implicitly {@link pb.UserData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.UserData
         * @static
         * @param {pb.IUserData} message UserData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserData message from the specified reader or buffer.
         * @function decode
         * @memberof pb.UserData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.UserData} UserData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.UserData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Uid = reader.uint32();
                    break;
                case 2:
                    message.Nick = reader.string();
                    break;
                case 3:
                    message.Avatar = reader.string();
                    break;
                case 4:
                    message.Cash = reader.int64();
                    break;
                case 5:
                    message.BindCash = reader.int64();
                    break;
                case 6:
                    message.Tickets = reader.int64();
                    break;
                case 7:
                    message.Sex = reader.int32();
                    break;
                case 8:
                    message.AreaCode = reader.string();
                    break;
                case 9:
                    message.Signature = reader.string();
                    break;
                case 10:
                    message.Birth = reader.int64();
                    break;
                case 11:
                    message.Dan = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.UserData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.UserData} UserData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserData message.
         * @function verify
         * @memberof pb.UserData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Uid != null && message.hasOwnProperty("Uid"))
                if (!$util.isInteger(message.Uid))
                    return "Uid: integer expected";
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                if (!$util.isString(message.Nick))
                    return "Nick: string expected";
            if (message.Avatar != null && message.hasOwnProperty("Avatar"))
                if (!$util.isString(message.Avatar))
                    return "Avatar: string expected";
            if (message.Cash != null && message.hasOwnProperty("Cash"))
                if (!$util.isInteger(message.Cash) && !(message.Cash && $util.isInteger(message.Cash.low) && $util.isInteger(message.Cash.high)))
                    return "Cash: integer|Long expected";
            if (message.BindCash != null && message.hasOwnProperty("BindCash"))
                if (!$util.isInteger(message.BindCash) && !(message.BindCash && $util.isInteger(message.BindCash.low) && $util.isInteger(message.BindCash.high)))
                    return "BindCash: integer|Long expected";
            if (message.Tickets != null && message.hasOwnProperty("Tickets"))
                if (!$util.isInteger(message.Tickets) && !(message.Tickets && $util.isInteger(message.Tickets.low) && $util.isInteger(message.Tickets.high)))
                    return "Tickets: integer|Long expected";
            if (message.Sex != null && message.hasOwnProperty("Sex"))
                if (!$util.isInteger(message.Sex))
                    return "Sex: integer expected";
            if (message.AreaCode != null && message.hasOwnProperty("AreaCode"))
                if (!$util.isString(message.AreaCode))
                    return "AreaCode: string expected";
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                if (!$util.isString(message.Signature))
                    return "Signature: string expected";
            if (message.Birth != null && message.hasOwnProperty("Birth"))
                if (!$util.isInteger(message.Birth) && !(message.Birth && $util.isInteger(message.Birth.low) && $util.isInteger(message.Birth.high)))
                    return "Birth: integer|Long expected";
            if (message.Dan != null && message.hasOwnProperty("Dan"))
                if (!$util.isInteger(message.Dan))
                    return "Dan: integer expected";
            return null;
        };

        /**
         * Creates a UserData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.UserData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.UserData} UserData
         */
        UserData.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.UserData)
                return object;
            var message = new $root.blackjack.UserData();
            if (object.Uid != null)
                message.Uid = object.Uid >>> 0;
            if (object.Nick != null)
                message.Nick = String(object.Nick);
            if (object.Avatar != null)
                message.Avatar = String(object.Avatar);
            if (object.Cash != null)
                if ($util.Long)
                    (message.Cash = $util.Long.fromValue(object.Cash)).unsigned = false;
                else if (typeof object.Cash === "string")
                    message.Cash = parseInt(object.Cash, 10);
                else if (typeof object.Cash === "number")
                    message.Cash = object.Cash;
                else if (typeof object.Cash === "object")
                    message.Cash = new $util.LongBits(object.Cash.low >>> 0, object.Cash.high >>> 0).toNumber();
            if (object.BindCash != null)
                if ($util.Long)
                    (message.BindCash = $util.Long.fromValue(object.BindCash)).unsigned = false;
                else if (typeof object.BindCash === "string")
                    message.BindCash = parseInt(object.BindCash, 10);
                else if (typeof object.BindCash === "number")
                    message.BindCash = object.BindCash;
                else if (typeof object.BindCash === "object")
                    message.BindCash = new $util.LongBits(object.BindCash.low >>> 0, object.BindCash.high >>> 0).toNumber();
            if (object.Tickets != null)
                if ($util.Long)
                    (message.Tickets = $util.Long.fromValue(object.Tickets)).unsigned = false;
                else if (typeof object.Tickets === "string")
                    message.Tickets = parseInt(object.Tickets, 10);
                else if (typeof object.Tickets === "number")
                    message.Tickets = object.Tickets;
                else if (typeof object.Tickets === "object")
                    message.Tickets = new $util.LongBits(object.Tickets.low >>> 0, object.Tickets.high >>> 0).toNumber();
            if (object.Sex != null)
                message.Sex = object.Sex | 0;
            if (object.AreaCode != null)
                message.AreaCode = String(object.AreaCode);
            if (object.Signature != null)
                message.Signature = String(object.Signature);
            if (object.Birth != null)
                if ($util.Long)
                    (message.Birth = $util.Long.fromValue(object.Birth)).unsigned = false;
                else if (typeof object.Birth === "string")
                    message.Birth = parseInt(object.Birth, 10);
                else if (typeof object.Birth === "number")
                    message.Birth = object.Birth;
                else if (typeof object.Birth === "object")
                    message.Birth = new $util.LongBits(object.Birth.low >>> 0, object.Birth.high >>> 0).toNumber();
            if (object.Dan != null)
                message.Dan = object.Dan | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.UserData
         * @static
         * @param {pb.UserData} message UserData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Uid = 0;
                object.Nick = "";
                object.Avatar = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Cash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Cash = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.BindCash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.BindCash = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Tickets = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Tickets = options.longs === String ? "0" : 0;
                object.Sex = 0;
                object.AreaCode = "";
                object.Signature = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Birth = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Birth = options.longs === String ? "0" : 0;
                object.Dan = 0;
            }
            if (message.Uid != null && message.hasOwnProperty("Uid"))
                object.Uid = message.Uid;
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                object.Nick = message.Nick;
            if (message.Avatar != null && message.hasOwnProperty("Avatar"))
                object.Avatar = message.Avatar;
            if (message.Cash != null && message.hasOwnProperty("Cash"))
                if (typeof message.Cash === "number")
                    object.Cash = options.longs === String ? String(message.Cash) : message.Cash;
                else
                    object.Cash = options.longs === String ? $util.Long.prototype.toString.call(message.Cash) : options.longs === Number ? new $util.LongBits(message.Cash.low >>> 0, message.Cash.high >>> 0).toNumber() : message.Cash;
            if (message.BindCash != null && message.hasOwnProperty("BindCash"))
                if (typeof message.BindCash === "number")
                    object.BindCash = options.longs === String ? String(message.BindCash) : message.BindCash;
                else
                    object.BindCash = options.longs === String ? $util.Long.prototype.toString.call(message.BindCash) : options.longs === Number ? new $util.LongBits(message.BindCash.low >>> 0, message.BindCash.high >>> 0).toNumber() : message.BindCash;
            if (message.Tickets != null && message.hasOwnProperty("Tickets"))
                if (typeof message.Tickets === "number")
                    object.Tickets = options.longs === String ? String(message.Tickets) : message.Tickets;
                else
                    object.Tickets = options.longs === String ? $util.Long.prototype.toString.call(message.Tickets) : options.longs === Number ? new $util.LongBits(message.Tickets.low >>> 0, message.Tickets.high >>> 0).toNumber() : message.Tickets;
            if (message.Sex != null && message.hasOwnProperty("Sex"))
                object.Sex = message.Sex;
            if (message.AreaCode != null && message.hasOwnProperty("AreaCode"))
                object.AreaCode = message.AreaCode;
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                object.Signature = message.Signature;
            if (message.Birth != null && message.hasOwnProperty("Birth"))
                if (typeof message.Birth === "number")
                    object.Birth = options.longs === String ? String(message.Birth) : message.Birth;
                else
                    object.Birth = options.longs === String ? $util.Long.prototype.toString.call(message.Birth) : options.longs === Number ? new $util.LongBits(message.Birth.low >>> 0, message.Birth.high >>> 0).toNumber() : message.Birth;
            if (message.Dan != null && message.hasOwnProperty("Dan"))
                object.Dan = message.Dan;
            return object;
        };

        /**
         * Converts this UserData to JSON.
         * @function toJSON
         * @memberof pb.UserData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserData;
    })();

    pb.PlayerGameInfo = (function() {

        /**
         * Properties of a PlayerGameInfo.
         * @memberof pb
         * @interface IPlayerGameInfo
         * @property {string|null} [GameName] PlayerGameInfo GameName
         * @property {string|null} [NodeId] PlayerGameInfo NodeId
         * @property {number|null} [CmpID] PlayerGameInfo CmpID
         * @property {string|null} [Uuid] PlayerGameInfo Uuid
         * @property {number|null} [Status] PlayerGameInfo Status
         * @property {number|null} [MatchID] PlayerGameInfo MatchID
         * @property {number|Long|null} [ActiveTime] PlayerGameInfo ActiveTime
         */

        /**
         * Constructs a new PlayerGameInfo.
         * @memberof pb
         * @classdesc Represents a PlayerGameInfo.
         * @implements IPlayerGameInfo
         * @constructor
         * @param {pb.IPlayerGameInfo=} [properties] Properties to set
         */
        function PlayerGameInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerGameInfo GameName.
         * @member {string} GameName
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.GameName = "";

        /**
         * PlayerGameInfo NodeId.
         * @member {string} NodeId
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.NodeId = "";

        /**
         * PlayerGameInfo CmpID.
         * @member {number} CmpID
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.CmpID = 0;

        /**
         * PlayerGameInfo Uuid.
         * @member {string} Uuid
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.Uuid = "";

        /**
         * PlayerGameInfo Status.
         * @member {number} Status
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.Status = 0;

        /**
         * PlayerGameInfo MatchID.
         * @member {number} MatchID
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.MatchID = 0;

        /**
         * PlayerGameInfo ActiveTime.
         * @member {number|Long} ActiveTime
         * @memberof pb.PlayerGameInfo
         * @instance
         */
        PlayerGameInfo.prototype.ActiveTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PlayerGameInfo instance using the specified properties.
         * @function create
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {pb.IPlayerGameInfo=} [properties] Properties to set
         * @returns {pb.PlayerGameInfo} PlayerGameInfo instance
         */
        PlayerGameInfo.create = function create(properties) {
            return new PlayerGameInfo(properties);
        };

        /**
         * Encodes the specified PlayerGameInfo message. Does not implicitly {@link pb.PlayerGameInfo.verify|verify} messages.
         * @function encode
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {pb.IPlayerGameInfo} message PlayerGameInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGameInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.GameName != null && Object.hasOwnProperty.call(message, "GameName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.GameName);
            if (message.NodeId != null && Object.hasOwnProperty.call(message, "NodeId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.NodeId);
            if (message.CmpID != null && Object.hasOwnProperty.call(message, "CmpID"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.CmpID);
            if (message.Uuid != null && Object.hasOwnProperty.call(message, "Uuid"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.Uuid);
            if (message.Status != null && Object.hasOwnProperty.call(message, "Status"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.Status);
            if (message.MatchID != null && Object.hasOwnProperty.call(message, "MatchID"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.MatchID);
            if (message.ActiveTime != null && Object.hasOwnProperty.call(message, "ActiveTime"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.ActiveTime);
            return writer;
        };

        /**
         * Encodes the specified PlayerGameInfo message, length delimited. Does not implicitly {@link pb.PlayerGameInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {pb.IPlayerGameInfo} message PlayerGameInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGameInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerGameInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.PlayerGameInfo} PlayerGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGameInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.PlayerGameInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.GameName = reader.string();
                    break;
                case 2:
                    message.NodeId = reader.string();
                    break;
                case 3:
                    message.CmpID = reader.uint32();
                    break;
                case 4:
                    message.Uuid = reader.string();
                    break;
                case 5:
                    message.Status = reader.uint32();
                    break;
                case 6:
                    message.MatchID = reader.uint32();
                    break;
                case 7:
                    message.ActiveTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerGameInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.PlayerGameInfo} PlayerGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGameInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerGameInfo message.
         * @function verify
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerGameInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.GameName != null && message.hasOwnProperty("GameName"))
                if (!$util.isString(message.GameName))
                    return "GameName: string expected";
            if (message.NodeId != null && message.hasOwnProperty("NodeId"))
                if (!$util.isString(message.NodeId))
                    return "NodeId: string expected";
            if (message.CmpID != null && message.hasOwnProperty("CmpID"))
                if (!$util.isInteger(message.CmpID))
                    return "CmpID: integer expected";
            if (message.Uuid != null && message.hasOwnProperty("Uuid"))
                if (!$util.isString(message.Uuid))
                    return "Uuid: string expected";
            if (message.Status != null && message.hasOwnProperty("Status"))
                if (!$util.isInteger(message.Status))
                    return "Status: integer expected";
            if (message.MatchID != null && message.hasOwnProperty("MatchID"))
                if (!$util.isInteger(message.MatchID))
                    return "MatchID: integer expected";
            if (message.ActiveTime != null && message.hasOwnProperty("ActiveTime"))
                if (!$util.isInteger(message.ActiveTime) && !(message.ActiveTime && $util.isInteger(message.ActiveTime.low) && $util.isInteger(message.ActiveTime.high)))
                    return "ActiveTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a PlayerGameInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.PlayerGameInfo} PlayerGameInfo
         */
        PlayerGameInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.PlayerGameInfo)
                return object;
            var message = new $root.blackjack.PlayerGameInfo();
            if (object.GameName != null)
                message.GameName = String(object.GameName);
            if (object.NodeId != null)
                message.NodeId = String(object.NodeId);
            if (object.CmpID != null)
                message.CmpID = object.CmpID >>> 0;
            if (object.Uuid != null)
                message.Uuid = String(object.Uuid);
            if (object.Status != null)
                message.Status = object.Status >>> 0;
            if (object.MatchID != null)
                message.MatchID = object.MatchID >>> 0;
            if (object.ActiveTime != null)
                if ($util.Long)
                    (message.ActiveTime = $util.Long.fromValue(object.ActiveTime)).unsigned = false;
                else if (typeof object.ActiveTime === "string")
                    message.ActiveTime = parseInt(object.ActiveTime, 10);
                else if (typeof object.ActiveTime === "number")
                    message.ActiveTime = object.ActiveTime;
                else if (typeof object.ActiveTime === "object")
                    message.ActiveTime = new $util.LongBits(object.ActiveTime.low >>> 0, object.ActiveTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PlayerGameInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.PlayerGameInfo
         * @static
         * @param {pb.PlayerGameInfo} message PlayerGameInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerGameInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.GameName = "";
                object.NodeId = "";
                object.CmpID = 0;
                object.Uuid = "";
                object.Status = 0;
                object.MatchID = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActiveTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActiveTime = options.longs === String ? "0" : 0;
            }
            if (message.GameName != null && message.hasOwnProperty("GameName"))
                object.GameName = message.GameName;
            if (message.NodeId != null && message.hasOwnProperty("NodeId"))
                object.NodeId = message.NodeId;
            if (message.CmpID != null && message.hasOwnProperty("CmpID"))
                object.CmpID = message.CmpID;
            if (message.Uuid != null && message.hasOwnProperty("Uuid"))
                object.Uuid = message.Uuid;
            if (message.Status != null && message.hasOwnProperty("Status"))
                object.Status = message.Status;
            if (message.MatchID != null && message.hasOwnProperty("MatchID"))
                object.MatchID = message.MatchID;
            if (message.ActiveTime != null && message.hasOwnProperty("ActiveTime"))
                if (typeof message.ActiveTime === "number")
                    object.ActiveTime = options.longs === String ? String(message.ActiveTime) : message.ActiveTime;
                else
                    object.ActiveTime = options.longs === String ? $util.Long.prototype.toString.call(message.ActiveTime) : options.longs === Number ? new $util.LongBits(message.ActiveTime.low >>> 0, message.ActiveTime.high >>> 0).toNumber() : message.ActiveTime;
            return object;
        };

        /**
         * Converts this PlayerGameInfo to JSON.
         * @function toJSON
         * @memberof pb.PlayerGameInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerGameInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerGameInfo;
    })();

    /**
     * CompetitionType enum.
     * @name pb.CompetitionType
     * @enum {number}
     * @property {number} Competition_None=0 Competition_None value
     * @property {number} Competition_Match=1 Competition_Match value
     * @property {number} Competition_Tournament=2 Competition_Tournament value
     * @property {number} Competition_MAX=3 Competition_MAX value
     */
    pb.CompetitionType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Competition_None"] = 0;
        values[valuesById[1] = "Competition_Match"] = 1;
        values[valuesById[2] = "Competition_Tournament"] = 2;
        values[valuesById[3] = "Competition_MAX"] = 3;
        return values;
    })();

    /**
     * ClientCompetitionType enum.
     * @name pb.ClientCompetitionType
     * @enum {number}
     * @property {number} CliCmp_Ticket=0 CliCmp_Ticket value
     * @property {number} CliCmp_Cash=1 CliCmp_Cash value
     * @property {number} CliCmp_Tournament=2 CliCmp_Tournament value
     * @property {number} CliCmp_AllTournament=3 CliCmp_AllTournament value
     * @property {number} CliCmp_MAX=4 CliCmp_MAX value
     */
    pb.ClientCompetitionType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CliCmp_Ticket"] = 0;
        values[valuesById[1] = "CliCmp_Cash"] = 1;
        values[valuesById[2] = "CliCmp_Tournament"] = 2;
        values[valuesById[3] = "CliCmp_AllTournament"] = 3;
        values[valuesById[4] = "CliCmp_MAX"] = 4;
        return values;
    })();

    /**
     * CurrencyType enum.
     * @name pb.CurrencyType
     * @enum {number}
     * @property {number} Currency_Free=0 Currency_Free value
     * @property {number} Currency_Ticket=1 Currency_Ticket value
     * @property {number} Currency_Cash=2 Currency_Cash value
     * @property {number} Currency_BindCash=3 Currency_BindCash value
     * @property {number} Currency_Lottery=4 Currency_Lottery value
     * @property {number} Currency_SeasonScore=5 Currency_SeasonScore value
     * @property {number} Currency_Lottery1=6 Currency_Lottery1 value
     * @property {number} Currency_Lottery2=7 Currency_Lottery2 value
     * @property {number} Currency_Lottery3=8 Currency_Lottery3 value
     * @property {number} Currency_Lottery4=9 Currency_Lottery4 value
     * @property {number} Currency_Diamond=10 Currency_Diamond value
     * @property {number} Currency_MAX=11 Currency_MAX value
     */
    pb.CurrencyType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Currency_Free"] = 0;
        values[valuesById[1] = "Currency_Ticket"] = 1;
        values[valuesById[2] = "Currency_Cash"] = 2;
        values[valuesById[3] = "Currency_BindCash"] = 3;
        values[valuesById[4] = "Currency_Lottery"] = 4;
        values[valuesById[5] = "Currency_SeasonScore"] = 5;
        values[valuesById[6] = "Currency_Lottery1"] = 6;
        values[valuesById[7] = "Currency_Lottery2"] = 7;
        values[valuesById[8] = "Currency_Lottery3"] = 8;
        values[valuesById[9] = "Currency_Lottery4"] = 9;
        values[valuesById[10] = "Currency_Diamond"] = 10;
        values[valuesById[11] = "Currency_MAX"] = 11;
        return values;
    })();

    /**
     * MatchStatus enum.
     * @name pb.MatchStatus
     * @enum {number}
     * @property {number} Status_Matching=0 Status_Matching value
     * @property {number} Status_Finished=1 Status_Finished value
     */
    pb.MatchStatus = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Status_Matching"] = 0;
        values[valuesById[1] = "Status_Finished"] = 1;
        return values;
    })();

    /**
     * GameStatus enum.
     * @name pb.GameStatus
     * @enum {number}
     * @property {number} Status_Gaming=0 Status_Gaming value
     * @property {number} Status_Pause=1 Status_Pause value
     * @property {number} Status_Over=2 Status_Over value
     */
    pb.GameStatus = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Status_Gaming"] = 0;
        values[valuesById[1] = "Status_Pause"] = 1;
        values[valuesById[2] = "Status_Over"] = 2;
        return values;
    })();

    /**
     * GameOverReason enum.
     * @name pb.GameOverReason
     * @enum {number}
     * @property {number} Reason_Auto=0 Reason_Auto value
     * @property {number} Reason_Timeout=1 Reason_Timeout value
     * @property {number} Reason_Force=2 Reason_Force value
     * @property {number} Reason_CmpOver=3 Reason_CmpOver value
     * @property {number} Reason_AllFinish=4 Reason_AllFinish value
     * @property {number} Reason_Dead=5 Reason_Dead value
     */
    pb.GameOverReason = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Reason_Auto"] = 0;
        values[valuesById[1] = "Reason_Timeout"] = 1;
        values[valuesById[2] = "Reason_Force"] = 2;
        values[valuesById[3] = "Reason_CmpOver"] = 3;
        values[valuesById[4] = "Reason_AllFinish"] = 4;
        values[valuesById[5] = "Reason_Dead"] = 5;
        return values;
    })();

    /**
     * CurrencyUpdateEvent enum.
     * @name pb.CurrencyUpdateEvent
     * @enum {number}
     * @property {number} Event_Deposit=0 Event_Deposit value
     * @property {number} Event_Withdraw=1 Event_Withdraw value
     * @property {number} Event_Exchange=2 Event_Exchange value
     * @property {number} Event_MatchEntry=3 Event_MatchEntry value
     * @property {number} Event_MatchReward=4 Event_MatchReward value
     * @property {number} Event_AchievementReward=5 Event_AchievementReward value
     * @property {number} Event_SeasonReward=6 Event_SeasonReward value
     * @property {number} Event_DanReward=7 Event_DanReward value
     * @property {number} Event_QuestReward=8 Event_QuestReward value
     * @property {number} Event_SeasonWheel=9 Event_SeasonWheel value
     * @property {number} Event_WithdrawFail=10 Event_WithdrawFail value
     * @property {number} Event_ActivityLogin=11 Event_ActivityLogin value
     * @property {number} Event_ActivityRecharge=12 Event_ActivityRecharge value
     * @property {number} Event_ActivityCard=13 Event_ActivityCard value
     * @property {number} Event_MatchBack=14 Event_MatchBack value
     * @property {number} Event_Recharge_First=15 Event_Recharge_First value
     * @property {number} Event_GM=100 Event_GM value
     */
    pb.CurrencyUpdateEvent = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Event_Deposit"] = 0;
        values[valuesById[1] = "Event_Withdraw"] = 1;
        values[valuesById[2] = "Event_Exchange"] = 2;
        values[valuesById[3] = "Event_MatchEntry"] = 3;
        values[valuesById[4] = "Event_MatchReward"] = 4;
        values[valuesById[5] = "Event_AchievementReward"] = 5;
        values[valuesById[6] = "Event_SeasonReward"] = 6;
        values[valuesById[7] = "Event_DanReward"] = 7;
        values[valuesById[8] = "Event_QuestReward"] = 8;
        values[valuesById[9] = "Event_SeasonWheel"] = 9;
        values[valuesById[10] = "Event_WithdrawFail"] = 10;
        values[valuesById[11] = "Event_ActivityLogin"] = 11;
        values[valuesById[12] = "Event_ActivityRecharge"] = 12;
        values[valuesById[13] = "Event_ActivityCard"] = 13;
        values[valuesById[14] = "Event_MatchBack"] = 14;
        values[valuesById[15] = "Event_Recharge_First"] = 15;
        values[valuesById[100] = "Event_GM"] = 100;
        return values;
    })();

    /**
     * RedPointModule enum.
     * @name pb.RedPointModule
     * @enum {number}
     * @property {number} RedPoint_Achievement=0 RedPoint_Achievement value
     * @property {number} RedPoint_Season_Dan=1 RedPoint_Season_Dan value
     * @property {number} RedPoint_Season_Quest=2 RedPoint_Season_Quest value
     * @property {number} RedPoint_Season_Wheel=3 RedPoint_Season_Wheel value
     * @property {number} RedPoint_Message=4 RedPoint_Message value
     * @property {number} RedPoint_Record=5 RedPoint_Record value
     */
    pb.RedPointModule = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RedPoint_Achievement"] = 0;
        values[valuesById[1] = "RedPoint_Season_Dan"] = 1;
        values[valuesById[2] = "RedPoint_Season_Quest"] = 2;
        values[valuesById[3] = "RedPoint_Season_Wheel"] = 3;
        values[valuesById[4] = "RedPoint_Message"] = 4;
        values[valuesById[5] = "RedPoint_Record"] = 5;
        return values;
    })();

    pb.CurrencyPair = (function() {

        /**
         * Properties of a CurrencyPair.
         * @memberof pb
         * @interface ICurrencyPair
         * @property {pb.CurrencyType|null} [type] CurrencyPair type
         * @property {number|Long|null} [value] CurrencyPair value
         */

        /**
         * Constructs a new CurrencyPair.
         * @memberof pb
         * @classdesc Represents a CurrencyPair.
         * @implements ICurrencyPair
         * @constructor
         * @param {pb.ICurrencyPair=} [properties] Properties to set
         */
        function CurrencyPair(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CurrencyPair type.
         * @member {pb.CurrencyType} type
         * @memberof pb.CurrencyPair
         * @instance
         */
        CurrencyPair.prototype.type = 0;

        /**
         * CurrencyPair value.
         * @member {number|Long} value
         * @memberof pb.CurrencyPair
         * @instance
         */
        CurrencyPair.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new CurrencyPair instance using the specified properties.
         * @function create
         * @memberof pb.CurrencyPair
         * @static
         * @param {pb.ICurrencyPair=} [properties] Properties to set
         * @returns {pb.CurrencyPair} CurrencyPair instance
         */
        CurrencyPair.create = function create(properties) {
            return new CurrencyPair(properties);
        };

        /**
         * Encodes the specified CurrencyPair message. Does not implicitly {@link pb.CurrencyPair.verify|verify} messages.
         * @function encode
         * @memberof pb.CurrencyPair
         * @static
         * @param {pb.ICurrencyPair} message CurrencyPair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurrencyPair.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.value);
            return writer;
        };

        /**
         * Encodes the specified CurrencyPair message, length delimited. Does not implicitly {@link pb.CurrencyPair.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CurrencyPair
         * @static
         * @param {pb.ICurrencyPair} message CurrencyPair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurrencyPair.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CurrencyPair message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CurrencyPair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CurrencyPair} CurrencyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurrencyPair.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.CurrencyPair();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.value = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CurrencyPair message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CurrencyPair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CurrencyPair} CurrencyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurrencyPair.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CurrencyPair message.
         * @function verify
         * @memberof pb.CurrencyPair
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CurrencyPair.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    break;
                }
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                    return "value: integer|Long expected";
            return null;
        };

        /**
         * Creates a CurrencyPair message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CurrencyPair
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CurrencyPair} CurrencyPair
         */
        CurrencyPair.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.CurrencyPair)
                return object;
            var message = new $root.blackjack.CurrencyPair();
            switch (object.type) {
            case "Currency_Free":
            case 0:
                message.type = 0;
                break;
            case "Currency_Ticket":
            case 1:
                message.type = 1;
                break;
            case "Currency_Cash":
            case 2:
                message.type = 2;
                break;
            case "Currency_BindCash":
            case 3:
                message.type = 3;
                break;
            case "Currency_Lottery":
            case 4:
                message.type = 4;
                break;
            case "Currency_SeasonScore":
            case 5:
                message.type = 5;
                break;
            case "Currency_Lottery1":
            case 6:
                message.type = 6;
                break;
            case "Currency_Lottery2":
            case 7:
                message.type = 7;
                break;
            case "Currency_Lottery3":
            case 8:
                message.type = 8;
                break;
            case "Currency_Lottery4":
            case 9:
                message.type = 9;
                break;
            case "Currency_Diamond":
            case 10:
                message.type = 10;
                break;
            case "Currency_MAX":
            case 11:
                message.type = 11;
                break;
            }
            if (object.value != null)
                if ($util.Long)
                    (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                else if (typeof object.value === "string")
                    message.value = parseInt(object.value, 10);
                else if (typeof object.value === "number")
                    message.value = object.value;
                else if (typeof object.value === "object")
                    message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CurrencyPair message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CurrencyPair
         * @static
         * @param {pb.CurrencyPair} message CurrencyPair
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CurrencyPair.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "Currency_Free" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.value = options.longs === String ? "0" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.blackjack.CurrencyType[message.type] : message.type;
            if (message.value != null && message.hasOwnProperty("value"))
                if (typeof message.value === "number")
                    object.value = options.longs === String ? String(message.value) : message.value;
                else
                    object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
            return object;
        };

        /**
         * Converts this CurrencyPair to JSON.
         * @function toJSON
         * @memberof pb.CurrencyPair
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CurrencyPair.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CurrencyPair;
    })();

    pb.ErrorMessageNotify = (function() {

        /**
         * Properties of an ErrorMessageNotify.
         * @memberof pb
         * @interface IErrorMessageNotify
         * @property {pb.ErrNo|null} [err] ErrorMessageNotify err
         */

        /**
         * Constructs a new ErrorMessageNotify.
         * @memberof pb
         * @classdesc Represents an ErrorMessageNotify.
         * @implements IErrorMessageNotify
         * @constructor
         * @param {pb.IErrorMessageNotify=} [properties] Properties to set
         */
        function ErrorMessageNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorMessageNotify err.
         * @member {pb.ErrNo} err
         * @memberof pb.ErrorMessageNotify
         * @instance
         */
        ErrorMessageNotify.prototype.err = 0;

        /**
         * Creates a new ErrorMessageNotify instance using the specified properties.
         * @function create
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {pb.IErrorMessageNotify=} [properties] Properties to set
         * @returns {pb.ErrorMessageNotify} ErrorMessageNotify instance
         */
        ErrorMessageNotify.create = function create(properties) {
            return new ErrorMessageNotify(properties);
        };

        /**
         * Encodes the specified ErrorMessageNotify message. Does not implicitly {@link pb.ErrorMessageNotify.verify|verify} messages.
         * @function encode
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {pb.IErrorMessageNotify} message ErrorMessageNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMessageNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            return writer;
        };

        /**
         * Encodes the specified ErrorMessageNotify message, length delimited. Does not implicitly {@link pb.ErrorMessageNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {pb.IErrorMessageNotify} message ErrorMessageNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMessageNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorMessageNotify message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ErrorMessageNotify} ErrorMessageNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMessageNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.ErrorMessageNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorMessageNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ErrorMessageNotify} ErrorMessageNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMessageNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorMessageNotify message.
         * @function verify
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorMessageNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                switch (message.err) {
                default:
                    return "err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            return null;
        };

        /**
         * Creates an ErrorMessageNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ErrorMessageNotify} ErrorMessageNotify
         */
        ErrorMessageNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.ErrorMessageNotify)
                return object;
            var message = new $root.blackjack.ErrorMessageNotify();
            switch (object.err) {
            case "SUCCESS":
            case 0:
                message.err = 0;
                break;
            case "Server_Except":
            case 1:
                message.err = 1;
                break;
            case "TokenError":
            case 2:
                message.err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.err = 14;
                break;
            case "AccountBind":
            case 15:
                message.err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.err = 204;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ErrorMessageNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ErrorMessageNotify
         * @static
         * @param {pb.ErrorMessageNotify} message ErrorMessageNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorMessageNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.err = options.enums === String ? "SUCCESS" : 0;
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.blackjack.ErrNo[message.err] : message.err;
            return object;
        };

        /**
         * Converts this ErrorMessageNotify to JSON.
         * @function toJSON
         * @memberof pb.ErrorMessageNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorMessageNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ErrorMessageNotify;
    })();

    pb.PlayerCurrencyChangeNotify = (function() {

        /**
         * Properties of a PlayerCurrencyChangeNotify.
         * @memberof pb
         * @interface IPlayerCurrencyChangeNotify
         * @property {Array.<pb.ICurrencyPair>|null} [list] PlayerCurrencyChangeNotify list
         * @property {pb.CurrencyUpdateEvent|null} [event] PlayerCurrencyChangeNotify event
         */

        /**
         * Constructs a new PlayerCurrencyChangeNotify.
         * @memberof pb
         * @classdesc Represents a PlayerCurrencyChangeNotify.
         * @implements IPlayerCurrencyChangeNotify
         * @constructor
         * @param {pb.IPlayerCurrencyChangeNotify=} [properties] Properties to set
         */
        function PlayerCurrencyChangeNotify(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerCurrencyChangeNotify list.
         * @member {Array.<pb.ICurrencyPair>} list
         * @memberof pb.PlayerCurrencyChangeNotify
         * @instance
         */
        PlayerCurrencyChangeNotify.prototype.list = $util.emptyArray;

        /**
         * PlayerCurrencyChangeNotify event.
         * @member {pb.CurrencyUpdateEvent} event
         * @memberof pb.PlayerCurrencyChangeNotify
         * @instance
         */
        PlayerCurrencyChangeNotify.prototype.event = 0;

        /**
         * Creates a new PlayerCurrencyChangeNotify instance using the specified properties.
         * @function create
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {pb.IPlayerCurrencyChangeNotify=} [properties] Properties to set
         * @returns {pb.PlayerCurrencyChangeNotify} PlayerCurrencyChangeNotify instance
         */
        PlayerCurrencyChangeNotify.create = function create(properties) {
            return new PlayerCurrencyChangeNotify(properties);
        };

        /**
         * Encodes the specified PlayerCurrencyChangeNotify message. Does not implicitly {@link pb.PlayerCurrencyChangeNotify.verify|verify} messages.
         * @function encode
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {pb.IPlayerCurrencyChangeNotify} message PlayerCurrencyChangeNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerCurrencyChangeNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.blackjack.CurrencyPair.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.event);
            return writer;
        };

        /**
         * Encodes the specified PlayerCurrencyChangeNotify message, length delimited. Does not implicitly {@link pb.PlayerCurrencyChangeNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {pb.IPlayerCurrencyChangeNotify} message PlayerCurrencyChangeNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerCurrencyChangeNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerCurrencyChangeNotify message from the specified reader or buffer.
         * @function decode
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.PlayerCurrencyChangeNotify} PlayerCurrencyChangeNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerCurrencyChangeNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.PlayerCurrencyChangeNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.blackjack.CurrencyPair.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.event = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerCurrencyChangeNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.PlayerCurrencyChangeNotify} PlayerCurrencyChangeNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerCurrencyChangeNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerCurrencyChangeNotify message.
         * @function verify
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerCurrencyChangeNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.blackjack.CurrencyPair.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            if (message.event != null && message.hasOwnProperty("event"))
                switch (message.event) {
                default:
                    return "event: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 100:
                    break;
                }
            return null;
        };

        /**
         * Creates a PlayerCurrencyChangeNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.PlayerCurrencyChangeNotify} PlayerCurrencyChangeNotify
         */
        PlayerCurrencyChangeNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.PlayerCurrencyChangeNotify)
                return object;
            var message = new $root.blackjack.PlayerCurrencyChangeNotify();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".pb.PlayerCurrencyChangeNotify.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".pb.PlayerCurrencyChangeNotify.list: object expected");
                    message.list[i] = $root.blackjack.CurrencyPair.fromObject(object.list[i]);
                }
            }
            switch (object.event) {
            case "Event_Deposit":
            case 0:
                message.event = 0;
                break;
            case "Event_Withdraw":
            case 1:
                message.event = 1;
                break;
            case "Event_Exchange":
            case 2:
                message.event = 2;
                break;
            case "Event_MatchEntry":
            case 3:
                message.event = 3;
                break;
            case "Event_MatchReward":
            case 4:
                message.event = 4;
                break;
            case "Event_AchievementReward":
            case 5:
                message.event = 5;
                break;
            case "Event_SeasonReward":
            case 6:
                message.event = 6;
                break;
            case "Event_DanReward":
            case 7:
                message.event = 7;
                break;
            case "Event_QuestReward":
            case 8:
                message.event = 8;
                break;
            case "Event_SeasonWheel":
            case 9:
                message.event = 9;
                break;
            case "Event_WithdrawFail":
            case 10:
                message.event = 10;
                break;
            case "Event_ActivityLogin":
            case 11:
                message.event = 11;
                break;
            case "Event_ActivityRecharge":
            case 12:
                message.event = 12;
                break;
            case "Event_ActivityCard":
            case 13:
                message.event = 13;
                break;
            case "Event_MatchBack":
            case 14:
                message.event = 14;
                break;
            case "Event_Recharge_First":
            case 15:
                message.event = 15;
                break;
            case "Event_GM":
            case 100:
                message.event = 100;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerCurrencyChangeNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.PlayerCurrencyChangeNotify
         * @static
         * @param {pb.PlayerCurrencyChangeNotify} message PlayerCurrencyChangeNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerCurrencyChangeNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults)
                object.event = options.enums === String ? "Event_Deposit" : 0;
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.blackjack.CurrencyPair.toObject(message.list[j], options);
            }
            if (message.event != null && message.hasOwnProperty("event"))
                object.event = options.enums === String ? $root.blackjack.CurrencyUpdateEvent[message.event] : message.event;
            return object;
        };

        /**
         * Converts this PlayerCurrencyChangeNotify to JSON.
         * @function toJSON
         * @memberof pb.PlayerCurrencyChangeNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerCurrencyChangeNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerCurrencyChangeNotify;
    })();

    pb.PrizePoolUpdateNotify = (function() {

        /**
         * Properties of a PrizePoolUpdateNotify.
         * @memberof pb
         * @interface IPrizePoolUpdateNotify
         * @property {number|Long|null} [PrizePool] PrizePoolUpdateNotify PrizePool
         */

        /**
         * Constructs a new PrizePoolUpdateNotify.
         * @memberof pb
         * @classdesc Represents a PrizePoolUpdateNotify.
         * @implements IPrizePoolUpdateNotify
         * @constructor
         * @param {pb.IPrizePoolUpdateNotify=} [properties] Properties to set
         */
        function PrizePoolUpdateNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PrizePoolUpdateNotify PrizePool.
         * @member {number|Long} PrizePool
         * @memberof pb.PrizePoolUpdateNotify
         * @instance
         */
        PrizePoolUpdateNotify.prototype.PrizePool = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PrizePoolUpdateNotify instance using the specified properties.
         * @function create
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {pb.IPrizePoolUpdateNotify=} [properties] Properties to set
         * @returns {pb.PrizePoolUpdateNotify} PrizePoolUpdateNotify instance
         */
        PrizePoolUpdateNotify.create = function create(properties) {
            return new PrizePoolUpdateNotify(properties);
        };

        /**
         * Encodes the specified PrizePoolUpdateNotify message. Does not implicitly {@link pb.PrizePoolUpdateNotify.verify|verify} messages.
         * @function encode
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {pb.IPrizePoolUpdateNotify} message PrizePoolUpdateNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrizePoolUpdateNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PrizePool != null && Object.hasOwnProperty.call(message, "PrizePool"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.PrizePool);
            return writer;
        };

        /**
         * Encodes the specified PrizePoolUpdateNotify message, length delimited. Does not implicitly {@link pb.PrizePoolUpdateNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {pb.IPrizePoolUpdateNotify} message PrizePoolUpdateNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrizePoolUpdateNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PrizePoolUpdateNotify message from the specified reader or buffer.
         * @function decode
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.PrizePoolUpdateNotify} PrizePoolUpdateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrizePoolUpdateNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.PrizePoolUpdateNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.PrizePool = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PrizePoolUpdateNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.PrizePoolUpdateNotify} PrizePoolUpdateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrizePoolUpdateNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PrizePoolUpdateNotify message.
         * @function verify
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PrizePoolUpdateNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.PrizePool != null && message.hasOwnProperty("PrizePool"))
                if (!$util.isInteger(message.PrizePool) && !(message.PrizePool && $util.isInteger(message.PrizePool.low) && $util.isInteger(message.PrizePool.high)))
                    return "PrizePool: integer|Long expected";
            return null;
        };

        /**
         * Creates a PrizePoolUpdateNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.PrizePoolUpdateNotify} PrizePoolUpdateNotify
         */
        PrizePoolUpdateNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.PrizePoolUpdateNotify)
                return object;
            var message = new $root.blackjack.PrizePoolUpdateNotify();
            if (object.PrizePool != null)
                if ($util.Long)
                    (message.PrizePool = $util.Long.fromValue(object.PrizePool)).unsigned = false;
                else if (typeof object.PrizePool === "string")
                    message.PrizePool = parseInt(object.PrizePool, 10);
                else if (typeof object.PrizePool === "number")
                    message.PrizePool = object.PrizePool;
                else if (typeof object.PrizePool === "object")
                    message.PrizePool = new $util.LongBits(object.PrizePool.low >>> 0, object.PrizePool.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PrizePoolUpdateNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.PrizePoolUpdateNotify
         * @static
         * @param {pb.PrizePoolUpdateNotify} message PrizePoolUpdateNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PrizePoolUpdateNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.PrizePool = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.PrizePool = options.longs === String ? "0" : 0;
            if (message.PrizePool != null && message.hasOwnProperty("PrizePool"))
                if (typeof message.PrizePool === "number")
                    object.PrizePool = options.longs === String ? String(message.PrizePool) : message.PrizePool;
                else
                    object.PrizePool = options.longs === String ? $util.Long.prototype.toString.call(message.PrizePool) : options.longs === Number ? new $util.LongBits(message.PrizePool.low >>> 0, message.PrizePool.high >>> 0).toNumber() : message.PrizePool;
            return object;
        };

        /**
         * Converts this PrizePoolUpdateNotify to JSON.
         * @function toJSON
         * @memberof pb.PrizePoolUpdateNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PrizePoolUpdateNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PrizePoolUpdateNotify;
    })();

    pb.SeasonRewardGetReq = (function() {

        /**
         * Properties of a SeasonRewardGetReq.
         * @memberof pb
         * @interface ISeasonRewardGetReq
         * @property {number|null} [QuestID] SeasonRewardGetReq QuestID
         */

        /**
         * Constructs a new SeasonRewardGetReq.
         * @memberof pb
         * @classdesc Represents a SeasonRewardGetReq.
         * @implements ISeasonRewardGetReq
         * @constructor
         * @param {pb.ISeasonRewardGetReq=} [properties] Properties to set
         */
        function SeasonRewardGetReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeasonRewardGetReq QuestID.
         * @member {number} QuestID
         * @memberof pb.SeasonRewardGetReq
         * @instance
         */
        SeasonRewardGetReq.prototype.QuestID = 0;

        /**
         * Creates a new SeasonRewardGetReq instance using the specified properties.
         * @function create
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {pb.ISeasonRewardGetReq=} [properties] Properties to set
         * @returns {pb.SeasonRewardGetReq} SeasonRewardGetReq instance
         */
        SeasonRewardGetReq.create = function create(properties) {
            return new SeasonRewardGetReq(properties);
        };

        /**
         * Encodes the specified SeasonRewardGetReq message. Does not implicitly {@link pb.SeasonRewardGetReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {pb.ISeasonRewardGetReq} message SeasonRewardGetReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonRewardGetReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.QuestID != null && Object.hasOwnProperty.call(message, "QuestID"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.QuestID);
            return writer;
        };

        /**
         * Encodes the specified SeasonRewardGetReq message, length delimited. Does not implicitly {@link pb.SeasonRewardGetReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {pb.ISeasonRewardGetReq} message SeasonRewardGetReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonRewardGetReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeasonRewardGetReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SeasonRewardGetReq} SeasonRewardGetReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonRewardGetReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.SeasonRewardGetReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.QuestID = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeasonRewardGetReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SeasonRewardGetReq} SeasonRewardGetReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonRewardGetReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeasonRewardGetReq message.
         * @function verify
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeasonRewardGetReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.QuestID != null && message.hasOwnProperty("QuestID"))
                if (!$util.isInteger(message.QuestID))
                    return "QuestID: integer expected";
            return null;
        };

        /**
         * Creates a SeasonRewardGetReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SeasonRewardGetReq} SeasonRewardGetReq
         */
        SeasonRewardGetReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.SeasonRewardGetReq)
                return object;
            var message = new $root.blackjack.SeasonRewardGetReq();
            if (object.QuestID != null)
                message.QuestID = object.QuestID >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a SeasonRewardGetReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SeasonRewardGetReq
         * @static
         * @param {pb.SeasonRewardGetReq} message SeasonRewardGetReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeasonRewardGetReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.QuestID = 0;
            if (message.QuestID != null && message.hasOwnProperty("QuestID"))
                object.QuestID = message.QuestID;
            return object;
        };

        /**
         * Converts this SeasonRewardGetReq to JSON.
         * @function toJSON
         * @memberof pb.SeasonRewardGetReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeasonRewardGetReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeasonRewardGetReq;
    })();

    pb.SeasonRewardGetResp = (function() {

        /**
         * Properties of a SeasonRewardGetResp.
         * @memberof pb
         * @interface ISeasonRewardGetResp
         * @property {pb.ErrNo|null} [err] SeasonRewardGetResp err
         * @property {pb.ICurrencyPair|null} [reward] SeasonRewardGetResp reward
         */

        /**
         * Constructs a new SeasonRewardGetResp.
         * @memberof pb
         * @classdesc Represents a SeasonRewardGetResp.
         * @implements ISeasonRewardGetResp
         * @constructor
         * @param {pb.ISeasonRewardGetResp=} [properties] Properties to set
         */
        function SeasonRewardGetResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeasonRewardGetResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SeasonRewardGetResp
         * @instance
         */
        SeasonRewardGetResp.prototype.err = 0;

        /**
         * SeasonRewardGetResp reward.
         * @member {pb.ICurrencyPair|null|undefined} reward
         * @memberof pb.SeasonRewardGetResp
         * @instance
         */
        SeasonRewardGetResp.prototype.reward = null;

        /**
         * Creates a new SeasonRewardGetResp instance using the specified properties.
         * @function create
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {pb.ISeasonRewardGetResp=} [properties] Properties to set
         * @returns {pb.SeasonRewardGetResp} SeasonRewardGetResp instance
         */
        SeasonRewardGetResp.create = function create(properties) {
            return new SeasonRewardGetResp(properties);
        };

        /**
         * Encodes the specified SeasonRewardGetResp message. Does not implicitly {@link pb.SeasonRewardGetResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {pb.ISeasonRewardGetResp} message SeasonRewardGetResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonRewardGetResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                $root.blackjack.CurrencyPair.encode(message.reward, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SeasonRewardGetResp message, length delimited. Does not implicitly {@link pb.SeasonRewardGetResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {pb.ISeasonRewardGetResp} message SeasonRewardGetResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonRewardGetResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeasonRewardGetResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SeasonRewardGetResp} SeasonRewardGetResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonRewardGetResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.SeasonRewardGetResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.reward = $root.blackjack.CurrencyPair.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeasonRewardGetResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SeasonRewardGetResp} SeasonRewardGetResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonRewardGetResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeasonRewardGetResp message.
         * @function verify
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeasonRewardGetResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                switch (message.err) {
                default:
                    return "err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.reward != null && message.hasOwnProperty("reward")) {
                var error = $root.blackjack.CurrencyPair.verify(message.reward);
                if (error)
                    return "reward." + error;
            }
            return null;
        };

        /**
         * Creates a SeasonRewardGetResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SeasonRewardGetResp} SeasonRewardGetResp
         */
        SeasonRewardGetResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.SeasonRewardGetResp)
                return object;
            var message = new $root.blackjack.SeasonRewardGetResp();
            switch (object.err) {
            case "SUCCESS":
            case 0:
                message.err = 0;
                break;
            case "Server_Except":
            case 1:
                message.err = 1;
                break;
            case "TokenError":
            case 2:
                message.err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.err = 14;
                break;
            case "AccountBind":
            case 15:
                message.err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.err = 204;
                break;
            }
            if (object.reward != null) {
                if (typeof object.reward !== "object")
                    throw TypeError(".pb.SeasonRewardGetResp.reward: object expected");
                message.reward = $root.blackjack.CurrencyPair.fromObject(object.reward);
            }
            return message;
        };

        /**
         * Creates a plain object from a SeasonRewardGetResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SeasonRewardGetResp
         * @static
         * @param {pb.SeasonRewardGetResp} message SeasonRewardGetResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeasonRewardGetResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.reward = null;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.blackjack.ErrNo[message.err] : message.err;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = $root.blackjack.CurrencyPair.toObject(message.reward, options);
            return object;
        };

        /**
         * Converts this SeasonRewardGetResp to JSON.
         * @function toJSON
         * @memberof pb.SeasonRewardGetResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeasonRewardGetResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeasonRewardGetResp;
    })();

    pb.DuplicateLoginResp = (function() {

        /**
         * Properties of a DuplicateLoginResp.
         * @memberof pb
         * @interface IDuplicateLoginResp
         * @property {pb.ErrNo|null} [Err] DuplicateLoginResp Err
         * @property {string|null} [Message] DuplicateLoginResp Message
         */

        /**
         * Constructs a new DuplicateLoginResp.
         * @memberof pb
         * @classdesc Represents a DuplicateLoginResp.
         * @implements IDuplicateLoginResp
         * @constructor
         * @param {pb.IDuplicateLoginResp=} [properties] Properties to set
         */
        function DuplicateLoginResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DuplicateLoginResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.DuplicateLoginResp
         * @instance
         */
        DuplicateLoginResp.prototype.Err = 0;

        /**
         * DuplicateLoginResp Message.
         * @member {string} Message
         * @memberof pb.DuplicateLoginResp
         * @instance
         */
        DuplicateLoginResp.prototype.Message = "";

        /**
         * Creates a new DuplicateLoginResp instance using the specified properties.
         * @function create
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {pb.IDuplicateLoginResp=} [properties] Properties to set
         * @returns {pb.DuplicateLoginResp} DuplicateLoginResp instance
         */
        DuplicateLoginResp.create = function create(properties) {
            return new DuplicateLoginResp(properties);
        };

        /**
         * Encodes the specified DuplicateLoginResp message. Does not implicitly {@link pb.DuplicateLoginResp.verify|verify} messages.
         * @function encode
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {pb.IDuplicateLoginResp} message DuplicateLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DuplicateLoginResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified DuplicateLoginResp message, length delimited. Does not implicitly {@link pb.DuplicateLoginResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {pb.IDuplicateLoginResp} message DuplicateLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DuplicateLoginResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DuplicateLoginResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.DuplicateLoginResp} DuplicateLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DuplicateLoginResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.DuplicateLoginResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.Message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DuplicateLoginResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.DuplicateLoginResp} DuplicateLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DuplicateLoginResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DuplicateLoginResp message.
         * @function verify
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DuplicateLoginResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates a DuplicateLoginResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.DuplicateLoginResp} DuplicateLoginResp
         */
        DuplicateLoginResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.DuplicateLoginResp)
                return object;
            var message = new $root.blackjack.DuplicateLoginResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from a DuplicateLoginResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.DuplicateLoginResp
         * @static
         * @param {pb.DuplicateLoginResp} message DuplicateLoginResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DuplicateLoginResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.Message = "";
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this DuplicateLoginResp to JSON.
         * @function toJSON
         * @memberof pb.DuplicateLoginResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DuplicateLoginResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DuplicateLoginResp;
    })();

    pb.DrawLotteryNotify = (function() {

        /**
         * Properties of a DrawLotteryNotify.
         * @memberof pb
         * @interface IDrawLotteryNotify
         * @property {pb.CurrencyType|null} [LotteryType] DrawLotteryNotify LotteryType
         * @property {number|null} [LotteryLevel] DrawLotteryNotify LotteryLevel
         */

        /**
         * Constructs a new DrawLotteryNotify.
         * @memberof pb
         * @classdesc Represents a DrawLotteryNotify.
         * @implements IDrawLotteryNotify
         * @constructor
         * @param {pb.IDrawLotteryNotify=} [properties] Properties to set
         */
        function DrawLotteryNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DrawLotteryNotify LotteryType.
         * @member {pb.CurrencyType} LotteryType
         * @memberof pb.DrawLotteryNotify
         * @instance
         */
        DrawLotteryNotify.prototype.LotteryType = 0;

        /**
         * DrawLotteryNotify LotteryLevel.
         * @member {number} LotteryLevel
         * @memberof pb.DrawLotteryNotify
         * @instance
         */
        DrawLotteryNotify.prototype.LotteryLevel = 0;

        /**
         * Creates a new DrawLotteryNotify instance using the specified properties.
         * @function create
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {pb.IDrawLotteryNotify=} [properties] Properties to set
         * @returns {pb.DrawLotteryNotify} DrawLotteryNotify instance
         */
        DrawLotteryNotify.create = function create(properties) {
            return new DrawLotteryNotify(properties);
        };

        /**
         * Encodes the specified DrawLotteryNotify message. Does not implicitly {@link pb.DrawLotteryNotify.verify|verify} messages.
         * @function encode
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {pb.IDrawLotteryNotify} message DrawLotteryNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DrawLotteryNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.LotteryType != null && Object.hasOwnProperty.call(message, "LotteryType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.LotteryType);
            if (message.LotteryLevel != null && Object.hasOwnProperty.call(message, "LotteryLevel"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.LotteryLevel);
            return writer;
        };

        /**
         * Encodes the specified DrawLotteryNotify message, length delimited. Does not implicitly {@link pb.DrawLotteryNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {pb.IDrawLotteryNotify} message DrawLotteryNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DrawLotteryNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DrawLotteryNotify message from the specified reader or buffer.
         * @function decode
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.DrawLotteryNotify} DrawLotteryNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DrawLotteryNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.DrawLotteryNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.LotteryType = reader.int32();
                    break;
                case 2:
                    message.LotteryLevel = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DrawLotteryNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.DrawLotteryNotify} DrawLotteryNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DrawLotteryNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DrawLotteryNotify message.
         * @function verify
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DrawLotteryNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.LotteryType != null && message.hasOwnProperty("LotteryType"))
                switch (message.LotteryType) {
                default:
                    return "LotteryType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    break;
                }
            if (message.LotteryLevel != null && message.hasOwnProperty("LotteryLevel"))
                if (!$util.isInteger(message.LotteryLevel))
                    return "LotteryLevel: integer expected";
            return null;
        };

        /**
         * Creates a DrawLotteryNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.DrawLotteryNotify} DrawLotteryNotify
         */
        DrawLotteryNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.DrawLotteryNotify)
                return object;
            var message = new $root.blackjack.DrawLotteryNotify();
            switch (object.LotteryType) {
            case "Currency_Free":
            case 0:
                message.LotteryType = 0;
                break;
            case "Currency_Ticket":
            case 1:
                message.LotteryType = 1;
                break;
            case "Currency_Cash":
            case 2:
                message.LotteryType = 2;
                break;
            case "Currency_BindCash":
            case 3:
                message.LotteryType = 3;
                break;
            case "Currency_Lottery":
            case 4:
                message.LotteryType = 4;
                break;
            case "Currency_SeasonScore":
            case 5:
                message.LotteryType = 5;
                break;
            case "Currency_Lottery1":
            case 6:
                message.LotteryType = 6;
                break;
            case "Currency_Lottery2":
            case 7:
                message.LotteryType = 7;
                break;
            case "Currency_Lottery3":
            case 8:
                message.LotteryType = 8;
                break;
            case "Currency_Lottery4":
            case 9:
                message.LotteryType = 9;
                break;
            case "Currency_Diamond":
            case 10:
                message.LotteryType = 10;
                break;
            case "Currency_MAX":
            case 11:
                message.LotteryType = 11;
                break;
            }
            if (object.LotteryLevel != null)
                message.LotteryLevel = object.LotteryLevel | 0;
            return message;
        };

        /**
         * Creates a plain object from a DrawLotteryNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.DrawLotteryNotify
         * @static
         * @param {pb.DrawLotteryNotify} message DrawLotteryNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DrawLotteryNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.LotteryType = options.enums === String ? "Currency_Free" : 0;
                object.LotteryLevel = 0;
            }
            if (message.LotteryType != null && message.hasOwnProperty("LotteryType"))
                object.LotteryType = options.enums === String ? $root.blackjack.CurrencyType[message.LotteryType] : message.LotteryType;
            if (message.LotteryLevel != null && message.hasOwnProperty("LotteryLevel"))
                object.LotteryLevel = message.LotteryLevel;
            return object;
        };

        /**
         * Converts this DrawLotteryNotify to JSON.
         * @function toJSON
         * @memberof pb.DrawLotteryNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DrawLotteryNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DrawLotteryNotify;
    })();

    pb.HeadPush = (function() {

        /**
         * Properties of a HeadPush.
         * @memberof pb
         * @interface IHeadPush
         * @property {string|null} [Title] HeadPush Title
         * @property {string|null} [Content] HeadPush Content
         * @property {number|Long|null} [Amount] HeadPush Amount
         * @property {number|Long|null} [Time] HeadPush Time
         */

        /**
         * Constructs a new HeadPush.
         * @memberof pb
         * @classdesc Represents a HeadPush.
         * @implements IHeadPush
         * @constructor
         * @param {pb.IHeadPush=} [properties] Properties to set
         */
        function HeadPush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeadPush Title.
         * @member {string} Title
         * @memberof pb.HeadPush
         * @instance
         */
        HeadPush.prototype.Title = "";

        /**
         * HeadPush Content.
         * @member {string} Content
         * @memberof pb.HeadPush
         * @instance
         */
        HeadPush.prototype.Content = "";

        /**
         * HeadPush Amount.
         * @member {number|Long} Amount
         * @memberof pb.HeadPush
         * @instance
         */
        HeadPush.prototype.Amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * HeadPush Time.
         * @member {number|Long} Time
         * @memberof pb.HeadPush
         * @instance
         */
        HeadPush.prototype.Time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeadPush instance using the specified properties.
         * @function create
         * @memberof pb.HeadPush
         * @static
         * @param {pb.IHeadPush=} [properties] Properties to set
         * @returns {pb.HeadPush} HeadPush instance
         */
        HeadPush.create = function create(properties) {
            return new HeadPush(properties);
        };

        /**
         * Encodes the specified HeadPush message. Does not implicitly {@link pb.HeadPush.verify|verify} messages.
         * @function encode
         * @memberof pb.HeadPush
         * @static
         * @param {pb.IHeadPush} message HeadPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeadPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Title != null && Object.hasOwnProperty.call(message, "Title"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Title);
            if (message.Content != null && Object.hasOwnProperty.call(message, "Content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Content);
            if (message.Amount != null && Object.hasOwnProperty.call(message, "Amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.Amount);
            if (message.Time != null && Object.hasOwnProperty.call(message, "Time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.Time);
            return writer;
        };

        /**
         * Encodes the specified HeadPush message, length delimited. Does not implicitly {@link pb.HeadPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.HeadPush
         * @static
         * @param {pb.IHeadPush} message HeadPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeadPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeadPush message from the specified reader or buffer.
         * @function decode
         * @memberof pb.HeadPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.HeadPush} HeadPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeadPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.HeadPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Title = reader.string();
                    break;
                case 2:
                    message.Content = reader.string();
                    break;
                case 3:
                    message.Amount = reader.int64();
                    break;
                case 4:
                    message.Time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeadPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.HeadPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.HeadPush} HeadPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeadPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeadPush message.
         * @function verify
         * @memberof pb.HeadPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeadPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Title != null && message.hasOwnProperty("Title"))
                if (!$util.isString(message.Title))
                    return "Title: string expected";
            if (message.Content != null && message.hasOwnProperty("Content"))
                if (!$util.isString(message.Content))
                    return "Content: string expected";
            if (message.Amount != null && message.hasOwnProperty("Amount"))
                if (!$util.isInteger(message.Amount) && !(message.Amount && $util.isInteger(message.Amount.low) && $util.isInteger(message.Amount.high)))
                    return "Amount: integer|Long expected";
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (!$util.isInteger(message.Time) && !(message.Time && $util.isInteger(message.Time.low) && $util.isInteger(message.Time.high)))
                    return "Time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeadPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.HeadPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.HeadPush} HeadPush
         */
        HeadPush.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.HeadPush)
                return object;
            var message = new $root.blackjack.HeadPush();
            if (object.Title != null)
                message.Title = String(object.Title);
            if (object.Content != null)
                message.Content = String(object.Content);
            if (object.Amount != null)
                if ($util.Long)
                    (message.Amount = $util.Long.fromValue(object.Amount)).unsigned = false;
                else if (typeof object.Amount === "string")
                    message.Amount = parseInt(object.Amount, 10);
                else if (typeof object.Amount === "number")
                    message.Amount = object.Amount;
                else if (typeof object.Amount === "object")
                    message.Amount = new $util.LongBits(object.Amount.low >>> 0, object.Amount.high >>> 0).toNumber();
            if (object.Time != null)
                if ($util.Long)
                    (message.Time = $util.Long.fromValue(object.Time)).unsigned = false;
                else if (typeof object.Time === "string")
                    message.Time = parseInt(object.Time, 10);
                else if (typeof object.Time === "number")
                    message.Time = object.Time;
                else if (typeof object.Time === "object")
                    message.Time = new $util.LongBits(object.Time.low >>> 0, object.Time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeadPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.HeadPush
         * @static
         * @param {pb.HeadPush} message HeadPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeadPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Title = "";
                object.Content = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Amount = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Time = options.longs === String ? "0" : 0;
            }
            if (message.Title != null && message.hasOwnProperty("Title"))
                object.Title = message.Title;
            if (message.Content != null && message.hasOwnProperty("Content"))
                object.Content = message.Content;
            if (message.Amount != null && message.hasOwnProperty("Amount"))
                if (typeof message.Amount === "number")
                    object.Amount = options.longs === String ? String(message.Amount) : message.Amount;
                else
                    object.Amount = options.longs === String ? $util.Long.prototype.toString.call(message.Amount) : options.longs === Number ? new $util.LongBits(message.Amount.low >>> 0, message.Amount.high >>> 0).toNumber() : message.Amount;
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (typeof message.Time === "number")
                    object.Time = options.longs === String ? String(message.Time) : message.Time;
                else
                    object.Time = options.longs === String ? $util.Long.prototype.toString.call(message.Time) : options.longs === Number ? new $util.LongBits(message.Time.low >>> 0, message.Time.high >>> 0).toNumber() : message.Time;
            return object;
        };

        /**
         * Converts this HeadPush to JSON.
         * @function toJSON
         * @memberof pb.HeadPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeadPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeadPush;
    })();

    pb.DanRefresh = (function() {

        /**
         * Properties of a DanRefresh.
         * @memberof pb
         * @interface IDanRefresh
         * @property {number|null} [Dan] DanRefresh Dan
         */

        /**
         * Constructs a new DanRefresh.
         * @memberof pb
         * @classdesc Represents a DanRefresh.
         * @implements IDanRefresh
         * @constructor
         * @param {pb.IDanRefresh=} [properties] Properties to set
         */
        function DanRefresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DanRefresh Dan.
         * @member {number} Dan
         * @memberof pb.DanRefresh
         * @instance
         */
        DanRefresh.prototype.Dan = 0;

        /**
         * Creates a new DanRefresh instance using the specified properties.
         * @function create
         * @memberof pb.DanRefresh
         * @static
         * @param {pb.IDanRefresh=} [properties] Properties to set
         * @returns {pb.DanRefresh} DanRefresh instance
         */
        DanRefresh.create = function create(properties) {
            return new DanRefresh(properties);
        };

        /**
         * Encodes the specified DanRefresh message. Does not implicitly {@link pb.DanRefresh.verify|verify} messages.
         * @function encode
         * @memberof pb.DanRefresh
         * @static
         * @param {pb.IDanRefresh} message DanRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DanRefresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Dan != null && Object.hasOwnProperty.call(message, "Dan"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Dan);
            return writer;
        };

        /**
         * Encodes the specified DanRefresh message, length delimited. Does not implicitly {@link pb.DanRefresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.DanRefresh
         * @static
         * @param {pb.IDanRefresh} message DanRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DanRefresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DanRefresh message from the specified reader or buffer.
         * @function decode
         * @memberof pb.DanRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.DanRefresh} DanRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DanRefresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.DanRefresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Dan = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DanRefresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.DanRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.DanRefresh} DanRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DanRefresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DanRefresh message.
         * @function verify
         * @memberof pb.DanRefresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DanRefresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Dan != null && message.hasOwnProperty("Dan"))
                if (!$util.isInteger(message.Dan))
                    return "Dan: integer expected";
            return null;
        };

        /**
         * Creates a DanRefresh message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.DanRefresh
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.DanRefresh} DanRefresh
         */
        DanRefresh.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.DanRefresh)
                return object;
            var message = new $root.blackjack.DanRefresh();
            if (object.Dan != null)
                message.Dan = object.Dan | 0;
            return message;
        };

        /**
         * Creates a plain object from a DanRefresh message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.DanRefresh
         * @static
         * @param {pb.DanRefresh} message DanRefresh
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DanRefresh.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Dan = 0;
            if (message.Dan != null && message.hasOwnProperty("Dan"))
                object.Dan = message.Dan;
            return object;
        };

        /**
         * Converts this DanRefresh to JSON.
         * @function toJSON
         * @memberof pb.DanRefresh
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DanRefresh.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DanRefresh;
    })();

    pb.Blitz21OpReq = (function() {

        /**
         * Properties of a Blitz21OpReq.
         * @memberof pb
         * @interface IBlitz21OpReq
         * @property {number|null} [RoomID] Blitz21OpReq RoomID
         * @property {pb.IBlitz21CompetitionDataReq|null} [opData] Blitz21OpReq opData
         * @property {pb.IBlitz21Op_C2PReq|null} [op_C2P] Blitz21OpReq op_C2P
         * @property {pb.IBlitz21Op_C2HReq|null} [op_C2H] Blitz21OpReq op_C2H
         * @property {pb.IBlitz21Op_H2CReq|null} [op_H2C] Blitz21OpReq op_H2C
         * @property {pb.IBlitz21Op_UndoReq|null} [op_Undo] Blitz21OpReq op_Undo
         * @property {pb.IBlitz21Op_FinishReq|null} [op_Finish] Blitz21OpReq op_Finish
         * @property {pb.IBlitz21Op_PauseReq|null} [op_Pause] Blitz21OpReq op_Pause
         * @property {pb.IBlitz21Op_RecoverReq|null} [op_Recover] Blitz21OpReq op_Recover
         */

        /**
         * Constructs a new Blitz21OpReq.
         * @memberof pb
         * @classdesc Represents a Blitz21OpReq.
         * @implements IBlitz21OpReq
         * @constructor
         * @param {pb.IBlitz21OpReq=} [properties] Properties to set
         */
        function Blitz21OpReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21OpReq RoomID.
         * @member {number} RoomID
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.RoomID = 0;

        /**
         * Blitz21OpReq opData.
         * @member {pb.IBlitz21CompetitionDataReq|null|undefined} opData
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.opData = null;

        /**
         * Blitz21OpReq op_C2P.
         * @member {pb.IBlitz21Op_C2PReq|null|undefined} op_C2P
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_C2P = null;

        /**
         * Blitz21OpReq op_C2H.
         * @member {pb.IBlitz21Op_C2HReq|null|undefined} op_C2H
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_C2H = null;

        /**
         * Blitz21OpReq op_H2C.
         * @member {pb.IBlitz21Op_H2CReq|null|undefined} op_H2C
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_H2C = null;

        /**
         * Blitz21OpReq op_Undo.
         * @member {pb.IBlitz21Op_UndoReq|null|undefined} op_Undo
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_Undo = null;

        /**
         * Blitz21OpReq op_Finish.
         * @member {pb.IBlitz21Op_FinishReq|null|undefined} op_Finish
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_Finish = null;

        /**
         * Blitz21OpReq op_Pause.
         * @member {pb.IBlitz21Op_PauseReq|null|undefined} op_Pause
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_Pause = null;

        /**
         * Blitz21OpReq op_Recover.
         * @member {pb.IBlitz21Op_RecoverReq|null|undefined} op_Recover
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Blitz21OpReq.prototype.op_Recover = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Blitz21OpReq op.
         * @member {"opData"|"op_C2P"|"op_C2H"|"op_H2C"|"op_Undo"|"op_Finish"|"op_Pause"|"op_Recover"|undefined} op
         * @memberof pb.Blitz21OpReq
         * @instance
         */
        Object.defineProperty(Blitz21OpReq.prototype, "op", {
            get: $util.oneOfGetter($oneOfFields = ["opData", "op_C2P", "op_C2H", "op_H2C", "op_Undo", "op_Finish", "op_Pause", "op_Recover"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Blitz21OpReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {pb.IBlitz21OpReq=} [properties] Properties to set
         * @returns {pb.Blitz21OpReq} Blitz21OpReq instance
         */
        Blitz21OpReq.create = function create(properties) {
            return new Blitz21OpReq(properties);
        };

        /**
         * Encodes the specified Blitz21OpReq message. Does not implicitly {@link pb.Blitz21OpReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {pb.IBlitz21OpReq} message Blitz21OpReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21OpReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoomID != null && Object.hasOwnProperty.call(message, "RoomID"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RoomID);
            if (message.opData != null && Object.hasOwnProperty.call(message, "opData"))
                $root.blackjack.Blitz21CompetitionDataReq.encode(message.opData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.op_C2P != null && Object.hasOwnProperty.call(message, "op_C2P"))
                $root.blackjack.Blitz21Op_C2PReq.encode(message.op_C2P, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.op_C2H != null && Object.hasOwnProperty.call(message, "op_C2H"))
                $root.blackjack.Blitz21Op_C2HReq.encode(message.op_C2H, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.op_H2C != null && Object.hasOwnProperty.call(message, "op_H2C"))
                $root.blackjack.Blitz21Op_H2CReq.encode(message.op_H2C, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.op_Undo != null && Object.hasOwnProperty.call(message, "op_Undo"))
                $root.blackjack.Blitz21Op_UndoReq.encode(message.op_Undo, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.op_Finish != null && Object.hasOwnProperty.call(message, "op_Finish"))
                $root.blackjack.Blitz21Op_FinishReq.encode(message.op_Finish, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.op_Pause != null && Object.hasOwnProperty.call(message, "op_Pause"))
                $root.blackjack.Blitz21Op_PauseReq.encode(message.op_Pause, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.op_Recover != null && Object.hasOwnProperty.call(message, "op_Recover"))
                $root.blackjack.Blitz21Op_RecoverReq.encode(message.op_Recover, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Blitz21OpReq message, length delimited. Does not implicitly {@link pb.Blitz21OpReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {pb.IBlitz21OpReq} message Blitz21OpReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21OpReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21OpReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21OpReq} Blitz21OpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21OpReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21OpReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoomID = reader.uint32();
                    break;
                case 2:
                    message.opData = $root.blackjack.Blitz21CompetitionDataReq.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.op_C2P = $root.blackjack.Blitz21Op_C2PReq.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.op_C2H = $root.blackjack.Blitz21Op_C2HReq.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.op_H2C = $root.blackjack.Blitz21Op_H2CReq.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.op_Undo = $root.blackjack.Blitz21Op_UndoReq.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.op_Finish = $root.blackjack.Blitz21Op_FinishReq.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.op_Pause = $root.blackjack.Blitz21Op_PauseReq.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.op_Recover = $root.blackjack.Blitz21Op_RecoverReq.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21OpReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21OpReq} Blitz21OpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21OpReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21OpReq message.
         * @function verify
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21OpReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.RoomID != null && message.hasOwnProperty("RoomID"))
                if (!$util.isInteger(message.RoomID))
                    return "RoomID: integer expected";
            if (message.opData != null && message.hasOwnProperty("opData")) {
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21CompetitionDataReq.verify(message.opData);
                    if (error)
                        return "opData." + error;
                }
            }
            if (message.op_C2P != null && message.hasOwnProperty("op_C2P")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_C2PReq.verify(message.op_C2P);
                    if (error)
                        return "op_C2P." + error;
                }
            }
            if (message.op_C2H != null && message.hasOwnProperty("op_C2H")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_C2HReq.verify(message.op_C2H);
                    if (error)
                        return "op_C2H." + error;
                }
            }
            if (message.op_H2C != null && message.hasOwnProperty("op_H2C")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_H2CReq.verify(message.op_H2C);
                    if (error)
                        return "op_H2C." + error;
                }
            }
            if (message.op_Undo != null && message.hasOwnProperty("op_Undo")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_UndoReq.verify(message.op_Undo);
                    if (error)
                        return "op_Undo." + error;
                }
            }
            if (message.op_Finish != null && message.hasOwnProperty("op_Finish")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_FinishReq.verify(message.op_Finish);
                    if (error)
                        return "op_Finish." + error;
                }
            }
            if (message.op_Pause != null && message.hasOwnProperty("op_Pause")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_PauseReq.verify(message.op_Pause);
                    if (error)
                        return "op_Pause." + error;
                }
            }
            if (message.op_Recover != null && message.hasOwnProperty("op_Recover")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.blackjack.Blitz21Op_RecoverReq.verify(message.op_Recover);
                    if (error)
                        return "op_Recover." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Blitz21OpReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21OpReq} Blitz21OpReq
         */
        Blitz21OpReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21OpReq)
                return object;
            var message = new $root.blackjack.Blitz21OpReq();
            if (object.RoomID != null)
                message.RoomID = object.RoomID >>> 0;
            if (object.opData != null) {
                if (typeof object.opData !== "object")
                    throw TypeError(".pb.Blitz21OpReq.opData: object expected");
                message.opData = $root.blackjack.Blitz21CompetitionDataReq.fromObject(object.opData);
            }
            if (object.op_C2P != null) {
                if (typeof object.op_C2P !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_C2P: object expected");
                message.op_C2P = $root.blackjack.Blitz21Op_C2PReq.fromObject(object.op_C2P);
            }
            if (object.op_C2H != null) {
                if (typeof object.op_C2H !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_C2H: object expected");
                message.op_C2H = $root.blackjack.Blitz21Op_C2HReq.fromObject(object.op_C2H);
            }
            if (object.op_H2C != null) {
                if (typeof object.op_H2C !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_H2C: object expected");
                message.op_H2C = $root.blackjack.Blitz21Op_H2CReq.fromObject(object.op_H2C);
            }
            if (object.op_Undo != null) {
                if (typeof object.op_Undo !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_Undo: object expected");
                message.op_Undo = $root.blackjack.Blitz21Op_UndoReq.fromObject(object.op_Undo);
            }
            if (object.op_Finish != null) {
                if (typeof object.op_Finish !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_Finish: object expected");
                message.op_Finish = $root.blackjack.Blitz21Op_FinishReq.fromObject(object.op_Finish);
            }
            if (object.op_Pause != null) {
                if (typeof object.op_Pause !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_Pause: object expected");
                message.op_Pause = $root.blackjack.Blitz21Op_PauseReq.fromObject(object.op_Pause);
            }
            if (object.op_Recover != null) {
                if (typeof object.op_Recover !== "object")
                    throw TypeError(".pb.Blitz21OpReq.op_Recover: object expected");
                message.op_Recover = $root.blackjack.Blitz21Op_RecoverReq.fromObject(object.op_Recover);
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21OpReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21OpReq
         * @static
         * @param {pb.Blitz21OpReq} message Blitz21OpReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21OpReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.RoomID = 0;
            if (message.RoomID != null && message.hasOwnProperty("RoomID"))
                object.RoomID = message.RoomID;
            if (message.opData != null && message.hasOwnProperty("opData")) {
                object.opData = $root.blackjack.Blitz21CompetitionDataReq.toObject(message.opData, options);
                if (options.oneofs)
                    object.op = "opData";
            }
            if (message.op_C2P != null && message.hasOwnProperty("op_C2P")) {
                object.op_C2P = $root.blackjack.Blitz21Op_C2PReq.toObject(message.op_C2P, options);
                if (options.oneofs)
                    object.op = "op_C2P";
            }
            if (message.op_C2H != null && message.hasOwnProperty("op_C2H")) {
                object.op_C2H = $root.blackjack.Blitz21Op_C2HReq.toObject(message.op_C2H, options);
                if (options.oneofs)
                    object.op = "op_C2H";
            }
            if (message.op_H2C != null && message.hasOwnProperty("op_H2C")) {
                object.op_H2C = $root.blackjack.Blitz21Op_H2CReq.toObject(message.op_H2C, options);
                if (options.oneofs)
                    object.op = "op_H2C";
            }
            if (message.op_Undo != null && message.hasOwnProperty("op_Undo")) {
                object.op_Undo = $root.blackjack.Blitz21Op_UndoReq.toObject(message.op_Undo, options);
                if (options.oneofs)
                    object.op = "op_Undo";
            }
            if (message.op_Finish != null && message.hasOwnProperty("op_Finish")) {
                object.op_Finish = $root.blackjack.Blitz21Op_FinishReq.toObject(message.op_Finish, options);
                if (options.oneofs)
                    object.op = "op_Finish";
            }
            if (message.op_Pause != null && message.hasOwnProperty("op_Pause")) {
                object.op_Pause = $root.blackjack.Blitz21Op_PauseReq.toObject(message.op_Pause, options);
                if (options.oneofs)
                    object.op = "op_Pause";
            }
            if (message.op_Recover != null && message.hasOwnProperty("op_Recover")) {
                object.op_Recover = $root.blackjack.Blitz21Op_RecoverReq.toObject(message.op_Recover, options);
                if (options.oneofs)
                    object.op = "op_Recover";
            }
            return object;
        };

        /**
         * Converts this Blitz21OpReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21OpReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21OpReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21OpReq;
    })();

    pb.Blitz21OnePile = (function() {

        /**
         * Properties of a Blitz21OnePile.
         * @memberof pb
         * @interface IBlitz21OnePile
         * @property {Array.<number>|null} [Cards] Blitz21OnePile Cards
         */

        /**
         * Constructs a new Blitz21OnePile.
         * @memberof pb
         * @classdesc Represents a Blitz21OnePile.
         * @implements IBlitz21OnePile
         * @constructor
         * @param {pb.IBlitz21OnePile=} [properties] Properties to set
         */
        function Blitz21OnePile(properties) {
            this.Cards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21OnePile Cards.
         * @member {Array.<number>} Cards
         * @memberof pb.Blitz21OnePile
         * @instance
         */
        Blitz21OnePile.prototype.Cards = $util.emptyArray;

        /**
         * Creates a new Blitz21OnePile instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {pb.IBlitz21OnePile=} [properties] Properties to set
         * @returns {pb.Blitz21OnePile} Blitz21OnePile instance
         */
        Blitz21OnePile.create = function create(properties) {
            return new Blitz21OnePile(properties);
        };

        /**
         * Encodes the specified Blitz21OnePile message. Does not implicitly {@link pb.Blitz21OnePile.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {pb.IBlitz21OnePile} message Blitz21OnePile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21OnePile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Cards != null && message.Cards.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.Cards.length; ++i)
                    writer.int32(message.Cards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Blitz21OnePile message, length delimited. Does not implicitly {@link pb.Blitz21OnePile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {pb.IBlitz21OnePile} message Blitz21OnePile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21OnePile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21OnePile message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21OnePile} Blitz21OnePile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21OnePile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21OnePile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.Cards && message.Cards.length))
                        message.Cards = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.Cards.push(reader.int32());
                    } else
                        message.Cards.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21OnePile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21OnePile} Blitz21OnePile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21OnePile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21OnePile message.
         * @function verify
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21OnePile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Cards != null && message.hasOwnProperty("Cards")) {
                if (!Array.isArray(message.Cards))
                    return "Cards: array expected";
                for (var i = 0; i < message.Cards.length; ++i)
                    if (!$util.isInteger(message.Cards[i]))
                        return "Cards: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Blitz21OnePile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21OnePile} Blitz21OnePile
         */
        Blitz21OnePile.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21OnePile)
                return object;
            var message = new $root.blackjack.Blitz21OnePile();
            if (object.Cards) {
                if (!Array.isArray(object.Cards))
                    throw TypeError(".pb.Blitz21OnePile.Cards: array expected");
                message.Cards = [];
                for (var i = 0; i < object.Cards.length; ++i)
                    message.Cards[i] = object.Cards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21OnePile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21OnePile
         * @static
         * @param {pb.Blitz21OnePile} message Blitz21OnePile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21OnePile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Cards = [];
            if (message.Cards && message.Cards.length) {
                object.Cards = [];
                for (var j = 0; j < message.Cards.length; ++j)
                    object.Cards[j] = message.Cards[j];
            }
            return object;
        };

        /**
         * Converts this Blitz21OnePile to JSON.
         * @function toJSON
         * @memberof pb.Blitz21OnePile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21OnePile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21OnePile;
    })();

    pb.Blitz21Carddesk = (function() {

        /**
         * Properties of a Blitz21Carddesk.
         * @memberof pb
         * @interface IBlitz21Carddesk
         * @property {number|null} [CardsLen] Blitz21Carddesk CardsLen
         * @property {number|null} [CurrentCard] Blitz21Carddesk CurrentCard
         * @property {number|null} [HoldCard] Blitz21Carddesk HoldCard
         * @property {Array.<pb.IBlitz21OnePile>|null} [PileCards] Blitz21Carddesk PileCards
         * @property {number|null} [Bombs] Blitz21Carddesk Bombs
         * @property {number|null} [HoldCounts] Blitz21Carddesk HoldCounts
         * @property {number|null} [CurrentScore] Blitz21Carddesk CurrentScore
         * @property {Array.<number>|null} [Cards] Blitz21Carddesk Cards
         */

        /**
         * Constructs a new Blitz21Carddesk.
         * @memberof pb
         * @classdesc Represents a Blitz21Carddesk.
         * @implements IBlitz21Carddesk
         * @constructor
         * @param {pb.IBlitz21Carddesk=} [properties] Properties to set
         */
        function Blitz21Carddesk(properties) {
            this.PileCards = [];
            this.Cards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Carddesk CardsLen.
         * @member {number} CardsLen
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.CardsLen = 0;

        /**
         * Blitz21Carddesk CurrentCard.
         * @member {number} CurrentCard
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.CurrentCard = 0;

        /**
         * Blitz21Carddesk HoldCard.
         * @member {number} HoldCard
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.HoldCard = 0;

        /**
         * Blitz21Carddesk PileCards.
         * @member {Array.<pb.IBlitz21OnePile>} PileCards
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.PileCards = $util.emptyArray;

        /**
         * Blitz21Carddesk Bombs.
         * @member {number} Bombs
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.Bombs = 0;

        /**
         * Blitz21Carddesk HoldCounts.
         * @member {number} HoldCounts
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.HoldCounts = 0;

        /**
         * Blitz21Carddesk CurrentScore.
         * @member {number} CurrentScore
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.CurrentScore = 0;

        /**
         * Blitz21Carddesk Cards.
         * @member {Array.<number>} Cards
         * @memberof pb.Blitz21Carddesk
         * @instance
         */
        Blitz21Carddesk.prototype.Cards = $util.emptyArray;

        /**
         * Creates a new Blitz21Carddesk instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {pb.IBlitz21Carddesk=} [properties] Properties to set
         * @returns {pb.Blitz21Carddesk} Blitz21Carddesk instance
         */
        Blitz21Carddesk.create = function create(properties) {
            return new Blitz21Carddesk(properties);
        };

        /**
         * Encodes the specified Blitz21Carddesk message. Does not implicitly {@link pb.Blitz21Carddesk.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {pb.IBlitz21Carddesk} message Blitz21Carddesk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Carddesk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.CardsLen != null && Object.hasOwnProperty.call(message, "CardsLen"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.CardsLen);
            if (message.CurrentCard != null && Object.hasOwnProperty.call(message, "CurrentCard"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.CurrentCard);
            if (message.HoldCard != null && Object.hasOwnProperty.call(message, "HoldCard"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.HoldCard);
            if (message.PileCards != null && message.PileCards.length)
                for (var i = 0; i < message.PileCards.length; ++i)
                    $root.blackjack.Blitz21OnePile.encode(message.PileCards[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.Bombs != null && Object.hasOwnProperty.call(message, "Bombs"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Bombs);
            if (message.HoldCounts != null && Object.hasOwnProperty.call(message, "HoldCounts"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.HoldCounts);
            if (message.CurrentScore != null && Object.hasOwnProperty.call(message, "CurrentScore"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.CurrentScore);
            if (message.Cards != null && message.Cards.length) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork();
                for (var i = 0; i < message.Cards.length; ++i)
                    writer.int32(message.Cards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Blitz21Carddesk message, length delimited. Does not implicitly {@link pb.Blitz21Carddesk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {pb.IBlitz21Carddesk} message Blitz21Carddesk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Carddesk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Carddesk message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Carddesk} Blitz21Carddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Carddesk.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Carddesk();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.CardsLen = reader.int32();
                    break;
                case 2:
                    message.CurrentCard = reader.int32();
                    break;
                case 3:
                    message.HoldCard = reader.int32();
                    break;
                case 4:
                    if (!(message.PileCards && message.PileCards.length))
                        message.PileCards = [];
                    message.PileCards.push($root.blackjack.Blitz21OnePile.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.Bombs = reader.int32();
                    break;
                case 6:
                    message.HoldCounts = reader.int32();
                    break;
                case 7:
                    message.CurrentScore = reader.int32();
                    break;
                case 8:
                    if (!(message.Cards && message.Cards.length))
                        message.Cards = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.Cards.push(reader.int32());
                    } else
                        message.Cards.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Carddesk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Carddesk} Blitz21Carddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Carddesk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Carddesk message.
         * @function verify
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Carddesk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.CardsLen != null && message.hasOwnProperty("CardsLen"))
                if (!$util.isInteger(message.CardsLen))
                    return "CardsLen: integer expected";
            if (message.CurrentCard != null && message.hasOwnProperty("CurrentCard"))
                if (!$util.isInteger(message.CurrentCard))
                    return "CurrentCard: integer expected";
            if (message.HoldCard != null && message.hasOwnProperty("HoldCard"))
                if (!$util.isInteger(message.HoldCard))
                    return "HoldCard: integer expected";
            if (message.PileCards != null && message.hasOwnProperty("PileCards")) {
                if (!Array.isArray(message.PileCards))
                    return "PileCards: array expected";
                for (var i = 0; i < message.PileCards.length; ++i) {
                    var error = $root.blackjack.Blitz21OnePile.verify(message.PileCards[i]);
                    if (error)
                        return "PileCards." + error;
                }
            }
            if (message.Bombs != null && message.hasOwnProperty("Bombs"))
                if (!$util.isInteger(message.Bombs))
                    return "Bombs: integer expected";
            if (message.HoldCounts != null && message.hasOwnProperty("HoldCounts"))
                if (!$util.isInteger(message.HoldCounts))
                    return "HoldCounts: integer expected";
            if (message.CurrentScore != null && message.hasOwnProperty("CurrentScore"))
                if (!$util.isInteger(message.CurrentScore))
                    return "CurrentScore: integer expected";
            if (message.Cards != null && message.hasOwnProperty("Cards")) {
                if (!Array.isArray(message.Cards))
                    return "Cards: array expected";
                for (var i = 0; i < message.Cards.length; ++i)
                    if (!$util.isInteger(message.Cards[i]))
                        return "Cards: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Blitz21Carddesk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Carddesk} Blitz21Carddesk
         */
        Blitz21Carddesk.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Carddesk)
                return object;
            var message = new $root.blackjack.Blitz21Carddesk();
            if (object.CardsLen != null)
                message.CardsLen = object.CardsLen | 0;
            if (object.CurrentCard != null)
                message.CurrentCard = object.CurrentCard | 0;
            if (object.HoldCard != null)
                message.HoldCard = object.HoldCard | 0;
            if (object.PileCards) {
                if (!Array.isArray(object.PileCards))
                    throw TypeError(".pb.Blitz21Carddesk.PileCards: array expected");
                message.PileCards = [];
                for (var i = 0; i < object.PileCards.length; ++i) {
                    if (typeof object.PileCards[i] !== "object")
                        throw TypeError(".pb.Blitz21Carddesk.PileCards: object expected");
                    message.PileCards[i] = $root.blackjack.Blitz21OnePile.fromObject(object.PileCards[i]);
                }
            }
            if (object.Bombs != null)
                message.Bombs = object.Bombs | 0;
            if (object.HoldCounts != null)
                message.HoldCounts = object.HoldCounts | 0;
            if (object.CurrentScore != null)
                message.CurrentScore = object.CurrentScore | 0;
            if (object.Cards) {
                if (!Array.isArray(object.Cards))
                    throw TypeError(".pb.Blitz21Carddesk.Cards: array expected");
                message.Cards = [];
                for (var i = 0; i < object.Cards.length; ++i)
                    message.Cards[i] = object.Cards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Carddesk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Carddesk
         * @static
         * @param {pb.Blitz21Carddesk} message Blitz21Carddesk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Carddesk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.PileCards = [];
                object.Cards = [];
            }
            if (options.defaults) {
                object.CardsLen = 0;
                object.CurrentCard = 0;
                object.HoldCard = 0;
                object.Bombs = 0;
                object.HoldCounts = 0;
                object.CurrentScore = 0;
            }
            if (message.CardsLen != null && message.hasOwnProperty("CardsLen"))
                object.CardsLen = message.CardsLen;
            if (message.CurrentCard != null && message.hasOwnProperty("CurrentCard"))
                object.CurrentCard = message.CurrentCard;
            if (message.HoldCard != null && message.hasOwnProperty("HoldCard"))
                object.HoldCard = message.HoldCard;
            if (message.PileCards && message.PileCards.length) {
                object.PileCards = [];
                for (var j = 0; j < message.PileCards.length; ++j)
                    object.PileCards[j] = $root.blackjack.Blitz21OnePile.toObject(message.PileCards[j], options);
            }
            if (message.Bombs != null && message.hasOwnProperty("Bombs"))
                object.Bombs = message.Bombs;
            if (message.HoldCounts != null && message.hasOwnProperty("HoldCounts"))
                object.HoldCounts = message.HoldCounts;
            if (message.CurrentScore != null && message.hasOwnProperty("CurrentScore"))
                object.CurrentScore = message.CurrentScore;
            if (message.Cards && message.Cards.length) {
                object.Cards = [];
                for (var j = 0; j < message.Cards.length; ++j)
                    object.Cards[j] = message.Cards[j];
            }
            return object;
        };

        /**
         * Converts this Blitz21Carddesk to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Carddesk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Carddesk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Carddesk;
    })();

    pb.Blitz21CompetitionDataReq = (function() {

        /**
         * Properties of a Blitz21CompetitionDataReq.
         * @memberof pb
         * @interface IBlitz21CompetitionDataReq
         */

        /**
         * Constructs a new Blitz21CompetitionDataReq.
         * @memberof pb
         * @classdesc Represents a Blitz21CompetitionDataReq.
         * @implements IBlitz21CompetitionDataReq
         * @constructor
         * @param {pb.IBlitz21CompetitionDataReq=} [properties] Properties to set
         */
        function Blitz21CompetitionDataReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21CompetitionDataReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {pb.IBlitz21CompetitionDataReq=} [properties] Properties to set
         * @returns {pb.Blitz21CompetitionDataReq} Blitz21CompetitionDataReq instance
         */
        Blitz21CompetitionDataReq.create = function create(properties) {
            return new Blitz21CompetitionDataReq(properties);
        };

        /**
         * Encodes the specified Blitz21CompetitionDataReq message. Does not implicitly {@link pb.Blitz21CompetitionDataReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {pb.IBlitz21CompetitionDataReq} message Blitz21CompetitionDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21CompetitionDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21CompetitionDataReq message, length delimited. Does not implicitly {@link pb.Blitz21CompetitionDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {pb.IBlitz21CompetitionDataReq} message Blitz21CompetitionDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21CompetitionDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21CompetitionDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21CompetitionDataReq} Blitz21CompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21CompetitionDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21CompetitionDataReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21CompetitionDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21CompetitionDataReq} Blitz21CompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21CompetitionDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21CompetitionDataReq message.
         * @function verify
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21CompetitionDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21CompetitionDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21CompetitionDataReq} Blitz21CompetitionDataReq
         */
        Blitz21CompetitionDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21CompetitionDataReq)
                return object;
            return new $root.blackjack.Blitz21CompetitionDataReq();
        };

        /**
         * Creates a plain object from a Blitz21CompetitionDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21CompetitionDataReq
         * @static
         * @param {pb.Blitz21CompetitionDataReq} message Blitz21CompetitionDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21CompetitionDataReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21CompetitionDataReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21CompetitionDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21CompetitionDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21CompetitionDataReq;
    })();

    pb.Blitz21CompetitionDataResp = (function() {

        /**
         * Properties of a Blitz21CompetitionDataResp.
         * @memberof pb
         * @interface IBlitz21CompetitionDataResp
         * @property {pb.ErrNo|null} [Err] Blitz21CompetitionDataResp Err
         * @property {pb.IBlitz21Carddesk|null} [CardDesk] Blitz21CompetitionDataResp CardDesk
         * @property {pb.GameStatus|null} [Status] Blitz21CompetitionDataResp Status
         * @property {number|null} [LeftTime] Blitz21CompetitionDataResp LeftTime
         * @property {boolean|null} [CanUndo] Blitz21CompetitionDataResp CanUndo
         */

        /**
         * Constructs a new Blitz21CompetitionDataResp.
         * @memberof pb
         * @classdesc Represents a Blitz21CompetitionDataResp.
         * @implements IBlitz21CompetitionDataResp
         * @constructor
         * @param {pb.IBlitz21CompetitionDataResp=} [properties] Properties to set
         */
        function Blitz21CompetitionDataResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21CompetitionDataResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21CompetitionDataResp
         * @instance
         */
        Blitz21CompetitionDataResp.prototype.Err = 0;

        /**
         * Blitz21CompetitionDataResp CardDesk.
         * @member {pb.IBlitz21Carddesk|null|undefined} CardDesk
         * @memberof pb.Blitz21CompetitionDataResp
         * @instance
         */
        Blitz21CompetitionDataResp.prototype.CardDesk = null;

        /**
         * Blitz21CompetitionDataResp Status.
         * @member {pb.GameStatus} Status
         * @memberof pb.Blitz21CompetitionDataResp
         * @instance
         */
        Blitz21CompetitionDataResp.prototype.Status = 0;

        /**
         * Blitz21CompetitionDataResp LeftTime.
         * @member {number} LeftTime
         * @memberof pb.Blitz21CompetitionDataResp
         * @instance
         */
        Blitz21CompetitionDataResp.prototype.LeftTime = 0;

        /**
         * Blitz21CompetitionDataResp CanUndo.
         * @member {boolean} CanUndo
         * @memberof pb.Blitz21CompetitionDataResp
         * @instance
         */
        Blitz21CompetitionDataResp.prototype.CanUndo = false;

        /**
         * Creates a new Blitz21CompetitionDataResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {pb.IBlitz21CompetitionDataResp=} [properties] Properties to set
         * @returns {pb.Blitz21CompetitionDataResp} Blitz21CompetitionDataResp instance
         */
        Blitz21CompetitionDataResp.create = function create(properties) {
            return new Blitz21CompetitionDataResp(properties);
        };

        /**
         * Encodes the specified Blitz21CompetitionDataResp message. Does not implicitly {@link pb.Blitz21CompetitionDataResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {pb.IBlitz21CompetitionDataResp} message Blitz21CompetitionDataResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21CompetitionDataResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.CardDesk != null && Object.hasOwnProperty.call(message, "CardDesk"))
                $root.blackjack.Blitz21Carddesk.encode(message.CardDesk, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.Status != null && Object.hasOwnProperty.call(message, "Status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Status);
            if (message.LeftTime != null && Object.hasOwnProperty.call(message, "LeftTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LeftTime);
            if (message.CanUndo != null && Object.hasOwnProperty.call(message, "CanUndo"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.CanUndo);
            return writer;
        };

        /**
         * Encodes the specified Blitz21CompetitionDataResp message, length delimited. Does not implicitly {@link pb.Blitz21CompetitionDataResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {pb.IBlitz21CompetitionDataResp} message Blitz21CompetitionDataResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21CompetitionDataResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21CompetitionDataResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21CompetitionDataResp} Blitz21CompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21CompetitionDataResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21CompetitionDataResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.CardDesk = $root.blackjack.Blitz21Carddesk.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.Status = reader.int32();
                    break;
                case 4:
                    message.LeftTime = reader.int32();
                    break;
                case 5:
                    message.CanUndo = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21CompetitionDataResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21CompetitionDataResp} Blitz21CompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21CompetitionDataResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21CompetitionDataResp message.
         * @function verify
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21CompetitionDataResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.CardDesk != null && message.hasOwnProperty("CardDesk")) {
                var error = $root.blackjack.Blitz21Carddesk.verify(message.CardDesk);
                if (error)
                    return "CardDesk." + error;
            }
            if (message.Status != null && message.hasOwnProperty("Status"))
                switch (message.Status) {
                default:
                    return "Status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                if (!$util.isInteger(message.LeftTime))
                    return "LeftTime: integer expected";
            if (message.CanUndo != null && message.hasOwnProperty("CanUndo"))
                if (typeof message.CanUndo !== "boolean")
                    return "CanUndo: boolean expected";
            return null;
        };

        /**
         * Creates a Blitz21CompetitionDataResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21CompetitionDataResp} Blitz21CompetitionDataResp
         */
        Blitz21CompetitionDataResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21CompetitionDataResp)
                return object;
            var message = new $root.blackjack.Blitz21CompetitionDataResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            if (object.CardDesk != null) {
                if (typeof object.CardDesk !== "object")
                    throw TypeError(".pb.Blitz21CompetitionDataResp.CardDesk: object expected");
                message.CardDesk = $root.blackjack.Blitz21Carddesk.fromObject(object.CardDesk);
            }
            switch (object.Status) {
            case "Status_Gaming":
            case 0:
                message.Status = 0;
                break;
            case "Status_Pause":
            case 1:
                message.Status = 1;
                break;
            case "Status_Over":
            case 2:
                message.Status = 2;
                break;
            }
            if (object.LeftTime != null)
                message.LeftTime = object.LeftTime | 0;
            if (object.CanUndo != null)
                message.CanUndo = Boolean(object.CanUndo);
            return message;
        };

        /**
         * Creates a plain object from a Blitz21CompetitionDataResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21CompetitionDataResp
         * @static
         * @param {pb.Blitz21CompetitionDataResp} message Blitz21CompetitionDataResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21CompetitionDataResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.CardDesk = null;
                object.Status = options.enums === String ? "Status_Gaming" : 0;
                object.LeftTime = 0;
                object.CanUndo = false;
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.CardDesk != null && message.hasOwnProperty("CardDesk"))
                object.CardDesk = $root.blackjack.Blitz21Carddesk.toObject(message.CardDesk, options);
            if (message.Status != null && message.hasOwnProperty("Status"))
                object.Status = options.enums === String ? $root.blackjack.GameStatus[message.Status] : message.Status;
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                object.LeftTime = message.LeftTime;
            if (message.CanUndo != null && message.hasOwnProperty("CanUndo"))
                object.CanUndo = message.CanUndo;
            return object;
        };

        /**
         * Converts this Blitz21CompetitionDataResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21CompetitionDataResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21CompetitionDataResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21CompetitionDataResp;
    })();

    pb.Blitz21Op_C2PReq = (function() {

        /**
         * Properties of a Blitz21Op_C2PReq.
         * @memberof pb
         * @interface IBlitz21Op_C2PReq
         * @property {number|null} [Index] Blitz21Op_C2PReq Index
         */

        /**
         * Constructs a new Blitz21Op_C2PReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_C2PReq.
         * @implements IBlitz21Op_C2PReq
         * @constructor
         * @param {pb.IBlitz21Op_C2PReq=} [properties] Properties to set
         */
        function Blitz21Op_C2PReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_C2PReq Index.
         * @member {number} Index
         * @memberof pb.Blitz21Op_C2PReq
         * @instance
         */
        Blitz21Op_C2PReq.prototype.Index = 0;

        /**
         * Creates a new Blitz21Op_C2PReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {pb.IBlitz21Op_C2PReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_C2PReq} Blitz21Op_C2PReq instance
         */
        Blitz21Op_C2PReq.create = function create(properties) {
            return new Blitz21Op_C2PReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_C2PReq message. Does not implicitly {@link pb.Blitz21Op_C2PReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {pb.IBlitz21Op_C2PReq} message Blitz21Op_C2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2PReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Index);
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_C2PReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2PReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {pb.IBlitz21Op_C2PReq} message Blitz21Op_C2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2PReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_C2PReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_C2PReq} Blitz21Op_C2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2PReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_C2PReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Index = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_C2PReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_C2PReq} Blitz21Op_C2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2PReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_C2PReq message.
         * @function verify
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_C2PReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_C2PReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_C2PReq} Blitz21Op_C2PReq
         */
        Blitz21Op_C2PReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_C2PReq)
                return object;
            var message = new $root.blackjack.Blitz21Op_C2PReq();
            if (object.Index != null)
                message.Index = object.Index | 0;
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_C2PReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_C2PReq
         * @static
         * @param {pb.Blitz21Op_C2PReq} message Blitz21Op_C2PReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_C2PReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Index = 0;
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            return object;
        };

        /**
         * Converts this Blitz21Op_C2PReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_C2PReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_C2PReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_C2PReq;
    })();

    /**
     * ClearType enum.
     * @name pb.ClearType
     * @enum {number}
     * @property {number} Bomb=0 Bomb value
     * @property {number} UnClear=1 UnClear value
     * @property {number} FinishPoint=2 FinishPoint value
     * @property {number} FiveDragon=3 FiveDragon value
     * @property {number} BlackJack=4 BlackJack value
     */
    pb.ClearType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Bomb"] = 0;
        values[valuesById[1] = "UnClear"] = 1;
        values[valuesById[2] = "FinishPoint"] = 2;
        values[valuesById[3] = "FiveDragon"] = 3;
        values[valuesById[4] = "BlackJack"] = 4;
        return values;
    })();

    /**
     * FinishBonusType enum.
     * @name pb.FinishBonusType
     * @enum {number}
     * @property {number} NoBomb=0 NoBomb value
     * @property {number} AllClear=1 AllClear value
     */
    pb.FinishBonusType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoBomb"] = 0;
        values[valuesById[1] = "AllClear"] = 1;
        return values;
    })();

    pb.Blitz21Op_C2PResp = (function() {

        /**
         * Properties of a Blitz21Op_C2PResp.
         * @memberof pb
         * @interface IBlitz21Op_C2PResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_C2PResp Err
         * @property {number|null} [CurrentScore] Blitz21Op_C2PResp CurrentScore
         * @property {number|null} [NextCard] Blitz21Op_C2PResp NextCard
         * @property {Array.<number>|null} [ClearType] Blitz21Op_C2PResp ClearType
         * @property {number|null} [ClearScore] Blitz21Op_C2PResp ClearScore
         * @property {number|null} [HitCounts] Blitz21Op_C2PResp HitCounts
         * @property {number|null} [HitScore] Blitz21Op_C2PResp HitScore
         * @property {Array.<number>|null} [ClearTypeScore] Blitz21Op_C2PResp ClearTypeScore
         */

        /**
         * Constructs a new Blitz21Op_C2PResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_C2PResp.
         * @implements IBlitz21Op_C2PResp
         * @constructor
         * @param {pb.IBlitz21Op_C2PResp=} [properties] Properties to set
         */
        function Blitz21Op_C2PResp(properties) {
            this.ClearType = [];
            this.ClearTypeScore = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_C2PResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.Err = 0;

        /**
         * Blitz21Op_C2PResp CurrentScore.
         * @member {number} CurrentScore
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.CurrentScore = 0;

        /**
         * Blitz21Op_C2PResp NextCard.
         * @member {number} NextCard
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.NextCard = 0;

        /**
         * Blitz21Op_C2PResp ClearType.
         * @member {Array.<number>} ClearType
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.ClearType = $util.emptyArray;

        /**
         * Blitz21Op_C2PResp ClearScore.
         * @member {number} ClearScore
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.ClearScore = 0;

        /**
         * Blitz21Op_C2PResp HitCounts.
         * @member {number} HitCounts
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.HitCounts = 0;

        /**
         * Blitz21Op_C2PResp HitScore.
         * @member {number} HitScore
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.HitScore = 0;

        /**
         * Blitz21Op_C2PResp ClearTypeScore.
         * @member {Array.<number>} ClearTypeScore
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         */
        Blitz21Op_C2PResp.prototype.ClearTypeScore = $util.emptyArray;

        /**
         * Creates a new Blitz21Op_C2PResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {pb.IBlitz21Op_C2PResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_C2PResp} Blitz21Op_C2PResp instance
         */
        Blitz21Op_C2PResp.create = function create(properties) {
            return new Blitz21Op_C2PResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_C2PResp message. Does not implicitly {@link pb.Blitz21Op_C2PResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {pb.IBlitz21Op_C2PResp} message Blitz21Op_C2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2PResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.CurrentScore != null && Object.hasOwnProperty.call(message, "CurrentScore"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.CurrentScore);
            if (message.NextCard != null && Object.hasOwnProperty.call(message, "NextCard"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.NextCard);
            if (message.ClearType != null && message.ClearType.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.ClearType.length; ++i)
                    writer.int32(message.ClearType[i]);
                writer.ldelim();
            }
            if (message.ClearScore != null && Object.hasOwnProperty.call(message, "ClearScore"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.ClearScore);
            if (message.HitCounts != null && Object.hasOwnProperty.call(message, "HitCounts"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.HitCounts);
            if (message.HitScore != null && Object.hasOwnProperty.call(message, "HitScore"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.HitScore);
            if (message.ClearTypeScore != null && message.ClearTypeScore.length) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork();
                for (var i = 0; i < message.ClearTypeScore.length; ++i)
                    writer.int32(message.ClearTypeScore[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_C2PResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2PResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {pb.IBlitz21Op_C2PResp} message Blitz21Op_C2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2PResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_C2PResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_C2PResp} Blitz21Op_C2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2PResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_C2PResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.CurrentScore = reader.int32();
                    break;
                case 3:
                    message.NextCard = reader.int32();
                    break;
                case 4:
                    if (!(message.ClearType && message.ClearType.length))
                        message.ClearType = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ClearType.push(reader.int32());
                    } else
                        message.ClearType.push(reader.int32());
                    break;
                case 5:
                    message.ClearScore = reader.int32();
                    break;
                case 6:
                    message.HitCounts = reader.int32();
                    break;
                case 7:
                    message.HitScore = reader.int32();
                    break;
                case 8:
                    if (!(message.ClearTypeScore && message.ClearTypeScore.length))
                        message.ClearTypeScore = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ClearTypeScore.push(reader.int32());
                    } else
                        message.ClearTypeScore.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_C2PResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_C2PResp} Blitz21Op_C2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2PResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_C2PResp message.
         * @function verify
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_C2PResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.CurrentScore != null && message.hasOwnProperty("CurrentScore"))
                if (!$util.isInteger(message.CurrentScore))
                    return "CurrentScore: integer expected";
            if (message.NextCard != null && message.hasOwnProperty("NextCard"))
                if (!$util.isInteger(message.NextCard))
                    return "NextCard: integer expected";
            if (message.ClearType != null && message.hasOwnProperty("ClearType")) {
                if (!Array.isArray(message.ClearType))
                    return "ClearType: array expected";
                for (var i = 0; i < message.ClearType.length; ++i)
                    if (!$util.isInteger(message.ClearType[i]))
                        return "ClearType: integer[] expected";
            }
            if (message.ClearScore != null && message.hasOwnProperty("ClearScore"))
                if (!$util.isInteger(message.ClearScore))
                    return "ClearScore: integer expected";
            if (message.HitCounts != null && message.hasOwnProperty("HitCounts"))
                if (!$util.isInteger(message.HitCounts))
                    return "HitCounts: integer expected";
            if (message.HitScore != null && message.hasOwnProperty("HitScore"))
                if (!$util.isInteger(message.HitScore))
                    return "HitScore: integer expected";
            if (message.ClearTypeScore != null && message.hasOwnProperty("ClearTypeScore")) {
                if (!Array.isArray(message.ClearTypeScore))
                    return "ClearTypeScore: array expected";
                for (var i = 0; i < message.ClearTypeScore.length; ++i)
                    if (!$util.isInteger(message.ClearTypeScore[i]))
                        return "ClearTypeScore: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Blitz21Op_C2PResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_C2PResp} Blitz21Op_C2PResp
         */
        Blitz21Op_C2PResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_C2PResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_C2PResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            if (object.CurrentScore != null)
                message.CurrentScore = object.CurrentScore | 0;
            if (object.NextCard != null)
                message.NextCard = object.NextCard | 0;
            if (object.ClearType) {
                if (!Array.isArray(object.ClearType))
                    throw TypeError(".pb.Blitz21Op_C2PResp.ClearType: array expected");
                message.ClearType = [];
                for (var i = 0; i < object.ClearType.length; ++i)
                    message.ClearType[i] = object.ClearType[i] | 0;
            }
            if (object.ClearScore != null)
                message.ClearScore = object.ClearScore | 0;
            if (object.HitCounts != null)
                message.HitCounts = object.HitCounts | 0;
            if (object.HitScore != null)
                message.HitScore = object.HitScore | 0;
            if (object.ClearTypeScore) {
                if (!Array.isArray(object.ClearTypeScore))
                    throw TypeError(".pb.Blitz21Op_C2PResp.ClearTypeScore: array expected");
                message.ClearTypeScore = [];
                for (var i = 0; i < object.ClearTypeScore.length; ++i)
                    message.ClearTypeScore[i] = object.ClearTypeScore[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_C2PResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_C2PResp
         * @static
         * @param {pb.Blitz21Op_C2PResp} message Blitz21Op_C2PResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_C2PResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.ClearType = [];
                object.ClearTypeScore = [];
            }
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.CurrentScore = 0;
                object.NextCard = 0;
                object.ClearScore = 0;
                object.HitCounts = 0;
                object.HitScore = 0;
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.CurrentScore != null && message.hasOwnProperty("CurrentScore"))
                object.CurrentScore = message.CurrentScore;
            if (message.NextCard != null && message.hasOwnProperty("NextCard"))
                object.NextCard = message.NextCard;
            if (message.ClearType && message.ClearType.length) {
                object.ClearType = [];
                for (var j = 0; j < message.ClearType.length; ++j)
                    object.ClearType[j] = message.ClearType[j];
            }
            if (message.ClearScore != null && message.hasOwnProperty("ClearScore"))
                object.ClearScore = message.ClearScore;
            if (message.HitCounts != null && message.hasOwnProperty("HitCounts"))
                object.HitCounts = message.HitCounts;
            if (message.HitScore != null && message.hasOwnProperty("HitScore"))
                object.HitScore = message.HitScore;
            if (message.ClearTypeScore && message.ClearTypeScore.length) {
                object.ClearTypeScore = [];
                for (var j = 0; j < message.ClearTypeScore.length; ++j)
                    object.ClearTypeScore[j] = message.ClearTypeScore[j];
            }
            return object;
        };

        /**
         * Converts this Blitz21Op_C2PResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_C2PResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_C2PResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_C2PResp;
    })();

    pb.Blitz21Op_C2HReq = (function() {

        /**
         * Properties of a Blitz21Op_C2HReq.
         * @memberof pb
         * @interface IBlitz21Op_C2HReq
         */

        /**
         * Constructs a new Blitz21Op_C2HReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_C2HReq.
         * @implements IBlitz21Op_C2HReq
         * @constructor
         * @param {pb.IBlitz21Op_C2HReq=} [properties] Properties to set
         */
        function Blitz21Op_C2HReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21Op_C2HReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {pb.IBlitz21Op_C2HReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_C2HReq} Blitz21Op_C2HReq instance
         */
        Blitz21Op_C2HReq.create = function create(properties) {
            return new Blitz21Op_C2HReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_C2HReq message. Does not implicitly {@link pb.Blitz21Op_C2HReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {pb.IBlitz21Op_C2HReq} message Blitz21Op_C2HReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2HReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_C2HReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2HReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {pb.IBlitz21Op_C2HReq} message Blitz21Op_C2HReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2HReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_C2HReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_C2HReq} Blitz21Op_C2HReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2HReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_C2HReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_C2HReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_C2HReq} Blitz21Op_C2HReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2HReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_C2HReq message.
         * @function verify
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_C2HReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_C2HReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_C2HReq} Blitz21Op_C2HReq
         */
        Blitz21Op_C2HReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_C2HReq)
                return object;
            return new $root.blackjack.Blitz21Op_C2HReq();
        };

        /**
         * Creates a plain object from a Blitz21Op_C2HReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_C2HReq
         * @static
         * @param {pb.Blitz21Op_C2HReq} message Blitz21Op_C2HReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_C2HReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21Op_C2HReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_C2HReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_C2HReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_C2HReq;
    })();

    pb.Blitz21Op_C2HResp = (function() {

        /**
         * Properties of a Blitz21Op_C2HResp.
         * @memberof pb
         * @interface IBlitz21Op_C2HResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_C2HResp Err
         * @property {number|null} [NextCard] Blitz21Op_C2HResp NextCard
         * @property {number|null} [HoldCounts] Blitz21Op_C2HResp HoldCounts
         */

        /**
         * Constructs a new Blitz21Op_C2HResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_C2HResp.
         * @implements IBlitz21Op_C2HResp
         * @constructor
         * @param {pb.IBlitz21Op_C2HResp=} [properties] Properties to set
         */
        function Blitz21Op_C2HResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_C2HResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_C2HResp
         * @instance
         */
        Blitz21Op_C2HResp.prototype.Err = 0;

        /**
         * Blitz21Op_C2HResp NextCard.
         * @member {number} NextCard
         * @memberof pb.Blitz21Op_C2HResp
         * @instance
         */
        Blitz21Op_C2HResp.prototype.NextCard = 0;

        /**
         * Blitz21Op_C2HResp HoldCounts.
         * @member {number} HoldCounts
         * @memberof pb.Blitz21Op_C2HResp
         * @instance
         */
        Blitz21Op_C2HResp.prototype.HoldCounts = 0;

        /**
         * Creates a new Blitz21Op_C2HResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {pb.IBlitz21Op_C2HResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_C2HResp} Blitz21Op_C2HResp instance
         */
        Blitz21Op_C2HResp.create = function create(properties) {
            return new Blitz21Op_C2HResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_C2HResp message. Does not implicitly {@link pb.Blitz21Op_C2HResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {pb.IBlitz21Op_C2HResp} message Blitz21Op_C2HResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2HResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.NextCard != null && Object.hasOwnProperty.call(message, "NextCard"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.NextCard);
            if (message.HoldCounts != null && Object.hasOwnProperty.call(message, "HoldCounts"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.HoldCounts);
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_C2HResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_C2HResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {pb.IBlitz21Op_C2HResp} message Blitz21Op_C2HResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_C2HResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_C2HResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_C2HResp} Blitz21Op_C2HResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2HResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_C2HResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.NextCard = reader.int32();
                    break;
                case 3:
                    message.HoldCounts = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_C2HResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_C2HResp} Blitz21Op_C2HResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_C2HResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_C2HResp message.
         * @function verify
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_C2HResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.NextCard != null && message.hasOwnProperty("NextCard"))
                if (!$util.isInteger(message.NextCard))
                    return "NextCard: integer expected";
            if (message.HoldCounts != null && message.hasOwnProperty("HoldCounts"))
                if (!$util.isInteger(message.HoldCounts))
                    return "HoldCounts: integer expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_C2HResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_C2HResp} Blitz21Op_C2HResp
         */
        Blitz21Op_C2HResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_C2HResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_C2HResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            if (object.NextCard != null)
                message.NextCard = object.NextCard | 0;
            if (object.HoldCounts != null)
                message.HoldCounts = object.HoldCounts | 0;
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_C2HResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_C2HResp
         * @static
         * @param {pb.Blitz21Op_C2HResp} message Blitz21Op_C2HResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_C2HResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.NextCard = 0;
                object.HoldCounts = 0;
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.NextCard != null && message.hasOwnProperty("NextCard"))
                object.NextCard = message.NextCard;
            if (message.HoldCounts != null && message.hasOwnProperty("HoldCounts"))
                object.HoldCounts = message.HoldCounts;
            return object;
        };

        /**
         * Converts this Blitz21Op_C2HResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_C2HResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_C2HResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_C2HResp;
    })();

    pb.Blitz21Op_H2CReq = (function() {

        /**
         * Properties of a Blitz21Op_H2CReq.
         * @memberof pb
         * @interface IBlitz21Op_H2CReq
         */

        /**
         * Constructs a new Blitz21Op_H2CReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_H2CReq.
         * @implements IBlitz21Op_H2CReq
         * @constructor
         * @param {pb.IBlitz21Op_H2CReq=} [properties] Properties to set
         */
        function Blitz21Op_H2CReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21Op_H2CReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {pb.IBlitz21Op_H2CReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_H2CReq} Blitz21Op_H2CReq instance
         */
        Blitz21Op_H2CReq.create = function create(properties) {
            return new Blitz21Op_H2CReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_H2CReq message. Does not implicitly {@link pb.Blitz21Op_H2CReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {pb.IBlitz21Op_H2CReq} message Blitz21Op_H2CReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_H2CReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_H2CReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_H2CReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {pb.IBlitz21Op_H2CReq} message Blitz21Op_H2CReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_H2CReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_H2CReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_H2CReq} Blitz21Op_H2CReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_H2CReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_H2CReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_H2CReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_H2CReq} Blitz21Op_H2CReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_H2CReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_H2CReq message.
         * @function verify
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_H2CReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_H2CReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_H2CReq} Blitz21Op_H2CReq
         */
        Blitz21Op_H2CReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_H2CReq)
                return object;
            return new $root.blackjack.Blitz21Op_H2CReq();
        };

        /**
         * Creates a plain object from a Blitz21Op_H2CReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_H2CReq
         * @static
         * @param {pb.Blitz21Op_H2CReq} message Blitz21Op_H2CReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_H2CReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21Op_H2CReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_H2CReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_H2CReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_H2CReq;
    })();

    pb.Blitz21Op_H2CResp = (function() {

        /**
         * Properties of a Blitz21Op_H2CResp.
         * @memberof pb
         * @interface IBlitz21Op_H2CResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_H2CResp Err
         */

        /**
         * Constructs a new Blitz21Op_H2CResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_H2CResp.
         * @implements IBlitz21Op_H2CResp
         * @constructor
         * @param {pb.IBlitz21Op_H2CResp=} [properties] Properties to set
         */
        function Blitz21Op_H2CResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_H2CResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_H2CResp
         * @instance
         */
        Blitz21Op_H2CResp.prototype.Err = 0;

        /**
         * Creates a new Blitz21Op_H2CResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {pb.IBlitz21Op_H2CResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_H2CResp} Blitz21Op_H2CResp instance
         */
        Blitz21Op_H2CResp.create = function create(properties) {
            return new Blitz21Op_H2CResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_H2CResp message. Does not implicitly {@link pb.Blitz21Op_H2CResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {pb.IBlitz21Op_H2CResp} message Blitz21Op_H2CResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_H2CResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_H2CResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_H2CResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {pb.IBlitz21Op_H2CResp} message Blitz21Op_H2CResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_H2CResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_H2CResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_H2CResp} Blitz21Op_H2CResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_H2CResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_H2CResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_H2CResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_H2CResp} Blitz21Op_H2CResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_H2CResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_H2CResp message.
         * @function verify
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_H2CResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            return null;
        };

        /**
         * Creates a Blitz21Op_H2CResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_H2CResp} Blitz21Op_H2CResp
         */
        Blitz21Op_H2CResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_H2CResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_H2CResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_H2CResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_H2CResp
         * @static
         * @param {pb.Blitz21Op_H2CResp} message Blitz21Op_H2CResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_H2CResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Err = options.enums === String ? "SUCCESS" : 0;
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            return object;
        };

        /**
         * Converts this Blitz21Op_H2CResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_H2CResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_H2CResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_H2CResp;
    })();

    pb.Blitz21Op_UndoReq = (function() {

        /**
         * Properties of a Blitz21Op_UndoReq.
         * @memberof pb
         * @interface IBlitz21Op_UndoReq
         */

        /**
         * Constructs a new Blitz21Op_UndoReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_UndoReq.
         * @implements IBlitz21Op_UndoReq
         * @constructor
         * @param {pb.IBlitz21Op_UndoReq=} [properties] Properties to set
         */
        function Blitz21Op_UndoReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21Op_UndoReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {pb.IBlitz21Op_UndoReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_UndoReq} Blitz21Op_UndoReq instance
         */
        Blitz21Op_UndoReq.create = function create(properties) {
            return new Blitz21Op_UndoReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_UndoReq message. Does not implicitly {@link pb.Blitz21Op_UndoReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {pb.IBlitz21Op_UndoReq} message Blitz21Op_UndoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_UndoReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_UndoReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_UndoReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {pb.IBlitz21Op_UndoReq} message Blitz21Op_UndoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_UndoReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_UndoReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_UndoReq} Blitz21Op_UndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_UndoReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_UndoReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_UndoReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_UndoReq} Blitz21Op_UndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_UndoReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_UndoReq message.
         * @function verify
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_UndoReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_UndoReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_UndoReq} Blitz21Op_UndoReq
         */
        Blitz21Op_UndoReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_UndoReq)
                return object;
            return new $root.blackjack.Blitz21Op_UndoReq();
        };

        /**
         * Creates a plain object from a Blitz21Op_UndoReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_UndoReq
         * @static
         * @param {pb.Blitz21Op_UndoReq} message Blitz21Op_UndoReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_UndoReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21Op_UndoReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_UndoReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_UndoReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_UndoReq;
    })();

    pb.Blitz21Op_UndoResp = (function() {

        /**
         * Properties of a Blitz21Op_UndoResp.
         * @memberof pb
         * @interface IBlitz21Op_UndoResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_UndoResp Err
         * @property {pb.IBlitz21Carddesk|null} [CardDesk] Blitz21Op_UndoResp CardDesk
         */

        /**
         * Constructs a new Blitz21Op_UndoResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_UndoResp.
         * @implements IBlitz21Op_UndoResp
         * @constructor
         * @param {pb.IBlitz21Op_UndoResp=} [properties] Properties to set
         */
        function Blitz21Op_UndoResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_UndoResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_UndoResp
         * @instance
         */
        Blitz21Op_UndoResp.prototype.Err = 0;

        /**
         * Blitz21Op_UndoResp CardDesk.
         * @member {pb.IBlitz21Carddesk|null|undefined} CardDesk
         * @memberof pb.Blitz21Op_UndoResp
         * @instance
         */
        Blitz21Op_UndoResp.prototype.CardDesk = null;

        /**
         * Creates a new Blitz21Op_UndoResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {pb.IBlitz21Op_UndoResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_UndoResp} Blitz21Op_UndoResp instance
         */
        Blitz21Op_UndoResp.create = function create(properties) {
            return new Blitz21Op_UndoResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_UndoResp message. Does not implicitly {@link pb.Blitz21Op_UndoResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {pb.IBlitz21Op_UndoResp} message Blitz21Op_UndoResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_UndoResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.CardDesk != null && Object.hasOwnProperty.call(message, "CardDesk"))
                $root.blackjack.Blitz21Carddesk.encode(message.CardDesk, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_UndoResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_UndoResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {pb.IBlitz21Op_UndoResp} message Blitz21Op_UndoResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_UndoResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_UndoResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_UndoResp} Blitz21Op_UndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_UndoResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_UndoResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.CardDesk = $root.blackjack.Blitz21Carddesk.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_UndoResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_UndoResp} Blitz21Op_UndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_UndoResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_UndoResp message.
         * @function verify
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_UndoResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.CardDesk != null && message.hasOwnProperty("CardDesk")) {
                var error = $root.blackjack.Blitz21Carddesk.verify(message.CardDesk);
                if (error)
                    return "CardDesk." + error;
            }
            return null;
        };

        /**
         * Creates a Blitz21Op_UndoResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_UndoResp} Blitz21Op_UndoResp
         */
        Blitz21Op_UndoResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_UndoResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_UndoResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            if (object.CardDesk != null) {
                if (typeof object.CardDesk !== "object")
                    throw TypeError(".pb.Blitz21Op_UndoResp.CardDesk: object expected");
                message.CardDesk = $root.blackjack.Blitz21Carddesk.fromObject(object.CardDesk);
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_UndoResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_UndoResp
         * @static
         * @param {pb.Blitz21Op_UndoResp} message Blitz21Op_UndoResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_UndoResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.CardDesk = null;
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.CardDesk != null && message.hasOwnProperty("CardDesk"))
                object.CardDesk = $root.blackjack.Blitz21Carddesk.toObject(message.CardDesk, options);
            return object;
        };

        /**
         * Converts this Blitz21Op_UndoResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_UndoResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_UndoResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_UndoResp;
    })();

    pb.Blitz21Op_FinishReq = (function() {

        /**
         * Properties of a Blitz21Op_FinishReq.
         * @memberof pb
         * @interface IBlitz21Op_FinishReq
         */

        /**
         * Constructs a new Blitz21Op_FinishReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_FinishReq.
         * @implements IBlitz21Op_FinishReq
         * @constructor
         * @param {pb.IBlitz21Op_FinishReq=} [properties] Properties to set
         */
        function Blitz21Op_FinishReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21Op_FinishReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {pb.IBlitz21Op_FinishReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_FinishReq} Blitz21Op_FinishReq instance
         */
        Blitz21Op_FinishReq.create = function create(properties) {
            return new Blitz21Op_FinishReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_FinishReq message. Does not implicitly {@link pb.Blitz21Op_FinishReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {pb.IBlitz21Op_FinishReq} message Blitz21Op_FinishReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_FinishReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_FinishReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_FinishReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {pb.IBlitz21Op_FinishReq} message Blitz21Op_FinishReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_FinishReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_FinishReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_FinishReq} Blitz21Op_FinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_FinishReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_FinishReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_FinishReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_FinishReq} Blitz21Op_FinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_FinishReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_FinishReq message.
         * @function verify
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_FinishReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_FinishReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_FinishReq} Blitz21Op_FinishReq
         */
        Blitz21Op_FinishReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_FinishReq)
                return object;
            return new $root.blackjack.Blitz21Op_FinishReq();
        };

        /**
         * Creates a plain object from a Blitz21Op_FinishReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_FinishReq
         * @static
         * @param {pb.Blitz21Op_FinishReq} message Blitz21Op_FinishReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_FinishReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21Op_FinishReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_FinishReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_FinishReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_FinishReq;
    })();

    pb.Blitz21Reward = (function() {

        /**
         * Properties of a Blitz21Reward.
         * @memberof pb
         * @interface IBlitz21Reward
         * @property {number|null} [Score] Blitz21Reward Score
         * @property {number|null} [TimeScore] Blitz21Reward TimeScore
         */

        /**
         * Constructs a new Blitz21Reward.
         * @memberof pb
         * @classdesc Represents a Blitz21Reward.
         * @implements IBlitz21Reward
         * @constructor
         * @param {pb.IBlitz21Reward=} [properties] Properties to set
         */
        function Blitz21Reward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Reward Score.
         * @member {number} Score
         * @memberof pb.Blitz21Reward
         * @instance
         */
        Blitz21Reward.prototype.Score = 0;

        /**
         * Blitz21Reward TimeScore.
         * @member {number} TimeScore
         * @memberof pb.Blitz21Reward
         * @instance
         */
        Blitz21Reward.prototype.TimeScore = 0;

        /**
         * Creates a new Blitz21Reward instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Reward
         * @static
         * @param {pb.IBlitz21Reward=} [properties] Properties to set
         * @returns {pb.Blitz21Reward} Blitz21Reward instance
         */
        Blitz21Reward.create = function create(properties) {
            return new Blitz21Reward(properties);
        };

        /**
         * Encodes the specified Blitz21Reward message. Does not implicitly {@link pb.Blitz21Reward.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Reward
         * @static
         * @param {pb.IBlitz21Reward} message Blitz21Reward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Reward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Score);
            if (message.TimeScore != null && Object.hasOwnProperty.call(message, "TimeScore"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TimeScore);
            return writer;
        };

        /**
         * Encodes the specified Blitz21Reward message, length delimited. Does not implicitly {@link pb.Blitz21Reward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Reward
         * @static
         * @param {pb.IBlitz21Reward} message Blitz21Reward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Reward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Reward message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Reward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Reward} Blitz21Reward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Reward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Reward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Score = reader.int32();
                    break;
                case 2:
                    message.TimeScore = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Reward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Reward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Reward} Blitz21Reward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Reward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Reward message.
         * @function verify
         * @memberof pb.Blitz21Reward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Reward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            if (message.TimeScore != null && message.hasOwnProperty("TimeScore"))
                if (!$util.isInteger(message.TimeScore))
                    return "TimeScore: integer expected";
            return null;
        };

        /**
         * Creates a Blitz21Reward message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Reward
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Reward} Blitz21Reward
         */
        Blitz21Reward.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Reward)
                return object;
            var message = new $root.blackjack.Blitz21Reward();
            if (object.Score != null)
                message.Score = object.Score | 0;
            if (object.TimeScore != null)
                message.TimeScore = object.TimeScore | 0;
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Reward message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Reward
         * @static
         * @param {pb.Blitz21Reward} message Blitz21Reward
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Reward.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Score = 0;
                object.TimeScore = 0;
            }
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            if (message.TimeScore != null && message.hasOwnProperty("TimeScore"))
                object.TimeScore = message.TimeScore;
            return object;
        };

        /**
         * Converts this Blitz21Reward to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Reward
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Reward.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Reward;
    })();

    pb.Blitz21Op_FinishResp = (function() {

        /**
         * Properties of a Blitz21Op_FinishResp.
         * @memberof pb
         * @interface IBlitz21Op_FinishResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_FinishResp Err
         * @property {pb.GameOverReason|null} [reason] Blitz21Op_FinishResp reason
         * @property {pb.IBlitz21Reward|null} [reward] Blitz21Op_FinishResp reward
         * @property {number|null} [LiftBestScore] Blitz21Op_FinishResp LiftBestScore
         * @property {number|null} [TodayBestScore] Blitz21Op_FinishResp TodayBestScore
         * @property {Array.<pb.FinishBonusType>|null} [BonusType] Blitz21Op_FinishResp BonusType
         * @property {Array.<number>|null} [FinishBonusScore] Blitz21Op_FinishResp FinishBonusScore
         */

        /**
         * Constructs a new Blitz21Op_FinishResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_FinishResp.
         * @implements IBlitz21Op_FinishResp
         * @constructor
         * @param {pb.IBlitz21Op_FinishResp=} [properties] Properties to set
         */
        function Blitz21Op_FinishResp(properties) {
            this.BonusType = [];
            this.FinishBonusScore = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_FinishResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.Err = 0;

        /**
         * Blitz21Op_FinishResp reason.
         * @member {pb.GameOverReason} reason
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.reason = 0;

        /**
         * Blitz21Op_FinishResp reward.
         * @member {pb.IBlitz21Reward|null|undefined} reward
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.reward = null;

        /**
         * Blitz21Op_FinishResp LiftBestScore.
         * @member {number} LiftBestScore
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.LiftBestScore = 0;

        /**
         * Blitz21Op_FinishResp TodayBestScore.
         * @member {number} TodayBestScore
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.TodayBestScore = 0;

        /**
         * Blitz21Op_FinishResp BonusType.
         * @member {Array.<pb.FinishBonusType>} BonusType
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.BonusType = $util.emptyArray;

        /**
         * Blitz21Op_FinishResp FinishBonusScore.
         * @member {Array.<number>} FinishBonusScore
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         */
        Blitz21Op_FinishResp.prototype.FinishBonusScore = $util.emptyArray;

        /**
         * Creates a new Blitz21Op_FinishResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {pb.IBlitz21Op_FinishResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_FinishResp} Blitz21Op_FinishResp instance
         */
        Blitz21Op_FinishResp.create = function create(properties) {
            return new Blitz21Op_FinishResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_FinishResp message. Does not implicitly {@link pb.Blitz21Op_FinishResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {pb.IBlitz21Op_FinishResp} message Blitz21Op_FinishResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_FinishResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reason);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                $root.blackjack.Blitz21Reward.encode(message.reward, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.LiftBestScore != null && Object.hasOwnProperty.call(message, "LiftBestScore"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LiftBestScore);
            if (message.TodayBestScore != null && Object.hasOwnProperty.call(message, "TodayBestScore"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.TodayBestScore);
            if (message.BonusType != null && message.BonusType.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.BonusType.length; ++i)
                    writer.int32(message.BonusType[i]);
                writer.ldelim();
            }
            if (message.FinishBonusScore != null && message.FinishBonusScore.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (var i = 0; i < message.FinishBonusScore.length; ++i)
                    writer.int32(message.FinishBonusScore[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_FinishResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_FinishResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {pb.IBlitz21Op_FinishResp} message Blitz21Op_FinishResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_FinishResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_FinishResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_FinishResp} Blitz21Op_FinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_FinishResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_FinishResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.reason = reader.int32();
                    break;
                case 3:
                    message.reward = $root.blackjack.Blitz21Reward.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.LiftBestScore = reader.int32();
                    break;
                case 5:
                    message.TodayBestScore = reader.int32();
                    break;
                case 6:
                    if (!(message.BonusType && message.BonusType.length))
                        message.BonusType = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.BonusType.push(reader.int32());
                    } else
                        message.BonusType.push(reader.int32());
                    break;
                case 7:
                    if (!(message.FinishBonusScore && message.FinishBonusScore.length))
                        message.FinishBonusScore = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.FinishBonusScore.push(reader.int32());
                    } else
                        message.FinishBonusScore.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_FinishResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_FinishResp} Blitz21Op_FinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_FinishResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_FinishResp message.
         * @function verify
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_FinishResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.reward != null && message.hasOwnProperty("reward")) {
                var error = $root.blackjack.Blitz21Reward.verify(message.reward);
                if (error)
                    return "reward." + error;
            }
            if (message.LiftBestScore != null && message.hasOwnProperty("LiftBestScore"))
                if (!$util.isInteger(message.LiftBestScore))
                    return "LiftBestScore: integer expected";
            if (message.TodayBestScore != null && message.hasOwnProperty("TodayBestScore"))
                if (!$util.isInteger(message.TodayBestScore))
                    return "TodayBestScore: integer expected";
            if (message.BonusType != null && message.hasOwnProperty("BonusType")) {
                if (!Array.isArray(message.BonusType))
                    return "BonusType: array expected";
                for (var i = 0; i < message.BonusType.length; ++i)
                    switch (message.BonusType[i]) {
                    default:
                        return "BonusType: enum value[] expected";
                    case 0:
                    case 1:
                        break;
                    }
            }
            if (message.FinishBonusScore != null && message.hasOwnProperty("FinishBonusScore")) {
                if (!Array.isArray(message.FinishBonusScore))
                    return "FinishBonusScore: array expected";
                for (var i = 0; i < message.FinishBonusScore.length; ++i)
                    if (!$util.isInteger(message.FinishBonusScore[i]))
                        return "FinishBonusScore: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Blitz21Op_FinishResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_FinishResp} Blitz21Op_FinishResp
         */
        Blitz21Op_FinishResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_FinishResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_FinishResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            switch (object.reason) {
            case "Reason_Auto":
            case 0:
                message.reason = 0;
                break;
            case "Reason_Timeout":
            case 1:
                message.reason = 1;
                break;
            case "Reason_Force":
            case 2:
                message.reason = 2;
                break;
            case "Reason_CmpOver":
            case 3:
                message.reason = 3;
                break;
            case "Reason_AllFinish":
            case 4:
                message.reason = 4;
                break;
            case "Reason_Dead":
            case 5:
                message.reason = 5;
                break;
            }
            if (object.reward != null) {
                if (typeof object.reward !== "object")
                    throw TypeError(".pb.Blitz21Op_FinishResp.reward: object expected");
                message.reward = $root.blackjack.Blitz21Reward.fromObject(object.reward);
            }
            if (object.LiftBestScore != null)
                message.LiftBestScore = object.LiftBestScore | 0;
            if (object.TodayBestScore != null)
                message.TodayBestScore = object.TodayBestScore | 0;
            if (object.BonusType) {
                if (!Array.isArray(object.BonusType))
                    throw TypeError(".pb.Blitz21Op_FinishResp.BonusType: array expected");
                message.BonusType = [];
                for (var i = 0; i < object.BonusType.length; ++i)
                    switch (object.BonusType[i]) {
                    default:
                    case "NoBomb":
                    case 0:
                        message.BonusType[i] = 0;
                        break;
                    case "AllClear":
                    case 1:
                        message.BonusType[i] = 1;
                        break;
                    }
            }
            if (object.FinishBonusScore) {
                if (!Array.isArray(object.FinishBonusScore))
                    throw TypeError(".pb.Blitz21Op_FinishResp.FinishBonusScore: array expected");
                message.FinishBonusScore = [];
                for (var i = 0; i < object.FinishBonusScore.length; ++i)
                    message.FinishBonusScore[i] = object.FinishBonusScore[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_FinishResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_FinishResp
         * @static
         * @param {pb.Blitz21Op_FinishResp} message Blitz21Op_FinishResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_FinishResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.BonusType = [];
                object.FinishBonusScore = [];
            }
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.reason = options.enums === String ? "Reason_Auto" : 0;
                object.reward = null;
                object.LiftBestScore = 0;
                object.TodayBestScore = 0;
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.blackjack.GameOverReason[message.reason] : message.reason;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = $root.blackjack.Blitz21Reward.toObject(message.reward, options);
            if (message.LiftBestScore != null && message.hasOwnProperty("LiftBestScore"))
                object.LiftBestScore = message.LiftBestScore;
            if (message.TodayBestScore != null && message.hasOwnProperty("TodayBestScore"))
                object.TodayBestScore = message.TodayBestScore;
            if (message.BonusType && message.BonusType.length) {
                object.BonusType = [];
                for (var j = 0; j < message.BonusType.length; ++j)
                    object.BonusType[j] = options.enums === String ? $root.blackjack.FinishBonusType[message.BonusType[j]] : message.BonusType[j];
            }
            if (message.FinishBonusScore && message.FinishBonusScore.length) {
                object.FinishBonusScore = [];
                for (var j = 0; j < message.FinishBonusScore.length; ++j)
                    object.FinishBonusScore[j] = message.FinishBonusScore[j];
            }
            return object;
        };

        /**
         * Converts this Blitz21Op_FinishResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_FinishResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_FinishResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_FinishResp;
    })();

    pb.Blitz21Op_PauseReq = (function() {

        /**
         * Properties of a Blitz21Op_PauseReq.
         * @memberof pb
         * @interface IBlitz21Op_PauseReq
         */

        /**
         * Constructs a new Blitz21Op_PauseReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_PauseReq.
         * @implements IBlitz21Op_PauseReq
         * @constructor
         * @param {pb.IBlitz21Op_PauseReq=} [properties] Properties to set
         */
        function Blitz21Op_PauseReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21Op_PauseReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {pb.IBlitz21Op_PauseReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_PauseReq} Blitz21Op_PauseReq instance
         */
        Blitz21Op_PauseReq.create = function create(properties) {
            return new Blitz21Op_PauseReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_PauseReq message. Does not implicitly {@link pb.Blitz21Op_PauseReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {pb.IBlitz21Op_PauseReq} message Blitz21Op_PauseReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_PauseReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_PauseReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_PauseReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {pb.IBlitz21Op_PauseReq} message Blitz21Op_PauseReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_PauseReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_PauseReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_PauseReq} Blitz21Op_PauseReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_PauseReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_PauseReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_PauseReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_PauseReq} Blitz21Op_PauseReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_PauseReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_PauseReq message.
         * @function verify
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_PauseReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_PauseReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_PauseReq} Blitz21Op_PauseReq
         */
        Blitz21Op_PauseReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_PauseReq)
                return object;
            return new $root.blackjack.Blitz21Op_PauseReq();
        };

        /**
         * Creates a plain object from a Blitz21Op_PauseReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_PauseReq
         * @static
         * @param {pb.Blitz21Op_PauseReq} message Blitz21Op_PauseReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_PauseReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21Op_PauseReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_PauseReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_PauseReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_PauseReq;
    })();

    pb.Blitz21Op_PauseResp = (function() {

        /**
         * Properties of a Blitz21Op_PauseResp.
         * @memberof pb
         * @interface IBlitz21Op_PauseResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_PauseResp Err
         */

        /**
         * Constructs a new Blitz21Op_PauseResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_PauseResp.
         * @implements IBlitz21Op_PauseResp
         * @constructor
         * @param {pb.IBlitz21Op_PauseResp=} [properties] Properties to set
         */
        function Blitz21Op_PauseResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_PauseResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_PauseResp
         * @instance
         */
        Blitz21Op_PauseResp.prototype.Err = 0;

        /**
         * Creates a new Blitz21Op_PauseResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {pb.IBlitz21Op_PauseResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_PauseResp} Blitz21Op_PauseResp instance
         */
        Blitz21Op_PauseResp.create = function create(properties) {
            return new Blitz21Op_PauseResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_PauseResp message. Does not implicitly {@link pb.Blitz21Op_PauseResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {pb.IBlitz21Op_PauseResp} message Blitz21Op_PauseResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_PauseResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_PauseResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_PauseResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {pb.IBlitz21Op_PauseResp} message Blitz21Op_PauseResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_PauseResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_PauseResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_PauseResp} Blitz21Op_PauseResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_PauseResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_PauseResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_PauseResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_PauseResp} Blitz21Op_PauseResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_PauseResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_PauseResp message.
         * @function verify
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_PauseResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            return null;
        };

        /**
         * Creates a Blitz21Op_PauseResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_PauseResp} Blitz21Op_PauseResp
         */
        Blitz21Op_PauseResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_PauseResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_PauseResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_PauseResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_PauseResp
         * @static
         * @param {pb.Blitz21Op_PauseResp} message Blitz21Op_PauseResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_PauseResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Err = options.enums === String ? "SUCCESS" : 0;
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            return object;
        };

        /**
         * Converts this Blitz21Op_PauseResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_PauseResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_PauseResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_PauseResp;
    })();

    pb.Blitz21Op_RecoverReq = (function() {

        /**
         * Properties of a Blitz21Op_RecoverReq.
         * @memberof pb
         * @interface IBlitz21Op_RecoverReq
         */

        /**
         * Constructs a new Blitz21Op_RecoverReq.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_RecoverReq.
         * @implements IBlitz21Op_RecoverReq
         * @constructor
         * @param {pb.IBlitz21Op_RecoverReq=} [properties] Properties to set
         */
        function Blitz21Op_RecoverReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blitz21Op_RecoverReq instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {pb.IBlitz21Op_RecoverReq=} [properties] Properties to set
         * @returns {pb.Blitz21Op_RecoverReq} Blitz21Op_RecoverReq instance
         */
        Blitz21Op_RecoverReq.create = function create(properties) {
            return new Blitz21Op_RecoverReq(properties);
        };

        /**
         * Encodes the specified Blitz21Op_RecoverReq message. Does not implicitly {@link pb.Blitz21Op_RecoverReq.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {pb.IBlitz21Op_RecoverReq} message Blitz21Op_RecoverReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_RecoverReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_RecoverReq message, length delimited. Does not implicitly {@link pb.Blitz21Op_RecoverReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {pb.IBlitz21Op_RecoverReq} message Blitz21Op_RecoverReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_RecoverReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_RecoverReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_RecoverReq} Blitz21Op_RecoverReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_RecoverReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_RecoverReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_RecoverReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_RecoverReq} Blitz21Op_RecoverReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_RecoverReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_RecoverReq message.
         * @function verify
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_RecoverReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_RecoverReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_RecoverReq} Blitz21Op_RecoverReq
         */
        Blitz21Op_RecoverReq.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_RecoverReq)
                return object;
            return new $root.blackjack.Blitz21Op_RecoverReq();
        };

        /**
         * Creates a plain object from a Blitz21Op_RecoverReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_RecoverReq
         * @static
         * @param {pb.Blitz21Op_RecoverReq} message Blitz21Op_RecoverReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_RecoverReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blitz21Op_RecoverReq to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_RecoverReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_RecoverReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_RecoverReq;
    })();

    pb.Blitz21Op_RecoverResp = (function() {

        /**
         * Properties of a Blitz21Op_RecoverResp.
         * @memberof pb
         * @interface IBlitz21Op_RecoverResp
         * @property {pb.ErrNo|null} [Err] Blitz21Op_RecoverResp Err
         * @property {number|null} [LeftTime] Blitz21Op_RecoverResp LeftTime
         */

        /**
         * Constructs a new Blitz21Op_RecoverResp.
         * @memberof pb
         * @classdesc Represents a Blitz21Op_RecoverResp.
         * @implements IBlitz21Op_RecoverResp
         * @constructor
         * @param {pb.IBlitz21Op_RecoverResp=} [properties] Properties to set
         */
        function Blitz21Op_RecoverResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Blitz21Op_RecoverResp Err.
         * @member {pb.ErrNo} Err
         * @memberof pb.Blitz21Op_RecoverResp
         * @instance
         */
        Blitz21Op_RecoverResp.prototype.Err = 0;

        /**
         * Blitz21Op_RecoverResp LeftTime.
         * @member {number} LeftTime
         * @memberof pb.Blitz21Op_RecoverResp
         * @instance
         */
        Blitz21Op_RecoverResp.prototype.LeftTime = 0;

        /**
         * Creates a new Blitz21Op_RecoverResp instance using the specified properties.
         * @function create
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {pb.IBlitz21Op_RecoverResp=} [properties] Properties to set
         * @returns {pb.Blitz21Op_RecoverResp} Blitz21Op_RecoverResp instance
         */
        Blitz21Op_RecoverResp.create = function create(properties) {
            return new Blitz21Op_RecoverResp(properties);
        };

        /**
         * Encodes the specified Blitz21Op_RecoverResp message. Does not implicitly {@link pb.Blitz21Op_RecoverResp.verify|verify} messages.
         * @function encode
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {pb.IBlitz21Op_RecoverResp} message Blitz21Op_RecoverResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_RecoverResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Err != null && Object.hasOwnProperty.call(message, "Err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Err);
            if (message.LeftTime != null && Object.hasOwnProperty.call(message, "LeftTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.LeftTime);
            return writer;
        };

        /**
         * Encodes the specified Blitz21Op_RecoverResp message, length delimited. Does not implicitly {@link pb.Blitz21Op_RecoverResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {pb.IBlitz21Op_RecoverResp} message Blitz21Op_RecoverResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blitz21Op_RecoverResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blitz21Op_RecoverResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Blitz21Op_RecoverResp} Blitz21Op_RecoverResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_RecoverResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blackjack.Blitz21Op_RecoverResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Err = reader.int32();
                    break;
                case 2:
                    message.LeftTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Blitz21Op_RecoverResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Blitz21Op_RecoverResp} Blitz21Op_RecoverResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blitz21Op_RecoverResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blitz21Op_RecoverResp message.
         * @function verify
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blitz21Op_RecoverResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Err != null && message.hasOwnProperty("Err"))
                switch (message.Err) {
                default:
                    return "Err: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 60:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                    break;
                }
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                if (!$util.isInteger(message.LeftTime))
                    return "LeftTime: integer expected";
            return null;
        };

        /**
         * Creates a Blitz21Op_RecoverResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Blitz21Op_RecoverResp} Blitz21Op_RecoverResp
         */
        Blitz21Op_RecoverResp.fromObject = function fromObject(object) {
            if (object instanceof $root.blackjack.Blitz21Op_RecoverResp)
                return object;
            var message = new $root.blackjack.Blitz21Op_RecoverResp();
            switch (object.Err) {
            case "SUCCESS":
            case 0:
                message.Err = 0;
                break;
            case "Server_Except":
            case 1:
                message.Err = 1;
                break;
            case "TokenError":
            case 2:
                message.Err = 2;
                break;
            case "TokenExpire":
            case 3:
                message.Err = 3;
                break;
            case "Account_NotExists":
            case 4:
                message.Err = 4;
                break;
            case "Duplicate_Login":
            case 5:
                message.Err = 5;
                break;
            case "Server_Maintain":
            case 8:
                message.Err = 8;
                break;
            case "NickName_Exists":
            case 10:
                message.Err = 10;
                break;
            case "NickName_TooShort":
            case 11:
                message.Err = 11;
                break;
            case "NickName_TooLong":
            case 12:
                message.Err = 12;
                break;
            case "Password_TooShort":
            case 13:
                message.Err = 13;
                break;
            case "Password_TooLong":
            case 14:
                message.Err = 14;
                break;
            case "AccountBind":
            case 15:
                message.Err = 15;
                break;
            case "Charge_Fail":
            case 20:
                message.Err = 20;
                break;
            case "Lower_Age":
            case 21:
                message.Err = 21;
                break;
            case "Cash_NotEnough":
            case 22:
                message.Err = 22;
                break;
            case "Withdrawing":
            case 23:
                message.Err = 23;
                break;
            case "WithDrawNeedRecharge":
            case 24:
                message.Err = 24;
                break;
            case "WithDrawTimes":
            case 25:
                message.Err = 25;
                break;
            case "RequestParam_Error":
            case 50:
                message.Err = 50;
                break;
            case "Server_ConfigError":
            case 51:
                message.Err = 51;
                break;
            case "Reward_IDNotExists":
            case 52:
                message.Err = 52;
                break;
            case "Reward_AlreadyGet":
            case 53:
                message.Err = 53;
                break;
            case "Reward_ConditionUnCompelete":
            case 54:
                message.Err = 54;
                break;
            case "SeasonWheel_NotExists":
            case 55:
                message.Err = 55;
                break;
            case "SeasonWheel_Expire":
            case 56:
                message.Err = 56;
                break;
            case "ReplayRecord_NotExist":
            case 60:
                message.Err = 60;
                break;
            case "CompetitionID_NotExists":
            case 100:
                message.Err = 100;
                break;
            case "Competition_Over":
            case 101:
                message.Err = 101;
                break;
            case "Competition_PriceNotEnough":
            case 102:
                message.Err = 102;
                break;
            case "Competition_Matching":
            case 103:
                message.Err = 103;
                break;
            case "Competition_Gaming":
            case 104:
                message.Err = 104;
                break;
            case "Competition_OtherGame":
            case 105:
                message.Err = 105;
                break;
            case "Competition_NotFound":
            case 106:
                message.Err = 106;
                break;
            case "Competition_NotInCmp":
            case 107:
                message.Err = 107;
                break;
            case "Competition_GameOver":
            case 108:
                message.Err = 108;
                break;
            case "Competition_Pause":
            case 109:
                message.Err = 109;
                break;
            case "Competition_ParamError":
            case 110:
                message.Err = 110;
                break;
            case "MatchID_NotExist":
            case 111:
                message.Err = 111;
                break;
            case "Match_Timeout":
            case 112:
                message.Err = 112;
                break;
            case "Competition_AuthFail":
            case 113:
                message.Err = 113;
                break;
            case "Competition_Busy":
            case 114:
                message.Err = 114;
                break;
            case "Competition_Timeout":
            case 115:
                message.Err = 115;
                break;
            case "Match_Hide":
            case 116:
                message.Err = 116;
                break;
            case "HTTP_SUCCESS":
            case 200:
                message.Err = 200;
                break;
            case "ActivityInvalid":
            case 201:
                message.Err = 201;
                break;
            case "ActivityDraw":
            case 202:
                message.Err = 202;
                break;
            case "ActivityNotFinished":
            case 203:
                message.Err = 203;
                break;
            case "DiamondNotEnough":
            case 204:
                message.Err = 204;
                break;
            }
            if (object.LeftTime != null)
                message.LeftTime = object.LeftTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a Blitz21Op_RecoverResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Blitz21Op_RecoverResp
         * @static
         * @param {pb.Blitz21Op_RecoverResp} message Blitz21Op_RecoverResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blitz21Op_RecoverResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Err = options.enums === String ? "SUCCESS" : 0;
                object.LeftTime = 0;
            }
            if (message.Err != null && message.hasOwnProperty("Err"))
                object.Err = options.enums === String ? $root.blackjack.ErrNo[message.Err] : message.Err;
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                object.LeftTime = message.LeftTime;
            return object;
        };

        /**
         * Converts this Blitz21Op_RecoverResp to JSON.
         * @function toJSON
         * @memberof pb.Blitz21Op_RecoverResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blitz21Op_RecoverResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blitz21Op_RecoverResp;
    })();

    return pb;
})();

module.exports = $root;
