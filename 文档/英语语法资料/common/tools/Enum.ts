/**
 * 枚举类
 */
export enum native_cfg {
    PAGE_LOGIN = "login",
    PAGE_LOGIN_FIND_PASS = "login_find_pass",
    PAGE_LOGIN_REGISTER_0 = "login_register_0",
    PAGE_LOGIN_REGISTER_1 = "login_register_1",
    PAGE_LOGIN_REGISTER_2 = "login_register_2",

    EVENT_COUNT_CREATEROOM = "create_room",
    EVENT_COUNT_HANDMAP = "hand_map_count",
    EVENT_COUNT_EMOJI_TYPE = "face_type",
    EVENT_COUNT_MEMOJI_TYPE = "emoji_type",
    EVENT_COUNT_ACTION_DELAY_TIME = "action_delay_time",
    EVENT_COUNT_ROOM_DELAY_TIME = "room_delay_time",
    EVENT_COUNT_INSURANCE_DELAY_TIME = "insurance_delay_time",
    EVENT_COUNT_INSURANCE = "insurance_info",

    ANDROID_PACKAGE_NAME = "org/cocos2dx/javascript/AppActivity",
    IOS_COCOAHELPER = "CocoaHelper",
}

export enum SeatStatus {
    SeatStatus_empty = 0,
    SeatStatus_waiting,
    SeatStatus_leave_a_monment,
    SeatStatus_inGame_OnAction,
    SeatStatus_inGame_actionType
}

/**
 * 座位手牌类型
 */
export enum SeatHandsCardType {
    /**
     * 无
     */
    SHCT_NONE = 0,

    /**
     * 德州(2张底牌)
     */
    SHCT_TEXAS,

    /**
     * 奥马哈(4张底牌)
     */
    SHCT_PLO,
}

export enum TipsType {
    Tips_call = 0,
    Tips_waitOrLeave,
    Tips_check,
    Tips_bet,
    Tips_mendAnte,//补盲，补ante 补straddle共用(统一显示补盲)
    Tips_straddle,//straddle
    //Tips_mendStraddle//补straddle
}
export enum BType {
    BType_Call = 0,
    BType_Bet,
    BType_Rasie
}

export enum NameTextType {
    SetNameType_setRole_Name = 0,
    SetNameType_setWinNumber,
}

export enum ActionButtonStatus {
    Control_Bet = 0,
    Control_Raise,
    Control_AllIn,
    Control_add_AllIn,
    Control_Just_Call,
    Control_Default_fallOrCheck,
    Control_Default_Call,
    Control_AllInOrFold,
    Control_Null
}

export enum SeatType {
    SeatType_GameSeat = 0,
    SeatType_ReplaySeat,
    SeatType_FavorReplaySeat
}

export enum SCENE {
    TransitionScene = "TransitionScene",            // 过渡场景
    LOADING_SCENE = "LoadingScene",                 // 加载场景
    LOGIN_SCENE = "LoginScene",                     // 登陆场景
    HALL_SCENE = "HallScene",                       // 大厅场景
    CLUB_SCENE = "ClubScene",                       // 俱乐部场景
    GAME_SCENE = "Game",                            // 游戏场景
    GAME_SCENE_AOF = "GameAof",                     // 游戏场景
    COWBOY_SCENE = "CowboyScene",                   // 德州牛仔
    VIDEOCOWBOY_SCENE = "VideoCowboyScene",         // 视频牛仔
    HUMANBOY_SCENE = "HumanboyScene",               // 百人德州
    POKERMASTER_SCENE = "PokerMasterScene",         // 扑克大师
    JACKFRUIT_SCENE = "JackfruitScene",             // 菠萝蜜
    HOTUPDATE_SCENE = "HotUpdate",                  // 热更新场景
    SPORTS_SCENE = "SportsScene",                   // 体育赛事
    TOPMATCHE_SCENE = "TopMatcheScene",             // 一起看球
    BLACKJACKPVP_SCENE = "BlackjackPVP",             // 21点

}

