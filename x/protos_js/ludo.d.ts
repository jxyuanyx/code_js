import * as $protobuf from "protobufjs";
/** Namespace core. */
export namespace core {

    /** Properties of a SafeShell. */
    interface ISafeShell {

        /** SafeShell uid */
        uid?: (number|null);

        /** SafeShell token */
        token?: (string|null);

        /** SafeShell random */
        random?: (number|null);

        /** SafeShell time */
        time?: (number|null);

        /** SafeShell time_zone */
        time_zone?: (number|null);

        /** SafeShell version */
        version?: (number|null);

        /** SafeShell channel */
        channel?: (string|null);

        /** SafeShell body */
        body?: (Uint8Array|null);

        /** SafeShell desk_id */
        desk_id?: (number|null);

        /** SafeShell room_id */
        room_id?: (number|null);
    }

    /** Represents a SafeShell. */
    class SafeShell implements ISafeShell {

        /**
         * Constructs a new SafeShell.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.ISafeShell);

        /** SafeShell uid. */
        public uid: number;

        /** SafeShell token. */
        public token: string;

        /** SafeShell random. */
        public random: number;

        /** SafeShell time. */
        public time: number;

        /** SafeShell time_zone. */
        public time_zone: number;

        /** SafeShell version. */
        public version: number;

        /** SafeShell channel. */
        public channel: string;

        /** SafeShell body. */
        public body: Uint8Array;

        /** SafeShell desk_id. */
        public desk_id: number;

        /** SafeShell room_id. */
        public room_id: number;

        /**
         * Creates a new SafeShell instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SafeShell instance
         */
        public static create(properties?: core.ISafeShell): core.SafeShell;

        /**
         * Encodes the specified SafeShell message. Does not implicitly {@link core.SafeShell.verify|verify} messages.
         * @param message SafeShell message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.ISafeShell, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SafeShell message, length delimited. Does not implicitly {@link core.SafeShell.verify|verify} messages.
         * @param message SafeShell message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.ISafeShell, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SafeShell message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SafeShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.SafeShell;

        /**
         * Decodes a SafeShell message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SafeShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.SafeShell;

        /**
         * Verifies a SafeShell message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SafeShell message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SafeShell
         */
        public static fromObject(object: { [k: string]: any }): core.SafeShell;

        /**
         * Creates a plain object from a SafeShell message. Also converts values to other types if specified.
         * @param message SafeShell
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.SafeShell, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SafeShell to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserHeartBeatReq. */
    interface IUserHeartBeatReq {
    }

    /** Represents a UserHeartBeatReq. */
    class UserHeartBeatReq implements IUserHeartBeatReq {

        /**
         * Constructs a new UserHeartBeatReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IUserHeartBeatReq);

        /**
         * Creates a new UserHeartBeatReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserHeartBeatReq instance
         */
        public static create(properties?: core.IUserHeartBeatReq): core.UserHeartBeatReq;

        /**
         * Encodes the specified UserHeartBeatReq message. Does not implicitly {@link core.UserHeartBeatReq.verify|verify} messages.
         * @param message UserHeartBeatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IUserHeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserHeartBeatReq message, length delimited. Does not implicitly {@link core.UserHeartBeatReq.verify|verify} messages.
         * @param message UserHeartBeatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IUserHeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserHeartBeatReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserHeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.UserHeartBeatReq;

        /**
         * Decodes a UserHeartBeatReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserHeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.UserHeartBeatReq;

        /**
         * Verifies a UserHeartBeatReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserHeartBeatReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserHeartBeatReq
         */
        public static fromObject(object: { [k: string]: any }): core.UserHeartBeatReq;

        /**
         * Creates a plain object from a UserHeartBeatReq message. Also converts values to other types if specified.
         * @param message UserHeartBeatReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.UserHeartBeatReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserHeartBeatReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserHeartBeatRsp. */
    interface IUserHeartBeatRsp {
    }

    /** Represents a UserHeartBeatRsp. */
    class UserHeartBeatRsp implements IUserHeartBeatRsp {

        /**
         * Constructs a new UserHeartBeatRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IUserHeartBeatRsp);

        /**
         * Creates a new UserHeartBeatRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserHeartBeatRsp instance
         */
        public static create(properties?: core.IUserHeartBeatRsp): core.UserHeartBeatRsp;

        /**
         * Encodes the specified UserHeartBeatRsp message. Does not implicitly {@link core.UserHeartBeatRsp.verify|verify} messages.
         * @param message UserHeartBeatRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IUserHeartBeatRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserHeartBeatRsp message, length delimited. Does not implicitly {@link core.UserHeartBeatRsp.verify|verify} messages.
         * @param message UserHeartBeatRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IUserHeartBeatRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserHeartBeatRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserHeartBeatRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.UserHeartBeatRsp;

        /**
         * Decodes a UserHeartBeatRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserHeartBeatRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.UserHeartBeatRsp;

        /**
         * Verifies a UserHeartBeatRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserHeartBeatRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserHeartBeatRsp
         */
        public static fromObject(object: { [k: string]: any }): core.UserHeartBeatRsp;

        /**
         * Creates a plain object from a UserHeartBeatRsp message. Also converts values to other types if specified.
         * @param message UserHeartBeatRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.UserHeartBeatRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserHeartBeatRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserLoginGateWayReq. */
    interface IUserLoginGateWayReq {
    }

    /** Represents a UserLoginGateWayReq. */
    class UserLoginGateWayReq implements IUserLoginGateWayReq {

        /**
         * Constructs a new UserLoginGateWayReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IUserLoginGateWayReq);

        /**
         * Creates a new UserLoginGateWayReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLoginGateWayReq instance
         */
        public static create(properties?: core.IUserLoginGateWayReq): core.UserLoginGateWayReq;

        /**
         * Encodes the specified UserLoginGateWayReq message. Does not implicitly {@link core.UserLoginGateWayReq.verify|verify} messages.
         * @param message UserLoginGateWayReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IUserLoginGateWayReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLoginGateWayReq message, length delimited. Does not implicitly {@link core.UserLoginGateWayReq.verify|verify} messages.
         * @param message UserLoginGateWayReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IUserLoginGateWayReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLoginGateWayReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLoginGateWayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.UserLoginGateWayReq;

        /**
         * Decodes a UserLoginGateWayReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLoginGateWayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.UserLoginGateWayReq;

        /**
         * Verifies a UserLoginGateWayReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLoginGateWayReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLoginGateWayReq
         */
        public static fromObject(object: { [k: string]: any }): core.UserLoginGateWayReq;

        /**
         * Creates a plain object from a UserLoginGateWayReq message. Also converts values to other types if specified.
         * @param message UserLoginGateWayReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.UserLoginGateWayReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLoginGateWayReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserLoginGateWayRsp. */
    interface IUserLoginGateWayRsp {

        /** UserLoginGateWayRsp gold */
        gold?: (number|null);

        /** UserLoginGateWayRsp gold_deposit */
        gold_deposit?: (number|null);

        /** UserLoginGateWayRsp ticket */
        ticket?: (number|null);

        /** UserLoginGateWayRsp match_info */
        match_info?: (core.IEvtMatchNotify|null);
    }

    /** Represents a UserLoginGateWayRsp. */
    class UserLoginGateWayRsp implements IUserLoginGateWayRsp {

        /**
         * Constructs a new UserLoginGateWayRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IUserLoginGateWayRsp);

        /** UserLoginGateWayRsp gold. */
        public gold: number;

        /** UserLoginGateWayRsp gold_deposit. */
        public gold_deposit: number;

        /** UserLoginGateWayRsp ticket. */
        public ticket: number;

        /** UserLoginGateWayRsp match_info. */
        public match_info?: (core.IEvtMatchNotify|null);

        /**
         * Creates a new UserLoginGateWayRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLoginGateWayRsp instance
         */
        public static create(properties?: core.IUserLoginGateWayRsp): core.UserLoginGateWayRsp;

        /**
         * Encodes the specified UserLoginGateWayRsp message. Does not implicitly {@link core.UserLoginGateWayRsp.verify|verify} messages.
         * @param message UserLoginGateWayRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IUserLoginGateWayRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLoginGateWayRsp message, length delimited. Does not implicitly {@link core.UserLoginGateWayRsp.verify|verify} messages.
         * @param message UserLoginGateWayRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IUserLoginGateWayRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLoginGateWayRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLoginGateWayRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.UserLoginGateWayRsp;

        /**
         * Decodes a UserLoginGateWayRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLoginGateWayRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.UserLoginGateWayRsp;

        /**
         * Verifies a UserLoginGateWayRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLoginGateWayRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLoginGateWayRsp
         */
        public static fromObject(object: { [k: string]: any }): core.UserLoginGateWayRsp;

        /**
         * Creates a plain object from a UserLoginGateWayRsp message. Also converts values to other types if specified.
         * @param message UserLoginGateWayRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.UserLoginGateWayRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLoginGateWayRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MultiShell. */
    interface IMultiShell {

        /** MultiShell cmd */
        cmd?: (number|null);

        /** MultiShell body */
        body?: (Uint8Array|null);

        /** MultiShell desk_id */
        desk_id?: (number|null);

        /** MultiShell room_id */
        room_id?: (number|null);
    }

    /** Represents a MultiShell. */
    class MultiShell implements IMultiShell {

        /**
         * Constructs a new MultiShell.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IMultiShell);

        /** MultiShell cmd. */
        public cmd: number;

        /** MultiShell body. */
        public body: Uint8Array;

        /** MultiShell desk_id. */
        public desk_id: number;

        /** MultiShell room_id. */
        public room_id: number;

        /**
         * Creates a new MultiShell instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MultiShell instance
         */
        public static create(properties?: core.IMultiShell): core.MultiShell;

        /**
         * Encodes the specified MultiShell message. Does not implicitly {@link core.MultiShell.verify|verify} messages.
         * @param message MultiShell message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IMultiShell, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MultiShell message, length delimited. Does not implicitly {@link core.MultiShell.verify|verify} messages.
         * @param message MultiShell message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IMultiShell, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MultiShell message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MultiShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.MultiShell;

        /**
         * Decodes a MultiShell message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MultiShell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.MultiShell;

        /**
         * Verifies a MultiShell message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MultiShell message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MultiShell
         */
        public static fromObject(object: { [k: string]: any }): core.MultiShell;

        /**
         * Creates a plain object from a MultiShell message. Also converts values to other types if specified.
         * @param message MultiShell
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.MultiShell, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MultiShell to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtUserLoginElsewhere. */
    interface IEvtUserLoginElsewhere {
    }

    /** Represents an EvtUserLoginElsewhere. */
    class EvtUserLoginElsewhere implements IEvtUserLoginElsewhere {

        /**
         * Constructs a new EvtUserLoginElsewhere.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtUserLoginElsewhere);

        /**
         * Creates a new EvtUserLoginElsewhere instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtUserLoginElsewhere instance
         */
        public static create(properties?: core.IEvtUserLoginElsewhere): core.EvtUserLoginElsewhere;

        /**
         * Encodes the specified EvtUserLoginElsewhere message. Does not implicitly {@link core.EvtUserLoginElsewhere.verify|verify} messages.
         * @param message EvtUserLoginElsewhere message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtUserLoginElsewhere, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtUserLoginElsewhere message, length delimited. Does not implicitly {@link core.EvtUserLoginElsewhere.verify|verify} messages.
         * @param message EvtUserLoginElsewhere message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtUserLoginElsewhere, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtUserLoginElsewhere message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtUserLoginElsewhere
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtUserLoginElsewhere;

        /**
         * Decodes an EvtUserLoginElsewhere message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtUserLoginElsewhere
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtUserLoginElsewhere;

        /**
         * Verifies an EvtUserLoginElsewhere message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtUserLoginElsewhere message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtUserLoginElsewhere
         */
        public static fromObject(object: { [k: string]: any }): core.EvtUserLoginElsewhere;

