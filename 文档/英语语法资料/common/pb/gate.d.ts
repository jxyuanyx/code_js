import * as $protobuf from "protobufjs";
export namespace gate_proto {

    enum CMD {
        CMD_DUMMY = 0,
        CONNECT_SERVER_FAILED_NOTIFY = 1003,
        SERVER_CLOSE_NOTIFY = 1006,
        SERVER_EXCEPT_NOTIFY = 1007
    }

    enum ConnectServerFailedReason {
        Null = 0,
        NotFound = 1,
        DialFailed = 2
    }

    enum ErrorCode {
        ErrorCode_DUMMY = 0,
        OK = 1
    }

    interface IConnectServerFailedNotify {
        ServerType?: (number|null);
        ServerId?: (number|null);
        Reason?: (gate_proto.ConnectServerFailedReason|null);
    }

    class ConnectServerFailedNotify implements IConnectServerFailedNotify {
        constructor(p?: gate_proto.IConnectServerFailedNotify);
        public ServerType: number;
        public ServerId: number;
        public Reason: gate_proto.ConnectServerFailedReason;
        public static create(properties?: gate_proto.IConnectServerFailedNotify): gate_proto.ConnectServerFailedNotify;
        public static encode(m: gate_proto.ConnectServerFailedNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: gate_proto.ConnectServerFailedNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): gate_proto.ConnectServerFailedNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gate_proto.ConnectServerFailedNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): gate_proto.ConnectServerFailedNotify;
        public static toObject(m: gate_proto.ConnectServerFailedNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IServerCloseNotify {
        ServerType?: (number|null);
        ServerId?: (number|null);
        CreateTime?: (number|null);
    }

    class ServerCloseNotify implements IServerCloseNotify {
        constructor(p?: gate_proto.IServerCloseNotify);
        public ServerType: number;
        public ServerId: number;
        public CreateTime: number;
        public static create(properties?: gate_proto.IServerCloseNotify): gate_proto.ServerCloseNotify;
        public static encode(m: gate_proto.ServerCloseNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: gate_proto.ServerCloseNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): gate_proto.ServerCloseNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gate_proto.ServerCloseNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): gate_proto.ServerCloseNotify;
        public static toObject(m: gate_proto.ServerCloseNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IServerExceptNotify {
    }

    class ServerExceptNotify implements IServerExceptNotify {
        constructor(p?: gate_proto.IServerExceptNotify);
        public static create(properties?: gate_proto.IServerExceptNotify): gate_proto.ServerExceptNotify;
        public static encode(m: gate_proto.ServerExceptNotify, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: gate_proto.ServerExceptNotify, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): gate_proto.ServerExceptNotify;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gate_proto.ServerExceptNotify;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): gate_proto.ServerExceptNotify;
        public static toObject(m: gate_proto.ServerExceptNotify, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