export enum ToastType {
    ToastTypeDefault,
    ToastTypeSuccess,
    ToastTypeError,
    ToastTypeWarning,
    ToastTypeInfo,
}

export enum ZORDER_TYPE {
    ZORDER_low = -10,
    ZORDER_0 = 0,
    ZORDER_1 = 1,
    ZORDER_2 = 2,
    ZORDER_3 = 3,
    ZORDER_4 = 4,
    ZORDER_5 = 5,
    ZORDER_6 = 6,
    ZORDER_7 = 7,
    ZORDER_SHADER = 9,
    ZORDER_TOP = 10,
    ZORDER_TT_new = 11,
    ZORDER_TT = 12,
    ZORDER_ACTIVITY = 13,
    ZORDER_LOADING = 14,
    ZORDER_LOG = 15,
}

export enum ServerButtonType {
    ServerButtonType_none = 0,
    ServerButtonType_develop,
    ServerButtonType_chun,
    ServerButtonType_ya,
    ServerButtonType_bin,
    ServerButtonType_wei,
    ServerButtonType_fei,
    ServerButtonType_tao,
    ServerButtonType_jason,
    ServerButtonType_changxing,
    ServerButtonType_max,

    ServerButtonType_ceshifu,
    ServerButtonType_zhenshifu,
    ServerButtonType_special = 200000,
    ServerButtonType_invalid = 200001,
}
/**
 * moveToAction函数动作枚举
 */
export enum action_FuncType {
    to_left = "TO_LEFT",
    to_right = "TO_RIGHT",
    enter = "ENTER",
    out = "OUT",
    dt_FAST = "FAST",
    dt_NORMAL = "NORMAL",
    dt_SLOW = "SLOW",
}

/**
 * 牌值
 */
export enum CardNum {
    CARD_2 = 0,
    CARD_3,
    CARD_4,
    CARD_5,
    CARD_6,
    CARD_7,
    CARD_8,
    CARD_9,
    CARD_10,
    CARD_J,
    CARD_Q,
    CARD_K,
    CARD_A,
    CARD_INVALID,
    CardNum_MAX
}

/**
 * 牌花色
 */
export enum CardSuit {
    CARD_DIAMOND = 0,                   // 方片
    CARD_CLUB,                          // 梅花
    CARD_HEART,                         // 红心
    CARD_SPADE,                         // 黑桃
    CardSuit_MAX
}

/**
 * 创建牌局模式
 */
export enum CreateGameMode {
    CreateGame_Mode_None = 0,           // 无
    CreateGame_Mode_Normal,             // 普通牌局
    CreateGame_Mode_MATCH,              //
    CreateGame_Mode_Short,              // 短牌局
    CreateGame_Mode_Other,              //
}

/**
 * 牌局回顾数据源类型
 */
export enum GameReviewDataType {
    /**
     * 无
     */
    EDST_NONE = 0,

    /**
     * 从战绩列表中获取数据
     */
    EDST_RECORD,

    /**
     * 从游戏房间中获取数据
     */
    EDST_GAMEROOM,

    /**
     * 从个人收藏中获取数据
     */
    EDST_COLLECTION,
}

export enum Event {
    TURN_BACK = 0,
    TURN_FACE = 1,
    DEAL_OVER = 2,
}

export enum CardBack {
    CARD_BACK_0,
    CARD_BACK_1,
    CARD_BACK_2,
    CARD_BACK_3,
    CARD_BACK_4,
    CARD_BACK_MAX
}

export enum CardFace {
    CARD_FACE_0,
    CARD_FACE_1,
    CARD_FACE_2,
    CARD_FACE_3,
    CARD_FACE_4,
    CARD_FACE_5,
    CARD_FACE_6,
    CARD_FACE_MAX
}

export enum TableBack {
    TABLE_BACK_STAR = -1, //明星桌第一张桌布
    TABLE_BACK_0,
    TABLE_BACK_1,
    TABLE_BACK_2,
    TABLE_BACK_3,
    TABLE_BACK_4,
    TABLE_BACK_5,
    TABLE_BACK_6,
    TABLE_BACK_7,
    TABLE_BACK_8,
    TABLE_BACK_MAX
}

