import { Deque } from "../../../common/tools/Deque";
import { HashMap, KeyValue } from "../../../common/tools/HashMap";

import pb_pokermaster = require("../../../../Script/common/pb/pokermaster");
import pokermaster_proto = pb_pokermaster.pokermaster_proto;
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../lobby/cv";
import CowboyCard from "../cowboy/CowboyCard";
import pokerMasterDataMgr from "./PokerMasterDataMgr";
import LuckTurntablesButton from "../redEnvelope/LuckTurntablesButton";

import HumanboyExchange from "../humanboy/HumanboyExchange";
import { CowboyRule } from "../cowboy/CowboyRule";
import { CowboySetting } from "../cowboy/CowboySetting";

import { PokerMasterDef } from "./PokerMasterDef";
import { MiniGameCommonDef } from "../common/define";

import { PushNoticeType, PushNoticeData } from "../../../common/prefab/PushNotice";
import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";

import { HumanboyList } from "../humanboy/HumanboyList";
import { HumanboyGuid } from "../humanboy/HumanboyGuid";
import { HumanboyMenu } from "../humanboy/HumanboyMenu";
import { HumanboyChart } from "../humanboy/HumanboyChart";
import { HumanboyToast } from "../humanboy/HumanboyToast";
import { HumanboyDialog } from "../humanboy/HumanboyDialog";
import { HumanboyBetCoin } from "../humanboy/HumanboyBetCoin";
import { HumanboyRewardTips } from "../humanboy/HumanboyRewardTips";
import { HumanboyFlutterScore } from "../humanboy/HumanboyFlutterScore";
import { HumanboyAdvancedAuto } from "../humanboy/HumanboyAdvancedAuto";
import { HumanboyAdvancedSetting } from "../humanboy/HumanboyAdvancedSetting";
import { tHumanboyCoinOptimization, tHumanboyPlayerInfo } from "../humanboy/HumanboyGameScene";

import { PokerMasterZoneData } from "./PokerMasterRoomData";
import { PokerMasterSquintCard } from "./PokerMasterSquintCard";
import { PokerMasterChart } from "./PokerMasterChart";
import { PokerMasterReview } from "./PokerMasterReview";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import HeadPointsAni from "../cowboy/HeadPointsAni";
import popSilence from "../cowboy/PopSilence";

/**
 * 下注区UI结构信息
 */
export class PokerMasterAreaInfo {
    zoneIndex: number = 0;                                                                                                      // 区域索引
    zoneOption: pokermaster_proto.BetZoneOption = pokermaster_proto.BetZoneOption.BetZoneOption_DUMMY;                          // 区域枚举
    wayOutStyle: MiniGameCommonDef.eGameboyWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE;                        // 路子显示风格
    wayOutLoseLimitCount: number = 0;																		                    // 路单描述文本"xxx局"未出上限(超过上限显示: "xxx+ 局未出", 默认0表示无上限)
    panelArea: cc.Node = null;																		                            // 区域根节点
    panelCoin: cc.Node = null;																		                            // 金币层
    panelWayOut: cc.Node = null;																		                        // 路单层
    txtSelfBetNum: cc.Label = null;																                                // 自己下注文本节点
    txtTotalBetNum: cc.Label = null;																                            // 总下注文本节点
    rtxtWayOut: cc.Label = null;																	                            // 路子描述文本
    txtOdds: cc.Label = null;																		                            // 赔率
    coinQueue: Deque<HumanboyBetCoin> = new Deque();																            // 复用金币双向队列
    wayOutImgArray: cc.Sprite[] = [];																	                        // 路子精灵数组
    wayOutImgSrcPosArray: cc.Vec2[] = [];																                        // 路子精灵原始位置数组
};

