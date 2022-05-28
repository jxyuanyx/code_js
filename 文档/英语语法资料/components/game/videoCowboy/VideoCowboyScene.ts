import pb_cowboy = require("../../../../Script/common/pb/cowboy");
import cowboy_proto = pb_cowboy.cowboy_proto;
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../lobby/cv";
import CowboyCard from "./../cowboy/CowboyCard";
import { MiniGameCommonDef } from "../common/define";
import { HashMap } from "../../../common/tools/HashMap";
import { RoundState } from "./../cowboy/CowboyEnum";
import { PlayerSettle, PlayerOneBet } from "./../cowboy/CowboyRoomData";

import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";
import HumanboyExchange from "../humanboy/HumanboyExchange";
import { CowboyRule } from "../cowboy/CowboyRule";
import { CowboySetting } from "./../cowboy/CowboySetting";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import { HumanboyList } from "../humanboy/HumanboyList";
import { HumanboyDialog } from "../humanboy/HumanboyDialog";
import { HumanboyGuid } from "../humanboy/HumanboyGuid";
import { HumanboyMenu } from "../humanboy/HumanboyMenu";
import { HumanboyAdvancedSetting } from "../humanboy/HumanboyAdvancedSetting";
import { HumanboyAdvancedAuto } from "../humanboy/HumanboyAdvancedAuto";
import LuckTurntablesButton from "../redEnvelope/LuckTurntablesButton";
import { OtherPlayerHead, tCowboyWayOutInfo, COWBOY_LOCAL_ZORDER } from "../cowboy/cowboyScene";
import VideoCowboyManager from "./VideoCowboyManager";
import VideoCowboyOpenCard from "./VideoCowboyOpenCard";
import { video_cowboy_proto } from "../../../../Script/common/pb/video_cowboy";
import { VideoCowboyChart } from "./VideoCowboyChart";
import LiveVideoComp from "../liveVideo/LiveVideoComp";
import { Deque } from "../../../common/tools/Deque";
import HeadPointsAni from "../cowboy/HeadPointsAni";

/*n个点围成的凸多边型数据*/
class betAreaLineInfo {
    minX: number = 0;	//x最小值
    minY: number = 0; //y最小值
    maxX: number = 0; //x最大值
    maxY: number = 0; //y最大值
    /*二一次方程y= ax+b, aArr为斜率数组，bArr为x=0时对应的y值数组*/
    aArr: number[] = [];
    bArr: number[] = [];
    x1: number[] = [];
    x2: number[] = [];
}

class effectLoop {
    audioId: number = 0;
    duringTime: number = 0;
    startPlayTime: number = 0;
    bGoOn: boolean = false;
    func: Function = null;
};

const { ccclass, property } = cc._decorator;

@ccclass
export default class VideoCowboyScene extends cc.Component {

    @property(cc.Prefab) openCard_prefab: cc.Prefab = null;
    @property(cc.Prefab) clock_prefab: cc.Prefab = null;
    @property(cc.Font) time_xiazhu: cc.Font = null;
    @property(cc.Font) time_xiazhu_1: cc.Font = null;
    @property(cc.SpriteAtlas) game_videonz_PLIST: cc.SpriteAtlas = null;
    _openCardLayer: VideoCowboyOpenCard = null;
    _btn_xianlu: cc.Node = null;
    _statusLayerPosNode: cc.Node = null;
    _videoStatusTips: cc.Node = null;
    _betLineNode: cc.Node[] = [];
    lineInfoArr: betAreaLineInfo[][] = [];
    _clock_node: cc.Node = null;
    _clock_num_txt: cc.Label = null;
    _clock_green: cc.Sprite = null;
    _clock_circle: cc.ProgressBar = null;
    _bTrueFullScreen: boolean = false;

    _kaiju_Sprite: cc.Sprite = null;
    _stopXz_Sprite: cc.Sprite = null;
    _openCard_Sprite: cc.Sprite = null;
    _jieSuan_Sprite: cc.Sprite = null;
    _openCard_blink: cc.Sprite = null;
    _jieSuan_blink: cc.Sprite = null;
    _clock_total_time: number = 0.0;
    _clock_canShow: boolean = false;
    _clock_canChange: boolean = false;
    _rightChartPanel: cc.Node = null;
    _chartBg: cc.Node = null;

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
    points_node: cc.Node = null;

    language_PLIST: cc.SpriteAtlas = null;
    videoLanguage_PLIST: cc.SpriteAtlas = null;

    // 牌/牌型
    _redCardPanel: cc.Node = null;
    _blueCardPanel: cc.Node = null;
    _publicCardPanel: cc.Node = null;
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
    _fBetBtnSrcScaleRate: number = 0.7;															                            // 下注筹码原始缩放比例
    _fBetBtnTarScaleRate: number = 0.85;															                        // 下注筹码目标缩放比例
    _fFlyCoinScaleRate: number = 0.375;																                        // 创建的金币缩放比例

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
    _mapBetOptionArea: HashMap<number, number> = new HashMap();	// 映射：BetZoneOption <. index of this._betAreas

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
    _rewardSize: cc.Size = null;

    // 历史纪录 新手提示
    _recordDotsTemp: cc.Sprite[] = [];
    // 历史纪录
    _recordDots: cc.Sprite[] = [];
    _oriRecordDotsPos: cc.Vec2[] = [];
    _lastRecordDotWorldPos: cc.Vec2 = new cc.Vec2(0, 0);	                                                                // 显示的最后一个球的世界坐标
    _recordNum: number = 10;	                                                                                            // 历史纪录的数量

    _humanboyGuid: cc.Node = null;																                            // 引导面板
    _humanboyMenu: cc.Node = null;																                            // 菜单面板
    _humanboyAdvancedSetting: cc.Node = null;										                                        // 高级设置面板
    _humanboyAdvancedAuto: cc.Node = null;												                                    // 高级续投面板
    _eAutoBtnStyle: number = MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NONE;		                                    // 续投按钮样式

    _cowboyChart: cc.Node = null;
    private _humanboyExchange: HumanboyExchange = null;
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
    private _luckButton: LuckTurntablesButton = null;                                                                           // 红包节 实例

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
    public silenceMusic: string = "zh_CN/game/dzpoker/audio/silence";

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

    LABEL_SIZE: number = 10;//临时数据，待处理
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
        this.videoLanguage_PLIST = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/videoCowboyPlist/language"));
        cv.config.setCurrentScene(cv.Enum.SCENE.VIDEOCOWBOY_SCENE);
        cv.config.adaptScreenHen(this.node);

        cv.resMgr.adaptWidget(this.node, true);
        // layer.initScent();  未处理

        cv.pushNotice.hideNoticeLayer();

