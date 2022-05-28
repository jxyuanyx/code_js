import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import { Deque } from "../../../common/tools/Deque";
import { TagCom } from "../../../common/tools/TagCom";
import { HashMap, KeyValue } from "../../../common/tools/HashMap";

import cv from "../../lobby/cv";
import CowboyCard from "../cowboy/CowboyCard";
import humanboyDataMgr from "./HumanboyDataMgr";
import LuckTurntablesButton from "../redEnvelope/LuckTurntablesButton";

import HumanboyExchange from "./HumanboyExchange";
import { CowboyRule } from "../cowboy/CowboyRule";
import { CowboySetting } from "../cowboy/CowboySetting";

import { MiniGameCommonDef } from "../common/define";
import { PlayerOneBet } from "../cowboy/CowboyRoomData";
import { JackPotNumber } from "../dzPoker/JackPotNumber";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";

import { HumanboyList } from "./HumanboyList";
import { HumanboyGuid } from "./HumanboyGuid";
import { HumanboyMenu } from "./HumanboyMenu";
import { HumanboyChart } from "./HumanboyChart";
import { HumanboyToast } from "./HumanboyToast";
import { HumanboyDialog } from "./HumanboyDialog";
import { HumanboyBetCoin } from "./HumanboyBetCoin";
import { HumanboyJackpot } from "./HumanboyJackpot";
import { HumanboyZoneData } from "./HumanboyRoomData";
import { HumanboyRewardTips } from "./HumanboyRewardTips";
import { HumanboyFlutterScore } from "./HumanboyFlutterScore";
import { HumanboyAdvancedAuto } from "./HumanboyAdvancedAuto";
import { HumanboyAdvancedSetting } from "./HumanboyAdvancedSetting";
import { eHumanboyDealerListViewType, HumanboyDealerList } from "./HumanboyDealerList";
import HeadPointsAni from "../cowboy/HeadPointsAni";
import popSilence from "../cowboy/PopSilence";

/**
 * 百人德州主界面层级枚举
 */
export enum eHumanboyLocalZorder {
    HL_ZORDER_DUMMY = 0,																				                        // 默认

    HL_ZORDER_IMG_HEAD = 9,																				                        // 头像
    HL_ZORDER_IMG_HEAD_TXT,																				                        // 头像文本
    HL_ZORDER_IMG_HEAD_FLAG,																			                        // 头像标签
    HL_ZORDER_IMG_WIN_COUNT,																			                        // 玩家连胜

    HL_ZORDER_COIN_POOL,																				                        // 金币池节点
    HL_ZORDER_ANIM_NODE,																				                        // 动画节点
    HL_ZORDER_ANIM_NODE_0,																				                        // 动画节点0
    HL_ZORDER_ANIM_NODE_1,																				                        // 动画节点1
    HL_ZORDER_ANIM_NODE_2,																				                        // 动画节点2
    HL_ZORDER_ANIM_NODE_3,																				                        // 动画节点3

    HL_ZORDER_PANEL_COUNT_DOWN,																			                        // 开局倒计时面板
    HL_ZORDER_PANEL_ADVANCE_AUTO_SELECT,																                        // 高级续投选择面板
    HL_ZORDER_PANEL_REWRAD_TIP,																			                        // 中奖提示面板
    HL_ZORDER_PANEL_RED_PACKET,																			                        // 红包面板
    HL_ZORDER_PANEL_AUTO_SELECT,																		                        // 高级续投选择面板
    HL_ZORDER_PANEL_JACKPOT,																			                        // jackpot面板
    HL_ZORDER_PANEL_RECORD,																				                        // 牌局记录面板
    HL_ZORDER_PANEL_DEALERLIST,																			                        // 上庄列表面板
    HL_ZORDER_PANEL_SETTING,																			                        // 设置面板
    HL_ZORDER_PANEL_GUID,																				                        // 引导面板
    HL_ZORDER_PANEL_SERVER_TOAST,																		                        // 提示面板
};

/**
 * 上庄按钮状态枚举
 */
export enum eHumanboyDealerBtnStatus {
    HDB_STATUS_NONE = 0,																			                            // 无
    HDB_STATUS_DEALER_UP,																				                        // 上庄
    HDB_STATUS_DEALER_DOWN,																				                        // 下庄
};

/**
 * 百人德州下注区UI结构信息
 */
export class tHumanboyAreaInfo {
    eZone: humanboy_proto.BetZoneOption = humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;			                            // 该区域枚举
    eWayOutStyle: MiniGameCommonDef.eGameboyWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE;                       // 路子显示风格
    index: number = 0;																				                            // 该区域索引
    iWayOutLoseLimitCount: number = 0;																		                    // 路单描述文本"xxx局"未出上限(超过上限显示: "xxx+ 局未出", 默认0表示无上限)
    panelArea: cc.Node = null;																		                            // 区域根节点
    panelCoin: cc.Node = null;																		                            // 金币层
    panelCard: cc.Node = null;																		                            // 牌层
    panelWayOut: cc.Node = null;																		                        // 路单层
    panelBorder: cc.Node = null;																		                        // 特效边框层
    imgCardTypeBg: cc.Sprite = null;																	                        // 牌型背景
    imgCardTypeTxt: cc.Sprite = null;																	                        // 牌型
    txtSelfBetNum: cc.Label = null;																                                // 自己下注文本节点
    txtTotalBetNum: cc.Label = null;																                            // 总下注文本节点
    rtxtWayOut: cc.RichText = null;																	                            // 路子描述文本
    txtOdds: cc.Label = null;																		                            // 赔率
    vCoinQueue: Deque<HumanboyBetCoin> = new Deque();																            // 复用金币双向队列
    vCardsNode: CowboyCard[] = [];																                                // 牌组精灵数组
    vCardsSrcPos: cc.Vec2[] = [];																	                            // 牌组精灵原始位置数组
    vWayOutImg: cc.Sprite[] = [];																	                            // 路子精灵数组
    vWayOutImgSrcPos: cc.Vec2[] = [];																                            // 路子精灵原始位置数组
};

/**
 * 百人德州主界面8位玩家UI专属结构信息
 */
export class tHumanboyPlayerInfo {
    uid: number = 0;
    imgBg: cc.Sprite = null;
    nodeHead: cc.Node = null;
    txtCoin: cc.Label = null;
    imgFlag: cc.Sprite = null;																			                        // 富豪/神算子
};

/**
 * 百人德州庄家UI专属结构信息
 */
export class tHumanboyDealerInfo {
    index: number = 0;																				                            // 庄家索引
    txtName: cc.Label = null;																			                        // 庄家昵称
    txtGold: cc.Label = null;																			                        // 庄家金币
    imgGold: cc.Sprite = null;																			                        // 庄家金币精灵(用于飞金币的起始位置)
    imgHead: cc.Sprite = null;                                                                                                  // 庄家头像
    imgHeadBox: cc.Sprite = null;																	                            // 庄家头像边框
    imgIcon: cc.Sprite = null;																			                        // 庄家图标
    imgBeDealerNum: cc.Sprite = null;																	                        // 坐庄次数底图
    rtxtBeDealerNum: cc.RichText = null;																                        // 坐庄次数
};

/**
 * 百人德州 金币优化结构体
 */
export class tHumanboyCoinOptimization {
    nAreaIdx: number = 0;
    nGold: number = 0;
    nUid: number = 0;
    bAnim: boolean = false;
    bHeadAnim: boolean = false;
    bPlaySound: boolean = false
}


class effectLoop {
    audioId: number = 0;
    duringTime: number = 0;
    startPlayTime: number = 0;
    bGoOn: boolean = false;
    func: Function = null;
};