        /**
         * Creates a plain object from an EvtUserLoginElsewhere message. Also converts values to other types if specified.
         * @param message EvtUserLoginElsewhere
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtUserLoginElsewhere, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtUserLoginElsewhere to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtUserPropChange. */
    interface IEvtUserPropChange {

        /** EvtUserPropChange prop_type */
        prop_type?: (number|null);

        /** EvtUserPropChange amount */
        amount?: (number|null);

        /** EvtUserPropChange value */
        value?: (number|null);

        /** EvtUserPropChange reason */
        reason?: (string|null);
    }

    /** Represents an EvtUserPropChange. */
    class EvtUserPropChange implements IEvtUserPropChange {

        /**
         * Constructs a new EvtUserPropChange.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtUserPropChange);

        /** EvtUserPropChange prop_type. */
        public prop_type: number;

        /** EvtUserPropChange amount. */
        public amount: number;

        /** EvtUserPropChange value. */
        public value: number;

        /** EvtUserPropChange reason. */
        public reason: string;

        /**
         * Creates a new EvtUserPropChange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtUserPropChange instance
         */
        public static create(properties?: core.IEvtUserPropChange): core.EvtUserPropChange;

        /**
         * Encodes the specified EvtUserPropChange message. Does not implicitly {@link core.EvtUserPropChange.verify|verify} messages.
         * @param message EvtUserPropChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtUserPropChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtUserPropChange message, length delimited. Does not implicitly {@link core.EvtUserPropChange.verify|verify} messages.
         * @param message EvtUserPropChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtUserPropChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtUserPropChange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtUserPropChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtUserPropChange;

        /**
         * Decodes an EvtUserPropChange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtUserPropChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtUserPropChange;

        /**
         * Verifies an EvtUserPropChange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtUserPropChange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtUserPropChange
         */
        public static fromObject(object: { [k: string]: any }): core.EvtUserPropChange;

        /**
         * Creates a plain object from an EvtUserPropChange message. Also converts values to other types if specified.
         * @param message EvtUserPropChange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtUserPropChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtUserPropChange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** RedPointModule enum. */
    enum RedPointModule {
        RED_POINT_ACHIEVEMENT = 0,
        RED_POINT_SEASON_RANK = 1,
        RED_POINT_SEASON_TASK = 2,
        RED_POINT_SEASON_WHEEL = 3,
        RED_POINT_SYS_MESSAGE = 4,
        RED_POINT_ANNOUNCEMENT = 5,
        RED_POINT_RECORD = 6,
        RED_POINT_NEW_PLAYER_TASK = 7
    }

    /** Properties of a RedPointUpdate. */
    interface IRedPointUpdate {

        /** RedPointUpdate module */
        module?: (core.RedPointModule|null);

        /** RedPointUpdate count */
        count?: (number|null);
    }

    /** Represents a RedPointUpdate. */
    class RedPointUpdate implements IRedPointUpdate {

        /**
         * Constructs a new RedPointUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IRedPointUpdate);

        /** RedPointUpdate module. */
        public module: core.RedPointModule;

        /** RedPointUpdate count. */
        public count: number;

        /**
         * Creates a new RedPointUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedPointUpdate instance
         */
        public static create(properties?: core.IRedPointUpdate): core.RedPointUpdate;

        /**
         * Encodes the specified RedPointUpdate message. Does not implicitly {@link core.RedPointUpdate.verify|verify} messages.
         * @param message RedPointUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IRedPointUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedPointUpdate message, length delimited. Does not implicitly {@link core.RedPointUpdate.verify|verify} messages.
         * @param message RedPointUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IRedPointUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedPointUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedPointUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.RedPointUpdate;

        /**
         * Decodes a RedPointUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedPointUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.RedPointUpdate;

        /**
         * Verifies a RedPointUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedPointUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedPointUpdate
         */
        public static fromObject(object: { [k: string]: any }): core.RedPointUpdate;

        /**
         * Creates a plain object from a RedPointUpdate message. Also converts values to other types if specified.
         * @param message RedPointUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.RedPointUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedPointUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtDropLottery. */
    interface IEvtDropLottery {

        /** EvtDropLottery lv */
        lv?: (number|null);

        /** EvtDropLottery value */
        value?: (number|null);
    }

    /** Represents an EvtDropLottery. */
    class EvtDropLottery implements IEvtDropLottery {

        /**
         * Constructs a new EvtDropLottery.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtDropLottery);

        /** EvtDropLottery lv. */
        public lv: number;

        /** EvtDropLottery value. */
        public value: number;

        /**
         * Creates a new EvtDropLottery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtDropLottery instance
         */
        public static create(properties?: core.IEvtDropLottery): core.EvtDropLottery;

        /**
         * Encodes the specified EvtDropLottery message. Does not implicitly {@link core.EvtDropLottery.verify|verify} messages.
         * @param message EvtDropLottery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtDropLottery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtDropLottery message, length delimited. Does not implicitly {@link core.EvtDropLottery.verify|verify} messages.
         * @param message EvtDropLottery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtDropLottery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtDropLottery message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtDropLottery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtDropLottery;

        /**
         * Decodes an EvtDropLottery message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtDropLottery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtDropLottery;

        /**
         * Verifies an EvtDropLottery message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtDropLottery message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtDropLottery
         */
        public static fromObject(object: { [k: string]: any }): core.EvtDropLottery;

        /**
         * Creates a plain object from an EvtDropLottery message. Also converts values to other types if specified.
         * @param message EvtDropLottery
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtDropLottery, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtDropLottery to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** PropType enum. */
    enum PropType {
        PROP_TYPE_FREE = 0,
        PROP_TYPE_TICKET = 1,
        PROP_TYPE_CASH = 2,
        PROP_TYPE_BIND_CASH = 3,
        PROP_TYPE_SEASON_SCORE = 5,
        PROP_TYPE_LOTTERY_LV1 = 6,
        PROP_TYPE_LOTTERY_LV2 = 7,
        PROP_TYPE_LOTTERY_LV3 = 8,
        PROP_TYPE_LOTTERY_LV4 = 9,
        PROP_TYPE_DIAMOND = 10
    }

    /** Properties of a CompetitionBroadcast. */
    interface ICompetitionBroadcast {

        /** CompetitionBroadcast nick */
        nick?: (string|null);

        /** CompetitionBroadcast avatar */
        avatar?: (string|null);

        /** CompetitionBroadcast game_name */
        game_name?: (string|null);

        /** CompetitionBroadcast match_name */
        match_name?: (string|null);

        /** CompetitionBroadcast time */
        time?: (number|null);

        /** CompetitionBroadcast rewards */
        rewards?: (core.CompetitionBroadcast.IGameReward[]|null);

        /** CompetitionBroadcast area_code */
        area_code?: (string|null);

        /** CompetitionBroadcast room_type */
        room_type?: (number|null);
    }

    /** Represents a CompetitionBroadcast. */
    class CompetitionBroadcast implements ICompetitionBroadcast {

        /**
         * Constructs a new CompetitionBroadcast.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.ICompetitionBroadcast);

        /** CompetitionBroadcast nick. */
        public nick: string;

        /** CompetitionBroadcast avatar. */
        public avatar: string;

        /** CompetitionBroadcast game_name. */
        public game_name: string;

        /** CompetitionBroadcast match_name. */
        public match_name: string;

        /** CompetitionBroadcast time. */
        public time: number;

        /** CompetitionBroadcast rewards. */
        public rewards: core.CompetitionBroadcast.IGameReward[];

        /** CompetitionBroadcast area_code. */
        public area_code: string;

        /** CompetitionBroadcast room_type. */
        public room_type: number;

        /**
         * Creates a new CompetitionBroadcast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompetitionBroadcast instance
         */
        public static create(properties?: core.ICompetitionBroadcast): core.CompetitionBroadcast;

        /**
         * Encodes the specified CompetitionBroadcast message. Does not implicitly {@link core.CompetitionBroadcast.verify|verify} messages.
         * @param message CompetitionBroadcast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.ICompetitionBroadcast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompetitionBroadcast message, length delimited. Does not implicitly {@link core.CompetitionBroadcast.verify|verify} messages.
         * @param message CompetitionBroadcast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.ICompetitionBroadcast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompetitionBroadcast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CompetitionBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.CompetitionBroadcast;

        /**
         * Decodes a CompetitionBroadcast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CompetitionBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.CompetitionBroadcast;

        /**
         * Verifies a CompetitionBroadcast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompetitionBroadcast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompetitionBroadcast
         */
        public static fromObject(object: { [k: string]: any }): core.CompetitionBroadcast;

        /**
         * Creates a plain object from a CompetitionBroadcast message. Also converts values to other types if specified.
         * @param message CompetitionBroadcast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.CompetitionBroadcast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompetitionBroadcast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CompetitionBroadcast {

        /** Properties of a GameReward. */
        interface IGameReward {

            /** GameReward prop_type */
            prop_type?: (core.PropType|null);

            /** GameReward amount */
            amount?: (number|null);
        }

        /** Represents a GameReward. */
        class GameReward implements IGameReward {

            /**
             * Constructs a new GameReward.
             * @param [properties] Properties to set
             */
            constructor(properties?: core.CompetitionBroadcast.IGameReward);

            /** GameReward prop_type. */
            public prop_type: core.PropType;

            /** GameReward amount. */
            public amount: number;

            /**
             * Creates a new GameReward instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GameReward instance
             */
            public static create(properties?: core.CompetitionBroadcast.IGameReward): core.CompetitionBroadcast.GameReward;

            /**
             * Encodes the specified GameReward message. Does not implicitly {@link core.CompetitionBroadcast.GameReward.verify|verify} messages.
             * @param message GameReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: core.CompetitionBroadcast.IGameReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GameReward message, length delimited. Does not implicitly {@link core.CompetitionBroadcast.GameReward.verify|verify} messages.
             * @param message GameReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: core.CompetitionBroadcast.IGameReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GameReward message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.CompetitionBroadcast.GameReward;

            /**
             * Decodes a GameReward message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.CompetitionBroadcast.GameReward;

            /**
             * Verifies a GameReward message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GameReward message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GameReward
             */
            public static fromObject(object: { [k: string]: any }): core.CompetitionBroadcast.GameReward;

            /**
             * Creates a plain object from a GameReward message. Also converts values to other types if specified.
             * @param message GameReward
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: core.CompetitionBroadcast.GameReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GameReward to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an EvtMarqueeBroadcast. */
    interface IEvtMarqueeBroadcast {

        /** EvtMarqueeBroadcast content */
        content?: (string|null);

        /** EvtMarqueeBroadcast priority */
        priority?: (number|null);
    }

    /** Represents an EvtMarqueeBroadcast. */
    class EvtMarqueeBroadcast implements IEvtMarqueeBroadcast {

        /**
         * Constructs a new EvtMarqueeBroadcast.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtMarqueeBroadcast);

        /** EvtMarqueeBroadcast content. */
        public content: string;

        /** EvtMarqueeBroadcast priority. */
        public priority: number;

        /**
         * Creates a new EvtMarqueeBroadcast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtMarqueeBroadcast instance
         */
        public static create(properties?: core.IEvtMarqueeBroadcast): core.EvtMarqueeBroadcast;

