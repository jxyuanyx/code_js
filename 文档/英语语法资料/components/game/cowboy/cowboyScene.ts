import pb_cowboy = require("../../../../Script/common/pb/cowboy");
import cowboy_proto = pb_cowboy.cowboy_proto;

import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;


import cv from "../../lobby/cv";
import cb from "./cb";

import CowboyCard from "./CowboyCard";
import { MiniGameCommonDef } from "../common/define";
import { HashMap } from "../../../common/tools/HashMap";
import { RoundState } from "./CowboyEnum";
import { PlayerSettle, PlayerOneBet } from "./CowboyRoomData";

import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";
import { cowboyChart } from "../cowboy/cowboyChart";
import HumanboyExchange from "../humanboy/HumanboyExchange";
import { CowboyRule } from "../cowboy/CowboyRule";
import { CowboySetting } from "./CowboySetting";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import { HumanboyList } from "../humanboy/HumanboyList";
import { HumanboyDialog } from "../humanboy/HumanboyDialog";
import { HumanboyGuid } from "../humanboy/HumanboyGuid";
import { HumanboyMenu } from "../humanboy/HumanboyMenu";
import { HumanboyAdvancedSetting } from "../humanboy/HumanboyAdvancedSetting";
import { HumanboyAdvancedAuto } from "../humanboy/HumanboyAdvancedAuto";
import LuckTurntablesButton from "../redEnvelope/LuckTurntablesButton";
import { Deque } from "../../../common/tools/Deque";
import { Config } from "../../../common/tools/Config";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import HeadPointsAni from "./HeadPointsAni";
import popSilence from "./PopSilence";

export enum COWBOY_LOCAL_ZORDER {
    COWBOY_LOCAL_ZORDER_DUMMY = 0,
    COWBOY_LOCAL_ZORDER_IMG_HEAD,
    COWBOY_LOCAL_ZORDER_IMG_WIN_COUNT,
    COWBOY_LOCAL_ZORDER_COIN_NODE,
    COWBOY_LOCAL_ZORDER_ANIM_NODE,
    COWBOY_LOCAL_ZORDER_TIMELINE_NODE,
    COWBOY_LOCAL_ZORDER_ADVANCE_AUTO_SELECT,															// 高级续投选择面板
    COWBOY_LOCAL_ZORDER_REWRAD_TIP,																		// 中奖提示面板
    COWBOY_LOCAL_ZORDER_RED_PACKAGE,                                                                    // 红包面板
    COWBOY_LOCAL_ZORDER_MENU_PANEL = 99,
    COWBOY_LOCAL_ZORDER_TOAST,
    COWBOY_LOCAL_ZORDER_GUIDE,
};

// 牛仔路子结构信息
export class tCowboyWayOutInfo {
    iAreaIdx: number = -1;																			    // 区域索引
    iWayOutLoseLimitCount: number = 0;														            // 路单描述文本"xxx局"未出上限(超过上限显示: "xxx+ 局未出", 默认0表示无上限)
    panelWayOut: cc.Node = null;																	    // 路单层
    rtxtWayOut: cc.RichText = null;																	    // 路子描述文本
    vWayOutImg: cc.Node[] = [];																	        // 路子精灵数组
    vWayOutImgSrcPos: cc.Vec2[] = [];															        // 路子精灵原始位置数组
    eWayOutStyle: number = MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE;				                // 路子显示风格
};

export class OtherPlayerHead {
    uid: number = 0;
    bg: cc.Sprite = null;
    textCoin: cc.Label = null;
    nbFlag: cc.Sprite = null;	// 富豪/神算子
};

class effectLoop {
    audioId: number = 0;
    duringTime: number = 0;
    startPlayTime: number = 0;
    bGoOn: boolean = false;
    func: Function = null;
};
const { ccclass, property } = cc._decorator;

@ccclass
export default class CowboyScene extends cc.Component {

    // 抽中红包动画
    // @property(cc.Prefab) redPacket_prefab: cc.Prefab = null;
    @property(cc.Prefab) round_start_prefab: cc.Prefab = null;
    @property(cc.Prefab) fight_begin_prefab: cc.Prefab = null;
    @property(cc.Prefab) fight_end_prefab: cc.Prefab = null;
    @property(cc.Prefab) wait_for_next_round_prefab: cc.Prefab = null;
    @property(cc.Prefab) win_flag_prefab: cc.Prefab = null;
    @property(cc.Prefab) special_card_type_prefab: cc.Prefab = null;
    @property(cc.Prefab) win_player_light_prefab: cc.Prefab = null;
    @property(cc.Prefab) btnBet_0_prefab: cc.Prefab = null;
    @property(cc.Prefab) btnBet_3_prefab: cc.Prefab = null;
    @property(cc.Prefab) cow_win_prefab: cc.Prefab = null;
    @property(cc.Prefab) cow_lose_prefab: cc.Prefab = null;
    @property(cc.Prefab) boy_win_prefab: cc.Prefab = null;
    @property(cc.Prefab) boy_lose_prefab: cc.Prefab = null;

    //子界面
    @property(cc.Prefab) cowboyChart: cc.Prefab = null;
    @property(cc.Prefab) humanboyExchange_prefab: cc.Prefab = null;
    @property(cc.Prefab) cowboyRule: cc.Prefab = null;
    @property(cc.Prefab) cowboySetting: cc.Prefab = null;
    @property(cc.Prefab) cowboyExit: cc.Prefab = null;
    @property(cc.Prefab) cowboyList: cc.Prefab = null;
    @property(cc.Prefab) humanboyAdvancedSetting_prefab: cc.Prefab = null;
    @property(cc.Prefab) HumanboyDialog: cc.Prefab = null;
    @property(cc.Prefab) humanboyGuid_prefab: cc.Prefab = null;
    @property(cc.Prefab) HumanboyMenu_prefab: cc.Prefab = null;
    @property(cc.Prefab) HumanboyAdvancedAuto_prefab: cc.Prefab = null;
    @property(cc.Prefab) HumanboyDialog_prefab: cc.Prefab = null;

