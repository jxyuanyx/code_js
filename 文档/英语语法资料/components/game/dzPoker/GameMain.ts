import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import { GameReview } from "./gameReview/GameReview";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import { ClubScene, eClubSceneView } from "../../club/ClubScene";
import cv from "../../lobby/cv";
import AofDesc from "../Aof/AofDesc";
import FaceView from "../dzPoker/danmu/FaceView";
import FaceBarrage from "../dzPoker/danmu/FaceBarrage";
import HouseOwer from "../dzPoker/HouseOwer";
import LuckTurntablesButton from "../redEnvelope/LuckTurntablesButton";
import StarRedpacketButton from "../starRedPackacket/StarRedpacketButton";
import PokerInfoNew from "./../../../common/prefab/pokerInfo/PokerInfoNew";
import Audit from "./Audit";
import Buyin from "./Buyin";
import { Card } from "./Card";
import GameDataManager from "./data/GameDataManager";
import { PokerData } from "./data/PokerData";
import { CAFInfo, CardItem, FeeItem, NoticeAddActionTime, NoticeCommunityCards, NoticeGameAnte, NoticeGameBlind, NoticeGameElectDealer, NoticeGameHolecard, NoticeGameRoundEnd, NoticePlayerAction, NoticeResetGame, NotiPlayerHoleCard, PlayerInfo, PlayerSettleInfo, playerWinPotInfo, PositionInfo, PotIdWidthWinPotInfo, WinPotInfo, WinPotInfoPlayerIds, CommentatorInfo, StarData, RoomParams } from "./data/RoomData";
import { GameChipsMove } from "./GameChipsMove";
import { GameScene } from "./GameScene";
import { JackPotNumber } from "./JackPotNumber";
import { menu } from "./menu";
import { Seat } from "./Seat";
import { SeatStar } from "./SeatStar";
import ZoomCurentTime from "./ZoomCurentTime";

import { GuessHandCard } from "./GuessHandCard";
import { InsuranceData } from "./insurance/InsuranceData";
import { InsuranceEntrance } from "./insurance/InsuranceEntrance";
import { InsuranceHitOutsTips } from "./insurance/InsuranceHitOutsTips";
import UpgradeView from "../../lobby/login/UpgradeView";
import Tag from "../../../common/tools/Tag";
import HeadPointsAni from "../cowboy/HeadPointsAni";
import labaBtn from "./labaBtn";
import AgoraSdk from "../superstar/AgoraSdk";
import StarPrivateInfo from "./StarPrivateInfo";
import Commentator from "./Commentator";
import { HitbackFaceItem } from "./HitbackFaceItem";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import { WinRateTools } from "../../../common/winRate/winRateTools";
import { GiftStarInfo } from "./gift/GiftData";

/**
 * 游戏逻辑流程(玩家已坐下达到开局人数条件的情况)
 * 1：开始游戏      NoticeStartGame
 * 2：重置游戏      NoticeResetGame
 * 3：选定dealer位      NoticeGameElectDealer
 * 4：大小盲注位系统强制下注        NoticeGameBlind
 * 5：发放玩家手牌      NoticeGameHolecard
 * 6：根据德州规则选定第一个开始操作的玩家并通知该玩家开始操作      NoticePlayerActionTurn
 * 7：玩家操作完后广播该玩家操作，然后继续下一个玩家操作      NoticePlayerAction
 * 8：根据德州规则一轮结束没有人再加注的情况，当前轮结束（6-8为 Pre-flop 底牌权 / 前翻牌圈 - 公共牌出现以前的第一轮叫注。）     NoticeGameRoundEnd
 * 9：开始发放公共牌： Flop round 翻牌圈 - 首三张公共牌出现以后的押注圈 。      NoticeCommunityCards
 * 10：flop公共牌发完后，重复6-8
 * 11：Turn round 转牌圈 - 第四张公共牌出现以后的押注圈 。      NoticeCommunityCards
 * 12：turn牌发完，重复6-8
 * 13：River round 河牌圈 - 第五张公共牌出现以后 , 也即是摊牌以前的押注圈 。        NoticeCommunityCards
 * 14：river牌发完，重复6-8
 * 15：river轮结束，开始showdown亮出留在river的所有玩家手牌     NoticeGameShowDown
 * 16：对这一手进行结算(中间同时进行播放收池动画，胜利玩家动画)     NoticeGameSettlement
 * 17：广播玩家一些玩家主动行为如：点击亮牌，发发看，强制亮牌等功能     NoticePlayerShow
 * 18：广播离开的玩家       NoticePlayerStay
 * 19：重新开始下一轮游戏，从第1步重新开始；
 * 
 * 
 * 
 * cv.Enum.ActionButtonStatus.Control_Bet  第一个主动加注的人动作称之为bet，因为他没有raise对象，
 * cv.Enum.ActionButtonStatus.Control_Raise 主动在前面的人之后再进行加注的人动作称之为raise。
 */


const { ccclass, property } = cc._decorator;
@ccclass
export class GameMain extends cc.Component {
    @property(cc.Node) seatPanel: cc.Node = null;
    @property(cc.Node) menu_button: cc.Node = null;
    @property(cc.Node) deal_button: cc.Node = null;
    private deal_button_Posy: number = null;
    @property(cc.Node) shop_button: cc.Node = null;
    @property(cc.Label) deal_text: cc.Label = null;
    @property(cc.Node) deal_icon: cc.Node = null;
    @property(cc.Node) addTime_button: cc.Node = null;
    @property(cc.Node) damon_img: cc.Node = null;
    @property(cc.Node) waitForStart_img: cc.Node = null;
    @property(cc.Node) allReview_button: cc.Node = null;
    @property(cc.Node) currentTime_button: cc.Node = null;
    @property(cc.Node) face_button: cc.Node = null;
    @property(cc.Node) record_button_img: cc.Node = null;
    @property(cc.Node) record_button: cc.Node = null;
    @property(cc.Node) gaopai: cc.Node = null;
    @property(cc.Label) dichiChip_text: cc.Label = null;
    @property(cc.Node) mainpool: cc.Node = null;
    @property(cc.Node) D_img: cc.Node = null;
    @property(cc.Node) actionButtonView: cc.Node = null;
    @property(cc.Node) actionButtonView_2: cc.Node = null;
    @property(cc.Node) mychips_bg: cc.Node = null;//freeFill_img
    @property(cc.Node) sliderBg: cc.Node = null;
    @property(cc.Node) freeSliderText_bg: cc.Node = null;
    @property(cc.Label) freeSliderText: cc.Label = null;
    @property(cc.Slider) freeSlider: cc.Slider = null;
    @property(cc.Node) freeHandle: cc.Node = null;
    @property(cc.Node) percent_img: cc.Node = null;
    @property(cc.Node) backGame_button: cc.Node = null;
    @property(cc.Node) startGame_button: cc.Node = null;
    @property(cc.Node) forceShowCard_button: cc.Node = null;
    private forceShowCard_button_PosY: number = null;
    @property(cc.Node) showcardDamon_img: cc.Node = null;
    @property(cc.Label) forceShowCard_text: cc.Label = null;
    @property(cc.Label) mainpool_text: cc.Label = null;
    @property(cc.Label) mangZhu_text: cc.Label = null;
    @property(cc.Button) freeFill_button: cc.Button = null;
    @property(cc.Node) freeFill_button_img: cc.Node = null;

    @property(cc.Prefab) prefab_report: cc.Prefab = null;               // 举报框预设体
    @property(cc.Prefab) seat: cc.Prefab = null;
    @property(cc.Prefab) seatStar: cc.Prefab = null;
    @property(cc.Prefab) jackNumber: cc.Prefab = null;
    @property(cc.Sprite) followFill_Blue: cc.Sprite = null;
    @property(cc.Sprite) giveUpRed: cc.Sprite = null;
    @property(cc.Label) followFill_text: cc.Label = null;
    @property(cc.Button) followFill_button: cc.Button = null;


    @property(cc.Button) dichi_button0: cc.Button = null;
    @property(cc.Button) dichi_button1: cc.Button = null;
    @property(cc.Button) dichi_button1_2: cc.Button = null;
    @property(cc.Button) dichi_button2: cc.Button = null;
    @property(cc.Button) dichi_button3: cc.Button = null;
    @property(cc.Button) dichi_button4: cc.Button = null;
    private dichi_buttonList: cc.Button[] = [];
    @property(cc.Label) dichi_mangZhuText0: cc.Label = null;
    @property(cc.Label) dichi_mangZhuText1: cc.Label = null;
    @property(cc.Label) dichi_mangZhuText2: cc.Label = null;
    @property(cc.Label) dichi_mangZhuText3: cc.Label = null;
    @property(cc.Label) dichi_mangZhuText4: cc.Label = null;

    @property(cc.Label) addTime_text: cc.Label = null;
    @property(cc.Node) publicCard_panel: cc.Node = null;
    @property(cc.Node) card_panel: cc.Node = null;
    @property(cc.Node) modal_panel: cc.Node = null;
    @property(cc.Label) thinkCdTime_text: cc.Label = null;
    @property(cc.ProgressBar) thankProgressBar: cc.ProgressBar = null;

    @property(cc.Label) cardFunTips_text: cc.Label = null;
    @property(cc.Node) sliderAllin: cc.Node = null;

    @property(cc.Sprite) wordImg: cc.Sprite = null;
    @property(cc.Sprite) lightImg: cc.Sprite = null;

    @property(cc.Node) practil_panel: cc.Node = null;
    @property(cc.Node) short_pai: cc.Node = null;
    @property(cc.Prefab) PokerInfo_fab: cc.Prefab = null;
    @property(cc.Prefab) PokerInfo_fab_new: cc.Prefab = null;
    @property(cc.Node) zoomWaitNode: cc.Node = null;
    @property(cc.Node) BombTipsNode: cc.Node = null;
    @property(cc.Node) youwin: cc.Node = null;
    @property(cc.Prefab) upgradePref: cc.Prefab = null;
    @property(cc.Prefab) jack_action: cc.Prefab = null;
    public sidepoolList: cc.Node[] = [];
    public sidepoolPosList: cc.Vec2[] = [];
    public menuBtnList: cc.Node[] = [];
    public seatList: Seat[] = [];
    public _JackPotNumberList: JackPotNumber[] = [];
    public postList: Array<Array<cc.Vec2>> = new Array<Array<cc.Vec2>>();
    public roomPlayerNumber: number;
    public m_bIsInit: boolean = false;
    // public pokerInfoNode = null;
    public pokerInfoNode_new = null;
    //public m_isAllInMode: boolean = false;
    public m_bIsInitDone: boolean = false;
    public m_selfActionType: number = 1;
    public _isSeat: boolean = false;

    public _isShowAudit: boolean = false; //是否打开举报
    @property(cc.Prefab) headAni: cc.Prefab = null;
    @property(cc.Prefab) calmDown_prefab: cc.Prefab = null;
    @property(cc.Prefab) fist_prefab: cc.Prefab = null;
    @property(cc.Prefab) zhuaji_prefab: cc.Prefab = null;
    @property(cc.Prefab) flower_prefab: cc.Prefab = null;
    @property(cc.Prefab) money_prefab: cc.Prefab = null;
    @property(cc.Prefab) towel_prefab: cc.Prefab = null;
    @property(cc.Prefab) fan_prefab: cc.Prefab = null;

    @property(cc.Prefab) zoomSurePref: cc.Prefab = null;
    //红包，拉霸按钮
    @property(cc.Button) redEnvelope_btn: cc.Layout = null;
    @property(cc.Node) aof_lost_btn: cc.Node = null;
    // @property(cc.RichText) aof_desc: cc.RichText = null;

    @property(cc.Prefab) luckButton_prefab: cc.Prefab = null;
    @property(cc.Prefab) lost_prefab: cc.Prefab = null;
    @property(cc.Prefab) labaBtn_prefab: cc.Prefab = null;
    labaBtnNode: cc.Node = null;
    @property(cc.Sprite) criticsimTips: cc.Sprite = null;
    // 明星桌红包雨按钮
    // @property(cc.Prefab) starRedpacketButton_prefab: cc.Prefab = null;

    @property(cc.Button) guess_hand_card_button: cc.Button = null;
    @property(cc.Prefab) guess_result_panel: cc.Prefab = null;
    @property(cc.Prefab) addtimePrefab: cc.Prefab = null;//延时动画
    @property(cc.Prefab) bomb_ani_prefab: cc.Prefab = null;  //暴击特效动画
    @property(cc.Node) bomb_node: cc.Node = null;  //暴击特效动画节点

    private _addtime_action: cc.Node = null;
    public lostDesc: cc.Node = null;
    public luckLayer = null;
    public starRedpacketButton: StarRedpacketButton = null;

    _roleInfo_panel: cc.Node = null;
    _headAni_arr: Array<cc.Node> = [];
    calmDown_arr: Array<cc.Node> = [];
    fist_arr: Array<cc.Node> = [];
    zhuaji_arr: Array<cc.Node> = [];
    flower_arr: Array<cc.Node> = [];
    money_arr: Array<cc.Node> = [];
    towel_arr: Array<cc.Node> = [];
    fan_arr: Array<cc.Node> = [];

    @property(cc.Prefab) bighead: cc.Prefab = null;
    public bighead_node: cc.Node = null;

    public actionButtonStatus: number;
    public giveUp_buttonIsCheck: boolean;
    public followFill_buttonIsCheck: boolean;

    private m_pkSelfCard: Card[] = [];                                  // 手牌数组
    private m_pkPublicCard: Card[] = [];                                // 公牌数组

    private m_curAllinSeats = [];                                       // 当前Allin的玩家座位SeatID

    private publicPos = cc.v2(0, 938);                                  // 公牌起始位置 在initPublicCard初始化x坐标
    private publicCard_hgp = 0;                                         // 公牌之间的间距 在initPublicCard初始化
    private selfCardPos = cc.v2(485, 140);                              // 自己牌起始位置
    private CARD_DEAL_POS = cc.v2(540, 1448);
    private m_u32DelayTimeCount: number = 0;

    public clickSeatServerId = 0;                                       // 点击的目标椅子号
    public trunIngSeatViewId = 0;                                       // 转动的椅子号 （实时变动）

    public hitbackSeatServerId = 0;                                     // 记录要反击的seatid
    public quickBetModeIsPreflop: boolean = false;                      // 当前游戏是否使用翻前快捷设置模式(默认: false)
    public quickBetUsedPreflopOnce: boolean = false;                    // 快捷下注翻前是否已使用(每局所有人总共只能使用一次)

    public TIPS_TAG = "tips_tag";

    public isRight: boolean = false;
    public m_bIsSelfShowDown: boolean = false;
    public dissolveTimeNum: number = 0;

    public GAME_DELAY_RESET_GAME_TAG = 80000;
    public GAME_DELAY_ELECT_DEALER_TAG = 80001;
    public GAME_DELAY_ANTE_TAG = 80002;
    public GAME_DELAY_BLIND_TAG = 80003;
    public GAME_DELAY_HOLECARD_TAG = 80004;
    public GAME_DELAY_ACTION_TURN_TAG = 80007;
    public GAME_DELAY_ENDROUND_TAG = 80008;
    public GAME_DELAY_NONEEDINSURANCE_TAG = 80010;
    public GAME_SHOW_GUESS_SETTLE_TAG = 80011;
    public GAME_REAL_COMMUNITY_CARD_TAG = 80012;
    public GAME_END_SETSTAKE_TAG = 80013;
    public GAME_CHIPS_MOVE_ACTION_TAG = 80014;

    public GAME_SIDE_POT_TAG_BEGIN = 90000;// 这个范围用来当做分池动画的tag 
    public GAME_SIDE_POT_TAG_END = 90010;

    public thinkCdtime: number = 100;
    public maxtime: number = 10;
    public htime: number = 0;
    public ChipsLevel: number[] = [];
    public freeSliderStep = 0;
    public greatest_bet: number;
    public _jackPotHitCardType: cc.Node = null;

    public percent_imgPosY: number = 0;
    public perPercent: number = 0;          // 自由加注条上一次拉动的百分比
    private _sliderMaxBetNum: number = 0;   // 本次"自由加注条"滑动到最大时的下注额

    public m_hashitJackpotCard: boolean = false;
    public roomHasEnd: boolean = false;
    public giveUpImg = "";//弃牌 亮
    public giveUpGrayImg = "";//弃牌 灰

    public giveUpLookImg = "";//弃或看牌 亮
    public giveUpLookGrayImg = "";//弃或看 灰

    public quickFoldImg = ""; //快速弃牌亮
    public quickFoldGrayImg = ""; //快速弃牌 灰

    public checkImg = "";//看牌（green）  亮
    public checkGrayImg = "";

    public callImg = "";//跟注  亮
    public callGrayImg = "";//跟注  灰

    public dichiButtonImg = ""//底池图片

    public allInImg = "";//allin  亮
    public allInGrayImg = "";//allin  灰

    public midSmallButton = "";
    public midBigButton = "";
    public silenceMusic: string = "zh_CN/game/dzpoker/audio/silence";	// 1背景
    public game: GameScene;


    public _runZoomSeatAction: boolean = false;
    public _isLeaveRoom: boolean = false;

    public _recordTime: number = 10;//录单倒计时时间
    public _androidRecord: boolean = false;
    public lastPercent: number = 0;
    public _isShowGuess: boolean = false;
    public _isGuessClose = false;
    public _guess_settle_amount: number = -1;

    private _onclickSliderDown: boolean = false;

    private _bReciviceCriticsStart = false;
    private _bCriticsimRound = false; //当前是暴击局

    public isBuyinEff: boolean = false;
    public isTurnSeat: boolean = false;

    public _bTouchStop = false;
    public _isAllin = false;
    private _selfCardPosY = 315;
    @property(cc.Prefab) points_ani_prefab: cc.Prefab = null;
    points_node: cc.Node = null;
    public _jackpotInfos = [];

    private _needCreateVideoEngine: boolean = true;
    private _runningOnDevice: number = 0; //0=default,1=android-emulator

    @property(cc.Prefab) hitback_faceitem_prefab: cc.Prefab = null;
    hitback_left: cc.Node = null;
    hitback_upper_left: cc.Node = null;
    hitback_upper_right: cc.Node = null;

    hitbackOn: boolean = true;
    greetOn: boolean = true;

    onLoad() {
        for (let i = 0; i < 8; i++) {
            let side: cc.Node = cc.find("sidepool" + i, this.node);
            side.active = false;
            this.sidepoolList[i] = side;
            this.sidepoolPosList[i] = side.getPosition();
        }
        this.deal_button_Posy = this.deal_button.getPosition().y;
        this.forceShowCard_button_PosY = this.forceShowCard_button.getPosition().y;
        this.dichi_buttonList.push(this.dichi_button0);
        this.dichi_buttonList.push(this.dichi_button1);
        this.dichi_buttonList.push(this.dichi_button2);
        this.dichi_buttonList.push(this.dichi_button3);
        this.dichi_buttonList.push(this.dichi_button4);
        this.dichi_buttonList.push(this.dichi_button1_2);

        this.game.guess_hand_card.active = false;
        this.guess_hand_card_button.node.active = false;
        cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));
        cv.action.setButtonActiveFalse(this.deal_button.getComponent(cc.Button));
        this._onclickSliderDown = false;
        this.actionButtonView.active = false;
        this.actionButtonView_2.active = false;
        this.addTime_button.active = false;
        this.damon_img.active = false;
        this.sliderBg.active = false;
        this.freeSliderText_bg.active = false;
        this.freeSliderText.node.active = false;
        this.zoomWaitNode.active = false;
        this._isLeaveRoom = false;
        this._bReciviceCriticsStart = false;
        this.short_pai.active = false;
        this.short_pai.getChildByName("bombFlag").active = false;
        this.BombTipsNode.active = false;
        this.backGame_button.active = false;


        //添加暴击动画
        let bombAnim = cc.instantiate(this.bomb_ani_prefab);
        bombAnim.active = false;
        bombAnim.name = "bombAnim";
        this.bomb_node.addChild(bombAnim);

        this.face_button.active = false;
        this.freeSliderText_bg.setPosition(cc.v2(this.freeSliderText_bg.x, this.sliderBg.getPosition().y + this.sliderBg.getContentSize().height - this.freeSliderText_bg.getContentSize().height / 2 + 4));
        this.freeSliderText.node.setPosition(cc.v2(this.freeSliderText.node.x, this.freeSliderText_bg.y));
        this.sliderAllin.setPosition(cc.v2(this.sliderAllin.x, this.freeSliderText_bg.y + 3));
        if (cv.config.IS_IPHONEX_SCREEN) {
            this.sliderBg.width = this.sliderBg.width - 20;
            cv.resMgr.adaptWidget(this.sliderBg, true);
        }

        this.percent_img.active = false;
        this.turnEndSitDown();//调用隐藏按钮方法
        this.criticsimTips.node.active = false;
        this.freeHandle.on(cc.Node.EventType.TOUCH_START, this.onsliderHandDown.bind(this));
        this.freeHandle.on(cc.Node.EventType.TOUCH_END, this.onsliderHandUp.bind(this));
        this.freeHandle.on(cc.Node.EventType.TOUCH_CANCEL, this.onsliderHandUp.bind(this));

        this.record_button.on(cc.Node.EventType.TOUCH_START, this.onbtnRecordClick.bind(this));
        this.record_button.on(cc.Node.EventType.TOUCH_END, this.onbtnRecordClick.bind(this));
        this.record_button.on(cc.Node.EventType.TOUCH_CANCEL, this.onbtnRecordClick.bind(this));

        this.percent_imgPosY = this.sliderBg.getPosition().y + this.freeHandle.getContentSize().height + 80;//
        this.youwin.active = false;
        this.initPos();

        this.initPublicCard();

        this.onChangeTableBg();
        this.initInsurance();
        this.initPokerInfo();
        this.aof_lost_btn.active = false;

        this.initHitback();

        this.setRecordEnabled(false);
        if (this.bighead_node == null) {
            this.bighead_node = cc.instantiate(this.bighead);
            cc.director.getScene().addChild(this.bighead_node, cv.Enum.ZORDER_TYPE.ZORDER_7, "bighead");
            this.bighead_node.position = cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
        }
        this.bighead_node.active = false;

        if (this._roleInfo_panel == null) {
            this._roleInfo_panel = cc.instantiate(this.game.starInfo);
            cc.director.getScene().addChild(this._roleInfo_panel, cv.Enum.ZORDER_TYPE.ZORDER_7, "privateinfo");
            this._roleInfo_panel.position = cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
        }
        this._roleInfo_panel.active = false;
        //私语版本，走私语切换后台注册
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.register("on_syOnEnterBackground", this.OnAppEnterBackground.bind(this), this.node);
            cv.MessageCenter.register("on_syOnEnterForeground", this.OnAppEnterForeground.bind(this), this.node);
        } else {
            cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }
        this.onUpdataStarRedpacket();
        cv.MessageCenter.register("on_snapshot_roominfo", this.OnSnapShotRoomInfo.bind(this), this.node);

        cv.MessageCenter.register("show_replay", this.showReplay.bind(this), this.node);
        cv.MessageCenter.register("show_Audit", this.showAudit.bind(this), this.node);
        cv.MessageCenter.register("on_delaycount", this.showDelay.bind(this), this.node);
        cv.MessageCenter.register("tipspanel_removed", this.Hide_tips.bind(this), this.node);
        cv.MessageCenter.register("buyin_room", this.Pwd_tips.bind(this), this.node);
        cv.MessageCenter.register("needClub", this.needClub.bind(this), this.node);
        cv.MessageCenter.register("get_aof_game_thouthand", this.updateLabaNum.bind(this), this.node);
        cv.MessageCenter.register("showLuckButton", this.showLuckButton.bind(this), this.node);
        cv.MessageCenter.register("on_room_destroy_noti", this.OnDestroyRoom.bind(this), this.node);
        cv.MessageCenter.register("on_startgame_noti", this.OnStartGame.bind(this), this.node);

        cv.MessageCenter.register("on_update_self_buyin_stake", this.OnUpdateSelfBuyin.bind(this), this.node);
        cv.MessageCenter.register("update_player_buyout", this.OnUpdataSelfBuyout.bind(this), this.node);

        this.OnStartGame();

        this.removeOthersBtnEvent(this.menu_button);
        this.removeOthersBtnEvent(this.currentTime_button);
        this.removeOthersBtnEvent(this.allReview_button);
        this.removeOthersBtnEvent(this.face_button);
        this.removeOthersBtnEvent(this.followFill_button.node);
        this.removeOthersBtnEvent(this.backGame_button);
        // this.removeOthersBtnEvent(this.aof_lost_btn);
        this.removeOthersBtnEvent(this.forceShowCard_button);
        this.removeOthersBtnEvent(this.deal_button);
        this.removeOthersBtnEvent(this.shop_button);
        this.removeOthersBtnEvent(this.guess_hand_card_button.node);

        this.initScene();

        this.showLuckButton();
        this.updateLabaNum(false);

    }
    private OnUpdateSelfBuyin() {
        this.isBuyinEff = true;
    }

    private OnUpdataSelfBuyout(ref: any) {
        let pkSelf: Seat = this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
        if (pkSelf) {
            pkSelf.BuyOutEff(ref);
        }
    }

    private _getNameColor(index: number): cc.Color {

        if (this.isGameStarSeat()) {
            //明星桌背景，房间名称用黑色
            return cc.Color.BLACK;
        }

        switch (index) {
            case 0:
            case 1:
            case 2:
                return cc.Color.WHITE;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                return cc.Color.BLACK;
            default:
                return cc.Color.BLACK;
        }
    }

    private _getNameAlpha(index: number): number {

        if (this.isGameStarSeat()) {
            //明星桌背景，透明度50%
            return 127.5;
        }

        switch (index) {
            case 0:
            case 1:
            case 2:
                return 102;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return 127.5;
            default:
                return 127.5;
        }
    }

    //初始化场景
    public initScene() {
        this.mainpool.opacity = 0;
        this.record_button_img.active = false;
        this.waitForStart_img.active = false;
        this.currentTime_button.active = false;
        this.gaopai.active = false;
        cc.find("pokerName_text", this.node).active = false;
        this.mangZhu_text.node.active = false;
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        } else {
            cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }

        cv.MessageCenter.unregister("on_snapshot_roominfo", this.node);
        cv.MessageCenter.unregister("onSetShowAuditState", this.node);
        cv.MessageCenter.unregister("show_replay", this.node);
        cv.MessageCenter.unregister("show_Audit", this.node);
        cv.MessageCenter.unregister("on_delaycount", this.node);
        cv.MessageCenter.unregister("showRoleInfoView", this.node);
        cv.MessageCenter.unregister("showObRoleInfo", this.node);
        cv.MessageCenter.unregister("on_sitdown_succ", this.node);
        cv.MessageCenter.unregister("on_need_buyin", this.node);
        cv.MessageCenter.unregister("on_standup_succ", this.node);
        cv.MessageCenter.unregister("on_room_destroy_noti", this.node);
        cv.MessageCenter.unregister("on_startgame_noti", this.node);
        cv.MessageCenter.unregister("on_resetgame_noti", this.node);
        cv.MessageCenter.unregister("on_game_elect_dealer_noti", this.node);
        cv.MessageCenter.unregister("on_game_blind_noti", this.node);
        cv.MessageCenter.unregister("on_game_holecard_noti", this.node);
        cv.MessageCenter.unregister("on_game_notiplayer_holecard_noti", this.node);
        cv.MessageCenter.unregister("on_game_action_turn_noti", this.node);
        cv.MessageCenter.unregister("on_back_seat", this.node);
        cv.MessageCenter.unregister("on_game_action_noti", this.node);
        cv.MessageCenter.unregister("on_game_endround_noti", this.node);
        cv.MessageCenter.unregister("on_game_communitycard_noti", this.node);
        //
        cv.MessageCenter.unregister("player_show_cards", this.node);
        cv.MessageCenter.unregister("on_waiting_other_player", this.node);
        cv.MessageCenter.unregister("on_game_anti_noti", this.node);

        cv.MessageCenter.unregister("currentRoomJackpot", this.node);
        cv.MessageCenter.unregister("on_jackpot_data", this.node);
        cv.MessageCenter.unregister("on_game_settlement_noti", this.node);
        cv.MessageCenter.unregister("on_add_room_timecount", this.node);
        cv.MessageCenter.unregister("on_PauseGame_succ", this.node);
        cv.MessageCenter.unregister("StartGame", this.node);
        cv.MessageCenter.unregister("on_game_showdown_noti", this.node);
        cv.MessageCenter.unregister("GameChipsMoveOutHide", this.node);
        cv.MessageCenter.unregister("on_leave_seat", this.node);

        // 强制亮牌/发发看
        cv.MessageCenter.unregister("on_force_showcard", this.node);
        cv.MessageCenter.unregister("on_game_send_card_fun", this.node);

        // 真人验证消息
        cv.MessageCenter.unregister("on_need_slider_verify", this.node);

        // 保险相关消息
        cv.MessageCenter.unregister("on_need_buy_insurance", this.node);
        cv.MessageCenter.unregister("no_need_insurace", this.node);
        cv.MessageCenter.unregister("player_hit_the_outs", this.node);
        cv.MessageCenter.unregister("player_miss_the_outs", this.node);

        // 采集的相关消息
        cv.MessageCenter.unregister("buyin_start", this.node);
        cv.MessageCenter.unregister("buyin_failed_by_server", this.node);
        cv.MessageCenter.unregister("buyin_failed_by_local", this.node);
        cv.MessageCenter.unregister("click_btn_exit_room", this.node);
        cv.MessageCenter.unregister("click_btn_leave_seat", this.node);
        cv.MessageCenter.unregister("resp_sit_down_failed", this.node);

        //发表情
        cv.MessageCenter.unregister("effet_call", this.node);
        cv.MessageCenter.unregister("on_fly_emoji", this.node);
        cv.MessageCenter.unregister("effect_hit_call", this.node);

        cv.MessageCenter.unregister("on_showFace", this.node);
        cv.MessageCenter.unregister("on_SendChat", this.node);
        cv.MessageCenter.unregister("add_action_time", this.node);

        // 发语音
        cv.MessageCenter.unregister("on_voice_record_count_down", this.node);
        cv.MessageCenter.unregister("on_voice_record_finish", this.node);
        cv.MessageCenter.unregister("on_play_voice", this.node);
        cv.MessageCenter.unregister("on_voice_record_too_short", this.node);
        cv.MessageCenter.unregister("on_upload_voice_done", this.node);
        cv.MessageCenter.unregister("on_voice_show_micPhoneToast", this.node);
        //私语语音回调
        cv.MessageCenter.unregister("SYStartRecord", this.node);
        cv.MessageCenter.unregister("SYStopRecord", this.node);
        cv.MessageCenter.unregister("SYCancelRecord", this.node);


        cv.MessageCenter.unregister("show_hit_jackPotCardType", this.node);
        cv.MessageCenter.unregister("add_room_time", this.node);
        cv.MessageCenter.unregister("buyin_room", this.node);
        cv.MessageCenter.unregister("tipspanel_removed", this.node);
        cv.MessageCenter.unregister("on_room_not_exist", this.node);
        cv.MessageCenter.unregister("update_player_stake", this.node);

        cv.MessageCenter.unregister("on_update_self_buyin_stake", this.node);
        cv.MessageCenter.unregister("update_player_buyout", this.node);

        cv.MessageCenter.unregister("showLuckButton", this.node);
        cv.MessageCenter.unregister("get_aof_game_thouthand", this.node);
        cv.MessageCenter.unregister("needClub", this.node);
        cv.MessageCenter.unregister("turntableResultNotice", this.node);
        cv.MessageCenter.unregister("on_need_more_gold", this.node);
        cv.MessageCenter.unregister("quick_leave_notice", this.node);
        cv.MessageCenter.unregister("sit_down_limit", this.node);
        cv.MessageCenter.unregister("change_tables", this.node);
        cv.MessageCenter.unregister("sit_down_limit_error", this.node);
        cv.MessageCenter.unregister("notice_critisicm_start", this.node);
        cv.MessageCenter.unregister("notice_critisicm_not_enough", this.node);
        cv.MessageCenter.unregister("guess_begin_bet", this.node);
        cv.MessageCenter.unregister("guess_bet_rsp", this.node);
        cv.MessageCenter.unregister("guess_set_bet_opt", this.node);
        cv.MessageCenter.unregister("guess_settle", this.node);
        cv.MessageCenter.unregister("guess_close_button", this.node);
        cv.MessageCenter.unregister("on_auto_buyin_eff", this.node);
        cv.MessageCenter.unregister("hide_bombInfoTips", this.node);
        cv.MessageCenter.unregister("showUpgradeView", this.node);

        /**销毁video sdk引擎 */
        this.destroyVideoEngine();
        cv.MessageCenter.unregister("liveStatus", this.node);
        cv.MessageCenter.unregister("mikeMode", this.node);
        cv.MessageCenter.unregister("voicePrivateNotice", this.node);
        cv.MessageCenter.unregister("canSpeakNotice", this.node);
        cv.MessageCenter.unregister("openMike", this.node);
        cv.MessageCenter.unregister("NotDisturb", this.node);
        cv.MessageCenter.unregister("commentatorChannel", this.node);
        cv.MessageCenter.unregister("closeStarNotice", this.node);
        cv.MessageCenter.unregister("inviterSeatFreedNotice", this.node);

        cv.MessageCenter.unregister("welcome", this.node);
        cv.MessageCenter.unregister("closehitback", this.node);
        cv.MessageCenter.unregister("IsEmojiFree", this.node);

        cv.MessageCenter.unregister("onBarrageMute", this.node);
        cv.MessageCenter.unregister("onBarrageConfChange", this.node);
        cv.MessageCenter.unregister("updata_star_redpacket", this.node);
        cv.MessageCenter.unregister("star_redpacket_result_action", this.node);
        cv.MessageCenter.unregister("onClickQuickBetSwitch", this.node);
    }

    start() {
        //在切场景过程中，收到被T消息。
        if (cv.roomManager.getCurrentRoomID() == -1) {
            this.node.active = false;
            cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene): void => {
                cv.TP.showMsg(cv.config.getStringData("LeaveRoomReason"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
            });
            cv.roomManager.reset();
            cv.GameDataManager.tGameData.reset();
            cv.GameDataManager.tRoomData.reset();
            cv.netWorkManager.closeGameHeart();
            return;
        }

        cv.resMgr.setSpriteFrame(this.startGame_button, cv.config.getLanguagePath("game/dzpoker/ui/game_stargame_01"));
        if (cv.GameDataManager.tRoomData.isShowNeedClub == true) {
            cv.MessageCenter.send("needClub");
        }
        if (cv.GameDataManager.tRoomData.isShowNeedShop == true) {
            this.OnNeedMoreGold();
        }

        cv.gameNet.RequestSnapshot(cv.roomManager.getCurrentRoomID());
    }

    private OnAddActionTime(pkAddTime: NoticeAddActionTime) {
        let pkSeat = this.getSeatBySeverId(pkAddTime.action_seatid);
        if (pkSeat) {
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/pturn");
            }

            if (pkAddTime.action_seatid != cv.GameDataManager.tRoomData.i32SelfSeat) {
                pkSeat.stopBlink();

                pkSeat.setThankCdTime(pkAddTime.rest_action_time, 2);
                pkSeat.showAddTimeAction();
                //pkSeat.showTips(cv.config.getStringData("ActionTips7"), cv.Enum.TipsType.Tips_Yellow);
                pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_OnAction);
            }
            else {
                this.showSelfThinkCd(pkAddTime.rest_action_time, this.m_selfActionType);
                this.showAddTimeAction(this.m_selfActionType);
                //pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_OnAction);
                this.m_u32DelayTimeCount++;
                if (pkAddTime.count < 9) {
                    cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount = pkAddTime.count;
                    let fee: FeeItem = cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee[pkAddTime.count];
                    this.addTime_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(fee.needCoin));
                }
                cv.GameDataManager.tGameData.m_bIsOnSelfAction = true;
            }
        }
    }

    /**
     * 强制亮牌
     * @param pkForceShowCard 
     */
    private OnForceShowCard(pkForceShowCard: game_pb.NoticeForceShowCard) {
        if (pkForceShowCard.playerid !== cv.dataHandler.getUserData().u32Uid) return;
        cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCount = pkForceShowCard.count;
        for (let i = 0; i < pkForceShowCard.show_seats.length; ++i) {
            let ShowSeat: game_pb.IShowCardsSeatInfo = pkForceShowCard.show_seats[i];
            let pkSeat: Seat = this.getSeatBySeverId(ShowSeat.show_seat_id);
            if (pkSeat && !pkSeat.isShowDown) {
                for (let j = 0; j < pkSeat.getHandsCardsCount(); ++j) {
                    pkSeat.getShowCard(j).setContent(ShowSeat.cards[j].number, ShowSeat.cards[j].suit);
                    pkSeat.getShowCard(j).setFace(false);
                }
                pkSeat.showDown(0);
            }
        }

        this.UpdateForceShowCardPrice();
        cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));
        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ForceShowCardToast"), pkForceShowCard.playername), cv.Enum.ToastType.ToastTypeWarning);
    }

    /**
     * 更新"强制亮牌"所需价格
     */
    private UpdateForceShowCardPrice(): void {
        let needcoin: number = 0;
        let count: number = cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCount + 1;
        let feeArray: FeeItem[] = cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCountsFee;
        for (let i = 0; i < feeArray.length; ++i) {
            if (count >= feeArray[i].startCount && count <= feeArray[i].endCount) {
                needcoin = cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCountsFee[i].needCoin;
                this.forceShowCard_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(needcoin));
                let labelWidth = cv.resMgr.getLabelStringSize(this.forceShowCard_text).width;
                this.showcardDamon_img.setPosition(-labelWidth / 2 - 2, this.showcardDamon_img.getPosition().y);
                this.forceShowCard_text.node.setPosition(this.showcardDamon_img.getContentSize().width / 2 * this.showcardDamon_img.scale + 2, this.forceShowCard_text.node.getPosition().y);
                break;
            }
        }
    }

    /**
     * 发发看
     * @param pkSendCardFun 
     */
    private OnSendCardFun(pkSendCardFun: game_pb.NoticeRoomCardFun) {
        this.cardFunTips_text.node.active = true;
        this.cardFunTips_text.string = cv.config.getStringData("UICardFunTips");

        if (this.short_pai.active) {
            this.short_pai.opacity = 0;
        }

        switch (pkSendCardFun.round_state) {
            case cv.Enum.BettingRoundType.Enum_BettingRound_Preflop: {
                for (let i = 0; i < pkSendCardFun.cards.length; ++i) {
                    let kCard: game_pb.ICardItem = pkSendCardFun.cards[i];
                    this.m_pkPublicCard[i].setContent(kCard.number, kCard.suit);
                    this.m_pkPublicCard[i].node.active = true;
                }
                this.DealFlop(true);
                let flopnum = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkPayMoneyItem.showLeftCardFee[0].needCoin);
                this.setDealNum(flopnum);
            } break;

            case cv.Enum.BettingRoundType.Enum_BettingRound_Flop: {
                let kCard: game_pb.ICardItem = pkSendCardFun.cards[0];
                this.m_pkPublicCard[3].setContent(kCard.number, kCard.suit);
                this.DealTurn(true);
                let turnnum = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkPayMoneyItem.showLeftCardFee[1].needCoin);
                this.setDealNum(turnnum);
            } break;

            case cv.Enum.BettingRoundType.Enum_BettingRound_Turn: {
                let kCard: game_pb.ICardItem = pkSendCardFun.cards[0];
                this.m_pkPublicCard[4].setContent(kCard.number, kCard.suit);
                this.DealRiver(true);
                let rivernum = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkPayMoneyItem.showLeftCardFee[2].needCoin);
                this.setDealNum(rivernum);
            } break;

            case cv.Enum.BettingRoundType.Enum_BettingRound_River:
                break;

            default: break;
        }
    }

    /**
     * 真人验证消息
     */
    private _onMsgNeedSliderVerify(param: game_pb.ResponseSitDown): void {
        if (this.game && this.game.sliderVerify_panel) {
            this.game.sliderVerify_panel.autoShow((): void => {
                cv.gameNet.RequestSitdown(param.roomId, param.seatId);
            });
        }
    }

    /**
     * 本轮购买保险通知
     * @param data 
     */
    private _onMsgNeedBuyInsurance(data: game_pb.NoticeGameInsurance): void {
        if (cv.netWorkManager.isAppEnterBackground()) return;
        if (!this.game.insurance_panel) return;

        // 赔率 = 0 && 可用outs > 0 && 强制带回 <= 0
        if (data.error === 115) {
            cv.TT.showMsg(cv.config.getStringData("Insurance_bg_tips_no_rates_text"), cv.Enum.ToastType.ToastTypeInfo);
        }
        // 正常流程
        else {
            // 播放保险音效
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/insure_confirm");
            }

            // server下发验证actionseq
            cv.GameDataManager.tGameData.m_u32InsuranceSeq = data.action_seq;

            let gameid: number = cv.GameDataManager.tRoomData.u32GameID;
            let bMirco: boolean = cv.GameDataManager.tRoomData.pkRoomParam.is_mirco === 1;
            let insuranceEntrance: InsuranceEntrance = this.game.insurance_panel.getComponent(InsuranceEntrance);
            insuranceEntrance.setViewMode(InsuranceData.InsuranceViewMode.VIEW_NORMAL);
            insuranceEntrance.parseInsuranceData(gameid, data, bMirco);

            // 添加 购买者信息
            do {
                let vards: game_pb.CardItem[] = [];
                let buy_player: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(data.buyer_uid);
                if (data.buyer_uid === cv.dataHandler.getUserData().u32Uid) {
                    this.m_bIsSelfShowDown = true;
                    for (let i = 0; i < cv.StringTools.getArrayLength(this.m_pkSelfCard); ++i) {
                        let card_item: game_pb.CardItem = game_pb.CardItem.create();
                        card_item.number = this.m_pkSelfCard[i].eCardNum;
                        card_item.suit = this.m_pkSelfCard[i].eCardSuit;
                        vards.push(card_item);
                    }
                }
                else {
                    let seat: Seat = this.getSeatBySeverId(buy_player.seatid);
                    for (let i = 0; i < seat.getHandsCardsCount(); ++i) {
                        let card: Card = seat.getShowCard(i);
                        if (card) {
                            let card_item: game_pb.CardItem = game_pb.CardItem.create();
                            card_item.number = card.eCardNum;
                            card_item.suit = card.eCardSuit;
                            vards.push(card_item);
                        }
                    }
                }
                insuranceEntrance.addPlayerCardsData(buy_player.playerid, buy_player.name, 0, vards, true);
            } while (false);

            // 添加 其他人信息
            do {
                for (let i = 0; i < cv.StringTools.getArrayLength(data.player_seats); ++i) {
                    let playerSeatInfo: any = game_pb.PlayerSeatInfo.create(data.player_seats[i]);
                    let seat: Seat = this.getSeatBySeverId(playerSeatInfo.seatid);
                    if (!seat) continue;

                    let player_id: number = seat.PlayerInfo.playerid;
                    let player_name: string = seat.PlayerInfo.name;
                    insuranceEntrance.addPlayerCardsData(player_id, player_name, playerSeatInfo.outs_count, playerSeatInfo.holecards, false);

                    if (playerSeatInfo.seatid != cv.GameDataManager.tRoomData.i32SelfSeat) {
                        // 设置座位牌
                        for (let j = 0; j < cv.StringTools.getArrayLength(playerSeatInfo.holecards); ++j) {
                            // 内容
                            seat.getShowCard(j).setContent(playerSeatInfo.holecards[j].number, playerSeatInfo.holecards[j].suit);

                            // 亮牌
                            if (!seat.getShowCard(j).isFace()) { seat.showDown(j + 1); }
                        }
                    }
                }
            } while (false);

            insuranceEntrance.autoShow();
            this.hideBombInfoPrompt();
        }
    }

    /**
     * 本轮无需购买保险通知
     * @param data 
     */
    private _onMsgNoNeedBuyInsurance(data: any): void {
        cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips6"), cv.Enum.ToastType.ToastTypeInfo);
    }

    /**
     * 击中outs
     * @param data 
     */
    private _onMsgHitOuts(data: game_pb.NoticeInsuranceHitOuts): void {
        let player: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(data.playerid);
        if (!player) return;
        let seat: Seat = this.getSeatBySeverId(player.seatid);
        if (!seat) return;

        player.stake = player.stake + data.payment;
        seat.setStake(player.stake);

        let strValue: string = "+" + cv.StringTools.serverGoldToShowString(data.payment);
        seat.SetName(strValue, cc.Color.WHITE, cv.Enum.NameTextType.SetNameType_setWinNumber);

        this.PotOfAppropriationEff(this.mainpool, seat.node, player, 0.5);
        this.scheduleOnce((): void => {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/insure_success");
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips8"), cv.Enum.ToastType.ToastTypeInfo);

            // 击中裂纹效果
            // river 轮 裂纹动画
            if (this.m_pkPublicCard[4].node.active) {
                this.m_pkPublicCard[4].setCrackAnim(true);
            }
            // turn 轮 裂纹动画
            else if (this.m_pkPublicCard[3].node.active) {
                this.m_pkPublicCard[3].setCrackAnim(true);
            }

            // 显示"击中保险提示语"动画
            let bMirco: boolean = cv.GameDataManager.tRoomData.pkRoomParam.is_mirco === 1;
            let decimalPlaces: number = bMirco ? 2 : 0;
            let insureWinBet: number = cv.StringTools.clientGoldByServer(data.payment);
            insureWinBet = cv.StringTools.toFixed(insureWinBet, decimalPlaces, cv.StringTools.RoundingMode.ROUND_HALF_UP);
            this._showHitOutsTipsAnim(insureWinBet);
        }, 0.8);
    }

    /**
     * 未击中outs
     * @param data 
     */
    private _onMsgMissOuts(data: game_pb.NoticeInsuranceMissOuts): void {
        this.scheduleOnce((): void => {
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips7"), cv.Enum.ToastType.ToastTypeInfo);
        }, 0.7);
    }

    /**
     * 击中保险提示语动画
     * @param amount 
     * @param world_pos 
     */
    private _showHitOutsTipsAnim(amount: number): void {
        if (this.game.insuranceHitOutsTips) {
            // 设置位置
            do {
                let cardNode: cc.Node = this.m_pkPublicCard[0].node;
                let tipsNode: cc.Node = this.game.insuranceHitOutsTips;

                let pos: cc.Vec2 = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
                pos.y = cardNode.convertToWorldSpaceAR(cc.Vec2.ZERO).y - 10;
                pos.y -= (1 - cardNode.anchorY) * cardNode.height * cardNode.scaleY;
                pos.y -= (1 - tipsNode.anchorY) * tipsNode.height * tipsNode.scaleY;

                tipsNode.parent.convertToNodeSpaceAR(pos, pos);
                tipsNode.setPosition(pos);
            } while (false);

            // 设置内容
            let insuranceHitOutsTips: InsuranceHitOutsTips = this.game.insuranceHitOutsTips.getComponent(InsuranceHitOutsTips);
            insuranceHitOutsTips.showAnim(amount);
        }
    }

    /**
     * 设置当前"快捷下注"模式
     * @param isPreflop 
     */
    private _setQuickBetModeStatus(isPreflop: boolean): void {
        let value: boolean = true;
        value &&= isPreflop;                            // 翻前状态
        value &&= cv.tools.isBetPreflop();              // 开了翻前开关
        value &&= !this.m_pkPublicCard[2].node.active;  // 为翻前状态
        value &&= !this.quickBetUsedPreflopOnce;        // 本局翻前快捷未曾使用过
        value &&= !this._bCriticsimRound;               // 不是暴击局(暴击没有翻前)
        this.quickBetModeIsPreflop = value;
    }

    /**
     * 更新当前"快捷下注"模式状态
     * @param amount 
     * @param action_type 
     */
    private _updateQuickBetModeStatus(amount: number, action_type: number): void {
        switch (action_type) {
            case game_pb.ActionType.Enum_Action_Bet:
            case game_pb.ActionType.Enum_Action_Raise:
            case game_pb.ActionType.Enum_Action_Allin: {                // 只要有加注就标记翻前快捷已使用
                // 只要有加注就标记翻前快捷已使用
                this.quickBetUsedPreflopOnce = true;

                // 设置快捷状态
                this._setQuickBetModeStatus(false);
            } break;

            default: {
                // 翻前第一个下注才使用"翻前设置"
                // 只要有玩家下注 > 1bb 就说明已经加过注, 直接设置为"翻后模式"
                if (!this.m_pkPublicCard[2].node.active) {
                    let bb_amount: number = cv.GameDataManager.tRoomData.pkTableStates.bb_amount;
                    let isStraddle: boolean = cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle !== 0;
                    if (isStraddle) { bb_amount *= 2; }
                    let isPreflop: boolean = amount <= bb_amount;

                    // 若未使用过, 则检测使用状态: 只要有加注就标记翻前快捷已使用
                    if (!this.quickBetUsedPreflopOnce) {
                        this.quickBetUsedPreflopOnce = !isPreflop;
                    }

                    // 设置快捷状态
                    this._setQuickBetModeStatus(isPreflop);
                }
                else {
                    this._setQuickBetModeStatus(false);
                }
            } break;
        }
    }

    /**
     * 接收"点击牌桌快捷设置开关"消息
     * @param isOpenSwitch 
     */
    private _onMsgClickQuickBetSwitch(isOpenSwitch: boolean): void {
        this._setQuickBetModeStatus(isOpenSwitch);
    }

    public sliderEvent(evt, data) {
        if (!this._onclickSliderDown) {
            this.freeSlider.progress = 0;
            return;
        }
        //console.log("sliderEvent=========");
        let percent = Math.floor(this.freeSlider.progress / this.freeSliderStep);//将当前进度映射为ChipsLevel集合中的第几项  freeSliderStep为ChipsLevel数组长度计算出的对应的进度条的步进值
        percent = percent == this.ChipsLevel.length ? (percent - 1) : percent;
        let maxPercent = this.ChipsLevel.length - 1;//进度条为1的时候对应的最大值
        let f32FullPot = cv.GameDataManager.tGameData.m_u32FullPot;
        if (percent != maxPercent) {
            this.freeSliderText.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this.ChipsLevel[percent]));
            if (this.lastPercent != cv.StringTools.showStringToNumber(this.freeSliderText.string)) {
                this.lastPercent = cv.StringTools.showStringToNumber(this.freeSliderText.string);
                if (cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/slider");
                }
            }
        }
        else {
            this.freeSliderText.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this.ChipsLevel[maxPercent]));
        }
        console.log("sliderEvent::" + this.freeSlider.node.getContentSize().width);
        let f32Now: number = this.ChipsLevel[percent];
        this.percent_img.setPosition(cc.v2(this.percent_img.getPosition().x, this.percent_imgPosY + percent * this.freeSlider.node.getContentSize().height / maxPercent));
        let percentText: cc.Label = cc.find("percent_text", this.percent_img).getComponent(cc.Label);
        percentText.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer((f32Now / f32FullPot) * 100)) + "%";

        if (percent === maxPercent) {
            if (this.perPercent !== maxPercent) {
                if (f32Now === this._sliderMaxBetNum) {
                    this.sliderAllin.active = true;
                    this.sliderBg.active = true;
                    this.sliderBg.opacity = 255;
                    this.actionButtonView_2.active = false;
                    let sldierAllin = cc.find("allinfire", this.sliderAllin);
                    let animState = sldierAllin.getComponent(cc.Animation).play("sliderAllin");
                    animState.wrapMode = cc.WrapMode.Loop;
                    percentText.string = "ALL In";
                    if (cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/slider_top");
                    }
                }
                else {
                    if (cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/slider");
                    }
                }
            }
        }
        else {
            if (this.perPercent === maxPercent) {
                if (cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/slider");
                }
            }
            let sldierAllin = cc.find("allinfire", this.sliderAllin);
            sldierAllin.getComponent(cc.Animation).stop("sliderAllin");
            this.sliderAllin.active = false;
        }
        this.perPercent = percent;
    }

    public onsliderHandDown(evt) {
        this._onclickSliderDown = true;
        //this.freeSlider.node.setPosition(cc.v2(0, (this.sliderBg.getContentSize().height - this.freeHandle.getContentSize().height) / 2));
        //this.freeSlider.node.setContentSize(cc.size(160, this.sliderBg.getContentSize().height - this.freeHandle.getContentSize().height));
        //console.log("onsliderHandDown=========");
        this.actionButtonView_2.active = false;
        this.freeSlider.progress = 0;
        this.freeSlider.node.opacity = 255;
        this.sliderBg.opacity = 255;
        this.freeSliderText.node.active = true;
        this.freeSliderText_bg.active = true;
        this.percent_img.active = true;
        cc.find("percent_text", this.percent_img).getComponent(cc.Label).string = "0%";
    }

    public onsliderHandUp(evt) {
        if (!this._onclickSliderDown) return;
        //console.log("onsliderHandUp=========");
        this._onclickSliderDown = false;
        let percent = Math.floor(this.freeSlider.progress / this.freeSliderStep);
        percent = percent == this.ChipsLevel.length ? (percent - 1) : percent;
        let maxPercent = this.ChipsLevel.length - 1;

        let num = cv.GameDataManager.tGameData.m_u32MiniRaise;
        if ((percent != 0) && (this.ChipsLevel[percent] >= num || percent == maxPercent)) {
            this.OnRaise(this.ChipsLevel[percent]);
        }

        if (cv.GameDataManager.tGameData.m_bIsOnSelfAction) {
            this.actionButtonView.active = true;
            this.addTime_button.active = true;
            this.damon_img.active = true;
        }
        //this.freeSlider.node.setContentSize(cc.size(160, 120));
        //this.freeSlider.node.setPosition(cc.v2(0, this.freeSlider.node.getContentSize().height / 2));
        //console.log("onsliderHandUp=========" + this.freeSlider.node.getContentSize().width + "  height:" + this.freeSlider.node.getContentSize().height);
        this.freeSlider.node.opacity = 0;
        this.sliderBg.opacity = 0;
        this.actionButtonView_2.active = true;
        this.freeSliderText.node.active = false;
        this.freeSliderText_bg.active = false;
        this.freeSlider.progress = 0;
        let sldierAllin = cc.find("allinfire", this.sliderAllin);
        sldierAllin.getComponent(cc.Animation).stop("sliderAllin");
        this.sliderAllin.active = false;

        this.percent_img.active = false;

        // this.hideSelfCardAllInEffect();
    }

    public onsliderHandCancel(evt) {
        if (!this._onclickSliderDown) return;
        //console.log("onsliderHandCancel=========");
        this._onclickSliderDown = false;
        let percent = this.freeSlider.progress;
        let maxPercent = 1;

        let num = cv.GameDataManager.tGameData.m_u32MiniRaise;
        if (this.ChipsLevel[percent] >= num) {
            this.OnRaise(this.ChipsLevel[percent]);
        }
        else if (percent == maxPercent) {
            this.OnRaise(this.ChipsLevel[percent]);
        }

        if (cv.GameDataManager.tGameData.m_bIsOnSelfAction) {
            this.actionButtonView.active = true;
            this.addTime_button.active = true;
            this.damon_img.active = true;
        }

        //this.freeSlider.node.setContentSize(cc.size(160, 120));
        //this.freeSlider.node.setPosition(cc.v2(0, this.freeSlider.node.getContentSize().height / 2));
        this.freeSlider.node.opacity = 0;
        this.sliderBg.opacity = 0;
        this.actionButtonView_2.active = true;
        this.freeSliderText.node.active = false;
        this.freeSliderText_bg.active = false;
        this.freeSlider.progress = 0;
        this.sliderAllin.getComponent(cc.Animation).stop("allin");
        this.sliderAllin.getComponent(cc.Animation).stop("allinUp");
        this.sliderAllin.active = false;

        this.percent_img.active = false;

        // this.hideSelfCardAllInEffect();
    }

    public onGameChipsMoveOutHide(seatid) {
        this.getSeatBySeverId(seatid).hideChips();
    }

    public OnShowDown(msg) {
        this.RealShowDown(msg);
    }

    public RealShowDown(pkShowDown: game_pb.NoticeGameShowDown) {
        console.log("RealShowDown===============");

        let len: number = this.seatList.length;
        let game_mode: number = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;

        for (let i = 0; i < len; ++i) {
            this.seatList[i].stopCDtime();
        }

        for (let i = 0; i < pkShowDown.shows.length; ++i) {
            let kPlayer: game_pb.IPlayerShowDownInfo = pkShowDown.shows[i];
            let u32SeatId = kPlayer.seatid;

            if (kPlayer.playerid != cv.dataHandler.getUserData().u32Uid) {
                let pkSeat = this.getSeatBySeverId(u32SeatId);
                if (pkSeat) {
                    let hpokers: number[] = [];
                    let ppokers: number[] = [];

                    for (let j = 0; j < kPlayer.cards.length; ++j) {
                        let card_num: number = kPlayer.cards[j].number;
                        let card_suit: number = kPlayer.cards[j].suit;
                        pkSeat.getShowCard(j).setContent(card_num, card_suit);

                        let poker: PokerData = new PokerData(game_mode);
                        poker.initWhitValue(PokerData.getLocalValue(card_num, game_mode), card_suit, game_mode);
                        hpokers.push(poker.getNumber(game_mode));
                    }

                    for (let j = 0; j < this.m_pkPublicCard.length; ++j) {
                        let card: Card = this.m_pkPublicCard[j];
                        if (card.node.active) {
                            let poker: PokerData = new PokerData(game_mode);
                            poker.initWhitValue(PokerData.getLocalValue(card.eCardNum, game_mode), card.eCardSuit, game_mode);
                            ppokers.push(poker.getNumber(game_mode));
                        }
                    }

                    if (this.isGamePLO()) {
                        pkSeat.showCardType(PokerData.getPokerTypeString(hpokers, ppokers, game_mode, 2, 3), 0.5);
                    }
                    else {
                        pkSeat.showCardType(PokerData.getPokerTypeString(hpokers, ppokers, game_mode), 0.5);
                    }

                    if (kPlayer.cards.length === this.m_pkSelfCard.length) {
                        pkSeat.showDown(0);
                        let _delayTime = (this.m_pkPublicCard[4].node && this.m_pkPublicCard[4].node.active) ? 0.7 : 0.55;
                        this.doAllinWinRate(_delayTime); //计算allin胜率
                    }
                    else {
                        let sclen: number = kPlayer.cards.length;
                        let cclen: number = this.m_pkSelfCard.length;
                        console.error(`GameMain - RealShowDown: hands cards length error: sclen = ${sclen}, cclen = ${cclen}`);
                    }
                }
                else {
                    console.error(`GameMain - RealShowDown: can't find Seat: ${u32SeatId}`);
                }
            }
            else {
                this.SelfShowCardAnim(this.m_pkSelfCard.length);
            }
        }

        for (let i = 0; i < pkShowDown.muck_list.length; ++i) {
            let pkSeat = this.getSeatBySeverId(pkShowDown.muck_list[i]);
            if (pkSeat) {
                let isAllInvisible: boolean = true;
                for (let j = 0; j < pkSeat.getHandsCardsCount(); ++j) {
                    isAllInvisible = isAllInvisible && !pkSeat.getShowCard(j).node.active;
                }

                if (isAllInvisible) {
                    pkSeat.showTips(cv.config.getStringData("ActionTips10"), cv.Enum.TipsType.Tips_check);
                    pkSeat.doGray(true);
                }
            }
        }
    }

    public SelfShowCardAnim(u32Index: number) {
        if (this.m_bIsSelfShowDown) return;

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            if (i < u32Index) {
                this.m_pkSelfCard[i].setFace(false);
                this.m_pkSelfCard[i].turn(0);
                this.m_bIsSelfShowDown = true;
            }
        }
    }

    public onGameStart() {
        //清除公共牌缓存
        for (let i = 0; i < 5; i++) {
            let card = this.m_pkPublicCard[i];
            if (card != null && cc.isValid(card)) {
                card.setContent(cv.Enum.CardNum.CARD_2, cv.Enum.CardSuit.CARD_DIAMOND);
                card.clearContent();
            }
        }

        this.startGame_button.active = false;
        this.waitForStart_img.active = false;
        this.dichiChip_text.node.active = true;
        this.OnPauseGame(null);
    }

    public OnPauseGame(send: null) {
        /*if (cv.GameDataManager.tRoomData.pkRoomState.ispause())
    {
        SEInt32 inGamePlayerNumber=0;
        if (cv.GameDataManager.tRoomData.kTablePlayerList.size() > 1)
        {
            for (size_t i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.size(); i++)
            {
                if (cv.GameDataManager.tRoomData.kTablePlayerList[i].in_game())
                {
                    inGamePlayerNumber += 1;
                }
            }
        }
        if (inGamePlayerNumber < 2){
            //_curPanel = _pausePoker_panel;
            _pausePoker_panel.setVisible(true);
            bool isOwer = cv.GameDataManager.tRoomData.u32OwnerId == g_pkDataManager.getUser().u32Uid;
            _start_button.setVisible(isOwer);
        }
    }
    else
    {
        _pausePoker_panel.setVisible(false);
    }

    if (cv.GameDataManager.tRoomData.pkRoomState.isbegin())
    {
        _pause_button.setTouchEnabled(!cv.GameDataManager.tRoomData.pkRoomState.ispause());
        if (cv.GameDataManager.tRoomData.pkRoomState.ispause())
        {
            _pause_button.setColor(Color3B::GRAY);
        }
        else
        {
            _pause_button.setColor(Color3B::WHITE);
        }

    }
    else
    {
        _pause_button.setTouchEnabled(false);
        _pause_button.setColor(Color3B::GRAY);
    }*/
    }
    public OnSettlement(pkSettle: game_pb.NoticeGameSettlement) {
        this.setForbidChat(false);
        let len = this.seatList.length;
        this._isShowGuess = true;

        //结算的时候重置当前操作的玩家id
        cv.GameDataManager.tRoomData.curActionPlayerId = 0;
        this.onCloseZoomTips();
        for (let i = 0; i < len; i++) {
            if (this.seatList[i].getStatus() != cv.Enum.SeatStatus.SeatStatus_waiting && this.seatList[i].getStatus() != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
                this.seatList[i].stopCDtime();
                this.seatList[i].resetActionType();
                if (this.seatList[i].getTips() != cv.config.getStringData("ActionTips10")) {
                    this.seatList[i].hideTips();
                }
            }
        }

        // 奥马哈游戏: 结算的时, 若自己是弃牌则恢复对公牌的标记
        this.MarkSelfCardTypeForPlo(true);

        cv.GameDataManager.tRoomData.isSelfFold = false;
        cv.GameDataManager.tRoomData.m_isAllInMode = false;
        this.game.menu_Panel.getComponent(menu).updateMenu();
        if (!this.isZoom()) {
            let viewDeal: boolean = (!this.m_pkPublicCard[4].node.active && cv.GameDataManager.tRoomData.isBuyin && this._isSeat);

            if (viewDeal == true) {
                this.deal_button.active = viewDeal;
            }
            else if (viewDeal == false) {
                cv.action.setButtonActiveFalse(this.deal_button.getComponent(cc.Button));
            }
        }

        // 服务器开关自动亮开所有底牌
        if (cv.GameDataManager.tRoomData.pkRoomParam.showAllHole) {
            // 隐藏强制亮牌按钮
            cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));

            // 自动亮开所有手牌
            for (let i = 0; i < pkSettle.seatInfo.length; ++i) {
                let showSeatInfo: game_pb.IShowCardsSeatInfo = pkSettle.seatInfo[i];
                let seat: Seat = this.getSeatBySeverId(showSeatInfo.show_seat_id);
                if (!seat) continue;
                if (seat && !seat.isShowDown) {
                    for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                        seat.getShowCard(j).setContent(showSeatInfo.cards[j].number, showSeatInfo.cards[j].suit);
                        seat.getShowCard(j).setFace(false);
                    }
                    seat.showDown(0);
                }
            }
        }
        // 手动点击强制亮牌
        else {
            let isOpenFoceShow: boolean = cv.GameDataManager.tRoomData.pkRoomParam.force_showcard;  // 房间是否开启强制秀牌
            let isEnableStarSeat: boolean = this.isGameStarSeat() && this.isEnableGameStarSeat();   // 明星桌是否有预留座位

            let viewForce: boolean = isOpenFoceShow && (isEnableStarSeat || this._isSeat);
            if (viewForce) {
                this.forceShowCard_button.active = viewForce;
                this.UpdateForceShowCardPrice();
            }
            else {
                cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));
            }
        }

        let i32Count: number = 0;
        for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
            if (this.m_pkPublicCard[i].node.active) {
                ++i32Count;
            }
        }

        let num: number = 0;

        // 翻牌圈
        if (i32Count === 0) {
            num = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkPayMoneyItem.showLeftCardFee[0].needCoin);
        }
        // 转牌圈
        else if (i32Count === 3) {
            num = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkPayMoneyItem.showLeftCardFee[1].needCoin);
        }
        // 河牌圈
        else {
            num = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkPayMoneyItem.showLeftCardFee[2].needCoin);
        }

        this.setDealNum(num);

        this.node.stopActionByTag(this.GAME_DELAY_ELECT_DEALER_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_ANTE_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_BLIND_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_HOLECARD_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_ACTION_TURN_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_NONEEDINSURANCE_TAG);

        this.scheduleOnce(this.CloseSendFun.bind(this), 3.2);

        if (cv.GameDataManager.tRoomData.pkRoomState.paused) {
            //_pausePoker_panel.setVisible(true);
            let isOwer = cv.GameDataManager.tRoomData.u32OwnerId == cv.dataHandler.getUserData().u32Uid;
            this.startGame_button.active = isOwer;
        }

        // 隐藏保险面板
        if (this.game.insurance_panel.active) {
            this.game.insurance_panel.getComponent(InsuranceEntrance).autoHide();
        }

        // 结算时: 更新礼物入口显示状态
        this.setGiftActive(true);

        this.RealSettlement(pkSettle);
    }

    public CloseSendFun(f32Delta) {
        cv.action.setButtonActiveFalse(this.deal_button.getComponent(cc.Button));
        cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));
    }

    public setDealNum(num: number) {
        this.deal_text.string = cv.StringTools.numberToShowString(num);
        this.deal_text.node.active = (num > 0);
        this.deal_icon.active = (num > 0);
        let labelWidth = cv.resMgr.getLabelStringSize(this.deal_text).width;
        this.deal_icon.setPosition(-labelWidth / 2 - 2, this.deal_icon.getPosition().y);
        this.deal_text.node.setPosition(this.deal_icon.getContentSize().width / 2 * this.deal_icon.scale + 2, this.deal_text.node.getPosition().y);
    }

    public RealSettlement(pkSettle: game_pb.NoticeGameSettlement) {

        for (let i = 0; i < this.seatList.length; ++i) {
            this.getSeatBySeverId(i).hideFire();
        }

        // this.hideSelfCardAllInEffect();
        for (let i = 0; i < cv.GameDataManager.tRoomData.pkTableStates.players.length; ++i) {
            let kPlayer: PlayerInfo = cv.GameDataManager.tRoomData.pkTableStates.players[i];
            kPlayer.last_action = cv.Enum.ActionType.Enum_Action_Null;
            kPlayer.in_game = false;
        }
        let kTotalPotsInfo: playerWinPotInfo[] = [];
        let kSettlesMap: PotIdWidthWinPotInfo[] = [];
        for (let i = 0; i < pkSettle.winners.length; i++) {
            let kPlayer: game_pb.PlayerSettleInfo = pkSettle.winners[i];
            for (let j = 0; j < kPlayer.pots.length; ++j) {
                let kValue: playerWinPotInfo = new playerWinPotInfo();
                kValue.pot = new WinPotInfo();
                cv.StringTools.deepCopy(kPlayer.pots[j], kValue.pot);//这一步没成功
                kValue.playerid = kPlayer.playerid;
                kTotalPotsInfo.push(kValue);
            }
        }
        for (let i = 0; i < kTotalPotsInfo.length; ++i) {
            let kPotInfo = kTotalPotsInfo[i];
            let settlemapLen = kSettlesMap.length;
            let has = false;
            for (let k = 0; k < settlemapLen; k++) {
                if (kPotInfo.pot.potid == kSettlesMap[k].potid) {
                    kSettlesMap[k].potInfo.playerids.push(kPotInfo.playerid);
                    has = true;
                }
            }
            if (!has) {
                let kValue: WinPotInfoPlayerIds = new WinPotInfoPlayerIds();
                cv.StringTools.deepCopy(kPotInfo.pot, kValue.pot);
                kValue.playerids.push(kPotInfo.playerid);
                let mapValue: PotIdWidthWinPotInfo = new PotIdWidthWinPotInfo();
                mapValue.potid = kPotInfo.pot.potid;
                mapValue.potInfo = kValue;
                kSettlesMap.unshift(mapValue);
            }
        }

        let f32MoveDelay: number = 0.6;
        let f32ShowStakeDelay: number = 0.3;
        if (this.isGamePLO()) {
            // 飘分动画seat.showNumber(): 延时1.3, 飘过程0.5, 停留2.1
            f32ShowStakeDelay = 1.3 + 0.5 + 2.1 - 0.6 - 0.3;
        }

        let settlemapLen = kSettlesMap.length;
        let u32MainPotId = parseInt(this.mainpool_text.node.name);
        let len = settlemapLen > 0 ? settlemapLen - 1 : 0;

        let isShowSeatID: number[] = []; //PLO牌局，存储已经显示了手牌上移动画座位号。防止多人ALlin情况下, 存在分池，showOtherWin重复调用。

        for (let i = len; i >= 0; i--) {
            if (u32MainPotId == kSettlesMap[i].potid) {
                let pkHide = cc.hide();
                let pkDelay = cc.delayTime(0.6);
                this.mainpool.runAction(cc.sequence(pkDelay, pkHide));
                for (let k = 0; k < kSettlesMap[i].potInfo.playerids.length; k++) {
                    let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(kSettlesMap[i].potInfo.playerids[k]);
                    if (pkPlayer) {
                        let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                        if (pkSeat) {
                            this.PotOfAppropriationEff(this.mainpool, pkSeat.node, pkPlayer, f32MoveDelay, f32ShowStakeDelay);
                        }
                        for (let i = 0; i < pkSettle.winners.length; i++) {
                            let kPlayer: game_pb.PlayerSettleInfo = pkSettle.winners[i];
                            if (pkPlayer.playerid == kPlayer.playerid) {
                                if (kPlayer.total_investment < kPlayer.amount) {
                                    if (kPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                                        this.showSelfWin();
                                    } else {
                                        this.showOtherWin(pkPlayer.seatid);
                                        isShowSeatID.push(pkPlayer.seatid);
                                    }
                                }
                            }
                        }
                    }
                }
                kSettlesMap.splice(i, 1);
            }
        }

        this.scheduleOnce((dt: number): void => {  //等飞金币后，隐藏胜率
            this.hideAllWinRate();
        }, 1.0);

        //this.light_img.node.runAction(cc.sequence(cc.delayTime(0.5), cc.show(), rotateTo, cc.hide()));

        let u32Index = 0;
        for (let i = 0; i < kSettlesMap.length; i++) {
            u32Index += 1;
            for (let k = 0; k < kSettlesMap[i].potInfo.playerids.length; k++) {
                let pkSidePot: cc.Node = this.GetSidePotById(kSettlesMap[i].potid);
                if (pkSidePot) {
                    this.scheduleOnce((dt: number): void => {
                        pkSidePot.active = false;
                    }, f32MoveDelay + u32Index * 0.8);
                }
                let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(kSettlesMap[i].potInfo.playerids[k]);
                if (pkPlayer) {
                    let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                    if (pkSeat) {
                        this.PotOfAppropriationEff(this.mainpool, pkSeat.node, pkPlayer, f32MoveDelay + u32Index * 0.8, f32ShowStakeDelay);
                    }
                    for (let i = 0; i < pkSettle.winners.length; i++) {
                        let kPlayer: game_pb.PlayerSettleInfo = pkSettle.winners[i];

                        if (pkPlayer.playerid == kPlayer.playerid) {
                            if (kPlayer.total_investment < kPlayer.amount) {
                                if (kPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                                    this.showSelfWin();
                                } else {

                                    let isShowOtherWin = false;
                                    for (let j = 0; j < isShowSeatID.length; j++) {
                                        if (isShowSeatID[j] == pkPlayer.seatid) {
                                            isShowOtherWin = true;
                                            break;
                                        }
                                    }

                                    if (isShowOtherWin == false) {
                                        this.showOtherWin(pkPlayer.seatid);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        for (let i = 0; i < pkSettle.winners.length; i++) {
            let kPlayer: game_pb.PlayerSettleInfo = pkSettle.winners[i];
            let u32SeatId = kPlayer.seatid;
            let pkSeat: Seat = this.getSeatBySeverId(u32SeatId);
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(u32SeatId);
            if (pkPlayer) {
                pkPlayer.stake = pkPlayer.stake + kPlayer.amount;

                if (pkSeat) {
                    let kFormat: string = "%d";
                    let kColor = cc.color(255, 255, 255);
                    if ((kPlayer.amount - kPlayer.total_investment) > 0) {
                        kFormat = "+%f";
                    }
                    else if (kPlayer.amount - kPlayer.total_investment < 0) {
                        kFormat = "%f";
                    }
                    else if ((kPlayer.amount - kPlayer.total_investment) == 0) {
                        kFormat = "%f";
                    }
                    let winNum = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.StringTools.minus(kPlayer.amount, kPlayer.total_investment)));
                    pkSeat.SetName(cv.StringTools.formatC(kFormat, winNum), kColor, cv.Enum.NameTextType.SetNameType_setWinNumber);
                }
                else {
                    console.log("can't find Seat:" + u32SeatId);
                }
            }
        }

        for (let i = 0; i < pkSettle.jinfo.length; i++) {
            let uid = pkSettle.jinfo[i].win_jackpot_id;
            let info: game_pb.JackPotWinInfo = pkSettle.jinfo[i];
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(uid);
            if (pkPlayer) {
                let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                if (pkSeat) {
                    pkSeat.addStake(info.win_jackpot_num);
                }
            }
        }

    }

    private _ChipsMoveAction(pkStart: cc.Node, pkTarget: cc.Node, f32MoveDelay: number) {
        let pkChips: GameChipsMove = cc.instantiate(this.game.ChipsMoveprefab).getComponent('GameChipsMove');
        this.node.addChild(pkChips.node);
        pkChips.node.name = "pkChips";
        let startpos = pkStart.getParent().convertToWorldSpaceAR(pkStart.getPosition())
        pkChips.node.setPosition(this.node.convertToNodeSpaceAR(startpos));
        let seat = pkTarget;
        let outpos = cc.Vec2.ZERO;
        seat.convertToWorldSpaceAR(cc.v2(0, 0), outpos);
        pkChips.MoveOutToTarget(pkTarget, outpos, f32MoveDelay);
    }

    public ChipsMoveAction(pkStart: cc.Node, pkTarget: cc.Node, f32MoveDelay: number, callBack: cc.ActionInstant = null) {
        this._ChipsMoveAction(pkStart, pkTarget, f32MoveDelay);
        if (callBack) {
            let pkDelay = cc.delayTime(f32MoveDelay + 0.6);
            let action = cc.sequence(pkDelay, callBack);
            action.setTag(this.GAME_CHIPS_MOVE_ACTION_TAG);
            this.node.runAction(action);
        }
    }

    public PotOfAppropriationEff(pkStart: cc.Node, pkTarget: cc.Node, pkPlayer: PlayerInfo, f32MoveDelay: number, f32ShowStakeDelay: number = 0.3, ishitjackpot: boolean = false) {
        this._ChipsMoveAction(pkStart, pkTarget, f32MoveDelay);
        // this.scheduleOnce(this.DelayPlayAudio, f32MoveDelay + f32ShowStakeDelay);
        if (ishitjackpot) return;
        if (pkPlayer) {
            let data = { player: pkPlayer, target: pkTarget };
            let pkCall = cc.callFunc(this.DelayShowStake.bind(this), this, data);
            let pkDelay = cc.delayTime(f32MoveDelay + f32ShowStakeDelay);
            let action = cc.sequence(pkDelay, pkCall);
            action.setTag(this.GAME_END_SETSTAKE_TAG);
            this.node.runAction(action);
        }
    }
    public DelayPlayAudio(f32Delay) {
        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chips_to_pot");
        }
    }
    public DelayShowStake(target: cc.Node, data: any) {
        data.target.getComponent(Seat).setStake(data.player.stake);
        let amount = 0;
        let list = cv.GameDataManager.tJackPot.noticeJackPotAwardInfo.awardInfo
        for (let i = 0; i < list.length; i++) {
            let info = list[i];
            if (info.award_playid == data.player.playerid) {
                amount = info.award_amount;
                break;
            }
        }
        if (this.m_hashitJackpotCard) {
            data.target.getComponent(Seat).addStake(amount);
            this.m_hashitJackpotCard = false;
            data.target.getComponent(Seat).setStake(data.player.stake + amount);//刷新缓存数据，（C++有改动这样一个BUG，h5在此跟进）
        }
    }

    public GetSidePotById(potid) {
        for (let i = 0; i < this.sidepoolList.length; ++i) {
            if (parseInt(this.sidepoolList[i].name) == potid) {
                return this.sidepoolList[i];
            }
        }
        return null;
    }
    public showSelfWin() {
        let self = this;
        this.youwin.active = true;
        let anin = this.youwin.getComponent(cc.Animation);
        anin.play("youwin");
        anin.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            anin.off(cc.Animation.EventType.FINISHED);
            self.youwin.active = false;
        }, this);
        return;
        this.lightImg.node.active = true;
        this.wordImg.node.active = true;
        this.wordImg.node.zIndex = 200;
        this.lightImg.node.rotation = 0;
        let scaleTime = 0.1;
        let rotateTime = 3;
        let scaleTo = cc.scaleTo(scaleTime, 1);
        let delTime = cc.delayTime(rotateTime - scaleTime);
        let rotateTo = cc.rotateTo(rotateTime, 299);
        let lightCallBack = cc.callFunc(this.winBack.bind(this), this, this.lightImg);
        let wordCallBack = cc.callFunc(this.winBack.bind(this), this, this.wordImg);
        this.lightImg.node.runAction(cc.sequence(cc.delayTime(0.2), rotateTo, lightCallBack));
        this.wordImg.node.runAction(cc.sequence(cc.delayTime(0.2), scaleTo, delTime, wordCallBack));
    }

    public winBack(target: cc.Node) {
        target.active = false;
        //this.lightImg.node.active = false;
        //this.//wordImg.node.active = false;
    }

    public removeWin() {
        this.lightImg.node.stopAllActions();
        this.wordImg.node.stopAllActions();
        this.lightImg.node.active = false;
        this.wordImg.node.active = false;
    }

    public showOtherWin(seaid: number) {
        this.getSeatBySeverId(seaid).showWin();
        this.MarkOtherCardTypeForPlo(seaid);
    }

    public OnPlayerShowCards(pkShowCard: game_pb.NoticePlayerShow) {
        let u32Count = 0;
        for (let i = 0; i < pkShowCard.players.length; ++i) {
            let kPlayer: game_pb.IPlayerShowInfo = pkShowCard.players[i];
            let pkSeat = this.getSeatBySeverId(kPlayer.seatid);

            if (pkSeat) {
                for (let j = 0; j < kPlayer.cards.length; ++j) {
                    if (u32Count >= pkShowCard.show_card_id.length) {
                        continue;
                    }
                    let i32Index = pkShowCard.show_card_id[u32Count];
                    let kCard: game_pb.ICardItem = kPlayer.cards[j];
                    pkSeat.getShowCard(i32Index).setContent(kCard.number, kCard.suit);

                    pkSeat.showDown(i32Index + 1);
                    if (kPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                        //this.m_pkSelfCard[i32Index].getButton().setTouchEnabled(false);
                    }
                    u32Count += 1;
                }
            }
        }
    }

    public OnLeaveSeat(uid: number) {
        let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(uid);
        this.leaveTable(pkPlayer);
        this.game.menu_Panel.getComponent(menu).updateMenu();
    }

    public OnGameAnteNoti(pkAnte) {
        cv.GameDataManager.tGameData.m_u32DelayTime += 0;
        cv.GameDataManager.tGameData.m_bIsAnte = true;

        if (cv.GameDataManager.tGameData.m_u32DelayTime > 0) {
            let pkDealy = cc.delayTime(cv.GameDataManager.tGameData.m_u32DelayTime);
            let pkCall = cc.callFunc(this.RealAnteNoti.bind(this), this, pkAnte);
            let pkSeq = cc.sequence(pkDealy, pkCall);
            pkSeq.setTag(this.GAME_DELAY_ANTE_TAG);
            this.node.runAction(pkSeq);
        } else {
            this.RealAnteNoti(this, pkAnte);
        }
    }

    public RealAnteNoti(targetNode, pkAnte: NoticeGameAnte) {
        for (let i = 0; i < pkAnte.seat_list.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(pkAnte.seat_list[i]);
            let pkSeat: Seat = this.getSeatBySeverId(pkAnte.seat_list[i]);

            if (pkPlayer) {
                pkPlayer.in_game = true;
                pkPlayer.stake = pkPlayer.stake - pkAnte.amount_list[i];
                pkPlayer.round_bet = pkAnte.amount_list[i];
                this.UpdateDeadPot(pkAnte.amount_list[i]);

                if (pkSeat) {
                    if (!this.isTurnSeat) {
                        pkSeat.ChipsMoveOut(true);
                    }
                    pkSeat.setStake(pkPlayer.stake);
                }
                else {
                    console.log(cv.StringTools.formatC("can't find Seat(%d)", pkAnte.seat_list[i]));
                }
            }
            if (pkSeat) {
                if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                    if (!cv.GameDataManager.tRoomData.pkRoomParam.short_game_double_ante) {
                        pkSeat.Bet(pkAnte.amount_list[i]);
                    }
                }
            }
            else {
                console.log(cv.StringTools.formatC("can't find Seat(%d)", pkAnte.seat_list[i]));
            }
        }
    }

    public OnWaitingOtherPlayer() {
        this.node.stopActionByTag(9911);
        cv.action.setButtonActiveFalse(this.deal_button.getComponent(cc.Button));
        cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));
        let pkDealy = cc.delayTime(4.5);
        let pkCall = cc.callFunc(this.DelayReset.bind(this));
        let pkSeq = cc.sequence(pkDealy, pkCall);
        pkSeq.setTag(9911);
        this.node.runAction(pkSeq);
    }

    public DelayReset() {
        this.resetTable();

        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer) {
                pkPlayer.last_action = cv.Enum.ActionType.Enum_Action_Null;
                pkPlayer.in_game = false;
                let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                if (pkSeat) {
                    if (pkSeat.getStatus() != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting, cv.Enum.ActionType.Enum_Action_Null);
                    }
                    pkSeat.SetName(pkPlayer.name);
                    pkSeat.setStake(pkPlayer.stake);
                }
            }
        }

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].setFace(false);
        }

        this.D_img.active = false;
        this.dichiChip_text.node.active = false;

        cv.GameDataManager.tRoomData.m_isAllInMode = false;
        this.game.menu_Panel.getComponent(menu).updateMenu();
    }

    public OnCommunityCard(msg: any) {
        this.RealCommunityCard(null, msg);
    }

    public RealCommunityCard(target: cc.Node, pkCommunityCards: NoticeCommunityCards) {
        switch (pkCommunityCards.betting_round) {
            case cv.Enum.BettingRoundType.Enum_BettingRound_Preflop:
                break;

            case cv.Enum.BettingRoundType.Enum_BettingRound_Flop: {
                for (let i = 0; i < pkCommunityCards.cards.length; ++i) {
                    let kCard: CardItem = pkCommunityCards.cards[i];
                    this.m_pkPublicCard[i].setContent(kCard.number, kCard.suit);
                    this.m_pkPublicCard[i].node.active = true;
                }

                this.DealFlop();
                this.doAllinWinRate(0.9); //计算allin胜率
            } break;

            case cv.Enum.BettingRoundType.Enum_BettingRound_Turn: {
                //容错 turn轮和river轮的牌必须建 立在前三张牌已发的情况
                if (this.m_pkPublicCard[0].node.active && this.m_pkPublicCard[1].node.active && this.m_pkPublicCard[2].node.active) {
                    let kCard: CardItem = pkCommunityCards.cards[0];
                    this.m_pkPublicCard[3].setContent(kCard.number, kCard.suit);
                    this.DealTurn();
                    this.doAllinWinRate(0.7); //计算allin胜率
                }

            } break;

            case cv.Enum.BettingRoundType.Enum_BettingRound_River: {
                //容错 turn轮和river轮的牌必须建 立在前三张牌已发的情况
                if (this.m_pkPublicCard[0].node.active && this.m_pkPublicCard[1].node.active && this.m_pkPublicCard[2].node.active) {
                    let kCard: CardItem = pkCommunityCards.cards[0];
                    this.m_pkPublicCard[4].setContent(kCard.number, kCard.suit);
                    this.DealRiver();
                }
            } break;

            default: break;
        }

        // 开公牌, 则翻前阶段结束, 快捷下注模式设置为翻后模式
        this._setQuickBetModeStatus(false);
    }


    //添加需要计算Allin胜率的座位号
    public addAllinPlayerWinRate(seatID: number) {
        let _bCalcWin = true;  //allin玩家是否纳入胜率计算
        if (this.m_pkPublicCard[4].node && this.m_pkPublicCard[4].node.active) {
            //已经发完第五张牌了，此时Allin的玩家不再纳入到计算显示胜率
            _bCalcWin = false;
        }
        this.m_curAllinSeats.push({ seatId: seatID, bCalcWin: _bCalcWin });
    }

    public hideAllWinRate() {
        //所有玩家胜率显示重置
        this.m_curAllinSeats = [];
        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer) {
                let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                if (pkSeat) {
                    pkSeat.setWinRateStatus(false);
                }

            }
        }
    }

    //计算胜率
    public doAllinWinRate(TimeDelay: number = 0) {
        this.unschedule(this.calcWinRate);
        this.schedule(this.calcWinRate, TimeDelay);
    }

    private calcWinRate() {
        let curAllinLen = this.m_curAllinSeats.length;

        if (curAllinLen < 1) {
            console.log("当前没有Allin的玩家.");
            return;
        }

        //玩家手牌信息
        let allinPlayerInfo = [];
        let publicCards = [];


        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer) {

                let seatId = pkPlayer.seatid;
                let seat: Seat = this.getSeatBySeverId(seatId);
                let cardArray = [];

                if (seat.getStatus() <= cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
                    //暂离，等待状态
                    continue;
                }

                let _BeforeRiverAllin = true; //发第五张牌前Allin的
                for (let i = 0; i < this.m_curAllinSeats.length; i++) {
                    if (seatId == this.m_curAllinSeats[i].seatId && this.m_curAllinSeats[i].bCalcWin == false) {
                        _BeforeRiverAllin = false;
                    }
                }

                if (!_BeforeRiverAllin) {
                    continue;
                }

                if (seatId == cv.GameDataManager.tRoomData.i32SelfSeat) //如果Allin的是自己
                {
                    if (!cv.GameDataManager.tRoomData.isSelfFold) {
                        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                            let card: Card = this.m_pkSelfCard[i];
                            cardArray.push({ suit: card.getCardSuit(), num: card.getCardNum() });
                        }
                        allinPlayerInfo.push({ seatID: seatId, handCards: cardArray });
                    }
                } else {

                    for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                        let card: Card = seat.getShowCard(j);
                        cardArray.push({ suit: card.getCardSuit(), num: card.getCardNum() });
                    }

                    if (seat.getHandsCardsCount() >= 2 && seat.getbShowDown()) {
                        allinPlayerInfo.push({ seatID: seatId, handCards: cardArray });
                    }
                }
            }
        }

        //console.log("#################### allinPlayerInfo.length:" + allinPlayerInfo.length);
        if (allinPlayerInfo.length >= 2) {
            //公共牌信息
            for (let i = 0; i < 5; ++i) {
                let pCard = this.m_pkPublicCard[i];
                if (cc.isValid(pCard.node) && pCard.node.active) {
                    publicCards.push({ suit: pCard.getCardSuit(), num: pCard.getCardNum() });
                }
            }

            let winRateResult = [];
            winRateResult = WinRateTools.getInstance().getWinRateByCards(
                cv.roomManager.getCurrentGameID(),
                cv.GameDataManager.tRoomData.pkRoomParam.game_mode,
                allinPlayerInfo,
                publicCards);


            for (let i = 0; i < winRateResult.length; i++) {
                let _seatID = winRateResult[i].seatId;
                let _winRate = winRateResult[i].winRate;
                let _bLead = winRateResult[i].bLead;
                let _pSeat: Seat = this.getSeatBySeverId(_seatID);
                _pSeat.setWinRateStatus(true, _bLead, _winRate);
            }
        }
    }

    //从后台切回来 重置公共牌位置
    public resetDealPos() {
        for (let i = 0; i < 5; ++i) {
            if (cc.isValid(this.m_pkPublicCard[i].node) && this.m_pkPublicCard[i].node.active) {
                this.m_pkPublicCard[i].stopSchedulesAndActions();
                this.m_pkPublicCard[i].setFace(true);
                this.m_pkPublicCard[i].node.setPosition(cc.v2(this.publicPos.x + i * this.publicCard_hgp, this.publicPos.y));
            }
        }
    }

    public DealFlop(IsBonny: boolean = false) {
        for (let i = 0; i < 3; ++i) {
            this.m_pkPublicCard[i].stopSchedulesAndActions();
            this.m_pkPublicCard[i].node.setPosition(cc.v2(this.publicPos.x, this.publicPos.y));
            this.m_pkPublicCard[i].setFace(false);
            this.m_pkPublicCard[i].setGary(false);
            this.m_pkPublicCard[i].setOp(IsBonny);
            if (!IsBonny) {
                this.m_pkPublicCard[i].turn(0.2 + i * 0.12, true);
                //let pkDelay = cc.delayTime(0.4);
                let pkMove = cc.moveTo(0.1 * i, cc.v2(this.publicPos.x + i * this.publicCard_hgp, this.publicPos.y));
                // this.m_pkPublicCard[i].node.runAction(cc.sequence(pkDelay, pkMove));
                this.m_pkPublicCard[i].node.runAction(pkMove);
            }
            else {
                this.m_pkPublicCard[i].node.setPosition(cc.v2(this.publicPos.x + i * this.publicCard_hgp, this.publicPos.y));
                this.m_pkPublicCard[i].setFace(true);
            }
        }

        if (!IsBonny) {
            let pkCall = cc.callFunc(this.DealDown.bind(this));
            let pkDelay = cc.delayTime(0.8);
            let pkseq = cc.sequence(pkDelay, pkCall);
            pkseq.setTag(5566);
            this.node.runAction(pkseq);
        }
    }
    public DealTurn(IsBonny: boolean = false) {
        this.m_pkPublicCard[3].stopSchedulesAndActions();
        this.m_pkPublicCard[3].setFace(false);
        this.m_pkPublicCard[3].setGary(false);
        this.m_pkPublicCard[3].setOp(IsBonny);


        if (!IsBonny) {
            this.m_pkPublicCard[3].deal(0);
            this.m_pkPublicCard[3].turn(0.3);
        }
        else {
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
            }
            this.m_pkPublicCard[3].node.active = true;
            this.m_pkPublicCard[3].setFace(true);
        }

        if (!IsBonny) {
            let pkCall = cc.callFunc(this.DealDown.bind(this));
            let pkDealy = cc.delayTime(0.7);
            let pkSeq = cc.sequence(pkDealy, pkCall);
            pkSeq.setTag(5566);
            this.node.runAction(pkSeq);
        }
    }

    public DealRiver(IsBonny: boolean = false) {
        // 清除击中保险时 turn轮 裂纹动画
        this.m_pkPublicCard[3].setCrackAnim(false);

        this.m_pkPublicCard[4].stopSchedulesAndActions();
        this.m_pkPublicCard[4].setFace(false);
        this.m_pkPublicCard[4].setGary(false);
        this.m_pkPublicCard[4].setOp(IsBonny);

        if (!IsBonny) {
            this.m_pkPublicCard[4].deal(0);
            this.m_pkPublicCard[4].turn(0.3);
        }
        else {
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
            }
            this.m_pkPublicCard[4].node.active = true;
            this.m_pkPublicCard[4].setFace(true);
        }

        if (!IsBonny) {
            let pkCall = cc.callFunc(this.DealDown.bind(this));
            let pkDealy = cc.delayTime(0.7);
            let pkSeq = cc.sequence(pkDealy, pkCall);
            pkSeq.setTag(5566);
            this.node.runAction(pkSeq);
        }
    }



    public OnEndRound(pkRoundEnd: any) {

        this.onCloseZoomTips();
        /*let pkTips =    Director::getInstance().getRunningScene().getChildByTag(TIPS_TAG);
        if (pkTips)
        {
            pkTips.removeFromParentAndCleanup(true);
        }*/
        this.onCloseTips();

        if (cv.GameDataManager.tGameData.m_bIsAnte) {
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                cv.GameDataManager.tGameData.m_u32DelayTime += 0;
            }
            else {
                if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                    if (!cv.GameDataManager.tRoomData.pkRoomParam.short_game_double_ante) {
                        cv.GameDataManager.tGameData.m_u32DelayTime += 0;
                    }
                    else {
                        cv.GameDataManager.tGameData.m_u32DelayTime += 0;
                    }
                }
            }

            if (cv.GameDataManager.tGameData.m_u32DelayTime > 0) {
                let pkDealy = cc.delayTime(cv.GameDataManager.tGameData.m_u32DelayTime);
                let pkCall = cc.callFunc(this.RealEndRound.bind(this), this, pkRoundEnd);
                let pkSeq = cc.sequence(pkDealy, pkCall);
                pkSeq.setTag(this.GAME_DELAY_ENDROUND_TAG);
                this.node.runAction(pkSeq);
            } else {
                this.RealEndRound(this.node, pkRoundEnd);
            }
        }
        else {
            this.RealEndRound(this.node, pkRoundEnd);
        }
    }
    public RealEndRound(targetNode, pkRoundEnd: NoticeGameRoundEnd) {
        let isPlayEff: boolean = false;

        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer && pkPlayer.in_game) {
                pkPlayer.round_bet = 0;
                let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                if (pkSeat) {
                    if (pkPlayer.last_action != cv.Enum.ActionType.Enum_Action_Fold) {
                        pkSeat.hideTips();
                    }
                    if (pkSeat.getStatus() != cv.Enum.SeatStatus.SeatStatus_leave_a_monment && pkPlayer.last_action != cv.Enum.ActionType.Enum_Action_Fold) {
                        //pkSeat.doGray(false);
                    }

                    pkSeat.stopCDtime();

                    let u32Bet = pkSeat.getBetedNum();
                    if (u32Bet != 0) {
                        if (cv.GameDataManager.tGameData.m_bIsAnte) {
                            pkSeat.ChipsMoveOut();
                            isPlayEff = true;
                            cv.GameDataManager.tGameData.m_bIsAnte = false;
                        }
                        else {
                            pkSeat.ChipsMoveOut();
                            isPlayEff = true;
                        }
                    }
                }
                else {
                    console.log("can't find Seat:", pkPlayer.seatid);
                }
            }
        }

        if (isPlayEff) {
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chips_to_pot");
            }
        }

        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
        this.giveUp_buttonIsCheck = false;
        this.followFill_buttonIsCheck = false;

        let u32DeadPotAmount: number = 0;
        for (let i = 0; i < pkRoundEnd.pots.length; ++i) {
            u32DeadPotAmount += pkRoundEnd.pots[i].amount;
        }

        if (pkRoundEnd.pots.length >= 1) {
            this.mainpool_text.string = cv.StringTools.serverGoldToShowString(pkRoundEnd.pots[0].amount);
            this.mainpool_text.node.name = pkRoundEnd.pots[0].potid.toString();
            this.mainpool.setContentSize(cc.size(this.getMainpoolWidth(), this.mainpool.getContentSize().height)); //this.mainpool_text.node.getContentSize().height));
            cc.find("mainpool_chips", this.mainpool).setPosition(cc.v2(-this.mainpool.getContentSize().width / 2));
            this.mainpool.opacity = 255;
            this.mainpool.runAction(cc.show());
            for (let i = 1; i < pkRoundEnd.pots.length; ++i) {
                let u32Id = pkRoundEnd.pots[i].potid;
                let u32Amount = pkRoundEnd.pots[i].amount;
                if (i < 9) {
                    this.showSidepool(i, u32Amount, u32Id, pkRoundEnd.pots.length);
                } else {
                    console.log("Too many Side Pot.Not Show");
                }
            }
        }
        cv.GameDataManager.tGameData.u32DeadPot = 0;
        this.dichiChip_text.node.active = true;
        this.dichiChip_text.string = cv.StringTools.formatC(cv.config.getStringData("dichiNum"), 0);
        this.UpdateDeadPot(u32DeadPotAmount);

        if (cv.GameDataManager.tGameData.m_bIsAnte) {
            cv.GameDataManager.tGameData.m_bIsAnte = false;
        }
        else {
            cv.GameDataManager.tGameData.m_u32DelayTime = 0;
        }

        for (let i = 0; i < pkRoundEnd.public_card.length; ++i) {
            let kCard: CardItem = pkRoundEnd.public_card[i];
            this.QueckShowPublicCard(i, kCard.number, kCard.suit);
        }
    }

    public stopBlink() {
        // if (cc.isValid(this.red_img)) {
        //     this.red_img.node.stopAllActions();
        //     this.red_img.node.active = false;
        // }
    }

    public stopSelfThinkCd() {
        this.unschedule(this.updateThink);
        this.stopBlink();
        if (this.m_pkSelfCard) {
            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                this.m_pkSelfCard[i].node.stopAllActions();
                this.m_pkSelfCard[i].node.rotation = 0;
            }
        }

    }

    public SelfFoldAnim() {
        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            let pkFoldCard = cc.instantiate(this.game.card).getComponent(Card);
            pkFoldCard.updateCardBack();
            pkFoldCard.node.setPosition(this.m_pkSelfCard[i].node.getPosition());
            pkFoldCard.setFace(false);
            this.card_panel.addChild(pkFoldCard.node);

            let pkMove = cc.moveTo(0.2, cc.v2(pkFoldCard.node.x, this.mainpool.y));
            let pkScale = cc.scaleTo(0.2, 0.5);
            let pkFadeOut = cc.fadeOut(0.2);

            let pkSpawn = cc.spawn(pkMove, pkScale, pkFadeOut);//cc.easeExponentialIn();
            pkFoldCard.node.runAction(cc.sequence(pkSpawn, cc.callFunc(this.removeFoldCard.bind(this), pkFoldCard.node, pkFoldCard.node)));

            this.m_pkSelfCard[i].setGary(true);
        }
    }

    public removeFoldCard(target: cc.Node) {
        target.removeFromParent(true);
        target.destroy();
    }
    public OtherFoldAnim(u32SeatId: number) {
        let pkSeat: Seat = this.getSeatBySeverId(u32SeatId);
        if (pkSeat) {
            for (let i = 0; i < pkSeat.getHandsCardsCount(); ++i) {
                let pkFoldCard = cc.instantiate(this.game.card).getComponent(Card);
                pkFoldCard.updateCardBack();
                pkFoldCard.node.setPosition(pkSeat.node.getPosition());
                pkFoldCard.setFace(false);
                pkFoldCard.node.setContentSize(pkSeat.getShowCard(i).node.getContentSize());

                pkFoldCard.node.scale = 0.5;
                this.seatPanel.addChild(pkFoldCard.node);
                let temppos = cc.Vec2.ZERO;
                this.mainpool.convertToWorldSpaceAR(cc.v2(0, 0), temppos);
                this.UpdateRocketAngle(pkFoldCard.node, pkFoldCard.node.getPosition(), temppos);

                let pkMove = cc.moveTo(0.3, temppos);
                let pkScale = cc.scaleTo(0.3, 0.2);
                let pkFadeOut = cc.fadeOut(0.3);

                let pkSpawn = cc.spawn(pkMove, pkScale, pkFadeOut);//cc.easeExponentialIn();
                pkFoldCard.node.runAction(cc.sequence(pkSpawn, cc.callFunc(this.removeFoldCard.bind(this), pkFoldCard.node)));
            }
        }
    }

    public UpdateRocketAngle(pkNode, kBegin: cc.Vec2, kEnd: cc.Vec2) {
        pkNode.rotation = Math.atan2((kEnd.x - pkNode.getPosition().x), (kEnd.y - pkNode.getPosition().y)) * 180 / 3.1415926;
    }

    public OnPlayerAction(pkAction: NoticePlayerAction) {
        // 更新当前"快捷下注"模式状态
        this._updateQuickBetModeStatus(pkAction.amount, pkAction.action_type);

        this.node.stopActionByTag(this.GAME_DELAY_ACTION_TURN_TAG);
        cv.GameDataManager.tGameData.m_u32DelayTime = 0;
        this.dichiChip_text.node.active = true;

        let pkTips = cc.director.getScene().getChildByName(this.TIPS_TAG);
        if (pkTips) {
            pkTips.removeFromParent(true);
            pkTips.destroy();
        }
        this.onCloseTips();

        for (let i = 0; i < cv.GameDataManager.tRoomData.pkRoomParam.player_count_max; ++i) {
            let pkSeat: Seat = this.getSeatBySeverId(i);
            if (pkSeat) {
                if (pkSeat.getStatus() != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
                    pkSeat.stopCDtime();
                }
            }
            else {
                console.log("can't find Seat:" + i);
            }
        }
        let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(pkAction.last_action_seat_id);
        if (pkPlayer) {
            pkPlayer.last_action = pkAction.action_type;
            if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                this.stopSelfThinkCd();
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                cv.GameDataManager.tGameData.m_bIsOnSelfAction = false;
            }

            let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);


            if (pkAction.action_type == cv.Enum.ActionType.Enum_Action_Allin) {
                this.addAllinPlayerWinRate(pkPlayer.seatid);
            }

            if (pkSeat) {
                switch (pkAction.action_type) {
                    case cv.Enum.ActionType.Enum_Action_Check: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Check);
                        if (cv.tools.isSoundEffectOpen()) {
                            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/checkSound");
                        }
                        if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                            this.followFill_buttonIsCheck = false;
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Fold: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Fold);
                        if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                            this.SelfFoldAnim();
                            cv.GameDataManager.tRoomData.m_isAllInMode = false;
                            cv.GameDataManager.tRoomData.isSelfFold = true;
                            this.game.menu_Panel.getComponent(menu).updateMenu();
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            this._isShowGuess = true;
                            // this.hideSelfCardAllInEffect();
                        }
                        else {
                            this.OtherFoldAnim(pkPlayer.seatid);
                        }
                        if (cv.tools.isSoundEffectOpen()) {
                            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/foldCardSound");
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Call: {
                        pkPlayer.round_bet = pkPlayer.round_bet + pkAction.amount;
                        if ((pkPlayer.stake - pkAction.amount) >= 0) {
                            pkPlayer.stake = pkPlayer.stake - pkAction.amount;
                        }
                        else {
                            pkPlayer.stake = 0;
                        }
                        this.UpdateDeadPot(pkAction.amount);
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Call);
                        pkSeat.Bet(pkAction.amount, cv.Enum.BType.BType_Call);
                        pkSeat.setStake(pkPlayer.stake);

                        if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                            this.followFill_buttonIsCheck = false;
                            //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                            this.markNode(this.followFill_Blue.node, "checkGrayImg");
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Bet: {
                        this.UpdateDeadPot(pkAction.amount - pkPlayer.round_bet);
                        pkPlayer.stake = pkPlayer.stake - (pkAction.amount - pkPlayer.round_bet);
                        pkPlayer.round_bet = pkAction.amount;
                        pkSeat.Bet(pkAction.amount);
                        pkSeat.setStake(pkPlayer.stake);

                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Bet);

                        if (this.actionButtonStatus == cv.Enum.ActionButtonStatus.Control_Default_Call) {
                            this.followFill_buttonIsCheck = false;
                            //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callGrayImg);
                            this.markNode(this.followFill_Blue.node, "callGrayImg");
                        }
                        if (this.actionButtonStatus == cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck) {
                            this.followFill_buttonIsCheck = false;
                            this.followFill_button.interactable = false;
                            this.dichi_button0.interactable = false;
                            this.dichi_button1.interactable = false;
                            this.dichi_button1_2.interactable = false;

                            this.dichi_button2.interactable = false;
                            this.freeSlider.node.active = false;
                            //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                            this.markNode(this.followFill_Blue.node, "checkGrayImg");
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Raise: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Raise);
                        this.UpdateDeadPot(pkAction.amount - pkPlayer.round_bet);
                        pkPlayer.stake = pkPlayer.stake - (pkAction.amount - pkPlayer.round_bet);
                        pkPlayer.round_bet = pkAction.amount;
                        pkSeat.setStake(pkPlayer.stake);
                        pkSeat.Bet(pkAction.amount);

                        if (this.actionButtonStatus == cv.Enum.ActionButtonStatus.Control_Default_Call) {
                            if (this.giveUp_buttonIsCheck) {
                                this.markNode(this.giveUpRed.node, "giveUpImg");
                                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                            }
                            else {
                                this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpGrayImg");
                                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpGrayImg);
                            }

                            this.followFill_buttonIsCheck = false;
                            //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callGrayImg);
                            this.markNode(this.followFill_Blue.node, "callGrayImg");
                        }
                        if (this.actionButtonStatus == cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck) {
                            if (this.giveUp_buttonIsCheck) {
                                this.markNode(this.giveUpRed.node, "giveUpLookImg");
                                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpLookImg);
                            }
                            else {
                                this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpLookGrayImg");
                                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpLookGrayImg);
                            }

                            this.followFill_buttonIsCheck = false;
                            //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                            this.markNode(this.followFill_Blue.node, "checkGrayImg");
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Allin: {
                        //allin隐藏欢迎反击表情 bug 7699
                        this.hitback_left.active = false;
                        this.hitback_upper_left.active = false;
                        this.hitback_upper_right.active = false;

                        this.setForbidChat(true);
                        this.UpdateDeadPot(pkAction.amount - pkPlayer.round_bet);
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Allin);
                        pkPlayer.round_bet = pkAction.amount;
                        pkPlayer.stake = 0;
                        pkSeat.Bet(pkAction.amount);
                        pkSeat.setStake(0);

                        if (pkPlayer.seatid == cv.GameDataManager.tRoomData.i32SelfSeat) {
                            // this.showSelfCardAllInEffect();
                            cv.GameDataManager.tRoomData.m_isAllInMode = true;
                            this.game.menu_Panel.getComponent(menu).updateMenu();
                        }

                        if (this.actionButtonStatus == cv.Enum.ActionButtonStatus.Control_Default_Call) {
                            if (pkAction.amount > cv.GameDataManager.tGameData.m_u32NeedCall) {
                                this.followFill_buttonIsCheck = false;
                                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callGrayImg);
                                this.markNode(this.followFill_Blue.node, "callGrayImg");
                            }
                        }
                        if (this.actionButtonStatus == cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck) {
                            this.followFill_buttonIsCheck = false;
                            //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                            this.markNode(this.followFill_Blue.node, "checkGrayImg");
                        }
                    } break;

                    default:
                        break;
                }

                if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                    this.giveUp_buttonIsCheck = pkAction.default_fold;

                    if (this.giveUp_buttonIsCheck) {
                        this.markNode(this.giveUpRed.node, "giveUpLookImg");
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpLookImg);
                    }
                    else {
                        this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpLookGrayImg");
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpLookGrayImg);
                    }
                }
            }
            else {
                console.log("can't find Seat:" + pkPlayer.seatid);
            }
        }
    }

    public OnBackSeat(playerId: number) {
        let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(playerId);
        this.BackTable(pkPlayer);
    }

    public BackTable(pkPlayer: PlayerInfo) {
        if (pkPlayer) {
            let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
            if (pkSeat) {
                pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting);
                if (cv.dataHandler.getUserData().u32Uid == pkPlayer.playerid) {
                    this.backGame_button.active = false;
                }
            }
            else {
                console.log("can't find Seat:" + pkPlayer.seatid);
            }
        }
    }

    public OnGameElectDealer(msg: any) {
        cv.GameDataManager.tGameData.m_u32DelayTime += 0;

        let pkDealy = cc.delayTime(cv.GameDataManager.tGameData.m_u32DelayTime);
        let pkCall = cc.callFunc(this.RealElectDealerNoti.bind(this), this, msg);
        let pkseq = cc.sequence(pkDealy, pkCall);
        pkseq.setTag(this.GAME_DELAY_ELECT_DEALER_TAG);
        this.node.runAction(pkseq);

        let curGameId = cv.roomManager.getCurrentGameID();
        if (curGameId == cv.Enum.GameId.StarSeat || cv.Enum.GameId.Plo || curGameId == cv.Enum.GameId.Bet || (curGameId == cv.Enum.GameId.Texas && cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short && cv.GameDataManager.tRoomData.pkRoomParam.auto_withdraw)) {
            this.autoBuyinEff();
        }
    }

    private autoBuyinEff() {
        if (this.isBuyinEff == true) {
            let pkSelf: Seat = this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
            if (pkSelf) {
                pkSelf.autoBuyinEff();
            }
            this.isBuyinEff = false;
        } else {
            this.isBuyinEff = false;
        }
    }

    public onAutoBuyinEff() {
        //if (this.isBuyinEff == true) {
        let pkSelf: Seat = this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
        if (pkSelf) {
            pkSelf.autoBuyinEff();
        }
        //     this.isBuyinEff = false;
        // } else {
        //     this.isBuyinEff = false;
        // }
    }


    public RealElectDealerNoti(target: cc.Node, pkElectDealer: NoticeGameElectDealer) {
        cv.GameDataManager.tGameData.i32RoomId = pkElectDealer.roomid;
        cv.GameDataManager.tGameData.i32DealerSId = pkElectDealer.dealer_seatid;
        cv.GameDataManager.tGameData.i32SBSid = pkElectDealer.sb_seateid;
        cv.GameDataManager.tGameData.i32BBSid = pkElectDealer.bb_seatid;

        if (this._jackPotHitCardType) {
            let action = cc.find("action_panel", this._jackPotHitCardType).getComponent(cc.Animation);
            action.stop();
            this._jackPotHitCardType.removeFromParent(true);
            this._jackPotHitCardType.destroy();
            this._jackPotHitCardType = null;
        }
        this._jackpotInfos = [];

        this.DrunAction(cv.GameDataManager.tGameData.i32DealerSId);
    }
    public OnAddRoomTimeCount() {
        this.game.hoseOwer_panel.getComponent(HouseOwer).setTimeOut();
        this.game.hoseOwer_panel.active = true;
    }

    //房主发送房间暂停消息
    public onSendPauseGame() {
        cv.gameNet.RequestPauseGame(cv.GameDataManager.tRoomData.u32RoomId, false)
    }

    //显示暂停按钮
    public showPauseGameDlg() {
        cv.TP.showMsg(cv.config.getStringData("GameScene_pausePoker_panel_hasPause_txt"),
            cv.Enum.ButtonStyle.GOLD_BUTTON, this.onSendPauseGame.bind(this), null, false, cv.config.getStringData("GameScene_pausePoker_panel_pausePoker_txt"));
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_PAUSE_GAME_TIPS);
        cv.TP.setTag("GameScene_pausePoker_panel_hasPause_txt");
        let isSelf: boolean = cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId;
        if (!isSelf) {
            //如果不是房主，隐藏弹框上面按钮
            cv.TP.hideDialogButton(cv.Enum.ButtonStyle.GOLD_BUTTON);
        }

    }

    //隐藏暂停按钮
    public hidePauseGameDlg() {
        let _tipsTag = cv.TP.getTag();
        if (_tipsTag != null) {
            if (_tipsTag == "GameScene_pausePoker_panel_hasPause_txt") {
                cv.TP.hideTipsPanel();
            }
        }
    }

    public OnPauseGameSucc(ret) {
        cv.GameDataManager.tRoomData.pkRoomState.isPause = ret.isPause;
        cv.GameDataManager.tRoomData.pkRoomState.paused = ret.paused;
        if (cv.GameDataManager.tRoomData.pkRoomState.paused) {
            this.showPauseGameDlg();
        }
        else {
            this.hidePauseGameDlg();

        }
        this.game.hoseOwer_panel.getComponent(HouseOwer).setTimeOut();
    }

    public OnBlind(msg: any) {

        let time = 0;
        if (!this.isZoom()) {
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                if (cv.GameDataManager.tGameData.m_bIsAnte == false) {
                    cv.GameDataManager.tGameData.m_u32DelayTime += 0;
                }
                else {
                    cv.GameDataManager.tGameData.m_u32DelayTime = 0;
                }
            }
            else {
                if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                    if (!cv.GameDataManager.tRoomData.pkRoomParam.short_game_double_ante) {
                        cv.GameDataManager.tGameData.m_u32DelayTime += 0;
                    } else {
                        cv.GameDataManager.tGameData.m_u32DelayTime = 0;
                    }
                }
            }

            time = cv.GameDataManager.tGameData.m_u32DelayTime;
        }

        if (time > 0) {
            let pkDealy = cc.delayTime(time);
            let pkCall = cc.callFunc(this.RealBlind.bind(this), this, msg);
            let pkseq = cc.sequence(pkDealy, pkCall);
            pkseq.setTag(this.GAME_DELAY_BLIND_TAG);
            this.node.runAction(pkseq);
        } else {
            this.RealBlind(this.node, msg);
        }
    }

    public RealBlind(target: cc.Node, pkBlind: NoticeGameBlind) {
        cv.GameDataManager.tGameData.i32DealerSId = pkBlind.dealer_seatid;
        cv.GameDataManager.tGameData.i32SBSid = pkBlind.sb_seatid;
        cv.GameDataManager.tGameData.i32BBSid = pkBlind.bb_seatid;

        cv.GameDataManager.tRoomData.m_kStraddleList = [];
        cv.GameDataManager.tRoomData.pkTableStates.curr_dealer_seatid = pkBlind.dealer_seatid;
        cv.GameDataManager.tRoomData.pkTableStates.curr_sb_seatid = pkBlind.sb_seatid;
        cv.GameDataManager.tRoomData.pkTableStates.curr_bb_seatid = pkBlind.bb_seatid;

        let i32SBSeat = cv.GameDataManager.tGameData.i32SBSid;
        let i32BBSeat = cv.GameDataManager.tGameData.i32BBSid;

        cv.GameDataManager.tRoomData.u32SmallBlind = pkBlind.sb_amount;
        cv.GameDataManager.tRoomData.u32BigBlind = pkBlind.bb_amount;

        let pkSBPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(i32SBSeat);
        let pkBBPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(i32BBSeat);

        let pkSBSeat: Seat = this.getSeatBySeverId(i32SBSeat);
        let pkBBSeat: Seat = this.getSeatBySeverId(i32BBSeat);

        cv.GameDataManager.tRoomData.pkTableStates.sb_amount = pkBlind.sb_amount;
        cv.GameDataManager.tRoomData.pkTableStates.bb_amount = pkBlind.bb_amount;

        this.UpdateDeadPot(pkBlind.sb_amount);
        this.UpdateDeadPot(pkBlind.bb_amount);

        if (pkSBPlayer) {

            pkSBPlayer.stake = pkSBPlayer.stake - pkBlind.sb_amount;
            pkSBPlayer.round_bet = pkBlind.sb_amount;
            pkSBPlayer.in_game = true;

            if (pkSBSeat) {
                pkSBSeat.setStake(pkSBPlayer.stake);
                console.log("SB=============:" + pkBlind.sb_amount);
                pkSBSeat.Bet(pkBlind.sb_amount);

            }
        }
        else {
            console.log("Can't find player sb seaid::" + i32SBSeat);

        }
        if (pkBBPlayer) {
            pkBBPlayer.stake = pkBBPlayer.stake - pkBlind.bb_amount;
            pkBBPlayer.round_bet = pkBlind.bb_amount;
            pkBBPlayer.in_game = true;

            if (pkBBSeat) {
                pkBBSeat.setStake(pkBBPlayer.stake);
                console.log("BB=============:" + pkBlind.bb_amount);
                pkBBSeat.Bet(pkBlind.bb_amount);
            }
        }
        else {
            console.log("Can't find player sb seaid::" + i32SBSeat);
        }

        for (let i = 0; i < pkBlind.straddle_seat_list.length; i++) {
            let u32SeatId: number = pkBlind.straddle_seat_list[i];
            if (u32SeatId == -1) {
                break;
            }
            let u32Amount: number = pkBlind.straddle_amount_list[i];
            let pkStraddlePlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(u32SeatId);

            let pkStraddleSeat: Seat = this.getSeatBySeverId(u32SeatId);
            this.UpdateDeadPot(u32Amount);

            cv.GameDataManager.tRoomData.m_kStraddleList.push(u32SeatId);
            cv.GameDataManager.tRoomData.pkTableStates.curr_straddle_seatid = u32SeatId;

            if (pkStraddlePlayer) {
                pkStraddlePlayer.stake = pkStraddlePlayer.stake - u32Amount;
                pkStraddlePlayer.round_bet = u32Amount;
                pkStraddlePlayer.in_game = true;
                if (pkStraddleSeat) {
                    pkStraddleSeat.setStake(pkStraddlePlayer.stake);
                }
            }
            if (pkStraddleSeat) {
                pkStraddleSeat.showTips(cv.config.getStringData("ActionTips5"), cv.Enum.TipsType.Tips_straddle);
                pkStraddleSeat.Bet(u32Amount);
            }
        }

        for (let i = 0; i < pkBlind.post_seat_list.length; ++i) {
            let u32SeatId = pkBlind.post_seat_list[i];
            let u64Amount = pkBlind.bb_amount;

            let pkPostPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(u32SeatId);
            let pkPostSeat: Seat = this.getSeatBySeverId(u32SeatId);
            this.UpdateDeadPot(u64Amount);

            if (pkPostPlayer) {
                let straddleAmount: number = 0;
                if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle && cv.GameDataManager.tRoomData.getIngamePlayer() > 3) {
                    straddleAmount = u64Amount * 2;
                } else {
                    straddleAmount = u64Amount;
                }
                pkPostPlayer.stake = pkPostPlayer.stake - straddleAmount;
                pkPostPlayer.round_bet = straddleAmount;
                pkPostPlayer.in_game = true;
                if (pkPostSeat) {
                    pkPostSeat.setStake(pkPostPlayer.stake);
                    pkPostSeat.Bet(straddleAmount);
                }
                if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle && cv.GameDataManager.tRoomData.getIngamePlayer() > 3) {
                        pkPostSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                    } else {
                        pkPostSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                    }
                } else {
                    pkPostSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                }
            }
        }
    }

    //第二次发手牌
    public OnSendPlayerHoleCard(msg: NotiPlayerHoleCard) {
        this.waitForStart_img.active = false;
        cv.GameDataManager.tGameData.m_u32DelayTime += 1.3;
        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].resetPos();
            this.m_pkSelfCard[i].setFace(false);
            this.m_pkSelfCard[i].setGary(false);
            this.m_pkSelfCard[i].setContent(msg.holdcards[i].number, msg.holdcards[i].suit);
        }

        this.TurnSelfCard();
        this.DealDown();
    }

    //发手牌
    public OnSendHoleCard(msg: any) {

        // if (!this.isZoom() && cv.roomManager.getCurrentGameID() != cv.Enum.GameId.Bet) {
        //     cv.GameDataManager.tGameData.m_u32DelayTime += 1;
        // }

        if (this._bCriticsimRound) {
            //暴击场中，如果当前是暴击局
            cv.GameDataManager.tGameData.m_u32DelayTime = 0;
        }

        console.log("cv.GameDataManager.tGameData.m_u32DelayTime=============:::" + cv.GameDataManager.tGameData.m_u32DelayTime);
        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].resetPos();
        }
        if (cv.GameDataManager.tGameData.m_u32DelayTime > 0) {
            let pkDealy = cc.delayTime(cv.GameDataManager.tGameData.m_u32DelayTime);
            let pkCall = cc.callFunc(this.RealSendHoleCard.bind(this), this, msg);
            let pkseq = cc.sequence(pkDealy, pkCall);
            pkseq.setTag(this.GAME_DELAY_HOLECARD_TAG);
            this.node.runAction(pkseq);
        } else {
            this.RealSendHoleCard(this.node, msg);
        }
    }

    /**
     * 检测手牌是否合法(是否存在两张牌的花色和牌值都相等)
     * @param holdCards 手牌数组 或者 Card对象 
     * @param cardType  1 手牌数组  2 card对象
     * @returns         非法返回true，合法返回false
     */
    public checkHoleCardIILegal(holdCards: any[], cardType: number = 1) {
        let bErrorCard: boolean = false;

        // 手牌数量小于预设的手牌数量
        if (holdCards.length < this.m_pkSelfCard.length) {
            bErrorCard = true;
        }
        // 手牌数量正确, 则检测花色和牌值
        else {
            let isBreak: Boolean = false;
            let cardsLen: number = holdCards.length;
            for (let i = 0; i < cardsLen; ++i) {

                let num1: number = 0;
                let suit1: number = 0;
                if (cardType == 1) {
                    let kCard_i: game_pb.ICardItem = holdCards[i];
                    num1 = kCard_i.number;
                    suit1 = kCard_i.suit;
                } else {
                    let kCard_i: Card = holdCards[i];
                    num1 = kCard_i.getCardNum();
                    suit1 = kCard_i.getCardSuit();
                }

                for (let j = 0; j < cardsLen; ++j) {
                    if (i === j) continue;
                    let num2: number = 0;
                    let suit2: number = 0;
                    if (cardType == 1) {
                        let kCard_j: game_pb.ICardItem = holdCards[j];
                        num2 = kCard_j.number;
                        suit2 = kCard_j.suit;
                    } else {
                        let kCard_j: Card = holdCards[j];
                        num2 = kCard_j.getCardNum();
                        suit2 = kCard_j.getCardSuit();
                    }

                    if (num1 === num2 && suit1 === suit2) {
                        console.error(`GameMain - TurnSelfCard: exist 2 identical hands idx = ${i}, ${j}, num = ${num1}, suit = ${suit1}`);
                        isBreak = true;
                        bErrorCard = true;
                        break;
                    }
                }
                if (isBreak) break;
            }
        }

        return bErrorCard;
    }

    public RealSendHoleCard(target: cc.Node, pkHoleCard: NoticeGameHolecard) {
        let pkSelf: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
        for (let i = 0; i < pkHoleCard.seat_list.length; ++i) {
            let u32SeatId: number = pkHoleCard.seat_list[i];
            let pkSeat: Seat = this.getSeatBySeverId(u32SeatId);
            if (pkSeat) {
                if (u32SeatId == cv.GameDataManager.tRoomData.i32SelfSeat) {    // 发自己的手牌
                    let len: number = pkHoleCard.holdcards.length;
                    if (pkSelf) {
                        cv.StringTools.clearArray(pkSelf.cards);
                        for (let j = 0; j < len; ++j) {
                            let pkCard: CardItem = new CardItem();
                            pkCard.number = pkHoleCard.holdcards[j].number;
                            pkCard.suit = pkHoleCard.holdcards[j].suit;
                            pkSelf.cards.push(pkCard);
                        }
                    }

                    let f32Delay: number = 0;
                    for (let j = 0; j < len; ++j) {
                        if (this.isGamePLO()) f32Delay += 0.03 + 0.02 * j;
                        this.m_pkSelfCard[j].setFace(false);
                        this.m_pkSelfCard[j].setGary(false);
                        this.m_pkSelfCard[j].setContent(pkHoleCard.holdcards[j].number, pkHoleCard.holdcards[j].suit);
                        this.m_pkSelfCard[j].deal(f32Delay);
                    }

                    // 接收到第一次发牌消息时, 根据值判断是否是直接翻的玩法
                    // 如果是, 则直接翻; 如果不是, 则根据下发的第二条消息"OnSendPlayerHoleCard"去翻
                    let turn_card_delay: number = f32Delay > 0 ? f32Delay + 0.2 : 0.3;
                    if (len > 0 && cv.Number(pkHoleCard.holdcards[len - 1].number) !== 256) {
                        let show_type_delay: number = 0.2;

                        this.node.runAction(cc.sequence(
                            cc.delayTime(turn_card_delay),
                            cc.callFunc(this.TurnSelfCard.bind(this)),
                            cc.delayTime(show_type_delay),
                            cc.callFunc(this.showSelfCardType.bind(this))));
                    }

                    // 更新自己座位筹码位置(只要下发手牌动画完毕就调整位置, 管它翻不翻开牌内容)
                    this.node.runAction(cc.sequence(
                        cc.delayTime(turn_card_delay),
                        cc.callFunc((): void => {
                            if (!this.isGameStarSeat() && cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                                let pkSeat: Seat = this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
                                pkSeat.updateChipPosBySeatStatus(true);
                            }
                        })));
                }
                else {
                    let f32Delay: number = 0;
                    let len = this.isGamePLO() ? 4 : 2;
                    for (let j = 0; j < len; ++j) {
                        if (this.isGamePLO()) f32Delay += 0.03 + 0.02 * j;
                        pkSeat.getCard(j).deal(f32Delay);
                    }
                }

            }
            else {
                console.log("can't find Seat", u32SeatId);
            }
        }

        // for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
        //     this.m_pkSelfCard[i].getComponent(cc.Button).interactable = true;
        // }
    }

    public TurnSelfCard() {
        // 容错判断
        let bErrorCard: boolean = this.checkHoleCardIILegal(this.m_pkSelfCard, 2);

        // 若是急速且牌值正确则直接显示牌面然后返回
        if (this.isZoom() && !bErrorCard) {
            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                this.m_pkSelfCard[i].setFace(true);
            }
            return;
        }

        // 轮到玩家行动时单独发牌逻辑
        let isDzAnte5 = (cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount >= 500) && (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
        if (cv.roomManager.getCurrentGameID() === cv.Enum.GameId.Bet
            || (isDzAnte5 && !this._bCriticsimRound)
            || this.isGamePLO()) {
            if (bErrorCard) return;

            this.m_bIsSelfShowDown = true;
            cv.GameDataManager.tGameData.m_u32DelayTime = 0;
        }

        // 设置为牌背
        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].setFace(false);
        }

        // 手牌正确则翻牌
        if (!bErrorCard) {
            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                this.m_pkSelfCard[i].turn(0);
            }
        }

        let pkDealy = cc.delayTime(0.3 * 0.5 * 3);// 同步翻手牌动作
        let pkCall = cc.callFunc(this.showGuessSettle.bind(this), this);
        let pkseq = cc.sequence(pkDealy, pkCall);
        pkseq.setTag(this.GAME_SHOW_GUESS_SETTLE_TAG);
        this.node.runAction(pkseq);
    }

    public OnActionTurn(pkActionTurn: game_pb.NoticePlayerActionTurn) {
        if (cv.GameDataManager.tGameData.m_u32DelayTime == 0) {
            this.RealActionTurn(this.node, pkActionTurn);
        }
        else {
            let pkCall = cc.callFunc(this.RealActionTurn.bind(this), this, pkActionTurn);
            let pkDelay = cc.delayTime(cv.GameDataManager.tGameData.m_u32DelayTime);
            let pkseq = cc.sequence(pkDelay, pkCall);
            pkseq.setTag(this.GAME_DELAY_ACTION_TURN_TAG);
            this.node.runAction(pkseq);
        }
    }

    public UpdatePotsByAction(pkActionTurn: game_pb.NoticePlayerActionTurn) {
        let u32PotCount = pkActionTurn.pots.length;
        let u32DeadPotAmount = 0;
        for (let i = 0; i < u32PotCount; ++i) {
            u32DeadPotAmount += pkActionTurn.pots[i].amount;
        }
        if (u32PotCount >= 1) {
            this.dichiChip_text.node.active = true;
            this.mainpool_text.string = cv.StringTools.serverGoldToShowString(pkActionTurn.pots[0].amount);
            this.mainpool_text.node.name = pkActionTurn.pots[0].potid.toString();
            this.mainpool.setContentSize(cc.size(this.getMainpoolWidth(), this.mainpool.getContentSize().height));
            cc.find("mainpool_chips", this.mainpool).setPosition(cc.v2(-this.mainpool.getContentSize().width / 2));
            this.mainpool.active = true;
            this.mainpool.runAction(cc.show());

            for (let i = 1; i < u32PotCount; ++i) {
                let u32Id = pkActionTurn.pots[i].potid;
                let u32Amount = pkActionTurn.pots[i].amount;
                if (i < 9) {
                    this.showSidepool(i, u32Amount, u32Id, u32PotCount);
                } else {
                    console.log("Too many Side Pot.Not Show");
                }

            }
        }
        else {
            this.dichiChip_text.node.active = false;
            this.mainpool_text.string = "";
        }
        this.UpdateDeadPot(u32DeadPotAmount);
    }

    public UpdateRoundBetByAction(pkActionTurn: game_pb.NoticePlayerActionTurn) {
        for (let i = 0; i < pkActionTurn.players.length; i++) {
            let kPlayer: game_pb.IPlayerInfo = pkActionTurn.players[i];
            let pkSeat: Seat = this.getSeatBySeverId(kPlayer.seatid);
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayerBySeatId(kPlayer.seatid);
            if (pkSeat) {
                pkSeat.showChipsNow(kPlayer.round_bet);
            }
            if (pkPlayer) {
                pkPlayer.round_bet = kPlayer.round_bet;
            }
            this.UpdateDeadPot(kPlayer.round_bet);
        }
    }

    //判断是否需要Raise加注操作
    //bet：当前操作位的下注额
    //pkActionTurn: 桌面操作玩家的信息
    public GreaterBet(bet, pkActionTurn: game_pb.NoticePlayerActionTurn) {
        let cur_bet = bet;

        for (let i = 0; i < pkActionTurn.players.length; i++) {
            let kPlayer: game_pb.IPlayerInfo = pkActionTurn.players[i];
            if (kPlayer.round_bet > cur_bet) {
                cur_bet = kPlayer.round_bet;
            }
        }

        this.greatest_bet = cur_bet; //当前最大下注额
        return (cur_bet > bet);
    }

    //下注字段含义:
    //minimum_bet_i64: 最小下注额度 
    //round_bet: 玩家的本回合下注总数
    //carr_action_seat_roundbet:  操作位轮到的下注额度

    //关于下注操作: RequestAction函数，
    //不管是Bet(下注) 还是Raise(加注)操作，传入的u32Amount金币值，都表示下注/加注的目标值;
    //比如，传给服务器u32Amount值为1000(10个金币)，表示 下注/加注 到10个金币。
    public RealActionTurn(target: cc.Node, pkActionTurn: game_pb.NoticePlayerActionTurn) {
        // 发送消息, 应用快捷下注模(是翻前模式还是翻后模式)
        cv.MessageCenter.send("change_qucikbet_setting", this.quickBetModeIsPreflop);

        cv.GameDataManager.tGameData.u32DeadPot = 0;
        this.UpdatePotsByAction(pkActionTurn);
        this.UpdateRoundBetByAction(pkActionTurn);
        //如果自己坐下了，刷一下自己的装态
        // if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
        //     let pkSelf: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
        //     if (pkSelf.in_game) {
        //         this.getSeatBySeatViewId(0).updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_OnAction);
        //     }
        // }
        for (let i = 0; i < this.seatList.length; ++i) {
            let pkSeat: Seat = this.getSeatBySeverId(i);
            if (pkSeat) {
                if (pkSeat.getStatus() != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
                    pkSeat.stopCDtime();
                }
            }
            else {
                console.error(`GameMain - RealActionTurn: can't find Seat ${i}`);
            }
        }

        let u32SeatId = pkActionTurn.curr_action_seat_id;
        let pkSeat: Seat = this.getSeatBySeverId(u32SeatId);

        let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(pkActionTurn.curr_action_uid);
        cv.GameDataManager.tRoomData.curActionPlayerId = pkPlayer.playerid;
        if (pkPlayer) {
            let u32Minibet: number = 0;
            let u32SliderMaxBet: number = 0;
            let bGreaterBet: boolean = this.GreaterBet(pkActionTurn.carr_action_seat_roundbet, pkActionTurn);
            let i32CallAmount: number = pkActionTurn.call_amount;
            if (pkActionTurn.curr_action_uid === cv.dataHandler.getUserData().u32Uid) {
                if (this.isZoom()) {  //急速防止存在手牌是暗牌的情况
                    let cardItems: game_pb.ICardItem[] = pkActionTurn.holdcards;  //轮到自己操作，重新刷新手牌
                    let bErrorCard: boolean = this.checkHoleCardIILegal(cardItems, 1);  //检测手牌是否合法
                    for (let i = 0; i < cardItems.length; i++) {
                        if (!bErrorCard) {
                            let kCard: game_pb.ICardItem = cardItems[i];
                            this.m_pkSelfCard[i].node.active = true;
                            this.m_pkSelfCard[i].setContent(kCard.number, kCard.suit);
                            this.m_pkSelfCard[i].setFace(!(kCard.number === 256));
                        }
                    }
                }

                this.onCloseZoomTips();
                if (cv.GameDataManager.tGameData.m_bIsOnSelfAction) {
                    return;
                }
                cv.GameDataManager.tGameData.m_bIsOnSelfAction = true;

                //玩家操作序号，服务器每收到一个操作，这个数值便会+1，以确认当前的这个操作是有效的。(这是有效确认的条件之一)
                //客户端完全透传这个参数即可，不做作何操作
                //一手牌结束会清0重新开始
                cv.GameDataManager.tGameData.m_u32ActionSeq = pkActionTurn.ActionSeq;

                if (pkActionTurn.default_fold) {
                    return;
                }

                if (cv.GameDataManager.tRoomData.pkRoomParam.is_allin_allfold) {
                    if (this.giveUp_buttonIsCheck) {
                        cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true);
                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                        return;
                    }
                    if (this.followFill_buttonIsCheck) {
                        cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, cv.StringTools.clientGoldByServer(pkPlayer.stake + pkPlayer.round_bet));
                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                        return;
                    }

                    this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_AllIn);
                    this.showSelfThinkCd(pkActionTurn.action_time, 2);
                    return;
                }

                // this.setMyChips(pkPlayer.stake);
                cv.GameDataManager.tRoomData.u32Stake = pkPlayer.stake;
                //minimum_bet_i64: 最小下注额度
                if (pkActionTurn.minimum_bet_i64 >= pkPlayer.stake + pkPlayer.round_bet) {
                    u32Minibet = pkPlayer.stake + pkPlayer.round_bet;
                }
                else {
                    u32Minibet = pkActionTurn.minimum_bet_i64;
                }

                u32SliderMaxBet = pkPlayer.stake + pkPlayer.round_bet;
                this._sliderMaxBetNum = u32SliderMaxBet;

                /**
                 * 若是"奥马哈", 检测下最大下注限额
                 * 底池:                Straddle + BB + SB + Ante
                 * 上一下注：           可指上一对手的下注/加注/跟注/盲注/straddle
                 * 1.前位无人下注:      底池总额
                 * 2.前位有人下注:      (上家下注 * 3) + 底池
                 * 3.玩家自己已有下注:  (上家下注 * 3) + 底池 – 自己此轮已下注
                 */
                if (this.isGamePLO() && pkActionTurn.max_round_bet > 0) {
                    u32SliderMaxBet = Math.min(u32SliderMaxBet, pkActionTurn.max_round_bet);
                }

                cv.GameDataManager.tGameData.m_u32StakeNow = u32SliderMaxBet;
                cv.GameDataManager.tGameData.m_u32MiniRaise = u32Minibet;
                cv.GameDataManager.tGameData.m_u32RoundBet = pkPlayer.round_bet;
                cv.GameDataManager.tGameData.m_u32NeedCall = this.greatest_bet - pkPlayer.round_bet;
                cv.GameDataManager.tGameData.m_u32GreatestBet = this.greatest_bet;
                cv.GameDataManager.tGameData.m_u32FullPot = (cv.GameDataManager.tGameData.u32DeadPot + cv.GameDataManager.tGameData.m_u32NeedCall) + this.greatest_bet;

                let u32Stake: number = cv.GameDataManager.tGameData.m_u32StakeNow;
                let u32MiniRaise: number = cv.GameDataManager.tGameData.m_u32MiniRaise;
                let isSmall: number = cv.GameDataManager.tRoomData.pkRoomParam.is_mirco;

                this.ChipsLevel = [];
                this.ChipsLevel = cv.tools.SplitChipsLevel(u32Stake, u32MiniRaise, isSmall);

                if (this.ChipsLevel.length > 0) {
                    this.freeSliderStep = cv.StringTools.div(1, this.ChipsLevel.length);
                }

                // 这里会造成BUG  先注释
                // for (let i = 0; i < 2; ++i) {
                //     this.m_pkSelfCard[i].node.active = true;
                //     this.m_pkSelfCard[i].turn(0);
                //     this.m_pkSelfCard[i].setGary(false);
                //     //this.m_pkSelfCard[i].getButton().setTouchEnabled(true);
                // }
                switch (this.actionButtonStatus) {
                    case cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck: {
                        if (this.giveUp_buttonIsCheck) {
                            // check
                            if (cv.GameDataManager.tGameData.m_u32NeedCall == 0) {
                                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Check, 0);
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            }
                            // fold
                            else {
                                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true);
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            }
                            return;
                        }
                        if (this.followFill_buttonIsCheck) {
                            cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Check, 0);
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            return;
                        }
                    } break;

                    case cv.Enum.ActionButtonStatus.Control_Default_Call: {
                        // fold
                        if (this.giveUp_buttonIsCheck) {
                            cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true);
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            return;
                        }
                        if (this.followFill_buttonIsCheck) {
                            if (cv.GameDataManager.tGameData.m_u32NeedCall < pkPlayer.stake) {
                                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Call, cv.StringTools.clientGoldByServer(cv.GameDataManager.tGameData.m_u32NeedCall));
                            }
                            else {
                                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, cv.StringTools.clientGoldByServer(pkPlayer.stake + pkPlayer.round_bet));
                            }
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            return;
                        }
                    } break;

                    case cv.Enum.ActionButtonStatus.Control_AllInOrFold: {
                        // fold
                        if (this.giveUp_buttonIsCheck) {
                            cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true);
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            return;
                        }
                        if (this.followFill_buttonIsCheck) {
                            cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, cv.StringTools.clientGoldByServer(pkPlayer.stake + pkPlayer.round_bet));
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                            return;
                        }
                    } break;

                    default:
                        break;
                }

                if (cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/pturn");
                }

                if (pkPlayer.stake == 0) {
                    this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                }
                else {
                    if (bGreaterBet) {
                        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                            if (this.greatest_bet < cv.GameDataManager.tRoomData.pkTableStates.bb_amount) {
                                this.greatest_bet = cv.GameDataManager.tRoomData.pkTableStates.bb_amount;
                            }
                        }
                        else if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                            if (this.greatest_bet < cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount) {
                                this.greatest_bet = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
                            }
                        }

                        let u32CallTo = this.greatest_bet - pkPlayer.round_bet; //加注差额
                        let u32MiniRaise = pkActionTurn.minimum_bet_i64 - (u32CallTo + pkPlayer.round_bet); //最小加注差额

                        if (u32CallTo >= u32MiniRaise) {
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Raise);
                            this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                            this.showSelfThinkCd(pkActionTurn.action_time, 1);
                        }
                        else {
                            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                                if (cv.GameDataManager.tRoomData.pkTableStates.curr_sb_seatid == pkPlayer.seatid) {
                                    if (pkPlayer.round_bet == cv.GameDataManager.tRoomData.pkTableStates.sb_amount) {
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Raise);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                    else {
                                        //just call
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                }
                                else if (cv.GameDataManager.tRoomData.pkTableStates.curr_bb_seatid == pkPlayer.seatid) {
                                    if (pkPlayer.round_bet == cv.GameDataManager.tRoomData.pkTableStates.bb_amount) {
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Raise);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                    else {
                                        //just call
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                }
                                else if (cv.GameDataManager.tRoomData.isStraddle(pkPlayer.seatid)) {
                                    if (pkPlayer.round_bet == cv.GameDataManager.tRoomData.pkTableStates.bb_amount * 2) {
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Raise);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                    else {
                                        //just call
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                }
                                else {
                                    //just call
                                    this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                    this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                    this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                }
                            }
                            else if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                                if (cv.GameDataManager.tRoomData.pkRoomParam.short_game_double_ante) {
                                    if (cv.GameDataManager.tRoomData.pkTableStates.curr_dealer_seatid == pkPlayer.seatid) {
                                        if (pkPlayer.round_bet == cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount) {
                                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Raise);
                                            this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                            this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                        }
                                        else {
                                            //just call
                                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                            this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                            this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                        }
                                    }
                                    else {
                                        //just call
                                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                        this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                    }
                                }
                                else {
                                    //just call
                                    this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                    this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                    this.showSelfThinkCd(pkActionTurn.action_time, 1);
                                }
                            }
                            else {
                                //just call
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Just_Call);
                                this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkPlayer.round_bet);
                                this.showSelfThinkCd(pkActionTurn.action_time, 1);
                            }
                        }
                    }
                    else {
                        this.followFill_text.fontSize = 44;
                        //#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                        //					CocoaHelper::CopyToPasteboard("roomid: " + StringUtils::format("%d", cv.GameDataManager.tRoomData.u32RoomId) + "uid: " + StringUtils::format("%d", g_pkDataManager.getUser().u32Uid) + "roundbet: " + StringUtils::format("%d", pkPlayer.round_bet) + "greatest_bet: " + StringUtils::format("%d", greatest_bet));
                        //#endif
                        if (this.GreaterBet(0, pkActionTurn)) {
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Bet);
                            this.showSelfThinkCd(pkActionTurn.action_time, 2);
                            this.followFill_text.string = "0";
                        }
                        else {
                            //bet
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Bet);
                            this.showSelfThinkCd(pkActionTurn.action_time, 2);
                            this.followFill_text.string = "0";
                        }
                    }

                    // handle allin-case
                    if (this.greatest_bet >= pkPlayer.stake + pkPlayer.round_bet) {
                        //only allin
                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_AllIn);

                        this.showSelfThinkCd(pkActionTurn.action_time, 1);
                    }
                    else if (u32Minibet >= pkPlayer.stake + pkPlayer.round_bet) {
                        if (this.actionButtonStatus != cv.Enum.ActionButtonStatus.Control_Just_Call && this.actionButtonStatus != cv.Enum.ActionButtonStatus.Control_Bet) {
                            //allin call
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_add_AllIn);
                            this.showSelfThinkCd(pkActionTurn.action_time, 1);
                        }
                    }
                    //update quick bet value
                    if (this.actionButtonStatus != cv.Enum.ActionButtonStatus.Control_AllIn && this.actionButtonStatus != cv.Enum.ActionButtonStatus.Control_Just_Call) {
                        this.setDiChiBtnText(0, cv.GameDataManager.tGameData.u32DeadPot, this.greatest_bet - pkPlayer.round_bet, this.greatest_bet);
                        this.setDiChiBtnText(1, cv.GameDataManager.tGameData.u32DeadPot, this.greatest_bet - pkPlayer.round_bet, this.greatest_bet);
                        this.setDiChiBtnText(2, cv.GameDataManager.tGameData.u32DeadPot, this.greatest_bet - pkPlayer.round_bet, this.greatest_bet);

                        if (!this.game.changeCard_panel.getComponent("ChangeCard").isButton3) {
                            this.setDiChiBtnText(3, cv.GameDataManager.tGameData.u32DeadPot, this.greatest_bet - pkPlayer.round_bet, this.greatest_bet);
                            this.setDiChiBtnText(4, cv.GameDataManager.tGameData.u32DeadPot, this.greatest_bet - pkPlayer.round_bet, this.greatest_bet);
                        }

                    }
                    // 这里会造成BUG  先注释（tom）
                    // for (let i = 0; i < 2; i++) {
                    //     this.m_pkSelfCard[i].node.active = true;
                    //     this.m_pkSelfCard[i].setFace(true);
                    // }
                }
            }
            else {
                cv.GameDataManager.tGameData.m_bIsOnSelfAction = false;
                if (pkSeat) {
                    pkSeat.setThankCdTime(pkActionTurn.action_time, 2);
                    pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_OnAction);
                }
                else {
                    console.log("can't find Seat:" + u32SeatId);
                }

                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    /**
                     * 备注：(!bGreaterBet && pkActionTurn.last_action_uid == cv.dataHandler.getUserData().u32Uid）之前这个条件判断是放在下面这一句的。与pkPlayer.stake == 0是或的关系
                     * 
                     * 但是测试过后发现last_action_uid 以及last_action_seatid都是不对的，（也就是说这个条件一直都没起作用）经过服务器改正之后，出现了自己不加注的情况预操作按钮没有的情况(也就是起作用了)结果反而感觉是bug
                     * 
                     * 原来的这里判断，stake == 0 说明没有筹码了，没有操作的权限，操作面板隐藏
                     * !bGreaterBet说明当前这一轮操作过程中没有人再加注过，原来这里的判断也有一点问题就是上一轮操作的人是不是自己，正确的应该是这一轮自己是否有操作过，且这一轮没有人再进行加注。这个时候也没有操作权限（按德州的规则）
                     * 目前把这个条件去掉，相当于按以前的逻辑走了（改起来麻烦），任何时候自己都有权限预操作，这样其实也没有什么问题，因为当你没有权限的时候，你预操作也不会起作用。
                     * */
                    if (pkPlayer.stake == 0) {//(!bGreaterBet && pkActionTurn.last_action_uid == cv.dataHandler.getUserData().u32Uid
                        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                    }
                    else {
                        let pkSelf: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
                        if ((pkSelf.last_action != cv.Enum.ActionType.Enum_Action_Fold) && (pkSelf.last_action != cv.Enum.ActionType.Enum_Action_Allin) && pkSelf.in_game) {
                            if (cv.GameDataManager.tRoomData.pkRoomParam.is_allin_allfold) {
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_AllInOrFold);
                                return;
                            }
                            //if (bGreaterBet) {

                            if (this.greatest_bet >= pkSelf.stake + pkSelf.round_bet) {
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_AllInOrFold);
                            }
                            else if (this.greatest_bet - pkSelf.round_bet > 0) {
                                this.followFill_text.string = cv.StringTools.serverGoldToShowString(this.greatest_bet - pkSelf.round_bet);
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Default_Call);
                            }
                            else {
                                this.followFill_text.fontSize = 44;
                                // check or fold  & check
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck);
                                this.followFill_text.string = "0";
                            }
                            /* }
                            else {
                                this.followFill_text.fontSize = 44;
                                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck);
                                this.followFill_text.string = "0";
                            } */
                        }
                        else {
                            this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                        }
                    }
                }
            }
        }
        this.followFill_button.interactable = true;
        //this.dichi_button0.getComponent(cc.Button).interactable = true;
        // this.dichi_button1.getComponent(cc.Button).interactable = true;
        this.dichi_button1_2.getComponent(cc.Button).interactable = true;
        // this.dichi_button2.getComponent(cc.Button).interactable = true;
        this.freeSlider.node.active = true;
    }
    // public setMyChips(num: number) {
    //     num = cv.StringTools.serverGoldToShowNumber(num);
    //     let myChips_text = cc.find("myChips_text", this.mychips_bg).getComponent(cc.Label);
    //     myChips_text.string = num.toString();
    //     if (num > 10000000) {
    //         myChips_text.fontSize = 36;
    //         //myChips_text.node.setPosition(93);
    //         //this.mychips_bg.setContentSize(cc.size(186, 44));
    //     }
    //     else {
    //         myChips_text.fontSize = 40;
    //         //myChips_text.node.setPosition(90);
    //         //this.mychips_bg.setContentSize(cc.size(180, 44));
    //     }
    // }

    /**
     * 快捷加注
     * @param u32Index      按钮索引
     * @param u32DeadPot    底池
     * @param u32NeedCall   真实跟注额
     * @param u32GreatBet   跟注总额
     * @brief 快捷加注按钮的计算公式：
        四舍五入取整((底池筹码 + 本轮需要跟注的实际筹码) * 按钮百分比) + 本轮跟注的总额
        按钮可设置的百分比的取值区间为%10  -  %200(桌面设置里面可自定义设置该值,默认值也在此范围内)
        例子:
            假设第一个快捷加注的按钮设置为10%
            对手大盲位置  自己小盲位  对手大盲5  自己2  ，轮到自己下注   
            本轮跟注的总额 就是5 ，本轮需要跟注的实际筹码就是总额减已下注的 5 - 2 = 3
            第一轮小盲位第一个快捷加注的按钮值就是：  (7 + 3) * %10 +  5 = 6  
            这个实际下注额还需要调用RoundingNum判断大小然后得到最终值
     */
    public setDiChiBtnText(u32Index: number, u32DeadPot: number, u32NeedCall: number, u32GreatBet: number) {
        let u32Value = 0;
        let fontSize = 42;
        let f32Rate = 0;
        let pkBtn: cc.Button = null;
        let strValue = "";
        switch (u32Index) {
            case 0: pkBtn = this.dichi_button0; break;
            case 1: pkBtn = this.dichi_button1; break;
            case 2: pkBtn = this.dichi_button2; break;
            case 3: pkBtn = this.dichi_button3; break;
            case 4: pkBtn = this.dichi_button4; break;
            default: pkBtn = this.dichi_button0; break;
        }

        let isPreflop: boolean = false;
        let dichi_text: cc.Node = cc.find("dichi_text" + u32Index, pkBtn.node);
        let dichi_text_tag: Tag = dichi_text.getComponent(Tag);
        if (dichi_text_tag) {
            f32Rate = cv.Number(dichi_text_tag.getTag());
            isPreflop = Boolean(dichi_text_tag.getData());
        }

        let bb_amount: number = cv.GameDataManager.tRoomData.pkTableStates.bb_amount;
        let ante_amount: number = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
        let isMirco: boolean = cv.GameDataManager.tRoomData.pkRoomParam.is_mirco === 1;
        let isStraddle: boolean = cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle !== 0;
        let isShortGameMode: boolean = cv.GameDataManager.tRoomData.pkRoomParam.game_mode === cv.Enum.CreateGameMode.CreateGame_Mode_Short;

        if (this.isGamePLO()) {
            if (isPreflop) {
                if (f32Rate >= 0) {
                    let tmp_value: number = 0;

                    // 短牌
                    if (isShortGameMode) {
                        tmp_value = ante_amount;
                    }
                    // 其他
                    else {
                        if (isStraddle) {
                            tmp_value = 2 * bb_amount;
                        }
                        else {
                            tmp_value = bb_amount;
                        }
                    }

                    u32Value = cv.StringTools.times(f32Rate, tmp_value);
                }
                else {
                    // 满池
                    u32Value = cv.GameDataManager.tGameData.m_u32StakeNow;
                }
            }
            else {
                // u32Value = (u32DeadPot + u32NeedCall) * f32Rate + u32GreatBet;
                // 把上述公式, 用下述表达式做精确运算
                u32Value = cv.StringTools.plus(u32DeadPot, u32NeedCall);
                u32Value = cv.StringTools.times(u32Value, f32Rate);
                u32Value = cv.StringTools.plus(u32Value, u32GreatBet);
            }

            u32Value = cv.StringTools.clientGoldByServer(u32Value);

            if (isMirco) {
                u32Value = cv.StringTools.toFixed(u32Value, 2, cv.StringTools.RoundingMode.ROUND_FLOOR);
            }
            else {
                u32Value = Math.floor(u32Value);
            }

            strValue = cv.String(u32Value);
            fontSize = 32;

            // 计算完后在恢复服务器的单位用于下面的"pkBtn.node.active"检测(保持在同单位运算)
            u32Value = cv.StringTools.serverGoldByClient(u32Value);
        }
        else {
            if (isPreflop) {
                if (f32Rate >= 0) {
                    let tmp_value: number = 0;

                    // 短牌
                    if (isShortGameMode) {
                        tmp_value = ante_amount;
                    }
                    // 其他
                    else {
                        if (isStraddle) {
                            tmp_value = 2 * bb_amount;
                        }
                        else {
                            tmp_value = bb_amount;
                        }
                    }

                    u32Value = cv.StringTools.times(f32Rate, tmp_value);
                }
                else {
                    // allin
                    u32Value = cv.StringTools.plus(cv.GameDataManager.tRoomData.u32Stake, cv.GameDataManager.tGameData.m_u32RoundBet);
                }
            }
            else {
                // 公式: 四舍五入取整((当前底池筹码 + 本轮需要跟注的实际筹码) * 按钮百分比) + 本轮跟注的总额
                u32Value = cv.tools.round_double((u32DeadPot + u32NeedCall) * f32Rate) + u32GreatBet;
                u32Value = cv.tools.RoundingNum(u32Value);
            }

            if (u32Value >= 1000000) {
                fontSize = 28;
            }
            else {
                fontSize = 32;
            }

            //在微局或者 非微局也需要显示小数的局（比如必下局2必）判断盲注显示小数
            // let num = cv.Number(this.mangZhu_text.string.split("/")[0]);
            // if (isMirco || num < 1) {
            if (isMirco || cv.GameDataManager.tRoomData.u32GameID === cv.Enum.GameId.Bet) {
                strValue = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(u32Value));
            }
            else {
                strValue = cv.StringTools.numberToString(Math.floor(cv.StringTools.clientGoldByServer(u32Value)));
            }
        }

        // 校验计算结果的合理范围
        let minBet: number = cv.GameDataManager.tGameData.m_u32MiniRaise;
        let maxBet: number = cv.GameDataManager.tGameData.m_u32StakeNow;

        let bCanTouch = u32Value >= minBet && u32Value <= maxBet;
        pkBtn.interactable = bCanTouch;
        pkBtn.node.active = true;

        let isButton3 = this.game.changeCard_panel.getComponent("ChangeCard").isButton3;
        if (isButton3) {
            if (u32Index == 3 || u32Index == 4) {
                pkBtn.node.active = false;
            }
        }

        let _dichi_text = cc.find("dichi_text" + u32Index, pkBtn.node);
        let _dichi_mangzhutext = cc.find("dichi_mangZhuText" + u32Index, pkBtn.node);
        _dichi_mangzhutext.getComponent(cc.Label).fontSize = fontSize;
        _dichi_mangzhutext.getComponent(cc.Label).string = strValue;

        if (bCanTouch) {
            _dichi_text.color = cc.color(255, 255, 255);
            _dichi_mangzhutext.color = cc.color(255, 255, 255);
            _dichi_text.opacity = 255;
            _dichi_mangzhutext.opacity = 255;
        } else {
            //不能触摸时，颜色和透明度不相同
            _dichi_text.color = cc.color(189, 189, 189);
            _dichi_mangzhutext.color = cc.color(255, 255, 255);
            _dichi_text.opacity = 153;
            _dichi_mangzhutext.opacity = 153;
        }
        // 兼容非微局 又能下注小数的情况下 出现值为0时的问题  先隐藏 下版本修改
        if (cv.Number(strValue) === 0) {
            pkBtn.node.active = false;
        }

        if (u32Index === 1) {
            cc.find("dichi_mangZhuText" + u32Index, this.dichi_button1_2.node).getComponent(cc.Label).fontSize = fontSize;
            cc.find("dichi_mangZhuText" + u32Index, this.dichi_button1_2.node).getComponent(cc.Label).string = strValue;
            this.dichi_button1_2.node.active = bCanTouch;
        }
    }

    public updateThink(num: number) {
        if (this.thinkCdtime <= 0) {
            this.thinkCdtime = 100;
            this.unschedule(this.updateThink);
            this.thinkCdTime_text.node.active = false;
            this.thankProgressBar.node.active = false;
            this.doBlink(5);
            //倒计时结束逻辑
            return;
        }

        let tempTime = cc.director.getDeltaTime() / (1 / 60) * this.htime;
        this.thinkCdtime -= tempTime;
        let temp = 3;

        if (this.isZoom()) {
            if (this.m_pkPublicCard[0].isFace()) {
                temp = 5;
            }
        }
        else {
            temp = 4;
        }

        if (Math.floor(this.thinkCdtime / (this.htime * cc.game.getFrameRate())) == temp) {
            if (this.m_pkSelfCard[0].node.getNumberOfRunningActions() != 0) return;
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/tipsvoice");
            let rotate = cc.rotateTo(0.1, 0);
            let rotateBy = cc.rotateTo(0.1, 0);
            this.m_pkSelfCard[0].node.runAction(cc.repeatForever(cc.sequence(rotate, rotateBy)));
            if (cv.tools.isVibrate()) {
                console.log("ready to vibrate.");
                // if (cc.sys.os == cc.sys.OS_IOS) {
                cv.native.Vibrate();
                // }
            }
        }

        let progress = this.thinkCdtime / 100;
        this.thankProgressBar.progress = progress;
        this.practil_panel.angle = progress * 360;
        //只是为了解决粒立残留的问题，先把practil_panel移到正确的位置，角度转了一点点之后再显示。
        if (progress < 0.99) {
            this.practil_panel.opacity = 255;
        }
        this.thinkCdTime_text.string = Math.floor(Math.abs(this.thinkCdtime) / (this.htime * cc.game.getFrameRate())).toString() + "s";
    }
    public doBlink(num: number) {

    }
    //cdType:1红色按钮倒计时  2蓝色按钮倒计时
    public showSelfThinkCd(timeFromSever: number, cdType: number) {
        this.unschedule(this.updateThink);
        this.thinkCdtime = 100;
        this.maxtime = timeFromSever - 2;

        this.m_selfActionType = cdType;
        if (this.maxtime <= 0) {
            this.hideThankCD();
            return;
        }

        //标记哪一个，以便在切换样试的时候做修改
        this.thinkCdTime_text.getComponent(Tag).setTag(cdType);
        this.updateThinkCdStyle();
        // if (cdType == 1) {
        //     //this.red_img.node.x = this.giveUpRed.node.x;
        //     this.thinkCdTime_text.node.setPosition(this.giveUpRed.node.x, this.giveUpRed.node.y + 10);
        //     this.practil_panel.x = this.giveUpRed.node.x;
        //     this.thankProgressBar.node.setPosition(this.giveUpRed.node.x, this.giveUpRed.node.y + 8);
        // }
        // else {
        //     //this.red_img.node.x = this.followFill_Blue.node.x;
        //     this.thinkCdTime_text.node.setPosition(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 10);
        //     this.practil_panel.x = this.followFill_Blue.node.x;
        //     this.thankProgressBar.node.setPosition(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 8);
        // }

        this.thinkCdTime_text.node.active = true;
        this.thankProgressBar.node.active = true;


        this.htime = this.thinkCdtime / (this.maxtime * cc.game.getFrameRate());
        this.schedule(this.updateThink, 0);
    }
    /**
     * 播放延时动画
     * @param cdType 
     */
    public showAddTimeAction(cdType) {
        if (!this._addtime_action) {
            this._addtime_action = cc.instantiate(this.addtimePrefab);
            this.node.addChild(this._addtime_action);
            this._addtime_action.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                this._addtime_action.active = false;
            }, this);
        }
        this._addtime_action.active = true;
        this._addtime_action.getComponent(cc.Animation).play("place_card_btn_delay");
        if (cdType == 1) {
            this._addtime_action.setPosition(cc.v2(this.giveUpRed.node.x, this.giveUpRed.node.y + 10));
        }
        else {
            this._addtime_action.setPosition(cc.v2(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 10));
        }
    }
    public OnResetGame(msg: any) {

        this.onCloseZoomTips();
        cv.GameDataManager.tGameData.m_u32DelayTime = 0;
        cv.GameDataManager.tGameData.m_bIsAnte = false;

        cv.GameDataManager.tGameData.reset();
        cv.action.setButtonActiveFalse(this.deal_button.getComponent(cc.Button));
        cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));

        if (this.getSeatBySeatViewId(0).getStatus() != cv.Enum.SeatStatus.SeatStatus_leave_a_monment && cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            cv.GameDataManager.tRoomData.m_isAllInMode = true;
            this.game.menu_Panel.getComponent(menu).updateMenu();
        }

        this.RealResetGame(this.node, msg);
        /*
        let pkDealy = cc.delayTime(cv.GameDataManager.tGameData.m_u32DelayTime);
        let pkCall = cc.callFunc(this.RealResetGame.bind(this), this.node, msg);
        let pkseq = cc.sequence(pkDealy, pkCall);
        pkseq.setTag(this.GAME_DELAY_RESET_GAME_TAG);
        this.node.runAction(pkseq);*/
    }
    public RealResetGame(target: cc.Node, pkReset: NoticeResetGame) {
        this.node.stopActionByTag(9911);
        this.removeWin();
        if (this.short_pai.active) {
            this.short_pai.opacity = 255;
        }
        for (let i = 0; i < pkReset.players.length; ++i) {
            let kPlayer: PlayerInfo = pkReset.players[i];
            let pkTablePlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(kPlayer.playerid);
            if (pkTablePlayer) {
                pkTablePlayer.stake = kPlayer.stake;
                pkTablePlayer.in_game = kPlayer.in_game;
                pkTablePlayer.round_bet = kPlayer.round_bet;
                pkTablePlayer.inStay = kPlayer.inStay;
                pkTablePlayer.last_action = kPlayer.last_action;
                // let pkPos: PositionInfo = new PositionInfo;
                // pkPos.ip = kPlayer.position.ip;
                // pkPos.latitude = kPlayer.position.latitude;
                // pkPos.longtitude = kPlayer.position.longtitude;
                // pkTablePlayer.position = pkPos;

                let pkSeat: Seat = this.getSeatBySeverId(pkTablePlayer.seatid);
                if (pkSeat) {
                    pkSeat.setStake(kPlayer.stake);
                    pkSeat.SetName(kPlayer.name);

                    for (let j = 0; j < pkSeat.getHandsCardsCount(); ++j) {
                        pkSeat.getShowCard(j).setFace(false);
                        pkSeat.getShowCard(j).clearContent();
                    }
                }
                if (pkTablePlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                    cv.GameDataManager.tRoomData.u32Stake = pkTablePlayer.stake;
                }
            }
        }

        /*#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            CocoaHelper:: CopyToPasteboard("roomid: " + StringUtils:: format("%d", g_pkDataManager . getRoom() . u32RoomId) + "gameid: " + pkReset . gameid() + " " + "uid: " + StringUtils:: format("%d", g_pkDataManager . getUser() . u32Uid));
        g_pkDataManager . getGame() . HandID = pkReset . gameid();
        #endif*/

        this.resetTable();

        for (let i = 0; i < pkReset.players.length; ++i) {
            let kPlayer: PlayerInfo = pkReset.players[i];
            let pkTablePlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(kPlayer.playerid);

            if (pkTablePlayer) {
                let pkSeat: Seat = this.getSeatBySeverId(pkTablePlayer.seatid);
                if (pkSeat) {
                    if (!pkTablePlayer.in_game && !pkTablePlayer.inStay) {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting, cv.Enum.ActionType.Enum_Action_Null);
                        if (pkSeat.getData() != null) {
                            if (pkSeat.getData().playerid == cv.dataHandler.getUserData().u32Uid) {
                                cv.GameDataManager.tRoomData.m_isAllInMode = false;
                                this.game.menu_Panel.getComponent(menu).updateMenu();
                            }
                        }
                    }
                }
            }
        }
        this.m_u32DelayTimeCount = 0;

        if (cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount < 9 && cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee.length > cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount) {
            let fee: FeeItem = cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee[cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount];
            this.addTime_text.string = cv.StringTools.serverGoldToShowString(fee.needCoin);
        }

        // 重置"快捷下注"相关状态
        this.quickBetUsedPreflopOnce = false;
        this._setQuickBetModeStatus(true);
    }

    public OnStartGame() {
        if (!cv.GameDataManager.tRoomData.hasRecvStartGame) {
            return;
        }

        this.hideAllWinRate();
        this.setWaitAction(false);
        this.waitForStart_img.active = false;
        this.mangZhu_text.node.active = true;
        if (this._bReciviceCriticsStart) {
            this._bCriticsimRound = true;
        } else {
            this._bCriticsimRound = false;
        }
        this._bReciviceCriticsStart = false;
        this._isShowGuess = false;
        this.game.guess_hand_card.active = false;
        this.guess_hand_card_button.node.active = false;
        this._guess_settle_amount = -1;
    }

    public OnDestroyRoom(puf: any) {
        cv.TP.showMsg(cv.config.getStringData("UIGameSceneTips4"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.OnEndTime.bind(this, puf), null, false, "");
        cv.TP.setTag("UIGameSceneTips4");
    }
    private OnEndTime(puf: any) {

        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
        this.hideAllWinRate();
        //牌局结算
        this.roomHasEnd = true;
        //this.pokerInfoNode = cv.action.addChildToScene(this, this.PokerInfo_fab, ["backGroundBg", "back_button"]);
        //this.pokerInfoNode.getComponent(PokerInfo).initData(1);
        //cv.httpHandler.requestRoomRecord(0, this.roomRecordListCount, this.initFight.bind(this));
        //g_pkHttp->GetRoomRecord(g_pkDataManager->getUser()->u32Uid, g_pkDataManager->getGameRecords()->curRoomuuid);

        if (this.pokerInfoNode_new) {
            //this.pokerInfoNode_new.active = true;
            this.pokerInfoNode_new.getComponent(PokerInfoNew).setShowAudit(this._isShowAudit);
        }

        if (this.game) {

            // 隐藏牌谱
            if (this.game.allreview_panel) {
                this.game.allreview_panel.getComponent(GameReview).autoHide(false);
            }

            // 隐藏邮件
            cv.MessageCenter.send("close_mail_layer");

            if (this._roleInfo_panel) {
                this._roleInfo_panel.active = false;
                this._roleInfo_panel.getComponent(StarPrivateInfo).setShadeHide();
            }

            if (this.game.currentTime_panel) {
                this.game.currentTime_panel.active = false;
            }
            //所有的把抽牌局不再显示牌局结算
            let isShort = (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
            let is_mirco = cv.GameDataManager.tRoomData.pkRoomParam.is_mirco;
            if (this.isZoom()
                || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet
                || cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand
                || isShort
                || is_mirco) {
                this.gotoHallScene();
                return;
            }
            cv.httpHandler.requestRoomRecord(puf.room_uuid_js);
            cv.MessageCenter.send("show_Audit", false);
        }
    }

    initPokerInfo() {
        // this.pokerInfoNode = cv.action.addChildToScene(this, this.PokerInfo_fab, ["backGroundBg", "back_button"], cv.Enum.ZORDER_TYPE.ZORDER_TT, true);
        // this.pokerInfoNode.getComponent(PokerInfo).backBtnClickFunc = function () { this.gotoHallScene() }.bind(this);

        this.pokerInfoNode_new = cv.action.addChildToScene(this, this.PokerInfo_fab_new, [], cv.Enum.ZORDER_TYPE.ZORDER_TT, true);
        this.pokerInfoNode_new.getComponent(PokerInfoNew).backBtnClickFunc = function () { this.gotoHallScene() }.bind(this);
    }

    public gotoHallScene() {
        this.hideAllWinRate();
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
        cv.roomManager.setCurrentGameID(cv.Enum.GameId.GameId_Dummy);
    }

    public OnStandUpSucc(playerId: number) {
        this.hideAllWinRate();
        let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(playerId);
        this.Standup(pkPlayer);
        if (pkPlayer) {
            cv.GameDataManager.tRoomData.RemoveTablePlayer(pkPlayer.playerid);
        }
        if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
            this.sliderBg.active = false;
        }
        this.game.menu_Panel.getComponent(menu).updateMenu();
        if (this.isGameStarSeat()) {
            if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                let seatview: number = this.getSeatBySeverId(0).getSeatViewId();
                this.turnSeat(seatview, false);
                if (pkPlayer.identity == 1) {
                    AgoraSdk.enableLocalVideo(false);
                    AgoraSdk.enableLocalAudio(false);
                }
            } else {
                this.setSeatViewStyle();
            }

            // 有玩家站起时, 检测礼物模块座位逻辑
            this.initGiftStarInfo(pkPlayer, false);
        }
    }

    public Standup(pkPlayer: PlayerInfo) {
        if (pkPlayer) {
            let u32SeatId = pkPlayer.seatid;
            let u32Uid = pkPlayer.playerid;

            if (u32Uid == cv.dataHandler.getUserData().u32Uid) {
                this.game.buyin_panel.active = false;
                cv.GameDataManager.tRoomData.i32SelfSeat = -1;
                this.face_button.active = this.isShowFaceBtn();
                if (this.isGameStarSeat()) {
                    this.game.face_Panel.getComponent(FaceBarrage).hideUi();
                } else {
                    this.game.face_Panel.getComponent(FaceView).hideUi();
                }
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);

                for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                    this.m_pkSelfCard[i].node.active = false;
                }

                this.m_u32DelayTimeCount = 0;
                this.setRecordEnabled(false);
                if (this.isZoom()) {
                    this.setWaitAction(false);
                }
            }
            let pkSeat: Seat = this.getSeatBySeverId(u32SeatId);

            if (pkSeat.getSeatViewId() == 0) {
                this.backGame_button.active = false;
                this.record_button.active = this.isShowRecord();
                cc.find("Label", this.gaopai).getComponent(cc.Label).string = "";
                this.gaopai.active = false;
            }

            if (pkSeat) {
                pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_empty);
                if (pkSeat.getSeatViewId() == 0) {
                    this._isSeat = false;
                }
                if (u32Uid == cv.dataHandler.getUserData().u32Uid) {
                    if (this.isZoom()) {
                        this.updataSeatAction(false);
                    }
                }
            }
            else {
                cv.TT.showMsg(cv.StringTools.formatC("can't find Seat(%d)", u32SeatId), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }
    public turnEndStandup() {
        if (cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
            this.DrunAction(cv.GameDataManager.tGameData.i32DealerSId, 0);
        }
        if (this.isGameStarSeat()) {
            this.setSeatViewStyle();
        }

        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            this.seatList[i].OnUpdate_remarks();
            this.seatList[i].setSeatViewId(this.seatList[i].getSeatViewId(), this.roomPlayerNumber);
        }

        // 旋转座位动画完毕, 更新礼物模块"小icon入口"状态
        this.updateGiftSmallIconStatus();
    }

    public OnNeedBuyIn() {
        this.game.buyin_panel.active = true;
        this.game.buyin_panel.getComponent(Buyin).UpdateBuyinInfo();
        this.hideBombInfoPrompt();
    }

    /**
     * 开始带入的消息, 用于游戏场景的数据采集
     * @param amount 
     */
    private _onMsgBuyInStart(): void {
        let properties: object = { buyInSize: cv.GameDataManager.tRoomData.curBuyInAmount };
        this.trackInfo(cv.Enum.segmentEvent.PokerTableBoughtIn, properties);
    }

    /**
     * 带入失败服务器回调消息, 用于游戏场景的数据采集
     * @param param 
     */
    private _onMsgBuyInFailedByServer(param: game_pb.ResponseBuyin): void {
        let reson: string = `BuyIn Failed: server error code = ${param.error}`;
        let properties: object = { buyInSize: cv.GameDataManager.tRoomData.curBuyInAmount, failureReason: reson };
        this.trackInfo(cv.Enum.segmentEvent.PlayerBuyInFailed, properties);
    }

    /**
     * 带入失败本地回调消息, 用于游戏场景的数据采集
     * @param param 
     */
    private _onMsgBuyInFailedByLocal(param: string): void {
        let reson: string = `BuyIn Failed: local error code = ${param}`;
        let properties: object = { buyInSize: cv.GameDataManager.tRoomData.curBuyInAmount, failureReason: reson };
        this.trackInfo(cv.Enum.segmentEvent.PlayerBuyInFailed, properties);
    }

    /**
     * 退出房间消息, 用于游戏场景的数据采集
     */
    private _onMsgBtnClickExitRoom(): void {
        let properties: object = { stackSize: cv.GameDataManager.tRoomData.u32Stake };
        this.trackInfo(cv.Enum.segmentEvent.PokerRoomLeft, properties);
    }

    /**
     * 离开座位消息, 用于游戏场景的数据采集
     */
    private _onMsgBtnClickLeaveSeat(): void {
        let properties: object = { stackSize: cv.GameDataManager.tRoomData.u32Stake };
        this.trackInfo(cv.Enum.segmentEvent.PokerTableSatOut, properties);
    }

    /**
     * 坐下失败消息, 用于游戏场景的数据采集
     * @param param 
     */
    private _onMsgRespSitDownFailed(param: game_pb.ResponseSitDown): void {
        let properties: object = { denyReason: `SitDown Failed: server error code = ${param.error}` };
        this.trackInfo(cv.Enum.segmentEvent.PokerTableSittingDenied, properties);
    }

    public onCloseHitback() {
        this.hitback_left.active = false;
        this.hitback_upper_left.active = false;
        this.hitback_upper_right.active = false;
    }

    public initHitback() {
        this.hitback_left = cc.instantiate(this.hitback_faceitem_prefab);
        this.node.addChild(this.hitback_left, cv.Enum.ZORDER_TYPE.ZORDER_6);
        this.hitback_left.active = false;

        this.hitback_upper_left = cc.instantiate(this.hitback_faceitem_prefab);
        this.node.addChild(this.hitback_upper_left, cv.Enum.ZORDER_TYPE.ZORDER_6);
        this.hitback_upper_left.active = false;

        this.hitback_upper_right = cc.instantiate(this.hitback_faceitem_prefab);
        this.node.addChild(this.hitback_upper_right, cv.Enum.ZORDER_TYPE.ZORDER_6);
        this.hitback_upper_right.active = false;
    }

    public initHitbackPos() {
        let worldpos = this.seatList[0].getLeftHitPos();
        let localpos = this.node.convertToNodeSpaceAR(worldpos);
        this.hitback_left.setPosition(localpos);

        let upperleftpos = this.seatList[0].getUpperLeftHitPos();
        localpos = this.node.convertToNodeSpaceAR(upperleftpos);
        this.hitback_upper_left.setPosition(localpos);

        let upperrightpos = this.seatList[0].getUpperRightHitPos();
        localpos = this.node.convertToNodeSpaceAR(upperrightpos);
        this.hitback_upper_right.setPosition(localpos);
    }

    /**
     * 礼物模块-初始化入口
     */
    public initGift(): void {
        if (this.game.giftEntrance) {
            let wpos: cc.Vec2 = cc.v2(this.addTime_button.position);
            this.addTime_button.parent.convertToWorldSpaceAR(wpos, wpos);
            this.game.giftEntrance.node.parent.convertToNodeSpaceAR(wpos, wpos);
            this.game.giftEntrance.node.setPosition(wpos);

            // 设置小面板坐标
            let commentator: cc.Node = cc.find("commentator", this.node);
            commentator.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
            wpos.x = 0;
            wpos.y += commentator.height * (1 - commentator.anchorY) + 5;
            this.game.giftEntrance.showSmallBox(wpos);

            // 设置动画坐标
            this.currentTime_button.convertToWorldSpaceAR(cc.Vec2.ZERO, wpos);
            cv.GameDataManager.tGiftData.setOnlookersPos(wpos);
            cv.GameDataManager.tGiftData.setSeatListRef(this.seatList);

            // 初始化自己的信息(若自己是明星也添加到数据结构里)
            let self_uid: number = cv.dataHandler.getUserData().u32Uid;
            let starData: StarData[] = cv.GameDataManager.tRoomData.pkRoomParam.starData;
            for (let i = 0; i < starData.length; ++i) {
                if (self_uid === starData[i].uid) {
                    let t: GiftStarInfo = cv.GameDataManager.tGiftData.getStarInfoByID(self_uid);
                    if (!t) {
                        t = new GiftStarInfo();
                        t.uid = starData[i].uid;
                        t.name = starData[i].nickName;
                        t.headurl = starData[i].thumb;
                        t.plat = 0;
                        cv.GameDataManager.tGiftData.addStarsInfo(t);
                    }
                    break;
                }
            }
        }
    }

    /**
     * 礼物模块-添加明星座位
     * @param player 
     * @param isDownOrUp 是否坐下或站起(true:坐下, false:站起)
     */
    public initGiftStarInfo(player: PlayerInfo, isDownOrUp: boolean): void {
        // 明星桌且身份是明星
        if (this.isGameStarSeat() && player && player.identity === 1) {
            if (isDownOrUp) {
                let t: GiftStarInfo = new GiftStarInfo();
                t.uid = player.playerid;
                t.name = player.name;
                t.headurl = player.headurl;
                t.plat = player.plat;
                cv.GameDataManager.tGiftData.addStarsInfo(t);
            }
            else {
                cv.GameDataManager.tGiftData.removeStarsInfo(player.playerid);
            }

            // 有明星坐下或者站起时: 更新礼物入口显示状态
            this.setGiftActive(!this.addTime_button.active);
        }

        // 更新座位上礼物模块"小icon入口"状态
        this.updateGiftSmallIconStatus();
    }

    /**
     * 礼物模块-设置入口显示状态(有明星入座且不是轮到自己操作)
     * @param visible 
     */
    public setGiftActive(visible: boolean): void {
        if (!this.game.giftEntrance) return;

        let except_uid: number = 0;
        let starsCount: number = cv.GameDataManager.tGiftData.getStarInfosExceptByID(except_uid).length;
        visible &&= starsCount > 0;

        if (visible) {
            this.game.giftEntrance.autoShow();
        }
        else {
            this.game.giftEntrance.autoHide();
        }

        // 更新座位上礼物模块"小icon入口"状态
        this.updateGiftSmallIconStatus();
    }

    /**
     * 礼物模块-更新明星座位上的礼物小图标入口状态(层级关系, 模块无法剥离, 父节点为座位节点)
     * @returns 
     */
    public updateGiftSmallIconStatus(): void {
        if (!this.isGameStarSeat()) return;
        if (!this.game.giftEntrance) return;
        let self_uid: number = cv.dataHandler.getUserData().u32Uid;

        for (let i = 0; i < this.seatList.length; ++i) {
            let seat: Seat = this.seatList[i];
            if (!(seat instanceof SeatStar)) continue;

            let pos: cc.Vec2 = cc.Vec2.ZERO;
            let playerInfo: PlayerInfo = seat.getData();
            if (playerInfo && playerInfo.identity === 1) {
                // 明星座位大视图(显示:右上或右中)
                if (seat.getViewStyle() === 2) {
                    pos.x = (1 - seat.starVideo.anchorX) * seat.starVideo.width + 18;
                    pos.x = pos.x + (1 - seat.giftIcon.anchorX) * seat.giftIcon.width;

                    if (cv.native.isFullScreen()) {
                        pos.y = (1 - seat.starVideo.anchorY) * seat.starVideo.height;
                        pos.y = pos.y - seat.giftIcon.anchorY * seat.giftIcon.height;
                        pos.y -= 20;
                    }
                    else {
                        pos.y = (0.5 - seat.starVideo.anchorY) * seat.starVideo.height;
                        pos.y = pos.y + (seat.giftIcon.anchorY - 0.5) * seat.giftIcon.height;
                    }

                    seat.starVideo.convertToWorldSpaceAR(pos, pos);
                }
                // 明星座位小视图(显示:左下或右下)
                else {
                    let roleHeadNode: cc.Node = seat.roleHeadNode;
                    if (playerInfo.playerid === self_uid && seat.roleHeadNode_self) {
                        roleHeadNode = seat.roleHeadNode_self;
                    }

                    // 找到头像节点, 开始计算小图标位置
                    switch (seat.direction) {
                        case cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN:         // 左边中和中下
                        case cv.Enum.SeatDriction.DRICTION_LEFT_UP:                 // 左边中上
                        case cv.Enum.SeatDriction.DRICTION_TOP_LEFT:                // 顶部左边(9人桌是顶部左, 其余是顶部)
                        case cv.Enum.SeatDriction.DRICTION_BOTTOM: {                // 最下面
                            pos.x = (1 - roleHeadNode.anchorX) * roleHeadNode.width;
                            pos.x = pos.x - (1 - seat.giftIcon.anchorX) * seat.giftIcon.width;
                        } break;

                        case cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN:        // 右边中和中下
                        case cv.Enum.SeatDriction.DRICTION_RIGHT_UP:                // 右边中上
                        case cv.Enum.SeatDriction.DRICTION_TOP_RIGHT: {             // 顶部右边
                            pos.x = (0 - roleHeadNode.anchorX) * roleHeadNode.width;
                            pos.x = pos.x + (1 - seat.giftIcon.anchorX) * seat.giftIcon.width;
                        } break;

                        default: break;
                    }

                    pos.y = (0 - roleHeadNode.anchorY) * roleHeadNode.height;
                    pos.y = pos.y + seat.giftIcon.anchorY * seat.giftIcon.height;
                    roleHeadNode.convertToWorldSpaceAR(pos, pos);
                }

                // 显示礼物模座位入口图标
                seat.giftIcon.parent.convertToNodeSpaceAR(pos, pos);
                seat.giftIcon.setPosition(pos);
                seat.giftIcon.active = true;

                // 如果是自己且是明星, 则座位头像上的礼物图标显隐状态和总入口显隐状态保持一致
                if (playerInfo.playerid === self_uid) {
                    seat.giftIcon.active = this.game.giftEntrance.node.active;
                }
            }
            else {
                seat.giftIcon.active = false;
            }
        }
    }

    /**
     * 初始化5张公共牌,根据牌的尺寸计算牌间距和位置
     */
    public initPublicCard() {
        let cardWid = 0;
        for (let i = 0; i < 5; ++i) {
            this.m_pkPublicCard[i] = cc.instantiate(this.game.card).getComponent('Card');
            this.publicCard_panel.addChild(this.m_pkPublicCard[i].node);
            cardWid = this.m_pkPublicCard[i].node.getContentSize().width;
        }
        this.publicCard_hgp = cardWid + 8;

        if (!cv.config.IS_FULLSCREEN) {
            this.publicPos.y = this.publicPos.y + 30;
        }

        this.publicPos.x = 540 - this.publicCard_hgp * 2;
        for (let i = 0; i < 5; ++i) {
            this.m_pkPublicCard[i].node.setPosition(cc.v2(this.publicPos.x + i * this.publicCard_hgp, this.publicPos.y));
            let temppos = cc.Vec2.ZERO;
            this.mainpool.convertToWorldSpaceAR(cc.v2(0, 0), temppos);
            this.m_pkPublicCard[i].setDealPos(temppos);
            this.m_pkPublicCard[i].node.active = false;
        }
    }

    public clickSelfCardBack(evt) {
        if (this.isZoom() || cv.GameDataManager.tRoomData.pkRoomParam.showAllHole) return;

        let index = parseInt(evt.currentTarget.name);
        if (index < 0 || index >= this.m_pkSelfCard.length) return;

        this.m_pkSelfCard[index].setEye(!this.m_pkSelfCard[index].isEye());

        // 2张手牌的游戏走原有逻辑
        if (this.m_pkSelfCard.length <= 2) {
            if (this.m_pkSelfCard[0].isEye() && this.m_pkSelfCard[1].isEye()) {
                cv.gameNet.RequestShowCard(cv.GameDataManager.tRoomData.u32RoomId, 2, true);
            }
            else if (this.m_pkSelfCard[0].isEye() && !this.m_pkSelfCard[1].isEye()) {
                cv.gameNet.RequestShowCard(cv.GameDataManager.tRoomData.u32RoomId, 0, true);
            }
            else if (!this.m_pkSelfCard[0].isEye() && this.m_pkSelfCard[1].isEye()) {
                cv.gameNet.RequestShowCard(cv.GameDataManager.tRoomData.u32RoomId, 1, true);
            }
            else {
                cv.gameNet.RequestShowCard(cv.GameDataManager.tRoomData.u32RoomId, 2, false);
            }
        }
        // 大于2张手牌的游戏走新增字段逻辑(若后续服务端这块做了优化兼容, 则只需保留以下逻辑即可)
        else {
            let idxs: number[] = [];
            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                if (this.m_pkSelfCard[i].isEye()) {
                    idxs.push(i);
                }
            }
            cv.gameNet.RequestShowCard(cv.GameDataManager.tRoomData.u32RoomId, idxs, idxs.length > 0);
        }
    }

    public initSelfCard() {
        let hgp: number = this.isGamePLO() ? 3 : 8;             // 两张牌之间的间距
        let scale: number = this.isGamePLO() ? 0.85 : 0.93;     // scale = ui显示尺寸/原牌尺寸
        let cardsLen: number = this.isGamePLO() ? 4 : 2;        // 手牌数量
        let cardWidth: number = 0;                              // 单张手牌宽度

        if (this.isGameStarSeat()) {
            this._selfCardPosY = this._selfCardPosY - 40;
        }
        // 初始化前清空手牌数组和节点关系
        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].node.removeFromParent(true);
            this.m_pkSelfCard[i].node.destroy();
        }
        cv.StringTools.clearArray(this.m_pkSelfCard);

        // 实例化手牌数组
        for (let i = 0; i < cardsLen; ++i) {
            let card: Card = cc.instantiate(this.game.card).getComponent('Card');
            card.node.active = false;
            card.node.on(cc.Node.EventType.TOUCH_END, this.clickSelfCardBack.bind(this));
            card.node.name = i.toString();
            card.node.scale = scale;

            this.card_panel.addChild(card.node);
            this.m_pkSelfCard.push(card);
            cardWidth = card.node.width;
        }

        // 计算手牌初始位置
        let tempos: cc.Vec2 = cc.Vec2.ZERO;
        this.mainpool.convertToWorldSpaceAR(cc.v2(0, 0), tempos);
        let start_x: number = (cv.config.WIDTH - (cardWidth * scale * cardsLen + hgp * (cardsLen - 1))) * 0.5 + 0.5 * cardWidth * scale;
        let start_y: number = this._selfCardPosY * cv.config.HEIGHT / cv.config.DESIGN_HEIGHT;
        for (let i = 0; i < cardsLen; ++i) {
            this.m_pkSelfCard[i].node.x = start_x + i * (cardWidth * scale + hgp);
            this.m_pkSelfCard[i].node.y = start_y;
            this.m_pkSelfCard[i].setDealPos(tempos);
        }
    }

    /**
     * 更新牌桌背景
     */
    public updateTablebg() {
        let bgSprite: cc.Sprite = this.game.game_bg.getComponent(cc.Sprite);
        let index = cv.tools.GetTableBack(this.isGameStarSeat());
        let bgName = index.toString();
        this.game.gameIcon_img.active = true;
        this.game.gameIcon_img_star.active = false;

        let callBack: (frame: cc.SpriteFrame) => void = (frame: cc.SpriteFrame): void => {
            let width: number = bgSprite.node.width;
            let height: number = bgSprite.node.height;

            if (cv.config.IS_WIDESCREEN) {
                bgSprite.node.scaleX = cc.winSize.width / width;
                bgSprite.node.scaleY = cc.winSize.height / height;
            }
            else {
                let scale: number = 1;
                if (width / height > cc.winSize.width / cc.winSize.height) {
                    scale = cc.winSize.height / height;
                }
                else {
                    scale = cc.winSize.width / width;
                }
                bgSprite.node.setScale(scale);
            }

            // 等比缩放
            // let sw: number = cc.winSize.width / width;
            // let sh: number = cc.winSize.height / height;
            // let scale: number = Math.min(sw, sh);
            // bgSprite.node.setScale(scale);
        }

        if (this.isGameStarSeat()) {
            //如果当前是明星桌，明星桌在最前面插入了一张新的默认背景，为了保持与普通桌索引一致，此图片index为-1
            if (index == -1) {
                this.game.gameIcon_img.active = false;
                this.game.gameIcon_img_star.active = true;
                bgName = "star";
            }
            if (cv.config.IS_WIDESCREEN) {
                cv.resMgr.setSpriteFrame(bgSprite.node, 'zh_CN/game/dzpoker/starBg/bg_' + bgName + "_ipad", callBack);
            }
            else {
                cv.resMgr.setSpriteFrame(bgSprite.node, 'zh_CN/game/dzpoker/starBg/bg_' + bgName, callBack);
            }

        }
        else {
            if (cv.config.IS_WIDESCREEN && index < 6) {
                cv.resMgr.setSpriteFrame(bgSprite.node, 'zh_CN/game/dzpoker/gameBgIpad/bg_' + bgName, callBack);
            }
            else {
                cv.resMgr.setSpriteFrame(bgSprite.node, 'zh_CN/game/dzpoker/gameBg/bg_' + bgName, callBack);
            }
        }
    }

    /**
     * 初始化"保险模块"
     */
    public initInsurance() {
        if (this.game && this.game.insurance_panel) {
            let insuranceEntrance: InsuranceEntrance = this.game.insurance_panel.getComponent(InsuranceEntrance);
            insuranceEntrance.init();
        }
    }

    /**
     *  初始化"保险模块"完成(剔除多余实例)
     */
    public initInsuranceFinish() {
        if (this.game && this.game.insurance_panel) {
            let insuranceEntrance: InsuranceEntrance = this.game.insurance_panel.getComponent(InsuranceEntrance);
            insuranceEntrance.initFinish(cv.GameDataManager.tRoomData.pkRoomParam.insuranceMode);
        }
    }

    public setGameScene(game: GameScene) {
        this.game = game;
    }

    public onbtnMenuClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.game.menu_Panel.active = true;
        this.game.menu_Panel.getComponent(menu).updateMenu();
        this.hideBombInfoPrompt();
    }

    public onbtnAddTimeClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_AddActionTime, 0);
    }

    public onbtnAllreviewClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.game.allreview_panel) {
            this.game.allreview_panel.getComponent(GameReview).autoShow(cv.Enum.GameReviewDataType.EDST_GAMEROOM);
            this.hideBombInfoPrompt();
        }

    }

    public onbtnFaceClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        /*if (!this.game.face_Panel) {
            this.game.face_Panel = cc.instantiate(this.game.face_Panel_prefab);
            this.game.node.addChild(this.game.face_Panel);
        } else {
            this.game.face_Panel.getComponent(FaceView).updateEmotionNeedCoin();
        }

        this.game.face_Panel.active = true;
        this.hideBombInfoPrompt();*/
    }

    public setRecordEnabled(isEnabled: boolean) {
        if (!this.record_button.active) return;
        isEnabled = this.checkAllIn() ? false : isEnabled;
        // this.record_button.getComponent(cc.Button).interactable = isEnabled;
        this.record_button.active = isEnabled;
        if (isEnabled) {
            // cv.resMgr.setSpriteFrame(this.record_button_img, "zh_CN/game/dzpoker/ui/submenu/submenu＿mic_on");
            // this.record_button_img.opacity = 255;
        } else {
            // this.record_button_img.opacity = 150;
            this.cancelRecord();
            // cv.resMgr.setSpriteFrame(this.record_button_img, "zh_CN/game/dzpoker/ui/submenu/submenu＿mic_off");
        }
    }

    public setFaceBtnEnabled(isEnabled: boolean) {
        if (!this.face_button.active) return;
        isEnabled = this.checkAllIn() ? false : isEnabled;
        this.face_button.getComponent(cc.Button).interactable = isEnabled;
        let faceimage = this.face_button.getChildByName("face_icon");
        if (isEnabled) {
            faceimage.opacity = 255;
        } else {
            faceimage.opacity = 125;
        }
    }

    public checkAllIn(): boolean {
        return this._isAllin;
    }

    //录音成功
    public recordSuccess() {
        this.game.recordComplete_img.node.active = true;
        this.game.recording_img.node.active = false;
        this.unschedule(this.updateRecord);

        let recorBack = cc.callFunc(() => {
            this.game.voice_panel.active = false;
        }, this);

        this.game.voice_panel.runAction(recorBack);
    }


    public recorSuccessCallback() {
        this.game.voice_panel.active = false;
    }

    public updateRecord(num: number) {
        if (this._recordTime == 0) {
            if (cc.sys.os == cc.sys.OS_IOS) {

            } else if (cc.sys.os == cc.sys.OS_ANDROID) {

            }
            this.recordSuccess();
            return;
        }

        this._recordTime -= 1;
        let cdTime_text: cc.Label = this.game.recording_img.node.getChildByName("cdTime_text").getComponent(cc.Label);
        cdTime_text.string = "" + this._recordTime;

    }

    /**
     * record
     */
    public record() {
        cv.GameDataManager.tRoomData.m_bIsCancelVoice = false;

        if (cc.sys.isBrowser) {

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                //私语平台录音
                let cmdStr = "{\"cmd\": \"1007\", \"op\":0}";
                cv.native.SYwebjsToClient(cmdStr);
                this._bTouchStop = false;
            }
        } else {
            if (cc.sys.os == cc.sys.OS_IOS) {
                cv.native.DoStartRecord();
                this.startShowRecord();
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!cv.native.DoStartRecord()) {
                    this._androidRecord = false;
                    return;
                }
                this._androidRecord = true;
                this.startShowRecord();
            }
        }
    }
    //语音按钮
    public onbtnRecordClick(event) {
        // if (this.record_button.getComponent(cc.Button).interactable == false) {  //按钮置灰禁用的时候
        //     console.log("onbtnRecordClick  111111" );
        //     return;
        // }
        if (event.type == cc.Node.EventType.TOUCH_START) {
            let callBack = cc.callFunc(this.record.bind(this), this);
            let pkDelay = cc.delayTime(0.1);
            this.record_button.runAction(cc.sequence(pkDelay, callBack));
        } else if (event.type == cc.Node.EventType.TOUCH_END) {
            if (this.record_button.getNumberOfRunningActions() > 0) {
                this.record_button.stopAllActions();
                return;
            }
            cv.GameDataManager.tRoomData.m_bIsCancelVoice = false;
            if (cc.sys.isBrowser) {
                if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                    //私语平台录音
                    this._bTouchStop = true;
                    let cmdStr = "{\"cmd\": \"1007\", \"op\":1}";
                    cv.native.SYwebjsToClient(cmdStr);
                }
            } else {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    cv.native.DoStopRecord();
                    this.recordSuccess();
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    cv.native.DoStopRecord();
                    if (!this._androidRecord) {
                        return;
                    }
                    this.recordSuccess();
                }
            }
        } else if (event.type == cc.Node.EventType.TOUCH_CANCEL) {
            if (this.record_button.getNumberOfRunningActions() > 0) {
                this.record_button.stopAllActions();
                return;
            }
            this.cancelRecord();
        }
    }

    public cancelRecord() {
        if (cc.sys.os == cc.sys.OS_ANDROID && !cc.sys.isBrowser) {
            if (!this._androidRecord) {
                return;
            }
        }
        this.game.voice_panel.active = false;
        this.unschedule(this.updateRecord);
        cv.GameDataManager.tRoomData.m_bIsCancelVoice = true;

        if (cc.sys.isBrowser) {
            //私语平台录音
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                this._bTouchStop = true;
                let cmdStr = "{\"cmd\": \"1007\", \"op\":1}";
                cv.native.SYwebjsToClient(cmdStr);
            }
        } else {

            if (cc.sys.os == cc.sys.OS_IOS) {
                cv.native.DoStopRecord();
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cv.native.DoStopRecord();
            }
        }
    }

    public startShowRecord() {
        this.game.voice_panel.stopAllActions();
        this.game.voice_panel.active = true;
        this.game.recordComplete_img.node.active = false;
        this.game.recording_img.node.active = true;
        this._recordTime = 10;
        let cdTime_text: cc.Label = this.game.recording_img.node.getChildByName("cdTime_text").getComponent(cc.Label);
        cdTime_text.string = "" + this._recordTime;
        this.schedule(this.updateRecord, 1.0);
    }

    public onbtnBackGameClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        cv.gameNet.RequestBackPosition(cv.GameDataManager.tRoomData.u32RoomId);
    }

    public onbtnStarGameClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        cv.gameNet.RequestStartGame(cv.GameDataManager.tRoomData.u32RoomId);
    }

    public onbtnForeShowCardClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        if (cv.GameDataManager.tRoomData.pkRoomParam.force_showcard) {
            cv.gameNet.RequestForceShowCard(cv.GameDataManager.tRoomData.u32RoomId);
        }
    }

    public onbtnDealClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.m_pkPublicCard[4].node.active) {
            cv.gameNet.RequestSendCardFun(cv.GameDataManager.tRoomData.u32RoomId);
        }
    }

    public onbtnCurrentClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        cv.gameNet.RequestSituation(cv.roomManager.getCurrentRoomID());
        this.game.currentTime_panel.active = true;
        this.hideBombInfoPrompt();
    }

    public showRoleInfo(serverId: number) {
        this.clickSeatServerId = serverId;
        this._roleInfo_panel.getComponent(StarPrivateInfo).showRootNode();
        this._roleInfo_panel.active = (true);
        this._roleInfo_panel.getComponent(StarPrivateInfo).recetRoleInfo(null);
        this._roleInfo_panel.getComponent(StarPrivateInfo).updateView(this.getSeatBySeverId(serverId).getSeverId());
        this._roleInfo_panel.getComponent(StarPrivateInfo).setForbidChat(this.checkAllIn());
    }

    showObRoleInfo() {
        if (cv.GameDataManager.tRoomData.obPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
            //表示是自己
            this._roleInfo_panel.getComponent(StarPrivateInfo).showRootNode();
            this._roleInfo_panel.active = (true);
            this._roleInfo_panel.getComponent(StarPrivateInfo).recetRoleInfo(null);
            this._roleInfo_panel.getComponent(StarPrivateInfo).lookonSelf(cv.GameDataManager.tRoomData.obPlayer.data);
            this._roleInfo_panel.getComponent(StarPrivateInfo).setForbidChat(this.checkAllIn());
            return;
        }
        this._roleInfo_panel.getComponent(StarPrivateInfo).showRootNode();
        this._roleInfo_panel.active = (true);
        this._roleInfo_panel.getComponent(StarPrivateInfo).recetRoleInfo(null);
        this._roleInfo_panel.getComponent(StarPrivateInfo).showObView();
        this._roleInfo_panel.getComponent(StarPrivateInfo).setForbidChat(this.checkAllIn());
    }

    effectHitCall(msg: any) {
        let effectId = msg.index;
        let beginSeatId = 0;
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            beginSeatId = this.getSeatBySeatViewId(0).getSeverId();
        }
        else {
            beginSeatId = -1;
        }
        let endSeatId = this.getSeatBySeverId(this.hitbackSeatServerId).getSeverId();

        let kValue = "#";
        kValue += cv.StringTools.formatC("%d", beginSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", endSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", effectId);
        kValue += "#";
        kValue += cv.dataHandler.getUserData().nick_name;

        cv.gameNet.RequestInteractiveExpression(cv.GameDataManager.tRoomData.u32RoomId, kValue, msg.type);
        cv.native.AnalysisCountEvent(cv.Enum.native_cfg.EVENT_COUNT_MEMOJI_TYPE, cv.StringTools.formatC("%d", effectId));
    }

    effectCall(index: number) {
        let effectId = index;
        let beginSeatId = 0;
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            beginSeatId = this.getSeatBySeatViewId(0).getSeverId();
        }
        else {
            beginSeatId = -1;
        }
        let endSeatId = this.getSeatBySeverId(this.clickSeatServerId).getSeverId();

        let kValue = "#";
        kValue += cv.StringTools.formatC("%d", beginSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", endSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", effectId);
        kValue += "#";
        kValue += cv.dataHandler.getUserData().nick_name;

        // if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
        //     this.showEffect(beginSeatId, endSeatId, effectId, cv.dataHandler.getUserData().nick_name);
        // }

        cv.gameNet.RequestInteractiveExpression(cv.GameDataManager.tRoomData.u32RoomId, kValue);
        cv.native.AnalysisCountEvent(cv.Enum.native_cfg.EVENT_COUNT_MEMOJI_TYPE, cv.StringTools.formatC("%d", effectId));
    }

    getAniNode(): cc.Node {
        for (let i = 0; i < this._headAni_arr.length; i++) {
            if (this._headAni_arr[i].zIndex == 0) {
                let ani_node = this._headAni_arr[i];
                if (ani_node.name == "0") {
                    this._headAni_arr.splice(i, 1);
                    i--;
                    continue;
                }
                else {
                    ani_node.setScale(1);

                    ani_node.active = false;
                    ani_node.rotation = 0;
                    ani_node.zIndex = 120;
                    return ani_node;
                }
            }
        }
        let ani_node = cc.instantiate(this.headAni);
        ani_node.setScale(1);
        cc.director.getScene().addChild(ani_node, 120);
        this._headAni_arr.push(ani_node);
        //ani_node.zIndex = this.getTopZorder();
        ani_node.active = false;
        return ani_node;
    }

    getCalmDownNode(): cc.Node {
        for (let i = 0; i < this.calmDown_arr.length; i++) {
            if (this.calmDown_arr[i].zIndex == 0) {
                let ani_node = this.calmDown_arr[i];
                ani_node.setScale(1);

                ani_node.active = false;
                ani_node.rotation = 0;
                ani_node.zIndex = 120;
                return ani_node;
            }
        }
        let ani_node = cc.instantiate(this.calmDown_prefab);
        ani_node.setScale(1);
        cc.director.getScene().addChild(ani_node, 120);
        this.calmDown_arr.push(ani_node);
        //ani_node.zIndex = this.getTopZorder();
        ani_node.active = false;
        return ani_node;
    }

    getExpressNode(arr: Array<cc.Node>, prefab: cc.Prefab): cc.Node {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].zIndex == 0) {
                let ani_node = arr[i];
                ani_node.setScale(1);

                ani_node.active = false;
                ani_node.angle = 0;
                ani_node.zIndex = 120;
                return ani_node;
            }
        }
        let ani_node = cc.instantiate(prefab);
        ani_node.setScale(1);
        cc.director.getScene().addChild(ani_node, 120);
        arr.push(ani_node);
        //ani_node.zIndex = this.getTopZorder();
        ani_node.active = false;
        return ani_node;
    }

    getTopZorder(): number {
        let num = 0;
        for (let i = 0; i < this._headAni_arr.length; i++) {
            let z = this._headAni_arr[i].zIndex;
            if (z > num) {
                z = num;
            }
        }
        for (let i = 0; i < this.calmDown_arr.length; i++) {
            let z = this.calmDown_arr[i].zIndex;
            if (z > num) {
                z = num;
            }
        }
        return num + 1 == 0 ? 1 : num + 1;
    }

    displayEmoji(type: number): void {
        if (!cv.GameDataManager.tGameData.m_bIsOnSelfAction) {
            this.hitback_left.active = false;
            this.hitback_upper_left.active = true;
            this.hitback_upper_right.active = true;
        }

        if (cv.GameDataManager.tRoomData.isSelfFold) {
            this.hitback_left.active = true;
            this.hitback_upper_left.active = false;
            this.hitback_upper_right.active = false;
        }

        if (this.hitback_left.active == true || this.hitback_upper_left.active == true) {
            if (type == 0) {
                this.hitbackOn = false;
                this.schedule(this.hitback, 60);
            }
            else if (type == 1) {
                this.greetOn = false;
                this.schedule(this.greet, 60);
            }

            let countdown = function (dt) {
                cc.log("time: " + dt);
                this.unschedule(countdown);
                //this.isOn = false;
                this.onCloseHitback();
            }
            this.unschedule(countdown);
            this.schedule(countdown, 10);

        }
    }

    isEmojiFree(msg: any) {
        let array: Array<number> = [];
        let attack: Array<number> = [0, 1, 2, 3, 4, 10, 12];
        let welcome: Array<number> = [5, 7, 8, 11, 14, 15, 17];
        if (msg.type == 0) {
            //attack
            array = attack;
        }
        else if (msg.type == 1) {
            //welcome
            array = welcome;
        }

        let array1 = cv.tools.getRandomArrayElements(array, 1);
        let array2 = cv.tools.getRandomArrayElements(array, 2);
        if (msg.is_free) {
            this.hitback_left.getComponent(HitbackFaceItem).setData(array1, 0, msg.type);
            this.hitback_upper_left.getComponent(HitbackFaceItem).setData(array2[0], 0, msg.type);
            this.hitback_upper_right.getComponent(HitbackFaceItem).setData(array2[1], 0, msg.type);
        }
        else {
            this.hitback_left.getComponent(HitbackFaceItem).setData(array1, cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee.needCoin, msg.type);
            this.hitback_upper_left.getComponent(HitbackFaceItem).setData(array2[0], cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee.needCoin, msg.type);
            this.hitback_upper_right.getComponent(HitbackFaceItem).setData(array2[1], cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee.needCoin, msg.type);
        }
    }

    onWelcome(msg: any) {
        if (this.checkAllIn()) {
            return;
        }
        let str = cv.StringTools.formatC(cv.config.getStringData("Star_welcome"), cv.tools.GetFriendLevelName(msg.intimacy), msg.nickname);
        cv.TT.showMsg(str, cv.Enum.ToastType.ToastTypeInfo);

        this.hitbackSeatServerId = msg.seatid;

        if (this.greetOn) {
            cv.gameNet.requestIsEmojiFree(game_pb.EmojiType.Welcome);
            //快捷打招呼表情
            this.displayEmoji(1);
        }
    }

    hitback() {
        this.hitbackOn = true;
    }

    greet() {
        this.greetOn = true;
    }

    //播放动画
    showEffect(beginSeatId: number, endSeatId: number, effectId: number, kName: string, type: number) {
        let hitArray: Array<number> = [0, 1, 2, 3, 4, 10, 12];
        if (this.hitbackOn && this.greetOn && beginSeatId != -1 && endSeatId == cv.GameDataManager.tRoomData.i32SelfSeat && type == 2 && hitArray.indexOf(effectId) > -1) {
            cv.gameNet.requestIsEmojiFree(game_pb.EmojiType.Attack);
            //表情触发间隔：60s
            this.hitbackSeatServerId = beginSeatId;
            this.displayEmoji(0);
        }

        let ani_node = null;
        if (effectId == 6) {
            ani_node = this.getCalmDownNode();
        }
        else if (effectId == 12) {
            ani_node = this.getExpressNode(this.fist_arr, this.fist_prefab);
        }
        else if (effectId == 13) {
            ani_node = this.getExpressNode(this.zhuaji_arr, this.zhuaji_prefab);
        }
        else if (effectId == 14) {
            ani_node = this.getExpressNode(this.flower_arr, this.flower_prefab);
        }
        else if (effectId == 15) {
            ani_node = this.getExpressNode(this.money_arr, this.money_prefab);
        }
        else if (effectId == 16) {
            ani_node = this.getExpressNode(this.towel_arr, this.towel_prefab);
        }
        else if (effectId == 17) {
            ani_node = this.getExpressNode(this.fan_arr, this.fan_prefab);
        }
        else {
            ani_node = this.getAniNode();
        }
        let beginPos: cc.Vec2 = cc.Vec2.ZERO;
        let endPos: cc.Vec2 = cc.Vec2.ZERO;
        let starWorldPos: cc.Vec2 = cc.Vec2.ZERO;
        if (beginSeatId == -1) {
            beginPos = this.menu_button.getPosition();
            this.node.convertToWorldSpaceAR(beginPos, starWorldPos);
            cc.director.getScene().convertToNodeSpaceAR(starWorldPos, beginPos);

            let pkSenderName = cv.resMgr.createLabel(cc.director.getScene(), kName, 24, cv.resMgr.getLocalFontByName("arial"));
            pkSenderName.setAnchorPoint(0.0, 0.5);
            pkSenderName.setPosition(cc.v2(beginPos.x - 34.0, beginPos.y + 56.0));
            pkSenderName.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_5;
            pkSenderName.runAction(cc.sequence(cc.delayTime(2.0), cc.destroySelf()));
        }
        else {
            beginPos = this.getSeatBySeverId(beginSeatId).node.getPosition();
            this.node.convertToWorldSpaceAR(beginPos, starWorldPos);
            cc.director.getScene().convertToNodeSpaceAR(starWorldPos, beginPos);
        }


        let endSeat: any = this.getSeatBySeverId(endSeatId);
        endPos = endSeat.node.getPosition();
        if (endSeat.getViewStyle() == 2) {
            endPos.x += endSeat.starVideo.x;
            endPos.y += endSeat.starVideo.y;
        }

        this.node.convertToWorldSpaceAR(endPos, starWorldPos);
        cc.director.getScene().convertToNodeSpaceAR(starWorldPos, endPos);

        let isStarGame = this.isGameStarSeat();
        if (effectId == 0)//daodan 
        {
            ani_node.active = true;
            ani_node.name = effectId.toString();
            ani_node.setScale(2.0);
            ani_node.getComponent(cc.Animation).play(cv.config.getStringData(cv.StringTools.formatC("CocosEffect%d", effectId)));
            ani_node.setPosition(beginPos);

            let kMidPoint = cc.v2((beginPos.x + endPos.x) * 0.5, (beginPos.y + endPos.y) * 0.5);
            let radian = (-120.0 + Math.random() * 240) * 3.14159 / 180.0;
            let q1x = beginPos.x + (endPos.x - beginPos.x) / 4.0;
            let q1 = cc.v2(q1x, 0 + beginPos.y + Math.cos(radian) * q1x);

            let q2x = beginPos.x + (endPos.x - beginPos.x) / 2.0;
            let q2 = cc.v2(q2x, 0 + beginPos.y + Math.cos(radian) * q2x);

            let bezier: cc.Vec2[] = [q1, q2, endPos];

            let bezierto = cc.bezierTo(2.0, bezier);
            ani_node.rotation = (Math.atan2((endPos.x - beginPos.x), (endPos.y - beginPos.y)) * 180 / 3.1415926);
            let func = function () {
                this.UpdateRocketAngle(ani_node, beginPos, endPos);
            }
            this.schedule(func, 0);
            ani_node.runAction(cc.sequence(bezierto.easing(cc.easeInOut(0.5)), cc.callFunc(this.effectPlay, this, { "sp": null, "ani_node": ani_node, "isSp": false })));
            if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/daodanfeixing");
            }
        }
        else if (effectId == 6) {
            let calmDown_ac = ani_node.getComponent(cc.Animation);
            ani_node.setPosition(beginPos);
            let sprite_Hand = cc.find("Node_HandScale/sprite_Hand", ani_node);
            sprite_Hand.setPosition(0.962, -4.802);
            sprite_Hand.setRotation(0);
            sprite_Hand.opacity = 255;
            ani_node.active = true;
            ani_node.name = effectId.toString();
            ani_node.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/calmDown");
                }
                calmDown_ac.play();
                calmDown_ac.on("finished", (event: cc.Event): void => {
                    calmDown_ac.off("finished");
                    ani_node.zIndex = 0;
                    ani_node.active = false;
                });
            }, this)));
        }
        else if (effectId == 12) {
            let effSp = cv.resMgr.createSprite(cc.director.getScene(), "zh_CN/game/dzpoker/animation/icon/fist");
            effSp.active = (true);
            effSp.zIndex = 120;
            effSp.name = effectId.toString();
            effSp.setPosition(beginPos);

            let fist_ac = ani_node.getComponent(cc.Animation);
            ani_node.setPosition(endPos);
            ani_node.active = false;

            ani_node.name = effectId.toString();
            effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/fist");
                }
                ani_node.active = true;
                fist_ac.play();
                effSp.removeFromParent(true);
                effSp.destroy();
                fist_ac.on("finished", (event: cc.Event): void => {
                    fist_ac.off("finished");
                    ani_node.zIndex = 0;
                    ani_node.active = false;
                });
            }, this)));
        }
        else if (effectId == 13) {
            //捉鸡
            let effSp = cv.resMgr.createSprite(cc.director.getScene(), "zh_CN/game/dzpoker/animation/icon/zhuaji");
            effSp.active = (true);
            effSp.zIndex = 120;
            effSp.name = effectId.toString();
            effSp.setPosition(beginPos);

            let zhuaji_ac = ani_node.getComponent(cc.Animation);
            ani_node.setPosition(endPos);
            ani_node.active = false;

            ani_node.name = effectId.toString();
            effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/zhuaji");
                }
                ani_node.active = true;
                zhuaji_ac.play();
                effSp.removeFromParent(true);
                effSp.destroy();
                zhuaji_ac.on("finished", (event: cc.Event): void => {
                    zhuaji_ac.off("finished");
                    ani_node.zIndex = 0;
                    ani_node.active = false;
                });
            }, this)));
        }
        else if (effectId == 14) {
            //鲜花
            let effSp = cv.resMgr.createSprite(cc.director.getScene(), "zh_CN/game/dzpoker/animation/icon/flower");
            effSp.active = (true);
            effSp.zIndex = 120;
            effSp.name = effectId.toString();
            effSp.setPosition(beginPos);

            let flower_ac = ani_node.getComponent(cc.Animation);
            ani_node.setPosition(endPos);
            ani_node.active = false;

            ani_node.name = effectId.toString();
            effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/flower");
                }
                ani_node.active = true;
                flower_ac.play();
                effSp.removeFromParent(true);
                effSp.destroy();
                flower_ac.on("finished", (event: cc.Event): void => {
                    flower_ac.off("finished");
                    ani_node.zIndex = 0;
                    ani_node.active = false;
                });
            }, this)));
        }
        else if (effectId == 15) {
            //钱
            let effSp = cv.resMgr.createSprite(cc.director.getScene(), "zh_CN/game/dzpoker/animation/icon/money");
            effSp.active = (true);
            effSp.zIndex = 120;
            effSp.name = effectId.toString();
            effSp.setPosition(beginPos);

            let money_ac = ani_node.getComponent(cc.Animation);
            ani_node.setPosition(endPos);
            ani_node.active = false;

            ani_node.name = effectId.toString();
            effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/money");
                }
                ani_node.active = true;
                money_ac.play();
                effSp.removeFromParent(true);
                effSp.destroy();
                money_ac.on("finished", (event: cc.Event): void => {
                    money_ac.off("finished");
                    ani_node.zIndex = 0;
                    ani_node.active = false;
                });
            }, this)));
        }
        else if (effectId == 16) {
            //擦汗
            let effSp = cv.resMgr.createSprite(cc.director.getScene(), "zh_CN/game/dzpoker/animation/icon/towel");
            effSp.active = (true);
            effSp.zIndex = 120;
            effSp.name = effectId.toString();
            effSp.setPosition(beginPos);

            ani_node.setPosition(endPos);
            ani_node.active = false;

            let towel_ac1 = ani_node.getChildByName("chahan_01").getComponent(cc.Animation);
            let towel_ac2 = ani_node.getChildByName("chahan_02").getComponent(cc.Animation);

            ani_node.setPosition(endPos);

            ani_node.name = effectId.toString();
            effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                    cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chahan");
                }
                ani_node.active = true;
                towel_ac1.play("chahan_01");
                effSp.removeFromParent(true);
                effSp.destroy();
                towel_ac1.on("finished", (event: cc.Event): void => {
                    ani_node.off("finished");
                    ani_node.zIndex = 0;
                    ani_node.active = false;
                });
            }, this)));
        }
        else if (effectId == 17) {
            //fan
            ani_node.active = true;
            ani_node.setPosition(beginPos);
            let fan_ac1 = ani_node.getChildByName("shanzi_01");
            let fan_ac2 = ani_node.getChildByName("shanzi_02");
            let fan_ac3 = ani_node.getChildByName("shanzi_03");
            fan_ac1.getComponent(cc.Animation).play("shanzi_01");
            fan_ac1.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                fan_ac1.getComponent(cc.Animation).off("finished");
                let seat = this.getSeatBySeverId(endSeatId);
                let fanpos: cc.Vec2;
                if (seat.direction <= 1 || seat.direction == 4) {
                    fanpos = new cc.Vec2(endPos.x + 30, endPos.y - 40);
                }
                else {
                    fanpos = new cc.Vec2(endPos.x - 30, endPos.y - 40);
                }

                ani_node.runAction(cc.sequence(cc.moveTo(0.3, fanpos), cc.callFunc(() => {
                    if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/fan");
                    }
                    fan_ac1.active = false;
                    if (seat.direction <= 1 || seat.direction == 4) {
                        fan_ac3.active = true;
                        fan_ac3.getComponent(cc.Animation).play("shanzi_03");
                        fan_ac3.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                            fan_ac3.getComponent(cc.Animation).off("finished");
                        });
                    }
                    else {
                        fan_ac2.active = true;
                        fan_ac2.getComponent(cc.Animation).play("shanzi_02");
                        fan_ac2.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                            fan_ac2.getComponent(cc.Animation).off("finished");
                        });
                    }
                }, this)));
            });
        }
        else {
            if (!isStarGame && cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect(cv.StringTools.formatC("zh_CN/game/dzpoker/audio/effectVoice%d", effectId < 6 ? effectId : (effectId - 1)));
            }

            let effSp = cv.resMgr.createSprite(cc.director.getScene());
            effSp.zIndex = 120;

            cv.resMgr.load("zh_CN/game/dzpoker/animation/icon/effect", cc.SpriteAtlas, (atlas: cc.SpriteAtlas): void => {
                effSp.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(cv.StringTools.formatC("animation-icon-icon_fly_%d", effectId < 6 ? effectId : (effectId - 1)));
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);

            effSp.active = (true);
            effSp.name = effectId.toString();
            effSp.setPosition(beginPos);

            if (effectId != 1 && effectId != 2 && effectId != 3) {
                let isFlipX = false;
                if (effectId == 7) {
                    let scale = cc.v2();
                    effSp.getScale(scale);
                    isFlipX = endPos.x - effSp.x < 5;

                    if ((!isFlipX && scale.x > 0) || (scale.x < 0 && isFlipX)) {
                        effSp.setScale(-scale.x, scale.y);
                    }

                }
                effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(this.effectPlay, this, { "sp": effSp, "ani_node": ani_node, "isSp": true, "isFlipX": isFlipX })));
            }
            else {
                let kMidPoint = cc.v2((beginPos.x + endPos.x) * 0.5, (beginPos.y + endPos.y) * 0.5);
                let radian = (-100.0 + Math.random() * 200) * 3.14159 / 180.0;
                let q1x = beginPos.x + (endPos.x - beginPos.x) / 4.0;
                let q1 = cc.v2(q1x, 0 + beginPos.y + Math.cos(radian) * q1x * 1.5);

                let q2x = beginPos.x + (endPos.x - beginPos.x) / 2.0;
                let q2 = cc.v2(q2x, 0 + beginPos.y + Math.cos(radian) * q2x * 1.5);

                let bezier: cc.Vec2[] = [q1, q2, endPos];

                let bezierto = cc.bezierTo(1.0, bezier);

                let rotate = cc.rotateTo(1.0, 360 * 2);
                effSp.runAction(rotate);
                effSp.runAction(cc.sequence(bezierto.easing(cc.easeInOut(0.5)), cc.callFunc(this.effectPlay, this, { "sp": effSp, "ani_node": ani_node, "isSp": true })));
            }
        }
    }

    effectPlay(target: cc.Node, data: any) {
        let sp: cc.Node = data.sp;
        let ani_node: cc.Node = data.ani_node;
        let tag = data.isSp ? parseInt(sp.name) : parseInt(ani_node.name);
        let timeArr = [40, 34 * 5, 100, 65, 34 * 5, 18 * 5, 160, 70, 70, 70, 105];
        let pos = data.isSp ? sp.getPosition() : ani_node.getPosition();
        tag = tag > 6 ? tag - 1 : tag;
        let hideTime = (timeArr[tag] + 10) / 60;
        if (tag == 0) {
            if (!this.isGameStarSeat() && cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/daodanbaozha");
            }
            tag = 100;
        }
        let ani_new = this.getAniNode();
        if (tag < 7 || tag > 9) {
            if (tag == 6) {
                let scale = cc.v2();
                ani_new.getScale(scale);

                if ((data.isFlipX && scale.x > 0) || (scale.x < 0 && !data.isFlipX)) {
                    ani_new.setScale(-scale.x, scale.y);
                }
            }

            ani_new.getComponent(cc.Animation).play(cv.config.getStringData(cv.StringTools.formatC("CocosEffect%d", tag)));
        }
        else {
            let aniName: string[] = ["photo", "zhua", "eat"];
            ani_new.getComponent(cc.Animation).play(aniName[tag - 7]);
            ani_new.setScale(1.5);
        }

        ani_new.setPosition(pos);
        if (tag == 4) {
            ani_new.setPosition(cc.v2(ani_new.getPosition().x - 27, ani_new.getPosition().y));
            ani_new.setPosition(cc.v2(ani_new.getPosition().x, ani_new.getPosition().y + 75));
        }
        if (tag == 100) {
            ani_new.setScale(1.5);
        }

        let tempFunc = function () {
            ani_new.active = false;
            ani_new.zIndex = 0;
        }
        ani_new.active = true;
        ani_new.runAction(cc.sequence(cc.delayTime(hideTime), cc.callFunc(tempFunc, this)));
        // _gameMain_panel.addChild(aa);
        // sp.removeFromParentAndCleanup(true);
        // }
        // else {
        //     // spine::SkeletonAnimation* _skeletonNode = spine::SkeletonAnimation::createWithFile(TT(StringUtils::format("CocosEffect%d", tag).c_str()), TT(StringUtils::format("CocosEffect%d%d", tag, tag).c_str()),1);
        //     // _skeletonNode.setVisible(true);
        //     // _skeletonNode.setScale(1.5);
        //     // _skeletonNode.setPosition(Vec2(sp.getPositionX(), sp.getPositionY()-60));
        //     // _skeletonNode.setAnimation(0, "animation", true);
        //     // _gameMain_panel.addChild(_skeletonNode);
        //     // _skeletonNode.runAction(CCSequence::create(CCDelayTime::create(2.0f), CCCallFunc::create(std::bind(&GameScene::showSpineCallBack, this, _skeletonNode)), NULL));
        // }
        if (sp) {
            sp.removeFromParent(true);
            sp.destroy();
        }

        ani_node.active = false;
        ani_node.zIndex = 0;
    }

    creatSpine(parentNode: cc.Node, zorder: number, pos: cc.Vec2, spineName: string) {
        let node = new cc.Node();
        node.addComponent(sp.Skeleton);
        let spData = new sp.SkeletonData();
        spData.atlasText = spineName;
        let ske = node.getComponent(sp.Skeleton);
        ske.skeletonData = spData;
        parentNode.addChild(node, zorder);
        node.setPosition(pos);
    }

    // int32 roomid = 1;
    // string content = 2;
    // uint32 playerid = 3;
    // int32 seatid   = 4;
    // EmojiType type = 5;

    OnFlyEmoji(msg: any) {
        let content = msg.Content;
        let type = msg.type;
        let kSender: string = "";
        let kTarget: string = "";
        let kFaceID: string = "";
        let kName: string = "";

        let arr = content.split("#");

        for (let i = 0; i < arr.length; i++) {

            if (i == 1) {
                kSender = arr[i];
            }
            else if (i == 2) {
                kTarget = arr[i];
            }
            else if (i == 3) {
                kFaceID = arr[i];
            }
            else if (i == 4) {
                if (arr[i]) {
                    kName = arr[i];
                }
            }
        }

        if (Number(kSender) != cv.GameDataManager.tRoomData.i32SelfSeat) {
            this.showEffect(Number(kSender), Number(kTarget), Number(kFaceID), kName, type);
        }
        else if (Number(kSender) == cv.GameDataManager.tRoomData.i32SelfSeat && Number(kSender) != -1) {
            this.showEffect(Number(kSender), Number(kTarget), Number(kFaceID), kName, type);
        }
        else if (Number(kSender) == -1) {
            this.showEffect(Number(kSender), Number(kTarget), Number(kFaceID), kName, type);
        }
    }

    onShowFace(ret) {
        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            if (this.seatList[i].getSeverId() == ret.seatID) {
                this.seatList[i].showFace(ret.face);
            }
        }
    }

    onSendChat(ret) {
        //if (ret.seatID != cv.GameDataManager.tRoomData.i32SelfSeat) {
        let seat: Seat = this.getSeatBySeverId(ret.seatID);
        let pos: cc.Vec2 = seat.getHeadWorldPosForFace();
        // if (!this.game.face_Panel) {
        //     this.game.face_Panel = cc.instantiate(this.game.face_Panel_prefab);
        //     this.game.node.addChild(this.game.face_Panel);
        //     this.game.face_Panel.active = false;
        // }
        if (this.isGameStarSeat()) {
            this.game.face_Panel.getComponent(FaceBarrage).showFaceAni(pos, cv.Number(ret.face));
        } else {
            this.game.face_Panel.getComponent(FaceView).showFaceAni(pos, cv.Number(ret.face));//(ret.face > 5 ? (ret.face - 6) : (ret.face + 6)) % 12);//
        }
        //}
    }
    public initPublicCardPos() {

        if (this.isGameStarSeat() && cv.tools.GetTableBack(this.isGameStarSeat()) == -1) {
            //明星桌第一张背景不显示水印
            this.game.gameIcon_img.active = false;
            this.game.gameIcon_img_star.active = true;
        } else {
            this.game.gameIcon_img.active = true;
            this.game.gameIcon_img_star.active = false;
        }

        let offsery = 0;

        let bTopHaveSeat = true;  //最顶端Top座位是否有人
        if (this.roomPlayerNumber == 3 || this.roomPlayerNumber == 5 || this.roomPlayerNumber == 7) {
            bTopHaveSeat = false; //这三个人数房间，最顶端没有座位
        }

        //非大屏情况下，考虑到最上面玩家下注筹码会和主池重叠。如果顶端有座位，公共牌，水印等不进行上移动
        if ((!bTopHaveSeat && !cv.config.IS_FULLSCREEN) || this.isGameStarSeat()) {
            if (this.isGameStarSeat()) {
                if (cv.config.IS_FULLSCREEN) {
                    offsery = 30
                } else {
                    offsery = -25;
                }
            }
            this.publicPos.y += (60 + offsery);
            this.short_pai.setPosition(cc.v2(this.short_pai.x, this.short_pai.y + 78));
            for (let i = 0; i < 5; ++i) {
                if (this.m_pkPublicCard[i]) {
                    this.m_pkPublicCard[i].node.setPosition(cc.v2(this.publicPos.x + i * this.publicCard_hgp, this.publicPos.y));
                    let tempPos = cc.Vec2.ZERO;
                    this.mainpool.convertToWorldSpaceAR(cc.v2(0, 0), tempPos);
                    this.m_pkPublicCard[i].setDealPos(tempPos);
                }
            }

        } else {
            if (!cv.config.IS_FULLSCREEN) {
                this.short_pai.setPosition(cc.v2(this.short_pai.x, this.short_pai.y + 30));
            }
        }

        // 排版桌面上"发发看"文字的位置
        do {
            let refNode: cc.Node = this.m_pkPublicCard[0].node;
            let tarNode: cc.Node = this.cardFunTips_text.node;
            let x: number = tarNode.x;
            let y: number = refNode.y + refNode.height * (1 - refNode.anchorY) * refNode.scaleY;
            y += tarNode.height * tarNode.anchorY;
            y += 30;
            let p: cc.Vec2 = cc.v2(x, y);
            refNode.parent.convertToWorldSpaceAR(p, p);
            tarNode.parent.convertToNodeSpaceAR(p, p);
            tarNode.setPosition(p);
        } while (false);

        let pos = cc.Vec2.ZERO;
        this.publicCard_panel.convertToWorldSpaceAR(this.publicPos, pos);
        let publicPosWS = cc.v2(pos.x, pos.y);
        let temp = cc.Vec2.ZERO;
        this.game.gameIcon_img.parent.convertToNodeSpaceAR(pos, temp);
        this.game.gameIcon_img.setPosition(cc.v2(this.game.gameIcon_img.x, temp.y + this.m_pkPublicCard[0].node.height / 2 + 22 + this.game.gameIcon_img.height / 2));

        //普通桌空间更大，底池和边池都上移不和logo重叠
        if (this.isGameStarSeat()) {
            if (cv.config.IS_FULLSCREEN) {
                offsery = 10
            } else {
                offsery = 0;
            }
        } else {

            if (cv.config.IS_FULLSCREEN) {
                offsery = 140;
            } else {
                //小屏，防止主池与最顶端玩家下注筹码重叠，offsery设置为15个像素
                offsery = 15;

                //8人以上要考虑 七个以上(含)分池显示情况
                let u32PlayerCount = cv.GameDataManager.tRoomData.pkRoomParam.player_count_max;
                if (u32PlayerCount >= 8) {
                    offsery += 35;
                }
            }
        }

        //设置主池坐标
        this.game.gameIcon_img.parent.convertToWorldSpaceAR(this.game.gameIcon_img.getPosition(), pos);
        this.dichiChip_text.node.parent.convertToNodeSpaceAR(pos, temp);
        this.dichiChip_text.node.setPosition(this.mainpool.x, temp.y + this.game.gameIcon_img.height / 2 + this.dichiChip_text.node.height / 2 + offsery);
        this.mainpool.setPosition(this.mainpool.x, this.dichiChip_text.node.y + this.dichiChip_text.node.height / 2 + 7 + this.mainpool.height / 2);

        // this.mainpool.parent.convertToNodeSpaceAR(pos, temp);
        // this.mainpool.setPosition(this.mainpool.x, temp.y + this.game.gameIcon_img.height / 2 + this.dichiChip_text.node.height / 2 + offsery);
        // this.dichiChip_text.node.setPosition(this.mainpool.x, this.mainpool.y + this.dichiChip_text.node.height / 2 + 10 + this.mainpool.height / 2);

        for (let index = 0; index < this.sidepoolPosList.length; index++) {
            let offset_y = 0;
            if (index < 2) { // 第0，第1个边池
                offset_y = 64;
            } else if (index < 4) { //第2，第3个边池
                offset_y = 135;
            } else if (index < 6) { // 第4，第5个边池
                offset_y = 206;
            } else if (index < 8) {// 第6，第7个边池
                offset_y = 277;
            }
            this.sidepoolPosList[index].y = this.dichiChip_text.node.y - offset_y;
        }

        //计算publicPosWS于DanmuView中的位置
        if (this.game.danmu_Panel.childrenCount == 0) {
            return;
        }
        this.game.danmu_Panel.children[0].convertToNodeSpaceAR(publicPosWS, temp);
        let faceView: any = null;
        if (this.isGameStarSeat()) {
            faceView = this.game.face_Panel.getComponent(FaceBarrage);
        } else {
            faceView = this.game.face_Panel.getComponent(FaceView);
        }
        if (cv.config.IS_FULLSCREEN) {
            //大屏5轨8条
            if (this.isGameStarSeat()) {
                faceView.setDanmuChanel([temp.y + 810 - 150, temp.y + 509, temp.y + 180, temp.y - 169, temp.y - 304]);
            } else {
                faceView.setDanmuChanel([temp.y + 773, temp.y + 643, temp.y + 303, temp.y + 178, temp.y - 174]);
            }
            faceView.adjustDanmuMaxNumber(8);
        } else {
            //小屏3轨5条
            if (this.isGameStarSeat()) {
                faceView.setDanmuChanel([temp.y + 511, temp.y + 186, temp.y - 217]);
            } else {
                faceView.setDanmuChanel([temp.y + 604, temp.y + 214, temp.y - 134]);
            }
            faceView.adjustDanmuMaxNumber(5);
        }
    }
    //生成坐位
    public initSeat(playerNumber: number) {
        this.roomPlayerNumber = playerNumber;//总的人数
        let seatHandsCardType: number = this.isGamePLO() ? cv.Enum.SeatHandsCardType.SHCT_PLO : cv.Enum.SeatHandsCardType.SHCT_TEXAS;

        for (let i: number = 0; i < playerNumber; i++) {
            let seat: Seat = (this.isGameStarSeat()) ? (cc.instantiate(this.seatStar).getComponent(SeatStar)) : (cc.instantiate(this.seat).getComponent(Seat));
            this.seatPanel.addChild(seat.node);

            seat.initHandCards(seatHandsCardType);
            seat.node.setPosition(cc.v2(this.postList[playerNumber - 2][i].x, this.postList[playerNumber - 2][i].y));
            seat.setGameScene(this.game);
            seat.setGameMain(this);
            seat.setMainPool(this.mainpool);
            seat.setSeverId(i);
            seat.setSeatViewId(i, playerNumber);
            seat.updateStyle();
            this.seatList.push(seat);
            seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_empty);
            if (i > 0) {
                if (this.isZoom() && cv.GameDataManager.tRoomData.isvirtual) { // 极速游戏并且虚拟房间时  隐藏座位
                    //seat.node.setCascadeOpacityEnabled(true);
                    seat.node.opacity = 0;
                }
            }
        }

        this.sliderBg.zIndex = 100;
        this.freeSlider.node.zIndex = 101;
        this.freeSliderText_bg.zIndex = 102;
        this.freeSliderText.node.zIndex = 103;
        this.sliderAllin.zIndex = 104;
        this.percent_img.zIndex = 105;
        this.actionButtonView_2.zIndex = 106;
    }

    //初始化坐位
    public initPos() {
        let selfSeatPosY = 550;
        let topY = 2006;//顶部椅子的y坐标
        let leftX = 110;//左边椅子的x坐标
        let RightX = 974;//右边椅子的x坐标
        let adaptIndex = cc.winSize.height / cv.config.DESIGN_HEIGHT;
        let normalSeatOffsetY = 30;  //小屏偏移
        let fullTopSeatOffsetY = 0;
        let topNineOffsetX = 0;

        if (cv.config.IS_FULLSCREEN) {
            adaptIndex = (cc.winSize.height - cv.config.FULLSCREEN_OFFSETY) / cv.config.DESIGN_HEIGHT;
            normalSeatOffsetY = 0;
            fullTopSeatOffsetY = 85;

            let u32PlayerCount = cv.GameDataManager.tRoomData.pkRoomParam.player_count_max;
            if (u32PlayerCount >= 7) {
                this.redEnvelope_btn.node.y = this.redEnvelope_btn.node.y + 30;
            }

            if (this.isGameStarSeat()) {
                this.gaopai.y = this.gaopai.y - 45;
                this.aof_lost_btn.x = this.aof_lost_btn.x + 44;
            }

        } else {

            //此处下面都是为了处理大屏适配后，小屏出现的重叠问题
            let u32PlayerCount = cv.GameDataManager.tRoomData.pkRoomParam.player_count_max;
            if (u32PlayerCount >= 7) {
                let menuOffsetY = 75;
                this.menu_button.y = this.menu_button.y + menuOffsetY;
                this.shop_button.y = this.shop_button.y + menuOffsetY + 20;
                this.allReview_button.y = this.allReview_button.y + menuOffsetY + 21;
                this.aof_lost_btn.y = this.aof_lost_btn.y + menuOffsetY + 21;
                this.redEnvelope_btn.node.y = this.redEnvelope_btn.node.y + menuOffsetY + 65;
            }

            if (this.isGameStarSeat()) {
                this.gaopai.y = this.gaopai.y - 60;
                this.aof_lost_btn.x = this.aof_lost_btn.x + 44;
            } else {
                this.gaopai.y = this.gaopai.y - 25;
            }

            if (u32PlayerCount == 8) {  //8，9人桌，小屏幕为了解决八个分池显示空间重叠问题。向上面移动
                fullTopSeatOffsetY = 85;
            } else if (u32PlayerCount == 9) {
                fullTopSeatOffsetY = 115;
                topNineOffsetX = 60;
            } else if (u32PlayerCount == 6) {
                fullTopSeatOffsetY = 15;
            }

        }

        if (this.isGameStarSeat()) {
            this.freeFill_button.node.y += 30;
            this.freeFill_button_img.y += 30;
        }

        //返回按钮和自己视角座位对齐
        this.backGame_button.setPosition(cc.v2(this.backGame_button.x, selfSeatPosY * adaptIndex));
        let Seat_two: cc.Vec2[] = [];
        let Seat_two0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let Seat_two1: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, (topY + fullTopSeatOffsetY) * adaptIndex);
        Seat_two.push(Seat_two0);
        Seat_two.push(Seat_two1);

        let Seat_three: cc.Vec2[] = [];
        let Seat_three0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let Seat_three1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1455 * adaptIndex);
        let Seat_three2: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1455 * adaptIndex);
        Seat_three.push(Seat_three0);
        Seat_three.push(Seat_three1);
        Seat_three.push(Seat_three2);

        let Seat_four: cc.Vec2[] = [];
        let Seat_four0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let Seat_four1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1452 * adaptIndex);
        let Seat_four2: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, (topY + fullTopSeatOffsetY) * adaptIndex);
        let Seat_four3: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveRightX(RightX, true), 1452 * adaptIndex);

        Seat_four.push(Seat_four0);
        Seat_four.push(Seat_four1);
        Seat_four.push(Seat_four2);
        Seat_four.push(Seat_four3);

        let Seat_five: cc.Vec2[] = [];
        let chai_five0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let chai_five1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), (1000 - normalSeatOffsetY) * adaptIndex);
        let chai_five2: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1685 * adaptIndex);
        let chai_five3: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveRightX(RightX, true), 1685 * adaptIndex);
        let chai_five4: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveRightX(RightX, true), (1000 - normalSeatOffsetY) * adaptIndex);
        Seat_five.push(chai_five0);
        Seat_five.push(chai_five1);
        Seat_five.push(chai_five2);
        Seat_five.push(chai_five3);
        Seat_five.push(chai_five4);

        let Seat_six: cc.Vec2[] = [];
        let Seat_six0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let Seat_six1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), (1000 - normalSeatOffsetY) * adaptIndex);
        let Seat_six2: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1685 * adaptIndex);
        let Seat_six3: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, (topY + fullTopSeatOffsetY) * adaptIndex);
        let Seat_six4: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveRightX(RightX, true), 1685 * adaptIndex);
        let Seat_six5: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveRightX(RightX, true), (1000 - normalSeatOffsetY) * adaptIndex);
        if (this.isGameStarSeat()) {
            Seat_six0.y += 30;

            //Seat_six3.y -= 40;

            Seat_six1.x += 20;
            Seat_six2.x += 20;
            Seat_six4.x -= 20;
            Seat_six5.x -= 20;

            Seat_six1.y += 20;
            Seat_six2.y -= 46;
            Seat_six4.y -= 46;
            Seat_six5.y += 20;
        }

        Seat_six.push(Seat_six0);
        Seat_six.push(Seat_six1);
        Seat_six.push(Seat_six2);
        Seat_six.push(Seat_six3);
        Seat_six.push(Seat_six4);
        Seat_six.push(Seat_six5);

        let Seat_seven: cc.Vec2[] = [];
        let Seat_seven0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let Seat_seven1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), (1005 - normalSeatOffsetY) * adaptIndex);
        let Seat_seven2: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1452 * adaptIndex);
        let Seat_seven3: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1860 * adaptIndex);
        let Seat_seven4: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1860 * adaptIndex);
        let Seat_seven5: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1452 * adaptIndex);
        let Seat_seven6: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), (1005 - normalSeatOffsetY) * adaptIndex);

        Seat_seven.push(Seat_seven0);
        Seat_seven.push(Seat_seven1);
        Seat_seven.push(Seat_seven2);
        Seat_seven.push(Seat_seven3);
        Seat_seven.push(Seat_seven4);
        Seat_seven.push(Seat_seven5);
        Seat_seven.push(Seat_seven6);

        let Seat_eight: cc.Vec2[] = [];
        let Seat_eight0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let Seat_eight1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), (1005 - normalSeatOffsetY) * adaptIndex);
        let Seat_eight2: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1452 * adaptIndex);
        let Seat_eight3: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), (1863 - normalSeatOffsetY) * adaptIndex);
        let Seat_eight4: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, (topY + fullTopSeatOffsetY) * adaptIndex);
        let Seat_eight5: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), (1863 - normalSeatOffsetY) * adaptIndex);
        let Seat_eight6: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1452 * adaptIndex);
        let Seat_eight7: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), (1005 - normalSeatOffsetY) * adaptIndex);

        Seat_eight.push(Seat_eight0);
        Seat_eight.push(Seat_eight1);
        Seat_eight.push(Seat_eight2);
        Seat_eight.push(Seat_eight3);
        Seat_eight.push(Seat_eight4);
        Seat_eight.push(Seat_eight5);
        Seat_eight.push(Seat_eight6);
        Seat_eight.push(Seat_eight7);

        let Seat_nine: cc.Vec2[] = [];
        let pos0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, selfSeatPosY * adaptIndex);
        let pos1: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1005 * adaptIndex - normalSeatOffsetY);
        let pos2: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1452 * adaptIndex - normalSeatOffsetY);
        let pos3: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(leftX, true), 1863 * adaptIndex - normalSeatOffsetY);
        let pos4: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(318 + topNineOffsetX, true), (topY + fullTopSeatOffsetY) * adaptIndex);
        let pos5: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(760 - topNineOffsetX, true), (topY + fullTopSeatOffsetY) * adaptIndex);
        let pos6: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1863 * adaptIndex - normalSeatOffsetY);
        let pos7: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1452 * adaptIndex - normalSeatOffsetY);
        let pos8: cc.Vec2 = cc.v2(cv.viewAdaptive.getAdaptiveLeftX(RightX, true), 1005 * adaptIndex - normalSeatOffsetY);

        Seat_nine.push(pos0);
        Seat_nine.push(pos1);
        Seat_nine.push(pos2);
        Seat_nine.push(pos3);
        Seat_nine.push(pos4);
        Seat_nine.push(pos5);
        Seat_nine.push(pos6);
        Seat_nine.push(pos7);
        Seat_nine.push(pos8);

        this.postList.push(Seat_two);
        this.postList.push(Seat_three);
        this.postList.push(Seat_four);
        this.postList.push(Seat_five);
        this.postList.push(Seat_six);
        this.postList.push(Seat_seven);
        this.postList.push(Seat_eight);
        this.postList.push(Seat_nine);
    }

    /**
     * 游戏进入后台时触发的事件
     * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为
     * 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为
     */
    OnAppEnterBackground(): void {

        console.log("###################### OnAppEnterBackground: 后台");
        cv.gameNet.stopVoice();
        //私语版本, 切回后台后，将所有音频暂停
        //if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            //creator IOS平台的网页web版，切换后台，再切回游戏后。会出现所有音乐、音效播放没有声音的bug。
            if (cv.config.isSiyuType()) {
                cc.sys.__audioSupport.context.suspend();
            }
        } else {
            //安卓版本，切回后台后可能存在音效还播放的问题，此处全部pause掉
            cv.tools.setEnterbackState(true);
            cv.AudioMgr.pauseAll();
        }
        //}

        // 隐藏保险界面
        if (this.game && this.game.insurance_panel) {
            this.game.insurance_panel.getComponent(InsuranceEntrance).autoHide(false);
        }
        if (!this.isZoom()) {
            cv.gameNet.RequestGuessSetBetOpt(false);
        }
        this.game.guess_hand_card.active = false;
        this.guess_hand_card_button.node.active = false;

        this.leaveVideoChannel();
    }

    /**
     * 游戏进入前台运行时触发的事件
     * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为
     * 在原生平台，它对应的是应用被切换到前台事件
     */
    OnAppEnterForeground(): void {
        console.log("###################### OnAppEnterForeground: 前台");
        //if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            if (cv.config.isSiyuType()) {
                cc.sys.__audioSupport.context.resume();
            }
        } else {
            cv.tools.setEnterbackState(false);
            cc.audioEngine.resumeAll();
        }
        //}

        this.resetDealPos();
        this.hideBombInfoPrompt();
        let _tipsTag = cv.TP.getTag();
        if (_tipsTag != null) {
            if (_tipsTag == "UIGameSceneTips4") {
                cv.TP.hideTipsPanel();
            }
        }

        if (this.isGameStarSeat() && this.isEnableGameStarSeat()) {
            this.onVideoEngineStateChanged(AgoraSdk.getEngineStatus());
        }
    }

    /**
     * updateforceShowcardPos
     */
    public updateforceShowcardPos() {
        if (this.isGameStarSeat()) {
            let offsetY = 180;
            if (!cv.config.IS_FULLSCREEN) {
                offsetY = 145;  //防止明星桌小屏，发发看等按钮与金币款重叠
            }
            this.deal_button.setPosition(this.deal_button.getPosition().x, this.deal_button_Posy + offsetY);
            this.forceShowCard_button.setPosition(this.forceShowCard_button.getPosition().x, this.forceShowCard_button_PosY + offsetY);
        } else {
            this.deal_button.setPosition(this.deal_button.getPosition().x, this.deal_button_Posy);
            this.forceShowCard_button.setPosition(this.forceShowCard_button.getPosition().x, this.forceShowCard_button_PosY);
        }
    }
    public OnSnapShotRoomInfo(pSend: any) {
        //if (!cv.GameDataManager.tRoomData.hasRecvNoticeGameSnapShot) return;
        this.updateforceShowcardPos();
        let u32Seat = cv.GameDataManager.tRoomData.i32SelfSeat;
        let u32PlayerCount = cv.GameDataManager.tRoomData.pkRoomParam.player_count_max;
        let isopenRecall = cv.GameDataManager.tRoomData.pkRoomParam.is_opened_drawback;
        let isrecalTimes = cv.GameDataManager.tRoomData.pkRoomParam.drawback_times;
        let recalTimes = cv.GameDataManager.tRoomData.pkRoomParam.drawback_hold_times;
        this.D_img.active = false;
        this.onCloseZoomTips();
        this.face_button.active = this.isShowFaceBtn();
        this.currentTime_button.active = true;
        this.game.guess_hand_card.active = false;
        this.guess_hand_card_button.node.active = false;
        this._guess_settle_amount = -1;
        this.hideAllWinRate();

        // 初始化礼物模块(放在这里, 因为可能断线重连, 只是初始坐标和一些引用而已, 不是创建实例, 多次调用也不影响)
        this.initGift();

        if (u32Seat == -1) {
            this.actionButtonView.active = false;
            this.actionButtonView_2.active = false;
            this.sliderBg.active = false;
            this.addTime_button.active = false;
            this.gaopai.active = false;

            if (this.game.face_Panel) {
                if (this.isGameStarSeat()) {
                    this.game.face_Panel.getComponent(FaceBarrage).hideUi();
                } else {
                    this.game.face_Panel.getComponent(FaceView).hideUi();
                }
            }
        }
        if (cv.GameDataManager.tRoomData.isShowCritPrompt == true) {  //需要暴击提示
            this.showBombInfoPrompt(cv.GameDataManager.tRoomData.pkRoomParam);
        }

        if (this._roleInfo_panel) {
            this._roleInfo_panel.getComponent(StarPrivateInfo).createFaceItem();
        }
        if (!this.m_bIsInit) {
            this.initRoomData();//先清理
            this.initSeat(u32PlayerCount);
            this.initSelfCard();
            this.initPublicCardPos();
            this.setRoomData();
            this.UpdateCardFace();
            this.updateCardBack();
            this.resetTable();
            this.initHitbackPos();

            this.record_button.active = this.isShowRecord();
            this.addEvent();
            this.m_bIsInit = true;

            this._runZoomSeatAction = false;
            this.record_button_img.active = true;
            if (this.isZoom() || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet) {
                if (this._roleInfo_panel) {
                    this._roleInfo_panel.active = false;
                    this._roleInfo_panel.getComponent(StarPrivateInfo).setShadeHide();
                }
            }
            if (this.isZoom()) {
                cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_ZOOM_TEXAS);
            }
            else if (cv.roomManager.getCurrentGameID() == world_pb.GameId.PLO) {
                cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_PLO);
            }
            else if (cv.roomManager.getCurrentGameID() == world_pb.GameId.StarSeat) {
                cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_STAR_SEAT);
            }
            else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet) {
                cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_BET);
            } else {
                cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_TEXAS);
            }

            if (!cv.config.isOverSeas()) {
                let isShort = (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short && !cv.GameDataManager.tRoomData.pkRoomParam.is_mirco);
                this.aof_lost_btn.active = this.isZoom() || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet || cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand || isShort;
            }
            cc.find("pokerName_text", this.node).active = !this.isZoom();
            this.onUpdataStarRedpacket();
        }
        else {
            if (this.isZoom()) {
                if (this._roleInfo_panel) {
                    this._roleInfo_panel.active = false;
                    this._roleInfo_panel.getComponent(StarPrivateInfo).setShadeHide();
                }
            } else {
                // 换桌逻辑
                this.setTableName();
                cv.worldNet.RequestGetJackpotData(cv.GameDataManager.tRoomData.pkRoomParam.club_id, cv.GameDataManager.tRoomData.u32RoomId);
            }

            this._runZoomSeatAction = true;
            this.node.stopActionByTag(5566);

            for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
                this.m_pkPublicCard[i].stopSchedulesAndActions();
                this.m_pkPublicCard[i].resetPos();
                this.m_pkPublicCard[i].node.active = false;
                this.m_pkPublicCard[i].setFace(false);
                this.m_pkPublicCard[i].setOp(false);
                this.m_pkPublicCard[i].setGary(false);
            }

            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                this.m_pkSelfCard[i].stopSchedulesAndActions();
                this.m_pkSelfCard[i].resetPos();
                this.m_pkSelfCard[i].node.active = false;
                this.m_pkSelfCard[i].setFace(false);
                this.m_pkSelfCard[i].setGary(false);
            }

            this.mainpool.opacity = 0;
            this.HideSidePotByPotCount();
            cv.GameDataManager.tGameData.u32DeadPot = 0;
            this.dichiChip_text.string = (cv.config.getStringData("dichiNum") as string).replace("%d", "0");
            this.dichiChip_text.node.active = false;
            this.mainpool_text.string = "";
            this.mainpool.setContentSize(cc.size(this.getMainpoolWidth(), this.mainpool.getContentSize().height));

            this.backGame_button.active = false;

            // this.hideSelfCardAllInEffect();
            this.cardFunTips_text.node.active = false;

            let tempPos = cc.Vec2.ZERO;
            this.mainpool.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);
            for (let i = 0; i < this.seatList.length; ++i) {
                let pkSeat: Seat = this.seatList[i];
                if (pkSeat) {
                    pkSeat.hideChips();
                    pkSeat.hideCard();
                    pkSeat.isShowDown = false;
                    pkSeat.resetCardPos();
                    pkSeat.hideWin();

                    for (let j = 0; j < pkSeat.getHandsCardsCount(); ++j) {
                        pkSeat.getShowCard(j).setFace(false);
                        pkSeat.getShowCard(j).setDealPos(tempPos);
                        pkSeat.getShowCard(j).setGary(false);
                    }
                }
            }

            this.recetAllSeats();
        }

        this.node.stopActionByTag(this.GAME_DELAY_ANTE_TAG);
        //this.node.stopActionByTag(this.GAME_DELAY_RESET_GAME_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_ELECT_DEALER_TAG);

        this.node.stopActionByTag(this.GAME_DELAY_BLIND_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_HOLECARD_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_ACTION_TURN_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_ENDROUND_TAG);
        this.node.stopActionByTag(this.GAME_DELAY_NONEEDINSURANCE_TAG);
        this.node.stopActionByTag(this.GAME_SHOW_GUESS_SETTLE_TAG);
        this.node.stopActionByTag(this.GAME_REAL_COMMUNITY_CARD_TAG);
        this.node.stopActionByTag(this.GAME_END_SETSTAKE_TAG);
        this.node.stopActionByTag(this.GAME_CHIPS_MOVE_ACTION_TAG);
        this.resetAction();

        // 隐藏保险界面
        if (this.game && this.game.insurance_panel) {
            this.game.insurance_panel.getComponent(InsuranceEntrance).autoHide(false);
        }

        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; i++) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            this.playerSitDown(pkPlayer);
            this.setSeatInfo(pkPlayer);
            if (pkPlayer.inStay) {
                this.leaveTable(pkPlayer);
            }

            this.UpdateDeadPot(pkPlayer.round_bet);
        }


        //玩家进入牌桌时，若桌子上有空位，则随机将一个空位自动旋转到最下方，玩家主视角位置(明星桌不需要这个需求)
        let _bNeedTurnEmptySeat = false;
        let _curEmptyViewId = 0;
        if (cv.GameDataManager.tRoomData.i32SelfSeat == -1 && !this.isGameStarSeat()) { //自己没有落座
            for (let i = 0; i < this.seatList.length; i++) {
                let pkSeat: Seat = this.seatList[i];
                if (pkSeat.getSeatViewId() == 0 && pkSeat.getStatus() != cv.Enum.SeatStatus.SeatStatus_empty) {
                    //最底下的一个座位已经被别人入座了
                    _bNeedTurnEmptySeat = true;
                }

                if (pkSeat.getStatus() == cv.Enum.SeatStatus.SeatStatus_empty) {
                    _curEmptyViewId = pkSeat.getSeatViewId();  //找一个空座位
                }
            }
        }

        if (_bNeedTurnEmptySeat && _curEmptyViewId != 0) {
            this.turnSeat(_curEmptyViewId, true);
        }


        if (cv.GameDataManager.tRoomData.pkRoomParam.is_allin_allfold) {
            let a = 0;
        }
        if (this.isGameStarSeat()) {
            if (this.isAudience()) {
                let seatview: number = this.getSeatBySeverId(0).getSeatViewId();
                this.turnSeat(seatview, false);
            } else {
                this.setSeatViewStyle();
            }
        }
        this.SetTableInfo();

        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            cc.find("Label", this.gaopai).getComponent(cc.Label).string = this.GetSelfCardType();
        }

        this.m_bIsInitDone = true;
        cv.action.setButtonActiveFalse(this.deal_button.getComponent(cc.Button));
        cv.action.setButtonActiveFalse(this.forceShowCard_button.getComponent(cc.Button));

        if (cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
            this.waitForStart_img.active = false;
        }

        cv.GameDataManager.tRoomData.m_bChooseOuts = cv.GameDataManager.tRoomData.pkRoomParam.choose_outs;

        if (cv.GameDataManager.tRoomData.pkRoomState.paused) {
            this.showPauseGameDlg();
        }
        else {
            this.hidePauseGameDlg();
        }

        for (let i = 0; i < this.seatList.length; i++) {
            if (this.seatList[i].getStatus() > cv.Enum.SeatStatus.SeatStatus_leave_a_monment && this.seatList[i].getActionType() != cv.Enum.ActionType.Enum_Action_Fold) {
                if (this.seatList[i].getData() != null) {
                    if (this.seatList[i].getData().playerid == cv.dataHandler.getUserData().u32Uid) {
                        cv.GameDataManager.tRoomData.m_isAllInMode = true;
                    }
                }
            }
        }

        (this.game.menu_Panel.getComponent(menu) as menu).updateMenu();

        this.m_u32DelayTimeCount = cv.GameDataManager.tGameData.m_u32AddTimeCount;
        //延时到最大的时候这里需要判断一下使用次的值.
        this.m_u32DelayTimeCount = this.m_u32DelayTimeCount >= 9 ? 8 : this.m_u32DelayTimeCount;
        console.log(this.m_u32DelayTimeCount);
        if (this.m_u32DelayTimeCount > 0) {
            if (cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee.length != 0) {
                this.addTime_text.string = cv.StringTools.serverGoldToShowString(cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee[this.m_u32DelayTimeCount].needCoin);
            }
        }
        //服务器前端都会改变这个参数
        if (cv.GameDataManager.tRoomData.is_quick_sit == true || cv.roomManager.getIsQuickRoom()) {
            this.quickSit();
            cv.roomManager.setIsQuickRoom(false);
        }

        //显示 快速入座-带入界面(从GameScene.ts搬到这边,解决界面没有数据就先显示的问题)
        if (cv.Number(cv.tools.GetStringByCCFile("FINDVIEW_isFASTENTER")) == 1 && cv.roomManager.getCurrentGameID() != cv.Enum.GameId.Allin && !cv.GameDataManager.tRoomData.isZoom()) {
            if (cv.dataHandler.getActivityData().isAvatar() && !(this.isGameStarSeat() && this.isEnableGameStarSeat() && this.myIdentity() == 2)) {
                this.game.buyin_panel.active = true;
                this.game.buyin_panel.getComponent(Buyin).UpdateBuyinInfo();
            }
            cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0");
        }
        if (cv.Number(cv.tools.GetStringByCCFile("FINDVIEW_isFASTENTER")) == 2) {
            if (this.isZoom() && this.seatList[0].getStatus() != cv.Enum.SeatStatus.SeatStatus_empty) {
                //do noting
            } else {
                this.seatList[0].onClickSelf(null);
            }
            this.game.buyin_panel.active = false;
            cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0");
        }

        if (this.isZoom() && this._runZoomSeatAction) {
            this.updataSeatAction(this._runZoomSeatAction);
        }

        cv.gameNet.RequestGameActionTurn(cv.GameDataManager.tRoomData.u32RoomId);

        this.setForbidChat(cv.GameDataManager.tRoomData.anyoneAllin);

        this.initInsuranceFinish();

        if (this.isGameStarSeat()) {
            let commentatorNode = cc.find("commentator", this.node);
            this.setSeatViewStyle();
            if (this.isEnableGameStarSeat()) {
                commentatorNode.active = true;
                let commentator: Commentator = this.getCommentator();
                let openMike: boolean = false;
                let audioChannel: number = 0;
                if (this.myIdentity() == 2) {
                    openMike = this.isEnableMike();
                    let commentatorInfo: CommentatorInfo = this.getCommentatorInfoByUid(cv.dataHandler.getUserData().u32Uid);
                    if (commentatorInfo) {
                        audioChannel = commentatorInfo.television;
                    }
                    commentator.setRole(2, [audioChannel]);
                    AgoraSdk.enableLocalAudio(openMike);
                } else {
                    openMike = commentator.getRole() == 0 ? true : commentator.isEnableMike();
                    audioChannel = commentator.getRole() == 0 ? this.defaultCommentatorChannel() : commentator.getAudioChannel();
                    let audioChannels = this.currentCommentatorChannels(); //当前后台配置的所有解说频道
                    if (audioChannel != 0 && !this.containsKey(audioChannels, audioChannel)) {
                        audioChannel = 1; //强制为解说主频道(即中文频道)
                    }
                    commentator.setRole(1, audioChannels);
                }
                commentator.setViewStyle(this.isEnableAudioVolumeIndication() ? 2 : 1);
                commentator.enableMike(openMike);
                commentator.setAudioVolume(0);
                commentator.setAudioChannel(audioChannel);
                this.updateVoicePrivateNotice();
                this.updateMikMode();
                if (this._needCreateVideoEngine) {
                    this.createVideoEngine();
                }
            } else {
                commentatorNode.active = false;
                this.destroyVideoEngine();
            }
            this.record_button.active = this.isShowRecord();
            let muteTime: number = cv.GameDataManager.tRoomData.muteCustomBarrageSeconds;
            let muteType: boolean = muteTime == -1 || muteTime > 0 ? true : false;
            cv.MessageCenter.send("barrageUpdate", { mute: muteType, time: muteTime, canBarrage: cv.GameDataManager.tRoomData.openCustomBarrage, canInput: cv.GameDataManager.tRoomData.openTablePlayerCustomBarrage, price: cv.GameDataManager.tRoomData.nextCustomBarrageFee });
        }

        // 更新当前"快捷下注"模式状态
        let players: PlayerInfo[] = cv.GameDataManager.tRoomData.pkTableStates.players;
        if (cv.StringTools.getArrayLength(players) > 0) {
            for (let i = 0; i < players.length; ++i) {
                this._updateQuickBetModeStatus(players[i].round_bet, players[i].last_action);
            }
        }

        // 跟踪用户行为, 发送事件
        this.trackInfo(cv.Enum.segmentEvent.PokerRoomJoined);
    }

    /**
     * 跟踪用户行为, 发送事件
     */
    public trackInfo(event: string, extra: any = null): void {
        let roomRank: string = "";
        let featuresEnabled: string = "";
        let roomLevel: string = "";            // 房间允许访问的玩家等级列表，如[2, 3]意味着该房间允许级别2和3的玩家访问
        let roomLevelString: string = "";      // *为没有限制，N为最大人数限制，0为禁止。例如"1:0, 2:*, 3:1, 4:0, 5:0, 6:0"
        let gameID: number = cv.GameDataManager.tRoomData.u32GameID;
        let proDatas: game_pb.ProDatas[] = cv.GameDataManager.tRoomData.pkRoomParam.proDatas;

        // 检索房间级别
        for (let i = 0; i < proDatas.length; ++i) {
            let lv: number = i + 1;
            if (i !== 0 && proDatas[i].levelLimit !== 0) roomLevel += ", ";

            // 不限制
            if (proDatas[i].levelLimit < 0) {
                roomLevel += `${lv}`;
                roomLevelString += `${lv}:*`;
            }
            // 这个级别最多玩家数量
            else if (proDatas[i].levelLimit > 0) {
                roomLevel += `${lv}`;
                roomLevelString += `${lv}:${proDatas[i].levelLimit}`;
            }
            // 不让进
            else {
                roomLevelString += `${lv}:0`;
            }

            if (i !== proDatas.length - 1) roomLevelString += ", ";
        }
        if (roomLevel.length > 0) roomLevel = `[${roomLevel}]`;

        // 检索自己的座位"ViewID"
        let seat: Seat = this.getSeatByPlayerID(cv.dataHandler.getUserData().u32Uid);
        if (seat) {
            roomRank = `view_id:${seat.getSeatViewId()}; seat_id:${seat.getSeverId()}`;
        }

        let gameType: string = "";
        let gameSubType: string = "";
        if (cv.roomManager.checkGameIsZoom(gameID)) {
            gameType = "MainScene_Scene_gameType_panel_button1_text";
            gameSubType = "MainScene_Scene_gameType_panel_button5_text";
        }
        else {
            switch (gameID) {
                case world_pb.GameId.Texas: {
                    gameType = "MainScene_Scene_gameType_panel_button1_text";
                    if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode === cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                        gameSubType = "DataView_gameType_panel_button_1_text";
                    }
                } break;

                case world_pb.GameId.StarSeat: {
                    gameType = "MainScene_Scene_gameType_panel_button1_text";
                    gameSubType = "game_review_favor_list_game_type_start_seat_txt";
                } break;

                // case world_pb.GameId.Allin: {
                //     gameType = "MainScene_Scene_gameType_panel_button1_text";
                //     gameSubType = "MainScene_Scene_gameType_panel_button3_text";
                // } break;

                case world_pb.GameId.Bet: {
                    gameType = "MainScene_Scene_gameType_panel_button1_text";
                    gameSubType = "MainScene_Scene_gameType_panel_button4_text";
                } break;

                case world_pb.GameId.PLO: {
                    gameType = "MainScene_Scene_gameType_panel_button1_text";
                    gameSubType = "MainScene_Scene_gameType_panel_button8_text";
                } break;

                default: break;
            }
        }
        if (gameType.length > 0) gameType = cv.config.getStringData(gameType);
        if (gameSubType.length > 0) gameSubType = cv.config.getStringData(gameSubType);

        let stakeSize: number = 0;
        let blinds: string[] = this.mangZhu_text.string.split("/");
        if (blinds.length > 1) stakeSize = cv.Number(blinds[1]);

        // 检索房间部分属性(太多了不敢直接转JSON串怕超过32k限制, 取一部分意思下, 感觉没卵用)
        do {
            let roomParam: RoomParams = cv.GameDataManager.tRoomData.pkRoomParam;
            if (roomParam.is_associated_jackpot) featuresEnabled += "jackpot;";
            if (roomParam.is_allin_allfold) featuresEnabled += "allin_allfold;";
            if (roomParam.short_game_double_ante) featuresEnabled += "short_double_ante;";
            if (roomParam.short_fullhouse_flush_straight_three) featuresEnabled += "short_cards_order;";
            if (roomParam.is_opened_drawback) featuresEnabled += "drawback;";
            if (roomParam.choose_outs) featuresEnabled += "outs;";
            if (roomParam.muck_switch) featuresEnabled += "muck;";
            if (roomParam.anti_simulator) featuresEnabled += "anti_simulator;";
            if (roomParam.force_showcard) featuresEnabled += "force_showcard;";
            if (roomParam.IscalcIncomePerhand) featuresEnabled += "IscalcIncomePerhand;";
            if (roomParam.auto_withdraw) featuresEnabled += "auto_withdraw;";
            if (roomParam.is_open_guess) featuresEnabled += "is_open_guess;";
            if (roomParam.showAllHole) featuresEnabled += "showAllHole;";
            if (roomParam.is_mirco === 1) featuresEnabled += "is_mirco;";
        } while (false);

        let properties: any = {
            // 房间内的玩家数，包括坐下和未坐下的玩家数
            noOfPlayerInTheRoom: cv.GameDataManager.tRoomData.allPlayersCount,
            // 牌桌总的席位数
            tableSize: this.seatList.length,
            // 游戏大类别
            gameType: gameType,
            // 游戏子类别
            gameSubType: gameSubType,
            // 大盲注的大小
            stakeSize: stakeSize,
            // 已被占用的席位数目
            seatsOccupied: cv.GameDataManager.tRoomData.kTablePlayerList.length,
            // 房间ID
            roomId: cv.GameDataManager.tRoomData.u32RoomId,
            // 以分号分割单额房间特征属性列表, 如: emoji;time
            featuresEnabled: featuresEnabled,
            // 整数列表, 房间允许访问的玩家等级列表
            // 如[2, 3]意味着该房间允许级别2和3的玩家访问
            roomLevel: roomLevel,
            // 字符串表示的Dictionary结构, 以分号分割的房间在六个级别上的玩家限制
            // 每个级别的值为*|4|0, * 为没有限制, N为最大人数限制, 0为禁止
            // 例如"1:0, 2:*, 3:1, 4:0, 5:0, 6:0", 意味着级别2的玩家可以无限制地加入
            // 最多1个级别3的玩家可以加入，其他级别玩家禁止访问
            roomLevelString: roomLevelString,
            // 整数, 玩家加入时, 该牌桌在大厅中的位置
            // 例如, 1意味着牌桌在顶部, 2意味着该牌桌排在第二个位置
            // 如果是来自玩家自动入座, 则该字段为空
            roomRank: roomRank,
        };

        cv.tools.copyObjectProperties(properties, extra);
        cv.segmentTool.track(cv.Enum.CurrentScreen.room, event, cv.Enum.Functionality.poker, properties);
    }

    public onQuickFold() {
        this.stopSelfThinkCd();
        cv.gameNet.RequestQuickFold(cv.GameDataManager.tRoomData.u32RoomId, false, 0);
    }

    private onCloseTips() {
        let _tipsTag = cv.TP.getTag();
        if (_tipsTag != null) {
            if (_tipsTag == "UIGameSceneTips28" ||
                _tipsTag == "UIGameSceneTips3" ||
                _tipsTag == "ZoomQuickFold_tips" ||
                _tipsTag == "ZoomQuickFold_tips2" ||
                _tipsTag == "Big_Card_Tips"
            ) {
                //cv.TP.remove();
                cv.TP.hideTipsPanel();
            }
        }
    }

    public onCloseZoomTips() {
        let _tipsTag = cv.TP.getTag();
        if (_tipsTag != null) {
            if (_tipsTag == "ZoomQuickFold_tips" ||
                _tipsTag == "Big_Card_Tips" ||
                _tipsTag == "ZoomQuickFold_tips2") {
                //cv.TP.remove();
                cv.TP.hideTipsPanel();
            }
        }

    }

    public updataSeatAction(isRun: boolean) {
        let isHide = cv.GameDataManager.tRoomData.isvirtual;

        for (let i = 0; i < this.seatList.length; ++i) {
            let pkSeat = this.seatList[i];
            if (pkSeat) {

                pkSeat.node.runAction(cc.show());
                pkSeat.node.stopActionByTag(777);
                if (pkSeat.getSeatViewId() == 0) {
                    pkSeat.node.opacity = 255;
                    pkSeat.node.active = true;
                } else {

                    if (isRun) {
                        let action = null;
                        if (isHide) {
                            pkSeat.node.opacity = 255;
                            action = cc.sequence(cc.fadeOut(1.0), cc.hide());
                        } else {
                            pkSeat.node.opacity = 0;
                            action = cc.sequence(cc.show(), cc.fadeIn(1.0));
                        }

                        action.setTag(777);
                        pkSeat.node.runAction(action);

                    } else {
                        pkSeat.node.active = !isHide;
                    }
                }
            }
        }
    }


    public quickSit() {
        if (this._isSeat == false) {
            let seat = this.getSeatBySeatViewId(0);
            if (seat && seat.getStatus() == cv.Enum.SeatStatus.SeatStatus_empty) {
                seat.onClickSelf(null);
            } else {

                for (let i = 0; i < this.seatList.length; ++i) {
                    let pkSeat = this.seatList[i];
                    if (pkSeat && pkSeat.getStatus() == cv.Enum.SeatStatus.SeatStatus_empty) {
                        pkSeat.onClickSelf(null);
                        break;
                    }
                }
            }
        } else if (cv.GameDataManager.tRoomData.is_quick_sit) {// 服务器参数调起时需要弹
            this.game.menu_Panel.getComponent(menu).onBtnBuyin(this._isSeat, false);
        }
    }

    /**
     * 更新牌背
     */
    public updateCardBack() {
        for (let i = 0; i < this.seatList.length; ++i) {
            let seat: Seat = this.seatList[i];
            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                seat.getCard(j).updateCardBack();
                seat.getShowCard(j).updateCardBack();
            }
        }

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].updateCardBack();
        }

        for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
            this.m_pkPublicCard[i].updateCardBack();
        }
    }

    /**
     * 更新牌面
     */
    public UpdateCardFace() {
        for (let i = 0; i < this.seatList.length; ++i) {
            let seat: Seat = this.seatList[i];
            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                seat.getCard(j).updateCard();
                seat.getShowCard(j).updateCard();
            }
        }

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].updateCard();
        }

        for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
            this.m_pkPublicCard[i].updateCard();
        }
    }

    public GetSelfCardType(out_hps?: number[], out_pps?: number[]): string {
        let strType: string = "";
        let hpokers: number[] = [];
        let ppokers: number[] = [];
        let game_mode: number = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            if (cv.Number(this.m_pkSelfCard[i].eCardNum) === 256) return "";
        }

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            if (this.m_pkSelfCard[i].node.active) {
                let card_num: number = this.m_pkSelfCard[i].eCardNum;
                let card_suit: number = this.m_pkSelfCard[i].eCardSuit;
                let poker: PokerData = new PokerData(game_mode);
                poker.initWhitValue(PokerData.getLocalValue(card_num, game_mode), card_suit, game_mode);
                hpokers.push(poker.getNumber(game_mode));
            }
        }

        for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
            if (this.m_pkPublicCard[i].node.active) {
                let card_num: number = this.m_pkPublicCard[i].eCardNum;
                let card_suit: number = this.m_pkPublicCard[i].eCardSuit;
                let poker: PokerData = new PokerData(game_mode);
                poker.initWhitValue(PokerData.getLocalValue(card_num, game_mode), card_suit, game_mode);
                ppokers.push(poker.getNumber(game_mode));
            }
        }

        if (this.isGamePLO()) {
            strType = PokerData.getPokerTypeString(hpokers, ppokers, game_mode, 2, 3, out_hps, out_pps);
        }
        else {
            strType = PokerData.getPokerTypeString(hpokers, ppokers, game_mode);
        }

        return strType;
    }

    /**
     * 标记奥马哈游戏自己成牌牌型(手牌+共牌)
     * @param isRecover 是否复原公牌标记(默认:false)
     * @returns 
     */
    public MarkSelfCardTypeForPlo(isRecover: boolean = false): void {
        // 非奥马哈或非自己
        if (!this.isGamePLO() || cv.GameDataManager.tRoomData.i32SelfSeat === -1) return;

        // 若是弃牌
        if (cv.GameDataManager.tRoomData.isSelfFold) {
            if (isRecover) {
                for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
                    let card: Card = this.m_pkPublicCard[i];
                    if (card.node.active && card.isFace()) {
                        card.setGary(false);
                    }
                }
            }
        }
        else {
            // 已翻牌且牌值有效
            if (!this.m_pkPublicCard[2].isFace() || !this.m_pkPublicCard[2].hasContent()) return;

            let out_hps: number[] = [];
            let out_pps: number[] = [];
            let game_mode: number = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;
            let poker: PokerData = new PokerData(game_mode);
            this.GetSelfCardType(out_hps, out_pps);

            // 检测手牌
            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                let card: Card = this.m_pkSelfCard[i];
                if (card.node.active && card.isFace()) {
                    card.setGary(true, 0xFF * 0.5);
                }
            }
            for (let i = 0; i < out_hps.length; ++i) {
                poker.initWithNumber(out_hps[i]);
                for (let j = 0; j < this.m_pkSelfCard.length; ++j) {
                    let card: Card = this.m_pkSelfCard[j];
                    let value: number = PokerData.getLocalValue(card.eCardNum, game_mode);
                    let color: number = card.eCardSuit;
                    if (poker.value === value && poker.color === color) {
                        card.setGary(false);
                        break;
                    }
                }
            }

            // 检测公牌
            for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
                let card: Card = this.m_pkPublicCard[i];
                if (card.node.active && card.isFace()) {
                    card.setGary(true, 0xFF * 0.5);
                }
            }
            for (let i = 0; i < out_pps.length; ++i) {
                poker.initWithNumber(out_pps[i]);
                for (let j = 0; j < this.m_pkPublicCard.length; ++j) {
                    let card: Card = this.m_pkPublicCard[j];
                    let value: number = PokerData.getLocalValue(card.eCardNum, game_mode);
                    let color: number = card.eCardSuit;
                    if (poker.value === value && poker.color === color) {
                        card.setGary(false);
                        break;
                    }
                }
            }
        }
    }

    /**
     * 标记奥马哈游戏他人赢方的成牌牌型(手牌升高)
     */
    public MarkOtherCardTypeForPlo(seaid: number): void {
        let seat: Seat = this.getSeatBySeverId(seaid);
        if (!this.isGamePLO() || !seat || !seat.isShowDown) return;

        let out_hps: number[] = [];
        let out_pps: number[] = [];
        let game_mode: number = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;
        let poker: PokerData = new PokerData(game_mode);
        this.GetOtherCardType(seat, out_hps, out_pps);

        // 他人赢方牌型文字变色
        let color: cc.Color = cc.color(0xFF, 0xEB, 0x00);
        let fileName: string = "game/dzpoker/ui_seaStyle/seat/common_shuzi_di_plo";
        seat.setCardTypeCtlInfo(color, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.zh_CN));

        // 检测手牌
        let turnDelay: number = 0.15;
        let moveDelay: number = 0.15;
        let moveEasyRate: number = 3;
        let moveOffset: cc.Vec2 = cc.v2(0, 20);
        let moveAnimFlag: boolean = false;
        for (let i = 0; i < seat.getHandsCardsCount(); ++i) {
            let card: Card = seat.getShowCard(i);
            if (card.node.active && card.isFace()) {
                let seq: cc.ActionInterval = cc.sequence(cc.delayTime(turnDelay), cc.callFunc((): void => { card.setGary(true, 0xFF * 0.5); }));
                card.rootNode.runAction(seq);
            }
        }
        for (let i = 0; i < out_hps.length; ++i) {
            poker.initWithNumber(out_hps[i]);
            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                let card: Card = seat.getShowCard(j);
                let value: number = PokerData.getLocalValue(card.eCardNum, game_mode);
                let color: number = card.eCardSuit;

                if (poker.value === value && poker.color === color) {
                    moveAnimFlag = true;
                    let dt: cc.ActionInterval = cc.delayTime(turnDelay);
                    let mb: cc.ActionInterval = cc.moveBy(moveDelay, moveOffset);
                    let eo: cc.ActionInterval = mb.easing(cc.easeOut(moveEasyRate));
                    card.rootNode.runAction(cc.sequence(dt, cc.callFunc((): void => { card.setGary(false); }), eo));
                    break;
                }
            }
        }

        // 若牌移动, 则座位昵称也一起移动("seat.resetCardTypeCtlInfo"方法会复原这些改变)
        if (moveAnimFlag) {
            let dt: cc.ActionInterval = cc.delayTime(turnDelay);
            let mb: cc.ActionInterval = cc.moveBy(moveDelay, moveOffset);
            let eo: cc.ActionInterval = mb.easing(cc.easeOut(moveEasyRate));
            seat.roleName_text.node.runAction(cc.sequence(dt, eo));
        }
    }

    public hideSelfCardAllInEffect() {
    }

    public leaveTable(pkPlayer: PlayerInfo) {
        if (pkPlayer) {
            pkPlayer.in_game = false;
            let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
            if (pkSeat) {
                pkSeat.setLeaveCdTime(pkPlayer.left_stay_time);
                pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_leave_a_monment);
                if (cv.dataHandler.getUserData().u32Uid === pkPlayer.playerid) {
                    this.backGame_button.active = true;
                    this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);

                    for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                        this.m_pkSelfCard[i].node.active = false;
                    }

                    this.gaopai.active = false;
                    // this.hideSelfCardAllInEffect();
                }
                cv.GameDataManager.tRoomData.m_isAllInMode = false;
                this.game.menu_Panel.getComponent(menu).updateMenu();
            }
            else {
                cv.TT.showMsg("can't find Seat:" + pkPlayer.seatid, cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    public UpdatePots() {
        let u32PotCount = cv.GameDataManager.tRoomData.pkTableStates.pots.length;
        let u32DeadPotAmount = 0;
        for (let i = 0; i < u32PotCount; ++i) {
            u32DeadPotAmount += cv.GameDataManager.tRoomData.pkTableStates.pots[i].amount;
        }
        if (u32PotCount >= 1) {
            this.dichiChip_text.node.active = true;
            this.mainpool_text.string = cv.StringTools.serverGoldToShowString(cv.GameDataManager.tRoomData.pkTableStates.pots[0].amount);
            //this.mainpool.tag = cv.GameDataManager.tRoomData.pkTableStates.pots[0].potid;
            this.mainpool.setContentSize(cc.size(this.getMainpoolWidth(), this.mainpool.getContentSize().height));
            this.mainpool.opacity = 255;
            this.mainpool.runAction(cc.show());

            for (let i = 1; i < u32PotCount; ++i) {
                if (i < 9) {
                    this.showSidepool(i, cv.GameDataManager.tRoomData.pkTableStates.pots[i].amount, cv.GameDataManager.tRoomData.pkTableStates.pots[i].potid, u32PotCount);
                } else {
                    console.log("Too many Side Pot.Not Show");
                }
            }
        }
        else {
            this.dichiChip_text.node.active = false;
            this.mainpool_text.string = "";
        }
        this.UpdateDeadPot(u32DeadPotAmount);
    }

    public showSidepool(num: number, money: number, u32Id: number, curSideNum: number) {
        if (num - 1 <= this.sidepoolList.length && num - 1 >= 0) {
            let moneyString = cv.StringTools.serverGoldToShowString(money);
            let chipNum = cc.find("chipNum_text", this.sidepoolList[num - 1]).getComponent(cc.Label);
            chipNum.string = moneyString

            if (moneyString.length >= 8) {
                chipNum.fontSize = 36;
            } else {
                chipNum.fontSize = 40;
            }

            this.sidepoolList[num - 1].name = u32Id.toString();
            let bDoMoveAction = false;  //是否产生分池动画
            if (this.node.getActionByTag(u32Id + this.GAME_SIDE_POT_TAG_BEGIN) == null) {

                if (!this.sidepoolList[num - 1].active) {
                    bDoMoveAction = true; //该分池是新产生的
                } else if (this.sidepoolList[num - 1].x == cc.winSize.width / 2 && num < curSideNum) {
                    bDoMoveAction = true;  //如果之前已经显示的分池是居中的，后面增加了分池。该分池也要复位移动
                }
            }

            if (bDoMoveAction) {
                let pkDealy = cc.delayTime(0.2);
                let pkCall = cc.callFunc(() => {
                    this.sidepoolList[num - 1].active = true;
                    let kPos: cc.Vec2 = this.sidepoolPosList[num - 1];
                    let x = 0;
                    let y = 0;
                    if (num == (curSideNum - 1) && (curSideNum - 1) % 2 != 0) {
                        //如果边池显示数量是奇数，最后一个边池要居中显示
                        x = cc.winSize.width / 2;
                        y = kPos.y;
                    } else {
                        x = kPos.x; y = kPos.y;
                    }

                    let pkMove = cc.moveTo(0.3, cc.v2(x, y));
                    this.sidepoolList[num - 1].setPosition(this.mainpool.getPosition());
                    this.sidepoolList[num - 1].runAction(pkMove);
                });

                let pkseq = cc.sequence(pkDealy, pkCall);
                pkseq.setTag(u32Id + this.GAME_SIDE_POT_TAG_BEGIN);
                this.node.runAction(pkseq);
            }

            // if (!this.sidepoolList[num - 1].active) {// 优化 减少定时器触发
            //     this.scheduleOnce((dt: number): void => {
            //         if (!this.sidepoolList[num - 1].active) {// 延时后实际控制 不能去除
            //             this.sidepoolList[num - 1].active = true;
            //             let kPos: cc.Vec2 = this.sidepoolPosList[num - 1];
            //             let pkMove = cc.moveTo(0.3, kPos);
            //             this.sidepoolList[num - 1].setPosition(this.mainpool.getPosition());
            //             this.sidepoolList[num - 1].runAction(pkMove);
            //         }
            //     }, 0.2);
            // }
        }
    }

    public UpdateDeadPot(deadAmout: number) {
        cv.GameDataManager.tGameData.u32DeadPot += deadAmout;

        if (cv.GameDataManager.tGameData.u32DeadPot == 0) {
            this.dichiChip_text.node.active = false;
        }
        else {
            this.dichiChip_text.node.active = true;
        }
        let dichiNum: number = cv.StringTools.numberToShowNumber(cv.StringTools.clientGoldByServer(cv.GameDataManager.tGameData.u32DeadPot));
        this.dichiChip_text.string = cv.StringTools.formatC(cv.config.getStringData("dichiNum"), dichiNum);
    }

    public SetTableInfo() {
        this.UpdatePots();

        if (cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
            this.DrunAction(cv.GameDataManager.tRoomData.pkTableStates.curr_dealer_seatid);
        }
        else {
            this.mainpool.opacity = 0;
        }

        for (let i = 0; i < 5; ++i) {
            this.m_pkPublicCard[i].setFace(false);
            this.m_pkPublicCard[i].node.active = false;
        }

        for (let i = 0; i < cv.GameDataManager.tRoomData.pkTableStates.public_card.length; ++i) {
            this.m_pkPublicCard[i].setFace(true);
            let kCard: CardItem = cv.GameDataManager.tRoomData.pkTableStates.public_card[i];
            this.QueckShowPublicCard(i, kCard.number, kCard.suit);
            this.DealDown();
        }
    }

    public setSeatInfo(pkPlayer: PlayerInfo) {
        if (pkPlayer) {
            let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
            if (pkSeat) {
                pkSeat.showChipsNow(pkPlayer.round_bet);
                if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                    if (pkPlayer.in_game) {
                        pkSeat.hideTips();
                        for (let i = 0; i < pkPlayer.cards.length; ++i) {
                            let kCard: CardItem = pkPlayer.cards[i];
                            this.m_pkSelfCard[i].node.active = true;
                            this.m_pkSelfCard[i].setContent(kCard.number, kCard.suit);
                            this.m_pkSelfCard[i].setFace(!(cv.Number(kCard.number) === 256));
                            this.m_pkSelfCard[i].setHighLight(false);
                            this.m_pkSelfCard[i].setGary(false);
                            this.m_pkSelfCard[i].resetPos();
                            this.m_pkSelfCard[i].setEye(this.m_pkSelfCard[i].isEye());
                        }
                        this.DealDown();
                    }
                }
                else {
                    if (pkPlayer.in_game) {
                        pkSeat.hideTips();
                        if (pkPlayer.last_action != cv.Enum.ActionType.Enum_Action_Fold) {
                            for (let i = 0; i < pkSeat.getHandsCardsCount(); ++i) {
                                pkSeat.getCard(i).node.active = true;
                            }

                            for (let i = 0; i < pkPlayer.cards.length; ++i) {
                                let kCard: CardItem = pkPlayer.cards[i];
                                pkSeat.getShowCard(i).setContent(kCard.number, kCard.suit);
                            }
                        }
                        else {
                            for (let i = 0; i < pkSeat.getHandsCardsCount(); ++i) {
                                pkSeat.getCard(i).node.active = false;
                            }
                        }
                    }
                    else {
                        if (!pkPlayer.inStay) {
                            pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting);
                        }
                    }
                }
                if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                    console.log(pkPlayer.last_action);
                }

                if (pkPlayer.last_action == cv.Enum.ActionType.Enum_Action_Allin) {
                    this.addAllinPlayerWinRate(pkPlayer.seatid);
                }

                switch (pkPlayer.last_action) {
                    case cv.Enum.ActionType.Enum_Action_Null: {
                        console.log(pkPlayer.inStay);
                        console.log(pkPlayer.in_game);
                        console.log(pkPlayer.isGameEnd);
                        if (!pkPlayer.inStay && (pkPlayer.in_game || pkPlayer.isGameEnd)) {
                            pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Null);
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_AddActionTime: {
                        pkSeat.stopBlink();
                        //自己的延时显示在操作按钮上，别人的显在头像上
                        if (pkPlayer.playerid != cv.dataHandler.getUserData().u32Uid) {
                            pkSeat.showAddTimeAction();
                        }
                        if (!pkPlayer.inStay && pkPlayer.in_game) {
                            pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Null);
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Check: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Check);
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Fold: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Fold);
                        if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                            cv.GameDataManager.tRoomData.m_isAllInMode = false;
                            cv.GameDataManager.tRoomData.isSelfFold = true;
                            this.game.menu_Panel.getComponent(menu).updateMenu();

                            for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
                                this.m_pkSelfCard[i].setGary(true)
                            }
                        }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Call: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Call);
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Bet: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Bet);
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Raise: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Raise);
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Allin: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Allin);
                        // if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                        //     this.showSelfCardAllInEffect();
                        // }
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Straddle: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Straddle);
                    } break;

                    case cv.Enum.ActionType.Enum_Action_Post: {
                        pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Post);
                    } break;

                    default:
                        break;
                }

            } else {
                cv.TT.showMsg("can't find Seat:" + pkPlayer.seatid, cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    public showSelfCardAllInEffect() {
    }

    public QueckShowPublicCard(u32Index: number, eNum: number, eSuit: number) {

        if (u32Index >= 0 && u32Index <= 4) {
            this.m_pkPublicCard[u32Index].setContent(eNum, eSuit);
            this.m_pkPublicCard[u32Index].setFace(true);
            this.m_pkPublicCard[u32Index].node.active = true;
            this.m_pkPublicCard[u32Index].node.setPosition(cc.v2(this.publicPos.x + u32Index * this.publicCard_hgp, this.publicPos.y));
            this.m_pkPublicCard[u32Index].resetPos();
        }
    }

    public showSelfCardType() {
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            this.gaopai.active = true;
            cc.find("Label", this.gaopai).getComponent(cc.Label).string = this.GetSelfCardType();
        }
        else {
            this.gaopai.active = false;
        }
    }

    public DealDown() {
        this.showSelfCardType();
        this.MarkSelfCardTypeForPlo();

        for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
            if (this.m_pkPublicCard[i].node.active) {
                this.m_pkPublicCard[i].resetPos();
                this.m_pkPublicCard[i].setFace(true);
                this.m_pkPublicCard[i].setOp(false);
            }
        }

        for (let i = 0; i < this.seatList.length; ++i) {
            let pkSeat: Seat = this.getSeatBySeverId(i);
            if (pkSeat.isShowDown) {
                pkSeat.showCardType(this.GetOtherCardType(pkSeat));
            }
        }
    }

    public GetOtherCardType(pkSeat: Seat, out_hps?: number[], out_pps?: number[]): string {
        let hpokers: number[] = [];
        let ppokers: number[] = [];
        let game_mode: number = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;
        let cardType: string = "";

        for (let j = 0; j < pkSeat.getHandsCardsCount(); ++j) {
            if (pkSeat.getShowCard(j).node.active) {
                let card_num: number = pkSeat.getShowCard(j).eCardNum;
                let card_suit: number = pkSeat.getShowCard(j).eCardSuit;
                let poker: PokerData = new PokerData(game_mode);
                poker.initWhitValue(PokerData.getLocalValue(card_num, game_mode), card_suit, game_mode);
                hpokers.push(poker.getNumber(game_mode));
            }
        }

        for (let j = 0; j < this.m_pkPublicCard.length; ++j) {
            if (this.m_pkPublicCard[j].node.active) {
                let card_num: number = this.m_pkPublicCard[j].eCardNum;
                let card_suit: number = this.m_pkPublicCard[j].eCardSuit;

                let poker: PokerData = new PokerData(game_mode);
                poker.initWhitValue(PokerData.getLocalValue(card_num, game_mode), card_suit, game_mode);
                ppokers.push(poker.getNumber(game_mode));
            }
        }

        if (this.isGamePLO()) {
            cardType = PokerData.getPokerTypeString(hpokers, ppokers, game_mode, 2, 3, out_hps, out_pps);
        }
        else {
            cardType = PokerData.getPokerTypeString(hpokers, ppokers, game_mode);
        }

        return cardType;
    }

    public recetAllSeats() {
        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            this.seatList[i].updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_empty);
        }
        cv.GameDataManager.tRoomData.i32SelfSeat = -1;
        this._isSeat = false;
    }

    public setControlButtonStatus(status: number) {
        this.actionButtonStatus = status;
        console.log("setControlButtonStatus:::" + status);
        this.actionButtonView.active = true;
        this.addTime_button.active = true;
        this.damon_img.active = true;
        //cv.resMgr.setSpriteFrame(this.freeFill_button_img, this.midBigButton);
        this.markNode(this.freeFill_button_img, "midBigButton");
        this.freeFill_button.interactable = true;
        this.freeFill_button.node.zIndex = 102;
        this.freeFill_button_img.zIndex = 102;
        this.sliderBg.active = true;
        //强制隐藏自油加注条
        this.freeSlider.node.opacity = 0;
        this.sliderBg.opacity = 0;
        this.actionButtonView_2.active = true;
        this.freeSliderText.node.active = false;
        this.freeSliderText_bg.active = false;
        this.freeSlider.progress = 0;
        this.sliderAllin.active = false;
        this.percent_img.active = false;

        if (this._onclickSliderDown) {
            // this.hideSelfCardAllInEffect();
            this._onclickSliderDown = false;
        }

        switch (status) {
            case cv.Enum.ActionButtonStatus.Control_Bet:
                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkImg);
                this.markNode(this.followFill_Blue.node, "checkImg");
                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);

                this.markNode(this.giveUpRed.node, "giveUpImg");
                this.followFill_text.node.active = false;

                this.freeFill_button.node.active = true;
                this.freeFill_button_img.active = true;
                this.dichi_button0.node.active = true;
                this.dichi_button1.node.active = true;
                this.dichi_button1_2.node.active = true;
                this.dichi_button2.node.active = true;
                this.SetExtraBetBtnVisible(true);

                this.hitback_left.active = false;
                this.hitback_upper_left.active = false;
                this.hitback_upper_right.active = false;

                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).onlyShowChouma();
                } else {
                    this.getSeatBySeatViewId(0).onlyShowChouma();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_Raise:

                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callImg);
                this.markNode(this.followFill_Blue.node, "callImg");
                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                this.markNode(this.giveUpRed.node, "giveUpImg");

                this.followFill_text.node.active = true;

                this.freeFill_button.node.active = true;
                this.freeFill_button_img.active = true;
                this.dichi_button0.node.active = true;
                this.dichi_button1.node.active = true;
                this.dichi_button1_2.node.active = true;
                this.dichi_button2.node.active = true;
                this.SetExtraBetBtnVisible(true);

                this.hitback_left.active = false;
                this.hitback_upper_left.active = false;
                this.hitback_upper_right.active = false;

                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).onlyShowChouma();
                } else {
                    this.getSeatBySeatViewId(0).onlyShowChouma();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_AllIn:

                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.midSmallButton);
                this.markNode(this.followFill_Blue.node, "midSmallButton");
                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);

                this.markNode(this.giveUpRed.node, "giveUpImg");
                this.followFill_Blue.node.active = true;
                this.followFill_text.node.active = false;
                this.followFill_text.getComponent(cc.Label).string = "";

                this.freeFill_button.node.active = false;
                this.freeFill_button_img.active = false;

                this.dichi_button0.node.active = false;
                this.dichi_button1.node.active = false;
                this.dichi_button1_2.node.active = false;
                this.dichi_button2.node.active = false;
                this.SetExtraBetBtnVisible(false);
                this.sliderBg.active = false;
                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).setSitDownView();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_Just_Call:
                this.sliderBg.active = false;
                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callImg);
                this.markNode(this.followFill_Blue.node, "callImg");
                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                this.markNode(this.giveUpRed.node, "giveUpImg");
                this.followFill_text.node.active = true;
                this.dichi_button0.node.active = false;
                this.dichi_button1.node.active = false;
                this.dichi_button1_2.node.active = false;
                this.dichi_button2.node.active = false;
                this.SetExtraBetBtnVisible(false);
                this.freeFill_button.node.active = false;
                this.freeFill_button_img.active = false;

                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).setSitDownView();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck:
                this.sliderBg.active = false;
                if (this.giveUp_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpLookImg);
                    this.markNode(this.giveUpRed.node, "giveUpLookImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpLookGrayImg);
                    this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpLookGrayImg");
                }
                if (this.followFill_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkImg);
                    this.markNode(this.followFill_Blue.node, "checkImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                    this.markNode(this.followFill_Blue.node, "checkGrayImg");
                }

                this.dichi_button0.node.active = false;
                this.dichi_button1.node.active = false;
                this.dichi_button1_2.node.active = false;
                this.dichi_button2.node.active = false;
                this.SetExtraBetBtnVisible(false);
                this.freeFill_button.node.active = false;
                this.freeFill_button_img.active = false;
                this.followFill_text.node.active = false;
                this.addTime_button.active = false;
                this.damon_img.active = false;
                this.hideThankCD();
                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).setSitDownView();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_Default_Call:
                this.sliderBg.active = false;
                if (this.giveUp_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                    this.markNode(this.giveUpRed.node, "giveUpImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpGrayImg);
                    this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpGrayImg");
                }
                if (this.followFill_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callImg);
                    this.markNode(this.followFill_Blue.node, "callImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callGrayImg);
                    this.markNode(this.followFill_Blue.node, "callGrayImg");
                }

                this.dichi_button0.node.active = false;
                this.dichi_button1.node.active = false;
                this.dichi_button1_2.node.active = false;
                this.dichi_button2.node.active = false;
                this.SetExtraBetBtnVisible(false);
                this.freeFill_button.node.active = false;
                this.freeFill_button_img.active = false;
                this.followFill_text.node.active = true;
                this.addTime_button.active = false;
                this.damon_img.active = false;
                this.hideThankCD();
                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).setSitDownView();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                this.sliderBg.active = false;
                this.dichi_button0.node.active = false;
                this.dichi_button1.node.active = false;
                this.dichi_button1_2.node.active = false;
                this.dichi_button2.node.active = false;
                this.SetExtraBetBtnVisible(false);
                this.freeFill_button.node.active = true;
                this.freeFill_button_img.active = true;
                this.freeFill_button.interactable = true;
                //cv.resMgr.setSpriteFrame(this.freeFill_button_img, this.midSmallButton);
                this.markNode(this.freeFill_button_img, "midSmallButton");
                this.hideThankCD();
                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).onlyShowChouma();
                } else {
                    this.getSeatBySeatViewId(0).onlyShowChouma();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_AllInOrFold:
                this.sliderBg.active = false;

                if (this.giveUp_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                    this.markNode(this.giveUpRed.node, "giveUpImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpGrayImg);
                    this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpGrayImg");
                }
                if (this.followFill_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.allInImg);
                    this.markNode(this.followFill_Blue.node, "allInImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.allInGrayImg);
                    this.markNode(this.followFill_Blue.node, "allInGrayImg");
                }
                this.dichi_button0.node.active = false;
                this.dichi_button1.node.active = false;
                this.dichi_button1_2.node.active = false;
                this.dichi_button2.node.active = false;
                this.SetExtraBetBtnVisible(false);
                this.freeFill_button.node.active = false;
                this.freeFill_button_img.active = false;
                this.followFill_text.node.active = false;
                this.hideThankCD();
                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).setSitDownView();
                }
                break;
            case cv.Enum.ActionButtonStatus.Control_Null:
                this.giveUp_buttonIsCheck = false;
                this.followFill_buttonIsCheck = false;
                this.actionButtonView.active = false;
                this.actionButtonView_2.active = false;
                this.addTime_button.active = false;
                this.damon_img.active = false;
                this.sliderBg.active = false;
                if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat).setSitDownView();
                }
                this.hideThankCD();
                break;
            default:
                break;
        }

        // 每次下注按钮状态变更时: 更新礼物入口显示状态
        this.setGiftActive(!this.addTime_button.active);
    }

    public hideThankCD() {
        cc.find("particlesystem", this.practil_panel).getComponent(cc.ParticleSystem).stopSystem();
        this.unschedule(this.updateThink);
        this.thinkCdTime_text.node.active = false;
        this.thankProgressBar.node.active = false;
        this.practil_panel.active = false;

    }
    public getSeatBySeatViewId(viewId: number): Seat {
        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            if (this.seatList[i].getSeatViewId() == viewId) return this.seatList[i];
        }
        return null;
    }
    public SetExtraBetBtnVisible(isVisible: boolean) {
        if (!this.game.changeCard_panel.getComponent("ChangeCard").isButton3) {
            this.dichi_button3.node.active = isVisible;
            this.dichi_button4.node.active = isVisible;
        }
        else {
            this.dichi_button3.node.active = false;
            this.dichi_button4.node.active = false;
        }
    }
    public showReplay(pSend: any) {
        if (this.roomHasEnd) return;
        /*if (_GameReplay == null)
        {
            _GameReplay = GameReplay::createLayer();
            addChild(_GameReplay);
        }
     
        _GameReplay.setVisible(true);
        _GameReplay.LoadAll(_allReview_panel.GetCurrentUUID());*/
    }

    public showAudit(value: any) {
        let gameReportNode: cc.Node = Audit.getSinglePrefabInst(this.prefab_report);
        if (value) {
            let game_Audit = gameReportNode.getComponent(Audit);
            let scene = cc.director.getScene();
            game_Audit.autoShow(scene, null, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        } else {
            let game_Audit = gameReportNode.getComponent(Audit);
            game_Audit.autoHide();
        }
    }

    public setShowAudit(isShow: boolean) {
        this._isShowAudit = isShow;
        if (this.game.allreview_panel) {
            this.game.allreview_panel.getComponent(GameReview).setShowAudit(this._isShowAudit);
        }
    }

    public showDelay(pSend: any) {
        /*_menu_Panel . setVisible(false);
        _houseOwer_panel . setVisible(true);
    
        _lefttime . setString(StringUtils:: format("%d", g_pkDataManager . getRoom() . u32DelayLeft));*/
    }
    public onSitDownSucc(playerid: number) {
        let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(playerid);
        this.playerSitDown(pkPlayer, true);
        if (this.isGameStarSeat()) {
            this.setSeatViewStyle();
            let seat: Seat = this.getSeatByUid(pkPlayer.playerid);
            if (seat && seat.getData().identity == 1) {
                seat.playSitDownAction();
                if (pkPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                    if (pkPlayer.liveStatus == 1) {
                        AgoraSdk.enableLocalVideo(true);
                    }
                    if (pkPlayer.mikeMode == 1) {
                        AgoraSdk.enableLocalAudio(true);
                    }
                }
            }
        }
    }
    public playerSitDown(pkPlayer: PlayerInfo, isMove: boolean = false) {
        if (pkPlayer) {
            let u32SeatId = pkPlayer.seatid;
            let u32Uid = pkPlayer.playerid;

            if (u32Uid === cv.dataHandler.getUserData().u32Uid) {
                cv.GameDataManager.tRoomData.i32SelfSeat = u32SeatId;
                cv.GameDataManager.tRoomData.u32PrePickSeatId = -1;
                this.face_button.active = this.isShowFaceBtn();
                this.setFaceBtnEnabled(true);
                this.setRecordEnabled(true);
                if (this.isZoom()) {
                    this.setWaitAction(!pkPlayer.in_game);
                }
            }

            let pkSeat: Seat = this.getSeatBySeverId(u32SeatId);
            if (pkSeat) {
                if (u32Uid === cv.dataHandler.getUserData().u32Uid) {
                    cv.GameDataManager.tRoomData.isBuyin = true;
                    this.setShowAudit(true);
                    this._isSeat = true;

                    this.turnSeat(pkSeat.getSeatViewId(), isMove);
                    if (!cv.dataHandler.getUserData().m_bIsReconnect && !this.m_bIsInit) {
                        if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_random_seat === 1) {
                            cv.TT.showMsg(cv.config.getStringData("ErrorToast23"), cv.Enum.ToastType.ToastTypeInfo);
                        }
                    }
                    cv.dataHandler.getUserData().m_bIsReconnect = false;

                    this.m_u32DelayTimeCount = 0;
                    if (cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount < 9) {
                        if (cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee.length != 0) {
                            let fee: FeeItem = cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee[cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount];
                            this.addTime_text.string = cv.StringTools.serverGoldToShowString(fee.needCoin);
                        }
                    }
                }

                pkSeat.setData(pkPlayer);
                pkSeat.setSeatViewId(pkSeat.getSeatViewId(), cv.GameDataManager.tRoomData.pkRoomParam.player_count_max);

                pkSeat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting, cv.Enum.ActionType.Enum_Action_Null);
                pkSeat.updateStyle();
                if (u32Uid == cv.dataHandler.getUserData().u32Uid) {
                    if (this.isZoom()) {
                        this.updataSeatAction(false);
                    }
                }

                // 有人坐下时, 检测礼物模块座位逻辑
                this.initGiftStarInfo(pkPlayer, true);
            }
            else {
                let len = this.seatList.length;
                if (len > 0) {
                    cv.TT.showMsg("can't find Seat(" + u32SeatId + ")", cv.Enum.ToastType.ToastTypeError);
                }
            }
        }
    }

    public turnSeat(seatViewId: number, isNeedActoin: boolean) {
        if (this.game.gameSeatIsTurning) {
            return;
        }
        this.trunIngSeatViewId = seatViewId;

        // if (this.getSeatBySeatViewId(seatViewId).getStatus() != cv.Enum.SeatStatus.SeatStatus_empty) {
        //     this.showRoleInfo(this.getSeatBySeatViewId(seatViewId).getSeverId());
        //     return;
        // }

        let len = this.seatList.length;
        let mid = (len + 1) / 2;
        //不转
        if (this.trunIngSeatViewId == 0) {
            if (cv.GameDataManager.tRoomData.i32SelfSeat == -1) {
                this.turnEndStandup();
            } else {
                this.turnEndSitDown();
            }
            return;
        }
        //向右转
        else if (this.trunIngSeatViewId >= mid) {
            this.isRight = true;
        }
        //向左转
        else {
            this.isRight = false;
        }

        if (isNeedActoin && !this.isZoom()) {
            this.modal_panel.active = true;
            this.game.gameSeatIsTurning = true;
            this.startTurning();
        }
        else {
            this.startTurningWithNoAction();
        }
    }
    public startTurning(time: number = 0.2) {
        let len = this.seatList.length;
        this.isTurnSeat = true;

        let posS: cc.Vec2[] = this.postList[len - 2];
        for (let i = 0; i < len; i++) {
            let moveIndex;
            let SeatId = this.seatList[i].getSeatViewId();
            if (this.isRight) {
                moveIndex = SeatId + 1 == len ? 0 : SeatId + 1;
            }
            else {
                moveIndex = SeatId - 1 == -1 ? len - 1 : SeatId - 1;
            }
            this.seatList[i].node.stopAllActions();
            if (i == len - 1) {
                let action = cc.moveTo(time, cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                let callBack = cc.callFunc(this.turnIngCallBack.bind(this), this);

                this.seatList[i].node.runAction(cc.sequence(action, callBack));
                this.seatList[i].setSeatViewId(moveIndex, len);
            }
            else {
                let action = cc.moveTo(time, cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                this.seatList[i].node.runAction(action);
                this.seatList[i].setSeatViewId(moveIndex, len);
            }
        }
    }
    public turnIngCallBack() {
        let len = this.seatList.length;
        if (this.isRight) {

            this.trunIngSeatViewId += 1;
            if (this.trunIngSeatViewId < len) {
                this.startTurning();
            }
            else {
                this.game.gameSeatIsTurning = false;
                this.modal_panel.active = false;
                this.turnEndSitDown();
                if (cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
                    this.DrunAction(cv.GameDataManager.tGameData.i32DealerSId);
                }
            }
        }
        else {
            this.trunIngSeatViewId -= 1;
            if (this.trunIngSeatViewId > 0) {
                this.startTurning();
            }
            else {
                this.game.gameSeatIsTurning = false;
                this.modal_panel.active = false;
                this.turnEndSitDown();
                if (cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
                    this.DrunAction(cv.GameDataManager.tGameData.i32DealerSId);
                }
            }
        }
    }
    public DrunAction(SeatdId: number, time: number = 0.2) {
        let Seat: Seat = this.getSeatBySeverId(SeatdId);
        let starOffset = 22;
        if (Seat) {
            let endPosWorld: cc.Vec2 = cc.Vec2.ZERO;
            Seat.selfChipsText_img.parent.convertToWorldSpaceAR(Seat.selfChipsText_img.getPosition(), endPosWorld);
            let endPos: cc.Vec2 = cc.Vec2.ZERO;
            this.D_img.parent.convertToNodeSpaceAR(endPosWorld, endPos);
            //let endPos: cc.Vec2 = cc.v2(this.postList[this.roomPlayerNumber - 2][Seat.getSeatViewId()].x, this.postList[this.roomPlayerNumber - 2][Seat.getSeatViewId()].y);
            let directon = Seat.getDrection();
            let offsetX = 130;
            this.D_img.active = true;
            this.D_img.stopAllActions();
            let chipBgSize = Seat.getChipsbgSize();
            if (directon == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN || directon == cv.Enum.SeatDriction.DRICTION_LEFT_UP) {
                if (Seat.getSeatViewId() == 2 && !cv.config.IS_WIDESCREEN) {
                    if (this.isGameStarSeat()) {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x + chipBgSize.width / 2 - this.D_img.getContentSize().width / 2, endPos.y - this.D_img.getContentSize().height / 1.5 - chipBgSize.height / 2)));
                    } else {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x + chipBgSize.width / 2 - this.D_img.getContentSize().width / 2, endPos.y - this.D_img.getContentSize().height / 1.5 - chipBgSize.height / 2)));
                    }
                }
                else {
                    if (this.isGameStarSeat()) {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x + offsetX - 15 + starOffset, endPos.y)));
                    } else {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x + offsetX - 15, endPos.y)));
                    }

                }
            }
            else if (directon == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || directon == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                if (Seat.getSeatViewId() == this.roomPlayerNumber - 2 && !cv.config.IS_WIDESCREEN) {
                    if (this.isGameStarSeat()) {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x - chipBgSize.width / 2 + this.D_img.getContentSize().width / 2, endPos.y - this.D_img.getContentSize().height / 1.5 - chipBgSize.height / 2)));
                    } else {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x - chipBgSize.width / 2 + this.D_img.getContentSize().width / 2, endPos.y - this.D_img.getContentSize().height / 1.5 - chipBgSize.height / 2)));
                    }
                }
                else {
                    if (this.isGameStarSeat()) {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x - offsetX + 15 - starOffset, endPos.y)));
                    } else {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x - offsetX + 15, endPos.y)));
                    }

                }
            }
            else if (directon == cv.Enum.SeatDriction.DRICTION_TOP_LEFT || directon == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
                if (this.isGameStarSeat()) {
                    if (Seat.getViewStyle() == 2) {
                        let offsetPos = Seat.selfChipsText_img.convertToWorldSpaceAR(cc.Vec2.ZERO);
                        let offsetPos2 = cc.Vec2.ZERO;
                        this.D_img.parent.convertToNodeSpaceAR(offsetPos, offsetPos2);
                        let wid = Seat.selfChipsText_img.getContentSize().width;
                        let dWidth = this.D_img.getContentSize().width;
                        this.D_img.runAction(cc.moveTo(time, cc.v2(offsetPos2.x - wid / 2 - dWidth, offsetPos2.y)));
                    } else {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x + offsetX - 15 + starOffset, endPos.y - starOffset)));
                    }

                } else {
                    this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x + offsetX - 15, endPos.y)));
                }
            }
            else if (directon == cv.Enum.SeatDriction.DRICTION_BOTTOM) {
                if (this.isGameStarSeat()) {
                    if (Seat.getViewStyle() == 2) {
                        let offsetPos = Seat.selfChipsText_img.convertToWorldSpaceAR(cc.Vec2.ZERO);
                        let offsetPos2 = cc.Vec2.ZERO;
                        this.D_img.parent.convertToNodeSpaceAR(offsetPos, offsetPos2);
                        let wid = Seat.selfChipsText_img.getContentSize().width;
                        let dWidth = this.D_img.getContentSize().width;
                        this.D_img.runAction(cc.moveTo(time, cc.v2(offsetPos2.x - wid / 2 - dWidth, offsetPos2.y)));
                    } else {
                        this.D_img.runAction(cc.moveTo(time, cc.v2(endPos.x - 108 - starOffset, endPos.y - starOffset)));
                    }
                } else {
                    //我的头像位置，自己的金币框位置是动态变化的，所以用role_img参照
                    let endPosWorld: cc.Vec2 = cc.Vec2.ZERO;
                    Seat.role_img.node.parent.convertToWorldSpaceAR(Seat.role_img.node.getPosition(), endPosWorld);
                    let endPos: cc.Vec2 = cc.Vec2.ZERO;
                    this.D_img.parent.convertToNodeSpaceAR(endPosWorld, endPos);

                    if (this.isGamePLO()) {
                        let tmpPos: cc.Vec2 = cc.Vec2.ZERO;
                        let tmpNode: cc.Node = this.m_pkSelfCard[0].node;
                        tmpNode.parent.convertToWorldSpaceAR(tmpNode.getPosition(), tmpPos);
                        let dis: number = (endPosWorld.y - tmpPos.y) / 2;

                        endPos.x -= 118;
                        endPos.y -= dis;
                    }
                    else {
                        endPos.x -= 118;
                        endPos.y -= 80
                    }

                    this.D_img.runAction(cc.moveTo(time, cc.v2(endPos)));
                }
            }
        }
    }
    public startTurningWithNoAction() {
        let len = this.seatList.length;
        let posS: cc.Vec2[] = this.postList[len - 2];
        let hgp = 0;
        for (let i = 0; i < len; i++) {
            let moveIndex;
            let SeatId = this.seatList[i].getSeatViewId();
            if (this.isRight) {
                hgp = len - this.trunIngSeatViewId;
                moveIndex = SeatId + hgp >= len ? SeatId + hgp - len : SeatId + hgp;
            }
            else {
                hgp = this.trunIngSeatViewId;
                moveIndex = SeatId - hgp <= -1 ? len + SeatId - hgp : SeatId - hgp;
            }
            this.game.gameSeatIsTurning = false;
            this.seatList[i].node.stopAllActions();

            if (i == len - 1) {
                this.seatList[i].node.setPosition(cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                this.seatList[i].setSeatViewId(moveIndex, len);
            }
            else {
                this.seatList[i].node.setPosition(cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                this.seatList[i].setSeatViewId(moveIndex, len);
            }
        }
        if (cv.GameDataManager.tRoomData.i32SelfSeat == -1) {
            this.turnEndStandup();
        } else {
            this.turnEndSitDown();
        }

    }
    public turnEndSitDown() {
        this.isTurnSeat = false;
        this.record_button.active = this.isShowRecord(); //true;

        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            this.seatList[i].OnUpdate_remarks();
            this.seatList[i].setSeatViewId(this.seatList[i].getSeatViewId(), this.roomPlayerNumber);
        }

        let pkSelf: Seat = this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
        if (pkSelf) {
            this._isSeat = true;
            let pkSelfCard = this.getPkSelfCard();
            if (!this.isGameStarSeat() && pkSelfCard && pkSelfCard[0].node.active) {
                pkSelf.updateChipPosBySeatStatus(true); //选中位置太远的位置，当位置转圈完成后，已经发了手牌的情况下，重置金币框位置
            }
        }

        let curGameId = cv.roomManager.getCurrentGameID();

        if (curGameId == cv.Enum.GameId.Bet || (curGameId == cv.Enum.GameId.Texas && cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short && cv.GameDataManager.tRoomData.pkRoomParam.auto_withdraw)) {
            this.autoBuyinEff();
        }

        // 旋转座位动画完毕, 更新礼物模块"小icon入口"状态
        this.updateGiftSmallIconStatus();
    }

    public getSeatBySeverId(severId: number): Seat {

        if (!this.seatList) {
            return null;
        }

        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            if (this.seatList[i].getSeverId() == severId) return this.seatList[i];
        }
        return null;
    }

    public setTableName() {

        let roomName: string = "";
        if (this.isGameStarSeat()) {
            //明星座
            let _name = cv.GameDataManager.tRoomData.pkRoomParam.tableTitle;
            var roomArray = _name.split('#');
            if (cv.Enum.LANGUAGE_TYPE.zh_CN == cv.config.getCurrentLanguage()) { //中文
                roomName = roomArray[0];
            } else if (cv.Enum.LANGUAGE_TYPE.en_US == cv.config.getCurrentLanguage()) { //英文
                roomName = roomArray[1];
            } else if (cv.Enum.LANGUAGE_TYPE.yn_TH == cv.config.getCurrentLanguage()) {  //越南文
                roomName = roomArray[2];
            } else { //其它默认设置为英文
                roomName = roomArray[1];
            }
        } else {
            roomName = cv.GameDataManager.tRoomData.pkRoomParam.game_name;
        }

        if (cv.GameDataManager.tRoomData.pkRoomParam.manual_created) {
            cc.find("pokerName_text", this.node).getComponent(cc.Label).string = roomName;
        }
        else {
            let name = cv.tools.displayChineseName(roomName);
            cc.find("pokerName_text", this.node).getComponent(cc.Label).string = name;
        }
    }

    public setRoomData() {
        this.setTableName();
        let blinds: string;
        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            if (this.isZoom()) {
                this.markWaterMark(this.short_pai, "game_zoom_short");
                //cv.resMgr.setSpriteFrame(this.short_pai, cv.config.getLanguagePath("game/dzpoker/ui/watermark/game_zoom_short"));
            }
            else {
                this.markWaterMark(this.short_pai, "common_duanpai");
                //cv.resMgr.setSpriteFrame(this.short_pai, cv.config.getLanguagePath("game/dzpoker/ui/watermark/common_duanpai"));
            }
            this.short_pai.active = true;
        }
        else {
            if (this.isZoom()) {
                this.markWaterMark(this.short_pai, "game_zoom");
                //cv.resMgr.setSpriteFrame(this.short_pai, cv.config.getLanguagePath("game/dzpoker/ui/watermark/game_zoom"));
                this.short_pai.active = true;
            }
            else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet) {
                this.markWaterMark(this.short_pai, "game_bet");
                //cv.resMgr.setSpriteFrame(this.short_pai, cv.config.getLanguagePath("game/dzpoker/ui/watermark/game_bet"));
                this.short_pai.active = true;
            }
            else {
                this.short_pai.active = false;
            }
        }

        this.setCriticsimSFlag();

        let adaptY = cv.config.HEIGHT / cv.config.DESIGN_HEIGHT;
        let alpha = 255;
        let posX = cc.winSize.width / 2;
        let height = 695 * adaptY;
        let iconZize = 100;
        let iconNum = 1;
        let anteNum = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount);
        let color = cc.color(77, 77, 77);
        if (cv.GameDataManager.tRoomData.pkRoomParam.is_associated_jackpot)//控制壮态栏显示
        {
            cv.StatusView.updateSystemTimePos(true);
            this.showJackPotNumPanel();
        }
        else {
            cv.StatusView.updateSystemTimePos(false);
            // _jackPotNumPanel.setVisible(false);
            this.game.jackPotPanel.active = false
        }

        let needcoin = 0;

        let len = cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCountsFee.length;//制强亮牌
        if (len > 1) {
            for (let i = 0; i < len; i++) {
                if ((cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCountsFee[i].startCount <= cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCount + 1) && (cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCount + 1 <= cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCountsFee[i].endCount)) {
                    needcoin = cv.GameDataManager.tRoomData.pkPayMoneyItem.showCardCountsFee[i].needCoin;
                    this.forceShowCard_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(needcoin));
                    let labelWidth = cv.resMgr.getLabelStringSize(this.forceShowCard_text).width;
                    this.showcardDamon_img.setPosition(-labelWidth / 2 - 2, this.showcardDamon_img.getPosition().y);
                    this.forceShowCard_text.node.setPosition(this.showcardDamon_img.getContentSize().width / 2 * this.showcardDamon_img.scale + 2, this.forceShowCard_text.node.getPosition().y);
                    break;
                }
            }
        }

        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            blinds = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
            let splitArr: string[] = blinds.split("/");
            let bigBlind = Number(splitArr[1]);
            let gameBlind: string = cv.config.getStringData("UIGameBlind");
            blinds = gameBlind.replace("%s", blinds);

            if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle) {
                let cbStraddle = cv.StringTools.times(Number(bigBlind), 2.0);
                blinds = cv.StringTools.formatC("%s/%s", blinds, cbStraddle.toString());
            }

            if (anteNum) {
                iconNum += 1;
                blinds = blinds + cv.StringTools.formatC("(%f)", cv.StringTools.numberToShowNumber(anteNum));
            }
        }
        else if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            let gameAnti: string = cv.config.getStringData("UIGameAnti");
            blinds = gameAnti.replace("%s", cv.StringTools.numberToShowString(anteNum));
            iconNum += 1;
        }

        let Damon_imgsWidth = this.showcardDamon_img.getContentSize().width / 2;
        let showCardWidth = Damon_imgsWidth + this.forceShowCard_text.node.getContentSize().width;
        let textPos = 0;
        if ((showCardWidth / 2) > Damon_imgsWidth) {
            textPos = this.forceShowCard_button.getContentSize().width / 2 - (showCardWidth / 2 - Damon_imgsWidth);

        }
        else {
            textPos = this.forceShowCard_button.getContentSize().width / 2 + (showCardWidth / 2 - this.forceShowCard_text.node.getContentSize().width);
        }
        // this.forceShowCard_text.node.setPosition(cc.v2(textPos, this.forceShowCard_text.node.getPosition().y));
        // this.showcardDamon_img.setPosition(cc.v2(textPos - Damon_imgsWidth / 2, this.showcardDamon_img.getPosition().y));

        this.mangZhu_text.node.active = true;
        if (cv.GameDataManager.tRoomData.pkRoomParam.club_id != 0) {
            this.mangZhu_text.string = blinds;
        }
        else {
            this.mangZhu_text.string = blinds + (cv.config.getStringData("UIGameRoomId") as string).replace("%d", cv.GameDataManager.tRoomData.u32RoomId.toString());

        }
        //设置牌桌名字盲注信息位置
        let pokerName = cc.find("pokerName_text", this.node);
        let tempPos: cc.Vec2 = cc.Vec2.ZERO;
        let objPos: cc.Vec2 = cc.Vec2.ZERO;
        this.publicCard_panel.convertToWorldSpaceAR(this.publicPos, tempPos);
        pokerName.parent.convertToNodeSpaceAR(tempPos, objPos);
        pokerName.setPosition(pokerName.x, objPos.y - 120);
        this.mangZhu_text.node.setPosition(this.mangZhu_text.node.x, pokerName.getPosition().y - pokerName.getContentSize().height);

        this.game.hoseOwer_panel.getComponent(HouseOwer).setTimeOut();
        if (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId) {
            if (!cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
                // 自动开局人数为0  代表不是自动开桌 (自动开桌隐藏开始按钮)
                this.startGame_button.active = (cv.GameDataManager.tRoomData.pkRoomParam.auto_start_num == 0);
                this.waitForStart_img.active = false;
                if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1) {
                    //console.log("解散时间说明 半小明不开局测解散time_detial   解散倒计时dissolveTime_text");
                }
                else {
                    //this.showDissolveCd();
                    //console.log("解散时间说明 半小明不开局测解散time_detial   解散倒计时dissolveTime_text");
                }
            }
            else {
                this.startGame_button.active = false;
                this.waitForStart_img.active = false;
            }
        }
        else {
            if (!cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
                this.startGame_button.active = false;
                this.waitForStart_img.active = (cv.GameDataManager.tRoomData.pkRoomParam.auto_start_num == 0);
                // if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1) {
                //     this.time_detial.active = false;
                //     this.dissolveTime_text.node.active = false;
                // }
                // else {
                //     this.time_detial.active = false;
                //     this.dissolveTime_text.node.active = false;
                //     this.showDissolveCd();
                // }
            }
            else {
                this.startGame_button.active = false;
                this.waitForStart_img.active = false;
            }
        }

    }
    public showDissolveCd() {
        return;
    }

    public UpdateDissolve() {

        this.dissolveTimeNum -= 1;
        if (this.dissolveTimeNum <= 0) {
            this.unschedule(this.UpdateDissolve);
            return;
        }
        this.updateTime();
    }

    public updateTime() {
        // this.dissolveTime_text.string = cv.StringTools.countTime(this.dissolveTimeNum, cv.Enum.eTimeType.Hour_Min_Sec);
    }

    public resetAction() {
        // 移除筹码动画
        for (let i = 0; i < this.node.childrenCount; ++i) {
            let node: cc.Node = this.node.children[i];
            if (node.name === "pkChips") {
                node.removeFromParent();
                cv.tools.destroyNode(node);

                // 调用"removeFromParent", "this.node.childrenCount"总数会减少, 索引要复原开始递减
                --i;
            }
        }

        // 移除jp动画
        if (this._jackPotHitCardType != null) {
            this._jackPotHitCardType.removeFromParent(true);
            this._jackPotHitCardType.destroy();
            this._jackPotHitCardType = null;
        }
    }

    public resetTable() {
        if (cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee.length != 0) {
            cv.GameDataManager.tRoomData.pkPayMoneyItem.actionCount = 0;
            let fee: FeeItem = cv.GameDataManager.tRoomData.pkPayMoneyItem.actionDelayCountsFee[0];
            this.addTime_text.string = cv.StringTools.serverGoldToShowString(fee.needCoin);
        }

        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            if (this.m_pkSelfCard[i]) {
                this.m_pkSelfCard[i].setFace(false);
                this.m_pkSelfCard[i].setGary(false);
                this.m_pkSelfCard[i].node.active = false;
                this.m_pkSelfCard[i].resetPos();
                this.m_pkSelfCard[i].setHighLight(false);
                this.m_pkSelfCard[i].setCheck(false);
                this.m_pkSelfCard[i].setEye(false);
                this.m_pkSelfCard[i].reset();
            }
        }

        for (let i = 0; i < this.m_pkPublicCard.length; ++i) {
            if (this.m_pkPublicCard[i]) {
                this.m_pkPublicCard[i].stopSchedulesAndActions();
                this.m_pkPublicCard[i].resetPos();
                this.m_pkPublicCard[i].node.active = false;
                this.m_pkPublicCard[i].setFace(false);
                this.m_pkPublicCard[i].setHighLight(false);
                this.m_pkPublicCard[i].setGary(false);
                this.m_pkPublicCard[i].setOp(false);
                this.m_pkPublicCard[i].setCrackAnim(false);
                this.m_pkPublicCard[i].reset();
            }
        }

        this.mainpool.opacity = 0;
        this.HideSidePot();
        this.mainpool_text.string = "";
        this.dichiChip_text.string = cv.StringTools.formatC(cv.config.getStringData("dichiNum"), 0);
        this.mainpool.setContentSize(cc.size(this.getMainpoolWidth(), this.mainpool.getContentSize().height));
        this.cardFunTips_text.node.active = false;
        this.giveUp_buttonIsCheck = false;
        this.followFill_buttonIsCheck = false;

        let tempPos: cc.Vec2 = cc.Vec2.ZERO;
        this.mainpool.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);

        for (let i = 0; i < this.seatList.length; ++i) {
            let seat: Seat = this.seatList[i];
            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                seat.getCard(j).setFace(false);
                seat.getCard(j).reset();
                seat.getCard(j).resetPos();
                seat.getCard(j).setDealPos(tempPos);
                seat.getCard(j).setGary(false);

                seat.getShowCard(j).setFace(false);
                seat.getShowCard(j).reset();
                seat.getShowCard(j).resetPos();
                seat.getShowCard(j).setGary(false);
            }

            seat.hideCard();
            seat.hideChips();
            seat.resetActionType();
            seat.hideCardType();

            if (seat.getStatus() !== cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
                if (seat.getData() !== null) {
                    if (seat.getData().playerid === cv.dataHandler.getUserData().u32Uid) {
                        cv.GameDataManager.tRoomData.m_isAllInMode = true;
                        this.game.menu_Panel.getComponent(menu).updateMenu();
                    }
                }

                seat.hideTips();
                seat.hideStatusText();
                seat.doGray(false);
            }

            seat.isShowDown = false;
            seat.stopCDtime();
        }

        this.gaopai.active = false;
        this.record_button.active = this.isShowRecord();

        this.resetPointAni();
    }

    public addEvent() {
        cv.MessageCenter.register("showRoleInfoView", this.showRoleInfo.bind(this), this.node);
        cv.MessageCenter.register("showObRoleInfo", this.showObRoleInfo.bind(this), this.node);
        cv.MessageCenter.register("on_sitdown_succ", this.onSitDownSucc.bind(this), this.node);
        cv.MessageCenter.register("on_need_buyin", this.OnNeedBuyIn.bind(this), this.node);
        cv.MessageCenter.register("on_standup_succ", this.OnStandUpSucc.bind(this), this.node);
        cv.MessageCenter.register("on_resetgame_noti", this.OnResetGame.bind(this), this.node);
        cv.MessageCenter.register("on_game_elect_dealer_noti", this.OnGameElectDealer.bind(this), this.node);
        cv.MessageCenter.register("on_game_blind_noti", this.OnBlind.bind(this), this.node);
        cv.MessageCenter.register("on_game_holecard_noti", this.OnSendHoleCard.bind(this), this.node)
        cv.MessageCenter.register("on_game_notiplayer_holecard_noti", this.OnSendPlayerHoleCard.bind(this), this.node);
        cv.MessageCenter.register("on_game_action_turn_noti", this.OnActionTurn.bind(this), this.node);
        cv.MessageCenter.register("on_back_seat", this.OnBackSeat.bind(this), this.node);
        cv.MessageCenter.register("on_game_action_noti", this.OnPlayerAction.bind(this), this.node);
        cv.MessageCenter.register("on_game_endround_noti", this.OnEndRound.bind(this), this.node);
        cv.MessageCenter.register("on_game_communitycard_noti", this.OnCommunityCard.bind(this), this.node);
        //
        cv.MessageCenter.register("player_show_cards", this.OnPlayerShowCards.bind(this), this.node);
        cv.MessageCenter.register("on_waiting_other_player", this.OnWaitingOtherPlayer.bind(this), this.node);
        cv.MessageCenter.register("on_game_anti_noti", this.OnGameAnteNoti.bind(this), this.node);

        cv.MessageCenter.register("currentRoomJackpot", this.updateJackpotNumEvent.bind(this), this.node);
        cv.MessageCenter.register("on_jackpot_data", this.updateJackpotNumEvent.bind(this), this.node);
        cv.MessageCenter.register("update_jackpotAmount", this.updateJackpotNumEvent.bind(this), this.node);
        cv.MessageCenter.register("on_game_settlement_noti", this.OnSettlement.bind(this), this.node);
        cv.MessageCenter.register("on_add_room_timecount", this.OnAddRoomTimeCount.bind(this), this.node);
        cv.MessageCenter.register("on_PauseGame_succ", this.OnPauseGameSucc.bind(this), this.node);
        cv.MessageCenter.register("StartGame", this.onGameStart.bind(this), this.node);
        cv.MessageCenter.register("on_game_showdown_noti", this.OnShowDown.bind(this), this.node);
        cv.MessageCenter.register("GameChipsMoveOutHide", this.onGameChipsMoveOutHide.bind(this), this.node);
        cv.MessageCenter.register("on_leave_seat", this.OnLeaveSeat.bind(this), this.node);

        cv.MessageCenter.register("on_force_showcard", this.OnForceShowCard.bind(this), this.node);                 // 强制亮牌
        cv.MessageCenter.register("on_game_send_card_fun", this.OnSendCardFun.bind(this), this.node);               // 发发看
        cv.MessageCenter.register("on_need_slider_verify", this._onMsgNeedSliderVerify.bind(this), this.node);      // 真人验证消息
        cv.MessageCenter.register("on_need_buy_insurance", this._onMsgNeedBuyInsurance.bind(this), this.node);      // 本轮购买保险
        cv.MessageCenter.register("no_need_insurace", this._onMsgNoNeedBuyInsurance.bind(this), this.node);         // 本轮无需购买保险
        cv.MessageCenter.register("player_hit_the_outs", this._onMsgHitOuts.bind(this), this.node);                 // 击中outs
        cv.MessageCenter.register("player_miss_the_outs", this._onMsgMissOuts.bind(this), this.node);               // 未击中outs

        cv.MessageCenter.register("buyin_start", this._onMsgBuyInStart.bind(this), this.node);                      // 数据采集 - 开始带入消息
        cv.MessageCenter.register("buyin_failed_by_server", this._onMsgBuyInFailedByServer.bind(this), this.node);  // 数据采集 - 带入失败远程消息
        cv.MessageCenter.register("buyin_failed_by_local", this._onMsgBuyInFailedByLocal.bind(this), this.node);    // 数据采集 - 带入失败本地消息
        cv.MessageCenter.register("click_btn_exit_room", this._onMsgBtnClickExitRoom.bind(this), this.node);        // 数据采集 - 退出房间消息
        cv.MessageCenter.register("click_btn_leave_seat", this._onMsgBtnClickLeaveSeat.bind(this), this.node);      // 数据采集 - 离开座位消息
        cv.MessageCenter.register("resp_sit_down_failed", this._onMsgRespSitDownFailed.bind(this), this.node);      // 数据采集 - 坐下失败消息

        //发表情
        cv.MessageCenter.register("effet_call", this.effectCall.bind(this), this.node);
        cv.MessageCenter.register("on_fly_emoji", this.OnFlyEmoji.bind(this), this.node);
        cv.MessageCenter.register("effect_hit_call", this.effectHitCall.bind(this), this.node);

        cv.MessageCenter.register("on_showFace", this.onShowFace.bind(this), this.node);
        cv.MessageCenter.register("on_SendChat", this.onSendChat.bind(this), this.node);
        cv.MessageCenter.register("add_action_time", this.OnAddActionTime.bind(this), this.node);

        // 发语音
        cv.MessageCenter.register("on_voice_record_count_down", this.onVoiceRecordCountDown.bind(this), this.node);
        cv.MessageCenter.register("on_voice_record_finish", this.onVoiceRecordFinish.bind(this), this.node);
        cv.MessageCenter.register("on_play_voice", this.onPlayVoice.bind(this), this.node);
        cv.MessageCenter.register("on_voice_record_too_short", this.OnVoiceRecordTooShort.bind(this), this.node);
        cv.MessageCenter.register("on_upload_voice_done", this.OnUploadVoiceDone.bind(this), this.node);
        cv.MessageCenter.register("on_voice_show_micPhoneToast", this.OnVoiceShowMiPhoneTips.bind(this), this.node);

        //私语语音回调
        cv.MessageCenter.register("SYStartRecord", this.onSyStartRecord.bind(this), this.node);
        cv.MessageCenter.register("SYStopRecord", this.onSyStopRecord.bind(this), this.node);
        cv.MessageCenter.register("SYCancelRecord", this.onSyCancelRecord.bind(this), this.node);

        cv.MessageCenter.register("show_hit_jackPotCardType", this.showhitjackPotCardType.bind(this), this.node);
        cv.MessageCenter.register("add_room_time", this.OnAddRoomTime.bind(this), this.node);
        cv.MessageCenter.register("on_room_not_exist", this.gotoHallScene.bind(this), this.node);
        cv.MessageCenter.register("update_player_stake", this.OnUpdateStake.bind(this), this.node);

        cv.MessageCenter.register("quick_leave_notice", this.onQuickLeave.bind(this), this.node);
        cv.MessageCenter.register("showLastRoundWin", this.showLastRoundWin.bind(this), this.node);
        cv.MessageCenter.register("zoom_quickfold_tips", this.onQuickFoldTips.bind(this), this.node);
        cv.MessageCenter.register("action_fold_error", this.onBigCardTips.bind(this), this.node);
        cv.MessageCenter.register("on_leave_room_succ", this.OnLeaveRoomSucc.bind(this), this.node);

        cv.MessageCenter.register("turntableResultNotice", this.onTurntableResultNotice.bind(this), this.node);
        cv.MessageCenter.register("on_need_more_gold", this.OnNeedMoreGold.bind(this), this.node);

        cv.MessageCenter.register("onSetShowAuditState", this.setShowAudit.bind(this), this.node);

        cv.MessageCenter.register("sit_down_limit", this.onSitDownLimit.bind(this), this.node);
        cv.MessageCenter.register("change_tables", this.onChangeTables.bind(this), this.node);
        cv.MessageCenter.register("sit_down_limit_error", this.onSitDownLimitError.bind(this), this.node);

        cv.MessageCenter.register("notice_critisicm_start", this.onNoticeCritisicmStart.bind(this), this.node);
        cv.MessageCenter.register("notice_critisicm_not_enough", this.onNoticeCritisicmTips.bind(this), this.node);
        cv.MessageCenter.register("guess_begin_bet", this.onGuessBeginBet.bind(this), this.node);
        cv.MessageCenter.register("guess_bet_rsp", this.onGuessBetRsp.bind(this), this.node);
        cv.MessageCenter.register("guess_settle", this.onGuessSettle.bind(this), this.node);
        cv.MessageCenter.register("guess_close_button", this.onGuessCloseButton.bind(this), this.node);

        cv.MessageCenter.register("on_auto_buyin_eff", this.onAutoBuyinEff.bind(this), this.node);
        cv.MessageCenter.register("hide_bombInfoTips", this.hideBombInfoPrompt.bind(this), this.node);

        cv.MessageCenter.register("showUpgradeView", this.showUpgradeView.bind(this), this.node);

        //superstar相关
        cv.MessageCenter.register("liveStatus", this.onLiveStatus.bind(this), this.node);
        cv.MessageCenter.register("mikeMode", this.onMikeMode.bind(this), this.node);
        cv.MessageCenter.register("voicePrivateNotice", this.onVoicePrivateNotice.bind(this), this.node);
        cv.MessageCenter.register("canSpeakNotice", this.onCanSpeakNotice.bind(this), this.node);
        cv.MessageCenter.register("openMike", this.onOpenMike.bind(this), this.node);
        cv.MessageCenter.register("NotDisturb", this.onNotDisturb.bind(this), this.node);
        cv.MessageCenter.register("commentatorChannel", this.onCommentatorChannel.bind(this), this.node);
        cv.MessageCenter.register("closeStarNotice", this.onCloseStarNotice.bind(this), this.node);
        cv.MessageCenter.register("inviterSeatFreedNotice", this.onInviterSeatFreedNotice.bind(this), this.node);

        cv.MessageCenter.register("welcome", this.onWelcome.bind(this), this.node);
        cv.MessageCenter.register("IsEmojiFree", this.isEmojiFree.bind(this), this.node);
        cv.MessageCenter.register("closehitback", this.onCloseHitback.bind(this), this.node);

        cv.MessageCenter.register("onBarrageMute", this.onBarrageMute.bind(this), this.node);
        cv.MessageCenter.register("onBarrageConfChange", this.onBarrageConfChange.bind(this), this.node);
        // 明星桌红包雨
        cv.MessageCenter.register("updata_star_redpacket", this.onUpdataStarRedpacket.bind(this), this.node);
        cv.MessageCenter.register("star_redpacket_result_action", this.onStarRedpacketResultAction.bind(this), this.node);

        // 点击牌桌快捷设置开关
        cv.MessageCenter.register("onClickQuickBetSwitch", this._onMsgClickQuickBetSwitch.bind(this), this.node);
    }

    /**
     * 更新桌面
     */
    public onChangeTableBg() {
        this.updateTablebg();
        this.updateButtonImgPath();
        //this.updateControllButton();
        this.updateThinkCdStyle();
        //this.updateSubmenuImg();
        //this.updateFreeSlider();
        this.updateWatermark();
        this.updateUi();
    }
    /**
     * 是否为同样的样式
     */
    public isTheSameStyle() {

    }
    /**
     * 更新游戏操作按钮
     */
    updateControllButton() {
        if (this.isSeaStyle()) {
            //设置弃牌按钮  自由加注按钮  跟注加注按钮
            if (this.giveUpRed && this[this.giveUpRed.node.getComponent(Tag).getMark()]) {
                cv.resMgr.setSpriteFrame(this.giveUpRed.node, this[this.giveUpRed.node.getComponent(Tag).getMark()]);
                cv.resMgr.setSpriteFrame(this.freeFill_button_img, this[this.freeFill_button_img.getComponent(Tag).getMark()]);
                cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this[this.followFill_Blue.node.getComponent(Tag).getMark()]);
            }

            //设置底池图片以及文本位置
            for (let index = 0; index < this.dichi_buttonList.length; index++) {
                cv.resMgr.setSpriteFrame(this.dichi_buttonList[index].node, this.dichiButtonImg);
                if (index == this.dichi_buttonList.length - 1) {
                    let txt0 = cc.find(cv.StringTools.formatC("dichi_text%d", 1), this.dichi_buttonList[index].node);
                    txt0.setPosition(txt0.getPosition().x, 20);
                    let txt1 = cc.find(cv.StringTools.formatC("dichi_wordText%d", 1), this.dichi_buttonList[index].node);
                    txt1.setPosition(txt1.getPosition().x, -16);
                    txt0.color = cc.color(11, 57, 101);
                    txt1.color = cc.color(11, 57, 101);
                } else {
                    let txt0 = cc.find(cv.StringTools.formatC("dichi_text%d", index), this.dichi_buttonList[index].node);
                    txt0.setPosition(txt0.getPosition().x, 20);
                    let txt1 = cc.find(cv.StringTools.formatC("dichi_wordText%d", index), this.dichi_buttonList[index].node);
                    txt1.setPosition(txt1.getPosition().x, -16);
                    txt0.color = cc.color(11, 57, 101);
                    txt1.color = cc.color(11, 57, 101);
                }
            }
        } else {
            //设置弃牌按钮  自由加注按钮  跟注加注按钮
            if (this.giveUpRed && this[this.giveUpRed.node.getComponent(Tag).getMark()]) {
                cv.resMgr.setSpriteFrame(this.giveUpRed.node, this[this.giveUpRed.node.getComponent(Tag).getMark()]);
                cv.resMgr.setSpriteFrame(this.freeFill_button_img, this[this.freeFill_button_img.getComponent(Tag).getMark()]);
                cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this[this.followFill_Blue.node.getComponent(Tag).getMark()]);
            }
            //设置度池图片以及文本位置
            let len = this.dichi_buttonList.length;
            for (let index = 0; index < len; index++) {
                console.log(index);
                cv.resMgr.setSpriteFrame(this.dichi_buttonList[index].node, this.dichiButtonImg);
                if (index == this.dichi_buttonList.length - 1) {
                    let txt0 = cc.find(cv.StringTools.formatC("dichi_text%d", 1), this.dichi_buttonList[index].node);
                    txt0.setPosition(txt0.getPosition().x, 9);
                    let txt1 = cc.find(cv.StringTools.formatC("dichi_wordText%d", 1), this.dichi_buttonList[index].node);
                    txt1.setPosition(txt1.getPosition().x, -27);
                    txt0.color = cc.color(0, 70, 120);
                    txt1.color = cc.color(0, 70, 120);
                } else {
                    let txt0 = cc.find(cv.StringTools.formatC("dichi_text%d", index), this.dichi_buttonList[index].node);
                    txt0.setPosition(txt0.getPosition().x, 9);
                    let txt1 = cc.find(cv.StringTools.formatC("dichi_wordText%d", index), this.dichi_buttonList[index].node);
                    txt1.setPosition(txt1.getPosition().x, -27);
                    txt0.color = cc.color(0, 70, 120);
                    txt1.color = cc.color(0, 70, 120);
                }
            }
        }
    }
    /**
     * 更新ui
     */
    public updateUi() {
        let isSeaStyle: boolean = this.isSeaStyle();
        //cc.find("bg_cardtype", this.gaopai).active = isSeaStyle;
        // if (this.game.jackPotPanel.active) {
        //     cc.find("jackpot_img_seaStayle", this.game.jackPotPanel).active = isSeaStyle;
        // }
        // cc.find("mainpool_bg_seaStyle", this.mainpool).active = isSeaStyle;
        // cc.find("mainpool_bg", this.mainpool).active = !isSeaStyle;

        //自已头像上的筹码
        // cc.find("mychips_ui_bg_seaStyle", this.mychips_bg).active = isSeaStyle;
        // cc.find("mychips_ui_bg", this.mychips_bg).active = !isSeaStyle;

        // for (let i = 0; i < this.seatList.length; i++) {
        //     this.seatList[i].updateStyle();
        // }

        //更新底池文字
        // this.dichiChip_text.node.color = isSeaStyle ? cc.Color.WHITE : cc.Color.BLACK;

        //更换筹码
        // let str = isSeaStyle ? "ui_seaStyle/uibg" : "ui";
        // let path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/Chips_01", str);
        // for (let i = 0; i < this.sidepoolList.length; i++) {
        //     cv.resMgr.setSpriteFrame(cc.find("shopchips_icon", this.sidepoolList[i]), path);
        //     cv.resMgr.setSpriteFrame(cc.find("shopchips_icon_0", this.sidepoolList[i]), path);
        // }
        // cv.resMgr.setSpriteFrame(cc.find("shopchips_icon", this.mainpool), path);
        // cv.resMgr.setSpriteFrame(cc.find("shopchips_icon/shopchips_icon_0", this.mainpool), path);
        // cv.resMgr.setSpriteFrame(cc.find("shopchips_icon/shopchips_icon_1", this.mainpool), path);
        // cv.resMgr.setSpriteFrame(cc.find("shopchips_icon/shopchips_icon_2", this.mainpool), path);

        //更新牌的位置
        // this._selfCardPosY = isSeaStyle ? 150 : 140;
        // this.m_pkSelfCard[0].node.setPosition(cc.v2(cv.config.WIDTH * 0.5 - (cv.config.DESIGN_WIDTH * 0.5 - 485), this._selfCardPosY * cv.config.HEIGHT / cv.config.DESIGN_HEIGHT));
        // this.m_pkSelfCard[1].node.setPosition(cc.v2(cv.config.WIDTH * 0.5 + 603 - cv.config.DESIGN_WIDTH * 0.5, this._selfCardPosY * cv.config.HEIGHT / cv.config.DESIGN_HEIGHT));

        //更新返回牌桌按钮
        // cc.find("game_backButon_img_2", this.backGame_button).active = isSeaStyle;
        // cc.find("game_backButon_img_1", this.backGame_button).active = !isSeaStyle;
        // cc.find("Label", this.backGame_button).color = isSeaStyle ? cc.color(255, 229, 190) : cc.Color.WHITE;

        //更新牌桌名称，盲注信息文字颜色
        let _curBgIndex = cv.tools.GetTableBack(this.isGameStarSeat());
        cc.find("pokerName_text", this.node).color = this._getNameColor(_curBgIndex);
        this.mangZhu_text.node.color = this._getNameColor(_curBgIndex);
        //设置透明度，透明度在cc.color参数里面设置无效，需要单独设置node的opacity属性
        cc.find("pokerName_text", this.node).opacity = this._getNameAlpha(_curBgIndex);
        this.mangZhu_text.node.opacity = this._getNameAlpha(_curBgIndex);

        let _color1 = cc.color(11, 57, 101);
        let _color2 = cc.color(156, 212, 253);
        if (_curBgIndex == 3 || _curBgIndex == 4 || _curBgIndex == 5 || this.isGameStarSeat()) {
            //背景 4，5，6底池按钮文字显示白色
            _color1 = cc.color(255, 255, 255);
            _color2 = cc.color(255, 255, 255);
            this.followFill_text.node.color = cc.color(255, 255, 255);
        } else {
            this.followFill_text.node.color = cc.color(0, 70, 120);
        }

        // for (let i = 0; i < this.dichi_buttonList.length; i++) {
        //     let index = (i == this.dichi_buttonList.length - 1) ? 1 : i;
        //     let txt0 = cc.find(cv.StringTools.formatC("dichi_text%d", index), this.dichi_buttonList[i].node);
        //     let txt1 = cc.find(cv.StringTools.formatC("dichi_mangZhuText%d", index), this.dichi_buttonList[i].node);
        //     txt0.color = _color1;
        //     txt1.color = _color2;
        // }
    }

    /**
     * 更新水印
     */
    public updateWatermark() {
        let mark = this.short_pai.getComponent(Tag).getMark();
        if (cv.StringTools.getArrayLength(mark) > 0) {
            cv.resMgr.setSpriteFrame(this.short_pai, this.getWaterMarkPath(mark));
        }

        let _curBgIndex = cv.tools.GetTableBack(this.isGameStarSeat());
        if (_curBgIndex == 0 || _curBgIndex == 1 || _curBgIndex == 2) {  //前面三张用白色logo
            cv.resMgr.setSpriteFrame(this.game.gameIcon_img, "client_type/pkw/pk9_logo_white");
        } else {
            cv.resMgr.setSpriteFrame(this.game.gameIcon_img, "client_type/pkw/pk9_logo_black");
        }
    }

    /**
     * 更新自由加注条样式
     */
    public updateFreeSlider() {
        let str = this.isSeaStyle() ? "ui_seaStyle/allinSlider" : "ui/allinSlider";
        let path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_round_black_icon", str);
        cv.resMgr.setSpriteFrame(this.freeHandle, path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_round_long", str);
        cv.resMgr.setSpriteFrame(this.sliderBg, path);

        cc.find("freeSlider_bg", this.freeSliderText_bg).active = this.isSeaStyle() ? false : true;
        cc.find("freeSlider_bg_seaStyle", this.freeSliderText_bg).active = this.isSeaStyle() ? true : false;
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_round_small_icon", str);
        let childs = this.sliderBg.children;
        for (let index = 0; index < childs.length; index++) {
            cv.resMgr.setSpriteFrame(childs[index], path);
        }
    }

    /**
     * 更新桌上按钮样式
     * @param index 
     */
    public updateSubmenuImg() {
        let str = this.isSeaStyle() ? "ui_seaStyle/submenu" : "ui/submenu";
        let path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿menu", str);
        cv.resMgr.setSpriteFrame(cc.find("Image_3", this.menu_button), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿record", str);
        cv.resMgr.setSpriteFrame(cc.find("allReview_icon", this.allReview_button), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿shop", str);
        cv.resMgr.setSpriteFrame(cc.find("Image_2", this.shop_button), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿guess", str);
        cv.resMgr.setSpriteFrame(cc.find("Background", this.guess_hand_card_button.node), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿status", str);
        cv.resMgr.setSpriteFrame(cc.find("currentTime_icon", this.currentTime_button), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿delay", str);
        cv.resMgr.setSpriteFrame(cc.find("addTime_icon", this.addTime_button), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿barrage", str);
        cv.resMgr.setSpriteFrame(cc.find("face_icon", this.face_button), path);
        path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/submenu＿mic", str);
        cv.resMgr.setSpriteFrame(this.record_button_img, path);
    }
    /**
     * 更新思考倒计时样式
     * @param cdType 
     */
    public updateThinkCdStyle() {
        let cdType = this.thinkCdTime_text.getComponent(Tag).getTag();
        let index = cv.tools.GetTableBack(this.isGameStarSeat()) + 1;
        if (true) {//this.isSeaStyle()
            if (cdType == 1) {
                this.thinkCdTime_text.node.setPosition(this.giveUpRed.node.x, this.giveUpRed.node.y + 100);
                this.practil_panel.x = this.giveUpRed.node.x;
                this.thankProgressBar.node.setPosition(this.giveUpRed.node.x, this.giveUpRed.node.y + 4);
            }
            else {
                this.thinkCdTime_text.node.setPosition(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 100);
                this.practil_panel.x = this.followFill_Blue.node.x;
                this.thankProgressBar.node.setPosition(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 4);
            }
            cc.find("particlesystem", this.practil_panel).getComponent(cc.ParticleSystem).resetSystem();
            this.thankProgressBar.node.setContentSize(cc.size(142, 142));
            cc.find("particlesystem", this.practil_panel).setPosition(0, 74);

            this.practil_panel.active = true;
            this.practil_panel.opacity = 0;
            this.practil_panel.rotation = 0;
        } else {
            if (cdType == 1) {
                this.thinkCdTime_text.node.setPosition(this.giveUpRed.node.x, this.giveUpRed.node.y + 10);
                this.practil_panel.x = this.giveUpRed.node.x;
                this.thankProgressBar.node.setPosition(this.giveUpRed.node.x, this.giveUpRed.node.y + 8);
            }
            else {
                this.thinkCdTime_text.node.setPosition(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 10);
                this.practil_panel.x = this.followFill_Blue.node.x;
                this.thankProgressBar.node.setPosition(this.followFill_Blue.node.x, this.followFill_Blue.node.y + 8);

            }
            this.thankProgressBar.node.setContentSize(cc.size(121, 121));
            cc.find("particlesystem", this.practil_panel).setPosition(0, 78);
        }

    }

    /**
     * isSeaStyle
     */
    public isSeaStyle() {
        return cv.tools.GetTableBack(this.isGameStarSeat()) < 2;
    }

    /**
     * 更新路径
     */
    public updateButtonImgPath() {
        // let str = this.isSeaStyle() ? "ui_seaStyle/gameMain" : "ui/gameMain";
        let str = "ui/gameMain";
        this.allInImg = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_Button_allin_15", str);//allin  亮
        this.allInGrayImg = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_Button_allin_15_02", str);//allin  灰

        this.midSmallButton = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_Button_allin_15", str);
        this.midBigButton = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_Button_big_01", str);

        this.giveUpImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_03", str));//弃牌 亮
        this.giveUpGrayImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_04", str));//弃牌 灰


        this.giveUpLookImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_03x2", str));//弃或看牌 亮
        this.giveUpLookGrayImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_03x3", str));//弃或看 灰

        this.quickFoldGrayImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_03x5", str));  ////快速弃牌 灰

        this.checkImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_06", str));//看牌（green）  亮
        this.checkGrayImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_05", str));

        this.callImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_02x2", str));//跟注  亮
        this.callGrayImg = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_02x1", str));//跟注  灰
        this.midBigButton = cv.config.getLanguagePath(cv.StringTools.formatC("game/dzpoker/%s/game_Button_big_01", str));

        this.dichiButtonImg = cv.StringTools.formatC("zh_CN/game/dzpoker/%s/game_Button_samll_01", str);
    }
    /**
    * 显示升级账号界面
    */
    public showUpgradeView() {
        let inst: cc.Node = UpgradeView.getSinglePrefabInst(this.upgradePref);
        inst.active = true;
        inst.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_7;
        cv.action.addChildToSceneOnce(inst);
        //cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
    }

    public HideSidePot() {
        for (let i = 0; i < this.sidepoolList.length; ++i) {
            this.node.stopActionByTag(Number(this.sidepoolList[i].name) + this.GAME_SIDE_POT_TAG_BEGIN);
            this.sidepoolList[i].stopAllActions();
            this.sidepoolList[i].active = false;
            this.sidepoolList[i].name = "0";
        }
    }
    public HideSidePotByPotCount() {
        let u32PotCount = cv.GameDataManager.tRoomData.pkTableStates.pots.length;
        let index = u32PotCount == 0 ? u32PotCount : u32PotCount - 1;
        for (let i = index; i < this.sidepoolList.length; ++i) {
            this.node.stopActionByTag(Number(this.sidepoolList[i].name) + this.GAME_SIDE_POT_TAG_BEGIN);
            this.sidepoolList[i].stopAllActions();
            this.sidepoolList[i].active = false;
            this.sidepoolList[i].name = "0";
        }
    }
    public giveUpCallBack() {
        if (this.isZoom()) {
            if (this.actionButtonStatus > cv.Enum.ActionButtonStatus.Control_Bet && this.actionButtonStatus < cv.Enum.ActionButtonStatus.Control_Null) {
                if (this.m_pkPublicCard[0].isFace()) {
                    cv.TP.showMsg(cv.config.getStringData("ZoomQuickFold_tips2"), cv.Enum.ButtonStyle.TWO_BUTTON, this._giveUpCallFuncFalse.bind(this), this._giveUpCallFuncTrue.bind(this));
                    cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_FOLD_LOOK);
                    cv.TP.setTag("ZoomQuickFold_tips2")
                    return;
                }
            }
        }
        this.onGiveUpCallBack(false);
    }

    private _giveUpCallFuncTrue() {
        this.onGiveUpCallBack(true);
    }

    private _giveUpCallFuncFalse() {
        this.onGiveUpCallBack(false);
    }

    public onGiveUpCallBack(keepEnd: boolean = false) {
        switch (this.actionButtonStatus) {
            case cv.Enum.ActionButtonStatus.Control_Bet:
                this.ShowFoldTips();
                break;
            case cv.Enum.ActionButtonStatus.Control_Raise:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true, keepEnd ? 1 : 0);
                // this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_AllIn:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true, keepEnd ? 1 : 0);
                // this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_Just_Call:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true, keepEnd ? 1 : 0);
                // this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0, true, keepEnd ? 1 : 0);
                // this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck:
                if (this.isZoom()) {
                    cv.gameNet.RequestQuickFold(cv.GameDataManager.tRoomData.u32RoomId, true, keepEnd ? 1 : 0);
                } else {
                    this.giveUp_buttonIsCheck = !this.giveUp_buttonIsCheck;
                    if (this.giveUp_buttonIsCheck) {
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpLookImg);
                        this.markNode(this.giveUpRed.node, "giveUpLookImg");
                    }
                    else {
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpLookGrayImg);
                        this.markNode(this.giveUpRed.node, "giveUpLookGrayImg");
                    }
                    cv.gameNet.RequestDefaultFold(cv.GameDataManager.tRoomData.u32RoomId, 1);
                }

                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                this.markNode(this.followFill_Blue.node, "checkGrayImg");
                this.followFill_buttonIsCheck = false;
                break;
            case cv.Enum.ActionButtonStatus.Control_Default_Call:
                if (this.isZoom()) {
                    cv.gameNet.RequestQuickFold(cv.GameDataManager.tRoomData.u32RoomId, true, keepEnd ? 1 : 0);
                } else {
                    this.giveUp_buttonIsCheck = !this.giveUp_buttonIsCheck;
                    if (this.giveUp_buttonIsCheck) {
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                        this.markNode(this.giveUpRed.node, "giveUpImg");
                    }
                    else {
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpGrayImg);
                        this.markNode(this.giveUpRed.node, "giveUpGrayImg");

                    }
                    if (this.giveUp_buttonIsCheck) {
                        cv.gameNet.RequestDefaultFold(cv.GameDataManager.tRoomData.u32RoomId, 3);
                    }
                    else {
                        cv.gameNet.RequestDefaultFold(cv.GameDataManager.tRoomData.u32RoomId, 2);
                    }
                }
                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callGrayImg);
                this.markNode(this.followFill_Blue.node, "callGrayImg");
                this.followFill_buttonIsCheck = false;

                break;
            case cv.Enum.ActionButtonStatus.Control_AllInOrFold:
                if (this.isZoom()) {
                    cv.gameNet.RequestQuickFold(cv.GameDataManager.tRoomData.u32RoomId, true, keepEnd ? 1 : 0);
                } else {
                    this.giveUp_buttonIsCheck = !this.giveUp_buttonIsCheck;
                    if (this.giveUp_buttonIsCheck) {
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpImg);
                        this.markNode(this.giveUpRed.node, "giveUpImg");
                    }
                    else {
                        //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.giveUpGrayImg);
                        this.markNode(this.giveUpRed.node, "giveUpGrayImg");

                    }
                }

                //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.allInGrayImg);
                this.markNode(this.followFill_Blue.node, "allInGrayImg");
                this.followFill_buttonIsCheck = false;
                break;
            case cv.Enum.ActionButtonStatus.Control_Null:

                break;
            default:
                break;
        }
    }

    /**
     * 标记水印
     */
    public markWaterMark(node: cc.Node, mark: string) {
        cv.resMgr.setSpriteFrame(node, this.getWaterMarkPath(mark));
        node.getComponent(Tag).setMark(mark);
    }

    /**
     * 获取水印的路径
     */
    public getWaterMarkPath(mark): string {

        let _curBgIndex = cv.tools.GetTableBack();
        //ui/watermark 下面是黑色的水印  ui_seaStyle/watermark 下面是白色的水印
        //前三张用的风格的背景用白色水印   后面用黑色水印    明星桌用黑色水印
        let str = (_curBgIndex < 3 && !this.isGameStarSeat()) ? "ui_seaStyle/watermark" : "ui/watermark";

        let pathStr = cv.StringTools.formatC("game/dzpoker/%s/%s", str, mark);
        let path = cv.config.getLanguagePath(pathStr);
        return path;
    }

    /**
     * 替换纹理，同时做好标记
     * 主要针对弃牌按钮，加注按，快捷加注按钮等操作按钮
     */
    public markNode(node: cc.Node, mark: string) {
        cv.resMgr.setSpriteFrame(node, this[mark]);
        node.getComponent(Tag).setMark(mark);
    }
    public followFillCallBack() {
        switch (this.actionButtonStatus) {
            case cv.Enum.ActionButtonStatus.Control_Bet:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Check, 0);
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_Raise:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Call, cv.StringTools.showStringToNumber(this.followFill_text.string));
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_AllIn:
                this.OnRaise(cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet);
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_Just_Call:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Call, cv.StringTools.showStringToNumber(this.followFill_text.string));

                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Call, cv.StringTools.showStringToNumber(this.followFill_text.string));
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
                break;
            case cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck:
                this.followFill_buttonIsCheck = !this.followFill_buttonIsCheck;

                if (this.followFill_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkImg);
                    this.markNode(this.followFill_Blue.node, "checkImg");
                    cv.gameNet.RequestDefaultFold(cv.GameDataManager.tRoomData.u32RoomId, 2);
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.checkGrayImg);
                    this.markNode(this.followFill_Blue.node, "checkGrayImg");
                }
                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpLookGrayImg);
                this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpLookGrayImg");
                this.giveUp_buttonIsCheck = false;
                break;
            case cv.Enum.ActionButtonStatus.Control_Default_Call:
                this.followFill_buttonIsCheck = !this.followFill_buttonIsCheck;
                if (this.followFill_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callImg);
                    this.markNode(this.followFill_Blue.node, "callImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.callGrayImg);
                    this.markNode(this.followFill_Blue.node, "callGrayImg");
                }
                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpGrayImg);
                this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpGrayImg");
                this.giveUp_buttonIsCheck = false;
                cv.gameNet.RequestDefaultFold(cv.GameDataManager.tRoomData.u32RoomId, 2);
                break;
            case cv.Enum.ActionButtonStatus.Control_AllInOrFold:
                this.followFill_buttonIsCheck = !this.followFill_buttonIsCheck;
                if (this.followFill_buttonIsCheck) {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.allInImg);
                    this.markNode(this.followFill_Blue.node, "allInImg");
                }
                else {
                    //cv.resMgr.setSpriteFrame(this.followFill_Blue.node, this.allInGrayImg);
                    this.markNode(this.followFill_Blue.node, "allInGrayImg");
                }

                //cv.resMgr.setSpriteFrame(this.giveUpRed.node, this.isZoom() ? this.quickFoldGrayImg : this.giveUpGrayImg);
                this.markNode(this.giveUpRed.node, this.isZoom() ? "quickFoldGrayImg" : "giveUpGrayImg");
                this.giveUp_buttonIsCheck = false;
                cv.gameNet.RequestDefaultFold(cv.GameDataManager.tRoomData.u32RoomId, 2);
                break;
            case cv.Enum.ActionButtonStatus.Control_Null:

                break;
            default:
                break;
        }
    }

    public freeFillCallBack() {
        switch (this.actionButtonStatus) {
            case cv.Enum.ActionButtonStatus.Control_Bet: break;
            case cv.Enum.ActionButtonStatus.Control_Raise: break;
            case cv.Enum.ActionButtonStatus.Control_AllIn: break;
            case cv.Enum.ActionButtonStatus.Control_Default_fallOrCheck: break;
            case cv.Enum.ActionButtonStatus.Control_Default_Call: break;
            case cv.Enum.ActionButtonStatus.Control_Null: break;

            case cv.Enum.ActionButtonStatus.Control_add_AllIn: {
                this.OnRaise(cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet);
                this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
            } break;

            default: break;
        }
    }

    public diChiCallBack(pSender: any, index: number) {
        if (index == 0) {
            switch (this.actionButtonStatus) {
                case cv.Enum.ActionButtonStatus.Control_Bet:
                case cv.Enum.ActionButtonStatus.Control_Raise:
                case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                    this.OnRaise(cv.StringTools.serverGoldByClient(cv.StringTools.showStringToNumber(this.dichi_mangZhuText0.string)));
                    break;
            }
        }
        else if (index == 1) {
            switch (this.actionButtonStatus) {
                case cv.Enum.ActionButtonStatus.Control_Bet:
                case cv.Enum.ActionButtonStatus.Control_Raise:
                case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                    this.OnRaise(cv.StringTools.serverGoldByClient(cv.StringTools.showStringToNumber(this.dichi_mangZhuText1.string)));

                    break;
            }
        }
        else if (index == 2) {
            switch (this.actionButtonStatus) {
                case cv.Enum.ActionButtonStatus.Control_Bet:
                case cv.Enum.ActionButtonStatus.Control_Raise:
                case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                    this.OnRaise(cv.StringTools.serverGoldByClient(cv.StringTools.showStringToNumber(this.dichi_mangZhuText2.string)));
                    break;
            }
        }
        else if (index == 3) {
            switch (this.actionButtonStatus) {
                case cv.Enum.ActionButtonStatus.Control_Bet:
                case cv.Enum.ActionButtonStatus.Control_Raise:
                case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                    this.OnRaise(cv.StringTools.serverGoldByClient(cv.StringTools.showStringToNumber(this.dichi_mangZhuText3.string)));
                    break;
            }
        }
        else if (index == 4) {
            // 原来的逻辑: 读取按钮上的值
            let u32Amount: number = cv.StringTools.serverGoldByClient(cv.StringTools.showStringToNumber(this.dichi_mangZhuText4.string));

            // 如果当前是翻前快捷下注 && 不是奥马哈游戏(第5个按钮规则是: 奥马哈是"满池", 其他的是"ALLIN")
            // 防止在非微局出现小数不能ALLIN的情况(因为按照乱七八糟相互矛盾的需求是非微局要是整数, 从而导致这种情况)
            if (this.quickBetModeIsPreflop && !this.isGamePLO()) {
                u32Amount = cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet;
            }

            switch (this.actionButtonStatus) {
                case cv.Enum.ActionButtonStatus.Control_Bet:
                case cv.Enum.ActionButtonStatus.Control_Raise:
                case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                    this.OnRaise(u32Amount);
                    break;
            }
        }

        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);

        // 如果是翻前下注, 标记已使用
        // 如果使用一次翻前模式, 则必须等到下一局游戏游戏开始重置才继续检测
        // 每一局游戏只生效一次
        if (this.quickBetModeIsPreflop) {
            this.quickBetUsedPreflopOnce = true;
        }
    }

    public OnRaise(u32Amount: number) {
        let amount = cv.StringTools.clientGoldByServer(u32Amount);
        let u32RoomId = cv.GameDataManager.tRoomData.u32RoomId;
        let pkSelf: Seat = this.getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
        if (pkSelf) {
            switch (this.actionButtonStatus) {

                case cv.Enum.ActionButtonStatus.Control_Bet:
                    if (u32Amount < cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet) {

                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Bet, amount);
                    }
                    else {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, amount);
                        // this.showSelfCardAllInEffect();
                    }
                    break;
                case cv.Enum.ActionButtonStatus.Control_Raise:
                    if (u32Amount < cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet) {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Raise, amount);
                    }
                    else {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, amount);
                        // this.showSelfCardAllInEffect();
                    }
                    break;
                case cv.Enum.ActionButtonStatus.Control_Just_Call:
                    if (u32Amount < cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet) {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Call, amount);
                    }
                    else {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, amount);
                        // this.showSelfCardAllInEffect();
                    }
                    break;
                case cv.Enum.ActionButtonStatus.Control_AllIn:
                    if (u32Amount == cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet) {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, amount);
                        // this.showSelfCardAllInEffect();
                    }
                    break;
                case cv.Enum.ActionButtonStatus.Control_add_AllIn:
                    if (u32Amount == cv.GameDataManager.tRoomData.u32Stake + cv.GameDataManager.tGameData.m_u32RoundBet) {
                        cv.gameNet.RequestAction(u32RoomId, cv.Enum.ActionType.Enum_Action_Allin, amount);
                        // this.showSelfCardAllInEffect();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public ShowFoldTips() {
        if (this.isZoom()) {
            cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips28")), cv.Enum.ButtonStyle.TWO_BUTTON, this.FoldCard.bind(this), this.CheckCard.bind(this));//c++最后有一个参数TIPS_TAG =8319
            cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_FOLD);
            cv.TP.setTag("UIGameSceneTips28");
        } else {
            cv.TP.showMsg(cv.config.getStringData("UIGameSceneTips3"), cv.Enum.ButtonStyle.TWO_BUTTON, this.FoldCard.bind(this), this.CheckCard.bind(this));//c++最后有一个参数TIPS_TAG =8319
            cv.TP.setTag("UIGameSceneTips3")
        }
    }
    public FoldCard() {
        cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Fold, 0);
        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
    }
    public CheckCard() {
        cv.gameNet.RequestAction(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ActionType.Enum_Action_Check, 0);
        this.setControlButtonStatus(cv.Enum.ActionButtonStatus.Control_Null);
    }

    private showJackPotNumPanel() {

        if (this.isZoom()) {
            return;
        }
        this.game.jackPotPanel.active = true;
        for (let i = 0; i < 7; i++) {
            let jackNumberPrefab = cc.instantiate(this.jackNumber);
            let jackpot_img_node = this.game.jackPotPanel.getChildByName("jackpot_img_node");
            let size: cc.Size = jackpot_img_node.getContentSize();
            jackNumberPrefab.setPosition(-size.width / 2 + 12 + i * 31, -size.height / 2);
            // jackNumberPrefab.scale = 0.4;

            jackpot_img_node.addChild(jackNumberPrefab);
            jackNumberPrefab.active = true;
            let jackNum: JackPotNumber = jackNumberPrefab.getComponent(JackPotNumber);
            jackNum.init(true);
            jackNum.hideBg();
            this._JackPotNumberList.push(jackNum);
        }
        cv.worldNet.RequestGetJackpotData(cv.GameDataManager.tRoomData.pkRoomParam.club_id, cv.GameDataManager.tRoomData.u32RoomId);
    }

    updateJackpotNumEvent() {
        if (!cv.GameDataManager.tRoomData.pkRoomParam.is_associated_jackpot)//控制壮态栏显示
        {
            return;
        }
        let num = cv.GameDataManager.tJackPot.getJackpotAmountByBlind(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum)
        let amount = Math.round(parseInt(cv.StringTools.numberToShowString(num)) / 100)
        this.updateJackpotNum(amount.toString());
    }

    updateJackpotNum(amounts: string) {
        let alen: number = amounts.length;
        let len: number = cv.StringTools.getArrayLength(this._JackPotNumberList);
        for (let i = 0; i < len; ++i) {
            if (i < alen) {
                let index: number = len - 1 - i;
                this._JackPotNumberList[len - i - 1].showNum(Number(amounts[alen - i - 1]), 0.1);
                amounts.substr(1, 2)
            }
            else {
                this._JackPotNumberList[len - i - 1].showNum(0, 0.1);
            }
        }
    }

    // 倒计时
    private onVoiceRecordCountDown(countDown: number) {
        this.game.voice_panel.active = true;

        let cdTime_text: cc.Label = cc.find("recording_img/cdTime_text", this.game.voice_panel).getComponent(cc.Label);
        cdTime_text.string = "" + countDown;
    }

    /**
     * 语音逻辑简述 (首先要开启麦克风 cv.native.AuthMicphone())
     * 1，按下按钮调用原生层进行录音，录音完成从原生层调回此函数
     * 2，向php请求发送上传语音数据到服务器
     * 3，上传成功，向go服务器发送语音url消息，服务器转发到房间的其它人
     * 4，房间其它人收到语音数据之后，根据url播放语音数据。
     * 
     * 5，收到url之后不同平台的处理
     * ios： 调用原生方法，传送语音url,在原生层直接获取网络数据进行播放，并在播放的时候通知ts层播放语音动画
     * android 和私语 :根据url下载语音到本地，然后播放本地语音。
     * 语音录制完成
     * @param data 
     */
    private onVoiceRecordFinish(data: string) {
        console.log("######## onVoiceRecordFinish:");
        this.game.voice_panel.active = false;
        if (this._recordTime <= 9) {
            if (!cv.GameDataManager.tRoomData.m_bIsCancelVoice) {
                if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                    cv.httpHandler.UploadVoiceFile_Sy(data);
                } else {
                    cv.httpHandler.UploadVoiceFile();
                }

            }
        } else {
            cv.MessageCenter.send("on_voice_record_too_short");
        }
    }

    //录音时间太短
    private OnVoiceRecordTooShort() {
        this.record_button.active = this.isShowRecord();
        // this.record_button.getComponent(cc.Button).interactable = true;
        cv.TT.showMsg(cv.config.getStringData("ErrorToast24"), cv.Enum.ToastType.ToastTypeError);
    }

    private OnUploadVoiceDone() {
        this.setRecordEnabled(true);
    }

    //未开启麦克风权限
    private OnVoiceShowMiPhoneTips() {
        cv.TT.showMsg(cv.config.getStringData("MicPhoneToast2"), cv.Enum.ToastType.ToastTypeError);
    }

    //播放语音
    private onPlayVoice(param: CAFInfo) {
        if (cc.sys.os == cc.sys.OS_IOS && param.kSender == "ios_self") {
            //kSender是""ios_self"表示ios播放自己录制的语音
            param.u32SeatId = cv.GameDataManager.tRoomData.i32SelfSeat;
        }
        let pkSeat = this.getSeatBySeverId(param.u32SeatId);
        if (pkSeat) {
            pkSeat.speak(param.f32Time);
        }
    }

    //私语开始录音回调
    private onSyStartRecord(data: any) {
        let ret = data["ret"];
        let op = data["op"];

        if (ret == 0) {  //开始录音成功
            if (this._bTouchStop == false) {
                this.startShowRecord();
            } else {
                cv.TT.showMsg(cv.config.getStringData("ErrorToast24"), cv.Enum.ToastType.ToastTypeError);
            }
        }

    }

    //私语停止录音回调
    private onSyStopRecord(data: any) {
        let ret = data["ret"];
        let voiceData = data["file_base64"];
        if (ret == 0) {  //开始录音成功
            this.onVoiceRecordFinish(voiceData);
        }
        this._bTouchStop = false;
    }

    //私语取消录音回调
    private onSyCancelRecord(data: any) {
        this._bTouchStop = false;
    }

    private showhitjackPotCardType(param: any) {
        let infos = cv.GameDataManager.tJackPot.noticeJackPotAwardInfo.awardInfo;
        cv.StringTools.deepCopy(infos, this._jackpotInfos);

        let pkCall = cc.callFunc(this.showjackPotAction.bind(this));
        this.ChipsMoveAction(this.game.jackPotPanel, this.mainpool, 0, pkCall);
    }

    private showjackPotAction() {
        if (this._jackpotInfos.length == 0 || this._jackPotHitCardType != null) {
            return;
        }
        let info = this._jackpotInfos[0];
        let pkPlayer = cv.GameDataManager.tRoomData.GetTablePlayer(info.award_playid);
        if (pkPlayer) {
            this._jackPotHitCardType = cc.instantiate(this.jack_action);
            this.node.addChild(this._jackPotHitCardType);
            let label_Content = cc.find("action_panel/label_Content", this._jackPotHitCardType);
            let label_WinValue = cc.find("action_panel/sprite_Bar/label_WinValue", this._jackPotHitCardType);
            let name = info.award_player_name;
            let level = cv.config.getStringData(`UITitle${112 + info.hand_level}`)
            let str = cv.config.getStringData("UIJackpotHitCardPlayer") + "\n" + cv.config.getStringData("UIJackpotHitCardType");
            label_Content.getComponent(cc.Label).string = cv.StringTools.formatC(str, name, level);
            label_WinValue.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(info.award_amount);

            let action = cc.find("action_panel", this._jackPotHitCardType).getComponent(cc.Animation);
            if (!action.hasEventListener("finished")) {
                action.on("finished", function () {
                    if (this._jackPotHitCardType == null) return;
                    this._jackpotInfos.splice(0, 1)
                    this._jackPotHitCardType.removeFromParent(true);
                    this._jackPotHitCardType.destroy();
                    this._jackPotHitCardType = null;
                    if (this._jackpotInfos.length > 0) {
                        this.showjackPotAction();
                    } else {
                        this.showPlayerJackPotAction();
                    }
                }, this)
            }
            action.play("JackpotBigWin");
            this.game.sendNetJackPot();
            this.hideBombInfoPrompt();
        }
    }

    private showPlayerJackPotAction() {
        let infos = cv.GameDataManager.tJackPot.noticeJackPotAwardInfo.awardInfo;
        for (let i = 0; i < infos.length; i++) {
            let info = infos[i]
            let pkPlayer = cv.GameDataManager.tRoomData.GetTablePlayer(info.award_playid);
            if (pkPlayer) {
                this.m_hashitJackpotCard = true;
                let pkSeat = this.getSeatBySeverId(pkPlayer.seatid);
                if (pkSeat) {
                    this.PotOfAppropriationEff(this.mainpool, pkSeat.node, pkPlayer, 0.5, 0.3, true);

                    // 击中jp后 头像飘数字
                    let pkCall = cc.callFunc(() => {
                        pkSeat.getComponent(Seat).showNumber("+" + cv.StringTools.serverGoldToShowString(info.award_amount));
                    }, this);
                    let pkDelay = cc.delayTime(0.5);
                    let action = cc.sequence(pkDelay, pkCall);
                    this.node.runAction(action);
                }
            }
        }
        this.game.sendNetJackPot();
    }

    private OnAddRoomTime(param: any) {
        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/pturn");
        }
        if (param.playerid == cv.dataHandler.getUserData().u32Uid) {
            cv.native.AnalysisCountEvent(cv.Enum.native_cfg.EVENT_COUNT_ROOM_DELAY_TIME, null);
        }

        cv.TT.showMsg(cv.config.getStringData("UIDelayRoomTimeTips"), cv.Enum.ToastType.ToastTypeSuccess);
    }
    private Pwd_tips(room_id: number) {
        cv.TP.showMsg("", cv.Enum.ButtonStyle.TWO_BUTTON, this.checkPwd.bind(this, room_id), null, true, cv.config.getStringData("TipsPanel_Title2"));
        cv.TP.setTag("TipsPanel_Title2");
    }
    private Hide_tips() {
        let _tipsTag = cv.TP.getTag();
        if (_tipsTag != null) {
            if (_tipsTag == "TipsPanel_Title2") {
                cv.TP.hideTipsPanel();
            }
        }
    }
    private OnUpdateStake(param: any) {
        let seat: Seat = this.getSeatBySeverId(param.seat_id);
        if (seat) {
            seat.setStake(param.stake);
        }
    }

    public onQuickLeave(data: any) {
        for (let i = 0; i < this.m_pkSelfCard.length; ++i) {
            this.m_pkSelfCard[i].setGary(true);
        }

        let zoomSureTips = cc.instantiate(this.zoomSurePref);
        zoomSureTips.name = "zoomSureTips";

        this.game.node.addChild(zoomSureTips);
        // 适配widget
        cv.resMgr.adaptWidget(zoomSureTips);
        //zoomSureTips.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

        let script = zoomSureTips.getComponent(ZoomCurentTime)
        script.updateView(data);

        cv.GameDataManager.tRoomData.reset();
        cv.netWorkManager.closeGameConnect();


    }

    public onQuickFoldTips(data: any) {
        cv.TP.showMsg(cv.config.getStringData("ZoomQuickFold_tips"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onQuickFold.bind(this));
        cv.TP.setTag("ZoomQuickFold_tips");
    }

    public showLastRoundWin(data: any) {
        let showType = data;
        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
            if (pkSeat && pkSeat.getSeatViewId() == 0) {
                let strValue: string = "+" + showType; // cv.StringTools.clientGoldByServer(showType);
                pkSeat.showNumber(strValue);
                //pkSeat.SetName(strValue, cc.Color.WHITE, cv.Enum.NameTextType.SetNameType_setWinNumber);
            }
        }

    }

    public onBigCardTips(type) {
        if (type == 0) {
            cv.TP.showMsg(cv.config.getStringData("Big_Card_Tips"), cv.Enum.ButtonStyle.TWO_BUTTON, this.FoldCard.bind(this));
        } else {
            cv.TP.showMsg(cv.config.getStringData("Big_Card_Tips"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onQuickFold.bind(this));
        }
        cv.TP.setTag("Big_Card_Tips");
    }

    public needClub() {
        cv.GameDataManager.tRoomData.isShowNeedClub = false;
        cv.TP.showMsg(cv.config.getStringData("UIGameSceneTips26"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.gotoSelfView.bind(this));
    }

    public gotoSelfView() {
        // 标记服务器返回时退出去返回社区场景
        cv.viewAdaptive.isbackToClubScene = true;
        cv.roomManager.RequestLeaveRoom();
    }
    public OnLeaveRoomSucc() {
        if (this._isLeaveRoom) {
            return;
        }
        this._isLeaveRoom = true;

        if (cv.viewAdaptive.isbackToClubScene) {
            cv.viewAdaptive.isbackToClubScene = false;
            cv.action.switchScene(cv.Enum.SCENE.CLUB_SCENE, (scene: cc.Scene) => {
                let node: cc.Node = scene.getChildByName(cv.Enum.SCENE.CLUB_SCENE);
                node.getComponent(ClubScene).setMainView(eClubSceneView.E_CSV_CLUB_MAIN_VIEW, false);
            });
        } else {
            cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
        }
        cv.GameDataManager.tRoomData.reset();
        cv.netWorkManager.closeGameConnect();
    }

    private checkPwd(room_id: number) {
        let str = cv.TP.getEditBoxString();
        let index = str.search(" ");

        if (str.length <= 0 || index != -1) {
            cv.TT.showMsg(cv.config.getStringData("ErrorCode2"), cv.Enum.ToastType.ToastTypeWarning);
            return;
        }
        cv.gameNet.RequestBuyinWithPassword(GameDataManager.tRoomData.u32RoomId, cv.md5.md5(str));
    }
    private removeOthersBtnEvent(node: cc.Node) {
        let evess: cc.Component.EventHandler[] = node.getComponent(cc.Button).clickEvents
        for (let i = 0; i < evess.length; i++) {
            // if (evess[i].customEventData.toString() != "dzpoker") {
            //     evess.splice(i, 1);
            // }
            if (evess[i]._componentName.toString() != "GameMain") {
                evess.splice(i, 1);
            }
        }
    }

    //当前是否是急速扑克房间    
    private isZoom(): boolean {
        return cv.GameDataManager.tRoomData.isZoom();
    }

    public setWaitAction(isShow: boolean) {
        if (!this.isZoom()) {
            return;
        }

        let zoomWait = this.zoomWaitNode.getChildByName("zoomWait")
        let dot = this.zoomWaitNode.getChildByName("dot")
        zoomWait.stopAllActions();
        dot.stopAllActions();

        if (isShow) {
            zoomWait.runAction(cc.repeatForever(cc.rotateBy(5.0, -360)));
            dot.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(0.8), cc.fadeOut(0.8))));
            this.scheduleOnce(this.runWaitAction, 3.0);
        } else {
            this.unschedule(this.runWaitAction);
            this.zoomWaitNode.active = false;
        }
    }

    public runWaitAction(f32Delta: any) {
        this.zoomWaitNode.active = true;

    }

    public showLuckButton() {
        if (this.isGameStarSeat()) return;
        if (this.luckLayer == null) {
            this.luckLayer = cc.instantiate(this.luckButton_prefab).getComponent(LuckTurntablesButton);
            this.redEnvelope_btn.node.addChild(this.luckLayer.node);
            this.luckLayer.node.setPosition(0, 0);
            // this.luckLayer.setLeftShowDes();
            this.luckLayer.updateBg();
        }

        if (cv.dataHandler.getUserData().isShowLuckTurntables) {
            this.redEnvelope_btn.node.active = true;
            this.luckLayer.updateView(true);
        } else {
            this.redEnvelope_btn.node.active = false;
        }
    }

    public onTurntableResultNotice(puf: world_pb.LuckTurntableResultNotice) {
        // let pkSeat: Seat = this.getSeatByPlayerID(puf.uid);
        // if (pkSeat != null) {
        //     let pos: cc.Vec2 = pkSeat.node.getParent().convertToWorldSpace(pkSeat.node.getPosition());
        //     this.luckLayer.showGoldMoveAction(pos, puf.currency_type);
        // }

        let pkSeat: Seat = this.getSeatByPlayerID(puf.uid);
        if (pkSeat != null) {
            this.luckLayer.runGoldMoveAction(this.redEnvelope_btn.node, pkSeat.node, () => {
                pkSeat.showRedAction(puf.currency_type, puf.amount, this.isGameStarSeat());
            });
        }
    }

    public onUpdataStarRedpacket() {
        if (!this.isGameStarSeat()) return;
        if (this.starRedpacketButton == null) {
            cv.resMgr.load("zh_CN/game/starRedpacket/StarRedpacketButton", cc.Prefab, (prefab: cc.Prefab): void => {
                if (this.starRedpacketButton == null) {
                    this.starRedpacketButton = cc.instantiate(prefab).getComponent(StarRedpacketButton);
                    this.redEnvelope_btn.node.addChild(this.starRedpacketButton.node);
                    this.starRedpacketButton.node.setPosition(0, 0);
                }
                if (cv.GameDataManager.tRoomData.starRedpacketInfo.left_time > 0) {
                    this.redEnvelope_btn.node.active = true;
                    this.starRedpacketButton.updateView();
                } else {
                    this.redEnvelope_btn.node.active = false;
                }
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
        } else {
            if (cv.GameDataManager.tRoomData.starRedpacketInfo.left_time > 0) {
                this.redEnvelope_btn.node.active = true;
                this.starRedpacketButton.updateView();
            } else {
                this.redEnvelope_btn.node.active = false;
            }
        }
    }

    public onStarRedpacketResultAction(msg: game_pb.LuckStarSeatDrawResultNotice) {
        let pkSeat: Seat = this.getSeatByPlayerID(msg.user_id);
        if (pkSeat != null) {
            this.starRedpacketButton.runGoldMoveAction(this.redEnvelope_btn.node, pkSeat.node, () => {
                pkSeat.showRedAction(cv.Enum.RedItemType.gold, msg.amount, this.isGameStarSeat());
            });
        }
    }

    public getSeatByPlayerID(playerid: number): Seat {
        for (let i = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer && playerid == pkPlayer.playerid) {
                let pkSeat: Seat = this.getSeatBySeverId(pkPlayer.seatid);
                return pkSeat;
            }
        }
    }

    public getSeatById(id: Number): Seat {
        let len = this.seatList.length;
        for (let i = 0; i < len; i++) {
            if (this.seatList[i].getSeatViewId() == id) return this.seatList[i];
        }
    }

    public onClickAuto() {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.lostDesc == null) {
            this.lostDesc = cc.instantiate(this.lost_prefab);
            this.game.node.addChild(this.lostDesc, cv.Enum.ZORDER_TYPE.ZORDER_LOADING);
        }
        this.lostDesc.getComponent(AofDesc).updateView();
        this.lostDesc.active = true;
        this.hideBombInfoPrompt();
    }

    public updateLabaNum(playAni: boolean = true) {
        playAni = playAni == false ? false : true;
        if (!this.labaBtnNode) {
            this.labaBtnNode = cc.instantiate(this.labaBtn_prefab);
            this.aof_lost_btn.addChild(this.labaBtnNode);
            this.labaBtnNode.on("click", () => {
                this.onClickAuto();
            }, this);
        }
        this.labaBtnNode.getComponent(labaBtn).updateLabaNum(playAni);
        if (this.lostDesc != null) {
            this.lostDesc.getComponent(AofDesc).updateView();
        }
    }

    public OnNeedMoreGold() {
        cv.GameDataManager.tRoomData.isShowNeedShop = false;
        this.showShop();
    }

    private gameStandUp() {
        cv.gameNet.RequestStandup(GameDataManager.tRoomData.u32RoomId);
    }

    private showShop() {
        cv.AudioMgr.playButtonSound('button_click');
        cv.worldNet.requestGetUserData();
        cv.SHOP.RechargeClick();
    }

    public getMainpoolWidth() {
        let width = this.mainpool_text.node.getContentSize().width + 58;
        if (width <= 200) {
            width = 200;
        }
        return width;
    }


    public RequestGetRoomLimitID() {
        cv.gameNet.RequestGetRoomLimitID();
    }

    public onSitDownLimit(str: string) {

        let desc1 = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_des_1");
        let desc3 = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_des_3");
        let _str = desc1 + "\n" + str + "\n" + desc3;
        cv.TP.showMsg(_str, cv.Enum.ButtonStyle.TWO_BUTTON, this.RequestGetRoomLimitID.bind(this), null, false, "", cc.Label.HorizontalAlign.LEFT);
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_LIMIT_TIPS);
        this.game.buyin_panel.active = false;  //收到想新手限制弹框，如果还有带入弹框，隐藏掉
    }

    public onSitDownLimitError(errorID: number) {
        let str = cv.config.getStringData("ServerErrorCode" + errorID);
        cv.TP.showMsg(str, cv.Enum.ButtonStyle.TWO_BUTTON, this.RequestGetRoomLimitID.bind(this), null, false, "", cc.Label.HorizontalAlign.CENTER);
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_LIMIT_TIPS);
    }

    public onChangeTables() {
        this.m_bIsInit = false;

        // 微局退出先提前结算
        if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1
            || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin
            || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet) {
            this.game.menu_Panel.getComponent(menu).sureToSettlement();
        }
    }

    public initRoomData() {
        // 清除座位数据
        while (this.seatList.length > 0) {
            let pkSeat: Seat = this.seatList.pop();
            pkSeat.node.removeFromParent(true);
            pkSeat.node.destroy();
        }

        // 清除JP数据
        while (this._JackPotNumberList.length > 0) {
            let number: JackPotNumber = this._JackPotNumberList.pop();
            number.node.removeFromParent(true);
            number.node.destroy();
        }
    }

    //暴击场开局
    public onNoticeCritisicmStart(data: any) {
        this._bReciviceCriticsStart = true;

        let bombAnim = this.bomb_node.getChildByName("bombAnim");
        if (bombAnim) {
            bombAnim.getComponent("playBombAnim").playBombAnim();
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/baojiFire");
        }
        this.hideBombInfoPrompt();
    }



    //设置暴击局图片
    public setCriticsimSFlag() {
        let _bombFlag = this.short_pai.getChildByName("bombFlag");

        if (cv.GameDataManager.tRoomData.pkRoomParam.isCriticismField == true) {  //当前是暴击局

            cv.resMgr.setSpriteFrame(_bombFlag, cv.config.getLanguagePath("game/dzpoker/ui/bombCornFlag"));
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                this.markWaterMark(this.short_pai, "common_duanpai");
                // cv.resMgr.setSpriteFrame(this.short_pai, cv.config.getLanguagePath("game/dzpoker/ui/watermark/common_duanpai"));
            } else {
                this.markWaterMark(this.short_pai, "game_nl");
                //cv.resMgr.setSpriteFrame(this.short_pai, cv.config.getLanguagePath("game/dzpoker/ui/watermark/game_nl"));
            }

            this.short_pai.active = true;
            _bombFlag.active = true;
        } else {
            _bombFlag.active = false;
        }
    }

    //暴击场金币不足提示
    public onNoticeCritisicmTips(data: any) {
        cv.TT.showMsg(cv.config.getStringData("Criticsim_not_enough"), cv.Enum.ToastType.ToastTypeWarning);
    }

    private showBombInfoPrompt(dataInfo: any) {
        this.BombTipsNode.active = true;
        cv.GameDataManager.tRoomData.isShowCritPrompt = false;

        let maxCritProb: number = 20; // 最大暴击时间
        let critNeedMoney: number = 10; // 暴击场暴击倍数
        let gameTypeStr = "BB";

        let _txtTitle = this.BombTipsNode.getChildByName("txtTips").getComponent(cc.Label);
        let _txtContent = this.BombTipsNode.getChildByName("content").getComponent(cc.Label);
        if (dataInfo.maxCritProb != 0) maxCritProb = dataInfo.maxCritProb; // 最大暴击时间
        if (dataInfo.critNeedMoney != 0) critNeedMoney = dataInfo.critNeedMoney; // 暴击场暴击倍数

        if (dataInfo.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            gameTypeStr = "Ante";
            _txtTitle.string = cv.config.getStringData("BombPrompt_title_SD");
        } else {
            _txtTitle.string = cv.config.getStringData("BombPrompt_title");
        }

        _txtContent.string = cv.StringTools.formatC(cv.config.getStringData("BombPrompt_Content"), maxCritProb, critNeedMoney, gameTypeStr);
        this.BombTipsNode.runAction(cc.sequence(cc.show(), cc.scaleTo(0.1, 1.0), cc.delayTime(2.4), cc.hide()));
    }

    private hideBombInfoPrompt() {
        if (this.BombTipsNode) {
            this.BombTipsNode.stopAllActions();
            this.BombTipsNode.active = false;
        }
    }

    private setForbidChat(isAllin: boolean) {
        this._isAllin = isAllin;
        cv.MessageCenter.send("forbid_chat", isAllin);
        if (isAllin) {
            if (this.game.face_Panel) {
                if (this.isGameStarSeat()) {
                    this.game.face_Panel.getComponent(FaceBarrage).hideUi();
                } else {
                    this.game.face_Panel.getComponent(FaceView).hideUi();
                }
            }
            this.setRecordEnabled(false);
            this.setFaceBtnEnabled(false);
        } else {
            this.setRecordEnabled(cv.GameDataManager.tRoomData.i32SelfSeat != -1);
            this.setFaceBtnEnabled(true);
        }
    }

    public onGuessBeginBet(msg: game_pb.NoticeGuessBeginBet) {
        this.game.guess_hand_card.getComponent(GuessHandCard).setGuessBeginBet(msg);
        if (!this._isShowGuess) return;
        if (!this._isGuessClose) {
            this.game.guess_hand_card.active = true;
            this.guess_hand_card_button.node.active = false;
        } else {
            this.game.guess_hand_card.active = false;
            let guess_tips = this.guess_hand_card_button.node.getChildByName("guess_tips");
            guess_tips.stopAllActions();
            guess_tips.setScale(0);
            this.guess_hand_card_button.node.active = true;
        }
    }

    public onGuessBetRsp(msg: game_pb.GuessBetRsp) {
        this.game.guess_hand_card.getComponent(GuessHandCard).setGuessBetRsp(msg);
        this.playPointAni(msg.left_time);
        if (!this._isShowGuess) return;
        this.game.guess_hand_card.active = true;
    }

    public onGuessOpenButton(pSender: any) {
        if (!this._isShowGuess) return;
        this._isGuessClose = false;
        this.game.guess_hand_card.active = true;
        this.guess_hand_card_button.node.active = false;
    }

    public onGuessCloseButton() {
        if (!this._isShowGuess) return;
        this._isGuessClose = true;
        let guess_tips = this.guess_hand_card_button.node.getChildByName("guess_tips");
        guess_tips.stopAllActions();
        guess_tips.setScale(1);
        this.game.guess_hand_card.active = false;
        this.guess_hand_card_button.node.active = true;
        guess_tips.runAction(cc.sequence(cc.delayTime(1), cc.scaleTo(0.5, 0)));
    }

    public onGuessSettle(amount: number) {
        this._guess_settle_amount = amount;
    }

    public showGuessSettle(target: cc.Node) {
        let amount = this._guess_settle_amount;
        if (amount == -1) return;
        this._guess_settle_amount = -1;// 显示之后清除数据
        let node = cc.instantiate(this.guess_result_panel);
        let lose_panel = node.getChildByName("lose");
        let win_panel = node.getChildByName("win");
        let seat = this.getSeatBySeatViewId(0);
        let pos = seat.node.getPosition()
        this.game.gameMain_panel.addChild(node, 107);
        node.setPosition(pos);

        let isWin: boolean = amount > 0;
        lose_panel.active = !isWin;
        win_panel.active = isWin;
        if (isWin) {
            let dos = win_panel.getChildByName("guess_result_dos");
            let label = win_panel.getChildByName("guess_result_label");
            let gold_icon = win_panel.getChildByName("gold_icon");
            let guess_result_bg = node.getChildByName("guess_result_bg");
            dos.getComponent(cc.Label).string = cv.config.getStringData("UIGuessWin");
            label.getComponent(cc.Label).string = "+" + cv.StringTools.numToFloatString(amount);

            let labelWidth = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label)).width;
            let width = gold_icon.getContentSize().width + labelWidth;
            let bgSize = guess_result_bg.getContentSize();
            let dosWidth = cv.resMgr.getLabelStringSize(dos.getComponent(cc.Label)).width;
            let bigWidth = dosWidth > width ? dosWidth : width;
            if (bgSize.width < bigWidth + 50) {
                guess_result_bg.setContentSize(cc.size(bigWidth + 50, bgSize.height))
            }
            gold_icon.setPosition(-labelWidth / 2 - 5, gold_icon.getPosition().y)
            label.setPosition(gold_icon.getContentSize().width / 2 - 5, label.getPosition().y)
        } else {
            let label = lose_panel.getChildByName("guess_result_label");
            label.getComponent(cc.Label).string = cv.config.getStringData("UIGuessLose");
        }

        let move = cc.moveTo(0.2, cc.v2(pos.x, pos.y + 165));
        let fadeout = cc.fadeOut(2);
        node.runAction(cc.sequence(move, fadeout, cc.destroySelf()));
    }

    playPointAni(time: number) {
        let points_num = cv.GameDataManager.tRoomData.change_points;
        let seat = this.getSeatByPlayerID(cv.dataHandler.getUserData().u32Uid);
        if (points_num <= 0 || !seat) return;

        if (!this.points_node) {
            this.points_node = cc.instantiate(this.points_ani_prefab);
            this.node.addChild(this.points_node, cv.Enum.ZORDER_TYPE.ZORDER_5);
            this.points_node.setPosition(this.node.convertToNodeSpaceAR(seat.node.parent.convertToWorldSpaceAR(seat.node.position)));
            this.points_node.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                this.resetPointAni();
            }, this);
        }

        this.points_node.getComponent(HeadPointsAni).playPointAni(points_num, time);
    }

    resetPointAni() {
        cv.GameDataManager.tRoomData.change_points = 0;
        if (this.points_node) {
            this.points_node.getComponent(HeadPointsAni).resetPointAni();
        }
    }

    /**
     * 视频相关接口
     */
    createVideoEngine(): void {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            let ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "emulatorCheck", "()I");
            this._runningOnDevice = ret == 1 ? 1 : 0;
        }
        this._needCreateVideoEngine = false;
        AgoraSdk.setRenderListener(this.renderVideoImage.bind(this), this.cleanVideoImage.bind(this));
        AgoraSdk.setEngineStateListener(this.onVideoEngineStateChanged.bind(this));
        if (this.isEnableAudioVolumeIndication()) {
            AgoraSdk.setAudioVolumeListener(this.onAudioVolumeIndication.bind(this));
        }
        AgoraSdk.createEngine(AgoraSdk.CHANNEL_PROFILE_LIVE_BROADCASTING, { width: 720, height: 720 }, AgoraSdk.VIDEO_FRAME_RATE_FPS_15, AgoraSdk.VIDEO_ORIENTATION_MODE_ADAPTIVE);
    }
    destroyVideoEngine(): void {
        AgoraSdk.setRenderListener(null, null);
        AgoraSdk.setEngineStateListener(null);
        AgoraSdk.setAudioVolumeListener(null);
        AgoraSdk.destroyEngine();
        this._needCreateVideoEngine = true;
    }
    isEnableAudioVolumeIndication(): boolean {
        return window.big_version != "2.10.0"; //jian rong code
    }
    isGameStarSeat(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat;
    }
    isEnableGameStarSeat(): boolean {
        return cv.GameDataManager.tRoomData.pkRoomParam.reserveSeat > 0;
    }
    isEnableMike(): boolean {
        let commentatorInfo: CommentatorInfo = this.getCommentatorInfoByUid(cv.dataHandler.getUserData().u32Uid);
        return (commentatorInfo && commentatorInfo.mikeStatus == 1 ? true : false);
    }
    /**
     * 是否是"奥马哈"游戏
     */
    isGamePLO(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.Plo;
    }
    joinVideoChannel(channelName: string, uid: number): void {
        //在连接状态下再次调用该语句则提示异常并返回
        AgoraSdk.joinChannel(channelName, uid);
    }
    leaveVideoChannel(): void {
        AgoraSdk.leaveChannel();
    }
    setVideoClientRole(role: number): void {
        switch (role) {
            case 1: //明星
                AgoraSdk.setClientRole(AgoraSdk.CLIENT_ROLE_BROADCASTER);
                AgoraSdk.enableLocalAudio(false);
                AgoraSdk.enableLocalVideo(true);
                break;
            case 2: //播音员
                AgoraSdk.setClientRole(AgoraSdk.CLIENT_ROLE_BROADCASTER);
                AgoraSdk.enableLocalAudio(true);
                AgoraSdk.enableLocalVideo(false);
                break;
            case 0: //普通玩家
            case 3: //管理员
            default:
                AgoraSdk.setClientRole(AgoraSdk.CLIENT_ROLE_AUDIENCE);
                AgoraSdk.enableLocalAudio(false);
                AgoraSdk.enableLocalVideo(false);
                break;
        }
    }
    renderVideoImage(filepath: string, format: number, width: number, height: number, rotation: number, timestamp: number, uid: number): void {
        // console.log("renderImage timestamp=" + timestamp + ", uid=" + uid + ", cameraType=" + AgoraSdk.currentCameraType() + ", width=" + width + ", height=" + height + ", rotation=" + rotation);
        if (!this.isEnableGameStarSeat()) {
            return;
        }
        let seat: Seat = this.getSeatByUid(uid);
        if (seat == null || seat.getData().identity != 1 || seat.getData().liveStatus != 1) {
            return;
        }
        let frameData = jsb.fileUtils.getDataFromFile(filepath);
        if (frameData == null) {
            return;
        }
        let scalX: number = 1;
        let scalY: number = 1;
        if (uid == cv.dataHandler.getUserData().u32Uid) {
            let rot: number = Math.abs(rotation);
            if (rot == 90 || rot == 270) {
                scalY = this._runningOnDevice == 1 ? 1 : -1;
            } else {
                scalX = this._runningOnDevice == 1 ? 1 : -1;
            }
        }
        seat.setHeadTextureWithData(frameData, cc.Texture2D.PixelFormat.RGBA8888, width, height, rotation, scalX, scalY);
    }
    cleanVideoImage(uid: number, reason: number) {
        // console.log("cleanImage reason=" + reason + ", uid=" + uid);
    }
    onVideoEngineStateChanged(state: number) {
        //这时已经设置好设备权限(很重要)
        if (state == 1) {
            AgoraSdk.setBeautyEffectOptions(true); //开启美颜
            this.setVideoClientRole(this.myIdentity());
            if (this.myIdentity() == 2 && this.isEnableMike() == false) {
                AgoraSdk.enableLocalAudio(false);
            } else if (this.myIdentity() == 1) {
                let seat: Seat = this.getSeatByUid(cv.dataHandler.getUserData().u32Uid);
                if (this.isAudience() || (seat && seat.getData().liveStatus != 1)) {
                    AgoraSdk.enableLocalVideo(false);
                }
                this.updateMikMode();
            }
            this.onCommentatorChannel(this.getCommentator().getAudioChannel());
            this.updateVoicePrivateNotice();

            if (this.isEnableAudioVolumeIndication()) {
                AgoraSdk.enableAudioVolumeIndication(500);
            }
            //接收推送流
            this.joinVideoChannel("superstar_video_" + cv.GameDataManager.tRoomData.u32GameID + "_" + cv.GameDataManager.tRoomData.u32RoomId, cv.dataHandler.getUserData().u32Uid);
        }
    }
    getSeatByUid(uid: number): Seat {
        let seat: Seat = null;
        for (let i = 0; i < this.seatList.length; ++i) {
            if (this.seatList[i].PlayerInfo != null && this.seatList[i].PlayerInfo.playerid == uid) {
                seat = this.seatList[i];
                break;
            }
        }
        return seat;
    }

    onLiveStatus(msg: any): void {
        let audience: boolean = this.isAudience();
        let enableLive: boolean = msg.liveStatus == 1 ? true : false;
        let seat: Seat = this.getSeatByUid(msg.uid);
        let seatSeverId: number = -1;
        let seatViewStyleChange: boolean = false;
        if (seat && seat.getData().identity == 1) {
            seat.getData().liveStatus = msg.liveStatus;
            seatSeverId = seat.getSeverId();
            let seatViewStyle: number = seat.getViewStyle();
            audience && enableLive ? seat.setViewStyle(2) : seat.setViewStyle(1);
            seatViewStyleChange = seatViewStyle == seat.getViewStyle() ? false : true;
            if (!seatViewStyleChange && seatViewStyle == 1 && !enableLive) {
                seat.resetHead();
            }

            // 明星座位视图发生变化时, 更新礼物模块"小icon入口"状态
            this.updateGiftSmallIconStatus();
        }
        if (this.myIdentity() == 1 && msg.uid == cv.dataHandler.getUserData().u32Uid) {
            AgoraSdk.enableLocalVideo(enableLive);
        }
        if (seatViewStyleChange && seatSeverId == cv.GameDataManager.tGameData.i32DealerSId) {
            this.DrunAction(cv.GameDataManager.tGameData.i32DealerSId, 0);
        }
    }
    updateMikMode(): void {
        if (this.myIdentity() == 1) {
            let me: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
            if (me && me.mikeMode == 1) {
                //开放麦
                AgoraSdk.enableLocalAudio(true);
            } else {
                //按键
                AgoraSdk.enableLocalAudio(false);
            }
        }
    }
    onMikeMode(msg: any): void {
        this.record_button.active = this.isShowRecord();
        this.updateMikMode();
    }
    updateVoicePrivateNotice(): void {
        if (this.myIdentity() == 0) {
            for (let i = 0; i < cv.GameDataManager.tRoomData.voicePrivate.length; ++i) {
                let data = cv.GameDataManager.tRoomData.voicePrivate[i];
                this.onVoicePrivateNotice(data);
            }
        }
    }
    onVoicePrivateNotice(msg: any): void {
        if (this.myIdentity() == 0) {
            AgoraSdk.muteRemoteAudio(msg.uid, !msg.isVoicePublic);
        }
    }
    onCanSpeakNotice(msg: any): void {
        this.record_button.active = this.isShowRecord();
    }
    onOpenMike(msg: any): void {
        let commentatorInfo: CommentatorInfo = this.getCommentatorInfoByUid(msg.uid);
        if (!commentatorInfo) {
            return;
        }
        // commentatorInfo.mikeStatus = msg.mikeStatus;
        let commentator: Commentator = this.getCommentator();
        if (this.myIdentity() == 2 && msg.uid == cv.dataHandler.getUserData().u32Uid) {
            let openMike = msg.mikeStatus == 1 ? true : false;
            commentator.enableMike(openMike);
            AgoraSdk.enableLocalAudio(openMike);
            if (!openMike) {
                commentator.setAudioVolume(0);
            }
        }
        //
        //
        // this.updateAudioVolumeIndication();
    }
    containsKey(array: any, key: any): boolean {
        if (array != null && (array instanceof Array)) {
            for (let i = array.length - 1; i >= 0; --i) {
                if (array[i] == key) {
                    return true;
                }
            }
        }
        return false;
    }
    onCommentatorChannel(channel: number) {
        let commentatorList = cv.GameDataManager.tRoomData.pkRoomParam.commentators;
        let commentatorsOn = [];
        let commentatorsOff = [];
        for (let i = commentatorList.length - 1; i >= 0; --i) {
            if (cv.dataHandler.getUserData().u32Uid != commentatorList[i].uid) {
                commentatorList[i].television == channel ? commentatorsOn.push(commentatorList[i].uid) : commentatorsOff.push(commentatorList[i].uid);
            }
        }
        for (let i = commentatorsOff.length - 1; i >= 0; --i) {
            AgoraSdk.muteRemoteAudio(commentatorsOff[i], true);
        }
        for (let i = commentatorsOn.length - 1; i >= 0; --i) {
            AgoraSdk.muteRemoteAudio(commentatorsOn[i], false);
        }
        //
        //
        // this.updateAudioVolumeIndication();
    }
    currentCommentatorChannels(): number[] {
        let commentatorList = cv.GameDataManager.tRoomData.pkRoomParam.commentators;
        let channels = [];
        for (let i = 0; i < commentatorList.length; ++i) {
            if (!this.containsKey(channels, commentatorList[i].television)) {
                channels.push(commentatorList[i].television);
            }
        }
        return channels;
    }
    defaultCommentatorChannel(): number {
        let channel: number = 0;
        switch (cv.config.getCurrentLanguage()) {
            case LANGUAGE_TYPE.zh_CN:
                channel = 1;
                break;
            case LANGUAGE_TYPE.en_US:
                channel = 2;
                break;
            case LANGUAGE_TYPE.yn_TH:
                channel = 3;
                break;
            case LANGUAGE_TYPE.th_PH:
                channel = 4;
                break;
            case LANGUAGE_TYPE.ar_SA:
                channel = 5;
                break;
            case LANGUAGE_TYPE.hi_IN:
                channel = 6;
                break;
            default:
                channel = 1;
                break;
        }
        return channel;
    }
    onNotDisturb(msg: any): void {
        let seat: Seat = this.getSeatByUid(msg.whoId);
        if (seat) {
            seat.showHeadBlock(((msg.operate == 1) ? true : false));
        }
    }
    onCloseStarNotice(msg: boolean): void {
        if (this.isGameStarSeat() && !this.isEnableGameStarSeat()) {
            let commentatorNode = cc.find("commentator", this.node);
            this.setSeatViewStyle();
            cv.MessageCenter.send("closeStarSeat", true);
            this.record_button.active = this.isShowRecord();
            commentatorNode.active = false;
            this.destroyVideoEngine();
        }
    }
    onInviterSeatFreedNotice(msg: any): void {
        if (!this.isEnableGameStarSeat() || msg == null || msg.seatId.length == 0) {
            return;
        }
        cv.MessageCenter.send("freeInviterSeat", msg);
        if (this.isAudience()) {
            return;
        }
        let seats = msg.seatId;
        let attr = msg.attr; //0=普通位  1=嘉宾位 2=明星位
        let changeAtrr: boolean = false;
        for (let i = seats.length - 1; i >= 0; --i) {
            if (cv.GameDataManager.tRoomData.i32SelfSeat == seats[i]) {
                changeAtrr = true;
                break;
            }
        }
        if (!changeAtrr || !(attr == 0 || attr == 1 || attr == 2)) {
            return;
        }
        if (attr == 1) {
            if (!this.isInviter()) {
                cv.TT.showMsg(cv.config.getStringData("GameScene_seatStar_change_inviter"), cv.Enum.ToastType.ToastTypeError);
            }
        } else if (attr == 2) {
            if (this.myIdentity() != 1) {
                cv.TT.showMsg(cv.config.getStringData("GameScene_seatStar_change_star"), cv.Enum.ToastType.ToastTypeError);
            }
        }
    }
    isKeepSilent(): boolean { //jian rong code
        let commentator: Commentator = this.getCommentator();
        let channel: number = commentator.getAudioChannel();
        let commentatorList = cv.GameDataManager.tRoomData.pkRoomParam.commentators;
        for (let i = commentatorList.length - 1; i >= 0; --i) {
            if (commentatorList[i].mikeStatus == 1 && commentatorList[i].television == channel) {
                return false;
            }
        }
        return true;
    }
    updateAudioVolumeIndication(): void { //jian rong code
        if (this.isEnableAudioVolumeIndication()) {
            return;
        }
        let commentator: Commentator = this.getCommentator();
        let volume: number = this.isKeepSilent() ? 0 : 1;
        if (commentator.getRole() != 2 && !commentator.isEnableMike()) {
            volume = 0;
        }
        commentator.setAudioVolume(volume);
    }
    onAudioVolumeIndication(speakers: string, totalVolume: number): void {
        // console.log("onAudioVolumeIndication => begin");
        // console.log(speakers);
        // console.log(totalVolume);
        // console.log("onAudioVolumeIndication => end");
        let speakerList = JSON.parse(speakers);
        // uid/volume/vad/channelId
        //每次会触发两个 onAudioVolumeIndication 回调
        //一个报告本地发流用户的音量相关信息
        //另一个报告瞬时音量最高的远端用户（最多 3 位）的音量相关信息
        if (speakerList == null || !(speakerList instanceof Array)) {
            return;
        }
        let len: number = speakerList.length;
        let localVoice: boolean = (len == 1 && speakerList[0].uid == 0) ? true : false;
        let commentator: Commentator = this.getCommentator();
        //本地声音
        if (localVoice) {
            if (this.myIdentity() == 2) {
                commentator.setAudioVolume(speakerList[0].volume);
            }
            return;
        }
        //远端声音
        let commentatorVolume: number = 0;
        if (len > 0) {
            for (let i = len - 1; i >= 0; --i) {
                let commentatorInfo: CommentatorInfo = this.getCommentatorInfoByUid(speakerList[i].uid);
                if (commentatorInfo) { // && commentatorInfo.television == channel
                    commentatorVolume += speakerList[i].volume;
                }
            }
        }
        if (this.myIdentity() == 2 && commentator.isEnableMike()) {
            commentatorVolume += commentator.getAudioVolume();
        }
        commentator.setAudioVolume(commentatorVolume);
    }
    getCommentator(): Commentator {
        return cc.find("commentator", this.node).getComponent(Commentator);
    }
    getCommentatorInfoByUid(uid: number): CommentatorInfo {
        let commentatorList = cv.GameDataManager.tRoomData.pkRoomParam.commentators;
        for (let i = commentatorList.length - 1; i >= 0; --i) {
            if (commentatorList[i].uid == uid) {
                return commentatorList[i];
            }
        }
        return null;
    }
    myIdentity(): number {
        return cv.GameDataManager.tRoomData.identity;
    }
    isAudience(): boolean {
        return cv.GameDataManager.tRoomData.i32SelfSeat == -1;
    }
    isInviter(): boolean { //特邀玩家
        if (this.myIdentity() == 0) {
            let inviters = cv.GameDataManager.tRoomData.pkRoomParam.starInviter;
            for (let i = 0; i < inviters.length; ++i) {
                if (inviters[i] == cv.dataHandler.getUserData().u32Uid) {
                    return true;
                }
            }
        }
        return false;
    }
    private setSeatViewStyle(): void {
        let audience: boolean = this.isAudience();
        for (let i = 0; i < this.seatList.length; i++) {
            let enableLive: boolean = false;
            let pkSeat = this.seatList[i];
            if (pkSeat && pkSeat.getData() && pkSeat.getData().identity == 1 && pkSeat.getData().liveStatus == 1) {
                enableLive = true;
            }
            this.isEnableGameStarSeat() && audience && enableLive ? pkSeat.setViewStyle(2) : pkSeat.setViewStyle(1);
        }
    }
    private isShowRecord(): boolean {
        if (cv.GameDataManager.tRoomData.i32SelfSeat == -1) return false;
        let enable: boolean = (!this.isZoom() && cv.roomManager.getCurrentGameID() != cv.Enum.GameId.Bet);
        if (this.isGameStarSeat() && this.isEnableGameStarSeat()) {
            if (this.myIdentity() == 2) {
                enable = false;
            } else if (this.myIdentity() == 1) {
                let me: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
                enable = me && me.mikeMode == 1 ? false : true;
            } else {
                enable = cv.GameDataManager.tRoomData.pkRoomParam.canSpeak;
                let me: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
                enable = me ? me.canSpeak : enable;
            }
        }
        return enable;
    }
    private isShowFaceBtn(): boolean {
        if (this.isGameStarSeat()) {
            return this.myIdentity() == 2 ? false : true;
        } else {
            return cv.GameDataManager.tRoomData.i32SelfSeat != -1;
        }
    }
    public onBarrageMute(msg: any): void {
        cv.MessageCenter.send("barrageMute", msg);
    }
    public onBarrageConfChange(): void {
        cv.MessageCenter.send("barrageConfChange", { canBarrage: cv.GameDataManager.tRoomData.openCustomBarrage, canInput: cv.GameDataManager.tRoomData.openTablePlayerCustomBarrage, price: cv.GameDataManager.tRoomData.nextCustomBarrageFee });
    }

    public getBlind(): string {
        return this.mangZhu_text.string;
    }

    //获取是否能够显示快捷加注状态
    public getShowDiChiBtnStatus(): boolean {
        if (this.actionButtonStatus != cv.Enum.ActionButtonStatus.Control_AllIn && this.actionButtonStatus != cv.Enum.ActionButtonStatus.Control_Just_Call) {
            return true;
        }
        return false;
    }

    public getPkSelfCard() {
        return this.m_pkSelfCard;
    }
}