        /**
         * Encodes the specified EvtMarqueeBroadcast message. Does not implicitly {@link core.EvtMarqueeBroadcast.verify|verify} messages.
         * @param message EvtMarqueeBroadcast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtMarqueeBroadcast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtMarqueeBroadcast message, length delimited. Does not implicitly {@link core.EvtMarqueeBroadcast.verify|verify} messages.
         * @param message EvtMarqueeBroadcast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtMarqueeBroadcast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtMarqueeBroadcast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtMarqueeBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtMarqueeBroadcast;

        /**
         * Decodes an EvtMarqueeBroadcast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtMarqueeBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtMarqueeBroadcast;

        /**
         * Verifies an EvtMarqueeBroadcast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtMarqueeBroadcast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtMarqueeBroadcast
         */
        public static fromObject(object: { [k: string]: any }): core.EvtMarqueeBroadcast;

        /**
         * Creates a plain object from an EvtMarqueeBroadcast message. Also converts values to other types if specified.
         * @param message EvtMarqueeBroadcast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtMarqueeBroadcast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtMarqueeBroadcast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActivityRechargeReceive. */
    interface IActivityRechargeReceive {

        /** ActivityRechargeReceive rewards */
        rewards?: (core.ActivityRechargeReceive.IActivityRechargeReward[]|null);

        /** ActivityRechargeReceive activity_id */
        activity_id?: (number|null);

        /** ActivityRechargeReceive time */
        time?: (number|null);
    }

    /** Represents an ActivityRechargeReceive. */
    class ActivityRechargeReceive implements IActivityRechargeReceive {

        /**
         * Constructs a new ActivityRechargeReceive.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IActivityRechargeReceive);

        /** ActivityRechargeReceive rewards. */
        public rewards: core.ActivityRechargeReceive.IActivityRechargeReward[];

        /** ActivityRechargeReceive activity_id. */
        public activity_id: number;

        /** ActivityRechargeReceive time. */
        public time: number;

        /**
         * Creates a new ActivityRechargeReceive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActivityRechargeReceive instance
         */
        public static create(properties?: core.IActivityRechargeReceive): core.ActivityRechargeReceive;

        /**
         * Encodes the specified ActivityRechargeReceive message. Does not implicitly {@link core.ActivityRechargeReceive.verify|verify} messages.
         * @param message ActivityRechargeReceive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IActivityRechargeReceive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActivityRechargeReceive message, length delimited. Does not implicitly {@link core.ActivityRechargeReceive.verify|verify} messages.
         * @param message ActivityRechargeReceive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IActivityRechargeReceive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActivityRechargeReceive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActivityRechargeReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.ActivityRechargeReceive;

        /**
         * Decodes an ActivityRechargeReceive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActivityRechargeReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.ActivityRechargeReceive;

        /**
         * Verifies an ActivityRechargeReceive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActivityRechargeReceive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActivityRechargeReceive
         */
        public static fromObject(object: { [k: string]: any }): core.ActivityRechargeReceive;

        /**
         * Creates a plain object from an ActivityRechargeReceive message. Also converts values to other types if specified.
         * @param message ActivityRechargeReceive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.ActivityRechargeReceive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActivityRechargeReceive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ActivityRechargeReceive {

        /** Properties of an ActivityRechargeReward. */
        interface IActivityRechargeReward {

            /** ActivityRechargeReward prop_type */
            prop_type?: (core.PropType|null);

            /** ActivityRechargeReward amount */
            amount?: (number|null);
        }

        /** Represents an ActivityRechargeReward. */
        class ActivityRechargeReward implements IActivityRechargeReward {

            /**
             * Constructs a new ActivityRechargeReward.
             * @param [properties] Properties to set
             */
            constructor(properties?: core.ActivityRechargeReceive.IActivityRechargeReward);

            /** ActivityRechargeReward prop_type. */
            public prop_type: core.PropType;

            /** ActivityRechargeReward amount. */
            public amount: number;

            /**
             * Creates a new ActivityRechargeReward instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ActivityRechargeReward instance
             */
            public static create(properties?: core.ActivityRechargeReceive.IActivityRechargeReward): core.ActivityRechargeReceive.ActivityRechargeReward;

            /**
             * Encodes the specified ActivityRechargeReward message. Does not implicitly {@link core.ActivityRechargeReceive.ActivityRechargeReward.verify|verify} messages.
             * @param message ActivityRechargeReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: core.ActivityRechargeReceive.IActivityRechargeReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ActivityRechargeReward message, length delimited. Does not implicitly {@link core.ActivityRechargeReceive.ActivityRechargeReward.verify|verify} messages.
             * @param message ActivityRechargeReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: core.ActivityRechargeReceive.IActivityRechargeReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActivityRechargeReward message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActivityRechargeReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.ActivityRechargeReceive.ActivityRechargeReward;

            /**
             * Decodes an ActivityRechargeReward message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ActivityRechargeReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.ActivityRechargeReceive.ActivityRechargeReward;

            /**
             * Verifies an ActivityRechargeReward message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ActivityRechargeReward message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActivityRechargeReward
             */
            public static fromObject(object: { [k: string]: any }): core.ActivityRechargeReceive.ActivityRechargeReward;

            /**
             * Creates a plain object from an ActivityRechargeReward message. Also converts values to other types if specified.
             * @param message ActivityRechargeReward
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: core.ActivityRechargeReceive.ActivityRechargeReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActivityRechargeReward to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a RechargeRewardNotify. */
    interface IRechargeRewardNotify {

        /** RechargeRewardNotify prop_type */
        prop_type?: (core.PropType|null);

        /** RechargeRewardNotify amount */
        amount?: (number|null);

        /** RechargeRewardNotify time */
        time?: (number|null);
    }

    /** Represents a RechargeRewardNotify. */
    class RechargeRewardNotify implements IRechargeRewardNotify {

        /**
         * Constructs a new RechargeRewardNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IRechargeRewardNotify);

        /** RechargeRewardNotify prop_type. */
        public prop_type: core.PropType;

        /** RechargeRewardNotify amount. */
        public amount: number;

        /** RechargeRewardNotify time. */
        public time: number;

        /**
         * Creates a new RechargeRewardNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeRewardNotify instance
         */
        public static create(properties?: core.IRechargeRewardNotify): core.RechargeRewardNotify;

        /**
         * Encodes the specified RechargeRewardNotify message. Does not implicitly {@link core.RechargeRewardNotify.verify|verify} messages.
         * @param message RechargeRewardNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IRechargeRewardNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RechargeRewardNotify message, length delimited. Does not implicitly {@link core.RechargeRewardNotify.verify|verify} messages.
         * @param message RechargeRewardNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IRechargeRewardNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RechargeRewardNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeRewardNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.RechargeRewardNotify;

        /**
         * Decodes a RechargeRewardNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeRewardNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.RechargeRewardNotify;

        /**
         * Verifies a RechargeRewardNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeRewardNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeRewardNotify
         */
        public static fromObject(object: { [k: string]: any }): core.RechargeRewardNotify;

        /**
         * Creates a plain object from a RechargeRewardNotify message. Also converts values to other types if specified.
         * @param message RechargeRewardNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.RechargeRewardNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeRewardNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRankUP. */
    interface IUserRankUP {

        /** UserRankUP rank */
        rank?: (number|null);

        /** UserRankUP ratio */
        ratio?: (number|null);

        /** UserRankUP before_rank */
        before_rank?: (number|null);
    }

    /** Represents a UserRankUP. */
    class UserRankUP implements IUserRankUP {

        /**
         * Constructs a new UserRankUP.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IUserRankUP);

        /** UserRankUP rank. */
        public rank: number;

        /** UserRankUP ratio. */
        public ratio: number;

        /** UserRankUP before_rank. */
        public before_rank: number;

        /**
         * Creates a new UserRankUP instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRankUP instance
         */
        public static create(properties?: core.IUserRankUP): core.UserRankUP;

        /**
         * Encodes the specified UserRankUP message. Does not implicitly {@link core.UserRankUP.verify|verify} messages.
         * @param message UserRankUP message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IUserRankUP, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRankUP message, length delimited. Does not implicitly {@link core.UserRankUP.verify|verify} messages.
         * @param message UserRankUP message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IUserRankUP, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRankUP message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRankUP
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.UserRankUP;

        /**
         * Decodes a UserRankUP message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRankUP
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.UserRankUP;

        /**
         * Verifies a UserRankUP message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRankUP message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRankUP
         */
        public static fromObject(object: { [k: string]: any }): core.UserRankUP;

        /**
         * Creates a plain object from a UserRankUP message. Also converts values to other types if specified.
         * @param message UserRankUP
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.UserRankUP, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRankUP to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtUserAccountBand. */
    interface IEvtUserAccountBand {
    }

    /** Represents an EvtUserAccountBand. */
    class EvtUserAccountBand implements IEvtUserAccountBand {

        /**
         * Constructs a new EvtUserAccountBand.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtUserAccountBand);

        /**
         * Creates a new EvtUserAccountBand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtUserAccountBand instance
         */
        public static create(properties?: core.IEvtUserAccountBand): core.EvtUserAccountBand;

        /**
         * Encodes the specified EvtUserAccountBand message. Does not implicitly {@link core.EvtUserAccountBand.verify|verify} messages.
         * @param message EvtUserAccountBand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtUserAccountBand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtUserAccountBand message, length delimited. Does not implicitly {@link core.EvtUserAccountBand.verify|verify} messages.
         * @param message EvtUserAccountBand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtUserAccountBand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtUserAccountBand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtUserAccountBand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtUserAccountBand;

        /**
         * Decodes an EvtUserAccountBand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtUserAccountBand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtUserAccountBand;

        /**
         * Verifies an EvtUserAccountBand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtUserAccountBand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtUserAccountBand
         */
        public static fromObject(object: { [k: string]: any }): core.EvtUserAccountBand;

        /**
         * Creates a plain object from an EvtUserAccountBand message. Also converts values to other types if specified.
         * @param message EvtUserAccountBand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtUserAccountBand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtUserAccountBand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinMatchReq. */
    interface IJoinMatchReq {

        /** JoinMatchReq room_id */
        room_id?: (number|null);

        /** JoinMatchReq desk_id */
        desk_id?: (number|null);

        /** JoinMatchReq retry_num */
        retry_num?: (number|null);

        /** JoinMatchReq new_player_match */
        new_player_match?: (number|null);
    }

    /** Represents a JoinMatchReq. */
    class JoinMatchReq implements IJoinMatchReq {

        /**
         * Constructs a new JoinMatchReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IJoinMatchReq);

        /** JoinMatchReq room_id. */
        public room_id: number;

        /** JoinMatchReq desk_id. */
        public desk_id: number;

        /** JoinMatchReq retry_num. */
        public retry_num: number;

        /** JoinMatchReq new_player_match. */
        public new_player_match: number;

        /**
         * Creates a new JoinMatchReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinMatchReq instance
         */
        public static create(properties?: core.IJoinMatchReq): core.JoinMatchReq;

        /**
         * Encodes the specified JoinMatchReq message. Does not implicitly {@link core.JoinMatchReq.verify|verify} messages.
         * @param message JoinMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IJoinMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinMatchReq message, length delimited. Does not implicitly {@link core.JoinMatchReq.verify|verify} messages.
         * @param message JoinMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IJoinMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinMatchReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.JoinMatchReq;

        /**
         * Decodes a JoinMatchReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.JoinMatchReq;

        /**
         * Verifies a JoinMatchReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinMatchReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinMatchReq
         */
        public static fromObject(object: { [k: string]: any }): core.JoinMatchReq;