    @property(cc.SpriteAtlas) game_dznz_PLIST: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) cowboy_trend_anim_PLIST: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) special_card_type_PLIST: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) chart_PLIST: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) en_animation_PLIST: cc.SpriteAtlas = null;
    @property(cc.Font) win_num_FNT: cc.Font = null;
    @property(cc.Font) bet_btn_num_gray: cc.Font = null;
    @property(cc.Font) bet_btn_num_yellow: cc.Font = null;

    @property(cc.Prefab) luckButton_prefab: cc.Prefab = null;
    @property(cc.Prefab) points_ani_prefab: cc.Prefab = null;
    @property(cc.Prefab) popSilencePre: cc.Prefab = null;                               //冷静预制件

    points_node: cc.Node = null;

    language_PLIST: cc.SpriteAtlas = null;

    // 牌/牌型
    _cardPanel: cc.Node = null;
    _oriRedHandCards: cc.Sprite[] = [];//2
    _oriBlueHandCards: cc.Sprite[] = [];//2
    _oriPublicCards: cc.Sprite[] = [];//5
    _oriRedHandCardsPos: cc.Vec2[] = [];//2
    _oriBlueHandCardsPos: cc.Vec2[] = [];//2
    _oriPublicCardsPos: cc.Vec2[] = [];//5

    _redHandCards: CowboyCard[] = [];
    _blueHandCards: CowboyCard[] = [];
    _publicCards: CowboyCard[] = [];
    _redCardType: cc.Sprite = null;
    _blueCardType: cc.Sprite = null;
    _redCardTypeBg: cc.Sprite = null;
    _blueCardTypeBg: cc.Sprite = null;
    _mapLevelCardTypeImage: HashMap<number, string> = new HashMap();// 映射： 牌型 <. 图片

    _gameContent: cc.Node = null;
    _menuPanel: cc.Node = null;
    _betContentBg: cc.Sprite = null;
    _menuBg: cc.Sprite = null;
    _bottomPanel: cc.Node = null;
    _btnMenu: cc.Button = null;
    _btnPlayerList: cc.Button = null;
    self_panel: cc.Node = null;
    _topBg: cc.Sprite = null;
    _btnZouShi: cc.Button = null;

    _betButtons: cc.Button[] = [];//5
    _betButtonTexts: cc.Node[] = []; //vector<@property(cc.Label) this._betButtonTexts;
    _betButtonMasks: cc.Sprite[] = [];//5
    _vBottomBetBtns: MiniGameCommonDef.tGameNodeScale[] = []; 														        // 底部下注按钮数组(用于适配位置)
    _betButtonNum: number = 5;																				                // 下注按钮数量
    _fBetBtnSrcScaleRate: number = 0.75;															                        // 下注筹码原始缩放比例
    _fBetBtnTarScaleRate: number = 1.0;															                            // 下注筹码目标缩放比例
    _fFlyCoinScaleRate: number = 0.5;																                        // 创建的金币缩放比例

    _curBetButtonIdx: number = 0;
    bottom_bg: cc.Node = null;
    _panel_betbtn: cc.Node = null;

    _btnBetAuto: cc.Button = null;
    _btnBetClean: cc.Button = null;															                                // 清屏

    // areaIdx <. xxx
    _betAreas: cc.Node[] = [];
    _betCoinContents: cc.Node[] = [];
    _textSelfBetNum: cc.Label[] = [];
    _textTotalBetNum: cc.Label[] = [];
    _oriTextSelfBetNumPos: cc.Vec2[] = [];
    _oriTextTotalBetNumPos: cc.Vec2[] = [];
    _sprBetAreaWinFlags: cc.Sprite[] = [];
    _textBetAreaOdds: cc.Label[] = [];
    _mapBetOptionArea: HashMap<number, number> = new HashMap();	                                                            // 映射：BetZoneOption <. index of this._betAreas

    _betCountDownBg: cc.Sprite = null;	// 闹钟背景
    _textCountDown: cc.Label = null;	// 闹钟时间文本
    _oriBetCountDownBgPos: cc.Vec2 = new cc.Vec2(0, 0);	// 闹钟背景初始位置

    // 个人信息
    _textNickName: cc.Label = null;
    _textCoin: cc.Label = null;
    _selfHeadBg: cc.Node = null;
    _selfCoin: cc.Sprite = null;
    _otherPlayerHeads: OtherPlayerHead[] = [];

    _leftPlayerPanel: cc.Node = null;
    _rightPlayerPanel: cc.Node = null;

    _heroBoy: cc.Sprite = null;	//牛仔
    _heroCow: cc.Sprite = null;	//小牛

    // 动画
    _nodeAnim: cc.Node = null;	// 动态动画节点
    _timelineNodeAnim: cc.Node = null;	// 动画节点

    _roundStartAnim: cc.Node = null;
    _roundStartAction: cc.Animation = null;
    _fightBeginAnim: cc.Node = null;
    _fightBeginAction: cc.Animation = null;
    _fightEndAnim: cc.Node = null;
    _fightEndAction: cc.Animation = null;
    _waitForNextRoundAnim: cc.Node = null;
    _waitForNextRoundAction: cc.Animation = null;
    _effNode: cc.Node = null;
    _prizeAnim: cc.Node = null;
    _prizeAction: cc.Animation = null;
    _prizeActionIndex: number = 0;

    _winFlagAnims: cc.Node[] = [];
    _winFlagActions: cc.Animation[] = [];

    // 游戏提示语
    _gameTipsBg: cc.Sprite = null;
    _textGameTips: cc.Label = null;

    // 牛仔中奖信息
    _rewardPanel: cc.Node = null;
    _rewardTips: cc.RichText = null;
    _rewardPanel_width: number = 0;

    // 历史纪录 新手提示
    _recordDotsTemp: cc.Sprite[] = [];
    // 历史纪录
    _recordDots: cc.Sprite[] = [];
    _oriRecordDotsPos: cc.Vec2[] = [];
    _lastRecordDotWorldPos: cc.Vec2 = new cc.Vec2(0, 0);	// 显示的最后一个球的世界坐标
    _recordNum: number = 12;	// 历史纪录的数量

    _humanboyGuid: cc.Node = null;																                            // 引导面板
    _humanboyMenu: cc.Node = null;																                            // 菜单面板
    _humanboyAdvancedSetting: cc.Node = null;										                                        // 高级设置面板
    _humanboyAdvancedAuto: cc.Node = null;												                                    // 高级续投面板
    _eAutoBtnStyle: number = MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NONE;		                                    // 续投按钮样式

    _cowboyChart: cc.Node = null;
    _cowboyExchange: HumanboyExchange = null;
    _cowboyRule: cc.Node = null;
    _cowboySetting: cc.Node = null;
    _cowboyExit: cc.Node = null;
    _cowboyList: cc.Node = null;
    //  _cowboyList: CowboyList = null;
    // Chart * this._chart = null;
    // CowboyMilitary * _minitary = null;
    // Dznzsetting * _dznzsetting = null;
    // Dznzexit * _dznzexit = null;
    // _rule: CowboyRule = null;

    // toast
    _toastNode: cc.Node = null;

    _HEAD_IMG_TAG: string = "cowboy_head_tag";

    _openIphoneXAdapter: boolean = true;	// iPhoneX适配开关
    _leftTime: number = 0;

    private _btn_redpacket_festival: cc.Node = null;                                                                            // 红包节按钮
    private _btn_redpacket_festival_layer: cc.Node = null;                                                                      // 红包节按钮提示层
    private _luckButton: LuckTurntablesButton = null;                                                                           // 红包节实例

    // 音效/背景音乐
    s_cowboyBGM: string = "zh_CN/game/cowboy/audio/back";	// 1背景
    s_kaipai: string = "zh_CN/game/cowboy/audio/kaipai";	// 2发牌、开牌
    s_fapai: string = "zh_CN/game/cowboy/audio/fapai";	// 2发牌、开牌
    s_chuzhan_kaizhan: string = "zh_CN/game/cowboy/audio/half_time";	// 3出站开战时间提示
    s_betin: string = "zh_CN/game/cowboy/audio/chip";	// 4投金币
    s_betin_many: string = "zh_CN/game/cowboy/audio/hechip";	// 4投金币
    s_win_lose: string = "zh_CN/game/cowboy/audio/bx_getCoin";	// 5输赢
    s_get_win_coin: string = "zh_CN/game/cowboy/audio/bigying";	// 6收金币
    s_button: string = "zh_CN/game/cowboy/audio/press";	// 6收金币
    s_time_tick: string = "zh_CN/game/cowboy/audio/time";	// 时间
    s_begin_bet: string = "zh_CN/game/cowboy/audio/begin_bet";	// 开始下注
    s_end_bet: string = "zh_CN/game/cowboy/audio/end_bet";	// 停止下注
    s_special_card_type: string = "zh_CN/game/cowboy/audio/special_card_type_big";	// 特殊牌型音效
    public silenceMusic: string = "zh_CN/game/dzpoker/audio/silence2";

    _waitForNextRoundOutTheshould: number = 2;	// 剩余时间小于此值播放退出动画

    // 新进房间动画节奏时间
    _betCountDownEndDuration: number = 0.3;
    _fightEndDuration: number = 1.05;
    _showHandCardsDuration: number = 1.0;
    _showPublicCardsDuration: number = 1.5;
    _hideLoseBetCoinsDuration: number = 1.5;
    _specialCardTypeDuration: number = 8;	// 特殊牌型动画时间,在显示win动画之前
    _betWinFlagsAndFlyCoinsDuration: number = 2.7;
    _showNextRoundDuration: number = 3;

    AREA_SIZE: number = 10;
    trend_anim: cc.AnimationClip = null;

    _coinNode: cc.Node = null;
    _coinNodeByArea: Array<Array<cc.Node>> = [];
    _circlePool: cc.NodePool = new cc.NodePool();
    _squarePool: cc.NodePool = new cc.NodePool();

    _areaCoinMax: number[] = [200, 200, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    _isAddEvent: boolean = false;

    _mapWayOutInfo: HashMap<number, tCowboyWayOutInfo> = new HashMap();				// 路单结构信息数组
    _fActExecute_WayOut: number = 1.0;																                          // 显示路子动画 执行时间

    _cowWinAnim: cc.Node = null;				// 牛赢动画
    _cowWinAction: cc.Animation = null;
    _fActExecute_CowWin: number = 3.0;

    _cowLoseAnim: cc.Node = null;				// 牛输动画
    _cowLoseAction: cc.Animation = null;
    _fActExecute_CowLose: number = 3.0;

    _boyWinAnim: cc.Node = null;				// 牛仔赢动画
    _boyWinAction: cc.Animation = null;
    _fActExecute_BoyWin: number = 3.0;

    _boyLoseAnim: cc.Node = null;				// 牛仔输动画
    _boyLoseAction: cc.Animation = null;
    _fActExecute_BoyLose: number = 3.0;
    _vCoinOptimizationDeque: Deque<PlayerOneBet> = new Deque();

    private _msInterval: number = 1;                                                                                            // 定时器间隔(单位: 秒)
    private _msNowTime: number = 0;								                                                                // 当前时间
    private _msLastTime: number = 0;							                                                                // 上次时间
    private _nLeftTime: number = 0;								                                                                // 剩余时间
    private _nMinTime: number = 0;                                                                                              // 最小时间
    private _isIpad: boolean = false;
    private _isEnterBackground: boolean = false;
    private _effectMap: HashMap<string, effectLoop> = new HashMap();
    private _isViewX: boolean = false;
    private _bSwitchTable: boolean = false;
    onLoad() {
        this.language_PLIST = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        cv.config.setCurrentScene(cv.Enum.SCENE.COWBOY_SCENE);
        cv.config.adaptScreenHen(this.node);

        cv.resMgr.adaptWidget(this.node, true);
        // layer.initScent();  未处理
        cv.pushNotice.hideNoticeLayer();

        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            cc.find("bottomPanel/self_panel/btn_shop_valid", this.node).active = false;
        }
    }

    // on "init" you need to initialize your instance
    start() {
        if (cv.SHOP && cv.SHOP.msgNode) cv.SHOP.msgNode.active = false;
        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_COWBOY);
        cb.addPlist("game_dznz_PLIST", this.game_dznz_PLIST);
        cb.addPlist("special_card_type_PLIST", this.special_card_type_PLIST);
        cb.addPlist("cowboy_trend_anim_PLIST", this.cowboy_trend_anim_PLIST);
        cb.addPlist("chart_PLIST", this.chart_PLIST);
        cb.addPlist("language_PLIST", this.language_PLIST);
        cb.addPlist("en_animation_PLIST", this.en_animation_PLIST);

        this._gameContent = (this.node.getChildByName("game_content"));
        // let contentWidget = this._gameContent.getComponent(cc.Widget);
        // if (cv.config.IS_WIDESCREEN) {
        //     contentWidget.left = 0;
        //     contentWidget.right = 0;
        // }
        // else {
        //     contentWidget.top = 0;
        //     contentWidget.bottom = 0;
        // }
        // cv.resMgr.adaptWidget(this._gameContent, true);

        this._bottomPanel = (this.node.getChildByName("bottomPanel"));
        console.log("this._bottomPanel.position = " + this._bottomPanel.position);

        this._heroBoy = cc.find("node_boy/img", this._gameContent).getComponent(cc.Sprite);
        this._heroCow = cc.find("node_cow/img", this._gameContent).getComponent(cc.Sprite);

        // 暂时不要提示
        this._gameTipsBg = (this.node.getChildByName("game_tips_bg")).getComponent(cc.Sprite);
        this._textGameTips = (this._gameTipsBg.node.getChildByName("text_game_tips")).getComponent(cc.Label);
        this._gameTipsBg.node.active = false;

        // 牛仔中奖信息
        this._rewardPanel = (this.node.getChildByName("rewardPanel"));
        this._rewardPanel_width = this._rewardPanel.width;
        this._rewardTips = (this._rewardPanel.getChildByName("notice_text")).getComponent(cc.RichText);
        this._rewardPanel.active = false;

        this._panel_betbtn = (this._bottomPanel.getChildByName("panel_betbtn"));

        this._coinNode = new cc.Node();
        this.node.addChild(this._coinNode, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_COIN_NODE);
        this._coinNode.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);

        this._nodeAnim = new cc.Node();
        this.node.addChild(this._nodeAnim, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_ANIM_NODE);
        this._nodeAnim.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);


        this._timelineNodeAnim = new cc.Node();
        this.node.addChild(this._timelineNodeAnim, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TIMELINE_NODE);
        this._timelineNodeAnim.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);

        this.initTimelineAnims();
        this.initCowboyAnims();
        this.initCowboyToastNode();
        this.initButtonEvents();
        this.initCards();
        this.initBetArea();
        this.initBetButtons();
        this.initBetCountDown();
        this.initPlayersInfo();
        this.initHistoryDots();

        this.adaptiveScreen();                          // iPad/iPhoneX等宽窄屏适配
        this.initRedPackage();                          // 初始化红包按钮入口
        this.adaptiveBetBtnPanel();                     // 适配下注按钮面板布局

        this.initWinFlagAnims();
        this.initTrendChangeAnim();
        this.initGuide();
        this.initChart();

        this.clearRound();                              // 清除场景动态信息
        this.betButtonSelected(0, true);	            // 默认第一个按钮选中

        this.playCowboyBGM();

        cv.viewAdaptive.isselfchange = false;
        cv.viewAdaptive.cowboyroomid = 0;
        cv.MessageCenter.register("on_cowboy_gamedata_syn_notify", this.OnGameDataSynNotify.bind(this), this.node);
        cv.MessageCenter.register("on_update_trend_notify", this.OnTrendUpdate.bind(this), this.node);
        cv.MessageCenter.register("on_update_playerlist_notify", this.OnPlayerListUpdate.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_sound_switch_notify", this.OnSoundSwitchNotify.bind(this), this.node);
        cv.MessageCenter.register("on_selfinfo_notify", this.OnSelfInfo.bind(this), this.node);
        cv.MessageCenter.register("showMedalMsg", this.OnCowboyRewardTips.bind(this), this.node);
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
        // cv.MessageCenter.register("UserPointsChangeNotice", this.UserPointsChangeNotice.bind(this), this.node);

        // 重发 JoinRoom 消息, 同步场景UI
        cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
        cv.roomManager.RequestJoinRoom();
    }

    onDestroy() {
        this.cleanData();
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
            this.OnSoundSwitchNotify();
        } else {
            if (!cv.tools.isPlayMusic()) {
                cv.AudioMgr.stop(cv.AudioMgr.getAudioID(this.silenceMusic));
            }
        }
        //}

        this._isEnterBackground = false;
    }

    protected update(dt: number): void {
        if (this._vCoinOptimizationDeque.size() <= 0) return;
        this._updateCoinOptimization(dt);
    }

    /**
     * 刷新"金币最优队列"(每帧创建, 稳定帧率)
     */
    private _updateCoinOptimization(dt: number): void {
        let nTotalCount: number = this._vCoinOptimizationDeque.size();
        if (nTotalCount <= 0) return;

        if (cb.getCowboyRoom().curState === cowboy_proto.RoundState.BET && this._leftTime > 0) {
            let nCount: number = 0;

            // 剩余时间 > 1s 逐帧喷吐金币
            if (this._leftTime > 1) {
                nCount = nTotalCount / cc.game.getFrameRate();
                nCount = Math.ceil(nCount);
            }
            // 否则, 一次性喷吐剩余金币(弥补金币数量多、卡帧导致喷吐金币不完整的情况)
            else {
                nCount = nTotalCount;
            }

            // console.log(cv.StringTools.formatC("CowboyGame_Coin: sec = %02d, dt = %05f, total = %05f, count = %05f", this._getLeftTime(), dt, nTotalCount, nCount));

            for (let i = 0; i < nCount; ++i) {
                let t: PlayerOneBet = this._vCoinOptimizationDeque.pop_front();
                this.showBetInAnim(t);
            }
        }
        else {
            // 更新剩余的金币数等(在卡帧情况下, 计时误差等情况下, 飞金币被强行停止, 但数据要保持最新, 因为这是一个逐帧队列, 不是及时更新)
            for (let i = 0; i < nTotalCount; ++i) {
                let t: PlayerOneBet = this._vCoinOptimizationDeque.pop_front();
                this.updatePlayerCoin(t.uid);
                this.updateBetArea(t.betOption);
            }

            // 清除队列
            this._vCoinOptimizationDeque.clear();
        }
    }

    // void  onEnterTransitionDidFinish()
    // {

    // }

    // void  onForeground()
    // {

    // }
    // void  onBackground()
    // {

    // }

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

    ingorePutInQuenue(path: string) {
        //私语平台，开始下注，停止下注不放在队列播放
        if (path != this.s_begin_bet && path != this.s_end_bet && path != this.s_win_lose && path != this.s_special_card_type && path != this.s_time_tick) {
            return true;
        }

        return false;
    }

    playCowboyEffect(path: string): void {
        if (cv.tools.isSoundEffectOpen() && this._isEnterBackground == false) {

            //
            if (cc.sys.isBrowser && this.ingorePutInQuenue(path)) {
                this.playEffectForPath(path);
            } else {
                cv.AudioMgr.playEffect(path);
            }
        }
    }

    playCowboyBGM(): void {
        if (cv.tools.isPlayMusic()) {
            cv.AudioMgr.playMusic(this.s_cowboyBGM, true);
            //        SimpleAudioEngine.getInstance().playBackgroundMusic(s_cowboyBGM.c_str(), true);
        }
    }

    stopCowboyBGM(): void {
        cv.AudioMgr.stopMusic();
        //SimpleAudioEngine.getInstance().stopBackgroundMusic();
    }

    backToCowboyListScene(): void {
        cb.getCowboyRoom().Reset();
        cv.netWorkManager.closeGameConnect();

        cv.viewAdaptive.isselfchange = false;
        cv.viewAdaptive.cowboyroomid = 0;

        // 回到牛仔房间列表界面
        cv.roomManager.reset();
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
            cv.MessageCenter.send("switchSceneToMiniGame");
        });
    }

    cleanData(): void {
        cv.MessageCenter.unregister("on_cowboy_gamedata_syn_notify", this.node);
        cv.MessageCenter.unregister("on_update_trend_notify", this.node);
        cv.MessageCenter.unregister("on_update_playerlist_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_sound_switch_notify", this.node);
        cv.MessageCenter.unregister("on_selfinfo_notify", this.node);
        cv.MessageCenter.unregister("showMedalMsg", this.node);
        cv.MessageCenter.unregister("goldViewShop", this.node);

        cv.MessageCenter.unregister("on_cowboy_game_round_end_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_deal_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_start_bet_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_bet_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_auto_bet_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_auto_bet_notify_handle_over", this.node);
        cv.MessageCenter.unregister("on_cowboy_leave_room_succ", this.node);
        cv.MessageCenter.unregister("on_cowboy_auto_bet_succ", this.node);
        cv.MessageCenter.unregister("on_cowboy_room_param_change_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_server_error", this.node);
        cv.MessageCenter.unregister("on_cowboy_kick_notify", this.node);
        cv.MessageCenter.unregister("on_cowboy_join_room_failed", this.node);
        cv.MessageCenter.unregister("showShopPanel", this.node);

        cv.MessageCenter.unregister("showLuckButton", this.node);
        cv.MessageCenter.unregister("turntableResultNotice", this.node);

        cv.MessageCenter.unregister("update_gold", this.node);
        cv.MessageCenter.unregister("on_cowboy_bet_amount_level_change", this.node);
        cv.MessageCenter.unregister("on_cowboy_advance_autobet_set", this.node);
        cv.MessageCenter.unregister("on_cowboy_advance_autobet", this.node);
        cv.MessageCenter.unregister("on_cowboy_advance_autobet_cancel", this.node);
        cv.MessageCenter.unregister("onNoticeOpenCalmDownWindow", this.node);
        cv.MessageCenter.unregister("onCalmDownMsg", this.node);
        

        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        } else {
            cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }
        //   cv.MessageCenter.unregister("UserPointsChangeNotice", this.node);

        this.stopCowboyBGM();
        this.unschedule(this.onLeftTimeUpdate);

        // 清除路单数组信息
        this._clearWayOutInfo();
    }

    backToMainScene(backToMainTips?: string): void {
        backToMainTips = backToMainTips == undefined ? "" : backToMainTips;

        cv.netWorkManager.closeGameConnect();
        cb.getCowboyRoom().backToMainTips = backToMainTips;

        // 回到大厅
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }

    // 清除场景动态信息
    clearRound(): void {
        this.hideAllWinPlayerLightAnim();
        this.hideAllCardsAndCardType();
        this.hideWinCards();
        this.clearAllBetArea();
        this.hideBetCountDown();
        this.showCowboyNormalAnim();
        this._nodeAnim.destroyAllChildren();
        this._nodeAnim.removeAllChildren(true);
        this._nodeAnim.stopAllActions();
        this.hideAllTimelineAnims();
        this.hideGameTips();
        this.hideHistoryMoveAnim();
        this.resetPointAni();
        // this._hideWayOutMoveAnim();
        this.hideTrendChangeAnim();
        // clearAllCowboyToasts();
    }

    // /* 牌型：（redLevel/blueLevel）
    // 皇家同花顺：10
    // 同花顺    ：9
    // 四条      ：8
    // 葫芦      ：7
    // 同花      ：6
    // 顺子      ：5
    // 三条      ：4
    // 两对      ：3
    // 一对      ：2
    // 高牌      ：1
    // */
    initCards(): void {
        this._cardPanel = (this._gameContent.getChildByName("public_card_panel"));
        this._oriRedHandCards.push((this._cardPanel.getChildByName("handcard_red_0")).getComponent(cc.Sprite));
        this._oriRedHandCards.push((this._cardPanel.getChildByName("handcard_red_1")).getComponent(cc.Sprite));
        this._oriBlueHandCards.push((this._cardPanel.getChildByName("handcard_blue_0")).getComponent(cc.Sprite));
        this._oriBlueHandCards.push((this._cardPanel.getChildByName("handcard_blue_1")).getComponent(cc.Sprite));
        for (let i = 0; i < 2; i++) {
            let RedHandpos: cc.Vec2 = cc.v2(this._oriRedHandCards[i].node.getPosition());
            let BlueHandpos: cc.Vec2 = cc.v2(this._oriBlueHandCards[i].node.getPosition());
            this._oriRedHandCardsPos.push(RedHandpos);
            this._oriBlueHandCardsPos.push(BlueHandpos);
            this._redHandCards.push(CowboyCard.create());
            this._blueHandCards.push(CowboyCard.create());
            this._redHandCards[i].ResetFromNode(this._oriRedHandCards[i].node);
            this._blueHandCards[i].ResetFromNode(this._oriBlueHandCards[i].node);
        }

        for (let i = 0; i < 5; i++) {
            this._oriPublicCards.push((this._cardPanel.getChildByName(cv.StringTools.formatC("handcard_%d", i))).getComponent(cc.Sprite));
            let pos: cc.Vec2 = cc.v2(this._oriPublicCards[i].node.getPosition());
            this._oriPublicCardsPos.push(pos);
            this._publicCards.push(CowboyCard.create());
            this._publicCards[i].ResetFromNode(this._oriPublicCards[i].node);
        }

        this._redCardType = (this._cardPanel.getChildByName("red_card_type")).getComponent(cc.Sprite);
        this._blueCardType = (this._cardPanel.getChildByName("blue_card_type")).getComponent(cc.Sprite);
        this._redCardTypeBg = (this._cardPanel.getChildByName("red_card_type_bg")).getComponent(cc.Sprite);
        this._blueCardTypeBg = (this._cardPanel.getChildByName("blue_card_type_bg")).getComponent(cc.Sprite);
        this._redCardTypeBg.node.zIndex = (1);
        this._blueCardTypeBg.node.zIndex = (1);
        this._redCardType.node.zIndex = (2);
        this._blueCardType.node.zIndex = (2);

        this._mapLevelCardTypeImage.add(1, "gaopai");
        this._mapLevelCardTypeImage.add(2, "yidui");
        this._mapLevelCardTypeImage.add(3, "liangdui");
        this._mapLevelCardTypeImage.add(4, "santiao");
        this._mapLevelCardTypeImage.add(5, "shunzi");
        this._mapLevelCardTypeImage.add(6, "tonghua");
        this._mapLevelCardTypeImage.add(7, "hulu");
        this._mapLevelCardTypeImage.add(8, "jingang");
        this._mapLevelCardTypeImage.add(9, "tonghuashun");
        this._mapLevelCardTypeImage.add(10, "huangtong");
    }

    hideAllCardsAndCardType(): void {
        this.setAllCardsVisible(false);

        this._redCardType.node.active = false;
        this._blueCardType.node.active = false;
        this._redCardTypeBg.node.active = false;
        this._blueCardTypeBg.node.active = false;
    }

    setAllHandCardsVisible(visible: boolean): void {
        for (let i = 0; i < 2; i++) {
            this._redHandCards[i].node.active = (visible);
            this._blueHandCards[i].node.active = (visible);
            this._redHandCards[i].node.stopAllActions();
            this._blueHandCards[i].node.stopAllActions();
            this._redHandCards[i].unscheduleAllCallbacks();
            this._blueHandCards[i].unscheduleAllCallbacks();
            if (visible) {
                this._redHandCards[i].node.setPosition(this._oriRedHandCardsPos[i]);
                this._blueHandCards[i].node.setPosition(this._oriBlueHandCardsPos[i]);
            }
        }
    }

    setAllPublicCardsVisible(visible: boolean): void {
        for (let i = 0; i < 5; i++) {
            this._publicCards[i].node.active = (visible);
            this._publicCards[i].node.stopAllActions();
            this._publicCards[i].unscheduleAllCallbacks();
            if (visible) {
                this._publicCards[i].node.setPosition(this._oriPublicCardsPos[i]);
            }
        }
    }

    setAllCardsVisible(visible: boolean): void {
        this.setAllHandCardsVisible(visible);
        this.setAllPublicCardsVisible(visible);
    }

    // 直接更新牌：公共牌、手牌
    updateAllCardsBack(): void {
        for (let i = 0; i < 2; i++) {
            this._redHandCards[i].SetFace(false);
            this._blueHandCards[i].SetFace(false);
        }

        for (let i = 0; i < 5; i++) {
            this._publicCards[i].SetFace(false);
        }
    }

    // 直接更新牌：公共牌、手牌
    updateCards(): void {
        // update cards
        this.setAllCardsVisible(true);

        // 更新所有背面牌
        this.updateAllCardsBack();

        // 更新所有正面牌
        if (cb.getCowboyRoom().redHandCards.length == 2 && cb.getCowboyRoom().blueHandCards.length == 2) {
            for (let i = 0; i < 2; i++) {
                this._redHandCards[i].SetContent((cb.getCowboyRoom().redHandCards[i].number), (cb.getCowboyRoom().redHandCards[i].suit));
                this._blueHandCards[i].SetContent((cb.getCowboyRoom().blueHandCards[i].number), (cb.getCowboyRoom().blueHandCards[i].suit));
                this._redHandCards[i].SetFace(true);
                this._blueHandCards[i].SetFace(true);
            }
        }

        let publicCardNum = cb.getCowboyRoom().publicCards.length;
        if (publicCardNum == 1) {
            console.log("1111111111-》publicCardNum == 1");
            return;
        }
        for (let i = 0; i < 5; i++) {
            if (i < publicCardNum) {
                this._publicCards[i].SetContent((cb.getCowboyRoom().publicCards[i].number), (cb.getCowboyRoom().publicCards[i].suit));
                this._publicCards[i].SetFace(true);
            }
        }
    }

    // 直接更新牌型
    updateCardType(): void {
        this._redCardType.node.active = (true);
        this._blueCardType.node.active = (true);
        this._redCardTypeBg.node.active = (true);
        this._blueCardTypeBg.node.active = (true);
        let redCardTypeImage = this._mapLevelCardTypeImage.get(cb.getCowboyRoom().redLevel);
        let blueCardTypeImage = this._mapLevelCardTypeImage.get(cb.getCowboyRoom().blueLevel);

        // 0 平 1 牛仔胜 -1 小牛胜
        if (cb.getCowboyRoom().result == 0) {
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardType, (redCardTypeImage + ""));
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardType, (blueCardTypeImage + ""));
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardTypeBg, "win_cardtype_bg");
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardTypeBg, "win_cardtype_bg");
        }
        else if (cb.getCowboyRoom().result == 1) {
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardType, (redCardTypeImage + ""));
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardType, (blueCardTypeImage + "_gray"));
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardTypeBg, "win_cardtype_bg");
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardTypeBg, "lose_cardtype_bg");
        }
        else if (cb.getCowboyRoom().result == -1) {
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardType, (redCardTypeImage + "_gray"));
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardType, (blueCardTypeImage + ""));
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardTypeBg, "lose_cardtype_bg");
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardTypeBg, "win_cardtype_bg");
        }
    }

    updateWinCards(): void {
        // 先全部置灰
        for (let i = 0; i < 2; i++) {
            this._redHandCards[i].Gray(true);
            this._blueHandCards[i].Gray(true);
        }
        for (let i = 0; i < 5; i++) {
            this._publicCards[i].Gray(true);
        }

        // 高亮赢的5张牌
        let winCardNum = cb.getCowboyRoom().winCards.length;
        for (let i = 0; i < winCardNum; i++) {
            let winCard = cb.getCowboyRoom().winCards[i];
            let isFind = false;
            for (let j = 0; j < 2; j++) {
                if (this._redHandCards[j].GetNumber() == winCard.number && this._redHandCards[j].GetSuit() == winCard.suit) {
                    this._redHandCards[j].Gray(false);
                    isFind = true;
                    break;
                }

                if (this._blueHandCards[j].GetNumber() == winCard.number && this._blueHandCards[j].GetSuit() == winCard.suit) {
                    this._blueHandCards[j].Gray(false);
                    isFind = true;
                    break;
                }
            }

            if (!isFind) {
                for (let j = 0; j < 5; j++) {
                    if (this._publicCards[j].GetNumber() == winCard.number && this._publicCards[j].GetSuit() == winCard.suit) {
                        this._publicCards[j].Gray(false);
                        isFind = true;
                        break;
                    }
                }
            }
        }
    }

    hideWinCards(): void {
        for (let i = 0; i < 2; i++) {
            this._redHandCards[i].Gray(false);
            this._blueHandCards[i].Gray(false);
        }
        for (let i = 0; i < 5; i++) {
            this._publicCards[i].Gray(false);
        }
    }

    updateWinFlags(): void {
        let arr = cb.getCowboyRoom().matchOption;
        let len = arr.length;
        // 显示win标记/隐藏区域数字和金币
        for (let i = 0; i < len; i++) {
            let areaIdx = this.getAreaIdxByBetOption(arr[i]);
            this.clearBetArea(areaIdx);
            this.hideWinFlagAnim(areaIdx);
            //this._sprBetAreaWinFlags[areaIdx]..node.active = (true);
            this.showWinFlagAnim(areaIdx);
        }
    }

    hideWinFlags(): void {
        let len = this._winFlagAnims.length;
        for (let i = 0; i < len; i++) {
            this.hideWinFlagAnim(i);
            this._sprBetAreaWinFlags[i].node.active = false;
        }
    }

    initCowboyToastNode(): void {
        this._toastNode = new cc.Node();
        this.node.addChild(this._toastNode);
        this._toastNode.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
        this._toastNode.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);
    }

    showCowboyToast(text: string): void {
        let toastBg = (new cc.Node()).addComponent(cc.Sprite);
        cv.resMgr.setSpriteFrame(toastBg.node, "zh_CN/game/cowboy/cowboy_tips_bg");
        // cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, toastBg, "");
        // toastBg.node.setPosition(cv.config.WIDTH, cv.config.HEIGHT / 2);
        this._toastNode.addChild(toastBg.node);

        let textToast = (new cc.Node()).addComponent(cc.Label);
        textToast.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textToast.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textToast.fontSize = (45);
        textToast.lineHeight = 45 * 2;
        //textToast.setColor(Color3B.WHITE);
        textToast.node.color = (cc.color(140, 204, 156));
        // textToast.node.setPosition(toastBg.node.width / 2, toastBg.node.height / 2);
        textToast.string = (text);
        toastBg.node.addChild(textToast.node);

        toastBg.node.runAction(cc.sequence(cc.delayTime(0.1), cc.moveBy(1.0, cc.v2(0, 120))));
        toastBg.node.runAction(cc.sequence(cc.delayTime(0.4), cc.fadeOut(0.8).easing(cc.easeInOut(1.0)), cc.destroySelf()));
    }

    clearAllCowboyToasts(): void {
        this._toastNode.destroyAllChildren();
        this._toastNode.removeAllChildren(true);
    }

    onLeftTimeUpdate(f32Delta: number): void {
        this._leftTime--;
        this._leftTime = this._leftTime < 0 ? 0 : this._leftTime;
    }

    resetLeftTimer(): void {
        this._leftTime = cb.getCowboyRoom().leftSeconds;
        this.unschedule(this.onLeftTimeUpdate);
        this.schedule(this.onLeftTimeUpdate, 1.0);
    }

    /////////////////animation begin//////////////////
    initTimelineAnims(): void {

        // 开局动画
        this._roundStartAnim = this.initAni(this._timelineNodeAnim, this.round_start_prefab);
        this._roundStartAction = this._roundStartAnim.getComponent(cc.Animation);
        // this._roundStartAnim.runAction(this._roundStartAction);

        // // 出战动画
        this._fightBeginAnim = this.initAni(this._timelineNodeAnim, this.fight_begin_prefab);
        this._fightBeginAction = this._fightBeginAnim.getComponent(cc.Animation);
        // this._fightBeginAnim.runAction(this._fightBeginAction);

        // // 开战动画
        this._fightEndAnim = this.initAni(this._timelineNodeAnim, this.fight_end_prefab);
        this._fightEndAction = this._fightEndAnim.getComponent(cc.Animation);
        // this._fightEndAnim.runAction(this._fightEndAction);

        // // 等待下一局动画
        this._waitForNextRoundAnim = this.initAni(this._timelineNodeAnim, this.wait_for_next_round_prefab);
        this._waitForNextRoundAction = this._waitForNextRoundAnim.getComponent(cc.Animation);
        // this._waitForNextRoundAnim.runAction(this._waitForNextRoundAction);

    }

    initAni(parent: cc.Node, ani_prefab: cc.Prefab): cc.Node {
        let node = cc.instantiate(ani_prefab);
        // node.setPosition(cv.config.WIDTH / 2, cv.config.HEIGHT / 2);
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            let prefabArr: cc.Prefab[] = [this.fight_begin_prefab, this.fight_end_prefab, this.wait_for_next_round_prefab];
            let imgPthArr: string[] = ["CZ", "KZ", "xyj"];
            let prefabLen = prefabArr.length;

            for (let i = 0; i < prefabLen; i++) {
                if (ani_prefab == prefabArr[i]) {
                    cb.loadSpriteTextureByPlist(this.en_animation_PLIST, cc.find("CZ_2", node).getComponent(cc.Sprite), imgPthArr[i]);
                    break;
                }
            }
        }
        node.active = false;
        parent.addChild(node);
        return node;
    }

    initWinFlagAnims(): void {
        let len = this._sprBetAreaWinFlags.length;
        // win旗子动画
        for (let i = 0; i < len; i++) {
            /*let betOption = this.getBetOptionByAreaIdx(i);
            if (betOption == cowboy_proto.HOLE_A || betOption == cowboy_proto.FIVE_KING_TONG_HUA_SHUN_4)
            {
                let winAnim = CSLoader.createNode("cowboy/animation/win_flag/win_flag.csb");
                winAnim.setPosition(this._sprBetAreaWinFlags[i].getPosition() + Vec2(0, -180));
                winAnim.active = false;
                this._sprBetAreaWinFlags[i].getParent().addChild(winAnim);
                let winAction = CSLoader.createTimeline("cowboy/animation/win_flag/win_flag.csb");
                winAnim.runAction(winAction);

                this._winFlagAnims.push(winAnim);
                this._winFlagActions.push(winAction);
            }
            else
            {*/
            let winNode = this._sprBetAreaWinFlags[i].node;
            let winAnim: cc.Node = this.initAni(this.node, this.win_flag_prefab);
            let winAction: cc.Animation = winAnim.getComponent(cc.Animation);
            winAnim.zIndex = COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_ANIM_NODE;
            winAnim.setPosition(winAnim.parent.convertToNodeSpaceAR(winNode.parent.convertToWorldSpaceAR(cc.v2(0 + winNode.x, -180 + winNode.y))));

            this._winFlagAnims.push(winAnim);
            this._winFlagActions.push(winAction);
            //}
        }
    }

    showWinFlagAnim(areaIdx: number): void {
        let betOption = this.getBetOptionByAreaIdx(areaIdx);
        //if (betOption == cowboy_proto.HOLE_A || betOption == cowboy_proto.FIVE_KING_TONG_HUA_SHUN_4)
        //{
        //	// 胜利牌型
        //	// 0 平 1 牛仔胜 -1 小牛胜
        //	SEInt32 winLevel;
        //	if (cb.getCowboyRoom().result == 0)
        //	{
        //		winLevel = cb.getCowboyRoom().redLevel;
        //	}
        //	else if (cb.getCowboyRoom().result == 1)
        //	{
        //		winLevel = cb.getCowboyRoom().redLevel;
        //	}
        //	else if (cb.getCowboyRoom().result == -1)
        //	{
        //		winLevel = cb.getCowboyRoom().blueLevel;
        //	}
        //	
        //	std.string winAnimCsb;
        //	if (betOption == cowboy_proto.HOLE_A)	// 对A
        //	{
        //		winAnimCsb = "cowboy/animation/win_flag_special_1/win_flag_special_1.csb";
        //	}
        //	else if(winLevel == 8)	// 金刚
        //	{
        //		winAnimCsb = "cowboy/animation/win_flag_special_2/win_flag_special_2.csb";
        //	}
        //	else if (winLevel == 9)	// 同花顺
        //	{
        //		winAnimCsb = "cowboy/animation/win_flag_special_3/win_flag_special_3.csb";
        //	}
        //	else if (winLevel == 10)	// 皇家同花顺
        //	{
        //		winAnimCsb = "cowboy/animation/win_flag_special_4/win_flag_special_4.csb";
        //	}
        //	else
        //	{
        //		console.log("showWinFlagAnim, show special win anim error");
        //		return;
        //	}

        //	 winAnimParent = this._sprBetAreaWinFlags[areaIdx].getParent();
        //	winAnimParent.removeChildByName("special_win_anim");
        //	let winAnim = CSLoader.createNode(winAnimCsb);
        //	winAnim.setPosition(this._sprBetAreaWinFlags[areaIdx].getPosition());
        //	winAnim.setName("special_win_anim");
        //	winAnimParent.addChild(winAnim);
        //	let winAction = CSLoader.createTimeline(winAnimCsb);
        //	winAnim.runAction(winAction);
        //	winAction.gotoFrameAndPlay(0, 146, true);
        //}
        //else
        //{
        this._winFlagAnims[areaIdx].active = (true);
        this.gotoFrameAndPlay(this._winFlagActions[areaIdx], 0, 145, true);
        //}
    }

    hideWinFlagAnim(areaIdx: number): void {
        //this._winFlagAnims[areaIdx].getParent().removeChildByName("special_win_anim");
        if (areaIdx >= cv.StringTools.getArrayLength(this._winFlagAnims)) return;
        this._winFlagAnims[areaIdx].active = false;
        this.gotoFrameZeroAndPause(this._winFlagActions[areaIdx]);
    }

    showSpecialCardTypeAnim(stayLastFrame?: boolean, lastDuration?: number): void {
        stayLastFrame = stayLastFrame == true ? true : false;
        lastDuration = lastDuration == undefined ? 0 : lastDuration;
        this.clearSpecialCardTypeAnim();
        if (!this.isResultSpecialCardType()) return;

        let specialBetOption = -1;

        // 优先判断：金刚/同花顺/皇家
        let matchArr = cb.getCowboyRoom().matchOption;
        let matchLen = matchArr.length;
        for (let i = 0; i < matchLen; i++) {
            let areaIdx = this.getAreaIdxByBetOption(matchArr[i]);
            let betOption = this.getBetOptionByAreaIdx(areaIdx);

            if (betOption == cb.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {
                specialBetOption = betOption;
                break;
            }
        }
        if (specialBetOption < 0) {
            let matchArr = cb.getCowboyRoom().matchOption;
            let matchLen = matchArr.length;
            for (let i = 0; i < matchLen; i++) {
                let areaIdx = this.getAreaIdxByBetOption(matchArr[i]);
                let betOption = this.getBetOptionByAreaIdx(areaIdx);

                if (betOption == cb.Enum.BetZoneOption.HOLE_A) {
                    specialBetOption = betOption;
                    break;
                }
            }
        }

        if (specialBetOption < 0) return;

        // 胜利牌型
        // 0 平 1 牛仔胜 -1 小牛胜
        let winLevel: number = 0;
        if (cb.getCowboyRoom().result == 0) {
            winLevel = cb.getCowboyRoom().redLevel;
        }
        else if (cb.getCowboyRoom().result == 1) {
            winLevel = cb.getCowboyRoom().redLevel;
        }
        else if (cb.getCowboyRoom().result == -1) {
            winLevel = cb.getCowboyRoom().blueLevel;
        }

        let specialCardType = "";
        let specialCardOdd = "";
        if (specialBetOption == cb.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {
            if (winLevel == 8)	// 金刚
            {
                specialCardType = "special_jingang";
                specialCardOdd = "special_card_odd_248";
            }
            else if (winLevel == 9)	// 同花顺
            {
                specialCardType = "special_tonghuashun";
                specialCardOdd = "special_card_odd_248";
            }
            else if (winLevel == 10)	// 皇家同花顺
            {
                specialCardType = "special_huangtong";
                specialCardOdd = "special_card_odd_248";
            }
            else {
                console.log("showSpecialCardTypeAnim, show special cardtype anim error1");
                return;
            }
        }
        else if (specialBetOption == cb.Enum.BetZoneOption.HOLE_A)	// 对A
        {
            specialCardType = "special_duia";
            specialCardOdd = "special_card_odd_100";
        }
        else {
            console.log("showSpecialCardTypeAnim, show special cardtype anim error2");
            return;
        }

        let winAnim: cc.Node = this._nodeAnim.getChildByName("special_card_type_anim");
        let winAction: cc.Animation = null;
        if (!winAnim) {
            // 创建动画
            winAnim = this.initAni(this._nodeAnim, this.special_card_type_prefab);
            winAction = winAnim.getComponent(cc.Animation);
            winAnim.name = ("special_card_type_anim");

            // this._winFlagAnims.push(winAnim);
            // this._winFlagActions.push(winAction);
        }
        winAnim.active = true;
        let atlas: cc.SpriteAtlas = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? this.special_card_type_PLIST : this.en_animation_PLIST;
        cb.loadSpriteTextureByPlist(atlas, (winAnim.getChildByName("special_card_type")).getComponent(cc.Sprite), specialCardType);
        cb.loadSpriteTextureByPlist(atlas, (winAnim.getChildByName("special_card_odd")).getComponent(cc.Sprite), specialCardOdd);
        if (stayLastFrame) {
            this.gotoFrameAndPlay(winAction, 480, 480, false);
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(lastDuration), cc.callFunc(function () {
                winAnim.active = false;
                this.showBetWinFlagsAndFlyCoinsAnim();
            }.bind(this))));
        }
        else {
            this.playCowboyEffect(this.s_special_card_type);
            this.gotoFrameAndPlay(winAction, 0, 480, false);
            winAction.on("finished", (event: cc.Event): void => {
                winAction.off("finished");
                winAnim.active = false;
                this.showBetWinFlagsAndFlyCoinsAnim();
            });
        }
    }

    isResultSpecialCardType(): boolean {
        let arr = cb.getCowboyRoom().matchOption;
        let len = cv.StringTools.getArrayLength(arr);
        for (let i = 0; i < len; i++) {
            let areaIdx = this.getAreaIdxByBetOption(arr[i]);
            let betOption = this.getBetOptionByAreaIdx(areaIdx);
            if (betOption == cb.Enum.BetZoneOption.HOLE_A || betOption == cb.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {
                return true;
            }
        }
        return false;
    }

    clearSpecialCardTypeAnim(): void {
        let special_card_type_anim = this._nodeAnim.getChildByName("special_card_type_anim");
        if (cv.tools.isValidNode(special_card_type_anim)) {
            special_card_type_anim.removeFromParent(true);
            special_card_type_anim.destroy();
        }
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
        this._btnZouShi.node.active = false;
        let trend_anim = this._topBg.node.getChildByName("trend_anim");
        if (cv.tools.isValidNode(trend_anim)) {
            trend_anim.removeFromParent(true);
            trend_anim.destroy();
        }
        let sprTrend = (new cc.Node()).addComponent(cc.Sprite);
        cb.loadSpriteTextureByPlist(this.cowboy_trend_anim_PLIST, sprTrend, "cowboy_trend_0");
        sprTrend.node.name = ("trend_anim");
        sprTrend.node.setPosition(this._btnZouShi.node.x - 1, this._btnZouShi.node.y + 3);
        this._topBg.node.addChild(sprTrend.node);
        let ani = sprTrend.node.addComponent(cc.Animation);
        // sprTrend.node.addChild(ani.node);
        ani.addClip(this.trend_anim, "trend_anim");
        ani.play("trend_anim");
        // sprTrend.node.runAction(cc.repeatForever(ani.play()));
    }

    hideTrendChangeAnim(): void {
        this._btnZouShi.node.active = (true);
        let trend_anim = this._topBg.node.getChildByName("trend_anim");
        if (cv.tools.isValidNode(trend_anim)) {
            trend_anim.removeFromParent(true);
            trend_anim.destroy();
        }
    }

    showRecordDotBezierAnim(): void {
        let lightRecordDot: cc.Sprite = (new cc.Node()).addComponent(cc.Sprite);
        let sprRecordDot: cc.Sprite = (new cc.Node()).addComponent(cc.Sprite);
        let bornPoint = cc.v2(0, 0);
        let ctrlPoint1 = cc.v2(0, 0);
        let ctrlPoint2 = cc.v2(0, 0);

        // 0 平 1 牛仔胜 - 1 小牛胜
        if (cb.getCowboyRoom().result == 1) {
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, lightRecordDot, "record_red_fire_light");
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprRecordDot, "record_red_fire");
            let areaIdx = this.getAreaIdxByBetOption(cb.Enum.BetZoneOption.RED_WIN);
            bornPoint = this._betAreas[areaIdx].getParent().convertToWorldSpaceAR(this._betAreas[areaIdx].getPosition(), bornPoint);
            bornPoint = this._nodeAnim.convertToNodeSpaceAR(bornPoint);
            ctrlPoint1 = cc.v2(300 + bornPoint.x, 80 + bornPoint.y);
            ctrlPoint2 = cc.v2(600 + bornPoint.x, 160 + bornPoint.y);
        }
        else if (cb.getCowboyRoom().result == -1) {
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, lightRecordDot, "record_blue_fire_light");
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprRecordDot, "record_blue_fire");
            let areaIdx = this.getAreaIdxByBetOption(cb.Enum.BetZoneOption.BLUE_WIN);
            bornPoint = this._betAreas[areaIdx].getParent().convertToWorldSpaceAR(this._betAreas[areaIdx].getPosition());
            bornPoint = this._nodeAnim.convertToNodeSpaceAR(bornPoint);
            ctrlPoint1 = cc.v2(-80 + bornPoint.x, 80 + bornPoint.y);
            ctrlPoint2 = cc.v2(-120 + bornPoint.x, 160 + bornPoint.y);
        }
        else if (cb.getCowboyRoom().result == 0) {
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, lightRecordDot, "record_draw_fire_light");
            cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprRecordDot, "record_draw_fire");
            let areaIdx = this.getAreaIdxByBetOption(cb.Enum.BetZoneOption.EQUAL);
            bornPoint = this._betAreas[areaIdx].getParent().convertToWorldSpaceAR(this._betAreas[areaIdx].getPosition());
            bornPoint = this._nodeAnim.convertToNodeSpaceAR(bornPoint);
            ctrlPoint1 = cc.v2(80 + bornPoint.x, 80 + bornPoint.y);
            ctrlPoint2 = cc.v2(160 + bornPoint.x, 160 + bornPoint.y);
        }
        if (!sprRecordDot) {
            return;
        }

        // 光效
        let endPos = this._nodeAnim.convertToNodeSpaceAR(this._lastRecordDotWorldPos);
        this._nodeAnim.addChild(lightRecordDot.node);
        lightRecordDot.node.active = false;
        lightRecordDot.node.setPosition(endPos);

        this._nodeAnim.addChild(sprRecordDot.node);
        sprRecordDot.node.setPosition(bornPoint);
        let bezierCfg = [ctrlPoint1, ctrlPoint2, endPos];

        sprRecordDot.node.scale = (0);
        sprRecordDot.node.opacity = (0);
        sprRecordDot.node.runAction(cc.scaleTo(0.3, 1.0));
        sprRecordDot.node.runAction(cc.fadeIn(0.3));

        this.showTrendChangeAnim();
        let len = cv.StringTools.getArrayLength(this._recordDots);
        sprRecordDot.node.runAction(cc.sequence(cc.delayTime(0.32), cc.bezierTo(0.5, bezierCfg), cc.callFunc(function () {//0.5.5
            if (cv.tools.isValidNode(sprRecordDot)) {
                sprRecordDot.node.removeFromParent(true);
                sprRecordDot.node.destroy();
            }
            if (len > 0) {
                this._recordDots[len - 1].node.active = (true);
            }

            lightRecordDot.node.active = (true);
            lightRecordDot.node.runAction(cc.sequence(
                cc.fadeOut(0.18),
                cc.fadeIn(0.18),
                cc.fadeOut(0.18),
                cc.destroySelf()
            ));
        }.bind(this))));

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            if (len > 0) {
                this._recordDots[len - 1].node.active = false;
            }
            this.showHistoryMoveAnim();
        }.bind(this))));

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc(function () {
            this.hideTrendChangeAnim();
        }.bind(this))));
    }

    // 显示玩家胜利头像框光环动画
    showWinPlayerLightAnim(uid: number): void {
        let playerHeads: cc.Node[] = this.getPlayerHeadNodesByUid(uid);
        if (playerHeads.length == 0) {
            this.updatePlayerWinCount(uid, true);
            return;
        }

        for (let i = 0; i < playerHeads.length; i++) {
            let head = playerHeads[i];

            // 自己不显示光环
            if (head == this._selfHeadBg) {
                continue;
            }

            let winPlayerLightAnim: cc.Node = head.getChildByName("win_player_light");
            let headIMG = head.getChildByName(this._HEAD_IMG_TAG);
            let pos = headIMG ? headIMG.position : cc.v2(0, 15);
            if (!winPlayerLightAnim) {
                winPlayerLightAnim = this.initAni(head, this.win_player_light_prefab);
                winPlayerLightAnim.name = ("win_player_light");
                winPlayerLightAnim.setPosition(pos);
                winPlayerLightAnim.zIndex = (10);
            }

            let winPlayerLightAction: cc.Animation = winPlayerLightAnim.getComponent(cc.Animation);

            // winPlayerLightAnim.runAction(winPlayerLightAction);
            // winPlayerLightAction.play();
            winPlayerLightAnim.active = true;
            this.gotoFrameAndPlay(winPlayerLightAction, 0, 20, true);
        }

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => {
            this.updatePlayerWinCount(uid, true);
        })));
    }

    hideAllWinPlayerLightAnim(): void {
        let len = this._otherPlayerHeads.length;
        for (let i = 0; i < len; i++) {
            let node = this._otherPlayerHeads[i].bg.node.getChildByName("win_player_light");
            if (cv.tools.isValidNode(node)) {
                node.removeFromParent(true);
                node.destroy();
            }
        }
    }

    // 显示玩家连胜动画
    updatePlayerWinCount(uid: number, bAnim?: boolean): void {
        bAnim = bAnim == true ? true : false;
        let playerHeads: cc.Node[] = this.getPlayerHeadNodesByUid(uid);
        if (playerHeads.length == 0) {
            return;
        }

        for (let i = 0; i < playerHeads.length; i++) {
            let head = playerHeads[i];
            // 富豪No1 和 神算子 不显示连胜
            if (this._otherPlayerHeads[0].bg.node == head || this._otherPlayerHeads[1].bg.node == head) {
                continue;
            }

            let win_player_win_count = this.node.getChildByName("win_player_win_count_" + head.uuid);
            if (cv.tools.isValidNode(win_player_win_count)) {
                win_player_win_count.removeFromParent(true);
                win_player_win_count.destroy();
            }
            let keepWinCount = cb.getCowboyRoom().getPlayerKeepWinCountByUid(uid);
            if (keepWinCount >= 3) {
                keepWinCount = keepWinCount > 10 ? 11 : keepWinCount;
                let sprWinCount = (new cc.Node()).addComponent(cc.Sprite);
                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprWinCount, cv.StringTools.formatC("win_count_%d", keepWinCount));
                sprWinCount.node.name = ("win_player_win_count_" + head.uuid);
                let offsetY = head == this._selfHeadBg ? 40 : 70;
                let tmpPos = head.convertToWorldSpaceAR(cc.v2(0, offsetY));
                tmpPos = this.node.convertToNodeSpaceAR(tmpPos);
                sprWinCount.node.setPosition(tmpPos);
                this.node.addChild(sprWinCount.node, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_IMG_WIN_COUNT);

                if (bAnim) {
                    // animation
                    let targetPos = sprWinCount.node.getPosition();
                    let bornPos = targetPos;
                    let headMidWorldPos = head.getParent().convertToWorldSpaceAR(head.getPosition());
                    headMidWorldPos = head.convertToNodeSpaceAR(headMidWorldPos);
                    if (headMidWorldPos.x < cv.config.WIDTH / 2) {
                        bornPos = cc.v2(-200 + bornPos.x, 0 + bornPos.y);
                    }
                    else {
                        bornPos = cc.v2(200 + bornPos.x, 0 + bornPos.y);
                    }
                    sprWinCount.node.setPosition(bornPos);
                    sprWinCount.node.runAction(cc.moveTo(0.18, targetPos).easing(cc.easeBackOut()).easing(cc.easeSineOut()));
                }
            }
        }
    }

    // 更新所有玩家连胜状态
    updateAllPlayerWinCount(): void {
        this.updatePlayerWinCount(cv.dataHandler.getUserData().u32Uid);

        // 这里按照服务器发的gamePlayers顺序放
        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            let otherPlayersInfo = cb.getCowboyRoom().otherPlayers;
            if (i < otherPlayersInfo.length) {
                let info = otherPlayersInfo[i];
                this.updatePlayerWinCount(info.uid);
            }
        }
    }

    // 隐藏所有timeline动画
    hideAllTimelineAnims(): void {
        this.gotoFrameZeroAndPause(this._roundStartAction);
        this._roundStartAnim.active = false;

        this.gotoFrameZeroAndPause(this._fightBeginAction);
        this._fightBeginAnim.active = false;

        this.gotoFrameZeroAndPause(this._fightEndAction);
        this._fightEndAnim.active = false;

        this.gotoFrameZeroAndPause(this._waitForNextRoundAction);
        this._waitForNextRoundAnim.active = false;

        let len = this._winFlagAnims.length;
        for (let i = 0; i < len; i++) {
            this.gotoFrameZeroAndPause(this._winFlagActions[i]);
            this._winFlagAnims[i].active = false;
        }
    }

    gotoFrameZeroAndPause(ani: cc.Animation) {  // 未处理
        ani.play();
        ani.stop();
    }

    // 更新玩家金币，在金币飞到自己动画结束之前(减去当前局赢的)
    updatePlayerCoinBeforeSettle(): void {
        // 自己
        let it = cb.getCowboyRoom().playerSettles.get(cv.dataHandler.getUserData().u32Uid);
        if (it) {
            this._textCoin.string = (this.getShortOwnCoinString(it.curCoin - it.totalWinAmount));
        }

        // 其他玩家
        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            let player = this._otherPlayerHeads[i];
            if (player.bg.node.active && player.uid > 0) {
                let it = cb.getCowboyRoom().playerSettles.get(player.uid);
                if (it) {
                    player.textCoin.string = (this.getShortOwnCoinString(it.curCoin - it.totalWinAmount));
                }
            }
        }
    }

    // 更新牌
    updateAllCardsBeforeSettle(): void {
        this.setAllCardsVisible(true);

        // 更新所有背面牌
        this.updateAllCardsBack();

        /*let publicCardNum = cb.getCowboyRoom().publicCards.length;
        for (let i = 0; i < 1; i++)
        {
            if (i < publicCardNum)
            {
                this._publicCards[i].SetContent((cb.getCowboyRoom().publicCards[i].number), (cb.getCowboyRoom().publicCards[i].suit));
                this._publicCards[i].SetFace(true);
            }
        }*/
    }

    // 更新所有牌，除了公共牌
    updateAllCardsExceptPublicBeforeSettle(): void {
        // update cards
        this.setAllCardsVisible(true);

        // 更新所有背面牌
        this.updateAllCardsBack();

        // 更新所有正面牌
        if (cb.getCowboyRoom().redHandCards.length == 2 && cb.getCowboyRoom().blueHandCards.length == 2) {
            for (let i = 0; i < 2; i++) {
                this._redHandCards[i].SetContent((cb.getCowboyRoom().redHandCards[i].number), (cb.getCowboyRoom().redHandCards[i].suit));
                this._blueHandCards[i].SetContent((cb.getCowboyRoom().blueHandCards[i].number), (cb.getCowboyRoom().blueHandCards[i].suit));
                this._redHandCards[i].SetFace(true);
                this._blueHandCards[i].SetFace(true);
            }
        }

        /*let publicCardNum = cb.getCowboyRoom().publicCards.length;
        for (let i = 0; i < 1; i++)
        {
            if (i < publicCardNum)
            {
                this._publicCards[i].SetContent((cb.getCowboyRoom().publicCards[i].number), (cb.getCowboyRoom().publicCards[i].suit));
                this._publicCards[i].SetFace(true);
            }
        }*/
    }

    // 清除没有中的区域金币
    clearLoseBetCoins(): void {
        let len = this._betCoinContents.length;
        let arr = cb.getCowboyRoom().matchOption;
        let matchLen = cb.getCowboyRoom().matchOption.length;
        for (let i = 0; i < len; i++) {
            let betOption = this.getBetOptionByAreaIdx(i);
            let isOptionWin = false;
            for (let i = 0; i < matchLen; i++) {
                if (betOption == arr[i]) {
                    isOptionWin = true;
                    break;
                }
            }

            if (!isOptionWin) {
                this._betCoinContents[i].destroyAllChildren();
                this._betCoinContents[i].removeAllChildren(true);
                console.log("clearLoseBetCoins-.清理areaIndex = " + i);
                this.hideAreaCoin(i, false);
            }
        }
    }

    // 开局动画
    showRoundStartAnim(): void {
        this._roundStartAnim.active = (true);
        this.gotoFrameAndPlay(this._roundStartAction, 0, 90, false);
        this._roundStartAction.on("finished", (event: cc.Event): void => {
            this._roundStartAction.off("finished");
            this._roundStartAnim.active = false;
            this.sendCardsAnim();
        }, this);
    }

    // 发牌动画
    sendCardsAnim(): void {
        this.setAllCardsVisible(false);
        this.updateAllCardsBack();

        let handCards: CowboyCard[] = [];
        let handCardsTargetPos: cc.Vec2[] = [];
        let redOffset = cc.v2(30, -30);
        let blueOffset = cc.v2(-30, -30);
        let publicOffset = cc.v2(-30, -30);
        for (let i = 0; i < 2; i++) {
            this._redHandCards[i].node.setPosition(this._oriRedHandCardsPos[i].x + redOffset.x, this._oriRedHandCardsPos[i].y + redOffset.y);
            this._blueHandCards[i].node.setPosition(this._oriBlueHandCardsPos[i].x + blueOffset.x, this._oriBlueHandCardsPos[i].y + blueOffset.y);
        }
        for (let i = 0; i < 5; i++) {
            this._publicCards[i].node.setPosition(this._oriPublicCardsPos[i].x + publicOffset.x, this._oriPublicCardsPos[i].y + publicOffset.y);
            this._publicCards[i].SetFace(false);
        }
        handCards.push(this._redHandCards[0]);
        handCards.push(this._blueHandCards[0]);
        handCards.push(this._redHandCards[1]);
        handCards.push(this._blueHandCards[1]);
        handCardsTargetPos.push(this._oriRedHandCardsPos[0]);
        handCardsTargetPos.push(this._oriBlueHandCardsPos[0]);
        handCardsTargetPos.push(this._oriRedHandCardsPos[1]);
        handCardsTargetPos.push(this._oriBlueHandCardsPos[1]);
        // 发手牌动画
        let duration = 0.14;
        let easeRate = 1.0;
        let len = handCards.length;
        for (let i = 0; i < len; i++) {
            let moveAction = (cc.moveTo(duration, handCardsTargetPos[i]).easing(cc.easeInOut(easeRate)));
            let showAction = cc.callFunc(function () {
                handCards[i].node.active = (true);
                handCards[i].SetFace(false);
            }.bind(this));
            let moveComplete = cc.callFunc(function () {
                if (i == len - 1) {
                    // 发公共牌动画
                    for (let j = 0; j < 5; j++) {
                        let publicMoveAction = (cc.moveTo(duration, this._oriPublicCardsPos[j]).easing(cc.easeInOut(easeRate)));
                        let publicShowAction = cc.callFunc(function () {
                            this._publicCards[j].node.active = (true);
                            this._publicCards[j].SetFace(false);
                            this.playCowboyEffect(this.s_fapai);
                        }.bind(this));
                        let publicMoveComplete = cc.callFunc(function () {
                            if (j == 4) {
                                // 翻第一张公共牌动画
                                //let publicCardNum = cb.getCowboyRoom().publicCards.length;
                                //if (publicCardNum > 0)
                                //{
                                /*SEInt32 eNum = cb.getCowboyRoom().publicCards[0].number();
                                SEInt32 eSuit = cb.getCowboyRoom().publicCards[0].suit();
                                this._publicCards[0]..node.active = (true);
                                this._publicCards[0].SetContent((eNum), (eSuit));
                                this._publicCards[0].SetFace(false);
                                this._publicCards[0].Turn(true);
                                this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
                                    this.playCowboyEffect(this.s_kaipai);
                                })));*/

                                // 开战动画
                                this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                                    this.showFightBeginAnim();
                                }.bind(this))));
                                //}
                            }
                        }.bind(this));
                        this.scheduleOnce(function () {
                            this._publicCards[j].node.active = (true);
                            this._publicCards[j].node.runAction(cc.sequence(publicShowAction, publicMoveAction, publicMoveComplete));
                        }.bind(this), j * duration);
                    }
                }
            }.bind(this));
            this.scheduleOnce(function () {
                handCards[i].node.active = true;
                handCards[i].node.runAction(cc.sequence(showAction, moveAction, moveComplete));
            }.bind(this), i * duration);

            this.scheduleOnce(function () {
                this.playCowboyEffect(this.s_fapai);
            }.bind(this), 0.04 + i * duration);
        }
    }

    // 翻手牌动画
    showHandCardsAnim(): void {
        // 显示所有牌
        this.setAllCardsVisible(true);

        // 翻手牌
        if (cb.getCowboyRoom().redHandCards.length == 2 && cb.getCowboyRoom().blueHandCards.length == 2) {
            for (let i = 0; i < 2; i++) {
                this._redHandCards[i].SetContent((cb.getCowboyRoom().redHandCards[i].number), (cb.getCowboyRoom().redHandCards[i].suit));
                // this._redHandCards[i].node.runAction(cc.sequence(cc.rotateTo(0.3, 0, 180), cc.callFunc(()=>{
                //     this._redHandCards[i].node.setRotation(0);
                this._redHandCards[i].SetFace(false);//})));

                this._redHandCards[i].Turn(true);

                this._blueHandCards[i].SetContent((cb.getCowboyRoom().blueHandCards[i].number), (cb.getCowboyRoom().blueHandCards[i].suit));
                // this._blueHandCards[i].node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => {//, cc.rotateTo(0.3, 0, 180)
                // this._blueHandCards[i].node.setRotation(0);
                this._blueHandCards[i].SetFace(false);
                this._blueHandCards[i].Turn(true, 0.5);
                // })));
                // this._blueHandCards[i].Turn(true, 0.5);

                if (i == 0) {
                    this.playCowboyEffect(this.s_kaipai);
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                        this.playCowboyEffect(this.s_kaipai);
                    }.bind(this))));
                }
            }
        }

        // 翻公共牌
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._showHandCardsDuration), cc.callFunc(function () {
            this.showPublicCardsAnim();
        }.bind(this))));
    }

    // 翻公共牌动画
    showPublicCardsAnim(): void {
        let publicCardNum = cb.getCowboyRoom().publicCards.length;
        for (let i = 0; i < 5; i++) {
            if (i < publicCardNum) {
                let flopOverFunc = cc.callFunc(function () {
                    if (i == 4) {
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                            this.hideGameTips();
                            this.showCardTypeAnim();
                            this.updateWinCards();
                            this.showCowboyLoseAnim();
                            //showHistoryMoveAnim();
                        }.bind(this))));
                        this.playCowboyEffect(this.s_kaipai);
                    }
                }.bind(this));
                this._publicCards[i].SetFace(false);
                this._publicCards[i].node.runAction(cc.sequence(cc.moveTo(0.3, this._oriPublicCardsPos[0]), cc.callFunc(function () {
                    this._publicCards[i].SetContent((cb.getCowboyRoom().publicCards[i].number), (cb.getCowboyRoom().publicCards[i].suit));
                    this._publicCards[i].Turn(true);
                }.bind(this)), cc.moveTo(0.2, this._oriPublicCardsPos[i]), flopOverFunc));
            }
        }

        // 隐藏没有中的区域金币动画
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._showPublicCardsDuration), cc.callFunc(function () {
            this.showHideLoseBetCoinsAnim();
        }.bind(this))));
    }

    // 翻牌型动画
    showCardTypeAnim(): void {
        this.updateCardType();

        this._redCardType.node.scale = (0);
        this._blueCardType.node.scale = (0);
        this._redCardTypeBg.node.scale = (0);
        this._blueCardTypeBg.node.scale = (0);
        let scaleAction = (cc.scaleTo(0.18, 1.0).easing(cc.easeInOut(1.0)));
        this._redCardType.node.runAction(scaleAction);
        this._blueCardType.node.runAction(scaleAction.clone());
        this._redCardTypeBg.node.runAction(scaleAction.clone());
        this._blueCardTypeBg.node.runAction(scaleAction.clone());

        cb.getCowboyRoom().showTheNewestTrend = true;
    }

    // 出战动画
    showFightBeginAnim(): void {
        //this._fightBeginAnim..node.active = (true);
        //this._fightBeginAction.gotoFrameAndPlay(0, 60, false);
        //this._fightBeginAction..on("finished", (event: cc.Event): void => 
        //{
        //	this._fightBeginAnim.active = false;
        //});
        //this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function() {
        //	//this.playCowboyEffect(s_chuzhan_kaizhan);
        //	this.playCowboyEffect(this.s_begin_bet);
        //})));

        this.playCowboyEffect(this.s_begin_bet);
        //this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function() {
        this._fightBeginAnim.active = (true);
        this.gotoFrameAndPlay(this._fightBeginAction, 0, 60, false);
        this._fightBeginAction.on("finished", (event: cc.Event): void => {
            this._fightBeginAction.off("finished");
            this._fightBeginAnim.active = false;
        }, this);
        //})));
    }

    // 开战动画
    showFightEndAnim(): void {
        // 开战动画.翻牌动画.显示win标记，金币收回动画.等待下一局动画
        this._fightEndAnim.active = (true);
        this.gotoFrameAndPlay(this._fightEndAction, 0, 60, false);

        this.playPointAni();
        this._fightEndAction.on("finished", (event: cc.Event): void => {
            this._fightEndAction.off("finished");
            this._fightEndAnim.active = false;
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                // 翻牌动画
                this.showHandCardsAnim();
            }.bind(this))));
        });
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            //this.playCowboyEffect(s_chuzhan_kaizhan);
            this.playCowboyEffect(this.s_end_bet);
        }.bind(this))));
    }

    // 下注倒计时开始动画
    showBetCoutDownBeginAnim(): void {
        this.updateBetCoutDown();

        // 动画
        this._betCountDownBg.node.stopAllActions();
        this._betCountDownBg.node.setPosition(this._betCountDownBg.node.x, cv.config.HEIGHT);
        this._betCountDownBg.node.runAction(cc.moveTo(0.5, this._oriBetCountDownBgPos).easing(cc.easeBackOut()));
    }

    // 下注倒计时结束动画
    showBetCoutDownEndAnim(): void {
        this._updateBetButtonState();
        this.showOpenCardTips();

        // 动画
        this._betCountDownBg.node.stopAllActions();
        this._betCountDownBg.node.setPosition(this._oriBetCountDownBgPos);
        let move = cc.moveTo(0.5, cc.v2(this._oriBetCountDownBgPos.x, cv.config.HEIGHT)).easing(cc.easeBackIn());
        let pkCall = cc.callFunc(function () {
            this.hideBetCountDown();
        }.bind(this));
        this._betCountDownBg.node.runAction(cc.sequence(move, pkCall));

        // 开战动画
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._betCountDownEndDuration), cc.callFunc(function () {
            this.showFightEndAnim();
        }.bind(this))));
    }

    // 显示隐藏没有中的区域金币动画
    showHideLoseBetCoinsAnim(): void {
        let arr = cb.getCowboyRoom().matchOption;
        let len = cv.StringTools.getArrayLength(arr);
        let betLen = cv.StringTools.getArrayLength(this._betCoinContents);
        for (let i = 0; i < betLen; i++) {
            let betOption = this.getBetOptionByAreaIdx(i);
            let isOptionWin = false;
            for (let i = 0; i < len; i++) {
                if (betOption == arr[i]) {
                    isOptionWin = true;
                    break;
                }
            }

            if (!isOptionWin) {
                console.log("清理areaIndex = " + i);
                this.hideAreaCoin(i);
            }
        }

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._hideLoseBetCoinsDuration), cc.callFunc(() => {
            // 特殊牌型动画
            if (this.isResultSpecialCardType()) {
                this.showSpecialCardTypeAnim();
            }
            else {
                // 显示win标记/金币回收动画
                this.showBetWinFlagsAndFlyCoinsAnim();
            }
        })));
    }

    hideAreaCoin(areaIdx: number, isRunAction?: boolean) {
        isRunAction = isRunAction == false ? false : true;
        let areaCoin = this._coinNodeByArea[areaIdx];
        let coinLen = cv.StringTools.getArrayLength(areaCoin);
        for (let i = coinLen - 1; i >= 0; i--) {
            let node = areaCoin[i];
            // node.runAction(cc.sequence(cc.fadeOut(0.5), cc.hide()));
            if (isRunAction) {
                node.runAction(cc.fadeOut(0.5));
            }
            else {
                node.opacity = 0;
            }
            // node.active = false;
        }
    }

    handleCoin() {
        // let coinLen = this._coinNode.childrenCount;
        // this._circleCoinArr = [];
        // this._squareCoinArr = [];
        let len = this._coinNode.childrenCount;
        let arr = this._coinNode.children;
        for (let i = len - 1; i >= 0; i--) {
            arr[i].active = true;
            arr[i].stopAllActions();
            this.nodePutToPool(arr[i]);
        }
        let areaLen = this._coinNodeByArea.length;
        for (let i = 0; i < areaLen; i++) {
            this._coinNodeByArea[i] = [];
        }
        // this._coinNode.removeAllChildren(true);
        // for (let i = coinLen - 1; i >= 0; i--) {
        //     let node = this._coinNode.children[i];
        //     node.active = false;
        //     let name = node.name;
        //     if (name == "btnBet_0") {
        //         this._circleCoinArr.push(node);
        //     }
        //     else {
        //         this._squareCoinArr.push(node);
        //     }
        // }
    }

    // 显示win标记，金币收回动画
    showBetWinFlagsAndFlyCoinsAnim(): void {
        // 显示win标记/隐藏区域数字和金币
        let matchArr = cb.getCowboyRoom().matchOption;
        let matchLen = cv.StringTools.getArrayLength(matchArr);

        for (let i = 0; i < matchLen; i++) {
            let areaIdx = this.getAreaIdxByBetOption(matchArr[i]);
            this.clearBetArea(areaIdx);
            this.showWinFlagAnim(areaIdx);
        }

        // 路单曲线动画
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc((): void => {
            this._showAllWayOutAnim();
            this.showRecordDotBezierAnim();
        })));

        // 动画:在哪些选项赢了(增加除主界面8个人输赢外其它玩家列表的输赢)
        let tmpSettles = cb.getCowboyRoom().playerSettles;
        tmpSettles.add(0xFFFFFFFF, cb.getCowboyRoom().otherPlayersSettle);
        tmpSettles.forEach((key: number, value: PlayerSettle, i: number): void => {
            let uid = key;
            let playerHeads: cc.Node[] = this.getPlayerCoinNodesByUid(uid);

            // 桌面没有该玩家
            if (playerHeads.length == 0) {
                console.log("playerSettles uid: %d not in gameplayers, use player list button", uid);
                playerHeads.push(this._btnPlayerList.node);
            }

            for (let i = 0; i < playerHeads.length; i++) {
                // 自己是富豪/神算子， 只回收一次金币到自己头像
                if (uid == cv.dataHandler.getUserData().u32Uid && i > 0) {
                    continue;
                }

                let headImg = playerHeads[i];
                let worldPos = headImg.parent.convertToWorldSpace(headImg.getPosition());
                console.log("世界坐标系---------." + worldPos);
                let headMidWorldPos = headImg.parent.convertToWorldSpaceAR(headImg.getPosition());
                headMidWorldPos = this._nodeAnim.convertToNodeSpaceAR(headMidWorldPos);
                let zoneSettleDetails = value.settle;
                for (let j = 0; j < zoneSettleDetails.length; j++) {
                    let zoneSettleDetail = zoneSettleDetails[j];
                    if (zoneSettleDetail.winAmount > 0) {
                        let option = zoneSettleDetail.option;
                        let areaIdx = this.getAreaIdxByBetOption(option);

                        // 自己赢显示win标记,隐藏区域数字
                        let coinContent = this._betCoinContents[areaIdx];
                        let sz = coinContent.getContentSize();
                        let betDetails = this.getBetDetailAmounts(zoneSettleDetail.winAmount);
                        let len = betDetails.length;
                        for (let k = 0; k < len; k++) {
                            let flyCoin: cc.Sprite = this.createFlyCoin(areaIdx, betDetails[k], true);
                            let coinFlyBorn = coinContent.convertToWorldSpaceAR(cc.v2(this.SERangeRandomf(sz.width * 0.3, sz.width * 0.7) - sz.width * 0.5, this.SERangeRandomf(sz.height * 0.2, sz.height * 0.7) - sz.height * 0.5));
                            coinFlyBorn = this._nodeAnim.convertToNodeSpaceAR(coinFlyBorn);
                            this._nodeAnim.addChild(flyCoin.node);
                            flyCoin.node.setPosition(coinFlyBorn);
                            // flyCoin.node.active = false;

                            // 延迟一会(win动画结束)开始飞金币
                            this.scheduleOnce((): void => {
                                flyCoin.node.active = true;
                                let delay: cc.ActionInterval = cc.delayTime(0.2 + k * 0.025);
                                let moveTo: cc.ActionInterval = cc.moveTo(0.6, headMidWorldPos).easing(cc.easeOut(0.8));
                                flyCoin.node.runAction(cc.sequence(delay, moveTo, cc.callFunc((): void => {
                                    this.nodePutToPool(flyCoin.node);
                                })));
                            }, 0.7);
                        }
                    }
                }

                // 总共赢的
                let totalWinAmount = value.totalWinAmount;
                if (totalWinAmount >= 100) {
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                        let winToastBg = (new cc.Node()).addComponent(cc.Sprite);
                        cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, winToastBg, "win_coin_bg");
                        winToastBg.node.setPosition(headMidWorldPos);
                        console.log("世界坐标系---------." + worldPos + ", " + (cv.config.WIDTH / 2).toString());
                        console.log((headImg) != this._selfCoin.node);
                        if (headImg == this._btnPlayerList.node) {
                            winToastBg.node.setAnchorPoint(cc.v2(1, 0.5));
                        }
                        else {
                            if (worldPos.x < cv.config.WIDTH / 2) {
                                if (headImg != this._selfCoin.node) {
                                    winToastBg.node.setAnchorPoint(cc.v2(0, 0.5));
                                }
                            }
                            else {
                                winToastBg.node.setAnchorPoint(cc.v2(1, 0.5));
                                // winToastBg.node.setPosition(headMidWorldPos.x-winToastBg.node.width, 0);
                            }
                        }

                        this._nodeAnim.addChild(winToastBg.node);

                        //std.string formatCoin = this.getShortOwnCoinString(totalWinAmount);
                        //TextBMFont* textWinToast = cocos2d.ui.TextBMFont.create("+" + formatCoin, "cowboy/fnt/win_num.fnt");
                        let textWinToast = (new cc.Node).addComponent(cc.Label);
                        textWinToast.font = this.win_num_FNT;
                        textWinToast.fontSize = 10;
                        textWinToast.string = ("+" + cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(totalWinAmount)));
                        winToastBg.node.addChild(textWinToast.node);
                        textWinToast.node.scale = (1.4);
                        if (headImg == this._btnPlayerList.node) {
                            textWinToast.node.setPosition(-winToastBg.node.width / 2, 0);
                        }
                        else {
                            if (worldPos.x > cv.config.WIDTH / 2) {
                                textWinToast.node.setPosition(-winToastBg.node.width / 2, 0);
                            }
                            else if (headImg != this._selfCoin.node) {
                                textWinToast.node.setPosition(winToastBg.node.width / 2, 0);
                            }
                        }


                        winToastBg.node.runAction(cc.sequence(cc.delayTime(1.3), cc.moveBy(1.5, cc.v2(0, 50)), cc.destroySelf()));
                        winToastBg.node.runAction(cc.sequence(cc.delayTime(1.4), (cc.fadeOut(1.5).easing(cc.easeInOut(1.0)))));
                        textWinToast.node.runAction(cc.sequence(cc.delayTime(1.4), (cc.fadeOut(1.5).easing(cc.easeInOut(1.0)))));
                        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                            this.updateRoundEndPlayerCoin();
                        }.bind(this))));

                        this.playCowboyEffect(this.s_get_win_coin);
                    }.bind(this))));

                    // 赢的玩家头像光环
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.7), cc.callFunc(function () {
                        this.showWinPlayerLightAnim(uid);
                    }.bind(this))));
                }
                else {
                    // 更新玩家连胜状态
                    this.updatePlayerWinCount(uid, true);
                }
            }
        });

        // 维护状态:非0代表系统即将维护
        if (cb.getCowboyRoom().stopWorld != 0) {
            let bTrue = cb.getCowboyRoom().idle_roomid > 0;
            if (!bTrue) {
                this.showCowboyToast(cv.config.getStringData("Cowboy_server_will_stop_text"));
            }

            this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._betWinFlagsAndFlyCoinsDuration), cc.callFunc(function () {
                if (bTrue) {
                    this.showSwitchTable();
                }
                else {
                    this.backToCowboyListScene();
                }
            }.bind(this))));
        }
        else {
            // 下一局即将开始
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._betWinFlagsAndFlyCoinsDuration), cc.callFunc(function () {
                this.showNextRoundTips();
            }.bind(this))));
        }
    }

    // 单局结束时更新玩家金币
    updateRoundEndPlayerCoin(): void {
        // 自己
        let it = cb.getCowboyRoom().playerSettles.get(cv.dataHandler.getUserData().u32Uid);
        if (it) {
            this._textCoin.string = (this.getShortOwnCoinString(it.curCoin));
        }

        // 其他玩家
        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            let player = this._otherPlayerHeads[i];
            if (player.bg.node.active && player.uid > 0) {
                let it = cb.getCowboyRoom().playerSettles.get(player.uid);
                if (it) {
                    player.textCoin.string = (this.getShortOwnCoinString(it.curCoin));
                }
            }
        }
    }

    getBetChipIdx(coin: number): number {
        let ret = -1;
        let amountLevels = cb.getCowboyRoom().pkRoomParam.amountLevel;
        for (let i = 0; i < amountLevels.length; i++) {
            if (coin == amountLevels[i]) {
                return i;
            }
        }
        return ret;
    }

    getBetDetailAmounts(gold: number): number[] {
        let vAmountLevels: number[] = cb.getCowboyRoom().vBetCoinOption;
        return MiniGameCommonDef.disinteBetAmounts(gold, vAmountLevels);
    }

    getAllBetDetailAmounts(option: number): number[] {
        let it = cb.getCowboyRoom().allZoneBet.get(option);
        if (it) {
            return it;
        }
        else {
            let vec: number[] = [];
            return vec;
        }
    }

    nodePutToPool(node: cc.Node): void {
        if (!node) return;

        console.log("#########################nodePutToPool#############################" + this._circlePool.size());
        let name = node.name;
        if (name == "btnBet_0") {
            this._circlePool.put(node);
        }
        else if (name == "btnBet_3") {
            this._squarePool.put(node);
        }
    }

    getRandPos(sz: cc.Size, flyCoin: cc.Node): cc.Vec2 {
        let width_offset = flyCoin.width * 0.3;
        let height_offset = flyCoin.height * 0.3;
        return cc.v2(this.SERangeRandomf(0 + width_offset, sz.width - width_offset) - sz.width * 0.5, this.SERangeRandomf(0 + height_offset, sz.height - height_offset) - sz.height * 0.5);
    }

    createFlyCoin(areaIdx: number, coin: number, isWin?: boolean): cc.Sprite {
        isWin = isWin == true ? true : false;
        let isCircleCoin = this.isCircleCoin(coin);
        let node: cc.Node = null;

        let len = cv.StringTools.getArrayLength(this._coinNodeByArea[areaIdx]);
        if (len >= this._areaCoinMax[areaIdx]) {
            let removeNode = (this._coinNodeByArea[areaIdx])[0];
            this.nodePutToPool(removeNode);
            this._coinNodeByArea[areaIdx].splice(0, 1);
        }

        if (isCircleCoin) {
            if (this._circlePool.size() > 0) {
                node = this._circlePool.get();
            }
            else {
                node = cc.instantiate(this.btnBet_0_prefab);
            }
        }
        else {
            if (this._squarePool.size() > 0) {
                node = this._squarePool.get();
            }
            else {
                node = cc.instantiate(this.btnBet_3_prefab);
            }
        }

        if (!isWin) {
            this._coinNode.addChild(node);

            this._coinNodeByArea[areaIdx].push(node);
        }
        node.active = true;
        node.opacity = 255;

        this.setCoinText(node.getChildByName("textBet"), cv.StringTools.clientGoldByServer(coin), true);
        return node.getComponent(cc.Sprite);
    }

    setCoinText(node: cc.Node, num: number, isYellow: boolean): void {
        let str = cv.StringTools.numberToShowString(num);
        let len = cv.StringTools.getArrayLength(str);
        node.setContentSize(30 * len, 48);
        cv.resMgr.adaptWidget(node);
        node.destroyAllChildren();
        node.removeAllChildren(true);
        for (let i = 0; i < len; i++) {
            let tempNode = new cc.Node();
            tempNode.setContentSize(30, 48);
            node.addChild(tempNode);
            let spr = (new cc.Node()).addComponent(cc.Sprite);
            spr.spriteFrame = this.game_dznz_PLIST.getSpriteFrame((isYellow ? "coin_yellow_" : "coin_gray_") + str.charAt(i));
            tempNode.addChild(spr.node);
        }
    }

    isCircleCoin(gold: number): boolean {
        let llRealGold = cv.StringTools.clientGoldByServer(gold);
        // let fileName = llRealGold < cb.getCowboyRoom().llCoinUICritical ? "bet_coin_clicked" : "bet_block_clicked";
        return llRealGold < cb.getCowboyRoom().llCoinUICritical;
    }

    // 下注动画，金币飞到池中动画
    showBetInAnim(oneBet: PlayerOneBet, ignoreEffect?: boolean): void {
        ignoreEffect = ignoreEffect == true ? true : false;
        // let oneBet = cb.getCowboyRoom().curPlayerBet;
        this.updatePlayerCoin(oneBet.uid);
        this.updateBetArea(oneBet.betOption);

        // 下注动画
        let areaIdx = this.getAreaIdxByBetOption(oneBet.betOption);
        let playerHeads = this.getPlayerCoinNodesByUid(oneBet.uid);
        if (playerHeads.length == 0) {
            console.log("this.showBetInAnim, cannot find valid headBg, use btnPlayerList, oneBet.uid: %d", oneBet.uid);
            playerHeads.push(this._btnPlayerList.node);
        }

        // 自己是富豪/神算子时，下注的筹码只显示一个
        let isCircleCoin = this.isCircleCoin(oneBet.betAmount);
        let coinContent = this._betCoinContents[areaIdx];
        let sz = coinContent.getContentSize();

        for (let i = 0; i < playerHeads.length; i++) {
            let fromHead = playerHeads[i];
            let coinFlyWorldBorn = fromHead.getParent().convertToWorldSpaceAR(fromHead.getPosition());

            // 发射摇头动画

            let headImg = fromHead.getChildByName(this._HEAD_IMG_TAG);
            let circleHeadNode = CircleSprite.getHeadNode(headImg);

            if (fromHead != this._selfHeadBg && fromHead != this._btnPlayerList.node && circleHeadNode && cc.director.getActionManager().getNumberOfRunningActionsInTarget(circleHeadNode) <= 0) {
                let ac: cc.Action = null;
                if (coinFlyWorldBorn.x < cv.config.WIDTH / 2) {
                    ac = cc.sequence(
                        cc.moveBy(0.1, cc.v2(-30, 0)),
                        cc.moveBy(0.1, cc.v2(30, 0)).easing(cc.easeInOut(1.0)));
                }
                else {
                    ac = cc.sequence(
                        cc.moveBy(0.1, cc.v2(30, 0)),
                        cc.moveBy(0.1, cc.v2(-30, 0)).easing(cc.easeInOut(1.0)));
                }

                circleHeadNode.runAction(ac);
            }

            // 富豪和神算子是自己的情况，只下一个金币和播放一次音效
            if (oneBet.uid == cv.dataHandler.getUserData().u32Uid && i > 0)
                continue;

            // 下注音效
            if (!ignoreEffect) {
                if (isCircleCoin) {
                    this.playCowboyEffect(this.s_betin);
                }
                else {
                    this.playCowboyEffect(this.s_betin_many);
                }
            }

            let coinFlyBorn = this._coinNode.convertToNodeSpaceAR(coinFlyWorldBorn);
            let flyCoin: cc.Sprite = this.createFlyCoin(areaIdx, oneBet.betAmount);

            let coinFlyTargetPos: cc.Vec2 = this.getRandPos(sz, flyCoin.node);
            coinFlyTargetPos = this._coinNode.convertToNodeSpaceAR(coinContent.convertToWorldSpaceAR(coinFlyTargetPos));

            flyCoin.node.setPosition(coinFlyBorn);
            // flyCoin.node.active = false;
            // this.scheduleOnce(function () {
            // flyCoin.node.active = true;
            if (i == 0) {
                flyCoin.node.runAction(cc.sequence(
                    cc.moveTo(0.3, coinFlyTargetPos),
                    cc.rotateBy(0.15, 180),
                    cc.rotateBy(0.15, 180)));
            }
            else {
                flyCoin.node.runAction(cc.sequence(
                    cc.moveTo(0.3, coinFlyTargetPos),
                    cc.callFunc(function () { flyCoin.node.active = false; }.bind(this))));
            }
            // }.bind(this), 0.13);

        }
    }

    SERangeRandomf(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }


    // 等待下一局动画
    showWaitForNextRoundInAnim(): void {
        this._waitForNextRoundAnim.active = (true);
        this.gotoFrameAndPlay(this._waitForNextRoundAction, 0, 30, false);
    }

    showWaitForNextRoundOutAnim(): void {
        if (this._waitForNextRoundAnim && this._waitForNextRoundAnim.active) {
            this._waitForNextRoundAnim.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(cv.config.WIDTH * 1.25, 0)), cc.callFunc(function () {
                this._waitForNextRoundAnim.active = false;
                this._waitForNextRoundAnim.setPosition(cc.v2(0, 0));
            }.bind(this))));
        }
    }

    gotoFrameAndPlay(ani: cc.Animation, startIndex: number, endIndex: number, loop: boolean) {
        ani.play();
    }
    // /////////////////animation end//////////////////

    initBetArea(): void {
        // let cv.config.IS_WIDESCREEN
        let bet_content_bg_ipx = this._gameContent.getChildByName("bet_content_bg_ipx");
        let bet_content_bg = this._gameContent.getChildByName("bet_content_bg");
        let bet_content_bg_ipad = this._gameContent.getChildByName("bet_content_bg_ipad");

        let fTotalWidth = 0;
        fTotalWidth += 2 * cv.viewAdaptive.IPHONEX_OFFSETY;
        console.log("initBetArea" + bet_content_bg_ipx);
        fTotalWidth += bet_content_bg_ipx.width;
        fTotalWidth += (157 - 25);
        fTotalWidth += (157 - 25);

        let bTrueFullScreen = fTotalWidth <= cv.config.WIDTH;


        if (cv.native.isWideScreen()) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let size = cc.winSize;
                if (size.width / size.height <= 1920 / 1439) {
                    this._isIpad = true;
                }
            } else {
                this._isIpad = true;
            }
        }

        if (bTrueFullScreen && cv.config.IS_FULLSCREEN) {  //iphoneX
            this._isViewX = true;
            this._betContentBg = bet_content_bg_ipx.getComponent(cc.Sprite);
            if (cv.tools.isValidNode(bet_content_bg)) {
                bet_content_bg.removeFromParent(true);
                bet_content_bg.destroy();
            }
            if (cv.tools.isValidNode(bet_content_bg_ipad)) {
                bet_content_bg_ipad.removeFromParent(true);
                bet_content_bg_ipad.destroy();
            }
        }
        else if (this._isIpad) {   //ipad


            this._betContentBg = bet_content_bg_ipad.getComponent(cc.Sprite);
            if (cv.tools.isValidNode(bet_content_bg)) {
                bet_content_bg.removeFromParent(true);
                bet_content_bg.destroy();
            }
            if (cv.tools.isValidNode(bet_content_bg_ipx)) {
                bet_content_bg_ipx.removeFromParent(true);
                bet_content_bg_ipx.destroy();
            }

        } else {   //普通分辨率

            this._betContentBg = bet_content_bg.getComponent(cc.Sprite);
            if (cv.tools.isValidNode(bet_content_bg_ipx)) {
                bet_content_bg_ipx.removeFromParent(true);
                bet_content_bg_ipx.destroy();
            }
            if (cv.tools.isValidNode(bet_content_bg_ipad)) {
                bet_content_bg_ipad.removeFromParent(true);
                bet_content_bg_ipad.destroy();
            }
        }

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {

            let _bgName = bTrueFullScreen ? "bet_content_ipx" : "bet_content";
            if (this._isIpad) {
                _bgName = "bet_content_ipad";
            }
            cv.resMgr.setSpriteFrame(this._betContentBg.node, "en_US/game/cowboy/" + _bgName);
        }

        this._betContentBg.node.active = true;
        this._coinNodeByArea = [];
        // for (let i = 0; i < 10; i++) {
        //     let betArea = (this._betContentBg.node.getChildByName(cv.StringTools.formatC("bet_area_%d", i)));
        //     betArea.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
        //         let name: string = event.target.name;//bet_area_0
        //         let areaIdx: number = cv.Number(name.replace("bet_area_", ""));

        //         console.log("betAreaClicked, areaIdx: %d", areaIdx);
        //         if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0)	// 可以下注
        //         {
        //             if (this._curBetButtonIdx < 0) {
        //                 //showCowboyToast(cv.config.getStringData("Cowboy_select_bet_button_first_text"));
        //                 return;
        //             }
        //             else {
        //                 cv.cowboyNet.RequestBet(this.getBetOptionByAreaIdx(areaIdx), this.getCurBetLevel());
        //             }
        //         }
        //         else {
        //             console.log("betAreaClicked, cannot bet, curState: %d, left bet time: %d", cb.getCowboyRoom().curState, this._leftTime);
        //             // showCowboyToast(cv.config.getStringData("Cowboy_cannot_bet_now_text"));
        //         }
        //     }, this);
        //     this._betAreas.push(betArea);
        //     let coin_content = betArea.getChildByName("coin_content");
        //     coin_content.setContentSize(coin_content.width - 40, coin_content.height - 20);
        //     this._betCoinContents.push(coin_content);
        //     this._coinNodeByArea.push([]);

        //     let text_self_bet_num: cc.Label = betArea.getChildByName("text_self_bet_num").getComponent(cc.Label);
        //     let text_total_bet_num: cc.Label = (betArea.getChildByName("text_total_bet_num")).getComponent(cc.Label);
        //     this._textSelfBetNum.push(text_self_bet_num);
        //     this._textTotalBetNum.push(text_total_bet_num);
        //     this._oriTextSelfBetNumPos.push(text_self_bet_num.node.getPosition());
        //     this._oriTextTotalBetNumPos.push(text_total_bet_num.node.getPosition());

        //     let winFlag = (betArea.getChildByName("win_flag")).getComponent(cc.Sprite);
        //     this._sprBetAreaWinFlags.push(winFlag);

        //     let textOddst = (betArea.getChildByName("fnt_odd")).getComponent(cc.Label);
        //     textOddst.string = ("");
        //     this._textBetAreaOdds.push(textOddst);
        // }

        // 下注区域映射
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.RED_WIN, 0);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.EQUAL, 1);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.BLUE_WIN, 2);

        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.HOLE_3_TONG_SAME_SHUN, 3);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.FIVE_NONE_1DUI, 4);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.FIVE_2DUI, 5);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.HOLE_SAME, 6);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.HOLE_A, 7);

        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.FIVE_3_SHUN_TONG_HUA, 8);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.FIVE_3_2, 9);
        this._mapBetOptionArea.add(cb.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4, 10);

        // 按区域索引升序
        let vAreaIdx: number[] = [];
        do {
            this._mapBetOptionArea.forEach((key: number, value: number) => {
                vAreaIdx.push(value);
            });

            vAreaIdx.sort((a: number, b: number): number => {
                return a > b ? 1 : -1;
            });
        } while (0);

        // 对应区域赔率数组
        let vAreaIdxLen = vAreaIdx.length;

        for (let i = 0; i < vAreaIdxLen; ++i) {
            let text_self_bet_num = (this._betContentBg.node.getChildByName("text_self_bet_num_" + i));
            let text_total_bet_num = (this._betContentBg.node.getChildByName("text_total_bet_num_" + i));
            this._textSelfBetNum.push(text_self_bet_num.getComponent(cc.Label));
            this._textTotalBetNum.push(text_total_bet_num.getComponent(cc.Label));
            this._oriTextSelfBetNumPos.push(text_self_bet_num.getPosition());
            this._oriTextTotalBetNumPos.push(text_total_bet_num.getPosition());

            let fnt_odd = (this._betContentBg.node.getChildByName("fnt_odd_" + i)).getComponent(cc.Label);
            fnt_odd.string = ("");
            this._textBetAreaOdds.push(fnt_odd);
        }

        for (let i = 0; i < vAreaIdxLen; ++i) {
            let iAreaIdx = vAreaIdx[i];
            let betArea = (this._betContentBg.node.getChildByName(cv.StringTools.formatC("bet_area_%d", iAreaIdx)));
            let coin_content = (betArea.getChildByName("coin_content"));

            betArea.on(cc.Node.EventType.TOUCH_END, (): void => {
                this.betAreaClicked(iAreaIdx);
            });

            this._betAreas.push(betArea);
            this._betCoinContents.push(coin_content);
            this._coinNodeByArea.push([]);

            let winFlag = (betArea.getChildByName("win_flag"));
            this._sprBetAreaWinFlags.push(winFlag.getComponent(cc.Sprite));

            // 初始化路子信息
            this._initWayOutInfoByAreaIdx(iAreaIdx);
        }
    }

    betAreaClicked(areaIdx: number): void {
        console.log("betAreaClicked, areaIdx: %d", areaIdx);

        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0)	// 可以下注
        {
            if (this._curBetButtonIdx < 0) {
                //showCowboyToast(cv.config.getStringData("Cowboy_select_bet_button_first_text"));
                return;
            }
            else {
                cv.cowboyNet.RequestBet(this.getBetOptionByAreaIdx(areaIdx), this.getCurBetLevel());
            }
        }
        else {
            console.log("betAreaClicked, cannot bet, curState: %d, left bet time: %d", cb.getCowboyRoom().curState, this._leftTime);
            // showCowboyToast(cv.config.getStringData("Cowboy_cannot_bet_now_text"));
        }
    }

    updateBetArea(option: number): void {
        let areaIdx = this.getAreaIdxByBetOption(option);

        // 自己的下注
        let it = cb.getCowboyRoom().selfZoneBet.get(option);
        if (it) {
            this.updateSelfBetAreaCoin(areaIdx, it);
        }

        // 总共的下注
        let it2 = cb.getCowboyRoom().totalZoneBet.get(option);
        if (it2) {
            this.updateTotalBetAreaCoin(areaIdx, it2);
        }
    }

    updateSelfBetAreaCoin(areaIdx: number, coin: number): void {
        let text = this._textSelfBetNum[areaIdx];
        if (!text) return;
        text.node.setPosition(this._oriTextSelfBetNumPos[areaIdx]);

        if (coin >= 100) {
            text.string = (this.getBetAreaCoinString(coin));
        }
        else {
            text.string = ("");
        }
    }

    updateTotalBetAreaCoin(areaIdx: number, coin: number): void {
        let text = this._textTotalBetNum[areaIdx];
        if (!text) return;
        text.node.setPosition(this._oriTextTotalBetNumPos[areaIdx]);

        if (coin >= 100) {
            text.string = (this.getBetAreaCoinString(coin));
        }
        else {
            text.string = ("");
        }
    }

    updateAllBetAreas(): void {
        let tempMap = cb.getCowboyRoom().selfZoneBet;
        // 自己下注详情
        tempMap.forEach(function (key: number, value: number, i: number) {
            this.updateSelfBetAreaCoin(this.getAreaIdxByBetOption(key), value);
        }.bind(this));

        // 总的下注详情
        cb.getCowboyRoom().totalZoneBet.forEach(function (key: number, value: number, i: number) {
            let areaIdx = this.getAreaIdxByBetOption(key);
            let coin = value;
            this.updateTotalBetAreaCoin(areaIdx, coin);

            // 随机位置生成金币
            if (coin > 0) {
                let coinContent = this._betCoinContents[areaIdx];
                coinContent.destroyAllChildren();
                coinContent.removeAllChildren(true);
                let sz = coinContent.getContentSize();

                //let betDetails = getBetDetailAmounts(coin);
                let betDetails = this.getAllBetDetailAmounts(key);
                for (let j = 0; j < betDetails.length; j++) {
                    let flyCoin: cc.Sprite = this.createFlyCoin(areaIdx, betDetails[j]);
                    let coinFlyBorn: cc.Vec2 = this.getRandPos(sz, flyCoin.node);
                    coinFlyBorn = this._coinNode.convertToNodeSpaceAR(coinContent.convertToWorldSpaceAR(coinFlyBorn));

                    flyCoin.node.setPosition(coinFlyBorn);
                }
            }
        }.bind(this));
    }

    initBetCountDown(): void {
        this._betCountDownBg = (this._gameContent.getChildByName("bet_count_down_bg")).getComponent(cc.Sprite);
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cb.loadSpriteTextureByPlist(this.language_PLIST, this._betCountDownBg, "bet_count_down");
        }
        this._textCountDown = (this._betCountDownBg.node.getChildByName("text_count_down")).getComponent(cc.Label);
        this._oriBetCountDownBgPos = this._betCountDownBg.node.getPosition();
    }

    hideBetCountDown(): void {
        this._betCountDownBg.node.stopAllActions();
        this._betCountDownBg.node.active = false;
        this._betCountDownBg.node.setPosition(this._oriBetCountDownBgPos);
        this.unschedule(this.updateBetTimer);
    }

    updateBetCoutDown(): void {
        this.hideBetCountDown();
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0)	// 可以下注
        {
            this._betCountDownBg.node.active = (true);
            this._textCountDown.string = (cv.StringTools.formatC("%lld", this._leftTime));
            this.schedule(this.updateBetTimer, 1.0);
        }
    }

    updateBetTimer(f32Delta: number): void {
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0) {
            this._betCountDownBg.node.active = (true);
            this._textCountDown.string = (cv.StringTools.formatC("%lld", this._leftTime));
            this.playCowboyEffect(this.s_time_tick);
        }
        else {
            this._textCountDown.string = ("0");
        }
    }

    hideGameTips(): void {
        this._gameTipsBg.node.active = false;
        this.unschedule(this.updateNextRoundTipsTimer);
    }

    showNextRoundTips(): void {
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.WAIT_NEXT_ROUND && this._leftTime > 0) {
            this.clearRound();
            this._gameTipsBg.node.active = (true);
            //this._gameTipsBg.active = false;
            this._textGameTips.string = (cv.StringTools.formatC(cv.config.getStringData("Cowboy_game_tips_wait_next_round_text"), this._leftTime));
            this.unschedule(this.updateNextRoundTipsTimer);
            this.schedule(this.updateNextRoundTipsTimer, 1.0);

            if (this._waitForNextRoundAnim.active && this._leftTime <= this._waitForNextRoundOutTheshould) {
                this.showWaitForNextRoundOutAnim();
            }
        }
    }

    updateNextRoundTipsTimer(f32Delta: number): void {
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.WAIT_NEXT_ROUND && this._leftTime > 0) {
            this._textGameTips.string = (cv.StringTools.formatC(cv.config.getStringData("Cowboy_game_tips_wait_next_round_text"), this._leftTime));

            if (this._waitForNextRoundAnim.active && this._leftTime <= this._waitForNextRoundOutTheshould) {
                this.showWaitForNextRoundOutAnim();
            }
        }
        else {
            this.hideGameTips();
        }
    }

    showSendCardTips(): void {
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.NEW_ROUND) {
            // 暂时不要提示
            //this._gameTipsBg..node.active = (true);
            this._gameTipsBg.node.active = false;
            this._textGameTips.string = (cv.config.getStringData("Cowboy_game_tips_send_card_text"));
        }
    }

    showOpenCardTips(): void {
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.WAIT_NEXT_ROUND
            && this._leftTime > this._betWinFlagsAndFlyCoinsDuration + this._showNextRoundDuration) {
            // 暂时不要提示
            //this._gameTipsBg..node.active = (true);
            this._gameTipsBg.node.active = false;
            this._textGameTips.string = (cv.config.getStringData("Cowboy_game_tips_open_card_text"));
        }
    }

    initPlayersInfo(): void {
        // 自己
        this.self_panel = (this._bottomPanel.getChildByName("self_panel"));
        this._textNickName = (this.self_panel.getChildByName("text_nickname")).getComponent(cc.Label);
        this._textCoin = (this.self_panel.getChildByName("text_coin")).getComponent(cc.Label);
        this._selfHeadBg = (this.self_panel.getChildByName("img_head_box"));
        this._selfCoin = (this.self_panel.getChildByName("own_coin")).getComponent(cc.Sprite);

        // 其他玩家
        this._leftPlayerPanel = (this.node.getChildByName("leftPlayerPanel"));
        this._rightPlayerPanel = (this.node.getChildByName("rightPlayerPanel"));

        let bIpad = this._isIpad;

        this.setLeftAndRightList();

        for (let i = 0; i < 5; i++) {
            {
                let player = new OtherPlayerHead();
                let playerBg = (this._leftPlayerPanel.getChildByName(cv.StringTools.formatC("player_%d", i))).getComponent(cc.Sprite);
                player.bg = playerBg;
                player.textCoin = (this._leftPlayerPanel.getChildByName("text_coin_" + i)).getComponent(cc.Label);
                if (i == 0) {
                    player.nbFlag = (playerBg.node.getChildByName("nb_flag")).getComponent(cc.Sprite);
                    player.nbFlag.node.zIndex = (11);
                    (player.nbFlag.node.getChildByName("nb_flag_desc")).getComponent(cc.Label).string = (cv.StringTools.formatC(cv.config.getStringData("Cowboy_fuhao_no_text"), 1));
                }
                if (!bIpad && i == 4) {
                    playerBg.node.active = false;
                    player.textCoin.node.active = false;
                } else {
                    this._otherPlayerHeads.push(player);
                }

            }
            {
                let player = new OtherPlayerHead();
                let playerBg = (this._rightPlayerPanel.getChildByName(cv.StringTools.formatC("player_%d", i))).getComponent(cc.Sprite);
                player.bg = playerBg;
                player.textCoin = (this._rightPlayerPanel.getChildByName("text_coin_" + i)).getComponent(cc.Label);
                if (i == 0) {
                    player.nbFlag = (playerBg.node.getChildByName("nb_flag")).getComponent(cc.Sprite);
                    player.nbFlag.node.zIndex = (11);
                    (player.nbFlag.node.getChildByName("nb_flag_desc")).getComponent(cc.Label).string = cv.config.getStringData("Cowboy_shensuanzi_text");
                }
                if (!bIpad && i == 4) {
                    playerBg.node.active = false;
                    player.textCoin.node.active = false;
                } else {
                    this._otherPlayerHeads.push(player);
                }
            }
        }
    }

    // iPad/iPhoneX等宽窄屏适配
    adaptiveScreen(): void {
        if (this._openIphoneXAdapter && cv.config.IS_FULLSCREEN) {

            let tmp_x = cv.viewAdaptive.IPHONEX_OFFSETY - 25;
            // this._leftPlayerPanel.setPosition(this._leftPlayerPanel.x + tmp_x, this._leftPlayerPanel.y);
            // this._rightPlayerPanel.setPosition(this._rightPlayerPanel.x - tmp_x, this._rightPlayerPanel.y);
            this._btnMenu.node.setPosition(this._leftPlayerPanel.x, this._btnMenu.node.y);
            this._btnPlayerList.node.setPosition(this._rightPlayerPanel.x, this._btnPlayerList.node.y);
            let newHeadPos =
                this._btnMenu.node.parent.convertToWorldSpaceAR(this._btnMenu.node.position);
            newHeadPos = this._selfHeadBg.parent.convertToNodeSpaceAR(newHeadPos);
            this.self_panel.setPosition(this.self_panel.x + newHeadPos.x - this._selfHeadBg.x, this.self_panel.y);
        }
        else if (this._isIpad) {


            let heroOffsetY = 166;
            let cardOffsetY = 170;
            let headOffsetY = 60;
            let temp_x = 10;
            let img = this._heroBoy.node;
            if (img.parent.convertToWorldSpaceAR(img.position).y + img.height * 0.5 + cardOffsetY > this._topBg.node.parent.convertToWorldSpaceAR(this._topBg.node.position).y + this._topBg.node.height * 0.5) return;


            // this._leftPlayerPanel.setPosition(this._leftPlayerPanel.x - temp_x, this._leftPlayerPanel.y + headOffsetY);
            // this._rightPlayerPanel.setPosition(this._rightPlayerPanel.x + temp_x, this._rightPlayerPanel.y + headOffsetY);

            this._heroBoy.node.setPosition(this._heroBoy.node.x, heroOffsetY + this._heroBoy.node.y);
            this._heroCow.node.setPosition(this._heroCow.node.x, heroOffsetY + this._heroCow.node.y);

            this._cardPanel.setPosition(this._cardPanel.x, cardOffsetY + this._cardPanel.y);
            this._betCountDownBg.node.setPosition(this._betCountDownBg.node.x, cardOffsetY + this._betCountDownBg.node.y);

            this._oriBetCountDownBgPos = this._betCountDownBg.node.getPosition();
            this._btnMenu.node.getComponent(cc.Widget).top = 68;
            cv.resMgr.adaptWidget(this._btnMenu.node);
            this._btnMenu.node.setPosition(this._leftPlayerPanel.x, this._btnMenu.node.y);
        }
    }

    adaptiveBetBtnPanel(): void {
        // 若为空, 则填充按钮数组
        if (this._vBottomBetBtns.length == 0) {
            // 下注按钮
            let betButtons_len = cv.StringTools.getArrayLength(this._betButtons);
            for (let i = 0; i < betButtons_len; ++i) {
                this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._betButtons[i].node, this._fBetBtnSrcScaleRate));
            }

            // 续投按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btnBetAuto.node, this._btnBetAuto.node.scale));

            // 清屏按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btnBetClean.node, this._btnBetClean.node.scale));

            // 红包节按钮
            this._vBottomBetBtns.push(new MiniGameCommonDef.tGameNodeScale(this._btn_redpacket_festival, this._btn_redpacket_festival.scale));
        }

        let w = this._btnPlayerList.node.x - this._btnPlayerList.node.getContentSize().width / 2;
        w -= (this.self_panel.x + this.self_panel.getContentSize().width / 2);
        this._panel_betbtn.setContentSize(cc.size(w, this._panel_betbtn.getContentSize().height));
        this._panel_betbtn.setPosition(this.self_panel.x + w / 2 + this.self_panel.getContentSize().width / 2, this._panel_betbtn.y);

        let iTotal_w = 0;			// 所有可见子节点宽度和
        let iSpacing_x = 0;			// 子节点之间的间距
        let iChildrenCount = 0;		// 可见的子节点个数

        let vBottomBetBtns_len = cv.StringTools.getArrayLength(this._vBottomBetBtns);
        for (let i = 0; i < vBottomBetBtns_len; ++i) {
            let node = this._vBottomBetBtns[i].node;
            let fScale = this._vBottomBetBtns[i].scale;
            if (node.active) {
                ++iChildrenCount;
                iTotal_w += node.getContentSize().width * fScale;
            }
        }

        iSpacing_x = (this._panel_betbtn.getContentSize().width - iTotal_w) / (iChildrenCount + 1);

        let iLast_w = -this._panel_betbtn.width * 0.5;
        for (let i = 0; i < vBottomBetBtns_len; ++i) {
            let node = this._vBottomBetBtns[i].node;
            let fScale = this._vBottomBetBtns[i].scale;
            if (node.active) {
                let szNode = node.getContentSize();
                let x = iLast_w + iSpacing_x + szNode.width * fScale / 2;
                let pos = this._panel_betbtn.convertToWorldSpaceAR(cc.v2(x, 0));
                pos = node.getParent().convertToNodeSpaceAR(pos);
                node.setPosition(pos.x, node.y);
                iLast_w = pos.x + szNode.width * fScale / 2;
            }
        }

        // 适配红包节入口节点提示层
        if (this._btn_redpacket_festival_layer) {
            let wpos: cc.Vec2 = this._btn_redpacket_festival.convertToWorldSpaceAR(cc.Vec2.ZERO);
            this._btn_redpacket_festival_layer.setPosition(this._btn_redpacket_festival_layer.parent.convertToNodeSpaceAR(wpos));
        }

        // 适配高级续投提示语位置
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptAdvanceAutoTipsPos(this._btnBetAuto.node);
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptAdvanceAutoCountPos(this._btnBetAuto.node);
        }
    }

    getPlayerCoinNodesByUid(uid: number): cc.Node[] {
        let ret: cc.Node[] = [];
        if (uid == cv.dataHandler.getUserData().u32Uid) {
            ret.push(this._selfCoin.node);
        }

        let len = this._otherPlayerHeads.length;
        for (let i = 0; i < len; i++) {
            if (this._otherPlayerHeads[i].uid == uid) {
                ret.push(this._otherPlayerHeads[i].bg.node);
            }
        }
        return ret;
    }

    getPlayerHeadNodesByUid(uid: number): cc.Node[] {
        let ret: cc.Node[] = [];
        if (uid == cv.dataHandler.getUserData().u32Uid) {
            ret.push(this._selfHeadBg);
        }

        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            if (this._otherPlayerHeads[i].uid == uid) {
                ret.push(this._otherPlayerHeads[i].bg.node);
            }
        }
        return ret;
    }

    updatePlayerCoin(uid: number): void {
        if (uid == cv.dataHandler.getUserData().u32Uid) {
            this._textCoin.string = (this.getShortOwnCoinString(cb.getCowboyRoom().selfPlayer.curCoin));
        }

        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            if (this._otherPlayerHeads[i].uid == uid) {
                // 神算子/富豪是自己的情況
                if (uid == cv.dataHandler.getUserData().u32Uid) {
                    this._otherPlayerHeads[i].textCoin.string = (this.getShortOwnCoinString(cb.getCowboyRoom().selfPlayer.curCoin));
                }
                else {
                    let player = cb.getCowboyRoom().getOtherPlayerByUid(uid);
                    if (player) {
                        this._otherPlayerHeads[i].textCoin.string = (this.getShortOwnCoinString(player.curCoin));
                        // player.reset();
                    }
                }
            }
        }
    }

    getShortOwnCoinString(coin: number): string {
        let formatCoin = cv.StringTools.clientGoldByServer(coin);
        if (cv.StringTools.numberToShowNumber(formatCoin) < 10000) {
            return cv.StringTools.numberToString(formatCoin);
        }
        else {
            return cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(coin / 10000)) + cv.config.getStringData("Cowboy_coin_short_text");
        }
    }

    // 下注区域金币：超过10万显示xxW
    getBetAreaCoinString(coin: number): string {
        let formatCoin = cv.StringTools.clientGoldByServer(coin);
        if (cv.StringTools.numberToShowNumber(formatCoin) < 100000) {
            return cv.StringTools.numberToString(formatCoin);
        }
        else {
            return cv.StringTools.formatC("%lld", cv.StringTools.numberToShowNumber(formatCoin) / 10000) + cv.config.getStringData("Cowboy_coin_short_text");
        }
    }

    updateSelfCoin(): void {
        this._textCoin.string = (this.getShortOwnCoinString(cb.getCowboyRoom().selfPlayer.curCoin));
    }

    updateOtherCoin(): void {
        let len = this._otherPlayerHeads.length;
        let otherPlayersInfo = cb.getCowboyRoom().otherPlayers;
        let infoLen = otherPlayersInfo.length;
        for (let i = 0; i < len; i++) {
            if (i < infoLen) {
                let info = otherPlayersInfo[i];
                this._otherPlayerHeads[i].textCoin.string = (this.getShortOwnCoinString(info.curCoin));
            }
        }
    }

    updateSelfInfo(): void        // 未处理
    {
        // this._textNickName.string = cb.getCowboyRoom().selfPlayer.name;
        cv.StringTools.setShrinkString(this._textNickName.node, cb.getCowboyRoom().selfPlayer.name, true);
        this._textCoin.string = (this.getShortOwnCoinString(cb.getCowboyRoom().selfPlayer.curCoin));

        // 头像
        //    let this._selfHeadBg.getChildByName(_HEAD_IMG_TAG);
        //     let head = CowboyHeadSprite. create("self_head_default", "head_mask");
        //     head.setTag(_HEAD_IMG_TAG);
        //     head.setAnchorPoint(Vec2. ANCHOR_MIDDLE);
        //     head.setPosition(this._selfHeadBg.getContentSize() / 2);
        let headUrl = cb.getCowboyRoom().selfPlayer.head;
        // head.UpdateSpriteFromUrl(headUrl);
        // this._selfHeadBg.addChild(head, 9);
        CircleSprite.setCircleSprite(this._selfHeadBg, headUrl);
    }

    updateOtherPlayersInfo(): void        //未处理
    {
        // 这里按照服务器发的gamePlayers顺序放
        let len = this._otherPlayerHeads.length;
        let otherPlayersInfo = cb.getCowboyRoom().otherPlayers;
        let infoLen = otherPlayersInfo.length;
        for (let i = 0; i < len; i++) {
            if (i < infoLen) {
                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._otherPlayerHeads[i].bg, "player_bg");
                if (this._otherPlayerHeads[i].nbFlag) {
                    this._otherPlayerHeads[i].nbFlag.node.active = (true);
                }

                let info = otherPlayersInfo[i];
                this._otherPlayerHeads[i].uid = info.uid;
                this._otherPlayerHeads[i].textCoin.string = (this.getShortOwnCoinString(info.curCoin));

                // 头像更新
                let headBg = this._otherPlayerHeads[i].bg;
                let head = headBg.node.getChildByName(this._HEAD_IMG_TAG);
                if (!head) {
                    head = (new cc.Node());
                    head.addComponent(cc.Sprite);
                    cv.resMgr.setSpriteFrame(head, "zh_CN/game/cowboy/head/display_base");

                    // let headSprite = head.addComponent(cc.Sprite);               
                    // if (info.uid == cv.dataHandler.getUserData().u32Uid) {
                    //     cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, headSprite, "self_head_default_2");
                    // }
                    // else {
                    //     cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, headSprite, "other_head_default");
                    // }
                    head.name = (this._HEAD_IMG_TAG);
                    head.setAnchorPoint(cc.v2(0.5, 0.5));
                    // head.setPosition(headBg.getContentSize() / 2);
                    head.setPosition(cc.v2(0, 15));//head.getPosition() + 
                    headBg.node.addChild(head, 9);
                    head.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
                    head.getComponent(cc.Sprite).trim = true;

                    head.active = false;
                }
                let headUrl = info.head;
                CircleSprite.setCircleSprite(head, headUrl, 0, undefined, Head_Mode.IRREGULAR, true, true, false);
            }
            else {
                let win_player_win_count = this.node.getChildByName("win_player_win_count_" + this._otherPlayerHeads[i].bg.node.uuid);
                if (cv.tools.isValidNode(win_player_win_count)) {
                    win_player_win_count.removeFromParent(true);
                    win_player_win_count.destroy();
                }

                let headBg = this._otherPlayerHeads[i].bg;
                let head = headBg.node.getChildByName(this._HEAD_IMG_TAG);
                if (head) {
                    head.active = false;
                    let circleHeadNode = CircleSprite.getHeadNode(head);
                    if (circleHeadNode) {
                        circleHeadNode.parent.active = false;
                    }
                }
                this._otherPlayerHeads[i].uid = 0;
                // this._otherPlayerHeads[i].bg.removeChildByTag(_HEAD_IMG_TAG);

                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._otherPlayerHeads[i].bg, "player_bg_2");
                this._otherPlayerHeads[i].textCoin.string = ("");
                if (this._otherPlayerHeads[i].nbFlag) {
                    this._otherPlayerHeads[i].nbFlag.node.active = false;
                }
            }
        }
    }

    initGuide(): void {
        let storeGuideKey = "cowboy_has_show_guide_2";
        if (cv.tools.GetStringByCCFile(storeGuideKey) != "true") {
            let panelRecord = (this._topBg.node.getChildByName("panelRecord"));
            for (let i = 0; i < this._recordNum; i++) {
                this._recordDotsTemp.push((panelRecord.getChildByName(cv.StringTools.formatC("recordDot%d", i))).getComponent(cc.Sprite));
            }

            if (!this._humanboyGuid) {
                this._humanboyGuid = cc.instantiate(this.humanboyGuid_prefab);
                this.node.addChild(this._humanboyGuid, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_GUIDE);
            }
            let guidLayer = this._humanboyGuid.getComponent(HumanboyGuid);
            guidLayer.setDescString(cv.config.getStringData("Cowboy_ludan_guide_text"));

            guidLayer.show(this._topBg.node, () => {
                let hasShowGuide = "true";
                cv.tools.SaveStringByCCFile(storeGuideKey, hasShowGuide);

                cv.cowboyNet.RequestTrend();
                this._cowboyChart.active = true;
                cv.MessageCenter.send("on_display_page1");
                this.playCowboyEffect(this.s_button);
                cv.StringTools.clearArray(this._recordDotsTemp);
            }, true);
        }
    }

    initChart() {
        this._cowboyChart = cc.instantiate(this.cowboyChart);
        this._cowboyChart.setAnchorPoint(0.5, 0.5);
        this._cowboyChart.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
        this.node.addChild(this._cowboyChart);
        this._cowboyChart.active = false;
        cv.cowboyNet.RequestTrend();
    }

    onGuideBgClick(event: cc.Event) {
        event.stopPropagation();
    }

    onGuideTopBgClick(event: cc.Event) {
        let storeGuideKey = "cowboy_has_show_guide_2";
        let hasShowGuide = "true";
        cv.tools.SaveStringByCCFile(storeGuideKey, hasShowGuide);
        //this._topBgTemp.node.parent.active = false;
        cv.cowboyNet.RequestTrend();
        this.playCowboyEffect(this.s_button);
        //this._topBgTemp.node.removeFromParent();
        this._recordDotsTemp = [];
    }

    openShop(sender: any): void {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) return;
        if (!cc.sys.isBrowser) {
            cv.viewAdaptive.isselfchange = true;
            cv.viewAdaptive.cowboyroomid = cb.getCowboyRoom().u32RoomId;
            this.backToMainScene();
        }
        else {
            cv.SHOP.RechargeClick();
        }
    }

    initButtonEvents(): void {
        // 菜单按钮
        this._btnMenu = (this.node.getChildByName("btnMenu")).getComponent(cc.Button);
        this._btnMenu.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');

            if (!this._humanboyMenu) {
                this._humanboyMenu = cc.instantiate(this.HumanboyMenu_prefab);
                let menuLayer = this._humanboyMenu.getComponent(HumanboyMenu);
                this.node.addChild(this._humanboyMenu, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);

                // 菜单 - 兑换
                menuLayer.getBtnExchange().node.on("click", (event: cc.Event): void => {
                    this.playCowboyEffect(this.s_button);
                    menuLayer.hide(false);

                    if (cv.dataHandler.getUserData().usdt <= 0) {
                        cv.TT.showMsg(cv.config.getStringData("USDTView_ex_coin_error_0_usdt"), cv.Enum.ToastType.ToastTypeError);
                        return;
                    }
                    if (!this._cowboyExchange) {
                        this._cowboyExchange = cc.instantiate(this.humanboyExchange_prefab).getComponent(HumanboyExchange);
                        this.node.addChild(this._cowboyExchange.node, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
                    }
                    else {
                        this._cowboyExchange.openView();
                    }
                });

                // 菜单 - 规则
                menuLayer.getBtnRule().node.on("click", (event: cc.Event): void => {
                    this.playCowboyEffect(this.s_button);
                    menuLayer.hide(false);

                    if (this._cowboyRule == null) {
                        this._cowboyRule = cc.instantiate(this.cowboyRule);
                        this._cowboyRule.setAnchorPoint(cc.v2(0.5, 0.5));
                        this._cowboyRule.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
                        this.node.addChild(this._cowboyRule);
                    }
                    else {
                        this._cowboyRule.getComponent(CowboyRule).openView();
                    }
                });

                // 菜单 - 音效设置
                menuLayer.getBtnSoundSetting().node.on("click", (event: cc.Event): void => {
                    this.playCowboyEffect(this.s_button);
                    menuLayer.hide(false);
                    if (this._cowboySetting == null) {
                        this._cowboySetting = cc.instantiate(this.cowboySetting);
                        this._cowboySetting.setAnchorPoint(cc.v2(0.5, 0.5));
                        this._cowboySetting.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
                        this.node.addChild(this._cowboySetting);
                    }
                    else {
                        this._cowboySetting.getComponent(CowboySetting).initSwitch();
                        this._cowboySetting.active = true;
                    }
                });

                // 菜单 - 高级设置
                menuLayer.getBtnAdvancedSetting().node.on("click", (event: cc.Event): void => {
                    this.playCowboyEffect(this.s_button);
                    menuLayer.hide(false);

                    if (!this._humanboyAdvancedSetting) {
                        this._humanboyAdvancedSetting = cc.instantiate(this.humanboyAdvancedSetting_prefab);
                        this.node.addChild(this._humanboyAdvancedSetting, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
                    }
                    this._humanboyAdvancedSetting.getComponent(HumanboyAdvancedSetting).show();
                });

                // 菜单 - 退出
                menuLayer.getBtnExit().node.on("click", (event: cc.Event): void => {
                    this.playCowboyEffect(this.s_button);
                    menuLayer.hide(false);

                    let iUsedAutoBetCount = cb.getCowboyRoom().iUsedAutoBetCount;
                    let iSelectAutoBetCount = cb.getCowboyRoom().iSelectAutoBetCount;
                    if (iSelectAutoBetCount > 0) {
                        let dialogNode = cc.instantiate(this.HumanboyDialog_prefab);

                        dialogNode.getComponent(HumanboyDialog).show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_exit_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                            , cv.config.getStringData("CowBoy_btn_desc_exit_game"), cv.config.getStringData("CowBoy_btn_desc_resume_game")
                            , (dialog: HumanboyDialog) => {
                                cv.cowboyNet.RequestLeaveRoom();
                            }, (dialog: HumanboyDialog) => { });

                        this.node.addChild(dialogNode, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
                    }
                    else {
                        if (this._cowboyExit == null) {
                            this._cowboyExit = cc.instantiate(this.cowboyExit);
                            this._cowboyExit.setAnchorPoint(cc.v2(0.5, 0.5));
                            this._cowboyExit.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
                            this.node.addChild(this._cowboyExit);
                        }
                        else {
                            this._cowboyExit.active = true;
                        }
                        this.playCowboyEffect(this.s_button);
                    }
                });
            }

            this._humanboyMenu.getComponent(HumanboyMenu).show(true);
            this._humanboyMenu.getComponent(HumanboyMenu).setMenuPosition(cc.v2(this._btnMenu.node.x, this._btnMenu.node.y - this._btnMenu.node.height / 2));
        });

        // 玩家列表
        this._btnPlayerList = (this._bottomPanel.getChildByName("btnPlayerList")).getComponent(cc.Button);
        this._btnPlayerList.node.on("click", (event: cc.Event): void => {
            cv.cowboyNet.RequestPlayerList();
            this.playCowboyEffect(this.s_button);
        });

        // 商店
        this.self_panel = (this._bottomPanel.getChildByName("self_panel"));
        let btn_shop_valid = (this.self_panel.getChildByName("btn_shop_valid"));
        btn_shop_valid.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                // document.location.href = "ccjs://recharge";
            }
            else {
                this.openShop(null);
            }
        });
    }
    onGoldViewShop() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            // document.location.href = "ccjs://recharge";
        }
        else {
            this.openShop(null);
        }
    }

    initBetButtons(): void {
        this._betButtons = [];
        this._betButtonTexts = [];
        this._betButtonMasks = [];

        for (let betBtnIdx = 0; betBtnIdx < this._betButtonNum; betBtnIdx++) {
            let btnBet = (this._panel_betbtn.getChildByName("btn_bet_" + betBtnIdx)).getComponent(cc.Button);
            //std.string betBtnPng = betBtnIdx <= 2 ? "bet_coin_normal" : "bet_block_normal";
            //btnBet.loadTextures(betBtnPng, betBtnPng, "", cocos2d.ui.Widget.TextureResType.PLIST);
            this._betButtons.push(btnBet);
            this._betButtonTexts.push(btnBet.node.getChildByName("textBet"));
            this._betButtonMasks.push((btnBet.node.getChildByName("imgMask")).getComponent(cc.Sprite));

            btnBet.node.on("click", (event: cc.Event): void => {
                console.log("GameCowboyScene btnBet %d clicked", betBtnIdx);
                this.betButtonSelected(betBtnIdx);
                this.playCowboyEffect(this.s_button);
            }, this);
        }

        // 初始化高级续投面板
        if (!this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto = cc.instantiate(this.HumanboyAdvancedAuto_prefab);
            this.node.addChild(this._humanboyAdvancedAuto, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_ADVANCE_AUTO_SELECT);
        }

        // 续投按钮
        this._btnBetAuto = (this._panel_betbtn.getChildByName("btn_bet_auto")).getComponent(cc.Button);
        this._btnBetAuto.node.on("click", (event: cc.Event) => {
            this.playCowboyEffect(this.s_button);

            switch (this._eAutoBtnStyle) {
                // 常规续投点击
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                    cv.cowboyNet.RequestAutoBet();
                } break;

                // 高级续投已激活(再次点击 弹出高级续投选项面板)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                    // if (cb.getCowboyRoom().curState == RoundState.BET) {
                    this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptSelectPanelPos(this._btnBetAuto.node);
                    this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).showSelectPanel(true);
                    // }
                } break;

                // 高级续投中(再次点击取消)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                    let iUsedAutoBetCount = cb.getCowboyRoom().iUsedAutoBetCount;
                    let iSelectAutoBetCount = cb.getCowboyRoom().iSelectAutoBetCount;
                    let HumanboyDialog_node = (cc.instantiate(this.HumanboyDialog_prefab)).getComponent(HumanboyDialog);
                    HumanboyDialog_node.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_stop_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                        , cv.config.getStringData("CowBoy_btn_desc_stop_auto_bet"), cv.config.getStringData("CowBoy_btn_desc_resume_auto_bet")
                        , (dialog: HumanboyDialog) => { cv.cowboyNet.ReqCancelAdvanceAutoBet(); }, (dialog: HumanboyDialog) => { });

                    this.node.addChild(HumanboyDialog_node.node, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
                } break;

                default:
                    break;
            }
        });

        // 清屏按钮
        this._btnBetClean = (this._panel_betbtn.getChildByName("btn_bet_clean")).getComponent(cc.Button);
        cv.resMgr.loadButtonTextureByPlist(this.language_PLIST, this._btnBetClean.node, "clean_screen_normal", "clean_screen_normal", "clean_screen_normal", "clean_screen_gray");
        this._btnBetClean.node.on("click", (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('button_click');
            this.clearAllBetAreaCoins();
        });
    }

    /**
     * 初始化红包等相关按钮入口
     */
    private initRedPackage(): void {
        // 红包节按钮
        this._btn_redpacket_festival = this._panel_betbtn.getChildByName("btn_redpacket_festival");
        this._btn_redpacket_festival.getComponent(cc.Sprite).spriteFrame = null;
        this._btn_redpacket_festival.active = false;

        // 红包节按钮提示层
        this._btn_redpacket_festival_layer = cc.instantiate(this._btn_redpacket_festival);
        this.node.addChild(this._btn_redpacket_festival_layer, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_RED_PACKAGE);

        let wpos: cc.Vec2 = cc.Vec2.ZERO;
        this._btn_redpacket_festival.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
        this._btn_redpacket_festival_layer.setPosition(this._btn_redpacket_festival_layer.parent.convertToNodeSpaceAR(wpos));

        // 初始执行一次
        this.showLuckButton();
    }

    clearAllBetAreaCoins(): void {
        let betAreas_len = cv.StringTools.getArrayLength(this._betAreas);
        for (let i = 0; i < betAreas_len; i++) {
            this.hideAreaCoin(i, false);
        }
    }
    resetAllBetButtons(): void {
        let len = this._betButtons.length;
        for (let i = 0; i < len; i++) {
            this._betButtons[i].node.setScale(this._fBetBtnSrcScaleRate, this._fBetBtnSrcScaleRate);
            this._betButtonTexts[i].active = (true);
            this._betButtonMasks[i].node.active = (false);
            this._betButtons[i].enabled = true;
        }
        this._curBetButtonIdx = -1;
    }

    betButtonSelected(betBtnIdx: number, ignoreCheckCoin?: boolean): void {  //未完
        ignoreCheckCoin = ignoreCheckCoin == true ? true : false;
        this.resetAllBetButtons();
        if (!ignoreCheckCoin) {
            this._updateBetButtonState();
        }

        if (betBtnIdx < 0 || betBtnIdx > this._betButtonNum - 1) {
            return;
        }

        this._curBetButtonIdx = betBtnIdx;
        this._betButtons[betBtnIdx].node.setScale(this._fBetBtnTarScaleRate, this._fBetBtnTarScaleRate);
        // let clickedPng = this._curBetButtonIdx <= 2 ? "bet_coin_clicked" : "bet_block_clicked";
        // cb.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[betBtnIdx].node, clickedPng, clickedPng, clickedPng, clickedPng);
        // this._betButtonTexts[betBtnIdx].node.scale = (1.0);
        // cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._betButtonMasks[betBtnIdx], this._curBetButtonIdx <= 2 ? "bet_coin_disable_mask_big" : "bet_block_disable_mask_big");
    }

    updateBetButtonText(): void {
        return;
        // let amountlevel = cb.getCowboyRoom().pkRoomParam.amountLevel;
        // for (let i = 0; i < amountlevel.length; i++) {
        //     if (i < this._betButtonNum) {
        //         //this._betButtonTexts[i].string = (this.getShortOwnCoinString(amountlevel[i]));
        //         this._betButtonTexts[i].string = (cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(amountlevel[i])));
        //     }
        //     else {
        //         console.log("error!! updateBetButtonText amountlevel must be %d, size: %d", this._betButtonNum, amountlevel.length);
        //     }
        // }
    }

    _updateBetOddsDetail(): void {
        let details = cb.getCowboyRoom().pkRoomParam.oddsDetail;
        for (let i = 0; i < details.length; i++) {
            let areaIdx = this.getAreaIdxByBetOption(details[i].option);
            if (this._textBetAreaOdds[areaIdx]) {
                this._textBetAreaOdds[areaIdx].string = (cv.StringTools.clientGoldByServer(details[i].odds) + cv.config.getStringData("Cowboy_odds_text"));
            }
        }
    }

    _updateBetButtonState(): void {
        // 检测下注按钮禁用与否
        let vBetCoinOption = cb.getCowboyRoom().vBetCoinOption;		// 房间下注级别
        let curCoin = cb.getCowboyRoom().selfPlayer.curCoin;			// 当前自身携带金币
        let vBetCoinOption_len = cv.StringTools.getArrayLength(vBetCoinOption);
        for (let i = 0; i < vBetCoinOption_len; ++i) {
            // 钱是否够按钮上的金额
            let llAmountLevel = cv.StringTools.clientGoldByServer(vBetCoinOption[i]);
            if (curCoin >= vBetCoinOption[i]) {
                this._betButtons[i].interactable = true;
                this._betButtons[i].enabled = (true);
                this.setCoinText(this._betButtonTexts[i], llAmountLevel, true);
                // cv.resMgr.getAsyncFontByName("zh_CN/game/cowboy/fnt/bet_btn_num_yellow", (font: cc.Font): void => {
                //     this._betButtonTexts[i].font = font;
                // });
            }
            else {
                this._betButtons[i].interactable = false;
                this._betButtons[i].enabled = (false);
                this.setCoinText(this._betButtonTexts[i], llAmountLevel, false);
                // cv.resMgr.getAsyncFontByName("zh_CN/game/cowboy/fnt/bet_btn_num_gray", (font: cc.Font): void => {
                //     this._betButtonTexts[i].font = font;
                // });                //_resetBetButton(i, false);
            }
        }

        // 检测下注按钮可触摸与否
        let bEffective: boolean = cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0;
        let betButtons_len: number = cv.StringTools.getArrayLength(this._betButtons);
        for (let i = 0; i < betButtons_len; ++i) {
            this._betButtonMasks[i].node.active = (!bEffective);
            this._betButtonMasks[i].enabled = (true);
            this._betButtons[i].enabled = (bEffective);
        }

        // 更新续投按钮状态
        this._updateAutoBetBtnStatus();

        // 更新清屏按钮状态
        this._updateCleanBtnStatus();
    }

    updatBetButtonByCurCoin(): void {
        return;
        // 可以下注的时候才判断
        // if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0) {
        //     let amountlevel = cb.getCowboyRoom().pkRoomParam.amountLevel;
        //     let curCoin = cb.getCowboyRoom().selfPlayer.curCoin;
        //     let len = amountlevel.length;

        //     let disablePng: string = "";
        //     let curStatePng: string = "";

        //     for (let i = 0; i < len; i++) {
        //         if (i < this._betButtonNum) {
        //             // 钱不够按钮上的金额
        //             if (curCoin < amountlevel[i]) {

        //                 if (i == this._curBetButtonIdx) {
        //                     disablePng = i <= 2 ? "bet_coin_disabled_big" : "bet_block_disabled_big";
        //                 }
        //                 else {
        //                     disablePng = i <= 2 ? "bet_coin_disabled" : "bet_block_disabled";
        //                 }

        //                 cb.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, disablePng, disablePng, disablePng, disablePng);
        //                 this._betButtons[i].enabled = (false);
        //                 this._betButtons[i].interactable = false;
        //                 this._betButtonTexts[i].node.color = (cc.Color.BLACK);
        //                 this._betButtonTexts[i].node.opacity = (102);
        //             }
        //             else {
        //                 if (i == this._curBetButtonIdx) {
        //                     curStatePng = i <= 2 ? "bet_coin_clicked" : "bet_block_clicked";
        //                 }
        //                 else {
        //                     curStatePng = i <= 2 ? "bet_coin_normal" : "bet_block_normal";
        //                 }

        //                 cb.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, curStatePng, curStatePng, curStatePng, curStatePng);
        //                 this._betButtons[i].enabled = (true);
        //                 this._betButtons[i].interactable = true;
        //                 this._betButtonTexts[i].node.color = (cc.Color.WHITE);
        //                 this._betButtonTexts[i].node.opacity = (255);
        //             }
        //         }
        //         else {
        //             console.log("error!! this.updatBetButtonByCurCoin amountlevel must be: %d, size: %d", this._betButtonNum, amountlevel.length);
        //         }
        //     }
        // }
    }

    enableAutoBetButton(enabled: boolean): void {
        this._btnBetAuto.enabled = enabled;
        this._btnBetAuto.interactable = enabled;
    }

    _updateAutoBetBtnStatus(): void {
        switch (this._eAutoBtnStyle) {
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._leftTime > 0) {
                    // 当前一局下过注
                    if (cb.getCowboyRoom().hasBetInCurRound) {
                        this.enableAutoBetButton(false);
                    }
                    else {
                        this.enableAutoBetButton(cb.getCowboyRoom().canAuto);
                    }
                }
                else {
                    this.enableAutoBetButton(false);
                }
                break;
            }
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                // 当前一局下过注
                if (cb.getCowboyRoom().hasBetInCurRound) {
                    this.enableAutoBetButton(true);
                }
                else {
                    this.enableAutoBetButton(cb.getCowboyRoom().canAuto);
                }
                break;
            }
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                this.enableAutoBetButton(true);
                break;
            }
            default:
                
                break;
        }
    }

    _updateCleanBtnStatus(): void {
        let bEnable = false;
        if (cb.getCowboyRoom().curState == RoundState.BET && this._leftTime > 0) {
            bEnable = true;
        }

        this._btnBetClean.interactable = (bEnable);
    }

    _updateBetAmountLevel(): void {
        let vBetCoinOption = cb.getCowboyRoom().vBetCoinOption;
        let vBetCoinOption_len = cv.StringTools.getArrayLength(vBetCoinOption);
        for (let i = 0; i < vBetCoinOption_len; ++i) {
            if (i < this._betButtonNum) {
                let llAmountLevel = cv.StringTools.clientGoldByServer(vBetCoinOption[i]);
                if (llAmountLevel < cb.getCowboyRoom().llCoinUICritical) {
                    cb.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, "bet_coin_clicked", "bet_coin_clicked", "bet_coin_clicked", "bet_coin_disabled_big");
                    // this._betButtons[i].loadTextureNormal("bet_coin_clicked.png", TextureResType.PLIST);
                    // this._betButtons[i].loadTexturePressed("bet_coin_clicked.png", TextureResType.PLIST);
                    // this._betButtons[i].loadTextureDisabled("bet_coin_disabled_big.png", TextureResType.PLIST);
                    cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._betButtonMasks[i], "bet_coin_disable_mask_big");
                    this._betButtonMasks[i].node.scale = 1.05;
                    // this._betButtonMasks[i].loadTexture("bet_coin_disable_mask_big.png", TextureResType.PLIST);
                }
                else {
                    cb.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, "bet_block_clicked", "bet_block_clicked", "bet_block_clicked", "bet_block_disabled_big");
                    // _betButtons[i].loadTextureNormal("bet_block_clicked.png", TextureResType.PLIST);
                    // _betButtons[i].loadTexturePressed("bet_block_clicked.png", TextureResType.PLIST);
                    // _betButtons[i].loadTextureDisabled("bet_block_disabled_big.png", TextureResType.PLIST);
                    cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._betButtonMasks[i], "bet_block_disable_mask_big");
                    this._betButtonMasks[i].node.scale = 1.0;
                    // _betButtonMasks[i].loadTexture("bet_block_disable_mask_big.png", TextureResType.PLIST);
                }

                // _betButtons[i].ignoreContentAdaptWithSize(true);
                // _betButtonMasks[i].ignoreContentAdaptWithSize(true);
                // this._betButtonMasks[i].node.setPosition(this._betButtonMasks[i].node.getParent().width / 2, this._betButtonMasks[i].node.getParent().height / 2);
                this.setCoinText(this._betButtonTexts[i], llAmountLevel, true);
                // this._betButtonTexts[i].string = (cv.StringTools.numberToString(llAmountLevel));
                // this._betButtonTexts[i].node.setPosition(this._betButtonTexts[i].node.getParent().width / 2, this._betButtonTexts[i].node.getParent().height / 2);
            }
            else {
                console.log("error!! HumanboyMainView._updateBetAmountLevel vBetCoinOption must be %d, size: %d", this._betButtonNum, vBetCoinOption_len);
            }
        }

        switch (cb.getCowboyRoom().eAutoLevel) {
            case cowboy_proto.AutoBetLevel.Level_Normal: {
                this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL);
            } break;

            case cowboy_proto.AutoBetLevel.Level_Advance: {
                if (cb.getCowboyRoom().iSelectAutoBetCount > 0) {
                    this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING);
                }
                else {
                    this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE);
                }
            } break;

            default:
                break;
        }

        this.adaptiveBetBtnPanel();
    }

    private _setAutoBetBtnStytle(eAutoBtnStyle: MiniGameCommonDef.eGameboyAutoBtnStyle): void {
        // 隐藏高级续投子面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideAdvanceAutoTips();
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideAdvanceAutoCount();
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideSelectPanel(false);
        }

        this._eAutoBtnStyle = eAutoBtnStyle;
        switch (this._eAutoBtnStyle) {
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NONE:
                break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                cb.loadButtonTextureByPlist(this.language_PLIST, this._btnBetAuto.node, "autobet_normal", "autobet_normal", "autobet_normal", "autobet_gray");
                // _btnBetAuto.loadTextureNormal("autobet_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTexturePressed("autobet_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTextureDisabled("autobet_gray.png", TextureResType.PLIST);


            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                cb.loadButtonTextureByPlist(this.language_PLIST, this._btnBetAuto.node, "autobet_block_normal", "autobet_block_normal", "autobet_block_normal", "autobet_block_gray");
                // _btnBetAuto.loadTextureNormal("autobet_block_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTexturePressed("autobet_block_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTextureDisabled("autobet_block_gray.png", TextureResType.PLIST);
            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                cb.loadButtonTextureByPlist(this.language_PLIST, this._btnBetAuto.node, "autobet_block_using", "autobet_block_using", "autobet_block_using", "autobet_block_gray");
                // _btnBetAuto.loadTextureNormal("autobet_block_using.png", TextureResType.PLIST);
                // _btnBetAuto.loadTexturePressed("autobet_block_using.png", TextureResType.PLIST);
                // _btnBetAuto.loadTextureDisabled("autobet_block_gray.png", TextureResType.PLIST);

                if (this._humanboyAdvancedAuto) {
                    this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptAdvanceAutoCountPos(this._btnBetAuto.node);
                    this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).showAdvanceAutoCount();
                }
            } break;

            default:
                break;
        }

        let imgBetAuto: cc.Sprite = this._btnBetAuto.getComponent(cc.Sprite);
        imgBetAuto.type = cc.Sprite.Type.SIMPLE;
        imgBetAuto.sizeMode = cc.Sprite.SizeMode.RAW;
    }

    _getAutoBetBtnStytle(): MiniGameCommonDef.eGameboyAutoBtnStyle {
        return this._eAutoBtnStyle;
    }

    _checkAdvanceAutoReq(): void {
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET && this._getAutoBetBtnStytle() === MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING) {
            if (this._humanboyAdvancedAuto) {
                this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideAdvanceAutoTips();
            }

            if (cb.getCowboyRoom().iUsedAutoBetCount < cb.getCowboyRoom().iSelectAutoBetCount) {
                cv.cowboyNet.reqAdvanceAutoBet();
            }
        }
    }

    clearBetArea(areaIdx: number): void {
        if (cv.StringTools.getArrayLength(this._sprBetAreaWinFlags) > areaIdx) {
            this._sprBetAreaWinFlags[areaIdx].node.active = false;
        }

        this.hideWinFlagAnim(areaIdx);
        this._betCoinContents[areaIdx].destroyAllChildren();
        this._betCoinContents[areaIdx].removeAllChildren(true);
        console.log("clearBetArea-.清理areaIndex = " + areaIdx);
        this.hideAreaCoin(areaIdx, false);
        this.updateSelfBetAreaCoin(areaIdx, 0);
        this.updateTotalBetAreaCoin(areaIdx, 0);
    }

    clearAllBetArea(): void {
        let len = this._betAreas.length;
        for (let i = 0; i < len; i++) {
            this.clearBetArea(i);
        }
    }

    getAreaIdxByBetOption(betOption: number): number {
        return this._mapBetOptionArea.get(betOption);
    }

    getBetOptionByAreaIdx(areaIdx: number): number {
        let betOption = -1;
        this._mapBetOptionArea.forEach(function (key: number, value: number, i: number) {
            if (value == areaIdx) {
                betOption = key;
            }
        })

        if (betOption < 0) {
            console.log("error!! getOptionByAreaIdx -1");
        }
        return betOption;
    }

    getCurBetLevel(): number {
        if (this._curBetButtonIdx < 0) {
            return 0;
        }

        let amountlevel = cb.getCowboyRoom().vBetCoinOption;
        return amountlevel[this._curBetButtonIdx];
    }

    initHistoryDots(): void {
        this._topBg = (this.node.getChildByName("top_bg")).getComponent(cc.Sprite);
        this._topBg.node.active = true;
        this._btnZouShi = (this._topBg.node.getChildByName("btnZouShi")).getComponent(cc.Button);
        this._btnZouShi.enabled = false;
        this._topBg.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            cv.cowboyNet.RequestTrend();
            this._cowboyChart.active = true;
            cv.MessageCenter.send("on_display_page1");
            this.playCowboyEffect(this.s_button);
        }, this);
        let panelRecord = (this._topBg.node.getChildByName("panelRecord"));

        for (let i = 0; i < this._recordNum; i++) {
            this._recordDots.push((panelRecord.getChildByName(cv.StringTools.formatC("recordDot%d", i))).getComponent(cc.Sprite));
            let pos: cc.Vec2 = cc.v2(this._recordDots[i].node.getPosition());
            this._oriRecordDotsPos.push(pos);
        }

        if (panelRecord.getComponent(cc.Mask).enabled) {
            panelRecord.getComponent(cc.Mask).enabled = false;
        }

        this._lastRecordDotWorldPos = panelRecord.convertToWorldSpaceAR(this._recordDots[this._recordNum - 1].node.getPosition());

        // 走势
        this._topBg.node.on("click", (event: cc.Event): void => {
            cv.cowboyNet.RequestTrend();
            this.playCowboyEffect(this.s_button);
        }, this);
    }

    updateDotState(): void {
        this.hideHistoryMoveAnim();

        let historySize = cb.getCowboyRoom().historyResults.length;

        if (historySize == 2) {//historySize == 1 || 
            let recordDotIdx = this._recordNum - 1;
            this._recordDots[recordDotIdx].node.active = (true);
        }

        if (historySize > 2) {
            for (let i = 0; i < this._recordNum; i++) {
                // 逆序取
                let historyIdx = historySize - i - 1;
                let recordDotIdx = this._recordNum - i - 1;
                this._recordDots[recordDotIdx].node.active = (true);

                if (historyIdx <= 0) {
                    this._recordDots[recordDotIdx].node.active = false;
                }
                else {
                    this._recordDots[recordDotIdx].node.active = (true);
                }
            }
        }
    }

    updateHistoryResults(): void {
        this.hideHistoryMoveAnim();

        let historySize = cb.getCowboyRoom().historyResults.length;
        for (let i = 0; i < this._recordNum; i++) {
            // 逆序取
            let historyIdx = historySize - i - 1;
            let recordDotIdx = this._recordNum - i - 1;
            this._recordDots[recordDotIdx].node.active = (true);
            if (this._recordDotsTemp.length > 0) {
                this._recordDotsTemp[recordDotIdx].node.active = (true);
            }
            if (historyIdx < 0) {
                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDots[recordDotIdx], "record_draw");
                this._recordDots[recordDotIdx].node.active = false;

                if (this._recordDotsTemp.length > 0) {
                    cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDotsTemp[recordDotIdx], "record_draw");
                    this._recordDotsTemp[recordDotIdx].node.active = false;
                }
            }
            else {
                let betOption = cb.getCowboyRoom().historyResults[historyIdx];
                let frameName = "record_draw";
                if (betOption == cb.Enum.BetZoneOption.RED_WIN) {
                    frameName = "record_red";
                }
                else if (betOption == cb.Enum.BetZoneOption.BLUE_WIN) {
                    frameName = "record_blue";
                }
                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDots[recordDotIdx], frameName);
                this._recordDots[recordDotIdx].node.active = (true);

                if (this._recordDotsTemp.length > 0) {
                    cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDotsTemp[recordDotIdx], frameName);
                    this._recordDotsTemp[recordDotIdx].node.active = (true);
                }
            }
        }
    }

    updateHistoryResultsPrevious(): void {
        let last = cb.getCowboyRoom().removeCurrentHistoryResult();
        if (last != -1) {
            this.updateHistoryResults();
            cb.getCowboyRoom().addCurrentHistoryResult(last);
        }
    }

    showHistoryMoveAnim(): void {
        if (cb.getCowboyRoom().historyResults.length > 0) {
            // 设置最新胜负标记
            // let betOption = cb.getCowboyRoom().historyResults[cb.getCowboyRoom().historyResults.length - 1];
            // let frameName = "record_draw";
            // if (betOption == cb.Enum.BetZoneOption.RED_WIN) {
            //     frameName = "record_red";
            // }
            // else if (betOption == cb.Enum.BetZoneOption.BLUE_WIN) {
            //     frameName = "record_blue";
            // }
            let len = cv.StringTools.getArrayLength(this._recordDots);
            // console.log("----. len = " + len)
            // cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDots[len - 1], frameName);

            let panelRecord = (this._topBg.node.getChildByName("panelRecord"));
            let tempMsk = panelRecord.getComponent(cc.Mask);
            if (!tempMsk) {
                let msk: any = panelRecord.addComponent(cc.Mask);
                // if (msk) {
                //     msk._createGraphics();
                // }
                msk.type = cc.Mask.Type.RECT;
            }
            else if (!tempMsk.enabled) {
                tempMsk.enabled = true;
            }
            // this._recordDots[len - 1].node.active = true;
            // 位移动画
            let moveOffset = cc.v2(this._oriRecordDotsPos[0].x - this._oriRecordDotsPos[1].x, this._oriRecordDotsPos[0].y - this._oriRecordDotsPos[1].y);

            this.updateDotState();
            let historySize = cb.getCowboyRoom().historyResults.length;

            if (historySize == 1) {
                this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                    this.updateHistoryResults();
                }.bind(this))));
            }
            else {
                for (let i = 0; i < len; i++) {
                    console.log("----2222222----. len = " + len + ", i = " + i)
                    if (this._recordDots[i].node.active == true) {
                        let historySize = cb.getCowboyRoom().historyResults.length;


                        //  {
                        this._recordDots[i].node.runAction(cc.sequence(cc.moveBy(0.3, moveOffset), cc.callFunc(function () {
                            let lenX = cv.StringTools.getArrayLength(this._recordDots);
                            // if (historySize < len)
                            // {
                            //     this._recordDots[i].node.active = false;
                            // }
                            console.log("--------. len = " + len + ", i = " + i)
                            if (i == len - 1) {
                                this.updateHistoryResults();
                            }
                        }.bind(this))));
                        // }
                    }
                }

            }

            cv.MessageCenter.send("cowboy_start_history_move_anim");

            let isOpen = cb.getCowboyRoom().isOpen;
            if (isOpen) {
                cv.cowboyNet.RequestTrend();
            }
        }
    }

    hideHistoryMoveAnim(): void {
        let len = cv.StringTools.getArrayLength(this._recordDots);
        // this._recordDots[len - 1].node.active = false;

        for (let i = 0; i < len; i++) {
            this._recordDots[i].node.stopAllActions();
            this._recordDots[i].node.setPosition(this._oriRecordDotsPos[i]);
        }

        let panelRecord = (this._topBg.node.getChildByName("panelRecord"));
        if (panelRecord.getComponent(cc.Mask).enabled) {
            panelRecord.getComponent(cc.Mask).enabled = false;
        }
    }

    // /////////////////event handlers//////////////////

    addEvent(): void {
        if (this._isAddEvent) {
            return;
        }
        else {
            this._isAddEvent = true;
        }
        cv.MessageCenter.register("on_cowboy_game_round_end_notify", this.OnGameRoundEndNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_deal_notify", this.OnDealNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_start_bet_notify", this.OnStartBetNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_bet_notify", this.OnBetNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_auto_bet_notify", this.OnAutoBetNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_auto_bet_notify_handle_over", this.OnAutoBetNotifyHandleOver.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_leave_room_succ", this.OnLeaveRoomSucc.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_auto_bet_succ", this.OnAutoBetSucc.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_room_param_change_notify", this.OnRoomParamChangeNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_server_error", this.OnServerError.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_kick_notify", this.OnKickNotify.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_join_room_failed", this.OnJoinRoomFailed.bind(this), this.node);
        cv.MessageCenter.register("showShopPanel", this.openShop.bind(this), this.node);

        cv.MessageCenter.register("showLuckButton", this.showLuckButton.bind(this), this.node);                                                 // 红包节
        cv.MessageCenter.register("turntableResultNotice", this.onTurntableResultNotice.bind(this), this.node);

        cv.MessageCenter.register("update_gold", this._onMsgUpdateWorldServerGold.bind(this), this.node);									    // world服金币有变动通知
        cv.MessageCenter.register("on_cowboy_bet_amount_level_change", this._onMsgBetAmountLevelChange.bind(this), this.node);					// 下注级别变更
        cv.MessageCenter.register("on_cowboy_advance_autobet_set", this._onMsgAdvanceAutobetSet.bind(this), this.node);							// 设置高级续投次数成功	
        cv.MessageCenter.register("on_cowboy_advance_autobet", this._onMsgAdvanceAutobet.bind(this), this.node);                                // 高级续投
        cv.MessageCenter.register("on_cowboy_advance_autobet_cancel", this._onMsgAdvanceAutobetCancel.bind(this), this.node);					// 取消高级续投成功
    }

    OnTrendUpdate(): void {
        if (this._cowboyChart != null && cb.getCowboyRoom().showTheNewestTrend == false) {
            this._cowboyChart.getComponent(cowboyChart).resetblink();
            return;
        }

        this._cowboyChart.getComponent(cowboyChart).setData();
    }

    OnPlayerListUpdate(): void {
        if (this._cowboyList == null) {
            this._cowboyList = cc.instantiate(this.cowboyList);
            this._cowboyList.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
            this.node.addChild(this._cowboyList);

            this._cowboyList.getComponent(HumanboyList).setCowboyData();
            this._cowboyList.getComponent(HumanboyList).displayCell(0);
        }
        else {
            this._cowboyList.active = true;
            this._cowboyList.getComponent(HumanboyList).setCowboyData();
            this._cowboyList.getComponent(HumanboyList).displayCell(-1);
        }

    }

    OnGameDataSynNotify(): void {
        this._bSwitchTable = false;
        cb.getCowboyRoom().showTheNewestTrend = true;
        this._vCoinOptimizationDeque.clear();
        this.clearRound();	// 清除场景动态信息
        this.addEvent();

        // 更新场景静态信息
        this.resetLeftTimer();
        this._updateBetAmountLevel();
        this.updatBetButtonByCurCoin();
        this._updateBetButtonState();
        this._updateBetOddsDetail();
        this.updateSelfInfo();
        this.updateOtherPlayersInfo();

        this.updateHistoryResults();
        this.updateAllPlayerWinCount();

        // 根据不同的游戏状态恢复游戏场景
        if (cb.getCowboyRoom().curState == cb.Enum.RoundState.GAME_PENDING)	// 房间新建的，准备开局
        {
            // do nothing
        }
        else if (cb.getCowboyRoom().curState == cb.Enum.RoundState.NEW_ROUND)	// 新的一局
        {
            this.updateCards();
            this._updateAllWayOut();
        }
        else if (cb.getCowboyRoom().curState == cb.Enum.RoundState.BET)	// 下注
        {
            this.updateCards();
            this._updateAllWayOut();
            this.updateAllBetAreas();
            this.updateBetCoutDown();

            // 下注剩余时间大于4s，显示出战动画
            if (this._leftTime > 4) {
                this.showFightBeginAnim();
            }

            // 检测是否正在使用高级续投
            if (cb.getCowboyRoom().canAdvanceAuto) {
                this._checkAdvanceAutoReq();
            }
        }
        else if (cb.getCowboyRoom().curState == cb.Enum.RoundState.WAIT_NEXT_ROUND)	// 处于结束期间并即将开启新的一局
        {
            let isSpecial = this.isResultSpecialCardType();
            let _specialDuration = isSpecial ? this._specialCardTypeDuration : 0;	// 特殊牌型动画时间
            if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration + this._showHandCardsDuration + this._fightEndDuration + this._betCountDownEndDuration) {
                cb.getCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.showWaitForNextRoundInAnim();
                this.updateAllCardsBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.showBetCoutDownEndAnim();
                console.log("OnGameDataSynNotify, enter this.showBetCoutDownEndAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration + this._showHandCardsDuration + this._fightEndDuration) {
                cb.getCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.showWaitForNextRoundInAnim();
                this.updateAllCardsBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.showFightEndAnim();
                console.log("OnGameDataSynNotify, enter showFightEndAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration + this._showHandCardsDuration) {
                cb.getCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.showWaitForNextRoundInAnim();
                this.updateAllCardsBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.showHandCardsAnim();
                console.log("OnGameDataSynNotify, enter showHandCardsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration) {
                cb.getCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.showWaitForNextRoundInAnim();
                this.updateAllCardsExceptPublicBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.showPublicCardsAnim();
                console.log("OnGameDataSynNotify, enter showPublicCardsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration) {
                cb.getCowboyRoom().showTheNewestTrend = true;
                this.updateHistoryResultsPrevious();
                this.showWaitForNextRoundInAnim();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.updateCards();
                this.updateCardType();
                this.updateWinCards();
                this.showHideLoseBetCoinsAnim();
                this.showCowboyLoseAnim();
                console.log("OnGameDataSynNotify, enter showHideLoseBetCoinsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration)	// added
            {
                cb.getCowboyRoom().showTheNewestTrend = true;
                this.updateHistoryResultsPrevious();
                this.showWaitForNextRoundInAnim();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.updateCards();
                this.updateCardType();
                this.updateWinCards();
                this.clearLoseBetCoins();
                this.showCowboyLoseAnim();
                if (isSpecial) {
                    this.showSpecialCardTypeAnim();
                }
                else {
                    this.showBetWinFlagsAndFlyCoinsAnim();
                }
                console.log("OnGameDataSynNotify, enter showSpecialCardTypeAnim/showBetWinFlagsAndFlyCoinsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration) {
                cb.getCowboyRoom().showTheNewestTrend = true;
                this.showWaitForNextRoundInAnim();
                this.updateAllBetAreas();
                this.updateCards();
                this.updateCardType();
                this.updateWinCards();
                this.clearLoseBetCoins();
                this.showCowboyLoseAnim();
                if (isSpecial) {
                    this.showSpecialCardTypeAnim(true, this._leftTime - this._showNextRoundDuration - this._betWinFlagsAndFlyCoinsDuration);
                }
                else {
                    this.showBetWinFlagsAndFlyCoinsAnim();
                }
                console.log("OnGameDataSynNotify, enter showSpecialCardTypeAnim/showBetWinFlagsAndFlyCoinsAnim, left time");
            }
            else if (this._leftTime > this._showNextRoundDuration) {
                cb.getCowboyRoom().showTheNewestTrend = true;
                this.showWaitForNextRoundInAnim();
                this.updateAllBetAreas();
                this.updateCards();
                this.updateCardType();
                this.updateWinCards();
                this.showNextRoundTips();
                console.log("OnGameDataSynNotify, enter showSpecialCardTypeAnim left time");
            }
            else {
                cb.getCowboyRoom().showTheNewestTrend = true;
                if (this._leftTime > 2) {
                    this.showWaitForNextRoundInAnim();
                }

                this.updateAllBetAreas();
                this.updateCards();
                this.updateCardType();
                this.updateWinCards();
                this.updateWinFlags();	// 显示win标记
                this.showNextRoundTips();
                console.log("OnGameDataSynNotify, enter showNextRoundTips");
            }

            // 显示路子
            if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration) {
                this._updateAllWayOut(1);
            }
            else if (this._leftTime > this._showNextRoundDuration) {
                this._updateAllWayOut(1);
                this._showAllWayOutAnim();
            }
            else {
                this._updateAllWayOut();
            }
        }
    }

    // 一局结束
    OnGameRoundEndNotify(): void {
        cb.getCowboyRoom().showTheNewestTrend = false;
        this.resetLeftTimer();

        // 下注倒计时结束动画	 . 开战动画	.	翻牌动画 . 显示win标记，金币收回动画	. 等待下一局动画
        this.showBetCoutDownEndAnim();

        // 隐藏高级续投选择面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideSelectPanel(false);
        }
    }

    // 新的一局
    OnDealNotify(): void {
        cb.getCowboyRoom().showTheNewestTrend = true;
        this.clearRound();
        this.resetLeftTimer();
        this.updatBetButtonByCurCoin();
        this._updateBetButtonState();
        this.updateSelfCoin();
        this.updateOtherPlayersInfo();
        this.showCowboyNormalAnim();
        this.showSendCardTips();
        this.updateAllPlayerWinCount();
        this.handleCoin();
        this._updateAllWayOut();

        // 开局动画	.	发牌动画/翻牌动画		. 出战动画
        this.showRoundStartAnim();
    }

    // 开始下注
    OnStartBetNotify(): void {
        cb.getCowboyRoom().showTheNewestTrend = true;
        this.resetLeftTimer();
        this.updatBetButtonByCurCoin();
        this._updateBetButtonState();
        this.hideGameTips();
        // 下注倒计时开始动画
        this.showBetCoutDownBeginAnim();
        // 检测是否正在使用高级续投
        this._checkAdvanceAutoReq();
    }

    OnBetNotify(): void {
        this._updateAutoBetBtnStatus();
        // this.showBetInAnim();

        // 自己筹码变化后判断一下下注筹码状态
        if (cb.getCowboyRoom().curPlayerBet.uid == cv.dataHandler.getUserData().u32Uid) {
            this._updateBetButtonState();
        }

        let oneBet = cb.getCowboyRoom().curPlayerBet;
        let tempData = new PlayerOneBet();
        tempData.betAmount = oneBet.betAmount;
        tempData.betOption = oneBet.betOption;
        tempData.uid = oneBet.uid;
        this._vCoinOptimizationDeque.push_back(tempData);
    }

    OnAutoBetNotify(): void {
        // this.showBetInAnim(true);
        let oneBet = cb.getCowboyRoom().curPlayerBet;
        let tempData = new PlayerOneBet();
        tempData.betAmount = oneBet.betAmount;
        tempData.betOption = oneBet.betOption;
        tempData.uid = oneBet.uid;
        this._vCoinOptimizationDeque.push_back(tempData);
    }

    OnAutoBetNotifyHandleOver(pSender: number): void {
        let betSize = pSender;
        if (betSize > 1) {
            this.playCowboyEffect(this.s_betin_many);
        }
        else {
            this.playCowboyEffect(this.s_betin);
        }
        this._updateBetButtonState();
    }

    OnLeaveRoomSucc(pSender: any): void {
        this.cleanData();
        this.backToCowboyListScene();
    }

    OnAutoBetSucc(): void {

        this._updateAutoBetBtnStatus();
    }

    _onMsgBetAmountLevelChange(sender: any): void {
        this._updateBetAmountLevel();
        this._updateBetButtonState();
    }

    _onMsgAdvanceAutobetSet(sender: any): void {
        this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING);

        // 如果本局没有下注,且已勾选续投局数,则本局就生效一次
        if (!cb.getCowboyRoom().hasBetInCurRound && cb.getCowboyRoom().canAuto) {
            this._checkAdvanceAutoReq();
        }
    }

    _onMsgAdvanceAutobet(sender: number): void {
        let code = sender;
        switch (code) {
            case cb.Enum.ErrorCode.OK:
                {
                } break;

            // 高级续投超出限红
            case cb.Enum.ErrorCode.AUTO_BET_EXCEED_LIMIT:
                {
                    if (this._humanboyAdvancedAuto) {
                        this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptAdvanceAutoTipsPos(this._btnBetAuto.node);
                        this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).showAdvanceAutoTips(cv.config.getStringData(cv.StringTools.formatC("Cowboy_ServerErrorCode%d", code)));
                    }
                } break;

            // 高级续投金额不足
            case cb.Enum.ErrorCode.AUTO_BET_NO_MONEY:
                {
                    if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                        cv.TP.showMsg(cv.config.getStringData(cv.StringTools.formatC("Cowboy_ServerErrorCode%d", code)), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
                    }
                    else {
                        let strNodeName: string = "cowboy_dialog_recharge";
                        let dialogNode = this.node.getChildByName(strNodeName);
                        if (!dialogNode) {
                            dialogNode = cc.instantiate(this.HumanboyDialog_prefab);
                            let dialog = dialogNode.getComponent(HumanboyDialog);
                            dialog.show(cv.config.getStringData(cv.StringTools.formatC("Cowboy_ServerErrorCode%d", code))
                                , cv.config.getStringData("CowBoy_btn_desc_auto_cancel"), cv.config.getStringData("CowBoy_btn_desc_auto_recharge")
                                , (dialog: HumanboyDialog) => { cv.cowboyNet.ReqCancelAdvanceAutoBet(); }, (dialog: HumanboyDialog) => { this.openShop(null); });

                            dialogNode.name = (strNodeName);
                            this.node.addChild(dialogNode, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
                        }
                    }

                } break;

            default:
                {
                    cv.MessageCenter.send("on_cowboy_server_error", code);
                } break;
        }

        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptAdvanceAutoCountPos(this._btnBetAuto.node);
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).showAdvanceAutoCount();
        }
    }

    _onMsgAdvanceAutobetCancel(sender: any): void {
        this._updateBetAmountLevel();
        this._updateBetButtonState();
    }

    OnRoomParamChangeNotify(): void {
        this._updateBetAmountLevel();
        this._updateBetButtonState();
    }

    OnServerError(pSender: number): void {
        let i32Error = (pSender);

        let acBuffer: string = cv.StringTools.formatC("Cowboy_ServerErrorCode%d", i32Error);
        console.log("%s", acBuffer);

        if (i32Error == cb.Enum.ErrorCode.BET_TOO_SMALL) {
            let errText = cv.StringTools.formatC("%s", cv.config.getStringData(acBuffer));
            let formatCoin = cv.StringTools.clientGoldByServer(cb.getCowboyRoom().pkRoomParam.smallBet);
            this.showCowboyToast(cv.StringTools.formatC(errText, cv.StringTools.numberToString(formatCoin)));
        }
        else if (i32Error == cb.Enum.ErrorCode.NO_BET) {
            // 忽略提示:已停止下注
        }
        else {
            this.showCowboyToast(cv.StringTools.formatC("%s", cv.config.getStringData(acBuffer)));
        }
    }

    OnKickNotify(pSender: cowboy_proto.KickNotify): void {
        let kickType = (pSender.kickType);
        if (pSender.idle_roomid > 0) {
            if (!this._bSwitchTable) {
                cb.getCowboyRoom().idle_roomid = pSender.idle_roomid;
                this.showSwitchTable();
            }
            return;
        }
        if (kickType == cb.Enum.Kick.IDLE_LONG_TIME) {
            this.backToMainScene(cv.StringTools.formatC("%s", cv.config.getStringData("Cowboy_server_kick_long_time_text")));
        }
        else if (kickType == cb.Enum.Kick.Stop_World) {
            this.backToMainScene(cv.StringTools.formatC("%s", cv.config.getStringData("Cowboy_server_kick_stop_world_text")));
        }
    }

    OnSoundSwitchNotify(): void {
        if (cv.tools.isPlayMusic()) {
            this.playCowboyBGM();
        }
        else {
            this.stopCowboyBGM();
        }
    }

    OnSelfInfo(): void {
        //     if (_minitary == null) {
        //         Size winSize = Director. getInstance().getWinSize();
        //         _minitary = static_cast < CowboyMilitary *> (CowboyMilitary. createLayer());
        //         //this._chart.setPosition(Vec2(winSize.width / 2, winSize.height / 2));
        //         addChild(_minitary);
        //     }
        //     else {
        //         _minitary..node.active = (true);
        //         //_minitary.setData();
        // }

    }

    OnJoinRoomFailed(pSender: number): void {
        let i32Error = (pSender);
        let acBuffer = cv.StringTools.formatC("Cowboy_ServerErrorCode%d", i32Error);

        this.backToMainScene(cv.StringTools.formatC("%s", cv.config.getStringData(acBuffer)));
    }

    OnCowboyRewardTips(value: string): void {
        this._rewardPanel.active = true;
        this._rewardPanel.setContentSize(this._rewardPanel_width, this._rewardPanel.height);
        this._rewardTips.maxWidth = 0;
        cv.resMgr.adaptWidget(this._rewardPanel, true);
        this._rewardTips.maxWidth = this._rewardTips.node.width;

        let len = cv.StringTools.getLengthForCN(this._rewardTips.node, value);
        if (len > 3) {
            let width = len / 3 * this._rewardTips.node.width;
            this._rewardTips.maxWidth = width;
            this._rewardPanel.setContentSize(width + 27, this._rewardPanel.height);
            cv.resMgr.adaptWidget(this._rewardPanel, true);
        }

        let str = cv.StringTools.calculateAutoWrapString(this._rewardTips.node, value);
        let strArr: string[] = str.split("\n");
        len = strArr.length;

        if (len > 3) {
            let width = len / 3 * this._rewardTips.node.width;
            this._rewardTips.maxWidth = width;
            this._rewardPanel.setContentSize(width + 27, this._rewardPanel.height);
            cv.resMgr.adaptWidget(this._rewardPanel, true);
        }
        this._rewardTips.string = cv.StringTools.calculateAutoWrapString(this._rewardTips.node, value);

        this._rewardPanel.stopAllActions();
        this._rewardPanel.runAction(cc.sequence(cc.delayTime(4.0), cc.callFunc(() => {
            this._rewardPanel.stopAllActions();
            this._rewardPanel.active = false;
        }, this)));
    }

    onBtnTopBgClick(event: cc.Event) {
        cv.cowboyNet.RequestTrend();
        this.playCowboyEffect(this.s_button);
    }

    _onMsgUpdateWorldServerGold(isForce?: boolean): void {
        // world服接收接口已过滤只发自己, 因此这里无需再次判断(同时没有别的需求, 所以也不用缓存下发的结构) 
        isForce = isForce == true ? true : false;
        let llCurGold = cv.dataHandler.getUserData().total_amount;

        // 结算阶段跳过(否则会提前知道输赢结果)
        if (cb.getCowboyRoom().bCanUpdateWorldServerGold || isForce) {
            // 更新自己金币信息
            cb.getCowboyRoom().selfPlayer.curCoin = llCurGold;
            this.updateSelfCoin();

            // 更新其他人信息(因为自己有可能会在8人列表中)
            let bOnMainPlayerList = false;
            let otherPlayersInfo = cb.getCowboyRoom().otherPlayers;
            let otherInfoLen = otherPlayersInfo.length;
            for (let i = 0; i < otherInfoLen; ++i) {
                if (cv.dataHandler.getUserData().u32Uid == otherPlayersInfo[i].uid) {
                    bOnMainPlayerList = true;
                    otherPlayersInfo[i].curCoin = llCurGold;
                }
            }
            if (bOnMainPlayerList) {
                this.updateOtherCoin();
            }
        }
    }


    _initWayOutInfoByAreaIdx(iAreaIdx: number): void {
        if (iAreaIdx < 0 || iAreaIdx >= cv.StringTools.getArrayLength(this._betAreas)) return;

        let panelWayOut = (this._betAreas[iAreaIdx].getChildByName("panel_way_out"));
        if (!panelWayOut) return;
        if (panelWayOut.getComponent(cc.Mask)) {
            panelWayOut.removeComponent(cc.Mask);
        }

        let tWayOutInfo = new tCowboyWayOutInfo();
        this._mapWayOutInfo.add(iAreaIdx, tWayOutInfo);

        tWayOutInfo.iAreaIdx = iAreaIdx;
        tWayOutInfo.panelWayOut = panelWayOut;
        tWayOutInfo.panelWayOut.on(cc.Node.EventType.TOUCH_END, (): void => {
            // 点击路子入口事件
            cv.cowboyNet.RequestTrend();
            this._cowboyChart.active = true;
            cv.MessageCenter.send("on_display_page2");
            this.playCowboyEffect(this.s_button);
        });

        // 路子球状图片
        do {
            let children = tWayOutInfo.panelWayOut.children;
            let count = children.length;
            for (let i_wayout_index = 0; i_wayout_index < count; ++i_wayout_index) {
                let strImgName = cv.StringTools.formatC("img_%d", i_wayout_index);
                let img = (tWayOutInfo.panelWayOut.getChildByName(strImgName));
                if (img) {
                    img.active = (false);
                    tWayOutInfo.vWayOutImg.push(img);
                    tWayOutInfo.vWayOutImgSrcPos.push(img.getPosition());
                }
            }
        } while (0);

        // 文本
        do {
            let txt = (tWayOutInfo.panelWayOut.getChildByName("txt_way_out"));
            if (txt) {
                if (!tWayOutInfo.rtxtWayOut) tWayOutInfo.rtxtWayOut = (new cc.Node()).addComponent(cc.RichText);
                tWayOutInfo.rtxtWayOut.fontSize = txt.getComponent(cc.Label).fontSize;
                tWayOutInfo.rtxtWayOut.node.setAnchorPoint(txt.getAnchorPoint());
                tWayOutInfo.rtxtWayOut.node.setContentSize(txt.getContentSize());
                let pos = this._betContentBg.node.convertToNodeSpaceAR(txt.getParent().convertToWorldSpaceAR(txt.getPosition()));
                tWayOutInfo.rtxtWayOut.node.setPosition(pos);
                tWayOutInfo.rtxtWayOut.node.active = (false);
                tWayOutInfo.rtxtWayOut.handleTouchEvent = false;

                this._betContentBg.node.addChild(tWayOutInfo.rtxtWayOut.node);
                if (cv.tools.isValidNode(txt)) {
                    txt.removeFromParent(true);
                    txt.destroy();
                }
            }
        } while (0);

        // 路子显示风格
        do {
            let option = this.getBetOptionByAreaIdx(iAreaIdx);
            switch (option) {
                // 牛仔胜利
                case cb.Enum.BetZoneOption.EQUAL: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break;

                case cb.Enum.BetZoneOption.HOLE_3_TONG_SAME_SHUN: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break;      // 顺子/同花/同花顺
                case cb.Enum.BetZoneOption.FIVE_NONE_1DUI: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break;             // 高牌/一对
                case cb.Enum.BetZoneOption.FIVE_2DUI: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break;                  // 两对

                // 对子
                case cb.Enum.BetZoneOption.HOLE_SAME: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break;

                // 对A
                case cb.Enum.BetZoneOption.HOLE_A: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break;

                // 三条/顺子/同花
                case cb.Enum.BetZoneOption.FIVE_3_SHUN_TONG_HUA: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break;

                // 葫芦
                case cb.Enum.BetZoneOption.FIVE_3_2: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break;

                // 金刚/同花顺/皇家
                case cb.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 300;
                } break;

                default:
                    break;
            }
        } while (0);
    }

    _clearWayOutInfo(): void {
        this._mapWayOutInfo.clear();										// 只是清除元素,内存并没有变化
    }

    /**
     * 路单滚动动画
     * @param iAreaIdx
     */
    _showWayOutMoveAnim(iAreaIdx: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let panelWayOut: cc.Node = this._mapWayOutInfo.get(iAreaIdx).panelWayOut;
        let vWayOutImg: cc.Node[] = this._mapWayOutInfo.get(iAreaIdx).vWayOutImg;
        let vWayOutImgSrcPos: cc.Vec2[] = this._mapWayOutInfo.get(iAreaIdx).vWayOutImgSrcPos;
        if (!panelWayOut || cv.StringTools.getArrayLength(vWayOutImg) <= 0) return;

        // 裁剪右移 模式
        // let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
        // for (let i = 0; i < vWayOutImg.length; ++i) {
        //     if (i === 0) {
        //         tarPos.x = vWayOutImgSrcPos[i].x - vWayOutImg[iAreaIdx].width * vWayOutImg[iAreaIdx].scaleX;
        //         tarPos.y = vWayOutImgSrcPos[i].y;
        //     }
        //     else {
        //         tarPos.x = vWayOutImgSrcPos[i - 1].x;
        //         tarPos.y = vWayOutImgSrcPos[i - 1].y;
        //     }

        //     vWayOutImg[i].runAction(cc.sequence(cc.moveTo(0.3, tarPos), cc.callFunc((): void => {
        //         if (i === vWayOutImg.length - 1) {
        //             this._updateWayOut(iAreaIdx, 0);
        //         }
        //     }, this)));
        // }

        // 缩小渐隐右移 模式
        let st: cc.ActionInterval = cc.scaleTo(0.2, 0);
        let fo: cc.ActionInterval = cc.fadeOut(0.3);
        let spawn: cc.FiniteTimeAction = cc.spawn(st, fo);
        vWayOutImg[0].runAction(cc.sequence(spawn, cc.callFunc((): void => {
            vWayOutImg[0].active = false;
            let tarPos: cc.Vec2 = cc.v2(cc.Vec2.ZERO);
            for (let i = 0; i < vWayOutImg.length; ++i) {
                if (i === 0) continue;

                tarPos.x = vWayOutImgSrcPos[i - 1].x;
                tarPos.y = vWayOutImgSrcPos[i - 1].y;
                vWayOutImg[i].runAction(cc.sequence(cc.moveTo(0.5, tarPos), cc.callFunc((): void => {
                    if (i === vWayOutImg.length - 1) {
                        this._updateWayOut(iAreaIdx, 0);
                        vWayOutImg[0].setScale(1.0);
                        vWayOutImg[0].opacity = 0xFF;
                        vWayOutImg[0].active = true;
                    }
                }, this)));
            }
        })));
    }

    _hideWayOutMoveAnim(): void {
        for (let i = 0; i < this.AREA_SIZE; ++i) {
            if (!this._mapWayOutInfo.has(i)) continue;
            let panelWayOut = (this._mapWayOutInfo.get(i)).panelWayOut;
            if (!panelWayOut) continue;

            if (panelWayOut.getComponent(cc.Mask)) {
                panelWayOut.removeComponent(cc.Mask);
            }

            let vWayOutImg = (this._mapWayOutInfo.get(i)).vWayOutImg;
            let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
            for (let j = 0; j < vWayOutImgLen; ++j) {
                vWayOutImg[j].stopAllActions();
                vWayOutImg[j].setPosition((this._mapWayOutInfo.get(i)).vWayOutImgSrcPos[j]);
            }
        }
    }

    _showWayOutImgAnim(iAreaIdx: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
        if (vWayOutImgLen <= 0) return;

        let mapZoneData = cb.getCowboyRoom().mapZoneData;
        let it_zoneData = mapZoneData.get(this.getBetOptionByAreaIdx(iAreaIdx));
        if (!it_zoneData) return;

        // 隐藏路单文本
        let rtxtWayOut: cc.RichText = (this._mapWayOutInfo.get(iAreaIdx)).rtxtWayOut;
        if (rtxtWayOut) {
            rtxtWayOut.string = ("");
            rtxtWayOut.node.active = (false);
        }

        // 该区域输赢(0 - 未击中, 1 - 击中)
        let result = it_zoneData.result;

        let fileName: string = ("");

        // 输
        if (result == 0) {
            fileName = "cowboy_icon_circle_small_gray";
        }
        // 赢
        else if (result == 1) {
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                fileName = "cowboy_icon_circle_small_red";
            }
            else {
                fileName = "cowboy_icon_circle_small_red_en";
            }
        }

        // 计算空闲路子索引
        let freeIndex = vWayOutImg.length;
        for (let i = 0; i < freeIndex; ++i) {
            if (!vWayOutImg[i].active) {
                freeIndex = i;
                break;
            }
        }

        // 路子满了挤动动画(老模式)
        // this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.6 * this._fActExecute_WayOut), cc.callFunc((): void => {
        //     if (freeIndex > vWayOutImgLen - 1) {
        //         this._showWayOutMoveAnim(iAreaIdx);
        //     }
        //     else {
        //         vWayOutImg[freeIndex].active = true;
        //         cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, vWayOutImg[freeIndex].getComponent(cc.Sprite), fileName);
        //         // vWayOutImg[freeIndex].ignoreContentAdaptWithSize(true);
        //     }
        // })));

        // 路子满了挤动动画
        if (freeIndex > vWayOutImgLen - 1) {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3 * this._fActExecute_WayOut), cc.callFunc(function () {
                this._showWayOutMoveAnim(iAreaIdx);
            }.bind(this))));
        }
        else {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.8 * this._fActExecute_WayOut), cc.callFunc(function () {
                vWayOutImg[freeIndex].active = true;
                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, vWayOutImg[freeIndex].getComponent(cc.Sprite), fileName);
            }.bind(this))));
        }
    }

    _showWayOutAnim(iAreaIdx: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let panelWayOut = (this._mapWayOutInfo.get(iAreaIdx)).panelWayOut;
        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
        if (!panelWayOut || vWayOutImgLen <= 0) return;

        let mapZoneData = cb.getCowboyRoom().mapZoneData;
        let it_zoneData = mapZoneData.get(this.getBetOptionByAreaIdx(iAreaIdx));
        if (!it_zoneData) return;

        // 路子显示风格
        switch ((this._mapWayOutInfo.get(iAreaIdx)).eWayOutStyle) {
            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE: {
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG: {
                this._updateWayOutImg(iAreaIdx, 1);
                this._showWayOutImgAnim(iAreaIdx);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT: {
                this._updateWayOutTxt(iAreaIdx);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO: {
                let bShowTxt: boolean = false;
                let vHistoryResults = it_zoneData.vHistoryResults;
                if (vHistoryResults.length > 0 && vHistoryResults.length > vWayOutImg.length) {
                    let bDefeat = true;
                    let vWayOutImgLen = vWayOutImg.length;
                    for (let i = 0; i <= vWayOutImgLen; ++i) {
                        bDefeat = bDefeat && (vHistoryResults[i] == 0);
                    }
                    if (bDefeat) {
                        bShowTxt = true;
                    }
                }

                if (bShowTxt) {
                    this._updateWayOutTxt(iAreaIdx);
                }
                else {
                    this._updateWayOutImg(iAreaIdx, 1);
                    this._showWayOutImgAnim(iAreaIdx);
                }
            } break;

            default:
                break;
        }
    }

    _showAllWayOutAnim(): void {
        this._mapWayOutInfo.forEach((key: number, value: tCowboyWayOutInfo) => {
            this._showWayOutAnim(key);
        });
    }

    _updateWayOutImg(iAreaIdx: number, reduce: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let panelWayOut = (this._mapWayOutInfo.get(iAreaIdx)).panelWayOut;
        panelWayOut.active = (true);

        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let vWayOutImgSrcPos = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImgSrcPos;

        let mapZoneData = cb.getCowboyRoom().mapZoneData;
        let it_zoneData = mapZoneData.get(this.getBetOptionByAreaIdx(iAreaIdx));
        if (!it_zoneData) return;

        // 隐藏路单文本
        let rtxtWayOut: cc.RichText = (this._mapWayOutInfo.get(iAreaIdx)).rtxtWayOut;
        if (rtxtWayOut) {
            rtxtWayOut.string = ("");
            rtxtWayOut.node.active = (false);
        }

        // 逆序取历史记录
        let fileName = ("");
        let vHistoryResults = it_zoneData.vHistoryResults;

        let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
        let vHistoryResultsLen = cv.StringTools.getArrayLength(vHistoryResults);
        let min_count = (vWayOutImgLen < vHistoryResultsLen) ? vWayOutImgLen : vHistoryResultsLen;
        let end_index = 0;
        let end_count = 0;

        // ui显示个数 >= 路子数据个数, 少显示 reduce 个
        if (vWayOutImgLen >= vHistoryResultsLen) {
            end_index = min_count - 1;
            end_count = min_count - reduce;
        }
        // ui显示个数 < 路子数据个数, 偏移 reduce 位数据显示
        else {
            end_index = min_count - 1 + reduce;
            end_count = min_count;
        }

        for (let i = 0; i < vWayOutImgLen; ++i) {
            // 复原位置
            vWayOutImg[i].setPosition(vWayOutImgSrcPos[i]);

            let index = end_index - i;
            if (i < end_count && (index >= 0 && index < vHistoryResultsLen)) {
                vWayOutImg[i].active = (true);

                // 该区域输赢(0 - 未击中, 1 - 击中)
                let result = vHistoryResults[index];
                if (result == 0) {
                    fileName = "cowboy_icon_circle_small_gray";
                }
                else if (result == 1) {
                    if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                        fileName = "cowboy_icon_circle_small_red";
                    }
                    else {
                        fileName = "cowboy_icon_circle_small_red_en";
                    }
                }
                cb.loadSpriteTextureByPlist(this.game_dznz_PLIST, vWayOutImg[i].getComponent(cc.Sprite), fileName);
                // vWayOutImg[i].ignoreContentAdaptWithSize(true);
            }
            else {
                vWayOutImg[i].active = (false);
            }
        }
    }

    _updateWayOutTxt(iAreaIdx: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;
        let rtxtWayOut: cc.RichText = (this._mapWayOutInfo.get(iAreaIdx)).rtxtWayOut;
        if (!rtxtWayOut) return;

        // 隐藏路单球图片面板
        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let iWayOutLoseLimitCount = (this._mapWayOutInfo.get(iAreaIdx)).iWayOutLoseLimitCount;
        let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
        for (let i = 0; i < vWayOutImgLen; ++i) {
            vWayOutImg[i].active = (false);
        }

        let eCurState = cb.getCowboyRoom().curState;
        let mapZoneData = cb.getCowboyRoom().mapZoneData;

        let it = mapZoneData.get(this.getBetOptionByAreaIdx(iAreaIdx));
        if (it) {
            // 连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
            let luckLoseHand = it.luckLoseHand;

            if (luckLoseHand < 0) {
                rtxtWayOut.string = ("");
            }
            else if (luckLoseHand == 0) {
                if (eCurState == cb.Enum.RoundState.WAIT_NEXT_ROUND) {
                    cv.StringTools.setRichTextString(rtxtWayOut.node, (cv.config.getStringData("Cowboy_game_wayout_hit_txt")));
                }
                else {
                    cv.StringTools.setRichTextString(rtxtWayOut.node, cv.config.getStringData("Cowboy_game_wayout_hit_last_txt"));
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
                cv.StringTools.setRichTextString(rtxtWayOut.node, cv.StringTools.formatC(cv.config.getStringData("Cowboy_game_wayout_lose_txt"), strCountDest));
            }

            let szParent = rtxtWayOut.node.getParent().getContentSize();
            let szTextNode = rtxtWayOut.node.getContentSize();

            rtxtWayOut.node.active = (true);
            // rtxtWayOut.node.setPosition((szParent.width - szTextNode.width) / 2, (szParent.height - szTextNode.height) / 2);
        }
    }

    _updateWayOut(iAreaIdx: number, reduce: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let mapZoneData = cb.getCowboyRoom().mapZoneData;
        let it_zoneData = mapZoneData.get(this.getBetOptionByAreaIdx(iAreaIdx));
        if (!it_zoneData) return;

        switch ((this._mapWayOutInfo.get(iAreaIdx)).eWayOutStyle) {
            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_NONE: {
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG: {
                this._updateWayOutImg(iAreaIdx, reduce);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT: {
                this._updateWayOutTxt(iAreaIdx);
            } break;

            case MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO: {
                let bShowTxt = false;
                let vHistoryResults = it_zoneData.vHistoryResults;
                let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
                let vHistoryResultsLen = cv.StringTools.getArrayLength(vHistoryResults);
                if (vHistoryResultsLen > 0 && vHistoryResultsLen > vWayOutImgLen) {
                    let bDefeat = true;
                    for (let i = 0; i <= vWayOutImgLen; ++i) {
                        bDefeat = bDefeat && vHistoryResults[i] == 0;
                    }
                    if (bDefeat) {
                        bShowTxt = true;
                    }
                }

                if (bShowTxt) {
                    this._updateWayOutTxt(iAreaIdx);
                }
                else {
                    this._updateWayOutImg(iAreaIdx, reduce);
                }
            } break;

            default:
                break;
        }
    }

    _updateAllWayOut(reduce?: number /* = 0 */): void {
        reduce = reduce == undefined ? 0 : reduce;
        this._mapWayOutInfo.forEach((key: number, value: tCowboyWayOutInfo) => {
            this._updateWayOut(key, reduce);
        });
    }

    initCowboyAnims(): void {
        this._cowWinAnim = this.initAni(this._heroCow.node.getParent(), this.cow_win_prefab);
        this._cowWinAction = this._cowWinAnim.getComponent(cc.Animation);

        this._cowLoseAnim = this.initAni(this._heroCow.node.getParent(), this.cow_lose_prefab);
        this._cowLoseAction = this._cowLoseAnim.getComponent(cc.Animation);

        this._boyWinAnim = this.initAni(this._heroBoy.node.getParent(), this.boy_win_prefab);
        this._boyWinAction = this._boyWinAnim.getComponent(cc.Animation);

        this._boyLoseAnim = this.initAni(this._heroBoy.node.getParent(), this.boy_lose_prefab);
        this._boyLoseAction = this._boyLoseAnim.getComponent(cc.Animation);

        this._cowWinAnim.zIndex = -1;
        this._cowLoseAnim.zIndex = -1;
        this._boyWinAnim.zIndex = -1;
        this._boyLoseAnim.zIndex = -1;
    }

    getTimelineAnimSpeed(atl: cc.Animation, fExecuteTime: number): number {
        let fRet = 0;
        if (atl && fExecuteTime > 0) {
            let frameInternal = 1 / 60.0;
            fRet = atl.defaultClip.duration * frameInternal / fExecuteTime;
        }
        return fRet;
    }
    setTimeSpeed(ani: cc.Animation, speed: number) {
        ani.defaultClip.speed = speed;
    }
    // 牛仔输时哭的动画
    showCowboyLoseAnim(): void {
        this.showCowboyNormalAnim();
        this.playCowboyEffect(this.s_win_lose);

        // 0 平, 1 牛仔胜, -1 小牛胜
        if (cb.getCowboyRoom().result == 1) {
            // 牛仔赢
            do {
                this._heroBoy.node.active = (false);
                let pos = this._heroBoy.node.getPosition();

                this._boyWinAnim.active = (true);
                this._boyWinAnim.setPosition(pos);
                let endIndex = (this._boyWinAction.defaultClip).duration;
                // let speed = this.getTimelineAnimSpeed(this._boyWinAction, this._fActExecute_BoyWin);
                // this.setTimeSpeed(this._boyWinAction,speed);
                this.gotoFrameAndPlay(this._boyWinAction, 0, endIndex, false);
                this._boyWinAction.on("finished", (event: cc.Event): void => {
                    this._boyWinAction.node.off("finished");
                    this._boyWinAnim.active = (false);
                    this._heroBoy.node.active = (true);
                });
            } while (0);

            // 牛输
            do {
                this._heroCow.node.active = (false);
                let pos = this._heroCow.node.getPosition();

                this._cowLoseAnim.active = (true);
                this._cowLoseAnim.setPosition(pos);
                let endIndex = (this._cowLoseAction.defaultClip).duration;
                // let speed = this.getTimelineAnimSpeed(this._cowLoseAction, this._fActExecute_CowLose);
                // this.setTimeSpeed(this._cowLoseAction,speed);
                this.gotoFrameAndPlay(this._cowLoseAction, 0, endIndex, false);
                this._cowLoseAction.on("finished", (event: cc.Event): void => {
                    this._cowLoseAction.node.off("finished");
                    this._cowLoseAnim.active = (false);
                    this._heroCow.node.active = (true);
                });
            } while (0);
        }
        else if (cb.getCowboyRoom().result == -1) {
            // 牛赢
            do {
                this._heroCow.node.active = (false);
                let pos = this._heroCow.node.getPosition();

                this._cowWinAnim.active = (true);
                this._cowWinAnim.setPosition(pos);
                let endIndex = (this._cowWinAction.defaultClip).duration;
                // let speed = this.getTimelineAnimSpeed(this._cowWinAction, this._fActExecute_CowWin);
                // this.setTimeSpeed(this._cowWinAction,speed);
                this.gotoFrameAndPlay(this._cowWinAction, 0, endIndex, false);
                this._cowWinAction.on("finished", (event: cc.Event): void => {
                    this._cowWinAction.node.off("finished");
                    this._cowWinAnim.active = (false);
                    this._heroCow.node.active = (true);
                });
            } while (0);

            // 牛仔输
            do {
                this._heroBoy.node.active = (false);
                let pos = this._heroBoy.node.getPosition();

                this._boyLoseAnim.active = (true);
                this._boyLoseAnim.setPosition(pos);
                let endIndex = (this._boyLoseAction.defaultClip).duration;
                // let speed = this.getTimelineAnimSpeed(this._boyLoseAction, this._fActExecute_BoyLose);
                // this.setTimeSpeed(this._boyLoseAction,speed);
                this.gotoFrameAndPlay(this._boyLoseAction, 0, endIndex, false);
                this._boyLoseAction.on("finished", (event: cc.Event): void => {
                    this._boyLoseAction.node.off("finished");
                    this._boyLoseAnim.active = (false);
                    this._heroBoy.node.active = (true);
                });
            } while (0);
        }
    }

    // 牛仔恢复正常动画
    showCowboyNormalAnim(): void {
        this._heroBoy.node.active = (true);
        this._heroCow.node.active = (true);

        // 重置牛仔输赢动画
        do {
            this._cowWinAction.stop();
            this._cowWinAnim.active = (false);

            this._cowLoseAction.stop();
            this._cowLoseAnim.active = (false);

            this._boyWinAction.stop();
            this._boyWinAnim.active = (false);

            this._boyLoseAction.stop();
            this._boyLoseAnim.active = (false);
        } while (0);
    }

    private showLuckButton() {
        if (!this._luckButton) {
            this._luckButton = cc.instantiate(this.luckButton_prefab).getComponent(LuckTurntablesButton);
            this._btn_redpacket_festival.addChild(this._luckButton.node);
            this._luckButton.node.setPosition(0, 0);
            let pos: cc.Vec2 = this._selfCoin.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
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
        this.adaptiveBetBtnPanel();
    }

    private onTurntableResultNotice(puf: world_pb.LuckTurntableResultNotice) {
        let list: cc.Node[] = this.getPlayerCoinNodesByUid(puf.uid);
        // 桌面没有该玩家
        if (list.length == 0) {
            list.push(this._btnPlayerList.node);
        }
        for (let i = 0; i < list.length; i++) {
            // let node = list[i];
            // let pos = node.getParent().convertToWorldSpaceAR(node.getPosition());
            // this._luckButton.showGoldMoveAction(pos, puf.currency_type);

            this._luckButton.runGoldMoveAction(this._btn_redpacket_festival, list[i]);
        }
    }

    playPointAni() {
        let points_num = cb.getCowboyRoom().change_points;
        if (points_num < 0) return;

        if (!this.points_node) {
            this.points_node = cc.instantiate(this.points_ani_prefab);
            this.node.addChild(this.points_node, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_ANIM_NODE);
            this.points_node.setPosition(this.node.convertToNodeSpaceAR(this._selfHeadBg.parent.convertToWorldSpaceAR(this._selfHeadBg.position)));
            this.points_node.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                this.resetPointAni();
            }, this);
        }

        this.points_node.getComponent(HeadPointsAni).playPointAni(points_num);
    }

    resetPointAni() {
        cb.getCowboyRoom().change_points = 0;
        if (this.points_node) {
            this.points_node.getComponent(HeadPointsAni).resetPointAni();
        }
    }

    setLeftAndRightList() {
        let headBgWidth = this._leftPlayerPanel.getChildByName("player_0").width;
        let bgPosY = [288, 92, -104, -300, -300];
        let headPosY = 15;
        let coinPosY = -67;
        let left_nb_flag = cc.v2(-4, 330);
        let right_nb_flag = cc.v2(-16, 333);
        let w4 = 22;//下注面板边缘存在3个间隙
        if (this._isIpad) {
            bgPosY = [419, 205, -9, -223, -437];
            left_nb_flag = cc.v2(-4, 461);
            right_nb_flag = cc.v2(-16, 464);
        }
        else if (this._isViewX) {
            let baseWidth = cc.winSize.width - 2338;
            w4 = 96 + baseWidth * 0.5;
        }
        else {
            let baseWidth = cc.winSize.width - 1920;
            w4 = baseWidth > 0 ? 22 + baseWidth * 0.5 : 22;
        }
        this._leftPlayerPanel.getComponent(cc.Widget).left = w4 + headBgWidth * 0.5 - this._leftPlayerPanel.width * 0.5;
        this._rightPlayerPanel.getComponent(cc.Widget).right = w4 + headBgWidth * 0.5 - this._rightPlayerPanel.width * 0.5;
        cv.resMgr.adaptWidget(this._leftPlayerPanel);
        cv.resMgr.adaptWidget(this._rightPlayerPanel);

        for (let i = 0; i < 5; ++i) {
            let left_img = this._leftPlayerPanel.getChildByName(cv.StringTools.formatC("player_%d", i));
            let left_txtCoin = this._leftPlayerPanel.getChildByName(cv.StringTools.formatC("text_coin_%d", i));

            let right_img = this._rightPlayerPanel.getChildByName(cv.StringTools.formatC("player_%d", i));
            let right_txtCoin = this._rightPlayerPanel.getChildByName(cv.StringTools.formatC("text_coin_%d", i));

            left_img.setPosition(cc.v2(0, bgPosY[i]));
            left_txtCoin.setPosition(cc.v2(0, bgPosY[i] + coinPosY));

            right_img.setPosition(cc.v2(0, bgPosY[i]));
            right_txtCoin.setPosition(cc.v2(0, bgPosY[i] + coinPosY));

            if (i === 0) {
                let left_imgFlag = left_img.getChildByName("nb_flag");
                let right_imgFlag = right_img.getChildByName("nb_flag");

                left_imgFlag.setPosition(left_img.convertToNodeSpaceAR(left_img.parent.convertToWorldSpaceAR(left_nb_flag)));
                right_imgFlag.setPosition(right_img.convertToNodeSpaceAR(right_img.parent.convertToWorldSpaceAR(right_nb_flag)));
            }
        }
    }

    showSwitchTable() {
        if (this._bSwitchTable) return;
        this._bSwitchTable = true;
        cv.TP.showMsg(cv.config.getStringData("MiniGames_Switch_content"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            cv.roomManager.setCurrentRoomID(cb.getCowboyRoom().idle_roomid);
            cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            cv.roomManager.RequestJoinRoom();
        }, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            this.backToCowboyListScene();
        });
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_SWITCH_TABLE);
    }

  

    //冷静倒计时
    onCalmDownShowTip(msg:any){
        let CalmDownLeftSeconds = msg.CalmDownLeftSeconds;
        let CalmDownDeadLineTimeStamp = msg.CalmDownDeadLineTimeStamp;

        if(CalmDownLeftSeconds <= 0 || CalmDownDeadLineTimeStamp <= 0){
            return;
        }

        if(CalmDownLeftSeconds > 0){
            let _popSilence = popSilence.getSinglePrefabInst(this.popSilencePre);  
            _popSilence.getComponent(popSilence).autoShow(cv.Enum.popSilenceType.countDownGame, msg);
        }
    }
}