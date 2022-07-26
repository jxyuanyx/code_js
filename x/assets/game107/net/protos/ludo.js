/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("../../../gamecore/net/protobuf.min");$protobuf.util.toJSONOptions.defaults=true;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.core = (function() {

    /**
     * Namespace core.
     * @exports core
     * @namespace
     */
    var core = {};

    core.SafeShell = (function() {

        /**
         * Properties of a SafeShell.
         * @memberof core
         * @interface ISafeShell
         * @property {number|null} [uid] SafeShell uid
         * @property {string|null} [token] SafeShell token
         * @property {number|null} [random] SafeShell random
         * @property {number|null} [time] SafeShell time
         * @property {number|null} [time_zone] SafeShell time_zone
         * @property {number|null} [version] SafeShell version
         * @property {string|null} [channel] SafeShell channel
         * @property {Uint8Array|null} [body] SafeShell body
         * @property {number|null} [desk_id] SafeShell desk_id
         * @property {number|null} [room_id] SafeShell room_id
         */

        /**
         * Constructs a new SafeShell.
         * @memberof core
         * @classdesc Represents a SafeShell.
         * @implements ISafeShell
         * @constructor
         * @param {core.ISafeShell=} [properties] Properties to set
         */
        function SafeShell(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SafeShell uid.
         * @member {number} uid
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.uid = 0;

        /**
         * SafeShell token.
         * @member {string} token
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.token = "";

        /**
         * SafeShell random.
         * @member {number} random
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.random = 0;

        /**
         * SafeShell time.
         * @member {number} time
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SafeShell time_zone.
         * @member {number} time_zone
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.time_zone = 0;

        /**
         * SafeShell version.
         * @member {number} version
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.version = 0;

        /**
         * SafeShell channel.
         * @member {string} channel
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.channel = "";

        /**
         * SafeShell body.
         * @member {Uint8Array} body
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.body = $util.newBuffer([]);

        /**
         * SafeShell desk_id.
         * @member {number} desk_id
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.desk_id = 0;

        /**
         * SafeShell room_id.
         * @member {number} room_id
         * @memberof core.SafeShell
         * @instance
         */
        SafeShell.prototype.room_id = 0;

        /**
         * Creates a new SafeShell instance using the specified properties.
         * @function create
         * @memberof core.SafeShell
         * @static
         * @param {core.ISafeShell=} [properties] Properties to set
         * @returns {core.SafeShell} SafeShell instance
         */
        SafeShell.create = function create(properties) {
            return new SafeShell(properties);
        };

        /**
         * Encodes the specified SafeShell message. Does not implicitly {@link core.SafeShell.verify|verify} messages.
         * @function encode
         * @memberof core.SafeShell
         * @static
         * @param {core.ISafeShell} message SafeShell message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SafeShell.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
            if (message.random != null && Object.hasOwnProperty.call(message, "random"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.random);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.time);
            if (message.time_zone != null && Object.hasOwnProperty.call(message, "time_zone"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.time_zone);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.version);
            if (message.channel != null && Object.hasOwnProperty.call(message, "channel"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.channel);
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.body);
            if (message.desk_id != null && Object.hasOwnProperty.call(message, "desk_id"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.desk_id);
            if (message.room_id != null && Object.hasOwnProperty.call(message, "room_id"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.room_id);
            return writer;
        };

        /**
         * Encodes the specified SafeShell message, length delimited. Does not implicitly {@link core.SafeShell.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.SafeShell
         * @static
         * @param {core.ISafeShell} message SafeShell message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SafeShell.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SafeShell message from the specified reader or buffer.
         * @function decode
         * @memberof core.SafeShell
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.SafeShell} SafeShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SafeShell.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.SafeShell();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                case 2:
                    message.token = reader.string();
                    break;
                case 3:
                    message.random = reader.int32();
                    break;
                case 4:
                    message.time = reader.int64();
                    break;
                case 5:
                    message.time_zone = reader.int32();
                    break;
                case 6:
                    message.version = reader.int32();
                    break;
                case 7:
                    message.channel = reader.string();
                    break;
                case 8:
                    message.body = reader.bytes();
                    break;
                case 9:
                    message.desk_id = reader.int32();
                    break;
                case 10:
                    message.room_id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SafeShell message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.SafeShell
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.SafeShell} SafeShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SafeShell.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SafeShell message.
         * @function verify
         * @memberof core.SafeShell
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SafeShell.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.random != null && message.hasOwnProperty("random"))
                if (!$util.isInteger(message.random))
                    return "random: integer expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.time_zone != null && message.hasOwnProperty("time_zone"))
                if (!$util.isInteger(message.time_zone))
                    return "time_zone: integer expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                if (!$util.isString(message.channel))
                    return "channel: string expected";
            if (message.body != null && message.hasOwnProperty("body"))
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (!$util.isInteger(message.desk_id))
                    return "desk_id: integer expected";
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (!$util.isInteger(message.room_id))
                    return "room_id: integer expected";
            return null;
        };

        /**
         * Creates a SafeShell message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.SafeShell
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.SafeShell} SafeShell
         */
        SafeShell.fromObject = function fromObject(object) {
            if (object instanceof $root.core.SafeShell)
                return object;
            var message = new $root.core.SafeShell();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.token != null)
                message.token = String(object.token);
            if (object.random != null)
                message.random = object.random | 0;
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.time_zone != null)
                message.time_zone = object.time_zone | 0;
            if (object.version != null)
                message.version = object.version | 0;
            if (object.channel != null)
                message.channel = String(object.channel);
            if (object.body != null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length)
                    message.body = object.body;
            if (object.desk_id != null)
                message.desk_id = object.desk_id | 0;
            if (object.room_id != null)
                message.room_id = object.room_id | 0;
            return message;
        };

        /**
         * Creates a plain object from a SafeShell message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.SafeShell
         * @static
         * @param {core.SafeShell} message SafeShell
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SafeShell.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.token = "";
                object.random = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.time_zone = 0;
                object.version = 0;
                object.channel = "";
                if (options.bytes === String)
                    object.body = "";
                else {
                    object.body = [];
                    if (options.bytes !== Array)
                        object.body = $util.newBuffer(object.body);
                }
                object.desk_id = 0;
                object.room_id = 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.random != null && message.hasOwnProperty("random"))
                object.random = message.random;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.time_zone != null && message.hasOwnProperty("time_zone"))
                object.time_zone = message.time_zone;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = message.channel;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                object.desk_id = message.desk_id;
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                object.room_id = message.room_id;
            return object;
        };

        /**
         * Converts this SafeShell to JSON.
         * @function toJSON
         * @memberof core.SafeShell
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SafeShell.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SafeShell;
    })();

    core.UserHeartBeatReq = (function() {

        /**
         * Properties of a UserHeartBeatReq.
         * @memberof core
         * @interface IUserHeartBeatReq
         */

        /**
         * Constructs a new UserHeartBeatReq.
         * @memberof core
         * @classdesc Represents a UserHeartBeatReq.
         * @implements IUserHeartBeatReq
         * @constructor
         * @param {core.IUserHeartBeatReq=} [properties] Properties to set
         */
        function UserHeartBeatReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserHeartBeatReq instance using the specified properties.
         * @function create
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {core.IUserHeartBeatReq=} [properties] Properties to set
         * @returns {core.UserHeartBeatReq} UserHeartBeatReq instance
         */
        UserHeartBeatReq.create = function create(properties) {
            return new UserHeartBeatReq(properties);
        };

        /**
         * Encodes the specified UserHeartBeatReq message. Does not implicitly {@link core.UserHeartBeatReq.verify|verify} messages.
         * @function encode
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {core.IUserHeartBeatReq} message UserHeartBeatReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserHeartBeatReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserHeartBeatReq message, length delimited. Does not implicitly {@link core.UserHeartBeatReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {core.IUserHeartBeatReq} message UserHeartBeatReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserHeartBeatReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserHeartBeatReq message from the specified reader or buffer.
         * @function decode
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.UserHeartBeatReq} UserHeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserHeartBeatReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.UserHeartBeatReq();
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
         * Decodes a UserHeartBeatReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.UserHeartBeatReq} UserHeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserHeartBeatReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserHeartBeatReq message.
         * @function verify
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserHeartBeatReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserHeartBeatReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.UserHeartBeatReq} UserHeartBeatReq
         */
        UserHeartBeatReq.fromObject = function fromObject(object) {
            if (object instanceof $root.core.UserHeartBeatReq)
                return object;
            return new $root.core.UserHeartBeatReq();
        };

        /**
         * Creates a plain object from a UserHeartBeatReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.UserHeartBeatReq
         * @static
         * @param {core.UserHeartBeatReq} message UserHeartBeatReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserHeartBeatReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserHeartBeatReq to JSON.
         * @function toJSON
         * @memberof core.UserHeartBeatReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserHeartBeatReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserHeartBeatReq;
    })();

    core.UserHeartBeatRsp = (function() {

        /**
         * Properties of a UserHeartBeatRsp.
         * @memberof core
         * @interface IUserHeartBeatRsp
         */

        /**
         * Constructs a new UserHeartBeatRsp.
         * @memberof core
         * @classdesc Represents a UserHeartBeatRsp.
         * @implements IUserHeartBeatRsp
         * @constructor
         * @param {core.IUserHeartBeatRsp=} [properties] Properties to set
         */
        function UserHeartBeatRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserHeartBeatRsp instance using the specified properties.
         * @function create
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {core.IUserHeartBeatRsp=} [properties] Properties to set
         * @returns {core.UserHeartBeatRsp} UserHeartBeatRsp instance
         */
        UserHeartBeatRsp.create = function create(properties) {
            return new UserHeartBeatRsp(properties);
        };

        /**
         * Encodes the specified UserHeartBeatRsp message. Does not implicitly {@link core.UserHeartBeatRsp.verify|verify} messages.
         * @function encode
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {core.IUserHeartBeatRsp} message UserHeartBeatRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserHeartBeatRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserHeartBeatRsp message, length delimited. Does not implicitly {@link core.UserHeartBeatRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {core.IUserHeartBeatRsp} message UserHeartBeatRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserHeartBeatRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserHeartBeatRsp message from the specified reader or buffer.
         * @function decode
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.UserHeartBeatRsp} UserHeartBeatRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserHeartBeatRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.UserHeartBeatRsp();
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
         * Decodes a UserHeartBeatRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.UserHeartBeatRsp} UserHeartBeatRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserHeartBeatRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserHeartBeatRsp message.
         * @function verify
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserHeartBeatRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserHeartBeatRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.UserHeartBeatRsp} UserHeartBeatRsp
         */
        UserHeartBeatRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.core.UserHeartBeatRsp)
                return object;
            return new $root.core.UserHeartBeatRsp();
        };

        /**
         * Creates a plain object from a UserHeartBeatRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.UserHeartBeatRsp
         * @static
         * @param {core.UserHeartBeatRsp} message UserHeartBeatRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserHeartBeatRsp.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserHeartBeatRsp to JSON.
         * @function toJSON
         * @memberof core.UserHeartBeatRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserHeartBeatRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserHeartBeatRsp;
    })();

    core.UserLoginGateWayReq = (function() {

        /**
         * Properties of a UserLoginGateWayReq.
         * @memberof core
         * @interface IUserLoginGateWayReq
         */

        /**
         * Constructs a new UserLoginGateWayReq.
         * @memberof core
         * @classdesc Represents a UserLoginGateWayReq.
         * @implements IUserLoginGateWayReq
         * @constructor
         * @param {core.IUserLoginGateWayReq=} [properties] Properties to set
         */
        function UserLoginGateWayReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserLoginGateWayReq instance using the specified properties.
         * @function create
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {core.IUserLoginGateWayReq=} [properties] Properties to set
         * @returns {core.UserLoginGateWayReq} UserLoginGateWayReq instance
         */
        UserLoginGateWayReq.create = function create(properties) {
            return new UserLoginGateWayReq(properties);
        };

        /**
         * Encodes the specified UserLoginGateWayReq message. Does not implicitly {@link core.UserLoginGateWayReq.verify|verify} messages.
         * @function encode
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {core.IUserLoginGateWayReq} message UserLoginGateWayReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginGateWayReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserLoginGateWayReq message, length delimited. Does not implicitly {@link core.UserLoginGateWayReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {core.IUserLoginGateWayReq} message UserLoginGateWayReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginGateWayReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLoginGateWayReq message from the specified reader or buffer.
         * @function decode
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.UserLoginGateWayReq} UserLoginGateWayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginGateWayReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.UserLoginGateWayReq();
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
         * Decodes a UserLoginGateWayReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.UserLoginGateWayReq} UserLoginGateWayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginGateWayReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLoginGateWayReq message.
         * @function verify
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLoginGateWayReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserLoginGateWayReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.UserLoginGateWayReq} UserLoginGateWayReq
         */
        UserLoginGateWayReq.fromObject = function fromObject(object) {
            if (object instanceof $root.core.UserLoginGateWayReq)
                return object;
            return new $root.core.UserLoginGateWayReq();
        };

        /**
         * Creates a plain object from a UserLoginGateWayReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.UserLoginGateWayReq
         * @static
         * @param {core.UserLoginGateWayReq} message UserLoginGateWayReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLoginGateWayReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserLoginGateWayReq to JSON.
         * @function toJSON
         * @memberof core.UserLoginGateWayReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLoginGateWayReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLoginGateWayReq;
    })();

    core.UserLoginGateWayRsp = (function() {

        /**
         * Properties of a UserLoginGateWayRsp.
         * @memberof core
         * @interface IUserLoginGateWayRsp
         * @property {number|null} [gold] UserLoginGateWayRsp gold
         * @property {number|null} [gold_deposit] UserLoginGateWayRsp gold_deposit
         * @property {number|null} [ticket] UserLoginGateWayRsp ticket
         * @property {core.IEvtMatchNotify|null} [match_info] UserLoginGateWayRsp match_info
         */

        /**
         * Constructs a new UserLoginGateWayRsp.
         * @memberof core
         * @classdesc Represents a UserLoginGateWayRsp.
         * @implements IUserLoginGateWayRsp
         * @constructor
         * @param {core.IUserLoginGateWayRsp=} [properties] Properties to set
         */
        function UserLoginGateWayRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserLoginGateWayRsp gold.
         * @member {number} gold
         * @memberof core.UserLoginGateWayRsp
         * @instance
         */
        UserLoginGateWayRsp.prototype.gold = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserLoginGateWayRsp gold_deposit.
         * @member {number} gold_deposit
         * @memberof core.UserLoginGateWayRsp
         * @instance
         */
        UserLoginGateWayRsp.prototype.gold_deposit = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserLoginGateWayRsp ticket.
         * @member {number} ticket
         * @memberof core.UserLoginGateWayRsp
         * @instance
         */
        UserLoginGateWayRsp.prototype.ticket = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserLoginGateWayRsp match_info.
         * @member {core.IEvtMatchNotify|null|undefined} match_info
         * @memberof core.UserLoginGateWayRsp
         * @instance
         */
        UserLoginGateWayRsp.prototype.match_info = null;

        /**
         * Creates a new UserLoginGateWayRsp instance using the specified properties.
         * @function create
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {core.IUserLoginGateWayRsp=} [properties] Properties to set
         * @returns {core.UserLoginGateWayRsp} UserLoginGateWayRsp instance
         */
        UserLoginGateWayRsp.create = function create(properties) {
            return new UserLoginGateWayRsp(properties);
        };

        /**
         * Encodes the specified UserLoginGateWayRsp message. Does not implicitly {@link core.UserLoginGateWayRsp.verify|verify} messages.
         * @function encode
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {core.IUserLoginGateWayRsp} message UserLoginGateWayRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginGateWayRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.gold);
            if (message.gold_deposit != null && Object.hasOwnProperty.call(message, "gold_deposit"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.gold_deposit);
            if (message.ticket != null && Object.hasOwnProperty.call(message, "ticket"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.ticket);
            if (message.match_info != null && Object.hasOwnProperty.call(message, "match_info"))
                $root.core.EvtMatchNotify.encode(message.match_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserLoginGateWayRsp message, length delimited. Does not implicitly {@link core.UserLoginGateWayRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {core.IUserLoginGateWayRsp} message UserLoginGateWayRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLoginGateWayRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLoginGateWayRsp message from the specified reader or buffer.
         * @function decode
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.UserLoginGateWayRsp} UserLoginGateWayRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginGateWayRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.UserLoginGateWayRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gold = reader.int64();
                    break;
                case 2:
                    message.gold_deposit = reader.int64();
                    break;
                case 3:
                    message.ticket = reader.int64();
                    break;
                case 4:
                    message.match_info = $root.core.EvtMatchNotify.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserLoginGateWayRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.UserLoginGateWayRsp} UserLoginGateWayRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLoginGateWayRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLoginGateWayRsp message.
         * @function verify
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLoginGateWayRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gold != null && message.hasOwnProperty("gold"))
                if (!$util.isInteger(message.gold) && !(message.gold && $util.isInteger(message.gold.low) && $util.isInteger(message.gold.high)))
                    return "gold: integer|Long expected";
            if (message.gold_deposit != null && message.hasOwnProperty("gold_deposit"))
                if (!$util.isInteger(message.gold_deposit) && !(message.gold_deposit && $util.isInteger(message.gold_deposit.low) && $util.isInteger(message.gold_deposit.high)))
                    return "gold_deposit: integer|Long expected";
            if (message.ticket != null && message.hasOwnProperty("ticket"))
                if (!$util.isInteger(message.ticket) && !(message.ticket && $util.isInteger(message.ticket.low) && $util.isInteger(message.ticket.high)))
                    return "ticket: integer|Long expected";
            if (message.match_info != null && message.hasOwnProperty("match_info")) {
                var error = $root.core.EvtMatchNotify.verify(message.match_info);
                if (error)
                    return "match_info." + error;
            }
            return null;
        };

        /**
         * Creates a UserLoginGateWayRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.UserLoginGateWayRsp} UserLoginGateWayRsp
         */
        UserLoginGateWayRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.core.UserLoginGateWayRsp)
                return object;
            var message = new $root.core.UserLoginGateWayRsp();
            if (object.gold != null)
                if ($util.Long)
                    (message.gold = $util.Long.fromValue(object.gold)).unsigned = false;
                else if (typeof object.gold === "string")
                    message.gold = parseInt(object.gold, 10);
                else if (typeof object.gold === "number")
                    message.gold = object.gold;
                else if (typeof object.gold === "object")
                    message.gold = new $util.LongBits(object.gold.low >>> 0, object.gold.high >>> 0).toNumber();
            if (object.gold_deposit != null)
                if ($util.Long)
                    (message.gold_deposit = $util.Long.fromValue(object.gold_deposit)).unsigned = false;
                else if (typeof object.gold_deposit === "string")
                    message.gold_deposit = parseInt(object.gold_deposit, 10);
                else if (typeof object.gold_deposit === "number")
                    message.gold_deposit = object.gold_deposit;
                else if (typeof object.gold_deposit === "object")
                    message.gold_deposit = new $util.LongBits(object.gold_deposit.low >>> 0, object.gold_deposit.high >>> 0).toNumber();
            if (object.ticket != null)
                if ($util.Long)
                    (message.ticket = $util.Long.fromValue(object.ticket)).unsigned = false;
                else if (typeof object.ticket === "string")
                    message.ticket = parseInt(object.ticket, 10);
                else if (typeof object.ticket === "number")
                    message.ticket = object.ticket;
                else if (typeof object.ticket === "object")
                    message.ticket = new $util.LongBits(object.ticket.low >>> 0, object.ticket.high >>> 0).toNumber();
            if (object.match_info != null) {
                if (typeof object.match_info !== "object")
                    throw TypeError(".core.UserLoginGateWayRsp.match_info: object expected");
                message.match_info = $root.core.EvtMatchNotify.fromObject(object.match_info);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserLoginGateWayRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.UserLoginGateWayRsp
         * @static
         * @param {core.UserLoginGateWayRsp} message UserLoginGateWayRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLoginGateWayRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.gold = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gold = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.gold_deposit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gold_deposit = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ticket = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ticket = options.longs === String ? "0" : 0;
                object.match_info = null;
            }
            if (message.gold != null && message.hasOwnProperty("gold"))
                if (typeof message.gold === "number")
                    object.gold = options.longs === String ? String(message.gold) : message.gold;
                else
                    object.gold = options.longs === String ? $util.Long.prototype.toString.call(message.gold) : options.longs === Number ? new $util.LongBits(message.gold.low >>> 0, message.gold.high >>> 0).toNumber() : message.gold;
            if (message.gold_deposit != null && message.hasOwnProperty("gold_deposit"))
                if (typeof message.gold_deposit === "number")
                    object.gold_deposit = options.longs === String ? String(message.gold_deposit) : message.gold_deposit;
                else
                    object.gold_deposit = options.longs === String ? $util.Long.prototype.toString.call(message.gold_deposit) : options.longs === Number ? new $util.LongBits(message.gold_deposit.low >>> 0, message.gold_deposit.high >>> 0).toNumber() : message.gold_deposit;
            if (message.ticket != null && message.hasOwnProperty("ticket"))
                if (typeof message.ticket === "number")
                    object.ticket = options.longs === String ? String(message.ticket) : message.ticket;
                else
                    object.ticket = options.longs === String ? $util.Long.prototype.toString.call(message.ticket) : options.longs === Number ? new $util.LongBits(message.ticket.low >>> 0, message.ticket.high >>> 0).toNumber() : message.ticket;
            if (message.match_info != null && message.hasOwnProperty("match_info"))
                object.match_info = $root.core.EvtMatchNotify.toObject(message.match_info, options);
            return object;
        };

        /**
         * Converts this UserLoginGateWayRsp to JSON.
         * @function toJSON
         * @memberof core.UserLoginGateWayRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLoginGateWayRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLoginGateWayRsp;
    })();

    core.MultiShell = (function() {

        /**
         * Properties of a MultiShell.
         * @memberof core
         * @interface IMultiShell
         * @property {number|null} [cmd] MultiShell cmd
         * @property {Uint8Array|null} [body] MultiShell body
         * @property {number|null} [desk_id] MultiShell desk_id
         * @property {number|null} [room_id] MultiShell room_id
         */

        /**
         * Constructs a new MultiShell.
         * @memberof core
         * @classdesc Represents a MultiShell.
         * @implements IMultiShell
         * @constructor
         * @param {core.IMultiShell=} [properties] Properties to set
         */
        function MultiShell(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MultiShell cmd.
         * @member {number} cmd
         * @memberof core.MultiShell
         * @instance
         */
        MultiShell.prototype.cmd = 0;

        /**
         * MultiShell body.
         * @member {Uint8Array} body
         * @memberof core.MultiShell
         * @instance
         */
        MultiShell.prototype.body = $util.newBuffer([]);

        /**
         * MultiShell desk_id.
         * @member {number} desk_id
         * @memberof core.MultiShell
         * @instance
         */
        MultiShell.prototype.desk_id = 0;

        /**
         * MultiShell room_id.
         * @member {number} room_id
         * @memberof core.MultiShell
         * @instance
         */
        MultiShell.prototype.room_id = 0;

        /**
         * Creates a new MultiShell instance using the specified properties.
         * @function create
         * @memberof core.MultiShell
         * @static
         * @param {core.IMultiShell=} [properties] Properties to set
         * @returns {core.MultiShell} MultiShell instance
         */
        MultiShell.create = function create(properties) {
            return new MultiShell(properties);
        };

        /**
         * Encodes the specified MultiShell message. Does not implicitly {@link core.MultiShell.verify|verify} messages.
         * @function encode
         * @memberof core.MultiShell
         * @static
         * @param {core.IMultiShell} message MultiShell message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultiShell.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmd != null && Object.hasOwnProperty.call(message, "cmd"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmd);
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.body);
            if (message.desk_id != null && Object.hasOwnProperty.call(message, "desk_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.desk_id);
            if (message.room_id != null && Object.hasOwnProperty.call(message, "room_id"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.room_id);
            return writer;
        };

        /**
         * Encodes the specified MultiShell message, length delimited. Does not implicitly {@link core.MultiShell.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.MultiShell
         * @static
         * @param {core.IMultiShell} message MultiShell message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultiShell.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MultiShell message from the specified reader or buffer.
         * @function decode
         * @memberof core.MultiShell
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.MultiShell} MultiShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultiShell.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.MultiShell();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cmd = reader.int32();
                    break;
                case 2:
                    message.body = reader.bytes();
                    break;
                case 3:
                    message.desk_id = reader.int32();
                    break;
                case 4:
                    message.room_id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MultiShell message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.MultiShell
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.MultiShell} MultiShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultiShell.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MultiShell message.
         * @function verify
         * @memberof core.MultiShell
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MultiShell.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                if (!$util.isInteger(message.cmd))
                    return "cmd: integer expected";
            if (message.body != null && message.hasOwnProperty("body"))
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (!$util.isInteger(message.desk_id))
                    return "desk_id: integer expected";
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (!$util.isInteger(message.room_id))
                    return "room_id: integer expected";
            return null;
        };

        /**
         * Creates a MultiShell message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.MultiShell
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.MultiShell} MultiShell
         */
        MultiShell.fromObject = function fromObject(object) {
            if (object instanceof $root.core.MultiShell)
                return object;
            var message = new $root.core.MultiShell();
            if (object.cmd != null)
                message.cmd = object.cmd | 0;
            if (object.body != null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length)
                    message.body = object.body;
            if (object.desk_id != null)
                message.desk_id = object.desk_id | 0;
            if (object.room_id != null)
                message.room_id = object.room_id | 0;
            return message;
        };

        /**
         * Creates a plain object from a MultiShell message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.MultiShell
         * @static
         * @param {core.MultiShell} message MultiShell
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MultiShell.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cmd = 0;
                if (options.bytes === String)
                    object.body = "";
                else {
                    object.body = [];
                    if (options.bytes !== Array)
                        object.body = $util.newBuffer(object.body);
                }
                object.desk_id = 0;
                object.room_id = 0;
            }
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                object.cmd = message.cmd;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                object.desk_id = message.desk_id;
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                object.room_id = message.room_id;
            return object;
        };

        /**
         * Converts this MultiShell to JSON.
         * @function toJSON
         * @memberof core.MultiShell
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MultiShell.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MultiShell;
    })();

    core.EvtUserLoginElsewhere = (function() {

        /**
         * Properties of an EvtUserLoginElsewhere.
         * @memberof core
         * @interface IEvtUserLoginElsewhere
         */

        /**
         * Constructs a new EvtUserLoginElsewhere.
         * @memberof core
         * @classdesc Represents an EvtUserLoginElsewhere.
         * @implements IEvtUserLoginElsewhere
         * @constructor
         * @param {core.IEvtUserLoginElsewhere=} [properties] Properties to set
         */
        function EvtUserLoginElsewhere(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new EvtUserLoginElsewhere instance using the specified properties.
         * @function create
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {core.IEvtUserLoginElsewhere=} [properties] Properties to set
         * @returns {core.EvtUserLoginElsewhere} EvtUserLoginElsewhere instance
         */
        EvtUserLoginElsewhere.create = function create(properties) {
            return new EvtUserLoginElsewhere(properties);
        };

        /**
         * Encodes the specified EvtUserLoginElsewhere message. Does not implicitly {@link core.EvtUserLoginElsewhere.verify|verify} messages.
         * @function encode
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {core.IEvtUserLoginElsewhere} message EvtUserLoginElsewhere message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserLoginElsewhere.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified EvtUserLoginElsewhere message, length delimited. Does not implicitly {@link core.EvtUserLoginElsewhere.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {core.IEvtUserLoginElsewhere} message EvtUserLoginElsewhere message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserLoginElsewhere.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtUserLoginElsewhere message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtUserLoginElsewhere} EvtUserLoginElsewhere
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserLoginElsewhere.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtUserLoginElsewhere();
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
         * Decodes an EvtUserLoginElsewhere message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtUserLoginElsewhere} EvtUserLoginElsewhere
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserLoginElsewhere.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtUserLoginElsewhere message.
         * @function verify
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtUserLoginElsewhere.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an EvtUserLoginElsewhere message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtUserLoginElsewhere} EvtUserLoginElsewhere
         */
        EvtUserLoginElsewhere.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtUserLoginElsewhere)
                return object;
            return new $root.core.EvtUserLoginElsewhere();
        };

        /**
         * Creates a plain object from an EvtUserLoginElsewhere message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtUserLoginElsewhere
         * @static
         * @param {core.EvtUserLoginElsewhere} message EvtUserLoginElsewhere
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtUserLoginElsewhere.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this EvtUserLoginElsewhere to JSON.
         * @function toJSON
         * @memberof core.EvtUserLoginElsewhere
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtUserLoginElsewhere.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtUserLoginElsewhere;
    })();

    core.EvtUserPropChange = (function() {

        /**
         * Properties of an EvtUserPropChange.
         * @memberof core
         * @interface IEvtUserPropChange
         * @property {number|null} [prop_type] EvtUserPropChange prop_type
         * @property {number|null} [amount] EvtUserPropChange amount
         * @property {number|null} [value] EvtUserPropChange value
         * @property {string|null} [reason] EvtUserPropChange reason
         */

        /**
         * Constructs a new EvtUserPropChange.
         * @memberof core
         * @classdesc Represents an EvtUserPropChange.
         * @implements IEvtUserPropChange
         * @constructor
         * @param {core.IEvtUserPropChange=} [properties] Properties to set
         */
        function EvtUserPropChange(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtUserPropChange prop_type.
         * @member {number} prop_type
         * @memberof core.EvtUserPropChange
         * @instance
         */
        EvtUserPropChange.prototype.prop_type = 0;

        /**
         * EvtUserPropChange amount.
         * @member {number} amount
         * @memberof core.EvtUserPropChange
         * @instance
         */
        EvtUserPropChange.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtUserPropChange value.
         * @member {number} value
         * @memberof core.EvtUserPropChange
         * @instance
         */
        EvtUserPropChange.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtUserPropChange reason.
         * @member {string} reason
         * @memberof core.EvtUserPropChange
         * @instance
         */
        EvtUserPropChange.prototype.reason = "";

        /**
         * Creates a new EvtUserPropChange instance using the specified properties.
         * @function create
         * @memberof core.EvtUserPropChange
         * @static
         * @param {core.IEvtUserPropChange=} [properties] Properties to set
         * @returns {core.EvtUserPropChange} EvtUserPropChange instance
         */
        EvtUserPropChange.create = function create(properties) {
            return new EvtUserPropChange(properties);
        };

        /**
         * Encodes the specified EvtUserPropChange message. Does not implicitly {@link core.EvtUserPropChange.verify|verify} messages.
         * @function encode
         * @memberof core.EvtUserPropChange
         * @static
         * @param {core.IEvtUserPropChange} message EvtUserPropChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserPropChange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.prop_type != null && Object.hasOwnProperty.call(message, "prop_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.prop_type);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.value);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.reason);
            return writer;
        };

        /**
         * Encodes the specified EvtUserPropChange message, length delimited. Does not implicitly {@link core.EvtUserPropChange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtUserPropChange
         * @static
         * @param {core.IEvtUserPropChange} message EvtUserPropChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserPropChange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtUserPropChange message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtUserPropChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtUserPropChange} EvtUserPropChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserPropChange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtUserPropChange();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.prop_type = reader.int32();
                    break;
                case 2:
                    message.amount = reader.int64();
                    break;
                case 3:
                    message.value = reader.int64();
                    break;
                case 4:
                    message.reason = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtUserPropChange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtUserPropChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtUserPropChange} EvtUserPropChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserPropChange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtUserPropChange message.
         * @function verify
         * @memberof core.EvtUserPropChange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtUserPropChange.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                if (!$util.isInteger(message.prop_type))
                    return "prop_type: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                    return "value: integer|Long expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                if (!$util.isString(message.reason))
                    return "reason: string expected";
            return null;
        };

        /**
         * Creates an EvtUserPropChange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtUserPropChange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtUserPropChange} EvtUserPropChange
         */
        EvtUserPropChange.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtUserPropChange)
                return object;
            var message = new $root.core.EvtUserPropChange();
            if (object.prop_type != null)
                message.prop_type = object.prop_type | 0;
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
            if (object.value != null)
                if ($util.Long)
                    (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                else if (typeof object.value === "string")
                    message.value = parseInt(object.value, 10);
                else if (typeof object.value === "number")
                    message.value = object.value;
                else if (typeof object.value === "object")
                    message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
            if (object.reason != null)
                message.reason = String(object.reason);
            return message;
        };

        /**
         * Creates a plain object from an EvtUserPropChange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtUserPropChange
         * @static
         * @param {core.EvtUserPropChange} message EvtUserPropChange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtUserPropChange.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.prop_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.value = options.longs === String ? "0" : 0;
                object.reason = "";
            }
            if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                object.prop_type = message.prop_type;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
            if (message.value != null && message.hasOwnProperty("value"))
                if (typeof message.value === "number")
                    object.value = options.longs === String ? String(message.value) : message.value;
                else
                    object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this EvtUserPropChange to JSON.
         * @function toJSON
         * @memberof core.EvtUserPropChange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtUserPropChange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtUserPropChange;
    })();

    /**
     * RedPointModule enum.
     * @name core.RedPointModule
     * @enum {number}
     * @property {number} RED_POINT_ACHIEVEMENT=0 RED_POINT_ACHIEVEMENT value
     * @property {number} RED_POINT_SEASON_RANK=1 RED_POINT_SEASON_RANK value
     * @property {number} RED_POINT_SEASON_TASK=2 RED_POINT_SEASON_TASK value
     * @property {number} RED_POINT_SEASON_WHEEL=3 RED_POINT_SEASON_WHEEL value
     * @property {number} RED_POINT_SYS_MESSAGE=4 RED_POINT_SYS_MESSAGE value
     * @property {number} RED_POINT_ANNOUNCEMENT=5 RED_POINT_ANNOUNCEMENT value
     * @property {number} RED_POINT_RECORD=6 RED_POINT_RECORD value
     * @property {number} RED_POINT_NEW_PLAYER_TASK=7 RED_POINT_NEW_PLAYER_TASK value
     */
    core.RedPointModule = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RED_POINT_ACHIEVEMENT"] = 0;
        values[valuesById[1] = "RED_POINT_SEASON_RANK"] = 1;
        values[valuesById[2] = "RED_POINT_SEASON_TASK"] = 2;
        values[valuesById[3] = "RED_POINT_SEASON_WHEEL"] = 3;
        values[valuesById[4] = "RED_POINT_SYS_MESSAGE"] = 4;
        values[valuesById[5] = "RED_POINT_ANNOUNCEMENT"] = 5;
        values[valuesById[6] = "RED_POINT_RECORD"] = 6;
        values[valuesById[7] = "RED_POINT_NEW_PLAYER_TASK"] = 7;
        return values;
    })();

    core.RedPointUpdate = (function() {

        /**
         * Properties of a RedPointUpdate.
         * @memberof core
         * @interface IRedPointUpdate
         * @property {core.RedPointModule|null} [module] RedPointUpdate module
         * @property {number|null} [count] RedPointUpdate count
         */

        /**
         * Constructs a new RedPointUpdate.
         * @memberof core
         * @classdesc Represents a RedPointUpdate.
         * @implements IRedPointUpdate
         * @constructor
         * @param {core.IRedPointUpdate=} [properties] Properties to set
         */
        function RedPointUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RedPointUpdate module.
         * @member {core.RedPointModule} module
         * @memberof core.RedPointUpdate
         * @instance
         */
        RedPointUpdate.prototype.module = 0;

        /**
         * RedPointUpdate count.
         * @member {number} count
         * @memberof core.RedPointUpdate
         * @instance
         */
        RedPointUpdate.prototype.count = 0;

        /**
         * Creates a new RedPointUpdate instance using the specified properties.
         * @function create
         * @memberof core.RedPointUpdate
         * @static
         * @param {core.IRedPointUpdate=} [properties] Properties to set
         * @returns {core.RedPointUpdate} RedPointUpdate instance
         */
        RedPointUpdate.create = function create(properties) {
            return new RedPointUpdate(properties);
        };

        /**
         * Encodes the specified RedPointUpdate message. Does not implicitly {@link core.RedPointUpdate.verify|verify} messages.
         * @function encode
         * @memberof core.RedPointUpdate
         * @static
         * @param {core.IRedPointUpdate} message RedPointUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RedPointUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.module);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
            return writer;
        };

        /**
         * Encodes the specified RedPointUpdate message, length delimited. Does not implicitly {@link core.RedPointUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.RedPointUpdate
         * @static
         * @param {core.IRedPointUpdate} message RedPointUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RedPointUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RedPointUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof core.RedPointUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.RedPointUpdate} RedPointUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RedPointUpdate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.RedPointUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.module = reader.int32();
                    break;
                case 2:
                    message.count = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RedPointUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.RedPointUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.RedPointUpdate} RedPointUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RedPointUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RedPointUpdate message.
         * @function verify
         * @memberof core.RedPointUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RedPointUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.module != null && message.hasOwnProperty("module"))
                switch (message.module) {
                default:
                    return "module: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            return null;
        };

        /**
         * Creates a RedPointUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.RedPointUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.RedPointUpdate} RedPointUpdate
         */
        RedPointUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.core.RedPointUpdate)
                return object;
            var message = new $root.core.RedPointUpdate();
            switch (object.module) {
            case "RED_POINT_ACHIEVEMENT":
            case 0:
                message.module = 0;
                break;
            case "RED_POINT_SEASON_RANK":
            case 1:
                message.module = 1;
                break;
            case "RED_POINT_SEASON_TASK":
            case 2:
                message.module = 2;
                break;
            case "RED_POINT_SEASON_WHEEL":
            case 3:
                message.module = 3;
                break;
            case "RED_POINT_SYS_MESSAGE":
            case 4:
                message.module = 4;
                break;
            case "RED_POINT_ANNOUNCEMENT":
            case 5:
                message.module = 5;
                break;
            case "RED_POINT_RECORD":
            case 6:
                message.module = 6;
                break;
            case "RED_POINT_NEW_PLAYER_TASK":
            case 7:
                message.module = 7;
                break;
            }
            if (object.count != null)
                message.count = object.count | 0;
            return message;
        };

        /**
         * Creates a plain object from a RedPointUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.RedPointUpdate
         * @static
         * @param {core.RedPointUpdate} message RedPointUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RedPointUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.module = options.enums === String ? "RED_POINT_ACHIEVEMENT" : 0;
                object.count = 0;
            }
            if (message.module != null && message.hasOwnProperty("module"))
                object.module = options.enums === String ? $root.core.RedPointModule[message.module] : message.module;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this RedPointUpdate to JSON.
         * @function toJSON
         * @memberof core.RedPointUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RedPointUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RedPointUpdate;
    })();

    core.EvtDropLottery = (function() {

        /**
         * Properties of an EvtDropLottery.
         * @memberof core
         * @interface IEvtDropLottery
         * @property {number|null} [lv] EvtDropLottery lv
         * @property {number|null} [value] EvtDropLottery value
         */

        /**
         * Constructs a new EvtDropLottery.
         * @memberof core
         * @classdesc Represents an EvtDropLottery.
         * @implements IEvtDropLottery
         * @constructor
         * @param {core.IEvtDropLottery=} [properties] Properties to set
         */
        function EvtDropLottery(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtDropLottery lv.
         * @member {number} lv
         * @memberof core.EvtDropLottery
         * @instance
         */
        EvtDropLottery.prototype.lv = 0;

        /**
         * EvtDropLottery value.
         * @member {number} value
         * @memberof core.EvtDropLottery
         * @instance
         */
        EvtDropLottery.prototype.value = 0;

        /**
         * Creates a new EvtDropLottery instance using the specified properties.
         * @function create
         * @memberof core.EvtDropLottery
         * @static
         * @param {core.IEvtDropLottery=} [properties] Properties to set
         * @returns {core.EvtDropLottery} EvtDropLottery instance
         */
        EvtDropLottery.create = function create(properties) {
            return new EvtDropLottery(properties);
        };

        /**
         * Encodes the specified EvtDropLottery message. Does not implicitly {@link core.EvtDropLottery.verify|verify} messages.
         * @function encode
         * @memberof core.EvtDropLottery
         * @static
         * @param {core.IEvtDropLottery} message EvtDropLottery message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtDropLottery.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lv != null && Object.hasOwnProperty.call(message, "lv"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.lv);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.value);
            return writer;
        };

        /**
         * Encodes the specified EvtDropLottery message, length delimited. Does not implicitly {@link core.EvtDropLottery.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtDropLottery
         * @static
         * @param {core.IEvtDropLottery} message EvtDropLottery message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtDropLottery.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtDropLottery message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtDropLottery
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtDropLottery} EvtDropLottery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtDropLottery.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtDropLottery();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.lv = reader.int32();
                    break;
                case 2:
                    message.value = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtDropLottery message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtDropLottery
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtDropLottery} EvtDropLottery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtDropLottery.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtDropLottery message.
         * @function verify
         * @memberof core.EvtDropLottery
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtDropLottery.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.lv != null && message.hasOwnProperty("lv"))
                if (!$util.isInteger(message.lv))
                    return "lv: integer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value))
                    return "value: integer expected";
            return null;
        };

        /**
         * Creates an EvtDropLottery message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtDropLottery
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtDropLottery} EvtDropLottery
         */
        EvtDropLottery.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtDropLottery)
                return object;
            var message = new $root.core.EvtDropLottery();
            if (object.lv != null)
                message.lv = object.lv | 0;
            if (object.value != null)
                message.value = object.value | 0;
            return message;
        };

        /**
         * Creates a plain object from an EvtDropLottery message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtDropLottery
         * @static
         * @param {core.EvtDropLottery} message EvtDropLottery
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtDropLottery.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.lv = 0;
                object.value = 0;
            }
            if (message.lv != null && message.hasOwnProperty("lv"))
                object.lv = message.lv;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this EvtDropLottery to JSON.
         * @function toJSON
         * @memberof core.EvtDropLottery
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtDropLottery.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtDropLottery;
    })();

    /**
     * PropType enum.
     * @name core.PropType
     * @enum {number}
     * @property {number} PROP_TYPE_FREE=0 PROP_TYPE_FREE value
     * @property {number} PROP_TYPE_TICKET=1 PROP_TYPE_TICKET value
     * @property {number} PROP_TYPE_CASH=2 PROP_TYPE_CASH value
     * @property {number} PROP_TYPE_BIND_CASH=3 PROP_TYPE_BIND_CASH value
     * @property {number} PROP_TYPE_SEASON_SCORE=5 PROP_TYPE_SEASON_SCORE value
     * @property {number} PROP_TYPE_LOTTERY_LV1=6 PROP_TYPE_LOTTERY_LV1 value
     * @property {number} PROP_TYPE_LOTTERY_LV2=7 PROP_TYPE_LOTTERY_LV2 value
     * @property {number} PROP_TYPE_LOTTERY_LV3=8 PROP_TYPE_LOTTERY_LV3 value
     * @property {number} PROP_TYPE_LOTTERY_LV4=9 PROP_TYPE_LOTTERY_LV4 value
     * @property {number} PROP_TYPE_DIAMOND=10 PROP_TYPE_DIAMOND value
     */
    core.PropType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PROP_TYPE_FREE"] = 0;
        values[valuesById[1] = "PROP_TYPE_TICKET"] = 1;
        values[valuesById[2] = "PROP_TYPE_CASH"] = 2;
        values[valuesById[3] = "PROP_TYPE_BIND_CASH"] = 3;
        values[valuesById[5] = "PROP_TYPE_SEASON_SCORE"] = 5;
        values[valuesById[6] = "PROP_TYPE_LOTTERY_LV1"] = 6;
        values[valuesById[7] = "PROP_TYPE_LOTTERY_LV2"] = 7;
        values[valuesById[8] = "PROP_TYPE_LOTTERY_LV3"] = 8;
        values[valuesById[9] = "PROP_TYPE_LOTTERY_LV4"] = 9;
        values[valuesById[10] = "PROP_TYPE_DIAMOND"] = 10;
        return values;
    })();

    core.CompetitionBroadcast = (function() {

        /**
         * Properties of a CompetitionBroadcast.
         * @memberof core
         * @interface ICompetitionBroadcast
         * @property {string|null} [nick] CompetitionBroadcast nick
         * @property {string|null} [avatar] CompetitionBroadcast avatar
         * @property {string|null} [game_name] CompetitionBroadcast game_name
         * @property {string|null} [match_name] CompetitionBroadcast match_name
         * @property {number|null} [time] CompetitionBroadcast time
         * @property {Array.<core.CompetitionBroadcast.IGameReward>|null} [rewards] CompetitionBroadcast rewards
         * @property {string|null} [area_code] CompetitionBroadcast area_code
         * @property {number|null} [room_type] CompetitionBroadcast room_type
         */

        /**
         * Constructs a new CompetitionBroadcast.
         * @memberof core
         * @classdesc Represents a CompetitionBroadcast.
         * @implements ICompetitionBroadcast
         * @constructor
         * @param {core.ICompetitionBroadcast=} [properties] Properties to set
         */
        function CompetitionBroadcast(properties) {
            this.rewards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompetitionBroadcast nick.
         * @member {string} nick
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.nick = "";

        /**
         * CompetitionBroadcast avatar.
         * @member {string} avatar
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.avatar = "";

        /**
         * CompetitionBroadcast game_name.
         * @member {string} game_name
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.game_name = "";

        /**
         * CompetitionBroadcast match_name.
         * @member {string} match_name
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.match_name = "";

        /**
         * CompetitionBroadcast time.
         * @member {number} time
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CompetitionBroadcast rewards.
         * @member {Array.<core.CompetitionBroadcast.IGameReward>} rewards
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.rewards = $util.emptyArray;

        /**
         * CompetitionBroadcast area_code.
         * @member {string} area_code
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.area_code = "";

        /**
         * CompetitionBroadcast room_type.
         * @member {number} room_type
         * @memberof core.CompetitionBroadcast
         * @instance
         */
        CompetitionBroadcast.prototype.room_type = 0;

        /**
         * Creates a new CompetitionBroadcast instance using the specified properties.
         * @function create
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {core.ICompetitionBroadcast=} [properties] Properties to set
         * @returns {core.CompetitionBroadcast} CompetitionBroadcast instance
         */
        CompetitionBroadcast.create = function create(properties) {
            return new CompetitionBroadcast(properties);
        };

        /**
         * Encodes the specified CompetitionBroadcast message. Does not implicitly {@link core.CompetitionBroadcast.verify|verify} messages.
         * @function encode
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {core.ICompetitionBroadcast} message CompetitionBroadcast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompetitionBroadcast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nick != null && Object.hasOwnProperty.call(message, "nick"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nick);
            if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.avatar);
            if (message.game_name != null && Object.hasOwnProperty.call(message, "game_name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.game_name);
            if (message.match_name != null && Object.hasOwnProperty.call(message, "match_name"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.match_name);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.time);
            if (message.rewards != null && message.rewards.length)
                for (var i = 0; i < message.rewards.length; ++i)
                    $root.core.CompetitionBroadcast.GameReward.encode(message.rewards[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.area_code != null && Object.hasOwnProperty.call(message, "area_code"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.area_code);
            if (message.room_type != null && Object.hasOwnProperty.call(message, "room_type"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.room_type);
            return writer;
        };

        /**
         * Encodes the specified CompetitionBroadcast message, length delimited. Does not implicitly {@link core.CompetitionBroadcast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {core.ICompetitionBroadcast} message CompetitionBroadcast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompetitionBroadcast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompetitionBroadcast message from the specified reader or buffer.
         * @function decode
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.CompetitionBroadcast} CompetitionBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompetitionBroadcast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.CompetitionBroadcast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nick = reader.string();
                    break;
                case 2:
                    message.avatar = reader.string();
                    break;
                case 3:
                    message.game_name = reader.string();
                    break;
                case 4:
                    message.match_name = reader.string();
                    break;
                case 5:
                    message.time = reader.int64();
                    break;
                case 6:
                    if (!(message.rewards && message.rewards.length))
                        message.rewards = [];
                    message.rewards.push($root.core.CompetitionBroadcast.GameReward.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.area_code = reader.string();
                    break;
                case 8:
                    message.room_type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompetitionBroadcast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.CompetitionBroadcast} CompetitionBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompetitionBroadcast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompetitionBroadcast message.
         * @function verify
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompetitionBroadcast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.game_name != null && message.hasOwnProperty("game_name"))
                if (!$util.isString(message.game_name))
                    return "game_name: string expected";
            if (message.match_name != null && message.hasOwnProperty("match_name"))
                if (!$util.isString(message.match_name))
                    return "match_name: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.rewards != null && message.hasOwnProperty("rewards")) {
                if (!Array.isArray(message.rewards))
                    return "rewards: array expected";
                for (var i = 0; i < message.rewards.length; ++i) {
                    var error = $root.core.CompetitionBroadcast.GameReward.verify(message.rewards[i]);
                    if (error)
                        return "rewards." + error;
                }
            }
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                if (!$util.isString(message.area_code))
                    return "area_code: string expected";
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                if (!$util.isInteger(message.room_type))
                    return "room_type: integer expected";
            return null;
        };

        /**
         * Creates a CompetitionBroadcast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.CompetitionBroadcast} CompetitionBroadcast
         */
        CompetitionBroadcast.fromObject = function fromObject(object) {
            if (object instanceof $root.core.CompetitionBroadcast)
                return object;
            var message = new $root.core.CompetitionBroadcast();
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.game_name != null)
                message.game_name = String(object.game_name);
            if (object.match_name != null)
                message.match_name = String(object.match_name);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.rewards) {
                if (!Array.isArray(object.rewards))
                    throw TypeError(".core.CompetitionBroadcast.rewards: array expected");
                message.rewards = [];
                for (var i = 0; i < object.rewards.length; ++i) {
                    if (typeof object.rewards[i] !== "object")
                        throw TypeError(".core.CompetitionBroadcast.rewards: object expected");
                    message.rewards[i] = $root.core.CompetitionBroadcast.GameReward.fromObject(object.rewards[i]);
                }
            }
            if (object.area_code != null)
                message.area_code = String(object.area_code);
            if (object.room_type != null)
                message.room_type = object.room_type | 0;
            return message;
        };

        /**
         * Creates a plain object from a CompetitionBroadcast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.CompetitionBroadcast
         * @static
         * @param {core.CompetitionBroadcast} message CompetitionBroadcast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompetitionBroadcast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rewards = [];
            if (options.defaults) {
                object.nick = "";
                object.avatar = "";
                object.game_name = "";
                object.match_name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.area_code = "";
                object.room_type = 0;
            }
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.game_name != null && message.hasOwnProperty("game_name"))
                object.game_name = message.game_name;
            if (message.match_name != null && message.hasOwnProperty("match_name"))
                object.match_name = message.match_name;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.rewards && message.rewards.length) {
                object.rewards = [];
                for (var j = 0; j < message.rewards.length; ++j)
                    object.rewards[j] = $root.core.CompetitionBroadcast.GameReward.toObject(message.rewards[j], options);
            }
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                object.area_code = message.area_code;
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                object.room_type = message.room_type;
            return object;
        };

        /**
         * Converts this CompetitionBroadcast to JSON.
         * @function toJSON
         * @memberof core.CompetitionBroadcast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompetitionBroadcast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CompetitionBroadcast.GameReward = (function() {

            /**
             * Properties of a GameReward.
             * @memberof core.CompetitionBroadcast
             * @interface IGameReward
             * @property {core.PropType|null} [prop_type] GameReward prop_type
             * @property {number|null} [amount] GameReward amount
             */

            /**
             * Constructs a new GameReward.
             * @memberof core.CompetitionBroadcast
             * @classdesc Represents a GameReward.
             * @implements IGameReward
             * @constructor
             * @param {core.CompetitionBroadcast.IGameReward=} [properties] Properties to set
             */
            function GameReward(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GameReward prop_type.
             * @member {core.PropType} prop_type
             * @memberof core.CompetitionBroadcast.GameReward
             * @instance
             */
            GameReward.prototype.prop_type = 0;

            /**
             * GameReward amount.
             * @member {number} amount
             * @memberof core.CompetitionBroadcast.GameReward
             * @instance
             */
            GameReward.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new GameReward instance using the specified properties.
             * @function create
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {core.CompetitionBroadcast.IGameReward=} [properties] Properties to set
             * @returns {core.CompetitionBroadcast.GameReward} GameReward instance
             */
            GameReward.create = function create(properties) {
                return new GameReward(properties);
            };

            /**
             * Encodes the specified GameReward message. Does not implicitly {@link core.CompetitionBroadcast.GameReward.verify|verify} messages.
             * @function encode
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {core.CompetitionBroadcast.IGameReward} message GameReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameReward.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.prop_type != null && Object.hasOwnProperty.call(message, "prop_type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.prop_type);
                if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
                return writer;
            };

            /**
             * Encodes the specified GameReward message, length delimited. Does not implicitly {@link core.CompetitionBroadcast.GameReward.verify|verify} messages.
             * @function encodeDelimited
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {core.CompetitionBroadcast.IGameReward} message GameReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameReward.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GameReward message from the specified reader or buffer.
             * @function decode
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {core.CompetitionBroadcast.GameReward} GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameReward.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.CompetitionBroadcast.GameReward();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.prop_type = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GameReward message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {core.CompetitionBroadcast.GameReward} GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameReward.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GameReward message.
             * @function verify
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GameReward.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    switch (message.prop_type) {
                    default:
                        return "prop_type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        break;
                    }
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                        return "amount: integer|Long expected";
                return null;
            };

            /**
             * Creates a GameReward message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {core.CompetitionBroadcast.GameReward} GameReward
             */
            GameReward.fromObject = function fromObject(object) {
                if (object instanceof $root.core.CompetitionBroadcast.GameReward)
                    return object;
                var message = new $root.core.CompetitionBroadcast.GameReward();
                switch (object.prop_type) {
                case "PROP_TYPE_FREE":
                case 0:
                    message.prop_type = 0;
                    break;
                case "PROP_TYPE_TICKET":
                case 1:
                    message.prop_type = 1;
                    break;
                case "PROP_TYPE_CASH":
                case 2:
                    message.prop_type = 2;
                    break;
                case "PROP_TYPE_BIND_CASH":
                case 3:
                    message.prop_type = 3;
                    break;
                case "PROP_TYPE_SEASON_SCORE":
                case 5:
                    message.prop_type = 5;
                    break;
                case "PROP_TYPE_LOTTERY_LV1":
                case 6:
                    message.prop_type = 6;
                    break;
                case "PROP_TYPE_LOTTERY_LV2":
                case 7:
                    message.prop_type = 7;
                    break;
                case "PROP_TYPE_LOTTERY_LV3":
                case 8:
                    message.prop_type = 8;
                    break;
                case "PROP_TYPE_LOTTERY_LV4":
                case 9:
                    message.prop_type = 9;
                    break;
                case "PROP_TYPE_DIAMOND":
                case 10:
                    message.prop_type = 10;
                    break;
                }
                if (object.amount != null)
                    if ($util.Long)
                        (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                    else if (typeof object.amount === "string")
                        message.amount = parseInt(object.amount, 10);
                    else if (typeof object.amount === "number")
                        message.amount = object.amount;
                    else if (typeof object.amount === "object")
                        message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a GameReward message. Also converts values to other types if specified.
             * @function toObject
             * @memberof core.CompetitionBroadcast.GameReward
             * @static
             * @param {core.CompetitionBroadcast.GameReward} message GameReward
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GameReward.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.prop_type = options.enums === String ? "PROP_TYPE_FREE" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.amount = options.longs === String ? "0" : 0;
                }
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    object.prop_type = options.enums === String ? $root.core.PropType[message.prop_type] : message.prop_type;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (typeof message.amount === "number")
                        object.amount = options.longs === String ? String(message.amount) : message.amount;
                    else
                        object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
                return object;
            };

            /**
             * Converts this GameReward to JSON.
             * @function toJSON
             * @memberof core.CompetitionBroadcast.GameReward
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GameReward.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GameReward;
        })();

        return CompetitionBroadcast;
    })();

    core.EvtMarqueeBroadcast = (function() {

        /**
         * Properties of an EvtMarqueeBroadcast.
         * @memberof core
         * @interface IEvtMarqueeBroadcast
         * @property {string|null} [content] EvtMarqueeBroadcast content
         * @property {number|null} [priority] EvtMarqueeBroadcast priority
         */

        /**
         * Constructs a new EvtMarqueeBroadcast.
         * @memberof core
         * @classdesc Represents an EvtMarqueeBroadcast.
         * @implements IEvtMarqueeBroadcast
         * @constructor
         * @param {core.IEvtMarqueeBroadcast=} [properties] Properties to set
         */
        function EvtMarqueeBroadcast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtMarqueeBroadcast content.
         * @member {string} content
         * @memberof core.EvtMarqueeBroadcast
         * @instance
         */
        EvtMarqueeBroadcast.prototype.content = "";

        /**
         * EvtMarqueeBroadcast priority.
         * @member {number} priority
         * @memberof core.EvtMarqueeBroadcast
         * @instance
         */
        EvtMarqueeBroadcast.prototype.priority = 0;

        /**
         * Creates a new EvtMarqueeBroadcast instance using the specified properties.
         * @function create
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {core.IEvtMarqueeBroadcast=} [properties] Properties to set
         * @returns {core.EvtMarqueeBroadcast} EvtMarqueeBroadcast instance
         */
        EvtMarqueeBroadcast.create = function create(properties) {
            return new EvtMarqueeBroadcast(properties);
        };

        /**
         * Encodes the specified EvtMarqueeBroadcast message. Does not implicitly {@link core.EvtMarqueeBroadcast.verify|verify} messages.
         * @function encode
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {core.IEvtMarqueeBroadcast} message EvtMarqueeBroadcast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtMarqueeBroadcast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
            if (message.priority != null && Object.hasOwnProperty.call(message, "priority"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.priority);
            return writer;
        };

        /**
         * Encodes the specified EvtMarqueeBroadcast message, length delimited. Does not implicitly {@link core.EvtMarqueeBroadcast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {core.IEvtMarqueeBroadcast} message EvtMarqueeBroadcast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtMarqueeBroadcast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtMarqueeBroadcast message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtMarqueeBroadcast} EvtMarqueeBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtMarqueeBroadcast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtMarqueeBroadcast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.content = reader.string();
                    break;
                case 2:
                    message.priority = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtMarqueeBroadcast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtMarqueeBroadcast} EvtMarqueeBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtMarqueeBroadcast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtMarqueeBroadcast message.
         * @function verify
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtMarqueeBroadcast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.priority != null && message.hasOwnProperty("priority"))
                if (!$util.isInteger(message.priority))
                    return "priority: integer expected";
            return null;
        };

        /**
         * Creates an EvtMarqueeBroadcast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtMarqueeBroadcast} EvtMarqueeBroadcast
         */
        EvtMarqueeBroadcast.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtMarqueeBroadcast)
                return object;
            var message = new $root.core.EvtMarqueeBroadcast();
            if (object.content != null)
                message.content = String(object.content);
            if (object.priority != null)
                message.priority = object.priority | 0;
            return message;
        };

        /**
         * Creates a plain object from an EvtMarqueeBroadcast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtMarqueeBroadcast
         * @static
         * @param {core.EvtMarqueeBroadcast} message EvtMarqueeBroadcast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtMarqueeBroadcast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.content = "";
                object.priority = 0;
            }
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.priority != null && message.hasOwnProperty("priority"))
                object.priority = message.priority;
            return object;
        };

        /**
         * Converts this EvtMarqueeBroadcast to JSON.
         * @function toJSON
         * @memberof core.EvtMarqueeBroadcast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtMarqueeBroadcast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtMarqueeBroadcast;
    })();

    core.ActivityRechargeReceive = (function() {

        /**
         * Properties of an ActivityRechargeReceive.
         * @memberof core
         * @interface IActivityRechargeReceive
         * @property {Array.<core.ActivityRechargeReceive.IActivityRechargeReward>|null} [rewards] ActivityRechargeReceive rewards
         * @property {number|null} [activity_id] ActivityRechargeReceive activity_id
         * @property {number|null} [time] ActivityRechargeReceive time
         */

        /**
         * Constructs a new ActivityRechargeReceive.
         * @memberof core
         * @classdesc Represents an ActivityRechargeReceive.
         * @implements IActivityRechargeReceive
         * @constructor
         * @param {core.IActivityRechargeReceive=} [properties] Properties to set
         */
        function ActivityRechargeReceive(properties) {
            this.rewards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActivityRechargeReceive rewards.
         * @member {Array.<core.ActivityRechargeReceive.IActivityRechargeReward>} rewards
         * @memberof core.ActivityRechargeReceive
         * @instance
         */
        ActivityRechargeReceive.prototype.rewards = $util.emptyArray;

        /**
         * ActivityRechargeReceive activity_id.
         * @member {number} activity_id
         * @memberof core.ActivityRechargeReceive
         * @instance
         */
        ActivityRechargeReceive.prototype.activity_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ActivityRechargeReceive time.
         * @member {number} time
         * @memberof core.ActivityRechargeReceive
         * @instance
         */
        ActivityRechargeReceive.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ActivityRechargeReceive instance using the specified properties.
         * @function create
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {core.IActivityRechargeReceive=} [properties] Properties to set
         * @returns {core.ActivityRechargeReceive} ActivityRechargeReceive instance
         */
        ActivityRechargeReceive.create = function create(properties) {
            return new ActivityRechargeReceive(properties);
        };

        /**
         * Encodes the specified ActivityRechargeReceive message. Does not implicitly {@link core.ActivityRechargeReceive.verify|verify} messages.
         * @function encode
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {core.IActivityRechargeReceive} message ActivityRechargeReceive message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivityRechargeReceive.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.rewards.length)
                for (var i = 0; i < message.rewards.length; ++i)
                    $root.core.ActivityRechargeReceive.ActivityRechargeReward.encode(message.rewards[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.activity_id != null && Object.hasOwnProperty.call(message, "activity_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.activity_id);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified ActivityRechargeReceive message, length delimited. Does not implicitly {@link core.ActivityRechargeReceive.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {core.IActivityRechargeReceive} message ActivityRechargeReceive message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivityRechargeReceive.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActivityRechargeReceive message from the specified reader or buffer.
         * @function decode
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.ActivityRechargeReceive} ActivityRechargeReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivityRechargeReceive.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.ActivityRechargeReceive();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.rewards && message.rewards.length))
                        message.rewards = [];
                    message.rewards.push($root.core.ActivityRechargeReceive.ActivityRechargeReward.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.activity_id = reader.int64();
                    break;
                case 4:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActivityRechargeReceive message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.ActivityRechargeReceive} ActivityRechargeReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivityRechargeReceive.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActivityRechargeReceive message.
         * @function verify
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActivityRechargeReceive.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards")) {
                if (!Array.isArray(message.rewards))
                    return "rewards: array expected";
                for (var i = 0; i < message.rewards.length; ++i) {
                    var error = $root.core.ActivityRechargeReceive.ActivityRechargeReward.verify(message.rewards[i]);
                    if (error)
                        return "rewards." + error;
                }
            }
            if (message.activity_id != null && message.hasOwnProperty("activity_id"))
                if (!$util.isInteger(message.activity_id) && !(message.activity_id && $util.isInteger(message.activity_id.low) && $util.isInteger(message.activity_id.high)))
                    return "activity_id: integer|Long expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates an ActivityRechargeReceive message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.ActivityRechargeReceive} ActivityRechargeReceive
         */
        ActivityRechargeReceive.fromObject = function fromObject(object) {
            if (object instanceof $root.core.ActivityRechargeReceive)
                return object;
            var message = new $root.core.ActivityRechargeReceive();
            if (object.rewards) {
                if (!Array.isArray(object.rewards))
                    throw TypeError(".core.ActivityRechargeReceive.rewards: array expected");
                message.rewards = [];
                for (var i = 0; i < object.rewards.length; ++i) {
                    if (typeof object.rewards[i] !== "object")
                        throw TypeError(".core.ActivityRechargeReceive.rewards: object expected");
                    message.rewards[i] = $root.core.ActivityRechargeReceive.ActivityRechargeReward.fromObject(object.rewards[i]);
                }
            }
            if (object.activity_id != null)
                if ($util.Long)
                    (message.activity_id = $util.Long.fromValue(object.activity_id)).unsigned = false;
                else if (typeof object.activity_id === "string")
                    message.activity_id = parseInt(object.activity_id, 10);
                else if (typeof object.activity_id === "number")
                    message.activity_id = object.activity_id;
                else if (typeof object.activity_id === "object")
                    message.activity_id = new $util.LongBits(object.activity_id.low >>> 0, object.activity_id.high >>> 0).toNumber();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an ActivityRechargeReceive message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.ActivityRechargeReceive
         * @static
         * @param {core.ActivityRechargeReceive} message ActivityRechargeReceive
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActivityRechargeReceive.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rewards = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.activity_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.activity_id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.rewards && message.rewards.length) {
                object.rewards = [];
                for (var j = 0; j < message.rewards.length; ++j)
                    object.rewards[j] = $root.core.ActivityRechargeReceive.ActivityRechargeReward.toObject(message.rewards[j], options);
            }
            if (message.activity_id != null && message.hasOwnProperty("activity_id"))
                if (typeof message.activity_id === "number")
                    object.activity_id = options.longs === String ? String(message.activity_id) : message.activity_id;
                else
                    object.activity_id = options.longs === String ? $util.Long.prototype.toString.call(message.activity_id) : options.longs === Number ? new $util.LongBits(message.activity_id.low >>> 0, message.activity_id.high >>> 0).toNumber() : message.activity_id;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this ActivityRechargeReceive to JSON.
         * @function toJSON
         * @memberof core.ActivityRechargeReceive
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActivityRechargeReceive.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        ActivityRechargeReceive.ActivityRechargeReward = (function() {

            /**
             * Properties of an ActivityRechargeReward.
             * @memberof core.ActivityRechargeReceive
             * @interface IActivityRechargeReward
             * @property {core.PropType|null} [prop_type] ActivityRechargeReward prop_type
             * @property {number|null} [amount] ActivityRechargeReward amount
             */

            /**
             * Constructs a new ActivityRechargeReward.
             * @memberof core.ActivityRechargeReceive
             * @classdesc Represents an ActivityRechargeReward.
             * @implements IActivityRechargeReward
             * @constructor
             * @param {core.ActivityRechargeReceive.IActivityRechargeReward=} [properties] Properties to set
             */
            function ActivityRechargeReward(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActivityRechargeReward prop_type.
             * @member {core.PropType} prop_type
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @instance
             */
            ActivityRechargeReward.prototype.prop_type = 0;

            /**
             * ActivityRechargeReward amount.
             * @member {number} amount
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @instance
             */
            ActivityRechargeReward.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new ActivityRechargeReward instance using the specified properties.
             * @function create
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {core.ActivityRechargeReceive.IActivityRechargeReward=} [properties] Properties to set
             * @returns {core.ActivityRechargeReceive.ActivityRechargeReward} ActivityRechargeReward instance
             */
            ActivityRechargeReward.create = function create(properties) {
                return new ActivityRechargeReward(properties);
            };

            /**
             * Encodes the specified ActivityRechargeReward message. Does not implicitly {@link core.ActivityRechargeReceive.ActivityRechargeReward.verify|verify} messages.
             * @function encode
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {core.ActivityRechargeReceive.IActivityRechargeReward} message ActivityRechargeReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActivityRechargeReward.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.prop_type != null && Object.hasOwnProperty.call(message, "prop_type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.prop_type);
                if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
                return writer;
            };

            /**
             * Encodes the specified ActivityRechargeReward message, length delimited. Does not implicitly {@link core.ActivityRechargeReceive.ActivityRechargeReward.verify|verify} messages.
             * @function encodeDelimited
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {core.ActivityRechargeReceive.IActivityRechargeReward} message ActivityRechargeReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActivityRechargeReward.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ActivityRechargeReward message from the specified reader or buffer.
             * @function decode
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {core.ActivityRechargeReceive.ActivityRechargeReward} ActivityRechargeReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActivityRechargeReward.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.ActivityRechargeReceive.ActivityRechargeReward();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.prop_type = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ActivityRechargeReward message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {core.ActivityRechargeReceive.ActivityRechargeReward} ActivityRechargeReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActivityRechargeReward.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ActivityRechargeReward message.
             * @function verify
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ActivityRechargeReward.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    switch (message.prop_type) {
                    default:
                        return "prop_type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        break;
                    }
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                        return "amount: integer|Long expected";
                return null;
            };

            /**
             * Creates an ActivityRechargeReward message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {core.ActivityRechargeReceive.ActivityRechargeReward} ActivityRechargeReward
             */
            ActivityRechargeReward.fromObject = function fromObject(object) {
                if (object instanceof $root.core.ActivityRechargeReceive.ActivityRechargeReward)
                    return object;
                var message = new $root.core.ActivityRechargeReceive.ActivityRechargeReward();
                switch (object.prop_type) {
                case "PROP_TYPE_FREE":
                case 0:
                    message.prop_type = 0;
                    break;
                case "PROP_TYPE_TICKET":
                case 1:
                    message.prop_type = 1;
                    break;
                case "PROP_TYPE_CASH":
                case 2:
                    message.prop_type = 2;
                    break;
                case "PROP_TYPE_BIND_CASH":
                case 3:
                    message.prop_type = 3;
                    break;
                case "PROP_TYPE_SEASON_SCORE":
                case 5:
                    message.prop_type = 5;
                    break;
                case "PROP_TYPE_LOTTERY_LV1":
                case 6:
                    message.prop_type = 6;
                    break;
                case "PROP_TYPE_LOTTERY_LV2":
                case 7:
                    message.prop_type = 7;
                    break;
                case "PROP_TYPE_LOTTERY_LV3":
                case 8:
                    message.prop_type = 8;
                    break;
                case "PROP_TYPE_LOTTERY_LV4":
                case 9:
                    message.prop_type = 9;
                    break;
                case "PROP_TYPE_DIAMOND":
                case 10:
                    message.prop_type = 10;
                    break;
                }
                if (object.amount != null)
                    if ($util.Long)
                        (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                    else if (typeof object.amount === "string")
                        message.amount = parseInt(object.amount, 10);
                    else if (typeof object.amount === "number")
                        message.amount = object.amount;
                    else if (typeof object.amount === "object")
                        message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an ActivityRechargeReward message. Also converts values to other types if specified.
             * @function toObject
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @static
             * @param {core.ActivityRechargeReceive.ActivityRechargeReward} message ActivityRechargeReward
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActivityRechargeReward.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.prop_type = options.enums === String ? "PROP_TYPE_FREE" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.amount = options.longs === String ? "0" : 0;
                }
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    object.prop_type = options.enums === String ? $root.core.PropType[message.prop_type] : message.prop_type;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (typeof message.amount === "number")
                        object.amount = options.longs === String ? String(message.amount) : message.amount;
                    else
                        object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
                return object;
            };

            /**
             * Converts this ActivityRechargeReward to JSON.
             * @function toJSON
             * @memberof core.ActivityRechargeReceive.ActivityRechargeReward
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActivityRechargeReward.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActivityRechargeReward;
        })();

        return ActivityRechargeReceive;
    })();

    core.RechargeRewardNotify = (function() {

        /**
         * Properties of a RechargeRewardNotify.
         * @memberof core
         * @interface IRechargeRewardNotify
         * @property {core.PropType|null} [prop_type] RechargeRewardNotify prop_type
         * @property {number|null} [amount] RechargeRewardNotify amount
         * @property {number|null} [time] RechargeRewardNotify time
         */

        /**
         * Constructs a new RechargeRewardNotify.
         * @memberof core
         * @classdesc Represents a RechargeRewardNotify.
         * @implements IRechargeRewardNotify
         * @constructor
         * @param {core.IRechargeRewardNotify=} [properties] Properties to set
         */
        function RechargeRewardNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RechargeRewardNotify prop_type.
         * @member {core.PropType} prop_type
         * @memberof core.RechargeRewardNotify
         * @instance
         */
        RechargeRewardNotify.prototype.prop_type = 0;

        /**
         * RechargeRewardNotify amount.
         * @member {number} amount
         * @memberof core.RechargeRewardNotify
         * @instance
         */
        RechargeRewardNotify.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RechargeRewardNotify time.
         * @member {number} time
         * @memberof core.RechargeRewardNotify
         * @instance
         */
        RechargeRewardNotify.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RechargeRewardNotify instance using the specified properties.
         * @function create
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {core.IRechargeRewardNotify=} [properties] Properties to set
         * @returns {core.RechargeRewardNotify} RechargeRewardNotify instance
         */
        RechargeRewardNotify.create = function create(properties) {
            return new RechargeRewardNotify(properties);
        };

        /**
         * Encodes the specified RechargeRewardNotify message. Does not implicitly {@link core.RechargeRewardNotify.verify|verify} messages.
         * @function encode
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {core.IRechargeRewardNotify} message RechargeRewardNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RechargeRewardNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.prop_type != null && Object.hasOwnProperty.call(message, "prop_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.prop_type);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified RechargeRewardNotify message, length delimited. Does not implicitly {@link core.RechargeRewardNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {core.IRechargeRewardNotify} message RechargeRewardNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RechargeRewardNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RechargeRewardNotify message from the specified reader or buffer.
         * @function decode
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.RechargeRewardNotify} RechargeRewardNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RechargeRewardNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.RechargeRewardNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.prop_type = reader.int32();
                    break;
                case 2:
                    message.amount = reader.int64();
                    break;
                case 3:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RechargeRewardNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.RechargeRewardNotify} RechargeRewardNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RechargeRewardNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RechargeRewardNotify message.
         * @function verify
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RechargeRewardNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                switch (message.prop_type) {
                default:
                    return "prop_type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    break;
                }
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a RechargeRewardNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.RechargeRewardNotify} RechargeRewardNotify
         */
        RechargeRewardNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.core.RechargeRewardNotify)
                return object;
            var message = new $root.core.RechargeRewardNotify();
            switch (object.prop_type) {
            case "PROP_TYPE_FREE":
            case 0:
                message.prop_type = 0;
                break;
            case "PROP_TYPE_TICKET":
            case 1:
                message.prop_type = 1;
                break;
            case "PROP_TYPE_CASH":
            case 2:
                message.prop_type = 2;
                break;
            case "PROP_TYPE_BIND_CASH":
            case 3:
                message.prop_type = 3;
                break;
            case "PROP_TYPE_SEASON_SCORE":
            case 5:
                message.prop_type = 5;
                break;
            case "PROP_TYPE_LOTTERY_LV1":
            case 6:
                message.prop_type = 6;
                break;
            case "PROP_TYPE_LOTTERY_LV2":
            case 7:
                message.prop_type = 7;
                break;
            case "PROP_TYPE_LOTTERY_LV3":
            case 8:
                message.prop_type = 8;
                break;
            case "PROP_TYPE_LOTTERY_LV4":
            case 9:
                message.prop_type = 9;
                break;
            case "PROP_TYPE_DIAMOND":
            case 10:
                message.prop_type = 10;
                break;
            }
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RechargeRewardNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.RechargeRewardNotify
         * @static
         * @param {core.RechargeRewardNotify} message RechargeRewardNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RechargeRewardNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.prop_type = options.enums === String ? "PROP_TYPE_FREE" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                object.prop_type = options.enums === String ? $root.core.PropType[message.prop_type] : message.prop_type;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this RechargeRewardNotify to JSON.
         * @function toJSON
         * @memberof core.RechargeRewardNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RechargeRewardNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RechargeRewardNotify;
    })();

    core.UserRankUP = (function() {

        /**
         * Properties of a UserRankUP.
         * @memberof core
         * @interface IUserRankUP
         * @property {number|null} [rank] UserRankUP rank
         * @property {number|null} [ratio] UserRankUP ratio
         * @property {number|null} [before_rank] UserRankUP before_rank
         */

        /**
         * Constructs a new UserRankUP.
         * @memberof core
         * @classdesc Represents a UserRankUP.
         * @implements IUserRankUP
         * @constructor
         * @param {core.IUserRankUP=} [properties] Properties to set
         */
        function UserRankUP(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRankUP rank.
         * @member {number} rank
         * @memberof core.UserRankUP
         * @instance
         */
        UserRankUP.prototype.rank = 0;

        /**
         * UserRankUP ratio.
         * @member {number} ratio
         * @memberof core.UserRankUP
         * @instance
         */
        UserRankUP.prototype.ratio = 0;

        /**
         * UserRankUP before_rank.
         * @member {number} before_rank
         * @memberof core.UserRankUP
         * @instance
         */
        UserRankUP.prototype.before_rank = 0;

        /**
         * Creates a new UserRankUP instance using the specified properties.
         * @function create
         * @memberof core.UserRankUP
         * @static
         * @param {core.IUserRankUP=} [properties] Properties to set
         * @returns {core.UserRankUP} UserRankUP instance
         */
        UserRankUP.create = function create(properties) {
            return new UserRankUP(properties);
        };

        /**
         * Encodes the specified UserRankUP message. Does not implicitly {@link core.UserRankUP.verify|verify} messages.
         * @function encode
         * @memberof core.UserRankUP
         * @static
         * @param {core.IUserRankUP} message UserRankUP message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRankUP.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rank != null && Object.hasOwnProperty.call(message, "rank"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rank);
            if (message.ratio != null && Object.hasOwnProperty.call(message, "ratio"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ratio);
            if (message.before_rank != null && Object.hasOwnProperty.call(message, "before_rank"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.before_rank);
            return writer;
        };

        /**
         * Encodes the specified UserRankUP message, length delimited. Does not implicitly {@link core.UserRankUP.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.UserRankUP
         * @static
         * @param {core.IUserRankUP} message UserRankUP message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRankUP.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRankUP message from the specified reader or buffer.
         * @function decode
         * @memberof core.UserRankUP
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.UserRankUP} UserRankUP
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRankUP.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.UserRankUP();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rank = reader.int32();
                    break;
                case 2:
                    message.ratio = reader.int32();
                    break;
                case 3:
                    message.before_rank = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRankUP message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.UserRankUP
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.UserRankUP} UserRankUP
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRankUP.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRankUP message.
         * @function verify
         * @memberof core.UserRankUP
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRankUP.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rank != null && message.hasOwnProperty("rank"))
                if (!$util.isInteger(message.rank))
                    return "rank: integer expected";
            if (message.ratio != null && message.hasOwnProperty("ratio"))
                if (!$util.isInteger(message.ratio))
                    return "ratio: integer expected";
            if (message.before_rank != null && message.hasOwnProperty("before_rank"))
                if (!$util.isInteger(message.before_rank))
                    return "before_rank: integer expected";
            return null;
        };

        /**
         * Creates a UserRankUP message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.UserRankUP
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.UserRankUP} UserRankUP
         */
        UserRankUP.fromObject = function fromObject(object) {
            if (object instanceof $root.core.UserRankUP)
                return object;
            var message = new $root.core.UserRankUP();
            if (object.rank != null)
                message.rank = object.rank | 0;
            if (object.ratio != null)
                message.ratio = object.ratio | 0;
            if (object.before_rank != null)
                message.before_rank = object.before_rank | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserRankUP message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.UserRankUP
         * @static
         * @param {core.UserRankUP} message UserRankUP
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRankUP.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.rank = 0;
                object.ratio = 0;
                object.before_rank = 0;
            }
            if (message.rank != null && message.hasOwnProperty("rank"))
                object.rank = message.rank;
            if (message.ratio != null && message.hasOwnProperty("ratio"))
                object.ratio = message.ratio;
            if (message.before_rank != null && message.hasOwnProperty("before_rank"))
                object.before_rank = message.before_rank;
            return object;
        };

        /**
         * Converts this UserRankUP to JSON.
         * @function toJSON
         * @memberof core.UserRankUP
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRankUP.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRankUP;
    })();

    core.EvtUserAccountBand = (function() {

        /**
         * Properties of an EvtUserAccountBand.
         * @memberof core
         * @interface IEvtUserAccountBand
         */

        /**
         * Constructs a new EvtUserAccountBand.
         * @memberof core
         * @classdesc Represents an EvtUserAccountBand.
         * @implements IEvtUserAccountBand
         * @constructor
         * @param {core.IEvtUserAccountBand=} [properties] Properties to set
         */
        function EvtUserAccountBand(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new EvtUserAccountBand instance using the specified properties.
         * @function create
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {core.IEvtUserAccountBand=} [properties] Properties to set
         * @returns {core.EvtUserAccountBand} EvtUserAccountBand instance
         */
        EvtUserAccountBand.create = function create(properties) {
            return new EvtUserAccountBand(properties);
        };

        /**
         * Encodes the specified EvtUserAccountBand message. Does not implicitly {@link core.EvtUserAccountBand.verify|verify} messages.
         * @function encode
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {core.IEvtUserAccountBand} message EvtUserAccountBand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserAccountBand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified EvtUserAccountBand message, length delimited. Does not implicitly {@link core.EvtUserAccountBand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {core.IEvtUserAccountBand} message EvtUserAccountBand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserAccountBand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtUserAccountBand message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtUserAccountBand} EvtUserAccountBand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserAccountBand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtUserAccountBand();
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
         * Decodes an EvtUserAccountBand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtUserAccountBand} EvtUserAccountBand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserAccountBand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtUserAccountBand message.
         * @function verify
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtUserAccountBand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an EvtUserAccountBand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtUserAccountBand} EvtUserAccountBand
         */
        EvtUserAccountBand.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtUserAccountBand)
                return object;
            return new $root.core.EvtUserAccountBand();
        };

        /**
         * Creates a plain object from an EvtUserAccountBand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtUserAccountBand
         * @static
         * @param {core.EvtUserAccountBand} message EvtUserAccountBand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtUserAccountBand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this EvtUserAccountBand to JSON.
         * @function toJSON
         * @memberof core.EvtUserAccountBand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtUserAccountBand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtUserAccountBand;
    })();

    core.JoinMatchReq = (function() {

        /**
         * Properties of a JoinMatchReq.
         * @memberof core
         * @interface IJoinMatchReq
         * @property {number|null} [room_id] JoinMatchReq room_id
         * @property {number|null} [desk_id] JoinMatchReq desk_id
         * @property {number|null} [retry_num] JoinMatchReq retry_num
         * @property {number|null} [new_player_match] JoinMatchReq new_player_match
         */

        /**
         * Constructs a new JoinMatchReq.
         * @memberof core
         * @classdesc Represents a JoinMatchReq.
         * @implements IJoinMatchReq
         * @constructor
         * @param {core.IJoinMatchReq=} [properties] Properties to set
         */
        function JoinMatchReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinMatchReq room_id.
         * @member {number} room_id
         * @memberof core.JoinMatchReq
         * @instance
         */
        JoinMatchReq.prototype.room_id = 0;

        /**
         * JoinMatchReq desk_id.
         * @member {number} desk_id
         * @memberof core.JoinMatchReq
         * @instance
         */
        JoinMatchReq.prototype.desk_id = 0;

        /**
         * JoinMatchReq retry_num.
         * @member {number} retry_num
         * @memberof core.JoinMatchReq
         * @instance
         */
        JoinMatchReq.prototype.retry_num = 0;

        /**
         * JoinMatchReq new_player_match.
         * @member {number} new_player_match
         * @memberof core.JoinMatchReq
         * @instance
         */
        JoinMatchReq.prototype.new_player_match = 0;

        /**
         * Creates a new JoinMatchReq instance using the specified properties.
         * @function create
         * @memberof core.JoinMatchReq
         * @static
         * @param {core.IJoinMatchReq=} [properties] Properties to set
         * @returns {core.JoinMatchReq} JoinMatchReq instance
         */
        JoinMatchReq.create = function create(properties) {
            return new JoinMatchReq(properties);
        };

        /**
         * Encodes the specified JoinMatchReq message. Does not implicitly {@link core.JoinMatchReq.verify|verify} messages.
         * @function encode
         * @memberof core.JoinMatchReq
         * @static
         * @param {core.IJoinMatchReq} message JoinMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinMatchReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.room_id != null && Object.hasOwnProperty.call(message, "room_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.room_id);
            if (message.desk_id != null && Object.hasOwnProperty.call(message, "desk_id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.desk_id);
            if (message.retry_num != null && Object.hasOwnProperty.call(message, "retry_num"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.retry_num);
            if (message.new_player_match != null && Object.hasOwnProperty.call(message, "new_player_match"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.new_player_match);
            return writer;
        };

        /**
         * Encodes the specified JoinMatchReq message, length delimited. Does not implicitly {@link core.JoinMatchReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.JoinMatchReq
         * @static
         * @param {core.IJoinMatchReq} message JoinMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinMatchReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinMatchReq message from the specified reader or buffer.
         * @function decode
         * @memberof core.JoinMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.JoinMatchReq} JoinMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinMatchReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.JoinMatchReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.room_id = reader.int32();
                    break;
                case 2:
                    message.desk_id = reader.int32();
                    break;
                case 3:
                    message.retry_num = reader.int32();
                    break;
                case 4:
                    message.new_player_match = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinMatchReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.JoinMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.JoinMatchReq} JoinMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinMatchReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinMatchReq message.
         * @function verify
         * @memberof core.JoinMatchReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinMatchReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (!$util.isInteger(message.room_id))
                    return "room_id: integer expected";
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (!$util.isInteger(message.desk_id))
                    return "desk_id: integer expected";
            if (message.retry_num != null && message.hasOwnProperty("retry_num"))
                if (!$util.isInteger(message.retry_num))
                    return "retry_num: integer expected";
            if (message.new_player_match != null && message.hasOwnProperty("new_player_match"))
                if (!$util.isInteger(message.new_player_match))
                    return "new_player_match: integer expected";
            return null;
        };

        /**
         * Creates a JoinMatchReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.JoinMatchReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.JoinMatchReq} JoinMatchReq
         */
        JoinMatchReq.fromObject = function fromObject(object) {
            if (object instanceof $root.core.JoinMatchReq)
                return object;
            var message = new $root.core.JoinMatchReq();
            if (object.room_id != null)
                message.room_id = object.room_id | 0;
            if (object.desk_id != null)
                message.desk_id = object.desk_id | 0;
            if (object.retry_num != null)
                message.retry_num = object.retry_num | 0;
            if (object.new_player_match != null)
                message.new_player_match = object.new_player_match | 0;
            return message;
        };

        /**
         * Creates a plain object from a JoinMatchReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.JoinMatchReq
         * @static
         * @param {core.JoinMatchReq} message JoinMatchReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinMatchReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.room_id = 0;
                object.desk_id = 0;
                object.retry_num = 0;
                object.new_player_match = 0;
            }
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                object.room_id = message.room_id;
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                object.desk_id = message.desk_id;
            if (message.retry_num != null && message.hasOwnProperty("retry_num"))
                object.retry_num = message.retry_num;
            if (message.new_player_match != null && message.hasOwnProperty("new_player_match"))
                object.new_player_match = message.new_player_match;
            return object;
        };

        /**
         * Converts this JoinMatchReq to JSON.
         * @function toJSON
         * @memberof core.JoinMatchReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinMatchReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinMatchReq;
    })();

    core.JoinMatchRsp = (function() {

        /**
         * Properties of a JoinMatchRsp.
         * @memberof core
         * @interface IJoinMatchRsp
         */

        /**
         * Constructs a new JoinMatchRsp.
         * @memberof core
         * @classdesc Represents a JoinMatchRsp.
         * @implements IJoinMatchRsp
         * @constructor
         * @param {core.IJoinMatchRsp=} [properties] Properties to set
         */
        function JoinMatchRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new JoinMatchRsp instance using the specified properties.
         * @function create
         * @memberof core.JoinMatchRsp
         * @static
         * @param {core.IJoinMatchRsp=} [properties] Properties to set
         * @returns {core.JoinMatchRsp} JoinMatchRsp instance
         */
        JoinMatchRsp.create = function create(properties) {
            return new JoinMatchRsp(properties);
        };

        /**
         * Encodes the specified JoinMatchRsp message. Does not implicitly {@link core.JoinMatchRsp.verify|verify} messages.
         * @function encode
         * @memberof core.JoinMatchRsp
         * @static
         * @param {core.IJoinMatchRsp} message JoinMatchRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinMatchRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified JoinMatchRsp message, length delimited. Does not implicitly {@link core.JoinMatchRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.JoinMatchRsp
         * @static
         * @param {core.IJoinMatchRsp} message JoinMatchRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinMatchRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinMatchRsp message from the specified reader or buffer.
         * @function decode
         * @memberof core.JoinMatchRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.JoinMatchRsp} JoinMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinMatchRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.JoinMatchRsp();
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
         * Decodes a JoinMatchRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.JoinMatchRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.JoinMatchRsp} JoinMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinMatchRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinMatchRsp message.
         * @function verify
         * @memberof core.JoinMatchRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinMatchRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a JoinMatchRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.JoinMatchRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.JoinMatchRsp} JoinMatchRsp
         */
        JoinMatchRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.core.JoinMatchRsp)
                return object;
            return new $root.core.JoinMatchRsp();
        };

        /**
         * Creates a plain object from a JoinMatchRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.JoinMatchRsp
         * @static
         * @param {core.JoinMatchRsp} message JoinMatchRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinMatchRsp.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this JoinMatchRsp to JSON.
         * @function toJSON
         * @memberof core.JoinMatchRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinMatchRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinMatchRsp;
    })();

    core.CancelMatchReq = (function() {

        /**
         * Properties of a CancelMatchReq.
         * @memberof core
         * @interface ICancelMatchReq
         */

        /**
         * Constructs a new CancelMatchReq.
         * @memberof core
         * @classdesc Represents a CancelMatchReq.
         * @implements ICancelMatchReq
         * @constructor
         * @param {core.ICancelMatchReq=} [properties] Properties to set
         */
        function CancelMatchReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CancelMatchReq instance using the specified properties.
         * @function create
         * @memberof core.CancelMatchReq
         * @static
         * @param {core.ICancelMatchReq=} [properties] Properties to set
         * @returns {core.CancelMatchReq} CancelMatchReq instance
         */
        CancelMatchReq.create = function create(properties) {
            return new CancelMatchReq(properties);
        };

        /**
         * Encodes the specified CancelMatchReq message. Does not implicitly {@link core.CancelMatchReq.verify|verify} messages.
         * @function encode
         * @memberof core.CancelMatchReq
         * @static
         * @param {core.ICancelMatchReq} message CancelMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified CancelMatchReq message, length delimited. Does not implicitly {@link core.CancelMatchReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.CancelMatchReq
         * @static
         * @param {core.ICancelMatchReq} message CancelMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelMatchReq message from the specified reader or buffer.
         * @function decode
         * @memberof core.CancelMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.CancelMatchReq} CancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.CancelMatchReq();
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
         * Decodes a CancelMatchReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.CancelMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.CancelMatchReq} CancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelMatchReq message.
         * @function verify
         * @memberof core.CancelMatchReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelMatchReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a CancelMatchReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.CancelMatchReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.CancelMatchReq} CancelMatchReq
         */
        CancelMatchReq.fromObject = function fromObject(object) {
            if (object instanceof $root.core.CancelMatchReq)
                return object;
            return new $root.core.CancelMatchReq();
        };

        /**
         * Creates a plain object from a CancelMatchReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.CancelMatchReq
         * @static
         * @param {core.CancelMatchReq} message CancelMatchReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelMatchReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CancelMatchReq to JSON.
         * @function toJSON
         * @memberof core.CancelMatchReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelMatchReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CancelMatchReq;
    })();

    core.CancelMatchRsp = (function() {

        /**
         * Properties of a CancelMatchRsp.
         * @memberof core
         * @interface ICancelMatchRsp
         */

        /**
         * Constructs a new CancelMatchRsp.
         * @memberof core
         * @classdesc Represents a CancelMatchRsp.
         * @implements ICancelMatchRsp
         * @constructor
         * @param {core.ICancelMatchRsp=} [properties] Properties to set
         */
        function CancelMatchRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CancelMatchRsp instance using the specified properties.
         * @function create
         * @memberof core.CancelMatchRsp
         * @static
         * @param {core.ICancelMatchRsp=} [properties] Properties to set
         * @returns {core.CancelMatchRsp} CancelMatchRsp instance
         */
        CancelMatchRsp.create = function create(properties) {
            return new CancelMatchRsp(properties);
        };

        /**
         * Encodes the specified CancelMatchRsp message. Does not implicitly {@link core.CancelMatchRsp.verify|verify} messages.
         * @function encode
         * @memberof core.CancelMatchRsp
         * @static
         * @param {core.ICancelMatchRsp} message CancelMatchRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified CancelMatchRsp message, length delimited. Does not implicitly {@link core.CancelMatchRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.CancelMatchRsp
         * @static
         * @param {core.ICancelMatchRsp} message CancelMatchRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelMatchRsp message from the specified reader or buffer.
         * @function decode
         * @memberof core.CancelMatchRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.CancelMatchRsp} CancelMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.CancelMatchRsp();
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
         * Decodes a CancelMatchRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.CancelMatchRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.CancelMatchRsp} CancelMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelMatchRsp message.
         * @function verify
         * @memberof core.CancelMatchRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelMatchRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a CancelMatchRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.CancelMatchRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.CancelMatchRsp} CancelMatchRsp
         */
        CancelMatchRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.core.CancelMatchRsp)
                return object;
            return new $root.core.CancelMatchRsp();
        };

        /**
         * Creates a plain object from a CancelMatchRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.CancelMatchRsp
         * @static
         * @param {core.CancelMatchRsp} message CancelMatchRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelMatchRsp.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CancelMatchRsp to JSON.
         * @function toJSON
         * @memberof core.CancelMatchRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelMatchRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CancelMatchRsp;
    })();

    core.FinishGameReq = (function() {

        /**
         * Properties of a FinishGameReq.
         * @memberof core
         * @interface IFinishGameReq
         * @property {number|null} [score] FinishGameReq score
         * @property {string|null} [steps] FinishGameReq steps
         * @property {string|null} [check_code] FinishGameReq check_code
         * @property {string|null} [score_steps] FinishGameReq score_steps
         * @property {number|null} [time] FinishGameReq time
         */

        /**
         * Constructs a new FinishGameReq.
         * @memberof core
         * @classdesc Represents a FinishGameReq.
         * @implements IFinishGameReq
         * @constructor
         * @param {core.IFinishGameReq=} [properties] Properties to set
         */
        function FinishGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FinishGameReq score.
         * @member {number} score
         * @memberof core.FinishGameReq
         * @instance
         */
        FinishGameReq.prototype.score = 0;

        /**
         * FinishGameReq steps.
         * @member {string} steps
         * @memberof core.FinishGameReq
         * @instance
         */
        FinishGameReq.prototype.steps = "";

        /**
         * FinishGameReq check_code.
         * @member {string} check_code
         * @memberof core.FinishGameReq
         * @instance
         */
        FinishGameReq.prototype.check_code = "";

        /**
         * FinishGameReq score_steps.
         * @member {string} score_steps
         * @memberof core.FinishGameReq
         * @instance
         */
        FinishGameReq.prototype.score_steps = "";

        /**
         * FinishGameReq time.
         * @member {number} time
         * @memberof core.FinishGameReq
         * @instance
         */
        FinishGameReq.prototype.time = 0;

        /**
         * Creates a new FinishGameReq instance using the specified properties.
         * @function create
         * @memberof core.FinishGameReq
         * @static
         * @param {core.IFinishGameReq=} [properties] Properties to set
         * @returns {core.FinishGameReq} FinishGameReq instance
         */
        FinishGameReq.create = function create(properties) {
            return new FinishGameReq(properties);
        };

        /**
         * Encodes the specified FinishGameReq message. Does not implicitly {@link core.FinishGameReq.verify|verify} messages.
         * @function encode
         * @memberof core.FinishGameReq
         * @static
         * @param {core.IFinishGameReq} message FinishGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FinishGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.score);
            if (message.steps != null && Object.hasOwnProperty.call(message, "steps"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.steps);
            if (message.check_code != null && Object.hasOwnProperty.call(message, "check_code"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.check_code);
            if (message.score_steps != null && Object.hasOwnProperty.call(message, "score_steps"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.score_steps);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.time);
            return writer;
        };

        /**
         * Encodes the specified FinishGameReq message, length delimited. Does not implicitly {@link core.FinishGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.FinishGameReq
         * @static
         * @param {core.IFinishGameReq} message FinishGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FinishGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FinishGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof core.FinishGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.FinishGameReq} FinishGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FinishGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.FinishGameReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.score = reader.int32();
                    break;
                case 2:
                    message.steps = reader.string();
                    break;
                case 3:
                    message.check_code = reader.string();
                    break;
                case 4:
                    message.score_steps = reader.string();
                    break;
                case 5:
                    message.time = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FinishGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.FinishGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.FinishGameReq} FinishGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FinishGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FinishGameReq message.
         * @function verify
         * @memberof core.FinishGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FinishGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.steps != null && message.hasOwnProperty("steps"))
                if (!$util.isString(message.steps))
                    return "steps: string expected";
            if (message.check_code != null && message.hasOwnProperty("check_code"))
                if (!$util.isString(message.check_code))
                    return "check_code: string expected";
            if (message.score_steps != null && message.hasOwnProperty("score_steps"))
                if (!$util.isString(message.score_steps))
                    return "score_steps: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time))
                    return "time: integer expected";
            return null;
        };

        /**
         * Creates a FinishGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.FinishGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.FinishGameReq} FinishGameReq
         */
        FinishGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.core.FinishGameReq)
                return object;
            var message = new $root.core.FinishGameReq();
            if (object.score != null)
                message.score = object.score | 0;
            if (object.steps != null)
                message.steps = String(object.steps);
            if (object.check_code != null)
                message.check_code = String(object.check_code);
            if (object.score_steps != null)
                message.score_steps = String(object.score_steps);
            if (object.time != null)
                message.time = object.time | 0;
            return message;
        };

        /**
         * Creates a plain object from a FinishGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.FinishGameReq
         * @static
         * @param {core.FinishGameReq} message FinishGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FinishGameReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.score = 0;
                object.steps = "";
                object.check_code = "";
                object.score_steps = "";
                object.time = 0;
            }
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            if (message.steps != null && message.hasOwnProperty("steps"))
                object.steps = message.steps;
            if (message.check_code != null && message.hasOwnProperty("check_code"))
                object.check_code = message.check_code;
            if (message.score_steps != null && message.hasOwnProperty("score_steps"))
                object.score_steps = message.score_steps;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            return object;
        };

        /**
         * Converts this FinishGameReq to JSON.
         * @function toJSON
         * @memberof core.FinishGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FinishGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FinishGameReq;
    })();

    core.FinishGameRsp = (function() {

        /**
         * Properties of a FinishGameRsp.
         * @memberof core
         * @interface IFinishGameRsp
         */

        /**
         * Constructs a new FinishGameRsp.
         * @memberof core
         * @classdesc Represents a FinishGameRsp.
         * @implements IFinishGameRsp
         * @constructor
         * @param {core.IFinishGameRsp=} [properties] Properties to set
         */
        function FinishGameRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new FinishGameRsp instance using the specified properties.
         * @function create
         * @memberof core.FinishGameRsp
         * @static
         * @param {core.IFinishGameRsp=} [properties] Properties to set
         * @returns {core.FinishGameRsp} FinishGameRsp instance
         */
        FinishGameRsp.create = function create(properties) {
            return new FinishGameRsp(properties);
        };

        /**
         * Encodes the specified FinishGameRsp message. Does not implicitly {@link core.FinishGameRsp.verify|verify} messages.
         * @function encode
         * @memberof core.FinishGameRsp
         * @static
         * @param {core.IFinishGameRsp} message FinishGameRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FinishGameRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified FinishGameRsp message, length delimited. Does not implicitly {@link core.FinishGameRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.FinishGameRsp
         * @static
         * @param {core.IFinishGameRsp} message FinishGameRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FinishGameRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FinishGameRsp message from the specified reader or buffer.
         * @function decode
         * @memberof core.FinishGameRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.FinishGameRsp} FinishGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FinishGameRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.FinishGameRsp();
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
         * Decodes a FinishGameRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.FinishGameRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.FinishGameRsp} FinishGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FinishGameRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FinishGameRsp message.
         * @function verify
         * @memberof core.FinishGameRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FinishGameRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a FinishGameRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.FinishGameRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.FinishGameRsp} FinishGameRsp
         */
        FinishGameRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.core.FinishGameRsp)
                return object;
            return new $root.core.FinishGameRsp();
        };

        /**
         * Creates a plain object from a FinishGameRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.FinishGameRsp
         * @static
         * @param {core.FinishGameRsp} message FinishGameRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FinishGameRsp.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this FinishGameRsp to JSON.
         * @function toJSON
         * @memberof core.FinishGameRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FinishGameRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FinishGameRsp;
    })();

    /**
     * MatchStatus enum.
     * @name core.MatchStatus
     * @enum {number}
     * @property {number} STATUS_MATCHING=0 STATUS_MATCHING value
     * @property {number} STATUS_FINISHED=1 STATUS_FINISHED value
     */
    core.MatchStatus = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "STATUS_MATCHING"] = 0;
        values[valuesById[1] = "STATUS_FINISHED"] = 1;
        return values;
    })();

    core.MatchPlayerData = (function() {

        /**
         * Properties of a MatchPlayerData.
         * @memberof core
         * @interface IMatchPlayerData
         * @property {number|null} [uid] MatchPlayerData uid
         * @property {string|null} [nick] MatchPlayerData nick
         * @property {string|null} [avatar] MatchPlayerData avatar
         * @property {string|null} [area_code] MatchPlayerData area_code
         */

        /**
         * Constructs a new MatchPlayerData.
         * @memberof core
         * @classdesc Represents a MatchPlayerData.
         * @implements IMatchPlayerData
         * @constructor
         * @param {core.IMatchPlayerData=} [properties] Properties to set
         */
        function MatchPlayerData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchPlayerData uid.
         * @member {number} uid
         * @memberof core.MatchPlayerData
         * @instance
         */
        MatchPlayerData.prototype.uid = 0;

        /**
         * MatchPlayerData nick.
         * @member {string} nick
         * @memberof core.MatchPlayerData
         * @instance
         */
        MatchPlayerData.prototype.nick = "";

        /**
         * MatchPlayerData avatar.
         * @member {string} avatar
         * @memberof core.MatchPlayerData
         * @instance
         */
        MatchPlayerData.prototype.avatar = "";

        /**
         * MatchPlayerData area_code.
         * @member {string} area_code
         * @memberof core.MatchPlayerData
         * @instance
         */
        MatchPlayerData.prototype.area_code = "";

        /**
         * Creates a new MatchPlayerData instance using the specified properties.
         * @function create
         * @memberof core.MatchPlayerData
         * @static
         * @param {core.IMatchPlayerData=} [properties] Properties to set
         * @returns {core.MatchPlayerData} MatchPlayerData instance
         */
        MatchPlayerData.create = function create(properties) {
            return new MatchPlayerData(properties);
        };

        /**
         * Encodes the specified MatchPlayerData message. Does not implicitly {@link core.MatchPlayerData.verify|verify} messages.
         * @function encode
         * @memberof core.MatchPlayerData
         * @static
         * @param {core.IMatchPlayerData} message MatchPlayerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchPlayerData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.nick != null && Object.hasOwnProperty.call(message, "nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nick);
            if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
            if (message.area_code != null && Object.hasOwnProperty.call(message, "area_code"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.area_code);
            return writer;
        };

        /**
         * Encodes the specified MatchPlayerData message, length delimited. Does not implicitly {@link core.MatchPlayerData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.MatchPlayerData
         * @static
         * @param {core.IMatchPlayerData} message MatchPlayerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchPlayerData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchPlayerData message from the specified reader or buffer.
         * @function decode
         * @memberof core.MatchPlayerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.MatchPlayerData} MatchPlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchPlayerData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.MatchPlayerData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                case 2:
                    message.nick = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.area_code = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchPlayerData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.MatchPlayerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.MatchPlayerData} MatchPlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchPlayerData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchPlayerData message.
         * @function verify
         * @memberof core.MatchPlayerData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchPlayerData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                if (!$util.isString(message.area_code))
                    return "area_code: string expected";
            return null;
        };

        /**
         * Creates a MatchPlayerData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.MatchPlayerData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.MatchPlayerData} MatchPlayerData
         */
        MatchPlayerData.fromObject = function fromObject(object) {
            if (object instanceof $root.core.MatchPlayerData)
                return object;
            var message = new $root.core.MatchPlayerData();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.area_code != null)
                message.area_code = String(object.area_code);
            return message;
        };

        /**
         * Creates a plain object from a MatchPlayerData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.MatchPlayerData
         * @static
         * @param {core.MatchPlayerData} message MatchPlayerData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchPlayerData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.nick = "";
                object.avatar = "";
                object.area_code = "";
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                object.area_code = message.area_code;
            return object;
        };

        /**
         * Converts this MatchPlayerData to JSON.
         * @function toJSON
         * @memberof core.MatchPlayerData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchPlayerData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MatchPlayerData;
    })();

    core.GameMatchInfo = (function() {

        /**
         * Properties of a GameMatchInfo.
         * @memberof core
         * @interface IGameMatchInfo
         * @property {Array.<core.IMatchPlayerData>|null} [list] GameMatchInfo list
         * @property {number|null} [left_time] GameMatchInfo left_time
         * @property {number|null} [today_best_score] GameMatchInfo today_best_score
         * @property {number|null} [life_best_score] GameMatchInfo life_best_score
         * @property {string|null} [token] GameMatchInfo token
         * @property {number|null} [total_score] GameMatchInfo total_score
         * @property {number|null} [total_round] GameMatchInfo total_round
         */

        /**
         * Constructs a new GameMatchInfo.
         * @memberof core
         * @classdesc Represents a GameMatchInfo.
         * @implements IGameMatchInfo
         * @constructor
         * @param {core.IGameMatchInfo=} [properties] Properties to set
         */
        function GameMatchInfo(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameMatchInfo list.
         * @member {Array.<core.IMatchPlayerData>} list
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.list = $util.emptyArray;

        /**
         * GameMatchInfo left_time.
         * @member {number} left_time
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.left_time = 0;

        /**
         * GameMatchInfo today_best_score.
         * @member {number} today_best_score
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.today_best_score = 0;

        /**
         * GameMatchInfo life_best_score.
         * @member {number} life_best_score
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.life_best_score = 0;

        /**
         * GameMatchInfo token.
         * @member {string} token
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.token = "";

        /**
         * GameMatchInfo total_score.
         * @member {number} total_score
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.total_score = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GameMatchInfo total_round.
         * @member {number} total_round
         * @memberof core.GameMatchInfo
         * @instance
         */
        GameMatchInfo.prototype.total_round = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GameMatchInfo instance using the specified properties.
         * @function create
         * @memberof core.GameMatchInfo
         * @static
         * @param {core.IGameMatchInfo=} [properties] Properties to set
         * @returns {core.GameMatchInfo} GameMatchInfo instance
         */
        GameMatchInfo.create = function create(properties) {
            return new GameMatchInfo(properties);
        };

        /**
         * Encodes the specified GameMatchInfo message. Does not implicitly {@link core.GameMatchInfo.verify|verify} messages.
         * @function encode
         * @memberof core.GameMatchInfo
         * @static
         * @param {core.IGameMatchInfo} message GameMatchInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMatchInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.core.MatchPlayerData.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.left_time != null && Object.hasOwnProperty.call(message, "left_time"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.left_time);
            if (message.today_best_score != null && Object.hasOwnProperty.call(message, "today_best_score"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.today_best_score);
            if (message.life_best_score != null && Object.hasOwnProperty.call(message, "life_best_score"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.life_best_score);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.token);
            if (message.total_score != null && Object.hasOwnProperty.call(message, "total_score"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.total_score);
            if (message.total_round != null && Object.hasOwnProperty.call(message, "total_round"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.total_round);
            return writer;
        };

        /**
         * Encodes the specified GameMatchInfo message, length delimited. Does not implicitly {@link core.GameMatchInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.GameMatchInfo
         * @static
         * @param {core.IGameMatchInfo} message GameMatchInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMatchInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameMatchInfo message from the specified reader or buffer.
         * @function decode
         * @memberof core.GameMatchInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.GameMatchInfo} GameMatchInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMatchInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.GameMatchInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.core.MatchPlayerData.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.left_time = reader.int32();
                    break;
                case 3:
                    message.today_best_score = reader.int32();
                    break;
                case 4:
                    message.life_best_score = reader.int32();
                    break;
                case 5:
                    message.token = reader.string();
                    break;
                case 6:
                    message.total_score = reader.int64();
                    break;
                case 7:
                    message.total_round = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameMatchInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.GameMatchInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.GameMatchInfo} GameMatchInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMatchInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameMatchInfo message.
         * @function verify
         * @memberof core.GameMatchInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameMatchInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.core.MatchPlayerData.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            if (message.left_time != null && message.hasOwnProperty("left_time"))
                if (!$util.isInteger(message.left_time))
                    return "left_time: integer expected";
            if (message.today_best_score != null && message.hasOwnProperty("today_best_score"))
                if (!$util.isInteger(message.today_best_score))
                    return "today_best_score: integer expected";
            if (message.life_best_score != null && message.hasOwnProperty("life_best_score"))
                if (!$util.isInteger(message.life_best_score))
                    return "life_best_score: integer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.total_score != null && message.hasOwnProperty("total_score"))
                if (!$util.isInteger(message.total_score) && !(message.total_score && $util.isInteger(message.total_score.low) && $util.isInteger(message.total_score.high)))
                    return "total_score: integer|Long expected";
            if (message.total_round != null && message.hasOwnProperty("total_round"))
                if (!$util.isInteger(message.total_round) && !(message.total_round && $util.isInteger(message.total_round.low) && $util.isInteger(message.total_round.high)))
                    return "total_round: integer|Long expected";
            return null;
        };

        /**
         * Creates a GameMatchInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.GameMatchInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.GameMatchInfo} GameMatchInfo
         */
        GameMatchInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.core.GameMatchInfo)
                return object;
            var message = new $root.core.GameMatchInfo();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".core.GameMatchInfo.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".core.GameMatchInfo.list: object expected");
                    message.list[i] = $root.core.MatchPlayerData.fromObject(object.list[i]);
                }
            }
            if (object.left_time != null)
                message.left_time = object.left_time | 0;
            if (object.today_best_score != null)
                message.today_best_score = object.today_best_score | 0;
            if (object.life_best_score != null)
                message.life_best_score = object.life_best_score | 0;
            if (object.token != null)
                message.token = String(object.token);
            if (object.total_score != null)
                if ($util.Long)
                    (message.total_score = $util.Long.fromValue(object.total_score)).unsigned = false;
                else if (typeof object.total_score === "string")
                    message.total_score = parseInt(object.total_score, 10);
                else if (typeof object.total_score === "number")
                    message.total_score = object.total_score;
                else if (typeof object.total_score === "object")
                    message.total_score = new $util.LongBits(object.total_score.low >>> 0, object.total_score.high >>> 0).toNumber();
            if (object.total_round != null)
                if ($util.Long)
                    (message.total_round = $util.Long.fromValue(object.total_round)).unsigned = false;
                else if (typeof object.total_round === "string")
                    message.total_round = parseInt(object.total_round, 10);
                else if (typeof object.total_round === "number")
                    message.total_round = object.total_round;
                else if (typeof object.total_round === "object")
                    message.total_round = new $util.LongBits(object.total_round.low >>> 0, object.total_round.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GameMatchInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.GameMatchInfo
         * @static
         * @param {core.GameMatchInfo} message GameMatchInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameMatchInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults) {
                object.left_time = 0;
                object.today_best_score = 0;
                object.life_best_score = 0;
                object.token = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.total_score = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.total_score = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.total_round = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.total_round = options.longs === String ? "0" : 0;
            }
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.core.MatchPlayerData.toObject(message.list[j], options);
            }
            if (message.left_time != null && message.hasOwnProperty("left_time"))
                object.left_time = message.left_time;
            if (message.today_best_score != null && message.hasOwnProperty("today_best_score"))
                object.today_best_score = message.today_best_score;
            if (message.life_best_score != null && message.hasOwnProperty("life_best_score"))
                object.life_best_score = message.life_best_score;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.total_score != null && message.hasOwnProperty("total_score"))
                if (typeof message.total_score === "number")
                    object.total_score = options.longs === String ? String(message.total_score) : message.total_score;
                else
                    object.total_score = options.longs === String ? $util.Long.prototype.toString.call(message.total_score) : options.longs === Number ? new $util.LongBits(message.total_score.low >>> 0, message.total_score.high >>> 0).toNumber() : message.total_score;
            if (message.total_round != null && message.hasOwnProperty("total_round"))
                if (typeof message.total_round === "number")
                    object.total_round = options.longs === String ? String(message.total_round) : message.total_round;
                else
                    object.total_round = options.longs === String ? $util.Long.prototype.toString.call(message.total_round) : options.longs === Number ? new $util.LongBits(message.total_round.low >>> 0, message.total_round.high >>> 0).toNumber() : message.total_round;
            return object;
        };

        /**
         * Converts this GameMatchInfo to JSON.
         * @function toJSON
         * @memberof core.GameMatchInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameMatchInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameMatchInfo;
    })();

    core.Cards = (function() {

        /**
         * Properties of a Cards.
         * @memberof core
         * @interface ICards
         * @property {Array.<number>|null} [card] Cards card
         */

        /**
         * Constructs a new Cards.
         * @memberof core
         * @classdesc Represents a Cards.
         * @implements ICards
         * @constructor
         * @param {core.ICards=} [properties] Properties to set
         */
        function Cards(properties) {
            this.card = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Cards card.
         * @member {Array.<number>} card
         * @memberof core.Cards
         * @instance
         */
        Cards.prototype.card = $util.emptyArray;

        /**
         * Creates a new Cards instance using the specified properties.
         * @function create
         * @memberof core.Cards
         * @static
         * @param {core.ICards=} [properties] Properties to set
         * @returns {core.Cards} Cards instance
         */
        Cards.create = function create(properties) {
            return new Cards(properties);
        };

        /**
         * Encodes the specified Cards message. Does not implicitly {@link core.Cards.verify|verify} messages.
         * @function encode
         * @memberof core.Cards
         * @static
         * @param {core.ICards} message Cards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.card != null && message.card.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.card.length; ++i)
                    writer.uint32(message.card[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Cards message, length delimited. Does not implicitly {@link core.Cards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.Cards
         * @static
         * @param {core.ICards} message Cards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Cards message from the specified reader or buffer.
         * @function decode
         * @memberof core.Cards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.Cards} Cards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.Cards();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.card && message.card.length))
                        message.card = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.card.push(reader.uint32());
                    } else
                        message.card.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Cards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.Cards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.Cards} Cards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Cards message.
         * @function verify
         * @memberof core.Cards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Cards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.card != null && message.hasOwnProperty("card")) {
                if (!Array.isArray(message.card))
                    return "card: array expected";
                for (var i = 0; i < message.card.length; ++i)
                    if (!$util.isInteger(message.card[i]))
                        return "card: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Cards message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.Cards
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.Cards} Cards
         */
        Cards.fromObject = function fromObject(object) {
            if (object instanceof $root.core.Cards)
                return object;
            var message = new $root.core.Cards();
            if (object.card) {
                if (!Array.isArray(object.card))
                    throw TypeError(".core.Cards.card: array expected");
                message.card = [];
                for (var i = 0; i < object.card.length; ++i)
                    message.card[i] = object.card[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Cards message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.Cards
         * @static
         * @param {core.Cards} message Cards
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Cards.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.card = [];
            if (message.card && message.card.length) {
                object.card = [];
                for (var j = 0; j < message.card.length; ++j)
                    object.card[j] = message.card[j];
            }
            return object;
        };

        /**
         * Converts this Cards to JSON.
         * @function toJSON
         * @memberof core.Cards
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Cards.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Cards;
    })();

    core.CommonGameInitInfo = (function() {

        /**
         * Properties of a CommonGameInitInfo.
         * @memberof core
         * @interface ICommonGameInitInfo
         * @property {number|null} [random_seed] CommonGameInitInfo random_seed
         * @property {number|null} [difficulty] CommonGameInitInfo difficulty
         * @property {core.ICards|null} [RandAreaCards] CommonGameInitInfo RandAreaCards
         * @property {Array.<core.ICards>|null} [PileAreaCards] CommonGameInitInfo PileAreaCards
         */

        /**
         * Constructs a new CommonGameInitInfo.
         * @memberof core
         * @classdesc Represents a CommonGameInitInfo.
         * @implements ICommonGameInitInfo
         * @constructor
         * @param {core.ICommonGameInitInfo=} [properties] Properties to set
         */
        function CommonGameInitInfo(properties) {
            this.PileAreaCards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommonGameInitInfo random_seed.
         * @member {number} random_seed
         * @memberof core.CommonGameInitInfo
         * @instance
         */
        CommonGameInitInfo.prototype.random_seed = 0;

        /**
         * CommonGameInitInfo difficulty.
         * @member {number} difficulty
         * @memberof core.CommonGameInitInfo
         * @instance
         */
        CommonGameInitInfo.prototype.difficulty = 0;

        /**
         * CommonGameInitInfo RandAreaCards.
         * @member {core.ICards|null|undefined} RandAreaCards
         * @memberof core.CommonGameInitInfo
         * @instance
         */
        CommonGameInitInfo.prototype.RandAreaCards = null;

        /**
         * CommonGameInitInfo PileAreaCards.
         * @member {Array.<core.ICards>} PileAreaCards
         * @memberof core.CommonGameInitInfo
         * @instance
         */
        CommonGameInitInfo.prototype.PileAreaCards = $util.emptyArray;

        /**
         * Creates a new CommonGameInitInfo instance using the specified properties.
         * @function create
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {core.ICommonGameInitInfo=} [properties] Properties to set
         * @returns {core.CommonGameInitInfo} CommonGameInitInfo instance
         */
        CommonGameInitInfo.create = function create(properties) {
            return new CommonGameInitInfo(properties);
        };

        /**
         * Encodes the specified CommonGameInitInfo message. Does not implicitly {@link core.CommonGameInitInfo.verify|verify} messages.
         * @function encode
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {core.ICommonGameInitInfo} message CommonGameInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonGameInitInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.random_seed != null && Object.hasOwnProperty.call(message, "random_seed"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.random_seed);
            if (message.difficulty != null && Object.hasOwnProperty.call(message, "difficulty"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.difficulty);
            if (message.RandAreaCards != null && Object.hasOwnProperty.call(message, "RandAreaCards"))
                $root.core.Cards.encode(message.RandAreaCards, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.PileAreaCards != null && message.PileAreaCards.length)
                for (var i = 0; i < message.PileAreaCards.length; ++i)
                    $root.core.Cards.encode(message.PileAreaCards[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CommonGameInitInfo message, length delimited. Does not implicitly {@link core.CommonGameInitInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {core.ICommonGameInitInfo} message CommonGameInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonGameInitInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommonGameInitInfo message from the specified reader or buffer.
         * @function decode
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.CommonGameInitInfo} CommonGameInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonGameInitInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.CommonGameInitInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.random_seed = reader.uint32();
                    break;
                case 2:
                    message.difficulty = reader.uint32();
                    break;
                case 3:
                    message.RandAreaCards = $root.core.Cards.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.PileAreaCards && message.PileAreaCards.length))
                        message.PileAreaCards = [];
                    message.PileAreaCards.push($root.core.Cards.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommonGameInitInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.CommonGameInitInfo} CommonGameInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonGameInitInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommonGameInitInfo message.
         * @function verify
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommonGameInitInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.random_seed != null && message.hasOwnProperty("random_seed"))
                if (!$util.isInteger(message.random_seed))
                    return "random_seed: integer expected";
            if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                if (!$util.isInteger(message.difficulty))
                    return "difficulty: integer expected";
            if (message.RandAreaCards != null && message.hasOwnProperty("RandAreaCards")) {
                var error = $root.core.Cards.verify(message.RandAreaCards);
                if (error)
                    return "RandAreaCards." + error;
            }
            if (message.PileAreaCards != null && message.hasOwnProperty("PileAreaCards")) {
                if (!Array.isArray(message.PileAreaCards))
                    return "PileAreaCards: array expected";
                for (var i = 0; i < message.PileAreaCards.length; ++i) {
                    var error = $root.core.Cards.verify(message.PileAreaCards[i]);
                    if (error)
                        return "PileAreaCards." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CommonGameInitInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.CommonGameInitInfo} CommonGameInitInfo
         */
        CommonGameInitInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.core.CommonGameInitInfo)
                return object;
            var message = new $root.core.CommonGameInitInfo();
            if (object.random_seed != null)
                message.random_seed = object.random_seed >>> 0;
            if (object.difficulty != null)
                message.difficulty = object.difficulty >>> 0;
            if (object.RandAreaCards != null) {
                if (typeof object.RandAreaCards !== "object")
                    throw TypeError(".core.CommonGameInitInfo.RandAreaCards: object expected");
                message.RandAreaCards = $root.core.Cards.fromObject(object.RandAreaCards);
            }
            if (object.PileAreaCards) {
                if (!Array.isArray(object.PileAreaCards))
                    throw TypeError(".core.CommonGameInitInfo.PileAreaCards: array expected");
                message.PileAreaCards = [];
                for (var i = 0; i < object.PileAreaCards.length; ++i) {
                    if (typeof object.PileAreaCards[i] !== "object")
                        throw TypeError(".core.CommonGameInitInfo.PileAreaCards: object expected");
                    message.PileAreaCards[i] = $root.core.Cards.fromObject(object.PileAreaCards[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CommonGameInitInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.CommonGameInitInfo
         * @static
         * @param {core.CommonGameInitInfo} message CommonGameInitInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommonGameInitInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.PileAreaCards = [];
            if (options.defaults) {
                object.random_seed = 0;
                object.difficulty = 0;
                object.RandAreaCards = null;
            }
            if (message.random_seed != null && message.hasOwnProperty("random_seed"))
                object.random_seed = message.random_seed;
            if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                object.difficulty = message.difficulty;
            if (message.RandAreaCards != null && message.hasOwnProperty("RandAreaCards"))
                object.RandAreaCards = $root.core.Cards.toObject(message.RandAreaCards, options);
            if (message.PileAreaCards && message.PileAreaCards.length) {
                object.PileAreaCards = [];
                for (var j = 0; j < message.PileAreaCards.length; ++j)
                    object.PileAreaCards[j] = $root.core.Cards.toObject(message.PileAreaCards[j], options);
            }
            return object;
        };

        /**
         * Converts this CommonGameInitInfo to JSON.
         * @function toJSON
         * @memberof core.CommonGameInitInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommonGameInitInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonGameInitInfo;
    })();

    core.EvtMatchNotify = (function() {

        /**
         * Properties of an EvtMatchNotify.
         * @memberof core
         * @interface IEvtMatchNotify
         * @property {core.MatchStatus|null} [match_status] EvtMatchNotify match_status
         * @property {string|null} [uuid] EvtMatchNotify uuid
         * @property {number|null} [room_type] EvtMatchNotify room_type
         * @property {core.IGameMatchInfo|null} [match_info] EvtMatchNotify match_info
         * @property {core.ICommonGameInitInfo|null} [game_init] EvtMatchNotify game_init
         * @property {number|null} [desk_id] EvtMatchNotify desk_id
         * @property {number|null} [room_id] EvtMatchNotify room_id
         * @property {number|null} [front_match_type] EvtMatchNotify front_match_type
         * @property {number|null} [end_time] EvtMatchNotify end_time
         * @property {number|null} [match_entry_type] EvtMatchNotify match_entry_type
         * @property {number|null} [match_entry_value] EvtMatchNotify match_entry_value
         */

        /**
         * Constructs a new EvtMatchNotify.
         * @memberof core
         * @classdesc Represents an EvtMatchNotify.
         * @implements IEvtMatchNotify
         * @constructor
         * @param {core.IEvtMatchNotify=} [properties] Properties to set
         */
        function EvtMatchNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtMatchNotify match_status.
         * @member {core.MatchStatus} match_status
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.match_status = 0;

        /**
         * EvtMatchNotify uuid.
         * @member {string} uuid
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.uuid = "";

        /**
         * EvtMatchNotify room_type.
         * @member {number} room_type
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.room_type = 0;

        /**
         * EvtMatchNotify match_info.
         * @member {core.IGameMatchInfo|null|undefined} match_info
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.match_info = null;

        /**
         * EvtMatchNotify game_init.
         * @member {core.ICommonGameInitInfo|null|undefined} game_init
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.game_init = null;

        /**
         * EvtMatchNotify desk_id.
         * @member {number} desk_id
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.desk_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtMatchNotify room_id.
         * @member {number} room_id
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.room_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtMatchNotify front_match_type.
         * @member {number} front_match_type
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.front_match_type = 0;

        /**
         * EvtMatchNotify end_time.
         * @member {number} end_time
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.end_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtMatchNotify match_entry_type.
         * @member {number} match_entry_type
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.match_entry_type = 0;

        /**
         * EvtMatchNotify match_entry_value.
         * @member {number} match_entry_value
         * @memberof core.EvtMatchNotify
         * @instance
         */
        EvtMatchNotify.prototype.match_entry_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new EvtMatchNotify instance using the specified properties.
         * @function create
         * @memberof core.EvtMatchNotify
         * @static
         * @param {core.IEvtMatchNotify=} [properties] Properties to set
         * @returns {core.EvtMatchNotify} EvtMatchNotify instance
         */
        EvtMatchNotify.create = function create(properties) {
            return new EvtMatchNotify(properties);
        };

        /**
         * Encodes the specified EvtMatchNotify message. Does not implicitly {@link core.EvtMatchNotify.verify|verify} messages.
         * @function encode
         * @memberof core.EvtMatchNotify
         * @static
         * @param {core.IEvtMatchNotify} message EvtMatchNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtMatchNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.match_status != null && Object.hasOwnProperty.call(message, "match_status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.match_status);
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uuid);
            if (message.room_type != null && Object.hasOwnProperty.call(message, "room_type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.room_type);
            if (message.match_info != null && Object.hasOwnProperty.call(message, "match_info"))
                $root.core.GameMatchInfo.encode(message.match_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.game_init != null && Object.hasOwnProperty.call(message, "game_init"))
                $root.core.CommonGameInitInfo.encode(message.game_init, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.desk_id != null && Object.hasOwnProperty.call(message, "desk_id"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.desk_id);
            if (message.room_id != null && Object.hasOwnProperty.call(message, "room_id"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.room_id);
            if (message.front_match_type != null && Object.hasOwnProperty.call(message, "front_match_type"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.front_match_type);
            if (message.end_time != null && Object.hasOwnProperty.call(message, "end_time"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.end_time);
            if (message.match_entry_type != null && Object.hasOwnProperty.call(message, "match_entry_type"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.match_entry_type);
            if (message.match_entry_value != null && Object.hasOwnProperty.call(message, "match_entry_value"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.match_entry_value);
            return writer;
        };

        /**
         * Encodes the specified EvtMatchNotify message, length delimited. Does not implicitly {@link core.EvtMatchNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtMatchNotify
         * @static
         * @param {core.IEvtMatchNotify} message EvtMatchNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtMatchNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtMatchNotify message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtMatchNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtMatchNotify} EvtMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtMatchNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtMatchNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.match_status = reader.int32();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.room_type = reader.int32();
                    break;
                case 4:
                    message.match_info = $root.core.GameMatchInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.game_init = $root.core.CommonGameInitInfo.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.desk_id = reader.int64();
                    break;
                case 7:
                    message.room_id = reader.int64();
                    break;
                case 8:
                    message.front_match_type = reader.int32();
                    break;
                case 9:
                    message.end_time = reader.int64();
                    break;
                case 10:
                    message.match_entry_type = reader.int32();
                    break;
                case 11:
                    message.match_entry_value = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtMatchNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtMatchNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtMatchNotify} EvtMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtMatchNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtMatchNotify message.
         * @function verify
         * @memberof core.EvtMatchNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtMatchNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.match_status != null && message.hasOwnProperty("match_status"))
                switch (message.match_status) {
                default:
                    return "match_status: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                if (!$util.isInteger(message.room_type))
                    return "room_type: integer expected";
            if (message.match_info != null && message.hasOwnProperty("match_info")) {
                var error = $root.core.GameMatchInfo.verify(message.match_info);
                if (error)
                    return "match_info." + error;
            }
            if (message.game_init != null && message.hasOwnProperty("game_init")) {
                var error = $root.core.CommonGameInitInfo.verify(message.game_init);
                if (error)
                    return "game_init." + error;
            }
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (!$util.isInteger(message.desk_id) && !(message.desk_id && $util.isInteger(message.desk_id.low) && $util.isInteger(message.desk_id.high)))
                    return "desk_id: integer|Long expected";
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (!$util.isInteger(message.room_id) && !(message.room_id && $util.isInteger(message.room_id.low) && $util.isInteger(message.room_id.high)))
                    return "room_id: integer|Long expected";
            if (message.front_match_type != null && message.hasOwnProperty("front_match_type"))
                if (!$util.isInteger(message.front_match_type))
                    return "front_match_type: integer expected";
            if (message.end_time != null && message.hasOwnProperty("end_time"))
                if (!$util.isInteger(message.end_time) && !(message.end_time && $util.isInteger(message.end_time.low) && $util.isInteger(message.end_time.high)))
                    return "end_time: integer|Long expected";
            if (message.match_entry_type != null && message.hasOwnProperty("match_entry_type"))
                if (!$util.isInteger(message.match_entry_type))
                    return "match_entry_type: integer expected";
            if (message.match_entry_value != null && message.hasOwnProperty("match_entry_value"))
                if (!$util.isInteger(message.match_entry_value) && !(message.match_entry_value && $util.isInteger(message.match_entry_value.low) && $util.isInteger(message.match_entry_value.high)))
                    return "match_entry_value: integer|Long expected";
            return null;
        };

        /**
         * Creates an EvtMatchNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtMatchNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtMatchNotify} EvtMatchNotify
         */
        EvtMatchNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtMatchNotify)
                return object;
            var message = new $root.core.EvtMatchNotify();
            switch (object.match_status) {
            case "STATUS_MATCHING":
            case 0:
                message.match_status = 0;
                break;
            case "STATUS_FINISHED":
            case 1:
                message.match_status = 1;
                break;
            }
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.room_type != null)
                message.room_type = object.room_type | 0;
            if (object.match_info != null) {
                if (typeof object.match_info !== "object")
                    throw TypeError(".core.EvtMatchNotify.match_info: object expected");
                message.match_info = $root.core.GameMatchInfo.fromObject(object.match_info);
            }
            if (object.game_init != null) {
                if (typeof object.game_init !== "object")
                    throw TypeError(".core.EvtMatchNotify.game_init: object expected");
                message.game_init = $root.core.CommonGameInitInfo.fromObject(object.game_init);
            }
            if (object.desk_id != null)
                if ($util.Long)
                    (message.desk_id = $util.Long.fromValue(object.desk_id)).unsigned = false;
                else if (typeof object.desk_id === "string")
                    message.desk_id = parseInt(object.desk_id, 10);
                else if (typeof object.desk_id === "number")
                    message.desk_id = object.desk_id;
                else if (typeof object.desk_id === "object")
                    message.desk_id = new $util.LongBits(object.desk_id.low >>> 0, object.desk_id.high >>> 0).toNumber();
            if (object.room_id != null)
                if ($util.Long)
                    (message.room_id = $util.Long.fromValue(object.room_id)).unsigned = false;
                else if (typeof object.room_id === "string")
                    message.room_id = parseInt(object.room_id, 10);
                else if (typeof object.room_id === "number")
                    message.room_id = object.room_id;
                else if (typeof object.room_id === "object")
                    message.room_id = new $util.LongBits(object.room_id.low >>> 0, object.room_id.high >>> 0).toNumber();
            if (object.front_match_type != null)
                message.front_match_type = object.front_match_type | 0;
            if (object.end_time != null)
                if ($util.Long)
                    (message.end_time = $util.Long.fromValue(object.end_time)).unsigned = false;
                else if (typeof object.end_time === "string")
                    message.end_time = parseInt(object.end_time, 10);
                else if (typeof object.end_time === "number")
                    message.end_time = object.end_time;
                else if (typeof object.end_time === "object")
                    message.end_time = new $util.LongBits(object.end_time.low >>> 0, object.end_time.high >>> 0).toNumber();
            if (object.match_entry_type != null)
                message.match_entry_type = object.match_entry_type | 0;
            if (object.match_entry_value != null)
                if ($util.Long)
                    (message.match_entry_value = $util.Long.fromValue(object.match_entry_value)).unsigned = false;
                else if (typeof object.match_entry_value === "string")
                    message.match_entry_value = parseInt(object.match_entry_value, 10);
                else if (typeof object.match_entry_value === "number")
                    message.match_entry_value = object.match_entry_value;
                else if (typeof object.match_entry_value === "object")
                    message.match_entry_value = new $util.LongBits(object.match_entry_value.low >>> 0, object.match_entry_value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an EvtMatchNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtMatchNotify
         * @static
         * @param {core.EvtMatchNotify} message EvtMatchNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtMatchNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.match_status = options.enums === String ? "STATUS_MATCHING" : 0;
                object.uuid = "";
                object.room_type = 0;
                object.match_info = null;
                object.game_init = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.desk_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.desk_id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.room_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.room_id = options.longs === String ? "0" : 0;
                object.front_match_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.end_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.end_time = options.longs === String ? "0" : 0;
                object.match_entry_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.match_entry_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.match_entry_value = options.longs === String ? "0" : 0;
            }
            if (message.match_status != null && message.hasOwnProperty("match_status"))
                object.match_status = options.enums === String ? $root.core.MatchStatus[message.match_status] : message.match_status;
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                object.room_type = message.room_type;
            if (message.match_info != null && message.hasOwnProperty("match_info"))
                object.match_info = $root.core.GameMatchInfo.toObject(message.match_info, options);
            if (message.game_init != null && message.hasOwnProperty("game_init"))
                object.game_init = $root.core.CommonGameInitInfo.toObject(message.game_init, options);
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (typeof message.desk_id === "number")
                    object.desk_id = options.longs === String ? String(message.desk_id) : message.desk_id;
                else
                    object.desk_id = options.longs === String ? $util.Long.prototype.toString.call(message.desk_id) : options.longs === Number ? new $util.LongBits(message.desk_id.low >>> 0, message.desk_id.high >>> 0).toNumber() : message.desk_id;
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (typeof message.room_id === "number")
                    object.room_id = options.longs === String ? String(message.room_id) : message.room_id;
                else
                    object.room_id = options.longs === String ? $util.Long.prototype.toString.call(message.room_id) : options.longs === Number ? new $util.LongBits(message.room_id.low >>> 0, message.room_id.high >>> 0).toNumber() : message.room_id;
            if (message.front_match_type != null && message.hasOwnProperty("front_match_type"))
                object.front_match_type = message.front_match_type;
            if (message.end_time != null && message.hasOwnProperty("end_time"))
                if (typeof message.end_time === "number")
                    object.end_time = options.longs === String ? String(message.end_time) : message.end_time;
                else
                    object.end_time = options.longs === String ? $util.Long.prototype.toString.call(message.end_time) : options.longs === Number ? new $util.LongBits(message.end_time.low >>> 0, message.end_time.high >>> 0).toNumber() : message.end_time;
            if (message.match_entry_type != null && message.hasOwnProperty("match_entry_type"))
                object.match_entry_type = message.match_entry_type;
            if (message.match_entry_value != null && message.hasOwnProperty("match_entry_value"))
                if (typeof message.match_entry_value === "number")
                    object.match_entry_value = options.longs === String ? String(message.match_entry_value) : message.match_entry_value;
                else
                    object.match_entry_value = options.longs === String ? $util.Long.prototype.toString.call(message.match_entry_value) : options.longs === Number ? new $util.LongBits(message.match_entry_value.low >>> 0, message.match_entry_value.high >>> 0).toNumber() : message.match_entry_value;
            return object;
        };

        /**
         * Converts this EvtMatchNotify to JSON.
         * @function toJSON
         * @memberof core.EvtMatchNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtMatchNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtMatchNotify;
    })();

    core.EvtGameSettle = (function() {

        /**
         * Properties of an EvtGameSettle.
         * @memberof core
         * @interface IEvtGameSettle
         */

        /**
         * Constructs a new EvtGameSettle.
         * @memberof core
         * @classdesc Represents an EvtGameSettle.
         * @implements IEvtGameSettle
         * @constructor
         * @param {core.IEvtGameSettle=} [properties] Properties to set
         */
        function EvtGameSettle(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new EvtGameSettle instance using the specified properties.
         * @function create
         * @memberof core.EvtGameSettle
         * @static
         * @param {core.IEvtGameSettle=} [properties] Properties to set
         * @returns {core.EvtGameSettle} EvtGameSettle instance
         */
        EvtGameSettle.create = function create(properties) {
            return new EvtGameSettle(properties);
        };

        /**
         * Encodes the specified EvtGameSettle message. Does not implicitly {@link core.EvtGameSettle.verify|verify} messages.
         * @function encode
         * @memberof core.EvtGameSettle
         * @static
         * @param {core.IEvtGameSettle} message EvtGameSettle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtGameSettle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified EvtGameSettle message, length delimited. Does not implicitly {@link core.EvtGameSettle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof core.EvtGameSettle
         * @static
         * @param {core.IEvtGameSettle} message EvtGameSettle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtGameSettle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtGameSettle message from the specified reader or buffer.
         * @function decode
         * @memberof core.EvtGameSettle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {core.EvtGameSettle} EvtGameSettle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtGameSettle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.core.EvtGameSettle();
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
         * Decodes an EvtGameSettle message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof core.EvtGameSettle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {core.EvtGameSettle} EvtGameSettle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtGameSettle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtGameSettle message.
         * @function verify
         * @memberof core.EvtGameSettle
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtGameSettle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an EvtGameSettle message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof core.EvtGameSettle
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {core.EvtGameSettle} EvtGameSettle
         */
        EvtGameSettle.fromObject = function fromObject(object) {
            if (object instanceof $root.core.EvtGameSettle)
                return object;
            return new $root.core.EvtGameSettle();
        };

        /**
         * Creates a plain object from an EvtGameSettle message. Also converts values to other types if specified.
         * @function toObject
         * @memberof core.EvtGameSettle
         * @static
         * @param {core.EvtGameSettle} message EvtGameSettle
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtGameSettle.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this EvtGameSettle to JSON.
         * @function toJSON
         * @memberof core.EvtGameSettle
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtGameSettle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtGameSettle;
    })();

    return core;
})();

$root.ludo = (function() {

    /**
     * Namespace ludo.
     * @exports ludo
     * @namespace
     */
    var ludo = {};

    ludo.LudoCancelMatchReq = (function() {

        /**
         * Properties of a LudoCancelMatchReq.
         * @memberof ludo
         * @interface ILudoCancelMatchReq
         */

        /**
         * Constructs a new LudoCancelMatchReq.
         * @memberof ludo
         * @classdesc Represents a LudoCancelMatchReq.
         * @implements ILudoCancelMatchReq
         * @constructor
         * @param {ludo.ILudoCancelMatchReq=} [properties] Properties to set
         */
        function LudoCancelMatchReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LudoCancelMatchReq instance using the specified properties.
         * @function create
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {ludo.ILudoCancelMatchReq=} [properties] Properties to set
         * @returns {ludo.LudoCancelMatchReq} LudoCancelMatchReq instance
         */
        LudoCancelMatchReq.create = function create(properties) {
            return new LudoCancelMatchReq(properties);
        };

        /**
         * Encodes the specified LudoCancelMatchReq message. Does not implicitly {@link ludo.LudoCancelMatchReq.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {ludo.ILudoCancelMatchReq} message LudoCancelMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoCancelMatchReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LudoCancelMatchReq message, length delimited. Does not implicitly {@link ludo.LudoCancelMatchReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {ludo.ILudoCancelMatchReq} message LudoCancelMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoCancelMatchReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoCancelMatchReq message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoCancelMatchReq} LudoCancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoCancelMatchReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoCancelMatchReq();
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
         * Decodes a LudoCancelMatchReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoCancelMatchReq} LudoCancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoCancelMatchReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoCancelMatchReq message.
         * @function verify
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoCancelMatchReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LudoCancelMatchReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoCancelMatchReq} LudoCancelMatchReq
         */
        LudoCancelMatchReq.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoCancelMatchReq)
                return object;
            return new $root.ludo.LudoCancelMatchReq();
        };

        /**
         * Creates a plain object from a LudoCancelMatchReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoCancelMatchReq
         * @static
         * @param {ludo.LudoCancelMatchReq} message LudoCancelMatchReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoCancelMatchReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LudoCancelMatchReq to JSON.
         * @function toJSON
         * @memberof ludo.LudoCancelMatchReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoCancelMatchReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LudoCancelMatchReq;
    })();

    ludo.Piece = (function() {

        /**
         * Properties of a Piece.
         * @memberof ludo
         * @interface IPiece
         * @property {number|null} [piece_id] Piece piece_id
         * @property {number|null} [score] Piece score
         * @property {number|null} [steps] Piece steps
         * @property {number|null} [x] Piece x
         * @property {number|null} [y] Piece y
         */

        /**
         * Constructs a new Piece.
         * @memberof ludo
         * @classdesc Represents a Piece.
         * @implements IPiece
         * @constructor
         * @param {ludo.IPiece=} [properties] Properties to set
         */
        function Piece(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Piece piece_id.
         * @member {number} piece_id
         * @memberof ludo.Piece
         * @instance
         */
        Piece.prototype.piece_id = 0;

        /**
         * Piece score.
         * @member {number} score
         * @memberof ludo.Piece
         * @instance
         */
        Piece.prototype.score = 0;

        /**
         * Piece steps.
         * @member {number} steps
         * @memberof ludo.Piece
         * @instance
         */
        Piece.prototype.steps = 0;

        /**
         * Piece x.
         * @member {number} x
         * @memberof ludo.Piece
         * @instance
         */
        Piece.prototype.x = 0;

        /**
         * Piece y.
         * @member {number} y
         * @memberof ludo.Piece
         * @instance
         */
        Piece.prototype.y = 0;

        /**
         * Creates a new Piece instance using the specified properties.
         * @function create
         * @memberof ludo.Piece
         * @static
         * @param {ludo.IPiece=} [properties] Properties to set
         * @returns {ludo.Piece} Piece instance
         */
        Piece.create = function create(properties) {
            return new Piece(properties);
        };

        /**
         * Encodes the specified Piece message. Does not implicitly {@link ludo.Piece.verify|verify} messages.
         * @function encode
         * @memberof ludo.Piece
         * @static
         * @param {ludo.IPiece} message Piece message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Piece.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.piece_id != null && Object.hasOwnProperty.call(message, "piece_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.piece_id);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
            if (message.steps != null && Object.hasOwnProperty.call(message, "steps"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.steps);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.y);
            return writer;
        };

        /**
         * Encodes the specified Piece message, length delimited. Does not implicitly {@link ludo.Piece.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.Piece
         * @static
         * @param {ludo.IPiece} message Piece message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Piece.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Piece message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.Piece
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.Piece} Piece
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Piece.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.Piece();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.piece_id = reader.int32();
                    break;
                case 2:
                    message.score = reader.int32();
                    break;
                case 3:
                    message.steps = reader.int32();
                    break;
                case 4:
                    message.x = reader.int32();
                    break;
                case 5:
                    message.y = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Piece message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.Piece
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.Piece} Piece
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Piece.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Piece message.
         * @function verify
         * @memberof ludo.Piece
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Piece.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.piece_id != null && message.hasOwnProperty("piece_id"))
                if (!$util.isInteger(message.piece_id))
                    return "piece_id: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.steps != null && message.hasOwnProperty("steps"))
                if (!$util.isInteger(message.steps))
                    return "steps: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };

        /**
         * Creates a Piece message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.Piece
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.Piece} Piece
         */
        Piece.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.Piece)
                return object;
            var message = new $root.ludo.Piece();
            if (object.piece_id != null)
                message.piece_id = object.piece_id | 0;
            if (object.score != null)
                message.score = object.score | 0;
            if (object.steps != null)
                message.steps = object.steps | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            return message;
        };

        /**
         * Creates a plain object from a Piece message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.Piece
         * @static
         * @param {ludo.Piece} message Piece
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Piece.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.piece_id = 0;
                object.score = 0;
                object.steps = 0;
                object.x = 0;
                object.y = 0;
            }
            if (message.piece_id != null && message.hasOwnProperty("piece_id"))
                object.piece_id = message.piece_id;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            if (message.steps != null && message.hasOwnProperty("steps"))
                object.steps = message.steps;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            return object;
        };

        /**
         * Converts this Piece to JSON.
         * @function toJSON
         * @memberof ludo.Piece
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Piece.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Piece;
    })();

    ludo.LudoPlayerInfo = (function() {

        /**
         * Properties of a LudoPlayerInfo.
         * @memberof ludo
         * @interface ILudoPlayerInfo
         * @property {number|null} [uid] LudoPlayerInfo uid
         * @property {string|null} [nick] LudoPlayerInfo nick
         * @property {string|null} [avatar] LudoPlayerInfo avatar
         * @property {string|null} [area_code] LudoPlayerInfo area_code
         * @property {number|null} [seat_id] LudoPlayerInfo seat_id
         * @property {number|null} [total_score] LudoPlayerInfo total_score
         * @property {number|null} [reroll_count] LudoPlayerInfo reroll_count
         * @property {ludo.LudoPlayerStatus|null} [status] LudoPlayerInfo status
         * @property {Array.<ludo.IPiece>|null} [pieces] LudoPlayerInfo pieces
         * @property {number|null} [point] LudoPlayerInfo point
         */

        /**
         * Constructs a new LudoPlayerInfo.
         * @memberof ludo
         * @classdesc Represents a LudoPlayerInfo.
         * @implements ILudoPlayerInfo
         * @constructor
         * @param {ludo.ILudoPlayerInfo=} [properties] Properties to set
         */
        function LudoPlayerInfo(properties) {
            this.pieces = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LudoPlayerInfo uid.
         * @member {number} uid
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.uid = 0;

        /**
         * LudoPlayerInfo nick.
         * @member {string} nick
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.nick = "";

        /**
         * LudoPlayerInfo avatar.
         * @member {string} avatar
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.avatar = "";

        /**
         * LudoPlayerInfo area_code.
         * @member {string} area_code
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.area_code = "";

        /**
         * LudoPlayerInfo seat_id.
         * @member {number} seat_id
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.seat_id = 0;

        /**
         * LudoPlayerInfo total_score.
         * @member {number} total_score
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.total_score = 0;

        /**
         * LudoPlayerInfo reroll_count.
         * @member {number} reroll_count
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.reroll_count = 0;

        /**
         * LudoPlayerInfo status.
         * @member {ludo.LudoPlayerStatus} status
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.status = 0;

        /**
         * LudoPlayerInfo pieces.
         * @member {Array.<ludo.IPiece>} pieces
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.pieces = $util.emptyArray;

        /**
         * LudoPlayerInfo point.
         * @member {number} point
         * @memberof ludo.LudoPlayerInfo
         * @instance
         */
        LudoPlayerInfo.prototype.point = 0;

        /**
         * Creates a new LudoPlayerInfo instance using the specified properties.
         * @function create
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {ludo.ILudoPlayerInfo=} [properties] Properties to set
         * @returns {ludo.LudoPlayerInfo} LudoPlayerInfo instance
         */
        LudoPlayerInfo.create = function create(properties) {
            return new LudoPlayerInfo(properties);
        };

        /**
         * Encodes the specified LudoPlayerInfo message. Does not implicitly {@link ludo.LudoPlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {ludo.ILudoPlayerInfo} message LudoPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoPlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.nick != null && Object.hasOwnProperty.call(message, "nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nick);
            if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
            if (message.area_code != null && Object.hasOwnProperty.call(message, "area_code"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.area_code);
            if (message.seat_id != null && Object.hasOwnProperty.call(message, "seat_id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.seat_id);
            if (message.total_score != null && Object.hasOwnProperty.call(message, "total_score"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.total_score);
            if (message.reroll_count != null && Object.hasOwnProperty.call(message, "reroll_count"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.reroll_count);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.status);
            if (message.pieces != null && message.pieces.length)
                for (var i = 0; i < message.pieces.length; ++i)
                    $root.ludo.Piece.encode(message.pieces[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.point);
            return writer;
        };

        /**
         * Encodes the specified LudoPlayerInfo message, length delimited. Does not implicitly {@link ludo.LudoPlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {ludo.ILudoPlayerInfo} message LudoPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoPlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoPlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoPlayerInfo} LudoPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoPlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoPlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                case 2:
                    message.nick = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.area_code = reader.string();
                    break;
                case 5:
                    message.seat_id = reader.int32();
                    break;
                case 6:
                    message.total_score = reader.int32();
                    break;
                case 7:
                    message.reroll_count = reader.int32();
                    break;
                case 8:
                    message.status = reader.int32();
                    break;
                case 9:
                    if (!(message.pieces && message.pieces.length))
                        message.pieces = [];
                    message.pieces.push($root.ludo.Piece.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.point = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LudoPlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoPlayerInfo} LudoPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoPlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoPlayerInfo message.
         * @function verify
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoPlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                if (!$util.isString(message.area_code))
                    return "area_code: string expected";
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (!$util.isInteger(message.seat_id))
                    return "seat_id: integer expected";
            if (message.total_score != null && message.hasOwnProperty("total_score"))
                if (!$util.isInteger(message.total_score))
                    return "total_score: integer expected";
            if (message.reroll_count != null && message.hasOwnProperty("reroll_count"))
                if (!$util.isInteger(message.reroll_count))
                    return "reroll_count: integer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.pieces != null && message.hasOwnProperty("pieces")) {
                if (!Array.isArray(message.pieces))
                    return "pieces: array expected";
                for (var i = 0; i < message.pieces.length; ++i) {
                    var error = $root.ludo.Piece.verify(message.pieces[i]);
                    if (error)
                        return "pieces." + error;
                }
            }
            if (message.point != null && message.hasOwnProperty("point"))
                if (!$util.isInteger(message.point))
                    return "point: integer expected";
            return null;
        };

        /**
         * Creates a LudoPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoPlayerInfo} LudoPlayerInfo
         */
        LudoPlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoPlayerInfo)
                return object;
            var message = new $root.ludo.LudoPlayerInfo();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.area_code != null)
                message.area_code = String(object.area_code);
            if (object.seat_id != null)
                message.seat_id = object.seat_id | 0;
            if (object.total_score != null)
                message.total_score = object.total_score | 0;
            if (object.reroll_count != null)
                message.reroll_count = object.reroll_count | 0;
            switch (object.status) {
            case "PLAYER_STATUS_NORMAL":
            case 0:
                message.status = 0;
                break;
            case "PLAYER_STATUS_AUTO":
            case 1:
                message.status = 1;
                break;
            case "PLAYER_STATUS_LEAVE":
            case 2:
                message.status = 2;
                break;
            }
            if (object.pieces) {
                if (!Array.isArray(object.pieces))
                    throw TypeError(".ludo.LudoPlayerInfo.pieces: array expected");
                message.pieces = [];
                for (var i = 0; i < object.pieces.length; ++i) {
                    if (typeof object.pieces[i] !== "object")
                        throw TypeError(".ludo.LudoPlayerInfo.pieces: object expected");
                    message.pieces[i] = $root.ludo.Piece.fromObject(object.pieces[i]);
                }
            }
            if (object.point != null)
                message.point = object.point | 0;
            return message;
        };

        /**
         * Creates a plain object from a LudoPlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoPlayerInfo
         * @static
         * @param {ludo.LudoPlayerInfo} message LudoPlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoPlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.pieces = [];
            if (options.defaults) {
                object.uid = 0;
                object.nick = "";
                object.avatar = "";
                object.area_code = "";
                object.seat_id = 0;
                object.total_score = 0;
                object.reroll_count = 0;
                object.status = options.enums === String ? "PLAYER_STATUS_NORMAL" : 0;
                object.point = 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                object.area_code = message.area_code;
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                object.seat_id = message.seat_id;
            if (message.total_score != null && message.hasOwnProperty("total_score"))
                object.total_score = message.total_score;
            if (message.reroll_count != null && message.hasOwnProperty("reroll_count"))
                object.reroll_count = message.reroll_count;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.ludo.LudoPlayerStatus[message.status] : message.status;
            if (message.pieces && message.pieces.length) {
                object.pieces = [];
                for (var j = 0; j < message.pieces.length; ++j)
                    object.pieces[j] = $root.ludo.Piece.toObject(message.pieces[j], options);
            }
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = message.point;
            return object;
        };

        /**
         * Converts this LudoPlayerInfo to JSON.
         * @function toJSON
         * @memberof ludo.LudoPlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoPlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LudoPlayerInfo;
    })();

    ludo.MatchRewardInfo = (function() {

        /**
         * Properties of a MatchRewardInfo.
         * @memberof ludo
         * @interface IMatchRewardInfo
         * @property {number|null} [rank_low] MatchRewardInfo rank_low
         * @property {number|null} [rank_high] MatchRewardInfo rank_high
         * @property {Array.<ludo.MatchRewardInfo.IGameReward>|null} [rewards] MatchRewardInfo rewards
         */

        /**
         * Constructs a new MatchRewardInfo.
         * @memberof ludo
         * @classdesc Represents a MatchRewardInfo.
         * @implements IMatchRewardInfo
         * @constructor
         * @param {ludo.IMatchRewardInfo=} [properties] Properties to set
         */
        function MatchRewardInfo(properties) {
            this.rewards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchRewardInfo rank_low.
         * @member {number} rank_low
         * @memberof ludo.MatchRewardInfo
         * @instance
         */
        MatchRewardInfo.prototype.rank_low = 0;

        /**
         * MatchRewardInfo rank_high.
         * @member {number} rank_high
         * @memberof ludo.MatchRewardInfo
         * @instance
         */
        MatchRewardInfo.prototype.rank_high = 0;

        /**
         * MatchRewardInfo rewards.
         * @member {Array.<ludo.MatchRewardInfo.IGameReward>} rewards
         * @memberof ludo.MatchRewardInfo
         * @instance
         */
        MatchRewardInfo.prototype.rewards = $util.emptyArray;

        /**
         * Creates a new MatchRewardInfo instance using the specified properties.
         * @function create
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {ludo.IMatchRewardInfo=} [properties] Properties to set
         * @returns {ludo.MatchRewardInfo} MatchRewardInfo instance
         */
        MatchRewardInfo.create = function create(properties) {
            return new MatchRewardInfo(properties);
        };

        /**
         * Encodes the specified MatchRewardInfo message. Does not implicitly {@link ludo.MatchRewardInfo.verify|verify} messages.
         * @function encode
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {ludo.IMatchRewardInfo} message MatchRewardInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRewardInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rank_low != null && Object.hasOwnProperty.call(message, "rank_low"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rank_low);
            if (message.rank_high != null && Object.hasOwnProperty.call(message, "rank_high"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rank_high);
            if (message.rewards != null && message.rewards.length)
                for (var i = 0; i < message.rewards.length; ++i)
                    $root.ludo.MatchRewardInfo.GameReward.encode(message.rewards[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MatchRewardInfo message, length delimited. Does not implicitly {@link ludo.MatchRewardInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {ludo.IMatchRewardInfo} message MatchRewardInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRewardInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchRewardInfo message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.MatchRewardInfo} MatchRewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRewardInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.MatchRewardInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rank_low = reader.int32();
                    break;
                case 2:
                    message.rank_high = reader.int32();
                    break;
                case 3:
                    if (!(message.rewards && message.rewards.length))
                        message.rewards = [];
                    message.rewards.push($root.ludo.MatchRewardInfo.GameReward.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchRewardInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.MatchRewardInfo} MatchRewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRewardInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchRewardInfo message.
         * @function verify
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchRewardInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rank_low != null && message.hasOwnProperty("rank_low"))
                if (!$util.isInteger(message.rank_low))
                    return "rank_low: integer expected";
            if (message.rank_high != null && message.hasOwnProperty("rank_high"))
                if (!$util.isInteger(message.rank_high))
                    return "rank_high: integer expected";
            if (message.rewards != null && message.hasOwnProperty("rewards")) {
                if (!Array.isArray(message.rewards))
                    return "rewards: array expected";
                for (var i = 0; i < message.rewards.length; ++i) {
                    var error = $root.ludo.MatchRewardInfo.GameReward.verify(message.rewards[i]);
                    if (error)
                        return "rewards." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MatchRewardInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.MatchRewardInfo} MatchRewardInfo
         */
        MatchRewardInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.MatchRewardInfo)
                return object;
            var message = new $root.ludo.MatchRewardInfo();
            if (object.rank_low != null)
                message.rank_low = object.rank_low | 0;
            if (object.rank_high != null)
                message.rank_high = object.rank_high | 0;
            if (object.rewards) {
                if (!Array.isArray(object.rewards))
                    throw TypeError(".ludo.MatchRewardInfo.rewards: array expected");
                message.rewards = [];
                for (var i = 0; i < object.rewards.length; ++i) {
                    if (typeof object.rewards[i] !== "object")
                        throw TypeError(".ludo.MatchRewardInfo.rewards: object expected");
                    message.rewards[i] = $root.ludo.MatchRewardInfo.GameReward.fromObject(object.rewards[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchRewardInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.MatchRewardInfo
         * @static
         * @param {ludo.MatchRewardInfo} message MatchRewardInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchRewardInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rewards = [];
            if (options.defaults) {
                object.rank_low = 0;
                object.rank_high = 0;
            }
            if (message.rank_low != null && message.hasOwnProperty("rank_low"))
                object.rank_low = message.rank_low;
            if (message.rank_high != null && message.hasOwnProperty("rank_high"))
                object.rank_high = message.rank_high;
            if (message.rewards && message.rewards.length) {
                object.rewards = [];
                for (var j = 0; j < message.rewards.length; ++j)
                    object.rewards[j] = $root.ludo.MatchRewardInfo.GameReward.toObject(message.rewards[j], options);
            }
            return object;
        };

        /**
         * Converts this MatchRewardInfo to JSON.
         * @function toJSON
         * @memberof ludo.MatchRewardInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchRewardInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        MatchRewardInfo.GameReward = (function() {

            /**
             * Properties of a GameReward.
             * @memberof ludo.MatchRewardInfo
             * @interface IGameReward
             * @property {core.PropType|null} [prop_type] GameReward prop_type
             * @property {number|null} [amount] GameReward amount
             */

            /**
             * Constructs a new GameReward.
             * @memberof ludo.MatchRewardInfo
             * @classdesc Represents a GameReward.
             * @implements IGameReward
             * @constructor
             * @param {ludo.MatchRewardInfo.IGameReward=} [properties] Properties to set
             */
            function GameReward(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GameReward prop_type.
             * @member {core.PropType} prop_type
             * @memberof ludo.MatchRewardInfo.GameReward
             * @instance
             */
            GameReward.prototype.prop_type = 0;

            /**
             * GameReward amount.
             * @member {number} amount
             * @memberof ludo.MatchRewardInfo.GameReward
             * @instance
             */
            GameReward.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new GameReward instance using the specified properties.
             * @function create
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {ludo.MatchRewardInfo.IGameReward=} [properties] Properties to set
             * @returns {ludo.MatchRewardInfo.GameReward} GameReward instance
             */
            GameReward.create = function create(properties) {
                return new GameReward(properties);
            };

            /**
             * Encodes the specified GameReward message. Does not implicitly {@link ludo.MatchRewardInfo.GameReward.verify|verify} messages.
             * @function encode
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {ludo.MatchRewardInfo.IGameReward} message GameReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameReward.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.prop_type != null && Object.hasOwnProperty.call(message, "prop_type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.prop_type);
                if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
                return writer;
            };

            /**
             * Encodes the specified GameReward message, length delimited. Does not implicitly {@link ludo.MatchRewardInfo.GameReward.verify|verify} messages.
             * @function encodeDelimited
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {ludo.MatchRewardInfo.IGameReward} message GameReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameReward.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GameReward message from the specified reader or buffer.
             * @function decode
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {ludo.MatchRewardInfo.GameReward} GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameReward.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.MatchRewardInfo.GameReward();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.prop_type = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GameReward message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {ludo.MatchRewardInfo.GameReward} GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameReward.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GameReward message.
             * @function verify
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GameReward.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    switch (message.prop_type) {
                    default:
                        return "prop_type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        break;
                    }
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                        return "amount: integer|Long expected";
                return null;
            };

            /**
             * Creates a GameReward message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {ludo.MatchRewardInfo.GameReward} GameReward
             */
            GameReward.fromObject = function fromObject(object) {
                if (object instanceof $root.ludo.MatchRewardInfo.GameReward)
                    return object;
                var message = new $root.ludo.MatchRewardInfo.GameReward();
                switch (object.prop_type) {
                case "PROP_TYPE_FREE":
                case 0:
                    message.prop_type = 0;
                    break;
                case "PROP_TYPE_TICKET":
                case 1:
                    message.prop_type = 1;
                    break;
                case "PROP_TYPE_CASH":
                case 2:
                    message.prop_type = 2;
                    break;
                case "PROP_TYPE_BIND_CASH":
                case 3:
                    message.prop_type = 3;
                    break;
                case "PROP_TYPE_SEASON_SCORE":
                case 5:
                    message.prop_type = 5;
                    break;
                case "PROP_TYPE_LOTTERY_LV1":
                case 6:
                    message.prop_type = 6;
                    break;
                case "PROP_TYPE_LOTTERY_LV2":
                case 7:
                    message.prop_type = 7;
                    break;
                case "PROP_TYPE_LOTTERY_LV3":
                case 8:
                    message.prop_type = 8;
                    break;
                case "PROP_TYPE_LOTTERY_LV4":
                case 9:
                    message.prop_type = 9;
                    break;
                case "PROP_TYPE_DIAMOND":
                case 10:
                    message.prop_type = 10;
                    break;
                }
                if (object.amount != null)
                    if ($util.Long)
                        (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                    else if (typeof object.amount === "string")
                        message.amount = parseInt(object.amount, 10);
                    else if (typeof object.amount === "number")
                        message.amount = object.amount;
                    else if (typeof object.amount === "object")
                        message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a GameReward message. Also converts values to other types if specified.
             * @function toObject
             * @memberof ludo.MatchRewardInfo.GameReward
             * @static
             * @param {ludo.MatchRewardInfo.GameReward} message GameReward
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GameReward.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.prop_type = options.enums === String ? "PROP_TYPE_FREE" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.amount = options.longs === String ? "0" : 0;
                }
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    object.prop_type = options.enums === String ? $root.core.PropType[message.prop_type] : message.prop_type;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (typeof message.amount === "number")
                        object.amount = options.longs === String ? String(message.amount) : message.amount;
                    else
                        object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
                return object;
            };

            /**
             * Converts this GameReward to JSON.
             * @function toJSON
             * @memberof ludo.MatchRewardInfo.GameReward
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GameReward.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GameReward;
        })();

        return MatchRewardInfo;
    })();

    ludo.LudoGameInfo = (function() {

        /**
         * Properties of a LudoGameInfo.
         * @memberof ludo
         * @interface ILudoGameInfo
         * @property {Array.<ludo.ILudoPlayerInfo>|null} [list] LudoGameInfo list
         * @property {number|null} [game_over_time] LudoGameInfo game_over_time
         * @property {Array.<ludo.IMatchRewardInfo>|null} [match_reward] LudoGameInfo match_reward
         * @property {number|null} [reroll_time] LudoGameInfo reroll_time
         */

        /**
         * Constructs a new LudoGameInfo.
         * @memberof ludo
         * @classdesc Represents a LudoGameInfo.
         * @implements ILudoGameInfo
         * @constructor
         * @param {ludo.ILudoGameInfo=} [properties] Properties to set
         */
        function LudoGameInfo(properties) {
            this.list = [];
            this.match_reward = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LudoGameInfo list.
         * @member {Array.<ludo.ILudoPlayerInfo>} list
         * @memberof ludo.LudoGameInfo
         * @instance
         */
        LudoGameInfo.prototype.list = $util.emptyArray;

        /**
         * LudoGameInfo game_over_time.
         * @member {number} game_over_time
         * @memberof ludo.LudoGameInfo
         * @instance
         */
        LudoGameInfo.prototype.game_over_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LudoGameInfo match_reward.
         * @member {Array.<ludo.IMatchRewardInfo>} match_reward
         * @memberof ludo.LudoGameInfo
         * @instance
         */
        LudoGameInfo.prototype.match_reward = $util.emptyArray;

        /**
         * LudoGameInfo reroll_time.
         * @member {number} reroll_time
         * @memberof ludo.LudoGameInfo
         * @instance
         */
        LudoGameInfo.prototype.reroll_time = 0;

        /**
         * Creates a new LudoGameInfo instance using the specified properties.
         * @function create
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {ludo.ILudoGameInfo=} [properties] Properties to set
         * @returns {ludo.LudoGameInfo} LudoGameInfo instance
         */
        LudoGameInfo.create = function create(properties) {
            return new LudoGameInfo(properties);
        };

        /**
         * Encodes the specified LudoGameInfo message. Does not implicitly {@link ludo.LudoGameInfo.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {ludo.ILudoGameInfo} message LudoGameInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoGameInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.ludo.LudoPlayerInfo.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.game_over_time != null && Object.hasOwnProperty.call(message, "game_over_time"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.game_over_time);
            if (message.match_reward != null && message.match_reward.length)
                for (var i = 0; i < message.match_reward.length; ++i)
                    $root.ludo.MatchRewardInfo.encode(message.match_reward[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.reroll_time != null && Object.hasOwnProperty.call(message, "reroll_time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.reroll_time);
            return writer;
        };

        /**
         * Encodes the specified LudoGameInfo message, length delimited. Does not implicitly {@link ludo.LudoGameInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {ludo.ILudoGameInfo} message LudoGameInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoGameInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoGameInfo message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoGameInfo} LudoGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoGameInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoGameInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.ludo.LudoPlayerInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.game_over_time = reader.int64();
                    break;
                case 3:
                    if (!(message.match_reward && message.match_reward.length))
                        message.match_reward = [];
                    message.match_reward.push($root.ludo.MatchRewardInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.reroll_time = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LudoGameInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoGameInfo} LudoGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoGameInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoGameInfo message.
         * @function verify
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoGameInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.ludo.LudoPlayerInfo.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            if (message.game_over_time != null && message.hasOwnProperty("game_over_time"))
                if (!$util.isInteger(message.game_over_time) && !(message.game_over_time && $util.isInteger(message.game_over_time.low) && $util.isInteger(message.game_over_time.high)))
                    return "game_over_time: integer|Long expected";
            if (message.match_reward != null && message.hasOwnProperty("match_reward")) {
                if (!Array.isArray(message.match_reward))
                    return "match_reward: array expected";
                for (var i = 0; i < message.match_reward.length; ++i) {
                    var error = $root.ludo.MatchRewardInfo.verify(message.match_reward[i]);
                    if (error)
                        return "match_reward." + error;
                }
            }
            if (message.reroll_time != null && message.hasOwnProperty("reroll_time"))
                if (!$util.isInteger(message.reroll_time))
                    return "reroll_time: integer expected";
            return null;
        };

        /**
         * Creates a LudoGameInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoGameInfo} LudoGameInfo
         */
        LudoGameInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoGameInfo)
                return object;
            var message = new $root.ludo.LudoGameInfo();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".ludo.LudoGameInfo.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".ludo.LudoGameInfo.list: object expected");
                    message.list[i] = $root.ludo.LudoPlayerInfo.fromObject(object.list[i]);
                }
            }
            if (object.game_over_time != null)
                if ($util.Long)
                    (message.game_over_time = $util.Long.fromValue(object.game_over_time)).unsigned = false;
                else if (typeof object.game_over_time === "string")
                    message.game_over_time = parseInt(object.game_over_time, 10);
                else if (typeof object.game_over_time === "number")
                    message.game_over_time = object.game_over_time;
                else if (typeof object.game_over_time === "object")
                    message.game_over_time = new $util.LongBits(object.game_over_time.low >>> 0, object.game_over_time.high >>> 0).toNumber();
            if (object.match_reward) {
                if (!Array.isArray(object.match_reward))
                    throw TypeError(".ludo.LudoGameInfo.match_reward: array expected");
                message.match_reward = [];
                for (var i = 0; i < object.match_reward.length; ++i) {
                    if (typeof object.match_reward[i] !== "object")
                        throw TypeError(".ludo.LudoGameInfo.match_reward: object expected");
                    message.match_reward[i] = $root.ludo.MatchRewardInfo.fromObject(object.match_reward[i]);
                }
            }
            if (object.reroll_time != null)
                message.reroll_time = object.reroll_time | 0;
            return message;
        };

        /**
         * Creates a plain object from a LudoGameInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoGameInfo
         * @static
         * @param {ludo.LudoGameInfo} message LudoGameInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoGameInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.list = [];
                object.match_reward = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.game_over_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.game_over_time = options.longs === String ? "0" : 0;
                object.reroll_time = 0;
            }
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.ludo.LudoPlayerInfo.toObject(message.list[j], options);
            }
            if (message.game_over_time != null && message.hasOwnProperty("game_over_time"))
                if (typeof message.game_over_time === "number")
                    object.game_over_time = options.longs === String ? String(message.game_over_time) : message.game_over_time;
                else
                    object.game_over_time = options.longs === String ? $util.Long.prototype.toString.call(message.game_over_time) : options.longs === Number ? new $util.LongBits(message.game_over_time.low >>> 0, message.game_over_time.high >>> 0).toNumber() : message.game_over_time;
            if (message.match_reward && message.match_reward.length) {
                object.match_reward = [];
                for (var j = 0; j < message.match_reward.length; ++j)
                    object.match_reward[j] = $root.ludo.MatchRewardInfo.toObject(message.match_reward[j], options);
            }
            if (message.reroll_time != null && message.hasOwnProperty("reroll_time"))
                object.reroll_time = message.reroll_time;
            return object;
        };

        /**
         * Converts this LudoGameInfo to JSON.
         * @function toJSON
         * @memberof ludo.LudoGameInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoGameInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LudoGameInfo;
    })();

    ludo.EvtLudoMatchNotify = (function() {

        /**
         * Properties of an EvtLudoMatchNotify.
         * @memberof ludo
         * @interface IEvtLudoMatchNotify
         * @property {core.MatchStatus|null} [match_status] EvtLudoMatchNotify match_status
         * @property {string|null} [uuid] EvtLudoMatchNotify uuid
         * @property {number|null} [room_type] EvtLudoMatchNotify room_type
         * @property {ludo.ILudoGameInfo|null} [match_info] EvtLudoMatchNotify match_info
         * @property {number|null} [desk_id] EvtLudoMatchNotify desk_id
         * @property {number|null} [room_id] EvtLudoMatchNotify room_id
         */

        /**
         * Constructs a new EvtLudoMatchNotify.
         * @memberof ludo
         * @classdesc Represents an EvtLudoMatchNotify.
         * @implements IEvtLudoMatchNotify
         * @constructor
         * @param {ludo.IEvtLudoMatchNotify=} [properties] Properties to set
         */
        function EvtLudoMatchNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtLudoMatchNotify match_status.
         * @member {core.MatchStatus} match_status
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         */
        EvtLudoMatchNotify.prototype.match_status = 0;

        /**
         * EvtLudoMatchNotify uuid.
         * @member {string} uuid
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         */
        EvtLudoMatchNotify.prototype.uuid = "";

        /**
         * EvtLudoMatchNotify room_type.
         * @member {number} room_type
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         */
        EvtLudoMatchNotify.prototype.room_type = 0;

        /**
         * EvtLudoMatchNotify match_info.
         * @member {ludo.ILudoGameInfo|null|undefined} match_info
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         */
        EvtLudoMatchNotify.prototype.match_info = null;

        /**
         * EvtLudoMatchNotify desk_id.
         * @member {number} desk_id
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         */
        EvtLudoMatchNotify.prototype.desk_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtLudoMatchNotify room_id.
         * @member {number} room_id
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         */
        EvtLudoMatchNotify.prototype.room_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new EvtLudoMatchNotify instance using the specified properties.
         * @function create
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {ludo.IEvtLudoMatchNotify=} [properties] Properties to set
         * @returns {ludo.EvtLudoMatchNotify} EvtLudoMatchNotify instance
         */
        EvtLudoMatchNotify.create = function create(properties) {
            return new EvtLudoMatchNotify(properties);
        };

        /**
         * Encodes the specified EvtLudoMatchNotify message. Does not implicitly {@link ludo.EvtLudoMatchNotify.verify|verify} messages.
         * @function encode
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {ludo.IEvtLudoMatchNotify} message EvtLudoMatchNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtLudoMatchNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.match_status != null && Object.hasOwnProperty.call(message, "match_status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.match_status);
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uuid);
            if (message.room_type != null && Object.hasOwnProperty.call(message, "room_type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.room_type);
            if (message.match_info != null && Object.hasOwnProperty.call(message, "match_info"))
                $root.ludo.LudoGameInfo.encode(message.match_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.desk_id != null && Object.hasOwnProperty.call(message, "desk_id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.desk_id);
            if (message.room_id != null && Object.hasOwnProperty.call(message, "room_id"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.room_id);
            return writer;
        };

        /**
         * Encodes the specified EvtLudoMatchNotify message, length delimited. Does not implicitly {@link ludo.EvtLudoMatchNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {ludo.IEvtLudoMatchNotify} message EvtLudoMatchNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtLudoMatchNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtLudoMatchNotify message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.EvtLudoMatchNotify} EvtLudoMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtLudoMatchNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.EvtLudoMatchNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.match_status = reader.int32();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.room_type = reader.int32();
                    break;
                case 4:
                    message.match_info = $root.ludo.LudoGameInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.desk_id = reader.int64();
                    break;
                case 6:
                    message.room_id = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtLudoMatchNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.EvtLudoMatchNotify} EvtLudoMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtLudoMatchNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtLudoMatchNotify message.
         * @function verify
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtLudoMatchNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.match_status != null && message.hasOwnProperty("match_status"))
                switch (message.match_status) {
                default:
                    return "match_status: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                if (!$util.isInteger(message.room_type))
                    return "room_type: integer expected";
            if (message.match_info != null && message.hasOwnProperty("match_info")) {
                var error = $root.ludo.LudoGameInfo.verify(message.match_info);
                if (error)
                    return "match_info." + error;
            }
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (!$util.isInteger(message.desk_id) && !(message.desk_id && $util.isInteger(message.desk_id.low) && $util.isInteger(message.desk_id.high)))
                    return "desk_id: integer|Long expected";
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (!$util.isInteger(message.room_id) && !(message.room_id && $util.isInteger(message.room_id.low) && $util.isInteger(message.room_id.high)))
                    return "room_id: integer|Long expected";
            return null;
        };

        /**
         * Creates an EvtLudoMatchNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.EvtLudoMatchNotify} EvtLudoMatchNotify
         */
        EvtLudoMatchNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.EvtLudoMatchNotify)
                return object;
            var message = new $root.ludo.EvtLudoMatchNotify();
            switch (object.match_status) {
            case "STATUS_MATCHING":
            case 0:
                message.match_status = 0;
                break;
            case "STATUS_FINISHED":
            case 1:
                message.match_status = 1;
                break;
            }
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.room_type != null)
                message.room_type = object.room_type | 0;
            if (object.match_info != null) {
                if (typeof object.match_info !== "object")
                    throw TypeError(".ludo.EvtLudoMatchNotify.match_info: object expected");
                message.match_info = $root.ludo.LudoGameInfo.fromObject(object.match_info);
            }
            if (object.desk_id != null)
                if ($util.Long)
                    (message.desk_id = $util.Long.fromValue(object.desk_id)).unsigned = false;
                else if (typeof object.desk_id === "string")
                    message.desk_id = parseInt(object.desk_id, 10);
                else if (typeof object.desk_id === "number")
                    message.desk_id = object.desk_id;
                else if (typeof object.desk_id === "object")
                    message.desk_id = new $util.LongBits(object.desk_id.low >>> 0, object.desk_id.high >>> 0).toNumber();
            if (object.room_id != null)
                if ($util.Long)
                    (message.room_id = $util.Long.fromValue(object.room_id)).unsigned = false;
                else if (typeof object.room_id === "string")
                    message.room_id = parseInt(object.room_id, 10);
                else if (typeof object.room_id === "number")
                    message.room_id = object.room_id;
                else if (typeof object.room_id === "object")
                    message.room_id = new $util.LongBits(object.room_id.low >>> 0, object.room_id.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an EvtLudoMatchNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.EvtLudoMatchNotify
         * @static
         * @param {ludo.EvtLudoMatchNotify} message EvtLudoMatchNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtLudoMatchNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.match_status = options.enums === String ? "STATUS_MATCHING" : 0;
                object.uuid = "";
                object.room_type = 0;
                object.match_info = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.desk_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.desk_id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.room_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.room_id = options.longs === String ? "0" : 0;
            }
            if (message.match_status != null && message.hasOwnProperty("match_status"))
                object.match_status = options.enums === String ? $root.core.MatchStatus[message.match_status] : message.match_status;
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                object.room_type = message.room_type;
            if (message.match_info != null && message.hasOwnProperty("match_info"))
                object.match_info = $root.ludo.LudoGameInfo.toObject(message.match_info, options);
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (typeof message.desk_id === "number")
                    object.desk_id = options.longs === String ? String(message.desk_id) : message.desk_id;
                else
                    object.desk_id = options.longs === String ? $util.Long.prototype.toString.call(message.desk_id) : options.longs === Number ? new $util.LongBits(message.desk_id.low >>> 0, message.desk_id.high >>> 0).toNumber() : message.desk_id;
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (typeof message.room_id === "number")
                    object.room_id = options.longs === String ? String(message.room_id) : message.room_id;
                else
                    object.room_id = options.longs === String ? $util.Long.prototype.toString.call(message.room_id) : options.longs === Number ? new $util.LongBits(message.room_id.low >>> 0, message.room_id.high >>> 0).toNumber() : message.room_id;
            return object;
        };

        /**
         * Converts this EvtLudoMatchNotify to JSON.
         * @function toJSON
         * @memberof ludo.EvtLudoMatchNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtLudoMatchNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtLudoMatchNotify;
    })();

    /**
     * LudoOperate enum.
     * @name ludo.LudoOperate
     * @enum {number}
     * @property {number} OPERATE_DICE=0 OPERATE_DICE value
     * @property {number} OPERATE_CHESS=1 OPERATE_CHESS value
     */
    ludo.LudoOperate = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OPERATE_DICE"] = 0;
        values[valuesById[1] = "OPERATE_CHESS"] = 1;
        return values;
    })();

    /**
     * ScoreType enum.
     * @name ludo.ScoreType
     * @enum {number}
     * @property {number} SCORE_TYPE_NORMAL=0 SCORE_TYPE_NORMAL value
     * @property {number} SCORE_TYPE_ATTACK=1 SCORE_TYPE_ATTACK value
     * @property {number} SCORE_TYPE_FINISHED=2 SCORE_TYPE_FINISHED value
     * @property {number} SCORE_TYPE_ATTACK_REWARD=3 SCORE_TYPE_ATTACK_REWARD value
     */
    ludo.ScoreType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SCORE_TYPE_NORMAL"] = 0;
        values[valuesById[1] = "SCORE_TYPE_ATTACK"] = 1;
        values[valuesById[2] = "SCORE_TYPE_FINISHED"] = 2;
        values[valuesById[3] = "SCORE_TYPE_ATTACK_REWARD"] = 3;
        return values;
    })();

    ludo.EvtUserOperateNotify = (function() {

        /**
         * Properties of an EvtUserOperateNotify.
         * @memberof ludo
         * @interface IEvtUserOperateNotify
         * @property {number|null} [seat_id] EvtUserOperateNotify seat_id
         * @property {ludo.LudoOperate|null} [operate] EvtUserOperateNotify operate
         * @property {number|null} [op_time] EvtUserOperateNotify op_time
         * @property {ludo.ILudoPlayerInfo|null} [player_info] EvtUserOperateNotify player_info
         */

        /**
         * Constructs a new EvtUserOperateNotify.
         * @memberof ludo
         * @classdesc Represents an EvtUserOperateNotify.
         * @implements IEvtUserOperateNotify
         * @constructor
         * @param {ludo.IEvtUserOperateNotify=} [properties] Properties to set
         */
        function EvtUserOperateNotify(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtUserOperateNotify seat_id.
         * @member {number} seat_id
         * @memberof ludo.EvtUserOperateNotify
         * @instance
         */
        EvtUserOperateNotify.prototype.seat_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EvtUserOperateNotify operate.
         * @member {ludo.LudoOperate} operate
         * @memberof ludo.EvtUserOperateNotify
         * @instance
         */
        EvtUserOperateNotify.prototype.operate = 0;

        /**
         * EvtUserOperateNotify op_time.
         * @member {number} op_time
         * @memberof ludo.EvtUserOperateNotify
         * @instance
         */
        EvtUserOperateNotify.prototype.op_time = 0;

        /**
         * EvtUserOperateNotify player_info.
         * @member {ludo.ILudoPlayerInfo|null|undefined} player_info
         * @memberof ludo.EvtUserOperateNotify
         * @instance
         */
        EvtUserOperateNotify.prototype.player_info = null;

        /**
         * Creates a new EvtUserOperateNotify instance using the specified properties.
         * @function create
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {ludo.IEvtUserOperateNotify=} [properties] Properties to set
         * @returns {ludo.EvtUserOperateNotify} EvtUserOperateNotify instance
         */
        EvtUserOperateNotify.create = function create(properties) {
            return new EvtUserOperateNotify(properties);
        };

        /**
         * Encodes the specified EvtUserOperateNotify message. Does not implicitly {@link ludo.EvtUserOperateNotify.verify|verify} messages.
         * @function encode
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {ludo.IEvtUserOperateNotify} message EvtUserOperateNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserOperateNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat_id != null && Object.hasOwnProperty.call(message, "seat_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seat_id);
            if (message.operate != null && Object.hasOwnProperty.call(message, "operate"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.operate);
            if (message.op_time != null && Object.hasOwnProperty.call(message, "op_time"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.op_time);
            if (message.player_info != null && Object.hasOwnProperty.call(message, "player_info"))
                $root.ludo.LudoPlayerInfo.encode(message.player_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EvtUserOperateNotify message, length delimited. Does not implicitly {@link ludo.EvtUserOperateNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {ludo.IEvtUserOperateNotify} message EvtUserOperateNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserOperateNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtUserOperateNotify message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.EvtUserOperateNotify} EvtUserOperateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserOperateNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.EvtUserOperateNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat_id = reader.int64();
                    break;
                case 2:
                    message.operate = reader.int32();
                    break;
                case 3:
                    message.op_time = reader.int32();
                    break;
                case 4:
                    message.player_info = $root.ludo.LudoPlayerInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtUserOperateNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.EvtUserOperateNotify} EvtUserOperateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserOperateNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtUserOperateNotify message.
         * @function verify
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtUserOperateNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (!$util.isInteger(message.seat_id) && !(message.seat_id && $util.isInteger(message.seat_id.low) && $util.isInteger(message.seat_id.high)))
                    return "seat_id: integer|Long expected";
            if (message.operate != null && message.hasOwnProperty("operate"))
                switch (message.operate) {
                default:
                    return "operate: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.op_time != null && message.hasOwnProperty("op_time"))
                if (!$util.isInteger(message.op_time))
                    return "op_time: integer expected";
            if (message.player_info != null && message.hasOwnProperty("player_info")) {
                var error = $root.ludo.LudoPlayerInfo.verify(message.player_info);
                if (error)
                    return "player_info." + error;
            }
            return null;
        };

        /**
         * Creates an EvtUserOperateNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.EvtUserOperateNotify} EvtUserOperateNotify
         */
        EvtUserOperateNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.EvtUserOperateNotify)
                return object;
            var message = new $root.ludo.EvtUserOperateNotify();
            if (object.seat_id != null)
                if ($util.Long)
                    (message.seat_id = $util.Long.fromValue(object.seat_id)).unsigned = false;
                else if (typeof object.seat_id === "string")
                    message.seat_id = parseInt(object.seat_id, 10);
                else if (typeof object.seat_id === "number")
                    message.seat_id = object.seat_id;
                else if (typeof object.seat_id === "object")
                    message.seat_id = new $util.LongBits(object.seat_id.low >>> 0, object.seat_id.high >>> 0).toNumber();
            switch (object.operate) {
            case "OPERATE_DICE":
            case 0:
                message.operate = 0;
                break;
            case "OPERATE_CHESS":
            case 1:
                message.operate = 1;
                break;
            }
            if (object.op_time != null)
                message.op_time = object.op_time | 0;
            if (object.player_info != null) {
                if (typeof object.player_info !== "object")
                    throw TypeError(".ludo.EvtUserOperateNotify.player_info: object expected");
                message.player_info = $root.ludo.LudoPlayerInfo.fromObject(object.player_info);
            }
            return message;
        };

        /**
         * Creates a plain object from an EvtUserOperateNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.EvtUserOperateNotify
         * @static
         * @param {ludo.EvtUserOperateNotify} message EvtUserOperateNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtUserOperateNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.seat_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.seat_id = options.longs === String ? "0" : 0;
                object.operate = options.enums === String ? "OPERATE_DICE" : 0;
                object.op_time = 0;
                object.player_info = null;
            }
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (typeof message.seat_id === "number")
                    object.seat_id = options.longs === String ? String(message.seat_id) : message.seat_id;
                else
                    object.seat_id = options.longs === String ? $util.Long.prototype.toString.call(message.seat_id) : options.longs === Number ? new $util.LongBits(message.seat_id.low >>> 0, message.seat_id.high >>> 0).toNumber() : message.seat_id;
            if (message.operate != null && message.hasOwnProperty("operate"))
                object.operate = options.enums === String ? $root.ludo.LudoOperate[message.operate] : message.operate;
            if (message.op_time != null && message.hasOwnProperty("op_time"))
                object.op_time = message.op_time;
            if (message.player_info != null && message.hasOwnProperty("player_info"))
                object.player_info = $root.ludo.LudoPlayerInfo.toObject(message.player_info, options);
            return object;
        };

        /**
         * Converts this EvtUserOperateNotify to JSON.
         * @function toJSON
         * @memberof ludo.EvtUserOperateNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtUserOperateNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtUserOperateNotify;
    })();

    ludo.UserDiceReq = (function() {

        /**
         * Properties of a UserDiceReq.
         * @memberof ludo
         * @interface IUserDiceReq
         * @property {boolean|null} [reroll] UserDiceReq reroll
         * @property {number|null} [point] UserDiceReq point
         */

        /**
         * Constructs a new UserDiceReq.
         * @memberof ludo
         * @classdesc Represents a UserDiceReq.
         * @implements IUserDiceReq
         * @constructor
         * @param {ludo.IUserDiceReq=} [properties] Properties to set
         */
        function UserDiceReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserDiceReq reroll.
         * @member {boolean} reroll
         * @memberof ludo.UserDiceReq
         * @instance
         */
        UserDiceReq.prototype.reroll = false;

        /**
         * UserDiceReq point.
         * @member {number} point
         * @memberof ludo.UserDiceReq
         * @instance
         */
        UserDiceReq.prototype.point = 0;

        /**
         * Creates a new UserDiceReq instance using the specified properties.
         * @function create
         * @memberof ludo.UserDiceReq
         * @static
         * @param {ludo.IUserDiceReq=} [properties] Properties to set
         * @returns {ludo.UserDiceReq} UserDiceReq instance
         */
        UserDiceReq.create = function create(properties) {
            return new UserDiceReq(properties);
        };

        /**
         * Encodes the specified UserDiceReq message. Does not implicitly {@link ludo.UserDiceReq.verify|verify} messages.
         * @function encode
         * @memberof ludo.UserDiceReq
         * @static
         * @param {ludo.IUserDiceReq} message UserDiceReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDiceReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reroll != null && Object.hasOwnProperty.call(message, "reroll"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.reroll);
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.point);
            return writer;
        };

        /**
         * Encodes the specified UserDiceReq message, length delimited. Does not implicitly {@link ludo.UserDiceReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.UserDiceReq
         * @static
         * @param {ludo.IUserDiceReq} message UserDiceReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDiceReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserDiceReq message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.UserDiceReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.UserDiceReq} UserDiceReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDiceReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.UserDiceReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reroll = reader.bool();
                    break;
                case 2:
                    message.point = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserDiceReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.UserDiceReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.UserDiceReq} UserDiceReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDiceReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserDiceReq message.
         * @function verify
         * @memberof ludo.UserDiceReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserDiceReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reroll != null && message.hasOwnProperty("reroll"))
                if (typeof message.reroll !== "boolean")
                    return "reroll: boolean expected";
            if (message.point != null && message.hasOwnProperty("point"))
                if (!$util.isInteger(message.point))
                    return "point: integer expected";
            return null;
        };

        /**
         * Creates a UserDiceReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.UserDiceReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.UserDiceReq} UserDiceReq
         */
        UserDiceReq.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.UserDiceReq)
                return object;
            var message = new $root.ludo.UserDiceReq();
            if (object.reroll != null)
                message.reroll = Boolean(object.reroll);
            if (object.point != null)
                message.point = object.point | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserDiceReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.UserDiceReq
         * @static
         * @param {ludo.UserDiceReq} message UserDiceReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserDiceReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reroll = false;
                object.point = 0;
            }
            if (message.reroll != null && message.hasOwnProperty("reroll"))
                object.reroll = message.reroll;
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = message.point;
            return object;
        };

        /**
         * Converts this UserDiceReq to JSON.
         * @function toJSON
         * @memberof ludo.UserDiceReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserDiceReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserDiceReq;
    })();

    ludo.UserDiceRsp = (function() {

        /**
         * Properties of a UserDiceRsp.
         * @memberof ludo
         * @interface IUserDiceRsp
         * @property {number|null} [point] UserDiceRsp point
         * @property {number|null} [reroll_count] UserDiceRsp reroll_count
         * @property {boolean|null} [can_reroll] UserDiceRsp can_reroll
         */

        /**
         * Constructs a new UserDiceRsp.
         * @memberof ludo
         * @classdesc Represents a UserDiceRsp.
         * @implements IUserDiceRsp
         * @constructor
         * @param {ludo.IUserDiceRsp=} [properties] Properties to set
         */
        function UserDiceRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserDiceRsp point.
         * @member {number} point
         * @memberof ludo.UserDiceRsp
         * @instance
         */
        UserDiceRsp.prototype.point = 0;

        /**
         * UserDiceRsp reroll_count.
         * @member {number} reroll_count
         * @memberof ludo.UserDiceRsp
         * @instance
         */
        UserDiceRsp.prototype.reroll_count = 0;

        /**
         * UserDiceRsp can_reroll.
         * @member {boolean} can_reroll
         * @memberof ludo.UserDiceRsp
         * @instance
         */
        UserDiceRsp.prototype.can_reroll = false;

        /**
         * Creates a new UserDiceRsp instance using the specified properties.
         * @function create
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {ludo.IUserDiceRsp=} [properties] Properties to set
         * @returns {ludo.UserDiceRsp} UserDiceRsp instance
         */
        UserDiceRsp.create = function create(properties) {
            return new UserDiceRsp(properties);
        };

        /**
         * Encodes the specified UserDiceRsp message. Does not implicitly {@link ludo.UserDiceRsp.verify|verify} messages.
         * @function encode
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {ludo.IUserDiceRsp} message UserDiceRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDiceRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.point);
            if (message.reroll_count != null && Object.hasOwnProperty.call(message, "reroll_count"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reroll_count);
            if (message.can_reroll != null && Object.hasOwnProperty.call(message, "can_reroll"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.can_reroll);
            return writer;
        };

        /**
         * Encodes the specified UserDiceRsp message, length delimited. Does not implicitly {@link ludo.UserDiceRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {ludo.IUserDiceRsp} message UserDiceRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDiceRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserDiceRsp message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.UserDiceRsp} UserDiceRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDiceRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.UserDiceRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.point = reader.int32();
                    break;
                case 2:
                    message.reroll_count = reader.int32();
                    break;
                case 3:
                    message.can_reroll = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserDiceRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.UserDiceRsp} UserDiceRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDiceRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserDiceRsp message.
         * @function verify
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserDiceRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.point != null && message.hasOwnProperty("point"))
                if (!$util.isInteger(message.point))
                    return "point: integer expected";
            if (message.reroll_count != null && message.hasOwnProperty("reroll_count"))
                if (!$util.isInteger(message.reroll_count))
                    return "reroll_count: integer expected";
            if (message.can_reroll != null && message.hasOwnProperty("can_reroll"))
                if (typeof message.can_reroll !== "boolean")
                    return "can_reroll: boolean expected";
            return null;
        };

        /**
         * Creates a UserDiceRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.UserDiceRsp} UserDiceRsp
         */
        UserDiceRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.UserDiceRsp)
                return object;
            var message = new $root.ludo.UserDiceRsp();
            if (object.point != null)
                message.point = object.point | 0;
            if (object.reroll_count != null)
                message.reroll_count = object.reroll_count | 0;
            if (object.can_reroll != null)
                message.can_reroll = Boolean(object.can_reroll);
            return message;
        };

        /**
         * Creates a plain object from a UserDiceRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.UserDiceRsp
         * @static
         * @param {ludo.UserDiceRsp} message UserDiceRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserDiceRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.point = 0;
                object.reroll_count = 0;
                object.can_reroll = false;
            }
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = message.point;
            if (message.reroll_count != null && message.hasOwnProperty("reroll_count"))
                object.reroll_count = message.reroll_count;
            if (message.can_reroll != null && message.hasOwnProperty("can_reroll"))
                object.can_reroll = message.can_reroll;
            return object;
        };

        /**
         * Converts this UserDiceRsp to JSON.
         * @function toJSON
         * @memberof ludo.UserDiceRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserDiceRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserDiceRsp;
    })();

    ludo.EvtUserDice = (function() {

        /**
         * Properties of an EvtUserDice.
         * @memberof ludo
         * @interface IEvtUserDice
         * @property {number|null} [seat_id] EvtUserDice seat_id
         * @property {number|null} [point] EvtUserDice point
         */

        /**
         * Constructs a new EvtUserDice.
         * @memberof ludo
         * @classdesc Represents an EvtUserDice.
         * @implements IEvtUserDice
         * @constructor
         * @param {ludo.IEvtUserDice=} [properties] Properties to set
         */
        function EvtUserDice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtUserDice seat_id.
         * @member {number} seat_id
         * @memberof ludo.EvtUserDice
         * @instance
         */
        EvtUserDice.prototype.seat_id = 0;

        /**
         * EvtUserDice point.
         * @member {number} point
         * @memberof ludo.EvtUserDice
         * @instance
         */
        EvtUserDice.prototype.point = 0;

        /**
         * Creates a new EvtUserDice instance using the specified properties.
         * @function create
         * @memberof ludo.EvtUserDice
         * @static
         * @param {ludo.IEvtUserDice=} [properties] Properties to set
         * @returns {ludo.EvtUserDice} EvtUserDice instance
         */
        EvtUserDice.create = function create(properties) {
            return new EvtUserDice(properties);
        };

        /**
         * Encodes the specified EvtUserDice message. Does not implicitly {@link ludo.EvtUserDice.verify|verify} messages.
         * @function encode
         * @memberof ludo.EvtUserDice
         * @static
         * @param {ludo.IEvtUserDice} message EvtUserDice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserDice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat_id != null && Object.hasOwnProperty.call(message, "seat_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat_id);
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.point);
            return writer;
        };

        /**
         * Encodes the specified EvtUserDice message, length delimited. Does not implicitly {@link ludo.EvtUserDice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.EvtUserDice
         * @static
         * @param {ludo.IEvtUserDice} message EvtUserDice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserDice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtUserDice message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.EvtUserDice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.EvtUserDice} EvtUserDice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserDice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.EvtUserDice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat_id = reader.int32();
                    break;
                case 2:
                    message.point = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtUserDice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.EvtUserDice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.EvtUserDice} EvtUserDice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserDice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtUserDice message.
         * @function verify
         * @memberof ludo.EvtUserDice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtUserDice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (!$util.isInteger(message.seat_id))
                    return "seat_id: integer expected";
            if (message.point != null && message.hasOwnProperty("point"))
                if (!$util.isInteger(message.point))
                    return "point: integer expected";
            return null;
        };

        /**
         * Creates an EvtUserDice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.EvtUserDice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.EvtUserDice} EvtUserDice
         */
        EvtUserDice.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.EvtUserDice)
                return object;
            var message = new $root.ludo.EvtUserDice();
            if (object.seat_id != null)
                message.seat_id = object.seat_id | 0;
            if (object.point != null)
                message.point = object.point | 0;
            return message;
        };

        /**
         * Creates a plain object from an EvtUserDice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.EvtUserDice
         * @static
         * @param {ludo.EvtUserDice} message EvtUserDice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtUserDice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.seat_id = 0;
                object.point = 0;
            }
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                object.seat_id = message.seat_id;
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = message.point;
            return object;
        };

        /**
         * Converts this EvtUserDice to JSON.
         * @function toJSON
         * @memberof ludo.EvtUserDice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtUserDice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtUserDice;
    })();

    ludo.UserChessReq = (function() {

        /**
         * Properties of a UserChessReq.
         * @memberof ludo
         * @interface IUserChessReq
         * @property {number|null} [piece_id] UserChessReq piece_id
         */

        /**
         * Constructs a new UserChessReq.
         * @memberof ludo
         * @classdesc Represents a UserChessReq.
         * @implements IUserChessReq
         * @constructor
         * @param {ludo.IUserChessReq=} [properties] Properties to set
         */
        function UserChessReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserChessReq piece_id.
         * @member {number} piece_id
         * @memberof ludo.UserChessReq
         * @instance
         */
        UserChessReq.prototype.piece_id = 0;

        /**
         * Creates a new UserChessReq instance using the specified properties.
         * @function create
         * @memberof ludo.UserChessReq
         * @static
         * @param {ludo.IUserChessReq=} [properties] Properties to set
         * @returns {ludo.UserChessReq} UserChessReq instance
         */
        UserChessReq.create = function create(properties) {
            return new UserChessReq(properties);
        };

        /**
         * Encodes the specified UserChessReq message. Does not implicitly {@link ludo.UserChessReq.verify|verify} messages.
         * @function encode
         * @memberof ludo.UserChessReq
         * @static
         * @param {ludo.IUserChessReq} message UserChessReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserChessReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.piece_id != null && Object.hasOwnProperty.call(message, "piece_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.piece_id);
            return writer;
        };

        /**
         * Encodes the specified UserChessReq message, length delimited. Does not implicitly {@link ludo.UserChessReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.UserChessReq
         * @static
         * @param {ludo.IUserChessReq} message UserChessReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserChessReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserChessReq message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.UserChessReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.UserChessReq} UserChessReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserChessReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.UserChessReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.piece_id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserChessReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.UserChessReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.UserChessReq} UserChessReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserChessReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserChessReq message.
         * @function verify
         * @memberof ludo.UserChessReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserChessReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.piece_id != null && message.hasOwnProperty("piece_id"))
                if (!$util.isInteger(message.piece_id))
                    return "piece_id: integer expected";
            return null;
        };

        /**
         * Creates a UserChessReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.UserChessReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.UserChessReq} UserChessReq
         */
        UserChessReq.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.UserChessReq)
                return object;
            var message = new $root.ludo.UserChessReq();
            if (object.piece_id != null)
                message.piece_id = object.piece_id | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserChessReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.UserChessReq
         * @static
         * @param {ludo.UserChessReq} message UserChessReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserChessReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.piece_id = 0;
            if (message.piece_id != null && message.hasOwnProperty("piece_id"))
                object.piece_id = message.piece_id;
            return object;
        };

        /**
         * Converts this UserChessReq to JSON.
         * @function toJSON
         * @memberof ludo.UserChessReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserChessReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserChessReq;
    })();

    ludo.EvtUserChess = (function() {

        /**
         * Properties of an EvtUserChess.
         * @memberof ludo
         * @interface IEvtUserChess
         * @property {number|null} [seat_id] EvtUserChess seat_id
         * @property {ludo.ILudoGameInfo|null} [match_info] EvtUserChess match_info
         * @property {number|null} [piece_id] EvtUserChess piece_id
         * @property {number|null} [point] EvtUserChess point
         * @property {number|null} [attacked_piece_id] EvtUserChess attacked_piece_id
         * @property {Array.<ludo.EvtUserChess.IAddScore>|null} [add_score] EvtUserChess add_score
         */

        /**
         * Constructs a new EvtUserChess.
         * @memberof ludo
         * @classdesc Represents an EvtUserChess.
         * @implements IEvtUserChess
         * @constructor
         * @param {ludo.IEvtUserChess=} [properties] Properties to set
         */
        function EvtUserChess(properties) {
            this.add_score = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtUserChess seat_id.
         * @member {number} seat_id
         * @memberof ludo.EvtUserChess
         * @instance
         */
        EvtUserChess.prototype.seat_id = 0;

        /**
         * EvtUserChess match_info.
         * @member {ludo.ILudoGameInfo|null|undefined} match_info
         * @memberof ludo.EvtUserChess
         * @instance
         */
        EvtUserChess.prototype.match_info = null;

        /**
         * EvtUserChess piece_id.
         * @member {number} piece_id
         * @memberof ludo.EvtUserChess
         * @instance
         */
        EvtUserChess.prototype.piece_id = 0;

        /**
         * EvtUserChess point.
         * @member {number} point
         * @memberof ludo.EvtUserChess
         * @instance
         */
        EvtUserChess.prototype.point = 0;

        /**
         * EvtUserChess attacked_piece_id.
         * @member {number} attacked_piece_id
         * @memberof ludo.EvtUserChess
         * @instance
         */
        EvtUserChess.prototype.attacked_piece_id = 0;

        /**
         * EvtUserChess add_score.
         * @member {Array.<ludo.EvtUserChess.IAddScore>} add_score
         * @memberof ludo.EvtUserChess
         * @instance
         */
        EvtUserChess.prototype.add_score = $util.emptyArray;

        /**
         * Creates a new EvtUserChess instance using the specified properties.
         * @function create
         * @memberof ludo.EvtUserChess
         * @static
         * @param {ludo.IEvtUserChess=} [properties] Properties to set
         * @returns {ludo.EvtUserChess} EvtUserChess instance
         */
        EvtUserChess.create = function create(properties) {
            return new EvtUserChess(properties);
        };

        /**
         * Encodes the specified EvtUserChess message. Does not implicitly {@link ludo.EvtUserChess.verify|verify} messages.
         * @function encode
         * @memberof ludo.EvtUserChess
         * @static
         * @param {ludo.IEvtUserChess} message EvtUserChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserChess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat_id != null && Object.hasOwnProperty.call(message, "seat_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat_id);
            if (message.match_info != null && Object.hasOwnProperty.call(message, "match_info"))
                $root.ludo.LudoGameInfo.encode(message.match_info, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.piece_id != null && Object.hasOwnProperty.call(message, "piece_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.piece_id);
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.point);
            if (message.attacked_piece_id != null && Object.hasOwnProperty.call(message, "attacked_piece_id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.attacked_piece_id);
            if (message.add_score != null && message.add_score.length)
                for (var i = 0; i < message.add_score.length; ++i)
                    $root.ludo.EvtUserChess.AddScore.encode(message.add_score[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EvtUserChess message, length delimited. Does not implicitly {@link ludo.EvtUserChess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.EvtUserChess
         * @static
         * @param {ludo.IEvtUserChess} message EvtUserChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtUserChess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtUserChess message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.EvtUserChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.EvtUserChess} EvtUserChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserChess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.EvtUserChess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat_id = reader.int32();
                    break;
                case 2:
                    message.match_info = $root.ludo.LudoGameInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.piece_id = reader.int32();
                    break;
                case 4:
                    message.point = reader.int32();
                    break;
                case 5:
                    message.attacked_piece_id = reader.int32();
                    break;
                case 6:
                    if (!(message.add_score && message.add_score.length))
                        message.add_score = [];
                    message.add_score.push($root.ludo.EvtUserChess.AddScore.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtUserChess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.EvtUserChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.EvtUserChess} EvtUserChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtUserChess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtUserChess message.
         * @function verify
         * @memberof ludo.EvtUserChess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtUserChess.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (!$util.isInteger(message.seat_id))
                    return "seat_id: integer expected";
            if (message.match_info != null && message.hasOwnProperty("match_info")) {
                var error = $root.ludo.LudoGameInfo.verify(message.match_info);
                if (error)
                    return "match_info." + error;
            }
            if (message.piece_id != null && message.hasOwnProperty("piece_id"))
                if (!$util.isInteger(message.piece_id))
                    return "piece_id: integer expected";
            if (message.point != null && message.hasOwnProperty("point"))
                if (!$util.isInteger(message.point))
                    return "point: integer expected";
            if (message.attacked_piece_id != null && message.hasOwnProperty("attacked_piece_id"))
                if (!$util.isInteger(message.attacked_piece_id))
                    return "attacked_piece_id: integer expected";
            if (message.add_score != null && message.hasOwnProperty("add_score")) {
                if (!Array.isArray(message.add_score))
                    return "add_score: array expected";
                for (var i = 0; i < message.add_score.length; ++i) {
                    var error = $root.ludo.EvtUserChess.AddScore.verify(message.add_score[i]);
                    if (error)
                        return "add_score." + error;
                }
            }
            return null;
        };

        /**
         * Creates an EvtUserChess message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.EvtUserChess
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.EvtUserChess} EvtUserChess
         */
        EvtUserChess.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.EvtUserChess)
                return object;
            var message = new $root.ludo.EvtUserChess();
            if (object.seat_id != null)
                message.seat_id = object.seat_id | 0;
            if (object.match_info != null) {
                if (typeof object.match_info !== "object")
                    throw TypeError(".ludo.EvtUserChess.match_info: object expected");
                message.match_info = $root.ludo.LudoGameInfo.fromObject(object.match_info);
            }
            if (object.piece_id != null)
                message.piece_id = object.piece_id | 0;
            if (object.point != null)
                message.point = object.point | 0;
            if (object.attacked_piece_id != null)
                message.attacked_piece_id = object.attacked_piece_id | 0;
            if (object.add_score) {
                if (!Array.isArray(object.add_score))
                    throw TypeError(".ludo.EvtUserChess.add_score: array expected");
                message.add_score = [];
                for (var i = 0; i < object.add_score.length; ++i) {
                    if (typeof object.add_score[i] !== "object")
                        throw TypeError(".ludo.EvtUserChess.add_score: object expected");
                    message.add_score[i] = $root.ludo.EvtUserChess.AddScore.fromObject(object.add_score[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an EvtUserChess message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.EvtUserChess
         * @static
         * @param {ludo.EvtUserChess} message EvtUserChess
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtUserChess.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.add_score = [];
            if (options.defaults) {
                object.seat_id = 0;
                object.match_info = null;
                object.piece_id = 0;
                object.point = 0;
                object.attacked_piece_id = 0;
            }
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                object.seat_id = message.seat_id;
            if (message.match_info != null && message.hasOwnProperty("match_info"))
                object.match_info = $root.ludo.LudoGameInfo.toObject(message.match_info, options);
            if (message.piece_id != null && message.hasOwnProperty("piece_id"))
                object.piece_id = message.piece_id;
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = message.point;
            if (message.attacked_piece_id != null && message.hasOwnProperty("attacked_piece_id"))
                object.attacked_piece_id = message.attacked_piece_id;
            if (message.add_score && message.add_score.length) {
                object.add_score = [];
                for (var j = 0; j < message.add_score.length; ++j)
                    object.add_score[j] = $root.ludo.EvtUserChess.AddScore.toObject(message.add_score[j], options);
            }
            return object;
        };

        /**
         * Converts this EvtUserChess to JSON.
         * @function toJSON
         * @memberof ludo.EvtUserChess
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtUserChess.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        EvtUserChess.AddScore = (function() {

            /**
             * Properties of an AddScore.
             * @memberof ludo.EvtUserChess
             * @interface IAddScore
             * @property {ludo.ScoreType|null} [score_type] AddScore score_type
             * @property {number|null} [score] AddScore score
             */

            /**
             * Constructs a new AddScore.
             * @memberof ludo.EvtUserChess
             * @classdesc Represents an AddScore.
             * @implements IAddScore
             * @constructor
             * @param {ludo.EvtUserChess.IAddScore=} [properties] Properties to set
             */
            function AddScore(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AddScore score_type.
             * @member {ludo.ScoreType} score_type
             * @memberof ludo.EvtUserChess.AddScore
             * @instance
             */
            AddScore.prototype.score_type = 0;

            /**
             * AddScore score.
             * @member {number} score
             * @memberof ludo.EvtUserChess.AddScore
             * @instance
             */
            AddScore.prototype.score = 0;

            /**
             * Creates a new AddScore instance using the specified properties.
             * @function create
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {ludo.EvtUserChess.IAddScore=} [properties] Properties to set
             * @returns {ludo.EvtUserChess.AddScore} AddScore instance
             */
            AddScore.create = function create(properties) {
                return new AddScore(properties);
            };

            /**
             * Encodes the specified AddScore message. Does not implicitly {@link ludo.EvtUserChess.AddScore.verify|verify} messages.
             * @function encode
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {ludo.EvtUserChess.IAddScore} message AddScore message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddScore.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.score_type != null && Object.hasOwnProperty.call(message, "score_type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.score_type);
                if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
                return writer;
            };

            /**
             * Encodes the specified AddScore message, length delimited. Does not implicitly {@link ludo.EvtUserChess.AddScore.verify|verify} messages.
             * @function encodeDelimited
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {ludo.EvtUserChess.IAddScore} message AddScore message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddScore.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AddScore message from the specified reader or buffer.
             * @function decode
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {ludo.EvtUserChess.AddScore} AddScore
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddScore.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.EvtUserChess.AddScore();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.score_type = reader.int32();
                        break;
                    case 2:
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
             * Decodes an AddScore message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {ludo.EvtUserChess.AddScore} AddScore
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddScore.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AddScore message.
             * @function verify
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AddScore.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.score_type != null && message.hasOwnProperty("score_type"))
                    switch (message.score_type) {
                    default:
                        return "score_type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                return null;
            };

            /**
             * Creates an AddScore message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {ludo.EvtUserChess.AddScore} AddScore
             */
            AddScore.fromObject = function fromObject(object) {
                if (object instanceof $root.ludo.EvtUserChess.AddScore)
                    return object;
                var message = new $root.ludo.EvtUserChess.AddScore();
                switch (object.score_type) {
                case "SCORE_TYPE_NORMAL":
                case 0:
                    message.score_type = 0;
                    break;
                case "SCORE_TYPE_ATTACK":
                case 1:
                    message.score_type = 1;
                    break;
                case "SCORE_TYPE_FINISHED":
                case 2:
                    message.score_type = 2;
                    break;
                case "SCORE_TYPE_ATTACK_REWARD":
                case 3:
                    message.score_type = 3;
                    break;
                }
                if (object.score != null)
                    message.score = object.score | 0;
                return message;
            };

            /**
             * Creates a plain object from an AddScore message. Also converts values to other types if specified.
             * @function toObject
             * @memberof ludo.EvtUserChess.AddScore
             * @static
             * @param {ludo.EvtUserChess.AddScore} message AddScore
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AddScore.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.score_type = options.enums === String ? "SCORE_TYPE_NORMAL" : 0;
                    object.score = 0;
                }
                if (message.score_type != null && message.hasOwnProperty("score_type"))
                    object.score_type = options.enums === String ? $root.ludo.ScoreType[message.score_type] : message.score_type;
                if (message.score != null && message.hasOwnProperty("score"))
                    object.score = message.score;
                return object;
            };

            /**
             * Converts this AddScore to JSON.
             * @function toJSON
             * @memberof ludo.EvtUserChess.AddScore
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddScore.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AddScore;
        })();

        return EvtUserChess;
    })();

    ludo.UserCancelAutoPlay = (function() {

        /**
         * Properties of a UserCancelAutoPlay.
         * @memberof ludo
         * @interface IUserCancelAutoPlay
         */

        /**
         * Constructs a new UserCancelAutoPlay.
         * @memberof ludo
         * @classdesc Represents a UserCancelAutoPlay.
         * @implements IUserCancelAutoPlay
         * @constructor
         * @param {ludo.IUserCancelAutoPlay=} [properties] Properties to set
         */
        function UserCancelAutoPlay(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserCancelAutoPlay instance using the specified properties.
         * @function create
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {ludo.IUserCancelAutoPlay=} [properties] Properties to set
         * @returns {ludo.UserCancelAutoPlay} UserCancelAutoPlay instance
         */
        UserCancelAutoPlay.create = function create(properties) {
            return new UserCancelAutoPlay(properties);
        };

        /**
         * Encodes the specified UserCancelAutoPlay message. Does not implicitly {@link ludo.UserCancelAutoPlay.verify|verify} messages.
         * @function encode
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {ludo.IUserCancelAutoPlay} message UserCancelAutoPlay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserCancelAutoPlay.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserCancelAutoPlay message, length delimited. Does not implicitly {@link ludo.UserCancelAutoPlay.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {ludo.IUserCancelAutoPlay} message UserCancelAutoPlay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserCancelAutoPlay.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserCancelAutoPlay message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.UserCancelAutoPlay} UserCancelAutoPlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserCancelAutoPlay.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.UserCancelAutoPlay();
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
         * Decodes a UserCancelAutoPlay message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.UserCancelAutoPlay} UserCancelAutoPlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserCancelAutoPlay.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserCancelAutoPlay message.
         * @function verify
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserCancelAutoPlay.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserCancelAutoPlay message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.UserCancelAutoPlay} UserCancelAutoPlay
         */
        UserCancelAutoPlay.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.UserCancelAutoPlay)
                return object;
            return new $root.ludo.UserCancelAutoPlay();
        };

        /**
         * Creates a plain object from a UserCancelAutoPlay message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.UserCancelAutoPlay
         * @static
         * @param {ludo.UserCancelAutoPlay} message UserCancelAutoPlay
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserCancelAutoPlay.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserCancelAutoPlay to JSON.
         * @function toJSON
         * @memberof ludo.UserCancelAutoPlay
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserCancelAutoPlay.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserCancelAutoPlay;
    })();

    ludo.LudoUserOverInfo = (function() {

        /**
         * Properties of a LudoUserOverInfo.
         * @memberof ludo
         * @interface ILudoUserOverInfo
         * @property {number|null} [uid] LudoUserOverInfo uid
         * @property {string|null} [nick] LudoUserOverInfo nick
         * @property {string|null} [avatar] LudoUserOverInfo avatar
         * @property {string|null} [area_code] LudoUserOverInfo area_code
         * @property {number|null} [seat_id] LudoUserOverInfo seat_id
         * @property {number|null} [total_score] LudoUserOverInfo total_score
         * @property {number|null} [attack] LudoUserOverInfo attack
         * @property {number|null} [be_attacked] LudoUserOverInfo be_attacked
         * @property {boolean|null} [win] LudoUserOverInfo win
         * @property {Array.<ludo.LudoUserOverInfo.IGameReward>|null} [rewards] LudoUserOverInfo rewards
         * @property {number|null} [rank] LudoUserOverInfo rank
         * @property {ludo.LudoPlayerStatus|null} [status] LudoUserOverInfo status
         */

        /**
         * Constructs a new LudoUserOverInfo.
         * @memberof ludo
         * @classdesc Represents a LudoUserOverInfo.
         * @implements ILudoUserOverInfo
         * @constructor
         * @param {ludo.ILudoUserOverInfo=} [properties] Properties to set
         */
        function LudoUserOverInfo(properties) {
            this.rewards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LudoUserOverInfo uid.
         * @member {number} uid
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LudoUserOverInfo nick.
         * @member {string} nick
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.nick = "";

        /**
         * LudoUserOverInfo avatar.
         * @member {string} avatar
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.avatar = "";

        /**
         * LudoUserOverInfo area_code.
         * @member {string} area_code
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.area_code = "";

        /**
         * LudoUserOverInfo seat_id.
         * @member {number} seat_id
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.seat_id = 0;

        /**
         * LudoUserOverInfo total_score.
         * @member {number} total_score
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.total_score = 0;

        /**
         * LudoUserOverInfo attack.
         * @member {number} attack
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.attack = 0;

        /**
         * LudoUserOverInfo be_attacked.
         * @member {number} be_attacked
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.be_attacked = 0;

        /**
         * LudoUserOverInfo win.
         * @member {boolean} win
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.win = false;

        /**
         * LudoUserOverInfo rewards.
         * @member {Array.<ludo.LudoUserOverInfo.IGameReward>} rewards
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.rewards = $util.emptyArray;

        /**
         * LudoUserOverInfo rank.
         * @member {number} rank
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.rank = 0;

        /**
         * LudoUserOverInfo status.
         * @member {ludo.LudoPlayerStatus} status
         * @memberof ludo.LudoUserOverInfo
         * @instance
         */
        LudoUserOverInfo.prototype.status = 0;

        /**
         * Creates a new LudoUserOverInfo instance using the specified properties.
         * @function create
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {ludo.ILudoUserOverInfo=} [properties] Properties to set
         * @returns {ludo.LudoUserOverInfo} LudoUserOverInfo instance
         */
        LudoUserOverInfo.create = function create(properties) {
            return new LudoUserOverInfo(properties);
        };

        /**
         * Encodes the specified LudoUserOverInfo message. Does not implicitly {@link ludo.LudoUserOverInfo.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {ludo.ILudoUserOverInfo} message LudoUserOverInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoUserOverInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
            if (message.nick != null && Object.hasOwnProperty.call(message, "nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nick);
            if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
            if (message.area_code != null && Object.hasOwnProperty.call(message, "area_code"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.area_code);
            if (message.seat_id != null && Object.hasOwnProperty.call(message, "seat_id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.seat_id);
            if (message.total_score != null && Object.hasOwnProperty.call(message, "total_score"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.total_score);
            if (message.attack != null && Object.hasOwnProperty.call(message, "attack"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.attack);
            if (message.be_attacked != null && Object.hasOwnProperty.call(message, "be_attacked"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.be_attacked);
            if (message.win != null && Object.hasOwnProperty.call(message, "win"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.win);
            if (message.rewards != null && message.rewards.length)
                for (var i = 0; i < message.rewards.length; ++i)
                    $root.ludo.LudoUserOverInfo.GameReward.encode(message.rewards[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.rank != null && Object.hasOwnProperty.call(message, "rank"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.rank);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified LudoUserOverInfo message, length delimited. Does not implicitly {@link ludo.LudoUserOverInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {ludo.ILudoUserOverInfo} message LudoUserOverInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoUserOverInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoUserOverInfo message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoUserOverInfo} LudoUserOverInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoUserOverInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoUserOverInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int64();
                    break;
                case 2:
                    message.nick = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.area_code = reader.string();
                    break;
                case 5:
                    message.seat_id = reader.int32();
                    break;
                case 6:
                    message.total_score = reader.int32();
                    break;
                case 7:
                    message.attack = reader.int32();
                    break;
                case 8:
                    message.be_attacked = reader.int32();
                    break;
                case 9:
                    message.win = reader.bool();
                    break;
                case 10:
                    if (!(message.rewards && message.rewards.length))
                        message.rewards = [];
                    message.rewards.push($root.ludo.LudoUserOverInfo.GameReward.decode(reader, reader.uint32()));
                    break;
                case 11:
                    message.rank = reader.int32();
                    break;
                case 12:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LudoUserOverInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoUserOverInfo} LudoUserOverInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoUserOverInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoUserOverInfo message.
         * @function verify
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoUserOverInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                    return "uid: integer|Long expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                if (!$util.isString(message.area_code))
                    return "area_code: string expected";
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (!$util.isInteger(message.seat_id))
                    return "seat_id: integer expected";
            if (message.total_score != null && message.hasOwnProperty("total_score"))
                if (!$util.isInteger(message.total_score))
                    return "total_score: integer expected";
            if (message.attack != null && message.hasOwnProperty("attack"))
                if (!$util.isInteger(message.attack))
                    return "attack: integer expected";
            if (message.be_attacked != null && message.hasOwnProperty("be_attacked"))
                if (!$util.isInteger(message.be_attacked))
                    return "be_attacked: integer expected";
            if (message.win != null && message.hasOwnProperty("win"))
                if (typeof message.win !== "boolean")
                    return "win: boolean expected";
            if (message.rewards != null && message.hasOwnProperty("rewards")) {
                if (!Array.isArray(message.rewards))
                    return "rewards: array expected";
                for (var i = 0; i < message.rewards.length; ++i) {
                    var error = $root.ludo.LudoUserOverInfo.GameReward.verify(message.rewards[i]);
                    if (error)
                        return "rewards." + error;
                }
            }
            if (message.rank != null && message.hasOwnProperty("rank"))
                if (!$util.isInteger(message.rank))
                    return "rank: integer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates a LudoUserOverInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoUserOverInfo} LudoUserOverInfo
         */
        LudoUserOverInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoUserOverInfo)
                return object;
            var message = new $root.ludo.LudoUserOverInfo();
            if (object.uid != null)
                if ($util.Long)
                    (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                else if (typeof object.uid === "string")
                    message.uid = parseInt(object.uid, 10);
                else if (typeof object.uid === "number")
                    message.uid = object.uid;
                else if (typeof object.uid === "object")
                    message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.area_code != null)
                message.area_code = String(object.area_code);
            if (object.seat_id != null)
                message.seat_id = object.seat_id | 0;
            if (object.total_score != null)
                message.total_score = object.total_score | 0;
            if (object.attack != null)
                message.attack = object.attack | 0;
            if (object.be_attacked != null)
                message.be_attacked = object.be_attacked | 0;
            if (object.win != null)
                message.win = Boolean(object.win);
            if (object.rewards) {
                if (!Array.isArray(object.rewards))
                    throw TypeError(".ludo.LudoUserOverInfo.rewards: array expected");
                message.rewards = [];
                for (var i = 0; i < object.rewards.length; ++i) {
                    if (typeof object.rewards[i] !== "object")
                        throw TypeError(".ludo.LudoUserOverInfo.rewards: object expected");
                    message.rewards[i] = $root.ludo.LudoUserOverInfo.GameReward.fromObject(object.rewards[i]);
                }
            }
            if (object.rank != null)
                message.rank = object.rank | 0;
            switch (object.status) {
            case "PLAYER_STATUS_NORMAL":
            case 0:
                message.status = 0;
                break;
            case "PLAYER_STATUS_AUTO":
            case 1:
                message.status = 1;
                break;
            case "PLAYER_STATUS_LEAVE":
            case 2:
                message.status = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a LudoUserOverInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoUserOverInfo
         * @static
         * @param {ludo.LudoUserOverInfo} message LudoUserOverInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoUserOverInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rewards = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uid = options.longs === String ? "0" : 0;
                object.nick = "";
                object.avatar = "";
                object.area_code = "";
                object.seat_id = 0;
                object.total_score = 0;
                object.attack = 0;
                object.be_attacked = 0;
                object.win = false;
                object.rank = 0;
                object.status = options.enums === String ? "PLAYER_STATUS_NORMAL" : 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (typeof message.uid === "number")
                    object.uid = options.longs === String ? String(message.uid) : message.uid;
                else
                    object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.area_code != null && message.hasOwnProperty("area_code"))
                object.area_code = message.area_code;
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                object.seat_id = message.seat_id;
            if (message.total_score != null && message.hasOwnProperty("total_score"))
                object.total_score = message.total_score;
            if (message.attack != null && message.hasOwnProperty("attack"))
                object.attack = message.attack;
            if (message.be_attacked != null && message.hasOwnProperty("be_attacked"))
                object.be_attacked = message.be_attacked;
            if (message.win != null && message.hasOwnProperty("win"))
                object.win = message.win;
            if (message.rewards && message.rewards.length) {
                object.rewards = [];
                for (var j = 0; j < message.rewards.length; ++j)
                    object.rewards[j] = $root.ludo.LudoUserOverInfo.GameReward.toObject(message.rewards[j], options);
            }
            if (message.rank != null && message.hasOwnProperty("rank"))
                object.rank = message.rank;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.ludo.LudoPlayerStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this LudoUserOverInfo to JSON.
         * @function toJSON
         * @memberof ludo.LudoUserOverInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoUserOverInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        LudoUserOverInfo.GameReward = (function() {

            /**
             * Properties of a GameReward.
             * @memberof ludo.LudoUserOverInfo
             * @interface IGameReward
             * @property {core.PropType|null} [prop_type] GameReward prop_type
             * @property {number|null} [amount] GameReward amount
             */

            /**
             * Constructs a new GameReward.
             * @memberof ludo.LudoUserOverInfo
             * @classdesc Represents a GameReward.
             * @implements IGameReward
             * @constructor
             * @param {ludo.LudoUserOverInfo.IGameReward=} [properties] Properties to set
             */
            function GameReward(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GameReward prop_type.
             * @member {core.PropType} prop_type
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @instance
             */
            GameReward.prototype.prop_type = 0;

            /**
             * GameReward amount.
             * @member {number} amount
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @instance
             */
            GameReward.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new GameReward instance using the specified properties.
             * @function create
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {ludo.LudoUserOverInfo.IGameReward=} [properties] Properties to set
             * @returns {ludo.LudoUserOverInfo.GameReward} GameReward instance
             */
            GameReward.create = function create(properties) {
                return new GameReward(properties);
            };

            /**
             * Encodes the specified GameReward message. Does not implicitly {@link ludo.LudoUserOverInfo.GameReward.verify|verify} messages.
             * @function encode
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {ludo.LudoUserOverInfo.IGameReward} message GameReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameReward.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.prop_type != null && Object.hasOwnProperty.call(message, "prop_type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.prop_type);
                if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
                return writer;
            };

            /**
             * Encodes the specified GameReward message, length delimited. Does not implicitly {@link ludo.LudoUserOverInfo.GameReward.verify|verify} messages.
             * @function encodeDelimited
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {ludo.LudoUserOverInfo.IGameReward} message GameReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameReward.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GameReward message from the specified reader or buffer.
             * @function decode
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {ludo.LudoUserOverInfo.GameReward} GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameReward.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoUserOverInfo.GameReward();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.prop_type = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GameReward message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {ludo.LudoUserOverInfo.GameReward} GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameReward.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GameReward message.
             * @function verify
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GameReward.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    switch (message.prop_type) {
                    default:
                        return "prop_type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        break;
                    }
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                        return "amount: integer|Long expected";
                return null;
            };

            /**
             * Creates a GameReward message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {ludo.LudoUserOverInfo.GameReward} GameReward
             */
            GameReward.fromObject = function fromObject(object) {
                if (object instanceof $root.ludo.LudoUserOverInfo.GameReward)
                    return object;
                var message = new $root.ludo.LudoUserOverInfo.GameReward();
                switch (object.prop_type) {
                case "PROP_TYPE_FREE":
                case 0:
                    message.prop_type = 0;
                    break;
                case "PROP_TYPE_TICKET":
                case 1:
                    message.prop_type = 1;
                    break;
                case "PROP_TYPE_CASH":
                case 2:
                    message.prop_type = 2;
                    break;
                case "PROP_TYPE_BIND_CASH":
                case 3:
                    message.prop_type = 3;
                    break;
                case "PROP_TYPE_SEASON_SCORE":
                case 5:
                    message.prop_type = 5;
                    break;
                case "PROP_TYPE_LOTTERY_LV1":
                case 6:
                    message.prop_type = 6;
                    break;
                case "PROP_TYPE_LOTTERY_LV2":
                case 7:
                    message.prop_type = 7;
                    break;
                case "PROP_TYPE_LOTTERY_LV3":
                case 8:
                    message.prop_type = 8;
                    break;
                case "PROP_TYPE_LOTTERY_LV4":
                case 9:
                    message.prop_type = 9;
                    break;
                case "PROP_TYPE_DIAMOND":
                case 10:
                    message.prop_type = 10;
                    break;
                }
                if (object.amount != null)
                    if ($util.Long)
                        (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                    else if (typeof object.amount === "string")
                        message.amount = parseInt(object.amount, 10);
                    else if (typeof object.amount === "number")
                        message.amount = object.amount;
                    else if (typeof object.amount === "object")
                        message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a GameReward message. Also converts values to other types if specified.
             * @function toObject
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @static
             * @param {ludo.LudoUserOverInfo.GameReward} message GameReward
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GameReward.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.prop_type = options.enums === String ? "PROP_TYPE_FREE" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.amount = options.longs === String ? "0" : 0;
                }
                if (message.prop_type != null && message.hasOwnProperty("prop_type"))
                    object.prop_type = options.enums === String ? $root.core.PropType[message.prop_type] : message.prop_type;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (typeof message.amount === "number")
                        object.amount = options.longs === String ? String(message.amount) : message.amount;
                    else
                        object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
                return object;
            };

            /**
             * Converts this GameReward to JSON.
             * @function toJSON
             * @memberof ludo.LudoUserOverInfo.GameReward
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GameReward.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GameReward;
        })();

        return LudoUserOverInfo;
    })();

    ludo.EvtLudoGameOver = (function() {

        /**
         * Properties of an EvtLudoGameOver.
         * @memberof ludo
         * @interface IEvtLudoGameOver
         * @property {Array.<ludo.ILudoUserOverInfo>|null} [game_over_info] EvtLudoGameOver game_over_info
         */

        /**
         * Constructs a new EvtLudoGameOver.
         * @memberof ludo
         * @classdesc Represents an EvtLudoGameOver.
         * @implements IEvtLudoGameOver
         * @constructor
         * @param {ludo.IEvtLudoGameOver=} [properties] Properties to set
         */
        function EvtLudoGameOver(properties) {
            this.game_over_info = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EvtLudoGameOver game_over_info.
         * @member {Array.<ludo.ILudoUserOverInfo>} game_over_info
         * @memberof ludo.EvtLudoGameOver
         * @instance
         */
        EvtLudoGameOver.prototype.game_over_info = $util.emptyArray;

        /**
         * Creates a new EvtLudoGameOver instance using the specified properties.
         * @function create
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {ludo.IEvtLudoGameOver=} [properties] Properties to set
         * @returns {ludo.EvtLudoGameOver} EvtLudoGameOver instance
         */
        EvtLudoGameOver.create = function create(properties) {
            return new EvtLudoGameOver(properties);
        };

        /**
         * Encodes the specified EvtLudoGameOver message. Does not implicitly {@link ludo.EvtLudoGameOver.verify|verify} messages.
         * @function encode
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {ludo.IEvtLudoGameOver} message EvtLudoGameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtLudoGameOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.game_over_info != null && message.game_over_info.length)
                for (var i = 0; i < message.game_over_info.length; ++i)
                    $root.ludo.LudoUserOverInfo.encode(message.game_over_info[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EvtLudoGameOver message, length delimited. Does not implicitly {@link ludo.EvtLudoGameOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {ludo.IEvtLudoGameOver} message EvtLudoGameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EvtLudoGameOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EvtLudoGameOver message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.EvtLudoGameOver} EvtLudoGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtLudoGameOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.EvtLudoGameOver();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.game_over_info && message.game_over_info.length))
                        message.game_over_info = [];
                    message.game_over_info.push($root.ludo.LudoUserOverInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EvtLudoGameOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.EvtLudoGameOver} EvtLudoGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EvtLudoGameOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EvtLudoGameOver message.
         * @function verify
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EvtLudoGameOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.game_over_info != null && message.hasOwnProperty("game_over_info")) {
                if (!Array.isArray(message.game_over_info))
                    return "game_over_info: array expected";
                for (var i = 0; i < message.game_over_info.length; ++i) {
                    var error = $root.ludo.LudoUserOverInfo.verify(message.game_over_info[i]);
                    if (error)
                        return "game_over_info." + error;
                }
            }
            return null;
        };

        /**
         * Creates an EvtLudoGameOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.EvtLudoGameOver} EvtLudoGameOver
         */
        EvtLudoGameOver.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.EvtLudoGameOver)
                return object;
            var message = new $root.ludo.EvtLudoGameOver();
            if (object.game_over_info) {
                if (!Array.isArray(object.game_over_info))
                    throw TypeError(".ludo.EvtLudoGameOver.game_over_info: array expected");
                message.game_over_info = [];
                for (var i = 0; i < object.game_over_info.length; ++i) {
                    if (typeof object.game_over_info[i] !== "object")
                        throw TypeError(".ludo.EvtLudoGameOver.game_over_info: object expected");
                    message.game_over_info[i] = $root.ludo.LudoUserOverInfo.fromObject(object.game_over_info[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an EvtLudoGameOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.EvtLudoGameOver
         * @static
         * @param {ludo.EvtLudoGameOver} message EvtLudoGameOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EvtLudoGameOver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.game_over_info = [];
            if (message.game_over_info && message.game_over_info.length) {
                object.game_over_info = [];
                for (var j = 0; j < message.game_over_info.length; ++j)
                    object.game_over_info[j] = $root.ludo.LudoUserOverInfo.toObject(message.game_over_info[j], options);
            }
            return object;
        };

        /**
         * Converts this EvtLudoGameOver to JSON.
         * @function toJSON
         * @memberof ludo.EvtLudoGameOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EvtLudoGameOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EvtLudoGameOver;
    })();

    ludo.LudoReconnectReq = (function() {

        /**
         * Properties of a LudoReconnectReq.
         * @memberof ludo
         * @interface ILudoReconnectReq
         */

        /**
         * Constructs a new LudoReconnectReq.
         * @memberof ludo
         * @classdesc Represents a LudoReconnectReq.
         * @implements ILudoReconnectReq
         * @constructor
         * @param {ludo.ILudoReconnectReq=} [properties] Properties to set
         */
        function LudoReconnectReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LudoReconnectReq instance using the specified properties.
         * @function create
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {ludo.ILudoReconnectReq=} [properties] Properties to set
         * @returns {ludo.LudoReconnectReq} LudoReconnectReq instance
         */
        LudoReconnectReq.create = function create(properties) {
            return new LudoReconnectReq(properties);
        };

        /**
         * Encodes the specified LudoReconnectReq message. Does not implicitly {@link ludo.LudoReconnectReq.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {ludo.ILudoReconnectReq} message LudoReconnectReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoReconnectReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LudoReconnectReq message, length delimited. Does not implicitly {@link ludo.LudoReconnectReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {ludo.ILudoReconnectReq} message LudoReconnectReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoReconnectReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoReconnectReq message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoReconnectReq} LudoReconnectReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoReconnectReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoReconnectReq();
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
         * Decodes a LudoReconnectReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoReconnectReq} LudoReconnectReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoReconnectReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoReconnectReq message.
         * @function verify
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoReconnectReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LudoReconnectReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoReconnectReq} LudoReconnectReq
         */
        LudoReconnectReq.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoReconnectReq)
                return object;
            return new $root.ludo.LudoReconnectReq();
        };

        /**
         * Creates a plain object from a LudoReconnectReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoReconnectReq
         * @static
         * @param {ludo.LudoReconnectReq} message LudoReconnectReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoReconnectReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LudoReconnectReq to JSON.
         * @function toJSON
         * @memberof ludo.LudoReconnectReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoReconnectReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LudoReconnectReq;
    })();

    ludo.LudoReconnectRsp = (function() {

        /**
         * Properties of a LudoReconnectRsp.
         * @memberof ludo
         * @interface ILudoReconnectRsp
         * @property {core.MatchStatus|null} [match_status] LudoReconnectRsp match_status
         * @property {string|null} [uuid] LudoReconnectRsp uuid
         * @property {number|null} [room_type] LudoReconnectRsp room_type
         * @property {ludo.ILudoGameInfo|null} [match_info] LudoReconnectRsp match_info
         * @property {number|null} [desk_id] LudoReconnectRsp desk_id
         * @property {number|null} [room_id] LudoReconnectRsp room_id
         * @property {number|null} [seat_id] LudoReconnectRsp seat_id
         * @property {ludo.LudoOperate|null} [operate] LudoReconnectRsp operate
         * @property {number|null} [op_time] LudoReconnectRsp op_time
         * @property {ludo.ILudoPlayerInfo|null} [player_info] LudoReconnectRsp player_info
         * @property {number|null} [total_op_time] LudoReconnectRsp total_op_time
         */

        /**
         * Constructs a new LudoReconnectRsp.
         * @memberof ludo
         * @classdesc Represents a LudoReconnectRsp.
         * @implements ILudoReconnectRsp
         * @constructor
         * @param {ludo.ILudoReconnectRsp=} [properties] Properties to set
         */
        function LudoReconnectRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LudoReconnectRsp match_status.
         * @member {core.MatchStatus} match_status
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.match_status = 0;

        /**
         * LudoReconnectRsp uuid.
         * @member {string} uuid
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.uuid = "";

        /**
         * LudoReconnectRsp room_type.
         * @member {number} room_type
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.room_type = 0;

        /**
         * LudoReconnectRsp match_info.
         * @member {ludo.ILudoGameInfo|null|undefined} match_info
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.match_info = null;

        /**
         * LudoReconnectRsp desk_id.
         * @member {number} desk_id
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.desk_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LudoReconnectRsp room_id.
         * @member {number} room_id
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.room_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LudoReconnectRsp seat_id.
         * @member {number} seat_id
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.seat_id = 0;

        /**
         * LudoReconnectRsp operate.
         * @member {ludo.LudoOperate} operate
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.operate = 0;

        /**
         * LudoReconnectRsp op_time.
         * @member {number} op_time
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.op_time = 0;

        /**
         * LudoReconnectRsp player_info.
         * @member {ludo.ILudoPlayerInfo|null|undefined} player_info
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.player_info = null;

        /**
         * LudoReconnectRsp total_op_time.
         * @member {number} total_op_time
         * @memberof ludo.LudoReconnectRsp
         * @instance
         */
        LudoReconnectRsp.prototype.total_op_time = 0;

        /**
         * Creates a new LudoReconnectRsp instance using the specified properties.
         * @function create
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {ludo.ILudoReconnectRsp=} [properties] Properties to set
         * @returns {ludo.LudoReconnectRsp} LudoReconnectRsp instance
         */
        LudoReconnectRsp.create = function create(properties) {
            return new LudoReconnectRsp(properties);
        };

        /**
         * Encodes the specified LudoReconnectRsp message. Does not implicitly {@link ludo.LudoReconnectRsp.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {ludo.ILudoReconnectRsp} message LudoReconnectRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoReconnectRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.match_status != null && Object.hasOwnProperty.call(message, "match_status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.match_status);
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uuid);
            if (message.room_type != null && Object.hasOwnProperty.call(message, "room_type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.room_type);
            if (message.match_info != null && Object.hasOwnProperty.call(message, "match_info"))
                $root.ludo.LudoGameInfo.encode(message.match_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.desk_id != null && Object.hasOwnProperty.call(message, "desk_id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.desk_id);
            if (message.room_id != null && Object.hasOwnProperty.call(message, "room_id"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.room_id);
            if (message.seat_id != null && Object.hasOwnProperty.call(message, "seat_id"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.seat_id);
            if (message.operate != null && Object.hasOwnProperty.call(message, "operate"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.operate);
            if (message.op_time != null && Object.hasOwnProperty.call(message, "op_time"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.op_time);
            if (message.player_info != null && Object.hasOwnProperty.call(message, "player_info"))
                $root.ludo.LudoPlayerInfo.encode(message.player_info, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.total_op_time != null && Object.hasOwnProperty.call(message, "total_op_time"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.total_op_time);
            return writer;
        };

        /**
         * Encodes the specified LudoReconnectRsp message, length delimited. Does not implicitly {@link ludo.LudoReconnectRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {ludo.ILudoReconnectRsp} message LudoReconnectRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoReconnectRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoReconnectRsp message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoReconnectRsp} LudoReconnectRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoReconnectRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoReconnectRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.match_status = reader.int32();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.room_type = reader.int32();
                    break;
                case 4:
                    message.match_info = $root.ludo.LudoGameInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.desk_id = reader.int64();
                    break;
                case 6:
                    message.room_id = reader.int64();
                    break;
                case 7:
                    message.seat_id = reader.int32();
                    break;
                case 8:
                    message.operate = reader.int32();
                    break;
                case 9:
                    message.op_time = reader.int32();
                    break;
                case 10:
                    message.player_info = $root.ludo.LudoPlayerInfo.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.total_op_time = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LudoReconnectRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoReconnectRsp} LudoReconnectRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoReconnectRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoReconnectRsp message.
         * @function verify
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoReconnectRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.match_status != null && message.hasOwnProperty("match_status"))
                switch (message.match_status) {
                default:
                    return "match_status: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                if (!$util.isInteger(message.room_type))
                    return "room_type: integer expected";
            if (message.match_info != null && message.hasOwnProperty("match_info")) {
                var error = $root.ludo.LudoGameInfo.verify(message.match_info);
                if (error)
                    return "match_info." + error;
            }
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (!$util.isInteger(message.desk_id) && !(message.desk_id && $util.isInteger(message.desk_id.low) && $util.isInteger(message.desk_id.high)))
                    return "desk_id: integer|Long expected";
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (!$util.isInteger(message.room_id) && !(message.room_id && $util.isInteger(message.room_id.low) && $util.isInteger(message.room_id.high)))
                    return "room_id: integer|Long expected";
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                if (!$util.isInteger(message.seat_id))
                    return "seat_id: integer expected";
            if (message.operate != null && message.hasOwnProperty("operate"))
                switch (message.operate) {
                default:
                    return "operate: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.op_time != null && message.hasOwnProperty("op_time"))
                if (!$util.isInteger(message.op_time))
                    return "op_time: integer expected";
            if (message.player_info != null && message.hasOwnProperty("player_info")) {
                var error = $root.ludo.LudoPlayerInfo.verify(message.player_info);
                if (error)
                    return "player_info." + error;
            }
            if (message.total_op_time != null && message.hasOwnProperty("total_op_time"))
                if (!$util.isInteger(message.total_op_time))
                    return "total_op_time: integer expected";
            return null;
        };

        /**
         * Creates a LudoReconnectRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoReconnectRsp} LudoReconnectRsp
         */
        LudoReconnectRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoReconnectRsp)
                return object;
            var message = new $root.ludo.LudoReconnectRsp();
            switch (object.match_status) {
            case "STATUS_MATCHING":
            case 0:
                message.match_status = 0;
                break;
            case "STATUS_FINISHED":
            case 1:
                message.match_status = 1;
                break;
            }
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.room_type != null)
                message.room_type = object.room_type | 0;
            if (object.match_info != null) {
                if (typeof object.match_info !== "object")
                    throw TypeError(".ludo.LudoReconnectRsp.match_info: object expected");
                message.match_info = $root.ludo.LudoGameInfo.fromObject(object.match_info);
            }
            if (object.desk_id != null)
                if ($util.Long)
                    (message.desk_id = $util.Long.fromValue(object.desk_id)).unsigned = false;
                else if (typeof object.desk_id === "string")
                    message.desk_id = parseInt(object.desk_id, 10);
                else if (typeof object.desk_id === "number")
                    message.desk_id = object.desk_id;
                else if (typeof object.desk_id === "object")
                    message.desk_id = new $util.LongBits(object.desk_id.low >>> 0, object.desk_id.high >>> 0).toNumber();
            if (object.room_id != null)
                if ($util.Long)
                    (message.room_id = $util.Long.fromValue(object.room_id)).unsigned = false;
                else if (typeof object.room_id === "string")
                    message.room_id = parseInt(object.room_id, 10);
                else if (typeof object.room_id === "number")
                    message.room_id = object.room_id;
                else if (typeof object.room_id === "object")
                    message.room_id = new $util.LongBits(object.room_id.low >>> 0, object.room_id.high >>> 0).toNumber();
            if (object.seat_id != null)
                message.seat_id = object.seat_id | 0;
            switch (object.operate) {
            case "OPERATE_DICE":
            case 0:
                message.operate = 0;
                break;
            case "OPERATE_CHESS":
            case 1:
                message.operate = 1;
                break;
            }
            if (object.op_time != null)
                message.op_time = object.op_time | 0;
            if (object.player_info != null) {
                if (typeof object.player_info !== "object")
                    throw TypeError(".ludo.LudoReconnectRsp.player_info: object expected");
                message.player_info = $root.ludo.LudoPlayerInfo.fromObject(object.player_info);
            }
            if (object.total_op_time != null)
                message.total_op_time = object.total_op_time | 0;
            return message;
        };

        /**
         * Creates a plain object from a LudoReconnectRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoReconnectRsp
         * @static
         * @param {ludo.LudoReconnectRsp} message LudoReconnectRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoReconnectRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.match_status = options.enums === String ? "STATUS_MATCHING" : 0;
                object.uuid = "";
                object.room_type = 0;
                object.match_info = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.desk_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.desk_id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.room_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.room_id = options.longs === String ? "0" : 0;
                object.seat_id = 0;
                object.operate = options.enums === String ? "OPERATE_DICE" : 0;
                object.op_time = 0;
                object.player_info = null;
                object.total_op_time = 0;
            }
            if (message.match_status != null && message.hasOwnProperty("match_status"))
                object.match_status = options.enums === String ? $root.core.MatchStatus[message.match_status] : message.match_status;
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.room_type != null && message.hasOwnProperty("room_type"))
                object.room_type = message.room_type;
            if (message.match_info != null && message.hasOwnProperty("match_info"))
                object.match_info = $root.ludo.LudoGameInfo.toObject(message.match_info, options);
            if (message.desk_id != null && message.hasOwnProperty("desk_id"))
                if (typeof message.desk_id === "number")
                    object.desk_id = options.longs === String ? String(message.desk_id) : message.desk_id;
                else
                    object.desk_id = options.longs === String ? $util.Long.prototype.toString.call(message.desk_id) : options.longs === Number ? new $util.LongBits(message.desk_id.low >>> 0, message.desk_id.high >>> 0).toNumber() : message.desk_id;
            if (message.room_id != null && message.hasOwnProperty("room_id"))
                if (typeof message.room_id === "number")
                    object.room_id = options.longs === String ? String(message.room_id) : message.room_id;
                else
                    object.room_id = options.longs === String ? $util.Long.prototype.toString.call(message.room_id) : options.longs === Number ? new $util.LongBits(message.room_id.low >>> 0, message.room_id.high >>> 0).toNumber() : message.room_id;
            if (message.seat_id != null && message.hasOwnProperty("seat_id"))
                object.seat_id = message.seat_id;
            if (message.operate != null && message.hasOwnProperty("operate"))
                object.operate = options.enums === String ? $root.ludo.LudoOperate[message.operate] : message.operate;
            if (message.op_time != null && message.hasOwnProperty("op_time"))
                object.op_time = message.op_time;
            if (message.player_info != null && message.hasOwnProperty("player_info"))
                object.player_info = $root.ludo.LudoPlayerInfo.toObject(message.player_info, options);
            if (message.total_op_time != null && message.hasOwnProperty("total_op_time"))
                object.total_op_time = message.total_op_time;
            return object;
        };

        /**
         * Converts this LudoReconnectRsp to JSON.
         * @function toJSON
         * @memberof ludo.LudoReconnectRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoReconnectRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LudoReconnectRsp;
    })();

    ludo.LudoUserLeaveReq = (function() {

        /**
         * Properties of a LudoUserLeaveReq.
         * @memberof ludo
         * @interface ILudoUserLeaveReq
         */

        /**
         * Constructs a new LudoUserLeaveReq.
         * @memberof ludo
         * @classdesc Represents a LudoUserLeaveReq.
         * @implements ILudoUserLeaveReq
         * @constructor
         * @param {ludo.ILudoUserLeaveReq=} [properties] Properties to set
         */
        function LudoUserLeaveReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LudoUserLeaveReq instance using the specified properties.
         * @function create
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {ludo.ILudoUserLeaveReq=} [properties] Properties to set
         * @returns {ludo.LudoUserLeaveReq} LudoUserLeaveReq instance
         */
        LudoUserLeaveReq.create = function create(properties) {
            return new LudoUserLeaveReq(properties);
        };

        /**
         * Encodes the specified LudoUserLeaveReq message. Does not implicitly {@link ludo.LudoUserLeaveReq.verify|verify} messages.
         * @function encode
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {ludo.ILudoUserLeaveReq} message LudoUserLeaveReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoUserLeaveReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LudoUserLeaveReq message, length delimited. Does not implicitly {@link ludo.LudoUserLeaveReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {ludo.ILudoUserLeaveReq} message LudoUserLeaveReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LudoUserLeaveReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LudoUserLeaveReq message from the specified reader or buffer.
         * @function decode
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ludo.LudoUserLeaveReq} LudoUserLeaveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoUserLeaveReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ludo.LudoUserLeaveReq();
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
         * Decodes a LudoUserLeaveReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ludo.LudoUserLeaveReq} LudoUserLeaveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LudoUserLeaveReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LudoUserLeaveReq message.
         * @function verify
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LudoUserLeaveReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LudoUserLeaveReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ludo.LudoUserLeaveReq} LudoUserLeaveReq
         */
        LudoUserLeaveReq.fromObject = function fromObject(object) {
            if (object instanceof $root.ludo.LudoUserLeaveReq)
                return object;
            return new $root.ludo.LudoUserLeaveReq();
        };

        /**
         * Creates a plain object from a LudoUserLeaveReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ludo.LudoUserLeaveReq
         * @static
         * @param {ludo.LudoUserLeaveReq} message LudoUserLeaveReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LudoUserLeaveReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LudoUserLeaveReq to JSON.
         * @function toJSON
         * @memberof ludo.LudoUserLeaveReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LudoUserLeaveReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LudoUserLeaveReq;
    })();

    /**
     * LudoPlayerStatus enum.
     * @name ludo.LudoPlayerStatus
     * @enum {number}
     * @property {number} PLAYER_STATUS_NORMAL=0 PLAYER_STATUS_NORMAL value
     * @property {number} PLAYER_STATUS_AUTO=1 PLAYER_STATUS_AUTO value
     * @property {number} PLAYER_STATUS_LEAVE=2 PLAYER_STATUS_LEAVE value
     */
    ludo.LudoPlayerStatus = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PLAYER_STATUS_NORMAL"] = 0;
        values[valuesById[1] = "PLAYER_STATUS_AUTO"] = 1;
        values[valuesById[2] = "PLAYER_STATUS_LEAVE"] = 2;
        return values;
    })();

    return ludo;
})();

module.exports = $root;