/**
 * 百人德州主逻辑类
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyGameScene extends cc.Component {
    public static g_fullScreenOffset: cc.Vec2 = cc.Vec2.ZERO;                                                                   // 全面屏偏移量

    @property(cc.Prefab) prefab_dz_jackPotNumber: cc.Prefab = null;                                                             // jackPotNumber 预制件
    @property(cc.Prefab) prefab_cb_win_player_light: cc.Prefab = null;                                                          // 牛仔玩家赢亮框 预制件
    @property(cc.Prefab) prefab_cb_exchange: cc.Prefab = null;
    @property(cc.Prefab) prefab_cb_rule: cc.Prefab = null;                                                                      // 规则面板 预制件
    @property(cc.Prefab) prefab_cb_soundSetting: cc.Prefab = null;                                                              // 设置面板 预制件
    @property(cc.Prefab) prefab_cb_exit: cc.Prefab = null;                                                                      // 退出面板 预制件

    @property(cc.Prefab) prefab_hb_win_flag: cc.Prefab = null;                                                                  // win 旗子动画 预制件
    @property(cc.Prefab) prefab_hb_start_bets: cc.Prefab = null;                                                                // 开始下注动画 预制件
    @property(cc.Prefab) prefab_hb_end_bets: cc.Prefab = null;                                                                  // 停止下注动画 预制件
    @property(cc.Prefab) prefab_hb_dealer_victory_zh_CN: cc.Prefab = null;                                                      // 庄家完胜动画 中文版预制件
    @property(cc.Prefab) prefab_hb_dealer_victory_en_US: cc.Prefab = null;                                                      // 庄家完胜动画 英文版预制件
    @property(cc.Prefab) prefab_hb_dealer_defeat_zh_CN: cc.Prefab = null;                                                       // 庄家完败动画 中文版预制件
    @property(cc.Prefab) prefab_hb_dealer_defeat_en_US: cc.Prefab = null;                                                       // 庄家完败动画 英文版预制件
    @property(cc.Prefab) prefab_hb_way_out: cc.Prefab = null;                                                                   // 路单闪光动画 预制件

    @property(cc.Prefab) prefab_hb_flutterScore: cc.Prefab = null;                                                              // 飘分 预制件
    @property(cc.Prefab) prefab_hb_betCoin: cc.Prefab = null;                                                                   // 下注金币 预制件
    @property(cc.Prefab) prefab_hb_toast: cc.Prefab = null;                                                                     // 游戏提示 预制件
    @property(cc.Prefab) prefab_hb_guid: cc.Prefab = null;                                                                      // 新手引导 预制件
    @property(cc.Prefab) prefab_hb_menu: cc.Prefab = null;                                                                      // 游戏菜单 预制件
    @property(cc.Prefab) prefab_hb_advancedSetting: cc.Prefab = null;                                                           // 高级设置 预制件
    @property(cc.Prefab) prefab_hb_advancedAuto: cc.Prefab = null;                                                              // 高级续投 预制件
    @property(cc.Prefab) prefab_hb_dialog: cc.Prefab = null;                                                                    // 对话框 预制件

    @property(cc.Prefab) prefab_hb_jackPot: cc.Prefab = null;                                                                   // jackPot面板 预制件
    @property(cc.Prefab) prefab_hb_dealerList: cc.Prefab = null;                                                                // 上庄列表 预制件
    @property(cc.Prefab) prefab_hb_playerList: cc.Prefab = null;                                                                // 玩家列表 预制件
    @property(cc.Prefab) prefab_hb_chart: cc.Prefab = null;                                                                     // 路单面板 预制件
    @property(cc.Prefab) prefab_hb_rewardTips: cc.Prefab = null;                                                                // 通用奖励提示 预制件
    @property(cc.Prefab) prefab_luckButton: cc.Prefab = null;                                                                   // 红包节 预制件
    @property(cc.Prefab) points_ani_prefab: cc.Prefab = null;
    @property(cc.Prefab) popSilencePre: cc.Prefab = null;                               //冷静预制件
    private points_node: cc.Node = null;
    private _msInterval: number = 1;                                                                                            // 定时器间隔(单位: 秒)
    private _msNowTime: number = 0;								                                                                // 当前时间
    private _msLastTime: number = 0;							                                                                // 上次时间
    private _nLeftTime: number = 0;								                                                                // 剩余时间
    private _nMinTime: number = 0;                                                                                              // 最小时间

    private _panel_game: cc.Node = null;												                                        // 游戏面板
    private _panel_top: cc.Node = null;												                                            // 顶栏面板
    private _panel_bottom: cc.Node = null;											                                            // 底栏面板
    private _panel_self: cc.Node = null;																		                // 玩家信息面板
    private _panel_betbtn: cc.Node = null;											                                            // 下注按钮面板

    private _panel_jackpot: cc.Node = null;											                                            // jackpot面板
    private _panel_dealer: cc.Node = null;											                                            // 庄家面板

    private _panel_dealer_extra: cc.Node = null;									                                            // 庄家额外显示面板
    private _rtxt_dealer_extra: cc.RichText = null;								                                                // 庄家额外显示面板 文本
    private _btn_dealer_extra: cc.Button = null;									                                            // 庄家额外显示面板 按钮

    private _img_dealer_card_type: cc.Sprite = null;												                            // 庄家牌型
    private _img_dealer_card_shield: cc.Node = null;											                                // 庄家牌遮罩底图
    private _txt_shared_limit_word: cc.Label = null;												                            // 四门总限红描述
    private _txt_shared_limit_amount: cc.Label = null;												                            // 四门总限红金额

    private _vBottomBetBtns: MiniGameCommonDef.tGameNodeScale[] = [];                                                           // 底部下注按钮数组, 用于适配位置(k - 节点, v - 原缩放比例)
    private _vDealerInfo: tHumanboyDealerInfo[] = [];											                                // 庄家UI信息数组
    private _vDealerCardNode: CowboyCard[] = [];													                            // 庄家牌精灵数组
    private _vDealerCardSrcPos: cc.Vec2[] = [];															                        // 庄家牌精灵原始位置数组

    private _txt_self_name: cc.Label = null;														                            // 个人昵称
    private _txt_self_gold: cc.Label = null;														                            // 个人金币
    private _img_self_gold: cc.Sprite = null;														                            // 个人金币精灵(用于飞金币的起始位置)
    private _img_self_head: cc.Sprite = null;													                                // 个人头像

    private _src_bet_clock_pos: cc.Vec2 = cc.Vec2.ZERO;												                            // 下注计时器原始位置
    private _img_bet_clock: cc.Node = null;														                                // 下注计时器精灵
    private _img_count_down: cc.Sprite = null;														                            // 等待下一局倒计时

    private _btn_menu: cc.Button = null;                                                                                        // 菜单按钮
    private _btn_record: cc.Button = null;															                            // 牌局路单记录按钮
    private _btn_playerList: cc.Node = null;														                            // 玩家列表按钮
    private _btn_betAuto: cc.Button = null;															                            // 续投按钮
    private _btn_betClean: cc.Button = null;															                        // 清屏按钮(清理下注区域金币)
    private _btn_redpacket_festival: cc.Node = null;                                                                            // 红包节按钮
    private _btn_redpacket_festival_layer: cc.Node = null;                                                                      // 红包节按钮提示层
    private _luckButton: LuckTurntablesButton = null;                                                                           // 红包节实例

    private _vJackPotNumberList: JackPotNumber[] = [];												                            // jackpot数字节点数组
    private _vOtherPlayerInfo: tHumanboyPlayerInfo[] = [];											                            // 其他玩家列表
    private _vAreasInfo: tHumanboyAreaInfo[] = [];													                            // 下注区域数组
    private _vBetButtons: HumanboyBetCoin[] = [];														                        // 下注按钮数组
    private _mapSounds: HashMap<string, boolean> = new HashMap();						                                        // 声音容器(名称 - id)
    private _mapBetAreaLimitAmount: HashMap<humanboy_proto.BetZoneOption, number> = new HashMap();                              // 下注区域限红

    private _nodeAnim: cc.Node = null;																                            // 动态动画根节点
    private _nodeCoinPool: cc.Node = null;															                            // 动态金币池节点
    private _llCoinPoolZOrderCount: number = 0;														                            // 动态金币池节点深度计数

    private _vNodeWinFlagAnims: cc.Node[] = [];														                            // win 动画数组
    private _vAtlWinFlagActions: cc.Animation[] = [];

    private _nodeFightBeginAnim: cc.Node = null;													                            // 出战动画(开始下注)
    private _atlFightBeginAction: cc.Animation = null;												                            // 

    private _nodeFightEndAnim: cc.Node = null;														                            // 开战动画(停止下注)
    private _atlFightEndAction: cc.Animation = null;												                            // 

    private _nodeDealerVictoryAnim: cc.Node = null;													                            // 庄家完胜
    private _atlDealerVictoryAction: cc.Animation = null;

    private _nodeDealerDefeatAnim: cc.Node = null;												                                // 庄家完败
    private _atlDealerDefeatAction: cc.Animation = null;

    private _nodeWayoutLightAnim: cc.Node = null;													                            // 路单闪光动画
    private _atlWayoutLightAction: cc.Animation = null;

    private _nBetBtnNum: Readonly<number> = 5;														                            // 下注按钮数量
    private _fBetBtnSrcScaleRate: Readonly<number> = 0.75;											                            // 下注筹码原始缩放比例
    private _fBetBtnTarScaleRate: Readonly<number> = 1.0;											                            // 下注筹码目标缩放比例
    private _fFlyCoinScaleRate: Readonly<number> = 0.5;																            // 创建的金币缩放比例

    private _nCurBetBtnIndex: number = -1;															                            // 当前下注按钮索引
    private _nAreaCoinLimitCountMin: number = 100;													                            // 单个区域金币精灵上限最小数量
    private _nAreaCoinLimitCountMax: Readonly<number> = 200;										                            // 单个区域金币精灵上限最大数量

    private _nSendCardsTotalNum: number = 0;														                            // 发牌总数
    private _nSendCardsCallBackNum: number = 0;														                            // 发牌回调计数
    private _nMergeAutoBetNum: number = 0;															                            // 续投回调计数

    private _bWaitting: boolean = false;															                            // 是否正在等待开局倒计时
    private _nWaittingTime: number = 0;																                            // 等待时间

    private _fActExecute_RoundStart: Readonly<number> = 0;											                            // 开局动画 执行时间(2.0s)
    private _fActDelayed_SendCard: Readonly<number> = 0.0;											                            // 发牌动画 延时时间
    private _fActExecute_SendCard: Readonly<number> = 1.0;											                            // 发牌动画 执行时间

    private _fActDelayed_FightBegin: Readonly<number> = 0.0;										                            // 开始下注动画 延时时间
    private _fActExecute_FightBegin: Readonly<number> = 1.0;										                            // 开始下注动画 执行时间

    private _fActExecute_BetClock: Readonly<number> = 0.5;											                            // 下注闹钟动画 执行时间

    private _fActDelayed_FightEnd: Readonly<number> = 0.5;											                            // 停止下注动画 延时时间
    private _fActExecute_FightEnd: Readonly<number> = 1.0;											                            // 停止下注动画 执行时间

    private _fActDelayed_ShowCard_Step_1: Readonly<number> = 0.2; 							                                    // 翻牌动画 延时时间
    private _fActDelayed_ShowCard_Step_2: Readonly<number> = 0.2; 							                                    // 翻牌动画 延时时间

    private _fActExecute_ShowCard_Step_1: Readonly<number> = 0.2; 							                                    // 翻牌动画1 执行时间
    private _fActExecute_ShowCard_Step_2: Readonly<number> = 0.2; 						                                        // 翻牌动画2 执行时间

    private _fActDelayed_ShowWinFlag: Readonly<number> = 0.5;										                            // 显示win动画 延时时间
    private _fActExecute_WinFlag: Readonly<number> = 2.5;											                            // win动画 执行时间
    private _fActDelayed_HideWinFlag: Readonly<number> = 1.0;										                            // 隐藏win动画 延时时间

    private _fActExecute_WayOut: Readonly<number> = 1.0;											                            // 显示路子动画 执行时间
    private _fActExecute_WayOutLight: Readonly<number> = 1.2;										                            // 显示路子动画闪光 执行时间

    private _fActDelayed_VictoryOrDefeat: Readonly<number> = 0.5;									                            // 庄家完胜完败动画 延时时间
    private _fActExecute_VictoryOrDefeat: Readonly<number> = 2.0;									                            // 庄家完胜完败动画 执行时间

    private _fActDelayed_JackPot: Readonly<number> = 0.5;											                            // jackpot 延时时间
    private _fActExecute_JackPot: Readonly<number> = 2.5;											                            // jackpot 执行时间

    private _fActDelayed_LuckBlow: Readonly<number> = 0.5;											                            // 特殊牌型动画 延时时间
    private _fActExecute_LuckBlow_1: Readonly<number> = 0.0;										                            // 特殊牌型1 小牌动画 执行时间
    private _fActExecute_LuckBlow_2: Readonly<number> = 3.5;										                            // 特殊牌型2 中牌动画 执行时间
    private _fActExecute_LuckBlow_3: Readonly<number> = 7.5;										                            // 特殊牌型3 大牌动画 执行时间
    private _fActDelayed_LuckBlowHightLight: Readonly<number> = 0.5;								                            // 特殊牌型高亮动画 延时时间
    private _fActExecute_LuckBlowHightLight: Readonly<number> = 1.0;								                            // 特殊牌型高亮动画 执行时间

    private _fActDelayed_FlyWinCoin: Readonly<number> = 0.5;										                            // win飞金币 延时时间
    private _fActExecute_FlyWinCoin: Readonly<number> = 1.5;										                            // win飞金币 执行时间
    private _fActExecute_FlyWinCoinEnd: Readonly<number> = 2.0;										                            // win飞金币 总时间

    private _strCardFacePath: Readonly<string> = "zh_CN/game/cowboy/card_type_0/";									            // 牌正面资源路径
    private _strCardBackPath: Readonly<string> = "zh_CN/game/humanboy/card_type_0/";								            // 牌背面资源路径

    private _sound_BGM: Readonly<string> = "zh_CN/game/cowboy/audio/back";												    // 背景
    private _sound_begin_bet: Readonly<string> = "zh_CN/game/cowboy/audio/begin_bet";									    // 开始下注
    private _sound_end_bet: Readonly<string> = "zh_CN/game/cowboy/audio/end_bet";										    // 停止下注
    private _sound_kaipai: Readonly<string> = "zh_CN/game/cowboy/audio/kaipai";										        // 发牌、开牌
    private _sound_fapai: Readonly<string> = "zh_CN/game/cowboy/audio/fapai";											    // 发牌、开牌
    private _sound_start_round: Readonly<string> = "zh_CN/game/cowboy/audio/half_time";								        // 开局提示
    private _sound_betin: Readonly<string> = "zh_CN/game/cowboy/audio/chip";											    // 投少量金币
    private _sound_betin_many: Readonly<string> = "zh_CN/game/cowboy/audio/hechip";									        // 投大量金币
    private _sound_win_lose: Readonly<string> = "zh_CN/game/cowboy/audio/bx_getCoin";									    // 输赢
    private _sound_get_win_coin: Readonly<string> = "zh_CN/game/cowboy/audio/bigying";									    // 收金币
    private _sound_button: Readonly<string> = "zh_CN/game/cowboy/audio/press";											    // 按钮
    private _sound_time_tick: Readonly<string> = "zh_CN/game/cowboy/audio/time";										    // 时间滴答
    private _sound_dealer_vd: Readonly<string> = "zh_CN/game/cowboy/audio/dealer_vd";									    // 庄家完胜完败
    private _sound_special_card_type_small: Readonly<string> = "zh_CN/game/cowboy/audio/special_card_type_small";		    // 特殊牌型小牌
    private _sound_special_card_type_middle: Readonly<string> = "zh_CN/game/cowboy/audio/special_card_type_middle";	        // 特殊牌型中牌
    private _sound_special_card_type_big: Readonly<string> = "zh_CN/game/cowboy/audio/special_card_type_big";			    // 特殊牌型大牌
    private _sound_jackpot: Readonly<string> = "zh_CN/game/cowboy/audio/jackpot";										    // jackpot音效
    public silenceMusic: string = "zh_CN/game/dzpoker/audio/silence";

    private _dealerListView: HumanboyDealerList = null;														                    // 上庄列表面板
    private _btnStatus: eHumanboyDealerBtnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_NONE;					                // 上庄按钮状态
    private _eAutoBtnStyle: MiniGameCommonDef.eGameboyAutoBtnStyle = MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NONE;     // 续投按钮样式
    private _eGameboyScreenType: MiniGameCommonDef.eGameboyScreenType = MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NORMAL; // 屏幕类型

    private _humanboyGuid: HumanboyGuid = null;																                    // 路单引导 实例
    private _humanboyMenu: HumanboyMenu = null;																                    // 游戏菜单 实例
    private _humanboyAdvancedSetting: HumanboyAdvancedSetting = null;										                    // 高级设置 实例
    private _humanboyAdvancedAuto: HumanboyAdvancedAuto = null;												                    // 高级续投 实例

    private _humanboyChart: HumanboyChart = null;															                    // 走势图 实例
    private _humanboyJackpot: HumanboyJackpot = null;														                    // 彩池 实例
    private _humanboyPlayerList: HumanboyList = null;                                                                           // 玩家列表 实例
    private _humanboyExchange: HumanboyExchange = null;
    private _humanboyRule: CowboyRule = null;																		            // 规则 实例
    private _humanboySetting: CowboySetting = null;															                    // 设置 实例
    private _humanboyRewardTips: HumanboyRewardTips = null;                                                                     // 通用奖励提示 实例

    private _atlas_cb_language: cc.SpriteAtlas = null;                                                                          // 牛仔语言图集
    private _atlas_hb_language: cc.SpriteAtlas = null;                                                                          // 百人语言图集
    private _atlas_hb_humanboy: cc.SpriteAtlas = null;                                                                          // 百人其它图集
    private _vCoinOptimizationDeque: Deque<tHumanboyCoinOptimization> = new Deque();                                            // 金币最优队列

    private _isEnterBackground: boolean = false;
    private _effectMap: HashMap<string, effectLoop> = new HashMap();
    private _bSwitchTable: boolean = false;

    protected onLoad(): void {
        cv.config.setCurrentScene(cv.Enum.SCENE.HUMANBOY_SCENE);
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
     * 初始化
     */
    private _init(): void {
        // 隐藏充值web页面
        cv.SHOP.msgNode.active = false;
        cv.viewAdaptive.isselfchange = false;
        cv.viewAdaptive.humanboyroomid = 0;

        // 设置跑马灯类型
        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_HUMANBOY);

        // 计算全面屏偏移量
        if (cv.native.isFullScreen()) {
            HumanboyGameScene.g_fullScreenOffset.x = cv.native.isScreenLandscape() ? cv.viewAdaptive.IPHONEX_OFFSETY : 0;
            HumanboyGameScene.g_fullScreenOffset.y = cv.native.isScreenLandscape() ? 0 : cv.viewAdaptive.IPHONEX_OFFSETY;
        }

        this._initAtlasList();
        this._initUI();
        this._initBetAreaLimit();
        this._initJackPot();
        this._initBtnsEvents();
        this._initDealerInfo();
        this._initPlayersInfo();
        this._initBetAreas();
        this._initCoinPool();
        this._initBetButtons();
        this._initTimelineAnims();
        this._initGuid();
        // this._initBtnTest();                                // 初始化测试按钮

        this._adaptiveScreen();					            // 适配刘海屏相关控件
        this._initRedPackage();                             // 初始化红包按钮入口
        this._adaptiveBetBtnPanel();				        // 适配下注按钮面板布局

        this._onMsgSoundSwitch();	                        // 播放背景音乐
        this._addObserver();						        // 添加监听事件

        this._resetAllUI();						            // 重置UI
    }

    /**
     * 初始化图集
     */
    private _initAtlasList(): void {
        this._atlas_hb_humanboy = cv.resMgr.getSpriteAtlas("zh_CN/game/humanboyPlist/humanboy");
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
    }

    /**
     * 注册监听事件
     */
    private _addObserver(): void {
        cv.MessageCenter.register("switchSceneBegan", this._onMsgSwitchSceneBegan.bind(this), this.node);                                   // 切出该场景

        cv.MessageCenter.register("on_recharge_notify", this._onMsgRecharge.bind(this), this.node);										    // 充值
        cv.MessageCenter.register("on_humanboy_sound_switch_notify", this._onMsgSoundSwitch.bind(this), this.node);					        // 设置声音改变
        cv.MessageCenter.register("on_humanboy_server_error", this._onMsgGameError.bind(this), this.node);								    // 游戏错误提示
        cv.MessageCenter.register("on_humanboy_kick_notify", this._onMsgKick.bind(this), this.node);									    // 服务器踢人

        cv.MessageCenter.register("on_humanboy_gamedata_syn_notify", this._onMsgGameDataSyn.bind(this), this.node);						    // 进入房间数据同步
        cv.MessageCenter.register("on_humanboy_room_param_change_notify", this._onMsgRoomParamChange.bind(this), this.node);				// 房间状态变更
        cv.MessageCenter.register("on_humanboy_willstart_notify", this._onMsgWillStartNotify.bind(this), this.node);						// 游戏即将开始
        cv.MessageCenter.register("on_humanboy_deal_notify", this._onMsgGameDeal.bind(this), this.node);									// 新开一局
        cv.MessageCenter.register("on_humanboy_start_bet_notify", this._onMsgGameStartBet.bind(this), this.node);							// 开始下注
        cv.MessageCenter.register("on_humanboy_game_round_end_notify", this._onMsgGameRoundEnd.bind(this), this.node);					    // 一局结束

        cv.MessageCenter.register("on_humanboy_bet_notify", this._onMsgBet.bind(this), this.node);										    // 下注
        cv.MessageCenter.register("on_humanboy_auto_bet", this._onMsgAutoBet.bind(this), this.node);										// 续投成功
        cv.MessageCenter.register("on_humanboy_merge_auto_bet_act", this._onMsgMergeAutoBetAct.bind(this), this.node);					    // 合并续投动作
        cv.MessageCenter.register("on_humanboy_merge_auto_bet_end", this._onMsgMergeAutoBetEnd.bind(this), this.node);					    // 合并续投动作结束

        cv.MessageCenter.register("on_humanboy_bet_amount_level_change", this._onMsgBetAmountLevelChange.bind(this), this.node);			// 下注级别变更
        cv.MessageCenter.register("on_humanboy_advance_autobet_set", this._onMsgAdvanceAutobetSet.bind(this), this.node);					// 设置高级续投次数成功	
        cv.MessageCenter.register("on_humanboy_advance_autobet", this._onMsgAdvanceAutobet.bind(this), this.node);						    // 高级续投
        cv.MessageCenter.register("on_humanboy_advance_autobet_cancel", this._onMsgAdvanceAutobetCancel.bind(this), this.node);			    // 取消高级续投成功

        cv.MessageCenter.register("on_humanboy_dealer_list", this._onMsgDealerList.bind(this), this.node);								    // 上庄列表
        cv.MessageCenter.register("on_humanboy_dealer_up", this._onMsgDealerUp.bind(this), this.node);									    // 上庄申请
        cv.MessageCenter.register("on_humanboy_dealer_up_notify", this._onMsgDealerUpNotify.bind(this), this.node);						    // 上庄通知
        cv.MessageCenter.register("on_humanboy_kickdealerapply_notify", this._onMsgKickDealerApplyNotify.bind(this), this.node);		    // 上庄失败被踢
        cv.MessageCenter.register("on_humanboy_dealer_cancel_wait", this._onMsgDealerCancelWait.bind(this), this.node);					    // 取消等待队列
        cv.MessageCenter.register("on_humanboy_dealer_down", this._onMsgDealerDown.bind(this), this.node);								    // 下庄
        cv.MessageCenter.register("on_humanboy_dealer_down_notify", this._onMsgDealerDownNotify.bind(this), this.node);					    // 被动下庄通知

        cv.MessageCenter.register("on_update_humanboy_playerlist_notify", this._onMsgPlayerList.bind(this), this.node);                     // 更新玩家列表
        cv.MessageCenter.register("showMedalMsg", this._onMsgRewardTips.bind(this), this.node);											    // 红包中奖提示
        cv.MessageCenter.register("update_gold", this._onMsgUpdateWorldServerGold.bind(this), this.node);									// world服金币有变动通知

        cv.MessageCenter.register("showLuckButton", this._onMsgShowLuckButton.bind(this), this.node);                                       // 红包节
        cv.MessageCenter.register("turntableResultNotice", this._onMsgTurntableResultNotice.bind(this), this.node);                         // 红包转盘中奖结果通知

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
    }

    /**
     * 移除监听事件
     */
    private _removeObserver(): void {
        cv.MessageCenter.unregister("switchSceneBegan", this.node);

        cv.MessageCenter.unregister("on_recharge_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_sound_switch_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_server_error", this.node);
        cv.MessageCenter.unregister("on_humanboy_kick_notify", this.node);

        cv.MessageCenter.unregister("on_humanboy_gamedata_syn_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_room_param_change_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_willstart_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_deal_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_start_bet_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_game_round_end_notify", this.node);

        cv.MessageCenter.unregister("on_humanboy_bet_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_auto_bet", this.node);
        cv.MessageCenter.unregister("on_humanboy_merge_auto_bet_act", this.node);
        cv.MessageCenter.unregister("on_humanboy_merge_auto_bet_end", this.node);

        cv.MessageCenter.unregister("on_humanboy_bet_amount_level_change", this.node);
        cv.MessageCenter.unregister("on_humanboy_advance_autobet_set", this.node);
        cv.MessageCenter.unregister("on_humanboy_advance_autobet", this.node);
        cv.MessageCenter.unregister("on_humanboy_advance_autobet_cancel", this.node);

        cv.MessageCenter.unregister("on_humanboy_dealer_list", this.node);
        cv.MessageCenter.unregister("on_humanboy_dealer_up", this.node);
        cv.MessageCenter.unregister("on_humanboy_dealer_up_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_kickdealerapply_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_dealer_cancel_wait", this.node);
        cv.MessageCenter.unregister("on_humanboy_dealer_down", this.node);
        cv.MessageCenter.unregister("on_humanboy_dealer_down_notify", this.node);

        cv.MessageCenter.unregister("on_update_humanboy_playerlist_notify", this.node);
        cv.MessageCenter.unregister("showMedalMsg", this.node);
        cv.MessageCenter.unregister("update_gold", this.node);

        cv.MessageCenter.unregister("showLuckButton", this.node);
        cv.MessageCenter.unregister("turntableResultNotice", this.node);

        cv.MessageCenter.unregister("goldViewShop", this.node);
        cv.MessageCenter.unregister("onNoticeOpenCalmDownWindow", this.node);
        cv.MessageCenter.unregister("onCalmDownMsg", this.node);


        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        }
        else {
            cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
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
        //}

        this._effectMap.forEach((key: string, value: effectLoop, i?: number) => {
            cc.audioEngine.stopEffect(value.audioId);
            this.unschedule(value.func);
        });
        this._effectMap.clear();
        this._isEnterBackground = true;

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
        this._isEnterBackground = false;
    }

    /**
     * 清除数据等(停止一些循环动画,音频之类的资源的状态等,否则直接切换场景会闪退)
     */
    private _clearData(): void {
        // 移除所有监听者
        this._removeObserver();

        // 停止所有音乐播放
        this._stopSound("", true);

        // 停止背景音乐
        cv.AudioMgr.stopMusic();

        // 重置UI状态等
        this._resetAllUI();

        // 清除房间数据结构等
        humanboyDataMgr.getHumanboyRoom().reset();
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

        // 回到百人德州房间列表界面
        cv.roomManager.reset();
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
            cv.MessageCenter.send("switchSceneToMiniGame");
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
        humanboyDataMgr.getHumanboyRoom().sBackToMainTips = cv.String(tips);

        // 回到大厅
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }

    /**
     * 重置所有UI
     */
    private _resetAllUI(): void {
        this._resetGameView();
        this._resetOtherView();
        this._updateGameView();
    }

    /**
     * 重置游戏视图
     */
    private _resetGameView(): void {
        this._resetLeftTime();
        this._resetAllCards();

        this._resetAllBetAreaLimitAmount();
        this._resetAllBetAreas();

        this._restAllTimelineAnims();

        this._showBetClockAction(false, false);
        this._showNextRoundCountDown(false, 0);
        this._showNextRoundEnterCountDown(false, 0);
        this._showWaittingTime(false);

        this._nSendCardsCallBackNum = 0;
        this._nMergeAutoBetNum = 0;

        this.resetPointAni();
    }

    /**
     * 重置其他视图
     */
    private _resetOtherView(): void {
        if (this._dealerListView) {
            this._dealerListView.hide(false);
        }
    }

    /**
     * 更新游戏视图
     */
    private _updateGameView(): void {
        this._updateJackPotNum();
        this._updateBetAmountLevel();
        this._updateBetOddsDetail();
        this._updateBetButtonState();
        this._updateBetAreaTouchEnabled();

        this._updateDealerInfo();
        this._updateSelfInfo();
        this._updateOtherPlayersInfo();
        this._updateAllPlayerWinCount();
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
        let shape: number = llRealGold < humanboyDataMgr.getHumanboyRoom().llCoinUICritical ? HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_COIN : HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_BLOCK;
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
    private _getCoinFromPool(nAreaIdx: number, gold: number): HumanboyBetCoin {
        let coin: HumanboyBetCoin = null;
        if (nAreaIdx >= 0 && nAreaIdx < this._vAreasInfo.length) {
            let vCoinQueue: Deque<HumanboyBetCoin> = this._vAreasInfo[nAreaIdx].vCoinQueue;

            // 未达区域金币精灵上限, 则创建新的精灵
            if (vCoinQueue.size() < this._nAreaCoinLimitCountMin) {
                coin = this._createFlyCoin(gold);
                coin.node.zIndex = ++this._llCoinPoolZOrderCount;
                coin.node.setPosition(cc.Vec2.ZERO);

                this._nodeCoinPool.addChild(coin.node);
                vCoinQueue.push_back(coin);
            }
            // 达到上限, 从金币精灵池中取(重复利用)
            else {
                // 出队
                coin = vCoinQueue.pop_front();
                coin = this._resetCoin(coin);
                if (coin) {
                    coin.node.zIndex = ++this._llCoinPoolZOrderCount;

                    coin.setShape(this._getBetCoinShapeByAmount(gold));
                    coin.setTxtNum(cv.StringTools.serverGoldToShowNumber(gold));

                    // 入队
                    vCoinQueue.push_back(coin);
                }
            }
        }
        return coin;
    }

    /**
     * 获取对应区域空闲的金币节点数量
     * @param nAreaIdx 
     */
    private _getFreeCoinCountFromPool(nAreaIdx: number): number {
        let nRet: number = 0;
        if (nAreaIdx >= 0 && nAreaIdx < this._vAreasInfo.length) {
            let vCoinQueue: Deque<HumanboyBetCoin> = this._vAreasInfo[nAreaIdx].vCoinQueue;
            for (let i = 0; i < vCoinQueue.size(); ++i) {
                if (!vCoinQueue.at(i).node.active) ++nRet;
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

        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() >= 0) {
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

            // console.log(cv.StringTools.formatC("HumanboyGame_Coin: sec = %02d, dt = %05f, total = %05f, count = %05f", this._getLeftTime(), dt, nTotalCount, nCount));

            for (let i = 0; i < nCount; ++i) {
                let t: tHumanboyCoinOptimization = this._vCoinOptimizationDeque.pop_front();

                // 投金币动画
                this._showCoinAnim(t.nAreaIdx, t.nGold, t.nUid, t.bAnim, t.bHeadAnim, t.bPlaySound);

                // 更新区域限红
                this._updateBettAreaLimitAmount(this._getAreaIdxByBetOption(t.nAreaIdx), -t.nGold);

                // 更新玩家金币
                this._updatePlayerGold(t.nUid);

                // 自己筹码变化后判断一下下注筹码状态
                if (humanboyDataMgr.getHumanboyRoom().tSelfPlayer.uid === t.nUid) {
                    this._updateBetButtonState();
                }
            }
        }
        else {
            // 更新剩余的金币数等(在卡帧情况下, 计时误差等情况下, 飞金币被强行停止, 但数据要保持最新, 因为这是一个逐帧队列, 不是及时更新)
            for (let i = 0; i < nTotalCount; ++i) {
                let t: tHumanboyCoinOptimization = this._vCoinOptimizationDeque.pop_front();

                // 更新区域限红
                this._updateBettAreaLimitAmount(this._getAreaIdxByBetOption(t.nAreaIdx), -t.nGold);

                // 更新玩家金币
                this._updatePlayerGold(t.nUid);

                // 自己筹码变化后判断一下下注筹码状态
                if (humanboyDataMgr.getHumanboyRoom().tSelfPlayer.uid === t.nUid) {
                    this._updateBetButtonState();
                }
            }

            // 清除队列
            this._vCoinOptimizationDeque.clear();
        }
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

        // 开始动画
        if (anim) {
            let vPlayerCoinNodes: cc.Node[] = this._getPlayerCoinNodesByUid(uid);
            if (cv.StringTools.getArrayLength(vPlayerCoinNodes) === 0) {
                console.log(cv.StringTools.formatC("HumanboyMainView.showBetInAnim, cannot find valid headBg, use btnPlayerList, oneBet.uid: %d", uid));
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
                    let coin: HumanboyBetCoin = this._getCoinFromPool(nAreaIdx, gold);
                    if (coin) {
                        coin.node.setPosition(coin.node.parent.convertToNodeSpaceAR(coinFlyFromPos));
                        if (i === 0) {
                            // 下注音效
                            if (playSound) {
                                let llRealGold: number = cv.StringTools.clientGoldByServer(gold);
                                let sound: string = llRealGold < humanboyDataMgr.getHumanboyRoom().llCoinUICritical ? this._sound_betin : this._sound_betin_many;
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
            let coin: HumanboyBetCoin = this._getCoinFromPool(nAreaIdx, gold);
            if (coin) {
                let coinFlyDestPos: cc.Vec2 = this._getCoinRandomPos(coin.node, nAreaIdx, true);
                coin.node.setPosition(coin.node.parent.convertToNodeSpaceAR(coinFlyDestPos));
                coin.node.active = true;
            }

            if (cb) cb();
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
    private _showCoinAnimFromPos(world_pos: cc.Vec2, nAreaIdx: number, gold: number, anim: boolean, fDelayedTime: number, cb: () => void = null): void {
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
     * 重置指定下注区域的所有金币节点
     * @param betOption 
     */
    private _resetBetAreaCoins(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;
        let count: number = this._vAreasInfo[nAreaIdx].vCoinQueue.size();
        for (let i = 0; i < count; ++i) {
            let coin: HumanboyBetCoin = this._vAreasInfo[nAreaIdx].vCoinQueue.at(i);
            this._resetCoin(coin);
        }
    }

    /**
     * 重置所有下注区域的金币节点
     */
    private _resetAllBetAreaCoins(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._resetBetAreaCoins(this._vAreasInfo[i].eZone);
        }

        // 重置金币池节点深度计数
        this._llCoinPoolZOrderCount = 0;

        // 清理"金币最优队列"
        this._vCoinOptimizationDeque.clear();
    }

    /**
     * 恢复所有区域的金币显示与否
     * @param bShowCoin 
     */
    private _recoverAreasCoin(bShowCoin: boolean): void {
        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData): string => {
            let nAreaIdx: number = this._getAreaIdxByBetOption(option);
            if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return "continue";

            let llTotalAmount: number = 0;
            let vTotalBetDetail: number[] = zoneData.vTotalBetDetail;

            for (let i = 0; i < vTotalBetDetail.length; ++i) {
                llTotalAmount += vTotalBetDetail[i];
                if (bShowCoin) {
                    this._showCoinAnim(nAreaIdx, vTotalBetDetail[i], 0, false, false, false);
                }
            }

            // 更新区域限红
            this._updateBettAreaLimitAmount(option, -llTotalAmount);
        });
    }

    /**
     * 获取当前选中的下注额
     */
    private _getCurBetLevel(): number {
        if (this._nCurBetBtnIndex < 0) return 0;
        let vBetCoinOption: number[] = humanboyDataMgr.getHumanboyRoom().vBetCoinOption;
        return vBetCoinOption[this._nCurBetBtnIndex];
    }

    /**
     * 通过下注选项获取下注区域索引
     * @param betOption 
     */
    private _getAreaIdxByBetOption(betOption: number): number {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (this._vAreasInfo[i].eZone === betOption) {
                return this._vAreasInfo[i].index;
            }
        }
        return -1;
    }

    /**
     * 通过下注区域索引获取下注选项
     * @param betOption 
     */
    private _getBetOptionByAreaIdx(areaIdx: number): humanboy_proto.BetZoneOption {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (this._vAreasInfo[i].index === areaIdx) {
                return this._vAreasInfo[i].eZone;
            }
        }
        return humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;
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
        let vAmountLevels: number[] = humanboyDataMgr.getHumanboyRoom().tCurRoom.amountLevel;
        return MiniGameCommonDef.disinteBetAmounts(gold, vAmountLevels);
    }

    playEffectForPath(path: string): void {
        if (this._effectMap.has(path)) {
            let obj = this._effectMap.get(path);
            let state = cc.audioEngine.getState(obj.audioId);
            let isPlay: boolean = state == cc.audioEngine.AudioState.PLAYING;
            if (obj.bGoOn === true && isPlay) return;
            let currentTime: number = (new Date()).getTime();
            if (isPlay === false) {
                if (state == cc.audioEngine.AudioState.PAUSED) {
                    console.log(" PAUSED", ", ", obj);
                    cc.audioEngine.resumeEffect(obj.audioId);

                    obj.startPlayTime = currentTime;
                    this.schedule(obj.func, obj.duringTime);
                }
                else {
                    console.log(" !PAUSED state = ", state, ", ", obj);
                }
                return;
            }
            console.log(" PLAYING", ", ", obj);
            if (currentTime > obj.startPlayTime + obj.duringTime * 0.5 * 1000) {
                obj.bGoOn = true;
            }
        }
        else {
            let clip: cc.AudioClip = cv.resMgr.get(path, cc.AudioClip);
            let audioId = cc.audioEngine.playEffect(clip, true);
            let duringTime = cc.audioEngine.getDuration(audioId);
            let obj = new effectLoop();
            obj.audioId = audioId;
            obj.bGoOn = false;
            obj.duringTime = duringTime;
            obj.startPlayTime = (new Date()).getTime();
            obj.func = (delay: number) => {
                let obj = this._effectMap.get(path);
                obj.startPlayTime = (new Date()).getTime();
                if (obj.bGoOn === false) {
                    cc.audioEngine.pauseEffect(obj.audioId);
                    console.log("yyx123 setCurrentTime");
                    cc.audioEngine.setCurrentTime(obj.audioId, 0);
                    this.unschedule(obj.func);
                }
                obj.bGoOn = false;
            }
            this._effectMap.add(path, obj);
            cc.audioEngine.setFinishCallback(audioId, () => {
                console.log("yyx123 setFinishCallback");
                cc.audioEngine.stopEffect(audioId);
                this.unschedule(obj.func);
                this._effectMap.remove(path);
            });

            this.schedule(obj.func, obj.duringTime);
        }
    }


    ingorePutInQuenue(fileName: string) {
        //私语平台，开始下注，停止下注不放在队列播放
        if (fileName != this._sound_begin_bet && fileName != this._sound_end_bet
            && fileName != this._sound_win_lose && fileName != this._sound_special_card_type_big
            && fileName != this._sound_time_tick
        ) {
            return true;
        }

        return false;
    }

    /**
     * 播放音效
     * @param fileName 
     * @param loop 
     */
    private _playSoundEffect(fileName: string, loop: boolean = false): void {
        if (cv.tools.isSoundEffectOpen() && this._isEnterBackground == false) {
            if (!this._mapSounds.has(fileName)) {
                this._mapSounds.add(fileName, true);
            }

            if (cc.sys.isBrowser && this.ingorePutInQuenue(fileName)) {
                this.playEffectForPath(fileName);
            } else {
                cv.AudioMgr.playEffect(fileName, loop);
            }
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
     * 动态游戏提示
     * @param strText 
     */
    private _showGameToast(strText: string): void {
        let toast: HumanboyToast = cc.instantiate(this.prefab_hb_toast).getComponent(HumanboyToast);
        toast.txt.string = strText;
        this.node.addChild(toast.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SERVER_TOAST);

        let seq_move: cc.ActionInterval = cc.sequence(cc.delayTime(0.1), cc.moveBy(1.0, cc.v2(0, 120)));
        let seq_fade: cc.ActionInterval = cc.sequence(cc.delayTime(0.4), cc.fadeOut(0.8).easing(cc.easeInOut(1.0)), cc.destroySelf());
        toast.node.runAction(seq_move);
        toast.node.runAction(seq_fade);
    }

    /**
     * 设置筹码单选按钮选中状态
     * @param betBtnIdx 
     * @param isCheckCoin 
     */
    private _setBetButtonSelected(betBtnIdx: number, isCheckCoin: boolean = true): void {
        if (betBtnIdx < 0 || betBtnIdx >= this._nBetBtnNum) return;

        this._resetAllBetButtons(true);
        this._updateBetButtonState();

        let vBetCoinOption: number[] = humanboyDataMgr.getHumanboyRoom().vBetCoinOption;	// 房间下注级别
        let curCoin: number = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin;		// 当前自身携带金币

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
     * 初始化UI
     */
    private _initUI(): void {
        this._panel_top = this.node.getChildByName("panel_top");
        this._panel_bottom = this.node.getChildByName("panel_bottom");

        this._btn_menu = this.node.getChildByName("btn_menu").getComponent(cc.Button);
        this._btn_record = this.node.getChildByName("btn_record").getComponent(cc.Button);

        this._panel_jackpot = this._panel_top.getChildByName("panel_jackpot");
        this._panel_dealer_extra = this._panel_top.getChildByName("panel_dealer_extra");

        this._panel_self = this._panel_bottom.getChildByName("panel_self");
        this._panel_betbtn = this._panel_bottom.getChildByName("panel_betbtn");

        this._img_count_down = this.node.getChildByName("img_count_down").getComponent(cc.Sprite);
        this._img_count_down.node.zIndex = eHumanboyLocalZorder.HL_ZORDER_PANEL_COUNT_DOWN;
        this._img_count_down.node.active = false;

        // 百人只支持横屏(所以这里所有检测都是建立在横屏基础上)
        // 计算目标设备分辨率用哪一套UI(目前总共3套: 常规, 窄屏, 宽屏)
        // 以下计算宽窄屏要以实际UI对应的宽高总和与屏幕对应的宽高做比较
        // 例如: 窄屏判断逻辑是 h : w > 2; 但若干机型满足条件的同时实际屏幕宽却比游戏的ui累加宽小, 就摆不下了, 此时认为该窄屏为"伪窄屏"
        // 因此要根据实际游戏核心排版元素去计算作比较(宽屏逻辑也以此类推)
        do {
            let panel_game: cc.Node = this.node.getChildByName("panel_game");
            let panel_game_broad: cc.Node = this.node.getChildByName("panel_game_broad");
            let panel_game_narrow: cc.Node = this.node.getChildByName("panel_game_narrow");
            this._eGameboyScreenType = MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NORMAL;

            // 窄屏检测
            if (cv.native.isFullScreen()) {
                let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
                let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");

                // 左右列表宽度 + 桌布宽度 + 两边刘海宽度 + 缓冲宽度
                let total_w: number = 0;
                let offset_w: number = 0;
                total_w += 2 * HumanboyGameScene.g_fullScreenOffset.x;
                total_w += panel_game_narrow.width;
                total_w += (panel_left_playerlist.width - 50);
                total_w += (panel_right_playerlist.width - 50);
                total_w += offset_w;

                if (total_w <= cc.winSize.width) {
                    this._eGameboyScreenType = MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW;
                }
            }
            // 宽屏检测
            else if (cv.native.isWideScreen()) {
                // 顶栏面板高度 + 桌布高度 + 底栏面板高度 + 缓冲高度
                let total_h: number = 0;
                let offset_h: number = 0;

                total_h += this._panel_top.height;
                total_h += panel_game_broad.height;
                total_h += this._panel_bottom.height;
                total_h += offset_h;

                if (total_h <= cc.winSize.height) {
                    this._eGameboyScreenType = MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD;
                }
            }

            switch (this._eGameboyScreenType) {
                case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD: {
                    panel_game.removeFromParent(true);
                    cv.tools.destroyNode(panel_game);
                    panel_game_narrow.removeFromParent(true);
                    cv.tools.destroyNode(panel_game_narrow);
                    this._panel_game = panel_game_broad;
                    cv.resMgr.setSpriteFrame(this._panel_game, cv.config.getLanguagePath("game/humanboy/humanboy_table_broad"));
                } break;

                case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW: {
                    panel_game.removeFromParent(true);
                    panel_game_broad.removeFromParent(true);
                    cv.tools.destroyNode(panel_game);
                    cv.tools.destroyNode(panel_game_broad);
                    this._panel_game = panel_game_narrow;
                    cv.resMgr.setSpriteFrame(this._panel_game, cv.config.getLanguagePath("game/humanboy/humanboy_table_narrow"));
                } break;

                case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NORMAL:
                default: {
                    panel_game_broad.removeFromParent(true);
                    panel_game_narrow.removeFromParent(true);
                    cv.tools.destroyNode(panel_game_broad);
                    cv.tools.destroyNode(panel_game_narrow);
                    this._panel_game = panel_game;
                    cv.resMgr.setSpriteFrame(this._panel_game, cv.config.getLanguagePath("game/humanboy/humanboy_table"));
                } break;
            }

            this._panel_game.active = true;
        } while (false);
    }

    /**
     * 初始化引导面板
     */
    private _initGuid(): void {
        let strStoreGuideKey: string = "humanboy_has_show_guide";
        if (cv.tools.GetStringByCCFile(strStoreGuideKey) != "true") {
            if (!this._humanboyGuid) {
                this._humanboyGuid = cc.instantiate(this.prefab_hb_guid).getComponent(HumanboyGuid);
                this.node.addChild(this._humanboyGuid.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_GUID);
            }

            this._humanboyGuid.setTouchSizeScale(0, 3);
            this._humanboyGuid.setDescString(cv.config.getStringData("Humanboy_game_guide_text"));
            this._humanboyGuid.show(this._vAreasInfo[0].panelWayOut, (): void => {
                let hasShowGuide: string = "true";
                cv.tools.SaveStringByCCFile(strStoreGuideKey, hasShowGuide);
                this._showChart(humanboy_proto.BetZoneOption.POS1);
            }, true);
        }
    }

    /**
     * 初始化JP入口显示
     */
    private _initJackPot(): void {
        let jp_digits_count: number = 7;
        for (let i = 0; i < jp_digits_count; ++i) {
            let panel_jackpot: cc.Node = this._panel_jackpot.getChildByName("panel");
            let jpNumber_inst: cc.Node = cc.instantiate(this.prefab_dz_jackPotNumber);
            panel_jackpot.addChild(jpNumber_inst);

            let pJackpotNumber: JackPotNumber = jpNumber_inst.getComponent(JackPotNumber);
            pJackpotNumber.init(false);
            for (let j = 0; j < 10; ++j) {
                let fileName: string = cv.StringTools.formatC("um_%d", j);
                let frame: cc.SpriteFrame = cv.resMgr.getSpriteAtlasFrame("zh_CN/game/humanboyPlist/number", fileName);
                pJackpotNumber.setNumberImg(j, frame);
            }

            pJackpotNumber.setGameStyle(0.31);
            let part_w: number = pJackpotNumber.root.width * pJackpotNumber.root.scaleX;
            let part_h: number = pJackpotNumber.root.height * pJackpotNumber.root.scaleY;
            let offset: number = (panel_jackpot.width - part_w * jp_digits_count) / (jp_digits_count - 1);
            let x: number = -panel_jackpot.width * panel_jackpot.anchorX + part_w * pJackpotNumber.root.anchorX + (part_w + offset) * i;
            let y: number = 0;
            pJackpotNumber.node.setPosition(cc.v2(x, y));
            pJackpotNumber.hideBg();

            this._vJackPotNumberList.push(pJackpotNumber);
        }
    }

    /**
     * 初始化按钮事件
     */
    private _initBtnsEvents(): void {
        // 菜单按钮
        do {
            this._btn_menu.node.on("click", (event: cc.Event): void => {
                cv.AudioMgr.playButtonSound('button_click');
                if (!this._humanboyMenu) {
                    this._humanboyMenu = cc.instantiate(this.prefab_hb_menu).getComponent(HumanboyMenu);
                    this.node.addChild(this._humanboyMenu.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SETTING);

                    // 菜单 - 兑换
                    this._humanboyMenu.getBtnExchange().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(this._sound_button);
                        this._humanboyMenu.hide(false);

                        if (cv.dataHandler.getUserData().usdt <= 0) {
                            cv.TT.showMsg(cv.config.getStringData("USDTView_ex_coin_error_0_usdt"), cv.Enum.ToastType.ToastTypeError);
                            return;
                        }
                        if (!this._humanboyExchange) {
                            this._humanboyExchange = cc.instantiate(this.prefab_cb_exchange).getComponent(HumanboyExchange);
                            this.node.addChild(this._humanboyExchange.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SETTING);
                        }
                        else {
                            this._humanboyExchange.openView();
                        }
                    });

                    // 菜单 - 规则
                    this._humanboyMenu.getBtnRule().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(this._sound_button);
                        this._humanboyMenu.hide(false);

                        if (!this._humanboyRule) {
                            this._humanboyRule = cc.instantiate(this.prefab_cb_rule).getComponent(CowboyRule);
                            this.node.addChild(this._humanboyRule.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SETTING);
                        }
                        else {
                            this._humanboyRule.openView();
                        }
                    });

                    // 菜单 - 音效设置
                    this._humanboyMenu.getBtnSoundSetting().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(this._sound_button);
                        this._humanboyMenu.hide(false);

                        if (!this._humanboySetting) {
                            this._humanboySetting = cc.instantiate(this.prefab_cb_soundSetting).getComponent(CowboySetting);
                            this.node.addChild(this._humanboySetting.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SETTING);
                        }
                        else {
                            this._humanboySetting.initSwitch();
                            this._humanboySetting.node.active = true;
                        }
                    });

                    // 菜单 - 高级设置
                    this._humanboyMenu.getBtnAdvancedSetting().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(this._sound_button);
                        this._humanboyMenu.hide(false);

                        if (!this._humanboyAdvancedSetting) {
                            this._humanboyAdvancedSetting = cc.instantiate(this.prefab_hb_advancedSetting).getComponent(HumanboyAdvancedSetting);
                            this.node.addChild(this._humanboyAdvancedSetting.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SETTING);
                        }
                        this._humanboyAdvancedSetting.show();
                    });

                    // 菜单 - 退出
                    this._humanboyMenu.getBtnExit().node.on("click", (event: cc.Event): void => {
                        this._playSoundEffect(this._sound_button);
                        this._humanboyMenu.hide(false);

                        let iUsedAutoBetCount: number = humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount;
                        let iSelectAutoBetCount: number = humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount;
                        if (iSelectAutoBetCount > 0) {
                            let dialog: HumanboyDialog = cc.instantiate(this.prefab_hb_dialog).getComponent(HumanboyDialog);
                            dialog.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_exit_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                                , cv.config.getStringData("CowBoy_btn_desc_exit_game")
                                , cv.config.getStringData("CowBoy_btn_desc_resume_game")
                                , (sender: HumanboyDialog) => { cv.humanboyNet.requestLeaveRoom(); }
                                , (sender: HumanboyDialog) => { });

                            this.node.addChild(dialog.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SERVER_TOAST);
                        }
                        else {
                            let nodeExit: cc.Node = cc.instantiate(this.prefab_cb_exit);
                            this.node.addChild(nodeExit, eHumanboyLocalZorder.HL_ZORDER_PANEL_SETTING);
                        }
                    });
                }

                this._humanboyMenu.show(true);
                this._humanboyMenu.setMenuPosition(cc.v2(this._btn_menu.node.x, this._btn_menu.node.y - this._btn_menu.node.height / 2));
            });
        } while (0);

        // 玩家列表按钮
        do {
            this._btn_playerList = this._panel_bottom.getChildByName("btn_playerlist");
            this._btn_playerList.on("click", (event: cc.Event): void => {
                this._playSoundEffect(this._sound_button);
                cv.humanboyNet.requestPlayerList();
            });
        } while (0);

        // 表格记录按钮
        do {
            let btn_record: cc.Node = this.node.getChildByName("btn_record");
            btn_record.on("click", (event: cc.Event): void => {
                this._playSoundEffect(this._sound_button);
                this._showChart(humanboy_proto.BetZoneOption.BetZoneOption_DUMMY);
            });
        } while (0);

        // jackpot
        do {
            this._panel_jackpot.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                cv.AudioMgr.playButtonSound('button_click');
                this._playSoundEffect(this._sound_button);

                if (!this._humanboyJackpot) {
                    this._humanboyJackpot = cc.instantiate(this.prefab_hb_jackPot).getComponent(HumanboyJackpot);
                    this.node.addChild(this._humanboyJackpot.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_JACKPOT);
                    this._humanboyJackpot.show(true);
                    //this._humanboyJackpot.node.setPosition(cc.v2(this._humanboyJackpot.node.x, this._humanboyJackpot.node.y));
                }
                else {
                    //this._humanboyJackpot.node.active = true;
                    this._humanboyJackpot.show(true);
                    if (this._humanboyJackpot.getViewType() === HumanboyJackpot.eHumanboyJackpotListViewType.JACKPOT_TYPE_RULE) {
                        this._humanboyJackpot.setViewType(this._humanboyJackpot.getViewType());
                    }
                }
                //this._humanboyJackpot.setShieldLayerEnabled(true);
            });
        } while (0);
    }

    /**
     * 更新 JP 数额
     */
    private _updateJackPotNum(): void {
        let llJackpotLeftMoney: number = humanboyDataMgr.getHumanboyRoom().llJackpotLeftMoney;
        let strAmount: string = Math.round(cv.StringTools.serverGoldToShowNumber(llJackpotLeftMoney)).toString();
        let iLen: number = strAmount.length;
        let iCount: number = this._vJackPotNumberList.length;
        for (let i = 0; i < iCount; ++i) {
            let index: number = iCount - 1 - i;
            if (i < iLen) {
                this._vJackPotNumberList[index].showNum(cv.Number(strAmount.substr(iLen - i - 1, 1)));
            }
            else {
                this._vJackPotNumberList[index].showNum(0);
            }
        }
        cv.MessageCenter.send("on_humanboy_jackpot_notify");
    }

    /**
     * 初始化金币池
     */
    private _initCoinPool(): void {
        this._nodeCoinPool = new cc.Node();
        this._nodeCoinPool.setContentSize(cc.winSize);
        this.node.addChild(this._nodeCoinPool, eHumanboyLocalZorder.HL_ZORDER_COIN_POOL);
    }

    /**
     * 初始化测试按钮
     */
    private _initBtnTest(): void {
        let tmp_test_node: cc.Node = this.node.getChildByName("tmp_test_node");
        if (!tmp_test_node) {
            tmp_test_node = new cc.Node();
            tmp_test_node.setAnchorPoint(cc.v2(0.5, 0.5));
            this.node.addChild(tmp_test_node, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE);

            let img: cc.Sprite = tmp_test_node.addComponent(cc.Sprite);
            cv.resMgr.setSpriteFrame(img.node, "zh_CN/internal/image/default_btn_normal", (): void => {
                img.type = cc.Sprite.Type.SLICED;
                img.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                img.trim = false;
                // img.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
                // img.dstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;

                // 设置大小和位置(在Sprite组件生效后,节点的大小和位置才有效, 这里是异步加载资源, 因此在回调里面设置)
                let sz: cc.Size = cc.size(this._vOtherPlayerInfo[0].imgBg.node.getContentSize());
                tmp_test_node.setContentSize(sz.width, sz.height / 2);
                let wpos: cc.Vec2 = cc.Vec2.ZERO;
                this._vOtherPlayerInfo[0].imgBg.node.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
                tmp_test_node.setPosition(tmp_test_node.parent.convertToNodeSpaceAR(wpos));

                // 添加按钮组件
                let btn: cc.Button = tmp_test_node.addComponent(cc.Button);
                btn.transition = cc.Button.Transition.SCALE;

                // 添加lab文本
                let lab_node: cc.Node = new cc.Node();
                tmp_test_node.addChild(lab_node);
                lab_node.setAnchorPoint(cc.v2(0.5, 0.5));
                lab_node.setPosition(cc.Vec2.ZERO);

                let txt: cc.Label = lab_node.addComponent(cc.Label);
                txt.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                txt.verticalAlign = cc.Label.VerticalAlign.CENTER;
                txt.fontSize = 30;
                txt.overflow = cc.Label.Overflow.SHRINK;
                txt.node.color = cc.Color.BLACK;
                txt.node.setContentSize(txt.node.parent.getContentSize());
                txt.string = "BtnTest";
            });
        }

        // 添加点击事件
        let step: number = 2;
        tmp_test_node.active = true;
        tmp_test_node.on("click", (event: cc.Event): void => {
            switch (step) {
                // 模拟切后台重连
                case 0: {
                    if (cv.netWork.isConnect() && cv.dataHandler.getUserData().m_bIsLoginServerSucc) {
                        cv.dataHandler.getUserData().m_bIsLoginServerSucc = true;
                        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.HumanBoy, cv.roomManager.getCurrentRoomID());
                    }
                    else {
                        cv.roomManager.RequestJoinRoom(cv.roomManager.getCurrentGameID(), humanboyDataMgr.getHumanboyRoom().u32RoomId);
                    }
                } break;

                // 模拟中奖提示
                case 1: {
                    let strTips: string[] = ["测试 ! 六！Cược Biubiu 666 Fuck you !"
                        , "Congratulations\"昵称最多容纳10个字\"和哈哈哈!"
                        , "\"666\"Server is about to be 六！Cược 六 vượt quá giới hạn đỏ, 666 fuck you!"
                        , "恭喜\"昵称最多容纳10个字\"在初级场 Congratulations 狂赢9999.99万金币！Cược vượt quá giới hạn đỏ, cược tiếp ván này thất bại, 哈哈! 牛批!"
                    ];
                    let idx: number = Math.floor(cv.StringTools.randomRange(0, strTips.length));
                    this._onMsgRewardTips(strTips[idx]);
                } break;

                // 模拟批量飞金币
                case 2: {
                    let vBetCoinOption: number[] = humanboyDataMgr.getHumanboyRoom().vBetCoinOption;
                    let nAmountIdx: number = Math.floor(cv.StringTools.randomRange(0, vBetCoinOption.length));

                    let nCount: number = Math.floor(cv.StringTools.randomRange(0, 100));
                    for (let i = 0; i < nCount; ++i) {
                        let t: tHumanboyCoinOptimization = new tHumanboyCoinOptimization();
                        t.nAreaIdx = Math.floor(cv.StringTools.randomRange(0, this._vAreasInfo.length));
                        t.nGold = vBetCoinOption[nAmountIdx];
                        t.nUid = cv.dataHandler.getUserData().u32Uid;
                        t.bAnim = true;
                        t.bHeadAnim = true;
                        t.bPlaySound = true;
                        this._vCoinOptimizationDeque.push_back(t);
                    }
                } break;

                // 其他事件
                default: {

                } break;
            }
        });
    }

    /**
     * 初始化庄家面板
     */
    private _initDealerInfo(): void {
        // 庄家信息
        this._panel_dealer = this._panel_top.getChildByName("panel_dealer");
        let iChildrenCount: number = this._panel_dealer.childrenCount;
        for (let i = 0; i < iChildrenCount; ++i) {
            let panel_dealer_head: cc.Node = this._panel_dealer.getChildByName(cv.StringTools.formatC("panel_dealer_head_%d", i));
            if (!panel_dealer_head) continue;

            let tDealerInfo: tHumanboyDealerInfo = new tHumanboyDealerInfo();
            tDealerInfo.index = i;
            tDealerInfo.imgIcon = panel_dealer_head.getChildByName("img_icon").getComponent(cc.Sprite);
            tDealerInfo.txtName = panel_dealer_head.getChildByName("img_name").getChildByName("txt").getComponent(cc.Label);
            tDealerInfo.txtGold = panel_dealer_head.getChildByName("img_gold").getChildByName("txt").getComponent(cc.Label);
            tDealerInfo.imgGold = panel_dealer_head.getChildByName("img_gold").getChildByName("img").getComponent(cc.Sprite);
            tDealerInfo.imgHead = panel_dealer_head.getChildByName("panel_head").getChildByName("img_head").getComponent(cc.Sprite);
            tDealerInfo.imgHeadBox = panel_dealer_head.getChildByName("panel_head").getChildByName("img_head_box").getComponent(cc.Sprite);
            tDealerInfo.imgBeDealerNum = panel_dealer_head.getChildByName("img_count").getComponent(cc.Sprite);
            tDealerInfo.rtxtBeDealerNum = tDealerInfo.imgBeDealerNum.node.getChildByName("txt").getComponent(cc.RichText);
            this._vDealerInfo.push(tDealerInfo);

            // 设置庄家图标
            tDealerInfo.imgIcon.spriteFrame = this._atlas_hb_language.getSpriteFrame("humanboy_dealer_icon");

            // 设置庄家默认头像框
            tDealerInfo.imgHead.spriteFrame = null;
            cv.resMgr.setSpriteFrame(tDealerInfo.imgHeadBox.node, "zh_CN/game/humanboy/head/head_system_box_circle");

            // 头像添加点击标签
            tDealerInfo.imgHeadBox.addComponent(TagCom).nTag = tDealerInfo.index;

            // 添加庄家头像点击事件
            tDealerInfo.imgHeadBox.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                this._playSoundEffect(this._sound_button);
                let eType: eHumanboyDealerListViewType = eHumanboyDealerListViewType.HDLV_TYPE_CANDIDATE;
                if (event.target) {
                    let info: TagCom = event.target.getComponent(TagCom);
                    if (info) {
                        let index: number = info.nTag;
                        if (index >= 0 && index < cv.StringTools.getArrayLength(humanboyDataMgr.getHumanboyRoom().vDealerInfo)) {
                            eType = eHumanboyDealerListViewType.HDLV_TYPE_CANDIDATE;
                        }
                        else {
                            eType = eHumanboyDealerListViewType.HDLV_TYPE_WATTING;
                        }
                    }
                }

                this._showDealerListView(true, eType);
            });
        }

        // 庄家额外显示面板面板
        do {
            this._rtxt_dealer_extra = this._panel_dealer_extra.getChildByName("txt").getComponent(cc.RichText);

            // 上庄按钮
            this._btn_dealer_extra = this._panel_dealer_extra.getChildByName("btn").getComponent(cc.Button);
            this._btn_dealer_extra.node.on("click", this._onClickDealerBtn, this);
        } while (false);

        // 庄家牌
        do {
            // 底牌遮罩图
            this._img_dealer_card_shield = this._panel_dealer.getChildByName("img_dealer_card_shield");
            if (this._img_dealer_card_shield) this._img_dealer_card_shield.active = false;

            // 牌精灵
            let panel_dealer_card: cc.Node = this._panel_dealer.getChildByName("panel_dealer_card");
            let panel_card: cc.Node = panel_dealer_card.getChildByName("panel_card");
            if (panel_card) {
                for (let i = 0; i < 5; ++i) {
                    let sp_card: cc.Node = panel_card.getChildByName(cv.StringTools.formatC("card_%d", i));
                    sp_card.active = false;

                    let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                    card.ResetFromNode(sp_card);

                    this._vDealerCardNode.push(card);
                    this._vDealerCardSrcPos.push(cc.v2(card.node.position));
                    ++this._nSendCardsTotalNum;
                }
            }

            // 牌型
            let img_card_type: cc.Node = panel_dealer_card.getChildByName("img_card_type");
            this._img_dealer_card_type = img_card_type.getChildByName("img").getComponent(cc.Sprite);
        } while (false);

        // 闹钟
        do {
            this._img_bet_clock = this._panel_dealer.getChildByName("img_bet_clock");
            this._img_bet_clock.active = false;
            this._src_bet_clock_pos = cc.v2(this._img_bet_clock.position);
        } while (false);
    }

    /**
     * 更新庄家信息
     */
    private _updateDealerInfo(): void {
        let vDealerInfoData: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerInfo;
        for (let i = 0; i < this._vDealerInfo.length; ++i) {
            let txtName: cc.Label = this._vDealerInfo[i].txtName;
            let txtGold: cc.Label = this._vDealerInfo[i].txtGold;
            let imgGold: cc.Sprite = this._vDealerInfo[i].imgGold;
            let imgHead: cc.Sprite = this._vDealerInfo[i].imgHead;
            let imgHeadBox: cc.Sprite = this._vDealerInfo[i].imgHeadBox;
            let imgBeDealerNum: cc.Sprite = this._vDealerInfo[i].imgBeDealerNum;
            let rtxtBeDealerNum: cc.RichText = this._vDealerInfo[i].rtxtBeDealerNum;

            if (i < vDealerInfoData.length) {
                let tDealerData: Readonly<humanboy_proto.DealerPlayerInfo> = vDealerInfoData[i];
                switch (tDealerData.uid) {
                    // 系统庄
                    case 0: {
                        if (i === 0) {
                            let csp: cc.Node = CircleSprite.getHeadNode(imgHead.node);
                            if (csp) csp.parent.active = false;
                            cv.resMgr.setSpriteFrame(imgHead.node, "zh_CN/game/humanboy/head/head_system_circle");
                            cv.resMgr.setSpriteFrame(imgHeadBox.node, "zh_CN/game/humanboy/head/head_system_box_circle");
                            txtName.string = cv.config.getStringData("Humanboy_game_apply_dealer_system");
                            txtGold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(tDealerData.stockCoin);
                            imgGold.node.active = true;
                            rtxtBeDealerNum.string = "";
                            imgBeDealerNum.node.active = false;
                        }
                        else {
                            let csp: cc.Node = CircleSprite.getHeadNode(imgHead.node);
                            if (csp) csp.parent.active = false;
                            cv.resMgr.setSpriteFrame(imgHead.node, "zh_CN/game/humanboy/head/head_none_circle");
                            cv.resMgr.setSpriteFrame(imgHeadBox.node, "zh_CN/game/humanboy/head/head_player_box_circle");
                            txtName.string = cv.config.getStringData("Humanboy_game_apply_dealer_system");
                            txtGold.string = "";
                            imgGold.node.active = false;
                            rtxtBeDealerNum.string = "";
                            imgBeDealerNum.node.active = false;
                        }
                    } break;

                    // 选庄中
                    case 1: {
                        let csp: cc.Node = CircleSprite.getHeadNode(imgHead.node);
                        if (csp) csp.parent.active = false;
                        cv.resMgr.setSpriteFrame(imgHead.node, "zh_CN/game/humanboy/head/head_dealer_choose");
                        cv.resMgr.setSpriteFrame(imgHeadBox.node, "zh_CN/game/humanboy/head/head_player_box_circle");
                        txtName.string = cv.config.getStringData("Humanboy_game_dealer_choose");
                        txtGold.string = "";
                        imgGold.node.active = false;
                        rtxtBeDealerNum.string = "";
                        imgBeDealerNum.node.active = false;
                    } break;

                    // 玩家庄
                    default: {
                        let headUrl: string = tDealerData.head;
                        CircleSprite.setCircleSprite(imgHead.node, headUrl, tDealerData.plat, false);

                        imgHead.spriteFrame = null;
                        cv.resMgr.setSpriteFrame(imgHeadBox.node, "zh_CN/game/humanboy/head/head_player_box_circle");
                        txtName.string = tDealerData.name;
                        txtGold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(tDealerData.stockCoin);
                        imgGold.node.active = true;
                        let str_color: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_up_count_1"), tDealerData.beDealerNum, humanboyDataMgr.getHumanboyRoom().tCurRoom.dealerCount);
                        cv.StringTools.setRichTextString(rtxtBeDealerNum.node, str_color);
                        imgBeDealerNum.node.active = true;
                    } break;
                }
            }
            else {
                let csp: cc.Node = CircleSprite.getHeadNode(imgHead.node);
                if (csp) csp.parent.active = false;
                cv.resMgr.setSpriteFrame(imgHead.node, "zh_CN/game/humanboy/head/head_none_circle");
                cv.resMgr.setSpriteFrame(imgHeadBox.node, "zh_CN/game/humanboy/head/head_player_box_circle");
                txtName.string = cv.config.getStringData("Humanboy_game_apply_dealer_system");
                txtGold.string = "";
                imgGold.node.active = false;
                rtxtBeDealerNum.string = "";
                imgBeDealerNum.node.active = false;
            }
        }

        // 更新庄家/非庄家 额外显示面板
        this._updateDealerExtraInfo();
    }

    /**
     * 更新庄家(非庄家)额外显示信息
     */
    private _updateDealerExtraInfo(): void {
        let bOnDealerList: boolean = humanboyDataMgr.getHumanboyRoom().bOnDealerList;
        if (bOnDealerList) {
            this._btnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_DOWN;
        }
        else {
            this._btnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_UP;
        }

        switch (this._btnStatus) {
            // 上庄
            case eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_UP: {
                this._btn_dealer_extra.getComponent(cc.Sprite).spriteFrame = this._atlas_hb_language.getSpriteFrame("humanboy_dealer_btn_up");
                this._panel_betbtn.active = true;

                // 上庄底分
                let llMoneyperstock: number = humanboyDataMgr.getHumanboyRoom().tCurRoom.moneyPerStock;
                let strMoneyperstock: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llMoneyperstock, 8);
                this._rtxt_dealer_extra.string = (cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_limit_score"), strMoneyperstock));
            } break;

            // 下庄
            case eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_DOWN: {
                this._btn_dealer_extra.getComponent(cc.Sprite).spriteFrame = this._atlas_hb_language.getSpriteFrame("humanboy_dealer_btn_down");

                // 若自己是庄家, 额外面板的坐庄次数显示自己上庄局数
                let vDealerInfoData: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerInfo;
                if (vDealerInfoData.length > 0) {
                    let tDealerData: Readonly<humanboy_proto.DealerPlayerInfo> = vDealerInfoData[0];
                    if (tDealerData.uid != 0 && tDealerData.uid != 1) {
                        let str_color: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_up_count_2"), tDealerData.beDealerNum, humanboyDataMgr.getHumanboyRoom().tCurRoom.dealerCount);
                        cv.StringTools.setRichTextString(this._rtxt_dealer_extra.node, str_color);
                    }
                }
            } break;

            default:
                break;
        }
    }

    /**
     * 重置庄家牌
     * @param visible 
     */
    private _resetDealerCards(visible: boolean = true): void {
        for (let i = 0; i < this._vDealerCardNode.length; ++i) {
            this._vDealerCardNode[i].node.stopAllActions();
            this._vDealerCardNode[i].SetFace(false);
            this._vDealerCardNode[i].node.setPosition(this._vDealerCardSrcPos[i]);
            this._vDealerCardNode[i].node.active = visible;
        }

        this._img_dealer_card_type.node.parent.active = false;
    }

    /**
     * 重置指定区域闲家牌
     * @param betOption 
     * @param visible 
     */
    private _resetPlayerCards(betOption: humanboy_proto.BetZoneOption, visible: boolean /*false*/): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let pArea: tHumanboyAreaInfo = this._vAreasInfo[nAreaIdx];
        if (!pArea.panelCard) return;

        pArea.panelCard.active = visible;
        pArea.imgCardTypeBg.node.active = false;
        pArea.imgCardTypeTxt.node.active = false;

        for (let i = 0; i < pArea.vCardsNode.length; ++i) {
            pArea.vCardsNode[i].node.stopAllActions();
            pArea.vCardsNode[i].SetFace(false);
            pArea.vCardsNode[i].node.setPosition(pArea.vCardsSrcPos[i]);
            pArea.vCardsNode[i].node.active = visible;
        }
    }

    /**
     * 重置所有区域闲家牌
     * @param visible 
     */
    private _resetAllPlayerCards(visible: boolean = false): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            let pArea: tHumanboyAreaInfo = this._vAreasInfo[i];
            this._resetPlayerCards(pArea.eZone, visible);
        }
    }

    /**
     * 重置所有牌(闲家 + 庄家)
     * @param visible 
     */
    private _resetAllCards(visible: boolean = false): void {
        this._nSendCardsCallBackNum = 0;
        this._resetAllPlayerCards(visible);
        this._resetDealerCards(visible);

        this._img_dealer_card_shield.active = !visible;
    }

    onGoldViewShop() {
        this._playSoundEffect(this._sound_button);
        cv.MessageCenter.send("on_recharge_notify");
    }
    /**
     * 初始化玩家列表信息
     */
    private _initPlayersInfo(): void {
        // 自己
        do {
            let panel_self: cc.Node = this._panel_bottom.getChildByName("panel_self");
            let img_name: cc.Node = panel_self.getChildByName("img_name");
            let img_gold: cc.Node = panel_self.getChildByName("img_gold");
            this._txt_self_name = img_name.getChildByName("txt").getComponent(cc.Label);
            this._txt_self_gold = img_gold.getChildByName("txt").getComponent(cc.Label);
            this._img_self_gold = img_gold.getChildByName("img").getComponent(cc.Sprite);
            this._img_self_head = panel_self.getChildByName("img_head").getComponent(cc.Sprite);

            // 设置默认头像框
            cv.resMgr.setSpriteFrame(this._img_self_head.node, "zh_CN/game/humanboy/head/head_player_box_circle");

            // 充值
            let btn_add: cc.Node = img_gold.getChildByName("btn");
            btn_add.on("click", (event: cc.Event): void => {
                this._playSoundEffect(this._sound_button);
                cv.MessageCenter.send("on_recharge_notify");
            });
        } while (false);

        this.setLeftAndRightList();
        // 其他玩家
        do {
            let count: number = 0;
            let max_count: number = 5;
            // let total_h: number = this._panel_game.height;
            switch (this._eGameboyScreenType) {
                case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD: {
                    count = 5;
                    // total_h -= 50;
                } break;

                case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW:
                case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NORMAL:
                default: {
                    count = 4;
                } break;
            }

            let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
            let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");
            // panel_left_playerlist.setContentSize(panel_left_playerlist.width, total_h);
            // panel_right_playerlist.setContentSize(panel_right_playerlist.width, total_h);

            // 排版从上至下
            // let start_x: number = 0;
            // let start_y: number = panel_left_playerlist.height * (1 - panel_left_playerlist.anchorY);
            // let offset_img: number = (total_h - panel_left_playerlist.getChildByName("img_bg_0").height * count) / (count - 1);
            // let offset_head: number = 15;
            // let offset_coin: number = -65;
            // let offset_left_flag: number = 50;
            // let offset_right_flag: number = 52;
            // let v2LeftImg: cc.Vec2 = cc.v2(start_x, start_y);
            // let v2RightImg: cc.Vec2 = cc.v2(start_x, start_y);

            // 目前头像列表由于 drawcall 因素, 打乱了ui层级结构, 不能以预制件等动态节点 add
            // 因此在场景文件中排列出了最大数量情况, 具体有多余的动态删除
            for (let i = 0; i < max_count; ++i) {
                // 左列表(富豪榜)
                do {
                    let img_bg: cc.Node = panel_left_playerlist.getChildByName(`img_bg_${i}`);
                    let node_head: cc.Node = panel_left_playerlist.getChildByName(`node_head_${i}`);
                    let text_coin: cc.Node = panel_left_playerlist.getChildByName(`text_coin_${i}`);

                    if (i < count) {
                        // 排版计算
                        // v2LeftImg.y -= img_bg.height * (1 - img_bg.anchorY) * img_bg.scaleY;
                        // img_bg.setPosition(v2LeftImg);
                        // v2LeftImg.y -= img_bg.height * img_bg.anchorY * img_bg.scaleY;
                        // v2LeftImg.y -= offset_img;

                        // let v2Head: cc.Vec2 = cc.v2(v2LeftImg.x, offset_head);
                        // img_bg.convertToWorldSpaceAR(v2Head, v2Head);
                        // panel_left_playerlist.convertToNodeSpaceAR(v2Head, v2Head);
                        // node_head.setPosition(v2Head);

                        // let v2Coin: cc.Vec2 = cc.v2(v2LeftImg.x, offset_coin);
                        // img_bg.convertToWorldSpaceAR(v2Coin, v2Coin);
                        // panel_left_playerlist.convertToNodeSpaceAR(v2Coin, v2Coin);
                        // text_coin.setPosition(v2Coin);

                        // 填充数据
                        let player: tHumanboyPlayerInfo = new tHumanboyPlayerInfo();
                        player.imgBg = img_bg.getComponent(cc.Sprite);
                        player.nodeHead = node_head;
                        player.txtCoin = text_coin.getComponent(cc.Label);

                        if (i === 0) {
                            player.imgFlag = panel_left_playerlist.getChildByName("nb_flag").getComponent(cc.Sprite);
                            let nb_flag_desc: cc.Label = player.imgFlag.node.getChildByName("nb_flag_desc").getComponent(cc.Label);
                            nb_flag_desc.string = cv.StringTools.formatC(cv.config.getStringData("Cowboy_fuhao_no_text"), 1);

                            // let v2Flag: cc.Vec2 = cc.v2(player.imgFlag.node.x, offset_left_flag);
                            // img_bg.convertToWorldSpaceAR(v2Flag, v2Flag);
                            // panel_left_playerlist.convertToNodeSpaceAR(v2Flag, v2Flag);
                            // player.imgFlag.node.setPosition(v2Flag.x+5,v2Flag.y);
                        }

                        this._vOtherPlayerInfo.push(player);
                    }
                    else {
                        panel_left_playerlist.removeChild(img_bg);
                        panel_left_playerlist.removeChild(node_head);
                        panel_left_playerlist.removeChild(text_coin);
                        cv.tools.destroyNode(img_bg);
                        cv.tools.destroyNode(node_head);
                        cv.tools.destroyNode(text_coin);
                    }
                } while (false);

                // 右列表(神算子)
                do {
                    let img_bg: cc.Node = panel_right_playerlist.getChildByName(`img_bg_${i}`);
                    let node_head: cc.Node = panel_right_playerlist.getChildByName(`node_head_${i}`);
                    let text_coin: cc.Node = panel_right_playerlist.getChildByName(`text_coin_${i}`);

                    if (i < count) {
                        // 排版计算
                        // v2RightImg.y -= img_bg.height * (1 - img_bg.anchorY) * img_bg.scaleY;
                        // img_bg.setPosition(v2RightImg);
                        // v2RightImg.y -= img_bg.height * img_bg.anchorY * img_bg.scaleY;
                        // v2RightImg.y -= offset_img;

                        // let v2Head: cc.Vec2 = cc.v2(v2RightImg.x, offset_head);
                        // img_bg.convertToWorldSpaceAR(v2Head, v2Head);
                        // panel_right_playerlist.convertToNodeSpaceAR(v2Head, v2Head);
                        // node_head.setPosition(v2Head);

                        // let v2Coin: cc.Vec2 = cc.v2(v2RightImg.x, offset_coin);
                        // img_bg.convertToWorldSpaceAR(v2Coin, v2Coin);
                        // panel_right_playerlist.convertToNodeSpaceAR(v2Coin, v2Coin);
                        // text_coin.setPosition(v2Coin);

                        // 填充数据
                        let player: tHumanboyPlayerInfo = new tHumanboyPlayerInfo();
                        player.imgBg = img_bg.getComponent(cc.Sprite);
                        player.nodeHead = node_head;
                        player.txtCoin = text_coin.getComponent(cc.Label);

                        if (i === 0) {
                            player.imgFlag = panel_right_playerlist.getChildByName("nb_flag").getComponent(cc.Sprite);
                            let nb_flag_desc: cc.Label = player.imgFlag.node.getChildByName("nb_flag_desc").getComponent(cc.Label);
                            nb_flag_desc.string = cv.config.getStringData("Cowboy_shensuanzi_text");

                            // let v2Flag: cc.Vec2 = cc.v2(player.imgFlag.node.x, offset_right_flag);
                            // img_bg.convertToWorldSpaceAR(v2Flag, v2Flag);
                            // panel_right_playerlist.convertToNodeSpaceAR(v2Flag, v2Flag);
                            // player.imgFlag.node.setPosition(v2Flag.x+5,v2Flag.y);
                        }

                        this._vOtherPlayerInfo.push(player);
                    }
                    else {
                        panel_right_playerlist.removeChild(img_bg);
                        panel_right_playerlist.removeChild(node_head);
                        panel_right_playerlist.removeChild(text_coin);
                        cv.tools.destroyNode(img_bg);
                        cv.tools.destroyNode(node_head);
                        cv.tools.destroyNode(text_coin);
                    }
                } while (false);
            }

            // 头像
            for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
                this._vOtherPlayerInfo[i].imgBg.spriteFrame = this._atlas_hb_humanboy.getSpriteFrame("humanboy_icon_seat_bg_1");
                this._vOtherPlayerInfo[i].nodeHead.getChildByName("img").getComponent(cc.Sprite).spriteFrame = null;
                this._vOtherPlayerInfo[i].txtCoin.node.zIndex = eHumanboyLocalZorder.HL_ZORDER_IMG_HEAD_TXT;
                if (this._vOtherPlayerInfo[i].imgFlag) this._vOtherPlayerInfo[i].imgFlag.node.zIndex = eHumanboyLocalZorder.HL_ZORDER_IMG_HEAD_FLAG;
            }
        } while (false);
    }

    /**
     * 更新个人信息
     */
    private _updateSelfInfo(): void {
        // 昵称
        cv.StringTools.setShrinkString(this._txt_self_name.node, humanboyDataMgr.getHumanboyRoom().tSelfPlayer.name, true);

        // 金币
        let llCurCoin: number = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin;
        this._txt_self_gold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llCurCoin);

        // 头像
        let headUrl: string = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.head;
        CircleSprite.setCircleSprite(this._img_self_head.node, headUrl, humanboyDataMgr.getHumanboyRoom().tSelfPlayer.plat);
        humanboyDataMgr.getHumanboyRoom().setPlayerBeforeSettlementGold(cv.dataHandler.getUserData().u32Uid, llCurCoin);
    }

    /**
     * 更新其他人信息
     */
    private _updateOtherPlayersInfo(): void {
        // 这里按照服务器发的gamePlayers顺序放
        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            let vOtherPlayerInfo: Readonly<humanboy_proto.GamePlayer[]> = humanboyDataMgr.getHumanboyRoom().vOtherPlayer;
            if (i < vOtherPlayerInfo.length) {
                let info: Readonly<humanboy_proto.GamePlayer> = vOtherPlayerInfo[i];
                this._vOtherPlayerInfo[i].uid = info.uid;

                // 头像更新
                let headUrl: string = info.head;
                this._vOtherPlayerInfo[i].imgBg.spriteFrame = this._atlas_hb_humanboy.getSpriteFrame("humanboy_icon_seat_bg_1");
                this._vOtherPlayerInfo[i].nodeHead.active = true;
                CircleSprite.setCircleSprite(this._vOtherPlayerInfo[i].nodeHead.getChildByName("img"), headUrl, info.plat, true, Head_Mode.IRREGULAR, true, true, false);
                this._vOtherPlayerInfo[i].txtCoin.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(info.curCoin);
                if (this._vOtherPlayerInfo[i].imgFlag) this._vOtherPlayerInfo[i].imgFlag.node.active = true;

                humanboyDataMgr.getHumanboyRoom().setPlayerBeforeSettlementGold(info.uid, info.curCoin);
            }
            else {
                this._vOtherPlayerInfo[i].uid = 0;
                this._vOtherPlayerInfo[i].imgBg.spriteFrame = this._atlas_hb_humanboy.getSpriteFrame("humanboy_icon_seat_bg_2");
                this._vOtherPlayerInfo[i].nodeHead.active = false;
                this._vOtherPlayerInfo[i].txtCoin.string = "";
                if (this._vOtherPlayerInfo[i].imgFlag) this._vOtherPlayerInfo[i].imgFlag.node.active = false;

                // 移除连胜节点
                let str_tag: string = "win_player_win_count_" + this._vOtherPlayerInfo[i].nodeHead.uuid;
                let strNode = cc.find(str_tag, this.node);
                if (strNode && cc.isValid(strNode, true)) {
                    this.node.removeChild(strNode);
                    strNode.destroy();
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
            let llCurCoin: number = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin;
            this._txt_self_gold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llCurCoin);

            humanboyDataMgr.getHumanboyRoom().setPlayerBeforeSettlementGold(uid, llCurCoin);
        }

        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            if (this._vOtherPlayerInfo[i].uid === uid) {
                // 神算子/富豪是自己的情況
                if (uid === cv.dataHandler.getUserData().u32Uid) {
                    this._vOtherPlayerInfo[i].txtCoin.string = this._txt_self_gold.string;
                }
                else {
                    let player: humanboy_proto.GamePlayer = humanboyDataMgr.getHumanboyRoom().getOtherPlayerByUid(uid);
                    if (player) {
                        let llCurCoin: number = player.curCoin;
                        this._vOtherPlayerInfo[i].txtCoin.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llCurCoin);

                        humanboyDataMgr.getHumanboyRoom().setPlayerBeforeSettlementGold(uid, llCurCoin);
                    }
                }
            }
        }
    }

    /**
     * 更新玩家临时金币显示(动画临时变化)
     * @param uid 
     * @param amount 
     */
    private _updatePlayerTempGold(uid: number, amount: number): void {
        if (uid === cv.dataHandler.getUserData().u32Uid) {
            this._txt_self_gold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(amount);
        }

        for (let i = 0; i < this._vOtherPlayerInfo.length; ++i) {
            if (this._vOtherPlayerInfo[i].uid === uid) {
                // 神算子/富豪是自己的情況
                if (uid === cv.dataHandler.getUserData().u32Uid) {
                    this._vOtherPlayerInfo[i].txtCoin.string = this._txt_self_gold.string;
                }
                else {
                    let player: humanboy_proto.GamePlayer = humanboyDataMgr.getHumanboyRoom().getOtherPlayerByUid(uid);
                    if (player) {
                        this._vOtherPlayerInfo[i].txtCoin.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(amount);
                    }
                }
            }
        }
    }

    /**
     * 更新所有玩家临时金币显示(动画临时变化)
     */
    private _updateAllPlayerTempGold(): void {
        let vSettles: humanboy_proto.PlayerSettle[] = [];
        cv.StringTools.deepCopy(humanboyDataMgr.getHumanboyRoom().vPlayerSettles, vSettles);
        vSettles.push(humanboyDataMgr.getHumanboyRoom().tOtherPlayerSettle);

        for (let i = 0; i < vSettles.length; ++i) {
            let uid: number = vSettles[i].uid;
            let llWinAmount: number = vSettles[i].pos4WinAmount;
            let llLuckWinAmount: number = vSettles[i].posLuckWinAmount;

            let llBscGold: number = humanboyDataMgr.getHumanboyRoom().getPlayerBeforeSettlementGold(uid);
            llBscGold += llWinAmount;
            llBscGold += llLuckWinAmount;

            this._updatePlayerTempGold(uid, llBscGold);
            humanboyDataMgr.getHumanboyRoom().setPlayerBeforeSettlementGold(uid, llBscGold);
        }
    }

    /**
     * 初始化下注区域
     */
    private _initBetAreas(): void {
        // 闲家四门区域
        let vBetOptionArea: humanboy_proto.BetZoneOption[] = [];
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS1);                                                                 // 闲家1
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS2);                                                                 // 闲家2
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS3);                                                                 // 闲家3
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS4);                                                                 // 闲家4

        // 幸运一击区域
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS_LUCK_1);                                                           // 庄家通吃/通赔
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS_LUCK_2);                                                           // 一对
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS_LUCK_3);                                                           // 两对
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS_LUCK_4);                                                           // 三条
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS_LUCK_5);                                                           // 顺子/同花
        vBetOptionArea.push(humanboy_proto.BetZoneOption.POS_LUCK_6);                                                           // 葫芦/金刚/同花顺/皇家

        let panel_area: cc.Node = this._panel_game.getChildByName("panel_area");
        let panel_border: cc.Node = this._panel_game.getChildByName("panel_border");
        let panel_way_out: cc.Node = this._panel_game.getChildByName("panel_way_out");
        let panel_card: cc.Node = this._panel_game.getChildByName("panel_card");
        let panel_coin: cc.Node = this._panel_game.getChildByName("panel_coin");
        let panel_txt: cc.Node = this._panel_game.getChildByName("panel_txt");

        for (let i = 0; i < vBetOptionArea.length; ++i) {
            let areaInfo: tHumanboyAreaInfo = new tHumanboyAreaInfo();
            areaInfo.eZone = vBetOptionArea[i];
            areaInfo.index = i;
            areaInfo.panelArea = panel_area.getChildByName(cv.StringTools.formatC("area_%d", i));
            areaInfo.panelBorder = panel_border.getChildByName(cv.StringTools.formatC("border_%d", i));
            areaInfo.panelCoin = panel_coin.getChildByName(cv.StringTools.formatC("coin_%d", i));

            // 赔率
            let fnt_odd: cc.Node = panel_txt.getChildByName(cv.StringTools.formatC("fnt_odd_%d", i));
            if (fnt_odd) {
                areaInfo.txtOdds = fnt_odd.getComponent(cc.Label);
            }

            // 牌区
            areaInfo.panelCard = panel_card.getChildByName(cv.StringTools.formatC("card_node_%d", i));
            if (areaInfo.panelCard) {
                areaInfo.imgCardTypeBg = panel_card.getChildByName(cv.StringTools.formatC("img_card_type_bg_%d", i)).getComponent(cc.Sprite);
                areaInfo.imgCardTypeTxt = panel_card.getChildByName(cv.StringTools.formatC("img_card_type_txt_%d", i)).getComponent(cc.Sprite);

                // 初始化牌组精灵, 位置等
                let children: cc.Node[] = areaInfo.panelCard.children;
                let count: number = areaInfo.panelCard.childrenCount;
                for (let j = 0; j < count; ++j) {
                    let sp_card: cc.Node = children[j];
                    sp_card.active = false;

                    let card = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                    card.ResetFromNode(sp_card);

                    areaInfo.vCardsNode.push(card);
                    areaInfo.vCardsSrcPos.push(cc.v2(card.node.position));
                    ++this._nSendCardsTotalNum;
                }
            }

            // 总注/限红
            areaInfo.txtTotalBetNum = panel_txt.getChildByName(cv.StringTools.formatC("txt_total_bet_num_%d", i)).getComponent(cc.Label);

            // 个人注
            areaInfo.txtSelfBetNum = panel_txt.getChildByName(cv.StringTools.formatC("txt_self_bet_num_%d", i)).getComponent(cc.Label);

            // 初始化路子面板
            do {
                areaInfo.panelWayOut = panel_way_out.getChildByName(cv.StringTools.formatC("way_out_%d", i));
                areaInfo.panelWayOut.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                    this._playSoundEffect(this._sound_button);
                    this._showChart(areaInfo.eZone);
                });

                // 路子显示风格
                // 三条以下: 纯图片
                if (areaInfo.eZone < humanboy_proto.BetZoneOption.POS_LUCK_4) {
                    areaInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG;
                }
                // 三条: 图片文字混合显示
                else if (areaInfo.eZone === humanboy_proto.BetZoneOption.POS_LUCK_4) {
                    areaInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO;
                    areaInfo.iWayOutLoseLimitCount = 200;
                }
                // 三条以上: 纯文字
                else if (areaInfo.eZone > humanboy_proto.BetZoneOption.POS_LUCK_4) {
                    areaInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    areaInfo.iWayOutLoseLimitCount = 200;
                }

                // 路子球状图片
                let count: number = areaInfo.panelWayOut.childrenCount;
                for (let i_wayout_index = 0; i_wayout_index < count; ++i_wayout_index) {
                    let strImgName: string = cv.StringTools.formatC("img_%d", i_wayout_index);
                    let img: cc.Node = areaInfo.panelWayOut.getChildByName(strImgName);
                    if (img) {
                        img.active = false;
                        areaInfo.vWayOutImg.push(img.getComponent(cc.Sprite));
                        areaInfo.vWayOutImgSrcPos.push(cc.v2(img.position));
                    }
                }

                // 文本
                let txt_way_out: cc.Node = panel_txt.getChildByName(cv.StringTools.formatC("txt_way_out_%d", i));
                if (txt_way_out) {
                    areaInfo.rtxtWayOut = txt_way_out.getComponent(cc.RichText);
                    areaInfo.rtxtWayOut.node.active = false;
                    areaInfo.rtxtWayOut.handleTouchEvent = false;
                }
            } while (false);

            // push 区域数组
            this._vAreasInfo.push(areaInfo);
            areaInfo.panelArea.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                this._onClickAreaCoinPanel(areaInfo.index);
            });
        }
    }

    /**
     * 更新下注区域下注数量
     * @param betOption 
     * @param llTotalAmount 
     * @param llSelfAmount 
     */
    private _updateBetAreaBetsNum(betOption: humanboy_proto.BetZoneOption, llTotalAmount: number = -1, llSelfAmount: number = -1): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let totalBet: number = 0;
        let selfBet: number = 0;
        let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(betOption);
        if (zoneData) {
            totalBet = zoneData.totalBet;
            selfBet = zoneData.selfBet;
        }

        llTotalAmount = llTotalAmount < 0 ? totalBet : llTotalAmount;
        llSelfAmount = llSelfAmount < 0 ? selfBet : llSelfAmount;

        // 自己下注
        if (llSelfAmount > 0) {
            let str_amount: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llSelfAmount, 5);
            this._vAreasInfo[nAreaIdx].txtSelfBetNum.string = str_amount;
        }
        else {
            this._vAreasInfo[nAreaIdx].txtSelfBetNum.string = "";
        }

        // 总注
        let str_total: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llTotalAmount, 5);
        this._vAreasInfo[nAreaIdx].txtTotalBetNum.string = str_total;

        if (betOption < humanboy_proto.BetZoneOption.POS_LUCK) {
            // 限红
            let llLimitAmount: number = 0;
            if (this._mapBetAreaLimitAmount.has(betOption)) {
                llLimitAmount = this._mapBetAreaLimitAmount.get(betOption);
            }
            let str_limit: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llLimitAmount, 10);

            // 共享限红
            if (humanboyDataMgr.getHumanboyRoom().tCurRoom.shareLimitAmount > 0) {
                // 四门总注
                let llAllTotalAmount: number = 0;
                humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((key: humanboy_proto.BetZoneOption, value: HumanboyZoneData, i?: number): string => {
                    if (key >= humanboy_proto.BetZoneOption.POS_LUCK) return "continue";
                    llAllTotalAmount += value.totalBet;
                });

                let str_all_total: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llAllTotalAmount, 10);
                this._setBetAreaLimitAmount(str_all_total, str_limit);
            }
            // 非共享限红
            else {
                this._vAreasInfo[nAreaIdx].txtTotalBetNum.string = cv.StringTools.formatC("%s/%s", str_total, str_limit);
            }
        }
    }

    /**
     * 初始化总限红描述
     */
    private _initBetAreaLimit(): void {
        let panel_txt: cc.Node = this._panel_game.getChildByName("panel_txt");
        this._txt_shared_limit_word = panel_txt.getChildByName("txt_shared_limit_word").getComponent(cc.Label);
        this._txt_shared_limit_amount = panel_txt.getChildByName("txt_shared_limit_amount").getComponent(cc.Label);

        this._txt_shared_limit_word.string = cv.config.getStringData("Humanboy_game_shared_limit_text");
    }

    /**
     * 设置总限红金额
     * @param strTotal 
     * @param strLimit 
     */
    private _setBetAreaLimitAmount(strTotal: string, strLimit: string): void {
        this._txt_shared_limit_amount.string = cv.StringTools.formatC("%s/%s", strTotal, strLimit);

        // 适配位置
        let szWord: cc.Size = cv.resMgr.getLabelStringSize(this._txt_shared_limit_word);
        let szScore: cc.Size = cv.resMgr.getLabelStringSize(this._txt_shared_limit_amount);

        let parentNode: cc.Node = this._txt_shared_limit_word.node.parent;
        let total_w: number = parentNode.width;
        let offset_w: number = 10;
        let start_x: number = (total_w - (szWord.width + offset_w + szScore.width)) / 2 - parentNode.anchorX * parentNode.width;

        let pos_x: number = start_x + this._txt_shared_limit_word.node.anchorX * szWord.width;
        let pos_y: number = this._txt_shared_limit_word.node.y;
        this._txt_shared_limit_word.node.setPosition(pos_x, pos_y);

        pos_x += this._txt_shared_limit_word.node.anchorX * szWord.width;
        pos_x += offset_w;
        pos_x += this._txt_shared_limit_amount.node.anchorX * szScore.width;
        this._txt_shared_limit_amount.node.setPosition(pos_x, pos_y);
    }

    /**
     * 重置下注区域限红
     */
    private _resetAllBetAreaLimitAmount(): void {
        this._mapBetAreaLimitAmount.clear();
        this._mapBetAreaLimitAmount.add(humanboy_proto.BetZoneOption.POS1, 0);
        this._mapBetAreaLimitAmount.add(humanboy_proto.BetZoneOption.POS2, 0);
        this._mapBetAreaLimitAmount.add(humanboy_proto.BetZoneOption.POS3, 0);
        this._mapBetAreaLimitAmount.add(humanboy_proto.BetZoneOption.POS4, 0);

        // 先填充所有区域限红
        let vOddsDetail: humanboy_proto.IOddsDetail[] = humanboyDataMgr.getHumanboyRoom().tCurRoom.oddsDetail;
        for (let i = 0; i < vOddsDetail.length; ++i) {
            let option: humanboy_proto.BetZoneOption = vOddsDetail[i].option;
            if (this._mapBetAreaLimitAmount.has(option)) {
                this._mapBetAreaLimitAmount[option] = vOddsDetail[i].limit;
            }
        }

        // 四门闲家共享的下注额限额 (0 代表不共享 > 0 代表四门闲共享一个限额)
        let llLimitAmount: number = humanboyDataMgr.getHumanboyRoom().tCurRoom.shareLimitAmount;
        if (llLimitAmount > 0) {
            this._mapBetAreaLimitAmount.forEachKeyValue((data: KeyValue<humanboy_proto.BetZoneOption, number>, i?: number): void => {
                data.value = llLimitAmount;
            });
        }

        // 共享限红文本显隐状态
        let bActive: boolean = llLimitAmount > 0;
        this._txt_shared_limit_word.node.active = bActive;
        this._txt_shared_limit_amount.node.active = bActive;
    }

    /**
      * 更新区域限红
      * @param betOption 
      * @param disAmount 
      */
    private _updateBettAreaLimitAmount(betOption: humanboy_proto.BetZoneOption, disAmount: number): void {
        let cb: Function = (op: humanboy_proto.BetZoneOption, dis: number): void => {
            if (this._mapBetAreaLimitAmount.has(op)) {
                let n: number = this._mapBetAreaLimitAmount.get(op);
                this._mapBetAreaLimitAmount.add(op, n + dis);
                if (this._mapBetAreaLimitAmount.get(op) <= 0) {
                    this._mapBetAreaLimitAmount.add(op, 0);
                }
            }
        };

        // 共享限红
        if (humanboyDataMgr.getHumanboyRoom().tCurRoom.shareLimitAmount > 0) {
            if (betOption < humanboy_proto.BetZoneOption.POS_LUCK) {
                for (let i = 0; i < this._vAreasInfo.length; ++i) {
                    let option: humanboy_proto.BetZoneOption = this._vAreasInfo[i].eZone;

                    // 改为总限红显示不变, 此处注释
                    //cb(option, disAmount);

                    this._updateBetAreaBetsNum(option);
                }
            }
            else {
                this._updateBetAreaBetsNum(betOption);
            }
        }
        // 非共享
        else {
            cb(betOption, disAmount);
            this._updateBetAreaBetsNum(betOption);
        }
    }

    /**
     * 更新下注区域是否可触摸
     */
    private _updateBetAreaTouchEnabled(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            let pArea: tHumanboyAreaInfo = this._vAreasInfo[i];
            let bEnabled: boolean = true;
            bEnabled = bEnabled && humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET;
            //bEnabled = bEnabled && !humanboyDataMgr.getHumanboyRoom().bOnDealerList;
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
     * 重置指定下注区域
     * @param betOption 
     */
    private _resetBetArea(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let pArea: tHumanboyAreaInfo = this._vAreasInfo[nAreaIdx];

        // 填充下注文本默认值
        this._updateBetAreaBetsNum(betOption, 0, 0);

        pArea.panelArea.getComponent(cc.BlockInputEvents).enabled = true;
        if (pArea.panelCard) {
            pArea.panelCard.active = false;
            pArea.imgCardTypeBg.node.active = false;
            pArea.imgCardTypeTxt.node.active = false;
        }

        // 重置牌组精灵
        this._resetPlayerCards(betOption, false);

        // 重置金币池
        this._resetBetAreaCoins(betOption);

        // 隐藏win动画
        this._hideWinFlagAnim(betOption);
    }

    /**
     * 重置所有下注区域
     */
    private _resetAllBetAreas(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._resetBetArea(this._vAreasInfo[i].eZone);
        }

        // 重置金币池节点深度计数
        this._llCoinPoolZOrderCount = 0;

        // 清理"金币最优队列"
        this._vCoinOptimizationDeque.clear();
    }

    /**
     * 初始化下注按钮
     */
    private _initBetButtons(): void {
        for (let i = 0; i < this._nBetBtnNum; ++i) {
            let betCoin: HumanboyBetCoin = this._panel_betbtn.getChildByName(cv.StringTools.formatC("btn_bet_%d", i)).getComponent(HumanboyBetCoin);
            betCoin.node.setScale(this._fBetBtnSrcScaleRate);
            betCoin.node.on("click", (event: cc.Event): void => {
                this._playSoundEffect(this._sound_button);
                this._setBetButtonSelected(i);
            });
            this._vBetButtons.push(betCoin);
        }

        // 初始化高级续投面板
        if (!this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto = cc.instantiate(this.prefab_hb_advancedAuto).getComponent(HumanboyAdvancedAuto);
            this.node.addChild(this._humanboyAdvancedAuto.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_ADVANCE_AUTO_SELECT);
        }

        // 续投按钮
        this._btn_betAuto = this._panel_betbtn.getChildByName("btn_bet_auto").getComponent(cc.Button);
        this._btn_betAuto.node.on("click", (event: cc.Event): void => {
            this._playSoundEffect(this._sound_button);

            switch (this._eAutoBtnStyle) {
                // 常规续投点击
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                    cv.humanboyNet.requestAutoBet();
                } break;

                // 高级续投已激活(再次点击 弹出高级续投选项面板)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                    // if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET) {
                    this._humanboyAdvancedAuto.adaptSelectPanelPos(this._btn_betAuto.node);
                    this._humanboyAdvancedAuto.showSelectPanel(true);
                    // }
                } break;

                // 高级续投中(再次点击取消)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                    let iUsedAutoBetCount: number = humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount;
                    let iSelectAutoBetCount: number = humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount;
                    let dialog: HumanboyDialog = cc.instantiate(this.prefab_hb_dialog).getComponent(HumanboyDialog);
                    dialog.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_stop_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                        , cv.config.getStringData("CowBoy_btn_desc_stop_auto_bet")
                        , cv.config.getStringData("CowBoy_btn_desc_resume_auto_bet")
                        , (sender: HumanboyDialog): void => { cv.humanboyNet.reqCancelAdvanceAutoBet(); }
                        , (sender: HumanboyDialog): void => { });
                    this.node.addChild(dialog.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_SERVER_TOAST);
                } break;

                default:
                    break;
            }
        });

        // 清屏按钮
        this._btn_betClean = this._panel_betbtn.getChildByName("btn_bet_clean").getComponent(cc.Button);
        this._btn_betClean.normalSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_normal");
        this._btn_betClean.pressedSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_normal");
        this._btn_betClean.hoverSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_normal");
        this._btn_betClean.disabledSprite = this._atlas_cb_language.getSpriteFrame("clean_screen_gray");
        this._btn_betClean.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._resetAllBetAreaCoins();
        });

        // 默认选中第一个下注按钮
        this._setBetButtonSelected(0, false);
    }

    /**
     * 初始化红包等相关按钮入口
     */
    private _initRedPackage(): void {
        // 红包节按钮
        this._btn_redpacket_festival = this._panel_betbtn.getChildByName("btn_redpacket_festival");
        this._btn_redpacket_festival.getComponent(cc.Sprite).spriteFrame = null;
        this._btn_redpacket_festival.active = false;

        // 红包节按钮提示层
        this._btn_redpacket_festival_layer = cc.instantiate(this._btn_redpacket_festival);
        this.node.addChild(this._btn_redpacket_festival_layer, eHumanboyLocalZorder.HL_ZORDER_PANEL_RED_PACKET);

        let wpos: cc.Vec2 = cc.Vec2.ZERO;
        this._btn_redpacket_festival.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
        this._btn_redpacket_festival_layer.setPosition(this._btn_redpacket_festival_layer.parent.convertToNodeSpaceAR(wpos));

        // 初始执行一次
        this._onMsgShowLuckButton();
    }

    /**
     * 重置指定下注按钮
     * @param index 
     * @param enabled 
     */
    private _resetBetButton(index: number, enabled: boolean): void {
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
    private _resetAllBetButtons(enabled: boolean): void {
        for (let i = 0; i < this._vBetButtons.length; ++i) {
            this._resetBetButton(i, enabled);
        }
    }

    private _updateBetAmountLevel(): void {
        let vBetCoinOption: number[] = humanboyDataMgr.getHumanboyRoom().vBetCoinOption;
        for (let i = 0; i < vBetCoinOption.length; ++i) {
            if (i < this._nBetBtnNum) {
                let llAmountLevel: number = cv.StringTools.clientGoldByServer(vBetCoinOption[i]);
                this._vBetButtons[i].setTxtNum(cv.StringTools.numberToShowNumber(llAmountLevel));
                if (llAmountLevel < humanboyDataMgr.getHumanboyRoom().llCoinUICritical) {
                    this._vBetButtons[i].setShape(HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_COIN);
                }
                else {
                    this._vBetButtons[i].setShape(HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_BLOCK);
                }
            }
            else {
                console.error(cv.StringTools.formatC("HumanboyMainView._updateBetAmountLevel vBetCoinOption must be %d, size: %d", this._nBetBtnNum, vBetCoinOption.length));
            }
        }

        switch (humanboyDataMgr.getHumanboyRoom().eAutoLevel) {
            case humanboy_proto.AutoBetLevel.Level_Normal: {
                this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL);
            } break;

            case humanboy_proto.AutoBetLevel.Level_Advance: {
                if (humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount > 0) {
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
     * 更新赔率
     */
    private _updateBetOddsDetail(): void {
        let vOddsDetail: humanboy_proto.IOddsDetail[] = humanboyDataMgr.getHumanboyRoom().tCurRoom.oddsDetail;
        for (let i = 0; i < vOddsDetail.length; ++i) {
            let llOdds: number = vOddsDetail[i].odds;
            let option: humanboy_proto.BetZoneOption = vOddsDetail[i].option;

            for (let j = 0; j < this._vAreasInfo.length; ++j) {
                if (this._vAreasInfo[j].eZone > humanboy_proto.BetZoneOption.POS_LUCK && this._vAreasInfo[j].eZone === option) {
                    if (this._vAreasInfo[j].txtOdds) {
                        let str_odds: string = cv.StringTools.clientGoldByServer(llOdds).toString();
                        str_odds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_table_odd"));
                        this._vAreasInfo[j].txtOdds.string = str_odds;
                    }
                }
            }
        }
    }

    /**
     * 更新下注按钮状态
     * @param bCheckCoin 是否检测金币数量(默认:true, 之所以提出来一个参数, 是因为一局结束通知也调用了该函数, 为了避免一局结束提前通过按钮状态知道输赢结果, 显示更友好)
     */
    private _updateBetButtonState(bCheckCoin: boolean = true): void {
        // 检测下注按钮禁用与否
        let vBetCoinOption: number[] = humanboyDataMgr.getHumanboyRoom().vBetCoinOption;		// 房间下注级别
        let curCoin: number = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin;		    // 当前自身携带金币
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
        let bEffective: boolean = humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() > 0;
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
     * 更新续投按钮状态
     */
    private _updateAutoBetBtnStatus(): void {
        switch (this._eAutoBtnStyle) {
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() > 0) {
                    // 当前一局下过注
                    if (humanboyDataMgr.getHumanboyRoom().bHasBetInCurRound) {
                        this._btn_betAuto.interactable = false;
                    }
                    else {
                        let canAuto: boolean = humanboyDataMgr.getHumanboyRoom().bCanAuto;
                        this._btn_betAuto.interactable = canAuto;
                    }
                }
                else {
                    this._btn_betAuto.interactable = false;
                }

            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                // 当前一局下过注
                if (humanboyDataMgr.getHumanboyRoom().bHasBetInCurRound) {
                    this._btn_betAuto.interactable = true;
                }
                else {
                    let canAuto = humanboyDataMgr.getHumanboyRoom().bCanAuto;
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
        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() > 0) {
            bEnable = true;
        }
        this._btn_betClean.getComponent(cc.Button).interactable = bEnable;
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
     * 检测高级续投请求
     */
    private _checkAdvanceAutoReq(): void {
        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getAutoBetBtnStytle() === MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING) {
            if (this._humanboyAdvancedAuto) {
                this._humanboyAdvancedAuto.hideAdvanceAutoTips();
            }

            if (humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount < humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount) {
                cv.humanboyNet.reqAdvanceAutoBet();
            }
        }
    }

    /**
     * 重置下个状态的截止时间
     */
    private _resetLeftTime(): void {
        this._nLeftTime = humanboyDataMgr.getHumanboyRoom().llLeftSeconds;

        this._msNowTime = 0;
        this._msLastTime = 0;

        // let date: Date = new Date();
        // let tv_usec: number = date.getMilliseconds();
        // this._msLastTime = tv_usec;
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
        this._img_bet_clock.setPosition(this._src_bet_clock_pos);

        let worldPos: cc.Vec2 = cc.v2(0, cc.winSize.height / 2 + this._img_bet_clock.height / 2);
        this.node.convertToWorldSpaceAR(worldPos, worldPos);
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this._img_bet_clock.parent.convertToNodeSpaceAR(worldPos, nodePos);
        let pos: cc.Vec2 = cc.v2(this._src_bet_clock_pos.x, nodePos.y);

        let ftn_clock: cc.Label = this._img_bet_clock.getChildByName("txt").getComponent(cc.Label);
        ftn_clock.string = "1";

        if (bShow) {
            if (bAnim) {
                this._img_bet_clock.setPosition(pos);
                let mt: cc.ActionInterval = cc.moveTo(this._fActExecute_BetClock, this._src_bet_clock_pos);
                let ebo: cc.ActionInterval = mt.easing(cc.easeBackOut());
                this._img_bet_clock.runAction(ebo);
            }
            else {
                this._img_bet_clock.setPosition(this._src_bet_clock_pos);
            }
            ftn_clock.string = cv.StringTools.formatC("%lld", this._getLeftTime());
        }
        else {
            if (bAnim) {
                this._img_bet_clock.setPosition(this._src_bet_clock_pos);
                let mt: cc.ActionInterval = cc.moveTo(this._fActExecute_BetClock, pos);
                let ebi: cc.ActionInterval = mt.easing(cc.easeBackIn());
                this._img_bet_clock.runAction(cc.sequence(ebi, cc.callFunc((): void => { this._img_bet_clock.active = false; })));
            }
            else {
                this._img_bet_clock.setPosition(this._src_bet_clock_pos);
                this._img_bet_clock.active = false;
            }
        }
    }

    /**
     * 更新下注计时器面板
     */
    private _updateTimeBetClock(): void {
        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() > 0) {
            this.schedule(this._onTimeBetClock, 1.0);
            this._showBetClockAction(true, true);
        }
        else {
            this.unschedule(this._onTimeBetClock);
            this._showBetClockAction(false, true);
        }
    }

    /**
     * 更新下注倒计时
     * @param f32Delta 
     */
    private _onTimeBetClock(f32Delta: number): void {
        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() > 0) {
            this._playSoundEffect(this._sound_time_tick);
            this._showBetClockAction(true, false);
        }
        else {
            this.unschedule(this._onTimeBetClock);
            this._showBetClockAction(false, true);
        }
    }

    /**
     * 下一轮准备
     */
    private _showNextRoundPrepare(): void {
        // 维护状态:非0代表系统即将维护
        if (humanboyDataMgr.getHumanboyRoom().nStopWorld != 0) {
            this._showGameToast(cv.config.getStringData("Humanboy_server_will_stop_text"));
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc((): void => {
                this._backToRoomListScene();
            }, this)));
        }
        else {
            this._resetAllCards();
            this._resetAllBetAreaLimitAmount();
            this._resetAllBetAreas();
            this._restAllTimelineAnims();
            this._updateAllWayOut();

            // 更新庄家信息
            this._updateDealerInfo();

            // 恢复上庄列表面板中的"我要上庄按钮"点击状态
            if (this._dealerListView) {
                this._dealerListView.checkBtnDealerEnable();
            }

            // 下一局即将开始
            this._updateNextRoundCountDown();
        }
    }

    /**
     * 更新开局倒计时
     */
    private _updateNextRoundCountDown(): void {
        if (this._bWaitting) return;

        let nLeftTime: number = this._getLeftTime();
        if ((humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.WAIT_NEXT_ROUND2) && nLeftTime > 0) {
            this.schedule(this._onTimeNextRoundCountDown, 1.0);
            this._showNextRoundCountDown(true, nLeftTime);
        }
        else {
            this.unschedule(this._onTimeNextRoundCountDown);
            this._showNextRoundCountDown(false, 0);
        }
    }

    /**
     * 更新开局倒计时
     * @param f32Delta 
     */
    private _onTimeNextRoundCountDown(f32Delta: number): void {
        let eCurState: humanboy_proto.RoundState = humanboyDataMgr.getHumanboyRoom().eCurState;
        let nLeftTime: number = this._getLeftTime();
        if ((eCurState === humanboy_proto.RoundState.WAIT_NEXT_ROUND2) && nLeftTime > 0) {
            this._showNextRoundCountDown(true, nLeftTime);
        }
        else {
            this.unschedule(this._onTimeNextRoundCountDown);
            this._showNextRoundCountDown(false, 0);
        }
    }

    /**
     * 下一轮提示动画
     * @param bShow 
     * @param fDelta 
     */
    private _showNextRoundCountDown(bShow: boolean, fDelta: number): void {
        this._img_count_down.node.active = bShow;
        let txt: cc.Label = this._img_count_down.node.getChildByName("txt").getComponent(cc.Label);
        if (bShow) {
            txt.string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_tips_wait_next_round_text"), fDelta);
        }
        else {
            txt.string = "0";
        }
    }

    /**
     * 耐心等待下一局动画
     * @param bShow 
     * @param fDelta 
     */
    private _showNextRoundEnterCountDown(bShow: boolean, fDelta: number): void {
        this._img_count_down.node.active = bShow;
        let txt: cc.Label = this._img_count_down.node.getChildByName("txt").getComponent(cc.Label);
        if (bShow) {
            txt.string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_tips_wait_next_enter_text"), fDelta);
        }
        else {
            txt.string = "0";
        }
    }

    /**
     * 显示刚进入房间等待时间
     * @param bShow 
     */
    private _showWaittingTime(bShow: boolean): void {
        this._nWaittingTime = this._getLeftTime();
        if (bShow && humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.WAIT_NEXT_ROUND && this._nWaittingTime >= 0) {
            this._bWaitting = true;
            this.schedule(this._onTimeWaitting, 1.0);
            this._showNextRoundEnterCountDown(true, this._nWaittingTime);
        }
        else {
            this._bWaitting = false;
            this._nWaittingTime = 0;
            this.unschedule(this._onTimeWaitting);
            this._showNextRoundEnterCountDown(false, 0);
        }
    }

    private _onTimeWaitting(f32Delta: number): void {
        let eCurState: humanboy_proto.RoundState = humanboyDataMgr.getHumanboyRoom().eCurState;
        if (--this._nWaittingTime >= 0) {
            this._showNextRoundEnterCountDown(true, this._nWaittingTime);
        }
        else {
            this._showWaittingTime(false);
        }
    }

    /**
     * 加载时间轴动画文件
     */
    private _initTimelineAnims(): void {
        this._nodeAnim = new cc.Node();
        this._nodeAnim.setContentSize(cc.winSize);
        this._nodeAnim.setAnchorPoint(cc.v2(0.5, 0.5));
        this._nodeAnim.setPosition(cc.Vec2.ZERO);
        this.node.addChild(this._nodeAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE);

        // win 旗子动画
        do {
            for (let i = 0; i < this._vAreasInfo.length; ++i) {
                let size: cc.Size = this._vAreasInfo[i].panelCoin.getContentSize();
                let pos: cc.Vec2 = cc.Vec2.ZERO;
                this._vAreasInfo[i].panelCoin.convertToWorldSpaceAR(cc.v2(0, - 170), pos);
                let nodeWinAnim = cc.instantiate(this.prefab_hb_win_flag);
                this._nodeAnim.addChild(nodeWinAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);

                nodeWinAnim.parent.convertToNodeSpaceAR(pos, pos);
                nodeWinAnim.setPosition(pos);
                nodeWinAnim.active = false;

                this._vNodeWinFlagAnims.push(nodeWinAnim);
                this._vAtlWinFlagActions.push(nodeWinAnim.getComponent(cc.Animation));
            }
        } while (false);

        // 开始下注动画
        do {
            this._nodeFightBeginAnim = cc.instantiate(this.prefab_hb_start_bets);
            this._nodeAnim.addChild(this._nodeFightBeginAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);

            this._nodeFightBeginAnim.setPosition(cc.Vec2.ZERO);
            this._nodeFightBeginAnim.active = false;

            this._atlFightBeginAction = this._nodeFightBeginAnim.getComponent(cc.Animation);

            // 切换语言, 切换资源
            let img_start_bet_node: cc.Node = this._nodeFightBeginAnim.getChildByName("Sprite_2");
            cv.resMgr.setSpriteFrame(img_start_bet_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/002"));

            let img_choose_box_node: cc.Node = this._nodeFightBeginAnim.getChildByName("Sprite_7");
            cv.resMgr.setSpriteFrame(img_choose_box_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/004"));
        } while (false);

        // 停止下注动画
        do {
            this._nodeFightEndAnim = cc.instantiate(this.prefab_hb_end_bets);
            this._nodeAnim.addChild(this._nodeFightEndAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);

            this._nodeFightEndAnim.setPosition(cc.Vec2.ZERO);
            this._nodeFightEndAnim.active = false;

            this._atlFightEndAction = this._nodeFightEndAnim.getComponent(cc.Animation);

            // 切换语言, 切换资源
            let img_clos_bet_node: cc.Node = this._nodeFightEndAnim.getChildByName("Sprite_2");
            cv.resMgr.setSpriteFrame(img_clos_bet_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/003"));

            let img_times_up_node: cc.Node = this._nodeFightEndAnim.getChildByName("Sprite_7");
            cv.resMgr.setSpriteFrame(img_times_up_node, cv.config.getLanguagePath("game/humanboy/animation/game_round/005"));
        } while (false);

        // 庄家完胜完败(该预制件比较特殊, 不仅资源分语言, 模型也分语言)
        do {
            let prefab_hb_dealer_victory: cc.Prefab = null;
            let prefab_hb_dealer_defeat: cc.Prefab = null;
            switch (cv.config.getCurrentLanguage()) {
                case cv.Enum.LANGUAGE_TYPE.zh_CN: {
                    prefab_hb_dealer_victory = this.prefab_hb_dealer_victory_zh_CN;
                    prefab_hb_dealer_defeat = this.prefab_hb_dealer_defeat_zh_CN;
                } break;

                default: {
                    prefab_hb_dealer_victory = this.prefab_hb_dealer_victory_en_US;
                    prefab_hb_dealer_defeat = this.prefab_hb_dealer_defeat_en_US;
                } break;
            }

            // 完胜
            this._nodeDealerVictoryAnim = cc.instantiate(prefab_hb_dealer_victory);
            this._nodeAnim.addChild(this._nodeDealerVictoryAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);
            this._nodeDealerVictoryAnim.setPosition(cc.Vec2.ZERO);
            this._nodeDealerVictoryAnim.active = false;
            this._atlDealerVictoryAction = this._nodeDealerVictoryAnim.getComponent(cc.Animation);

            // 完败
            this._nodeDealerDefeatAnim = cc.instantiate(prefab_hb_dealer_defeat);
            this._nodeAnim.addChild(this._nodeDealerDefeatAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);
            this._nodeDealerDefeatAnim.setPosition(cc.Vec2.ZERO);
            this._nodeDealerDefeatAnim.active = false;
            this._atlDealerDefeatAction = this._nodeDealerDefeatAnim.getComponent(cc.Animation);
        } while (false);

        // 路单闪光动画
        do {
            let pos: cc.Vec2 = cc.Vec2.ZERO;
            this._btn_record.node.parent.convertToWorldSpaceAR(this._btn_record.node.position, pos);

            this._nodeWayoutLightAnim = cc.instantiate(this.prefab_hb_way_out);
            this._nodeAnim.addChild(this._nodeWayoutLightAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);

            this._nodeWayoutLightAnim.setPosition(this._nodeWayoutLightAnim.parent.convertToNodeSpaceAR(pos));
            this._nodeWayoutLightAnim.active = false;

            this._atlWayoutLightAction = this._nodeWayoutLightAnim.getComponent(cc.Animation);
        } while (false);
    }

    /**
     * 隐藏所有timeline动画
     */
    private _restAllTimelineAnims(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._hideWinFlagAnim(this._vAreasInfo[i].eZone);
        }

        this._atlFightBeginAction.stop();
        this._nodeFightBeginAnim.active = false;

        this._atlFightEndAction.stop();
        this._nodeFightEndAnim.active = false;

        this._atlDealerVictoryAction.stop();
        this._nodeDealerVictoryAnim.active = false;

        this._atlDealerDefeatAction.stop();
        this._nodeDealerDefeatAnim.active = false;

        this._atlWayoutLightAction.stop();
        this._nodeWayoutLightAnim.active = false;

        this._clearJackPotAnim();
        this._clearSpecialCardTypeAnim();
        this._clearSpecialCardTypeHighLightAnim();
        this._hideAllWinPlayerLightAnim();

        this._nodeAnim.stopAllActions();
    }

    /**
     * 按指定动画的持续时间计算该动画播放速度(应用于所有动画剪辑)
     * @param anim 
     * @param executeTime 
     */
    private _getAnimClipSpeedByDuring(animClip: cc.AnimationClip, executeTime: number): number {
        let speed: number = animClip.speed;
        if (executeTime > 0) {
            let totalFrames: number = animClip.sample * animClip.duration;
            speed = totalFrames / cc.game.getFrameRate() / executeTime;
        }
        return speed;
    }

    /**
     * 开局动画
     */
    private _showRoundStartAnim(): void {
        // 开始发牌
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActDelayed_SendCard), cc.callFunc((): void => {
            this._sendAllCardsAnim();
        })));

        // 开始下注与发完牌动画一致
        let fDelayedTime: number = this._fActDelayed_SendCard + this._fActExecute_SendCard - this._fActDelayed_FightBegin - this._fActExecute_FightBegin;
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
            this._showFightBeginAnim();
        }, this)));
    }

    /**
     * 开始下注动画
     */
    private _showFightBeginAnim(): void {
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActDelayed_FightBegin), cc.callFunc((): void => {
            this._playSoundEffect(this._sound_begin_bet);
            this._nodeFightBeginAnim.active = true;

            let start_bets: cc.AnimationClip = this._atlFightBeginAction.defaultClip;
            start_bets.speed = this._getAnimClipSpeedByDuring(start_bets, this._fActExecute_FightBegin);
            start_bets.wrapMode = cc.WrapMode.Normal;

            this._atlFightBeginAction.play();
            this._atlFightBeginAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                this._atlFightBeginAction.off(cc.Animation.EventType.FINISHED);
                this._nodeFightBeginAnim.active = false;
            }, this);
        }, this)));
    }

    /**
     * 停止下注 => 翻牌 => win标记检测 => 庄家完胜完败检测 => jackpot检测 => 特殊牌型检测 => 飞庄家金币 => 飞闲家金币 => 清屏 => 等待下一局
     */
    private _showRoundEndAnim(): void {
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActDelayed_FightEnd), cc.callFunc((): void => {
            this._playSoundEffect(this._sound_end_bet);
            this._nodeFightEndAnim.active = true;

            let end_bets: cc.AnimationClip = this._atlFightEndAction.defaultClip;
            end_bets.speed = this._getAnimClipSpeedByDuring(end_bets, this._fActExecute_FightEnd);
            end_bets.wrapMode = cc.WrapMode.Normal;

            this.playPointAni();
            this._atlFightEndAction.play();
            this._atlFightEndAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                this._atlFightEndAction.off(cc.Animation.EventType.FINISHED);
                this._nodeFightEndAnim.active = false;
                this._showAllCardsAnim();
            }, this);
        }, this)));
    }

    /**
     * 发牌阶段(包含庄家,闲家等发牌动作)
     */
    private _sendAllCardsAnim(): void {
        this._resetAllCards();
        this._sendDealerCardsAnim(this._sendOneCardCallBack);
        this._sendPlayerCardsAnim(this._sendOneCardCallBack);
    }

    /**
     * 翻牌阶段(包含庄家,闲家等翻牌动作)
     * @param anim 
     */
    private _showAllCardsAnim(anim: boolean = true): void {
        let vPlayerHoleCard: humanboy_proto.PlayerHoleCard[] = humanboyDataMgr.getHumanboyRoom().vPlayerHoleCard;

        let fDelayedTime1: number = 0;
        let fDelayedTime2: number = 0;
        for (let i = 0; i < vPlayerHoleCard.length; ++i) {
            let option: humanboy_proto.BetZoneOption = vPlayerHoleCard[i].option;
            switch (option) {
                // 庄
                case humanboy_proto.BetZoneOption.HOST: {
                    if (anim) {
                        fDelayedTime1 = this._fActDelayed_ShowCard_Step_1;
                        fDelayedTime2 = fDelayedTime1 + this._fActExecute_ShowCard_Step_1 + this._fActExecute_ShowCard_Step_2;
                    }

                    // 翻牌
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime1), cc.callFunc((): void => {
                        this._playSoundEffect(this._sound_kaipai);
                        this._showDealerCardsAnim(vPlayerHoleCard[i], this._showOneCardCallBack, anim);
                    }, this)));

                    // 翻牌型
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime2), cc.callFunc((): void => {
                        this._showCardType(option);
                    }, this)));
                } break;

                // 闲
                case humanboy_proto.BetZoneOption.POS1:
                case humanboy_proto.BetZoneOption.POS2:
                case humanboy_proto.BetZoneOption.POS3:
                case humanboy_proto.BetZoneOption.POS4: {
                    if (anim) {
                        fDelayedTime1 = this._fActDelayed_ShowCard_Step_2 + fDelayedTime1 + this._fActExecute_ShowCard_Step_1 + this._fActExecute_ShowCard_Step_2;
                        fDelayedTime2 = this._fActDelayed_ShowCard_Step_2 + fDelayedTime1 + this._fActExecute_ShowCard_Step_1 + this._fActExecute_ShowCard_Step_2;
                    }

                    // 翻牌
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime1), cc.callFunc((): void => {
                        this._playSoundEffect(this._sound_kaipai);
                        this._showPlayerCardsAnim(vPlayerHoleCard[i], this._showOneCardCallBack, anim);
                    }, this)));

                    // 翻牌型, 显示win动画
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime2), cc.callFunc((): void => {
                        this._showCardType(option);

                        let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(option);
                        if (zoneData && zoneData.result < 0) {
                            this._showWinFlagAnim(option);
                        }
                    }, this)));
                } break;

                default:
                    break;
            }
        }
    }

    /**
     * 发完一张牌回调
     */
    private _sendOneCardCallBack(): void {
        // 发完所有牌 . 开战动画
        if (++this._nSendCardsCallBackNum >= this._nSendCardsTotalNum) {
            this._nSendCardsCallBackNum = 0;
            this._img_dealer_card_shield.active = false;
            //this._showFightBeginAnim();
        }
    }

    /**
     * 翻完一张牌回调
     */
    private _showOneCardCallBack(): void {
        // 开完牌
        if (++this._nSendCardsCallBackNum >= this._nSendCardsTotalNum) {
            this._nSendCardsCallBackNum = 0;
            this._showCardTypeFinish();
        }
    }

    /**
     * 发庄家牌动画
     * @param func 
     */
    private _sendDealerCardsAnim(func: () => void): void {
        let fInterval: number = this._fActExecute_SendCard / (this._vDealerCardNode.length + 1);
        for (let i = 0; i < this._vDealerCardNode.length; ++i) {
            let card: CowboyCard = this._vDealerCardNode[i];
            let pos: cc.Vec2 = this._vDealerCardSrcPos[i];
            card.node.setPosition(pos.x, pos.y - card.node.height / 2);

            let delayTime: number = i * fInterval;
            this.scheduleOnce((elapsed: number): void => {
                card.node.active = true;
                card.node.runAction(cc.sequence(cc.callFunc((): void => { this._playSoundEffect(this._sound_fapai); }, this)
                    , cc.moveTo(fInterval, pos).easing(cc.easeInOut(1.0))
                    , cc.callFunc(func, this)));
            }, delayTime);
        }
    }

    /**
     * 发闲家牌动画
     * @param func 
     */
    private _sendPlayerCardsAnim(func: () => void): void {
        let fInterval: number = this._fActExecute_SendCard / (this._vAreasInfo.length + 1);
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            let area: tHumanboyAreaInfo = this._vAreasInfo[i];
            if (area.panelCard) area.panelCard.active = true;
            for (let j = 0; j < area.vCardsNode.length; ++j) {
                let card: CowboyCard = area.vCardsNode[j];
                let pos: cc.Vec2 = area.vCardsSrcPos[j];
                card.node.setPosition(pos.x, pos.y - card.node.height / 2);

                let delayTime: number = j * fInterval;
                this.scheduleOnce((elapsed: number): void => {
                    card.node.active = true;
                    card.node.runAction(cc.sequence(cc.moveTo(fInterval, pos).easing(cc.easeInOut(1.0)), cc.callFunc(func, this)));
                }, delayTime);
            }
        }
    }

    /**
     * 翻庄家牌动画
     * @param playerHoleCard 
     * @param func 
     * @param anim 
     */
    private _showDealerCardsAnim(playerHoleCard: humanboy_proto.PlayerHoleCard, func: () => void, anim: boolean = true): void {
        let vCardItem: humanboy_proto.ICardItem[] = playerHoleCard.holeCards;
        for (let i = 0; i < this._vDealerCardNode.length; ++i) {
            if (i >= vCardItem.length) break;
            let card: CowboyCard = this._vDealerCardNode[i];
            let pos1: cc.Vec2 = this._vDealerCardSrcPos[0];
            let pos2: cc.Vec2 = this._vDealerCardSrcPos[i];

            if (anim) {
                card.node.runAction(cc.sequence(cc.moveTo(this._fActExecute_ShowCard_Step_1, pos1), cc.callFunc((): void => {
                    card.SetContent(vCardItem[i].number, vCardItem[i].suit);
                    card.SetFace(true);
                }, this), cc.moveTo(this._fActExecute_ShowCard_Step_2, pos2), cc.callFunc(func, this)));
            }
            else {
                card.node.setPosition(pos2);
                card.SetContent(vCardItem[i].number, vCardItem[i].suit);
                card.SetFace(true);
            }
        }
    }

    /**
     * 翻闲家牌动画
     * @param playerHoleCard 
     * @param func 
     * @param anim 
     */
    private _showPlayerCardsAnim(playerHoleCard: humanboy_proto.PlayerHoleCard, func: () => void, anim: boolean = true): void {
        let option: humanboy_proto.BetZoneOption = playerHoleCard.option;
        let nAreaIdx: number = this._getAreaIdxByBetOption(option);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let vCardItem: humanboy_proto.ICardItem[] = playerHoleCard.holeCards;
        for (let i = 0; i < this._vAreasInfo[nAreaIdx].vCardsNode.length; ++i) {
            if (i >= vCardItem.length) break;
            let card: CowboyCard = this._vAreasInfo[nAreaIdx].vCardsNode[i];
            let pos1: cc.Vec2 = this._vAreasInfo[nAreaIdx].vCardsSrcPos[0];
            let pos2: cc.Vec2 = this._vAreasInfo[nAreaIdx].vCardsSrcPos[i];

            if (anim) {
                card.node.runAction(cc.sequence(cc.moveTo(this._fActExecute_ShowCard_Step_1, pos1), cc.callFunc((): void => {
                    card.SetContent(vCardItem[i].number, vCardItem[i].suit);
                    card.SetFace(true);
                }, this), cc.moveTo(this._fActExecute_ShowCard_Step_2, pos2), cc.callFunc(func, this)));
            }
            else {
                card.node.setPosition(pos2);
                card.SetContent(vCardItem[i].number, vCardItem[i].suit);
                card.SetFace(true);
            }
        }
    }

    /**
     * 显示牌型(比牌)
     * @param betOption 
     */
    private _showCardType(betOption: humanboy_proto.BetZoneOption): void {
        let str_card_type: string = "";
        let vPlayerHoleCard: humanboy_proto.PlayerHoleCard[] = humanboyDataMgr.getHumanboyRoom().vPlayerHoleCard;
        for (let i = 0; i < vPlayerHoleCard.length; ++i) {
            if (vPlayerHoleCard[i].option === betOption) {
                // 与庄家比大小的结果 = 0 相同 > 0 庄家赢 < 0 闲家赢
                // let result: number = vPlayerHoleCard[i].result;

                // 成牌牌型
                switch (vPlayerHoleCard[i].level) {
                    case humanboy_proto.CardResult.CardResult_Dummy: break;
                    case humanboy_proto.CardResult.GAO_PAI: str_card_type = "humanboy_card_type_high_card"; break;
                    case humanboy_proto.CardResult.YI_DUI: str_card_type = "humanboy_card_type_pair"; break;
                    case humanboy_proto.CardResult.LIAN_DUI: str_card_type = "humanboy_card_type_two_pair"; break;
                    case humanboy_proto.CardResult.SAN_TIAO: str_card_type = "humanboy_card_type_three_of_a_kind"; break;
                    case humanboy_proto.CardResult.SHUN_ZI: str_card_type = "humanboy_card_type_straight"; break;
                    case humanboy_proto.CardResult.TONG_HUA: str_card_type = "humanboy_card_type_flush"; break;
                    case humanboy_proto.CardResult.HU_LU: str_card_type = "humanboy_card_type_gourd"; break;
                    case humanboy_proto.CardResult.SI_TIAO: str_card_type = "humanboy_card_type_four_of_a_kind"; break;
                    case humanboy_proto.CardResult.TONG_HUA_SHUN: str_card_type = "humanboy_card_type_straight_flush"; break;
                    case humanboy_proto.CardResult.HUANG_TONG: str_card_type = "humanboy_card_type_royal_flush"; break;
                    default: break;
                }

                switch (vPlayerHoleCard[i].option) {
                    // 庄
                    case humanboy_proto.BetZoneOption.HOST: {
                        this._img_dealer_card_type.node.parent.active = true;
                        this._img_dealer_card_type.spriteFrame = this._atlas_hb_language.getSpriteFrame(str_card_type);
                    } break;

                    // 闲
                    case humanboy_proto.BetZoneOption.POS1:
                    case humanboy_proto.BetZoneOption.POS2:
                    case humanboy_proto.BetZoneOption.POS3:
                    case humanboy_proto.BetZoneOption.POS4: {
                        let nAreaIdx: number = this._getAreaIdxByBetOption(vPlayerHoleCard[i].option);
                        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) break;

                        this._vAreasInfo[nAreaIdx].imgCardTypeBg.node.active = true;
                        this._vAreasInfo[nAreaIdx].imgCardTypeTxt.node.active = true;
                        this._vAreasInfo[nAreaIdx].imgCardTypeTxt.spriteFrame = this._atlas_hb_language.getSpriteFrame(str_card_type);
                    } break;

                    default:
                        break;
                }
                break;
            }
        }
    }

    /**
     * 显示牌型(比牌)
     */
    private _showAllCardType(): void {
        let vPlayerHoleCard: humanboy_proto.PlayerHoleCard[] = humanboyDataMgr.getHumanboyRoom().vPlayerHoleCard;
        for (let i = 0; i < vPlayerHoleCard.length; ++i) {
            this._showCardType(vPlayerHoleCard[i].option);
        }
    }

    /**
     * 比牌完毕
     * @param nStep 
     */
    private _showCardTypeFinish(nStep: number = 0): void {
        let fDelayedTime: number = 0;					// 总体节奏时间
        let bShowDealerScore: boolean = false;			// 庄家是否飘分

        switch (nStep) {
            // 庄家完胜完败检测(1 - 代表庄家完胜, 2 - 代表庄家玩败)
            case 0: {
                let fActDelayed_VictoryOrDefeat: number = 0;
                let fActExecute_VictoryOrDefeat: number = 0;
                let uDealerWinAll: number = humanboyDataMgr.getHumanboyRoom().uDealerWinAll;
                if (uDealerWinAll === 1 || uDealerWinAll === 2) {
                    fActDelayed_VictoryOrDefeat = this._fActDelayed_VictoryOrDefeat;
                    fActExecute_VictoryOrDefeat = this._fActExecute_VictoryOrDefeat;

                    fDelayedTime += fActDelayed_VictoryOrDefeat;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                        this._showDealerVictoryOrDefeatAnim();
                    }, this)));
                    fDelayedTime += fActExecute_VictoryOrDefeat;
                }
            }

            // 显示幸运一击区域win动画
            case 1: {
                let fTmpDelayedTime1: number = fDelayedTime;
                let fTmpDelayedTime2: number = fDelayedTime;

                // 击中"庄家通吃"win动画
                let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(humanboy_proto.BetZoneOption.POS_LUCK_1);
                if (zoneData && zoneData.result < 0) {
                    fTmpDelayedTime1 += this._fActDelayed_ShowWinFlag;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fTmpDelayedTime1), cc.callFunc((): void => {
                        this._showWinFlagAnim(humanboy_proto.BetZoneOption.POS_LUCK_1);
                    }, this)));
                }

                // 击中"特殊牌型"win动画
                if (this._isHitSpecialCardType()) {
                    fTmpDelayedTime2 += this._fActDelayed_ShowWinFlag;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fTmpDelayedTime2), cc.callFunc((): void => {
                        this._showSpecialCardTypeHighLightAnim();
                        this._showWinFlagAnim(this._getHitSpecialCardTypeZone());
                    }, this)));
                }

                fDelayedTime = Math.max(fTmpDelayedTime1, fTmpDelayedTime2);
            }

            // 路单动画
            case 2: {
                fDelayedTime += this._fActDelayed_ShowWinFlag;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showAllWayOutAnim();
                }, this)));
                fDelayedTime += this._fActExecute_WayOut;
            }

            // 特殊牌型检测
            case 3: {
                if (this._isHitSpecialCardType()) {
                    // 该牌型是否有动画
                    if (this._getSpecialCardTypeExecuteTime() > 0) {
                        fDelayedTime += this._fActDelayed_LuckBlow;
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                            this._showSpecialCardTypeAnim();
                        }, this)));
                        fDelayedTime += this._getSpecialCardTypeExecuteTime();
                    }
                }
            }

            // 飞庄家金币 + 系统收取幸运一击未击中的金币
            case 4: {
                let fDealerCoinRecycleDelayedTime = fDelayedTime;							                    // 庄家收取四门金币延时时间
                let fSystemCoinRecycleDelayedTime = fDelayedTime;							                    // 系统收取四门金币延时时间

                let fPlayerCoinRecycleDelayedTime1 = fDelayedTime;						                        // 闲家收取四门金币延时时间
                let fPlayerCoinRecycleDelayedTime2 = fDelayedTime;						                        // 闲家收取系统金币延时时间

                let fMaxDelayedTime1 = 0;													                    // 情况1 最大延时时间
                let fMaxDelayedTime2 = 0;													                    // 情况2 最大延时时间

                let bBetInNormalZone: boolean = false;												            // 四门闲区是否下过注
                let bBetInLuckZone: boolean = false;												            // 幸运一击区域是否下过注
                let mapDealerWinAreaOption: HashMap<humanboy_proto.BetZoneOption, number> = new HashMap();	    // 庄家赢的区域(四门)
                let mapSystemWinAreaOption: HashMap<humanboy_proto.BetZoneOption, number> = new HashMap();	    // 系统赢的区域(幸运一击)

                humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData): void => {
                    if (option < humanboy_proto.BetZoneOption.POS_LUCK) {
                        if (zoneData.totalBet > 0) bBetInNormalZone = true;
                        if (zoneData.result > 0 && zoneData.totalBet > 0) {
                            mapDealerWinAreaOption.add(option, zoneData.totalBet);
                        }
                    }
                    else {
                        if (zoneData.totalBet > 0) bBetInLuckZone = true;
                        if (zoneData.result > 0 && zoneData.totalBet > 0) {
                            mapSystemWinAreaOption.add(option, zoneData.totalBet);
                        }
                    }
                });

                // 庄家有赢, 则回收四门区域的金币
                if (mapDealerWinAreaOption.length > 0) {
                    fDealerCoinRecycleDelayedTime += this._fActDelayed_FlyWinCoin;

                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDealerCoinRecycleDelayedTime), cc.callFunc((): void => {
                        this._playSoundEffect(this._sound_get_win_coin);
                        this._showDealerWinFlagsAndFlyCoinsAnim(mapDealerWinAreaOption);
                    }, this)));

                    // 检测庄家飘分
                    if (!bShowDealerScore) {
                        bShowDealerScore = true;

                        // 庄家飘分
                        let fTmpTime = fDealerCoinRecycleDelayedTime + this._fActDelayed_FlyWinCoin;
                        this._showDealerAddCoinAnim(fTmpTime);

                        // 更新庄家列表战绩
                        fTmpTime += this._fActDelayed_FlyWinCoin;
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fTmpTime), cc.callFunc((): void => {
                            cv.humanboyNet.requestUpdateDealerList();
                        }, this)));
                    }

                    fDealerCoinRecycleDelayedTime += this._fActExecute_FlyWinCoin;
                }

                // 系统有赢, 则回收幸运一击区域的金币
                if (mapSystemWinAreaOption.length > 0) {
                    fSystemCoinRecycleDelayedTime += this._fActDelayed_FlyWinCoin;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fSystemCoinRecycleDelayedTime), cc.callFunc((): void => {
                        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData): string => {
                            if (option <= humanboy_proto.BetZoneOption.POS_LUCK) return "continue";
                            if (zoneData.result > 0 && zoneData.totalBet > 0) {
                                this._hideBetAreaCoinsAnim(option, this._fActExecute_FlyWinCoin);
                            }
                        });
                    }, this)));
                    fSystemCoinRecycleDelayedTime += this._fActExecute_FlyWinCoin;
                }

                fMaxDelayedTime1 = Math.max(fDealerCoinRecycleDelayedTime, fSystemCoinRecycleDelayedTime);

                // 闲家收取四门赢金币
                do {
                    let bWinRecover: boolean = false;			// 四门区域有钱回收
                    let bLuckWinRecover: boolean = false;		// 幸运一击区域有钱回收

                    let vSettles: humanboy_proto.PlayerSettle[] = [];
                    cv.StringTools.deepCopy(humanboyDataMgr.getHumanboyRoom().vPlayerSettles, vSettles);
                    vSettles.push(humanboyDataMgr.getHumanboyRoom().tOtherPlayerSettle);

                    for (let i = 0; i < vSettles.length; ++i) {
                        let playerSettle: humanboy_proto.PlayerSettle = vSettles[i];
                        if (playerSettle.pos4WinAmount > 0) {
                            bWinRecover = true;
                        }

                        if (playerSettle.posLuckWinAmount > 0) {
                            bLuckWinRecover = true;
                        }

                        if (bWinRecover && bLuckWinRecover) break;
                    }

                    // 四门有击中, 则从庄家吐金币到四门对应区域
                    if (bWinRecover) {
                        fPlayerCoinRecycleDelayedTime1 += this._fActDelayed_FlyWinCoin;

                        // 庄家吐金币
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fPlayerCoinRecycleDelayedTime1), cc.callFunc((): void => {
                            this._showCoinToNormalAreaFromDealer();
                        }, this)));

                        // 检测庄家飘分
                        if (!bShowDealerScore) {
                            bShowDealerScore = true;
                            let fTmpTime = fPlayerCoinRecycleDelayedTime1 + this._fActDelayed_FlyWinCoin;

                            // 庄家飘分
                            this._showDealerAddCoinAnim(fTmpTime);

                            // 更新庄家列表战绩
                            fTmpTime += this._fActDelayed_FlyWinCoin;
                            this._nodeAnim.runAction(cc.sequence(cc.delayTime(fTmpTime), cc.callFunc((): void => {
                                cv.humanboyNet.requestUpdateDealerList();
                            }, this)));
                        }

                        fPlayerCoinRecycleDelayedTime1 += this._fActExecute_FlyWinCoin;
                    }

                    // 幸运一击有击中, 则从系统吐金币到幸运一击对应区域 
                    if (bLuckWinRecover) {
                        fPlayerCoinRecycleDelayedTime2 += this._fActDelayed_FlyWinCoin;
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fPlayerCoinRecycleDelayedTime2), cc.callFunc((): void => {
                            this._showCoinToLuckBlowAreaFromSystem();
                        }, this)));
                        fPlayerCoinRecycleDelayedTime2 += this._fActExecute_FlyWinCoin;
                    }

                    fMaxDelayedTime2 = Math.max(fPlayerCoinRecycleDelayedTime1, fPlayerCoinRecycleDelayedTime2);

                    // 从对应区域飞金币给玩家
                    if (bWinRecover || bLuckWinRecover) {
                        //fMaxDelayedTime2 += this._fActDelayed_FlyWinCoin;
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fMaxDelayedTime2), cc.callFunc((): void => {
                            this._hideAllWinFlagAnim();
                            this._playSoundEffect(this._sound_get_win_coin);
                            this._showAllAreaWinFlagsAndFlyCoinAnim();
                        }, this)));
                        fMaxDelayedTime2 += this._fActExecute_FlyWinCoin;
                    }

                    // 更新临时金币显示
                    do {
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(fMaxDelayedTime2), cc.callFunc((): void => {
                            // 更新玩家临时金币显示
                            this._updateAllPlayerTempGold();

                            // 更新所有玩家连胜状态
                            this._updateAllPlayerWinCount(true);

                            // 维护状态:非0代表系统即将维护
                            if (humanboyDataMgr.getHumanboyRoom().nStopWorld != 0) {
                                let bTrue = humanboyDataMgr.getHumanboyRoom().idle_roomid > 0;
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
                    } while (0);
                } while (0);

                // 计算最大延时时间
                fDelayedTime = Math.max(fMaxDelayedTime1, fMaxDelayedTime2);
            }

            // jackpot检测
            case 5: {
                // 更新 Jackpot
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._updateJackPotNum();
                })));

                // Jackpot 动画
                if (this._isHitJackpotAward()) {
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => { this._showJackPotAnim(); }, this)));
                    fDelayedTime += this._getJackpotAwardExecuteTime();
                }
            }

            // 所有流程完毕, 统一更新至服务器最新数据
            case 6: {
                fDelayedTime += 0.5;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    // 更新自己信息
                    this._updateSelfInfo();

                    // 更新其他人信息
                    this._updateOtherPlayersInfo();

                }, this)));
            }

            default:
                break;
        }
    }

    /**
     * 显示 win 动画
     * @param betOption 
     * @param pauseEnd 
     */
    private _showWinFlagAnim(betOption: humanboy_proto.BetZoneOption, pauseEnd: boolean = false): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        this._vNodeWinFlagAnims[nAreaIdx].active = true;

        // 沿用旧的win动画
        let action: cc.Animation = this._vAtlWinFlagActions[nAreaIdx];
        let animation0: cc.AnimationState = action.getAnimationState("animation0");
        let animation1: cc.AnimationState = action.getAnimationState("animation1");

        animation0.speed = this._getAnimClipSpeedByDuring(animation0.clip, this._fActExecute_WinFlag);
        animation0.wrapMode = cc.WrapMode.Normal;

        action.play(animation0.name);
        action.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            action.off(cc.Animation.EventType.FINISHED);
            animation1.wrapMode = cc.WrapMode.Loop;
            animation1.play();
        }, this);
    }

    /**
     * 隐藏win动画
     * @param betOption 
     */
    private _hideWinFlagAnim(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let vClips: cc.AnimationClip[] = this._vAtlWinFlagActions[nAreaIdx].getClips();
        for (let i = 0; i < vClips.length; ++i) {
            this._vAtlWinFlagActions[nAreaIdx].stop(vClips[i].name);
        }
        this._vNodeWinFlagAnims[nAreaIdx].active = false;
    }

    /**
     * 显示所有区域win标记
     */
    private _showAllWinFlagAnim(): void {
        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData, i?: number): string => {
            if (zoneData.result >= 0) return "continue";
            this._showWinFlagAnim(option);
        });
    }

    /**
     * 隐藏所有区域win标记
     */
    private _hideAllWinFlagAnim(): void {
        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData, i?: number): string => {
            if (zoneData.result >= 0) return "continue";
            this._hideWinFlagAnim(option);
        });
    }

    /**
     * 路单滚动动画
     * @param betOption 
     */
    private _showWayOutMoveAnim(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelWayOut: cc.Node = this._vAreasInfo[nAreaIdx].panelWayOut;
        let vWayOutImg: cc.Sprite[] = this._vAreasInfo[nAreaIdx].vWayOutImg;
        let vWayOutImgSrcPos: cc.Vec2[] = this._vAreasInfo[nAreaIdx].vWayOutImgSrcPos;
        if (!panelWayOut || vWayOutImg.length <= 0) return;

        // 裁剪右移 模式
        // let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
        // for (let i = 0; i < vWayOutImg.length; ++i) {
        //     if (i === 0) {
        //         tarPos.x = vWayOutImgSrcPos[i].x - vWayOutImg[nAreaIdx].node.width * vWayOutImg[nAreaIdx].node.scaleX;
        //         tarPos.y = vWayOutImgSrcPos[i].y;
        //     }
        //     else {
        //         tarPos.x = vWayOutImgSrcPos[i - 1].x;
        //         tarPos.y = vWayOutImgSrcPos[i - 1].y;
        //     }

        //     vWayOutImg[i].node.runAction(cc.sequence(cc.moveTo(0.3, tarPos), cc.callFunc((): void => {
        //         if (i === vWayOutImg.length - 1) {
        //             this._updateWayOut(betOption, 0);
        //         }
        //     }, this)));
        // }

        // 缩小渐隐右移 模式
        let st: cc.ActionInterval = cc.scaleTo(0.2, 0);
        let fo: cc.ActionInterval = cc.fadeOut(0.3);
        let spawn: cc.FiniteTimeAction = cc.spawn(st, fo);
        vWayOutImg[0].node.runAction(cc.sequence(spawn, cc.callFunc((): void => {
            vWayOutImg[0].node.active = false;
            let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
            for (let i = 0; i < vWayOutImg.length; ++i) {
                if (i === 0) continue;

                tarPos.x = vWayOutImgSrcPos[i - 1].x;
                tarPos.y = vWayOutImgSrcPos[i - 1].y;
                vWayOutImg[i].node.runAction(cc.sequence(cc.moveTo(0.5, tarPos), cc.callFunc((): void => {
                    if (i === vWayOutImg.length - 1) {
                        this._updateWayOut(betOption, 0);
                        vWayOutImg[0].node.setScale(1.0);
                        vWayOutImg[0].node.opacity = 0xFF;
                        vWayOutImg[0].node.active = true;
                    }
                }, this)));
            }
        })));
    }

    /**
     * 显示路单图片动画
     * @param betOption 
     */
    private _showWayOutImgAnim(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let vWayOutImg: cc.Sprite[] = this._vAreasInfo[nAreaIdx].vWayOutImg;
        if (vWayOutImg.length <= 0) return;

        let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 隐藏路单文本
        let rtxtWayOut: cc.RichText = this._vAreasInfo[nAreaIdx].rtxtWayOut;
        if (rtxtWayOut) {
            rtxtWayOut.string = "";
            rtxtWayOut.node.active = false;
        }

        // 与庄家比大小的结果 = 0 相同, > 0 庄家赢, < 0 闲家赢
        let result: number = zoneData.result;

        let fileName_fire: string = "";
        let fileName_ball: string = "";

        // 输
        if (result > 0) {
            fileName_fire = "humanboy_icon_fire_white";
            fileName_ball = betOption < humanboy_proto.BetZoneOption.POS_LUCK ? "humanboy_icon_circle_gray" : "humanboy_icon_circle_small_gray";
        }
        // 平
        else if (result === 0) {
            fileName_fire = "humanboy_icon_fire_green";
            fileName_ball = "humanboy_icon_circle_green";
        }
        // 赢
        else {
            fileName_fire = "humanboy_icon_fire_red";
            fileName_ball = betOption < humanboy_proto.BetZoneOption.POS_LUCK ? "humanboy_icon_circle_red" : "humanboy_icon_circle_small_red";
        }

        // 计算空闲路子索引
        let freeIndex: number = vWayOutImg.length;
        for (let i = 0; i < vWayOutImg.length; ++i) {
            if (!vWayOutImg[i].node.active) {
                freeIndex = i;
                break;
            }
        }

        // 四门路子飞的动画
        if (betOption < humanboy_proto.BetZoneOption.POS_LUCK) {
            let img_fire: cc.Sprite = new cc.Node().addComponent(cc.Sprite);
            this._nodeAnim.addChild(img_fire.node, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_0);
            img_fire.node.active = true;
            img_fire.spriteFrame = this._atlas_hb_humanboy.getSpriteFrame(fileName_fire);

            // 计算旋转角度
            let start_pos: cc.Vec2 = cc.Vec2.ZERO;
            this._vAreasInfo[nAreaIdx].panelCoin.convertToWorldSpaceAR(cc.Vec2.ZERO, start_pos);
            let end_pos_index: number = Math.min(freeIndex, vWayOutImg.length - 1);
            let end_pos: cc.Vec2 = cc.Vec2.ZERO;
            vWayOutImg[end_pos_index].node.convertToWorldSpaceAR(cc.Vec2.ZERO, end_pos);

            let v1: cc.Vec2 = cc.v2(start_pos.x - start_pos.x, 0 - start_pos.y);
            let v2: cc.Vec2 = cc.v2(end_pos.x - start_pos.x, end_pos.y - start_pos.y);
            let rotation: number = v2.signAngle(v1) / Math.PI * 180;
            img_fire.node.angle = -rotation;

            // action
            img_fire.node.parent.convertToNodeSpaceAR(start_pos, start_pos);
            img_fire.node.parent.convertToNodeSpaceAR(end_pos, end_pos);
            img_fire.node.setPosition(start_pos);
            img_fire.node.runAction(cc.sequence(cc.delayTime(0.3 * this._fActExecute_WayOut)
                , cc.moveTo(0.7 * this._fActExecute_WayOut, end_pos).easing(cc.easeSineInOut())
                , cc.callFunc((): void => {
                    img_fire.node.removeFromParent(true);
                    cv.tools.destroyNode(img_fire.node);
                }, this)));
        }

        // 路子满了挤动动画
        if (freeIndex > vWayOutImg.length - 1) {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3 * this._fActExecute_WayOut), cc.callFunc((): void => {
                this._showWayOutMoveAnim(betOption);
            }, this)));
        }
        else {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.8 * this._fActExecute_WayOut), cc.callFunc((): void => {
                vWayOutImg[freeIndex].node.active = true;
                vWayOutImg[freeIndex].spriteFrame = this._atlas_hb_language.getSpriteFrame(fileName_ball);
            }, this)));
        }
    }

    /**
     * 路单动画(包括图片,文本等)
     * @param betOption 
     */
    private _showWayOutAnim(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelWayOut: cc.Node = this._vAreasInfo[nAreaIdx].panelWayOut;
        let vWayOutImg: cc.Sprite[] = this._vAreasInfo[nAreaIdx].vWayOutImg;
        if (!panelWayOut || vWayOutImg.length <= 0) return;

        let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 路子显示风格
        switch (this._vAreasInfo[nAreaIdx].eWayOutStyle) {
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
                if (vHistoryResults.length > 0 && vHistoryResults.length > vWayOutImg.length) {
                    let bDefeat: boolean = true;
                    for (let i = 0; i <= vWayOutImg.length; ++i) {
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
    private _updateWayOutImg(betOption: humanboy_proto.BetZoneOption, reduce: number): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelWayOut: cc.Node = this._vAreasInfo[nAreaIdx].panelWayOut;
        panelWayOut.active = true;

        let vWayOutImg: cc.Sprite[] = this._vAreasInfo[nAreaIdx].vWayOutImg;
        let vWayOutImgSrcPos: cc.Vec2[] = this._vAreasInfo[nAreaIdx].vWayOutImgSrcPos;

        let zoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 隐藏路单文本
        let rtxtWayOut: cc.RichText = this._vAreasInfo[nAreaIdx].rtxtWayOut;
        if (rtxtWayOut) {
            rtxtWayOut.string = "";
            rtxtWayOut.node.active = false;
        }

        // 逆序取历史记录
        let fileName_ball: string = "";
        let vHistoryResults: number[] = zoneData.vHistoryResults;

        let min_count: number = Math.min(vWayOutImg.length, vHistoryResults.length);
        let end_index: number = 0;
        let end_count: number = 0;

        // ui显示个数 >= 路子数据个数, 少显示 reduce 个
        if (vWayOutImg.length >= vHistoryResults.length) {
            end_index = min_count - 1;
            end_count = min_count - reduce;
        }
        // ui显示个数 < 路子数据个数, 偏移 reduce 位数据显示
        else {
            end_index = min_count - 1 + reduce;
            end_count = min_count;
        }

        for (let i = 0; i < vWayOutImg.length; ++i) {
            // 复原位置
            vWayOutImg[i].node.setPosition(vWayOutImgSrcPos[i]);

            let index = end_index - i;
            if (i < end_count && (index >= 0 && index < vHistoryResults.length)) {

                // 与庄家比大小的结果 = 0 相同, > 0 庄家赢, < 0 闲家赢
                let result: number = vHistoryResults[index];
                if (result > 0) {
                    fileName_ball = betOption < humanboy_proto.BetZoneOption.POS_LUCK ? "humanboy_icon_circle_gray" : "humanboy_icon_circle_small_gray";
                }
                else if (result === 0) {
                    fileName_ball = "humanboy_icon_circle_green";
                }
                else {
                    fileName_ball = betOption < humanboy_proto.BetZoneOption.POS_LUCK ? "humanboy_icon_circle_red" : "humanboy_icon_circle_small_red";
                }

                vWayOutImg[i].node.active = true;
                vWayOutImg[i].spriteFrame = this._atlas_hb_language.getSpriteFrame(fileName_ball);
            }
            else {
                vWayOutImg[i].node.active = false;
            }
        }
    }

    /**
     * 显示路单文本
     * @param betOption 
     */
    private _updateWayOutTxt(betOption: humanboy_proto.BetZoneOption): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let rtxtWayOut: cc.RichText = this._vAreasInfo[nAreaIdx].rtxtWayOut;
        if (!rtxtWayOut) return;

        let vWayOutImg: cc.Sprite[] = this._vAreasInfo[nAreaIdx].vWayOutImg;
        let iWayOutLoseLimitCount: number = this._vAreasInfo[nAreaIdx].iWayOutLoseLimitCount;

        // 隐藏路单球图片面板
        for (let i = 0; i < vWayOutImg.length; ++i) {
            vWayOutImg[i].node.active = false;
        }

        // 显示文本
        let eCurState: humanboy_proto.RoundState = humanboyDataMgr.getHumanboyRoom().eCurState;
        let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        // 连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
        let luckLoseHand: number = zoneData.luckLoseHand;
        if (luckLoseHand < 0) {
            rtxtWayOut.string = "";
        }
        else if (luckLoseHand === 0) {
            if (eCurState === humanboy_proto.RoundState.WAIT_NEXT_ROUND) {
                cv.StringTools.setRichTextString(rtxtWayOut.node, cv.config.getStringData("Humanboy_game_wayout_hit_txt"));
            }
            else {
                cv.StringTools.setRichTextString(rtxtWayOut.node, cv.config.getStringData("Humanboy_game_wayout_hit_last_txt"));
            }
        }
        else {
            let strCountDest: string = "";
            if (iWayOutLoseLimitCount != 0 && luckLoseHand > iWayOutLoseLimitCount) {
                strCountDest = cv.StringTools.formatC("%d+", iWayOutLoseLimitCount);
            }
            else {
                strCountDest = cv.StringTools.formatC("%d", luckLoseHand);
            }
            cv.StringTools.setRichTextString(rtxtWayOut.node, cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_wayout_lose_txt"), strCountDest));
        }
        rtxtWayOut.node.active = true;
    }

    /**
     *  更新路单
     * @param betOption 
     * @param reduce 
     */
    private _updateWayOut(betOption: humanboy_proto.BetZoneOption, reduce: number): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let vWayOutImg: cc.Sprite[] = this._vAreasInfo[nAreaIdx].vWayOutImg;
        let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(betOption);
        if (!zoneData) return;

        switch (this._vAreasInfo[nAreaIdx].eWayOutStyle) {
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
                if (vHistoryResults.length > 0 && vHistoryResults.length > vWayOutImg.length) {
                    let bDefeat: boolean = true;
                    for (let i = 0; i <= vWayOutImg.length; ++i) {
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
            this._updateWayOut(this._vAreasInfo[i].eZone, reduce);
        }
    }

    /**
     * 显示指定区域路单面板
     * @param option 
     */
    private _showChart(option: humanboy_proto.BetZoneOption): void {
        if (!this._humanboyChart) {
            this._humanboyChart = cc.instantiate(this.prefab_hb_chart).getComponent(HumanboyChart);
            this.node.addChild(this._humanboyChart.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_RECORD);
        }
        this._humanboyChart.showView(option);
    }

    /**
     * 显示所有路单动画
     */
    private _showAllWayOutAnim(): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            this._showWayOutAnim(this._vAreasInfo[i].eZone);
        }

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._fActExecute_WayOut), cc.callFunc((): void => {
            this._showWayOutLightAnim();
        }, this)));
    }

    /**
     * 显示路单闪光动画
     */
    private _showWayOutLightAnim(): void {
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        this._btn_record.node.parent.convertToWorldSpaceAR(this._btn_record.node.position, pos);
        this._nodeWayoutLightAnim.active = true;
        this._nodeWayoutLightAnim.setPosition(this._nodeWayoutLightAnim.parent.convertToNodeSpaceAR(pos));

        let way_out: cc.AnimationClip = this._atlWayoutLightAction.defaultClip;
        way_out.speed = this._getAnimClipSpeedByDuring(way_out, this._fActExecute_WayOutLight);
        way_out.wrapMode = cc.WrapMode.Normal;

        this._atlWayoutLightAction.play();
        this._atlWayoutLightAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            this._atlWayoutLightAction.off(cc.Animation.EventType.FINISHED);
            this._nodeWayoutLightAnim.active = false;
        }, this);
    }

    /**
     * 隐藏赢区域金币
     * @param bExceptLuckBlow 是否排除幸运一击区域
     * @param bIgnoreEqual 是否忽略平局区域
     */
    private _hideWinAreaCoinsAnim(bExceptLuckBlow: boolean, bIgnoreEqual: boolean): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (bExceptLuckBlow && this._vAreasInfo[i].eZone >= humanboy_proto.BetZoneOption.POS_LUCK) continue;

            let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(this._vAreasInfo[i].eZone);
            if (!zoneData) return;

            let result: number = zoneData.result;
            let bFind: boolean = bIgnoreEqual ? result <= 0 : result < 0;
            if (bFind) {
                for (let j: number = 0; j < this._vAreasInfo[i].vCoinQueue.size(); ++j) {
                    let coin: HumanboyBetCoin = this._vAreasInfo[i].vCoinQueue.at(j);
                    if (!coin.node.active) continue;
                    let sequence: cc.ActionInterval = cc.sequence(cc.fadeOut(this._fActDelayed_FlyWinCoin), cc.callFunc((): void => { coin.node.active = false; }));
                    coin.node.runAction(sequence);
                }
            }
        }
    }

    /**
     * 隐藏输区域金币
     * @param bExceptLuckBlow 是否排除幸运一击区域
     * @param bIgnoreEqual 是否忽略平局区域
     */
    private _hideLoseAreaCoinsAnim(bExceptLuckBlow: boolean, bIgnoreEqual: boolean): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (bExceptLuckBlow && this._vAreasInfo[i].eZone >= humanboy_proto.BetZoneOption.POS_LUCK) continue;

            let zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(this._vAreasInfo[i].eZone);
            if (!zoneData) return;

            let result: number = zoneData.result;
            let bFind: boolean = bIgnoreEqual ? result >= 0 : result > 0;
            if (bFind) {
                for (let j: number = 0; j < this._vAreasInfo[i].vCoinQueue.size(); ++j) {
                    let coin: HumanboyBetCoin = this._vAreasInfo[i].vCoinQueue.at(j);
                    if (!coin.node.active) continue;
                    let sequence: cc.ActionInterval = cc.sequence(cc.fadeOut(this._fActDelayed_FlyWinCoin), cc.callFunc((): void => { coin.node.active = false; }));
                    coin.node.runAction(sequence);
                }
            }
        }
    }

    /**
     * 隐藏指定下注区金币动画
     */
    private _hideBetAreaCoinsAnim(betOption: humanboy_proto.BetZoneOption, fDuringTime: number): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        for (let i: number = 0; i < this._vAreasInfo[nAreaIdx].vCoinQueue.size(); ++i) {
            let coin: HumanboyBetCoin = this._vAreasInfo[nAreaIdx].vCoinQueue.at(i);
            let sequence: cc.ActionInterval = cc.sequence(cc.fadeOut(fDuringTime), cc.callFunc((): void => { coin.node.active = false; }));
            coin.node.runAction(sequence);
        }
    }

    /**
     * 隐藏所有下注区域的金币动画
     * @param anim 
     * @param fDuringTime 
     */
    private _hideAllBetCoinsAnim(anim: boolean, fDuringTime: number): void {
        for (let i = 0; i < this._vAreasInfo.length; ++i) {
            if (anim) {
                this._hideBetAreaCoinsAnim(this._vAreasInfo[i].eZone, fDuringTime);
            }
            else {
                for (let j = 0; j < this._vAreasInfo[i].vCoinQueue.size(); ++j) {
                    let coin: HumanboyBetCoin = this._vAreasInfo[i].vCoinQueue.at(j);
                    coin.node.active = false;
                }
            }
        }
    }

    /**
     * 庄家完胜或完败动画
     */
    private _showDealerVictoryOrDefeatAnim(): void {
        // 1 代表庄家通吃  2 代表庄家通赔
        let uDealerWinAll: number = humanboyDataMgr.getHumanboyRoom().uDealerWinAll;
        switch (uDealerWinAll) {
            case 1: {

                // 暂时去掉通吃通赔音效
                // this._playSoundEffect(this._sound_dealer_vd);

                this._nodeDealerVictoryAnim.active = true;

                let dealer_victory: cc.AnimationClip = this._atlDealerVictoryAction.defaultClip;
                dealer_victory.speed = this._getAnimClipSpeedByDuring(dealer_victory, this._fActExecute_VictoryOrDefeat);
                dealer_victory.wrapMode = cc.WrapMode.Normal;

                this._atlDealerVictoryAction.play();
                this._atlDealerVictoryAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                    this._atlDealerVictoryAction.off(cc.Animation.EventType.FINISHED);
                    this._nodeDealerVictoryAnim.active = false;
                }, this);
            } break;

            case 2: {

                // 暂时去掉通吃通赔音效
                // this._playSoundEffect(this._sound_dealer_vd);

                this._nodeDealerDefeatAnim.active = true;

                let dealer_defeat: cc.AnimationClip = this._atlDealerDefeatAction.defaultClip;
                dealer_defeat.speed = this._getAnimClipSpeedByDuring(dealer_defeat, this._fActExecute_VictoryOrDefeat);
                dealer_defeat.wrapMode = cc.WrapMode.Normal;

                this._atlDealerDefeatAction.play();
                this._atlDealerDefeatAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                    this._atlDealerDefeatAction.off(cc.Animation.EventType.FINISHED);
                    this._nodeDealerDefeatAnim.active = false;
                }, this);
            } break;

            default:
                break;
        }
    }

    /**
     * 是否击中幸运一击
     */
    private _isHitLuckBlow(): boolean {
        let vRet: boolean = false;
        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData): string => {
            if (option > humanboy_proto.BetZoneOption.POS_LUCK && zoneData.result < 0) {
                vRet = true;
                return "break";
            }
        });
        return vRet;
    }

    /**
     * 是否击中特殊牌型
     */
    private _isHitSpecialCardType(): boolean {
        let vRet: boolean = false;
        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData): string => {
            if (option > humanboy_proto.BetZoneOption.POS_LUCK_1 && zoneData.result < 0) {
                vRet = true;
                return "break";
            }
        });
        return vRet;
    }

    /**
     * 获取击中特殊牌型的区域
     */
    private _getHitSpecialCardTypeZone(): humanboy_proto.BetZoneOption {
        let vRet: humanboy_proto.BetZoneOption = humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;
        humanboyDataMgr.getHumanboyRoom().mapZoneData.forEach((option: humanboy_proto.BetZoneOption, zoneData: HumanboyZoneData): string => {
            if (option > humanboy_proto.BetZoneOption.POS_LUCK_1 && zoneData.result < 0) {
                vRet = option;
                return "break";
            }
        });
        return vRet;
    }

    /**
     * 获取击中特殊牌型动画执行时间
     */
    private _getSpecialCardTypeExecuteTime(): number {
        let fRet: number = 0;
        let eMaxLevel: humanboy_proto.CardResult = humanboyDataMgr.getHumanboyRoom().eMaxLevel;

        switch (eMaxLevel) {
            case humanboy_proto.CardResult.YI_DUI:				    // 一对
            case humanboy_proto.CardResult.LIAN_DUI:				// 两对
            case humanboy_proto.CardResult.SAN_TIAO: {              // 三条
                fRet = this._fActExecute_LuckBlow_1;
            } break;

            case humanboy_proto.CardResult.SHUN_ZI:				    // 顺子
            case humanboy_proto.CardResult.TONG_HUA: {              // 同花
                fRet = this._fActExecute_LuckBlow_2;
            } break;

            case humanboy_proto.CardResult.HU_LU:					// 葫芦
            case humanboy_proto.CardResult.SI_TIAO:				    // 金刚
            case humanboy_proto.CardResult.TONG_HUA_SHUN:			// 同花顺
            case humanboy_proto.CardResult.HUANG_TONG: {            // 皇同
                fRet = this._fActExecute_LuckBlow_3;
            } break;

            default:
                break;
        }

        return fRet;
    }

    /**
     * 显示特殊牌型动画动画
     * @param anim 
     * @param delayed 
     */
    private _showSpecialCardTypeAnim(anim: boolean = true, delayed: number = 0): void {

        this._clearSpecialCardTypeAnim();
        if (!this._isHitSpecialCardType()) return;

        let fileName: string = "";
        let specialCardType: string = "";
        let specialCardOdds: string = "";
        let soundEffect: string = "";
        let fActExecute_SpecialCardType: number = 0;

        let eMaxLevel: humanboy_proto.CardResult = humanboyDataMgr.getHumanboyRoom().eMaxLevel;
        let oddsDetail: humanboy_proto.OddsDetail = this._getLuckBlowOdds(eMaxLevel);

        switch (eMaxLevel) {
            // // 一对
            // case humanboy_proto.CardResult.YI_DUI: {
            // } break;

            // // 两对
            // case humanboy_proto.CardResult.LIAN_DUI: {
            //     fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_1";
            //     specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_two_pairs");

            //     soundEffect = this._sound_special_card_type_small;
            //     fActExecute_SpecialCardType = this._fActExecute_LuckBlow_1;
            // } break;

            // // 三条
            // case humanboy_proto.CardResult.SAN_TIAO: {
            //     fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_1";
            //     specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_three_of_a_kind");

            //     soundEffect = this._sound_special_card_type_small;
            //     fActExecute_SpecialCardType = this._fActExecute_LuckBlow_1;
            // } break;

            // 顺子
            case humanboy_proto.CardResult.SHUN_ZI: {
                fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_2";
                specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_straight");

                let str_odds = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(oddsDetail.odds));
                specialCardOdds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_anim_odd"));

                soundEffect = this._sound_special_card_type_middle;
                fActExecute_SpecialCardType = this._fActExecute_LuckBlow_2;
            } break;

            // 同花
            case humanboy_proto.CardResult.TONG_HUA: {
                fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_2";
                specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_flush");

                let str_odds = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(oddsDetail.odds));
                specialCardOdds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_anim_odd"));

                soundEffect = this._sound_special_card_type_middle;
                fActExecute_SpecialCardType = this._fActExecute_LuckBlow_2;
            } break;

            // 葫芦
            case humanboy_proto.CardResult.HU_LU: {
                fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_3";
                specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_gourd");

                let str_odds = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(oddsDetail.odds));
                specialCardOdds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_anim_odd"));

                soundEffect = this._sound_special_card_type_big;
                fActExecute_SpecialCardType = this._fActExecute_LuckBlow_3;
            } break;

            // 金刚(四条)
            case humanboy_proto.CardResult.SI_TIAO: {
                fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_3";
                specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_four_of_a_kind");

                let str_odds = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(oddsDetail.odds));
                specialCardOdds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_anim_odd"));

                soundEffect = this._sound_special_card_type_big;
                fActExecute_SpecialCardType = this._fActExecute_LuckBlow_3;
            } break;

            // 同花顺
            case humanboy_proto.CardResult.TONG_HUA_SHUN: {
                fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_3";
                specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_straight_flush");

                let str_odds = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(oddsDetail.odds));
                specialCardOdds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_anim_odd"));

                soundEffect = this._sound_special_card_type_big;
                fActExecute_SpecialCardType = this._fActExecute_LuckBlow_3;
            } break;

            // 皇同
            case humanboy_proto.CardResult.HUANG_TONG: {
                fileName = "zh_CN/game/humanboy/animation/special_card_type/special_card_type_3";
                specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_royal_flush");

                let str_odds = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(oddsDetail.odds));
                specialCardOdds = cv.StringTools.formatC("%s%s", str_odds, cv.config.getStringData("Humanboy_game_fnt_anim_odd"));

                soundEffect = this._sound_special_card_type_big;
                fActExecute_SpecialCardType = this._fActExecute_LuckBlow_3;
            } break;

            default:
                break;
        }

        // 创建时间轴动画
        if (fileName.length > 0) {
            cv.resMgr.loadPrefab(fileName, (prefab: cc.Prefab): void => {
                let nodeSpecialCardTypeAnim: cc.Node = cc.instantiate(prefab);
                nodeSpecialCardTypeAnim.name = "special_card_type_anim";
                nodeSpecialCardTypeAnim.setPosition(cc.Vec2.ZERO);
                this._nodeAnim.addChild(nodeSpecialCardTypeAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);
                nodeSpecialCardTypeAnim.active = true;

                // 设置赔率
                if (specialCardOdds.length > 0) {
                    let fnt_card_odd: cc.Label = nodeSpecialCardTypeAnim.getChildByName("fnt_card_odd").getComponent(cc.Label);
                    fnt_card_odd.string = specialCardOdds;
                }

                // 设置牌型
                if (specialCardType.length > 0) {
                    let img_card_type: cc.Sprite = nodeSpecialCardTypeAnim.getChildByName("img_card_type").getComponent(cc.Sprite);
                    img_card_type.sizeMode = cc.Sprite.SizeMode.RAW;
                    cv.resMgr.setSpriteFrame(img_card_type.node, specialCardType);
                }

                let ctlSpecialCardTypeAction: cc.Animation = nodeSpecialCardTypeAnim.getComponent(cc.Animation);
                if (anim) {
                    this._playSoundEffect(soundEffect);

                    ctlSpecialCardTypeAction.defaultClip.speed = this._getAnimClipSpeedByDuring(ctlSpecialCardTypeAction.defaultClip, fActExecute_SpecialCardType);
                    ctlSpecialCardTypeAction.defaultClip.wrapMode = cc.WrapMode.Normal;
                    ctlSpecialCardTypeAction.play();

                    ctlSpecialCardTypeAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                        ctlSpecialCardTypeAction.off(cc.Animation.EventType.FINISHED);
                        nodeSpecialCardTypeAnim.removeFromParent(true);
                        cv.tools.destroyNode(nodeSpecialCardTypeAnim);
                        this._clearSpecialCardTypeHighLightAnim();
                    }, this);
                }
                else {
                    ctlSpecialCardTypeAction.play();
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(delayed), cc.callFunc((): void => {
                        nodeSpecialCardTypeAnim.removeFromParent(true);
                        cv.tools.destroyNode(nodeSpecialCardTypeAnim);
                        this._clearSpecialCardTypeHighLightAnim();
                    }, this)));
                }
            });
        }
    }

    /**
     * 清除特殊牌型动画
     * @param cleanup 
     */
    private _clearSpecialCardTypeAnim(cleanup: boolean = true): void {
        let node: cc.Node = cc.find("special_card_type_anim", this._nodeAnim);
        if (node && cc.isValid(node, true)) {
            node.removeFromParent(cleanup);
            if (cleanup) node.destroy();
        }
    }
    /**
     * 显示特殊牌型高亮动画
     */
    private _showSpecialCardTypeHighLightAnim(): void {
        this._clearSpecialCardTypeHighLightAnim();
        if (!this._isHitSpecialCardType()) return;

        //  特殊牌型来自的区域
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        let fileName: string = "";
        let eMaxLevelOption: humanboy_proto.BetZoneOption = humanboyDataMgr.getHumanboyRoom().eMaxLevelOption;
        switch (eMaxLevelOption) {
            // 庄
            case humanboy_proto.BetZoneOption.HOST: {
                fileName = "zh_CN/game/humanboy/animation/light_box/light_box_1";

                let panel_dealer_card: cc.Node = this._panel_dealer.getChildByName("panel_dealer_card");
                panel_dealer_card.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);
            } break;

            // 闲
            case humanboy_proto.BetZoneOption.POS1:
            case humanboy_proto.BetZoneOption.POS2:
            case humanboy_proto.BetZoneOption.POS3:
            case humanboy_proto.BetZoneOption.POS4: {
                let nAreaIdx: number = this._getAreaIdxByBetOption(eMaxLevelOption);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) break;

                let panelBorder: cc.Node = this._vAreasInfo[nAreaIdx].panelBorder;
                panelBorder.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);

                switch (this._eGameboyScreenType) {
                    case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD: {
                        fileName = "zh_CN/game/humanboy/animation/light_box/light_box_4";
                    } break;

                    case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW: {
                        fileName = "zh_CN/game/humanboy/animation/light_box/light_box_3";
                    } break;

                    case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NORMAL:
                    default: {
                        fileName = "zh_CN/game/humanboy/animation/light_box/light_box_2";
                    } break;
                }
            } break;

            default:
                break;
        }

        cv.resMgr.loadPrefab(fileName, (prefab: cc.Prefab): void => {
            let nodeHighLightAnim: cc.Node = cc.instantiate(prefab);
            nodeHighLightAnim.name = "special_card_type_high_light_anim";
            this._nodeAnim.addChild(nodeHighLightAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);
            nodeHighLightAnim.setPosition(nodeHighLightAnim.parent.convertToNodeSpaceAR(pos));
            nodeHighLightAnim.active = true;

            let ctlHighLightAction: cc.Animation = nodeHighLightAnim.getComponent(cc.Animation);
            ctlHighLightAction.defaultClip.speed = this._getAnimClipSpeedByDuring(ctlHighLightAction.defaultClip, this._fActExecute_LuckBlowHightLight);
            ctlHighLightAction.defaultClip.wrapMode = cc.WrapMode.Normal;
            ctlHighLightAction.play();
        });
    }

    /**
     * 清除特殊牌型高亮动画
     * @param cleanup 
     */
    private _clearSpecialCardTypeHighLightAnim(cleanup: boolean = true): void {
        let node: cc.Node = cc.find("special_card_type_high_light_anim", this._nodeAnim);
        if (node && cc.isValid(node, true)) {
            node.removeFromParent(cleanup);
            if (cleanup) node.destroy();
        }
    }

    /**
     * 获取幸运一击赔率映射
     * @param type 
     */
    private _getLuckBlowOdds(type: humanboy_proto.CardResult): humanboy_proto.OddsDetail {
        let oddsDetail: humanboy_proto.OddsDetail = humanboy_proto.OddsDetail.create();
        let option: humanboy_proto.BetZoneOption = humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;

        // 设置 赔率的牌型 和 结算牌型 映射
        let mapSpecialCardType: HashMap<humanboy_proto.CardResult, humanboy_proto.BetZoneOption> = new HashMap();
        mapSpecialCardType.add(humanboy_proto.CardResult.YI_DUI, humanboy_proto.BetZoneOption.POS_LUCK_2);
        mapSpecialCardType.add(humanboy_proto.CardResult.LIAN_DUI, humanboy_proto.BetZoneOption.POS_LUCK_3);
        mapSpecialCardType.add(humanboy_proto.CardResult.SAN_TIAO, humanboy_proto.BetZoneOption.POS_LUCK_4);
        mapSpecialCardType.add(humanboy_proto.CardResult.SHUN_ZI, humanboy_proto.BetZoneOption.POS_LUCK_5);
        mapSpecialCardType.add(humanboy_proto.CardResult.TONG_HUA, humanboy_proto.BetZoneOption.POS_LUCK_5);
        mapSpecialCardType.add(humanboy_proto.CardResult.HU_LU, humanboy_proto.BetZoneOption.POS_LUCK_6);
        mapSpecialCardType.add(humanboy_proto.CardResult.SI_TIAO, humanboy_proto.BetZoneOption.POS_LUCK_6);
        mapSpecialCardType.add(humanboy_proto.CardResult.TONG_HUA_SHUN, humanboy_proto.BetZoneOption.POS_LUCK_6);
        mapSpecialCardType.add(humanboy_proto.CardResult.HUANG_TONG, humanboy_proto.BetZoneOption.POS_LUCK_6);

        // 获取结算牌型所映射的赔率牌型
        mapSpecialCardType.forEach((k: humanboy_proto.CardResult, v: humanboy_proto.BetZoneOption): string => {
            if (k === type) {
                option = v;
                return "break";
            }
        });

        // 判断映射后的赔率牌型是否在下发的赔率牌型列表中
        let vOddsDetail: humanboy_proto.IOddsDetail[] = humanboyDataMgr.getHumanboyRoom().tCurRoom.oddsDetail;
        for (let i = 0; i < vOddsDetail.length; ++i) {
            if (option == vOddsDetail[i].option) {
                oddsDetail = humanboy_proto.OddsDetail.create(vOddsDetail[i]);
                break;
            }
        }

        return oddsDetail;
    }

    /**
     * 是否击中 JP
     */
    private _isHitJackpotAward(): boolean {
        let count: number = humanboyDataMgr.getHumanboyRoom().vHitJackpotAward.length;
        return count > 0;
    }

    /**
     * 获取 JP 动画执行时间
     */
    private _getJackpotAwardExecuteTime(): number {
        let fRet: number = 0;
        let bHitJPCoin: boolean = false;

        let vHitJackpotAward: humanboy_proto.HitJackpotAward[] = humanboyDataMgr.getHumanboyRoom().vHitJackpotAward;
        for (let i = 0; i < vHitJackpotAward.length; ++i) {
            fRet += this._fActDelayed_JackPot;
            fRet += this._fActExecute_JackPot;

            if (vHitJackpotAward[i].hitJackpotAwardData.length > 0) {
                bHitJPCoin = true;
                fRet += this._fActDelayed_FlyWinCoin;
                fRet += this._fActExecute_FlyWinCoin;
            }
        }

        // 若击中JP(且有飞金币动画), 则加上飘分延时时间
        if (bHitJPCoin) {
            fRet += this._fActDelayed_FlyWinCoin;
        }

        return fRet;
    }

    /**
     * 显示jackpot动画
     * @param anim 
     * @param delayed 
     */
    private _showJackPotAnim(anim: boolean = true, delayed: number = 0): void {
        this._clearJackPotAnim();
        if (!this._isHitJackpotAward()) return;

        let fDelayedTime: number = 0;
        let vHitJackpotAward: humanboy_proto.HitJackpotAward[] = humanboyDataMgr.getHumanboyRoom().vHitJackpotAward;
        for (let i = 0; i < vHitJackpotAward.length; ++i) {
            if (anim) {
                let option: humanboy_proto.BetZoneOption = vHitJackpotAward[i].option;

                // jackpot
                fDelayedTime += this._fActDelayed_JackPot;
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                    this._showJackPotAnimByAreaZone(option, anim, delayed);
                }, this)));
                fDelayedTime += this._fActExecute_JackPot;

                // fly coin
                if (vHitJackpotAward[i].hitJackpotAwardData.length > 0) {
                    fDelayedTime += this._fActDelayed_FlyWinCoin;
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayedTime), cc.callFunc((): void => {
                        this._playSoundEffect(this._sound_get_win_coin);
                        this._showJackPotFlagsAndFlyCoinAnim(option);
                    }, this)));
                    fDelayedTime += this._fActExecute_FlyWinCoin;
                }
            }
            else {
                this._showJackPotAnimByAreaZone(vHitJackpotAward[i].option, anim, delayed);
            }
        }
    }

    /**
     * 清除 JP 动画
     * @param cleanup 
     */
    private _clearJackPotAnim(cleanup: boolean = true): void {
        let node: cc.Node = cc.find("jackpot_anim", this._nodeAnim);
        if (node && cc.isValid(node, true)) {
            node.removeFromParent(cleanup);
            if (cleanup) node.destroy();
        }
    }

    /**
     * 显示指定区域的 JP 动画
     * @param betOption 
     * @param anim 
     * @param delayed 
     */
    private _showJackPotAnimByAreaZone(betOption: humanboy_proto.BetZoneOption, anim: boolean = true, delayed: number = 0): void {
        let nAreaIdx: number = this._getAreaIdxByBetOption(betOption);
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        let panelBorder: cc.Node = this._vAreasInfo[nAreaIdx].panelBorder;
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        panelBorder.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);

        let fileName: string = "";
        let specialCardType: string = "";

        switch (this._eGameboyScreenType) {
            case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD: {
                fileName = "zh_CN/game/humanboy/animation/jackpot/jackpot_broad";
            } break;

            case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW: {
                fileName = "zh_CN/game/humanboy/animation/jackpot/jackpot_narrow";
            } break;

            case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NORMAL:
            default: {
                fileName = "zh_CN/game/humanboy/animation/jackpot/jackpot";
            } break;
        }

        let vHitJackpotAward: humanboy_proto.HitJackpotAward[] = humanboyDataMgr.getHumanboyRoom().vHitJackpotAward;
        cv.resMgr.loadPrefab(fileName, (prefab: cc.Prefab): void => {
            let nodeJackpotAnim: cc.Node = cc.instantiate(prefab);
            this._nodeAnim.addChild(nodeJackpotAnim, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_1);
            nodeJackpotAnim.name = "jackpot_anim";
            nodeJackpotAnim.setPosition(nodeJackpotAnim.parent.convertToNodeSpaceAR(pos));
            nodeJackpotAnim.active = true;

            // 检测牌型
            let vPlayerHoleCard: humanboy_proto.PlayerHoleCard[] = humanboyDataMgr.getHumanboyRoom().vPlayerHoleCard;
            for (let i = 0; i < vPlayerHoleCard.length; ++i) {
                if (vPlayerHoleCard[i].option === betOption) {
                    switch (vPlayerHoleCard[i].level) {
                        case humanboy_proto.CardResult.LIAN_DUI: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_two_pairs");
                        } break;

                        case humanboy_proto.CardResult.SAN_TIAO: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_three_of_a_kind");
                        } break;

                        case humanboy_proto.CardResult.SHUN_ZI: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_straight");
                        } break;

                        case humanboy_proto.CardResult.TONG_HUA: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_flush");
                        } break;

                        case humanboy_proto.CardResult.HU_LU: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_gourd");
                        } break;

                        case humanboy_proto.CardResult.SI_TIAO: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_four_of_a_kind");
                        } break;

                        case humanboy_proto.CardResult.TONG_HUA_SHUN: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_straight_flush");
                        } break;

                        case humanboy_proto.CardResult.HUANG_TONG: {
                            specialCardType = cv.config.getLanguagePath("game/humanboy/animation/special_card_type/special_royal_flush");
                        } break;

                        default: break;
                    }

                    // 设置牌型
                    do {
                        let node_jackpot: cc.Node = nodeJackpotAnim.getChildByName("Node_Jackpot");
                        if (specialCardType.length > 0) {
                            let node_card_type: cc.Node = node_jackpot.getChildByName("node_card_type");
                            let img_card_type: cc.Sprite = node_card_type.getChildByName("img").getComponent(cc.Sprite);
                            img_card_type.sizeMode = cc.Sprite.SizeMode.RAW;
                            cv.resMgr.setSpriteFrame(img_card_type.node, specialCardType);
                        }

                        let holecards: humanboy_proto.ICardItem[] = vPlayerHoleCard[i].holeCards;
                        let node_card: cc.Node = node_jackpot.getChildByName("node_card");
                        for (let j = 0; j < node_card.childrenCount; ++j) {
                            let img_card: cc.Node = node_card.getChildByName(cv.StringTools.formatC("card_%d", j));
                            if (!img_card) continue;

                            if (j < 0 || j >= holecards.length) continue;

                            let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                            card.node.setAnchorPoint(img_card.getAnchorPoint());
                            card.node.setPosition(cc.Vec2.ZERO);
                            card.SetContent(holecards[j].number, holecards[j].suit);
                            card.SetFace(true);
                            img_card.addChild(card.node);
                        }
                    } while (0);
                }
            }

            // 开始动画
            let ctlJackpotAction: cc.Animation = nodeJackpotAnim.getComponent(cc.Animation);
            if (anim) {
                this._playSoundEffect(this._sound_jackpot);

                ctlJackpotAction.defaultClip.speed = this._getAnimClipSpeedByDuring(ctlJackpotAction.defaultClip, this._fActExecute_JackPot);
                ctlJackpotAction.defaultClip.wrapMode = cc.WrapMode.Normal;
                ctlJackpotAction.play();
                ctlJackpotAction.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                    ctlJackpotAction.off(cc.Animation.EventType.FINISHED);
                    nodeJackpotAnim.removeFromParent(true);
                    cv.tools.destroyNode(nodeJackpotAnim);
                }, this);
            }
            else {
                ctlJackpotAction.play();
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(delayed), cc.callFunc((): void => {
                    nodeJackpotAnim.removeFromParent(true);
                    cv.tools.destroyNode(nodeJackpotAnim);
                }, this)));
            }
        });
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

            let keepWinCount: number = humanboyDataMgr.getHumanboyRoom().getPlayerKeepWinCountByUid(uid);
            if (keepWinCount >= 3) {
                keepWinCount = keepWinCount > 10 ? 11 : keepWinCount;

                let offsetY: number = head === this._img_self_head.node ? 40 : 70;
                let tmpPos: cc.Vec2 = cc.Vec2.ZERO;
                head.convertToWorldSpaceAR(cc.v2(0, offsetY), tmpPos);

                let sprWinCount: cc.Sprite = new cc.Node().addComponent(cc.Sprite);
                this.node.addChild(sprWinCount.node, eHumanboyLocalZorder.HL_ZORDER_IMG_WIN_COUNT);
                sprWinCount.node.active = true;
                sprWinCount.node.name = nodeName;
                sprWinCount.node.setPosition(sprWinCount.node.parent.convertToNodeSpaceAR(tmpPos));

                let fileName: string = cv.StringTools.formatC("win_count_%d", keepWinCount);
                sprWinCount.spriteFrame = this._atlas_cb_language.getSpriteFrame(fileName);

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
            let vOtherPlayer: humanboy_proto.GamePlayer[] = humanboyDataMgr.getHumanboyRoom().vOtherPlayer;
            if (i < vOtherPlayer.length) {
                this._updatePlayerWinCount(vOtherPlayer[i].uid, bAnim);
            }
        }
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
            let win_node: cc.Node = cc.find("win_player_light", this._vOtherPlayerInfo[i].nodeHead);
            if (win_node && cc.isValid(win_node, true)) {
                this._vOtherPlayerInfo[i].nodeHead.removeChild(win_node);
                win_node.destroy();
            }
        }
    }

    /**
     * 从庄家向普通区域吐金币
     * @param anim 
     */
    private _showCoinToNormalAreaFromDealer(anim: boolean = true): void {
        let vWinArea: HashMap<number, number> = new HashMap();
        let vSettles: humanboy_proto.PlayerSettle[] = [];
        cv.StringTools.deepCopy(humanboyDataMgr.getHumanboyRoom().vPlayerSettles, vSettles);
        vSettles.push(humanboyDataMgr.getHumanboyRoom().tOtherPlayerSettle);

        for (let i = 0; i < vSettles.length; ++i) {
            let it: humanboy_proto.PlayerSettle = vSettles[i];
            let uid: number = it.uid;							    //
            let llWinAmount = it.pos4WinAmount;			            // 4门闲区域赢的多少 (扣除服务费后的)

            for (let j = 0; j < it.settle.length; ++j) {
                let zoneSettleDetail: humanboy_proto.IZoneSettleDetail = it.settle[j];
                let option: humanboy_proto.BetZoneOption = zoneSettleDetail.option;
                let amount: number = zoneSettleDetail.winAmount;
                let betAmount: number = zoneSettleDetail.betAmount;

                // 特殊牌型区除外
                if (option >= humanboy_proto.BetZoneOption.POS_LUCK) continue;

                let nAreaIdx: number = this._getAreaIdxByBetOption(option);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) continue;

                let it_zoneData: HumanboyZoneData = humanboyDataMgr.getHumanboyRoom().mapZoneData.get(option);
                if (it_zoneData) {
                    // 该区域闲家赢(庄家赔付 - 区域上的金币 = 最终吐出的金币, 一起飞向玩家)
                    if (it_zoneData.result < 0 && amount > 0) {
                        if (!vWinArea.get(nAreaIdx)) { vWinArea.add(nAreaIdx, 0); }

                        // 获取值
                        let val: number = vWinArea.get(nAreaIdx);

                        // 加上该玩家赢
                        val += amount;

                        // 减去玩家下注
                        val -= betAmount;

                        // 刷新值
                        vWinArea.add(nAreaIdx, val);
                    }
                }
            }
        }

        let vDealerInfoData: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerInfo;
        for (let i = 0; i < vDealerInfoData.length; ++i) {
            if (i < 0 || i >= this._vDealerInfo.length) continue;

            let imgGold: cc.Sprite = this._vDealerInfo[i].imgGold;
            let world_pos: cc.Vec2 = cc.Vec2.ZERO;
            imgGold.node.convertToWorldSpaceAR(cc.Vec2.ZERO, world_pos);

            vWinArea.forEach((k: number, v: number): void => {
                let nAreaIdx: number = k;
                let llAmount: number = Math.abs(v);

                let vAmountlevel: number[] = this._getBetDetailAmounts(llAmount);
                for (let i = 0; i < vAmountlevel.length; ++i) {
                    let fDelayedTime: number = 0.2 + i * 0.02;
                    this._showCoinAnimFromPos(world_pos, nAreaIdx, vAmountlevel[i], anim, fDelayedTime);
                }
            });
        }
    }

    /**
     * 从系统向幸运一击区域吐金币
     * @param anim 
     */
    private _showCoinToLuckBlowAreaFromSystem(anim: boolean = true): void {
        let vSettles: humanboy_proto.PlayerSettle[] = [];
        cv.StringTools.deepCopy(humanboyDataMgr.getHumanboyRoom().vPlayerSettles, vSettles);
        vSettles.push(humanboyDataMgr.getHumanboyRoom().tOtherPlayerSettle);

        for (let i = 0; i < vSettles.length; ++i) {
            let tSettle: humanboy_proto.PlayerSettle = vSettles[i];
            for (let j = 0; j < tSettle.settle.length; ++j) {
                let zoneDetail: humanboy_proto.IZoneSettleDetail = tSettle.settle[j];
                let llLuckWinAmount: number = zoneDetail.winAmount;
                if (llLuckWinAmount <= 0) continue;

                // 减去该区域已下注的金币
                llLuckWinAmount -= zoneDetail.betAmount;

                let nAreaIdx: number = this._getAreaIdxByBetOption(zoneDetail.option);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) continue;

                let panelCoin: cc.Node = this._vAreasInfo[nAreaIdx].panelCoin;
                let world_pos: cc.Vec2 = cc.Vec2.ZERO;
                panelCoin.convertToWorldSpaceAR(cc.Vec2.ZERO, world_pos);
                let vAmountlevel: number[] = this._getBetDetailAmounts(llLuckWinAmount);
                for (let k = 0; k < vAmountlevel.length; ++k) {
                    let fDelayedTime: number = 0.2 + k * 0.02;
                    this._showCoinAnimFromPos(world_pos, nAreaIdx, vAmountlevel[k], anim, fDelayedTime);
                }
            }
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
            console.log("showFlyCoinToPlayerAnim - playerSettles uid: %d not in gameplayers, use player list button", uid);
            vPlayerCoinNodes.push(this._btn_playerList);
        }

        // 找出该玩家同时存在哪几个头像(一个玩家可以同时是富豪,神算子等)
        for (let i = 0; i < vPlayerCoinNodes.length; ++i) {
            // 自己是富豪/神算子， 只回收一次金币到自己头像
            if (uid === cv.dataHandler.getUserData().u32Uid && i > 0) { continue; }

            let fromHead: cc.Node = vPlayerCoinNodes[i];
            // 飞金币动画
            do {
                let vAmountlevel: number[] = this._getBetDetailAmounts(amount);
                for (let k = 0; k < vAmountlevel.length; ++k) {
                    let flyCoin: HumanboyBetCoin = this._createFlyCoin(vAmountlevel[k]);
                    this._nodeAnim.addChild(flyCoin.node, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_0);

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
                    flyCoin.node.active = false;

                    // 开始飞金币
                    this.scheduleOnce((elapsed: number) => {
                        flyCoin.node.active = true;
                        flyCoin.node.runAction(cc.sequence(cc.delayTime(0.2 + k * 0.02)
                            , cc.moveTo(0.5, coinFlyDestPos).easing(cc.easeOut(0.8))
                            , cc.destroySelf()));
                    }, this._fActDelayed_FlyWinCoin);
                }
            } while (0);

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
            let strTotalWinAmount: string = humanboyDataMgr.getHumanboyRoom().transNumberToString(amount, 2, true);
            let flutterScore: HumanboyFlutterScore = cc.instantiate(this.prefab_hb_flutterScore).getComponent(HumanboyFlutterScore);
            flutterScore.node.setScale(1.4);
            this.node.addChild(flutterScore.node, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_2);
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

                let bDealerCoinNode: boolean = false;
                for (let i = 0; i < this._vDealerInfo.length; ++i) {
                    if (toNode === this._vDealerInfo[i].imgGold.node) {
                        bDealerCoinNode = true;
                        break;
                    }
                }

                // 庄家
                if (bDealerCoinNode) {
                    let tmp_x = Math.max(0, w / 2 - extra_w);
                    pos.x += tmp_x;
                    pos.y -= (toNode.height / 2 + offset);
                    //pos.y -= (toNode.height / 2 + h / 2 + offset);
                }
                // 自己
                else if (toNode === this._img_self_gold.node) {
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
     * 庄家飘分动画
     * @param fDelayTime 
     */
    private _showDealerAddCoinAnim(fDelayTime: number): void {
        let vDealerInfoData: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerInfo;
        for (let i = 0; i < vDealerInfoData.length; ++i) {
            if (i < 0 || i >= this._vDealerInfo.length) continue;

            let node_flyDestination: cc.Node = this._vDealerInfo[i].imgGold.node;
            let llAmount: number = vDealerInfoData[i].recentlyWinCoin;

            this._showHeadElasticAnim(node_flyDestination, fDelayTime);
            this._showAddCoinAnim(node_flyDestination, llAmount, fDelayTime);

            // 延时更新庄家信息
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(fDelayTime), cc.callFunc((): void => {
                this._updateDealerInfo();
            }, this)));
        }
    }

    /**
     * 显示庄家win金币回收动画
     * @param mapDealerWinAreaOption 
     */
    private _showDealerWinFlagsAndFlyCoinsAnim(mapDealerWinAreaOption: HashMap<humanboy_proto.BetZoneOption, number>): void {
        // 隐藏所有lose的区域(幸运一击区域除外)的下注金币
        this._hideLoseAreaCoinsAnim(true, false);

        // 飞金币
        let vDealerInfoData: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerInfo;
        for (let i = 0; i < vDealerInfoData.length; ++i) {
            if (i < 0 || i >= this._vDealerInfo.length) continue;

            let node_flyDestination: cc.Node = this._vDealerInfo[i].imgGold.node;
            let coinFlyFromPos: cc.Vec2 = cc.Vec2.ZERO;
            let coinFlyDestPos: cc.Vec2 = cc.Vec2.ZERO;

            mapDealerWinAreaOption.forEach((option: humanboy_proto.BetZoneOption, gold: number): string => {
                let nAreaIdx: number = this._getAreaIdxByBetOption(option);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return "continue";

                let panelCoin: cc.Node = this._vAreasInfo[nAreaIdx].panelCoin;
                let vAmountlevel: number[] = this._getBetDetailAmounts(gold);
                for (let k = 0; k < vAmountlevel.length; ++k) {
                    coinFlyFromPos.x = cv.StringTools.randomRange(panelCoin.width * 0.3, panelCoin.width * 0.7) - panelCoin.width * panelCoin.anchorX;
                    coinFlyFromPos.y = cv.StringTools.randomRange(panelCoin.height * 0.3, panelCoin.height * 0.7) - panelCoin.height * panelCoin.anchorY;

                    panelCoin.convertToWorldSpaceAR(coinFlyFromPos, coinFlyFromPos);
                    node_flyDestination.convertToWorldSpaceAR(cc.Vec2.ZERO, coinFlyDestPos);

                    let flyCoin: HumanboyBetCoin = this._createFlyCoin(vAmountlevel[k]);
                    this._nodeAnim.addChild(flyCoin.node, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_0);

                    flyCoin.node.parent.convertToNodeSpaceAR(coinFlyFromPos, coinFlyFromPos);
                    flyCoin.node.parent.convertToNodeSpaceAR(coinFlyDestPos, coinFlyDestPos);
                    flyCoin.node.setPosition(coinFlyFromPos);

                    // 开始飞金币
                    flyCoin.node.active = true;
                    flyCoin.node.runAction(cc.sequence(cc.delayTime(0.2 + k * 0.02)
                        , cc.moveTo(0.5, coinFlyDestPos).easing(cc.easeOut(0.8))
                        , cc.destroySelf()));
                }
            });
        }
    }

    /**
     * 显示Jackpot金币回收动画
     * @param betOption 
     */
    private _showJackPotFlagsAndFlyCoinAnim(betOption: humanboy_proto.BetZoneOption): void {
        let index: number = -1;
        let vHitJackpotAward: humanboy_proto.HitJackpotAward[] = humanboyDataMgr.getHumanboyRoom().vHitJackpotAward;
        for (let i = 0; i < vHitJackpotAward.length; ++i) {
            if (vHitJackpotAward[i].option === betOption) {
                index = i;
                break;
            }
        }
        if (index < 0) return;

        for (let i = 0; i < vHitJackpotAward[index].hitJackpotAwardData.length; ++i) {
            let data: humanboy_proto.IHitJackpotAwardData = vHitJackpotAward[index].hitJackpotAwardData[i];
            let uid: number = data.uid;
            let amount: number = data.amount;

            this._showFlyCoinToPlayerAnim(uid, amount, this._panel_jackpot, true, (): void => {
                // 更新击中jackpot后的金币
                let llBscGold: number = humanboyDataMgr.getHumanboyRoom().getPlayerBeforeSettlementGold(uid);
                llBscGold += amount;
                this._updatePlayerTempGold(uid, llBscGold);
                humanboyDataMgr.getHumanboyRoom().setPlayerBeforeSettlementGold(uid, llBscGold);
            });
        }
    }

    /**
     * 显示所有赢区域金币回收动画
     */
    private _showAllAreaWinFlagsAndFlyCoinAnim(): void {
        // 隐藏所有(win + 平局)的区域的下注金币
        this._hideWinAreaCoinsAnim(false, true);

        // 动画:在哪些选项赢了(增加除主界面8个人输赢外其它玩家列表的输赢)
        let vSettles: humanboy_proto.PlayerSettle[] = [];
        cv.StringTools.deepCopy(humanboyDataMgr.getHumanboyRoom().vPlayerSettles, vSettles);
        vSettles.push(humanboyDataMgr.getHumanboyRoom().tOtherPlayerSettle);

        for (let i = 0; i < vSettles.length; ++i) {
            let it: humanboy_proto.PlayerSettle = vSettles[i];
            let uid: number = it.uid;							        //
            let llWinAmount: number = it.pos4WinAmount;			        // 4门闲区域总赢的钱(扣除服务费后的)
            let llLuckWinAmount: number = it.posLuckWinAmount;	        // 幸运一击区域总赢的钱

            for (let j = 0; j < it.settle.length; ++j) {
                let zoneSettleDetail: humanboy_proto.IZoneSettleDetail = it.settle[j];
                let option: humanboy_proto.BetZoneOption = zoneSettleDetail.option;
                let nAreaIdx: number = this._getAreaIdxByBetOption(option);
                if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) continue;

                let amount = zoneSettleDetail.winAmount;
                if (amount > 0) {
                    let panelCoin: cc.Node = this._vAreasInfo[nAreaIdx].panelCoin;
                    this._showFlyCoinToPlayerAnim(uid, amount, panelCoin, true);
                }
            }

            // 额外飘分等其他动画
            do {
                let llTotalAmount = llWinAmount + llLuckWinAmount;
                if (llTotalAmount > 0) {
                    let vPlayerCoinNodes: cc.Node[] = this._getPlayerCoinNodesByUid(uid);

                    // 桌面没有该玩家
                    if (vPlayerCoinNodes.length === 0) {
                        console.log("playerSettles uid: %d not in gameplayers, use player list button", uid);
                        vPlayerCoinNodes.push(this._btn_playerList);
                    }

                    // 找出该玩家同时存在哪几个头像(一个玩家可以同时是富豪,神算子等)
                    for (let k = 0; k < vPlayerCoinNodes.length; ++k) {
                        // 自己是富豪/神算子, 只回收一次金币到自己头像
                        if (k > 0 && uid === cv.dataHandler.getUserData().u32Uid) {
                            continue;
                        }

                        let fromHead: cc.Node = vPlayerCoinNodes[k];

                        // 头像弹性动画
                        this._showHeadElasticAnim(fromHead, this._fActExecute_FlyWinCoin);

                        // 赢的玩家头像光环
                        this._showWinPlayerLightAnim(uid, this._fActExecute_FlyWinCoin);

                        // 加金币动画
                        this._showAddCoinAnim(fromHead, llTotalAmount, this._fActExecute_FlyWinCoin);
                    }
                }
            } while (0);
        }
    }

    /**
     * 充值
     * @param event 
     */
    private _onMsgRecharge(event: cc.Event.EventCustom): void {
        if (!cc.sys.isBrowser) {
            cv.viewAdaptive.isselfchange = true;
            cv.viewAdaptive.humanboyroomid = humanboyDataMgr.getHumanboyRoom().u32RoomId;
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
            cv.AudioMgr.playMusic(this._sound_BGM, true);
        }
        else {
            cv.AudioMgr.stopMusic();
        }
    }

    /**
     * 游戏内错误提示 
     */
    private _onMsgGameError(param: any): void {
        let code: number = cv.Number(param);
        let strValue: string = cv.StringTools.formatC("Humanboy_ServerErrorCode%d", code);

        // 下注额小于最小下注额
        if (code === humanboy_proto.ErrorCode.BET_TOO_SMALL) {
            let formatCoin: number = cv.StringTools.clientGoldByServer(humanboyDataMgr.getHumanboyRoom().tCurRoom.smallBet);
            this._showGameToast(cv.StringTools.formatC(cv.config.getStringData(strValue), cv.StringTools.numberToString(formatCoin)));
        }
        else {
            this._showGameToast(cv.StringTools.formatC("%s", cv.config.getStringData(strValue)));
        }
    }

    /**
     * 服务器踢人 
     */
    private _onMsgKick(param: humanboy_proto.KickNotify): void {
        if (param.idle_roomid > 0) {
            if (!this._bSwitchTable) {
                humanboyDataMgr.getHumanboyRoom().idle_roomid = param.idle_roomid;
                this.showSwitchTable();
            }
            return;
        }
        let eKickType: number = cv.Number(param.kickType);
        switch (eKickType) {
            case humanboy_proto.Kick.Kick_DUMMY: {
            } break;

            // 太长时间没下注
            case humanboy_proto.Kick.IDLE_LONG_TIME: {
                let tips: string = cv.config.getStringData("Humanboy_server_kick_long_time_text");
                this._backToMainScene(tips);
            } break;

            // 停服踢人
            case humanboy_proto.Kick.Stop_World: {
                let tips: string = cv.config.getStringData("Humanboy_server_kick_stop_world_text");
                this._backToMainScene(tips);
            } break;

            default:
                break;
        }
    }

    /**
     * 进入房间游戏数据同步 
     */
    private _onMsgGameDataSyn(param: any): void {
        console.log("HumanboyMainView.RoundState =  %d", humanboyDataMgr.getHumanboyRoom().eCurState);
        this._bSwitchTable = false;
        this._resetAllUI();

        /*客户端检测流程:
            => 停止下注, 翻牌
            0.庄家完胜完败检测
            1.显示幸运一击区域win动画
            2.路单动画
            3.特殊牌型检测
            4.飞庄家金币 + 系统收取幸运一击未击中的金币
            5.jackpot检测
            6.所有流程完毕, 统一更新至服务器最新数据
            => 清屏(等待下一局)
        */

        /*节奏时间
            1.基础动画(结束动画 1.5s + 翻牌动画4s + 路单动画延时0.5s + 路单动画1s + 停顿1s) 总共 8s
            2.完胜完败动画 			2.5s
            3.幸运一击				0s			- 小牌 +0s		中牌 +4s			大牌+ 8s
            4.飞庄金币动画			0s			- 四门庄家赢||幸运一击系统赢			+ 2s
            5.飞闲金币动画			0s			- 有赢								+ 2s + 2s
            6.jackpot检测 			n * 3s		- 有赢								+ n * 2s
        */

        // 根据不同的游戏状态恢复游戏场景
        switch (humanboyDataMgr.getHumanboyRoom().eCurState) {
            // 无
            case humanboy_proto.RoundState.RoundState_DUMMY: break;

            // 房间新建的，准备开局( do nothing )
            case humanboy_proto.RoundState.GAME_PENDING: {
            } break;

            // 新的一局
            case humanboy_proto.RoundState.NEW_ROUND: {
                if (this._getLeftTime() >= this._fActExecute_RoundStart + this._fActExecute_SendCard) {
                    this._showRoundStartAnim();
                }
                else {
                    this._resetAllCards(true);
                }

                this._updateAllWayOut();
            } break;

            // 下注
            case humanboy_proto.RoundState.BET: {
                this._resetAllCards(true);
                this._recoverAreasCoin(true);

                if (this._getLeftTime() >= this._fActDelayed_FightBegin + this._fActExecute_FightBegin) {
                    this._showFightBeginAnim();
                }

                this._onMsgGameStartBet(this);
                this._updateAllWayOut();

                if (humanboyDataMgr.getHumanboyRoom().bCanAdvanceAuto) {
                    this._checkAdvanceAutoReq();
                }
            } break;

            // 处于结束期间并即将开启新的一局
            case humanboy_proto.RoundState.WAIT_NEXT_ROUND: {
                this._resetAllCards(true);
                this._recoverAreasCoin(false);

                this._showAllCardsAnim(false);

                this._showAllWinFlagAnim();

                // 路子动画
                if (this._getLeftTime() >= this._fActExecute_WayOutLight) {
                    this._updateAllWayOut(1);
                    this._showAllWayOutAnim();
                }
                else {
                    this._updateAllWayOut();
                }

                // 直接显示倒计时等待(跳过humanboy_proto.RoundState.WAIT_NEXT_ROUND2的倒计时)
                this._showWaittingTime(true);
            } break;

            // 清屏等待下一局
            // 处于结束期间并即将开启新的一局的第二阶段，此阶段会清理庄家
            case humanboy_proto.RoundState.WAIT_NEXT_ROUND2: {
                this._showNextRoundPrepare();
            } break;

            default:
                break;
        }
    }

    /**
     * 下注级别变更 
     */
    private _onMsgBetAmountLevelChange(param: any): void {
        this._updateBetAmountLevel();
        this._updateBetButtonState();
    }

    /**
     * 设置高级续投次数成功	 
     */
    private _onMsgAdvanceAutobetSet(param: any): void {
        this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING);

        // 如果本局没有下注,且已勾选续投局数,则本局就生效一次
        if (!humanboyDataMgr.getHumanboyRoom().bHasBetInCurRound && humanboyDataMgr.getHumanboyRoom().bCanAuto) {
            this._checkAdvanceAutoReq();
        }
    }

    /**
     * 高级续投 
     */
    private _onMsgAdvanceAutobet(param: any): void {
        let code: number = cv.Number(param);
        switch (code) {
            case humanboy_proto.ErrorCode.OK: {
            } break;

            // 高级续投超出限红
            case humanboy_proto.ErrorCode.AUTO_BET_EXCEED_LIMIT: {
                if (this._humanboyAdvancedAuto) {
                    this._humanboyAdvancedAuto.adaptAdvanceAutoTipsPos(this._btn_betAuto.node);
                    this._humanboyAdvancedAuto.showAdvanceAutoTips(cv.config.getStringData(cv.StringTools.formatC("Humanboy_ServerErrorCode%d", code)));
                }
            } break;

            // 高级续投金额不足
            case humanboy_proto.ErrorCode.AUTO_BET_NO_MONEY: {
                let strNodeName: string = "humanboy_dialog_recharge";
                let dialogNode: cc.Node = this.node.getChildByName(strNodeName);
                if (!dialogNode) {
                    dialogNode = cc.instantiate(this.prefab_hb_dialog);
                    dialogNode.name = strNodeName;
                    this.node.addChild(dialogNode, eHumanboyLocalZorder.HL_ZORDER_PANEL_SERVER_TOAST);

                    dialogNode.getComponent(HumanboyDialog).show(cv.config.getStringData(cv.StringTools.formatC("Humanboy_ServerErrorCode%d", code))
                        , cv.config.getStringData("CowBoy_btn_desc_auto_cancel")
                        , cv.config.getStringData("CowBoy_btn_desc_auto_recharge")
                        , (dialog: HumanboyDialog): void => { cv.humanboyNet.reqCancelAdvanceAutoBet(); }
                        , (dialog: HumanboyDialog): void => { cv.MessageCenter.send("on_recharge_notify"); });

                    // 如果打开了 JP界面, 则关闭
                    if (this._humanboyJackpot) {
                        //this._humanboyJackpot.setShieldLayerEnabled(false);
                        this._humanboyJackpot.hide(false);
                    }
                }
            } break;

            default: {
                cv.MessageCenter.send("on_humanboy_server_error", code);
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
    private _onMsgAdvanceAutobetCancel(param: any): void {
        this._updateBetAmountLevel();
        this._updateBetButtonState();
    }

    /**
     * 房间变更通知(目前只针对赔率) 
     */
    private _onMsgRoomParamChange(param: any): void {
        this._updateBetOddsDetail();
    }

    /**
     * 新开一局
     */
    private _onMsgGameDeal(param: any): void {
        this._resetGameView();

        // 更新下注按钮和触摸状态
        this._updateBetButtonState();
        this._updateBetAreaTouchEnabled();

        // 更新庄家信息
        this._updateDealerInfo();

        // 更新自己信息
        this._updateSelfInfo();

        // 更新其他人信息
        this._updateOtherPlayersInfo();

        // 更新所有玩家连胜状态
        this._updateAllPlayerWinCount();

        // 开局动画 . 发牌动画 . 开始下注动画
        this._showRoundStartAnim();
    }

    /**
     * 开始下注 
     */
    private _onMsgGameStartBet(param: any) {
        this._resetAllCards(true);
        this._resetLeftTime();

        // 更新下注倒计时
        this._updateTimeBetClock();

        // 更新区域触摸状态
        this._updateBetButtonState();
        this._updateBetAreaTouchEnabled();

        // 检测是否正在使用高级续投
        this._checkAdvanceAutoReq();
    }

    /**
     *  一局结束 
     */
    private _onMsgGameRoundEnd(param: any) {
        this._resetLeftTime();
        this._restAllTimelineAnims();

        this._updateBetButtonState(false);
        this._updateBetAreaTouchEnabled();

        this._showRoundEndAnim();

        // 隐藏高级续投选择面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.hideSelectPanel(false);
        }
    }

    /**
     * 游戏即将开始
     */
    private _onMsgWillStartNotify(param: any) {
        this._resetLeftTime();
        this._showNextRoundPrepare();

        // 请求走势图
        if (this._humanboyChart && this._humanboyChart.node.active) {
            cv.MessageCenter.send("humanboy_start_history_move_anim");
        }
    }

    /**
     * 显示上庄面板
     * @param anim 
     * @param eType 
     */
    private _showDealerListView(anim: boolean, eType: eHumanboyDealerListViewType): void {
        if (!this._dealerListView) {
            this._dealerListView = cc.instantiate(this.prefab_hb_dealerList).getComponent(HumanboyDealerList);
            this.node.addChild(this._dealerListView.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_DEALERLIST);
        }
        this._dealerListView.show(anim, eType);

        cv.humanboyNet.requestBuyStockNum();
        cv.humanboyNet.requestDealerList();
    }

    /**
     * 点击上庄按钮
     */
    private _onClickDealerBtn(event: cc.Event): void {
        this._playSoundEffect(this._sound_button);

        switch (this._btnStatus) {
            case eHumanboyDealerBtnStatus.HDB_STATUS_NONE:
                break;

            case eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_UP: {
                this._showDealerListView(true, eHumanboyDealerListViewType.HDLV_TYPE_WATTING);
            } break;

            case eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_DOWN: {
                cv.humanboyNet.requestDownDealer();
            } break;

            default:
                break;
        }
    }

    /**
     * 点击金币区域下注
     * @param nAreaIdx 
     */
    private _onClickAreaCoinPanel(nAreaIdx: number): void {
        if (nAreaIdx < 0 || nAreaIdx >= this._vAreasInfo.length) return;

        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.BET && this._getLeftTime() > 0)	// 可以下注
        {
            if (this._nCurBetBtnIndex < 0) {
                this._showGameToast(cv.config.getStringData("Humanboy_not_select_betbtn"));
                return;
            }
            else {
                cv.humanboyNet.requestBet(this._vAreasInfo[nAreaIdx].eZone, this._getCurBetLevel());
            }
        }
        else {
            console.log("HumanboyMainView.betAreaClicked, cannot bet, curState: %d, left bet time: %d", humanboyDataMgr.getHumanboyRoom().eCurState, this._getLeftTime());
            this._showGameToast(cv.config.getStringData("Humanboy_ServerErrorCode41009"));
        }
    }

    /**
     * 切换指定场景前回调(切出该场景)
     * @param scene 
     */
    private _onMsgSwitchSceneBegan(sceneName: string): void {
        console.log(cv.StringTools.formatC("SwitchScene - From[%s] To [%s]", cv.Enum.SCENE.HUMANBOY_SCENE, sceneName));
        this._clearData();
    }

    /**
     * 下注 
     */
    private _onMsgBet(param: any): void {
        this._updateAutoBetBtnStatus();

        let tOneBet: PlayerOneBet = humanboyDataMgr.getHumanboyRoom().tCurPlayerOneBet;
        let nAreaIdx: number = this._getAreaIdxByBetOption(tOneBet.betOption);

        /* 直接当前帧处理
        // 更新区域限红
        this._updateBettAreaLimitAmount(tOneBet.betOption, -tOneBet.betAmount);

        // 更新玩家金币
        this._updatePlayerGold(tOneBet.uid);

        // 金币动画
        this._showCoinAnim(nAreaIdx, tOneBet.betAmount, tOneBet.uid, true, true, true);

        // 自己筹码变化后判断一下下注筹码状态
        if (humanboyDataMgr.getHumanboyRoom().tSelfPlayer.uid === tOneBet.uid) {
            this._updateBetButtonState();
        }
        */

        // 添加到金币队列, 按帧添加
        let tCoinOptimization: tHumanboyCoinOptimization = new tHumanboyCoinOptimization();
        tCoinOptimization.nAreaIdx = nAreaIdx;
        tCoinOptimization.nGold = tOneBet.betAmount;
        tCoinOptimization.nUid = tOneBet.uid;
        tCoinOptimization.bAnim = true;
        tCoinOptimization.bHeadAnim = true;
        tCoinOptimization.bPlaySound = true;
        this._vCoinOptimizationDeque.push_back(tCoinOptimization);
    }

    /**
     * 请求续投成功 
     */
    private _onMsgAutoBet(param: any): void {
        this._updateBetButtonState();
    }

    /**
     * 合并续投动作 
     */
    private _onMsgMergeAutoBetAct(param: any): void {
        let betSize: number = cv.Number(param);
        let headAnim: boolean = false;
        if (++this._nMergeAutoBetNum >= betSize) {
            this._nMergeAutoBetNum = 0;
            headAnim = true;
        }

        let tOneBet: PlayerOneBet = humanboyDataMgr.getHumanboyRoom().tCurPlayerOneBet;
        let nAreaIdx: number = this._getAreaIdxByBetOption(tOneBet.betOption);

        // 动态增加金币池(主要用于优化续投大量金币体验)
        do {
            let nFreeCoinCount: number = this._getFreeCoinCountFromPool(nAreaIdx);
            //if(betSize > this._nAreaCoinLimitCountMin)
            if (betSize > nFreeCoinCount) {
                //let nDiffCount: number = betSize - this._nAreaCoinLimitCountMin;
                let nDiffCount: number = betSize - nFreeCoinCount;
                let nFinalCount: number = Math.min(this._nAreaCoinLimitCountMin + nDiffCount, this._nAreaCoinLimitCountMax);
                this._nAreaCoinLimitCountMin = nFinalCount;
            }
        } while (0);

        /* 直接当前帧处理
        // 更新区域限红
        this._updateBettAreaLimitAmount(tOneBet.betOption, -tOneBet.betAmount);

        // 更新玩家金币
        this._updatePlayerGold(tOneBet.uid);

        // 金币动画
        this._showCoinAnim(nAreaIdx, tOneBet.betAmount, tOneBet.uid, true, headAnim, headAnim);
        */

        // 添加到金币队列, 按帧添加
        let tCoinOptimization: tHumanboyCoinOptimization = new tHumanboyCoinOptimization();
        tCoinOptimization.nAreaIdx = nAreaIdx;
        tCoinOptimization.nGold = tOneBet.betAmount;
        tCoinOptimization.nUid = tOneBet.uid;
        tCoinOptimization.bAnim = true;
        tCoinOptimization.bHeadAnim = true;
        tCoinOptimization.bPlaySound = true;
        this._vCoinOptimizationDeque.push_back(tCoinOptimization);
    }

    /**
     * 合并续投动作结束 
     */
    private _onMsgMergeAutoBetEnd(param: any): void {
        let betSize: number = cv.Number(param);
        let sound: string = betSize <= 1 ? this._sound_betin : this._sound_betin_many;
        this._playSoundEffect(sound);
        this._updateBetButtonState();
    }

    /**
     * 上庄列表 
     */
    private _onMsgDealerList(param: any): void {
        // 刷新上庄视图
        if (!this._dealerListView) return;
        this._dealerListView.updateView();
    }

    /**
     * 上庄申请 
     */
    private _onMsgDealerUp(param: any): void {
        let uBuyStockNum: number = cv.Number(param);
        this._showGameToast(cv.config.getStringData("Humanboy_game_dealer_up"));

        cv.humanboyNet.requestBuyStockNum();
        cv.humanboyNet.requestDealerList();
    }

    /**
     * 上庄通知 
     */
    private _onMsgDealerUpNotify(param: any): void {
        let uDealerUid: number = cv.Number(param);
        if (uDealerUid === cv.dataHandler.getUserData().u32Uid) {
            // 更新自身金币数量
            let llGold: number = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin;
            this._txt_self_gold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llGold);

            cv.humanboyNet.requestBuyStockNum();
            cv.humanboyNet.requestDealerList();

            // 更新庄家信息
            this._updateDealerInfo();
        }
    }

    /**
     * 上庄失败被踢 
     */
    private _onMsgKickDealerApplyNotify(param: any): void {
        let reson: number = cv.Number(param);
        switch (reson) {
            case humanboy_proto.KickApplyDealerReason.K_NULL: {
            } break;

            // 提示:余额不足，申请上庄失败
            case humanboy_proto.KickApplyDealerReason.K_NoMoney: {
                this._showGameToast(cv.config.getStringData("Humanboy_kick_applydealer_nomoney"));
            } break;

            // 提示:余额不足，补充股份失败
            case humanboy_proto.KickApplyDealerReason.K_SUPPLY: {
                this._showGameToast(cv.config.getStringData("Humanboy_kick_applydealer_supply"));
            } break;

            // 断线被踢出上庄申请列表（备用）
            case humanboy_proto.KickApplyDealerReason.K_OFFLINE: {
            } break;

            // 离开被踢出上庄申请列表（备用）
            case humanboy_proto.KickApplyDealerReason.K_LEAVE: {
            } break;

            default:
                break;
        }

        cv.humanboyNet.requestBuyStockNum();
        cv.humanboyNet.requestDealerList();
    }

    /**
     * 取消等待队列 
     */
    private _onMsgDealerCancelWait(param: any): void {
        this._showGameToast(cv.config.getStringData("Humanboy_game_dealer_cancel_wait"));

        cv.humanboyNet.requestBuyStockNum();
        cv.humanboyNet.requestDealerList();
    }

    /**
     * 下庄 
     */
    private _onMsgDealerDown(param: any): void {
        let uDoNow: number = cv.Number(param);
        switch (uDoNow) {
            // 当局会下庄
            case 1: {
                this._showGameToast(cv.config.getStringData("Humanboy_game_dealer_down_1"));
            } break;

            // 需要下局才下庄
            case 2: {
                // 点击我要下庄后, 禁用上庄列表面板中的"我要上庄按钮"
                if (this._dealerListView) {
                    this._dealerListView.setBtnDealerEnable(false);
                }

                this._showGameToast(cv.config.getStringData("Humanboy_game_dealer_down_2"));
            } break;

            default:
                break;
        }
    }

    /**
     * 下庄通知 
     */
    private _onMsgDealerDownNotify(param: any): void {
        let noti: humanboy_proto.DownDealerNotify = humanboyDataMgr.getHumanboyRoom().tDownDealerNotify;
        if (noti.uid === cv.dataHandler.getUserData().u32Uid) {
            let str_reason: string = "";
            switch (noti.reason) {
                // 身上钱低于下庄要求
                case humanboy_proto.DownDealerReason.NoMoney: {
                    this._showGameToast(cv.config.getStringData("Humanboy_game_dealer_down_notify_nomoney"));
                } break;

                // 连续座庄次数到达限制
                case humanboy_proto.DownDealerReason.LongTime: {
                    let dialogNode: cc.Node = cc.instantiate(this.prefab_hb_dialog);
                    this.node.addChild(dialogNode, eHumanboyLocalZorder.HL_ZORDER_PANEL_SERVER_TOAST);

                    dialogNode.getComponent(HumanboyDialog).show(cv.config.getStringData("Humanboy_game_dealer_down_notify_longtime")
                        , cv.config.getStringData("TipsPanel_cancel_button")
                        , cv.config.getStringData("TipsPanel_sure_button")
                        , (dialog: HumanboyDialog): void => { }
                        , (dialog: HumanboyDialog): void => { cv.humanboyNet.requestUpDealer(noti.holdStockNum); });

                    // 如果打开了 JP界面, 则关闭
                    if (this._humanboyJackpot) {
                        //this._humanboyJackpot.setShieldLayerEnabled(false);
                        this._humanboyJackpot.hide(false);
                    }
                } break;

                // 主动下庄
                case humanboy_proto.DownDealerReason.Leave: {
                    this._showGameToast(cv.config.getStringData("Humanboy_game_dealer_down_1"));
                } break;

                case humanboy_proto.DownDealerReason.Offline: break;								// 离线下庄

                default: break;
            }

            // 更新自身金币数量
            let llGold: number = humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin;
            this._txt_self_gold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llGold);

            // 更新庄家信息
            // this._updateDealerInfo();
        }
    }

    /**
     * 更新玩家列表
     */
    private _onMsgPlayerList(params: any): void {
        if (!this._humanboyPlayerList) {
            this._humanboyPlayerList = cc.instantiate(this.prefab_hb_playerList).getComponent(HumanboyList);
            this.node.addChild(this._humanboyPlayerList.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_RECORD);
            this._humanboyPlayerList.setHumanboyData();
            this._humanboyPlayerList.displayCell(0);
        }
        else {
            this._humanboyPlayerList.node.active = true;
            this._humanboyPlayerList.setHumanboyData();
            this._humanboyPlayerList.displayCell(-1);
        }
    }

    /**
     * 中奖,荣耀榜等提示
     */
    private _onMsgRewardTips(param: any): void {
        if (!this._humanboyRewardTips) {
            let pos_x: number = (1 - this.node.anchorX) * this.node.width * this.node.scaleX;
            let pos_y: number = (1 - this.node.anchorY) * this.node.height * this.node.scaleY - 122;

            this._humanboyRewardTips = cc.instantiate(this.prefab_hb_rewardTips).getComponent(HumanboyRewardTips);
            this.node.addChild(this._humanboyRewardTips.node, eHumanboyLocalZorder.HL_ZORDER_PANEL_REWRAD_TIP);
            this._humanboyRewardTips.node.setPosition(pos_x, pos_y);
        }

        let value: string = cv.String(param);
        this._humanboyRewardTips.show(value, 4);
    }

    /**
     * world服金币有变动通知
     */
    private _onMsgUpdateWorldServerGold(param: any): void {
        // world服接收接口已过滤只发自己, 因此这里无需再次判断(同时没有别的需求, 所以也不用缓存下发的结构) 
        let llCurGold: number = cv.dataHandler.getUserData().total_amount;

        // 结算阶段跳过(否则会提前知道输赢结果)
        if (humanboyDataMgr.getHumanboyRoom().bCanUpdateWorldServerGold) {
            // 更新自己金币信息
            humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin = llCurGold;
            this._updatePlayerGold(cv.dataHandler.getUserData().u32Uid);

            // 更新其他人信息(因为自己有可能会在8人列表中)
            let bOnMainPlayerList: boolean = false;
            let vOtherPlayerInfo: humanboy_proto.GamePlayer[] = humanboyDataMgr.getHumanboyRoom().vOtherPlayer;
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

    /**
     * 适配刘海屏相关控件
     */
    private _adaptiveScreen(): void {
        // 左右玩家列表
        let panel_left_playerlist: cc.Node = this.node.getChildByName("panel_left_playerlist");
        let panel_right_playerlist: cc.Node = this.node.getChildByName("panel_right_playerlist");

        // 适配相关控件位置
        switch (this._eGameboyScreenType) {
            case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD: {
                this._btn_menu.node.getComponent(cc.Widget).top = 68;
                cv.resMgr.adaptWidget(this._btn_menu.node);
                this._btn_record.node.getComponent(cc.Widget).top = 68;
                cv.resMgr.adaptWidget(this._btn_record.node);
                // let tmp_y: number = 50;
                // this._btn_menu.node.setPosition(this._btn_menu.node.x, this._btn_menu.node.y - tmp_y);
                // this._btn_record.node.setPosition(this._btn_record.node.x, this._btn_record.node.y - tmp_y);

                // panel_left_playerlist.setPosition(panel_left_playerlist.x, panel_left_playerlist.y - tmp_y / 2);
                // panel_right_playerlist.setPosition(panel_right_playerlist.x, panel_right_playerlist.y - tmp_y / 2);
            } break;

            case MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW: {
                // let tmp_x: number = HumanboyGameScene.g_fullScreenOffset.x - 25;
                // panel_left_playerlist.setPosition(panel_left_playerlist.x + tmp_x, panel_left_playerlist.y);
                // panel_right_playerlist.setPosition(panel_right_playerlist.x - tmp_x, panel_right_playerlist.y);
            } break;
        }

        // 菜单按钮
        this._btn_menu.node.setPosition(cc.v2(panel_left_playerlist.x, this._btn_menu.node.y));

        // 表格记录按钮
        this._btn_record.node.setPosition(cc.v2(panel_right_playerlist.x, this._btn_record.node.y));

        // 玩家自己面板
        if (this._panel_self) {
            let img_head: cc.Node = this._panel_self.getChildByName("img_head");
            let pos: cc.Vec2 = cc.Vec2.ZERO;
            this._btn_menu.node.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);
            img_head.parent.convertToNodeSpaceAR(pos, pos);
            this._panel_self.setPosition(this._panel_self.x + pos.x - img_head.x, this._panel_self.y);
        }

        // 玩家列表按钮
        if (this._btn_playerList) {
            let pos: cc.Vec2 = cc.Vec2.ZERO;
            this._btn_record.node.convertToWorldSpaceAR(cc.Vec2.ZERO, pos);
            this._btn_playerList.parent.convertToNodeSpaceAR(pos, pos);
            this._btn_playerList.setPosition(pos.x, this._btn_playerList.y);
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
                this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._vBetButtons[i].node, this._fBetBtnSrcScaleRate));
            }

            // 续投按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_betAuto.node, this._btn_betAuto.node.scale));

            // 清屏按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_betClean.node, this._btn_betClean.node.scale));

            // 红包节按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_redpacket_festival, this._btn_redpacket_festival.scale));
        }

        let w: number = this._btn_playerList.x - this._btn_playerList.width / 2;
        w -= (this._panel_self.x + this._panel_self.width / 2);
        this._panel_betbtn.setContentSize(cc.size(w, this._panel_betbtn.height));
        this._panel_betbtn.setPosition(this._panel_self.x + this._panel_self.width / 2 + w / 2, this._panel_betbtn.y);

        let iTotal_w: number = 0;			// 所有可见子节点宽度和
        let iSpacing_x: number = 0;			// 子节点之间的间距
        let iChildrenCount: number = 0;		// 可见的子节点个数

        for (let i = 0; i < this._vBottomBetBtns.length; ++i) {
            let node: cc.Node = this._vBottomBetBtns[i].node;
            let fScale: number = this._vBottomBetBtns[i].scale;
            if (node.active) {
                ++iChildrenCount;
                iTotal_w += node.width * fScale;
            }
        }

        iSpacing_x = (this._panel_betbtn.width - iTotal_w) / (iChildrenCount + 1);

        let iLast_w: number = -this._panel_betbtn.width * 0.5;
        for (let i = 0; i < this._vBottomBetBtns.length; ++i) {
            let node: cc.Node = this._vBottomBetBtns[i].node;
            let fScale: number = this._vBottomBetBtns[i].scale;
            if (node.active) {
                let x = iLast_w + iSpacing_x + node.width * fScale / 2;
                let pos: cc.Vec2 = cc.Vec2.ZERO;
                this._panel_betbtn.convertToWorldSpaceAR(cc.v2(x, 0), pos);
                node.parent.convertToNodeSpaceAR(pos, pos);

                node.setPosition(pos.x, node.y);
                iLast_w = pos.x + node.width * fScale / 2;
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


    playPointAni() {
        let points_num = humanboyDataMgr.getHumanboyRoom().change_points;
        if (points_num < 0) return;

        if (!this.points_node) {
            this.points_node = cc.instantiate(this.points_ani_prefab);
            this.node.addChild(this.points_node, eHumanboyLocalZorder.HL_ZORDER_ANIM_NODE_3);
            this.points_node.setPosition(this.node.convertToNodeSpaceAR(this._img_self_head.node.parent.convertToWorldSpaceAR(this._img_self_head.node.position)));
            this.points_node.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                this.resetPointAni();
            }, this);
        }

        this.points_node.getComponent(HeadPointsAni).playPointAni(points_num);
    }

    resetPointAni() {
        humanboyDataMgr.getHumanboyRoom().change_points = 0;
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
        if (this._eGameboyScreenType == MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_BROAD) {
            bgPosY = [419, 205, -9, -223, -437];
            left_nb_flag = cc.v2(-4, 461);
            right_nb_flag = cc.v2(-16, 464);
        }
        else if (this._eGameboyScreenType == MiniGameCommonDef.eGameboyScreenType.GST_SCREEN_NARROW) {
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
    }

    showSwitchTable() {
        if (this._bSwitchTable) return;
        this._bSwitchTable = true;
        cv.TP.showMsg(cv.config.getStringData("MiniGames_Switch_content"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            cv.roomManager.setCurrentRoomID(humanboyDataMgr.getHumanboyRoom().idle_roomid);
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
            _popSilence.getComponent(popSilence).autoShow(cv.Enum.popSilenceType.countDownGame, msg);
        }
    }
}