export enum SeatDriction {
    DRICTION_LEFT_MIDDLEDOWN,       // 左边中和中下
    DRICTION_LEFT_UP,               // 左边中上
    DRICTION_RIGHT_MIDDLEDOWN,      // 右边中和中下
    DRICTION_RIGHT_UP,              // 右边中上
    DRICTION_TOP_LEFT,              // 顶部左边
    DRICTION_TOP_RIGHT,             // 顶部右边
    DRICTION_BOTTOM                 // 最下面
}

export enum ActionType {
    Enum_Action_Null = 0,
    Enum_Action_Check = 1,
    Enum_Action_Fold = 2,
    Enum_Action_Call = 3,
    Enum_Action_Bet = 4,
    Enum_Action_Raise = 5,
    Enum_Action_Allin = 6,
    Enum_Action_CallMuck = 7,
    Enum_Action_AddActionTime = 8,
    Enum_Action_SendCard_Common = 9,
    Enum_Action_Send_HoleCards = 10,
    Enum_Action_Straddle = 11,
    Enum_Action_Post = 12,
}
export enum ChatType {
    Enum_Emoji = 0,
    Enum_Voice = 1
}

/**
 * 格式化时间类型
 */
export enum eTimeType {
    Year_Month_Day = 0,		            // 年月日
    Hour_Min_Sec,                       // 时分秒
    Hour_Minute,			            // 时分
    Month_Day,                          // 月日
    Month_Day_Hour_Min_Sec,             // 月日时分秒
    Year_Month_Day_Hour_Min_Sec,        // 年月日时分秒
    Year_Month_Day_Hour_Min,            // 年月日时分
    Month_Day_Hour_Min,                 // 月日时分
    Day_Month_Hour_Min,                 // 日月时分
}

export enum BettingRoundType {
    Enum_BettingRound_Preflop = 0,
    Enum_BettingRound_Flop,
    Enum_BettingRound_Turn,
    Enum_BettingRound_River,
}

export enum ITEMType_Alliance {
    GROUP_ITEM = 0,
    POKERINFO_RESULT_ITEM,
}

export enum ResultType_PokerInfo {
    Insurance_type,
    Integral_type,
    Jackpot_type,
    Award_type
}

/**
 * 语言类型
 */
export enum LANGUAGE_TYPE {
    /**
     * 汉语
     */
    zh_CN = "zh_CN",

    /**
     * 英语
     */
    en_US = "en_US",

    /**
     * 越南语
     */
    yn_TH = "yn_TH",

    /**
     * 泰语
     */
    th_PH = "th_PH",

    /**
     * 阿拉伯语
     */
    ar_SA = "ar_SA",

    /**
     * 印地语
     */
    hi_IN = "hi_IN",
}

export enum ReportType {
    REPORT_REGEGIST = 1,
    REPORT_PAYMENT
}

export enum SeverType {
    SeverType_None = 0,
    SeverType_World,
    SeverType_Game,
    SeverType_Max,
    SeverType_RANK = 101,
}

export enum GameId {
    GameId_Dummy = 0,		// 初始值
    World = 1,				// 世界服
    Texas = 2,				// 德州
    StarSeat = 3,  			// 德州明星桌
    CowBoy = 10,			// 牛仔
    Allin = 20,				// AOF
    HumanBoy = 30,			// 百人
    ZoomTexas = 40,			// 极速游戏
    ZoomTexasMax = 49,		// 极速游戏
    VideoCowboy = 50,		// 视屏牛仔
    Bet = 60,				// 必下
    PokerMaster = 70,		// 大师
    Jackfruit = 80,			// 菠萝蜜
    Plo = 90,			    // 奥马哈
    Mtt = 900,              // mtt
    BlackJack = 1020,       // 21点
    Data = 10101,			// 数据服
}