        /**
         * Creates a plain object from a JoinMatchReq message. Also converts values to other types if specified.
         * @param message JoinMatchReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.JoinMatchReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinMatchReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinMatchRsp. */
    interface IJoinMatchRsp {
    }

    /** Represents a JoinMatchRsp. */
    class JoinMatchRsp implements IJoinMatchRsp {

        /**
         * Constructs a new JoinMatchRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IJoinMatchRsp);

        /**
         * Creates a new JoinMatchRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinMatchRsp instance
         */
        public static create(properties?: core.IJoinMatchRsp): core.JoinMatchRsp;

        /**
         * Encodes the specified JoinMatchRsp message. Does not implicitly {@link core.JoinMatchRsp.verify|verify} messages.
         * @param message JoinMatchRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IJoinMatchRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinMatchRsp message, length delimited. Does not implicitly {@link core.JoinMatchRsp.verify|verify} messages.
         * @param message JoinMatchRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IJoinMatchRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinMatchRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.JoinMatchRsp;

        /**
         * Decodes a JoinMatchRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.JoinMatchRsp;

        /**
         * Verifies a JoinMatchRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinMatchRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinMatchRsp
         */
        public static fromObject(object: { [k: string]: any }): core.JoinMatchRsp;

        /**
         * Creates a plain object from a JoinMatchRsp message. Also converts values to other types if specified.
         * @param message JoinMatchRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.JoinMatchRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinMatchRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CancelMatchReq. */
    interface ICancelMatchReq {
    }

    /** Represents a CancelMatchReq. */
    class CancelMatchReq implements ICancelMatchReq {

        /**
         * Constructs a new CancelMatchReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.ICancelMatchReq);

        /**
         * Creates a new CancelMatchReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelMatchReq instance
         */
        public static create(properties?: core.ICancelMatchReq): core.CancelMatchReq;

        /**
         * Encodes the specified CancelMatchReq message. Does not implicitly {@link core.CancelMatchReq.verify|verify} messages.
         * @param message CancelMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.ICancelMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelMatchReq message, length delimited. Does not implicitly {@link core.CancelMatchReq.verify|verify} messages.
         * @param message CancelMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.ICancelMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelMatchReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.CancelMatchReq;

        /**
         * Decodes a CancelMatchReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.CancelMatchReq;

        /**
         * Verifies a CancelMatchReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelMatchReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelMatchReq
         */
        public static fromObject(object: { [k: string]: any }): core.CancelMatchReq;

        /**
         * Creates a plain object from a CancelMatchReq message. Also converts values to other types if specified.
         * @param message CancelMatchReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.CancelMatchReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelMatchReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CancelMatchRsp. */
    interface ICancelMatchRsp {
    }

    /** Represents a CancelMatchRsp. */
    class CancelMatchRsp implements ICancelMatchRsp {

        /**
         * Constructs a new CancelMatchRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.ICancelMatchRsp);

        /**
         * Creates a new CancelMatchRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelMatchRsp instance
         */
        public static create(properties?: core.ICancelMatchRsp): core.CancelMatchRsp;

        /**
         * Encodes the specified CancelMatchRsp message. Does not implicitly {@link core.CancelMatchRsp.verify|verify} messages.
         * @param message CancelMatchRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.ICancelMatchRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelMatchRsp message, length delimited. Does not implicitly {@link core.CancelMatchRsp.verify|verify} messages.
         * @param message CancelMatchRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.ICancelMatchRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelMatchRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.CancelMatchRsp;

        /**
         * Decodes a CancelMatchRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelMatchRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.CancelMatchRsp;

        /**
         * Verifies a CancelMatchRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelMatchRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelMatchRsp
         */
        public static fromObject(object: { [k: string]: any }): core.CancelMatchRsp;

        /**
         * Creates a plain object from a CancelMatchRsp message. Also converts values to other types if specified.
         * @param message CancelMatchRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.CancelMatchRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelMatchRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FinishGameReq. */
    interface IFinishGameReq {

        /** FinishGameReq score */
        score?: (number|null);

        /** FinishGameReq steps */
        steps?: (string|null);

        /** FinishGameReq check_code */
        check_code?: (string|null);

        /** FinishGameReq score_steps */
        score_steps?: (string|null);

        /** FinishGameReq time */
        time?: (number|null);
    }

    /** Represents a FinishGameReq. */
    class FinishGameReq implements IFinishGameReq {

        /**
         * Constructs a new FinishGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IFinishGameReq);

        /** FinishGameReq score. */
        public score: number;

        /** FinishGameReq steps. */
        public steps: string;

        /** FinishGameReq check_code. */
        public check_code: string;

        /** FinishGameReq score_steps. */
        public score_steps: string;

        /** FinishGameReq time. */
        public time: number;

        /**
         * Creates a new FinishGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FinishGameReq instance
         */
        public static create(properties?: core.IFinishGameReq): core.FinishGameReq;

        /**
         * Encodes the specified FinishGameReq message. Does not implicitly {@link core.FinishGameReq.verify|verify} messages.
         * @param message FinishGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IFinishGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FinishGameReq message, length delimited. Does not implicitly {@link core.FinishGameReq.verify|verify} messages.
         * @param message FinishGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IFinishGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FinishGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FinishGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.FinishGameReq;

        /**
         * Decodes a FinishGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FinishGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.FinishGameReq;

        /**
         * Verifies a FinishGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FinishGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FinishGameReq
         */
        public static fromObject(object: { [k: string]: any }): core.FinishGameReq;

        /**
         * Creates a plain object from a FinishGameReq message. Also converts values to other types if specified.
         * @param message FinishGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.FinishGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FinishGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FinishGameRsp. */
    interface IFinishGameRsp {
    }

    /** Represents a FinishGameRsp. */
    class FinishGameRsp implements IFinishGameRsp {

        /**
         * Constructs a new FinishGameRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IFinishGameRsp);

        /**
         * Creates a new FinishGameRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FinishGameRsp instance
         */
        public static create(properties?: core.IFinishGameRsp): core.FinishGameRsp;

        /**
         * Encodes the specified FinishGameRsp message. Does not implicitly {@link core.FinishGameRsp.verify|verify} messages.
         * @param message FinishGameRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IFinishGameRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FinishGameRsp message, length delimited. Does not implicitly {@link core.FinishGameRsp.verify|verify} messages.
         * @param message FinishGameRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IFinishGameRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FinishGameRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FinishGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.FinishGameRsp;

        /**
         * Decodes a FinishGameRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FinishGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.FinishGameRsp;

        /**
         * Verifies a FinishGameRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FinishGameRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FinishGameRsp
         */
        public static fromObject(object: { [k: string]: any }): core.FinishGameRsp;

        /**
         * Creates a plain object from a FinishGameRsp message. Also converts values to other types if specified.
         * @param message FinishGameRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.FinishGameRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FinishGameRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** MatchStatus enum. */
    enum MatchStatus {
        STATUS_MATCHING = 0,
        STATUS_FINISHED = 1
    }

    /** Properties of a MatchPlayerData. */
    interface IMatchPlayerData {

        /** MatchPlayerData uid */
        uid?: (number|null);

        /** MatchPlayerData nick */
        nick?: (string|null);

        /** MatchPlayerData avatar */
        avatar?: (string|null);

        /** MatchPlayerData area_code */
        area_code?: (string|null);
    }

    /** Represents a MatchPlayerData. */
    class MatchPlayerData implements IMatchPlayerData {

        /**
         * Constructs a new MatchPlayerData.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IMatchPlayerData);

        /** MatchPlayerData uid. */
        public uid: number;

        /** MatchPlayerData nick. */
        public nick: string;

        /** MatchPlayerData avatar. */
        public avatar: string;

        /** MatchPlayerData area_code. */
        public area_code: string;

        /**
         * Creates a new MatchPlayerData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchPlayerData instance
         */
        public static create(properties?: core.IMatchPlayerData): core.MatchPlayerData;

        /**
         * Encodes the specified MatchPlayerData message. Does not implicitly {@link core.MatchPlayerData.verify|verify} messages.
         * @param message MatchPlayerData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IMatchPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchPlayerData message, length delimited. Does not implicitly {@link core.MatchPlayerData.verify|verify} messages.
         * @param message MatchPlayerData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IMatchPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchPlayerData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchPlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.MatchPlayerData;

        /**
         * Decodes a MatchPlayerData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchPlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.MatchPlayerData;

        /**
         * Verifies a MatchPlayerData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchPlayerData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchPlayerData
         */
        public static fromObject(object: { [k: string]: any }): core.MatchPlayerData;

        /**
         * Creates a plain object from a MatchPlayerData message. Also converts values to other types if specified.
         * @param message MatchPlayerData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.MatchPlayerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchPlayerData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameMatchInfo. */
    interface IGameMatchInfo {

        /** GameMatchInfo list */
        list?: (core.IMatchPlayerData[]|null);

        /** GameMatchInfo left_time */
        left_time?: (number|null);

        /** GameMatchInfo today_best_score */
        today_best_score?: (number|null);

        /** GameMatchInfo life_best_score */
        life_best_score?: (number|null);

        /** GameMatchInfo token */
        token?: (string|null);

        /** GameMatchInfo total_score */
        total_score?: (number|null);

        /** GameMatchInfo total_round */
        total_round?: (number|null);
    }

    /** Represents a GameMatchInfo. */
    class GameMatchInfo implements IGameMatchInfo {

        /**
         * Constructs a new GameMatchInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IGameMatchInfo);

        /** GameMatchInfo list. */
        public list: core.IMatchPlayerData[];

        /** GameMatchInfo left_time. */
        public left_time: number;

        /** GameMatchInfo today_best_score. */
        public today_best_score: number;

        /** GameMatchInfo life_best_score. */
        public life_best_score: number;

        /** GameMatchInfo token. */
        public token: string;

        /** GameMatchInfo total_score. */
        public total_score: number;

        /** GameMatchInfo total_round. */
        public total_round: number;

        /**
         * Creates a new GameMatchInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameMatchInfo instance
         */
        public static create(properties?: core.IGameMatchInfo): core.GameMatchInfo;

        /**
         * Encodes the specified GameMatchInfo message. Does not implicitly {@link core.GameMatchInfo.verify|verify} messages.
         * @param message GameMatchInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IGameMatchInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameMatchInfo message, length delimited. Does not implicitly {@link core.GameMatchInfo.verify|verify} messages.
         * @param message GameMatchInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IGameMatchInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameMatchInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameMatchInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.GameMatchInfo;

        /**
         * Decodes a GameMatchInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameMatchInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.GameMatchInfo;

        /**
         * Verifies a GameMatchInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameMatchInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameMatchInfo
         */
        public static fromObject(object: { [k: string]: any }): core.GameMatchInfo;

        /**
         * Creates a plain object from a GameMatchInfo message. Also converts values to other types if specified.
         * @param message GameMatchInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.GameMatchInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameMatchInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Cards. */
    interface ICards {

        /** Cards card */
        card?: (number[]|null);
    }

    /** Represents a Cards. */
    class Cards implements ICards {

        /**
         * Constructs a new Cards.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.ICards);

        /** Cards card. */
        public card: number[];

        /**
         * Creates a new Cards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cards instance
         */
        public static create(properties?: core.ICards): core.Cards;

        /**
         * Encodes the specified Cards message. Does not implicitly {@link core.Cards.verify|verify} messages.
         * @param message Cards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.ICards, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cards message, length delimited. Does not implicitly {@link core.Cards.verify|verify} messages.
         * @param message Cards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.ICards, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.Cards;

        /**
         * Decodes a Cards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.Cards;

        /**
         * Verifies a Cards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cards message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cards
         */
        public static fromObject(object: { [k: string]: any }): core.Cards;