        let liveVideo_Node = this.node.getChildByName("liveVideo");
        if (VideoCowboyManager.isPlayVideo()) {//预发布才能播放 !cc.sys.isBrowser &&
            liveVideo_Node.addComponent(LiveVideoComp);
            liveVideo_Node.active = true;
        }
        else {
            liveVideo_Node.active = false;
        }
    }

    // on "init" you need to initialize your instance
    start() {
        cv.SHOP.msgNode.active = false;

        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_VIDEOCOWBOY);
        VideoCowboyManager.addPlist("game_dznz_PLIST", this.game_dznz_PLIST);
        VideoCowboyManager.addPlist("special_card_type_PLIST", this.special_card_type_PLIST);
        VideoCowboyManager.addPlist("cowboy_trend_anim_PLIST", this.cowboy_trend_anim_PLIST);
        VideoCowboyManager.addPlist("chart_PLIST", this.chart_PLIST);
        VideoCowboyManager.addPlist("language_PLIST", this.language_PLIST);
        VideoCowboyManager.addPlist("en_animation_PLIST", this.en_animation_PLIST);

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
        this._rewardTips = (this._rewardPanel.getChildByName("notice_text")).getComponent(cc.RichText);
        this._rewardSize = this._rewardTips.node.getContentSize();
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

        this._openCardLayer = cc.instantiate(this.openCard_prefab).getComponent(VideoCowboyOpenCard);
        this.node.addChild(this._openCardLayer.node);

        this._rightChartPanel = this.node.getChildByName("rightChartPanel");

        this.initTimelineAnims();
        this.initCowboyAnims();
        this.initCowboyToastNode();
        this.initButtonEvents();
        this.initCards();
        this.initBetArea();
        this.initBetButtons();
        this.initBetCountDown();
        this._initBetClock();
        this.initCheckXianLu();
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
        cv.viewAdaptive.videoCowboyRoomId = 0;
        cv.MessageCenter.register("on_cowboy_gamedata_syn_notify", this.OnGameDataSynNotify.bind(this), this.node);
        cv.MessageCenter.register("on_update_trend_notify", this.OnTrendUpdate.bind(this), this.node);
        cv.MessageCenter.register("on_update_playerlist_notify", this.OnPlayerListUpdate.bind(this), this.node);
        cv.MessageCenter.register("on_cowboy_sound_switch_notify", this.OnSoundSwitchNotify.bind(this), this.node);
        cv.MessageCenter.register("on_selfinfo_notify", this.OnSelfInfo.bind(this), this.node);
        cv.MessageCenter.register("showMedalMsg", this.OnCowboyRewardTips.bind(this), this.node);
        cv.MessageCenter.register("on_videoCowboy_HandleStopBetNotify", this._HandleStopBetNotify.bind(this), this.node);
        cv.MessageCenter.register("on_videoCowboy_HandleSkipRoundNotify", this._HandleSkipRoundNotify.bind(this), this.node);
        cv.MessageCenter.register("on_videoCowboy_HandleCancelRoundNotify", this._HandleCancelRoundNotify.bind(this), this.node);
        cv.MessageCenter.register("videoCowboy_ShowCardNotify", this.playKaiPai.bind(this), this.node);
        cv.MessageCenter.register("toRealBackMainScene", this.onRealBackMainScene.bind(this), this.node);
        cv.MessageCenter.register("on_videocowboy_showVideoStatusTips", this.showVideoStatusTips.bind(this), this.node);
        cv.MessageCenter.register("onExitCowboyLiveVideo", this.onExitCowboyLiveVideo.bind(this), this.node);
        cv.MessageCenter.register("onLeave_room_succ", this.onExitCowboyLiveVideo.bind(this), this.node);
        cv.MessageCenter.register("goldViewShop", this.onGoldViewShop.bind(this), this.node);

        //私语版本，走私语切换后台注册
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.register("on_syOnEnterBackground", this.OnAppEnterBackground.bind(this), this.node);
            cv.MessageCenter.register("on_syOnEnterForeground", this.OnAppEnterForeground.bind(this), this.node);
        } else {
            cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }
        let statusLayer_pos = cc.find("btn_xianlu/statusLayer_pos", this.node);
        let worldPos = statusLayer_pos.parent.convertToWorldSpaceAR(statusLayer_pos.position);
        cv.StatusView.showElectricImgs(false);

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

        if (VideoCowboyManager.getVideoCowboyRoom().curState === cowboy_proto.RoundState.BET && this._leftTime > 0) {
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

            // console.log(cv.StringTools.formatC("VideoCowboyGame_Coin: sec = %02d, dt = %05f, total = %05f, count = %05f", this._getLeftTime(), dt, nTotalCount, nCount));

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
            cc.audioEngine.setEffectsVolume(0.09);
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

            if (cc.sys.isBrowser && this.ingorePutInQuenue(path)) {
                this.playEffectForPath(path);
            } else {
                cv.AudioMgr.playEffect(path, false, 0.09);
            }
        }
    }

    playCowboyBGM(): void {
        if (cv.tools.isPlayMusic()) {
            cv.AudioMgr.playMusic(this.s_cowboyBGM, true, 0.09);
            //        SimpleAudioEngine.getInstance().playBackgroundMusic(s_cowboyBGM, true);
        }
    }

    stopCowboyBGM(): void {
        cv.AudioMgr.stopMusic();
        //SimpleAudioEngine.getInstance().stopBackgroundMusic();
    }

    backToCowboyListScene(): void {
        VideoCowboyManager.getVideoCowboyRoom().Reset();
        cv.netWorkManager.closeGameConnect();

        cv.viewAdaptive.isselfchange = false;
        cv.viewAdaptive.videoCowboyRoomId = 0;

        // 回到牛仔房间列表界面
        cv.roomManager.reset();
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
            if (cv.roomManager.isEnterMTT) return;
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

        cv.MessageCenter.unregister("update_gold", this.node);									// world服金币有变动通知
        cv.MessageCenter.unregister("on_cowboy_bet_amount_level_change", this.node);					// 下注级别变更
        cv.MessageCenter.unregister("on_cowboy_advance_autobet_set", this.node);							// 设置高级续投次数成功	
        cv.MessageCenter.unregister("on_cowboy_advance_autobet", this.node);									// 高级续投
        cv.MessageCenter.unregister("on_cowboy_advance_autobet_cancel", this.node);					// 取消高级续投成功
        cv.MessageCenter.unregister("on_videoCowboy_HandleStopBetNotify", this.node);
        cv.MessageCenter.unregister("on_videoCowboy_HandleSkipRoundNotify", this.node);
        cv.MessageCenter.unregister("on_videoCowboy_HandleCancelRoundNotify", this.node);
        cv.MessageCenter.unregister("videoCowboy_ShowCardNotify", this.node);
        cv.MessageCenter.unregister("toRealBackMainScene", this.node);
        cv.MessageCenter.unregister("on_videocowboy_showVideoStatusTips", this.node);
        cv.MessageCenter.unregister("onExitCowboyLiveVideo", this.node);
        cv.MessageCenter.unregister("onLeave_room_succ", this.node);
        cv.MessageCenter.unregister("goldViewShop", this.node);

        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        } else {
            cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }

        this.stopCowboyBGM();
        this.unschedule(this.onLeftTimeUpdate);

        // 清除路单数组信息
        this._clearWayOutInfo();
    }

    backToMainScene(backToMainTips?: string): void {
        backToMainTips = backToMainTips == undefined ? "" : backToMainTips;
        VideoCowboyManager.getVideoCowboyRoom().Reset();
        cv.netWorkManager.closeGameConnect();
        VideoCowboyManager.getVideoCowboyRoom().backToMainTips = backToMainTips;

        // 回到大厅
        if (!VideoCowboyManager.isPlayVideo()) { //cc.sys.isBrowser || 
            cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
        }
        else {
            cv.MessageCenter.send("onExitCowboyLiveVideo");
        }
    }

    // 清除场景动态信息
    clearRound(): void {
        this.hideAllWinPlayerLightAnim();
        this.hideAllCardsAndCardType();
        this.hideWinCards();
        this.clearAllBetArea();
        this.hideBetCountDown();
        this.showCowboyNormalAnim();
        this._nodeAnim.stopAllActions();
        this._nodeAnim.removeAllChildren(true);
        this._nodeAnim.destroyAllChildren();
        this.hideAllTimelineAnims();
        this.hideGameTips();
        this.hideHistoryMoveAnim();
        this.hideTrendChangeAnim();
        this.clearAllCowboyToasts();
        this._openCardLayer.reset();
        this.showBetClock(false);
        this.hideKaiJuSprite();
        this.hideStopXiazhuSprite();
        this.hideKaiPaiSprite();
        this.hideJieSuanSprite();
        this.handleClockChangeColor();
        this._updateBetButtonState();
        this.resetPointAni();
    }

    clearSceneAfterJieSuan(): void {
        this.hideAllWinPlayerLightAnim();
        this.hideAllCardsAndCardType();
        this.hideWinCards();
        this.clearAllBetArea();
        this.hideBetCountDown();
        this.showCowboyNormalAnim();
        this._nodeAnim.destroyAllChildren();
        this._nodeAnim.removeAllChildren(true);
        this._nodeAnim.stopAllActions();

        this._roundStartAction.pause();
        this._roundStartAnim.active = (false);

        this._fightBeginAction.pause();
        this._fightBeginAnim.active = (false);

        this._fightEndAction.pause();
        this._fightEndAnim.active = (false);

        this.hideGameTips();
        this.hideHistoryMoveAnim();
        this.hideTrendChangeAnim();
        this.clearAllCowboyToasts();

        this.showBetClock(false);
        this.hideKaiJuSprite();
        this.hideStopXiazhuSprite();
        this.hideKaiPaiSprite();
        this.hideJieSuanSprite();
        this.handleClockChangeColor();
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
        this._redCardPanel = (this._gameContent.getChildByName("red_card_panel"));
        this._blueCardPanel = (this._gameContent.getChildByName("blue_card_panel"));
        this._oriRedHandCards.push((this._redCardPanel.getChildByName("handcard_0")).getComponent(cc.Sprite));
        this._oriRedHandCards.push((this._redCardPanel.getChildByName("handcard_1")).getComponent(cc.Sprite));
        this._oriBlueHandCards.push((this._blueCardPanel.getChildByName("handcard_0")).getComponent(cc.Sprite));
        this._oriBlueHandCards.push((this._blueCardPanel.getChildByName("handcard_1")).getComponent(cc.Sprite));
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

        this._publicCardPanel = (this._gameContent.getChildByName("public_card_panel"));
        for (let i = 0; i < 5; i++) {
            this._oriPublicCards.push((this._publicCardPanel.getChildByName(cv.StringTools.formatC("handcard_%d", i))).getComponent(cc.Sprite));
            let pos: cc.Vec2 = cc.v2(this._oriPublicCards[i].node.getPosition());
            this._oriPublicCardsPos.push(pos);
            this._publicCards.push(CowboyCard.create());
            this._publicCards[i].ResetFromNode(this._oriPublicCards[i].node);
        }

        this._redCardType = (this._redCardPanel.getChildByName("red_card_type")).getComponent(cc.Sprite);
        this._blueCardType = (this._blueCardPanel.getChildByName("blue_card_type")).getComponent(cc.Sprite);
        this._redCardTypeBg = (this._redCardPanel.getChildByName("red_card_type_bg")).getComponent(cc.Sprite);
        this._blueCardTypeBg = (this._blueCardPanel.getChildByName("blue_card_type_bg")).getComponent(cc.Sprite);
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
        if (VideoCowboyManager.getVideoCowboyRoom().redHandCards.length == 2 && VideoCowboyManager.getVideoCowboyRoom().blueHandCards.length == 2) {
            for (let i = 0; i < 2; i++) {
                this._redHandCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().redHandCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().redHandCards[i].suit));
                this._blueHandCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().blueHandCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().blueHandCards[i].suit));
                this._redHandCards[i].SetFace(true);
                this._blueHandCards[i].SetFace(true);
            }
        }

        let publicCardNum = VideoCowboyManager.getVideoCowboyRoom().publicCards.length;
        if (publicCardNum == 1) {
            console.log("1111111111-》publicCardNum == 1");
            return;
        }
        for (let i = 0; i < 5; i++) {
            if (i < publicCardNum) {
                this._publicCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().publicCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().publicCards[i].suit));
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
        let redCardTypeImage = this._mapLevelCardTypeImage.get(VideoCowboyManager.getVideoCowboyRoom().redLevel);
        let blueCardTypeImage = this._mapLevelCardTypeImage.get(VideoCowboyManager.getVideoCowboyRoom().blueLevel);

        // 0 平 1 牛仔胜 -1 小牛胜
        if (VideoCowboyManager.getVideoCowboyRoom().result == 0) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardType, (redCardTypeImage + ""));
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardType, (blueCardTypeImage + ""));
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardTypeBg, "win_cardtype_bg");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardTypeBg, "win_cardtype_bg");
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == 1) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardType, (redCardTypeImage + ""));
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardType, (blueCardTypeImage + "_gray"));
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardTypeBg, "win_cardtype_bg");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardTypeBg, "lose_cardtype_bg");
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == -1) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardType, (redCardTypeImage + "_gray"));
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardType, (blueCardTypeImage + ""));
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._redCardTypeBg, "lose_cardtype_bg");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._blueCardTypeBg, "win_cardtype_bg");
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
        let winCardNum = VideoCowboyManager.getVideoCowboyRoom().winCards.length;
        for (let i = 0; i < winCardNum; i++) {
            let winCard = VideoCowboyManager.getVideoCowboyRoom().winCards[i];
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
        let arr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
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

        if (this._clock_total_time > 5 && this._leftTime == 5) {
            this._clock_canChange = true;
            this.handleClockChangeColor();
        }
    }

    resetLeftTimer(): void {
        this._leftTime = VideoCowboyManager.getVideoCowboyRoom().leftSeconds;
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
        let CZ_2 = this._waitForNextRoundAnim.getChildByName("CZ_2");
        if (CZ_2) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.videoLanguage_PLIST, CZ_2.getComponent(cc.Sprite), "waitNextRound_ani");
        }
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
                    VideoCowboyManager.loadSpriteTextureByPlist(this.en_animation_PLIST, cc.find("CZ_2", node).getComponent(cc.Sprite), imgPthArr[i]);
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
            let pos = (winAnim.parent.convertToNodeSpaceAR(winNode.parent.convertToWorldSpaceAR(cc.v2(0 + winNode.x, winNode.y))));
            winAnim.setPosition(pos.x, pos.y - 177);
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
        //	if (VideoCowboyManager.getVideoCowboyRoom().result == 0)
        //	{
        //		winLevel = VideoCowboyManager.getVideoCowboyRoom().redLevel;
        //	}
        //	else if (VideoCowboyManager.getVideoCowboyRoom().result == 1)
        //	{
        //		winLevel = VideoCowboyManager.getVideoCowboyRoom().redLevel;
        //	}
        //	else if (VideoCowboyManager.getVideoCowboyRoom().result == -1)
        //	{
        //		winLevel = VideoCowboyManager.getVideoCowboyRoom().blueLevel;
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
        let matchArr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
        let matchLen = matchArr.length;
        for (let i = 0; i < matchLen; i++) {
            let areaIdx = this.getAreaIdxByBetOption(matchArr[i]);
            let betOption = this.getBetOptionByAreaIdx(areaIdx);

            if (betOption == VideoCowboyManager.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {
                specialBetOption = betOption;
                break;
            }
        }
        if (specialBetOption < 0) {
            let matchArr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
            let matchLen = matchArr.length;
            for (let i = 0; i < matchLen; i++) {
                let areaIdx = this.getAreaIdxByBetOption(matchArr[i]);
                let betOption = this.getBetOptionByAreaIdx(areaIdx);

                if (betOption == VideoCowboyManager.Enum.BetZoneOption.HOLE_A) {
                    specialBetOption = betOption;
                    break;
                }
            }
        }

        if (specialBetOption < 0) return;

        // 胜利牌型
        // 0 平 1 牛仔胜 -1 小牛胜
        let winLevel: number = 0;
        if (VideoCowboyManager.getVideoCowboyRoom().result == 0) {
            winLevel = VideoCowboyManager.getVideoCowboyRoom().redLevel;
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == 1) {
            winLevel = VideoCowboyManager.getVideoCowboyRoom().redLevel;
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == -1) {
            winLevel = VideoCowboyManager.getVideoCowboyRoom().blueLevel;
        }

        let specialCardType = "";
        let specialCardOdd = "";
        if (specialBetOption == VideoCowboyManager.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {
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
        else if (specialBetOption == VideoCowboyManager.Enum.BetZoneOption.HOLE_A)	// 对A
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
        VideoCowboyManager.loadSpriteTextureByPlist(atlas, (winAnim.getChildByName("special_card_type")).getComponent(cc.Sprite), specialCardType);
        VideoCowboyManager.loadSpriteTextureByPlist(atlas, (winAnim.getChildByName("special_card_odd")).getComponent(cc.Sprite), specialCardOdd);
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
        let arr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
        let len = cv.StringTools.getArrayLength(arr);
        for (let i = 0; i < len; i++) {
            let areaIdx = this.getAreaIdxByBetOption(arr[i]);
            let betOption = this.getBetOptionByAreaIdx(areaIdx);
            if (betOption == VideoCowboyManager.Enum.BetZoneOption.HOLE_A || betOption == VideoCowboyManager.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4) {
                return true;
            }
        }
        return false;
    }

    clearSpecialCardTypeAnim(): void {
        let special_card_type_anim = this._nodeAnim.getChildByName("special_card_type_anim");
        if (special_card_type_anim) {
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
        if (trend_anim) {
            trend_anim.removeFromParent(true);
            trend_anim.destroy();

        }
        let sprTrend = (new cc.Node()).addComponent(cc.Sprite);
        VideoCowboyManager.loadSpriteTextureByPlist(this.cowboy_trend_anim_PLIST, sprTrend, "cowboy_trend_0");
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
        //this._btnZouShi.node.active = (true);
    }

    showRecordDotBezierAnim(): void {
        let lightRecordDot: cc.Sprite = (new cc.Node()).addComponent(cc.Sprite);
        let sprRecordDot: cc.Sprite = (new cc.Node()).addComponent(cc.Sprite);
        let bornPoint = cc.v2(0, 0);
        let ctrlPoint1 = cc.v2(0, 0);
        let ctrlPoint2 = cc.v2(0, 0);

        // 0 平 1 牛仔胜 - 1 小牛胜
        if (VideoCowboyManager.getVideoCowboyRoom().result == 1) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, lightRecordDot, "record_red_fire_light");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprRecordDot, "record_red_fire");
            let areaIdx = this.getAreaIdxByBetOption(VideoCowboyManager.Enum.BetZoneOption.RED_WIN);
            bornPoint = this._betAreas[areaIdx].getParent().convertToWorldSpaceAR(this._betAreas[areaIdx].getPosition());
            bornPoint = this._nodeAnim.convertToNodeSpaceAR(bornPoint);
            ctrlPoint1 = cc.v2(300 + bornPoint.x, 80 + bornPoint.y);
            ctrlPoint2 = cc.v2(600 + bornPoint.x, 160 + bornPoint.y);
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == -1) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, lightRecordDot, "record_blue_fire_light");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprRecordDot, "record_blue_fire");
            let areaIdx = this.getAreaIdxByBetOption(VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN);
            bornPoint = this._betAreas[areaIdx].getParent().convertToWorldSpaceAR(this._betAreas[areaIdx].getPosition());
            bornPoint = this._nodeAnim.convertToNodeSpaceAR(bornPoint);
            ctrlPoint1 = cc.v2(-80 + bornPoint.x, 80 + bornPoint.y);
            ctrlPoint2 = cc.v2(-120 + bornPoint.x, 160 + bornPoint.y);
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == 0) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, lightRecordDot, "record_draw_fire_light");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprRecordDot, "record_draw_fire");
            let areaIdx = this.getAreaIdxByBetOption(VideoCowboyManager.Enum.BetZoneOption.EQUAL);
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
            sprRecordDot.node.removeFromParent(true);
            sprRecordDot.node.destroy();
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
            if (!winPlayerLightAnim) {
                winPlayerLightAnim = this.initAni(head, this.win_player_light_prefab);
                winPlayerLightAnim.name = ("win_player_light");
                winPlayerLightAnim.setPosition(cc.v2(0, 25));
                winPlayerLightAnim.zIndex = (10);
            }

            let winPlayerLightAction: cc.Animation = winPlayerLightAnim.getComponent(cc.Animation);

            // winPlayerLightAnim.runAction(winPlayerLightAction);
            // winPlayerLightAction.play();
            winPlayerLightAnim.active = true;
            this.gotoFrameAndPlay(winPlayerLightAction, 0, 20, true);
        }

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            this.updatePlayerWinCount(uid, true);
        }.bind(this))));
    }

    hideAllWinPlayerLightAnim(): void {
        let len = this._otherPlayerHeads.length;
        for (let i = 0; i < len; i++) {
            let node = this._otherPlayerHeads[i].bg.node.getChildByName("win_player_light");
            if (node) {
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
            if (win_player_win_count) {
                win_player_win_count.removeFromParent(true);
                win_player_win_count.destroy();
            }
            let keepWinCount = VideoCowboyManager.getVideoCowboyRoom().getPlayerKeepWinCountByUid(uid);
            if (keepWinCount >= 3) {
                keepWinCount = keepWinCount > 10 ? 11 : keepWinCount;
                let sprWinCount = (new cc.Node()).addComponent(cc.Sprite);
                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, sprWinCount, cv.StringTools.formatC("win_count_%d", keepWinCount));
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
            let otherPlayersInfo = VideoCowboyManager.getVideoCowboyRoom().otherPlayers;
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
        let it = VideoCowboyManager.getVideoCowboyRoom().playerSettles.get(cv.dataHandler.getUserData().u32Uid);
        if (it) {
            this._textCoin.string = (this.getShortOwnCoinString(it.curCoin - it.totalWinAmount));
        }

        // 其他玩家
        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            let player = this._otherPlayerHeads[i];
            if (player.bg.node.active && player.uid > 0) {
                let it = VideoCowboyManager.getVideoCowboyRoom().playerSettles.get(player.uid);
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

        /*let publicCardNum = VideoCowboyManager.getVideoCowboyRoom().publicCards.length;
        for (let i = 0; i < 1; i++)
        {
            if (i < publicCardNum)
            {
                this._publicCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().publicCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().publicCards[i].suit));
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
        if (VideoCowboyManager.getVideoCowboyRoom().redHandCards.length == 2 && VideoCowboyManager.getVideoCowboyRoom().blueHandCards.length == 2) {
            for (let i = 0; i < 2; i++) {
                this._redHandCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().redHandCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().redHandCards[i].suit));
                this._blueHandCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().blueHandCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().blueHandCards[i].suit));
                this._redHandCards[i].SetFace(true);
                this._blueHandCards[i].SetFace(true);
            }
        }

        /*let publicCardNum = VideoCowboyManager.getVideoCowboyRoom().publicCards.length;
        for (let i = 0; i < 1; i++)
        {
            if (i < publicCardNum)
            {
                this._publicCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().publicCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().publicCards[i].suit));
                this._publicCards[i].SetFace(true);
            }
        }*/
    }

    // 清除没有中的区域金币
    clearLoseBetCoins(): void {
        let len = this._betCoinContents.length;
        let arr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
        let matchLen = VideoCowboyManager.getVideoCowboyRoom().matchOption.length;
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
        // this._roundStartAnim.active = (true);
        // this.gotoFrameAndPlay(this._roundStartAction, 0, 90, false);
        // this._roundStartAction.on("finished", (event: cc.Event): void => {
        //     this._roundStartAction.off("finished");
        this._roundStartAnim.active = false;
        this.sendCardsAnim();
        // }, this);
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
                            // this.playCowboyEffect(this.s_fapai);
                        }.bind(this));
                        let publicMoveComplete = cc.callFunc(function () {
                            if (j == 4) {
                                // 翻第一张公共牌动画
                                //let publicCardNum = VideoCowboyManager.getVideoCowboyRoom().publicCards.length;
                                //if (publicCardNum > 0)
                                //{
                                /*SEInt32 eNum = VideoCowboyManager.getVideoCowboyRoom().publicCards[0].number();
                                SEInt32 eSuit = VideoCowboyManager.getVideoCowboyRoom().publicCards[0].suit();
                                this._publicCards[0]..node.active = (true);
                                this._publicCards[0].SetContent((eNum), (eSuit));
                                this._publicCards[0].SetFace(false);
                                this._publicCards[0].Turn(true);
                                this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
                                    this.playCowboyEffect(this.s_kaipai);
                                })));*/

                                // 开战动画
                                // this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                                //     this.showFightBeginAnim();
                                // }.bind(this))));
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

            // this.scheduleOnce(function () {
            //     this.playCowboyEffect(this.s_fapai);
            // }.bind(this), 0.04 + i * duration);
        }
    }

    // 翻手牌动画
    showHandCardsAnim(): void {
        this.showHideLoseBetCoinsAnim();
        return;
        // 显示所有牌
        this.setAllCardsVisible(true);

        // 翻手牌
        if (VideoCowboyManager.getVideoCowboyRoom().redHandCards.length == 2 && VideoCowboyManager.getVideoCowboyRoom().blueHandCards.length == 2) {
            for (let i = 0; i < 2; i++) {
                this._redHandCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().redHandCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().redHandCards[i].suit));
                // this._redHandCards[i].node.runAction(cc.sequence(cc.rotateTo(0.3, 0, 180), cc.callFunc(()=>{
                //     this._redHandCards[i].node.setRotation(0);
                this._redHandCards[i].SetFace(true);//})));

                this._blueHandCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().blueHandCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().blueHandCards[i].suit));
                this._blueHandCards[i].node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => {//, cc.rotateTo(0.3, 0, 180)
                    // this._blueHandCards[i].node.setRotation(0);
                    this._blueHandCards[i].SetFace(true);
                })));
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
        let publicCardNum = VideoCowboyManager.getVideoCowboyRoom().publicCards.length;
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
                    this._publicCards[i].SetContent((VideoCowboyManager.getVideoCowboyRoom().publicCards[i].number), (VideoCowboyManager.getVideoCowboyRoom().publicCards[i].suit));
                    this._publicCards[i].SetFace(true);
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

        VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
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
        // this._fightBeginAnim.active = (true);
        // this.gotoFrameAndPlay(this._fightBeginAction, 0, 60, false);
        // this._fightBeginAction.on("finished", (event: cc.Event): void => {
        //     this._fightBeginAction.off("finished");
        this._fightBeginAnim.active = false;
        this.showBetCoutDownBeginAnim();
        // }, this);
        //})));
    }

    // 开战动画
    showFightEndAnim(): void {
        // 开战动画.翻牌动画.显示win标记，金币收回动画.等待下一局动画
        this._fightEndAnim.active = (true);
        this.gotoFrameAndPlay(this._fightEndAction, 0, 60, false);
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

        if (this._leftTime > 0) {
            this.playKaiJu();
            this._updateBetButtonState();

            // 检测是否正在使用高级续投
            this._checkAdvanceAutoReq();
        }
        // 动画
        // this._betCountDownBg.node.stopAllActions();
        // this._betCountDownBg.node.setPosition(this._betCountDownBg.node.x, cv.config.HEIGHT);
        // this._betCountDownBg.node.runAction(cc.moveTo(0.5, this._oriBetCountDownBgPos).easing(cc.easeBackOut()));
    }

    // 下注倒计时结束动画
    showBetCoutDownEndAnim(): void {
        this._updateBetButtonState();
        this.showOpenCardTips();

        // 动画
        // this._betCountDownBg.node.stopAllActions();
        // let move = cc.moveTo(0.5, cc.v2(this._oriBetCountDownBgPos.x, cv.config.HEIGHT)).easing(cc.easeBackIn());
        // let pkCall = cc.callFunc(function () {
        this.hideBetCountDown();
        this.showBetClock(false);
        this.playStopXiazhu();
        // }.bind(this));
        // this._betCountDownBg.node.runAction(cc.sequence(move, pkCall));

        // // 开战动画
        // this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._betCountDownEndDuration), cc.callFunc(function () {
        //     this.showFightEndAnim();
        // }.bind(this))));
    }

    // 显示隐藏没有中的区域金币动画
    showHideLoseBetCoinsAnim(): void {
        let arr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
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

        this._nodeAnim.runAction(cc.sequence(cc.delayTime(this._hideLoseBetCoinsDuration), cc.callFunc(function () {
            // 特殊牌型动画
            if (this.isResultSpecialCardType()) {
                this.showSpecialCardTypeAnim();
            }
            else {
                // 显示win标记/金币回收动画
                this.showBetWinFlagsAndFlyCoinsAnim();
            }
        }.bind(this))));

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
        let matchArr = VideoCowboyManager.getVideoCowboyRoom().matchOption;
        let matchLen = cv.StringTools.getArrayLength(matchArr);

        for (let i = 0; i < matchLen; i++) {
            let areaIdx = this.getAreaIdxByBetOption(matchArr[i]);
            this.clearBetArea(areaIdx);
            this.showWinFlagAnim(areaIdx);
        }

        // 路单曲线动画
        this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            this._showAllWayOutAnim();
            this.showRecordDotBezierAnim();
        }.bind(this))));

        // 动画:在哪些选项赢了(增加除主界面8个人输赢外其它玩家列表的输赢)
        let tmpSettles = VideoCowboyManager.getVideoCowboyRoom().playerSettles;
        tmpSettles.add(0xFFFFFFFF, VideoCowboyManager.getVideoCowboyRoom().otherPlayersSettle);
        tmpSettles.forEach(function (key: number, value: PlayerSettle, i: number) {
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
                        let coinContent = this._betLineNode[areaIdx];
                        let sz = coinContent.getContentSize();
                        let betDetails = this.getBetDetailAmounts(zoneSettleDetail.winAmount);
                        let len = betDetails.length;
                        for (let k = 0; k < len; k++) {
                            let flyCoin: cc.Sprite = this.createFlyCoin(areaIdx, betDetails[k], true);
                            let coinFlyBorn = coinContent.convertToWorldSpaceAR(this.getOneAreaPos(areaIdx, this.isCircleCoin(betDetails[k])));
                            coinFlyBorn = this._nodeAnim.convertToNodeSpaceAR(coinFlyBorn);
                            this._nodeAnim.addChild(flyCoin.node);
                            flyCoin.node.setPosition(coinFlyBorn);
                            // flyCoin.node.active = false;

                            // 延迟一会(win动画结束)开始飞金币
                            this.scheduleOnce(function () {
                                flyCoin.node.active = true;
                                flyCoin.node.runAction(cc.sequence(cc.delayTime(0.2 + k * 0.025),
                                    (cc.moveTo(0.6, headMidWorldPos).easing(cc.easeOut(0.8))), cc.callFunc(function () {
                                        this.nodePutToPool(flyCoin.node);
                                    }.bind(this))));
                            }.bind(this), 0.7);
                        }
                    }
                }

                // 总共赢的
                let totalWinAmount = value.totalWinAmount;
                if (totalWinAmount >= 100) {
                    this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                        let winToastBg = (new cc.Node()).addComponent(cc.Sprite);
                        VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, winToastBg, "win_coin_bg");
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
                    this.updateRoundEndPlayerCoin();
                    this.updatePlayerWinCount(uid, true);
                }
            }
        }.bind(this));

        // 维护状态:非0代表系统即将维护
        if (VideoCowboyManager.getVideoCowboyRoom().stopWorld != 0) {
            let bTrue = VideoCowboyManager.getVideoCowboyRoom().idle_roomid > 0;
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
        let it = VideoCowboyManager.getVideoCowboyRoom().playerSettles.get(cv.dataHandler.getUserData().u32Uid);
        if (it) {
            this._textCoin.string = (this.getShortOwnCoinString(it.curCoin));
        }

        // 其他玩家
        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            let player = this._otherPlayerHeads[i];
            if (player.bg.node.active && player.uid > 0) {
                let it = VideoCowboyManager.getVideoCowboyRoom().playerSettles.get(player.uid);
                if (it) {
                    player.textCoin.string = (this.getShortOwnCoinString(it.curCoin));
                }
            }
        }
    }

    getBetChipIdx(coin: number): number {
        let ret = -1;
        let amountLevels = VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.amountLevel;
        for (let i = 0; i < amountLevels.length; i++) {
            if (coin == amountLevels[i]) {
                return i;
            }
        }
        return ret;
    }

    getBetDetailAmounts(gold: number): number[] {
        let vBetCoinOption: number[] = VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption;
        return MiniGameCommonDef.disinteBetAmounts(gold, vBetCoinOption);
    }

    getAllBetDetailAmounts(option: number): number[] {
        let it = VideoCowboyManager.getVideoCowboyRoom().allZoneBet.get(option);
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
        node.scale = this._fFlyCoinScaleRate;
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
        // let fileName = llRealGold < VideoCowboyManager.getVideoCowboyRoom().llCoinUICritical ? "bet_coin_clicked" : "bet_block_clicked";
        return llRealGold < VideoCowboyManager.getVideoCowboyRoom().llCoinUICritical;
    }

    // 下注动画，金币飞到池中动画
    showBetInAnim(oneBet: PlayerOneBet, ignoreEffect?: boolean): void {
        ignoreEffect = ignoreEffect == true ? true : false;
        // let oneBet = VideoCowboyManager.getVideoCowboyRoom().curPlayerBet;
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
            // if (fromHead != this._selfHeadBg && fromHead != this._btnPlayerList.node) {
            //     let headImg = fromHead.getChildByName(this._HEAD_IMG_TAG);
            //     if (headImg) {
            //         let ac: cc.Action = null;
            //         if (coinFlyWorldBorn.x < cv.config.WIDTH / 2) {
            //             ac = cc.sequence(
            //                 cc.moveBy(0.1, cc.v2(-30, 0)),
            //                 cc.moveBy(0.1, cc.v2(30, 0)).easing(cc.easeInOut(1.0)));
            //         }
            //         else {
            //             ac = cc.sequence(
            //                 cc.moveBy(0.1, cc.v2(30, 0)),
            //                 cc.moveBy(0.1, cc.v2(-30, 0)).easing(cc.easeInOut(1.0)));
            //         }

            //         let circleHeadNode = CircleSprite.getHeadNode(headImg);
            //         if (!circleHeadNode) {
            //             headImg.runAction(ac);
            //         }
            //         else {
            //             circleHeadNode.runAction(ac);
            //         }
            //     }
            // }

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

            let coinFlyTargetPos: cc.Vec2 = this._betLineNode[areaIdx].convertToWorldSpaceAR(this.getOneAreaPos(areaIdx, isCircleCoin));
            coinFlyTargetPos = flyCoin.node.parent.convertToNodeSpaceAR(coinFlyTargetPos);
            flyCoin.node.setPosition(coinFlyBorn);
            // flyCoin.node.active = false;
            // this.scheduleOnce(function () {
            //     flyCoin.node.active = true;
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
        return;
        this._waitForNextRoundAnim.active = (true);
        this.gotoFrameAndPlay(this._waitForNextRoundAction, 30, 60, false);
        this._waitForNextRoundAction.on("finished", (event: cc.Event): void => {
            this._waitForNextRoundAction.off("finished");
            this._waitForNextRoundAnim.active = false;
        }, this);

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
        console.log("--------------------------.###########" + bet_content_bg_ipx.width);
        let fTotalWidth = 0;
        // fTotalWidth += 2 * cv.viewAdaptive.IPHONEX_OFFSETY;
        fTotalWidth += bet_content_bg_ipx.width;
        // fTotalWidth += (157 - 25);
        // fTotalWidth += (157 - 25);

        this._bTrueFullScreen = fTotalWidth <= cv.config.WIDTH;

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

        if (this._bTrueFullScreen && cv.config.IS_FULLSCREEN) { //iphoneX
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

        }
        else { //普通分辨率
            // cc.find("logo", this._gameContent).setPosition(cc.v2(-550, 110));
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

        let _bgName = (this._bTrueFullScreen && cv.config.IS_FULLSCREEN) ? "bet_content_ipx" : "bet_content";
        if (this._isIpad) {
            _bgName = "bet_content_ipad";
        }
        cv.resMgr.setSpriteFrame(this._betContentBg.node, cv.config.getLanguagePath("game/videoCowboy/") + _bgName);

        //console.log("this._bottomPanel.height=" + this._bottomPanel.height);
        //console.log("this._gameContent.size=[" + this._gameContent.width + "," + this._gameContent.height + "]");
        let betAreaPos: cc.Vec2 = cc.v2(0, cc.winSize.height * 0.44 - this._betContentBg.node.height * 0.5);
        let bottomPanelHeightPos: cc.Vec2 = this._bottomPanel.convertToWorldSpaceAR(cc.v2(0, this._bottomPanel.height));
        let betAreaPosY: number =  bottomPanelHeightPos.y + this._betContentBg.node.height * 0.5 - 20;
        if (betAreaPos.y < betAreaPosY) {
            betAreaPos.y = betAreaPosY;
        }
        betAreaPos = this._gameContent.convertToNodeSpaceAR(betAreaPos);
        this._betContentBg.node.setPosition(cc.v2(this._betContentBg.node.x, betAreaPos.y));
        cc.find("logo", this._gameContent).setPosition(cc.v2(this._betContentBg.node.x - this._betContentBg.node.width * 0.35, betAreaPos.y + this._betContentBg.node.height * 0.5));

        this._betContentBg.node.active = true;
        this._coinNodeByArea = [];
        // for (let i = 0; i < 10; i++) {
        //     let betArea = (this._betContentBg.node.getChildByName(cv.StringTools.formatC("bet_area_%d", i)));
        //     betArea.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
        //         let name: string = event.target.name;//bet_area_0
        //         let areaIdx: number = cv.Number(name.replace("bet_area_", ""));

        //         console.log("betAreaClicked, areaIdx: %d", areaIdx);
        //         if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0)	// 可以下注
        //         {
        //             if (this._curBetButtonIdx < 0) {
        //                 //showCowboyToast(cv.config.getStringData("Cowboy_select_bet_button_first_text"));
        //                 return;
        //             }
        //             else {
        //                 cv.videoCowboyNet.RequestBet(this.getBetOptionByAreaIdx(areaIdx), this.getCurBetLevel());
        //             }
        //         }
        //         else {
        //             console.log("betAreaClicked, cannot bet, curState: %d, left bet time: %d", VideoCowboyManager.getVideoCowboyRoom().curState, this._leftTime);
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
        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.RED_WIN, 0);
        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.EQUAL, 1);
        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN, 2);

        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.FIVE_NONE_1DUI, 3);
        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.FIVE_2DUI, 4);

        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.FIVE_3_SHUN_TONG_HUA, 5);
        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.FIVE_3_2, 6);
        this._mapBetOptionArea.add(VideoCowboyManager.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4, 7);

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
            let iAreaIdx = vAreaIdx[i];
            let betArea = (this._betContentBg.node.getChildByName(cv.StringTools.formatC("bet_area_%d", iAreaIdx)));
            let coin_content = (betArea.getChildByName("coin_content"));
            let Image_touch = (cc.find("image_touch/Image_touch_" + iAreaIdx, this._betContentBg.node));
            Image_touch.opacity = (0);
            // Image_touch.setTag(i);
            // Image_touch.setSwallowTouches(false);
            Image_touch.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
                this.betAreaClicked(iAreaIdx);
            });
            // betArea.on(cc.Node.EventType.TOUCH_END, (): void => {
            //     this.betAreaClicked(iAreaIdx);
            // });

            this._betAreas.push(betArea);
            this._betCoinContents.push(coin_content);
            this._coinNodeByArea.push([]);

            let text_self_bet_num = (cc.find("text_self/text_self_bet_num_" + iAreaIdx, this._betContentBg.node));
            let text_total_bet_num = (cc.find("text_total/text_total_bet_num_" + iAreaIdx, this._betContentBg.node));
            this._textSelfBetNum.push(text_self_bet_num.getComponent(cc.Label));
            this._textTotalBetNum.push(text_total_bet_num.getComponent(cc.Label));
            this._oriTextSelfBetNumPos.push(text_self_bet_num.getPosition());
            this._oriTextTotalBetNumPos.push(text_total_bet_num.getPosition());

            let winFlag = (betArea.getChildByName("win_flag"));
            this._sprBetAreaWinFlags.push(winFlag.getComponent(cc.Sprite));

            let fnt_odd = (cc.find("fnt_odd/fnt_odd_" + iAreaIdx, this._betContentBg.node)).getComponent(cc.Label);
            let fnt_odd_en = (cc.find("fnt_odd/fnt_odd_en_" + iAreaIdx, this._betContentBg.node)).getComponent(cc.Label);
            fnt_odd.string = ("");
            fnt_odd_en.string = ("");
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                this._textBetAreaOdds.push(fnt_odd);
                fnt_odd.node.active = true;
                fnt_odd_en.node.active = false;
            }
            else {
                this._textBetAreaOdds.push(fnt_odd_en);
                fnt_odd.node.active = false;
                fnt_odd_en.node.active = true;
            }


            // 初始化路子信息
            this._initWayOutInfoByAreaIdx(iAreaIdx);
        }

        this._initAreaLineData();
    }

    canTouchImgeArea(mysprite: cc.Node, touchLocation: cc.Vec2): boolean {
        return true;
        //计算touchLocation相对于mysprite的boundingBox左下角的坐标， 因为一般的锚点都在sprite中心，所以加了半个ContentSize
        // let ps = cc.v2(touchLocation.x - mysprite.x, touchLocation.y - mysprite.y);// touchLocation - mysprite.getPosition() + Point(mysprite.getContentSize().width / 2, mysprite.getContentSize().height / 2);
        // //加载和mysprite相同的图片，我是实现的png的，alpha通道很好用
        // let myImage = new Image();
        // myImage.initWithImageFile(StringUtils::format("videoCowboy/betAreaTouch/bet_touch_img_%d.png", mysprite.getTag()));
        // unsigned char *data = myImage.getData();  //这里就是图片数据了
        // //根据刚刚计算的相对坐标值，计算出触摸点代表了哪一个像素点      然后再提取出该像素点的alpha值
        // //注意：因为图片坐标（0，0）是在左上角，所以要和触摸点的Y转换一下，也就是“(myImage.getHeight() - (int)(ps.y) - 1)”
        // int pa = 4 * ((myImage.getHeight() - (int)(ps.y) - 1) * myImage.getWidth() + (int)(ps.x)) + 3;
        // if(pa < 0)	return false;//临时处理
        // unsigned int ap = data[pa];
        // //判断alpha值不为零时，也就是触摸在了不规则sprite的有图像的地方，这时再处理需要的逻辑内容就好了
        // return (ap != 0);
    }

    betAreaClicked(areaIdx: number): void {
        console.log("betAreaClicked, areaIdx: %d", areaIdx);

        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0 && this._clock_node.active)	// 可以下注
        {
            if (this._curBetButtonIdx < 0) {
                this.showCowboyToast(cv.config.getStringData("Cowboy_select_bet_button_first_text"));
                return;
            }
            else {
                cv.videoCowboyNet.RequestBet(this.getBetOptionByAreaIdx(areaIdx), this.getCurBetLevel());
            }
        }
        else {
            console.log("betAreaClicked, cannot bet, curState: %d, left bet time: %d", VideoCowboyManager.getVideoCowboyRoom().curState, this._leftTime);
            // showCowboyToast(cv.config.getStringData("Cowboy_cannot_bet_now_text"));
        }
    }

    updateBetArea(option: number): void {
        let areaIdx = this.getAreaIdxByBetOption(option);

        // 自己的下注
        let it = VideoCowboyManager.getVideoCowboyRoom().selfZoneBet.get(option);
        if (it) {
            this.updateSelfBetAreaCoin(areaIdx, it);
        }

        // 总共的下注
        let it2 = VideoCowboyManager.getVideoCowboyRoom().totalZoneBet.get(option);
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
        let tempMap = VideoCowboyManager.getVideoCowboyRoom().selfZoneBet;
        // 自己下注详情
        tempMap.forEach(function (key: number, value: number, i: number) {
            this.updateSelfBetAreaCoin(this.getAreaIdxByBetOption(key), value);
        }.bind(this));

        // 总的下注详情
        VideoCowboyManager.getVideoCowboyRoom().totalZoneBet.forEach(function (key: number, value: number, i: number) {
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
                    let coinFlyBorn: cc.Vec2 = this._betLineNode[areaIdx].convertToWorldSpaceAR(this.getOneAreaPos(areaIdx, this.isCircleCoin(betDetails[j])));
                    coinFlyBorn = flyCoin.node.parent.convertToNodeSpaceAR(coinFlyBorn);

                    flyCoin.node.setPosition(coinFlyBorn);
                }
            }
        }.bind(this));
    }

    initBetCountDown(): void {
        this._betCountDownBg = (this._gameContent.getChildByName("bet_count_down_bg")).getComponent(cc.Sprite);
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            VideoCowboyManager.loadSpriteTextureByPlist(this.language_PLIST, this._betCountDownBg, "bet_count_down");
        }
        this._textCountDown = (this._betCountDownBg.node.getChildByName("text_count_down")).getComponent(cc.Label);
        this._oriBetCountDownBgPos = this._betCountDownBg.node.getPosition();
    }

    hideBetCountDown(): void {
        this._betCountDownBg.node.active = false;
        this._betCountDownBg.node.setPosition(this._oriBetCountDownBgPos);
        this.unschedule(this.updateBetTimer);
    }

    updateBetCoutDown(): void {
        this.hideBetCountDown();
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0)	// 可以下注
        {
            // this._betCountDownBg.node.active = (true);
            this._clock_num_txt.string = (cv.StringTools.formatC("%lld", this._leftTime));
            this.schedule(this.updateBetTimer, 1.0);
        }
    }

    updateBetTimer(f32Delta: number): void {
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0) {
            // this._betCountDownBg.node.active = (true);
            this._clock_num_txt.string = (cv.StringTools.formatC("%lld", this._leftTime));
            this.playCowboyEffect(this.s_time_tick);
        }
        else {
            this._clock_num_txt.string = ("0");
        }
    }

    hideGameTips(): void {
        this._gameTipsBg.node.active = false;
        this.unschedule(this.updateNextRoundTipsTimer);
    }

    showNextRoundTips(): void {
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND && this._leftTime > 0) {
            this.clearSceneAfterJieSuan();
            this._gameTipsBg.node.active = (false);
            //this._gameTipsBg.active = false;
            // this._textGameTips.string = (cv.StringTools.formatC(cv.config.getStringData("Cowboy_game_tips_wait_next_round_text"), this._leftTime));
            // this.unschedule(this.updateNextRoundTipsTimer);
            // this.schedule(this.updateNextRoundTipsTimer, 1.0);

            if (this._waitForNextRoundAnim.active && this._leftTime <= this._waitForNextRoundOutTheshould) {
                this.showWaitForNextRoundOutAnim();
            }
        }
    }

    updateNextRoundTipsTimer(f32Delta: number): void {
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND && this._leftTime > 0) {
            // this._textGameTips.string = (cv.StringTools.formatC(cv.config.getStringData("Cowboy_game_tips_wait_next_round_text"), this._leftTime));

            if (this._waitForNextRoundAnim.active && this._leftTime <= this._waitForNextRoundOutTheshould) {
                this.showWaitForNextRoundOutAnim();
            }
        }
        else {
            this.hideGameTips();
        }
    }

    showSendCardTips(): void {
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.NEW_ROUND) {
            // 暂时不要提示
            //this._gameTipsBg..node.active = (true);
            this._gameTipsBg.node.active = false;
            this._textGameTips.string = (cv.config.getStringData("Cowboy_game_tips_send_card_text"));
        }
    }

    showOpenCardTips(): void {
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND
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

        for (let i = 0; i < 4; i++) {
            {
                let player = new OtherPlayerHead();
                let playerBg = (this._leftPlayerPanel.getChildByName(cv.StringTools.formatC("player_%d", i))).getComponent(cc.Sprite);
                player.bg = playerBg;
                player.textCoin = (playerBg.node.getChildByName("text_coin")).getComponent(cc.Label);
                if (i == 0) {
                    player.nbFlag = (playerBg.node.getChildByName("nb_flag")).getComponent(cc.Sprite);
                    player.nbFlag.node.zIndex = (11);
                    (player.nbFlag.node.getChildByName("nb_flag_desc")).getComponent(cc.Label).string = (cv.StringTools.formatC(cv.config.getStringData("Cowboy_fuhao_no_text"), 1));
                }
                this._otherPlayerHeads.push(player);
            }
            {
                let player = new OtherPlayerHead();
                let playerBg = (this._rightPlayerPanel.getChildByName(cv.StringTools.formatC("player_%d", i))).getComponent(cc.Sprite);
                player.bg = playerBg;
                player.textCoin = (playerBg.node.getChildByName("text_coin")).getComponent(cc.Label);
                if (i == 0) {
                    player.nbFlag = (playerBg.node.getChildByName("nb_flag")).getComponent(cc.Sprite);
                    player.nbFlag.node.zIndex = (11);
                    (player.nbFlag.node.getChildByName("nb_flag_desc")).getComponent(cc.Label).string = cv.config.getStringData("Cowboy_shensuanzi_text");
                }
                this._otherPlayerHeads.push(player);
            }
        }
    }

    // iPad/iPhoneX等宽窄屏适配
    adaptiveScreen(): void {
        if (!this._bTrueFullScreen) {
            let tempNum = this._bottomPanel.height - 128;
            if (tempNum > 0) {
                this._gameContent.setPosition(this._gameContent.x, this._gameContent.y + tempNum);
                this._gameContent.setScale(0.95);
            }
            else {
                this._bottomPanel.setContentSize(cc.size(this._bottomPanel.width, 128));
            }
        }
        if (cv.config.IS_IPHONEX_SCREEN && cv.config.IS_FULLSCREEN) {
            let tmp_x = cv.viewAdaptive.IPHONEX_OFFSETY - 50;
            this._leftPlayerPanel.setPosition(this._leftPlayerPanel.x + tmp_x, this._leftPlayerPanel.y);
            this._rightPlayerPanel.setPosition(this._rightPlayerPanel.x - tmp_x, this._rightPlayerPanel.y);
            this._btnMenu.node.setPosition(this._leftPlayerPanel.x, this._btnMenu.node.y);
            this._btnPlayerList.node.setPosition(this._rightPlayerPanel.x, this._btnPlayerList.node.y);
            this.self_panel.setPosition(this.self_panel.x + tmp_x, this.self_panel.y);
            this._rewardPanel.x = this._btnMenu.node.x - this._btnMenu.node.width * 0.5 + 133;
        }
        else if (cv.config.IS_WIDESCREEN) {
            if (cv.config.WIDTH / cv.config.HEIGHT >= 1.4) return;
            let heroOffsetY = 56;
            this._heroBoy.node.setPosition(this._heroBoy.node.x, heroOffsetY + this._heroBoy.node.y);
            this._heroCow.node.setPosition(this._heroCow.node.x, heroOffsetY + this._heroCow.node.y);

            let cardOffsetY = 60;
            this._redCardPanel.setPosition(this._redCardPanel.x, cardOffsetY + this._redCardPanel.y);
            this._blueCardPanel.setPosition(this._blueCardPanel.x, cardOffsetY + this._blueCardPanel.y);
            this._publicCardPanel.setPosition(this._publicCardPanel.x, cardOffsetY + this._publicCardPanel.y);
            this._betCountDownBg.node.setPosition(this._betCountDownBg.node.x, cardOffsetY + this._betCountDownBg.node.y);

            this._oriBetCountDownBgPos = this._betCountDownBg.node.getPosition();
        }

        this._btnMenu.node.setPosition(this._leftPlayerPanel.x, this._btnMenu.node.y);
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
            this._textCoin.string = (this.getShortOwnCoinString(VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin));
        }

        for (let i = 0; i < this._otherPlayerHeads.length; i++) {
            if (this._otherPlayerHeads[i].uid == uid) {
                // 神算子/富豪是自己的情況
                if (uid == cv.dataHandler.getUserData().u32Uid) {
                    this._otherPlayerHeads[i].textCoin.string = (this.getShortOwnCoinString(VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin));
                }
                else {
                    let player = VideoCowboyManager.getVideoCowboyRoom().getOtherPlayerByUid(uid);
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
        this._textCoin.string = (this.getShortOwnCoinString(VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin));
    }

    updateSelfInfo(): void        // 未处理
    {
        // this._textNickName.string = VideoCowboyManager.getVideoCowboyRoom().selfPlayer.name;
        cv.StringTools.setShrinkString(this._textNickName.node, VideoCowboyManager.getVideoCowboyRoom().selfPlayer.name, true);
        this._textCoin.string = (this.getShortOwnCoinString(VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin));

        // 头像
        //    let this._selfHeadBg.getChildByName(_HEAD_IMG_TAG);
        //     let head = CowboyHeadSprite. create("self_head_default", "head_mask");
        //     head.setTag(_HEAD_IMG_TAG);
        //     head.setAnchorPoint(Vec2. ANCHOR_MIDDLE);
        //     head.setPosition(this._selfHeadBg.getContentSize() / 2);
        let headUrl = VideoCowboyManager.getVideoCowboyRoom().selfPlayer.head;
        // head.UpdateSpriteFromUrl(headUrl);
        // this._selfHeadBg.addChild(head, 9);
        CircleSprite.setCircleSprite(this._selfHeadBg, headUrl);
    }

    // 未处理
    updateOtherPlayersInfo(): void {
        // 这里按照服务器发的gamePlayers顺序放
        let len = this._otherPlayerHeads.length;
        for (let i = 0; i < len; i++) {
            let otherPlayersInfo = VideoCowboyManager.getVideoCowboyRoom().otherPlayers;
            if (i < otherPlayersInfo.length) {
                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._otherPlayerHeads[i].bg, "player_bg");
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
                    cv.resMgr.setSpriteFrame(head, "zh_CN/game/cowboy/head/head_1");

                    // let headSprite = head.addComponent(cc.Sprite);               
                    // if (info.uid == cv.dataHandler.getUserData().u32Uid) {
                    //     VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, headSprite, "self_head_default_2");
                    // }
                    // else {
                    //     VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, headSprite, "other_head_default");
                    // }
                    head.name = (this._HEAD_IMG_TAG);
                    head.setAnchorPoint(cc.v2(0.5, 0.5));
                    // head.setPosition(headBg.getContentSize() / 2);
                    head.setPosition(cc.v2(0, 21));//head.getPosition() + 
                    headBg.node.addChild(head, 9);
                }
                head.active = true;
                let headUrl = "";
                if (info.head.length > 0) {
                    headUrl = info.head;

                    CircleSprite.setCircleSprite(head, headUrl, 0, undefined, Head_Mode.IRREGULAR);
                    head.active = false;
                }
                // head.UpdateSpriteFromUrl(headUrl);
            }
            else {
                let win_player_win_count = this.node.getChildByName("win_player_win_count_" + this._otherPlayerHeads[i].bg.node.uuid);
                if (win_player_win_count) {
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

                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._otherPlayerHeads[i].bg, "player_bg_2");
                this._otherPlayerHeads[i].textCoin.string = ("");
                if (this._otherPlayerHeads[i].nbFlag) {
                    this._otherPlayerHeads[i].nbFlag.node.active = false;
                }
            }
        }
    }

    initGuide(): void {
        return;
        let storeGuideKey = "cowboy_has_show_guide_2";
        if (cv.tools.GetStringByCCFile(storeGuideKey) != "true") {
            let panelRecord = (this._topBg.node.getChildByName("panelRecord"));
            for (let i = 0; i < this._recordNum + 1; i++) {
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

                cv.videoCowboyNet.RequestTrend();
                this._cowboyChart.active = true;
                cv.MessageCenter.send("on_display_page1");
                this.playCowboyEffect(this.s_button);
                cv.StringTools.clearArray(this._recordDotsTemp);
            }, true);
        }
    }

    initChart() {
        this._cowboyChart = cc.instantiate(this.cowboyChart);
        let chartbg = cc.find("Panel", this._cowboyChart);

        let size = cc.winSize;
        chartbg.setPosition(size.width, chartbg.getPosition().y);

        //this._cowboyChart.setAnchorPoint(0.5, 0.5);
        this._cowboyChart.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
        this.node.addChild(this._cowboyChart);
        this._cowboyChart.active = false;
        //cv.videoCowboyNet.RequestTrend();
    }

    onGuideBgClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        event.stopPropagation();
    }

    onGuideTopBgClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        let storeGuideKey = "cowboy_has_show_guide_2";
        let hasShowGuide = "true";
        cv.tools.SaveStringByCCFile(storeGuideKey, hasShowGuide);
        //this._topBgTemp.node.parent.active = false;
        cv.videoCowboyNet.RequestTrend();
        this._cowboyChart.active = true;
        this.playCowboyEffect(this.s_button);
        //this._topBgTemp.node.removeFromParent(true);
        this._recordDotsTemp = [];
    }

    openShop(sender: any): void {
        if (!cc.sys.isBrowser) {
            cv.viewAdaptive.isselfchange = true;
            cv.viewAdaptive.videoCowboyRoomId = VideoCowboyManager.getVideoCowboyRoom().u32RoomId;
            this.backToMainScene();
        }
        else {
            cv.SHOP.RechargeClick();
        }
    }

    getChartPanel(): cc.Node {
        return this._rightChartPanel;
    }

    initButtonEvents(): void {
        // 菜单按钮
        this._btnMenu = (this.node.getChildByName("btnMenu")).getComponent(cc.Button);
        this._btnMenu.node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_5;
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
                    if (!this._humanboyExchange) {
                        this._humanboyExchange = cc.instantiate(this.humanboyExchange_prefab).getComponent(HumanboyExchange);
                        this.node.addChild(this._humanboyExchange.node, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_MENU_PANEL);
                    }
                    else {
                        this._humanboyExchange.openView();
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

                    let iUsedAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount;
                    let iSelectAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount;
                    if (iSelectAutoBetCount > 0) {
                        let dialogNode = cc.instantiate(this.HumanboyDialog_prefab);

                        dialogNode.getComponent(HumanboyDialog).show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_exit_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                            , cv.config.getStringData("CowBoy_btn_desc_exit_game"), cv.config.getStringData("CowBoy_btn_desc_resume_game")
                            , (dialog: HumanboyDialog) => {
                                cv.videoCowboyNet.RequestLeaveRoom();
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
            this._humanboyMenu.getComponent(HumanboyMenu).setMenuPosition(cc.v2(this._btnMenu.node.x + 25, this._btnMenu.node.y - this._btnMenu.node.height / 2));
        });

        // 玩家列表
        this._btnPlayerList = (this._bottomPanel.getChildByName("btnPlayerList")).getComponent(cc.Button);
        this._btnPlayerList.node.on("click", (event: cc.Event): void => {
            cv.videoCowboyNet.RequestPlayerList();
            this.playCowboyEffect(this.s_button);
        });

        // 商店
        this.self_panel = (this._bottomPanel.getChildByName("self_panel"));
        let btn_shop_valid = (this.self_panel.getChildByName("btn_shop_valid"));
        btn_shop_valid.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            this.openShop(null);
        });
    }
    onGoldViewShop() {
        this.openShop(null);
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
            this._betButtonTexts.push((btnBet.node.getChildByName("textBet")));
            this._betButtonMasks.push((btnBet.node.getChildByName("imgMask")).getComponent(cc.Sprite));

            let spMask: any = btnBet.node.getChildByName("imgMask").getComponent(cc.Sprite);
            if (!cv.config.isSiyuType()) {  //非私语平台，设置通透。
                spMask.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
            }

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
                    cv.videoCowboyNet.RequestAutoBet();
                } break;

                // 高级续投已激活(再次点击 弹出高级续投选项面板)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                    // if (VideoCowboyManager.getVideoCowboyRoom().curState == RoundState.BET) {
                    this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptSelectPanelPos(this._btnBetAuto.node);
                    this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).showSelectPanel(true);
                    // }
                } break;

                // 高级续投中(再次点击取消)
                case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                    let iUsedAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount;
                    let iSelectAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount;
                    let HumanboyDialog_node = (cc.instantiate(this.HumanboyDialog_prefab)).getComponent(HumanboyDialog);
                    HumanboyDialog_node.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_stop_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                        , cv.config.getStringData("CowBoy_btn_desc_stop_auto_bet"), cv.config.getStringData("CowBoy_btn_desc_resume_auto_bet")
                        , (dialog: HumanboyDialog) => { cv.videoCowboyNet.ReqCancelAdvanceAutoBet(); }, (dialog: HumanboyDialog) => { });

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
        // VideoCowboyManager.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[betBtnIdx].node, clickedPng, clickedPng, clickedPng, clickedPng);
        // this._betButtonTexts[betBtnIdx].node.scale = (1.0);
        // VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._betButtonMasks[betBtnIdx], this._curBetButtonIdx <= 2 ? "bet_coin_disable_mask_big" : "bet_block_disable_mask_big");
    }

    updateBetButtonText(): void {
        return;
        // let amountlevel = VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.amountLevel;
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
        let details = VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.oddsDetail;
        for (let i = 0; i < details.length; i++) {
            let areaIdx = this.getAreaIdxByBetOption(details[i].option);
            if (this._textBetAreaOdds[areaIdx]) {
                this._textBetAreaOdds[areaIdx].string = (cv.StringTools.clientGoldByServer(details[i].odds) + cv.config.getStringData("Cowboy_odds_text"));
            }
        }
    }

    _updateBetButtonState(): void {
        // 检测下注按钮禁用与否
        let vBetCoinOption = VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption;		// 房间下注级别
        let curCoin = VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin;			// 当前自身携带金币
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
        let bEffective: boolean = VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0;
        let betButtons_len: number = cv.StringTools.getArrayLength(this._betButtons);
        for (let i = 0; i < betButtons_len; ++i) {
            this._betButtonMasks[i].node.active = (!bEffective);
            this._betButtonMasks[i].enabled = (true);
            this._betButtons[i].enabled = bEffective;
        }

        // 更新续投按钮状态
        this._updateAutoBetBtnStatus();

        // 更新清屏按钮状态
        this._updateCleanBtnStatus();
    }

    updatBetButtonByCurCoin(): void {
        return;
        // 可以下注的时候才判断
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0) {
            let amountlevel = VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.amountLevel;
            let curCoin = VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin;
            let len = amountlevel.length;

            let disablePng: string = "";
            let curStatePng: string = "";

            for (let i = 0; i < len; i++) {
                if (i < this._betButtonNum) {
                    // 钱不够按钮上的金额
                    if (curCoin < amountlevel[i]) {

                        if (i == this._curBetButtonIdx) {
                            disablePng = i <= 2 ? "bet_coin_disabled_big" : "bet_block_disabled_big";
                        }
                        else {
                            disablePng = i <= 2 ? "bet_coin_disabled" : "bet_block_disabled";
                        }

                        VideoCowboyManager.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, disablePng, disablePng, disablePng, disablePng);
                        this._betButtons[i].enabled = (false);
                        this._betButtons[i].interactable = false;
                        // this._betButtonTexts[i].node.color = (cc.Color.BLACK);
                        // this._betButtonTexts[i].node.opacity = (102);
                    }
                    else {
                        if (i == this._curBetButtonIdx) {
                            curStatePng = i <= 2 ? "bet_coin_clicked" : "bet_block_clicked";
                        }
                        else {
                            curStatePng = i <= 2 ? "bet_coin_normal" : "bet_block_normal";
                        }

                        VideoCowboyManager.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, curStatePng, curStatePng, curStatePng, curStatePng);
                        this._betButtons[i].enabled = (true);
                        this._betButtons[i].interactable = true;
                        // this._betButtonTexts[i].node.color = (cc.Color.WHITE);
                        // this._betButtonTexts[i].node.opacity = (255);
                    }
                }
                else {
                    console.log("error!! this.updatBetButtonByCurCoin amountlevel must be: %d, size: %d", this._betButtonNum, amountlevel.length);
                }
            }
        }
    }

    enableAutoBetButton(enabled: boolean): void {
        this._btnBetAuto.enabled = enabled;
        this._btnBetAuto.interactable = enabled;
    }

    _updateAutoBetBtnStatus(): void {
        switch (this._eAutoBtnStyle) {
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL: {
                if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._leftTime > 0) {
                    // 当前一局下过注
                    if (VideoCowboyManager.getVideoCowboyRoom().hasBetInCurRound) {
                        this.enableAutoBetButton(false);
                    }
                    else {
                        if (VideoCowboyManager.getVideoCowboyRoom().canAuto) {
                            this.enableAutoBetButton(true);
                        }
                        else {
                            this.enableAutoBetButton(false);
                        }
                    }
                }
                else {
                    this.enableAutoBetButton(false);
                }
                break;
            }
            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                // 当前一局下过注
                if (VideoCowboyManager.getVideoCowboyRoom().hasBetInCurRound) {
                    this.enableAutoBetButton(true);
                }
                else {
                    if (VideoCowboyManager.getVideoCowboyRoom().canAuto) {
                        this.enableAutoBetButton(true);
                    }
                    else {
                        this.enableAutoBetButton(false);
                    }
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
        if (VideoCowboyManager.getVideoCowboyRoom().curState == RoundState.BET && this._leftTime > 0) {
            bEnable = true;
        }

        this._btnBetClean.interactable = (bEnable);
    }

    _updateBetAmountLevel(): void {
        let vBetCoinOption = VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption;
        let vBetCoinOption_len = cv.StringTools.getArrayLength(vBetCoinOption);
        for (let i = 0; i < vBetCoinOption_len; ++i) {
            if (i < this._betButtonNum) {
                let llAmountLevel = cv.StringTools.clientGoldByServer(vBetCoinOption[i]);
                if (llAmountLevel < VideoCowboyManager.getVideoCowboyRoom().llCoinUICritical) {
                    VideoCowboyManager.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, "bet_coin_clicked", "bet_coin_clicked", "bet_coin_clicked", "bet_coin_disabled_big");
                    // this._betButtons[i].loadTextureNormal("bet_coin_clicked.png", TextureResType.PLIST);
                    // this._betButtons[i].loadTexturePressed("bet_coin_clicked.png", TextureResType.PLIST);
                    // this._betButtons[i].loadTextureDisabled("bet_coin_disabled_big.png", TextureResType.PLIST);
                    VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._betButtonMasks[i], "bet_coin_disable_mask_big");
                    this._betButtonMasks[i].node.scale = 1.05;
                    // this._betButtonMasks[i].loadTexture("bet_coin_disable_mask_big.png", TextureResType.PLIST);
                }
                else {
                    VideoCowboyManager.loadButtonTextureByPlist(this.game_dznz_PLIST, this._betButtons[i].node, "bet_block_clicked", "bet_block_clicked", "bet_block_clicked", "bet_block_disabled_big");
                    // _betButtons[i].loadTextureNormal("bet_block_clicked.png", TextureResType.PLIST);
                    // _betButtons[i].loadTexturePressed("bet_block_clicked.png", TextureResType.PLIST);
                    // _betButtons[i].loadTextureDisabled("bet_block_disabled_big.png", TextureResType.PLIST);
                    VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._betButtonMasks[i], "bet_block_disable_mask_big");

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

        switch (VideoCowboyManager.getVideoCowboyRoom().eAutoLevel) {
            case cowboy_proto.AutoBetLevel.Level_Normal: {
                this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_NORMAL);
            } break;

            case cowboy_proto.AutoBetLevel.Level_Advance: {
                if (VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount > 0) {
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
                VideoCowboyManager.loadButtonTextureByPlist(this.language_PLIST, this._btnBetAuto.node, "autobet_normal", "autobet_normal", "autobet_normal", "autobet_gray");
                // _btnBetAuto.loadTextureNormal("autobet_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTexturePressed("autobet_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTextureDisabled("autobet_gray.png", TextureResType.PLIST);


            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE: {
                VideoCowboyManager.loadButtonTextureByPlist(this.language_PLIST, this._btnBetAuto.node, "autobet_block_normal", "autobet_block_normal", "autobet_block_normal", "autobet_block_gray");
                // _btnBetAuto.loadTextureNormal("autobet_block_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTexturePressed("autobet_block_normal.png", TextureResType.PLIST);
                // _btnBetAuto.loadTextureDisabled("autobet_block_gray.png", TextureResType.PLIST);
            } break;

            case MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING: {
                VideoCowboyManager.loadButtonTextureByPlist(this.language_PLIST, this._btnBetAuto.node, "autobet_block_using", "autobet_block_using", "autobet_block_using", "autobet_block_gray");
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
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET && this._getAutoBetBtnStytle() === MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING) {
            if (this._humanboyAdvancedAuto) {
                this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideAdvanceAutoTips();
            }

            if (VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount < VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount) {
                cv.videoCowboyNet.reqAdvanceAutoBet();
            }
        }
    }

    clearBetArea(areaIdx: number): void {
        if (cv.StringTools.getArrayLength(this._sprBetAreaWinFlags) > areaIdx) {
            this._sprBetAreaWinFlags[areaIdx].node.active = false;
        }

        // this.hideWinFlagAnim(areaIdx);
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

        let amountlevel = VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption;
        return amountlevel[this._curBetButtonIdx];
    }

    initHistoryDots(): void {
        this._btnZouShi = (this._rightChartPanel.getChildByName("btnZouShi")).getComponent(cc.Button);
        this._btnZouShi.node.active = false;
        //this._btnZouShi.interactable = false;

        let panel1 = this._rightChartPanel.getChildByName("panel1");
        let panel2 = this._rightChartPanel.getChildByName("panel2");

        this._chartBg = (this._rightChartPanel.getChildByName("image_bg"));
        let panelRecord = (this._rightChartPanel.getChildByName("panelRecord"));
        cv.resMgr.adaptWidget(this._rightChartPanel, true);
        if (cv.config.IS_IPHONEX_SCREEN) {
            this._chartBg.setAnchorPoint(cc.v2(1, 0));
            let chartSize = this._rightChartPanel.getContentSize();
            this._rightChartPanel.setContentSize(cc.size(chartSize.width + cv.viewAdaptive.IPHONEX_OFFSETY, chartSize.height));
            this._chartBg.setContentSize(cc.size(chartSize.width + cv.viewAdaptive.IPHONEX_OFFSETY, chartSize.height));
            panelRecord.setPosition(panelRecord.x - cv.viewAdaptive.IPHONEX_OFFSETY, panelRecord.y);
            panel1.setPosition(panel1.x - cv.viewAdaptive.IPHONEX_OFFSETY, panel1.y);
            panel2.setContentSize(cc.size(panel2.width + cv.viewAdaptive.IPHONEX_OFFSETY, panel2.height));
        }
        panel1.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            cv.videoCowboyNet.RequestTrend();
            this._cowboyChart.active = true;
            this.playCowboyEffect(this.s_button);
        });

        panel2.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            cv.videoCowboyNet.RequestTrend();
            this._cowboyChart.active = true;
            this.playCowboyEffect(this.s_button);
        });
        // this._btnZouShi.enabled = false;
        // this._topBg.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
        //     cv.videoCowboyNet.RequestTrend();
        //     this._cowboyChart.active = true;
        //     cv.MessageCenter.send("on_display_page1");
        //     this.playCowboyEffect(this.s_button);
        // }, this);

        for (let i = 0; i < this._recordNum + 1; i++) {
            this._recordDots.push((panelRecord.getChildByName(cv.StringTools.formatC("recordDot%d", i))).getComponent(cc.Sprite));
            let pos: cc.Vec2 = cc.v2(this._recordDots[i].node.getPosition());
            this._oriRecordDotsPos.push(pos);
        }
        this._lastRecordDotWorldPos = panelRecord.convertToWorldSpaceAR(this._recordDots[this._recordNum - 1].node.getPosition());

        //走势
        this._btnZouShi.node.on("click", (event: cc.Event): void => {
            cv.videoCowboyNet.RequestTrend();
            this._cowboyChart.active = true;
            this.playCowboyEffect(this.s_button);
        }, this);

        this._topBg = this.node.getChildByName("top_bg").getComponent(cc.Sprite);
    }

    updateDotState(): void {
        this.hideHistoryMoveAnim();

        let historySize = VideoCowboyManager.getVideoCowboyRoom().historyResults.length;

        if (historySize == 1) {
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

        let historySize = VideoCowboyManager.getVideoCowboyRoom().historyResults.length;
        for (let i = 0; i < this._recordNum; i++) {
            // 逆序取
            let historyIdx = historySize - i - 1;
            let recordDotIdx = this._recordNum - i - 1;
            this._recordDots[recordDotIdx].node.active = (true);
            if (this._recordDotsTemp.length > 0) {
                this._recordDotsTemp[recordDotIdx].node.active = (true);
            }
            if (historyIdx < 0) {
                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDots[recordDotIdx], "record_draw");
                this._recordDots[recordDotIdx].node.active = false;

                if (this._recordDotsTemp.length > 0) {
                    VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDotsTemp[recordDotIdx], "record_draw");
                    this._recordDotsTemp[recordDotIdx].node.active = false;
                }
            }
            else {
                let betOption = VideoCowboyManager.getVideoCowboyRoom().historyResults[historyIdx];
                let frameName = "record_draw";
                if (betOption == VideoCowboyManager.Enum.BetZoneOption.RED_WIN) {
                    frameName = "record_red";
                }
                else if (betOption == VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN) {
                    frameName = "record_blue";
                }
                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDots[recordDotIdx], frameName);
                this._recordDots[recordDotIdx].node.active = (true);

                if (this._recordDotsTemp.length > 0) {
                    VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDotsTemp[recordDotIdx], frameName);
                    this._recordDotsTemp[recordDotIdx].node.active = (true);
                }
            }
        }
    }

    updateHistoryResultsPrevious(): void {
        let last = VideoCowboyManager.getVideoCowboyRoom().removeCurrentHistoryResult();
        if (last != -1) {
            this.updateHistoryResults();
            VideoCowboyManager.getVideoCowboyRoom().addCurrentHistoryResult(last);
        }
    }

    showHistoryMoveAnim(): void {
        if (VideoCowboyManager.getVideoCowboyRoom().historyResults.length > 0) {
            // 设置最新胜负标记
            let betOption = VideoCowboyManager.getVideoCowboyRoom().historyResults[VideoCowboyManager.getVideoCowboyRoom().historyResults.length - 1];
            let frameName = "record_draw";
            if (betOption == VideoCowboyManager.Enum.BetZoneOption.RED_WIN) {
                frameName = "record_red";
            }
            else if (betOption == VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN) {
                frameName = "record_blue";
            }
            let len = cv.StringTools.getArrayLength(this._recordDots);
            console.log("----. len = " + len)
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, this._recordDots[len - 1], frameName);

            // 位移动画
            let moveOffset = cc.v2(this._oriRecordDotsPos[0].x - this._oriRecordDotsPos[1].x, this._oriRecordDotsPos[0].y - this._oriRecordDotsPos[1].y);
            this.updateDotState();
            let historySize = VideoCowboyManager.getVideoCowboyRoom().historyResults.length;

            for (let i = 0; i < len; i++) {
                console.log("----2222222----. len = " + len + ", i = " + i)
                if (this._recordDots[i].node.active == true) {
                    let historySize = VideoCowboyManager.getVideoCowboyRoom().historyResults.length;

                    if (historySize == 1) {
                        this.updateHistoryResults();
                    }
                    else {
                        this._recordDots[i].node.runAction(cc.sequence(cc.moveBy(0.3, moveOffset), cc.callFunc(function () {
                            let lenX = cv.StringTools.getArrayLength(this._recordDots);
                            // if (historySize < len)
                            // {
                            //     this._recordDots[i].node.active = false;
                            // }
                            console.log("--------. len = " + len + ", i = " + i)
                            if (i == len - 2) {
                                this.updateHistoryResults();
                            }
                        }.bind(this))));
                    }
                }
            }

            cv.MessageCenter.send("cowboy_start_history_move_anim");

            let isOpen = VideoCowboyManager.getVideoCowboyRoom().isOpen;
            if (isOpen) {
                cv.videoCowboyNet.RequestTrend();
            }
        }
    }

    hideHistoryMoveAnim(): void {
        let len = cv.StringTools.getArrayLength(this._recordDots);
        for (let i = 0; i < len; i++) {
            this._recordDots[i].node.stopAllActions();
            this._recordDots[i].node.setPosition(this._oriRecordDotsPos[i]);
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
        cv.MessageCenter.register("on_cowboy_advance_autobet", this._onMsgAdvanceAutobet.bind(this), this.node);							    // 高级续投
        cv.MessageCenter.register("on_cowboy_advance_autobet_cancel", this._onMsgAdvanceAutobetCancel.bind(this), this.node);					// 取消高级续投成功
    }

    OnTrendUpdate(): void {
        //for test
        //VideoCowboyManager.getVideoCowboyRoom().trendData = [];
        //VideoCowboyManager.getVideoCowboyRoom().dailyStat = [];

        // if (this._cowboyChart != null && VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend == false) {
        //     VideoCowboyManager.getVideoCowboyRoom().trendData = VideoCowboyManager.getVideoCowboyRoom().lasttrendData;
        //     VideoCowboyManager.getVideoCowboyRoom().dailyStat = VideoCowboyManager.getVideoCowboyRoom().dailyStat;
        // }

        this._cowboyChart.getComponent(VideoCowboyChart).setData();
        this._cowboyChart.getComponent(VideoCowboyChart).moveChart();
    }

    OnPlayerListUpdate(): void {
        if (this._cowboyList == null) {
            this._cowboyList = cc.instantiate(this.cowboyList);
            this._cowboyList.zIndex = (COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
            this.node.addChild(this._cowboyList);

            this._cowboyList.getComponent(HumanboyList).setVideoCowboyData();
            this._cowboyList.getComponent(HumanboyList).displayCell(0);
        }
        else {
            this._cowboyList.active = true;
            this._cowboyList.getComponent(HumanboyList).setVideoCowboyData();
            this._cowboyList.getComponent(HumanboyList).displayCell(-1);
        }
    }

    OnGameDataSynNotify(): void {
        console.error("------------------------------------OnGameDataSynNotify--------------------------.");
        this._bSwitchTable = false;
        VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
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
        if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.GAME_PENDING)	// 房间新建的，准备开局
        {
            // do nothing
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.NEW_ROUND)	// 新的一局
        {
            this.updateCards();
            this._updateAllWayOut();
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.BET)	// 下注
        {
            this.updateCards();
            this._updateAllWayOut();
            this.updateAllBetAreas();
            this.updateBetCoutDown();

            // 下注剩余时间大于4s，显示出战动画
            if (this._leftTime > 0) {
                this.showFightBeginAnim();
                // 检测是否正在使用高级续投
                if (VideoCowboyManager.getVideoCowboyRoom().canAdvanceAuto) {
                    this._checkAdvanceAutoReq();
                }
            } else {
                this.playKaiPai(null);
            }
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().curState == video_cowboy_proto.RoundState.SKIP_ROUND) {
            this.updateCards();
            this._updateAllWayOut();
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().curState == video_cowboy_proto.RoundState.SHOW_CARD) {
            this.updateCards();
            this._updateAllWayOut();
            this.updateAllBetAreas();
            this.updateBetCoutDown();
            cv.MessageCenter.send("videoCowboy_ShowCardNotify", "0");
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().curState == VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND)	// 处于结束期间并即将开启新的一局
        {
            let isSpecial = this.isResultSpecialCardType();
            let _specialDuration = isSpecial ? this._specialCardTypeDuration : 0;	// 特殊牌型动画时间

            this.showWaitForNextRoundInAnim();
            cv.MessageCenter.send("videoCowboy_ShowCardNotify", "0");
            this._openCardLayer.updateCardType();
            this._openCardLayer.updateWinCards();

            if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration + this._showHandCardsDuration + this._fightEndDuration + this._betCountDownEndDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.updateAllCardsBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                // this.showBetCoutDownEndAnim();
                this.showHandCardsAnim();
                this.playJieSuan();
                console.log("OnGameDataSynNotify, enter this.showBetCoutDownEndAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration + this._showHandCardsDuration + this._fightEndDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.updateAllCardsBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.playJieSuan();
                // this.showFightEndAnim();
                console.log("OnGameDataSynNotify, enter showFightEndAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration + this._showHandCardsDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.updateAllCardsBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.showHandCardsAnim();
                this.playJieSuan();
                console.log("OnGameDataSynNotify, enter showHandCardsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration + this._showPublicCardsDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = false;
                this.updateHistoryResultsPrevious();
                this.updateAllCardsExceptPublicBeforeSettle();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                // this.showPublicCardsAnim();
                this.showHandCardsAnim();
                this.playJieSuan();
                console.log("OnGameDataSynNotify, enter showPublicCardsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration + this._hideLoseBetCoinsDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
                this.updateHistoryResultsPrevious();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.updateCards();
                this.showHideLoseBetCoinsAnim();
                this.showCowboyLoseAnim();
                this.playJieSuan();
                console.log("OnGameDataSynNotify, enter showHideLoseBetCoinsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration + _specialDuration)	// added
            {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
                this.updateHistoryResultsPrevious();
                this.updatePlayerCoinBeforeSettle();
                this.updateAllBetAreas();
                this.updateCards();
                this.clearLoseBetCoins();
                this.showCowboyLoseAnim();
                this.playJieSuan();
                if (isSpecial) {
                    this.showSpecialCardTypeAnim();
                }
                else {
                    this.showBetWinFlagsAndFlyCoinsAnim();
                }
                console.log("OnGameDataSynNotify, enter showSpecialCardTypeAnim/showBetWinFlagsAndFlyCoinsAnim");
            }
            else if (this._leftTime > this._showNextRoundDuration + this._betWinFlagsAndFlyCoinsDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
                this.updateAllBetAreas();
                this.updateCards();
                this.clearLoseBetCoins();
                this.showCowboyLoseAnim();
                this.playJieSuan();
                if (isSpecial) {
                    this.showSpecialCardTypeAnim(true, this._leftTime - this._showNextRoundDuration - this._betWinFlagsAndFlyCoinsDuration);
                }
                else {
                    this.showBetWinFlagsAndFlyCoinsAnim();
                }
                console.log("OnGameDataSynNotify, enter showSpecialCardTypeAnim/showBetWinFlagsAndFlyCoinsAnim, left time");
            }
            else if (this._leftTime > this._showNextRoundDuration) {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
                this.updateWinFlags();
                // this.updateAllBetAreas();
                // this.updateCards();
                // this.updateCardType();
                // this.updateWinCards();
                this.showNextRoundTips();
                console.log("OnGameDataSynNotify, enter showSpecialCardTypeAnim left time");
            }
            else {
                VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;

                // this.updateAllBetAreas();
                // this.updateCards();
                // this.updateCardType();
                // this.updateWinCards();
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
            this.hideKaiPaiSprite();
        }
    }

    // 一局结束
    OnGameRoundEndNotify(): void {
        this.hideKaiPaiSprite();
        this.playJieSuan();

        this.playPointAni();
        VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = false;
        this.resetLeftTimer();

        // 下注倒计时结束动画	 . 开战动画	.	翻牌动画 . 显示win标记，金币收回动画	. 等待下一局动画
        // this.showBetCoutDownEndAnim();

        // // 隐藏高级续投选择面板
        // if (this._humanboyAdvancedAuto) {
        //     this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideSelectPanel(false);
        // }

        this.showHandCardsAnim();

        this._openCardLayer.updateCardType();
        this._openCardLayer.updateWinCards();
    }

    // 新的一局
    OnDealNotify(): void {
        VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
        if (this._openCardLayer) {
            this._openCardLayer.setMode(true);
        }
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
        VideoCowboyManager.getVideoCowboyRoom().showTheNewestTrend = true;
        this.resetLeftTimer();
        this.updatBetButtonByCurCoin();
        // this._updateBetButtonState();
        this.hideGameTips();
        // 下注倒计时开始动画
        // this.showBetCoutDownBeginAnim();
        // 检测是否正在使用高级续投
        // this._checkAdvanceAutoReq();
        this.showFightBeginAnim();
    }

    OnBetNotify(): void {
        this._updateAutoBetBtnStatus();
        // this.showBetInAnim();

        // 自己筹码变化后判断一下下注筹码状态
        if (VideoCowboyManager.getVideoCowboyRoom().curPlayerBet.uid == cv.dataHandler.getUserData().u32Uid) {
            this._updateBetButtonState();
        }

        let oneBet = VideoCowboyManager.getVideoCowboyRoom().curPlayerBet;
        let tempData = new PlayerOneBet();
        tempData.betAmount = oneBet.betAmount;
        tempData.betOption = oneBet.betOption;
        tempData.uid = oneBet.uid;
        this._vCoinOptimizationDeque.push_back(tempData);
    }

    OnAutoBetNotify(): void {
        // this.showBetInAnim(true);
        let oneBet = VideoCowboyManager.getVideoCowboyRoom().curPlayerBet;
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
        this.playCowboyBGM();
        this.stopCowboyBGM();
        this.backToCowboyListScene();
    }

    OnAutoBetSucc(): void {

        this._updateBetButtonState();
    }

    _onMsgBetAmountLevelChange(sender: any): void {
        this._updateBetAmountLevel();
        this._updateBetButtonState();
    }

    _onMsgAdvanceAutobetSet(sender: any): void {
        this._setAutoBetBtnStytle(MiniGameCommonDef.eGameboyAutoBtnStyle.GAB_STYLE_ADVANCE_USING);

        // 如果本局没有下注,且已勾选续投局数,则本局就生效一次
        if (!VideoCowboyManager.getVideoCowboyRoom().hasBetInCurRound && VideoCowboyManager.getVideoCowboyRoom().canAuto) {
            this._checkAdvanceAutoReq();
        }
    }

    _onMsgAdvanceAutobet(sender: number): void {
        let code = sender;
        switch (code) {
            case VideoCowboyManager.Enum.ErrorCode.OK:
                {
                } break;

            // 高级续投超出限红
            case VideoCowboyManager.Enum.ErrorCode.AUTO_BET_EXCEED_LIMIT:
                {
                    if (this._humanboyAdvancedAuto) {
                        this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).adaptAdvanceAutoTipsPos(this._btnBetAuto.node);
                        this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).showAdvanceAutoTips(cv.config.getStringData(cv.StringTools.formatC("Cowboy_ServerErrorCode%d", code)));
                    }
                } break;

            // 高级续投金额不足
            case VideoCowboyManager.Enum.ErrorCode.AUTO_BET_NO_MONEY:
                {
                    let strNodeName: string = "cowboy_dialog_recharge";
                    let dialogNode = this.node.getChildByName(strNodeName);
                    if (!dialogNode) {
                        dialogNode = cc.instantiate(this.HumanboyDialog_prefab);
                        let dialog = dialogNode.getComponent(HumanboyDialog);
                        dialog.show(cv.config.getStringData(cv.StringTools.formatC("Cowboy_ServerErrorCode%d", code))
                            , cv.config.getStringData("CowBoy_btn_desc_auto_cancel"), cv.config.getStringData("CowBoy_btn_desc_auto_recharge")
                            , (dialog: HumanboyDialog) => { cv.videoCowboyNet.ReqCancelAdvanceAutoBet(); }, (dialog: HumanboyDialog) => { this.openShop(null); });

                        dialogNode.name = (strNodeName);
                        this.node.addChild(dialogNode, COWBOY_LOCAL_ZORDER.COWBOY_LOCAL_ZORDER_TOAST);
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

        if (i32Error == VideoCowboyManager.Enum.ErrorCode.BET_TOO_SMALL) {
            let errText = cv.StringTools.formatC("%s", cv.config.getStringData(acBuffer));
            let formatCoin = cv.StringTools.clientGoldByServer(VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.smallBet);
            this.showCowboyToast(cv.StringTools.formatC(errText, cv.StringTools.numberToString(formatCoin)));
        }
        else if (i32Error == VideoCowboyManager.Enum.ErrorCode.NO_BET) {
            // 忽略提示:已停止下注
        }
        else {
            this.showCowboyToast(cv.StringTools.formatC("%s", cv.config.getStringData(acBuffer)));
        }
    }

    OnKickNotify(pSender: video_cowboy_proto.KickNotify): void {
        let kickType = (pSender.kickType);
        if (pSender.idle_roomid > 0) {
            if (!this._bSwitchTable) {
                VideoCowboyManager.getVideoCowboyRoom().idle_roomid = pSender.idle_roomid;
                this.showSwitchTable();
            }
            return;
        }
        if (kickType == VideoCowboyManager.Enum.Kick.IDLE_LONG_TIME) {
            this.backToMainScene(cv.StringTools.formatC("%s", cv.config.getStringData("Cowboy_server_kick_long_time_text")));
        }
        else if (kickType == VideoCowboyManager.Enum.Kick.Stop_World) {
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
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this._rewardTips.fontSize = 26;
            this._rewardTips.lineHeight = 26;
        }
        else {
            this._rewardTips.fontSize = 22;
            this._rewardTips.lineHeight = 22;
        }
        this._rewardTips.node.width = this._rewardSize.width;
        this._rewardTips.string = cv.StringTools.calculateAutoWrapString(this._rewardTips.node, value);
        this._rewardPanel.active = (true);
        this._rewardPanel.stopAllActions();
        this._rewardPanel.runAction(cc.sequence(cc.delayTime(4.0), cc.callFunc(function () { this._rewardPanel.active = false; }.bind(this))));
    }

    onBtnTopBgClick(event: cc.Event) {
        cv.videoCowboyNet.RequestTrend();
        this._cowboyChart.active = true;
        this.playCowboyEffect(this.s_button);
    }

    _onMsgUpdateWorldServerGold(): void {
        // world服接收接口已过滤只发自己, 因此这里无需再次判断(同时没有别的需求, 所以也不用缓存下发的结构) 
        let llCurGold = cv.dataHandler.getUserData().total_amount;

        // 结算阶段跳过(否则会提前知道输赢结果)
        if (VideoCowboyManager.getVideoCowboyRoom().bCanUpdateWorldServerGold) {
            // 更新自己金币信息
            VideoCowboyManager.getVideoCowboyRoom().selfPlayer.curCoin = llCurGold;
            this.updateSelfCoin();
            // this.updateSelfInfo();

            // 更新其他人信息(因为自己有可能会在8人列表中)
            // let bOnMainPlayerList = false;
            // let otherPlayersInfo = VideoCowboyManager.getVideoCowboyRoom().otherPlayers;
            // let otherInfoLen = otherPlayersInfo.length;
            // for (let i = 0; i < otherInfoLen; ++i) {
            //     if (cv.dataHandler.getUserData().u32Uid == otherPlayersInfo[i].uid) {
            //         bOnMainPlayerList = true;
            //         otherPlayersInfo[i].curCoin = llCurGold;
            //     }
            // }
            // if (bOnMainPlayerList) {
            //     this.updateOtherPlayersInfo();
            // }
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
            return;
            // 点击路子入口事件
            cv.videoCowboyNet.RequestTrend();
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
                tWayOutInfo.rtxtWayOut.node.angle = txt.angle;
                tWayOutInfo.rtxtWayOut.node.setPosition(txt.getPosition());
                tWayOutInfo.rtxtWayOut.node.active = (false);
                tWayOutInfo.rtxtWayOut.handleTouchEvent = false;

                txt.getParent().addChild(tWayOutInfo.rtxtWayOut.node);
                txt.removeFromParent(true);
                txt.destroy();
            }
        } while (0);

        // 路子显示风格
        do {
            let option = this.getBetOptionByAreaIdx(iAreaIdx);
            switch (option) {
                //case cowboy_proto.RED_WIN:					tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG;	break; // 牛仔胜利
                case VideoCowboyManager.Enum.BetZoneOption.EQUAL: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break; // 平
                //case cowboy_proto.BLUE_WIN:					tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG;	break; // 小牛胜利
                case VideoCowboyManager.Enum.BetZoneOption.HOLE_3_TONG_SAME_SHUN: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break; // 顺子/同花/同花顺
                case VideoCowboyManager.Enum.BetZoneOption.FIVE_NONE_1DUI: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break; // 高牌/一对
                case VideoCowboyManager.Enum.BetZoneOption.FIVE_2DUI: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break; // 两对
                case VideoCowboyManager.Enum.BetZoneOption.HOLE_SAME: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_AUTO;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break; // 对子
                case VideoCowboyManager.Enum.BetZoneOption.HOLE_A: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break; // 对A
                case VideoCowboyManager.Enum.BetZoneOption.FIVE_3_SHUN_TONG_HUA: tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_IMG; break; // 三条/顺子/同花
                case VideoCowboyManager.Enum.BetZoneOption.FIVE_3_2: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 200;
                } break; // 葫芦
                case VideoCowboyManager.Enum.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4: {
                    tWayOutInfo.eWayOutStyle = MiniGameCommonDef.eGameboyWayOutStyle.GWS_TXT;
                    tWayOutInfo.iWayOutLoseLimitCount = 300;
                } break; // 金刚/同花顺/皇家
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

    _showWayOutImgAnim(iAreaIdx: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
        if (vWayOutImgLen <= 0) return;

        let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;
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
        // this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.6 * this._fActExecute_WayOut), cc.callFunc(function () {
        //     if (freeIndex > vWayOutImgLen - 1) {
        //         this._showWayOutMoveAnim(iAreaIdx);
        //     }
        //     else {
        //         vWayOutImg[freeIndex].active = true;
        //         VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, vWayOutImg[freeIndex].getComponent(cc.Sprite), fileName);
        //         // vWayOutImg[freeIndex].ignoreContentAdaptWithSize(true);
        //     }
        // }.bind(this))));

        // 路子满了挤动动画
        if (freeIndex > vWayOutImgLen - 1) {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.3 * this._fActExecute_WayOut), cc.callFunc(function () {
                this._showWayOutMoveAnim(iAreaIdx);
            }.bind(this))));
        }
        else {
            this._nodeAnim.runAction(cc.sequence(cc.delayTime(0.8 * this._fActExecute_WayOut), cc.callFunc(function () {
                vWayOutImg[freeIndex].active = true;
                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, vWayOutImg[freeIndex].getComponent(cc.Sprite), fileName);
            }.bind(this))));
        }
    }

    _showWayOutAnim(iAreaIdx: number): void {
        if (!this._mapWayOutInfo.has(iAreaIdx)) return;

        let panelWayOut = (this._mapWayOutInfo.get(iAreaIdx)).panelWayOut;
        let vWayOutImg = (this._mapWayOutInfo.get(iAreaIdx)).vWayOutImg;
        let vWayOutImgLen = cv.StringTools.getArrayLength(vWayOutImg);
        if (!panelWayOut || vWayOutImgLen <= 0) return;

        let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;
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

        let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;
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
                VideoCowboyManager.loadSpriteTextureByPlist(this.game_dznz_PLIST, vWayOutImg[i].getComponent(cc.Sprite), fileName);
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

        let eCurState = VideoCowboyManager.getVideoCowboyRoom().curState;
        let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;

        let it = mapZoneData.get(this.getBetOptionByAreaIdx(iAreaIdx));
        if (it) {
            // 连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
            let luckLoseHand = it.luckLoseHand;

            if (luckLoseHand < 0) {
                rtxtWayOut.string = ("");
            }
            else if (luckLoseHand == 0) {
                if (eCurState == VideoCowboyManager.Enum.RoundState.WAIT_NEXT_ROUND) {
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
        let mapZoneData = VideoCowboyManager.getVideoCowboyRoom().mapZoneData;
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
        if (VideoCowboyManager.getVideoCowboyRoom().result == 1) {
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
        else if (VideoCowboyManager.getVideoCowboyRoom().result == -1) {
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

    _HandleStopBetNotify(): void {
        this.hideKaiJuSprite();
        this.showBetCoutDownEndAnim();
        this._leftTime = 0;
        this._updateBetButtonState();
        // 隐藏高级续投选择面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideSelectPanel(false);
        }
    }

    _HandleSkipRoundNotify() {
        this.hideKaiJuSprite();
        this.showBetClock(false);
        this.hideKaiPaiSprite();
        this.hideJieSuanSprite();
        let len = this._betCoinContents.length;
        for (let i = 0; i < len; i++) {
            this.hideAreaCoin(i, true);
        }
        let textNumLen = this._textTotalBetNum.length;
        for (let i = 0; i < textNumLen; i++) {
            let totalBet = cv.Number(this._textTotalBetNum[i].string);
            let myBet = cv.Number(this._textSelfBetNum[i].string);
            this.HandleReturnCoinToPlayers(i, myBet, true);
            this.HandleReturnCoinToPlayers(i, totalBet - myBet, false);
            this._textTotalBetNum[i].string = ("");
            this._textSelfBetNum[i].string = ("");
        }

        // 隐藏高级续投选择面板
        if (this._humanboyAdvancedAuto) {
            this._humanboyAdvancedAuto.getComponent(HumanboyAdvancedAuto).hideSelectPanel(false);
        }
    }

    _HandleCancelRoundNotify() {
        this.hideKaiPaiSprite();
        if (this._openCardLayer) {
            this._openCardLayer.setMode(true);
            this._openCardLayer.reset();
        }
    }

    HandleReturnCoinToPlayers(areaIdx: number, coin: number, isMe: boolean): void {
        if (coin <= 0) return;
        let coinContent = this._betLineNode[areaIdx];
        let betDetails = this.getBetDetailAmounts(coin * 100);
        let headMidWorldPos: cc.Vec2;
        if (isMe) {
            headMidWorldPos = this._selfCoin.node.getParent().convertToWorldSpaceAR(this._selfCoin.node.getPosition());
        }
        else {
            headMidWorldPos = this._btnPlayerList.node.getParent().convertToWorldSpaceAR(this._btnPlayerList.node.getPosition());
        }
        headMidWorldPos = this._nodeAnim.convertToNodeSpaceAR(headMidWorldPos);
        let len = cv.StringTools.getArrayLength(betDetails);
        for (let k = 0; k < len; k++) {
            let flyCoin = this.createFlyCoin(areaIdx, betDetails[k], true);
            let coinFlyBorn: cc.Vec2 = coinContent.convertToWorldSpaceAR(this.getOneAreaPos(areaIdx, this.isCircleCoin(betDetails[k])));
            coinFlyBorn = this._nodeAnim.convertToNodeSpaceAR(coinFlyBorn);
            this._nodeAnim.addChild(flyCoin.node);
            flyCoin.node.setPosition(coinFlyBorn);
            flyCoin.node.active = (false);

            // 延迟一会(win动画结束)开始飞金币 
            this.scheduleOnce(function () {
                flyCoin.node.active = (true);
                flyCoin.node.runAction(cc.sequence(cc.delayTime(0.2 + k * 0.025), cc.moveTo(0.6, headMidWorldPos).easing(cc.easeOut(0.8)), cc.destroySelf()));
            }.bind(this), 0.7);
        }
    }

    initCheckXianLu() {
        let xianLu_index = cv.Number(cv.tools.GetStringByCCFile("xianLu_index"));
        xianLu_index = xianLu_index == 0 ? 2 : xianLu_index;		//默认播放高清-中

        if (VideoCowboyManager.getVideoCowboyRoom().xianluList.length > xianLu_index - 1) {
            cv.MessageCenter.send("LiveVideo_onChangeXianLu", VideoCowboyManager.getVideoCowboyRoom().xianluList[xianLu_index - 1]);
        }

        let btn_xianlu = this.node.getChildByName("btn_xianlu");
        this._btn_xianlu = btn_xianlu;
        btn_xianlu.zIndex = (2);
        if (cv.config.IS_IPHONEX_SCREEN) {
            btn_xianlu.setPosition(btn_xianlu.x - cv.viewAdaptive.IPHONEX_OFFSETY, btn_xianlu.y);
        }
        this._statusLayerPosNode = btn_xianlu.getChildByName("statusLayer_pos");

        this._videoStatusTips = btn_xianlu.getChildByName("Image_videoTips");
        let content_0 = this._videoStatusTips.getChildByName("content_0");
        this._videoStatusTips.zIndex = (-3);
        this._videoStatusTips.active = (false);
        let btn_xianlu_real = btn_xianlu.getChildByName("btn_xianlu");

        let Panel_1 = btn_xianlu.getChildByName("Panel_1");
        Panel_1.setScale(1.0, 72.0 / 300);
        Panel_1.zIndex = (-2);
        let Button_current = btn_xianlu.getChildByName("Button_current");
        Button_current.zIndex = (-1);
        Button_current.active = (true);
        Button_current.getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData(cv.StringTools.formatC("VideoCowboy_videoResource_Text_%d", xianLu_index - 1));
        content_0.getComponent(cc.Label).string = cv.config.getStringData(cv.StringTools.formatC("VideoCowboy_videoResource_Text_%d", xianLu_index - 1));
        let Image_current = btn_xianlu.getChildByName("Image_current");
        Image_current.zIndex = (-2);
        for (let i = 0; i < 3; i++) {
            let tempBtn = Panel_1.getChildByName(cv.StringTools.formatC("Button_%d", i));
            tempBtn.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData(cv.StringTools.formatC("VideoCowboy_videoResource_Text_%d", i)));
            tempBtn.on("click", (event: cc.Event) => {
                cv.AudioMgr.playButtonSound('button_click');
                if (VideoCowboyManager.getVideoCowboyRoom().xianluList.length > i) {
                    cv.MessageCenter.send("LiveVideo_onChangeXianLu", VideoCowboyManager.getVideoCowboyRoom().xianluList[i]);
                }
                cv.tools.SaveStringByCCFile("xianLu_index", cv.String(i + 1));
                let btn = tempBtn;
                Button_current.getChildByName("Label").getComponent(cc.Label).string = btn.getChildByName("Label").getComponent(cc.Label).string;
                content_0.getComponent(cc.Label).string = btn.getChildByName("Label").getComponent(cc.Label).string;

                Panel_1.runAction(cc.sequence(cc.scaleTo(0.3, 1.0, 72.0 / 300), cc.callFunc(function () {
                    Panel_1.active = (false);
                    // btn_xianlu_real.getComponent(cc.Button).interactable = (true);
                    if (!this._videoStatusTips.active) {
                        Button_current.active = (true);
                        Image_current.active = (true);
                    }
                }.bind(this))));
            });
        }

        btn_xianlu_real.on("click", (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('button_click');
            // btn_xianlu_real.getComponent(cc.Button).interactable = (false);
            if (!Panel_1.active) {
                Button_current.active = (false);
                Image_current.active = (false);
                Panel_1.active = (true);
                Panel_1.runAction(cc.scaleTo(0.3, 1.0));
            }
            else {
                Panel_1.stopAllActions();
                Panel_1.runAction(cc.sequence(cc.scaleTo(0.3, 1.0, 72.0 / 300), cc.callFunc(function () {
                    Panel_1.active = (false);
                    // btn_xianlu_real.getComponent(cc.Button).interactable = (true);
                    if (!this._videoStatusTips.active) {
                        Button_current.active = (true);
                        Image_current.active = (true);
                    }
                }.bind(this)
                )));
            }
        });

        Button_current.on("click", (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('button_click');
            // btn_xianlu_real.getComponent(cc.Button).interactable = (false);
            if (!Panel_1.active) {
                Button_current.active = (false);
                Image_current.active = (false);
                Panel_1.active = (true);
                Panel_1.runAction(cc.scaleTo(0.3, 1.0));
            }
            else {
                Panel_1.stopAllActions();
                Panel_1.runAction(cc.sequence(cc.scaleTo(0.3, 1.0, 72.0 / 300), cc.callFunc(function () {
                    Panel_1.active = (false);
                    // btn_xianlu_real.getComponent(cc.Button).interactable = (true);
                    if (!this._videoStatusTips.active) {
                        Button_current.active = (true);
                        Image_current.active = (true);
                    }
                }.bind(this)
                )));
            }
        });

        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
            if (!Panel_1.active) return true;
            Panel_1.runAction(cc.sequence(cc.scaleTo(0.3, 1.0, 72.0 / 300), cc.callFunc(function () {
                Panel_1.active = (false);
                //  btn_xianlu_real.getComponent(cc.Button).interactable = (true);
                if (!this._videoStatusTips.active) {
                    Button_current.active = (true);
                    Image_current.active = (true);
                }
            }.bind(this)
            )));
        });
        // let touchListener = cc.EventListenerTouchOneByOne:: create();
        // touchListener.setSwallowTouches(false);
        // touchListener.onTouchBegan = [=](Touch * touch, Event * event).bool {
        //     if (!Panel_1.isVisible()) return true;
        //     Panel_1.runAction(cc.sequence(cc.scaleTo(0.3, 1.0f, 72.0 / 300), cc.callFunc(() => {
        //         Panel_1.active = (false);
        //         btn_xianlu.setTouchEnabled(true);
        //         if (!this._videoStatusTips.isVisible()) {
        //             Button_current.active = (true);
        //             Image_current.active = (true);
        //         }
        //     }), nullptr));
        //     return true;
        // };
        // Director:: getInstance().getEventDispatcher().addEventListenerWithSceneGraphPriority(touchListener, Panel_1);
    }

    onExitCowboyLiveVideo() {
        if (this._cowboyExit) {
            this._cowboyExit.active = (false);
        }
    }

    showVideoStatusTips() {
        if (!this._videoStatusTips) return;

        let content = this._videoStatusTips.getChildByName("content").getComponent(cc.Label);
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            content.fontSize = (26);
        }
        else {
            content.fontSize = (24);
        }
        content.string = (cv.config.getStringData("VideoCowboy_videoTips"));

        this._videoStatusTips.active = (true);
        this._videoStatusTips.stopAllActions();
        this._videoStatusTips.scaleX = (0.3);//待验证

        let Panel_1 = this._btn_xianlu.getChildByName("Panel_1");
        let Button_current = this._btn_xianlu.getChildByName("Button_current");
        let Image_current = this._btn_xianlu.getChildByName("Image_current");

        Button_current.active = (false);
        Image_current.active = (false);

        this._videoStatusTips.runAction(cc.sequence(cc.scaleTo(0.2, 1.0, 1.0), cc.delayTime(5.0), cc.scaleTo(0.3, 0.3, 1.0), cc.callFunc(function () {
            this._videoStatusTips.active = (false);
            if (!Panel_1.active) {
                Button_current.active = (true);
                Image_current.active = (true);
            }
        }.bind(this))));
    }

    _initAreaLineData() {
        this._betLineNode = [];
        this.lineInfoArr = [];
        for (let i = 0; i < 2; i++) {
            this.lineInfoArr.push([]);
            for (let j = 0; j < 8; j++) {
                this.lineInfoArr[i].push(new betAreaLineInfo());
            }
        }

        let areaNum = this._betAreas.length;
        for (let k = 0; k < 2; k++) {
            for (let i = 0; i < areaNum; i++) {
                let node = this._betAreas[i].getChildByName("Node_corner");
                node.active = (false);
                let count = node.childrenCount;
                let vecPos: cc.Vec2[] = [];//顺时针的点数组
                if (k == 0) {
                    this._betLineNode.push(node);
                    for (let n = 0; n < count / 2; n++) {
                        let img = node.getChildByName(cv.StringTools.formatC("Image_%d", n));
                        if (img) {
                            vecPos.push(img.getPosition());
                        }
                    }
                }
                else {
                    for (let n = count / 2; n < count; n++) {
                        let img = node.getChildByName(cv.StringTools.formatC("Image_%d", n));
                        if (img) {
                            vecPos.push(img.getPosition());
                        }
                    }
                }

                let minX = vecPos[0].x;
                let minY = vecPos[0].y;
                let maxX = vecPos[0].x;
                let maxY = vecPos[0].y;
                let vecPosLen = vecPos.length;
                for (let j = 0; j < vecPosLen; j++) {
                    if (vecPos[j].x < minX) {
                        minX = vecPos[j].x;
                    }
                    if (vecPos[j].x > maxX) {
                        maxX = vecPos[j].x;
                    }
                    if (vecPos[j].y < minY) {
                        minY = vecPos[j].y;
                    }
                    if (vecPos[j].y > maxY) {
                        maxY = vecPos[j].y;
                    }
                }

                this.lineInfoArr[k][i].minX = minX;
                this.lineInfoArr[k][i].minY = minY;
                this.lineInfoArr[k][i].maxX = maxX;
                this.lineInfoArr[k][i].maxY = maxY;

                this.lineInfoArr[k][i].aArr = [];
                this.lineInfoArr[k][i].bArr = [];

                for (let j = 0; j < vecPosLen; j++) {
                    //y = a* x + b
                    let m = j + 1 < vecPosLen ? j + 1 : 0;
                    let a = (vecPos[m].y - vecPos[j].y) / (vecPos[m].x - vecPos[j].x);
                    let b = vecPos[j].y - a * vecPos[j].x;
                    this.lineInfoArr[k][i].aArr.push(a);
                    this.lineInfoArr[k][i].bArr.push(b);
                    if (vecPos[m].x > vecPos[j].x) {
                        this.lineInfoArr[k][i].x1.push(vecPos[j].x);
                        this.lineInfoArr[k][i].x2.push(vecPos[m].x);
                    }
                    else {
                        this.lineInfoArr[k][i].x1.push(vecPos[m].x);
                        this.lineInfoArr[k][i].x2.push(vecPos[j].x);
                    }
                }
            }
        }
    }

    getOneAreaPos(iAreaIdx: number, isCircle: boolean): cc.Vec2 {
        //SESrand(time(0));
        let shapeNum = isCircle ? 0 : 1;
        let info: betAreaLineInfo = this.lineInfoArr[shapeNum][iAreaIdx];
        let randX = this.SERangeRandomf(info.minX, info.maxX);
        let randY;
        let yRange: number[] = [];

        let aArrLen = info.aArr.length;
        for (let i = 0; i < aArrLen; i++) {
            if (randX < info.x1[i] || randX > info.x2[i]) continue;
            let tempF = info.aArr[i] * randX + info.bArr[i];
            if (tempF >= info.minY && tempF <= info.maxY) {
                yRange.push(tempF);
            }
        }

        if (yRange.length != 2) {
            console.error("-------.存在数据错误");
        }

        if (yRange[0] > yRange[1]) {
            randY = this.SERangeRandomf(yRange[1], yRange[0]);
        }
        else {
            randY = this.SERangeRandomf(yRange[0], yRange[1]);
        }

        return cc.v2(randX, randY);
    }

    _initBetClock() {
        if (!this._clock_node) {
            let winSize = cc.winSize;
            let _clock_node_pos = this.node.getChildByName("Image_clock").getPosition();

            this._clock_node = cc.instantiate(this.clock_prefab);
            this.node.addChild(this._clock_node);
            this._clock_node.setPosition(_clock_node_pos);
            this._clock_node.active = (false);

            this._clock_num_txt = this._clock_node.getChildByName("BitmapFontLabel_index").getComponent(cc.Label);
            this._clock_num_txt.string = ("");
            let Sprite_circle = this._clock_node.getChildByName("Sprite_circle");
            this._clock_green = this._clock_node.getChildByName("Sprite_circle_0").getComponent(cc.Sprite);
            this._clock_circle = Sprite_circle.getComponent(cc.ProgressBar);
            this._clock_circle.progress = (0);

            let Image_txt: cc.Sprite = this._clock_node.getChildByName("Image_txt").getComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.videoLanguage_PLIST, Image_txt, "txt_qxz");
        }
    }

    showBetClock(isView: boolean) {
        if (!this._clock_node) return;

        this._clock_node.active = (isView);

        if (isView) {
            this._clock_node.setScale(0.0);
            this._clock_node.runAction(cc.sequence(cc.scaleTo(0.3, 1.0), cc.scaleTo(1.0 / 40, 1.1), cc.scaleTo(1.0 / 40, 1.0), cc.scaleTo(1.0 / 40, 1.05), cc.scaleTo(1.0 / 40, 1.0), cc.callFunc(function () {
                this._clock_total_time = this._leftTime;
                if (this._clock_total_time <= 5) {
                    this._clock_canChange = true;
                    this.handleClockChangeColor();
                }
                this.schedule(this.updateClockCircle, 0.1);// / 40.0
            }.bind(this))));
        }
        else {
            this._clock_total_time = 0;
            this._clock_canChange = false;
            this._clock_node.stopAllActions();
        }

        this._clock_circle.progress = (0);
        this.unschedule(this.updateClockCircle);
    }

    updateClockCircle(f32Delta: number) {
        let percent = this._clock_circle.progress + 1.0 / ((this._clock_total_time - 1) * 10);// * 40
        percent = percent >= 1.0 ? 1.0 : percent;
        this._clock_circle.progress = (percent);

        if (this._clock_circle.progress >= 1.0) {
            this.unschedule(this.updateClockCircle);
        }
    }

    handleClockChangeColor() {
        if (this._clock_canChange) {
            this._clock_num_txt.font = this.time_xiazhu;//("videoCowboy/fnt/time_xiazhu.fnt");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_videonz_PLIST, this._clock_green, "red_bg");
        }
        else {
            this._clock_num_txt.font = this.time_xiazhu_1;//("videoCowboy/fnt/time_xiazhu_1.fnt");
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_videonz_PLIST, this._clock_green, "green_bg");
        }
    }

    playKaiJu() {
        if (!this._kaiju_Sprite) {

            this._kaiju_Sprite = (new cc.Node()).addComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.videoLanguage_PLIST, this._kaiju_Sprite, "xiazhu_ani");
            this.node.addChild(this._kaiju_Sprite.node);
            this._kaiju_Sprite.node.setPosition(this._clock_node.getPosition());
            this._kaiju_Sprite.node.active = (false);
        }
        this._kaiju_Sprite.node.setScale(0.8);
        this._kaiju_Sprite.node.active = (true);
        this._kaiju_Sprite.node.runAction(cc.sequence(cc.scaleTo(0.3, 1.0), cc.scaleTo(1.0 / 40, 1.1), cc.scaleTo(1.0 / 40, 1.0), cc.scaleTo(1.0 / 40, 1.05), cc.scaleTo(1.0 / 40, 1.0), cc.delayTime(0.2), cc.scaleTo(0.2, 0), cc.callFunc(function () {
            this._kaiju_Sprite.node.active = (false);
            this.showBetClock(true);
        }.bind(this))));
    }

    playStopXiazhu() {
        if (!this._stopXz_Sprite) {
            this._stopXz_Sprite = (new cc.Node()).addComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.videoLanguage_PLIST, this._stopXz_Sprite, "stopXz_ani");
            this.node.addChild(this._stopXz_Sprite.node);
            this._stopXz_Sprite.node.setPosition(this._clock_node.getPosition());
            this._stopXz_Sprite.node.active = (false);
        }
        this.playCowboyEffect(this.s_end_bet);
        this._stopXz_Sprite.node.setScale(0.8);
        this._stopXz_Sprite.node.active = (true);
        this._stopXz_Sprite.node.runAction(cc.sequence(cc.scaleTo(0.3, 1.0), cc.scaleTo(1.0 / 40, 1.1), cc.scaleTo(1.0 / 40, 1.0), cc.scaleTo(1.0 / 40, 1.05), cc.scaleTo(1.0 / 40, 1.0), cc.delayTime(0.2), cc.scaleTo(0.2, 0), cc.callFunc(function () {
            this._stopXz_Sprite.node.active = (false);
            this.playKaiPai(null);
        }.bind(this))));
    }

    playKaiPai(sender: string) {
        let result = false;
        if (sender) {
            result = sender == "1";
            this._openCardLayer.showCardNotify(result);
        }

        if (!this._openCard_Sprite) {
            this._openCard_Sprite = (new cc.Node()).addComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.videoLanguage_PLIST, this._openCard_Sprite, "kaibai");
            this.node.addChild(this._openCard_Sprite.node);
            this._openCard_Sprite.node.setPosition(this._clock_node.getPosition());
            this._openCard_Sprite.node.active = (false);

            this._openCard_blink = (new cc.Node()).addComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_videonz_PLIST, this._openCard_blink, "opencard_blink");
            this._openCard_Sprite.node.addChild(this._openCard_blink.node);
            let size = this._openCard_Sprite.node.getContentSize();
            // this._openCard_blink.node.setPosition(cc.v2(size.width * 0.5, size.height * 0.5));

        }

        if (this._openCard_Sprite.node.active) return;
        this._openCard_Sprite.node.active = (true);
        this._openCard_Sprite.node.setScale(0.0);
        this._openCard_Sprite.node.runAction(cc.sequence(cc.scaleTo(0.3, 1.0), cc.scaleTo(1.0 / 40, 1.1), cc.scaleTo(1.0 / 40, 1.0), cc.scaleTo(1.0 / 40, 1.05), cc.scaleTo(1.0 / 40, 1.0)));
        this._openCard_blink.node.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(0.75), cc.fadeIn(0.75))));
    }

    onRealBackMainScene() {
        // 回到大厅
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }

    playJieSuan() {
        if (!this._jieSuan_Sprite) {
            this._jieSuan_Sprite = (new cc.Node()).addComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.videoLanguage_PLIST, this._jieSuan_Sprite, "jiesuan");
            this.node.addChild(this._jieSuan_Sprite.node);
            this._jieSuan_Sprite.node.setPosition(this._clock_node.getPosition());

            this._jieSuan_blink = (new cc.Node()).addComponent(cc.Sprite);
            VideoCowboyManager.loadSpriteTextureByPlist(this.game_videonz_PLIST, this._jieSuan_blink, "jiesuan_blink");
            this._jieSuan_Sprite.node.addChild(this._jieSuan_blink.node);
            let size = this._jieSuan_Sprite.node.getContentSize();
            // this._jieSuan_blink.node.setPosition(cc.v2(size.width * 0.5, size.height * 0.5));
        }
        this._jieSuan_Sprite.node.active = (true);
        this._jieSuan_Sprite.node.setScale(0.0);
        this._jieSuan_Sprite.node.runAction(cc.sequence(cc.scaleTo(0.3, 1.0), cc.scaleTo(1.0 / 40, 1.1), cc.scaleTo(1.0 / 40, 1.0), cc.scaleTo(1.0 / 40, 1.05), cc.scaleTo(1.0 / 40, 1.0)));
        this._jieSuan_blink.node.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(0.75), cc.fadeIn(0.75))));
    }

    hideKaiJuSprite() {
        if (this._kaiju_Sprite) {
            this._kaiju_Sprite.node.stopAllActions();
            this._kaiju_Sprite.node.active = (false);
        }
    }

    hideStopXiazhuSprite() {
        if (this._stopXz_Sprite) {
            this._stopXz_Sprite.node.stopAllActions();
            this._stopXz_Sprite.node.active = (false);
        }
    }

    hideKaiPaiSprite() {
        if (this._openCard_Sprite) {
            this._openCard_Sprite.node.stopAllActions();
            this._openCard_Sprite.node.active = (false);
        }
    }

    hideJieSuanSprite() {
        if (this._jieSuan_Sprite) {
            this._jieSuan_Sprite.node.stopAllActions();
            this._jieSuan_Sprite.node.active = (false);
        }
    }

    playPointAni() {
        let points_num = VideoCowboyManager.getVideoCowboyRoom().change_points;
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
        VideoCowboyManager.getVideoCowboyRoom().change_points = 0;
        if (this.points_node) {
            this.points_node.getComponent(HeadPointsAni).resetPointAni();
        }
    }

    showSwitchTable() {
        if (this._bSwitchTable) return;
        this._bSwitchTable = true;
        cv.TP.showMsg(cv.config.getStringData("MiniGames_Switch_content"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            cv.roomManager.setCurrentRoomID(VideoCowboyManager.getVideoCowboyRoom().idle_roomid);
            cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            cv.roomManager.RequestJoinRoom();
        }, () => {
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
            this.backToCowboyListScene();
        });
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_SWITCH_TABLE);
    }
}