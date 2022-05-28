import * as $protobuf from "protobufjs";
export namespace data_proto {

    enum CMD {
        CMD_DUMMY = 0,
        GET_DATA_REQ = 60001,
        GET_DATA_RESP = 60002,
        GET_PUBLIC_DATA_REQ = 60004,
        GET_PUBLIC_DATA_RESP = 60005,
        HOME_REQ = 60007,
        HOME_RESP = 60008,
        ROOM_RECORDS_LIST_REQ = 60011,
        ROOM_RECORDS_LIST_RESP = 60012,
        ROOM_RECORD_REQ = 60014,
        ROOM_RECORD_RESP = 60015,
        GAME_HAND_REQ = 60017,
        GAME_HAND_RESP = 60018,
        GAME_HAND_TEST_REQ = 60021,
        GAME_HAND_TEST_RESP = 60022,
        DO_FAVORITE_REQ = 60024,
        DO_FAVORITE_RESP = 60025,
        FAVORITE_HAND_REQ = 60027,
        FAVORITE_HAND_RESP = 60028,
        FAVORITE_LIST_NEW_REQ = 60031,
        FAVORITE_LIST_NEW_RESP = 60032,
        GET_BIG_BLIND_REQ = 60034,
        GET_BIG_BLIND_RESP = 60035,
        GET_HAS_BUYIN_REQ = 60037,
        GET_HAS_BUYIN_RESP = 60038,
        GET_ROUND_INFO_REQ = 60041,
        GET_ROUND_INFO_RESP = 60042,
        GET_UID_HAND_COUNT_REQ = 60044,
        GET_UID_HAND_COUNT_RESP = 60045,
        GET_HAND_COUNT_REQ = 60047,
        GET_HAND_COUNT_RESP = 60048,
        GET_PLAYER_LATEST_REQ = 60051,
        GET_PLAYER_LATEST_RESP = 60052,
        JF_GAME_HAND_REQ = 60055,
        JF_GAME_HAND_RESP = 60056,
        JF_ROOM_LIST_REQ = 60057,
        JF_ROOM_LIST_RESP = 60058,
        JF_GAME_UUIDS_REQ = 60060,
        JF_GAME_UUIDS_RESP = 60061,
        JF_DATA_REQ = 60062,
        JF_DATA_RESP = 60063,
        GAME_REVIEW_LIST_REQ = 60064,
        GAME_REVIEW_LIST_RESP = 60065,
        DELETE_FAVORITE_LIST_REQ = 60068,
        DELETE_FAVORITE_LIST_RESP = 60069,
        FORCE_SHOW_CARD_REQ = 60071,
        FORCE_SHOW_CARD_RSP = 60072,
        SEND_CARD_FUN_REQ = 60074,
        SEND_CARD_FUN_RSP = 60075,
        GAME_UUIDS_REQ = 60077,
        GAME_UUIDS_RESP = 60078,
        GAME_BIG_POT_LIST_REQ = 60080,
        GAME_BIG_POT_LIST_RSP = 60081
    }

    interface IDataMessage {
        message?: (string|null);
    }

    class DataMessage implements IDataMessage {
        constructor(p?: data_proto.IDataMessage);
        public message: string;
        public static create(properties?: data_proto.IDataMessage): data_proto.DataMessage;
        public static encode(m: data_proto.DataMessage, w?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: data_proto.DataMessage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): data_proto.DataMessage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): data_proto.DataMessage;
        public static verify(m: { [k: string]: any }): (string|null);
        public static fromObject(d: { [k: string]: any }): data_proto.DataMessage;
        public static toObject(m: data_proto.DataMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