        /**
         * Creates a plain object from a Cards message. Also converts values to other types if specified.
         * @param message Cards
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.Cards, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cards to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CommonGameInitInfo. */
    interface ICommonGameInitInfo {

        /** CommonGameInitInfo random_seed */
        random_seed?: (number|null);

        /** CommonGameInitInfo difficulty */
        difficulty?: (number|null);

        /** CommonGameInitInfo RandAreaCards */
        RandAreaCards?: (core.ICards|null);

        /** CommonGameInitInfo PileAreaCards */
        PileAreaCards?: (core.ICards[]|null);
    }

    /** Represents a CommonGameInitInfo. */
    class CommonGameInitInfo implements ICommonGameInitInfo {

        /**
         * Constructs a new CommonGameInitInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.ICommonGameInitInfo);

        /** CommonGameInitInfo random_seed. */
        public random_seed: number;

        /** CommonGameInitInfo difficulty. */
        public difficulty: number;

        /** CommonGameInitInfo RandAreaCards. */
        public RandAreaCards?: (core.ICards|null);

        /** CommonGameInitInfo PileAreaCards. */
        public PileAreaCards: core.ICards[];

        /**
         * Creates a new CommonGameInitInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonGameInitInfo instance
         */
        public static create(properties?: core.ICommonGameInitInfo): core.CommonGameInitInfo;

        /**
         * Encodes the specified CommonGameInitInfo message. Does not implicitly {@link core.CommonGameInitInfo.verify|verify} messages.
         * @param message CommonGameInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.ICommonGameInitInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonGameInitInfo message, length delimited. Does not implicitly {@link core.CommonGameInitInfo.verify|verify} messages.
         * @param message CommonGameInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.ICommonGameInitInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonGameInitInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonGameInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.CommonGameInitInfo;

        /**
         * Decodes a CommonGameInitInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonGameInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.CommonGameInitInfo;

        /**
         * Verifies a CommonGameInitInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonGameInitInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonGameInitInfo
         */
        public static fromObject(object: { [k: string]: any }): core.CommonGameInitInfo;

        /**
         * Creates a plain object from a CommonGameInitInfo message. Also converts values to other types if specified.
         * @param message CommonGameInitInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.CommonGameInitInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonGameInitInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtMatchNotify. */
    interface IEvtMatchNotify {

        /** EvtMatchNotify match_status */
        match_status?: (core.MatchStatus|null);

        /** EvtMatchNotify uuid */
        uuid?: (string|null);

        /** EvtMatchNotify room_type */
        room_type?: (number|null);

        /** EvtMatchNotify match_info */
        match_info?: (core.IGameMatchInfo|null);

        /** EvtMatchNotify game_init */
        game_init?: (core.ICommonGameInitInfo|null);

        /** EvtMatchNotify desk_id */
        desk_id?: (number|null);

        /** EvtMatchNotify room_id */
        room_id?: (number|null);

        /** EvtMatchNotify front_match_type */
        front_match_type?: (number|null);

        /** EvtMatchNotify end_time */
        end_time?: (number|null);

        /** EvtMatchNotify match_entry_type */
        match_entry_type?: (number|null);

        /** EvtMatchNotify match_entry_value */
        match_entry_value?: (number|null);
    }

    /** Represents an EvtMatchNotify. */
    class EvtMatchNotify implements IEvtMatchNotify {

        /**
         * Constructs a new EvtMatchNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtMatchNotify);

        /** EvtMatchNotify match_status. */
        public match_status: core.MatchStatus;

        /** EvtMatchNotify uuid. */
        public uuid: string;

        /** EvtMatchNotify room_type. */
        public room_type: number;

        /** EvtMatchNotify match_info. */
        public match_info?: (core.IGameMatchInfo|null);

        /** EvtMatchNotify game_init. */
        public game_init?: (core.ICommonGameInitInfo|null);

        /** EvtMatchNotify desk_id. */
        public desk_id: number;

        /** EvtMatchNotify room_id. */
        public room_id: number;

        /** EvtMatchNotify front_match_type. */
        public front_match_type: number;

        /** EvtMatchNotify end_time. */
        public end_time: number;

        /** EvtMatchNotify match_entry_type. */
        public match_entry_type: number;

        /** EvtMatchNotify match_entry_value. */
        public match_entry_value: number;

        /**
         * Creates a new EvtMatchNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtMatchNotify instance
         */
        public static create(properties?: core.IEvtMatchNotify): core.EvtMatchNotify;

        /**
         * Encodes the specified EvtMatchNotify message. Does not implicitly {@link core.EvtMatchNotify.verify|verify} messages.
         * @param message EvtMatchNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtMatchNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtMatchNotify message, length delimited. Does not implicitly {@link core.EvtMatchNotify.verify|verify} messages.
         * @param message EvtMatchNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtMatchNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtMatchNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtMatchNotify;

        /**
         * Decodes an EvtMatchNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtMatchNotify;

        /**
         * Verifies an EvtMatchNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtMatchNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtMatchNotify
         */
        public static fromObject(object: { [k: string]: any }): core.EvtMatchNotify;

        /**
         * Creates a plain object from an EvtMatchNotify message. Also converts values to other types if specified.
         * @param message EvtMatchNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtMatchNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtMatchNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtGameSettle. */
    interface IEvtGameSettle {
    }

    /** Represents an EvtGameSettle. */
    class EvtGameSettle implements IEvtGameSettle {

        /**
         * Constructs a new EvtGameSettle.
         * @param [properties] Properties to set
         */
        constructor(properties?: core.IEvtGameSettle);

        /**
         * Creates a new EvtGameSettle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtGameSettle instance
         */
        public static create(properties?: core.IEvtGameSettle): core.EvtGameSettle;

        /**
         * Encodes the specified EvtGameSettle message. Does not implicitly {@link core.EvtGameSettle.verify|verify} messages.
         * @param message EvtGameSettle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: core.IEvtGameSettle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtGameSettle message, length delimited. Does not implicitly {@link core.EvtGameSettle.verify|verify} messages.
         * @param message EvtGameSettle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: core.IEvtGameSettle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtGameSettle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtGameSettle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): core.EvtGameSettle;

        /**
         * Decodes an EvtGameSettle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtGameSettle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): core.EvtGameSettle;

        /**
         * Verifies an EvtGameSettle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtGameSettle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtGameSettle
         */
        public static fromObject(object: { [k: string]: any }): core.EvtGameSettle;

        /**
         * Creates a plain object from an EvtGameSettle message. Also converts values to other types if specified.
         * @param message EvtGameSettle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: core.EvtGameSettle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtGameSettle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace ludo. */
export namespace ludo {

    /** Properties of a LudoCancelMatchReq. */
    interface ILudoCancelMatchReq {
    }

    /** Represents a LudoCancelMatchReq. */
    class LudoCancelMatchReq implements ILudoCancelMatchReq {

        /**
         * Constructs a new LudoCancelMatchReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoCancelMatchReq);

        /**
         * Creates a new LudoCancelMatchReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoCancelMatchReq instance
         */
        public static create(properties?: ludo.ILudoCancelMatchReq): ludo.LudoCancelMatchReq;

        /**
         * Encodes the specified LudoCancelMatchReq message. Does not implicitly {@link ludo.LudoCancelMatchReq.verify|verify} messages.
         * @param message LudoCancelMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoCancelMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoCancelMatchReq message, length delimited. Does not implicitly {@link ludo.LudoCancelMatchReq.verify|verify} messages.
         * @param message LudoCancelMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoCancelMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoCancelMatchReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoCancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoCancelMatchReq;

        /**
         * Decodes a LudoCancelMatchReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoCancelMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoCancelMatchReq;

        /**
         * Verifies a LudoCancelMatchReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoCancelMatchReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoCancelMatchReq
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoCancelMatchReq;

        /**
         * Creates a plain object from a LudoCancelMatchReq message. Also converts values to other types if specified.
         * @param message LudoCancelMatchReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoCancelMatchReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoCancelMatchReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Piece. */
    interface IPiece {

        /** Piece piece_id */
        piece_id?: (number|null);

        /** Piece score */
        score?: (number|null);

        /** Piece steps */
        steps?: (number|null);

        /** Piece x */
        x?: (number|null);

        /** Piece y */
        y?: (number|null);
    }

    /** Represents a Piece. */
    class Piece implements IPiece {

        /**
         * Constructs a new Piece.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IPiece);

        /** Piece piece_id. */
        public piece_id: number;

        /** Piece score. */
        public score: number;

        /** Piece steps. */
        public steps: number;

        /** Piece x. */
        public x: number;

        /** Piece y. */
        public y: number;

        /**
         * Creates a new Piece instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Piece instance
         */
        public static create(properties?: ludo.IPiece): ludo.Piece;

        /**
         * Encodes the specified Piece message. Does not implicitly {@link ludo.Piece.verify|verify} messages.
         * @param message Piece message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IPiece, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Piece message, length delimited. Does not implicitly {@link ludo.Piece.verify|verify} messages.
         * @param message Piece message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IPiece, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Piece message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Piece
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.Piece;

        /**
         * Decodes a Piece message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Piece
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.Piece;

        /**
         * Verifies a Piece message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Piece message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Piece
         */
        public static fromObject(object: { [k: string]: any }): ludo.Piece;

        /**
         * Creates a plain object from a Piece message. Also converts values to other types if specified.
         * @param message Piece
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.Piece, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Piece to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LudoPlayerInfo. */
    interface ILudoPlayerInfo {

        /** LudoPlayerInfo uid */
        uid?: (number|null);

        /** LudoPlayerInfo nick */
        nick?: (string|null);

        /** LudoPlayerInfo avatar */
        avatar?: (string|null);

        /** LudoPlayerInfo area_code */
        area_code?: (string|null);

        /** LudoPlayerInfo seat_id */
        seat_id?: (number|null);

        /** LudoPlayerInfo total_score */
        total_score?: (number|null);

        /** LudoPlayerInfo reroll_count */
        reroll_count?: (number|null);

        /** LudoPlayerInfo status */
        status?: (ludo.LudoPlayerStatus|null);

        /** LudoPlayerInfo pieces */
        pieces?: (ludo.IPiece[]|null);

        /** LudoPlayerInfo point */
        point?: (number|null);
    }

    /** Represents a LudoPlayerInfo. */
    class LudoPlayerInfo implements ILudoPlayerInfo {

        /**
         * Constructs a new LudoPlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoPlayerInfo);

        /** LudoPlayerInfo uid. */
        public uid: number;

        /** LudoPlayerInfo nick. */
        public nick: string;

        /** LudoPlayerInfo avatar. */
        public avatar: string;

        /** LudoPlayerInfo area_code. */
        public area_code: string;

        /** LudoPlayerInfo seat_id. */
        public seat_id: number;

        /** LudoPlayerInfo total_score. */
        public total_score: number;

        /** LudoPlayerInfo reroll_count. */
        public reroll_count: number;

        /** LudoPlayerInfo status. */
        public status: ludo.LudoPlayerStatus;

        /** LudoPlayerInfo pieces. */
        public pieces: ludo.IPiece[];

        /** LudoPlayerInfo point. */
        public point: number;

        /**
         * Creates a new LudoPlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoPlayerInfo instance
         */
        public static create(properties?: ludo.ILudoPlayerInfo): ludo.LudoPlayerInfo;