// 客户端类型(详情参见"Config.ts"注释)
export enum ClientType {
    Dummy = 0,              // 无效的值
    Normal = 1,             // c++
    H5 = 3,                 // h5版
    OverSeas = 4,           // H5海外版app
    H5WebPage = 5,          // 私语H5网页版
    OverSeasWebPage = 6,    // h5海外缩减版网页版
    Vietnam = 7,            // h5越南版
    VietnamWebPage = 8,     // h5越南版网页版
    CowboyWeb = 9,          // 牛仔网页版(值应为9，如果要测试暂时写5)
    Thai = 10,              // 泰语版
    ThaiWebPage = 11,       // 泰语网页版
    Arab = 12,              // 阿拉伯版
    India = 13,             // 印地语版
    Mempoker = 14,          // mempoker
    PC = 15,                // PC
}

//ecdh使用密码类型
export enum ECDH_SECRET_TYPE {
    UseX = 0,
    UseY = 1,
    UseXY = 2,
}

export enum ConnectServerFailedReason {
    Null = 0,
    // 未发现服务器
    NotFound = 1,
    // 连接游戏服失败
    DialFailed = 2,
}

export enum GATE_MSGID {
    CONNECT_SERVER_FAILED_NOTIFY = 1003,
    // 服务器关闭通知
    SERVER_CLOSE_NOTIFY = 1006,
}

//提示框按钮类型枚举
export enum ButtonType {
    ONE_BUTTTON = 0,
    TWO_BUTTON,
    TWO_BUTTON_AOF,
    TWO_BUTTON_BUYAOF,
    ONE_BUTTON_LUCKTURNTABLE,
    TWO_BUTTON_FOLD_LOOK,
    TWO_BUTTON_FOLD,
    TWO_BUTTON_SILIAO_TIPS,
    TWO_BUTTON_BUYIN_TIPS,
    TWO_BUTTON_LIMIT_TIPS,         //新手限制
    TWO_BUTTON_PAUSE_GAME_TIPS,  //牌局暂停
    TWO_BUTTON_OPEN_Security_Box,
    TWO_BUTTON_MY_RED_PACKETS,      // 我的红包
    TWO_BUTTON_MTT_FRAME,
    TWO_BUTTON_NETWORK,
    TWO_BUTTON_SWITCH_TABLE,        //小游戏换桌
}

//按钮显示样式
export enum ButtonStyle {
    TWO_BUTTON = 0,  // 显示左右两个按钮
    GRAY_BUTTON,  //只显示一个灰色按钮  如“取消”
    GOLD_BUTTON,   //只显示金色的按钮  如“确定” 
}

export enum ListRecordType {
    ListRecordTypeType_Get = 0,
    ListRecordTypeType_send,
}

// 红包奖励类型
export enum RedItemType {
    gold = 0,           // 金币
    integral = 1,       // 小游戏金币
    usdt = 2,           // usdt
    goods = 3           // 实物
}

//验证码接收方式
export enum VerityGetType {
    NULL = 0,
    Message_Get = 1,   //短信验证
    AppGet_Get = 2,  //私聊APP验证
}

/**
 * 数据采集-功能枚举
 */
export enum Functionality {
    login = "login",                                            // 登录
    registration = "registration",                              // 注册
    payments = "payments",                                      // 支付
    invite = "invite",                                          // 邀请
    casino = "casino",                                          // 赌场
    poker = "poker",                                            // 扑克
}

/**
 * 数据采集-应用场景枚举
 */
export enum CurrentScreen {
    ApplicationStarted = "none",                                // 应用启动
    promotionScreen = "promotionScreen",                        // 弹出广告页
    Login = "mainLoginScreen",                                  // 登录页面
    validation = "validation",                                  // 注册验证页面
    sendCodePopup = "sendCodePopup",                            // 注册页面-确认发送Code弹出框
    account = "account",                                        // 注册账户页面
    profile = "profile",                                        // 注册用户信息页面
    visitorPopup = "visitorPopup",                              // 游客弹出界面
    deposit = "deposit",                                        // 充值
    profileSettings = "profileSettings",                        // 用户设置界面
    inviteFriends = "inviteFriends",                            // 邀请码列表
    referralLink = "referralLink",                              // 邀请码界面
    casinoGameSelection = "casinoGameSelection",                // 小游戏列表界面
    lobby = "lobby",                                            // 大厅
    room = "room",                                              // 房间
}

