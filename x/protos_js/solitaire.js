/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.solitaire = (function() {

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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.Ping();
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
            if (object instanceof $root.solitaire.Ping)
                return object;
            return new $root.solitaire.Ping();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.Pong();
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
            if (object instanceof $root.solitaire.Pong)
                return object;
            return new $root.solitaire.Pong();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.UserData();
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
            if (object instanceof $root.solitaire.UserData)
                return object;
            var message = new $root.solitaire.UserData();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.PlayerGameInfo();
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
            if (object instanceof $root.solitaire.PlayerGameInfo)
                return object;
            var message = new $root.solitaire.PlayerGameInfo();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.CurrencyPair();
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
            if (object instanceof $root.solitaire.CurrencyPair)
                return object;
            var message = new $root.solitaire.CurrencyPair();
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
                object.type = options.enums === String ? $root.solitaire.CurrencyType[message.type] : message.type;
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.ErrorMessageNotify();
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
            if (object instanceof $root.solitaire.ErrorMessageNotify)
                return object;
            var message = new $root.solitaire.ErrorMessageNotify();
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
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
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
                    $root.solitaire.CurrencyPair.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.PlayerCurrencyChangeNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.solitaire.CurrencyPair.decode(reader, reader.uint32()));
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
                    var error = $root.solitaire.CurrencyPair.verify(message.list[i]);
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
            if (object instanceof $root.solitaire.PlayerCurrencyChangeNotify)
                return object;
            var message = new $root.solitaire.PlayerCurrencyChangeNotify();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".pb.PlayerCurrencyChangeNotify.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".pb.PlayerCurrencyChangeNotify.list: object expected");
                    message.list[i] = $root.solitaire.CurrencyPair.fromObject(object.list[i]);
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
                    object.list[j] = $root.solitaire.CurrencyPair.toObject(message.list[j], options);
            }
            if (message.event != null && message.hasOwnProperty("event"))
                object.event = options.enums === String ? $root.solitaire.CurrencyUpdateEvent[message.event] : message.event;
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.PrizePoolUpdateNotify();
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
            if (object instanceof $root.solitaire.PrizePoolUpdateNotify)
                return object;
            var message = new $root.solitaire.PrizePoolUpdateNotify();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SeasonRewardGetReq();
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
            if (object instanceof $root.solitaire.SeasonRewardGetReq)
                return object;
            var message = new $root.solitaire.SeasonRewardGetReq();
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
                $root.solitaire.CurrencyPair.encode(message.reward, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SeasonRewardGetResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.reward = $root.solitaire.CurrencyPair.decode(reader, reader.uint32());
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
                var error = $root.solitaire.CurrencyPair.verify(message.reward);
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
            if (object instanceof $root.solitaire.SeasonRewardGetResp)
                return object;
            var message = new $root.solitaire.SeasonRewardGetResp();
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
                message.reward = $root.solitaire.CurrencyPair.fromObject(object.reward);
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
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = $root.solitaire.CurrencyPair.toObject(message.reward, options);
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.DuplicateLoginResp();
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
            if (object instanceof $root.solitaire.DuplicateLoginResp)
                return object;
            var message = new $root.solitaire.DuplicateLoginResp();
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
                object.Err = options.enums === String ? $root.solitaire.ErrNo[message.Err] : message.Err;
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.DrawLotteryNotify();
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
            if (object instanceof $root.solitaire.DrawLotteryNotify)
                return object;
            var message = new $root.solitaire.DrawLotteryNotify();
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
                object.LotteryType = options.enums === String ? $root.solitaire.CurrencyType[message.LotteryType] : message.LotteryType;
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.HeadPush();
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
            if (object instanceof $root.solitaire.HeadPush)
                return object;
            var message = new $root.solitaire.HeadPush();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.DanRefresh();
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
            if (object instanceof $root.solitaire.DanRefresh)
                return object;
            var message = new $root.solitaire.DanRefresh();
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

    /**
     * UndoOpType enum.
     * @name pb.UndoOpType
     * @enum {number}
     * @property {number} OP_NONE=0 OP_NONE value
     * @property {number} OP_R2P=1 OP_R2P value
     * @property {number} OP_R2F=2 OP_R2F value
     * @property {number} OP_P2F=3 OP_P2F value
     * @property {number} OP_F2P=4 OP_F2P value
     * @property {number} OP_P2P=5 OP_P2P value
     * @property {number} OP_RAND=6 OP_RAND value
     */
    pb.UndoOpType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OP_NONE"] = 0;
        values[valuesById[1] = "OP_R2P"] = 1;
        values[valuesById[2] = "OP_R2F"] = 2;
        values[valuesById[3] = "OP_P2F"] = 3;
        values[valuesById[4] = "OP_F2P"] = 4;
        values[valuesById[5] = "OP_P2P"] = 5;
        values[valuesById[6] = "OP_RAND"] = 6;
        return values;
    })();

    pb.SolitaireRandomArea = (function() {

        /**
         * Properties of a SolitaireRandomArea.
         * @memberof pb
         * @interface ISolitaireRandomArea
         * @property {number|null} [LeftCards] SolitaireRandomArea LeftCards
         * @property {Uint8Array|null} [ShowCards] SolitaireRandomArea ShowCards
         */

        /**
         * Constructs a new SolitaireRandomArea.
         * @memberof pb
         * @classdesc Represents a SolitaireRandomArea.
         * @implements ISolitaireRandomArea
         * @constructor
         * @param {pb.ISolitaireRandomArea=} [properties] Properties to set
         */
        function SolitaireRandomArea(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireRandomArea LeftCards.
         * @member {number} LeftCards
         * @memberof pb.SolitaireRandomArea
         * @instance
         */
        SolitaireRandomArea.prototype.LeftCards = 0;

        /**
         * SolitaireRandomArea ShowCards.
         * @member {Uint8Array} ShowCards
         * @memberof pb.SolitaireRandomArea
         * @instance
         */
        SolitaireRandomArea.prototype.ShowCards = $util.newBuffer([]);

        /**
         * Creates a new SolitaireRandomArea instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {pb.ISolitaireRandomArea=} [properties] Properties to set
         * @returns {pb.SolitaireRandomArea} SolitaireRandomArea instance
         */
        SolitaireRandomArea.create = function create(properties) {
            return new SolitaireRandomArea(properties);
        };

        /**
         * Encodes the specified SolitaireRandomArea message. Does not implicitly {@link pb.SolitaireRandomArea.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {pb.ISolitaireRandomArea} message SolitaireRandomArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireRandomArea.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.LeftCards != null && Object.hasOwnProperty.call(message, "LeftCards"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.LeftCards);
            if (message.ShowCards != null && Object.hasOwnProperty.call(message, "ShowCards"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ShowCards);
            return writer;
        };

        /**
         * Encodes the specified SolitaireRandomArea message, length delimited. Does not implicitly {@link pb.SolitaireRandomArea.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {pb.ISolitaireRandomArea} message SolitaireRandomArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireRandomArea.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireRandomArea message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireRandomArea} SolitaireRandomArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireRandomArea.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireRandomArea();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.LeftCards = reader.int32();
                    break;
                case 2:
                    message.ShowCards = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireRandomArea message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireRandomArea} SolitaireRandomArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireRandomArea.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireRandomArea message.
         * @function verify
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireRandomArea.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.LeftCards != null && message.hasOwnProperty("LeftCards"))
                if (!$util.isInteger(message.LeftCards))
                    return "LeftCards: integer expected";
            if (message.ShowCards != null && message.hasOwnProperty("ShowCards"))
                if (!(message.ShowCards && typeof message.ShowCards.length === "number" || $util.isString(message.ShowCards)))
                    return "ShowCards: buffer expected";
            return null;
        };

        /**
         * Creates a SolitaireRandomArea message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireRandomArea} SolitaireRandomArea
         */
        SolitaireRandomArea.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireRandomArea)
                return object;
            var message = new $root.solitaire.SolitaireRandomArea();
            if (object.LeftCards != null)
                message.LeftCards = object.LeftCards | 0;
            if (object.ShowCards != null)
                if (typeof object.ShowCards === "string")
                    $util.base64.decode(object.ShowCards, message.ShowCards = $util.newBuffer($util.base64.length(object.ShowCards)), 0);
                else if (object.ShowCards.length)
                    message.ShowCards = object.ShowCards;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireRandomArea message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireRandomArea
         * @static
         * @param {pb.SolitaireRandomArea} message SolitaireRandomArea
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireRandomArea.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.LeftCards = 0;
                if (options.bytes === String)
                    object.ShowCards = "";
                else {
                    object.ShowCards = [];
                    if (options.bytes !== Array)
                        object.ShowCards = $util.newBuffer(object.ShowCards);
                }
            }
            if (message.LeftCards != null && message.hasOwnProperty("LeftCards"))
                object.LeftCards = message.LeftCards;
            if (message.ShowCards != null && message.hasOwnProperty("ShowCards"))
                object.ShowCards = options.bytes === String ? $util.base64.encode(message.ShowCards, 0, message.ShowCards.length) : options.bytes === Array ? Array.prototype.slice.call(message.ShowCards) : message.ShowCards;
            return object;
        };

        /**
         * Converts this SolitaireRandomArea to JSON.
         * @function toJSON
         * @memberof pb.SolitaireRandomArea
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireRandomArea.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireRandomArea;
    })();

    pb.SolitairePileArea = (function() {

        /**
         * Properties of a SolitairePileArea.
         * @memberof pb
         * @interface ISolitairePileArea
         * @property {number|null} [LeftCards] SolitairePileArea LeftCards
         * @property {Uint8Array|null} [ShowCards] SolitairePileArea ShowCards
         */

        /**
         * Constructs a new SolitairePileArea.
         * @memberof pb
         * @classdesc Represents a SolitairePileArea.
         * @implements ISolitairePileArea
         * @constructor
         * @param {pb.ISolitairePileArea=} [properties] Properties to set
         */
        function SolitairePileArea(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitairePileArea LeftCards.
         * @member {number} LeftCards
         * @memberof pb.SolitairePileArea
         * @instance
         */
        SolitairePileArea.prototype.LeftCards = 0;

        /**
         * SolitairePileArea ShowCards.
         * @member {Uint8Array} ShowCards
         * @memberof pb.SolitairePileArea
         * @instance
         */
        SolitairePileArea.prototype.ShowCards = $util.newBuffer([]);

        /**
         * Creates a new SolitairePileArea instance using the specified properties.
         * @function create
         * @memberof pb.SolitairePileArea
         * @static
         * @param {pb.ISolitairePileArea=} [properties] Properties to set
         * @returns {pb.SolitairePileArea} SolitairePileArea instance
         */
        SolitairePileArea.create = function create(properties) {
            return new SolitairePileArea(properties);
        };

        /**
         * Encodes the specified SolitairePileArea message. Does not implicitly {@link pb.SolitairePileArea.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitairePileArea
         * @static
         * @param {pb.ISolitairePileArea} message SolitairePileArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitairePileArea.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.LeftCards != null && Object.hasOwnProperty.call(message, "LeftCards"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.LeftCards);
            if (message.ShowCards != null && Object.hasOwnProperty.call(message, "ShowCards"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ShowCards);
            return writer;
        };

        /**
         * Encodes the specified SolitairePileArea message, length delimited. Does not implicitly {@link pb.SolitairePileArea.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitairePileArea
         * @static
         * @param {pb.ISolitairePileArea} message SolitairePileArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitairePileArea.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitairePileArea message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitairePileArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitairePileArea} SolitairePileArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitairePileArea.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitairePileArea();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.LeftCards = reader.int32();
                    break;
                case 2:
                    message.ShowCards = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitairePileArea message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitairePileArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitairePileArea} SolitairePileArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitairePileArea.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitairePileArea message.
         * @function verify
         * @memberof pb.SolitairePileArea
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitairePileArea.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.LeftCards != null && message.hasOwnProperty("LeftCards"))
                if (!$util.isInteger(message.LeftCards))
                    return "LeftCards: integer expected";
            if (message.ShowCards != null && message.hasOwnProperty("ShowCards"))
                if (!(message.ShowCards && typeof message.ShowCards.length === "number" || $util.isString(message.ShowCards)))
                    return "ShowCards: buffer expected";
            return null;
        };

        /**
         * Creates a SolitairePileArea message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitairePileArea
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitairePileArea} SolitairePileArea
         */
        SolitairePileArea.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitairePileArea)
                return object;
            var message = new $root.solitaire.SolitairePileArea();
            if (object.LeftCards != null)
                message.LeftCards = object.LeftCards | 0;
            if (object.ShowCards != null)
                if (typeof object.ShowCards === "string")
                    $util.base64.decode(object.ShowCards, message.ShowCards = $util.newBuffer($util.base64.length(object.ShowCards)), 0);
                else if (object.ShowCards.length)
                    message.ShowCards = object.ShowCards;
            return message;
        };

        /**
         * Creates a plain object from a SolitairePileArea message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitairePileArea
         * @static
         * @param {pb.SolitairePileArea} message SolitairePileArea
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitairePileArea.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.LeftCards = 0;
                if (options.bytes === String)
                    object.ShowCards = "";
                else {
                    object.ShowCards = [];
                    if (options.bytes !== Array)
                        object.ShowCards = $util.newBuffer(object.ShowCards);
                }
            }
            if (message.LeftCards != null && message.hasOwnProperty("LeftCards"))
                object.LeftCards = message.LeftCards;
            if (message.ShowCards != null && message.hasOwnProperty("ShowCards"))
                object.ShowCards = options.bytes === String ? $util.base64.encode(message.ShowCards, 0, message.ShowCards.length) : options.bytes === Array ? Array.prototype.slice.call(message.ShowCards) : message.ShowCards;
            return object;
        };

        /**
         * Converts this SolitairePileArea to JSON.
         * @function toJSON
         * @memberof pb.SolitairePileArea
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitairePileArea.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitairePileArea;
    })();

    pb.SolitaireCarddesk = (function() {

        /**
         * Properties of a SolitaireCarddesk.
         * @memberof pb
         * @interface ISolitaireCarddesk
         * @property {pb.ISolitaireRandomArea|null} [RandArea] SolitaireCarddesk RandArea
         * @property {Array.<Uint8Array>|null} [FinishedArea] SolitaireCarddesk FinishedArea
         * @property {Array.<pb.ISolitairePileArea>|null} [PileArea] SolitaireCarddesk PileArea
         */

        /**
         * Constructs a new SolitaireCarddesk.
         * @memberof pb
         * @classdesc Represents a SolitaireCarddesk.
         * @implements ISolitaireCarddesk
         * @constructor
         * @param {pb.ISolitaireCarddesk=} [properties] Properties to set
         */
        function SolitaireCarddesk(properties) {
            this.FinishedArea = [];
            this.PileArea = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireCarddesk RandArea.
         * @member {pb.ISolitaireRandomArea|null|undefined} RandArea
         * @memberof pb.SolitaireCarddesk
         * @instance
         */
        SolitaireCarddesk.prototype.RandArea = null;

        /**
         * SolitaireCarddesk FinishedArea.
         * @member {Array.<Uint8Array>} FinishedArea
         * @memberof pb.SolitaireCarddesk
         * @instance
         */
        SolitaireCarddesk.prototype.FinishedArea = $util.emptyArray;

        /**
         * SolitaireCarddesk PileArea.
         * @member {Array.<pb.ISolitairePileArea>} PileArea
         * @memberof pb.SolitaireCarddesk
         * @instance
         */
        SolitaireCarddesk.prototype.PileArea = $util.emptyArray;

        /**
         * Creates a new SolitaireCarddesk instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {pb.ISolitaireCarddesk=} [properties] Properties to set
         * @returns {pb.SolitaireCarddesk} SolitaireCarddesk instance
         */
        SolitaireCarddesk.create = function create(properties) {
            return new SolitaireCarddesk(properties);
        };

        /**
         * Encodes the specified SolitaireCarddesk message. Does not implicitly {@link pb.SolitaireCarddesk.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {pb.ISolitaireCarddesk} message SolitaireCarddesk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireCarddesk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RandArea != null && Object.hasOwnProperty.call(message, "RandArea"))
                $root.solitaire.SolitaireRandomArea.encode(message.RandArea, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.FinishedArea != null && message.FinishedArea.length)
                for (var i = 0; i < message.FinishedArea.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.FinishedArea[i]);
            if (message.PileArea != null && message.PileArea.length)
                for (var i = 0; i < message.PileArea.length; ++i)
                    $root.solitaire.SolitairePileArea.encode(message.PileArea[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SolitaireCarddesk message, length delimited. Does not implicitly {@link pb.SolitaireCarddesk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {pb.ISolitaireCarddesk} message SolitaireCarddesk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireCarddesk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireCarddesk message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireCarddesk} SolitaireCarddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireCarddesk.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireCarddesk();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RandArea = $root.solitaire.SolitaireRandomArea.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.FinishedArea && message.FinishedArea.length))
                        message.FinishedArea = [];
                    message.FinishedArea.push(reader.bytes());
                    break;
                case 3:
                    if (!(message.PileArea && message.PileArea.length))
                        message.PileArea = [];
                    message.PileArea.push($root.solitaire.SolitairePileArea.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireCarddesk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireCarddesk} SolitaireCarddesk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireCarddesk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireCarddesk message.
         * @function verify
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireCarddesk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RandArea != null && message.hasOwnProperty("RandArea")) {
                var error = $root.solitaire.SolitaireRandomArea.verify(message.RandArea);
                if (error)
                    return "RandArea." + error;
            }
            if (message.FinishedArea != null && message.hasOwnProperty("FinishedArea")) {
                if (!Array.isArray(message.FinishedArea))
                    return "FinishedArea: array expected";
                for (var i = 0; i < message.FinishedArea.length; ++i)
                    if (!(message.FinishedArea[i] && typeof message.FinishedArea[i].length === "number" || $util.isString(message.FinishedArea[i])))
                        return "FinishedArea: buffer[] expected";
            }
            if (message.PileArea != null && message.hasOwnProperty("PileArea")) {
                if (!Array.isArray(message.PileArea))
                    return "PileArea: array expected";
                for (var i = 0; i < message.PileArea.length; ++i) {
                    var error = $root.solitaire.SolitairePileArea.verify(message.PileArea[i]);
                    if (error)
                        return "PileArea." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SolitaireCarddesk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireCarddesk} SolitaireCarddesk
         */
        SolitaireCarddesk.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireCarddesk)
                return object;
            var message = new $root.solitaire.SolitaireCarddesk();
            if (object.RandArea != null) {
                if (typeof object.RandArea !== "object")
                    throw TypeError(".pb.SolitaireCarddesk.RandArea: object expected");
                message.RandArea = $root.solitaire.SolitaireRandomArea.fromObject(object.RandArea);
            }
            if (object.FinishedArea) {
                if (!Array.isArray(object.FinishedArea))
                    throw TypeError(".pb.SolitaireCarddesk.FinishedArea: array expected");
                message.FinishedArea = [];
                for (var i = 0; i < object.FinishedArea.length; ++i)
                    if (typeof object.FinishedArea[i] === "string")
                        $util.base64.decode(object.FinishedArea[i], message.FinishedArea[i] = $util.newBuffer($util.base64.length(object.FinishedArea[i])), 0);
                    else if (object.FinishedArea[i].length)
                        message.FinishedArea[i] = object.FinishedArea[i];
            }
            if (object.PileArea) {
                if (!Array.isArray(object.PileArea))
                    throw TypeError(".pb.SolitaireCarddesk.PileArea: array expected");
                message.PileArea = [];
                for (var i = 0; i < object.PileArea.length; ++i) {
                    if (typeof object.PileArea[i] !== "object")
                        throw TypeError(".pb.SolitaireCarddesk.PileArea: object expected");
                    message.PileArea[i] = $root.solitaire.SolitairePileArea.fromObject(object.PileArea[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SolitaireCarddesk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireCarddesk
         * @static
         * @param {pb.SolitaireCarddesk} message SolitaireCarddesk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireCarddesk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.FinishedArea = [];
                object.PileArea = [];
            }
            if (options.defaults)
                object.RandArea = null;
            if (message.RandArea != null && message.hasOwnProperty("RandArea"))
                object.RandArea = $root.solitaire.SolitaireRandomArea.toObject(message.RandArea, options);
            if (message.FinishedArea && message.FinishedArea.length) {
                object.FinishedArea = [];
                for (var j = 0; j < message.FinishedArea.length; ++j)
                    object.FinishedArea[j] = options.bytes === String ? $util.base64.encode(message.FinishedArea[j], 0, message.FinishedArea[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.FinishedArea[j]) : message.FinishedArea[j];
            }
            if (message.PileArea && message.PileArea.length) {
                object.PileArea = [];
                for (var j = 0; j < message.PileArea.length; ++j)
                    object.PileArea[j] = $root.solitaire.SolitairePileArea.toObject(message.PileArea[j], options);
            }
            return object;
        };

        /**
         * Converts this SolitaireCarddesk to JSON.
         * @function toJSON
         * @memberof pb.SolitaireCarddesk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireCarddesk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireCarddesk;
    })();

    pb.SolitaireCompetitionDataReq = (function() {

        /**
         * Properties of a SolitaireCompetitionDataReq.
         * @memberof pb
         * @interface ISolitaireCompetitionDataReq
         */

        /**
         * Constructs a new SolitaireCompetitionDataReq.
         * @memberof pb
         * @classdesc Represents a SolitaireCompetitionDataReq.
         * @implements ISolitaireCompetitionDataReq
         * @constructor
         * @param {pb.ISolitaireCompetitionDataReq=} [properties] Properties to set
         */
        function SolitaireCompetitionDataReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SolitaireCompetitionDataReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {pb.ISolitaireCompetitionDataReq=} [properties] Properties to set
         * @returns {pb.SolitaireCompetitionDataReq} SolitaireCompetitionDataReq instance
         */
        SolitaireCompetitionDataReq.create = function create(properties) {
            return new SolitaireCompetitionDataReq(properties);
        };

        /**
         * Encodes the specified SolitaireCompetitionDataReq message. Does not implicitly {@link pb.SolitaireCompetitionDataReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {pb.ISolitaireCompetitionDataReq} message SolitaireCompetitionDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireCompetitionDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SolitaireCompetitionDataReq message, length delimited. Does not implicitly {@link pb.SolitaireCompetitionDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {pb.ISolitaireCompetitionDataReq} message SolitaireCompetitionDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireCompetitionDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireCompetitionDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireCompetitionDataReq} SolitaireCompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireCompetitionDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireCompetitionDataReq();
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
         * Decodes a SolitaireCompetitionDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireCompetitionDataReq} SolitaireCompetitionDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireCompetitionDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireCompetitionDataReq message.
         * @function verify
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireCompetitionDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SolitaireCompetitionDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireCompetitionDataReq} SolitaireCompetitionDataReq
         */
        SolitaireCompetitionDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireCompetitionDataReq)
                return object;
            return new $root.solitaire.SolitaireCompetitionDataReq();
        };

        /**
         * Creates a plain object from a SolitaireCompetitionDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireCompetitionDataReq
         * @static
         * @param {pb.SolitaireCompetitionDataReq} message SolitaireCompetitionDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireCompetitionDataReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SolitaireCompetitionDataReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireCompetitionDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireCompetitionDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireCompetitionDataReq;
    })();

    pb.SolitaireCompetitionDataResp = (function() {

        /**
         * Properties of a SolitaireCompetitionDataResp.
         * @memberof pb
         * @interface ISolitaireCompetitionDataResp
         * @property {pb.ErrNo|null} [err] SolitaireCompetitionDataResp err
         * @property {pb.ISolitaireCarddesk|null} [CardDesk] SolitaireCompetitionDataResp CardDesk
         * @property {pb.GameStatus|null} [Status] SolitaireCompetitionDataResp Status
         * @property {number|null} [LeftTime] SolitaireCompetitionDataResp LeftTime
         * @property {boolean|null} [CanUndo] SolitaireCompetitionDataResp CanUndo
         * @property {number|null} [FreeRandCount] SolitaireCompetitionDataResp FreeRandCount
         * @property {number|null} [score] SolitaireCompetitionDataResp score
         */

        /**
         * Constructs a new SolitaireCompetitionDataResp.
         * @memberof pb
         * @classdesc Represents a SolitaireCompetitionDataResp.
         * @implements ISolitaireCompetitionDataResp
         * @constructor
         * @param {pb.ISolitaireCompetitionDataResp=} [properties] Properties to set
         */
        function SolitaireCompetitionDataResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireCompetitionDataResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.err = 0;

        /**
         * SolitaireCompetitionDataResp CardDesk.
         * @member {pb.ISolitaireCarddesk|null|undefined} CardDesk
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.CardDesk = null;

        /**
         * SolitaireCompetitionDataResp Status.
         * @member {pb.GameStatus} Status
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.Status = 0;

        /**
         * SolitaireCompetitionDataResp LeftTime.
         * @member {number} LeftTime
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.LeftTime = 0;

        /**
         * SolitaireCompetitionDataResp CanUndo.
         * @member {boolean} CanUndo
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.CanUndo = false;

        /**
         * SolitaireCompetitionDataResp FreeRandCount.
         * @member {number} FreeRandCount
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.FreeRandCount = 0;

        /**
         * SolitaireCompetitionDataResp score.
         * @member {number} score
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         */
        SolitaireCompetitionDataResp.prototype.score = 0;

        /**
         * Creates a new SolitaireCompetitionDataResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {pb.ISolitaireCompetitionDataResp=} [properties] Properties to set
         * @returns {pb.SolitaireCompetitionDataResp} SolitaireCompetitionDataResp instance
         */
        SolitaireCompetitionDataResp.create = function create(properties) {
            return new SolitaireCompetitionDataResp(properties);
        };

        /**
         * Encodes the specified SolitaireCompetitionDataResp message. Does not implicitly {@link pb.SolitaireCompetitionDataResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {pb.ISolitaireCompetitionDataResp} message SolitaireCompetitionDataResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireCompetitionDataResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.CardDesk != null && Object.hasOwnProperty.call(message, "CardDesk"))
                $root.solitaire.SolitaireCarddesk.encode(message.CardDesk, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.Status != null && Object.hasOwnProperty.call(message, "Status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Status);
            if (message.LeftTime != null && Object.hasOwnProperty.call(message, "LeftTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LeftTime);
            if (message.CanUndo != null && Object.hasOwnProperty.call(message, "CanUndo"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.CanUndo);
            if (message.FreeRandCount != null && Object.hasOwnProperty.call(message, "FreeRandCount"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.FreeRandCount);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireCompetitionDataResp message, length delimited. Does not implicitly {@link pb.SolitaireCompetitionDataResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {pb.ISolitaireCompetitionDataResp} message SolitaireCompetitionDataResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireCompetitionDataResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireCompetitionDataResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireCompetitionDataResp} SolitaireCompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireCompetitionDataResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireCompetitionDataResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.CardDesk = $root.solitaire.SolitaireCarddesk.decode(reader, reader.uint32());
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
                case 6:
                    message.FreeRandCount = reader.int32();
                    break;
                case 7:
                    message.score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireCompetitionDataResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireCompetitionDataResp} SolitaireCompetitionDataResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireCompetitionDataResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireCompetitionDataResp message.
         * @function verify
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireCompetitionDataResp.verify = function verify(message) {
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
            if (message.CardDesk != null && message.hasOwnProperty("CardDesk")) {
                var error = $root.solitaire.SolitaireCarddesk.verify(message.CardDesk);
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
            if (message.FreeRandCount != null && message.hasOwnProperty("FreeRandCount"))
                if (!$util.isInteger(message.FreeRandCount))
                    return "FreeRandCount: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireCompetitionDataResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireCompetitionDataResp} SolitaireCompetitionDataResp
         */
        SolitaireCompetitionDataResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireCompetitionDataResp)
                return object;
            var message = new $root.solitaire.SolitaireCompetitionDataResp();
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
            if (object.CardDesk != null) {
                if (typeof object.CardDesk !== "object")
                    throw TypeError(".pb.SolitaireCompetitionDataResp.CardDesk: object expected");
                message.CardDesk = $root.solitaire.SolitaireCarddesk.fromObject(object.CardDesk);
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
            if (object.FreeRandCount != null)
                message.FreeRandCount = object.FreeRandCount | 0;
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireCompetitionDataResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireCompetitionDataResp
         * @static
         * @param {pb.SolitaireCompetitionDataResp} message SolitaireCompetitionDataResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireCompetitionDataResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.CardDesk = null;
                object.Status = options.enums === String ? "Status_Gaming" : 0;
                object.LeftTime = 0;
                object.CanUndo = false;
                object.FreeRandCount = 0;
                object.score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.CardDesk != null && message.hasOwnProperty("CardDesk"))
                object.CardDesk = $root.solitaire.SolitaireCarddesk.toObject(message.CardDesk, options);
            if (message.Status != null && message.hasOwnProperty("Status"))
                object.Status = options.enums === String ? $root.solitaire.GameStatus[message.Status] : message.Status;
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                object.LeftTime = message.LeftTime;
            if (message.CanUndo != null && message.hasOwnProperty("CanUndo"))
                object.CanUndo = message.CanUndo;
            if (message.FreeRandCount != null && message.hasOwnProperty("FreeRandCount"))
                object.FreeRandCount = message.FreeRandCount;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this SolitaireCompetitionDataResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireCompetitionDataResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireCompetitionDataResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireCompetitionDataResp;
    })();

    pb.SolitaireOpRandomReq = (function() {

        /**
         * Properties of a SolitaireOpRandomReq.
         * @memberof pb
         * @interface ISolitaireOpRandomReq
         */

        /**
         * Constructs a new SolitaireOpRandomReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOpRandomReq.
         * @implements ISolitaireOpRandomReq
         * @constructor
         * @param {pb.ISolitaireOpRandomReq=} [properties] Properties to set
         */
        function SolitaireOpRandomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SolitaireOpRandomReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {pb.ISolitaireOpRandomReq=} [properties] Properties to set
         * @returns {pb.SolitaireOpRandomReq} SolitaireOpRandomReq instance
         */
        SolitaireOpRandomReq.create = function create(properties) {
            return new SolitaireOpRandomReq(properties);
        };

        /**
         * Encodes the specified SolitaireOpRandomReq message. Does not implicitly {@link pb.SolitaireOpRandomReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {pb.ISolitaireOpRandomReq} message SolitaireOpRandomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOpRandomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SolitaireOpRandomReq message, length delimited. Does not implicitly {@link pb.SolitaireOpRandomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {pb.ISolitaireOpRandomReq} message SolitaireOpRandomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOpRandomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOpRandomReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOpRandomReq} SolitaireOpRandomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOpRandomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOpRandomReq();
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
         * Decodes a SolitaireOpRandomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOpRandomReq} SolitaireOpRandomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOpRandomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOpRandomReq message.
         * @function verify
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOpRandomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SolitaireOpRandomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOpRandomReq} SolitaireOpRandomReq
         */
        SolitaireOpRandomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOpRandomReq)
                return object;
            return new $root.solitaire.SolitaireOpRandomReq();
        };

        /**
         * Creates a plain object from a SolitaireOpRandomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOpRandomReq
         * @static
         * @param {pb.SolitaireOpRandomReq} message SolitaireOpRandomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOpRandomReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SolitaireOpRandomReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOpRandomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOpRandomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOpRandomReq;
    })();

    pb.SolitaireOpRandomResp = (function() {

        /**
         * Properties of a SolitaireOpRandomResp.
         * @memberof pb
         * @interface ISolitaireOpRandomResp
         * @property {pb.ErrNo|null} [err] SolitaireOpRandomResp err
         * @property {Uint8Array|null} [ShowCards] SolitaireOpRandomResp ShowCards
         * @property {number|null} [LeftCards] SolitaireOpRandomResp LeftCards
         * @property {number|null} [FreeCount] SolitaireOpRandomResp FreeCount
         * @property {number|null} [Score] SolitaireOpRandomResp Score
         */

        /**
         * Constructs a new SolitaireOpRandomResp.
         * @memberof pb
         * @classdesc Represents a SolitaireOpRandomResp.
         * @implements ISolitaireOpRandomResp
         * @constructor
         * @param {pb.ISolitaireOpRandomResp=} [properties] Properties to set
         */
        function SolitaireOpRandomResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOpRandomResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireOpRandomResp
         * @instance
         */
        SolitaireOpRandomResp.prototype.err = 0;

        /**
         * SolitaireOpRandomResp ShowCards.
         * @member {Uint8Array} ShowCards
         * @memberof pb.SolitaireOpRandomResp
         * @instance
         */
        SolitaireOpRandomResp.prototype.ShowCards = $util.newBuffer([]);

        /**
         * SolitaireOpRandomResp LeftCards.
         * @member {number} LeftCards
         * @memberof pb.SolitaireOpRandomResp
         * @instance
         */
        SolitaireOpRandomResp.prototype.LeftCards = 0;

        /**
         * SolitaireOpRandomResp FreeCount.
         * @member {number} FreeCount
         * @memberof pb.SolitaireOpRandomResp
         * @instance
         */
        SolitaireOpRandomResp.prototype.FreeCount = 0;

        /**
         * SolitaireOpRandomResp Score.
         * @member {number} Score
         * @memberof pb.SolitaireOpRandomResp
         * @instance
         */
        SolitaireOpRandomResp.prototype.Score = 0;

        /**
         * Creates a new SolitaireOpRandomResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {pb.ISolitaireOpRandomResp=} [properties] Properties to set
         * @returns {pb.SolitaireOpRandomResp} SolitaireOpRandomResp instance
         */
        SolitaireOpRandomResp.create = function create(properties) {
            return new SolitaireOpRandomResp(properties);
        };

        /**
         * Encodes the specified SolitaireOpRandomResp message. Does not implicitly {@link pb.SolitaireOpRandomResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {pb.ISolitaireOpRandomResp} message SolitaireOpRandomResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOpRandomResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.ShowCards != null && Object.hasOwnProperty.call(message, "ShowCards"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ShowCards);
            if (message.LeftCards != null && Object.hasOwnProperty.call(message, "LeftCards"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.LeftCards);
            if (message.FreeCount != null && Object.hasOwnProperty.call(message, "FreeCount"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.FreeCount);
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOpRandomResp message, length delimited. Does not implicitly {@link pb.SolitaireOpRandomResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {pb.ISolitaireOpRandomResp} message SolitaireOpRandomResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOpRandomResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOpRandomResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOpRandomResp} SolitaireOpRandomResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOpRandomResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOpRandomResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.ShowCards = reader.bytes();
                    break;
                case 3:
                    message.LeftCards = reader.int32();
                    break;
                case 4:
                    message.FreeCount = reader.int32();
                    break;
                case 5:
                    message.Score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOpRandomResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOpRandomResp} SolitaireOpRandomResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOpRandomResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOpRandomResp message.
         * @function verify
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOpRandomResp.verify = function verify(message) {
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
            if (message.ShowCards != null && message.hasOwnProperty("ShowCards"))
                if (!(message.ShowCards && typeof message.ShowCards.length === "number" || $util.isString(message.ShowCards)))
                    return "ShowCards: buffer expected";
            if (message.LeftCards != null && message.hasOwnProperty("LeftCards"))
                if (!$util.isInteger(message.LeftCards))
                    return "LeftCards: integer expected";
            if (message.FreeCount != null && message.hasOwnProperty("FreeCount"))
                if (!$util.isInteger(message.FreeCount))
                    return "FreeCount: integer expected";
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOpRandomResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOpRandomResp} SolitaireOpRandomResp
         */
        SolitaireOpRandomResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOpRandomResp)
                return object;
            var message = new $root.solitaire.SolitaireOpRandomResp();
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
            if (object.ShowCards != null)
                if (typeof object.ShowCards === "string")
                    $util.base64.decode(object.ShowCards, message.ShowCards = $util.newBuffer($util.base64.length(object.ShowCards)), 0);
                else if (object.ShowCards.length)
                    message.ShowCards = object.ShowCards;
            if (object.LeftCards != null)
                message.LeftCards = object.LeftCards | 0;
            if (object.FreeCount != null)
                message.FreeCount = object.FreeCount | 0;
            if (object.Score != null)
                message.Score = object.Score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOpRandomResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOpRandomResp
         * @static
         * @param {pb.SolitaireOpRandomResp} message SolitaireOpRandomResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOpRandomResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                if (options.bytes === String)
                    object.ShowCards = "";
                else {
                    object.ShowCards = [];
                    if (options.bytes !== Array)
                        object.ShowCards = $util.newBuffer(object.ShowCards);
                }
                object.LeftCards = 0;
                object.FreeCount = 0;
                object.Score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.ShowCards != null && message.hasOwnProperty("ShowCards"))
                object.ShowCards = options.bytes === String ? $util.base64.encode(message.ShowCards, 0, message.ShowCards.length) : options.bytes === Array ? Array.prototype.slice.call(message.ShowCards) : message.ShowCards;
            if (message.LeftCards != null && message.hasOwnProperty("LeftCards"))
                object.LeftCards = message.LeftCards;
            if (message.FreeCount != null && message.hasOwnProperty("FreeCount"))
                object.FreeCount = message.FreeCount;
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            return object;
        };

        /**
         * Converts this SolitaireOpRandomResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOpRandomResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOpRandomResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOpRandomResp;
    })();

    pb.SolitaireOp_R2PReq = (function() {

        /**
         * Properties of a SolitaireOp_R2PReq.
         * @memberof pb
         * @interface ISolitaireOp_R2PReq
         * @property {number|null} [index] SolitaireOp_R2PReq index
         */

        /**
         * Constructs a new SolitaireOp_R2PReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_R2PReq.
         * @implements ISolitaireOp_R2PReq
         * @constructor
         * @param {pb.ISolitaireOp_R2PReq=} [properties] Properties to set
         */
        function SolitaireOp_R2PReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_R2PReq index.
         * @member {number} index
         * @memberof pb.SolitaireOp_R2PReq
         * @instance
         */
        SolitaireOp_R2PReq.prototype.index = 0;

        /**
         * Creates a new SolitaireOp_R2PReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {pb.ISolitaireOp_R2PReq=} [properties] Properties to set
         * @returns {pb.SolitaireOp_R2PReq} SolitaireOp_R2PReq instance
         */
        SolitaireOp_R2PReq.create = function create(properties) {
            return new SolitaireOp_R2PReq(properties);
        };

        /**
         * Encodes the specified SolitaireOp_R2PReq message. Does not implicitly {@link pb.SolitaireOp_R2PReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {pb.ISolitaireOp_R2PReq} message SolitaireOp_R2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2PReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_R2PReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2PReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {pb.ISolitaireOp_R2PReq} message SolitaireOp_R2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2PReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_R2PReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_R2PReq} SolitaireOp_R2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2PReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_R2PReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.index = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_R2PReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_R2PReq} SolitaireOp_R2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2PReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_R2PReq message.
         * @function verify
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_R2PReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_R2PReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_R2PReq} SolitaireOp_R2PReq
         */
        SolitaireOp_R2PReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_R2PReq)
                return object;
            var message = new $root.solitaire.SolitaireOp_R2PReq();
            if (object.index != null)
                message.index = object.index | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_R2PReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_R2PReq
         * @static
         * @param {pb.SolitaireOp_R2PReq} message SolitaireOp_R2PReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_R2PReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.index = 0;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            return object;
        };

        /**
         * Converts this SolitaireOp_R2PReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_R2PReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_R2PReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_R2PReq;
    })();

    pb.SolitaireOp_R2PResp = (function() {

        /**
         * Properties of a SolitaireOp_R2PResp.
         * @memberof pb
         * @interface ISolitaireOp_R2PResp
         * @property {pb.ErrNo|null} [err] SolitaireOp_R2PResp err
         * @property {number|null} [Score] SolitaireOp_R2PResp Score
         */

        /**
         * Constructs a new SolitaireOp_R2PResp.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_R2PResp.
         * @implements ISolitaireOp_R2PResp
         * @constructor
         * @param {pb.ISolitaireOp_R2PResp=} [properties] Properties to set
         */
        function SolitaireOp_R2PResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_R2PResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireOp_R2PResp
         * @instance
         */
        SolitaireOp_R2PResp.prototype.err = 0;

        /**
         * SolitaireOp_R2PResp Score.
         * @member {number} Score
         * @memberof pb.SolitaireOp_R2PResp
         * @instance
         */
        SolitaireOp_R2PResp.prototype.Score = 0;

        /**
         * Creates a new SolitaireOp_R2PResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {pb.ISolitaireOp_R2PResp=} [properties] Properties to set
         * @returns {pb.SolitaireOp_R2PResp} SolitaireOp_R2PResp instance
         */
        SolitaireOp_R2PResp.create = function create(properties) {
            return new SolitaireOp_R2PResp(properties);
        };

        /**
         * Encodes the specified SolitaireOp_R2PResp message. Does not implicitly {@link pb.SolitaireOp_R2PResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {pb.ISolitaireOp_R2PResp} message SolitaireOp_R2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2PResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_R2PResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2PResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {pb.ISolitaireOp_R2PResp} message SolitaireOp_R2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2PResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_R2PResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_R2PResp} SolitaireOp_R2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2PResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_R2PResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.Score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_R2PResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_R2PResp} SolitaireOp_R2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2PResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_R2PResp message.
         * @function verify
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_R2PResp.verify = function verify(message) {
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
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_R2PResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_R2PResp} SolitaireOp_R2PResp
         */
        SolitaireOp_R2PResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_R2PResp)
                return object;
            var message = new $root.solitaire.SolitaireOp_R2PResp();
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
            if (object.Score != null)
                message.Score = object.Score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_R2PResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_R2PResp
         * @static
         * @param {pb.SolitaireOp_R2PResp} message SolitaireOp_R2PResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_R2PResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.Score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            return object;
        };

        /**
         * Converts this SolitaireOp_R2PResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_R2PResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_R2PResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_R2PResp;
    })();

    pb.SolitaireOp_R2FReq = (function() {

        /**
         * Properties of a SolitaireOp_R2FReq.
         * @memberof pb
         * @interface ISolitaireOp_R2FReq
         * @property {number|null} [index] SolitaireOp_R2FReq index
         */

        /**
         * Constructs a new SolitaireOp_R2FReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_R2FReq.
         * @implements ISolitaireOp_R2FReq
         * @constructor
         * @param {pb.ISolitaireOp_R2FReq=} [properties] Properties to set
         */
        function SolitaireOp_R2FReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_R2FReq index.
         * @member {number} index
         * @memberof pb.SolitaireOp_R2FReq
         * @instance
         */
        SolitaireOp_R2FReq.prototype.index = 0;

        /**
         * Creates a new SolitaireOp_R2FReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {pb.ISolitaireOp_R2FReq=} [properties] Properties to set
         * @returns {pb.SolitaireOp_R2FReq} SolitaireOp_R2FReq instance
         */
        SolitaireOp_R2FReq.create = function create(properties) {
            return new SolitaireOp_R2FReq(properties);
        };

        /**
         * Encodes the specified SolitaireOp_R2FReq message. Does not implicitly {@link pb.SolitaireOp_R2FReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {pb.ISolitaireOp_R2FReq} message SolitaireOp_R2FReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2FReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_R2FReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2FReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {pb.ISolitaireOp_R2FReq} message SolitaireOp_R2FReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2FReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_R2FReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_R2FReq} SolitaireOp_R2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2FReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_R2FReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.index = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_R2FReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_R2FReq} SolitaireOp_R2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2FReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_R2FReq message.
         * @function verify
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_R2FReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_R2FReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_R2FReq} SolitaireOp_R2FReq
         */
        SolitaireOp_R2FReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_R2FReq)
                return object;
            var message = new $root.solitaire.SolitaireOp_R2FReq();
            if (object.index != null)
                message.index = object.index | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_R2FReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_R2FReq
         * @static
         * @param {pb.SolitaireOp_R2FReq} message SolitaireOp_R2FReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_R2FReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.index = 0;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            return object;
        };

        /**
         * Converts this SolitaireOp_R2FReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_R2FReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_R2FReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_R2FReq;
    })();

    pb.SolitaireOp_R2FResp = (function() {

        /**
         * Properties of a SolitaireOp_R2FResp.
         * @memberof pb
         * @interface ISolitaireOp_R2FResp
         * @property {pb.ErrNo|null} [err] SolitaireOp_R2FResp err
         * @property {number|null} [Score] SolitaireOp_R2FResp Score
         */

        /**
         * Constructs a new SolitaireOp_R2FResp.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_R2FResp.
         * @implements ISolitaireOp_R2FResp
         * @constructor
         * @param {pb.ISolitaireOp_R2FResp=} [properties] Properties to set
         */
        function SolitaireOp_R2FResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_R2FResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireOp_R2FResp
         * @instance
         */
        SolitaireOp_R2FResp.prototype.err = 0;

        /**
         * SolitaireOp_R2FResp Score.
         * @member {number} Score
         * @memberof pb.SolitaireOp_R2FResp
         * @instance
         */
        SolitaireOp_R2FResp.prototype.Score = 0;

        /**
         * Creates a new SolitaireOp_R2FResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {pb.ISolitaireOp_R2FResp=} [properties] Properties to set
         * @returns {pb.SolitaireOp_R2FResp} SolitaireOp_R2FResp instance
         */
        SolitaireOp_R2FResp.create = function create(properties) {
            return new SolitaireOp_R2FResp(properties);
        };

        /**
         * Encodes the specified SolitaireOp_R2FResp message. Does not implicitly {@link pb.SolitaireOp_R2FResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {pb.ISolitaireOp_R2FResp} message SolitaireOp_R2FResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2FResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_R2FResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_R2FResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {pb.ISolitaireOp_R2FResp} message SolitaireOp_R2FResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_R2FResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_R2FResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_R2FResp} SolitaireOp_R2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2FResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_R2FResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.Score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_R2FResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_R2FResp} SolitaireOp_R2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_R2FResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_R2FResp message.
         * @function verify
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_R2FResp.verify = function verify(message) {
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
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_R2FResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_R2FResp} SolitaireOp_R2FResp
         */
        SolitaireOp_R2FResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_R2FResp)
                return object;
            var message = new $root.solitaire.SolitaireOp_R2FResp();
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
            if (object.Score != null)
                message.Score = object.Score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_R2FResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_R2FResp
         * @static
         * @param {pb.SolitaireOp_R2FResp} message SolitaireOp_R2FResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_R2FResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.Score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            return object;
        };

        /**
         * Converts this SolitaireOp_R2FResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_R2FResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_R2FResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_R2FResp;
    })();

    pb.SolitaireOp_P2FReq = (function() {

        /**
         * Properties of a SolitaireOp_P2FReq.
         * @memberof pb
         * @interface ISolitaireOp_P2FReq
         * @property {number|null} [SrcIndex] SolitaireOp_P2FReq SrcIndex
         * @property {number|null} [DestIndex] SolitaireOp_P2FReq DestIndex
         */

        /**
         * Constructs a new SolitaireOp_P2FReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_P2FReq.
         * @implements ISolitaireOp_P2FReq
         * @constructor
         * @param {pb.ISolitaireOp_P2FReq=} [properties] Properties to set
         */
        function SolitaireOp_P2FReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_P2FReq SrcIndex.
         * @member {number} SrcIndex
         * @memberof pb.SolitaireOp_P2FReq
         * @instance
         */
        SolitaireOp_P2FReq.prototype.SrcIndex = 0;

        /**
         * SolitaireOp_P2FReq DestIndex.
         * @member {number} DestIndex
         * @memberof pb.SolitaireOp_P2FReq
         * @instance
         */
        SolitaireOp_P2FReq.prototype.DestIndex = 0;

        /**
         * Creates a new SolitaireOp_P2FReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {pb.ISolitaireOp_P2FReq=} [properties] Properties to set
         * @returns {pb.SolitaireOp_P2FReq} SolitaireOp_P2FReq instance
         */
        SolitaireOp_P2FReq.create = function create(properties) {
            return new SolitaireOp_P2FReq(properties);
        };

        /**
         * Encodes the specified SolitaireOp_P2FReq message. Does not implicitly {@link pb.SolitaireOp_P2FReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {pb.ISolitaireOp_P2FReq} message SolitaireOp_P2FReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2FReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.SrcIndex != null && Object.hasOwnProperty.call(message, "SrcIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.SrcIndex);
            if (message.DestIndex != null && Object.hasOwnProperty.call(message, "DestIndex"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DestIndex);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_P2FReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2FReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {pb.ISolitaireOp_P2FReq} message SolitaireOp_P2FReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2FReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_P2FReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_P2FReq} SolitaireOp_P2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2FReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_P2FReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.SrcIndex = reader.int32();
                    break;
                case 2:
                    message.DestIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_P2FReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_P2FReq} SolitaireOp_P2FReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2FReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_P2FReq message.
         * @function verify
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_P2FReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                if (!$util.isInteger(message.SrcIndex))
                    return "SrcIndex: integer expected";
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                if (!$util.isInteger(message.DestIndex))
                    return "DestIndex: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_P2FReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_P2FReq} SolitaireOp_P2FReq
         */
        SolitaireOp_P2FReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_P2FReq)
                return object;
            var message = new $root.solitaire.SolitaireOp_P2FReq();
            if (object.SrcIndex != null)
                message.SrcIndex = object.SrcIndex | 0;
            if (object.DestIndex != null)
                message.DestIndex = object.DestIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_P2FReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_P2FReq
         * @static
         * @param {pb.SolitaireOp_P2FReq} message SolitaireOp_P2FReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_P2FReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.SrcIndex = 0;
                object.DestIndex = 0;
            }
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                object.SrcIndex = message.SrcIndex;
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                object.DestIndex = message.DestIndex;
            return object;
        };

        /**
         * Converts this SolitaireOp_P2FReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_P2FReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_P2FReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_P2FReq;
    })();

    pb.SolitaireOp_P2FResp = (function() {

        /**
         * Properties of a SolitaireOp_P2FResp.
         * @memberof pb
         * @interface ISolitaireOp_P2FResp
         * @property {pb.ErrNo|null} [err] SolitaireOp_P2FResp err
         * @property {number|null} [NewCard] SolitaireOp_P2FResp NewCard
         * @property {number|null} [Index] SolitaireOp_P2FResp Index
         * @property {number|null} [LeftCard] SolitaireOp_P2FResp LeftCard
         * @property {number|null} [Score] SolitaireOp_P2FResp Score
         */

        /**
         * Constructs a new SolitaireOp_P2FResp.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_P2FResp.
         * @implements ISolitaireOp_P2FResp
         * @constructor
         * @param {pb.ISolitaireOp_P2FResp=} [properties] Properties to set
         */
        function SolitaireOp_P2FResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_P2FResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireOp_P2FResp
         * @instance
         */
        SolitaireOp_P2FResp.prototype.err = 0;

        /**
         * SolitaireOp_P2FResp NewCard.
         * @member {number} NewCard
         * @memberof pb.SolitaireOp_P2FResp
         * @instance
         */
        SolitaireOp_P2FResp.prototype.NewCard = 0;

        /**
         * SolitaireOp_P2FResp Index.
         * @member {number} Index
         * @memberof pb.SolitaireOp_P2FResp
         * @instance
         */
        SolitaireOp_P2FResp.prototype.Index = 0;

        /**
         * SolitaireOp_P2FResp LeftCard.
         * @member {number} LeftCard
         * @memberof pb.SolitaireOp_P2FResp
         * @instance
         */
        SolitaireOp_P2FResp.prototype.LeftCard = 0;

        /**
         * SolitaireOp_P2FResp Score.
         * @member {number} Score
         * @memberof pb.SolitaireOp_P2FResp
         * @instance
         */
        SolitaireOp_P2FResp.prototype.Score = 0;

        /**
         * Creates a new SolitaireOp_P2FResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {pb.ISolitaireOp_P2FResp=} [properties] Properties to set
         * @returns {pb.SolitaireOp_P2FResp} SolitaireOp_P2FResp instance
         */
        SolitaireOp_P2FResp.create = function create(properties) {
            return new SolitaireOp_P2FResp(properties);
        };

        /**
         * Encodes the specified SolitaireOp_P2FResp message. Does not implicitly {@link pb.SolitaireOp_P2FResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {pb.ISolitaireOp_P2FResp} message SolitaireOp_P2FResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2FResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.NewCard != null && Object.hasOwnProperty.call(message, "NewCard"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.NewCard);
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Index);
            if (message.LeftCard != null && Object.hasOwnProperty.call(message, "LeftCard"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LeftCard);
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_P2FResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2FResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {pb.ISolitaireOp_P2FResp} message SolitaireOp_P2FResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2FResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_P2FResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_P2FResp} SolitaireOp_P2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2FResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_P2FResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.NewCard = reader.int32();
                    break;
                case 3:
                    message.Index = reader.int32();
                    break;
                case 4:
                    message.LeftCard = reader.int32();
                    break;
                case 5:
                    message.Score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_P2FResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_P2FResp} SolitaireOp_P2FResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2FResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_P2FResp message.
         * @function verify
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_P2FResp.verify = function verify(message) {
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
            if (message.NewCard != null && message.hasOwnProperty("NewCard"))
                if (!$util.isInteger(message.NewCard))
                    return "NewCard: integer expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            if (message.LeftCard != null && message.hasOwnProperty("LeftCard"))
                if (!$util.isInteger(message.LeftCard))
                    return "LeftCard: integer expected";
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_P2FResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_P2FResp} SolitaireOp_P2FResp
         */
        SolitaireOp_P2FResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_P2FResp)
                return object;
            var message = new $root.solitaire.SolitaireOp_P2FResp();
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
            if (object.NewCard != null)
                message.NewCard = object.NewCard | 0;
            if (object.Index != null)
                message.Index = object.Index | 0;
            if (object.LeftCard != null)
                message.LeftCard = object.LeftCard | 0;
            if (object.Score != null)
                message.Score = object.Score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_P2FResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_P2FResp
         * @static
         * @param {pb.SolitaireOp_P2FResp} message SolitaireOp_P2FResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_P2FResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.NewCard = 0;
                object.Index = 0;
                object.LeftCard = 0;
                object.Score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.NewCard != null && message.hasOwnProperty("NewCard"))
                object.NewCard = message.NewCard;
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            if (message.LeftCard != null && message.hasOwnProperty("LeftCard"))
                object.LeftCard = message.LeftCard;
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            return object;
        };

        /**
         * Converts this SolitaireOp_P2FResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_P2FResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_P2FResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_P2FResp;
    })();

    pb.SolitaireOp_F2PReq = (function() {

        /**
         * Properties of a SolitaireOp_F2PReq.
         * @memberof pb
         * @interface ISolitaireOp_F2PReq
         * @property {number|null} [SrcIndex] SolitaireOp_F2PReq SrcIndex
         * @property {number|null} [DestIndex] SolitaireOp_F2PReq DestIndex
         */

        /**
         * Constructs a new SolitaireOp_F2PReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_F2PReq.
         * @implements ISolitaireOp_F2PReq
         * @constructor
         * @param {pb.ISolitaireOp_F2PReq=} [properties] Properties to set
         */
        function SolitaireOp_F2PReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_F2PReq SrcIndex.
         * @member {number} SrcIndex
         * @memberof pb.SolitaireOp_F2PReq
         * @instance
         */
        SolitaireOp_F2PReq.prototype.SrcIndex = 0;

        /**
         * SolitaireOp_F2PReq DestIndex.
         * @member {number} DestIndex
         * @memberof pb.SolitaireOp_F2PReq
         * @instance
         */
        SolitaireOp_F2PReq.prototype.DestIndex = 0;

        /**
         * Creates a new SolitaireOp_F2PReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {pb.ISolitaireOp_F2PReq=} [properties] Properties to set
         * @returns {pb.SolitaireOp_F2PReq} SolitaireOp_F2PReq instance
         */
        SolitaireOp_F2PReq.create = function create(properties) {
            return new SolitaireOp_F2PReq(properties);
        };

        /**
         * Encodes the specified SolitaireOp_F2PReq message. Does not implicitly {@link pb.SolitaireOp_F2PReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {pb.ISolitaireOp_F2PReq} message SolitaireOp_F2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_F2PReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.SrcIndex != null && Object.hasOwnProperty.call(message, "SrcIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.SrcIndex);
            if (message.DestIndex != null && Object.hasOwnProperty.call(message, "DestIndex"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DestIndex);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_F2PReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_F2PReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {pb.ISolitaireOp_F2PReq} message SolitaireOp_F2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_F2PReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_F2PReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_F2PReq} SolitaireOp_F2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_F2PReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_F2PReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.SrcIndex = reader.int32();
                    break;
                case 2:
                    message.DestIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_F2PReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_F2PReq} SolitaireOp_F2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_F2PReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_F2PReq message.
         * @function verify
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_F2PReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                if (!$util.isInteger(message.SrcIndex))
                    return "SrcIndex: integer expected";
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                if (!$util.isInteger(message.DestIndex))
                    return "DestIndex: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_F2PReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_F2PReq} SolitaireOp_F2PReq
         */
        SolitaireOp_F2PReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_F2PReq)
                return object;
            var message = new $root.solitaire.SolitaireOp_F2PReq();
            if (object.SrcIndex != null)
                message.SrcIndex = object.SrcIndex | 0;
            if (object.DestIndex != null)
                message.DestIndex = object.DestIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_F2PReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_F2PReq
         * @static
         * @param {pb.SolitaireOp_F2PReq} message SolitaireOp_F2PReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_F2PReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.SrcIndex = 0;
                object.DestIndex = 0;
            }
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                object.SrcIndex = message.SrcIndex;
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                object.DestIndex = message.DestIndex;
            return object;
        };

        /**
         * Converts this SolitaireOp_F2PReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_F2PReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_F2PReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_F2PReq;
    })();

    pb.SolitaireOp_F2PResp = (function() {

        /**
         * Properties of a SolitaireOp_F2PResp.
         * @memberof pb
         * @interface ISolitaireOp_F2PResp
         * @property {pb.ErrNo|null} [err] SolitaireOp_F2PResp err
         * @property {number|null} [Score] SolitaireOp_F2PResp Score
         */

        /**
         * Constructs a new SolitaireOp_F2PResp.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_F2PResp.
         * @implements ISolitaireOp_F2PResp
         * @constructor
         * @param {pb.ISolitaireOp_F2PResp=} [properties] Properties to set
         */
        function SolitaireOp_F2PResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_F2PResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireOp_F2PResp
         * @instance
         */
        SolitaireOp_F2PResp.prototype.err = 0;

        /**
         * SolitaireOp_F2PResp Score.
         * @member {number} Score
         * @memberof pb.SolitaireOp_F2PResp
         * @instance
         */
        SolitaireOp_F2PResp.prototype.Score = 0;

        /**
         * Creates a new SolitaireOp_F2PResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {pb.ISolitaireOp_F2PResp=} [properties] Properties to set
         * @returns {pb.SolitaireOp_F2PResp} SolitaireOp_F2PResp instance
         */
        SolitaireOp_F2PResp.create = function create(properties) {
            return new SolitaireOp_F2PResp(properties);
        };

        /**
         * Encodes the specified SolitaireOp_F2PResp message. Does not implicitly {@link pb.SolitaireOp_F2PResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {pb.ISolitaireOp_F2PResp} message SolitaireOp_F2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_F2PResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_F2PResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_F2PResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {pb.ISolitaireOp_F2PResp} message SolitaireOp_F2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_F2PResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_F2PResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_F2PResp} SolitaireOp_F2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_F2PResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_F2PResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.Score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_F2PResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_F2PResp} SolitaireOp_F2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_F2PResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_F2PResp message.
         * @function verify
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_F2PResp.verify = function verify(message) {
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
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_F2PResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_F2PResp} SolitaireOp_F2PResp
         */
        SolitaireOp_F2PResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_F2PResp)
                return object;
            var message = new $root.solitaire.SolitaireOp_F2PResp();
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
            if (object.Score != null)
                message.Score = object.Score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_F2PResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_F2PResp
         * @static
         * @param {pb.SolitaireOp_F2PResp} message SolitaireOp_F2PResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_F2PResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.Score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            return object;
        };

        /**
         * Converts this SolitaireOp_F2PResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_F2PResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_F2PResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_F2PResp;
    })();

    pb.SolitaireOp_P2PReq = (function() {

        /**
         * Properties of a SolitaireOp_P2PReq.
         * @memberof pb
         * @interface ISolitaireOp_P2PReq
         * @property {number|null} [SrcIndex] SolitaireOp_P2PReq SrcIndex
         * @property {number|null} [Number] SolitaireOp_P2PReq Number
         * @property {number|null} [DestIndex] SolitaireOp_P2PReq DestIndex
         */

        /**
         * Constructs a new SolitaireOp_P2PReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_P2PReq.
         * @implements ISolitaireOp_P2PReq
         * @constructor
         * @param {pb.ISolitaireOp_P2PReq=} [properties] Properties to set
         */
        function SolitaireOp_P2PReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_P2PReq SrcIndex.
         * @member {number} SrcIndex
         * @memberof pb.SolitaireOp_P2PReq
         * @instance
         */
        SolitaireOp_P2PReq.prototype.SrcIndex = 0;

        /**
         * SolitaireOp_P2PReq Number.
         * @member {number} Number
         * @memberof pb.SolitaireOp_P2PReq
         * @instance
         */
        SolitaireOp_P2PReq.prototype.Number = 0;

        /**
         * SolitaireOp_P2PReq DestIndex.
         * @member {number} DestIndex
         * @memberof pb.SolitaireOp_P2PReq
         * @instance
         */
        SolitaireOp_P2PReq.prototype.DestIndex = 0;

        /**
         * Creates a new SolitaireOp_P2PReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {pb.ISolitaireOp_P2PReq=} [properties] Properties to set
         * @returns {pb.SolitaireOp_P2PReq} SolitaireOp_P2PReq instance
         */
        SolitaireOp_P2PReq.create = function create(properties) {
            return new SolitaireOp_P2PReq(properties);
        };

        /**
         * Encodes the specified SolitaireOp_P2PReq message. Does not implicitly {@link pb.SolitaireOp_P2PReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {pb.ISolitaireOp_P2PReq} message SolitaireOp_P2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2PReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.SrcIndex != null && Object.hasOwnProperty.call(message, "SrcIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.SrcIndex);
            if (message.Number != null && Object.hasOwnProperty.call(message, "Number"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Number);
            if (message.DestIndex != null && Object.hasOwnProperty.call(message, "DestIndex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.DestIndex);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_P2PReq message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2PReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {pb.ISolitaireOp_P2PReq} message SolitaireOp_P2PReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2PReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_P2PReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_P2PReq} SolitaireOp_P2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2PReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_P2PReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.SrcIndex = reader.int32();
                    break;
                case 2:
                    message.Number = reader.int32();
                    break;
                case 3:
                    message.DestIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_P2PReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_P2PReq} SolitaireOp_P2PReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2PReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_P2PReq message.
         * @function verify
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_P2PReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                if (!$util.isInteger(message.SrcIndex))
                    return "SrcIndex: integer expected";
            if (message.Number != null && message.hasOwnProperty("Number"))
                if (!$util.isInteger(message.Number))
                    return "Number: integer expected";
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                if (!$util.isInteger(message.DestIndex))
                    return "DestIndex: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_P2PReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_P2PReq} SolitaireOp_P2PReq
         */
        SolitaireOp_P2PReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_P2PReq)
                return object;
            var message = new $root.solitaire.SolitaireOp_P2PReq();
            if (object.SrcIndex != null)
                message.SrcIndex = object.SrcIndex | 0;
            if (object.Number != null)
                message.Number = object.Number | 0;
            if (object.DestIndex != null)
                message.DestIndex = object.DestIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_P2PReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_P2PReq
         * @static
         * @param {pb.SolitaireOp_P2PReq} message SolitaireOp_P2PReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_P2PReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.SrcIndex = 0;
                object.Number = 0;
                object.DestIndex = 0;
            }
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                object.SrcIndex = message.SrcIndex;
            if (message.Number != null && message.hasOwnProperty("Number"))
                object.Number = message.Number;
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                object.DestIndex = message.DestIndex;
            return object;
        };

        /**
         * Converts this SolitaireOp_P2PReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_P2PReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_P2PReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_P2PReq;
    })();

    pb.SolitaireOp_P2PResp = (function() {

        /**
         * Properties of a SolitaireOp_P2PResp.
         * @memberof pb
         * @interface ISolitaireOp_P2PResp
         * @property {pb.ErrNo|null} [err] SolitaireOp_P2PResp err
         * @property {number|null} [NewCard] SolitaireOp_P2PResp NewCard
         * @property {number|null} [Index] SolitaireOp_P2PResp Index
         * @property {number|null} [LeftCard] SolitaireOp_P2PResp LeftCard
         * @property {number|null} [Score] SolitaireOp_P2PResp Score
         */

        /**
         * Constructs a new SolitaireOp_P2PResp.
         * @memberof pb
         * @classdesc Represents a SolitaireOp_P2PResp.
         * @implements ISolitaireOp_P2PResp
         * @constructor
         * @param {pb.ISolitaireOp_P2PResp=} [properties] Properties to set
         */
        function SolitaireOp_P2PResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOp_P2PResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireOp_P2PResp
         * @instance
         */
        SolitaireOp_P2PResp.prototype.err = 0;

        /**
         * SolitaireOp_P2PResp NewCard.
         * @member {number} NewCard
         * @memberof pb.SolitaireOp_P2PResp
         * @instance
         */
        SolitaireOp_P2PResp.prototype.NewCard = 0;

        /**
         * SolitaireOp_P2PResp Index.
         * @member {number} Index
         * @memberof pb.SolitaireOp_P2PResp
         * @instance
         */
        SolitaireOp_P2PResp.prototype.Index = 0;

        /**
         * SolitaireOp_P2PResp LeftCard.
         * @member {number} LeftCard
         * @memberof pb.SolitaireOp_P2PResp
         * @instance
         */
        SolitaireOp_P2PResp.prototype.LeftCard = 0;

        /**
         * SolitaireOp_P2PResp Score.
         * @member {number} Score
         * @memberof pb.SolitaireOp_P2PResp
         * @instance
         */
        SolitaireOp_P2PResp.prototype.Score = 0;

        /**
         * Creates a new SolitaireOp_P2PResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {pb.ISolitaireOp_P2PResp=} [properties] Properties to set
         * @returns {pb.SolitaireOp_P2PResp} SolitaireOp_P2PResp instance
         */
        SolitaireOp_P2PResp.create = function create(properties) {
            return new SolitaireOp_P2PResp(properties);
        };

        /**
         * Encodes the specified SolitaireOp_P2PResp message. Does not implicitly {@link pb.SolitaireOp_P2PResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {pb.ISolitaireOp_P2PResp} message SolitaireOp_P2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2PResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.NewCard != null && Object.hasOwnProperty.call(message, "NewCard"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.NewCard);
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Index);
            if (message.LeftCard != null && Object.hasOwnProperty.call(message, "LeftCard"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LeftCard);
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireOp_P2PResp message, length delimited. Does not implicitly {@link pb.SolitaireOp_P2PResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {pb.ISolitaireOp_P2PResp} message SolitaireOp_P2PResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOp_P2PResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOp_P2PResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOp_P2PResp} SolitaireOp_P2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2PResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOp_P2PResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.NewCard = reader.int32();
                    break;
                case 3:
                    message.Index = reader.int32();
                    break;
                case 4:
                    message.LeftCard = reader.int32();
                    break;
                case 5:
                    message.Score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOp_P2PResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOp_P2PResp} SolitaireOp_P2PResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOp_P2PResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOp_P2PResp message.
         * @function verify
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOp_P2PResp.verify = function verify(message) {
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
            if (message.NewCard != null && message.hasOwnProperty("NewCard"))
                if (!$util.isInteger(message.NewCard))
                    return "NewCard: integer expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            if (message.LeftCard != null && message.hasOwnProperty("LeftCard"))
                if (!$util.isInteger(message.LeftCard))
                    return "LeftCard: integer expected";
            if (message.Score != null && message.hasOwnProperty("Score"))
                if (!$util.isInteger(message.Score))
                    return "Score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireOp_P2PResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOp_P2PResp} SolitaireOp_P2PResp
         */
        SolitaireOp_P2PResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOp_P2PResp)
                return object;
            var message = new $root.solitaire.SolitaireOp_P2PResp();
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
            if (object.NewCard != null)
                message.NewCard = object.NewCard | 0;
            if (object.Index != null)
                message.Index = object.Index | 0;
            if (object.LeftCard != null)
                message.LeftCard = object.LeftCard | 0;
            if (object.Score != null)
                message.Score = object.Score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOp_P2PResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOp_P2PResp
         * @static
         * @param {pb.SolitaireOp_P2PResp} message SolitaireOp_P2PResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOp_P2PResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.NewCard = 0;
                object.Index = 0;
                object.LeftCard = 0;
                object.Score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.NewCard != null && message.hasOwnProperty("NewCard"))
                object.NewCard = message.NewCard;
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            if (message.LeftCard != null && message.hasOwnProperty("LeftCard"))
                object.LeftCard = message.LeftCard;
            if (message.Score != null && message.hasOwnProperty("Score"))
                object.Score = message.Score;
            return object;
        };

        /**
         * Converts this SolitaireOp_P2PResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOp_P2PResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOp_P2PResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOp_P2PResp;
    })();

    pb.SolitaireFinishReq = (function() {

        /**
         * Properties of a SolitaireFinishReq.
         * @memberof pb
         * @interface ISolitaireFinishReq
         */

        /**
         * Constructs a new SolitaireFinishReq.
         * @memberof pb
         * @classdesc Represents a SolitaireFinishReq.
         * @implements ISolitaireFinishReq
         * @constructor
         * @param {pb.ISolitaireFinishReq=} [properties] Properties to set
         */
        function SolitaireFinishReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SolitaireFinishReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {pb.ISolitaireFinishReq=} [properties] Properties to set
         * @returns {pb.SolitaireFinishReq} SolitaireFinishReq instance
         */
        SolitaireFinishReq.create = function create(properties) {
            return new SolitaireFinishReq(properties);
        };

        /**
         * Encodes the specified SolitaireFinishReq message. Does not implicitly {@link pb.SolitaireFinishReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {pb.ISolitaireFinishReq} message SolitaireFinishReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireFinishReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SolitaireFinishReq message, length delimited. Does not implicitly {@link pb.SolitaireFinishReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {pb.ISolitaireFinishReq} message SolitaireFinishReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireFinishReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireFinishReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireFinishReq} SolitaireFinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireFinishReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireFinishReq();
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
         * Decodes a SolitaireFinishReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireFinishReq} SolitaireFinishReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireFinishReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireFinishReq message.
         * @function verify
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireFinishReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SolitaireFinishReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireFinishReq} SolitaireFinishReq
         */
        SolitaireFinishReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireFinishReq)
                return object;
            return new $root.solitaire.SolitaireFinishReq();
        };

        /**
         * Creates a plain object from a SolitaireFinishReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireFinishReq
         * @static
         * @param {pb.SolitaireFinishReq} message SolitaireFinishReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireFinishReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SolitaireFinishReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireFinishReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireFinishReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireFinishReq;
    })();

    pb.SolitaireReward = (function() {

        /**
         * Properties of a SolitaireReward.
         * @memberof pb
         * @interface ISolitaireReward
         * @property {number|null} [Score] SolitaireReward Score
         * @property {number|null} [TimeScore] SolitaireReward TimeScore
         */

        /**
         * Constructs a new SolitaireReward.
         * @memberof pb
         * @classdesc Represents a SolitaireReward.
         * @implements ISolitaireReward
         * @constructor
         * @param {pb.ISolitaireReward=} [properties] Properties to set
         */
        function SolitaireReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireReward Score.
         * @member {number} Score
         * @memberof pb.SolitaireReward
         * @instance
         */
        SolitaireReward.prototype.Score = 0;

        /**
         * SolitaireReward TimeScore.
         * @member {number} TimeScore
         * @memberof pb.SolitaireReward
         * @instance
         */
        SolitaireReward.prototype.TimeScore = 0;

        /**
         * Creates a new SolitaireReward instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireReward
         * @static
         * @param {pb.ISolitaireReward=} [properties] Properties to set
         * @returns {pb.SolitaireReward} SolitaireReward instance
         */
        SolitaireReward.create = function create(properties) {
            return new SolitaireReward(properties);
        };

        /**
         * Encodes the specified SolitaireReward message. Does not implicitly {@link pb.SolitaireReward.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireReward
         * @static
         * @param {pb.ISolitaireReward} message SolitaireReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Score != null && Object.hasOwnProperty.call(message, "Score"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Score);
            if (message.TimeScore != null && Object.hasOwnProperty.call(message, "TimeScore"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TimeScore);
            return writer;
        };

        /**
         * Encodes the specified SolitaireReward message, length delimited. Does not implicitly {@link pb.SolitaireReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireReward
         * @static
         * @param {pb.ISolitaireReward} message SolitaireReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireReward message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireReward} SolitaireReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireReward();
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
         * Decodes a SolitaireReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireReward} SolitaireReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireReward message.
         * @function verify
         * @memberof pb.SolitaireReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireReward.verify = function verify(message) {
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
         * Creates a SolitaireReward message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireReward
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireReward} SolitaireReward
         */
        SolitaireReward.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireReward)
                return object;
            var message = new $root.solitaire.SolitaireReward();
            if (object.Score != null)
                message.Score = object.Score | 0;
            if (object.TimeScore != null)
                message.TimeScore = object.TimeScore | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireReward message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireReward
         * @static
         * @param {pb.SolitaireReward} message SolitaireReward
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireReward.toObject = function toObject(message, options) {
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
         * Converts this SolitaireReward to JSON.
         * @function toJSON
         * @memberof pb.SolitaireReward
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireReward.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireReward;
    })();

    pb.SolitaireFinishResp = (function() {

        /**
         * Properties of a SolitaireFinishResp.
         * @memberof pb
         * @interface ISolitaireFinishResp
         * @property {pb.ErrNo|null} [err] SolitaireFinishResp err
         * @property {pb.GameOverReason|null} [reason] SolitaireFinishResp reason
         * @property {pb.ISolitaireReward|null} [reward] SolitaireFinishResp reward
         * @property {number|null} [LiftBestScore] SolitaireFinishResp LiftBestScore
         * @property {number|null} [TodayBestScore] SolitaireFinishResp TodayBestScore
         */

        /**
         * Constructs a new SolitaireFinishResp.
         * @memberof pb
         * @classdesc Represents a SolitaireFinishResp.
         * @implements ISolitaireFinishResp
         * @constructor
         * @param {pb.ISolitaireFinishResp=} [properties] Properties to set
         */
        function SolitaireFinishResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireFinishResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireFinishResp
         * @instance
         */
        SolitaireFinishResp.prototype.err = 0;

        /**
         * SolitaireFinishResp reason.
         * @member {pb.GameOverReason} reason
         * @memberof pb.SolitaireFinishResp
         * @instance
         */
        SolitaireFinishResp.prototype.reason = 0;

        /**
         * SolitaireFinishResp reward.
         * @member {pb.ISolitaireReward|null|undefined} reward
         * @memberof pb.SolitaireFinishResp
         * @instance
         */
        SolitaireFinishResp.prototype.reward = null;

        /**
         * SolitaireFinishResp LiftBestScore.
         * @member {number} LiftBestScore
         * @memberof pb.SolitaireFinishResp
         * @instance
         */
        SolitaireFinishResp.prototype.LiftBestScore = 0;

        /**
         * SolitaireFinishResp TodayBestScore.
         * @member {number} TodayBestScore
         * @memberof pb.SolitaireFinishResp
         * @instance
         */
        SolitaireFinishResp.prototype.TodayBestScore = 0;

        /**
         * Creates a new SolitaireFinishResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {pb.ISolitaireFinishResp=} [properties] Properties to set
         * @returns {pb.SolitaireFinishResp} SolitaireFinishResp instance
         */
        SolitaireFinishResp.create = function create(properties) {
            return new SolitaireFinishResp(properties);
        };

        /**
         * Encodes the specified SolitaireFinishResp message. Does not implicitly {@link pb.SolitaireFinishResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {pb.ISolitaireFinishResp} message SolitaireFinishResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireFinishResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reason);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                $root.solitaire.SolitaireReward.encode(message.reward, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.LiftBestScore != null && Object.hasOwnProperty.call(message, "LiftBestScore"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LiftBestScore);
            if (message.TodayBestScore != null && Object.hasOwnProperty.call(message, "TodayBestScore"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.TodayBestScore);
            return writer;
        };

        /**
         * Encodes the specified SolitaireFinishResp message, length delimited. Does not implicitly {@link pb.SolitaireFinishResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {pb.ISolitaireFinishResp} message SolitaireFinishResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireFinishResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireFinishResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireFinishResp} SolitaireFinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireFinishResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireFinishResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.reason = reader.int32();
                    break;
                case 3:
                    message.reward = $root.solitaire.SolitaireReward.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.LiftBestScore = reader.int32();
                    break;
                case 5:
                    message.TodayBestScore = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireFinishResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireFinishResp} SolitaireFinishResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireFinishResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireFinishResp message.
         * @function verify
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireFinishResp.verify = function verify(message) {
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
                var error = $root.solitaire.SolitaireReward.verify(message.reward);
                if (error)
                    return "reward." + error;
            }
            if (message.LiftBestScore != null && message.hasOwnProperty("LiftBestScore"))
                if (!$util.isInteger(message.LiftBestScore))
                    return "LiftBestScore: integer expected";
            if (message.TodayBestScore != null && message.hasOwnProperty("TodayBestScore"))
                if (!$util.isInteger(message.TodayBestScore))
                    return "TodayBestScore: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireFinishResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireFinishResp} SolitaireFinishResp
         */
        SolitaireFinishResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireFinishResp)
                return object;
            var message = new $root.solitaire.SolitaireFinishResp();
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
                    throw TypeError(".pb.SolitaireFinishResp.reward: object expected");
                message.reward = $root.solitaire.SolitaireReward.fromObject(object.reward);
            }
            if (object.LiftBestScore != null)
                message.LiftBestScore = object.LiftBestScore | 0;
            if (object.TodayBestScore != null)
                message.TodayBestScore = object.TodayBestScore | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireFinishResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireFinishResp
         * @static
         * @param {pb.SolitaireFinishResp} message SolitaireFinishResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireFinishResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.reason = options.enums === String ? "Reason_Auto" : 0;
                object.reward = null;
                object.LiftBestScore = 0;
                object.TodayBestScore = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.solitaire.GameOverReason[message.reason] : message.reason;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = $root.solitaire.SolitaireReward.toObject(message.reward, options);
            if (message.LiftBestScore != null && message.hasOwnProperty("LiftBestScore"))
                object.LiftBestScore = message.LiftBestScore;
            if (message.TodayBestScore != null && message.hasOwnProperty("TodayBestScore"))
                object.TodayBestScore = message.TodayBestScore;
            return object;
        };

        /**
         * Converts this SolitaireFinishResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireFinishResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireFinishResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireFinishResp;
    })();

    pb.SolitairePauseGameReq = (function() {

        /**
         * Properties of a SolitairePauseGameReq.
         * @memberof pb
         * @interface ISolitairePauseGameReq
         */

        /**
         * Constructs a new SolitairePauseGameReq.
         * @memberof pb
         * @classdesc Represents a SolitairePauseGameReq.
         * @implements ISolitairePauseGameReq
         * @constructor
         * @param {pb.ISolitairePauseGameReq=} [properties] Properties to set
         */
        function SolitairePauseGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SolitairePauseGameReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {pb.ISolitairePauseGameReq=} [properties] Properties to set
         * @returns {pb.SolitairePauseGameReq} SolitairePauseGameReq instance
         */
        SolitairePauseGameReq.create = function create(properties) {
            return new SolitairePauseGameReq(properties);
        };

        /**
         * Encodes the specified SolitairePauseGameReq message. Does not implicitly {@link pb.SolitairePauseGameReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {pb.ISolitairePauseGameReq} message SolitairePauseGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitairePauseGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SolitairePauseGameReq message, length delimited. Does not implicitly {@link pb.SolitairePauseGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {pb.ISolitairePauseGameReq} message SolitairePauseGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitairePauseGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitairePauseGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitairePauseGameReq} SolitairePauseGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitairePauseGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitairePauseGameReq();
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
         * Decodes a SolitairePauseGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitairePauseGameReq} SolitairePauseGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitairePauseGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitairePauseGameReq message.
         * @function verify
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitairePauseGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SolitairePauseGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitairePauseGameReq} SolitairePauseGameReq
         */
        SolitairePauseGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitairePauseGameReq)
                return object;
            return new $root.solitaire.SolitairePauseGameReq();
        };

        /**
         * Creates a plain object from a SolitairePauseGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitairePauseGameReq
         * @static
         * @param {pb.SolitairePauseGameReq} message SolitairePauseGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitairePauseGameReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SolitairePauseGameReq to JSON.
         * @function toJSON
         * @memberof pb.SolitairePauseGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitairePauseGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitairePauseGameReq;
    })();

    pb.SolitairePauseGameResp = (function() {

        /**
         * Properties of a SolitairePauseGameResp.
         * @memberof pb
         * @interface ISolitairePauseGameResp
         * @property {pb.ErrNo|null} [err] SolitairePauseGameResp err
         */

        /**
         * Constructs a new SolitairePauseGameResp.
         * @memberof pb
         * @classdesc Represents a SolitairePauseGameResp.
         * @implements ISolitairePauseGameResp
         * @constructor
         * @param {pb.ISolitairePauseGameResp=} [properties] Properties to set
         */
        function SolitairePauseGameResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitairePauseGameResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitairePauseGameResp
         * @instance
         */
        SolitairePauseGameResp.prototype.err = 0;

        /**
         * Creates a new SolitairePauseGameResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {pb.ISolitairePauseGameResp=} [properties] Properties to set
         * @returns {pb.SolitairePauseGameResp} SolitairePauseGameResp instance
         */
        SolitairePauseGameResp.create = function create(properties) {
            return new SolitairePauseGameResp(properties);
        };

        /**
         * Encodes the specified SolitairePauseGameResp message. Does not implicitly {@link pb.SolitairePauseGameResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {pb.ISolitairePauseGameResp} message SolitairePauseGameResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitairePauseGameResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            return writer;
        };

        /**
         * Encodes the specified SolitairePauseGameResp message, length delimited. Does not implicitly {@link pb.SolitairePauseGameResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {pb.ISolitairePauseGameResp} message SolitairePauseGameResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitairePauseGameResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitairePauseGameResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitairePauseGameResp} SolitairePauseGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitairePauseGameResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitairePauseGameResp();
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
         * Decodes a SolitairePauseGameResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitairePauseGameResp} SolitairePauseGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitairePauseGameResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitairePauseGameResp message.
         * @function verify
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitairePauseGameResp.verify = function verify(message) {
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
         * Creates a SolitairePauseGameResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitairePauseGameResp} SolitairePauseGameResp
         */
        SolitairePauseGameResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitairePauseGameResp)
                return object;
            var message = new $root.solitaire.SolitairePauseGameResp();
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
         * Creates a plain object from a SolitairePauseGameResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitairePauseGameResp
         * @static
         * @param {pb.SolitairePauseGameResp} message SolitairePauseGameResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitairePauseGameResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.err = options.enums === String ? "SUCCESS" : 0;
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            return object;
        };

        /**
         * Converts this SolitairePauseGameResp to JSON.
         * @function toJSON
         * @memberof pb.SolitairePauseGameResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitairePauseGameResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitairePauseGameResp;
    })();

    pb.SolitaireRecoverGameReq = (function() {

        /**
         * Properties of a SolitaireRecoverGameReq.
         * @memberof pb
         * @interface ISolitaireRecoverGameReq
         */

        /**
         * Constructs a new SolitaireRecoverGameReq.
         * @memberof pb
         * @classdesc Represents a SolitaireRecoverGameReq.
         * @implements ISolitaireRecoverGameReq
         * @constructor
         * @param {pb.ISolitaireRecoverGameReq=} [properties] Properties to set
         */
        function SolitaireRecoverGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SolitaireRecoverGameReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {pb.ISolitaireRecoverGameReq=} [properties] Properties to set
         * @returns {pb.SolitaireRecoverGameReq} SolitaireRecoverGameReq instance
         */
        SolitaireRecoverGameReq.create = function create(properties) {
            return new SolitaireRecoverGameReq(properties);
        };

        /**
         * Encodes the specified SolitaireRecoverGameReq message. Does not implicitly {@link pb.SolitaireRecoverGameReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {pb.ISolitaireRecoverGameReq} message SolitaireRecoverGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireRecoverGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SolitaireRecoverGameReq message, length delimited. Does not implicitly {@link pb.SolitaireRecoverGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {pb.ISolitaireRecoverGameReq} message SolitaireRecoverGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireRecoverGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireRecoverGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireRecoverGameReq} SolitaireRecoverGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireRecoverGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireRecoverGameReq();
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
         * Decodes a SolitaireRecoverGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireRecoverGameReq} SolitaireRecoverGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireRecoverGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireRecoverGameReq message.
         * @function verify
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireRecoverGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SolitaireRecoverGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireRecoverGameReq} SolitaireRecoverGameReq
         */
        SolitaireRecoverGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireRecoverGameReq)
                return object;
            return new $root.solitaire.SolitaireRecoverGameReq();
        };

        /**
         * Creates a plain object from a SolitaireRecoverGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireRecoverGameReq
         * @static
         * @param {pb.SolitaireRecoverGameReq} message SolitaireRecoverGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireRecoverGameReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SolitaireRecoverGameReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireRecoverGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireRecoverGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireRecoverGameReq;
    })();

    pb.SolitaireRecoverGameResp = (function() {

        /**
         * Properties of a SolitaireRecoverGameResp.
         * @memberof pb
         * @interface ISolitaireRecoverGameResp
         * @property {pb.ErrNo|null} [err] SolitaireRecoverGameResp err
         * @property {number|null} [LeftTime] SolitaireRecoverGameResp LeftTime
         */

        /**
         * Constructs a new SolitaireRecoverGameResp.
         * @memberof pb
         * @classdesc Represents a SolitaireRecoverGameResp.
         * @implements ISolitaireRecoverGameResp
         * @constructor
         * @param {pb.ISolitaireRecoverGameResp=} [properties] Properties to set
         */
        function SolitaireRecoverGameResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireRecoverGameResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireRecoverGameResp
         * @instance
         */
        SolitaireRecoverGameResp.prototype.err = 0;

        /**
         * SolitaireRecoverGameResp LeftTime.
         * @member {number} LeftTime
         * @memberof pb.SolitaireRecoverGameResp
         * @instance
         */
        SolitaireRecoverGameResp.prototype.LeftTime = 0;

        /**
         * Creates a new SolitaireRecoverGameResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {pb.ISolitaireRecoverGameResp=} [properties] Properties to set
         * @returns {pb.SolitaireRecoverGameResp} SolitaireRecoverGameResp instance
         */
        SolitaireRecoverGameResp.create = function create(properties) {
            return new SolitaireRecoverGameResp(properties);
        };

        /**
         * Encodes the specified SolitaireRecoverGameResp message. Does not implicitly {@link pb.SolitaireRecoverGameResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {pb.ISolitaireRecoverGameResp} message SolitaireRecoverGameResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireRecoverGameResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.LeftTime != null && Object.hasOwnProperty.call(message, "LeftTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.LeftTime);
            return writer;
        };

        /**
         * Encodes the specified SolitaireRecoverGameResp message, length delimited. Does not implicitly {@link pb.SolitaireRecoverGameResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {pb.ISolitaireRecoverGameResp} message SolitaireRecoverGameResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireRecoverGameResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireRecoverGameResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireRecoverGameResp} SolitaireRecoverGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireRecoverGameResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireRecoverGameResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
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
         * Decodes a SolitaireRecoverGameResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireRecoverGameResp} SolitaireRecoverGameResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireRecoverGameResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireRecoverGameResp message.
         * @function verify
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireRecoverGameResp.verify = function verify(message) {
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
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                if (!$util.isInteger(message.LeftTime))
                    return "LeftTime: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireRecoverGameResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireRecoverGameResp} SolitaireRecoverGameResp
         */
        SolitaireRecoverGameResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireRecoverGameResp)
                return object;
            var message = new $root.solitaire.SolitaireRecoverGameResp();
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
            if (object.LeftTime != null)
                message.LeftTime = object.LeftTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireRecoverGameResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireRecoverGameResp
         * @static
         * @param {pb.SolitaireRecoverGameResp} message SolitaireRecoverGameResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireRecoverGameResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.LeftTime = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.LeftTime != null && message.hasOwnProperty("LeftTime"))
                object.LeftTime = message.LeftTime;
            return object;
        };

        /**
         * Converts this SolitaireRecoverGameResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireRecoverGameResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireRecoverGameResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireRecoverGameResp;
    })();

    pb.SolitaireUndoReq = (function() {

        /**
         * Properties of a SolitaireUndoReq.
         * @memberof pb
         * @interface ISolitaireUndoReq
         */

        /**
         * Constructs a new SolitaireUndoReq.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoReq.
         * @implements ISolitaireUndoReq
         * @constructor
         * @param {pb.ISolitaireUndoReq=} [properties] Properties to set
         */
        function SolitaireUndoReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SolitaireUndoReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {pb.ISolitaireUndoReq=} [properties] Properties to set
         * @returns {pb.SolitaireUndoReq} SolitaireUndoReq instance
         */
        SolitaireUndoReq.create = function create(properties) {
            return new SolitaireUndoReq(properties);
        };

        /**
         * Encodes the specified SolitaireUndoReq message. Does not implicitly {@link pb.SolitaireUndoReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {pb.ISolitaireUndoReq} message SolitaireUndoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoReq message, length delimited. Does not implicitly {@link pb.SolitaireUndoReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {pb.ISolitaireUndoReq} message SolitaireUndoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoReq} SolitaireUndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoReq();
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
         * Decodes a SolitaireUndoReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoReq} SolitaireUndoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoReq message.
         * @function verify
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoReq} SolitaireUndoReq
         */
        SolitaireUndoReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoReq)
                return object;
            return new $root.solitaire.SolitaireUndoReq();
        };

        /**
         * Creates a plain object from a SolitaireUndoReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoReq
         * @static
         * @param {pb.SolitaireUndoReq} message SolitaireUndoReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SolitaireUndoReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoReq;
    })();

    pb.SolitaireUndoOpR2P = (function() {

        /**
         * Properties of a SolitaireUndoOpR2P.
         * @memberof pb
         * @interface ISolitaireUndoOpR2P
         * @property {number|null} [index] SolitaireUndoOpR2P index
         */

        /**
         * Constructs a new SolitaireUndoOpR2P.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoOpR2P.
         * @implements ISolitaireUndoOpR2P
         * @constructor
         * @param {pb.ISolitaireUndoOpR2P=} [properties] Properties to set
         */
        function SolitaireUndoOpR2P(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoOpR2P index.
         * @member {number} index
         * @memberof pb.SolitaireUndoOpR2P
         * @instance
         */
        SolitaireUndoOpR2P.prototype.index = 0;

        /**
         * Creates a new SolitaireUndoOpR2P instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {pb.ISolitaireUndoOpR2P=} [properties] Properties to set
         * @returns {pb.SolitaireUndoOpR2P} SolitaireUndoOpR2P instance
         */
        SolitaireUndoOpR2P.create = function create(properties) {
            return new SolitaireUndoOpR2P(properties);
        };

        /**
         * Encodes the specified SolitaireUndoOpR2P message. Does not implicitly {@link pb.SolitaireUndoOpR2P.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {pb.ISolitaireUndoOpR2P} message SolitaireUndoOpR2P message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpR2P.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoOpR2P message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpR2P.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {pb.ISolitaireUndoOpR2P} message SolitaireUndoOpR2P message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpR2P.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoOpR2P message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoOpR2P} SolitaireUndoOpR2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpR2P.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoOpR2P();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.index = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoOpR2P message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoOpR2P} SolitaireUndoOpR2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpR2P.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoOpR2P message.
         * @function verify
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoOpR2P.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoOpR2P message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoOpR2P} SolitaireUndoOpR2P
         */
        SolitaireUndoOpR2P.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoOpR2P)
                return object;
            var message = new $root.solitaire.SolitaireUndoOpR2P();
            if (object.index != null)
                message.index = object.index | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoOpR2P message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoOpR2P
         * @static
         * @param {pb.SolitaireUndoOpR2P} message SolitaireUndoOpR2P
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoOpR2P.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.index = 0;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            return object;
        };

        /**
         * Converts this SolitaireUndoOpR2P to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoOpR2P
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoOpR2P.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoOpR2P;
    })();

    pb.SolitaireUndoOpR2F = (function() {

        /**
         * Properties of a SolitaireUndoOpR2F.
         * @memberof pb
         * @interface ISolitaireUndoOpR2F
         * @property {number|null} [index] SolitaireUndoOpR2F index
         */

        /**
         * Constructs a new SolitaireUndoOpR2F.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoOpR2F.
         * @implements ISolitaireUndoOpR2F
         * @constructor
         * @param {pb.ISolitaireUndoOpR2F=} [properties] Properties to set
         */
        function SolitaireUndoOpR2F(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoOpR2F index.
         * @member {number} index
         * @memberof pb.SolitaireUndoOpR2F
         * @instance
         */
        SolitaireUndoOpR2F.prototype.index = 0;

        /**
         * Creates a new SolitaireUndoOpR2F instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {pb.ISolitaireUndoOpR2F=} [properties] Properties to set
         * @returns {pb.SolitaireUndoOpR2F} SolitaireUndoOpR2F instance
         */
        SolitaireUndoOpR2F.create = function create(properties) {
            return new SolitaireUndoOpR2F(properties);
        };

        /**
         * Encodes the specified SolitaireUndoOpR2F message. Does not implicitly {@link pb.SolitaireUndoOpR2F.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {pb.ISolitaireUndoOpR2F} message SolitaireUndoOpR2F message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpR2F.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.index);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoOpR2F message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpR2F.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {pb.ISolitaireUndoOpR2F} message SolitaireUndoOpR2F message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpR2F.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoOpR2F message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoOpR2F} SolitaireUndoOpR2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpR2F.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoOpR2F();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.index = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoOpR2F message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoOpR2F} SolitaireUndoOpR2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpR2F.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoOpR2F message.
         * @function verify
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoOpR2F.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoOpR2F message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoOpR2F} SolitaireUndoOpR2F
         */
        SolitaireUndoOpR2F.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoOpR2F)
                return object;
            var message = new $root.solitaire.SolitaireUndoOpR2F();
            if (object.index != null)
                message.index = object.index | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoOpR2F message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoOpR2F
         * @static
         * @param {pb.SolitaireUndoOpR2F} message SolitaireUndoOpR2F
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoOpR2F.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.index = 0;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            return object;
        };

        /**
         * Converts this SolitaireUndoOpR2F to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoOpR2F
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoOpR2F.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoOpR2F;
    })();

    pb.SolitaireUndoOpP2F = (function() {

        /**
         * Properties of a SolitaireUndoOpP2F.
         * @memberof pb
         * @interface ISolitaireUndoOpP2F
         * @property {number|null} [SrcIndex] SolitaireUndoOpP2F SrcIndex
         * @property {number|null} [DestIndex] SolitaireUndoOpP2F DestIndex
         * @property {boolean|null} [IsMuck] SolitaireUndoOpP2F IsMuck
         */

        /**
         * Constructs a new SolitaireUndoOpP2F.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoOpP2F.
         * @implements ISolitaireUndoOpP2F
         * @constructor
         * @param {pb.ISolitaireUndoOpP2F=} [properties] Properties to set
         */
        function SolitaireUndoOpP2F(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoOpP2F SrcIndex.
         * @member {number} SrcIndex
         * @memberof pb.SolitaireUndoOpP2F
         * @instance
         */
        SolitaireUndoOpP2F.prototype.SrcIndex = 0;

        /**
         * SolitaireUndoOpP2F DestIndex.
         * @member {number} DestIndex
         * @memberof pb.SolitaireUndoOpP2F
         * @instance
         */
        SolitaireUndoOpP2F.prototype.DestIndex = 0;

        /**
         * SolitaireUndoOpP2F IsMuck.
         * @member {boolean} IsMuck
         * @memberof pb.SolitaireUndoOpP2F
         * @instance
         */
        SolitaireUndoOpP2F.prototype.IsMuck = false;

        /**
         * Creates a new SolitaireUndoOpP2F instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {pb.ISolitaireUndoOpP2F=} [properties] Properties to set
         * @returns {pb.SolitaireUndoOpP2F} SolitaireUndoOpP2F instance
         */
        SolitaireUndoOpP2F.create = function create(properties) {
            return new SolitaireUndoOpP2F(properties);
        };

        /**
         * Encodes the specified SolitaireUndoOpP2F message. Does not implicitly {@link pb.SolitaireUndoOpP2F.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {pb.ISolitaireUndoOpP2F} message SolitaireUndoOpP2F message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpP2F.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.SrcIndex != null && Object.hasOwnProperty.call(message, "SrcIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.SrcIndex);
            if (message.DestIndex != null && Object.hasOwnProperty.call(message, "DestIndex"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DestIndex);
            if (message.IsMuck != null && Object.hasOwnProperty.call(message, "IsMuck"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.IsMuck);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoOpP2F message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpP2F.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {pb.ISolitaireUndoOpP2F} message SolitaireUndoOpP2F message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpP2F.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoOpP2F message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoOpP2F} SolitaireUndoOpP2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpP2F.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoOpP2F();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.SrcIndex = reader.int32();
                    break;
                case 2:
                    message.DestIndex = reader.int32();
                    break;
                case 3:
                    message.IsMuck = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoOpP2F message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoOpP2F} SolitaireUndoOpP2F
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpP2F.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoOpP2F message.
         * @function verify
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoOpP2F.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                if (!$util.isInteger(message.SrcIndex))
                    return "SrcIndex: integer expected";
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                if (!$util.isInteger(message.DestIndex))
                    return "DestIndex: integer expected";
            if (message.IsMuck != null && message.hasOwnProperty("IsMuck"))
                if (typeof message.IsMuck !== "boolean")
                    return "IsMuck: boolean expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoOpP2F message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoOpP2F} SolitaireUndoOpP2F
         */
        SolitaireUndoOpP2F.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoOpP2F)
                return object;
            var message = new $root.solitaire.SolitaireUndoOpP2F();
            if (object.SrcIndex != null)
                message.SrcIndex = object.SrcIndex | 0;
            if (object.DestIndex != null)
                message.DestIndex = object.DestIndex | 0;
            if (object.IsMuck != null)
                message.IsMuck = Boolean(object.IsMuck);
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoOpP2F message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoOpP2F
         * @static
         * @param {pb.SolitaireUndoOpP2F} message SolitaireUndoOpP2F
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoOpP2F.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.SrcIndex = 0;
                object.DestIndex = 0;
                object.IsMuck = false;
            }
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                object.SrcIndex = message.SrcIndex;
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                object.DestIndex = message.DestIndex;
            if (message.IsMuck != null && message.hasOwnProperty("IsMuck"))
                object.IsMuck = message.IsMuck;
            return object;
        };

        /**
         * Converts this SolitaireUndoOpP2F to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoOpP2F
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoOpP2F.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoOpP2F;
    })();

    pb.SolitaireUndoOpF2P = (function() {

        /**
         * Properties of a SolitaireUndoOpF2P.
         * @memberof pb
         * @interface ISolitaireUndoOpF2P
         * @property {number|null} [SrcIndex] SolitaireUndoOpF2P SrcIndex
         * @property {number|null} [DestIndex] SolitaireUndoOpF2P DestIndex
         */

        /**
         * Constructs a new SolitaireUndoOpF2P.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoOpF2P.
         * @implements ISolitaireUndoOpF2P
         * @constructor
         * @param {pb.ISolitaireUndoOpF2P=} [properties] Properties to set
         */
        function SolitaireUndoOpF2P(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoOpF2P SrcIndex.
         * @member {number} SrcIndex
         * @memberof pb.SolitaireUndoOpF2P
         * @instance
         */
        SolitaireUndoOpF2P.prototype.SrcIndex = 0;

        /**
         * SolitaireUndoOpF2P DestIndex.
         * @member {number} DestIndex
         * @memberof pb.SolitaireUndoOpF2P
         * @instance
         */
        SolitaireUndoOpF2P.prototype.DestIndex = 0;

        /**
         * Creates a new SolitaireUndoOpF2P instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {pb.ISolitaireUndoOpF2P=} [properties] Properties to set
         * @returns {pb.SolitaireUndoOpF2P} SolitaireUndoOpF2P instance
         */
        SolitaireUndoOpF2P.create = function create(properties) {
            return new SolitaireUndoOpF2P(properties);
        };

        /**
         * Encodes the specified SolitaireUndoOpF2P message. Does not implicitly {@link pb.SolitaireUndoOpF2P.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {pb.ISolitaireUndoOpF2P} message SolitaireUndoOpF2P message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpF2P.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.SrcIndex != null && Object.hasOwnProperty.call(message, "SrcIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.SrcIndex);
            if (message.DestIndex != null && Object.hasOwnProperty.call(message, "DestIndex"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DestIndex);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoOpF2P message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpF2P.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {pb.ISolitaireUndoOpF2P} message SolitaireUndoOpF2P message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpF2P.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoOpF2P message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoOpF2P} SolitaireUndoOpF2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpF2P.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoOpF2P();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.SrcIndex = reader.int32();
                    break;
                case 2:
                    message.DestIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoOpF2P message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoOpF2P} SolitaireUndoOpF2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpF2P.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoOpF2P message.
         * @function verify
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoOpF2P.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                if (!$util.isInteger(message.SrcIndex))
                    return "SrcIndex: integer expected";
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                if (!$util.isInteger(message.DestIndex))
                    return "DestIndex: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoOpF2P message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoOpF2P} SolitaireUndoOpF2P
         */
        SolitaireUndoOpF2P.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoOpF2P)
                return object;
            var message = new $root.solitaire.SolitaireUndoOpF2P();
            if (object.SrcIndex != null)
                message.SrcIndex = object.SrcIndex | 0;
            if (object.DestIndex != null)
                message.DestIndex = object.DestIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoOpF2P message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoOpF2P
         * @static
         * @param {pb.SolitaireUndoOpF2P} message SolitaireUndoOpF2P
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoOpF2P.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.SrcIndex = 0;
                object.DestIndex = 0;
            }
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                object.SrcIndex = message.SrcIndex;
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                object.DestIndex = message.DestIndex;
            return object;
        };

        /**
         * Converts this SolitaireUndoOpF2P to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoOpF2P
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoOpF2P.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoOpF2P;
    })();

    pb.SolitaireUndoOpP2P = (function() {

        /**
         * Properties of a SolitaireUndoOpP2P.
         * @memberof pb
         * @interface ISolitaireUndoOpP2P
         * @property {number|null} [SrcIndex] SolitaireUndoOpP2P SrcIndex
         * @property {number|null} [Number] SolitaireUndoOpP2P Number
         * @property {number|null} [DestIndex] SolitaireUndoOpP2P DestIndex
         * @property {boolean|null} [IsMuck] SolitaireUndoOpP2P IsMuck
         */

        /**
         * Constructs a new SolitaireUndoOpP2P.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoOpP2P.
         * @implements ISolitaireUndoOpP2P
         * @constructor
         * @param {pb.ISolitaireUndoOpP2P=} [properties] Properties to set
         */
        function SolitaireUndoOpP2P(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoOpP2P SrcIndex.
         * @member {number} SrcIndex
         * @memberof pb.SolitaireUndoOpP2P
         * @instance
         */
        SolitaireUndoOpP2P.prototype.SrcIndex = 0;

        /**
         * SolitaireUndoOpP2P Number.
         * @member {number} Number
         * @memberof pb.SolitaireUndoOpP2P
         * @instance
         */
        SolitaireUndoOpP2P.prototype.Number = 0;

        /**
         * SolitaireUndoOpP2P DestIndex.
         * @member {number} DestIndex
         * @memberof pb.SolitaireUndoOpP2P
         * @instance
         */
        SolitaireUndoOpP2P.prototype.DestIndex = 0;

        /**
         * SolitaireUndoOpP2P IsMuck.
         * @member {boolean} IsMuck
         * @memberof pb.SolitaireUndoOpP2P
         * @instance
         */
        SolitaireUndoOpP2P.prototype.IsMuck = false;

        /**
         * Creates a new SolitaireUndoOpP2P instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {pb.ISolitaireUndoOpP2P=} [properties] Properties to set
         * @returns {pb.SolitaireUndoOpP2P} SolitaireUndoOpP2P instance
         */
        SolitaireUndoOpP2P.create = function create(properties) {
            return new SolitaireUndoOpP2P(properties);
        };

        /**
         * Encodes the specified SolitaireUndoOpP2P message. Does not implicitly {@link pb.SolitaireUndoOpP2P.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {pb.ISolitaireUndoOpP2P} message SolitaireUndoOpP2P message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpP2P.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.SrcIndex != null && Object.hasOwnProperty.call(message, "SrcIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.SrcIndex);
            if (message.Number != null && Object.hasOwnProperty.call(message, "Number"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Number);
            if (message.DestIndex != null && Object.hasOwnProperty.call(message, "DestIndex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.DestIndex);
            if (message.IsMuck != null && Object.hasOwnProperty.call(message, "IsMuck"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.IsMuck);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoOpP2P message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpP2P.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {pb.ISolitaireUndoOpP2P} message SolitaireUndoOpP2P message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpP2P.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoOpP2P message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoOpP2P} SolitaireUndoOpP2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpP2P.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoOpP2P();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.SrcIndex = reader.int32();
                    break;
                case 2:
                    message.Number = reader.int32();
                    break;
                case 3:
                    message.DestIndex = reader.int32();
                    break;
                case 4:
                    message.IsMuck = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoOpP2P message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoOpP2P} SolitaireUndoOpP2P
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpP2P.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoOpP2P message.
         * @function verify
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoOpP2P.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                if (!$util.isInteger(message.SrcIndex))
                    return "SrcIndex: integer expected";
            if (message.Number != null && message.hasOwnProperty("Number"))
                if (!$util.isInteger(message.Number))
                    return "Number: integer expected";
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                if (!$util.isInteger(message.DestIndex))
                    return "DestIndex: integer expected";
            if (message.IsMuck != null && message.hasOwnProperty("IsMuck"))
                if (typeof message.IsMuck !== "boolean")
                    return "IsMuck: boolean expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoOpP2P message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoOpP2P} SolitaireUndoOpP2P
         */
        SolitaireUndoOpP2P.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoOpP2P)
                return object;
            var message = new $root.solitaire.SolitaireUndoOpP2P();
            if (object.SrcIndex != null)
                message.SrcIndex = object.SrcIndex | 0;
            if (object.Number != null)
                message.Number = object.Number | 0;
            if (object.DestIndex != null)
                message.DestIndex = object.DestIndex | 0;
            if (object.IsMuck != null)
                message.IsMuck = Boolean(object.IsMuck);
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoOpP2P message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoOpP2P
         * @static
         * @param {pb.SolitaireUndoOpP2P} message SolitaireUndoOpP2P
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoOpP2P.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.SrcIndex = 0;
                object.Number = 0;
                object.DestIndex = 0;
                object.IsMuck = false;
            }
            if (message.SrcIndex != null && message.hasOwnProperty("SrcIndex"))
                object.SrcIndex = message.SrcIndex;
            if (message.Number != null && message.hasOwnProperty("Number"))
                object.Number = message.Number;
            if (message.DestIndex != null && message.hasOwnProperty("DestIndex"))
                object.DestIndex = message.DestIndex;
            if (message.IsMuck != null && message.hasOwnProperty("IsMuck"))
                object.IsMuck = message.IsMuck;
            return object;
        };

        /**
         * Converts this SolitaireUndoOpP2P to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoOpP2P
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoOpP2P.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoOpP2P;
    })();

    pb.SolitaireUndoOpRand = (function() {

        /**
         * Properties of a SolitaireUndoOpRand.
         * @memberof pb
         * @interface ISolitaireUndoOpRand
         * @property {Uint8Array|null} [cards] SolitaireUndoOpRand cards
         * @property {number|null} [LeftCard] SolitaireUndoOpRand LeftCard
         * @property {number|null} [FreeCount] SolitaireUndoOpRand FreeCount
         * @property {number|null} [index] SolitaireUndoOpRand index
         * @property {number|null} [tindex] SolitaireUndoOpRand tindex
         */

        /**
         * Constructs a new SolitaireUndoOpRand.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoOpRand.
         * @implements ISolitaireUndoOpRand
         * @constructor
         * @param {pb.ISolitaireUndoOpRand=} [properties] Properties to set
         */
        function SolitaireUndoOpRand(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoOpRand cards.
         * @member {Uint8Array} cards
         * @memberof pb.SolitaireUndoOpRand
         * @instance
         */
        SolitaireUndoOpRand.prototype.cards = $util.newBuffer([]);

        /**
         * SolitaireUndoOpRand LeftCard.
         * @member {number} LeftCard
         * @memberof pb.SolitaireUndoOpRand
         * @instance
         */
        SolitaireUndoOpRand.prototype.LeftCard = 0;

        /**
         * SolitaireUndoOpRand FreeCount.
         * @member {number} FreeCount
         * @memberof pb.SolitaireUndoOpRand
         * @instance
         */
        SolitaireUndoOpRand.prototype.FreeCount = 0;

        /**
         * SolitaireUndoOpRand index.
         * @member {number} index
         * @memberof pb.SolitaireUndoOpRand
         * @instance
         */
        SolitaireUndoOpRand.prototype.index = 0;

        /**
         * SolitaireUndoOpRand tindex.
         * @member {number} tindex
         * @memberof pb.SolitaireUndoOpRand
         * @instance
         */
        SolitaireUndoOpRand.prototype.tindex = 0;

        /**
         * Creates a new SolitaireUndoOpRand instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {pb.ISolitaireUndoOpRand=} [properties] Properties to set
         * @returns {pb.SolitaireUndoOpRand} SolitaireUndoOpRand instance
         */
        SolitaireUndoOpRand.create = function create(properties) {
            return new SolitaireUndoOpRand(properties);
        };

        /**
         * Encodes the specified SolitaireUndoOpRand message. Does not implicitly {@link pb.SolitaireUndoOpRand.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {pb.ISolitaireUndoOpRand} message SolitaireUndoOpRand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpRand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cards != null && Object.hasOwnProperty.call(message, "cards"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.cards);
            if (message.LeftCard != null && Object.hasOwnProperty.call(message, "LeftCard"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.LeftCard);
            if (message.FreeCount != null && Object.hasOwnProperty.call(message, "FreeCount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.FreeCount);
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.index);
            if (message.tindex != null && Object.hasOwnProperty.call(message, "tindex"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.tindex);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoOpRand message, length delimited. Does not implicitly {@link pb.SolitaireUndoOpRand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {pb.ISolitaireUndoOpRand} message SolitaireUndoOpRand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoOpRand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoOpRand message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoOpRand} SolitaireUndoOpRand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpRand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoOpRand();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cards = reader.bytes();
                    break;
                case 2:
                    message.LeftCard = reader.int32();
                    break;
                case 3:
                    message.FreeCount = reader.int32();
                    break;
                case 4:
                    message.index = reader.int32();
                    break;
                case 5:
                    message.tindex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoOpRand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoOpRand} SolitaireUndoOpRand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoOpRand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoOpRand message.
         * @function verify
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoOpRand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cards != null && message.hasOwnProperty("cards"))
                if (!(message.cards && typeof message.cards.length === "number" || $util.isString(message.cards)))
                    return "cards: buffer expected";
            if (message.LeftCard != null && message.hasOwnProperty("LeftCard"))
                if (!$util.isInteger(message.LeftCard))
                    return "LeftCard: integer expected";
            if (message.FreeCount != null && message.hasOwnProperty("FreeCount"))
                if (!$util.isInteger(message.FreeCount))
                    return "FreeCount: integer expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            if (message.tindex != null && message.hasOwnProperty("tindex"))
                if (!$util.isInteger(message.tindex))
                    return "tindex: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoOpRand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoOpRand} SolitaireUndoOpRand
         */
        SolitaireUndoOpRand.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoOpRand)
                return object;
            var message = new $root.solitaire.SolitaireUndoOpRand();
            if (object.cards != null)
                if (typeof object.cards === "string")
                    $util.base64.decode(object.cards, message.cards = $util.newBuffer($util.base64.length(object.cards)), 0);
                else if (object.cards.length)
                    message.cards = object.cards;
            if (object.LeftCard != null)
                message.LeftCard = object.LeftCard | 0;
            if (object.FreeCount != null)
                message.FreeCount = object.FreeCount | 0;
            if (object.index != null)
                message.index = object.index | 0;
            if (object.tindex != null)
                message.tindex = object.tindex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoOpRand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoOpRand
         * @static
         * @param {pb.SolitaireUndoOpRand} message SolitaireUndoOpRand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoOpRand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.cards = "";
                else {
                    object.cards = [];
                    if (options.bytes !== Array)
                        object.cards = $util.newBuffer(object.cards);
                }
                object.LeftCard = 0;
                object.FreeCount = 0;
                object.index = 0;
                object.tindex = 0;
            }
            if (message.cards != null && message.hasOwnProperty("cards"))
                object.cards = options.bytes === String ? $util.base64.encode(message.cards, 0, message.cards.length) : options.bytes === Array ? Array.prototype.slice.call(message.cards) : message.cards;
            if (message.LeftCard != null && message.hasOwnProperty("LeftCard"))
                object.LeftCard = message.LeftCard;
            if (message.FreeCount != null && message.hasOwnProperty("FreeCount"))
                object.FreeCount = message.FreeCount;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.tindex != null && message.hasOwnProperty("tindex"))
                object.tindex = message.tindex;
            return object;
        };

        /**
         * Converts this SolitaireUndoOpRand to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoOpRand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoOpRand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoOpRand;
    })();

    pb.SolitaireUndoResp = (function() {

        /**
         * Properties of a SolitaireUndoResp.
         * @memberof pb
         * @interface ISolitaireUndoResp
         * @property {pb.ErrNo|null} [err] SolitaireUndoResp err
         * @property {pb.UndoOpType|null} [type] SolitaireUndoResp type
         * @property {pb.ISolitaireUndoOpR2P|null} [r2p] SolitaireUndoResp r2p
         * @property {pb.ISolitaireUndoOpR2F|null} [r2f] SolitaireUndoResp r2f
         * @property {pb.ISolitaireUndoOpP2F|null} [p2f] SolitaireUndoResp p2f
         * @property {pb.ISolitaireUndoOpF2P|null} [f2p] SolitaireUndoResp f2p
         * @property {pb.ISolitaireUndoOpP2P|null} [p2p] SolitaireUndoResp p2p
         * @property {pb.ISolitaireUndoOpRand|null} [rand] SolitaireUndoResp rand
         * @property {number|null} [score] SolitaireUndoResp score
         */

        /**
         * Constructs a new SolitaireUndoResp.
         * @memberof pb
         * @classdesc Represents a SolitaireUndoResp.
         * @implements ISolitaireUndoResp
         * @constructor
         * @param {pb.ISolitaireUndoResp=} [properties] Properties to set
         */
        function SolitaireUndoResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireUndoResp err.
         * @member {pb.ErrNo} err
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.err = 0;

        /**
         * SolitaireUndoResp type.
         * @member {pb.UndoOpType} type
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.type = 0;

        /**
         * SolitaireUndoResp r2p.
         * @member {pb.ISolitaireUndoOpR2P|null|undefined} r2p
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.r2p = null;

        /**
         * SolitaireUndoResp r2f.
         * @member {pb.ISolitaireUndoOpR2F|null|undefined} r2f
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.r2f = null;

        /**
         * SolitaireUndoResp p2f.
         * @member {pb.ISolitaireUndoOpP2F|null|undefined} p2f
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.p2f = null;

        /**
         * SolitaireUndoResp f2p.
         * @member {pb.ISolitaireUndoOpF2P|null|undefined} f2p
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.f2p = null;

        /**
         * SolitaireUndoResp p2p.
         * @member {pb.ISolitaireUndoOpP2P|null|undefined} p2p
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.p2p = null;

        /**
         * SolitaireUndoResp rand.
         * @member {pb.ISolitaireUndoOpRand|null|undefined} rand
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.rand = null;

        /**
         * SolitaireUndoResp score.
         * @member {number} score
         * @memberof pb.SolitaireUndoResp
         * @instance
         */
        SolitaireUndoResp.prototype.score = 0;

        /**
         * Creates a new SolitaireUndoResp instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {pb.ISolitaireUndoResp=} [properties] Properties to set
         * @returns {pb.SolitaireUndoResp} SolitaireUndoResp instance
         */
        SolitaireUndoResp.create = function create(properties) {
            return new SolitaireUndoResp(properties);
        };

        /**
         * Encodes the specified SolitaireUndoResp message. Does not implicitly {@link pb.SolitaireUndoResp.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {pb.ISolitaireUndoResp} message SolitaireUndoResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.err);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.r2p != null && Object.hasOwnProperty.call(message, "r2p"))
                $root.solitaire.SolitaireUndoOpR2P.encode(message.r2p, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.r2f != null && Object.hasOwnProperty.call(message, "r2f"))
                $root.solitaire.SolitaireUndoOpR2F.encode(message.r2f, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.p2f != null && Object.hasOwnProperty.call(message, "p2f"))
                $root.solitaire.SolitaireUndoOpP2F.encode(message.p2f, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.f2p != null && Object.hasOwnProperty.call(message, "f2p"))
                $root.solitaire.SolitaireUndoOpF2P.encode(message.f2p, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.p2p != null && Object.hasOwnProperty.call(message, "p2p"))
                $root.solitaire.SolitaireUndoOpP2P.encode(message.p2p, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.rand != null && Object.hasOwnProperty.call(message, "rand"))
                $root.solitaire.SolitaireUndoOpRand.encode(message.rand, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified SolitaireUndoResp message, length delimited. Does not implicitly {@link pb.SolitaireUndoResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {pb.ISolitaireUndoResp} message SolitaireUndoResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireUndoResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireUndoResp message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireUndoResp} SolitaireUndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireUndoResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.int32();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.r2p = $root.solitaire.SolitaireUndoOpR2P.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.r2f = $root.solitaire.SolitaireUndoOpR2F.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.p2f = $root.solitaire.SolitaireUndoOpP2F.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.f2p = $root.solitaire.SolitaireUndoOpF2P.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.p2p = $root.solitaire.SolitaireUndoOpP2P.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.rand = $root.solitaire.SolitaireUndoOpRand.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireUndoResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireUndoResp} SolitaireUndoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireUndoResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireUndoResp message.
         * @function verify
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireUndoResp.verify = function verify(message) {
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
                    break;
                }
            if (message.r2p != null && message.hasOwnProperty("r2p")) {
                var error = $root.solitaire.SolitaireUndoOpR2P.verify(message.r2p);
                if (error)
                    return "r2p." + error;
            }
            if (message.r2f != null && message.hasOwnProperty("r2f")) {
                var error = $root.solitaire.SolitaireUndoOpR2F.verify(message.r2f);
                if (error)
                    return "r2f." + error;
            }
            if (message.p2f != null && message.hasOwnProperty("p2f")) {
                var error = $root.solitaire.SolitaireUndoOpP2F.verify(message.p2f);
                if (error)
                    return "p2f." + error;
            }
            if (message.f2p != null && message.hasOwnProperty("f2p")) {
                var error = $root.solitaire.SolitaireUndoOpF2P.verify(message.f2p);
                if (error)
                    return "f2p." + error;
            }
            if (message.p2p != null && message.hasOwnProperty("p2p")) {
                var error = $root.solitaire.SolitaireUndoOpP2P.verify(message.p2p);
                if (error)
                    return "p2p." + error;
            }
            if (message.rand != null && message.hasOwnProperty("rand")) {
                var error = $root.solitaire.SolitaireUndoOpRand.verify(message.rand);
                if (error)
                    return "rand." + error;
            }
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates a SolitaireUndoResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireUndoResp} SolitaireUndoResp
         */
        SolitaireUndoResp.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireUndoResp)
                return object;
            var message = new $root.solitaire.SolitaireUndoResp();
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
            switch (object.type) {
            case "OP_NONE":
            case 0:
                message.type = 0;
                break;
            case "OP_R2P":
            case 1:
                message.type = 1;
                break;
            case "OP_R2F":
            case 2:
                message.type = 2;
                break;
            case "OP_P2F":
            case 3:
                message.type = 3;
                break;
            case "OP_F2P":
            case 4:
                message.type = 4;
                break;
            case "OP_P2P":
            case 5:
                message.type = 5;
                break;
            case "OP_RAND":
            case 6:
                message.type = 6;
                break;
            }
            if (object.r2p != null) {
                if (typeof object.r2p !== "object")
                    throw TypeError(".pb.SolitaireUndoResp.r2p: object expected");
                message.r2p = $root.solitaire.SolitaireUndoOpR2P.fromObject(object.r2p);
            }
            if (object.r2f != null) {
                if (typeof object.r2f !== "object")
                    throw TypeError(".pb.SolitaireUndoResp.r2f: object expected");
                message.r2f = $root.solitaire.SolitaireUndoOpR2F.fromObject(object.r2f);
            }
            if (object.p2f != null) {
                if (typeof object.p2f !== "object")
                    throw TypeError(".pb.SolitaireUndoResp.p2f: object expected");
                message.p2f = $root.solitaire.SolitaireUndoOpP2F.fromObject(object.p2f);
            }
            if (object.f2p != null) {
                if (typeof object.f2p !== "object")
                    throw TypeError(".pb.SolitaireUndoResp.f2p: object expected");
                message.f2p = $root.solitaire.SolitaireUndoOpF2P.fromObject(object.f2p);
            }
            if (object.p2p != null) {
                if (typeof object.p2p !== "object")
                    throw TypeError(".pb.SolitaireUndoResp.p2p: object expected");
                message.p2p = $root.solitaire.SolitaireUndoOpP2P.fromObject(object.p2p);
            }
            if (object.rand != null) {
                if (typeof object.rand !== "object")
                    throw TypeError(".pb.SolitaireUndoResp.rand: object expected");
                message.rand = $root.solitaire.SolitaireUndoOpRand.fromObject(object.rand);
            }
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SolitaireUndoResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireUndoResp
         * @static
         * @param {pb.SolitaireUndoResp} message SolitaireUndoResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireUndoResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = options.enums === String ? "SUCCESS" : 0;
                object.type = options.enums === String ? "OP_NONE" : 0;
                object.r2p = null;
                object.r2f = null;
                object.p2f = null;
                object.f2p = null;
                object.p2p = null;
                object.rand = null;
                object.score = 0;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = options.enums === String ? $root.solitaire.ErrNo[message.err] : message.err;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.solitaire.UndoOpType[message.type] : message.type;
            if (message.r2p != null && message.hasOwnProperty("r2p"))
                object.r2p = $root.solitaire.SolitaireUndoOpR2P.toObject(message.r2p, options);
            if (message.r2f != null && message.hasOwnProperty("r2f"))
                object.r2f = $root.solitaire.SolitaireUndoOpR2F.toObject(message.r2f, options);
            if (message.p2f != null && message.hasOwnProperty("p2f"))
                object.p2f = $root.solitaire.SolitaireUndoOpP2F.toObject(message.p2f, options);
            if (message.f2p != null && message.hasOwnProperty("f2p"))
                object.f2p = $root.solitaire.SolitaireUndoOpF2P.toObject(message.f2p, options);
            if (message.p2p != null && message.hasOwnProperty("p2p"))
                object.p2p = $root.solitaire.SolitaireUndoOpP2P.toObject(message.p2p, options);
            if (message.rand != null && message.hasOwnProperty("rand"))
                object.rand = $root.solitaire.SolitaireUndoOpRand.toObject(message.rand, options);
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this SolitaireUndoResp to JSON.
         * @function toJSON
         * @memberof pb.SolitaireUndoResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireUndoResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireUndoResp;
    })();

    pb.SolitaireOpReq = (function() {

        /**
         * Properties of a SolitaireOpReq.
         * @memberof pb
         * @interface ISolitaireOpReq
         * @property {number|null} [RoomID] SolitaireOpReq RoomID
         * @property {pb.ISolitaireCompetitionDataReq|null} [opData] SolitaireOpReq opData
         * @property {pb.ISolitaireOpRandomReq|null} [opRand] SolitaireOpReq opRand
         * @property {pb.ISolitaireOp_R2PReq|null} [opR2p] SolitaireOpReq opR2p
         * @property {pb.ISolitaireOp_R2FReq|null} [opR2f] SolitaireOpReq opR2f
         * @property {pb.ISolitaireOp_P2FReq|null} [opP2f] SolitaireOpReq opP2f
         * @property {pb.ISolitaireOp_F2PReq|null} [opF2p] SolitaireOpReq opF2p
         * @property {pb.ISolitaireOp_P2PReq|null} [opP2p] SolitaireOpReq opP2p
         * @property {pb.ISolitaireFinishReq|null} [opFin] SolitaireOpReq opFin
         * @property {pb.ISolitairePauseGameReq|null} [opPause] SolitaireOpReq opPause
         * @property {pb.ISolitaireRecoverGameReq|null} [opRecover] SolitaireOpReq opRecover
         * @property {pb.ISolitaireUndoReq|null} [opUndo] SolitaireOpReq opUndo
         */

        /**
         * Constructs a new SolitaireOpReq.
         * @memberof pb
         * @classdesc Represents a SolitaireOpReq.
         * @implements ISolitaireOpReq
         * @constructor
         * @param {pb.ISolitaireOpReq=} [properties] Properties to set
         */
        function SolitaireOpReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolitaireOpReq RoomID.
         * @member {number} RoomID
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.RoomID = 0;

        /**
         * SolitaireOpReq opData.
         * @member {pb.ISolitaireCompetitionDataReq|null|undefined} opData
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opData = null;

        /**
         * SolitaireOpReq opRand.
         * @member {pb.ISolitaireOpRandomReq|null|undefined} opRand
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opRand = null;

        /**
         * SolitaireOpReq opR2p.
         * @member {pb.ISolitaireOp_R2PReq|null|undefined} opR2p
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opR2p = null;

        /**
         * SolitaireOpReq opR2f.
         * @member {pb.ISolitaireOp_R2FReq|null|undefined} opR2f
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opR2f = null;

        /**
         * SolitaireOpReq opP2f.
         * @member {pb.ISolitaireOp_P2FReq|null|undefined} opP2f
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opP2f = null;

        /**
         * SolitaireOpReq opF2p.
         * @member {pb.ISolitaireOp_F2PReq|null|undefined} opF2p
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opF2p = null;

        /**
         * SolitaireOpReq opP2p.
         * @member {pb.ISolitaireOp_P2PReq|null|undefined} opP2p
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opP2p = null;

        /**
         * SolitaireOpReq opFin.
         * @member {pb.ISolitaireFinishReq|null|undefined} opFin
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opFin = null;

        /**
         * SolitaireOpReq opPause.
         * @member {pb.ISolitairePauseGameReq|null|undefined} opPause
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opPause = null;

        /**
         * SolitaireOpReq opRecover.
         * @member {pb.ISolitaireRecoverGameReq|null|undefined} opRecover
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opRecover = null;

        /**
         * SolitaireOpReq opUndo.
         * @member {pb.ISolitaireUndoReq|null|undefined} opUndo
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        SolitaireOpReq.prototype.opUndo = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * SolitaireOpReq op.
         * @member {"opData"|"opRand"|"opR2p"|"opR2f"|"opP2f"|"opF2p"|"opP2p"|"opFin"|"opPause"|"opRecover"|"opUndo"|undefined} op
         * @memberof pb.SolitaireOpReq
         * @instance
         */
        Object.defineProperty(SolitaireOpReq.prototype, "op", {
            get: $util.oneOfGetter($oneOfFields = ["opData", "opRand", "opR2p", "opR2f", "opP2f", "opF2p", "opP2p", "opFin", "opPause", "opRecover", "opUndo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SolitaireOpReq instance using the specified properties.
         * @function create
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {pb.ISolitaireOpReq=} [properties] Properties to set
         * @returns {pb.SolitaireOpReq} SolitaireOpReq instance
         */
        SolitaireOpReq.create = function create(properties) {
            return new SolitaireOpReq(properties);
        };

        /**
         * Encodes the specified SolitaireOpReq message. Does not implicitly {@link pb.SolitaireOpReq.verify|verify} messages.
         * @function encode
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {pb.ISolitaireOpReq} message SolitaireOpReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOpReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoomID != null && Object.hasOwnProperty.call(message, "RoomID"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RoomID);
            if (message.opData != null && Object.hasOwnProperty.call(message, "opData"))
                $root.solitaire.SolitaireCompetitionDataReq.encode(message.opData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.opRand != null && Object.hasOwnProperty.call(message, "opRand"))
                $root.solitaire.SolitaireOpRandomReq.encode(message.opRand, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.opR2p != null && Object.hasOwnProperty.call(message, "opR2p"))
                $root.solitaire.SolitaireOp_R2PReq.encode(message.opR2p, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.opR2f != null && Object.hasOwnProperty.call(message, "opR2f"))
                $root.solitaire.SolitaireOp_R2FReq.encode(message.opR2f, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.opP2f != null && Object.hasOwnProperty.call(message, "opP2f"))
                $root.solitaire.SolitaireOp_P2FReq.encode(message.opP2f, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.opF2p != null && Object.hasOwnProperty.call(message, "opF2p"))
                $root.solitaire.SolitaireOp_F2PReq.encode(message.opF2p, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.opP2p != null && Object.hasOwnProperty.call(message, "opP2p"))
                $root.solitaire.SolitaireOp_P2PReq.encode(message.opP2p, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.opFin != null && Object.hasOwnProperty.call(message, "opFin"))
                $root.solitaire.SolitaireFinishReq.encode(message.opFin, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.opPause != null && Object.hasOwnProperty.call(message, "opPause"))
                $root.solitaire.SolitairePauseGameReq.encode(message.opPause, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.opRecover != null && Object.hasOwnProperty.call(message, "opRecover"))
                $root.solitaire.SolitaireRecoverGameReq.encode(message.opRecover, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.opUndo != null && Object.hasOwnProperty.call(message, "opUndo"))
                $root.solitaire.SolitaireUndoReq.encode(message.opUndo, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SolitaireOpReq message, length delimited. Does not implicitly {@link pb.SolitaireOpReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {pb.ISolitaireOpReq} message SolitaireOpReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolitaireOpReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolitaireOpReq message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SolitaireOpReq} SolitaireOpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOpReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.solitaire.SolitaireOpReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoomID = reader.uint32();
                    break;
                case 2:
                    message.opData = $root.solitaire.SolitaireCompetitionDataReq.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.opRand = $root.solitaire.SolitaireOpRandomReq.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.opR2p = $root.solitaire.SolitaireOp_R2PReq.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.opR2f = $root.solitaire.SolitaireOp_R2FReq.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.opP2f = $root.solitaire.SolitaireOp_P2FReq.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.opF2p = $root.solitaire.SolitaireOp_F2PReq.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.opP2p = $root.solitaire.SolitaireOp_P2PReq.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.opFin = $root.solitaire.SolitaireFinishReq.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.opPause = $root.solitaire.SolitairePauseGameReq.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.opRecover = $root.solitaire.SolitaireRecoverGameReq.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.opUndo = $root.solitaire.SolitaireUndoReq.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SolitaireOpReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SolitaireOpReq} SolitaireOpReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolitaireOpReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolitaireOpReq message.
         * @function verify
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolitaireOpReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.RoomID != null && message.hasOwnProperty("RoomID"))
                if (!$util.isInteger(message.RoomID))
                    return "RoomID: integer expected";
            if (message.opData != null && message.hasOwnProperty("opData")) {
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireCompetitionDataReq.verify(message.opData);
                    if (error)
                        return "opData." + error;
                }
            }
            if (message.opRand != null && message.hasOwnProperty("opRand")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireOpRandomReq.verify(message.opRand);
                    if (error)
                        return "opRand." + error;
                }
            }
            if (message.opR2p != null && message.hasOwnProperty("opR2p")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireOp_R2PReq.verify(message.opR2p);
                    if (error)
                        return "opR2p." + error;
                }
            }
            if (message.opR2f != null && message.hasOwnProperty("opR2f")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireOp_R2FReq.verify(message.opR2f);
                    if (error)
                        return "opR2f." + error;
                }
            }
            if (message.opP2f != null && message.hasOwnProperty("opP2f")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireOp_P2FReq.verify(message.opP2f);
                    if (error)
                        return "opP2f." + error;
                }
            }
            if (message.opF2p != null && message.hasOwnProperty("opF2p")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireOp_F2PReq.verify(message.opF2p);
                    if (error)
                        return "opF2p." + error;
                }
            }
            if (message.opP2p != null && message.hasOwnProperty("opP2p")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireOp_P2PReq.verify(message.opP2p);
                    if (error)
                        return "opP2p." + error;
                }
            }
            if (message.opFin != null && message.hasOwnProperty("opFin")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireFinishReq.verify(message.opFin);
                    if (error)
                        return "opFin." + error;
                }
            }
            if (message.opPause != null && message.hasOwnProperty("opPause")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitairePauseGameReq.verify(message.opPause);
                    if (error)
                        return "opPause." + error;
                }
            }
            if (message.opRecover != null && message.hasOwnProperty("opRecover")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireRecoverGameReq.verify(message.opRecover);
                    if (error)
                        return "opRecover." + error;
                }
            }
            if (message.opUndo != null && message.hasOwnProperty("opUndo")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                {
                    var error = $root.solitaire.SolitaireUndoReq.verify(message.opUndo);
                    if (error)
                        return "opUndo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SolitaireOpReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SolitaireOpReq} SolitaireOpReq
         */
        SolitaireOpReq.fromObject = function fromObject(object) {
            if (object instanceof $root.solitaire.SolitaireOpReq)
                return object;
            var message = new $root.solitaire.SolitaireOpReq();
            if (object.RoomID != null)
                message.RoomID = object.RoomID >>> 0;
            if (object.opData != null) {
                if (typeof object.opData !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opData: object expected");
                message.opData = $root.solitaire.SolitaireCompetitionDataReq.fromObject(object.opData);
            }
            if (object.opRand != null) {
                if (typeof object.opRand !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opRand: object expected");
                message.opRand = $root.solitaire.SolitaireOpRandomReq.fromObject(object.opRand);
            }
            if (object.opR2p != null) {
                if (typeof object.opR2p !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opR2p: object expected");
                message.opR2p = $root.solitaire.SolitaireOp_R2PReq.fromObject(object.opR2p);
            }
            if (object.opR2f != null) {
                if (typeof object.opR2f !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opR2f: object expected");
                message.opR2f = $root.solitaire.SolitaireOp_R2FReq.fromObject(object.opR2f);
            }
            if (object.opP2f != null) {
                if (typeof object.opP2f !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opP2f: object expected");
                message.opP2f = $root.solitaire.SolitaireOp_P2FReq.fromObject(object.opP2f);
            }
            if (object.opF2p != null) {
                if (typeof object.opF2p !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opF2p: object expected");
                message.opF2p = $root.solitaire.SolitaireOp_F2PReq.fromObject(object.opF2p);
            }
            if (object.opP2p != null) {
                if (typeof object.opP2p !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opP2p: object expected");
                message.opP2p = $root.solitaire.SolitaireOp_P2PReq.fromObject(object.opP2p);
            }
            if (object.opFin != null) {
                if (typeof object.opFin !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opFin: object expected");
                message.opFin = $root.solitaire.SolitaireFinishReq.fromObject(object.opFin);
            }
            if (object.opPause != null) {
                if (typeof object.opPause !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opPause: object expected");
                message.opPause = $root.solitaire.SolitairePauseGameReq.fromObject(object.opPause);
            }
            if (object.opRecover != null) {
                if (typeof object.opRecover !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opRecover: object expected");
                message.opRecover = $root.solitaire.SolitaireRecoverGameReq.fromObject(object.opRecover);
            }
            if (object.opUndo != null) {
                if (typeof object.opUndo !== "object")
                    throw TypeError(".pb.SolitaireOpReq.opUndo: object expected");
                message.opUndo = $root.solitaire.SolitaireUndoReq.fromObject(object.opUndo);
            }
            return message;
        };

        /**
         * Creates a plain object from a SolitaireOpReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SolitaireOpReq
         * @static
         * @param {pb.SolitaireOpReq} message SolitaireOpReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolitaireOpReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.RoomID = 0;
            if (message.RoomID != null && message.hasOwnProperty("RoomID"))
                object.RoomID = message.RoomID;
            if (message.opData != null && message.hasOwnProperty("opData")) {
                object.opData = $root.solitaire.SolitaireCompetitionDataReq.toObject(message.opData, options);
                if (options.oneofs)
                    object.op = "opData";
            }
            if (message.opRand != null && message.hasOwnProperty("opRand")) {
                object.opRand = $root.solitaire.SolitaireOpRandomReq.toObject(message.opRand, options);
                if (options.oneofs)
                    object.op = "opRand";
            }
            if (message.opR2p != null && message.hasOwnProperty("opR2p")) {
                object.opR2p = $root.solitaire.SolitaireOp_R2PReq.toObject(message.opR2p, options);
                if (options.oneofs)
                    object.op = "opR2p";
            }
            if (message.opR2f != null && message.hasOwnProperty("opR2f")) {
                object.opR2f = $root.solitaire.SolitaireOp_R2FReq.toObject(message.opR2f, options);
                if (options.oneofs)
                    object.op = "opR2f";
            }
            if (message.opP2f != null && message.hasOwnProperty("opP2f")) {
                object.opP2f = $root.solitaire.SolitaireOp_P2FReq.toObject(message.opP2f, options);
                if (options.oneofs)
                    object.op = "opP2f";
            }
            if (message.opF2p != null && message.hasOwnProperty("opF2p")) {
                object.opF2p = $root.solitaire.SolitaireOp_F2PReq.toObject(message.opF2p, options);
                if (options.oneofs)
                    object.op = "opF2p";
            }
            if (message.opP2p != null && message.hasOwnProperty("opP2p")) {
                object.opP2p = $root.solitaire.SolitaireOp_P2PReq.toObject(message.opP2p, options);
                if (options.oneofs)
                    object.op = "opP2p";
            }
            if (message.opFin != null && message.hasOwnProperty("opFin")) {
                object.opFin = $root.solitaire.SolitaireFinishReq.toObject(message.opFin, options);
                if (options.oneofs)
                    object.op = "opFin";
            }
            if (message.opPause != null && message.hasOwnProperty("opPause")) {
                object.opPause = $root.solitaire.SolitairePauseGameReq.toObject(message.opPause, options);
                if (options.oneofs)
                    object.op = "opPause";
            }
            if (message.opRecover != null && message.hasOwnProperty("opRecover")) {
                object.opRecover = $root.solitaire.SolitaireRecoverGameReq.toObject(message.opRecover, options);
                if (options.oneofs)
                    object.op = "opRecover";
            }
            if (message.opUndo != null && message.hasOwnProperty("opUndo")) {
                object.opUndo = $root.solitaire.SolitaireUndoReq.toObject(message.opUndo, options);
                if (options.oneofs)
                    object.op = "opUndo";
            }
            return object;
        };

        /**
         * Converts this SolitaireOpReq to JSON.
         * @function toJSON
         * @memberof pb.SolitaireOpReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolitaireOpReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolitaireOpReq;
    })();

    return pb;
})();

module.exports = $root;