        /**
         * Encodes the specified LudoPlayerInfo message. Does not implicitly {@link ludo.LudoPlayerInfo.verify|verify} messages.
         * @param message LudoPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoPlayerInfo message, length delimited. Does not implicitly {@link ludo.LudoPlayerInfo.verify|verify} messages.
         * @param message LudoPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoPlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoPlayerInfo;

        /**
         * Decodes a LudoPlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoPlayerInfo;

        /**
         * Verifies a LudoPlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoPlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoPlayerInfo;

        /**
         * Creates a plain object from a LudoPlayerInfo message. Also converts values to other types if specified.
         * @param message LudoPlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoPlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoPlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MatchRewardInfo. */
    interface IMatchRewardInfo {

        /** MatchRewardInfo rank_low */
        rank_low?: (number|null);

        /** MatchRewardInfo rank_high */
        rank_high?: (number|null);

        /** MatchRewardInfo rewards */
        rewards?: (ludo.MatchRewardInfo.IGameReward[]|null);
    }

    /** Represents a MatchRewardInfo. */
    class MatchRewardInfo implements IMatchRewardInfo {

        /**
         * Constructs a new MatchRewardInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IMatchRewardInfo);

        /** MatchRewardInfo rank_low. */
        public rank_low: number;

        /** MatchRewardInfo rank_high. */
        public rank_high: number;

        /** MatchRewardInfo rewards. */
        public rewards: ludo.MatchRewardInfo.IGameReward[];

        /**
         * Creates a new MatchRewardInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchRewardInfo instance
         */
        public static create(properties?: ludo.IMatchRewardInfo): ludo.MatchRewardInfo;

        /**
         * Encodes the specified MatchRewardInfo message. Does not implicitly {@link ludo.MatchRewardInfo.verify|verify} messages.
         * @param message MatchRewardInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IMatchRewardInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchRewardInfo message, length delimited. Does not implicitly {@link ludo.MatchRewardInfo.verify|verify} messages.
         * @param message MatchRewardInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IMatchRewardInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchRewardInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchRewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.MatchRewardInfo;

        /**
         * Decodes a MatchRewardInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchRewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.MatchRewardInfo;

        /**
         * Verifies a MatchRewardInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchRewardInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchRewardInfo
         */
        public static fromObject(object: { [k: string]: any }): ludo.MatchRewardInfo;

        /**
         * Creates a plain object from a MatchRewardInfo message. Also converts values to other types if specified.
         * @param message MatchRewardInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.MatchRewardInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchRewardInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace MatchRewardInfo {

        /** Properties of a GameReward. */
        interface IGameReward {

            /** GameReward prop_type */
            prop_type?: (core.PropType|null);

            /** GameReward amount */
            amount?: (number|null);
        }

        /** Represents a GameReward. */
        class GameReward implements IGameReward {

            /**
             * Constructs a new GameReward.
             * @param [properties] Properties to set
             */
            constructor(properties?: ludo.MatchRewardInfo.IGameReward);

            /** GameReward prop_type. */
            public prop_type: core.PropType;

            /** GameReward amount. */
            public amount: number;

            /**
             * Creates a new GameReward instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GameReward instance
             */
            public static create(properties?: ludo.MatchRewardInfo.IGameReward): ludo.MatchRewardInfo.GameReward;

            /**
             * Encodes the specified GameReward message. Does not implicitly {@link ludo.MatchRewardInfo.GameReward.verify|verify} messages.
             * @param message GameReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: ludo.MatchRewardInfo.IGameReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GameReward message, length delimited. Does not implicitly {@link ludo.MatchRewardInfo.GameReward.verify|verify} messages.
             * @param message GameReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: ludo.MatchRewardInfo.IGameReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GameReward message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.MatchRewardInfo.GameReward;

            /**
             * Decodes a GameReward message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.MatchRewardInfo.GameReward;

            /**
             * Verifies a GameReward message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GameReward message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GameReward
             */
            public static fromObject(object: { [k: string]: any }): ludo.MatchRewardInfo.GameReward;

            /**
             * Creates a plain object from a GameReward message. Also converts values to other types if specified.
             * @param message GameReward
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: ludo.MatchRewardInfo.GameReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GameReward to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a LudoGameInfo. */
    interface ILudoGameInfo {

        /** LudoGameInfo list */
        list?: (ludo.ILudoPlayerInfo[]|null);

        /** LudoGameInfo game_over_time */
        game_over_time?: (number|null);

        /** LudoGameInfo match_reward */
        match_reward?: (ludo.IMatchRewardInfo[]|null);

        /** LudoGameInfo reroll_time */
        reroll_time?: (number|null);
    }

    /** Represents a LudoGameInfo. */
    class LudoGameInfo implements ILudoGameInfo {

        /**
         * Constructs a new LudoGameInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoGameInfo);

        /** LudoGameInfo list. */
        public list: ludo.ILudoPlayerInfo[];

        /** LudoGameInfo game_over_time. */
        public game_over_time: number;

        /** LudoGameInfo match_reward. */
        public match_reward: ludo.IMatchRewardInfo[];

        /** LudoGameInfo reroll_time. */
        public reroll_time: number;

        /**
         * Creates a new LudoGameInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoGameInfo instance
         */
        public static create(properties?: ludo.ILudoGameInfo): ludo.LudoGameInfo;

        /**
         * Encodes the specified LudoGameInfo message. Does not implicitly {@link ludo.LudoGameInfo.verify|verify} messages.
         * @param message LudoGameInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoGameInfo message, length delimited. Does not implicitly {@link ludo.LudoGameInfo.verify|verify} messages.
         * @param message LudoGameInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoGameInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoGameInfo;

        /**
         * Decodes a LudoGameInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoGameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoGameInfo;

        /**
         * Verifies a LudoGameInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoGameInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoGameInfo
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoGameInfo;

        /**
         * Creates a plain object from a LudoGameInfo message. Also converts values to other types if specified.
         * @param message LudoGameInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoGameInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoGameInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtLudoMatchNotify. */
    interface IEvtLudoMatchNotify {

        /** EvtLudoMatchNotify match_status */
        match_status?: (core.MatchStatus|null);

        /** EvtLudoMatchNotify uuid */
        uuid?: (string|null);

        /** EvtLudoMatchNotify room_type */
        room_type?: (number|null);

        /** EvtLudoMatchNotify match_info */
        match_info?: (ludo.ILudoGameInfo|null);

        /** EvtLudoMatchNotify desk_id */
        desk_id?: (number|null);

        /** EvtLudoMatchNotify room_id */
        room_id?: (number|null);
    }

    /** Represents an EvtLudoMatchNotify. */
    class EvtLudoMatchNotify implements IEvtLudoMatchNotify {

        /**
         * Constructs a new EvtLudoMatchNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IEvtLudoMatchNotify);

        /** EvtLudoMatchNotify match_status. */
        public match_status: core.MatchStatus;

        /** EvtLudoMatchNotify uuid. */
        public uuid: string;

        /** EvtLudoMatchNotify room_type. */
        public room_type: number;

        /** EvtLudoMatchNotify match_info. */
        public match_info?: (ludo.ILudoGameInfo|null);

        /** EvtLudoMatchNotify desk_id. */
        public desk_id: number;

        /** EvtLudoMatchNotify room_id. */
        public room_id: number;

        /**
         * Creates a new EvtLudoMatchNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtLudoMatchNotify instance
         */
        public static create(properties?: ludo.IEvtLudoMatchNotify): ludo.EvtLudoMatchNotify;

        /**
         * Encodes the specified EvtLudoMatchNotify message. Does not implicitly {@link ludo.EvtLudoMatchNotify.verify|verify} messages.
         * @param message EvtLudoMatchNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IEvtLudoMatchNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtLudoMatchNotify message, length delimited. Does not implicitly {@link ludo.EvtLudoMatchNotify.verify|verify} messages.
         * @param message EvtLudoMatchNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IEvtLudoMatchNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtLudoMatchNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtLudoMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.EvtLudoMatchNotify;

        /**
         * Decodes an EvtLudoMatchNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtLudoMatchNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.EvtLudoMatchNotify;

        /**
         * Verifies an EvtLudoMatchNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtLudoMatchNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtLudoMatchNotify
         */
        public static fromObject(object: { [k: string]: any }): ludo.EvtLudoMatchNotify;

        /**
         * Creates a plain object from an EvtLudoMatchNotify message. Also converts values to other types if specified.
         * @param message EvtLudoMatchNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.EvtLudoMatchNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtLudoMatchNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** LudoOperate enum. */
    enum LudoOperate {
        OPERATE_DICE = 0,
        OPERATE_CHESS = 1
    }

    /** ScoreType enum. */
    enum ScoreType {
        SCORE_TYPE_NORMAL = 0,
        SCORE_TYPE_ATTACK = 1,
        SCORE_TYPE_FINISHED = 2,
        SCORE_TYPE_ATTACK_REWARD = 3
    }

    /** Properties of an EvtUserOperateNotify. */
    interface IEvtUserOperateNotify {

        /** EvtUserOperateNotify seat_id */
        seat_id?: (number|null);

        /** EvtUserOperateNotify operate */
        operate?: (ludo.LudoOperate|null);

        /** EvtUserOperateNotify op_time */
        op_time?: (number|null);

        /** EvtUserOperateNotify player_info */
        player_info?: (ludo.ILudoPlayerInfo|null);
    }

    /** Represents an EvtUserOperateNotify. */
    class EvtUserOperateNotify implements IEvtUserOperateNotify {

        /**
         * Constructs a new EvtUserOperateNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IEvtUserOperateNotify);

        /** EvtUserOperateNotify seat_id. */
        public seat_id: number;

        /** EvtUserOperateNotify operate. */
        public operate: ludo.LudoOperate;

        /** EvtUserOperateNotify op_time. */
        public op_time: number;

        /** EvtUserOperateNotify player_info. */
        public player_info?: (ludo.ILudoPlayerInfo|null);

        /**
         * Creates a new EvtUserOperateNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtUserOperateNotify instance
         */
        public static create(properties?: ludo.IEvtUserOperateNotify): ludo.EvtUserOperateNotify;

        /**
         * Encodes the specified EvtUserOperateNotify message. Does not implicitly {@link ludo.EvtUserOperateNotify.verify|verify} messages.
         * @param message EvtUserOperateNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IEvtUserOperateNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtUserOperateNotify message, length delimited. Does not implicitly {@link ludo.EvtUserOperateNotify.verify|verify} messages.
         * @param message EvtUserOperateNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IEvtUserOperateNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtUserOperateNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtUserOperateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.EvtUserOperateNotify;

        /**
         * Decodes an EvtUserOperateNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtUserOperateNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.EvtUserOperateNotify;

        /**
         * Verifies an EvtUserOperateNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtUserOperateNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtUserOperateNotify
         */
        public static fromObject(object: { [k: string]: any }): ludo.EvtUserOperateNotify;

        /**
         * Creates a plain object from an EvtUserOperateNotify message. Also converts values to other types if specified.
         * @param message EvtUserOperateNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.EvtUserOperateNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtUserOperateNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserDiceReq. */
    interface IUserDiceReq {

        /** UserDiceReq reroll */
        reroll?: (boolean|null);

        /** UserDiceReq point */
        point?: (number|null);
    }

    /** Represents a UserDiceReq. */
    class UserDiceReq implements IUserDiceReq {

        /**
         * Constructs a new UserDiceReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IUserDiceReq);

        /** UserDiceReq reroll. */
        public reroll: boolean;

        /** UserDiceReq point. */
        public point: number;

        /**
         * Creates a new UserDiceReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserDiceReq instance
         */
        public static create(properties?: ludo.IUserDiceReq): ludo.UserDiceReq;

