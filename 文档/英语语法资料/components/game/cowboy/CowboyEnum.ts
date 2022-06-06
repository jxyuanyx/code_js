export enum RoleName {
    RoleName_DUMMY = 0,
    Red = 1,    // 牛仔
    Blue = 2,   // 小牛
}

export enum RoundState {
    RoundState_DUMMY = 0,
    GAME_PENDING = 1, // 房间新建的，准备开局
    NEW_ROUND = 2,                       //新的一局
    BET = 3, // 下注
    WAIT_NEXT_ROUND = 4, // 处于结束期间并即将开启新的一局
}


// 下注区域
export enum BetZone {
    ZONE_DUMMY = 0,
    WIN = 10,  // 胜负区
    HOLE_CARD = 20, // 手牌牌型区
    FIVE_CARD = 30, // 最终牌型区
}

export enum BetZoneOption {
    BetZoneOption_DUMMY = 0,

    WIN_BEGIN = 100,
    RED_WIN = 101,                       // 牛仔胜利
    BLUE_WIN = 102,                      // 小牛胜利
    EQUAL = 103,                         // 平
    WIN_END = 199,

    HOLE_BEGIN = 200,
    //    HOLE_TONG_HUA = 201,                 // 手牌同花 ps.弃用
    //    HOLE_SHUN = 202,                     // 手牌顺子 ps.弃用
    HOLE_SAME = 203,                       // 手牌一对
    //    HOLE_TONG_HUA_SHUN = 204,            // 手牌同花顺 弃用
    HOLE_A = 205,                         // 手牌一对A
    HOLE_3_TONG_SAME_SHUN = 206,           // 手牌同花顺/顺子/同花 组合区
    HOLE_END = 299,

    FIVE_BEGIN = 300,
    FIVE_NONE_1DUI = 301,                // 高牌/一对 组合区
    FIVE_2DUI = 302,                     // 两对
    FIVE_3_SHUN_TONG_HUA = 303,          // 三条/顺子/同花 组合区
    FIVE_3_2 = 304,                      // 3条一对(葫芦)
    FIVE_KING_TONG_HUA_SHUN_4 = 305,     // 皇铜/同花顺/金刚 组合区
    FIVE_END = 399,
}

export enum MSGID {
    CMD_DUMMY = 0,
    LOGIN_GAME_REQ = 30000,
    LOGIN_GAME_RESP = 30001,

    HEART_BEAT_REQ = 30004,
    HEART_BEAT_RESP = 30005,

    JOIN_ROOM_REQ = 30007,
    JOIN_ROOM_RESP = 30008,

    GAME_LIST_REQ = 30009,              // 游戏列表请求
    GAME_LIST_RESP = 30010,

    GAME_DATA_SYN = 30011,              // 进房房间数据同步

    DEAL_NOTIFY = 30012,                // 一张底牌广播下发(玩家两张暗牌不下发，客户端自己盖住)

    BET_REQ = 30013,                    // 玩家选择区域下注
    BET_RESP = 30014,
    BET_NOTIFY = 30015,                 // 下注广播

    GAME_ROUND_END_NOTIFY = 30016,      // 一手结束通知

    LEAVE_ROOM_REQ = 30018,             // 离开房间
    LEAVE_ROOM_RESP = 30019,
    LEAVE_ROOM_NOTIFY = 30020,

    CONN_CLOSE_REQ = 30022,             // 连接断开(不是用户请求的，业务上面做的处理)

    ROOM_TREND_REQ = 30023,             //房间趋势数据请求
    ROOM_TREND_RSP = 30024,             //房间趋势数据房间回复
    ROOM_TREND_NOTICE = 30025,          //房间趋势数据回复

    START_BET_NOTIFY = 30026,           // 状态变更通知

    AUTO_BET_REQ = 30029,               // 自动重复下注请求
    AUTO_BET_RESP = 30030,
    AUTO_BET_NOTIFY = 30031,            // 重复投变更通知

    PLAYER_LIST_REQ = 30032,            // 玩家列表
    PLAYER_LIST_RESP = 30033,           //

    MERGE_AUTO_BET_NOTIFY = 30036,      // 续投时候合并下发通知消息

    KICK_NOTIFY = 30037,                // 服务器踢人

    ROOM_TREND_ROAD_REQ = 30038,             //房间趋势盘珠图数据请求
    ROOM_TREND_ROAD_RSP = 30039,             //房间趋势盘珠图数据房间回复
    ROOM_TREND_ROAD_NOTICE = 30040,          //房间趋势盘珠图数据回复

    AUTO_OPEN_ROADS_REQ = 30041,            // 自动打开路单
    AUTO_OPEN_ROADS_RSP = 30042,            //

    // 开始结算通知
    START_SETTLEMENT_NOTIFY = 30047,
}


export enum ErrorCode {
    ErrorCode_DUMMY = 0,
    OK = 1,

    ROOM_WITHOUT_YOU = 31000,           // 不在房间里面
    LOW_VERSION = 31001,                // 版本号太低
    INVALID_TOKEN = 31002,              // token不正确
    SERVER_BUSY = 31003,                // 服务器繁忙
    WITHOUT_LOGIN = 31004,              // 还没登录过
    ROOM_NOT_MATCH = 31005,             // 房间号不匹配
    ROOM_NOT_EXIST = 31006,             // 房间不存在
    BET_EXCEED_LIMIT = 31007,           // 下注额超过限制
    ROOM_PLAYER_LIMIT = 31008,          // 房间人数达到上限
    NO_BET = 31009,                     // 还不允许下注
    BET_AMOUNT_NOT_MATCH = 31010,       // 下注级别不对
    NO_MONEY = 31011,                   // 钱不够
    BET_BAD_PARAM = 31012,              // 下注参数不合法
    STOP_SERVICE = 31013,               // 停服维护中
    NOT_BET_WHEN_AUTO_BET = 31014,      // 自动投不让玩家下注
    BET_TOO_SMALL = 31015,              // 下注额小于最小下注额
    BET_COUNT_LIMIT = 31016,            // 一局最多下注次数

    AUTO_BET_LIMIT = 31017,             // 续投方案已经不能再投了
    TOO_MANY_PEOPLE = 31018,            // 服务器由于人太多挤爆了，

    BAD_REQ_PARAM = 31019,              // 消息请求参数不对

    NO_SET_ADVANCE_AUTO_BET = 31020, // 没有设置高级续投
    AUTO_BET_COUNT_LIMIT = 31021,   // 续投次数已用完

    AUTO_BET_NO_MONEY = 31022, // 续投金额不足
    AUTO_BET_EXCEED_LIMIT = 31023, // 续投金额超出限红
}

export enum Kick {
    Kick_DUMMY = 0,
    IDLE_LONG_TIME = 1,                // 太长时间没下注
    Stop_World = 2,                    // 停服踢人
}

export enum AutoBetLevel {
    Level_Normal = 0, // 普通续投
    Level_Advance = 1, // 高级续投
}