/**
 * "扑克大师"主逻辑类
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class PokerMasterScene extends cc.Component {
    @property(cc.Prefab) prefab_cb_win_player_light: cc.Prefab = null;                                                          // 牛仔玩家赢亮框 预制件
    @property(cc.Prefab) prefab_cb_exchange: cc.Prefab = null;
    @property(cc.Prefab) prefab_cb_rule: cc.Prefab = null;                                                                      // 规则面板 预制件
    @property(cc.Prefab) prefab_cb_soundSetting: cc.Prefab = null;                                                              // 设置面板 预制件
    @property(cc.Prefab) prefab_cb_exit: cc.Prefab = null;                                                                      // 退出面板 预制件

    @property(cc.Prefab) prefab_cb_round_start: cc.Prefab = null;                                                               // 开局动画 预制件
    @property(cc.Prefab) prefab_pm_show_odds: cc.Prefab = null;                                                                 // 显示赔率动画 预制件
    @property(cc.Prefab) prefab_pm_squid_card: cc.Prefab = null;                                                                // 眯牌面板 预制件
    @property(cc.Prefab) prefab_pm_chart: cc.Prefab = null;                                                                     // 路单面板 预制件
    @property(cc.Prefab) prefab_pm_review: cc.Prefab = null;                                                                    // 投注回顾面板

    @property(cc.Prefab) prefab_hb_win_flag: cc.Prefab = null;                                                                  // win 旗子动画 预制件
    @property(cc.Prefab) special_card_type_prefab: cc.Prefab = null;                                                                  // 金刚等牌型动画 预制件
    @property(cc.Prefab) prefab_hb_start_bets: cc.Prefab = null;                                                                // 开始下注动画 预制件
    @property(cc.Prefab) prefab_hb_end_bets: cc.Prefab = null;                                                                  // 停止下注动画 预制件
    @property(cc.Prefab) prefab_shark_win: cc.Prefab = null;
    @property(cc.Prefab) prefab_shark_lose: cc.Prefab = null;
    @property(cc.Prefab) prefab_dashi_win: cc.Prefab = null;
    @property(cc.Prefab) prefab_dashi_lose: cc.Prefab = null;
    @property(cc.Prefab) prefab_hb_way_out: cc.Prefab = null;                                                                   // 路单闪光动画 预制件

    @property(cc.Prefab) prefab_hb_flutterScore: cc.Prefab = null;                                                              // 飘分 预制件
    @property(cc.Prefab) prefab_hb_betCoin: cc.Prefab = null;                                                                   // 下注金币 预制件
    @property(cc.Prefab) prefab_hb_toast: cc.Prefab = null;                                                                     // 游戏提示 预制件
    @property(cc.Prefab) prefab_hb_guid: cc.Prefab = null;                                                                      // 新手引导 预制件
    @property(cc.Prefab) prefab_hb_menu: cc.Prefab = null;                                                                      // 游戏菜单 预制件
    @property(cc.Prefab) prefab_hb_advancedSetting: cc.Prefab = null;                                                           // 高级设置 预制件
    @property(cc.Prefab) prefab_hb_advancedAuto: cc.Prefab = null;                                                              // 高级续投 预制件
    @property(cc.Prefab) prefab_hb_dialog: cc.Prefab = null;                                                                    // 对话框 预制件

    @property(cc.Prefab) prefab_hb_playerList: cc.Prefab = null;                                                                // 玩家列表 预制件
    @property(cc.Prefab) prefab_hb_rewardTips: cc.Prefab = null;                                                                // 通用奖励提示 预制件
    @property(cc.Prefab) prefab_luckButton: cc.Prefab = null;                                                                   // 红包节 预制件

    @property(cc.SpriteAtlas) special_card_type_PLIST: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) en_animation_PLIST: cc.SpriteAtlas = null;
    @property(cc.Prefab) points_ani_prefab: cc.Prefab = null;
    @property(cc.Prefab) popSilencePre: cc.Prefab = null;   //冷静预制件

    points_node: cc.Node = null;

    static g_fullScreenOffset: cc.Vec2 = cc.Vec2.ZERO;                                                                          // 全面屏偏移量
    static gClassName: string = "PokerMasterScene";                                                                             // 类名

    private _msInterval: number = 1;                                                                                            // 定时器间隔(单位: 秒)
    private _msNowTime: number = 0;								                                                                // 当前时间
    private _msLastTime: number = 0;							                                                                // 上次时间
    private _nLeftTime: number = 0;								                                                                // 剩余时间

    private _panel_game: cc.Node = null;												                                        // 游戏面板
    private _panel_card: cc.Node = null;                                                                                        // 牌面板
    private _panel_top: cc.Node = null;												                                            // 顶栏面板
    private _panel_bottom: cc.Node = null;											                                            // 底栏面板
    private _panel_self: cc.Node = null;																		                // 玩家信息面板
    private _panel_bet_btn: cc.Node = null;											                                            // 下注按钮面板
    private _vBottomBetBtns: MiniGameCommonDef.tGameNodeScale[] = [];                                                           // 底部下注按钮数组, 用于适配位置(k - 节点, v - 原缩放比例)

    private _vTopWayOutImg: cc.Sprite[] = [];                                                                                   // "顶栏"路单精灵
    private _vTopWayOutImgSrcPos: cc.Vec2[] = [];																                // "顶栏"路单精灵 原始位置数组

    private _vLeftHandCards: CowboyCard[] = [];                                                                                 // 左手牌
    private _vRightHandCards: CowboyCard[] = [];                                                                                // 右手牌
    private _vPublicHoleCards: CowboyCard[] = [];                                                                               // 公共牌

    private _vLeftHandCardsSrcPos: cc.Vec2[] = [];                                                                              // 左手牌 原始位置
    private _vRightHandCardsSrcPos: cc.Vec2[] = [];                                                                             // 右手牌 原始位置
    private _vPublicHoleCardsSrcPos: cc.Vec2[] = [];                                                                            // 公共牌 原始位置

    private _img_left_card_type: cc.Sprite = null;                                                                              // 左边牌型
    private _img_right_card_type: cc.Sprite = null;                                                                             // 右边牌型
    private _img_left_card_type_bg: cc.Sprite = null;                                                                           // 左边牌型背景
    private _img_right_card_type_bg: cc.Sprite = null;                                                                          // 右边牌型背景

    private _squintCard: PokerMasterSquintCard = null;                                                                          // 眯牌牌信息

    private _txt_self_name: cc.Label = null;														                            // 个人昵称
    private _txt_self_gold: cc.Label = null;														                            // 个人金币
    private _img_self_gold: cc.Sprite = null;														                            // 个人金币精灵(用于飞金币的起始位置)
    private _img_self_head: cc.Sprite = null;													                                // 个人头像

    private _img_bet_clock: cc.Node = null;														                                // 下注计时器精灵
    private _img_bet_clock_src_pos: cc.Vec2 = cc.Vec2.ZERO;												                        // 下注计时器原始位置

    private _img_count_down: cc.Node = null;														                            // 等待下一局倒计时精灵
    private _img_count_down_src_pos: cc.Vec2 = cc.Vec2.ZERO;														            // 等待下一局倒计时精灵 原始位置

    private _btn_review: cc.Node = null;															                            // 牌局路单记录按钮
    private _btn_playerList: cc.Node = null;														                            // 玩家列表按钮
    private _btn_betAuto: cc.Button = null;															                            // 续投按钮
    private _btn_betClean: cc.Button = null;															                        // 清屏按钮(清理下注区域金币)
    private _btn_redpacket_festival: cc.Node = null;                                                                            // 红包节按钮
    private _btn_redpacket_festival_layer: cc.Node = null;                                                                      // 红包节按钮提示层
    private _luckButton: LuckTurntablesButton = null;                                                                           // 红包节实例

    private _vAreasInfo: PokerMasterAreaInfo[] = [];													                        // 当前下注区域
    private _vOtherPlayerInfo: tHumanboyPlayerInfo[] = [];											                            // 其他玩家列表
    private _vBetButtons: HumanboyBetCoin[] = [];														                        // 下注按钮数组
    private _mapSounds: HashMap<string, boolean> = new HashMap();						                                        // 声音容器(名称 - id)

    private _nodeAnim: cc.Node = null;																                            // 动态动画根节点
    private _nodeCoinPool: cc.Node = null;															                            // 动态金币池节点
    private _llCoinPoolZOrderCount: number = 0;														                            // 动态金币池节点深度计数
    private _mapCoinQueue: HashMap<pokermaster_proto.BetZoneOption, Deque<HumanboyBetCoin>> = new HashMap();                    // 金币区域(从区域结构中剥离, 因为不同桌布都公用一套金币队列)
    private _vCoinOptimizationDeque: Deque<tHumanboyCoinOptimization> = new Deque();                                            // 金币最优队列

    private _mapAnimWinFlags: HashMap<pokermaster_proto.BetZoneOption, cc.Animation> = new HashMap();                           // win 动画容器
    private _mapAnimShowOdds: HashMap<pokermaster_proto.BetZoneOption, cc.Animation> = new HashMap();                           // 赔率 动画容器
    private _animRoundStart: cc.Animation = null;													                            // 开局动画
    private _animStartBet: cc.Animation = null;													                                // 开始下注动画
    private _animStopBet: cc.Animation = null;														                            // 停止下注动画
    private _animWayoutLight: cc.Animation = null;													                            // 路单闪光动画

    private _animDashiWin: cc.Animation = null;
    private _animDashiLose: cc.Animation = null;
    private _animSharkWin: cc.Animation = null;
    private _animSharkLose: cc.Animation = null;
    private _nBetBtnNum: Readonly<number> = 5;														                            // 下注按钮数量
    private _fBetBtnSrcScaleRate: Readonly<number> = 0.75;											                            // 下注筹码原始缩放比例
    private _fBetBtnTarScaleRate: Readonly<number> = 1.0;											                            // 下注筹码目标缩放比例
    private _fFlyCoinScaleRate: Readonly<number> = 0.5;																            // 创建的金币缩放比例

    private _nCurBetBtnIndex: number = -1;															                            // 当前下注按钮索引
    private _nAreaCoinLimitCountMin: number = 100;													                            // 单个区域金币精灵上限最小数量
    private _nAreaCoinLimitCountMax: Readonly<number> = 200;										                            // 单个区域金币精灵上限最大数量

    private _bWaitting: boolean = false;															                            // 是否正在等待开局倒计时
    private _nWaittingTime: number = 0;																                            // 等待时间

    private _fActDelayed_RoundStart: Readonly<number> = 0;											                            // 开局动画 延时时间
    private _fActExecute_RoundStart: Readonly<number> = 1.3;										                            // 开局动画 执行时间

    private _fActDelayed_SendCard: Readonly<number> = 0.0;											                            // 发牌动画 延时时间
    private _fActExecute_SendCard: Readonly<number> = 1.5;											                            // 发牌动画 执行时间

    private _fActDelayed_ShowHandCard: Readonly<number> = 0.0;											                        // 开手牌动画 延时时间
    private _fActExecute_ShowHandCard: Readonly<number> = 1.2;											                        // 开手牌动画 执行时间

    private _fActDelayed_ShowTurnCard: Readonly<number> = 0.0;											                        // 开turn牌动画 延时时间
    private _fActExecute_ShowTurnCard: Readonly<number> = 0.5;											                        // 开turn牌动画 执行时间

    private _fActDelayed_ShowRiverCard: Readonly<number> = 0.5;											                        // 开river牌动画 延时时间
    private _fActExecute_ShowRiverCard: Readonly<number> = 0.5;											                        // 开river牌动画 执行时间

    private _fActDelayed_ShowOdds: Readonly<number> = 0;											                            // 显示赔率动画 延时时间
    private _fActExecute_ShowOdds: Readonly<number> = 1.0;										                                // 显示赔率动画 执行时间

    private _fActDelayed_StartBet: Readonly<number> = 0.0;										                                // 开始下注动画 延时时间
    private _fActExecute_Startbet: Readonly<number> = 1.0;										                                // 开始下注动画 执行时间

    private _fActExecute_BetClock: Readonly<number> = 0.5;											                            // 下注闹钟动画 执行时间
    private _fActExecute_TableTrans: Readonly<number> = 0.5;                                                                    // 桌布翻转动画 执行时间

    private _fActDelayed_StopBet: Readonly<number> = 0.5;											                            // 停止下注动画 延时时间
    private _fActExecute_StopBet: Readonly<number> = 1.0;											                            // 停止下注动画 执行时间

    private _fActDelayed_SkipInsure: Readonly<number> = 0.5;                                                                    // 跳过保险投注提示动画 延时时间
    private _fActExecute_SkipInsure: Readonly<number> = 2.0;                                                                    // 跳过保险投注提示动画 执行时间

    private _fActDelayed_Squint_Card: Readonly<number> = 0.5;                                                                   // 眯牌动画 延时时间
    private _fActExecute_Squint_Card: Readonly<number> = 6;                                                                     // 眯牌动画 执行时间

    private _fActDelayed_ShowCardType: Readonly<number> = 0;                                                                    // 显示牌型动画 延时时间
    private _fActExecute_ShowCardType: Readonly<number> = 0.5;                                                                  // 显示牌型动画 执行时间

    private _fActDelayed_ShowWinFlag: Readonly<number> = 0.5;										                            // 显示win动画 延时时间
    private _fActExecute_WinFlag: Readonly<number> = 2.5;											                            // win动画 执行时间
    private _fActDelayed_HideWinFlag: Readonly<number> = 1.0;										                            // 隐藏win动画 延时时间

    private _fActExecute_WayOut: Readonly<number> = 1.0;											                            // 显示路子动画 执行时间
    private _fActExecute_WayOutLight: Readonly<number> = 1.2;										                            // 显示路子动画闪光 执行时间

    private _fActDelayed_FlyWinCoin: Readonly<number> = 0.5;										                            // win飞金币 延时时间
    private _fActExecute_FlyWinCoin: Readonly<number> = 1.5;										                            // win飞金币 执行时间
    private _fActExecute_FlyWinCoinEnd: Readonly<number> = 2.0;										                            // win飞金币 总时间
    private _miPai_time: Readonly<number> = 6.0; //眯牌总时长

    private _special_type_time: Readonly<number> = 8.0; //特殊牌型时间

    private _bTrueFullScreen: boolean = false;														                            // 是否是 iphonex 版的真实的全面屏
    private _bOpenNarrowAdapter: Readonly<boolean> = true;											                            // 窄屏适配开关

    private _eAutoBtnStyle: MiniGameCommonDef.eGameboyAutoBtnStyle = MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NONE;     // 续投按钮样式

    private _humanboyGuid: cc.Node = null;																                        // 路单引导 实例
    private _humanboyMenu: HumanboyMenu = null;																                    // 游戏菜单 实例
    private _humanboyAdvancedSetting: HumanboyAdvancedSetting = null;										                    // 高级设置 实例
    private _humanboyAdvancedAuto: HumanboyAdvancedAuto = null;												                    // 高级续投 实例

    private _pokerMasterChart: PokerMasterChart = null;															                // 走势图 实例
    private _pokerMasterReview: PokerMasterReview = null;															            // 投注回顾 实例

    private _humanboyPlayerList: HumanboyList = null;                                                                           // 玩家列表 实例
    private _humanboyExchange: HumanboyExchange = null;
    private _humanboyRule: CowboyRule = null;																		            // 规则 实例
    private _humanboySetting: CowboySetting = null;															                    // 设置 实例
    private _humanboyRewardTips: HumanboyRewardTips = null;                                                                     // 通用奖励提示 实例

    private _atlas_cb_language: cc.SpriteAtlas = null;                                                                          // 牛仔语言图集
    private _atlas_hb_language: cc.SpriteAtlas = null;                                                                          // 百人语言图集
    private _atlas_hb_humanboy: cc.SpriteAtlas = null;                                                                          // 百人其它图集
    private _atlas_pm_pokermaster: cc.SpriteAtlas = null;                                                                       // 扑克大师图集

    private _strCardFacePath: Readonly<string> = "zh_CN/game/pokermaster/card_type_0/";									        // 牌正面资源路径
    private _strCardBackPath: Readonly<string> = "zh_CN/game/pokermaster/card_type_0/";								            // 牌背面资源路径
    s_special_card_type: string = "zh_CN/game/cowboy/audio/special_card_type_big";	                                            // 特殊牌型音效

    private silenceMusic: string = "zh_CN/game/dzpoker/audio/silence2";

    private flyCoinToPlayerArr: cc.Node[] = [];
    private isIphoneX_area: boolean = false;
    private trend_anim: cc.AnimationClip = null;
    @property(cc.SpriteAtlas) cowboy_trend_anim_PLIST: cc.SpriteAtlas = null;
    private isSquintCard: boolean = false;
    private mttbeginMsg: string = "";
    private ispad: boolean = false;
    private _bSwitchTable: boolean = false;

    protected onLoad(): void {
        cv.config.setCurrentScene(cv.Enum.SCENE.POKERMASTER_SCENE);
        cv.config.adaptScreenHen(this.node);
        cv.resMgr.adaptWidget(this.node, true);
    }

    protected start(): void {
        this._init();

        // 重发 JoinRoom 消息, 同步场景UI
        cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
        cv.roomManager.RequestJoinRoom();
    }

    protected onDestroy(): void {
        this._removeObserver();
    }

    protected update(dt: number): void {
        // 已流逝的时间
        this._msNowTime += dt;

        // 时间差
        let msDuration: number = this._msNowTime - this._msLastTime;

        // 判断调用定时器后的时间（可能调用了几次定时器）是否与调用定时器前的时间相差1s
        if (msDuration >= this._msInterval) {
            // 弥补帧误差
            this._msLastTime = this._msNowTime - (msDuration - this._msInterval);
            --this._nLeftTime;
        }

        this._updateCoinOptimization(dt);
    }


    /**
     * 注册监听事件
     */
    private _addObserver(): void {
        cv.MessageCenter.register(PokerMasterDef.LocalMsg().SWITCH_SCENEB_EGAN, this._onMsgSwitchSceneBegan.bind(this), this.node);                             // 切出该场景

        let MsgPrefix: string = PokerMasterDef.LocalMsg().MsgPrefix;
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().SWITCH_SOUND, this._onMsgSoundSwitch.bind(this), this.node);					        // 设置声音改变
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().RECHARGE, this._onMsgRecharge.bind(this), this.node);								    // 充值
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ERROR, this._onMsgGameError.bind(this), this.node);                                     // 游戏错误提示
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ROOM_KICK, this._onMsgKick.bind(this), this.node);                                      // 服务器踢人
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ROOM_PARAM_CHANGE, this._onMsgRoomParamChange.bind(this), this.node);				    // 房间状态变更
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().GAME_DATA_SYN, this._onMsgGameDataSyn.bind(this), this.node);						    // 进入房间数据同步
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_DEAL, this._onMsgGameStatusDeal.bind(this), this.node);						    // 新开一局
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_SHOW_ODDS, this._onMsgGameStatusShowOdds.bind(this), this.node);                 // 显示赔率
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_START_BET, this._onMsgGameStatusStartBet.bind(this), this.node);                 // 开始下注
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_STOP_BET, this._onMsgGameStatusStopBet.bind(this), this.node);                   // 停止下注
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_ROUND_END, this._onMsgGameStatusRoundEnd.bind(this), this.node);                 // 一局结算
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_READY, this._onMsgGameStatusReady.bind(this), this.node);                        // 清屏准备

        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().BET, this._onMsgBet.bind(this), this.node);                                             // 下注
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().AUTO_BET, this._onMsgAutoBet.bind(this), this.node);                                    // 续投
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().AUTO_BET_MERGE, this._onMsgMergeAutoBet.bind(this), this.node);				            // 续投

        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_BET_LEVEL_CHANGE, this._onMsgBetAmountLevelChange.bind(this), this.node);       // 下注级别变更
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_AUTOBET_SET, this._onMsgAdvanceAutobetSet.bind(this), this.node);               // 设置高级续投次数
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_AUTOBET, this._onMsgAdvanceAutobet.bind(this), this.node);					    // 高级续投
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_AUTOBET_CANCEL, this._onMsgAdvanceAutobetCancel.bind(this), this.node);	        // 取消高级续投成功

        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().UPDATE_PLAYER_LIST, this._onMsgPlayerList.bind(this), this.node);                       // 更新玩家列表
        cv.MessageCenter.register(PokerMasterDef.LocalMsg().REWARD_TIPS, this._onMsgRewardTips.bind(this), this.node);                              // 红包中奖提示
        cv.MessageCenter.register(PokerMasterDef.LocalMsg().UPDATE_WORLDSERVER_GOLD, this._onMsgUpdateWorldServerGold.bind(this), this.node);       // world服金币有变动通知

        cv.MessageCenter.register(PokerMasterDef.LocalMsg().SHOW_LUCK_BUTTON, this._onMsgShowLuckButton.bind(this), this.node);                     // 红包节
        cv.MessageCenter.register(PokerMasterDef.LocalMsg().TURN_TABLE_REWARD, this._onMsgTurntableResultNotice.bind(this), this.node);            // 红包转盘中奖结果通知

        cv.MessageCenter.register("goldViewShop", this.onGoldViewShop.bind(this), this.node);
        cv.MessageCenter.register("onNoticeOpenCalmDownWindow", this.onCalmDownShowTip.bind(this), this.node);
        cv.MessageCenter.register("onCalmDownMsg", this.onCalmDownShowTip.bind(this), this.node);

        //私语版本，走私语切换后台注册
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.register("on_syOnEnterBackground", this.OnAppEnterBackground.bind(this), this.node);
            cv.MessageCenter.register("on_syOnEnterForeground", this.OnAppEnterForeground.bind(this), this.node);
        } else {
            cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }
        cv.MessageCenter.register("NoticeMTT_MatchBegin", this.NoticeMttMatchBegin.bind(this), this.node);
    }

    /**
     * 移除监听事件
     */
    private _removeObserver(): void {
        cv.MessageCenter.unregister(PokerMasterDef.LocalMsg().SWITCH_SCENEB_EGAN, this.node);

        let MsgPrefix: string = PokerMasterDef.LocalMsg().MsgPrefix;
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().SWITCH_SOUND, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().RECHARGE, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ERROR, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ROOM_KICK, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ROOM_PARAM_CHANGE, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().GAME_DATA_SYN, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_DEAL, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_SHOW_ODDS, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_START_BET, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_STOP_BET, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_ROUND_END, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().STATUS_READY, this.node);

        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().BET, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().AUTO_BET, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().AUTO_BET_MERGE, this.node);

        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_BET_LEVEL_CHANGE, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_AUTOBET_SET, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_AUTOBET, this.node);
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().ADVANCE_AUTOBET_CANCEL, this.node);

        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().UPDATE_PLAYER_LIST, this.node);
        cv.MessageCenter.unregister(PokerMasterDef.LocalMsg().REWARD_TIPS, this.node);
        cv.MessageCenter.unregister(PokerMasterDef.LocalMsg().UPDATE_WORLDSERVER_GOLD, this.node);

        cv.MessageCenter.unregister(PokerMasterDef.LocalMsg().SHOW_LUCK_BUTTON, this.node);
        cv.MessageCenter.unregister(PokerMasterDef.LocalMsg().TURN_TABLE_REWARD, this.node);

        cv.MessageCenter.unregister("goldViewShop", this.node);
        cv.MessageCenter.unregister("onNoticeOpenCalmDownWindow", this.node);
        cv.MessageCenter.unregister("onCalmDownMsg", this.node);

        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        } else {
            cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }

        cv.MessageCenter.unregister("NoticeMTT_MatchBegin", this.node);
    }

    /**
     * 重置所有UI
     */
    private _resetAllUI(): void {
        this.clearSpecialCardTypeAnim();
        this.resetResultAni();
        this._resetGameView();
        this._resetOtherView();
        this._updateGameView();
    }

    /**
    * 重置游戏视图
    */
    private _resetGameView(): void {
        this._resetCardPos();
        this._resetLeftTime();
        this._resetCardTypeOrRoleLead();
        this._setAllCardsFace(false);
        this._setAllCardsVisible(false);

        this._resetAllBetAreas();
        this._resetAllBetAreaCoins();
        this._restAllTimelineAnims();

        this._resetSquintCardInfo();

        this._stopTimeBetClock();
        this._stopWaittingNextRound();
        this._stopPrepareNextRound();
        this.resetTempPaixing();
        this.resetFlyCoinToPlayerArr();
        this.hideTrendChangeAnim();

        this.mttbeginMsg = "";

        this.resetPointAni();
    }

    /**
     * 重置其他视图
     */
    private _resetOtherView(): void {
    }

    /**
     * 更新游戏视图
     */
    private _updateGameView(): void {
        this._updateRoleFortune();
        this._updateBetAmountLevel();
        this._updateBetBtnState();
        this._updateBetAreaTouchEnabled();

        this._updateSelfInfo();
        this._updateOtherPlayersInfo();
        this._updateAllPlayerWinCount();
    }

    /**
     * 初始化
     */
    private _init(): void {

        // 隐藏充值web页面
        cv.SHOP.msgNode.active = false;
        cv.viewAdaptive.isselfchange = false;
        cv.viewAdaptive.pokerMasterRoomID = 0;

        // 设置跑马灯类型
        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_POKERMASTER);

        // 计算全面屏偏移量
        if (cv.native.isFullScreen()) {
            PokerMasterScene.g_fullScreenOffset.x = cv.native.isScreenLandscape() ? cv.viewAdaptive.IPHONEX_OFFSETY : 0;
            PokerMasterScene.g_fullScreenOffset.y = cv.native.isScreenLandscape() ? 0 : cv.viewAdaptive.IPHONEX_OFFSETY;
        }

        this._initAtlasList();
        this._initUI();
        this._initTopWayOut();
        this._initBtnsEvents();
        this.initGuide();
        this._initPlayersInfo();
        this._initCardInfo();
        this._initBetAreas();
        this._initCoinPool();
        this.initTrendChangeAnim();
        this._initTimelineAnims();
        this._initSquintCardInfo();
        this._initBetButtons();
        // this._initGuid();
        // this._initBtnTest();                                             // 初始化测试按钮

        this._adaptiveScreen();					                            // 适配刘海屏相关控件
        this._initRedPackage();                                             // 初始化红包按钮入口
        this._adaptiveBetBtnPanel();				                        // 适配下注按钮面板布局

        this._addObserver();						                        // 添加监听事件
        this._onMsgSoundSwitch();	                                        // 播放背景音乐

        this._resetAllUI();						                            // 重置UI
    }

    /**
     * 初始化图集
     */
    private _initAtlasList(): void {
        this._atlas_pm_pokermaster = cv.resMgr.getSpriteAtlas("zh_CN/game/pokermasterPlist/pokermaster");

        this._atlas_hb_humanboy = cv.resMgr.getSpriteAtlas("zh_CN/game/humanboyPlist/humanboy");
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
    }

    /**
     * 初始化UI
     */
    private _initUI(): void {
        let panel_game: cc.Node = this.node.getChildByName("panel_game");
        let panel_game_narrow: cc.Node = this.node.getChildByName("panel_game_x");
        let panel_game_ipad: cc.Node = this.node.getChildByName("panel_game_ipad");
        let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
        let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");

        // 计算目标设备分辨率用哪一套UI(目前一套通用, 一套 iphonex )
        // 这里的窄屏只针对 iphonex 设计, 但部分android分辨率虽满足窄屏 h : w >= 2 : 1 的条件, 但是又略比iphonex的 h : w >= 2.165 : 1 的短,
        // 因此这里要检测处理下是否是 iphonex 版的窄屏了
        // 这里就出现了特殊情况, 若不是标准的窄屏, 游戏主逻辑UI区以 _bTrueFullScreen 为判断条件, 外围的边边框框则以 g_pkViewDataManager.isfullScreen 为判断条件
        do {
            if (cv.native.isFullScreen()) {

                // 横屏
                if (cv.native.isScreenLandscape()) {
                    let fTotalWidth: number = 0;
                    fTotalWidth += 2 * PokerMasterScene.g_fullScreenOffset.x;
                    fTotalWidth += panel_game_narrow.width;
                    fTotalWidth += (panel_left_playerlist.width - 50);
                    fTotalWidth += (panel_right_playerlist.width - 50);

                    this._bTrueFullScreen = fTotalWidth <= cc.winSize.width;
                }
                // 竖屏(暂无逻辑)
                else {
                    // let fTotalHeight: number = 0;
                    // this._bTrueFullScreen = fTotalHeight <= cc.winSize.height;
                }
            }
            else {
                let size = cc.winSize;
                if (size.width / size.height <= 1920 / 1439) {
                    this.ispad = true;
                }
            }
        } while (false);

        if (this._bOpenNarrowAdapter && this._bTrueFullScreen) {
            panel_game.removeFromParent(true);
            panel_game.destroy();
            panel_game_ipad.removeFromParent(true);
            panel_game_ipad.destroy();
            this._panel_game = panel_game_narrow;
            if (LANGUAGE_TYPE.zh_CN != cv.config.getCurrentLanguage()) {
                cv.resMgr.setSpriteFrame(this._panel_game, cv.config.getLanguagePath("game/pokermaster/Bg_X"));
            }
            this.setNodePosByIphoneX();
            this.isIphoneX_area = true;
        }
        else if (this.ispad) {
            panel_game_narrow.removeFromParent(true);
            panel_game_narrow.destroy();
            panel_game.removeFromParent(true);
            panel_game.destroy();
            this._panel_game = panel_game_ipad;
            if (LANGUAGE_TYPE.zh_CN != cv.config.getCurrentLanguage()) {
                cv.resMgr.setSpriteFrame(this._panel_game, cv.config.getLanguagePath("game/pokermaster/table_ipad"));
            }
        }
        else {
            panel_game_narrow.removeFromParent(true);
            panel_game_narrow.destroy();
            panel_game_ipad.removeFromParent(true);
            panel_game_ipad.destroy();
            this._panel_game = panel_game;
            if (LANGUAGE_TYPE.zh_CN != cv.config.getCurrentLanguage()) {
                cv.resMgr.setSpriteFrame(this._panel_game, cv.config.getLanguagePath("game/pokermaster/table_normal"));
            }
        }

        let lab_0 = this._panel_game.getChildByName("lab_0");
        let lab_1 = this._panel_game.getChildByName("lab_1");
        lab_0.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_tips_refund money_txt");
        lab_1.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_tips_refund money_txt");

        this._panel_game.active = true;
        this._panel_top = this.node.getChildByName("panel_top");
        this._panel_card = this.node.getChildByName("panel_card");
        this._panel_bottom = this.node.getChildByName("panel_bottom");

        this._panel_self = this._panel_bottom.getChildByName("panel_self");
        this._panel_bet_btn = this._panel_bottom.getChildByName("panel_bet_btn");

        // 等待下局倒计时
        this._img_count_down = this.node.getChildByName("img_count_down");
        this._img_count_down.zIndex = PokerMasterDef.LayerZorder.Z_IDX_PANEL_COUNT_DOWN;
        this._img_count_down.active = false;

        // 闹钟
        this._img_bet_clock = this.node.getChildByName("img_bet_clock");
        this._img_bet_clock.active = false;

        let temp_paixing = this.node.getChildByName("temp_paixing");

        if (this.ispad) {
            let EX_NUM = 174 + 11;
            this._panel_game.setPosition(0, -50);
            this._panel_card.setPosition(this._panel_card.x, this._panel_card.y + EX_NUM);
            this._img_bet_clock.setPosition(this._img_bet_clock.x, this._img_bet_clock.y + EX_NUM);
            temp_paixing.setPosition(temp_paixing.x, temp_paixing.y + EX_NUM);

            let btn_menu: cc.Node = this.node.getChildByName("btn_menu");
            btn_menu.getComponent(cc.Widget).top = 68;
            let btn_review = this.node.getChildByName("btn_review");
            btn_review.getComponent(cc.Widget).top = 68;
            cv.resMgr.adaptWidget(btn_menu);
            cv.resMgr.adaptWidget(btn_review);
        }

        this.setLeftAndRightList();

        this._img_count_down_src_pos = cc.v2(this._img_count_down.position);
        this._img_bet_clock_src_pos = cc.v2(this._img_bet_clock.position);
    }

    /**
     * 初始化"顶栏"路单
     */
    private _initTopWayOut(): void {
        let panel_record: cc.Node = this._panel_top.getChildByName("panel_record");
        for (let i = 0; i < panel_record.childrenCount; ++i) {
            let node: cc.Node = panel_record.getChildByName(`img_dot_${i}`);
            if (node) {
                this._vTopWayOutImg.push(node.getComponent(cc.Sprite));
                this._vTopWayOutImgSrcPos.push(cc.v2(node.position));
            }
        }
    }

    /**
     * 初始化按钮事件
     */
    private _initBtnsEvents(): void {
        // 菜单按钮
        do {
            let btn_menu: cc.Node = this.node.getChildByName("btn_menu");
            // btn_menu.zIndex = PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING;
            btn_menu.on("click", (event: cc.Event): void => {
                if (this.isSquintCard) return;
                if (!this._humanboyMenu) {
                    this._humanboyMenu = cc.instantiate(this.prefab_hb_menu).getComponent(HumanboyMenu);
                    this.node.addChild(this._humanboyMenu.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING);

                    // 菜单 - 兑换
                    this._humanboyMenu.getBtnExchange().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                        this._humanboyMenu.hide(false);

                        if (cv.dataHandler.getUserData().usdt <= 0) {
                            cv.TT.showMsg(cv.config.getStringData("USDTView_ex_coin_error_0_usdt"), cv.Enum.ToastType.ToastTypeError);
                            return;
                        }
                        if (!this._humanboyExchange) {
                            this._humanboyExchange = cc.instantiate(this.prefab_cb_exchange).getComponent(HumanboyExchange);
                            this.node.addChild(this._humanboyExchange.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING);
                        }
                        else {
                            this._humanboyExchange.openView();
                        }
                    });

                    // 菜单 - 规则
                    this._humanboyMenu.getBtnRule().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                        this._humanboyMenu.hide(false);

                        if (!this._humanboyRule) {
                            this._humanboyRule = cc.instantiate(this.prefab_cb_rule).getComponent(CowboyRule);
                            this.node.addChild(this._humanboyRule.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING);
                        }
                        else {
                            this._humanboyRule.openView();
                        }
                    }, this);

                    // 菜单 - 音效设置
                    this._humanboyMenu.getBtnSoundSetting().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                        this._humanboyMenu.hide(false);

                        if (!this._humanboySetting) {
                            this._humanboySetting = cc.instantiate(this.prefab_cb_soundSetting).getComponent(CowboySetting);
                            this.node.addChild(this._humanboySetting.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING);
                        }
                        else {
                            this._humanboySetting.initSwitch();
                            this._humanboySetting.node.active = true;
                        }
                    });

                    // 菜单 - 高级设置
                    this._humanboyMenu.getBtnAdvancedSetting().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                        this._humanboyMenu.hide(false);

                        if (!this._humanboyAdvancedSetting) {
                            this._humanboyAdvancedSetting = cc.instantiate(this.prefab_hb_advancedSetting).getComponent(HumanboyAdvancedSetting);
                            this.node.addChild(this._humanboyAdvancedSetting.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING);
                        }
                        this._humanboyAdvancedSetting.show();
                    });

                    // 菜单 - 退出
                    this._humanboyMenu.getBtnExit().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                        this._humanboyMenu.hide(false);

                        let iUsedAutoBetCount: number = pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount;
                        let iSelectAutoBetCount: number = pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount;
                        if (iSelectAutoBetCount > 0) {
                            let dialog: HumanboyDialog = cc.instantiate(this.prefab_hb_dialog).getComponent(HumanboyDialog);
                            dialog.node.name = "PokerMaster_Dialog";
                            dialog.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_exit_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                                , cv.config.getStringData("CowBoy_btn_desc_exit_game")
                                , cv.config.getStringData("CowBoy_btn_desc_resume_game")
                                , (sender: HumanboyDialog) => { cv.pokerMasterNet.requestLeaveRoom(); }
                                , (sender: HumanboyDialog) => { });

                            this.node.addChild(dialog.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SERVER_TOAST);
                        }
                        else {
                            let PokerMaster_nodeExit = this.node.getChildByName("PokerMaster_nodeExit");
                            if (PokerMaster_nodeExit) {
                                PokerMaster_nodeExit.active = true;
                            }
                            else {
                                let nodeExit: cc.Node = cc.instantiate(this.prefab_cb_exit);
                                nodeExit.name = "PokerMaster_nodeExit";
                                this.node.addChild(nodeExit, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING);
                            }
                        }
                    });
                }
                cv.AudioMgr.playButtonSound('button_click');
                this._humanboyMenu.show(true);
                this._humanboyMenu.setMenuPosition(cc.v2(btn_menu.getPosition().x, btn_menu.getPosition().y - btn_menu.getContentSize().height / 2));
            }, this);
        } while (0);

        // 玩家列表按钮
        do {
            this._btn_playerList = this._panel_bottom.getChildByName("btn_playerlist");
            this._btn_playerList.zIndex = PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING;
            this._btn_playerList.on("click", (event: cc.Event): void => {
                if (this.isSquintCard) return;
                this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                cv.pokerMasterNet.requestPlayerList();
            });
        } while (0);

        // 投注回顾记录按钮
        do {
            this._btn_review = this.node.getChildByName("btn_review");
            // this._btn_review.zIndex = PokerMasterDef.LayerZorder.Z_IDX_PANEL_SETTING;
            this._btn_review.on("click", (event: cc.Event): void => {
                if (this.isSquintCard) return;
                this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                this._showReview();
            });
        } while (0);

        // 顶栏路单
        do {
            this._panel_top.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                if (this.isSquintCard) return;
                this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                this._showChart();
            });
        } while (false);
    }

    onGoldViewShop() {
        this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
        cv.MessageCenter.send(PokerMasterDef.LocalMsg().MsgPrefix + PokerMasterDef.LocalMsg().RECHARGE);
    }
    /**
     * 初始化玩家列表信息
     */
    private _initPlayersInfo(): void {
        // 自己
        do {
            this._txt_self_name = this._panel_self.getChildByName("txt_name").getComponent(cc.Label);
            this._txt_self_gold = this._panel_self.getChildByName("txt_gold").getComponent(cc.Label);
            this._img_self_gold = this._panel_self.getChildByName("img_gold").getComponent(cc.Sprite);
            this._img_self_head = this._panel_self.getChildByName("img_head").getComponent(cc.Sprite);

            // 设置默认头像框
            // cv.resMgr.setSpriteFrame(this._img_self_head.node, "zh_CN/game/humanboy/head/head_player_box_circle");

            // 充值
            let btn_recharge: cc.Node = this._panel_self.getChildByName("btn_recharge");
            btn_recharge.on("click", (event: cc.Event): void => {
                this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                cv.MessageCenter.send(PokerMasterDef.LocalMsg().MsgPrefix + PokerMasterDef.LocalMsg().RECHARGE);
            });
        } while (false);

        // 其他玩家
        do {
            let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
            let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");
            let listLen: number = this.ispad ? 5 : 4;
            for (let i = 0; i < listLen; ++i) {
                // 左列表(富豪榜)
                do {
                    let player: tHumanboyPlayerInfo = new tHumanboyPlayerInfo();
                    player.imgBg = panel_left_playerlist.getChildByName(cv.StringTools.formatC("img_bg_%d", i)).getComponent(cc.Sprite);
                    player.nodeHead = panel_left_playerlist.getChildByName(cv.StringTools.formatC("node_head_%d", i));
                    player.txtCoin = panel_left_playerlist.getChildByName(cv.StringTools.formatC("text_coin_%d", i)).getComponent(cc.Label);

                    if (i === 0) {
                        player.imgFlag = panel_left_playerlist.getChildByName("nb_flag").getComponent(cc.Sprite);
                        let nb_flag_desc: cc.Label = player.imgFlag.node.getChildByName("nb_flag_desc").getComponent(cc.Label);
                        nb_flag_desc.string = cv.StringTools.formatC(cv.config.getStringData("Cowboy_fuhao_no_text"), 1);

                    }

                    if (this.ispad) {
                        if (i == listLen - 1) {
                            player.imgBg.node.active = true;
                            player.nodeHead.active = true;
                            player.txtCoin.node.active = true;
                        }
                    }

                    this._vOtherPlayerInfo.push(player);
                } while (false);

                // 右列表(神算子)
                do {
                    let player: tHumanboyPlayerInfo = new tHumanboyPlayerInfo();
                    player.imgBg = panel_right_playerlist.getChildByName(cv.StringTools.formatC("img_bg_%d", i)).getComponent(cc.Sprite);
                    player.nodeHead = panel_right_playerlist.getChildByName(cv.StringTools.formatC("node_head_%d", i));
                    player.txtCoin = panel_right_playerlist.getChildByName(cv.StringTools.formatC("text_coin_%d", i)).getComponent(cc.Label);

                    if (i === 0) {
                        player.imgFlag = panel_right_playerlist.getChildByName("nb_flag").getComponent(cc.Sprite);
                        let nb_flag_desc: cc.Label = player.imgFlag.node.getChildByName("nb_flag_desc").getComponent(cc.Label);
                        nb_flag_desc.string = cv.config.getStringData("Cowboy_shensuanzi_text");
                    }

                    if (this.ispad) {
                        if (i == listLen - 1) {
                            player.imgBg.node.active = true;
                            player.nodeHead.active = true;
                            player.txtCoin.node.active = true;
                        }
                    }

                    this._vOtherPlayerInfo.push(player);
                } while (false);
            }

            // 头像
            for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
                this._vOtherPlayerInfo[i].imgBg.spriteFrame = this._atlas_hb_humanboy.getSpriteFrame("humanboy_icon_seat_bg_1");
                this._vOtherPlayerInfo[i].nodeHead.getChildByName("img").getComponent(cc.Sprite).spriteFrame = null;
                this._vOtherPlayerInfo[i].txtCoin.node.zIndex = PokerMasterDef.LayerZorder.Z_IDX_IMG_HEAD_TXT;
                if (this._vOtherPlayerInfo[i].imgFlag) this._vOtherPlayerInfo[i].imgFlag.node.zIndex = PokerMasterDef.LayerZorder.Z_IDX_IMG_HEAD_FLAG;
            }
        } while (false);
    }

    /**
     * 更新个人信息
     */
    private _updateSelfInfo(): void {
        // 昵称
        cv.StringTools.setShrinkString(this._txt_self_name.node, pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.name, true);

        // 金币
        let llCurCoin: number = pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.curCoin;
        this._txt_self_gold.string = pokerMasterDataMgr.getPokerMasterRoom().transGoldShortString(llCurCoin);

        // 头像
        let headUrl: string = pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.head;
        CircleSprite.setCircleSprite(this._img_self_head.node, headUrl);
    }

    /**
     * 更新其他人信息
     */
    private _updateOtherPlayersInfo(): void {
        // 这里按照服务器发的gamePlayers顺序放
        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            let vOtherPlayerInfo: Readonly<pokermaster_proto.GamePlayer[]> = pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer;
            if (i < vOtherPlayerInfo.length) {
                let info: Readonly<pokermaster_proto.GamePlayer> = vOtherPlayerInfo[i];
                this._vOtherPlayerInfo[i].uid = info.uid;

                // 头像更新
                let headUrl: string = info.head;
                this._vOtherPlayerInfo[i].imgBg.getComponent(cc.Sprite).spriteFrame = this._atlas_hb_humanboy.getSpriteFrame("humanboy_icon_seat_bg_1");
                this._vOtherPlayerInfo[i].nodeHead.active = true;
                CircleSprite.setCircleSprite(this._vOtherPlayerInfo[i].nodeHead.getChildByName("img"), headUrl, 0, true, Head_Mode.IRREGULAR, true, true, false);
                this._vOtherPlayerInfo[i].txtCoin.string = pokerMasterDataMgr.getPokerMasterRoom().transGoldShortString(info.curCoin);
                if (this._vOtherPlayerInfo[i].imgFlag) this._vOtherPlayerInfo[i].imgFlag.node.active = true;
            }
            else {
                this._vOtherPlayerInfo[i].uid = 0;
                this._vOtherPlayerInfo[i].imgBg.getComponent(cc.Sprite).spriteFrame = this._atlas_hb_humanboy.getSpriteFrame("humanboy_icon_seat_bg_2");
                this._vOtherPlayerInfo[i].nodeHead.active = false;
                this._vOtherPlayerInfo[i].txtCoin.string = "";
                if (this._vOtherPlayerInfo[i].imgFlag) this._vOtherPlayerInfo[i].imgFlag.node.active = false;

                // 移除连胜节点
                let str_tag: string = "win_player_win_count_" + this._vOtherPlayerInfo[i].nodeHead.uuid;
                let str_node: cc.Node = cc.find(str_tag, this.node);
                if (str_node && cc.isValid(str_node, true)) {
                    this.node.removeChild(str_node);
                    str_node.destroy();
                }
            }
        }
    }

    /**
     * 更新玩家金币信息(同步服务器最新数据)
     * @param uid 
     */
    private _updatePlayerGold(uid: number): void {
        if (uid === cv.dataHandler.getUserData().u32Uid) {
            let llCurCoin: number = pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.curCoin;
            this._txt_self_gold.string = pokerMasterDataMgr.getPokerMasterRoom().transGoldShortString(llCurCoin);
        }

        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            if (this._vOtherPlayerInfo[i].uid === uid) {
                // 神算子/富豪是自己的情況
                if (uid === cv.dataHandler.getUserData().u32Uid) {
                    this._vOtherPlayerInfo[i].txtCoin.string = this._txt_self_gold.string;
                }
                else {
                    let player: pokermaster_proto.GamePlayer = pokerMasterDataMgr.getPokerMasterRoom().getOtherPlayerByUid(uid);
                    if (player) {
                        let llCurCoin: number = player.curCoin;
                        this._vOtherPlayerInfo[i].txtCoin.string = pokerMasterDataMgr.getPokerMasterRoom().transGoldShortString(llCurCoin);
                    }
                }
            }
        }
    }

    /**
     * 更新所有玩家临时金币显示(动画临时变化)
     */
    private _updateAllPlayerGold(): void {
        let vPlayerSettles: pokermaster_proto.PlayerSettle[] = pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles;
        for (let i = 0; i < vPlayerSettles.length; ++i) {
            this._updatePlayerGold(vPlayerSettles[i].uid);
        }
    }

    /**
     * 更新指定玩家连胜状态
     * @param uid 
     * @param bAnim 
     */
    private _updatePlayerWinCount(uid: number, bAnim: boolean = false): void {
        let vPlayerHeadBgNode: cc.Node[] = this._getPlayerHeadNodesByUid(uid);
        for (let i = 0; i < vPlayerHeadBgNode.length; ++i) {
            let head: cc.Node = vPlayerHeadBgNode[i];

            // 富豪No1 和 神算子 不显示连胜
            if (this._vOtherPlayerInfo[0].nodeHead === head || this._vOtherPlayerInfo[1].nodeHead === head) {
                continue;
            }

            let nodeName: string = "win_player_win_count_" + head.uuid;
            let win_node: cc.Node = cc.find(nodeName, this.node);
            if (win_node && cc.isValid(win_node, true)) {
                this.node.removeChild(win_node);
                win_node.destroy();
            }
            let keepWinCount: number = pokerMasterDataMgr.getPokerMasterRoom().getPlayerKeepWinCountByUid(uid);
            if (keepWinCount >= 3) {
                keepWinCount = keepWinCount > 10 ? 11 : keepWinCount;

                let offsetY: number = head === this._img_self_head.node ? 40 : 70;
                let tmpPos: cc.Vec2 = cc.Vec2.ZERO;
                head.convertToWorldSpaceAR(cc.v2(0, offsetY), tmpPos);

                let sprWinCount: cc.Sprite = new cc.Node().addComponent(cc.Sprite);
                this.node.addChild(sprWinCount.node, PokerMasterDef.LayerZorder.Z_IDX_IMG_WIN_COUNT);
                sprWinCount.node.active = true;
                sprWinCount.node.name = nodeName;
                sprWinCount.node.setPosition(sprWinCount.node.parent.convertToNodeSpaceAR(tmpPos));
                sprWinCount.spriteFrame = this._atlas_cb_language.getSpriteFrame(`win_count_${keepWinCount}`);

                // animation
                if (bAnim) {
                    let targetPos: cc.Vec2 = cc.v2(sprWinCount.node.position);
                    let bornPos: cc.Vec2 = cc.v2(targetPos);
                    let headMidWorldPos: cc.Vec2 = cc.Vec2.ZERO;
                    head.parent.convertToWorldSpaceAR(head.position, headMidWorldPos);
                    if (headMidWorldPos.x < cc.winSize.width / 2) {
                        let start_left_x: number = (0 - sprWinCount.node.parent.anchorX) * sprWinCount.node.parent.width;
                        bornPos.x = start_left_x - sprWinCount.node.width;
                    }
                    else {
                        let start_right_x: number = (1 - sprWinCount.node.parent.anchorX) * sprWinCount.node.parent.width;
                        bornPos.x = start_right_x + sprWinCount.node.width;
                    }
                    sprWinCount.node.setPosition(bornPos);

                    let mt: cc.ActionInterval = cc.moveTo(0.8, targetPos);
                    let ebo: cc.ActionInterval = mt.easing(cc.easeBackOut());
                    sprWinCount.node.runAction(ebo);
                }
            }
        }
    }

    /**
     * 更新所有玩家连胜状态
     * @param bAnim 
     */
    private _updateAllPlayerWinCount(bAnim: boolean = false): void {
        this._updatePlayerWinCount(cv.dataHandler.getUserData().u32Uid, bAnim);

        // 这里按照服务器发的gamePlayers顺序放
        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            let vOtherPlayer: pokermaster_proto.GamePlayer[] = pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer;
            if (i < vOtherPlayer.length) {
                this._updatePlayerWinCount(vOtherPlayer[i].uid, bAnim);
            }
        }
    }

    /**
     * 初始化牌信息
     */
    private _initCardInfo(): void {
        let node_card: cc.Node = this._panel_card.getChildByName("node_card");

        // 牌
        for (let i = 0; i < node_card.childrenCount; ++i) {
            let left_card: cc.Node = node_card.getChildByName(`left_card_${i}`);
            if (left_card) {
                let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                card.ResetFromNode(left_card);
                this._vLeftHandCards.push(card);
                this._vLeftHandCardsSrcPos.push(cc.v2(card.node.position));
            }

            let right_card: cc.Node = node_card.getChildByName(`right_card_${i}`);
            if (right_card) {
                let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                card.ResetFromNode(right_card);
                this._vRightHandCards.push(card);
                this._vRightHandCardsSrcPos.push(cc.v2(card.node.position));
            }

            let pub_card: cc.Node = node_card.getChildByName(`pub_card_${i}`);
            if (pub_card) {
                let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                card.ResetFromNode(pub_card);
                this._vPublicHoleCards.push(card);
                this._vPublicHoleCardsSrcPos.push(cc.v2(card.node.position));
            }
        }

        // 牌型
        this._img_left_card_type = node_card.getChildByName("img_left_card_type").getComponent(cc.Sprite);
        this._img_right_card_type = node_card.getChildByName("img_right_card_type").getComponent(cc.Sprite);
        this._img_left_card_type_bg = node_card.getChildByName("img_left_card_type_bg").getComponent(cc.Sprite);
        this._img_right_card_type_bg = node_card.getChildByName("img_right_card_type_bg").getComponent(cc.Sprite);

        let zIdx: number = 1;
        this._img_left_card_type.node.zIndex = zIdx;
        this._img_right_card_type.node.zIndex = zIdx;
        this._img_left_card_type_bg.node.zIndex = zIdx;
        this._img_right_card_type_bg.node.zIndex = zIdx;
    }

    /**
     * 设置所有牌显影状态
     * @param visible 
     */
    private _setAllCardsVisible(visible: boolean): void {
        for (let i = 0; i < this._vLeftHandCards.length; ++i) {
            this._vLeftHandCards[i].node.stopAllActions();
            this._vLeftHandCards[i].node.active = visible;
        }

        for (let i = 0; i < this._vRightHandCards.length; ++i) {
            this._vRightHandCards[i].node.stopAllActions();
            this._vRightHandCards[i].node.active = visible;
        }

        for (let i = 0; i < this._vPublicHoleCards.length; ++i) {
            this._vPublicHoleCards[i].node.stopAllActions();
            this._vPublicHoleCards[i].node.active = visible;
        }
    }

    /**
     *  显示所有牌正面/背面
     * @param isFace 
     * @param isRiver 
     */
    private _setAllCardsFace(isFace: boolean): void {
        this._setAllHandsCardsFace(isFace);
        this._setAllPublicHoleCardsFace(isFace, false);
    }

    /**
     * 显示所有手牌正面/背面
     * @param isFace 
     */
    private _setAllHandsCardsFace(isFace: boolean): void {
        let vLeftHandCards: pokermaster_proto.CardItem[] = pokerMasterDataMgr.getPokerMasterRoom().vLeftHandCards;
        let vRightHandCards: pokermaster_proto.CardItem[] = pokerMasterDataMgr.getPokerMasterRoom().vRightHandCards;

        for (let i = 0; i < this._vLeftHandCards.length; ++i) {
            this._vLeftHandCards[i].Gray(false);

            if (i < vLeftHandCards.length) {
                this._vLeftHandCards[i].SetContent(vLeftHandCards[i].number, vLeftHandCards[i].suit);
                this._vLeftHandCards[i].SetFace(isFace);
            }
            else {
                this._vLeftHandCards[i].SetFace(false);
            }
        }

        for (let i = 0; i < this._vRightHandCards.length; ++i) {
            this._vRightHandCards[i].Gray(false);

            if (i < vRightHandCards.length) {
                this._vRightHandCards[i].SetContent(vRightHandCards[i].number, vRightHandCards[i].suit);
                this._vRightHandCards[i].SetFace(isFace);
            }
            else {
                this._vRightHandCards[i].SetFace(false);
            }
        }
    }

    /**
     * 显示所有公牌正面/背面
     * @param isFace        是否显示正/反面
     * @param exceptRiver   是否排除"river"牌
     */
    private _setAllPublicHoleCardsFace(isFace: boolean, exceptRiver: boolean): void {
        let vPublicHoleCards: pokermaster_proto.CardItem[] = pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards;
        for (let i = 0; i < this._vPublicHoleCards.length; ++i) {
            this._vPublicHoleCards[i].Gray(false);

            if (i < vPublicHoleCards.length) {
                this._vPublicHoleCards[i].SetContent(vPublicHoleCards[i].number, vPublicHoleCards[i].suit);

                // 显示, 则检测"exceptRiver"
                if (isFace) {
                    if (exceptRiver && i === this._vPublicHoleCards.length - 1) {
                        this._vPublicHoleCards[i].SetFace(false);
                    }
                    else {
                        this._vPublicHoleCards[i].SetFace(true);
                    }
                }
                // 不显示, 则不检测
                else {
                    this._vPublicHoleCards[i].SetFace(false);
                }
            }
            else {
                this._vPublicHoleCards[i].SetFace(false);
            }
        }
    }

    /**
     * 初始化眯牌信息
     */
    private _initSquintCardInfo(): void {
        if (!this._squintCard) {
            this._squintCard = cc.instantiate(this.prefab_pm_squid_card).getComponent(PokerMasterSquintCard);
            this.node.addChild(this._squintCard.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SQUINT);
        }
    }

    /**
     * 重置眯牌信息
     */
    private _resetSquintCardInfo(): void {
        this.isSquintCard = false;
        if (this._squintCard) this._squintCard.hide();
    }

    /**
     * 初始化下注区域
     */
    private _initBetAreas(): void {
        // 区域映射
        let vBetOptionArea: pokermaster_proto.BetZoneOption[] = [];
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.FISHER_WIN);                        // 渔夫
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.SHARK_WIN);                         // 鲨鱼
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.FIVE_NONE_1DUI);                    // 高牌/一对
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.FIVE_2DUI);                         // 两对
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.FIVE_SAN_SHUN_TONG);                // 三条/顺子/同花
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.FIVE_GOURD);                        // 葫芦
        vBetOptionArea.push(pokermaster_proto.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4);         // 皇铜/同花顺/金刚

        let panel_area: cc.Node = this._panel_game.getChildByName("panel_area");
        let panel_coin: cc.Node = this._panel_game.getChildByName("panel_coin");
        let panel_txt: cc.Node = this._panel_game.getChildByName("panel_txt");
        let panel_way_out: cc.Node = this._panel_game.getChildByName("panel_way_out");

        for (let i = 0; i < vBetOptionArea.length; ++i) {
            let areaInfo: PokerMasterAreaInfo = new PokerMasterAreaInfo();
            areaInfo.zoneIndex = i;
            areaInfo.zoneOption = vBetOptionArea[i];
            areaInfo.panelArea = panel_area.getChildByName(`area_${i}`);
            areaInfo.panelCoin = panel_coin.getChildByName(`coin_${i}`);
            areaInfo.txtOdds = panel_txt.getChildByName(`txt_bet_odd_${i}`).getComponent(cc.Label);
            areaInfo.txtSelfBetNum = panel_txt.getChildByName(`txt_self_bet_num_${i}`).getComponent(cc.Label);
            areaInfo.txtTotalBetNum = panel_txt.getChildByName(`txt_total_bet_num_${i}`).getComponent(cc.Label);
            areaInfo.txtTotalBetNum.enableBold = true;
            areaInfo.txtSelfBetNum.enableBold = true;
            areaInfo.txtSelfBetNum.node.color = new cc.Color(232, 201, 147);
            areaInfo.panelArea.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                this._onClickAreaCoinPanel(areaInfo.zoneIndex);
            });

            // 初始化路子面板
            areaInfo.panelWayOut = panel_way_out.getChildByName(`way_out_${i}`);
            if (areaInfo.panelWayOut) {
                // areaInfo.panelWayOut.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                //     this._showChart();
                // });

                switch (areaInfo.zoneOption) {
                    // 高牌/一对
                    case pokermaster_proto.BetZoneOption.FIVE_NONE_1DUI: {
                        areaInfo.wayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG;
                    } break;

                    // 两对
                    case pokermaster_proto.BetZoneOption.FIVE_2DUI: {
                        areaInfo.wayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG;
                    } break;

                    // 三条/顺子/同花
                    case pokermaster_proto.BetZoneOption.FIVE_SAN_SHUN_TONG: {
                        areaInfo.wayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG;
                    } break;

                    // 葫芦
                    case pokermaster_proto.BetZoneOption.FIVE_GOURD: {
                        areaInfo.wayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                        areaInfo.wayOutLoseLimitCount = 200;
                    } break;

                    // 皇铜/同花顺/金刚
                    case pokermaster_proto.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4: {
                        areaInfo.wayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                        areaInfo.wayOutLoseLimitCount = 300;
                    } break;
                }

                // 路子球状图片
                let count: number = areaInfo.panelWayOut.childrenCount;
                for (let i_wayout_index = 0; i_wayout_index < count; ++i_wayout_index) {
                    let img: cc.Node = areaInfo.panelWayOut.getChildByName(`img_${i_wayout_index}`);
                    if (img) {
                        img.active = false;
                        areaInfo.wayOutImgArray.push(img.getComponent(cc.Sprite));
                        areaInfo.wayOutImgSrcPosArray.push(cc.v2(img.position));
                    }
                }

                // 文本
                let txt_way_out: cc.Node = panel_txt.getChildByName(`txt_way_out_${i}`);
                if (txt_way_out) {
                    areaInfo.rtxtWayOut = txt_way_out.getComponent(cc.Label);
                    areaInfo.rtxtWayOut.node.active = false;
                    // areaInfo.rtxtWayOut.handleTouchEvent = false;
                }
            }
            // push 区域数组
            this._vAreasInfo.push(areaInfo);
        }
    }

    /**
     * 更新下注区域是否可触摸
     */
    private _updateBetAreaTouchEnabled(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            let pArea: PokerMasterAreaInfo = this._vAreasInfo[i];
            let bEnabled: boolean = true;
            bEnabled = bEnabled && pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET;
            bEnabled = bEnabled && this._getLeftTime() > 0;
            if (bEnabled) {
                pArea.panelArea.resumeSystemEvents(false);
            }
            else {
                pArea.panelArea.pauseSystemEvents(false);
            }
        }
    }

    /**
     * 重置所有下注区域
     */
    private _resetAllBetAreas(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._resetBetArea(this._vAreasInfo[i].zoneOption);
        }
    }

    /**
     * 重置指定下注区域
     * @param betOption 
     */
    private _resetBetArea(betOption: pokermaster_proto.BetZoneOption): void {
        // 填充下注文本默认值
        this._updateBetAreaBetsNum(betOption, 0, 0);
    }

    /**
     * 更新下注区域下注数量
     * @param betOption 
     * @param llTotalAmount 
     * @param llSelfAmount 
     */
    private _updateBetAreaBetsNum(betOption: pokermaster_proto.BetZoneOption, llTotalAmount: number = -1, llSelfAmount: number = -1): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let totalBet: number = 0;
        let selfBet: number = 0;
        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (zoneData) {
            totalBet = zoneData.totalBet;
            selfBet = zoneData.selfBet;
        }

        llTotalAmount = llTotalAmount < 0 ? totalBet : llTotalAmount;
        llSelfAmount = llSelfAmount < 0 ? selfBet : llSelfAmount;

        // 自己下注
        if (llSelfAmount > 0) {
            let str_amount: string = pokerMasterDataMgr.getPokerMasterRoom().transGoldShortString(llSelfAmount, 5);
            this._vAreasInfo[nAreaIdx].txtSelfBetNum.string = str_amount;
        }
        else {
            this._vAreasInfo[nAreaIdx].txtSelfBetNum.string = "";
        }

        // 总注
        let str_total: string = pokerMasterDataMgr.getPokerMasterRoom().transGoldShortString(llTotalAmount, 5);
        this._vAreasInfo[nAreaIdx].txtTotalBetNum.string = str_total;

    }

    /**
     * 初始化金币池
     */
    private _initCoinPool(): void {
        this._nodeCoinPool = new cc.Node();
        this._nodeCoinPool.setContentSize(cc.winSize);
        this.node.addChild(this._nodeCoinPool, PokerMasterDef.LayerZorder.Z_IDX_COIN_POOL);

        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            let zoneOption: pokermaster_proto.BetZoneOption = this._vAreasInfo[i].zoneOption;
            let deque: Deque<HumanboyBetCoin> = this._mapCoinQueue.get(zoneOption);
            if (!deque) {
                deque = new Deque();
                this._mapCoinQueue.add(zoneOption, deque);
            }
        }
    }

    /**
     * 重置所有下注区域的金币节点
     */
    private _resetAllBetAreaCoins(): void {
        this._mapCoinQueue.forEach((option: pokermaster_proto.BetZoneOption, deque: Deque<HumanboyBetCoin>): any => {
            this._resetBetAreaCoins(option);
        });

        // 重置金币池节点深度计数
        this._llCoinPoolZOrderCount = 0;

        // 清理"金币最优队列"
        this._vCoinOptimizationDeque.clear();
    }

    private _clearCurrentAreaCoinsBeyondFly(): void {
        this._mapCoinQueue.forEach((option: pokermaster_proto.BetZoneOption, deque: Deque<HumanboyBetCoin>): any => {
            this._resetBetAreaCoins(option);
        });

        // 重置金币池节点深度计数
        this._llCoinPoolZOrderCount = 0;
        // this._mapCoinQueue.forEach((option: pokermaster_proto.BetZoneOption, deque: Deque<HumanboyBetCoin>): any => {
        //     if (deque) {
        //         for (let i = 0; i < deque.size(); ++i) {
        //             let coin: HumanboyBetCoin = deque.at(i);
        //             if (!coin || !cc.isValid(coin, true)) return null;
        //             if (cc.director.getActionManager().getNumberOfRunningActionsInTarget(coin.node) <= 0) {
        //                 this._resetCoin(coin);
        //             }
        //         }
        //     }
        // });
    }

    /**
     * 重置指定下注区域的所有金币节点
     * @param betOption 
     */
    private _resetBetAreaCoins(betOption: pokermaster_proto.BetZoneOption): void {
        let deque: Deque<HumanboyBetCoin> = this._mapCoinQueue.get(betOption);
        if (deque) {
            for (let i = 0; i < deque.size(); ++i) {
                let coin: HumanboyBetCoin = deque.at(i);
                this._resetCoin(coin);
            }
        }
    }

    /**
     * 重置指定金币节点
     * @param coin 
     */
    private _resetCoin(coin: HumanboyBetCoin): HumanboyBetCoin {
        if (!coin || !cc.isValid(coin, true)) return null;

        coin.node.zIndex = 0;
        coin.node.opacity = 0xFF;
        coin.node.angle = 0;
        coin.node.setPosition(cc.Vec2.ZERO);
        coin.node.stopAllActions();
        coin.node.active = false;

        coin.txtBetNode.opacity = 0xFF;
        coin.txtBetNode.active = true;

        coin.btn.enabled = false;
        coin.imgMask.node.active = false;

        return coin;
    }

    /**
     * 重新生成"所有下注区域"金币位置(因为桌布改变了, 即下注区域改变了, 需要重新生成位置)
     */
    private _regenerateAllBetAreaCoinsPos(): void {
        this._mapCoinQueue.forEach((option: pokermaster_proto.BetZoneOption, deque: Deque<HumanboyBetCoin>): any => {
            this._regenerateAreaCoinsPos(option);
        });
    }

    /**
     * 重新生成"指定下注区域"金币位置
     */
    private _regenerateAreaCoinsPos(betOption: pokermaster_proto.BetZoneOption): void {
        let deque: Deque<HumanboyBetCoin> = this._mapCoinQueue.get(betOption);
        if (deque) {
            let nAreaIdx = this._getAreaIdxByBetOption(betOption);
            for (let i = 0; i < deque.size(); ++i) {
                let coin: HumanboyBetCoin = deque.at(i);
                if (!coin.node.active) continue;

                let pos = this._getCoinRandomPos(coin.node, nAreaIdx, true);
                coin.node.parent.convertToNodeSpaceAR(pos, pos);
                coin.node.setPosition(pos);
            }
        }
    }

    /**
     * 恢复所有区域的金币显示与否
     * @param bShowCoin 
     */
    private _recoverAreasCoin(bShowCoin: boolean): void {
        pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.forEach((option: pokermaster_proto.BetZoneOption, zoneData: PokerMasterZoneData): string => {
            let nAreaIdx: number = this._getAreaIdxByBetOption(option);
            if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return "continue";

            let vTotalBetDetail: number[] = zoneData.vTotalBetDetail;
            for (let i = 0; i < vTotalBetDetail.length; ++i) {
                if (bShowCoin) {
                    this._showCoinAnim(nAreaIdx, vTotalBetDetail[i], 0, false, false, false);
                }
            }

            // 更新下注区域
            this._updateBetAreaBetsNum(option);
        });
    }

    /**
     * 创建金币
     * @param gold 
     */
    private _createFlyCoin(gold: number): HumanboyBetCoin {
        let node: cc.Node = cc.instantiate(this.prefab_hb_betCoin);
        node.zIndex = 0;
        node.setAnchorPoint(0.5, 0.5);
        node.setScale(this._fFlyCoinScaleRate);
        node.setPosition(cc.Vec2.ZERO);

        let coin: HumanboyBetCoin = node.getComponent(HumanboyBetCoin);
        coin.setShape(this._getBetCoinShapeByAmount(gold));
        coin.setTxtNum(cv.StringTools.serverGoldToShowNumber(gold));
        coin.btn.enabled = false;

        return coin;
    }

    /**
     * 获取金币外形枚举值
     * @param gold 
     */
    private _getBetCoinShapeByAmount(gold: number): number {
        let llRealGold: number = cv.StringTools.clientGoldByServer(gold);
        let shape: number = llRealGold < pokerMasterDataMgr.getPokerMasterRoom().llCoinUICritical ? HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_COIN : HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_BLOCK;
        return shape;
    }

    /**
     * 获取指定区域金币的随机位置
     * @param coin 
     * @param nAreaIdx 
     * @param bWorldPos 
     */
    private _getCoinRandomPos(coin: cc.Node, nAreaIdx: number, bWorldPos: boolean): cc.Vec2 {
        if (!coin || nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return cc.Vec2.ZERO;
        let szPanel: cc.Size = this._vAreasInfo[nAreaIdx].panelCoin.getContentSize();
        let szCoin: cc.Size = cc.size(cc.Size.ZERO);
        szCoin.width = coin.width * coin.scaleX;
        szCoin.height = coin.height * coin.scaleY;

        let half_w: number = szPanel.width / 2;
        let half_h: number = szPanel.height / 2;

        let offset_x: number = Math.floor(half_w - szCoin.width / 2);
        let offset_y: number = Math.floor(half_h - szCoin.height / 2);

        // 以中心锚点为原点, 按照方圆随机位置
        let sign_x: number = cv.StringTools.randomRange(0, 2) < 1 ? -1 : 1;
        let sign_y: number = cv.StringTools.randomRange(0, 2) < 1 ? -1 : 1;
        let x: number = sign_x * cv.StringTools.randomRange(0, offset_x);
        let y: number = sign_y * cv.StringTools.randomRange(0, offset_y);

        let retPos: cc.Vec2 = cc.v2(x, y);
        if (bWorldPos) {
            this._vAreasInfo[nAreaIdx].panelCoin.convertToWorldSpaceAR(retPos, retPos);
        }
        return retPos;
    }

    /**
     * 从对应区域的金币池中获取金币节点
     * @param nAreaIdx 
     * @param gold 
     */
    private _getCoinFromPool(option: pokermaster_proto.BetZoneOption, gold: number): HumanboyBetCoin {
        let coin: HumanboyBetCoin = null;
        let deque: Deque<HumanboyBetCoin> = this._mapCoinQueue.get(option);
        if (deque) {
            // 未达区域金币精灵上限, 则创建新的精灵
            if (deque.size() < this._nAreaCoinLimitCountMin) {
                coin = this._createFlyCoin(gold);
                coin.node.zIndex = ++this._llCoinPoolZOrderCount;
                coin.node.setPosition(cc.Vec2.ZERO);

                this._nodeCoinPool.addChild(coin.node);
                deque.push_back(coin);
            }
            // 达到上限, 从金币精灵池中取(重复利用)
            else {
                // 出队
                coin = deque.pop_front();
                coin = this._resetCoin(coin);
                if (coin) {
                    coin.node.zIndex = ++this._llCoinPoolZOrderCount;

                    coin.setShape(this._getBetCoinShapeByAmount(gold));
                    coin.setTxtNum(cv.StringTools.serverGoldToShowNumber(gold));

                    // 入队
                    deque.push_back(coin);
                }
            }
        }
        return coin;
    }

    /**
     * 获取对应区域空闲的金币节点数量
     * @param nAreaIdx 
     */
    private _getFreeCoinCountFromPool(option: pokermaster_proto.BetZoneOption): number {
        let nRet: number = 0;
        let deque: Deque<HumanboyBetCoin> = this._mapCoinQueue.get(option);
        if (deque) {
            for (let i = 0; i < deque.size(); ++i) {
                if (!deque.at(i).node.active) ++nRet;
            }
        }
        return nRet;
    }

    /**
     * 刷新"金币最优队列"(每帧创建, 稳定帧率)
     */
    private _updateCoinOptimization(dt: number): void {
        let nTotalCount: number = this._vCoinOptimizationDeque.size();
        if (nTotalCount <= 0) return;

        let eCurState: pokermaster_proto.RoundState = pokerMasterDataMgr.getPokerMasterRoom().eCurState;
        if ((eCurState === pokermaster_proto.RoundState.BET) && this._getLeftTime() >= 0) {
            let nCount: number = 0;

            // 剩余时间 > 1s 逐帧喷吐金币
            if (this._getLeftTime() > 1) {
                nCount = nTotalCount / cc.game.getFrameRate();
                nCount = Math.ceil(nCount);
            }
            // 否则, 一次性喷吐剩余金币(弥补金币数量多、卡帧导致喷吐金币不完整的情况)
            else {
                nCount = nTotalCount;
            }

            // console.log(cv.StringTools.formatC("PokerMaster_Coin: sec = %02d, dt = %05f, total = %05f, count = %05f", this._getLeftTime(), dt, nTotalCount, nCount))

            for (let i = 0; i < nCount; ++i) {
                let t: tHumanboyCoinOptimization = this._vCoinOptimizationDeque.pop_front();

                // 投金币动画
                this._showCoinAnim(t.nAreaIdx, t.nGold, t.nUid, t.bAnim, t.bHeadAnim, t.bPlaySound);

                // 更新下注区域
                this._updateBetAreaBetsNum(this._getBetOptionByAreaIdx(t.nAreaIdx));

                // 更新玩家金币
                this._updatePlayerGold(t.nUid);

                // 自己筹码变化后判断一下下注筹码状态
                if (pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.uid === t.nUid) {
                    this._updateBetBtnState();
                }
            }
        }
        else {
            // 更新剩余的金币数等(在卡帧情况下, 计时误差等情况下, 飞金币被强行停止, 但数据要保持最新, 因为这是一个逐帧队列, 不是及时更新)
            for (let i = 0; i < nTotalCount; ++i) {
                let t: tHumanboyCoinOptimization = this._vCoinOptimizationDeque.pop_front();

                // 更新下注区域
                this._updateBetAreaBetsNum(this._getBetOptionByAreaIdx(t.nAreaIdx));

                // 更新玩家金币
                this._updatePlayerGold(t.nUid);

                // 自己筹码变化后判断一下下注筹码状态
                if (pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.uid === t.nUid) {
                    this._updateBetBtnState();
                }
            }

            // 清除队列
            this._vCoinOptimizationDeque.clear();
        }
    }

    /**
     * 初始化下注按钮
     */
    private _initBetButtons(): void {
        for (let i = 0; i < this._nBetBtnNum; ++i) {
            let betCoin: HumanboyBetCoin = this._panel_bet_btn.getChildByName(`btn_bet_${i}`).getComponent(HumanboyBetCoin);
            betCoin.node.setScale(this._fBetBtnSrcScaleRate);
            betCoin.node.on("click", (event: cc.Event): void => {
                this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                this._setBetBtnSelected(i);
            });
            this._vBetButtons.push(betCoin);
        }

        // 初始化高级续投面板
        if (!this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto = cc.instantiate(this.prefab_hb_advancedAuto).getComponent(HumanboyAdvancedAuto);
            this.node.addChild(this._humanboyAdvancedAuto.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_ADVANCE_AUTO_SELECT);
        }

        // 续投按钮
        this._btn_betAuto = this._panel_bet_btn.getChildByName("btn_bet_auto").getComponent(cc.Button);
        this._btn_betAuto.node.on("click", (event: cc.Event): void => {
            this._playSoundEffect(PokerMasterDef.Sounds().sound_button);

            switch (this._eAutoBtnStyle) {
                // 常规续投点击
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                    cv.pokerMasterNet.requestAutoBet();
                } break;

                // 高级续投已激活(再次点击 弹出高级续投选项面板)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                    // if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET) {
                    this._humanboyAdvancedAuto.adaptSelectPanelPos(this._btn_betAuto.node);
                    this._humanboyAdvancedAuto.showSelectPanel(true);
                    // }
                } break;

                // 高级续投中(再次点击取消)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                    let iUsedAutoBetCount: number = pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount;
                    let iSelectAutoBetCount: number = pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount;
                    let dialog: HumanboyDialog = cc.instantiate(this.prefab_hb_dialog).getComponent(HumanboyDialog);
                    dialog.node.name = "GAB_STYLE_ADVANCE_USING_tips";
                    dialog.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_stop_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                        , cv.config.getStringData("CowBoy_btn_desc_stop_auto_bet")
                        , cv.config.getStringData("CowBoy_btn_desc_resume_auto_bet")
                        , (sender: HumanboyDialog): void => { cv.pokerMasterNet.reqCancelAdvanceAutoBet(); }
                        , (sender: HumanboyDialog): void => { });
                    this.node.addChild(dialog.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SERVER_TOAST);
                } break;

                default:
                    break;
            }
        });

        // 清屏按钮
        this._btn_betClean = this._panel_bet_btn.getChildByName("btn_bet_clean").getComponent(cc.Button);
        this._btn_betClean.normalSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_normal");
        this._btn_betClean.pressedSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_normal");
        this._btn_betClean.hoverSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_normal");
        this._btn_betClean.disabledSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_gray");
        this._btn_betClean.node.on("click", (event: cc.Event): void => {
            this._clearCurrentAreaCoinsBeyondFly();
        });

        // 默认选中第一个下注按钮
        this._setBetBtnSelected(0, false);
    }

    /**
     * 更新续投按钮状态
     */
    private _updateAutoBetBtnStatus(): void {

        switch (this._eAutoBtnStyle) {
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET && this._getLeftTime() > 0) {
                    // 当前一局下过注
                    if (pokerMasterDataMgr.getPokerMasterRoom().bHasBetInCurRound) {
                        this._btn_betAuto.interactable = false;
                    }
                    else {
                        let canAuto: boolean = pokerMasterDataMgr.getPokerMasterRoom().bCanAuto;
                        this._btn_betAuto.interactable = canAuto;
                    }
                } else {
                    this._btn_betAuto.interactable = false;
                }
            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                // 当前一局下过注
                if (pokerMasterDataMgr.getPokerMasterRoom().bHasBetInCurRound) {
                    this._btn_betAuto.interactable = true;
                }
                else {
                    let canAuto = pokerMasterDataMgr.getPokerMasterRoom().bCanAuto;
                    this._btn_betAuto.interactable = canAuto;
                }
            } break;
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                this._btn_betAuto.interactable = true;
            } break;

            default:
                break;
        }
    }

    /**
     * 更新清屏按钮状态
     */
    private _updateCleanBtnStatus(): void {
        let bEnable: boolean = false;
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET && this._getLeftTime() > 0) {
            bEnable = true;
        }
        this._btn_betClean.getComponent(cc.Button).interactable = bEnable;
    }

    /**
     * 设置筹码单选按钮选中状态
     * @param betBtnIdx 
     * @param isCheckCoin 
     */
    private _setBetBtnSelected(betBtnIdx: number, isCheckCoin: boolean = true): void {
        if (betBtnIdx < 0 || betBtnIdx >= this._nBetBtnNum) return;

        this._resetAllBetBtn(true);
        this._updateBetBtnState();

        let vBetCoinOption: number[] = pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption;	// 房间下注级别
        let curCoin: number = pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.curCoin;		// 当前自身携带金币

        if (betBtnIdx >= 0 && betBtnIdx < this._nBetBtnNum) {
            // 钱是否够按钮上的金额
            if (isCheckCoin) {
                let llAmountLevel: number = 0;
                if (betBtnIdx < vBetCoinOption.length) {
                    llAmountLevel = vBetCoinOption[betBtnIdx];
                }

                if (curCoin > 0 && curCoin >= llAmountLevel) {
                    this._nCurBetBtnIndex = betBtnIdx;
                    this._vBetButtons[betBtnIdx].node.setScale(this._fBetBtnTarScaleRate);
                }
            }
            else {
                this._nCurBetBtnIndex = betBtnIdx;
                this._vBetButtons[betBtnIdx].node.setScale(this._fBetBtnTarScaleRate);
            }
        }
    }

    /**
     * 重置指定下注按钮
     * @param index 
     * @param enabled 
     */
    private _resetBetBtn(index: number, enabled: boolean): void {
        if (index < 0 || index >= this._vBetButtons.length) return;

        this._vBetButtons[index].btn.enabled = enabled;
        this._vBetButtons[index].node.setScale(this._fBetBtnSrcScaleRate);
        this._vBetButtons[index].txtBetNode.active = true;
        this._vBetButtons[index].imgMask.node.active = false;

        if (this._nCurBetBtnIndex === index) this._nCurBetBtnIndex = -1;
    }

    /**
     * 重置下注按钮
     * @param enabled 
     */
    private _resetAllBetBtn(enabled: boolean): void {
        for (let i = 0; i < this._vBetButtons.length; ++i) {
            this._resetBetBtn(i, enabled);
        }
    }

    /**
     * 更新下注按钮状态
     * @param bCheckCoin 是否检测金币数量(默认:true, 之所以提出来一个参数, 是因为一局结束通知也调用了该函数, 为了避免一局结束提前通过按钮状态知道输赢结果, 显示更友好)
     */
    private _updateBetBtnState(bCheckCoin: boolean = true): void {
        // 检测下注按钮禁用与否
        let vBetCoinOption: number[] = pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption;		// 房间下注级别
        let curCoin: number = pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.curCoin;		    // 当前自身携带金币
        for (let i = 0; i < vBetCoinOption.length; ++i) {
            // 钱是否够按钮上的金额
            if (curCoin >= vBetCoinOption[i]) {
                this._vBetButtons[i].btn.enabled = true;
                this._vBetButtons[i].btn.interactable = true;
                this._vBetButtons[i].setTxtColor(HumanboyBetCoin.eHumanboyBetCoinTxtColor.YELLOW);
            }
            else {
                this._vBetButtons[i].btn.enabled = false;
                this._vBetButtons[i].btn.interactable = false;
                this._vBetButtons[i].setTxtColor(HumanboyBetCoin.eHumanboyBetCoinTxtColor.GRAY);
            }
        }

        // 检测下注按钮可触摸与否
        let bEffective: boolean = pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET && this._getLeftTime() > 0;
        for (let i = 0; i < this._vBetButtons.length; ++i) {
            this._vBetButtons[i].imgMask.node.active = !bEffective;
            this._vBetButtons[i].imgMask.getComponent(cc.BlockInputEvents).enabled = true;
        }

        // 更新续投按钮状态
        this._updateAutoBetBtnStatus();

        // 更新清屏按钮状态
        this._updateCleanBtnStatus();
    }

    /**
     * 设置续投按钮样式
     * @param eAutoBtnStyle 
     */
    private _setAutoBetBtnStytle(eAutoBtnStyle: MiniGameCommonDef.eGameboyAutoBtnStyle) {
        // 隐藏高级续投子面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.hideAdvanceAutoTips();
            this._humanboyAdvancedAuto.hideAdvanceAutoCount();
            this._humanboyAdvancedAuto.hideSelectPanel(false);
        }

        // 更新续投按钮样式
        this._eAutoBtnStyle = eAutoBtnStyle;
        switch (this._eAutoBtnStyle) {
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NONE:
                break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                this._btn_betAuto.normalSprite = this._atlas_cb_language.getSpriteFrame("autobet_normal");
                this._btn_betAuto.pressedSprite = this._atlas_cb_language.getSpriteFrame("autobet_normal");
                this._btn_betAuto.hoverSprite = this._atlas_cb_language.getSpriteFrame("autobet_normal");
                this._btn_betAuto.disabledSprite = this._atlas_cb_language.getSpriteFrame("autobet_gray");
            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                this._btn_betAuto.normalSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_normal");
                this._btn_betAuto.pressedSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_normal");
                this._btn_betAuto.hoverSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_normal");
                this._btn_betAuto.disabledSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_gray");
            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                this._btn_betAuto.normalSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_using");
                this._btn_betAuto.pressedSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_using");
                this._btn_betAuto.hoverSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_using");
                this._btn_betAuto.disabledSprite = this._atlas_cb_language.getSpriteFrame("autobet_block_gray");

                if (this._humanboyAdvancedAuto) {
                    this._humanboyAdvancedAuto.adaptAdvanceAutoCountPos(this._btn_betAuto.node);
                    this._humanboyAdvancedAuto.showAdvanceAutoCount();
                }
            } break;

            default:
                break;
        }

        let img_betAuto: cc.Sprite = this._btn_betAuto.getComponent(cc.Sprite);
        img_betAuto.type = cc.Sprite.Type.SIMPLE;
        img_betAuto.sizeMode = cc.Sprite.SizeMode.RAW;
    }

    /**
     * 获取续投按钮样式
     */
    private _getAutoBetBtnStytle(): MiniGameCommonDef.eGameboyAutoBtnStyle {
        return this._eAutoBtnStyle;
    }

    /**
     * 加载时间轴动画文件
     */
    private _initTimelineAnims(): void {
        this._nodeAnim = new cc.Node();
        this._nodeAnim.setContentSize(cc.winSize);
        this._nodeAnim.setAnchorPoint(cc.v2(0.5, 0.5));
        this._nodeAnim.setPosition(cc.Vec2.ZERO);
        this.node.addChild(this._nodeAnim, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE);

        // 动画数组
        do {
            for (let i = 0; i < this._vAreasInfo.length; ++i) {
                let zoneOption: pokermaster_proto.BetZoneOption = this._vAreasInfo[i].zoneOption;
                // win
                do {
                    let anim: cc.Node = cc.instantiate(this.prefab_hb_win_flag);
                    anim.active = false;
                    this._nodeAnim.addChild(anim, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);
                    this._mapAnimWinFlags.add(zoneOption, anim.getComponent(cc.Animation));

                    let pos: cc.Vec2 = cc.Vec2.ZERO;
                    this._vAreasInfo[i].panelCoin.convertToWorldSpaceAR(cc.v2(0, -170), pos);
                    anim.parent.convertToNodeSpaceAR(pos, pos);
                    anim.setPosition(pos);
                } while (false);

                // 赔率
                do {
                    let anim: cc.Node = cc.instantiate(this.prefab_pm_show_odds);
                    anim.active = false;
                    if (i >= 2) {
                        let txt_odds = anim.getChildByName("txt_odds");
                        if (txt_odds) {
                            txt_odds.getComponent(cc.Label).fontSize = 30;
                        }
                    }
                    this._nodeAnim.addChild(anim, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);
                    this._mapAnimShowOdds.add(zoneOption, anim.getComponent(cc.Animation));

                    let pos: cc.Vec2 = cc.Vec2.ZERO;
                    this._vAreasInfo[i].txtOdds.node.parent.convertToWorldSpaceAR(this._vAreasInfo[i].txtOdds.node.position, pos);
                    anim.parent.convertToNodeSpaceAR(pos, pos);
                    anim.setPosition(pos);
                } while (false);
            }
        } while (false);

        // 开局动画
        do {
            this._animRoundStart = cc.instantiate(this.prefab_cb_round_start).getComponent(cc.Animation);
            this._animRoundStart.node.active = false;
            this._animRoundStart.node.setPosition(cc.Vec2.ZERO);
            this._nodeAnim.addChild(this._animRoundStart.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);
            if (cv.config.getCurrentLanguage() != LANGUAGE_TYPE.zh_CN) {
                let shark_tip = cc.find("vs_shark/shark_tip", this._animRoundStart.node);
                let master_tip = cc.find("vs_tom/master_tip", this._animRoundStart.node);
                cv.resMgr.setSpriteFrame(shark_tip, "en_US/game/pokermaster/shark_tip");
                cv.resMgr.setSpriteFrame(master_tip, "en_US/game/pokermaster/master_tip");
            }
        } while (false);

        // 开始下注动画
        do {
            this._animStartBet = cc.instantiate(this.prefab_hb_start_bets).getComponent(cc.Animation);
            this._nodeAnim.addChild(this._animStartBet.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animStartBet.node.setPosition(cc.Vec2.ZERO);
            this._animStartBet.node.active = false;

            // // 切换语言, 切换资源
            let img_start_bet_node: cc.Node = this._animStartBet.node.getChildByName("Sprite_2");
            cv.resMgr.setSpriteFrame(img_start_bet_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/002"));

            let img_choose_box_node: cc.Node = this._animStartBet.node.getChildByName("Sprite_7");
            cv.resMgr.setSpriteFrame(img_choose_box_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/004"));
        } while (false);

        // 停止下注动画
        do {
            this._animStopBet = cc.instantiate(this.prefab_hb_end_bets).getComponent(cc.Animation);
            this._nodeAnim.addChild(this._animStopBet.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animStopBet.node.setPosition(cc.Vec2.ZERO);
            this._animStopBet.node.active = false;

            // 切换语言, 切换资源
            let img_clos_bet_node: cc.Node = this._animStopBet.node.getChildByName("Sprite_2");
            cv.resMgr.setSpriteFrame(img_clos_bet_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/003"));

            let img_times_up_node: cc.Node = this._animStopBet.node.getChildByName("Sprite_7");
            cv.resMgr.setSpriteFrame(img_times_up_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/005"));
        } while (false);

        // 路单闪光动画
        do {
            let pos: cc.Vec2 = cc.Vec2.ZERO;
            this._btn_review.parent.convertToWorldSpaceAR(this._btn_review.position, pos);

            this._animWayoutLight = cc.instantiate(this.prefab_hb_way_out).getComponent(cc.Animation);
            this._nodeAnim.addChild(this._animWayoutLight.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animWayoutLight.node.setPosition(this._animWayoutLight.node.parent.convertToNodeSpaceAR(pos));
            this._animWayoutLight.node.active = false;
        } while (false);

        // 输赢动画
        do {
            let node_fisherman = this._panel_card.getChildByName("node_fisherman");
            let node_shark = this._panel_card.getChildByName("node_shark");
            let fishPos = node_fisherman.getChildByName("img").position;
            let sharkPos = node_shark.getChildByName("img").position;

            let aniArr = [this.prefab_dashi_win, this.prefab_dashi_lose, this.prefab_shark_win, this.prefab_shark_lose];

            this._animDashiWin = cc.instantiate(this.prefab_dashi_win).getComponent(cc.Animation);
            node_fisherman.addChild(this._animDashiWin.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animDashiLose = cc.instantiate(this.prefab_dashi_lose).getComponent(cc.Animation);
            node_fisherman.addChild(this._animDashiLose.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animDashiWin.node.setPosition(fishPos);
            this._animDashiLose.node.setPosition(fishPos);
            this._animDashiWin.node.active = false;
            this._animDashiLose.node.active = false;

            this._animSharkWin = cc.instantiate(this.prefab_shark_win).getComponent(cc.Animation);
            node_shark.addChild(this._animSharkWin.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animSharkLose = cc.instantiate(this.prefab_shark_lose).getComponent(cc.Animation);
            node_shark.addChild(this._animSharkLose.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);

            this._animSharkWin.node.setPosition(sharkPos);
            this._animSharkLose.node.setPosition(sharkPos);
            this._animSharkWin.node.active = false;
            this._animSharkLose.node.active = false;
        } while (false);
    }

    /**
     * 停止"timeline"动画
     * @param animNode 
     */
    private _stopTimelineAnims(anim: cc.Animation): void {
        if (anim && (anim instanceof cc.Animation) && cc.isValid(anim, true)) {
            let vClips: cc.AnimationClip[] = anim.getClips();
            for (let i = 0; i < vClips.length; ++i) {
                anim.stop(vClips[i].name);
            }
            anim.node.active = false;
        }
    }

    /**
     * 隐藏所有"timeline"动画
     */
    private _restAllTimelineAnims(): void {
        this._stopTimelineAnims(this._animRoundStart);
        this._stopTimelineAnims(this._animStartBet);
        this._stopTimelineAnims(this._animStopBet);
        this._stopTimelineAnims(this._animWayoutLight);

        this._hideAllOdds();
        this._hideAllWinFlagAnim();
        this._hideAllWinPlayerLightAnim();

        this._nodeAnim.stopAllActions();
    }

    /**
     * 初始化红包等相关按钮入口
     */
    private _initRedPackage(): void {
        // 红包节按钮
        this._btn_redpacket_festival = this._panel_bet_btn.getChildByName("btn_redpacket_festival");
        this._btn_redpacket_festival.getComponent(cc.Sprite).spriteFrame = null;
        this._btn_redpacket_festival.active = false;

        // 红包节按钮提示层
        this._btn_redpacket_festival_layer = cc.instantiate(this._btn_redpacket_festival);
        this.node.addChild(this._btn_redpacket_festival_layer, PokerMasterDef.LayerZorder.Z_IDX_PANEL_RED_PACKET);

        let wpos: cc.Vec2 = cc.Vec2.ZERO;
        this._btn_redpacket_festival.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
        this._btn_redpacket_festival_layer.setPosition(this._btn_redpacket_festival_layer.parent.convertToNodeSpaceAR(wpos));

        // 初始执行一次
        this._onMsgShowLuckButton();
    }

    /**
     * 适配刘海屏相关控件
     */
    private _adaptiveScreen(): void {
        let offset_x: number = PokerMasterScene.g_fullScreenOffset.x;
        let offset_y: number = PokerMasterScene.g_fullScreenOffset.y;

        if (cv.native.isFullScreen()) {
            // 左右玩家列表
            let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
            let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");
            // if (panel_left_playerlist) {
            //     let tmp_x: number = offset_x - 25;
            //     panel_left_playerlist.setPosition(cc.v2(panel_left_playerlist.x + tmp_x, panel_left_playerlist.y));
            // }
            // if (panel_right_playerlist) {
            //     let tmp_x: number = offset_x - 25;
            //     panel_right_playerlist.setPosition(cc.v2(panel_right_playerlist.x - tmp_x, panel_right_playerlist.y));
            // }

            // 菜单按钮
            let btn_menu: cc.Node = this.node.getChildByName("btn_menu");
            if (btn_menu) {
                btn_menu.setPosition(cc.v2(panel_left_playerlist.x, btn_menu.y));
            }

            // 表格记录按钮
            if (this._btn_review) {
                this._btn_review.setPosition(cc.v2(panel_right_playerlist.x, this._btn_review.y));
            }

            // 玩家自己面板
            if (this._panel_self) {
                let img_head: cc.Node = this._panel_self.getChildByName("img_head");
                let pos: cc.Vec2 = cc.Vec2.ZERO;
                btn_menu.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);
                img_head.parent.convertToNodeSpaceAR(pos, pos);
                let ox: number = pos.x - img_head.x;
                let oy: number = 0;
                this._panel_self.setPosition(cc.v2(this._panel_self.x + ox, this._panel_self.y + oy));
            }

            // 玩家列表按钮
            if (this._btn_playerList) {
                let tmp_x: number = offset_x - 50;
                this._btn_playerList.setPosition(cc.v2(this._btn_playerList.x - tmp_x, this._btn_playerList.y));
            }
        }
    }

    /**
     * 适配下注按钮面板布局(横向)
     */
    private _adaptiveBetBtnPanel(): void {
        // 若为空, 则填充按钮数组
        if (this._vBottomBetBtns.length <= 0) {
            // 下注按钮
            for (let i = 0; i < this._vBetButtons.length; ++i) {
                this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._vBetButtons[i].node, this._fBetBtnSrcScaleRate, true));
            }

            // 续投按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_betAuto.node, this._btn_betAuto.node.scale, true));

            // 清屏按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_betClean.node, this._btn_betClean.node.scale, true));

            // 红包节按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_redpacket_festival, this._btn_redpacket_festival.scale));
        }

        let w: number = this._btn_playerList.x - this._btn_playerList.width / 2;
        w -= (this._panel_self.x + this._panel_self.width / 2);
        this._panel_bet_btn.setContentSize(cc.size(w, this._panel_bet_btn.height));
        this._panel_bet_btn.setPosition(this._panel_self.x + this._panel_self.width / 2 + w / 2, this._panel_bet_btn.y);

        let total_w: number = 0;			// 所有可见子节点宽度和
        let spacing_x: number = 0;			// 子节点之间的间距
        let childrenCount: number = 0;		// 可见的子节点个数

        for (let i = 0; i < this._vBottomBetBtns.length; ++i) {
            let node: cc.Node = this._vBottomBetBtns[i].node;
            let scale: number = this._vBottomBetBtns[i].scale;
            let isFixLayout: boolean = this._vBottomBetBtns[i].isFixLayout;
            if (node.active || isFixLayout) {
                ++childrenCount;
                total_w += node.width * scale;
            }
        }

        spacing_x = (this._panel_bet_btn.width - total_w) / (childrenCount + 1);
        let start_x: number = -this._panel_bet_btn.width * this._panel_bet_btn.anchorX;
        for (let i = 0; i < this._vBottomBetBtns.length; ++i) {
            let node: cc.Node = this._vBottomBetBtns[i].node;
            let scale: number = this._vBottomBetBtns[i].scale;
            let isFixLayout: boolean = this._vBottomBetBtns[i].isFixLayout;
            if (node.active || isFixLayout) {
                let x = start_x + spacing_x + node.width * scale * node.anchorX;
                let pos: cc.Vec2 = cc.Vec2.ZERO;
                this._panel_bet_btn.convertToWorldSpaceAR(cc.v2(x, 0), pos);
                node.parent.convertToNodeSpaceAR(pos, pos);

                node.setPosition(pos.x, node.y);
                start_x = pos.x + node.width * scale * node.anchorX;
            }
        }

        // 适配红包节入口节点提示层
        if (this._btn_redpacket_festival_layer) {
            let wpos: cc.Vec2 = cc.Vec2.ZERO;
            this._btn_redpacket_festival.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
            this._btn_redpacket_festival_layer.setPosition(this._btn_redpacket_festival_layer.parent.convertToNodeSpaceAR(wpos));
        }

        // 适配高级续投提示语位置
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.adaptAdvanceAutoTipsPos(this._btn_betAuto.node);
            this._humanboyAdvancedAuto.adaptAdvanceAutoCountPos(this._btn_betAuto.node);
        }
    }

    /**
     * 显示 win 动画
     * @param betOption
     */
    private _showWinFlagAnim(betOption: pokermaster_proto.BetZoneOption): void {
        let anim: cc.Animation = this._mapAnimWinFlags.get(betOption);
        if (!anim) return;

        // 沿用旧的win动画
        anim.node.active = true;
        let animation0: cc.AnimationState = anim.getAnimationState("animation0");
        let animation1: cc.AnimationState = anim.getAnimationState("animation1");

        animation0.speed = MiniGameCommonDef.getAnimClipSpeedByDuring(animation0.clip, this._fActExecute_WinFlag);
        animation0.wrapMode = cc.WrapMode.Normal;

        anim.play(animation0.name);
        anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            anim.off(cc.Animation.EventType.FINISHED);
            animation1.wrapMode = cc.WrapMode.Loop;
            animation1.play();
        }, this);
    }

    /**
     * 隐藏win动画
     * @param betOption 
     */
    private _hideWinFlagAnim(betOption: pokermaster_proto.BetZoneOption): void {
        let anim: cc.Animation = this._mapAnimWinFlags.get(betOption);
        this._stopTimelineAnims(anim);
    }

    /**
     * 显示所有区域win标记
     */
    private _showAllWinFlagAnim(): void {
        pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.forEach((option: pokermaster_proto.BetZoneOption, zoneData: PokerMasterZoneData): any => {
            let result: number = zoneData.vHistoryResults[0];
            if (result === 1) {
                this._showWinFlagAnim(option);
            }
        });
    }

    /**
     * 隐藏所有区域win标记
     */
    private _hideAllWinFlagAnim(): void {
        this._mapAnimWinFlags.forEach((option: pokermaster_proto.BetZoneOption, anim: cc.Animation): void => {
            this._hideWinFlagAnim(option);
        });
    }

    /**
     * 显示"顶栏"路单动画
     */
    private _showTopWayOutAnim(): void {
        let fileName_ball: string = "";
        let fileName_fire: string = "";
        let fileName_light: string = "";
        let resultOption: pokermaster_proto.BetZoneOption = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult.winOp;

        switch (resultOption) {
            case pokermaster_proto.BetZoneOption.FISHER_WIN: {
                fileName_ball = "record_red";
                fileName_fire = "record_red_fire";
                fileName_light = "record_red_fire_light";
            } break;

            case pokermaster_proto.BetZoneOption.SHARK_WIN: {
                fileName_ball = "record_blue";
                fileName_fire = "record_blue_fire";
                fileName_light = "record_blue_fire_light";
            } break;

            case pokermaster_proto.BetZoneOption.EQUAL: {
                fileName_ball = "record_draw";
                fileName_fire = "record_draw_fire";
                fileName_light = "record_draw_fire_light";
            } break;

            default: break;
        }

        // 计算空闲路子索引
        let freeIndex: number = this._vTopWayOutImg.length;
        for (let i = 0; i < this._vTopWayOutImg.length; ++i) {
            if (!this._vTopWayOutImg[i].node.active) {
                freeIndex = i;
                break;
            }
        }

        // 赢得区域朝"顶栏"飞路子动画
        let nAreaIdx: number = this._getAreaIdxByBetOption(resultOption);
        if (nAreaIdx >= 0 && nAreaIdx < this._vAreasInfo.length) {
            let img_fire: cc.Sprite = new cc.Node().addComponent(cc.Sprite);
            let img_light: cc.Sprite = new cc.Node().addComponent(cc.Sprite);
            this._nodeAnim.addChild(img_fire.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_0);
            this._nodeAnim.addChild(img_light.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_0);

            img_fire.node.active = true;
            img_fire.spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame(fileName_fire);

            img_light.node.active = false;
            img_light.spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame(fileName_light);

            // 计算旋转角度
            let start_pos: cc.Vec2 = cc.Vec2.ZERO;
            this._vAreasInfo[nAreaIdx].panelCoin.convertToWorldSpaceAR(cc.Vec2.ZERO, start_pos);
            let end_pos_index: number = Math.min(freeIndex, this._vTopWayOutImg.length - 1);
            let end_pos: cc.Vec2 = cc.Vec2.ZERO;
            this._vTopWayOutImg[end_pos_index].node.convertToWorldSpaceAR(cc.Vec2.ZERO, end_pos);

            let v1: cc.Vec2 = cc.v2(0, start_pos.y);
            let v2: cc.Vec2 = cc.v2(end_pos.x - start_pos.x, end_pos.y - start_pos.y);
            let rotation: number = v2.signAngle(v1) / Math.PI * 180;
            img_fire.node.angle = -rotation;

            // light
            let light_pos: cc.Vec2 = cc.Vec2.ZERO;
            img_light.node.parent.convertToNodeSpaceAR(end_pos, light_pos);
            img_light.node.setPosition(light_pos);

            // action
            img_fire.node.setAnchorPoint(cc.v2(0.5, 0.7));
            img_fire.node.parent.convertToNodeSpaceAR(start_pos, start_pos);
            img_fire.node.parent.convertToNodeSpaceAR(end_pos, end_pos);
            img_fire.node.setPosition(start_pos);
            img_fire.node.runAction(cc.sequence(cc.delayTime(0.2 * this._fActExecute_WayOut)
                , cc.moveTo(0.6 * this._fActExecute_WayOut, end_pos).easing(cc.easeSineInOut())
                , cc.callFunc((): void => {
                    img_fire.node.removeFromParent(true);
                    img_fire.node.destroy();
                    img_light.node.active = true;
                    img_light.node.runAction(cc.sequence(cc.fadeOut(0.2), cc.fadeIn(0.2), cc.fadeOut(0.2), cc.destroySelf()));
                }, this)));
        }

        this.showTrendChangeAnim();
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(() => {
            this.hideTrendChangeAnim();
        }, this)));

        // 路子满了挤动动画
        if (freeIndex > this._vTopWayOutImg.length - 1) {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.2 * this._fActExecute_WayOut), cc.callFunc((): void => {
                if (this._vTopWayOutImg.length > 0) {
                    let st: cc.ActionInterval = cc.scaleTo(0.2, 0);
                    let fo: cc.ActionInterval = cc.fadeOut(0.2);
                    let spawn: cc.FiniteTimeAction = cc.spawn(st, fo);
                    this._vTopWayOutImg[0].node.runAction(cc.sequence(spawn, cc.callFunc((): void => {
                        this._vTopWayOutImg[0].node.active = false;
                        let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
                        for (let i = 0; i < this._vTopWayOutImg.length; ++i) {
                            if (i <= 0) continue;

                            tarPos.x = this._vTopWayOutImgSrcPos[i - 1].x;
                            tarPos.y = this._vTopWayOutImgSrcPos[i - 1].y;
                            this._vTopWayOutImg[i].node.runAction(cc.sequence(cc.moveTo(0.4 * this._fActExecute_WayOut, tarPos), cc.callFunc((): void => {
                                if (i === this._vTopWayOutImg.length - 1) {
                                    this._updateTopWayOut();
                                    this._vTopWayOutImg[0].node.setScale(1.0);
                                    this._vTopWayOutImg[0].node.opacity = 0xFF;
                                    this._vTopWayOutImg[0].node.active = true;
                                }
                            }, this)));
                        }
                    })));
                }
            }, this)));
        }
        else {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.8 * this._fActExecute_WayOut), cc.callFunc((): void => {
                this._vTopWayOutImg[freeIndex].node.active = true;
                this._vTopWayOutImg[freeIndex].spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame(fileName_ball);
            }, this)));
        }
    }

    /**
     * 更新"顶栏"路单
     * @param reduce 少显示个数
     */
    private _updateTopWayOut(reduce: number = 0): void {
        let fileName_ball: string = "";
        let vLastResult: pokermaster_proto.BetZoneOption[] = pokerMasterDataMgr.getPokerMasterRoom().vLastResult;

        let min_count: number = Math.min(this._vTopWayOutImg.length, vLastResult.length);
        let start_index: number = 0;
        let valid_count: number = 0;

        // ui显示个数 >= 路子数据个数, 少显示 reduce 个
        if (this._vTopWayOutImg.length >= vLastResult.length) {
            start_index = 0;
            valid_count = min_count - reduce;
        }
        // ui显示个数 < 路子数据个数, 偏移 reduce 位数据显示
        else {
            start_index = vLastResult.length - min_count - reduce;
            valid_count = min_count;
        }

        for (let i = 0; i < this._vTopWayOutImg.length; ++i) {
            // 复原位置
            this._vTopWayOutImg[i].node.setPosition(this._vTopWayOutImgSrcPos[i]);

            // 更新路单精灵
            let index: number = start_index + i;
            if (i < valid_count && (index >= 0 && index < vLastResult.length)) {
                switch (vLastResult[index]) {
                    case pokermaster_proto.BetZoneOption.FISHER_WIN: fileName_ball = "record_red"; break;
                    case pokermaster_proto.BetZoneOption.SHARK_WIN: fileName_ball = "record_blue"; break;
                    case pokermaster_proto.BetZoneOption.EQUAL: fileName_ball = "record_draw"; break;
                    default: break;
                }
                this._vTopWayOutImg[i].node.active = true;
                this._vTopWayOutImg[i].spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame(fileName_ball);
            }
            else {
                this._vTopWayOutImg[i].node.active = false;
            }
        }
    }

    /**
     * 路单滚动动画
     * @param betOption 
     */
    private _showWayOutMoveAnim(betOption: pokermaster_proto.BetZoneOption): void {
        let nAreaIdx = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelWayOut: cc.Node = this._vAreasInfo[nAreaIdx].panelWayOut;
        let wayOutImgArray: cc.Sprite[] = this._vAreasInfo[nAreaIdx].wayOutImgArray;
        let wayOutImgSrcPosArray: cc.Vec2[] = this._vAreasInfo[nAreaIdx].wayOutImgSrcPosArray;
        if (!panelWayOut || wayOutImgArray.length <= 0) return;

        // 裁剪右移 模式
        // let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
        // for (let i = 0; i < wayOutImgArray.length; ++i) {
        //     if (i === 0) {
        //         tarPos.x = wayOutImgSrcPosArray[i].x - wayOutImgArray[nAreaIdx].node.width * wayOutImgArray[nAreaIdx].node.scaleX;
        //         tarPos.y = wayOutImgSrcPosArray[i].y;
        //     }
        //     else {
        //         tarPos.x = wayOutImgSrcPosArray[i - 1].x;
        //         tarPos.y = wayOutImgSrcPosArray[i - 1].y;
        //     }

        //     wayOutImgArray[i].node.runAction(cc.sequence(cc.moveTo(0.3, tarPos), cc.callFunc((): void => {
        //         if (i === wayOutImgArray.length - 1) {
        //             this._updateWayOut(betOption, 0);
        //         }
        //     }, this)));
        // }

        // 缩小渐隐右移 模式
        let st: cc.ActionInterval = cc.scaleTo(0.2, 0);
        let fo: cc.ActionInterval = cc.fadeOut(0.3);
        let spawn: cc.FiniteTimeAction = cc.spawn(st, fo);
        wayOutImgArray[0].node.runAction(cc.sequence(spawn, cc.callFunc((): void => {
            wayOutImgArray[0].node.active = false;
            let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
            for (let i = 0; i < wayOutImgArray.length; ++i) {
                if (i === 0) continue;

                tarPos.x = wayOutImgSrcPosArray[i - 1].x;
                tarPos.y = wayOutImgSrcPosArray[i - 1].y;
                wayOutImgArray[i].node.runAction(cc.sequence(cc.moveTo(0.5, tarPos), cc.callFunc((): void => {
                    if (i === wayOutImgArray.length - 1) {
                        this._updateWayOut(betOption, 0);
                        wayOutImgArray[0].node.setScale(1.0);
                        wayOutImgArray[0].node.opacity = 0xFF;
                        wayOutImgArray[0].node.active = true;
                    }
                }, this)));
            }
        })));
    }

    /**
     * 显示路单图片动画
     * @param betOption 
     */
    private _showWayOutImgAnim(betOption: pokermaster_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let wayOutImgArray: cc.Sprite[] = this._vAreasInfo[nAreaIdx].wayOutImgArray;
        if (wayOutImgArray.length <= 0) return;

        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 隐藏路单文本
        let rtxtWayOut: cc.Label = this._vAreasInfo[nAreaIdx].rtxtWayOut;
        if (rtxtWayOut) {
            rtxtWayOut.string = "";
            rtxtWayOut.node.active = false;
        }

        // 1 赢,  0 输
        let fileName_ball: string = "";
        let result: number = zoneData.result;

        if (result === 1) {
            fileName_ball = "humanboy_icon_circle_small_red";//"humanboy_icon_circle_red";
        }
        else {
            fileName_ball = "humanboy_icon_circle_small_gray";//"humanboy_icon_circle_gray";
        }

        // 计算空闲路子索引
        let freeIndex: number = wayOutImgArray.length;
        for (let i = 0; i < wayOutImgArray.length; ++i) {
            if (!wayOutImgArray[i].node.active) {
                freeIndex = i;
                break;
            }
        }

        // 路子满了挤动动画
        if (freeIndex > wayOutImgArray.length - 1) {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3 * this._fActExecute_WayOut), cc.callFunc((): void => {
                this._showWayOutMoveAnim(betOption);
            }, this)));
        }
        else {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.8 * this._fActExecute_WayOut), cc.callFunc((): void => {
                wayOutImgArray[freeIndex].node.active = true;
                wayOutImgArray[freeIndex].spriteFrame = this._atlas_hb_language.getSpriteFrame(fileName_ball);
            }, this)));
        }
    }

    /**
     * 路单动画(包括图片,文本等)
     * @param betOption 
     */
    private _showWayOutAnim(betOption: pokermaster_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelWayOut: cc.Node = this._vAreasInfo[nAreaIdx].panelWayOut;
        let wayOutImgArray: cc.Sprite[] = this._vAreasInfo[nAreaIdx].wayOutImgArray;
        if (!panelWayOut || wayOutImgArray.length <= 0) return;

        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 路子显示风格
        switch (this._vAreasInfo[nAreaIdx].wayOutStyle) {
            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE: {
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG: {
                this._updateWayOutImg(betOption, 1);
                this._showWayOutImgAnim(betOption);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT: {
                this._updateWayOutTxt(betOption);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO: {
                let bShowTxt: boolean = false;
                let vHistoryResults: number[] = zoneData.vHistoryResults;
                if (vHistoryResults.length > 0 && vHistoryResults.length > wayOutImgArray.length) {
                    let bDefeat: boolean = true;
                    for (let i = 0; i <= wayOutImgArray.length; ++i) {
                        bDefeat = bDefeat && vHistoryResults[i] > 0;
                    }
                    if (bDefeat) {
                        bShowTxt = true;
                    }
                }

                if (bShowTxt) {
                    this._updateWayOutTxt(betOption);
                }
                else {
                    this._updateWayOutImg(betOption, 1);
                    this._showWayOutImgAnim(betOption);
                }
            } break;

            default:
                break;
        }
    }

    /**
     * 更新路单图片
     * @param betOption 
     * @param reduce 
     */
    private _updateWayOutImg(betOption: pokermaster_proto.BetZoneOption, reduce: number): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelWayOut: cc.Node = this._vAreasInfo[nAreaIdx].panelWayOut;
        panelWayOut.active = true;

        let wayOutImgArray: cc.Sprite[] = this._vAreasInfo[nAreaIdx].wayOutImgArray;
        let wayOutImgSrcPosArray: cc.Vec2[] = this._vAreasInfo[nAreaIdx].wayOutImgSrcPosArray;

        let zoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 隐藏路单文本
        let rtxtWayOut: cc.Label = this._vAreasInfo[nAreaIdx].rtxtWayOut;
        if (rtxtWayOut) {
            rtxtWayOut.string = "";
            rtxtWayOut.node.active = false;
        }

        // 逆序取历史记录
        let fileName_ball: string = "";
        let vHistoryResults: number[] = zoneData.vHistoryResults;

        let min_count: number = Math.min(wayOutImgArray.length, vHistoryResults.length);
        let end_index: number = 0;
        let end_count: number = 0;

        // ui显示个数 >= 路子数据个数, 少显示 reduce 个
        if (wayOutImgArray.length >= vHistoryResults.length) {
            end_index = min_count - 1;
            end_count = min_count - reduce;
        }
        // ui显示个数 < 路子数据个数, 偏移 reduce 位数据显示
        else {
            end_index = min_count - 1 + reduce;
            end_count = min_count;
        }

        for (let i = 0; i < wayOutImgArray.length; ++i) {
            // 复原位置
            wayOutImgArray[i].node.setPosition(wayOutImgSrcPosArray[i]);

            let index = end_index - i;
            if (i < end_count && (index >= 0 && index < vHistoryResults.length)) {
                // 1 赢,  0 输
                let result: number = vHistoryResults[index];

                if (result === 1) {
                    fileName_ball = "humanboy_icon_circle_small_red";//"humanboy_icon_circle_red";
                }
                else {
                    fileName_ball = "humanboy_icon_circle_small_gray";//"humanboy_icon_circle_gray";
                }

                wayOutImgArray[i].node.active = true;
                wayOutImgArray[i].spriteFrame = this._atlas_hb_language.getSpriteFrame(fileName_ball);
            }
            else {
                wayOutImgArray[i].node.active = false;
            }
        }
    }

    /**
     * 显示路单文本
     * @param betOption 
     */
    private _updateWayOutTxt(betOption: pokermaster_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let rtxtWayOut: cc.Label = this._vAreasInfo[nAreaIdx].rtxtWayOut;
        if (!rtxtWayOut) return;

        let wayOutImgArray: cc.Sprite[] = this._vAreasInfo[nAreaIdx].wayOutImgArray;
        let wayOutLoseLimitCount: number = this._vAreasInfo[nAreaIdx].wayOutLoseLimitCount;

        // 隐藏路单球图片面板
        for (let i = 0; i < wayOutImgArray.length; ++i) {
            wayOutImgArray[i].node.active = false;
        }

        // 显示文本
        let eCurState: pokermaster_proto.RoundState = pokerMasterDataMgr.getPokerMasterRoom().eCurState;
        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
        let luckLoseHand: number = zoneData.luckLoseHand;
        let isZh = cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN;
        if (luckLoseHand < 0) {
            rtxtWayOut.string = "";
        }
        else if (luckLoseHand === 0) {
            if (eCurState === pokermaster_proto.RoundState.WAIT_NEXT_ROUND) {
                // cv.StringTools.setRichTextString(rtxtWayOut.node, cv.config.getStringData("Humanboy_game_wayout_hit_txt"));
                rtxtWayOut.string = isZh ? "b" : "B";
            }
            else {
                // cv.StringTools.setRichTextString(rtxtWayOut.node, cv.config.getStringData("Humanboy_game_wayout_hit_last_txt"));
                rtxtWayOut.string = isZh ? "c" : "C";
            }
        }
        else {
            let strCountDest: string = "";
            if (wayOutLoseLimitCount != 0 && luckLoseHand > wayOutLoseLimitCount) {
                strCountDest = cv.StringTools.formatC("%d+", wayOutLoseLimitCount);
            }
            else {
                strCountDest = cv.StringTools.formatC("%d", luckLoseHand);
            }
            rtxtWayOut.string = strCountDest + (isZh ? "a" : "A");
            // cv.StringTools.setRichTextString(rtxtWayOut.node, cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_wayout_lose_txt"), strCountDest));
        }
        rtxtWayOut.node.active = true;
    }

    /**
     *  更新路单
     * @param betOption 
     * @param reduce 
     */
    private _updateWayOut(betOption: pokermaster_proto.BetZoneOption, reduce: number): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let wayOutImgArray: cc.Sprite[] = this._vAreasInfo[nAreaIdx].wayOutImgArray;
        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        switch (this._vAreasInfo[nAreaIdx].wayOutStyle) {
            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE: {
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG: {
                this._updateWayOutImg(betOption, reduce);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT: {
                this._updateWayOutTxt(betOption);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO: {
                let bShowTxt: boolean = false;
                let vHistoryResults: number[] = zoneData.vHistoryResults;
                if (vHistoryResults.length > 0 && vHistoryResults.length > wayOutImgArray.length) {
                    let bDefeat: boolean = true;
                    for (let i = 0; i <= wayOutImgArray.length; ++i) {
                        bDefeat = bDefeat && vHistoryResults[i] > 0;
                    }
                    if (bDefeat) {
                        bShowTxt = true;
                    }
                }

                if (bShowTxt) {
                    this._updateWayOutTxt(betOption);
                }
                else {
                    this._updateWayOutImg(betOption, reduce);
                }
            } break;

            default:
                break;
        }
    }

    /**
     * 更新所有路单
     * @param reduce 
     */
    private _updateAllWayOut(reduce: number = 0): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._updateWayOut(this._vAreasInfo[i].zoneOption, reduce);
        }
    }

    /**
     * 显示所有路单动画
     */
    private _showAllWayOutAnim(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._showWayOutAnim(this._vAreasInfo[i].zoneOption);
        }

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActExecute_WayOut), cc.callFunc((): void => {
            //一局结束 请求路单
            if (this._pokerMasterChart && this._pokerMasterChart.node.active) {
                cv.pokerMasterNet.requestTrend();
            }

            // 动画
            this._showWayOutLightAnim();
        }, this)));
    }

    /**
     * 显示路单闪光动画
     */
    private _showWayOutLightAnim(): void {
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        this._btn_review.parent.convertToWorldSpaceAR(this._btn_review.position, pos);
        this._animWayoutLight.node.active = true;
        this._animWayoutLight.node.setPosition(this._animWayoutLight.node.parent.convertToNodeSpaceAR(pos));

        let anim: cc.Animation = this._animWayoutLight;
        let clip: cc.AnimationClip = anim.defaultClip;
        clip.speed = MiniGameCommonDef.getAnimClipSpeedByDuring(clip, this._fActExecute_WayOutLight);
        clip.wrapMode = cc.WrapMode.Normal;

        anim.play();
        anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            anim.off(cc.Animation.EventType.FINISHED);
            this._animWayoutLight.node.active = false;
        }, this);
    }

    /**
     * 显示开局动画
     */
    private _showRoundStartAnim(): void {
        this._animRoundStart.node.active = true;

        let anim: cc.Animation = this._animRoundStart;
        let clip: cc.AnimationClip = anim.defaultClip;
        clip.speed = MiniGameCommonDef.getAnimClipSpeedByDuring(clip, this._fActExecute_RoundStart);
        clip.wrapMode = cc.WrapMode.Normal;

        anim.play();
        anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            anim.off(cc.Animation.EventType.FINISHED);
            this._animRoundStart.node.active = false;
        }, this);
    }

    /**
     * 开始下注动画
     */
    private _showStartBetAnim(): void {
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActDelayed_StartBet), cc.callFunc((): void => {
            this._playSoundEffect(PokerMasterDef.Sounds().sound_begin_bet);
            this._animStartBet.node.active = true;

            let anim: cc.Animation = this._animStartBet;
            let clip: cc.AnimationClip = anim.defaultClip;
            clip.speed = MiniGameCommonDef.getAnimClipSpeedByDuring(clip, this._fActExecute_Startbet);
            clip.wrapMode = cc.WrapMode.Normal;

            anim.play();
            anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                anim.off(cc.Animation.EventType.FINISHED);
                this._animStartBet.node.active = false;
            }, this);
        }, this)));
    }

    /**
     * 停止下注动画
     */
    private _showStopBetAnim(): void {
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActDelayed_StopBet), cc.callFunc((): void => {
            this._playSoundEffect(PokerMasterDef.Sounds().sound_end_bet);
            this._animStopBet.node.active = true;

            let anim: cc.Animation = this._animStopBet;
            let clip: cc.AnimationClip = anim.defaultClip;
            clip.speed = MiniGameCommonDef.getAnimClipSpeedByDuring(clip, this._fActExecute_StopBet);
            clip.wrapMode = cc.WrapMode.Normal;

            anim.play();
            anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                anim.off(cc.Animation.EventType.FINISHED);
                this._animStopBet.node.active = false;
            }, this);
        }, this)));
    }

    /**
     * 发牌动画
     */
    private _sendCardAnim(): void {
        this._setAllCardsFace(false);
        this._setAllCardsVisible(false);

        let handCards: CowboyCard[] = [];
        let handCardsTargetPos: cc.Vec2[] = [];

        let TEMP_NUM = 15;
        for (let i = 0; i < this._vLeftHandCards.length; ++i) {
            let px: number = this._vLeftHandCardsSrcPos[i].x + TEMP_NUM;
            let py: number = this._vLeftHandCardsSrcPos[i].y - TEMP_NUM;
            this._vLeftHandCards[i].node.setPosition(px, py);
            handCards.push(this._vLeftHandCards[i]);
            handCardsTargetPos.push(this._vLeftHandCardsSrcPos[i]);
        }

        for (let i = 0; i < this._vRightHandCards.length; ++i) {
            let px: number = this._vRightHandCardsSrcPos[i].x - TEMP_NUM;
            let py: number = this._vRightHandCardsSrcPos[i].y - TEMP_NUM;
            this._vRightHandCards[i].node.setPosition(px, py);
            handCards.push(this._vRightHandCards[i]);
            handCardsTargetPos.push(this._vRightHandCardsSrcPos[i]);
        }

        for (let i = 0; i < this._vPublicHoleCards.length; ++i) {
            let px: number = this._vPublicHoleCardsSrcPos[i].x - TEMP_NUM;
            let py: number = this._vPublicHoleCardsSrcPos[i].y - TEMP_NUM;
            this._vPublicHoleCards[i].node.setPosition(px, py);
        }

        // 发手牌动画
        let easeRate: number = 1.0;
        let duration: number = 0.07;
        for (let i = 0; i < handCards.length; ++i) {
            let showAction: cc.ActionInstant = cc.callFunc((): void => { handCards[i].SetFace(false); });
            let moveAction: cc.ActionInterval = cc.moveTo(duration, handCardsTargetPos[i]).easing(cc.easeInOut(easeRate));
            this.scheduleOnce((elapsed: number): void => {
                handCards[i].node.active = true;
                handCards[i].node.runAction(cc.sequence(showAction, moveAction, cc.callFunc((): void => {
                    this._playSoundEffect(PokerMasterDef.Sounds().sound_fapai);

                    // 发公共牌动画
                    if (i === handCards.length - 1) {
                        for (let j = 0; j < this._vPublicHoleCards.length; ++j) {
                            let pubShowAction = cc.callFunc((): void => {
                                this._vPublicHoleCards[j].SetFace(false);
                                this._playSoundEffect(PokerMasterDef.Sounds().sound_fapai);
                            });

                            let pubMoveAction = cc.moveTo(duration, this._vPublicHoleCardsSrcPos[j]).easing(cc.easeInOut(easeRate));
                            let pubMoveComplete = cc.callFunc(function () {
                                if (j == this._vPublicHoleCards.length - 1) {
                                    // 发完最后一张公共牌
                                    // 可以在这里回调
                                    // 目前采用并发动画, 此处无需回调
                                }
                            }.bind(this));

                            this.scheduleOnce((elapsed: number): void => {
                                this._vPublicHoleCards[j].node.active = true;
                                this._vPublicHoleCards[j].node.runAction(cc.sequence(pubMoveAction, pubShowAction, pubMoveComplete));
                            }, j * duration);
                        }
                    }
                })));
            }, i * duration);
        }
    }

    /**
     * 翻开"手牌"动画
     */
    private _showHandCardsAnim(): void {
        // 显示所有牌
        this._setAllCardsVisible(true);

        // 翻手牌
        let minCount: number = 0;
        let vLeftHandCards: pokermaster_proto.CardItem[] = pokerMasterDataMgr.getPokerMasterRoom().vLeftHandCards;
        let vRightHandCards: pokermaster_proto.CardItem[] = pokerMasterDataMgr.getPokerMasterRoom().vRightHandCards;

        minCount = Math.min(this._vLeftHandCards.length, vLeftHandCards.length);
        for (let i = 0; i < minCount; ++i) {
            this._vLeftHandCards[i].SetContent(vLeftHandCards[i].number, vLeftHandCards[i].suit);
            this._vLeftHandCards[i].SetFace(false);
            this._vLeftHandCards[i].Turn(true);

            if (i === 0) {
                this._playSoundEffect(PokerMasterDef.Sounds().sound_kaipai);
            }
        }

        minCount = Math.min(this._vRightHandCards.length, vRightHandCards.length);
        for (let i = 0; i < minCount; ++i) {
            this._vRightHandCards[i].SetContent(vRightHandCards[i].number, vRightHandCards[i].suit);
            this._vRightHandCards[i].SetFace(false);
            this._vRightHandCards[i].Turn(true, 0.5);

            if (i === 0) {
                this.scheduleOnce(() => {
                    this._playSoundEffect(PokerMasterDef.Sounds().sound_kaipai);
                }, 0.5);
            }
        }
    }

    /**
     * 翻开"公共牌"动画
     */
    private _showPublicHoleCardsAnim(showNums: number): void {
        let vPublicHoleCards: pokermaster_proto.CardItem[] = pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards;
        let min: number = Math.min(showNums, vPublicHoleCards.length);
        for (let i = 0; i < this._vPublicHoleCards.length; ++i) {
            this._vPublicHoleCards[i].SetFace(false);

            if (i < min) {
                let flopOverFunc: cc.ActionInstant = cc.callFunc(() => {
                    if (i === min - 1) {
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_kaipai);
                    }
                });

                this._vPublicHoleCards[i].node.stopAllActions();
                this._vPublicHoleCards[i].node.runAction(cc.sequence(cc.moveTo(0.3, this._vPublicHoleCardsSrcPos[0]), cc.callFunc((): void => {
                    this._vPublicHoleCards[i].SetContent(vPublicHoleCards[i].number, vPublicHoleCards[i].suit);
                    this._vPublicHoleCards[i].Turn(true);
                }), cc.moveTo(0.2, this._vPublicHoleCardsSrcPos[i]), flopOverFunc));
            }
        }
    }

    /**
     * 更新"公共牌"高亮/置灰与否
     */
    private _updateWinCardGray(): void {
        let tRoundresult: pokermaster_proto.RoundResult = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult;
        if (tRoundresult.Cards.length <= 0) return;

        // 先全部置灰
        for (let i = 0; i < this._vLeftHandCards.length; ++i) {
            this._vLeftHandCards[i].Gray(true);
        }
        for (let i = 0; i < this._vRightHandCards.length; ++i) {
            this._vRightHandCards[i].Gray(true);
        }
        for (let i = 0; i < this._vPublicHoleCards.length; ++i) {
            this._vPublicHoleCards[i].Gray(true);
        }

        // 然后选择性高亮
        for (let i = 0; i < tRoundresult.Cards.length; ++i) {
            let suit: number = tRoundresult.Cards[i].suit;
            let number: number = tRoundresult.Cards[i].number;
            console.log("boob =>", suit, ",", number);

            // 左手牌
            for (let l_idx = 0; l_idx < this._vLeftHandCards.length; ++l_idx) {
                if (this._vLeftHandCards[l_idx].GetSuit() === suit && this._vLeftHandCards[l_idx].GetNumber() === number) {
                    this._vLeftHandCards[l_idx].Gray(false);
                }
            }

            // 右手牌
            for (let r_idx = 0; r_idx < this._vRightHandCards.length; ++r_idx) {
                if (this._vRightHandCards[r_idx].GetSuit() === suit && this._vRightHandCards[r_idx].GetNumber() === number) {
                    this._vRightHandCards[r_idx].Gray(false);
                }
            }

            // 公共牌
            for (let p_idx = 0; p_idx < this._vPublicHoleCards.length; ++p_idx) {
                if (this._vPublicHoleCards[p_idx].GetSuit() === suit && this._vPublicHoleCards[p_idx].GetNumber() === number) {
                    this._vPublicHoleCards[p_idx].Gray(false);
                }
            }
        }
    }

    /**
     * 获取牌型对应的精灵帧名称
     * @param level 
     * @param isGray 
     */
    private _getCardTypeFrameName(level: pokermaster_proto.HandLevel, isGray: boolean = false): string {
        let strCardType: string = "";

        // 成牌牌型
        switch (level) {
            // 无
            case pokermaster_proto.HandLevel.HAND_DUMMY: break;

            // 高牌
            case pokermaster_proto.HandLevel.HAND_NONE: strCardType = "gaopai"; break;

            // 一对
            case pokermaster_proto.HandLevel.HAND_DUI: strCardType = "yidui"; break;

            // 两对
            case pokermaster_proto.HandLevel.HAND_DUI_TWO: strCardType = "liangdui"; break;

            // 三条
            case pokermaster_proto.HandLevel.HAND_SANJO: strCardType = "santiao"; break;

            // 顺子
            case pokermaster_proto.HandLevel.HAND_SHUN: strCardType = "shunzi"; break;

            // 同花
            case pokermaster_proto.HandLevel.HAND_TONG: strCardType = "tonghua"; break;

            // 葫芦
            case pokermaster_proto.HandLevel.HAND_HULU: strCardType = "hulu"; break;

            // 金刚
            case pokermaster_proto.HandLevel.HAND_SIJO: strCardType = "jingang"; break;

            // 同花顺
            case pokermaster_proto.HandLevel.HAND_TONG_SHUN: strCardType = "tonghuashun"; break;

            // 皇家同花顺
            case pokermaster_proto.HandLevel.HAND_KING: strCardType = "huangtong"; break;

            default: break;
        }

        strCardType = isGray ? strCardType + "_gray" : strCardType;

        return strCardType;
    }

    /**
     * 显示牌型动画
     * @param betOption 
     */
    private _showCardTypeAnim(bAnim: boolean): void {
        let tRoundresult: pokermaster_proto.RoundResult = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult;

        this._img_left_card_type_bg.node.active = true;
        this._img_left_card_type.node.active = true;

        this._img_right_card_type_bg.node.active = true;
        this._img_right_card_type.node.active = true;

        let leftBgFrame: string = "";
        let rightBgFrame: string = "";

        let lefTypeFrame: string = "";
        let righTyperFrame: string = "";

        switch (tRoundresult.winOp) {
            case pokermaster_proto.BetZoneOption.FISHER_WIN: {
                leftBgFrame = "win_cardtype_bg";
                rightBgFrame = "lose_cardtype_bg";

                lefTypeFrame = this._getCardTypeFrameName(tRoundresult.fisherLevel);
                righTyperFrame = this._getCardTypeFrameName(tRoundresult.sharkLevel, true);
            } break;

            case pokermaster_proto.BetZoneOption.SHARK_WIN: {
                leftBgFrame = "lose_cardtype_bg";
                rightBgFrame = "win_cardtype_bg";

                lefTypeFrame = this._getCardTypeFrameName(tRoundresult.fisherLevel, true);
                righTyperFrame = this._getCardTypeFrameName(tRoundresult.sharkLevel);
            } break;

            case pokermaster_proto.BetZoneOption.EQUAL: {
                leftBgFrame = "win_cardtype_bg";
                rightBgFrame = "win_cardtype_bg";

                lefTypeFrame = this._getCardTypeFrameName(tRoundresult.fisherLevel);
                righTyperFrame = this._getCardTypeFrameName(tRoundresult.sharkLevel);
            } break;

            default: break;
        }

        this._img_left_card_type_bg.spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame(leftBgFrame);
        this._img_left_card_type.spriteFrame = this._atlas_cb_language.getSpriteFrame(lefTypeFrame);

        this._img_right_card_type_bg.spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame(rightBgFrame);
        this._img_right_card_type.spriteFrame = this._atlas_cb_language.getSpriteFrame(righTyperFrame);

        if (bAnim) {
            this._img_left_card_type_bg.node.scale = 0;
            this._img_left_card_type.node.scale = 0;

            this._img_right_card_type_bg.node.scale = 0;
            this._img_right_card_type.node.scale = 0;

            let st: cc.ActionInterval = cc.scaleTo(0.2, 1.0).easing(cc.easeInOut(1.0));
            this._img_left_card_type_bg.node.runAction(st);
            this._img_left_card_type.node.runAction(st.clone());
            this._img_right_card_type_bg.node.runAction(st.clone());
            this._img_right_card_type.node.runAction(st.clone());
        }
    }

    /**
     * 显示"角色"领先
     */
    private _showRoleLeadAnim(bAnim: boolean): void {
        // 谁领先 1 渔夫 -1 鲨鱼 0平局
        let uWhoIsLeader: number = pokerMasterDataMgr.getPokerMasterRoom().uWhoIsLeader;
        this._img_left_card_type_bg.node.active = false;
        this._img_left_card_type.node.active = false;

        this._img_right_card_type_bg.node.active = false;
        this._img_right_card_type.node.active = false;

        // 左领先
        if (uWhoIsLeader === 1) {
            this._img_left_card_type_bg.node.active = true;
            this._img_left_card_type_bg.spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame("win_cardtype_bg");

            this._img_left_card_type.node.active = true;
            this._img_left_card_type.spriteFrame = this._atlas_cb_language.getSpriteFrame("role_lead");
        }
        // 平
        else if (uWhoIsLeader === 0) {

        }
        // 右领先
        else if (uWhoIsLeader === -1) {
            this._img_right_card_type_bg.node.active = true;
            this._img_right_card_type_bg.spriteFrame = this._atlas_pm_pokermaster.getSpriteFrame("win_cardtype_bg");

            this._img_right_card_type.node.active = true;
            this._img_right_card_type.spriteFrame = this._atlas_cb_language.getSpriteFrame("role_lead");
        }

        // action
        if (bAnim) {
            let vAnimImgNode: cc.Node[] = [];
            vAnimImgNode.push(this._img_left_card_type.node);
            vAnimImgNode.push(this._img_left_card_type_bg.node);
            vAnimImgNode.push(this._img_right_card_type.node);
            vAnimImgNode.push(this._img_right_card_type_bg.node);

            for (let i = 0; i < vAnimImgNode.length; ++i) {
                if (!vAnimImgNode[i].active) continue;
                vAnimImgNode[i].setScale(0);
                vAnimImgNode[i].runAction(cc.scaleTo(0.2, 1.0).easing(cc.easeInOut(1.0)));
            }
        }
    }

    /**
     * 显示"角色"运势
     */
    private _updateRoleFortune(): void {
        let node_fortune: cc.Node = this._panel_card.getChildByName("node_fortune");

        // 横向偏移量(以左边为起点)
        let offset_w: number = 20;
        let getFortuneColor: (fortune: number) => cc.Color = (fortune: number): cc.Color => {
            let color: cc.Color = cc.Color.WHITE;
            if (fortune > 0) {
                color.setR(0xFF);
                color.setG(0x40);
                color.setB(0x00);
            }
            else {
                color.setR(0xFF);
                color.setG(0xFF);
                color.setB(0xFF);
            }
            return color;
        }

        // 左边"运势"
        do {
            let img_fortune_bg: cc.Node = node_fortune.getChildByName("img_left_fortune_bg");
            let img_fortune: cc.Node = node_fortune.getChildByName("img_left_fortune");
            let txt_fortune: cc.Label = node_fortune.getChildByName("txt_left_fortune").getComponent(cc.Label);
            let nFortune: number = MiniGameCommonDef.getNumberFixedDown(pokerMasterDataMgr.getPokerMasterRoom().fLeftFortune);
            let strFortune: string = cv.String(nFortune);
            if (strFortune !== txt_fortune.string) {
                txt_fortune.string = strFortune;
                txt_fortune.node.color = getFortuneColor(nFortune);

                // 位置运算
                let sz_img: cc.Size = img_fortune.getContentSize();
                let sz_txt: cc.Size = cv.resMgr.getLabelStringSize(txt_fortune);

                let total_w: number = sz_img.width + offset_w + sz_txt.width;
                let start_x: number = img_fortune_bg.position.x - img_fortune_bg.width * img_fortune_bg.anchorX + (img_fortune_bg.width - total_w) / 2;
                let px: number = start_x;
                let py: number = img_fortune.y;

                px += sz_img.width * img_fortune.anchorX;
                img_fortune.setPosition(px, py);
                px += sz_img.width * (1 - img_fortune.anchorX);
                px += offset_w;

                px += sz_txt.width * txt_fortune.node.anchorX;
                txt_fortune.node.setPosition(px, py);
            }
        } while (false);

        // 右边"运势"
        do {
            let img_fortune_bg: cc.Node = node_fortune.getChildByName("img_right_fortune_bg");
            let img_fortune: cc.Node = node_fortune.getChildByName("img_right_fortune");
            let txt_fortune: cc.Label = node_fortune.getChildByName("txt_right_fortune").getComponent(cc.Label);
            let nFortune: number = MiniGameCommonDef.getNumberFixedDown(pokerMasterDataMgr.getPokerMasterRoom().fRightFortune);
            let strFortune: string = cv.String(nFortune);
            if (strFortune !== txt_fortune.string) {
                txt_fortune.string = strFortune;
                txt_fortune.node.color = getFortuneColor(nFortune);

                // 位置运算
                let sz_img: cc.Size = img_fortune.getContentSize();
                let sz_txt: cc.Size = cv.resMgr.getLabelStringSize(txt_fortune);

                let total_w: number = sz_img.width + offset_w + sz_txt.width;
                let start_x: number = img_fortune_bg.position.x - img_fortune_bg.width * img_fortune_bg.anchorX + (img_fortune_bg.width - total_w) / 2;
                let px: number = start_x;
                let py: number = img_fortune.y;

                px += sz_img.width * img_fortune.anchorX;
                img_fortune.setPosition(px, py);
                px += sz_img.width * (1 - img_fortune.anchorX);
                px += offset_w;

                px += sz_txt.width * txt_fortune.node.anchorX;
                txt_fortune.node.setPosition(px, py);
            }
        } while (false);
    }

    /**
     * 重置牌型/领先
     */
    private _resetCardTypeOrRoleLead(): void {
        this._img_left_card_type_bg.node.setScale(1);
        this._img_left_card_type_bg.node.stopAllActions();
        this._img_left_card_type_bg.node.active = false;

        this._img_left_card_type.node.setScale(1);
        this._img_left_card_type.node.stopAllActions();
        this._img_left_card_type.node.active = false;

        this._img_right_card_type_bg.node.setScale(1);
        this._img_right_card_type_bg.node.stopAllActions();
        this._img_right_card_type_bg.node.active = false;

        this._img_right_card_type.node.setScale(1);
        this._img_right_card_type.node.stopAllActions();
        this._img_right_card_type.node.active = false;
    }

    /**
     * 显示"赔率"
     * @param betOption 
     * @param bAnim 
     */
    private _showOdds(betOption: pokermaster_proto.BetZoneOption, bAnim: boolean): void {
        let cb: (idx: number, odds: string) => void = (idx: number, odds: string): void => {
            if (idx >= 0 && idx < this._vAreasInfo.length) {
                this._vAreasInfo[idx].txtOdds.node.active = true;
                this._vAreasInfo[idx].txtOdds.string = odds;
            }
        }

        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        let odds: number = MiniGameCommonDef.getNumberFixedDown(zoneData.odds, 2);
        // let strOdds: string = `${odds}${cv.config.getStringData("Humanboy_game_fnt_anim_odd")}`;
        let strOdds: string = cv.String(odds) + (cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN ? ";" : "");

        let idx: number = this._getAreaIdxByBetOption(betOption);
        if (idx < 0 || idx >= this._vAreasInfo.length) return;

        if (bAnim) {
            let anim: cc.Animation = this._mapAnimShowOdds.get(betOption);
            if (anim) {
                anim.node.active = true;

                let txt_odds: cc.Label = anim.node.getChildByName("txt_odds").getComponent(cc.Label);
                txt_odds.string = strOdds;

                let clip: cc.AnimationClip = anim.defaultClip;
                clip.speed = MiniGameCommonDef.getAnimClipSpeedByDuring(clip, this._fActExecute_ShowOdds);
                clip.wrapMode = cc.WrapMode.Normal;

                anim.play();
                anim.targetOff(this);
                anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                    anim.targetOff(this);
                    anim.node.active = false;
                    cb(idx, strOdds);
                }, this);
            }
        }
        else {
            cb(idx, strOdds);
        }
    }

    /**
     * 隐藏"赔率"
     */
    private _hideOdds(betOption: pokermaster_proto.BetZoneOption): void {
        let idx: number = this._getAreaIdxByBetOption(betOption);
        if (idx < 0 || idx >= this._vAreasInfo.length) return;

        this._vAreasInfo[idx].txtOdds.string = "";

        this._vAreasInfo[idx].txtOdds.node.active = false;

        let anim: cc.Animation = this._mapAnimShowOdds.get(betOption);
        this._stopTimelineAnims(anim);
    }

    /**
     * 显示所有区域"赔率"
     */
    private _showAllOdds(bAnim: boolean): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._showOdds(this._vAreasInfo[i].zoneOption, bAnim);
        }
    }

    /**
     * 隐藏所有区域"赔率"
     */
    private _hideAllOdds(): void {
        this._mapAnimShowOdds.forEach((option: pokermaster_proto.BetZoneOption, anim: cc.Animation): void => {
            this._hideOdds(option);
        });
    }

    /**
     * 显示玩家胜利头像框光环动画
     * @param uid 
     * @param fDelayTime 
     */
    private _showWinPlayerLightAnim(uid: number, fDelayTime: number): void {
        let vPlayerHeads: cc.Node[] = this._getPlayerHeadNodesByUid(uid);
        if (vPlayerHeads.length <= 0) return;

        let callFunc: Function = (): void => {
            for (let i = 0; i < vPlayerHeads.length; ++i) {
                let head: cc.Node = vPlayerHeads[i];

                // 自己不显示光环
                if (head === this._img_self_head.node) continue;

                let win_node: cc.Node = cc.find("win_player_light", head);
                if (win_node && cc.isValid(win_node, true)) {
                    head.removeChild(win_node);
                    win_node.destroy();
                }

                let winPlayerLightAnim: cc.Node = cc.instantiate(this.prefab_cb_win_player_light);
                head.addChild(winPlayerLightAnim);

                winPlayerLightAnim.active = true;
                winPlayerLightAnim.name = "win_player_light";
                winPlayerLightAnim.setPosition(cc.Vec2.ZERO);
                winPlayerLightAnim.zIndex = 10;

                let winPlayerLightAction: cc.Animation = winPlayerLightAnim.getComponent(cc.Animation);
                winPlayerLightAction.defaultClip.wrapMode = cc.WrapMode.Loop;
                winPlayerLightAction.play();
            }
        };

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayTime), cc.callFunc(callFunc, this)));
    }

    /**
     * 隐藏所有玩家胜利头像框光环动画
     */
    private _hideAllWinPlayerLightAnim(): void {
        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            let node: cc.Node = cc.find("win_player_light", this._vOtherPlayerInfo[i].nodeHead);
            if (node && cc.isValid(node, true)) {
                this._vOtherPlayerInfo[i].nodeHead.removeChild(node);
                node.destroy();
            }
        }
    }

    /**
     * 飞金币动画以金币精灵为起始点/终点
     * @param uid 
     */
    private _getPlayerCoinNodesByUid(uid: number): cc.Node[] {
        let ret: cc.Node[] = [];

        // 富豪和神算子是自己时, 记录一次
        if (uid === cv.dataHandler.getUserData().u32Uid) {
            ret.push(this._img_self_gold.node);
        }

        // 左右侧玩家列表, 再次检测记录一次
        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            if (uid > 0 && this._vOtherPlayerInfo[i].uid === uid) {
                ret.push(this._vOtherPlayerInfo[i].nodeHead);
            }
        }

        return ret;
    }

    /**
     * 飞金币动画以头像精灵为起始点/终点
     * @param uid 
     */
    private _getPlayerHeadNodesByUid(uid: number): cc.Node[] {
        let ret: cc.Node[] = [];

        // 富豪和神算子是自己时, 记录一次
        if (uid === cv.dataHandler.getUserData().u32Uid) {
            ret.push(this._img_self_head.node);
        }

        // 左右侧玩家列表, 再次检测记录一次
        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            if (uid > 0 && this._vOtherPlayerInfo[i].uid === uid) {
                ret.push(this._vOtherPlayerInfo[i].nodeHead);
            }
        }

        return ret;
    }

    /**
     * 根据下注金额拆分多个筹码金额
     * @param gold 
     */
    private _getBetDetailAmounts(gold: number): number[] {
        let vAmountLevels: number[] = pokerMasterDataMgr.getPokerMasterRoom().tCurRoom.totalAmountLevel;
        return MiniGameCommonDef.disinteBetAmounts(gold, vAmountLevels);
    }

    /**
     * 隐藏"赢/输"区域金币
     * @param bWinOrLose 
     */
    private _hideAreaCoinsAnim(bWinOrLose: boolean): void {
        let resultOption: pokermaster_proto.BetZoneOption = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult.winOp;
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            let option: pokermaster_proto.BetZoneOption = this._vAreasInfo[i].zoneOption;
            let deque: Deque<HumanboyBetCoin> = this._mapCoinQueue.get(option);
            let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(option);
            if (!deque || !zoneData) return;

            let equalRes = (option == pokermaster_proto.BetZoneOption.FISHER_WIN || option == pokermaster_proto.BetZoneOption.SHARK_WIN) && resultOption == pokermaster_proto.BetZoneOption.EQUAL;
            if (!bWinOrLose && equalRes) continue;

            let result: number = zoneData.result;
            if ((bWinOrLose && result === 1) || (!bWinOrLose && result === 0) || (bWinOrLose && equalRes)) {
                for (let idx = 0; idx < deque.size(); ++idx) {
                    let coin: HumanboyBetCoin = deque.at(idx);
                    if (!coin.node.active) continue;
                    let sequence: cc.ActionInterval = cc.sequence(cc.fadeOut(this._fActDelayed_FlyWinCoin), cc.callFunc((): void => { coin.node.active = false; }));
                    coin.node.runAction(sequence);
                }
            }
        }
    }

    /**
     * 从系统向击中区域吐金币
     * @param anim 
     */
    private _showCoinToWinAreaFromSystem(anim: boolean = true): void {
        let vSettles: pokermaster_proto.PlayerSettle[] = [];
        for (let i = 0; i < pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles.length; ++i) {
            vSettles.push(pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles[i]);
        }
        vSettles.push(pokerMasterDataMgr.getPokerMasterRoom().tOtherPlayerSettle);

        for (let i = 0; i < vSettles.length; ++i) {
            let tSettle: Readonly<pokermaster_proto.PlayerSettle> = vSettles[i];
            for (let j = 0; j < tSettle.settle.length; ++j) {
                let zoneDetail: pokermaster_proto.IZoneSettleDetail = tSettle.settle[j];
                let winAmount: number = zoneDetail.winAmount;
                if (winAmount <= 0) continue;

                // 减去该区域已下注的金币
                winAmount -= zoneDetail.betAmount;

                let nAreaIdx: number = this._getAreaIdxByBetOption(zoneDetail.option);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) continue;

                let panelCoin: cc.Node = this._vAreasInfo[nAreaIdx].panelCoin;
                let world_pos: cc.Vec2 = cc.Vec2.ZERO;
                panelCoin.convertToWorldSpaceAR(cc.Vec2.ZERO, world_pos);
                let vAmountlevel: number[] = this._getBetDetailAmounts(winAmount);
                for (let k = 0; k < vAmountlevel.length; ++k) {
                    let fDelayedTime: number = 0.2 + k * 0.02;
                    this._showCoinToWinAreaFromPos(world_pos, nAreaIdx, vAmountlevel[k], anim, fDelayedTime);
                }
            }
        }
    }

    /**
     * 从指定位置朝目标区域飞金币动画
     * @param world_pos 
     * @param nAreaIdx 
     * @param gold 
     * @param anim 
     * @param fDelayedTime 
     * @param cb 
     */
    private _showCoinToWinAreaFromPos(world_pos: cc.Vec2, nAreaIdx: number, gold: number, anim: boolean, fDelayedTime: number, cb: () => void = null): void {
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let coin: HumanboyBetCoin = this._getCoinFromPool(nAreaIdx, gold);
        if (!coin) return;

        let coinFlyFromPos: cc.Vec2 = cc.Vec2.ZERO;
        coin.node.parent.convertToNodeSpaceAR(world_pos, coinFlyFromPos);
        let coinFlyDestPos: cc.Vec2 = this._getCoinRandomPos(coin.node, nAreaIdx, true);
        coin.node.parent.convertToNodeSpaceAR(coinFlyDestPos, coinFlyDestPos);
        if (anim) {
            coin.node.setPosition(coinFlyFromPos);
            this.scheduleOnce((elapsed: number): void => {
                coin.node.active = true;
                coin.node.runAction(cc.sequence(
                    cc.moveTo(0.5, coinFlyDestPos).easing(cc.easeOut(0.8)),
                    cc.rotateBy(0.15, 180),
                    cc.rotateBy(0.15, 180),
                    cc.callFunc(cb, this)));
            }, fDelayedTime);
        }
        else {
            coin.node.active = true;
            coin.node.setPosition(coinFlyDestPos);
            if (cb) cb();
        }
    }

    /**
    * 从对应位置向玩家飞金币(公用接口)
    * @param uid 
    * @param amount 
    * @param fromNode 
    * @param bRandomPos 
    * @param func 
    */
    private _showFlyCoinToPlayerAnim(uid: number, amount: number, fromNode: cc.Node, bRandomPos: boolean = true, func: () => void = null): void {
        if (amount <= 0 || !fromNode) return;

        // 飞往的目标节点数
        let vPlayerCoinNodes: cc.Node[] = this._getPlayerCoinNodesByUid(uid);

        // 桌面没有该玩家
        if (vPlayerCoinNodes.length === 0) {
            console.log(`showFlyCoinToPlayerAnim - playerSettles uid: ${uid} not in gameplayers, use player list button`);
            vPlayerCoinNodes.push(this._btn_playerList);
        }

        // 找出该玩家同时存在哪几个头像(一个玩家可以同时是富豪,神算子等)
        for (let i = 0; i < vPlayerCoinNodes.length; ++i) {
            // 自己是富豪/神算子， 只回收一次金币到自己头像
            if (uid === cv.dataHandler.getUserData().u32Uid && i > 0) { continue; }

            // 飞金币动画
            let fromHead: cc.Node = vPlayerCoinNodes[i];
            let vAmountlevel: number[] = this._getBetDetailAmounts(amount);
            for (let j = 0; j < vAmountlevel.length; ++j) {
                let flyCoin: HumanboyBetCoin = this._createFlyCoin(vAmountlevel[j]);
                this._nodeAnim.addChild(flyCoin.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_0);
                this.flyCoinToPlayerArr.push(flyCoin.node);

                let offset: cc.Vec2 = cc.Vec2.ZERO;
                if (bRandomPos) {
                    offset.x = cv.StringTools.randomRange(fromNode.width * 0.3, fromNode.width * 0.7) - fromNode.width * fromNode.anchorX;
                    offset.y = cv.StringTools.randomRange(fromNode.height * 0.3, fromNode.height * 0.7) - fromNode.height * fromNode.anchorY;
                }

                let coinFlyFromPos: cc.Vec2 = cc.Vec2.ZERO;
                fromNode.convertToWorldSpaceAR(offset, coinFlyFromPos);

                let coinFlyDestPos: cc.Vec2 = cc.Vec2.ZERO;
                fromHead.convertToWorldSpaceAR(cc.Vec2.ZERO, coinFlyDestPos);

                flyCoin.node.parent.convertToNodeSpaceAR(coinFlyFromPos, coinFlyFromPos);
                flyCoin.node.parent.convertToNodeSpaceAR(coinFlyDestPos, coinFlyDestPos);
                flyCoin.node.setPosition(coinFlyFromPos);
                // flyCoin.node.active = false;

                // 开始飞金币
                this.scheduleOnce((elapsed: number) => {
                    if (cv.tools.isValidNode(flyCoin)) {
                        flyCoin.node.active = true;
                        flyCoin.node.runAction(cc.sequence(cc.delayTime(0.2 + j * 0.02)
                            , cc.moveTo(0.5, coinFlyDestPos).easing(cc.easeOut(0.8))
                            , cc.destroySelf()));
                    }
                    else {
                        console.error("PokerMasterScene - _showFlyCoinToPlayerAnim: flyCoin.node isn't exist");
                    }
                }, this._fActDelayed_FlyWinCoin);
            }

            if (func && amount > 0) {
                // 头像弹性动画
                this._showHeadElasticAnim(fromHead, this._fActExecute_FlyWinCoin);

                // 赢的玩家头像光环
                this._showWinPlayerLightAnim(uid, this._fActExecute_FlyWinCoin);

                // 加金币动画
                this._showAddCoinAnim(fromHead, amount, this._fActExecute_FlyWinCoin, func);
            }
        }
    }

    /**
     * 加金币飘分动画(公用接口)
     * @param toNode 
     * @param amount 
     * @param fDelayTime 
     * @param func 
     */
    private _showAddCoinAnim(toNode: cc.Node, amount: number, fDelayTime: number, func: () => void = null): void {
        if (!toNode) return;

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayTime), cc.callFunc((): void => {
            let strTotalWinAmount: string = pokerMasterDataMgr.getPokerMasterRoom().transNumberToString(amount, 2, true);
            let flutterScore: HumanboyFlutterScore = cc.instantiate(this.prefab_hb_flutterScore).getComponent(HumanboyFlutterScore);
            flutterScore.node.setScale(1.4);
            this.node.addChild(flutterScore.node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_2);
            flutterScore.init(strTotalWinAmount);

            let pos: cc.Vec2 = cc.Vec2.ZERO;
            toNode.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);
            flutterScore.node.parent.convertToNodeSpaceAR(pos, pos);

            // 适配飘数字的位置
            do {
                let offset: number = 10;
                let extra_w: number = cc.winSize.width / 2 - Math.abs(pos.x);

                let w: number = flutterScore.node.width * flutterScore.node.scaleX;
                let h: number = flutterScore.node.height * flutterScore.node.scaleY;

                // 自己
                if (toNode === this._img_self_gold.node) {
                    let tmp_x = Math.max(0, w / 2 - extra_w);
                    pos.x += tmp_x;
                    pos.y += (toNode.height / 2 + offset);
                    //pos.y += (toNode.height / 2 + h / 2 + offset);
                }
                // 其他玩家
                else if (toNode === this._btn_playerList) {
                    let tmp_x = Math.max(0, w / 2 - extra_w);
                    pos.x -= tmp_x;
                    pos.y += (toNode.height / 2 + offset);
                    //pos.y += (toNode.height / 2 + h / 2 + offset);
                }
                // 左列表
                else if (pos.x < 0) {
                    pos.x += (toNode.width / 2 + w / 2 + offset);
                }
                // 右列表
                else if (pos.x > 0) {
                    pos.x -= (toNode.width / 2 + w / 2 + offset);
                }
            } while (0);

            flutterScore.node.setPosition(pos);
            flutterScore.show();
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActDelayed_FlyWinCoin), cc.callFunc(func, this)));
        }, this)));
    }

    /**
     * 头像弹性动画(公用接口)
     * @param toNode 
     * @param fDelayTime 
     */
    private _showHeadElasticAnim(toNode: cc.Node, fDelayTime: number): void {
        if (!toNode) return;

        let scaleRatio: number = toNode.scale;
        toNode.runAction(cc.sequence(cc.delayTime(fDelayTime)
            , cc.scaleTo(0.5, scaleRatio + 0.2).easing(cc.easeBackOut())
            , cc.scaleTo(0.2, scaleRatio - 0.2)
            , cc.scaleTo(0.5, scaleRatio).easing(cc.easeBackOut())));
    }

    /**
     * 显示所有赢区域金币回收动画
     */
    private _showAllAreaWinFlagsAndFlyCoinAnim(): void {
        // 隐藏赢的区域的下注金币
        this._hideAreaCoinsAnim(true);

        // 动画:在哪些选项赢了(增加除主界面8个人输赢外其它玩家列表的输赢)
        let vSettles: pokermaster_proto.PlayerSettle[] = [];
        for (let i = 0; i < pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles.length; ++i) {
            vSettles.push(pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles[i]);
        }
        vSettles.push(pokerMasterDataMgr.getPokerMasterRoom().tOtherPlayerSettle);

        for (let i = 0; i < vSettles.length; ++i) {
            let it: pokermaster_proto.PlayerSettle = vSettles[i];
            let uid: number = it.uid;
            let totalWinAmount: number = it.totalWinAmount;

            for (let idx = 0; idx < it.settle.length; ++idx) {
                let zoneSettleDetail: pokermaster_proto.IZoneSettleDetail = it.settle[idx];
                let option: pokermaster_proto.BetZoneOption = zoneSettleDetail.option;
                let nAreaIdx: number = this._getAreaIdxByBetOption(option);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) continue;

                let amount = zoneSettleDetail.winAmount;
                if (amount > 0) {
                    let panelCoin: cc.Node = this._vAreasInfo[nAreaIdx].panelCoin;
                    this._showFlyCoinToPlayerAnim(uid, amount, panelCoin, true);
                }
            }

            // 额外飘分等其他动画
            if (totalWinAmount > 0) {
                let vPlayerCoinNodes: cc.Node[] = this._getPlayerCoinNodesByUid(uid);

                // 桌面没有该玩家
                if (vPlayerCoinNodes.length === 0) {
                    console.log("playerSettles uid: %d not in gameplayers, use player list button", uid);
                    vPlayerCoinNodes.push(this._btn_playerList);
                }

                // 找出该玩家同时存在哪几个头像(一个玩家可以同时是富豪,神算子等)
                for (let idx = 0; idx < vPlayerCoinNodes.length; ++idx) {
                    // 自己是富豪/神算子, 只回收一次金币到自己头像
                    if (idx > 0 && uid === cv.dataHandler.getUserData().u32Uid) {
                        continue;
                    }

                    let fromHead: cc.Node = vPlayerCoinNodes[idx];

                    // 头像弹性动画
                    this._showHeadElasticAnim(fromHead, this._fActExecute_FlyWinCoin);

                    // 赢的玩家头像光环
                    this._showWinPlayerLightAnim(uid, this._fActExecute_FlyWinCoin);

                    // 加金币动画
                    this._showAddCoinAnim(fromHead, totalWinAmount, this._fActExecute_FlyWinCoin);
                }
            }
        }
    }

    /**
     * 清除数据等(停止一些循环动画,音频之类的资源的状态等,否则直接切换场景会闪退)
     */
    private _clearData(): void {
        // 移除所有监听者
        this._removeObserver();

        // 停止所有音乐播放
        this._stopSound("", true);

        // 重置UI状态等
        this._resetAllUI();

        // 清除房间数据结构等
        pokerMasterDataMgr.getPokerMasterRoom().reset();

        // 清理所有网络消息注册
        cv.pokerMasterNet.unregisterNetMsgs();

        // 清理命名空间实例引用
        PokerMasterDef.clear();
    }

    /**
     * 返回房间列表
     */
    private _backToRoomListScene(): void {
        // 断开连接
        cv.netWorkManager.closeGameConnect();

        // 清除数据
        this._clearData();

        cv.viewAdaptive.isselfchange = false;
        cv.viewAdaptive.humanboyroomid = 0;

        // 回到房间列表
        cv.roomManager.reset();
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
            cv.MessageCenter.send(PokerMasterDef.LocalMsg().SWITCH_SCENE_TO_MINIGAME);
        });
    }

    /**
     * 返回主场景
     * @param tips 
     */
    private _backToMainScene(tips: string): void {
        // 断开连接
        cv.netWorkManager.closeGameConnect();

        // 清除数据
        this._clearData();

        // 标记提示语
        pokerMasterDataMgr.getPokerMasterRoom().sBackToMainTips = cv.String(tips);

        // 回到大厅
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }

    /**
     * 播放音效
     * @param fileName 
     * @param loop 
     */
    private _playSoundEffect(fileName: string, loop: boolean = false): void {
        if (cv.tools.isSoundEffectOpen()) {
            if (!this._mapSounds.has(fileName)) {
                this._mapSounds.add(fileName, true);
            }
            cv.AudioMgr.playEffect(fileName, loop);
        }
    }

    /**
     * 暂停音频
     * @param fileName 
     * @param all 
     */
    private _pauseSound(fileName: string, all: boolean = false): void {
        if (all) {
            this._mapSounds.forEach((key: string, value: boolean, i?: number): any => {
                let audioID: number = cv.AudioMgr.getAudioID(key);
                cv.AudioMgr.pause(audioID);
            });
        }
        else {
            if (!this._mapSounds.has(fileName)) return;
            let audioID: number = cv.AudioMgr.getAudioID(fileName);
            cv.AudioMgr.pause(audioID);
        }
    }

    /**
     * 恢复音频
     * @param fileName 
     * @param all 
     */
    private _resumeSound(fileName: string, all: boolean = false): void {
        if (all) {
            this._mapSounds.forEach((key: string, value: boolean, i?: number): any => {
                let audioID: number = cv.AudioMgr.getAudioID(key);
                cv.AudioMgr.resume(audioID);
            });
        }
        else {
            if (!this._mapSounds.has(fileName)) return;
            let audioID: number = cv.AudioMgr.getAudioID(fileName);
            cv.AudioMgr.resume(audioID);
        }
    }

    /**
     * 停止播放音频
     * @param fileName 
     * @param all 
     */
    private _stopSound(fileName: string, all: boolean = false): void {
        if (all) {
            this._mapSounds.forEach((key: string, value: boolean, i?: number): any => {
                let audioID: number = cv.AudioMgr.getAudioID(key);
                cv.AudioMgr.stop(audioID);
            });
        }
        else {
            if (!this._mapSounds.has(fileName)) return;
            let audioID: number = cv.AudioMgr.getAudioID(fileName);
            cv.AudioMgr.stop(audioID);
        }
    }

    /**
     * 重置下个状态的截止时间
     */
    private _resetLeftTime(): void {
        this._nLeftTime = pokerMasterDataMgr.getPokerMasterRoom().llLeftSeconds;

        this._msNowTime = 0;
        this._msLastTime = 0;
    }

    /**
     * 获取下个状态的截止时间
     */
    private _getLeftTime(): number {
        return this._nLeftTime;
    }

    /**
     * 显/隐下注计倒计时闹钟动画
     * @param bShow 
     * @param bAnim 
     */
    private _showBetClockAction(bShow: boolean, bAnim: boolean = true): void {
        // 复原
        this._img_bet_clock.active = true;
        this._img_bet_clock.stopAllActions();
        this._img_bet_clock.setPosition(this._img_bet_clock_src_pos);

        let worldPos: cc.Vec2 = cc.v2(0, cc.winSize.height / 2 + this._img_bet_clock.height / 2);
        this.node.convertToWorldSpaceAR(worldPos, worldPos);
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this._img_bet_clock.parent.convertToNodeSpaceAR(worldPos, nodePos);
        let pos: cc.Vec2 = cc.v2(this._img_bet_clock_src_pos.x, nodePos.y);

        let ftn_clock: cc.Label = this._img_bet_clock.getChildByName("txt").getComponent(cc.Label);
        ftn_clock.string = "1";

        if (bShow) {
            if (bAnim) {
                this._img_bet_clock.setPosition(pos);
                let mt: cc.ActionInterval = cc.moveTo(this._fActExecute_BetClock, this._img_bet_clock_src_pos);
                let ebo: cc.ActionInterval = mt.easing(cc.easeBackOut());
                this._img_bet_clock.runAction(ebo);
            }
            else {
                this._img_bet_clock.setPosition(this._img_bet_clock_src_pos);
            }
            ftn_clock.string = cv.StringTools.formatC("%lld", this._getLeftTime());
        }
        else {
            if (bAnim) {
                this._img_bet_clock.setPosition(this._img_bet_clock_src_pos);
                let mt: cc.ActionInterval = cc.moveTo(this._fActExecute_BetClock, pos);
                let ebi: cc.ActionInterval = mt.easing(cc.easeBackIn());
                this._img_bet_clock.runAction(cc.sequence(ebi, cc.callFunc((): void => { this._img_bet_clock.active = false; })));
            }
            else {
                this._img_bet_clock.setPosition(this._img_bet_clock_src_pos);
                this._img_bet_clock.active = false;
            }
        }
    }

    /**
     * 开始倒计时
     */
    private _startTimeBetClock(): void {
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET && this._getLeftTime() > 0) {
            this.schedule(this._onTimeBetClock, 1.0);
            this._showBetClockAction(true, true);
        }
    }

    /**
     * 停止倒计时
     */
    private _stopTimeBetClock(bAnim: boolean = false): void {
        this.unschedule(this._onTimeBetClock);
        this._showBetClockAction(false, bAnim);
    }

    /**
     * 更新下注倒计时
     * @param f32Delta 
     */
    private _onTimeBetClock(f32Delta: number): void {
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET && this._getLeftTime() > 0) {
            this._playSoundEffect(PokerMasterDef.Sounds().sound_time_tick);
            this._showBetClockAction(true, false);
        }
        else {
            this._stopTimeBetClock(true);
        }
    }

    /**
     * 开始"等待下局"计时
     */
    private _startWaittingNextRound(): void {
        let nLeftTime: number = this._getLeftTime();
        let eCurState: pokermaster_proto.RoundState = pokerMasterDataMgr.getPokerMasterRoom().eCurState;
        if (eCurState === pokermaster_proto.RoundState.WAIT_NEXT_ROUND && nLeftTime >= 0) {
            this.unschedule(this._onTimeWaittingNextRound);
            this.schedule(this._onTimeWaittingNextRound, 1.0);
            this._updateCountDownClock(true, nLeftTime);
        }
    }

    /**
     * 停止"等待下局"计时
     */
    private _stopWaittingNextRound(): void {
        this.unschedule(this._onTimeWaittingNextRound);
        this._updateCountDownClock(false, 0);
    }

    /**
     * 更新"等待下局"计时
     */
    private _onTimeWaittingNextRound(): void {
        let nLeftTime: number = this._getLeftTime();
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.WAIT_NEXT_ROUND && nLeftTime > 0) {
            this._updateCountDownClock(true, nLeftTime);
        }
        else {
            this._stopWaittingNextRound();
        }
    }

    /**
     * 开始"下局即将开始"计时
     */
    private _startPrepareNextRound(): void {
        // 维护状态:非0代表系统即将维护
        if (pokerMasterDataMgr.getPokerMasterRoom().nStopWorld != 0) {
            this._showGameToast(cv.config.getStringData("Humanboy_server_will_stop_text"));
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc((): void => {
                this._backToRoomListScene();
            }, this)));
        }
        // 下一局即将开始
        else {
            let nLeftTime: number = this._getLeftTime();
            let eCurState: pokermaster_proto.RoundState = pokerMasterDataMgr.getPokerMasterRoom().eCurState;
            if (eCurState === pokermaster_proto.RoundState.READY_GAME && nLeftTime > 0) {
                this.unschedule(this._onTimePrepareNextRound);
                this.schedule(this._onTimePrepareNextRound, 1.0);
                this._updateCountDownClock(true, nLeftTime);
            }
        }
    }

    /**
     * 停止"下局即将开始"计时
     */
    private _stopPrepareNextRound(): void {
        this.unschedule(this._onTimePrepareNextRound);
        this._updateCountDownClock(false, 0);
    }

    /**
     * 更新"下局即将开始"计时
     */
    private _onTimePrepareNextRound(): void {
        let nLeftTime: number = this._getLeftTime();
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.READY_GAME && nLeftTime > 0) {
            this._updateCountDownClock(true, nLeftTime);
        }
        else {
            this._stopPrepareNextRound();
        }
    }

    /**
     * 耐心等待下一局/下局即将开始
     * @param bShow 
     * @param fDelta 
     */
    private _updateCountDownClock(bShow: boolean, fDelta: number): void {
        this._img_count_down.active = bShow;
        this._img_count_down.setPosition(this._img_count_down_src_pos);

        let txt: cc.Label = this._img_count_down.getChildByName("txt").getComponent(cc.Label);
        if (bShow) {
            switch (pokerMasterDataMgr.getPokerMasterRoom().eCurState) {
                // 耐心等待下一局
                case pokermaster_proto.RoundState.WAIT_NEXT_ROUND: {
                    txt.string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_tips_wait_next_enter_text"), fDelta);
                } break;

                // 下局即将开始
                case pokermaster_proto.RoundState.READY_GAME: {
                    txt.string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_tips_wait_next_round_text"), fDelta);
                } break;

                default: break;
            }

        }
        else {
            txt.string = "";
            this._img_count_down.setPosition(this._img_count_down_src_pos);
        }
    }

    /**
     * 动态游戏提示
     * @param strText           提示内容
     * @param nStrandedTime     滞留时间(默认0.5s)
     */
    private _showGameToast(strText: string, nStrandedTime: number = 0.5): void {
        let toast: HumanboyToast = cc.instantiate(this.prefab_hb_toast).getComponent(HumanboyToast);
        toast.txt.string = strText;
        this.node.addChild(toast.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SERVER_TOAST);

        let move: cc.ActionInterval = cc.moveBy(1.0, cc.v2(0, 120));
        let fade: cc.ActionInterval = cc.fadeOut(0.8).easing(cc.easeInOut(1.0));
        toast.node.runAction(cc.sequence(move, cc.delayTime(cv.Number(nStrandedTime)), fade, cc.destroySelf()));
    }

    /** 显示投金币动画和头像抖动动画
    * @param nAreaIdx	对应区域索引
    * @param gold		金额
    * @param uid		玩家id
    * @param anim		是否动画(true:动画到目标位置, false: 直接显示到目标位置)
    * @param headAnim	是否显示头像抖动动画
    * @param playSound	是否播放音效
    * @param cb			回调函数
    */
    private _showCoinAnim(nAreaIdx: number, gold: number, uid: number, anim: boolean, headAnim: boolean, playSound: boolean, cb: () => void = null): void {
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;
        let option: pokermaster_proto.BetZoneOption = this._getBetOptionByAreaIdx(nAreaIdx);

        // 开始动画
        if (anim) {
            let vPlayerCoinNodes: cc.Node[] = this._getPlayerCoinNodesByUid(uid);
            if (cv.StringTools.getArrayLength(vPlayerCoinNodes) === 0) {
                console.log(`${PokerMasterScene.gClassName} showBetInAnim, cannot find valid headBg, use btnPlayerList, oneBet.uid: ${uid}`);
                vPlayerCoinNodes.push(this._btn_playerList);
            }

            let coinFlyFromPos: cc.Vec2 = cc.Vec2.ZERO;
            let coinFlyDestPos: cc.Vec2 = cc.Vec2.ZERO;
            for (let i = 0; i < vPlayerCoinNodes.length; ++i) {
                let fromHead: cc.Node = vPlayerCoinNodes[i];
                fromHead.parent.convertToWorldSpaceAR(fromHead.position, coinFlyFromPos);

                // 发射时头像抖动动画
                if (headAnim && fromHead != this._img_self_gold.node && cc.director.getActionManager().getNumberOfRunningActionsInTarget(fromHead) <= 0) {
                    // if (headAnim && fromHead != this._img_self_gold.node) {
                    let offset_x: number = 20;
                    let offset_y: number = 0;
                    let ac: cc.ActionInterval = null;
                    if (coinFlyFromPos.x < cc.winSize.width / 2) {
                        ac = cc.sequence(
                            cc.moveBy(0.1, cc.v2(-offset_x, 0)),
                            cc.moveBy(0.1, cc.v2(offset_x, offset_y)).easing(cc.easeInOut(1.0)));
                    }
                    else {
                        ac = cc.sequence(
                            cc.moveBy(0.1, cc.v2(offset_x, offset_y)),
                            cc.moveBy(0.1, cc.v2(-offset_x, offset_y)).easing(cc.easeInOut(1.0)))
                    }
                    if (ac) {
                        fromHead.runAction(ac);
                    }
                }

                // 富豪和神算子是自己的情况，只下一个金币和播放一次音效
                if (uid === cv.dataHandler.getUserData().u32Uid && i > 0) continue;

                // 飞金币动画方式
                do {
                    let coin: HumanboyBetCoin = this._getCoinFromPool(option, gold);
                    if (coin) {
                        coin.node.setPosition(coin.node.parent.convertToNodeSpaceAR(coinFlyFromPos));
                        if (i === 0) {
                            // 下注音效
                            if (playSound) {
                                let llRealGold: number = cv.StringTools.clientGoldByServer(gold);
                                let sound: string = llRealGold < pokerMasterDataMgr.getPokerMasterRoom().llCoinUICritical ? PokerMasterDef.Sounds().sound_betin : PokerMasterDef.Sounds().sound_betin_many;
                                this._playSoundEffect(sound);
                            }

                            // 动画
                            coinFlyDestPos = this._getCoinRandomPos(coin.node, nAreaIdx, true);
                            coin.node.parent.convertToNodeSpaceAR(coinFlyDestPos, coinFlyDestPos);

                            coin.node.active = true;
                            coin.node.runAction(cc.sequence(
                                //cc.moveTo(0.3, coinFlyDestPos).easing(cc.easeSineOut()),
                                cc.moveTo(0.3, coinFlyDestPos),
                                cc.rotateBy(0.15, 180),
                                cc.rotateBy(0.15, 180),
                                cc.callFunc(cb, this)));
                        }
                        else {
                            // 动画
                            coin.node.active = true;
                            coin.node.runAction(cc.sequence(
                                //cc.moveTo(0.3, coinFlyDestPos).easing(cc.easeSineOut()),
                                cc.moveTo(0.3, coinFlyDestPos),
                                cc.rotateBy(0.15, 180),
                                cc.rotateBy(0.15, 180),
                                cc.callFunc((): void => { coin.node.active = false; })));
                        }
                    }
                } while (0);
            }
        }
        else {
            let coin: HumanboyBetCoin = this._getCoinFromPool(option, gold);
            if (coin) {
                let coinFlyDestPos: cc.Vec2 = this._getCoinRandomPos(coin.node, nAreaIdx, true);
                coin.node.setPosition(coin.node.parent.convertToNodeSpaceAR(coinFlyDestPos));
                coin.node.active = true;
            }

            if (cb) cb();
        }
    }

    /**
     * 游戏开局动画: 开局(0 + 1.3) ==> 发牌(0 + 1.5) ==> 翻手牌(0 + 1.2) ==> 显示领先者(0 + 0.5)
     * @param step
     */
    private _gameStepsAnimStart(step: number = 0): void {
        let fDelayedTime: number = 0;

        switch (step) {
            // 开局动画
            case 0: {
                fDelayedTime += this._fActDelayed_RoundStart;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showRoundStartAnim();
                }, this)));
                fDelayedTime += this._fActExecute_RoundStart;
            }

            // 发牌动画
            case 1: {
                fDelayedTime += this._fActDelayed_SendCard;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._sendCardAnim();
                }, this)));
                fDelayedTime += this._fActExecute_SendCard;
            }

            // 翻手牌动画
            case 2: {
                fDelayedTime += this._fActDelayed_ShowHandCard;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showHandCardsAnim();
                }, this)));
                fDelayedTime += this._fActExecute_ShowHandCard;
            }

            // 显示领先者
            // case 3: {
            //     fDelayedTime += this._fActDelayed_ShowCardType;
            //     this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
            //         this._showRoleLeadAnim(true);
            //     }, this)));
            //     fDelayedTime += this._fActExecute_ShowCardType;
            // } break;

            default:
                break;
        }
    }

    /**
     * 游戏赔率动画: 赔率(0 + 1.0) ==> 开始下注(0 + 1.0)
     * @param step
     */
    private _gameStepsAnimOdds(step: number = 0): void {
        let fDelayedTime: number = 0;

        switch (step) {
            // 赔率动画
            case 0: {
                fDelayedTime += this._fActDelayed_ShowOdds;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showAllOdds(true);
                }, this)));
                fDelayedTime += this._fActExecute_ShowOdds;
            }

            // 开始下注动画
            case 1: {
                fDelayedTime += this._fActDelayed_StartBet;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showStartBetAnim();
                }, this)));
                fDelayedTime += this._fActExecute_Startbet;
            } break;

            default:
                break;
        }
    }

    /**
     * 停止下注: 停止下注(0.5 + 1) ==> 翻turn牌(0 + 0.5) ==> 显示领先(0 + 0.5) ==> 眯牌(0.5 + 5)
     * @param step
     */
    private _gameStepsAnimStopBet(step: number = 0): void {
        let fDelayedTime: number = 0;

        switch (step) {
            // 停止下注
            case 0: {
                fDelayedTime += this._fActDelayed_StopBet;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showStopBetAnim();
                }, this)));
                fDelayedTime += this._fActExecute_StopBet;
            }

            // 翻turn牌(前4张公共牌)
            case 1: {
                fDelayedTime += this._fActDelayed_ShowTurnCard;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showPublicHoleCardsAnim(4);
                }, this)));
                fDelayedTime += this._fActExecute_ShowTurnCard;
            }

            // 显示领先
            case 2: {
                fDelayedTime += this._fActDelayed_ShowCardType;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this.showTempPaixing(pokerMasterDataMgr.getPokerMasterRoom().fisherLevel, pokerMasterDataMgr.getPokerMasterRoom().sharkLevel);
                    this._showRoleLeadAnim(true);
                }, this)));
                fDelayedTime += this._fActExecute_ShowCardType;
            }

            // 眯牌
            case 3: {
                let river_card: pokermaster_proto.CardItem = pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards[4];
                this.preLoadCard(river_card.number, river_card.suit);
                let leftTime: number = this._getLeftTime() - this._fActDelayed_ShowRiverCard - this._fActExecute_ShowRiverCard;
                leftTime = Math.min(this._fActExecute_Squint_Card, leftTime);
                // 跳过眯牌
                if (pokerMasterDataMgr.getPokerMasterRoom().bSkipSquint) {
                    // fDelayedTime += this._fActDelayed_ShowRiverCard;
                    // this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    //     let river_idx: number = this._vPublicHoleCards.length - 1;
                    //     this._vPublicHoleCards[river_idx].SetContent(river_card.number, river_card.suit);
                    //     this._vPublicHoleCards[river_idx].Turn(true, this._fActExecute_ShowRiverCard - 0.3);
                    // }, this)));
                    // fDelayedTime += this._fActExecute_ShowRiverCard;
                    return;
                }
                if (leftTime >= 1) {
                    fDelayedTime += this._fActDelayed_Squint_Card;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                        this.isSquintCard = true;

                        if (this._humanboyMenu) {
                            this._humanboyMenu.hide(false);
                        }

                        if (this._humanboyRule) {
                            this._humanboyRule.onClose();
                        }

                        if (this._humanboySetting) {
                            this._humanboySetting.close();
                        }

                        if (this._humanboyAdvancedSetting) {
                            this._humanboyAdvancedSetting.hide();
                        }

                        if (this._humanboyAdvancedSetting) {
                            this._humanboyAdvancedSetting.hide();
                        }

                        let PokerMaster_Dialog = this.node.getChildByName("PokerMaster_Dialog");
                        if (PokerMaster_Dialog) {
                            PokerMaster_Dialog.getComponent(HumanboyDialog).close();
                        }

                        let PokerMaster_nodeExit = this.node.getChildByName("PokerMaster_nodeExit");
                        if (PokerMaster_nodeExit) {
                            PokerMaster_nodeExit.active = false;
                        }

                        if (this._pokerMasterChart) {
                            this._pokerMasterChart.close();
                        }

                        if (this._humanboyPlayerList) {
                            this._humanboyPlayerList.node.active = false;
                        }

                        if (this._pokerMasterReview) {
                            this._pokerMasterReview.autoHide(false);
                        }

                        if (this._luckButton) {
                            this._luckButton.hidePopup();
                        }

                        // 隐藏高级续投子面板
                        if (this._humanboyAdvancedAuto) {
                            this._humanboyAdvancedAuto.hideAdvanceAutoTips();
                            // this._humanboyAdvancedAuto.hideAdvanceAutoCount();
                            this._humanboyAdvancedAuto.hideSelectPanel(false);
                        }

                        let tipsNode = this.node.getChildByName("GAB_STYLE_ADVANCE_USING_tips");
                        if (tipsNode) {
                            tipsNode.getComponent(HumanboyDialog).close();
                        }


                        if (pokerMasterDataMgr.getPokerMasterRoom().bCanSquint) {
                            let tag = cv.TP.getTag();
                            if (tag != null) {
                                if (tag == "NoticeMTT_MatchBegin") {
                                    cv.TP.hideTipsPanel();
                                }
                            }
                        }

                        let strNodeName: string = "humanboy_dialog_recharge";
                        let dialogNode: cc.Node = this.node.getChildByName(strNodeName);
                        if (dialogNode) {
                            dialogNode.removeFromParent(true);
                            dialogNode.destroy();
                        }

                        this._squintCard.show(pokerMasterDataMgr.getPokerMasterRoom().bCanSquint, river_card.number, river_card.suit, leftTime, pokerMasterDataMgr.getPokerMasterRoom().sharkOuts, pokerMasterDataMgr.getPokerMasterRoom().dashiOuts, this.isIphoneX_area);
                    }, this)));
                    fDelayedTime += leftTime;
                }

                // 重置眯牌信息
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._resetSquintCardInfo();
                }, this)));
            } break;

            default:
                break;
        }
    }

    /**
     * 一手结束: 翻river牌(0.5 + 0.5) ==> 显示牌型(0 + 0.5) ==> 清除未击中区域金币(0 + 0.5) ==> win标记检测/路单(0 + 2) ==> 飞金币(3)
     * @param step 
     */
    private _gameStepsAnimRoundEnd(step: number = 0): void {
        let fDelayedTime: number = 0;
        let river_card: pokermaster_proto.CardItem = pokerMasterDataMgr.getPokerMasterRoom().vPublicHoleCards[4];

        switch (step) {
            // 翻river牌
            case 0: {
                // 翻river牌
                // fDelayedTime += this._fActDelayed_ShowRiverCard;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    let river_idx: number = this._vPublicHoleCards.length - 1;
                    this._vPublicHoleCards[river_idx].SetContent(river_card.number, river_card.suit);
                    this._vPublicHoleCards[river_idx].Turn(true);//, this._fActExecute_ShowRiverCard - 0.3
                    // this.scheduleOnce(() => {
                    this._playSoundEffect(PokerMasterDef.Sounds().sound_kaipai);
                    // }, this._fActExecute_ShowRiverCard - 0.3);
                }, this)));
                fDelayedTime += this._fActExecute_ShowRiverCard;
            }

            // 显示牌型动画
            case 1: {
                fDelayedTime += this._fActDelayed_ShowCardType;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime + 0.4), cc.callFunc((): void => {
                    this._updateWinCardGray();
                    this._showCardTypeAnim(true);
                    // }, this), cc.delayTime(0.3), cc.callFunc((): void => {
                    //     // this._updateWinCardGray();
                    //     this._showCardTypeAnim(true);
                }, this)));
                fDelayedTime += this._fActExecute_ShowCardType;
            }

            // 清除未击中区域金币
            case 2: {
                fDelayedTime += 0;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._hideAreaCoinsAnim(false);
                    this.playResultAni();
                }, this)));
                fDelayedTime += this._fActDelayed_FlyWinCoin;
            }

            // win动画/路单
            case 3: {
                // win

                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    if (!this.showSpecialCardTypeAnim()) {
                        this._showAllWinFlagAnim();
                    }
                }, this)));

                if (this.isResultSpecialCardType()) {
                    fDelayedTime += this._special_type_time;
                }


                // 路单
                fDelayedTime += this._fActDelayed_ShowWinFlag;

                // fDelayedTime += this._fActExecute_WinFlag;
            }

            // 飞金币
            case 4: {
                let bWinRecover: boolean = false;
                let vSettles: pokermaster_proto.PlayerSettle[] = [];
                for (let i = 0; i < pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles.length; ++i) {
                    vSettles.push(pokerMasterDataMgr.getPokerMasterRoom().vPlayerSettles[i]);
                }
                vSettles.push(pokerMasterDataMgr.getPokerMasterRoom().tOtherPlayerSettle);

                // 区域是否有钱回收
                for (let i = 0; i < vSettles.length; ++i) {
                    let playerSettle: pokermaster_proto.PlayerSettle = vSettles[i];
                    if (playerSettle.totalWinAmount > 0) {
                        bWinRecover = true;
                        break;
                    }
                }

                if (bWinRecover) {
                    // 从系统吐金币到对应击中区域 
                    // fDelayedTime += this._fActDelayed_FlyWinCoin;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                        this._showCoinToWinAreaFromSystem();
                    }, this)));
                    fDelayedTime += this._fActExecute_FlyWinCoin;

                    // 从对应区域飞金币给玩家
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                        this._hideAllWinFlagAnim();
                        this._playSoundEffect(PokerMasterDef.Sounds().sound_get_win_coin);
                        this._showAllAreaWinFlagsAndFlyCoinAnim();
                    }, this)));
                }

                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showTopWayOutAnim();
                    this._showAllWayOutAnim();
                }, this)));

                if (bWinRecover) {
                    fDelayedTime += this._fActExecute_FlyWinCoin;
                }
                // 更新玩家金币
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    // 更新玩家金币显示
                    this._updateAllPlayerGold();

                    // 更新所有玩家连胜状态
                    this._updateAllPlayerWinCount(true);

                    // 维护状态:非0代表系统即将维护
                    if (pokerMasterDataMgr.getPokerMasterRoom().nStopWorld != 0) {
                        let bTrue = pokerMasterDataMgr.getPokerMasterRoom().idle_roomid > 0;
                        if (!bTrue) {
                            this._showGameToast(cv.config.getStringData("Humanboy_server_will_stop_text"));
                        }
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc((): void => {
                            if (bTrue) {
                                this.showSwitchTable();
                            }
                            else {
                                this._backToRoomListScene();
                            }
                        }, this)));
                    }
                }, this)));
            } break;

            default:
                break;
        }
    }

    /**
     * 清屏(3)
     */
    private _gameStepsAnimReady(): void {
        this._resetAllUI();
        this._updateAllWayOut();
        this._startPrepareNextRound();
    }

    /**
     * 显示路单面板
     */
    private _showChart(): void {
        if (!this._pokerMasterChart) {
            this._pokerMasterChart = cc.instantiate(this.prefab_pm_chart).getComponent(PokerMasterChart);
            this.node.addChild(this._pokerMasterChart.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_RECORD);
        }
        else {
            this._pokerMasterChart.node.active = true;
        }
        cv.pokerMasterNet.requestTrend();
    }

    /**
     * 显示投注回顾面板
     * @param option 
     */
    private _showReview(): void {
        if (!this._pokerMasterReview) {
            this._pokerMasterReview = cc.instantiate(this.prefab_pm_review).getComponent(PokerMasterReview);
            this.node.addChild(this._pokerMasterReview.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_RECORD);
        }
        this._pokerMasterReview.autoShow();
    }

    /**
     * 更新下注额级别
     */
    private _updateBetAmountLevel(): void {
        let vBetCoinOption: number[] = pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption;
        for (let i = 0; i < vBetCoinOption.length; ++i) {
            if (i < this._nBetBtnNum) {
                let llAmountLevel: number = cv.StringTools.clientGoldByServer(vBetCoinOption[i]);
                this._vBetButtons[i].setTxtNum(cv.StringTools.numberToShowNumber(llAmountLevel));
                if (llAmountLevel < pokerMasterDataMgr.getPokerMasterRoom().llCoinUICritical) {
                    this._vBetButtons[i].setShape(HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_COIN);
                }
                else {
                    this._vBetButtons[i].setShape(HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_BLOCK);
                }
            }
            else {
                console.error(`${PokerMasterScene.gClassName} updateBetAmountLevel vBetCoinOption must be ${this._nBetBtnNum}, size: ${vBetCoinOption.length}`);
            }
        }

        switch (pokerMasterDataMgr.getPokerMasterRoom().eAutoLevel) {
            case pokermaster_proto.AutoBetLevel.Level_Normal: {
                this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL);
            } break;

            case pokermaster_proto.AutoBetLevel.Level_Advance: {
                if (pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount > 0) {
                    this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING);
                }
                else {
                    this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE);
                }
            } break;

            default:
                break;
        }

        this._adaptiveBetBtnPanel();
    }

    /**
     * 获取当前选中的下注额
     */
    private _getCurBetLevel(): number {
        if (this._nCurBetBtnIndex < 0) return 0;
        let vBetCoinOption: number[] = pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption;
        return vBetCoinOption[this._nCurBetBtnIndex];
    }

    /**
     * 通过下注选项获取下注区域索引
     * @param betOption 
     */
    private _getAreaIdxByBetOption(betOption: pokermaster_proto.BetZoneOption): number {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (this._vAreasInfo[i].zoneOption === betOption) {
                return this._vAreasInfo[i].zoneIndex;
            }
        }
        return -1;
    }

    /**
     * 通过下注区域索引获取下注选项
     * @param betOption 
     */
    private _getBetOptionByAreaIdx(betIdx: number): pokermaster_proto.BetZoneOption {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (this._vAreasInfo[i].zoneIndex === betIdx) {
                return this._vAreasInfo[i].zoneOption;
            }
        }
        return pokermaster_proto.BetZoneOption.BetZoneOption_DUMMY;
    }

    /**
     * 检测高级续投请求
     */
    private _checkAdvanceAutoReq(): void {
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState === pokermaster_proto.RoundState.BET && this._getAutoBetBtnStytle() === MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING) {
            if (this._humanboyAdvancedAuto) {
                this._humanboyAdvancedAuto.hideAdvanceAutoTips();
            }

            if (pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount < pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount) {
                cv.pokerMasterNet.reqAdvanceAutoBet();
            }
        }
    }

    /**
     * 点击金币区域下注
     * @param nAreaIdx 
     */
    private _onClickAreaCoinPanel(nAreaIdx: number): void {
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        // 可以下注
        let eCurState: pokermaster_proto.RoundState = pokerMasterDataMgr.getPokerMasterRoom().eCurState;
        if ((eCurState === pokermaster_proto.RoundState.BET) && this._getLeftTime() > 0) {
            if (this._nCurBetBtnIndex < 0) {
                this._showGameToast(cv.config.getStringData("Humanboy_not_select_betbtn"));
                return;
            }
            else {
                cv.pokerMasterNet.requestBet(this._vAreasInfo[nAreaIdx].zoneOption, this._getCurBetLevel());
            }
        }
        else {
            console.log(`${PokerMasterScene.gClassName} click betArea, cannot bet, curState: ${pokerMasterDataMgr.getPokerMasterRoom().eCurState}, left bet time: ${this._getLeftTime()}`);
            this._showGameToast(cv.config.getStringData("PokerMaster_ServerErrorCode51009"));
        }
    }

    /**
     * 切换指定场景前回调(切出该场景)
     * @param scene 
     */
    private _onMsgSwitchSceneBegan(sceneName: string): void {
        console.log(cv.StringTools.formatC("SwitchScene - From[%s] To [%s]", cv.Enum.SCENE.POKERMASTER_SCENE, sceneName));
        this._clearData();
    }

    /**
     * 充值
     * @param event 
     */
    private _onMsgRecharge(event: cc.Event.EventCustom): void {
        if (!cc.sys.isBrowser) {
            cv.viewAdaptive.isselfchange = true;
            cv.viewAdaptive.pokerMasterRoomID = pokerMasterDataMgr.getPokerMasterRoom().u32RoomId;
            this._backToMainScene("");
        }
        else {
            cv.SHOP.RechargeClick();
        }
    }

    /**
     * 设置声音改变
     */
    private _onMsgSoundSwitch(): void {
        if (cv.tools.isPlayMusic()) {
            cv.AudioMgr.playMusic(PokerMasterDef.Sounds().sound_bgm, true);
        }
        else {
            cv.AudioMgr.stopMusic();
        }
    }

    /**
     * 游戏内错误提示 
     */
    private _onMsgGameError(param?: any): void {
        let code: number = cv.Number(param);
        let strValue: string = `PokerMaster_ServerErrorCode${code}`;

        // 下注额小于最小下注额
        if (code === pokermaster_proto.ErrorCode.BET_TOO_SMALL) {
            let formatCoin: number = cv.StringTools.clientGoldByServer(pokerMasterDataMgr.getPokerMasterRoom().tCurRoom.smallBet);
            this._showGameToast(cv.StringTools.formatC(cv.config.getStringData(strValue), cv.StringTools.numberToString(formatCoin)));
        }
        else if (code == pokermaster_proto.ErrorCode.NO_BET) {

        }
        else {
            this._showGameToast(cv.config.getStringData(strValue));
        }
    }

    /**
     * 进入房间游戏数据同步
     */
    private _onMsgGameDataSyn(param?: any): void {
        let gameStatus: pokermaster_proto.RoundState = pokerMasterDataMgr.getPokerMasterRoom().eCurState;
        console.log(`${PokerMasterScene.gClassName} RoundState =  ${gameStatus}`);
        this._bSwitchTable = false;
        this.unscheduleAllCallbacks();
        if (this._nodeAnim) {
            this._nodeAnim.stopAllActions();
        }

        // 重置 UI
        this._resetAllUI();

        // 根据不同的游戏状态恢复游戏场景
        switch (gameStatus) {
            // 无
            case pokermaster_proto.RoundState.RoundState_DUMMY: break;

            // 房间新建的，准备开局( do nothing )
            case pokermaster_proto.RoundState.GAME_PENDING: {
            } break;

            // 新的一局
            case pokermaster_proto.RoundState.NEW_ROUND: {
                this._updateTopWayOut();
                this._updateAllWayOut();

                let leftTime: number = this._getLeftTime();
                if (leftTime >= this._fActExecute_RoundStart + this._fActExecute_SendCard
                    + this._fActDelayed_SendCard + this._fActExecute_SendCard
                    + this._fActDelayed_ShowHandCard + this._fActExecute_ShowHandCard
                    + this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType) {
                    this._gameStepsAnimStart(0);
                }
                else if (leftTime >= this._fActDelayed_SendCard + this._fActExecute_SendCard
                    + this._fActDelayed_ShowHandCard + this._fActExecute_ShowHandCard
                    + this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType) {
                    this._gameStepsAnimStart(1);
                }
                else if (leftTime >= this._fActDelayed_ShowHandCard + this._fActExecute_ShowHandCard
                    + this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType) {
                    this._setAllCardsVisible(true);
                    this._gameStepsAnimStart(2);
                }
                // else if (leftTime >= this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType) {
                //     this._setAllCardsVisible(true);
                //     this._gameStepsAnimStart(3);
                // }
                else {
                    this._setAllCardsVisible(true);
                    this._setAllHandsCardsFace(true);
                    this._showRoleLeadAnim(false);
                }
            } break;

            // 显示赔率
            case pokermaster_proto.RoundState.SHOW_ODDS: {
                this._updateTopWayOut();
                this._updateAllWayOut();
                this._setAllCardsVisible(true);
                this._setAllHandsCardsFace(true);
                this._showRoleLeadAnim(false);

                if (this._getLeftTime() >= this._fActDelayed_ShowOdds + this._fActExecute_ShowOdds
                    + this._fActDelayed_StartBet + this._fActExecute_Startbet) {
                    this._gameStepsAnimOdds(0);
                }
                else if (this._getLeftTime() >= this._fActDelayed_StartBet + this._fActExecute_Startbet) {
                    this._showAllOdds(false);
                    this._gameStepsAnimOdds(1);
                }
                else {
                    this._showAllOdds(false);
                }
            } break;

            // 开始下注
            case pokermaster_proto.RoundState.BET: {
                this._updateTopWayOut();
                this._updateAllWayOut();
                this._setAllCardsVisible(true);
                this._setAllHandsCardsFace(true);
                this._showRoleLeadAnim(false);

                this._showAllOdds(false);
                this._recoverAreasCoin(true);

                if (this._getLeftTime() >= this._fActDelayed_StartBet + this._fActExecute_Startbet) {
                    this._showStartBetAnim();
                }

                this._onMsgGameStatusStartBet(true);
            } break;

            // 停止下注
            case pokermaster_proto.RoundState.STOP_BET: {
                this._updateTopWayOut();
                this._updateAllWayOut();
                this._setAllCardsVisible(true);
                this._setAllHandsCardsFace(true);
                this._showRoleLeadAnim(false);

                this._showAllOdds(false);
                this._recoverAreasCoin(true);

                let leftTime: number = this._getLeftTime();
                if (leftTime >= this._fActDelayed_StopBet + this._fActExecute_StopBet
                    + this._fActDelayed_ShowTurnCard + this._fActExecute_ShowTurnCard
                    + this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType + this._miPai_time) {
                    this._gameStepsAnimStopBet(0);
                }
                else if (leftTime >= this._fActDelayed_ShowTurnCard + this._fActExecute_ShowTurnCard
                    + this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType + this._miPai_time) {
                    this._gameStepsAnimStopBet(1);
                }
                // else if (leftTime >= this._fActDelayed_ShowCardType + this._fActExecute_ShowCardType + this._miPai_time) {
                //     this._gameStepsAnimStopBet(2);
                // }
                else {
                    this._gameStepsAnimStopBet(3);
                    this._setAllPublicHoleCardsFace(true, true);

                    this.showTempPaixing(pokerMasterDataMgr.getPokerMasterRoom().fisherLevel, pokerMasterDataMgr.getPokerMasterRoom().sharkLevel);
                    // this._showRoleLeadAnim(false);
                }
            } break;

            // 一局结算
            case pokermaster_proto.RoundState.WAIT_NEXT_ROUND: {
                this._setAllCardsVisible(true);
                this._setAllCardsFace(true);
                this._showCardTypeAnim(false);
                this._updateWinCardGray();

                this._showAllOdds(false);
                let tempTime = this._getLeftTime();
                if (tempTime > 5) {
                    if (!this.showSpecialCardTypeAnim(tempTime - 3)) {
                        this._showAllWinFlagAnim();
                    }
                }
                else {
                    this._showAllWinFlagAnim();
                }

                // 路子动画
                if (this._getLeftTime() >= this._fActExecute_WayOutLight) {
                    this._updateTopWayOut(1);
                    this._showTopWayOutAnim();

                    this._updateAllWayOut(1);
                    this._showAllWayOutAnim();
                }
                else {
                    this._updateTopWayOut();
                    this._updateAllWayOut();
                }

                // 等待下局
                this._startWaittingNextRound();
            } break;

            // 清屏
            case pokermaster_proto.RoundState.READY_GAME: {
                this._updateTopWayOut();
                this._updateAllWayOut();
                this._startPrepareNextRound();
            } break;

            default:
                break;
        }
    }

    /**
     * 服务器踢人 
     */
    private _onMsgKick(param: pokermaster_proto.KickNotify): void {
        if (param.idle_roomid > 0) {
            if (!this._bSwitchTable) {
                pokerMasterDataMgr.getPokerMasterRoom().idle_roomid = param.idle_roomid;
                this.showSwitchTable();
            }
            return;
        }
        let eKickType: number = cv.Number(param.kickType);
        switch (eKickType) {
            case pokermaster_proto.Kick.Kick_DUMMY: {
            } break;

            // 太长时间没下注
            case pokermaster_proto.Kick.IDLE_LONG_TIME: {
                let tips: string = cv.config.getStringData("Humanboy_server_kick_long_time_text");
                this._backToMainScene(tips);
            } break;

            // 停服踢人
            case pokermaster_proto.Kick.Stop_World: {
                let tips: string = cv.config.getStringData("Humanboy_server_kick_stop_world_text");
                this._backToMainScene(tips);
            } break;

            default:
                break;
        }
    }

    /**
     * 下注级别变更 
     */
    private _onMsgBetAmountLevelChange(param?: any): void {
        this._updateBetAmountLevel();
        this._updateBetBtnState();
    }

    /**
     * 设置高级续投次数成功	 
     */
    private _onMsgAdvanceAutobetSet(param?: any): void {
        this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING);

        // 如果本局没有下注,且已勾选续投局数,则本局就生效一次
        if (!pokerMasterDataMgr.getPokerMasterRoom().bHasBetInCurRound && pokerMasterDataMgr.getPokerMasterRoom().bCanAuto) {
            this._checkAdvanceAutoReq();
        }
    }

    /**
     * 高级续投 
     */
    private _onMsgAdvanceAutobet(param?: any): void {
        let code: number = cv.Number(param);
        switch (code) {
            case pokermaster_proto.ErrorCode.OK: {
            } break;

            // 高级续投超出限红
            case pokermaster_proto.ErrorCode.AUTO_BET_EXCEED_LIMIT: {
                if (this._humanboyAdvancedAuto) {
                    this._humanboyAdvancedAuto.adaptAdvanceAutoTipsPos(this._btn_betAuto.node);
                    this._humanboyAdvancedAuto.showAdvanceAutoTips(cv.config.getStringData(cv.StringTools.formatC("PokerMaster_ServerErrorCode%d", code)));
                }
            } break;

            // 高级续投金额不足
            case pokermaster_proto.ErrorCode.AUTO_BET_NO_MONEY: {
                let strNodeName: string = "humanboy_dialog_recharge";
                let dialogNode: cc.Node = this.node.getChildByName(strNodeName);
                if (!dialogNode) {
                    dialogNode = cc.instantiate(this.prefab_hb_dialog);
                    dialogNode.name = strNodeName;
                    this.node.addChild(dialogNode, PokerMasterDef.LayerZorder.Z_IDX_PANEL_SERVER_TOAST);

                    dialogNode.getComponent(HumanboyDialog).show(cv.config.getStringData(cv.StringTools.formatC("PokerMaster_ServerErrorCode%d", code))
                        , cv.config.getStringData("CowBoy_btn_desc_auto_cancel")
                        , cv.config.getStringData("CowBoy_btn_desc_auto_recharge")
                        , (dialog: HumanboyDialog): void => { cv.pokerMasterNet.reqCancelAdvanceAutoBet(); }
                        , (dialog: HumanboyDialog): void => { cv.MessageCenter.send(PokerMasterDef.LocalMsg().MsgPrefix + PokerMasterDef.LocalMsg().RECHARGE); });
                }
            } break;

            default: {
                cv.MessageCenter.send(PokerMasterDef.LocalMsg().MsgPrefix + PokerMasterDef.LocalMsg().ERROR, code);
            } break;
        }

        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.adaptAdvanceAutoCountPos(this._btn_betAuto.node);
            this._humanboyAdvancedAuto.showAdvanceAutoCount();
        }
    }

    /**
     * 取消高级续投成功 
     */
    private _onMsgAdvanceAutobetCancel(param?: any): void {
        this._updateBetAmountLevel();
        this._updateBetBtnState();
    }

    /**
     * 房间变更通知(目前只针对赔率) 
     */
    private _onMsgRoomParamChange(param?: any): void {
        // this._updateBetOddsDetail();
    }

    /**
     * 新开一局
     */
    private _onMsgGameStatusDeal(param?: any): void {
        this._resetLeftTime();

        // 重置游戏视图
        // this._resetGameView();

        // 更新下注按钮和触摸状态
        this._updateBetBtnState();
        this._updateBetAreaTouchEnabled();

        // 更新自己信息
        this._updateSelfInfo();

        // 更新其他人信息
        this._updateOtherPlayersInfo();

        // 更新所有玩家连胜状态
        this._updateAllPlayerWinCount();

        // 开局动画
        this._gameStepsAnimStart();
    }

    /**
     * 显示赔率
     */
    private _onMsgGameStatusShowOdds(param?: any): void {
        this._resetLeftTime();
        this._gameStepsAnimOdds();
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc((): void => {
            this._showRoleLeadAnim(true);
        }, this)));
    }

    /**
     * 开始 turn 轮下注
     */
    private _onMsgGameStatusStartBet(isGameDataSyn?: boolean): void {
        isGameDataSyn = isGameDataSyn == true ? true : false;
        this._resetLeftTime();
        this._startTimeBetClock();

        // 更新区域触摸状态
        this._updateBetBtnState();
        this._updateBetAreaTouchEnabled();

        let autoReq = (isGameDataSyn == false) || (isGameDataSyn && pokerMasterDataMgr.getPokerMasterRoom().bCanAdvanceAuto);
        // 检测是否正在使用高级续投
        if (autoReq) {
            this._checkAdvanceAutoReq();
        }
    }

    /**
     * 停止 turn 轮下注
     * @param param
     */
    private _onMsgGameStatusStopBet(param?: any): void {
        this._resetLeftTime();
        this._stopTimeBetClock();

        this._updateBetBtnState(false);
        this._updateBetAreaTouchEnabled();

        this._gameStepsAnimStopBet();

        // 隐藏高级续投选择面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.hideSelectPanel(false);
        }
    }

    /**
     * 一局结束
     * @param param 
     */
    private _onMsgGameStatusRoundEnd(param?: any): void {
        this.playPointAni();
        this.showMttBeginMsg();
        this.resetTempPaixing();
        this._resetLeftTime();
        this._gameStepsAnimRoundEnd();
    }

    /**
     * 清屏准备
     * @param param 
     */
    private _onMsgGameStatusReady(param?: any): void {
        this._resetLeftTime();
        this._gameStepsAnimReady();
    }

    /**
     * 下注 
     */
    private _onMsgBet(param: pokermaster_proto.BetNotify): void {
        this._updateAutoBetBtnStatus();

        // 区域索引
        let nAreaIdx: number = this._getAreaIdxByBetOption(param.detail.option);

        // 常规下注阶段, 直接push金币队列
        let tCoinOptimization: tHumanboyCoinOptimization = new tHumanboyCoinOptimization();
        tCoinOptimization.nAreaIdx = nAreaIdx;
        tCoinOptimization.nGold = param.detail.betAmount;
        tCoinOptimization.nUid = param.uid;
        tCoinOptimization.bAnim = true;
        tCoinOptimization.bHeadAnim = true;
        tCoinOptimization.bPlaySound = true;
        this._vCoinOptimizationDeque.push_back(tCoinOptimization);
    }

    /**
     * 请求续投成功 
     */
    private _onMsgAutoBet(param?: any): void {
        this._updateBetBtnState();
    }

    /**
     * 合并续投动作结束 
     */
    private _onMsgMergeAutoBet(param: pokermaster_proto.MergeAutoBetNotify): void {
        let betSize: number = param.notify.length;
        this._updateBetBtnState();

        for (let i = 0; i < param.notify.length; ++i) {
            let uid: number = param.notify[i].uid;
            let betAmount: number = param.notify[i].detail.betAmount;
            let option: pokermaster_proto.BetZoneOption = param.notify[i].detail.option;
            let areaIdx: number = this._getAreaIdxByBetOption(option);

            // 动态增加金币池(主要用于优化续投大量金币体验)
            do {
                let nFreeCoinCount: number = this._getFreeCoinCountFromPool(option);
                //if(betSize > this._nAreaCoinLimitCountMin)
                if (betSize > nFreeCoinCount) {
                    //let nDiffCount: number = betSize - this._nAreaCoinLimitCountMin;
                    let nDiffCount: number = betSize - nFreeCoinCount;
                    let nFinalCount: number = Math.min(this._nAreaCoinLimitCountMin + nDiffCount, this._nAreaCoinLimitCountMax);
                    this._nAreaCoinLimitCountMin = nFinalCount;
                }
            } while (0);

            // 添加到金币队列, 按帧添加
            let tCoinOptimization: tHumanboyCoinOptimization = new tHumanboyCoinOptimization();
            tCoinOptimization.nAreaIdx = areaIdx;
            tCoinOptimization.nGold = betAmount;
            tCoinOptimization.nUid = uid;
            tCoinOptimization.bAnim = true;
            tCoinOptimization.bHeadAnim = true;
            tCoinOptimization.bPlaySound = true;
            this._vCoinOptimizationDeque.push_back(tCoinOptimization);
        }
    }

    /**
     * 更新玩家列表
     */
    private _onMsgPlayerList(params?: any): void {
        if (!this._humanboyPlayerList) {
            this._humanboyPlayerList = cc.instantiate(this.prefab_hb_playerList).getComponent(HumanboyList);
            this.node.addChild(this._humanboyPlayerList.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_RECORD);
            this._humanboyPlayerList.setPokerMasterData();
            this._humanboyPlayerList.displayCell(0);
        }
        else {
            this._humanboyPlayerList.node.active = true;
            this._humanboyPlayerList.setPokerMasterData();
            this._humanboyPlayerList.displayCell(-1);
        }
    }

    /**
     * 中奖,荣耀榜等提示
     */
    private _onMsgRewardTips(param?: any): void {
        if (!this._humanboyRewardTips) {
            let pos_x: number = (1 - this.node.anchorX) * this.node.width * this.node.scaleX;
            let pos_y: number = (1 - this.node.anchorY) * this.node.height * this.node.scaleY - 122;

            this._humanboyRewardTips = cc.instantiate(this.prefab_hb_rewardTips).getComponent(HumanboyRewardTips);
            this.node.addChild(this._humanboyRewardTips.node, PokerMasterDef.LayerZorder.Z_IDX_PANEL_REWRAD_TIP);
            this._humanboyRewardTips.node.setPosition(pos_x, pos_y);
        }

        let value: string = cv.String(param);
        this._humanboyRewardTips.show(value, 4);
    }

    /**
     * world服金币有变动通知
     */
    private _onMsgUpdateWorldServerGold(param?: any): void {
        // world服接收接口已过滤只发自己, 因此这里无需再次判断(同时没有别的需求, 所以也不用缓存下发的结构) 
        let llCurGold: number = cv.dataHandler.getUserData().total_amount;

        // 结算阶段跳过(否则会提前知道输赢结果)
        if (pokerMasterDataMgr.getPokerMasterRoom().bCanUpdateWorldServerGold) {
            // 更新自己金币信息
            pokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.curCoin = llCurGold;
            this._updatePlayerGold(cv.dataHandler.getUserData().u32Uid);

            // 更新其他人信息(因为自己有可能会在8人列表中)
            let bOnMainPlayerList: boolean = false;
            let vOtherPlayerInfo: pokermaster_proto.GamePlayer[] = pokerMasterDataMgr.getPokerMasterRoom().vOtherPlayer;
            for (let i = 0; i < vOtherPlayerInfo.length; ++i) {
                if (cv.dataHandler.getUserData().u32Uid === vOtherPlayerInfo[i].uid) {
                    bOnMainPlayerList = true;
                    vOtherPlayerInfo[i].curCoin = llCurGold;
                }
            }
            if (bOnMainPlayerList) {
                this._updateOtherPlayersInfo();
            }
        }
    }

    /**
     * 红包节开关通知
     */
    private _onMsgShowLuckButton() {
        if (!this._luckButton) {
            this._luckButton = cc.instantiate(this.prefab_luckButton).getComponent(LuckTurntablesButton);
            this._btn_redpacket_festival.addChild(this._luckButton.node);
            this._luckButton.node.setPosition(0, 0);
            let pos: cc.Vec2 = cc.Vec2.ZERO;
            this._img_self_gold.node.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);
            this._luckButton.setViewData(pos);
        }
        if (cv.dataHandler.getUserData().isShowLuckTurntables) {
            this._btn_redpacket_festival.active = true;
            this._luckButton.updateView(true, this._btn_redpacket_festival_layer);
        } else {
            this._btn_redpacket_festival.active = false;
        }

        // "红包节"提示层是否显隐
        this._btn_redpacket_festival_layer.active = this._btn_redpacket_festival.active;

        // "红包节"状态有变化, 适配底栏按钮位置
        this._adaptiveBetBtnPanel();
    }

    /**
     * 红包转盘中奖结果通知
     * @param id 
     */
    private _onMsgTurntableResultNotice(param: world_pb.LuckTurntableResultNotice) {
        let list: cc.Node[] = this._getPlayerCoinNodesByUid(param.uid);
        if (list.length <= 0) { list.push(this._btn_playerList); }

        for (let i = 0; i < list.length; i++) {
            // let node: cc.Node = list[i];
            // let pos: cc.Vec2 = cc.Vec2.ZERO;
            // node.getParent().convertToWorldSpaceAR(node.getPosition(), pos);
            // this._luckButton.showGoldMoveAction(pos, param.currency_type);

            this._luckButton.runGoldMoveAction(this._btn_redpacket_festival, list[i]);
        }
    }

    private _resetCardPos() {
        let len = this._vLeftHandCards.length;
        for (let i = 0; i < len; ++i) {
            this._vLeftHandCards[i].node.stopAllActions();
            this._vLeftHandCards[i].node.setPosition(this._vLeftHandCardsSrcPos[i]);
        }

        len = this._vRightHandCards.length;
        for (let i = 0; i < len; ++i) {
            this._vRightHandCards[i].node.stopAllActions();
            this._vRightHandCards[i].node.setPosition(this._vRightHandCardsSrcPos[i]);
        }

        len = this._vPublicHoleCards.length;
        for (let i = 0; i < len; ++i) {
            this._vPublicHoleCards[i].node.stopAllActions();
            this._vPublicHoleCards[i].node.setPosition(this._vPublicHoleCardsSrcPos[i]);
        }
    }

    showSpecialCardTypeAnim(playTime: number = 8.0): boolean {
        this.clearSpecialCardTypeAnim();
        if (!this.isResultSpecialCardType()) return false;
        let tRoundresult: pokermaster_proto.RoundResult = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult;

        let resultOption: pokermaster_proto.BetZoneOption = tRoundresult.winOp;

        let winLevel: number = 0;
        switch (resultOption) {
            case pokermaster_proto.BetZoneOption.FISHER_WIN: {
                winLevel = tRoundresult.fisherLevel;
            } break;

            case pokermaster_proto.BetZoneOption.SHARK_WIN: {
                winLevel = tRoundresult.sharkLevel;
            } break;

            case pokermaster_proto.BetZoneOption.EQUAL: {
                winLevel = tRoundresult.fisherLevel;
            } break;

            default: break;
        }

        let specialCardType = "";
        let zoneData: PokerMasterZoneData = pokerMasterDataMgr.getPokerMasterRoom().mapZoneData.get(pokermaster_proto.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4);

        let odds: number = MiniGameCommonDef.getNumberFixedDown(zoneData.odds, 2);
        let specialCardOdd = cv.String(odds) + (cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN ? ";" : "");
        if (winLevel == pokermaster_proto.HandLevel.HAND_SIJO)	// 金刚
        {
            specialCardType = "special_jingang";
        }
        else if (winLevel == pokermaster_proto.HandLevel.HAND_TONG_SHUN)	// 同花顺
        {
            specialCardType = "special_tonghuashun";
        }
        else if (winLevel == pokermaster_proto.HandLevel.HAND_KING)	// 皇家同花顺
        {
            specialCardType = "special_huangtong";
        }
        else {
            console.log("showSpecialCardTypeAnim, show special cardtype anim error1");
            return false;
        }

        let winAnim: cc.Node = this._nodeAnim.getChildByName("special_card_type_anim");
        let winAction: cc.Animation = null;
        if (!winAnim) {
            // 创建动画
            winAnim = cc.instantiate(this.special_card_type_prefab);
            this._nodeAnim.addChild(winAnim, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_1);
            winAnim.name = ("special_card_type_anim");
        }
        winAction = winAnim.getComponent(cc.Animation);
        winAnim.active = true;
        let atlas: cc.SpriteAtlas = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? this.special_card_type_PLIST : this.en_animation_PLIST;
        cv.resMgr.loadSpriteTextureByPlist(atlas, (winAnim.getChildByName("special_card_type")).getComponent(cc.Sprite), specialCardType);

        (winAnim.getChildByName("special_card_odd")).getComponent(cc.Label).string = specialCardOdd;

        if (playTime > 7.8) {
            this._playSoundEffect(this.s_special_card_type);
        }

        this.gotoFrameAndPlay(winAction, playTime);
        winAction.on("finished", (event: cc.Event): void => {
            winAction.off("finished");
            winAnim.active = false;
            this._showAllWinFlagAnim();
        });

        return true;
    }

    isResultSpecialCardType(): boolean {
        let tRoundresult: pokermaster_proto.RoundResult = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult;
        if (tRoundresult.sharkLevel >= pokermaster_proto.HandLevel.HAND_SIJO ||
            tRoundresult.fisherLevel >= pokermaster_proto.HandLevel.HAND_SIJO) {
            return true;
        }
        return false;
    }

    clearSpecialCardTypeAnim(): void {
        let special_card_type_anim = this._nodeAnim.getChildByName("special_card_type_anim");
        if (special_card_type_anim) {
            let winAction = special_card_type_anim.getComponent(cc.Animation);
            winAction.off("finished");
            winAction.stop();
            special_card_type_anim.active = false;
        }
    }

    gotoFrameAndPlay(ani: cc.Animation, playTime: number) {
        ani.play(ani.defaultClip.name, ani.defaultClip.duration - playTime);
    }

    initGuide(): void {
        let storeGuideKey = "master_has_show_guide_2";
        if (cv.tools.GetStringByCCFile(storeGuideKey) != "true") {
            // let panelRecord = (this._panel_top.getChildByName("panelRecord"));
            // let len = panelRecord.childrenCount;
            // for (let i = 0; i < len; i++) {
            //     this._recordDotsTemp.push((panelRecord.getChildByName(cv.StringTools.formatC("recordDot%d", i))).getComponent(cc.Sprite));
            // }

            if (!this._humanboyGuid) {
                this._humanboyGuid = cc.instantiate(this.prefab_hb_guid);
                this.node.addChild(this._humanboyGuid, PokerMasterDef.LayerZorder.Z_IDX_PANEL_GUID);
            }
            let guidLayer = this._humanboyGuid.getComponent(HumanboyGuid);
            guidLayer.setDescString(cv.config.getStringData("Cowboy_ludan_guide_text"));

            guidLayer.show(this._panel_top, () => {
                let hasShowGuide = "true";
                cv.tools.SaveStringByCCFile(storeGuideKey, hasShowGuide);

                this._showChart();
                this._playSoundEffect(PokerMasterDef.Sounds().sound_button);
                // cv.StringTools.clearArray(this._recordDotsTemp);
            }, true);
        }
    }

    playResultAni(): void {//0->平，1->大师胜，-1->shark胜
        this.resetResultAni();
        let resultOption: pokermaster_proto.BetZoneOption = pokerMasterDataMgr.getPokerMasterRoom().tRoundresult.winOp;
        let num = 0;
        switch (resultOption) {
            case pokermaster_proto.BetZoneOption.FISHER_WIN: {
                num = 1;
            } break;

            case pokermaster_proto.BetZoneOption.SHARK_WIN: {
                num = -1;
            } break;

            case pokermaster_proto.BetZoneOption.EQUAL: {
                num = 0;
            } break;

            default: break;
        }
        if (num == 0) return;
        let node_fisherman = cc.find("node_fisherman/img", this._panel_card);
        let node_shark = cc.find("node_shark/img", this._panel_card);
        node_shark.active = false;
        node_fisherman.active = false;
        let arr: cc.Animation[] = null;
        if (num == 1) {
            arr = [this._animSharkLose, this._animDashiWin];
        }
        else if (num == -1) {
            arr = [this._animSharkWin, this._animDashiLose];
        }
        else {
            return;
        }

        let len = arr.length;

        for (let i = 0; i < len; i++) {
            arr[i].node.active = true;
            arr[i].play();
            arr[i].on("finished", (event: cc.Event): void => {
                this.resetResultAni();
            });
        }
    }

    resetResultAni() {
        let node_fisherman = cc.find("node_fisherman/img", this._panel_card);
        let node_shark = cc.find("node_shark/img", this._panel_card);
        node_shark.active = true;
        node_fisherman.active = true;
        let arr: cc.Animation[] = [
            this._animDashiWin,
            this._animDashiLose,
            this._animSharkWin,
            this._animSharkLose];

        for (let i = 0; i < 4; i++) {
            if (!arr[i]) continue;
            arr[i].stop();
            arr[i].off("finished");
            arr[i].node.active = false;
        }
    }

    setNodePosByIphoneX(): void {
        let setPosFunc = (node: cc.Node) => {
            let diff = 100;
            if (node.x > 0) {
                node.setPosition(cc.winSize.width * 0.5 - 1920 * 0.5 + node.x - diff, node.y);
            }
            else {
                node.setPosition(-cc.winSize.width * 0.5 + 1920 * 0.5 + node.x + diff, node.y);
            }
        };
        let panel_card = this.node.getChildByName("panel_card");
        let node_fisherman = panel_card.getChildByName("node_fisherman");
        let node_shark = panel_card.getChildByName("node_shark");
        let node_fortune: cc.Node = panel_card.getChildByName("node_fortune");
        let img_left_fortune_bg = node_fortune.getChildByName("img_left_fortune_bg");
        let img_right_fortune_bg = node_fortune.getChildByName("img_right_fortune_bg");
        let img_left_fortune = node_fortune.getChildByName("img_left_fortune");
        let img_right_fortune = node_fortune.getChildByName("img_right_fortune");
        let txt_left_fortune = node_fortune.getChildByName("txt_left_fortune");
        let txt_right_fortune = node_fortune.getChildByName("txt_right_fortune");

        setPosFunc(node_fisherman);
        setPosFunc(node_shark);
        setPosFunc(img_left_fortune_bg);
        setPosFunc(img_right_fortune_bg);
        setPosFunc(img_left_fortune);
        setPosFunc(img_right_fortune);
        setPosFunc(txt_left_fortune);
        setPosFunc(txt_right_fortune);
    }

    showTempPaixing(fisherLevel: number, sharkLevel: number) {
        let temp_paixing = this.node.getChildByName("temp_paixing");
        if (fisherLevel <= pokermaster_proto.HandLevel.HAND_DUMMY
            || fisherLevel > pokermaster_proto.HandLevel.HAND_KING
            || sharkLevel <= pokermaster_proto.HandLevel.HAND_DUMMY
            || sharkLevel > pokermaster_proto.HandLevel.HAND_KING) {
            temp_paixing.active = false;
            return;
        }
        temp_paixing.active = true;
        let temp_bg_dashi = temp_paixing.getChildByName("temp_bg_dashi");
        let temp_bg_shark = temp_paixing.getChildByName("temp_bg_shark")
        let temp_lab_shark = temp_paixing.getChildByName("temp_lab_shark").getComponent(cc.Label);
        let temp_lab_dashi = temp_paixing.getChildByName("temp_lab_dashi").getComponent(cc.Label);
        let dsSize = cv.resMgr.getLabelStringSize(temp_lab_dashi, cv.config.getStringData(fisherLevel != 8 ? `M_UITitle${fisherLevel + 112}` : "Humanboy_game_card_type_four_of_a_kind"));
        let skSize = cv.resMgr.getLabelStringSize(temp_lab_shark, cv.config.getStringData(sharkLevel != 8 ? `M_UITitle${sharkLevel + 112}` : "Humanboy_game_card_type_four_of_a_kind"));

        let minWidth = 110;
        let diff = 24;
        let tempRes = minWidth - diff;
        temp_bg_dashi.setContentSize((dsSize.width <= tempRes ? minWidth : dsSize.width + diff), temp_bg_dashi.height);
        temp_bg_shark.setContentSize((skSize.width <= tempRes ? minWidth : skSize.width + diff), temp_bg_shark.height);
    }

    resetTempPaixing(): void {
        let temp_paixing = this.node.getChildByName("temp_paixing");
        if (temp_paixing) {
            temp_paixing.active = false;
        }
    }

    resetFlyCoinToPlayerArr() {
        for (let i = 0; i < this.flyCoinToPlayerArr.length; ++i) {
            let tempNode: cc.Node = this.flyCoinToPlayerArr[i];
            if (cv.tools.isValidNode(tempNode)) {
                tempNode.removeFromParent();
                tempNode.destroy();
            }
        }
        this.flyCoinToPlayerArr = [];
    }

    initTrendChangeAnim(): void {
        //let frameVector: cc.SpriteFrame[] = [];
        // let frameVector: [cc.SpriteFrame] = [null];
        // for (let i = 0; i < 8; i++) {
        //     let frameName = cv.StringTools.formatC("cowboy_trend_%d", i);
        //     let spriteFrame = this.cowboy_trend_anim_PLIST.getSpriteFrame(frameName);
        //     frameVector.push(spriteFrame);
        // }
        this.trend_anim = cc.AnimationClip.createWithSpriteFrames(this.cowboy_trend_anim_PLIST.getSpriteFrames(), 10);
        this.trend_anim.wrapMode = cc.WrapMode.Loop;
    }

    showTrendChangeAnim(): void {
        let img_record = this._panel_top.getChildByName("img_record");
        img_record.active = false;
        let trend_anim = this._panel_top.getChildByName("trend_anim");
        if (trend_anim) {
            trend_anim.removeFromParent(true);
            trend_anim.destroy();
        }
        let sprTrend = (new cc.Node()).addComponent(cc.Sprite);
        cv.resMgr.loadSpriteTextureByPlist(this.cowboy_trend_anim_PLIST, sprTrend, "cowboy_trend_0");
        sprTrend.node.name = ("trend_anim");
        sprTrend.node.setPosition(img_record.x - 1, img_record.y + 3);
        this._panel_top.addChild(sprTrend.node);
        let ani = sprTrend.node.addComponent(cc.Animation);
        // sprTrend.node.addChild(ani.node);
        ani.addClip(this.trend_anim, "trend_anim");
        ani.play("trend_anim");
        // sprTrend.node.runAction(cc.repeatForever(ani.play()));
    }

    hideTrendChangeAnim(): void {
        let img_record = this._panel_top.getChildByName("img_record");
        img_record.active = (true);
        let trend_anim = this._panel_top.getChildByName("trend_anim");
        if (trend_anim) {
            trend_anim.removeFromParent(true);
            trend_anim.destroy();
        }
    }

    /**
    * 游戏进入后台时触发的事件
    */
    OnAppEnterBackground(): void {
        //私语版本, 切回后台后，将所有音频暂停
        //if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cv.AudioMgr.stopMusic();
            cv.AudioMgr.pauseAll();
        } else {
            if (!cv.tools.isPlayMusic()) {
                cv.AudioMgr.play(this.silenceMusic, true, 0.5, true);
            }
        }
        cv.tools.setEnterbackState(true);

        // 解决结算飞金币时疯狂秒切前后台卡死的bug, 原因是依赖"this"的定时器回调后金币对象已被销毁
        // 停止根节点所有定时器和动画回调(暂时只能写在房间同步逻辑之前, 否则会造成音效循环播放bug)
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
    }

    /**
     * 游戏进入前台运行时触发的事件
     */
    OnAppEnterForeground(): void {
        //if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
        cv.tools.setEnterbackState(false);
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cv.AudioMgr.resumeAll();
            this._onMsgSoundSwitch();
        } else {
            if (!cv.tools.isPlayMusic()) {
                cv.AudioMgr.stop(cv.AudioMgr.getAudioID(this.silenceMusic));
            }
        }
        //}
    }

    NoticeMttMatchBegin(str: string) {

        this.mttbeginMsg = str;
        if (pokerMasterDataMgr.getPokerMasterRoom().eCurState == pokermaster_proto.RoundState.STOP_BET && !pokerMasterDataMgr.getPokerMasterRoom().bSkipSquint && pokerMasterDataMgr.getPokerMasterRoom().bCanSquint) {

        }
        else {
            this.showMttBeginMsg();
        }
    }

    showMttBeginMsg() {
        if (!this.mttbeginMsg) return;
        if (this.mttbeginMsg != "") {
            if (cv.roomManager.mtt_time > 10) {
                cv.TP.showMsg(this.mttbeginMsg, cv.Enum.ButtonStyle.GOLD_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                });
            }
            else {
                cv.TP.showMsg(this.mttbeginMsg, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                    cv.roomManager.isEnterMTT = true;
                    cv.roomManager.RequestLeaveRoom();
                }, () => {
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                    cv.roomManager.closeScheduleForMTT();
                });
                cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME);
                cv.roomManager.startScheduleForMTT();
            }

            cv.TP.setTag("NoticeMTT_MatchBegin");

            this.mttbeginMsg = "";
        }
    }

    preLoadCard(cardNum: number, cardSuit: number) {
        let frameName: string = this._getSquintCardFrameName(cardNum, cardSuit);
        frameName = "zh_CN/game/pokermaster/rubcard/" + frameName;
        cv.resMgr.load(frameName, cc.Texture2D, (res: cc.Texture2D): void => { }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
        cv.resMgr.load("zh_CN/game/pokermaster/rubcard/card_back", cc.Texture2D, (res: cc.Texture2D): void => { }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
    }

    private _getSquintCardFrameName(cardNumber: number, cardSuit: number): string {
        let suit: string = "";
        switch (cardSuit) {
            case cv.Enum.CardSuit.CARD_SPADE: suit = "Bhm_"; break;
            case cv.Enum.CardSuit.CARD_HEART: suit = "Rhm_"; break;
            case cv.Enum.CardSuit.CARD_CLUB: suit = "Bcm_"; break;
            case cv.Enum.CardSuit.CARD_DIAMOND: suit = "Rbm_"; break;
            default: suit = "Bhm_"; break;
        }
        return `${suit}${cardNumber + 1}`;
    }

    playPointAni() {
        let points_num = pokerMasterDataMgr.getPokerMasterRoom().change_points;
        if (points_num < 0) return;

        if (!this.points_node) {
            this.points_node = cc.instantiate(this.points_ani_prefab);
            this.node.addChild(this.points_node, PokerMasterDef.LayerZorder.Z_IDX_ANIM_NODE_3);
            this.points_node.setPosition(this.node.convertToNodeSpaceAR(this._img_self_head.node.parent.convertToWorldSpaceAR(this._img_self_head.node.position)));
            this.points_node.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                this.resetPointAni();
            }, this);
        }

        this.points_node.getComponent(HeadPointsAni).playPointAni(points_num);
    }

    resetPointAni() {
        pokerMasterDataMgr.getPokerMasterRoom().change_points = 0;
        if (this.points_node) {
            this.points_node.getComponent(HeadPointsAni).resetPointAni();
        }
    }

    setLeftAndRightList() {
        let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
        let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");
        let headBgWidth = panel_left_playerlist.getChildByName("img_bg_0").width;
        let bgPosY = [288, 92, -104, -300, -300];
        let headPosY = 15;
        let coinPosY = -67;
        let left_nb_flag = cc.v2(-4, 330);
        let right_nb_flag = cc.v2(-16, 333);
        let w4 = 22;//下注面板边缘存在3个间隙
        if (this.ispad) {
            bgPosY = [419, 205, -9, -223, -437];
            left_nb_flag = cc.v2(-4, 461);
            right_nb_flag = cc.v2(-16, 464);
        }
        else if (this._bOpenNarrowAdapter && this._bTrueFullScreen) {
            let baseWidth = cc.winSize.width - 2338;
            w4 = 96 + baseWidth * 0.5;
        }
        else {
            let baseWidth = cc.winSize.width - 1920;
            w4 = baseWidth > 0 ? 22 + baseWidth * 0.5 : 22;
        }
        panel_left_playerlist.getComponent(cc.Widget).left = w4 + headBgWidth * 0.5 - panel_left_playerlist.width * 0.5;
        panel_right_playerlist.getComponent(cc.Widget).right = w4 + headBgWidth * 0.5 - panel_right_playerlist.width * 0.5;
        cv.resMgr.adaptWidget(panel_left_playerlist);
        cv.resMgr.adaptWidget(panel_right_playerlist);

        for (let i = 0; i < 5; ++i) {
            let left_img = panel_left_playerlist.getChildByName(cv.StringTools.formatC("img_bg_%d", i));
            let left_nodeHead = panel_left_playerlist.getChildByName(cv.StringTools.formatC("node_head_%d", i));
            let left_txtCoin = panel_left_playerlist.getChildByName(cv.StringTools.formatC("text_coin_%d", i));

            let right_img = panel_right_playerlist.getChildByName(cv.StringTools.formatC("img_bg_%d", i));
            let right_nodeHead = panel_right_playerlist.getChildByName(cv.StringTools.formatC("node_head_%d", i));
            let right_txtCoin = panel_right_playerlist.getChildByName(cv.StringTools.formatC("text_coin_%d", i));

            left_img.setPosition(cc.v2(0, bgPosY[i]));
            left_nodeHead.setPosition(cc.v2(0, bgPosY[i] + headPosY));
            left_txtCoin.setPosition(cc.v2(0, bgPosY[i] + coinPosY));

            right_img.setPosition(cc.v2(0, bgPosY[i]));
            right_nodeHead.setPosition(cc.v2(0, bgPosY[i] + headPosY));
            right_txtCoin.setPosition(cc.v2(0, bgPosY[i] + coinPosY));

            if (i === 0) {
                let left_imgFlag = panel_left_playerlist.getChildByName("nb_flag");
                let right_imgFlag = panel_right_playerlist.getChildByName("nb_flag");

                left_imgFlag.setPosition(left_nb_flag);
                right_imgFlag.setPosition(right_nb_flag);
            }
        }
        // console.log("世界坐标: ")
        // for (let ix = 0; ix < panel_left_playerlist.childrenCount; ++ix) {
        //     let ch = panel_left_playerlist.children[ix];
        //     cv.tools.logObject(ch.getPosition(), ch.name);
        // }

        // let nb_flag = panel_right_playerlist.getChildByName("nb_flag");
        // cv.tools.logObject(nb_flag.getPosition(), "panel_right_playerlist:" + nb_flag.name);
    }

    showSwitchTable() {
        if (this._bSwitchTable) return;
        this._bSwitchTable = true;
        cv.TP.showMsg(cv.config.getStringData("MiniGames_Switch_content"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            cv.roomManager.setCurrentRoomID(pokerMasterDataMgr.getPokerMasterRoom().idle_roomid);
            cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            cv.roomManager.RequestJoinRoom();
        }, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            this._backToRoomListScene();
        });
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_SWITCH_TABLE);
    }


    //冷静倒计时
    onCalmDownShowTip(msg: any) {
        let CalmDownLeftSeconds = msg.CalmDownLeftSeconds;
        let CalmDownDeadLineTimeStamp = msg.CalmDownDeadLineTimeStamp;

        if (CalmDownLeftSeconds <= 0 || CalmDownDeadLineTimeStamp <= 0) {
            return;
        }

        if (CalmDownLeftSeconds > 0) {
            let _popSilence = popSilence.getSinglePrefabInst(this.popSilencePre);
            _popSilence.getComponent(popSilence).autoShow(cv.Enum.popSilenceType.countDownGame, msg, cc.director.getScene(), PokerMasterDef.LayerZorder.Z_IDX_PANEL_SERVER_TOAST);
        }
    }
}