        /**
         * Encodes the specified UserDiceReq message. Does not implicitly {@link ludo.UserDiceReq.verify|verify} messages.
         * @param message UserDiceReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IUserDiceReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserDiceReq message, length delimited. Does not implicitly {@link ludo.UserDiceReq.verify|verify} messages.
         * @param message UserDiceReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IUserDiceReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserDiceReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserDiceReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.UserDiceReq;

        /**
         * Decodes a UserDiceReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserDiceReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.UserDiceReq;

        /**
         * Verifies a UserDiceReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserDiceReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserDiceReq
         */
        public static fromObject(object: { [k: string]: any }): ludo.UserDiceReq;

        /**
         * Creates a plain object from a UserDiceReq message. Also converts values to other types if specified.
         * @param message UserDiceReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.UserDiceReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserDiceReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserDiceRsp. */
    interface IUserDiceRsp {

        /** UserDiceRsp point */
        point?: (number|null);

        /** UserDiceRsp reroll_count */
        reroll_count?: (number|null);

        /** UserDiceRsp can_reroll */
        can_reroll?: (boolean|null);
    }

    /** Represents a UserDiceRsp. */
    class UserDiceRsp implements IUserDiceRsp {

        /**
         * Constructs a new UserDiceRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IUserDiceRsp);

        /** UserDiceRsp point. */
        public point: number;

        /** UserDiceRsp reroll_count. */
        public reroll_count: number;

        /** UserDiceRsp can_reroll. */
        public can_reroll: boolean;

        /**
         * Creates a new UserDiceRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserDiceRsp instance
         */
        public static create(properties?: ludo.IUserDiceRsp): ludo.UserDiceRsp;

        /**
         * Encodes the specified UserDiceRsp message. Does not implicitly {@link ludo.UserDiceRsp.verify|verify} messages.
         * @param message UserDiceRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IUserDiceRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserDiceRsp message, length delimited. Does not implicitly {@link ludo.UserDiceRsp.verify|verify} messages.
         * @param message UserDiceRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IUserDiceRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserDiceRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserDiceRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.UserDiceRsp;

        /**
         * Decodes a UserDiceRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserDiceRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.UserDiceRsp;

        /**
         * Verifies a UserDiceRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserDiceRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserDiceRsp
         */
        public static fromObject(object: { [k: string]: any }): ludo.UserDiceRsp;

        /**
         * Creates a plain object from a UserDiceRsp message. Also converts values to other types if specified.
         * @param message UserDiceRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.UserDiceRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserDiceRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtUserDice. */
    interface IEvtUserDice {

        /** EvtUserDice seat_id */
        seat_id?: (number|null);

        /** EvtUserDice point */
        point?: (number|null);
    }

    /** Represents an EvtUserDice. */
    class EvtUserDice implements IEvtUserDice {

        /**
         * Constructs a new EvtUserDice.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IEvtUserDice);

        /** EvtUserDice seat_id. */
        public seat_id: number;

        /** EvtUserDice point. */
        public point: number;

        /**
         * Creates a new EvtUserDice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtUserDice instance
         */
        public static create(properties?: ludo.IEvtUserDice): ludo.EvtUserDice;

        /**
         * Encodes the specified EvtUserDice message. Does not implicitly {@link ludo.EvtUserDice.verify|verify} messages.
         * @param message EvtUserDice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IEvtUserDice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtUserDice message, length delimited. Does not implicitly {@link ludo.EvtUserDice.verify|verify} messages.
         * @param message EvtUserDice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IEvtUserDice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtUserDice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtUserDice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.EvtUserDice;

        /**
         * Decodes an EvtUserDice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtUserDice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.EvtUserDice;

        /**
         * Verifies an EvtUserDice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtUserDice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtUserDice
         */
        public static fromObject(object: { [k: string]: any }): ludo.EvtUserDice;

        /**
         * Creates a plain object from an EvtUserDice message. Also converts values to other types if specified.
         * @param message EvtUserDice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.EvtUserDice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtUserDice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserChessReq. */
    interface IUserChessReq {

        /** UserChessReq piece_id */
        piece_id?: (number|null);
    }

    /** Represents a UserChessReq. */
    class UserChessReq implements IUserChessReq {

        /**
         * Constructs a new UserChessReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IUserChessReq);

        /** UserChessReq piece_id. */
        public piece_id: number;

        /**
         * Creates a new UserChessReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserChessReq instance
         */
        public static create(properties?: ludo.IUserChessReq): ludo.UserChessReq;

        /**
         * Encodes the specified UserChessReq message. Does not implicitly {@link ludo.UserChessReq.verify|verify} messages.
         * @param message UserChessReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IUserChessReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserChessReq message, length delimited. Does not implicitly {@link ludo.UserChessReq.verify|verify} messages.
         * @param message UserChessReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IUserChessReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserChessReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserChessReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.UserChessReq;

        /**
         * Decodes a UserChessReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserChessReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.UserChessReq;

        /**
         * Verifies a UserChessReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserChessReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserChessReq
         */
        public static fromObject(object: { [k: string]: any }): ludo.UserChessReq;

        /**
         * Creates a plain object from a UserChessReq message. Also converts values to other types if specified.
         * @param message UserChessReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.UserChessReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserChessReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EvtUserChess. */
    interface IEvtUserChess {

        /** EvtUserChess seat_id */
        seat_id?: (number|null);

        /** EvtUserChess match_info */
        match_info?: (ludo.ILudoGameInfo|null);

        /** EvtUserChess piece_id */
        piece_id?: (number|null);

        /** EvtUserChess point */
        point?: (number|null);

        /** EvtUserChess attacked_piece_id */
        attacked_piece_id?: (number|null);

        /** EvtUserChess add_score */
        add_score?: (ludo.EvtUserChess.IAddScore[]|null);
    }

    /** Represents an EvtUserChess. */
    class EvtUserChess implements IEvtUserChess {

        /**
         * Constructs a new EvtUserChess.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IEvtUserChess);

        /** EvtUserChess seat_id. */
        public seat_id: number;

        /** EvtUserChess match_info. */
        public match_info?: (ludo.ILudoGameInfo|null);

        /** EvtUserChess piece_id. */
        public piece_id: number;

        /** EvtUserChess point. */
        public point: number;

        /** EvtUserChess attacked_piece_id. */
        public attacked_piece_id: number;

        /** EvtUserChess add_score. */
        public add_score: ludo.EvtUserChess.IAddScore[];

        /**
         * Creates a new EvtUserChess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtUserChess instance
         */
        public static create(properties?: ludo.IEvtUserChess): ludo.EvtUserChess;

        /**
         * Encodes the specified EvtUserChess message. Does not implicitly {@link ludo.EvtUserChess.verify|verify} messages.
         * @param message EvtUserChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IEvtUserChess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtUserChess message, length delimited. Does not implicitly {@link ludo.EvtUserChess.verify|verify} messages.
         * @param message EvtUserChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IEvtUserChess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtUserChess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtUserChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.EvtUserChess;

        /**
         * Decodes an EvtUserChess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtUserChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.EvtUserChess;

        /**
         * Verifies an EvtUserChess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtUserChess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtUserChess
         */
        public static fromObject(object: { [k: string]: any }): ludo.EvtUserChess;

        /**
         * Creates a plain object from an EvtUserChess message. Also converts values to other types if specified.
         * @param message EvtUserChess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.EvtUserChess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtUserChess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace EvtUserChess {

        /** Properties of an AddScore. */
        interface IAddScore {

            /** AddScore score_type */
            score_type?: (ludo.ScoreType|null);

            /** AddScore score */
            score?: (number|null);
        }

        /** Represents an AddScore. */
        class AddScore implements IAddScore {

            /**
             * Constructs a new AddScore.
             * @param [properties] Properties to set
             */
            constructor(properties?: ludo.EvtUserChess.IAddScore);

            /** AddScore score_type. */
            public score_type: ludo.ScoreType;

            /** AddScore score. */
            public score: number;

            /**
             * Creates a new AddScore instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AddScore instance
             */
            public static create(properties?: ludo.EvtUserChess.IAddScore): ludo.EvtUserChess.AddScore;

            /**
             * Encodes the specified AddScore message. Does not implicitly {@link ludo.EvtUserChess.AddScore.verify|verify} messages.
             * @param message AddScore message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: ludo.EvtUserChess.IAddScore, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AddScore message, length delimited. Does not implicitly {@link ludo.EvtUserChess.AddScore.verify|verify} messages.
             * @param message AddScore message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: ludo.EvtUserChess.IAddScore, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AddScore message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AddScore
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.EvtUserChess.AddScore;

            /**
             * Decodes an AddScore message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AddScore
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.EvtUserChess.AddScore;

            /**
             * Verifies an AddScore message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AddScore message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AddScore
             */
            public static fromObject(object: { [k: string]: any }): ludo.EvtUserChess.AddScore;

            /**
             * Creates a plain object from an AddScore message. Also converts values to other types if specified.
             * @param message AddScore
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: ludo.EvtUserChess.AddScore, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AddScore to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a UserCancelAutoPlay. */
    interface IUserCancelAutoPlay {
    }

    /** Represents a UserCancelAutoPlay. */
    class UserCancelAutoPlay implements IUserCancelAutoPlay {

        /**
         * Constructs a new UserCancelAutoPlay.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IUserCancelAutoPlay);

        /**
         * Creates a new UserCancelAutoPlay instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserCancelAutoPlay instance
         */
        public static create(properties?: ludo.IUserCancelAutoPlay): ludo.UserCancelAutoPlay;

        /**
         * Encodes the specified UserCancelAutoPlay message. Does not implicitly {@link ludo.UserCancelAutoPlay.verify|verify} messages.
         * @param message UserCancelAutoPlay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IUserCancelAutoPlay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserCancelAutoPlay message, length delimited. Does not implicitly {@link ludo.UserCancelAutoPlay.verify|verify} messages.
         * @param message UserCancelAutoPlay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IUserCancelAutoPlay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserCancelAutoPlay message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserCancelAutoPlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.UserCancelAutoPlay;

        /**
         * Decodes a UserCancelAutoPlay message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserCancelAutoPlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.UserCancelAutoPlay;

        /**
         * Verifies a UserCancelAutoPlay message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserCancelAutoPlay message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserCancelAutoPlay
         */
        public static fromObject(object: { [k: string]: any }): ludo.UserCancelAutoPlay;

        /**
         * Creates a plain object from a UserCancelAutoPlay message. Also converts values to other types if specified.
         * @param message UserCancelAutoPlay
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.UserCancelAutoPlay, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserCancelAutoPlay to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LudoUserOverInfo. */
    interface ILudoUserOverInfo {

        /** LudoUserOverInfo uid */
        uid?: (number|null);

        /** LudoUserOverInfo nick */
        nick?: (string|null);

        /** LudoUserOverInfo avatar */
        avatar?: (string|null);

        /** LudoUserOverInfo area_code */
        area_code?: (string|null);

        /** LudoUserOverInfo seat_id */
        seat_id?: (number|null);

        /** LudoUserOverInfo total_score */
        total_score?: (number|null);

        /** LudoUserOverInfo attack */
        attack?: (number|null);

        /** LudoUserOverInfo be_attacked */
        be_attacked?: (number|null);

        /** LudoUserOverInfo win */
        win?: (boolean|null);

        /** LudoUserOverInfo rewards */
        rewards?: (ludo.LudoUserOverInfo.IGameReward[]|null);

        /** LudoUserOverInfo rank */
        rank?: (number|null);

        /** LudoUserOverInfo status */
        status?: (ludo.LudoPlayerStatus|null);
    }