/**
 * 数据采集-事件枚举
 */
export enum segmentEvent {
    ApplicationStarted = "ApplicationStarted",                  // 程序启动
    ScreenOpened = "ScreenOpened",                              // 打开页面
    PromotionShown = "PromotionShown",                          // 广告, 活动弹窗显示
    Clicked = "Clicked",                                        // 点击事件
    LogInInitiated = "LogInInitiated",                          // 尝试登录
    UserLoggedIn = "UserLoggedIn",                              // 登录成功
    GetCodeInitiated = "GetCodeInitiated",                      // 统一记录获取Code方式
    InputFieldValueEntered = "InputFieldValueEntered",          // 输入完成事件
    UserRegistrationStarted = "UserRegistrationStarted",        // 注册开始事件
    UserRegistered = "UserRegistered",                          // 注册完成事件
    InviteLinkCopied = "InviteLinkCopied",                      // 用户邀请码复制
    CasinoGameSelected = "CasinoGameSelected",                  // 点击游戏事件
    LobbyGameTypeSelected = "LobbyGameTypeSelected",            // 大厅发现列表游戏选项
    LobbyStakeSelected = "LobbyStakeSelected",                  // 大厅发现列表"微小中大"选项
    LobbyFilterApplied = "LobbyFilterApplied",                  // 大厅发现列表筛选面板
    PokerRoomJoined = "PokerRoomJoined",                        // 进入德州房间
    PokerRoomJoiningDenied = "PokerRoomJoiningDenied",          // 进入德州房间失败
    PokerTableBoughtIn = "PokerTableBoughtIn",                  // 点击带入按钮
    PlayerBuyInFailed = "PlayerBuyInFailed",                    // 带入失败(本地 + 远程)
    PokerRoomLeft = "PokerRoomLeft",                            // 离开德州房间
    PokerTableSatOut = "PokerTableSatOut",                      // 离开德州座位
    PokerTableSittingDenied = "PokerTableSittingDenied",        // 德州坐下失败
}

/**
 * kyc状态
 */
export enum KYCStatus {
    /**
     * 无需KYC
     */
    NOT_KYC = "NOT_KYC",

    INIT_KYC_LOGIN = "InitLoginKYC",

    /**
     * 需要KYC
     */
    INIT_KYC_WITHDRAWAL = "NotAllowedSelfieCheckRequired",

    PENDING_WITHDRAWAL = "NotAllowedSelfieProcessing",

    /**
     * KYC过程中(需要弹出信息窗口提醒玩家正在审核, 耐心等待), KYC中间状态; 玩家完成KYC输入, Jumio验证成功, 并正在等待安全团队人工审核
    */
    PENDING = "PENDING",
}


// commonLoading 类型
export enum LOADINGTYPE {
    RECONNECT = 0,           //重新
}

/**
 * 跳转小游戏类型
 */
export enum JUNMPGAMETYPE {
    /**
     * 跳转到牛仔，百人，扑克大师
     */
    JUNMP_TO_MINI_GAME = 0,

    /**
     * 跳转到体育
     */
    JUNMP_TO_SPORT,

    /**
     * 跳转到电子小游戏列表
     */
    JUNMP_TO_ELECT_LIST,

    /**
     * 跳转到电子游戏
     */
    JUNMP_TO_ELECT_GAME,

    /**
     * 一起看球
     */
    JUNMP_TO_WATCH_MACTCHS,
}



//小游戏冷静弹框类型
export enum popSilenceType {
    calmDownNotice = 0,           // 游戏内冷静开始提示 （横屏）
    countDownHall = 1,       // 大厅倒计时
    countDownGame = 2,        //游戏内倒计时
}