    /** Represents a LudoUserOverInfo. */
    class LudoUserOverInfo implements ILudoUserOverInfo {

        /**
         * Constructs a new LudoUserOverInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoUserOverInfo);

        /** LudoUserOverInfo uid. */
        public uid: number;

        /** LudoUserOverInfo nick. */
        public nick: string;

        /** LudoUserOverInfo avatar. */
        public avatar: string;

        /** LudoUserOverInfo area_code. */
        public area_code: string;

        /** LudoUserOverInfo seat_id. */
        public seat_id: number;

        /** LudoUserOverInfo total_score. */
        public total_score: number;

        /** LudoUserOverInfo attack. */
        public attack: number;

        /** LudoUserOverInfo be_attacked. */
        public be_attacked: number;

        /** LudoUserOverInfo win. */
        public win: boolean;

        /** LudoUserOverInfo rewards. */
        public rewards: ludo.LudoUserOverInfo.IGameReward[];

        /** LudoUserOverInfo rank. */
        public rank: number;

        /** LudoUserOverInfo status. */
        public status: ludo.LudoPlayerStatus;

        /**
         * Creates a new LudoUserOverInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoUserOverInfo instance
         */
        public static create(properties?: ludo.ILudoUserOverInfo): ludo.LudoUserOverInfo;

        /**
         * Encodes the specified LudoUserOverInfo message. Does not implicitly {@link ludo.LudoUserOverInfo.verify|verify} messages.
         * @param message LudoUserOverInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoUserOverInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoUserOverInfo message, length delimited. Does not implicitly {@link ludo.LudoUserOverInfo.verify|verify} messages.
         * @param message LudoUserOverInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoUserOverInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoUserOverInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoUserOverInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoUserOverInfo;

        /**
         * Decodes a LudoUserOverInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoUserOverInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoUserOverInfo;

        /**
         * Verifies a LudoUserOverInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoUserOverInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoUserOverInfo
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoUserOverInfo;

        /**
         * Creates a plain object from a LudoUserOverInfo message. Also converts values to other types if specified.
         * @param message LudoUserOverInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoUserOverInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoUserOverInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace LudoUserOverInfo {

        /** Properties of a GameReward. */
        interface IGameReward {

            /** GameReward prop_type */
            prop_type?: (core.PropType|null);

            /** GameReward amount */
            amount?: (number|null);
        }

        /** Represents a GameReward. */
        class GameReward implements IGameReward {

            /**
             * Constructs a new GameReward.
             * @param [properties] Properties to set
             */
            constructor(properties?: ludo.LudoUserOverInfo.IGameReward);

            /** GameReward prop_type. */
            public prop_type: core.PropType;

            /** GameReward amount. */
            public amount: number;

            /**
             * Creates a new GameReward instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GameReward instance
             */
            public static create(properties?: ludo.LudoUserOverInfo.IGameReward): ludo.LudoUserOverInfo.GameReward;

            /**
             * Encodes the specified GameReward message. Does not implicitly {@link ludo.LudoUserOverInfo.GameReward.verify|verify} messages.
             * @param message GameReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: ludo.LudoUserOverInfo.IGameReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GameReward message, length delimited. Does not implicitly {@link ludo.LudoUserOverInfo.GameReward.verify|verify} messages.
             * @param message GameReward message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: ludo.LudoUserOverInfo.IGameReward, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GameReward message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoUserOverInfo.GameReward;

            /**
             * Decodes a GameReward message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GameReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoUserOverInfo.GameReward;

            /**
             * Verifies a GameReward message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GameReward message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GameReward
             */
            public static fromObject(object: { [k: string]: any }): ludo.LudoUserOverInfo.GameReward;

            /**
             * Creates a plain object from a GameReward message. Also converts values to other types if specified.
             * @param message GameReward
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: ludo.LudoUserOverInfo.GameReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GameReward to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an EvtLudoGameOver. */
    interface IEvtLudoGameOver {

        /** EvtLudoGameOver game_over_info */
        game_over_info?: (ludo.ILudoUserOverInfo[]|null);
    }

    /** Represents an EvtLudoGameOver. */
    class EvtLudoGameOver implements IEvtLudoGameOver {

        /**
         * Constructs a new EvtLudoGameOver.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.IEvtLudoGameOver);

        /** EvtLudoGameOver game_over_info. */
        public game_over_info: ludo.ILudoUserOverInfo[];

        /**
         * Creates a new EvtLudoGameOver instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvtLudoGameOver instance
         */
        public static create(properties?: ludo.IEvtLudoGameOver): ludo.EvtLudoGameOver;

        /**
         * Encodes the specified EvtLudoGameOver message. Does not implicitly {@link ludo.EvtLudoGameOver.verify|verify} messages.
         * @param message EvtLudoGameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.IEvtLudoGameOver, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EvtLudoGameOver message, length delimited. Does not implicitly {@link ludo.EvtLudoGameOver.verify|verify} messages.
         * @param message EvtLudoGameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.IEvtLudoGameOver, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EvtLudoGameOver message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EvtLudoGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.EvtLudoGameOver;

        /**
         * Decodes an EvtLudoGameOver message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EvtLudoGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.EvtLudoGameOver;

        /**
         * Verifies an EvtLudoGameOver message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EvtLudoGameOver message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EvtLudoGameOver
         */
        public static fromObject(object: { [k: string]: any }): ludo.EvtLudoGameOver;

        /**
         * Creates a plain object from an EvtLudoGameOver message. Also converts values to other types if specified.
         * @param message EvtLudoGameOver
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.EvtLudoGameOver, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EvtLudoGameOver to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LudoReconnectReq. */
    interface ILudoReconnectReq {
    }

    /** Represents a LudoReconnectReq. */
    class LudoReconnectReq implements ILudoReconnectReq {

        /**
         * Constructs a new LudoReconnectReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoReconnectReq);

        /**
         * Creates a new LudoReconnectReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoReconnectReq instance
         */
        public static create(properties?: ludo.ILudoReconnectReq): ludo.LudoReconnectReq;

        /**
         * Encodes the specified LudoReconnectReq message. Does not implicitly {@link ludo.LudoReconnectReq.verify|verify} messages.
         * @param message LudoReconnectReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoReconnectReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoReconnectReq message, length delimited. Does not implicitly {@link ludo.LudoReconnectReq.verify|verify} messages.
         * @param message LudoReconnectReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoReconnectReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoReconnectReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoReconnectReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoReconnectReq;

        /**
         * Decodes a LudoReconnectReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoReconnectReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoReconnectReq;

        /**
         * Verifies a LudoReconnectReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoReconnectReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoReconnectReq
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoReconnectReq;

        /**
         * Creates a plain object from a LudoReconnectReq message. Also converts values to other types if specified.
         * @param message LudoReconnectReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoReconnectReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoReconnectReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LudoReconnectRsp. */
    interface ILudoReconnectRsp {

        /** LudoReconnectRsp match_status */
        match_status?: (core.MatchStatus|null);

        /** LudoReconnectRsp uuid */
        uuid?: (string|null);

        /** LudoReconnectRsp room_type */
        room_type?: (number|null);

        /** LudoReconnectRsp match_info */
        match_info?: (ludo.ILudoGameInfo|null);

        /** LudoReconnectRsp desk_id */
        desk_id?: (number|null);

        /** LudoReconnectRsp room_id */
        room_id?: (number|null);

        /** LudoReconnectRsp seat_id */
        seat_id?: (number|null);

        /** LudoReconnectRsp operate */
        operate?: (ludo.LudoOperate|null);

        /** LudoReconnectRsp op_time */
        op_time?: (number|null);

        /** LudoReconnectRsp player_info */
        player_info?: (ludo.ILudoPlayerInfo|null);

        /** LudoReconnectRsp total_op_time */
        total_op_time?: (number|null);
    }

    /** Represents a LudoReconnectRsp. */
    class LudoReconnectRsp implements ILudoReconnectRsp {

        /**
         * Constructs a new LudoReconnectRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoReconnectRsp);

        /** LudoReconnectRsp match_status. */
        public match_status: core.MatchStatus;

        /** LudoReconnectRsp uuid. */
        public uuid: string;

        /** LudoReconnectRsp room_type. */
        public room_type: number;

        /** LudoReconnectRsp match_info. */
        public match_info?: (ludo.ILudoGameInfo|null);

        /** LudoReconnectRsp desk_id. */
        public desk_id: number;

        /** LudoReconnectRsp room_id. */
        public room_id: number;

        /** LudoReconnectRsp seat_id. */
        public seat_id: number;

        /** LudoReconnectRsp operate. */
        public operate: ludo.LudoOperate;

        /** LudoReconnectRsp op_time. */
        public op_time: number;

        /** LudoReconnectRsp player_info. */
        public player_info?: (ludo.ILudoPlayerInfo|null);

        /** LudoReconnectRsp total_op_time. */
        public total_op_time: number;

        /**
         * Creates a new LudoReconnectRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoReconnectRsp instance
         */
        public static create(properties?: ludo.ILudoReconnectRsp): ludo.LudoReconnectRsp;

        /**
         * Encodes the specified LudoReconnectRsp message. Does not implicitly {@link ludo.LudoReconnectRsp.verify|verify} messages.
         * @param message LudoReconnectRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoReconnectRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoReconnectRsp message, length delimited. Does not implicitly {@link ludo.LudoReconnectRsp.verify|verify} messages.
         * @param message LudoReconnectRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoReconnectRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoReconnectRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoReconnectRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoReconnectRsp;

        /**
         * Decodes a LudoReconnectRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoReconnectRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoReconnectRsp;

        /**
         * Verifies a LudoReconnectRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoReconnectRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoReconnectRsp
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoReconnectRsp;

        /**
         * Creates a plain object from a LudoReconnectRsp message. Also converts values to other types if specified.
         * @param message LudoReconnectRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoReconnectRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoReconnectRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LudoUserLeaveReq. */
    interface ILudoUserLeaveReq {
    }

    /** Represents a LudoUserLeaveReq. */
    class LudoUserLeaveReq implements ILudoUserLeaveReq {

        /**
         * Constructs a new LudoUserLeaveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ludo.ILudoUserLeaveReq);

        /**
         * Creates a new LudoUserLeaveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LudoUserLeaveReq instance
         */
        public static create(properties?: ludo.ILudoUserLeaveReq): ludo.LudoUserLeaveReq;

        /**
         * Encodes the specified LudoUserLeaveReq message. Does not implicitly {@link ludo.LudoUserLeaveReq.verify|verify} messages.
         * @param message LudoUserLeaveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ludo.ILudoUserLeaveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LudoUserLeaveReq message, length delimited. Does not implicitly {@link ludo.LudoUserLeaveReq.verify|verify} messages.
         * @param message LudoUserLeaveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ludo.ILudoUserLeaveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LudoUserLeaveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LudoUserLeaveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ludo.LudoUserLeaveReq;

        /**
         * Decodes a LudoUserLeaveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LudoUserLeaveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ludo.LudoUserLeaveReq;

        /**
         * Verifies a LudoUserLeaveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LudoUserLeaveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LudoUserLeaveReq
         */
        public static fromObject(object: { [k: string]: any }): ludo.LudoUserLeaveReq;

        /**
         * Creates a plain object from a LudoUserLeaveReq message. Also converts values to other types if specified.
         * @param message LudoUserLeaveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ludo.LudoUserLeaveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LudoUserLeaveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** LudoPlayerStatus enum. */
    enum LudoPlayerStatus {
        PLAYER_STATUS_NORMAL = 0,
        PLAYER_STATUS_AUTO = 1,
        PLAYER_STATUS_LEAVE = 2
    }
}
